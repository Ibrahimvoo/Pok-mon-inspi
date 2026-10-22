// Authoritative simulation of the team raft (run by the host): current, gas thrust, bank and trap collisions,
// air (raft health), bursting, checkpoints, respawn and finish. Deterministic given the inputs.
import { collide, zoneEffect } from './hazards.js';

export const RAFT_R = 2.2;
export const MAX_AIR = 3;
export const THRUST = 5.6;           // m/s² for one rider
export const SUPER = 5.2;            // instant m/s from a big puff
const DRAG = .85, SPIN_DRAG = .9, BOUNCE = .32, POP_TIME = 2.6, INVUL = 1.6;

const fr = {}, fr2 = {};

export class RaftSim {
  constructor(track, course) {
    this.track = track; this.course = course;
    this.cps = [course.spawn, ...course.checkpoints];
    this.hz = course.hazards.slice().sort((a, b) => a.s - b.s);
    this.st = { x: 0, z: 0, y: 0, vx: 0, vz: 0, yaw: 0, w: 0, air: MAX_AIR, inv: 0, pop: -1, cp: 0, s: 0, d: 0,
      deaths: 0, finished: false, time: 0, bump: 0, lastHit: null };
    this.respawn(0);
  }
  respawn(cp = this.st.cp) {
    const st = this.st, T = this.track;
    const s = this.cps[cp] + (cp === 0 ? 0 : 3);
    T.at(s, fr);
    Object.assign(st, { x: fr.x, z: fr.z, y: fr.y, vx: fr.tx * fr.flow * .5, vz: fr.tz * fr.flow * .5, yaw: fr.a, w: 0,
      air: MAX_AIR, inv: 1.2, pop: -1, cp, s, d: 0 });
  }
  get popped() { return this.st.pop >= 0; }

  // riders: [{ a: local angle on the rim, f: puffing (bool), sp: number of big puffs to apply now }]
  step(dt, t, riders, events = []) {
    const st = this.st, T = this.track;
    if (st.finished) { st.vx *= .9; st.vz *= .9; st.x += st.vx * dt; st.z += st.vz * dt; return events; }
    st.time += dt;
    if (st.pop >= 0) {
      st.pop += dt;
      if (st.pop >= POP_TIME) { this.respawn(); events.push({ k: 'respawn', cp: st.cp }); }
      return events;
    }
    st.inv = Math.max(0, st.inv - dt);
    st.bump = Math.max(0, st.bump - dt);
    const p = T.project(st.x, st.z, st.s);
    st.s = p.s; st.d = p.d;
    T.at(Math.max(0, p.s), fr);

    // --- thrust: every rider pushes from their seat towards (and past) the centre
    let ax = 0, az = 0;
    for (const r of riders) {
      const th = st.yaw + r.a, cx = Math.cos(th), cz = Math.sin(th);
      if (r.f) { ax -= cx * THRUST; az -= cz * THRUST; }
      if (r.sp > 0) { st.vx -= cx * SUPER * r.sp; st.vz -= cz * SUPER * r.sp; st.w += (Math.random() - .5) * .6; }
    }
    const am = Math.hypot(ax, az), cap = THRUST * 1.7;
    if (am > cap) { ax *= cap / am; az *= cap / am; }

    // --- current (with whirlpools and boost lanes)
    const zone = { s: 0, d: 0, spin: 0 };
    for (const h of this.hz) {
      if (h.s - p.s > 14) break;
      if (p.s - h.s > 30) continue;
      zoneEffect(h, p, RAFT_R, zone, t);
    }
    const flow = fr.flow + zone.s;
    const tx = fr.tx * flow + fr.nx * zone.d, tz = fr.tz * flow + fr.nz * zone.d;
    const k = 1 - Math.exp(-DRAG * dt);
    st.vx += (tx - st.vx) * k + ax * dt;
    st.vz += (tz - st.vz) * k + az * dt;
    st.w += zone.spin * dt;
    st.w *= Math.exp(-SPIN_DRAG * dt);
    // a slope speeds the raft down like a water slide
    if (fr.slope < -.02) { st.vx += fr.tx * -fr.slope * 9 * dt; st.vz += fr.tz * -fr.slope * 9 * dt; }

    st.x += st.vx * dt; st.z += st.vz * dt; st.yaw += st.w * dt;

    // --- banks (and the rounded ends of the course)
    const q = T.project(st.x, st.z, st.s);
    T.at(Math.max(0, q.s), fr);
    if (q.s < 0) { // upstream end: a half disc
      const dx = st.x - fr.x, dz = st.z - fr.z, dist = Math.hypot(dx, dz), pen = dist + RAFT_R - fr.w;
      if (pen > 0) this.contact(dx / dist, dz / dist, pen, events);
    } else {
      const pen = Math.abs(q.d) + RAFT_R - fr.w;
      if (pen > 0) { const sg = Math.sign(q.d) || 1; this.contact(fr.nx * sg, fr.nz * sg, pen, events); }
    }

    // --- traps
    q.s = Math.max(q.s, -50);
    for (const h of this.hz) {
      if (h.s - q.s > 12) break;
      if (q.s - (h.s1 ?? h.s) > 12) continue;
      T.at(h.type === 'spikes' ? clampS(q.s, h) : h.s, fr2);
      const c = collide(h, q, RAFT_R, t, fr2);
      if (!c) continue;
      const nx = fr2.tx * c.n[0] + fr2.nx * c.n[1], nz = fr2.tz * c.n[0] + fr2.nz * c.n[1];
      if (c.crush) { this.burst(events, 'crush', h, q, t); return events; }
      this.contact(-nx, -nz, c.depth, events, c.kick);
      if (c.hit && st.inv <= 0) {
        st.air--; st.inv = INVUL; st.lastHit = h.type;
        st.w += (Math.random() < .5 ? -1 : 1) * (2 + Math.random() * 2);
        st.vx += nx * 4.5; st.vz += nz * 4.5;
        // diagnostics: the trap (index in the course), where the raft was on the river and when
        events.push({ k: 'hit', air: st.air, x: st.x - nx * RAFT_R, z: st.z - nz * RAFT_R, cause: h.type, ...this.origin(h, q, t), depth: r2(c.depth) });
        if (st.air <= 0) { this.burst(events, h.type, h, q, t); return events; }
      }
    }

    // --- progress
    st.s = q.s; st.d = q.d; st.y = fr.y;
    const next = this.cps[st.cp + 1];
    if (next != null && st.s >= next) { st.cp++; events.push({ k: 'cp', i: st.cp }); }
    if (st.s >= this.course.finish) { st.finished = true; events.push({ k: 'finish', time: st.time, deaths: st.deaths }); }
    if (!Number.isFinite(st.x + st.z + st.vx + st.vz + st.yaw + st.w)) { this.respawn(); events.push({ k: 'respawn', cp: st.cp }); }
    return events;
  }

  // push out of an obstacle along the outward normal (nx,nz) = direction from the raft centre towards the contact
  contact(nx, nz, depth, events, kick = 0) {
    const st = this.st;
    st.x -= nx * depth; st.z -= nz * depth;
    const vn = st.vx * nx + st.vz * nz;
    if (vn > 0) {
      st.vx -= (1 + BOUNCE) * vn * nx; st.vz -= (1 + BOUNCE) * vn * nz;
      if (vn > 1.6 && st.bump <= 0) { events.push({ k: 'bump', v: vn }); st.bump = .25; }
    }
    if (kick) { st.vx -= nx * kick; st.vz -= nz * kick; }
    // rubbing the rim against the wall makes the raft spin
    const rx = nx * 2.2, rz = nz * 2.2, tx = -nz, tz = nx;
    const slip = (st.vx + st.w * rz) * tx + (st.vz - st.w * rx) * tz;
    const j = -slip * .22;
    st.vx += tx * j * .5; st.vz += tz * j * .5;
    st.w += (rz * tx - rx * tz) * j * 2 / 4.84;
  }

  burst(events, cause, h = null, q = null, t = null) {
    const st = this.st;
    st.pop = 0; st.air = 0; st.deaths++; st.vx = st.vz = 0; st.w = 0;
    events.push({ k: 'pop', x: st.x, z: st.z, cause, deaths: st.deaths, ...(h ? this.origin(h, q, t) : {}) });
  }
  origin(h, q, t) { return { id: this.course.hazards.indexOf(h), s: r2(q.s), d: r2(q.d), t: r2(t) }; }
  // the riders asked to start again from the last checkpoint
  giveUp(events = []) { if (this.st.pop < 0 && !this.st.finished) this.burst(events, 'reset'); return events; }

  // compact network snapshot
  pack() {
    const s = this.st, r = v => Math.round(v * 1000) / 1000;
    return [r(s.x), r(s.z), r(s.y), r(s.yaw), r(s.vx), r(s.vz), r(s.w), s.air, r(s.pop), s.cp, r(s.s), s.deaths, s.finished ? 1 : 0, r(s.time), r(s.inv)];
  }
}
export function unpack(a, o = {}) {
  [o.x, o.z, o.y, o.yaw, o.vx, o.vz, o.w, o.air, o.pop, o.cp, o.s, o.deaths, o.finished, o.time, o.inv] = a;
  o.finished = !!o.finished;
  return o;
}
const clampS = (s, h) => Math.max(h.s, Math.min(h.s1, s));
const r2 = v => Math.round(v * 100) / 100;
