// End-to-end test of Among Us on the built console.
//  1. free play (no network): menus, map, movement against the walls, a task minigame, kill a dummy, vent, sabotage
//  2. online with the real server: several browsers create / join by code, play a whole game: roles, tasks, kill,
//     report, meeting, votes, ejection, end of game; voice groups (fake microphones) checked on the peers.
// Usage: npm run e2e:among [shotsDir]
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const shots = process.argv[2] || null;
if (shots) await mkdir(shots, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json', '.png': 'image/png' };
const results = [], errors = [];
export const ok = (n, c, x = '') => { results.push(c); console.log(c ? '✓' : '✗', n, x); };
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });

async function openConsole(url, name) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|WebSocket|ERR_CONNECTION|favicon/.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', name);
  if (await page.$('.f-input >> nth=1')) { await page.fill('.f-input >> nth=1', 'manette123'); }
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  await page.waitForTimeout(500);
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
  if (idx < 0) throw new Error('Among Us tile not found');
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(100); }
  for (let i = cur; i > idx; i--) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(100); }
  await page.keyboard.press('Enter');
  await page.waitForSelector('.au-main', { timeout: 20000 });
  page.shot = n => shots && page.screenshot({ path: join(shots, `among-${name}-${n}.jpg`), type: 'jpeg', quality: 72, timeout: 120000 }).catch(e => console.log('screenshot skipped', e.message.slice(0, 60)));
  return page;
}
export { openConsole, browser, errors, results, shots };
const until = async (page, fn, ms = 15000, arg) => { const t = Date.now(); while (Date.now() - t < ms) { if (await page.evaluate(fn, arg).catch(() => false)) return true; await page.waitForTimeout(150); } return false; };
export { until };
// walk along a path computed with the same map data, by steering the input of the page (no teleport)
const { findPath } = await import('../src/among/core/path.js');
const { getMap } = await import('../src/among/core/room.js');
export async function walkTo(page, tx, ty, ms = 40000) {
  const st = await page.evaluate(() => { const c = globalThis.__au.c; return { x: c.pos.x, y: c.pos.y, map: c.mapId, closed: c.v?.closed || [], ghost: c.ghost }; });
  const M = getMap(st.map);
  const path = st.ghost ? [[tx, ty]] : findPath(M, st.x, st.y, tx, ty, st.closed);
  if (!path) return false;
  const t0 = Date.now();
  for (let i = 0; i < path.length; i += 3) {
    const [wx, wy] = path[Math.min(path.length - 1, i + 2)];
    for (;;) {
      if (Date.now() - t0 > ms) { await page.evaluate(() => { globalThis.__au.autoDir = null; }); return false; }
      const p = await page.evaluate(([x, y]) => { const P = globalThis.__au, c = P.c; const dx = x - c.pos.x, dy = y - c.pos.y, l = Math.hypot(dx, dy); P.autoDir = l > .08 ? [dx / l, dy / l] : null; return l; }, [wx, wy]);
      if (p <= .12) break;
      await page.waitForTimeout(40);
    }
  }
  await page.evaluate(() => { globalThis.__au.autoDir = null; });
  return true;
}
export const state = page => page.evaluate(() => { const P = globalThis.__au, c = P.c, V = c.v; return { x: c.pos.x, y: c.pos.y, phase: c.phase, map: c.mapId, role: V?.me?.role, alive: V?.me?.alive, tasks: V?.tasks, others: c.others.size, bodies: c.bodies.length, sab: V?.sab?.kind || null, vent: V?.me?.vent, panel: !!P.panel, n: c.n, players: V?.players?.map(p => ({ n: p.n, id: p.id, name: p.name, dead: p.dead, imp: p.imp })) }; });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const web = createServer(async (req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
    catch { res.writeHead(404); res.end(); }
  }).listen(0);
  try {
    const A = await openConsole(`http://localhost:${web.address().port}/?aufps=20`, 'Solo');
    await A.shot('menu');
    await A.click('.au-btn:has-text("Entraînement")');
    await A.click('.au-mapbtn >> nth=0');
    ok('free play starts on the Skeld', await until(A, () => globalThis.__au?.c?.phase === 'play', 25000));
    await A.waitForTimeout(7000);
    await A.shot('freeplay');
    const st = () => state(A);
    const s0 = await st();
    ok('dummies are visible', s0.others >= 3, JSON.stringify(s0));
    await A.keyboard.down('ArrowDown'); await A.waitForTimeout(1500); await A.keyboard.up('ArrowDown');
    const s1 = await st();
    ok('walking moves the crewmate', Math.hypot(s1.x - s0.x, s1.y - s0.y) > 1, JSON.stringify([s0.x, s0.y, s1.x, s1.y]));
    await A.keyboard.down('ArrowUp'); await A.waitForTimeout(6000); await A.keyboard.up('ArrowUp');
    const s2 = await st();
    ok('the top wall of the cafeteria stops the crewmate', s2.y > 8.3, JSON.stringify(s2));
    await A.shot('wall');
    // a real task: empty the garbage of the cafeteria (pull the lever down and hold it)
    const M = getMap('skeld'), gb = M.consoles.cafe_garbage;
    ok('walks to the garbage chute', await walkTo(A, gb.x, gb.y + .6));
    await A.keyboard.press('KeyE');
    ok('the minigame opens', await until(A, () => !!document.querySelector('.mg-garbage'), 6000));
    await A.shot('task');
    const lv = await A.$('.mg-lever'); const bb = await lv.boundingBox();
    await A.mouse.move(bb.x + bb.width / 2, bb.y + 20); await A.mouse.down();
    await A.mouse.move(bb.x + bb.width / 2, bb.y + bb.height - 10, { steps: 6 });
    ok('the garbage empties while the lever is held', await until(A, () => !!document.querySelector('.mg-done'), 12000));
    await A.mouse.up();
    ok('the room validates the step', await until(A, () => globalThis.__au.c.v.tasks.find(t => t.id === 'emptyGarbage').step === 1, 8000));
    // impostor: switch role, kill a dummy, vent, sabotage the lights
    await A.click('.au-top.role'); await A.click('.au-pickbtn:has-text("Imposteur") >> nth=0');
    ok('free play restarts as impostor', await until(A, () => globalThis.__au.c.v?.me?.role === 'impostor' && globalThis.__au.c.phase === 'play', 20000));
    await A.waitForTimeout(10500);
    const s3 = await st();
    const dummy = await A.evaluate(() => { const c = globalThis.__au.c; const [n, o] = [...c.others][0]; return { n, x: o.x, y: o.y }; });
    ok('walks next to a dummy', await walkTo(A, dummy.x - .5, dummy.y));
    await A.keyboard.press('KeyQ');
    ok('the kill leaves a body', await until(A, () => globalThis.__au.c.bodies.length === 1, 5000), JSON.stringify(s3.role));
    await A.shot('kill');
    const vent = M.vents.find(v => v.id === 'cafe');
    ok('walks to the cafeteria vent', await walkTo(A, vent.x - .3, vent.y));
    await A.keyboard.press('KeyV');
    ok('enters the vent', await until(A, () => globalThis.__au.c.v.me.vent === 'cafe', 4000));
    await A.shot('vent');
    await A.click('.au-ventarrow >> nth=0');
    ok('moves through the vents', await until(A, () => !!globalThis.__au.c.v.me.vent && globalThis.__au.c.v.me.vent !== 'cafe', 4000));
    await A.keyboard.press('KeyE');
    ok('leaves the vent', await until(A, () => !globalThis.__au.c.v.me.vent, 4000));
    await A.waitForTimeout(500);
    await A.keyboard.press('KeyF');
    ok('the sabotage map opens', await until(A, () => !!document.querySelector('.au-mappanel.sab'), 4000));
    await A.shot('sabmap');
    await A.click('.sabbtn.lights');
    ok('lights are sabotaged', await until(A, () => globalThis.__au.c.v.sab?.kind === 'lights', 4000));
  } finally { web.close(); }
  await browser.close();
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors');
  process.exit(results.every(Boolean) && !errors.length ? 0 : 1);
}
