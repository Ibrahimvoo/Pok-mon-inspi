// UNO inside the console: title screen, lobby (4 seats, house rules, lock, countdown), "Conseils / Infos sur la
// partie" loading screen, the table, round results and the final ranking. Solo against the computer or online with
// friends (online.js); the rules run on the hosting console (match.js / rules.js).
import { h, img, art } from '../ui.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { renderHints, toast } from '../shell.js';
import { social } from '../social.js';
import { voice } from '../rtc.js';
import { session as account } from '../session.js';
import { openKeyboard } from '../keyboard.js';
import { openControlCenter } from '../screens/cc.js';
import { endSession } from '../screens/game.js';
import { Table, sortHand } from './table.js';
import { cardEl, robotAvatar, HEX } from './cards.js';
import { online, ID, SEATS, INFO_MS } from './online.js';
import { handPoints } from './rules.js';
import { sfx } from './sound.js';
import { unlockTrophy } from '../actions.js';
import { state } from '../state.js';

const PADS = ['ps', 'xbox', 'nintendo', 'generic'];
const myId = () => account.current?.id || 'me';
const RULES = [
  ['stack', 'Accumulation', 'Pose un +2 sur un +2 (ou un +4 sur un +2 / +4) : le suivant cumule les cartes à piocher.'],
  ['sevenO', '7-0', 'Un 7 échange ta main avec le joueur de ton choix, un 0 fait tourner toutes les mains.'],
  ['jumpIn', 'À la volée', 'Une carte identique (même couleur, même valeur) peut être posée hors de son tour.'],
  ['force', 'Forcer le jeu', 'Une carte piochée qui peut être jouée doit être posée.'],
  ['noBluff', 'Pas de bluff', 'Le Joker +4 se pose quand on veut et ne peut pas être contesté.'],
  ['drawMatch', 'Pioche Jouable', 'On pioche jusqu’à obtenir une carte jouable.'],
];
const RULE_ICONS = {
  stack: '<rect x="10" y="8" width="44" height="48" rx="7" fill="#7a2bd6"/><text x="32" y="30" font-size="20" text-anchor="middle" fill="#fff" stroke="#2a0b52" stroke-width="3" paint-order="stroke" font-family="Lilita One,Arial Black">+2</text><text x="32" y="50" font-size="18" text-anchor="middle" fill="#fff" stroke="#2a0b52" stroke-width="3" paint-order="stroke" font-family="Lilita One,Arial Black">+2</text>',
  sevenO: '<rect x="8" y="14" width="22" height="34" rx="4" fill="#f39a1e" transform="rotate(-14 19 31)"/><rect x="34" y="14" width="22" height="34" rx="4" fill="#e3262b" transform="rotate(14 45 31)"/><path d="M22 10 Q32 2 42 10" stroke="#fff" stroke-width="3" fill="none"/><path d="M42 54 Q32 62 22 54" stroke="#fff" stroke-width="3" fill="none"/>',
  jumpIn: '<rect x="12" y="16" width="24" height="36" rx="4" fill="#1d6fc6" transform="rotate(-18 24 34)"/><rect x="28" y="10" width="24" height="36" rx="4" fill="#3b9cf0" stroke="#fff" stroke-width="2" transform="rotate(12 40 28)"/>',
  force: '<rect x="18" y="20" width="28" height="38" rx="4" fill="#f6cf17"/><path d="M32 4 44 18h-7v14h-10V18h-7z" fill="#e3262b"/>',
  noBluff: '<rect x="12" y="10" width="40" height="46" rx="6" fill="#e3262b"/><rect x="22" y="18" width="20" height="30" rx="3" fill="#ff8a3d"/><path d="M14 14 50 52" stroke="#fff" stroke-width="5" stroke-linecap="round"/>',
  drawMatch: '<rect x="12" y="10" width="40" height="46" rx="6" fill="#fff" stroke="#c4161c" stroke-width="3"/><path d="M18 40 Q32 14 48 26" stroke="#e3262b" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M44 18 50 28 40 30z" fill="#e3262b"/>',
};
const TIPS = [
  'Pense à annoncer UNO quand tu poses ton avant-dernière carte : sinon, un adversaire peut te faire piocher 2 cartes.',
  'Le Joker +4 ne se pose normalement que si tu n’as pas la couleur demandée. Bluffer est possible… mais un adversaire peut te contester !',
  'Garde tes Jokers pour la fin de la manche : ils te sortent des situations difficiles.',
  'À deux joueurs, la carte Inversion fonctionne comme une carte Passe ton tour.',
  'Une carte piochée qui peut être jouée peut être posée tout de suite.',
  'Surveille les cartes de tes adversaires : garde tes +2 pour celui qui est sur le point de gagner.',
  'Les cartes qui restent dans les mains des perdants rapportent des points au gagnant : chiffres = leur valeur, actions = 20, Jokers = 50.',
];
const ORDER_NAMES = ['1er', '2e', '3e', '4e'];

// a white rounded button like the console version ("Commencer la partie")
const btn = (label, onok, { cls = '', auto = false, key } = {}) => h(`button.ub${cls ? '.' + cls : ''}`, { type: 'button', f: true, 'data-autofocus': auto ? '' : null, 'data-key': key || null, onok: () => { sfx('click'); onok(); } }, label);

export function unoLogo(cls = '') {
  const el = h(`div.uno-logo${cls ? '.' + cls : ''}`);
  el.innerHTML = `<svg viewBox="0 0 400 260" aria-label="UNO"><g transform="rotate(-12 200 130)">
    <ellipse cx="200" cy="134" rx="182" ry="104" fill="#000"/><ellipse cx="200" cy="130" rx="176" ry="98" fill="#fff"/><ellipse cx="200" cy="130" rx="166" ry="88" fill="#e3262b"/>
    <ellipse cx="200" cy="112" rx="150" ry="58" fill="#ff5a4d" opacity=".35"/>
    ${[10, 8, 6, 4, 2].map(d => `<text x="${200 - d * .6}" y="${150 + d}" font-family="Lilita One, Arial Black, sans-serif" font-size="128" text-anchor="middle" fill="#000" stroke="#000" stroke-width="14" stroke-linejoin="round" transform="skewX(-10)" dx="22">UNO</text>`).join('')}
    <text x="200" y="150" font-family="Lilita One, Arial Black, sans-serif" font-size="128" text-anchor="middle" fill="#ffde17" stroke="#000" stroke-width="7" stroke-linejoin="round" paint-order="stroke" transform="skewX(-10)" dx="22">UNO</text>
    <text x="200" y="150" font-family="Lilita One, Arial Black, sans-serif" font-size="128" text-anchor="middle" fill="url(#ulg)" transform="skewX(-10)" dx="22">UNO</text>
    <defs><linearGradient id="ulg" x1="0" y1="0" x2="0" y2="1"><stop offset=".1" stop-color="#fff6a8"/><stop offset=".55" stop-color="#ffde17"/><stop offset="1" stop-color="#f3a90f"/></linearGradient></defs></g></svg>`;
  return el;
}
function ruleIcon(key) { return h('div.ur-ic', { html: `<svg viewBox="0 0 64 64">${RULE_ICONS[key]}</svg>` }); }

// background shared by every UNO screen: red / orange glow, low-poly facets, drifting squares, the menu swirl
function makeBg() {
  const canvas = h('canvas.ub-facets');
  const parts = h('div.ub-parts', Array.from({ length: 22 }, (_, i) => {
    const e = h('i');
    const r = (a, b) => a + Math.random() * (b - a);
    e.style.setProperty('--x', r(0, 100).toFixed(1) + '%'); e.style.setProperty('--y', r(0, 100).toFixed(1) + '%');
    e.style.setProperty('--s', `calc(${r(.6, 2.6).toFixed(2)} * var(--u))`); e.style.setProperty('--d', r(9, 22).toFixed(1) + 's'); e.style.setProperty('--dl', (-r(0, 20)).toFixed(1) + 's');
    e.style.setProperty('--o', r(.25, .8).toFixed(2)); e.style.setProperty('--rz', r(0, 360).toFixed(0) + 'deg');
    if (i % 3 === 0) e.classList.add('hot');
    if (i % 4 === 1) { e.classList.add('big'); e.style.setProperty('--x', (Math.random() < .5 ? r(-2, 14) : r(86, 102)).toFixed(1) + '%'); }
    return e;
  }));
  const swirl = h('div.ub-swirl', { html: '<svg viewBox="-500 -500 1000 1000"><g fill="none" stroke-linecap="round"><path d="M0 -60 C140 -60 220 60 140 170 C40 300 -260 260 -300 40 C-340 -200 -80 -380 160 -360 C420 -330 520 -60 470 160" stroke="#ffd34d" stroke-width="10"/><path d="M0 -60 C140 -60 220 60 140 170 C40 300 -260 260 -300 40 C-340 -200 -80 -380 160 -360 C420 -330 520 -60 470 160" stroke="#fff6c2" stroke-width="3"/><path d="M-40 40 C-120 -60 -40 -170 80 -150 C230 -120 260 60 160 150" stroke="#ff9d2e" stroke-width="7"/></g></svg>' });
  const el = h('div.uno-bg', canvas, h('div.ub-glow'), swirl, parts);
  let w = 0, hh = 0;
  const draw = () => {
    const W = el.clientWidth, H = el.clientHeight;
    if (!W || !H || (W === w && H === hh)) return;
    w = W; hh = H;
    const dpr = Math.min(2, devicePixelRatio || 1), cw = Math.round(W * dpr * .75), ch = Math.round(H * dpr * .75);
    canvas.width = cw; canvas.height = ch;
    const g = canvas.getContext('2d');
    const cx = cw / 2, cy = ch * .48, R = Math.hypot(cw, ch) * .62;
    // colour of the table by distance to the centre: yellow glow → orange → vivid red → deep red edges
    const STOPS = [[0, [255, 206, 74]], [.1, [255, 168, 46]], [.22, [255, 112, 26]], [.36, [244, 62, 22]], [.52, [218, 28, 16]], [.72, [178, 14, 12]], [1, [120, 6, 8]]];
    const colAt = d => {
      for (let i = 1; i < STOPS.length; i++) if (d <= STOPS[i][0]) { const [a, ca] = STOPS[i - 1], [b, cb] = STOPS[i], k = (d - a) / (b - a); return ca.map((v, j) => v + (cb[j] - v) * k); }
      return STOPS[STOPS.length - 1][1];
    };
    const sx = ch / cw * 1.55;   // facets are squashed like the tilted table
    // radial low-poly mesh: rings of jittered points around the centre, triangulated ring by ring
    const rings = [0, .05, .11, .18, .26, .35, .45, .56, .68, .82, 1].map(f => f * R);
    const pts = rings.map((r, k) => {
      if (!k) return [[cx, cy, 0]];
      const n = 7 + k * 4, off = Math.random() * Math.PI * 2;
      return Array.from({ length: n }, (_, i) => { const a = off + (i + (Math.random() - .5) * .55) / n * Math.PI * 2, rr = r * (1 + (Math.random() - .5) * .16); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * sx * 1.1, a]; })
        .sort((p, q) => ((p[2] % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - ((q[2] % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    });
    const tri = (a, b, c) => {
      const mx = (a[0] + b[0] + c[0]) / 3, my = (a[1] + b[1] + c[1]) / 3;
      const d = Math.min(1, Math.hypot(mx - cx, (my - cy) / (sx * 1.1)) / R);
      const shade = (Math.random() - .5) * (d < .3 ? 34 : 22);
      const [r0, g0, b0] = colAt(d).map(v => Math.max(0, Math.min(255, v + shade)));
      g.fillStyle = `rgb(${r0 | 0},${g0 | 0},${b0 | 0})`;
      g.strokeStyle = g.fillStyle;
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.lineTo(c[0], c[1]); g.closePath(); g.fill(); g.stroke();
    };
    const base = g.createRadialGradient(cx, cy, 0, cx, cy, R);
    STOPS.forEach(([o, c]) => base.addColorStop(o, `rgb(${c.join(',')})`));
    g.fillStyle = base; g.fillRect(0, 0, cw, ch);
    for (let k = 1; k < pts.length; k++) {
      const A = pts[k - 1], B = pts[k];
      if (k === 1) { B.forEach((p, i) => tri(A[0], p, B[(i + 1) % B.length])); continue; }
      const ang = p => ((p[2] % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      let i = 0, j = 0;
      while (i < A.length || j < B.length) {
        const a0 = A[i % A.length], a1 = A[(i + 1) % A.length], b0 = B[j % B.length], b1 = B[(j + 1) % B.length];
        const na = i < A.length ? ang(a1) + (i + 1 >= A.length ? Math.PI * 2 : 0) : Infinity, nb = j < B.length ? ang(b1) + (j + 1 >= B.length ? Math.PI * 2 : 0) : Infinity;
        if (na <= nb) { tri(a0, a1, b0); i++; } else { tri(a0, b1, b0); j++; }
      }
    }
    // soft yellow light in the middle
    let rg = g.createRadialGradient(cx, cy, 0, cx, cy, R * .42);
    rg.addColorStop(0, 'rgba(255,236,150,.55)'); rg.addColorStop(.45, 'rgba(255,190,70,.2)'); rg.addColorStop(1, 'rgba(255,140,40,0)');
    g.fillStyle = rg; g.fillRect(0, 0, cw, ch);
    // the glowing red rim of the table
    g.save();
    g.translate(cx, ch * .55); g.scale(1, .44);
    g.shadowColor = 'rgba(255,40,20,.9)'; g.shadowBlur = 30 * dpr;
    g.strokeStyle = 'rgba(255,70,40,.75)'; g.lineWidth = 5 * dpr;
    g.beginPath(); g.arc(0, 0, cw * .43, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = 'rgba(255,170,90,.18)'; g.lineWidth = 60 * dpr; g.shadowBlur = 0;
    g.beginPath(); g.arc(0, 0, cw * .33, 0, Math.PI * 2); g.stroke();
    g.restore();
    // darker corners
    rg = g.createRadialGradient(cx, cy, R * .45, cx, cy, R * 1.05);
    rg.addColorStop(0, 'rgba(60,0,0,0)'); rg.addColorStop(1, 'rgba(60,0,0,.55)');
    g.fillStyle = rg; g.fillRect(0, 0, cw, ch);
  };
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => draw()) : null;
  ro?.observe(el);
  return { el, draw, mode(m) { el.dataset.mode = m; }, destroy() { ro?.disconnect(); } };
}

export class UnoGame {
  constructor() {
    this.bg = makeBg();
    this.ui = h('div.uno-ui');
    this.root = h('div.uno', this.bg.el, this.ui);
    this.top = { hints: [], keys: {}, back: null };
    this.table = null; this.closed = false; this.scene = null; this.timers = [];
    this.unwatch = online.watch(() => this.onWatch());
  }
  // ------------------------------------------------------------ scenes & focus
  show(el, { hints = [['ok', 'Sélectionner'], ['back', 'Retour']], keys = {}, back = null, mode = 'menu' } = {}) {
    this.clearTimers();
    const prev = this.scene;
    if (prev && prev !== el) { prev.classList.add('out'); setTimeout(() => prev.remove(), 300); }
    if (this.table && el !== this.table.root) { this.table.destroy(); this.table = null; }
    el.classList.add('uno-scene');
    this.ui.append(el);
    this.scene = el;
    this.top = { hints, keys, back };
    this.bg.mode(mode);
    requestAnimationFrame(() => this.bg.draw());
    this.focus(el.querySelector('[data-autofocus]') || el.querySelector('[data-f]'));
    if (nav.top === this.layer) renderHints();
    return el;
  }
  focus(el) {
    const L = this.layer;
    if (!L) return;
    if (nav.top === L && el) { nav.focus(el, { silent: true, instant: true }); return; }
    L.focused?.classList.remove('focused');
    L.focused = el || null;
  }
  later(ms, fn) { const t = setTimeout(() => { if (!this.closed) fn(); }, ms); this.timers.push(t); return t; }
  clearTimers() { this.timers.forEach(t => { clearTimeout(t); clearInterval(t); }); this.timers = []; }
  action(a) {
    if (a === 'ps') { openControlCenter({ ingame: ID }); return true; }
    if (a === 'gamebase' || a === 'create') return false;
    if (this.overlay) {
      if (a === 'back' || a === 'options') { this.overlay.close(); return true; }
      return ['up', 'down', 'left', 'right', 'ok'].includes(a) ? false : true;
    }
    if (this.table && this.scene === this.table.root) {
      if (this.table.action(a)) { renderHints(); return true; }
      if (a === 'options' || a === 'back') { this.pauseMenu(); return true; }
      return ['up', 'down', 'left', 'right', 'ok'].includes(a) ? false : true;
    }
    const fn = this.top.keys?.[a];
    if (fn && fn() !== false) return true;
    if (a === 'back') { this.top.back?.(); return true; }
    if (['up', 'down', 'left', 'right', 'ok'].includes(a)) return false;
    return true;
  }
  hints() {
    if (this.overlay) return this.overlay.hints || [['ok', 'Sélectionner'], ['back', 'Fermer']];
    if (this.results?.classList.contains('final')) return [['ok', 'Sélectionner']];
    if (this.table && this.scene === this.table.root) return this.table.hints();
    return typeof this.top.hints === 'function' ? this.top.hints() : this.top.hints;
  }
  start() { this.titleScreen(); return Promise.resolve(); }
  suspend() { this.suspended = true; online.pause(); }
  resume() { this.suspended = false; if (!this.overlay) online.resume(); renderHints(); }
  destroy() {
    this.closed = true;
    this.clearTimers();
    this.unwatch?.();
    online.leave();
    this.table?.destroy();
    this.bg.destroy();
  }
  onWatch() {
    if (this.closed) return;
    if (this.scene?.classList.contains('uno-title')) this.renderInvite?.();
    if (this.waitHost) this.waitHost();
  }

  // ------------------------------------------------------------ overlays (pause, rules, confirm)
  openOverlay(el, { hints, onClose } = {}) {
    this.overlay?.close(true);
    const prevFocus = this.layer?.focused;
    const wrap = h('div.uo-wrap', el);
    this.root.append(wrap);
    this.ui.setAttribute('inert', '');
    const o = {
      el: wrap, hints,
      close: silent => {
        if (this.overlay !== o) return;
        this.overlay = null;
        this.ui.removeAttribute('inert');
        wrap.classList.add('out'); setTimeout(() => wrap.remove(), 220);
        if (!silent) sfx('click');
        onClose?.();
        if (prevFocus?.isConnected) this.focus(prevFocus); else if (this.table && this.scene === this.table.root) this.table.refocus(this.table.v || {}); else this.focus(this.scene?.querySelector('[data-f]'));
        if (nav.top === this.layer) renderHints();
      },
    };
    this.overlay = o;
    this.focus(wrap.querySelector('[data-autofocus]') || wrap.querySelector('[data-f]'));
    if (nav.top === this.layer) renderHints();
    return o;
  }
  confirm(title, text, ok, fn) {
    const o = this.openOverlay(h('div.uo-box', h('h2', title), h('p', text), h('div.uo-acts', { 'data-row': '' }, btn(ok, () => { o.close(true); fn(); }, { auto: true, cls: 'red' }), btn('Annuler', () => o.close()))));
  }
  rules() {
    const sec = (t, ...p) => h('section', h('h3', t), ...p.map(x => h('p', x)));
    const o = this.openOverlay(h('div.uo-box.uo-rules',
      h('h2', 'Règles du jeu'),
      h('div.uo-scroll', { 'data-scroll': 'y', f: true, 'data-autofocus': '' },
        sec('But du jeu', 'Être le premier à se débarrasser de toutes ses cartes. Le gagnant de la manche marque les points des cartes restées dans les mains adverses ; le premier à atteindre la limite de score (500 points par défaut) remporte la partie.'),
        sec('Déroulement', 'Chaque joueur reçoit 7 cartes, puis la première carte de la pioche est retournée. À ton tour, pose une carte de la même couleur, du même chiffre ou du même symbole que la carte du dessus, ou un Joker. Si tu ne peux pas (ou ne veux pas) jouer, pioche une carte : si elle est jouable, tu peux la poser tout de suite.'),
        sec('Cartes Action', 'Passe ton tour : le joueur suivant ne joue pas. Inversion : le sens du jeu change (à deux, elle fait passer le tour). +2 : le joueur suivant pioche 2 cartes et passe son tour. Joker : tu choisis la couleur. Joker +4 : tu choisis la couleur, le joueur suivant pioche 4 cartes et passe son tour.'),
        sec('Joker +4 et contestation', 'Le +4 ne doit être posé que si tu n’as aucune carte de la couleur demandée. Le joueur visé peut le contester : si tu bluffais, c’est toi qui pioches 4 cartes ; sinon, il pioche 6 cartes.'),
        sec('UNO !', 'Quand tu poses ton avant-dernière carte, appuie sur UNO (bouton △ ou le bouton UNO à l’écran). Si tu oublies et qu’un adversaire appuie sur « Contre-UNO » avant que le joueur suivant ne joue, tu pioches 2 cartes.'),
        sec('Points', 'Cartes chiffres : leur valeur. +2, Inversion, Passe ton tour : 20 points. Joker et Joker +4 : 50 points.'),
        sec('Règles maison (au choix de l’hôte)', ...RULES.map(([, n, d]) => `${n} : ${d}`)),
        sec('Commandes', 'Manette : ←/→ choisir une carte, ✕ jouer, □ piocher, △ UNO, R1 Contre-UNO, L1 garder la carte piochée, Options pause. Tactile : touche une carte pour la sélectionner, touche-la encore pour la jouer ; touche la pioche pour piocher.')),
      h('div.uo-acts', btn('Fermer', () => o.close()))), { hints: [['ok', 'Fermer'], ['back', 'Fermer']] });
  }
  pauseMenu() {
    const solo = online.session?.solo;
    if (solo) online.pause();
    const v = this.table?.v;
    const score = v ? h('div.uo-score', h('b', `Manche ${v.round} · ${v.target ? `objectif ${v.target} points` : 'manche unique'}`),
      h('div', v.seats.map((x, i) => h('span', `${x.name} : ${v.players[i].score}`)))) : null;
    const o = this.openOverlay(h('div.uo-box.uo-pause', h('h2', 'Pause'), score,
      h('p', solo ? 'La partie est en pause.' : 'La partie continue pour les autres joueurs : ton tour sera joué automatiquement si le temps s’écoule.'),
      h('div.uo-col', btn('Reprendre', () => o.close(), { auto: true }), btn('Règles du jeu', () => { o.close(true); this.rules(); }),
        btn('Quitter la partie', () => { o.close(true); this.confirm('Quitter la partie ?', online.isHost && !solo ? 'Tu es l’hôte : la partie s’arrêtera pour tout le monde.' : 'Tu reviendras à l’écran titre d’UNO.', 'Quitter', () => { online.leave(); this.titleScreen(); }); }, { cls: 'red' }))),
    { onClose: () => { if (solo && !this.suspended) online.resume(); } });
  }

  // ------------------------------------------------------------ title
  titleScreen() {
    online.leave();
    this.waitHost = null;
    const invite = h('div.ut-invite');
    const tile = (cls, title, sub, icon, fn, auto) => h(`div.ut-tile.${cls}`, { f: true, 'data-autofocus': auto ? '' : null, onok: () => { sfx('click'); fn(); } },
      h('div.face', h('div.ov'), h('div.ic', { html: icon }), h('b', title), h('small', sub)));
    const ICON = {
      solo: '<svg viewBox="0 0 64 64"><rect x="14" y="16" width="36" height="28" rx="9" fill="#fff"/><rect x="19" y="22" width="26" height="14" rx="6" fill="#1d1d2b"/><circle cx="26" cy="29" r="3.5" fill="#ffd23f"/><circle cx="38" cy="29" r="3.5" fill="#ffd23f"/><rect x="30" y="6" width="4" height="10" fill="#fff"/><circle cx="32" cy="6" r="4" fill="#ffd23f"/><rect x="20" y="46" width="24" height="14" rx="5" fill="#fff"/></svg>',
      friends: '<svg viewBox="0 0 64 64" fill="#fff"><circle cx="22" cy="22" r="10"/><circle cx="44" cy="24" r="8"/><path d="M4 56c1-12 8-19 18-19s17 7 18 19z"/><path d="M38 38c10-2 20 4 22 18H43c0-7-2-13-5-18z"/></svg>',
      join: '<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="32" r="12"/><path d="M34 32h26M50 32v10M58 32v7"/></svg>',
      rules: '<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"><path d="M8 12c10-4 18-3 24 3v40c-6-6-14-7-24-3z" fill="rgba(255,255,255,.25)"/><path d="M56 12c-10-4-18-3-24 3v40c6-6 14-7 24-3z" fill="rgba(255,255,255,.25)"/></svg>',
    };
    const el = h('div.uno-title',
      unoLogo('big'),
      h('div.ut-tiles', { 'data-row': '' },
        tile('red', 'Partie rapide', 'Contre l’ordinateur', ICON.solo, () => this.solo(), true),
        tile('blue', 'Entre amis', 'Crée un salon avec code', ICON.friends, () => this.hostOnline()),
        tile('green', 'Rejoindre', 'Avec le code d’un ami', ICON.join, () => this.joinScreen()),
        tile('yellow', 'Règles', 'Officielles et maison', ICON.rules, () => this.rules())),
      invite,
      h('div.ut-foot', 'Recréation non officielle, jouable entre amis · cartes et visuels redessinés'));
    this.renderInvite = () => {
      const a = online.advert();
      invite.replaceChildren();
      invite.classList.toggle('hidden', !a);
      if (a) invite.append(h('span', `${a.name} a ouvert une partie${a.count ? ` · ${a.count}/${SEATS} joueurs` : ''}`), btn('Rejoindre', () => this.joinHost(a.host), { key: 'join-invite' }));
    };
    this.renderInvite();
    this.show(el, { hints: [['ok', 'Sélectionner'], ['back', 'Quitter UNO']], back: () => this.confirm('Quitter UNO ?', 'Tu reviendras à l’écran d’accueil de la console.', 'Quitter', () => endSession()), mode: 'menu' });
  }

  // ------------------------------------------------------------ lobby
  lobbyUi() {
    return {
      lobby: L => this.renderLobby(L),
      joined: seat => { sfx('color'); toast({ title: `${seat.name} a rejoint la partie`, icon: 'party', sound: null, log: false }); },
      start: cfg => this.startMatch(cfg),
      state: (v, ev) => this.onState(v, ev),
      err: msg => { this.table && (this.table.waiting = false); toast({ title: msg, icon: 'info', sound: 'error', log: false }); },
      closed: why => { toast({ title: 'Partie en ligne terminée', sub: why, icon: 'party', sound: 'error', log: false }); this.titleScreen(); },
    };
  }
  async solo() { await online.host(this.lobbyUi(), { solo: true }); }
  async hostOnline() {
    const wait = this.waitingScreen('Création du salon…');
    try { await online.host(this.lobbyUi(), { solo: false }); }
    catch (e) { online.leave(); if (this.scene === wait) this.titleScreen(); toast({ title: 'Création du salon impossible', sub: e.message, icon: 'party', sound: 'error', log: false }); }
  }
  joinHost(hostId) {
    if (!online.join(this.lobbyUi(), hostId)) toast({ title: 'Partie introuvable', sub: 'Cette partie n’est plus disponible', icon: 'party', sound: 'error', log: false });
  }
  waitingScreen(text, { back } = {}) {
    return this.show(h('div.uno-wait', unoLogo('small'), h('div.uw-spin', cardEl(null)), h('p', text), back ? btn('Annuler', back, { auto: true }) : null), { hints: back ? [['ok', 'Annuler'], ['back', 'Annuler']] : [], back: back || (() => {}), mode: 'menu' });
  }
  joinScreen() {
    const go = async code => {
      code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (code.length !== 6) { sfx('error'); toast({ title: 'Code invalide', sub: 'Le code du salon contient 6 caractères.', icon: 'info', sound: null, log: false }); return; }
      this.waitingScreen(`Connexion au salon ${code}…`, { back: () => { this.waitHost = null; this.titleScreen(); } });
      try { await online.joinCode(code); }
      catch (e) { toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); this.joinScreen(); return; }
      this.awaitHost(code);
    };
    const inp = h('input.uj-input', { type: 'text', maxLength: 6, autocapitalize: 'characters', autocorrect: 'off', spellcheck: false, enterkeyhint: 'go', placeholder: 'K7P2QX', 'aria-label': 'Code du salon' });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); inp.blur(); go(inp.value); } });
    inp.addEventListener('input', () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6); });
    const row = h('div.uj-row', { f: true, 'data-autofocus': '', onok: () => { if (PADS.includes(input.device)) openKeyboard({ title: 'Code du salon (6 caractères)', maxLength: 6, onDone: v => { inp.value = String(v).toUpperCase(); go(v); } }); else inp.focus(); } }, inp);
    this.show(h('div.uno-join', unoLogo('small'), h('div.uo-box',
      h('h2', 'Rejoindre une partie'), h('p', 'Entre le code du salon que ton ami voit dans son salon d’attente UNO (6 caractères).'), row,
      h('div.uo-acts', { 'data-row': '' }, btn('Rejoindre', () => go(inp.value), { cls: 'red' }), btn('Retour', () => this.titleScreen())))),
    { hints: [['ok', 'Sélectionner'], ['back', 'Retour']], back: () => this.titleScreen(), mode: 'menu' });
  }
  // connected to the salon: wait until its host opens the UNO room
  awaitHost(code) {
    const t0 = Date.now();
    this.waitHost = () => {
      const by = online.advert()?.host;
      if (by) { this.waitHost = null; this.joinHost(by); return; }
      if (!social.party && Date.now() - t0 > 3000) { this.waitHost = null; toast({ title: 'Salon introuvable', sub: `Aucun salon ouvert avec le code ${code}.`, icon: 'party', sound: 'error', log: false }); this.titleScreen(); }
    };
    this.waitingScreen(`Connecté au salon ${code}. En attente de la partie UNO de l’hôte…`, { back: () => { this.waitHost = null; this.titleScreen(); } });
    this.waitHost();
    const poll = setInterval(() => { if (!this.waitHost) clearInterval(poll); else this.waitHost(); }, 1000);
    this.timers.push(poll);
  }
  renderLobby(L) {
    if (this.closed || !L) return;
    const host = L.host;
    const key = this.layer?.focused?.dataset?.key;
    const rules = h('div.ul-rules', { 'data-row': '' }, RULES.map(([k, name, desc]) => h(`div.ul-rule${L.rules[k] ? '.on' : ''}`, {
      f: host ? true : null, 'data-key': 'rule-' + k, title: desc, 'aria-pressed': String(!!L.rules[k]),
      onok: () => { if (!host || L.phase !== 'lobby') return; sfx('click'); online.setRule(k, !L.rules[k]); },
    }, ruleIcon(k), h('span', name))));
    const target = h('div.ul-target', { f: host ? true : null, 'data-key': 'target', onok: () => { if (host && L.phase === 'lobby') { sfx('click'); online.cycleTarget(); } } },
      'Limite de score : ', h('b', L.rules.target ? String(L.rules.target) : 'Manche unique'));
    const seats = h('div.ul-seats', { 'data-row': '' }, Array.from({ length: SEATS }, (_, k) => {
      const x = L.seats[k];
      const me = x && x.id === myId();
      const status = L.phase === 'count' ? (x ? 'Prêt !' : '') : x?.bot ? 'Ordinateur' : x ? 'En attente' : host ? 'Ajouter un ordinateur' : 'Place libre';
      return h(`div.ul-seat${x ? '' : '.empty'}${me ? '.me' : ''}`, {
        f: host && k > 0 && L.phase === 'lobby' && (!x || x.bot) ? true : null, 'data-key': 'seat-' + k,
        onok: () => { sfx('click'); online.toggleSeat(k); },
      }, h('div.nm', x ? x.name : ''), h('div.card', h('div.ov'), k === 0 ? h('div.host', 'Hôte') : null,
        h('div.pic', x ? img(this.avatarOf(x)) : h('div.ph')), h('div.st', status)));
    }));
    const code = L.code ? h('div.ul-code', h('span', 'Code du salon'), h('b', L.code), host ? btn('Partager', () => online.share(), { key: 'share' }) : null) : null;
    const voiceBtn = L.party && !L.solo ? btn(voice.active ? 'Chat vocal : activé' : 'Chat vocal : désactivé', async () => { if (voice.active) voice.leave(); else await social.joinVoice(); this.renderLobby(online.view()); }, { key: 'voice', cls: 'small' }) : null;
    let bottom;
    if (L.phase === 'count') {
      const t = h('b', `${Math.ceil(L.count / 1000)}s`);
      bottom = h('div.ul-count', 'Début de la partie dans… ', t);
      const end = Date.now() + L.count;
      clearInterval(this.countTimer);
      let last = -1;
      this.countTimer = setInterval(() => { const s = Math.max(0, Math.ceil((end - Date.now()) / 1000)); if (s !== last) { last = s; t.textContent = s + 's'; if (s > 0) sfx('count'); } if (s <= 0) clearInterval(this.countTimer); }, 100);
      this.timers.push(this.countTimer);
    } else if (host) {
      const n = L.seats.filter(Boolean).length;
      bottom = h('div.ul-bottom', { 'data-row': '' },
        L.solo ? null : btn(L.locked ? 'Déverrouiller le salon' : 'Verrouiller le salon', () => online.toggleLock(), { key: 'lock' }),
        btn('Commencer la partie', () => { if (!online.start()) { sfx('error'); toast({ title: 'Il faut au moins 2 joueurs', sub: 'Ajoute un ordinateur ou attends un ami', icon: 'info', sound: null, log: false }); } }, { key: 'start', auto: true, cls: n >= 2 ? 'go' : 'dis' }));
    } else bottom = h('div.ul-wait', L.refused || (L.phase === 'wait' ? `Connexion à la partie de ${L.hostName}…` : `En attente de ${L.hostName}…`));
    const el = h('div.uno-lobby',
      unoLogo('small'),
      h('div.ul-top', rules, target),
      seats,
      h('div.ul-side', code, voiceBtn, L.solo ? null : h('p.ul-help', host ? (L.locked ? 'Salon verrouillé : personne ne peut entrer.' : 'Tes amis entrent le code dans UNO › Rejoindre (ou ouvrent le lien partagé).') : 'Seul l’hôte peut changer les règles.')),
      bottom);
    if (this.scene?.classList.contains('uno-lobby')) {
      // refresh in place, keeping the focused control
      this.scene.replaceWith(el); el.classList.add('uno-scene', 'nofade'); this.scene = el;
      const f = (key && el.querySelector(`[data-key="${key}"]`)) || el.querySelector('[data-autofocus]') || el.querySelector('[data-f]');
      if (!this.overlay) this.focus(f);
      if (nav.top === this.layer) renderHints();
    } else this.show(el, { hints: host ? [['ok', 'Sélectionner'], ['back', 'Quitter le salon']] : [['back', 'Quitter le salon']], back: () => this.leaveLobby(), mode: 'menu' });
  }
  leaveLobby() {
    const host = online.isHost && !online.session?.solo;
    if (host) this.confirm('Fermer le salon ?', 'Les joueurs connectés reviendront à l’écran titre.', 'Fermer', () => this.titleScreen());
    else this.titleScreen();
  }
  avatarOf(seat) {
    if (!seat) return robotAvatar(0);
    if (seat.bot) return robotAvatar(seat.ai);
    if (seat.id === myId()) return art.thumb(account.current?.avatar);
    const m = social.party?.members?.find(x => x.id === seat.id);
    return m ? art.thumb(m.avatar) : robotAvatar(3);
  }

  // ------------------------------------------------------------ loading screen, then the table
  startMatch(cfg) {
    this.buffer = [];
    this.results = null;
    const rows = [['Mode de jeu', 'Classique'], ...RULES.map(([k, n]) => [n, cfg.rules[k] ? 'OUI' : 'NON']), ['Limite de score', cfg.rules.target ? String(cfg.rules.target) : 'Manche unique'],
      ['Joueurs', cfg.seats.map(x => x.name).join(', ')]];
    const showTable = () => {
      if (this.closed) return;
      const t = new Table({ avatarOf: x => this.avatarOf(x), submit: a => this.submit(a), menu: () => this.pauseMenu(), reduceMotion: document.documentElement.classList.contains('reduce-motion') });
      t.layer = this.layer;
      t.blocked = () => !!this.overlay || !!this.results?.classList.contains('final');
      t.after = v => this.afterRender(v);
      this.show(t.root, { mode: 'table' });
      this.table = t;
      const b = this.buffer; this.buffer = null;
      b.forEach(([v, ev]) => t.update(v, ev));
    };
    if (!cfg.info) { showTable(); return; }
    sfx('shuffle');
    this.show(h('div.uno-info',
      h('div.ui-tip', h('div.ui-tipt', h('i', 'i'), 'CONSEILS'), h('p', TIPS[Math.floor(Math.random() * TIPS.length)])),
      h('div.ui-tbl', h('div.ui-lab', 'Infos sur la partie'), rows.map(([k, v]) => h('div.ui-row', h('span', k), h('b', v)))),
      h('div.ui-card', cardEl(null))), { hints: [], back: () => {}, mode: 'dark' });
    this.later(online.isHost ? INFO_MS - 150 : INFO_MS - 600, showTable);
  }
  onState(v, ev) {
    if (this.closed) return;
    this.trophies(v, ev);
    if (this.buffer) { this.buffer.push([v, ev]); return; }
    if (!this.table) return;
    if (v.phase === 'play' && this.results) { this.results.remove(); this.results = null; }
    this.table.update(v, ev);
  }
  trophies(v, ev) {
    const me = v.me;
    for (const e of ev) {
      if (e.e === 'out' && e.p === me) this.trophy(0);
      if (e.e === 'uno' && e.p === me) this.trophy(1);
      if (e.e === 'caught' && e.by === me) this.trophy(2);
      if (e.e === 'challenge' && e.p === me && e.guilty) this.trophy(3);
      if (e.e === 'out' && e.end) { if (v.seats.filter(x => !x.bot).length > 1) this.trophy(4); if (e.p === me) this.trophy(5); }
    }
  }
  trophy(i) {
    try {
      if (!(state.trophies[ID] || []).includes(i)) unlockTrophy(ID, i);
      const now = state.trophies[ID] || [];
      if ([0, 1, 2, 3, 4, 5].every(k => now.includes(k)) && !now.includes(6)) unlockTrophy(ID, 6);
    } catch { /* trophies are a bonus */ }
  }
  submit(a) {
    const err = online.submit(a);
    if (err) { if (this.table) this.table.waiting = false; sfx('error'); toast({ title: err, icon: 'info', sound: null, log: false }); }
  }
  afterRender(v) {
    if (nav.top === this.layer && !this.overlay) renderHints();
    if (v.phase === 'round' || v.phase === 'end') this.showResults(v);
  }
  showResults(v) {
    const t = this.table; if (!t) return;
    const key = `${v.round}:${v.phase}`;
    if (this.results?.dataset.key === key) return;
    this.results?.remove();
    const r = v.result; if (!r) return;
    const order = v.seats.map((s, i) => i).sort((a, b) => r.scores[b] - r.scores[a]);
    const final = v.phase === 'end';
    const won = r.winner === v.me;
    const bar = i => h('div.rbar', h('i', { style: { transform: `scaleX(${v.target ? Math.min(1, r.scores[i] / v.target).toFixed(3) : 1})` } }));
    let el;
    if (!final) {
      const next = h('b', '');
      el = h('div.uno-results', { 'data-key': key },
        h('div.rhead', h('div.rav', img(this.avatarOf(v.seats[r.winner]))), h('div', h('h2', won ? 'Tu remportes la manche !' : `${v.seats[r.winner].name} remporte la manche`), h('div.rpts', `+${r.points} points`))),
        h('div.rrows', v.seats.map((s, i) => h(`div.rrow${i === r.winner ? '.win' : ''}`,
          h('div.rav', img(this.avatarOf(s))), h('div.rnm', s.name),
          h('div.rcards', sortHand(r.hands[i]).slice(0, 12).map(c => cardEl(c, { cls: 'mc' }))),
          h('div.rhp', i === r.winner ? '0' : `${handPoints(r.hands[i])} pts`), h('div.rtot', h('b', String(r.scores[i])), bar(i))))),
        h('div.rnext', 'Manche suivante dans ', next));
      const end = Date.now() + (v.next || 0);
      const tick = () => { next.textContent = `${Math.max(0, Math.ceil((end - Date.now()) / 1000))} s`; };
      tick();
      this.timers.push(setInterval(tick, 250));
    } else {
      const champ = v.champion ?? r.winner;
      const host = online.isHost;
      el = h('div.uno-results.final', { 'data-key': key },
        h('h1', champ === v.me ? 'VICTOIRE !' : 'PARTIE TERMINÉE'),
        h('div.rsub', champ === v.me ? `Tu remportes la partie avec ${r.scores[champ]} points` : `${v.seats[champ].name} remporte la partie avec ${r.scores[champ]} points`),
        h('div.board', h('div.bh', h('span', 'RANG'), h('span', 'NOM'), h('span', 'TOTAL')),
          order.map((i, k) => h(`div.brow${i === v.me ? '.me' : ''}`, h('span.rk', ORDER_NAMES[k]), h('span.bn', h('div.rav', img(this.avatarOf(v.seats[i]))), v.seats[i].name), h('span.bt', String(r.scores[i]))))),
        h('div.uo-acts', { 'data-row': '' },
          host ? btn(online.session?.solo ? 'Rejouer' : 'Retour au salon', () => { this.results = null; online.toLobby(this.lobbyUi()); if (online.session?.solo) online.start(); }, { auto: true, cls: 'red' }) : h('span.rwait', 'L’hôte peut relancer une partie…'),
          btn('Quitter', () => { online.leave(); this.titleScreen(); })));
      if (champ === v.me) this.confetti(el);
    }
    t.root.append(el);
    this.results = el;
    if (final) this.focus(el.querySelector('[data-autofocus]') || el.querySelector('[data-f]'));
  }
  confetti(el) {
    const box = h('div.uconf');
    for (let k = 0; k < 60; k++) {
      const i = h('i');
      i.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%'); i.style.setProperty('--d', (2.2 + Math.random() * 2.4).toFixed(2) + 's');
      i.style.setProperty('--dl', (Math.random() * 1.5).toFixed(2) + 's'); i.style.setProperty('--c', Object.values(HEX).slice(0, 4)[k % 4]); i.style.setProperty('--rz', (Math.random() * 720).toFixed(0) + 'deg');
      box.append(i);
    }
    el.append(box);
  }
}
