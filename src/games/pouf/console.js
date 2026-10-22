// Console side of Pouf Party: the full-screen layer that hosts the game, its lazy loading,
// the Control Center button, and invitation links (…#pouf=CODE).
import { h } from '../../ui.js';
import { nav } from '../../nav.js';
import { dialog, toast } from '../../shell.js';
import { session } from '../../session.js';
import { state } from '../../state.js';
import { voice } from '../../rtc.js';
import './console.css';

export const GAME_ID = 'pouf-party';
let game = null, loading = null, pendingJoin = null;
const holder = h('div.pf-game');

// Layer factory used by the console when the game is launched or resumed.
export function screen({ id }) {
  const root = h('div.pf-root', holder);
  let off = null;
  const layer = {
    root, opaque: true, shade: 0, noHints: true, bg: null, mood: null,
    hints: [],
    onEnter() {
      document.documentElement.classList.add('pf-playing');
      // the game's own menus are layers above this one; anything else (Control Center…) covers the game
      off = nav.onChange(top => game?.covered(!!top && top !== layer && !top.pf));
      if (game) { game.attach(); game.resumed(); }
      else boot();
    },
    onResume() { document.documentElement.classList.add('pf-playing'); game?.attach(); game?.resumed(); },
    onLeave() { off?.(); off = null; document.documentElement.classList.remove('pf-playing'); game?.detach(); },
    onAction(a, ev) {
      if (a === 'ps') { import('../../screens/cc.js').then(m => m.openControlCenter({ ingame: id })); return true; }
      return game ? game.onAction(a, ev) !== false : true;
    },
    back() {},
  };
  return layer;
}
// While the console tears the layer down (the root is removed later), the game element must survive:
// it is moved into the next layer's root on resume.

async function boot() {
  if (loading) return loading;
  const user = session.current || { id: 'local-guest', psn: 'Joueur', avatar: GAME_ID };
  loading = (async () => {
    try {
      const [{ createGame }, { unlockTrophy }] = await Promise.all([import('./game.js'), import('../../actions.js')]);
      const join = pendingJoin; pendingJoin = null;
      game = await createGame({
        el: holder, user, opts: { join },
        exit: () => import('../../screens/game.js').then(m => m.endSession()),
        trophy: i => {
          unlockTrophy(GAME_ID, i);
          // the platinum comes with every other trophy
          const got = state.trophies[GAME_ID] || [];
          if ([0, 1, 2, 3, 4].every(k => got.includes(k))) unlockTrophy(GAME_ID, 5);
        },
      });
      voice.gameSource = () => game.shareSource();   // « Partager la partie » in the call controls
      document.dispatchEvent(new Event('pf:share'));
    } catch (e) {
      console.error(e);
      holder.replaceChildren(h('div.pf-fail', h('h2', 'Pouf Party n’a pas pu démarrer'), h('p', 'Votre appareil ou votre navigateur ne permet peut-être pas l’affichage 3D (WebGL).'), h('code', String(e?.message || e))));
      toast({ title: 'Impossible de lancer le jeu', sub: String(e?.message || e).slice(0, 80), icon: 'info', sound: 'error', log: false });
    } finally { loading = null; }
  })();
  return loading;
}

// Called by the console when the session ends (Close the game, power off…).
export function end() {
  if (voice.sharing === 'game') voice.stopShare();
  voice.gameSource = null;
  document.dispatchEvent(new Event('pf:share'));
  game?.destroy(); game = null;
  holder.replaceChildren();
  document.documentElement.classList.remove('pf-playing');
}

// Invitation links: ask, then launch the game straight into the friend's lobby.
export function checkLink() {
  const code = (location.hash.match(/pouf=([A-Za-z0-9]{5})/) || [])[1];
  if (!code || !session.current) return;
  history.replaceState(null, '', location.pathname + location.search);
  const c = code.toUpperCase();
  dialog({ title: `Rejoindre la partie ${c} ?`, body: 'Un ami vous invite à jouer à Pouf Party.', actions: [
    { label: 'Rejoindre', icon: 'play', primary: true, onok: () => joinFromLink(c) },
    { label: 'Annuler', sound: 'back' }] });
}
export const joinGameCode = code => joinFromLink(code);
async function joinFromLink(code) {
  if (game) { const { session: s, resume } = await import('../../screens/game.js'); if (s.id === GAME_ID) resume(); game.joinCode(code); return; }
  pendingJoin = code;
  const { play } = await import('../../actions.js');
  play(GAME_ID);
}
addEventListener('hashchange', checkLink);
document.addEventListener('session:change', () => setTimeout(checkLink, 1900));
export const isRunning = () => !!game;
