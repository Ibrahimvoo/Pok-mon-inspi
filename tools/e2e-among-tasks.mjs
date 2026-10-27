// End-to-end test of the Skeld task screens and of the sabotage repair screens in a real browser: each screen is
// opened over the free-play game and played with the real mouse (drag, click, hold) until it completes, or until
// it sends the right repair message to the room.
// Usage: npm run e2e:among-tasks [shotsDir]
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const dist = join(dirname(fileURLToPath(import.meta.url)), '../dist');
const map = 'skeld', out = process.argv[2] || null;
if (out) await mkdir(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.png': 'image/png' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const b = await readFile(join(dist, p === '/' ? 'index.html' : p)); res.writeHead(200, { 'Content-Type': types[extname(p)] || 'text/html' }); res.end(b); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/Failed to load|WebSocket|ERR_/.test(m.text())) errs.push(m.text()); });
await page.goto(`http://localhost:${web.address().port}/?aufps=8`);
await page.keyboard.press('Enter');
await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Test');
if (await page.$('.f-input >> nth=1')) await page.fill('.f-input >> nth=1', 'manette123');
await page.click('.acc-submit'); await page.waitForSelector('.home .tile'); await page.waitForTimeout(400);
const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
for (let i = cur; i < idx; i++) await page.keyboard.press('ArrowRight');
for (let i = cur; i > idx; i--) await page.keyboard.press('ArrowLeft');
await page.keyboard.press('Enter'); await page.waitForSelector('.au-main');
await page.click('.au-btn:has-text("Entraînement")'); await page.click(`.au-mapbtn >> nth=${map === 'polus' ? 1 : 0}`);
await page.waitForFunction(() => globalThis.__au?.c?.phase === 'play' && globalThis.__au.c.v?.tasks?.length, null, { timeout: 30000 });
const P = (fn, arg) => page.evaluate(fn, arg);
const sleep = ms => page.waitForTimeout(ms);
const results = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
// open a screen with a recording api: done() and fix() are kept in globalThis.__mg
async function open(game, step = {}, sab = null) {
  await P(([game, step, sab]) => {
    const A = globalThis.__au; A.closePanel(true);
    globalThis.__mg = { done: 0, fix: [] };
    A.openPanel((box, api) => {
      box.classList.add('au-mgbox'); api.step = step; api.index = 0; if (sab) api.sab = sab;
      api.fix = m => globalThis.__mg.fix.push(m); api.task = { id: step.task || game, steps: [step] };
      A.minigames[game](box, api); globalThis.__mg.el = box;
    }, { walk: false, onDone: () => { globalThis.__mg.done++; } });
  }, [game, step, sab]);
  // wait for the screen to finish sliding up
  for (let i = 0, prev = null; i < 30; i++) { await sleep(120); const y = await P(() => globalThis.__mg.el.toScreen(0, 0)[1]); if (prev !== null && Math.abs(y - prev) < .5) break; prev = y; }
}
const probe = () => P(() => globalThis.__mg.el.probe());
const scr = async (x, y) => P(([x, y]) => globalThis.__mg.el.toScreen(x, y), [x, y]);
const tap = async (x, y) => { const [sx, sy] = await scr(x, y); await page.mouse.click(sx, sy); };
async function dragTo(from, to, steps = 12) {
  const [ax, ay] = await scr(...from), [bx, by] = await scr(...to);
  await page.mouse.move(ax, ay); await page.mouse.down();
  for (let i = 1; i <= steps; i++) await page.mouse.move(ax + (bx - ax) * i / steps, ay + (by - ay) * i / steps);
  await page.mouse.up();
}
const done = (ms = 3000) => page.waitForFunction(() => globalThis.__mg.done > 0, null, { timeout: ms }).then(() => true, () => false);
const shot = n => out && page.screenshot({ path: join(out, `task-${n}.png`), timeout: 120000 }).catch(() => {});
try {
  // task arrows: none for tasks not started (free play deals every task), one per next step elsewhere, no duplicates
  const arrows = await P(() => {
    const A = globalThis.__au, V0 = A.c.v, at = mod => { const V = structuredClone(V0); mod(V); return A.r.arrowTargets(V).map(t => t.kind); };
    const step = (V, id, n) => { const t = V.tasks.find(t => t.id === id); if (t) t.step = n; };
    return {
      start: at(() => {}),
      divert: at(V => step(V, 'divertPower', 1)),
      three: at(V => { step(V, 'divertPower', 1); step(V, 'fuelEngines', 1); step(V, 'uploadData', 1); }),
      sameConsole: at(V => step(V, 'inspectSample', 1)),
      wires: at(V => step(V, 'fixWiring', 1)),
      dup: at(V => { const t = V.tasks.find(t => t.id === 'emptyGarbage'), u = V.tasks.find(t => t.id === 'emptyChute'); t.step = 1; u.step = 1; }),
      reactor: at(V => { V.sab = { kind: 'reactor', holds: [-1, -1], fixed: [false, false] }; }),
      o2half: at(V => { V.sab = { kind: 'o2', fixed: [true, false] }; }),
      comms: at(V => { step(V, 'divertPower', 1); V.sab = { kind: 'comms' }; }),
    };
  });
  ok('arrows: none at the start of free play (no task under way)', arrows.start.length === 0, JSON.stringify(arrows.start));
  ok('arrows: one after diverting the power', JSON.stringify(arrows.divert) === '["task"]');
  ok('arrows: one per task under way whose next step is elsewhere', arrows.three.length === 3);
  ok('arrows: none for a second step at the same console, none for wires', arrows.sameConsole.length === 0 && arrows.wires.length === 0);
  ok('arrows: two tasks going to the same console share one arrow', arrows.dup.length === 1);
  ok('arrows: reactor meltdown points at both hand scanners, O2 only at the keypad still to fix', arrows.reactor.join() === 'sab,sab' && arrows.o2half.join() === 'sab');
  ok('arrows: comms sabotage hides the task arrows of the crew', arrows.comms.join() === 'sab');
  // Align Engine Output: the slider on the arc onto the centre line
  await open('align'); let p = await probe();
  await dragTo(p.handle, p.aligned); await shot('align');
  ok('align engine output: the engine is aligned with the slider', await done());
  // Calibrate Distributor: press each button when its segment passes under the notch
  await open('calibrate');
  await P(() => { globalThis.__mg.el.addEventListener('pointerdown', () => { globalThis.__mg.downAt = performance.now(); }, true); });
  let lag = 120;
  for (let i = 0; i < 20 && (await probe()).cur < 3; i++) {
    const q = await P(() => ({ ...globalThis.__mg.el.probe(), now: performance.now() }));
    if (q.wait * 1000 < lag + 40) { await sleep(q.wait * 1000 + 300); continue; }
    await sleep(q.wait * 1000 - lag);
    const sent = await P(() => performance.now()); await tap(...q.button);
    lag = Math.max(20, (await P(() => globalThis.__mg.downAt)) - q.now - (q.wait * 1000 - lag) + 0) * .5 + lag * .5; void sent;
  }
  ok('calibrate distributor: three dials stopped on the notch', await done(), JSON.stringify(await probe()));
  // Clean O2 Filter: every leaf into the intake
  await open('filter'); p = await probe();
  for (let i = 0; i < 10 && (p = await probe()).leaves.length; i++) { await dragTo(p.leaves[p.leaves.length - 1], p.intake); await sleep(450); }
  ok('clean O2 filter: leaves sucked into the intake', await done());
  // Divert Power: the flashing slider to the top
  await open('divert', { target: 'shields_power' }); p = await probe();
  await dragTo(p.knob, p.top, 16); await shot('divert');
  ok('divert power: the slider of the room pushed up', await done());
  // Accept Diverted Power: turn the switch
  await open('accept'); p = await probe(); await tap(...p.switch);
  ok('accept diverted power: switch turned, current flows', await done());
  // Prime Shields: every red hexagon
  await open('shields'); p = await probe(); for (const c of p.off) await tap(...c);
  ok('prime shields: all hexagons on', await done());
  // Stabilize Steering: the reticle to the centre
  await open('steer'); p = await probe(); await dragTo(p.reticle, p.centre, 14);
  ok('stabilize steering: reticle centred', await done());
  // Start Reactor: repeat the sequence round after round
  await open('reactor');
  for (let i = 0; i < 200 && !(await P(() => globalThis.__mg.done)); i++) {
    const q = await probe();
    if (q.state !== 'input') { await sleep(120); continue; }
    for (const k of q.seq.slice(q.pos)) { await tap(...q.keys[k]); await sleep(60); }
    await sleep(200);
  }
  ok('start reactor: five rounds repeated', await done(4000), JSON.stringify(await probe()));
  // a wrong key starts over
  await open('reactor'); await page.waitForFunction(() => globalThis.__mg.el.probe().state === 'input', null, { timeout: 8000 });
  p = await probe(); await tap(...p.keys[(p.seq[0] + 1) % 9]); await sleep(100);
  ok('start reactor: a wrong key fails the sequence', (await probe()).state === 'fail');
  // Empty Garbage: hold the lever down
  await open('garbage', { console: 'cafe_garbage', task: 'emptyGarbage' });
  { const [lx, ly] = await scr(425, 180), [, ly2] = await scr(425, 300); await page.mouse.move(lx, ly); await page.mouse.down(); for (let i = 1; i <= 8; i++) await page.mouse.move(lx, ly + (ly2 - ly) * i / 8); await shot('garbage'); await sleep(2600); await page.mouse.up(); }
  ok('empty garbage: lever held until the bin is empty', await done());
  // sabotage screens: they send the repair to the room
  await open('reactorHand', {}, { kind: 'reactor', holds: [-1, -1], fixed: [false, false] });
  { const [hx, hy] = await scr(320, 230); await page.mouse.move(hx, hy); await page.mouse.down(); await sleep(400); await shot('hand');
    const held = await P(() => globalThis.__mg.fix.at(-1)); await page.mouse.up(); await sleep(100);
    ok('reactor hand: holding the hand tells the room, releasing too', held?.a === 'hold' && held.on === true && (await P(() => globalThis.__mg.fix.at(-1))).on === false); }
  await open('o2Keypad', {}, { kind: 'o2', code: '17549', fixed: [false, false] }); p = await probe();
  for (const d of '17549V') { await tap(...p.keys[d]); await sleep(60); } await shot('keypad');
  ok('O2 keypad: the code of the note is sent', JSON.stringify(await P(() => globalThis.__mg.fix)) === JSON.stringify([{ a: 'code', code: '17549' }]), JSON.stringify([await P(() => globalThis.__mg.fix), (await probe()).typed, p.keys]));
  await open('o2Keypad', {}, { kind: 'o2', code: '17549', fixed: [false, false] }); p = await probe();
  for (const d of '12345V') { await tap(...p.keys[d]); await sleep(60); }
  ok('O2 keypad: a wrong code is not accepted', (await P(() => globalThis.__mg.fix.length)) === 0);
  await open('lights', {}, { kind: 'lights', sw: [1, 0, 1, 1, 0] }); p = await probe(); await tap(...p.switches[1]); await shot('lights');
  ok('lights: a switch toggles in the room', JSON.stringify(await P(() => globalThis.__mg.fix)) === JSON.stringify([{ a: 'switch', s: 1 }]));
  await open('comms', {}, { kind: 'comms', target: .3 }); p = await probe();
  { // turn the dial in small steps until the signal is clean
    const [kx, ky] = await scr(...p.knob), R = 30 * (await scr(1, 0))[0] - 30 * (await scr(0, 0))[0];
    let ang = -Math.PI / 2; await page.mouse.move(kx + Math.cos(ang) * R, ky + Math.sin(ang) * R); await page.mouse.down();
    for (let i = 0; i < 400; i++) { const q = await probe(); if (Math.abs(q.v - q.target) < .02) break; ang += (q.v > q.target ? -1 : 1) * .05; await page.mouse.move(kx + Math.cos(ang) * R, ky + Math.sin(ang) * R); }
    await page.mouse.up(); await shot('comms'); }
  ok('comms: the dial on the right frequency is sent', (await P(() => globalThis.__mg.fix)).some(m => m.a === 'tune' && Math.abs(m.v - .3) < .035));
} catch (e) { console.error(e); results.push(false); }
console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors');
await browser.close(); web.close();
const pass = results.length && results.every(Boolean) && !errs.length;
console.log(pass ? 'TASKS E2E PASSED' : 'TASKS E2E FAILED');
process.exit(pass ? 0 : 1);
