// Slot for authorized original crewmate sprites. When public/among/sprites/crewmate.json exists, every crewmate
// (local player, other players, menus, lobby, meetings) is drawn from those images instead of the traced base.
//
// crewmate.json:
// { "suitHeight": 371,                 // pixels from the top of the dome to the lowest foot in the images
//   "anchor": [165, 371],              // pixel of the images at the middle of the suit, at the feet
//   "colorKey": true,                  // red channel = suit colour, blue channel = shadow, green = visor
//   "idle": "idle.png", "walk": ["walk01.png", … 12 frames], "ghost": "ghost.png", "dead": "dead.png" }
// With "colorKey": false the images are used as they are (one set per colour: "idle": { "red": "red_idle.png", … }).
import { COLORS } from '../core/rules.js';
import { REF } from './crewmate-ref.js';

let base = null, loading = null;
const listeners = new Set();
export const spriteBase = () => base;
export const onSprites = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const VISOR = [149, 201, 219];
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

function loadImg(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
const tint = new Map();
function recolor(img, color) {
  const key = img.src + '|' + color;
  if (tint.has(key)) return tint.get(key);
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const g = c.getContext('2d'); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height), p = d.data;
  const C = COLORS.find(x => x.id === color) || COLORS[0], m = hex(C.body), s = hex(C.shade);
  for (let i = 0; i < p.length; i += 4) {
    const r = p[i], gr = p[i + 1], b = p[i + 2];
    if (Math.max(r, gr, b) - Math.min(r, gr, b) < 24) continue;   // outline, white shine: unchanged
    for (let k = 0; k < 3; k++) p[i + k] = Math.min(255, (r * m[k] + b * s[k] + gr * VISOR[k]) / 255);
  }
  g.putImageData(d, 0, 0);
  tint.set(key, c);
  return c;
}

export async function loadSprites(dir = 'among/sprites/') {
  if (base || loading) return loading;
  loading = (async () => {
    let man;
    try { const r = await fetch(dir + 'crewmate.json', { cache: 'no-cache' }); if (!r.ok) return null; man = await r.json(); } catch { return null; }
    const pick = async v => (typeof v === 'string' ? loadImg(dir + v) : v && typeof v === 'object' ? Object.fromEntries(await Promise.all(Object.entries(v).map(async ([k, f]) => [k, await loadImg(dir + f)]))) : null);
    try {
      const idle = await pick(man.idle), walk = await Promise.all((man.walk || []).map(pick)), ghost = await pick(man.ghost), dead = await pick(man.dead);
      const k = REF.size[1] / (man.suitHeight || REF.size[1]);
      const [ax, ay] = man.anchor || [REF.center, REF.feet];
      const img = (v, color) => (!v ? null : v instanceof HTMLImageElement ? (man.colorKey !== false ? recolor(v, color) : v) : v[color] || null);
      const put = (g, src) => { g.drawImage(src, REF.center - ax * k, REF.feet - ay * k, src.width * k, src.height * k); };
      base = {
        hasDead: !!dead,
        draw(g, color, frame, opts) {
          const src = img(opts.ghost && ghost ? ghost : frame >= 0 && walk.length ? walk[frame % walk.length] : idle, color);
          if (src) put(g, src);
        },
        drawDead(g, color) { const src = img(dead, color); if (src) put(g, src); },
      };
      listeners.forEach(f => f(base));
      return base;
    } catch (e) { console.warn('crewmate sprites could not be loaded', e); return null; }
  })();
  return loading;
}
