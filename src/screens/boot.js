// Power-on sequence, user selection, rest mode / shutdown / restart.
import { GAMES, USERS } from '../data.js';
import { state, save, recentGames } from '../state.js';
import { h, icon, art, img, wait } from '../ui.js';
import { resetTo, closeLayer, toast, renderHints } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { bg } from '../bg.js';
import { input } from '../input.js';
import { homeScreen } from './home.js';

// original emblem: an open orbit with a satellite, drawn as it lights up
const EMBLEM = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37.6 12.4A17 17 0 1 0 41 24"/><path d="M31 18.6A9 9 0 1 0 33 24" opacity=".55"/><circle cx="38.2" cy="13" r="2.6" fill="currentColor" stroke="none"/></svg>';
const glyphs = cls => h(`div.glyphs3d.${cls}`, h('span', { html: EMBLEM }));

// Preload what the first screens need; resolves with progress callbacks.
function preload(onProgress) {
  const urls = [...GAMES.map(g => art.thumb(g.id)), ...recentGames().slice(0, 3).flatMap(id => [art.hero(id), art.depth(id)])];
  let done = 0;
  const tick = () => onProgress(++done / (urls.length + 1));
  const imgs = urls.map(u => new Promise(res => { const i = new Image(); i.onload = i.onerror = () => { tick(); res(); }; i.src = u; }));
  const fonts = (document.fonts?.ready || Promise.resolve()).then(tick);
  return Promise.race([Promise.all([...imgs, fonts]), wait(8000)]);
}

export function bootScreen({ auto = false } = {}) {
  let started = false;
  const fill = h('i', { style: { width: '0%' } });
  const press = h('div.press', glyphs('idle'), h('p', 'Appuyez sur une touche, un bouton ou touchez l’écran'), h('div.load', fill),
    h('p.disc', 'Concept d’interface non officiel inspiré de la PS5 · non affilié à Sony Interactive Entertainment · jeux et visuels fictifs'));
  const root = h('div.boot', press);
  const ready = preload(p => { fill.style.width = Math.round(p * 100) + '%'; });

  async function start() {
    if (started) return;
    started = true;
    audio.init();
    input.rumble(.5, .3, 160);
    press.remove();
    const anim = h('div.boot-anim', h('div.flare'), glyphs('play'), h('div.word', 'Console UI · Concept'));
    root.append(anim);
    audio.play('boot');
    await Promise.all([wait(4200), ready]);
    root.classList.add('boot-out');
    await wait(700);
    resetTo(state.user && auto ? homeScreen : usersScreen, {});
  }
  root.addEventListener('pointerdown', start);
  if (auto) setTimeout(start, 300);
  return {
    root, bg: null, noHints: true, shade: 0, opaque: true,
    onAction: () => { start(); return true; },
    back() {},
  };
}

export function usersScreen({ switching = false } = {}) {
  const row = h('div.users-row', { 'data-row': '' },
    USERS.map(u => h('div.user', { f: true, 'data-autofocus': (state.user || USERS[0].id) === u.id ? '' : null, onok: () => pick(u) },
      h('div.avatar', img(art.thumb(u.avatar))), h('div.un', u.name), h('div.us', u.psn))),
    h('div.user', { f: true, onok: () => toast({ title: 'Ajouter un utilisateur', sub: 'La création de compte est simulée dans cette démo', icon: 'user', sound: 'error', log: false }) },
      h('div.avatar.add', { html: icon('plus') }), h('div.un', 'Ajouter'), h('div.us', 'Nouvel utilisateur')));
  const root = h('div.users', h('h1', 'Qui utilise cette manette ?'), row);
  let picked = false;
  async function pick(u) {
    if (picked) return;
    picked = true;
    audio.play('ok');
    state.user = u.id; save('user');
    root.replaceChildren(h('div.welcome', `Bienvenue, ${u.name}`));
    audio.play('notify');
    await wait(1300);
    resetTo(homeScreen, {});
  }
  return {
    root, bg: null, mood: 'home', shade: .4,
    hints: switching ? [['ok', 'Sélectionner'], ['back', 'Retour']] : [['ok', 'Sélectionner']],
    onAction(a) { if (['up', 'down', 'left', 'right', 'ok'].includes(a)) return false; if (a === 'back' && switching) return false; return true; },
  };
}

export function powerScreen({ mode }) {
  const root = h(`div.rest${mode === 'rest' ? '' : '.off'}`, h('div.led'), h('p', mode === 'rest' ? 'Mode repos · appuyez sur une touche pour réveiller la console' : mode === 'off' ? 'Console éteinte · appuyez sur une touche pour l’allumer' : ''));
  let waking = false;
  audio.duck(0, .6);
  const wake = () => {
    if (waking) return;
    waking = true;
    audio.init();
    if (mode === 'rest') { audio.play('wake'); audio.duck(1, 2); closeLayer(layer); }
    else { audio.duck(1, .1); resetTo(bootScreen, { auto: true }); }
  };
  root.addEventListener('pointerdown', wake);
  if (mode === 'restart') setTimeout(() => { waking = true; audio.duck(1, .1); resetTo(bootScreen, { auto: true }); }, 1800);
  const layer = { root, opaque: true, noHints: true, shade: 0, bg: undefined, onAction: () => { if (mode !== 'restart') wake(); return true; }, back() {} };
  return layer;
}
