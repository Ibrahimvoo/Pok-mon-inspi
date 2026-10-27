// The authoritative game room. The same code runs on the Node server (online rooms), in the hosting browser
// (peer-to-peer rooms without a server) and in the page itself (free play). Clients only send intentions
// ("I moved here", "kill this player", "vote"); the room validates every one of them against its own state
// and sends each player only what that player is allowed to know.
import { compileMap } from './grid.js';
import skeldDef from './maps/skeld.js';
import polusDef from './maps/polus.js';
import lobbyDef from './maps/lobby.js';
import {
  COLORS, COLOR_IDS, COSMETICS, ROLES, CREW_ROLES, IMP_ROLES, MIN_PLAYERS, NAME_MAX, defaultSettings, cleanSettings, maxImpostors,
  KILL_RANGE, USE_RANGE, REPORT_RANGE, VISION_BASE, SPEED_BASE, LIGHTS_VISION, ABILITY_RANGE, presetSettings, PROTOCOL,
} from './rules.js';
import { dealTasks, allTasks, taskDef, GAMES } from './tasks.js';

export const MAPS = {};
export function getMap(id) {
  if (!MAPS[id]) MAPS[id] = compileMap({ skeld: skeldDef, polus: polusDef, lobby: lobbyDef }[id]);
  return MAPS[id];
}
export const TICK = 50;
const COUNTDOWN = 5000, INTRO = 6500, SPLASH = 3000, RESULTS = 5000, EJECT = 7500, ENDED = 9000;
const GRACE_LOBBY = 20000, GRACE_GAME = 60000;
const CRIT = { reactor: 30000, o2: 30000, seismic: 60000 };
const SAB_CD = 30000, DOOR_CLOSE = { skeld: 10000, polus: 15000 }, DOOR_CD = 30000, FIRST_CD = 10000;
const TOL = .55;           // position tolerance for range checks (network delay)
const HIST = 24;           // position history: 24 × 250 ms

const str = (v, n) => String(v ?? '').replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const d2 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const isNum = v => typeof v === 'number' && Number.isFinite(v);

export class Room {
  constructor({ code, hostId = null, isPublic = false, region = 'Europe', mode = 'online', send, now = () => Date.now(), rng = Math.random, log = () => {}, onEmpty, onInfo }) {
    this.code = code; this.hostId = hostId; this.public = !!isPublic; this.region = region; this.mode = mode;
    this.sendRaw = send; this.now = now; this.rng = rng; this.log = log; this.onEmpty = onEmpty; this.onInfo = onInfo;
    this.players = new Map(); this.order = 0;
    this.settings = defaultSettings();
    if (mode === 'freeplay') this.settings = cleanSettings({ ...this.settings, emergencyMeetings: 0 });
    this.preset = 'classic';
    this.phase = 'lobby';
    this.chat = [];
    this.lastSent = new Map(); this.lastHear = new Map();
    this.tickN = 0; this.closed = false;
    this.game = null;
    this.lobbyMap = getMap('lobby');
    this.history = new Map();
  }

  // ------------------------------------------------------------------ helpers
  send(id, msg) { const p = this.players.get(id); if (p && !p.bot && p.conn) { try { this.sendRaw(id, msg); } catch (e) { this.log('send failed', e); } } }
  all(msg, filter) { this.players.forEach(p => { if (!filter || filter(p)) this.send(p.id, msg); }); }
  err(id, msg) { this.send(id, { k: 'err', msg }); return false; }
  get map() { return this.game ? getMap(this.game.map) : this.lobbyMap; }
  mapId() { return this.game && this.phase !== 'lobby' && this.phase !== 'countdown' ? this.game.map : 'lobby'; }
  get inGame() { return !!this.game && ['intro', 'play', 'meeting', 'eject', 'ended'].includes(this.phase); }
  byN(n) { for (const p of this.players.values()) if (p.n === n) return p; return null; }
  humans() { return [...this.players.values()].filter(p => !p.bot); }
  connected() { return this.humans().filter(p => p.conn); }
  freeSlot() { const used = new Set([...this.players.values()].map(p => p.n)); for (let i = 0; i < 15; i++) if (!used.has(i)) return i; return -1; }
  freeColor(pref) {
    const used = new Set([...this.players.values()].map(p => p.color));
    if (pref && COLOR_IDS.includes(pref) && !used.has(pref)) return pref;
    return COLOR_IDS.find(c => !used.has(c)) || COLOR_IDS[0];
  }
  closedDoors() { return this.game ? this.game.closed : null; }
  info() {
    const host = this.players.get(this.hostId);
    const s = this.settings;
    return { code: this.code, map: s.map, players: this.humans().length, max: s.maxPlayers, phase: this.phase === 'lobby' || this.phase === 'countdown' ? 'lobby' : 'game',
      host: host?.name || '', region: this.region, public: this.public, impostors: s.impostors, speed: s.playerSpeed,
      roles: Object.values(s.roles).some(r => r.count > 0 && r.chance > 0), mode: this.mode };
  }
  changed() { this.onInfo?.(this.info()); }
  lookOf(p) { return { n: p.n, id: p.id, name: p.name, color: p.color, hat: p.hat, skin: p.skin, visor: p.visor, pet: p.pet, plate: p.plate }; }
  isImp(p) { return p.team === 'imp'; }
  voiceGroup(p) {
    if (!this.inGame || this.phase === 'ended' && this.game?.over) return 'all';
    return p.alive ? 'alive' : 'dead';
  }

  // ------------------------------------------------------------------ joining
  // returns an error string when the player cannot join
  join(id, hello = {}) {
    if (this.closed) return 'Cette partie n’existe plus.';
    const name = str(hello.name, NAME_MAX) || 'Joueur';
    let p = this.players.get(id);
    if (p) {
      p.conn = true; p.droppedAt = 0; p.seq = 0; if (name) p.name = name;
      this.lastSent.delete(id); this.lastHear.delete(id);
      this.welcome(p);
      this.changed();
      return null;
    }
    if (this.humans().length >= this.settings.maxPlayers) return 'La partie est complète.';
    if (this.inGame && this.phase !== 'ended') return 'Une partie est déjà en cours dans ce salon. Réessayez dans quelques minutes.';
    const n = this.freeSlot();
    if (n < 0) return 'La partie est complète.';
    p = { id, n, name, color: this.freeColor(hello.color), hat: 'none', skin: 'none', visor: 'none', pet: 'none', plate: 'none',
      conn: true, droppedAt: 0, joinedAt: this.now(), order: this.order++, bot: !!hello.bot, chatAt: 0, voice: { on: false, muted: true } };
    this.applyLook(p, hello, true);
    this.resetLobbyPos(p);
    this.players.set(id, p);
    if (!this.hostId || !this.players.has(this.hostId)) this.hostId = id;
    if (!p.bot) this.sysChat(`${p.name} a rejoint la partie`);
    if (this.inGame) this.makeSpectator(p);
    this.welcome(p);
    this.changed();
    return null;
  }
  makeSpectator(p) {
    // joined while the end screen is shown: waits in the lobby state
    p.alive = false; p.role = null; p.team = null; p.tasks = []; p.spectator = true;
  }
  welcome(p) {
    this.send(p.id, { k: 'welcome', v: PROTOCOL, you: p.id, n: p.n, code: this.code, mode: this.mode, chat: this.chatFor(p) });
    this.send(p.id, { k: 'pos', x: p.x, y: p.y, map: this.mapId() });
    this.pushView(p, true);
  }
  resetLobbyPos(p) {
    const M = this.lobbyMap;
    const a = (p.n / 15) * Math.PI * 2;
    [p.x, p.y] = M.nearestStand(M.spawn[0] + Math.cos(a) * 1.4, M.spawn[1] + Math.sin(a) * 1.1);
    p.dir = 1; p.moving = false; p.seq = 0; p.budget = 0; p.lastMove = this.now();
  }
  applyLook(p, o, joining = false) {
    if (!o || typeof o !== 'object') return;
    if (o.color && o.color !== p.color && COLOR_IDS.includes(o.color)) {
      const taken = [...this.players.values()].some(q => q !== p && q.color === o.color);
      if (!taken) p.color = o.color;
      else if (!joining) this.err(p.id, 'Cette couleur est déjà prise.');
    }
    for (const k of ['hat', 'skin', 'visor', 'pet', 'plate']) if (typeof o[k] === 'string' && COSMETICS[k].includes(o[k])) p[k] = o[k];
  }
  drop(id) {
    const p = this.players.get(id);
    if (!p || !p.conn) return;
    p.conn = false; p.droppedAt = this.now();
    if (p.voice) p.voice.on = false;
    this.releaseHolds(p);
    if (this.game && p.openTask) p.openTask = null;
    this.changed();
  }
  leave(id, reason = 'left') {
    const p = this.players.get(id);
    if (!p) return;
    this.players.delete(id);
    this.lastSent.delete(id); this.lastHear.delete(id);
    if (!p.bot) this.sysChat(reason === 'kicked' ? `${p.name} a été exclu de la partie` : `${p.name} a quitté la partie`);
    if (this.game) {
      this.releaseHolds(p);
      if (this.game.meeting) this.game.meeting.votes.delete(id);
      if (p.alive && this.inGame && !p.spectator) { p.alive = false; this.game.left.push(p.n); this.game.looks[p.n] = this.lookOf(p); }
      this.checkWin();
      if (this.game?.meeting) this.maybeEndVoting();
    }
    if (this.hostId === id) {
      const next = this.connected().sort((a, b) => a.order - b.order)[0] || this.humans()[0];
      this.hostId = next ? next.id : null;
      if (next) this.sysChat(`${next.name} est maintenant l’hôte`);
    }
    if (this.phase === 'countdown' && this.connected().length < MIN_PLAYERS && this.mode !== 'freeplay') this.phase = 'lobby';
    if (!this.humans().length) { this.close(); return; }
    this.changed();
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    this.all({ k: 'bye', reason: 'closed' });
    this.onEmpty?.();
  }

  // ------------------------------------------------------------------ chat
  chatFor(p) { return this.chat.filter(m => this.canReadChat(p, m)).slice(-40); }
  canReadChat(p, m) { return m.sys || !m.ghost || !p.alive || !this.inGame || p.spectator; }
  sysChat(text) { const m = { sys: true, text, at: this.now() }; this.chat.push(m); if (this.chat.length > 80) this.chat.shift(); this.all({ k: 'chat', m }); }
  onChat(p, text) {
    text = str(text, 100);
    if (!text) return;
    const now = this.now();
    if (now - p.chatAt < 600) return this.err(p.id, 'Doucement ! Attendez un peu avant d’envoyer un autre message.');
    const ghost = this.inGame && this.phase !== 'ended' && !p.alive && !p.spectator;
    if (this.inGame && p.alive && !['meeting', 'ended'].includes(this.phase)) return this.err(p.id, 'La discussion n’est possible que pendant les réunions.');
    p.chatAt = now;
    const m = { n: p.n, name: p.name, color: p.color, text, ghost, at: now };
    this.chat.push(m); if (this.chat.length > 80) this.chat.shift();
    this.all({ k: 'chat', m }, q => this.canReadChat(q, m));
  }

  // ------------------------------------------------------------------ messages
  handle(id, m) {
    const p = this.players.get(id);
    if (!p || !m || typeof m.k !== 'string' || this.closed) return;
    p.lastMsg = this.now();
    try {
      switch (m.k) {
        case 'ping': return this.send(id, { k: 'pong', t: m.t, s: this.now() });
        case 'mv': return this.onMove(p, m);
        case 'look': if (this.phase === 'lobby' || this.phase === 'countdown') { this.applyLook(p, m); this.changed(); } return;
        case 'chat': return this.onChat(p, m.text);
        case 'set': return this.onSettings(p, m);
        case 'kick': return this.onKick(p, m.id);
        case 'privacy': if (p.id === this.hostId && this.mode !== 'freeplay') { this.public = !!m.public; this.changed(); } return;
        case 'start': return this.onStart(p, m);
        case 'cancel': if (p.id === this.hostId && this.phase === 'countdown') { this.phase = 'lobby'; this.changed(); } return;
        case 'leave': return this.leave(id);
        case 'voice': p.voice = { on: !!m.on, muted: !!m.muted }; return;
        case 'talk': p.talking = !!m.on; return;
        case 'rtc': return this.onRtc(p, m);
        case 'kill': return this.onKill(p, m.id);
        case 'report': return this.onReport(p, m.n);
        case 'button': return this.onButton(p);
        case 'task': return this.onTask(p, m);
        case 'sab': return this.onSabotage(p, m.s);
        case 'door': return this.onDoor(p, m.room);
        case 'fix': return this.onFix(p, m);
        case 'vent': return this.onVent(p, m);
        case 'ab': return this.onAbility(p, m);
        case 'sys': return this.onSystem(p, m.s);
        case 'vote': return this.onVote(p, m.id);
        case 'judge': return this.onJudge(p, m.id);
        case 'fp': return this.onFreeplay(p, m);
        case 'again': return;
      }
    } catch (e) { this.log('room handler error', m.k, e); }
  }

  onSettings(p, m) {
    if (p.id !== this.hostId || this.phase !== 'lobby') return;
    let s = this.settings;
    if (m.preset && (m.preset === 'classic' || m.preset === 'roles')) { s = presetSettings(m.preset, { map: s.map, maxPlayers: s.maxPlayers }); this.preset = m.preset; }
    if (m.settings) s = cleanSettings(m.settings, s);
    if (s.maxPlayers < this.humans().length) s.maxPlayers = this.humans().length;
    const changes = [];
    for (const k of Object.keys(s)) if (k !== 'roles' && s[k] !== this.settings[k]) changes.push(k);
    this.settings = s;
    if (changes.length) this.all({ k: 'ev', e: 'settings', keys: changes.slice(0, 6) });
    this.changed();
  }
  onKick(p, id) {
    if (p.id !== this.hostId || id === p.id || !this.players.has(id) || this.inGame) return;
    this.send(id, { k: 'bye', reason: 'kicked' });
    this.leave(id, 'kicked');
  }

  // ------------------------------------------------------------------ movement
  speedOf(p) { return SPEED_BASE * this.settings.playerSpeed * (p.alive === false && this.inGame && !p.spectator ? 1.15 : 1); }
  canMove(p) {
    if (this.phase === 'lobby' || this.phase === 'countdown') return true;
    if (this.phase === 'ended') return false;
    return this.phase === 'play' && !p.vent && !p.spectator;
  }
  onMove(p, m) {
    if (!isNum(m.x) || !isNum(m.y)) return;
    const seq = m.q | 0;
    if (seq <= (p.seq || 0) && seq > (p.seq || 0) - 1e6) return;   // old / duplicated packet
    p.seq = seq;
    if (!this.canMove(p)) return;
    const M = this.map, ghost = this.inGame && !p.alive;
    const now = this.now();
    // movement budget: network jitter may bunch packets, so up to ~0.9 s of travel can arrive at once
    p.budget = Math.min(this.speedOf(p) * .9, (p.budget || 0) + this.speedOf(p) * Math.min(.9, (now - (p.lastMove || now)) / 1000));
    p.lastMove = now;
    const to = { x: m.x, y: m.y };
    const dist = d2(p, to);
    let ok = dist <= p.budget + .04;
    if (ok && dist > 0) {
      if (ghost) ok = M.inside(to.x, to.y);
      else {
        const closed = this.closedDoors();
        const steps = Math.max(1, Math.ceil(dist / .06));
        for (let i = 1; i <= steps && ok; i++) {
          const t = i / steps;
          if (!M.nearWalk(p.x + (to.x - p.x) * t, p.y + (to.y - p.y) * t, .2, closed)) ok = false;
        }
      }
    }
    if (!ok) { this.correct(p); return; }
    p.budget -= dist;
    p.x = to.x; p.y = to.y;
    p.dir = m.d < 0 ? -1 : 1; p.moving = !!m.m;
    if (p.sys && this.game && !this.nearSystem(p, p.sys)) p.sys = null;
    if (p.openTask && this.game) { const c = M.consoles[p.openTask.console]; if (c && d2(p, c) > USE_RANGE + 1.2) p.openTask = null; }
  }
  correct(p) { p.budget = 0; this.send(p.id, { k: 'pos', x: p.x, y: p.y, q: p.seq }); }
  teleport(p, x, y) {
    const M = this.map;
    if (!(this.inGame && !p.alive)) [x, y] = M.nearestStand(x, y, this.closedDoors());
    p.x = x; p.y = y; p.budget = 0; p.moving = false;
    this.send(p.id, { k: 'pos', x, y, q: p.seq, map: this.mapId() });
  }

  // ------------------------------------------------------------------ start
  onStart(p, m) {
    if (this.mode === 'freeplay') return;
    if (p.id !== this.hostId || this.phase !== 'lobby') return;
    const n = this.connected().length;
    if (n < MIN_PLAYERS) return this.err(p.id, `Il faut au moins ${MIN_PLAYERS} joueurs pour commencer.`);
    if (this.settings.impostors > maxImpostors(n)) return this.err(p.id, `Trop d’imposteurs pour ${n} joueurs (maximum ${maxImpostors(n)}).`);
    this.phase = 'countdown'; this.countdownAt = this.now() + COUNTDOWN;
    this.changed();
  }
  startGame({ freeplayRole } = {}) {
    const now = this.now(), s = this.settings;
    const ids = this.connected().map(p => p.id);
    this.players.forEach(p => { if (!p.conn && !p.bot) this.players.delete(p.id); });
    const M = getMap(s.map);
    const g = this.game = {
      gid: Math.random().toString(36).slice(2, 10), map: s.map, startedAt: now, playAt: now + INTRO, closed: new Set(), doorOpenAt: new Map(), doorReadyAt: {},
      bodies: [], sab: null, sabReadyAt: now + INTRO + FIRST_CD, buttonReadyAt: now + INTRO + s.emergencyCooldown * 1000,
      meeting: null, eject: null, result: null, revealed: new Set(), left: [], looks: {}, deaths: new Map(), round: 1, meetings: 0,
      camsUsers: new Set(), over: false, kills: 0,
    };
    this.phase = 'intro';
    // roles
    const humanIds = ids.slice();
    for (let i = humanIds.length - 1; i > 0; i--) { const j = Math.floor(this.rng() * (i + 1)); [humanIds[i], humanIds[j]] = [humanIds[j], humanIds[i]]; }
    const roles = new Map();
    if (this.mode === 'freeplay') {
      const r = ROLES[freeplayRole] ? freeplayRole : 'crewmate';
      roles.set(ids[0], r);
    } else {
      const nImp = Math.min(s.impostors, maxImpostors(humanIds.length));
      humanIds.forEach((id, i) => roles.set(id, i < nImp ? 'impostor' : 'crewmate'));
      const give = (list, plain) => {
        for (const r of list) {
          const cfg = s.roles[r];
          for (let i = 0; i < cfg.count; i++) {
            if (this.rng() * 100 >= cfg.chance) continue;
            const free = humanIds.filter(id => roles.get(id) === plain);
            if (!free.length) break;
            roles.set(free[Math.floor(this.rng() * free.length)], r);
          }
        }
      };
      give(IMP_ROLES, 'impostor'); give(CREW_ROLES, 'crewmate');
    }
    const crewIds = ids.filter(id => ROLES[roles.get(id)]?.team === 'crew');
    const impIds = ids.filter(id => ROLES[roles.get(id)]?.team === 'imp');
    const dealt = this.mode === 'freeplay' ? new Map(ids.map(id => [id, allTasks(s.map, this.rng)])) : dealTasks(s.map, s, this.rng, [...crewIds, ...impIds]);
    const spawnPts = this.spawnRing(M, s.map === 'polus' ? { x: M.spawn[0], y: M.spawn[1], r: 1.6 } : M.meeting, this.players.size);
    let k = 0;
    this.players.forEach(p => {
      p.spectator = false;
      p.role = p.bot ? 'crewmate' : roles.get(p.id) || 'crewmate';
      p.team = ROLES[p.role].team;
      p.alive = true; p.deadAt = 0; p.ghostRole = null;
      p.tasks = p.bot ? [] : (dealt.get(p.id) || []).map(t => ({ ...t, fake: p.team === 'imp' }));
      p.openTask = null; p.vent = null; p.sys = null; p.hold = null;
      p.killAt = g.playAt + Math.min(FIRST_CD, s.killCooldown * 1000);
      p.abAt = g.playAt + FIRST_CD; p.abUntil = 0; p.uses = s.roles.judge?.uses ?? 1;
      p.meetingsLeft = s.emergencyMeetings; p.shift = null; p.vanished = false; p.protectedUntil = 0; p.protectBy = null;
      p.track = null; p.battery = (s.roles.scientist?.batteryDuration ?? 5) * 1000; p.batteryAt = 0; p.notes = null; p.ventUntil = 0; p.ventMoveAt = 0;
      p.round = 0; p.fx = 0;
      const pt = spawnPts[k++ % spawnPts.length];
      this.teleport(p, pt.x, pt.y);
    });
    if (this.mode === 'freeplay') this.addDummies(M);
    g.barValue = 0;
    this.history.clear();
    this.lastSent.clear(); this.lastHear.clear();
    const lineup = id => [...this.players.values()].filter(q => !q.bot).map(q => q.n);
    this.players.forEach(p => {
      const mates = p.team === 'imp' ? impIds.map(id => this.players.get(id).n) : lineup(p.id);
      this.send(p.id, { k: 'ev', e: 'intro', role: p.role, team: p.team, impostors: impIds.length, mates });
    });
    this.changed();
    this.flush();
  }
  spawnRing(M, c, n) {
    const pts = [];
    const ell = M.def.meeting?.ellipse;
    for (let i = 0; i < Math.max(n, 1); i++) {
      const a = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2;
      const rx = ell ? ell[0] / M.k : c.r, ry = ell ? ell[1] / M.k : c.r;
      const [x, y] = M.nearestStand(c.x + Math.cos(a) * rx, c.y + Math.sin(a) * ry);
      pts.push({ x, y });
    }
    return pts;
  }
  addDummies(M) {
    const pts = this.spawnRing(M, { x: M.spawn[0], y: M.spawn[1], r: 2.2 }, 7);
    for (let i = 0; i < 6; i++) {
      const id = 'dummy-' + i;
      const n = this.freeSlot();
      if (n < 0) break;
      const p = { id, n, name: `Mannequin ${i + 1}`, color: this.freeColor(), hat: 'none', skin: 'none', visor: 'none', pet: 'none', plate: 'none', conn: true, bot: true,
        joinedAt: this.now(), order: this.order++, role: 'crewmate', team: 'crew', alive: true, tasks: [], voice: { on: false }, x: pts[i + 1].x, y: pts[i + 1].y, dir: 1 };
      p.home = { x: p.x, y: p.y };
      this.players.set(id, p);
    }
  }

  // ------------------------------------------------------------------ actions in game
  playing(p) { return this.phase === 'play' && !!this.game && !p.spectator; }
  nearConsole(p, id, extra = 0) { const c = this.map.consoles[id]; return !!c && d2(p, c) <= USE_RANGE + TOL + extra; }

  onKill(p, targetId) {
    const g = this.game, now = this.now(), s = this.settings;
    if (!this.playing(p) || !p.alive || !this.isImp(p) || p.vent || p.vanished) return;
    const t = this.players.get(targetId);
    if (!t || !t.alive || t === p || this.isImp(t) || t.vent || t.spectator) return;
    if (now < p.killAt) return this.err(p.id, 'Ton temps de recharge n’est pas terminé.');
    if (d2(p, t) > KILL_RANGE[s.killDistance] + TOL || !this.map.los(p.x, p.y, t.x, t.y, g.closed)) return this.err(p.id, 'Cible trop éloignée.');
    if (t.protectedUntil > now) {
      p.killAt = now + s.killCooldown * 500;
      this.send(p.id, { k: 'ev', e: 'shielded', n: t.n });
      const ga = this.players.get(t.protectBy); if (ga) this.send(ga.id, { k: 'ev', e: 'saved', n: t.n });
      return;
    }
    p.killAt = now + s.killCooldown * 1000;
    this.kill(t, p, 'kill');
    this.teleport(p, t.x, t.y);
    this.checkWin();
  }
  // shared death logic (kill, ejection, judge, disconnect)
  kill(t, killer, how) {
    const g = this.game, now = this.now(), s = this.settings;
    t.alive = false; t.deadAt = now; t.vent = null; t.sys = null; t.openTask = null; t.shift = null; t.vanished = false; t.track = null;
    this.releaseHolds(t);
    if (t.role === 'guardianAngel' || t.role === 'influencer') { t.ghostRole = t.role; t.abAt = now + FIRST_CD; }
    if (how === 'kill') {
      g.kills++;
      const where = new Map();
      this.players.forEach(q => { if (!q.bot && !q.spectator) where.set(q.n, q.vent ? this.roomName(this.map.vents.find(v => v.id === q.vent) || q) : this.roomName(q)); });
      g.deaths.set(t.n, { where, killerRole: killer?.role || 'impostor', at: now, room: this.roomName(t) });
      const body = { n: t.n, x: t.x, y: t.y, at: now, dissolveAt: killer?.role === 'viper' ? now + s.roles.viper.dissolveTime * 1000 : 0 };
      g.bodies.push(body);
      this.send(t.id, { k: 'ev', e: 'killed', by: killer ? (killer.shift ? this.players.get(killer.shift)?.n ?? killer.n : killer.n) : -1, anim: Math.floor(this.rng() * 3) });
      if (killer) this.send(killer.id, { k: 'ev', e: 'kill', n: t.n });
      if (t.role === 'noisemaker' && this.mode !== 'freeplay') {
        const al = { x: t.x, y: t.y, until: now + s.roles.noisemaker.alertDuration * 1000, n: t.n };
        g.alerts = (g.alerts || []).concat(al);
        this.players.forEach(q => { if (q !== t && (!this.isImp(q) || s.roles.noisemaker.impostorsAlerted)) this.send(q.id, { k: 'ev', e: 'alert', x: al.x, y: al.y, n: t.n }); });
      }
      if (t.bot) t.respawnAt = now + 15000;
    }
    // the dead stop hearing the living (and the other way round) right now, not at the next tick
    this.flush();
  }
  roomName(o) { const r = this.map.roomAt(o.x, o.y); return r ? r.name : this.map.def.outside || 'Couloir'; }

  onReport(p, n) {
    const g = this.game;
    if (!this.playing(p) || !p.alive || p.vent || this.mode === 'freeplay') return;
    const b = g.bodies.find(x => x.n === n);
    if (!b) return;
    if (d2(p, b) > REPORT_RANGE + TOL || !this.map.los(p.x, p.y, b.x, b.y, g.closed)) return this.err(p.id, 'Corps trop éloigné.');
    this.startMeeting(p, b);
  }
  onButton(p) {
    const g = this.game, now = this.now(), M = this.map;
    if (!this.playing(p) || !p.alive || p.vent || this.mode === 'freeplay') return;
    const B = M.button;
    const box = B.box ? { x: Math.max(B.box[0] / M.k, Math.min(B.box[2] / M.k, p.x)), y: Math.max(B.box[1] / M.k, Math.min(B.box[3] / M.k, p.y)) } : B;
    if (d2(p, box) > (B.r || 2) + TOL) return this.err(p.id, 'Approche-toi du bouton d’urgence.');
    if (g.sab && CRIT[g.sab.kind]) return this.err(p.id, 'Impossible d’appeler une réunion d’urgence pendant une crise.');
    if (p.meetingsLeft <= 0) return this.err(p.id, 'Tu as utilisé toutes tes réunions d’urgence.');
    if (now < g.buttonReadyAt) return this.err(p.id, 'Le bouton d’urgence se recharge.');
    p.meetingsLeft--;
    this.startMeeting(p, null);
  }
  startMeeting(caller, body) {
    const g = this.game, now = this.now(), s = this.settings;
    g.meetings++;
    // everything in progress stops: sabotages that threaten the ship, doors, vents, tasks, abilities
    if (g.sab && (CRIT[g.sab.kind])) g.sab = null;
    g.closed.clear(); g.doorOpenAt.clear(); g.camsUsers.clear();
    const case_ = body ? { victim: body.n, room: this.roomName(body), killerRole: g.deaths.get(body.n)?.killerRole, suspects: [] } : null;
    this.players.forEach(p => {
      p.openTask = null; p.sys = null; p.hold = null;
      if (p.vent) p.vent = null;
      if (p.shift) { p.shift = null; p.abAt = now + s.roles.shapeshifter.shiftCooldown * 1000; }
      if (p.vanished) { p.vanished = false; p.abAt = now + s.roles.phantom.vanishCooldown * 1000; }
      p.track = null; p.moving = false;
      if (p.role === 'detective') p.notes = case_ ? { ...case_, suspects: [], found: true } : (p.notes && p.notes.found ? p.notes : { found: false, suspects: [] });
    });
    g.bodies = [];
    this.players.forEach(p => { if (!p.alive) g.revealed.add(p.n); });
    g.alerts = [];
    g.case = case_;
    g.barValue = this.taskProgress();
    g.meeting = { caller: caller.n, body: body ? body.n : null, startedAt: now, discussEnd: now + SPLASH + s.discussionTime * 1000,
      voteEnd: now + SPLASH + (s.discussionTime + s.votingTime) * 1000, votes: new Map(), results: null, verdicts: [] };
    this.phase = 'meeting';
    this.all({ k: 'ev', e: 'meeting', caller: caller.n, body: body ? body.n : null });
    this.changed();
    this.flush();
  }
  canVote(p) { return this.phase === 'meeting' && p.alive && !p.spectator && !p.bot; }
  onVote(p, target) {
    const g = this.game, M = g?.meeting, now = this.now();
    if (!M || M.results || !this.canVote(p) || now < M.discussEnd) return;
    if (M.votes.has(p.id)) return;
    if (target !== 'skip') { const t = this.players.get(target); if (!t || !t.alive || t.spectator) return; }
    M.votes.set(p.id, target);
    this.all({ k: 'ev', e: 'voted', n: p.n });
    this.maybeEndVoting();
  }
  maybeEndVoting() {
    const M = this.game?.meeting;
    if (!M || M.results) return;
    const voters = this.humans().filter(p => this.canVote(p) && p.conn);
    if (voters.length && voters.every(p => M.votes.has(p.id))) this.tally();
  }
  onJudge(p, target) {
    const g = this.game, M = g?.meeting, s = this.settings.roles.judge;
    if (!M || M.results || p.role !== 'judge' || !p.alive || p.uses <= 0) return;
    if (!s.firstMeeting && g.meetings <= 1) return this.err(p.id, 'Le verdict n’est possible qu’à partir de la deuxième réunion.');
    if (judgeLocked(p, s)) return this.err(p.id, `Termine ${s.taskUnlock} % de tes tâches pour débloquer le verdict.`);
    if (this.now() < M.startedAt + SPLASH) return;
    const t = this.players.get(target);
    if (!t || !t.alive || t === p || t.spectator) return;
    p.uses--;
    const guilty = this.isImp(t);
    const dead = guilty ? t : s.diesIfWrong ? p : null;
    if (dead) {
      this.kill(dead, null, 'judged');
      g.revealed.add(dead.n);
      M.votes.delete(dead.id);
      for (const [voter, v] of [...M.votes]) if (v === dead.id) M.votes.delete(voter);
    }
    M.verdicts.push({ judge: p.n, target: t.n, guilty, dead: dead ? dead.n : null });
    this.all({ k: 'ev', e: 'verdict', judge: p.n, target: t.n, guilty, dead: dead ? dead.n : null });
    if (!this.checkWin()) this.maybeEndVoting();
  }
  tally() {
    const g = this.game, M = g.meeting, now = this.now();
    const count = new Map();
    let skip = 0;
    for (const v of M.votes.values()) { if (v === 'skip') skip++; else count.set(v, (count.get(v) || 0) + 1); }
    let top = null, max = 0, tie = false;
    for (const [id, c] of count) { if (c > max) { max = c; top = id; tie = false; } else if (c === max) tie = true; }
    let ejected = null, why = '';
    if (!top || tie || max <= skip) why = !top && !skip ? 'none' : tie || max === skip ? 'tie' : 'skip';
    else ejected = this.players.get(top) || null;
    M.results = { votes: [...M.votes].map(([voter, v]) => [this.players.get(voter)?.n ?? -1, v === 'skip' ? 'skip' : this.players.get(v)?.n ?? -1]), ejected: ejected ? ejected.n : null, why, at: now };
    M.resultsEnd = now + RESULTS;
    this.changed();
  }
  finishMeeting() {
    const g = this.game, M = g.meeting, now = this.now(), s = this.settings;
    const ej = M.results.ejected != null ? this.byN(M.results.ejected) : null;
    let text, sub = '';
    if (ej && ej.alive) {
      this.kill(ej, null, 'ejected');
      g.revealed.add(ej.n);
      const impLeft = this.humans().filter(p => p.alive && this.isImp(p)).length;
      if (s.confirmEjects) {
        text = this.isImp(ej) ? `${ej.name} était ${ej.role === 'impostor' ? 'l’Imposteur' : `l’Imposteur (${ROLES[ej.role].name})`}.` : `${ej.name} n’était pas l’Imposteur.`;
        sub = `${impLeft} Imposteur${impLeft > 1 ? 's' : ''} restant${impLeft > 1 ? 's' : ''}.`;
      } else text = `${ej.name} a été éjecté.`;
    } else text = M.results.why === 'skip' ? 'Personne n’a été éjecté. (Vote passé)' : M.results.why === 'tie' ? 'Personne n’a été éjecté. (Égalité)' : 'Personne n’a été éjecté.';
    g.eject = { n: ej ? ej.n : null, text, sub, until: now + EJECT, imp: ej ? this.isImp(ej) : false };
    g.meeting = null;
    this.phase = 'eject';
    this.changed();
    this.flush();
  }
  resumePlay() {
    const g = this.game, now = this.now(), s = this.settings;
    g.eject = null;
    if (this.checkWin()) return;
    this.phase = 'play';
    g.round++;
    g.buttonReadyAt = now + s.emergencyCooldown * 1000;
    g.sabReadyAt = now + FIRST_CD;
    const M = this.map;
    const alive = [...this.players.values()].filter(p => p.alive || p.bot);
    const pts = this.spawnRing(M, M.meeting, alive.length);
    alive.forEach((p, i) => {
      this.teleport(p, pts[i].x, pts[i].y);
      p.killAt = now + s.killCooldown * 1000;
      if (p.role !== 'judge') p.abAt = now + Math.min(FIRST_CD, this.abilityCooldown(p));
      p.round = 0;
    });
    this.players.forEach(p => { if (!p.alive && p.ghostRole) p.abAt = Math.max(p.abAt, now + FIRST_CD); });
    this.changed();
    this.flush();
  }
  abilityCooldown(p) {
    const r = this.settings.roles;
    return 1000 * ({ scientist: r.scientist.vitalsCooldown, engineer: r.engineer.ventCooldown, tracker: r.tracker.trackCooldown, detective: r.detective.interrogateCooldown,
      shapeshifter: r.shapeshifter.shiftCooldown, phantom: r.phantom.vanishCooldown, guardianAngel: r.guardianAngel.protectCooldown, influencer: r.influencer.messageCooldown }[p.ghostRole || p.role] || 10);
  }

  // ------------------------------------------------------------------ tasks
  onTask(p, m) {
    const g = this.game, now = this.now();
    if (!this.playing(p) || p.vent || p.bot) return;
    if (m.a === 'close') { p.openTask = null; return; }
    const t = p.tasks.find(x => x.id === m.id);
    if (!t || t.done || t.fake) return;
    const step = t.steps[t.step];
    if (!step) return;
    if (m.a === 'open') {
      if (!this.nearConsole(p, step.console)) return this.err(p.id, 'Trop loin de la console.');
      if (now < t.readyAt) return this.err(p.id, 'Pas encore prêt.');
      p.openTask = { id: t.id, step: t.step, console: step.console, at: now };
      this.send(p.id, { k: 'ev', e: 'taskOpen', id: t.id, step: t.step });
      return;
    }
    if (m.a === 'done') {
      const o = p.openTask;
      if (!o || o.id !== t.id || o.step !== t.step) return;
      if (now - o.at < step.min * .85) { p.openTask = null; return this.err(p.id, 'Tâche trop rapide, recommence.'); }
      if (!this.nearConsole(p, step.console, .8)) { p.openTask = null; return; }
      p.openTask = null;
      t.step++;
      const next = t.steps[t.step];
      if (next?.wait) t.readyAt = now + next.wait * 1000;
      if (t.step >= t.steps.length) {
        t.done = true;
        if (p.role === 'scientist') p.battery = this.settings.roles.scientist.batteryDuration * 1000;
        this.send(p.id, { k: 'ev', e: 'taskDone', id: t.id });
        this.checkWin();
      } else this.send(p.id, { k: 'ev', e: 'stepDone', id: t.id, step: t.step });
    }
  }
  taskProgress() {
    let total = 0, done = 0;
    this.players.forEach(p => {
      if (p.bot || p.team !== 'crew' || p.spectator) return;
      for (const t of p.tasks) { total++; if (t.done) done++; }
    });
    return total ? done / total : 0;
  }

  // ------------------------------------------------------------------ sabotage & doors
  onSabotage(p, kind) {
    const g = this.game, now = this.now(), M = this.map;
    if (!this.playing(p) || !this.isImp(p)) return;
    if (!M.sabotage[kind]) return;
    if (g.sab) return this.err(p.id, 'Un sabotage est déjà en cours.');
    if (now < g.sabReadyAt) return this.err(p.id, 'Sabotage en recharge.');
    const sab = { kind, at: now, holds: [null, null], fixed: [false, false] };
    if (CRIT[kind]) sab.endsAt = now + CRIT[kind];
    if (kind === 'o2') sab.code = String(Math.floor(this.rng() * 90000) + 10000);
    if (kind === 'lights') { sab.sw = [0, 0, 0, 0, 0].map(() => (this.rng() < .5 ? 1 : 0)); if (sab.sw.every(Boolean)) sab.sw[Math.floor(this.rng() * 5)] = 0; }
    if (kind === 'comms') sab.target = Math.round((.15 + this.rng() * .7) * 100) / 100;
    g.sab = sab;
    this.all({ k: 'ev', e: 'sabotage', s: kind });
    this.changed();
  }
  onDoor(p, room) {
    const g = this.game, now = this.now(), M = this.map;
    if (!this.playing(p) || !this.isImp(p)) return;
    const doors = M.doors.filter(d => d.room === room);
    if (!doors.length) return;
    if (now < (g.doorReadyAt[room] || g.playAt + FIRST_CD)) return this.err(p.id, 'Portes en recharge.');
    doors.forEach(d => { g.closed.add(d.i); g.doorOpenAt.set(d.i, now + DOOR_CLOSE[g.map]); });
    g.doorReadyAt[room] = now + DOOR_CD;
    // nobody may stay inside a closed door
    this.players.forEach(q => { if (q.alive && !q.vent && !M.canStand(q.x, q.y, g.closed)) this.teleport(q, q.x, q.y); });
    this.all({ k: 'ev', e: 'doors', room });
  }
  releaseHolds(p) { const sab = this.game?.sab; if (sab?.holds) sab.holds = sab.holds.map(h => (h === p.id ? null : h)); p.hold = null; }
  onFix(p, m) {
    const g = this.game, M = this.map;
    if (!this.playing(p) || !p.alive || p.vent) return;
    if (m.a === 'door') {
      const d = M.doors[m.i | 0];
      if (!d || !g.closed.has(d.i) || g.map !== 'polus') return;
      if (d2(p, d) > USE_RANGE + 1 + TOL) return;
      g.closed.delete(d.i); g.doorOpenAt.delete(d.i);
      this.all({ k: 'ev', e: 'doorOpen', i: d.i });
      return;
    }
    const sab = g.sab;
    if (!sab) return;
    const spots = M.sabotage[sab.kind] || [];
    const i = Math.max(0, Math.min(spots.length - 1, m.i | 0));
    const spot = spots[i];
    if (!spot || d2(p, spot) > USE_RANGE + .6 + TOL) return;
    if (sab.kind === 'reactor' || sab.kind === 'seismic') {
      if (m.a === 'hold') { if (m.on) { if (!sab.holds[i] || sab.holds[i] === p.id) { sab.holds[i] = p.id; p.hold = i; } } else if (sab.holds[i] === p.id) { sab.holds[i] = null; p.hold = null; } }
      if (sab.holds[0] && sab.holds[1]) this.fixed();
    } else if (sab.kind === 'o2' && m.a === 'code') {
      if (String(m.code) === sab.code) { sab.fixed[i] = true; this.send(p.id, { k: 'ev', e: 'fixPart', i }); }
      else return this.err(p.id, 'Code incorrect.');
      if (sab.fixed[0] && sab.fixed[1]) this.fixed();
    } else if (sab.kind === 'lights' && m.a === 'switch') {
      const s = m.s | 0; if (s < 0 || s > 4) return;
      sab.sw[s] = sab.sw[s] ? 0 : 1;
      if (sab.sw.every(Boolean)) this.fixed();
    } else if (sab.kind === 'comms' && m.a === 'tune') {
      if (isNum(m.v) && Math.abs(m.v - sab.target) <= .035) this.fixed();
    }
  }
  fixed() {
    const g = this.game;
    const kind = g.sab.kind;
    g.sab = null;
    g.sabReadyAt = this.now() + SAB_CD;
    this.players.forEach(p => { p.hold = null; });
    this.all({ k: 'ev', e: 'fixed', s: kind });
    this.changed();
  }

  // ------------------------------------------------------------------ vents
  canVent(p) { return p.alive && (this.isImp(p) && !p.vanished || p.role === 'engineer'); }
  onVent(p, m) {
    const g = this.game, now = this.now(), M = this.map, s = this.settings;
    if (!this.playing(p) || !this.canVent(p)) return;
    if (m.a === 'enter') {
      if (p.vent) return;
      const v = M.vents.find(x => x.id === m.id);
      if (!v || d2(p, v) > USE_RANGE + TOL) return;
      if (p.role === 'engineer' && now < p.abAt) return this.err(p.id, 'Conduits en recharge.');
      p.vent = v.id; p.openTask = null; p.sys = null; this.releaseHolds(p);
      p.ventMoveAt = now;
      if (p.role === 'engineer') p.ventUntil = s.roles.engineer.ventDuration > 0 ? now + s.roles.engineer.ventDuration * 1000 : 0;
      p.x = v.x; p.y = v.y;
      this.ventFx(v, p);
      this.send(p.id, { k: 'pos', x: v.x, y: v.y, q: p.seq });
    } else if (m.a === 'move') {
      const v = M.vents.find(x => x.id === p.vent);
      if (!v || !v.links.includes(m.id) || now - p.ventMoveAt < 250) return;
      const to = M.vents.find(x => x.id === m.id);
      p.vent = to.id; p.ventMoveAt = now; p.x = to.x; p.y = to.y;
      this.send(p.id, { k: 'pos', x: to.x, y: to.y, q: p.seq });
    } else if (m.a === 'exit') this.exitVent(p);
  }
  exitVent(p) {
    if (!p.vent) return;
    const v = this.map.vents.find(x => x.id === p.vent);
    p.vent = null;
    if (p.role === 'engineer') { p.abAt = this.now() + this.settings.roles.engineer.ventCooldown * 1000; p.ventUntil = 0; }
    if (v) { this.teleport(p, v.x, v.y + .15); this.ventFx(v, p); }
  }
  ventFx(v, by) {
    const g = this.game;
    this.players.forEach(q => {
      if (q === by) return this.send(q.id, { k: 'ev', e: 'vent', x: v.x, y: v.y, me: true });
      if (!q.alive || d2(q, v) <= this.visionOf(q) && this.map.los(q.x, q.y, v.x, v.y, g.closed)) this.send(q.id, { k: 'ev', e: 'vent', x: v.x, y: v.y });
    });
  }

  // ------------------------------------------------------------------ role abilities
  onAbility(p, m) {
    const g = this.game, now = this.now(), s = this.settings.roles;
    if (!this.playing(p)) return;
    const role = p.alive ? p.role : p.ghostRole;
    const t = m.id != null ? this.players.get(m.id) : null;
    const ready = now >= p.abAt;
    switch (`${role}:${m.a}`) {
      case 'shapeshifter:shift':
        if (!p.alive || p.vent || p.shift || !ready || !t || t === p || t.spectator) return;
        p.shift = t.id; p.abUntil = now + s.shapeshifter.shiftDuration * 1000;
        if (s.shapeshifter.evidence) p.fx = now + 700;
        return this.changed();
      case 'shapeshifter:unshift':
        if (!p.shift) return;
        p.shift = null; p.abAt = now + s.shapeshifter.shiftCooldown * 1000; p.abUntil = 0;
        if (s.shapeshifter.evidence) p.fx = now + 700;
        return this.changed();
      case 'phantom:vanish':
        if (!p.alive || p.vent || p.vanished || !ready) return;
        p.vanished = true; p.abUntil = now + s.phantom.vanishDuration * 1000; p.fx = now + 600;
        return;
      case 'phantom:appear':
        if (!p.vanished) return;
        p.vanished = false; p.abAt = now + s.phantom.vanishCooldown * 1000; p.abUntil = 0; p.fx = now + 600;
        return;
      case 'tracker:track':
        if (!p.alive || !ready || p.track || !t || !t.alive || t === p || d2(p, t) > ABILITY_RANGE + TOL) return;
        p.track = { id: t.id, until: now + s.tracker.trackDuration * 1000 };
        p.abUntil = p.track.until;
        return;
      case 'guardianAngel:protect':
        if (p.alive || !ready || !t || !t.alive || t.spectator || d2(p, t) > ABILITY_RANGE + 1 + TOL) return;
        t.protectedUntil = now + s.guardianAngel.protectDuration * 1000; t.protectBy = p.id;
        p.abAt = now + s.guardianAngel.protectCooldown * 1000;
        return;
      case 'detective:interrogate': {
        if (!p.alive || !ready || !t || !t.alive || t === p || d2(p, t) > ABILITY_RANGE + TOL) return;
        const notes = p.notes;
        if (!notes?.found) return this.err(p.id, 'Aucun corps n’a été découvert : rien à enquêter.');
        if (p.round >= s.detective.suspects) return this.err(p.id, 'Tu as interrogé assez de suspects pour cette manche.');
        if (notes.suspects.some(x => x.n === t.n)) return this.err(p.id, 'Ce joueur a déjà été interrogé.');
        const where = g.deaths.get(notes.victim)?.where.get(t.n) || 'inconnu';
        notes.suspects.push({ n: t.n, room: where });
        p.round++;
        p.abAt = now + s.detective.interrogateCooldown * 1000;
        this.send(p.id, { k: 'ev', e: 'interrogated', n: t.n, room: where });
        return;
      }
      case 'influencer:message': {
        // a dead influencer writes to the crewmates still alive (not during meetings: the ghost chat stays separate)
        const text = str(m.text, 80);
        if (p.alive || !ready || !text || this.phase !== 'play') return;
        p.abAt = now + s.influencer.messageCooldown * 1000;
        this.players.forEach(q => { if (q.alive && !q.bot) this.send(q.id, { k: 'ev', e: 'influence', n: p.n, text }); });
        this.send(p.id, { k: 'ev', e: 'influenceSent' });
        return;
      }
      case 'scientist:vitals':
        if (!p.alive) return;
        if (p.battery <= 0) return this.err(p.id, 'Batterie vide : patiente pendant la recharge.');
        p.sys = 'vitals'; p.sysPortable = true;
        return;
    }
  }
  nearSystem(p, kind) {
    const M = this.map;
    if (kind === 'vitals' && p.role === 'scientist' && p.sysPortable && p.alive) return true;
    const spot = kind === 'admin' ? M.admin : kind === 'cams' ? M.cams : kind === 'vitals' ? M.vitals : null;
    return !!spot && d2(p, spot) <= USE_RANGE + 1 + TOL;
  }
  onSystem(p, kind) {
    const g = this.game;
    if (!this.playing(p) || p.vent) return;
    if (!kind) { p.sys = null; p.sysPortable = false; g.camsUsers.delete(p.id); return; }
    if (!['admin', 'cams', 'vitals'].includes(kind)) return;
    p.sysPortable = false;
    if (!this.nearSystem(p, kind)) return;
    p.sys = kind;
    if (kind === 'cams') g.camsUsers.add(p.id);
  }

  // ------------------------------------------------------------------ free play
  onFreeplay(p, m) {
    if (this.mode !== 'freeplay') return;
    if (m.a === 'start' && this.phase === 'lobby') {
      this.settings = cleanSettings({ ...this.settings, map: m.map === 'polus' ? 'polus' : 'skeld', emergencyMeetings: 0 });
      this.startGame({ freeplayRole: m.role });
    } else if (m.a === 'stop') {
      this.toLobby();
    }
  }

  // ------------------------------------------------------------------ voice signalling (only inside a voice group)
  onRtc(p, m) {
    const to = this.players.get(String(m.to || ''));
    if (!to || to === p || to.bot || !m.data || typeof m.data !== 'object') return;
    if (this.voiceGroup(p) !== this.voiceGroup(to)) return;
    if (!this.settings.voiceChat) return;
    if (JSON.stringify(m.data).length > 12000) return;
    this.send(to.id, { k: 'rtc', from: p.id, data: m.data, g: this.voiceGroup(p) });
  }

  // ------------------------------------------------------------------ end of game
  checkWin() {
    const g = this.game;
    if (!g || g.over || this.mode === 'freeplay' || !['play', 'meeting', 'eject', 'intro'].includes(this.phase)) return false;
    const hs = this.humans().filter(p => !p.spectator);
    const imps = hs.filter(p => p.alive && this.isImp(p)).length;
    const crew = hs.filter(p => p.alive && !this.isImp(p)).length;
    const total = hs.filter(p => p.team === 'crew').reduce((a, p) => a + p.tasks.length, 0);
    const done = hs.filter(p => p.team === 'crew').reduce((a, p) => a + p.tasks.filter(t => t.done).length, 0);
    if (imps === 0) return this.endGame('crew', g.left.length && !g.kills && !g.meetings ? 'disconnect' : 'vote');
    if (total > 0 && done >= total) return this.endGame('crew', 'tasks');
    if (imps >= crew) return this.endGame('imp', crew === 0 && hs.every(p => this.isImp(p) || !p.conn) ? 'disconnect' : 'kill');
    return false;
  }
  endGame(team, why) {
    const g = this.game, now = this.now();
    if (g.over) return true;
    g.over = true;
    const players = [...this.players.values()].filter(p => !p.bot && !p.spectator).map(p => ({ ...this.lookOf(p), role: p.role, team: p.team, alive: p.alive,
      tasks: p.team === 'crew' ? p.tasks.filter(t => t.done).length : 0, total: p.team === 'crew' ? p.tasks.length : 0 }));
    g.result = { team, why, players, at: now, until: now + ENDED, gid: g.gid, map: g.map };
    g.meeting = null; g.eject = null; g.sab = null;
    this.phase = 'ended';
    this.endedAt = now + ENDED;
    this.changed();
    this.flush();
    return true;
  }
  toLobby() {
    this.game = null;
    this.phase = 'lobby';
    for (const p of [...this.players.values()]) {
      if (p.bot) { this.players.delete(p.id); continue; }
      p.role = null; p.team = null; p.alive = true; p.tasks = []; p.spectator = false; p.vent = null; p.shift = null; p.vanished = false; p.sys = null;
      this.resetLobbyPos(p);
      this.send(p.id, { k: 'pos', x: p.x, y: p.y, q: p.seq, map: 'lobby' });
    }
    this.lastSent.clear(); this.lastHear.clear();
    this.changed();
    this.flush();
  }

  // ------------------------------------------------------------------ the clock
  tick() {
    if (this.closed) return;
    const now = this.now(), g = this.game, s = this.settings;
    this.tickN++;
    // disconnected players get a grace period, then leave for good
    for (const p of [...this.players.values()]) {
      if (p.bot || p.conn) continue;
      if (now - p.droppedAt > (this.inGame ? GRACE_GAME : GRACE_LOBBY)) this.leave(p.id, 'dropped');
    }
    if (this.closed) return;
    if (this.phase === 'countdown') {
      if (this.connected().length < MIN_PLAYERS) { this.phase = 'lobby'; this.changed(); }
      else if (now >= this.countdownAt) this.startGame();
    }
    if (g) {
      if (this.phase === 'intro' && now >= g.playAt) { this.phase = 'play'; this.changed(); this.checkWin(); }
      if (this.phase === 'meeting' && g.meeting) {
        if (!g.meeting.results && now >= g.meeting.voteEnd) this.tally();
        else if (g.meeting.results && now >= g.meeting.resultsEnd) this.finishMeeting();
      }
      if (this.phase === 'eject' && g.eject && now >= g.eject.until) this.resumePlay();
      if (this.phase === 'ended' && now >= this.endedAt) this.toLobby();
      if (this.phase === 'play' && this.game) this.tickPlay(now, s);
    }
    if (this.closed) return;
    this.broadcast(now);
  }
  tickPlay(now, s) {
    const g = this.game, M = this.map;
    if (g.sab?.endsAt && now >= g.sab.endsAt) {
      if (this.mode === 'freeplay') { g.sab = null; this.all({ k: 'ev', e: 'fixed', s: 'timeout' }); }
      else { this.endGame('imp', 'sabotage'); return; }
    }
    if (g.sab?.holds) g.sab.holds = g.sab.holds.map((h, i) => { const p = h && this.players.get(h); return p && p.alive && p.conn && d2(p, M.sabotage[g.sab.kind][i]) <= USE_RANGE + 1 + TOL ? h : null; });
    for (const [i, at] of g.doorOpenAt) if (now >= at) { g.closed.delete(i); g.doorOpenAt.delete(i); }
    const before = g.bodies.length;
    g.bodies = g.bodies.filter(b => !b.dissolveAt || now < b.dissolveAt);
    if (g.bodies.length !== before) this.changed();
    if (g.alerts) g.alerts = g.alerts.filter(a => now < a.until);
    this.players.forEach(p => {
      if (p.bot) {
        if (!p.alive && p.respawnAt && now >= p.respawnAt) { p.alive = true; p.respawnAt = 0; p.x = p.home.x; p.y = p.home.y; g.bodies = g.bodies.filter(b => b.n !== p.n); }
        return;
      }
      if (p.shift && now >= p.abUntil) { p.shift = null; p.abAt = now + s.roles.shapeshifter.shiftCooldown * 1000; p.fx = now + 700; }
      if (p.vanished && now >= p.abUntil) { p.vanished = false; p.abAt = now + s.roles.phantom.vanishCooldown * 1000; p.fx = now + 600; }
      if (p.track && now >= p.track.until) { p.track = null; p.abAt = now + s.roles.tracker.trackCooldown * 1000; }
      if (p.vent && p.role === 'engineer' && p.ventUntil && now >= p.ventUntil) this.exitVent(p);
      if (p.role === 'scientist') {
        if (p.sys === 'vitals' && p.sysPortable) {
          p.battery -= TICK;
          if (p.battery <= 0) { p.battery = 0; p.sys = null; p.sysPortable = false; p.batteryAt = now + s.roles.scientist.vitalsCooldown * 1000; }
        } else if (p.battery <= 0 && now >= p.batteryAt) p.battery = s.roles.scientist.batteryDuration * 1000;
      }
      if (p.sys === 'cams') g.camsUsers.add(p.id); else g.camsUsers.delete(p.id);
      if (this.tickN % 5 === 0) {
        const h = this.history.get(p.id) || [];
        h.push([now, p.x, p.y]); if (h.length > HIST) h.shift();
        this.history.set(p.id, h);
      }
    });
  }

  // ------------------------------------------------------------------ what each player sees
  visionOf(p) {
    const s = this.settings, g = this.game;
    if (!g || !this.inGame) return 99;
    if (!p.alive) return 99;
    if (this.isImp(p)) return VISION_BASE * s.impostorVision;
    return VISION_BASE * s.crewVision * (g.sab?.kind === 'lights' ? LIGHTS_VISION : 1);
  }
  sees(v, u) {
    if (u === v) return true;
    if (!this.game || this.phase === 'lobby' || this.phase === 'countdown') return true;
    const ghostView = !v.alive;
    if (!u.alive && !u.bot) return ghostView && !u.spectator;          // ghosts are invisible to the living
    if (u.vent) return false;
    if (u.vanished && !(this.isImp(v) || ghostView)) return false;
    if (u.bot && !u.alive) return false;
    if (ghostView) return true;
    const r = this.visionOf(v) + .6;
    return d2(v, u) <= r && this.map.los(v.x, v.y, u.x, u.y, this.game.closed);
  }
  flagsFor(v, u, now) {
    const g = this.game, s = this.settings;
    let f = (u.moving ? 1 : 0) | (u.dir < 0 ? 2 : 0);
    if (!u.alive && !u.bot) f |= 4;
    if (g && this.phase === 'play' && s.visualTasks && u.openTask) {
      const game = u.tasks.find(t => t.id === u.openTask.id)?.steps[u.openTask.step]?.game;
      if (game === 'scan') f |= 8;
      if (game === 'asteroids') f |= 16;
    }
    if (g && u.protectedUntil > now && (v.id === u.protectBy || (this.isImp(v) && s.roles.guardianAngel.protectVisible))) f |= 32;
    if (u.vanished) f |= 64;
    if (u.fx > now) f |= 128;
    if (u.talking && u.voice?.on && !u.voice.muted) f |= 256;
    return f;
  }
  snapshotFor(v, now) {
    const list = [];
    const ingame = this.game && this.phase === 'play';
    if (ingame || this.phase === 'lobby' || this.phase === 'countdown') {
      this.players.forEach(u => {
        if (u === v || !this.sees(v, u)) return;
        const look = u.shift ? this.players.get(u.shift)?.n ?? u.n : u.n;
        list.push([u.n, Math.round(u.x * 100) / 100, Math.round(u.y * 100) / 100, this.flagsFor(v, u, now), look]);
      });
    }
    const msg = { k: 's', t: now, p: list, f: this.flagsFor(v, v, now) };
    if (ingame) {
      const g = this.game;
      msg.b = g.bodies.filter(b => !v.alive || d2(v, b) <= this.visionOf(v) + .6 && this.map.los(v.x, v.y, b.x, b.y, g.closed))
        .map(b => [b.n, Math.round(b.x * 100) / 100, Math.round(b.y * 100) / 100, b.dissolveAt ? Math.max(0, Math.min(1, (now - b.at) / (b.dissolveAt - b.at))) : 0]);
    }
    return msg;
  }
  hearFor(v) {
    // voice gains decided here, so a modified client cannot listen further than allowed
    const s = this.settings, g = this.game;
    const out = [];
    if (!s.voiceChat || v.bot) return out;
    const group = this.voiceGroup(v);
    this.players.forEach(u => {
      if (u === v || u.bot || !u.conn || this.voiceGroup(u) !== group) return;
      let gain = 1;
      if (group === 'alive' && this.phase === 'play') {
        if (v.vent || u.vent) gain = 0;
        else {
          const d = d2(v, u), R = s.voiceRange;
          gain = d >= R ? 0 : Math.max(0, 1 - (d / R) ** 1.6);
          if (gain > 0 && !this.map.los(v.x, v.y, u.x, u.y, g.closed)) gain *= .35;
        }
      } else if (group === 'dead' && this.phase === 'play' && !s.ghostVoiceAll) {
        const d = d2(v, u), R = s.voiceRange;
        gain = d >= R ? 0 : Math.max(0, 1 - (d / R) ** 1.6);
      }
      out.push([u.n, Math.round(gain * 20) * 5]);
    });
    return out;
  }
  viewFor(v, now) {
    const g = this.game, s = this.settings;
    const V = { phase: this.phase, host: this.players.get(this.hostId)?.n ?? -1, code: this.code, public: this.public, region: this.region, mode: this.mode, preset: this.preset,
      settings: s, countdown: this.phase === 'countdown' ? this.countdownAt : 0, now };
    V.voice = { group: this.voiceGroup(v), peers: this.settings.voiceChat ? [...this.players.values()].filter(u => u !== v && !u.bot && u.conn && this.voiceGroup(u) === this.voiceGroup(v)).map(u => u.id) : [] };
    V.players = [...this.players.values()].sort((a, b) => a.n - b.n).map(u => {
      const o = this.lookOf(u);
      o.conn = u.conn; o.bot = !!u.bot;
      o.voice = !!u.voice?.on; o.muted = !!u.voice?.muted;
      if (g && this.inGame) {
        const known = !v.alive || g.revealed.has(u.n) || u === v || this.phase === 'ended';
        o.dead = known ? !u.alive && !u.spectator : false;
        if (this.isImp(v) && this.isImp(u)) o.imp = true;
        if (this.phase === 'ended') { o.role = u.role; o.imp = this.isImp(u); }
        if (g.meeting) o.voted = g.meeting.votes.has(u.id);
        o.spectator = !!u.spectator;
      }
      return o;
    });
    if (g) {
      V.map = g.map; V.gid = g.gid;
      const meRole = v.role;
      V.me = { role: meRole, team: v.team, alive: v.alive, ghostRole: v.ghostRole, spectator: !!v.spectator, vent: v.vent, killAt: v.killAt, abAt: v.abAt, abUntil: v.abUntil,
        uses: v.uses, meetingsLeft: v.meetingsLeft, shift: v.shift ? this.players.get(v.shift)?.n : null, vanished: v.vanished, sys: v.sys,
        track: v.track ? { n: this.players.get(v.track.id)?.n, until: v.track.until } : null, battery: v.battery, batteryAt: v.batteryAt, hold: v.hold ?? null,
        openTask: v.openTask ? { id: v.openTask.id, step: v.openTask.step } : null };
      if (v.ventUntil) V.me.ventUntil = v.ventUntil;
      if (v.role === 'detective') V.me.notes = v.notes;
      V.tasks = (v.tasks || []).map(t => ({ id: t.id, step: t.step, done: t.done, readyAt: t.readyAt, fake: !!t.fake, steps: t.steps.map(st => ({ console: st.console, game: st.game, target: st.target })) }));
      V.taskBar = s.taskBar === 'always' || this.phase === 'ended' ? this.taskProgress() : s.taskBar === 'meetings' ? g.barValue : null;
      if (g.sab) {
        const sab = g.sab;
        V.sab = { kind: sab.kind, endsAt: sab.endsAt || 0, holds: sab.holds?.map(h => (h ? this.players.get(h)?.n ?? -1 : -1)), fixed: sab.fixed, code: sab.code, sw: sab.sw, target: sab.target };
      } else V.sab = null;
      if (this.isImp(v)) { V.sabReadyAt = g.sabReadyAt; V.doorReadyAt = g.doorReadyAt; }
      V.closed = [...g.closed];
      V.buttonReadyAt = g.buttonReadyAt;
      V.camsInUse = g.camsUsers.size > 0;
      V.alerts = (g.alerts || []).filter(a => this.players.get(v.id) && (!this.isImp(v) || s.roles.noisemaker.impostorsAlerted)).map(a => ({ x: a.x, y: a.y, until: a.until }));
      if (g.meeting) {
        const M = g.meeting;
        V.meeting = { caller: M.caller, body: M.body, startedAt: M.startedAt, discussEnd: M.discussEnd, voteEnd: M.voteEnd, myVote: M.votes.has(v.id) ? (M.votes.get(v.id) === 'skip' ? 'skip' : this.players.get(M.votes.get(v.id))?.n ?? null) : null,
          results: M.results && (s.anonymousVotes ? { ...M.results, votes: M.results.votes.map(([, t]) => [-1, t]) } : M.results), resultsEnd: M.resultsEnd || 0, verdicts: M.verdicts };
      }
      if (g.eject) V.eject = g.eject;
      if (g.result) {
        const r = g.result;
        const meTeam = v.team;
        V.result = { ...r, win: meTeam ? meTeam === r.team : false };
      }
      if (v.track) {
        const t = this.players.get(v.track.id);
        if (t && t.alive) {
          const delay = s.roles.tracker.trackDelay * 1000, h = this.history.get(t.id) || [];
          const at = h.filter(e => e[0] <= now - delay).pop() || [now, t.x, t.y];
          V.trackPos = [Math.round(at[1] * 10) / 10, Math.round(at[2] * 10) / 10];
        }
      }
      if (v.sys && (!g.sab || g.sab.kind !== 'comms')) V.sysData = this.systemData(v);
      else if (v.sys) V.sysData = { comms: true };
    }
    return V;
  }
  systemData(v) {
    const g = this.game, M = this.map;
    if (v.sys === 'admin') {
      const counts = {};
      this.players.forEach(u => { if (u.alive && !u.vent && !u.spectator) { const r = M.roomAt(u.x, u.y); if (r) counts[r.id] = (counts[r.id] || 0) + 1; } });
      g.bodies.forEach(b => { const r = M.roomAt(b.x, b.y); if (r) counts[r.id] = (counts[r.id] || 0) + 1; });
      return { admin: counts };
    }
    if (v.sys === 'cams') {
      return { cams: M.cams.views.map(c => {
        const seen = [];
        this.players.forEach(u => { if (u.alive && !u.vent && !u.vanished && !u.spectator && d2(u, c) < 4.2 && M.los(c.x, c.y, u.x, u.y, g.closed)) seen.push([u.n, Math.round(u.x * 100) / 100, Math.round(u.y * 100) / 100, (u.moving ? 1 : 0) | (u.dir < 0 ? 2 : 0), u.shift ? this.players.get(u.shift)?.n ?? u.n : u.n]); });
        const bodies = g.bodies.filter(b => d2(b, c) < 4.2 && M.los(c.x, c.y, b.x, b.y, g.closed)).map(b => [b.n, Math.round(b.x * 100) / 100, Math.round(b.y * 100) / 100]);
        return { p: seen, b: bodies };
      }) };
    }
    if (v.sys === 'vitals') {
      return { vitals: [...this.players.values()].filter(u => !u.bot && !u.spectator).map(u => [u.n, !u.conn && u.alive ? 'dc' : u.alive ? 'ok' : 'dead']).concat(this.game.left.map(n => [n, 'dc'])) };
    }
    return null;
  }
  pushView(p, force = false) {
    const now = this.now();
    const V = this.viewFor(p, now);
    const key = JSON.stringify({ ...V, now: 0, sysData: V.sysData ? { t: Math.floor(now / 200), ...V.sysData } : null });
    if (!force && this.lastSent.get(p.id) === key) return;
    this.lastSent.set(p.id, key);
    this.send(p.id, { k: 'v', v: V, looks: this.game?.looks });
  }
  pushHear(p) {
    const hear = this.hearFor(p);
    const key = JSON.stringify(hear) + this.voiceGroup(p);
    if (this.lastHear.get(p.id) !== key) { this.lastHear.set(p.id, key); this.send(p.id, { k: 'hear', g: hear, group: this.voiceGroup(p) }); }
  }
  // immediate push of views and voice gains after a decisive change (death, meeting, end of game)
  flush() { this.players.forEach(p => { if (!p.bot && p.conn) { this.pushView(p); this.pushHear(p); } }); }
  broadcast(now) {
    this.players.forEach(p => {
      if (p.bot || !p.conn) return;
      if (this.tickN % 2 === 0) { this.pushView(p); this.pushHear(p); }
      this.send(p.id, this.snapshotFor(p, now));
    });
  }
}

export { COLORS, ROLES, GAMES, taskDef };
// the judge's verdict unlocks once this share of its tasks is done (role settings of the game)
export function judgeLocked(p, s) {
  const total = p.tasks?.length || 0;
  return total > 0 && p.tasks.filter(t => t.done).length * 100 < s.taskUnlock * total;
}
