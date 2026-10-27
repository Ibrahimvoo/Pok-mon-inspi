// The world screen: lobby and game. Input (keyboard, mouse, touch joystick, gamepad), the HUD of the original
// (task list and task bar, action buttons, map, room name), the panels (minigames, sabotage repairs, admin, cameras,
// vitals, chat, voice settings, customisation, lobby settings) and the full-screen sequences (intro, kill, meeting,
// ejection, end of game).
import { Renderer } from './render.js';
import { ProximityVoice } from './voice.js';
import { MINIGAMES } from './minigames.js';
import { sfx } from './sound.js';
import { el, crewIcon, mapLogo, fmtTime } from './ui.js';
import { drawCrew, drawDead } from './art/crew.js';
import { mapImage } from './art/maparts.js';
import { getMap } from './core/room.js';
import { taskDef, GAMES } from './core/tasks.js';
import { ROLES, COLORS, SETTINGS, SETTING_GROUPS, LABELS, ROLE_OPTIONS, ROLE_LABELS, CREW_ROLES, IMP_ROLES, PRESETS, KILL_RANGE, USE_RANGE, REPORT_RANGE, ABILITY_RANGE, MIN_PLAYERS, CREW_HEIGHT, fmtSetting, fmtRoleOpt, cleanSettings } from './core/rules.js';
import { saveProfile } from './app.js';
import { input, stick, IOS } from '../input.js';
import { voice as partyVoice } from '../rtc.js';
import { audio } from '../audio.js';

const colorOf = id => COLORS.find(c => c.id === id) || COLORS[0];
const d2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const SAB = { reactor: 'Réacteur', o2: 'O2', lights: 'Électricité', comms: 'Communications', seismic: 'Stabilisateurs sismiques' };
const SAB_LINE = { reactor: 'Fusion du réacteur', o2: 'Épuisement de l’oxygène', seismic: 'Défaillance des stabilisateurs sismiques', lights: 'Réparer l’électricité', comms: 'Communications sabotées' };
const ABILITY = { shapeshifter: ['Métamorphose', 'shift'], phantom: ['Disparaître', 'vanish'], tracker: ['Traquer', 'track'], guardianAngel: ['Protéger', 'protect'], scientist: ['Signes vitaux', 'vitals'], detective: ['Interroger', 'interrogate'], engineer: null };
const isTouch = () => matchMedia('(pointer: coarse)').matches || input.device === 'touch';

export class Play {
  constructor(app, client, { freeplay = false } = {}) {
    this.app = app; this.c = client; this.freeplay = freeplay;
    this.root = el('div', 'au-play');
    this.canvas = el('canvas', 'au-canvas');
    this.hud = el('div', 'au-hud'); this.ov = el('div', 'au-ov'); this.fs = el('div', 'au-fs');
    this.root.append(this.canvas, this.hud, this.ov, this.fs);
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
      if (e.pointerType === 'touch') { if (e.clientX < innerWidth * .5 && !this.joy) { this.joy = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, dy: 0 }; this.showJoy(); } }
      else if (e.button === 0) this.mouseMove = { x: e.clientX, y: e.clientY };
      this.canvas.setPointerCapture?.(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', e => {
      if (this.joy && e.pointerId === this.joy.id) { const R = 60; let dx = e.clientX - this.joy.x0, dy = e.clientY - this.joy.y0; const l = Math.hypot(dx, dy); if (l > R) { dx *= R / l; dy *= R / l; } this.joy.dx = dx / R; this.joy.dy = dy / R; this.showJoy(); }
      else if (this.mouseMove) { this.mouseMove.x = e.clientX; this.mouseMove.y = e.clientY; }
    });
    const end = e => { if (this.joy && e.pointerId === this.joy.id) { this.joy = null; this.showJoy(); } if (e.pointerType !== 'touch') this.mouseMove = null; };
    this.canvas.addEventListener('pointerup', end); this.canvas.addEventListener('pointercancel', end);
  }
  showJoy() {
    if (!this.joyEl) { this.joyEl = el('div', 'au-joy', el('i')); this.hud.append(this.joyEl); }
    const j = this.joy;
    this.joyEl.classList.toggle('on', !!j);
    if (j) { this.joyEl.style.left = j.x0 + 'px'; this.joyEl.style.top = j.y0 + 'px'; this.joyEl.firstChild.style.transform = `translate(${j.dx * 40}px, ${j.dy * 40}px)`; }
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
      customize: B('use', 'Personnaliser', () => this.openCustomize()),
    };
    this.taskbar = el('div', 'au-taskbar', [el('i'), el('span', '', 'TOTAL DES TÂCHES ACCOMPLIES')]);
    this.taskList = el('div', 'au-tasklist');
    this.taskTab = el('button', 'au-tasktab', 'Tâches', { type: 'button' }); this.taskTab.onclick = () => this.taskList.classList.toggle('hide');
    this.roomName = el('div', 'au-roomname'); this.ping = el('div', 'au-ping');
    const top = (cls, icon, fn, title) => { const b = el('button', `au-top ${cls}`, [], { type: 'button', title, 'aria-label': title }); b.innerHTML = icon; b.onclick = () => { sfx.play('click'); fn(); }; return b; };
    this.topBtns = {
      chat: top('chat', ICONS.chat, () => this.openChat(), 'Discussion'), settings: top('settings', ICONS.gear, () => this.openSettings(), 'Réglages'),
      map: top('map', ICONS.map, () => this.openMap(false), 'Carte'), mic: top('mic', ICONS.mic, () => this.toggleMic(), 'Micro'),
      cosmetics: top('cos', ICONS.cos, () => this.openCustomize(), 'Personnaliser'), role: top('role', ICONS.role, () => this.openFreeplayRoles(), 'Rôle'),
    };
    this.notesBtn = el('button', 'au-act notes', [el('b', '', 'Notes')], { type: 'button' }); this.notesBtn.onclick = () => this.openNotes();
    this.lobby = el('div', 'au-lobby');
    this.lobbyNotes = el('div', 'au-notices');
    this.hostLine = el('div', 'au-hostline');
    this.startBtn = el('button', 'au-start', 'Commencer', { type: 'button' }); this.startBtn.onclick = () => this.startGame();
    this.countdown = el('div', 'au-countdown');
    this.ventArrows = el('div', 'au-ventarrows');
    this.hud.append(
      el('div', 'au-tl', [this.taskbar, el('div', 'au-taskwrap', [this.taskTab, this.taskList])]),
      el('div', 'au-tr', Object.values(this.topBtns)),
      el('div', 'au-br', [this.btns.ability, this.btns.sabotage, this.btns.use, this.btns.customize, this.btns.kill, this.btns.vent, this.btns.report, this.notesBtn]),
      el('div', 'au-bc', [this.roomName, this.ping]),
      this.lobby, this.lobbyNotes, el('div', 'au-lobbybottom', [this.hostLine, this.startBtn, this.countdown]), this.ventArrows);
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
    const dt = Math.min(.05, (t - this.last) / 1000); this.last = t;
    if (this.paused) return;
    const [dx, dy] = this.seqUntil > t || (this.panel && !this.panel.walk) ? [0, 0] : this.moveVector();
    this.c.step(dx, dy, dt);
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
      const lap = M.consoles.laptop; if (lap && d2(me, lap) < 1.3) out.use = { kind: 'customize', x: lap.x, y: lap.y };
      return out;
    }
    if (c.phase !== 'play') return out;
    const alive = V.me.alive, cands = [];
    if (V.me.vent) return out;
    for (const t of V.tasks || []) {
      if (t.done || t.fake) continue;
      const st = t.steps[t.step]; const cs = st && M.consoles[st.console];
      if (cs && d2(me, cs) <= USE_RANGE && now >= t.readyAt) cands.push({ kind: 'task', id: t.id, x: cs.x, y: cs.y, d: d2(me, cs) });
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
    show(B.customize, lobby); set(B.customize, !!T.use);
    show(B.use, play && !!me); set(B.use, !!T.use || !!me?.vent);
    B.use.classList.toggle('exitvent', !!me?.vent);
    B.use.querySelector('b').textContent = me?.vent ? 'Sortir' : T.use?.kind === 'sys' ? { admin: 'Admin', cams: 'Sécurité', vitals: 'Signes vitaux' }[T.use.s] : T.use?.kind === 'button' ? 'Urgence' : 'Utiliser';
    show(B.report, play && !!me?.alive && !this.freeplay); set(B.report, !!T.report);
    const imp = me?.team === 'imp';
    show(B.kill, play && imp && !!me?.alive); set(B.kill, !!T.kill, me ? me.killAt - now : 0);
    show(B.sabotage, play && imp); set(B.sabotage, true);
    show(B.vent, play && !!me?.alive && (imp || me?.role === 'engineer')); set(B.vent, !!T.vent && !me.vent, me?.role === 'engineer' && !imp ? me.abAt - now : 0);
    const ab = role && ABILITY[role];
    show(B.ability, play && !!ab && (me.alive || role === 'guardianAngel'));
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
    this.topBtns.cosmetics.hidden = !lobby;
    this.topBtns.role.hidden = !(this.freeplay && play);
    // the vent: arrows toward the linked vents
    this.updateVentArrows(me);
    // room name and ping
    if (play || lobby) { const r = c.map.roomAt(c.pos.x, c.pos.y); this.roomName.textContent = lobby ? '' : r ? r.name : c.map.def.outside || ''; }
    this.ping.textContent = `Ping : ${c.ping} ms`;
    // lobby countdown
    if (lobby && V?.phase === 'countdown') { const s = Math.ceil(c.left(V.countdown) / 1000); this.countdown.textContent = s > 0 ? `Lancement dans ${s}` : ''; if (s !== this.lastCount) { this.lastCount = s; if (s > 0) sfx.play('countdown'); } } else this.countdown.textContent = '';
    // sabotage countdown in the task list
    if (V?.sab?.endsAt && play) { const line = this.taskList.querySelector('.sabline'); if (line) line.textContent = `${SAB_LINE[V.sab.kind]} dans ${Math.ceil(c.left(V.sab.endsAt) / 1000)} s.`; }
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
    if (T.kind === 'task') { c.send({ k: 'task', a: 'open', id: T.id }); return; }
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
    if (T?.id) { c.send({ k: 'ab', a: ABILITY[role][1], id: T.id }); sfx.play(role === 'guardianAngel' ? 'protect' : 'click'); }
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
  renderTasks(V) {
    const c = this.c, M = c.map;
    const show = c.inGame && ['play', 'meeting', 'intro'].includes(V.phase);
    this.taskList.parentElement.hidden = !show;
    this.taskbar.hidden = !show || V.taskBar == null || this.freeplay;
    if (V.taskBar != null) this.taskbar.firstChild.style.width = (V.taskBar * 100).toFixed(1) + '%';
    if (!show) return;
    const imp = V.me?.team === 'imp';
    const lines = [];
    if (V.sab) lines.push(el('div', 'sabline', V.sab.endsAt ? `${SAB_LINE[V.sab.kind]} dans ${Math.ceil(c.left(V.sab.endsAt) / 1000)} s.` : SAB_LINE[V.sab.kind]));
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
    if (V.sab?.kind === 'comms' && !imp) lines.splice(1, lines.length, el('div', 'sabline', 'Communications sabotées : tâches inconnues.'));
    this.taskList.replaceChildren(...lines);
  }
  renderLobby(V) {
    const c = this.c, host = V.host === c.n, s = V.settings, n = V.players.filter(p => !p.bot).length;
    const hostP = V.players.find(p => p.n === V.host);
    this.lobby.replaceChildren(
      el('div', 'lb-label', 'CODE DU SALON'),
      el('div', 'lb-code', [el('b', '', this.freeplay ? '—' : V.code), this.freeplay ? null : (() => { const b = el('button', 'lb-copy', '⧉', { type: 'button', title: 'Copier le code' }); b.onclick = () => { navigator.clipboard?.writeText(V.code).then(() => this.toast('Code copié'), () => this.toast(`Code : ${V.code}`)); }; return b; })()]),
      el('div', 'lb-label', 'PARAMÈTRES DU SALON'), el('div', 'lb-map', mapLogo(s.map)),
      el('div', 'lb-row', [el('span', '', 'CAPACITÉ'), el('b', '', [crewIcon(colorOf(c.self?.color).id, 18), ` ${n}/${s.maxPlayers}`])]),
      el('div', 'lb-row', [el('span', '', 'PRÉRÉGLAGE'), el('b', '', PRESETS[V.preset]?.name.toUpperCase() || 'PERSONNALISÉ')]),
      el('div', 'lb-row', [el('span', '', 'CONFIDENTIALITÉ'), (() => { const b = el('button', 'lb-priv' + (V.public ? ' pub' : ''), V.public ? 'PUBLIQUE' : 'PRIVÉE', { type: 'button' }); b.disabled = !host || V.mode !== 'online'; b.onclick = () => c.send({ k: 'privacy', public: !V.public }); return b; })()]),
      el('div', 'lb-label', 'PARAMÈTRES DE JEU'),
      el('div', 'lb-btns', [(() => { const b = el('button', 'lb-btn', 'MODIFIER', { type: 'button' }); b.disabled = !host; b.onclick = () => this.openGameSettings(true); return b; })(), (() => { const b = el('button', 'lb-btn', 'VOIR', { type: 'button' }); b.onclick = () => this.openGameSettings(false); return b; })()]),
    );
    this.hostLine.replaceChildren('HÔTE : ', crewIcon(hostP?.color || 'red', 22), el('b', '', hostP?.name || ''), host ? el('i', '', ' (Toi !)') : null);
    const ready = n >= MIN_PLAYERS;
    this.startBtn.hidden = !host || this.freeplay;
    this.startBtn.textContent = V.phase === 'countdown' ? 'Annuler' : ready ? 'Commencer' : 'En attente de joueurs';
    this.startBtn.disabled = !ready && V.phase !== 'countdown';
    this.startBtn.classList.toggle('ready', ready);
    if (!host && !this.freeplay) this.startBtn.hidden = true;
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
      case 'taskOpen': return this.openTask(m.id, m.step);
      case 'taskDone': sfx.play('taskDone'); return;
      case 'stepDone': sfx.play('taskStep'); return;
      case 'sabotage': this.toast(`Sabotage : ${SAB[m.s] || m.s}`); if (!['reactor', 'o2', 'seismic'].includes(m.s)) sfx.play('alarm'); return;
      case 'doors': sfx.play('door'); return;
      case 'doorOpen': sfx.play('door'); return;
      case 'fixPart': sfx.play('fixed'); return;
      case 'fixed': sfx.play('fixed'); if (this.panel?.sab) this.closePanel(); return;
      case 'vent': this.r.ventFx(m.x, m.y); if (!m.me) sfx.play('vent', .6); return;
      case 'interrogated': this.toast(`${c.player(m.n)?.name} était : ${m.room} au moment du meurtre.`); return;
      case 'settings': { const keys = m.keys.map(k => LABELS[k] ? `${LABELS[k]} = ${fmtSetting(k, c.v?.settings?.[k])}` : null).filter(Boolean); for (const k of keys) this.notice(`Changement effectué : ${k}`); return; }
    }
  }
  notice(text) {
    const n = el('div', 'au-notice', [el('span', 'ic', '⚙'), text]);
    this.lobbyNotes.prepend(n);
    while (this.lobbyNotes.childElementCount > 5) this.lobbyNotes.lastChild.remove();
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
      me: { name: this.c.self?.name, colorName: colorOf(this.c.self?.color).name },
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
  openTask(id, step) {
    const c = this.c, t = c.v?.tasks?.find(x => x.id === id);
    if (!t) return;
    const st = t.steps[step], game = MINIGAMES[st.game];
    if (!game) { this.toast('Mini-jeu introuvable : ' + st.game); return; }
    const cs = c.map.consoles[st.console];
    this.openPanel((box, api) => { box.classList.add('au-mgbox'); game(box, api); }, {
      step: st, console: cs,
      onDone: () => { c.send({ k: 'task', a: 'done', id }); this.closePanel(true); },
      onClosed: () => c.send({ k: 'task', a: 'close', id }),
    });
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
      const img = el('img', '', [], { src: `among/maps/${M.id}.webp`, alt: 'Carte' });
      const layer = el('div', 'au-maplayer');
      const wrap = el('div', 'au-mapwrap', [img, layer]);
      box.append(wrap);
      const pos = (x, y) => { const W = img.naturalWidth || 1170, H = img.naturalHeight || 907; return [x * M.k / W * 100 + '%', y * M.k / H * 100 + '%']; };
      const marker = (cls, x, y, content) => { const d = el('div', 'mk ' + cls, content); const [l, t] = pos(x, y); d.style.left = l; d.style.top = t; layer.append(d); return d; };
      P.render = () => {
        layer.replaceChildren();
        const VV = c.v; if (!VV) return;
        marker('me', c.pos.x, c.pos.y, crewIcon(c.self?.color || 'red', 26));
        if (!sabotage) for (const t of VV.tasks || []) { if (t.done) continue; const cs = M.consoles[t.steps[t.step]?.console]; if (cs) marker('task' + (t.fake ? ' fake' : ''), cs.x, cs.y, '!'); }
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
      img.onload = () => P.render();
      P.render();
      let acc = 0; P.tick = dt => { acc += dt; if (acc > .25) { acc = 0; P.render(); } };
    }, { walk: true });
    P.mapPanel = true;
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

  openGameSettings(edit) {
    const c = this.c;
    this.openPanel((box, api, P) => {
      box.className = 'au-panel au-gs';
      let tab = 'presets';
      const left = el('div', 'gs-left'), right = el('div', 'gs-right');
      box.append(el('div', 'gs-wrap', [left, right]));
      const S = () => c.v.settings;
      const send = patch => { if (edit) c.send({ k: 'set', settings: patch }); };
      const stepper = (val, onDec, onInc) => el('div', 'gs-step', [(() => { const b = el('button', '', '−', { type: 'button' }); b.disabled = !edit; b.onclick = onDec; return b; })(), el('b', '', val), (() => { const b = el('button', '', '+', { type: 'button' }); b.disabled = !edit; b.onclick = onInc; return b; })()]);
      const setting = k => {
        const d = SETTINGS[k], v = S()[k];
        if (d.type === 'bool') return el('div', 'gs-line', [el('span', '', LABELS[k]), (() => { const b = el('button', 'gs-check' + (v ? ' on' : ''), v ? '✓' : '', { type: 'button' }); b.disabled = !edit; b.onclick = () => send({ [k]: !v }); return b; })()]);
        if (d.type === 'enum') { const i = d.opts.findIndex(o => o[0] === v); return el('div', 'gs-line', [el('span', '', LABELS[k]), stepper(fmtSetting(k, v), () => send({ [k]: d.opts[(i - 1 + d.opts.length) % d.opts.length][0] }), () => send({ [k]: d.opts[(i + 1) % d.opts.length][0] }))]); }
        return el('div', 'gs-line', [el('span', '', LABELS[k]), stepper(fmtSetting(k, v), () => send({ [k]: v - d.step }), () => send({ [k]: v + d.step }))]);
      };
      const render = () => {
        if (!c.v) return;
        left.replaceChildren(el('h2', '', 'PARAMÈTRES DE JEU'), el('div', 'gs-help', edit ? 'Modifiez les paramètres de votre salon de jeu.' : 'Paramètres du salon (lecture seule).'),
          ...[['presets', 'PRÉRÉGLAGES DE JEU'], ['game', 'PARAMÈTRES DE JEU'], ['roles', 'RÉGLAGES DES RÔLES']].map(([k, n]) => { const b = el('button', 'gs-tab' + (tab === k ? ' on' : ''), n, { type: 'button' }); b.onclick = () => { tab = k; render(); }; return b; }));
        if (tab === 'presets') right.replaceChildren(el('div', 'gs-presets', Object.entries(PRESETS).map(([id, p]) => { const b = el('button', 'gs-preset' + (c.v.preset === id ? ' on' : ''), [el('div', 'art ' + id, presetArt(id)), el('b', '', p.name.toUpperCase())], { type: 'button', title: p.desc }); b.disabled = !edit; b.onclick = () => c.send({ k: 'set', preset: id }); return b; })), el('p', 'gs-desc', PRESETS[c.v.preset]?.desc || ''));
        if (tab === 'game') right.replaceChildren(
          el('div', 'gs-maprow', [el('span', '', 'CARTE'), ...['skeld', 'polus'].map(m => { const b = el('button', 'gs-map' + (S().map === m ? ' on' : ''), mapLogo(m), { type: 'button' }); b.disabled = !edit; b.onclick = () => send({ map: m }); return b; })]),
          setting('maxPlayers'),
          ...SETTING_GROUPS.map(([g, keys]) => el('div', 'gs-group', [el('div', 'gs-gtitle', g.toUpperCase()), ...keys.map(setting)])));
        if (tab === 'roles') {
          const R = S().roles;
          const row = r => el('div', 'gs-rrow', [el('button', 'gs-rname ' + ROLES[r].team, ROLES[r].name, { type: 'button', title: ROLES[r].desc, onclick: '' }), stepper(String(R[r].count), () => send({ roles: { [r]: { count: R[r].count - 1 } } }), () => send({ roles: { [r]: { count: R[r].count + 1 } } })), stepper(String(R[r].chance), () => send({ roles: { [r]: { chance: R[r].chance - 10 } } }), () => send({ roles: { [r]: { chance: R[r].chance + 10 } } }))]);
          const opts = r => el('div', 'gs-ropts', [el('div', 'gs-gtitle', ROLES[r].name.toUpperCase()), el('p', 'gs-desc', ROLES[r].desc), ...Object.entries(ROLE_OPTIONS[r]).map(([k, d]) => d.type === 'bool'
            ? el('div', 'gs-line', [el('span', '', ROLE_LABELS[k]), (() => { const b = el('button', 'gs-check' + (R[r][k] ? ' on' : ''), R[r][k] ? '✓' : '', { type: 'button' }); b.disabled = !edit; b.onclick = () => send({ roles: { [r]: { [k]: !R[r][k] } } }); return b; })()])
            : el('div', 'gs-line', [el('span', '', ROLE_LABELS[k]), stepper(fmtRoleOpt(r, k, R[r][k]), () => send({ roles: { [r]: { [k]: R[r][k] - d.step } } }), () => send({ roles: { [r]: { [k]: R[r][k] + d.step } } }))]))]);
          right.replaceChildren(el('div', 'gs-rhead', [el('span', '', 'Rôles des coéquipiers'), el('span', '', 'NBRE'), el('span', '', '% DE CHANCE')]), ...CREW_ROLES.map(row), el('div', 'gs-rhead imp', [el('span', '', 'Rôles des imposteurs'), el('span', '', 'NBRE'), el('span', '', '% DE CHANCE')]), ...IMP_ROLES.map(row), ...[...CREW_ROLES, ...IMP_ROLES].filter(r => R[r].count > 0 && R[r].chance > 0).map(opts));
        }
      };
      render();
      P.onView = () => render();
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
        const judge = me.role === 'judge' && me.alive && me.uses > 0 && !M.results && c.left(M.startedAt + 3000) <= 0 && (V.settings.roles.judge.firstMeeting || true);
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
function presetArt(id) {
  const cv = el('canvas', '', [], { width: 240, height: 240 }); const g = cv.getContext('2d');
  g.fillStyle = id === 'classic' ? '#0d1b3a' : '#2b2b2b'; g.fillRect(0, 0, 240, 240);
  const list = id === 'classic' ? [['red', 70, 120, false], ['yellow', 160, 150, true], ['blue', 90, 220, false]] : [['white', 80, 130, false], ['gray', 170, 120, true], ['white', 130, 225, false]];
  list.forEach(([c, x, y, l]) => drawCrew(g, c, x, y, 95, { left: l, ghost: id !== 'classic' && c === 'gray' }));
  return cv;
}
const ICONS = {
  chat: '<svg viewBox="0 0 24 24"><path d="M3 5h14v9H8l-4 4v-4H3z" fill="#fff" stroke="#222" stroke-width="1.6"/><path d="M19 8h2v9h-1v3l-3-3h-6" fill="none" stroke="#fff" stroke-width="1.6"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="none" stroke="#fff" stroke-width="2"/><path d="M9 4v14M15 6v14" stroke="#fff" stroke-width="2"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke="#fff" stroke-width="2" fill="none"/></svg>',
  cos: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="#fff"/><path d="M8 17c1-2 2.5-3 4-3s3 1 4 3" stroke="#fff" stroke-width="2" fill="none"/></svg>',
  role: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#fff"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7" fill="#fff"/></svg>',
};
export { cleanSettings, GAMES, getMap };
