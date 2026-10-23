// UNO rules engine: pure state + actions, shared by the host (solo or online) and the tests. Official Mattel rules
// (108 cards, Skip, Reverse, Draw Two, Wild, Wild Draw Four with challenge, UNO call with a two-card penalty, scoring
// to 500), plus the optional house rules of the console version: stacking, 7-0, jump-in, force play, no bluffing,
// draw to match.
export const COLORS = ['r', 'y', 'g', 'b'];
export const COLOR_NAMES = { r: 'Rouge', y: 'Jaune', g: 'Vert', b: 'Bleu' };
export const DEFAULT_RULES = { stack: false, sevenO: false, jumpIn: false, force: false, noBluff: false, drawMatch: false, target: 500 };
export const HAND = 7;

export function newDeck() {
  const d = [];
  let i = 0;
  for (const c of COLORS) {
    d.push({ i: i++, c, v: '0' });
    for (const v of ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'R', 'D']) { d.push({ i: i++, c, v }); d.push({ i: i++, c, v }); }
  }
  for (let k = 0; k < 4; k++) { d.push({ i: i++, c: 'w', v: 'W' }); d.push({ i: i++, c: 'w', v: 'F' }); }
  return d;
}
export const points = card => (card.c === 'w' ? 50 : /\d/.test(card.v) ? +card.v : 20);
export const handPoints = hand => hand.reduce((s, c) => s + points(c), 0);

function shuffle(a, rng) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export const nextOf = (s, i, k = 1) => (((i + s.dir * k) % s.players.length) + s.players.length) % s.players.length;
export const top = s => s.discard[s.discard.length - 1];

export class RuleError extends Error {}
const fail = m => { throw new RuleError(m); };

// players: [{ id, name, bot }]
export function createGame(players, rules = {}, rng = Math.random) {
  const s = {
    players: players.map(p => ({ ...p, hand: [], score: 0, uno: false })),
    rules: { ...DEFAULT_RULES, ...rules }, round: 0, dealer: Math.floor(rng() * players.length), phase: 'idle',
    deck: [], discard: [], dir: 1, turn: 0, color: null, stack: 0, pending: null, vuln: null, winner: null, champion: null, result: null, seq: 0,
  };
  Object.defineProperty(s, 'rng', { value: rng, enumerable: false });
  return s;
}

function drawCards(s, pi, n, ev) {
  const got = [];
  for (let k = 0; k < n; k++) {
    if (!s.deck.length) {
      if (s.discard.length <= 1) break;
      const keep = s.discard.pop();
      s.deck = shuffle(s.discard, s.rng);
      s.discard = [keep];
      ev.push({ e: 'shuffle', n: s.deck.length });
    }
    got.push(s.deck.pop());
  }
  const p = s.players[pi];
  p.hand.push(...got);
  if (p.hand.length > 1) p.uno = false;
  if (s.vuln === pi) s.vuln = null;
  if (got.length) ev.push({ e: 'draw', p: pi, cards: got });
  return got;
}

export function startRound(s) {
  if (s.phase === 'end') fail('La partie est terminée.');
  const ev = [];
  s.round++;
  s.dealer = (s.dealer + 1) % s.players.length;
  s.deck = shuffle(newDeck(), s.rng);
  s.discard = []; s.dir = 1; s.stack = 0; s.pending = null; s.vuln = null; s.winner = null; s.result = null; s.color = null;
  s.players.forEach(p => { p.hand = []; p.uno = false; });
  ev.push({ e: 'round', round: s.round, dealer: s.dealer });
  const deal = [];
  for (let k = 0; k < HAND; k++) {
    for (let j = 1; j <= s.players.length; j++) {
      const pi = (s.dealer + j) % s.players.length;
      const c = s.deck.pop();
      s.players[pi].hand.push(c);
      deal.push([pi, c]);
    }
  }
  ev.push({ e: 'deal', cards: deal });
  // the first card of the discard pile may not be a Wild Draw Four: it goes back into the deck
  let first = s.deck.pop();
  while (first.v === 'F') { s.deck.splice(Math.floor(s.rng() * s.deck.length), 0, first); first = s.deck.pop(); }
  s.discard.push(first);
  s.color = first.c === 'w' ? null : first.c;
  s.phase = 'play';
  s.turn = (s.dealer + 1) % s.players.length;
  ev.push({ e: 'flip', card: first });
  if (first.v === 'W') s.pending = { t: 'color', p: s.turn };
  else if (first.v === 'D') { drawCards(s, s.turn, 2, ev); ev.push({ e: 'skip', p: s.turn }); s.turn = nextOf(s, s.turn); }
  else if (first.v === 'S') { ev.push({ e: 'skip', p: s.turn }); s.turn = nextOf(s, s.turn); }
  else if (first.v === 'R') { s.dir = -1; ev.push({ e: 'reverse', dir: -1 }); s.turn = s.dealer; }
  ev.push({ e: 'turn', p: actor(s) });
  s.seq++;
  return ev;
}

// whose decision the game is waiting for
export function actor(s) {
  if (s.phase !== 'play') return null;
  if (s.pending?.t === 'challenge') return s.pending.victim;
  if (s.pending) return s.pending.p;
  return s.turn;
}

export function canPlay(s, card) {
  if (s.phase !== 'play') return false;
  const t = top(s);
  if (s.stack > 0) return t.v === 'D' ? card.v === 'D' || card.v === 'F' : card.v === 'F';
  if (card.c === 'w') return true;
  return card.c === s.color || card.v === t.v;
}
// a card identical to the top of the pile can be thrown in out of turn (jump-in)
export function canJump(s, pi, card) {
  return s.rules.jumpIn && s.phase === 'play' && !s.pending && !s.stack && pi !== s.turn && card.c !== 'w' && card.c === top(s).c && card.v === top(s).v;
}

// what player `pi` may do right now
export function options(s, pi) {
  const o = { play: [], jump: [], draw: false, keep: false, color: false, challenge: false, uno: false, catch: null };
  if (s.phase !== 'play') return o;
  const p = s.players[pi];
  const a = actor(s);
  if (a === pi) {
    const pd = s.pending;
    if (pd?.t === 'color') o.color = true;
    else if (pd?.t === 'drawn') { if (canPlay(s, p.hand.find(c => c.i === pd.card))) o.play = [pd.card]; o.keep = !pd.must; }
    else if (pd?.t === 'challenge') { o.challenge = true; o.draw = true; if (s.rules.stack) o.play = p.hand.filter(c => c.v === 'F').map(c => c.i); }
    else { o.play = p.hand.filter(c => canPlay(s, c)).map(c => c.i); o.draw = true; }
  } else o.jump = p.hand.filter(c => canJump(s, pi, c)).map(c => c.i);
  o.uno = !p.uno && (p.hand.length === 1 || (p.hand.length === 2 && (a === pi || o.jump.length > 0)));
  if (s.vuln != null && s.vuln !== pi) o.catch = s.vuln;
  return o;
}

// apply an action of player `pi`; returns the events to animate, throws RuleError when it is not allowed
export function act(s, pi, a) {
  if (s.phase !== 'play') fail('Aucune manche en cours.');
  const p = s.players[pi];
  if (!p) fail('Joueur inconnu.');
  const ev = [];
  const t = a?.t;
  if (t === 'uno') {
    if (p.uno || p.hand.length > 2) fail('Tu ne peux pas annoncer UNO maintenant.');
    p.uno = true;
    if (s.vuln === pi) s.vuln = null;
    ev.push({ e: 'uno', p: pi });
    s.seq++;
    return ev;
  }
  if (t === 'catch') {
    const v = s.vuln;
    if (v == null || v === pi || v !== a.target) fail('Trop tard !');
    ev.push({ e: 'caught', p: v, by: pi });
    drawCards(s, v, 2, ev);
    s.vuln = null;
    s.seq++;
    return ev;
  }
  if (t === 'play' && pi !== actor(s)) {
    const card = p.hand.find(c => c.i === a.card);
    if (!card || !canJump(s, pi, card)) fail('Ce n’est pas ton tour.');
    ev.push({ e: 'jump', p: pi });
    s.turn = pi;
    playCard(s, pi, card, a, ev);
    if (s.phase === 'play') ev.push({ e: 'turn', p: actor(s) });
    s.seq++;
    return ev;
  }
  if (pi !== actor(s)) fail('Ce n’est pas ton tour.');
  const pd = s.pending;
  switch (t) {
    case 'color': {
      if (pd?.t !== 'color') fail('Aucune couleur à choisir.');
      if (!COLORS.includes(a.color)) fail('Couleur inconnue.');
      s.color = a.color; s.pending = null;
      ev.push({ e: 'color', color: a.color, p: pi });
      break;
    }
    case 'play': {
      const card = p.hand.find(c => c.i === a.card);
      if (!card) fail('Carte introuvable.');
      if (pd?.t === 'color') fail('Choisis d’abord une couleur.');
      if (pd?.t === 'drawn' && card.i !== pd.card) fail('Tu ne peux jouer que la carte piochée.');
      if (pd?.t === 'challenge' && !(s.rules.stack && card.v === 'F')) fail('Réponds d’abord au +4.');
      if (!canPlay(s, card)) fail('Cette carte ne peut pas être jouée.');
      s.pending = null;
      playCard(s, pi, card, a, ev);
      break;
    }
    case 'draw': {
      if (pd?.t === 'challenge') return act(s, pi, { t: 'challenge', yes: false });
      if (pd) fail('Action impossible maintenant.');
      closeWindow(s, pi);
      if (s.stack > 0) {
        const n = s.stack;
        s.stack = 0;
        drawCards(s, pi, n, ev);
        ev.push({ e: 'skip', p: pi });
        s.turn = nextOf(s, pi);
        break;
      }
      let got = drawCards(s, pi, 1, ev);
      if (s.rules.drawMatch) {
        while (got.length && !canPlay(s, got[0])) got = drawCards(s, pi, 1, ev);
      }
      const last = got[got.length - 1];
      if (last && canPlay(s, last)) s.pending = { t: 'drawn', p: pi, card: last.i, must: s.rules.force };
      else s.turn = nextOf(s, pi);
      break;
    }
    case 'keep': {
      if (pd?.t !== 'drawn' || pd.must) fail('Action impossible maintenant.');
      s.pending = null;
      ev.push({ e: 'keep', p: pi });
      s.turn = nextOf(s, pi);
      break;
    }
    case 'challenge': {
      if (pd?.t !== 'challenge') fail('Aucun +4 à contester.');
      closeWindow(s, pi);
      s.pending = null;
      const n = s.stack;
      s.stack = 0;
      if (a.yes) {
        ev.push({ e: 'challenge', p: pi, by: pd.by, guilty: pd.guilty, hand: s.players[pd.by].hand.slice() });
        if (pd.guilty) { drawCards(s, pd.by, n, ev); s.turn = pi; }
        else { drawCards(s, pi, n + 2, ev); ev.push({ e: 'skip', p: pi }); s.turn = nextOf(s, pi); }
      } else {
        drawCards(s, pi, n, ev);
        ev.push({ e: 'skip', p: pi });
        s.turn = nextOf(s, pi);
      }
      break;
    }
    default: fail('Action inconnue.');
  }
  if (s.phase === 'play') ev.push({ e: 'turn', p: actor(s) });
  s.seq++;
  return ev;
}

// the UNO window closes as soon as another player acts
function closeWindow(s, pi) { if (s.vuln != null && s.vuln !== pi) s.vuln = null; }

function playCard(s, pi, card, a, ev) {
  const p = s.players[pi];
  const n = s.players.length;
  if (card.c === 'w' && !COLORS.includes(a.color)) fail('Choisis une couleur.');
  const swapWith = s.rules.sevenO && card.v === '7' && p.hand.length > 1 ? +a.target : null;
  if (swapWith != null && (!(swapWith >= 0 && swapWith < n) || swapWith === pi)) fail('Choisis un joueur avec qui échanger ta main.');
  closeWindow(s, pi);
  // Wild Draw Four: it is a bluff when the player still held a card of the colour in play
  const guilty = card.v === 'F' && p.hand.some(c => c !== card && c.c === s.color);
  p.hand.splice(p.hand.indexOf(card), 1);
  s.discard.push(card);
  s.color = card.c === 'w' ? a.color : card.c;
  ev.push({ e: 'play', p: pi, card, color: s.color });
  if (p.hand.length === 1) { if (!p.uno) s.vuln = pi; }
  else p.uno = false;

  if (!p.hand.length) {
    // the last card's penalty still applies before scoring
    const victim = nextOf(s, pi);
    if (card.v === 'D' || card.v === 'F') {
      const k = s.stack + (card.v === 'D' ? 2 : 4);
      s.stack = 0;
      drawCards(s, victim, k, ev);
    }
    return endRound(s, pi, ev);
  }
  switch (card.v) {
    case 'S': { const v = nextOf(s, pi); ev.push({ e: 'skip', p: v }); s.turn = nextOf(s, pi, 2); break; }
    case 'R':
      if (n === 2) { ev.push({ e: 'reverse', dir: s.dir }); ev.push({ e: 'skip', p: nextOf(s, pi) }); s.turn = pi; }
      else { s.dir = -s.dir; ev.push({ e: 'reverse', dir: s.dir }); s.turn = nextOf(s, pi); }
      break;
    case 'D':
      if (s.rules.stack) { s.stack += 2; s.turn = nextOf(s, pi); ev.push({ e: 'stack', n: s.stack }); }
      else { const v = nextOf(s, pi); drawCards(s, v, 2, ev); ev.push({ e: 'skip', p: v }); s.turn = nextOf(s, pi, 2); }
      break;
    case 'F': {
      const v = nextOf(s, pi);
      s.stack += 4;
      const lone = s.stack === 4;
      if (!s.rules.noBluff && lone) { s.pending = { t: 'challenge', by: pi, victim: v, guilty }; s.turn = v; }
      else if (s.rules.stack) { s.turn = v; ev.push({ e: 'stack', n: s.stack }); }
      else { const k = s.stack; s.stack = 0; drawCards(s, v, k, ev); ev.push({ e: 'skip', p: v }); s.turn = nextOf(s, pi, 2); }
      break;
    }
    case '7':
      if (swapWith != null) {
        const o = s.players[swapWith];
        [p.hand, o.hand] = [o.hand, p.hand];
        ev.push({ e: 'swap', a: pi, b: swapWith });
        afterHandsMoved(s);
      }
      s.turn = nextOf(s, pi);
      break;
    case '0':
      if (s.rules.sevenO) {
        const hands = s.players.map(x => x.hand);
        s.players.forEach((x, i) => { x.hand = hands[nextOf(s, i, -1)]; });
        ev.push({ e: 'rotate', dir: s.dir });
        afterHandsMoved(s);
      }
      s.turn = nextOf(s, pi);
      break;
    default: s.turn = nextOf(s, pi);
  }
}
// after 7-0 exchanges nobody can be caught for a hand they just received
function afterHandsMoved(s) { s.vuln = null; s.players.forEach(x => { x.uno = x.hand.length === 1; }); }

function endRound(s, pi, ev) {
  const pts = s.players.reduce((sum, x, i) => (i === pi ? sum : sum + handPoints(x.hand)), 0);
  s.players[pi].score += pts;
  s.winner = pi; s.pending = null; s.vuln = null; s.stack = 0;
  const done = !s.rules.target || s.players[pi].score >= s.rules.target;
  s.phase = done ? 'end' : 'round';
  if (done) s.champion = pi;
  s.result = { winner: pi, points: pts, hands: s.players.map(x => x.hand.slice()), scores: s.players.map(x => x.score) };
  ev.push({ e: 'out', p: pi, points: pts, end: done });
}

// ---------------------------------------------------------------- views (what one seat is allowed to see)
export function view(s, me) {
  const o = me >= 0 && s.players[me] ? options(s, me) : null;
  return {
    round: s.round, phase: s.phase, dir: s.dir, turn: s.turn, actor: actor(s), color: s.color, stack: s.stack,
    pile: s.discard.slice(-7), drawN: s.deck.length, target: s.rules.target,
    players: s.players.map(x => ({ n: x.hand.length, score: x.score, uno: x.uno })),
    hand: me >= 0 && s.players[me] ? s.players[me].hand.slice() : [],
    pending: s.pending ? { t: s.pending.t, p: actor(s), by: s.pending.by ?? null, card: s.pending.t === 'drawn' && s.pending.p === me ? s.pending.card : null } : null,
    vuln: s.vuln, winner: s.winner, champion: s.champion, result: s.result, opts: o, seq: s.seq,
  };
}
// events as seen by one seat: other players' drawn cards stay hidden
export function eventsFor(ev, me) {
  return ev.map(x => {
    if (x.e === 'draw' && x.p !== me) return { e: 'draw', p: x.p, n: x.cards.length };
    if (x.e === 'deal') return { e: 'deal', cards: x.cards.map(([pi, c]) => (pi === me ? [pi, c] : [pi, null])) };
    if (x.e === 'challenge' && x.p !== me && x.by !== me) return { ...x, hand: undefined };
    return x;
  });
}

// ---------------------------------------------------------------- computer players
function bestColor(hand, rng) {
  const n = { r: 0, y: 0, g: 0, b: 0 };
  hand.forEach(c => { if (c.c !== 'w') n[c.c] += 1 + (/\d/.test(c.v) ? 0 : .5); });
  const max = Math.max(...Object.values(n));
  const best = COLORS.filter(c => n[c] === max);
  return best[Math.floor(rng() * best.length)];
}
// a computer player's complete play of `card` (colour for a wild, partner for a 7 under 7-0)
export function botPlay(s, pi, card, rng = s.rng) {
  const p = s.players[pi];
  const a = { t: 'play', card: card.i };
  if (card.c === 'w') a.color = bestColor(p.hand.filter(c => c !== card), rng);
  if (s.rules.sevenO && card.v === '7' && p.hand.length > 1) {
    let best = -1;
    s.players.forEach((x, i) => { if (i !== pi && (best < 0 || x.hand.length < s.players[best].hand.length)) best = i; });
    a.target = best;
  }
  return a;
}
export function botMove(s, pi, rng = s.rng) {
  const p = s.players[pi];
  const o = options(s, pi);
  if (o.color) return { t: 'color', color: bestColor(p.hand, rng) };
  const withExtras = card => botPlay(s, pi, card, rng);
  if (o.challenge) {
    if (o.play.length) return withExtras(p.hand.find(c => c.i === o.play[0]));
    return { t: 'challenge', yes: rng() < .3 };
  }
  if (s.pending?.t === 'drawn') return o.play.length ? withExtras(p.hand.find(c => c.i === o.play[0])) : { t: 'keep' };
  if (!o.play.length) return { t: 'draw' };
  const cards = o.play.map(i => p.hand.find(c => c.i === i));
  const next = s.players[nextOf(s, pi)];
  const danger = next.hand.length <= 2;
  const colorCount = c => p.hand.filter(x => x.c === c).length;
  const score = c => {
    let v = 0;
    if (c.c === 'w') v -= c.v === 'F' ? 30 : 20;                    // keep wild cards for later
    else v += colorCount(c.c) * 3 + (c.c === s.color ? 4 : 0);
    if (/\d/.test(c.v)) v += +c.v * .4;                            // get rid of high cards first
    if (['S', 'R', 'D'].includes(c.v)) v += danger ? 25 : 2;
    if (c.v === 'F' && danger) v += 45;
    if (c.v === 'F' && p.hand.some(x => x !== c && x.c === s.color) && rng() > .12) v -= 60; // rarely bluffs
    return v + rng() * 2;
  };
  cards.sort((a, b) => score(b) - score(a));
  return withExtras(cards[0]);
}
// what the console does for a player whose time ran out
export function timeoutMove(s, pi) {
  const o = options(s, pi);
  if (o.color) return { t: 'color', color: bestColor(s.players[pi].hand, s.rng) };
  if (o.challenge) return { t: 'challenge', yes: false };
  if (s.pending?.t === 'drawn') return o.keep ? { t: 'keep' } : botMove(s, pi);
  return { t: 'draw' };
}
