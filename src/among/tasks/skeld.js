// The Skeld task screens and the sabotage repair screens. Drawn like the Polus screens (tasks/kit.js): one canvas in
// the 640×360 units of the reference footage. The four sabotage screens (communications, reactor hand scanner,
// lights, O2 keypad) are measured on the supplied sabotage video (1280×720 frames, so every pixel / 2).
import { stage, rnd, clamp, rrect, SANS } from './kit.js';
import { HAND_RIM } from '../art/hand-ref.js';

const TAU = Math.PI * 2;
const path = (g, flat) => { g.beginPath(); g.moveTo(flat[0], flat[1]); for (let i = 2; i < flat.length; i += 2) g.lineTo(flat[i], flat[i + 1]); g.closePath(); };
const inPath = (flat, x, y) => { let c = false; for (let i = 0, j = flat.length - 2; i < flat.length; j = i, i += 2) { const xi = flat[i], yi = flat[i + 1], xj = flat[j], yj = flat[j + 1]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
// metal panel: vertical gradient, dark outline, light bevel along the top and left
function plate(g, x, y, w, h, top, bottom, r = 4) {
  rrect(g, x, y, w, h, r);
  const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, top); gr.addColorStop(1, bottom);
  g.fillStyle = gr; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#141416'; g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x + 3, y + h - 4); g.lineTo(x + 3, y + 3); g.lineTo(x + w - 4, y + 3); g.stroke();
}
// recessed screen with a bevel
function bezel(g, x, y, w, h, fill = '#000', r = 4) {
  rrect(g, x - 3, y - 3, w + 6, h + 6, r + 2); g.fillStyle = '#7b7f86'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#2a2c30'; g.stroke();
  rrect(g, x, y, w, h, r); g.fillStyle = fill; g.fill(); g.strokeStyle = '#111'; g.stroke();
}

// ------------------------------------------------------------------ segment lettering of the sabotage screens
// 16 segments (a1 a2 b c d1 d2 e f g1 g2 h i j k l m) on a unit cell, like the LCD text of the footage
const SEG = {
  a1: [0, 0, .5, 0], a2: [.5, 0, 1, 0], b: [1, 0, 1, .5], c: [1, .5, 1, 1], d1: [0, 1, .5, 1], d2: [.5, 1, 1, 1], e: [0, .5, 0, 1], f: [0, 0, 0, .5],
  g1: [0, .5, .5, .5], g2: [.5, .5, 1, .5], h: [0, 0, .5, .5], i: [.5, 0, .5, .5], j: [1, 0, .5, .5], k: [.5, .5, 0, 1], l: [.5, .5, .5, 1], m: [.5, .5, 1, 1],
};
const GLYPH = {
  A: 'a1 a2 b c e f g1 g2', B: 'a1 a2 b c d1 d2 i l g2', C: 'a1 a2 f e d1 d2', D: 'a1 a2 b c d1 d2 i l', E: 'a1 a2 f e d1 d2 g1', F: 'a1 a2 f e g1',
  G: 'a1 a2 f e d1 d2 c g2', H: 'f e b c g1 g2', I: 'a1 a2 i l d1 d2', K: 'f e g1 j m', L: 'f e d1 d2', M: 'f e b c h j', N: 'f e b c h m',
  O: 'a1 a2 b c d1 d2 e f', P: 'a1 a2 b f e g1 g2', R: 'a1 a2 b f e g1 g2 m', S: 'a1 a2 f g1 g2 c d1 d2', T: 'a1 a2 i l', U: 'f e d1 d2 c b', W: 'f e b c k m',
  0: 'a1 a2 b c d1 d2 e f', 1: 'b c', 2: 'a1 a2 b g1 g2 e d1 d2', 3: 'a1 a2 b g2 g1 c d1 d2', 4: 'f g1 g2 b c', 5: 'a1 a2 f g1 g2 c d1 d2',
  6: 'a1 a2 f e d1 d2 c g1 g2', 7: 'a1 a2 b c', 8: 'a1 a2 b c d1 d2 e f g1 g2', 9: 'a1 a2 b c d1 d2 f g1 g2',
};
function lcd(g, str, x, y, h, color, adv = .78) {
  const w = h * .55;
  g.save(); g.strokeStyle = color; g.lineWidth = h * .11; g.lineCap = 'round';
  for (const ch of str) {
    const segs = GLYPH[ch];
    if (segs) {
      g.beginPath();
      for (const s of segs.split(' ')) { const [x0, y0, x1, y1] = SEG[s]; const k = .1; g.moveTo(x + (x0 + (x1 - x0) * k) * w, y + (y0 + (y1 - y0) * k) * h); g.lineTo(x + (x1 - (x1 - x0) * k) * w, y + (y1 - (y1 - y0) * k) * h); }
      g.stroke();
    }
    x += w + h * (adv - .55);
  }
  g.restore();
  return x;
}

// ------------------------------------------------------------------ Reactor meltdown / seismic: hand scanner
// grey panel, white LCD « HOLD TO STOP MELTDOWN » (« WAITING FOR SECOND USER » while held), the hand in an orange
// grid with a black outline and a white rim; a white scan band sweeps the hand while it is held
export function handScan(el, api) {
  let held = false, scan = 0;
  const set = on => { if (held === on) return; held = on; api.fix({ a: 'hold', on }); if (on) api.sfx('scanner'); };
  const hit = (x, y) => inPath(HAND_RIM, x, y);
  el.probe = () => ({ held });
  stage(el, api, {
    box: [143, 18, 360, 322], close: [120, 36],
    down: (x, y) => { if (hit(x, y)) set(true); },
    up: () => set(false),
    onClose: () => set(false),
    tick: (S, dt) => { scan = held ? (scan + dt * .55) % 1 : 0; },
    draw: g => {
      plate(g, 143, 18, 360, 322, '#58534f', '#433f3d', 5);
      // LCD
      rrect(g, 172, 32, 304, 36, 4); g.fillStyle = '#3c3a39'; g.fill();
      rrect(g, 175, 35, 298, 30, 3); g.fillStyle = '#f7f5f2'; g.fill(); g.lineWidth = 1.2; g.strokeStyle = '#2b2a29'; g.stroke();
      const msg = held ? 'WAITING FOR SECOND USER' : 'HOLD TO STOP MELTDOWN';
      lcd(g, msg, 182, 42, 16, '#3a3936', .8);
      // hand: inside the traced edge, a white rim then the black outline, the orange grid in the middle
      g.save(); path(g, HAND_RIM); g.clip();
      g.fillStyle = '#ff3c01'; g.fill();
      g.strokeStyle = '#140000'; g.lineWidth = .9; g.beginPath();
      for (let x = 200; x < 440; x += 8.6) { g.moveTo(x, 70); g.lineTo(x, 325); }
      for (let y = 72; y < 325; y += 8.6) { g.moveTo(200, y); g.lineTo(440, y); }
      g.stroke();
      if (held) {
        const yy = 318 - Math.abs(Math.sin(scan * Math.PI)) * 240;
        const gr = g.createLinearGradient(0, yy - 12, 0, yy + 12); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.5, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(195, yy - 12, 250, 24);
      }
      g.lineJoin = 'round';
      path(g, HAND_RIM); g.lineWidth = 9.2; g.strokeStyle = '#0c0606'; g.stroke();
      g.lineWidth = 4.6; g.strokeStyle = '#ffffff'; g.stroke();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ O2 keypad
// light grey keypad, black display with white segment digits (« OK » once accepted), 1-9 / ✕ 0 ✓, and the yellow
// sticky note « today's code: »
export function o2Keypad(el, api) {
  const code = api.sab?.code || '00000';
  let typed = '', shown = null, shownUntil = 0, press = -1, pressT = 0;
  const KX = [230, 295, 360], KY = [95, 155, 214, 272], KW = 58, KH = 52;
  const keyAt = (x, y) => { for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) if (x >= KX[c] && x <= KX[c] + KW && y >= KY[r] && y <= KY[r] + KH) return r * 3 + c; return -1; };
  const LABEL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'V'];
  // state and key centres for the end-to-end tests
  el.probe = () => ({ typed, keys: Object.fromEntries(LABEL.map((L, k) => [L, [KX[k % 3] + KW / 2, KY[k / 3 | 0] + KH / 2]])) });
  stage(el, api, {
    box: [190, 17, 266, 323], close: [170, 33],
    down: (x, y, S) => {
      const k = keyAt(x, y); if (k < 0) return;
      press = k; pressT = S.t; api.sfx('keypad');
      if (api.sab?.fixed?.[api.index]) return;
      const L = LABEL[k];
      if (L === 'X') typed = '';
      else if (L === 'V') {
        if (typed === code) { api.fix({ a: 'code', code: typed }); shown = 'OK'; shownUntil = Infinity; }
        else { api.sfx('error'); shown = ''; shownUntil = S.t + .6; }
        typed = '';
      } else if (typed.length < 5) typed += L;
    },
    draw: (g, S) => {
      plate(g, 190, 17, 266, 323, '#d3d3d3', '#bcbcbc', 5);
      bezel(g, 229, 37, 191, 42, '#000', 3);
      const done = api.sab?.fixed?.[api.index];
      const txt = done ? 'OK' : S.t < shownUntil ? shown : typed;
      if (txt) lcd(g, txt, 239, 45, 26, '#f4f4f4', .7);
      LABEL.forEach((L, k) => {
        const x = KX[k % 3], y = KY[k / 3 | 0], down = k === press && S.t - pressT < .15;
        const [top, bot] = L === 'X' ? ['#f2642b', '#c93d10'] : L === 'V' ? ['#a4e03b', '#6fb21c'] : ['#ececec', '#b9b9b9'];
        rrect(g, x, y + (down ? 2 : 0), KW, KH, 3);
        const gr = g.createLinearGradient(0, y, 0, y + KH); gr.addColorStop(0, top); gr.addColorStop(1, bot);
        g.fillStyle = gr; g.fill(); g.lineWidth = 1.6; g.strokeStyle = '#3d3d3d'; g.stroke();
        g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x + 2, y + KH - 5 + (down ? 2 : 0), KW - 4, 4);
        const cx = x + KW / 2, cy = y + KH / 2 + (down ? 2 : 0);
        g.strokeStyle = '#1b1b1b'; g.fillStyle = '#1b1b1b'; g.lineCap = 'round'; g.lineJoin = 'round';
        if (L === 'X') { g.lineWidth = 2.6; g.beginPath(); g.moveTo(cx - 12, cy - 12); g.lineTo(cx + 12, cy + 12); g.moveTo(cx + 12, cy - 12); g.lineTo(cx - 12, cy + 12); g.stroke(); }
        else if (L === 'V') { g.lineWidth = 2.6; g.beginPath(); g.moveTo(cx - 13, cy); g.lineTo(cx - 3, cy + 11); g.lineTo(cx + 15, cy - 13); g.stroke(); }
        else { g.font = `30px "Comic Sans MS", "Comic Neue", "Chalkboard SE", ${SANS}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(L, cx, cy + 2); }
      });
      // sticky note
      g.save(); g.translate(500, 100); g.rotate(-.24);
      g.fillStyle = 'rgba(0,0,0,.22)'; g.beginPath(); g.moveTo(-78, -40); g.lineTo(82, -46); g.lineTo(88, 50); g.quadraticCurveTo(10, 62, -70, 52); g.closePath(); g.fill();
      g.fillStyle = '#f9e24a'; g.beginPath(); g.moveTo(-82, -46); g.lineTo(78, -52); g.lineTo(84, 40); g.quadraticCurveTo(0, 60, -74, 44); g.closePath(); g.fill();
      g.fillStyle = '#e8c62c'; g.beginPath(); g.moveTo(-74, 44); g.quadraticCurveTo(0, 60, 84, 40); g.quadraticCurveTo(10, 50, -60, 36); g.closePath(); g.fill();
      g.fillStyle = '#2a2a2a'; g.font = `15px "Comic Sans MS", "Comic Neue", "Chalkboard SE", ${SANS}`; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
      g.fillText('today’s code:', -60, -18); g.fillText(code, -60, 6);
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Fix lights
// light grey panel, three black screens (noisy trace, level bar, flat trace) wired by thin yellow traces, five
// toggle switches with their green lamps: a lamp is lit when its switch is on, all five on restore the lights
export function lights(el, api) {
  const SX = [186, 255, 325, 395, 466];
  const flip = new Array(5).fill(0);
  let noise = 0, waveA = [], waveB = [];
  const remake = () => { waveA = Array.from({ length: 106 }, (_, i) => (Math.sin(i * 1.7) * .4 + rnd(-1, 1)) * (.4 + .6 * Math.abs(Math.sin(i / 9)))); waveB = Array.from({ length: 106 }, () => rnd(-1, 1) * (Math.random() < .1 ? 1 : .35)); };
  remake();
  el.probe = () => ({ switches: SX.map(x => [x, 270]) });
  stage(el, api, {
    box: [143, 17, 360, 323], close: [124, 31],
    down: (x, y) => {
      for (let i = 0; i < 5; i++) if (Math.abs(x - SX[i]) < 24 && y > 232 && y < 322) { api.fix({ a: 'switch', s: i }); api.sfx('toggle'); return; }
    },
    tick: (S, dt) => {
      if ((noise += dt) > .07) { noise = 0; remake(); }
      const sw = api.sab?.sw || [];
      for (let i = 0; i < 5; i++) flip[i] += ((sw[i] ? 1 : 0) - flip[i]) * Math.min(1, dt * 18);
    },
    draw: g => {
      plate(g, 143, 17, 360, 323, '#d0d0d0', '#bdbdbd', 5);
      // circuit traces
      g.strokeStyle = '#c9a63a'; g.lineWidth = 1.2; g.beginPath();
      g.moveTo(377, 22); g.lineTo(377, 30); g.lineTo(435, 30); g.lineTo(435, 22);
      g.moveTo(160, 84); g.lineTo(160, 90); g.lineTo(195, 90); g.lineTo(195, 98);
      g.moveTo(330, 98); g.lineTo(330, 91); g.lineTo(345, 91); g.lineTo(345, 84);
      g.moveTo(462, 84); g.lineTo(462, 92); g.lineTo(492, 92);
      g.moveTo(162, 150); g.lineTo(162, 175); g.moveTo(462, 150); g.lineTo(462, 158);
      g.moveTo(185, 214); g.lineTo(185, 226); g.lineTo(300, 226);
      for (const x of SX) { g.moveTo(x - 6, 322); g.lineTo(x - 6, 330); }
      g.stroke();
      // screens
      const scr = [[167, 38], [167, 104], [167, 168]];
      for (const [x, y] of scr) bezel(g, x, y, 315, 40, '#000', 3);
      const trace = (y, amp, wave) => { g.strokeStyle = '#d9e021'; g.lineWidth = 1; g.beginPath(); wave.forEach((v, i) => { const x = 172 + i * 2.88; i ? g.lineTo(x, y + v * amp) : g.moveTo(x, y + v * amp); }); g.stroke(); };
      trace(58, 15, waveA); trace(188, 4, waveB);
      const on = (api.sab?.sw || []).filter(Boolean).length;
      g.fillStyle = '#e6d81f'; g.fillRect(173, 112, 4, 22); if (on === 5) g.fillRect(173, 112, 303, 22);
      // switches
      SX.forEach((x, i) => {
        const k = flip[i];
        g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, 287, 19, 6, 0, 0, TAU); g.fill();
        const ring = g.createRadialGradient(x - 6, 260, 2, x, 266, 21); ring.addColorStop(0, '#ffffff'); ring.addColorStop(.7, '#b8bcc2'); ring.addColorStop(1, '#6c7178');
        g.fillStyle = ring; g.beginPath(); g.arc(x, 266, 20, 0, TAU); g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#2b2d31'; g.stroke();
        g.fillStyle = '#4d5157'; g.beginPath(); g.arc(x, 266, 9, 0, TAU); g.fill();
        // lever: a cone towards the bottom when on, towards the top when off
        const tipY = 266 + (k * 2 - 1) * 28, base = 266, wTip = 13, wBase = 6;
        const lg = g.createLinearGradient(x - wTip, 0, x + wTip, 0); lg.addColorStop(0, '#9aa0a8'); lg.addColorStop(.45, '#ffffff'); lg.addColorStop(1, '#8a9097');
        g.fillStyle = lg; g.beginPath(); g.moveTo(x - wBase, base); g.lineTo(x - wTip, tipY); g.lineTo(x + wTip, tipY); g.lineTo(x + wBase, base); g.closePath(); g.fill(); g.lineWidth = 1.4; g.strokeStyle = '#2b2d31'; g.stroke();
        g.fillStyle = '#e9ecef'; g.beginPath(); g.ellipse(x, tipY, wTip, 3.6, 0, 0, TAU); g.fill(); g.stroke();
        // lamp
        const lit = (api.sab?.sw || [])[i];
        const lamp = g.createRadialGradient(x - 4, 303, 1, x, 308, 12); lamp.addColorStop(0, lit ? '#b6ff9a' : '#3f8a3a'); lamp.addColorStop(.6, lit ? '#2fd12a' : '#1f5a1d'); lamp.addColorStop(1, lit ? '#14800f' : '#0e330d');
        g.fillStyle = lamp; g.beginPath(); g.arc(x, 308, 11, 0, TAU); g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#1d2a1c'; g.stroke();
      });
    },
  });
}

// ------------------------------------------------------------------ Communications
// blue-grey panel, two yellow oscilloscopes (left: the reference wave, right: the received signal, noisy until the
// dial is on the right frequency), red / green lamps, a control block and the big silver dial with its arc
export function comms(el, api) {
  let v = ((api.sab?.target ?? .5) + .45) % 1, last = null, sent = 0, ok = false, phase = 0;
  const KX = 440, KY = 288;
  el.probe = () => ({ v, target: api.sab?.target, knob: [KX, KY] });
  stage(el, api, {
    box: [170, 112, 361, 223], close: [143, 130],
    down: (x, y) => { if (Math.hypot(x - KX, y - KY) < 52) last = Math.atan2(y - KY, x - KX); },
    move: (x, y) => {
      if (last == null) return;
      const a = Math.atan2(y - KY, x - KX); let d = a - last; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; last = a;
      const nv = clamp(v + d / 4.7, 0, 1); if (Math.abs(nv - v) > .004) api.sfx('dial'); v = nv;
      const target = api.sab?.target ?? .5;
      if (Math.abs(v - target) < .03 && performance.now() - sent > 250) { sent = performance.now(); ok = true; api.fix({ a: 'tune', v }); }
    },
    up: () => { last = null; },
    tick: (S, dt) => { phase += dt * 6; },
    draw: (g, S) => {
      plate(g, 170, 112, 361, 223, '#a3aebb', '#8e99a7', 3);
      const screen = (x, y, w, h) => {
        bezel(g, x, y, w, h, '#000', 2);
        g.save(); rrect(g, x, y, w, h, 2); g.clip();
        const gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, '#5a4a17'); gr.addColorStop(.5, '#8a7526'); gr.addColorStop(1, '#5e4d17'); g.fillStyle = gr; g.fillRect(x, y, w, h);
        g.fillStyle = 'rgba(255,230,140,.12)'; for (let k = -2; k < 6; k++) { g.beginPath(); g.moveTo(x + k * 40, y + h); g.lineTo(x + k * 40 + 26, y + h); g.lineTo(x + k * 40 + 26 + h * .7, y); g.lineTo(x + k * 40 + h * .7, y); g.fill(); }
        g.restore();
      };
      screen(191, 131, 147, 82); screen(364, 131, 146, 82);
      const target = api.sab?.target ?? .5, err = Math.abs(v - target);
      const wave = (x0, w, f, noiseAmp) => {
        g.save(); g.beginPath(); g.rect(x0, 131, w, 82); g.clip();
        g.strokeStyle = '#e8e23a'; g.lineWidth = 1.1; g.beginPath();
        for (let x = 0; x <= w; x += 1.5) { const y = 172 + Math.sin(x / w * TAU * f + phase) * 26 * (1 - noiseAmp * .6) + (noiseAmp ? rnd(-1, 1) * 30 * noiseAmp : 0); x ? g.lineTo(x0 + x, y) : g.moveTo(x0 + x, y); }
        g.stroke(); g.restore();
      };
      wave(191, 147, 6, 0);
      const fixed = ok || !api.sab;
      wave(364, 146, 6 + (v - target) * 14, fixed ? 0 : Math.min(1, err * 5 + .12));
      // lamps
      const lamp = (x, on, c) => { const gr = g.createRadialGradient(x - 3, 222, 1, x, 225, 9); gr.addColorStop(0, on ? '#ffffff' : c[1]); gr.addColorStop(.35, on ? c[0] : c[1]); gr.addColorStop(1, c[2]); g.fillStyle = gr; g.beginPath(); g.arc(x, 225, 8, 0, TAU); g.fill(); g.lineWidth = 1; g.strokeStyle = '#222'; g.stroke(); };
      lamp(481, !fixed, ['#ff2a1a', '#8a1a12', '#520b06']); lamp(503, fixed, ['#45e83a', '#1f6a1a', '#0e3a0c']);
      // control block
      bezel(g, 191, 238, 148, 78, '#3d4148', 3);
      g.fillStyle = '#c7ccd3'; for (const [x, y, w] of [[203, 248, 38], [222, 260, 18], [252, 248, 38], [252, 260, 38], [252, 284, 38], [252, 296, 38], [262, 308, 0]]) if (w) { rrect(g, x, y, w, 7, 2); g.fill(); }
      for (const y of [258, 295]) { g.fillStyle = '#4a4f57'; g.fillRect(300, y - 15, 30, 30); g.strokeStyle = '#ddd'; g.lineWidth = 2.5; g.beginPath(); g.arc(315, y, 8, 0, TAU); g.stroke(); }
      g.fillStyle = '#1d1f23'; g.beginPath(); g.arc(215, 296, 13, 0, TAU); g.fill(); g.fillStyle = '#4a4f57'; g.fillRect(201, 282, 28, 28); g.fillStyle = '#16181b'; g.beginPath(); g.arc(215, 296, 11, 0, TAU); g.fill();
      // dial arc and ticks
      g.strokeStyle = '#555c66'; g.lineWidth = 2; g.beginPath(); g.arc(KX, KY + 6, 57, Math.PI * .82, Math.PI * 2.18); g.stroke();
      for (const a of [Math.PI * .82, Math.PI * 2.18]) { g.beginPath(); g.moveTo(KX + Math.cos(a) * 52, KY + 6 + Math.sin(a) * 52); g.lineTo(KX + Math.cos(a) * 62, KY + 6 + Math.sin(a) * 62); g.stroke(); }
      // the dial: brushed silver, turned with the frequency
      const rot = v * 4.7;
      g.save(); g.translate(KX, KY); g.rotate(rot);
      g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.arc(3, 4, 38, 0, TAU); g.fill();
      g.fillStyle = '#d7dadf'; g.beginPath(); g.arc(0, 0, 37, 0, TAU); g.fill();
      for (let k = 0; k < 16; k++) { g.fillStyle = k % 2 ? 'rgba(255,255,255,.55)' : 'rgba(120,125,135,.35)'; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, 37, k / 16 * TAU, (k + 1) / 16 * TAU); g.closePath(); g.fill(); }
      const sh = g.createRadialGradient(-8, -10, 4, 0, 0, 38); sh.addColorStop(0, 'rgba(255,255,255,.5)'); sh.addColorStop(1, 'rgba(90,95,105,.4)'); g.fillStyle = sh; g.beginPath(); g.arc(0, 0, 37, 0, TAU); g.fill();
      g.lineWidth = 2; g.strokeStyle = '#3b3f46'; g.stroke();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Divert Power (Electrical)
// eight sliders under the power lines; the one leading to the room of the task flashes and is the only one that
// moves: push it to the top
const ROOMS8 = ['upper_power', 'lower_power', 'weapons_power', 'shields_power', 'nav_power', 'comms_power', 'o2_power', 'sec_power'];
const SHORT = { upper_power: 'MOTEUR SUP.', lower_power: 'MOTEUR INF.', weapons_power: 'ARMES', shields_power: 'BOUCLIERS', nav_power: 'NAVIGATION', comms_power: 'RADIO', o2_power: 'O2', sec_power: 'SÉCURITÉ' };
export function divert(el, api) {
  const target = api.step.target;
  const ti = Math.max(0, ROOMS8.indexOf(target));
  const X = i => 180 + i * 40;
  let k = 0, drag = null, t = 0;
  el.probe = () => ({ k, knob: [X(ti), 292 - k * 150], top: [X(ti), 120] });
  stage(el, api, {
    box: [150, 28, 340, 304], close: [130, 44],
    down: (x, y) => { const ky = 292 - k * 150; if (Math.abs(x - X(ti)) < 16 && Math.abs(y - ky) < 16) drag = y + k * 150; },
    move: (x, y, S) => { if (drag == null) return; k = clamp((drag - y) / 150, 0, 1); if (k >= .98) { k = 1; drag = null; api.sfx('power'); S.complete(500); } },
    up: () => { drag = null; },
    tick: (S, dt) => { t += dt; if (drag == null && k < 1) k = Math.max(0, k - dt * 2); },
    draw: g => {
      plate(g, 150, 28, 340, 304, '#9ba2aa', '#7f868e', 4);
      // schematic: the bus and the eight lines
      bezel(g, 166, 44, 308, 84, '#16191d', 3);
      g.lineWidth = 3; g.strokeStyle = '#5b5f43';
      g.beginPath(); g.moveTo(180, 62); g.lineTo(460, 62); for (let i = 0; i < 8; i++) { g.moveTo(X(i), 62); g.lineTo(X(i), 128); } g.stroke();
      // power flowing to the target (dashes running down its line), the bus lit
      g.strokeStyle = '#f7e23a'; g.lineWidth = 3; g.setLineDash([6, 6]); g.lineDashOffset = -t * 40;
      g.beginPath(); g.moveTo(320, 62); g.lineTo(X(ti), 62); g.lineTo(X(ti), 128); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#f7e23a'; g.beginPath(); g.arc(320, 62, 6, 0, TAU); g.fill();
      for (let i = 0; i < 8; i++) {
        const x = X(i);
        rrect(g, x - 7, 138, 14, 168, 6); g.fillStyle = '#25282c'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#0f1012'; g.stroke();
        const on = i === ti, kk = on ? k : 0, ky = 292 - kk * 150;
        if (on) { g.fillStyle = `rgba(247,226,58,${.35 + .35 * Math.sin(t * 9)})`; rrect(g, x - 7, ky, 14, 306 - ky, 6); g.fill(); }
        rrect(g, x - 14, ky - 10, 28, 20, 3);
        const kg = g.createLinearGradient(0, ky - 10, 0, ky + 10); kg.addColorStop(0, on ? '#fff38a' : '#e6e8ea'); kg.addColorStop(1, on ? '#cfa91c' : '#9da2a8');
        g.fillStyle = kg; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#26282b'; g.stroke();
        g.strokeStyle = 'rgba(0,0,0,.45)'; g.lineWidth = 1; g.beginPath(); for (const d of [-4, 0, 4]) { g.moveTo(x - 9, ky + d); g.lineTo(x + 9, ky + d); } g.stroke();
        g.save(); g.translate(x, 318); g.font = `bold 6.2px ${SANS}`; g.textAlign = 'center'; g.fillStyle = '#1b1d20'; g.fillText(SHORT[ROOMS8[i]], 0, 0); g.restore();
      }
    },
  });
}

// ------------------------------------------------------------------ Accept Diverted Power
// the cut cable of the room with a rotary switch in the middle: turn it to close the circuit, the current flows
export function accept(el, api) {
  let rot = Math.PI / 2, want = Math.PI / 2, t = 0, flow = 0, done = false;
  el.probe = () => ({ done, switch: [320, 180] });
  stage(el, api, {
    box: [180, 60, 280, 240], close: [160, 76],
    down: (x, y, S) => { if (!done && Math.hypot(x - 320, y - 180) < 46) { want = 0; api.sfx('lever'); } },
    tick: (S, dt) => {
      t += dt; rot += (want - rot) * Math.min(1, dt * 10);
      if (!done && want === 0 && rot < .02) { done = true; rot = 0; api.sfx('zap'); }
      if (done) { flow = Math.min(1, flow + dt * 1.6); if (flow >= 1 && !S.done) S.complete(450); }
    },
    draw: g => {
      plate(g, 180, 60, 280, 240, '#5d646c', '#474d54', 4);
      bezel(g, 196, 76, 248, 208, '#23272c', 3);
      // the cable
      const cable = (x0, x1, lit) => { g.lineCap = 'round'; g.strokeStyle = '#111'; g.lineWidth = 15; g.beginPath(); g.moveTo(x0, 180); g.lineTo(x1, 180); g.stroke(); g.strokeStyle = lit ? '#f7e23a' : '#7a7f86'; g.lineWidth = 9; g.stroke(); };
      cable(200, 278, done); cable(362, 440, flow > .5);
      // sparks running along the closed circuit
      if (done) { g.fillStyle = '#ffffff'; for (let k = 0; k < 6; k++) { const p = (t * .9 + k / 6) % 1, x = 200 + p * 240; if (x < 278 || x > 362) { g.beginPath(); g.arc(x, 180 + Math.sin(t * 30 + k) * 2, 2.6, 0, TAU); g.fill(); } } }
      // rotary switch
      g.save(); g.translate(320, 180);
      g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.arc(3, 4, 44, 0, TAU); g.fill();
      const dg = g.createRadialGradient(-12, -14, 4, 0, 0, 44); dg.addColorStop(0, '#d9dde2'); dg.addColorStop(1, '#868d95');
      g.fillStyle = dg; g.beginPath(); g.arc(0, 0, 42, 0, TAU); g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#1b1d20'; g.stroke();
      g.rotate(rot);
      g.strokeStyle = '#111'; g.lineWidth = 15; g.lineCap = 'butt'; g.beginPath(); g.moveTo(-42, 0); g.lineTo(42, 0); g.stroke();
      g.strokeStyle = done ? '#f7e23a' : '#7a7f86'; g.lineWidth = 9; g.stroke();
      g.fillStyle = '#3a3f45'; g.beginPath(); g.arc(0, 0, 9, 0, TAU); g.fill();
      g.restore();
      if (!done) { g.fillStyle = `rgba(255,255,255,${.5 + .4 * Math.sin(t * 6)})`; g.font = `bold 12px ${SANS}`; g.textAlign = 'center'; g.fillText('↻', 320, 246); }
    },
  });
}

// ------------------------------------------------------------------ Align Engine Output
// the engine seen from above on a dark screen; the yellow slider on the arc at the right tilts it; it is aligned
// when its axis lies on the dotted centre line
export function align(el, api) {
  const PX = 205, PY = 180, R = 225;
  let a = (Math.random() < .5 ? -1 : 1) * rnd(.18, .34), drag = false, t = 0, lock = 0;
  const handle = () => [PX + Math.cos(a) * R, PY + Math.sin(a) * R];
  el.probe = () => ({ a, handle: handle(), aligned: [PX + R, PY] });
  stage(el, api, {
    box: [170, 34, 300, 292], close: [150, 50],
    down: (x, y) => { const [hx, hy] = handle(); if (Math.hypot(x - hx, y - hy) < 22) drag = true; },
    move: (x, y) => { if (drag) a = clamp(Math.atan2(y - PY, x - PX), -.42, .42); },
    up: (x, y, S) => { drag = false; if (Math.abs(a) < .025) { a = 0; lock = 1; api.sfx('fixed'); S.complete(550); } },
    tick: (S, dt) => { t += dt; },
    draw: g => {
      plate(g, 170, 34, 300, 292, '#4b5157', '#383d42', 4);
      bezel(g, 184, 48, 238, 264, '#1b2125', 3);
      g.save(); rrect(g, 184, 48, 238, 264, 3); g.clip();
      g.strokeStyle = 'rgba(80,160,140,.18)'; g.lineWidth = 1; g.beginPath(); for (let x = 184; x < 422; x += 17) { g.moveTo(x, 48); g.lineTo(x, 312); } for (let y = 48; y < 312; y += 17) { g.moveTo(184, y); g.lineTo(422, y); } g.stroke();
      // centre line: green once aligned
      g.setLineDash([7, 6]); g.lineWidth = 2; g.strokeStyle = lock ? '#3ff07a' : Math.abs(a) < .025 ? '#b9f6c9' : '#e9edf0'; g.beginPath(); g.moveTo(184, PY); g.lineTo(422, PY); g.stroke(); g.setLineDash([]);
      // the engine
      g.save(); g.translate(PX, PY); g.rotate(a);
      g.fillStyle = 'rgba(0,0,0,.35)'; rrect(g, 4, -30, 150, 64, 10); g.fill();
      const bg = g.createLinearGradient(0, -32, 0, 32); bg.addColorStop(0, '#d5dade'); bg.addColorStop(.5, '#f2f4f5'); bg.addColorStop(1, '#8e969c');
      g.fillStyle = bg; rrect(g, 0, -32, 148, 64, 10); g.fill(); g.lineWidth = 2; g.strokeStyle = '#1d2024'; g.stroke();
      g.fillStyle = '#b62f2a'; g.fillRect(30, -32, 10, 64); g.fillRect(100, -32, 10, 64);
      g.strokeStyle = '#1d2024'; g.strokeRect(30, -32, 10, 64); g.strokeRect(100, -32, 10, 64);
      // nozzle and its exhaust line
      g.fillStyle = '#6a7177'; g.beginPath(); g.moveTo(148, -22); g.lineTo(186, -34); g.lineTo(186, 34); g.lineTo(148, 22); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = lock ? '#3ff07a' : '#ff8a2a'; g.lineWidth = 2; g.setLineDash([4, 4]); g.lineDashOffset = -t * 30; g.beginPath(); g.moveTo(186, 0); g.lineTo(240, 0); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#2b2f33'; g.beginPath(); g.arc(0, 0, 10, 0, TAU); g.fill();
      g.restore();
      g.restore();
      // slider arc
      g.strokeStyle = '#111'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.arc(PX, PY, R, -.44, .44); g.stroke();
      g.strokeStyle = '#535a61'; g.lineWidth = 7; g.stroke(); g.lineCap = 'butt';
      g.strokeStyle = '#3ff07a'; g.lineWidth = 2; g.beginPath(); g.moveTo(PX + R - 12, PY); g.lineTo(PX + R + 12, PY); g.stroke();
      const [hx, hy] = handle();
      g.save(); g.translate(hx, hy); g.rotate(a);
      g.fillStyle = '#f2d33a'; g.strokeStyle = '#3a2e06'; g.lineWidth = 1.8; g.beginPath(); g.moveTo(-14, 0); g.lineTo(6, -13); g.lineTo(16, -13); g.lineTo(16, 13); g.lineTo(6, 13); g.closePath(); g.fill(); g.stroke();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Calibrate Distributor (Electrical)
// three dials, yellow, blue and cyan, each with a coloured segment turning; press CALIBRATE when the segment is
// under the notch: its gauge fills and the next dial starts; a miss resets the three
export function calibrate(el, api) {
  const C = ['#f2d01c', '#2f5fe8', '#2fd8e8'], SP = [2.4, 3.3, 4.2];
  const rows = C.map((c, i) => ({ c, a: rnd(0, TAU), sp: SP[i], ok: false, fill: 0 }));
  let cur = 0, flash = 0;
  const Y = i => 92 + i * 88;
  // for the tests: time until the turning segment of the current dial is under the notch, and its button
  el.probe = () => { const r = rows[cur]; if (!r) return { cur }; const d = ((-Math.PI / 2 - r.a) % TAU + TAU) % TAU; return { cur, wait: d / r.sp, button: [417, Y(cur)] }; };
  stage(el, api, {
    box: [168, 40, 304, 280], close: [148, 56],
    down: (x, y, S) => {
      for (let i = 0; i < 3; i++) {
        if (!(x > 376 && x < 456 && Math.abs(y - Y(i)) < 18)) continue;
        if (i !== cur || flash > 0) return;
        const r = rows[i], d = Math.atan2(Math.sin(r.a + Math.PI / 2), Math.cos(r.a + Math.PI / 2));     // segment centre vs the notch at the top
        if (Math.abs(d) < .32) { r.ok = true; r.a = -Math.PI / 2; api.sfx('taskStep'); cur++; if (cur === 3) S.complete(700); }
        else { api.sfx('error'); flash = .5; rows.forEach(q => { q.ok = false; }); cur = 0; }
        return;
      }
    },
    tick: (S, dt) => { flash = Math.max(0, flash - dt); rows.forEach(r => { if (!r.ok) r.a += r.sp * dt; r.fill += ((r.ok ? 1 : 0) - r.fill) * Math.min(1, dt * 6); }); },
    draw: (g, S) => {
      plate(g, 168, 40, 304, 280, '#a2a8af', '#858b92', 4);
      rows.forEach((r, i) => {
        const y = Y(i), cx = 218;
        // dial
        g.fillStyle = '#1b1e22'; g.beginPath(); g.arc(cx, y, 32, 0, TAU); g.fill();
        g.fillStyle = r.c; g.beginPath(); g.moveTo(cx, y); g.arc(cx, y, 27, r.a - .32, r.a + .32); g.closePath(); g.fill();
        g.lineWidth = 3; g.strokeStyle = r.c; g.globalAlpha = .45; g.beginPath(); g.arc(cx, y, 27, 0, TAU); g.stroke(); g.globalAlpha = 1;
        g.fillStyle = '#3b4046'; g.beginPath(); g.arc(cx, y, 9, 0, TAU); g.fill();
        g.lineWidth = 2; g.strokeStyle = '#0e0f11'; g.beginPath(); g.arc(cx, y, 32, 0, TAU); g.stroke();
        // notch at the top
        g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(cx - 6, y - 40); g.lineTo(cx + 6, y - 40); g.lineTo(cx, y - 31); g.closePath(); g.fill(); g.strokeStyle = '#111'; g.lineWidth = 1; g.stroke();
        // gauge
        bezel(g, 266, y - 10, 96, 20, '#15171a', 3);
        g.fillStyle = r.c; g.fillRect(268, y - 8, 92 * r.fill, 16);
        // button
        const active = i === cur && flash <= 0;
        rrect(g, 378, y - 16, 78, 32, 4);
        const bg = g.createLinearGradient(0, y - 16, 0, y + 16); bg.addColorStop(0, flash > 0 ? '#e86a5a' : active ? '#f0f2f4' : '#c4c8cd'); bg.addColorStop(1, flash > 0 ? '#b23a2c' : active ? '#a9afb6' : '#8f959c');
        g.fillStyle = bg; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1d1f22'; g.stroke();
        g.font = `bold 11px ${SANS}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = active ? '#1b1d20' : '#5a5f66'; g.fillText('CALIBRATE', 417, y + 1);
      });
    },
  });
}

// ------------------------------------------------------------------ Clean O2 Filter
// leaves stuck on the grating; drag each one into the intake on the left, where the air sucks it away
export function filter(el, api) {
  const SH = [[34, 13], [26, 16], [30, 10], [22, 20]];
  const leaves = Array.from({ length: 6 }, (_, i) => { const [w, h] = SH[i % 4]; return { x: rnd(290, 440), y: rnd(80, 290), a: rnd(0, TAU), w, h, c: ['#5aa23c', '#7cb342', '#8d6e3f', '#4f8f2f', '#a0882f', '#6aa84f'][i], gone: 0 }; });
  let drag = null, t = 0;
  const inIntake = (x, y) => x < 238 && y > 120 && y < 240;
  el.probe = () => ({ leaves: leaves.filter(l => !l.gone).map(l => [l.x, l.y]), intake: [212, 180] });
  stage(el, api, {
    box: [170, 46, 300, 268], close: [150, 62],
    down: (x, y) => { for (let i = leaves.length - 1; i >= 0; i--) { const l = leaves[i]; if (!l.gone && Math.hypot(x - l.x, y - l.y) < l.w * .9) { drag = { l, dx: l.x - x, dy: l.y - y }; leaves.push(leaves.splice(i, 1)[0]); return; } } },
    move: (x, y) => { if (drag) { drag.l.x = clamp(x + drag.dx, 180, 460); drag.l.y = clamp(y + drag.dy, 60, 300); } },
    up: () => { if (drag && inIntake(drag.l.x, drag.l.y)) { drag.l.gone = .001; api.sfx('suck'); } drag = null; },
    tick: (S, dt) => {
      t += dt;
      for (const l of leaves) if (l.gone && l.gone < 1) { l.gone = Math.min(1, l.gone + dt * 2.5); l.x -= dt * 260; l.a += dt * 9; }
      if (!S.done && leaves.every(l => l.gone >= 1)) S.complete(400);
    },
    draw: g => {
      plate(g, 170, 46, 300, 268, '#7d8a86', '#5d6966', 4);
      bezel(g, 184, 60, 272, 240, '#3b4542', 3);
      g.save(); rrect(g, 184, 60, 272, 240, 3); g.clip();
      // grating
      g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 3; g.beginPath(); for (let x = 190; x < 460; x += 14) { g.moveTo(x, 60); g.lineTo(x - 30, 300); } g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1; g.beginPath(); for (let x = 193; x < 460; x += 14) { g.moveTo(x, 60); g.lineTo(x - 30, 300); } g.stroke();
      // intake with the air arrow
      g.fillStyle = '#101414'; g.fillRect(184, 120, 52, 120);
      g.strokeStyle = '#2b3331'; g.lineWidth = 2; for (let y = 128; y < 240; y += 12) { g.beginPath(); g.moveTo(186, y); g.lineTo(234, y); g.stroke(); }
      const ax = 232 - (t * 30 % 18);
      g.fillStyle = 'rgba(200,240,255,.55)'; g.beginPath(); g.moveTo(ax - 28, 180); g.lineTo(ax - 6, 160); g.lineTo(ax - 6, 171); g.lineTo(ax + 22, 171); g.lineTo(ax + 22, 189); g.lineTo(ax - 6, 189); g.lineTo(ax - 6, 200); g.closePath(); g.fill();
      for (const l of leaves) {
        if (l.gone >= 1) continue;
        g.save(); g.translate(l.x, l.y); g.rotate(l.a); const s = 1 - l.gone * .8; g.scale(s, s);
        g.fillStyle = l.c; g.strokeStyle = '#1f2a14'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(-l.w, 0); g.quadraticCurveTo(0, -l.h * 1.5, l.w, 0); g.quadraticCurveTo(0, l.h * 1.5, -l.w, 0); g.closePath(); g.fill(); g.stroke();
        g.lineWidth = 1.2; g.beginPath(); g.moveTo(-l.w - 6, 0); g.lineTo(l.w * .85, 0); for (let k = -2; k <= 2; k++) { g.moveTo(k * l.w * .3, 0); g.lineTo(k * l.w * .3 + l.w * .2, -l.h * .7); g.moveTo(k * l.w * .3, 0); g.lineTo(k * l.w * .3 + l.w * .2, l.h * .7); } g.stroke();
        g.restore();
      }
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Prime Shields
// seven hexagons around the shield emitter; the red ones are off: touch each to switch it on (white)
export function shields(el, api) {
  const R = 38, D = R * Math.sqrt(3);
  const cells = [[320, 180], ...Array.from({ length: 6 }, (_, i) => [320 + Math.cos(i * Math.PI / 3 + Math.PI / 6) * D, 180 + Math.sin(i * Math.PI / 3 + Math.PI / 6) * D])].map(([x, y]) => ({ x, y, on: Math.random() > .45, pop: 0 }));
  if (cells.every(c => c.on)) cells[1 + (Math.random() * 6 | 0)].on = false;
  let glow = 0;
  el.probe = () => ({ off: cells.filter(c => !c.on).map(c => [c.x, c.y]) });
  const hex = (g, x, y, r) => { g.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; i ? g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : g.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); };
  stage(el, api, {
    box: [180, 40, 280, 280], close: [160, 56],
    down: (x, y, S) => {
      if (glow) return;
      const c = cells.find(c => Math.hypot(x - c.x, y - c.y) < R * .9); if (!c) return;
      c.on = !c.on; c.pop = 1; api.sfx('hex');
      if (cells.every(c => c.on)) { glow = .001; api.sfx('power'); S.complete(800); }
    },
    tick: (S, dt) => { cells.forEach(c => { c.pop = Math.max(0, c.pop - dt * 5); }); if (glow) glow = Math.min(1, glow + dt * 2); },
    draw: g => {
      plate(g, 180, 40, 280, 280, '#3c4651', '#2a323b', 4);
      const bg = g.createRadialGradient(320, 180, 10, 320, 180, 130); bg.addColorStop(0, '#2f5a86'); bg.addColorStop(1, '#0f1e2e');
      g.fillStyle = bg; g.beginPath(); g.arc(320, 180, 128, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#0a1018'; g.stroke();
      for (const c of cells) {
        const r = R - 3 + c.pop * 3;
        hex(g, c.x, c.y, r);
        g.fillStyle = c.on ? `rgba(235,244,255,${.82 + glow * .18})` : '#d9372b'; g.fill();
        g.lineWidth = 3; g.strokeStyle = c.on ? '#7fb2e6' : '#6f130d'; g.stroke();
        hex(g, c.x, c.y, r * .62); g.lineWidth = 1.5; g.strokeStyle = c.on ? 'rgba(120,170,220,.6)' : 'rgba(255,140,120,.5)'; g.stroke();
      }
      if (glow) { g.fillStyle = `rgba(160,220,255,${.45 * Math.sin(glow * Math.PI)})`; g.beginPath(); g.arc(320, 180, 128, 0, TAU); g.fill(); }
    },
  });
}

// ------------------------------------------------------------------ Stabilize Steering (Navigation)
// the navigation scope: drag the target reticle back onto the centre of the cross
export function steer(el, api) {
  const CX = 320, CY = 180;
  const a0 = rnd(0, TAU), d0 = rnd(55, 105);
  let x = CX + Math.cos(a0) * d0, y = CY + Math.sin(a0) * d0, drag = null, t = 0;
  el.probe = () => ({ reticle: [x, y], centre: [CX, CY] });
  stage(el, api, {
    box: [182, 42, 276, 276], close: [162, 58],
    down: (px, py) => { if (Math.hypot(px - x, py - y) < 34) drag = [x - px, y - py]; },
    move: (px, py) => { if (!drag) return; let nx = px + drag[0], ny = py + drag[1]; const d = Math.hypot(nx - CX, ny - CY); if (d > 118) { nx = CX + (nx - CX) / d * 118; ny = CY + (ny - CY) / d * 118; } x = nx; y = ny; },
    up: (px, py, S) => { drag = null; if (Math.hypot(x - CX, y - CY) < 9) { x = CX; y = CY; api.sfx('fixed'); S.complete(550); } },
    tick: (S, dt) => { t += dt; },
    draw: (g, S) => {
      plate(g, 182, 42, 276, 276, '#4a5866', '#34404c', 4);
      const bg = g.createRadialGradient(CX, CY, 8, CX, CY, 125); bg.addColorStop(0, '#174c7a'); bg.addColorStop(1, '#0a2238');
      g.fillStyle = bg; g.beginPath(); g.arc(CX, CY, 124, 0, TAU); g.fill(); g.lineWidth = 3; g.strokeStyle = '#06111c'; g.stroke();
      g.strokeStyle = 'rgba(110,180,240,.55)'; g.lineWidth = 1.5;
      for (const r of [30, 60, 90]) { g.beginPath(); g.arc(CX, CY, r, 0, TAU); g.stroke(); }
      g.beginPath(); g.moveTo(CX - 124, CY); g.lineTo(CX + 124, CY); g.moveTo(CX, CY - 124); g.lineTo(CX, CY + 124); g.stroke();
      for (let k = 0; k < 24; k++) { const a = k / 24 * TAU; g.beginPath(); g.moveTo(CX + Math.cos(a) * 116, CY + Math.sin(a) * 116); g.lineTo(CX + Math.cos(a) * 124, CY + Math.sin(a) * 124); g.stroke(); }
      // sweep
      g.fillStyle = 'rgba(120,200,255,.08)'; g.beginPath(); g.moveTo(CX, CY); g.arc(CX, CY, 122, t * 1.4, t * 1.4 + .6); g.closePath(); g.fill();
      const okc = S.done ? '#3ff07a' : '#ffffff';
      g.strokeStyle = okc; g.lineWidth = 3;
      g.beginPath(); g.arc(x, y, 18, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(x - 30, y); g.lineTo(x - 10, y); g.moveTo(x + 10, y); g.lineTo(x + 30, y); g.moveTo(x, y - 30); g.lineTo(x, y - 10); g.moveTo(x, y + 10); g.lineTo(x, y + 30); g.stroke();
    },
  });
}

// ------------------------------------------------------------------ Start Reactor (Simon)
// left: the screen shows a sequence on a 3×3 grid, one more light each round; right: repeat it on the keys.
// Five lamps above each side count the rounds and the keys pressed; a mistake flashes red and starts over
export function reactor(el, api) {
  const seq = Array.from({ length: 5 }, () => Math.random() * 9 | 0);
  let round = 1, pos = 0, state = 'show', timer = .8, showI = 0, lit = -1, fail = 0, press = -1, pressT = 0, t = 0;
  const LX = 186, RX = 342, GY = 108, CELL = 36, GAP = 4;
  const cellRect = (x0, i) => [x0 + (i % 3) * (CELL + GAP), GY + (i / 3 | 0) * (CELL + GAP)];
  el.probe = () => ({ state, round, pos, seq: seq.slice(0, round), keys: Array.from({ length: 9 }, (_, i) => { const [x, y] = cellRect(RX, i); return [x + CELL / 2, y + CELL / 2]; }) });
  stage(el, api, {
    box: [160, 44, 320, 260], close: [140, 60],
    down: (x, y, S) => {
      if (state !== 'input') return;
      for (let i = 0; i < 9; i++) {
        const [cx, cy] = cellRect(RX, i);
        if (x < cx || x > cx + CELL || y < cy || y > cy + CELL) continue;
        press = i; pressT = t; api.sfx('beep' + i);
        if (i !== seq[pos]) { api.sfx('error'); state = 'fail'; fail = 1; timer = 1; round = 1; pos = 0; return; }
        pos++;
        if (pos === round) {
          if (round === 5) { state = 'done'; S.complete(600); return; }
          round++; pos = 0; state = 'show'; showI = 0; timer = .7;
        }
        return;
      }
    },
    tick: (S, dt) => {
      t += dt; fail = Math.max(0, fail - dt * 1.4);
      if (state === 'fail') { timer -= dt; if (timer <= 0) { state = 'show'; showI = 0; timer = .5; } return; }
      if (state !== 'show') return;
      timer -= dt;
      if (timer > 0) return;
      if (lit >= 0) { lit = -1; timer = .18; showI++; if (showI >= round) { state = 'input'; pos = 0; } return; }
      lit = seq[showI]; api.sfx('beep' + lit); timer = .42;
    },
    draw: g => {
      plate(g, 160, 44, 320, 260, '#9aa0a7', '#7d838a', 4);
      // lamps
      const lamps = (x0, n) => { for (let k = 0; k < 5; k++) { const x = x0 + 12 + k * 22, on = k < n; g.fillStyle = fail > 0 ? `rgba(255,${60 - fail * 40},40,1)` : on ? '#3ff07a' : '#2c3a30'; g.beginPath(); g.arc(x, 82, 7, 0, TAU); g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#141617'; g.stroke(); } };
      lamps(LX, state === 'show' || state === 'fail' ? round - 1 : round - 1);
      lamps(RX, state === 'input' ? pos : state === 'done' ? 5 : 0);
      // screen
      bezel(g, LX - 6, GY - 6, 3 * CELL + 2 * GAP + 12, 3 * CELL + 2 * GAP + 12, '#05080b', 3);
      for (let i = 0; i < 9; i++) {
        const [x, y] = cellRect(LX, i);
        g.fillStyle = fail > 0 ? `rgba(200,30,30,${fail})` : i === lit ? '#3e9bff' : '#0f1a26'; g.fillRect(x, y, CELL, CELL);
        if (i === lit && !fail) { g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 4, y + 4, CELL - 8, 6); }
      }
      // keys
      bezel(g, RX - 6, GY - 6, 3 * CELL + 2 * GAP + 12, 3 * CELL + 2 * GAP + 12, '#3a3f45', 3);
      for (let i = 0; i < 9; i++) {
        const [x, y] = cellRect(RX, i), dn = i === press && t - pressT < .15;
        rrect(g, x, y + (dn ? 2 : 0), CELL, CELL - 2, 3);
        const kg = g.createLinearGradient(0, y, 0, y + CELL); kg.addColorStop(0, fail > 0 ? '#ff7a6a' : dn ? '#7ec0ff' : '#e3e6ea'); kg.addColorStop(1, fail > 0 ? '#b32a20' : dn ? '#2f78d6' : '#a7adb4');
        g.fillStyle = kg; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#1b1d20'; g.stroke();
      }
    },
  });
}
