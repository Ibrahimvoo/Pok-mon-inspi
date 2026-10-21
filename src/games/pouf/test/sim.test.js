// Headless checks of the raft simulation: track sanity, bank collisions, traps, checkpoints, bursting and respawn.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTrack } from '../sim/track.js';
import { RaftSim, RAFT_R, MAX_AIR, unpack } from '../sim/raft.js';
import { RIVER_COURSES as COURSES } from '../maps/index.js';

for (const course of COURSES) {
  const T = buildTrack(course);

  test(`${course.id}: course does not overlap itself`, () => {
    let worst = Infinity;
    for (let i = 0; i < T.n; i += 4) for (let j = i + 160; j < T.n; j += 4) {
      const d = Math.hypot(T.x[i] - T.x[j], T.z[i] - T.z[j]) - T.w[i] - T.w[j];
      worst = Math.min(worst, d);
    }
    assert.ok(worst > 14, `banks of distant parts are only ${worst.toFixed(1)} m apart`);
    assert.ok(course.finish < T.length - 5 && course.checkpoints.every((c, i, a) => i === 0 || c > a[i - 1]));
  });

  test(`${course.id}: projection is consistent with the frame`, () => {
    const o = {};
    for (let s = 1; s < T.length - 1; s += 7.3) for (const d of [-3, 0, 2.5]) {
      T.world(s, d, o);
      const p = T.project(o.wx, o.wz, s + 1);
      assert.ok(Math.abs(p.s - s) < .3 && Math.abs(p.d - d) < .3, `s=${s} d=${d} → ${p.s.toFixed(2)} ${p.d.toFixed(2)}`);
    }
  });

  test(`${course.id}: a raft pushed hard sideways never leaves the river`, () => {
    const sim = new RaftSim(T, course);
    const o = {};
    for (let i = 0; i < 60 * 40; i++) {
      // a rider glued to one side puffing non-stop, then the other side
      const side = Math.floor(i / 300) % 2 ? 0 : Math.PI;
      sim.step(1 / 60, i / 60, [{ a: side - sim.st.yaw + T.at(sim.st.s, o).a, f: true, sp: 0 }]);
      if (sim.popped) continue;
      const p = T.project(sim.st.x, sim.st.z, sim.st.s);
      const w = T.at(Math.max(0, p.s), o).w;
      assert.ok(Math.abs(p.d) <= w - RAFT_R + .35, `escaped: d=${p.d.toFixed(2)} w=${w.toFixed(2)} at s=${p.s.toFixed(1)}`);
    }
  });

  test(`${course.id}: an expert pilot reaches every checkpoint and the finish`, () => {
    const sim = new RaftSim(T, course);
    const seen = [], o = {}, fr = {};
    let fin = null, t = 0;
    for (let i = 0; i < 60 * 900 && !fin; i++, t += 1 / 60) {
      const st = sim.st;
      // god mode: the pilot is invincible so the course itself is validated end to end
      st.inv = 1; st.air = MAX_AIR;
      T.at(Math.min(T.length, st.s + 6), o);
      // aim at the centre line a few metres ahead
      T.at(Math.max(0, st.s), fr);
      const tx = o.x - st.x, tz = o.z - st.z, want = Math.atan2(tz, tx);
      const evs = sim.step(1 / 60, t, [{ a: want + Math.PI - st.yaw, f: true, sp: 0 }]);
      for (const e of evs) { if (e.k === 'cp') seen.push(e.i); if (e.k === 'finish') fin = e; }
    }
    assert.deepEqual(seen, course.checkpoints.map((_, i) => i + 1));
    assert.ok(fin, 'finish reached');
    assert.ok(fin.time > 40 && fin.time < 400, `time ${fin.time}`);
  });

  test(`${course.id}: spikes hurt, three hits burst the raft, respawn at the last checkpoint`, () => {
    const sim = new RaftSim(T, course);
    const o = {};
    // the longest strip on level water (spikes lining a waterfall are passed too fast to be hit three times)
    const spikes = course.hazards.filter(h => h.type === 'spikes' && Math.abs(T.at((h.s + h.s1) / 2, o).slope) < .05)
      .sort((a, b) => (b.s1 - b.s) - (a.s1 - a.s))[0];
    const cp = course.checkpoints.filter(c => c < spikes.s).length;
    assert.ok(cp > 0);
    sim.st.cp = cp;
    T.world((spikes.s + spikes.s1) / 2, spikes.side * (T.at(spikes.s, o).w - RAFT_R), o);
    Object.assign(sim.st, { x: o.wx, z: o.wz, s: (spikes.s + spikes.s1) / 2, inv: 0, vx: 0, vz: 0 });
    const evs = [];
    for (let i = 0; i < 60 * 8; i++) {
      // keep pushing into the spikes
      const st = sim.st; T.at(st.s, o);
      const into = Math.atan2(o.nz * spikes.side, o.nx * spikes.side);
      sim.step(1 / 60, i / 60, [{ a: into + Math.PI - st.yaw, f: true, sp: 0 }], evs);
      if (evs.some(e => e.k === 'respawn')) break;
    }
    assert.equal(evs.filter(e => e.k === 'hit').length, MAX_AIR);
    assert.ok(evs.some(e => e.k === 'pop'));
    assert.ok(evs.some(e => e.k === 'respawn'));
    assert.equal(sim.st.air, MAX_AIR);
    assert.equal(sim.st.deaths, 1);
    assert.ok(Math.abs(sim.st.s - (course.checkpoints[cp - 1] + 3)) < 1.5, `respawned at s=${sim.st.s}`);
  });

  test(`${course.id}: snapshots round-trip`, () => {
    const sim = new RaftSim(T, course);
    sim.step(1 / 60, 0, []);
    const u = unpack(JSON.parse(JSON.stringify(sim.pack())));
    assert.ok(Math.abs(u.x - sim.st.x) < .01 && u.air === sim.st.air && u.cp === sim.st.cp);
  });
}

test('jaws crush a raft caught between them', () => {
  const course = COURSES[0], T = buildTrack(course);
  const sim = new RaftSim(T, course);
  const jaw = course.hazards.find(h => h.type === 'jaws');
  const o = {};
  T.world(jaw.s, 0, o);
  // moment the slabs start to close
  const t0 = jaw.period * (.5 - (jaw.phase || 0));
  Object.assign(sim.st, { x: o.wx, z: o.wz, s: jaw.s, vx: 0, vz: 0, inv: 5 });
  const evs = [];
  for (let i = 0; i < 60; i++) { sim.st.vx = sim.st.vz = 0; sim.step(1 / 60, t0 + i / 60, [], evs); if (evs.some(e => e.k === 'pop')) break; }
  assert.ok(evs.some(e => e.k === 'pop' && e.cause === 'crush'));
});
