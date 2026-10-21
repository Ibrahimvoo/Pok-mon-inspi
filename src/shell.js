// Screen router, button hints, toasts, dialogs and option menus.
import { nav } from './nav.js';
import { input } from './input.js';
import { audio } from './audio.js';
import { bg } from './bg.js';
import { state, save } from './state.js';
import { h, icon, glyphSvg, img as imgEl, wait } from './ui.js';

const app = document.getElementById('app');
const hintsEl = document.getElementById('hints');
const toastsEl = document.getElementById('toasts');
const shade = document.getElementById('shade');

// ---------------------------------------------------------------- screens
export function go(factory, params = {}, { replace = false, sound = 'open' } = {}) {
  const prev = nav.top;
  const scr = factory(params);
  scr.root.classList.add('screen', 'in');
  scr.root.addEventListener('animationend', e => { if (e.target === scr.root) scr.root.classList.remove('in'); });
  scr.isScreen = true;
  scr.back ??= () => back();
  app.append(scr.root);
  if (replace && prev) closeLayer(prev, { silent: true });
  // screens share the global backdrop, so the one underneath fades away while the new one fades in
  const under = nav.top;
  nav.push(scr);
  if (under?.isScreen) under.root.classList.add('covered');
  applyLayerLook(scr);
  if (sound) audio.play(sound);
  return scr;
}
export function back(sound = 'back') {
  const top = nav.top;
  if (!top || nav.layers.length <= 1) return;
  closeLayer(top);
  if (sound) audio.play(sound);
}
export function closeLayer(layer, { silent = false } = {}) {
  const i = nav.layers.indexOf(layer);
  if (i < 0) return;
  const below = nav.layers[i - 1];
  below?.root.classList.remove('covered');
  nav.pop(layer);
  layer.root.classList.remove('in');
  layer.root.classList.add('out');
  setTimeout(() => layer.root.remove(), silent ? 0 : 320);
  const t = nav.top;
  if (t) applyLayerLook(t);
}
export function resetTo(factory, params) {
  for (const l of [...nav.layers].reverse()) { nav.pop(l); l.root.remove(); }
  return go(factory, params, { sound: null });
}
function applyLayerLook(layer) {
  if (layer.bg !== undefined) {
    const b = typeof layer.bg === 'function' ? layer.bg() : layer.bg;
    bg.show(b?.img || null, b?.depth);
  }
  if (layer.mood) audio.setMood(layer.mood);
  shade.style.opacity = layer.shade ?? 1;
  if (layer.isScreen || layer.opaque) bg.pause(!!layer.opaque);
  bg.dim(layer.dim ?? 1);
  renderHints();
}
export function refreshLook() { if (nav.top) applyLayerLook(nav.top); }

// ---------------------------------------------------------------- button hints
const XB = { cross: 'a', circle: 'b', square: 'x', triangle: 'y' };
const KB = { ok: 'Entrée', back: 'Échap', options: 'O', triangle: 'T', square: 'Y', l1: 'Q', r1: 'E', ps: 'P', search: '/' };
export function glyph(action) {
  const d = input.device;
  const swap = state.settings.confirm === 'circle';
  const shape = { ok: swap ? 'circle' : 'cross', back: swap ? 'cross' : 'circle', triangle: 'triangle', square: 'square' }[action];
  if (d === 'kb' || d === 'mouse' || d === 'touch') return h('span.gl.key', KB[action] || action);
  if (shape) {
    if (d === 'xbox' || d === 'generic') return h(`span.gl.xb.${XB[shape]}`, XB[shape].toUpperCase());
    if (d === 'nintendo') return h('span.gl.xb', { b: 'A', a: 'B', y: 'X', x: 'Y' }[XB[shape]] || '');
    return h('span.gl.ps', { html: glyphSvg(shape) });
  }
  const pill = { options: d === 'ps' ? 'Options' : d === 'nintendo' ? '+' : 'Menu', l1: d === 'ps' ? 'L1' : d === 'nintendo' ? 'L' : 'LB', r1: d === 'ps' ? 'R1' : d === 'nintendo' ? 'R' : 'RB', ps: d === 'ps' ? 'PS' : d === 'nintendo' ? 'Home' : 'Guide', search: '△' }[action];
  return h('span.gl.pill', pill || action);
}
export function renderHints() {
  const t = nav.top;
  hintsEl.replaceChildren();
  if (!t) return;
  const list = typeof t.hints === 'function' ? t.hints() : t.hints || [['ok', 'Sélectionner'], ['back', 'Retour']];
  hintsEl.classList.toggle('off', !!t.noHints);
  for (const [a, label] of list) hintsEl.append(h('div.hint', { 'data-action': a }, glyph(a), h('span', label)));
}
input.onDevice((d, ev) => {
  renderHints();
  if (ev?.connected) {
    const kind = { ps: 'Manette sans fil DualSense', xbox: 'Manette Xbox', nintendo: 'Manette Nintendo' }[d] || 'Manette de jeu';
    toast({ title: `${kind} connectée`, sub: ev.connected.id.replace(/\s*\(.*\)/, '').slice(0, 48) || 'Prête à jouer', icon: 'gamepad' });
    input.rumble(.6, .4, 180);
  } else if (ev?.disconnected) toast({ title: 'Manette déconnectée', sub: 'Utilisez le clavier ou la souris', icon: 'gamepad', sound: 'error' });
});

// ---------------------------------------------------------------- toasts
export function toast({ title, sub = '', icon: ic, img, trophy, sound = 'notify', log = true }) {
  const tic = h('div.tic');
  if (trophy) tic.append(h(`span.tro.${trophy}`));
  else if (img) tic.append(imgEl(img));
  else tic.innerHTML = icon(ic || 'bell');
  const el = h(`div.toast${trophy ? '.trophy' : ''}`, tic, h('div', h('div.tt', title), sub && h('div.ts', sub)));
  toastsEl.prepend(el);
  while (toastsEl.children.length > 3) toastsEl.lastChild.remove();
  if (sound) audio.play(sound);
  if (log) {
    state.notifications.unshift({ title, sub, img, trophy, icon: ic, t: Date.now() });
    state.notifications.length = Math.min(state.notifications.length, 25);
    save('notifications');
  }
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 380); }, trophy ? 5200 : 4200);
}

// ---------------------------------------------------------------- dialogs
export function dialog({ title, body, actions = [{ label: 'OK' }], wide = false, onClose, dismiss = true, hints }) {
  const box = h(`div.dialog${wide ? '.wide' : ''}`, title && h('h2', title), h('div.dbody', body));
  const acts = h('div.dactions');
  const layer = { root: h('div.overlay', h('div.dlg-back', box)), hints: hints || [['ok', 'Sélectionner'], ['back', 'Fermer']] };
  layer.close = (sound = 'back') => { closeLayer(layer); if (sound) audio.play(sound); onClose?.(); };
  layer.back = () => { if (dismiss && !layer.dismissLock) layer.close(); };
  layer.setActions = list => {
    acts.replaceChildren(...list.map(a => h(`button.btn${a.primary ? '.primary' : ''}`, {
      f: true, 'data-autofocus': a.primary ? '' : null, disabled: a.disabled,
      onok: () => { audio.play(a.sound ?? 'ok'); if (a.close !== false) { closeLayer(layer); onClose?.(); } a.onok?.(layer); },
    }, a.icon && h('span.icw', { html: icon(a.icon) }), a.label)));
    layer.dismissLock = false;
    if (nav.top === layer) nav.focusFirst(layer);
  };
  box.append(acts);
  if (actions.length) layer.setActions(actions);
  layer.box = box; layer.body = box.querySelector('.dbody'); layer.acts = acts;
  layer.root.classList.add('in');
  document.getElementById('app').append(layer.root);
  nav.push(layer);
  applyLayerLook(layer);
  return layer;
}
export function confirmDialog(title, text, okLabel, onok, { danger = false } = {}) {
  return dialog({ title, body: text, actions: [{ label: okLabel, primary: !danger, onok }, { label: 'Annuler', primary: danger, sound: 'back' }] });
}

// ---------------------------------------------------------------- options menu
export function menu(items, anchor) {
  const box = h('div.menu');
  const layer = { root: h('div.overlay', box), hints: [['ok', 'Sélectionner'], ['back', 'Fermer']] };
  layer.back = () => { closeLayer(layer); audio.play('back'); };
  layer.onAction = a => { if (a === 'options') { layer.back(); return true; } };
  for (const it of items) {
    box.append(h('div.list-item', { f: true, disabled: it.disabled, onok: () => { closeLayer(layer); audio.play('ok'); it.onok?.(); } },
      h('span.icw', { html: icon(it.icon || 'chevron') }), h('div.grow', it.label)));
  }
  layer.root.classList.add('in');
  app.append(layer.root);
  const r = anchor?.getBoundingClientRect?.();
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (r) {
    box.style.left = Math.min(r.left, innerWidth - 52 * rem) + 'px';
    const below = r.bottom + 1.4 * rem;
    if (below + items.length * 8 * rem < innerHeight) box.style.top = below + 'px';
    else box.style.bottom = (innerHeight - r.top + 1.4 * rem) + 'px';
  } else { box.style.right = '9rem'; box.style.bottom = '12rem'; }
  nav.push(layer);
  renderHints();
  audio.play('open');
  return layer;
}

// clocks everywhere stay in sync
export function timeStr(d = new Date()) {
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: !state.settings.clock24 });
}
setInterval(() => document.querySelectorAll('[data-clock]').forEach(el => { el.textContent = timeStr(); }), 5000);

export { wait };

// push current settings into every subsystem
export function applySettings() {
  const s = state.settings, root = document.documentElement;
  audio.configure(s);
  bg.configure(s);
  nav.reduceMotion = s.reduceMotion;
  root.classList.toggle('reduce-motion', s.reduceMotion);
  root.classList.toggle('contrast', s.contrast);
  root.classList.toggle('big-text', s.bigText);
  document.querySelectorAll('[data-clock]').forEach(el => { el.textContent = timeStr(); });
  renderHints();
}
