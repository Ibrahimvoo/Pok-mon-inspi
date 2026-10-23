// Friends without a server (GitHub Pages, the home-screen app): the consoles that are online meet in a public
// directory over the free PeerJS broker, and talk to each other directly (WebRTC data channels) for friend requests,
// invitations and the room code of a friend's group. The friend list itself is kept on the device, per profile.
//
// The directory is held by one of the consoles: the first one online takes the well-known id, the others register
// there and receive the list of online players. If that console leaves (or iOS suspends it), the others notice the
// silence and one of them takes the id over. Room codes are never published in the directory: a friend asks for it
// directly, and only friends get an answer.
import { Peer } from 'peerjs';
import { session } from './session.js';
import { AVATARS } from './avatars.js';
import { lifecycle } from './input.js';
import { peerOptions } from './p2p.js';

const DIR = 'ps5ux-annuaire-v1';
const PID = 'ps5ux-joueur-';
const PING = 4000, STALE = 13000, REFRESH = 8000, FORGET = 22000;
const events = new EventTarget();
const emit = (t, d) => events.dispatchEvent(new CustomEvent(t, { detail: d }));
const str = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const clean = u => u && typeof u === 'object' && typeof u.id === 'string' && u.id
  ? { id: str(u.id, 64), psn: str(u.psn, 16) || 'Joueur', avatar: AVATARS.includes(u.avatar) ? u.avatar : AVATARS[0] } : null;

// ---------------------------------------------------------------- local storage (per profile)
const KEY = id => `ps5ux.friends.${id}`;
function load(id) {
  try {
    const v = JSON.parse(localStorage.getItem(KEY(id))) || {};
    const list = k => (Array.isArray(v[k]) ? v[k].map(x => x && clean(x) && { ...clean(x), since: +x.since || Date.now(), lastSeen: +x.lastSeen || 0 }).filter(Boolean) : []);
    return { friends: list('friends'), incoming: list('incoming'), outgoing: list('outgoing'), outbox: v.outbox && typeof v.outbox === 'object' ? v.outbox : {} };
  } catch { return { friends: [], incoming: [], outgoing: [], outbox: {} }; }
}
function save() {
  if (!me) return;
  try { localStorage.setItem(KEY(me.id), JSON.stringify(db)); } catch { /* private mode: the list lives until the page closes */ }
}

let me = null, db = load(''), peer = null, dirPeer = null, dirConn = null, status = 'offline';
let players = new Map();          // id → { id, psn, avatar, pid, activity, game, party, size }
let presence = { activity: 'home', game: null, party: false, size: 0 };
let lastPing = 0, watchdog = 0, refreshTimer = 0, retryTimer = 0, rid = 0, gen = 0, fails = 0;
const asks = new Map();
const setStatus = s => { if (s !== status) { status = s; emit('status', s); } };
const self = () => ({ ...me, pid: peer?.id, ...presence });
const rel = id => db.friends.some(f => f.id === id) ? 'friend' : db.incoming.some(f => f.id === id) ? 'incoming' : db.outgoing.some(f => f.id === id) ? 'outgoing' : null;

// ---------------------------------------------------------------- directory (held by one console)
const dir = { conns: new Map(), seen: new Map(), timer: 0 };
function dirBroadcast() {
  const now = Date.now();
  for (const [pid, at] of dir.seen) if (now - at > FORGET) { dir.seen.delete(pid); dir.conns.get(pid)?.close(); dir.conns.delete(pid); }
  const list = [...dir.conns.values()].filter(c => c.open && c.player).map(c => c.player);
  for (const c of dir.conns.values()) if (c.open) c.send({ t: 'list', players: list });
}
function holdDirectory() {
  return new Promise((resolve, reject) => {
    const p = new Peer(DIR, peerOptions());
    let open = false;
    p.once('open', () => { open = true; dirPeer = p; resolve(); });
    p.once('error', e => { if (!open) { p.destroy(); reject(e); } });
    p.on('connection', c => {
      c.on('data', m => {
        if (!m || typeof m !== 'object') return;
        dir.seen.set(c.peer, Date.now());
        if (m.t === 'here') {
          const u = clean(m.u);
          if (!u) return;
          c.player = { ...u, pid: c.peer, activity: ['home', 'game', 'app', 'store'].includes(m.u.activity) ? m.u.activity : 'home', game: str(m.u.game, 40) || null, party: !!m.u.party, size: Math.min(8, +m.u.size || 0) };
          const old = dir.conns.get(c.peer);
          if (old && old !== c) old.close();
          dir.conns.set(c.peer, c);
          dirBroadcast();
        }
      });
      c.on('close', () => { if (dir.conns.get(c.peer) === c) { dir.conns.delete(c.peer); dir.seen.delete(c.peer); dirBroadcast(); } });
    });
    // the broker dropped us (network, iOS background): take the id back, or give the directory up if someone else has it
    p.on('disconnected', () => { if (dirPeer === p && !p.destroyed) setTimeout(() => { try { p.reconnect(); } catch { dropDirectory(); } }, 1000); });
    p.on('error', e => { if (dirPeer === p && (e?.type === 'unavailable-id' || e?.type === 'server-error')) dropDirectory(); });
    clearInterval(dir.timer);
    dir.timer = setInterval(() => { for (const c of dir.conns.values()) if (c.open) c.send({ t: 'ping' }); dirBroadcast(); }, PING);
  });
}
function dropDirectory() {
  clearInterval(dir.timer);
  dir.conns.forEach(c => c.close()); dir.conns.clear(); dir.seen.clear();
  try { dirPeer?.destroy(); } catch { /* ignore */ }
  dirPeer = null;
}

// ---------------------------------------------------------------- my own peer and the link to the directory
function openPeer(id) {
  return new Promise((resolve, reject) => {
    const p = new Peer(id, peerOptions());
    let open = false;
    p.once('open', () => { open = true; resolve(p); });
    p.once('error', e => { if (!open) { p.destroy(); reject(e); } });
  });
}
async function connectDirectory(g) {
  if (g !== gen || !peer || peer.destroyed) return;
  clearTimeout(retryTimer);
  setStatus(players.size ? 'reconnecting' : 'connecting');
  if (peer.disconnected) { try { peer.reconnect(); } catch { /* destroyed */ } }
  const c = peer.connect(DIR, { reliable: true });
  let opened = false;
  const fail = async () => {
    if (opened || g !== gen) return;
    try { c.close(); } catch { /* ignore */ }
    // nobody holds the directory: take it (after a random delay, so two consoles rarely race), then join it
    if (!dirPeer && !document.hidden) {
      await new Promise(r => setTimeout(r, Math.random() * 1200));
      if (g !== gen) return;
      try { await holdDirectory(); } catch { /* someone else was faster */ }
    }
    retryTimer = setTimeout(() => connectDirectory(g), dirPeer ? 100 : 1500 + Math.random() * 1500);
  };
  const timer = setTimeout(fail, 7000);
  const onErr = e => { if (e?.type === 'peer-unavailable' && String(e.message || '').includes(DIR)) { clearTimeout(timer); peer.off('error', onErr); fail(); } };
  peer.on('error', onErr);
  c.on('open', () => {
    opened = true; clearTimeout(timer); peer.off('error', onErr);
    if (g !== gen) { c.close(); return; }
    dirConn = c; lastPing = Date.now();
    c.send({ t: 'here', u: self() });
    setStatus('online');
  });
  c.on('data', m => {
    if (dirConn !== c || !m || typeof m !== 'object') return;
    lastPing = Date.now();
    if (m.t === 'list' && Array.isArray(m.players)) setPlayers(m.players);
  });
  c.on('close', () => { if (dirConn === c) { dirConn = null; lost(g); } });
  c.on('error', () => { if (!opened) { clearTimeout(timer); fail(); } });
}
function lost(g) {
  if (g !== gen) return;
  setStatus('reconnecting');
  clearTimeout(retryTimer);
  retryTimer = setTimeout(() => connectDirectory(g), 600 + Math.random() * 1400);
}
function setPlayers(list) {
  const next = new Map();
  for (const x of list.slice(0, 200)) {
    const u = clean(x);
    if (!u || typeof x.pid !== 'string' || !x.pid.startsWith(PID)) continue;
    next.set(u.id, { ...u, pid: x.pid, activity: x.activity || 'home', game: x.game || null, party: !!x.party, size: +x.size || 0 });
  }
  const before = players;
  // the directory repeats the list every few seconds: only a real change is passed on (no needless redraws)
  const sig = m => JSON.stringify([...m.values()]);
  if (sig(next) === sig(before)) return;
  players = next;
  let changed = false;
  for (const f of [...db.friends, ...db.incoming, ...db.outgoing]) {
    const p = next.get(f.id);
    if (p) {
      if (f.psn !== p.psn || f.avatar !== p.avatar) { f.psn = p.psn; f.avatar = p.avatar; changed = true; }
      f.lastSeen = Date.now();
      if (!before.has(f.id)) { changed = true; if (rel(f.id) === 'friend' && before.size) emit('online', f); }
    } else if (before.has(f.id)) { f.lastSeen = Date.now(); changed = true; }
  }
  if (changed) save();
  flush();
  emit('players');
}

// ---------------------------------------------------------------- direct messages between consoles
const links = new Map();   // pid → { conn, ready: Promise, idle }
function link(pid) {
  let l = links.get(pid);
  if (l && !l.conn.open && l.done) { links.delete(pid); l = null; }
  if (l) { clearTimeout(l.idle); l.idle = setTimeout(() => { l.conn.close(); links.delete(pid); }, 30000); return l.ready; }
  const conn = peer.connect(pid, { reliable: true });
  l = { conn, idle: 0, done: false };
  l.ready = new Promise((resolve, reject) => {
    const t = setTimeout(() => { l.done = true; links.delete(pid); conn.close(); reject(new Error('Ce joueur ne répond pas.')); }, 9000);
    conn.on('open', () => { clearTimeout(t); l.done = true; resolve(conn); });
    conn.on('error', () => { clearTimeout(t); l.done = true; links.delete(pid); reject(new Error('Ce joueur ne répond pas.')); });
  });
  conn.on('data', m => onDirect(conn, m));
  conn.on('close', () => { if (links.get(pid) === l) links.delete(pid); });
  l.ready.catch(() => {});
  l.idle = setTimeout(() => { conn.close(); links.delete(pid); }, 30000);
  links.set(pid, l);
  return l.ready;
}
async function direct(id, msg) {
  const p = players.get(id);
  if (!p || !peer) throw new Error('Ce joueur n’est plus en ligne.');
  const c = await link(p.pid);
  c.send({ ...msg, u: { id: me.id, psn: me.psn, avatar: me.avatar } });
}
// messages for a player who is offline wait on the device and leave as soon as they come online
function post(id, msg) {
  if (players.has(id)) return direct(id, msg).catch(() => queue(id, msg));
  queue(id, msg);
}
function queue(id, msg) {
  const box = (db.outbox[id] ||= []).filter(m => m.t !== msg.t && !(msg.t === 'frem' && (m.t === 'freq' || m.t === 'facc')));
  box.push(msg);
  db.outbox[id] = box.slice(-4);
  save();
}
function flush() {
  for (const id of Object.keys(db.outbox)) {
    if (!players.has(id)) continue;
    const box = db.outbox[id];
    delete db.outbox[id];
    save();
    for (const m of box) direct(id, m).catch(() => queue(id, m));
  }
}
function ask(id, msg) {
  const n = ++rid;
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => { asks.delete(n); reject(new Error('Ce joueur ne répond pas.')); }, 8000);
    asks.set(n, { resolve, reject, t });
    direct(id, { ...msg, rid: n }).catch(e => { clearTimeout(t); asks.delete(n); reject(e); });
  });
}
function onDirect(conn, m) {
  if (!m || typeof m !== 'object' || typeof m.t !== 'string') return;
  const u = clean(m.u);
  if (!u || u.id === me?.id) return;
  // the sender must be the player the directory knows under this id (when it knows them)
  const known = players.get(u.id);
  if (known && known.pid !== conn.peer) return;
  const reply = r => { try { conn.send({ ...r, u: { id: me.id, psn: me.psn, avatar: me.avatar } }); } catch { /* closed */ } };
  switch (m.t) {
    case 'freq': {
      const r = rel(u.id);
      if (r === 'friend') { reply({ t: 'facc' }); return; }
      if (r === 'outgoing') { accept(u); return; }       // both asked at the same time: friends
      if (r === 'incoming') return;
      db.incoming.push({ ...u, since: Date.now(), lastSeen: Date.now() });
      save(); emit('request', u); emit('change');
      return;
    }
    case 'facc': {
      if (rel(u.id) === 'friend') return;
      if (rel(u.id) !== 'outgoing') return;               // never asked: ignore
      db.outgoing = db.outgoing.filter(f => f.id !== u.id);
      db.friends.push({ ...u, since: Date.now(), lastSeen: Date.now() });
      save(); emit('accepted', u); emit('change');
      return;
    }
    case 'fdec': case 'frem': {
      const r = rel(u.id);
      if (!r) return;
      db.friends = db.friends.filter(f => f.id !== u.id); db.incoming = db.incoming.filter(f => f.id !== u.id); db.outgoing = db.outgoing.filter(f => f.id !== u.id);
      save(); emit('change');
      return;
    }
    case 'inv': {
      const code = str(m.code, 6).toUpperCase();
      if (!/^[A-Z0-9]{6}$/.test(code)) return;
      emit('invite', { kind: m.kind === 'call' ? 'call' : 'party', from: u, party: { id: code, game: m.game && typeof m.game === 'string' ? { id: str(m.game, 40) } : null, size: Math.max(1, Math.min(8, +m.size || 1)) } });
      return;
    }
    case 'idecl': emit('declined', { by: u, kind: m.kind === 'call' ? 'call' : 'party' }); return;
    // a friend wants to join my group: only friends get the room code
    case 'where': reply({ t: 'here', rid: m.rid, code: rel(u.id) === 'friend' ? pfriends.roomCode?.() || null : null }); return;
    case 'here': {
      const a = asks.get(m.rid);
      if (!a) return;
      asks.delete(m.rid); clearTimeout(a.t);
      m.code ? a.resolve(String(m.code)) : a.reject(new Error('Votre ami n’est plus dans un groupe ouvert.'));
    }
  }
}
function accept(u) {
  db.incoming = db.incoming.filter(f => f.id !== u.id);
  db.outgoing = db.outgoing.filter(f => f.id !== u.id);
  if (!db.friends.some(f => f.id === u.id)) db.friends.push({ ...u, since: Date.now(), lastSeen: players.has(u.id) ? Date.now() : 0 });
  save();
  post(u.id, { t: 'facc' });
  emit('change');
}

// ---------------------------------------------------------------- lifecycle
async function start() {
  const g = ++gen;
  setStatus('connecting');
  // a second tab of the same profile gets its own address; the directory tells the others which one to use
  for (let i = 0; i < 3 && g === gen; i++) {
    try { const p = await openPeer(PID + me.id + (i ? '-' + Math.random().toString(36).slice(2, 6) : '')); if (g !== gen) { p.destroy(); return; } peer = p; break; }
    catch (e) {
      if (g !== gen) return;
      if (e?.type !== 'unavailable-id') { setStatus('offline'); retryTimer = setTimeout(() => { if (g === gen) start(); }, Math.min(60000, 5000 * 2 ** fails++)); return; }
    }
  }
  if (!peer) { setStatus('offline'); return; }
  fails = 0;
  peer.on('connection', c => c.on('data', m => onDirect(c, m)));
  peer.on('disconnected', () => { if (g === gen && peer && !peer.destroyed) setTimeout(() => { try { if (g === gen) peer.reconnect(); } catch { /* destroyed */ } }, 1500); });
  clearInterval(watchdog);
  // the directory pings every few seconds: silence means its console is gone (closed, or suspended by iOS)
  watchdog = setInterval(() => {
    if (g !== gen || !dirConn) return;
    if (Date.now() - lastPing > STALE) { const c = dirConn; dirConn = null; c.close(); lost(g); }
  }, 2000);
  clearInterval(refreshTimer);
  refreshTimer = setInterval(() => { if (dirConn?.open) dirConn.send({ t: 'here', u: self() }); }, REFRESH);
  connectDirectory(g);
}
function stop() {
  gen++;
  clearTimeout(retryTimer); clearInterval(watchdog); clearInterval(refreshTimer);
  links.forEach(l => l.conn.close()); links.clear();
  asks.forEach(a => { clearTimeout(a.t); a.reject(new Error('Déconnecté.')); }); asks.clear();
  try { dirConn?.close(); } catch { /* ignore */ }
  dirConn = null;
  dropDirectory();
  try { peer?.destroy(); } catch { /* ignore */ }
  peer = null; players = new Map();
  setStatus('offline');
  emit('players');
}
// iOS freezes everything in the background: on return, check the link at once instead of waiting for the watchdog
lifecycle.addEventListener('resume', () => {
  if (!me) return;
  if (!peer || peer.destroyed) { start(); return; }
  if (peer.disconnected) { try { peer.reconnect(); } catch { /* destroyed */ } }
  if (!dirConn?.open || Date.now() - lastPing > STALE) { const c = dirConn; dirConn = null; c?.close(); lost(gen); }
  else dirConn.send({ t: 'here', u: self() });
});
// a console leaving the screen (app switch, locked phone: iOS then freezes it) hands the directory over at once,
// instead of leaving the others without a directory until the broker notices it is gone
document.addEventListener('visibilitychange', () => { if (document.hidden && dirPeer) dropDirectory(); });
addEventListener('online', () => { if (!me) return; if (!peer || peer.destroyed) { fails = 0; start(); } else if (!dirConn) lost(gen); });

export const pfriends = {
  get enabled() { return !!me; },
  get status() { return status; },
  get friends() { return db.friends; },
  get incoming() { return db.incoming; },
  get outgoing() { return db.outgoing; },
  // online players, without me
  players() { return [...players.values()].filter(p => p.id !== me?.id); },
  online(id) { return players.has(id); },
  presenceOf(id) {
    const p = players.get(id);
    if (!p) return { id, online: false };
    return { id, online: true, activity: p.activity, game: p.game, partyId: p.party ? 'f:' + id : null, partySize: p.size, joinable: p.party };
  },
  on(type, fn) { const h = e => fn(e.detail); events.addEventListener(type, h); return () => events.removeEventListener(type, h); },
  roomCode: null,           // set by social: () => the code of my current room, if any
  // follow the console's profile: friends belong to the local profile signed in
  use(user) {
    const id = user && !user.online ? user.id : null;
    if (id === me?.id) { if (me && user) { me.psn = user.psn; me.avatar = user.avatar; } return; }
    stop();
    me = id ? { id, psn: str(user.psn, 16), avatar: AVATARS.includes(user.avatar) ? user.avatar : AVATARS[0] } : null;
    db = load(id || '');
    emit('change');
    if (me) start();
  },
  setPresence(p) {
    presence = { ...presence, ...p };
    if (dirConn?.open) dirConn.send({ t: 'here', u: self() });
  },
  search(q) {
    const k = str(q, 16).toLowerCase();
    return this.players().filter(p => p.psn.toLowerCase().includes(k)).sort((a, b) => a.psn.localeCompare(b.psn)).slice(0, 20);
  },
  async request(u) {
    u = clean(u);
    if (!u) throw new Error('Joueur introuvable.');
    if (u.id === me?.id) throw new Error('Vous ne pouvez pas vous ajouter vous-même.');
    const r = rel(u.id);
    if (r === 'friend') throw new Error('Vous êtes déjà amis.');
    if (r === 'outgoing') throw new Error('Demande déjà envoyée.');
    if (r === 'incoming') { accept(u); return { accepted: true }; }
    if (!players.has(u.id)) throw new Error('Ce joueur n’est plus en ligne.');
    await direct(u.id, { t: 'freq' });
    db.outgoing.push({ ...u, since: Date.now(), lastSeen: Date.now() });
    save(); emit('change');
    return { accepted: false };
  },
  respond(id, yes) {
    const u = db.incoming.find(f => f.id === id);
    if (!u) throw new Error('Demande introuvable.');
    if (yes) { accept(u); return; }
    db.incoming = db.incoming.filter(f => f.id !== id);
    save(); post(id, { t: 'fdec' }); emit('change');
  },
  remove(id) {
    if (!rel(id)) throw new Error('Ce joueur ne fait pas partie de vos amis.');
    db.friends = db.friends.filter(f => f.id !== id); db.incoming = db.incoming.filter(f => f.id !== id); db.outgoing = db.outgoing.filter(f => f.id !== id);
    save(); post(id, { t: 'frem' }); emit('change');
  },
  invite(id, { code, kind = 'party', game = null, size = 1 }) {
    if (!players.has(id)) return Promise.reject(new Error('Ce joueur est hors ligne.'));
    return direct(id, { t: 'inv', code, kind, game, size });
  },
  decline(id, kind) { if (players.has(id)) direct(id, { t: 'idecl', kind }).catch(() => {}); },
  // the room code of a friend's group (asked to the friend, who only answers its friends)
  where(id) { return ask(id, { t: 'where' }); },
};
// automated tests
if (/[?&]pfdebug/.test(location.search)) window.__friends = { pfriends, get dirHolder() { return !!dirPeer; }, get peer() { return peer; } };
