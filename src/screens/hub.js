// Game hub: logo, play/download button, activities, trophies and news. Embedded in Home and used standalone.
import { byId } from '../data.js';
import { social, joinGame } from '../social.js';
import { state, bus, owns, installed, downloading, trophyStats } from '../state.js';
import { h, art, logo, img, icon, size, hours, ago, avatarImg } from '../ui.js';
import { dialog, menu } from '../shell.js';
import { play, openProduct, uninstall, cancelDownload } from '../actions.js';
import { session } from './game.js';
import { nav } from '../nav.js';

export function showTrophies(id) {
  const g = byId[id];
  const got = state.trophies[id] || [];
  const st = trophyStats(id);
  const list = h('div.trophy-list', { 'data-scroll': 'y', 'data-pad': 40 }, g.trophies.map((t, i) => {
    const ok = got.includes(i);
    return h(`div.trophy-item${ok ? '' : '.locked'}`, { f: true },
      h(`span.tro.${t.t}`), h('div', h('div.tn', ok || t.t !== 'platinum' ? t.n : 'Trophée caché'), h('div.td', t.d)),
      h('div.tr', ok ? 'Obtenu' : 'Verrouillé', h('br'), `${[2.1, 8.4, 14.9, 31.2, 46.5, 63.8][i % 6].toLocaleString('fr-FR')} % des joueurs`));
  }));
  dialog({ title: `${g.title} · ${st.pct} %`, wide: true, body: h('div', h('div.trophy-sum', { style: { marginBottom: '2.6rem' } }, ...['platinum', 'gold', 'silver', 'bronze'].map(k => h('span', h(`span.tro.${k}`), st[k]))), list), actions: [] , hints: [['back', 'Fermer']] });
}

function primaryLabel(id) {
  if (session.id === id) return ['play', 'Reprendre'];
  if (installed(id)) return ['play', 'Jouer'];
  const d = downloading(id);
  if (d) return ['download', `Téléchargement… ${Math.round(d.p * 100)} %`];
  if (owns(id)) return ['download', 'Télécharger'];
  return ['bag', 'Voir dans le PlayStation Store'];
}

export function gameMenu(id, anchor) {
  const g = byId[id];
  const items = [
    { label: 'Informations sur le jeu', icon: 'info', onok: () => openProduct(id) },
    { label: 'Trophées', icon: 'trophy', onok: () => showTrophies(id) },
  ];
  if (downloading(id)) items.push({ label: 'Annuler le téléchargement', icon: 'close', onok: () => cancelDownload(id) });
  if (installed(id) && session.id !== id) items.push({ label: `Supprimer (${size(g.size)})`, icon: 'trash', onok: () => uninstall(id) });
  return menu(items, anchor);
}

// Returns { el, dispose } — the hub keeps its live parts (download progress) in sync with state.
export function renderHub(id, { compact = false } = {}) {
  const g = byId[id];
  const st = trophyStats(id);
  const btnIc = h('span.icw'), btnTx = h('span');
  const playBtn = h('button.btn.primary.play', { f: true, 'data-autofocus': compact ? null : '', onok: () => play(id) }, btnIc, btnTx);
  const moreBtn = h('button.btn.sq', { f: true, html: icon('more'), onok: e => gameMenu(id, e.currentTarget) });
  const dlFill = h('i'), dlText = h('span'), dlLine = h('div.dl-line', h('div.progress', dlFill), dlText);
  const sync = () => {
    const [ic, tx] = primaryLabel(id);
    btnIc.innerHTML = icon(ic); btnTx.textContent = tx;
    const d = downloading(id);
    dlLine.classList.toggle('hidden', !d);
    if (d) { dlFill.style.width = (d.p * 100).toFixed(1) + '%'; dlText.textContent = `${size(g.size * d.p)} / ${size(g.size)} · ${Math.round(d.speed)} Mo/s`; }
  };
  sync();
  const onChange = e => { if (['downloads', 'installed', 'owned', 'reset', 'played'].includes(e.detail)) sync(); };
  bus.addEventListener('change', onChange);

  const meta = h('div.hub-meta',
    owns(id) ? [h('span', h('b', hours(state.playTime[id])), ' de jeu'), h('i.sep'), h('span', ago(state.lastPlayed[id]))] : [h('span', g.genre), h('i.sep'), h('span', g.publisher)],
    h('i.sep'), h('span', st.got ? `Trophées ${st.pct} %` : `${st.total} trophées`));
  const hero = h('div.hub-hero.swap', logo(g), meta, h('div.actions', playBtn, moreBtn), dlLine);

  const shots = [art.shot(id, 1), art.shot(id, 2), art.hero(id)];
  const friends = social.friends.filter(f => { const p = social.presenceOf(f.id); return p.online && p.game === id; });
  const cards = h('div.cards', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'cards-' + id },
    g.activities.map((a, i) => h('div.card.act', { f: true, onok: () => play(id) },
      img(shots[i], 'cimg'), h('div.cbody', h('div.kicker', i === 0 && owns(id) ? 'Continuer' : 'Activité'), h('div.ctitle', a), h('div.csub', `Environ ${[15, 30, 45][i]} min · ${['Histoire', 'Exploration', 'Défi'][i]}`)))),
    h('div.card.small', { f: true, onok: () => showTrophies(id) },
      h('div.cbody', h('div.kicker', 'Trophées'), h('div.ctitle', `${st.pct} % terminé`), h('div.progress', { style: { margin: '1.6rem 0 .4rem' } }, h('i', { style: { width: st.pct + '%' } })),
        h('div.trophy-sum', ...['platinum', 'gold', 'silver', 'bronze'].map(k => h('span', h(`span.tro.${k}`), st[k]))))),
    friends.length ? h('div.card.small', { f: true, onok: async () => {
      const f = friends[0], p = social.presenceOf(f.id);
      if (p.partyId && p.joinable) { try { await social.join(p.partyId); joinGame(id); } catch (e) { (await import('../shell.js')).toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); } }
      else import('./gamebase.js').then(m => import('../shell.js').then(s => s.go(m.gamebaseScreen, { tab: 'friends' })));
    } },
      h('div.cbody', h('div.kicker', 'Amis qui jouent'), friends.slice(0, 3).map(f => h('div', { style: { display: 'flex', gap: '1.4rem', alignItems: 'center', marginTop: '1.4rem' } }, avatarImg(f.avatar, '5.4rem'), h('div', h('div.ctitle', { style: { margin: 0 } }, f.psn), h('div.csub', social.presenceOf(f.id).joinable ? 'Rejoindre' : 'En jeu')))))) : null,
    h('div.card.wide', { f: true, onok: () => openProduct(id) }, img(art.hero(id), 'cimg'),
      h('div.cbody', h('div.kicker', 'Officiel'), h('div.ctitle', `${g.title} : mise à jour 1.0${(g.title.length % 7) + 2}`), h('div.csub', 'Nouveaux contenus, mode photo amélioré et corrections.'))));

  const el = h('div.hub', hero, h('div.cards-title', 'Activités et actualités'), cards);
  return { el, dispose: () => bus.removeEventListener('change', onChange), playBtn };
}

export function hubScreen({ id }) {
  const g = byId[id];
  const hub = renderHub(id);
  const root = h('div', h('div.page', { 'data-scroll': 'y', 'data-pad': 160 }, h('div', { style: { height: '22rem' } }), hub.el));
  return {
    root, mood: g.mood, bg: { img: art.hero(id), depth: art.depth(id) },
    hints: [['ok', 'Sélectionner'], ['back', 'Retour'], ['options', 'Options']],
    onAction(a) { if (a === 'options') { gameMenu(id, nav.top.focused); return true; } },
    onLeave: hub.dispose,
  };
}
