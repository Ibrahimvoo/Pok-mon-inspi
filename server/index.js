// HTTP server: serves the built client (dist/), the JSON API under /api and the realtime WebSocket at /ws.
// Configuration (environment): PORT, DATABASE_URL (postgres://… or a SQLite file path), TRUST_PROXY=1,
// ALLOWED_ORIGINS (comma-separated), STUN_URLS, TURN_URL + TURN_SECRET (coturn "use-auth-secret").
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHmac } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { WebSocketServer } from 'ws';
import { openDb } from './db.js';
import { accounts, publicUser, AppError, SESSION_TTL } from './accounts.js';
import { createHub } from './realtime.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = process.env;

export async function start({ port = +(env.PORT || 8080), dbUrl = env.DATABASE_URL, dist = join(ROOT, 'dist'), quiet = false } = {}) {
  const log = quiet ? () => {} : (...a) => console.log(new Date().toISOString(), ...a);
  const db = await openDb(dbUrl);
  const acc = accounts(db);
  const hub = createHub({ acc, log });
  const trustProxy = env.TRUST_PROXY === '1';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

  // ------------------------------------------------------------ helpers
  const ipOf = req => (trustProxy && req.headers['x-forwarded-for']?.split(',')[0].trim()) || req.socket.remoteAddress || '?';
  const isHttps = req => req.socket.encrypted || (trustProxy && req.headers['x-forwarded-proto'] === 'https');
  const cookies = req => Object.fromEntries((req.headers.cookie || '').split(';').map(c => c.trim().split('=')).filter(p => p[0]).map(([k, ...v]) => [k, decodeURIComponent(v.join('='))]));
  function originOk(req) {
    const o = req.headers.origin;
    if (!o) return true; // non-browser clients; browsers always send Origin on cross-site writes and WebSocket upgrades
    const host = req.headers['x-forwarded-host'] && trustProxy ? req.headers['x-forwarded-host'] : req.headers.host;
    return o === `${isHttps(req) ? 'https' : 'http'}://${host}` || allowed.includes(o);
  }
  const limits = new Map();
  function limited(key, max, windowMs) {
    const now = Date.now(), e = limits.get(key);
    if (!e || e.reset < now) { limits.set(key, { n: 1, reset: now + windowMs }); return false; }
    return ++e.n > max;
  }
  setInterval(() => { const now = Date.now(); limits.forEach((v, k) => { if (v.reset < now) limits.delete(k); }); }, 60e3).unref();

  const SEC = {
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'microphone=(self), camera=(), geolocation=(), gamepad=(self)',
    'Cross-Origin-Opener-Policy': 'same-origin',
  };
  function csp(req) {
    const host = req.headers.host;
    return `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self' wss://${host} ws://${host} https://0.peerjs.com wss://0.peerjs.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`;
  }
  function json(res, status, body, extra = {}) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...SEC, ...extra });
    res.end(JSON.stringify(body));
  }
  async function body(req) {
    if (!/application\/json/.test(req.headers['content-type'] || '')) throw new AppError(415, 'json', 'Format attendu : JSON.');
    let size = 0; const chunks = [];
    for await (const c of req) { size += c.length; if (size > 10240) throw new AppError(413, 'too_large', 'Requête trop volumineuse.'); chunks.push(c); }
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { throw new AppError(400, 'json', 'JSON invalide.'); }
  }
  const sessionCookie = (req, token, maxAge) => `sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isHttps(req) ? '; Secure' : ''}`;
  async function userOf(req) { return acc.userForToken(cookies(req).sid); }
  async function needUser(req) { const u = await userOf(req); if (!u) throw new AppError(401, 'auth', 'Session expirée : reconnectez-vous.'); return u; }

  // ------------------------------------------------------------ API
  const routes = [
    ['GET', /^\/api\/health$/, async () => ({ ok: true, db: db.kind, ...hub.stats() })],
    ['POST', /^\/api\/auth\/register$/, async (req, res) => {
      if (limited('reg:' + ipOf(req), 10, 15 * 60e3)) throw new AppError(429, 'rate', 'Trop de tentatives, réessayez dans quelques minutes.');
      const b = await body(req);
      const user = await acc.register({ psn: b.psn, password: b.password, avatar: b.avatar });
      const token = await acc.createSession(user.id);
      res.setHeader('Set-Cookie', sessionCookie(req, token, SESSION_TTL / 1000));
      log('register', user.psn);
      return [201, { user: publicUser(user) }];
    }],
    ['POST', /^\/api\/auth\/login$/, async (req, res) => {
      const b = await body(req);
      if (limited('login:' + ipOf(req), 20, 15 * 60e3) || limited('login:' + String(b.psn).toLowerCase(), 10, 15 * 60e3)) throw new AppError(429, 'rate', 'Trop de tentatives, réessayez dans quelques minutes.');
      const user = await acc.login(b);
      const token = await acc.createSession(user.id);
      res.setHeader('Set-Cookie', sessionCookie(req, token, SESSION_TTL / 1000));
      return { user: publicUser(user) };
    }],
    ['POST', /^\/api\/auth\/logout$/, async (req, res) => {
      await acc.destroySession(cookies(req).sid);
      res.setHeader('Set-Cookie', sessionCookie(req, '', 0));
      return { ok: true };
    }],
    ['GET', /^\/api\/me$/, async req => ({ user: publicUser(await needUser(req)) })],
    ['PATCH', /^\/api\/me$/, async req => {
      const u = await needUser(req); const b = await body(req);
      await acc.setAvatar(u.id, b.avatar);
      return { user: publicUser(await acc.byId(u.id)) };
    }],
    ['GET', /^\/api\/users\/search$/, async (req, _res, url) => {
      const u = await needUser(req);
      if (limited('search:' + u.id, 60, 60e3)) throw new AppError(429, 'rate', 'Trop de recherches.');
      return { users: await acc.search(url.searchParams.get('q'), u.id) };
    }],
    ['GET', /^\/api\/friends$/, async req => {
      const u = await needUser(req);
      const r = await acc.relations(u.id);
      r.friends = r.friends.map(f => ({ ...f, presence: hub.presenceOf(f.id) }));
      return r;
    }],
    ['POST', /^\/api\/friends\/request$/, async req => {
      const u = await needUser(req); const b = await body(req);
      if (limited('freq:' + u.id, 30, 60 * 60e3)) throw new AppError(429, 'rate', 'Trop de demandes d’ami pour le moment.');
      const { other, accepted } = await acc.request(u.id, b.psn);
      await hub.friendsChanged(u.id, other.id);
      hub.notify(other.id, accepted ? { t: 'friend.accepted', by: publicUser(u) } : { t: 'friend.request', from: publicUser(u) });
      return { ok: true, accepted, user: publicUser(other) };
    }],
    ['POST', /^\/api\/friends\/respond$/, async req => {
      const u = await needUser(req); const b = await body(req);
      await acc.respond(u.id, b.id, !!b.accept);
      await hub.friendsChanged(u.id, String(b.id));
      if (b.accept) hub.notify(String(b.id), { t: 'friend.accepted', by: publicUser(u) });
      return { ok: true };
    }],
    ['DELETE', /^\/api\/friends\/([\w-]{1,64})$/, async (req, _res, _url, m) => {
      const u = await needUser(req);
      await acc.remove(u.id, m[1]);
      await hub.friendsChanged(u.id, m[1]);
      return { ok: true };
    }],
    ['GET', /^\/api\/ice$/, async req => {
      const u = await needUser(req);
      const stun = (env.STUN_URLS || 'stun:stun.l.google.com:19302,stun:stun.cloudflare.com:3478').split(',').map(s => s.trim()).filter(Boolean);
      const ice = [{ urls: stun }];
      if (env.TURN_URL && env.TURN_SECRET) {
        // short-lived TURN credentials (coturn REST API scheme): the shared secret never leaves the server
        const username = `${Math.floor(Date.now() / 1000) + 3600}:${u.id}`;
        const credential = createHmac('sha1', env.TURN_SECRET).update(username).digest('base64');
        ice.push({ urls: env.TURN_URL.split(',').map(s => s.trim()), username, credential });
      }
      return { iceServers: ice };
    }],
  ];

  async function api(req, res, url) {
    for (const [method, re, fn] of routes) {
      const m = url.pathname.match(re);
      if (!m) continue;
      if (req.method !== method) continue;
      try {
        if (method !== 'GET' && !originOk(req)) throw new AppError(403, 'origin', 'Origine non autorisée.');
        const out = await fn(req, res, url, m);
        const [status, payload] = Array.isArray(out) ? out : [200, out];
        return json(res, status, payload);
      } catch (e) {
        if (e instanceof AppError) return json(res, e.status, { error: { code: e.code, message: e.message, fields: e.fields } });
        log('API error', req.method, url.pathname, e);
        return json(res, 500, { error: { code: 'server', message: 'Erreur du serveur, réessayez.' } });
      }
    }
    json(res, 404, { error: { code: 'not_found', message: 'Route inconnue.' } });
  }

  // ------------------------------------------------------------ static client
  const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon' };
  const gzCache = new Map();
  async function serveStatic(req, res, url) {
    let p = decodeURIComponent(url.pathname);
    if (p === '/') p = '/index.html';
    const file = normalize(join(dist, p));
    if (!file.startsWith(dist)) return json(res, 403, { error: { code: 'forbidden' } });
    let st;
    try { st = await stat(file); if (!st.isFile()) throw 0; } catch { return json(res, 404, { error: { code: 'not_found', message: 'Introuvable.' } }); }
    const ext = extname(file);
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', ...SEC,
      'Cache-Control': p.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : p.startsWith('/art/') ? 'public, max-age=604800' : 'no-cache' };
    if (ext === '.html') headers['Content-Security-Policy'] = csp(req);
    let data = await readFile(file);
    if (/\.(html|js|css|svg|json)$/.test(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
      const key = file + st.mtimeMs;
      if (!gzCache.has(key)) gzCache.set(key, gzipSync(data));
      data = gzCache.get(key); headers['Content-Encoding'] = 'gzip'; headers.Vary = 'Accept-Encoding';
    }
    res.writeHead(200, headers);
    res.end(req.method === 'HEAD' ? undefined : data);
  }

  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname.startsWith('/api/')) return api(req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: { code: 'method' } });
    serveStatic(req, res, url).catch(e => { log('static error', e); json(res, 500, { error: { code: 'server' } }); });
  });

  // ------------------------------------------------------------ websocket
  const wss = new WebSocketServer({ noServer: true, maxPayload: 16 * 1024 });
  server.on('upgrade', async (req, socket, head) => {
    const deny = (code, text) => { socket.write(`HTTP/1.1 ${code} ${text}\r\nConnection: close\r\n\r\n`); socket.destroy(); };
    try {
      if (new URL(req.url, 'http://x').pathname !== '/ws') return deny(404, 'Not Found');
      if (!originOk(req)) return deny(403, 'Forbidden');
      const user = await userOf(req);
      if (!user) return deny(401, 'Unauthorized');
      wss.handleUpgrade(req, socket, head, ws => hub.attach(ws, user).catch(e => { log('attach error', e); ws.close(1011); }));
    } catch (e) { log('upgrade error', e); deny(500, 'Error'); }
  });

  await new Promise(r => server.listen(port, r));
  log(`PS5 UX server on :${server.address().port} (${db.kind})`);
  return { server, port: server.address().port, db, hub, async close() { hub.close(); wss.clients.forEach(c => c.terminate()); await new Promise(r => server.close(r)); await db.close(); } };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  start().catch(e => { console.error(e); process.exit(1); });
}
