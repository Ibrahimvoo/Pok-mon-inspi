// Shared kit for the task screens, reproduced from the in-game footage. Everything is drawn on one canvas in
// "screen units" of the reference footage (a 640×360 screen), so positions and sizes measured on the video are used
// as they are. Like in the game: no dark backdrop (the game stays visible), the panel slides up from the bottom,
// the round close button sits at its top-left corner, and "Task Completed!" rises over the screen at the end.
import { drawCrew } from '../art/crew.js';

export const SW = 640, SH = 360;
export const MONO = '"DejaVu Sans Mono", Consolas, Menlo, "Liberation Mono", "Courier New", monospace';
export const SANS = 'Arial, "Liberation Sans", Helvetica, sans-serif';
export const rnd = (a, b) => a + Math.random() * (b - a);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const ease = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);

export function stage(el, api, o) {
  const [bx, by, bw, bh] = o.box;
  const close = o.close || [bx - 24, by + 18];
  el.classList.add('mgx');
  el.parentElement?.classList.add('mgw');
  const cv = document.createElement('canvas');
  el.append(cv);
  const g = cv.getContext('2d');
  const S = {
    g, cv, el, api, t: 0, k: 1, ox: 0, oy: 0, slide: 0, done: false, closing: false,
    px: null, py: null, pointer: false, w: 0, h: 0,
    complete, local, inBox: (x, y) => x >= bx && x <= bx + bw && y >= by && y <= by + bh,
  };
  let raf = 0, last = performance.now(), opened = last;
  function fit() {
    const r = el.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    S.w = r.width || innerWidth; S.h = r.height || innerHeight;
    cv.width = Math.round(S.w * dpr); cv.height = Math.round(S.h * dpr);
    S.dpr = dpr;
    // same proportions as in the game: the reference screen is fitted to the window; on narrow screens the panel
    // itself is fitted to the width
    let k = Math.min(S.h / SH, S.w / SW);
    S.ox = S.w / 2 - SW / 2 * k;
    if ((bw + 60) * k > S.w) { k = S.w / (bw + 60); S.ox = S.w / 2 - (bx + bw / 2) * k; }
    S.k = k;
    S.oy = S.h / 2 - SH / 2 * k;
    if (by * k + S.oy < 0) S.oy = -by * k + 4;
  }
  function local(e) {
    const r = cv.getBoundingClientRect();
    return [(e.clientX - r.left - S.ox) / S.k, (e.clientY - r.top - S.oy - S.slide * S.k) / S.k];
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.25, (now - last) / 1000); last = now;
    S.t += dt;
    const open = (now - opened) / 200;
    S.slide = S.closing ? S.slide + (SH - S.slide) * Math.min(1, dt * 14) + 6 : (1 - ease(open)) * SH;
    o.tick?.(S, dt);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, cv.width, cv.height);
    g.setTransform(S.k * S.dpr, 0, 0, S.k * S.dpr, S.ox * S.dpr, (S.oy + S.slide * S.k) * S.dpr);
    o.draw(g, S, dt);
    closeButton(g, close[0], close[1]);
  }
  function complete(delay = 350) {
    if (S.done) return;
    S.done = true;
    api.sfx?.('taskDone');
    const root = el.closest('.au-play') || document.body;
    const t = document.createElement('div');
    t.className = 'mg-complete'; t.textContent = 'Task Completed!';
    t.style.fontSize = (22 * S.k) + 'px';
    t.style.top = (S.oy + (by + bh / 2) * S.k) + 'px';
    t.style.setProperty('--rise', (-70 * S.k) + 'px');
    root.append(t);
    setTimeout(() => t.remove(), 1900);
    setTimeout(() => { S.closing = true; setTimeout(() => api.done?.(), 160); }, delay);
  }
  cv.addEventListener('pointerdown', e => {
    e.preventDefault();
    const [x, y] = local(e);
    if (Math.hypot(x - close[0], y - close[1]) < 15) { api.close?.(); return; }
    if (S.done) return;
    cv.setPointerCapture?.(e.pointerId);
    S.pointer = true; S.px = x; S.py = y;
    o.down?.(x, y, S, e);
  });
  cv.addEventListener('pointermove', e => {
    const [x, y] = local(e);
    S.px = x; S.py = y;
    if (!S.done) o.move?.(x, y, S, e);
  });
  const up = e => {
    if (!S.pointer) return;
    S.pointer = false;
    const [x, y] = local(e);
    if (!S.done) o.up?.(x, y, S, e);
  };
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);
  const onResize = () => fit();
  addEventListener('resize', onResize);
  const prevClose = api.onClose;
  api.onClose = () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); o.onClose?.(S); prevClose?.(); };
  // screen position of a point of the reference screen (used by the end-to-end tests)
  el.toScreen = (x, y) => { const r = cv.getBoundingClientRect(); return [r.left + S.ox + x * S.k, r.top + S.oy + (y + S.slide) * S.k]; };
  fit();
  raf = requestAnimationFrame(frame);
  return S;
}

// the round white close button of every task screen
export function closeButton(g, x, y) {
  g.save();
  g.beginPath(); g.arc(x, y, 13, 0, Math.PI * 2);
  const gr = g.createRadialGradient(x - 3, y - 4, 2, x, y, 13);
  gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#dfe1e6');
  g.fillStyle = gr; g.fill();
  g.lineWidth = 2; g.strokeStyle = '#2f3036'; g.stroke();
  g.beginPath(); g.moveTo(x - 6, y - 6); g.lineTo(x + 6, y + 6); g.moveTo(x + 6, y - 6); g.lineTo(x - 6, y + 6);
  g.lineWidth = 3.6; g.lineCap = 'round'; g.strokeStyle = '#2b2c31'; g.stroke();
  g.restore();
}

// white text with the dark outline used on task screens
export function outlined(g, text, x, y, size, { font = SANS, align = 'left', weight = '', fill = '#fff', stroke = '#000', lw } = {}) {
  g.save();
  g.font = `${weight} ${size}px ${font}`;
  g.textAlign = align; g.textBaseline = 'alphabetic';
  g.lineJoin = 'round'; g.lineWidth = lw ?? size * .16; g.strokeStyle = stroke;
  g.strokeText(text, x, y);
  g.fillStyle = fill; g.fillText(text, x, y);
  g.restore();
}
export function text(g, str, x, y, size, color = '#fff', font = MONO, align = 'left') {
  g.font = `${size}px ${font}`; g.textAlign = align; g.textBaseline = 'alphabetic'; g.fillStyle = color; g.fillText(str, x, y);
}

export function rrect(g, x, y, w, h, r) {
  g.beginPath();
  if (g.roundRect) g.roundRect(x, y, w, h, r);
  else { g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
}

// film grain (task screens shown as monitors), cached per size
const grains = new Map();
export function grain(w, h, alpha = .1) {
  const key = `${w}x${h}x${alpha}`;
  if (grains.has(key)) return grains.get(key);
  const c = document.createElement('canvas'); c.width = w * 2; c.height = h * 2;
  const x = c.getContext('2d'), d = x.createImageData(c.width, c.height);
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() < .5 ? 0 : 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = Math.random() * 255 * alpha; }
  x.putImageData(d, 0, 0);
  grains.set(key, c);
  return c;
}

// the player's crewmate, used by some screens (the little runner of the file transfers)
export function crew(g, color, x, y, height, opts) { drawCrew(g, color || 'white', x, y, height, opts); }

// monospace terminal text sized like the footage: cap height and advance per character in screen units
export function mono(g, str, x, y, cap, adv, color = '#fff', align = 'left') {
  const size = cap / .73;
  g.save();
  g.font = `${size}px ${MONO}`;
  const k = adv / g.measureText('M').width;
  const w = str.length * adv;
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  g.translate(x0, y); g.scale(k, 1);
  g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillStyle = color;
  g.fillText(str, 0, 0);
  g.restore();
}
