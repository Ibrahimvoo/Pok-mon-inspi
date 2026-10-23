// The console that hosts a game runs the rules: it deals, validates every action (its own, its friends' sent over
// the network, the computer players'), keeps the turn timer and sends each seat its own view of the table.
import { createGame, startRound, act, actor, botMove, botPlay, timeoutMove, view, eventsFor, options, RuleError } from './rules.js';

export const TURN_MS = 20000;
export const ROUND_PAUSE = 9000;
// how long the tables take to animate a batch of events (the host waits before the next computer move)
export function animTime(ev) {
  let t = 0;
  for (const e of ev) {
    t += { play: 650, draw: Math.min(1400, 260 * (e.cards?.length ?? e.n ?? 1)), deal: 2400, flip: 700, skip: 650, reverse: 750, uno: 900, caught: 900,
      shuffle: 700, swap: 1000, rotate: 1100, challenge: 1700, color: 500, out: 1200, jump: 300, stack: 300 }[e.e] || 0;
  }
  return t;
}

export class Match {
  // seats: [{ id, name, bot, ai, online }], local: seat index played on this console (or -1)
  constructor({ seats, rules, local = 0, onLocal, send, rng = Math.random, gid }) {
    this.seats = seats.map(x => ({ ...x }));
    this.local = local; this.onLocal = onLocal; this.send = send || (() => {}); this.rng = rng;
    this.gid = gid || Math.random().toString(36).slice(2, 10);
    this.s = createGame(this.seats.map(x => ({ id: x.id, name: x.name, bot: !!x.bot })), rules, rng);
    this.timers = []; this.paused = false; this.closed = false;
    this.deadlineAt = 0; this.nextAt = 0; this.last = [];
  }
  get state() { return this.s; }
  start() { this.push(startRound(this.s)); }
  // a seat acts; returns an error message when the action is refused
  submit(seat, a) {
    if (this.closed) return 'Partie terminée.';
    try { this.push(act(this.s, seat, a)); return null; }
    catch (e) { if (e instanceof RuleError) return e.message; throw e; }
  }
  setOnline(seat, online) {
    const x = this.seats[seat];
    if (!x || x.bot || x.online === online) return;
    x.online = online;
    this.push([]);
  }
  viewFor(i) {
    const now = Date.now();
    return { ...view(this.s, i), gid: this.gid, me: i, seats: this.seats, deadline: this.deadlineAt ? Math.max(0, this.deadlineAt - now) : 0, next: this.nextAt ? Math.max(0, this.nextAt - now) : 0, rules: this.s.rules };
  }
  push(ev) {
    this.plan(ev);
    this.seats.forEach((x, i) => {
      if (x.bot) return;
      const msg = { view: this.viewFor(i), ev: eventsFor(ev, i) };
      if (i === this.local) this.onLocal?.(msg.view, msg.ev);
      else this.send(i, msg);
    });
  }
  resync(i) { if (i === this.local) this.onLocal?.(this.viewFor(i), []); else this.send(i, { view: this.viewFor(i), ev: [] }); }
  pause() { this.paused = true; this.clear(); }
  resume() { if (!this.paused) return; this.paused = false; this.push([]); }
  close() { this.closed = true; this.clear(); }
  clear() { this.timers.forEach(clearTimeout); this.timers = []; }
  later(ms, fn) { this.timers.push(setTimeout(() => { if (!this.closed && !this.paused) fn(); }, ms)); }
  auto(i) { const x = this.seats[i]; return x.bot || x.online === false; }

  plan(ev) {
    this.clear();
    this.deadlineAt = 0; this.nextAt = 0;
    if (this.paused || this.closed) return;
    const s = this.s, anim = animTime(ev), seq = s.seq;
    if (s.phase === 'round') {
      this.nextAt = Date.now() + anim + ROUND_PAUSE;
      this.later(anim + ROUND_PAUSE, () => this.push(startRound(s)));
      return;
    }
    if (s.phase !== 'play') return;
    const a = actor(s);
    if (this.auto(a)) {
      this.later(anim + 900 + this.rng() * 900, () => { if (s.seq === seq) this.bot(a); });
    } else {
      this.deadlineAt = Date.now() + anim + TURN_MS;
      this.later(anim + TURN_MS, () => { if (s.seq === seq && actor(s) === a) this.submit(a, timeoutMove(s, a)); });
    }
    // computer players catch a forgotten UNO, call their own late, and jump in
    if (s.vuln != null) {
      const v = s.vuln;
      this.seats.forEach((x, i) => {
        if (i === v || !this.auto(i) || this.rng() > .5) return;
        this.later(anim + 1300 + this.rng() * 2200, () => { if (s.vuln === v) this.submit(i, { t: 'catch', target: v }); });
      });
      if (this.auto(v) && this.rng() < .45) this.later(anim + 1000 + this.rng() * 1800, () => { if (s.vuln === v) this.submit(v, { t: 'uno' }); });
    }
    if (s.rules.jumpIn && !s.pending && !s.stack) {
      this.seats.forEach((x, i) => {
        if (i === s.turn || !this.auto(i) || this.rng() > .45) return;
        const o = options(s, i);
        if (!o.jump.length) return;
        this.later(anim + 450 + this.rng() * 700, () => {
          if (s.seq !== seq) return;
          const card = s.players[i].hand.find(c => c.i === o.jump[0]);
          if (card) this.submit(i, botPlay(s, i, card, this.rng));
        });
      });
    }
  }
  bot(i) {
    const s = this.s, p = s.players[i];
    // a friend who lost the connection is replaced by the computer until they come back
    const mv = botMove(s, i, this.rng);
    // computer players usually remember to call UNO before playing their second-to-last card
    if (mv.t === 'play' && p.hand.length === 2 && !p.uno && this.rng() < .82) { this.submit(i, { t: 'uno' }); return; }
    const err = this.submit(i, mv);
    if (err) this.submit(i, timeoutMove(s, i));
  }
}
