// The UNO table: the deck and the discard pile in the middle of the tilted table, the direction ring, every player's
// hand and name plate, and the animations of the console version (deal, cards flying and flipping, big symbols,
// UNO bursts, colour beams). It only draws what the host sends: `update(view, events)`.
import { h, img } from '../ui.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { cardEl, setFace, bigSymbol, HEX, cardLabel } from './cards.js';
import { sfx } from './sound.js';
import { COLORS, COLOR_NAMES } from './rules.js';

const ORDER = { r: 0, y: 1, g: 2, b: 3, w: 4 };
const VORDER = '0123456789SRDWF';
export const sortHand = cards => cards.slice().sort((a, b) => ORDER[a.c] - ORDER[b.c] || VORDER.indexOf(a.v) - VORDER.indexOf(b.v) || a.i - b.i);
const POS = { 2: ['me', 'top'], 3: ['me', 'left', 'right'], 4: ['me', 'left', 'top', 'right'] };
const pileRot = id => ((id * 47) % 37) - 18;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const TILT = 42, PERSP = 1100;
const CW = 16.5, CH = CW * 1.55, OPP = 8.8, PILE = 14, DECK = 12;   // card widths (rem): hand, opponents, pile, deck

export class Table {
  // avatarOf(seat) → image url; submit(action) → sends to the host; menu() → pause menu
  constructor({ avatarOf, submit, menu, reduceMotion = false }) {
    this.avatarOf = avatarOf; this.submitFn = submit; this.menuFn = menu; this.reduce = reduceMotion;
    this.queue = []; this.running = false; this.v = null; this.closed = false; this.waiting = false; this.picker = null;
    this.fx = h('div.ut-fx');
    this.ring = h('div.ut-ring', { html: '<svg viewBox="0 0 600 600" aria-hidden="true"><defs><linearGradient id="ua0" gradientUnits="userSpaceOnUse" x1="191" y1="505" x2="145" y2="128"><stop offset="0" stop-color="#fff3c8" stop-opacity="0"/><stop offset=".55" stop-color="#fff3c8" stop-opacity=".55"/><stop offset="1" stop-color="#fffbe8" stop-opacity=".85"/></linearGradient><linearGradient id="ua1" gradientUnits="userSpaceOnUse" x1="409" y1="95" x2="455" y2="472"><stop offset="0" stop-color="#fff3c8" stop-opacity="0"/><stop offset=".55" stop-color="#fff3c8" stop-opacity=".55"/><stop offset="1" stop-color="#fffbe8" stop-opacity=".85"/></linearGradient></defs><g class="arcs"><path class="arc" d="M191.1 504.8 A232 232 0 0 1 144.8 127.6" stroke="url(#ua0)"/><path class="head" d="M190.8 86.1 L109.5 97.4 L171.1 165.8 Z"/><path class="arc" d="M408.9 95.2 A232 232 0 0 1 455.2 472.4" stroke="url(#ua1)"/><path class="head" d="M409.2 513.9 L490.5 502.6 L428.9 434.2 Z"/></g></svg>' });
    this.pile = h('div.ut-pile');
    this.stackBadge = h('div.ut-stack.hidden');
    this.deck = h('div.ut-deck', { f: true, 'aria-label': 'Pioche', onok: () => this.draw() }, h('div.ut-deck-stack', cardEl(null)), h('span.ut-deck-n'));
    this.seatsEl = h('div.ut-seats');
    this.hand = h('div.ut-hand', { 'data-row': '' });
    this.unoBtn = h('button.ut-uno', { type: 'button', f: true, 'aria-label': 'Annoncer UNO', onok: () => this.callUno() }, h('span', 'UNO'));
    this.catchBtn = h('button.ut-catch.hidden', { type: 'button', f: true, onok: () => this.catchUno() }, 'Contre-UNO !');
    this.keepBtn = h('button.ut-btn.ut-keep.hidden', { type: 'button', f: true, onok: () => this.send({ t: 'keep' }) }, 'Garder la carte');
    this.prompt = h('div.ut-prompt.hidden');
    this.timerBar = h('div.ut-timer.hidden', h('i'));
    this.menuBtn = h('button.ut-menu', { type: 'button', f: true, 'aria-label': 'Menu', onok: () => this.menuFn?.(), html: '<svg viewBox="0 0 64 64"><path d="M27 4h10l1.6 7.2a22 22 0 0 1 5.6 2.3l6.2-4 7.1 7.1-4 6.2a22 22 0 0 1 2.3 5.6L63 30v10l-7.2 1.6a22 22 0 0 1-2.3 5.6l4 6.2-7.1 7.1-6.2-4a22 22 0 0 1-5.6 2.3L37 66H27l-1.6-7.2a22 22 0 0 1-5.6-2.3l-6.2 4-7.1-7.1 4-6.2a22 22 0 0 1-2.3-5.6L1 40V30l7.2-1.6a22 22 0 0 1 2.3-5.6l-4-6.2 7.1-7.1 6.2 4a22 22 0 0 1 5.6-2.3z" transform="translate(0 -3) scale(1 .985)"/><circle cx="32" cy="32" r="10"/></svg>' });
    this.glow = h('div.ut-glow');
    this.root = h('div.uno-table',
      this.glow, h('div.ut-floor'), this.ring, this.pile, this.stackBadge, this.deck, this.seatsEl,
      h('div.ut-me', this.hand), this.timerBar, this.keepBtn, this.unoBtn, this.catchBtn, this.prompt, this.menuBtn, this.fx);
    this.tags = [];
    this.fans = [];
    this.tick = setInterval(() => this.timerFrame(), 200);
  }
  destroy() { this.closed = true; clearInterval(this.tick); this.closePicker(); this.queue = []; }

  // ------------------------------------------------------------ incoming updates
  update(view, ev) {
    if (this.closed) return;
    this.queue.push([view, ev || []]);
    if (!this.running) this.run();
  }
  async run() {
    this.running = true;
    this.root.dataset.busy = '1';
    try {
      while (this.queue.length && !this.closed) {
        const [view, ev] = this.queue.shift();
        const fast = this.reduce || this.queue.length > 1 || document.hidden;
        if (!this.v || this.v.seats.length !== view.seats.length || view.round !== this.v.round && !ev.some(e => e.e === 'round')) this.build(view);
        for (const e of ev) {
          if (this.closed) return;
          try { await this.animate(e, view, fast || this.queue.length > 2); } catch (err) { console.error(err); }
        }
        this.render(view);
      }
    } finally { this.running = false; delete this.root.dataset.busy; }
  }

  // ------------------------------------------------------------ layout
  build(view) {
    this.v = null;
    const n = view.seats.length, me = view.me;
    this.rel = i => (i - me + n) % n;
    this.pos = i => POS[n][this.rel(i)];
    this.seatsEl.replaceChildren();
    this.tags = []; this.fans = [];
    view.seats.forEach((s, i) => {
      const p = this.pos(i);
      const ring = h('div.ut-tring');
      const tag = h(`div.ut-tag.p-${p}`, { 'data-seat': i },
        h('div.nm', h('span', s.name)), h('div.av', ring, img(this.avatarOf(s))), h('div.cnt', h('i'), h('b', '0')), h('div.ubadge', 'UNO'));
      tag.ring = ring;
      this.tags[i] = tag;
      this.seatsEl.append(tag);
      if (p !== 'me') { const fan = h(`div.ut-fan.p-${p}`, { 'data-seat': i }); this.fans[i] = fan; this.seatsEl.append(fan); }
    });
    this.hand.replaceChildren();
    this.pile.replaceChildren();
  }
  render(view) {
    const prev = this.v;
    this.v = view;
    this.root.dataset.seq = view.seq;
    this.waiting = false;
    const n = view.seats.length, me = view.me, mine = view.actor === me && view.phase === 'play';
    const o = view.opts || {};
    this.root.dataset.color = view.color || 'none';
    this.root.classList.toggle('ccw', view.dir < 0);
    this.root.classList.toggle('mine', mine);
    // name plates
    view.seats.forEach((s, i) => {
      const t = this.tags[i]; if (!t) return;
      const p = view.players[i];
      t.classList.toggle('active', view.actor === i && view.phase === 'play');
      t.classList.toggle('off', s.online === false);
      t.classList.toggle('said', p.uno && p.n === 1);
      t.querySelector('.cnt b').textContent = p.n;
      t.querySelector('.nm span').textContent = s.name + (s.online === false ? ' (déconnecté)' : '');
      if (i !== me) this.renderFan(i, p.n);
    });
    this.renderHand(view.hand, view);
    this.renderPile(view.pile);
    this.deck.querySelector('.ut-deck-n').textContent = view.drawN;
    this.deck.classList.toggle('can', !!o.draw);
    this.deck.classList.toggle('hint', !!o.draw && !(o.play || []).length);
    this.stackBadge.classList.toggle('hidden', !view.stack);
    this.stackBadge.textContent = `+${view.stack}`;
    this.unoBtn.classList.toggle('on', !!o.uno);
    this.unoBtn.classList.toggle('hidden', !o.uno);
    this.catchBtn.classList.toggle('hidden', o.catch == null);
    if (o.catch != null) this.catchBtn.dataset.pos = this.pos(o.catch);
    this.keepBtn.classList.toggle('hidden', !o.keep);
    // prompts: start colour, +4 challenge, drawn card
    let msg = null;
    if (o.color) { msg = 'Choisis la couleur de départ'; if (!this.picker) this.colorPicker().then(c => c && this.send({ t: 'color', color: c })); }
    else if (o.challenge) msg = this.challengePrompt(view);
    else if (view.pending?.t === 'drawn' && view.pending.p === me) msg = o.keep ? 'Joue la carte piochée ou garde-la' : 'Forcer le jeu : la carte piochée doit être jouée';
    else if (view.stack && mine) msg = `Pose un ${view.pile[view.pile.length - 1]?.v === 'F' ? '+4' : '+2 ou +4'} ou pioche ${view.stack} cartes`;
    else if (mine && view.phase === 'play') msg = (o.play || []).length ? 'À toi de jouer !' : 'Aucune carte jouable : pioche';
    if (!o.color && this.picker?.kind === 'color-start') this.closePicker();
    if (!o.challenge) this.root.querySelector('.ut-chal')?.remove();
    this.setPrompt(msg);
    if (mine && prev?.actor !== me) { sfx('turn'); input.rumble(.3, .2, 90); }
    this.deadline = view.deadline ? performance.now() + view.deadline : 0;
    this.deadlineTotal = 20000;
    this.timerFrame();
    this.refocus(view);
    this.after?.(view);
  }
  setPrompt(msg) {
    this.prompt.classList.toggle('hidden', !msg);
    if (msg && this.prompt.textContent !== msg) { this.prompt.textContent = msg; this.prompt.classList.remove('pop'); void this.prompt.offsetWidth; this.prompt.classList.add('pop'); }
  }
  renderFan(i, n) {
    const fan = this.fans[i]; if (!fan) return;
    const shown = Math.min(n, 16);
    while (fan.children.length < shown) fan.append(cardEl(null, { cls: 'fc' }));
    while (fan.children.length > shown) fan.lastChild.remove();
    const p = this.pos(i), last = Math.max(1, shown - 1);
    [...fan.children].forEach((c, k) => {
      let x, y, sc = 1, z = k;
      if (p === 'top') { const step = Math.min(4.7, 36 / last); x = (k - last / 2) * step; y = 0; }
      else {
        // nearest card first (bottom outside), each next one further back and higher, towards the centre
        const f = Math.min(1, 7 / last), dir = p === 'left' ? 1 : -1;
        x = dir * k * 4.3 * f; y = -k * 3.1 * f; sc = 1.22 - k * .055 * f; z = shown - k;
      }
      c.style.setProperty('--tx', `calc(${x.toFixed(2)} * var(--u))`); c.style.setProperty('--ty', `calc(${y.toFixed(2)} * var(--u))`); c.style.setProperty('--s', sc.toFixed(3));
      c.style.zIndex = z;
    });
    fan.dataset.n = n;
  }
  handLayout(count) {
    const rem = this.rem();
    const cw = CW * rem, maxW = Math.min(this.root.clientWidth * .64, 124 * rem);
    const step = count > 1 ? Math.max(1.2 * rem, Math.min(9.4 * rem, (maxW - cw) / (count - 1))) : 0;
    return k => {
      const off = (k - (count - 1) / 2);
      return { x: off * step, y: 0, r: 0 };
    };
  }
  renderHand(cards, view) {
    const sorted = sortHand(cards);
    const o = view.opts || {}, mine = view.actor === view.me && view.phase === 'play';
    const playable = new Set([...(o.play || []), ...(o.jump || [])]);
    const drawn = view.pending?.t === 'drawn' && view.pending.p === view.me ? view.pending.card : null;
    const have = new Map([...this.hand.children].map(e => [+e.dataset.id, e]));
    const keep = new Set(sorted.map(c => c.i));
    have.forEach((e, id) => { if (!keep.has(id)) { if (this.v?.seq && e.classList.contains('focused')) this.lastFocusIdx = [...this.hand.children].indexOf(e); e.remove(); } });
    const L = this.handLayout(sorted.length);
    sorted.forEach((c, k) => {
      let e = have.get(c.i);
      if (!e) {
        e = cardEl(c, { cls: 'hc' });
        e.dataset.f = '';
        e.setAttribute('data-tap2', '');
        e.addEventListener('ok', () => this.playCard(+e.dataset.id));
      }
      if (this.hand.children[k] !== e) this.hand.insertBefore(e, this.hand.children[k] || null);
      const p = L(k);
      e.style.setProperty('--x', p.x.toFixed(1) + 'px');
      e.style.setProperty('--y', p.y.toFixed(1) + 'px');
      e.style.setProperty('--r', p.r.toFixed(2) + 'deg');
      e.style.zIndex = k + 1;
      e.classList.toggle('ok', playable.has(c.i));
      e.classList.toggle('jump', (o.jump || []).includes(c.i));
      e.classList.toggle('dim', (mine || !!drawn) && !playable.has(c.i));
      e.classList.toggle('drawn', drawn === c.i);
    });
  }
  renderPile(pile) {
    const have = new Map([...this.pile.children].map(e => [+e.dataset.id, e]));
    const ids = new Set(pile.map(c => c.i));
    have.forEach((e, id) => { if (!ids.has(id)) e.remove(); });
    pile.forEach((c, k) => {
      let e = have.get(c.i);
      if (!e) { e = cardEl(c, { cls: 'pc' }); e.style.setProperty('--r', pileRot(c.i) + 'deg'); }
      if (this.pile.children[k] !== e) this.pile.insertBefore(e, this.pile.children[k] || null);
    });
  }
  refocus(view) {
    if (nav.top !== this.layer || this.picker || this.blocked?.()) return;
    const f = this.layer.focused;
    if (f?.isConnected && this.root.contains(f) && !f.classList.contains('hidden')) return;
    const kids = [...this.hand.children];
    const ok = kids.find(e => e.classList.contains('drawn')) || kids.find(e => e.classList.contains('ok'));
    const target = ok || kids[Math.min(this.lastFocusIdx ?? 0, kids.length - 1)] || (view.opts?.draw ? this.deck : this.menuBtn);
    if (target) nav.focus(target, { silent: true, instant: true });
  }

  // ------------------------------------------------------------ positions (px, relative to the table)
  box() { return this.root.getBoundingClientRect(); }
  center(el) { const b = this.box(), r = el.getBoundingClientRect(); return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top }; }
  // the design unit of uno.css (--u): 1/108 of the height on a 16:9 screen
  rem() { return Math.min(innerWidth * .0052083, innerHeight * .0092593); }
  at(kind, arg) {
    if (kind === 'deck') { const c = this.center(this.deck); return { ...c, s: DECK / CW, r: 28, tilt: true }; }
    if (kind === 'pile') { const c = this.center(this.pile); return { ...c, s: PILE / CW, r: pileRot(arg), tilt: true }; }
    if (kind === 'seat') { const f = this.fans[arg]; const c = f ? this.center(f) : this.center(this.tags[arg]); return { ...c, s: OPP / CW, r: 0 }; }
    if (kind === 'hand') {
      const c = this.center(this.hand);
      const e = this.hand.querySelector(`[data-id="${arg}"]`);
      if (e) { const b = this.box(), r = e.getBoundingClientRect(); return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top, s: 1, r: 0 }; }
      return { ...c, s: 1, r: 0 };
    }
    return { x: this.root.clientWidth / 2, y: this.root.clientHeight / 2, s: 1, r: 0 };
  }
  T(p, face) {
    const rem = this.rem(), w = CW * rem, hh = CH * rem;
    return `translate(${(p.x - w / 2).toFixed(1)}px, ${(p.y - hh / 2).toFixed(1)}px) perspective(${PERSP}px) rotateX(${p.tilt ? TILT : 0}deg) rotate(${p.r}deg) scale(${p.s}) rotateY(${face ? 0 : 180}deg)`;
  }
  async fly(card, from, to, { dur = 520, faceFrom = false, faceTo = true, lift = 0 } = {}) {
    const el = cardEl(card, { flip: true, cls: 'ut-flyer' });
    this.fx.append(el);
    const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - lift, s: Math.max(from.s, to.s) * 1.05, r: (from.r + to.r) / 2, tilt: false };
    const a = el.animate([{ transform: this.T(from, faceFrom) }, { transform: this.T(mid, faceFrom), offset: .45 }, { transform: this.T(to, faceTo) }],
      { duration: dur, easing: 'cubic-bezier(.25,.7,.3,1)', fill: 'forwards' });
    await a.finished.catch(() => {});
    return el;
  }

  // ------------------------------------------------------------ event animations
  async animate(e, view, fast) {
    const me = view.me;
    switch (e.e) {
      case 'round':
        this.hand.replaceChildren(); this.pile.replaceChildren();
        this.fans.forEach((f, i) => f && this.renderFan(i, 0));
        this.tags.forEach(t => t?.classList.remove('active', 'said', 'win'));
        return;
      case 'deal': {
        if (fast) return;
        sfx('shuffle');
        await sleep(450);
        const counts = this.tags.map(() => 0);
        const mineSoFar = [];
        const jobs = e.cards.map(([pi, c], k) => (async () => {
          await sleep(k * 55);
          if (this.closed) return;
          sfx('deal');
          const to = pi === me ? { ...this.at('hand'), s: 1 } : this.at('seat', pi);
          const fl = await this.fly(pi === me ? c : null, this.at('deck'), to, { dur: 380, faceFrom: false, faceTo: pi === me });
          fl.remove();
          counts[pi]++;
          if (pi === me && c) { mineSoFar.push(c); this.renderHand(mineSoFar, { ...view, opts: {}, actor: -1, pending: null }); }
          else this.renderFan(pi, counts[pi]);
          this.tags[pi].querySelector('.cnt b').textContent = counts[pi];
        })());
        await Promise.all(jobs);
        return;
      }
      case 'flip': {
        const fl = await this.fly(e.card, this.at('deck'), this.at('pile', e.card.i), { dur: fast ? 1 : 600, faceFrom: false, faceTo: true, lift: 80 });
        this.renderPile([...this.pileCards(), e.card]); fl.remove();
        if (!fast) { sfx('place'); this.burst(e.card); this.beam(e.card.c === 'w' ? null : e.card.c); await sleep(300); }
        return;
      }
      case 'jump':
        this.banner(this.tags[e.p], 'À la volée !', 'jumpin');
        if (!fast) await sleep(250);
        return;
      case 'play': {
        const c = e.card;
        let from;
        const handEl = e.p === me ? this.hand.querySelector(`[data-id="${c.i}"]`) : null;
        if (handEl) { from = this.at('hand', c.i); handEl.remove(); this.renderHand(this.domHand(), { ...view, opts: {}, pending: null }); }
        else { from = this.at('seat', e.p); if (e.p !== me) this.renderFan(e.p, Math.max(0, (this.fans[e.p]?.children.length || 1) - 1)); }
        sfx('swish');
        const fl = await this.fly(c, from, this.at('pile', c.i), { dur: fast ? 1 : 480, faceFrom: e.p === me, faceTo: true, lift: 40 });
        this.renderPile([...this.pileCards(), c].slice(-7)); fl.remove();
        this.root.dataset.color = e.color;
        const cnt = this.tags[e.p]?.querySelector('.cnt b'); if (cnt) cnt.textContent = Math.max(0, +cnt.textContent - 1);
        sfx('place');
        input.rumble(.2, .1, 50);
        if (fast) return;
        this.burst(c);
        if (c.c === 'w') { sfx(c.v === 'F' ? 'plus' : 'wild'); this.beam(e.color, true); await sleep(650); }
        else if (c.v === 'D') { sfx('plus'); await sleep(420); }
        else await sleep(200);
        return;
      }
      case 'draw': {
        const n = e.cards ? e.cards.length : e.n;
        const to = e.p === me ? null : this.at('seat', e.p);
        for (let k = 0; k < n; k++) {
          if (this.closed) return;
          sfx('draw');
          const c = e.cards?.[k] || null;
          if (e.p === me && c) {
            const list = [...this.domHand(), c];
            this.renderHand(list, { ...view, opts: {}, pending: null });
            const target = this.hand.querySelector(`[data-id="${c.i}"]`);
            target?.classList.add('incoming');
            const fl = await this.fly(c, this.at('deck'), this.at('hand', c.i), { dur: fast ? 1 : 420, faceFrom: false, faceTo: true });
            target?.classList.remove('incoming'); target?.classList.add('fresh'); setTimeout(() => target?.classList.remove('fresh'), 900);
            fl.remove();
          } else {
            const fl = await this.fly(null, this.at('deck'), to || this.at('seat', e.p), { dur: fast ? 1 : 360, faceFrom: false, faceTo: false });
            fl.remove();
            this.renderFan(e.p, (this.fans[e.p]?.children.length || 0) + 1);
          }
          const cnt = this.tags[e.p]?.querySelector('.cnt b'); if (cnt) cnt.textContent = +cnt.textContent + 1;
          if (!fast) await sleep(n > 4 ? 40 : 90);
        }
        return;
      }
      case 'skip':
        if (fast) return;
        sfx('skip');
        this.stamp(this.tags[e.p], 'S');
        await sleep(600);
        return;
      case 'reverse':
        this.root.classList.toggle('ccw', e.dir < 0);
        if (fast) return;
        sfx('reverse');
        this.ring.classList.remove('spin'); void this.ring.offsetWidth; this.ring.classList.add('spin');
        await sleep(650);
        return;
      case 'stack':
        this.stackBadge.textContent = `+${e.n}`; this.stackBadge.classList.remove('hidden', 'pop'); void this.stackBadge.offsetWidth; this.stackBadge.classList.add('pop');
        return;
      case 'color':
        this.root.dataset.color = e.color;
        if (!fast) { sfx('color'); this.beam(e.color, true); await sleep(450); }
        return;
      case 'uno':
        this.unoBurst(this.tags[e.p], 'UNO !');
        this.tags[e.p]?.classList.add('said');
        if (!fast) { sfx('uno'); input.rumble(.5, .4, 160); await sleep(800); }
        return;
      case 'caught':
        this.unoBurst(this.tags[e.p], 'Contre-UNO !', 'caught');
        if (!fast) { sfx('catch'); await sleep(800); }
        return;
      case 'keep': return;
      case 'shuffle':
        if (fast) return;
        sfx('shuffle');
        this.deck.classList.remove('shuf'); void this.deck.offsetWidth; this.deck.classList.add('shuf');
        this.renderPile(this.pileCards().slice(-1));
        await sleep(600);
        return;
      case 'swap':
      case 'rotate': {
        if (fast) return;
        sfx('reverse');
        const who = e.e === 'swap' ? [e.a, e.b] : this.tags.map((_, i) => i);
        who.forEach(i => { const t = this.tags[i]; t?.classList.remove('swap'); void t?.offsetWidth; t?.classList.add('swap'); this.fans[i]?.classList.add('swap'); });
        this.banner(null, e.e === 'swap' ? `${this.name(e.a)} échange sa main avec ${this.name(e.b)}` : 'Les mains tournent !', 'swapb');
        this.hand.classList.add('swap');
        await sleep(1000);
        this.hand.classList.remove('swap');
        this.fans.forEach(f => f?.classList.remove('swap'));
        return;
      }
      case 'challenge': {
        this.banner(this.tags[e.p], 'Défi !', 'chal');
        sfx('skip');
        if (!fast) await sleep(700);
        const verdict = e.guilty ? `Bluff ! ${this.name(e.by)} pioche 4 cartes` : `+4 légal : ${this.name(e.p)} pioche 6 cartes`;
        this.banner(null, verdict, e.guilty ? 'win' : 'lose');
        if (e.hand && e.p === me) this.reveal(e.hand, `Main de ${this.name(e.by)}`);
        if (!fast) await sleep(1100);
        return;
      }
      case 'out':
        this.tags[e.p]?.classList.add('win');
        this.unoBurst(this.tags[e.p], e.p === me ? 'Gagné !' : `${this.name(e.p)} gagne !`, 'out');
        if (!fast) { sfx(e.p === me ? 'win' : 'lose'); await sleep(1300); }
        return;
      case 'turn':
        return;
      default:
    }
  }
  name(i) { return this.v?.seats[i]?.name || 'Joueur'; }
  domHand() { return [...this.hand.children].map(e => ({ i: +e.dataset.id, c: e.dataset.code[0], v: e.dataset.code.slice(1) })); }
  pileCards() { return [...this.pile.children].map(e => ({ i: +e.dataset.id, c: e.dataset.code[0], v: e.dataset.code.slice(1) })); }

  // ------------------------------------------------------------ effects
  burst(card) {
    const el = bigSymbol(card);
    const c = this.center(this.pile);
    el.style.left = c.x + 'px'; el.style.top = c.y + 'px';
    this.fx.append(el);
    setTimeout(() => el.remove(), 1300);
  }
  beam(color, strong) {
    const el = h(`div.ut-beam${strong ? '.strong' : ''}`, { 'data-c': color || 'w' });
    const c = this.center(this.pile);
    el.style.left = c.x + 'px'; el.style.top = c.y + 'px';
    if (!color) { el.append(...COLORS.map(k => h('i', { 'data-c': k }))); }
    this.fx.append(el);
    setTimeout(() => el.remove(), 1400);
  }
  stamp(tag, v) {
    if (!tag) return;
    const el = h('div.ut-stamp', { html: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" fill="none" stroke="#fff" stroke-width="12"/><path d="M26 74 74 26" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>' });
    const c = this.center(tag);
    el.style.left = c.x + 'px'; el.style.top = c.y + 'px';
    this.fx.append(el);
    setTimeout(() => el.remove(), 1100);
  }
  unoBurst(tag, text, cls = '') {
    const el = h(`div.ut-unoburst${cls ? '.' + cls : ''}`, h('div.ov'), h('b', text));
    const c = tag ? this.center(tag) : { x: this.root.clientWidth / 2, y: this.root.clientHeight / 2 };
    const b = this.root.clientWidth;
    el.style.left = Math.min(b - 160, Math.max(160, c.x)) + 'px'; el.style.top = Math.max(110, Math.min(this.root.clientHeight - 140, c.y)) + 'px';
    this.fx.append(el);
    setTimeout(() => el.remove(), 1500);
  }
  banner(tag, text, cls = '') {
    const el = h(`div.ut-banner${cls ? '.' + cls : ''}`, text);
    if (tag) { const c = this.center(tag); el.style.left = c.x + 'px'; el.style.top = (c.y - 70) + 'px'; el.classList.add('at'); }
    this.fx.append(el);
    setTimeout(() => el.remove(), 1900);
  }
  reveal(cards, title) {
    const el = h('div.ut-reveal', h('b', title), h('div', sortHand(cards).map(c => cardEl(c, { cls: 'rc' }))));
    this.fx.append(el);
    setTimeout(() => el.remove(), 3200);
  }
  timerFrame() {
    const v = this.v;
    const left = this.deadline ? Math.max(0, this.deadline - performance.now()) : 0;
    const frac = Math.min(1, left / this.deadlineTotal);
    this.tags.forEach((t, i) => {
      if (!t) return;
      const on = !!(v && left > 0 && v.actor === i && v.phase === 'play');
      t.ring.classList.toggle('on', on);
      if (on) { t.ring.style.setProperty('--p', frac.toFixed(3)); t.ring.classList.toggle('low', left < 5000); }
    });
    const mine = !!(v && left > 0 && v.actor === v.me && v.phase === 'play');
    this.timerBar.classList.toggle('hidden', !mine);
    if (mine) {
      this.timerBar.firstChild.style.transform = `scaleX(${frac.toFixed(3)})`;
      this.timerBar.classList.toggle('low', left < 5000);
      const s = Math.ceil(left / 1000);
      if (left < 5000 && s !== this.lastTick) { this.lastTick = s; sfx('tick'); }
    }
  }

  // ------------------------------------------------------------ player actions
  send(a) {
    if (this.waiting && a.t !== 'uno' && a.t !== 'catch') return;
    if (a.t !== 'uno' && a.t !== 'catch') this.waiting = true;
    clearTimeout(this.waitT);
    this.waitT = setTimeout(() => { this.waiting = false; }, 2500);
    this.submitFn(a);
  }
  async playCard(id) {
    const v = this.v; if (!v || this.picker) return;
    const o = v.opts || {};
    const card = v.hand.find(c => c.i === id);
    const el = this.hand.querySelector(`[data-id="${id}"]`);
    if (!card) return;
    if (!(o.play || []).includes(id) && !(o.jump || []).includes(id)) {
      sfx('error');
      el?.classList.remove('nope'); void el?.offsetWidth; el?.classList.add('nope');
      if (v.actor !== v.me) this.setPrompt('Ce n’est pas ton tour');
      else if (v.pending?.t === 'drawn') this.setPrompt('Tu ne peux jouer que la carte piochée');
      return;
    }
    const a = { t: 'play', card: id };
    if (card.c === 'w') {
      const c = await this.colorPicker(el, 'color-play');
      if (!c) return;
      a.color = c;
    }
    if (v.rules.sevenO && card.v === '7' && v.hand.length > 1) {
      const t = await this.seatPicker();
      if (t == null) return;
      a.target = t;
    }
    el?.classList.add('going');
    this.send(a);
  }
  draw() {
    const v = this.v; if (!v) return;
    if (!v.opts?.draw) { sfx('error'); this.deck.classList.remove('nope'); void this.deck.offsetWidth; this.deck.classList.add('nope'); return; }
    this.send({ t: 'draw' });
  }
  callUno() {
    const v = this.v; if (!v) return;
    if (!v.opts?.uno) { sfx('error'); this.unoBtn.classList.remove('nope'); void this.unoBtn.offsetWidth; this.unoBtn.classList.add('nope'); return; }
    this.send({ t: 'uno' });
  }
  catchUno() { const v = this.v; if (v?.opts?.catch != null) this.send({ t: 'catch', target: v.opts.catch }); }
  challengePrompt(view) {
    if (!this.root.querySelector('.ut-chal')) {
      const by = this.name(view.pending.by);
      const box = h('div.ut-chal', h('b', `${by} a posé un +4`), h('p', 'Contester ? S’il bluffait (il avait la couleur demandée), il pioche 4 cartes. Sinon, tu en pioches 6.'),
        h('div.row', { 'data-row': '' },
          h('button.ut-btn.red', { type: 'button', f: true, 'data-autofocus': '', onok: () => this.send({ t: 'challenge', yes: true }) }, 'Contester'),
          h('button.ut-btn', { type: 'button', f: true, onok: () => this.send({ t: 'challenge', yes: false }) }, 'Piocher 4 cartes')));
      this.root.append(box);
      if (nav.top === this.layer && !this.blocked?.()) nav.focus(box.querySelector('[data-autofocus]'), { silent: true, instant: true });
    }
    return null;
  }
  // colour choice for a wild card: four glossy tiles over the pile
  colorPicker(fromEl, kind = 'color-start') {
    this.closePicker();
    return new Promise(resolve => {
      const done = c => { this.closePicker(); resolve(c); };
      const tiles = COLORS.map(c => h('button.ut-ctile', { type: 'button', f: true, 'data-c': c, 'aria-label': COLOR_NAMES[c], onok: () => { sfx('color'); done(c); } }, h('span', COLOR_NAMES[c])));
      const el = h('div.ut-picker', h('div.ut-pick-t', 'Choisis une couleur'), h('div.ut-ctiles', tiles), kind === 'color-start' ? null : h('button.ut-btn.small', { type: 'button', f: true, onok: () => done(null) }, 'Annuler'));
      this.root.append(el);
      this.picker = { el, kind, cancel: () => done(null), resolve };
      if (nav.top === this.layer && !this.blocked?.()) nav.focus(tiles[0], { silent: true, instant: true });
    });
  }
  seatPicker() {
    this.closePicker();
    return new Promise(resolve => {
      const v = this.v;
      const done = i => { this.closePicker(); resolve(i); };
      const btns = v.seats.map((s, i) => (i === v.me ? null : h('button.ut-seatpick', { type: 'button', f: true, onok: () => done(i) }, img(this.avatarOf(s)), h('b', s.name), h('small', `${v.players[i].n} carte${v.players[i].n > 1 ? 's' : ''}`)))).filter(Boolean);
      const el = h('div.ut-picker.seats', h('div.ut-pick-t', 'Avec qui échanger ta main ?'), h('div.ut-seatpicks', { 'data-row': '' }, btns), h('button.ut-btn.small', { type: 'button', f: true, onok: () => done(null) }, 'Annuler'));
      this.root.append(el);
      this.picker = { el, kind: 'seat', cancel: () => done(null), resolve };
      if (nav.top === this.layer && !this.blocked?.()) nav.focus(btns[0], { silent: true, instant: true });
    });
  }
  closePicker() {
    const p = this.picker; if (!p) return;
    this.picker = null;
    p.el.classList.add('out');
    setTimeout(() => p.el.remove(), 200);
    if (this.v) setTimeout(() => this.refocus(this.v), 0);
  }
  // gamepad / keyboard shortcuts; returns true when handled
  action(a) {
    if (this.picker && a === 'back') { if (this.picker.kind !== 'color-start') this.picker.cancel(); return true; }
    if (a === 'triangle') { this.callUno(); return true; }
    if (a === 'square') { this.draw(); return true; }
    if (a === 'r1') { this.catchUno(); return true; }
    if (a === 'l1') { if (this.v?.opts?.keep) this.send({ t: 'keep' }); return true; }
    return false;
  }
  hints() {
    const v = this.v, o = v?.opts || {};
    if (this.picker) return [['ok', 'Choisir'], ['back', 'Annuler']];
    const list = [['ok', 'Jouer']];
    if (o.draw) list.push(['square', 'Piocher']);
    if (o.keep) list.push(['l1', 'Garder']);
    list.push(['triangle', 'UNO']);
    if (o.catch != null) list.push(['r1', 'Contre-UNO']);
    list.push(['options', 'Menu']);
    return list;
  }
}
