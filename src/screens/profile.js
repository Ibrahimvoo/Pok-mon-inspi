// Profile: the signed-in account, trophy level, games with progress and the real friends list.
import { byId } from '../data.js';
import { state, allTrophies, trophyStats } from '../state.js';
import { h, icon, art, img, hours, avatarImg } from '../ui.js';
import { go, toast } from '../shell.js';
import { session } from '../session.js';
import { social } from '../social.js';
import { showTrophies } from './hub.js';
import { presenceText } from './gamebase.js';

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
      friendsShelf.replaceChildren(h('div.friend', { f: true, onok: () => openBase('friends') }, h('div.avatar.add', { html: icon('user') }), h('div.fn', 'Profil hors ligne'), h('div.fs', 'Connectez-vous pour vos amis')));
      return;
    }
    const list = [...social.friends].sort((a, b) => social.presenceOf(b.id).online - social.presenceOf(a.id).online);
    friendsTitle.replaceChildren('Amis', h('small', `${list.filter(f => social.presenceOf(f.id).online).length} en ligne`));
    friendsShelf.replaceChildren(
      ...list.map(f => { const p = social.presenceOf(f.id); return h('div.friend', { f: true, onok: () => openBase('friends') }, avatarImg(f.avatar, '11rem'), h('div.fn', f.psn), h('div.fs', h(`i.${p.online ? 'online' : 'off'}`), presenceText({ ...p, lastSeen: f.lastSeen }, { short: true }))); }),
      h('div.friend', { f: true, onok: () => openBase(list.length ? 'friends' : 'add') }, h('div.avatar.add', { html: icon('userPlus') }), h('div.fn', 'Ajouter un ami'), h('div.fs', 'Par identifiant en ligne')));
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
}
