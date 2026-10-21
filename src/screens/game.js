// Simulated game session: launch splash, cinematic "in-game" view, trophy unlock, suspend/resume.
import { byId, MEDIA } from '../data.js';
import { state, save } from '../state.js';
import { h, art, logo, img } from '../ui.js';
import { go, closeLayer, toast } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { bg } from '../bg.js';
import { input } from '../input.js';
import { unlockTrophy } from '../actions.js';
import { openControlCenter } from './cc.js';

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
    session.layer = go(ingameScreen, { id }, { replace: true, sound: null });
    toast({ title: `Bon jeu sur ${g.title}`, sub: 'Session simulée · appuyez sur PS pour le centre de contrôle', img: art.thumb(id), log: false });
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
  const root = h('div.ingame', h('div.bars'), h('div.hud-tl', logo(g)), cap);
  const timers = [];
  const layer = {
    root, shade: 0, mood: g.mood,
    bg: { img: frames[0][0], depth: frames[0][1] },
    hints: [['ps', 'Centre de contrôle'], ['options', 'Options']],
    onAction(a) {
      if (a === 'ps' || a === 'options') { openControlCenter({ ingame: id }); return true; }
      if (a === 'ok') input.rumble(.25, .15, 60);
      return true;
    },
    onEnter() {
      audio.duck(.55, 3);
      timers.push(setInterval(() => { k = (k + 1) % frames.length; bg.show(...frames[k]); }, 9000));
      timers.push(setTimeout(() => {
        const idx = g.trophies.findIndex((t, i) => t.t !== 'platinum' && !(state.trophies[id] || []).includes(i));
        if (idx >= 0) unlockTrophy(id, idx);
      }, 7000));
    },
    onResume() { audio.duck(.55, 1); bg.show(...frames[k]); },
    onLeave() { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); },
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
  session.layer = go(ingameScreen, { id: session.id }, { sound: null });
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
  session.id = null; session.layer = null;
  audio.duck(1, 1.5);
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
