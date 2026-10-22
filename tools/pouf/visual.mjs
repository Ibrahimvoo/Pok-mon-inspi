// Single-browser visual pass: title, customisation, lobby, a solo run with real key presses, pause, results.
// Usage: npm run build && node tools/pouf/visual.mjs <outDir> [WxH]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const [out, size = '1280x720'] = process.argv.slice(2);
const [w, h] = size.split('x').map(Number);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h }, hasTouch: !!process.env.TOUCH, isMobile: !!process.env.TOUCH });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load|GPU stall|peerjs/.test(m.text())) errors.push(m.text()); });
const shot = n => page.screenshot({ path: join(out, `v-${n}.jpg`), type: 'jpeg', quality: 75 });
const until = async (fn, ms = 20000) => { try { await page.waitForFunction(fn, null, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
// offline: no broker reachable, the lobby falls back to a solo game
await page.goto(`http://localhost:${web.address().port}/?pfdebug&peerhost=127.0.0.1:9`);
await page.keyboard.press('Enter');
await page.waitForSelector('.account .acc-form', { timeout: 20000 });
await page.fill('.f-input >> nth=0', 'Testeur');
await page.click('.acc-submit');
await page.waitForSelector('.home .tile', { timeout: 20000 });
await page.waitForTimeout(1500); await shot('0-home');   // Pouf Party is selected on arrival
await page.click('.home .tile.sel');
await until(() => !!document.querySelector('.pf-title .pf-btn'), 40000);
await page.waitForTimeout(2500); await shot('1-title');
await page.click('.pf-btn[data-key="custom"]'); await page.waitForTimeout(2500); await shot('2-custom');
await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1500); await shot('3-custom-hat');
await page.keyboard.press('Escape'); await page.waitForTimeout(600);
await page.click('.pf-btn[data-key="play"]');
await until(() => !!document.querySelector('.pf-lobby .pf-code b')?.textContent.match(/[A-Z0-9]{5}/), 30000);
await page.waitForTimeout(2000); await shot('4-lobby');
await page.click('.pf-btn[data-key="start"]');
await until(() => window.__pouf?.state === 'match');
if (await until(() => !!document.querySelector('.pf-help'), 4000)) { await page.waitForTimeout(600); await shot('5-help'); await page.click('.pf-help .pf-btn'); }
await page.waitForTimeout(1200); await shot('6-countdown');
await until(() => window.__pouf.match.t > 3.2, 15000);
await page.keyboard.down('KeyW'); await page.waitForTimeout(600);
await page.keyboard.down('Space'); await page.waitForTimeout(1600); await shot('7-puff');
await page.waitForTimeout(2500); await page.keyboard.up('Space'); await page.keyboard.up('KeyW');
await page.keyboard.press('ShiftLeft'); await page.waitForTimeout(400); await shot('8-super');
const st = await page.evaluate(() => ({ s: window.__pouf.match.sim.st.s, t: window.__pouf.match.t, fps: 0 }));
console.log('progress', JSON.stringify(st));
await page.keyboard.press('Digit3'); await page.waitForTimeout(700); await shot('9-emote');
// teleport the raft just before the spikes to see a hit and a burst
await page.evaluate(() => { const m = window.__pouf.match, T = window.__pouf.arena.track, o = T.world(62, 3.3, {}); Object.assign(m.sim.st, { x: o.wx, z: o.wz, s: 62, vx: 0, vz: 0, inv: 0 }); });
await page.keyboard.down('KeyA'); await page.keyboard.down('Space'); await page.waitForTimeout(900); await shot('10-hit');
await until(() => window.__pouf.match.sim.st.pop >= 0, 9000); await page.waitForTimeout(500); await shot('11-pop');
await page.keyboard.up('KeyA'); await page.keyboard.up('Space');
await until(() => window.__pouf.match.sim.st.pop < 0, 6000); await page.waitForTimeout(400);
// near the finish
await page.evaluate(() => { const m = window.__pouf.match, T = window.__pouf.arena.track, o = T.world(566, 0, {}); m.sim.st.cp = 4; Object.assign(m.sim.st, { x: o.wx, z: o.wz, s: 566, vx: 0, vz: 0, inv: 2 }); });
await page.keyboard.down('KeyW'); await page.keyboard.down('Space');
await until(() => window.__pouf.match.sim.st.finished, 15000); await page.keyboard.up('Space'); await page.keyboard.up('KeyW');
await page.waitForTimeout(1500); await shot('12-finish');
await until(() => !!document.querySelector('.pf-results'), 12000); await page.waitForTimeout(1200); await shot('13-results');
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
await browser.close(); web.close();
