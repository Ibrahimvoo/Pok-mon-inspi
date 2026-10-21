// In-game controls: keyboard (layout independent, so ZQSD on AZERTY works), mouse with pointer lock,
// any standard gamepad, and on-screen touch controls. Polled once per frame by the match.
import { h } from '../../ui.js';
import { input as consoleInput, IOS } from '../../input.js';
import { EMOTES } from './view/characters.js';

const DEAD = .2;
export function createInput(root, canvas) {
  const keys = new Set();
  let mouseDX = 0, mouseL = false, mouseR = false, superEdge = 0, emoteEdge = null, pauseEdge = false, locked = false;
  let touch = { mx: 0, my: 0, puff: false, look: 0, active: false };
  const padPrev = {};
  let playing = false;

  const onKey = e => {
    if (!playing || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = e.target?.tagName; if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.type === 'keydown') {
      if (!e.repeat) {
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyE') superEdge++;
        const n = /^Digit([1-6])$/.exec(e.code); if (n) emoteEdge = EMOTES[+n[1] - 1]?.id || null;
      }
      keys.add(e.code);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
    } else keys.delete(e.code);
  };
  const onBlur = () => { keys.clear(); mouseL = mouseR = false; };
  const onMouseDown = e => {
    if (!playing || e.pointerType === 'touch') return;
    if (e.button === 0) mouseL = true;
    if (e.button === 2) { mouseR = true; superEdge++; }
    if (!locked && consoleInput.device === 'mouse' && canvas.requestPointerLock && !IOS) { try { const r = canvas.requestPointerLock(); r?.catch?.(() => {}); } catch { /* not allowed */ } }
  };
  const onMouseUp = e => { if (e.button === 0) mouseL = false; if (e.button === 2) mouseR = false; };
  const onMove = e => { if (locked) mouseDX += e.movementX || 0; };
  const onLock = () => { locked = document.pointerLockElement === canvas; };
  addEventListener('keydown', onKey); addEventListener('keyup', onKey); addEventListener('blur', onBlur);
  canvas.addEventListener('pointerdown', onMouseDown); addEventListener('pointerup', onMouseUp); addEventListener('mousemove', onMove);
  document.addEventListener('pointerlockchange', onLock);

  // ---- touch controls
  const capture = (el, id) => { try { el.setPointerCapture(id); } catch { /* pointer already gone */ } };
  const knob = h('i'), stickEl = h('div.pf-stick', knob);
  const puffBtn = h('button.pf-tbtn.puff', { type: 'button' }, h('b', 'POUF'));
  const superBtn = h('button.pf-tbtn.super', { type: 'button' }, h('b', 'SUPER'));
  const emoteBtn = h('button.pf-tbtn.emo', { type: 'button' }, '😀');
  const emoteRow = h('div.pf-emorow.hidden', EMOTES.slice(0, 4).map(em => h('button.pf-tbtn.mini', { type: 'button', onclick: () => { emoteEdge = em.id; emoteRow.classList.add('hidden'); } }, em.icon)));
  const pauseBtn = h('button.pf-tbtn.pause', { type: 'button', 'aria-label': 'Pause', onclick: () => { pauseEdge = true; } }, h('span', '❚❚'));
  const touchEl = h('div.pf-touch', stickEl, puffBtn, superBtn, emoteBtn, emoteRow, pauseBtn);
  root.append(touchEl);
  let stickId = null, sx = 0, sy = 0, lookId = null, lx = 0;
  stickEl.addEventListener('pointerdown', e => { stickId = e.pointerId; const r = stickEl.getBoundingClientRect(); sx = r.left + r.width / 2; sy = r.top + r.height / 2; capture(stickEl, e.pointerId); moveStick(e); e.preventDefault(); });
  const moveStick = e => {
    if (e.pointerId !== stickId) return;
    const R = stickEl.offsetWidth * .42;
    let dx = (e.clientX - sx) / R, dy = (e.clientY - sy) / R; const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; }
    touch.mx = dx; touch.my = dy; knob.style.transform = `translate(${dx * R}px, ${dy * R}px)`;
  };
  stickEl.addEventListener('pointermove', moveStick);
  const endStick = e => { if (e.pointerId !== stickId) return; stickId = null; touch.mx = touch.my = 0; knob.style.transform = ''; };
  stickEl.addEventListener('pointerup', endStick); stickEl.addEventListener('pointercancel', endStick);
  puffBtn.addEventListener('pointerdown', e => { touch.puff = true; capture(puffBtn, e.pointerId); e.preventDefault(); });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) puffBtn.addEventListener(ev, () => { touch.puff = false; });
  superBtn.addEventListener('pointerdown', e => { superEdge++; e.preventDefault(); });
  emoteBtn.addEventListener('click', () => emoteRow.classList.toggle('hidden'));
  // dragging on the free part of the screen turns the camera
  canvas.addEventListener('pointerdown', e => { if (e.pointerType !== 'touch' || !playing) return; lookId = e.pointerId; lx = e.clientX; });
  canvas.addEventListener('pointermove', e => { if (e.pointerId !== lookId) return; touch.look += (e.clientX - lx); lx = e.clientX; });
  const endLook = e => { if (e.pointerId === lookId) lookId = null; };
  canvas.addEventListener('pointerup', endLook); canvas.addEventListener('pointercancel', endLook);

  const dz = v => (Math.abs(v) < DEAD ? 0 : (v - Math.sign(v) * DEAD) / (1 - DEAD));
  const api = {
    get locked() { return locked; },
    setPlaying(v) {
      playing = v;
      touchEl.classList.toggle('on', v);
      if (!v) { keys.clear(); mouseL = mouseR = false; touch.puff = false; touch.mx = touch.my = 0; emoteRow.classList.add('hidden'); if (locked) document.exitPointerLock?.(); }
    },
    // returns the controls for this frame (edges are consumed)
    poll(dt) {
      let mx = 0, my = 0, look = 0, puff = false, respawn = false, sup = superEdge, emote = emoteEdge, pause = pauseEdge;
      superEdge = 0; emoteEdge = null; pauseEdge = false;
      if (keys.has('KeyA') || keys.has('ArrowLeft')) mx -= 1;
      if (keys.has('KeyD') || keys.has('ArrowRight')) mx += 1;
      if (keys.has('KeyW') || keys.has('ArrowUp')) my -= 1;
      if (keys.has('KeyS') || keys.has('ArrowDown')) my += 1;
      if (keys.has('Space') || mouseL) puff = true;
      if (keys.has('KeyR')) respawn = true;
      look += mouseDX * .0032; mouseDX = 0;
      if (touch.mx || touch.my) { mx = touch.mx; my = touch.my; }
      if (touch.puff) puff = true;
      look += touch.look * .006; touch.look = 0;
      for (const p of consoleInput.pads()) {
        if (!p?.connected || (p.mapping !== 'standard' && p.buttons.length < 12)) continue;
        const b = i => !!(p.buttons[i] && (p.buttons[i].pressed || p.buttons[i].value > .5));
        const ax = dz(p.axes[0] || 0), ay = dz(p.axes[1] || 0);
        if (Math.abs(ax) + Math.abs(ay) > Math.abs(mx) + Math.abs(my)) { mx = ax; my = ay; }
        if (b(14)) mx = -1; if (b(15)) mx = 1;
        look += dz(p.axes[2] || 0) * dt * 2.6;
        if (b(0) || b(7)) puff = true;
        const prev = padPrev[p.index] || {};
        const edge = i => b(i) && !prev[i];
        if (edge(2) || edge(5)) sup++;
        if (b(3)) respawn = true;
        if (edge(12)) emote = 'wave'; if (edge(13)) emote = 'laugh'; if (edge(1)) emote = 'cheer'; if (edge(4)) emote = 'dance';
        const now = {}; for (const i of [1, 2, 3, 4, 5, 12, 13]) now[i] = b(i);
        padPrev[p.index] = now;
      }
      const l = Math.hypot(mx, my); if (l > 1) { mx /= l; my /= l; }
      return { mx, my, look, puff, sup, emote, respawn, pause };
    },
    dispose() {
      removeEventListener('keydown', onKey); removeEventListener('keyup', onKey); removeEventListener('blur', onBlur);
      canvas.removeEventListener('pointerdown', onMouseDown); removeEventListener('pointerup', onMouseUp); removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerlockchange', onLock);
      if (locked) document.exitPointerLock?.();
      touchEl.remove();
    },
  };
  return api;
}
