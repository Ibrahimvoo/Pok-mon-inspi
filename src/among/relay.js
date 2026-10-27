// Relay for the games hosted by a console (no project server): a minimal MQTT 3.1.1 client over WebSocket, talking to
// free public brokers. It carries the game when the direct connection (WebRTC) between two phones cannot be made
// (different networks, mobile data) and keeps the list of public games (retained messages).
// Only what the game needs: QoS 0 publish / subscribe, retained messages, keep-alive, reconnection.
const BROKERS = ['wss://broker.emqx.io:8084/mqtt', 'wss://broker.hivemq.com:8884/mqtt'];
export const TOPIC = 'ps5ux/au1/';
// tests point to a local broker with ?mqtt=ws://host:port
export function brokers() {
  const o = new URLSearchParams(location.search).get('mqtt');
  return o ? [o] : BROKERS;
}
const enc = new TextEncoder(), dec = new TextDecoder();
const str = s => { const b = enc.encode(s); return [b.length >> 8, b.length & 255, ...b]; };
function packet(type, body) {
  const out = [type]; let n = body.length;
  do { let d = n % 128; n = Math.floor(n / 128); if (n > 0) d |= 128; out.push(d); } while (n > 0);
  const a = new Uint8Array(out.length + body.length); a.set(out); a.set(body, out.length); return a;
}

export class Mqtt {
  constructor(url) {
    this.url = url; this.subs = new Map(); this.ws = null; this.open = false; this.closed = false; this.pid = 1;
    this.buf = new Uint8Array(0); this.waiting = [];
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
    if (this.closed) return;
    let ws;
    try { ws = new WebSocket(this.url, 'mqtt'); } catch (e) { this.fail(e); return; }
    ws.binaryType = 'arraybuffer';
    this.ws = ws;
    ws.onopen = () => {
      const id = 'ps5ux' + Math.random().toString(36).slice(2, 12);
      ws.send(packet(0x10, [...str('MQTT'), 4, 0x02, 0, 60, ...str(id)]));
    };
    ws.onmessage = e => this.data(new Uint8Array(e.data));
    ws.onclose = ws.onerror = () => {
      if (this.ws !== ws) return;
      this.ws = null; this.open = false; clearInterval(this.ping);
      this.fail(new Error('broker closed'));
      if (!this.closed && this.subs.size) setTimeout(() => { if (!this.ws && !this.closed) this.dial(); }, 2000);
    };
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
      this.open = true;
      this.ping = setInterval(() => this.send(packet(0xC0, [])), 30000);
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
  close() { this.closed = true; this.fail(new Error('closed')); clearInterval(this.ping); try { this.send(packet(0xE0, [])); this.ws?.close(); } catch { /* ignore */ } this.ws = null; }
}
function match(pat, topic) {
  const a = pat.split('/'), b = topic.split('/');
  for (let i = 0; i < a.length; i++) { if (a[i] === '#') return true; if (a[i] !== '+' && a[i] !== b[i]) return false; }
  return a.length === b.length;
}
// the first broker that answers (each one is tried in turn)
export async function anyBroker() {
  let last;
  for (const url of brokers()) {
    const m = new Mqtt(url);
    try { await m.connect(); return m; } catch (e) { last = e; m.close(); }
  }
  throw last || new Error('no broker');
}
// every broker that answers (the host listens on all of them: guests may reach a different one)
export async function allBrokers() {
  const res = await Promise.all(brokers().map(async url => { const m = new Mqtt(url); try { return await m.connect(); } catch { m.close(); return null; } }));
  return res.filter(Boolean);
}

// public games of the consoles: one retained message per room, refreshed by its host
export async function listPublic(map) {
  const out = new Map();
  const ms = await allBrokers();
  if (!ms.length) throw new Error('Impossible de joindre le service des parties publiques. Vérifiez votre connexion.');
  await new Promise(r => {
    ms.forEach(m => m.sub(TOPIC + 'pub/+', text => { try { const i = JSON.parse(text); if (i?.code) out.set(i.code, i); } catch { /* empty = removed */ } }));
    setTimeout(r, 1800);
  });
  ms.forEach(m => m.close());
  const now = Date.now();
  return [...out.values()].filter(i => now - i.at < 90000 && i.phase === 'lobby' && i.players < i.max && (!map || i.map === map)).sort((a, b) => b.players - a.players);
}
