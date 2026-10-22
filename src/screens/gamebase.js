// Game Base: friends with live presence, the current voice party (members, mic, chat), friend requests and search.
import { byId, GAMES } from '../data.js';
import { state, installed } from '../state.js';
import { h, icon, art, img, ago } from '../ui.js';
import { go, menu, dialog, toast, confirmDialog, renderHints } from '../shell.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { audio } from '../audio.js';
import { net } from '../net.js';
import { session } from '../session.js';
import { social, joinGame } from '../social.js';
import { voice } from '../rtc.js';
import { openKeyboard } from '../keyboard.js';

const TABS = [['friends', 'Amis'], ['party', 'Groupe'], ['requests', 'Demandes'], ['add', 'Ajouter un ami']];
const PADS = ['ps', 'xbox', 'nintendo', 'generic'];
const QUICK = ['On joue ?', 'J’arrive !', 'Une minute', 'Bien joué !', 'Je dois y aller'];

export function presenceText(p, { short = false } = {}) {
  if (!p?.online) return p?.lastSeen ? `Hors ligne · vu ${ago(p.lastSeen).toLowerCase()}` : 'Hors ligne';
  if (p.activity === 'game' && p.game) return `Joue à ${byId[p.game]?.title || 'un jeu'}`;
  if (p.partyId) return short ? 'Dans un groupe' : `Dans un groupe (${p.partySize})`;
  return 'En ligne';
}
const dotClass = p => (!p?.online ? 'off' : p.activity === 'game' ? 'game' : 'on');

async function mediaAction(fn) {
  audio.play('ok');
  try { await fn(); } catch (e) { toast({ title: 'Vidéo', sub: e?.message || 'Action impossible.', icon: 'info', sound: 'error', log: false }); }
}

export function gamebaseScreen({ tab: startTab = 'friends' } = {}) {
  let tab = startTab === 'friends' && social.salon ? 'party' : startTab, query = '', results = null, searching = false, draft = '', typing = false;
  const tabEls = TABS.map(([k, l]) => h('button.tab', { f: true, 'data-key': 'tab-' + k, onok: () => setTab(k) }, h('span', l), h('span.tab-count')));
  const conn = h('div.conn-pill.hidden');
  const body = h('div.page', { 'data-scroll': 'y', 'data-pad': 160 });
  const root = h('div.gamebase', h('div.page-head', h('h1', { style: { display: 'flex', gap: '1.4rem', alignItems: 'center' } }, h('span.icw', { html: icon('friends') }), 'Base de jeu'), h('div.tabs', tabEls), conn), body);

  function counts() {
    const online = social.friends.filter(f => social.presenceOf(f.id).online).length;
    tabEls[0].lastChild.textContent = social.friends.length ? `${online}/${social.friends.length}` : '';
    tabEls[1].lastChild.textContent = social.party ? social.party.members.length : '';
    tabEls[2].lastChild.textContent = social.incoming.length || '';
    const s = net.status;
    // a room by code does not use the server: its connection is the friends themselves, never « Hors ligne »
    conn.classList.toggle('hidden', !social.available || s === 'online' || !!social.salon);
    conn.textContent = s === 'reconnecting' || s === 'connecting' ? 'Reconnexion au serveur…' : 'Hors ligne';
  }

  // ------------------------------------------------------------ views
  function salonView() {
    const s = social.salon;
    if (s) return h('div.gb-empty', h('div.gb-empty-ic', { html: icon('party') }), h('h2', `Salon ${s.code}`),
      h('p', s.host ? 'Vous êtes l’hôte. Envoyez le lien ou le code à vos amis : ils arrivent directement dans votre groupe vocal.' : 'Vous êtes connecté au salon de votre ami.'),
      h('div.gb-controls', { 'data-row': '' },
        h('button.btn.primary', { f: true, 'data-key': 'share', onok: () => social.shareSalon() }, h('span.icw', { html: icon('userPlus') }), 'Partager le lien'),
        h('button.btn', { f: true, 'data-key': 'open-party', onok: () => setTab('party') }, h('span.icw', { html: icon('party') }), 'Voir le groupe')));
    const join = async input => {
      const code = String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      // a 5 character code is a Pouf Party lobby: open the game straight into it
      if (code.length === 5) { const { joinGameCode } = await import('../games/pouf/console.js'); joinGameCode(code); return; }
      try { await social.joinSalon(code); setTab('party'); }
      catch (e) { toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); render(); }
    };
    const inp = h('input.f-input.salon-code', { type: 'text', maxLength: 6, autocapitalize: 'characters', autocorrect: 'off', spellcheck: false, enterkeyhint: 'go', placeholder: 'EX : K7P2QX', 'aria-label': 'Code du salon' });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); inp.blur(); join(inp.value); } });
    const codeRow = h('div.f-row', { f: true, 'data-key': 'code', onok: () => {
      if (PADS.includes(input.device)) openKeyboard({ title: 'Code du salon (6 caractères)', maxLength: 6, onDone: v => join(v) });
      else inp.focus();
    } }, h('label.f-label', 'Code du salon de votre ami'), inp);
    return h('div.salon',
      h('div.salon-card',
        h('h2', 'Jouer avec un ami'),
        h('p', 'Sans compte ni installation : créez un salon, envoyez le lien à votre ami, et vous êtes connectés directement. Chat vocal (micro et haut-parleur du téléphone, sans casque), discussion et parties partagées.'),
        h('button.btn.primary', { f: true, 'data-key': 'create-salon', onok: async () => {
          audio.play('ok');
          try { await social.createSalon(); setTab('party'); social.shareSalon(); }
          catch (e) { toast({ title: 'Création du salon impossible', sub: e.message, icon: 'party', sound: 'error', log: false }); }
        } }, h('span.icw', { html: icon('party') }), 'Créer un salon')),
      h('div.salon-card', h('h2', 'Rejoindre un salon'), h('p', 'Ouvrez le lien reçu, ou saisissez le code du salon (6 caractères) ou d’une partie de Pouf Party (5 caractères). Safari et l’app de l’écran d’accueil peuvent jouer ensemble.'), codeRow,
        h('button.btn', { f: true, 'data-key': 'join-salon', onok: () => join(inp.value) }, 'Rejoindre')),
      session.current && !session.current.online ? h('p.salon-note', 'Les comptes en ligne, la liste d’amis et les invitations nécessitent le serveur du projet. Les salons fonctionnent partout.') : null);
  }

  function offlineView() {
    const local = session.current && !session.current.online;
    return h('div.gb-empty', h('div.gb-empty-ic', { html: icon('wifi') }),
      h('h2', local ? 'Profil hors ligne' : 'Serveur en ligne injoignable'),
      h('p', local ? 'Les amis, les groupes et les appels vocaux nécessitent un compte en ligne.' : 'Vérifiez votre connexion Internet. La Base de jeu se reconnectera automatiquement.'),
      local ? h('button.btn.primary', { f: true, 'data-key': 'signin', onok: () => import('./account.js').then(m => go(m.accountScreen, { mode: net.mode === 'online' ? 'login' : 'signup' })) }, 'Se connecter ou créer un compte')
        : h('button.btn.primary', { f: true, 'data-key': 'retry', onok: async () => { audio.play('ok'); await net.probe(); if (net.mode === 'online') { net.connect(); social.refresh(); } render(); } }, 'Réessayer'));
  }

  function friendRow(f) {
    const p = social.presenceOf(f.id);
    const inMine = social.party?.members.some(m => m.id === f.id);
    return h('div.gb-row', { f: true, 'data-key': 'f-' + f.id, onok: e => friendMenu(f, e.currentTarget) },
      h('div.gb-av', h('div.avatar', img(art.thumb(f.avatar))), h(`i.pdot.${dotClass(p)}`)),
      h('div.grow', h('div.gb-name', f.psn), h('div.gb-sub', inMine ? 'Dans votre groupe' : presenceText({ ...p, lastSeen: f.lastSeen }))),
      p.online && p.partyId && !inMine && p.joinable ? h('span.gb-tag', 'Groupe ouvert') : null,
      h('span.icw.gb-more', { html: icon('more') }));
  }

  function friendsView() {
    if (!social.loaded) return h('div.gb-loading', h('div.spinner'), 'Chargement de vos amis…');
    if (social.error && !social.friends.length) return h('div.gb-empty', h('h2', 'Liste indisponible'), h('p', social.error), h('button.btn.primary', { f: true, 'data-key': 'reload', onok: () => social.refresh() }, 'Réessayer'));
    if (!social.friends.length) return h('div.gb-empty', h('div.gb-empty-ic', { html: icon('userPlus') }), h('h2', 'Aucun ami pour le moment'),
      h('p', 'Ajoutez des joueurs avec leur identifiant en ligne pour voir leur statut, les inviter et les appeler.'),
      h('button.btn.primary', { f: true, 'data-key': 'go-add', onok: () => setTab('add') }, h('span.icw', { html: icon('userPlus') }), 'Ajouter un ami'));
    const sorted = [...social.friends].sort((a, b) => (social.presenceOf(b.id).online - social.presenceOf(a.id).online) || a.psn.localeCompare(b.psn));
    const on = sorted.filter(f => social.presenceOf(f.id).online), off = sorted.filter(f => !social.presenceOf(f.id).online);
    return h('div.gb-list',
      on.length ? [h('div.section-title', { style: { marginTop: 0 } }, 'En ligne', h('small', on.length)), on.map(friendRow)] : null,
      off.length ? [h('div.section-title', { style: on.length ? null : { marginTop: 0 } }, 'Hors ligne', h('small', off.length)), off.map(friendRow)] : null);
  }

  function memberCard(m) {
    const me = m.id === session.current.id;
    const host = social.party.host === m.id;
    const state2 = !m.online ? 'Reconnexion…' : !m.voice ? 'Chat vocal désactivé' : m.muted ? 'Micro coupé' : voice.peerStates()[m.id] === 'reconnecting' ? 'Connexion instable' : 'Vocal';
    return h(`div.member${me ? '.me' : ''}`, { f: true, 'data-key': 'm-' + m.id, 'data-uid': me ? 'me' : m.id, onok: e => memberMenu(m, e.currentTarget) },
      h('div.gb-av', h('div.avatar.speak', img(art.thumb(m.avatar))), m.muted || !m.voice ? h('span.mic-off', { html: icon('micOff') }) : null),
      h('div.gb-name', m.psn, me ? h('small', ' (vous)') : null), h('div.gb-sub', host ? `Hôte · ${state2}` : state2));
  }

  function partyView() {
    const p = social.party;
    if (!p && !session.online) return salonView();
    if (!p) return h('div.gb-empty', h('div.gb-empty-ic', { html: icon('party') }), h('h2', 'Vous n’êtes dans aucun groupe'),
      h('p', 'Créez un groupe vocal puis invitez vos amis. L’appel utilise le micro et le haut-parleur de l’appareil, avec annulation d’écho : pas besoin de casque.'),
      h('button.btn.primary', { f: true, 'data-key': 'create', onok: async () => { audio.play('ok'); try { await social.createParty(); } catch (e) { toast({ title: 'Impossible de créer le groupe', sub: e.message, icon: 'party', sound: 'error', log: false }); } } }, h('span.icw', { html: icon('party') }), 'Créer un groupe vocal'));
    const g = p.game && byId[p.game.id];
    const controls = h('div.gb-controls', { 'data-row': '' },
      voice.active
        ? h(`button.btn${voice.muted ? '.on' : ''}`, { f: true, 'data-key': 'mute', onok: () => { voice.setMuted(!voice.muted); audio.play('toggle'); render(); } }, h('span.icw', { html: icon(voice.muted ? 'micOff' : 'mic') }), voice.muted ? 'Réactiver le micro' : 'Couper le micro')
        : h('button.btn.primary', { f: true, 'data-key': 'voice', onok: () => social.joinVoice().then(render) }, h('span.icw', { html: icon('mic') }), voice.joining ? 'Connexion…' : 'Rejoindre le chat vocal'),
      // camera and share: only inside the call, and only after a tap (the browser then asks for permission)
      voice.active ? h(`button.btn${voice.camera ? '.on' : ''}`, { f: true, 'data-key': 'camera', onok: () => mediaAction(() => voice.setCamera(!voice.camera)) }, h('span.icw', { html: icon('display') }), voice.camera ? 'Couper la caméra' : 'Caméra') : null,
      voice.active && (voice.sharing || voice.canShareGame || voice.canShareScreen) ? h(`button.btn${voice.sharing ? '.on' : ''}`, { f: true, 'data-key': 'share', onok: () => mediaAction(() => voice.sharing ? voice.stopShare() : voice.startShare(voice.canShareGame ? 'game' : 'screen')) },
        h('span.icw', { html: icon('switcher') }), voice.sharing ? 'Arrêter le partage' : voice.canShareGame ? 'Partager la partie' : 'Partager l’écran') : null,
      h('button.btn', { f: true, 'data-key': 'invite', onok: e => (p.salon ? social.shareSalon() : inviteMenu(e.currentTarget)) }, h('span.icw', { html: icon('userPlus') }), p.salon ? `Inviter · ${p.id}` : 'Inviter'),
      h('button.btn', { f: true, 'data-key': 'play', onok: e => playMenu(e.currentTarget) }, h('span.icw', { html: icon('play') }), g ? `Rejoindre ${g.title}` : 'Jouer ensemble'),
      h('button.btn', { f: true, 'data-key': 'leave', onok: () => confirmDialog(p.salon ? 'Quitter le salon ?' : 'Quitter le groupe ?', p.salon && social.salon?.host ? 'Vous êtes l’hôte : le salon sera fermé pour tout le monde.' : 'Le chat vocal sera coupé pour vous.', 'Quitter', () => social.leave(), { danger: true }) }, h('span.icw', { html: icon('phoneOff') }), 'Quitter'));
    const chatList = h('div.chat-list', { 'data-scroll': 'y' }, p.chat.map(m => m.sys ? h('div.chat-sys', m.text) : h(`div.chat-msg${m.from === session.current.id ? '.mine' : ''}`, h('b', m.psn), h('span', m.text))));
    const chatInput = h('input.chat-input', { type: 'text', value: draft, maxLength: 200, placeholder: 'Écrire un message…', enterkeyhint: 'send', 'aria-label': 'Message au groupe' });
    chatInput.addEventListener('input', () => { draft = chatInput.value; });
    chatInput.addEventListener('focus', () => { typing = true; });
    chatInput.addEventListener('blur', () => { setTimeout(() => { if (document.activeElement?.classList.contains('chat-input')) return; typing = false; }, 0); });
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && chatInput.value.trim()) { e.preventDefault(); e.stopPropagation(); social.chat(chatInput.value); chatInput.value = draft = ''; audio.play('ok'); } });
    // keep typing across live updates of the party
    if (typing) setTimeout(() => chatInput.focus({ preventScroll: true }), 0);
    const write = h('div.f-row.chat-row', { f: true, 'data-key': 'write', onok: () => {
      if (PADS.includes(input.device)) openKeyboard({ title: 'Message au groupe', maxLength: 200, onDone: v => { if (v.trim()) social.chat(v); } });
      else chatInput.focus();
    } }, chatInput);
    setTimeout(() => { chatList.scrollTop = chatList.scrollHeight; }, 0);
    return h('div.party-view',
      h('div.party-head', h('h2', p.salon ? `Salon ${p.id}${g ? ' · ' + g.title : ''}` : g ? `Groupe · ${g.title}` : 'Groupe vocal'), h('span.gb-sub', `${p.members.length} membre${p.members.length > 1 ? 's' : ''} · ${voice.canSetVolume ? 'volume réglable par membre' : 'volume : boutons de l’appareil'}`)),
      h('div.members', { 'data-row': '' }, p.members.map(memberCard)),
      controls,
      h('div.section-title', 'Discussion'),
      chatList,
      h('div.chips', { 'data-row': '' }, QUICK.map((q, i) => h('button.chip', { f: true, 'data-key': 'q' + i, onok: () => { social.chat(q); audio.play('ok'); } }, q))),
      write);
  }

  function requestsView() {
    const inc = social.incoming, out = social.outgoing;
    if (!inc.length && !out.length) return h('div.gb-empty', h('div.gb-empty-ic', { html: icon('bell') }), h('h2', 'Aucune demande en attente'), h('p', 'Les demandes d’ami reçues et envoyées apparaissent ici.'));
    const row = (u, actions) => h('div.gb-row.static', h('div.gb-av', h('div.avatar', img(art.thumb(u.avatar)))), h('div.grow', h('div.gb-name', u.psn), h('div.gb-sub', `Demande du ${new Date(u.since).toLocaleDateString('fr-FR')}`)), h('div.gb-actions', { 'data-row': '' }, actions));
    const act = (key, label, ic, fn, primary) => h(`button.btn.small${primary ? '.primary' : ''}`, { f: true, 'data-key': key, onok: async () => { try { await fn(); audio.play('ok'); } catch (e) { toast({ title: 'Action impossible', sub: e.message, icon: 'info', sound: 'error', log: false }); } } }, h('span.icw', { html: icon(ic) }), label);
    return h('div.gb-list',
      inc.length ? [h('div.section-title', { style: { marginTop: 0 } }, 'Demandes reçues', h('small', inc.length)), inc.map(u => row(u, [act('acc-' + u.id, 'Accepter', 'check', () => social.respond(u.id, true), true), act('dec-' + u.id, 'Refuser', 'close', () => social.respond(u.id, false))]))] : null,
      out.length ? [h('div.section-title', 'Demandes envoyées', h('small', out.length)), out.map(u => row(u, [act('can-' + u.id, 'Annuler', 'close', () => social.remove(u.id))]))] : null);
  }

  function addView() {
    const inp = h('input.f-input', { type: 'text', value: query, maxLength: 16, autocapitalize: 'none', autocorrect: 'off', spellcheck: false, enterkeyhint: 'search', placeholder: 'Identifiant en ligne', 'aria-label': 'Identifiant en ligne' });
    const doSearch = async v => {
      query = v.trim(); results = null;
      if (query.length < 2) { render(); return; }
      searching = true; render();
      try { results = await social.search(query); } catch (e) { results = { error: e.message }; }
      searching = false; render();
    };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); inp.blur(); doSearch(inp.value); } });
    const fieldRow = h('div.f-row', { f: true, 'data-key': 'q', onok: () => {
      if (PADS.includes(input.device)) openKeyboard({ title: 'Identifiant en ligne', value: query, maxLength: 16, onDone: doSearch });
      else inp.focus();
    } }, h('label.f-label', 'Rechercher un joueur'), inp, h('div.f-hint', 'Saisissez au moins 2 caractères de son identifiant en ligne, puis validez.'));
    const known = new Set([...social.friends, ...social.outgoing, ...social.incoming].map(u => u.id));
    let list = null;
    if (searching) list = h('div.gb-loading', h('div.spinner'), 'Recherche…');
    else if (results?.error) list = h('div.gb-empty', h('p', results.error));
    else if (results && !results.length) list = h('div.gb-empty', h('p', `Aucun joueur trouvé pour « ${query} ».`));
    else if (results) list = h('div.gb-list', results.map(u => h('div.gb-row', { f: true, 'data-key': 'r-' + u.id, onok: async () => {
      if (known.has(u.id)) { toast({ title: 'Déjà dans vos relations', sub: u.psn, img: art.thumb(u.avatar), sound: 'error', log: false }); return; }
      try { const r = await social.request(u.psn); audio.play('ok'); toast({ title: r.accepted ? 'Vous êtes maintenant amis' : 'Demande d’ami envoyée', sub: u.psn, img: art.thumb(u.avatar), log: false }); render(); }
      catch (e) { toast({ title: 'Demande impossible', sub: e.message, icon: 'userPlus', sound: 'error', log: false }); }
    } }, h('div.gb-av', h('div.avatar', img(art.thumb(u.avatar)))), h('div.grow', h('div.gb-name', u.psn), h('div.gb-sub', `Membre depuis ${new Date(u.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`)),
      h('span.gb-tag', known.has(u.id) ? 'Déjà ajouté' : 'Envoyer une demande'))));
    return h('div', fieldRow, list);
  }

  // ------------------------------------------------------------ menus
  function friendMenu(f, anchor) {
    const p = social.presenceOf(f.id);
    const mine = social.party;
    const inMine = mine?.members.some(m => m.id === f.id);
    const items = [];
    if (p.online && !inMine) items.push({ label: 'Démarrer un appel vocal', icon: 'phone', onok: () => run(() => social.call(f.id), `Appel de ${f.psn}…`) });
    if (p.online && mine && !inMine) items.push({ label: 'Inviter dans mon groupe', icon: 'userPlus', onok: () => run(() => social.invite(f.id), `Invitation envoyée à ${f.psn}`) });
    if (p.online && p.partyId && !inMine) items.push({ label: p.game ? `Rejoindre sa partie de ${byId[p.game]?.title}` : 'Rejoindre son groupe', icon: 'party', onok: () => run(async () => { await social.join(p.partyId); if (p.game) joinGame(p.game); }) });
    items.push({ label: 'Voir le profil', icon: 'user', onok: () => dialog({ title: f.psn, body: h('div.call-card', h('div.avatar.call-av', img(art.thumb(f.avatar))), h('div', h('div.call-name', f.psn), h('div.call-sub', presenceText({ ...p, lastSeen: f.lastSeen })), h('div.call-sub', `Amis depuis le ${new Date(f.since).toLocaleDateString('fr-FR')}`))), actions: [{ label: 'Fermer', primary: true, sound: 'back' }] }) });
    items.push({ label: 'Retirer de mes amis', icon: 'trash', onok: () => confirmDialog(`Retirer ${f.psn} ?`, 'Vous ne verrez plus son statut et ne pourrez plus l’inviter.', 'Retirer', () => run(() => social.remove(f.id)), { danger: true }) });
    menu(items, anchor);
  }
  function memberMenu(m, anchor) {
    if (m.id === session.current.id) { if (voice.active) { voice.setMuted(!voice.muted); audio.play('toggle'); render(); } return; }
    if (!voice.canSetVolume) { toast({ title: 'Volume de l’appel', sub: 'Sur iPhone et iPad, utilisez les boutons de volume de l’appareil', icon: 'volume', sound: 'error', log: false }); return; }
    menu([1, .75, .5, .25, 0].map(v => ({ label: `Volume de ${m.psn} : ${v ? Math.round(v * 100) + ' %' : 'coupé'}${voice.volume(m.id) === v ? '  ✓' : ''}`, icon: v ? 'volume' : 'micOff', onok: () => voice.setVolume(m.id, v) })), anchor);
  }
  function inviteMenu(anchor) {
    const list = social.friends.filter(f => social.presenceOf(f.id).online && !social.party?.members.some(m => m.id === f.id));
    if (!list.length) { toast({ title: 'Aucun ami disponible', sub: 'Vos amis en ligne apparaîtront ici', icon: 'friends', sound: 'error', log: false }); return; }
    menu(list.map(f => ({ label: f.psn, icon: 'userPlus', onok: () => run(() => social.invite(f.id), `Invitation envoyée à ${f.psn}`) })), anchor);
  }
  function playMenu(anchor) {
    const p = social.party;
    if (p?.game) { joinGame(p.game.id); return; }
    const games = state.installed.map(id => byId[id]).filter(Boolean);
    if (!games.length) { toast({ title: 'Aucun jeu installé', icon: 'grid', sound: 'error', log: false }); return; }
    menu(games.slice(0, 8).map(g => ({ label: g.title, icon: 'play', onok: () => joinGame(g.id) })), anchor);
  }
  async function run(fn, okMsg) {
    try { await fn(); if (okMsg) toast({ title: okMsg, icon: 'party', sound: null, log: false }); }
    catch (e) { toast({ title: 'Action impossible', sub: e.message, icon: 'info', sound: 'error', log: false }); }
    render();
  }

  // ------------------------------------------------------------ render with focus preservation
  function render() {
    const key = layer?.focused?.dataset.key;
    counts();
    root.classList.toggle('party-open', tab === 'party');
    const view = !social.available ? (session.online ? offlineView() : salonView())
      : social.salon && tab !== 'party' ? salonView()
      : tab === 'friends' ? friendsView() : tab === 'party' ? partyView() : tab === 'requests' ? requestsView() : addView();
    const st = body.scrollTop;
    body.replaceChildren(view);
    body.scrollTop = st;
    if (layer && nav.top === layer) {
      const el = key && root.querySelector(`[data-key="${CSS.escape(key)}"]`);
      if (el) nav.focus(el, { silent: true, instant: true });
      else if (!layer.focused?.isConnected) nav.focusFirst(layer);
    }
  }
  function setTab(k) {
    if (k === tab) return;
    tab = k; audio.play('tab');
    tabEls.forEach((t, i) => t.classList.toggle('on', TABS[i][0] === k));
    render();
    nav.focus(tabEls[TABS.findIndex(t => t[0] === k)], { silent: true });
  }
  tabEls[TABS.findIndex(t => t[0] === tab)].classList.add('on');

  const offs = [];
  const layer = {
    root, mood: 'home', bg: null, shade: 1, dim: .6,
    hints: [['ok', 'Sélectionner'], ['back', 'Retour'], ['l1', 'Onglet préc.'], ['r1', 'Onglet suiv.']],
    onAction(a) {
      const i = TABS.findIndex(t => t[0] === tab);
      if (a === 'l1') { setTab(TABS[(i + 3) % 4][0]); return true; }
      if (a === 'r1') { setTab(TABS[(i + 1) % 4][0]); return true; }
    },
    onEnter() {
      offs.push(social.on('friends', render), social.on('presence', () => { if (tab === 'friends') render(); else counts(); }),
        social.on('party', render), social.on('chat', () => { if (tab === 'party') render(); }), social.on('status', counts),
        voice.on('change', () => { if (tab === 'party') render(); }), voice.on('peers', () => { if (tab === 'party') render(); }), voice.on('media', () => { if (tab === 'party' && !typing) render(); }),
        voice.on('levels', lv => { root.querySelectorAll('[data-uid]').forEach(el => { el.style.setProperty('--lv', Math.min(1, (lv[el.dataset.uid] || 0) * 1.6).toFixed(2)); el.classList.toggle('talking', (lv[el.dataset.uid] || 0) > .12); }); }));
      social.refresh();
    },
    onLeave() { offs.forEach(f => f()); },
  };
  render();
  (body.querySelector('[data-f]') || tabEls[0]).setAttribute('data-autofocus', '');
  return layer;
}
