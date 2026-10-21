// Home screen: Games / Media tabs, the anchored tile row and the contextual hub underneath.
import { GAMES, byId, MEDIA } from '../data.js';
import { session } from '../session.js';
import { state, bus, recentGames, downloading, finalPrice } from '../state.js';
import { h, icon, art, img, logo, price } from '../ui.js';
import { go, menu, renderHints, timeStr } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { bg } from '../bg.js';
import { renderHub, gameMenu } from './hub.js';
import { play, openProduct, openHub } from '../actions.js';
import { session as game, openMediaApp } from './game.js';
import { storeScreen } from './store.js';
import { libraryScreen } from './library.js';
import { searchScreen } from './search.js';
import { settingsScreen } from './settings.js';
import { profileScreen } from './profile.js';
import { usersScreen } from './boot.js';

const STEP = 13.2; // small tile + gap, in rem

export function topRight({ cart = false } = {}) {
  const user = session.current || { avatar: GAMES[0].id, psn: '' };
  const av = h(`div.avatar.tb-avatar${user.online ? '' : '.offline'}`, { f: true, title: user.psn, onok: e => menu([
    { label: 'Profil', icon: 'user', onok: () => go(profileScreen) },
    { label: 'Base de jeu', icon: 'friends', onok: () => import('./gamebase.js').then(m => go(m.gamebaseScreen)) },
    { label: 'Changer d’utilisateur', icon: 'refresh', onok: () => go(usersScreen, { switching: true }) },
  ], e.currentTarget) }, img(art.thumb(user.avatar)));
  return h('div.tb-right',
    h('button.round', { f: true, html: icon('search'), title: 'Rechercher', onok: () => go(searchScreen) }),
    cart || null,
    h('button.round', { f: true, html: icon('settings'), title: 'Paramètres', onok: () => go(settingsScreen) }),
    av,
    h('div.clock', { 'data-clock': '' }, timeStr()));
}

export function homeScreen() {
  let tab = 'games', items = [], sel = 0, hub = null, panelT = 0, bgT = 0, dirty = false;
  const tabEls = [['games', 'Jeux'], ['media', 'Multimédia']].map(([k, label]) =>
    h('button.tab', { f: true, onok: () => setTab(k) }, label));
  const row = h('div.row', { 'data-row': '', 'data-stop': '', 'data-group': 'row' });
  const panel = h('div.home-panel');
  const scroll = h('div.home-scroll', { 'data-scroll': 'y', 'data-pad': 200 }, h('div.row-wrap', row), panel);
  const root = h('div.home', h('div.topbar', h('div.tabs', tabEls), topRight()), scroll);

  // touch swipe and mouse wheel move along the anchored row
  const stepBy = n => { const i = Math.max(0, Math.min(items.length - 1, sel + n)); if (i !== sel) nav.focus(items[i].el); };
  let sw = null, wheelAt = 0;
  row.parentElement.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') sw = { x: e.clientX, y: e.clientY }; });
  row.parentElement.addEventListener('pointerup', e => {
    if (!sw) return;
    const dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null;
    if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy)) return;
    const px = STEP * parseFloat(getComputedStyle(document.documentElement).fontSize);
    stepBy(-Math.sign(dx) * Math.max(1, Math.round(Math.abs(dx) / px)));
    swallowClick = true; setTimeout(() => { swallowClick = false; }, 60);
  });
  let swallowClick = false;
  row.parentElement.addEventListener('click', e => { if (swallowClick) { e.stopPropagation(); e.preventDefault(); } }, true);
  row.parentElement.addEventListener('wheel', e => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 4 || performance.now() - wheelAt < 140) return;
    e.preventDefault(); wheelAt = performance.now(); stepBy(Math.sign(d));
  }, { passive: false });

  function buildItems() {
    if (tab === 'media') return [{ key: 'gallery', kind: 'gallery' }, ...MEDIA.map(m => ({ key: m.id, kind: 'media', m }))];
    const ids = recentGames();
    if (game.id && !ids.includes(game.id)) ids.unshift(game.id);
    if (game.id) ids.sort((a, b) => (b === game.id) - (a === game.id));
    state.downloads.forEach(d => { if (!ids.includes(d.id)) ids.push(d.id); });
    return [{ key: 'store', kind: 'store' }, ...ids.slice(0, 12).map(id => ({ key: id, kind: 'game', g: byId[id] })), { key: 'library', kind: 'library' }];
  }

  function face(it) {
    if (it.kind === 'game') return img(art.thumb(it.g.id));
    if (it.kind === 'store') return h('div.tile-face.store', { html: icon('bag') });
    if (it.kind === 'library') return h('div.tile-face.lib', { html: icon('grid') });
    if (it.kind === 'gallery') return h('div.tile-face.lib', { html: icon('display') });
    return h('div.tile-face.media', { style: { background: it.m.color } }, it.m.mark);
  }
  const labelOf = it => it.kind === 'game' ? it.g.title + (game.id === it.g.id ? ' · En cours' : '') : it.kind === 'store' ? 'PlayStation Store' : it.kind === 'library' ? 'Bibliothèque de jeux' : it.kind === 'gallery' ? 'Galerie multimédia' : it.m.title;

  function buildRow(keepKey) {
    items = buildItems();
    row.replaceChildren();
    items.forEach((it, i) => {
      const el = h('div.tile.glare', { f: true, 'data-scrolltop': '', 'data-tap2': '', onok: () => open(it) }, face(it), h('div.tile-label', labelOf(it)));
      if (it.kind === 'game' && downloading(it.g.id)) el.append(h('div.badge-dl', h('i', { style: { width: downloading(it.g.id).p * 100 + '%' } })));
      el.addEventListener('focus:f', () => select(i));
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%'); el.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%'); });
      it.el = el;
      row.append(el);
    });
    const i = items.findIndex(it => it.key === keepKey);
    sel = -1;
    select(i >= 0 ? i : tab === 'games' && items.length > 2 ? 1 : 0, true);
    return items[sel]?.el;
  }

  function select(i, force = false) {
    if (i === sel && !force) return;
    sel = i;
    items.forEach((it, j) => { it.el.classList.toggle('sel', j === i); it.el.style.marginRight = ''; });
    const el = items[i].el;
    row.style.transform = `translateX(${-i * STEP}rem)`;
    fitLabel(el);
    const it = items[i];
    clearTimeout(panelT); clearTimeout(bgT);
    bgT = setTimeout(() => {
      bg.show(it.kind === 'game' ? art.hero(it.g.id) : null, it.kind === 'game' ? art.depth(it.g.id) : null);
      audio.setMood(it.kind === 'game' ? it.g.mood : 'home');
    }, force ? 0 : 90);
    panelT = setTimeout(() => renderPanel(it), force ? 0 : 140);
    renderHints();
  }

  // the focused tile pushes its neighbours aside to make room for its title
  function fitLabel(el) {
    const w = el.querySelector('.tile-label').offsetWidth;
    if (w) el.style.marginRight = `calc(${w}px + 5rem)`;
    else requestAnimationFrame(() => el.isConnected && fitLabel(el));
  }

  function cardFor(g) {
    return h('div.card.act', { f: true, onok: () => openProduct(g.id) }, img(art.hero(g.id), 'cimg'),
      h('div.cbody', h('div.kicker', g.discount ? `Offre −${g.discount} %` : g.preorder ? 'Précommande' : 'Nouveauté'), h('div.ctitle', g.title),
        h('div.csub', g.discount ? `${price(finalPrice(g))} au lieu de ${price(g.price)}` : price(g.price))));
  }

  function renderPanel(it) {
    hub?.dispose(); hub = null;
    let content;
    if (it.kind === 'game') { hub = renderHub(it.g.id, { compact: true }); content = hub.el; }
    else if (it.kind === 'store') {
      const deals = GAMES.filter(g => g.discount || g.preorder).slice(0, 5);
      content = h('div', h('div.hub-hero.swap', h('div.logo', { style: { fontWeight: 300 } }, 'PlayStation Store'),
        h('div.hub-meta', 'Nouveautés, offres du moment et abonnements'),
        h('div.actions', h('button.btn.primary.play', { f: true, onok: () => open(it) }, h('span.icw', { html: icon('bag') }), 'Ouvrir le PlayStation Store'))),
        h('div.cards-title', 'Offres à ne pas manquer'), h('div.cards', { 'data-scroll': 'x', 'data-row': '' }, deals.map(cardFor)));
    } else if (it.kind === 'library') {
      const notInst = state.owned.filter(id => !state.installed.includes(id));
      content = h('div', h('div.hub-hero.swap', h('div.logo', { style: { fontWeight: 300 } }, 'Bibliothèque'),
        h('div.hub-meta', `${state.installed.length} jeux installés`, h('i.sep'), `${state.owned.length} dans votre collection`),
        h('div.actions', h('button.btn.primary.play', { f: true, onok: () => open(it) }, h('span.icw', { html: icon('grid') }), 'Ouvrir la bibliothèque'))),
        notInst.length ? [h('div.cards-title', 'Prêts à être téléchargés'), h('div.cards', { 'data-scroll': 'x', 'data-row': '' }, notInst.map(id => h('div.card.act', { f: true, onok: () => openHub(id) }, img(art.hero(id), 'cimg'), h('div.cbody', h('div.ctitle', byId[id].title), h('div.csub', 'Dans votre collection')))))] : null);
    } else if (it.kind === 'gallery') {
      content = h('div.hub-hero.swap', h('div.logo', { style: { fontWeight: 300 } }, 'Galerie multimédia'), h('div.hub-meta', `${state.captures.length} capture${state.captures.length > 1 ? 's' : ''} · bouton Créer pour en ajouter`),
        h('div.actions', h('button.btn.primary.play', { f: true, onok: () => open(it) }, h('span.icw', { html: icon('grid') }), 'Ouvrir')));
    } else {
      content = h('div.hub-hero.swap', h('div.logo', { style: { fontWeight: 300 } }, it.m.title), h('div.hub-meta', it.m.kind),
        h('div.actions', h('button.btn.primary.play', { f: true, onok: () => open(it) }, h('span.icw', { html: icon('play') }), 'Ouvrir')),
        h('div.media-hint', 'Les applications multimédias sont simulées : aucun service de streaming n’est contacté.'));
    }
    panel.replaceChildren(content);
  }

  function open(it) {
    if (it.kind === 'game') play(it.g.id);
    else if (it.kind === 'store') go(storeScreen);
    else if (it.kind === 'library') go(libraryScreen);
    else if (it.kind === 'gallery') import('./create.js').then(m => go(m.galleryScreen));
    else openMediaApp(it.m.id);
  }

  function setTab(k) {
    if (k === tab) return;
    tab = k;
    tabEls.forEach((t, i) => t.classList.toggle('on', ['games', 'media'][i] === k));
    audio.play('tab');
    const el = buildRow();
    if (el) nav.focus(el, { silent: true });
  }
  tabEls[0].classList.add('on');

  const rebuild = () => {
    const wasRow = !layer.focused?.isConnected || layer.focused.classList.contains('tile');
    const el = buildRow(items[sel]?.key);
    if (wasRow && el) nav.focus(el, { silent: true });
  };
  const onChange = e => {
    if (['installed', 'owned', 'reset', 'played'].includes(e.detail)) { if (nav.top === layer) rebuild(); else dirty = true; }
    else if (e.detail === 'downloads') {
      items.forEach(it => { const d = it.kind === 'game' && downloading(it.g.id); const b = it.el.querySelector('.badge-dl i'); if (d && b) b.style.width = d.p * 100 + '%'; });
      if (state.downloads.some(d => !items.find(it => it.key === d.id)) && tab === 'games') { if (nav.top === layer) rebuild(); else dirty = true; }
    }
  };
  bus.addEventListener('change', onChange);
  const first = buildRow();
  first?.setAttribute('data-autofocus', '');

  const layer = {
    root, mood: 'home',
    bg: () => { const it = items[sel]; return it?.kind === 'game' ? { img: art.hero(it.g.id), depth: art.depth(it.g.id) } : null; },
    hints() {
      const it = items[sel], onRow = layer.focused?.classList.contains('tile');
      const okLabel = onRow ? (it?.kind === 'game' ? (game.id === it.g.id ? 'Reprendre' : 'Jouer') : 'Ouvrir') : 'Sélectionner';
      return [['ok', okLabel], ...(onRow && it?.kind === 'game' ? [['options', 'Options']] : []), ['l1', 'Jeux'], ['r1', 'Multimédia'], ['ps', 'Centre de contrôle']];
    },
    onAction(a) {
      if (a === 'l1') { setTab('games'); return true; }
      if (a === 'r1') { setTab('media'); return true; }
      if (a === 'options') { const it = items[sel]; if (it?.kind === 'game') gameMenu(it.g.id, it.el); return true; }
      if (a === 'search' || a === 'triangle') { go(searchScreen); return true; }
      if (a === 'back') { if (!layer.focused?.classList.contains('tile')) { nav.focus(items[sel].el); audio.play('back'); } return true; }
      if (a === 'down' && layer.focused?.classList.contains('tile')) {
        const first = panel.querySelector('[data-f]');
        if (first) { nav.focus(first); renderHints(); return true; }
      }
      if ((a === 'up' || a === 'down') && layer.focused) setTimeout(renderHints, 0);
    },
    onResume() {
      if (dirty) { dirty = false; rebuild(); }
      if (!layer.focused?.isConnected) nav.focus(items[sel].el, { silent: true });
      renderHints();
    },
    onLeave: () => { bus.removeEventListener('change', onChange); hub?.dispose(); },
  };
  return layer;
}
