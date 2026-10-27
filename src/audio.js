// All sound is synthesised live with the Web Audio API: interface cues and an ambient score.
let ctx, master, sfxBus, musicBus, verb, verbSend;
let sfxOn = true, sfxVol = .7, musicOn = true, musicVol = .4;
let mood = 'home', duck = 1, timer = 0, nextChord = 0, nextBell = 0, chordIx = 0, voices = [];
const lastPlay = {};

const MOODS = {
  home: { chords: [[50, 57, 62, 66, 69], [47, 54, 59, 62, 66], [43, 50, 57, 59, 62], [45, 52, 57, 61, 64]], cut: 1000, bell: [74, 76, 78, 81, 83, 86], rate: 2.6 },
  dark: { chords: [[45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 58], [40, 47, 52, 55]], cut: 620, bell: [69, 72, 76, 79], rate: 4.5 },
  space: { chords: [[48, 55, 62, 64, 67], [53, 60, 65, 67, 72], [45, 52, 59, 62, 64], [50, 57, 64, 66, 69]], cut: 1200, bell: [79, 81, 84, 86, 88, 91], rate: 2.2 },
  bright: { chords: [[52, 59, 64, 68, 71], [49, 56, 61, 64, 68], [45, 52, 57, 61, 64], [47, 54, 59, 63, 66]], cut: 1600, bell: [76, 78, 80, 83, 85, 88], rate: 1.5 },
  warm: { chords: [[48, 55, 60, 64, 67], [45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [43, 50, 55, 59, 62]], cut: 900, bell: [72, 74, 76, 79, 81, 84], rate: 2.8 },
};
const MOOD_OF = { dark: 'dark', horror: 'dark', storm: 'dark', alien: 'dark', space: 'space', deep: 'space', cold: 'space', mystic: 'space',
  synth: 'bright', drive: 'bright', stadium: 'bright', party: 'bright', calm: 'warm', warm: 'warm', epic: 'warm', desert: 'warm', dusk: 'warm' };
const hz = m => 440 * Math.pow(2, (m - 69) / 12);

function impulse(sec = 2.6) {
  const len = ctx.sampleRate * sec, b = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  return b;
}

function tone({ f, f2, type = 'sine', t = 0, a = .004, d = .2, g = .1, send = .15, pan = 0, bus = sfxBus, q }) {
  const now = ctx.currentTime + t;
  const o = ctx.createOscillator(), v = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, now);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, now + d * .8);
  v.gain.setValueAtTime(0, now);
  v.gain.linearRampToValueAtTime(g, now + a);
  v.gain.exponentialRampToValueAtTime(.0001, now + a + d);
  let node = o;
  if (q) { const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = q; o.connect(fl); node = fl; }
  node.connect(v);
  let out = v;
  if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; v.connect(p); out = p; }
  out.connect(bus);
  if (send) { const s = ctx.createGain(); s.gain.value = send; out.connect(s); s.connect(verbSend); }
  o.start(now); o.stop(now + a + d + .05);
}

function noise({ t = 0, d = .15, g = .05, f = 2000, f2, q = 1.2, send = .1, type = 'bandpass' }) {
  const now = ctx.currentTime + t, len = Math.ceil(ctx.sampleRate * (d + .05));
  const b = ctx.createBuffer(1, len, ctx.sampleRate), data = b.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(); s.buffer = b;
  const fl = ctx.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, now);
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, now + d);
  const v = ctx.createGain(); v.gain.setValueAtTime(0, now); v.gain.linearRampToValueAtTime(g, now + d * .3); v.gain.exponentialRampToValueAtTime(.0001, now + d);
  s.connect(fl); fl.connect(v); v.connect(sfxBus);
  if (send) { const sg = ctx.createGain(); sg.gain.value = send; v.connect(sg); sg.connect(verbSend); }
  s.start(now); s.stop(now + d + .05);
}

const SFX = {
  move: () => { tone({ f: 2350, d: .05, g: .05, send: .08 }); noise({ d: .018, g: .02, f: 5200, q: 3, send: 0 }); },
  ok: () => { tone({ f: 1318.5, d: .22, g: .07 }); tone({ f: 1975.5, t: .035, d: .3, g: .05, send: .3 }); },
  back: () => { tone({ f: 1046, f2: 700, d: .14, g: .06, send: .12 }); },
  tab: () => { noise({ d: .2, g: .05, f: 700, f2: 3200, q: .8, send: .2 }); tone({ f: 1760, t: .05, d: .12, g: .03 }); },
  open: () => { noise({ d: .28, g: .04, f: 400, f2: 2400, q: .7, send: .3 }); tone({ f: 880, t: .08, d: .35, g: .04, send: .4 }); tone({ f: 1318.5, t: .12, d: .4, g: .03, send: .4 }); },
  error: () => { tone({ f: 220, type: 'triangle', d: .09, g: .09, send: 0, q: 900 }); tone({ f: 196, type: 'triangle', t: .11, d: .12, g: .09, send: 0, q: 900 }); },
  key: () => { tone({ f: 1800, d: .03, g: .035, send: 0 }); },
  toggle: () => { tone({ f: 1567.98, d: .09, g: .05 }); tone({ f: 2093, t: .05, d: .12, g: .04 }); },
  notify: () => { [1046.5, 1318.5, 1568].forEach((f, i) => { tone({ f, t: i * .075, d: .55, g: .06, send: .45, pan: (i - 1) * .3 }); tone({ f: f * 2, t: i * .075, d: .3, g: .015, send: .4 }); }); },
  trophy: () => { [1568, 2093, 2637, 3136].forEach((f, i) => { tone({ f, t: i * .018, d: 1.6, g: .05, send: .6, pan: (i - 1.5) * .25 }); tone({ f: f * 1.003, t: i * .018 + .01, d: 1.4, g: .02, send: .6 }); }); noise({ d: .6, g: .02, f: 6000, q: .6, send: .5 }); },
  purchase: () => { [1046.5, 1318.5, 1568, 2093].forEach((f, i) => tone({ f, t: i * .06, d: .5, g: .055, send: .4 })); },
  launch: () => { tone({ f: 110, f2: 38, d: .9, g: .35, send: .2, type: 'sine' }); noise({ d: .7, g: .08, f: 300, f2: 4200, q: .6, send: .4 }); tone({ f: 659, t: .1, d: 1.2, g: .04, send: .7 }); tone({ f: 987.8, t: .16, d: 1.2, g: .035, send: .7 }); },
  boot: () => {
    const now = ctx.currentTime;
    [38, 50, 57, 62, 66, 69, 74].forEach((m, i) => {
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), fl = ctx.createBiquadFilter(), v = ctx.createGain();
      o.type = o2.type = 'sawtooth'; o.frequency.value = hz(m); o2.frequency.value = hz(m) * 1.004;
      fl.type = 'lowpass'; fl.frequency.setValueAtTime(150, now); fl.frequency.exponentialRampToValueAtTime(2600, now + 2.6); fl.frequency.exponentialRampToValueAtTime(500, now + 6);
      v.gain.setValueAtTime(0, now); v.gain.linearRampToValueAtTime(.022 - i * .002, now + 2.2); v.gain.exponentialRampToValueAtTime(.0001, now + 6.5);
      o.connect(fl); o2.connect(fl); fl.connect(v); v.connect(sfxBus);
      const s = ctx.createGain(); s.gain.value = .6; v.connect(s); s.connect(verbSend);
      o.start(now); o2.start(now); o.stop(now + 6.6); o2.stop(now + 6.6);
    });
    [2349, 2793, 3520, 4186].forEach((f, i) => tone({ f, t: 2.35 + i * .045, d: 2.4, g: .03, send: .8, pan: (i - 1.5) * .4 }));
    tone({ f: 73.4, t: 2.3, d: 2.5, g: .2, send: .3 });
  },
  power: () => { [880, 659, 523, 440].forEach((f, i) => tone({ f, t: i * .12, d: .7, g: .05, send: .5 })); },
  wake: () => { [523, 659, 880, 1046].forEach((f, i) => tone({ f, t: i * .1, d: .7, g: .05, send: .5 })); },
  ring: () => { [0, .18].forEach(t => { tone({ f: 1318.5, t, d: .16, g: .07, send: .2 }); tone({ f: 1046.5, t: t + .08, d: .2, g: .05, send: .2 }); }); },
  join: () => { tone({ f: 784, d: .18, g: .06, send: .3 }); tone({ f: 1174.7, t: .09, d: .3, g: .06, send: .4 }); },
  leave: () => { tone({ f: 1174.7, d: .16, g: .05, send: .3 }); tone({ f: 784, t: .09, d: .28, g: .05, send: .3 }); },
};

function voice(m, start, len, cut) {
  const o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), fl = ctx.createBiquadFilter(), v = ctx.createGain();
  o1.type = 'sawtooth'; o2.type = 'triangle';
  o1.frequency.value = hz(m); o2.frequency.value = hz(m) * 1.0045;
  fl.type = 'lowpass'; fl.Q.value = .4;
  fl.frequency.setValueAtTime(cut * .6, start); fl.frequency.linearRampToValueAtTime(cut, start + len * .5); fl.frequency.linearRampToValueAtTime(cut * .55, start + len + 4);
  const g = .022 / Math.max(1, (m - 40) / 14);
  v.gain.setValueAtTime(0, start); v.gain.linearRampToValueAtTime(g, start + 3); v.gain.setValueAtTime(g, start + len); v.gain.linearRampToValueAtTime(0, start + len + 4);
  o1.connect(fl); o2.connect(fl); fl.connect(v); v.connect(musicBus);
  const s = ctx.createGain(); s.gain.value = .5; v.connect(s); s.connect(verbSend);
  o1.start(start); o2.start(start); o1.stop(start + len + 4.2); o2.stop(start + len + 4.2);
  voices.push(o1, o2);
}
function bell(m, t) {
  tone({ f: hz(m), t, d: 3.2, g: .025, send: .9, pan: Math.random() * 1.4 - .7, bus: musicBus });
  tone({ f: hz(m) * 2.01, t, d: 1.4, g: .006, send: .9, bus: musicBus });
}
function schedule() {
  if (!ctx || !musicOn || musicVol <= 0 || ctx.state !== 'running') return;
  const now = ctx.currentTime, M = MOODS[mood];
  if (now + .5 >= nextChord) {
    const start = Math.max(now + .05, nextChord), len = 9;
    M.chords[chordIx++ % M.chords.length].forEach(m => voice(m, start, len, M.cut));
    nextChord = start + len;
    voices = voices.slice(-40);
  }
  if (now >= nextBell) {
    bell(M.bell[Math.floor(Math.random() * M.bell.length)], .05);
    if (Math.random() < .35) bell(M.bell[Math.floor(Math.random() * M.bell.length)] - 12, .4);
    nextBell = now + M.rate * (.6 + Math.random() * .9);
  }
}
// ---------------------------------------------------------------- output device changes (speaker, AirPods, headphones)
// iOS can stop or interrupt the audio context when the route changes (AirPods put in or taken out, headphones,
// a phone call, Siri) without the page being hidden, and nothing restarted it: every sound was silently dropped
// until the app was reloaded. The context is now watched and restarted, from the next tap when iOS requires one.
const IOS_DEVICE = /iP(hone|ad|od)/.test(navigator.platform || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const events = new EventTarget();
let wanted = 'running', rerouteT = 0;
function note(kind, detail = {}) {
  events.dispatchEvent(new CustomEvent('log', { detail: { kind, ...detail, state: ctx?.state || 'none' } }));
}
function revive(why) {
  if (!ctx || wanted !== 'running' || ctx.state === 'running' || ctx.state === 'closed' || document.hidden) return;
  ctx.resume().then(() => { if (ctx.state === 'running') note('resumed', { why }); }).catch(() => {});
}
// a tap or a key is a user gesture: iOS accepts the restart from it
for (const ev of ['touchend', 'pointerdown', 'keydown']) addEventListener(ev, () => revive('gesture'), { capture: true, passive: true });
// Safari 16.4+: the audio session decides how the page sounds. 'playback' keeps playing with the silent switch on and
// leaves Bluetooth headphones on their high-quality profile; a voice call needs 'play-and-record' (microphone).
function sessionType(type) {
  try { if (navigator.audioSession && navigator.audioSession.type !== type) { navigator.audioSession.type = type; note('session', { session: type }); } } catch { /* not supported */ }
}
function reroute(why) {
  if (!ctx || wanted !== 'running') return;
  note('route', { why });
  // reopening the output makes iOS pick the new route (and its sample rate) instead of a device that is gone
  if (IOS_DEVICE && ctx.state === 'running') ctx.suspend().then(() => ctx.resume()).catch(() => {}).finally(() => revive(why));
  else revive(why);
  events.dispatchEvent(new CustomEvent('reroute', { detail: { why } }));
}
navigator.mediaDevices?.addEventListener?.('devicechange', () => { clearTimeout(rerouteT); rerouteT = setTimeout(() => reroute('devicechange'), 400); });

function applyMusicGain(fade = 1.2) {
  if (!ctx) return;
  const g = musicOn ? musicVol * duck : 0;
  musicBus.gain.cancelScheduledValues(ctx.currentTime);
  musicBus.gain.setTargetAtTime(g, ctx.currentTime, fade / 3);
}

let callMode = false;
const capturing = new Set();   // who uses the microphone right now (voice call, Mimic Party, the mic test)
export const audio = {
  events, ios: IOS_DEVICE,
  get ready() { return !!ctx && ctx.state === 'running'; },
  get ctx() { return ctx; },
  init() {
    if (ctx) { if (ctx.state !== 'running') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = .9;
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3;
      master.connect(comp); comp.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.gain.value = sfxOn ? sfxVol : 0; sfxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
      verb = ctx.createConvolver(); verb.buffer = impulse();
      verbSend = ctx.createGain(); verbSend.gain.value = .5; verbSend.connect(verb); verb.connect(master);
      ctx.onstatechange = () => {
        // stopped by the system (route change, call, Siri…) and not by us: note it and start again
        if (ctx.state !== 'running' && wanted === 'running') { note('state'); setTimeout(() => revive('statechange'), 120); }
      };
      if (!callMode) sessionType('playback');
      if (ctx.state !== 'running') ctx.resume();
      timer = setInterval(schedule, 250);
      applyMusicGain(3);
    } catch (e) { console.warn('Audio indisponible', e); ctx = null; }
  },
  play(name) {
    if (!ctx || !sfxOn || ctx.state !== 'running' || !SFX[name]) return;
    const t = performance.now();
    if (name === 'move' && t - (lastPlay.move || 0) < 45) return;
    lastPlay[name] = t;
    try { SFX[name](); } catch { /* never let a sound break navigation */ }
  },
  setMood(m) {
    const next = MOOD_OF[m] || (MOODS[m] ? m : 'home');
    if (next === mood) return;
    mood = next; chordIx = 0;
    if (ctx) nextChord = ctx.currentTime + .3; // new chord fades in over the old tail
  },
  configure({ sfx, sfxVol: sv, music, musicVol: mv }) {
    sfxOn = sfx; sfxVol = sv; musicOn = music; musicVol = mv;
    if (!ctx) return;
    sfxBus.gain.setTargetAtTime(sfxOn ? sfxVol : 0, ctx.currentTime, .05);
    applyMusicGain(.6);
  },
  duck(v, fade = 1.2) { duck = v; applyMusicGain(fade); },
  suspend() { wanted = 'suspended'; ctx?.suspend(); },
  // iOS can leave the context 'interrupted' after a call or an app switch; the next real gesture retries (see revive)
  resume() {
    wanted = 'running';
    if (!ctx) return;
    ctx.resume().catch(() => {});
  },
  // the microphone needs the 'play-and-record' session (iOS refuses or silences capture in a 'playback' one); plain
  // playback comes back only when nobody captures any more: a call ending must not cut Mimic Party's microphone
  capture(owner, on) {
    if (on) capturing.add(owner); else capturing.delete(owner);
    const want = capturing.size > 0;
    if (want === callMode) return;
    callMode = want;
    sessionType(want ? 'play-and-record' : 'playback');
    if (!want) setTimeout(() => reroute('call-ended'), 250);
  },
  setCallMode(on) { this.capture('call', on); },
  reroute,
  // what Settings › Sound shows to tell a playback problem from a microphone problem
  diagnostics() {
    return { state: ctx?.state || 'non démarré', rate: ctx?.sampleRate || 0, latency: ctx?.baseLatency || 0,
      session: navigator.audioSession ? navigator.audioSession.type : null, sfx: sfxOn ? sfxVol : 0, music: musicOn ? musicVol : 0 };
  },
  stop() { clearInterval(timer); },
};
