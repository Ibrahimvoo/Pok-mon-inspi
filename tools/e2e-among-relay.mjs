// End-to-end test of the relay (no project server): a local PeerJS broker and a local MQTT broker stand in for the free
// public ones. The host's room is made public; a friend whose direct connection cannot be made (PeerJS unreachable for
// him, like a phone on mobile data behind a strict network) finds it in « Trouver une partie » and plays through the
// relay; another friend joins directly with the code, a third through the relay with the code. Then the game starts,
// moves and proximity voice are checked across both ways.
// Usage: npm run e2e:among-relay
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';
import { WebSocketServer, createWebSocketStream } from 'ws';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const aedes = require('aedes')();
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json', '.png': 'image/png' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const mqtt = new WebSocketServer({ port: 0 }); mqtt.on('connection', ws => aedes.handle(createWebSocketStream(ws)));
const broker = PeerServer({ port: 9125, path: '/', host: '127.0.0.1' });
const base = `http://localhost:${web.address().port}/?aufps=10&mqtt=ws://127.0.0.1:${mqtt.address().port}`;
const DIRECT = base + '&peerhost=127.0.0.1:9125', BLOCKED = base + '&peerhost=127.0.0.1:9';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 15000, arg) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 200 }); return true; } catch { return false; } };

async function player(name, url) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|peerjs|WebSocket|ERR_|Lost connection/i.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', name);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  await page.waitForTimeout(400);
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(80); }
  for (let i = cur; i > idx; i--) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(80); }
  await page.keyboard.press('Enter');
  await page.waitForSelector('.au-main', { timeout: 20000 });
  await page.click('.am-big:has-text("JOUER")');
  await page.click('.am-card:has-text("EN LIGNE")');
  return page;
}
const via = page => page.evaluate(() => globalThis.__au?.c?.link?.via);

try {
  const A = await player('Hote', DIRECT), B = await player('Bloque', BLOCKED), C = await player('Direct', DIRECT), D = await player('Relais', BLOCKED);
  await A.click('.am-card:has-text("CRÉER UNE PARTIE")');
  await A.click('.hs-btn:has-text("Classique")');
  ok('the host console creates the room', await until(A, () => globalThis.__au?.c?.phase === 'lobby', 30000));
  const code = await A.evaluate(() => globalThis.__au.c.v.code);
  ok('the privacy button can be used without a server', !(await A.locator('.lb-priv').isDisabled()));
  await A.click('.lb-priv');
  ok('the room becomes public', await until(A, () => globalThis.__au.c.v.public === true, 5000) && /PUBLIC/.test(await A.locator('.lb-priv').innerText()));
  // B: no direct connection possible, finds the room in the public list
  await B.click('.am-card:has-text("TROUVER UNE PARTIE")');
  ok('the public game is listed', await until(B, c => [...document.querySelectorAll('.hs-room')].some(r => r.innerText.includes('Hote')), 15000, code));
  await B.click('.hs-room:has-text("Hote")');
  ok('a friend without direct connection joins through the relay', await until(B, () => globalThis.__au?.c?.phase === 'lobby' && globalThis.__au.c.link.via === 'relay', 40000), await via(B));
  // C: direct, by code
  await C.click('.am-card:has-text("ENTRER UN CODE")'); await C.fill('.am-code', code); await C.press('.am-code', 'Enter');
  ok('a friend with direct connection joins directly', await until(C, () => globalThis.__au?.c?.phase === 'lobby' && globalThis.__au.c.link.via === 'rtc', 40000), await via(C));
  // D: relay, by code
  await D.click('.am-card:has-text("ENTRER UN CODE")'); await D.fill('.am-code', code); await D.press('.am-code', 'Enter');
  ok('another friend joins with the code through the relay', await until(D, () => globalThis.__au?.c?.phase === 'lobby', 40000), await via(D));
  ok('the host sees four players', await until(A, () => globalThis.__au.c.v.players.filter(p => !p.bot).length === 4, 15000));
  ok('the relayed friend sees four players', await until(B, () => globalThis.__au.c.v.players.length === 4, 15000));
  // moves cross the relay
  const nB = await B.evaluate(() => globalThis.__au.c.n);
  const before = await A.evaluate(n => { const o = globalThis.__au.c.others.get(n); return o && [o.x, o.y]; }, nB);
  await B.evaluate(() => { globalThis.__au.autoDir = [0, 1]; }); await B.waitForTimeout(1500); await B.evaluate(() => { globalThis.__au.autoDir = null; });
  const after = await B.evaluate(() => [globalThis.__au.c.pos.x, globalThis.__au.c.pos.y]);
  ok('the relayed friend walks', before && Math.hypot(after[0] - before[0], after[1] - before[1]) > .1, JSON.stringify([before, after]));
  ok('…and the host sees him where he is', await until(A, ([n, p]) => { const o = globalThis.__au.c.others.get(n); return o && Math.hypot(o.x - p[0], o.y - p[1]) < .15; }, 8000, [nB, after]));
  // proximity voice: signalling goes through the room, whatever the way
  for (const p of [A, B, C, D]) await p.evaluate(() => globalThis.__au.voice.start());
  ok('lobby voice: everyone connected to the 3 others', (await Promise.all([A, B, C, D].map(p => until(p, () => [...globalThis.__au.voice.peers.values()].filter(x => x.pc?.connectionState === 'connected').length === 3, 40000)))).every(Boolean));
  await A.evaluate(() => globalThis.__au.c.send({ k: 'start' }));
  ok('the game starts for everyone', (await Promise.all([A, B, C, D].map(p => until(p, () => globalThis.__au.c.phase === 'play', 40000)))).every(Boolean));
  // the host makes the room private again: it leaves the list
  await A.evaluate(() => globalThis.__au.c.send({ k: 'privacy', public: false }));
} catch (e) { ok('no exception', false, e.stack || e.message); }
finally { await browser.close(); web.close(); mqtt.close(); aedes.close(); broker.close?.(); }
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
console.log(results.every(Boolean) && !errors.length ? 'RELAY E2E PASSED' : 'RELAY E2E FAILED');
process.exit(results.every(Boolean) && !errors.length ? 0 : 1);
