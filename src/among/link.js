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
import { TOPIC, Mqtt, brokers } from './relay.js';

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

// Host: runs the room. Guests reach it directly (PeerJS / WebRTC) or, when that cannot be made, through the relay
// (relay.js, every broker at once). Messages to a guest go back the way (connection or broker) its last « hello » came.
export class HostLink extends Base {
  constructor(me) {
    super();
    this.kind = 'host'; this.me = me; this.conns = new Map(); this.peer = null; this.room = null; this.stopTimer = null; this.closed = false;
    this.relays = []; this.route = new Map(); this.seen = new Map(); this.helloSeq = new Map();
    // iOS suspends the page while the host shares the code. Back in the game, its connections may look open while
    // they are dead (the PeerJS broker then forgets the code after a while): every connection is renewed or checked
    // on return, and checked every few seconds while the page is visible
    this.onResume = e => { this.refresh(e?.detail?.away || 0); this.relays.forEach(m => m.check()); };
    lifecycle.addEventListener('resume', this.onResume);
    this.watch = setInterval(() => { if (!document.hidden) this.reopen(); this.dropSilent(); this.advertise(); }, 5000);
  }
  open(id) {
    return openPeer(PREFIX + id, p => { if (this.peer === p && !p.destroyed && !this.closed) setTimeout(() => { try { if (p.disconnected && !p.destroyed) p.reconnect(); } catch { /* destroyed */ } }, 1500); });
  }
  async create(hello, settings) {
    // the relay and the direct way are opened together (either one is enough to host); a broker that cannot be
    // reached now keeps being dialled in the background
    this.relays = brokers().map(url => new Mqtt(url, true));
    const relays = Promise.allSettled(this.relays.map(m => m.connect()));
    const anyRelay = new Promise(r => this.relays.forEach(m => m.connect().then(r, () => {})));
    let code = null, err = null;
    for (let i = 0; i < 4 && !this.peer; i++) {
      code = randomCode();
      try { this.peer = await this.open(code); }
      catch (e) { err = e; if (e?.type !== 'unavailable-id') break; }
    }
    await Promise.race([relays, anyRelay]);           // the others go on connecting in the background
    if (this.closed) { this.peer?.destroy(); this.relays.forEach(m => m.close()); throw new Error('Création annulée.'); }
    if (!this.peer && !this.relays.some(m => m.open)) { this.relays.forEach(m => m.close()); throw new Error(peerError(err)); }
    this.code = code;
    this.room = makeRoom(code, 'p2p', (id, m) => this.deliver(id, m));
    if (settings) this.room.settings = settings;
    this.room.onInfo = () => this.advertise();
    this.peer?.on('connection', c => this.accept(c));
    for (const m of this.relays) m.sub(`${TOPIC}room/${code}/up`, text => this.fromRelay(text, m));
    this.stopTimer = steadyTimer(() => this.room.tick(), TICK);
    this.room.join(this.me.id, hello);
    this.status('online');
    return code;
  }
  // a message from a guest, whatever the way; `via`: 'rtc' (with its connection) or the broker it came through
  incoming(id, m, via, conn) {
    if (!m || typeof m !== 'object') return;
    this.seen.set(id, Date.now());
    if (m.k === 'hello') {
      const seq = Number(m.seq) || 0;
      if (seq < (this.helloSeq.get(id) || 0)) return;         // an older hello through the way the guest left
      this.helloSeq.set(id, seq);
      this.route.set(id, via === 'rtc' ? conn : via);
      if (via === 'rtc') { const prev = this.conns.get(id); if (prev && prev !== conn) try { prev.close(); } catch { /* ignore */ } this.conns.set(id, conn); conn.memberId = id; }
      const err = this.room.join(id, m.hello || {});
      if (err) { this.deliver(id, { k: 'bye', reason: 'refused', msg: err }); this.route.delete(id); return; }
      if (m.hello?.look) this.room.handle(id, { k: 'look', ...m.hello.look });
      return;
    }
    if (!this.route.has(id)) return;
    if (m.k === 'leave') this.route.delete(id);
    this.room.handle(id, m);
  }
  fromRelay(text, broker) {
    let o; try { o = JSON.parse(text); } catch { return; }
    if (!o || typeof o.f !== 'string' || o.f === this.me.id) return;
    this.incoming(o.f.slice(0, 64), o.m, broker);
  }
  deliver(id, m) {
    if (id === this.me.id) { queueMicrotask(() => this.emit(m)); return; }
    const r = this.route.get(id);
    if (r instanceof Mqtt) {
      // through the guest's broker, or another one while it is down (the guest listens on all: one copy only)
      const b = r.open ? r : this.relays.find(x => x.open);
      b?.pub(`${TOPIC}room/${this.code}/dn/${id}`, JSON.stringify(m));
      return;
    }
    if (r?.open) { try { r.send(m); } catch { /* closing */ } }
  }
  accept(conn) {
    conn.on('data', raw => {
      let m = raw;
      if (typeof raw === 'string') { try { m = JSON.parse(raw); } catch { return; } }
      if (m?.k === 'hello') return this.incoming(String(m.id || conn.peer).slice(0, 64), m, 'rtc', conn);
      if (conn.memberId && this.route.get(conn.memberId) === conn) this.incoming(conn.memberId, m, 'rtc', conn);
    });
    conn.on('close', () => {
      const id = conn.memberId;
      if (id && this.conns.get(id) === conn) this.conns.delete(id);
      if (id && this.route.get(id) === conn) { this.route.delete(id); this.room.drop(id); }
    });
  }
  // relayed guests have no « close » event: they ping every 2 s, a long silence means they are gone
  dropSilent() {
    const now = Date.now();
    for (const [id, r] of this.route) if (r instanceof Mqtt && now - (this.seen.get(id) || 0) > 15000) { this.route.delete(id); this.room?.drop(id); }
  }
  // public games are listed through the relay (one retained message per room)
  advertise() {
    if (!this.room || this.closed) return;
    const t = `${TOPIC}pub/${this.code}`, info = this.room.info();
    if (this.room.public) {
      // on a change, or every 25 s so that the list knows the room is still there
      const key = JSON.stringify(info);
      if (key === this.adKey && Date.now() - this.adAt < 25000) return;
      this.adKey = key; this.adAt = Date.now();
      const s = JSON.stringify({ ...info, at: Date.now(), voice: this.room.settings.voiceChat !== false });
      this.relays.forEach(m => m.pub(t, s, true)); this.advertised = true;
    } else if (this.advertised) { this.relays.forEach(m => m.pub(t, '', true)); this.advertised = false; }
  }
  // back from the background: the PeerJS broker connection is renewed with the same code (the broker hands the code
  // over to the new connection, even while it still believes the old one is alive); the guests' connections stay
  refresh(away) {
    const p = this.peer;
    if (this.closed || !this.code || this.reopening || away < 1500 || !p || p.destroyed) { this.reopen(); return; }
    try { if (!p.disconnected) p.disconnect(); p.reconnect(); } catch { /* reopen() takes over */ }
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
    if (this.advertised) this.relays.forEach(m => m.pub(`${TOPIC}pub/${this.code}`, '', true));
    this.room?.close();
    setTimeout(() => {
      this.conns.forEach(c => { try { c.close(); } catch { /* ignore */ } }); try { this.peer?.destroy(); } catch { /* ignore */ }
      this.relays.forEach(m => m.close());
    }, 400);
  }
}

// Guest: the direct connection to the host and, from 4 s on (or at once when the direct way fails), the relay through
// every broker at once; the first way that answers is kept. The host may also be away for a moment (iOS suspends it
// while it shares the code): both ways are tried again for a while.
export class GuestLink extends Base {
  constructor(me) {
    super();
    this.kind = 'guest'; this.me = me; this.peer = null; this.conn = null; this.closed = false; this.mqs = null; this.mq = null; this.via = null;
    this.onResume = () => { if (this.closed) return; this.mqs?.forEach(m => m.check()); if (!this.alive()) this.reconnect(Date.now()); };
    lifecycle.addEventListener('resume', this.onResume);
  }
  alive() { return this.via === 'rtc' ? !!this.conn?.open : this.via === 'relay' ? Date.now() - this.heard < 12000 : false; }
  async join(code, hello) {
    code = String(code || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (code.length !== 6) throw new Error('Le code contient 6 lettres.');
    this.code = code; this.hello = hello;
    const until = Date.now() + 45000;
    for (let tries = 0; ; tries++) {
      if (this.closed) throw new Error('Connexion annulée.');
      try { await this.attempt(); break; }
      catch (e) {
        if (this.closed) throw new Error('Connexion annulée.');
        if (Date.now() > until) throw e;
        if (!tries) this.status('waiting');
        await sleep(2500);
      }
    }
    // the host stops answering for a while: try again (the room keeps the seat during its grace period)
    this.watch = setInterval(() => { if (!this.closed && this.via === 'relay' && !this.alive() && !this.rt) { this.status('reconnecting'); this.reconnect(Date.now()); } }, 3000);
    return code;
  }
  // the direct way, and the relay after 4 s (or at once when the direct way fails): the first that works is kept.
  // Each attempt has a number: a « hello » through the kept way carries it + .5, so the host follows that one.
  attempt() {
    this.seq = (this.seq || 0) + 1;
    return new Promise((resolve, reject) => {
      let done = false, relayOn = false;
      const why = {};
      const ok = () => { if (!done) { done = true; resolve(); } };
      const ko = (way, e) => {
        why[way] = e;
        if (done || !why.direct || !why.relay) return;
        done = true; reject(joinError(this.code, why.direct, why.relay));
      };
      const relay = () => { if (relayOn || done) return; relayOn = true; this.relayed().then(ok, e => ko('relay', e)); };
      this.direct().then(ok, e => { ko('direct', e); relay(); });
      setTimeout(relay, 4000);
    });
  }
  // the direct way. The connection itself is given 20 s: between two phones on different networks it can take that
  // long to be found (through a TURN relay), and the broker relay is tried meanwhile anyway.
  async direct() {
    if (this.closed) throw new Error('Connexion annulée.');
    // this console's own broker connection: a new one when the last one was lost (its id does not matter)
    if (this.peer && (this.peer.destroyed || this.peer.disconnected)) { try { this.peer.destroy(); } catch { /* ignore */ } this.peer = null; }
    if (!this.peer) {
      try { this.peer = await openPeerOnce(null); }
      catch (e) { throw peerFailure(e); }
      if (this.closed) { this.peer.destroy(); throw new Error('Connexion annulée.'); }
    }
    await this.connect(20000);
  }
  connect(ms) {
    return new Promise((resolve, reject) => {
      const conn = this.peer.connect(PREFIX + this.code, { reliable: true });
      let opened = false, done = false;
      const fail = e => {
        if (opened || done) return;
        done = true; clearTimeout(timer); this.peer.off?.('error', onErr);
        try { conn.close(); } catch { /* ignore */ }
        reject(peerFailure(e));
      };
      const onErr = e => { if (['peer-unavailable', 'network', 'disconnected', 'socket-closed', 'socket-error', 'server-error'].includes(e?.type)) fail(e); };
      this.peer.on('error', onErr);
      const timer = setTimeout(() => fail({ type: 'timeout' }), ms);
      conn.on('open', () => {
        if (done || this.closed || this.via === 'relay') { done = true; clearTimeout(timer); this.peer.off?.('error', onErr); try { conn.close(); } catch { /* ignore */ } reject(new Error('relais choisi')); return; }
        opened = true; clearTimeout(timer); this.peer.off?.('error', onErr);
        this.conn = conn; this.via = 'rtc';
        this.relayClose();
        conn.send({ k: 'hello', id: this.me.id, hello: this.hello, seq: this.seq + .5 });
        this.status('online');
        resolve();
      });
      conn.on('data', raw => { let m = raw; if (typeof raw === 'string') { try { m = JSON.parse(raw); } catch { return; } } if (m && typeof m === 'object' && this.conn === conn) this.emit(m); });
      conn.on('close', () => {
        if (this.conn !== conn || this.closed) return;
        this.conn = null; this.via = null;
        this.status('reconnecting');
        this.reconnect(Date.now());
      });
      conn.on('error', fail);
    });
  }
  // the relay: this console listens on every broker; the host answers through the one its « hello » came by last
  relayOpen() {
    if (this.mqs || this.closed) return;
    const t = `${TOPIC}room/${this.code}/dn/${this.me.id}`;
    this.mqs = brokers().map(url => {
      const m = new Mqtt(url, true);
      m.sub(t, text => this.fromRelay(text, m));
      m.connect().catch(() => { /* dialled again in the background */ });
      return m;
    });
  }
  relayClose() { this.mqs?.forEach(m => m.close()); this.mqs = null; this.mq = null; }
  fromRelay(text, broker) {
    let m; try { m = JSON.parse(text); } catch { return; }
    if (!m || typeof m !== 'object') return;
    this.heard = Date.now(); this.mq = broker;
    if (this.via === 'relay') this.emit(m); else this.pending?.(m);
  }
  // hello through every broker until the host answers (12 s)
  async relayed() {
    if (this.closed) throw new Error('Connexion annulée.');
    this.relayOpen();
    await new Promise((resolve, reject) => {
      const text = JSON.stringify({ f: this.me.id, m: { k: 'hello', id: this.me.id, hello: this.hello, seq: this.seq } });
      const hello = () => { if (this.via !== 'rtc') this.mqs?.forEach(m => m.pub(`${TOPIC}room/${this.code}/up`, text)); };
      const iv = setInterval(hello, 1500); hello();
      const t = setTimeout(() => {
        clearInterval(iv); this.pending = null;
        const reached = !!this.mqs?.some(m => m.open);
        const e = new Error(reached ? 'pas de réponse de l’hôte' : 'serveurs injoignables'); e.kind = reached ? 'nohost' : 'blocked';
        reject(e);
      }, 12000);
      this.pending = m => {
        clearInterval(iv); clearTimeout(t); this.pending = null;
        if (this.closed) return reject(new Error('Connexion annulée.'));
        if (this.via === 'rtc') return resolve();            // the direct way won meanwhile
        this.via = 'relay'; this.heard = Date.now();
        this.relaySend({ k: 'hello', id: this.me.id, hello: this.hello, seq: this.seq + .5 });
        this.status('online');
        this.emit(m);
        resolve();
      };
    });
  }
  relaySend(m) {
    const b = this.mq?.open ? this.mq : this.mqs?.find(x => x.open);
    return !!b?.pub(`${TOPIC}room/${this.code}/up`, JSON.stringify({ f: this.me.id, m }));
  }
  reconnect(since) {
    clearTimeout(this.rt);
    this.rt = setTimeout(async () => {
      this.rt = 0;
      if (this.closed || this.alive()) return;
      try { this.via = null; await this.attempt(); }
      catch { if (Date.now() - since > 60000) this.status('closed', 'L’hôte a quitté la partie ou n’est plus joignable.'); else this.reconnect(since); }
    }, 2000);
  }
  send(m) {
    if (this.via === 'rtc' && this.conn?.open) { try { this.conn.send(m); return true; } catch { return false; } }
    if (this.via === 'relay') return this.relaySend(m);
    return false;
  }
  close() {
    this.closed = true; clearTimeout(this.rt); clearInterval(this.watch);
    lifecycle.removeEventListener('resume', this.onResume);
    try { this.send({ k: 'leave' }); } catch { /* ignore */ }
    setTimeout(() => { try { this.conn?.close(); this.peer?.destroy(); } catch { /* ignore */ } this.relayClose(); }, 200);
  }
}

// a failure of the direct way, with its kind (PeerJS error type) for the final message
function peerFailure(e) {
  if (e instanceof Error && e.kind) return e;
  const err = new Error(peerError(e)); err.kind = e?.type || 'other';
  return err;
}
// neither way worked: what the player can do about it, then what each way answered (to report a problem)
function joinError(code, direct, relay) {
  const short = { 'peer-unavailable': 'code inconnu', timeout: 'pas de réponse', network: 'service injoignable', 'server-error': 'service injoignable', 'socket-error': 'service injoignable', 'socket-closed': 'service injoignable' }[direct.kind] || direct.message;
  const msg = direct.kind === 'peer-unavailable' && relay.kind === 'nohost'
    ? `Aucune partie ouverte avec le code ${code}. Vérifiez le code, et que l’hôte est dans le salon avec le jeu au premier plan.`
    : relay.kind === 'blocked' && short === 'service injoignable'
      ? 'Ni le service de mise en relation ni le relais ne répondent. Vérifiez votre connexion Internet (ou passez en Wi-Fi).'
      : `L’hôte de la partie ${code} ne répond pas. Vérifiez qu’il a le jeu ouvert au premier plan sur le salon, puis réessayez.`;
  return new Error(`${msg} (direct : ${short} · relais : ${relay.message})`);
}
