// End-to-end test of joining by code in the conditions of two real phones (no project server): the host leaves the
// game to send the code (iOS suspends the page) and comes back with connections that look open but carry nothing any
// more (the PeerJS broker and the relay brokers still believe it is there, nothing reaches it); and one relay broker
// cannot be reached from the host's network. Two local MQTT brokers (X, Y) and a black hole stand in for the public
// brokers: the host reaches only Y, the friends reach both and X first. A friend joins directly, another one (no direct
// connection possible) through the relay; a wrong code ends with a message saying what happened.
// Usage: npm run e2e:among-return
import { createServer } from 'node:http';
import { createServer as tcpServer } from 'node:net';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';
import { WebSocketServer, createWebSocketStream } from 'ws';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json', '.png': 'image/png' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
// two separate brokers, and a server that accepts connections and never answers (a port filtered by the network)
const brokerAt = () => { const a = require('aedes')(), w = new WebSocketServer({ port: 0 }); w.on('connection', ws => a.handle(createWebSocketStream(ws))); return { a, w, url: `ws://127.0.0.1:${w.address().port}` }; };
const X = brokerAt(), Y = brokerAt();
const sockets = new Set();
const hole = tcpServer(s => { sockets.add(s); s.on('error', () => {}); s.on('close', () => sockets.delete(s)); }).listen(0);
const HOLE = `ws://127.0.0.1:${hole.address().port}`;
const peerServer = PeerServer({ port: 9126, path: '/', host: '127.0.0.1' });
const base = `http://localhost:${web.address().port}/?aufps=10`;
const HOST = `${base}&peerhost=127.0.0.1:9126&mqtt=${HOLE},${Y.url}`;
const DIRECT = `${base}&peerhost=127.0.0.1:9126&mqtt=${X.url},${Y.url}`, BLOCKED = `${base}&peerhost=127.0.0.1:9&mqtt=${X.url},${Y.url}`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 15000, arg) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 200 }); return true; } catch { return false; } };

async function player(name, url) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|peerjs|WebSocket|ERR_|Lost connection/i.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', name);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  await page.waitForTimeout(400);
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(80); }
  for (let i = cur; i > idx; i--) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(80); }
  await page.keyboard.press('Enter');
  await page.waitForSelector('.au-main', { timeout: 20000 });
  await page.click('.am-big:has-text("JOUER")');
  await page.click('.am-card:has-text("EN LIGNE")');
  return page;
}
const joinWith = async (page, code) => { await page.click('.am-card:has-text("ENTRER UN CODE")'); await page.fill('.am-code', code); await page.press('.am-code', 'Enter'); };
const via = page => page.evaluate(() => globalThis.__au?.c?.link?.via);

try {
  const A = await player('Hote', HOST), C = await player('Direct', DIRECT), D = await player('Relais', BLOCKED), E = await player('Erreur', DIRECT);
  // a code nobody hosts (checked at the end: the friend keeps trying for 45 s first)
  await joinWith(E, 'ZZZZZZ');
  ok('with a wrong code the friend waits first', await until(E, () => /pas encore joignable/.test(document.querySelector('.au-wait')?.innerText || ''), 30000));
  await A.click('.am-card:has-text("CRÉER UNE PARTIE")');
  await A.click('.hs-btn:has-text("Classique")');
  ok('the host console creates the room', await until(A, () => globalThis.__au?.c?.phase === 'lobby', 30000));
  const code = await A.evaluate(() => globalThis.__au.c.v.code);
  ok('the host listens on the broker it can reach', await A.evaluate(() => globalThis.__au.c.link.relays.filter(m => m.open).length) === 1);
  // the host goes to another app to send the code, and comes back: every connection it had is now silent, in both
  // directions, without being closed (the brokers keep them open too)
  await A.evaluate(async () => {
    const link = globalThis.__au.c.link;
    const mute = ws => { if (!ws) return; ws.onmessage = null; ws.send = () => {}; };
    mute(link.peer.socket._socket);
    link.relays.forEach(m => mute(m.ws));
    const vis = hidden => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden }); Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (hidden ? 'hidden' : 'visible') }); document.dispatchEvent(new Event('visibilitychange')); };
    vis(true);
    await new Promise(r => setTimeout(r, 3000));
    vis(false);
  });
  // a friend whose direct connection works: reaches the host once its broker connection is renewed
  await joinWith(C, code);
  ok('a friend joins directly after the host came back', await until(C, () => globalThis.__au?.c?.phase === 'lobby' && globalThis.__au.c.link.via === 'rtc', 40000), await via(C));
  // a friend with no direct connection: the relay, through the broker the host can reach (not the first of the list)
  await joinWith(D, code);
  ok('a friend without direct connection joins through the relay', await until(D, () => globalThis.__au?.c?.phase === 'lobby' && globalThis.__au.c.link.via === 'relay', 40000), await via(D));
  ok('the host sees three players', await until(A, () => globalThis.__au.c.v.players.filter(p => !p.bot).length === 3, 15000));
  ok('the relayed friend sees three players', await until(D, () => globalThis.__au.c.v.players.length === 3, 15000));
  // moves cross the relay
  const nD = await D.evaluate(() => globalThis.__au.c.n);
  await D.evaluate(() => { globalThis.__au.autoDir = [0, 1]; }); await D.waitForTimeout(1500); await D.evaluate(() => { globalThis.__au.autoDir = null; });
  const after = await D.evaluate(() => [globalThis.__au.c.pos.x, globalThis.__au.c.pos.y]);
  ok('the host sees the relayed friend where he walked', await until(A, ([n, p]) => { const o = globalThis.__au.c.others.get(n); return o && Math.hypot(o.x - p[0], o.y - p[1]) < .15; }, 8000, [nD, after]));
  // the wrong code: a message that says so and what each way answered, back on the code page
  ok('…then is told that no game has this code', await until(E, () => /Aucune partie ouverte avec le code ZZZZZZ.*direct : code inconnu · relais : pas de réponse/.test(document.querySelector('.au-toast')?.innerText || ''), 90000), await E.evaluate(() => document.querySelector('.au-toast')?.innerText));
  ok('…and is back on the code page', await E.evaluate(() => !!document.querySelector('.am-code')));
  // the same friend with the right code: four players, the game starts
  await E.fill('.am-code', code); await E.press('.am-code', 'Enter');
  ok('…then joins with the right code', await until(E, () => globalThis.__au?.c?.phase === 'lobby', 40000), await via(E));
  await A.evaluate(() => globalThis.__au.c.send({ k: 'start' }));
  ok('the game starts for everyone', (await Promise.all([A, C, D, E].map(p => until(p, () => globalThis.__au.c.phase === 'play', 40000)))).every(Boolean));
} catch (e) { ok('no exception', false, e.stack || e.message); }
finally {
  await browser.close(); web.close(); peerServer.close?.();
  for (const b of [X, Y]) { b.w.close(); b.a.close(); }
  sockets.forEach(s => s.destroy()); hole.close();
}
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
console.log(results.every(Boolean) && !errors.length ? 'RETURN E2E PASSED' : 'RETURN E2E FAILED');
process.exit(results.every(Boolean) && !errors.length ? 0 : 1);
