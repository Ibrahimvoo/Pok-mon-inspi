// UNO rules: official deck and effects, house rules, and thousands of random games checked for invariants.
import test from 'node:test';
import assert from 'node:assert/strict';
import { newDeck, createGame, startRound, act, options, actor, botMove, botPlay, timeoutMove, view, eventsFor, handPoints, RuleError } from './rules.js';

const C = (c, v, i) => ({ i, c, v });
let uid = 1000;
const card = s => ({ i: uid++, c: s[0], v: s.slice(1) });
const RNG = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
// a game in a known position: hands as strings like 'r5', 'gS', 'wF'
function setup(n, hands, topCard, rules = {}, extra = {}) {
  const s = createGame(Array.from({ length: n }, (_, i) => ({ id: 'p' + i, name: 'P' + i })), rules, RNG(7));
  s.phase = 'play'; s.round = 1;
  s.players.forEach((p, i) => { p.hand = (hands[i] || []).map(card); });
  s.discard = [card(topCard)];
  s.color = topCard[0] === 'w' ? extra.color : topCard[0];
  s.deck = Array.from({ length: 30 }, () => card('b9'));
  s.turn = extra.turn || 0;
  return s;
}
const id = (s, pi, code) => s.players[pi].hand.find(c => c.c + c.v === code).i;
const total = s => s.deck.length + s.discard.length + s.players.reduce((a, p) => a + p.hand.length, 0);

test('the deck has the 108 official cards', () => {
  const d = newDeck();
  assert.equal(d.length, 108);
  assert.equal(new Set(d.map(c => c.i)).size, 108);
  const count = f => d.filter(f).length;
  assert.equal(count(c => c.v === '0'), 4);
  assert.equal(count(c => c.v === '5'), 8);
  assert.equal(count(c => c.v === 'S'), 8);
  assert.equal(count(c => c.v === 'R'), 8);
  assert.equal(count(c => c.v === 'D'), 8);
  assert.equal(count(c => c.v === 'W'), 4);
  assert.equal(count(c => c.v === 'F'), 4);
  assert.equal(handPoints([C('r', '7'), C('g', 'S'), C('w', 'F')]), 77);
});

test('dealing: 7 cards each, first card never a Wild Draw Four, the left of the dealer starts', () => {
  for (let k = 0; k < 300; k++) {
    const s = createGame([{ id: 'a' }, { id: 'b' }, { id: 'c' }], {}, RNG(k + 1));
    const ev = startRound(s);
    assert.ok(s.discard[0].v !== 'F');
    const first = s.discard[0];
    const hands = s.players.map(p => p.hand.length);
    if (first.v === 'D') assert.equal(hands[(s.dealer + 1) % 3], 9); else hands.forEach(n => assert.equal(n, 7));
    if (first.v === 'W') assert.equal(s.pending.t, 'color');
    if (/\d/.test(first.v) || first.v === 'W') assert.equal(actor(s), (s.dealer + 1) % 3);
    if (first.v === 'S' || first.v === 'D') assert.equal(s.turn, (s.dealer + 2) % 3);
    if (first.v === 'R') { assert.equal(s.dir, -1); assert.equal(s.turn, s.dealer); }
    assert.equal(total(s), 108);
    assert.ok(ev.some(e => e.e === 'deal'));
  }
});

test('matching colour or symbol; wrong cards and wrong turns are refused', () => {
  const s = setup(3, [['r2', 'g5', 'b7', 'y1'], ['g1'], ['b1']], 'r5');
  assert.deepEqual(options(s, 0).play.sort(), [id(s, 0, 'r2'), id(s, 0, 'g5')].sort());
  assert.throws(() => act(s, 0, { t: 'play', card: id(s, 0, 'b7') }), RuleError);
  assert.throws(() => act(s, 1, { t: 'play', card: id(s, 1, 'g1') }), RuleError);
  act(s, 0, { t: 'play', card: id(s, 0, 'g5') });
  assert.equal(s.color, 'g');
  assert.equal(s.turn, 1);
});

test('Skip, Reverse (3 and 2 players) and Draw Two', () => {
  let s = setup(3, [['rS', 'r1'], ['r2'], ['r3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'rS') });
  assert.equal(s.turn, 2);
  s = setup(3, [['rR', 'r1'], ['r2'], ['r3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'rR') });
  assert.equal(s.dir, -1); assert.equal(s.turn, 2);
  s = setup(2, [['rR', 'r1'], ['r2']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'rR') });
  assert.equal(s.turn, 0, 'with two players Reverse works like Skip');
  s = setup(3, [['rD', 'r1'], ['r2'], ['r3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'rD') });
  assert.equal(s.players[1].hand.length, 3); assert.equal(s.turn, 2);
});

test('Wild needs a colour; Wild Draw Four can be challenged', () => {
  let s = setup(3, [['wW', 'r1'], ['g2'], ['b3']], 'r5');
  assert.throws(() => act(s, 0, { t: 'play', card: id(s, 0, 'wW') }), RuleError);
  act(s, 0, { t: 'play', card: id(s, 0, 'wW'), color: 'b' });
  assert.equal(s.color, 'b'); assert.equal(s.turn, 1);
  // bluff (still had a red card) → caught: the bluffer draws 4, the challenger plays
  s = setup(3, [['wF', 'r1', 'g1'], ['g2'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'wF'), color: 'g' });
  assert.equal(actor(s), 1); assert.ok(options(s, 1).challenge);
  act(s, 1, { t: 'challenge', yes: true });
  assert.equal(s.players[0].hand.length, 6); assert.equal(s.players[1].hand.length, 1); assert.equal(s.turn, 1);
  // legal +4 challenged → the challenger draws 6 and loses the turn
  s = setup(3, [['wF', 'g1', 'g4'], ['g2'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'wF'), color: 'g' });
  act(s, 1, { t: 'challenge', yes: true });
  assert.equal(s.players[1].hand.length, 7); assert.equal(s.turn, 2);
  // not challenged → draws 4, loses the turn
  s = setup(3, [['wF', 'g1', 'g4'], ['g2'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'wF'), color: 'g' });
  act(s, 1, { t: 'draw' });
  assert.equal(s.players[1].hand.length, 5); assert.equal(s.turn, 2);
  // no bluffing rule: no challenge, immediate penalty
  s = setup(3, [['wF', 'g1', 'g4'], ['g2'], ['b3']], 'r5', { noBluff: true });
  act(s, 0, { t: 'play', card: id(s, 0, 'wF'), color: 'g' });
  assert.equal(s.pending, null); assert.equal(s.players[1].hand.length, 5); assert.equal(s.turn, 2);
});

test('drawing: may play the drawn card or keep it; force play; draw to match', () => {
  let s = setup(3, [['b1', 'y2'], ['g2'], ['b3']], 'r5');
  s.deck.push(card('r7'));
  act(s, 0, { t: 'draw' });
  assert.equal(s.pending.t, 'drawn'); assert.ok(options(s, 0).keep);
  assert.throws(() => act(s, 0, { t: 'play', card: id(s, 0, 'b1') }), RuleError);
  act(s, 0, { t: 'keep' });
  assert.equal(s.turn, 1);
  s = setup(3, [['b1', 'y2'], ['g2'], ['b3']], 'r5', { force: true });
  s.deck.push(card('r7'));
  act(s, 0, { t: 'draw' });
  assert.equal(options(s, 0).keep, false);
  assert.throws(() => act(s, 0, { t: 'keep' }), RuleError);
  act(s, 0, { t: 'play', card: id(s, 0, 'r7') });
  assert.equal(s.turn, 1);
  s = setup(3, [['b1'], ['g2'], ['b3']], 'r5');
  s.deck.push(card('g8'));
  act(s, 0, { t: 'draw' });
  assert.equal(s.turn, 1, 'unplayable drawn card ends the turn');
  s = setup(3, [['b1'], ['g2'], ['b3']], 'r5', { drawMatch: true });
  s.deck.push(card('r7'), card('g8'), card('y3'));
  act(s, 0, { t: 'draw' });
  assert.equal(s.players[0].hand.length, 4); assert.equal(s.pending.t, 'drawn');
});

test('UNO: forgetting to call it costs two cards until the next player acts', () => {
  let s = setup(3, [['r1', 'r2'], ['r3', 'g1'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'r1') });
  assert.equal(s.vuln, 0);
  assert.equal(options(s, 2).catch, 0);
  act(s, 2, { t: 'catch', target: 0 });
  assert.equal(s.players[0].hand.length, 3); assert.equal(s.vuln, null);
  // called in time: safe
  s = setup(3, [['r1', 'r2'], ['r3', 'g1'], ['b3']], 'r5');
  act(s, 0, { t: 'uno' });
  act(s, 0, { t: 'play', card: id(s, 0, 'r1') });
  assert.equal(s.vuln, null);
  assert.throws(() => act(s, 2, { t: 'catch', target: 0 }), RuleError);
  // late call before being caught: safe
  s = setup(3, [['r1', 'r2'], ['r3', 'g1'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'r1') });
  act(s, 0, { t: 'uno' });
  assert.equal(s.vuln, null);
  // the next player played: too late to catch
  s = setup(3, [['r1', 'r2'], ['r3', 'g1'], ['b3']], 'r5');
  act(s, 0, { t: 'play', card: id(s, 0, 'r1') });
  act(s, 1, { t: 'play', card: id(s, 1, 'r3') });
  assert.throws(() => act(s, 2, { t: 'catch', target: 0 }), RuleError);
});

test('stacking +2 and +4', () => {
  const s = setup(3, [['rD', 'r1'], ['gD', 'g1'], ['wF', 'b3']], 'r5', { stack: true });
  act(s, 0, { t: 'play', card: id(s, 0, 'rD') });
  assert.equal(s.stack, 2); assert.equal(s.turn, 1);
  assert.deepEqual(options(s, 1).play, [id(s, 1, 'gD')]);
  act(s, 1, { t: 'play', card: id(s, 1, 'gD') });
  assert.equal(s.stack, 4);
  act(s, 2, { t: 'play', card: id(s, 2, 'wF'), color: 'b' });
  assert.equal(s.stack, 8); assert.equal(s.pending, null, 'a stacked +4 cannot be challenged');
  act(s, 0, { t: 'draw' });
  assert.equal(s.players[0].hand.length, 9); assert.equal(s.turn, 1); assert.equal(s.stack, 0);
});

test('7-0: a 7 swaps hands, a 0 passes every hand along', () => {
  let s = setup(3, [['r7', 'r1', 'g2'], ['g1'], ['b3', 'b4']], 'r5', { sevenO: true });
  assert.throws(() => act(s, 0, { t: 'play', card: id(s, 0, 'r7') }), RuleError);
  act(s, 0, { t: 'play', card: id(s, 0, 'r7'), target: 1 });
  assert.equal(s.players[0].hand.length, 1); assert.equal(s.players[1].hand.length, 2);
  assert.equal(s.players[0].uno, true, 'a received single card is safe');
  s = setup(3, [['r0', 'r1'], ['g1', 'g2', 'g3'], ['b3', 'b4', 'b5', 'b6']], 'r5', { sevenO: true });
  act(s, 0, { t: 'play', card: id(s, 0, 'r0') });
  assert.deepEqual(s.players.map(p => p.hand.length), [4, 1, 3]);
});

test('jump-in with an identical card', () => {
  const s = setup(3, [['r5', 'g1'], ['g2'], ['r5', 'b3']], 'b5', { jumpIn: true });
  act(s, 0, { t: 'play', card: id(s, 0, 'r5') });
  assert.deepEqual(options(s, 2).jump, [id(s, 2, 'r5')]);
  act(s, 2, { t: 'play', card: id(s, 2, 'r5') });
  assert.equal(s.turn, 0);
  const t = setup(3, [['r5', 'g1'], ['g2'], ['r5', 'b3']], 'b5');
  act(t, 0, { t: 'play', card: id(t, 0, 'r5') });
  assert.throws(() => act(t, 2, { t: 'play', card: id(t, 2, 'r5') }), RuleError, 'only with the house rule');
});

test('going out scores the other hands; the last +2 still applies; 500 points wins', () => {
  const s = setup(3, [['rD'], ['g9', 'wW'], ['bS']], 'r5', { target: 100 });
  act(s, 0, { t: 'play', card: id(s, 0, 'rD') });
  assert.equal(s.phase, 'round');
  assert.equal(s.players[0].score, 9 + 50 + 18 + 20 + 9 * 0 + (s.players[1].hand.length - 2) * 0);
  assert.equal(s.result.points, s.players[0].score);
  assert.equal(s.players[1].hand.length, 4);
  s.players[0].score = 95; s.phase = 'play';
  s.players[0].hand = [card('r1')]; s.turn = 0;
  act(s, 0, { t: 'play', card: s.players[0].hand[0].i });
  assert.equal(s.phase, 'end'); assert.equal(s.champion, 0);
});

test('views hide the other hands and drawn cards', () => {
  const s = createGame([{ id: 'a' }, { id: 'b' }], {}, RNG(3));
  const ev = startRound(s);
  const v = view(s, 1);
  assert.equal(v.hand.length, s.players[1].hand.length);
  assert.ok(!('hand' in v.players[0]));
  const e = eventsFor(ev, 1).find(x => x.e === 'deal');
  assert.ok(e.cards.every(([pi, c]) => (pi === 1 ? c : c === null)));
  assert.ok(JSON.stringify(v).length < 6000);
});

test('thousands of games between computer players keep every invariant', () => {
  const combos = [{}, { stack: true }, { sevenO: true }, { jumpIn: true }, { force: true }, { noBluff: true }, { drawMatch: true },
    { stack: true, sevenO: true, jumpIn: true, force: true, drawMatch: true }, { stack: true, noBluff: true, target: 0 }];
  let rounds = 0, games = 0;
  for (let g = 0; g < 360; g++) {
    const n = 2 + (g % 3);
    const rng = RNG(g * 31 + 5);
    const s = createGame(Array.from({ length: n }, (_, i) => ({ id: 'b' + i, bot: true })), { ...combos[g % combos.length], target: combos[g % combos.length].target ?? 200 }, rng);
    let guard = 0;
    while (s.phase !== 'end' && guard++ < 60) {
      startRound(s); rounds++;
      let steps = 0;
      while (s.phase === 'play') {
        assert.ok(steps++ < 3000, 'a round must end');
        const a = actor(s);
        assert.ok(a >= 0 && a < n);
        // random UNO calls, catches and jump-ins from everybody
        for (let i = 0; i < n; i++) {
          const o = options(s, i);
          if (o.catch != null && rng() < .3) act(s, i, { t: 'catch', target: o.catch });
          if (o.uno && rng() < .5) act(s, i, { t: 'uno' });
          if (o.jump.length && rng() < .3 && s.phase === 'play') { act(s, i, botPlay(s, i, s.players[i].hand.find(c => c.i === o.jump[0]), rng)); break; }
        }
        if (s.phase !== 'play') break;
        const who = actor(s);
        const move = rng() < .1 ? timeoutMove(s, who) : botMove(s, who, rng);
        act(s, who, move);
        assert.equal(total(s), 108);
        const ids = new Set([...s.deck, ...s.discard, ...s.players.flatMap(p => p.hand)].map(c => c.i));
        assert.equal(ids.size, 108);
      }
      assert.ok(s.result.points >= 0);
      assert.equal(s.players[s.winner].hand.length, 0);
    }
    assert.equal(s.phase, 'end'); games++;
    if (s.rules.target) assert.ok(s.players[s.champion].score >= s.rules.target);
  }
  assert.equal(games, 360);
  assert.ok(rounds > 360);
});
