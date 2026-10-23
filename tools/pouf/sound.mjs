// Sound check: every effect of Pouf Party is audible and does not clip (peak level of the game's output).
// Usage: npm run build && node tools/pouf/sound.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
const results = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
await page.goto(`http://localhost:${web.address().port}/?pfdebug&pflow&peerhost=127.0.0.1:9`);
await page.keyboard.press('Enter'); await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Oreille'); await page.click('.acc-submit');
await page.waitForSelector('.home .tile'); await page.waitForTimeout(300); await page.click('.home .tile.sel');   // Pouf Party is selected on arrival
await page.waitForFunction(() => !!document.querySelector('.pf-title .pf-btn'), null, { timeout: 40000 });
await page.waitForTimeout(1500);
const music = await page.evaluate(() => window.__pouf.sound.peak(1500));
ok('aucune musique, seulement des bruitages', music < .01, music.toFixed(3));
await page.waitForTimeout(800);
for (const fx of ['puff', 'bigPuff', 'splash', 'pop', 'hit', 'checkpoint', 'fanfare', 'beep', 'slam', 'emote']) {
  const p = await page.evaluate(async fx => { const s = window.__pouf.sound; const m = s.peak(700); s[fx](fx === 'emote' ? 'laugh' : undefined); return m; }, fx);
  ok(`effet « ${fx} » audible sans saturer`, p > .01 && p < .99, p.toFixed(3));
}
ok('aucune erreur JavaScript', !errors.length, errors.join(' | '));
await browser.close(); web.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
