// Progression, tournament points and lobby codes.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// a tiny localStorage for the profile module
const store = new Map();
globalThis.localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
const { loadProfile, reward, roundPoints, levelOf, starsFor, board } = await import('../profile.js');
const { courseById } = await import('../maps/index.js');
const { codeFrom, cleanCode, sanitizeLook } = await import('../codes.js');

test('levels grow with XP and each level needs more', () => {
  assert.equal(levelOf(0).level, 1);
  assert.ok(levelOf(250).level === 2 && levelOf(5000).level > 5);
});

test('a finished descent rewards XP, coins, stars and a console record', () => {
  const prof = loadProfile({ id: 'u1', psn: 'Bobo' });
  const s = { course: 'lagon', time: 140, deaths: 0, finished: true, cps: 4, riders: [{ id: 'u1', name: 'Bobo', puff: 30, supers: 2, emotes: 0 }, { id: 'u2', name: 'Capi', puff: 10, supers: 0, emotes: 1 }] };
  const r = reward(prof, s, 'u1');
  assert.equal(r.stars, 3);
  assert.ok(r.xp > 300 && r.coins > 0 && r.record);
  assert.equal(prof.best.lagon.time, 140);
  assert.equal(board('lagon')[0].names.join(), 'Bobo,Capi');
  // reloading keeps the progression
  const again = loadProfile({ id: 'u1', psn: 'Bobo' });
  assert.equal(again.xp, prof.xp); assert.equal(again.stats.supers, 2);
});

test('items above the level can be bought', () => {
  const prof = loadProfile({ id: 'u3', psn: 'X' });
  const crown = { id: 'crown', lvl: 3 };
  assert.ok(!prof.owns('hat', crown));
  prof.bought.push('hat:crown');
  assert.ok(prof.owns('hat', crown));
});

test('race and survival rewards follow the rank; survival stars follow the time held', () => {
  const prof = loadProfile({ id: 'u4', psn: 'Run' });
  const race = { course: 'parcours', kind: 'race', time: 60, riders: [{ id: 'u5', rank: 1, time: 40, puffs: 0 }, { id: 'u4', rank: 2, time: 50, puffs: 1 }] };
  const r = reward(prof, race, 'u4');
  assert.equal(r.rank, 2); assert.equal(r.stars, 2);
  assert.equal(starsFor(courseById.tourbillon, 95, true), 3);
  assert.equal(starsFor(courseById.tourbillon, 10, true), 0);
});

test('tournament points: rank in rivalries, stars plus a bonus in teamwork', () => {
  assert.deepEqual(roundPoints({ course: 'parcours', kind: 'race', riders: [{ id: 'a', rank: 1, time: 30 }, { id: 'b', rank: 2, time: null }] }), { a: 10, b: 1 });
  assert.deepEqual(roundPoints({ course: 'tourbillon', kind: 'survival', riders: [{ id: 'a', rank: 1 }, { id: 'b', rank: 2 }, { id: 'c', rank: 3 }] }), { a: 10, b: 7, c: 5 });
  const coop = roundPoints({ course: 'lagon', time: 140, finished: true, riders: [{ id: 'a', puff: 5 }, { id: 'b', puff: 9 }] });
  assert.deepEqual(coop, { a: 8, b: 10 });
});

test('every member of a console party gets the same lobby code', () => {
  const a = codeFrom('pouf:party-123'), b = codeFrom('pouf:party-123'), c = codeFrom('pouf:party-124');
  assert.equal(a, b); assert.notEqual(a, c);
  assert.match(a, /^[A-HJKMNP-Z2-9]{5}$/);
  assert.equal(cleanCode(' ab-c d9 '), 'ABCD9');
  assert.equal(sanitizeLook({ color: 'red', species: 'x'.repeat(40) }).color, '#9d8fc4');
});
