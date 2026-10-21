// Touch check on a phone-sized screen: taps through the menus, drags the joystick, holds the on-screen POUF button.
// Usage: npm run build && node tools/pouf/touch.mjs [screenshotDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist'), out = process.argv[2];
const results = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
const errs = []; page.on('pageerror', e => errs.push(e.message));
await page.goto(`http://localhost:${web.address().port}/?pfdebug&pflow&peerhost=127.0.0.1:9`);
await page.waitForTimeout(800); await page.touchscreen.tap(420, 200);
await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Tactile'); await page.tap('.acc-submit');
await page.waitForSelector('.home .tile'); await page.waitForTimeout(800); await page.tap('.home .tile:nth-child(3)'); await page.waitForTimeout(300);
await page.tap('.home .tile.sel'); await page.waitForTimeout(300); if (!(await page.$('.launch'))) await page.tap('.home .tile.sel');
await page.waitForFunction(() => !!document.querySelector('.pf-title .pf-btn'), null, { timeout: 40000 });
await page.waitForTimeout(1500); if (out) await page.screenshot({ path: join(out, 't-title.jpg'), quality: 75, type: 'jpeg' });
await page.tap('.pf-btn[data-key="play"]'); await page.waitForTimeout(200); if (!(await page.$('.pf-connect, .pf-lobby'))) await page.tap('.pf-btn[data-key="play"]');
await page.waitForFunction(() => /[A-Z0-9]{5}/.test(document.querySelector('.pf-lobby .pf-code b')?.textContent || ''), null, { timeout: 30000 });
await page.waitForTimeout(800); if (out) await page.screenshot({ path: join(out, 't-lobby.jpg'), quality: 75, type: 'jpeg' });
await page.tap('.pf-btn[data-key="start"]'); await page.waitForTimeout(200); if (!(await page.evaluate(() => window.__pouf.state === 'match'))) await page.tap('.pf-btn[data-key="start"]');
await page.waitForFunction(() => window.__pouf?.state === 'match');
if (await page.waitForSelector('.pf-help', { timeout: 4000 }).catch(() => null)) { await page.tap('.pf-help .pf-btn'); await page.waitForTimeout(400); if (await page.$('.pf-help:not(.out)')) await page.tap('.pf-help .pf-btn'); }
await page.waitForFunction(() => window.__pouf.match.t > 3.3, null, { timeout: 20000 });
const vis = await page.evaluate(() => ({ device: document.documentElement.dataset.device, touch: getComputedStyle(document.querySelector('.pf-touch')).display, keys: getComputedStyle(document.querySelector('.pf-keys')).display, touchbar: getComputedStyle(document.getElementById('touchbar')).display }));
ok('commandes tactiles affichées, barre de la console masquée', vis.device === 'touch' && vis.touch === 'block' && vis.keys === 'none' && vis.touchbar === 'none', JSON.stringify(vis));
// joystick: drag down (stick towards the camera → push the raft backwards) then up, while holding POUF
const fire = (sel, type, x, y, id) => page.evaluate(([sel, type, x, y, id]) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect(); el.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: id, pointerType: 'touch', clientX: r.left + r.width / 2 + x, clientY: r.top + r.height / 2 + y, isPrimary: id === 1 })); }, [sel, type, x, y, id]);
const s0 = await page.evaluate(() => window.__pouf.match.sim.st.s);
await fire('.pf-stick', 'pointerdown', 0, -40, 1); await fire('.pf-stick', 'pointermove', 0, -55, 1);
await page.waitForTimeout(800);
await fire('.pf-tbtn.puff', 'pointerdown', 0, 0, 2);
await page.waitForTimeout(2500);
if (out) await page.screenshot({ path: join(out, 't-run.jpg'), quality: 75, type: 'jpeg' });
await fire('.pf-tbtn.puff', 'pointerup', 0, 0, 2); await fire('.pf-stick', 'pointerup', 0, 0, 1);
const s1 = await page.evaluate(() => window.__pouf.match.sim.st.s);
const puffed = await page.evaluate(() => window.__pouf.match.riders.get(window.__pouf.me.id).puffTime);
ok('joystick + POUF font avancer la bouée', s1 - s0 > 6 && puffed > 1, `${(s1 - s0).toFixed(1)} m · ${puffed.toFixed(1)} s de pouf`);
await page.tap('.pf-tbtn.pause'); await page.waitForTimeout(600);
ok('bouton pause tactile', !!(await page.$('.pf-pause')));
if (out) await page.screenshot({ path: join(out, 't-pause.jpg'), quality: 75, type: 'jpeg' });
ok('aucune erreur JavaScript', !errs.length, errs.join(' | '));
await browser.close(); web.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
