// Relay for the games hosted by a console (no project server): a minimal MQTT 3.1.1 client over WebSocket, talking to
// free public brokers. It carries the game when the direct connection (WebRTC) between two phones cannot be made
// (different networks, mobile data) and keeps the list of public games (retained messages).
// Only what the game needs: QoS 0 publish / subscribe, retained messages, keep-alive, reconnection.
// Several brokers are used at once (the first one that carries the host's answer is kept); the last one listens on the
// HTTPS port, which networks that block the other ports (some mobile, school or work networks) still let through.
const BROKERS = ['wss://broker.emqx.io:8084/mqtt', 'wss://broker.hivemq.com:8884/mqtt', 'wss://mqtt.eclipseprojects.io:443/mqtt'];
export const TOPIC = 'ps5ux/au1/';
// tests point to local brokers with ?mqtt=ws://host:port[,ws://host:port…]
export function brokers() {
  const o = new URLSearchParams(location.search).get('mqtt');
  return o ? o.split(',') : BROKERS;
}
const enc = new TextEncoder(), dec = new TextDecoder();
const str = s => { const b = enc.encode(s); return [b.length >> 8, b.length & 255, ...b]; };
function packet(type, body) {
  const out = [type]; let n = body.length;
  do { let d = n % 128; n = Math.floor(n / 128); if (n > 0) d |= 128; out.push(d); } while (n > 0);
  const a = new Uint8Array(out.length + body.length); a.set(out); a.set(body, out.length); return a;
}

export class Mqtt {
  // keep: dial again whenever the connection is lost, even before anything is subscribed (a host's relay)
  constructor(url, keep = false) {
    this.url = url; this.subs = new Map(); this.ws = null; this.open = false; this.closed = false; this.pid = 1; this.keep = keep;
    this.buf = new Uint8Array(0); this.waiting = []; this.fails = 0; this.heard = 0; this.pingAt = 0;
  }
  // resolves once the broker accepted the connection (rejects after `ms`)
  connect(ms = 8000) {
    if (this.open) return Promise.resolve(this);
    return new Promise((resolve, reject) => {
      this.waiting.push({ resolve, reject });
      const t = setTimeout(() => { this.waiting = this.waiting.filter(w => w.resolve !== resolve); reject(new Error('broker timeout')); }, ms);
      const done = this.waiting.at(-1); done.t = t;
      if (!this.ws) this.dial();
    });
  }
  dial() {
    clearTimeout(this.rt);
    if (this.closed || this.ws) return;
    let ws;
    try { ws = new WebSocket(this.url, 'mqtt'); } catch (e) { this.fail(e); return; }
    ws.binaryType = 'arraybuffer';
    this.ws = ws;
    // a broker that does not answer (port filtered by the network) is given up after a while, then dialled again
    clearTimeout(this.dt); this.dt = setTimeout(() => { if (this.ws === ws && !this.open) this.drop(); }, 10000);
    ws.onopen = () => {
      const id = 'ps5ux' + Math.random().toString(36).slice(2, 12);
      ws.send(packet(0x10, [...str('MQTT'), 4, 0x02, 0, 60, ...str(id)]));
    };
    ws.onmessage = e => { if (this.ws !== ws) return; this.heard = Date.now(); this.data(new Uint8Array(e.data)); };
    ws.onclose = ws.onerror = () => this.lost(ws);
  }
  lost(ws) {
    if (this.ws !== ws) return;
    this.ws = null; this.open = false; this.buf = new Uint8Array(0); clearInterval(this.ping); clearTimeout(this.ct);
    this.fail(new Error('broker closed'));
    // dial again: at once after a working connection, then less and less often while the broker stays unreachable
    if (!this.closed && (this.keep || this.subs.size)) this.rt = setTimeout(() => this.dial(), Math.min(30000, 1000 * 2 ** this.fails++));
  }
  // drop the connection and dial again (a socket that looks open but no longer carries anything)
  drop() {
    const ws = this.ws;
    if (!ws) return;
    this.lost(ws);
    try { ws.close(); } catch { /* ignore */ }
  }
  // every 10 s a ping; when the previous one is still unanswered the connection is dead. A phone back from the
  // background often keeps such a socket: it never closes by itself, and nothing goes through it any more.
  keepAlive() {
    if (!this.open) return;
    if (this.pingAt && this.heard < this.pingAt) { if (Date.now() - this.pingAt > 8000) this.drop(); return; }
    this.pingAt = Date.now(); this.send(packet(0xC0, []));
  }
  // the page comes back to the foreground: check the connection now (answer within 4 s) or dial at once
  check() {
    if (this.closed) return;
    if (!this.ws) { if (this.keep || this.subs.size) { this.fails = 0; this.dial(); } return; }
    if (!this.open) return;
    this.pingAt = Date.now(); this.send(packet(0xC0, []));
    clearTimeout(this.ct);
    this.ct = setTimeout(() => { if (this.open && this.heard < this.pingAt) this.drop(); }, 4000);
  }
  fail(e) { const w = this.waiting; this.waiting = []; w.forEach(x => { clearTimeout(x.t); x.reject(e); }); }
  data(chunk) {
    const b = new Uint8Array(this.buf.length + chunk.length); b.set(this.buf); b.set(chunk, this.buf.length);
    let i = 0;
    for (;;) {
      if (b.length - i < 2) break;
      let len = 0, mul = 1, j = i + 1, d;
      do { if (j >= b.length) { j = -1; break; } d = b[j++]; len += (d & 127) * mul; mul *= 128; } while (d & 128);
      if (j < 0 || j + len > b.length) break;
      this.packet(b[i], b.subarray(j, j + len));
      i = j + len;
    }
    this.buf = b.slice(i);
  }
  packet(h, body) {
    const type = h >> 4;
    if (type === 2) {                              // CONNACK
      if (body[1] !== 0) { this.fail(new Error('broker refused')); return; }
      this.open = true; this.fails = 0; this.pingAt = 0;
      clearInterval(this.ping); this.ping = setInterval(() => this.keepAlive(), 10000);
      for (const t of this.subs.keys()) this.subscribe(t);
      const w = this.waiting; this.waiting = []; w.forEach(x => { clearTimeout(x.t); x.resolve(this); });
    } else if (type === 3) {                       // PUBLISH (QoS 0)
      const tl = (body[0] << 8) | body[1], topic = dec.decode(body.subarray(2, 2 + tl));
      let off = 2 + tl; if ((h >> 1) & 3) off += 2;
      const text = dec.decode(body.subarray(off));
      for (const [pat, fns] of this.subs) if (match(pat, topic)) fns.forEach(f => { try { f(text, topic); } catch (e) { console.warn(e); } });
    }
  }
  send(p) { if (this.ws?.readyState === 1) { this.ws.send(p); return true; } return false; }
  subscribe(topic) { const id = this.pid = (this.pid % 65000) + 1; this.send(packet(0x82, [id >> 8, id & 255, ...str(topic), 0])); }
  sub(topic, fn) {
    if (!this.subs.has(topic)) { this.subs.set(topic, new Set()); if (this.open) this.subscribe(topic); }
    this.subs.get(topic).add(fn);
    return () => { const s = this.subs.get(topic); s?.delete(fn); if (s && !s.size) { this.subs.delete(topic); const id = this.pid = (this.pid % 65000) + 1; this.send(packet(0xA2, [id >> 8, id & 255, ...str(topic)])); } };
  }
  pub(topic, text, retain = false) { return this.send(packet(0x30 | (retain ? 1 : 0), [...str(topic), ...enc.encode(text)])); }
  close() { this.closed = true; this.fail(new Error('closed')); clearInterval(this.ping); clearTimeout(this.rt); clearTimeout(this.ct); clearTimeout(this.dt); try { this.send(packet(0xE0, [])); this.ws?.close(); } catch { /* ignore */ } this.ws = null; }
}
function match(pat, topic) {
  const a = pat.split('/'), b = topic.split('/');
  for (let i = 0; i < a.length; i++) { if (a[i] === '#') return true; if (a[i] !== '+' && a[i] !== b[i]) return false; }
  return a.length === b.length;
}
// every broker that answers within `ms` (the public list is read from all of them)
export async function allBrokers(ms = 8000) {
  const res = await Promise.all(brokers().map(async url => { const m = new Mqtt(url); try { return await m.connect(ms); } catch { m.close(); return null; } }));
  return res.filter(Boolean);
}

// public games of the consoles: one retained message per room, refreshed by its host
export async function listPublic(map) {
  const out = new Map();
  const ms = await allBrokers(5000);
  if (!ms.length) throw new Error('Impossible de joindre le service des parties publiques. Vérifiez votre connexion.');
  await new Promise(r => {
    ms.forEach(m => m.sub(TOPIC + 'pub/+', text => { try { const i = JSON.parse(text); if (i?.code) out.set(i.code, i); } catch { /* empty = removed */ } }));
    setTimeout(r, 1800);
  });
  ms.forEach(m => m.close());
  const now = Date.now();
  return [...out.values()].filter(i => now - i.at < 90000 && i.phase === 'lobby' && i.players < i.max && (!map || i.map === map)).sort((a, b) => b.players - a.players);
}
