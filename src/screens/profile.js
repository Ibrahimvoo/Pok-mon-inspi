// Profile: the signed-in account, trophy level, games with progress and the real friends list.
import { byId } from '../data.js';
import { state, allTrophies, trophyStats } from '../state.js';
import { h, icon, art, img, hours, avatarImg } from '../ui.js';
import { go, toast } from '../shell.js';
import { session } from '../session.js';
import { nav } from '../nav.js';
import { social } from '../social.js';
import { showTrophies } from './hub.js';
import { presenceText, friendActions } from './gamebase.js';

export function profileScreen() {
  const u = session.current;
  const tr = allTrophies();
  const total = tr.platinum + tr.gold + tr.silver + tr.bronze;
  const level = 1 + Math.floor(total * 2.6);
  const played = Object.keys(state.trophies).filter(id => byId[id]).sort((a, b) => (state.lastPlayed[b] || 0) - (state.lastPlayed[a] || 0));
  const openBase = tab => import('./gamebase.js').then(m => go(m.gamebaseScreen, { tab }));
  const friendsShelf = h('div.shelf', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'friends' });
  const friendsTitle = h('div.section-title', 'Amis');
  function renderFriends() {
    if (!social.available) {
      friendsTitle.replaceChildren('Amis');
      friendsShelf.replaceChildren(h('div.friend', { f: true, onok: () => openBase('party') }, h('div.avatar.add', { html: icon('party') }), h('div.fn', 'Jouer avec un ami'), h('div.fs', 'Créer un salon')));
      return;
    }
    const list = [...social.friends].sort((a, b) => social.presenceOf(b.id).online - social.presenceOf(a.id).online);
    friendsTitle.replaceChildren('Amis', h('small', `${list.filter(f => social.presenceOf(f.id).online).length} en ligne`));
    friendsShelf.replaceChildren(
      ...list.map(f => { const p = social.presenceOf(f.id); return h('div.friend', { f: true, onok: () => go(friendProfileScreen, { id: f.id }) }, avatarImg(f.avatar, '11rem'), h('div.fn', f.psn), h('div.fs', h(`i.${p.online ? 'online' : 'off'}`), presenceText({ ...p, lastSeen: f.lastSeen }, { short: true }))); }),
      h('div.friend', { f: true, onok: () => openBase('add') }, h('div.avatar.add', { html: icon('userPlus') }), h('div.fn', 'Ajouter un ami'), h('div.fs', social.peer ? 'Par code ami' : 'Par identifiant en ligne')));
  }
  renderFriends();
  const root = h('div.profile', h('div.page', { 'data-scroll': 'y', 'data-pad': 160 },
    h('div.prof-banner', img(art.hero(u.avatar))),
    h('div.prof-head', h('div.avatar', img(art.thumb(u.avatar))),
      h('div', h('div.prof-name', u.psn), h('div.prof-id', h(`span.online-dot${u.online ? '' : '.off'}`), u.online ? 'En ligne' : 'Profil hors ligne')),
      h('div.level', h('div', { style: { textAlign: 'right' } }, h('small', 'Niveau de trophées'), h('div', { style: { fontSize: '2rem', color: 'var(--dim)' } }, `${total} trophées`)),
        h('div.level-ring', { style: { '--p': (total * 37) % 100 } }, level))),
    h('div.prof-actions',
      h('button.btn.primary', { f: true, 'data-autofocus': '', onok: () => import('./settings.js').then(m => go(m.settingsScreen, { cat: 'users' })) }, h('span.icw', { html: icon('user') }), 'Modifier le profil'),
      h('button.btn', { f: true, onok: () => openBase(social.party ? 'party' : 'friends') }, h('span.icw', { html: icon('friends') }), 'Base de jeu'),
      h('button.btn', { f: true, onok: () => import('./boot.js').then(m => go(m.usersScreen, { switching: true })) }, h('span.icw', { html: icon('refresh') }), 'Changer d’utilisateur')),
    h('div.section-title', 'Trophées'),
    h('div.stat-cards', ['platinum', 'gold', 'silver', 'bronze'].map(k => h('div.stat', h(`span.tro.${k}`), h('div', h('b', tr[k]), h('span', { platinum: 'Platine', gold: 'Or', silver: 'Argent', bronze: 'Bronze' }[k]))))),
    h('div.section-title', 'Jeux', h('small', 'Progression des trophées')),
    h('div.shelf', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'games' }, played.map(id => {
      const st = trophyStats(id);
      return h('div.game-prog', { f: true, onok: () => showTrophies(id) }, img(art.hero(id)), h('div.gp', h('div.gpt', byId[id].title),
        h('div.progress', h('i', { style: { width: st.pct + '%' } })), h('div.gpm', h('span', `${st.pct} %`), h('span', hours(state.playTime[id])))));
    })),
    friendsTitle, friendsShelf,
    h('div', { style: { height: '4rem' } })));
  const offs = [];
  return {
    root, bg: null, mood: 'home', shade: 1, dim: .7, hints: [['ok', 'Sélectionner'], ['back', 'Retour']],
    onEnter() { offs.push(social.on('friends', renderFriends), social.on('presence', renderFriends)); social.refresh(); },
    onLeave() { offs.forEach(f => f()); },
  };
  render();
  return layer;
}

// A friend's profile: live status, current game, friendship date and the call / invite / join actions.
export function friendProfileScreen({ id }) {
  const page = h('div.page', { 'data-scroll': 'y', 'data-pad': 160 });
  const root = h('div.profile', page);
  let layer = null;
  const run = async (fn, okMsg) => {
    try { await fn(); if (okMsg) toast({ title: okMsg, icon: 'party', sound: null, log: false }); }
    catch (e) { toast({ title: 'Action impossible', sub: e.message, icon: 'info', sound: 'error', log: false }); }
    render();
  };
  function render() {
    const f = social.friends.find(x => x.id === id);
    if (!f) { page.replaceChildren(h('div.gb-empty', h('h2', 'Profil indisponible'), h('p', 'Ce joueur ne fait plus partie de vos amis.'))); return; }
    const p = social.presenceOf(f.id);
    const g = p.online && p.game && byId[p.game];
    const acts = friendActions(f, run);
    const key = layer?.focused?.dataset.key;
    page.replaceChildren(
      h('div.prof-banner', img(art.hero(g ? g.id : f.avatar))),
      h('div.prof-head', h('div.avatar', img(art.thumb(f.avatar))),
        h('div', h('div.prof-name', f.psn), h('div.prof-id', h(`span.online-dot${p.online ? '' : '.off'}`), presenceText({ ...p, lastSeen: f.lastSeen })))),
      h('div.prof-actions', acts.length
        ? acts.map((a, i) => h(`button.btn${i ? '' : '.primary'}`, { f: true, 'data-key': a.icon, ...(i ? {} : { 'data-autofocus': '' }), onok: a.onok }, h('span.icw', { html: icon(a.icon) }), a.label))
        : h('button.btn', { f: true, 'data-key': 'base', 'data-autofocus': '', onok: () => import('./gamebase.js').then(m => go(m.gamebaseScreen, { tab: 'friends' })) }, h('span.icw', { html: icon('friends') }), 'Base de jeu')),
      g ? [h('div.section-title', 'En train de jouer'),
        h('div.shelf', { 'data-scroll': 'x', 'data-row': '' }, h('div.game-prog', { f: true, 'data-key': 'game', onok: () => import('../actions.js').then(m => m.openProduct(g.id)) }, img(art.hero(g.id)),
          h('div.gp', h('div.gpt', g.title), h('div.gpm', h('span', p.partyId ? `Groupe de ${p.partySize || 1}` : 'En solo')))))] : null,
      h('div.section-title', 'À propos'),
      h('div.stat-cards',
        h('div.stat', h('span.icw', { html: icon('friends') }), h('div', h('b', new Date(f.since).toLocaleDateString('fr-FR')), h('span', 'Amis depuis'))),
        h('div.stat', h('span.icw', { html: icon(p.online ? 'wifi' : 'user') }), h('div', h('b', p.online ? 'En ligne' : 'Hors ligne'), h('span', p.online ? (p.partyId ? 'Dans un groupe' : 'Disponible') : 'Dernière activité')))),
      h('div', { style: { height: '4rem' } }));
    if (layer && nav.top === layer) {
      const el = key && page.querySelector(`[data-key="${CSS.escape(key)}"]`);
      if (el) nav.focus(el, { silent: true, instant: true });
      else nav.focusFirst(layer);
    }
  }
  const offs = [];
  layer = {
    root, bg: null, mood: 'home', shade: 1, dim: .7, hints: [['ok', 'Sélectionner'], ['back', 'Retour']],
    onEnter() { offs.push(social.on('friends', render), social.on('presence', render)); social.refresh(); },
    onLeave() { offs.forEach(f => f()); },
  };
  render();
  return layer;
}
