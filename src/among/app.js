// Among Us inside the console: main menu, online / local / free play menus, room creation and search, joining by
// code; then the world (lobby and game) handled by Play. All the rules run in the room (server, hosting console or
// this page for free play).
import { net } from '../net.js';
import { session as account } from '../session.js';
import { ServerLink, HostLink, GuestLink, LocalLink } from './link.js';
import { GameClient } from './client.js';
import { Play } from './play.js';
import { sfx } from './sound.js';
import { el, starfield, mapLogo } from './ui.js';
import { drawCrew } from './art/crew.js';
import { CREW_HEIGHT, NAME_MAX, cleanSettings, defaultSettings, COLORS } from './core/rules.js';
import { loadSprites } from './art/sprites.js';
import { preloadMapImages } from './art/maparts.js';

const KEY = 'ps5ux.among';
export function profile() {
  let p = {};
  try { p = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { /* ignore */ }
  return { name: (account.current?.psn || 'Joueur').slice(0, NAME_MAX), color: 'red', hat: 'none', skin: 'none', visor: 'none', pet: 'none', plate: 'none', map: 'skeld', ...p };
}
export function saveProfile(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode */ } }

export class AmongApp {
  constructor() {
    this.root = el('div', 'au-app');
    this.stars = starfield(); this.ui = el('div', 'au-ui');
    this.root.append(this.stars.el, this.ui);
    this.play = null; this.closed = false; this.prof = profile();
    loadSprites(); preloadMapImages();
  }
  get me() { return { id: account.current?.id || 'local-' + Math.random().toString(36).slice(2), name: this.prof.name }; }
  hello() { const p = this.prof; return { name: p.name, color: p.color, look: { color: p.color, hat: p.hat, skin: p.skin, visor: p.visor, pet: p.pet, plate: p.plate } }; }
  online() { return net.mode === 'online' && account.online && net.status === 'online'; }
  start() { this.menu(); }
  screen(cls, ...kids) { this.ui.replaceChildren(el('div', `au-screen ${cls}`, kids)); this.stars.el.hidden = false; this.layerFocus(); return this.ui.firstChild; }
  layerFocus() { queueMicrotask(() => { const f = this.ui.querySelector('[data-autofocus]') || this.ui.querySelector('button,input'); f?.focus({ preventScroll: true }); }); }
  btn(label, onClick, cls = '', attrs = {}) { const b = el('button', /^(am|hs)-/.test(cls) ? cls : `au-btn ${cls}`, label, { type: 'button', ...attrs }); b.addEventListener('click', () => { sfx.play('click'); onClick(); }); return b; }
  toast(msg) { const t = el('div', 'au-toast', msg); this.root.append(t); setTimeout(() => t.remove(), 3800); }

  // ------------------------------------------------------------------ menus
  // Laid out like the game's main menu: account bar, logo and the button column on the left, the big screen on the
  // right whose page changes (Jouer → Local / En ligne → Créer / Entrer un code / Trouver). Pictures and icons are
  // cut from the reference screenshots (tools/among/cut_menu.py).
  menu(page = 'home') {
    if (!this.shell?.isConnected) this.buildShell();
    this.page(page);
  }
  buildShell() {
    this.nameTag = el('span', 'am-name', this.prof.name);
    const big = (icon, label, page, attrs) => this.btn([img(icon), el('span', '', label)], () => this.page(page), 'am-big', attrs);
    const small = (icon, label, page) => this.btn([img(icon), el('span', '', label)], () => this.page(page), 'am-small');
    this.stage = el('div', 'am-stagein');
    this.shell = el('div', 'am-shell au-main', [
      el('div', 'am-top', [img('ic-badge', 'am-badge'), el('i', 'am-dot'), this.nameTag, this.btn('AMIS', () => this.page('friends'), 'am-friends')]),
      el('div', 'am-side', [
        img('logo', 'am-logo'),
        el('div', 'am-panel', [
          big('ic-play', 'JOUER', 'play', { 'data-autofocus': '' }), big('ic-inventory', 'INVENTAIRE', 'inventory'), big('ic-store', 'BOUTIQUE', 'store'),
          el('hr'),
          small('ic-news', 'INFOS', 'news'), small('ic-account', 'MON COMPTE', 'account'), small('ic-settings', 'RÉGLAGES', 'settings'),
          this.btn('CRÉDITS', () => this.page('credits'), 'am-credits'),
        ]),
        el('div', 'am-ver', 'Recréation non officielle · v1.0'),
      ]),
      el('div', 'am-stage', [floaters(this), this.stage]),
    ]);
    this.ui.replaceChildren(this.shell); this.stars.el.hidden = true;
  }
  page(p) {
    this.cur = p;
    const S = this.stage;
    S.parentElement.classList.toggle('home', p === 'home');      // the empty screen is plain space, like the game
    const head = (title, back) => el('div', 'am-head', [back ? this.btn([el('i', 'am-tri'), el('span', '', 'RETOUR')], back, 'am-back back') : null, el('h1', '', title)]);
    const card = (picture, label, fn, cls = '', attrs) => this.btn([img(picture), el('span', 'am-band', el('b', '', label))], fn, 'am-card ' + cls, attrs);
    const text = (...ps) => el('div', 'am-text', ps.map(t => el('p', '', t)));
    switch (p) {
      case 'home': S.replaceChildren(); break;
      case 'play': S.replaceChildren(head('JOUER'),
        el('div', 'am-cards', [card('card-local', 'LOCAL', () => this.hostScreen(true), 'bright', { 'data-autofocus': '' }), card('card-online', 'EN LIGNE', () => this.page('online'), 'bright')]),
        el('div', 'am-under', [this.btn('COMMENT JOUER', () => this.page('howto'), 'am-small'), this.btn('ENTRAÎNEMENT', () => this.page('freeplay'), 'am-small')])); break;
      case 'online': S.replaceChildren(head('EN LIGNE', () => this.page('play')),
        el('div', 'am-online', [
          el('div', 'am-col', [card('card-create', 'CRÉER UNE PARTIE', () => this.hostScreen(false), 'wide', { 'data-autofocus': '' }), card('card-code', 'ENTRER UN CODE', () => this.page('code'), 'wide')]),
          el('i', 'am-vsep'),
          card('card-find', 'TROUVER UNE PARTIE', () => (this.online() ? this.findScreen() : this.toast('Trouver une partie demande le serveur du jeu. Sans serveur, rejoins tes amis avec leur code.')), 'bright tall'),
        ])); break;
      case 'code': this.codePage(head('ENTRER UN CODE', () => this.page('online'))); break;
      case 'freeplay': S.replaceChildren(head('ENTRAÎNEMENT', () => this.page('play')),
        el('div', 'am-maps', ['skeld', 'polus'].map((m, i) => this.btn([el('img', '', [], { src: `among/maps/${m}.webp`, alt: '' }), m === 'skeld' ? img('logo-skeld', 'am-maplogo') : mapLogo(m)], () => this.connect({ freeplay: m }), 'am-map', i ? {} : { 'data-autofocus': '' }))),
        el('p', 'am-hint', 'Explore la carte seul avec des mannequins, essaie toutes les tâches et tous les rôles.')); break;
      case 'howto': S.replaceChildren(head('COMMENT JOUER', () => this.page('play')), text(
        'Équipiers : termine tes tâches (liste en haut à gauche, flèches jaunes) et trouve les Imposteurs. Signale les corps et appelle des réunions pour voter.',
        'Imposteurs : élimine l’équipage sans te faire voir, sabote le vaisseau et voyage par les conduits. Tes fausses tâches ne comptent pas.',
        'Fantômes : après ta mort, continue tes tâches (équipiers) ou tes sabotages (imposteurs). Tu ne parles et n’écris qu’aux autres fantômes.',
        'Commandes : flèches / WASD ou stick gauche pour marcher · E, Espace ou ✕ : Utiliser · Q ou □ : Tuer · R ou △ : Signaler · F : Saboter · V : Conduit · C : Capacité · Tab : Carte · Entrée : Discussion · T (maintenir) : parler si « Appuyer pour parler » est activé.',
        'Chat vocal de proximité : plus un joueur est loin, moins tu l’entends ; au-delà de la portée, plus du tout. Les vivants n’entendent que les vivants, les fantômes que les fantômes.')); break;
      case 'inventory': this.inventoryPage(head('INVENTAIRE')); break;
      case 'store': S.replaceChildren(head('BOUTIQUE'), text('Pas de boutique dans cette recréation : toutes les couleurs sont gratuites.'), el('div', 'am-under', [this.btn('OUVRIR L’INVENTAIRE', () => this.page('inventory'), 'am-small', { 'data-autofocus': '' })])); break;
      case 'news': S.replaceChildren(head('INFOS'), text(
        'Parties en ligne de 4 à 15 joueurs sur The Skeld et Polus, rôles officiels, sabotages et réunions.',
        'Chat vocal de proximité intégré : active le micro dans le salon (bouton micro en haut à droite).',
        'Sans serveur, la console qui crée la partie l’héberge : partage le code du salon à tes amis.')); break;
      case 'account': {
        const inp = el('input', 'am-input', [], { maxlength: NAME_MAX, value: this.prof.name, 'aria-label': 'Ton pseudo', autocomplete: 'off', spellcheck: 'false', 'data-autofocus': '' });
        inp.addEventListener('change', () => { this.prof.name = inp.value.replace(/[<>]/g, '').trim().slice(0, NAME_MAX) || this.prof.name; inp.value = this.prof.name; this.nameTag.textContent = this.prof.name; saveProfile(this.prof); });
        S.replaceChildren(head('MON COMPTE'), el('div', 'am-form', [el('label', '', 'PSEUDO'), inp, el('label', '', 'COMPTE'), el('div', 'am-fval', account.current?.psn || 'Invité')]), text('Le pseudo est affiché au-dessus de ton personnage et dans les réunions.'));
        break;
      }
      case 'settings': S.replaceChildren(head('RÉGLAGES'), text('Micro, écouteurs et volume de chaque joueur se règlent dans la partie (bouton engrenage en haut à droite).', 'Manette : ✕ Utiliser · □ Tuer · △ Signaler · L1 Carte · R1 Saboter · L2 Conduit · R2 Capacité · Options : Réglages.'), el('div', 'am-under', [this.btn('QUITTER AMONG US', () => this.exit?.(), 'am-small', { 'data-autofocus': '' })])); break;
      case 'credits': S.replaceChildren(head('CRÉDITS'), text('Projet de fan non officiel, non affilié à Innersloth.', 'Cartes, personnages, illustrations des menus et bruitages proviennent des références fournies par le propriétaire du projet.')); break;
      case 'friends': S.replaceChildren(head('AMIS'), text('Crée une partie puis donne le code du salon à tes amis : ils le tapent dans Jouer → En ligne → Entrer un code.', 'Tes amis de la console peuvent aussi t’envoyer une invitation depuis le Centre de contrôle.')); break;
    }
    this.layerFocus();
  }
  codePage(head) {
    const code = el('input', 'am-code', [], { maxlength: 6, placeholder: 'Entrer le code...', 'aria-label': 'Code de la partie', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', 'data-autofocus': '' });
    const F = ['HÔTE', 'CAPACITÉ', 'RÉGION', 'TYPE DE CHAT'].map(l => [l, el('div', 'am-fval')]);
    const join = () => { if (code.value.length !== 6) { this.toast('Le code contient 6 lettres.'); return; } this.connect({ join: code.value }); };
    const go = this.btn('REJOINDRE UNE PARTIE', join, 'am-join', { disabled: '' });
    let seq = 0;
    code.addEventListener('input', async () => {
      code.value = code.value.toUpperCase().replace(/[^A-Z]/g, '');
      const ok = code.value.length === 6; go.disabled = !ok;
      F.forEach(([, v]) => { v.textContent = ''; });
      if (!ok || !this.online()) return;
      const s = ++seq;
      try {
        const r = await ServerLink.peek(code.value);
        if (s !== seq) return;
        const vals = [r.host, `${r.players}/${r.max}`, r.region, r.voice ? 'Chat libre + vocal' : 'Chat libre'];
        F.forEach(([, v], i) => { v.textContent = vals[i]; });
      } catch (e) { if (s === seq) F[0][1].textContent = e.message; }
    });
    code.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); join(); } });
    this.stage.replaceChildren(head, el('div', 'am-codeform', [code, el('div', 'am-form', F.flatMap(([l, v]) => [el('label', '', l), v])), go]));
  }
  inventoryPage(head) {
    const preview = el('canvas', 'am-preview', [], { width: 300, height: 380 }), label = el('div', 'am-plabel');
    const grid = el('div', 'am-swatches');
    const draw = () => {
      const g = preview.getContext('2d'); g.clearRect(0, 0, 300, 380);
      drawCrew(g, this.prof.color, 150, 350, 320);
      label.textContent = (COLORS.find(c => c.id === this.prof.color) || COLORS[0]).name.toUpperCase();
      grid.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.c === this.prof.color));
    };
    grid.append(...COLORS.map((c, i) => this.btn([], () => { this.prof.color = c.id; saveProfile(this.prof); draw(); }, 'am-swatch', { title: c.name, 'data-c': c.id, style: `--c:${c.body};--s:${c.shade}`, ...(i ? {} : { 'data-autofocus': '' }) })));
    this.stage.replaceChildren(head, el('div', 'am-inv', [grid, el('div', 'am-pwrap', [preview, label])]));
    draw();
  }
  // full-screen pages on the starry background, like the game's « Héberger » screen
  hostScreen(lan) {
    const s = { ...defaultSettings(), map: this.prof.map || 'skeld', maxPlayers: 15 };
    const create = () => this.connect({ create: cleanSettings(s), public: false, lan });
    const list = el('div', 'hs-list');
    this.screen('hs',
      el('div', 'hs-head', [img('host-avatar', 'hs-av'), el('div', 'hs-right', [el('h1', '', 'HÉBERGER'),
        el('div', 'hs-create', [el('span', '', 'Créer'), this.btn('Classique', create, 'hs-btn', { 'data-autofocus': '' }), this.btn('Cache-cache', () => this.toast('Le mode Cache-cache n’existe pas encore dans cette recréation.'), 'hs-btn')])])]),
      el('div', 'hs-label', lan ? 'Parties disponibles' : 'Le salon est créé en privé : la carte, la capacité et les règles se changent dans le salon (Modifier).'),
      lan ? list : null,
      this.btn('Retour', () => this.menu(lan ? 'play' : 'online'), 'hs-btn hs-back back'));
    if (!lan) return;
    if (!this.online()) { list.append(el('p', 'hs-empty', 'Sans serveur, les parties du réseau ne sont pas visibles : crée une partie et partage son code.')); return; }
    const load = async () => {
      if (!list.isConnected) return;
      try {
        const rooms = await ServerLink.list({ lan: true });
        if (!list.isConnected) return;
        list.replaceChildren(...rooms.map(r => this.btn([el('b', '', r.host), mapLogo(r.map), el('span', '', `${r.players}/${r.max}`)], () => this.connect({ join: r.code }), 'hs-room')));
      } catch { /* the next refresh tries again */ }
      setTimeout(load, 3000);
    };
    load();
  }
  findScreen() {
    const list = el('div', 'hs-list', el('p', 'hs-empty', 'Recherche…'));
    let mapF = '';
    const load = async () => {
      list.replaceChildren(el('p', 'hs-empty', 'Recherche…'));
      try {
        const rooms = await ServerLink.list({ map: mapF || undefined });
        list.replaceChildren(...(rooms.length ? rooms.map(r => this.btn([el('b', '', r.host), mapLogo(r.map), el('span', '', `${r.players}/${r.max}`), el('span', '', `${r.impostors} imp.`)], () => this.connect({ join: r.code }), 'hs-room')) : [el('p', 'hs-empty', 'Aucune partie publique pour le moment. Crée la tienne !')]));
        this.layerFocus();
      } catch (e) { list.replaceChildren(el('p', 'hs-empty', e.message || 'Impossible de charger la liste.')); }
    };
    this.screen('hs',
      el('div', 'hs-head', [img('card-find', 'hs-av'), el('div', 'hs-right', [el('h1', '', 'TROUVER'),
        el('div', 'hs-create', [el('span', '', 'Carte'), ...[['', 'Toutes'], ['skeld', 'The Skeld'], ['polus', 'Polus']].map(([m, n], i) => this.btn(n, () => { mapF = m; load(); }, 'hs-btn', i ? {} : { 'data-autofocus': '' })), this.btn('Actualiser', () => load(), 'hs-btn')])])]),
      el('div', 'hs-label', 'Parties disponibles'), list,
      this.btn('Retour', () => this.menu('online'), 'hs-btn hs-back back'));
    load();
  }

  // ------------------------------------------------------------------ connection
  async connect(opts) {
    const me = this.me;
    const wait = this.screen('au-wait', el('div', 'au-spinner'), el('p', '', opts.freeplay ? 'Préparation de l’entraînement…' : opts.join ? `Connexion à la partie ${opts.join}…` : 'Création de la partie…'), this.btn('Annuler', () => { cancelled = true; link?.close(); this.menu(this.cur || 'home'); }, 'ghost back'));
    let link = null, cancelled = false;
    try {
      if (opts.freeplay) { link = new LocalLink(me); }
      else if (this.online()) {
        link = new ServerLink();
        if (opts.join) await link.join(opts.join, this.hello()); else await link.create({ settings: opts.create, public: opts.public, lan: opts.lan, region: 'Europe' }, this.hello());
      } else if (opts.join) {
        link = new GuestLink(me);
        link.addEventListener('status', e => { if (e.detail.s === 'waiting' && !cancelled) wait.querySelector('p').textContent = `Partie ${opts.join} : l’hôte n’est pas encore joignable, nouvelle tentative…`; });
        await link.join(opts.join, this.hello());
      }
      else { link = new HostLink(me); await link.create(this.hello(), opts.create); }
    } catch (e) { link?.close(); if (cancelled) return; sfx.play('leave'); this.onlineMenuError(e.message || 'Connexion impossible.'); return; }
    if (cancelled) { link.close(); return; }       // « Annuler » pressed while connecting: leave the room we just entered
    const client = new GameClient(link, me);
    this.play = new Play(this, client, { freeplay: opts.freeplay });
    if (opts.freeplay) { link.start(this.hello()); queueMicrotask(() => client.send({ k: 'fp', a: 'start', map: opts.freeplay, role: 'crewmate' })); }
  }
  onlineMenuError(msg) { this.menu(this.cur || 'home'); this.toast(msg); }
  leaveWorld(reason) {
    this.play?.destroy(); this.play = null;
    this.menu();
    if (reason) this.toast(reason);
  }
  // console hooks
  action(a, ev) {
    if (this.play) return this.play.action(a, ev);
    if (a === 'back') { const b = this.ui.querySelector('.back'); if (b) { b.click(); return true; } if (this.shell?.isConnected && this.cur !== 'home') { this.page('home'); return true; } }
    return false;
  }
  suspend() { this.play?.suspend(); }
  resume() { this.play?.resume(); }
  destroy() { this.closed = true; this.play?.destroy(); this.stars.stop(); }
}

const img = (name, cls = '') => el('img', cls, [], { src: `among/ui/${name}.webp`, alt: '', draggable: 'false' });
// the space behind the right screen of the main menu: stars and two crewmates drifting and turning
function floaters(app) {
  const c = el('canvas', 'am-float'), shell = () => app.shell;
  let mine = null;                                                 // the menu this canvas belongs to (set on the first frame)
  const stars = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.6 }));
  const crew = [{ color: 'cyan', x: .25, y: .3, vx: .012, vy: .004, a: -1.1, va: .25, h: .2 }, { color: 'orange', x: .78, y: .22, vx: -.008, vy: .006, a: .9, va: -.18, h: .26 }];
  let last = performance.now();
  const tick = t => {
    mine ||= shell();
    if (app.closed || shell() !== mine) return;                    // the app closed or the menu was rebuilt: stop
    requestAnimationFrame(tick);
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (!c.isConnected) return;                                    // in a game: the menu waits
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const g = c.getContext('2d');
    g.clearRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.35)';
    for (const s of stars) { g.beginPath(); g.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); g.fill(); }
    for (const k of crew) {
      k.x += k.vx * dt; k.y += k.vy * dt; k.a += k.va * dt;
      if (k.x < -.2) k.x = 1.2; if (k.x > 1.2) k.x = -.2; if (k.y < -.2) k.y = 1.2; if (k.y > 1.2) k.y = -.2;
      const H = k.h * h;
      g.save(); g.translate(k.x * w, k.y * h); g.rotate(k.a); drawCrew(g, k.color, 0, H / 2, H); g.restore();
    }
  };
  requestAnimationFrame(tick);
  return c;
}
export { COLORS, CREW_HEIGHT };
