// Game library: Installed / Your collection, sortable grid with download states.
import { byId } from '../data.js';
import { state, bus, installed, downloading, builtIn } from '../state.js';
import { h, icon, art, img, logo, size, ago } from '../ui.js';
import { menu, renderHints } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { openHub, play, uninstall, openProduct } from '../actions.js';
import { topRight } from './home.js';

const SORTS = [['recent', 'Récemment joué'], ['name', 'Nom (A-Z)'], ['size', 'Taille']];

export function libraryScreen() {
  let tab = 'installed', sort = 'recent';
  const tabEls = [['installed', 'Installé'], ['all', 'Votre collection']].map(([k, l]) => h('button.tab', { f: true, onok: () => setTab(k) }, h('span', l), h('span', { style: { opacity: .55, marginLeft: '.8rem' } })));
  const sortEl = h('button.chip', { f: true, onok: e => openSort(e.currentTarget) }, h('span.icw', { html: icon('sort') }), h('span'));
  const body = h('div.page', { 'data-scroll': 'y', 'data-pad': 160 });
  const root = h('div.library', h('div.page-head', h('h1', 'Bibliothèque'), h('div.tabs', tabEls), h('div', { style: { marginLeft: 'auto', display: 'flex', gap: '2rem', alignItems: 'center' } }, sortEl, topRight())), body);

  function list() {
    const ids = tab === 'installed' ? [...state.installed, ...state.downloads.map(d => d.id).filter(id => !state.installed.includes(id))] : [...state.owned];
    if (sort === 'name') ids.sort((a, b) => byId[a].title.localeCompare(byId[b].title, 'fr'));
    else if (sort === 'size') ids.sort((a, b) => byId[b].size - byId[a].size);
    else ids.sort((a, b) => (state.lastPlayed[b] || 0) - (state.lastPlayed[a] || 0));
    return ids;
  }
  function tile(id) {
    const g = byId[id], d = downloading(id);
    const sub = d ? `Téléchargement ${Math.round(d.p * 100)} %` : installed(id) ? `${size(g.size)} · ${ago(state.lastPlayed[id])}` : 'Non installé';
    const el = h('div.ptile', { f: true, 'data-id': id, onok: () => openHub(id) },
      h('div.pimg', img(art.thumb(id)), logo(g, 'tile-logo'), d ? h('div.badge-dl', { style: { position: 'absolute', left: '1rem', right: '1rem', bottom: '1rem', height: '.6rem', borderRadius: '.3rem', background: 'rgba(0,0,0,.55)', overflow: 'hidden' } }, h('i', { style: { display: 'block', height: '100%', background: '#fff', width: d.p * 100 + '%' } })) : null,
        !installed(id) && !d ? h('span.owned', { html: icon('download') }) : null),
      h('div.pname', g.title), h('div.gt-sub', sub));
    return el;
  }
  function render(keepId) {
    const ids = list();
    tabEls[0].lastChild.textContent = state.installed.length;
    tabEls[1].lastChild.textContent = state.owned.length;
    sortEl.lastChild.textContent = SORTS.find(s => s[0] === sort)[1];
    body.replaceChildren(ids.length ? h('div.grid', ids.map(tile)) : h('div.lib-empty', tab === 'installed' ? 'Aucun jeu installé. Téléchargez un jeu depuis votre collection.' : 'Votre collection est vide.'));
    if (keepId) { const el = body.querySelector(`[data-id="${keepId}"]`); if (el) nav.focus(el, { silent: true, instant: true }); }
  }
  function setTab(k) {
    if (k === tab) return;
    tab = k; audio.play('tab');
    tabEls.forEach((t, i) => t.classList.toggle('on', ['installed', 'all'][i] === k));
    render();
    nav.focus(tabEls[k === 'installed' ? 0 : 1], { silent: true });
  }
  function openSort(anchor) {
    menu(SORTS.map(([k, l]) => ({ label: l + (k === sort ? '  ✓' : ''), icon: 'sort', onok: () => { sort = k; render(); nav.focus(sortEl, { silent: true }); } })), anchor);
  }
  tabEls[0].classList.add('on');
  render();
  body.querySelector('[data-f]')?.setAttribute('data-autofocus', '');

  const onChange = e => {
    if (e.detail === 'downloads') {
      state.downloads.forEach(d => { const t = body.querySelector(`[data-id="${d.id}"]`); if (!t) return; const b = t.querySelector('.badge-dl i'); if (b) b.style.width = d.p * 100 + '%'; t.querySelector('.gt-sub').textContent = `Téléchargement ${Math.round(d.p * 100)} %`; });
      return;
    }
    if (['installed', 'owned', 'reset'].includes(e.detail)) render(layer.focused?.dataset.id);
  };
  bus.addEventListener('change', onChange);
  const layer = {
    root, mood: 'home', bg: null, shade: .9,
    hints: () => [['ok', 'Sélectionner'], ['back', 'Retour'], ['options', 'Options'], ['l1', 'Installé'], ['r1', 'Collection']],
    onAction(a) {
      if (a === 'l1') { setTab('installed'); return true; }
      if (a === 'r1') { setTab('all'); return true; }
      if (a === 'options') {
        const id = layer.focused?.dataset.id;
        if (!id) { openSort(sortEl); return true; }
        const items = [{ label: installed(id) ? 'Jouer' : downloading(id) ? 'Voir la progression' : 'Télécharger', icon: installed(id) ? 'play' : 'download', onok: () => play(id) },
          { label: 'Informations sur le jeu', icon: 'info', onok: () => openProduct(id) }];
        if (installed(id) && !builtIn(id)) items.push({ label: 'Supprimer', icon: 'trash', onok: () => uninstall(id) });
        menu(items, layer.focused);
        return true;
      }
    },
    onLeave: () => bus.removeEventListener('change', onChange),
  };
  return layer;
}
