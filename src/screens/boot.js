// Power-on sequence, user selection, rest mode / shutdown / restart.
import { GAMES } from '../data.js';
import { recentGames, installed } from '../state.js';
import { h, icon, art, img, wait } from '../ui.js';
import { resetTo, closeLayer, toast, go, menu, loadNav, clearNav, navExtras } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { input, IOS, lifelog } from '../input.js';
import { net } from '../net.js';
import { session } from '../session.js';
import { homeScreen } from './home.js';
import { accountScreen } from './account.js';

// original emblem: an open orbit with a satellite, drawn as it lights up
const EMBLEM = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37.6 12.4A17 17 0 1 0 41 24"/><path d="M31 18.6A9 9 0 1 0 33 24" opacity=".55"/><circle cx="38.2" cy="13" r="2.6" fill="currentColor" stroke="none"/></svg>';
const glyphs = cls => h(`div.glyphs3d.${cls}`, h('span', { html: EMBLEM }));

// Preload what the first screens need; resolves with progress callbacks.
function preload(onProgress) {
  const pics = new Set([...GAMES.map(g => g.id), ...session.known().map(u => u.avatar).filter(Boolean)]);
  const urls = [...[...pics].map(id => art.thumb(id)), ...recentGames().slice(0, 3).flatMap(id => [art.hero(id), art.depth(id)])];
  let done = 0;
  const tick = () => onProgress(++done / (urls.length + 1));
  const imgs = urls.map(u => new Promise(res => { const i = new Image(); i.onload = i.onerror = () => { tick(); res(); }; i.src = u; }));
  const fonts = (document.fonts?.ready || Promise.resolve()).then(tick);
  return Promise.race([Promise.all([...imgs, fonts]), wait(8000)]);
}

export function bootScreen({ auto = false } = {}) {
  let started = false;
  const fill = h('i', { style: { width: '0%' } });
  const press = h('div.press', glyphs('idle'),
    h('p', IOS ? 'Appuyez sur ✕, sur une touche ou touchez l’écran' : 'Appuyez sur le bouton PS de votre manette'),
    IOS ? null : h('p.press-alt', 'ou sur une touche du clavier, ou touchez l’écran'),
    h('div.load', fill),
    h('p.disc', 'Concept d’interface non officiel inspiré de la PS5 · non affilié à Sony Interactive Entertainment · jeux et visuels fictifs'));
  const root = h('div.boot', press);
  const ready = preload(p => { fill.style.width = Math.round(p * 100) + '%'; });
  // in parallel: is the online service reachable, and is there still a valid session cookie?
  const account = net.probe().then(m => (m === 'online' ? net.me().catch(() => null) : null));

  async function start() {
    if (started) return;
    started = true;
    audio.init();
    input.rumble(.5, .3, 160);
    press.remove();
    const anim = h('div.boot-anim', h('div.flare'), glyphs('play'), h('div.word', 'Console UI · Concept'));
    root.append(anim);
    audio.play('boot');
    await Promise.all([wait(4200), ready, account]);
    root.classList.add('boot-out');
    await wait(700);
    routeAfterBoot(auto);
  }
  root.addEventListener('pointerdown', start);
  if (auto) setTimeout(start, 300);
  return {
    root, bg: null, noHints: true, shade: 0, opaque: true,
    onAction: () => { start(); return true; },
    back() {},
  };
}

// After iOS discarded the tab, come straight back without the power-on sequence.
export function resumeScreen() {
  const account = net.probe().then(m => (m === 'online' ? net.me().catch(() => null) : null));
  const root = h('div.boot', h('div.press', glyphs('idle'), h('p', 'Reprise de votre session…')));
  account.then(() => routeAfterBoot(true));
  // never leave the player on this screen: after a few seconds a tap starts afresh
  const since = Date.now();
  const retry = () => { if (Date.now() - since > 6000 && nav.top?.root === root) { clearNav(); routeAfterBoot(false); } return true; };
  root.addEventListener('pointerdown', retry);
  return { root, bg: null, noHints: true, shade: 0, opaque: true, onAction: retry, back() {} };
}

// Where to go once the console has started: resume an interrupted session, pick a user, or create the first account.
async function routeAfterBoot(auto) {
  try { await chooseRoute(auto); }
  catch (e) {
    // a broken snapshot (screen or game that no longer exists…) must not block the start: forget it and pick a user
    console.error('start failed', e);
    lifelog({ type: 'start-error', message: String(e?.message || e).slice(0, 120) });
    clearNav();
    if (nav.layers.some(l => l.root.classList.contains('home'))) return;   // the home screen is up: keep it
    try { resetTo(session.known().length || net.user ? usersScreen : accountScreen, session.known().length || net.user ? {} : { mode: 'signup', first: true }); }
    catch (e2) { console.error(e2); }
  }
}
async function chooseRoute(auto) {
  const snap = loadNav();
  const known = session.known();
  const me = net.user;
  const local = snap && known.find(k => k.id === snap.user && k.id.startsWith('local-'));
  if (snap && ((me && snap.user === me.id) || local)) return enterHome(me && snap.user === me.id ? me : local, !!(me && snap.user === me.id), { restore: snap });
  if (auto && me && session.lastId() === me.id) return enterHome(me, true);
  if (!known.length && !me) return resetTo(accountScreen, { mode: 'signup', first: true });
  resetTo(usersScreen, {});
}

export async function enterHome(user, online, { restore = null, quiet = false } = {}) {
  setTimeout(() => import('../social.js').then(m => m.checkSalonLink()), restore ? 2500 : 1800);
  session.use(user, online);
  navExtras.user = user.id;
  if (online) net.connect(); else net.disconnect();
  if (!quiet && !restore) {
    const w = resetTo(() => ({ root: h('div.users', h('div.avatar.welcome-av', img(art.thumb(user.avatar))), h('div.welcome', `Bienvenue, ${user.psn}`)), bg: null, noHints: true, shade: .4, onAction: () => true }), {});
    audio.play('notify');
    await wait(1400);
    if (!nav.layers.includes(w)) return;
  }
  resetTo(homeScreen, {});
  if (!restore) return;
  // put back the screens that were open before iOS interrupted the page
  const { ROUTES } = await import('../routes.js');
  for (const r of restore.routes || []) {
    const f = ROUTES[r.name];
    if (f) try { go(f, r.params, { sound: null }); } catch (e) { console.warn('restore failed', r, e); }
  }
  if (restore.game && installed(restore.game)) {
    const g = await import('./game.js');
    g.session.id = restore.game; g.session.started = Date.now();
    g.resume();
  }
  toast({ title: 'Session reprise', sub: 'Vous êtes revenu là où vous étiez', icon: 'refresh', sound: null, log: false });
  lifelog({ type: 'restored', screens: (restore.routes || []).length, game: restore.game || null });
  if (restore.salon) { const { social } = await import('../social.js'); await social.restoreSalon(restore.salon); }
  // the microphone cannot be reopened without a tap on iOS: ask before rejoining the call
  if (restore.voice && (restore.party || restore.salon)) {
    const [{ social }, { dialog }] = await Promise.all([import('../social.js'), import('../shell.js')]);
    setTimeout(() => { if (social.party) dialog({ title: 'Revenir dans le chat vocal ?', body: 'L’appel de votre groupe a été interrompu quand l’application est passée en arrière-plan.', actions: [{ label: 'Rejoindre le vocal', icon: 'mic', primary: true, onok: () => social.joinVoice() }, { label: 'Plus tard', sound: 'back' }] }); }, 1200);
  }
}

export function usersScreen({ switching = false } = {}) {
  const known = session.known();
  const me = net.user;
  const list = me && !known.some(k => k.id === me.id) ? [{ ...me, online: true }, ...known] : known;
  const status = u => u.id.startsWith('local-') ? 'Profil hors ligne' : me?.id === u.id ? 'Connecté' : 'Connexion requise';
  const row = h('div.users-row', { 'data-row': '' },
    list.map(u => h('div.user', { f: true, 'data-id': u.id, 'data-autofocus': (session.current?.id || me?.id || session.lastId()) === u.id ? '' : null, onok: () => pick(u) },
      h('div.avatar', img(art.thumb(u.avatar))), h('div.un', u.psn), h('div.us', status(u)))),
    h('div.user', { f: true, onok: () => go(accountScreen, { mode: 'signup' }) },
      h('div.avatar.add', { html: icon('plus') }), h('div.un', 'Ajouter'), h('div.us', 'Nouvel utilisateur')));
  const root = h('div.users', h('h1', 'Qui utilise cette manette ?'), row);
  let picked = false;
  function pick(u) {
    if (picked) return;
    audio.play('ok');
    if (u.id.startsWith('local-')) { picked = true; return enterHome(u, false); }
    if (me?.id === u.id) { picked = true; return enterHome(me, true); }
    if (net.mode !== 'online') { toast({ title: 'Serveur injoignable', sub: 'Impossible de se connecter à ce compte pour le moment', icon: 'wifi', sound: 'error', log: false }); return; }
    go(accountScreen, { mode: 'login', psn: u.psn });
  }
  const layer = {
    root, bg: null, mood: 'home', shade: .4,
    hints: [['ok', 'Sélectionner'], ['options', 'Options'], ...(switching ? [['back', 'Retour']] : [])],
    onAction(a) {
      if (a === 'options') {
        const id = layer.focused?.dataset.id;
        if (id) menu([{ label: 'Retirer de cette console', icon: 'trash', onok: () => { session.forget(id); resetTo(usersScreen, { switching }); } }], layer.focused);
        return true;
      }
      if (['up', 'down', 'left', 'right', 'ok'].includes(a)) return false;
      if (a === 'back' && switching) return false;
      return true;
    },
  };
  return layer;
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
