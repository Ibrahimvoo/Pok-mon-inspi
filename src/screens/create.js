// "Créer" (Share/Create button): screenshots, recordings and the media gallery.
import { byId } from '../data.js';
import { state, save } from '../state.js';
import { h, icon, art, img, ago } from '../ui.js';
import { go, toast, closeLayer, renderHints, dialog, confirmDialog } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { input } from '../input.js';
import { session as game } from './game.js';

let recording = null;   // { start, game, timer, el }
let open = null;

// what is on screen right now: the running game, otherwise the art behind the home screen
function context() {
  const id = game.id || document.querySelector('.tile.sel img')?.src.match(/art\/([\w-]+)-t\.webp/)?.[1] || null;
  return id && byId[id] ? id : null;
}
function flash() {
  const f = h('div.capture-flash');
  document.getElementById('hud').append(f);
  setTimeout(() => f.remove(), 600);
}
function add(kind, gameId, extra = {}) {
  state.captures.unshift({ id: Date.now().toString(36), kind, game: gameId, t: Date.now(), ...extra });
  state.captures.length = Math.min(state.captures.length, 60);
  save('captures');
}
export function screenshot() {
  const id = context();
  flash(); audio.play('key'); input.rumble(.3, .1, 60);
  add('shot', id, { frame: game.id ? Math.floor(Math.random() * 3) : 0 });
  if (state.settings.captureToast) toast({ title: 'Capture d’écran enregistrée', sub: id ? byId[id].title : 'Écran d’accueil', img: id ? art.thumb(id) : null, icon: 'display', sound: null, log: false });
}
function toggleRecording() {
  if (recording) {
    const dur = Math.round((Date.now() - recording.start) / 1000);
    clearInterval(recording.timer); recording.el.remove();
    add('video', recording.game, { dur });
    toast({ title: 'Vidéo enregistrée', sub: `${Math.floor(dur / 60)}:${String(dur % 60).padStart(2, '0')} · Galerie multimédia`, icon: 'play', log: false });
    recording = null;
    return;
  }
  const el = h('div.rec-pill', h('i'), h('span', '0:00'));
  document.getElementById('hud').append(el);
  recording = { start: Date.now(), game: context(), el, timer: setInterval(() => { const s = Math.round((Date.now() - recording.start) / 1000); el.lastChild.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (s >= 300) toggleRecording(); }, 1000) };
  audio.play('ok');
}

export function openCreateMenu() {
  if (open) { open.back(); return; }
  const item = (ic, title, sub, fn) => h('div.create-item', { f: true, onok: () => { layer.back(false); fn(); } }, h('span.icw', { html: icon(ic) }), h('b', title), sub && h('small', sub));
  const root = h('div.overlay.create', h('div.create-wrap', h('h3', 'Créer'), h('div.create-row', { 'data-row': '' },
    item('display', 'Capture d’écran', 'Enregistrer l’image affichée', screenshot),
    item(recording ? 'close' : 'play', recording ? 'Arrêter l’enregistrement' : 'Démarrer un nouvel enregistrement', recording ? 'La vidéo sera ajoutée à la galerie' : 'Jusqu’à 5 minutes', toggleRecording),
    item('grid', 'Galerie multimédia', `${state.captures.length} élément${state.captures.length > 1 ? 's' : ''}`, () => go(galleryScreen)))));
  const layer = {
    root, hints: [['ok', 'Sélectionner'], ['back', 'Fermer'], ['create', 'Fermer']],
    back(sound = true) { closeLayer(layer); open = null; if (sound) audio.play('back'); },
    onAction(a) { if (a === 'create') { layer.back(); return true; } if (a === 'square') { layer.back(false); screenshot(); return true; } },
  };
  open = layer;
  root.classList.add('in');
  document.getElementById('app').append(root);
  nav.push(layer);
  renderHints();
  audio.play('open');
}

export function galleryScreen() {
  const grid = h('div.grid.gallery');
  function render() {
    grid.replaceChildren(...(state.captures.length ? state.captures.map(c => {
      const src = c.game ? (c.kind === 'shot' && c.frame ? art.shot(c.game, c.frame) : art.hero(c.game)) : null;
      return h('div.ptile.cap', { f: true, 'data-id': c.id, onok: () => view(c, src) },
        h('div.pimg.wide', src ? img(src) : h('div.cap-home', { html: icon('home') }), c.kind === 'video' ? h('span.tag', `▶ ${Math.floor(c.dur / 60)}:${String(c.dur % 60).padStart(2, '0')}`) : null),
        h('div.pname', c.game ? byId[c.game].title : 'Écran d’accueil'), h('div.gt-sub', `${c.kind === 'video' ? 'Vidéo' : 'Capture'} · ${ago(c.t)}`));
    }) : [h('div.lib-empty', 'Aucune capture. Appuyez sur le bouton Créer (Share) ou sur la touche C pour en réaliser une.')]));
  }
  function view(c, src) {
    dialog({ title: c.game ? byId[c.game].title : 'Écran d’accueil', wide: true, body: h('div.cap-view', src ? img(src) : null, h('div.sim-note', c.kind === 'video' ? `Vidéo de ${c.dur} s (aperçu fixe)` : 'Capture d’écran')),
      actions: [{ label: 'Fermer', primary: true, sound: 'back' }, { label: 'Supprimer', icon: 'trash', onok: () => confirmDialog('Supprimer cette capture ?', 'Elle sera retirée de la galerie.', 'Supprimer', () => { state.captures = state.captures.filter(x => x.id !== c.id); save('captures'); render(); nav.focusFirst(); }, { danger: true }) }] });
  }
  render();
  const root = h('div.library', h('div.page-head', h('h1', 'Galerie multimédia')), h('div.page', { 'data-scroll': 'y', 'data-pad': 160 }, grid));
  return { root, bg: null, mood: 'home', shade: .9, hints: [['ok', 'Afficher'], ['back', 'Retour']] };
}
