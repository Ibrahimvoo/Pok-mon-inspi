// Simulated game session: launch splash, cinematic "in-game" view, trophy unlock, suspend/resume.
import { byId, MEDIA } from '../data.js';
import { state, save } from '../state.js';
import { h, art, logo, img } from '../ui.js';
import { go, closeLayer, toast, navExtras, saveNav } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { bg } from '../bg.js';
import { input, stick } from '../input.js';
import { social } from '../social.js';
import { voice } from '../rtc.js';
import { session as account } from '../session.js';
import { unlockTrophy } from '../actions.js';
import { openControlCenter } from './cc.js';
import { playable } from '../games/registry.js';

export const session = { id: null, layer: null, started: 0 };

export function launch(id) {
  const g = byId[id];
  audio.play('launch');
  input.rumble(.7, .4, 260);
  if (session.id === id) return resume();
  if (session.id) endSession();
  audio.duck(0, .8);
  bg.preload([art.hero(id), art.depth(id), art.shot(id, 1), art.shot(id, 2)]);
  const splash = go(launchScreen, { id }, { sound: null });
  setTimeout(() => {
    if (!nav.layers.includes(splash)) return;
    session.id = id; session.started = Date.now();
    state.lastPlayed[id] = Date.now(); save('played');
    const real = playable(id);
    session.layer = go(real ? real.screen : ingameScreen, { id }, { replace: true, sound: null });
    social.setPresence('game', id);
    navExtras.game = id; saveNav();
    // playing while in a party opens a shared session: the other members are asked to join
    if (social.party && social.party.game?.id !== id) social.startGame(id);
    toast({ title: `Bon jeu sur ${g.title}`, sub: social.party ? 'Session multijoueur ouverte à votre groupe' : real ? 'Centre de contrôle : bouton PS' : 'Session simulée · centre de contrôle : bouton PS', img: art.thumb(id), log: false });
  }, 3300);
}

function launchScreen({ id }) {
  const g = byId[id];
  const root = h('div.launch', img(art.hero(id)), logo(g), h('div.loading', h('div.spinner'), 'Chargement…'));
  return { root, opaque: true, noHints: true, back() {}, onAction: () => true };
}

function ingameScreen({ id }) {
  const g = byId[id];
  const frames = [[art.hero(id), art.depth(id)], [art.shot(id, 1)], [art.shot(id, 2)]];
  let k = 0;
  const cap = h('div.cap', g.tagline, h('small', 'Démo simulée — aucun jeu réel n’est lancé'));
  const mp = mpOverlay(id);
  const root = h('div.ingame', h('div.bars'), h('div.hud-tl', logo(g)), cap, mp.el);
  const timers = [];
  const musicLevel = () => (voice.active ? 0 : .55); // keep the speaker quiet during a call
  const layer = {
    root, shade: 0, mood: g.mood,
    bg: { img: frames[0][0], depth: frames[0][1] },
    hints: [['ps', 'Centre de contrôle'], ['options', 'Options']],
    onAction(a) {
      if (a === 'ps' || a === 'options') { openControlCenter({ ingame: id }); return true; }
      if (a === 'ok') { if (mp.active) mp.ping(); else input.rumble(.25, .15, 60); }
      return true;
    },
    onEnter() {
      mp.start();
      audio.duck(musicLevel(), 3);
      timers.push(setInterval(() => { k = (k + 1) % frames.length; bg.show(...frames[k]); }, 9000));
      timers.push(setTimeout(() => {
        const idx = g.trophies.findIndex((t, i) => t.t !== 'platinum' && !(state.trophies[id] || []).includes(i));
        if (idx >= 0) unlockTrophy(id, idx);
      }, 7000));
    },
    onResume() { audio.duck(musicLevel(), 1); bg.show(...frames[k]); },
    onLeave() { mp.stop(); timers.forEach(t => { clearInterval(t); clearTimeout(t); }); },
  };
  return layer;
}

export function resume() {
  if (!session.id) return;
  const L = session.layer;
  if (L && nav.layers.includes(L)) {
    for (const l of [...nav.layers].reverse()) { if (l === L) break; closeLayer(l, { silent: true }); }
    return;
  }
  session.layer = go(playable(session.id)?.screen || ingameScreen, { id: session.id }, { sound: null });
}

export function suspendToHome() {
  // keep the session alive but return to the home screen
  const L = session.layer;
  for (const l of [...nav.layers].reverse()) {
    if (nav.layers.length <= 1) break;
    closeLayer(l, { silent: true });
  }
  if (L) session.layer = null;
  audio.duck(1, 1.5);
}

export function endSession() {
  if (!session.id) return;
  const id = session.id;
  const minutes = (Date.now() - session.started) / 60000;
  state.playTime[id] = (state.playTime[id] || 0) + Math.max(1, Math.round(minutes));
  state.lastPlayed[id] = Date.now();
  save('played');
  if (session.layer && nav.layers.includes(session.layer)) closeLayer(session.layer);
  playable(id)?.end();
  session.id = null; session.layer = null;
  if (social.party?.game?.id === id && social.party.game.by === account.current?.id) social.stopGame();
  social.setPresence('home');
  navExtras.game = null; saveNav();
  audio.duck(voice.active ? 0 : 1, 1.5);
}

// ---------------------------------------------------------------- shared in-game layer
// Every party member playing the same game sees the others' reticles move live and their pings (✕ / tap).
function mpOverlay(gameId) {
  const el = h('div.mp.hidden');
  const hud = h('div.mp-hud');
  el.append(hud);
  const cursors = new Map();
  const me = { x: .5, y: .55 };
  let raf = 0, lastSent = 0, dirty = true, offs = [], active = false;
  const mine = makeCursor(account.current || { psn: 'Vous', avatar: gameId }, true);
  function makeCursor(u, isMe) {
    const c = h(`div.mp-cur${isMe ? '.mine' : ''}`, h('div.avatar', img(art.thumb(u.avatar))), h('span', isMe ? 'Vous' : u.psn));
    el.append(c);
    return c;
  }
  const place = (c, x, y) => { c.style.left = (x * 100).toFixed(2) + '%'; c.style.top = (y * 100).toFixed(2) + '%'; };
  function ripple(x, y, isMe) { const r = h(`div.mp-ping${isMe ? '.mine' : ''}`); place(r, x, y); el.append(r); setTimeout(() => r.remove(), 1000); }
  function sync() {
    const p = social.party;
    active = !!(p && p.game?.id === gameId && p.members.length > 1);
    el.classList.toggle('hidden', !active);
    if (!active) return;
    const others = p.members.filter(m => m.id !== account.current?.id);
    cursors.forEach((c, id) => { if (!others.some(o => o.id === id)) { c.remove(); cursors.delete(id); } });
    others.forEach(o => { if (!cursors.has(o.id)) { const c = makeCursor(o, false); c.classList.add('idle'); place(c, .5, .5); cursors.set(o.id, c); } cursors.get(o.id).classList.toggle('away', !o.online); });
    hud.replaceChildren(h('b', `Session multijoueur · ${p.members.length} joueurs`), h('div.mp-avs', p.members.map(m => h('div.avatar', { title: m.psn }, img(art.thumb(m.avatar))))), h('small', 'Déplacez votre viseur · ✕ ou toucher pour envoyer un signal'));
    dirty = true;
  }
  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (!active) return;
    if (Math.abs(stick.x) > .05 || Math.abs(stick.y) > .05) {
      me.x = Math.min(1, Math.max(0, me.x + stick.x * .011)); me.y = Math.min(1, Math.max(0, me.y + stick.y * .011)); dirty = true;
    }
    if (dirty) { place(mine, me.x, me.y); if (t - lastSent > 66) { social.sendGame(me.x, me.y, 0); lastSent = t; dirty = false; } }
  }
  const onPointer = e => { if (!active) return; me.x = e.clientX / innerWidth; me.y = e.clientY / innerHeight; dirty = true; };
  const onTap = e => { if (!active || e.target.closest('#hud')) return; onPointer(e); api.ping(); };
  const api = {
    el,
    get active() { return active; },
    ping() { ripple(me.x, me.y, true); social.sendGame(me.x, me.y, 1); audio.play('key'); input.rumble(.2, .2, 50); },
    start() {
      offs.push(social.on('party', sync), social.on('g', m => {
        const c = cursors.get(m.from); if (!c) return;
        c.classList.remove('idle'); place(c, m.x, m.y);
        if (m.p) { ripple(m.x, m.y, false); audio.play('move'); }
      }));
      addEventListener('pointermove', onPointer, { passive: true });
      addEventListener('pointerdown', onTap);
      sync(); raf = requestAnimationFrame(loop);
    },
    stop() { cancelAnimationFrame(raf); offs.forEach(f => f()); offs = []; removeEventListener('pointermove', onPointer); removeEventListener('pointerdown', onTap); },
  };
  return api;
}

export function openMediaApp(id) {
  const m = MEDIA.find(x => x.id === id);
  audio.play('launch');
  go(() => {
    const root = h('div.media-app.solid-bg',
      h('div', h('div.mark', { style: { background: m.color } }, m.mark), h('h1', m.title),
        h('p', `${m.kind} · application simulée, aucun contenu n’est diffusé.`),
        h('button.btn.primary', { f: true, 'data-autofocus': '', onok: () => nav.top.back() }, 'Revenir à l’accueil')));
    return { root, opaque: true, bg: null, mood: 'home' };
  }, {}, { sound: null });
}
