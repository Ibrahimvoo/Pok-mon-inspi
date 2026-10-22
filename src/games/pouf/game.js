// Pouf Party — game controller: boot, title, online lobby, runs and results.
// Menus are layers of the console's own navigation stack, so the controller, keyboard, mouse and touch
// behave exactly like everywhere else on the console.
import { h } from '../../ui.js';
import { nav } from '../../nav.js';
import { closeLayer, refreshLook, toast as consoleToast } from '../../shell.js';
import { social } from '../../social.js';
import { createStage } from './view/stage.js';
import { createArena } from './arena.js';
import { createInput } from './input.js';
import { createMatch, seatAngle } from './match.js';
import { createFootMatch } from './footmatch.js';
import { Lobby, randomCode, codeFrom, cleanCode, MAX_PLAYERS } from './net.js';
import { loadProfile, reward, roundPoints } from './profile.js';
import { COURSES, courseById, TOUR } from './maps/index.js';
import { defaultLook, distinctLooks, SPECIES, EMOTES } from './view/characters.js';
import { sound } from './audio.js';
import * as M from './ui/menus.js';
import './pouf.css';

export const GAME_ID = 'pouf-party';

export async function createGame({ el, user, opts = {}, exit, trophy }) {
  const loading = h('div.pf-loading', M.logo(), h('div.pf-spin', h('i'), h('i'), h('i')), h('div.pf-tip', M.tip()));
  el.append(loading);
  await Promise.race([document.fonts?.load('80px "Luckiest Guy"'), new Promise(r => setTimeout(r, 2500))]).catch(() => {});
  const canvas = h('canvas.pf-canvas'), overlay = h('div.pf-overlay');
  el.prepend(canvas); el.append(overlay);
  const stage = createStage(canvas, {});
  const arena = createArena(stage, overlay);
  const input = createInput(overlay, canvas);
  const profile = loadProfile(user);
  const me = { id: user.id, name: user.psn || 'Joueur', look: profile.look };
  const lobby = new Lobby(me);

  const G = {
    el, overlay, stage, arena, input, lobby, profile, me, settings: profile.settings,
    state: 'title', course: COURSES[0], match: null, summary: null, rewards: null, paused: false,
    menuT: 0, alive: true, attached: false,
    get layers() { return nav.layers.filter(l => l.pf); },
    // ---------------------------------------------------------------- menu layers
    push(layer) {
      layer.root.classList.add('overlay', 'pf-layer', 'in');
      layer.shade = 0; layer.opaque = true;
      layer.pf = true;
      document.getElementById('app').append(layer.root);
      nav.push(layer); refreshLook();
      return layer;
    },
    close(layer, silent = false) { if (layer && nav.layers.includes(layer)) closeLayer(layer, { silent }); },
    closeAll() { for (const l of [...G.layers].reverse()) G.close(l, true); },
    // the menu matching the current state (after the console closed our layers, e.g. Control Center › Resume)
    openBase() {
      if (!G.attached || G.opening) return;
      G.opening = true;   // closing our layers makes the console call resumed(): do not reopen twice
      try {
        G.closeAll();
        if (G.state === 'title') M.titleMenu(G);
        else if (G.state === 'lobby') M.lobbyMenu(G);
        else if (G.state === 'results') M.resultsMenu(G);
      } finally { G.opening = false; }
      G.syncCamera();
    },
    syncCamera() {
      if (G.state === 'match') return;
      arena.cam.mode = G.state === 'customize' ? 'closeup' : 'orbit';
      arena.showTags(G.state === 'lobby' || G.state === 'results');
    },
    toast(title, sub = '', sound = 'notify') { consoleToast({ title, sub, icon: 'gamepad', sound, log: false }); },

    // ---------------------------------------------------------------- crew shown on the raft outside runs
    showcase() {
      if (G.state === 'title' || !lobby.members.length) {
        // the player and three companions of the other species
        const others = [0, 1, 2, 3].map(i => defaultLook(i)).filter(l => l.species !== me.look.species).slice(0, 3);
        const looks = [me.look, ...others];
        arena.setCrew(looks.map((look, i) => ({ id: i ? 'npc' + i : me.id, name: i ? SPECIES.find(sp => sp.id === look.species).name : me.name, look, seat: i })), me.id);
      } else {
        arena.setCrew(distinctLooks(lobby.players.map((m, i) => ({ id: m.id, name: m.name, look: m.id === me.id ? me.look : m.look, seat: i }))), me.id);
      }
      let i = 0;
      for (const m of arena.crew.values()) { m.a = seatAngle(i++); m.mode = 'raft'; m.puff = false; m.run = 0; }
      arena.boardCrew();
    },
    setLook(look) {
      me.look = profile.look = look; profile.save();
      lobby.setLook(look);
      G.showcase();
    },

    // ---------------------------------------------------------------- lobby
    partyCode() {
      const p = social.party;
      return p && p.members?.length > 1 ? codeFrom('pouf:' + p.id) : null;
    },
    async enterLobby({ join = null, party = null } = {}) {
      G.state = 'lobby';
      M.connecting(G, join ? `Connexion à la partie ${join}…` : 'Création du salon…');
      try {
        if (join) await lobby.join(join);
        else if (party) await lobby.claim(party);
        else await lobby.host(randomCode());
      } catch (e) {
        if (lobby.closed || !G.alive) return;   // cancelled by the player while connecting
        G.state = 'title';
        G.openBase();
        M.alert(G, 'Impossible de rejoindre', e.message || 'La connexion a échoué.');
        return;
      }
      G.openBase();
      G.showcase();
      if (!lobby.online) G.toast('Mode hors ligne', 'Partie solo : le jeu en ligne n’est pas disponible pour le moment', 'error');
    },
    leaveLobby() {
      lobby.leave();
      G.state = 'title';
      G.openBase();
      G.showcase();
    },
    setCourse(c) {
      G.course = c;
      if (lobby.isHost) lobby.broadcast({ t: 'lobby', course: c.id });
      // the lobby shows the river of the chosen descent (the on-foot épreuves keep the current one)
      if (!c.foot && arena.course?.id !== c.id) { arena.load(c); G.showcase(); }
      M.refresh(G);
    },
    canStart() { return lobby.isHost && lobby.players.filter(m => m.online !== false).every(m => m.host || m.ready); },

    // ---------------------------------------------------------------- runs
    // ---------------------------------------------------------------- tournament: the épreuves in a row, points added up
    tourMode: false, tour: null,
    setTourMode(v) { G.tourMode = v; G.tour = null; if (lobby.isHost) lobby.broadcast({ t: 'lobby', course: G.course.id, tour: v }); M.refresh(G); },
    decorate(summary) {
      if (!G.tour) return summary;
      const round = roundPoints(summary);
      for (const r of summary.riders) { G.tour.pts[r.id] = (G.tour.pts[r.id] || 0) + (round[r.id] || 0); G.tour.names[r.id] = r.name; G.tour.looks[r.id] = r.look; }
      summary.tour = { i: G.tour.i, n: G.tour.list.length, round, pts: { ...G.tour.pts }, names: { ...G.tour.names }, looks: { ...G.tour.looks } };
      return summary;
    },
    nextRound() {
      if (!lobby.isHost || !G.tour) return;
      if (G.tour.i + 1 >= G.tour.list.length) { G.tour = null; G.state = 'lobby'; G.openBase(); return; }
      G.tour.i++; G.course = courseById[G.tour.list[G.tour.i]];
      G.startMatch();
    },
    startMatch() {
      if (!lobby.isHost) return;
      if (G.tourMode && !G.tour) { G.tour = { list: TOUR.slice(), i: 0, pts: {}, names: {}, looks: {} }; G.course = courseById[G.tour.list[0]]; }
      const roster = distinctLooks(lobby.players.filter(m => m.online !== false).slice(0, MAX_PLAYERS).map((m, i) => ({ id: m.id, name: m.name, look: m.id === me.id ? me.look : m.look, seat: i })));
      lobby.members.forEach(m => { if (!m.host) m.ready = false; });
      lobby.pushState();
      const msg = { t: 'start', course: G.course.id, roster, tour: G.tour ? { i: G.tour.i, n: G.tour.list.length } : null };
      lobby.broadcast(msg);
      G.beginMatch(msg, true);
    },
    beginMatch(msg, host) {
      const course = courseById[msg.course]; if (!course) return;
      G.endMatch();
      G.course = course;
      G.closeAll();
      G.state = 'match'; G.paused = false;
      const spectator = !msg.roster.some(r => r.id === me.id);
      G.match = (course.foot ? createFootMatch : createMatch)(G, { course, roster: msg.roster, host, meId: me.id, spectator });
      // the rules are shown once for the raft and once for the on-foot épreuves
      const key = course.foot ? 'tutorialFoot' : 'tutorial';
      if (!profile[key] && !spectator) { profile[key] = true; profile.save(); M.helpMenu(G, { first: true }); }
    },
    endMatch() { if (G.match) { G.match.dispose(); G.match = null; } G.paused = false; },
    onEnd(summary) {
      if (G.state !== 'match') return;
      G.endMatch();
      G.summary = summary;
      G.rewards = summary.riders.some(r => r.id === me.id) ? reward(profile, summary, me.id) : null;
      G.checkTrophies(summary);
      G.state = 'results';
      G.closeAll();
      G.showcase();
      G.openBase();
    },
    abortMatch(reason) {
      if (G.state !== 'match' && G.state !== 'results') return;
      G.tour = null;
      G.endMatch();
      G.state = 'lobby';
      G.closeAll(); G.showcase(); G.openBase();
      if (reason) G.toast(reason);
    },
    openPause() {
      if (G.state !== 'match' || G.layers.length) return;
      G.paused = lobby.members.length <= 1;   // a solo run really pauses
      input.setPlaying(false);
      M.pauseMenu(G);
    },
    resumeRun() { if (G.layers.length) return; G.paused = false; if (G.match && !G.match.finished && G.attached) input.setPlaying(true); },
    checkTrophies(s) {
      const stats = profile.stats, mine = s.riders.find(r => r.id === me.id);
      if (s.kind === 'race' || s.kind === 'survival') { if (mine && mine.rank === 1 && s.riders.length >= 2) trophy?.(1); if (G.rewards?.stars === 3) trophy?.(4); return; }
      const won = s.finished && !!mine;
      if (won) trophy?.(0);
      if (won && s.riders.length >= 2) trophy?.(1);
      if (won && s.deaths === 0) trophy?.(2);
      if (stats.supers >= 50) trophy?.(3);
      if (won && G.rewards?.stars === 3) trophy?.(4);
    },
    // ---------------------------------------------------------------- invitations
    async moveLobby(code) {
      if (!lobby.isHost || lobby.code === code) return;
      lobby.broadcast({ t: 'move', code });
      await new Promise(r => setTimeout(r, 300));
      try { await lobby.claim(code); } catch (e) { G.toast('Salon', e.message, 'error'); }
      G.showcase(); M.refresh(G);
    },
    shareLink() { return `${location.origin}${location.pathname}#pouf=${lobby.code}`; },
    async joinCode(input) {
      const raw = String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      // a 6 character code is a console room (salon): join it, then its members' shared lobby
      if (raw.length === 6) {
        M.connecting(G, `Connexion au salon ${raw}…`);
        try { await social.joinSalon(raw); }
        catch (e) { G.state = 'title'; G.openBase(); M.alert(G, 'Impossible de rejoindre', e.message || 'La connexion a échoué.'); return; }
        if (G.state === 'match') G.endMatch();
        if (lobby.role !== 'none') lobby.leave();
        await G.enterLobby({ party: codeFrom('pouf:' + raw) });
        return;
      }
      const code = cleanCode(raw);
      if (G.state === 'match') G.endMatch();
      if (lobby.role !== 'none') lobby.leave();
      await G.enterLobby({ join: code });
    },

    exit() { G.destroy(); exit?.(); },
    destroy() {
      if (!G.alive) return;
      G.alive = false;
      cancelAnimationFrame(raf);
      G.endMatch(); G.closeAll();
      lobby.destroy(); input.dispose(); arena.dispose(); stage.dispose();
      sound.stop(); ro.disconnect();
      el.replaceChildren();
    },
  };

  if (/[?&]pfdebug/.test(location.search)) { window.__pouf = G; G.sound = sound; }   // automated tests inspect the game state

  // ---------------------------------------------------------------- network events
  lobby.on('msg', m => {
    if (['snap', 'ev', 'inp', 'fs', 'fsnap', 'fev', 'ffin', 'fout', 'fem'].includes(m.t)) { G.match?.onMsg(m); return; }
    if (m.t === 'start' && !lobby.isHost) { G.beginMatch(m, false); return; }
    if (m.t === 'end' && !lobby.isHost) { G.onEnd(m.summary); return; }
    if (m.t === 'abort' && !lobby.isHost) { G.abortMatch('L’hôte a mis fin à la partie'); return; }
    if (m.t === 'lobby' && !lobby.isHost) { const c = courseById[m.course]; G.tourMode = !!m.tour; if (c) { G.course = c; if (G.state !== 'match' && !c.foot) { arena.load(c); G.showcase(); } } M.refresh(G); return; }
    if (m.t === 'move' && !lobby.isHost) { const code = cleanCode(m.code); setTimeout(() => G.joinCode(code), 900); }
  });
  lobby.on('state', () => {
    if (G.state === 'match' && G.match) {
      const ids = new Set(lobby.members.map(x => x.id));
      for (const id of [...G.match.riders.keys()]) if (!ids.has(id)) G.match.removeRider(id);
    } else if (G.state === 'lobby' || G.state === 'results') G.showcase();
    M.refresh(G);
  });
  lobby.on('joined', mem => {
    if (!lobby.isHost) return;
    lobby.sendTo(mem.id, { t: 'lobby', course: G.course.id, tour: G.tourMode });
    if (G.state === 'match' && G.match) lobby.sendTo(mem.id, { t: 'start', course: G.course.id, roster: G.match.roster.filter(r => G.match.riders.has(r.id)) });
    sound.ui('ok');
    G.toast(`${mem.name} a rejoint la partie`);
  });
  lobby.on('left', mem => G.toast(`${mem.name} a quitté la partie`, '', null));
  lobby.on('status', s => {
    if (s.waiting) G.toast('En attente de l’hôte…', 'Son application est peut-être en arrière-plan : nouvelle tentative pendant 40 s');
    else if (s.hostLost && s.takenOver) G.toast('Retour dans la partie', 'Un autre joueur a repris le salon pendant votre absence : vous le rejoignez');
    if (s.hostLost) {
      if (G.state === 'match' || G.state === 'results') G.abortMatch();
      if (!s.takenOver) G.toast(s.closing ? 'L’hôte a fermé la partie' : 'L’hôte a quitté la partie', 'Recherche d’un nouvel hôte…', 'error');
    } else if (s.reelected) { G.toast(lobby.isHost ? 'Vous êtes le nouvel hôte' : 'Nouvel hôte trouvé', `Code ${lobby.code}`); G.showcase(); }
    else if (s.lost) { G.toast('Partie perdue', s.error, 'error'); if (G.state !== 'title') { G.endMatch(); G.state = 'title'; G.openBase(); G.showcase(); } }
    M.refresh(G);
  });
  // a console party starting later moves a lone host into the party's lobby
  const offParty = social.on('party', () => {
    const code = G.partyCode();
    if (code && lobby.isHost && lobby.code !== code && G.state === 'lobby') G.moveLobby(code);
  });

  // ---------------------------------------------------------------- loop
  let raf = 0, last = performance.now();
  const ro = new ResizeObserver(() => { const r = el.getBoundingClientRect(); if (r.width && r.height) stage.resize(r.width, r.height); });
  ro.observe(el);
  function frame(now) {
    raf = requestAnimationFrame(frame);
    // game time follows real time even on a slow device (the host's clock is everybody's clock)
    const dt = Math.min(.25, (now - last) / 1000); last = now;
    if (window.__pouf) window.__fps = (window.__fps || 30) * .95 + (1 / Math.max(.001, dt)) * .05;
    if (!G.alive) return;
    const foot = G.match?.kind === 'foot';
    // a solo run also pauses while the console covers it (Control Center, home screen)
    if (G.match) G.match.update(dt, G.paused || (G.covered && lobby.members.length <= 1));
    else {
      G.menuT += dt;
      // idle crew: the occasional emote keeps the raft alive
      if (Math.random() < dt * .25 && arena.crew.size) { const ids = [...arena.crew.keys()]; arena.emote(ids[Math.floor(Math.random() * ids.length)], EMOTES[Math.floor(Math.random() * 4)].id); }
    }
    if (!foot || !G.match) arena.update(dt, G.match ? G.match.viewT ?? G.match.t : G.menuT);
    if (G.attached && el.isConnected) {
      stage.render();
      if (foot && G.match) G.match.updateTags(el.clientWidth, el.clientHeight);
      else arena.updateTags(el.clientWidth, el.clientHeight);
    }
  }

  // ---------------------------------------------------------------- console hooks
  const api = {
    attach() {
      G.attached = true;
      const r = el.getBoundingClientRect(); if (r.width) stage.resize(r.width, r.height);
      if (G.match && !G.layers.length) input.setPlaying(true);
      sound.music(true, { fast: !!G.match });
    },
    detach() {
      G.attached = false; input.setPlaying(false); G.closeAll();
      if (G.state === 'match' && lobby.members.length <= 1 && !G.match?.finished) G.paused = true;   // back with the pause menu
    },
    // another console layer (Control Center…) is over the game
    covered(v) { G.covered = v; if (v) input.setPlaying(false); },
    // the game layer is on top again (our menus were closed by the console): reopen the right one
    resumed() {
      // deferred: when this runs inside another menu change, that change has already pushed its own layer
      queueMicrotask(() => {
        if (!G.alive || G.opening || G.layers.length || nav.top?.pf) return;
        if (G.state !== 'match') G.openBase();
        else if (G.paused) { G.paused = false; G.openPause(); }
        else if (!G.match?.finished) input.setPlaying(true);
      });
    },
    // console actions reaching the game layer itself (during a run)
    onAction(a, ev) {
      if (a === 'ps') return false;
      if (G.state === 'match') {
        if (a === 'options' || (a === 'back' && ev?.type === 'keydown')) G.openPause();
        return true;
      }
      if (a === 'back') { G.openBase(); return true; }
      return true;
    },
    joinCode: code => G.joinCode(code),
    // the shared gameplay: a reduced copy of each rendered frame plus the game's sound. Works where the screen itself
    // cannot be captured (iPhone, iPad), since only the game's own canvas is read.
    shareSource() {
      const c = document.createElement('canvas'), g2 = c.getContext('2d');
      if (!c.captureStream || !g2) throw new Error('Ce navigateur ne permet pas de partager la partie.');
      const tap = gl => {
        const w = Math.max(2, Math.min(960, gl.width)), h = Math.max(2, Math.round(w * gl.height / Math.max(1, gl.width)));
        if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
        g2.drawImage(gl, 0, 0, w, h);
      };
      stage.taps.add(tap);
      const stream = c.captureStream(24);
      const audio = sound.shareTrack();
      return { video: stream.getVideoTracks()[0], audio, stop() { stage.taps.delete(tap); stream.getTracks().forEach(t => t.stop()); sound.unshare(); } };
    },
    destroy() { offParty(); G.destroy(); },
    G,
  };

  // build the first course, then the title (or straight into a lobby)
  arena.load(G.course);
  G.showcase();
  const r = el.getBoundingClientRect(); stage.resize(r.width || innerWidth, r.height || innerHeight);
  stage.render();
  raf = requestAnimationFrame(frame);
  loading.classList.add('out');
  setTimeout(() => loading.remove(), 600);
  sound.music(true);
  api.attach();
  const party = G.partyCode();
  if (opts.join) G.enterLobby({ join: cleanCode(opts.join) });
  else if (party) G.enterLobby({ party });
  else G.openBase();
  return api;
}
