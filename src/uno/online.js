// UNO with friends, inside the console's group: a peer-to-peer salon joined with a 6-character code (or a server
// party). The console that opens the room hosts the game: it keeps the lobby (4 seats, house rules, lock), runs the
// rules (match.js) and sends each player only their own view. Messages travel as 'gm' through the group's channel.
import { net } from '../net.js';
import { social } from '../social.js';
import { p2p } from '../p2p.js';
import { session as account } from '../session.js';
import { Match } from './match.js';
import { BOT_NAMES } from './cards.js';
import { DEFAULT_RULES, COLORS } from './rules.js';

export const ID = 'uno';
export const SEATS = 4;
export const COUNTDOWN = 5000;
export const INFO_MS = 4200;
const myId = () => account.current?.id || 'me';
const myName = () => account.current?.psn || 'Joueur';
const send = (d, to) => net.send('gm', to ? { d, to } : { d });
const members = () => social.party?.members || [];
const member = id => members().find(m => m.id === id);
export const hostOf = () => { const p = social.party; return p?.game?.id === ID ? p.game.by : null; };
const str = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const RULE_KEYS = ['stack', 'sevenO', 'jumpIn', 'force', 'noBluff', 'drawMatch'];
const TARGETS = [500, 300, 200, 100, 0];
export const cleanRules = r => ({ ...Object.fromEntries(RULE_KEYS.map(k => [k, !!r?.[k]])), target: TARGETS.includes(+r?.target) ? +r.target : 500 });
function cleanAction(a) {
  if (!a || typeof a !== 'object') return null;
  const t = ['play', 'draw', 'keep', 'color', 'challenge', 'uno', 'catch'].includes(a.t) ? a.t : null;
  if (!t) return null;
  const o = { t };
  if (a.card != null) o.card = Math.round(+a.card);
  if (COLORS.includes(a.color)) o.color = a.color;
  if (a.target != null) o.target = Math.round(+a.target);
  if (a.yes != null) o.yes = !!a.yes;
  return o;
}
const cleanSeat = x => (x ? { id: str(x.id, 64), name: str(x.name, 16) || 'Joueur', bot: !!x.bot, ai: Math.max(0, Math.min(3, +x.ai || 0)), online: x.online !== false } : null);

let S = null;
const watchers = new Set();
const notify = () => watchers.forEach(f => { try { f(); } catch { /* closed panel */ } });
let lastAd = null;     // last lobby advert of another console's room in our group

// ---------------------------------------------------------------- messages
net.on('gm', m => {
  const d = m?.d, from = m?.from;
  if (!d || typeof d.k !== 'string' || !d.k.startsWith('u.') || !from || from === myId() || !member(from)) return;
  if (d.k === 'u.lobby' && from === hostOf()) { lastAd = { from, ...d, at: Date.now() }; notify(); }
  if (!S) return;
  if (S.host) hostHandle(from, d);
  else if (from === S.hostId) guestHandle(d);
});
social.on('party', () => {
  if (!S) { notify(); return; }
  if (S.host) {
    let changed = false;
    S.seats.forEach((x, k) => {
      if (!x || x.bot || x.id === myId()) return;
      const m = member(x.id);
      if (S.phase === 'lobby' || S.phase === 'count') { if (!m) { S.seats[k] = null; changed = true; } }
      else if (S.match) { const i = S.match.seats.findIndex(y => y.id === x.id); if (i >= 0) S.match.setOnline(i, !!m && m.online !== false); }
    });
    if (changed) { if (S.phase === 'count' && filled() < 2) cancelCount(); pushLobby(); }
  } else if (!social.party || !member(S.hostId)) closed('L’hôte a quitté la partie');
  notify();
});
net.on('status', st => {
  if (st !== 'online' || !S || S.host) return;
  if (S.gid) send({ k: 'u.sync', gid: S.gid }, S.hostId); else send({ k: 'u.hi', name: myName() }, S.hostId);
});

// ---------------------------------------------------------------- host
const filled = () => S.seats.filter(Boolean).length;
function lobbyMsg() {
  return { k: 'u.lobby', seats: S.seats, rules: S.rules, locked: S.locked, phase: S.phase === 'count' ? 'count' : S.phase === 'lobby' ? 'lobby' : 'match', count: S.phase === 'count' ? Math.max(0, S.countAt - Date.now()) : 0, code: p2p.active ? p2p.code : null, host: myName() };
}
function pushLobby() {
  if (!S?.host) return;
  S.ui?.lobby?.(view());
  if (social.party && !S.solo) send(lobbyMsg());
}
function hostHandle(from, d) {
  if (d.k === 'u.hi') {
    const m = member(from);
    if (S.phase === 'lobby' || S.phase === 'count') {
      if (S.seats.some(x => x?.id === from)) { pushLobby(); return; }
      if (S.locked) { send({ k: 'u.refused', why: 'Le salon est verrouillé par l’hôte.' }, from); return; }
      let k = S.seats.indexOf(null);
      if (k < 0) k = S.seats.map((x, i) => (x?.bot ? i : -1)).filter(i => i >= 0).pop() ?? -1;   // a friend takes a computer's seat
      if (k < 0) { send({ k: 'u.refused', why: 'La partie est complète (4 joueurs).' }, from); return; }
      S.seats[k] = { id: from, name: str(m?.psn || d.name, 16) || 'Joueur', bot: false, ai: 0, online: true };
      S.ui?.joined?.(S.seats[k]);
      pushLobby();
      return;
    }
    const i = S.match?.seats.findIndex(x => x.id === from) ?? -1;
    if (i >= 0) { send({ k: 'u.start', gid: S.match.gid, seats: S.match.seats, rules: S.match.state.rules, info: 0 }, from); S.match.setOnline(i, true); S.match.resync(i); }
    else send({ k: 'u.busy' }, from);
    return;
  }
  if (d.k === 'u.bye') {
    const k = S.seats.findIndex(x => x?.id === from);
    if (k >= 0 && (S.phase === 'lobby' || S.phase === 'count')) { S.seats[k] = null; if (S.phase === 'count' && filled() < 2) cancelCount(); pushLobby(); }
    const i = S.match?.seats.findIndex(x => x.id === from) ?? -1;
    if (i >= 0) S.match.setOnline(i, false);
    return;
  }
  if (!S.match || d.gid !== S.match.gid) return;
  const i = S.match.seats.findIndex(x => x.id === from);
  if (i < 0) return;
  if (d.k === 'u.sync') { S.match.setOnline(i, true); S.match.resync(i); return; }
  if (d.k === 'u.act') {
    const a = cleanAction(d.a);
    const err = a ? S.match.submit(i, a) : 'Action inconnue.';
    if (err) { send({ k: 'u.err', msg: err }, from); S.match.resync(i); }
  }
}
function cancelCount() { clearTimeout(S.countT); S.phase = 'lobby'; S.ui?.lobby?.(view()); }

// ---------------------------------------------------------------- guest
function guestHandle(d) {
  if (d.k === 'u.lobby') {
    if (!Array.isArray(d.seats)) return;
    S.lobby = { seats: d.seats.slice(0, SEATS).map(cleanSeat), rules: cleanRules(d.rules), locked: !!d.locked, phase: d.phase, count: Math.max(0, Math.min(COUNTDOWN, +d.count || 0)), code: str(d.code, 6) || null, host: str(d.host, 16) };
    if (d.phase !== 'match' && S.phase !== 'lobby') { S.phase = 'lobby'; S.gid = null; }
    S.refused = '';
    if (S.phase === 'lobby') S.ui?.lobby?.(view());
    return;
  }
  if (d.k === 'u.refused') { S.refused = str(d.why, 80); closed(S.refused); return; }
  if (d.k === 'u.busy') { S.refused = 'Une partie est en cours : tu pourras rejoindre la suivante.'; S.ui?.lobby?.(view()); return; }
  if (d.k === 'u.close') { closed('L’hôte a fermé la partie'); return; }
  if (d.k === 'u.err') { S.ui?.err?.(str(d.msg, 120)); return; }
  if (d.k === 'u.start') {
    const seats = Array.isArray(d.seats) ? d.seats.slice(0, SEATS).map(cleanSeat).filter(Boolean) : [];
    if (!seats.some(x => x.id === myId()) || seats.length < 2) return;
    S.gid = str(d.gid, 16); S.phase = 'match';
    S.ui?.start?.({ seats, rules: cleanRules(d.rules), info: d.info !== 0 });
    return;
  }
  if (d.k === 'u.st' && d.gid === S.gid && d.view && typeof d.view === 'object') S.ui?.state?.(d.view, Array.isArray(d.ev) ? d.ev : []);
}
function closed(why) {
  if (!S || S.host) return;
  const ui = S.ui;
  clearInterval(S.knock);
  S = null;
  notify();
  ui?.closed?.(why);
}

// what the lobby screen shows
function view() {
  if (!S) return null;
  if (S.host) return { host: true, seats: S.seats, rules: S.rules, locked: S.locked, phase: S.phase, count: S.phase === 'count' ? Math.max(0, S.countAt - Date.now()) : 0, code: p2p.active ? p2p.code : null, party: !!social.party, solo: S.solo };
  const L = S.lobby;
  return { host: false, seats: L?.seats || [], rules: L?.rules || cleanRules(DEFAULT_RULES), locked: !!L?.locked, phase: L?.phase || 'wait', count: L?.count || 0, code: L?.code, hostName: L?.host || member(S.hostId)?.psn || 'l’hôte', refused: S.refused || '', party: true };
}

export const online = {
  get session() { return S; },
  get isHost() { return !!S?.host; },
  view,
  watch(fn) { watchers.add(fn); return () => watchers.delete(fn); },
  // an open room of another console in our group
  advert() {
    const by = hostOf();
    if (!by || by === myId() || !member(by)) return null;
    const a = lastAd && lastAd.from === by && Date.now() - lastAd.at < 12000 ? lastAd : null;
    return { host: by, name: member(by)?.psn || a?.host || 'Un ami', count: a ? a.seats.filter(Boolean).length : null, phase: a?.phase || null };
  },
  // open a room: solo (computer players only) or with friends (salon created when needed)
  async host(ui, { solo = false } = {}) {
    if (S && !S.host) this.leave();
    if (!S) S = { host: true, seats: Array(SEATS).fill(null), rules: cleanRules(DEFAULT_RULES), locked: false, phase: 'lobby', solo };
    S.ui = ui; S.solo = solo; S.phase = 'lobby'; S.match?.close(); S.match = null;
    S.seats[0] = { id: myId(), name: myName(), bot: false, ai: 0, online: true };
    if (solo) { for (let k = 1; k < SEATS; k++) if (!S.seats[k] || !S.seats[k].bot) S.seats[k] = { id: 'bot-' + k, name: BOT_NAMES[k - 1], bot: true, ai: k - 1, online: true }; }
    else {
      for (let k = 1; k < SEATS; k++) if (S.seats[k] && !S.seats[k].bot && !member(S.seats[k].id)) S.seats[k] = null;
      if (!social.party) await p2p.create();
      if (social.party && hostOf() !== myId()) social.startGame(ID);
    }
    clearInterval(S.adTimer);
    S.adTimer = setInterval(() => { if (S?.host && social.party && !S.solo) send(lobbyMsg()); }, 2500);
    pushLobby();
    return view();
  },
  toggleSeat(k) {
    if (!S?.host || S.phase !== 'lobby' || k <= 0 || k >= SEATS) return;
    const x = S.seats[k];
    if (!x) { const used = new Set(S.seats.filter(y => y?.bot).map(y => y.ai)); const ai = [0, 1, 2, 3].find(a => !used.has(a)); S.seats[k] = { id: 'bot-' + k, name: BOT_NAMES[ai], bot: true, ai, online: true }; }
    else if (x.bot) S.seats[k] = null;
    else return;
    pushLobby();
  },
  setRule(key, val) { if (!S?.host || S.phase !== 'lobby') return; S.rules = cleanRules({ ...S.rules, [key]: val }); pushLobby(); },
  cycleTarget() { if (!S?.host || S.phase !== 'lobby') return; const i = TARGETS.indexOf(S.rules.target); this.setRule('target', TARGETS[(i + 1) % TARGETS.length]); },
  toggleLock() { if (!S?.host || S.phase !== 'lobby') return; S.locked = !S.locked; pushLobby(); },
  // countdown, then everyone goes to the info screen and the host deals
  start() {
    if (!S?.host || S.phase !== 'lobby' || filled() < 2) return false;
    S.phase = 'count'; S.countAt = Date.now() + COUNTDOWN;
    pushLobby();
    S.countT = setTimeout(() => this.launch(), COUNTDOWN);
    return true;
  },
  launch() {
    if (!S?.host || S.phase !== 'count') return;
    if (filled() < 2) { cancelCount(); return; }
    const seats = S.seats.filter(Boolean).map(x => ({ ...x }));
    const s = S;
    s.phase = 'match';
    const match = new Match({
      seats, rules: s.rules, local: 0,
      onLocal: (v, ev) => s.ui?.state?.(v, ev),
      send: (i, msg) => send({ k: 'u.st', gid: match.gid, view: msg.view, ev: msg.ev }, match.seats[i].id),
    });
    s.match = match;
    match.seats.forEach(x => { if (!x.bot && x.id !== myId()) { const m = member(x.id); x.online = !!m && m.online !== false; } });
    if (social.party && !s.solo) { send(lobbyMsg()); match.seats.forEach(x => { if (!x.bot && x.id !== myId()) send({ k: 'u.start', gid: match.gid, seats: match.seats, rules: match.state.rules }, x.id); }); }
    s.ui?.start?.({ seats: match.seats, rules: match.state.rules, info: true });
    setTimeout(() => { if (S === s && s.match === match && !match.closed) match.start(); }, INFO_MS);
  },
  submit(a) {
    if (!S) return 'Aucune partie.';
    if (S.host) return S.match ? S.match.submit(0, a) : 'Aucune partie.';
    if (!S.gid) return 'Aucune partie.';
    if (!net.send('gm', { d: { k: 'u.act', gid: S.gid, a }, to: S.hostId })) return 'Connexion à l’hôte perdue, reconnexion…';
    return null;
  },
  // back to the lobby with the same players (host), or wait there for the host (guest)
  toLobby(ui) {
    if (!S) return;
    S.ui = ui || S.ui;
    if (S.host) { S.match?.close(); S.match = null; this.host(S.ui, { solo: S.solo }); }
    else { S.phase = 'lobby'; S.gid = null; S.ui?.lobby?.(view()); }
  },
  pause() { if (S?.host && S.solo) S.match?.pause(); },
  resume() { if (S?.host && S.solo) S.match?.resume(); },
  join(ui, hostId) {
    if (!hostId || hostId === myId() || !member(hostId)) return false;
    this.leave();
    S = { host: false, hostId, ui, phase: 'lobby', lobby: null, gid: null, refused: '' };
    const knock = () => { if (S?.hostId === hostId && !S.host && (!S.lobby || !S.lobby.seats.some(x => x?.id === myId())) && S.phase === 'lobby') send({ k: 'u.hi', name: myName() }, hostId); };
    knock();
    S.knock = setInterval(knock, 2000);
    ui?.lobby?.(view());
    return true;
  },
  async joinCode(code) {
    code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length !== 6) throw new Error('Le code contient 6 caractères.');
    if (p2p.active && p2p.code === code) return;
    if (social.party) throw new Error('Quitte d’abord ton groupe actuel (Base de jeu) pour rejoindre ce salon.');
    await p2p.join(code);
  },
  code: () => (p2p.active ? p2p.code : null),
  share() { social.shareSalon(); },
  leave() {
    if (!S) return;
    const s = S;
    S = null;
    clearInterval(s.adTimer); clearInterval(s.knock); clearTimeout(s.countT);
    s.match?.close();
    if (social.party) {
      if (s.host && !s.solo) { send({ k: 'u.close' }); if (hostOf() === myId()) social.stopGame(); }
      else if (!s.host) send({ k: 'u.bye' }, s.hostId);
    }
    notify();
  },
};
