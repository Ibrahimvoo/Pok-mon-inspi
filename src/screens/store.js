// Store: featured carousel, shelves, deals, subscriptions, browse grid, cart, and the 3D product page.
import { GAMES, byId, PLANS, FEATURES } from '../data.js';
import { state, bus, owns, installed, downloading, finalPrice, trophyStats } from '../state.js';
import { h, icon, art, img, logo, price, size, date, stars, pegi } from '../ui.js';
import { go, dialog, renderHints } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { stick } from '../input.js';
import { checkout, addToCart, toggleWish, play, subscribe, openProduct } from '../actions.js';
import { topRight } from './home.js';

export function ptile(g, { onok } = {}) {
  const tag = g.preorder ? h('span.tag.blue', 'Précommande') : g.discount && !owns(g.id) ? h('span.tag', `−${g.discount} %`) : null;
  const pr = owns(g.id) ? h('div.pprice', installed(g.id) ? 'Installé' : 'Acheté')
    : h('div.pprice', g.discount ? h('s', price(g.price)) : null, h('b', price(finalPrice(g))));
  const lg = logo(g, 'tile-logo');
  return h('div.ptile', { f: true, onok: onok || (() => openProduct(g.id)) },
    h('div.pimg', img(art.thumb(g.id)), tag, lg, owns(g.id) ? h('span.owned', { html: icon('check') }) : null),
    h('div.pname', g.title), pr);
}

function cartDialog() {
  const items = state.cart.filter(id => !owns(id));
  if (!items.length) {
    dialog({ title: 'Panier', body: 'Votre panier est vide. Ajoutez des jeux depuis leur fiche dans la boutique.', actions: [{ label: 'Fermer', primary: true, sound: 'back' }] });
    return;
  }
  const total = items.reduce((s, id) => s + finalPrice(byId[id]), 0);
  dialog({
    title: `Panier (${items.length})`, wide: true,
    body: h('div', items.map(id => h('div.checkout-item', img(art.thumb(id)), h('div', h('div.ci-t', byId[id].title), h('div', byId[id].genre)), h('div.ci-p', price(finalPrice(byId[id]))))),
      h('div.sum-line.total', h('span', 'Total'), h('span', price(total)))),
    actions: [
      { label: 'Passer la commande', primary: true, onok: () => checkout(items, { fromCart: true }) },
      { label: 'Vider le panier', onok: () => { state.cart = []; bus.dispatchEvent(new CustomEvent('change', { detail: 'cart' })); } },
      { label: 'Continuer mes achats', sound: 'back' },
    ],
  });
}

const TABS = [['discover', 'Découvrir'], ['deals', 'Offres'], ['plans', 'Abonnements'], ['browse', 'Parcourir']];
const FEATURED = ['neon-requiem', 'sands-meridian', 'starfall', 'nightline', 'abyssal'];
const CATS = ['Tous', 'Action', 'Aventure', 'RPG', 'Course', 'Sport', 'Science-fiction', 'Horreur', 'Simulation', 'Indé'];

export function storeScreen({ tab: startTab = 'discover' } = {}) {
  let tab = startTab, slide = 0, slideT = 0, cat = 'Tous', sort = 'pop';
  const tabEls = TABS.map(([k, l]) => h('button.tab', { f: true, onok: () => setTab(k) }, l));
  const count = h('span.cart-count');
  const cartBtn = h('button.round', { f: true, style: { position: 'relative' }, title: 'Panier', onok: cartDialog }, h('span.icw', { html: icon('cart') }), count);
  const wallet = h('div.wallet-pill', h('span.icw', { html: icon('wallet') }), h('span'));
  const body = h('div.page', { 'data-scroll': 'y', 'data-pad': 180 });
  const head = h('div.page-head', h('h1', { style: { display: 'flex', alignItems: 'center', gap: '1.4rem' } }, h('span.icw', { html: icon('bag') }), 'Boutique'),
    h('div.tabs.store-tabs', tabEls), h('div', { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center' } }, wallet, topRight({ cart: cartBtn })));
  const root = h('div.store', head, body);
  const syncHead = () => { const n = state.cart.filter(id => !owns(id)).length; count.textContent = n; count.classList.toggle('hidden', !n); wallet.lastChild.textContent = price(state.wallet); };

  function feature() {
    const slides = FEATURED.map(id => {
      const g = byId[id];
      return h('div.feature-slide', img(art.hero(id)), h('div.feature-info',
        h('div.kicker', g.preorder ? 'Précommande · bientôt disponible' : 'À la une'), logo(g),
        h('div.tagline', g.tagline),
        h('div.price-line', g.discount ? [h('s', price(g.price)), price(finalPrice(g)), h('span.pct', `−${g.discount} %`)] : owns(id) ? 'Dans votre bibliothèque' : price(g.price))));
    });
    const dots = h('div.feature-dots', FEATURED.map((_, i) => h('i', { onclick: () => show(i) })));
    const btn = h('button.btn.primary', { f: true, 'data-scrolltop': '', style: { position: 'absolute', left: '9rem', bottom: '-2rem', zIndex: 3 }, onok: () => openProduct(FEATURED[slide]) }, 'Voir le jeu');
    const wish = h('button.btn.sq', { f: true, 'data-scrolltop': '', style: { position: 'absolute', left: '33rem', bottom: '-2rem', zIndex: 3 }, html: icon('heart'), onok: () => toggleWish(FEATURED[slide]) });
    const el = h('div.feature', slides, dots);
    const wrap = h('div', { style: { position: 'relative', marginBottom: '6rem' } }, el, btn, wish);
    function show(i) {
      slide = (i + FEATURED.length) % FEATURED.length;
      slides.forEach((s, j) => s.classList.toggle('on', j === slide));
      [...dots.children].forEach((d, j) => d.classList.toggle('on', j === slide));
      clearInterval(slideT);
      slideT = setInterval(() => { if (!btn.classList.contains('focused')) show(slide + 1); }, 7000);
    }
    show(slide);
    wrap.step = d => { show(slide + d); audio.play('move'); };
    wrap.btn = btn;
    return wrap;
  }

  const shelf = (title, list, sub) => list.length ? [h('div.section-title', title, sub && h('small', sub)), h('div.shelf', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'shelf-' + title }, list.map(g => ptile(g)))] : null;
  let feat = null;

  function render() {
    clearInterval(slideT); feat = null;
    body.replaceChildren();
    if (tab === 'discover') {
      feat = feature();
      body.append(h('div', { style: { margin: '0 -9rem' } }), feat,
        ...[shelf('Nouveautés', GAMES.slice().sort((a, b) => b.release.localeCompare(a.release)).filter(g => !g.preorder).slice(0, 8)),
          shelf('Offres du moment', GAMES.filter(g => g.discount), 'Pour une durée limitée'),
          shelf('Les mieux notés', GAMES.filter(g => g.rating).sort((a, b) => b.rating - a.rating).slice(0, 8)),
          shelf('Bientôt disponible', GAMES.filter(g => g.preorder)),
          shelf('Pépites indépendantes', GAMES.filter(g => g.genres.includes('Indé'))),
          state.wishlist.length ? shelf('Votre liste de souhaits', state.wishlist.map(id => byId[id])) : null].flat().filter(Boolean));
      body.style.paddingTop = '11rem';
    } else if (tab === 'deals') {
      body.style.paddingTop = '13rem';
      body.append(h('div.section-title', { style: { marginTop: 0 } }, 'Offres du moment', h('small', 'Prix barrés valables jusqu’au 4 novembre')),
        h('div.grid', GAMES.filter(g => g.discount).sort((a, b) => b.discount - a.discount).map(g => ptile(g))));
    } else if (tab === 'plans') {
      body.style.paddingTop = '13rem';
      body.append(h('div.section-title', { style: { marginTop: 0 } }, 'Abonnements', h('small', 'Jeu en ligne, catalogue et avantages — souscription simulée')),
        h('div.plans', PLANS.map(p => h(`div.plan${state.plan === p.id ? '.current' : ''}`, { f: true, style: { '--pc': p.color }, onok: () => subscribe(p.id) },
          h('div.kicker', { style: { color: 'var(--dim)', fontSize: '1.6rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600 } }, state.plan === p.id ? 'Abonnement actuel' : 'Mensuel'),
          h('h3', p.name), h('div.pp', `${price(p.price)} / mois`),
          h('ul', p.perks.map(x => h('li', h('span.icw', { html: icon('check') }), x))),
          h('div.cta', state.plan === p.id ? 'Actif' : 'S’abonner →')))));
    } else {
      body.style.paddingTop = '13rem';
      const list = GAMES.filter(g => cat === 'Tous' || g.genres.includes(cat));
      if (sort === 'price') list.sort((a, b) => finalPrice(a) - finalPrice(b));
      else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
      else if (sort === 'new') list.sort((a, b) => b.release.localeCompare(a.release));
      const sortLabel = { pop: 'Popularité', price: 'Prix croissant', rating: 'Note', new: 'Date de sortie' }[sort];
      body.append(h('div.chips', { 'data-row': '', 'data-group': 'chips' }, CATS.map(c => h(`button.chip${c === cat ? '.on' : ''}`, { f: true, onok: () => { cat = c; audio.play('toggle'); render(); refocusChip(c); } }, c)),
        h('button.chip', { f: true, onok: () => { sort = { pop: 'price', price: 'rating', rating: 'new', new: 'pop' }[sort]; audio.play('toggle'); render(); refocusChip(null); } }, h('span.icw', { html: icon('sort') }), sortLabel)),
        h('div.section-title', { style: { marginTop: '1rem' } }, `${list.length} jeu${list.length > 1 ? 'x' : ''}`), h('div.grid', list.map(g => ptile(g))));
    }
    body.scrollTop = 0;
  }
  function refocusChip(c) {
    const chips = [...body.querySelectorAll('.chip')];
    nav.focus(c ? chips.find(x => x.textContent === c) : chips[chips.length - 1], { silent: true });
  }
  function setTab(k) {
    if (k === tab) return;
    tab = k;
    tabEls.forEach((t, i) => t.classList.toggle('on', TABS[i][0] === k));
    audio.play('tab');
    render();
    nav.focus(tabEls[TABS.findIndex(t => t[0] === k)], { silent: true });
  }
  tabEls[TABS.findIndex(t => t[0] === tab)].classList.add('on');
  render();
  syncHead();
  (feat?.btn || body.querySelector('[data-f]'))?.setAttribute('data-autofocus', '');

  const onChange = e => { syncHead(); if (['owned', 'wishlist', 'plan', 'installed'].includes(e.detail) && nav.top !== layer) layer.dirty = true; };
  bus.addEventListener('change', onChange);
  const layer = {
    root, mood: 'home', bg: null, shade: .9,
    hints: () => [['ok', 'Sélectionner'], ['back', 'Retour'], ['l1', 'Onglet préc.'], ['r1', 'Onglet suiv.']],
    onAction(a) {
      const i = TABS.findIndex(t => t[0] === tab);
      if (a === 'l1') { setTab(TABS[(i + 3) % 4][0]); return true; }
      if (a === 'r1') { setTab(TABS[(i + 1) % 4][0]); return true; }
      if ((a === 'left' || a === 'right') && feat && layer.focused === feat.btn) { feat.step(a === 'right' ? 1 : -1); return true; }
      if (a === 'search' || a === 'triangle') { import('./search.js').then(m => go(m.searchScreen)); return true; }
    },
    onResume() { if (layer.dirty) { layer.dirty = false; const f = layer.focused; const idx = [...body.querySelectorAll('[data-f]')].indexOf(f); render(); const all = [...root.querySelectorAll('[data-f]')]; if (idx >= 0) nav.focus(body.querySelectorAll('[data-f]')[idx] || all[0], { silent: true, instant: true }); } syncHead(); },
    onLeave() { clearInterval(slideT); bus.removeEventListener('change', onChange); },
  };
  return layer;
}

// ---------------------------------------------------------------- product page with a 3D game case
export function productScreen({ id }) {
  const g = byId[id];
  const st = trophyStats(id);
  const caseEl = h('div.case',
    h('div.front', h('div.band', h('span.icw', { html: icon('gamepad') }), h('span', 'CONSOLE'), h('span', 'ÉDITION STANDARD')), img(art.thumb(id)), logo(g, 'clogo'), h('div.cpegi', pegi(g.pegi))),
    h('div.back', h('div.band', h('span', g.publisher.toUpperCase())), img(art.shot(id, 1)), h('div', g.desc.slice(0, 180) + '…')),
    h('div.spine', h('span', g.title.toUpperCase())), h('div.spine.r', h('span', g.title.toUpperCase())), h('div.edge.t'), h('div.edge.b'));
  const stage = h('div.case-stage', caseEl, h('div.case-hint', h('span.icw', { html: icon('refresh') }), 'Faites pivoter la boîte (stick droit ou glisser)'));
  // rotation: drag, right stick, or gentle idle sway
  let ry = -24, rx = -4, vy = 0, drag = null, raf = 0, idle = 0;
  stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, ry, rx }; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!drag) return; ry = drag.ry + (e.clientX - drag.x) * .45; rx = Math.max(-25, Math.min(25, drag.rx - (e.clientY - drag.y) * .25)); idle = 0; });
  stage.addEventListener('pointerup', () => { drag = null; });
  const spin = t => {
    raf = requestAnimationFrame(spin);
    if (Math.abs(stick.rx) > .1 || Math.abs(stick.ry) > .1) { ry += stick.rx * 4; rx = Math.max(-25, Math.min(25, rx - stick.ry * 2)); idle = 0; }
    else if (!drag && ++idle > 120) { vy = Math.sin(t / 2600) * 22 - 18; ry += (vy - ry) * .02; rx += (-4 - rx) * .03; }
    caseEl.style.setProperty('--ry', ry + 'deg'); caseEl.style.setProperty('--rx', rx + 'deg');
  };

  const buy = h('div.prod-buy');
  const dlLine = h('div.dl-line.hidden', h('div.progress', h('i')), h('span'));
  function syncBuy() {
    const keep = buy.contains(layer?.focused) ? [...buy.children].indexOf(layer.focused) : -1;
    buy.replaceChildren();
    const wishOn = state.wishlist.includes(id);
    if (owns(id)) {
      const d = downloading(id);
      if (installed(id)) buy.append(h('button.btn.primary.play', { f: true, onok: () => play(id) }, h('span.icw', { html: icon('play') }), 'Jouer'));
      else if (d) buy.append(h('button.btn.primary', { f: true, onok: () => play(id) }, h('span.icw', { html: icon('download') }), h('span.dltx', `Téléchargement… ${Math.round(d.p * 100)} %`)));
      else if (g.preorder) buy.append(h('button.btn.primary', { f: true, disabled: true }, 'Précommandé'));
      else buy.append(h('button.btn.primary', { f: true, onok: () => play(id) }, h('span.icw', { html: icon('download') }), 'Télécharger'));
    } else {
      buy.append(h('button.btn.primary.play', { f: true, onok: () => checkout([id]) }, g.preorder ? 'Précommander' : 'Acheter'),
        h('button.btn', { f: true, onok: () => { addToCart(id); } }, h('span.icw', { html: icon('cart') }), state.cart.includes(id) ? 'Dans le panier' : 'Ajouter au panier'),
        h(`button.btn.sq${wishOn ? '.on' : ''}`, { f: true, title: 'Liste de souhaits', html: icon('heart').replace('fill="none"', wishOn ? 'fill="currentColor"' : 'fill="none"'), onok: () => toggleWish(id) }));
    }
    const d = downloading(id);
    dlLine.classList.toggle('hidden', !d);
    if (d) { dlLine.querySelector('i').style.width = d.p * 100 + '%'; dlLine.lastChild.textContent = `${size(g.size * d.p)} / ${size(g.size)} · ${Math.round(d.speed)} Mo/s`; }
    if (keep >= 0 && layer && nav.top === layer) nav.focus(buy.children[Math.min(keep, buy.children.length - 1)], { silent: true, instant: true });
  }

  const priceLine = () => owns(id) ? h('div.price-line', { style: { fontWeight: 400, fontSize: '2.2rem', color: 'var(--dim)' } }, installed(id) ? 'Installé · ' + size(g.size) : 'Acheté')
    : h('div.price-line', g.discount ? [h('s', price(g.price)), price(finalPrice(g)), h('span.pct', `−${g.discount} %`)] : price(g.price));
  const priceBox = h('div', priceLine());
  const info = h('div.prod-info',
    logo(g), h('div.publisher', `${g.publisher} · ${g.genre}`),
    h('div.prod-rating', g.rating ? [stars(g.rating), h('span', `${g.rating.toLocaleString('fr-FR')} · ${g.votes.toLocaleString('fr-FR')} évaluations`)] : h('span', 'Pas encore d’évaluations'), pegi(g.pegi)),
    priceBox, buy, dlLine,
    h('div.prod-note', h('span.icw', { html: icon('info') }), 'Achats simulés · aucun paiement réel'),
    h('div.feat-list', g.features.map(f => h('span.feat', FEATURES[f]))));
  const shots = [art.hero(id), art.shot(id, 1), art.shot(id, 2)];
  const viewer = src => go(() => ({ root: h('div.viewer', img(src)), shade: 0, hints: [['back', 'Fermer']] }), {}, { sound: 'ok' });
  const root = h('div.product', h('div.page', { 'data-scroll': 'y', 'data-pad': 160 },
    h('div.prod-top', info, stage),
    h('div.section-title', 'Captures d’écran'),
    h('div.shots', { 'data-scroll': 'x', 'data-row': '' }, shots.map(s => h('div.shot', { f: true, onok: () => viewer(s) }, img(s)))),
    h('div.section-title', 'À propos de ce jeu'),
    h('div.fblock', { f: true }, h('div.desc', g.desc)),
    h('div.section-title', 'Informations'),
    h('div.fblock', { f: true }, h('dl.info-table',
      ...[['Éditeur', g.publisher], ['Genre', g.genres.join(', ')], ['Date de sortie', date(g.release)], ['Taille', size(g.size)], ['Joueurs', g.players], ['Trophées', `${st.total} (dont 1 platine)`]]
        .map(([k, v]) => h('div', h('dt', k), h('dd', v))))),
    h('div', { style: { height: '6rem' } })));

  let wasDl = !!downloading(id);
  const onChange = e => {
    const d = downloading(id);
    if (e.detail === 'downloads' && d && wasDl) {
      const tx = buy.querySelector('.dltx'); if (tx) tx.textContent = `Téléchargement… ${Math.round(d.p * 100)} %`;
      dlLine.querySelector('i').style.width = d.p * 100 + '%'; dlLine.lastChild.textContent = `${size(g.size * d.p)} / ${size(g.size)} · ${Math.round(d.speed)} Mo/s`;
      return;
    }
    wasDl = !!d;
    if (['owned', 'installed', 'downloads', 'wishlist', 'cart', 'reset'].includes(e.detail)) { priceBox.replaceChildren(priceLine()); syncBuy(); }
  };
  const layer = {
    root, mood: g.mood, bg: { img: art.hero(id), depth: art.depth(id) }, shade: 1,
    hints: [['ok', 'Sélectionner'], ['back', 'Retour']],
    onEnter() { raf = requestAnimationFrame(spin); bus.addEventListener('change', onChange); },
    onLeave() { cancelAnimationFrame(raf); bus.removeEventListener('change', onChange); },
  };
  syncBuy();
  buy.firstChild?.setAttribute('data-autofocus', '');
  return layer;
}
