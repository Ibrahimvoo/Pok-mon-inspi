// Online lobbies for Pouf Party: players connect directly to the host's browser (WebRTC data channels)
// after meeting through the PeerJS broker. The host runs the authoritative simulation; guests send inputs.
// A lobby is identified by a 5 character code; when the host leaves, the remaining players re-elect one.
import { Peer } from 'peerjs';
import { PUBLIC_ICE } from '../../rtc.js';
import { randomCode, codeFrom, cleanCode, sanitizeLook } from './codes.js';
export { randomCode, codeFrom, cleanCode, sanitizeLook };

const PREFIX = 'poufparty-v1-';
export const MAX_PLAYERS = 4, MAX_MEMBERS = 8;
// HOST_TIMEOUT leaves an iPhone host the time to share the code from another app before a new host is elected
const HEARTBEAT = 1000, HOST_TIMEOUT = 12000, GUEST_TIMEOUT = 12000, GRACE = 15000;
// a host that has just put the app in the background (to send the link) is not registered for a few seconds:
// a friend opening the link meanwhile keeps trying instead of failing on « Aucune partie ouverte »
export const JOIN_WAIT = 40000;

// tests can point to a local broker with ?peerhost=host:port (same switch as the console's rooms)
function peerOptions() {
  const o = new URLSearchParams(location.search).get('peerhost');
  if (!o) return { debug: 0, config: { iceServers: PUBLIC_ICE } };
  const [host, port] = o.split(':');
  return { debug: 0, host, port: +port, path: '/', secure: false };
}
export function netError(e) {
  return {
    'peer-unavailable': 'Aucune partie ouverte avec ce code.',
    'unavailable-id': 'Ce code est déjà pris.',
    network: 'Connexion au service de mise en relation impossible. Vérifiez votre connexion Internet.',
    'server-error': 'Le service de mise en relation ne répond pas. Réessayez dans un instant.',
    'browser-incompatible': 'Ce navigateur ne permet pas le jeu en ligne.',
    'socket-error': 'Connexion au service de mise en relation impossible.',
    'socket-closed': 'Connexion au service de mise en relation perdue.',
  }[e?.type] || e?.message || 'La connexion a échoué.';
}

function openPeer(id) {
  return new Promise((resolve, reject) => {
    let done = false;
    const p = id ? new Peer(id, peerOptions()) : new Peer(peerOptions());
    const timer = setTimeout(() => { if (!done) { done = true; try { p.destroy(); } catch { /* ignore */ } reject({ type: 'network' }); } }, 12000);
    p.once('open', () => { if (done) return; done = true; clearTimeout(timer); resolve(p); });
    p.once('error', e => { if (done) return; done = true; clearTimeout(timer); try { p.destroy(); } catch { /* ignore */ } reject(e); });
  });
}

// Lobby: emits 'state' (roster changed), 'msg' (game messages), 'status' ({ online, role, error }).
export class Lobby extends EventTarget {
  constructor(me) {
    super();
    this.me = me;               // { id, name, look }
    this.code = null; this.role = 'none'; this.online = false;
    this.members = [];          // [{ id, name, look, ready, host, joinedAt, online }]
    this.peer = null; this.conns = new Map(); this.hostConn = null;
    this.offset = 0; this.bestRtt = Infinity;
    this.closed = false; this.lastHostMsg = 0;
    this.timer = setInterval(() => this.tick(), HEARTBEAT);
  }
  emit(type, detail) { this.dispatchEvent(new CustomEvent(type, { detail })); }
  on(type, fn) { const h = e => fn(e.detail); this.addEventListener(type, h); return () => this.removeEventListener(type, h); }
  get isHost() { return this.role === 'host' || this.role === 'local'; }
  get hostNow() { return performance.now() + (this.isHost ? 0 : this.offset); }
  get players() { return this.members.slice(0, MAX_PLAYERS); }

  // ------------------------------------------------------------ create / join
  async host(code = randomCode()) {
    this.reset();
    this.code = code;
    this.members = [{ ...this.me, ready: true, host: true, joinedAt: Date.now(), online: true }];
    try {
      this.peer = await openPeer(PREFIX + code);
      if (this.closed) { this.peer.destroy(); return; }
      this.role = 'host'; this.online = true;
      this.peer.on('connection', c => this.accept(c));
      this.peer.on('disconnected', () => { if (!this.closed && this.peer && !this.peer.destroyed) setTimeout(() => { try { this.peer.reconnect(); } catch { /* destroyed */ } }, 1500); });
      this.peer.on('error', e => {
        // back from the background, the code is held by the player elected while we were away: join their lobby
        // (before, the error was ignored and the two phones stayed in two separate lobbies with the same code)
        if (e?.type === 'unavailable-id' && this.role === 'host' && !this.closed) { this.rejoin(); return; }
        if (e?.type === 'network' || e?.type === 'server-error') this.emit('status', { online: false, role: this.role, error: netError(e) });
      });
    } catch (e) {
      if (e?.type === 'unavailable-id') throw e;
      // no broker (offline, blocked network): the lobby still works for a solo run
      this.role = 'local'; this.online = false;
      this.emit('status', { online: false, role: 'local', error: netError(e) });
    }
    this.pushState();
    this.emit('status', { online: this.online, role: this.role });
  }
  async join(code, { wait = JOIN_WAIT } = {}) {
    code = cleanCode(code);
    if (code.length !== 5) throw new Error('Le code de partie contient 5 caractères.');
    this.reset();
    this.code = code;
    const until = Date.now() + wait;
    try {
      this.peer = await openPeer();
      for (let tries = 0; ; tries++) {
        try { await this.connect(code); break; }
        catch (e) {
          if (e?.type !== 'peer-unavailable' || Date.now() > until || this.closed || this.code !== code) throw e;
          if (!tries) this.emit('status', { online: false, role: 'none', waiting: true });
          await new Promise(r => setTimeout(r, 2500));
          if (this.closed || this.code !== code) throw e;
          if (this.peer?.disconnected) this.peer.reconnect();
        }
      }
    } catch (e) { if (this.code === code && !this.closed) this.reset(); throw new Error(netError(e)); }
  }
  // our code was taken over: join whoever holds it now (or host it again if it was freed)
  async rejoin() {
    if (this.rejoining) return;
    this.rejoining = true;
    const code = this.code;
    this.emit('status', { online: false, role: 'none', hostLost: true, takenOver: true });
    try { await this.claim(code, { wait: 75000 }); this.emit('status', { online: this.online, role: this.role, reelected: true }); }
    catch (e) { this.emit('status', { online: false, role: 'none', error: e.message || netError(e), lost: true }); }
    finally { this.rejoining = false; }
  }
  // Host the lobby if nobody has it yet, otherwise join it (party lobbies and host re-election).
  // `wait`: how long to keep trying while the code is held by a host that does not answer (an app frozen in the
  // background keeps its code on the broker for up to a minute before it is released).
  async claim(code, { wait = 60000 } = {}) {
    const until = Date.now() + wait;
    for (;;) {
      try { await this.host(code); return; }
      catch (e) { if (e?.type !== 'unavailable-id') throw e; }
      try { await this.join(code, { wait: 0 }); return; }
      catch (e) { if (Date.now() > until || this.closed) throw e; await new Promise(r => setTimeout(r, 1200 + Math.random() * 800)); }
    }
  }
  connect(code) {
    return new Promise((resolve, reject) => {
      const conn = this.peer.connect(PREFIX + code, { reliable: true, serialization: 'json' });
      let opened = false;
      const fail = e => { if (!opened) { opened = true; reject(e); } };
      const onErr = e => { if (e?.type === 'peer-unavailable') fail(e); };
      this.peer.on('error', onErr);
      conn.on('open', () => {
        this.hostConn = conn; this.role = 'guest'; this.online = true; this.lastHostMsg = performance.now();
        conn.send({ t: 'hello', user: this.me });
        for (let i = 0; i < 4; i++) setTimeout(() => this.ping(), 150 + i * 300);
      });
      conn.on('data', m => {
        if (!m || typeof m.t !== 'string') return;
        this.lastHostMsg = performance.now();
        if (m.t === 'welcome') { opened = true; this.peer?.off('error', onErr); this.members = m.members; this.emit('state', this.members); this.emit('status', { online: true, role: 'guest' }); resolve(); return; }
        if (m.t === 'denied') { fail({ message: m.message }); try { conn.close(); } catch { /* ignore */ } return; }
        this.guestHandle(m);
      });
      conn.on('close', () => { if (this.hostConn === conn) this.hostLost(); else fail({ type: 'peer-unavailable' }); });
      conn.on('error', fail);
      setTimeout(() => fail({ type: 'peer-unavailable' }), 15000);
    });
  }
  reset() {
    this.closed = false;
    this.conns.forEach(c => { try { c.conn.close(); } catch { /* ignore */ } });
    this.conns.clear();
    try { this.hostConn?.close(); } catch { /* ignore */ }
    this.hostConn = null;
    try { this.peer?.destroy(); } catch { /* ignore */ }
    this.peer = null; this.role = 'none'; this.online = false; this.members = []; this.offset = 0; this.bestRtt = Infinity;
  }
  leave() {
    if (this.role === 'guest') this.toHost({ t: 'bye' });
    if (this.role === 'host') this.broadcast({ t: 'closing' });
    // give the goodbye a moment to leave before tearing the connection down
    const peer = this.peer, conns = [...this.conns.values()], hc = this.hostConn;
    this.peer = null; this.hostConn = null; this.conns = new Map();
    this.closed = true; this.role = 'none'; this.online = false; this.members = [];
    setTimeout(() => { conns.forEach(c => { try { c.conn.close(); } catch { /* ignore */ } }); try { hc?.close(); } catch { /* ignore */ } try { peer?.destroy(); } catch { /* ignore */ } }, 250);
  }
  destroy() { this.leave(); clearInterval(this.timer); }

  // ------------------------------------------------------------ host side
  accept(conn) {
    const entry = { conn, id: null, last: performance.now() };
    conn.on('data', m => {
      if (!m || typeof m.t !== 'string') return;
      entry.last = performance.now();
      if (m.t === 'hello') {
        const u = m.user || {};
        const id = String(u.id || conn.peer).slice(0, 64);
        let mem = this.members.find(x => x.id === id);
        if (!mem && this.members.length >= MAX_MEMBERS) { conn.send({ t: 'denied', message: 'La partie est complète.' }); return; }
        const old = [...this.conns.values()].find(c => c.id === id && c !== entry);
        if (old) { this.conns.delete(old.conn.peer); try { old.conn.close(); } catch { /* ignore */ } }
        entry.id = id; this.conns.set(conn.peer, entry);
        if (mem) { mem.online = true; clearTimeout(mem.timer); mem.timer = 0; mem.name = String(u.name || mem.name).slice(0, 16); mem.look = sanitizeLook(u.look); }
        else { mem = { id, name: String(u.name || 'Joueur').slice(0, 16), look: sanitizeLook(u.look), ready: false, host: false, joinedAt: Date.now(), online: true }; this.members.push(mem); }
        conn.send({ t: 'welcome', members: this.publicMembers() });
        this.pushState();
        this.emit('joined', mem);
        return;
      }
      if (!entry.id) return;
      if (m.t === 'ping') { conn.send({ t: 'pong', c: m.c, h: performance.now() }); return; }
      if (m.t === 'bye') { this.drop(entry.id, true); return; }
      if (m.t === 'ready') { const mem = this.members.find(x => x.id === entry.id); if (mem) { mem.ready = !!m.v; this.pushState(); } return; }
      if (m.t === 'look') { const mem = this.members.find(x => x.id === entry.id); if (mem) { mem.look = sanitizeLook(m.look); this.pushState(); } return; }
      this.emit('msg', { ...m, from: entry.id });
    });
    conn.on('close', () => {
      if (this.conns.get(conn.peer) !== entry) return;
      this.conns.delete(conn.peer);
      if (entry.id) this.drop(entry.id, false);
    });
  }
  drop(id, now) {
    const mem = this.members.find(x => x.id === id);
    if (!mem || mem.host) return;
    for (const [k, c] of this.conns) if (c.id === id) { this.conns.delete(k); try { c.conn.close(); } catch { /* ignore */ } }
    if (now) { this.members = this.members.filter(x => x !== mem); this.pushState(); this.emit('left', mem); return; }
    mem.online = false; this.pushState();
    clearTimeout(mem.timer);
    // a reload keeps the seat for a few seconds
    mem.timer = setTimeout(() => { if (!mem.online) { this.members = this.members.filter(x => x !== mem); this.pushState(); this.emit('left', mem); } }, GRACE);
  }
  publicMembers() { return this.members.map(({ timer, ...m }) => m); }
  pushState() {
    if (this.isHost) this.broadcast({ t: 'members', members: this.publicMembers() });
    this.emit('state', this.members);
  }
  setReady(v) {
    if (this.isHost) { const m = this.members[0]; if (m) m.ready = true; return; }
    this.toHost({ t: 'ready', v });
  }
  setLook(look) {
    this.me.look = look;
    if (this.isHost) { const m = this.members.find(x => x.id === this.me.id); if (m) { m.look = look; this.pushState(); } }
    else this.toHost({ t: 'look', look });
  }
  broadcast(msg, except) {
    for (const c of this.conns.values()) if (c.id && c.id !== except && c.conn.open) { try { c.conn.send(msg); } catch { /* closing */ } }
  }
  sendTo(id, msg) { for (const c of this.conns.values()) if (c.id === id && c.conn.open) { try { c.conn.send(msg); } catch { /* closing */ } } }

  // ------------------------------------------------------------ guest side
  toHost(msg) { if (this.hostConn?.open) { try { this.hostConn.send(msg); return true; } catch { /* closing */ } } return false; }
  ping() { this.toHost({ t: 'ping', c: performance.now() }); }
  guestHandle(m) {
    if (m.t === 'pong') {
      const now = performance.now(), rtt = now - m.c;
      // keep the estimate from the fastest exchange (least queueing), refreshed slowly
      if (rtt < this.bestRtt * 1.2 || rtt < 60) { this.bestRtt = Math.min(rtt, this.bestRtt * 1.05 + 1); this.offset = m.h + rtt / 2 - now; }
      this.rtt = rtt;
      return;
    }
    if (m.t === 'members') { this.members = m.members; this.emit('state', this.members); return; }
    if (m.t === 'closing') { this.hostLost(true); return; }
    this.emit('msg', m);
  }
  hostLost(closing = false) {
    if (this.closed || this.role !== 'guest') return;
    const code = this.code, others = this.members.filter(x => !x.host && x.online !== false);
    this.hostConn = null; this.role = 'none'; this.online = false;
    this.emit('status', { online: false, role: 'none', hostLost: true, closing });
    // the earliest remaining member takes over as host, the others follow
    const rank = Math.max(0, others.findIndex(x => x.id === this.me.id));
    setTimeout(async () => {
      if (this.closed) return;
      try { try { this.peer?.destroy(); } catch { /* ignore */ } this.peer = null; await this.claim(code, { wait: 75000 }); this.emit('status', { online: this.online, role: this.role, reelected: true }); }
      catch (e) { this.emit('status', { online: false, role: 'none', error: e.message || netError(e), lost: true }); }
    }, 400 + rank * 1600);
  }

  tick() {
    if (this.closed) return;
    const now = performance.now();
    if (this.role === 'guest') {
      this.ping();
      if (now - this.lastHostMsg > HOST_TIMEOUT) { try { this.hostConn?.close(); } catch { /* ignore */ } this.hostLost(); }
    } else if (this.role === 'host') {
      for (const c of [...this.conns.values()]) if (c.id && now - c.last > GUEST_TIMEOUT) { this.conns.delete(c.conn.peer); try { c.conn.close(); } catch { /* ignore */ } this.drop(c.id, false); }
      if (this.peer?.disconnected && !this.peer.destroyed) { try { this.peer.reconnect(); } catch { /* ignore */ } }
    }
  }
}

