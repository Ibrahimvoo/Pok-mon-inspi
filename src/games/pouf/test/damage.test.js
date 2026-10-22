// Damage must always come from something the players can see, and be traceable (trap, cause, place, time).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTrack } from '../sim/track.js';
import { RaftSim, RAFT_R } from '../sim/raft.js';
import { collide, millAngle, millSpans, barHeight, crocBite, MILL_TOP, MILL_FLOOR, TUBE_TOP, SEAT_R } from '../sim/hazards.js';
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

test('each hammer bar is drawn where it hits (it used to be drawn at the last trap of the course)', async () => {
  const THREE = await import('three');
  const { createTraps } = await import('../view/props.js');
  const v = new THREE.Vector3();
  for (const course of RIVER_COURSES) {
    const T = buildTrack(course), traps = createTraps(T, course), fr = {};
    const bars = course.hazards.filter(h => h.type === 'bar');
    for (const h of bars) {
      // when the bar is down, some trap geometry lies on the river line of the bar, low over the water, across the river
      const t = [...Array(400).keys()].map(k => k * h.period / 400).find(x => barHeight(h, x) < .6);
      traps.update(t); traps.root.updateMatrixWorld(true); T.at(h.s, fr);
      let near = 0;
      traps.root.traverse(m => {
        if (!m.isMesh) return;
        const p = m.geometry.attributes.position;
        for (let i = 0; i < p.count; i += 7) {
          v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
          const ds = (v.x - fr.x) * fr.tx + (v.z - fr.z) * fr.tz, dd = (v.x - fr.x) * fr.nx + (v.z - fr.z) * fr.nz;
          if (Math.abs(ds) < 1.2 && Math.abs(dd) < fr.w - 1 && v.y - fr.y < 1.8 && v.y - fr.y > -.5) near++;
        }
      });
      assert.ok(near > 50, `${course.id} bar at s=${h.s}: nothing drawn there while it is down`);
    }
  }
});

test('arms and bars above the tube only hurt a rider sitting under them, never an empty part of the rim', () => {
  const fr = { w: 7 }, R = RAFT_R;
  // bar half way up (riders' height): no rider under it → nothing; a rider under it → hit
  const bar = { type: 'bar', s: 0, period: 4 };
  const tHigh = [...Array(800).keys()].map(k => k * 4 / 800).find(x => barHeight(bar, x) > 1.4 && barHeight(bar, x) < 1.9);
  assert.equal(collide(bar, { s: -2.4, d: 0, seats: [[-SEAT_R, 0]] }, R, tHigh, fr), null);
  assert.ok(collide(bar, { s: -2.4, d: 0, seats: [[SEAT_R, 0]] }, R, tHigh, fr)?.hit);
  // bar down on the water: the whole raft
  const tLow = [...Array(800).keys()].map(k => k * 4 / 800).find(x => barHeight(bar, x) < .6);
  assert.ok(collide(bar, { s: -2.4, d: 0, seats: [] }, R, tLow, fr)?.hit);
  // a mill arm passing just over the tube (between the tube and the riders' heads), above an empty part of the rim
  const mill = { type: 'mill', s: 0, side: 1, speed: 0, phase: 0 };
  const a = Math.asin((1.2 - 3.4) / 7.2);   // the tip at 1.2 m above the water
  mill.phase = (Math.PI + a + Math.PI) / TAU % 1;
  const [span] = millSpans(mill, fr.w, 0, [], MILL_TOP, TUBE_TOP);
  assert.ok(span, 'arm in the riders band');
  const tipD = Math.min(...span), raftD = tipD - R + .3;
  assert.equal(collide(mill, { s: 0, d: raftD, seats: [[0, -SEAT_R]] }, R, 0, fr), null);
  assert.ok(collide(mill, { s: 0, d: raftD, seats: [[0, SEAT_R]] }, R, 0, fr)?.hit);
});

test('spike rows, crocodiles and turnstiles hurt only where they are drawn', () => {
  const fr = { w: 6 }, R = RAFT_R;
  // 1 m past the end of a spike row, against the bank: the row is drawn up to .15 m past its end
  const sp = { type: 'spikes', s: 10, s1: 20, side: 1 };
  assert.ok(collide(sp, { s: 15, d: fr.w - .7 - R + .2 }, R, 0, fr)?.hit);
  assert.equal(collide(sp, { s: 21.3, d: fr.w - .7 - R + .2 }, R, 0, fr), null);
  // a crocodile is long and narrow: a raft beside its head (no part of the model within reach) is not bitten
  const croc = { type: 'croc', s: 0, d: 0, period: 4, r: 1.1 };
  const bite = [...Array(400).keys()].map(k => k * 4 / 400).find(x => crocBite(croc, x) > .9);
  assert.equal(collide(croc, { s: 0, d: R + .9 }, R, bite, fr), null);
  assert.ok(collide(croc, { s: -2 - R + .2, d: 0 }, R, bite, fr)?.hit, 'snout');
  // the turnstile log has flat ends: a raft facing its tip a little past the end is untouched
  const ts = { type: 'turnstile', s: 0, d: 0, len: 2.8, speed: 0, phase: 0 };
  assert.equal(collide(ts, { s: 2.8 + R + .2, d: .44 }, R, 0, fr), null);
  assert.ok(collide(ts, { s: 2.8 + R - .2, d: 0 }, R, 0, fr)?.hit);
});
