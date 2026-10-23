// End-to-end test of UNO on the built console (no server): two real browsers. The host opens a room with a code
// (peer-to-peer salon through a local PeerJS broker), the guest joins with the code, both see the same lobby and
// rules, play a whole game against each other (UNO calls, Contre-UNO, wild colours, challenges) and the tables are
// compared at every step; then a solo game against three computer players runs to the final ranking.
// Usage: npm run e2e:uno [shotsDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shots = process.argv[2] || null;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9124, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9124`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const [vw, vh] = (process.env.VIEWPORT || '1280x720').split('x').map(Number);
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(c); console.log(c ? '✓' : '✗', n, x); };

// focus the UNO tile of the home screen and launch it
async function launchUno(page) {
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'UNO'), t.findIndex(e => e.classList.contains('focused'))]; });
  if (idx < 0) throw new Error('UNO tile not found on the home screen');
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120); }
  await page.keyboard.press('Enter');
}
async function open(name) {
  const page = await (await browser.newContext({ viewport: { width: vw, height: vh } })).newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|WebSocket|ERR_CONNECTION/.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', name);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  await page.waitForTimeout(600);
  await launchUno(page);
  await page.waitForSelector('.uno-title', { timeout: 15000 });
  await page.waitForTimeout(900);
  page.shot = n => shots && page.screenshot({ path: join(shots, `uno-${name}-${n}.jpg`), type: 'jpeg', quality: 70 });
  return page;
}
const until = async (page, fn, ms = 15000, arg) => { const t = Date.now(); while (Date.now() - t < ms) { if (await page.evaluate(fn, arg).catch(() => false)) return true; await page.waitForTimeout(150); } return false; };
const tableState = page => page.evaluate(() => {
  const t = document.querySelector('.uno-table');
  if (!t) return null;
  return { seq: +t.dataset.seq || 0, busy: !!t.dataset.busy, top: document.querySelector('.ut-pile .pc:last-child')?.dataset.code || null, topId: document.querySelector('.ut-pile .pc:last-child')?.dataset.id || null,
    counts: [...document.querySelectorAll('.ut-tag')].map(e => [e.querySelector('.nm span').textContent, +e.querySelector('.cnt b').textContent]).sort(), hand: document.querySelectorAll('.ut-hand .hc').length,
    results: !!document.querySelector('.uno-results'), final: !!document.querySelector('.uno-results.final'), title: document.querySelector('.uno-results h1, .uno-results h2')?.textContent || '' };
});
// one automatic decision for the player of this page; `forget` skips the UNO call sometimes
async function step(page, { forget = false } = {}) {
  return page.evaluate(forgetUno => {
    const q = s => document.querySelector(s);
    const click = el => { el.dispatchEvent(new CustomEvent('ok', { bubbles: true })); return true; };
    if (q('.uno-results')) return 'results';
    const t = q('.uno-table');
    if (!t || t.dataset.busy) return 'busy';
    if (q('.ut-catch:not(.hidden)')) { click(q('.ut-catch')); return 'catch'; }
    if (q('.ut-picker .ut-ctile')) { const tiles = document.querySelectorAll('.ut-ctile'); click(tiles[Math.floor(Math.random() * 4)]); return 'color'; }
    if (q('.ut-picker .ut-seatpick')) { click(q('.ut-seatpick')); return 'seat'; }
    if (q('.ut-chal')) { click(document.querySelectorAll('.ut-chal .ut-btn')[Math.random() < .5 ? 0 : 1]); return 'challenge'; }
    if (!t.classList.contains('mine')) return 'wait';
    if (q('.ut-uno.on') && !(forgetUno && Math.random() < .5)) { click(q('.ut-uno')); return 'uno'; }
    const play = q('.ut-hand .hc.ok');
    if (play && !q('.ut-keep:not(.hidden)')) { click(play); return 'play'; }
    if (q('.ut-keep:not(.hidden)')) { if (play && Math.random() < .7) { click(play); return 'play'; } click(q('.ut-keep')); return 'keep'; }
    click(q('.ut-deck'));
    return 'draw';
  }, forget);
}

try {
  // ------------------------------------------------------------ online: host + guest
  const A = await open('Hote'), B = await open('Invite');
  await A.click('.ut-tile.blue');
  ok('room created with a code', await until(A, () => /^[A-Z0-9]{6}$/.test(document.querySelector('.ul-code b')?.textContent || ''), 20000));
  const code = await A.textContent('.ul-code b');
  await A.shot('lobby-host');
  // B first opens its own room and goes back to the title: it is still in that salon when it types A's code
  await B.click('.ut-tile.blue');
  await until(B, () => /^[A-Z0-9]{6}$/.test(document.querySelector('.ul-code b')?.textContent || ''), 20000);
  await B.keyboard.press('Escape'); await B.waitForTimeout(500);
  await B.click('button:has-text("Fermer")'); await B.waitForTimeout(500);
  ok('B is still in its own salon on the title screen', await B.evaluate(() => !!document.querySelector('.ut-tile.green')));
  await B.click('.ut-tile.green');
  await B.waitForSelector('.uj-input');
  await B.fill('.uj-input', code.toLowerCase());
  await B.press('.uj-input', 'Enter');
  ok('guest joins the room with the code', await until(B, () => document.querySelectorAll('.ul-seat:not(.empty)').length === 2, 30000));
  ok('host sees the guest seated', await until(A, () => document.querySelectorAll('.ul-seat:not(.empty)').length === 2 && /Invite/.test(document.querySelector('.ul-seats').innerText), 10000));
  // house rules and score limit set by the host appear on the guest's lobby
  await A.click('.ul-rule >> nth=0');
  for (let i = 0; i < 4; i++) { await A.click('.ul-target'); await A.waitForTimeout(120); }
  ok('rules shown to the guest', await until(B, () => document.querySelector('.ul-rule')?.classList.contains('on') && /Manche unique/.test(document.querySelector('.ul-target').innerText), 8000));
  await A.click('.ul-rule >> nth=0');
  await B.shot('lobby-guest');
  ok('guest cannot change the rules', !(await B.evaluate(() => document.querySelector('.ul-rule')?.hasAttribute('data-f'))));
  await A.click('text=Commencer la partie');
  ok('countdown on both consoles', await until(B, () => /Début de la partie/.test(document.querySelector('.ul-count')?.innerText || ''), 5000));
  ok('loading screen on both', await until(A, () => !!document.querySelector('.uno-info'), 9000) && await until(B, () => !!document.querySelector('.uno-info'), 9000));
  await B.shot('info');
  ok('tables dealt', await until(A, () => document.querySelectorAll('.ut-hand .hc').length >= 7, 15000) && await until(B, () => document.querySelectorAll('.ut-hand .hc').length >= 7, 15000));
  await A.waitForTimeout(1500);
  await A.shot('table-host'); await B.shot('table-guest');
  let mismatches = 0, compared = 0, actions = { A: {}, B: {} };
  const t0 = Date.now();
  while (Date.now() - t0 < 540000) {
    const [a, b] = await Promise.all([step(A), step(B, { forget: true })]);
    actions.A[a] = (actions.A[a] || 0) + 1; actions.B[b] = (actions.B[b] || 0) + 1;
    if (a === 'results' && b === 'results') break;
    await A.waitForTimeout(220);
    const [sa, sb] = await Promise.all([tableState(A), tableState(B)]);
    if (sa && sb && !sa.busy && !sb.busy && sa.seq === sb.seq && sa.seq) {
      compared++;
      if (sa.topId !== sb.topId || JSON.stringify(sa.counts) !== JSON.stringify(sb.counts)) { mismatches++; if (mismatches < 4) console.log('  mismatch', JSON.stringify(sa), JSON.stringify(sb)); }
    }
  }
  console.log('  actions', JSON.stringify(actions), 'compared', compared);
  ok('both tables stayed identical (top card, card counts)', compared > 10 && mismatches === 0, `${compared} comparisons, ${mismatches} mismatches`);
  ok('UNO calls and plays happened', (actions.A.play || 0) + (actions.B.play || 0) > 5 && ((actions.A.uno || 0) + (actions.B.uno || 0)) > 0);
  ok('game finished on both consoles', await until(A, () => !!document.querySelector('.uno-results.final'), 20000) && await until(B, () => !!document.querySelector('.uno-results.final'), 20000));
  const [ra, rb] = await Promise.all([tableState(A), tableState(B)]);
  ok('one winner, one loser', (ra.title === 'VICTOIRE !') !== (rb.title === 'VICTOIRE !'), `${ra.title} / ${rb.title}`);
  await A.waitForTimeout(1500);
  await A.shot('final-host'); await B.shot('final-guest');
  await A.click('text=Retour au salon');
  ok('both back in the lobby', await until(A, () => !!document.querySelector('.uno-lobby'), 8000) && await until(B, () => !!document.querySelector('.uno-lobby') && document.querySelectorAll('.ul-seat:not(.empty)').length === 2, 10000));
  // the host leaves: the guest is told and returns to the title screen
  await A.keyboard.press('Escape');
  await A.waitForTimeout(300);
  await A.click('.uo-box .ub.red');
  ok('guest notified when the host closes the room', await until(B, () => !!document.querySelector('.uno-title'), 10000));

  // ------------------------------------------------------------ solo against three computer players
  const C = await open('Solo');
  await C.click('.ut-tile.red');
  await C.waitForSelector('.uno-lobby');
  ok('solo lobby with three computer players', await C.evaluate(() => document.querySelectorAll('.ul-seat:not(.empty)').length === 4));
  for (let i = 0; i < 4; i++) { await C.click('.ul-target'); await C.waitForTimeout(100); }
  await C.click('text=Commencer la partie');
  ok('solo table dealt', await until(C, () => document.querySelectorAll('.ut-hand .hc').length >= 7, 20000));
  const s0 = Date.now(); let n = 0;
  while (Date.now() - s0 < 300000) {
    const r = await step(C);
    if (r === 'results') break;
    if (r !== 'busy' && r !== 'wait') n++;
    if (n === 4) await C.shot('solo-play');
    await C.waitForTimeout(250);
  }
  ok('solo game reaches the final ranking', await until(C, () => !!document.querySelector('.uno-results.final'), 30000), `${n} actions`);
  await C.shot('solo-final');
  // pause menu and quitting
  await C.click('text=Quitter');
  ok('back to the UNO title', await until(C, () => !!document.querySelector('.uno-title'), 5000));
} catch (e) { ok('no exception', false, e.stack); }

ok('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
await browser.close(); web.close(); broker.close?.();
const failed = results.filter(r => !r).length;
console.log(failed ? `${failed} check(s) failed` : 'All UNO checks passed');
process.exit(failed ? 1 : 0);
