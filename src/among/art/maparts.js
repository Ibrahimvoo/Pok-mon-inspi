// Pre-rendered map art (floors in the colours sampled from the reference maps, walls with their front faces,
// furniture, vents). The lobby uses the dropship reference image itself.
import { getMap } from '../core/room.js';
import { RES, shapeBox } from '../core/grid.js';
import { FLOORS } from './floors.js';

export const PPU = 48;                 // art pixels per world unit
const TILE = 1024;
const HULL = { skeld: '#3b4345', polus: '#2f2c3a' };
const WALL = { skeld: ['#8ea0aa', '#6c7d86'], polus: ['#6f6a86', '#55506b'] };
const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v * k)))); return `rgb(${c.join(',')})`; };
const cache = new Map();
const imgCache = new Map();
export function mapImage(name) {
  if (!imgCache.has(name)) { const i = new Image(); i.decoding = 'async'; i.src = `among/maps/${name}.webp`; imgCache.set(name, i); }
  return imgCache.get(name);
}

function pathShape(g, s, k) {
  g.beginPath();
  if (s.r) { const [a, b, c, d] = s.r.map(v => v / k); g.rect(a, b, c - a, d - b); }
  else if (s.c) { const [x, y, r] = s.c.map(v => v / k); g.arc(x, y, r, 0, Math.PI * 2); }
  else { s.p.forEach(([x, y], i) => (i ? g.lineTo(x / k, y / k) : g.moveTo(x / k, y / k))); g.closePath(); }
}

// furniture drawn in world units
const PROPS = {
  table(g, p, k) {
    const x = p.x / k, y = p.y / k, r = p.r / k;
    g.fillStyle = '#2a3c63'; g.beginPath(); g.ellipse(x, y + .15, r * 1.05, r * .92, 0, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + .3; g.fillStyle = '#3a5aa0'; g.beginPath(); g.ellipse(x + Math.cos(a) * r * .95, y + Math.sin(a) * r * .85 + .1, r * .32, r * .22, a, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = '#4a73c2'; g.beginPath(); g.ellipse(x, y, r * .78, r * .66, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#1d2b48'; g.lineWidth = .06; g.stroke();
    if (p.button) { g.fillStyle = '#3c3f46'; g.fillRect(x - .32, y - .3, .64, .5); g.fillStyle = '#c8202a'; g.beginPath(); g.ellipse(x, y - .08, .18, .12, 0, 0, Math.PI * 2); g.fill(); }
    else { g.fillStyle = '#e8e2c6'; g.fillRect(x - .2, y - .15, .3, .2); }
  },
  bed(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#d9e2ea'; g.fillRect(x - .65, y - 1.1, 1.3, 2.2); g.fillStyle = '#4f8fd6'; g.fillRect(x - .65, y - .2, 1.3, 1.3); g.fillStyle = '#ffffff'; g.fillRect(x - .5, y - 1, 1, .5); },
  scanner(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#5aa47c'; g.beginPath(); g.ellipse(x, y, .9, .55, 0, 0, Math.PI * 2); g.fill(); g.strokeStyle = '#c9f7d9'; g.lineWidth = .08; g.beginPath(); g.ellipse(x, y, .6, .35, 0, 0, Math.PI * 2); g.stroke(); },
  engine(g, p, k) {
    const x = p.x / k, y = p.y / k;
    g.fillStyle = '#7a3a34'; g.fillRect(x - 2, y - 1.5, 4.1, 3); g.fillStyle = '#a14d43'; g.fillRect(x - 1.8, y - 1.25, 3.4, 2.4);
    g.fillStyle = '#d7c39a'; for (let i = 0; i < 6; i++) g.fillRect(x - 1.2 + i * .35, y - .8, .18, 1.5);
    g.fillStyle = '#9fe6ff'; g.beginPath(); g.arc(x + 1.65, y, .9, -Math.PI / 2, Math.PI / 2); g.fill();
  },
  reactor(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#c9f0ff'; for (let i = 0; i < 3; i++) g.fillRect(x - .7 + i * .55, y - 2.2, .35, 4.4); g.fillStyle = 'rgba(120,220,255,.35)'; g.fillRect(x - .9, y - 2.3, 1.9, 4.6); },
  desk(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#6b5a4a'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#8c7762'; g.fillRect(a + .08, b + .08, c - a - .16, (d - b) * .6); },
  monitors(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#2b3036'; g.fillRect(x - 1, y - .9, 2, .7); g.fillStyle = '#7fd6c0'; for (let i = 0; i < 3; i++) g.fillRect(x - .9 + i * .64, y - .82, .5, .5); },
  adminTable(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#3f4a4c'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#7fe0a5'; g.fillRect(a + .25, b + .2, c - a - .5, d - b - .4); g.strokeStyle = '#2a8f5a'; g.lineWidth = .05; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(a + .25 + (c - a - .5) * i / 6, b + .2); g.lineTo(a + .25 + (c - a - .5) * i / 6, d - .2); g.stroke(); } },
  crates(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); const n = Math.max(2, Math.round((c - a) / 1.1)); for (let i = 0; i < n; i++) for (let j = 0; j < Math.max(1, Math.round((d - b) / 1.1)); j++) { const x = a + (c - a) * i / n, y = b + j * 1.1; g.fillStyle = '#4d6b56'; g.fillRect(x + .05, y + .05, (c - a) / n - .1, 1); g.fillStyle = '#6a8f76'; g.fillRect(x + .12, y + .12, (c - a) / n - .24, .45); } },
  crate(g, p, k) { PROPS.crates(g, p, k); },
  cannon(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#5a2d3a'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#8e4458'; g.fillRect(a + .15, b + .15, c - a - .3, d - b - .3); },
  seat(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#37415a'; g.beginPath(); g.ellipse((a + c) / 2, (b + d) / 2, (c - a) / 2, (d - b) / 2, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#c42b3b'; g.beginPath(); g.arc((a + c) / 2, (b + d) / 2, .35, 0, Math.PI * 2); g.fill(); },
  plants(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#3f5a48'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#69b26c'; for (let x = a + .3; x < c; x += .7) { g.beginPath(); g.arc(x, b + .4, .3, 0, Math.PI * 2); g.fill(); } },
  helm(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#2d3442'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#5cc7ff'; g.fillRect(a + .1, b + .2, c - a - .2, d - b - .4); },
  wires(g, p, k) { const x = p.x / k, y = p.y / k; g.strokeStyle = '#2b2b2b'; g.lineWidth = .08; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(x - 2 + i * .3, y - .4); g.bezierCurveTo(x - 1.5 + i * .2, y + 1, x - 1 + i * .5, y + 2, x - .2 + i * .3, y + 3); g.stroke(); } },
  shield(g, p, k) { const x = p.x / k, y = p.y / k; g.strokeStyle = 'rgba(160,140,90,.6)'; g.lineWidth = .1; g.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; g.lineTo(x + Math.cos(a) * 1.4, y + Math.sin(a) * 1.1); } g.closePath(); g.stroke(); },
  transformer(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#43444f'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#9a9cad'; g.fillRect(a + .15, b + .1, c - a - .3, (d - b) * .45); g.fillStyle = '#e0a23a'; g.fillRect(a + .2, b + (d - b) * .62, c - a - .4, .12); },
  officeTable(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#5a3f2a'; g.beginPath(); g.ellipse((a + c) / 2, (b + d) / 2 + .1, (c - a) / 2, (d - b) / 2 + .1, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#8a6440'; g.beginPath(); g.ellipse((a + c) / 2, (b + d) / 2, (c - a) / 2 - .15, (d - b) / 2 - .05, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#3c3f46'; g.fillRect((a + c) / 2 - .35, (b + d) / 2 - .3, .7, .5); g.fillStyle = '#c8202a'; g.beginPath(); g.ellipse((a + c) / 2, (b + d) / 2 - .08, .18, .12, 0, 0, Math.PI * 2); g.fill(); },
  specimenTable(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#3d4250'; g.fillRect(a, b, c - a, d - b); const cols = ['#7ee07a', '#7ee07a', '#8ad8ff', '#c48cff', '#c48cff']; cols.forEach((col, i) => { g.fillStyle = col; g.fillRect(a + .3 + i * (c - a - .6) / 5, b - 1, .45, 1.2); }); },
  labTable(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); g.fillStyle = '#5b6a80'; g.fillRect(a, b, c - a, d - b); g.fillStyle = '#d8e0ea'; g.fillRect(a + .1, b + .1, c - a - .2, d - b - .3); },
  seats(g, p, k) { const [a, b, c, d] = p.r.map(v => v / k); for (let x = a; x < c - .4; x += .55) { g.fillStyle = '#3b5f8c'; g.fillRect(x, b, .45, d - b); } },
  tree(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#6b4a2e'; g.fillRect(x - .3, y - .3, .6, 1.4); g.fillStyle = '#4c8a3e'; g.beginPath(); g.arc(x, y - .6, 1.2, 0, Math.PI * 2); g.fill(); },
  lava(g, p, k) { g.save(); pathShape(g, { p: p.p }, k); const [a, b, c, d] = shapeBox({ p: p.p }, k); const gr = g.createLinearGradient(a, b, c, d); gr.addColorStop(0, '#ffde59'); gr.addColorStop(.45, '#ff8a1e'); gr.addColorStop(1, '#d9361a'); g.fillStyle = gr; g.fill(); g.restore(); },
  dish(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#8a8f99'; g.fillRect(x - .08, y - 1.6, .16, 1.6); g.fillStyle = '#cfd4dc'; g.beginPath(); g.ellipse(x, y - 1.7, .55, .35, -.4, 0, Math.PI * 2); g.fill(); },
  telescope(g, p, k) { const x = p.x / k, y = p.y / k; g.fillStyle = '#e8ecf0'; g.save(); g.translate(x, y); g.rotate(-.6); g.fillRect(-.2, -1, .4, 1.6); g.restore(); },
  laptopCrate() {}, hatChest() {},
};

function runs(M, pred) {
  // horizontal runs of cells satisfying pred(n): [j, i0, i1]
  const out = [];
  for (let j = 0; j < M.h; j++) { let s = -1; for (let i = 0; i <= M.w; i++) { const ok = i < M.w && pred(j * M.w + i, i, j); if (ok && s < 0) s = i; if (!ok && s >= 0) { out.push([j, s, i]); s = -1; } } }
  return out;
}

export function mapArt(id) {
  if (cache.has(id)) return cache.get(id);
  const M = getMap(id);
  // the maps ARE the reference images (public/among/maps): the collision grid was traced on them, so they line up.
  // A higher-resolution image with the same framing can replace them: `ref` is the width of the original image.
  const name = id === 'lobby' ? 'dropship' : id;
  const image = mapImage(name);
  const ref = { skeld: 1170, polus: 1170, dropship: 1170 }[name];
  const art = { image, M, k: M.k * (image.naturalWidth || ref) / ref, lobby: id === 'lobby' };
  cache.set(id, art);
  return art;
}
// world → image: x_img = x_world * art.k ; draw the image at world (0,0) with size (naturalWidth / k)
export function drawMapImage(g, art) {
  const img = art.image;
  if (!img.complete || !img.naturalWidth) return;
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(img, 0, 0, img.naturalWidth / art.k, img.naturalHeight / art.k);
}
// (previous vector reconstruction, kept only for the minimap of the HUD)
export function vectorMapArt(id) {
  const M = getMap(id);
  const W = Math.ceil(M.w / RES * PPU), H = Math.ceil(M.h / RES * PPU);
  const big = document.createElement('canvas'); big.width = W; big.height = H;
  const g = big.getContext('2d');
  g.scale(PPU, PPU); g.translate(-M.ox, -M.oy);
  const cs = 1 / RES, k = M.k, floors = FLOORS[id] || {};
  const floorColor = room => floors[room] || floors._corridor || '#7d8f96';
  // hull: everything near a floor (the walls); beyond it, space (Skeld) or the cliffs (Polus)
  if (id === 'polus') { g.fillStyle = '#2b2436'; g.fillRect(M.ox, M.oy, M.w * cs, M.h * cs); }
  const dist = new Float32Array(M.w * M.h);
  for (let n = 0; n < dist.length; n++) dist[n] = M.floor[n] ? 0 : 1e6;
  for (let pass = 0; pass < 2; pass++) {
    const fwd = pass === 0;
    for (let jj = 0; jj < M.h; jj++) {
      const j = fwd ? jj : M.h - 1 - jj;
      for (let ii = 0; ii < M.w; ii++) {
        const i = fwd ? ii : M.w - 1 - ii, n = j * M.w + i;
        let d = dist[n]; if (!d) continue;
        const di = fwd ? -1 : 1, dj = fwd ? -1 : 1;
        if (i + di >= 0 && i + di < M.w) d = Math.min(d, dist[n + di] + 1);
        if (j + dj >= 0 && j + dj < M.h) { d = Math.min(d, dist[n + dj * M.w] + 1); if (i + di >= 0 && i + di < M.w) d = Math.min(d, dist[n + dj * M.w + di] + 1.414); if (i - di >= 0 && i - di < M.w) d = Math.min(d, dist[n + dj * M.w - di] + 1.414); }
        dist[n] = d;
      }
    }
  }
  const R = (id === "polus" ? 1.2 : 4) * RES;
  g.fillStyle = HULL[id];
  for (const [j, i0, i1] of runs(M, n => dist[n] <= R)) g.fillRect(M.ox + i0 * cs, M.oy + j * cs, (i1 - i0) * cs + .01, cs + .01);
  // front faces of the walls above every floor edge
  const FACE = Math.round(1.05 * RES);
  for (let i = 0; i < M.w; i++) for (let j = 1; j < M.h; j++) {
    const n = j * M.w + i;
    if (!M.floor[n] || M.floor[n - M.w]) continue;
    const x = M.ox + i * cs, yb = M.oy + j * cs;
    // outdoors on Polus the edge is a rocky cliff, elsewhere a wall panel
    const [wa, wb] = id === 'polus' && !M.room[n] && !M.floor[n - M.w] && isCliff(M, i, j) ? ['#4a3d5e', '#33293f'] : WALL[id];
    const gr = g.createLinearGradient(0, yb - FACE * cs, 0, yb);
    gr.addColorStop(0, wb); gr.addColorStop(.25, wa); gr.addColorStop(1, wb);
    g.fillStyle = gr; g.fillRect(x, yb - FACE * cs, cs + .01, FACE * cs);
  }
  // floors (crisp polygons) in their room colour
  for (const [op, s, o = {}] of M.def.ops) {
    if (op === 'add') { pathShape(g, s, k); g.fillStyle = floorColor(o.room || '_corridor'); g.fill(); }
    else if (op === 'sub' && !o.see) { pathShape(g, s, k); g.fillStyle = HULL[id]; g.fill(); }
  }
  // tile lines: a light grid clipped to the floor
  g.save();
  g.beginPath();
  for (const [op, s] of M.def.ops) if (op === 'add') pathShapeAdd(g, s, k);
  g.clip();
  g.strokeStyle = 'rgba(0,0,0,.10)'; g.lineWidth = .035;
  for (let x = Math.floor(M.ox); x < M.ox + M.w * cs; x += .9) { g.beginPath(); g.moveTo(x, M.oy); g.lineTo(x, M.oy + M.h * cs); g.stroke(); }
  for (let y = Math.floor(M.oy); y < M.oy + M.h * cs; y += .9) { g.beginPath(); g.moveTo(M.ox, y); g.lineTo(M.ox + M.w * cs, y); g.stroke(); }
  g.restore();
  // Polus: snow patches where the reference map has snow
  if (id === 'polus') drawSnow(g, M);
  // dark line along the bottom of every wall face
  g.fillStyle = 'rgba(10,14,18,.55)';
  for (let i = 0; i < M.w; i++) for (let j = 1; j < M.h; j++) { const n = j * M.w + i; if (M.floor[n] && !M.floor[n - M.w]) g.fillRect(M.ox + i * cs, M.oy + j * cs, cs + .01, .07); }
  // furniture
  for (const p of M.props) PROPS[p.t]?.(g, p, k);
  // vents (closed grates)
  for (const v of M.vents) drawVent(g, v.x, v.y, 0);
  // cut into tiles
  const tiles = [];
  for (let ty = 0; ty < H; ty += TILE) for (let tx = 0; tx < W; tx += TILE) {
    const c = document.createElement('canvas'); c.width = Math.min(TILE, W - tx); c.height = Math.min(TILE, H - ty);
    c.getContext('2d').drawImage(big, -tx, -ty);
    tiles.push({ c, x: M.ox + tx / PPU, y: M.oy + ty / PPU, w: c.width / PPU, h: c.height / PPU });
  }
  big.width = big.height = 0;
  return { tiles, M };
}
// an outdoor edge with no building wall above it
function isCliff(M, i, j) { for (let d = 1; d < 12 && j - d >= 0; d++) { const n = (j - d) * M.w + i; if (M.floor[n]) return false; } return true; }
function pathShapeAdd(g, s, k) {
  if (s.r) { const [a, b, c, d] = s.r.map(v => v / k); g.rect(a, b, c - a, d - b); }
  else if (s.c) { const [x, y, r] = s.c.map(v => v / k); g.moveTo(x + r, y); g.arc(x, y, r, 0, Math.PI * 2); }
  else { s.p.forEach(([x, y], i) => (i ? g.lineTo(x / k, y / k) : g.moveTo(x / k, y / k))); g.closePath(); }
}
function drawSnow(g, M) {
  const img = mapImage('polus');
  if (!img.complete || !img.naturalWidth) return;
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const cg = c.getContext('2d'); cg.drawImage(img, 0, 0);
  const d = cg.getImageData(0, 0, c.width, c.height).data;
  const k = M.k;
  g.fillStyle = 'rgba(232,238,248,.9)';
  for (let j = 0; j < M.h; j += 2) for (let i = 0; i < M.w; i += 2) {
    const n = j * M.w + i;
    if (!M.floor[n] || M.room[n]) continue;
    const x = M.ox + (i + 1) / RES, y = M.oy + (j + 1) / RES;
    const px = Math.round(x * k), py = Math.round(y * k);
    if (px < 0 || py < 0 || px >= c.width || py >= c.height) continue;
    const o = (py * c.width + px) * 4;
    if (d[o] > 200 && d[o + 1] > 205 && d[o + 2] > 215) { g.beginPath(); g.arc(x, y, .2, 0, Math.PI * 2); g.fill(); }
  }
}
export function drawVent(g, x, y, open) {
  g.save(); g.translate(x, y);
  g.fillStyle = '#2a2f33'; g.fillRect(-.42, -.24, .84, .48);
  g.fillStyle = '#8b959c'; g.fillRect(-.38, -.2, .76, .4);
  g.fillStyle = '#4b5359'; for (let i = 0; i < 4; i++) g.fillRect(-.32, -.15 + i * .1, .64, .05);
  if (open) { g.fillStyle = '#0c0f12'; g.fillRect(-.36, -.18, .72, .36); g.fillStyle = '#8b959c'; g.fillRect(-.4, -.2 - .5 * open, .8, .12); }
  g.restore();
}
export function preloadMapImages() { ['skeld', 'polus', 'dropship'].forEach(mapImage); }
// build the art once its reference image is decoded (Polus needs it for the snow)
export async function ensureMapArt(id) {
  const name = id === 'lobby' ? 'dropship' : id;
  try { await mapImage(name).decode(); } catch { /* still usable without it */ }
  return mapArt(id);
}
