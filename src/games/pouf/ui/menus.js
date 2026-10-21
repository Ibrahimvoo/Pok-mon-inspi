// Menus of Pouf Party, built as layers of the console's navigation (spatial focus, ✕/○, mouse, touch).
import { h, icon } from '../../../ui.js';
import { nav } from '../../../nav.js';
import { input as consoleInput } from '../../../input.js';
import { dialog, confirmDialog, glyph, renderHints } from '../../../shell.js';
import { openKeyboard } from '../../../keyboard.js';
import { slider, adjustable } from '../../../widgets.js';
import { state, save } from '../../../state.js';
import { social } from '../../../social.js';
import { SPECIES, COLORS, HATS, EXTRAS, GASES, EMOTES, speciesOf } from '../view/characters.js';
import { COURSES, courseById } from '../maps/index.js';
import { levelOf, board, PRICE, CATALOG } from '../profile.js';
import { fmtTime } from './hud.js';
import { sound } from '../audio.js';
import { MAX_PLAYERS } from '../net.js';

const PADS = ['ps', 'xbox', 'nintendo', 'generic'];
const TIPS = [
  'Orientez le stick vers où la bouée doit aller, puis faites POUF !',
  'Trois coups de piques et la bouée éclate : retour au dernier checkpoint.',
  'Le SUPER POUF coûte beaucoup de gaz mais sauve des situations désespérées.',
  'Deux joueurs du même côté poussent ensemble : coordonnez-vous !',
  'Les mâchoires se referment en rythme : comptez avant de passer.',
  'Vos amis peuvent vous rejoindre à tout moment avec le code du salon.',
];
export const tip = () => TIPS[Math.floor(Math.random() * TIPS.length)];

export function logo(small = false) {
  return h(`div.pf-logo${small ? '.small' : ''}`, h('span.l1', 'POUF'), h('span.l2', 'PARTY'), h('i.cloud'), h('i.cloud.c2'), h('i.cloud.c3'));
}
const btn = (label, onok, { primary = false, cls = '', ic = null, key = null, disabled = false } = {}) =>
  h(`button.pf-btn${primary ? '.primary' : ''}${cls ? '.' + cls : ''}`, { f: true, onok: () => { sound.ui('ok'); onok(); }, 'data-key': key, disabled }, ic && h('span.icw', { html: icon(ic) }), h('span', label));

function layer(G, cls, content, opts = {}) {
  const root = h(`div.pf-${cls}`, content);
  const L = { root, hints: opts.hints || [['ok', 'Sélectionner'], ['back', 'Retour']], cls, ...opts };
  L.back ??= () => G.close(L);
  return G.push(L);
}
export function refresh(G) { for (const l of G.layers) l.refresh?.(); }

function playerCard(G) {
  const p = G.profile, lv = levelOf(p.xp), sp = speciesOf(G.me.look.species);
  return h('div.pf-card.me',
    h('div.pf-av', { style: { background: G.me.look.color } }, sp.name[0]),
    h('div', h('div.nm', G.me.name), h('div.lv', `Niveau ${lv.level}`), h('div.xp', h('i', { style: { width: (lv.into / lv.need * 100) + '%' } }))),
    h('div.coins', h('b', '●'), p.coins));
}

// ---------------------------------------------------------------- title
export function titleMenu(G) {
  const list = h('div.pf-list',
    btn('Jouer', () => G.enterLobby(), { primary: true, ic: 'play', key: 'play' }),
    btn('Rejoindre une partie', () => joinMenu(G), { ic: 'userPlus', key: 'join' }),
    btn('Personnaliser', () => customizeMenu(G), { ic: 'sparkle', key: 'custom' }),
    btn('Épreuves et records', () => coursesMenu(G), { ic: 'trophy', key: 'courses' }),
    btn('Options', () => optionsMenu(G), { ic: 'settings', key: 'options' }),
    btn('Comment jouer', () => helpMenu(G), { ic: 'info', key: 'help' }),
    btn('Quitter le jeu', () => quitConfirm(G), { ic: 'power', key: 'quit' }));
  const card = h('div.pf-me-slot', playerCard(G));
  const L = layer(G, 'title', [h('div.pf-title-l', logo(), h('div.pf-tag-line', 'La descente de rivière la plus gonflée du lagon !'), list), card], {
    back: () => quitConfirm(G),
    hints: [['ok', 'Sélectionner'], ['back', 'Quitter']],
  });
  L.refresh = () => card.replaceChildren(playerCard(G));
  L.onResume = () => L.refresh();
  G.state = 'title'; G.syncCamera();
  return L;
}
function quitConfirm(G) {
  confirmDialog('Quitter Pouf Party ?', G.lobby.members.length > 1 ? 'Vous quitterez la partie en cours et vos amis continueront sans vous.' : 'Vous retournerez à l’écran d’accueil de la console.', 'Quitter', () => G.exit(), { danger: true });
}

// ---------------------------------------------------------------- connecting / alerts
export function connecting(G, text) {
  G.closeAll();
  const L = layer(G, 'connect', h('div.pf-panel.small', h('div.pf-spin', h('i'), h('i'), h('i')), h('p', text),
    btn('Annuler', () => G.leaveLobby(), { key: 'cancel' })), { back: () => G.leaveLobby() });
  return L;
}
export function alert(G, title, text) { dialog({ title, body: text, actions: [{ label: 'OK', primary: true }] }); }

// ---------------------------------------------------------------- lobby
export function lobbyMenu(G) {
  const { lobby } = G;
  const players = h('div.pf-players'), spect = h('div.pf-spect');
  const codeEl = h('b'), statusEl = h('span.st');
  const courseBox = h('div.pf-course');
  const startBtn = btn('', () => {
    if (lobby.isHost) { if (G.canStart()) G.startMatch(); else { sound.ui(); G.toast('Tout le monde n’est pas prêt', 'Attendez que vos amis appuient sur « Prêt »', 'error'); } }
    else { const m = lobby.members.find(x => x.id === G.me.id); lobby.setReady(!m?.ready); }
  }, { primary: true, ic: 'play', key: 'start' });
  const changeBtn = btn('Changer d’épreuve', () => coursesMenu(G, { pick: true }), { ic: 'grid', key: 'course' });
  const L = layer(G, 'lobby', [
    h('div.pf-lobby-top', logo(true), h('div.pf-code', h('span', 'CODE'), codeEl), statusEl),
    h('div.pf-lobby-l', h('div.pf-panel', h('h3', 'Joueurs'), players, spect)),
    h('div.pf-lobby-r', h('div.pf-panel', h('h3', 'Épreuve'), courseBox, changeBtn)),
    h('div.pf-lobby-b', startBtn,
      btn('Inviter des amis', () => inviteMenu(G), { ic: 'userPlus', key: 'invite' }),
      btn('Personnaliser', () => customizeMenu(G), { ic: 'sparkle', key: 'custom' }),
      btn('Quitter le salon', () => confirmDialog('Quitter le salon ?', lobby.isHost && lobby.members.length > 1 ? 'Un autre joueur deviendra l’hôte.' : 'Vous retournerez au menu principal.', 'Quitter', () => G.leaveLobby(), { danger: true }), { ic: 'close', key: 'leave' })),
  ], {
    back: () => confirmDialog('Quitter le salon ?', 'Vous retournerez au menu principal.', 'Quitter', () => G.leaveLobby(), { danger: true }),
    hints: () => [['ok', 'Sélectionner'], ['back', 'Quitter le salon']],
  });
  L.refresh = () => {
    codeEl.textContent = lobby.code || '—';
    statusEl.textContent = lobby.online ? (lobby.isHost ? 'Vous êtes l’hôte · en ligne' : 'Connecté à l’hôte') : lobby.role === 'local' ? 'Hors ligne · partie solo' : 'Reconnexion…';
    statusEl.classList.toggle('off', !lobby.online);
    const list = lobby.members.length ? lobby.members : [{ ...G.me, host: true, ready: true }];
    players.replaceChildren(...Array.from({ length: MAX_PLAYERS }, (_, i) => {
      const m = list[i];
      if (!m) return h('div.pf-player.empty', h('div.pf-av'), h('div.nm', 'Place libre'), h('div.badge', 'Invitez un ami'));
      const look = m.id === G.me.id ? G.me.look : m.look;
      return h(`div.pf-player${m.id === G.me.id ? '.me' : ''}${m.online === false ? '.away' : ''}`,
        h('div.pf-av', { style: { background: look?.color } }, speciesOf(look?.species).name[0]),
        h('div.nm', m.name, m.id === G.me.id ? h('small', ' (vous)') : null),
        h(`div.badge${m.host ? '.host' : m.ready ? '.ready' : ''}`, m.online === false ? 'Reconnexion…' : m.host ? 'Hôte' : m.ready ? 'Prêt' : 'Pas prêt'));
    }));
    const extra = list.slice(MAX_PLAYERS);
    spect.replaceChildren(...(extra.length ? [h('small', `Spectateurs : ${extra.map(m => m.name).join(', ')}`)] : []));
    const c = G.course, best = G.profile.best[c.id];
    courseBox.replaceChildren(h('div.cn', c.name), h('p', c.blurb),
      h('div.meta', h('span', 'Coopération'), h('span', `${c.players} joueurs`), h('span', `${c.checkpoints.length} checkpoints`)),
      h('div.best', best ? [stars(best.stars), ` Record : ${fmtTime(best.time)}`] : 'Aucun record pour le moment'));
    changeBtn.classList.toggle('hidden', !lobby.isHost);
    const mine = lobby.members.find(x => x.id === G.me.id);
    startBtn.lastChild.textContent = lobby.isHost ? (lobby.members.length > 1 ? 'Lancer la partie' : 'Jouer en solo') : mine?.ready ? 'Prêt ! (annuler)' : 'Je suis prêt';
    startBtn.classList.toggle('waiting', lobby.isHost && !G.canStart());
    if (nav.top === L && L.focused && !L.focused.isConnected) nav.focusFirst(L);
    renderHints();
  };
  L.onResume = () => { G.state = 'lobby'; G.syncCamera(); L.refresh(); };
  G.state = 'lobby'; G.syncCamera();
  L.refresh();
  return L;
}
const stars = n => h('span.pf-stars', [1, 2, 3].map(i => h(`i${i <= n ? '.on' : ''}`, '★')));

// ---------------------------------------------------------------- invite
export function inviteMenu(G) {
  const { lobby } = G;
  const link = G.shareLink();
  const friends = h('div.pf-friends');
  const share = async () => {
    const text = `Viens jouer à Pouf Party avec moi ! Code ${lobby.code}`;
    try { if (navigator.share) { await navigator.share({ title: 'Pouf Party', text, url: link }); return; } } catch (e) { if (e?.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(link); G.toast('Lien copié', `Envoyez-le à vos amis · code ${lobby.code}`); }
    catch { dialog({ title: `Code de la partie : ${lobby.code}`, body: h('div', 'Envoyez ce lien à vos amis :', h('div.salon-link', link)), actions: [{ label: 'OK', primary: true }] }); }
  };
  const renderFriends = () => {
    const online = (social.friends || []).filter(f => social.presenceOf(f.id).online);
    if (!social.available || !online.length) {
      friends.replaceChildren(h('p.dim', social.party ? 'Les membres de votre groupe arrivent automatiquement dans ce salon quand ils lancent Pouf Party.' : 'Partagez le code ou le lien : vos amis l’ouvrent sur leur console et arrivent directement ici.'));
      return;
    }
    friends.replaceChildren(h('h4', 'Amis en ligne'), ...online.map(f => h('div.pf-friend', { f: true, onok: async () => {
      try {
        if (!social.party) await social.createParty();
        social.startGame('pouf-party');
        await social.invite(f.id);
        G.toast('Invitation envoyée', f.psn);
        const code = G.partyCode();
        if (code && lobby.isHost) G.moveLobby(code);
      } catch (e) { G.toast('Invitation impossible', e.message, 'error'); }
    } }, h('div.pf-av', f.psn[0]), h('div.nm', f.psn), h('span.badge', 'Inviter'))));
  };
  const L = layer(G, 'invite', h('div.pf-panel.mid',
    h('h2', 'Inviter des amis'),
    h('div.pf-bigcode', lobby.code || '—'),
    h('p.dim', 'Vos amis choisissent « Rejoindre une partie » dans Pouf Party et saisissent ce code, ou ouvrent le lien.'),
    h('div.salon-link', link),
    h('div.row', btn('Partager le lien', share, { primary: true, ic: 'userPlus', key: 'share' }), btn('Fermer', () => G.close(L), { key: 'close' })),
    friends));
  renderFriends();
  return L;
}

// ---------------------------------------------------------------- join with a code
export function joinMenu(G) {
  const inp = h('input.f-input.pf-codein', { type: 'text', maxLength: 5, autocapitalize: 'characters', autocorrect: 'off', spellcheck: false, enterkeyhint: 'go', placeholder: 'EX : K7P2Q', 'aria-label': 'Code de la partie' });
  const go = v => { G.close(L); G.joinCode(v); };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); inp.blur(); go(inp.value); } });
  const row = h('div.f-row', { f: true, 'data-autofocus': '', onok: () => {
    if (PADS.includes(consoleInput.device)) openKeyboard({ title: 'Code de la partie (5 caractères)', maxLength: 5, onDone: v => go(v) });
    else inp.focus();
  } }, h('label.f-label', 'Code de la partie de votre ami'), inp);
  const L = layer(G, 'join', h('div.pf-panel.mid', h('h2', 'Rejoindre une partie'), h('p.dim', 'Demandez le code à 5 caractères affiché dans le salon de votre ami.'), row,
    h('div.row', btn('Rejoindre', () => go(inp.value), { primary: true, ic: 'play', key: 'go' }), btn('Annuler', () => G.close(L), { key: 'cancel' }))));
  return L;
}

// ---------------------------------------------------------------- customisation
export function customizeMenu(G) {
  const p = G.profile;
  const look = { ...G.me.look };
  const head = h('div.pf-custom-head');
  const rows = [];
  const kinds = [
    ['species', 'Personnage', SPECIES, it => `${it.name} · ${it.kind}`],
    ['color', 'Couleur', COLORS.map(c => ({ id: c, name: c })), null],
    ['hat', 'Chapeau', HATS, it => it.name],
    ['extra', 'Accessoire', EXTRAS, it => it.name],
    ['gas', 'Gaz', GASES, it => it.name],
  ];
  const apply = () => { G.setLook({ ...look }); arenaFocus(); };
  const arenaFocus = () => { G.arena.cam.mode = 'closeup'; G.arena.cam.focusId = G.me.id; };
  for (const [key, label, list, name] of kinds) {
    const val = h('div.val'), lock = h('div.lock');
    const cur = () => Math.max(0, list.findIndex(it => it.id === look[key]));
    let idx = cur();
    const paint = () => {
      const it = list[idx], owned = p.owns(key, it);
      val.replaceChildren(...[key === 'color' ? h('i.swatch', { style: { background: it.id } }) : key === 'gas' ? h('i.swatch', { style: { background: `linear-gradient(90deg, ${it.c.join(',')})` } }) : null, name ? h('span', name(it)) : null].filter(Boolean));
      lock.textContent = owned ? (look[key] === it.id ? 'Équipé' : 'Appuyez pour équiper') : `Niveau ${it.lvl} · ou ${PRICE} pièces`;
      row.classList.toggle('locked', !owned);
    };
    const step = d => { idx = (idx + d + list.length) % list.length; const it = list[idx]; if (p.owns(key, it)) { look[key] = it.id; if (key === 'species') look.color = it.main; apply(); refreshRows(); } paint(); sound.ui(); };
    const row = h('div.pf-crow', { f: true, onok: () => {
      const it = list[idx];
      if (p.owns(key, it)) { look[key] = it.id; apply(); refreshRows(); return; }
      if (p.coins < PRICE) { sound.sputter(); G.toast('Pas assez de pièces', `Il faut ${PRICE} pièces ou le niveau ${it.lvl}`, 'error'); return; }
      confirmDialog('Débloquer cet objet ?', `${name ? name(it) : it.name} pour ${PRICE} pièces (vous en avez ${p.coins}).`, 'Débloquer', () => {
        p.coins -= PRICE; p.bought.push(key + ':' + it.id); p.save();
        look[key] = it.id; apply(); refreshRows(); refreshHead(); sound.fanfare();
      });
    } }, h('div.lab', label), h('button.arr', { type: 'button', onclick: e => { e.stopPropagation(); step(-1); } }, '‹'), val, h('button.arr', { type: 'button', onclick: e => { e.stopPropagation(); step(1); } }, '›'), lock);
    row.adjust = step;
    row.sync = () => { idx = cur(); paint(); };
    rows.push(row);
  }
  const refreshRows = () => rows.forEach(r => r.sync());
  const refreshHead = () => { const lv = levelOf(p.xp); head.replaceChildren(h('div', `Niveau ${lv.level}`, h('small', ` · ${lv.into} / ${lv.need} XP`)), h('div.coins', h('b', '●'), `${p.coins} pièces`)); };
  refreshHead(); refreshRows();
  const emotes = h('div.pf-emotes', EMOTES.map((e, i) => h(`div.emo${p.level() >= (e.lvl || 0) ? '' : '.locked'}`, h('b', e.icon), h('span', e.name), h('small', p.level() >= (e.lvl || 0) ? `Touche ${i + 1}` : `Niveau ${e.lvl}`))));
  const prevState = G.state;
  const L = layer(G, 'custom', h('div.pf-panel.side', h('h2', 'Personnaliser'), head, ...rows, h('h4', 'Emotes'), emotes, btn('Terminé', () => L.back(), { primary: true, key: 'done' })), {
    hints: [['ok', 'Équiper / débloquer'], ['back', 'Terminé']],
    onAction: a => adjustable(L, a),
    onEnter: arenaFocus,
    onLeave: () => { G.arena.cam.mode = 'orbit'; G.state = prevState; G.syncCamera(); },
  });
  return L;
}

// ---------------------------------------------------------------- courses and records
export function coursesMenu(G, { pick = false } = {}) {
  const cards = COURSES.map(c => {
    const best = G.profile.best[c.id], recs = board(c.id).slice(0, 5);
    return h(`div.pf-ccard${G.course.id === c.id ? '.sel' : ''}`, { f: true, onok: () => { if (pick && G.lobby.isHost) { G.setCourse(c); G.close(L); } } },
      h('div.cn', c.name), h('p', c.blurb),
      h('div.meta', h('span', 'Coopération'), h('span', `${c.players} joueurs`), h('span', `Objectif ★★★ : ${fmtTime(c.par[0])}`)),
      h('div.best', best ? [stars(best.stars), ` Votre record : ${fmtTime(best.time)} · ${best.deaths} éclatement${best.deaths > 1 ? 's' : ''}`] : 'Pas encore terminée'),
      h('h4', 'Records de la console'),
      recs.length ? h('ol.pf-board', recs.map(r => h('li', h('b', fmtTime(r.time)), stars(r.stars), h('span', r.names.join(', ')), h('small', `${r.deaths} 💥`)))) : h('p.dim', 'Aucun record : soyez les premiers !'));
  });
  const L = layer(G, 'courses', h('div.pf-panel.wide', h('h2', pick ? 'Choisir l’épreuve' : 'Épreuves et records'), h('div.pf-ccards', { 'data-scroll': 'y', 'data-row': '' }, cards),
    btn('Retour', () => G.close(L), { key: 'back' })));
  return L;
}

// ---------------------------------------------------------------- options
export function optionsMenu(G) {
  const s = G.settings;
  const cyc = (label, desc, get, opts, set) => {
    const v = h('span');
    const paint = () => { v.textContent = (opts.find(o => o[0] === get()) || opts[0])[1]; };
    const step = d => { let i = opts.findIndex(o => o[0] === get()); i = (i + d + opts.length) % opts.length; set(opts[i][0]); paint(); G.profile.save(); sound.ui(); };
    const el = h('div.set-item', { f: true, onok: () => step(1) }, h('div.sl', h('div.st', label), h('div.sd', desc)), h('div.sv.cycle', h('span.icw', { html: icon('chevron', 'l') }), v, h('span.icw', { html: icon('chevron') })));
    el.adjust = step; paint();
    return el;
  };
  const L = layer(G, 'options', h('div.pf-panel.mid.opts', h('h2', 'Options'),
    cyc('Visée', 'Ce que fait le stick pendant la descente', () => s.aim, [['push', 'Pousser la bouée vers le stick'], ['seat', 'Se placer vers le stick']], v => { s.aim = v; }),
    cyc('Sensibilité de la caméra', 'Souris, stick droit et glisser', () => s.camSpeed, [[.5, 'Lente'], [1, 'Normale'], [1.6, 'Rapide']], v => { s.camSpeed = v; }),
    slider('Musique', 'Volume de la musique du jeu', 'musicVol', () => sound.applySettings()),
    slider('Effets sonores', 'Poufs, plouf et compagnie', 'sfxVol', () => sound.applySettings()),
    btn('Retour', () => G.close(L), { key: 'back' })), {
    hints: [['ok', 'Changer'], ['back', 'Retour']],
    onAction: a => adjustable(L, a),
  });
  return L;
}

// ---------------------------------------------------------------- how to play
export function helpMenu(G, { first = false } = {}) {
  const pad = PADS.includes(consoleInput.device), touch = consoleInput.device === 'touch';
  const rows = touch ? [['Joystick (à gauche)', 'Viser'], ['POUF (maintenir)', 'Pousser la bouée'], ['SUPER', 'Grosse poussée'], ['😀', 'Emotes'], ['Glisser l’écran', 'Tourner la caméra']]
    : pad ? [[glyphTxt('Stick gauche'), 'Viser'], [glyph('ok'), 'Pouf (maintenir) · aussi R2'], [glyph('square'), 'Super pouf · aussi R1'], ['Stick droit', 'Caméra'], ['Croix ↑ ↓, ○, L1', 'Emotes'], [glyph('triangle'), 'Réapparaître (maintenir)'], [glyph('options'), 'Pause']]
    : [['ZQSD / WASD / flèches', 'Viser'], ['Espace / clic gauche', 'Pouf (maintenir)'], ['Maj / E / clic droit', 'Super pouf'], ['Souris (cliquer pour la capturer)', 'Caméra'], ['1 à 6', 'Emotes'], ['R (maintenir)', 'Réapparaître'], ['Échap', 'Pause']];
  const L = layer(G, 'help', h('div.pf-panel.mid', h('h2', first ? 'Avant de plonger…' : 'Comment jouer'),
    h('div.pf-rules',
      h('div', h('b', '1'), 'Chaque joueur se tient au bord de la bouée. Son POUF pousse la bouée à l’opposé.'),
      h('div', h('b', '2'), 'Orientez le stick vers où vous voulez aller : votre personnage court de l’autre côté.'),
      h('div', h('b', '3'), 'Évitez les piques, mâchoires, mines et moulins : au 3ᵉ coup, la bouée éclate et tout le monde repart du dernier checkpoint.'),
      h('div', h('b', '4'), 'Le gaz se recharge quand vous ne poussez pas. Coopérez pour aller vite !')),
    h('div.pf-keys-table', rows.map(([k, d]) => h('div', h('span.k', k), h('span', d)))),
    btn(first ? 'C’est parti !' : 'Retour', () => G.close(L), { primary: true, key: 'back' })), {
    onLeave: () => { if (G.state === 'match') G.resumeRun(); },
  });
  if (G.state === 'match') { G.input.setPlaying(false); }
  return L;
}
const glyphTxt = t => h('span', t);

// ---------------------------------------------------------------- pause
export function pauseMenu(G) {
  const host = G.lobby.isHost;
  const L = layer(G, 'pause', h('div.pf-panel.small', h('h2', 'Pause'), G.paused ? h('p.dim', 'La partie est en pause.') : h('p.dim', 'La partie continue pour vos amis !'),
    h('div.pf-list',
      btn('Reprendre', () => L.back(), { primary: true, ic: 'play', key: 'resume' }),
      btn('Comment jouer', () => helpMenu(G), { ic: 'info', key: 'help' }),
      btn('Options', () => optionsMenu(G), { ic: 'settings', key: 'options' }),
      host ? btn(G.lobby.members.length > 1 ? 'Arrêter et revenir au salon' : 'Revenir au salon', () => confirmDialog('Revenir au salon ?', 'La descente en cours sera abandonnée pour tout le monde.', 'Revenir au salon', () => { G.lobby.broadcast({ t: 'abort' }); G.abortMatch(); }), { ic: 'party', key: 'lobby' })
        : btn('Quitter la partie', () => confirmDialog('Quitter la partie ?', 'Vos amis continueront sans vous.', 'Quitter', () => G.leaveLobby(), { danger: true }), { ic: 'close', key: 'leave' }),
      btn('Quitter le jeu', () => quitConfirm(G), { ic: 'power', key: 'quit' }))), {
    hints: [['ok', 'Sélectionner'], ['back', 'Reprendre']],
    back: () => { G.close(L); },
    onAction: a => { if (a === 'options') { L.back(); return true; } },
    onLeave: () => G.resumeRun(),
  });
  return L;
}

// ---------------------------------------------------------------- results
export function resultsMenu(G) {
  const s = G.summary, rw = G.rewards, c = courseById[s.course];
  const st = rw?.stars ?? 0;
  const titles = awardTitles(s);
  const crew = h('div.pf-results-crew', s.riders.map(r => h('div.pf-rrow',
    h('div.pf-av', { style: { background: r.look?.color } }, speciesOf(r.look?.species).name[0]),
    h('div.nm', r.name), h('div.ttl', titles.get(r.id) || ''),
    h('div.st', `${r.puff.toFixed(1)} s de pouf · ${r.supers} super`))));
  const lv = levelOf(G.profile.xp);
  const rewards = rw ? h('div.pf-rewards',
    h('div.rw', h('b', `+${rw.xp}`), ' XP'), h('div.rw', h('b', `+${rw.coins}`), ' pièces'),
    h('div.lvl', `Niveau ${lv.level}`, h('div.xp', h('i', { style: { width: (lv.into / lv.need * 100) + '%' } }))),
    rw.record ? h('div.rec', 'Nouveau record personnel !') : null,
    rw.levelUp ? h('div.rec', `Niveau ${rw.levelUp} atteint !`) : null,
    rw.unlocked.length ? h('div.unl', 'Débloqué : ', rw.unlocked.map(u => u.name || u.id).join(', ')) : null) : h('p.dim', 'Vous regardiez cette descente : rejoignez la prochaine !');
  const host = G.lobby.isHost;
  const L = layer(G, 'results', h('div.pf-panel.wide.results',
    h('div.pf-res-head', h('h2', s.finished ? 'ARRIVÉE !' : 'Partie terminée'), stars(st)),
    h('div.pf-res-big', h('div', h('small', 'Temps'), h('b', fmtTime(s.time))), h('div', h('small', 'Éclatements'), h('b', String(s.deaths))), h('div', h('small', 'Checkpoints'), h('b', `${s.cps}/${c.checkpoints.length}`))),
    crew, rewards,
    h('div.row', host ? [btn('Rejouer', () => { G.close(L); G.startMatch(); }, { primary: true, ic: 'refresh', key: 'again' }), btn('Retour au salon', () => { G.state = 'lobby'; G.openBase(); }, { key: 'lobby' })]
      : [btn('Retour au salon', () => { G.state = 'lobby'; G.openBase(); }, { primary: true, key: 'lobby' }), h('span.dim', 'L’hôte choisit la suite…')])), {
    back: () => { G.state = 'lobby'; G.openBase(); },
    hints: [['ok', 'Sélectionner'], ['back', 'Salon']],
  });
  for (let k = 0; k < 2; k++) setTimeout(() => G.arena.fx.confetti(G.arena.rs.x, G.arena.rs.y + 5, G.arena.rs.z, 70, 5), 200 + k * 500);
  return L;
}
function awardTitles(s) {
  const t = new Map(), rs = s.riders;
  if (!rs.length) return t;
  const by = (f) => rs.slice().sort((a, b) => f(b) - f(a))[0];
  const engine = by(r => r.puff); if (engine.puff > 0) t.set(engine.id, 'Moteur principal');
  const sup = by(r => r.supers); if (sup.supers > 0 && !t.has(sup.id)) t.set(sup.id, 'Roi du super pouf');
  const fun = by(r => r.emotes); if (fun.emotes > 0 && !t.has(fun.id)) t.set(fun.id, 'Ambianceur');
  for (const r of rs) if (!t.has(r.id)) t.set(r.id, r.puff < 3 ? 'Touriste du lagon' : 'Équipier fiable');
  return t;
}
export { CATALOG };
