// Rooms without a server: players connect directly (WebRTC) after meeting through the free PeerJS broker.
// The host's browser plays the role of the realtime server for its room (party roster, chat, game, voice signalling).
import { Peer } from 'peerjs';
import { net } from './net.js';
import { session } from './session.js';
import { AVATARS } from './avatars.js';
import { navExtras, saveNav } from './shell.js';

const PREFIX = 'ps5ux-salon-';
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const GRACE = 15000;
const emit = (t, d) => net.inject(t, d);
const nonce = () => Math.random().toString(16).slice(2, 14);
// tests can point to a local PeerJS server with ?peerhost=host:port
const peerOptions = () => {
  const o = new URLSearchParams(location.search).get('peerhost');
  if (!o) return { debug: 0 };
  const [host, port] = o.split(':');
  return { debug: 0, host, port: +port, path: '/', secure: false };
};
const errText = e => ({
  'peer-unavailable': 'Aucun salon ouvert avec ce code. Vérifiez le code ou demandez à votre ami de recréer le salon.',
  'unavailable-id': 'Ce code est déjà utilisé, réessayez.',
  network: 'Connexion au service de mise en relation impossible. Vérifiez votre connexion Internet.',
  'server-error': 'Le service de mise en relation ne répond pas. Réessayez dans un instant.',
  'browser-incompatible': 'Ce navigateur ne permet pas le jeu en ligne direct.',
}[e?.type] || 'La connexion au salon a échoué.');

let peer = null, hostConn = null, rid = 0, retryTimer = 0;
const pending = new Map();
const room = { members: new Map(), chat: [], game: null };   // host only

function me() { const u = session.current; return { id: u.id, psn: u.psn, avatar: AVATARS.includes(u.avatar) ? u.avatar : AVATARS[0] }; }

// ---------------------------------------------------------------- host side
function view() {
  return { id: p2p.code, host: me().id, open: true, game: room.game, createdAt: 0, salon: true,
    members: [...room.members.values()].map(({ conn, timer, ...m }) => m), chat: room.chat.slice(-30) };
}
function sendTo(id, msg) {
  if (id === me().id) return emit(msg.t, msg);
  const m = room.members.get(id);
  if (m?.conn?.open) m.conn.send(msg);
}
function broadcast(msg, except) { room.members.forEach((_, id) => { if (id !== except) sendTo(id, msg); }); }
function pushRoom() { broadcast({ t: 'party', party: view() }); }

function hostHandle(fromId, m) {
  const u = room.members.get(fromId);
  if (!u) return;
  switch (m.t) {
    case 'ping': case 'presence': case 'party.create': return { ok: true };
    case 'party.invite': return { error: 'salon', message: 'Partagez le code du salon à votre ami.' };
    case 'chat': {
      const text = String(m.text || '').replace(/\s+/g, ' ').trim().slice(0, 200);
      if (!text) return;
      const msg = { from: fromId, psn: u.psn, text, at: Date.now() };
      room.chat.push(msg); if (room.chat.length > 60) room.chat.shift();
      broadcast({ t: 'chat', partyId: p2p.code, msg });
      return;
    }
    case 'voice': {
      const on = !!m.on;
      if (on && (!u.voice || m.renew)) u.vs = nonce();
      if (!on) u.vs = null;
      u.voice = on; u.muted = !!m.muted;
      pushRoom();
      return { ok: true, vs: u.vs };
    }
    case 'rtc': {
      const to = room.members.get(String(m.to || ''));
      if (u.voice && to?.voice && m.data) sendTo(to.id, { t: 'rtc', from: fromId, fromVs: u.vs, toVs: m.toVs, data: m.data });
      return;
    }
    case 'game.start': {
      if (!AVATARS.includes(m.game)) return { error: 'invalid', message: 'Jeu inconnu.' };
      room.game = { id: m.game, by: fromId, at: Date.now() };
      pushRoom();
      broadcast({ t: 'game.started', game: m.game, by: { id: u.id, psn: u.psn, avatar: u.avatar }, partyId: p2p.code }, fromId);
      return { ok: true };
    }
    case 'game.stop': room.game = null; pushRoom(); return;
    case 'g': {
      if (!room.game) return;
      const msg = { t: 'g', from: fromId, x: Math.min(1, Math.max(0, +m.x || 0)), y: Math.min(1, Math.max(0, +m.y || 0)), p: m.p ? 1 : 0 };
      broadcast(msg, fromId);
      return;
    }
    case 'party.leave': removeMember(fromId); return { ok: true };
  }
}
function removeMember(id) {
  const m = room.members.get(id);
  if (!m || id === me().id) return;
  clearTimeout(m.timer); m.conn?.close();
  room.members.delete(id);
  room.chat.push({ sys: true, text: `${m.psn} a quitté le salon`, at: Date.now() });
  pushRoom();
}
function acceptGuest(conn) {
  conn.on('data', raw => {
    const m = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!m || typeof m.t !== 'string') return;
    if (m.t === 'hello') {
      const u = m.user || {};
      const psn = String(u.psn || 'Invité').slice(0, 16), id = String(u.id || conn.peer).slice(0, 64);
      if (room.members.size >= 8 && !room.members.has(id)) { conn.send({ t: 'denied', message: 'Le salon est complet (8 joueurs).' }); return; }
      const prev = room.members.get(id);
      if (prev) { clearTimeout(prev.timer); prev.conn = conn; prev.online = true; }
      else {
        room.members.set(id, { id, psn, avatar: AVATARS.includes(u.avatar) ? u.avatar : AVATARS[0], muted: false, voice: false, vs: null, online: true, joinedAt: Date.now(), conn });
        room.chat.push({ sys: true, text: `${psn} a rejoint le salon`, at: Date.now() });
      }
      conn.memberId = id;
      pushRoom();
      return;
    }
    if (!conn.memberId) return;
    const res = hostHandle(conn.memberId, m);
    if (m.rid && res) conn.send({ t: 'res', rid: m.rid, ...res });
  });
  conn.on('close', () => {
    const m = room.members.get(conn.memberId);
    if (!m || m.conn !== conn) return;
    m.online = false; m.conn = null;
    pushRoom();
    m.timer = setTimeout(() => removeMember(m.id), GRACE);   // a reload or an app switch keeps the seat
  });
}

// ---------------------------------------------------------------- guest side
function connectToHost(code, first) {
  return new Promise((resolve, reject) => {
    const conn = peer.connect(PREFIX + code, { reliable: true });
    let opened = false;
    const fail = e => { if (!opened) reject(e); };
    peer.once('error', fail);
    conn.on('open', () => {
      opened = true; hostConn = conn;
      conn.send({ t: 'hello', user: me() });
      emit('status', 'online');
      resolve();
    });
    conn.on('data', raw => {
      const m = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (m.t === 'res') { const p = pending.get(m.rid); if (p) { pending.delete(m.rid); clearTimeout(p.timer); m.error ? p.reject(new Error(m.message)) : p.resolve(m); } return; }
      if (m.t === 'denied') { p2p.leave(); emit('salon', { error: m.message }); return; }
      emit(m.t, m);
    });
    conn.on('close', () => {
      if (hostConn !== conn || !p2p.active) return;
      hostConn = null;
      emit('status', 'reconnecting');
      retryJoin(code, Date.now());
    });
    setTimeout(() => fail({ type: 'peer-unavailable' }), 12000);
    if (first) conn.on('error', fail);
  });
}
function retryJoin(code, since) {
  clearTimeout(retryTimer);
  retryTimer = setTimeout(async () => {
    if (!p2p.active || hostConn) return;
    try { if (peer.disconnected) peer.reconnect(); await connectToHost(code); }
    catch {
      if (Date.now() - since > 45000) { p2p.leave(); emit('salon', { error: 'Le salon a été fermé ou l’hôte est hors ligne.' }); }
      else retryJoin(code, since);
    }
  }, 2500);
}

const transport = {
  send(t, payload = {}) {
    if (p2p.host) { hostHandle(me().id, { t, ...payload }); return true; }
    if (hostConn?.open) { hostConn.send({ t, ...payload }); return true; }
    return false;
  },
  req(t, payload = {}, timeout = 8000) {
    if (p2p.host) {
      const res = hostHandle(me().id, { t, ...payload }) || { ok: true };
      return res.error ? Promise.reject(new Error(res.message)) : Promise.resolve(res);
    }
    return new Promise((resolve, reject) => {
      if (!hostConn?.open) return reject(new Error('Connexion au salon en cours…'));
      const id = ++rid;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error('L’hôte du salon ne répond pas.')); }, timeout);
      pending.set(id, { resolve, reject, timer });
      hostConn.send({ t, rid: id, ...payload });
    });
  },
};

function openPeer(id) {
  return new Promise((resolve, reject) => {
    const p = id ? new Peer(id, peerOptions()) : new Peer(peerOptions());
    p.once('open', () => resolve(p));
    p.once('error', reject);
    p.on('disconnected', () => { if (p2p.active && !p.destroyed) setTimeout(() => { try { p.reconnect(); } catch { /* destroyed */ } }, 1500); });
  });
}

export const p2p = {
  active: false, host: false, code: null,
  get link() { return `${location.origin}${location.pathname}#salon=${this.code}`; },
  async create(preferred) {
    this.leave();
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = (attempt === 0 && preferred) || Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
      try { peer = await openPeer(PREFIX + code); this.code = code; break; }
      catch (e) { if (e?.type !== 'unavailable-id' || attempt === 2) throw new Error(errText(e)); }
    }
    this.active = true; this.host = true;
    room.members.clear(); room.chat = [{ sys: true, text: `Salon ${this.code} créé. Partagez le code ou le lien à vos amis.`, at: Date.now() }]; room.game = null;
    room.members.set(me().id, { ...me(), muted: false, voice: false, vs: null, online: true, joinedAt: Date.now(), conn: null });
    peer.on('connection', acceptGuest);
    net.transport = transport;
    navExtras.salon = { code: this.code, host: true }; saveNav();
    emit('status', 'online');
    pushRoom();
    return this.code;
  },
  async join(code) {
    code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length !== 6) throw new Error('Le code du salon contient 6 caractères.');
    this.leave();
    try {
      peer = await openPeer();
      this.code = code; this.active = true; this.host = false;
      net.transport = transport;
      await connectToHost(code, true);
      navExtras.salon = { code, host: false }; saveNav();
    } catch (e) { this.leave(); throw new Error(e instanceof Error ? e.message : errText(e)); }
  },
  leave() {
    clearTimeout(retryTimer);
    if (!this.active && !peer) return;
    const wasActive = this.active;
    this.active = false; this.host = false;
    if (net.transport === transport) net.transport = null;
    hostConn = null;
    pending.forEach(p => { clearTimeout(p.timer); p.reject(new Error('Salon fermé.')); }); pending.clear();
    room.members.forEach(m => m.conn?.close());
    try { peer?.destroy(); } catch { /* ignore */ }
    peer = null;
    if (wasActive) { navExtras.salon = null; saveNav(); emit('party', { party: null, reason: 'left' }); emit('status', 'offline'); }
    this.code = null;
  },
};
