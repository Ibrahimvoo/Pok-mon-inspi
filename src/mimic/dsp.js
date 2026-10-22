// Mimic Party signal processing: resampling, voice features (loudness, pitch, MFCC), alignment, scoring and a
// compact ADPCM codec for sending recordings to the other players. Pure functions, no DOM: unit-tested in Node.
export const SR = 16000;          // analysis rate
const HOP = 160, WIN = 512;       // 10 ms hop, 32 ms window
export const FRAME = HOP / SR;

const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
const mean = a => { let s = 0; for (const v of a) s += v; return a.length ? s / a.length : 0; };
function median(a) { if (!a.length) return 0; const s = Float64Array.from(a).sort(); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }

// ---------------------------------------------------------------- resampling
// Windowed-sinc low-pass (when going down) evaluated only where the linear interpolator needs it.
export function resample(x, from, to = SR) {
  if (!x.length) return new Float32Array(0);
  if (Math.abs(from - to) < 1) return Float32Array.from(x);
  const ratio = from / to, n = Math.max(1, Math.floor(x.length / ratio));
  const out = new Float32Array(n);
  let at = i => x[i] || 0;
  if (from > to) {
    const fc = .45 * to / from, taps = 31, m = (taps - 1) / 2, h = new Float32Array(taps);
    let sum = 0;
    for (let i = 0; i < taps; i++) {
      const k = i - m;
      h[i] = (k === 0 ? 2 * fc : Math.sin(2 * Math.PI * fc * k) / (Math.PI * k)) * (.54 - .46 * Math.cos(2 * Math.PI * i / (taps - 1)));
      sum += h[i];
    }
    for (let i = 0; i < taps; i++) h[i] /= sum;
    at = i => { let acc = 0; for (let j = 0; j < taps; j++) { const q = i + j - m; if (q >= 0 && q < x.length) acc += x[q] * h[j]; } return acc; };
  }
  for (let i = 0; i < n; i++) {
    const p = i * ratio, k = Math.floor(p), f = p - k;
    out[i] = f ? at(k) * (1 - f) + at(k + 1) * f : at(k);
  }
  return out;
}

// ---------------------------------------------------------------- spectral tools
const HANN = Float32Array.from({ length: WIN }, (_, i) => .5 - .5 * Math.cos(2 * Math.PI * i / (WIN - 1)));
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang), half = len >> 1;
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let j = 0; j < half; j++) {
        const a = i + j, b = a + half;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
      }
    }
  }
}
// 26 triangular mel filters between 80 Hz and 7.6 kHz, then 12 cepstral coefficients (c1…c12)
const NMEL = 26, NCEP = 12;
const MEL = (() => {
  const mel = f => 2595 * Math.log10(1 + f / 700), inv = m => 700 * (10 ** (m / 2595) - 1);
  const lo = mel(80), hi = mel(7600), bins = [];
  for (let i = 0; i < NMEL + 2; i++) bins.push(Math.round(inv(lo + (hi - lo) * i / (NMEL + 1)) / SR * WIN));
  return Array.from({ length: NMEL }, (_, k) => {
    const [a, b, c] = [bins[k], bins[k + 1], bins[k + 2]], w = [];
    for (let i = a; i <= c; i++) w.push([i, i < b ? (i - a) / Math.max(1, b - a) : (c - i) / Math.max(1, c - b)]);
    return w;
  });
})();
const DCT = Array.from({ length: NCEP }, (_, k) => Float32Array.from({ length: NMEL }, (_, n) => Math.cos(Math.PI * (k + 1) * (n + .5) / NMEL)));

// YIN pitch detector on x[o … o+w+tauMax). Returns [hz, clarity] (hz 0 when unvoiced).
function yin(x, o, w, sr, fmin = 75, fmax = 900) {
  const tMin = Math.max(2, Math.floor(sr / fmax)), tMax = Math.min(Math.floor(sr / fmin), x.length - o - w - 1);
  if (tMax <= tMin + 2) return [0, 0];
  const d = new Float32Array(tMax + 2);
  for (let t = 1; t <= tMax + 1; t++) {
    let s = 0;
    for (let j = 0; j < w; j++) { const v = x[o + j] - x[o + j + t]; s += v * v; }
    d[t] = s;
  }
  // cumulative mean normalised difference
  let run = 0;
  const c = new Float32Array(tMax + 2); c[0] = 1;
  for (let t = 1; t <= tMax + 1; t++) { run += d[t]; c[t] = run ? d[t] * t / run : 1; }
  let tau = -1;
  for (let t = tMin; t <= tMax; t++) {
    if (c[t] < .18) { while (t + 1 <= tMax && c[t + 1] < c[t]) t++; tau = t; break; }
  }
  if (tau < 0) { // no dip under the threshold: keep the global minimum if it is reasonably clear
    let best = tMin; for (let t = tMin; t <= tMax; t++) if (c[t] < c[best]) best = t;
    if (c[best] > .35) return [0, 1 - c[best]];
    tau = best;
  }
  const a = c[tau - 1], b = c[tau], e = c[tau + 1], den = a - 2 * b + e;
  const shift = den > 0 ? .5 * (a - e) / den : 0;
  return [sr / (tau + Math.max(-.5, Math.min(.5, shift))), 1 - b];
}
export const midi = hz => 69 + 12 * Math.log2(hz / 440);

// Live pitch for the "hold the note" game: any sample rate, short buffer.
export function detectPitch(buf, sr) {
  const k = Math.max(1, Math.round(sr / SR)), n = Math.floor(buf.length / k), x = new Float32Array(n);
  for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < k; j++) s += buf[i * k + j]; x[i] = s / k; }
  const rate = sr / k;
  let e = 0; for (const v of x) e += v * v;
  if (Math.sqrt(e / n) < .006) return { hz: 0, clarity: 0 };
  const w = Math.min(512, n - Math.floor(rate / 75) - 2);
  if (w < 120) return { hz: 0, clarity: 0 };
  const [hz, clarity] = yin(x, 0, w, rate, 75, 1000);
  return { hz: clarity > .6 ? hz : 0, clarity };
}

// ---------------------------------------------------------------- features
export function features(x) {
  const n = Math.max(0, Math.floor((x.length - WIN) / HOP) + 1);
  const db = new Float32Array(n), pitch = new Float32Array(n).fill(NaN), clar = new Float32Array(n), mfcc = new Array(n);
  const re = new Float32Array(WIN), im = new Float32Array(WIN), logm = new Float32Array(NMEL);
  for (let f = 0; f < n; f++) {
    const o = f * HOP;
    let e = 0;
    for (let i = 0; i < WIN; i++) { const v = x[o + i]; e += v * v; re[i] = v * HANN[i]; im[i] = 0; }
    db[f] = 10 * Math.log10(e / WIN + 1e-12);
    fft(re, im);
    for (let k = 0; k < NMEL; k++) { let s = 0; for (const [i, w] of MEL[k]) s += (re[i] * re[i] + im[i] * im[i]) * w; logm[k] = Math.log(s + 1e-9); }
    const c = new Float32Array(NCEP);
    for (let k = 0; k < NCEP; k++) { let s = 0; const row = DCT[k]; for (let m = 0; m < NMEL; m++) s += row[m] * logm[m]; c[k] = s; }
    mfcc[f] = c;
  }
  // pitch every other frame on a 25 ms window, copied to its neighbour
  for (let f = 0; f < n; f += 2) {
    if (db[f] < -55) continue;
    const [hz, cl] = yin(x, f * HOP, 400, SR);
    clar[f] = cl; if (f + 1 < n) clar[f + 1] = cl;
    if (hz > 0 && cl > .5) { pitch[f] = midi(hz); if (f + 1 < n) pitch[f + 1] = pitch[f]; }
  }
  return { n, db, pitch, clar, mfcc, dur: x.length / SR };
}

// Frames that contain the actual sound (drops leading/trailing silence and room noise).
export function activeRange({ db, n }) {
  if (!n) return [0, 0];
  const s = Float32Array.from(db).sort();
  const floor = s[Math.floor(n * .1)], peak = s[n - 1];
  const thr = Math.max(peak - 36, floor + 7, -62);
  let a = 0; while (a < n && db[a] < thr) a++;
  let b = n - 1; while (b > a && db[b] < thr) b--;
  return [Math.max(0, a - 3), Math.min(n, b + 4)];
}
export function peakDb(F) { let p = -120; for (const v of F.db) if (v > p) p = v; return p; }

// syllable-like loudness peaks (for the rhythm part of the imitation score)
function peaks(env, minGap = 12, prom = 6) {
  const out = [];
  for (let i = 1; i < env.length - 1; i++) {
    if (env[i] < env[i - 1] || env[i] < env[i + 1]) continue;
    let l = env[i], r = env[i];
    for (let j = i - 1; j >= Math.max(0, i - 25); j--) l = Math.min(l, env[j]);
    for (let j = i + 1; j < Math.min(env.length, i + 25); j++) r = Math.min(r, env[j]);
    if (env[i] - Math.max(l, r) < prom) continue;
    if (out.length && i - out[out.length - 1] < minGap) { if (env[i] > env[out[out.length - 1]]) out[out.length - 1] = i; continue; }
    out.push(i);
  }
  return out;
}
function smooth(a, k = 2) {
  const o = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) { let s = 0, c = 0; for (let j = i - k; j <= i + k; j++) if (j >= 0 && j < a.length) { s += a[j]; c++; } o[i] = s / c; }
  return o;
}
function stretch(a, m) {
  const o = new Float32Array(m);
  for (let i = 0; i < m; i++) { const p = i * (a.length - 1) / Math.max(1, m - 1), k = Math.floor(p), f = p - k; o[i] = a[k] * (1 - f) + (a[k + 1] ?? a[k]) * f; }
  return o;
}
function pearson(a, b) {
  const ma = mean(a), mb = mean(b);
  let sab = 0, sa = 0, sb = 0;
  for (let i = 0; i < a.length; i++) { const x = a[i] - ma, y = b[i] - mb; sab += x * y; sa += x * x; sb += y * y; }
  return sa && sb ? sab / Math.sqrt(sa * sb) : 0;
}

// Per-utterance sequence used by the aligner: normalised cepstra, loudness, relative pitch.
function sequence(F, [a, b]) {
  const idx = []; for (let i = a; i < b; i += 2) idx.push(i);
  const m = idx.map(i => F.mfcc[i]);
  const mu = new Float32Array(NCEP), sd = new Float32Array(NCEP);
  for (const c of m) for (let k = 0; k < NCEP; k++) mu[k] += c[k] / m.length;
  for (const c of m) for (let k = 0; k < NCEP; k++) sd[k] += (c[k] - mu[k]) ** 2 / m.length;
  for (let k = 0; k < NCEP; k++) sd[k] = Math.sqrt(sd[k]) + 1e-3;
  let peak = -120; for (let i = a; i < b; i++) peak = Math.max(peak, F.db[i]);
  const voicedP = idx.filter(i => !Number.isNaN(F.pitch[i])).map(i => F.pitch[i]);
  const med = median(voicedP);
  return idx.map((i, j) => ({
    c: m[j].map((v, k) => (v - mu[k]) / sd[k]),
    l: clamp01((F.db[i] - (peak - 40)) / 40),
    p: Number.isNaN(F.pitch[i]) ? NaN : F.pitch[i] - med,
  }));
}

// Dynamic time warping inside a band around the diagonal; returns the path and its mean local costs.
function align(A, B) {
  const na = A.length, nb = B.length, INF = 1e9;
  const band = Math.max(Math.abs(na - nb), Math.ceil(Math.max(na, nb) * .25)) + 4;
  const D = new Float64Array((na + 1) * (nb + 1)).fill(INF), W = nb + 1;
  const dist = (i, j) => {
    const x = A[i].c, y = B[j].c; let s = 0;
    for (let k = 0; k < NCEP; k++) { const v = x[k] - y[k]; s += v * v; }
    return Math.sqrt(s / NCEP) + Math.abs(A[i].l - B[j].l) * 1.5;
  };
  D[0] = 0;
  for (let i = 1; i <= na; i++) {
    const c = Math.round(i * nb / na);
    for (let j = Math.max(1, c - band); j <= Math.min(nb, c + band); j++) {
      const best = Math.min(D[(i - 1) * W + j - 1], D[(i - 1) * W + j] + .15, D[i * W + j - 1] + .15);
      if (best < INF) D[i * W + j] = dist(i - 1, j - 1) + best;
    }
  }
  const path = [];
  let i = na, j = nb;
  while (i > 0 && j > 0) {
    path.push([i - 1, j - 1]);
    const d = D[(i - 1) * W + j - 1], u = D[(i - 1) * W + j], l = D[i * W + j - 1];
    if (d <= u && d <= l) { i--; j--; } else if (u < l) i--; else j--;
  }
  return path.reverse();
}

// Similarity of an imitation (rec) to the original (ref). Every part is 0…1.
export function compare(ref, rec) {
  const ra = activeRange(ref), rb = activeRange(rec);
  const recLen = (rb[1] - rb[0]) * FRAME, refLen = (ra[1] - ra[0]) * FRAME;
  if (recLen < .3 || peakDb(rec) < -58 || refLen < .1) return { silent: true, rhythm: 0, melody: 0, timbre: 0, voiced: 0, acoustic: 0 };
  const A = sequence(ref, ra), B = sequence(rec, rb);
  const path = align(A, B);

  // timbre: how close the spectral envelopes are once aligned
  let dm = 0;
  for (const [i, j] of path) { const x = A[i].c, y = B[j].c; let s = 0; for (let k = 0; k < NCEP; k++) s += (x[k] - y[k]) ** 2; dm += Math.sqrt(s / NCEP); }
  dm /= path.length;
  const timbre = clamp01(1 - (dm - .62) / (1.32 - .62));

  // rhythm: loudness envelope shape (tempo-free), number of syllables, overall duration
  const env = F => smooth(Float32Array.from(F.db.slice(...activeRange(F))), 3);
  const ea = env(ref), eb = env(rec);
  const r = pearson(stretch(ea, 96), stretch(eb, 96));
  const ca = peaks(ea).length, cb = peaks(eb).length;
  const count = 1 - Math.abs(ca - cb) / Math.max(ca, cb, 1);
  const durS = Math.exp(-1.1 * Math.abs(Math.log(recLen / refLen)));
  const rhythm = clamp01(.45 * clamp01((r - .05) / .75) + .3 * count + .25 * durS);

  // melody: relative pitch contour (key- and octave-free) along the alignment
  let n = 0, agree = 0, err = 0; const pa = [], pb = [];
  for (const [i, j] of path) {
    const va = !Number.isNaN(A[i].p), vb = !Number.isNaN(B[j].p);
    if (va === vb) agree++;
    if (va && vb) {
      let d = A[i].p - B[j].p; d = ((d % 12) + 18) % 12 - 6;
      err += Math.abs(d); n++; pa.push(A[i].p); pb.push(B[j].p);
    }
  }
  const voicedRef = A.filter(x => !Number.isNaN(x.p)).length / A.length;
  const agreeR = agree / path.length;
  let melody;
  if (voicedRef < .15 || n < 6) melody = agreeR * (n < 6 && voicedRef >= .15 ? .5 : 1);
  else {
    const mae = err / n, corr = pearson(pa, pb);
    melody = clamp01(.5 * clamp01(1 - (mae - .8) / 3.7) + .3 * clamp01(corr / .8) + .2 * agreeR);
  }
  // weights chosen with tools/mimic/calibrate.mjs: the aligned spectral match separates imitations best
  const wm = voicedRef < .15 ? .05 : .15;
  const acoustic = (rhythm * .3 + melody * wm + timbre * .55) / (.85 + wm);
  return { silent: false, rhythm, melody, timbre, voiced: voicedRef, acoustic, refLen, recLen };
}

// Final 0…100 score. Unrelated sounds land around 5-35, imitations in another voice around 55-90. `words` (0…1) is optional.
export const LEVELS = { easy: [.18, .45], normal: [.2, .5], hard: [.23, .56] };
export function finalScore(cmp, words = null, level = 'normal') {
  if (cmp.silent && !(words > 0)) return 0;
  const [lo, hi] = LEVELS[level] || LEVELS.normal;
  const ac = cmp.silent ? 0 : clamp01((cmp.acoustic - lo) / (hi - lo));
  const s = words == null ? ac : cmp.silent ? words * .45 : ac * .68 + words * .32;
  return Math.round(Math.pow(clamp01(s), .9) * 100);
}

// ---------------------------------------------------------------- rhythm game (claps)
export function onsets(x) {
  const F = features(x), out = [];
  const env = F.db, [a, b] = activeRange(F);
  let last = -1e9;
  for (let i = Math.max(a, 3); i < b; i++) {
    const prev = Math.min(env[i - 1], env[i - 2], env[i - 3]);
    if (env[i] - prev > 9 && i - last > 11) { out.push(i * FRAME); last = i; }
  }
  return out;
}
// target and hits are times in seconds; tempo may differ by up to 25 %
export function rhythmScore(target, hits) {
  if (!hits.length) return { score: 0, matched: 0 };
  const t = target.map(v => v - target[0]), h = hits.map(v => v - hits[0]);
  let best = { score: 0, matched: 0 };
  for (let s = .8; s <= 1.25; s += .025) {
    let matched = 0, errSum = 0; const used = new Set();
    for (const ti of t) {
      let k = -1, d = .17;
      h.forEach((hi, j) => { const e = Math.abs(hi * s - ti); if (!used.has(j) && e < d) { d = e; k = j; } });
      if (k >= 0) { used.add(k); matched++; errSum += d; }
    }
    const extra = Math.max(0, h.length - t.length);
    const acc = matched ? 1 - errSum / matched / .17 : 0;
    const score = clamp01((matched / t.length) * .75 + acc * .25 * (matched / t.length) - extra * .08);
    if (score > best.score) best = { score, matched };
  }
  return best;
}

// ---------------------------------------------------------------- IMA ADPCM (4 bits per sample)
const STEP = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];
const IDX = [-1, -1, -1, -1, 2, 4, 6, 8];
export function adpcmEncode(x) {
  const out = new Uint8Array(Math.ceil(x.length / 2));
  let pred = 0, idx = 0;
  for (let i = 0; i < x.length; i++) {
    const s = Math.max(-32768, Math.min(32767, Math.round(x[i] * 32767)));
    let diff = s - pred, code = 0;
    if (diff < 0) { code = 8; diff = -diff; }
    let step = STEP[idx], vp = step >> 3;
    if (diff >= step) { code |= 4; diff -= step; vp += step; } step >>= 1;
    if (diff >= step) { code |= 2; diff -= step; vp += step; } step >>= 1;
    if (diff >= step) { code |= 1; vp += step; }
    pred = Math.max(-32768, Math.min(32767, code & 8 ? pred - vp : pred + vp));
    idx = Math.max(0, Math.min(88, idx + IDX[code & 7]));
    out[i >> 1] |= i & 1 ? code << 4 : code;
  }
  return out;
}
export function adpcmDecode(u8, n) {
  const out = new Float32Array(n);
  let pred = 0, idx = 0;
  for (let i = 0; i < n; i++) {
    const code = i & 1 ? u8[i >> 1] >> 4 : u8[i >> 1] & 15;
    const step = STEP[idx];
    let vp = step >> 3;
    if (code & 4) vp += step; if (code & 2) vp += step >> 1; if (code & 1) vp += step >> 2;
    pred = Math.max(-32768, Math.min(32767, code & 8 ? pred - vp : pred + vp));
    idx = Math.max(0, Math.min(88, idx + IDX[code & 7]));
    out[i] = pred / 32768;
  }
  return out;
}
export function toBase64(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
}
export function fromBase64(b64) {
  const s = atob(b64), u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8;
}
// trims silence and normalises a recording for playback to the group
export function tidy(x) {
  if (!x.length) return x;
  const F = features(x), [a, b] = activeRange(F);
  const s = Math.max(0, a * HOP - 800), e = Math.min(x.length, b * HOP + WIN + 1600);
  const y = x.slice(s, e);
  let pk = 0; for (const v of y) pk = Math.max(pk, Math.abs(v));
  const g = pk > 1e-4 ? Math.min(8, .9 / pk) : 1;
  for (let i = 0; i < y.length; i++) y[i] *= g;
  return y;
}
