// UNO audio, synthesised with Web Audio: card swishes and drops, action stingers, the UNO fanfare and a light
// lounge loop for the table. Follows the console's sound and music settings.
import { audio } from '../audio.js';
import { state, bus } from '../state.js';
import { voice } from '../rtc.js';

let ctx = null, fx, music, noiseBuf;
const hz = m => 440 * Math.pow(2, (m - 69) / 12);
function setup() {
  audio.init();
  if (ctx || !audio.ctx) return !!ctx;
  ctx = audio.ctx;
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -12; comp.ratio.value = 4; comp.connect(ctx.destination);
  fx = ctx.createGain(); music = ctx.createGain(); fx.connect(comp); music.connect(comp);
  const len = ctx.sampleRate;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  volumes();
  bus.addEventListener('change', e => { if (e.detail === 'settings') volumes(); });
  voice.on?.('change', volumes);
  return true;
}
function volumes() {
  if (!ctx) return;
  const s = state.settings, t = ctx.currentTime;
  fx.gain.setTargetAtTime(s.sfx ? Math.max(.2, s.sfxVol) : 0, t, .05);
  music.gain.setTargetAtTime(s.music && musicOn && !voice.active ? Math.max(.15, s.musicVol) * .5 : 0, t, .3);
}
function tone(f, t, d, g, type = 'sine', slide = 0, out = fx) {
  const o = ctx.createOscillator(), v = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + d);
  v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + .008); v.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(v); v.connect(out); o.start(t); o.stop(t + d + .05);
}
function noise(t, d, g, f, q = 1, type = 'bandpass', sweep = 0) {
  const s = ctx.createBufferSource(); s.buffer = noiseBuf;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, t);
  if (sweep) fl.frequency.exponentialRampToValueAtTime(f * sweep, t + d);
  const v = ctx.createGain(); v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + d * .25); v.gain.exponentialRampToValueAtTime(.0001, t + d);
  s.connect(fl); fl.connect(v); v.connect(fx); s.start(t, Math.random() * .5); s.stop(t + d + .05);
}
const S = {
  swish: t => noise(t, .16, .35, 2400, .8, 'bandpass', 2.2),
  place: t => { noise(t, .07, .5, 1800, .7); tone(140, t, .09, .25, 'sine', .6); },
  deal: t => { noise(t, .1, .28, 3000, .9, 'bandpass', 1.6); },
  draw: t => { noise(t, .14, .3, 1600, .8, 'bandpass', 2); tone(520, t + .04, .08, .05, 'triangle'); },
  shuffle: t => { for (let i = 0; i < 9; i++) noise(t + i * .045, .06, .25, 2600 + Math.random() * 1200, 1.2); },
  skip: t => { tone(330, t, .22, .25, 'square', .5); tone(220, t + .1, .25, .2, 'square', .5); },
  reverse: t => { noise(t, .5, .35, 600, 1.4, 'bandpass', 6); tone(300, t, .45, .12, 'sawtooth', 2.4); },
  plus: t => { [0, 4, 7, 12].forEach((m, i) => tone(hz(67 + m), t + i * .06, .25, .12, 'square')); noise(t + .24, .3, .4, 900, .8); },
  wild: t => { [0, 4, 7, 11, 14, 19].forEach((m, i) => tone(hz(72 + m), t + i * .05, .35, .1, 'triangle')); },
  color: t => { tone(hz(79), t, .18, .12, 'triangle'); tone(hz(84), t + .07, .25, .12, 'triangle'); },
  uno: t => { [[60, 64, 67], [65, 69, 72], [67, 71, 74, 79]].forEach((ch, i) => ch.forEach(m => tone(hz(m), t + i * .13, i === 2 ? .7 : .16, .09, 'sawtooth'))); noise(t + .26, .5, .2, 3000, .6, 'highpass'); },
  catch: t => { tone(160, t, .35, .3, 'sawtooth', .7); tone(150, t + .18, .45, .3, 'sawtooth', .6); },
  turn: t => { tone(hz(81), t, .14, .12, 'sine'); tone(hz(88), t + .09, .22, .12, 'sine'); },
  tick: t => tone(1400, t, .05, .08, 'square'),
  click: t => { tone(900, t, .04, .1, 'triangle'); },
  focus: t => tone(1200, t, .03, .035, 'sine'),
  error: t => { tone(200, t, .15, .18, 'square'); tone(150, t + .1, .2, .18, 'square'); },
  win: t => { [60, 64, 67, 72, 67, 72, 76, 79, 84].forEach((m, i) => tone(hz(m), t + i * .11, i === 8 ? 1.2 : .2, .1, 'square')); [48, 55, 60].forEach(m => tone(hz(m), t + .88, 1.4, .1, 'triangle')); },
  lose: t => { [67, 63, 60, 55].forEach((m, i) => tone(hz(m), t + i * .18, .35, .1, 'triangle')); },
  count: t => tone(hz(76), t, .12, .14, 'square'),
  go: t => { tone(hz(83), t, .5, .14, 'square'); tone(hz(88), t, .5, .1, 'square'); },
};
export function sfx(name, delay = 0) {
  if (!setup() || ctx.state !== 'running') return;
  try { S[name]?.(ctx.currentTime + .01 + delay); } catch { /* audio graph closed */ }
}

// ---------------------------------------------------------------- lounge loop (bass, keys and brushed hats)
let musicOn = false, timer = 0, step = 0, next = 0;
const BPM = 108, SPB = 60 / BPM / 2;
const PROG = [[57, 60, 64, 67], [62, 65, 69, 72], [55, 59, 62, 65], [60, 64, 67, 71]];
function schedule() {
  if (!ctx) return;
  while (next < ctx.currentTime + .25) {
    const bar = Math.floor(step / 8) % PROG.length, b = step % 8, ch = PROG[bar];
    if (b === 0 || b === 3 || b === 6) tone(hz(ch[0] - 24 + (b === 6 ? 7 : 0)), next, .32, .22, 'triangle', 1, music);
    if (b === 2 || b === 5) ch.forEach(m => tone(hz(m), next, .22, .035, 'square', 1, music));
    if (b % 2 === 1) { const s = ctx.createBufferSource(); s.buffer = noiseBuf; const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000; const v = ctx.createGain(); v.gain.setValueAtTime(.05, next); v.gain.exponentialRampToValueAtTime(.0001, next + .05); s.connect(f); f.connect(v); v.connect(music); s.start(next, Math.random() * .5); s.stop(next + .06); }
    step++; next += SPB;
  }
}
export function playMusic(on) {
  if (on === musicOn) return;
  musicOn = on;
  if (!setup()) { musicOn = false; return; }
  volumes();
  clearInterval(timer);
  if (on) { next = ctx.currentTime + .1; timer = setInterval(schedule, 100); }
}
