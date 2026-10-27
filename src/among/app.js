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
  btn(label, onClick, cls = '', attrs = {}) { const b = el('button', `au-btn ${cls}`, label, { type: 'button', ...attrs }); b.addEventListener('click', () => { sfx.play('click'); onClick(); }); return b; }
  toast(msg) { const t = el('div', 'au-toast', msg); this.root.append(t); setTimeout(() => t.remove(), 3800); }

  // ------------------------------------------------------------------ menus
  menu() {
    const hero = el('canvas', 'au-menu-crew', [], { width: 420, height: 260 });
    const g = hero.getContext('2d');
    ['red', 'blue', 'lime', 'pink', 'orange'].forEach((c, i) => drawCrew(g, c, 60 + i * 75, 210 - (i % 2) * 30, 120, { left: i > 2 }));
    this.screen('au-main',
      el('div', 'au-logo', [el('span', '', 'AMONG'), el('span', '', 'US')]),
      el('div', 'au-sub', 'Recréation non officielle — jouable à 4 à 15 joueurs'),
      hero,
      el('div', 'au-menu-col', [
        this.btn('En ligne', () => this.onlineMenu(false), 'big', { 'data-autofocus': '' }),
        this.btn('Local', () => this.onlineMenu(true), 'big'),
        this.btn('Entraînement', () => this.freeplayMenu(), 'big'),
      ]),
      el('div', 'au-menu-row', [
        this.btn('Comment jouer', () => this.howTo()),
        this.btn('Quitter', () => this.exit?.(), 'ghost'),
      ]),
      el('div', 'au-legal', 'Projet de fan non officiel, non affilié à Innersloth. Cartes, personnages et bruitages proviennent des références fournies par le propriétaire du projet.'));
  }
  nameField() {
    const inp = el('input', 'au-name', [], { maxlength: NAME_MAX, value: this.prof.name, 'aria-label': 'Ton pseudo', autocomplete: 'off', spellcheck: 'false' });
    inp.addEventListener('change', () => { this.prof.name = inp.value.replace(/[<>]/g, '').trim().slice(0, NAME_MAX) || this.prof.name; inp.value = this.prof.name; saveProfile(this.prof); });
    return el('label', 'au-namebox', [el('span', '', 'Pseudo'), inp]);
  }
  onlineMenu(lan) {
    const server = this.online();
    const code = el('input', 'au-code', [], { maxlength: 6, placeholder: 'CODE', 'aria-label': 'Code de la partie', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false' });
    code.addEventListener('input', () => { code.value = code.value.toUpperCase().replace(/[^A-Z]/g, ''); });
    code.addEventListener('keydown', e => { if (e.key === 'Enter') join(); });
    const join = () => { if (code.value.length !== 6) { this.toast('Le code contient 6 lettres.'); return; } this.connect({ join: code.value }); };
    const note = lan && !server ? el('p', 'au-note', 'Le mode Local trouve les parties créées sur le même réseau grâce au serveur du jeu. Sans serveur, crée une partie et partage son code.') : !server ? el('p', 'au-note', 'Sans serveur : la console qui crée la partie l’héberge, les autres rejoignent avec le code (connexion directe).') : null;
    this.screen('au-online',
      el('h1', '', lan ? 'Local' : 'En ligne'), this.nameField(),
      el('div', 'au-cards', [
        el('div', 'au-card', [el('h2', '', 'Héberger'), el('p', '', 'Crée une partie et invite tes amis.'), this.btn('Créer une partie', () => this.createMenu(lan), 'primary', { 'data-autofocus': '' })]),
        el('div', 'au-card', [el('h2', '', lan ? 'Réseau local' : 'Public'), el('p', '', lan ? 'Parties ouvertes sur ton réseau.' : 'Trouve une partie publique.'), this.btn('Trouver une partie', () => this.findMenu(lan), '', server ? {} : { disabled: '' })]),
        el('div', 'au-card', [el('h2', '', 'Privé'), el('p', '', 'Rejoins une partie avec son code.'), el('div', 'au-coderow', [code, this.btn('→', join, 'primary')])]),
      ]),
      note, this.btn('Retour', () => this.menu(), 'ghost back'));
  }
  createMenu(lan) {
    const s = { ...defaultSettings(), map: this.prof.map || 'skeld', maxPlayers: 10, impostors: 1 };
    let pub = false;
    const maps = el('div', 'au-maps');
    const drawMaps = () => maps.replaceChildren(...['skeld', 'polus'].map(m => { const b = this.btn([el('img', '', [], { src: `among/maps/${m}.webp`, alt: '' }), mapLogo(m)], () => { s.map = m; drawMaps(); }, 'au-mapbtn' + (s.map === m ? ' on' : '')); return b; }));
    drawMaps();
    const stepper = (label, key, min, max) => { const v = el('b', '', String(s[key])); return el('div', 'au-step', [el('span', '', label), this.btn('−', () => { s[key] = Math.max(min, s[key] - 1); v.textContent = s[key]; }), v, this.btn('+', () => { s[key] = Math.min(max, s[key] + 1); v.textContent = s[key]; })]); };
    const privacy = this.btn('Privée', () => { pub = !pub; privacy.textContent = pub ? 'Publique' : 'Privée'; privacy.classList.toggle('pub', pub); }, 'au-privacy');
    this.screen('au-create', el('h1', '', 'Créer une partie'), maps,
      el('div', 'au-steps', [stepper('Imposteurs', 'impostors', 1, 3), stepper('Joueurs max', 'maxPlayers', 4, 15), lan || !this.online() ? null : el('div', 'au-step', [el('span', '', 'Confidentialité'), privacy])]),
      el('div', 'au-menu-row', [this.btn('Confirmer', () => { this.prof.map = s.map; saveProfile(this.prof); this.connect({ create: cleanSettings(s), public: pub, lan }); }, 'primary big', { 'data-autofocus': '' }), this.btn('Retour', () => this.onlineMenu(lan), 'ghost back')]));
  }
  async findMenu(lan) {
    const list = el('div', 'au-list', el('p', 'au-note', 'Recherche…'));
    let mapF = '';
    const filters = el('div', 'au-menu-row', ['', 'skeld', 'polus'].map(m => this.btn(m ? (m === 'skeld' ? 'The Skeld' : 'Polus') : 'Toutes les cartes', () => { mapF = m; load(); }, 'small')));
    this.screen('au-find', el('h1', '', lan ? 'Parties sur le réseau local' : 'Trouver une partie'), filters, list, el('div', 'au-menu-row', [this.btn('Actualiser', () => load()), this.btn('Retour', () => this.onlineMenu(lan), 'ghost back')]));
    const load = async () => {
      list.replaceChildren(el('p', 'au-note', 'Recherche…'));
      try {
        const rooms = await ServerLink.list({ lan, map: mapF || undefined });
        if (!rooms.length) { list.replaceChildren(el('p', 'au-note', 'Aucune partie trouvée. Crée la tienne !')); return; }
        list.replaceChildren(...rooms.map(r => this.btn([mapLogo(r.map), el('b', '', r.host), el('span', '', `${r.players}/${r.max}`), el('span', '', `${r.impostors} imp.`), r.roles ? el('i', '', 'Rôles') : null], () => this.connect({ join: r.code }), 'au-room')));
        this.layerFocus();
      } catch (e) { list.replaceChildren(el('p', 'au-note', e.message || 'Impossible de charger la liste.')); }
    };
    load();
  }
  freeplayMenu() {
    this.screen('au-create', el('h1', '', 'Entraînement'), el('p', 'au-note', 'Explore une carte seul avec des mannequins, essaie toutes les tâches et tous les rôles.'),
      el('div', 'au-maps', ['skeld', 'polus'].map(m => this.btn([el('img', '', [], { src: `among/maps/${m}.webp`, alt: '' }), mapLogo(m)], () => this.connect({ freeplay: m }), 'au-mapbtn'))),
      this.btn('Retour', () => this.menu(), 'ghost back'));
  }
  howTo() {
    this.screen('au-how', el('h1', '', 'Comment jouer'), el('div', 'au-howtext', [
      el('p', '', 'Équipiers : termine tes tâches (liste en haut à gauche, flèches jaunes) et trouve les Imposteurs. Signale les corps et appelle des réunions pour voter.'),
      el('p', '', 'Imposteurs : élimine l’équipage sans te faire voir, sabote le vaisseau et voyage par les conduits. Tes fausses tâches ne comptent pas.'),
      el('p', '', 'Fantômes : après ta mort, continue tes tâches (équipiers) ou tes sabotages (imposteurs). Tu ne parles et n’écris qu’aux autres fantômes.'),
      el('p', '', 'Commandes : flèches / WASD ou stick gauche pour marcher · E, Espace ou ✕ : Utiliser · Q ou □ : Tuer · R ou △ : Signaler · F : Saboter · V : Conduit · C : Capacité · Tab : Carte · Entrée : Discussion · T (maintenir) : parler si « Appuyer pour parler » est activé.'),
      el('p', '', 'Chat vocal de proximité : plus un joueur est loin, moins tu l’entends ; au-delà de la portée, plus du tout. Les vivants n’entendent que les vivants, les fantômes que les fantômes.'),
    ]), this.btn('Retour', () => this.menu(), 'ghost back', { 'data-autofocus': '' }));
  }

  // ------------------------------------------------------------------ connection
  async connect(opts) {
    const me = this.me;
    this.screen('au-wait', el('div', 'au-spinner'), el('p', '', opts.freeplay ? 'Préparation de l’entraînement…' : opts.join ? `Connexion à la partie ${opts.join}…` : 'Création de la partie…'), this.btn('Annuler', () => { link?.close(); this.menu(); }, 'ghost'));
    let link = null;
    try {
      if (opts.freeplay) { link = new LocalLink(me); }
      else if (this.online()) {
        link = new ServerLink();
        if (opts.join) await link.join(opts.join, this.hello()); else await link.create({ settings: opts.create, public: opts.public, lan: opts.lan, region: 'Europe' }, this.hello());
      } else if (opts.join) { link = new GuestLink(me); await link.join(opts.join, this.hello()); }
      else { link = new HostLink(me); await link.create(this.hello(), opts.create); }
    } catch (e) { link?.close(); sfx.play('leave'); this.onlineMenuError(e.message || 'Connexion impossible.'); return; }
    const client = new GameClient(link, me);
    this.play = new Play(this, client, { freeplay: opts.freeplay });
    if (opts.freeplay) { link.start(this.hello()); queueMicrotask(() => client.send({ k: 'fp', a: 'start', map: opts.freeplay, role: 'crewmate' })); }
  }
  onlineMenuError(msg) { this.menu(); this.toast(msg); }
  leaveWorld(reason) {
    this.play?.destroy(); this.play = null;
    this.menu();
    if (reason) this.toast(reason);
  }
  // console hooks
  action(a, ev) { if (this.play) return this.play.action(a, ev); if (a === 'back') { const b = this.ui.querySelector('.back'); if (b) { b.click(); return true; } } return false; }
  suspend() { this.play?.suspend(); }
  resume() { this.play?.resume(); }
  destroy() { this.closed = true; this.play?.destroy(); this.stars.stop(); }
}
export { COLORS, CREW_HEIGHT };
