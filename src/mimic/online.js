// Mimic Party online, inside the console's group (server party or peer-to-peer salon). The player who creates a game
// hosts it: guests see it in PARTIES DISPONIBLES (or join with the salon code), pick their character in the lobby and
// follow the host into the match. Everyone hears the reference and records at the same time on their own device; the
// recordings are sent to the whole group, the host collects the scores, orders the playback and spins the wheels.
// Messages travel as 'gm' through the realtime channel already used by the group (16 KB per message, so recordings
// are split into chunks).
import { h } from '../ui.js';
import { net } from '../net.js';
import { social } from '../social.js';
import { p2p } from '../p2p.js';
import { session as account } from '../session.js';
import { toast } from '../shell.js';
import { voice } from '../rtc.js';
import { button, icon, bubbly } from './ui.js';
import { WHEEL } from './ui.js';
import { PRESETS } from './avatar.js';
import { adpcmEncode, adpcmDecode, toBase64, fromBase64 } from './dsp.js';
import { sfx } from './sound.js';
import { CANCEL, ID } from './signals.js';
import REFS from './refs.json';

const CHUNK = 11000;
const MAXP = { classic: 5, versus: 4 };
const CLOSED = Symbol('closed');
const myId = () => account.current?.id || 'me';
const send = (d, to) => net.send('gm', to ? { d, to } : { d });
const members = () => social.party?.members || [];
const isMember = id => members().some(m => m.id === id);
const hostOf = () => { const p = social.party; return p?.game?.id === ID ? p.game.by : null; };
const str = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const charOk = c => (PRESETS.some(p => p.id === c) ? c : 'leo');
const clampScore = v => Math.max(0, Math.min(999, Math.round(+v || 0)));

let S = null;                     // live session (host or guest)
const ads = new Map();            // host id → last advert of an open lobby in the group
const watchers = new Set();
let joining = false;
const notify = () => watchers.forEach(f => { try { f(); } catch { /* a closed panel */ } });

// ---------------------------------------------------------------- incoming messages
net.on('gm', m => {
  const d = m?.d, from = m?.from;
  if (!d || typeof d.k !== 'string' || !from || from === myId() || !isMember(from)) return;
  if (d.k === 'adv') { ads.set(from, { ...d, at: Date.now() }); notify(); return; }
  if (d.k === 'unadv') { if (ads.delete(from)) notify(); return; }
  if (d.k === 'ask') { if (S?.host && S.phase === 'lobby') advert(from); return; }
  if (!S) return;
  if (d.k === 'aud') return audio(from, d);
  if (S.host) { hostHandlers[d.k]?.(from, d); return; }
  if (from !== S.hostId) return;
  guestHandle(d);
});
social.on('party', () => {
  for (const id of [...ads.keys()]) if (!isMember(id)) ads.delete(id);
  if (S) {
    if (S.host) {
      for (const id of [...S.players.keys()]) if (!isMember(id)) hostHandlers.bye(id);
    } else if (!social.party || !isMember(S.hostId)) closed('L’hôte a quitté la partie');
  }
  notify();
});

// recordings: chunks are assembled per round and player, then decoded
function audio(from, d) {
  if (!S || d.gid !== S.gid || typeof d.data !== 'string') return;
  const id = String(d.id || from), key = `${d.n}:${id}`;
  if (id !== from && from !== S.hostId && !S.host) return;
  const total = Math.min(64, +d.total || 0), a = S.parts[key] ||= { got: 0, list: [] };
  if (!total || d.i < 0 || d.i >= total) return;
  if (a.list[d.i] == null) { a.list[d.i] = d.data; a.got++; }
  if (a.got === total) {
    try { (S.recs[d.n] ||= {})[id] = adpcmDecode(fromBase64(a.list.join('')), Math.min(+d.len || 0, 16000 * 20)); } catch { /* corrupt: no playback */ }
    delete S.parts[key];
  }
}
function shareRecording(s, n, id, pcm) {
  (s.recs[n] ||= {})[id] = pcm;
  if (!pcm || s.closed) return;
  const b64 = toBase64(adpcmEncode(pcm)), total = Math.ceil(b64.length / CHUNK);
  for (let i = 0; i < total; i++) send({ k: 'aud', gid: s.gid, n, id, i, total, len: pcm.length, data: b64.slice(i * CHUNK, (i + 1) * CHUNK) });
}

// ---------------------------------------------------------------- host side
function lobbyView() {
  const g = S.g;
  return {
    k: 'lobby', mode: S.mode, max: MAXP[S.mode], rules: { ...g.rules }, desc: g.desc || '', open: !!g.profile.open,
    players: g.lobbyPlayers().map((p, i) => ({ id: p.id, name: p.name, char: p.char, level: p.level || 1, couch: !!p.couch, host: !!p.host, team: S.mode === 'versus' ? (i % 2 ? 'blue' : 'red') : null })),
  };
}
function advert(to) {
  if (!S?.host || S.phase !== 'lobby' || !S.g.profile.open || !social.party) return;
  const g = S.g, n = g.lobbyPlayers().length;
  send({ k: 'adv', name: g.myName, char: g.profile.char, count: n, max: MAXP[S.mode], mode: S.mode, desc: g.desc || '' }, to);
}
const hostHandlers = {
  hi(from, d) {
    if (S.phase !== 'lobby') { send({ k: 'busy' }, from); return; }
    if (!S.g.profile.open) { send({ k: 'refused', why: 'Cette partie est fermée.' }, from); return; }
    if (!S.players.has(from) && S.g.lobbyPlayers().length >= MAXP[S.mode]) { send({ k: 'refused', why: 'Cette partie est complète.' }, from); return; }
    const m = members().find(x => x.id === from);
    S.players.set(from, { id: from, name: str(d.name || m?.psn || 'Joueur', 16) || 'Joueur', char: charOk(d.char), level: Math.max(1, Math.min(99, +d.level || 1)) });
    sfx('pop');
    S.g.lobbyRender?.(); online.pushLobby();
  },
  pick(from, d) { const p = S.players.get(from); if (p) { p.char = charOk(d.char); S.g.lobbyRender?.(); online.pushLobby(); } },
  bye(from) {
    if (!S.players.has(from)) return;
    if (S.phase === 'lobby') { S.players.delete(from); S.g.lobbyRender?.(); online.pushLobby(); return; }
    S.gone.add(from); S.wake?.();
  },
  res(from, d) {
    if (d.gid !== S.gid || !S.results[d.n] || S.results[d.n][from]) return;
    S.results[d.n][from] = { score: Math.max(0, Math.min(100, Math.round(+d.score || 0))), silent: !!d.silent, heard: str(d.heard, 120) };
    S.wake?.();
  },
  tomato(from, d) { if (d.gid === S.gid && S.phase === 'match') { send({ k: 'tomato', gid: S.gid, by: from }); S.g.tomato(true); } },
};
// every player's console sends its result; the host waits for everyone still in the group (or a timeout)
async function collect(s, n, ids, ms) {
  const end = Date.now() + ms;
  const present = () => ids.filter(id => s.local.has(id) || (isMember(id) && !s.gone.has(id)));
  while (!present().every(id => s.results[n][id]) && Date.now() < end) await s.g.wait(new Promise(r => { s.wake = r; setTimeout(r, 400); }));
  s.wake = null;
}

// ---------------------------------------------------------------- guest side
function guestHandle(d) {
  if (d.k === 'lobby') { if (Array.isArray(d.players)) { S.lobby = d; S.refused = ''; S.render?.(); } return; }
  if (d.k === 'refused' || d.k === 'busy') { S.refused = d.k === 'busy' ? 'Une partie est en cours : tu entreras dans le lobby à la fin.' : str(d.why, 80); push(d); return; }
  if (d.k === 'tomato') { if (d.gid === S.gid && d.by !== myId()) S.g.tomato(true); return; }
  if (d.k === 'close') { closed('L’hôte a fermé la partie'); return; }
  if (d.k !== 'start' && d.gid !== S.gid) return;
  push(d);
}
function push(d) { S.queue.push(d); const w = S.waiter; S.waiter = null; w?.(); }
async function expect(kinds, ms = 0) {
  const s = S, end = ms ? Date.now() + ms : 0;
  if (!s || s.closed) throw CLOSED;
  for (;;) {
    while (s.queue.length) {
      const d = s.queue.shift();
      if (kinds.includes(d.k)) return d;
    }
    if (end && Date.now() > end) return null;
    await s.g.wait(new Promise(r => { s.waiter = r; setTimeout(r, 400); }));
    if (s.closed) throw CLOSED;
  }
}
function closed(why) {
  if (!S || S.host || S.closed) return;
  const g = S.g;
  S.closed = true;
  const w = S.waiter; S.waiter = null; w?.();
  online.leave(g, true);
  toast({ title: 'Partie en ligne terminée', sub: why, icon: 'party', sound: 'error', log: false });
  if (!g.closed) g.home();
}

// the guest's lobby: the host's players and rules, read only, until the host launches
function guestLobby(g) {
  const ep = g.newFlow();
  g.inMatch = false; g.online = S;
  S.phase = 'lobby';
  g.music('menu');
  const st = g.stage;
  st.clearAvatars(); g.clearLabels(); st.clearFx(); st.stagePose();
  st.shot('lobby', { dur: 1.2 });
  g.dim.className = 'mmp-dim on dark';
  const packsEl = h('div.packs'), playersEl = h('div.players'), rulesEl = h('div.rules.mmp-rules'), nEl = h('div.n'), wait = h('div.code');
  S.render = () => {
    if (!S || g.epoch !== ep) return;
    const L = S.lobby;
    const host = members().find(m => m.id === S.hostId)?.psn || 'l’hôte';
    wait.replaceChildren(h('span', `EN ATTENTE DE ${host.toUpperCase()}`));
    if (!L) { nEl.textContent = S.refused || `${host} n’a pas encore ouvert sa partie`; return; }
    const R = L.rules || {};
    const names = { snap: 'Réfs Snap', africa: 'Mèmes africains', petits: 'Réfs de petits', oubliees: 'Réfs oubliées', tiktok: 'TikTok' };
    packsEl.replaceChildren(h('div.head', 'PACKS MIMIC'), h('div.count', `${(R.packs || []).length} pack(s) choisi(s) par l’hôte`),
      ...(R.packs || []).filter(id => names[id]).map(id => { const c = REFS.find(r => r.pack === id); return h('div.packrow', c ? h('img', { src: `mimic/refs/${encodeURIComponent(c.id)}.webp`, alt: '' }) : null, h('span.grow', names[id]), icon('check')); }));
    playersEl.replaceChildren(...L.players.map(p => h('div.mmp-prow', { f: p.id === myId() ? true : null, onok: p.id === myId() ? () => pickChar() : null },
      h('div.av', h('img', { src: g.portrait(p.char, '#e5483f'), alt: '' }), p.host ? icon('crown', 'crown') : null),
      voice.active && !p.couch ? icon('speaker', 'sp') : null,
      p.team ? h('span.team', { style: { background: p.team === 'red' ? '#e5483f' : '#3b6ff0' } }) : null,
      h('div.who', `${p.name.toUpperCase()}${p.id === myId() ? ' (toi)' : p.couch ? ' (console de l’hôte)' : ''}`, h('small', `Lvl.${p.level || 1}`)),
      h('span.st', 'Prêt'))));
    nEl.textContent = `${L.players.length}/${L.max} joueurs`;
    rulesEl.replaceChildren(h('div.k', 'RÈGLES DE LA PARTIE'),
      ...[['Nombre de manches', String(R.rounds)], ['Roue de fin de manche', R.wheel ? 'AVEC' : 'SANS'], ['Son pendant la prise', R.refDuring ? 'AVEC' : 'SANS'],
        ['Ordre de passage', R.order === 'fixe' ? 'FIXE' : 'ALÉATOIRE'], ['Événement Halloween', R.halloween ? 'AVEC' : 'SANS'], ['Mode', L.mode === 'versus' ? 'VERSUS' : 'CLASSIC']]
        .map(([k, v]) => h('div.r', h('span', k), h('b', v))));
    st.setHalloween(!!R.halloween);
    if (!g.layer?.focused?.isConnected) g.focus(g.top.el.querySelector('[data-autofocus]') || g.top.el.querySelector('[data-f]'));
  };
  const pickChar = () => {
    g.charsPanel();
    g.top.onClose = () => { if (S && !S.host) { send({ k: 'pick', char: g.profile.char }, S.hostId); } };
  };
  const leave = () => g.home();
  g.show(h('div.mmp-lobby', packsEl, h('div.ttl', bubbly('Lobby', 'mmp-title-cyan')), playersEl, rulesEl,
    h('div.center', nEl, wait, button('PERSONNAGE', { kind: 'yellow', cls: 'launch', auto: true, onok: pickChar })),
    h('div.br', button('QUITTER', { kind: 'outline', onok: leave })),
    h('div.mmp-round.gear', { f: true, onok: () => g.settingsPanel() }, icon('gear'))),
  { hints: [['ok', 'Sélectionner'], ['back', 'Quitter']], back: leave });
  S.render();
  // knock until the host lists us, then wait for the launch
  (async () => {
    try {
      for (;;) {
        const listed = S.lobby?.players?.some(p => p.id === myId());
        if (!listed) send({ k: 'hi', name: g.myName, char: g.profile.char, level: g.level }, S.hostId);
        const d = await expect(['start', 'refused', 'busy'], 2000);
        if (d?.k === 'start') { if (d.cfg?.players?.some(p => p.id === myId())) { guestMatch(g, d); return; } continue; }
        if (d?.k === 'refused') { closed(S.refused); return; }
        if (d?.k === 'busy') { S.lobby = null; S.render?.(); }
      }
    } catch (e) { if (e !== CANCEL && e !== CLOSED) throw e; }
  })();
}

// ---------------------------------------------------------------- the match, the same flow for the host and the guests
function cleanCfg(cfg) {
  const ok = new Set(REFS.map(r => r.id));
  const players = (cfg.players || []).slice(0, 5).map(p => ({ id: String(p.id), name: str(p.name, 16) || 'Joueur', char: charOk(p.char), team: p.team === 'red' || p.team === 'blue' ? p.team : null, owner: String(p.owner || p.id), local: false }));
  const rules = { rounds: 5, wheel: true, refDuring: false, order: 'fixe', halloween: true, packs: [], ...(cfg.rules || {}) };
  return { mode: cfg.mode === 'versus' ? 'versus' : 'classic', rules, players, plan: (cfg.plan || []).filter(id => ok.has(id)).slice(0, 10) };
}
async function guestMatch(g, start) {
  S.gid = start.gid;
  await match(g, cleanCfg(start.cfg));
}
async function match(g, cfg) {
  g.newFlow();
  const s = S;
  g.online = s;
  s.phase = 'match'; s.recs = {}; s.parts = {}; s.results = {}; s.gone = new Set(); s.render = null;
  const host = s.host, me = myId();
  try {
    g.beginMatch(cfg);
    const mine = g.mplayers.filter(p => p.owner === me);
    s.local = new Set(mine.map(p => p.id));
    const bonus = {};
    for (let n = 0; n < cfg.plan.length; n++) {
      if (!host) await expect(['round']);
      else send({ k: 'round', gid: s.gid, n });
      const ref = REFS.find(r => r.id === cfg.plan[n]);
      s.results[n] = {};
      await g.phaseAnnounce(n);
      const got = await g.phaseReveal(n, ref);
      for (const p of mine) {
        const r = await g.runTurn(() => g.phaseRecord(n, ref, got, p, { couch: mine.length > 1 }));
        shareRecording(s, n, p.id, r.pcm || null);
        const out = { k: 'res', gid: s.gid, n, id: p.id, score: r.score, silent: !!r.silent, heard: r.heard || '' };
        if (host) s.results[n][p.id] = { score: r.score, silent: !!r.silent, heard: r.heard || '' };
        else send(out, s.hostId);
      }
      // waiting for the other consoles
      g.top.el.querySelector('.mmp-caption')?.replaceChildren('En attente des autres joueurs...');
      let play;
      if (host) {
        await collect(s, n, g.mplayers.map(p => p.id), ((ref?.dur || 5) * 2 + 60) * 1000);
        const order = g.rulesOrder(g.mplayers.map(p => p.id));
        const entries = order.map(id => ({ id, ...g.applyBonus(s.results[n][id], bonus[id]) }));
        for (const k in bonus) delete bonus[k];
        play = { k: 'play', gid: s.gid, n, entries };
        send(play);
      } else play = await expect(['play']);
      const entries = (play.entries || []).filter(e => g.mplayers.some(p => p.id === e.id))
        .map(e => ({ id: e.id, score: clampScore(e.score), final: clampScore(e.final), bonus: str(e.bonus, 12), silent: !!e.silent, heard: str(e.heard, 120) }));
      await g.phasePlayback(n, entries, id => s.recs[n]?.[id]);
      for (const e of entries) {
        const pcm = s.recs[n]?.[e.id], p = g.mplayers.find(x => x.id === e.id);
        if (pcm && p && (!g.stats.best || e.score > g.stats.best.score)) g.stats.best = { score: e.score, pcm, name: p.name, ref: ref.id };
      }
      if (cfg.rules.wheel) {
        const last = n === cfg.plan.length - 1;
        let spins;
        if (host) {
          spins = Object.fromEntries(g.mplayers.map(p => [p.id, Math.floor(Math.random() * WHEEL.length)]));
          send({ k: 'wheel', gid: s.gid, n, spins, last });
        } else {
          const w = await expect(['wheel']);
          spins = {};
          for (const p of g.mplayers) { const i = Math.round(+w.spins?.[p.id]); if (i >= 0 && i < WHEEL.length) spins[p.id] = i; }
        }
        await g.phaseWheel(n, spins, last);
        for (const [id, i] of Object.entries(spins)) {
          const w = WHEEL[i];
          if (last) { const p = g.mplayers.find(x => x.id === id); if (p) { const before = p.score; p.score = Math.round(p.score * (w.mul || 1)) + (w.add || 0); p.gainWheel = p.score - before; } }
          else if (host) bonus[id] = w;
        }
        g.renderCards();
      }
    }
    s.phase = 'end';
    await g.phaseResults();
    if (!host) waitNext(g);
  } catch (e) {
    if (e === CLOSED) return;
    if (e !== CANCEL) throw e;
  }
}
// after the results a guest follows the host into the next match
function waitNext(g) {
  const ep = g.epoch;
  (async () => {
    try {
      for (;;) {
        const d = await expect(['start']);
        if (g.epoch !== ep && S?.phase !== 'lobby') return;
        if (d.cfg?.players?.some(p => p.id === myId())) { guestMatch(g, d); return; }
      }
    } catch (e) { if (e !== CANCEL && e !== CLOSED) throw e; }
  })();
}

export const online = {
  // games of the group that this console can join
  lobbies() {
    const now = Date.now();
    return [...ads.entries()].filter(([id, a]) => now - a.at < 9000 && isMember(id) && id !== myId())
      .map(([id, a]) => ({ host: id, name: str(a.name, 16) || members().find(m => m.id === id)?.psn || 'Joueur', char: charOk(a.char), count: +a.count || 1, max: +a.max || 5, mode: a.mode === 'versus' ? 'versus' : 'classic', desc: str(a.desc, 40) }));
  },
  status() {
    const party = !!social.party, n = members().length, k = this.lobbies().length;
    if (joining) return { busy: true, text: 'Connexion au salon...', party };
    if (!party) return { busy: false, text: 'Aucun groupe actif : crée un groupe ou un salon depuis la Base de jeu, ou entre le code du salon d’un ami.', party };
    if (k) return { busy: false, text: `${k} partie(s) ouverte(s) dans ton groupe`, party };
    return { busy: n > 1, text: n > 1 ? `Ton groupe (${n} joueurs) : aucune partie ouverte pour le moment. Crée la tienne, tes amis la verront ici.` : 'Tu es seul dans ton groupe : invite un ami depuis la Base de jeu.', party };
  },
  watch(fn) {
    watchers.add(fn);
    if (social.party) send({ k: 'ask' });
    const t = setInterval(() => {
      if (social.party) send({ k: 'ask' });
      let gone = false;
      for (const [id, a] of ads) if (Date.now() - a.at > 9000) { ads.delete(id); gone = true; }
      if (gone) notify();
    }, 3000);
    return () => { watchers.delete(fn); clearInterval(t); };
  },
  async joinCode(code) {
    code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length !== 6) throw new Error('Le code contient 6 caractères.');
    if (p2p.active && p2p.code === code) { send({ k: 'ask' }); return; }
    if (social.party) throw new Error('Quitte d’abord ton groupe actuel (Base de jeu) pour rejoindre ce salon.');
    joining = true; notify();
    try { await social.joinSalon(code); } finally { joining = false; notify(); }
    send({ k: 'ask' });
  },
  join(g, hostId) {
    if (!hostId || hostId === myId() || !isMember(hostId)) { toast({ title: 'Partie introuvable', sub: 'Cette partie n’est plus disponible', icon: 'party', sound: 'error', log: false }); g.home(); return; }
    this.leave(g);
    S = { g, host: false, hostId, phase: 'lobby', queue: [], waiter: null, lobby: null, recs: {}, parts: {}, results: {}, gone: new Set(), local: new Set(), refused: '', closed: false };
    guestLobby(g);
  },
  // resolves with an open lobby of the group, or null after `ms`
  async findLobby(ms) {
    if (!social.party || members().length < 2) { await new Promise(r => setTimeout(r, 2200)); return null; }
    const end = Date.now() + ms;
    for (;;) {
      const l = this.lobbies().find(x => x.count < x.max);
      if (l) return l;
      if (Date.now() > end) return null;
      send({ k: 'ask' });
      await new Promise(r => setTimeout(r, 700));
    }
  },
  host(g, mode) {
    if (S && !S.host) this.leave(g);
    g.online = null;
    if (!S) S = { g, host: true, hostId: myId(), players: new Map(), queue: [], recs: {}, parts: {}, results: {}, gone: new Set(), local: new Set() };
    S.g = g; S.mode = mode; S.phase = 'lobby'; S.gid = null;
    for (const id of [...S.players.keys()]) if (!isMember(id) || S.gone.has(id)) S.players.delete(id);
    S.gone = new Set();
    const by = hostOf();
    if (social.party && (!by || !isMember(by))) social.startGame(ID);
    clearInterval(S.adTimer);
    S.adTimer = setInterval(() => { if (S?.host && S.phase === 'lobby' && social.party) { advert(); send(lobbyView()); } }, 3000);
    this.pushLobby();
  },
  pushLobby() {
    if (!S?.host || S.phase !== 'lobby' || !social.party) return;
    send(lobbyView());
    if (S.g.profile.open) advert(); else send({ k: 'unadv' });
  },
  remotePlayers() { return S?.host ? [...S.players.values()].filter(p => isMember(p.id)).map(p => ({ ...p })) : []; },
  code() { return S?.host && p2p.active ? p2p.code : null; },
  share() { social.shareSalon(); },
  startMatch(g, cfg) {
    if (!S?.host) { g.playLocal(cfg); return; }
    const me = myId();
    cfg = { ...cfg, players: cfg.players.map(p => ({ ...p, owner: p.local ? me : p.id })) };
    S.gid = Math.random().toString(36).slice(2, 10);
    send({ k: 'unadv' });
    send({ k: 'start', gid: S.gid, cfg: { mode: cfg.mode, rules: cfg.rules, players: cfg.players.map(({ id, name, char, team, owner }) => ({ id, name, char, team, owner })), plan: cfg.plan } });
    match(g, { ...cfg, players: cfg.players.map(p => ({ ...p, local: false })) });
  },
  tomato() { if (S?.gid && S.phase === 'match') { if (S.host) send({ k: 'tomato', gid: S.gid }); else send({ k: 'tomato', gid: S.gid }, S.hostId); } },
  again(g) { if (S?.host) { g.lobby({ mode: S.mode }); g.launch(); } else if (S) guestLobby(g); else g.home(); },
  toLobby(g) { if (S?.host) g.lobby({ mode: S.mode }); else if (S) guestLobby(g); else g.home(); },
  // a friend launched Mimic Party in our group: open their lobby directly
  invited() { const by = hostOf(); return by && by !== myId() && isMember(by) ? by : null; },
  leave(g, silent = false) {
    if (!S) return;
    const s = S;
    S = null;
    clearInterval(s.adTimer);
    const w = s.waiter; s.waiter = null; s.closed = true; w?.();
    if (!silent && social.party) {
      if (s.host) { send({ k: 'close' }); send({ k: 'unadv' }); if (hostOf() === myId()) social.stopGame(); }
      else if (s.hostId) send({ k: 'bye' }, s.hostId);
    }
    if (g && g.online === s) g.online = null;
    notify();
  },
};
