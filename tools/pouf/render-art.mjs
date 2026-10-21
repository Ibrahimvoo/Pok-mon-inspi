// Renders the console visuals of Pouf Party with the game's own engine: node tools/pouf/render-art.mjs [--preview]
import { createServer } from 'vite';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const preview = process.argv.includes('--preview');
const out = preview ? join(root, 'tools', '.cache', 'pouf') : join(root, 'public', 'art');
const cache = join(root, 'tools', '.cache');
await mkdir(out, { recursive: true }); await mkdir(cache, { recursive: true });
const ID = 'pouf-party';
const SHOTS = {
  '': { s: 56, d: .6, yaw: .5, cam: [9.5, -4.2, 4.8], look: [7, .6, 1.2], w: 1920, h: 1080, fov: 48 },
  '-t': { s: 30, d: 0, yaw: 1.1, cam: [-5.4, 1.4, 3.4], look: [0, 0, 1.1], w: 640, h: 640, fov: 55, puff: [0, 2] },
  '-s1': { s: 286, d: 0, yaw: .2, cam: [11, 2.5, 6.2], look: [7, 0, 2], w: 1280, h: 720, t: 3.1, fov: 55 },
  '-s2': { s: 222, d: -1, yaw: .9, cam: [10, 3, 6], look: [8, 0, 1], w: 1280, h: 720, t: 2.2, fov: 55, puff: [0] },
};
const server = await createServer({ root, logLevel: 'error', server: { port: 0 } });
await server.listen();
const port = server.httpServer.address().port;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('pageerror', e => console.error('page:', e.message));
await page.goto(`http://localhost:${port}/tools/pouf/art.html`);
await page.waitForFunction(() => window.ready, null, { timeout: 120000 });
const post = [];
for (const [suffix, job] of Object.entries(SHOTS)) {
  const url = await page.evaluate(j => window.render(j), job);
  const src = join(cache, `${ID}${suffix}.png`);
  await writeFile(src, Buffer.from(url.split(',')[1], 'base64'));
  post.push({ src, dst: join(out, `${ID}${suffix}.webp`), bloom: .25, q: suffix === '' ? 86 : 84 });
  console.log(ID + suffix);
}
const durl = await page.evaluate(j => window.render({ ...j, w: 480, h: 270, depth: true }), SHOTS['']);
const dsrc = join(cache, `${ID}-d.png`);
await writeFile(dsrc, Buffer.from(durl.split(',')[1], 'base64'));
post.push({ src: dsrc, dst: join(out, `${ID}-d.webp`), depth: true });
const py = spawnSync('python3', [join(root, 'tools', 'post.py')], { input: JSON.stringify(post), stdio: ['pipe', 'inherit', 'inherit'] });
await browser.close(); await server.close();
process.exit(py.status || 0);
