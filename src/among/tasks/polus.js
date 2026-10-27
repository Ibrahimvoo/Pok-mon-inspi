// Task screens measured on the Polus task footage (coordinates in units of the 640×360 reference screen).
import { stage, rnd, clamp, rrect, outlined, text, mono, grain, crew, MONO, SANS } from './kit.js';
import { WALK_FRAMES } from '../art/crew.js';

// ------------------------------------------------------------------ Clear Asteroids (Weapons)
// translucent green monitor over the game, corner brackets, a reticle with two barrels from the bottom corners,
// rocks drifting from right to left, 20 to destroy
export function asteroids(el, api) {
  const B = [183, 42, 272, 274], [bx, by, bw, bh] = B;
  const rocks = [], bits = [], flashes = [];
  let count = 0, spawnIn = .2, rx = 360, ry = 245;
  const shape = r => { const n = 9 + (Math.random() * 4 | 0), a0 = Math.random() * 6; return Array.from({ length: n }, (_, i) => { const a = a0 + i / n * Math.PI * 2, d = r * rnd(.68, 1.08); return [Math.cos(a) * d, Math.sin(a) * d]; }); };
  const spawn = () => {
    const r = rnd(10, 16);
    rocks.push({ x: bx + bw + r + 4, y: rnd(by + 20, by + bh - 40), vx: -rnd(38, 62), vy: rnd(-12, 12), a: Math.random() * 6, va: rnd(-1.6, 1.6), r, pts: shape(r) });
  };
  const rock = (g, pts, alpha = 1) => {
    g.globalAlpha = alpha;
    g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath();
    g.fillStyle = '#2c5038'; g.fill();
    g.lineWidth = 1.6; g.lineJoin = 'round'; g.strokeStyle = '#0d2716'; g.stroke();
    if (pts.length > 6) { g.beginPath(); g.moveTo(pts[1][0] * .45, pts[1][1] * .45); g.lineTo(pts[4][0] * .3, pts[4][1] * .3); g.lineTo(pts[6][0] * .5, pts[6][1] * .5); g.lineWidth = 1; g.strokeStyle = 'rgba(13,39,22,.7)'; g.stroke(); }
    g.globalAlpha = 1;
  };
  const shoot = (x, y, S) => {
    rx = clamp(x, bx, bx + bw); ry = clamp(y, by, by + bh);
    api.sfx?.('shoot');
    const hit = rocks.findIndex(o => Math.hypot(o.x - rx, o.y - ry) < o.r * 1.25);
    if (hit < 0) return;
    const o = rocks.splice(hit, 1)[0];
    flashes.push({ x: o.x, y: o.y, t: 0 });
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + rnd(-.3, .3); bits.push({ x: o.x, y: o.y, vx: Math.cos(a) * rnd(25, 55) + o.vx * .4, vy: Math.sin(a) * rnd(25, 55), a: rnd(0, 6), va: rnd(-4, 4), t: 0, pts: shape(o.r * rnd(.3, .42)) }); }
    count++;
    if (count >= 20) S.complete(600);
  };
  stage(el, api, {
    box: B, close: [151, 43],
    down: (x, y, S) => shoot(x, y, S),
    move: (x, y) => { if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) { rx = x; ry = y; } },
    tick: (S, dt) => {
      if ((spawnIn -= dt) <= 0 && rocks.length < 6) { spawn(); spawnIn = rnd(.45, 1.1); }
      for (const o of rocks) { o.x += o.vx * dt; o.y += o.vy * dt; o.a += o.va * dt; if (o.y < by + 8 || o.y > by + bh - 8) o.vy *= -1; }
      for (let i = rocks.length - 1; i >= 0; i--) if (rocks[i].x < bx - 30) rocks.splice(i, 1);
      for (const b of bits) { b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt; b.t += dt; }
      for (let i = bits.length - 1; i >= 0; i--) if (bits[i].t > .8) bits.splice(i, 1);
      for (const f of flashes) f.t += dt;
      for (let i = flashes.length - 1; i >= 0; i--) if (flashes[i].t > .16) flashes.splice(i, 1);
    },
    draw: g => {
      // brackets just outside the corners
      g.strokeStyle = '#386d42'; g.lineWidth = 3; g.lineCap = 'butt';
      const br = (x, y, sx, sy) => { g.beginPath(); g.moveTo(x + sx * 16, y); g.lineTo(x, y); g.lineTo(x, y + sy * 16); g.stroke(); };
      br(169, 31, 1, 1); br(469, 31, -1, 1); br(169, 329, 1, -1); br(469, 329, -1, -1);
      g.fillStyle = 'rgba(54,134,68,.85)'; g.fillRect(bx, by, bw, bh);
      g.save(); g.beginPath(); g.rect(bx, by, bw, bh); g.clip();
      g.drawImage(grain(bw, bh, .09), bx, by, bw, bh);
      for (const o of rocks) { g.save(); g.translate(o.x, o.y); g.rotate(o.a); rock(g, o.pts); g.restore(); }
      for (const b of bits) { g.save(); g.translate(b.x, b.y); g.rotate(b.a); rock(g, b.pts, Math.max(0, 1 - b.t / .8)); g.restore(); }
      // barrels from the bottom corners to the reticle
      g.strokeStyle = 'rgba(28,92,82,.85)'; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(bx, by + bh); g.lineTo(rx, ry); g.moveTo(bx + bw, by + bh); g.lineTo(rx, ry); g.stroke();
      for (const f of flashes) {
        const k = 1 - f.t / .16;
        g.strokeStyle = `rgba(170,255,220,${k})`; g.lineWidth = 1.4;
        g.beginPath(); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, l = (i % 2 ? 7 : 12) * (1.2 - k * .4); g.moveTo(f.x, f.y); g.lineTo(f.x + Math.cos(a) * l, f.y + Math.sin(a) * l); } g.stroke();
        g.fillStyle = `rgba(150,255,210,${k})`; g.beginPath(); g.arc(f.x, f.y, 5, 0, Math.PI * 2); g.fill();
      }
      // reticle: square crossed by full-length hairlines
      g.strokeStyle = '#0c3a18'; g.lineWidth = 3;
      g.strokeRect(rx - 15, ry - 15, 30, 30);
      g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(rx, ry - 21); g.lineTo(rx, ry + 22); g.moveTo(rx - 20, ry); g.lineTo(rx + 21, ry); g.stroke();
      g.restore();
      g.strokeStyle = '#123a1a'; g.lineWidth = 1.5; g.strokeRect(bx, by, bw, bh);
      outlined(g, `Destroyed: ${count}`, 193, 305, 20, { lw: 3 });
    },
  });
}

// ------------------------------------------------------------------ Download / Upload Data
const ESTIMATE = s => { s = Math.max(0, Math.round(s)); const d = s / 86400 | 0, h = s / 3600 % 24 | 0, m = s / 60 % 60 | 0, x = s % 60; const p = []; if (d) p.push(d + 'd'); if (d || h) p.push(h + 'hr'); if (d || h || m) p.push(m + 'm'); p.push(x + 's'); return p.join(' '); };

function folder(g, x, y, w, h, { open = 0, papers = false } = {}) {
  // back: tab and body
  g.lineJoin = 'round'; g.lineWidth = 2; g.strokeStyle = '#a08547';
  g.fillStyle = '#f4d4a1';
  g.beginPath(); g.moveTo(x, y + 10); g.lineTo(x, y + 1); g.quadraticCurveTo(x, y, x + 2, y); g.lineTo(x + w * .2, y); g.quadraticCurveTo(x + w * .25, y, x + w * .26, y + 10); g.closePath(); g.fill(); g.stroke();
  if (papers) {
    // two sheets standing in the folder, as tilted squares
    const sheet = (cx, top, fill) => { const d = 32; g.beginPath(); g.moveTo(cx, top); g.lineTo(cx + d * .95, top + d * .8); g.lineTo(cx, top + d * 1.9); g.lineTo(cx - d * .95, top + d * 1.1); g.closePath(); g.fillStyle = fill; g.fill(); g.lineWidth = 1; g.strokeStyle = '#9aa6b4'; g.stroke(); };
    sheet(x + w * .44, y - 13, '#dfe6ee'); sheet(x + w * .65, y - 13, '#eef2f6');
    g.lineWidth = 2; g.strokeStyle = '#a08547';
  }
  if (!open) {
    g.fillStyle = '#f4d4a1'; g.fillRect(x, y + 9, w, h - 9); g.strokeRect(x, y + 9, w, h - 9);
    g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(x + 2, y + 11, w - 4, 3);
    return;
  }
  g.fillStyle = '#e9c88f'; g.fillRect(x, y + 9, w, h - 9); g.strokeRect(x, y + 9, w, h - 9);
  // front flap tilted towards the viewer
  const s = 20 * open;
  g.fillStyle = '#cba76d';
  g.beginPath(); g.moveTo(x + s, y + 16); g.lineTo(x + w + s, y + 16); g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fill(); g.stroke();
}

function transfer(el, api, up) {
  const B = [128, 57, 384, 246];
  const src = up ? 'My tablet' : (api.roomName?.(api.step?.console) || 'Weapons');
  const dst = up ? 'Headquarters' : 'My tablet';
  const DUR = 6.3;
  let started = false, hover = false, p = 0, est = 0, estIn = 0, run = 0, finished = 0;
  const color = api.me?.color || 'white';
  const btn = [279, 211, 82, 16];
  const onBtn = (x, y) => x >= btn[0] && x <= btn[0] + btn[2] && y >= btn[1] && y <= btn[1] + btn[3];
  stage(el, api, {
    box: B, close: [105, 78],
    move: (x, y) => { hover = !started && onBtn(x, y); },
    down: (x, y) => { if (!started && onBtn(x, y)) { started = true; api.sfx?.('click'); } },
    tick: (S, dt) => {
      if (!started || S.done) return;
      run += dt;
      p = Math.min(1, p + dt / DUR * rnd(.6, 1.4));
      if ((estIn -= dt) <= 0) { const left = (1 - p) * DUR; est = left * (1 + 16000 * Math.pow(Math.max(0, 1 - 2 * p), 1.27)); estIn = .45; }
      if (p >= 1 && !finished) finished = S.t;
      if (finished && S.t - finished > .35) S.complete(450);
    },
    draw: (g, S) => {
      // metal case
      rrect(g, 128, 57, 384, 246, 10);
      const m = g.createLinearGradient(0, 57, 0, 303);
      m.addColorStop(0, '#86848b'); m.addColorStop(.2, '#828389'); m.addColorStop(.8, '#86878c'); m.addColorStop(.82, '#a2a3a9'); m.addColorStop(.92, '#8f9097'); m.addColorStop(1, '#55565a');
      g.fillStyle = m; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1e1e21'; g.stroke();
      g.save(); rrect(g, 128, 57, 384, 246, 10); g.clip();
      g.lineWidth = 14; g.strokeStyle = 'rgba(0,0,0,.16)'; rrect(g, 128, 57, 384, 246, 10); g.stroke();
      g.lineWidth = 10; g.strokeStyle = 'rgba(255,255,255,.2)'; rrect(g, 142, 66, 356, 196, 12); g.stroke();
      g.restore();
      // screen
      rrect(g, 146, 70, 348, 188, 9); g.fillStyle = '#4a729b'; g.fill();
      g.save(); rrect(g, 146, 70, 348, 188, 9); g.clip();
      for (const [x, w, a] of [[30, 10, .07], [52, 4, .09], [150, 22, .07], [188, 5, .1], [262, 14, .07], [300, 4, .09], [338, 24, .06], [392, 6, .09], [450, 16, .06]]) {
        g.fillStyle = `rgba(255,255,255,${a})`;
        g.beginPath(); g.moveTo(146 + x, 258); g.lineTo(146 + x + w, 258); g.lineTo(146 + x + w + 110, 70); g.lineTo(146 + x + 110, 70); g.closePath(); g.fill();
      }
      g.restore();
      rrect(g, 147.5, 71.5, 345, 185, 8); g.lineWidth = 1; g.strokeStyle = 'rgba(220,235,250,.5)'; g.stroke();
      rrect(g, 146, 70, 348, 188, 9); g.lineWidth = 3; g.strokeStyle = '#131416'; g.stroke();
      // folders and the little runner carrying a file
      const cyc = (run % 1.15) / 1.15;
      const going = started && !finished;
      if (up) {
        g.strokeStyle = '#3d4247'; g.fillStyle = '#7e8790'; g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(427, 112); g.lineTo(419, 133); g.moveTo(427, 112); g.lineTo(435, 133); g.stroke();
        g.beginPath(); g.arc(427, 104, 7, 0, Math.PI * 2); g.fill(); g.stroke();
        g.beginPath(); g.arc(427, 104, 3, 0, Math.PI * 2); g.fillStyle = '#c9d1d8'; g.fill();
      }
      const runner = going && cyc > .06 && cyc < .94;
      if (runner) drawRunner(g, color, 222 + (cyc - .06) / .88 * 210, run);
      folder(g, 170, 120, 86, 61, { open: going && cyc < .45 ? 1 : 0, papers: true });
      folder(g, 385, 120, 86, 61, { open: going && cyc > .7 ? 1 : 0 });
      text(g, src, 212, 197, 12, '#eef1f4', MONO, 'center');
      text(g, dst, 427, 197, 12, '#eef1f4', MONO, 'center');
      if (!started) {
        rrect(g, btn[0], btn[1], btn[2], btn[3], 3);
        const b = g.createLinearGradient(0, btn[1], 0, btn[1] + btn[3]);
        if (hover) { b.addColorStop(0, '#46d23f'); b.addColorStop(1, '#1f9a1c'); } else { b.addColorStop(0, '#f1f1f1'); b.addColorStop(1, '#b9b9bb'); }
        g.fillStyle = b; g.fill(); g.lineWidth = 1.3; g.strokeStyle = '#2a2a2c'; g.stroke();
        text(g, up ? 'Upload' : 'Download', 320, 223.5, 11, '#111', SANS, 'center');
        return;
      }
      rrect(g, 187, 208, 228, 16, 7); g.fillStyle = '#fff'; g.fill();
      if (p > 0) { g.save(); rrect(g, 187, 208, 228, 16, 7); g.clip(); g.fillStyle = '#1f7a1a'; g.fillRect(187, 208, 228 * p, 16); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(187, 209, 228 * p, 3); g.restore(); }
      rrect(g, 187, 208, 228, 16, 7); g.lineWidth = 2; g.strokeStyle = '#131416'; g.stroke();
      text(g, `${Math.floor(p * 100)}%`, 470, 221, 12, '#eef1f4', MONO, 'right');
      text(g, p >= 1 ? 'Complete' : `Estimated time: ${ESTIMATE(est)}`, 160, 245, 12, '#eef1f4', MONO);
    },
  });
}
function drawRunner(g, color, x, t) {
  g.fillStyle = 'rgba(25,35,50,.45)'; g.beginPath(); g.ellipse(x, 171, 12, 3.2, 0, 0, Math.PI * 2); g.fill();
  crew(g, color, x, 169, 30, { frame: Math.floor(t * 14) % WALK_FRAMES });
  // the files held in front
  g.save(); g.translate(x + 7, 153); g.rotate(Math.PI / 4);
  g.fillStyle = '#e3e9f0'; g.strokeStyle = '#8f9cab'; g.lineWidth = .9;
  g.fillRect(-7, -7, 13, 13); g.strokeRect(-7, -7, 13, 13);
  g.fillStyle = '#f5f7fa'; g.fillRect(-3, -9, 13, 13); g.strokeRect(-3, -9, 13, 13);
  g.restore();
}
export const download = (el, api) => transfer(el, api, false);
export const upload = (el, api) => transfer(el, api, true);

// ------------------------------------------------------------------ Reboot Wi-Fi (Communications)
// purple cabinet with its door open, scrolling display, 8 status lights, red lever on a slot. Pull the lever down,
// come back 60 s later ("Please Return In N"), push it up: "Please Wait", lights scan, "Reboot Complete".
const WIFI_LEDS = ['POWER', 'US/DS', 'Online', '2.4 GHz', '5 GHz', 'S 1', 'S 2', 'S 3'];
export function wifi(el, api) {
  const TOP = 80, BOT = 275;
  const second = api.step?.game === 'wifiEnd';
  let state = second ? 'count' : 'required', opened = second && !api.peek;
  let lever = second ? BOT : TOP, drag = null, leds = WIFI_LEDS.map(() => Math.random() < .5), ledIn = 0, scroll = 0, waitT = 0, msgOld = '';
  let localEnd = 0;
  const left = () => Math.max(api.left?.() ?? 0, localEnd - performance.now());
  if (second && left() <= 0) state = 'power';
  api.onStep = () => { opened = true; };
  const message = () => ({ required: 'Reboot Required', count: `Please Return In ${Math.ceil(left() / 1000)}`, power: 'Please Power On', wait: 'Please Wait', done: 'Reboot Complete' }[state]);
  stage(el, api, {
    box: [112, 37, 313, 283], close: [197, 50],
    down: (x, y) => { if (Math.abs(x - 393) < 22 && Math.abs(y - lever) < 14 && (state === 'required' || state === 'power')) drag = y - lever; },
    move: (x, y) => {
      if (drag == null) return;
      lever = clamp(y - drag, TOP, BOT);
      if (state === 'required' && lever >= BOT - 1) { drag = null; state = 'count'; localEnd = performance.now() + 60000; leds = leds.map(() => false); api.sfx?.('lever'); api.advance?.(); }
      else if (state === 'power' && lever <= TOP + 1 && opened) { drag = null; state = 'wait'; waitT = 0; api.sfx?.('lever'); }
    },
    up: () => { drag = null; },
    tick: (S, dt) => {
      if (drag == null) {
        // the lever springs back unless it reached the end
        const rest = state === 'required' || state === 'wait' || state === 'done' ? TOP : BOT;
        lever += (rest - lever) * Math.min(1, dt * 12);
      }
      if (state === 'count' && left() <= 0) state = 'power';
      // ask the authority for the second step (retried: the local clock can be a little early)
      if (state === 'power' && !opened && S.t - (S.asked || -9) > 1) { S.asked = S.t; api.reopen?.(); }
      if (state === 'required' && (ledIn -= dt) <= 0) { leds = leds.map(v => Math.random() < .25 ? !v : v); ledIn = .35; }
      if (state === 'wait') {
        waitT += dt;
        if ((ledIn -= dt) <= 0) { const i = Math.random() * 8 | 0; leds = leds.map((_, j) => j === i); ledIn = .3; }
        if (waitT > 2.6) { state = 'done'; leds = WIFI_LEDS.map(() => Math.random() < .8); S.complete(700); }
      }
      const m = message();
      if (m.replace(/\d+/, '') !== msgOld) { msgOld = m.replace(/\d+/, ''); scroll = 0; }
      scroll += dt * 34;
    },
    draw: g => {
      // open door on the left
      g.lineWidth = 2; g.strokeStyle = '#1b1424';
      g.beginPath(); g.moveTo(170, -6); g.bezierCurveTo(118, 40, 104, 320, 170, 366); g.lineTo(189, 366); g.lineTo(189, -6); g.closePath();
      g.fillStyle = '#3c2f52'; g.fill(); g.stroke();
      g.beginPath(); g.moveTo(141, 139); g.lineTo(163, 158); g.lineTo(141, 177); g.closePath();
      g.fillStyle = '#7a66a6'; g.fill(); g.lineWidth = 1.6; g.strokeStyle = '#b4a2dc'; g.stroke();
      // hinge strip
      g.beginPath(); g.moveTo(188, 10); g.lineTo(219, 38); g.lineTo(219, 322); g.lineTo(188, 350); g.closePath();
      g.fillStyle = '#433f4c'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#1a171f'; g.stroke();
      g.fillStyle = '#5a4f78';
      for (const y of [68, 165, 258]) { rrect(g, 210, y, 4, 30, 2); g.fill(); }
      // cabinet
      rrect(g, 218, 37, 207, 283, 9); g.fillStyle = '#524069'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1a1422'; g.stroke();
      rrect(g, 222, 42, 199, 273, 6); g.fillStyle = '#47414c'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#2a2530'; g.stroke();
      g.fillStyle = '#5c4f74'; for (const x of [240, 390]) { rrect(g, x, 39, 14, 4, 1.5); g.fill(); rrect(g, x, 313, 14, 4, 1.5); g.fill(); }
      // scrolling display
      g.fillStyle = '#1d2226'; g.fillRect(238, 61, 120, 30);
      g.fillStyle = '#556770'; g.fillRect(241, 64, 114, 24);
      g.strokeStyle = 'rgba(200,220,225,.35)'; g.lineWidth = 1; g.strokeRect(241.5, 64.5, 113, 23);
      g.save(); g.beginPath(); g.rect(242, 64, 112, 24); g.clip();
      const msg = message(), span = msg.length * 10.7 + 40, off = scroll % span;
      mono(g, msg, 245 - off, 82, 9.5, 10.7, '#cbd8dc'); mono(g, msg, 245 - off + span, 82, 9.5, 10.7, '#cbd8dc');
      g.restore();
      // status list
      g.fillStyle = '#20282b'; g.fillRect(230, 113, 139, 184);
      g.fillStyle = '#4f6b71'; g.fillRect(233, 116, 133, 178);
      g.strokeStyle = 'rgba(190,215,220,.4)'; g.strokeRect(235.5, 118.5, 128, 173);
      WIFI_LEDS.forEach((name, i) => {
        const y = 136 + i * 19;
        g.fillStyle = g.strokeStyle = '#b9d5db';
        if (leds[i]) { rrect(g, 246, y - 4.5, 9, 9, 3); g.fill(); }
        else { g.lineWidth = 1.6; g.beginPath(); g.ellipse(250.5, y, 3.6, 4.4, 0, 0, Math.PI * 2); g.stroke(); }
        mono(g, name, 269, y + 5.3, 10.7, 10.2, '#bed4d8');
      });
      // power symbol, slot and lever
      g.strokeStyle = '#d9dde3'; g.lineWidth = 1.8; g.lineCap = 'round';
      g.beginPath(); g.arc(392, 59.5, 5.2, -Math.PI / 2 + .75, -Math.PI / 2 - .75 + Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(392, 52); g.lineTo(392, 59); g.stroke(); g.lineCap = 'butt';
      rrect(g, 388, 71, 10, 218, 3); g.fillStyle = '#0c1014'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#2b2a30'; g.stroke();
      g.fillStyle = '#d7d4db'; g.fillRect(386, 297, 14, 3);
      spool(g, 393, lever);
    },
  });
}
function spool(g, x, y) {
  // the red lever: a glossy bobbin, round flared ends and a narrower middle
  const body = g.createLinearGradient(0, y - 8, 0, y + 8); body.addColorStop(0, '#ff7a78'); body.addColorStop(.4, '#e3332f'); body.addColorStop(1, '#93121a');
  g.lineWidth = 1.5; g.strokeStyle = '#4a070c';
  g.fillStyle = body; g.fillRect(x - 14, y - 7, 28, 14); g.strokeRect(x - 14, y - 7, 28, 14);
  for (const s of [-1, 1]) {
    const cx = x + s * 14;
    const e = g.createLinearGradient(0, y - 11, 0, y + 11); e.addColorStop(0, '#ff8a86'); e.addColorStop(.45, '#df2e2b'); e.addColorStop(1, '#7d0c14');
    g.beginPath(); g.ellipse(cx, y, 5, 11, 0, 0, Math.PI * 2); g.fillStyle = e; g.fill(); g.stroke();
  }
  g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x - 10, y - 5, 20, 2.5);
}
export const wifiEnd = wifi;

// ------------------------------------------------------------------ Fix Weather Node (maze)
// MIRA monitor, 10×4 posts with random walls between them; drag the white line from the top plug to the bottom one
export function weather(el, api) {
  const X0 = 152.5, DX = 18.75, Y0 = 110, DY = 18.35, NX = 19, NY = 7;
  const cx = k => X0 + k * DX, cy = m => Y0 + m * DY;
  // open[k][m] for gap cells; nodes (odd, odd) are always open, posts (even, even) never
  const open = Array.from({ length: NX }, () => Array(NY).fill(false));
  const seen = new Set(), stack = [[0, 0]];
  seen.add('0,0');
  while (stack.length) {
    const [i, j] = stack[stack.length - 1];
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([a, b]) => [i + a, j + b]).filter(([a, b]) => a >= 0 && a < 9 && b >= 0 && b < 3 && !seen.has(a + ',' + b));
    if (!nb.length) { stack.pop(); continue; }
    const [a, b] = nb[Math.random() * nb.length | 0];
    open[i + a + 1][j + b + 1] = true; // gap between the two nodes
    seen.add(a + ',' + b); stack.push([a, b]);
  }
  // a few extra openings (loops) and dead-end alcoves on the top and bottom rows, like the game's mazes
  for (let n = 0; n < 4; n++) { const k = 2 + 2 * (Math.random() * 8 | 0), m = 1 + 2 * (Math.random() * 3 | 0); open[k][m] = true; }
  for (let k = 1; k < NX; k += 2) { open[k][0] = Math.random() < .45; open[k][6] = Math.random() < .45; }
  const START = [1, 0], END = [17, 6];
  open[1][0] = open[17][6] = true;
  const isOpen = (k, m) => k >= 0 && k < NX && m >= 0 && m < NY && (k % 2 && m % 2 ? true : (k + m) % 2 ? open[k][m] : false);
  const path = [START];
  let dragging = false, finished = false;
  const head = () => path[path.length - 1];
  const stepTo = (k, m) => {
    // extend or retract one cell at a time towards the pointer cell
    for (let guard = 0; guard < 40 && !finished; guard++) {
      const [hk, hm] = head();
      if (hk === k && hm === m) return;
      const dk = Math.sign(k - hk), dm = Math.sign(m - hm);
      const tries = Math.abs(k - hk) >= Math.abs(m - hm) ? [[dk, 0], [0, dm]] : [[0, dm], [dk, 0]];
      let moved = false;
      for (const [a, b] of tries) {
        if (!a && !b) continue;
        const nk = hk + a, nm = hm + b;
        if (!isOpen(nk, nm)) continue;
        const prev = path[path.length - 2];
        if (prev && prev[0] === nk && prev[1] === nm) { path.pop(); moved = true; break; }
        if (path.some(([pk, pm]) => pk === nk && pm === nm)) continue;
        path.push([nk, nm]); moved = true;
        if (nk === END[0] && nm === END[1]) finished = true;
        break;
      }
      if (!moved) return;
    }
  };
  const cell = (x, y) => [Math.round((x - X0) / DX), Math.round((y - Y0) / DY)];
  stage(el, api, {
    box: [75, 58, 490, 240], close: [75, 75],
    down: (x, y) => { const [k, m] = cell(x, y), [hk, hm] = head(); if (Math.abs(k - hk) + Math.abs(m - hm) <= 2 || (y < 100 && Math.abs(x - 171) < 14)) { dragging = true; stepTo(k, m); } },
    move: (x, y, S) => { if (!dragging) return; const [k, m] = cell(x, y); stepTo(clamp(k, 0, NX - 1), clamp(m, 0, NY - 1)); if (finished) { dragging = false; S.complete(500); } },
    up: () => { dragging = false; },
    draw: (g, S) => {
      // slate casing with the base and its screws
      g.lineJoin = 'round';
      g.beginPath(); g.moveTo(108, 58); g.lineTo(532, 58); g.lineTo(566, 296); g.lineTo(74, 296); g.closePath();
      g.fillStyle = '#262b47'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#0d1020'; g.stroke();
      g.fillStyle = '#34405c'; g.fillRect(84, 270, 472, 26); g.strokeRect(84, 270, 472, 26);
      g.beginPath(); g.moveTo(178, 278); g.lineTo(462, 278); g.lineTo(470, 290); g.lineTo(170, 290); g.closePath(); g.fillStyle = '#3f4d6b'; g.fill(); g.lineWidth = 1.2; g.stroke();
      for (const [x, y] of [[117, 66], [522, 66], [88, 287], [552, 287]]) { g.beginPath(); g.ellipse(x, y, 6, 4, 0, 0, Math.PI * 2); g.fillStyle = '#7d8aa3'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#141a26'; g.stroke(); g.beginPath(); g.ellipse(x, y, 2.5, 1.6, 0, 0, Math.PI * 2); g.fillStyle = '#26303f'; g.fill(); }
      // blue bezel
      rrect(g, 120, 65, 402, 205, 6); g.fillStyle = '#3b6ab7'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#141c38'; g.stroke();
      g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(123, 68, 396, 3);
      g.strokeStyle = '#1f3c78'; g.lineWidth = 1.5;
      for (const [x0, y0, n] of [[466, 75, 9], [141, 241, 9], [416, 241, 9]]) for (let i = 0; i < n; i++) { g.beginPath(); g.moveTo(x0 + i * 4, y0); g.lineTo(x0 + i * 4, y0 + (y0 > 200 ? 14 : 10)); g.stroke(); }
      rrect(g, 277, 242, 56, 13, 6); g.lineWidth = 1.3; g.stroke();
      g.font = `bold 9px ${SANS}`; g.textAlign = 'center'; g.fillStyle = '#2a4f90'; g.fillText('MIRA', 305, 252.5);
      // maze
      g.fillStyle = '#0e0f12'; g.fillRect(135, 92, 371, 149);
      g.fillStyle = '#c4bea3'; g.fillRect(140, 97, 362, 140);
      // the drawn line under the posts
      if (path.length) {
        g.strokeStyle = '#ffffff'; g.lineWidth = 15; g.lineCap = 'square'; g.lineJoin = 'miter';
        g.beginPath(); g.moveTo(cx(1), 97); path.forEach(([k, m]) => g.lineTo(cx(k), cy(m))); if (finished) g.lineTo(cx(17), 237); g.stroke();
        g.lineCap = 'butt';
      }
      // walls between posts, then the posts
      g.fillStyle = '#4a463b';
      for (let k = 0; k < NX; k++) for (let m = 0; m < NY; m++) {
        if (k % 2 === 0 && m % 2 && !open[k][m]) g.fillRect(cx(k) - 4.5, cy(m - 1), 9, DY * 2);
        if (k % 2 && m % 2 === 0 && !open[k][m]) g.fillRect(cx(k - 1), cy(m) - 4.5, DX * 2, 9);
      }
      for (let k = 0; k < NX; k += 2) for (let m = 0; m < NY; m += 2) {
        const x = cx(k), y = cy(m);
        rrect(g, x - 11.5, y - 11.5, 23, 23, 3); g.fillStyle = '#5b5646'; g.fill();
        g.fillStyle = '#7f7a66'; g.fillRect(x - 8.5, y - 8.5, 17, 17);
        g.fillStyle = '#8f8a75'; g.fillRect(x - 5.5, y - 5.5, 11, 11);
      }
      // head of the line
      const [hk, hm] = head();
      if (!finished) { g.fillStyle = '#fff6b4'; g.fillRect(cx(hk) - 6.5, cy(hm) - 6.5, 13, 13); g.fillStyle = 'rgba(255,255,230,.9)'; g.fillRect(cx(hk) - 3.5, cy(hm) - 3.5, 7, 7); }
      // pulse rings on the target (and on the head when nothing is drawn yet)
      const ph = (S.t % 1.3) / 1.3;
      const ring = (x, y) => { for (const d of [0, .33, .66]) { const p = (ph + d) % 1; g.strokeStyle = `rgba(255,255,255,${.85 * (1 - p)})`; g.lineWidth = 2.2; g.beginPath(); g.arc(x, y, 3 + p * 20, 0, Math.PI * 2); g.stroke(); } };
      if (!finished) ring(cx(17), cy(6) + 10);
      // plugs and their wires
      g.strokeStyle = '#ffffff'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(171, 88); g.lineTo(171, 99); g.stroke();
      g.beginPath(); g.moveTo(471, 232); g.lineTo(471, 252); g.stroke();
      rrect(g, 163, 62, 16, 27, 3); g.fillStyle = '#ff8a35'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#2a1408'; g.stroke();
      g.fillStyle = '#ffb46e'; g.fillRect(166, 66, 4, 18);
      g.beginPath(); g.moveTo(463, 250); g.lineTo(479, 250); g.lineTo(479, 276); g.quadraticCurveTo(479, 284, 486, 286); g.lineTo(486, 292); g.lineTo(470, 292); g.quadraticCurveTo(463, 290, 463, 280); g.closePath();
      g.fillStyle = '#ff8a35'; g.fill(); g.strokeStyle = '#2a1408'; g.stroke();
    },
  });
}

// ------------------------------------------------------------------ Fix Weather Node, last step (Laboratory)
// six rocker switches; the one of the node repaired outside is off: flip it, its light turns yellow
const NODES = { node_comms: 'CA', node_o2: 'TB', node_lava: 'IRO', node_weapons: 'PD', node_specimen: 'GI', node_lab: 'MLG' };
const NODE_ORDER = ['CA', 'TB', 'IRO', 'PD', 'GI', 'MLG'];
export function weatherLab(el, api) {
  const fixed = NODES[api.task?.steps?.[0]?.console] || NODE_ORDER[Math.random() * 6 | 0];
  const target = NODE_ORDER.indexOf(fixed);
  let on = false, flip = 0;
  const rowY = i => 51 + i * 52;
  stage(el, api, {
    box: [127, 6, 387, 347], close: [103, 22],
    down: (x, y, S) => { if (on) return; const i = Math.round((y - 51) / 52); if (i === target && x > 160 && x < 236 && Math.abs(y - rowY(i)) < 20) { on = true; api.sfx?.('click'); S.complete(700); } },
    tick: (S, dt) => { if (on) flip = Math.min(1, flip + dt * 10); },
    draw: g => {
      rrect(g, 127, 6, 387, 347, 3); g.fillStyle = '#d1e6f3'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#3b4650'; g.stroke();
      g.fillStyle = '#9fb1bd'; for (const [x, y] of [[132, 12], [508, 12], [132, 347], [508, 347]]) { g.beginPath(); g.arc(x, y, 1.8, 0, Math.PI * 2); g.fill(); }
      NODE_ORDER.forEach((name, i) => {
        const y = rowY(i);
        const st = i === target ? (on ? flip : 0) : 1; // 1 = right half raised (on)
        rocker(g, 198, y, st);
        rrect(g, 245, y - 15, 200, 30, 2); g.fillStyle = '#a98ad9'; g.fill(); g.lineWidth = 3; g.strokeStyle = '#2b2b33'; g.stroke();
        outlined(g, `Node_${name}`, 345, y + 5, 13.5, { align: 'center', weight: 'bold', fill: '#2a1840', stroke: 'rgba(60,40,90,.35)', lw: 1.5 });
        const lit = i === target && on;
        if (lit) { const gl = g.createRadialGradient(469, y, 4, 469, y, 22); gl.addColorStop(0, 'rgba(255,240,140,.9)'); gl.addColorStop(1, 'rgba(255,240,140,0)'); g.fillStyle = gl; g.beginPath(); g.arc(469, y, 22, 0, Math.PI * 2); g.fill(); }
        g.beginPath(); g.arc(469, y, 16, 0, Math.PI * 2);
        const b = g.createRadialGradient(465, y - 5, 2, 469, y, 16);
        if (lit) { b.addColorStop(0, '#fffbe0'); b.addColorStop(1, '#ffe45a'); } else { b.addColorStop(0, '#a9a69b'); b.addColorStop(1, '#5f5d54'); }
        g.fillStyle = b; g.fill(); g.lineWidth = 2; g.strokeStyle = lit ? '#e2b52a' : '#3d3c36'; g.stroke();
        if (!lit) { g.fillStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.ellipse(472, y - 6, 4, 3, 0, 0, Math.PI * 2); g.fill(); }
      });
    },
  });
}
function rocker(g, x, y, st) {
  // two-half rocker, opened like a book: the raised half's top edge climbs away from the hinge
  const L = x - 34, R = x + 34, top = y - 13, bot = y + 17;
  g.lineJoin = 'round';
  const half = (x0, raise) => {
    const x1 = x;
    g.beginPath(); g.moveTo(x1, top); g.lineTo(x0, top - 7 * raise + 1.5 * (1 - raise)); g.lineTo(x0, bot - 2 * raise); g.lineTo(x1, bot); g.closePath();
    g.fillStyle = raise > .5 ? '#8a9da7' : '#5e737d'; g.fill(); g.lineWidth = 2.2; g.strokeStyle = '#25313a'; g.stroke();
    const xi = Math.min(x0, x1) + 4, w = Math.abs(x1 - x0) - 8;
    g.strokeStyle = raise > .5 ? 'rgba(220,232,236,.5)' : 'rgba(150,170,178,.45)'; g.lineWidth = 1;
    g.strokeRect(xi, top + 2, w, bot - top - 7);
  };
  half(L, 1 - st); half(R, st);
}

// ------------------------------------------------------------------ Record Temperature (Laboratory / outside)
// LOG column with up/down arrows (hold to run), READING column, thermometer; match the log to the reading
export function temperature(el, api) {
  const reading = Math.round(rnd(-40, 40));
  let log = reading + (Math.random() < .5 ? -1 : 1) * Math.round(rnd(12, 30));
  let held = 0, rep = 0, matchedAt = 0;
  const step = d => { log += d; api.sfx?.('tick'); };
  stage(el, api, {
    box: [128, 32, 382, 236], close: [105, 46],
    down: (x, y, S) => {
      if (x < 150 || x > 277) return;
      if (y > 90 && y < 133) held = 1; else if (y > 196 && y < 240) held = -1; else return;
      step(held); rep = .38;
    },
    up: () => { held = 0; },
    tick: (S, dt) => {
      if (held && (rep -= dt) <= 0) { step(held); rep = .07; }
      if (log === reading && !held) { matchedAt ||= S.t; if (S.t - matchedAt > .25) S.complete(500); } else matchedAt = 0;
    },
    draw: g => {
      // casing and the thermometer housing on its right
      rrect(g, 448, 42, 62, 208, 6); g.fillStyle = '#716c62'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#2b2924'; g.stroke();
      rrect(g, 128, 32, 326, 236, 8); g.fillStyle = '#6f6a61'; g.fill(); g.stroke();
      rrect(g, 134, 40, 314, 220, 6); g.fillStyle = '#827d72'; g.fill(); g.lineWidth = 1.2; g.strokeStyle = 'rgba(40,38,34,.5)'; g.stroke();
      g.fillStyle = '#6d695e'; for (const x of [156, 166, 410, 420]) { rrect(g, x, 255, 8, 4, 2); g.fill(); }
      // headers
      for (const [x, w, label] of [[145, 136, 'LOG'], [290, 143, 'READING']]) {
        rrect(g, x - 2, 48, w + 4, 204, 4); g.fillStyle = '#2b2d2c'; g.fill();
        g.fillStyle = '#90a3aa'; g.fillRect(x, 50, w, 27);
        mono(g, label, x + w / 2, 71, 11.5, 11, '#eef4f6', 'center');
      }
      // LOG
      const gr = g.createLinearGradient(0, 79, 0, 250); gr.addColorStop(0, '#3bab4f'); gr.addColorStop(1, '#2d9440');
      g.fillStyle = gr; g.fillRect(145, 79, 136, 171);
      const btn = (y0, h, upBtn, on) => {
        g.beginPath();
        if (g.roundRect) g.roundRect(150, y0, 127, h, upBtn ? [16, 16, 4, 4] : [4, 4, 16, 16]); else g.rect(150, y0, 127, h);
        g.fillStyle = on ? '#16c71c' : 'rgba(200,255,220,.38)'; g.fill();
        g.lineWidth = 2; g.strokeStyle = on ? '#0d8a12' : 'rgba(235,255,240,.85)'; g.stroke();
        const cy = y0 + h / 2;
        g.beginPath();
        if (upBtn) { g.moveTo(211, cy - 11); g.lineTo(224, cy + 11); g.lineTo(198, cy + 11); } else { g.moveTo(198, cy - 11); g.lineTo(224, cy - 11); g.lineTo(211, cy + 11); }
        g.closePath(); g.lineWidth = 2; g.strokeStyle = on ? '#0a7d10' : '#f2fff6'; g.stroke();
      };
      btn(90, 43, true, held === 1);
      btn(196, 44, false, held === -1);
      mono(g, String(log), 211, 173, 24, 17, '#ffffff', 'center'); mono(g, String(log), 211.6, 173, 24, 17, '#ffffff', 'center');
      g.textAlign = 'center';
      // READING
      const bl = g.createLinearGradient(0, 79, 0, 250); bl.addColorStop(0, '#1d4794'); bl.addColorStop(1, '#0e2563');
      g.fillStyle = bl; g.fillRect(290, 79, 143, 171);
      g.font = `27px ${SANS}`; g.fillStyle = '#e8f0ff'; g.fillText(String(reading), 357, 171);
      const tw = g.measureText(String(reading)).width;
      g.lineWidth = 2; g.strokeStyle = '#e8f0ff'; g.beginPath(); g.arc(357 + tw / 2 + 6, 148, 3, 0, Math.PI * 2); g.stroke();
      // thermometer
      rrect(g, 472, 61, 10, 145, 5); g.fillStyle = '#f4f6f8'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1e2024'; g.stroke();
      const lvl = 200 - (reading + 50) / 100 * 132;
      g.fillStyle = '#3b8de6'; g.fillRect(474.5, lvl, 5, 205 - lvl);
      g.fillStyle = '#e9ecef'; for (let i = 0; i < 25; i++) { const y = 66 + i * 5.4; g.fillRect(487, y, i % 5 ? 4 : 8, 1.2); }
      g.beginPath(); g.arc(478, 207, 14, 0, Math.PI * 2);
      const bb = g.createRadialGradient(474, 202, 2, 478, 207, 14); bb.addColorStop(0, '#9fd2ff'); bb.addColorStop(1, '#2f7fdc');
      g.fillStyle = bb; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1e2024'; g.stroke();
      g.fillStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.ellipse(483, 201, 4, 2.5, -.5, 0, Math.PI * 2); g.fill();
    },
  });
}

// ------------------------------------------------------------------ Align Telescope (Laboratory)
// round black eyepiece over the room, drag the sky until the object shown in the cream bubble is in the reticle
function drawPlanet(g, x, y, r) {
  g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.clip();
  g.fillStyle = '#b8743f'; g.fillRect(x - r, y - r, r * 2, r * 2);
  g.fillStyle = '#d99a5f'; g.beginPath(); g.ellipse(x + r * .25, y + r * .35, r * .7, r * .35, .3, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#4b2f5e';
  for (const [a, b, w, h, rot] of [[-.2, -.05, .8, .16, .15], [.3, .2, .6, .12, -.2], [-.4, .4, .5, .1, .3], [.1, -.35, .5, .1, .1]]) { g.beginPath(); g.ellipse(x + a * r, y + b * r, w * r, h * r, rot, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = '#f4f2ee';
  for (const [a, b, s] of [[-.45, -.55, .32], [-.15, -.7, .28], [.15, -.62, .22], [-.6, -.3, .2], [.35, -.45, .15]]) { g.beginPath(); g.arc(x + a * r, y + b * r, s * r, 0, Math.PI * 2); g.fill(); }
  g.restore();
  g.lineWidth = 2; g.strokeStyle = '#3a1f14'; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke();
}
function drawNebula(g, x, y, s) {
  g.save(); g.translate(x, y); g.rotate(-.5); g.scale(s, s);
  g.lineWidth = 1.5; g.strokeStyle = '#0c1d55';
  for (const [a, b, w, h, c] of [[0, -18, 14, 22, '#2347b8'], [-10, 6, 9, 26, '#1d3a9c'], [8, 8, 8, 28, '#2a56cc'], [-2, 26, 6, 18, '#1a338a'], [14, -2, 6, 20, '#3a6be0']]) { g.beginPath(); g.ellipse(a, b, w, h, a * .02, 0, Math.PI * 2); g.fillStyle = c; g.fill(); g.stroke(); }
  g.fillStyle = 'rgba(140,190,255,.7)'; for (const [a, b] of [[-3, -24], [6, -10], [-8, 4], [10, 14]]) { g.beginPath(); g.ellipse(a, b, 2, 5, 0, 0, Math.PI * 2); g.fill(); }
  g.restore();
}
function drawShip(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.lineJoin = 'round'; g.lineWidth = 1.6; g.strokeStyle = '#121418';
  g.beginPath(); g.moveTo(-34, -6); g.quadraticCurveTo(-30, -14, -12, -13); g.lineTo(26, -11); g.lineTo(36, -16); g.lineTo(38, -4); g.lineTo(28, 2); g.quadraticCurveTo(0, 6, -24, 4); g.lineTo(-28, 14); g.lineTo(-34, 12); g.closePath();
  g.fillStyle = '#5c6068'; g.fill(); g.stroke();
  g.fillStyle = '#9aa0a8'; g.beginPath(); g.moveTo(-28, -9); g.quadraticCurveTo(-20, -13, 22, -10); g.lineTo(20, -7); g.quadraticCurveTo(-10, -9, -28, -6); g.fill();
  g.fillStyle = '#2b2e34'; g.fillRect(-4, -6, 22, 4);
  g.strokeStyle = '#c9ced4'; g.lineWidth = 1; g.beginPath(); g.moveTo(36, -12); g.lineTo(44, -14); g.moveTo(36, -8); g.lineTo(46, -8); g.stroke();
  g.restore();
}
export function telescope(el, api) {
  const W = 900, H = 760;
  const stars = Array.from({ length: 260 }, () => [Math.random() * W, Math.random() * H, Math.random() < .12 ? rnd(1.2, 2) : rnd(.5, 1)]);
  const kinds = ['planet', 'nebula', 'ship'];
  const objs = [];
  const place = () => { for (let n = 0; n < 50; n++) { const p = [rnd(90, W - 90), rnd(90, H - 90)]; if (objs.every(o => Math.hypot(o.x - p[0], o.y - p[1]) > 170)) return p; } return [rnd(90, W - 90), rnd(90, H - 90)]; };
  for (const k of [...kinds, 'planet', 'nebula']) { const [x, y] = place(); objs.push({ k, x, y, s: rnd(.75, 1.1) }); }
  const target = objs[Math.random() * 3 | 0];
  // start with the sky away from the target
  let vx = clamp(W - target.x, 160, W - 160), vy = clamp(H - target.y, 150, H - 150), drag = null, held = 0;
  const C = [320, 178];
  const draw1 = (g, o, x, y, s = 1) => o.k === 'planet' ? drawPlanet(g, x, y, 44 * o.s * s) : o.k === 'nebula' ? drawNebula(g, x, y, 1.2 * o.s * s) : drawShip(g, x, y, 1.05 * s);
  stage(el, api, {
    box: [140, 0, 360, 360], close: [150, 14],
    down: (x, y) => { drag = [x, y, vx, vy]; },
    move: (x, y) => { if (drag) { vx = clamp(drag[2] - (x - drag[0]), 0, W); vy = clamp(drag[3] - (y - drag[1]), 0, H); } },
    up: () => { drag = null; },
    tick: (S, dt) => {
      const on = Math.hypot(target.x - vx, target.y - vy) < 14;
      held = on ? held + dt : 0;
      if (held > .5) S.complete(600);
    },
    draw: (g, S) => {
      g.save(); g.beginPath(); g.ellipse(320, 182, 178, 196, 0, 0, Math.PI * 2); g.fillStyle = '#000'; g.fill(); g.clip();
      g.translate(C[0] - vx, C[1] - vy);
      g.fillStyle = '#fff';
      for (const [x, y, r] of stars) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
      for (const o of objs) draw1(g, o, o.x, o.y);
      g.restore();
      const ok = held > 0;
      const col = ok ? '#22d32a' : '#d4f5e9';
      g.strokeStyle = col; g.lineWidth = 2.5; g.strokeRect(224, 100, 191, 161);
      g.lineWidth = 2;
      for (const [x, y, sx, sy] of [[232, 108, 1, 1], [407, 108, -1, 1], [232, 253, 1, -1], [407, 253, -1, -1]]) { g.beginPath(); g.moveTo(x, y + sy * 9); g.lineTo(x, y); g.lineTo(x + sx * 9, y); g.stroke(); }
      g.lineWidth = 2.5;
      g.lineWidth = 3;
      g.beginPath(); g.arc(320, 178, 44, Math.PI * .7, Math.PI * 1.3); g.stroke();
      g.beginPath(); g.arc(320, 178, 44, -Math.PI * .3, Math.PI * .3); g.stroke();
      // the object to find
      g.beginPath(); g.arc(475, 295, 60, 0, Math.PI * 2); g.fillStyle = '#fbf3d0'; g.fill();
      g.save(); g.beginPath(); g.arc(475, 295, 60, 0, Math.PI * 2); g.clip(); draw1(g, target, 475, 295, .9); g.restore();
    },
  });
}

// ------------------------------------------------------------------ Inspect Sample (Laboratory)
// press start: reagent fills the 5 tubes, the tray goes in ("TAKE A BREAK", ETA 60 s); afterwards the tray comes
// back with one anomalous tube: press the button under it
export function sample(el, api) {
  const TX = [245, 282.5, 320, 357.5, 395];
  const second = api.step?.game === 'sampleEnd';
  let localEnd = 0;
  const left = () => Math.max(api.left?.() ?? 0, localEnd - performance.now());
  let state = second ? (left() > 0 ? 'wait' : 'select') : 'idle', opened = second && !api.peek, filled = 0, tray = state === 'wait' ? 1 : 0, t0 = 0, bad = 0;
  const anomaly = Math.random() * 5 | 0;
  api.onStep = () => { opened = true; };
  const lcd = () => ({ idle: 'PRESS TO START  -->', fill: 'ADDING REAGENT', wait: 'TAKE A BREAK', select: bad > 0 ? 'BAD RESULT' : 'SELECT ANOMALY', done: 'THANK YOU!' }[state]);
  stage(el, api, {
    box: [180, 25, 280, 310], close: [154, 42],
    down: (x, y, S) => {
      if (state === 'idle' && x > 410 && x < 430 && y > 300 && y < 322) { state = 'fill'; t0 = S.t; api.sfx?.('click'); return; }
      if (state === 'select' && opened && tray < .05 && Math.abs(y - 282) < 12) {
        const i = TX.findIndex(tx => Math.abs(x - tx) < 12);
        if (i < 0) return;
        api.sfx?.('click');
        if (i === anomaly) { state = 'done'; S.complete(700); } else bad = 1.2;
      }
    },
    tick: (S, dt) => {
      bad = Math.max(0, bad - dt);
      if (state === 'fill') {
        filled = Math.min(5, (S.t - t0) / .45);
        if (filled >= 5 && S.t - t0 > 2.6) { state = 'wait'; localEnd = performance.now() + 60000; api.advance?.(); }
      }
      if (state === 'wait') { tray = Math.min(1, tray + dt * 2.5); if (left() <= 0) state = 'select'; }
      if (state === 'select' && !opened && S.t - (S.asked || -9) > 1) { S.asked = S.t; api.reopen?.(); }
      if (state === 'select' && opened) tray = Math.max(0, tray - dt * 2.5);
    },
    draw: g => {
      // walls, header and its ETA display
      g.fillStyle = '#c7c8cd'; g.fillRect(180, 25, 280, 310);
      g.fillStyle = '#d6d7db'; g.fillRect(180, 25, 280, 28);
      g.fillStyle = '#1b1d1d'; g.fillRect(260, 37, 120, 16);
      const eta = state === 'wait' || state === 'select' && !opened ? `ETA ${(left() / 1000).toFixed(4)}` : 'ETA (0)';
      mono(g, eta, 264, 50, 9, 8.4, '#22c43c');
      // chamber with its dome
      g.fillStyle = '#7e7f86'; g.fillRect(216, 60, 208, 205);
      g.fillStyle = '#9b9ca3'; g.beginPath(); g.moveTo(220, 265); g.lineTo(220, 110); g.quadraticCurveTo(222, 62, 280, 60); g.lineTo(360, 60); g.quadraticCurveTo(418, 62, 420, 110); g.lineTo(420, 265); g.fill();
      g.fillStyle = '#d3d4d8';
      g.beginPath(); g.moveTo(180, 240); g.quadraticCurveTo(190, 120, 210, 112); g.quadraticCurveTo(222, 120, 216, 240); g.fill();
      g.beginPath(); g.moveTo(460, 240); g.quadraticCurveTo(450, 120, 430, 112); g.quadraticCurveTo(418, 120, 424, 240); g.fill();
      g.strokeStyle = '#3a3b40'; g.lineWidth = 1.5; g.strokeRect(216, 60, 208, 205);
      // dropper
      g.fillStyle = '#cfd0d4'; g.beginPath(); g.moveTo(236, 60); g.lineTo(252, 60); g.lineTo(249, 72); g.lineTo(239, 72); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#9fa0a6'; g.fillRect(241, 72, 6, 8); g.strokeRect(241, 72, 6, 8);
      // the dark floor seen when the tray is in
      g.fillStyle = '#c3c4c9'; g.fillRect(180, 236, 280, 29); g.fillStyle = '#5a5b61'; g.fillRect(180, 233, 280, 4);
      g.save(); g.globalAlpha = tray;
      g.fillStyle = '#4b4c53'; g.beginPath(); g.moveTo(216, 180); g.lineTo(424, 180); g.lineTo(460, 240); g.lineTo(460, 265); g.lineTo(180, 265); g.lineTo(180, 240); g.closePath(); g.fill();
      g.strokeStyle = '#2b2c31'; g.stroke(); g.restore();
      // tray with tubes, sliding back into the machine
      if (tray < 1) {
        g.save(); g.globalAlpha = 1 - tray; g.translate(0, -tray * 30); const sc = 1 - tray * .25; g.translate(320, 200); g.scale(sc, sc); g.translate(-320, -200);
        g.fillStyle = 'rgba(225,238,245,.55)'; g.beginPath(); g.moveTo(206, 152); g.lineTo(434, 152); g.lineTo(450, 192); g.lineTo(190, 192); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(70,80,90,.8)'; g.lineWidth = 1.2; g.stroke();
        TX.forEach((x, i) => {
          g.fillStyle = 'rgba(60,70,80,.55)'; g.beginPath(); g.ellipse(x, 215, 9, 3.5, 0, 0, Math.PI * 2); g.fill();
          g.fillStyle = 'rgba(70,80,90,.6)'; g.beginPath(); g.ellipse(x, 165, 10, 3.5, 0, 0, Math.PI * 2); g.fill();
          const lvl = state === 'select' || state === 'done' ? 1 : clamp(filled - i, 0, 1);
          const liquid = state === 'select' || state === 'done' ? (i === anomaly ? '#e0302f' : '#4b5ee8') : lvl > 0 ? '#4b5ee8' : '#f4f6f8';
          rrect(g, x - 9, 127, 18, 78, [3, 3, 9, 9]); g.fillStyle = 'rgba(235,242,248,.7)'; g.fill();
          g.save(); rrect(g, x - 8, 128, 16, 76, [3, 3, 8, 8]); g.clip();
          g.fillStyle = '#f4f6f8'; g.fillRect(x - 8, 150, 16, 55);
          if (lvl > 0) { g.fillStyle = liquid; g.fillRect(x - 8, 205 - 55 * lvl, 16, 55 * lvl); }
          g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(x - 5, 132, 3, 66);
          g.restore();
          rrect(g, x - 9, 127, 18, 78, [3, 3, 9, 9]); g.lineWidth = 1.4; g.strokeStyle = '#596069'; g.stroke();
          g.beginPath(); g.ellipse(x, 127, 9, 2.5, 0, 0, Math.PI * 2); g.strokeStyle = '#8a929b'; g.stroke();
        });
        g.fillStyle = 'rgba(225,238,245,.35)'; g.beginPath(); g.moveTo(190, 192); g.lineTo(450, 192); g.lineTo(460, 235); g.lineTo(180, 235); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(70,80,90,.8)'; g.lineWidth = 1.2; g.stroke();
        g.restore();
      }
      // control panel
      g.fillStyle = '#c9cace'; g.fillRect(180, 265, 280, 70);
      g.fillStyle = '#e3e4e7'; g.fillRect(180, 265, 280, 3);
      g.strokeStyle = '#3a3b40'; g.lineWidth = 1.5; g.strokeRect(180, 265, 280, 70);
      TX.forEach(x => {
        g.beginPath(); g.arc(x, 282, 9, 0, Math.PI * 2); g.fillStyle = '#5e6066'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#232428'; g.stroke();
        g.beginPath(); g.arc(x, 282, 6.5, 0, Math.PI * 2); g.fillStyle = '#b3b5ba'; g.fill();
        g.beginPath(); g.arc(x, 282, 4.5, 0, Math.PI * 2); g.fillStyle = '#8b8d93'; g.fill(); g.strokeStyle = '#4a4c51'; g.lineWidth = 1; g.stroke();
      });
      g.fillStyle = '#1b1d1d'; g.fillRect(236, 302, 168, 18);
      mono(g, lcd(), 241, 316, 9.5, 8.6, '#22c43c');
      g.fillStyle = state === 'idle' ? '#22c32a' : '#e9eaec'; g.fillRect(412, 302, 16, 18);
      g.lineWidth = 1.6; g.strokeStyle = '#1b1d1d'; g.strokeRect(412, 302, 16, 18);
    },
  });
}
export const sampleEnd = sample;

// ------------------------------------------------------------------ Submit Scan (SCAN-MO-TRON-2000)
// two light blue boxes around the player standing on the scanner; the readings appear one by one in 10 s
export function scan(el, api) {
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const id = Array.from({ length: 4 }, () => L[Math.random() * 26 | 0]).join('') + (Math.random() * 10 | 0);
  const ft = 3, inch = Math.random() * 12 | 0, wt = 80 + (Math.random() * 30 | 0);
  const bt = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'][Math.random() * 8 | 0];
  const col = String(api.me?.color || 'white').toUpperCase();
  const DUR = 10;
  let t = 0;
  const box = (g, x, y, w, h) => {
    rrect(g, x, y, w, h, 3);
    const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, '#9ec7d6'); gr.addColorStop(.12, '#d4ebf2'); gr.addColorStop(.85, '#c2dfea'); gr.addColorStop(1, '#8db8c9');
    g.fillStyle = gr; g.fill(); g.lineWidth = 2; g.strokeStyle = '#2a3a44'; g.stroke();
  };
  stage(el, api, {
    box: [170, 37, 300, 291], close: [152, 52],
    tick: (S, dt) => { if (!S.done) { t += dt; if (t >= DUR + .2) S.complete(500); } },
    draw: g => {
      box(g, 170, 37, 300, 105);
      g.fillStyle = '#7fb2c6'; g.fillRect(232, 46, 8, 14); g.fillStyle = '#5d93a9'; g.fillRect(236, 50, 8, 8);
      mono(g, 'SCAN-MO-TRON-2000', 322, 59, 9.5, 9.6, '#3c4a52', 'center');
      g.fillStyle = '#000'; rrect(g, 183, 68, 275, 65, 3); g.fill();
      const parts = [[`ID: ${id}`, 192, 91, 0], [`HT: ${ft}' ${inch}"`, 300, 91, 1.6], [`WT: ${wt}lb`, 395, 91, 3.6], [`C: ${col}`, 192, 109, 5.2], [`BT: ${bt}`, 300, 109, 7]];
      g.font = `14px ${SANS}`; g.fillStyle = '#f2f2f2'; g.textAlign = 'left';
      for (const [s, x, y, at] of parts) if (t >= at + .4) { const n = Math.min(s.length, Math.floor((t - at - .4) * 14) + 1); g.fillText(s.slice(0, n), x, y); }
      box(g, 170, 238, 300, 90);
      g.fillStyle = '#000'; rrect(g, 183, 247, 275, 22, 2); g.fill();
      g.fillStyle = '#10a514'; g.fillRect(185, 249, 271 * Math.min(1, t / DUR), 18);
      g.fillStyle = '#000'; rrect(g, 183, 281, 275, 36, 2); g.fill();
      g.font = `14px ${SANS}`; g.fillStyle = '#f2f2f2'; g.fillText(`Scan Complete in ${Math.max(0, Math.ceil(DUR - t - .001))}`, 192, 305);
    },
  });
}

// ------------------------------------------------------------------ Repair Drill (Laboratory)
// tablet showing the drill bit in wireframe; tap each red warning box until it disappears
export function drill(el, api) {
  const boxes = [[262.5, 78.5], [377.5, 78.5], [262.5, 271], [377.5, 271]].map(([x, y]) => ({ x, y, hits: 4 }));
  let good = 0;
  stage(el, api, {
    box: [210, 7, 222, 350], close: [185, 23],
    down: (x, y, S) => {
      for (const b of boxes) {
        const s = .55 + .45 * b.hits / 4;
        if (b.hits > 0 && Math.abs(x - b.x) < 28 * s && Math.abs(y - b.y) < 34 * s) { b.hits--; api.sfx?.('click'); break; }
      }
      if (!good && boxes.every(b => !b.hits)) { good = S.t; S.complete(700); }
    },
    draw: (g, S) => {
      // tablet
      rrect(g, 205, 7, 227, 356, 20); g.fillStyle = '#939ca7'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#25282d'; g.stroke();
      rrect(g, 209, 11, 219, 348, 17); g.lineWidth = 1.5; g.strokeStyle = 'rgba(255,255,255,.45)'; g.stroke();
      g.fillStyle = '#25282d'; rrect(g, 300, 15, 20, 4, 2); g.fill(); rrect(g, 300, 343, 20, 5, 2.5); g.fill();
      g.fillStyle = '#8f949c'; rrect(g, 432, 55, 5, 16, 2); g.fill(); g.stroke(); rrect(g, 432, 128, 5, 16, 2); g.fill(); g.stroke();
      rrect(g, 221, 27, 196, 308, 12);
      const bl = g.createLinearGradient(0, 27, 0, 335); bl.addColorStop(0, '#3a66ee'); bl.addColorStop(1, '#1e3ec6');
      g.fillStyle = bl; g.fill(); g.lineWidth = 2; g.strokeStyle = '#121a3a'; g.stroke();
      // frame with corner marks
      g.strokeStyle = '#e8f0ff'; g.lineWidth = 1.5; g.strokeRect(250, 62, 140, 226);
      g.lineWidth = 2;
      for (const [x, y, sx, sy] of [[244, 56, 1, 1], [396, 56, -1, 1], [244, 294, 1, -1], [396, 294, -1, -1]]) { g.beginPath(); g.moveTo(x, y + sy * 8); g.lineTo(x, y); g.lineTo(x + sx * 8, y); g.stroke(); }
      // wireframe bit: round top, long body, tapering bottom
      g.save(); g.strokeStyle = 'rgba(235,245,255,.95)'; g.lineWidth = .9;
      const half = y => y < 118 ? 30 * Math.sqrt(Math.max(0, 1 - Math.pow((118 - y) / 30, 2))) : y < 222 ? 30 : 30 - (y - 222) / 50 * 14;
      g.beginPath();
      for (let y = 90; y <= 272; y += 6.5) { const h = half(y); if (h > .5) { g.moveTo(320 - h, y); g.lineTo(320 + h, y); } }
      for (let i = -5; i <= 5; i++) { g.moveTo(320, 88); for (let y = 88; y <= 272; y += 2) { const h = half(y); g.lineTo(320 + h * i / 5, y); } }
      g.stroke();
      g.beginPath(); for (let y = 88; y <= 272; y += 2) g.lineTo(320 - half(y), y); for (let y = 272; y >= 88; y -= 2) g.lineTo(320 + half(y), y); g.lineWidth = 1.4; g.stroke();
      g.restore();
      // warnings
      const blink = Math.floor(S.t * 2.2) % 2 === 0;
      for (const b of boxes) {
        if (!b.hits) continue;
        const s = .55 + .45 * b.hits / 4, w = 55 * s, h = 66 * s;
        g.fillStyle = 'rgba(236,150,175,.55)'; g.fillRect(b.x - w / 2, b.y - h / 2, w, h);
        g.lineWidth = 3; g.strokeStyle = '#e8333a'; g.strokeRect(b.x - w / 2, b.y - h / 2, w, h);
        if (blink) outlined(g, '!', b.x, b.y + 12 * s, 34 * s, { align: 'center', weight: 'bold', stroke: '#e8333a', lw: 3 });
      }
      mono(g, 'Status:', 265, 327, 10, 9.6, '#ffffff');
      const ok = boxes.every(b => !b.hits);
      if (ok || blink || true) mono(g, ok ? 'GOOD' : 'BAD', 340, 327, 10, 9.6, ok ? '#3ce04a' : '#ff2a2a');
    },
  });
}

// ------------------------------------------------------------------ Chart Course (Dropship)
// blue star chart; drag the little ship along the dashed route through each waypoint to the destination
export function chart(el, api) {
  const XS = [188, 254, 320, 385, 451];
  const pts = XS.map((x, i) => [x, i === 0 || i === 4 ? rnd(200, 245) : rnd(115, 245)]);
  const stars = Array.from({ length: 90 }, () => [rnd(154, 493), rnd(86, 273), Math.random() < .2 ? 1.1 : .6, Math.random() < .3]);
  let seg = 0, f = 0, drag = false, ang = 0;
  const pos = () => { const a = pts[seg], b = pts[Math.min(4, seg + 1)]; return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; };
  const burst = (g, x, y, r, t) => {
    g.save(); g.translate(x, y); g.rotate(t * .8);
    g.strokeStyle = '#ffffff'; g.lineWidth = 2.4; g.lineCap = 'butt';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; g.beginPath(); g.moveTo(Math.cos(a) * r * .62, Math.sin(a) * r * .62); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); g.stroke(); }
    g.restore();
    g.beginPath(); g.arc(x, y, r * .36, 0, Math.PI * 2); g.fillStyle = '#4ea8f0'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#1b5fae'; g.stroke();
  };
  stage(el, api, {
    box: [135, 67, 372, 223], close: [124, 84],
    down: (x, y) => { const [sx, sy] = pos(); if (Math.hypot(x - sx, y - sy) < 18) drag = true; },
    move: (x, y, S) => {
      if (!drag || seg >= 4) return;
      // project the pointer on the current leg; reaching its end moves on to the next leg
      for (let n = 0; n < 2 && seg < 4; n++) {
        const a = pts[seg], b = pts[seg + 1], dx = b[0] - a[0], dy = b[1] - a[1];
        const k = clamp(((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy), 0, 1);
        const px = a[0] + dx * k, py = a[1] + dy * k;
        if (Math.hypot(x - px, y - py) > 40) return;
        f = Math.max(f, k); ang = Math.atan2(dy, dx);
        if (f >= .98) { seg++; f = 0; api.sfx?.('click'); if (seg >= 4) { drag = false; S.complete(700); } }
        else return;
      }
    },
    up: () => { drag = false; },
    draw: (g, S) => {
      rrect(g, 135, 67, 372, 223, 5);
      const m = g.createLinearGradient(0, 67, 0, 290); m.addColorStop(0, '#dfe2e5'); m.addColorStop(1, '#a4aab0');
      g.fillStyle = m; g.fill(); g.lineWidth = 2; g.strokeStyle = '#25292d'; g.stroke();
      rrect(g, 140, 72, 362, 213, 4); g.lineWidth = 1.2; g.strokeStyle = 'rgba(255,255,255,.6)'; g.stroke();
      rrect(g, 147, 79, 347, 201, 7); g.fillStyle = '#16191c'; g.fill();
      rrect(g, 150, 82, 341, 195, 6); g.fillStyle = '#2b8fe2'; g.fill();
      for (const [x, y, r, b] of stars) { g.fillStyle = b ? '#9fd3ff' : '#ffffff'; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
      // route: travelled legs in white, the rest in dark blue
      g.lineWidth = 1.6;
      for (let i = 0; i < 4; i++) {
        const a = pts[i], b = pts[i + 1];
        const done = i < seg ? 1 : i === seg ? f : 0;
        g.setLineDash([4, 3]); g.strokeStyle = '#1b5aa6';
        g.beginPath(); g.moveTo(a[0] + (b[0] - a[0]) * done, a[1] + (b[1] - a[1]) * done); g.lineTo(b[0], b[1]); g.stroke();
        if (done > 0) { g.setLineDash([5, 3]); g.strokeStyle = '#ffffff'; g.lineWidth = 2; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(a[0] + (b[0] - a[0]) * done, a[1] + (b[1] - a[1]) * done); g.stroke(); g.lineWidth = 1.6; }
      }
      g.setLineDash([]);
      pts.forEach(([x, y], i) => {
        if (i === 0 || i <= seg) { g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.fillStyle = '#2b8fe2'; g.fill(); g.lineWidth = 1.6; g.strokeStyle = '#fff'; g.stroke(); return; }
        if (i === 4) { g.beginPath(); g.arc(x, y, 24, 0, Math.PI * 2); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke(); }
        burst(g, x, y, 15, S.t);
      });
      const [sx, sy] = pos();
      g.save(); g.translate(sx, sy); g.rotate(ang);
      g.fillStyle = '#e9f4ff'; g.strokeStyle = '#ffffff'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(13, 0); g.lineTo(4, -6); g.lineTo(-9, -7); g.lineTo(-12, -2); g.lineTo(-12, 2); g.lineTo(-9, 7); g.lineTo(4, 6); g.closePath();
      g.fillStyle = '#5ea7e8'; g.fill(); g.stroke();
      g.beginPath(); g.moveTo(-3, -6); g.lineTo(-7, -11); g.moveTo(-3, 6); g.lineTo(-7, 11); g.moveTo(2, -2); g.lineTo(8, 0); g.lineTo(2, 2); g.stroke();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Insert Keys (Dropship)
// drag the key from its ring into the glowing keyhole, then turn it
export function keys(el, api) {
  const COLS = [307.5, 403, 500], ROWS = [61, 121, 181, 241, 301];
  const slot = [COLS[Math.random() * 3 | 0], ROWS[Math.random() * 5 | 0]];
  let state = 'ring', kx = 0, ky = 0, turn = 0, drag = null;
  stage(el, api, {
    box: [120, 14, 414, 330], close: [104, 22],
    down: (x, y) => {
      if (state === 'ring' && x > 120 && x < 185 && y > 210 && y < 330) { state = 'drag'; kx = x; ky = y; }
      else if (state === 'in') drag = [x, y];
    },
    move: (x, y, S) => {
      if (state === 'drag') { kx = x; ky = y; if (Math.hypot(x - slot[0], y - slot[1]) < 18) { state = 'in'; api.sfx?.('click'); } }
      else if (state === 'in' && drag) { turn = clamp((x - drag[0]) / 30, 0, 1); if (turn >= 1) { state = 'done'; api.sfx?.('click'); S.complete(700); } }
    },
    up: (x, y, S) => {
      if (state === 'drag') state = 'ring';
      if (state === 'in' && drag) { if (Math.hypot(x - drag[0], y - drag[1]) < 4) { state = 'done'; turn = 1; api.sfx?.('click'); S.complete(700); } else turn = 0; drag = null; }
    },
    draw: g => {
      for (const x of COLS) {
        rrect(g, x - 34, 14, 67, 330, 2); g.fillStyle = '#d3d6da'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#2a2d31'; g.stroke();
        g.fillStyle = '#9aa0a6'; g.beginPath(); g.arc(x, 21, 2, 0, Math.PI * 2); g.arc(x, 336, 2, 0, Math.PI * 2); g.fill();
        for (const y of ROWS) {
          const hl = x === slot[0] && y === slot[1] && state !== 'done';
          if (hl) { g.beginPath(); g.arc(x, y, 30, 0, Math.PI * 2); g.lineWidth = 5; g.strokeStyle = 'rgba(255,150,30,.9)'; g.stroke(); g.lineWidth = 2; g.strokeStyle = 'rgba(255,220,120,.9)'; g.stroke(); }
          g.beginPath(); g.arc(x, y, 26, 0, Math.PI * 2); g.fillStyle = '#16181b'; g.fill();
          g.beginPath(); g.arc(x, y, 22.5, 0, Math.PI * 2); g.fillStyle = '#6e737a'; g.fill();
          g.beginPath(); g.arc(x, y, 19, 0, Math.PI * 2); const gr = g.createRadialGradient(x - 5, y - 6, 2, x, y, 19); gr.addColorStop(0, '#b6bcc2'); gr.addColorStop(1, '#8a9097'); g.fillStyle = gr; g.fill();
          g.strokeStyle = '#141619'; g.lineWidth = 2.4; g.beginPath(); g.moveTo(x, y - 13); g.lineTo(x, y - 5); g.lineTo(x - 3, y - 2); g.lineTo(x + 1, y + 2); g.lineTo(x - 1, y + 6); g.lineTo(x - 1, y + 12); g.stroke();
        }
      }
      // inserted key head, seen from the end
      if (state === 'in' || state === 'done') {
        g.save(); g.translate(slot[0], slot[1]); g.rotate(turn * Math.PI / 2);
        rrect(g, -8, -27, 16, 54, 7); g.fillStyle = '#2c2f33'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#0d0e10'; g.stroke();
        g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(-4, -22, 3, 44);
        g.restore();
      }
      // key ring with its chain and fob
      const hx = state === 'drag' ? kx : 148, hy = state === 'drag' ? ky : 210;
      g.strokeStyle = '#c9cdd2'; g.lineWidth = 2.5;
      for (let i = 0; i < 7; i++) { g.beginPath(); g.ellipse(160 - i * 3.5, 82 + i * 9, 3, 5, .3, 0, Math.PI * 2); g.stroke(); }
      g.beginPath(); g.ellipse(150, 205, 21, 30, 0, 0, Math.PI * 2); g.lineWidth = 3.5; g.strokeStyle = '#d5d9de'; g.stroke(); g.lineWidth = 1; g.strokeStyle = '#4b4f55'; g.stroke();
      // brass key always on the ring, the black-headed one is the key to use
      g.save(); g.translate(132, 238); g.rotate(.12);
      g.fillStyle = '#c9a77c'; g.strokeStyle = '#5a452c'; g.lineWidth = 1.5;
      g.beginPath(); g.arc(0, 8, 11, 0, Math.PI * 2); g.fill(); g.stroke();
      g.beginPath(); g.arc(0, 4, 4, 0, Math.PI * 2); g.fillStyle = '#3a3f46'; g.fill();
      g.fillStyle = '#c9a77c'; g.fillRect(-3, 18, 7, 80); g.strokeRect(-3, 18, 7, 80);
      g.fillRect(-9, 70, 6, 5); g.fillRect(-9, 82, 6, 5); g.strokeRect(-9, 70, 6, 5); g.strokeRect(-9, 82, 6, 5);
      g.restore();
      if (state === 'ring' || state === 'drag') {
        g.save(); g.translate(hx + (state === 'drag' ? 0 : 12), hy + (state === 'drag' ? 0 : 30)); g.rotate(state === 'drag' ? 0 : -.08);
        g.fillStyle = '#e1e4e8'; g.strokeStyle = '#4b4f55'; g.lineWidth = 1.5;
        g.fillRect(-3, 14, 8, 68); g.strokeRect(-3, 14, 8, 68); g.fillRect(5, 50, 5, 5); g.fillRect(5, 62, 6, 5); g.strokeRect(5, 50, 5, 5); g.strokeRect(5, 62, 6, 5);
        rrect(g, -13, -16, 26, 34, 8); g.fillStyle = '#2c2f33'; g.fill(); g.strokeStyle = '#0d0e10'; g.lineWidth = 2; g.stroke();
        g.beginPath(); g.arc(0, -6, 4, 0, Math.PI * 2); g.fillStyle = '#6a7078'; g.fill();
        g.restore();
      }
      // fob
      g.save(); g.translate(185, 58);
      g.beginPath(); g.moveTo(-28, 4); g.quadraticCurveTo(-26, -20, 0, -20); g.quadraticCurveTo(20, -20, 34, -14); g.lineTo(28, -5); g.lineTo(36, 2); g.lineTo(28, 8); g.lineTo(34, 16); g.quadraticCurveTo(10, 22, -10, 20); g.quadraticCurveTo(-26, 18, -28, 4);
      g.fillStyle = '#2fc04e'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#0d2412'; g.stroke();
      g.beginPath(); g.arc(-12, -4, 10, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); g.lineWidth = 2; g.stroke();
      g.beginPath(); g.arc(-10, -4, 5, 0, Math.PI * 2); g.fillStyle = '#111'; g.fill();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Fuel Engines (Storage jerrycan, then engines)
// grey REFUEL STATION panel; hold the white button to fill the jerrycan, then to pour it into the engine tube
function refuelPanel(g, filling, full) {
  g.fillStyle = '#5a5e63'; g.fillRect(222, 32, 198, 296); g.lineWidth = 2; g.strokeStyle = '#1d1f22'; g.strokeRect(222, 32, 198, 296);
  g.save(); g.translate(321, 318);
  g.font = `bold 34px Impact, "Arial Narrow", "Liberation Sans Narrow", sans-serif`; g.textAlign = 'center';
  const w = g.measureText('REFUEL STATION').width; g.scale(188 / w, 1);
  g.lineJoin = 'round'; g.lineWidth = 2.6; g.strokeStyle = '#1b1c1e'; g.strokeText('REFUEL STATION', 0, 0);
  g.fillStyle = '#62666b'; g.fillText('REFUEL STATION', 0, 0);
  g.restore();
  // pipes and the button box with its two lamps
  g.fillStyle = '#d0451e'; g.fillRect(420, 279, 33, 7); g.fillRect(420, 292, 33, 7);
  g.strokeStyle = '#2a0e05'; g.lineWidth = 1.2; g.strokeRect(420, 279, 33, 7); g.strokeRect(420, 292, 33, 7);
  g.fillStyle = '#4a4d51'; g.fillRect(452, 258, 68, 68); g.lineWidth = 2; g.strokeStyle = '#141517'; g.strokeRect(452, 258, 68, 68);
  for (const [x, on, c] of [[470, filling, '#ff4a1e'], [504, full, '#2fe04a']]) {
    g.beginPath(); g.arc(x, 252, 6, Math.PI, 0); g.lineTo(x + 6, 257); g.lineTo(x - 6, 257); g.closePath();
    g.fillStyle = on ? c : (c === '#ff4a1e' ? '#7a2615' : '#1d5a26'); g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#141517'; g.stroke();
  }
  rrect(g, 465, 269, 44, 46, 4); g.fillStyle = filling ? '#b9b9b9' : '#8e8e8e'; g.fill(); g.strokeStyle = '#141517'; g.stroke();
  rrect(g, 471, 274, 32, 35, 3); g.fillStyle = filling ? '#d2d2d2' : '#e2e2e2'; g.fill();
}
function glowPath(g, path) {
  path(); g.lineJoin = 'round'; g.lineWidth = 7; g.strokeStyle = '#e8401a'; g.stroke();
  path(); g.lineWidth = 2.5; g.strokeStyle = '#fff4ec'; g.stroke();
}
export function fuelFill(el, api) { refuel(el, api, false); }
export function fuelPour(el, api) { refuel(el, api, true); }
function refuel(el, api, pour) {
  let level = 0, holding = false, doneAt = 0;
  const DUR = 3.2;
  const onBtn = (x, y) => x > 462 && x < 512 && y > 266 && y < 318;
  stage(el, api, {
    box: [222, 32, 298, 296], close: [200, 45],
    down: (x, y) => { if (onBtn(x, y)) { holding = true; api.sfx?.('fuel'); } },
    move: (x, y) => { if (holding && !onBtn(x, y)) holding = false; },
    up: () => { holding = false; },
    tick: (S, dt) => {
      if (holding && level < 1) level = Math.min(1, level + dt / DUR);
      if (level >= 1 && !doneAt) { doneAt = S.t; holding = false; S.complete(600); }
    },
    draw: g => {
      refuelPanel(g, holding && level < 1, level >= 1);
      if (!pour) {
        const can = () => { g.beginPath(); g.moveTo(258, 108); g.lineTo(236, 70); g.lineTo(242, 63); g.lineTo(276, 99); g.lineTo(287, 76); g.lineTo(355, 76); g.lineTo(370, 100); g.lineTo(386, 113); g.lineTo(386, 243); g.lineTo(372, 257); g.lineTo(270, 257); g.lineTo(257, 243); g.closePath(); };
        can(); g.fillStyle = '#000'; g.fill();
        g.save(); can(); g.clip(); g.fillStyle = '#d6a40b'; const top = 257 - (257 - 108) * level; g.fillRect(250, top, 140, 260 - top); g.restore();
        g.beginPath(); rrect(g, 296, 82, 50, 12, 3); g.fillStyle = '#5a5e63'; g.fill();
        glowPath(g, can);
        glowPath(g, () => rrect(g, 296, 82, 50, 12, 3));
        g.fillStyle = '#ffffff'; for (const [y, long] of [[122, 1], [152, 0], [182, 1], [212, 0], [242, 1]]) for (let i = 0; i < (long ? 5 : 3); i++) g.fillRect(259 + i * 4.2, y - 1, 2.8, 2);
      } else {
        const tube = () => rrect(g, 290, 86, 50, 189, [3, 3, 25, 25]);
        tube(); g.fillStyle = '#000'; g.fill();
        g.save(); tube(); g.clip(); const top = 275 - 189 * level; g.fillStyle = '#d6a40b'; g.fillRect(288, top, 54, 276 - top); g.restore();
        glowPath(g, tube);
        g.fillStyle = '#ffffff'; for (const [y, long] of [[114, 0], [141, 1], [168, 0], [195, 1], [222, 0], [249, 1]]) for (let i = 0; i < (long ? 5 : 3); i++) g.fillRect(293 + i * 4.2, y - 1, 2.8, 2);
        // the jerrycan tipped over the tube, emptying
        g.save(); g.translate(347, 62); g.rotate(.45);
        const ic = () => { g.beginPath(); g.moveTo(-18, -12); g.lineTo(-30, -16); g.lineTo(-31, -11); g.lineTo(-20, -6); g.lineTo(-20, 16); g.lineTo(18, 16); g.lineTo(18, -10); g.lineTo(10, -16); g.lineTo(-12, -16); g.closePath(); };
        ic(); g.fillStyle = '#000'; g.fill();
        g.save(); ic(); g.clip(); g.fillStyle = '#d6a40b'; g.fillRect(-32, -18 + 34 * level, 52, 40); g.restore();
        ic(); g.lineWidth = 3; g.strokeStyle = '#fff'; g.stroke();
        g.fillStyle = '#fff'; for (let i = 0; i < 3; i++) g.fillRect(10, -6 + i * 7, 5, 1.6);
        g.restore();
      }
    },
  });
}

// ------------------------------------------------------------------ Replace Water Jug (Boiler Room, then Office)
// press the red button (it turns blue): the full jug on the right empties into the one on the left
export function jugFill(el, api) {
  let on = false, k = 0;
  // one jug outline (neck up, local coordinates: x ±84, y 0..232); the dispenser jug is the same one upside down
  const shape = g => {
    g.beginPath(); g.moveTo(-26, 0); g.lineTo(26, 0); g.quadraticCurveTo(22, 10, 30, 16); g.quadraticCurveTo(40, 21, 46, 24);
    g.quadraticCurveTo(84, 30, 84, 56); g.lineTo(80, 196); g.quadraticCurveTo(86, 210, 82, 224); g.quadraticCurveTo(80, 232, 70, 232);
    g.lineTo(-70, 232); g.quadraticCurveTo(-80, 232, -82, 224); g.quadraticCurveTo(-86, 210, -80, 196); g.lineTo(-84, 56);
    g.quadraticCurveTo(-84, 30, -46, 24); g.quadraticCurveTo(-40, 21, -30, 16); g.quadraticCurveTo(-22, 10, -26, 0); g.closePath();
  };
  const jug = (g, cx, flip, level) => {
    g.save(); g.translate(cx, flip ? 338 : 106); if (flip) g.scale(1, -1);
    shape(g); g.lineJoin = 'round'; g.lineWidth = 15; g.strokeStyle = '#173a6e'; g.stroke(); g.lineWidth = 11; g.strokeStyle = '#4a80cc'; g.stroke();
    shape(g); const gr = g.createLinearGradient(-84, 0, 84, 0); gr.addColorStop(0, '#2a589a'); gr.addColorStop(.42, '#5486c6'); gr.addColorStop(1, '#2a589a'); g.fillStyle = gr; g.fill();
    g.restore();
    // water always lies at the bottom of the screen
    g.save(); g.translate(cx, flip ? 338 : 106); if (flip) g.scale(1, -1); shape(g); g.restore();
    g.save(); g.clip(); const y = 338 - 232 * level; g.fillStyle = '#25a0e2'; g.fillRect(cx - 90, y, 180, 240); g.restore();
    g.save(); g.translate(cx, flip ? 338 : 106); if (flip) g.scale(1, -1); shape(g); g.lineWidth = 2.2; g.strokeStyle = '#173a6e'; g.stroke(); g.restore();
  };
  stage(el, api, {
    box: [140, 22, 360, 320], close: [158, 114],
    down: (x, y) => { if (!on && x > 262 && x < 378 && y > 22 && y < 98) { on = true; api.sfx?.('click'); } },
    tick: (S, dt) => { if (on && k < 1) { k = Math.min(1, k + dt / 3.4); if (k >= 1) S.complete(600); } },
    draw: g => {
      jug(g, 231, false, k);
      jug(g, 410, true, 1 - k);
      // button box
      g.fillStyle = '#b9b6b1'; g.fillRect(262, 22, 116, 75); g.lineWidth = 2; g.strokeStyle = '#2b2a28'; g.strokeRect(262, 22, 116, 75);
      g.fillStyle = '#d5d2cc'; g.fillRect(264, 24, 112, 4);
      g.fillStyle = '#e1dfdb';
      g.beginPath(); g.moveTo(270, 46); g.lineTo(282, 56); g.lineTo(270, 66); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(370, 46); g.lineTo(358, 56); g.lineTo(370, 66); g.closePath(); g.fill();
      g.fillStyle = '#1b1a19'; g.fillRect(287, 37, 66, 40);
      g.fillStyle = on ? '#3e55e0' : '#cf3e2b'; g.fillRect(291, 41, 58, 32);
    },
  });
}
export const jugPour = jugFill;

// ------------------------------------------------------------------ Fill Canisters (O2)
// drag the empty canister into the dispenser, it fills (yellow gauge), drag it out; twice
export function canisters(el, api) {
  let n = 0, state = 'wait', cx = 265, cy = 95, fill = 0, drag = null, slide = 0;
  const SX = 286, SY = 248;   // canister centre when plugged
  const canister = (g, x, y, f) => {
    g.save(); g.translate(x, y);
    g.fillStyle = '#2b2f36'; rrect(g, -116, -12, 18, 24, 4); g.fill();
    g.strokeStyle = '#596370'; g.lineWidth = 1.5; for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-112 + i * 4, -11); g.lineTo(-112 + i * 4, 11); g.stroke(); }
    g.beginPath(); g.moveTo(-98, -26); g.quadraticCurveTo(-98, -52, -60, -54); g.lineTo(108, -54); g.quadraticCurveTo(126, -54, 126, -36); g.lineTo(126, 36); g.quadraticCurveTo(126, 54, 108, 54); g.lineTo(-60, 54); g.quadraticCurveTo(-98, 52, -98, 26); g.closePath();
    const gr = g.createLinearGradient(0, -54, 0, 54); gr.addColorStop(0, '#bfd6e8'); gr.addColorStop(.35, '#93b5ce'); gr.addColorStop(.75, '#7fa2bd'); gr.addColorStop(1, '#5d7f99');
    g.fillStyle = gr; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#173048'; g.stroke();
    rrect(g, -32, -15, 182 - 32, 20, 4); g.fillStyle = '#e6eef4'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#173048'; g.stroke();
    g.fillStyle = '#2c3138'; g.fillRect(-28, -11, 142, 12);
    if (f > 0) { g.fillStyle = '#f2df5a'; g.fillRect(-28, -11, 142 * f, 12); }
    g.font = `4.5px ${SANS}`; g.fillStyle = '#3c5468'; g.textAlign = 'center'; g.fillText('O2 CANISTER TYPE 2-J', 30, 16);
    g.restore();
  };
  stage(el, api, {
    box: [100, 30, 440, 300], close: [96, 30],
    down: (x, y) => {
      const [px, py] = state === 'in' || state === 'full' ? [SX, SY] : [cx, cy];
      if (Math.abs(x - px - 14) < 112 && Math.abs(y - py) < 54 && (state === 'wait' || state === 'full')) drag = [x - px, y - py];
    },
    move: (x, y) => {
      if (!drag) return;
      if (state === 'wait') { cx = x - drag[0]; cy = y - drag[1]; if (Math.hypot(cx - SX, cy - SY) < 40) { state = 'in'; drag = null; fill = 0; api.sfx?.('click'); } }
      else if (state === 'full') { slide = Math.max(0, x - drag[0] - SX); }
    },
    up: (x, y, S) => {
      if (state === 'wait') { cx = 265; cy = 95; }
      if (state === 'full' && drag) {
        if (slide > 60) { n++; slide = 0; api.sfx?.('click'); if (n >= 2) { state = 'done'; S.complete(500); } else { state = 'wait'; cx = 265; cy = 95; } }
        else slide = 0;
      }
      drag = null;
    },
    tick: (S, dt) => { if (state === 'in') { fill = Math.min(1, fill + dt / 2.2); if (fill >= 1) state = 'full'; } },
    draw: g => {
      // dispenser: big jug on the left with a nozzle, tray to the right
      g.fillStyle = '#2f677d'; g.fillRect(140, 156, 369, 162); g.lineWidth = 2; g.strokeStyle = '#163847'; g.strokeRect(140, 156, 369, 162);
      g.fillStyle = '#6a9bb0'; g.fillRect(140, 156, 369, 30); g.fillRect(140, 296, 369, 10);
      g.strokeStyle = '#1d4d60'; g.lineWidth = 2;
      for (const x of [190, 255, 320, 385, 450]) { g.beginPath(); g.moveTo(x, 164); g.quadraticCurveTo(x + 8, 180, x + 8, 230); g.quadraticCurveTo(x + 8, 290, x, 302); g.stroke(); }
      g.beginPath(); g.moveTo(108, 140); g.quadraticCurveTo(145, 145, 150, 190); g.lineTo(150, 296); g.quadraticCurveTo(145, 330, 108, 332); g.closePath();
      const bj = g.createLinearGradient(100, 0, 155, 0); bj.addColorStop(0, '#6aa9f3'); bj.addColorStop(1, '#3f7fd6'); g.fillStyle = bj; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#173a6e'; g.stroke();
      g.beginPath(); g.moveTo(150, 212); g.lineTo(178, 220); g.lineTo(178, 252); g.lineTo(150, 260); g.closePath(); g.fillStyle = '#5b97e6'; g.fill(); g.stroke();
      rrect(g, 178, 220, 18, 32, 5); g.fillStyle = '#6aa9f3'; g.fill(); g.stroke();
      if (state === 'wait' || state === 'done') { g.fillStyle = '#e8f3fa'; g.beginPath(); g.moveTo(218, 238); g.quadraticCurveTo(228, 226, 240, 228); g.lineTo(232, 238); g.lineTo(240, 248); g.quadraticCurveTo(228, 250, 218, 238); g.fill(); }
      if (state === 'wait') canister(g, cx, cy, 0);
      else if (state === 'in' || state === 'full') canister(g, SX + slide, SY, fill);
    },
  });
}

// ------------------------------------------------------------------ Open Waterwheel (Boiler Room)
// turn the ship's wheel clockwise; the blue gauge on the right rises
export function waterwheel(el, api) {
  let a = 0, last = null, turned = 0;
  const C = [320, 180];
  stage(el, api, {
    box: [196, 0, 330, 360], close: [158, 14],
    down: (x, y) => { last = Math.atan2(y - C[1], x - C[0]); },
    move: (x, y, S) => {
      if (last == null) return;
      const n = Math.atan2(y - C[1], x - C[0]);
      let d = n - last; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2;
      last = n;
      if (d > 0) { a += d; turned = Math.min(1, turned + d / (Math.PI * 2.4)); if (turned >= 1) { last = null; S.complete(600); } }
    },
    up: () => { last = null; },
    draw: g => {
      // wooden wall and the gauge
      g.fillStyle = '#5d4b45'; g.fillRect(196, 0, 290, 360);
      g.strokeStyle = '#3b2d29'; g.lineWidth = 1.5;
      for (let y = 30; y < 360; y += 58) { g.beginPath(); g.moveTo(196, y); g.lineTo(486, y + 6); g.stroke(); }
      g.save(); g.translate(492, 180); g.rotate(.07);
      rrect(g, -18, -175, 36, 352, 4); g.fillStyle = '#7b7f87'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#25272b'; g.stroke();
      g.fillStyle = '#22252a'; g.fillRect(-11, -168, 22, 290);
      g.fillStyle = '#3a6fd2'; g.fillRect(-10, 122 - 288 * turned, 20, 288 * turned);
      g.restore();
      // wheel
      g.save(); g.translate(C[0], C[1]); g.rotate(a);
      const wood = '#b7a39b', dark = '#3a2b27';
      g.lineJoin = 'round';
      for (let i = 0; i < 8; i++) {
        g.save(); g.rotate(i * Math.PI / 4);
        rrect(g, -11, -172, 22, 50, 11); g.fillStyle = wood; g.fill(); g.lineWidth = 2.5; g.strokeStyle = dark; g.stroke();
        g.restore();
      }
      g.beginPath(); g.arc(0, 0, 136, 0, Math.PI * 2); g.arc(0, 0, 106, 0, Math.PI * 2, true); g.fillStyle = wood; g.fill('evenodd');
      g.lineWidth = 3; g.strokeStyle = dark; g.beginPath(); g.arc(0, 0, 136, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(0, 0, 106, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.arc(0, 0, 106, 0, Math.PI * 2); g.fillStyle = 'rgba(70,52,46,.85)'; g.fill(); g.stroke();
      for (let i = 0; i < 4; i++) { g.save(); g.rotate(i * Math.PI / 2); g.fillStyle = wood; g.fillRect(-4, -106, 8, 86); g.lineWidth = 1.5; g.strokeStyle = dark; g.strokeRect(-4, -106, 8, 86); g.restore(); }
      g.beginPath(); g.arc(0, 0, 21, 0, Math.PI * 2); g.fillStyle = wood; g.fill(); g.lineWidth = 3; g.strokeStyle = dark; g.stroke();
      g.lineWidth = 1.5; g.beginPath(); g.moveTo(-7, -7); g.lineTo(7, 7); g.moveTo(7, -7); g.lineTo(-7, 7); g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 126, -2.4, -1.9); g.stroke(); g.beginPath(); g.arc(0, 0, 126, .6, .9); g.stroke();
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Swipe Card (Office)
// tap the wallet: the card comes up to the reader; swipe it left to right at the right speed
function idCard(g, x, y, color, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rrect(g, -62, -37, 124, 74, 6); g.fillStyle = '#eceeef'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#9a9ea3'; g.stroke();
  rrect(g, -55, -22, 34, 50, 2); g.fillStyle = '#c9cdd1'; g.fill();
  crew(g, color, -38, 28, 46);
  g.strokeStyle = '#2a2c2f'; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(-56, -26); for (let i = 0; i < 10; i++) g.lineTo(-56 + i * 5, -30 + (i % 2) * 6); g.stroke();
  g.lineWidth = .8; g.strokeStyle = '#6b6f74';
  for (let r = 0; r < 6; r++) { g.beginPath(); g.moveTo(-14, -18 + r * 8); for (let i = 0; i < 8; i++) g.lineTo(-14 + i * 4 + (r % 2) * 2, -18 + r * 8 + (i % 2 ? -2 : 1)); g.stroke(); }
  g.strokeStyle = 'rgba(160,170,175,.6)'; g.lineWidth = 3; g.beginPath(); g.moveTo(22, 18); g.quadraticCurveTo(40, -20, 54, -10); g.stroke();
  g.restore();
}
export function swipe(el, api) {
  const color = api.me?.color || 'white';
  let state = 'wallet', msg = 'PLEASE INSERT CARD', cx = 0, t0 = 0, drag = null, lamp = '', lift = 0;
  const X0 = 192, X1 = 418;
  stage(el, api, {
    box: [170, 33, 298, 297], close: [154, 50],
    down: (x, y, S) => {
      if (state === 'wallet' && y > 220) { state = 'lift'; api.sfx?.('click'); return; }
      if (state === 'ready' && Math.abs(x - (X0 + cx)) < 62 && Math.abs(y - 160) < 40) { drag = x - cx; t0 = S.t; }
    },
    move: (x) => { if (drag != null) cx = clamp(x - drag, 0, X1 - X0); },
    up: (x, y, S) => {
      if (drag == null) return;
      drag = null;
      const dt = S.t - t0;
      if (cx < (X1 - X0) * .92) msg = 'BAD READ. TRY AGAIN.';
      else if (dt < .4) msg = 'TOO FAST. TRY AGAIN.';
      else if (dt > 1.1) msg = 'TOO SLOW. TRY AGAIN.';
      else { msg = 'ACCEPTED. THANK YOU.'; lamp = 'g'; state = 'done'; api.sfx?.('click'); S.complete(900); return; }
      lamp = 'r'; api.sfx?.('error'); cx = 0;
    },
    tick: (S, dt) => { if (state === 'lift') { lift = Math.min(1, lift + dt * 3.5); if (lift >= 1) { state = 'ready'; msg = 'PLEASE SWIPE CARD'; } } },
    draw: g => {
      // reader body
      rrect(g, 170, 33, 298, 92, 8); const m = g.createLinearGradient(0, 33, 0, 125); m.addColorStop(0, '#e9eaec'); m.addColorStop(1, '#b8bbbf');
      g.fillStyle = m; g.fill(); g.lineWidth = 2; g.strokeStyle = '#202224'; g.stroke();
      g.strokeStyle = '#2b2d30'; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(180, 65); g.lineTo(184, 98); g.lineTo(200, 112); g.lineTo(304, 112); g.moveTo(290, 100); g.lineTo(320, 116); g.moveTo(300, 100); g.lineTo(330, 116); g.stroke();
      g.fillStyle = '#1e5148'; g.fillRect(193, 40, 252, 22); g.strokeStyle = '#0d201c'; g.strokeRect(193, 40, 252, 22);
      mono(g, msg, 200, 57, 10.5, 9.2, '#e2f2ee');
      for (const [x, c, on] of [[424, '#b0161b', lamp === 'r'], [441, '#127a63', lamp === 'g']]) {
        g.beginPath(); g.arc(x, 109, 8, 0, Math.PI * 2); g.fillStyle = on ? (c === '#b0161b' ? '#ff3a3a' : '#2fe0a0') : c; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1a1a1a'; g.stroke();
      }
      // slot
      g.fillStyle = '#7f8286'; g.fillRect(170, 128, 298, 52); g.strokeStyle = '#202224'; g.strokeRect(170, 128, 298, 52);
      g.fillStyle = '#b9bcc0'; g.fillRect(176, 140, 286, 34);
      g.fillStyle = '#444649'; g.fillRect(170, 180, 298, 150);
      if (state !== 'wallet') {
        const y = 300 - (300 - 160) * Math.min(1, lift), x = X0 + cx;
        idCard(g, x, y, color);
      }
      // wallet
      g.save(); g.translate(0, 0);
      g.fillStyle = '#9c4a2a'; g.strokeStyle = '#2a120a'; g.lineWidth = 2.5; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(178, 256); g.quadraticCurveTo(260, 246, 320, 262); g.lineTo(324, 332); g.lineTo(184, 332); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = '#d0784a'; g.lineWidth = 2; for (const y of [276, 292, 308]) { g.beginPath(); g.moveTo(186, y); g.quadraticCurveTo(260, y - 8, 318, y + 4); g.stroke(); }
      g.beginPath(); g.moveTo(320, 262); g.quadraticCurveTo(380, 238, 458, 234); g.lineTo(460, 332); g.lineTo(324, 332); g.closePath(); g.fillStyle = '#9c4a2a'; g.fill(); g.strokeStyle = '#2a120a'; g.lineWidth = 2.5; g.stroke();
      g.fillStyle = '#8fd0e6'; g.beginPath(); g.moveTo(342, 270); g.lineTo(450, 254); g.lineTo(450, 332); g.lineTo(344, 332); g.closePath(); g.fill();
      crew(g, 'orange', 372, 345, 60); crew(g, 'lime', 420, 340, 62);
      g.fillStyle = 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(350, 272); g.lineTo(380, 266); g.lineTo(356, 330); g.lineTo(346, 330); g.fill();
      if (state === 'wallet') { g.fillStyle = '#eceeef'; g.save(); g.translate(250, 252); g.rotate(-.05); g.fillRect(-60, -10, 120, 18); g.restore(); }
      g.restore();
    },
  });
}

// ------------------------------------------------------------------ Scan Boarding Pass (Office)
// the pass slides in; flip it (arrow) to its back, then drag it on the orange scanner
export function boarding(el, api) {
  const color = api.me?.color || 'white', name = api.me?.name || '';
  let state = 'in', t = 0, flip = 0, px = 236, py = 180, drag = null, green = 0;
  const qr = Array.from({ length: 441 }, () => Math.random() < .5);
  const front = g => {
    rrect(g, -57, -100, 114, 200, 3); g.fillStyle = '#7fa0e6'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#38518a'; g.stroke();
    g.fillStyle = '#26303a'; g.fillRect(-30, -86, 60, 70); g.fillStyle = '#a9d6dd'; g.fillRect(-27, -83, 54, 64);
    g.save(); g.beginPath(); g.rect(-27, -83, 54, 64); g.clip(); crew(g, color, 0, 26, 100); g.restore();
    g.fillStyle = '#c8d6f6'; g.fillRect(-44, -12, 88, 18);
    g.font = `bold 10px ${SANS}`; g.textAlign = 'center'; g.fillStyle = '#20263a'; g.fillText(name.slice(0, 14), 0, 1);
    g.fillStyle = '#fff'; g.fillRect(-30, 12, 60, 86); g.lineWidth = 1.5; g.strokeStyle = '#38518a'; g.strokeRect(-32, 10, 64, 90);
    g.fillStyle = '#111'; for (let i = 0; i < 441; i++) if (qr[i]) g.fillRect(-24 + (i % 21) * 2.3, 20 + Math.floor(i / 21) * 3.5, 2.3, 3.5);
    for (const [x, y] of [[-24, 20], [8.2, 20], [-24, 69]]) { g.fillStyle = '#111'; g.fillRect(x, y, 16, 24); g.fillStyle = '#fff'; g.fillRect(x + 2.3, y + 3.5, 11.4, 17); g.fillStyle = '#111'; g.fillRect(x + 4.6, y + 7, 6.9, 10); }
  };
  const back = g => {
    rrect(g, -57, -100, 114, 200, 3); g.fillStyle = '#6f93e0'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#38518a'; g.stroke();
    g.strokeStyle = '#5577c4'; g.lineWidth = 1.2; g.strokeRect(-45, -88, 90, 150); g.beginPath(); g.moveTo(-45, -30); g.lineTo(-10, -30); g.lineTo(-10, 10); g.moveTo(45, 30); g.lineTo(10, 30); g.stroke();
    g.fillStyle = '#d9822c'; g.fillRect(-36, 68, 72, 24); g.fillStyle = '#7a3e10'; for (let i = 0; i < 24; i++) if (qr[i * 3]) g.fillRect(-34 + i * 3, 70, 1.6, 20);
  };
  const onCard = (x, y) => Math.abs(x - px) < 58 && Math.abs(y - py) < 122;
  stage(el, api, {
    box: [178, 23, 407, 300], close: [150, 14],
    down: (x, y) => {
      if (state === 'front' && onCard(x, y)) { state = 'flip'; api.sfx?.('click'); }
      else if (state === 'back' && onCard(x, y)) drag = [x - px, y - py];
    },
    move: (x, y) => { if (drag) { px = x - drag[0]; py = y - drag[1]; } },
    up: (x, y, S) => {
      if (!drag) return; drag = null;
      if (Math.abs(px - 440) < 80 && Math.abs(py - 160) < 90) { state = 'scan'; px = 440; py = 160; api.sfx?.('click'); }
      else { px = 236; py = 180; }
    },
    tick: (S, dt) => {
      t += dt;
      if (state === 'in' && t > .35) state = 'front';
      if (state === 'flip') { flip = Math.min(1, flip + dt * 4); if (flip >= 1) state = 'back'; }
      if (state === 'scan') { green = Math.min(1, green + dt * 3); if (green >= 1) { state = 'done'; S.complete(800); } }
    },
    draw: (g, S) => {
      // scanner
      g.save(); g.translate(60, 0);
      g.fillStyle = '#4d4f55'; g.fillRect(232, 23, 293, 312); g.lineWidth = 2; g.strokeStyle = '#1b1c1f'; g.strokeRect(232, 23, 293, 312);
      g.fillStyle = '#5f6168'; g.fillRect(237, 28, 283, 270);
      const sc = green > 0 ? '#3fc35a' : '#f05a22';
      g.fillStyle = '#2b1a14'; g.fillRect(262, 50, 238, 220);
      g.fillStyle = green > 0 ? '#bdf5c6' : sc; g.fillRect(266, 54, 230, 212);
      if (!green) {
        g.fillStyle = 'rgba(255,220,200,.6)'; g.beginPath(); g.moveTo(280, 262); g.lineTo(390, 58); g.lineTo(438, 58); g.lineTo(328, 262); g.closePath(); g.fill();
        g.beginPath(); g.moveTo(352, 262); g.lineTo(456, 58); g.lineTo(462, 58); g.lineTo(358, 262); g.closePath(); g.fill();
      }
      g.strokeStyle = green ? '#2a8a3e' : '#9a2e10'; g.lineWidth = 3;
      for (const [x, y, sx, sy] of [[272, 64, 1, 1], [490, 64, -1, 1], [272, 258, 1, -1], [490, 258, -1, -1]]) { g.beginPath(); g.moveTo(x, y + sy * 14); g.lineTo(x, y); g.lineTo(x + sx * 14, y); g.stroke(); }
      for (const [x, y] of [[381, 64], [381, 258], [272, 162], [490, 162]]) { g.beginPath(); if (y === 64 || y === 258) { g.moveTo(x - 10, y); g.lineTo(x + 10, y); g.moveTo(x, y); g.lineTo(x, y + (y === 64 ? 14 : -14)); } else { g.moveTo(x, y - 10); g.lineTo(x, y + 10); g.moveTo(x, y); g.lineTo(x + (x < 300 ? 14 : -14), y); } g.stroke(); }
      g.strokeStyle = 'rgba(150,40,10,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(374, 162); g.lineTo(388, 162); g.moveTo(381, 155); g.lineTo(381, 169); g.stroke();
      g.restore();
      // pass
      if (state !== 'in' || t > .05) {
        const slide = state === 'in' ? (1 - t / .35) * -160 : 0;
        g.save(); g.translate(px + slide, py);
        const sx = state === 'flip' ? Math.abs(Math.cos(flip * Math.PI)) : 1;
        g.scale(Math.max(.02, sx), 1.22);
        if (state === 'front' || state === 'in' || state === 'flip' && flip < .5) front(g); else back(g);
        g.restore();
        if (state === 'front') {
          // curved hint arrow over the card
          const k = (S.t % 1.2) / 1.2;
          g.save(); g.globalAlpha = .9; g.translate(px, py - 128);
          g.strokeStyle = '#d99a1c'; g.lineWidth = 9; g.lineCap = 'round';
          g.beginPath(); g.moveTo(52, 6); g.quadraticCurveTo(10, -26 - 4 * Math.sin(k * 6.28), -44, 2); g.stroke();
          g.strokeStyle = '#f3bf3c'; g.lineWidth = 5; g.stroke();
          g.fillStyle = '#f3bf3c'; g.strokeStyle = '#d99a1c'; g.lineWidth = 2;
          g.beginPath(); g.moveTo(-58, 8); g.lineTo(-40, -10); g.lineTo(-34, 14); g.closePath(); g.fill(); g.stroke();
          g.restore();
        }
      }
    },
  });
}

// ------------------------------------------------------------------ Monitor Tree (O2)
// four gauges; drag each slider onto its dashed target line
export function tree(el, api) {
  const COLS = [{ x: 200, c: '#c8b43f', n: 'CO2' }, { x: 280, c: '#3f9f50', n: 'NUTRI' }, { x: 360, c: '#ef5021', n: 'RAD' }, { x: 440, c: '#3d86e8', n: 'WATER' }];
  const TOP = 78, BOT = 242;
  const sl = COLS.map(() => { let v, tg; do { v = rnd(TOP + 20, BOT - 12); tg = rnd(TOP + 18, BOT - 12); } while (Math.abs(v - tg) < 35); return { v, tg }; });
  let drag = -1, off = 0, okAt = 0;
  const near = s => Math.abs(s.v - s.tg) < 5;
  stage(el, api, {
    box: [125, 20, 395, 300], close: [96, 42],
    down: (x, y) => { COLS.forEach((c, i) => { if (Math.abs(x - c.x) < 28 && Math.abs(y - sl[i].v) < 16) { drag = i; off = y - sl[i].v; } }); },
    move: (x, y) => { if (drag >= 0) sl[drag].v = clamp(y - off, TOP + 8, BOT - 6); },
    up: () => { if (drag >= 0 && near(sl[drag])) sl[drag].v = sl[drag].tg; drag = -1; },
    tick: (S) => { if (drag < 0 && sl.every(near)) { okAt ||= S.t; if (S.t - okAt > .3) S.complete(600); } else okAt = 0; },
    draw: g => {
      // pipes on top, housing
      g.strokeStyle = '#d93a2a'; g.lineWidth = 5; g.beginPath(); g.moveTo(203, 4); g.lineTo(200, 20); g.stroke();
      g.strokeStyle = '#2e56c8'; g.beginPath(); g.moveTo(420, 4); g.lineTo(432, 24); g.stroke();
      g.strokeStyle = '#f2a531'; g.lineWidth = 6; g.beginPath(); g.moveTo(520, 72); g.quadraticCurveTo(552, 92, 556, 130); g.quadraticCurveTo(562, 160, 580, 130); g.lineTo(582, 50); g.quadraticCurveTo(586, 30, 600, 26); g.stroke();
      rrect(g, 122, 40, 400, 268, 30); g.fillStyle = '#4b4f62'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#191b23'; g.stroke();
      rrect(g, 120, 22, 405, 36, 18); g.fillStyle = '#5a5e72'; g.fill(); g.stroke();
      rrect(g, 145, 62, 357, 210, 14); g.fillStyle = '#6fbde0'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#2b4d61'; g.stroke();
      rrect(g, 152, 68, 343, 198, 12); g.fillStyle = '#86cff0'; g.fill();
      COLS.forEach((c, i) => {
        const s = sl[i];
        g.fillStyle = '#7fc8ea'; g.fillRect(c.x - 23, TOP - 3, 46, BOT - TOP + 6); g.lineWidth = 2; g.strokeStyle = '#4a6b80'; g.strokeRect(c.x - 23, TOP - 3, 46, BOT - TOP + 6);
        g.fillStyle = c.c; g.fillRect(c.x - 21, s.v, 42, BOT - s.v + 2);
        // target
        g.fillStyle = '#ffffff'; for (let k = 0; k < 6; k++) g.fillRect(c.x - 31 + k * 10.5, s.tg - 1.5, 7, 3);
        // slider
        const ok = near(s);
        g.fillStyle = 'rgba(90,150,185,.75)'; g.fillRect(c.x - 27, s.v - 12, 54, 24); g.lineWidth = 2; g.strokeStyle = '#3a5e77'; g.strokeRect(c.x - 27, s.v - 12, 54, 24);
        g.fillStyle = ok ? '#2fd84a' : '#ffffff'; rrect(g, c.x - 22, s.v - 2, 44, 4, 2); g.fill(); g.lineWidth = 1; g.strokeStyle = '#3a5e77'; g.stroke();
        g.fillStyle = 'rgba(200,230,245,.6)'; g.font = `6px ${SANS}`; g.textAlign = 'center'; g.fillText('▲ ▲ ▲', c.x, s.v - 5); g.fillText('▼ ▼ ▼', c.x, s.v + 10);
        rrect(g, c.x - 24, 246, 48, 14, 2); g.fillStyle = '#c9e8f6'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#4a6b80'; g.stroke();
        mono(g, c.n, c.x, 257, 7.5, 7.4, '#2a3c48', 'center');
      });
    },
  });
}

// ------------------------------------------------------------------ Fix Wiring
// four coloured wire ends on each side (each with its symbol); drag each left end to the same colour on the right
const WIRES = [{ c: '#f2d417', s: 'circle' }, { c: '#2a3ee8', s: 'x' }, { c: '#f01f1f', s: 'tri' }, { c: '#e930e6', s: 'star' }];
const ROWS_W = [90, 152, 214, 276];
function symbol(g, s, x, y) {
  g.save(); g.strokeStyle = '#141414'; g.fillStyle = '#141414'; g.lineWidth = 1.6;
  if (s === 'circle') { g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.stroke(); }
  else if (s === 'x') { g.beginPath(); g.moveTo(x - 4, y - 4); g.lineTo(x + 4, y + 4); g.moveTo(x + 4, y - 4); g.lineTo(x - 4, y + 4); g.stroke(); }
  else if (s === 'tri') { g.beginPath(); g.moveTo(x, y - 5); g.lineTo(x + 5, y + 4); g.lineTo(x - 5, y + 4); g.closePath(); g.stroke(); }
  else { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 2.2 : 5.5; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); g.fill(); }
  g.restore();
}
export function wires(el, api) {
  const L = shuffle([0, 1, 2, 3]), R = shuffle([0, 1, 2, 3]);
  const done = [false, false, false, false];
  let drag = null;
  const end = (side, row) => side ? [452, ROWS_W[row]] : [188, ROWS_W[row]];
  stage(el, api, {
    box: [170, 30, 300, 300], close: [151, 44],
    down: (x, y) => { L.forEach((w, r) => { if (!done[w] && Math.abs(x - 190) < 26 && Math.abs(y - ROWS_W[r]) < 16) drag = { w, r, x, y }; }); },
    move: (x, y) => { if (drag) { drag.x = clamp(x, 180, 460); drag.y = clamp(y, 40, 320); } },
    up: (x, y, S) => {
      if (!drag) return;
      const r = R.findIndex((w, i) => Math.abs(x - 452) < 30 && Math.abs(y - ROWS_W[i]) < 20);
      if (r >= 0 && R[r] === drag.w) { done[drag.w] = true; api.sfx?.('click'); if (done.every(Boolean)) S.complete(600); }
      drag = null;
    },
    draw: g => {
      g.fillStyle = '#121212'; g.fillRect(170, 30, 300, 300); g.lineWidth = 2; g.strokeStyle = '#2b2b2b'; g.strokeRect(170, 30, 300, 300);
      g.fillStyle = '#2f3134'; g.fillRect(170, 30, 22, 300); g.fillRect(448, 30, 22, 300);
      // decorative bundle in the back
      g.lineWidth = 3;
      for (const [c, x0, y0, x1, y1] of [['#b8861a', 200, 105, 330, 50], ['#b8861a', 440, 110, 340, 50], ['#1d2d9a', 200, 165, 310, 50], ['#1d2d9a', 440, 220, 330, 60], ['#8a1414', 200, 230, 320, 40], ['#8a1414', 440, 160, 345, 40], ['#b8861a', 200, 270, 335, 120], ['#3a3a3a', 300, 330, 310, 40], ['#8a1414', 345, 330, 340, 120], ['#b8861a', 350, 330, 345, 40]]) {
        g.strokeStyle = c; g.beginPath(); g.moveTo(x0, y0); g.bezierCurveTo(x0 + (x1 - x0) * .6, y0, x1, y0 + (y1 - y0) * .3, x1, y1); g.stroke();
      }
      g.fillStyle = '#9da0a5'; g.fillRect(312, 70, 18, 8); g.fillRect(343, 50, 18, 8);
      // ends
      for (let side = 0; side < 2; side++) {
        const order = side ? R : L;
        order.forEach((w, r) => {
          const [x, y] = end(side, r), W = WIRES[w];
          g.fillStyle = done[w] ? '#ffe33a' : '#7a6a1a'; g.fillRect(side ? 444 : 180, y - 15, 16, 7);
          g.fillStyle = W.c; g.fillRect(side ? 437 : 178, y - 6, 26, 12);
          g.fillStyle = '#c4834a'; for (let i = 0; i < 4; i++) g.fillRect(side ? 432 - i * 2 : 203 + i * 2, y - 5 + i * .5, 2, 10 - i);
          symbol(g, W.s, side ? 457 : 184, y);
        });
      }
      // connected and dragged wires
      const line = (c, x0, y0, x1, y1) => { g.lineCap = 'butt'; g.lineWidth = 11; g.strokeStyle = 'rgba(0,0,0,.4)'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); g.lineWidth = 9; g.strokeStyle = c; g.stroke(); };
      L.forEach((w, r) => { if (done[w]) { const rr = R.indexOf(w); line(WIRES[w].c, 200, ROWS_W[r], 440, ROWS_W[rr]); } });
      if (drag) line(WIRES[drag.w].c, 200, ROWS_W[drag.r], drag.x, drag.y);
    },
  });
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ------------------------------------------------------------------ Unlock Manifolds (Specimen Room)
// ten numbered buttons in random order: press 1 to 10; a mistake resets them
export function manifolds(el, api) {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const X = [194, 245, 296, 348, 399], Y = [130, 182];
  let next = 1, flash = 0, hover = -1;
  const cell = (x, y) => { for (let i = 0; i < 10; i++) { const cx = X[i % 5], cy = Y[i / 5 | 0]; if (x >= cx && x <= cx + 48 && y >= cy && y <= cy + 46) return i; } return -1; };
  stage(el, api, {
    box: [172, 105, 296, 135], close: [152, 120],
    move: (x, y) => { hover = cell(x, y); },
    down: (x, y, S) => {
      const i = cell(x, y); if (i < 0 || flash > 0) return;
      if (nums[i] === next) { next++; api.sfx?.('click'); if (next > 10) S.complete(600); }
      else if (nums[i] >= next) { next = 1; flash = .4; api.sfx?.('error'); }
    },
    tick: (S, dt) => { flash = Math.max(0, flash - dt); },
    draw: g => {
      rrect(g, 172, 105, 296, 135, 3); g.fillStyle = '#8d9097'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = '#1e2024'; g.stroke();
      g.fillStyle = '#a7aab1'; g.fillRect(176, 109, 288, 4);
      g.fillStyle = '#1846c4'; g.fillRect(187, 125, 263, 108); g.lineWidth = 1.5; g.strokeStyle = '#0c2470'; g.strokeRect(187, 125, 263, 108);
      nums.forEach((n, i) => {
        const x = X[i % 5], y = Y[i / 5 | 0];
        const pressed = n < next;
        g.fillStyle = flash > 0 ? '#e36a6a' : pressed ? '#22a64a' : i === hover ? '#e9e46a' : '#a8b8ec'; g.fillRect(x, y, 48, 46);
        g.save(); g.beginPath(); g.rect(x, y, 48, 46); g.clip(); g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.moveTo(x + 20, y + 46); g.lineTo(x + 40, y); g.lineTo(x + 48, y); g.lineTo(x + 28, y + 46); g.fill(); g.restore();
        g.font = `30px "Comic Sans MS", "Comic Neue", ${SANS}`; g.textAlign = 'center'; g.fillStyle = '#1b2440';
        if (n === 10) { g.save(); g.translate(x + 24, y + 33); g.scale(.6, 1); g.fillText('10', 0, 0); g.restore(); } else g.fillText(String(n), x + 24, y + 34);
      });
    },
  });
}

// ------------------------------------------------------------------ Empty Garbage
// pull the lever down and hold it: the pile drops out of the chute
export function garbage(el, api) {
  const leaves = Array.from({ length: 60 }, () => ({ x: rnd(180, 368), y: rnd(125, 330), a: rnd(-2.2, -.9), w: rnd(26, 44), h: rnd(8, 13), c: ['#8c6a4a', '#b07a3a', '#d98a2a', '#6f5f55', '#a0928a', '#c7b8a8', '#3d342f'][Math.random() * 7 | 0], v: rnd(.8, 1.4) }));
  let pull = 0, drag = null, drop = 0;
  stage(el, api, {
    box: [172, 32, 296, 296], close: [153, 47],
    down: (x, y) => { if (Math.abs(x - 425) < 32 && Math.abs(y - (178 + pull * 110)) < 24) drag = y - pull * 110; },
    move: (x, y) => { if (drag != null) pull = clamp((y - drag) / 110, 0, 1); },
    up: () => { drag = null; },
    tick: (S, dt) => {
      if (drag == null) pull = Math.max(0, pull - dt * 4);
      if (pull > .85 && drop < 1) { drop = Math.min(1, drop + dt / 2.2); if (drop >= 1) S.complete(600); }
    },
    draw: (g, S) => {
      g.save(); g.beginPath(); g.rect(172, 32, 203, 296); g.clip();
      const bg = g.createLinearGradient(172, 0, 375, 0); bg.addColorStop(0, '#8f98a3'); bg.addColorStop(.5, '#c8d0d8'); bg.addColorStop(1, '#8f98a3');
      g.fillStyle = bg; g.fillRect(172, 32, 203, 296);
      g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(250, 32); g.lineTo(300, 32); g.lineTo(350, 328); g.lineTo(200, 328); g.closePath(); g.fill();
      // blue arrow revealed under the pile
      g.fillStyle = '#3f86d9'; g.strokeStyle = '#1d4f91'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(262, 120); g.lineTo(286, 120); g.lineTo(286, 250); g.lineTo(306, 250); g.lineTo(274, 300); g.lineTo(242, 250); g.lineTo(262, 250); g.closePath(); g.fill(); g.stroke();
      const shake = pull > .85 ? Math.sin(S.t * 40) * 1.5 : 0;
      for (const l of leaves) {
        const y = l.y + drop * drop * 360 * l.v;
        g.save(); g.translate(l.x + shake, y); g.rotate(l.a);
        // crumpled leaf: pointed ends, ribs
        g.beginPath(); g.moveTo(-l.w, 0); g.quadraticCurveTo(-l.w * .2, -l.h * 1.6, l.w, -l.h * .2); g.quadraticCurveTo(0, l.h * 1.4, -l.w, 0); g.closePath();
        g.fillStyle = l.c; g.fill(); g.lineWidth = 1.6; g.strokeStyle = '#1d1712'; g.stroke();
        g.lineWidth = .9; g.beginPath(); g.moveTo(-l.w * .85, 0); g.lineTo(l.w * .85, -l.h * .2);
        for (let k = -2; k <= 2; k++) { g.moveTo(k * l.w * .3, -l.h * .1); g.lineTo(k * l.w * .3 + l.w * .15, -l.h * .8); }
        g.stroke();
        g.restore();
      }
      g.restore();
      g.lineWidth = 2; g.strokeStyle = '#1c1e21'; g.strokeRect(172, 32, 203, 296);
      // lever panel
      g.beginPath(); g.moveTo(382, 32); g.lineTo(462, 32); g.lineTo(468, 40); g.lineTo(468, 328); g.lineTo(382, 328); g.closePath();
      const lp = g.createLinearGradient(382, 0, 468, 0); lp.addColorStop(0, '#9aa3ad'); lp.addColorStop(.3, '#c5ccd3'); lp.addColorStop(1, '#a9b1ba');
      g.fillStyle = lp; g.fill(); g.strokeStyle = '#1c1e21'; g.stroke();
      g.font = `bold 13px ${SANS}`; g.textAlign = 'center'; g.fillStyle = '#222';
      g.fillText('PULL', 425, 68); g.fillText('HOLD', 425, 104);
      g.strokeStyle = '#222'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(425, 74); g.lineTo(425, 88); g.moveTo(421, 84); g.lineTo(425, 89); g.lineTo(429, 84); g.stroke();
      const ly = 178 + pull * 110;
      rrect(g, 397, ly - 9, 56, 30, 6); g.fillStyle = '#b9e2e6'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1c1e21'; g.stroke();
      g.fillStyle = '#5a6068'; g.fillRect(397, ly - 18, 56, 10); g.strokeRect(397, ly - 18, 56, 10);
      g.fillStyle = '#5a6068'; g.fillRect(407, ly - 24, 8, 8); g.fillRect(435, ly - 24, 8, 8);
      g.strokeStyle = '#1c1e21'; g.beginPath(); g.moveTo(417, ly - 8); g.lineTo(417, ly + 21); g.moveTo(433, ly - 8); g.lineTo(433, ly + 21); g.stroke();
    },
  });
}
