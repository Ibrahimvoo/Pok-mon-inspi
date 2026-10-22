// Renders the console visuals of Mimic Party (hero, square tile, depth map, two screenshots) from the real game
// running on the built console: npm run build && node tools/mimic/capture-art.mjs
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
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dist = join(root, 'dist'), out = join(root, 'public', 'art');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.json': 'application/json' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const tmp = await mkdtemp(join(tmpdir(), 'mimic-art-'));
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, permissions: ['microphone'] });
const page = await ctx.newPage();
const webp = (src, dst, w, h, crop = null) => execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(src)}).convert('RGB')
c = ${crop ? JSON.stringify(crop) : 'None'}
if c: im = im.crop(tuple(c))
im.resize((${w}, ${h}), Image.LANCZOS).save(${JSON.stringify(dst)}, 'WEBP', quality=82, method=6)`]);
const ui = on => page.evaluate(v => {
  document.querySelectorAll('.mmp-ui, .mmp-labels, #hints, #party-hud, #toasts').forEach(e => { e.style.visibility = v ? '' : 'hidden'; });
  const d = document.querySelector('.mmp-dim'); if (d) d.style.opacity = v ? '' : '0';
}, on);
const until = async (fn, ms = 60000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await page.evaluate(fn)) return true; await page.waitForTimeout(250); } throw new Error('timeout ' + fn); };

await page.goto(`http://localhost:${web.address().port}/`);
await page.keyboard.press('Enter');
await page.waitForSelector('.account .acc-form', { timeout: 15000 });
await page.fill('.f-input >> nth=0', 'Mimi');
await page.click('.acc-submit');
await page.waitForSelector('.home .tile', { timeout: 15000 });
await page.keyboard.press('Enter');
await until(() => !!document.querySelector('.mmp-scene.mmp-home:not(.out)'));
await page.waitForTimeout(9000);
await page.evaluate(() => { const h = document.getElementById('hints'); if (h) h.style.visibility = 'hidden'; });
await page.screenshot({ path: join(tmp, 's1.png') });
// lobby → match with three players on this console
await page.click('.mmp-home >> text=CRÉER UNE PARTIE');
await until(() => /QUEL MODE/.test(document.querySelector('.mmp-modal')?.innerText || ''));
await page.keyboard.press('Enter');
await until(() => !!document.querySelector('.mmp-scene.mmp-lobby:not(.out)'));
for (let i = 0; i < 3; i++) { await page.click('text=+ JOUEUR SUR CETTE CONSOLE'); await page.waitForTimeout(300); }
await page.keyboard.press('o');
await until(() => /BESOIN DE TON MICRO/.test(document.querySelector('.mmp-modal')?.innerText || ''));
await page.keyboard.press('Enter');
await until(() => /ANNOUNCE/.test(document.querySelector('.mmp-roundbox')?.innerText || ''));
await page.waitForTimeout(1200);
await ui(false);
await page.waitForTimeout(6000);
await page.screenshot({ path: join(tmp, 'hero.png') });
await ui(true);
await page.evaluate(() => { const h = document.getElementById('hints'); if (h) h.style.visibility = 'hidden'; });
await until(() => !!document.querySelector('.mmp-scene:not(.out) .mmp-turn'));
await page.waitForTimeout(5000);
await page.screenshot({ path: join(tmp, 's2.png') });
webp(join(tmp, 'hero.png'), join(out, 'mimic-party.webp'), 1920, 1080);
webp(join(tmp, 'hero.png'), join(out, 'mimic-party-t.webp'), 640, 640, [480, 0, 1440, 960]);
webp(join(tmp, 's1.png'), join(out, 'mimic-party-s1.webp'), 1280, 720);
webp(join(tmp, 's2.png'), join(out, 'mimic-party-s2.webp'), 1280, 720);
// depth: the floor comes towards the viewer, the back wall stays far
execFileSync('python3', ['-c', `
from PIL import Image
im = Image.new('L', (480, 270))
px = im.load()
for y in range(270):
    v = 40 if y < 150 else int(40 + (y - 150) / 120 * 200)
    for x in range(480): px[x, y] = v
im.convert('RGB').save(${JSON.stringify(join(out, 'mimic-party-d.webp'))}, 'WEBP', quality=80)`]);
console.log('art written');
await browser.close(); web.close();
