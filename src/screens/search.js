// Universal search with live results and an on-screen AZERTY keyboard (physical keyboard and touch also work).
import { GAMES, byId, MEDIA } from '../data.js';
import { state, save, owns, installed, finalPrice } from '../state.js';
import { h, icon, art, img, price, norm } from '../ui.js';
import { go, renderHints } from '../shell.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { audio } from '../audio.js';
import { openHub, openProduct } from '../actions.js';
import { openMediaApp } from './game.js';
import { settingsScreen, CATEGORIES } from './settings.js';

const ROWS = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'], ['w', 'x', 'c', 'v', 'b', 'n', '\'', '-', 'é', 'BK']];

function score(text, q) {
  const t = norm(text);
  if (t.startsWith(q)) return 100;
  if (t.split(/[\s:'-]+/).some(w => w.startsWith(q))) return 85;
  if (t.includes(q)) return 60;
  let i = 0; for (const c of t) if (c === q[i]) i++;
  return i === q.length && q.length > 2 ? 15 : 0;
}
function mark(text, q) {
  const i = norm(text).indexOf(q);
  if (!q || i < 0) return text;
  return [text.slice(0, i), h('mark', text.slice(i, i + q.length)), text.slice(i + q.length)];
}

export function searchScreen() {
  let query = '', kb = true, t = 0;
  const field = h('input', { type: 'search', placeholder: 'Rechercher des jeux, des applications et des paramètres', autocomplete: 'off', autocorrect: 'off', spellcheck: false, enterkeyhint: 'search' });
  const bar = h('div.search-bar', { f: true, onok: () => { field.focus({ preventScroll: true }); } }, h('span.icw', { html: icon('search') }), field);
  const results = h('div.page', { 'data-scroll': 'y', 'data-pad': 140 });
  const keys = h('div.osk', { 'data-group': 'osk' },
    ROWS.map(r => h('div.osk-row', r.map(k => k === 'BK'
      ? h('button.key', { f: true, title: 'Effacer', onok: () => setQuery(query.slice(0, -1), 'key') }, h('span.icw', { html: icon('close') }))
      : h('button.key', { f: true, onok: () => setQuery(query + k, 'key') }, k)))),
    h('div.osk-row',
      h('button.key.w2', { f: true, onok: () => setQuery('', 'back') }, 'Effacer'),
      h('button.key.w5', { f: true, onok: () => setQuery(query + ' ', 'key') }, 'Espace'),
      h('button.key.w3.accent', { f: true, onok: () => { const r = results.querySelector('[data-f]'); if (r) nav.focus(r); else audio.play('error'); } }, h('span.icw', { html: icon('search') }), ' Rechercher')));
  const root = h('div.search', bar, results, keys);
  keys.querySelector('.key')?.setAttribute('data-autofocus', '');

  function row(thumb, title, sub, right, onok) {
    return h('div.result-row', { f: true, onok: () => { remember(); onok(); } }, thumb, h('div', h('div.rt', title), h('div.rs', sub)), right && h('div.rr', right));
  }
  const gameRow = (g, q) => row(img(art.thumb(g.id)), mark(g.title, q), `${g.genre} · ${g.publisher}`,
    installed(g.id) ? 'Installé' : owns(g.id) ? 'Acheté' : g.preorder ? 'Précommande' : price(finalPrice(g)),
    () => owns(g.id) ? openHub(g.id) : openProduct(g.id));
  function remember() {
    const q = query.trim();
    if (q.length < 2) return;
    state.recentSearch = [q, ...state.recentSearch.filter(x => x !== q)].slice(0, 6);
    save('search');
  }

  function render() {
    const q = norm(query.trim());
    const out = [];
    if (!q) {
      if (state.recentSearch.length) out.push(h('div.section-title', { style: { marginTop: 0 } }, 'Recherches récentes'),
        ...state.recentSearch.map(s => row(h('div', { style: { width: '8.4rem', height: '8.4rem', display: 'grid', placeItems: 'center', fontSize: '3.4rem', opacity: .6 }, html: icon('clock') }), s, 'Recherche récente', null, () => setQuery(s, 'ok'))));
      out.push(h('div.section-title', 'Tendances'), ...GAMES.filter(g => g.rating).sort((a, b) => b.votes - a.votes).slice(0, 5).map(g => gameRow(g, '')));
    } else {
      const games = GAMES.map(g => ({ g, s: Math.max(score(g.title, q), score(g.genre + ' ' + g.genres.join(' '), q) * .55, score(g.publisher, q) * .45) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
      const apps = MEDIA.filter(m => score(m.title + ' ' + m.kind, q) > 0);
      const sets = CATEGORIES.filter(c => score(c.label + ' ' + c.keywords, q) > 0);
      if (games.length) out.push(h('div.section-title', { style: { marginTop: 0 } }, 'Jeux', h('small', `${games.length} résultat${games.length > 1 ? 's' : ''}`)), ...games.map(x => gameRow(x.g, q)));
      if (apps.length) out.push(h('div.section-title', 'Applications'), ...apps.map(m => row(h('div', { style: { width: '8.4rem', height: '8.4rem', borderRadius: '1rem', background: m.color, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '3rem' } }, m.mark), mark(m.title, q), m.kind, 'Application', () => openMediaApp(m.id))));
      if (sets.length) out.push(h('div.section-title', 'Paramètres'), ...sets.map(c => row(h('div', { style: { width: '8.4rem', height: '8.4rem', display: 'grid', placeItems: 'center', fontSize: '3.6rem' }, html: icon(c.icon) }), mark(c.label, q), 'Paramètres', null, () => go(settingsScreen, { cat: c.id }))));
      if (!out.length) out.push(h('div.lib-empty', { style: { marginTop: 0 } }, `Aucun résultat pour « ${query.trim()} ».`), h('div', { style: { color: 'var(--faint)', fontSize: '2rem', marginTop: '1.4rem' } }, 'Vérifiez l’orthographe ou essayez un genre : « course », « rpg », « horreur »…'));
    }
    const hadFocus = results.contains(layer?.focused);
    results.replaceChildren(...out);
    results.scrollTop = 0;
    if (hadFocus) nav.focus(bar, { silent: true, instant: true });
  }
  function setQuery(q, sound) {
    query = q.slice(0, 40);
    if (field.value !== query) field.value = query;
    if (sound) audio.play(sound);
    clearTimeout(t); t = setTimeout(render, 70);
  }
  field.addEventListener('input', () => setQuery(field.value));
  field.addEventListener('keydown', e => { if (e.key === 'Enter') { field.blur(); const r = results.querySelector('[data-f]'); if (r) nav.focus(r); } if (e.key === 'Escape') field.blur(); });

  function toggleKb() { kb = !kb; root.classList.toggle('kb-hidden', !kb); audio.play('toggle'); if (!kb && keys.contains(layer.focused)) nav.focus(bar, { silent: true }); renderHints(); }

  const layer = {
    root, mood: 'home', bg: null, shade: 1, dim: .55,
    hints: () => [['ok', 'Sélectionner'], ['back', query ? 'Supprimer' : 'Retour'], ['triangle', kb ? 'Masquer le clavier' : 'Afficher le clavier']],
    onAction(a) {
      if (a === 'triangle' || a === 'search') { toggleKb(); return true; }
      if (a === 'back' && query && document.activeElement !== field) { setQuery(query.slice(0, -1), 'back'); renderHints(); return true; }
      if (a === 'square') { setQuery(query + ' ', 'key'); return true; }
    },
    onEnter() {
      input.setRaw(e => {
        if (nav.top !== layer) return false;
        if (document.activeElement === field) return e.key === 'Escape' ? false : 'native';
        if (e.key.length === 1 && e.key !== ' ' || (e.key === ' ' && query)) { setQuery(query + e.key.toLowerCase(), 'key'); renderHints(); return true; }
        if (e.key === 'Backspace' && query) { setQuery(query.slice(0, -1), 'back'); renderHints(); return true; }
        return false;
      });
    },
    onLeave() { input.setRaw(null); field.blur(); },
  };
  render();
  return layer;
}
