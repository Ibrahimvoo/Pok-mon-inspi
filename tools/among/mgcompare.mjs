// Renders one task screen over a frame of the reference footage (same 1280×720 screen) and saves it next to the
// untouched frame, to check the reproduction side by side.
// Usage: node tools/among/mgcompare.mjs <game> <frame.png> <out.png> [script.js run in the page after mounting]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const [game, frame, out, script] = process.argv.slice(2);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.json': 'application/json', '.webp': 'image/webp' };
const page = `<!doctype html><html><head><link rel="stylesheet" href="/src/among/among.css"></head>
<body style="margin:0;width:1280px;height:720px;background:url(/__frame) 0 0/1280px 720px">
<div class="au-app au-play" style="position:absolute;inset:0"><div class="au-panelwrap"><div class="au-panel" id="box"></div></div></div>
<script type=module>
import * as T from '/src/among/tasks/polus.js';
window.log = []; window.done = false;
const api = { done: () => { window.done = true; }, close: () => { window.closed = true; }, sfx: n => window.log.push(n), step: { console: 'weapons_upload' }, roomName: () => 'Weapons', me: { name: 'Test', color: 'white' }, fix: m => window.log.push(m) };
T[${JSON.stringify(game)}](document.getElementById('box'), api);
window.ready = true;
</script></body></html>`;
const srv = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try {
    const d = p === '/' ? Buffer.from(page) : p === '/__frame' ? await readFile(resolve(frame)) : await readFile(join(root, p));
    res.writeHead(200, { 'content-type': p === '/' ? 'text/html' : p === '/__frame' ? 'image/png' : types[extname(p)] || 'application/octet-stream' }); res.end(d);
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const browser = await chromium.launch();
const pg = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
pg.on('pageerror', e => console.log('PAGE ERROR', e.message));
pg.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()); });
await pg.goto(`http://localhost:${srv.address().port}/`);
await pg.waitForFunction(() => window.ready);
await pg.waitForTimeout(400);
if (script) { const fn = await readFile(resolve(script), 'utf8'); await eval(`(async () => { ${fn} })()`); }
await pg.screenshot({ path: out });
console.log('done:', await pg.evaluate(() => window.done), 'log:', JSON.stringify(await pg.evaluate(() => window.log)).slice(0, 200));
await browser.close(); srv.close();
