// Synthesised sound for Pouf Party (Web Audio, no samples): comic puffs, splashes, bursts, jingles and a
// cheerful island tune. Shares the console's audio context and follows its sound settings.
import { audio as consoleAudio } from '../../audio.js';
import { state } from '../../state.js';

let ctx = null, out, sfx, music, noiseBuf, musicTimer = 0, nextNote = 0, step = 0, tempo = 112, musicOn = false;
const R = Math.random;

function init() {
  if (ctx) return true;
  consoleAudio.init();
  ctx = consoleAudio.ctx;
  if (!ctx) return false;
  out = ctx.createGain(); out.gain.value = .9;
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
  out.connect(comp); comp.connect(ctx.destination);
  sfx = ctx.createGain(); sfx.connect(out);
  music = ctx.createGain(); music.gain.value = 0; music.connect(out);
  const len = ctx.sampleRate * 2;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = R() * 2 - 1;
  applySettings();
  return true;
}
function applySettings() {
  if (!ctx) return;
  const s = state.settings;
  sfx.gain.setTargetAtTime(s.sfx ? s.sfxVol * 1.1 : 0, ctx.currentTime, .05);
  music.gain.setTargetAtTime(musicOn && s.music ? s.musicVol * .55 : 0, ctx.currentTime, .3);
}
const ok = () => init() && ctx.state === 'running';
const now = () => ctx.currentTime;

function env(g, t, a, d, peak) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(.0001, t + a + d);
}
function osc(type, f, t, dur, peak, { f2, dest = sfx, a = .005, pan = 0 } = {}) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  env(g, t, a, dur, peak);
  o.connect(g);
  connect(g, dest, pan);
  o.start(t); o.stop(t + a + dur + .05);
  return o;
}
function noise(t, dur, peak, { type = 'lowpass', f = 1200, f2, q = 1, dest = sfx, a = .005, pan = 0 } = {}) {
  const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, t); fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
  const g = ctx.createGain(); env(g, t, a, dur, peak);
  s.connect(fl); fl.connect(g); connect(g, dest, pan);
  s.start(t, R() * 1.5); s.stop(t + a + dur + .05);
}
function connect(node, dest, pan) {
  if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); node.connect(p); p.connect(dest); }
  else node.connect(dest);
}

export const sound = {
  init, applySettings,
  // the star of the show: a flappy, randomised trump. power 0.4 (little toot) … 2 (big one)
  puff(power = 1, { pitch = 1, pan = 0, vol = 1 } = {}) {
    if (!ok()) return;
    const t = now() + .005, dur = .12 + power * .2 + R() * .08;
    const f = (55 + R() * 40) * pitch * (power < .7 ? 1.8 : 1);
    const o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), g = ctx.createGain(), fl = ctx.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(f * 1.25, t); o.frequency.exponentialRampToValueAtTime(f * (.7 + R() * .3), t + dur);
    lfo.type = 'square'; lfo.frequency.setValueAtTime(18 + R() * 22, t); lfo.frequency.linearRampToValueAtTime(10 + R() * 10, t + dur);
    // flutter of the cheeks: a gain swinging between .2 and 1 at the LFO rate
    const flutter = ctx.createGain(); flutter.gain.value = .6; lg.gain.value = .4;
    lfo.connect(lg); lg.connect(flutter.gain);
    fl.type = 'lowpass'; fl.frequency.setValueAtTime(650 + power * 300, t); fl.Q.value = 3;
    env(g, t, .015, dur, .32 * vol * Math.min(1.4, .5 + power * .5));
    o.connect(fl); fl.connect(flutter); flutter.connect(g); connect(g, sfx, pan);
    o.start(t); lfo.start(t); o.stop(t + dur + .1); lfo.stop(t + dur + .1);
    noise(t, dur * .9, .06 * vol * power, { type: 'bandpass', f: 380, f2: 220, q: .8, pan });
  },
  sputter() { if (!ok()) return; const t = now(); for (let i = 0; i < 3; i++) osc('square', 90 + R() * 30, t + i * .07, .05, .06, { f2: 60 }); },
  bigPuff(pan = 0) {
    if (!ok()) return;
    sound.puff(2, { pitch: .8, pan });
    const t = now();
    noise(t, .7, .18, { f: 900, f2: 200, pan });
    osc('sine', 120, t, .4, .25, { f2: 45, pan });
  },
  splash(vol = 1, pan = 0) { if (!ok()) return; const t = now(); noise(t, .5, .22 * vol, { f: 2600, f2: 500, pan }); noise(t + .05, .35, .1 * vol, { type: 'highpass', f: 3000, pan }); osc('sine', 300, t, .15, .08 * vol, { f2: 90, pan }); },
  bump(v = 1) { if (!ok()) return; const t = now(); osc('sine', 160, t, .22, .3 * Math.min(1, v / 4), { f2: 60 }); noise(t, .15, .08 * Math.min(1, v / 4), { f: 600 }); },
  hit() { // boing + hiss of a puncture
    if (!ok()) return;
    const t = now();
    osc('triangle', 620, t, .5, .22, { f2: 140 }); osc('sine', 300, t + .02, .35, .15, { f2: 90 });
    noise(t + .05, 1.1, .08, { type: 'highpass', f: 5000, f2: 2500 });
  },
  pop() {
    if (!ok()) return;
    const t = now();
    noise(t, .25, .55, { f: 4000, f2: 300, a: .002 });
    osc('sine', 180, t, .3, .5, { f2: 40, a: .002 });
    osc('square', 900, t + .08, .5, .06, { f2: 120 });
    for (let i = 0; i < 4; i++) sound.splash(.6, (R() - .5) * 1.4);
  },
  checkpoint() {
    if (!ok()) return;
    const t = now(), notes = [72, 76, 79, 84];
    notes.forEach((m, i) => { const f = 440 * 2 ** ((m - 69) / 12); osc('triangle', f, t + i * .09, .35, .16); osc('sine', f * 2, t + i * .09, .25, .05); });
    noise(t + .3, .6, .05, { type: 'highpass', f: 6000 });
  },
  beep(go = false) { if (!ok()) return; const t = now(), f = go ? 1046 : 523; osc('square', f, t, go ? .5 : .18, .1); osc('sine', f * 2, t, go ? .5 : .15, .08); },
  fanfare() {
    if (!ok()) return;
    const t = now(), seq = [[60, 0], [64, .12], [67, .24], [72, .36], [67, .55], [72, .7], [76, .82]];
    seq.forEach(([m, d], i) => { const f = 440 * 2 ** ((m - 69) / 12); osc('square', f, t + d, i === seq.length - 1 ? .9 : .16, .07); osc('triangle', f, t + d, i === seq.length - 1 ? 1 : .2, .14); });
    for (let i = 0; i < 6; i++) noise(t + .8 + i * .08, .2, .05, { type: 'highpass', f: 5000 + R() * 3000 });
  },
  slam(vol = 1, pan = 0) { if (!ok() || vol < .03) return; const t = now(); noise(t, .2, .3 * vol, { type: 'bandpass', f: 900, q: 2, pan }); osc('square', 70, t, .25, .15 * vol, { f2: 40, pan }); osc('triangle', 1800, t, .3, .04 * vol, { f2: 1700, pan }); },
  whoosh(vol = 1, pan = 0) { if (!ok() || vol < .03) return; noise(now(), .5, .1 * vol, { type: 'bandpass', f: 400, f2: 1400, q: 1.5, pan, a: .2 }); },
  emote(id) {
    if (!ok()) return;
    const t = now();
    if (id === 'laugh') for (let i = 0; i < 4; i++) osc('triangle', 520 - i * 30, t + i * .11, .08, .1, { f2: 380 });
    else if (id === 'cheer') [0, .1, .2].forEach((d, i) => osc('triangle', 660 * (1 + i * .25), t + d, .18, .1));
    else if (id === 'angry') osc('sawtooth', 140, t, .4, .08, { f2: 90 });
    else if (id === 'love') { osc('sine', 880, t, .12, .1, { f2: 1320 }); osc('sine', 1320, t + .14, .2, .08, { f2: 990 }); }
    else osc('triangle', 700, t, .15, .1, { f2: 900 });
  },
  ui(kind = 'move') { if (!ok()) return; const t = now(); if (kind === 'ok') { osc('triangle', 880, t, .12, .1); osc('triangle', 1320, t + .05, .15, .08); } else osc('triangle', 1200, t, .05, .05); },

  // ---- island music: plucked chords, bouncy bass, marimba hook and shaker
  music(on, { fast = false } = {}) {
    if (!init()) return;
    musicOn = on; tempo = fast ? 124 : 104;
    applySettings();
    clearInterval(musicTimer);
    if (!on) return;
    nextNote = Math.max(nextNote, ctx.currentTime + .1);
    musicTimer = setInterval(schedule, 60);
  },
  stop() { clearInterval(musicTimer); musicOn = false; if (ctx) music.gain.setTargetAtTime(0, ctx.currentTime, .2); },
};

const CHORDS = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]; // C G Am F
const BASS = [48, 43, 45, 41];
const HOOK = [76, null, 79, 76, 74, null, 72, null, 74, 76, null, 72, 69, null, 67, null];
function schedule() {
  if (!ctx || ctx.state !== 'running') return;
  const spb = 60 / tempo / 2; // eighth notes
  while (nextNote < ctx.currentTime + .25) {
    const bar = Math.floor(step / 8) % 4, beat = step % 8, t = nextNote;
    const hz = m => 440 * 2 ** ((m - 69) / 12);
    // ukulele-ish strum on the off beats
    if (beat % 2 === 1 || beat === 0) CHORDS[bar].forEach((m, i) => pluck(hz(m + 12), t + i * .012, .22, beat === 0 ? .05 : .035));
    if (beat === 0 || beat === 3 || beat === 4 || beat === 6) bass(hz(BASS[bar] + (beat === 6 ? 7 : 0)), t, spb * 1.6);
    const hk = HOOK[(step + (Math.floor(step / 32) % 2) * 8) % 16];
    if (hk && Math.floor(step / 32) % 4 !== 3) marimba(hz(hk), t);
    shaker(t, beat % 2 ? .02 : .035);
    nextNote += spb; step++;
  }
}
function pluck(f, t, d, v) { const o = ctx.createOscillator(), g = ctx.createGain(), fl = ctx.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.setValueAtTime(3000, t); fl.frequency.exponentialRampToValueAtTime(600, t + d); env(g, t, .003, d, v); o.connect(fl); fl.connect(g); g.connect(music); o.start(t); o.stop(t + d + .05); }
function bass(f, t, d) { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = f; env(g, t, .01, d, .16); o.connect(g); g.connect(music); o.start(t); o.stop(t + d + .05); }
function marimba(f, t) { const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o2.type = 'sine'; o.frequency.value = f; o2.frequency.value = f * 4; env(g, t, .002, .35, .07); const g2 = ctx.createGain(); g2.gain.value = .25; o.connect(g); o2.connect(g2); g2.connect(g); g.connect(music); o.start(t); o2.start(t); o.stop(t + .4); o2.stop(t + .4); }
function shaker(t, v) { const s = ctx.createBufferSource(); s.buffer = noiseBuf; const fl = ctx.createBiquadFilter(); fl.type = 'highpass'; fl.frequency.value = 7000; const g = ctx.createGain(); env(g, t, .004, .05, v); s.connect(fl); fl.connect(g); g.connect(music); s.start(t, R()); s.stop(t + .08); }
