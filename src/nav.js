// Layer stack + spatial focus navigation shared by every screen, overlay and dialog.
import { audio } from './audio.js';

const layers = [];
const listeners = new Set();
let reduce = false;

const visible = el => el.isConnected && el.getClientRects().length > 0 && !el.closest('[inert],.hidden');
const focusables = root => [...root.querySelectorAll('[data-f]')].filter(el => !el.hasAttribute('disabled') && visible(el));

export const nav = {
  get top() { return layers[layers.length - 1]; },
  get layers() { return layers; },
  set reduceMotion(v) { reduce = v; },
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  emit() { listeners.forEach(fn => fn(this.top)); },

  push(layer) {
    const prev = this.top;
    if (prev) { prev.root.setAttribute('inert', ''); prev.root.classList.add('under'); }
    layers.push(layer);
    layer.root.removeAttribute('inert');
    layer.root.classList.remove('under');
    layer.onEnter?.();
    if (!layer.focused || !layer.focused.isConnected) this.focusFirst(layer);
    else this.focus(layer.focused, { silent: true, instant: true });
    this.emit();
  },
  pop(layer = this.top) {
    const i = layers.indexOf(layer);
    if (i < 0) return;
    layers.splice(i, 1);
    layer.onLeave?.();
    const t = this.top;
    if (t) {
      t.root.removeAttribute('inert'); t.root.classList.remove('under');
      t.onResume?.();
      if (t.focused?.isConnected && visible(t.focused)) this.focus(t.focused, { silent: true, instant: true });
      else this.focusFirst(t);
    }
    this.emit();
  },
  focusFirst(layer = this.top) {
    if (!layer) return;
    const el = layer.root.querySelector('[data-autofocus]') || focusables(layer.root)[0];
    if (el) this.focus(el, { silent: true, instant: true });
  },

  focus(el, { silent = false, instant = false } = {}) {
    const layer = this.top;
    if (!el || !layer) return;
    const prev = layer.focused;
    if (prev && prev !== el) { prev.classList.remove('focused'); prev.dispatchEvent(new CustomEvent('blur:f')); }
    layer.focused = el;
    el.classList.add('focused');
    const g = el.closest('[data-group]');
    if (g) g._last = el;
    if (prev !== el) {
      if (!silent) audio.play('move');
      el.dispatchEvent(new CustomEvent('focus:f', { bubbles: true }));
      reveal(el, instant || reduce);
    }
  },

  move(dir) {
    const layer = this.top;
    if (!layer) return false;
    const cur = layer.focused;
    if (!cur || !cur.isConnected || !visible(cur)) { this.focusFirst(layer); return true; }
    // linear rows: step to the neighbouring sibling
    const row = cur.closest('[data-row]');
    if (row && (dir === 'left' || dir === 'right')) {
      const items = focusables(row).filter(e => e.closest('[data-row]') === row);
      const i = items.indexOf(cur);
      const next = items[i + (dir === 'right' ? 1 : -1)];
      if (next) { this.focus(next); return true; }
      if (row.hasAttribute('data-stop')) { bump(cur, dir); return true; }
    }
    const next = spatial(cur, dir, focusables(layer.root));
    if (next) {
      const g = next.closest('[data-group]');
      const pick = g && g !== cur.closest('[data-group]') && g._last?.isConnected && visible(g._last) ? g._last : next;
      this.focus(pick);
      return true;
    }
    bump(cur, dir);
    return false;
  },

  handle(action, ev) {
    const layer = this.top;
    if (!layer) return;
    if (layer.onAction?.(action, ev) === true) return;
    if (this.global?.(action, ev) === true) return;
    if (['up', 'down', 'left', 'right'].includes(action)) this.move(action);
    else if (action === 'ok' && layer.focused?.isConnected) activate(layer.focused);
    else if (action === 'back' && layer.back) layer.back();
  },
};

export function activate(el) {
  if (el.hasAttribute('disabled')) { audio.play('error'); return; }
  el.classList.remove('pressed'); void el.offsetWidth; el.classList.add('pressed');
  el.dispatchEvent(new CustomEvent('ok', { bubbles: true }));
}

function bump(el, dir) {
  if (reduce) return;
  el.classList.remove('bump-left', 'bump-right', 'bump-up', 'bump-down');
  void el.offsetWidth;
  el.classList.add('bump-' + dir);
  setTimeout(() => el.classList.remove('bump-' + dir), 260);
}

function spatial(cur, dir, all) {
  const a = cur.getBoundingClientRect();
  const ac = { x: a.left + a.width / 2, y: a.top + a.height / 2 };
  let best = null, bestScore = Infinity;
  for (const el of all) {
    if (el === cur || el.contains(cur) || cur.contains(el)) continue;
    const b = el.getBoundingClientRect();
    const bc = { x: b.left + b.width / 2, y: b.top + b.height / 2 };
    let primary, ortho, overlap;
    if (dir === 'right' || dir === 'left') {
      const s = dir === 'right' ? 1 : -1;
      // the candidate's centre must lie beyond the current element's edge (tiles of different sizes overlap)
      if (s > 0 ? bc.x <= a.right - 2 : bc.x >= a.left + 2) continue;
      primary = Math.max(0, s > 0 ? b.left - a.right : a.left - b.right);
      overlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      ortho = Math.abs(bc.y - ac.y);
    } else {
      const s = dir === 'down' ? 1 : -1;
      if (s > 0 ? bc.y <= a.bottom - 2 : bc.y >= a.top + 2) continue;
      primary = Math.max(0, s > 0 ? b.top - a.bottom : a.top - b.bottom);
      overlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      ortho = Math.abs(bc.x - ac.x);
      // vertical moves prefer the item nearest the left edge of the current one (row starts)
      if (overlap <= 0) ortho += Math.abs(b.left - a.left) * .5;
    }
    // anything aligned with the current element beats anything diagonal
    const score = primary + (overlap > 0 ? ortho * .15 : ortho * 2 + 5000);
    if (score < bestScore) { bestScore = score; best = el; }
  }
  return best;
}

// Smoothly scroll every scroll container so the focused element sits comfortably in view.
function reveal(el, instant) {
  let c = el.parentElement;
  while (c && c !== document.body) {
    const mode = c.dataset.scroll;
    if (mode) {
      const cr = c.getBoundingClientRect(), er = el.getBoundingClientRect();
      if (mode === 'y' || mode === 'top') {
        const pad = parseFloat(c.dataset.pad || 120);
        let t = c.scrollTop;
        if (mode === 'top') t += er.top - cr.top - pad;
        else if (er.top < cr.top + pad) t += er.top - cr.top - pad;
        else if (er.bottom > cr.bottom - pad) t += er.bottom - cr.bottom + pad;
        if (el.dataset.scrolltop !== undefined) t = 0;
        tween(c, 'scrollTop', Math.max(0, t), instant);
      } else if (mode === 'x') {
        const pad = parseFloat(c.dataset.pad || 90);
        let l = c.scrollLeft;
        if (er.left < cr.left + pad) l += er.left - cr.left - pad;
        else if (er.right > cr.right - pad) l += er.right - cr.right + pad;
        tween(c, 'scrollLeft', Math.max(0, l), instant);
      }
    }
    c = c.parentElement;
  }
}
const tweens = new WeakMap();
export function tween(el, prop, to, instant = false, dur = 340) {
  cancelAnimationFrame(tweens.get(el)?.[prop]);
  const from = el[prop];
  if (instant || Math.abs(to - from) < 1) { el[prop] = to; return; }
  const t0 = performance.now();
  const step = t => {
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el[prop] = from + (to - from) * e;
    if (k < 1) { const m = tweens.get(el) || {}; m[prop] = requestAnimationFrame(step); tweens.set(el, m); }
  };
  const m = tweens.get(el) || {}; m[prop] = requestAnimationFrame(step); tweens.set(el, m);
}
