// Renders the profile portraits (banner + thumbnail) from tools/art/shader.glsl. These scenes were the covers of the
// former catalogue; they are now only avatars, so no depth map or screenshot is produced (Pouf Party: npm run art:pouf).
// Usage: node tools/render-art.mjs [gameId ...] [--preview]
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { ART } from './art/scenes.mjs';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, '..', 'public', 'art');
const args = process.argv.slice(2);
const preview = args.includes('--preview');
const only = args.filter(a => !a.startsWith('--'));

const server = createServer(async (req, res) => {
  try {
    const f = join(root, 'art', decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'kit.html');
    res.writeHead(200, { 'content-type': extname(f) === '.html' ? 'text/html' : 'text/plain' });
    res.end(await readFile(f));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('console', m => console.log('[page]', m.text()));
await page.goto(`http://localhost:${port}/kit.html`);
await page.evaluate(() => window.ready);
await mkdir(out, { recursive: true });

const cache = join(root, '.cache');
await mkdir(cache, { recursive: true });
const post = [];
const save = async (name, job, opts = {}) => {
  const t = Date.now();
  const url = await page.evaluate(j => window.render(j), job);
  const src = join(cache, name.replace('.webp', '.png'));
  await writeFile(src, Buffer.from(url.split(',')[1], 'base64'));
  post.push({ src, dst: join(out, name), ...opts });
  console.log(name, ((Date.now() - t) / 1000).toFixed(1) + 's');
};

if (process.env.VARIANTS) { // quick art-direction tests: [{ base, name, u }]
  for (const v of Function(`return ${process.env.VARIANTS}`)()) {
    const a = ART.find(x => x.id === v.base);
    await save(`${v.name}.webp`, { scene: a.scene, w: 480, h: 270, u: { ...a.u, ...v.u } }, { bloom: a.bloom ?? 0.7 });
  }
  ART.length = 0;
}
for (const a of ART) {
  if (only.length && !only.includes(a.id)) continue;
  const W = preview ? 640 : 1920, H = preview ? 360 : 1080;
  const bloom = a.bloom ?? 0.7;
  await save(`${a.id}.webp`, { scene: a.scene, w: W, h: H, u: a.u }, { bloom });
  if (preview) continue;
}
const py = spawnSync('python3', [join(root, 'post.py')], { input: JSON.stringify(post), stdio: ['pipe', 'inherit', 'inherit'] });
if (py.status) process.exit(py.status);
await browser.close();
server.close();
