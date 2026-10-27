// Sound effects only — no music anywhere in the game. The role reveal sounds come from the supplied
// "All roles sound effects" video (public/among/sfx, cut by tools/among/cut_sfx.py). Every other effect is
// synthesised here; dropping public/among/sfx/<name>.mp3 replaces the synthesised version of <name>.
import { audio } from '../audio.js';
import { state, bus } from '../state.js';

const CLIPS = ['shhh', 'introCrew', 'introImp', 'crewmate', 'engineer', 'guardianAngel', 'scientist', 'tracker', 'noisemaker', 'detective', 'impostor', 'shapeshifter', 'phantom', 'viper'];
const OPTIONAL = ['kill', 'report', 'emergency', 'vote', 'votesIn', 'eject', 'taskDone', 'taskStep', 'vent', 'alarm', 'fixed', 'door', 'click', 'step', 'win', 'lose', 'join', 'leave', 'shift', 'vanish', 'protect', 'countdown', 'chat'];
let ctx = null, out = null, noiseBuf = null;
const buffers = new Map(), missing = new Set(), last = new Map(), loops = new Map();

function setup() {
  audio.init();
  if (ctx || !audio.ctx) return !!ctx;
  ctx = audio.ctx;
  out = ctx.createGain(); out.connect(ctx.destination);
  const len = ctx.sampleRate; noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  volume();
  bus.addEventListener('change', e => { if (e.detail === 'settings') volume(); });
  for (const n of CLIPS) load(n, true);
  for (const n of OPTIONAL) load(n, false);
  return true;
}
function volume() { if (out) out.gain.setTargetAtTime(state.settings.sfx ? Math.max(.15, state.settings.sfxVol) : 0, ctx.currentTime, .05); }
async function load(name, required) {
  try {
    const r = await fetch(`among/sfx/${name}.mp3`);
    if (!r.ok || !/audio|octet/.test(r.headers.get('content-type') || 'audio')) { missing.add(name); return; }
    buffers.set(name, await ctx.decodeAudioData(await r.arrayBuffer()));
  } catch { missing.add(name); if (required) console.warn('missing sound', name); }
}
function clip(name, gain = 1) {
  const b = buffers.get(name); if (!b) return false;
  const s = ctx.createBufferSource(), v = ctx.createGain(); s.buffer = b; v.gain.value = gain; s.connect(v); v.connect(out); s.start();
  return true;
}
function tone(f, t, d, g, type = 'sine', slide = 0) {
  const o = ctx.createOscillator(), v = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f * slide), t + d);
  v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + .006); v.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(v); v.connect(out); o.start(t); o.stop(t + d + .05);
}
function noise(t, d, g, f, q = 1, type = 'bandpass', sweep = 0) {
  const s = ctx.createBufferSource(); s.buffer = noiseBuf;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, t);
  if (sweep) fl.frequency.exponentialRampToValueAtTime(f * sweep, t + d);
  const v = ctx.createGain(); v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(g, t + .01); v.gain.exponentialRampToValueAtTime(.0001, t + d);
  s.connect(fl); fl.connect(v); v.connect(out); s.start(t, Math.random() * .5); s.stop(t + d + .05);
}
const SYNTH = {
  click: t => { tone(1200, t, .05, .12, 'square', .5); },
  step: t => { noise(t, .06, .05, 900, 1.5); },
  kill: t => { noise(t, .25, .5, 3000, .8, 'highpass'); tone(160, t, .35, .45, 'sawtooth', .4); noise(t + .05, .4, .35, 500, 1, 'lowpass'); },
  report: t => { for (let i = 0; i < 3; i++) tone(880, t + i * .16, .14, .25, 'square', 1.02); tone(440, t + .5, .5, .25, 'sawtooth', .5); },
  emergency: t => { for (let i = 0; i < 4; i++) { tone(1046, t + i * .22, .18, .25, 'square'); tone(784, t + i * .22 + .1, .1, .15, 'square'); } },
  vote: t => { tone(660, t, .08, .2, 'triangle'); tone(990, t + .07, .12, .18, 'triangle'); },
  votesIn: t => { tone(523, t, .15, .2, 'triangle'); tone(392, t + .15, .25, .2, 'triangle'); },
  eject: t => { noise(t, 1.4, .25, 400, .7, 'lowpass', 3); },
  taskDone: t => { [784, 988, 1175].forEach((f, i) => tone(f, t + i * .08, .25, .2, 'triangle')); },
  taskStep: t => { tone(880, t, .12, .15, 'triangle'); },
  vent: t => { noise(t, .18, .4, 700, 1.2); tone(200, t, .12, .3, 'square', .5); },
  alarm: t => { tone(700, t, .45, .22, 'sawtooth', 1.5); tone(1050, t + .45, .45, .22, 'sawtooth', .66); },
  fixed: t => { tone(660, t, .1, .2, 'triangle'); tone(880, t + .1, .2, .2, 'triangle'); },
  door: t => { noise(t, .35, .4, 300, 1, 'lowpass'); tone(90, t, .3, .35, 'square', .7); },
  win: t => { [523, 659, 784, 1046].forEach((f, i) => tone(f, t + i * .12, .4, .2, 'triangle')); },
  lose: t => { [392, 330, 262].forEach((f, i) => tone(f, t + i * .18, .5, .22, 'triangle')); },
  join: t => { tone(523, t, .1, .15, 'triangle'); tone(784, t + .08, .15, .15, 'triangle'); },
  leave: t => { tone(784, t, .1, .15, 'triangle'); tone(523, t + .08, .15, .15, 'triangle'); },
  shift: t => { noise(t, .6, .3, 1500, 2, 'bandpass', .3); },
  vanish: t => { tone(1400, t, .5, .15, 'sine', .3); noise(t, .4, .15, 4000, 2, 'highpass'); },
  protect: t => { tone(1318, t, .6, .15, 'sine'); tone(1760, t + .1, .6, .1, 'sine'); },
  countdown: t => { tone(880, t, .1, .2, 'square'); },
  chat: t => { tone(1320, t, .06, .12, 'sine'); },
  shhh: t => { noise(t, 1.2, .3, 5000, 1.5, 'highpass'); },
};
// gap (ms) under which the same sound is not played again (no uncontrolled repetitions)
const GAP = { step: 280, click: 40, alarm: 850, vote: 120, chat: 150 };

export const sfx = {
  play(name, gain = 1) {
    if (!setup() || ctx.state !== 'running') { if (ctx?.state === 'suspended') ctx.resume().catch(() => {}); if (!ctx || ctx.state !== 'running') return; }
    const now = performance.now();
    if (now - (last.get(name) || 0) < (GAP[name] ?? 60)) return;
    last.set(name, now);
    if (clip(name, gain)) return;
    SYNTH[name]?.(ctx.currentTime + .01);
  },
  role(role) { this.play(CLIPS.includes(role) ? role : 'crewmate'); },
  // the reactor / O2 / seismic alarm repeats while the sabotage lasts, stopped by stopLoop
  loop(name, every) { if (loops.has(name)) return; this.play(name); loops.set(name, setInterval(() => this.play(name), every)); },
  stopLoop(name) { clearInterval(loops.get(name)); loops.delete(name); },
  stopAll() { loops.forEach(clearInterval); loops.clear(); },
  init: setup,
};
