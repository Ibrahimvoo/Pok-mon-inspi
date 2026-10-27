// End-to-end test of Among Us without the project server, as on the static site (GitHub Pages): the host's console
// runs the room and the others join it by code through PeerJS (a local broker here). Four browsers with fake
// microphones: create, join by code, settings, proximity voice in the lobby, game start, roles, a kill and the voice
// groups of the living and the dead.
// Usage: npm run e2e:among-p2p
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';
const { chromium } = createRequire(import.meta.url)('playwright');
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json', '.png': 'image/png' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9124, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9124&aufps=10`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 15000, arg) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 200 }); return true; } catch { return false; } };

async function player(name) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|peerjs|WebSocket|ERR_/.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
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
const voice = page => page.evaluate(() => { const v = globalThis.__au.voice; return { st: v.state, g: v.group, peers: [...v.peers.keys()], live: [...v.peers.values()].filter(p => p.pc?.connectionState === 'connected').length }; });

try {
  const names = ['Hote', 'Bleu', 'Vert', 'Rose'];
  const P = [];
  for (const n of names) P.push(await player(n));
  const [A] = P;
  await A.click('.am-card:has-text("CRÉER UNE PARTIE")');
  await A.click('.hs-btn:has-text("Classique")');
  ok('the host console creates the room', await until(A, () => globalThis.__au?.c?.phase === 'lobby' && /^[A-Z]{6}$/.test(globalThis.__au.c.v?.code || ''), 30000));
  ok('…hosted in the browser (no server)', await A.evaluate(() => globalThis.__au.c.link.constructor.name) !== 'ServerLink');
  const code = await A.evaluate(() => globalThis.__au.c.v.code);
  ok('the code is shown in the lobby panel', (await A.locator('.lb-code b').innerText()) === code, code);
  for (const p of P.slice(1)) {
    await p.click('.am-card:has-text("ENTRER UN CODE")');
    await p.fill('.am-code', code.toLowerCase());
    await p.press('.am-code', 'Enter');
  }
  ok('three friends join with the code', await until(A, () => globalThis.__au.c.v.players.filter(p => !p.bot).length === 4, 40000));
  ok('everyone sees four players', (await Promise.all(P.map(p => until(p, () => globalThis.__au?.c?.v?.players?.length === 4, 20000)))).every(Boolean));
  await A.evaluate(() => globalThis.__au.c.send({ k: 'set', settings: { killCooldown: 10, impostors: 1, discussionTime: 0 } }));
  ok('settings reach the guests', await until(P[3], () => globalThis.__au.c.v.settings.killCooldown === 10, 8000));
  for (const p of P) await p.evaluate(() => globalThis.__au.voice.start());
  ok('lobby proximity voice: everyone connected to the 3 others', (await Promise.all(P.map(p => until(p, () => [...globalThis.__au.voice.peers.values()].filter(x => x.pc?.connectionState === 'connected').length === 3, 40000)))).every(Boolean), JSON.stringify(await Promise.all(P.map(voice))));
  ok('audio of the others is received', await until(A, () => [...document.querySelectorAll('audio')].filter(a => a.srcObject?.getAudioTracks().some(t => t.readyState === 'live')).length >= 3, 15000));
  await A.evaluate(() => globalThis.__au.c.send({ k: 'start' }));
  ok('the game starts on every console', (await Promise.all(P.map(p => until(p, () => globalThis.__au.c.phase === 'play', 40000)))).every(Boolean));
  const roles = await Promise.all(P.map(p => p.evaluate(() => globalThis.__au.c.v.me.team)));
  ok('exactly one impostor', roles.filter(t => t === 'imp').length === 1, roles.join(','));
  ok('in game the living keep their voice group', (await Promise.all(P.map(p => until(p, () => globalThis.__au.voice.group === 'alive', 15000)))).every(Boolean));
  // the impostor kills a crewmate (moved next to it by the test through the room of the host)
  const imp = P[roles.indexOf('imp')], victimPage = P[roles.findIndex(t => t !== 'imp')];
  const victimId = await victimPage.evaluate(() => globalThis.__au.c.me.id);
  await A.evaluate(([vid, iid]) => { const room = globalThis.__au.c.link.room; const v = room.players.get(vid), i = room.players.get(iid); i.killAt = 0; room.teleport?.(i, v.x - .5, v.y); }, [victimId, await imp.evaluate(() => globalThis.__au.c.me.id)]);
  await imp.waitForTimeout(1500);
  await imp.evaluate(id => globalThis.__au.c.send({ k: 'kill', id }), victimId);
  ok('the kill turns the victim into a ghost', await until(victimPage, () => globalThis.__au.c.v.me.alive === false, 10000));
  ok('the ghost leaves the voice of the living', await until(victimPage, () => globalThis.__au.voice.group === 'dead', 10000) && (await Promise.all(P.filter(p => p !== victimPage).map(p => until(p, id => !globalThis.__au.voice.peers.has(id), 10000, victimId)))).every(Boolean));
} catch (e) { ok('no exception', false, e.stack || e.message); }
finally { await browser.close(); web.close(); broker.close?.(); }
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
console.log(results.every(Boolean) && !errors.length ? 'P2P E2E PASSED' : 'P2P E2E FAILED');
process.exit(results.every(Boolean) && !errors.length ? 0 : 1);
