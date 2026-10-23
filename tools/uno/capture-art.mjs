// Renders the console visuals of UNO (hero, square tile, depth map, two screenshots) from the real game running on
// the built console: npm run build && node tools/uno/capture-art.mjs
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
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const tmp = await mkdtemp(join(tmpdir(), 'uno-art-'));
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
const webp = (src, dst, w, h, crop = null) => execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(src)}).convert('RGB')
c = ${crop ? JSON.stringify(crop) : 'None'}
if c: im = im.crop(tuple(c))
im.resize((${w}, ${h}), Image.LANCZOS).save(${JSON.stringify(dst)}, 'WEBP', quality=82, method=6)`]);
// focus the UNO tile of the home screen and launch it
async function launchUno(page) {
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'UNO'), t.findIndex(e => e.classList.contains('focused'))]; });
  if (idx < 0) throw new Error('UNO tile not found on the home screen');
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120); }
  await page.keyboard.press('Enter');
}
const clean = () => page.evaluate(() => document.querySelectorAll('#hints, #toasts, #party-hud, .ut-foot').forEach(e => { e.style.visibility = 'hidden'; }));

await page.goto(`http://localhost:${web.address().port}/`);
await page.keyboard.press('Enter');
await page.waitForSelector('.account .acc-form', { timeout: 15000 });
await page.fill('.f-input >> nth=0', 'Joueur');
await page.click('.acc-submit');
await page.waitForSelector('.home .tile', { timeout: 15000 });
await page.waitForTimeout(600);
await launchUno(page);
await page.waitForSelector('.uno-title', { timeout: 15000 });
await page.waitForTimeout(5000);
await clean();
await page.evaluate(() => document.querySelector('.ut-tile.focused')?.classList.remove('focused'));
await page.waitForTimeout(400);
await page.screenshot({ path: join(tmp, 'hero.png') });
await page.click('.ut-tile.red');
await page.waitForSelector('.uno-lobby');
await page.waitForTimeout(5000);
await clean();
await page.screenshot({ path: join(tmp, 's2.png') });
await page.click('text=Commencer la partie');
await page.waitForSelector('.ut-hand .hc', { timeout: 20000 });
await page.waitForTimeout(7000);
await clean();
await page.screenshot({ path: join(tmp, 's1.png') });
webp(join(tmp, 'hero.png'), join(out, 'uno.webp'), 1920, 1080);
webp(join(tmp, 'hero.png'), join(out, 'uno-t.webp'), 640, 640, [480, 0, 1440, 960]);
webp(join(tmp, 's1.png'), join(out, 'uno-s1.webp'), 1280, 720);
webp(join(tmp, 's2.png'), join(out, 'uno-s2.webp'), 1280, 720);
// depth: the table comes towards the viewer, the edges stay far
execFileSync('python3', ['-c', `
from PIL import Image
im = Image.new('L', (480, 270))
px = im.load()
for y in range(270):
    for x in range(480):
        d = ((x - 240) / 240) ** 2 + ((y - 150) / 150) ** 2
        px[x, y] = int(max(30, 200 - d * 140))
im.convert('RGB').save(${JSON.stringify(join(out, 'uno-d.webp'))}, 'WEBP', quality=80)`]);
await browser.close(); web.close();
console.log('UNO art written to public/art');
