// The world screen: lobby and game. Input (keyboard, mouse, touch joystick, gamepad), the HUD of the original
// (task list and task bar, action buttons, map, room name), the panels (minigames, sabotage repairs, admin, cameras,
// vitals, chat, voice settings, customisation, lobby settings) and the full-screen sequences (intro, kill, meeting,
// ejection, end of game).
import { Renderer } from './render.js';
import { ProximityVoice } from './voice.js';
import { MINIGAMES } from './minigames.js';
const PEEK = new Set(['wifiEnd', 'sampleEnd']);
// the in-game map overlay (traced on the game's own map screen, see art/minimap.js) as a crisp SVG
const SVGNS = 'http://www.w3.org/2000/svg';
function minimap(id, sab) {
  const D = MINIMAP[id];
  if (!D) return null;
  const [x0, y0, x1, y1] = D.box, w = x1 - x0, h = y1 - y0;
  const pts = P => P.map(p => p.join(',')).join(' ');
  const poly = (P, cls) => `<polygon class="${cls}" points="${pts(P)}"/>`;
  let html = '';
  if (D.ground) html += poly(D.ground, 'gr');
  for (const P of D.halls) html += poly(P, 'hl');
  for (const P of D.pale) html += poly(P, 'pl');
  for (const [cx, cy, r, sx0, sx1, sy] of D.pins) html += `<path class="hl" d="M${sx0},${sy} L${sx0},${cy + r * .6} A${r},${r} 0 1 1 ${sx1},${cy + r * .6} L${sx1},${sy} Z"/>`;
  if (D.shell) html += poly(D.shell, 'sh') + poly(D.ship, 'sp') + `<line class="ds" x1="${D.dash[0][0]}" y1="${D.dash[0][1]}" x2="${D.dash[1][0]}" y2="${D.dash[1][1]}"/>`;
  for (const P of D.rooms) html += poly(P, 'rm');
  for (const [name, x, y, small] of D.labels) html += `<text x="${x}" y="${y + (small ? 7 : 9)}" class="lb${small ? ' sm' : ''}">${name}</text>`;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', `${x0} ${y0} ${w} ${h}`);
  svg.setAttribute('class', 'au-minimap' + (sab ? ' sab' : ''));
  svg.innerHTML = html;
  // world units -> map coordinates: one scale and offset, like the game's own map screen (the player icon moves
  // linearly with the player); fitted on the traced rooms, it puts every console in its room of the map
  const proj = (x, y) => [D.kx * x + D.bx, D.ky * y + D.by];
  const xy = (x, y) => { const [X, Y] = proj(x, y); return [(X - x0) / w * 100, (Y - y0) / h * 100]; };
  const at = (x, y) => xy(x, y).map(v => v + '%');
  return { svg, ratio: w / h, at, xy };
}
import { sfx } from './sound.js';
import { el, crewIcon, mapLogo, fmtTime } from './ui.js';
import { drawCrew, drawDead } from './art/crew.js';
import { mapImage } from './art/maparts.js';
import { getMap, judgeLocked } from './core/room.js';
import { MINIMAP } from './art/minimap.js';
import { taskDef, GAMES } from './core/tasks.js';
import { ROLES, ROLE_INFO, COLORS, SETTINGS, SETTING_GROUPS, LABELS, ROLE_OPTIONS, ROLE_LABELS, CREW_ROLES, IMP_ROLES, PRESETS, MAX_PLAYERS, KILL_RANGE, USE_RANGE, REPORT_RANGE, ABILITY_RANGE, MIN_PLAYERS, CREW_HEIGHT, fmtSetting, fmtRoleOpt, cleanSettings } from './core/rules.js';
import { saveProfile } from './app.js';
import { input, stick, IOS } from '../input.js';
import { voice as partyVoice } from '../rtc.js';
import { audio } from '../audio.js';

// the yellow « ! » of the map: one per console still to visit; marks that would overlap (several tasks in the same
// corner of a room) are set side by side, centred on their places, instead of hiding each other
const MARK = 4.3;                // marker width in % of the map width (.mk.task)
function taskMarks(V, M, xy, ratio) {
  const seen = new Set(), pts = [];
  for (const t of V.tasks || []) {
    if (t.done) continue;
    const id = t.steps[t.step]?.console, cs = M.consoles[id];
    if (!cs || seen.has(id)) continue;
    seen.add(id); pts.push(xy(cs.x, cs.y));
  }
  const gx = MARK * 1.08, gy = MARK * ratio * 1.08;           // one marker in % of the width / of the height
  let groups = pts.map(p => [p]);
  const spread = g => { const cx = g.reduce((s, p) => s + p[0], 0) / g.length, cy = g.reduce((s, p) => s + p[1], 0) / g.length; return g.map((p, i) => [cx + (i - (g.length - 1) / 2) * gx, cy]); };
  for (let pass = 0; pass < 8; pass++) {
    const placed = groups.map(spread);
    let merged = false;
    outer: for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) {
      if (placed[i].some(p => placed[j].some(q => Math.abs(p[0] - q[0]) < gx && Math.abs(p[1] - q[1]) < gy))) {
        groups[i] = [...groups[i], ...groups[j]].sort((a, b) => a[0] - b[0]); groups.splice(j, 1); merged = true; break outer;
      }
    }
    if (!merged) break;
  }
  return groups.flatMap(spread);
}
const colorOf = id => COLORS.find(c => c.id === id) || COLORS[0];
const d2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const SAB = { reactor: 'Réacteur', o2: 'O2', lights: 'Électricité', comms: 'Communications', seismic: 'Stabilisateurs sismiques' };
const SAB_LINE = { reactor: 'Fusion du réacteur', o2: 'Épuisement de l’oxygène', seismic: 'Défaillance des stabilisateurs sismiques', lights: 'Réparer l’électricité', comms: 'Communications sabotées' };
const ABILITY = { shapeshifter: ['Métamorphose', 'shift'], phantom: ['Disparaître', 'vanish'], tracker: ['Traquer', 'track'], guardianAngel: ['Protéger', 'protect'], influencer: ['Message', 'message'], scientist: ['Signes vitaux', 'vitals'], detective: ['Interroger', 'interrogate'], engineer: null };
const isTouch = () => matchMedia('(pointer: coarse)').matches || input.device === 'touch';

export class Play {
  constructor(app, client, { freeplay = false } = {}) {
    this.app = app; this.c = client; this.freeplay = freeplay;
    this.root = el('div', 'au-play');
    this.canvas = el('canvas', 'au-canvas');
    this.hud = el('div', 'au-hud'); this.ov = el('div', 'au-ov'); this.fs = el('div', 'au-fs');
    this.root.append(this.canvas, this.hud, this.ov, this.fs, el('div', 'au-flash'));
    app.ui.replaceChildren(this.root); app.stars.el.hidden = true;
    this.r = new Renderer(this.canvas, client);
    this.voice = new ProximityVoice(client);
    this.keys = new Set(); this.joy = null; this.mouseMove = null; this.panel = null; this.closed = false; this.paused = false;
    this.cursor = el('div', 'au-cursor'); this.cursor.hidden = true; this.root.append(this.cursor); this.cur = { x: 300, y: 300, down: false };
    this.notices = []; this.lastPhase = null; this.seqUntil = 0; this.stepT = 0;
    this.buildHud();
    this.bind();
    this.offs = [
      client.on('view', v => this.onView(v)), client.on('ev', m => this.onEvent(m)), client.on('chat', m => this.onChat(m)),
      client.on('err', msg => this.toast(msg)), client.on('bye', m => this.onBye(m)), client.on('status', s => this.onStatus(s)),
      client.on('phase', p => this.onPhase(p)), client.on('teleport', () => this.closePanelIfFar()),
      this.voice.on('state', () => this.updateMic()), this.voice.on('error', msg => this.toast(msg)), this.voice.on('blocked', () => this.toast('Touche l’écran pour activer le son des autres joueurs.')),
    ];
    partyVoice.hold(true);           // the console's party call must not mix the living and the dead
    audio.duck(0, .4);               // no music in the game
    this.last = performance.now();
    this.raf = requestAnimationFrame(t => this.loop(t));
    globalThis.__au = this;          // handle for the end-to-end tests
    this.minigames = MINIGAMES;
    const fps = +new URLSearchParams(location.search).get('aufps'); if (fps) this.minFrame = 1000 / fps - 2;
  }

  // ------------------------------------------------------------------ input
  bind() {
    this.onKeyDown = e => {
      if (this.closed || this.paused) return;
      const t = e.target?.tagName; if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      const k = e.code;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(k)) { this.keys.add(k); e.preventDefault(); if (this.c.v?.me?.vent) this.ventKey(k); return; }
      if (e.repeat) return;
      const map = { KeyE: 'use', Space: 'use', KeyQ: 'kill', KeyR: 'report', KeyF: 'sabotage', KeyV: 'vent', KeyC: 'ability', Tab: 'map', KeyM: 'map', Enter: 'chat', Escape: 'back' };
      if (map[k]) { e.preventDefault(); this.command(map[k]); }
    };
    this.onKeyUp = e => this.keys.delete(e.code);
    addEventListener('keydown', this.onKeyDown, true); addEventListener('keyup', this.onKeyUp, true);
    this.onBlur = () => this.keys.clear(); addEventListener('blur', this.onBlur);
    // touch joystick (left part of the screen) and mouse hold-to-walk, like the original
    this.canvas.addEventListener('pointerdown', e => {
      this.voice.unblock();
      if (e.pointerType === 'touch') { if (e.clientX < innerWidth * .5 && !this.joy) { const o = this.joyCenter(); this.joy = { id: e.pointerId, x0: o.x, y0: o.y, dx: 0, dy: 0 }; this.moveJoy(e); } }
      else if (e.button === 0) this.mouseMove = { x: e.clientX, y: e.clientY };
      this.canvas.setPointerCapture?.(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', e => {
      if (this.joy && e.pointerId === this.joy.id) this.moveJoy(e);
      else if (this.mouseMove) { this.mouseMove.x = e.clientX; this.mouseMove.y = e.clientY; }
    });
    const end = e => { if (this.joy && e.pointerId === this.joy.id) { this.joy = null; this.showJoy(); } if (e.pointerType !== 'touch') this.mouseMove = null; };
    this.canvas.addEventListener('pointerup', end); this.canvas.addEventListener('pointercancel', end);
  }
  // the joystick stays at the bottom left of touch screens; a touch anywhere on the left half steers from its centre
  joyCenter() { if (!this.joyEl) this.showJoy(); this.joyEl.classList.add('on'); const r = this.joyEl.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, R: r.width * .38 || 60 }; }
  moveJoy(e) {
    const { R } = this.joyCenter(); let dx = e.clientX - this.joy.x0, dy = e.clientY - this.joy.y0;
    const l = Math.hypot(dx, dy); if (l > R) { dx *= R / l; dy *= R / l; }
    this.joy.dx = dx / R; this.joy.dy = dy / R; this.showJoy();
  }
  showJoy() {
    if (!this.joyEl) { this.joyEl = el('div', 'au-joy', el('i')); this.hud.append(this.joyEl); }
    const j = this.joy;
    this.joyEl.classList.toggle('on', !!j || isTouch());
    this.joyEl.firstChild.style.transform = j ? `translate(${j.dx * 76}%, ${j.dy * 76}%)` : '';
  }
  moveVector() {
    if (this.autoDir) return this.autoDir;          // set by the end-to-end tests
    let dx = 0, dy = 0;
    const K = this.keys;
    if (K.has('ArrowLeft') || K.has('KeyA')) dx -= 1; if (K.has('ArrowRight') || K.has('KeyD')) dx += 1;
    if (K.has('ArrowUp') || K.has('KeyW')) dy -= 1; if (K.has('ArrowDown') || K.has('KeyS')) dy += 1;
    if (this.joy) { dx += this.joy.dx; dy += this.joy.dy; }
    if (this.mouseMove) { const r = this.canvas.getBoundingClientRect(); const mx = this.mouseMove.x - r.left - r.width / 2, my = this.mouseMove.y - r.top - r.height / 2 + r.height * .03; const l = Math.hypot(mx, my); if (l > 12) { dx += mx / l * Math.min(1, l / 120); dy += my / l * Math.min(1, l / 120); } }
    if (!this.panel || this.panel.walk) {
      if (Math.abs(stick.x) > .2 || Math.abs(stick.y) > .2) { dx += stick.x; dy += stick.y; }
      const pad = (navigator.getGamepads?.() || [])[0] || [...(navigator.getGamepads?.() || [])].find(Boolean);
      if (pad?.buttons?.[14]?.pressed) dx -= 1; if (pad?.buttons?.[15]?.pressed) dx += 1; if (pad?.buttons?.[12]?.pressed) dy -= 1; if (pad?.buttons?.[13]?.pressed) dy += 1;
    }
    const l = Math.hypot(dx, dy);
    return l > 1 ? [dx / l, dy / l] : [dx, dy];
  }
  // console actions (gamepad buttons); keyboard keys are handled by onKeyDown
  action(a, ev) {
    if (ev instanceof KeyboardEvent) return true;
    if (a === 'ps') return false;
    const map = { ok: 'use', square: 'kill', triangle: 'report', l1: 'map', r1: 'sabotage', l2: 'vent', r2: 'ability', options: 'settings', back: 'back', create: 'chat' };
    if (this.panel?.cursor && a === 'ok') return true;      // the virtual cursor presses in the panel
    if (map[a]) this.command(map[a]);
    return true;
  }
  command(cmd) {
    if (this.closed) return;
    const V = this.c.v;
    if (cmd === 'back') { if (this.panel) this.closePanel(); else if (V?.me?.vent) this.c.send({ k: 'vent', a: 'exit' }); else this.openSettings(); return; }
    if (this.seqUntil > performance.now() && cmd !== 'chat') return;
    if (cmd === 'settings') return this.openSettings();
    if (cmd === 'chat') { if (this.canChat()) this.openChat(); return; }
    if (this.panel && !this.panel.walk) return;
    const b = this.btns[cmd];
    if (cmd === 'map') return this.openMap(false);
    if (cmd === 'sabotage') { if (V?.me?.team === 'imp' && this.c.phase === 'play') this.openMap(true); return; }
    if (b && !b.disabled) b.click();
  }

  // ------------------------------------------------------------------ HUD
  buildHud() {
    const B = (cls, label, fn) => { const b = el('button', `au-act ${cls}`, [el('span', 'au-cd'), el('b', '', label)], { type: 'button' }); b.addEventListener('click', () => { if (!b.disabled) fn(); }); return b; };
    this.btns = {
      use: B('use', 'Utiliser', () => this.doUse()), report: B('report', 'Signaler', () => this.doReport()), kill: B('kill', 'Tuer', () => this.doKill()),
      sabotage: B('sabotage', 'Saboter', () => this.openMap(true)), vent: B('vent', 'Conduit', () => this.doVent()), ability: B('ability', 'Capacité', () => this.doAbility()),
    };
    this.taskbar = el('div', 'au-taskbar', [el('i'), el('span', '', 'TOTAL DES TÂCHES ACCOMPLIES')]);
    this.taskList = el('div', 'au-tasklist');
    this.taskTab = el('button', 'au-tasktab', 'Tâches', { type: 'button' }); this.taskTab.onclick = () => this.taskList.classList.toggle('hide');
    this.roomName = el('div', 'au-roomname'); this.ping = el('div', 'au-ping');
    const top = (cls, icon, fn, title) => { const b = el('button', `au-top ${cls}`, [], { type: 'button', title, 'aria-label': title }); b.innerHTML = icon; b.onclick = () => { sfx.play('click'); fn(); }; return b; };
    this.topBtns = {
      chat: top('chat', ICONS.chat, () => this.openChat(), 'Discussion'), settings: top('settings', ICONS.gear, () => this.openSettings(), 'Réglages'),
      map: top('map', ICONS.map, () => this.openMap(false), 'Carte'), mic: top('mic', ICONS.mic, () => this.toggleMic(), 'Micro'),
      players: top('players', ICONS.tablet, () => this.openPlayers(), 'Joueurs du salon'), role: top('role', ICONS.role, () => this.openFreeplayRoles(), 'Rôle'),
    };
    this.wardrobe = el('button', 'au-wardrobe', el('img', '', [], { src: 'among/ui/wardrobe.webp', alt: 'Vestiaire', draggable: 'false' }), { type: 'button', title: 'Vestiaire' });
    this.wardrobe.onclick = () => { sfx.play('click'); this.openCustomize(); };
    this.notesBtn = el('button', 'au-act notes', [el('b', '', 'Notes')], { type: 'button' }); this.notesBtn.onclick = () => this.openNotes();
    this.lobby = el('div', 'au-lobby');
    this.lobbyNotes = el('div', 'au-notices');
    this.hostLine = el('div', 'au-hostline');
    this.startBtn = el('button', 'au-start', 'Commencer', { type: 'button' }); this.startBtn.onclick = () => this.startGame();
    this.countdown = el('div', 'au-countdown');
    this.ventArrows = el('div', 'au-ventarrows');
    this.hud.append(
      el('div', 'au-tl', [this.taskbar, el('div', 'au-taskwrap', [this.taskTab, this.taskList])]),
      el('div', 'au-tr', [[this.topBtns.mic], [this.topBtns.chat, this.topBtns.settings], [this.topBtns.map, this.topBtns.players, this.topBtns.role]].map(g => el('div', 'au-tgroup', g))),
      el('div', 'au-br', [this.btns.ability, this.btns.sabotage, this.btns.use, this.btns.kill, this.btns.vent, this.btns.report, this.notesBtn]),
      this.wardrobe,
      el('div', 'au-bc', [this.roomName, this.ping]),
      this.lobby, this.lobbyNotes, el('div', 'au-lobbybottom', [this.hostLine, el('div', 'au-startwrap', [this.startBtn, this.lobbyPing = el('div', 'au-lobbyping')]), this.countdown]), this.ventArrows);
    if (isTouch()) this.showJoy();
  }
  updateMic() {
    const v = this.voice, b = this.topBtns.mic;
    b.classList.toggle('on', v.state === 'on' && v.micOpen()); b.classList.toggle('muted', v.state === 'on' && !v.micOpen()); b.classList.toggle('off', v.state !== 'on');
    b.title = v.state !== 'on' ? 'Activer le micro (chat vocal de proximité)' : v.selfMuted ? 'Micro coupé' : v.prefs.ptt ? 'Appuyer pour parler (T)' : 'Micro ouvert';
  }
  toggleMic() {
    const v = this.voice;
    if (v.state === 'off') v.start(); else v.setMuted(!v.selfMuted);
    this.updateMic();
  }
  toast(msg) { if (!msg) return; const t = el('div', 'au-toast', msg); this.root.append(t); setTimeout(() => t.remove(), 3500); }
  canChat() { const c = this.c, ph = c.phase; return !c.inGame || ph === 'meeting' || ph === 'ended' || c.ghost; }

  // ------------------------------------------------------------------ main loop
  loop(t) {
    if (this.closed) return;
    this.raf = requestAnimationFrame(tt => this.loop(tt));
    if (this.minFrame && t - this.last < this.minFrame) return;   // tests may lower the frame rate (?aufps=)
    // real time, even on a slow device (movement in sub-steps so that collisions stay exact)
    const dt = Math.min(.25, (t - this.last) / 1000); this.last = t;
    if (this.paused) return;
    const [dx, dy] = this.seqUntil > t || (this.panel && !this.panel.walk) ? [0, 0] : this.moveVector();
    for (let left = dt; left > 1e-4; left -= .04) this.c.step(dx, dy, Math.min(.04, left));
    if (this.c.moving && !this.c.ghost && this.c.v) { this.stepT += dt; if (this.stepT > .3) { this.stepT = 0; sfx.play('step', .5); } }
    this.r.camView = this.panel?.camView || null;
    this.r.frame(dt);
    this.updateButtons();
    this.updateCursor(dt);
    if (this.panel?.tick) this.panel.tick(dt);
    if (this.fsTick) this.fsTick(t);
  }
  updateCursor(dt) {
    const show = !!this.panel && !isTouch() && ['ps', 'xbox', 'nintendo', 'generic'].includes(input.device);
    this.cursor.hidden = !show;
    if (this.panel) this.panel.cursor = show;
    if (!show) return;
    const pad = [...(navigator.getGamepads?.() || [])].find(Boolean); if (!pad) return;
    const ax = Math.abs(pad.axes[0]) > .15 ? pad.axes[0] : 0, ay = Math.abs(pad.axes[1]) > .15 ? pad.axes[1] : 0;
    this.cur.x = Math.max(0, Math.min(innerWidth, this.cur.x + ax * 700 * dt)); this.cur.y = Math.max(0, Math.min(innerHeight, this.cur.y + ay * 700 * dt));
    this.cursor.style.transform = `translate(${this.cur.x}px, ${this.cur.y}px)`;
    const target = document.elementFromPoint(this.cur.x, this.cur.y);
    const opts = { bubbles: true, cancelable: true, clientX: this.cur.x, clientY: this.cur.y, pointerId: 77, pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1 };
    const down = !!pad.buttons[0]?.pressed;
    if (down && !this.cur.down) { this.cur.target = target; target?.dispatchEvent(new PointerEvent('pointerdown', opts)); }
    if (this.cur.down && (ax || ay)) (this.cur.target || target)?.dispatchEvent(new PointerEvent('pointermove', opts));
    if (!down && this.cur.down) { (this.cur.target || target)?.dispatchEvent(new PointerEvent('pointerup', { ...opts, buttons: 0 })); target?.dispatchEvent(new MouseEvent('click', opts)); this.cur.target = null; }
    this.cur.down = down;
  }

  // what each button can do right now (the room validates everything again)
  targets() {
    const c = this.c, V = c.v, M = c.map, me = { x: c.pos.x, y: c.pos.y }, now = c.serverNow();
    const out = { use: null, report: null, kill: null, vent: null, ability: null };
    if (!V) return out;
    if (!c.inGame) {
      // the laptop and the hat chest of the dropship open the customisation, like the game
      const near = ['laptop', 'chest'].filter(id => M.consoles[id] && d2(me, M.consoles[id]) < 1.3);
      if (near.length) out.use = { kind: 'customize', x: M.consoles[near[0]].x, y: M.consoles[near[0]].y, glow: near };
      return out;
    }
    if (c.phase !== 'play') return out;
    const alive = V.me.alive, cands = [];
    if (V.me.vent) return out;
    for (const t of V.tasks || []) {
      if (t.done || t.fake) continue;
      const st = t.steps[t.step]; const cs = st && M.consoles[st.console];
      // screens that show their own countdown (reboot wifi, inspect sample) can be opened while waiting, like in the game
      if (cs && d2(me, cs) <= USE_RANGE && (now >= t.readyAt || PEEK.has(st.game))) cands.push({ kind: 'task', id: t.id, x: cs.x, y: cs.y, d: d2(me, cs), peek: now < t.readyAt });
    }
    if (alive && V.sab) (M.sabotage[V.sab.kind] || []).forEach((s, i) => { if (d2(me, s) <= USE_RANGE + .5) cands.push({ kind: 'sab', i, x: s.x, y: s.y, d: d2(me, s) }); });
    if (alive && M.button && V.me.meetingsLeft > 0 && !this.freeplay) { const B = M.button, box = B.box ? { x: Math.max(B.box[0] / M.k, Math.min(B.box[2] / M.k, me.x)), y: Math.max(B.box[1] / M.k, Math.min(B.box[3] / M.k, me.y)) } : B; if (d2(me, box) <= (B.r || 2)) cands.push({ kind: 'button', x: B.x, y: B.y, d: d2(me, box) + .5 }); }
    for (const [k, spot] of [['admin', M.admin], ['cams', M.cams], ['vitals', M.vitals]]) if (spot && d2(me, spot) <= USE_RANGE + 1) cands.push({ kind: 'sys', s: k, x: spot.x, y: spot.y, d: d2(me, spot) });
    if (alive && M.id === 'polus') for (const i of V.closed || []) { const d = M.doors[i]; if (d && d2(me, d) <= USE_RANGE + 1) cands.push({ kind: 'door', i, x: d.x, y: d.y, d: d2(me, d) }); }
    cands.sort((a, b) => a.d - b.d);
    out.use = cands[0] || null;
    if (alive && !this.freeplay) { const b = c.bodies.map(([n, x, y]) => ({ n, x, y, d: d2(me, { x, y }) })).filter(b => b.d <= REPORT_RANGE).sort((a, b) => a.d - b.d)[0]; out.report = b || null; }
    const imp = V.me.team === 'imp';
    const others = [...c.others].map(([n, o]) => ({ n, x: o.x, y: o.y, f: o.f, id: c.player(n)?.id, imp: c.player(n)?.imp })).filter(o => !(o.f & 4));
    if (imp && alive && !V.me.vanished) { const r = KILL_RANGE[V.settings.killDistance]; const t = others.filter(o => !o.imp).map(o => ({ ...o, d: d2(me, o) })).filter(o => o.d <= r).sort((a, b) => a.d - b.d)[0]; out.kill = t || null; }
    if (alive && (imp && !V.me.vanished || V.me.role === 'engineer')) { const v = M.vents.map(v => ({ ...v, d: d2(me, v) })).filter(v => v.d <= USE_RANGE).sort((a, b) => a.d - b.d)[0]; out.vent = v || null; }
    const role = alive ? V.me.role : V.me.ghostRole;
    if (role === 'tracker' || role === 'detective' || role === 'shapeshifter' || role === 'guardianAngel') {
      const pool = role === 'guardianAngel' ? others.filter(o => !(o.f & 4)) : others;
      const r = role === 'shapeshifter' ? 99 : ABILITY_RANGE + (role === 'guardianAngel' ? 1 : 0);
      out.ability = pool.map(o => ({ ...o, d: d2(me, o) })).filter(o => o.d <= r).sort((a, b) => a.d - b.d)[0] || null;
    }
    return out;
  }
  updateButtons() {
    const c = this.c, V = c.v, B = this.btns, now = c.serverNow();
    const inGame = c.inGame, play = c.phase === 'play', lobby = !inGame;
    const T = this.targets(); this.T = T;
    this.r.highlight = T.use && !(this.panel && !this.panel.walk) ? T.use : null;
    const show = (b, on) => { b.hidden = !on; };
    const set = (b, enabled, cd = 0) => { b.disabled = !enabled || cd > 0; b.querySelector('.au-cd').textContent = cd > 0 ? Math.ceil(cd / 1000) : ''; b.classList.toggle('cooling', cd > 0); };
    const me = V?.me, role = me?.alive ? me?.role : me?.ghostRole;
    this.wardrobe.hidden = !lobby;
    const pc = lobby && T.use?.kind === 'customize';
    if (this.wardrobe.dataset.pc !== String(pc)) { this.wardrobe.dataset.pc = pc; this.wardrobe.firstChild.src = `among/ui/${pc ? 'customize' : 'wardrobe'}.webp`; this.wardrobe.title = pc ? 'Personnaliser' : 'Vestiaire'; }
    show(B.use, play && !!me); set(B.use, !!T.use || !!me?.vent);
    B.use.classList.toggle('exitvent', !!me?.vent);
    B.use.querySelector('b').textContent = me?.vent ? 'Sortir' : T.use?.kind === 'sys' ? { admin: 'Admin', cams: 'Sécurité', vitals: 'Signes vitaux' }[T.use.s] : T.use?.kind === 'button' ? 'Urgence' : 'Utiliser';
    show(B.report, play && !!me?.alive && !this.freeplay); set(B.report, !!T.report);
    const imp = me?.team === 'imp';
    show(B.kill, play && imp && !!me?.alive); set(B.kill, !!T.kill, me ? me.killAt - now : 0);
    show(B.sabotage, play && imp); set(B.sabotage, true);
    show(B.vent, play && !!me?.alive && (imp || me?.role === 'engineer')); set(B.vent, !!T.vent && !me.vent, me?.role === 'engineer' && !imp ? me.abAt - now : 0);
    const ab = role && ABILITY[role];
    show(B.ability, play && !!ab && (me.alive || role === 'guardianAngel' || role === 'influencer'));
    if (ab) {
      const active = (role === 'shapeshifter' && me.shift != null) || (role === 'phantom' && me.vanished);
      B.ability.querySelector('b').textContent = active ? (role === 'shapeshifter' ? 'Redevenir' : 'Réapparaître') : ab[0];
      const needsTarget = ['tracker', 'detective', 'guardianAngel'].includes(role);
      const batt = role === 'scientist' ? (me.battery <= 0 ? me.batteryAt - now : 0) : 0;
      const cd = active ? 0 : role === 'scientist' ? batt : me.abAt - now;
      set(B.ability, active || (needsTarget ? !!T.ability : role === 'shapeshifter' ? true : true) && !(role === 'tracker' && me.track), cd);
      B.ability.dataset.role = role;
    }
    this.notesBtn.hidden = !(inGame && me?.role === 'detective' && me.alive && (play || c.phase === 'meeting'));
    // top buttons
    this.topBtns.chat.hidden = !this.canChat();
    this.topBtns.map.hidden = !play;
    this.topBtns.players.hidden = !lobby || this.freeplay;
    this.topBtns.role.hidden = !(this.freeplay && play);
    // the vent: arrows toward the linked vents
    this.updateVentArrows(me);
    // room name and ping
    if (play || lobby) { const r = c.map.roomAt(c.pos.x, c.pos.y); this.roomName.textContent = lobby ? '' : r ? r.name : c.map.def.outside || ''; }
    this.ping.textContent = this.lobbyPing.textContent = `PING: ${c.ping} ms`;
    // lobby countdown
    if (lobby && V?.phase === 'countdown') { const s = Math.ceil(c.left(V.countdown) / 1000); this.countdown.textContent = s > 0 ? `Lancement dans ${s}` : ''; if (s !== this.lastCount) { this.lastCount = s; if (s > 0) sfx.play('countdown'); } } else this.countdown.textContent = '';
    // sabotage countdown in the task list
    if (V?.sab && play) { const line = this.taskList.querySelector('.sabline'); if (line) line.textContent = this.sabText(V); }
  }
  updateVentArrows(me) {
    const c = this.c;
    if (!me?.vent || c.phase !== 'play') { if (this.ventArrows.childElementCount) this.ventArrows.replaceChildren(); this.ventShown = null; return; }
    if (this.ventShown === me.vent) return;
    this.ventShown = me.vent;
    const v = c.map.vents.find(x => x.id === me.vent);
    this.ventArrows.replaceChildren(...(v?.links || []).map(id => {
      const to = c.map.vents.find(x => x.id === id), a = Math.atan2(to.y - v.y, to.x - v.x);
      const b = el('button', 'au-ventarrow', '➤', { type: 'button', title: c.map.roomAt(to.x, to.y)?.name || 'Couloir' });
      b.style.transform = `translate(${Math.cos(a) * 150}px, ${Math.sin(a) * 110}px) rotate(${a}rad)`;
      b.onclick = () => { sfx.play('vent'); c.send({ k: 'vent', a: 'move', id }); };
      b.dataset.a = a;
      return b;
    }));
  }
  ventKey(k) {
    const dir = { ArrowRight: 0, KeyD: 0, ArrowDown: Math.PI / 2, KeyS: Math.PI / 2, ArrowLeft: Math.PI, KeyA: Math.PI, ArrowUp: -Math.PI / 2, KeyW: -Math.PI / 2 }[k];
    const best = [...this.ventArrows.children].map(b => ({ b, d: Math.abs(Math.atan2(Math.sin(+b.dataset.a - dir), Math.cos(+b.dataset.a - dir))) })).sort((a, b) => a.d - b.d)[0];
    if (best && best.d < 1.2) best.b.click();
  }

  // ------------------------------------------------------------------ actions
  doUse() {
    const c = this.c, V = c.v, T = this.T?.use;
    if (V?.me?.vent) { c.send({ k: 'vent', a: 'exit' }); sfx.play('vent'); return; }
    if (!T) return;
    sfx.play('click');
    if (T.kind === 'customize') return this.openCustomize();
    if (T.kind === 'task') { if (T.peek) { const t = c.v.tasks.find(x => x.id === T.id); this.openTask(T.id, t.step, true); } else c.send({ k: 'task', a: 'open', id: T.id }); return; }
    if (T.kind === 'sab') return this.openSabotageFix(T.i);
    if (T.kind === 'button') { c.send({ k: 'button' }); return; }
    if (T.kind === 'sys') { c.send({ k: 'sys', s: T.s }); this.openSystem(T.s); return; }
    if (T.kind === 'door') return this.openPanel(MINIGAMES.door, { index: T.i, walk: false });
  }
  doReport() { const T = this.T?.report; if (T) this.c.send({ k: 'report', n: T.n }); }
  doKill() { const T = this.T?.kill; if (T?.id) this.c.send({ k: 'kill', id: T.id }); }
  doVent() { const T = this.T?.vent; if (T) { this.c.send({ k: 'vent', a: 'enter', id: T.id }); sfx.play('vent'); } }
  doAbility() {
    const c = this.c, me = c.v.me, role = me.alive ? me.role : me.ghostRole, T = this.T?.ability;
    if (role === 'shapeshifter') { if (me.shift != null) c.send({ k: 'ab', a: 'unshift' }); else this.pickShift(); return; }
    if (role === 'phantom') { c.send({ k: 'ab', a: me.vanished ? 'appear' : 'vanish' }); sfx.play('vanish'); return; }
    if (role === 'scientist') { c.send({ k: 'ab', a: 'vitals' }); this.openSystem('vitals'); return; }
    if (role === 'influencer') return this.openInfluence();
    if (T?.id) { c.send({ k: 'ab', a: ABILITY[role][1], id: T.id }); sfx.play(role === 'guardianAngel' ? 'protect' : 'click'); }
  }
  // the dead influencer writes a message to the living crewmates
  openInfluence() {
    const c = this.c;
    this.openPanel((box, api) => {
      box.className = 'au-panel au-influence';
      const inp = el('input', 'au-chatin', [], { maxlength: 80, placeholder: 'Message aux coéquipiers en vie…', autocomplete: 'off' });
      const send = () => { const text = inp.value.trim(); if (!text) return; c.send({ k: 'ab', a: 'message', text }); api.close(); };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });
      const go = el('button', 'au-btn primary', 'Envoyer', { type: 'button' }); go.onclick = send;
      box.append(el('h2', '', 'Influenceur'), el('div', 'au-row', [inp, go]));
      setTimeout(() => inp.focus(), 50);
    }, { walk: true });
  }
  pickShift() {
    const c = this.c;
    const list = c.v.players.filter(p => p.n !== c.n && !p.dead && !p.bot && !p.spectator);
    this.openPanel((elx, api) => {
      elx.className = 'au-panel au-pick';
      elx.append(el('h2', '', 'Prendre l’apparence de…'), el('div', 'au-pickgrid', list.map(p => { const b = el('button', 'au-pickbtn', [crewIcon(p.color, 48), el('span', '', p.name)], { type: 'button' }); b.onclick = () => { c.send({ k: 'ab', a: 'shift', id: p.id }); sfx.play('shift'); api.close(); }; return b; })));
    }, { walk: true });
  }
  startGame() {
    const c = this.c, V = c.v;
    if (!V || V.host !== c.n) return;
    if (V.phase === 'countdown') { c.send({ k: 'cancel' }); return; }
    c.send({ k: 'start' });
  }

  // ------------------------------------------------------------------ view updates
  onView(V) {
    const c = this.c, inGame = c.inGame, me = V.me;
    this.root.classList.toggle('lobby', !inGame); this.root.classList.toggle('ghost', !!c.ghost); this.root.classList.toggle('imp', me?.team === 'imp');
    this.lobby.hidden = inGame; this.lobbyNotes.hidden = inGame; this.hostLine.parentElement.hidden = inGame;
    if (!inGame) this.renderLobby(V);
    this.renderTasks(V);
    if (this.panel?.onView) this.panel.onView(V);
    // a task opened by the room
    // sabotage alarms
    const crit = V.sab && ['reactor', 'o2', 'seismic'].includes(V.sab.kind) && V.phase === 'play';
    if (crit) sfx.loop('alarm', 1000); else sfx.stopLoop('alarm');
    this.root.classList.toggle('alarm', !!crit);
    this.root.classList.toggle('lightsout', V.sab?.kind === 'lights' && V.phase === 'play' && me?.team !== 'imp' && me?.alive);
    if (V.phase === 'meeting') this.showMeeting(V);
    else if (V.phase === 'eject') this.showEject(V);
    else if (V.phase === 'ended') this.showEnd(V);
    this.updateMic();
  }
  onPhase({ from, to }) {
    if (to === 'meeting' || to === 'eject' || to === 'ended' || to === 'lobby' || to === 'intro') this.closePanel(true);
    if (from === 'meeting' && to !== 'meeting') this.meetingEl = null;
    if (to === 'play' && (from === 'eject')) { this.clearFs(); }
    if (to === 'lobby') { this.clearFs(); this.endShown = null; sfx.stopAll(); }
    this.lastPhase = to;
  }
  // the sabotage line of the task list, as in the footage: « Reactor Meltdown in 26 (0/2) », « Oxygen Depleted in
  // 19 (1/2) », « Fix Lights (%0) », « Comms Sabotaged »
  sabText(V) {
    const S = V.sab, k = S.kind;
    if (k === 'lights') return `${SAB_LINE.lights} (%${(S.sw || []).every(Boolean) ? 100 : 0})`;
    if (k === 'comms') return SAB_LINE.comms;
    const n = k === 'o2' ? (S.fixed || []).filter(Boolean).length : (S.holds || []).filter(h => h >= 0).length;
    return `${SAB_LINE[k]} dans ${Math.ceil(this.c.left(S.endsAt) / 1000)} (${n}/2)`;
  }
  renderTasks(V) {
    const c = this.c, M = c.map;
    const show = c.inGame && ['play', 'meeting', 'intro'].includes(V.phase);
    this.taskList.parentElement.hidden = !show;
    this.taskbar.hidden = !show || V.taskBar == null || this.freeplay;
    if (V.taskBar != null) this.taskbar.firstChild.style.width = (V.taskBar * 100).toFixed(1) + '%';
    if (!show) return;
    const imp = V.me?.team === 'imp';
    const lines = [];
    if (V.sab) lines.push(el('div', 'sabline', this.sabText(V)));
    if (imp) lines.push(el('div', 'imp', 'Sabote et tue tout le monde.'), el('div', 'fake', 'Fausses tâches :'));
    else if (c.ghost) lines.push(el('div', 'ghost', 'Tu es mort, mais termine tes tâches pour aider ton équipe à gagner.'));
    if (V.me?.role && V.me.role !== 'crewmate' && V.me.role !== 'impostor') lines.push(el('div', 'role', `${ROLES[V.me.role].name} : ${ROLES[V.me.role].blurb}.`));
    for (const t of V.tasks || []) {
      const def = taskDef(V.map, t.id), st = t.steps[Math.min(t.step, t.steps.length - 1)];
      const room = M.consoles[st.console]?.room ? M.rooms.find(r => r.id === M.consoles[st.console].room)?.name : 'Extérieur';
      const multi = t.steps.length > 1 ? ` (${t.step}/${t.steps.length})` : '';
      const wait = !t.done && t.readyAt > c.serverNow();
      lines.push(el('div', t.done ? 'done' : t.step > 0 ? 'started' : '', `${room} : ${def?.name || t.id}${multi}${wait ? ' — en attente' : ''}`));
    }
    if (V.sab?.kind === 'comms' && !imp) lines.splice(1, lines.length);      // crewmates only see « Comms Sabotaged »
    this.taskList.replaceChildren(...lines);
  }
  renderLobby(V) {
    const c = this.c, host = V.host === c.n, s = V.settings, n = V.players.filter(p => !p.bot).length;
    const hostP = V.players.find(p => p.n === V.host);
    const btn = (cls, kids, fn, disabled = false) => { const b = el('button', cls, kids, { type: 'button' }); b.disabled = disabled; b.onclick = () => { sfx.play('click'); fn(); }; return b; };
    const copy = btn('lb-copy', [], () => navigator.clipboard?.writeText(V.code).then(() => this.toast('Code copié'), () => this.toast(`Code : ${V.code}`)));
    copy.innerHTML = ICONS.copy; copy.title = 'Copier le code';
    this.lobby.replaceChildren(
      el('div', 'lb-label', 'CODE DU SALON'),
      el('div', 'lb-code', [el('b', '', this.freeplay ? '—' : V.code), this.freeplay ? null : copy]),
      el('hr'),
      el('div', 'lb-label', 'PARAMÈTRES DU SALON'),
      el('div', 'lb-map', s.map === 'skeld' ? el('img', '', [], { src: 'among/ui/logo-skeld.webp', alt: 'The Skeld' }) : mapLogo(s.map)),
      el('div', 'lb-row', [el('span', '', 'CAPACITÉ'), btn('lb-cap', [crewIcon('red', 30), `${n}/${s.maxPlayers}`], () => this.openCapacity(), !host || this.freeplay)]),
      el('div', 'lb-row', [el('span', '', 'PRÉRÉGLAGE'), el('b', '', PRESETS[V.preset]?.name.toUpperCase() || 'PERSONNALISÉ')]),
      el('div', 'lb-row', [el('span', 'sm', 'CONFIDENTIALITÉ'), btn('lb-priv' + (V.public ? ' pub' : ''), V.public ? 'PUBLIC' : 'PRIVÉ', () => c.send({ k: 'privacy', public: !V.public }), !host || V.mode !== 'online')]),
      el('div', 'lb-label', 'PARAMÈTRES DE JEU'),
      el('div', 'lb-btns', [btn('lb-btn', 'MODIFIER', () => this.openGameSettings(true), !host), btn('lb-btn', 'VOIR', () => this.openGameSettings(false))]),
    );
    this.hostLine.replaceChildren(el('span', '', 'HÔTE :'), crewIcon(hostP?.color || 'red', 34), el('b', '', hostP?.name || ''), host ? el('i', '', '(Toi !)') : null);
    this.hostLine.querySelector('b').style.color = colorOf(hostP?.color).body;
    const ready = n >= MIN_PLAYERS;
    this.startBtn.parentElement.hidden = this.freeplay;
    this.startBtn.textContent = V.phase === 'countdown' ? (host ? 'ANNULER' : 'LANCEMENT…') : !ready ? 'EN ATTENTE DE JOUEURS' : host ? 'COMMENCER' : 'EN ATTENTE DE L’HÔTE';
    this.startBtn.disabled = !host || (!ready && V.phase !== 'countdown');
    this.startBtn.classList.toggle('ready', host && (ready || V.phase === 'countdown'));
  }

  // ------------------------------------------------------------------ events
  onEvent(m) {
    const c = this.c;
    switch (m.e) {
      case 'intro': return this.showIntro(m);
      case 'killed': sfx.play('kill'); return this.showKilled(m);
      case 'kill': sfx.play('kill'); return;
      case 'shielded': this.toast('Ta cible était protégée par un ange gardien !'); sfx.play('protect'); return;
      case 'saved': this.toast('Ta protection a sauvé un équipier !'); return;
      case 'alert': sfx.play('alarm'); this.toast('Alerte : un Tapageur vient d’être tué !'); return;
      case 'meeting': return this.showMeetingSplash(m);
      case 'voted': sfx.play('vote'); return;
      case 'verdict': { const j = c.player(m.judge), t = c.player(m.target); this.toast(`Verdict du Juge contre ${t?.name} : ${m.guilty ? 'COUPABLE' : 'innocent'}${m.dead != null ? ` — ${c.player(m.dead)?.name} est éliminé` : ''}`); sfx.play(m.guilty ? 'kill' : 'lose'); void j; return; }
      case 'taskOpen': if (this.panel?.taskId === m.id && this.panel.api.onStep) { this.panel.api.step = this.c.v?.tasks?.find(x => x.id === m.id)?.steps[m.step] || {}; this.panel.api.onStep(m.step); return; } return this.openTask(m.id, m.step);
      case 'taskDone': sfx.play('taskDone'); return;
      case 'stepDone': sfx.play('taskStep'); return;
      case 'sabotage': this.toast(`Sabotage : ${SAB[m.s] || m.s}`); if (!['reactor', 'o2', 'seismic'].includes(m.s)) sfx.play('alarm'); return;
      case 'doors': sfx.play('door'); return;
      case 'doorOpen': sfx.play('door'); return;
      case 'fixPart': sfx.play('fixed'); return;
      case 'fixed': sfx.play('fixed'); if (this.panel?.sab) this.closePanel(); return;
      case 'vent': this.r.ventFx(m.x, m.y); if (!m.me) sfx.play('vent', .6); return;
      case 'influence': { const p = c.player(m.n); sfx.play('chat'); this.toast(`📣 ${p?.name || 'Influenceur'} : ${m.text}`); return; }
      case 'influenceSent': this.toast('Message envoyé aux coéquipiers en vie.'); return;
      case 'interrogated': this.toast(`${c.player(m.n)?.name} était : ${m.room} au moment du meurtre.`); return;
      case 'settings': { for (const k of m.keys) if (LABELS[k]) this.notice('Changement effectué : ', `${LABELS[k]} = ${fmtSetting(k, c.v?.settings?.[k])}.`); return; }
    }
  }
  notice(text, value) {
    const n = el('div', 'au-notice', [el('i', 'ic'), el('span', '', [text, value ? el('b', '', value) : null])]);
    n.firstChild.innerHTML = ICONS.cog;
    this.lobbyNotes.append(n);
    while (this.lobbyNotes.childElementCount > 5) this.lobbyNotes.firstChild.remove();
    setTimeout(() => n.remove(), 8000);
  }
  onChat(m) {
    if (!m) return;
    if (this.panel?.chat) this.panel.chat(m);
    else if (this.meetingEl?.chat) this.meetingEl.chat(m);
    if (m.n !== this.c.n && !m.sys) { sfx.play('chat'); this.topBtns.chat.classList.add('unread'); }
  }
  onBye(m) {
    const why = { kicked: 'Tu as été exclu de la partie par l’hôte.', closed: 'La partie est terminée.', refused: m.msg }[m.reason] || 'Tu as quitté la partie.';
    this.app.leaveWorld(why);
  }
  onStatus({ s, info }) {
    if (s === 'reconnecting') this.banner('Reconnexion…');
    else if (s === 'online') this.banner(null);
    else if (s === 'closed') this.app.leaveWorld(info || 'La partie n’est plus disponible.');
  }
  banner(text) {
    this.bannerEl?.remove(); this.bannerEl = null;
    if (text) { this.bannerEl = el('div', 'au-banner', text); this.root.append(this.bannerEl); }
  }

  // ------------------------------------------------------------------ panels
  openPanel(build, opts = {}) {
    this.closePanel(true);
    const box = el('div', 'au-panel');
    const close = el('button', 'au-close', '✕', { type: 'button', 'aria-label': 'Fermer' });
    const wrap = el('div', 'au-panelwrap' + (opts.walk ? ' side' : ''), [box, close]);
    this.ov.replaceChildren(wrap);
    const P = { el: box, wrap, walk: !!opts.walk, ...opts };
    const api = {
      done: () => opts.onDone?.(), close: () => this.closePanel(), sfx: n => sfx.play(n), step: opts.step || {}, index: opts.index,
      roomName: id => { const M = this.c.map; const cs = id ? M.consoles[id] : null; return cs?.room ? M.rooms.find(r => r.id === cs.room)?.name : M.roomAt(this.c.pos.x, this.c.pos.y)?.name || 'Extérieur'; },
      sab: this.c.v?.sab, fix: msg => this.c.send({ k: 'fix', i: opts.index, ...msg }),
      me: { name: this.c.self?.name, color: this.c.self?.color, colorName: colorOf(this.c.self?.color).name },
    };
    P.api = api;
    close.onclick = () => { sfx.play('click'); this.closePanel(); };
    this.panel = P;
    try { build(box, api, P); } catch (e) { console.error(e); }
    if (api.onSab) P.onView = V => { api.sab = V.sab; api.onSab(); };
    else P.onView = P.onView || (V => { api.sab = V.sab; });
    return P;
  }
  closePanel(silent = false) {
    const P = this.panel;
    if (!P) return;
    this.panel = null;
    try { P.api?.onClose?.(); } catch { /* ignore */ }
    P.onClosed?.();
    this.ov.replaceChildren();
    if (!silent) sfx.play('click');
  }
  closePanelIfFar() {
    const P = this.panel;
    if (P?.console && d2(this.c.pos, P.console) > USE_RANGE + 1.2) this.closePanel(true);
  }
  openTask(id, step, peek = false) {
    const c = this.c, t = c.v?.tasks?.find(x => x.id === id);
    if (!t) return;
    const st = t.steps[step], game = MINIGAMES[st.game];
    if (!game) { this.toast('Mini-jeu introuvable : ' + st.game); return; }
    const cs = c.map.consoles[st.console];
    const P = this.openPanel((box, api) => {
      box.classList.add('au-mgbox');
      // chained steps stay on screen: advance() completes the current step without closing, reopen() asks the
      // authority for the next one when its wait is over, left() is that wait in ms
      Object.assign(api, {
        peek, task: t,
        left: () => Math.max(0, (c.v?.tasks?.find(x => x.id === id)?.readyAt || 0) - c.serverNow()),
        advance: () => c.send({ k: 'task', a: 'done', id }),
        reopen: () => c.send({ k: 'task', a: 'open', id }),
      });
      game(box, api);
    }, {
      step: st, console: cs,
      onDone: () => { c.send({ k: 'task', a: 'done', id }); this.closePanel(true); },
      onClosed: () => c.send({ k: 'task', a: 'close', id }),
    });
    P.taskId = id;
  }
  openSabotageFix(i) {
    const V = this.c.v, kind = V.sab?.kind;
    const game = { reactor: MINIGAMES.reactorHand, seismic: MINIGAMES.seismicHand, o2: MINIGAMES.o2Keypad, lights: MINIGAMES.lights, comms: MINIGAMES.comms }[kind];
    if (!game) return;
    const P = this.openPanel((box, api) => { box.classList.add('au-mgbox'); game(box, api); }, { index: i, sab: true, console: this.c.map.sabotage[kind][i] });
    P.sab = true;
  }
  openSystem(s) {
    const c = this.c;
    const P = this.openPanel((box, api, P) => {
      box.classList.add('au-sys', s);
      const body = el('div', 'au-sysbody');
      box.append(el('h2', '', { admin: 'Admin — plan du vaisseau', cams: 'Sécurité — caméras', vitals: 'Signes vitaux' }[s]), body);
      P.onView = V => this.renderSystem(s, body, V, P);
      P.onView(c.v);
      P.tick = () => { if (s === 'cams') this.renderCams(body, c.v, P); };
    }, { walk: false, console: s === 'vitals' && c.v.me.role === 'scientist' ? null : (s === 'admin' ? c.map.admin : s === 'cams' ? c.map.cams : c.map.vitals), onClosed: () => c.send({ k: 'sys', s: null }) });
    return P;
  }
  renderSystem(s, body, V, P) {
    const c = this.c, D = V.sysData;
    if (V.me?.sys !== s && !(s === 'vitals' && V.me?.role === 'scientist')) { body.replaceChildren(el('p', 'au-note', 'Connexion…')); return; }
    if (!D) return;
    if (D.comms) { body.replaceChildren(el('p', 'au-note red', 'Communications sabotées : aucun signal.')); return; }
    if (s === 'vitals' && D.vitals) {
      body.replaceChildren(el('div', 'au-vitals', D.vitals.map(([n, st]) => { const p = c.player(n) || c.looks[n]; return el('div', `vital ${st}`, [crewIcon(p?.color || 'red', 38, { dead: st !== 'ok' }), el('b', '', p?.name || '?'), el('i', '', st === 'ok' ? 'OK' : st === 'dead' ? 'MORT' : 'D/C')]); })));
      if (V.me.role === 'scientist') body.append(el('div', 'au-battery', [el('i', '', ''), el('span', '', 'Batterie')]));
      const bat = body.querySelector('.au-battery i'); if (bat) bat.style.width = Math.max(0, V.me.battery / (V.settings.roles.scientist.batteryDuration * 1000) * 100) + '%';
    }
    if (s === 'admin' && D.admin) {
      const M = c.map; let mapEl = body.querySelector('.au-adminmap');
      if (!mapEl) { mapEl = el('div', 'au-adminmap', el('img', '', [], { src: `among/maps/${M.id}.webp`, alt: '' })); body.replaceChildren(mapEl); }
      const img = mapEl.firstChild, W = img.naturalWidth || 1170;
      mapEl.querySelectorAll('.cnt').forEach(e => e.remove());
      for (const r of M.rooms) { const n = D.admin[r.id] || 0; if (!n || !r.label) continue; const d = el('div', 'cnt', Array.from({ length: Math.min(n, 6) }, () => el('i'))); d.style.left = (r.label[0] * M.k / W * 100) + '%'; d.style.top = (r.label[1] * M.k / (img.naturalHeight || 907) * 100) + '%'; mapEl.append(d); }
    }
    if (s === 'cams') { P.camData = D.cams; }
  }
  renderCams(body, V, P) {
    const c = this.c, M = c.map, views = M.cams?.views || [];
    if (!body.querySelector('.au-cams')) body.replaceChildren(el('div', 'au-cams', views.map(v => el('div', 'cam', [el('canvas', '', [], { width: 320, height: 200 }), el('span', '', v.name)]))));
    if (!P.camData) return;
    const img = mapImage(M.id), art = { k: M.k * (img.naturalWidth || 1170) / 1170 };
    body.querySelectorAll('.cam canvas').forEach((cv, i) => {
      const v = views[i], data = P.camData[i]; if (!v || !data) return;
      const g = cv.getContext('2d'), U = 200 / 6;
      g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; g.fillRect(0, 0, 320, 200);
      g.setTransform(U, 0, 0, U, 160 - v.x * U, 100 - v.y * U);
      if (img.complete) g.drawImage(img, 0, 0, img.naturalWidth / art.k, img.naturalHeight / art.k);
      for (const [n, x, y] of data.b) drawDead(g, c.player(n)?.color || 'red', x, y, CREW_HEIGHT);
      for (const [, x, y, f, look] of data.p.sort((a, b) => a[2] - b[2])) drawCrew(g, c.player(look)?.color || 'red', x, y, CREW_HEIGHT, { left: !!(f & 2), frame: f & 1 ? Math.floor(performance.now() / 42) % 12 : -1 });
      g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(120,255,160,.06)'; for (let y = 0; y < 200; y += 3) g.fillRect(0, y, 320, 1);
    });
  }

  // the map: position, tasks, and for impostors the sabotage buttons and the doors
  openMap(sabotage) {
    const c = this.c, V = c.v, M = c.map;
    if (!c.inGame || c.phase !== 'play') return;
    if (this.panel?.mapPanel) { this.closePanel(); return; }
    const P = this.openPanel((box, api, P) => {
      box.className = 'au-panel au-mappanel' + (sabotage ? ' sab' : '');
      // the in-game map: rooms in blue, corridors lighter, white outlines, over the game
      const art = minimap(M.id, sabotage);
      const layer = el('div', 'au-maplayer');
      const wrap = el('div', 'au-mapwrap', [art.svg, layer]);
      wrap.style.aspectRatio = String(art.ratio);
      // same size on screen as in the game (the traced screenshots are 2000×924)
      const [bx0, by0, bx1, by1] = MINIMAP[M.id].box; wrap.style.width = `min(${(bx1 - bx0) / 20}vw, ${(by1 - by0) / 9.24 * art.ratio}vh)`;
      box.append(wrap);
      const pos = art.at;
      const marker = (cls, x, y, content) => { const d = el('div', 'mk ' + cls, content); const [l, t] = pos(x, y); d.style.left = l; d.style.top = t; layer.append(d); return d; };
      P.render = () => {
        layer.replaceChildren();
        const VV = c.v; if (!VV) return;
        if (!sabotage) taskMarks(VV, M, art.xy, art.ratio).forEach(([l, t]) => { const d = el('div', 'mk task', el('i')); d.style.left = l + '%'; d.style.top = t + '%'; layer.append(d); });
        marker('me', c.pos.x, c.pos.y, crewIcon(c.self?.color || 'red', 26));
        if (VV.trackPos) marker('track', VV.trackPos[0], VV.trackPos[1], crewIcon(c.player(VV.me.track?.n)?.color || 'red', 22));
        if (VV.sab) for (const s of M.sabotage[VV.sab.kind] || []) marker('sabspot', s.x, s.y, '⚠');
        if (sabotage) {
          const now = c.serverNow(), cd = Math.max(0, (VV.sabReadyAt || 0) - now);
          const where = { reactor: 'reactor', o2: 'o2', lights: 'electrical', comms: 'comms', seismic: 'lab' };
          for (const kind of Object.keys(M.sabotage)) {
            const room = M.rooms.find(r => r.id === where[kind]) || M.rooms.find(r => r.id === M.sabotage[kind][0].room);
            const b = el('button', `sabbtn ${kind}`, [el('span', '', SAB[kind]), cd > 0 ? el('i', '', Math.ceil(cd / 1000)) : null], { type: 'button' });
            b.disabled = !!VV.sab || cd > 0;
            b.onclick = () => { c.send({ k: 'sab', s: kind }); sfx.play('click'); this.closePanel(true); };
            const [l, t] = pos(room.label[0], room.label[1] + 1.2); b.style.left = l; b.style.top = t; layer.append(b);
          }
          const rooms = [...new Set(M.doors.map(d => d.room))];
          for (const r of rooms) {
            const room = M.rooms.find(x => x.id === r); if (!room?.label) continue;
            const rd = Math.max(0, (VV.doorReadyAt?.[r] ?? VV.sabReadyAt ?? 0) - now);
            const b = el('button', 'doorbtn', [el('span', '', '🚪'), rd > 0 ? el('i', '', Math.ceil(rd / 1000)) : null], { type: 'button', title: `Fermer les portes : ${room.name}` });
            b.disabled = rd > 0; b.onclick = () => c.send({ k: 'door', room: r });
            const [l, t] = pos(room.label[0] + 1.6, room.label[1] - .4); b.style.left = l; b.style.top = t; layer.append(b);
          }
        }
      };
      P.at = art.at;
      P.render();
      let acc = 0; P.tick = dt => { acc += dt; if (acc > .25) { acc = 0; P.render(); } };
    }, { walk: true });
    P.mapPanel = true;
    this.root.classList.add('mapopen'); P.onClosed = () => this.root.classList.remove('mapopen');
  }

  openChat() {
    const c = this.c;
    this.topBtns.chat.classList.remove('unread');
    if (this.meetingEl) { this.meetingEl.openChat?.(); return; }
    const P = this.openPanel((box, api, P) => {
      box.className = 'au-panel au-chat';
      const list = el('div', 'au-chatlist'), inp = el('input', 'au-chatin', [], { maxlength: 100, placeholder: c.ghost ? 'Message aux fantômes…' : 'Écris un message…', 'aria-label': 'Message' });
      const send = () => { const t = inp.value.trim(); if (!t) return; c.send({ k: 'chat', text: t }); inp.value = ''; };
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); e.stopPropagation(); });
      box.append(el('h2', '', c.ghost ? 'Discussion des fantômes' : 'Discussion'), list, el('div', 'au-chatrow', [inp, (() => { const b = el('button', 'au-btn primary', 'Envoyer', { type: 'button' }); b.onclick = send; return b; })()]));
      const add = m => list.append(chatLine(c, m));
      c.chat.forEach(add); list.scrollTop = 1e6;
      P.chat = m => { add(m); list.scrollTop = 1e6; };
      setTimeout(() => inp.focus(), 50);
    }, { walk: !c.inGame || c.ghost });
    return P;
  }

  openSettings() {
    const c = this.c, v = this.voice;
    this.openPanel(async (box) => {
      box.className = 'au-panel au-settings';
      const devs = await v.devices();
      const sel = (kind, list, cur) => { const s = el('select', 'au-select', [el('option', '', 'Par défaut', { value: '' }), ...list.map(d => el('option', '', d.label || (kind === 'mic' ? 'Micro' : 'Sortie') + ' ' + d.deviceId.slice(0, 4), { value: d.deviceId, selected: d.deviceId === cur }))]); s.onchange = () => v.setDevice(kind, s.value); return s; };
      const meter = el('div', 'au-meter', el('i'));
      const lvl = setInterval(() => { if (!meter.isConnected) clearInterval(lvl); else meter.firstChild.style.width = Math.round(v.level * 100) + '%'; }, 90);
      const toggle = (label, on, fn) => { const b = el('button', 'au-toggle' + (on ? ' on' : ''), label, { type: 'button' }); b.onclick = () => { fn(!b.classList.contains('on')); b.classList.toggle('on'); }; return b; };
      const players = (c.v?.players || []).filter(p => p.n !== c.n && !p.bot);
      box.append(el('h2', '', 'Réglages'),
        el('section', '', [el('h3', '', 'Chat vocal de proximité'),
          el('p', 'au-note', c.v?.settings?.voiceChat === false ? 'L’hôte a désactivé le chat vocal.' : `Portée : ${c.v?.settings?.voiceRange ?? 6} m · les vivants n’entendent que les vivants, les fantômes que les fantômes.`),
          el('div', 'au-row', [(() => { const b = el('button', 'au-btn primary', v.state === 'on' ? 'Couper le chat vocal' : 'Activer le micro', { type: 'button' }); b.onclick = () => { if (v.state === 'on') v.stop(); else v.start(); this.closePanel(true); }; return b; })(), toggle('Micro coupé', v.selfMuted, x => v.setMuted(x)), toggle('Appuyer pour parler (T)', v.prefs.ptt, x => v.setPTT(x))]),
          el('label', 'au-field', [el('span', '', 'Micro'), sel('mic', devs.filter(d => d.kind === 'audioinput'), v.prefs.mic)]),
          'setSinkId' in HTMLMediaElement.prototype ? el('label', 'au-field', [el('span', '', 'Écouteurs / haut-parleur'), sel('out', devs.filter(d => d.kind === 'audiooutput'), v.prefs.out)]) : el('p', 'au-note', IOS ? 'Sur iPhone et iPad, la sortie audio se choisit dans le Centre de contrôle (AirPlay / Bluetooth).' : 'Ce navigateur ne permet pas de choisir la sortie audio.'),
          el('label', 'au-field', [el('span', '', 'Test du micro'), meter]),
          players.length ? el('div', 'au-peerlist', players.map(p => { const r = el('input', '', [], { type: 'range', min: 0, max: 1.5, step: .05, value: v.volumeOf(p.id) }); r.oninput = () => v.setVolume(p.id, +r.value); return el('div', 'au-peer', [crewIcon(p.color, 26), el('b', '', p.name), r, toggle('Muet', !!v.prefs.muted[p.id], x => v.setPeerMuted(p.id, x))]); })) : null]),
        el('section', '', [el('h3', '', 'Partie'), el('div', 'au-row', [(() => { const b = el('button', 'au-btn danger', 'Quitter la partie', { type: 'button' }); b.onclick = () => this.app.leaveWorld(); return b; })()])]));
    }, { walk: true });
  }

  // the host changes the capacity of the room from the CAPACITÉ box of the lobby panel
  openCapacity() {
    const c = this.c;
    this.openPanel((box, api, P) => {
      box.className = 'au-panel au-capacity';
      const render = () => {
        const V = c.v; if (!V || c.inGame) return;
        const n = V.players.filter(p => !p.bot).length, m = V.settings.maxPlayers, D = SETTINGS.maxPlayers;
        const pm = (t, d, ok) => { const b = el('button', 'gs-pm', t, { type: 'button' }); b.disabled = !ok; b.onclick = () => { sfx.play('click'); c.send({ k: 'set', settings: { maxPlayers: m + d } }); }; return b; };
        box.replaceChildren(el('h2', '', 'CAPACITÉ'), el('div', 'gs-step', [pm('−', -1, m > Math.max(D.min, n)), el('b', 'gs-val', [crewIcon('red', 30), ` ${m}`]), pm('+', 1, m < D.max)]));
      };
      render(); P.onView = render;
    }, { walk: true });
  }
  // the tablet of the lobby: who is in the room (the host can exclude a player)
  openPlayers() {
    const c = this.c;
    this.openPanel((box, api, P) => {
      box.className = 'au-panel au-players';
      const render = () => {
        const V = c.v; if (!V || c.inGame) return;
        const host = V.host === c.n, list = V.players.filter(p => !p.bot);
        box.replaceChildren(el('h2', '', `JOUEURS ${list.length}/${V.settings.maxPlayers}`), el('div', 'au-plist', list.map(p => el('div', 'au-prow', [
          crewIcon(p.color, 34), el('b', '', p.name), p.n === V.host ? el('i', '', 'Hôte') : null,
          host && p.n !== c.n ? (() => { const b = el('button', 'au-btn small danger', 'Exclure', { type: 'button' }); b.onclick = () => c.send({ k: 'kick', id: p.id }); return b; })() : null]))));
      };
      render(); P.onView = render;
    }, { walk: true });
  }
  openCustomize() {
    const c = this.c;
    if (c.inGame) return;
    this.openPanel((box, api, P) => {
      box.className = 'au-panel au-custom';
      const tabs = [['Couleurs', 'color'], ['Chapeaux', 'hat'], ['Skins', 'skin'], ['Visières', 'visor'], ['Familiers', 'pet'], ['Plaques', 'plate']];
      let tab = 'color';
      const head = el('div', 'au-tabs'), grid = el('div', 'au-cgrid'), preview = el('canvas', 'au-preview', [], { width: 240, height: 300 }), label = el('div', 'au-plabel');
      const render = () => {
        head.replaceChildren(...tabs.map(([n, k]) => { const b = el('button', 'au-tab' + (k === tab ? ' on' : ''), n, { type: 'button' }); b.onclick = () => { tab = k; render(); }; return b; }));
        const V = c.v, mine = c.self;
        const taken = new Set((V?.players || []).filter(p => p.n !== c.n).map(p => p.color));
        if (tab === 'color') grid.replaceChildren(...COLORS.map(col => { const b = el('button', 'au-swatch' + (mine?.color === col.id ? ' on' : '') + (taken.has(col.id) ? ' taken' : ''), [], { type: 'button', title: col.name, style: `--c:${col.body};--s:${col.shade}` }); b.disabled = taken.has(col.id); b.onclick = () => { c.send({ k: 'look', color: col.id }); this.app.prof.color = col.id; saveProfile(this.app.prof); sfx.play('click'); }; return b; }));
        else grid.replaceChildren(el('div', 'au-missing', [el('b', '', 'AUCUN'), el('p', '', 'Les sprites de cette catégorie ne sont pas dans le projet. Déposez des sprites autorisés dans public/among/sprites pour les activer.')]));
        const g = preview.getContext('2d'); g.clearRect(0, 0, 240, 300);
        drawCrew(g, mine?.color || 'red', 120, 280, 250);
        label.textContent = colorOf(mine?.color).name.toUpperCase();
      };
      box.append(head, el('div', 'au-custombody', [grid, el('div', 'au-pwrap', [preview, label])]));
      render();
      P.onView = () => render();
    }, { walk: false });
  }

  // « Paramètres de jeu », laid out like the game: help box and three tabs on the left; presets, game settings (map,
  // sections) or role settings (strip of role tabs, counts and chances, then each role's page) on the right
  openGameSettings(edit) {
    const c = this.c;
    this.openPanel((box, api, P) => {
      box.className = 'gs';
      P.wrap.classList.add('gsw');
      this.root.classList.add('gsopen');
      let tab = 'presets', role = 'all';
      const left = el('div', 'gs-left'), right = el('div', 'gs-right');
      box.append(left, right);
      const S = () => c.v.settings;
      const send = patch => { if (edit) c.send({ k: 'set', settings: patch }); };
      const ui = (src, cls = '') => el('img', cls, [], { src: `among/ui/gs/${src}.webp`, alt: '', draggable: 'false' });
      const btn = (cls, kids, fn, disabled = false) => { const b = el('button', cls, kids, { type: 'button' }); b.disabled = disabled; b.onclick = () => { sfx.play('click'); fn(); }; return b; };
      const stepper = (val, dec, inc, canDec = true, canInc = true) => el('div', 'gs-step', [
        btn('gs-pm', '−', dec, !edit || !canDec), el('b', 'gs-val', val), btn('gs-pm', '+', inc, !edit || !canInc)]);
      const check = (on, fn) => btn('gs-check' + (on ? ' on' : ''), [], fn, !edit);
      const label = text => el('span', 'gs-lbl' + (text.length > 24 ? ' long' : ''), text);
      const control = (def, v, set, fmt) => {
        if (def.type === 'bool') return check(v, () => set(!v));
        if (def.type === 'enum') { const i = def.opts.findIndex(o => o[0] === v); return stepper(fmt(v), () => set(def.opts[i - 1][0]), () => set(def.opts[i + 1][0]), i > 0, i < def.opts.length - 1); }
        return stepper(fmt(v), () => set(+(v - def.step).toFixed(2)), () => set(+(v + def.step).toFixed(2)), v > def.min, v < def.max);
      };
      const setting = k => [label(LABELS[k]), control(SETTINGS[k], S()[k], x => send({ [k]: x }), x => fmtSetting(k, x))];
      const section = name => el('div', 'gs-sec', el('i', '', name));
      const HELP = { presets: 'Appliquez les paramètres recommandés dans le salon du jeu.', game: 'Modifiez les paramètres de votre salon de jeu.', roles: 'Modifiez les paramètres des rôles de votre salon.' };
      const MAPS = ['skeld', 'mira', 'polus', 'airship', 'fungle'];
      const pages = {
        presets: () => [el('div', 'gs-presets', Object.entries(PRESETS).map(([id, p]) => btn('gs-preset' + (c.v.preset === id ? ' on' : ''), [ui('preset-' + id), el('b', '', p.name.toUpperCase())], () => c.send({ k: 'set', preset: id }), !edit)))],
        game: () => [el('div', 'gs-scroll', [
          el('div', 'gs-banner ' + S().map, S().map === 'skeld' ? ui('banner-skeld') : [el('img', '', [], { src: `among/maps/${S().map}.webp`, alt: '' }), el('b', '', 'POLUS')]),
          el('div', 'gs-maprow', [el('span', 'gs-maplbl', 'CARTE'), ...MAPS.map(m => {
            const on = S().map === m, ok = SETTINGS.map.opts.some(o => o[0] === m);
            const b = btn('gs-map' + (on ? ' on' : '') + (ok ? '' : ' na'), ui(`map-${m}${on ? '-on' : ''}`), () => (ok ? send({ map: m }) : this.toast('Cette carte n’est pas encore disponible.')), !edit && ok);
            b.title = ok ? SETTINGS.map.opts.find(o => o[0] === m)[1] : 'Bientôt';
            return b;
          })]),
          ...SETTING_GROUPS.flatMap(([g, keys]) => [section(g.toUpperCase()), el('div', 'gs-grid', keys.flatMap(setting))]),
        ])],
        roles: () => {
          const R = S().roles, list = [...CREW_ROLES, ...IMP_ROLES];
          const strip = el('div', 'gs-strip', [btn('gs-rtab all', ui(role === 'all' ? 'tab-all-on' : 'tab-all'), () => { role = 'all'; render(); }),
            ...list.map(r => btn('gs-rtab', ui(`tab-${r}${role === r ? '-on' : ''}`), () => { role = r; render(); }))]);
          strip.querySelectorAll('.gs-rtab')[role === 'all' ? 0 : list.indexOf(role) + 1].classList.add('on');
          let body;
          if (role === 'all') {
            const table = (team, roles, title) => [el('div', 'gs-team ' + team, el('i', '', title)),
              el('div', 'gs-table ' + team, [el('span', 'h'), el('span', 'h', 'NBRE DE RÔLES'), el('span', 'h', '% DE CHANCE'),
                ...roles.flatMap(r => [btn('gs-rname', ROLES[r].name, () => { role = r; render(); }),
                  stepper(String(R[r].count), () => send({ roles: { [r]: { count: R[r].count - 1 } } }), () => send({ roles: { [r]: { count: R[r].count + 1 } } }), R[r].count > 0, R[r].count < (team === 'imp' ? 3 : MAX_PLAYERS)),
                  stepper(String(R[r].chance), () => send({ roles: { [r]: { chance: R[r].chance - 10 } } }), () => send({ roles: { [r]: { chance: R[r].chance + 10 } } }), R[r].chance > 0, R[r].chance < 100)])])];
            body = el('div', 'gs-scroll roles', [section('NOMBRE DE RÔLES'), ...table('crew', CREW_ROLES, 'Rôles des coéquipiers'), ...table('imp', IMP_ROLES, 'Rôles des imposteurs')]);
          } else {
            const team = ROLES[role].team;
            const opts = Object.entries(ROLE_OPTIONS[role]).filter(([, d]) => !d.hidden);
            body = el('div', 'gs-scroll roles', [section('PARAMÈTRES DES RÔLES'), el('div', 'gs-team name ' + team, el('i', '', ROLES[role].name)),
              el('div', 'gs-rolebox', [ui('role-' + role, 'pic'), el('div', 'gs-info', [el('b', '', 'INFO'), el('p', '', ROLE_INFO[role])]),
                el('div', 'gs-grid opts', opts.flatMap(([k, d]) => [label(ROLE_LABELS[k]), control(d, R[role][k], x => send({ roles: { [role]: { [k]: x } } }), x => fmtRoleOpt(role, k, x))]))])]);
          }
          return [strip, body];
        },
      };
      const render = () => {
        if (!c.v) return;
        const scroll = right.querySelector('.gs-scroll')?.scrollTop || 0, sl = right.querySelector('.gs-strip')?.scrollLeft;
        left.replaceChildren(el('h2', '', 'PARAMÈTRES DE JEU'), el('div', 'gs-help', [ui('help'), el('p', '', HELP[tab])]),
          ...[['presets', 'PRÉRÉGLAGES DE JEU'], ['game', 'PARAMÈTRES DE JEU'], ['roles', 'RÉGLAGES DES RÔLES']].map(([k, n]) => btn('gs-tab' + (tab === k ? ' on' : ''), el('span', '', n), () => { tab = k; role = 'all'; render(); })));
        right.replaceChildren(el('div', 'gs-head'), ...pages[tab]());
        const sc = right.querySelector('.gs-scroll'); if (sc && P.lastTab === tab + role) sc.scrollTop = scroll;
        const st = right.querySelector('.gs-strip');
        if (st) st.scrollLeft = sl ?? 0; if (st && P.lastTab !== tab + role) st.querySelector('.gs-rtab.on')?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        P.lastTab = tab + role;
      };
      render();
      P.onView = () => render();
      P.onClosed = () => this.root.classList.remove('gsopen');
    }, { walk: false });
  }
  openFreeplayRoles() {
    const c = this.c;
    this.openPanel((box, api) => {
      box.className = 'au-panel au-pick';
      box.append(el('h2', '', 'Choisis un rôle'), el('div', 'au-pickgrid', Object.entries(ROLES).map(([id, r]) => { const b = el('button', 'au-pickbtn ' + r.team, [el('b', '', r.name), el('span', '', r.blurb)], { type: 'button' }); b.onclick = () => { api.close(); c.send({ k: 'fp', a: 'stop' }); setTimeout(() => c.send({ k: 'fp', a: 'start', map: c.v?.map || 'skeld', role: id }), 150); }; return b; })));
    });
  }
  openNotes() {
    const c = this.c, n = c.v?.me?.notes;
    this.openPanel(box => {
      box.className = 'au-panel au-notes';
      if (!n?.found) { box.append(el('h2', '', 'Carnet du Détective'), el('p', 'au-note', 'Aucun corps découvert pour l’instant.')); return; }
      const victim = c.player(n.victim);
      box.append(el('h2', '', 'Carnet du Détective'),
        el('div', 'nt-victim', [crewIcon(victim?.color || 'red', 56, { dead: true }), el('div', '', [el('b', '', 'VICTIME : ' + (victim?.name || '?')), el('p', '', 'TROUVÉ MORT : ' + (n.room || '?')), el('p', '', 'TUEUR : ' + (n.killerRole && c.v.settings.roles.detective.revealKiller ? ROLES[n.killerRole].name : 'Imposteur ?'))])]),
        el('h3', '', 'SUSPECTS — position au moment du meurtre'),
        el('div', 'nt-sus', n.suspects.length ? n.suspects.map(s => { const p = c.player(s.n); return el('div', '', [crewIcon(p?.color || 'red', 30), el('b', '', p?.name), ' : ', s.room]); }) : el('p', 'au-note', 'Approche-toi d’un joueur et utilise « Interroger ».')));
    }, { walk: true });
  }

  // ------------------------------------------------------------------ full-screen sequences
  clearFs() { this.fs.replaceChildren(); this.fsTick = null; this.meetingEl = null; }
  fullscreen(cls, kids) { this.fs.replaceChildren(el('div', `au-seq ${cls}`, kids)); return this.fs.firstChild; }
  showIntro(m) {
    const c = this.c, imp = m.team === 'imp', role = ROLES[m.role];
    this.closePanel(true);
    const t0 = performance.now();
    this.seqUntil = t0 + 6400;
    const shhh = el('img', 'shhh', [], { src: 'among/img/shhh.webp', alt: '' });
    const seq = this.fullscreen('au-intro', [shhh]);
    sfx.play('shhh');
    const lineup = el('canvas', 'lineup', [], { width: 1200, height: 420 });
    setTimeout(() => {
      if (!seq.isConnected) return;
      sfx.play(imp ? 'introImp' : 'introCrew');
      const mates = m.mates.map(n => c.player(n)).filter(Boolean);
      const meFirst = [mates.find(p => p.n === c.n), ...mates.filter(p => p.n !== c.n)].filter(Boolean);
      seq.replaceChildren(el('div', 'team ' + (imp ? 'imp' : 'crew'), imp ? 'Imposteur' : 'Coéquipier'),
        el('div', 'sub', imp ? '' : [`Il y a ${m.impostors} `, el('b', '', m.impostors > 1 ? 'Imposteurs' : 'Imposteur'), ' parmi nous']), lineup);
      const g = lineup.getContext('2d');
      const glow = g.createRadialGradient(600, 380, 10, 600, 380, 560); glow.addColorStop(0, imp ? 'rgba(255,40,40,.45)' : 'rgba(80,255,240,.35)'); glow.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = glow; g.fillRect(0, 0, 1200, 420);
      const order = []; meFirst.forEach((p, i) => { if (i === 0) order.push(p); else if (i % 2) order.push(p); else order.unshift(p); });
      const mid = order.indexOf(meFirst[0]);
      order.forEach((p, i) => { const k = i - mid, s = 1 - Math.min(.45, Math.abs(k) * .09); drawCrew(g, p.color, 600 + k * 120 * s, 380 - Math.abs(k) * 10, 250 * s, { left: k > 0, alpha: k ? .85 : 1 }); });
    }, 1600);
    setTimeout(() => {
      if (!seq.isConnected) return;
      sfx.role(m.role);
      const cv = el('canvas', 'me', [], { width: 300, height: 340 });
      seq.replaceChildren(el('div', 'yr', 'Ton rôle est'), el('div', 'role ' + (imp ? 'imp' : 'crew'), role.name), cv, el('div', 'blurb ' + (imp ? 'imp' : 'crew'), role.blurb));
      drawCrew(cv.getContext('2d'), c.self?.color || 'red', 150, 320, 260);
    }, 4200);
    setTimeout(() => { if (this.c.phase !== 'meeting') this.clearFs(); }, 6500);
  }
  showKilled(m) {
    const c = this.c, killer = c.player(m.by), me = c.self;
    this.closePanel(true);
    this.seqUntil = performance.now() + 2300;
    const cv = el('canvas', '', [], { width: 900, height: 360 });
    const seq = this.fullscreen('au-kill', [cv]);
    const g = cv.getContext('2d'); const t0 = performance.now();
    this.fsTick = t => {
      const k = Math.min(1, (t - t0) / 1800);
      g.clearRect(0, 0, 900, 360);
      g.fillStyle = '#5a0000'; g.fillRect(0, 40, 900, 280);
      g.fillStyle = `rgba(255,30,30,${.5 * (1 - k)})`; g.fillRect(0, 40, 900, 280);
      const lunge = Math.min(1, k * 3);
      if (killer) drawCrew(g, killer.color, 250 + lunge * 160, 300, 220, { frame: k < .3 ? Math.floor(k * 40) % 12 : -1 });
      if (k < .45) drawCrew(g, me?.color || 'red', 620, 300, 220, { left: true });
      else drawDead(g, me?.color || 'red', 640, 300, 220, { left: true });
      if (k >= 1) { this.fsTick = null; setTimeout(() => { if (seq.isConnected && c.phase === 'play') this.clearFs(); }, 400); }
    };
  }
  showMeetingSplash(m) {
    const c = this.c, report = m.body != null, caller = c.player(m.caller), body = report ? c.player(m.body) : null;
    sfx.stopLoop('alarm');
    sfx.play(report ? 'report' : 'emergency');
    this.closePanel(true);
    this.seqUntil = performance.now() + 3000;
    const cv = el('canvas', '', [], { width: 600, height: 300 });
    this.fullscreen('au-splash ' + (report ? 'report' : 'emergency'), [el('div', 'title', report ? 'Corps signalé' : 'Réunion d’urgence !'), cv]);
    const g = cv.getContext('2d');
    if (report) drawDead(g, body?.color || 'red', 300, 270, 200); else drawCrew(g, caller?.color || 'red', 300, 280, 230);
    this.meetingEl = null;
    setTimeout(() => { if (c.phase === 'meeting') this.showMeeting(c.v, true); }, 3000);
  }
  showMeeting(V, force = false) {
    const c = this.c, M = V.meeting;
    if (!M) return;
    if (!force && !this.meetingEl && c.left(M.startedAt + 3000) > 0) return;       // the splash is still on
    if (!this.meetingEl) this.buildMeeting();
    this.meetingEl.update(V);
  }
  buildMeeting() {
    const c = this.c;
    const grid = el('div', 'mt-grid'), timer = el('div', 'mt-timer'), skip = el('button', 'mt-skip', 'PASSER LE VOTE', { type: 'button' });
    const skipVotes = el('div', 'mt-skipvotes');
    const chatList = el('div', 'au-chatlist'), chatIn = el('input', 'au-chatin', [], { maxlength: 100, placeholder: c.ghost ? 'Message aux fantômes…' : 'Écris un message…', 'aria-label': 'Message' });
    const chatBox = el('div', 'mt-chat hide', [chatList, el('div', 'au-chatrow', [chatIn, (() => { const b = el('button', 'au-btn primary', 'Envoyer', { type: 'button' }); b.onclick = () => send(); return b; })()])]);
    const send = () => { const t = chatIn.value.trim(); if (t) { c.send({ k: 'chat', text: t }); chatIn.value = ''; } };
    chatIn.addEventListener('keydown', e => { if (e.key === 'Enter') send(); e.stopPropagation(); });
    const chatBtn = el('button', 'mt-chatbtn', '💬', { type: 'button', 'aria-label': 'Discussion' });
    chatBtn.onclick = () => { chatBox.classList.toggle('hide'); chatBtn.classList.remove('unread'); if (!chatBox.classList.contains('hide')) setTimeout(() => chatIn.focus(), 30); };
    const notes = el('button', 'mt-notes', 'Notes', { type: 'button' }); notes.onclick = () => this.openNotes();
    const tablet = el('div', 'mt-tablet', [el('div', 'mt-head', [el('h1', '', 'Qui est l’Imposteur ?'), chatBtn]), grid, el('div', 'mt-foot', [skip, skipVotes, notes, timer]), chatBox]);
    this.fullscreen('au-meeting', [tablet]);
    c.chat.forEach(m => chatList.append(chatLine(c, m))); chatList.scrollTop = 1e6;
    let pick = null;
    skip.onclick = () => { const V = c.v; if (!V.me.alive || V.meeting.myVote != null || c.left(V.meeting.discussEnd) > 0) return; pick = pick === 'skip' ? null : 'skip'; this.meetingEl.update(V); };
    const E = this.meetingEl = {
      chat: m => { chatList.append(chatLine(c, m)); chatList.scrollTop = 1e6; if (chatBox.classList.contains('hide')) chatBtn.classList.add('unread'); },
      openChat: () => chatBtn.click(),
      update: V => {
        const M = V.meeting; if (!M) return;
        const me = V.me, voting = c.left(M.discussEnd) <= 0 && !M.results, canVote = me.alive && M.myVote == null && voting;
        const judge = me.role === 'judge' && me.alive && me.uses > 0 && !M.results && c.left(M.startedAt + 3000) <= 0 && !judgeLocked({ tasks: V.tasks }, V.settings.roles.judge);
        notes.hidden = !(me.role === 'detective');
        const res = M.results;
        const players = V.players.filter(p => !p.bot && !p.spectator).sort((a, b) => (a.dead - b.dead) || a.n - b.n);
        grid.replaceChildren(...players.map(p => {
          const votes = res ? res.votes.filter(([, t]) => t === p.n) : [];
          const card = el('button', 'mt-card' + (p.dead ? ' dead' : '') + (p.voted && !res ? ' voted' : '') + (pick === p.n ? ' pick' : ''), [
            crewIcon(p.color, 46, { dead: p.dead }), el('b', '', p.name), M.caller === p.n ? el('span', 'mega', '📢') : null,
            p.voted && !res ? el('span', 'stamp', 'J’AI VOTÉ') : null, p.dead ? el('span', 'x', '✕') : null,
            res ? el('div', 'mt-votes', votes.map(([voter]) => voter >= 0 ? crewIcon(c.player(voter)?.color || 'gray', 18) : crewIcon('gray', 18))) : null,
          ], { type: 'button' });
          card.disabled = !canVote || p.dead;
          card.onclick = () => { pick = pick === p.n ? null : p.n; E.update(c.v); };
          if (pick === p.n && canVote) {
            const ok = el('button', 'mt-yes', '✓', { type: 'button', 'aria-label': 'Confirmer le vote' }), no = el('button', 'mt-no', '✕', { type: 'button', 'aria-label': 'Annuler' });
            ok.onclick = e => { e.stopPropagation(); c.send({ k: 'vote', id: p.id }); pick = null; sfx.play('vote'); };
            no.onclick = e => { e.stopPropagation(); pick = null; E.update(c.v); };
            card.append(el('div', 'mt-confirm', [ok, no]));
          }
          if (judge && !p.dead && p.n !== c.n) { const gv = el('button', 'mt-gavel', '⚖', { type: 'button', title: 'Rendre un verdict' }); gv.onclick = e => { e.stopPropagation(); if (confirm(`Condamner ${p.name} ? S’il n’est pas Imposteur, ${V.settings.roles.judge.diesIfWrong ? 'tu meurs' : 'rien ne se passe'}.`)) c.send({ k: 'judge', id: p.id }); }; card.append(gv); }
          return card;
        }));
        skip.disabled = !canVote;
        skip.classList.toggle('pick', pick === 'skip');
        if (pick === 'skip' && canVote) { const ok = el('button', 'mt-yes', '✓', { type: 'button' }); ok.onclick = () => { c.send({ k: 'vote', id: 'skip' }); pick = null; sfx.play('vote'); }; skip.after(ok); setTimeout(() => ok.remove(), 4000); }
        skipVotes.replaceChildren(...(res ? res.votes.filter(([, t]) => t === 'skip').map(([voter]) => crewIcon(voter >= 0 ? c.player(voter)?.color || 'gray' : 'gray', 18)) : []));
        if (res && !E.resSound) { E.resSound = true; sfx.play('votesIn'); }
      },
    };
    this.fsTick = () => {
      const V = c.v, M = V?.meeting; if (!M) return;
      const t = M.results ? `Suite dans : ${fmtTime(c.left(M.resultsEnd))}` : c.left(M.discussEnd) > 0 ? `La discussion se termine dans : ${fmtTime(c.left(M.discussEnd))}` : `Le vote se termine dans : ${fmtTime(c.left(M.voteEnd))}`;
      if (timer.textContent !== t) timer.textContent = t;
      const voting = c.left(M.discussEnd) <= 0;
      if (voting !== E.wasVoting) { E.wasVoting = voting; E.update(V); }
    };
  }
  showEject(V) {
    if (this.ejectShown === V.eject?.until) return;
    this.ejectShown = V.eject?.until;
    const c = this.c, ej = V.eject, p = ej.n != null ? c.player(ej.n) : null, polus = V.map === 'polus';
    this.closePanel(true);
    sfx.play('eject');
    const cv = el('canvas', '', [], { width: 1280, height: 720 });
    const text = el('div', 'ej-text'), sub = el('div', 'ej-sub');
    this.fullscreen('au-eject ' + (polus ? 'polus' : 'skeld'), [cv, text, sub]);
    const g = cv.getContext('2d'), t0 = performance.now();
    const stars = Array.from({ length: 120 }, () => [Math.random() * 1280, Math.random() * 720, Math.random() * 2 + .5]);
    this.fsTick = t => {
      const k = (t - t0) / 1000;
      g.fillStyle = polus ? '#1a0c0a' : '#000'; g.fillRect(0, 0, 1280, 720);
      if (polus) { const gr = g.createLinearGradient(0, 400, 0, 720); gr.addColorStop(0, 'rgba(255,120,30,0)'); gr.addColorStop(1, 'rgba(255,90,20,.9)'); g.fillStyle = gr; g.fillRect(0, 400, 1280, 320); }
      else for (const s of stars) { s[0] -= s[2] * 1.5; if (s[0] < 0) s[0] = 1280; g.fillStyle = '#fff'; g.fillRect(s[0], s[1], s[2], s[2]); }
      if (p) {
        g.save();
        if (polus) { const y = -100 + Math.min(1, k / 3) * 820; g.translate(640, y); g.rotate(k * 2); }
        else { const x = -150 + k / 4.5 * 1580; g.translate(x, 360); g.rotate(k * 1.8); }
        drawCrew(g, p.color, 0, 90, 180);
        g.restore();
      }
      const full = ej.text, n = Math.max(0, Math.min(full.length, Math.floor((k - .6) * 22)));
      if (text.textContent.length !== n) text.textContent = full.slice(0, n);
      sub.textContent = n >= full.length && k > 2.6 ? ej.sub : '';
    };
  }
  showEnd(V) {
    const r = V.result; if (!r || this.endShown === r.at) return;
    this.endShown = r.at;
    const c = this.c, win = r.win;
    this.closePanel(true); sfx.stopAll();
    sfx.play(win ? 'win' : 'lose');
    const winners = r.players.filter(p => p.team === r.team);
    const cv = el('canvas', 'lineup', [], { width: 1200, height: 420 });
    const why = { tasks: 'L’équipage a terminé toutes ses tâches.', vote: 'Les Imposteurs ont été démasqués.', kill: 'Les Imposteurs ont éliminé l’équipage.', sabotage: 'Le sabotage n’a pas été réparé à temps.', disconnect: 'Les joueurs adverses ont quitté la partie.' }[r.why] || '';
    this.fullscreen('au-end ' + (win ? 'win' : 'lose'), [
      el('div', 'title', win ? 'Victoire' : 'Défaite'), el('div', 'why', why), cv,
      el('div', 'au-endlist', r.players.map(p => el('div', 'endp ' + p.team, [crewIcon(p.color, 30, { dead: !p.alive }), el('b', '', p.name), el('span', '', ROLES[p.role]?.name || ''), p.team === 'crew' ? el('i', '', `${p.tasks}/${p.total} tâches`) : null]))),
      el('div', 'au-menu-row', [(() => { const b = el('button', 'au-btn', 'Quitter', { type: 'button' }); b.onclick = () => this.app.leaveWorld(); return b; })(), el('span', 'au-note', 'Retour au salon dans quelques secondes…')]),
    ]);
    const g = cv.getContext('2d');
    const glow = g.createRadialGradient(600, 380, 10, 600, 380, 560); glow.addColorStop(0, r.team === 'imp' ? 'rgba(255,40,40,.4)' : 'rgba(40,160,255,.4)'); glow.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = glow; g.fillRect(0, 0, 1200, 420);
    winners.forEach((p, i) => { const k = i - (winners.length - 1) / 2; const s = 1 - Math.min(.4, Math.abs(k) * .08); drawCrew(g, p.color, 600 + k * 125 * s, 390 - Math.abs(k) * 8, 240 * s, { ghost: !p.alive, alpha: p.alive ? 1 : .6, left: k > 0 }); });
  }

  // ------------------------------------------------------------------ lifecycle
  suspend() { this.paused = true; this.keys.clear(); this.joy = null; this.mouseMove = null; }
  resume() { this.paused = false; this.last = performance.now(); audio.duck(0, .4); }
  destroy() {
    if (this.closed) return;
    this.closed = true;
    cancelAnimationFrame(this.raf);
    removeEventListener('keydown', this.onKeyDown, true); removeEventListener('keyup', this.onKeyUp, true); removeEventListener('blur', this.onBlur);
    this.offs.forEach(f => f());
    sfx.stopAll();
    this.voice.destroy();
    this.c.close();
    partyVoice.hold(false);
  }
}
function chatLine(c, m) {
  if (m.sys) return el('div', 'cl sys', m.text);
  const mine = m.n === c.n;
  return el('div', 'cl' + (mine ? ' mine' : '') + (m.ghost ? ' ghost' : ''), [crewIcon(m.color, 30, { ghost: m.ghost }), el('div', 'bubble', [el('b', '', m.name), el('p', '', m.text)])]);
}
const face = n => `<img src="among/ui/top-${n}.webp" alt="" draggable="false">`;
const ICONS = {
  chat: face('chat'), gear: face('gear'), tablet: face('tablet'),
  map: '<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="none" stroke="#2b2e31" stroke-width="2"/><path d="M9 4v14M15 6v14" stroke="#2b2e31" stroke-width="2"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#2b2e31"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke="#2b2e31" stroke-width="2" fill="none"/></svg>',
  role: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#2b2e31"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7" fill="#2b2e31"/></svg>',
  cog: '<svg viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.3 1.5h3.4l.5 2.9 2 .9 2.4-1.7 2.4 2.4-1.7 2.4.9 2 2.9.5v3.4l-2.9.5-.9 2 1.7 2.4-2.4 2.4-2.4-1.7-2 .9-.5 2.9h-3.4l-.5-2.9-2-.9-2.4 1.7-2.4-2.4 1.7-2.4-.9-2-2.9-.5v-3.4l2.9-.5.9-2-1.7-2.4 2.4-2.4 2.4 1.7 2-.9zM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z"/></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="8" y="3" width="11" height="14" rx="1.5" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M5 7v12.5A1.5 1.5 0 0 0 6.5 21H15" fill="none" stroke="#fff" stroke-width="2.2"/></svg>',
};
export { cleanSettings, GAMES, getMap };
