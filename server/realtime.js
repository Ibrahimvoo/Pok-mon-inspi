// Realtime hub over WebSocket: presence, parties (groups), invitations, game sessions,
// WebRTC signalling relay and in-game input sync. Live state is in memory; accounts/friends are in the DB.
import { randomUUID, randomBytes } from 'node:crypto';
import { GAME_IDS } from './accounts.js';

const GRACE_MS = 15000;          // keep a player "online" (and in their party) this long after a dropped socket
const INVITE_TTL = 2 * 60e3;
const MAX_PARTY = 8;
const ACTIVITIES = ['home', 'game', 'app', 'store'];

export function createHub({ acc, log = () => {}, handlers = {}, onGone = () => {} }) {
  const conns = new Map();        // userId → Set<ws>
  const users = new Map();        // userId → { id, psn, avatar }
  const friends = new Map();      // userId → Set<friendId>
  const presence = new Map();     // userId → { activity, game }
  const offlineTimers = new Map();
  const parties = new Map();      // partyId → party
  const userParty = new Map();    // userId → partyId

  const send = (ws, msg) => { if (ws.readyState === 1) ws.send(JSON.stringify(msg)); };
  const toUser = (id, msg) => conns.get(id)?.forEach(ws => send(ws, msg));
  const online = id => conns.has(id) && conns.get(id).size > 0;

  function presenceOf(id) {
    const on = online(id) || offlineTimers.has(id);
    const p = presence.get(id) || {};
    const party = parties.get(userParty.get(id));
    return { id, online: on, activity: on ? p.activity || 'home' : null, game: on ? p.game || null : null,
      partyId: party?.id || null, partySize: party ? party.members.size : 0, joinable: !!party?.open };
  }
  function broadcastPresence(id) {
    const msg = { t: 'presence', ...presenceOf(id) };
    friends.get(id)?.forEach(f => toUser(f, msg));
  }

  // ---------------------------------------------------------------- parties
  function partyView(p) {
    return {
      id: p.id, host: p.host, open: p.open, game: p.game, createdAt: p.createdAt,
      members: [...p.members.values()].map(m => ({ ...users.get(m.id), muted: m.muted, voice: m.voice, vs: m.vs, joinedAt: m.joinedAt, online: online(m.id) })),
      chat: p.chat.slice(-30),
    };
  }
  function pushParty(p) { const view = { t: 'party', party: partyView(p) }; p.members.forEach((_, id) => toUser(id, view)); }
  function createParty(hostId) {
    leaveParty(hostId);
    const p = { id: randomUUID(), host: hostId, open: true, game: null, createdAt: Date.now(), members: new Map(), invites: new Map(), chat: [] };
    parties.set(p.id, p);
    addMember(p, hostId);
    return p;
  }
  function addMember(p, id) {
    p.members.set(id, { id, muted: false, voice: false, vs: null, joinedAt: Date.now() });
    p.invites.delete(id);
    userParty.set(id, p.id);
    pushParty(p);
    broadcastPresence(id);
  }
  function leaveParty(id, reason = 'left') {
    const p = parties.get(userParty.get(id));
    if (!p) return;
    p.members.delete(id);
    userParty.delete(id);
    toUser(id, { t: 'party', party: null, reason });
    if (!p.members.size) { parties.delete(p.id); }
    else {
      if (p.host === id) p.host = [...p.members.keys()][0];
      p.chat.push({ sys: true, text: `${users.get(id)?.psn || 'Un joueur'} a quitté le groupe`, at: Date.now() });
      pushParty(p);
    }
    broadcastPresence(id);
  }
  const isFriend = (a, b) => friends.get(a)?.has(b);

  // ---------------------------------------------------------------- message handlers
  const H = {
    ping() { return { ok: true }; },
    presence(u, m) {
      const activity = ACTIVITIES.includes(m.activity) ? m.activity : 'home';
      const game = activity === 'game' && GAME_IDS.includes(m.game) ? m.game : null;
      presence.set(u.id, { activity, game });
      broadcastPresence(u.id);
    },
    // players online right now (friends or not), to invite them straight into a game
    players(u) {
      const list = [];
      for (const id of conns.keys()) {
        if (id === u.id || !users.has(id)) continue;
        const { activity, game } = presenceOf(id);
        list.push({ ...users.get(id), online: true, activity, game, friend: !!isFriend(u.id, id) });
        if (list.length >= 50) break;
      }
      return { ok: true, players: list.sort((a, b) => b.friend - a.friend || a.psn.localeCompare(b.psn)) };
    },
    'party.create'(u) { const p = createParty(u.id); return { ok: true, partyId: p.id }; },
    'party.invite'(u, m) {
      let p = parties.get(userParty.get(u.id));
      if (!p) p = createParty(u.id);
      const to = String(m.to || '');
      // any player online can be invited (friends or not); the invitation is what lets them in
      if (to === u.id || !users.has(to)) return { error: 'not_found', message: 'Joueur introuvable.' };
      if (p.members.has(to)) return { error: 'already', message: 'Ce joueur est déjà dans le groupe.' };
      if (p.members.size >= MAX_PARTY) return { error: 'full', message: 'Le groupe est complet.' };
      if (!online(to)) return { error: 'offline', message: 'Ce joueur est hors ligne.' };
      p.invites.set(to, Date.now() + INVITE_TTL);
      toUser(to, { t: 'invite', kind: m.kind === 'call' ? 'call' : 'party', from: users.get(u.id), party: { id: p.id, game: p.game, size: p.members.size } });
      return { ok: true, partyId: p.id };
    },
    'party.join'(u, m) {
      const p = parties.get(String(m.partyId || ''));
      if (!p) return { error: 'gone', message: 'Ce groupe n’existe plus.' };
      if (p.members.has(u.id)) { pushParty(p); return { ok: true }; }
      const invited = (p.invites.get(u.id) || 0) > Date.now();
      const friendOfMember = [...p.members.keys()].some(id => isFriend(u.id, id));
      if (!invited && !(p.open && friendOfMember)) return { error: 'forbidden', message: 'Vous n’êtes pas invité dans ce groupe.' };
      if (p.members.size >= MAX_PARTY) return { error: 'full', message: 'Le groupe est complet.' };
      leaveParty(u.id);
      addMember(p, u.id);
      p.chat.push({ sys: true, text: `${u.psn} a rejoint le groupe`, at: Date.now() });
      pushParty(p);
      return { ok: true, partyId: p.id };
    },
    'party.decline'(u, m) {
      const p = parties.get(String(m.partyId || ''));
      if (!p || !p.invites.has(u.id)) return { ok: true };
      p.invites.delete(u.id);
      p.members.forEach((_, id) => toUser(id, { t: 'declined', by: users.get(u.id), kind: m.kind === 'call' ? 'call' : 'party' }));
      return { ok: true };
    },
    'party.leave'(u) { leaveParty(u.id); return { ok: true }; },
    chat(u, m) {
      const p = parties.get(userParty.get(u.id));
      const text = String(m.text || '').replace(/\s+/g, ' ').trim().slice(0, 200);
      if (!p || !text) return;
      const msg = { from: u.id, psn: u.psn, text, at: Date.now() };
      p.chat.push(msg); if (p.chat.length > 60) p.chat.shift();
      p.members.forEach((_, id) => toUser(id, { t: 'chat', partyId: p.id, msg }));
    },
    voice(u, m) {
      const p = parties.get(userParty.get(u.id));
      const me = p?.members.get(u.id);
      if (!me) return;
      const on = !!m.on;
      if (on && (!me.voice || m.renew)) me.vs = randomBytes(6).toString('hex');
      if (!on) me.vs = null;
      me.voice = on; me.muted = !!m.muted;
      pushParty(p);
      return { ok: true, vs: me.vs };
    },
    rtc(u, m) {
      const p = parties.get(userParty.get(u.id));
      const me = p?.members.get(u.id), peer = p?.members.get(String(m.to || ''));
      if (!me?.voice || !peer?.voice) return;
      const data = m.data;
      if (!data || typeof data !== 'object' || JSON.stringify(data).length > 48000) return;
      toUser(peer.id, { t: 'rtc', from: u.id, fromVs: me.vs, toVs: m.toVs, data });
    },
    'game.start'(u, m) {
      const game = GAME_IDS.includes(m.game) ? m.game : null;
      let p = parties.get(userParty.get(u.id));
      if (!game) return { error: 'invalid', message: 'Jeu inconnu.' };
      if (!p) p = createParty(u.id);
      p.game = { id: game, by: u.id, at: Date.now() };
      pushParty(p);
      p.members.forEach((_, id) => { if (id !== u.id) toUser(id, { t: 'game.started', game, by: users.get(u.id), partyId: p.id }); });
      return { ok: true, partyId: p.id };
    },
    'game.stop'(u) {
      const p = parties.get(userParty.get(u.id));
      if (!p?.game) return;
      p.game = null;
      pushParty(p);
    },
    gm(u, m) { // game messages (Mimic Party rounds, scores, recordings), relayed inside the party while a game runs
      const p = parties.get(userParty.get(u.id));
      if (!p?.game || !m.d || typeof m.d !== 'object' || Array.isArray(m.d)) return;
      const msg = { t: 'gm', from: u.id, d: m.d };
      if (m.to != null) { const to = String(m.to); if (to !== u.id && p.members.has(to)) toUser(to, msg); return; }
      p.members.forEach((_, id) => { if (id !== u.id) toUser(id, msg); });
    },
    // private and group messages: relayed to an online player; the clients keep them, acknowledge and resend
    dm(u, m) {
      const to = String(m.to || '');
      if (to === u.id || !online(to) || !m.d || typeof m.d !== 'object' || Array.isArray(m.d)) return;
      if (JSON.stringify(m.d).length > 200000) return;
      toUser(to, { t: 'dm', from: users.get(u.id), d: m.d });
    },
    g(u, m) { // in-game cursor / ping, relayed to the party
      const p = parties.get(userParty.get(u.id));
      if (!p?.game) return;
      const x = Math.min(1, Math.max(0, +m.x || 0)), y = Math.min(1, Math.max(0, +m.y || 0));
      const msg = { t: 'g', from: u.id, x, y, p: m.p ? 1 : 0 };
      p.members.forEach((_, id) => { if (id !== u.id) toUser(id, msg); });
    },
  };

  // ---------------------------------------------------------------- connections
  async function loadFriends(id) {
    const ids = await acc.friendIds(id);
    friends.set(id, new Set(ids));
    for (const f of ids) {
      if (!users.has(f)) { const fu = await acc.byId(f); if (fu) users.set(f, { id: fu.id, psn: fu.psn, avatar: fu.avatar }); }
    }
    return ids;
  }

  async function attach(ws, user, ip = '?') {
    const u = { id: user.id, psn: user.psn, avatar: user.avatar };
    users.set(u.id, u);
    const wasOnline = online(u.id) || offlineTimers.has(u.id);
    clearTimeout(offlineTimers.get(u.id)); offlineTimers.delete(u.id);
    if (!conns.has(u.id)) conns.set(u.id, new Set());
    conns.get(u.id).add(ws);
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    // token buckets per socket: 40 messages/s burst for the console, a larger one for real-time game traffic
    // (movement at 20 Hz plus the voice signalling of up to 14 peers)
    let tokens = 40, last = Date.now(), gTokens = 200, gLast = Date.now();
    ws.on('message', async raw => {
      let m; try { m = JSON.parse(raw); } catch { return; }
      if (!m || typeof m.t !== 'string') return;
      const now = Date.now();
      if (m.t === 'au') { gTokens = Math.min(200, gTokens + (now - gLast) * .12); gLast = now; if (gTokens < 1) return; gTokens--; }
      else { tokens = Math.min(40, tokens + (now - last) * .03); last = now; if (tokens < 1) return; tokens--; }
      const fn = Object.hasOwn(H, m.t) ? H[m.t] : Object.hasOwn(handlers, m.t) ? handlers[m.t] : null;
      if (!fn) return;
      try {
        const res = await fn(u, m, ip);
        if (m.rid && res) send(ws, { t: 'res', rid: m.rid, ...res });
      } catch (e) { log('ws handler error', e); if (m.rid) send(ws, { t: 'res', rid: m.rid, error: 'server', message: 'Erreur du serveur.' }); }
    });
    ws.on('close', () => {
      const set = conns.get(u.id);
      set?.delete(ws);
      if (set && !set.size) {
        conns.delete(u.id);
        onGone(u.id);
        // grace period: a page reload or an iOS app switch should not kick the player out of their party
        offlineTimers.set(u.id, setTimeout(() => {
          offlineTimers.delete(u.id);
          if (online(u.id)) return;
          leaveParty(u.id, 'disconnected');
          presence.delete(u.id);
          acc.touch(u.id).catch(() => {});
          broadcastPresence(u.id);
        }, GRACE_MS));
        const p = parties.get(userParty.get(u.id));
        if (p) pushParty(p); // members see this player as reconnecting
      }
    });

    await loadFriends(u.id);
    const party = parties.get(userParty.get(u.id));
    send(ws, {
      t: 'hello', me: u,
      friends: [...friends.get(u.id)].map(presenceOf),
      party: party ? partyView(party) : null,
    });
    if (party) pushParty(party);
    if (!wasOnline) broadcastPresence(u.id);
  }

  // called by the REST API when friendships change
  async function friendsChanged(...ids) {
    for (const id of ids) {
      if (!conns.has(id) && !offlineTimers.has(id)) { friends.delete(id); continue; }
      await loadFriends(id);
      toUser(id, { t: 'friends', friends: [...friends.get(id)].map(presenceOf) });
    }
  }
  function notify(id, msg) { toUser(id, msg); }

  // heartbeat: drop sockets that stopped answering
  const beat = setInterval(() => {
    conns.forEach(set => set.forEach(ws => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false; ws.ping();
    }));
  }, 25000);

  return {
    attach, friendsChanged, notify, presenceOf,
    stats: () => ({ online: conns.size, parties: parties.size }),
    close() { clearInterval(beat); offlineTimers.forEach(clearTimeout); },
  };
}
