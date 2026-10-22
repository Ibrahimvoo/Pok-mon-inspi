// Microphone for Mimic Party: one stream for the whole game (a copy of the voice-call microphone when a call is
// running), a live level and pitch for the animations, and raw capture for scoring.
import { audio } from '../audio.js';
import { voice } from '../rtc.js';
import { IOS } from '../input.js';
import { resample, SR, detectPitch } from './dsp.js';

export class MicError extends Error {}

let stream = null, src = null, an = null, proc = null, sink = null, td = null, chunks = null, fromCall = false;
let lvl = 0, peak = 0, rawSum = 0, rawN = 0;

function errorFor(e) {
  if (e?.name === 'NotAllowedError' || e?.name === 'SecurityError') return new MicError(IOS
    ? 'Accès au micro refusé. Dans Safari : touchez « aA » puis « Réglages du site web » → Micro → Autoriser, puis réessayez.'
    : 'Accès au micro refusé. Autorisez le micro dans les réglages du site (icône à gauche de l’adresse), puis réessayez.');
  if (e?.name === 'NotFoundError' || e?.name === 'OverconstrainedError') return new MicError('Aucun micro n’a été détecté sur cet appareil.');
  if (e?.name === 'NotReadableError' || e?.name === 'AbortError') return new MicError('Le micro est déjà utilisé par une autre application.');
  return new MicError('Impossible d’accéder au micro.');
}
const live = () => stream?.getAudioTracks().some(t => t.readyState === 'live');

function build() {
  const ctx = audio.ctx;
  src = ctx.createMediaStreamSource(stream);
  an = ctx.createAnalyser(); an.fftSize = 2048; an.smoothingTimeConstant = 0;
  td = new Float32Array(an.fftSize);
  // ScriptProcessor works everywhere (no worklet module needed under the strict CSP); it outputs silence
  proc = ctx.createScriptProcessor(4096, 1, 1);
  proc.onaudioprocess = e => {
    const x = e.inputBuffer.getChannelData(0);
    if (chunks) {
      chunks.push(new Float32Array(x));
      for (let i = 0; i < x.length; i += 8) { rawSum += Math.abs(x[i]); rawN++; }
    }
  };
  sink = ctx.createGain(); sink.gain.value = 0;
  src.connect(an); src.connect(proc); proc.connect(sink); sink.connect(ctx.destination);
}
function teardown() {
  for (const n of [src, an, proc, sink]) try { n?.disconnect(); } catch { /* ignore */ }
  if (proc) proc.onaudioprocess = null;
  src = an = proc = sink = null;
}

export const mic = {
  get ready() { return live(); },
  get fromCall() { return fromCall; },
  get rate() { return audio.ctx?.sampleRate || 48000; },
  async open() {
    if (live() && src) return;
    this.close();
    audio.init();
    const ctx = audio.ctx;
    if (!ctx) throw new MicError('Le son est indisponible sur cet appareil.');
    if (ctx.state !== 'running') await ctx.resume().catch(() => {});
    let s = voice.active ? voice.captureStream() : null;
    fromCall = !!s;
    if (!s) {
      if (!navigator.mediaDevices?.getUserMedia) throw new MicError(location.protocol !== 'https:' && !/^(localhost|127\.)/.test(location.hostname)
        ? 'Le micro exige une connexion sécurisée (adresse en https://).' : 'Ce navigateur ne donne pas accès au micro.');
      try {
        // raw sound: the imitation of a noise or a melody must not be "cleaned" by the voice processing
        s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }, video: false });
      } catch (e) { throw errorFor(e); }
    }
    stream = s;
    build();
  },
  close() {
    chunks = null;
    teardown();
    stream?.getTracks().forEach(t => t.stop());
    stream = null; fromCall = false; lvl = 0;
  },
  // 0…1, smoothed for mouth animation and meters
  level() {
    if (!an) return 0;
    an.getFloatTimeDomainData(td);
    let s = 0, pk = 0;
    for (let i = 0; i < td.length; i++) { const v = td[i]; s += v * v; const a = v < 0 ? -v : v; if (a > pk) pk = a; }
    const db = 10 * Math.log10(s / td.length + 1e-12);
    peak = pk;
    const v = Math.min(1, Math.max(0, (db + 58) / 46));
    lvl = v > lvl ? lvl * .35 + v * .65 : lvl * .8 + v * .2;
    return lvl;
  },
  db() { if (!an) return -120; an.getFloatTimeDomainData(td); let s = 0; for (const v of td) s += v * v; return 10 * Math.log10(s / td.length + 1e-12); },
  pitch() { if (!an) return { hz: 0, clarity: 0 }; an.getFloatTimeDomainData(td); return detectPitch(td, this.rate); },
  startCapture() { chunks = []; rawSum = 0; rawN = 0; },
  get capturing() { return !!chunks; },
  get capturedSeconds() { return chunks ? chunks.length * 4096 / this.rate : 0; },
  // → { pcm: Float32Array at 16 kHz, dead: true when the input delivered pure zeros (track muted by the system) }
  stopCapture() {
    const c = chunks || []; chunks = null;
    const n = c.reduce((s, x) => s + x.length, 0), all = new Float32Array(n);
    let o = 0; for (const x of c) { all.set(x, o); o += x.length; }
    const dead = rawN > 0 && rawSum / rawN < 1e-7;
    return { pcm: resample(all, this.rate, SR), dead };
  },
  cancelCapture() { chunks = null; },
};
