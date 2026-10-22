// End-to-end test of Mimic Party on the built console (no server): a real Chromium whose microphone plays an
// imitation of a ref; splash, home, mode choice, lobby with two players on the console, rounds (announce, reveal,
// recording, playback, wheel) and results. Screenshots go to argv[2].
// Usage: npm run e2e:mimic [shotsDir]   (needs ffmpeg to build the fake microphone)
import { createServer } from 'node:http';
import { readFile, mkdtemp } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shots = process.argv[2] || null;
const REF = 'allons-allons-allons';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);

// fake microphone: the ref sung by "someone else" (higher voice, slower), between silences, looping
const tmp = await mkdtemp(join(tmpdir(), 'mimic-'));
const wav = join(tmp, 'mic.wav');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-t', '1.2', '-i', 'anullsrc=r=48000:cl=mono', '-i', join(root, 'public/mimic/refs', REF + '.mp3'), '-f', 'lavfi', '-t', '2', '-i', 'anullsrc=r=48000:cl=mono',
  '-filter_complex', '[1]asetrate=44100*1.2,aresample=48000,atempo=0.88,volume=0.9[v];[0][v][2]concat=n=3:v=0:a=1', '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', wav]);

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required',
  '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${wav}`] });
const [vw, vh] = (process.env.VIEWPORT || '1280x720').split('x').map(Number);
const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, permissions: ['microphone'] });
const page = await ctx.newPage();
const errors = [], results = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
await page.addInitScript(r => { window.__MIMIC_TEST__ = { ref: r }; }, REF);
const ok = (n, c, x = '') => { results.push(c); console.log(c ? '✓' : '✗', n, x); };
const shot = n => shots && page.screenshot({ path: join(shots, `mimic-${n}.jpg`), type: 'jpeg', quality: 72 });
const scene = () => page.evaluate(() => {
  const s = [...document.querySelectorAll('.mmp-scene')].filter(e => !e.classList.contains('out')).pop();
  if (!s) return null;
  s.dataset.sid ||= Math.random().toString(36).slice(2);
  return { id: s.dataset.sid, text: s.innerText.replace(/\s+/g, ' ').slice(0, 200), phase: s.querySelector('.mmp-roundbox span')?.innerText || '',
    turn: !!s.querySelector('.mmp-turn [data-f]'), modal: !!document.querySelector('.mmp-modal'), modalText: document.querySelector('.mmp-modal')?.innerText.replace(/\s+/g, ' ') || '',
    score: s.querySelector('.mmp-scoretext')?.textContent.replace(/\s+/g, ''), results: s.classList.contains('mmp-results') };
});
const until = async (fn, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await fn()) return true; await page.waitForTimeout(150); } return false; };

try {
  await page.goto(`http://localhost:${web.address().port}/`);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', 'Testeur');
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  ok('Mimic Party sur l’écran d’accueil', await page.locator('.home .tile.sel .tile-label').innerText().then(t => t.includes('Mimic Party')));
  await page.waitForTimeout(400);
  await shot('0-console');
  await page.keyboard.press('Enter');
  ok('écran titre puis menu du jeu', await until(async () => /JOUER/.test((await scene())?.text || ''), 20000));
  await page.waitForTimeout(1500); await shot('1-home');
  // the character arrows and the side panels
  await page.keyboard.press('e');
  await page.waitForTimeout(300);
  await page.click('.mmp-home .mmp-side >> nth=1');
  ok('panneau PERSONNAGES', await until(async () => /PERSONNAGES/.test((await scene())?.modalText || '')));
  await shot('2-chars');
  await page.keyboard.press('Escape');
  await until(async () => !(await scene())?.modal);
  await page.click('text=JOUER');
  ok('PARTIES DISPONIBLES', await until(async () => /PARTIES DISPONIBLES/.test((await scene())?.modalText || '')));
  await page.waitForTimeout(400); await shot('3-games');
  await page.click('.mmp-modal >> text=CRÉER UNE PARTIE');
  ok('QUEL MODE ?', await until(async () => /QUEL MODE/.test((await scene())?.modalText || '')));
  await page.waitForTimeout(400); await shot('4-mode');
  await page.keyboard.press('Enter');
  ok('lobby', await until(async () => page.evaluate(() => !!document.querySelector('.mmp-scene.mmp-lobby:not(.out)'))));
  const PLAYERS = +(process.env.PLAYERS || 2), ROUNDS = process.env.ROUNDS || '3';
  for (let i = 1; i < PLAYERS; i++) { await page.click('text=+ JOUEUR SUR CETTE CONSOLE'); await page.waitForTimeout(200); }
  ok(`${PLAYERS} joueurs dans le lobby`, await until(async () => (await page.locator('.mmp-lobby .mmp-prow').count()) === PLAYERS));
  for (let i = 0; i < 4; i++) { const t = await page.locator('.mmp-lobby .rules .r >> nth=0').innerText(); if (t.trim().endsWith(ROUNDS)) break; await page.click('.mmp-lobby .rules .r >> nth=0'); }
  await page.waitForTimeout(1500); await shot('5-lobby');
  await page.keyboard.press('o');
  ok('demande d’accès au micro', await until(async () => /BESOIN DE TON MICRO/.test((await scene())?.modalText || '')));
  await shot('6-mic');
  await page.keyboard.press('Enter');
  // autopilot: start each take, never interrupt a recording, collect the scores
  const seen = new Set(), scores = [];
  let done = false;
  const t0 = Date.now();
  while (Date.now() - t0 < 8 * 60e3) {
    const s = await scene();
    if (!s) { await page.waitForTimeout(200); continue; }
    if (s.results) { done = true; break; }
    const key = s.phase + s.id;
    if (s.phase && !seen.has(key)) { seen.add(key); if (!seen.has(s.phase)) { seen.add(s.phase); await page.waitForTimeout(s.phase === 'RECORDING' ? 3500 : 900); await shot(`7-${s.phase.toLowerCase()}`); } }
    if (s.phase === 'PLAYBACK' && s.score && !seen.has('sc' + s.score + scores.length)) {
      const v = await until(async () => { const a = (await scene())?.score; await page.waitForTimeout(600); return a && a === (await scene())?.score; }, 9000);
      const fin = (await scene())?.score;
      if (v && fin && !seen.has('last' + fin + s.id + scores.length)) { seen.add('last' + fin + s.id + scores.length); scores.push(+fin.match(/\d+/)?.[0]); }
      await until(async () => !(await scene())?.score, 8000);
    }
    if (s.turn) { await page.waitForTimeout(400); await page.keyboard.press('Enter'); }
    if (s.modal && /MICRO/.test(s.modalText)) await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
  }
  ok('partie jouée jusqu’aux résultats', done);
  await page.waitForTimeout(2500); await shot('8-results');
  ok('toutes les phases vues', ['ANNOUNCE', 'REVEAL', 'RECORDING', 'PLAYBACK', 'WHEEL'].every(p => seen.has(p)), [...seen].filter(x => /^[A-Z]+$/.test(x)).join(' '));
  ok('imitations notées', scores.length >= PLAYERS && scores.every(v => Number.isFinite(v)), scores.join(', '));
  ok('une bonne imitation obtient un bon score', Math.max(...scores) >= 40, String(Math.max(...scores)));
  const trophies = await page.evaluate(() => JSON.parse(localStorage.getItem('ps5ux.v1')).trophies['mimic-party'] || []);
  ok('trophées débloqués', trophies.includes(0), JSON.stringify(trophies));
  await page.click('.mmp-results >> text=MENU');
  ok('retour au menu du jeu', await until(async () => /PROGRESSION/.test((await scene())?.text || '')));
} catch (e) { ok('exception', false, e.stack); }
ok('aucune erreur JavaScript', !errors.length, errors.join('\n'));
await browser.close(); web.close();
process.exit(results.every(Boolean) ? 0 : 1);
