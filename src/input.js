// Keyboard, mouse, touch and Gamepad API → semantic actions. Tracks the active device for button hints.
import { nav, activate } from './nav.js';
import { state } from './state.js';

const listeners = new Set();
let device = 'kb';             // kb | mouse | touch | ps | xbox | nintendo | generic
let padName = '';
let raw = null;                // optional raw key handler (on-screen keyboard / text input)
export const stick = { x: 0, y: 0, rx: 0, ry: 0 };

export function padKind(id = '') {
  if (/054c|dualsense|dualshock|playstation|wireless controller/i.test(id)) return 'ps';
  if (/045e|xbox|xinput/i.test(id)) return 'xbox';
  if (/057e|nintendo|pro controller|joy-con/i.test(id)) return 'nintendo';
  return 'generic';
}

export const input = {
  get device() {
    const o = state.settings.glyphs;
    if (o === 'ps' || o === 'xbox') return o;
    if (o === 'kb') return 'kb';
    return device;
  },
  get padName() { return padName; },
  onDevice(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  setRaw(fn) { raw = fn; },
  getRaw() { return raw; },
  pads() { return [...(navigator.getGamepads?.() || [])].filter(Boolean); },
  rumble(strong = .5, weak = .3, ms = 120) {
    const lvl = [0, .4, .75, 1][state.settings.vib ?? 2];
    if (!lvl) return;
    for (const p of this.pads()) {
      try { p.vibrationActuator?.playEffect?.('dual-rumble', { duration: ms, strongMagnitude: strong * lvl, weakMagnitude: weak * lvl }); } catch { /* unsupported */ }
    }
  },
};

function setDevice(d) {
  if (d === device) return;
  device = d;
  document.documentElement.dataset.device = d;
  listeners.forEach(fn => fn(input.device));
}

// ---------------------------------------------------------------- keyboard
const KEYMAP = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  Enter: 'ok', ' ': 'ok', Escape: 'back', Backspace: 'back',
  q: 'l1', Q: 'l1', e: 'r1', E: 'r1', o: 'options', O: 'options', t: 'triangle', T: 'triangle',
  p: 'ps', P: 'ps', Home: 'ps', '/': 'search', f: 'fullscreen', F: 'fullscreen', PageUp: 'l2', PageDown: 'r2', c: 'create', C: 'create',
};
addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  setDevice('kb');
  // real text fields keep their keys (Escape leaves the field)
  const tag = e.target?.tagName;
  if ((tag === 'INPUT' || tag === 'TEXTAREA') && !e.target.dataset.passkeys) { if (e.key === 'Escape') { e.target.blur(); e.preventDefault(); } return; }
  const r = raw ? raw(e) : false;
  if (r === true) { e.preventDefault(); return; }
  if (r === 'native') return; // a real text field is handling this key
  const a = KEYMAP[e.key];
  if (!a) return;
  e.preventDefault();
  if (a === 'fullscreen') return toggleFullscreen();
  fire(a, e);
});

export function toggleFullscreen() {
  const d = document, el = d.documentElement;
  const fs = d.fullscreenElement || d.webkitFullscreenElement;
  try {
    if (fs) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  } catch { /* not allowed on this device */ }
}

// ---------------------------------------------------------------- pointer
let lastHover = 0;
addEventListener('pointermove', e => {
  if (e.pointerType === 'touch') return;
  if (Math.abs(e.movementX) + Math.abs(e.movementY) < 2) return;
  setDevice('mouse');
  const t = nav.top;
  const el = e.target.closest?.('[data-f]');
  if (!t || !el || !t.root.contains(el) || el === t.focused || el.hasAttribute('data-nohover')) return;
  const now = performance.now();
  nav.focus(el, { silent: now - lastHover < 90, instant: true, hover: true });
  lastHover = now;
}, { passive: true });
let lastPointer = 'mouse';
addEventListener('pointerdown', e => { lastPointer = e.pointerType; setDevice(e.pointerType === 'touch' ? 'touch' : 'mouse'); }, { passive: true });
addEventListener('click', e => {
  const act = e.target.closest?.('[data-action]');
  if (act) { e.preventDefault(); fire(act.dataset.action, e); return; }
  const el = e.target.closest?.('[data-f]');
  const t = nav.top;
  if (!el || !t || !t.root.contains(el)) return;
  e.preventDefault();
  // on touch, the first tap on a home tile only selects it (launching a game needs a second tap)
  if (t.focused !== el && lastPointer === 'touch' && el.hasAttribute('data-tap2')) { nav.focus(el); return; }
  if (t.focused !== el) nav.focus(el, { silent: true, instant: true });
  activate(el);
});
addEventListener('contextmenu', e => { if (!e.target.closest('input')) { e.preventDefault(); fire('back', e); } });
addEventListener('mouseup', e => { if (e.button === 3) fire('back', e); });

// ---------------------------------------------------------------- platform & lifecycle
// iPadOS reports itself as a Mac; touch points tell them apart.
export const IOS = /iP(hone|ad|od)/.test(navigator.platform || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
// 'suspend' / 'resume' fire when the page is hidden or shown again (app switch, iOS Games app, lock screen, bfcache).
export const lifecycle = new EventTarget();
let hiddenAt = 0;
function suspend(reason) {
  if (hiddenAt) return;
  hiddenAt = Date.now();
  resetPads();
  lifecycle.dispatchEvent(new CustomEvent('suspend', { detail: { reason } }));
}
function resume(reason) {
  if (!hiddenAt) return;
  const away = Date.now() - hiddenAt;
  hiddenAt = 0;
  resetPads();
  lifecycle.dispatchEvent(new CustomEvent('resume', { detail: { reason, away } }));
}
// Journal kept in sessionStorage so an interruption can be diagnosed on the device (Settings › System).
export function lifelog(entry) {
  try {
    const list = JSON.parse(sessionStorage.getItem('ps5ux.lifelog') || '[]');
    list.unshift({ t: Date.now(), ...entry });
    sessionStorage.setItem('ps5ux.lifelog', JSON.stringify(list.slice(0, 25)));
  } catch { /* storage unavailable */ }
}
export const readLifelog = () => { try { return JSON.parse(sessionStorage.getItem('ps5ux.lifelog') || '[]'); } catch { return []; } };
lifecycle.addEventListener('suspend', e => lifelog({ type: 'suspend', reason: e.detail.reason }));
lifecycle.addEventListener('resume', e => lifelog({ type: 'resume', reason: e.detail.reason, away: e.detail.away }));
addEventListener('freeze', () => lifelog({ type: 'freeze' }));
lifelog({ type: 'launch', nav: performance.getEntriesByType?.('navigation')[0]?.type || 'navigate', discarded: !!document.wasDiscarded });
document.addEventListener('visibilitychange', () => (document.hidden ? suspend('hidden') : resume('visible')));
addEventListener('pagehide', () => suspend('pagehide'));
addEventListener('pageshow', e => { if (e.persisted) { hiddenAt ||= Date.now(); resume('bfcache'); } });

// ---------------------------------------------------------------- gamepad
// Standard mapping. On iOS/iPadOS the Home (PS) button is reserved by the system (it opens the Games app),
// so the touchpad click and a long press on Options also open the Control Center.
const BTN = { 0: 'ok', 1: 'back', 2: 'square', 3: 'triangle', 4: 'l1', 5: 'r1', 6: 'l2', 7: 'r2', 8: 'create', 9: 'options', 12: 'up', 13: 'down', 14: 'left', 15: 'right', 16: 'ps', 17: 'ps' };
const DIRS = ['up', 'down', 'left', 'right'];
const LONG_PRESS = 600;
const held = {};
let blocked = false;            // after a resume, ignore buttons until everything has been released
const REPEAT_DELAY = 360, REPEAT_RATE = 95;
const seenPads = new Map();     // id → last seen, to avoid repeating "controller connected" after a resume
function resetPads() { for (const k in held) delete held[k]; blocked = true; stick.x = stick.y = stick.rx = stick.ry = 0; }

addEventListener('gamepadconnected', e => {
  padName = e.gamepad.id;
  setDevice(padKind(e.gamepad.id));
  const last = seenPads.get(e.gamepad.id);
  seenPads.set(e.gamepad.id, Date.now());
  listeners.forEach(fn => fn(input.device, last && Date.now() - last < 10 * 60e3 ? { reconnected: e.gamepad } : { connected: e.gamepad }));
});
addEventListener('gamepaddisconnected', e => {
  seenPads.set(e.gamepad.id, Date.now());
  // iOS drops controllers while the page is in the background: stay quiet about it
  if (!hiddenAt) listeners.forEach(fn => fn(input.device, { disconnected: e.gamepad }));
  if (!input.pads().length) { padName = ''; setDevice('kb'); }
});

function poll(t) {
  requestAnimationFrame(poll);
  if (hiddenAt) return;
  const pads = input.pads();
  if (!pads.length) return;
  let ax = 0, ay = 0, rx = 0, ry = 0;
  const pressed = {};
  for (const p of pads) {
    if (!p.connected || (p.mapping !== 'standard' && p.buttons.length < 12)) continue;
    p.buttons.forEach((b, i) => { if (b.pressed || b.value > .6) pressed[i] = true; });
    ax += p.axes[0] || 0; ay += p.axes[1] || 0; rx += p.axes[2] || 0; ry += p.axes[3] || 0;
  }
  if (Math.abs(ay) > .55) pressed[ay < 0 ? 'su' : 'sd'] = true;
  if (Math.abs(ax) > .55) pressed[ax < 0 ? 'sl' : 'sr'] = true;
  if (blocked) {
    if (Object.keys(pressed).length) return;
    blocked = false;
  }
  const dz = v => Math.abs(v) < .18 ? 0 : v;
  stick.x = dz(ax); stick.y = dz(ay); stick.rx = dz(rx); stick.ry = dz(ry);
  const map = { ...BTN, su: 'up', sd: 'down', sl: 'left', sr: 'right' };
  const swap = state.settings.confirm === 'circle';
  for (const k in map) {
    let a = map[k];
    if (swap && (a === 'ok' || a === 'back')) a = a === 'ok' ? 'back' : 'ok';
    const h = held[k];
    if (pressed[k]) {
      if (!h) {
        held[k] = { t, n: 0 };
        setDevice(padKind(padName || pads[0].id));
        if (!padName) padName = pads[0].id;
        if (a !== 'options') fire(a); // Options waits: short press = Options, long press = Control Center
      } else if (a === 'options' && !h.long && t - h.t >= LONG_PRESS) {
        h.long = true; fire('ps');
      } else if (DIRS.includes(a)) {
        const due = h.t + REPEAT_DELAY + h.n * Math.max(55, REPEAT_RATE - h.n * 4);
        if (t >= due) { h.n++; fire(a, { repeat: true }); }
      }
    } else if (h) {
      delete held[k];
      if (a === 'options' && !h.long) fire('options');
    }
  }
  if (Math.abs(stick.ry) > .2) fire('scroll', { dy: stick.ry * 22 });
}
requestAnimationFrame(poll);

function fire(action, ev) {
  if (action === 'scroll') {
    const sc = nav.top?.root.querySelector('[data-scroll="y"]');
    if (sc) sc.scrollTop += ev.dy;
    return;
  }
  nav.handle(action, ev);
}
export { fire };
