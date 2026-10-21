// Profile: banner, level, trophy totals, games with progress, friends.
import { byId, USERS, FRIENDS } from '../data.js';
import { state, allTrophies, trophyStats } from '../state.js';
import { h, icon, art, img, hours, avatarImg } from '../ui.js';
import { go, dialog, toast } from '../shell.js';
import { showTrophies } from './hub.js';
import { openHub } from '../actions.js';

export function profileScreen() {
  const u = USERS.find(x => x.id === state.user) || USERS[0];
  const tr = allTrophies();
  const total = tr.platinum + tr.gold + tr.silver + tr.bronze;
  const played = Object.keys(state.trophies).filter(id => byId[id]).sort((a, b) => (state.lastPlayed[b] || 0) - (state.lastPlayed[a] || 0));
  const friendDialog = f => dialog({
    title: f.name,
    body: h('div', { style: { display: 'flex', gap: '3rem', alignItems: 'center' } }, avatarImg(f.avatar, '14rem'),
      h('div', h('div', { style: { fontSize: '2.4rem', color: '#fff' } }, f.status === 'online' ? 'En ligne' : f.status === 'busy' ? 'Occupé' : 'Hors ligne'),
        h('div', { style: { marginTop: '.6rem' } }, f.game ? `Joue à ${byId[f.game].title}` : f.seen ? `Vu ${f.seen}` : 'Ne pas déranger'))),
    actions: [
      ...(f.game ? [{ label: 'Rejoindre la partie', primary: true, onok: () => toast({ title: 'Invitation envoyée', sub: `${f.name} · ${byId[f.game].title} (simulé)`, img: art.thumb(f.game) }) }] : []),
      { label: 'Envoyer un message', primary: !f.game, onok: () => toast({ title: 'Message envoyé', sub: `À ${f.name} : « On joue ce soir ? » (simulé)`, icon: 'friends' }) },
      { label: 'Fermer', sound: 'back' },
    ],
  });
  const root = h('div.profile', h('div.page', { 'data-scroll': 'y', 'data-pad': 160 },
    h('div.prof-banner', img(art.hero(u.avatar))),
    h('div.prof-head', h('div.avatar', img(art.thumb(u.avatar))),
      h('div', h('div.prof-name', u.name), h('div.prof-id', h('span.online-dot'), u.psn, '·', 'En ligne')),
      h('div.level', h('div', { style: { textAlign: 'right' } }, h('small', 'Niveau de trophées'), h('div', { style: { fontSize: '2rem', color: 'var(--dim)' } }, `${total} trophées`)),
        h('div.level-ring', { style: { '--p': (u.level * 37) % 100 } }, u.level))),
    h('div.prof-actions',
      h('button.btn.primary', { f: true, 'data-autofocus': '', onok: () => toast({ title: 'Profil', sub: 'La modification du profil est simulée', icon: 'user', log: false }) }, h('span.icw', { html: icon('user') }), 'Modifier le profil'),
      h('button.btn', { f: true, onok: () => import('./boot.js').then(m => go(m.usersScreen, { switching: true })) }, h('span.icw', { html: icon('friends') }), 'Changer d’utilisateur')),
    h('div.section-title', 'Trophées'),
    h('div.stat-cards', ['platinum', 'gold', 'silver', 'bronze'].map(k => h('div.stat', h(`span.tro.${k}`), h('div', h('b', tr[k]), h('span', { platinum: 'Platine', gold: 'Or', silver: 'Argent', bronze: 'Bronze' }[k]))))),
    h('div.section-title', 'Jeux', h('small', 'Progression des trophées')),
    h('div.shelf', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'games' }, played.map(id => {
      const st = trophyStats(id);
      return h('div.game-prog', { f: true, onok: () => showTrophies(id) }, img(art.hero(id)), h('div.gp', h('div.gpt', byId[id].title),
        h('div.progress', h('i', { style: { width: st.pct + '%' } })), h('div.gpm', h('span', `${st.pct} %`), h('span', hours(state.playTime[id])))));
    })),
    h('div.section-title', 'Amis', h('small', `${FRIENDS.filter(f => f.status === 'online').length} en ligne`)),
    h('div.shelf', { 'data-scroll': 'x', 'data-row': '', 'data-group': 'friends' }, FRIENDS.map(f => h('div.friend', { f: true, onok: () => friendDialog(f) },
      avatarImg(f.avatar, '11rem'), h('div.fn', f.name),
      h('div.fs', h(`i.${f.status}`), f.game ? byId[f.game].title : f.status === 'busy' ? 'Occupé' : f.seen ? `Vu ${f.seen}` : 'Hors ligne')))),
    h('div', { style: { height: '4rem' } })));
  return { root, bg: null, mood: 'home', shade: 1, dim: .7, hints: [['ok', 'Sélectionner'], ['back', 'Retour']] };
}
