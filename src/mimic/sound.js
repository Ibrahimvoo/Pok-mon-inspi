// Mimic Party audio: game sound effects (synthesised live), the meme refs and playback of recordings. No music.
import { audio } from '../audio.js';
import { state, bus } from '../state.js';
import { resample, SR, features } from './dsp.js';

let ctx = null, master, fxBus, clipBus, quietGain;
const clips = new Map();     // ref id → Promise<AudioBuffer>
const feats = new Map();     // ref id → Promise<features>
const hz = m => 440 * Math.pow(2, (m - 69) / 12);

function setup() {
  audio.init();
  if (ctx || !audio.ctx) return !!ctx;
  ctx = audio.ctx;
  master = ctx.createGain();
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -10; comp.ratio.value = 4;
  quietGain = ctx.createGain();
  master.connect(comp); comp.connect(ctx.destination);
  fxBus = ctx.createGain(); clipBus = ctx.createGain();
  fxBus.connect(quietGain); quietGain.connect(master); clipBus.connect(master);
  applyVolumes();
  bus.addEventListener('change', e => { if (e.detail === 'settings') applyVolumes(); });
  return true;
}
function applyVolumes() {
  if (!ctx) return;
  const s = state.settings, t = ctx.currentTime;
  fxBus.gain.setTargetAtTime(s.sfx ? Math.max(.25, s.sfxVol) : 0, t, .05);
  clipBus.gain.setTargetAtTime(1, t, .05);
}

// ---------------------------------------------------------------- synth voices
function env(g, t, a, d, peak) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); }
function osc(type, f, t, d, peak, dest, { f2, a = .005, q, qType = 'lowpass', detune = 0 } = {}) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune;
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
  env(g, t, a, d, peak);
  let n = o;
  if (q) { const fl = ctx.createBiquadFilter(); fl.type = qType; fl.frequency.value = q; o.connect(fl); n = fl; }
  n.connect(g); g.connect(dest);
  o.start(t); o.stop(t + a + d + .05);
}
let noiseBuf = null;
function noise(t, d, peak, dest, { f = 3000, f2, type = 'bandpass', q = 1 } = {}) {
  noiseBuf ||= (() => { const b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), x = b.getChannelData(0); for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1; return b; })();
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true;
  fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + d);
  env(g, t, .004, d, peak);
  s.connect(fl); fl.connect(g); g.connect(dest);
  s.start(t, Math.random() * .5); s.stop(t + d + .05);
}
const kick = (t, dest, v = 1) => osc('sine', 150, t, .22, .9 * v, dest, { f2: 42 });
const clap = (t, dest, v = 1) => { for (let i = 0; i < 3; i++) noise(t + i * .011, .09 + i * .04, .32 * v, dest, { f: 1400, q: .9 }); };
const bell = (m, t, dest, v = 1) => { osc('sine', hz(m), t, .5, .09 * v, dest); osc('sine', hz(m) * 4, t, .12, .025 * v, dest); };

// ---------------------------------------------------------------- sound effects
const FX = {
  select: t => { osc('square', 880, t, .07, .05, fxBus, { q: 3000 }); osc('sine', 1320, t + .04, .1, .06, fxBus); },
  move: t => osc('sine', 1100, t, .05, .04, fxBus, { f2: 1250 }),
  back: t => osc('triangle', 660, t, .14, .08, fxBus, { f2: 330 }),
  pop: t => osc('sine', 300, t, .12, .2, fxBus, { f2: 900 }),
  whoosh: t => noise(t, .45, .14, fxBus, { f: 300, f2: 5000, q: .6 }),
  tick: t => osc('square', 1600, t, .03, .05, fxBus, { q: 4000 }),
  count: t => { osc('square', 660, t, .16, .09, fxBus, { q: 2500 }); osc('sine', 1320, t, .12, .05, fxBus); },
  go: t => { [72, 76, 79, 84].forEach((m, i) => osc('sawtooth', hz(m), t + i * .015, .5, .07, fxBus, { q: 3200 })); kick(t, fxBus); },
  recStart: t => { osc('sine', 880, t, .1, .12, fxBus); osc('sine', 1320, t + .1, .14, .12, fxBus); },
  recStop: t => { osc('sine', 1320, t, .1, .1, fxBus); osc('sine', 880, t + .1, .16, .1, fxBus); },
  ding: t => { [84, 88, 91].forEach((m, i) => bell(m, t + i * .07, fxBus, 2.2)); },
  buzz: t => { osc('sawtooth', 140, t, .35, .14, fxBus, { q: 900 }); osc('sawtooth', 147, t, .35, .12, fxBus, { q: 900 }); },
  reveal: t => { noise(t, 1.2, .1, fxBus, { f: 7000, type: 'highpass', q: .5 }); [60, 64, 67, 72].forEach(m => osc('sawtooth', hz(m), t, 1.1, .045, fxBus, { q: 2600 })); kick(t, fxBus); },
  coin: t => { osc('square', hz(83), t, .07, .06, fxBus, { q: 4000 }); osc('square', hz(88), t + .07, .25, .06, fxBus, { q: 4000 }); },
  cheer: t => {
    for (let i = 0; i < 14; i++) noise(t + Math.random() * .5, .5 + Math.random() * .7, .05, fxBus, { f: 900 + Math.random() * 1800, q: 1.5 });
    osc('sine', 2400, t + .2, .25, .04, fxBus, { f2: 3200 }); osc('sine', 2600, t + .55, .3, .04, fxBus, { f2: 3400 });
  },
  boo: t => { osc('sawtooth', 220, t, .9, .1, fxBus, { f2: 110, q: 600 }); osc('sawtooth', 224, t, .9, .08, fxBus, { f2: 112, q: 600 }); },
  fanfare: t => { [[67, 0], [72, .16], [76, .32], [79, .48], [84, .7]].forEach(([m, d]) => { osc('sawtooth', hz(m), t + d, d === .7 ? .9 : .2, .06, fxBus, { q: 3000 }); osc('square', hz(m - 12), t + d, d === .7 ? .9 : .2, .03, fxBus, { q: 1500 }); }); kick(t + .7, fxBus); clap(t + .7, fxBus); },
  drumroll: t => { for (let i = 0; i < 28; i++) noise(t + i * .045, .06, .07 + i * .004, fxBus, { f: 1800, q: .8 }); },
  clap: t => clap(t, fxBus, 1.4),
  slot: t => osc('square', 520 + Math.random() * 300, t, .04, .05, fxBus, { q: 3000 }),
  splat: t => { noise(t, .22, .22, fxBus, { f: 900, f2: 180, q: .7 }); osc('sine', 180, t, .12, .16, fxBus, { f2: 60 }); },
};
export function sfx(name, delay = 0) {
  if (!setup() || !FX[name] || ctx.state !== 'running') return;
  try { FX[name](ctx.currentTime + delay); } catch { /* a sound never breaks the game */ }
}
// ---------------------------------------------------------------- refs and recordings
// bumped whenever the refs are cut again, so that no browser keeps playing an older cut from its cache
export const REFS_REV = 2;
const decode = ab => new Promise((res, rej) => { try { const p = ctx.decodeAudioData(ab, res, rej); p?.catch?.(rej); } catch (e) { rej(e); } });
export function loadRef(id) {
  setup();
  if (!ctx) return Promise.reject(new Error('Son indisponible'));
  if (!clips.has(id)) {
    const p = fetch(`mimic/refs/${encodeURIComponent(id)}.mp3?v=${REFS_REV}`)
      .then(r => { if (!r.ok) throw new Error(`Réf introuvable (${r.status})`); return r.arrayBuffer(); })
      .then(decode);
    p.catch(() => clips.delete(id));
    clips.set(id, p);
  }
  return clips.get(id);
}
export function refFeatures(id) {
  if (!feats.has(id)) {
    const p = loadRef(id).then(b => features(resample(b.getChannelData(0), b.sampleRate, SR)));
    p.catch(() => feats.delete(id));
    feats.set(id, p);
  }
  return feats.get(id);
}
// the microphone is recorded raw (no automatic gain, so that noises and melodies stay intact): a voice then comes out
// far quieter than the refs (about -16 dB). For playback only, the take is brought to the loudness of the refs,
// measured on the frames where someone is actually making a sound, with a soft limiter instead of clipping
const TARGET = .17, MAX_GAIN = 20, KNEE = .8;
function loudness(x) {
  const F = 320; let e = 0, n = 0, pk = 0;
  for (let i = 0; i + F <= x.length; i += F) {
    let f = 0; for (let j = i; j < i + F; j++) { f += x[j] * x[j]; const a = Math.abs(x[j]); if (a > pk) pk = a; }
    f /= F;
    if (f > 1e-5) { e += f; n++; }       // above -50 dBFS: a sound, not the room
  }
  return n ? TARGET / Math.sqrt(e / n) : 1;
}
function leveled(x) {
  const g = Math.min(MAX_GAIN, Math.max(.5, loudness(x)));
  if (Math.abs(g - 1) < .05) return x;
  const y = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) {
    const v = x[i] * g, a = Math.abs(v);
    y[i] = a <= KNEE ? v : Math.sign(v) * (KNEE + (1 - KNEE) * Math.tanh((a - KNEE) / (1 - KNEE)));
  }
  return y;
}
export function pcmBuffer(x) {
  setup();
  const y = resample(leveled(x), SR, ctx.sampleRate), b = ctx.createBuffer(1, Math.max(1, y.length), ctx.sampleRate);
  b.getChannelData(0).set(y);
  return b;
}
// plays an AudioBuffer; returns { done: Promise, stop(), level() } — level drives speakers and mouths
export function playBuffer(buf, { gain = 1, offset = 0, max = 0 } = {}) {
  setup();
  const s = ctx.createBufferSource(), g = ctx.createGain(), an = ctx.createAnalyser();
  an.fftSize = 512; const td = new Float32Array(an.fftSize);
  s.buffer = buf; g.gain.value = gain;
  s.connect(g); g.connect(an); g.connect(clipBus);
  let finished = false, resolve, lv = 0;
  const done = new Promise(r => { resolve = r; });
  const end = () => { if (finished) return; finished = true; try { g.disconnect(); } catch { /* ignore */ } resolve(); };
  s.onended = end;
  const len = max ? Math.min(max, buf.duration - offset) : buf.duration - offset;
  s.start(ctx.currentTime + .02, offset, Math.max(.05, len));
  if (max) { g.gain.setValueAtTime(gain, ctx.currentTime + .02 + len - .25); g.gain.linearRampToValueAtTime(0, ctx.currentTime + .02 + len); }
  // safety net: some mobile browsers drop onended after an interruption
  setTimeout(end, (len + 1.5) * 1000);
  return {
    done,
    get playing() { return !finished; },
    stop() { if (finished) return; try { s.stop(); } catch { /* not started */ } end(); },
    level() {
      if (finished) return 0;
      an.getFloatTimeDomainData(td); let e = 0; for (const v of td) e += v * v;
      const v = Math.min(1, Math.max(0, (10 * Math.log10(e / td.length + 1e-12) + 50) / 40));
      lv = v > lv ? v : lv * .82 + v * .18; return lv;
    },
  };
}
// recording phases: no effect may leak into the microphone
export function quiet(on) {
  if (!setup()) return;
  quietGain.gain.setTargetAtTime(on ? 0 : 1, ctx.currentTime, .03);
}
export const soundReady = () => setup() && ctx.state === 'running';
