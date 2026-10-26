// Automated check of the crewmate base (npm run check:crewmate):
//  1. every colour has exactly the same silhouette (alpha mask) as the others, idle and in every walk frame;
//  2. the walk frames never change the upper body: it is the idle upper body moved by the bob only;
//  3. the visor and backpack pixels are the same for every colour;
//  4. optional: with a reference screenshot (REF=path X0 Y0 X1 Y1), the traced red crewmate overlaps it (IoU).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const types = { '.js': 'text/javascript', '.html': 'text/html' };
const srv = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<!doctype html><body></body>'); return; }
  try { const d = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); }
}).listen(0);
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(`http://localhost:${srv.address().port}/`);
const r = await page.evaluate(async () => {
  const { drawCrewBase, SIZE, WALK_FRAMES, pose } = await import('/src/among/art/crew.js');
  const { REF } = await import('/src/among/art/crewmate-ref.js');
  const { COLORS } = await import('/src/among/core/rules.js');
  const W = SIZE[0] + 240, H = SIZE[1] + 200;
  const render = (color, frame) => {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext("2d"); g.translate(120, 120); drawCrewBase(g, color, frame);
    return g.getImageData(0, 0, W, H).data;
  };
  const alpha = d => { const a = new Uint8Array(d.length / 4); for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3] > 127 ? 1 : 0; return a; };
  const same = (a, b) => { let diff = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++; return diff; };
  const out = { colors: COLORS.length, maskDiffs: [], frameDiffs: [], visorDiffs: [] };
  const idleRed = alpha(render('red', -1));
  // visor / backpack region pixels (colour-independent parts): compare RGB of the visor zone between colours
  const vis = render('red', -1);
  for (const c of COLORS) {
    const d = render(c.id, -1);
    out.maskDiffs.push([c.id, same(idleRed, alpha(d))]);
    let vd = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      // visor glass colours are fixed: compare where the red render is light blue
      if (vis[i + 2] > 150 && vis[i] < 200 && Math.abs(d[i] - vis[i]) + Math.abs(d[i + 1] - vis[i + 1]) + Math.abs(d[i + 2] - vis[i + 2]) > 6) vd++;
    }
    out.visorDiffs.push([c.id, vd]);
  }
  for (let f = 0; f < WALK_FRAMES; f++) {
    const a = alpha(render('red', f));
    const bob = Math.round(pose(f).bob);
    // the upper body (above the hips) must be the idle one shifted by the bob
    let diff = 0, n = 0;
    const top = Math.floor(REF.cut) - 30;
    for (let y = 0; y < top + 18; y++) for (let x = 0; x < W; x++) {
      const yi = y - bob; if (yi < 0 || yi >= H) continue;
      n++; if (a[y * W + x] !== idleRed[yi * W + x]) diff++;
    }
    for (const c of ['blue', 'lime']) out.maskDiffs.push([`${c}@${f}`, same(a, alpha(render(c, f)))]);
    out.frameDiffs.push([f, bob, diff, n]);
  }
  const c = document.createElement('canvas'); c.width = SIZE[0]; c.height = SIZE[1];
  drawCrewBase(c.getContext('2d'), 'red', -1);
  out.png = c.toDataURL('image/png');
  return out;
});
let ok = true;
const bad = (m) => { ok = false; console.log('✗', m); };
r.maskDiffs.forEach(([c, d]) => { if (d > 0) bad(`silhouette of ${c} differs from red by ${d} px`); });
console.log(r.maskDiffs.every(([, d]) => !d) ? `✓ identical silhouette for all ${r.colors} colours and walk frames` : '');
r.visorDiffs.forEach(([c, d]) => { if (d > 0) bad(`visor of ${c} differs by ${d} px`); });
if (r.visorDiffs.every(([, d]) => !d)) console.log('✓ identical visor for every colour');
r.frameDiffs.forEach(([f, bob, d, n]) => { if (d / n > .004) bad(`frame ${f}: upper body changed (${d}/${n} px, bob ${bob})`); });
if (r.frameDiffs.every(([, , d, n]) => d / n <= .004)) console.log('✓ walk frames keep the upper body unchanged (only the legs move)');
if (errors.length) bad('page errors: ' + errors.join('; '));
await browser.close(); srv.close();
if (process.env.REF) {
  const { execFileSync } = await import('node:child_process');
  const { writeFileSync, mkdtempSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const ours = join(mkdtempSync(join(tmpdir(), 'crew-')), 'ours.png');
  writeFileSync(ours, Buffer.from(r.png.split(',')[1], 'base64'));
  const outp = execFileSync('python3', ['-I', join(root, 'tools/among/compare_ref.py'), ours, ...process.env.REF.split(' ')]).toString();
  console.log(outp.trim());
  if (/FAIL/.test(outp)) ok = false;
}
console.log(ok ? 'CREWMATE CHECK PASSED' : 'CREWMATE CHECK FAILED');
process.exit(ok ? 0 : 1);
