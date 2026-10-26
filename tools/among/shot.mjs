// Renders a scratch HTML page that imports project modules (served from the repository root) and saves a PNG.
// Usage: node tools/among/shot.mjs page.html out.png [width height]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const [page, out, w = 1200, h = 800] = process.argv.slice(2);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json' };
const srv = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  const f = p === '/__page' ? resolve(page) : p.startsWith('/__abs/') ? p.slice(6) : join(root, p);
  try { let d; try { d = await readFile(f); } catch { d = await readFile(join(root, 'public', p)); } res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const pg = await (await browser.newContext({ viewport: { width: +w, height: +h } })).newPage();
pg.on('pageerror', e => console.log('PAGE ERROR', e.message));
pg.on('console', m => { if (m.type() === 'error' || m.type() === 'log') console.log('console:', m.text()); });
await pg.goto(`http://localhost:${srv.address().port}/__page`);
await pg.waitForTimeout(+process.env.WAIT || 800);
await pg.screenshot({ path: out });
await browser.close(); srv.close();
