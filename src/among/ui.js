// Small DOM helpers and shared visuals of the Among Us screens.
import { drawCrew } from './art/crew.js';

export function el(tag, cls = '', kids = [], attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  // style through the CSSOM: the page's Content-Security-Policy (style-src 'self') drops style attributes
  for (const k in attrs) if (attrs[k] != null && attrs[k] !== false) { if (k === 'style') e.style.cssText = attrs[k]; else e.setAttribute(k, attrs[k] === true ? '' : attrs[k]); }
  for (const k of [].concat(kids)) if (k != null && k !== false) e.append(k instanceof Node ? k : document.createTextNode(String(k)));
  return e;
}
export const mapLogo = m => el('span', `au-maplogo ${m}`, m === 'polus' ? 'POLUS' : 'THE SKELD');

// a crewmate icon (canvas) in the shared base
export function crewIcon(color, size = 40, { ghost = false, left = false, dead = false, look = null } = {}) {
  const c = el('canvas', 'au-crewicon', [], { width: size * 2, height: size * 2 });
  c.style.width = c.style.height = size + 'px';
  const g = c.getContext('2d');
  drawCrew(g, color, size, size * 1.86, size * 1.65, { ghost, left, alpha: dead ? .45 : 1, look: look && { hat: look.hat, visor: look.visor, skin: look.skin } });
  return c;
}

// the starry background of the menus (stars drift from right to left)
export function starfield() {
  const c = el('canvas', 'au-stars');
  const stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), z: .2 + Math.random() * .8 }));
  let raf = 0, last = performance.now();
  const tick = t => {
    raf = requestAnimationFrame(tick);
    if (c.hidden || !c.isConnected) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    for (const s of stars) {
      s.x -= dt * .02 * s.z; if (s.x < 0) { s.x = 1; s.y = Math.random(); }
      g.fillStyle = `rgba(255,255,255,${.35 + s.z * .6})`;
      g.beginPath(); g.arc(s.x * w, s.y * h, s.z * 1.8, 0, Math.PI * 2); g.fill();
    }
  };
  raf = requestAnimationFrame(tick);
  return { el: c, stop: () => cancelAnimationFrame(raf) };
}
export function fmtTime(ms) { return Math.max(0, Math.ceil(ms / 1000)) + ' s'; }
