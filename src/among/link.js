// How a player reaches the room that has authority over the game:
//  - ServerLink: the room runs on the project server (realtime WebSocket, { t: 'au' } messages)
//  - HostLink:   no server: this browser runs the room and other players connect to it directly (PeerJS / WebRTC)
//  - GuestLink:  no server: connection to another player's browser that hosts the room
//  - LocalLink:  free play, the room runs in the page with no network at all
import { Peer } from 'peerjs';
import { net } from '../net.js';
import { lifecycle } from '../input.js';
import { PUBLIC_ICE } from '../rtc.js';
import { Room, TICK } from './core/room.js';

const PREFIX = 'ps5ux-au-';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
export const randomCode = () => Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
const peerOptions = () => {
  const o = new URLSearchParams(location.search).get('peerhost');
  if (!o) return { debug: 0, config: { iceServers: PUBLIC_ICE } };
  const [host, port] = o.split(':');
  return { debug: 0, host, port: +port, path: '/', secure: false };
};
const peerError = e => ({
  'peer-unavailable': 'Aucune partie avec ce code. Vérifiez le code, et que l’hôte a bien le jeu ouvert sur le salon.',
  timeout: 'L’hôte ne répond pas. Vérifiez que son jeu est ouvert sur le salon, puis réessayez.',
  'unavailable-id': 'Ce code est déjà utilisé, réessayez.',
  network: 'Connexion au service de mise en relation impossible. Vérifiez votre connexion Internet.',
  'server-error': 'Le service de mise en relation ne répond pas. Réessayez dans un instant.',
  'browser-incompatible': 'Ce navigateur ne permet pas le jeu en ligne direct.',
}[e?.type] || e?.message || 'La connexion a échoué.');

// The free PeerJS broker sometimes hangs or drops a connection: one attempt gives up after a while, and the broker's own
// failures are retried a few times before the player is told (same handling as the console's rooms, src/p2p.js).
function openPeerOnce(id, onDisconnected) {
  return new Promise((resolve, reject) => {
    const p = id ? new Peer(id, peerOptions()) : new Peer(peerOptions());
    let open = false;
    const t = setTimeout(() => { p.off('error', onErr); p.destroy(); reject({ type: 'network' }); }, 12000);
    const onErr = e => { if (open) return; clearTimeout(t); p.off('error', onErr); p.destroy(); reject(e); };
    p.on('error', onErr);
    p.once('open', () => { open = true; clearTimeout(t); p.off('error', onErr); resolve(p); });
    p.on('disconnected', () => onDisconnected?.(p));
  });
}
async function openPeer(id, onDisconnected) {
  for (let i = 0; ; i++) {
    try { return await openPeerOnce(id, onDisconnected); }
    catch (e) {
      if (!['network', 'server-error', 'socket-error', 'socket-closed'].includes(e?.type) || i >= 3) throw e;
      await new Promise(r => setTimeout(r, 1500 * (i + 1)));
    }
  }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

class Base extends EventTarget {
  // messages that arrive before the game client is attached (welcome, position, first view) are kept and replayed
  emit(m) { if (!this.attached) { (this.queue ||= []).push(m); return; } this.dispatchEvent(new CustomEvent('msg', { detail: m })); }
  attach() { this.attached = true; const q = this.queue || []; this.queue = []; q.forEach(m => this.emit(m)); }
  status(s, info) { this.state = s; this.dispatchEvent(new CustomEvent('status', { detail: { s, info } })); }
}

// A timer that keeps ticking when the tab is in the background (browsers throttle setInterval to 1 Hz there).
function steadyTimer(fn, ms) {
  let worker = null, iv = 0;
  try {
    const url = URL.createObjectURL(new Blob([`setInterval(()=>postMessage(0),${ms})`], { type: 'text/javascript' }));
    worker = new Worker(url);
    worker.onmessage = fn;
    URL.revokeObjectURL(url);
  } catch { worker = null; }
  if (!worker) iv = setInterval(fn, ms);
  return () => { worker?.terminate(); clearInterval(iv); };
}

// ------------------------------------------------------------------ server
export class ServerLink extends Base {
  constructor() {
    super();
    this.kind = 'server'; this.code = null; this.hello = null;
    this.off = [net.on('au', m => { if (!this.code || m.code === this.code) this.emit('at' in m ? { ...m, t: m.at } : m); }), net.on('status', s => this.onStatus(s))];
  }
  async onStatus(s) {
    if (s !== 'online') { if (this.code) this.status('reconnecting'); return; }
    if (!this.code) return;
    // the socket came back: take our seat again
    try { await net.req('au', { op: 'join', code: this.code, ...this.hello }); this.status('online'); }
    catch (e) { this.status('closed', e.message || 'La partie n’existe plus.'); }
  }
  async create(opts, hello) {
    this.hello = hello;
    const r = await net.req('au', { op: 'create', ...opts, ...hello });
    this.code = r.code; this.status('online');
    return r.code;
  }
  async join(code, hello) {
    this.hello = hello;
    const r = await net.req('au', { op: 'join', code, ...hello });
    this.code = r.code; this.status('online');
    return r.code;
  }
  static async list(opts) { return (await net.req('au', { op: 'list', ...opts }, 8000)).rooms; }
  static async peek(code) { return (await net.req('au', { op: 'peek', code }, 6000)).room; }
  send(m) { return net.send('au', { op: 'msg', m }); }
  close() { if (this.code) net.send('au', { op: 'leave' }); this.code = null; this.off.forEach(f => f()); }
}

// ------------------------------------------------------------------ local (free play) and in-page host
function makeRoom(code, mode, deliver) {
  return new Room({ code, mode, send: deliver, log: (...a) => console.warn(...a) });
}
export class LocalLink extends Base {
  constructor(me) {
    super();
    this.kind = 'local'; this.me = me; this.code = 'ENTRAI';
    this.room = makeRoom(this.code, 'freeplay', (id, m) => { if (id === me.id) queueMicrotask(() => this.emit(m)); });
    this.stop = steadyTimer(() => this.room.tick(), TICK);
  }
  start(hello) { this.room.join(this.me.id, hello); this.status('online'); }
  send(m) { queueMicrotask(() => this.room.handle(this.me.id, m)); return true; }
  close() { this.stop(); this.room.close(); }
}

export class HostLink extends Base {
  constructor(me) {
    super();
    this.kind = 'host'; this.me = me; this.conns = new Map(); this.peer = null; this.room = null; this.stopTimer = null; this.closed = false;
    // iOS suspends the page while the host shares the code: the broker connection is reopened on return, and checked
    // every few seconds while the page is visible
    this.onResume = () => this.reopen();
    lifecycle.addEventListener('resume', this.onResume);
    this.watch = setInterval(() => { if (!document.hidden) this.reopen(); }, 5000);
  }
  open(id) {
    return openPeer(PREFIX + id, p => { if (this.peer === p && !p.destroyed && !this.closed) setTimeout(() => { try { if (p.disconnected && !p.destroyed) p.reconnect(); } catch { /* destroyed */ } }, 1500); });
  }
  async create(hello, settings) {
    let code = null;
    for (let i = 0; i < 4 && !this.peer; i++) {
      code = randomCode();
      try { this.peer = await this.open(code); }
      catch (e) { if (e?.type !== 'unavailable-id' || i === 3) throw new Error(peerError(e)); }
    }
    if (this.closed) { this.peer.destroy(); throw new Error('Création annulée.'); }
    this.code = code;
    this.room = makeRoom(code, 'p2p', (id, m) => this.deliver(id, m));
    if (settings) this.room.settings = settings;
    this.peer.on('connection', c => this.accept(c));
    this.stopTimer = steadyTimer(() => this.room.tick(), TICK);
    this.room.join(this.me.id, hello);
    this.status('online');
    return code;
  }
  deliver(id, m) {
    if (id === this.me.id) { queueMicrotask(() => this.emit(m)); return; }
    const c = this.conns.get(id);
    if (c?.open) { try { c.send(m); } catch { /* closing */ } }
  }
  accept(conn) {
    conn.on('data', raw => {
      let m = raw;
      if (typeof raw === 'string') { try { m = JSON.parse(raw); } catch { return; } }
      if (!m || typeof m !== 'object') return;
      if (m.k === 'hello') {
        const id = String(m.id || conn.peer).slice(0, 64);
        const prev = this.conns.get(id);
        if (prev && prev !== conn) try { prev.close(); } catch { /* ignore */ }
        this.conns.set(id, conn); conn.memberId = id;
        const err = this.room.join(id, m.hello || {});
        if (err) { conn.send({ k: 'bye', reason: 'refused', msg: err }); setTimeout(() => conn.close(), 300); this.conns.delete(id); }
        else if (m.hello?.look) this.room.handle(id, { k: 'look', ...m.hello.look });
        return;
      }
      if (conn.memberId && this.conns.get(conn.memberId) === conn) this.room.handle(conn.memberId, m);
    });
    conn.on('close', () => { if (conn.memberId && this.conns.get(conn.memberId) === conn) { this.conns.delete(conn.memberId); this.room.drop(conn.memberId); } });
  }
  async reopen() {
    if (this.closed || !this.code || this.reopening) return;
    if (this.peer && !this.peer.destroyed && !this.peer.disconnected) return;
    this.reopening = true;
    try {
      // a broker connection that is only cut is resumed with the same id; a destroyed one is opened again
      if (this.peer && !this.peer.destroyed && this.peer.disconnected) {
        try { this.peer.reconnect(); } catch { /* ignore */ }
        await sleep(2500);
        if (this.peer && !this.peer.destroyed && !this.peer.disconnected) return;
      }
      try { this.peer?.destroy(); } catch { /* ignore */ }
      const p = await this.open(this.code);
      if (this.closed) { p.destroy(); return; }
      this.peer = p; p.on('connection', c => this.accept(c));
    } catch { /* the id is still held by the broker: the next check tries again */ }
    finally { this.reopening = false; }
  }
  send(m) { queueMicrotask(() => this.room?.handle(this.me.id, m)); return true; }
  close() {
    this.closed = true;
    lifecycle.removeEventListener('resume', this.onResume);
    clearInterval(this.watch);
    this.stopTimer?.();
    this.room?.close();
    setTimeout(() => { this.conns.forEach(c => { try { c.close(); } catch { /* ignore */ } }); try { this.peer?.destroy(); } catch { /* ignore */ } }, 400);
  }
}

export class GuestLink extends Base {
  constructor(me) {
    super();
    this.kind = 'guest'; this.me = me; this.peer = null; this.conn = null; this.closed = false; this.retry = 0;
    this.onResume = () => { if (!this.conn?.open && !this.closed) this.reconnect(Date.now()); };
    lifecycle.addEventListener('resume', this.onResume);
  }
  async join(code, hello) {
    code = String(code || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (code.length !== 6) throw new Error('Le code contient 6 lettres.');
    this.code = code; this.hello = hello;
    try {
      this.peer = await openPeer(null, p => { if (!this.closed && !p.destroyed) setTimeout(() => { try { if (p.disconnected && !p.destroyed) p.reconnect(); } catch { /* destroyed */ } }, 1500); });
    } catch (e) { throw new Error(peerError(e)); }
    // the host may be away for a moment (its phone is sharing the code: iOS suspends the game): keep trying for a while
    const until = Date.now() + 45000;
    for (let tries = 0; ; tries++) {
      if (this.closed) throw new Error('Connexion annulée.');
      try { await this.connect(true); break; }
      catch (e) {
        if (!e.retry || Date.now() > until) throw e;
        if (!tries) this.status('waiting');
        await sleep(2500);
        if (this.peer.disconnected && !this.peer.destroyed) try { this.peer.reconnect(); } catch { /* ignore */ }
      }
    }
    return code;
  }
  connect(first = false) {
    return new Promise((resolve, reject) => {
      const conn = this.peer.connect(PREFIX + this.code, { reliable: true });
      let opened = false, done = false;
      const fail = e => {
        if (opened || done) return;
        done = true; clearTimeout(timer); this.peer.off?.('error', onErr);
        try { conn.close(); } catch { /* ignore */ }
        const err = new Error(peerError(e)); err.retry = ['peer-unavailable', 'timeout', 'network', 'disconnected', 'socket-closed', 'server-error'].includes(e?.type); reject(err);
      };
      const onErr = e => { if (['peer-unavailable', 'network', 'disconnected', 'socket-closed', 'server-error'].includes(e?.type)) fail(e); };
      this.peer.on('error', onErr);
      const timer = setTimeout(() => fail({ type: 'timeout' }), 15000);
      conn.on('open', () => {
        opened = true; clearTimeout(timer); this.peer.off?.('error', onErr);
        this.conn = conn;
        conn.send({ k: 'hello', id: this.me.id, hello: this.hello });
        this.status('online');
        resolve();
      });
      conn.on('data', raw => { let m = raw; if (typeof raw === 'string') { try { m = JSON.parse(raw); } catch { return; } } if (m && typeof m === 'object') this.emit(m); });
      conn.on('close', () => {
        if (this.conn !== conn || this.closed) return;
        this.conn = null;
        this.status('reconnecting');
        this.reconnect(Date.now());
      });
      if (first) conn.on('error', fail);
    });
  }
  reconnect(since) {
    clearTimeout(this.rt);
    this.rt = setTimeout(async () => {
      if (this.closed || this.conn?.open) return;
      try { if (this.peer.disconnected) this.peer.reconnect(); await this.connect(); }
      catch { if (Date.now() - since > 60000) this.status('closed', 'L’hôte a quitté la partie ou n’est plus joignable.'); else this.reconnect(since); }
    }, 2000);
  }
  send(m) { if (this.conn?.open) { try { this.conn.send(m); return true; } catch { return false; } } return false; }
  close() {
    this.closed = true; clearTimeout(this.rt);
    lifecycle.removeEventListener('resume', this.onResume);
    try { this.conn?.send({ k: 'leave' }); } catch { /* ignore */ }
    setTimeout(() => { try { this.conn?.close(); this.peer?.destroy(); } catch { /* ignore */ } }, 200);
  }
}
