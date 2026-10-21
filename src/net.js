// Client side of the backend: JSON API (cookie session) and the realtime WebSocket with automatic reconnection.
import { lifecycle } from './input.js';

const API_TIMEOUT = 10000;
export const netEvents = new EventTarget();
const emit = (type, detail) => netEvents.dispatchEvent(new CustomEvent(type, { detail }));

export class NetError extends Error {
  constructor(message, { status = 0, code = 'network', fields } = {}) { super(message); this.status = status; this.code = code; this.fields = fields; }
}

async function api(path, { method = 'GET', body, timeout = API_TIMEOUT } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  let res;
  try {
    res = await fetch(path, {
      method, credentials: 'same-origin', signal: ctl.signal, cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new NetError(navigator.onLine === false ? 'Vous êtes hors ligne. Vérifiez votre connexion Internet.' : 'Impossible de joindre le serveur. Réessayez dans un instant.');
  } finally { clearTimeout(timer); }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = data?.error || {};
    if (res.status === 401 && net.user && path !== '/api/auth/login') { net.user = null; emit('auth', { expired: true }); }
    throw new NetError(e.message || `Erreur ${res.status}`, { status: res.status, code: e.code || 'http', fields: e.fields });
  }
  return data;
}

// ---------------------------------------------------------------- websocket
let ws = null, wantSocket = false, retry = 0, retryTimer = 0, rid = 0;
const pending = new Map();
let status = 'offline';
function setStatus(s) { if (s !== status) { status = s; emit('status', s); } }

function openSocket() {
  clearTimeout(retryTimer);
  if (!wantSocket || (ws && ws.readyState <= 1)) return;
  setStatus('connecting');
  const sock = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  ws = sock;
  sock.onopen = () => { retry = 0; setStatus('online'); };
  sock.onmessage = e => {
    let m; try { m = JSON.parse(e.data); } catch { return; }
    if (m.t === 'res') { const p = pending.get(m.rid); if (p) { pending.delete(m.rid); clearTimeout(p.timer); p.resolve(m); } return; }
    emit(m.t, m);
  };
  sock.onclose = ev => {
    if (ws !== sock) return;
    ws = null;
    pending.forEach(p => { clearTimeout(p.timer); p.reject(new NetError('Connexion interrompue.')); }); pending.clear();
    if (!wantSocket) return setStatus('offline');
    setStatus('reconnecting');
    // repeated refusals usually mean the session expired: check before hammering the server
    if (retry >= 2) net.me().then(u => { if (!u && wantSocket) { wantSocket = false; clearTimeout(retryTimer); setStatus('offline'); emit('auth', { expired: true }); } }).catch(() => {});
    const delay = Math.min(15000, 800 * 2 ** retry++) * (.75 + Math.random() * .5);
    retryTimer = setTimeout(openSocket, delay);
  };
}
lifecycle.addEventListener('resume', e => {
  if (!wantSocket) return;
  // iOS freezes sockets in the background: after a long absence start a fresh one immediately
  if (e.detail.away > 20000 && ws) { const old = ws; ws = null; old.onclose = null; old.close(); setStatus('reconnecting'); }
  retry = 0; openSocket();
});
addEventListener('online', () => { if (wantSocket) { retry = 0; openSocket(); } });
// a socket can stay "open" on a dead network (mobile handover, Wi-Fi loss): close it so the reconnection loop starts
function dropSocket() { if (ws) { const s = ws; s.onclose?.({ code: 4000 }); s.onclose = null; try { s.close(); } catch { /* ignore */ } } }
addEventListener('offline', () => { if (wantSocket) dropSocket(); });
setInterval(() => {
  if (!wantSocket || ws?.readyState !== 1 || document.hidden) return;
  net.req('ping', {}, 6000).catch(() => dropSocket());
}, 15000);

export const net = {
  mode: 'unknown',     // 'online' when the backend answers, 'offline' otherwise (static hosting, network down)
  user: null,
  get status() { return status; },
  api,
  async probe() {
    try { await api('/api/health', { timeout: 4500 }); this.mode = 'online'; }
    catch { this.mode = 'offline'; }
    return this.mode;
  },
  async me() {
    try { this.user = (await api('/api/me')).user; }
    catch (e) { if (e.status === 401) this.user = null; else throw e; }
    return this.user;
  },
  async register(f) { this.user = (await api('/api/auth/register', { method: 'POST', body: f })).user; this.connect(); return this.user; },
  async login(f) { this.user = (await api('/api/auth/login', { method: 'POST', body: f })).user; this.connect(); return this.user; },
  async logout() {
    this.disconnect();
    try { await api('/api/auth/logout', { method: 'POST', body: {} }); } catch { /* the cookie expires anyway */ }
    this.user = null;
  },
  connect() { wantSocket = true; retry = 0; openSocket(); },
  disconnect() { wantSocket = false; clearTimeout(retryTimer); if (ws) { const s = ws; ws = null; s.close(); } setStatus('offline'); },
  // a peer-to-peer room (no server) can take over the realtime channel
  transport: null,
  inject(type, detail) { emit(type, detail); },
  send(t, payload = {}) { if (this.transport) return this.transport.send(t, payload); if (ws?.readyState === 1) { ws.send(JSON.stringify({ t, ...payload })); return true; } return false; },
  req(t, payload = {}, timeout = 8000) {
    if (this.transport) return this.transport.req(t, payload, timeout);
    return new Promise((resolve, reject) => {
      if (ws?.readyState !== 1) return reject(new NetError(status === 'reconnecting' ? 'Reconnexion au serveur en cours…' : 'Non connecté au serveur.'));
      const id = ++rid;
      const timer = setTimeout(() => { pending.delete(id); reject(new NetError('Le serveur ne répond pas.')); }, timeout);
      pending.set(id, { resolve: m => (m.error ? reject(new NetError(m.message || 'Action impossible.', { code: m.error })) : resolve(m)), reject, timer });
      ws.send(JSON.stringify({ t, rid: id, ...payload }));
    });
  },
  on(type, fn) { const h = e => fn(e.detail); netEvents.addEventListener(type, h); return () => netEvents.removeEventListener(type, h); },
};
