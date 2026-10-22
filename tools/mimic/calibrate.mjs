// Scores every ref against altered copies of itself (another "voice", tempo, phone mic, noise) and against the
// other refs, to check that good imitations and unrelated sounds land where the score curve expects them.
// Usage: node tools/mimic/calibrate.mjs [count]   (needs ffmpeg)
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { features, compare, finalScore, SR } from '../../src/mimic/dsp.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const refs = JSON.parse(readFileSync(join(root, 'src/mimic/refs.json'), 'utf8')).slice(0, +process.argv[2] || 99);
const pcm = (file, af = 'anull') => {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-af', af, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 26 });
  return new Float32Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.length));
};
const VARIANTS = {
  same: 'anull',
  voice_up: 'asetrate=16000*1.33,aresample=16000,atempo=0.8',          // higher voice, slower
  voice_down: 'asetrate=16000*0.8,aresample=16000,atempo=1.15',        // deeper voice
  tempo: 'atempo=0.82',
  phone: 'highpass=f=300,lowpass=f=3400,volume=0.4',
  room: 'aecho=0.8:0.6:40|70:0.35|0.2,volume=0.7',
  noisy: 'volume=0.6',
};
const feats = {}, rows = [];
for (const r of refs) feats[r.id] = features(pcm(join(root, 'public/mimic/refs', r.id + '.mp3')));
const noise = Float32Array.from({ length: SR * 4 }, () => (Math.random() * 2 - 1) * .05);
const silence = Float32Array.from({ length: SR * 4 }, () => (Math.random() * 2 - 1) * .0005);
const stat = {};
const add = (k, v) => (stat[k] ||= []).push(v);
for (const r of refs) {
  const file = join(root, 'public/mimic/refs', r.id + '.mp3');
  for (const [k, af] of Object.entries(VARIANTS)) {
    let x = pcm(file, af);
    if (k === 'noisy') x = x.map(v => v + (Math.random() * 2 - 1) * .03);
    const c = compare(feats[r.id], features(x));
    add(k, finalScore(c));
    add(k + '.raw', c.acoustic);
  }
  const others = refs.filter(o => o.id !== r.id).sort(() => Math.random() - .5).slice(0, 4);
  for (const o of others) { const c = compare(feats[r.id], feats[o.id]); add('other', finalScore(c)); add('other.raw', c.acoustic); }
  add('noise', finalScore(compare(feats[r.id], features(noise))));
  add('silence', finalScore(compare(feats[r.id], features(silence))));
  rows.push(r.id);
}
const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
for (const [k, v] of Object.entries(stat)) {
  const f = x => (k.endsWith('.raw') ? x.toFixed(3) : String(x).padStart(3));
  console.log(k.padEnd(16), 'p10', f(q(v, .1)), ' p50', f(q(v, .5)), ' p90', f(q(v, .9)), ' min', f(Math.min(...v)), ' max', f(Math.max(...v)));
}
