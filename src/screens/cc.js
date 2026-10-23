// Control Center (PS button): switcher cards, quick controls, notifications, downloads, Game Base, power.
import { byId } from '../data.js';
import { social } from '../social.js';
import { voice } from '../rtc.js';
import { presenceText } from './gamebase.js';
import { state, bus } from '../state.js';
import { h, icon, art, img, size, ago, avatarImg } from '../ui.js';
import { closeLayer, renderHints, timeStr, applySettings, go, toast } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { input } from '../input.js';
import { toggle, slider, adjustable } from '../widgets.js';
import { cancelDownload, openHub } from '../actions.js';
import { session, resume, endSession, suspendToHome } from './game.js';
import { powerScreen } from './boot.js';

let open = null;

export function openControlCenter({ ingame } = {}) {
  if (open) { open.close(); return; }
  const cards = h('div.cc-cards', { 'data-row': '', 'data-group': 'cards' });
  const bar = h('div.cc-bar', { 'data-row': '', 'data-group': 'bar' });
  const wrap = h('div.cc-wrap', cards, bar);
  const root = h('div.overlay.cc', wrap);
  let panel = null, panelKind = null;

  const gid = ingame || session.id;
  if (gid) {
    const g = byId[gid];
    cards.append(h('div.cc-card', { f: true, 'data-autofocus': ingame ? '' : null, onok: () => { layer.close(false); resume(); } },
      img(art.hero(gid)), h('div.ccb', h('div.cct', g.title), h('div.ccs', 'Jeu en cours · sélectionnez pour reprendre'))),
      h('div.cc-card', { f: true, onok: () => { layer.close(false); endSession(); audio.play('back'); } },
        h('div.ccb', { style: { height: '100%', display: 'grid', placeContent: 'center', textAlign: 'center', minHeight: '10rem' } }, h('div', { style: { fontSize: '4rem' }, html: icon('close') }), h('div.cct', 'Fermer le jeu'), h('div.ccs', 'La progression est sauvegardée'))));
  }
  const dlCard = h('div.cc-card', { f: true, onok: () => openPanel('downloads') }, h('div.ccb', h('div.ccs', 'Téléchargements'), h('div.cct'), h('div.progress', h('i'))));
  const syncDl = () => {
    const d = state.downloads[0];
    dlCard.classList.toggle('hidden', !d);
    if (d) { dlCard.querySelector('.cct').textContent = `${byId[d.id].title} · ${Math.round(d.p * 100)} %`; dlCard.querySelector('.progress i').style.width = d.p * 100 + '%'; }
  };
  cards.append(dlCard);
  const last = state.notifications[0];
  if (last) cards.append(h('div.cc-card', { f: true, onok: () => openPanel('notifications') }, h('div.ccb', h('div.ccs', `Notification · ${ago(last.t)}`), h('div.cct', last.title), h('div.ccs', last.sub || ''))));
  syncDl();

  const BTN = [
    ['home', 'Accueil', () => { layer.close(false); if (session.id) suspendToHome(); else { while (nav.layers.length > 1) closeLayer(nav.top, { silent: true }); } audio.play('back'); }],
    ['bell', 'Notifications', () => openPanel('notifications')],
    ['download', 'Téléchargements', () => openPanel('downloads')],
    ['friends', 'Base de jeu', () => openPanel('friends')],
    ['music', 'Musique', () => openPanel('music')],
    ['volume', 'Son', () => openPanel('sound')],
    ['access', 'Accessibilité', () => openPanel('access')],
    ['gamepad', 'Manettes', () => openPanel('pads')],
    ['power', 'Alimentation', () => openPanel('power')],
  ];
  const btnEls = BTN.map(([ic, label, fn], i) => {
    const b = h('button.round', { f: true, 'data-kind': ic, 'data-autofocus': !ingame && i === 0 ? '' : null, onok: fn }, h('span.icw', { html: icon(ic) }), h('span.cc-label', label));
    if (ic === 'bell' && state.notifications.length) b.append(h('i.dot'));
    return b;
  });
  const clock = h('div.cc-time', { 'data-clock': '' }, timeStr());
  bar.append(...btnEls.slice(0, 1), h('i.sep'), ...btnEls.slice(1), h('i.sep'), clock);

  function listItem(thumb, title, sub, onok, extra) {
    return h('div.list-item', { f: true, onok }, thumb, h('div.grow', h('div', title), sub && h('div.li-s', sub), extra));
  }
  function openPanel(kind) {
    if (panel) panel.remove();
    if (panelKind === kind) { panel = null; panelKind = null; return; }
    panelKind = kind;
    const anchor = btnEls[BTN.findIndex(b => ({ notifications: 'bell', downloads: 'download', friends: 'friends', music: 'music', sound: 'volume', access: 'access', pads: 'gamepad', power: 'power' })[kind] === b[0])];
    let title, body;
    if (kind === 'notifications') {
      title = 'Notifications';
      body = state.notifications.length ? state.notifications.slice(0, 10).map(n => listItem(n.img ? img(n.img) : n.trophy ? h(`span.tro.${n.trophy}`, { style: { width: '4.4rem', height: '4.4rem', margin: '1rem' } }) : h('span.icw', { html: icon(n.icon || 'bell') }), n.title, `${n.sub ? n.sub + ' · ' : ''}${ago(n.t)}`))
        : [h('div.empty', 'Aucune notification pour le moment.')];
    } else if (kind === 'downloads') {
      title = 'Téléchargements';
      body = state.downloads.length ? state.downloads.map((d, i) => listItem(img(art.thumb(d.id)), byId[d.id].title, i ? 'En attente' : `${Math.round(d.p * 100)} % · ${size(byId[d.id].size * d.p)} / ${size(byId[d.id].size)}`, () => { cancelDownload(d.id); openPanel(kind); openPanel(kind); }, h('div.progress', h('i', { style: { width: d.p * 100 + '%' } }))))
        : [h('div.empty', 'Aucun téléchargement en cours.')];
    } else if (kind === 'friends') {
      const openBase = tab => () => { layer.close(false); import('./gamebase.js').then(m => go(m.gamebaseScreen, { tab })); };
      // camera / share from the Control Center (also during a game): result shown, panel refreshed
      const media = async fn => {
        audio.play('ok');
        try { await fn(); } catch (e) { toast({ title: 'Vidéo', sub: e?.message || 'Action impossible.', icon: 'info', sound: 'error', log: false }); }
        if (panelKind === kind) { openPanel(kind); openPanel(kind); }
      };
      title = 'Base de jeu';
      if (!social.available) body = [h('div.empty', 'Jouez et parlez avec un ami grâce à un salon : envoyez-lui simplement le lien.'), listItem(h('span.icw', { html: icon('party') }), 'Créer ou rejoindre un salon', null, openBase('party'))];
      else {
        const p = social.party;
        const online = social.friends.filter(f => social.presenceOf(f.id).online);
        body = [
          ...(p ? [
            h('div.cc-party', p.members.map(m => h('div.cc-pm', { 'data-uid': m.id === social.me?.id ? 'me' : m.id }, h('div.avatar.speak', img(art.thumb(m.avatar))), h('span', m.psn), m.muted || !m.voice ? h('span.icw.mic-off', { html: icon('micOff') }) : null))),
            voice.active ? listItem(h('span.icw', { html: icon(voice.muted ? 'micOff' : 'mic') }), voice.muted ? 'Réactiver le micro' : 'Couper le micro', 'Chat vocal du groupe', () => { voice.setMuted(!voice.muted); audio.play('toggle'); openPanel(kind); openPanel(kind); })
              : listItem(h('span.icw', { html: icon('mic') }), 'Rejoindre le chat vocal', null, () => social.joinVoice().then(() => { openPanel(kind); openPanel(kind); })),
            ...(voice.active ? [
              listItem(h('span.icw', { html: icon('display') }), voice.camera ? 'Couper la caméra' : 'Activer la caméra', voice.camera ? 'Vos amis vous voient' : 'Visible par les membres du vocal', () => media(() => voice.setCamera(!voice.camera))),
              ...(voice.sharing || voice.canShareGame || voice.canShareScreen ? [listItem(h('span.icw', { html: icon('switcher') }), voice.sharing ? 'Arrêter le partage' : voice.canShareGame ? 'Partager la partie' : 'Partager l’écran',
                voice.sharing ? 'Vos amis voient votre partie' : voice.canShareGame ? 'Vos amis voient votre jeu en direct' : 'Fenêtre, onglet ou écran', () => media(() => voice.sharing ? voice.stopShare() : voice.startShare(voice.canShareGame ? 'game' : 'screen')))] : []),
            ] : []),
            listItem(h('span.icw', { html: icon('party') }), 'Ouvrir le groupe', `${p.members.length} membre${p.members.length > 1 ? 's' : ''}`, openBase('party')),
            listItem(h('span.icw', { html: icon('phoneOff') }), 'Quitter le groupe', null, () => { social.leave(); openPanel(kind); openPanel(kind); }),
          ] : []),
          h('div.li-s', { style: { margin: '1.4rem 0 .6rem 1.6rem', fontSize: '1.7rem' } }, `Amis en ligne (${online.length})`),
          ...(online.length ? online.slice(0, 6).map(f => listItem(avatarImg(f.avatar, '6.4rem'), f.psn, presenceText(social.presenceOf(f.id)), openBase('friends')))
            : [h('div.empty', 'Aucun ami en ligne pour le moment.')]),
          listItem(h('span.icw', { html: icon('friends') }), 'Ouvrir la Base de jeu', null, openBase(p ? 'party' : 'friends')),
        ];
      }
    } else if (kind === 'music') {
      title = 'Musique';
      body = [h('div.li-s', { style: { margin: '0 0 1.6rem 1.6rem', fontSize: '1.8rem' } }, 'Ambiance générative · s’adapte au jeu sélectionné'), toggle('Musique d’ambiance', null, 'music', applySettings), slider('Volume', null, 'musicVol', applySettings)];
    } else if (kind === 'sound') {
      title = 'Son';
      body = [toggle('Effets sonores', null, 'sfx', applySettings), slider('Volume des effets', null, 'sfxVol', () => { applySettings(); audio.play('move'); })];
    } else if (kind === 'access') {
      title = 'Accessibilité';
      body = [toggle('Réduire les animations', null, 'reduceMotion', applySettings), toggle('Contraste élevé', null, 'contrast', applySettings), toggle('Texte plus grand', null, 'bigText', applySettings)];
    } else if (kind === 'pads') {
      title = 'Manettes';
      const pads = input.pads();
      body = [...(pads.length ? pads.map(p => listItem(h('span.icw', { html: icon('gamepad') }), p.id.replace(/\s*\(.*\)/, '').slice(0, 34) || 'Manette', 'Connectée · batterie simulée 80 %', () => input.rumble(.8, .8, 300)))
        : [h('div.empty', 'Aucune manette détectée. Branchez une manette puis appuyez sur un bouton.')]),
        listItem(h('span.icw', { html: icon('keyboard') }), 'Clavier et souris', 'Toujours disponibles', null)];
    } else if (kind === 'power') {
      title = 'Alimentation';
      body = [
        listItem(h('span.icw', { html: icon('moon') }), 'Passer en mode repos', 'Les téléchargements continuent', () => { layer.close(false); go(powerScreen, { mode: 'rest' }, { sound: 'power' }); }),
        listItem(h('span.icw', { html: icon('power') }), 'Éteindre la PS5', null, () => { layer.close(false); endSession(); go(powerScreen, { mode: 'off' }, { sound: 'power' }); }),
        listItem(h('span.icw', { html: icon('refresh') }), 'Redémarrer la PS5', null, () => { layer.close(false); endSession(); go(powerScreen, { mode: 'restart' }, { sound: 'power' }); }),
      ];
    }
    panel = h('div.cc-panel', { 'data-scroll': 'y', 'data-pad': 40 }, h('h3', title), body);
    wrap.append(panel);
    const r = anchor.getBoundingClientRect(), wr = wrap.getBoundingClientRect();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    panel.style.left = Math.max(0, Math.min(wr.width - 56 * rem - 9 * rem, r.left - wr.left - 4 * rem)) + 'px';
    audio.play('open');
    const f = panel.querySelector('[data-f]');
    if (f) nav.focus(f, { silent: true });
  }

  const onChange = e => { if (e.detail === 'downloads' || e.detail === 'installed') { syncDl(); if (panelKind === 'downloads' && panel && !panel.contains(layer.focused)) { const k = panelKind; panelKind = null; openPanel(k); } } };
  bus.addEventListener('change', onChange);

  const layer = {
    root, hints: () => [['ok', 'Sélectionner'], ['back', 'Fermer'], ['ps', 'Fermer']],
    close(sound = true) { if (!nav.layers.includes(layer)) return; closeLayer(layer); if (sound) audio.play('back'); },
    back() {
      if (panel) { const k = panelKind; panel.remove(); panel = null; panelKind = null; const b = btnEls.find(x => x.dataset.kind === ({ notifications: 'bell', downloads: 'download', friends: 'friends', music: 'music', sound: 'volume', access: 'access', pads: 'gamepad', power: 'power' })[k]); if (b) nav.focus(b, { silent: true }); audio.play('back'); return; }
      layer.close();
    },
    onAction(a) {
      if (adjustable(layer, a)) return true;
      if (a === 'ps') { layer.close(); return true; }
      if (a === 'options') return true;
    },
    onLeave() { open = null; bus.removeEventListener('change', onChange); },
  };
  open = layer;
  root.classList.add('in');
  document.getElementById('app').append(root);
  nav.push(layer);
  renderHints();
  audio.play('open');
  input.rumble(.2, .1, 50);
  return layer;
}
