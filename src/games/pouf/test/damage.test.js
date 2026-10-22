// Damage must always come from something the players can see, and be traceable (trap, cause, place, time).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTrack } from '../sim/track.js';
import { RaftSim, RAFT_R } from '../sim/raft.js';
import { collide, millAngle, millSpans, MILL_TOP, MILL_FLOOR } from '../sim/hazards.js';
import { stepPlayer, newPlayer } from '../sim/foot.js';
import { RIVER_COURSES } from '../maps/index.js';
import { PARCOURS } from '../maps/parcours.js';
import { logDamage, damageLog, hazardName } from '../damagelog.js';

const TAU = Math.PI * 2;

test('mills only hurt with the part of an arm that is above the water', () => {
  let contacts = 0;
  for (const course of RIVER_COURSES) {
    const T = buildTrack(course), fr = {};
    for (const h of course.hazards.filter(x => x.type === 'mill')) {
      T.at(h.s, fr);
      const L = h.len ?? 7.2, H = h.hub ?? 3.4, n = h.arms ?? 4, r = h.r ?? .5, dh = h.side * (fr.w + 1.3);
      for (let t = 0; t < 12; t += .05) for (let d = -fr.w + RAFT_R; d <= fr.w - RAFT_R; d += .3) for (const ds of [-1.5, 0, 1.5]) {
        const c = collide(h, { s: h.s + ds, d }, RAFT_R, t, fr);
        if (!c) continue;
        contacts++;
        // the closest point of a visible arm (between the water line and the riders' heads)
        let best = Infinity;
        for (let i = 0; i < n; i++) {
          const a = millAngle(h, t) + i * TAU / n;
          for (let u = 0; u <= 1; u += .001) {
            const y = H + L * u * Math.sin(a);
            if (y < MILL_FLOOR - 1e-6 || y > MILL_TOP + 1e-6) continue;
            best = Math.min(best, Math.hypot(ds, d - (dh + L * u * Math.cos(a))));
          }
        }
        assert.ok(best < RAFT_R + r + .01, `${course.id} mill at ${h.s}: hit at d=${d.toFixed(2)} t=${t.toFixed(2)} with no visible arm within reach (${best.toFixed(2)} m)`);
      }
    }
  }
  assert.ok(contacts > 1000, `mills still hit rafts in their path (${contacts} contacts)`);
});

test('a mill arm plunged deep under the water does not touch a raft floating above it', () => {
  const h = { type: 'mill', s: 0, side: 1, speed: 0, phase: 0 }, w = 7, fr = { w };
  // arm pointing 45° down towards the middle of the river: from the water line it continues 1.7 m under the surface
  h.phase = (Math.PI + Math.PI / 4) / TAU;
  const tipD = w + 1.3 - 7.2 * Math.cos(Math.PI / 4);           // the submerged tip (1.7 m deep), d ≈ 3.2
  const visibleEnd = w + 1.3 - (3.4 - MILL_FLOOR);                // where the arm goes deeper than the raft, d ≈ 4.6
  assert.ok(millSpans(h, w, 0).some(([a, b]) => Math.abs(Math.min(a, b) - visibleEnd) < .01));
  // a raft within reach of the submerged tip but not of the visible part: no contact (it used to lose air)
  const raftD = 1.2, reach = RAFT_R + .5;
  assert.ok(Math.abs(raftD - tipD) < reach && Math.abs(raftD - visibleEnd) > reach);
  assert.equal(collide(h, { s: 0, d: raftD }, RAFT_R, 0, fr), null);
  // …but the same arm still hurts a raft that touches it at the surface
  assert.ok(collide(h, { s: 0, d: w + 1.3 - 3.4 - .5 }, RAFT_R, 0, fr)?.hit);
});

test('every raft hit and burst names the trap, the cause, the place and the time', () => {
  const course = RIVER_COURSES[0], T = buildTrack(course), o = {};
  const sim = new RaftSim(T, course);
  const spikes = course.hazards.find(h => h.type === 'spikes');
  T.world((spikes.s + spikes.s1) / 2, spikes.side * (T.at(spikes.s, o).w - RAFT_R), o);
  Object.assign(sim.st, { x: o.wx, z: o.wz, s: (spikes.s + spikes.s1) / 2, inv: 0, vx: 0, vz: 0 });
  const evs = [];
  for (let i = 0; i < 60 * 8 && !evs.some(e => e.k === 'pop'); i++) {
    const st = sim.st; T.at(st.s, o);
    sim.step(1 / 60, i / 60, [{ a: Math.atan2(o.nz * spikes.side, o.nx * spikes.side) + Math.PI - st.yaw, f: true, sp: 0 }], evs);
  }
  const hurt = evs.filter(e => e.k === 'hit' || e.k === 'pop');
  assert.ok(hurt.length >= 2);
  for (const e of hurt) {
    assert.equal(course.hazards[e.id]?.type, e.cause, JSON.stringify(e));
    assert.ok(Number.isFinite(e.s) && Number.isFinite(e.d) && Number.isFinite(e.t), JSON.stringify(e));
    assert.ok(e.s >= spikes.s - RAFT_R && e.s <= spikes.s1 + RAFT_R, `hit at s=${e.s} outside the spikes ${spikes.s}…${spikes.s1}`);
  }
  // a voluntary reset is not blamed on a trap
  const sim2 = new RaftSim(T, course), ev2 = sim2.giveUp([]);
  assert.equal(ev2[0].cause, 'reset');
  assert.equal(ev2[0].id, undefined);
});

test('on foot, a knock names the obstacle, the place and the time', () => {
  const i = PARCOURS.parts.findIndex(p => p.type === 'sweeper'), sw = PARCOURS.parts[i];
  const pl = newPlayer([sw.p[0], 2, sw.p[2] + 5]), ev = [];
  for (let k = 0; k < 360 && !ev.some(e => e.k === 'knock'); k++) stepPlayer(PARCOURS, pl, { mx: 0, mz: 0, jump: false, puff: false }, k / 60, 1 / 60, [], ev);
  const e = ev.find(x => x.k === 'knock');
  assert.ok(e, 'knocked');
  assert.equal(e.i, i);
  assert.equal(e.kind, 'sweeper');
  assert.ok([e.t, e.x, e.y, e.z].every(Number.isFinite));
});

test('the damage journal keeps the latest entries with a readable entity', () => {
  damageLog.length = 0;
  for (let k = 0; k < 70; k++) logDamage({ event: 'hit', cause: 'mine', id: 4, course: 'lagon', t: k, pos: { s: 1, d: 0 }, air: 2 });
  assert.equal(damageLog.length, 60);
  assert.equal(damageLog[0].t, 69);
  assert.equal(damageLog[0].entity, 'Mine n°5');
  assert.equal(hazardName('crush'), 'Mâchoires (écrasement)');
});
