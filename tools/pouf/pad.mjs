// Gamepad check: a virtual standard controller drives the console and the game (menus, stick, ✕, □, △, Options).
// Usage: npm run build && node tools/pouf/pad.mjs [screenshotDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const out = process.argv[2];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
await page.addInitScript(() => {
  const pad = { id: 'DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)', index: 0, connected: true, mapping: 'standard', timestamp: 0, axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) };
  window.__pad = pad; navigator.getGamepads = () => [pad];
  addEventListener('load', () => { const e = new Event('gamepadconnected'); e.gamepad = pad; dispatchEvent(e); });
});
const results = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (fn, ms = 20000) => { try { await page.waitForFunction(fn, null, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
// a tap lasts exactly one frame: the console polls the pad in requestAnimationFrame, before our callback
const press = async b => {
  await page.evaluate(i => new Promise(r => { __pad.buttons[i].pressed = true; __pad.buttons[i].value = 1; requestAnimationFrame(() => { __pad.buttons[i].pressed = false; __pad.buttons[i].value = 0; requestAnimationFrame(() => r()); }); }), b);
  await page.waitForTimeout(150);
};
const set = (b, v) => page.evaluate(([i, v]) => { __pad.buttons[i].pressed = v; __pad.buttons[i].value = v ? 1 : 0; }, [b, v]);
const axis = (i, v) => page.evaluate(([i, v]) => { __pad.axes[i] = v; }, [i, v]);
const shot = n => out && page.screenshot({ path: join(out, `pad-${n}.jpg`), type: 'jpeg', quality: 75 });
try {
  await page.goto(`http://localhost:${web.address().port}/?pfdebug&pflow&peerhost=127.0.0.1:9`);
  await page.waitForTimeout(1200);
  await press(0);                                           // ✕ on the boot screen
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', 'Manette');
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  await page.waitForTimeout(800);
  // Pouf Party, the only game, is already selected when the home screen opens
  ok('jaquette sélectionnée à la manette', await until(() => /Pouf Party/.test(document.querySelector('.home .tile.sel .tile-label')?.textContent || ''), 5000));
  await press(0);                                           // ✕ launches
  ok('jeu lancé à la manette', await until(() => !!document.querySelector('.pf-title .pf-btn.focused'), 40000),
    JSON.stringify(await page.evaluate(() => ({ layers: [...document.querySelectorAll('#app > *')].map(e => e.className).slice(-4), focused: document.querySelector('.focused')?.className, state: window.__pouf?.state }))));
  await page.waitForTimeout(800);
  ok('glyphes manette dans les indications', await page.evaluate(() => !!document.querySelector('#hints .gl.ps')));
  await press(13); await press(13);                         // ↓ ↓ → Personnaliser
  ok('navigation à la croix', await page.evaluate(() => document.querySelector('.pf-btn.focused')?.dataset.key === 'custom'));
  await press(0);
  ok('personnalisation ouverte', await until(() => !!document.querySelector('.pf-custom'), 5000));
  await press(13); await press(13);                         // → Chapeau
  const row = () => page.evaluate(() => document.querySelector('.pf-crow.focused .val')?.textContent);
  const hat0 = await row();
  await press(14);                                          // ← previous hat (the next ones may be locked)
  const hat1 = await row();
  ok('changement de chapeau à la croix', hat0 !== hat1, `${hat0} → ${hat1}`);
  await shot('custom');
  await press(1);                                           // ○ back
  ok('retour au titre avec ○', await until(() => !document.querySelector('.pf-custom') && !!document.querySelector('.pf-title'), 5000));
  await press(12); await press(12); await press(12);        // back up to "Jouer"
  await press(0);
  ok('salon', await until(() => /[A-Z0-9]{5}/.test(document.querySelector('.pf-lobby .pf-code b')?.textContent || ''), 30000));
  await page.waitForTimeout(500);
  await press(0);                                           // "Jouer en solo" has the focus
  ok('partie lancée', await until(() => window.__pouf?.state === 'match', 8000));
  if (await until(() => !!document.querySelector('.pf-help'), 4000)) await press(0);
  await until(() => window.__pouf.match.t > 3.3, 20000);
  ok('indications de la manette dans le HUD', await page.evaluate(() => !!document.querySelector('.pf-key .gl.ps')));
  const s0 = await page.evaluate(() => window.__pouf.match.sim.st.s);
  await axis(1, -1); await page.waitForTimeout(700);        // stick up: aim forward
  await press(2);                                           // □ super puff (needs a third of the gas)
  await page.waitForTimeout(400);
  await set(0, true); await page.waitForTimeout(2500);      // hold ✕
  await set(0, false); await axis(1, 0);
  await page.waitForTimeout(500);
  const st = await page.evaluate(() => ({ s: window.__pouf.match.sim.st.s, sup: window.__pouf.match.riders.get(window.__pouf.me.id).supers }));
  ok('stick + ✕ font avancer la bouée', st.s - s0 > 6, `${s0.toFixed(1)} → ${st.s.toFixed(1)} m`);
  ok('□ déclenche le super pouf', st.sup >= 1);
  await shot('run');
  await press(12);                                          // ↑ emote
  await set(3, true); await page.waitForTimeout(1500); await set(3, false);   // hold △: respawn
  ok('△ maintenu : réapparition', await until(() => window.__pouf.match.sim.st.deaths === 1, 4000));
  await press(9);                                           // Options: pause
  ok('Options ouvre la pause', await until(() => !!document.querySelector('.pf-pause'), 4000));
  await press(1);                                           // ○ resumes
  ok('○ reprend la partie', await until(() => !document.querySelector('.pf-pause:not(.out)'), 4000));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.join(' | '));
await browser.close(); web.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
