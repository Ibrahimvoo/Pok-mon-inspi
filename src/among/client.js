// Client side of a room: keeps the authoritative view sent by the room, interpolates the other players, predicts
// the local player's movement with the same collision code as the authority and sends it at 20 Hz.
import { getMap } from './core/room.js';
import { SPEED_BASE } from './core/rules.js';

const SEND_MS = 50;
const INTERP = 110;                 // render the others this far in the past (ms)

export class GameClient extends EventTarget {
  constructor(link, me) {
    super();
    this.link = link; this.me = me;
    this.v = null; this.looks = {}; this.n = -1; this.code = null; this.mode = null;
    this.mapId = 'lobby'; this.pos = { x: 0, y: 0 }; this.dir = 1; this.moving = false;
    this.seq = 0; this.lastSend = 0; this.sentStill = true;
    this.others = new Map();          // n → { buf: [[t,x,y,f,look]], x, y, f, look, seen }
    this.bodies = []; this.selfFlags = 0;
    this.offset = null; this.offsets = [];
    this.chat = []; this.hear = new Map(); this.voiceGroup = 'all';
    this.ping = 0; this.events = [];
    this.closed = false;
    this.onMsg = e => this.receive(e.detail);
    this.onStatus = e => this.emit('status', e.detail);
    link.addEventListener('msg', this.onMsg);
    link.addEventListener('status', this.onStatus);
    queueMicrotask(() => link.attach());
    this.pingTimer = setInterval(() => this.send({ k: 'ping', t: performance.now() }), 2000);
  }
  emit(type, detail) { this.dispatchEvent(new CustomEvent(type, { detail })); }
  on(type, fn) { const h = e => fn(e.detail); this.addEventListener(type, h); return () => this.removeEventListener(type, h); }
  send(m) { return this.link.send(m); }
  get map() { return getMap(this.mapId); }
  get phase() { return this.v?.phase || 'lobby'; }
  get inGame() { return !!this.v?.gid && !['lobby', 'countdown'].includes(this.phase); }
  get alive() { return !this.inGame || !!this.v?.me?.alive; }
  get ghost() { return this.inGame && this.v?.me && !this.v.me.alive && !this.v.me.spectator; }
  // server time (ms) estimated from snapshots
  serverNow() { return this.offset == null ? Date.now() : performance.now() + this.offset; }
  left(at) { return Math.max(0, (at || 0) - this.serverNow()); }
  player(n) { return this.v?.players.find(p => p.n === n) || this.looks?.[n] || null; }
  playerById(id) { return this.v?.players.find(p => p.id === id) || null; }
  get self() { return this.v?.players.find(p => p.n === this.n) || null; }

  receive(m) {
    if (!m || typeof m !== 'object') return;
    switch (m.k) {
      case 'welcome': this.n = m.n; this.code = m.code; this.mode = m.mode; this.chat = m.chat || []; this.emit('welcome', m); this.emit('chat'); break;
      case 'v': {
        const prevPhase = this.v?.phase, prevMap = this.v?.map;
        this.v = m.v; if (m.looks) this.looks = m.looks;
        if (prevPhase !== m.v.phase) this.emit('phase', { from: prevPhase, to: m.v.phase });
        if (prevMap !== m.v.map) this.emit('map');
        this.emit('view', m.v);
        break;
      }
      case 'pos':
        if (m.map && m.map !== this.mapId) { this.mapId = m.map; this.others.clear(); this.emit('map'); }
        this.pos = { x: m.x, y: m.y }; this.moving = false; this.lastSend = 0;
        this.emit('teleport', m);
        break;
      case 's': this.snapshot(m); break;
      case 'ev': this.emit('ev', m); break;
      case 'chat': this.chat.push(m.m); if (this.chat.length > 80) this.chat.shift(); this.emit('chat', m.m); break;
      case 'hear': this.hear = new Map(m.g.map(([n, g]) => [n, g / 100])); this.voiceGroup = m.group; this.emit('hear', m); break;
      case 'rtc': this.emit('rtc', m); break;
      case 'err': this.emit('err', m.msg); break;
      case 'pong': if (m.t) this.ping = Math.round(performance.now() - m.t); break;
      case 'bye': this.emit('bye', m); break;
    }
  }
  snapshot(m) {
    const now = performance.now();
    // offset = server − local, keep the smallest delay seen recently (least network jitter)
    const off = m.t - now;
    this.offsets.push(off); if (this.offsets.length > 40) this.offsets.shift();
    this.offset = Math.max(...this.offsets);
    const seen = new Set();
    for (const [n, x, y, f, look] of m.p) {
      seen.add(n);
      let o = this.others.get(n);
      if (!o) { o = { buf: [], x, y, f, look, frame: 0, walkT: 0 }; this.others.set(n, o); }
      o.buf.push([m.t, x, y, f, look]);
      if (o.buf.length > 30) o.buf.shift();
      o.gone = 0;
    }
    for (const [n, o] of this.others) if (!seen.has(n)) { o.gone = (o.gone || 0) + 1; if (o.gone > 1) this.others.delete(n); }
    this.bodies = m.b || [];
    this.selfFlags = m.f || 0;
  }
  // positions of the others at render time
  interpolate(dt) {
    const t = this.serverNow() - INTERP;
    for (const o of this.others.values()) {
      const b = o.buf;
      if (!b.length) continue;
      let i = b.length - 1;
      while (i > 0 && b[i - 1][0] > t) i--;
      const a = b[Math.max(0, i - 1)], c = b[i];
      if (c[0] <= t || a === c) { o.x = c[1]; o.y = c[2]; }
      else { const k = Math.max(0, Math.min(1, (t - a[0]) / (c[0] - a[0]))); o.x = a[1] + (c[1] - a[1]) * k; o.y = a[2] + (c[2] - a[2]) * k; }
      // big jumps (vents, teleports) snap instead of sliding across walls
      if (Math.hypot(c[1] - a[1], c[2] - a[2]) > 2.5) { o.x = c[1]; o.y = c[2]; }
      o.f = c[3]; o.look = c[4];
      const moving = o.f & 1;
      o.walkT = moving ? o.walkT + dt : 0;
    }
  }
  speed() {
    const s = this.v?.settings?.playerSpeed || 1;
    return SPEED_BASE * s * (this.ghost ? 1.15 : 1);
  }
  canMove() {
    const ph = this.phase;
    if (ph === 'lobby' || ph === 'countdown') return true;
    return ph === 'play' && !this.v?.me?.vent && !this.v?.me?.spectator;
  }
  // input: direction vector with |d| ≤ 1
  step(dx, dy, dt) {
    const now = performance.now();
    const len = Math.hypot(dx, dy);
    const want = len > .05 && this.canMove();
    if (want) {
      const sp = this.speed() * Math.min(1, len) * dt;
      const ux = dx / len * sp, uy = dy / len * sp;
      const M = this.map;
      let [x, y] = this.ghost ? M.clampBounds(this.pos.x + ux, this.pos.y + uy) : M.move(this.pos.x, this.pos.y, ux, uy, this.v?.closed);
      this.moving = Math.hypot(x - this.pos.x, y - this.pos.y) > 1e-4;
      if (Math.abs(dx) > .2) this.dir = dx < 0 ? -1 : 1;
      this.pos = { x, y };
    } else this.moving = false;
    if (this.moving || !this.sentStill) {
      if (now - this.lastSend >= SEND_MS) {
        this.lastSend = now;
        this.send({ k: 'mv', q: ++this.seq, x: Math.round(this.pos.x * 1000) / 1000, y: Math.round(this.pos.y * 1000) / 1000, d: this.dir, m: this.moving ? 1 : 0 });
        this.sentStill = !this.moving;
      }
    }
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    clearInterval(this.pingTimer);
    this.link.removeEventListener('msg', this.onMsg);
    this.link.removeEventListener('status', this.onStatus);
    try { this.send({ k: 'leave' }); } catch { /* gone */ }
    this.link.close();
  }
}
