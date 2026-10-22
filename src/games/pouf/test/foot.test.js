// On-foot physics: landing, jumping, moving and spinning platforms, sweepers, bumpers, springs and sinking floors.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stepPlayer, newPlayer, inZone, sinkDepth, sinkWarning, partPose, JUMP, GRAVITY } from '../sim/foot.js';
import { PARCOURS } from '../maps/parcours.js';
import { TOURBILLON } from '../maps/tourbillon.js';
import { COURSES } from '../maps/index.js';

const run = (level, pl, inp, t0, secs, others = []) => { const ev = []; let t = t0; for (let i = 0; i < secs * 60; i++, t += 1 / 60) stepPlayer(level, pl, inp, t, 1 / 60, others, ev); return ev; };
const still = { mx: 0, mz: 0, jump: false, puff: false };

test('a player dropped on the start platform lands and stays', () => {
  const pl = newPlayer([0, 4, 4]);
  run(PARCOURS, pl, still, 0, 1.5);
  assert.ok(Math.abs(pl.y - 2) < .01 && pl.ground === 0, `y=${pl.y} ground=${pl.ground}`);
});

test('jump height is enough for the course (about 2 m)', () => {
  const pl = newPlayer(PARCOURS.spawn[0]);
  run(PARCOURS, pl, still, 0, .5);
  let top = 0; const ev = [];
  for (let i = 0; i < 90; i++) { stepPlayer(PARCOURS, pl, { ...still, jump: i === 0 }, i / 60, 1 / 60, [], ev); top = Math.max(top, pl.y); }
  assert.ok(top - 2 > 1.8 && top - 2 < 2.4, `jump ${(top - 2).toFixed(2)} m (${JUMP}, ${GRAVITY})`);
  assert.ok(ev.some(e => e.k === 'jump') && ev.some(e => e.k === 'land'));
});

test('running off the start platform falls into the water', () => {
  const pl = newPlayer([0, 2, 4]);
  // sideways, past the edge
  run(PARCOURS, pl, { ...still, mx: 1 }, 0, 3);
  assert.ok(pl.y < 0, `y=${pl.y}`);
});

test('walls stop a player (no tunnelling through a platform side)', () => {
  // under the bumper field platform level, running into its side
  const pl = newPlayer([0, .5, 88]);
  pl.ground = -1;
  run(PARCOURS, pl, { ...still, mz: 1 }, 0, .3);
  assert.ok(pl.z < 90, `z=${pl.z}`);
});

test('a moving platform carries the player standing on it', () => {
  const i = PARCOURS.parts.findIndex(p => p.move && p.move[0]);
  const part = PARCOURS.parts[i];
  const pl = newPlayer([part.p[0], part.p[1] + part.s[1] / 2 + .3, part.p[2]]);
  run(PARCOURS, pl, still, 0, .3);
  const x0 = pl.x;
  run(PARCOURS, pl, still, .3, 1.5);
  assert.equal(pl.ground, i);
  assert.ok(Math.abs(pl.x - x0) > 2, `moved ${pl.x - x0}`);
});

test('a spinning disc turns the player round its centre', () => {
  const i = PARCOURS.parts.findIndex(p => p.type === 'disc' && p.spin);
  const d = PARCOURS.parts[i];
  const pl = newPlayer([d.p[0] + 2.5, d.p[1] + d.h / 2 + .2, d.p[2]]);
  run(PARCOURS, pl, still, 0, 2);
  const a = Math.atan2(pl.z - d.p[2], pl.x - d.p[0]);
  assert.equal(pl.ground, i);
  assert.ok(Math.abs(a) > .5 && Math.abs(Math.hypot(pl.x - d.p[0], pl.z - d.p[2]) - 2.5) < .2, `angle ${a.toFixed(2)}`);
});

test('the sweeping bar knocks a player who does not jump', () => {
  const sw = PARCOURS.parts.find(p => p.type === 'sweeper');
  const pl = newPlayer([sw.p[0], 2, sw.p[2] + 5]);
  const ev = run(PARCOURS, pl, still, 0, 6);
  assert.ok(ev.some(e => e.k === 'knock' && e.kind === 'sweeper'));
});

test('bumpers bounce players away and the spring pad launches them', () => {
  const b = PARCOURS.parts.find(p => p.type === 'bumper');
  const pl = newPlayer([b.p[0], 2, b.p[2] - 3]);
  const ev = run(PARCOURS, pl, { ...still, mz: 1 }, 0, 1);
  assert.ok(ev.some(e => e.k === 'knock' && e.kind === 'bumper'));
  const pad = PARCOURS.parts.find(p => p.bounce);
  const p2 = newPlayer([pad.p[0], pad.p[1] + 3, pad.p[2]]);
  let top = 0; const ev2 = [];
  for (let i = 0; i < 120; i++) { stepPlayer(PARCOURS, p2, still, i / 60, 1 / 60, [], ev2); top = Math.max(top, p2.y); }
  assert.ok(ev2.some(e => e.k === 'boing') && top > 5.5, `top ${top.toFixed(2)}`);
});

test('the finish platform is reachable from the spring pad', () => {
  const pad = PARCOURS.parts.find(p => p.bounce);
  const pl = newPlayer([0, pad.p[1] + .6, pad.p[2]]);
  run(PARCOURS, pl, { ...still, mz: 1 }, 0, 3);
  assert.ok(inZone(PARCOURS.finish, pl) || pl.z > PARCOURS.finish.p[2] - 2, `z=${pl.z.toFixed(1)} y=${pl.y.toFixed(1)}`);
});

test('arena floor tiles sink in turn and come back', () => {
  const tile = TOURBILLON.parts.find(p => p.sink);
  const depths = []; for (let t = 0; t < 60; t += .5) depths.push(sinkDepth(tile, t));
  assert.ok(depths.slice(0, 26).every(d => d === 0), 'nothing sinks during the first seconds');
  assert.ok(depths.some(d => d >= 6) && depths.slice(40).some(d => d === 0));
  const pl = newPlayer([tile.p[0], 2.2, tile.p[2]]);
  let fell = false, t = 0;
  for (let i = 0; i < 60 * 40 && !fell; i++, t += 1 / 60) { stepPlayer(TOURBILLON, pl, still, t, 1 / 60, []); if (pl.y < -1) fell = true; }
  assert.ok(fell, 'a player waiting on a sinking tile ends in the water');
});

test('players shove each other instead of overlapping', () => {
  const a = newPlayer([0, 2, 4]), b = { x: .3, y: 2, z: 4 };
  run(PARCOURS, a, still, 0, .5, [b]);
  assert.ok(Math.hypot(a.x - b.x, a.z - b.z) > .8);
});

test('nobody is hit by the arena sweeper at the start signal', () => {
  for (const sp of TOURBILLON.spawn) {
    const pl = newPlayer(sp), ev = [];
    for (let i = 0; i < 20; i++) stepPlayer(TOURBILLON, pl, { mx: 0, mz: 0, jump: false, puff: false }, i / 60, 1 / 60, [], ev);
    assert.ok(!ev.some(e => e.k === 'knock'), `seat ${sp}`);
  }
});

for (const level of COURSES.filter(c => c.foot)) {
  test(`${level.id}: every spawn lands on a platform and nobody is hit at the start signal`, () => {
    for (const sp of level.spawn) {
      const pl = newPlayer([sp[0], sp[1] + 1, sp[2], sp[3]]), ev = [];
      for (let i = 0; i < 60; i++) stepPlayer(level, pl, still, i / 60 * .3, 1 / 60, [], ev);
      assert.ok(pl.ground >= 0 && Math.abs(pl.y - sp[1]) < .05, `spawn ${sp} → y ${pl.y.toFixed(2)}`);
      assert.ok(!ev.some(e => e.k === 'knock'), `knocked at spawn ${sp}`);
    }
  });
  if (level.kind === 'race') test(`${level.id}: checkpoints and finish stand on platforms`, () => {
    for (const z of [...level.checkpoints, level.finish]) {
      const pl = newPlayer([z.p[0], z.p[1] + 1.5, z.p[2]]);
      run(level, pl, still, 0, 1);
      assert.ok(pl.ground >= 0 && inZone(z, pl), `zone at z=${z.p[2]}: y ${pl.y.toFixed(2)}`);
    }
  });
}

test('ice is slippery: a critter keeps sliding after letting go of the stick', () => {
  const ice = COURSES.find(c => c.id === 'glissade'), part = ice.parts.find(p => p.ice);
  const pl = newPlayer([0, part.p[1] + part.s[1] / 2 + .2, part.p[2] - 4]);
  run(ice, pl, still, 0, .3);
  run(ice, pl, { ...still, mz: 1 }, .3, 1.2);
  const z0 = pl.z;
  run(ice, pl, still, 1.5, .5);
  assert.ok(pl.z - z0 > 1.2, `slid ${(pl.z - z0).toFixed(2)} m`);
});

test('survival arena: walking from the central disc onto the ring of tiles never drops into the seam between them', () => {
  // the disc (r 7.4) and the tiles (from 7.8) look joined: their rims touch on screen
  const arena = { ...TOURBILLON, parts: TOURBILLON.parts.filter(p => p.type !== 'sweeper') };
  for (const sp of [1, .3, .1]) for (let a = 0; a < Math.PI * 2; a += Math.PI / 60) {
    const pl = newPlayer([Math.cos(a) * 5, 2, Math.sin(a) * 5, 0]);
    for (let k = 0; k < 60 * 12 && Math.hypot(pl.x, pl.z) < 9; k++) stepPlayer(arena, pl, { ...still, mx: Math.cos(a) * sp, mz: Math.sin(a) * sp }, 5 + k / 60, 1 / 60, [], []);
    assert.ok(pl.y > 1.9, `fell at angle ${(a * 180 / Math.PI).toFixed(0)}° (stick ${sp}): y=${pl.y.toFixed(2)}`);
  }
});

test('every sinking floor tile shakes for its whole warning before going down (none vanishes when the cycles start)', () => {
  for (const level of COURSES.filter(c => c.foot)) for (const [i, p] of level.parts.entries()) {
    if (!p.sink) continue;
    const warnFor = (p.sink.on ?? .5) >= .12 ? .12 * p.sink.period : (p.sink.on ?? .5) * p.sink.period;
    let prev = 0, downs = 0;
    for (let t = 0; t < 160; t += 1 / 60) {
      const d = sinkDepth(p, t);
      if (prev === 0 && d > 0) {
        downs++;
        for (let k = 1 / 60; k < warnFor - .05; k += 1 / 60) assert.equal(sinkWarning(p, t - k), 1, `${level.id} part ${i}: going down at ${t.toFixed(2)} s without shaking ${k.toFixed(2)} s before`);
      }
      prev = d;
    }
    assert.ok(downs > 0, `${level.id} part ${i} never sinks`);
  }
});

test('a player riding a moving platform stays on it when the obstacles’ clock jumps (long frame, clock correction)', () => {
  const i = PARCOURS.parts.findIndex(p => p.type === 'box' && p.move && p.move[0]), part = PARCOURS.parts[i], P = {};
  partPose(part, 1, P);
  const pl = newPlayer([P.x, P.y + 1, P.z]);
  run({ parts: [part] }, pl, still, 1, .5);
  assert.equal(pl.ground, 0);
  partPose(part, pl.t, P);
  const ox = pl.x - P.x, oz = pl.z - P.z;
  // the next step comes .6 s later in the obstacles' time (the platform moves about 4 m meanwhile)
  stepPlayer({ parts: [part] }, pl, still, pl.t + .6, 1 / 60, [], []);
  partPose(part, pl.t, P);
  assert.ok(pl.ground === 0 && Math.hypot(pl.x - P.x - ox, pl.z - P.z - oz) < .05, `left behind: ${(pl.x - P.x - ox).toFixed(2)} m`);
});
