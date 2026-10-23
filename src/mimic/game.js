// Mimic Party — the game: splash, home, games list, mode choice, matchmaking, lobby (packs and rules), rounds
// (ANNOUNCE → REVEAL → RECORDING → PLAYBACK → WHEEL) and results, over the 3D room. Screens follow the game's.
import { h } from '../ui.js';
import { nav } from '../nav.js';
import { glyph, renderHints, toast } from '../shell.js';
import { input } from '../input.js';
import { audio } from '../audio.js';
import { voice } from '../rtc.js';
import { state } from '../state.js';
import { byId } from '../data.js';
import { session as account } from '../session.js';
import { openKeyboard } from '../keyboard.js';
import { unlockTrophy } from '../actions.js';
import { openControlCenter } from '../screens/cc.js';
import { endSession } from '../screens/game.js';
import { Stage, AURAS, auraCanvas } from './stage.js';
import { PRESETS, EMOTES, presetById } from './avatar.js';
import { logoUrl, fontsReady, resetLogoCache } from './logo.js';
import { button, icon, bubbly, card, roundBox, Wave, scoreText, wheel, WHEEL, ticket, fmtBonus } from './ui.js';
import { REFS_REV, sfx, quiet, loadRef, refFeatures, playBuffer, pcmBuffer } from './sound.js';
import { mic } from './mic.js';
import { speech, bestPhrase } from './speech.js';
import { features, compare, finalScore, tidy } from './dsp.js';
import { online } from './online.js';
import { CANCEL, RESTART, SKIP, ID } from './signals.js';
import REFS from './refs.json';

export const PACKS = [
  { id: 'snap', name: 'Réfs Snap', cover: 'je-change-de-vie' },
  { id: 'africa', name: 'Mèmes africains', cover: 'ca-va-peter' },
  { id: 'petits', name: 'Réfs de petits', cover: 'l-alarme' },
  { id: 'oubliees', name: 'Réfs oubliées', cover: 'ca-m-emeut' },
  { id: 'tiktok', name: 'TikTok', cover: 'version-neymar' },
];
export const refImg = id => `mimic/refs/${encodeURIComponent(id)}.webp?v=${REFS_REV}`;
export const refById = id => REFS.find(r => r.id === id);
const packName = id => PACKS.find(p => p.id === id)?.name || '';
const MAX = { classic: 5, versus: 4 };
const ROUNDS = [3, 5, 7, 10];
const EMOTE_LVL = { wave: 1, dance: 1, clap: 2, hop: 3, victory: 4, shrug: 5 };
const AURA_LVL = { none: 1, hearts: 1, stars: 2, notes: 3, bubbles: 4, flames: 6 };
const XP_LEVEL = 300;
const levelOf = xp => 1 + Math.floor(xp / XP_LEVEL);
const DEF = {
  settings: { speech: 'auto', level: 'normal', reactions: true },
  rules: { rounds: 5, wheel: true, refDuring: false, order: 'fixe', halloween: true, packs: PACKS.map(p => p.id) },
  profile: { char: 'leo', emote: 'wave', aura: 'none', xp: 0, open: true, stats: { games: 0, wins: 0, best: 0, rounds: 0, points: 0 } },
};
const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v && typeof v === 'object' ? { ...d, ...v } : { ...d }; } catch { return { ...d }; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } };
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const cycle = (list, v, d = 1) => list[(list.indexOf(v) + d + list.length) % list.length];
const COLORS = ['#ffd33d', '#3fd27a', '#8f3df5', '#3aa0ff', '#ff4fa8', '#ff8a2a'];

export class Game {
  constructor() {
    this.settings = read('mimic.settings', DEF.settings);
    this.rules = read('mimic.rules', DEF.rules);
    if (!Array.isArray(this.rules.packs) || !this.rules.packs.length) this.rules.packs = DEF.rules.packs.slice();
    this.profile = read('mimic.profile', DEF.profile);
    this.profile.stats = { ...DEF.profile.stats, ...this.profile.stats };
    if (!PRESETS.some(p => p.id === this.profile.char)) this.profile.char = 'leo';
    this.locals = (() => { try { const v = JSON.parse(localStorage.getItem('mimic.locals') || '[]'); return Array.isArray(v) ? v.slice(0, 4) : []; } catch { return []; } })();
    this.stage = new Stage();
    this.dim = h('div.mmp-dim');
    this.labelsEl = h('div.mmp-labels');
    this.ui = h('div.mmp-ui');
    this.root = h('div.mmp', this.stage.failed ? null : this.stage.canvas, this.dim, this.labelsEl, this.ui);
    this.root.addEventListener('ok', () => sfx('select'));
    this.stage.onFrame = () => this.updateLabels();
    this.epoch = 0; this.paused = false; this.closed = false; this.inTurn = false; this.aborting = false; this.inMatch = false;
    this.stack = []; this.cleanups = []; this.sceneCleanups = []; this.labels = new Map(); this.portraits = new Map();
    this.layer = null; this.once = null; this.online = null;
    this.newKick();
  }
  get me() { return account.current?.id || 'me'; }
  get myName() { return account.current?.psn || 'Joueur'; }
  get level() { return levelOf(this.profile.xp); }
  save() { write('mimic.settings', this.settings); write('mimic.rules', this.rules); write('mimic.profile', this.profile); write('mimic.locals', this.locals); }

  // ---------------------------------------------------------------- async control
  newKick() { this.kickP = new Promise(r => { this.kickR = r; }); }
  interrupt() { const r = this.kickR; this.newKick(); r(); }
  check(ep) { if (ep !== this.epoch || this.closed) throw CANCEL; if (this.inTurn && this.aborting) throw RESTART; }
  async wait(p) { const ep = this.epoch; this.check(ep); const v = await Promise.race([p, this.kickP]); this.check(ep); return v; }
  async waitEpoch(p) {
    const ep = this.epoch, box = p.then(x => ({ x }));
    for (;;) { const v = await Promise.race([box, this.kickP.then(() => null)]); if (ep !== this.epoch || this.closed) throw CANCEL; if (v) return v.x; }
  }
  async sleep(ms) {
    let left = ms;
    while (left > 0) { const t0 = performance.now(); await this.wait(new Promise(r => setTimeout(r, Math.min(left, 100)))); if (!this.paused) left -= performance.now() - t0; }
  }
  onCleanup(fn, scene = false) { const l = scene ? this.sceneCleanups : this.cleanups; l.push(fn); return () => { const i = l.indexOf(fn); if (i >= 0) l.splice(i, 1); }; }
  runCleanups(all) {
    for (const f of this.sceneCleanups.splice(0)) try { f(); } catch { /* ignore */ }
    if (all) for (const f of this.cleanups.splice(0)) try { f(); } catch { /* ignore */ }
  }
  newFlow() {
    this.epoch++; this.runCleanups(true); this.interrupt();
    this.stopOnce(); voice.hold(false); quiet(false); mic.cancelCapture();
    this.inTurn = false; this.aborting = false;
    return this.epoch;
  }
  async runTurn(fn) {
    for (;;) {
      this.inTurn = true; this.aborting = false;
      try { return await fn(); }
      catch (e) {
        if (e === SKIP) return { score: 0, silent: true, parts: [], skipped: true };
        if (e !== RESTART) throw e;
        this.runCleanups(true); voice.hold(false); quiet(false); mic.cancelCapture();
      } finally { this.inTurn = false; }
      while (this.paused) await this.wait(new Promise(r => setTimeout(r, 150)));
    }
  }
  playOnce(buf, opts) { this.stopOnce(); this.once = playBuffer(buf, opts); return this.once; }
  stopOnce() { this.once?.stop(); this.once = null; }

  // ---------------------------------------------------------------- scenes, modals, focus
  show(el, { hints = [['ok', 'Sélectionner']], keys = {}, back = null } = {}) {
    while (this.stack.length > 1) this.popModal(true);
    this.runCleanups(false);
    const prev = this.stack[0]?.el;
    if (prev && prev !== el) { prev.classList.add('out'); setTimeout(() => prev.remove(), 260); }
    el.classList.add('mmp-scene');
    this.ui.append(el);
    this.stack = [{ el, hints, keys, back }];
    this.focus(el.querySelector('[data-autofocus]') || el.querySelector('[data-f]'));
    if (nav.top === this.layer) renderHints();
    return el;
  }
  modal(el, { hints = [['ok', 'Sélectionner'], ['back', 'Fermer']], keys = {}, back = null } = {}) {
    const top = this.top;
    top.focused = this.layer?.focused;
    top.el.setAttribute('inert', '');
    const wrap = h('div.mmp-modal', el);
    this.ui.append(wrap);
    const ctx = { el: wrap, hints, keys, back: back || (() => this.popModal()) };
    this.stack.push(ctx);
    this.focus(wrap.querySelector('[data-autofocus]') || wrap.querySelector('[data-f]'));
    if (nav.top === this.layer) renderHints();
    sfx('pop');
    return ctx;
  }
  popModal(silent = false) {
    if (this.stack.length < 2) return;
    const ctx = this.stack.pop();
    ctx.onClose?.();
    ctx.el.remove();
    const top = this.top;
    top.el.removeAttribute('inert');
    this.focus(top.focused?.isConnected ? top.focused : top.el.querySelector('[data-autofocus]') || top.el.querySelector('[data-f]'));
    if (!silent) sfx('back');
    if (nav.top === this.layer) renderHints();
  }
  get top() { return this.stack[this.stack.length - 1] || { el: this.ui, hints: [], keys: {} }; }
  focus(el) {
    const L = this.layer;
    if (!L) return;
    if (nav.top === L && el) { nav.focus(el, { silent: true, instant: true }); return; }
    L.focused?.classList.remove('focused');
    L.focused = el || null;
  }
  action(a) {
    if (a === 'ps') { openControlCenter({ ingame: ID }); return true; }
    if (a === 'gamebase' || a === 'create') return false;
    const c = this.top, fn = c.keys?.[a];
    if (fn && fn() !== false) return true;
    if (a === 'back') { if (c.back) c.back(); else if (this.inMatch) this.quitDialog(); return true; }
    if (a === 'options') { if (this.inMatch) this.quitDialog(); return true; }
    if (['up', 'down', 'left', 'right', 'ok'].includes(a)) {
      // sliders and option rows react to ← →
      const f = this.layer?.focused;
      if ((a === 'left' || a === 'right') && f?.adjust) { f.adjust(a === 'left' ? -1 : 1); return true; }
      return false;
    }
    return true;
  }
  hints() { return this.top.hints || []; }

  // ---------------------------------------------------------------- lifecycle
  async start() {
    await fontsReady(); resetLogoCache();
    this.stage.start();
    this.splash();
  }
  suspend() {
    if (this.paused) return;
    this.paused = true;
    this.stopOnce(); this.stage.stop();
    if (this.inTurn && !this.online) { this.aborting = true; this.interrupt(); }
  }
  resume() {
    if (!this.paused) return;
    this.paused = false;
    audio.duck(0, .6);
    this.stage.start();
  }
  destroy() {
    this.closed = true;
    this.newFlow();
    online.leave(this);
    mic.close();
    this.stage.dispose();
  }
  portrait(char, bg = '#2f7cf0') {
    const k = `${char}|${bg}`;
    if (!this.portraits.has(k)) this.portraits.set(k, this.stage.portrait(char, bg));
    return this.portraits.get(k);
  }

  // ---------------------------------------------------------------- splash & home
  async splash() {
    this.newFlow();
    this.show(h('div.mmp-splash', h('img', { src: logoUrl(), alt: 'Mimic Party' })), { hints: [['ok', 'Passer']], keys: { ok: () => this.home() } });
    try { await this.sleep(2600); this.home(); } catch (e) { if (e !== CANCEL) throw e; }
  }
  setupHome3D() {
    const st = this.stage;
    st.clearAvatars(['me']); st.clearFx(); this.clearLabels();
    const a = st.addAvatar('me', this.profile.char);
    st.homePose(a);
    a.lidRest = -.6; a.mode = 'idle'; a.level = 0;
    st.setAura('me', this.profile.aura);
    st.setHalloween(this.rules.halloween);
    st.shot('home', { dur: 0 });
    this.dim.className = 'mmp-dim';
    return a;
  }
  home(focus) {
    this.newFlow(); this.inMatch = false; this.online = null;
    online.leave(this);
    const a = this.setupHome3D();
    let em = setInterval(() => a.play(this.profile.emote, 2.6), 9000);
    setTimeout(() => a.play(this.profile.emote, 2.6), 900);
    this.onCleanup(() => clearInterval(em), true);
    const prof = card({ name: this.myName.toUpperCase(), portrait: this.portrait(this.profile.char), big: true, level: this.level });
    prof.append(h('div.badge-i', { f: true, onok: () => this.profilePanel() }, icon('info')), h('div.tk', ticket()));
    const side = (label, thumb, fn) => h('div.mmp-side', { f: true, onok: fn }, h('div.thumb', thumb), h('span.t', label), icon('chevron', 'chev'));
    const confetti = h('div.mmp-confetti-dom');
    for (let i = 0; i < 16; i++) {
      const c = h('i');
      Object.assign(c.style, { left: (Math.random() * 100).toFixed(1) + '%', background: COLORS[i % COLORS.length], animationDuration: (7 + Math.random() * 7).toFixed(1) + 's', animationDelay: (-Math.random() * 12).toFixed(1) + 's' });
      c.style.setProperty('--dx', ((Math.random() - .5) * 30).toFixed(0) + 'rem');
      c.style.setProperty('--rr', ((Math.random() - .5) * 900).toFixed(0) + 'deg');
      confetti.append(c);
    }
    const auraThumb = auraCanvas('hearts', 160);
    const el = h('div.mmp-home', confetti,
      h('img.logo', { src: logoUrl(), alt: 'Mimic Party' }),
      h('div.profile', prof),
      h('div.mmp-round.trophy', { f: true, onok: () => this.statsPanel(), 'aria-label': 'Statistiques' }, icon('trophy')),
      h('div.mmp-round.arrow.prev', { f: true, onok: () => this.cycleChar(-1), 'aria-label': 'Personnage précédent' }, icon('left')),
      h('div.mmp-round.arrow.next', { f: true, onok: () => this.cycleChar(1), 'aria-label': 'Personnage suivant' }, icon('right')),
      h('div.main',
        button('JOUER', { kind: 'yellow', ic: 'play', auto: focus !== 'create', onok: () => this.gamesList() }),
        button('CRÉER UNE PARTIE', { kind: 'blue', ic: 'hammer', auto: focus === 'create', onok: () => this.modeDialog() }),
        button(`PROGRESSION : NIVEAU ${this.level}`, { kind: 'purple', ic: 'star', chevron: true, onok: () => this.progressPanel() })),
      h('div.open', this.openToggle()),
      h('div.quit', button('QUITTER', { kind: 'dark', onok: () => this.confirm('QUITTER MIMIC PARTY ?', 'Tu reviendras à l’écran d’accueil de la console.', 'QUITTER', () => endSession()) })),
      h('div.side', side('ANIMATIONS', h('img', { src: this.portrait('miao', 'rgba(0,0,0,0)'), alt: '' }), () => this.emotesPanel()),
        side('PERSONNAGES', h('img', { src: this.portrait('bibou', 'rgba(0,0,0,0)'), alt: '' }), () => this.charsPanel()),
        side('AURAS', auraThumb, () => this.aurasPanel())),
      h('div.left', h('div.mmp-pill', { f: true, onok: () => this.objectivesPanel() }, icon('star'), 'OBJECTIFS'), h('div.mmp-pill', { f: true, onok: () => this.infosPanel() }, icon('info'), 'INFOS')),
      h('div.mmp-round.gear', { f: true, onok: () => this.settingsPanel(), 'aria-label': 'Réglages' }, icon('gear')));
    this.show(el, { hints: [['ok', 'Sélectionner'], ['l1', 'Personnage'], ['options', 'Réglages']], keys: { l1: () => this.cycleChar(-1), r1: () => this.cycleChar(1), options: () => this.settingsPanel() }, back: () => {} });
  }
  openToggle() {
    const b = button(this.profile.open ? 'OUVERTE' : 'FERMÉE', { kind: 'teal', ic: 'lock', cls: 'sm', onok: () => {
      this.profile.open = !this.profile.open; this.save();
      b.querySelector('.t').textContent = this.profile.open ? 'OUVERTE' : 'FERMÉE';
      toast({ title: this.profile.open ? 'Partie ouverte' : 'Partie fermée', sub: this.profile.open ? 'Les amis de ton groupe peuvent rejoindre tes parties' : 'Personne ne peut rejoindre tes parties', icon: 'party', sound: null, log: false });
    } });
    return b;
  }
  cycleChar(d) {
    this.profile.char = cycle(PRESETS.map(p => p.id), this.profile.char, d); this.save();
    const a = this.stage.avatar('me'); a?.setPreset(presetById(this.profile.char)); if (a) a.lidRest = -.6;
    this.stage.setAura('me', this.profile.aura);
    const img = this.ui.querySelector('.mmp-home .profile .pic img');
    if (img) img.src = this.portrait(this.profile.char);
    sfx('pop'); input.rumble(.15, .1, 40);
  }

  // ---------------------------------------------------------------- dialogs and panels
  dlg(title, ic, body, { foot = null, gray = false, sub = '', close = true } = {}) {
    return h(`div.mmp-dlg${gray ? '.gray' : ''}`, h('h2', ic ? icon(ic) : null, title), sub ? h('div.sub', sub) : null, h('div.body', body), foot ? h('div.foot', foot) : null,
      close ? h('div.x', { f: true, onok: () => this.popModal(), 'aria-label': 'Fermer' }, icon('close')) : null);
  }
  confirm(title, text, ok, fn) {
    const ctx = this.modal(this.dlg(title, null, h('div.mmp-text', text), { gray: true, close: false, foot: [
      button(ok, { kind: 'yellow', cls: 'sm', auto: true, onok: () => { this.popModal(true); fn(); } }),
      button('ANNULER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() })] }));
    return ctx;
  }
  tiles(items, { selected, onPick, locked = () => 0 }) {
    const grid = h('div.mmp-grid');
    for (const it of items) {
      const lv = locked(it.id);
      const el = h(`div.mmp-tile${it.id === selected ? '.sel' : ''}${lv ? '.lock' : ''}`, { f: true, 'data-autofocus': it.id === selected ? '' : null, onok: () => {
        if (lv) { sfx('buzz'); toast({ title: 'Verrouillé', sub: `Disponible au niveau ${lv}`, icon: 'lock', sound: null, log: false }); return; }
        grid.querySelectorAll('.sel').forEach(x => x.classList.remove('sel')); el.classList.add('sel'); onPick(it.id);
      } }, it.pic, h('div', it.name), lv ? h('div.tag', `Niveau ${lv}`) : it.tag ? h('div.tag', it.tag) : null);
      grid.append(el);
    }
    return grid;
  }
  charsPanel() {
    const items = PRESETS.map(p => ({ id: p.id, name: p.name, pic: h('img', { src: this.portrait(p.id), alt: '' }) }));
    this.modal(this.dlg('PERSONNAGES', 'people', this.tiles(items, { selected: this.profile.char, onPick: id => { const d = PRESETS.findIndex(p => p.id === id) - PRESETS.findIndex(p => p.id === this.profile.char); this.cycleChar(d); } }),
      { foot: button('FERMER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() }) }));
  }
  emotesPanel() {
    const items = EMOTES.map(e => ({ id: e.id, name: e.name, pic: h('img', { src: this.portrait(this.profile.char, '#3a1450'), alt: '' }) }));
    this.modal(this.dlg('ANIMATIONS', 'star', this.tiles(items, { selected: this.profile.emote, locked: id => (EMOTE_LVL[id] > this.level ? EMOTE_LVL[id] : 0),
      onPick: id => { this.profile.emote = id; this.save(); this.stage.avatar('me')?.play(id, 2.6); sfx('coin'); } }), { foot: button('FERMER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() }) }));
  }
  aurasPanel() {
    const items = AURAS.map(a => ({ id: a.id, name: a.name, pic: a.id === 'none' ? h('div', { style: { width: '13rem', height: '13rem' } }) : auraCanvas(a.id, 160) }));
    this.modal(this.dlg('AURAS', 'star', this.tiles(items, { selected: this.profile.aura, locked: id => (AURA_LVL[id] > this.level ? AURA_LVL[id] : 0),
      onPick: id => { this.profile.aura = id; this.save(); this.stage.setAura('me', id); sfx('coin'); } }), { foot: button('FERMER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() }) }));
  }
  objectivesPanel() {
    const got = state.trophies[ID] || [];
    const rows = (byId[ID]?.trophies || []).map((t, i) => h('div.mmp-row', { f: true }, icon(got.includes(i) ? 'check' : 'box'), h('div.grow', h('div.t1', t.n), h('div.t2', t.d))));
    this.modal(this.dlg('OBJECTIFS', 'star', h('div.mmp-list', rows), { sub: `${got.length} / ${rows.length} réussis · ils deviennent aussi des trophées de la console` }));
  }
  infosPanel() {
    this.modal(this.dlg('INFOS', 'info', h('div.mmp-text',
      h('h3', 'Le principe'), h('p', 'À chaque manche, un son est tiré au hasard dans les packs choisis. Écoute-le bien, puis imite-le : une seule prise, tous en même temps (ou chacun son tour sur la même console).'),
      h('h3', 'Les phases'), h('p', 'REVEAL : le son à imiter. RECORDING : 3, 2, 1… GO, ton micro enregistre. PLAYBACK : chacun passe au micro, son imitation est rejouée et notée sur 100. WHEEL : la roue de fin de manche donne un bonus pour la manche suivante.'),
      h('h3', 'La note'), h('p', 'Le jury compare ta voix au son : ressemblance du timbre, rythme, mélodie et, quand le navigateur le permet, les paroles reconnues.'),
      h('h3', 'Le micro et le chat vocal'), h('p', 'Pendant la prise, ton micro du chat vocal est coupé et le son de tes amis est mis en pause, puis tout revient pour écouter les imitations ensemble.'),
      h('h3', 'Les tomates'), h('p', 'Pendant le PLAYBACK, appuie sur □ (ou le bouton tomate) pour en lancer une sur celui qui chante. Les imitations ratées en reçoivent d’office.'),
      h('h3', 'Les sons'), h('p', 'Les 42 sons proviennent de tes vidéos (mèmes et réfs). Recréation non officielle de Mimic Party, réalisée pour cette console.'))));
  }
  settingsPanel() {
    const s = this.settings;
    const rows = [
      ['Reconnaissance des paroles', () => ({ auto: 'AUTO', on: 'AVEC', off: 'SANS' })[s.speech], d => { s.speech = cycle(['auto', 'on', 'off'], s.speech, d); }],
      ['Exigence du jury', () => ({ easy: 'COOL', normal: 'NORMAL', hard: 'DUR' })[s.level], d => { s.level = cycle(['easy', 'normal', 'hard'], s.level, d); }],
      ['Réactions mèmes', () => (s.reactions ? 'AVEC' : 'SANS'), () => { s.reactions = !s.reactions; }],
    ];
    const testVal = h('b', mic.ready ? 'ACTIF' : 'TESTER');
    let raf = 0;
    const meter = () => { raf = requestAnimationFrame(meter); const l = mic.level(); testVal.textContent = l > .2 ? 'ON T’ENTEND' : 'PARLE !'; testVal.style.opacity = .5 + l; };
    const list = h('div.mmp-rules', rows.map(([k, val, set]) => this.ruleRow(k, val, set, () => this.save())),
      h('div.r', { f: true, onok: async () => { if (raf) return; try { await mic.open(); meter(); } catch (e) { testVal.textContent = 'INDISPONIBLE'; toast({ title: 'Micro indisponible', sub: e.message, icon: 'mic', sound: 'error', log: false }); } } }, h('span', 'Test du micro'), testVal),
      speech.supported ? null : h('div.mmp-text', { style: { marginTop: '1.4rem', fontSize: '1.8rem' } }, 'Ce navigateur ne propose pas la reconnaissance vocale : seul le son est analysé.'));
    const ctx = this.modal(this.dlg('RÉGLAGES', 'gear', list, { foot: button('FERMER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() }) }));
    ctx.onClose = () => cancelAnimationFrame(raf);
  }
  ruleRow(label, val, set, after) {
    const b = h('b', val());
    const el = h('div.r', { f: true, onok: () => { set(1); b.textContent = val(); after?.(); sfx('pop'); } }, h('span', label), b);
    el.adjust = d => { set(d); b.textContent = val(); after?.(); sfx('pop'); };
    return el;
  }
  progressPanel() {
    const xp = this.profile.xp, lv = this.level, into = xp - (lv - 1) * XP_LEVEL;
    const unlocks = [...EMOTES.map(e => [EMOTE_LVL[e.id], `Animation « ${e.name} »`]), ...AURAS.filter(a => a.id !== 'none').map(a => [AURA_LVL[a.id], `Aura « ${a.name} »`])].sort((a, b) => a[0] - b[0]);
    const bar = h('div.mmp-level', h('i')); bar.style.setProperty('--l', (into / XP_LEVEL).toFixed(3));
    this.modal(this.dlg(`NIVEAU ${lv}`, 'star', h('div',
      h('div.mmp-text', `${into} / ${XP_LEVEL} XP vers le niveau ${lv + 1} · chaque partie rapporte de l’XP (bonus pour le gagnant).`),
      bar,
      h('div.mmp-list', { style: { marginTop: '2rem' } }, unlocks.map(([l, t]) => h('div.mmp-row', { f: true }, icon(l <= lv ? 'check' : 'box'), h('div.grow', h('div.t1', t), h('div.t2', `Niveau ${l}`))))))));
  }
  statsPanel() {
    const s = this.profile.stats;
    this.modal(this.dlg('STATISTIQUES', 'people', h('div.mmp-kv',
      h('span', 'Parties jouées'), h('b', String(s.games)), h('span', 'Victoires'), h('b', String(s.wins)),
      h('span', 'Manches jouées'), h('b', String(s.rounds)), h('span', 'Meilleure imitation'), h('b', `${s.best} / 100`),
      h('span', 'Moyenne par manche'), h('b', s.rounds ? `${Math.round(s.points / s.rounds)} / 100` : '—'))));
  }
  profilePanel() {
    this.modal(this.dlg(this.myName, 'info', h('div.mmp-kv',
      h('span', 'Niveau'), h('b', String(this.level)), h('span', 'Expérience'), h('b', `${this.profile.xp} XP`),
      h('span', 'Personnage'), h('b', presetById(this.profile.char).name), h('span', 'Animation'), h('b', EMOTES.find(e => e.id === this.profile.emote)?.name || ''),
      h('span', 'Aura'), h('b', AURAS.find(a => a.id === this.profile.aura)?.name || ''))));
  }

  // ---------------------------------------------------------------- PARTIES DISPONIBLES / QUEL MODE / RECHERCHE
  gamesList() {
    const list = h('div.mmp-list'), count = h('span'), status = h('div.mmp-status');
    const render = () => {
      const games = online.lobbies();
      count.textContent = `${games.length} partie(s) joignable(s)`;
      const was = this.layer?.focused, wasHost = was && list.contains(was) ? was.dataset.host : null;
      list.replaceChildren(...games.map(gm => h('div.mmp-row', { f: true, 'data-host': gm.host, onok: () => { this.popModal(true); online.join(this, gm.host); } },
        h('img', { src: this.portrait(gm.char || 'leo', '#e5483f'), alt: '' }), h('div.grow', h('div.t1', `Partie de ${gm.name}`), h('div.t2', `${gm.count}/${gm.max} joueurs · ${gm.mode === 'versus' ? 'Versus' : 'Classic'}${gm.desc ? ' · ' + gm.desc : ''}`)), icon('chevron'))));
      const st = online.status();
      status.replaceChildren(icon(st.busy ? 'refresh' : 'people', st.busy ? 'spin' : ''), st.text);
      if (wasHost && this.top.el.contains(list)) this.focus(list.querySelector(`[data-host="${CSS.escape(wasHost)}"]`) || box.querySelector('.foot [data-f]'));
    };
    const field = h('div.mmp-field', { f: true, onok: () => openKeyboard({ title: 'Code de la partie (6 caractères)', maxLength: 6, onDone: v => { val.textContent = v.toUpperCase(); } }) },
      h('span.val', { 'data-ph': 'Code de la partie' }), h('span.go', { onclick: e => { e.stopPropagation(); joinCode(); } }, icon('play')));
    const val = field.querySelector('.val');
    const joinCode = async () => {
      const code = val.textContent.trim();
      if (code.length !== 6) { sfx('buzz'); toast({ title: 'Code de la partie', sub: 'Saisis les 6 caractères du code de ton ami', icon: 'party', sound: null, log: false }); return; }
      status.replaceChildren(icon('refresh', 'spin'), 'Connexion au serveur...');
      try { await online.joinCode(code); render(); } catch (e) { toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); render(); }
    };
    const header = h('div', { style: { display: 'flex', alignItems: 'center', gap: '2rem' } });
    const box = this.dlg('PARTIES DISPONIBLES', 'people', h('div', list, status), { foot: [field,
      button('AU HASARD', { kind: 'purple', ic: 'people', cls: 'sm', onok: () => { this.popModal(true); this.search(); } }),
      button('CRÉER UNE PARTIE', { kind: 'blue', cls: 'sm', onok: () => { this.popModal(true); this.modeDialog(); } })] });
    box.querySelector('h2').append(h('div.mmp-count-pill', icon('people'), count));
    box.prepend(h('img.logo-top', { src: logoUrl(), alt: '' }));
    void header;
    const ctx = this.modal(box, { hints: [['ok', 'Sélectionner'], ['back', 'Fermer']] });
    render();
    const off = online.watch(render);
    ctx.onClose = off;
  }
  modeDialog() {
    const art = ids => h('div.art', ids.map(id => h('img', { src: this.portrait(id, 'rgba(0,0,0,0)'), alt: '' })));
    const mode = (kind, title, text, cap, ids) => h(`div.mmp-mode.${kind}`, { f: true, 'data-autofocus': kind === 'classic' ? '' : null, onok: () => { this.popModal(true); this.lobby({ mode: kind }); } },
      h('h3', bubbly(title)), h('p', text), art(ids), h('div.cap', cap));
    this.modal(this.dlg('QUEL MODE ?', null, h('div.mmp-modes',
      mode('classic', 'CLASSIC', 'Chacun pour soi. Tout le monde imite le même son, et le meilleur marque.', 'Jusqu’à 5 joueurs', ['bonnie', 'zed', 'tino', 'miao']),
      mode('versus', 'VERSUS', 'Deux équipes, bleue et rouge. Les points de chacun vont à son camp.', 'Jusqu’à 4 joueurs', ['krank', 'bibou', 'leo', 'nina'])),
    { gray: true, sub: 'Ce choix est gravé dans le code de ta partie : il ne changera plus après.', close: false, foot: [h('div', { style: { flex: 1 } }), button('FERMER', { kind: 'dark', cls: 'sm', onok: () => this.popModal() })] }));
  }
  async search() {
    const ep = this.newFlow();
    const s1 = h('div.s1', online.status().party ? 'Recherche d’une partie de ton groupe...' : 'Ouverture d’une partie...');
    this.show(h('div.mmp-search', bubbly('Recherche d\'une partie...', 'mmp-title-cyan'), s1,
      h('div.s2', 'Personne après 10 secondes ? On ouvrira ta propre partie.'), button('ANNULER', { kind: 'dark', auto: true, onok: () => this.home() })),
    { hints: [['ok', 'Annuler']], back: () => this.home() });
    try {
      const found = await this.wait(online.findLobby(10000));
      if (ep !== this.epoch) return;
      if (found) online.join(this, found.host); else this.lobby({ mode: 'classic' });
    } catch (e) { if (e !== CANCEL) throw e; }
  }

  // ---------------------------------------------------------------- LOBBY
  lobbyPlayers() {
    const list = [{ id: this.me, name: this.myName, char: this.profile.char, level: this.level, local: true, me: true, host: true }];
    this.locals.forEach((p, i) => list.push({ id: `local-${i}`, name: p.name, char: p.char, level: 1, local: true, couch: true, idx: i }));
    return list.concat(online.remotePlayers());
  }
  lobby({ mode = this.lobbyMode || 'classic' } = {}) {
    this.newFlow(); this.inMatch = false;
    this.lobbyMode = mode;
    const st = this.stage;
    st.clearAvatars(); this.clearLabels(); st.clearFx(); st.stagePose(); st.setHalloween(this.rules.halloween);
    st.shot('lobby', { dur: 1.2 });
    this.dim.className = 'mmp-dim on dark';
    online.host(this, mode);
    const R = this.rules;
    const packsEl = h('div.packs');
    const playersEl = h('div.players');
    const center = h('div.center');
    const nEl = h('div.n');
    const renderPacks = () => {
      const all = PACKS.every(p => R.packs.includes(p.id));
      packsEl.replaceChildren(
        h('div.browse', { f: true, onok: () => this.packBrowser() }, h('b', 'Parcourir les thèmes...'), h('img.em', { src: refImg(PACKS[1].cover), alt: '' })),
        h('div.count', `${R.packs.length} / ${PACKS.length} pack(s) - clique pour changer`),
        h('div.packrow', { f: true, onok: () => { R.packs = all ? [PACKS[0].id] : PACKS.map(p => p.id); this.save(); renderPacks(); online.pushLobby(); } }, h('span.grow', 'Tout sélectionner'), icon(all ? 'check' : 'box')),
        h('div.head', 'PACKS MIMIC'),
        ...PACKS.map(p => {
          const on = R.packs.includes(p.id);
          const eye = h('span', { onclick: e => { e.stopPropagation(); this.packPreview(p.id); } }, icon('eye'));
          const row = h('div.packrow', { f: true, onok: () => { R.packs = on ? R.packs.filter(x => x !== p.id) : [...R.packs, p.id]; if (!R.packs.length) R.packs = [p.id]; this.save(); renderPacks(); online.pushLobby(); } },
            h('img', { src: refImg(p.cover), alt: '' }), h('span.grow', p.name), eye, icon(on ? 'check' : 'box'));
          row.addEventListener('focus:f', () => { this.top.keys.triangle = () => this.packPreview(p.id); });
          return row;
        }));
    };
    const renderPlayers = () => {
      const ps = this.lobbyPlayers();
      const max = MAX[mode];
      const was = this.layer?.focused, wasPid = was && playersEl.contains(was) ? was.dataset.pid || '+' : null;
      playersEl.replaceChildren(...ps.map((p, i) => {
        const team = mode === 'versus' ? (i % 2 ? 'blue' : 'red') : null;
        const row = h('div.mmp-prow', { f: true, 'data-pid': p.id, onok: () => (p.me ? this.myCharPanel() : p.couch ? this.localPlayerMenu(p.idx) : null) },
          h('div.av', h('img', { src: this.portrait(p.char, '#e5483f'), alt: '' }), p.host ? icon('crown', 'crown') : null),
          voice.active && !p.couch ? icon('speaker', 'sp') : null,
          team ? h('span.team', { style: { background: team === 'red' ? '#e5483f' : '#3b6ff0' } }) : null,
          h('div.who', `${p.name.toUpperCase()}${p.me ? ' (toi)' : p.couch ? ' (sur cette console)' : ''}`, h('small', `Lvl.${p.level || 1}`)),
          h('span.st', 'Prêt'));
        return row;
      }), ps.length < max ? h('div', { style: { display: 'flex', justifyContent: 'center' } }, button('+ JOUEUR SUR CETTE CONSOLE', { kind: 'outline', cls: 'sm', onok: () => this.addLocal() })) : null);
      if (wasPid && this.stack.length === 1) this.focus([...playersEl.querySelectorAll('[data-f]')].find(x => (x.dataset.pid || '+') === wasPid) || playersEl.querySelector('[data-f]'));
      nEl.textContent = `${ps.length}/${max} joueurs - quand tu veux`;
      if (ps.length > max) nEl.textContent = `${ps.length}/${max} joueurs - trop de joueurs pour ce mode`;
    };
    const rules = h('div.rules.mmp-rules', h('div.k', 'RÈGLES DE LA PARTIE'),
      this.ruleRow('Nombre de manches', () => String(R.rounds), d => { R.rounds = cycle(ROUNDS, R.rounds, d); }, () => { this.save(); online.pushLobby(); }),
      this.ruleRow('Roue de fin de manche', () => (R.wheel ? 'AVEC' : 'SANS'), () => { R.wheel = !R.wheel; }, () => { this.save(); online.pushLobby(); }),
      this.ruleRow('Son pendant la prise', () => (R.refDuring ? 'AVEC' : 'SANS'), () => { R.refDuring = !R.refDuring; }, () => { this.save(); online.pushLobby(); }),
      this.ruleRow('Ordre de passage', () => (R.order === 'fixe' ? 'FIXE' : 'ALÉATOIRE'), () => { R.order = R.order === 'fixe' ? 'random' : 'fixe'; }, () => { this.save(); online.pushLobby(); }),
      this.ruleRow('Événement Halloween', () => (R.halloween ? 'AVEC' : 'SANS'), () => { R.halloween = !R.halloween; }, () => { this.save(); st.setHalloween(R.halloween); online.pushLobby(); }),
      h('div.r', h('span', 'Mode'), h('b', mode === 'versus' ? 'VERSUS' : 'CLASSIC')));
    const codeRow = h('div.code');
    const renderCode = () => {
      const c = online.code();
      codeRow.replaceChildren(...(c ? [h('span', `CODE : ${c} (${this.profile.open ? 'PUBLIC' : 'PRIVÉ'})`), button('COPIER', { kind: 'purple', cls: 'sm', onok: () => online.share() })] : [h('span', online.status().party ? `PARTIE DE TON GROUPE (${this.profile.open ? 'OUVERTE' : 'FERMÉE'})` : 'PARTIE SUR CETTE CONSOLE')]));
    };
    const desc = h('div.mmp-field', { f: true, onok: () => openKeyboard({ title: 'Décris ta partie', value: this.desc || '', maxLength: 40, onDone: v => { this.desc = v.trim(); dv.textContent = this.desc; online.pushLobby(); } }) },
      h('span.val', { 'data-ph': 'Décris ta partie (ex : Thèmes animés !)' }, this.desc || ''));
    const dv = desc.querySelector('.val');
    center.append(nEl, codeRow, button('LANCER', { kind: 'green', cls: 'launch', auto: true, onok: () => this.launch() }), h('div.desc', desc));
    this.lobbyRender = () => { renderPlayers(); renderCode(); };
    renderPacks(); renderPlayers(); renderCode();
    const el = h('div.mmp-lobby', packsEl, h('div.ttl', bubbly('Lobby', 'mmp-title-cyan')), playersEl, rules, center,
      h('div.br', h('div', this.openToggle()), button('QUITTER', { kind: 'outline', onok: () => this.home() })),
      h('div.mmp-round.gear', { f: true, onok: () => this.settingsPanel() }, icon('gear')));
    this.show(el, { hints: [['ok', 'Sélectionner'], ['triangle', 'Écouter le pack'], ['options', 'Lancer'], ['back', 'Quitter']], keys: { options: () => this.launch() }, back: () => this.home() });
    this.onCleanup(online.watch(() => this.lobbyRender?.()), true);
  }
  myCharPanel() {
    this.charsPanel();
    this.top.onClose = () => { this.lobbyRender?.(); online.pushLobby(); };
  }
  addLocal() {
    if (this.lobbyPlayers().length >= MAX[this.lobbyMode]) { sfx('buzz'); return; }
    const used = new Set([this.profile.char, ...this.locals.map(l => l.char)]);
    this.locals.push({ name: `Joueur ${this.locals.length + 2}`, char: PRESETS.find(p => !used.has(p.id))?.id || 'leo' });
    this.save(); sfx('pop'); this.lobbyRender?.(); online.pushLobby();
  }
  localPlayerMenu(i) {
    const p = this.locals[i];
    if (!p) return;
    const img = h('img', { src: this.portrait(p.char), alt: '' });
    const setChar = d => { p.char = cycle(PRESETS.map(x => x.id), p.char, d); img.src = this.portrait(p.char); this.save(); this.lobbyRender?.(); sfx('pop'); };
    const arrows = h('div', { style: { display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center' } },
      h('div.mmp-round.arrow', { f: true, onok: () => setChar(-1) }, icon('left')), h('div', { style: { width: '16rem' } }, img), h('div.mmp-round.arrow', { f: true, onok: () => setChar(1) }, icon('right')));
    this.modal(this.dlg(p.name.toUpperCase(), 'people', arrows, { foot: [
      button('RENOMMER', { kind: 'blue', cls: 'sm', onok: () => openKeyboard({ title: 'Nom du joueur', value: p.name, maxLength: 14, onDone: v => { v = v.replace(/\s+/g, ' ').trim(); if (v) { p.name = v; this.save(); this.popModal(true); this.lobbyRender?.(); } } }) }),
      button('RETIRER', { kind: 'dark', cls: 'sm', onok: () => { this.locals.splice(i, 1); this.save(); this.popModal(true); this.lobbyRender?.(); online.pushLobby(); } })] }), { keys: { l1: () => setChar(-1), r1: () => setChar(1) } });
  }
  packPreview(id) {
    const refs = REFS.filter(r => r.pack === id);
    const rows = refs.map(r => h('div.mmp-row', { f: true, onok: async () => { try { this.playOnce(await loadRef(r.id)); } catch { sfx('buzz'); } } },
      h('img', { src: refImg(r.id), alt: '' }), h('div.grow', h('div.t1', r.title), h('div.t2', `${r.dur.toFixed(1).replace('.', ',')} s`)), icon('play')));
    const ctx = this.modal(this.dlg(packName(id).toUpperCase(), 'eye', h('div.mmp-list', rows), { sub: `${refs.length} sons · ✕ pour écouter` }));
    ctx.onClose = () => this.stopOnce();
  }
  packBrowser() {
    const rows = PACKS.map(p => h('div.mmp-row', { f: true, onok: () => this.packPreview(p.id) }, h('img', { src: refImg(p.cover), alt: '' }),
      h('div.grow', h('div.t1', p.name), h('div.t2', `${REFS.filter(r => r.pack === p.id).length} sons`)), icon(this.rules.packs.includes(p.id) ? 'check' : 'box')));
    this.modal(this.dlg('THÈMES', 'search', h('div.mmp-list', rows), { sub: 'Tous les sons viennent de tes vidéos.' }));
  }
  // explains the microphone before the browser asks for it
  async askMic() {
    if (mic.ready) return true;
    return new Promise(resolve => {
      const err = h('div.mmp-text', 'Il sert à enregistrer tes imitations. Ta voix reste sur cette console (et chez les amis de ta partie).');
      const ctx = this.modal(this.dlg('MIMIC PARTY A BESOIN DE TON MICRO', 'mic', err, { gray: true, close: false, foot: [
        button('AUTORISER LE MICRO', { kind: 'yellow', cls: 'sm', auto: true, onok: async () => {
          try { await mic.open(); this.popModal(true); resolve(true); }
          catch (e) { err.textContent = e.message; sfx('buzz'); }
        } }),
        button('ANNULER', { kind: 'dark', cls: 'sm', onok: () => { this.popModal(); resolve(false); } })] }), { back: () => { this.popModal(); resolve(false); } });
      void ctx;
    });
  }
  async launch() {
    const ps = this.lobbyPlayers();
    if (ps.length > MAX[this.lobbyMode]) { sfx('buzz'); toast({ title: 'Trop de joueurs', sub: `${MAX[this.lobbyMode]} joueurs maximum en ${this.lobbyMode === 'versus' ? 'Versus' : 'Classic'}`, icon: 'party', sound: null, log: false }); return; }
    if (!(await this.askMic())) return;
    const cfg = { mode: this.lobbyMode, rules: { ...this.rules, packs: [...this.rules.packs] }, players: ps.map((p, i) => ({ id: p.id, name: p.name, char: p.char, team: this.lobbyMode === 'versus' ? (i % 2 ? 'blue' : 'red') : null, local: !!p.local, couch: !!p.couch })) };
    cfg.plan = this.makePlan(cfg.rules);
    if (online.remotePlayers().length) online.startMatch(this, cfg);
    else this.playLocal(cfg);
  }
  makePlan(rules) {
    const forced = globalThis.__MIMIC_TEST__?.ref;   // end-to-end test: always the sound the fake microphone imitates
    if (forced && refById(forced)) return Array(rules.rounds).fill(forced);
    const pool = shuffle(REFS.filter(r => rules.packs.includes(r.pack)));
    const plan = [];
    for (let i = 0; i < rules.rounds; i++) plan.push(pool[i % pool.length].id);
    return plan;
  }

  // ---------------------------------------------------------------- MATCH (rounds)
  async playLocal(cfg) {
    this.newFlow();
    try {
      this.beginMatch(cfg);
      const bonus = {};
      for (let n = 0; n < cfg.plan.length; n++) {
        const ref = refById(cfg.plan[n]);
        await this.phaseAnnounce(n);
        const got = await this.phaseReveal(n, ref);
        const res = {};
        const couch = this.mplayers.filter(p => p.local);
        for (const p of couch) res[p.id] = await this.runTurn(() => this.phaseRecord(n, ref, got, p, { couch: couch.length > 1 }));
        const order = this.rulesOrder(this.mplayers.map(p => p.id));
        const entries = order.map(id => ({ id, ...this.applyBonus(res[id], bonus[id]) }));
        await this.phasePlayback(n, entries, id => res[id]?.pcm);
        for (const k in bonus) delete bonus[k];
        if (cfg.rules.wheel) {
          const spins = Object.fromEntries(this.mplayers.map(p => [p.id, Math.floor(Math.random() * WHEEL.length)]));
          const last = n === cfg.plan.length - 1;
          await this.phaseWheel(n, spins, last);
          for (const [id, i] of Object.entries(spins)) {
            if (last) { const p = this.mplayers.find(x => x.id === id); const w = WHEEL[i]; const before = p.score; p.score = Math.round(p.score * (w.mul || 1)) + (w.add || 0); p.gainWheel = p.score - before; }
            else bonus[id] = WHEEL[i];
          }
          this.renderCards();
        }
      }
      await this.phaseResults();
    } catch (e) { if (e !== CANCEL) throw e; }
  }
  rulesOrder(ids) { return this.cfg.rules.order === 'fixe' ? ids : shuffle(ids); }
  applyBonus(r = { score: 0, silent: true }, b) {
    const base = r.score || 0;
    const final = b ? Math.round(base * (b.mul || 1)) + (b.add || 0) : base;
    return { score: base, final, bonus: b && (b.add || b.mul !== 1) ? fmtBonus(b) : '', silent: !!r.silent, heard: r.heard || '' };
  }
  beginMatch(cfg) {
    this.cfg = cfg; this.inMatch = true;
    this.mplayers = cfg.players.map(p => ({ ...p, score: 0, me: p.id === this.me }));
    const st = this.stage;
    st.clearAvatars(); st.clearFx(); this.clearLabels(); st.stagePose(); st.setHalloween(cfg.rules.halloween);
    st.setAura('me', null);
    const slots = st.slots(this.mplayers.length);
    this.mplayers.forEach((p, i) => {
      p.slot = slots[i];
      const a = st.addAvatar(p.id, p.char, { x: slots[i].x, z: slots[i].z });
      a.lidRest = presetById(p.char).lids ?? -.3;
      if (p.me) st.setAura(p.id, this.profile.aura);
      this.addLabel(p);
    });
    st.shot('stage', { dur: 1.4 });
    this.dim.className = 'mmp-dim';
    this.stats = { scores: [], best: null };
  }
  hud(phase, n, extra = []) {
    const total = this.cfg.plan.length;
    this.cardsEl = h('div.mmp-cards');
    this.renderCards();
    const top = h('div.mmp-topright', h('div.mmp-round', { f: true, onok: () => this.settingsPanel() }, icon('gear')), button('QUITTER', { kind: 'ghostred', cls: 'sm', onok: () => this.quitDialog() }));
    const teams = this.cfg.mode === 'versus' ? this.teamsEl() : null;
    return h('div', roundBox(n + 1, total, phase), this.cardsEl, teams, top, ...extra);
  }
  teamsEl() {
    const t = { red: 0, blue: 0 };
    this.mplayers.forEach(p => { if (p.team) t[p.team] += p.score; });
    return h('div.mmp-teams', h('span.red', `ROUGE ${t.red}`), h('span.blue', `BLEU ${t.blue}`));
  }
  renderCards(only = null) {
    if (!this.cardsEl) return;
    const list = only ? this.mplayers.filter(p => p.id === only) : this.mplayers;
    const rots = [-6, 3, -2, 5, -4];
    this.cardsEl.replaceChildren(...list.map((p, i) => {
      const c = card({ name: p.name, score: p.score, portrait: this.portrait(p.char, p.team === 'blue' ? '#3b6ff0' : p.char === 'bibou' ? '#ff962a' : '#e5483f'), rot: only ? 0 : rots[i % 5], me: p.me });
      c.dataset.pid = p.id;
      return c;
    }));
  }
  caption(text) { return h('div.mmp-caption', text); }
  async phaseAnnounce(n) {
    this.labelsOn = true;
    const st = this.stage;
    this.mplayers.forEach(p => { const a = st.avatar(p.id); if (a && (Math.abs(a.position.x - p.slot.x) > .05 || Math.abs(a.position.z - p.slot.z) > .05)) a.walkTo(p.slot.x, p.slot.z, 0); a && (a.mode = 'idle'); });
    st.shot('stage', { dur: 1 });
    this.dim.className = 'mmp-dim';
    this.show(this.hud('ANNOUNCE', n, [this.caption(`Manche ${n + 1} - un son est en train d'être tiré...`)]), { hints: [['options', 'Quitter']] });
    sfx('drumroll');
    await this.sleep(2600);
  }
  async phaseReveal(n, ref) {
    const got = await this.loadRefSafe(ref.id);
    this.labelsOn = false;
    this.dim.className = 'mmp-dim on';
    const wave = new Wave();
    const sound = h('div.mmp-sound', h('div.ph', h('img', { src: refImg(ref.id), alt: '' })), h('div.nm', bubbly(ref.title)), h('div.pk', packName(ref.pack)));
    this.show(this.hud('REVEAL', n, [sound, wave.el, this.caption('Écoute bien le son à imiter')]), { hints: [['options', 'Quitter']] });
    if (!got) { await this.sleep(1500); return null; }
    requestAnimationFrame(() => wave.setRef(got[0], got[0].duration));
    await this.sleep(700);
    const pb = playBuffer(got[0]);
    const off = this.onCleanup(() => pb.stop());
    const t0 = performance.now();
    let raf = 0;
    const tick = () => { raf = requestAnimationFrame(tick); wave.setHead(Math.min(1, (performance.now() - t0) / 1000 / got[0].duration)); };
    tick();
    try { await this.wait(pb.done); } finally { cancelAnimationFrame(raf); pb.stop(); off(); }
    wave.setHead(1);
    await this.sleep(700);
    return got;
  }
  async loadRefSafe(id) {
    try { return await this.wait(Promise.all([loadRef(id), refFeatures(id)])); }
    catch (e) { if (typeof e === 'symbol') throw e; toast({ title: 'Son introuvable', sub: 'Vérifie ta connexion : ce son n’a pas pu être chargé', icon: 'info', sound: 'error', log: false }); return null; }
  }
  // one take for one player of this console: close-up, 3-2-1, GO, recording over the reference timeline
  async phaseRecord(n, ref, got, p, { couch = false, together = false } = {}) {
    if (!got) return { score: 0, silent: true, parts: [] };
    const st = this.stage, a = st.avatar(p.id);
    this.labelsOn = false;
    this.dim.className = 'mmp-dim';
    if (a) { a.walk = null; a.root.position.set(p.slot.x, 0, p.slot.z); a.root.rotation.y = 0; }
    st.shot('close', { avatar: a, dur: 1 });
    const wave = new Wave();
    const cap = this.caption(couch ? `${p.name} - une seule prise !` : 'Tous en même temps - une seule prise !');
    const hold = h('div.mmp-hold.hidden', icon('mic'), 'Chat vocal en pause pendant la prise');
    this.show(this.hud('RECORDING', n, [wave.el, cap, hold]), { hints: [['options', 'Quitter']] });
    requestAnimationFrame(() => wave.setRef(got[0], got[0].duration));
    if (couch) {
      const go = h('div.mmp-turn', h('div.who', bubbly(`Au tour de ${p.name} !`)), button('C’EST PARTI', { kind: 'yellow', auto: true, onok: () => resolve() }));
      let resolve;
      const ready = new Promise(r => { resolve = r; });
      wave.el.style.visibility = 'hidden'; cap.style.visibility = 'hidden';
      this.top.el.append(go);
      this.focus(go.querySelector('[data-f]'));
      this.top.keys.ok = () => { resolve(); };
      await this.wait(ready);
      go.remove(); delete this.top.keys.ok;
      wave.el.style.visibility = ''; cap.style.visibility = '';
    } else await this.sleep(900);
    await this.ensureMic();
    for (const c of ['3', '2', '1']) { wave.setCount(c); sfx('count'); input.rumble(.2, .1, 60); await this.sleep(750); }
    wave.setCount('');
    cap.textContent = 'GO !';
    sfx('go'); input.rumble(.5, .3, 120);
    await this.sleep(260);
    const dur = ref.dur + .35;
    if (voice.active) hold.classList.remove('hidden');
    quiet(true); voice.hold(true);
    const sp = ref.say && speech.usable(this.settings.speech) ? speech.start({}) : null;
    const pb = this.cfg.rules.refDuring ? playBuffer(got[0], { gain: .6 }) : null;
    mic.startCapture();
    const t0 = performance.now();
    let raf = 0, rec;
    try {
      await this.wait(new Promise(resolve => {
        const loop = now => {
          raf = requestAnimationFrame(loop);
          if (this.paused) return;
          const k = (now - t0) / 1000 / dur, lv = mic.level();
          if (a) { a.level = lv; a.mode = lv > .1 ? 'talk' : 'idle'; }
          wave.pushRec(lv, Math.min(1, k));
          if (k >= 1) resolve();
        };
        raf = requestAnimationFrame(loop);
      }));
      rec = mic.stopCapture();
      rec.transcripts = sp ? await this.wait(sp.stop()) : null;
      rec.speechUsed = !!sp && !sp.failed;
    } finally {
      cancelAnimationFrame(raf); if (mic.capturing) mic.cancelCapture(); sp?.abort(); pb?.stop();
      voice.hold(false); quiet(false);
      if (a) { a.level = 0; a.mode = 'idle'; }
      hold.classList.add('hidden');
    }
    sfx('recStop');
    // score now, reveal it during the playback
    let cmp = compare(got[1], features(rec.pcm));
    const words = rec.speechUsed && ref.say ? bestPhrase(rec.transcripts, ref.say) : null;
    let score;
    if (rec.dead && rec.speechUsed && rec.transcripts?.length) { speech.markConflict(); score = Math.round((words || 0) * 85); cmp = { silent: false }; }
    else if (rec.dead) { if (rec.speechUsed) speech.markConflict(); score = 0; cmp = { silent: true }; }
    else score = finalScore(cmp, words, this.settings.level);
    const pcm = cmp.silent ? null : tidy(rec.pcm);
    this.stats.scores.push(score);
    if (p.me) { this.profile.stats.rounds++; this.profile.stats.points += score; this.profile.stats.best = Math.max(this.profile.stats.best, score); this.trophy(0); if (score >= 90) this.trophy(1); }
    if (pcm && (!this.stats.best || score > this.stats.best.score)) this.stats.best = { score, pcm, name: p.name, ref: ref.id };
    cap.textContent = 'Prise enregistrée !';
    await this.sleep(500);
    return { score, silent: !!cmp.silent, pcm, heard: rec.transcripts?.[0] || '', len: pcm?.length || 0 };
  }
  async ensureMic() {
    if (mic.ready) return;
    for (;;) {
      try { await this.wait(mic.open()); return; }
      catch (e) {
        if (typeof e === 'symbol') throw e;
        const v = await this.wait(new Promise(resolve => {
          this.modal(this.dlg('MICRO INDISPONIBLE', 'mic', h('div.mmp-text', e.message), { gray: true, close: false, foot: [
            button('RÉESSAYER', { kind: 'yellow', cls: 'sm', auto: true, onok: () => { this.popModal(true); resolve('retry'); } }),
            button('PASSER', { kind: 'dark', cls: 'sm', onok: () => { this.popModal(true); resolve('skip'); } })] }), { back: () => { this.popModal(true); resolve('skip'); } });
        }));
        if (v === 'skip') throw SKIP;
      }
    }
  }
  // each player walks to the mic, the take plays, the score counts up (+ the wheel bonus), tomatoes fly
  async phasePlayback(n, entries, pcmOf) {
    const st = this.stage;
    this.labelsOn = true;
    this.dim.className = 'mmp-dim';
    st.shot('stage', { dur: 1 });
    const scoreSlot = h('div'), tomatoBtn = h('div.mmp-turnbar', button('TOMATE', { kind: 'ghostred', cls: 'sm', ic: 'tomato', onok: () => this.tomato() }));
    this.show(this.hud('PLAYBACK', n, [scoreSlot, tomatoBtn]), { hints: [['square', 'Lancer une tomate'], ['options', 'Quitter']], keys: { square: () => this.tomato() } });
    for (const e of entries) {
      const p = this.mplayers.find(x => x.id === e.id);
      if (!p) continue;
      const a = st.avatar(p.id);
      this.performer = a;
      scoreSlot.replaceChildren();
      const mic = st.micSpot;
      if (a) await this.wait(Promise.race([a.walkTo(mic.x, mic.z, 0), new Promise(r => setTimeout(r, 5000))]));
      await this.sleep(250);
      const pcm = pcmOf(e.id);
      let shown = -1;
      const showScore = v => { if (v === shown) return; shown = v; scoreSlot.replaceChildren(scoreText(v, e.silent && !e.final)); };
      if (pcm && !e.silent) {
        showScore(0);
        const pb = playBuffer(pcmBuffer(pcm));
        const off = this.onCleanup(() => pb.stop());
        const dur = pcm.length / 16000, t0 = performance.now();
        let raf = 0;
        const label = this.labels.get(p.id);
        const loop = () => {
          raf = requestAnimationFrame(loop);
          const k = Math.min(1, (performance.now() - t0) / 1000 / dur), lv = pb.level();
          if (a) { a.level = lv; a.mode = 'talk'; }
          label?.el.classList.toggle('talk', lv > .08);
          showScore(Math.round(e.score * Math.min(1, k * 1.15)));
        };
        loop();
        try { await this.wait(pb.done); } finally { cancelAnimationFrame(raf); pb.stop(); off(); if (a) { a.level = 0; a.mode = 'idle'; } label?.el.classList.remove('talk'); }
        showScore(e.score);
      } else { showScore(0); sfx('boo'); }
      if (e.bonus) {
        await this.sleep(350);
        scoreSlot.append(h('div.mmp-bonus', `Bonus : ${e.bonus}`)); sfx('coin');
        await this.sleep(500);
        for (let v = e.score; v <= e.final; v += Math.max(1, Math.round((e.final - e.score) / 8))) { showScore(Math.min(e.final, v)); scoreSlot.lastChild?.classList?.contains('mmp-bonus') || scoreSlot.append(h('div.mmp-bonus', `Bonus : ${e.bonus}`)); await this.sleep(60); }
        showScore(e.final); scoreSlot.append(h('div.mmp-bonus', `Bonus : ${e.bonus}`));
      }
      p.score += e.final;
      this.renderCards();
      if (this.cfg.mode === 'versus') this.top.el.querySelector('.mmp-teams')?.replaceWith(this.teamsEl());
      // the audience: tomatoes for the flops, cheers for the best
      if (e.final < 20) { for (let i = 0; i < 3; i++) setTimeout(() => this.tomato(true), i * 280); }
      else if (e.final >= 70) { sfx('cheer'); a?.play('victory', 1.6); }
      if (this.settings.reactions) this.reaction(e.final, e.silent);
      await this.sleep(1700);
      scoreSlot.replaceChildren();
      if (a) a.walkTo(p.slot.x, p.slot.z, 0);
      await this.sleep(500);
    }
    this.performer = null;
    await this.sleep(600);
  }
  tomato(auto = false) {
    const now = performance.now();
    if (!this.performer || (!auto && now - (this.lastTomato || 0) < 250)) return;
    this.lastTomato = now;
    this.stage.throwTomato(this.performer);
    setTimeout(() => sfx('splat'), 620);
    if (!auto) online.tomato();
  }
  reaction(score, silent) {
    const tag = score >= 85 ? 'win' : !silent && score <= 10 ? 'bad' : null;
    if (!tag) return;
    const pool = REFS.filter(r => r.tags?.includes(tag));
    const r = pool[Math.floor(Math.random() * pool.length)];
    loadRef(r.id).then(buf => { if (this.closed) return; const pb = playBuffer(buf, { gain: .8, max: 4 }); const off = this.onCleanup(() => pb.stop(), true); pb.done.then(off); }).catch(() => {});
  }
  async phaseWheel(n, spins, last) {
    this.labelsOn = false;
    this.dim.className = 'mmp-dim on';
    for (const p of this.mplayers) {
      const i = spins[p.id];
      if (i == null) continue;
      const w = wheel();
      const res = h('div');
      const view = this.hud('WHEEL', n, [w.el, res, this.caption('La roue tourne...')]);
      this.show(view, { hints: [['options', 'Quitter']] });
      this.renderCards(p.id);
      await this.sleep(500);
      const ticks = setInterval(() => sfx('slot'), 120);
      this.onCleanup(() => clearInterval(ticks), true);
      await this.wait(w.spin(i, 3800));
      clearInterval(ticks);
      const seg = WHEEL[i];
      res.replaceChildren(h('div.mmp-wheel-res', bubbly(seg.add ? `+${seg.add}` : seg.mul === 1 ? 'x1' : `x${String(seg.mul).replace('.', ',')}`)));
      view.querySelector('.mmp-caption').textContent = last ? `${p.name} : bonus appliqué maintenant !` : `${p.name} : bonus pour la prochaine manche`;
      sfx(seg.add || seg.mul > 1 ? 'ding' : 'coin');
      await this.sleep(1600);
    }
    this.renderCards();
  }
  async phaseResults() {
    const st = this.stage;
    this.labelsOn = true;
    this.dim.className = 'mmp-dim';
    const sorted = [...this.mplayers].sort((a, b) => b.score - a.score);
    let title, winners;
    if (this.cfg.mode === 'versus') {
      const t = { red: 0, blue: 0 }; this.mplayers.forEach(p => { t[p.team] += p.score; });
      const win = t.red === t.blue ? null : t.red > t.blue ? 'red' : 'blue';
      winners = win ? this.mplayers.filter(p => p.team === win) : this.mplayers;
      title = win ? `L'équipe ${win === 'red' ? 'ROUGE' : 'BLEUE'} gagne !` : 'Égalité parfaite !';
    } else {
      winners = sorted.filter(p => p.score === sorted[0].score);
      title = this.mplayers.length === 1 ? `${sorted[0].score} points !` : `${winners.map(p => p.name).join(' et ')} ${winners.length > 1 ? 'gagnent' : 'gagne'} !`;
    }
    const champ = winners[0];
    const mic = st.micSpot;
    const a = st.avatar(champ.id);
    if (a) await this.wait(Promise.race([a.walkTo(mic.x, mic.z, 0), new Promise(r => setTimeout(r, 5000))]));
    a?.play('victory', 99);
    this.mplayers.forEach(p => { if (!winners.includes(p)) st.avatar(p.id)?.play('clap', 99); else if (p !== champ) st.avatar(p.id)?.play('hop', 99); });
    sfx('fanfare');
    this.confetti(5000);
    // progression, stats and trophies (for this console's main player)
    const me = this.mplayers.find(p => p.me);
    const won = me && winners.includes(me) && this.mplayers.length > 1;
    const before = this.level;
    const gain = 30 + Math.round((me?.score || 0) / 10) + (won ? 50 : 0);
    this.profile.xp += gain; this.profile.stats.games++; if (won) this.profile.stats.wins++;
    this.save();
    if (this.mplayers.length >= 3) this.trophy(3);
    if (won) this.trophy(4);
    const best = this.stats.best;
    const el = h('div.mmp-results', this.hud('RESULTS', this.cfg.plan.length - 1), h('div.ttl', bubbly(title)),
      best ? h('div.best', `Meilleure imitation : ${best.name} sur « ${refById(best.ref)?.title} » (${best.score}/100) · +${gain} XP`) : h('div.best', `+${gain} XP`),
      h('div.acts', button('REJOUER', { kind: 'yellow', auto: true, onok: () => this.again() }),
        best ? button('MEILLEURE IMITATION', { kind: 'purple', cls: 'sm', onok: () => this.playOnce(pcmBuffer(best.pcm)) }) : null,
        button('LOBBY', { kind: 'blue', cls: 'sm', onok: () => this.toLobby() }), button('MENU', { kind: 'dark', cls: 'sm', onok: () => this.home() })));
    el.querySelector('.mmp-roundbox span').textContent = 'RESULTS';
    this.show(el, { hints: [['ok', 'Sélectionner'], ['back', 'Menu']], back: () => this.home() });
    this.renderCards();
    this.inMatch = false;
    if (this.level > before) toast({ title: `Niveau ${this.level} !`, sub: 'De nouvelles animations et auras sont peut-être débloquées', icon: 'sparkle', sound: 'trophy' });
  }
  again() { if (this.online) online.again(this); else this.playLocal({ ...this.cfg, plan: this.makePlan(this.cfg.rules) }); }
  toLobby() { if (this.online) online.toLobby(this); else this.lobby({ mode: this.cfg.mode }); }
  quitDialog() {
    if (this.stack.length > 1) return;
    const local = !this.online;
    if (local) this.suspend();
    const resume = () => { if (local) this.resume(); };
    const ctx = this.modal(this.dlg('PAUSE', null, h('div.mmp-text', local && this.inTurn ? 'La prise en cours reprendra depuis le début.' : this.online ? 'La partie continue pour les autres joueurs.' : 'La partie est en pause.'), { gray: true, close: false, foot: [
      button('REPRENDRE', { kind: 'yellow', cls: 'sm', auto: true, onok: () => { this.popModal(); resume(); } }),
      button('QUITTER LA PARTIE', { kind: 'blue', cls: 'sm', onok: () => { this.popModal(true); this.paused = false; this.stage.start(); if (this.online) online.leave(this); this.home(); } }),
      button('QUITTER MIMIC PARTY', { kind: 'dark', cls: 'sm', onok: () => { this.popModal(true); endSession(); } })] }), { back: () => { this.popModal(); resume(); } });
    void ctx;
  }
  trophy(i) {
    try {
      const got = state.trophies[ID] || [];
      if (!got.includes(i)) unlockTrophy(ID, i);
      const now = state.trophies[ID] || [];
      if ([0, 1, 2, 3, 4].every(k => now.includes(k)) && !now.includes(5)) unlockTrophy(ID, 5);
    } catch { /* trophies are a bonus */ }
  }
  confetti(ms = 3000) {
    if (state.settings.reduceMotion) return;
    const cv = h('canvas.mmp-confetti'), dpr = Math.min(2, devicePixelRatio || 1);
    Object.assign(cv.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '3' });
    this.root.append(cv);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    const c = cv.getContext('2d'), t0 = performance.now();
    const ps = Array.from({ length: 180 }, () => ({ x: Math.random() * cv.width, y: -Math.random() * cv.height * .7, vx: (Math.random() - .5) * 3 * dpr, vy: (2 + Math.random() * 4) * dpr, r: Math.random() * 6, vr: (Math.random() - .5) * .3, s: (7 + Math.random() * 9) * dpr, col: COLORS[Math.floor(Math.random() * COLORS.length)] }));
    const f = now => {
      const k = (now - t0) / ms;
      if (k > 1.3 || !cv.isConnected) { cv.remove(); return; }
      c.clearRect(0, 0, cv.width, cv.height); c.globalAlpha = Math.max(0, Math.min(1, (1.3 - k) / .3));
      for (const p of ps) { p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += .03 * dpr; c.save(); c.translate(p.x, p.y); c.rotate(p.r); c.fillStyle = p.col; c.beginPath(); c.roundRect?.(-p.s / 2, -p.s * .9, p.s, p.s * 1.8, p.s / 2); c.fill(); c.restore(); }
      requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
    this.onCleanup(() => cv.remove(), true);
  }

  // ---------------------------------------------------------------- name labels above the characters
  addLabel(p) {
    const el = h('div.mmp-label', icon('speaker', 'sp'), h('span', p.name.toUpperCase()), p.me ? h('span.me', '▼') : null);
    this.labelsEl.append(el);
    this.labels.set(p.id, { el, p });
  }
  clearLabels() { this.labels.forEach(l => l.el.remove()); this.labels.clear(); this.labelsOn = false; }
  updateLabels() {
    const on = this.labelsOn && !this.paused;
    this.labelsEl.style.opacity = on ? '1' : '0';
    if (!on) return;
    for (const { el, p } of this.labels.values()) {
      const a = this.stage.avatar(p.id);
      if (!a) continue;
      const s = this.stage.project(a.headWorld());
      el.style.left = (s.x * 100).toFixed(2) + '%'; el.style.top = (s.y * 100 - 1).toFixed(2) + '%';
      el.style.visibility = s.front ? 'visible' : 'hidden';
    }
  }
}
