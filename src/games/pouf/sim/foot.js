// On-foot physics for the obstacle races and survival arenas. Every moving part is a pure function of the
// match time t; each player simulates their own critter (client side) against the same deterministic level.
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const wave = (p, t) => { const u = (((t / (p.period || 4)) + (p.phase || 0)) % 1 + 1) % 1; return .5 - .5 * Math.cos(u * TAU); };

export const PR = .45, PH = 1.5;                 // player capsule radius and height
// the feet keep standing on a top while the centre is up to FOOT outside it (about the rounded rim drawn round every
// platform): without it a player crossing the thin seam between two platforms that look joined fell into the water
export const FOOT = .25;
export const RUN = 7.2, ACCEL = 42, AIR_ACCEL = 16, GRAVITY = 30, JUMP = 11.2, PUFF_JUMP = 10, PUFF_PUSH = 7;

// ---------------------------------------------------------------- level parts at time t
// Every part gives its pose at t; solids also give their velocity (to carry or push players).
export function partPose(part, t, o = {}) {
  const [x, y, z] = part.p;
  o.x = x; o.y = y; o.z = z; o.vx = 0; o.vy = 0; o.vz = 0; o.yaw = part.yaw || 0; o.w = 0;
  if (part.move) {
    const k = wave(part, t), k2 = wave(part, t + .02);
    o.x += part.move[0] * k; o.y += part.move[1] * k; o.z += part.move[2] * k;
    o.vx = part.move[0] * (k2 - k) / .02; o.vy = part.move[1] * (k2 - k) / .02; o.vz = part.move[2] * (k2 - k) / .02;
  }
  if (part.spin) { o.w = part.spin; o.yaw += part.spin * t + (part.phase || 0) * TAU; }
  return o;
}
// a sinking floor tile: gone (deep) during part of its cycle; warns by shaking just before
const WARN = .12;                                // fraction of the cycle spent shaking before going down
// position in the tile's cycle, or -1 while it simply stays up. A tile whose phase puts it under water (or past the
// start of its warning) when the cycles start stays up until its next warning: such tiles used to vanish instantly,
// with no shaking, under the players standing on them.
function sinkU(part, t) {
  const k = part.sink, start = k.start || 0;
  if (t < start) return -1;
  const on = k.on ?? .5, w0 = Math.max(0, on - WARN), u0 = ((k.phase || 0) % 1 + 1) % 1, e = (t - start) / k.period;
  if (u0 > w0 && u0 + e < 1 + w0) return -1;
  return ((u0 + e) % 1 + 1) % 1;
}
export function sinkDepth(part, t) {
  if (!part.sink) return 0;
  const u = sinkU(part, t), on = part.sink.on ?? .5;   // on: fraction of the cycle spent above water
  if (u < on) return 0;
  if (u < on + .08) return ((u - on) / .08) * 6;
  if (u < .92) return 6;
  return (1 - (u - .92) / .08) * 6;
}
export function sinkWarning(part, t) {
  if (!part.sink) return 0;
  const u = sinkU(part, t), on = part.sink.on ?? .5;
  return u >= 0 && u > on - WARN && u < on ? 1 : 0;
}
export const hammerAngle = (h, t) => (h.amp ?? 1.1) * Math.sin(TAU * t / (h.period || 3) + (h.phase || 0) * TAU);
export const sweeperAngle = (s, t, level) => (s.phase || 0) * TAU + t * s.speed * (1 + (level?.accel || 0) * t);

// ---------------------------------------------------------------- player step
// pl: { x,y,z, vx,vy,vz, yaw, ground (part index or -1), coyote, stun, jumpLock, puffs, gas, t (time of the last step) }
// inp: { mx, mz (world direction wanted, length ≤ 1), jump (edge), puff (edge) }
// others: [{x,y,z}] other players (to shove them)
const P0 = {};
export function stepPlayer(level, pl, inp, t, dt, others = [], ev = []) {
  const parts = level.parts, P = {};
  pl.stun = Math.max(0, pl.stun - dt);
  pl.coyote = Math.max(0, pl.coyote - dt);
  pl.jumpLock = Math.max(0, pl.jumpLock - dt);
  pl.gas = Math.min(1, pl.gas + dt * .35);
  // ride the platform we stand on: follow its exact motion since the previous step (after a long frame or a clock
  // correction the obstacles' time jumps further than dt, and velocity × dt used to leave the player behind)
  const t0 = pl.t ?? t - dt;
  pl.t = t;
  if (pl.ground >= 0) {
    const part = parts[pl.ground];
    partPose(part, t0, P0); partPose(part, t, P);
    // rotate round the platform's centre, then move with it
    const a = P.yaw - P0.yaw, dx = pl.x - P0.x, dz = pl.z - P0.z, c = Math.cos(a), s = Math.sin(a);
    pl.x = P.x + dx * c + dz * s; pl.z = P.z - dx * s + dz * c; pl.yaw += a;
    pl.y += P.y - P0.y;
    if (part.conveyor) { pl.x += part.conveyor[0] * dt; pl.z += part.conveyor[1] * dt; }
  }
  // steering
  const ctrl = pl.stun > 0 ? .15 : 1;
  const want = Math.hypot(inp.mx, inp.mz);
  const tvx = inp.mx * RUN, tvz = inp.mz * RUN;
  const ice = pl.ground >= 0 && parts[pl.ground].ice;
  const acc = (pl.ground >= 0 ? (ice ? ACCEL * .22 : ACCEL) : AIR_ACCEL) * ctrl * dt;
  const dvx = tvx - pl.vx, dvz = tvz - pl.vz, dl = Math.hypot(dvx, dvz);
  if (dl > 0) { const k = Math.min(1, acc / dl); pl.vx += dvx * k; pl.vz += dvz * k; }
  if (want > .1 && pl.stun <= 0) pl.yaw = Math.atan2(inp.mx, inp.mz);
  // jump (with a little coyote time) and the mid-air gas puff
  if (inp.jump && pl.stun <= 0 && (pl.ground >= 0 || pl.coyote > 0) && pl.jumpLock <= 0) {
    pl.vy = JUMP; pl.ground = -1; pl.coyote = 0; pl.jumpLock = .2; ev.push({ k: 'jump' });
  } else if (inp.puff && pl.stun <= 0 && pl.gas >= .5) {
    pl.gas -= .5; pl.vy = Math.max(pl.vy, PUFF_JUMP);
    const fx = Math.sin(pl.yaw), fz = Math.cos(pl.yaw);
    pl.vx += fx * PUFF_PUSH; pl.vz += fz * PUFF_PUSH;
    pl.ground = -1; pl.puffs++; ev.push({ k: 'puff' });
  }
  pl.vy -= GRAVITY * dt;
  pl.vy = Math.max(pl.vy, -40);
  pl.x += pl.vx * dt; pl.y += pl.vy * dt; pl.z += pl.vz * dt;

  // ---- collisions with the level
  const wasGround = pl.ground;
  pl.ground = -1;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.type === 'box' || part.type === 'disc') collideSolid(part, i, pl, t, P, ev);
    else if (part.type === 'sweeper') collideSweeper(part, pl, t, ev, level, i);
    else if (part.type === 'hammer') collideHammer(part, pl, t, ev, i);
    else if (part.type === 'bumper') collideBumper(part, pl, t, P, ev, i);
  }
  if (pl.ground >= 0) { pl.coyote = .12; if (wasGround < 0 && pl.vy <= 0) ev.push({ k: 'land' }); }
  else if (wasGround >= 0) pl.coyote = .12;
  // friction on the ground when not steering
  if (pl.ground >= 0 && want < .1) { const k = Math.exp((parts[pl.ground].ice ? -.8 : -10) * dt); pl.vx *= k; pl.vz *= k; }
  // shove the others
  for (const o of others) {
    const dx = pl.x - o.x, dz = pl.z - o.z, d = Math.hypot(dx, dz);
    if (d > 0 && d < PR * 2 && Math.abs(pl.y - o.y) < PH * .8) {
      const push = (PR * 2 - d) / 2;
      pl.x += dx / d * push; pl.z += dz / d * push;
      pl.vx += dx / d * 2.2; pl.vz += dz / d * 2.2;
    }
  }
  return ev;
}

function landOn(pl, i, top) { pl.y = top; if (pl.vy < 0) pl.vy = 0; pl.ground = i; }

function collideSolid(part, i, pl, t, P, ev) {
  partPose(part, t, P);
  const sink = sinkDepth(part, t);
  if (sink >= 5.9) return;
  if (part.type === 'disc') {
    const top = P.y + part.h / 2 - sink, bot = P.y - part.h / 2 - sink;
    const dx = pl.x - P.x, dz = pl.z - P.z, d = Math.hypot(dx, dz);
    if (pl.y > top + .05 || pl.y + PH < bot) return;
    if (d < part.r + FOOT && pl.y > top - .6 && pl.vy <= .5) { landOn(pl, i, top); return; }
    if (d < part.r + PR && d > 0) {
      if (pl.y + PH > bot + .05 && pl.y < top - .05) { const push = part.r + PR - d; pl.x += dx / d * push; pl.z += dz / d * push; }
    }
    return;
  }
  // box with a yaw rotation: work in its local frame
  const hw = part.s[0] / 2, hh = part.s[1] / 2, hd = part.s[2] / 2;
  const top = P.y + hh - sink, bot = P.y - hh - sink;
  if (pl.y > top + .05 || pl.y + PH < bot) return;
  const c = Math.cos(P.yaw), s = Math.sin(P.yaw);
  const rx = pl.x - P.x, rz = pl.z - P.z;
  const lx = rx * c - rz * s, lz = rx * s + rz * c;
  const inside = Math.abs(lx) <= hw && Math.abs(lz) <= hd;
  // landing on top (the feet reach FOOT beyond the centre)
  if (Math.hypot(lx - clamp(lx, -hw, hw), lz - clamp(lz, -hd, hd)) < FOOT && pl.y > top - .6 && pl.vy <= .5) {
    landOn(pl, i, top);
    if (part.bounce) { pl.vy = part.bounce; pl.ground = -1; ev.push({ k: 'boing' }); }
    return;
  }
  // head under the box
  if (inside && pl.vy > 0 && pl.y + PH > bot && pl.y < bot) { pl.vy = 0; pl.y = bot - PH; return; }
  // sides: circle against rectangle in the local frame
  if (pl.y + PH <= bot + .05 || pl.y >= top - .05) return;
  const qx = clamp(lx, -hw, hw), qz = clamp(lz, -hd, hd);
  let nx = lx - qx, nz = lz - qz, d = Math.hypot(nx, nz);
  if (d >= PR) return;
  if (d < 1e-5) { // centre inside: leave by the nearest side
    const ex = hw - Math.abs(lx), ez = hd - Math.abs(lz);
    if (ex < ez) { nx = Math.sign(lx) || 1; nz = 0; d = -ex; } else { nx = 0; nz = Math.sign(lz) || 1; d = -ez; }
  } else { nx /= d; nz /= d; }
  const push = PR - d;
  const wx = nx * c + nz * s, wz = -nx * s + nz * c;
  pl.x += wx * push; pl.z += wz * push;
  const vn = pl.vx * wx + pl.vz * wz;
  if (vn < 0) { pl.vx -= vn * wx; pl.vz -= vn * wz; }
  if (part.move) { pl.vx += Math.max(0, P.vx * wx + P.vz * wz) * wx; pl.vz += Math.max(0, P.vx * wx + P.vz * wz) * wz; }
}

// diagnostics: `i` is the obstacle's index in the level, `t` the obstacles' time, x/y/z where the critter was hit
function knock(pl, nx, nz, power, up, ev, kind, i = -1, t = 0) {
  if (pl.stun > .25) return;
  const l = Math.hypot(nx, nz) || 1, r2 = v => Math.round(v * 100) / 100;
  pl.vx = nx / l * power; pl.vz = nz / l * power; pl.vy = Math.max(pl.vy, up);
  pl.ground = -1; pl.stun = .7;
  ev.push({ k: 'knock', kind, i, t: r2(t), x: r2(pl.x), y: r2(pl.y), z: r2(pl.z) });
}
function collideSweeper(sw, pl, t, ev, level, i) {
  const [cx, cy, cz] = sw.p, a0 = sweeperAngle(sw, t, level), r = sw.r ?? .4, arms = sw.arms ?? 1;
  if (pl.y > cy + r || pl.y + PH < cy - r) return;
  if (sw.start != null && t < sw.start) return;
  // full bars cross the centre (spaced by π/arms); half bars radiate from it (spaced by 2π/arms)
  const step = sw.half ? TAU / arms : Math.PI / arms;
  for (let k = 0; k < arms; k++) {
    const a = a0 + k * step;
    const dx = Math.cos(a), dz = Math.sin(a);
    // bar from -len to +len through the centre (or 0..len for a single arm)
    const lo = sw.half ? 0 : -sw.len;
    const u = clamp((pl.x - cx) * dx + (pl.z - cz) * dz, lo, sw.len);
    const qx = cx + dx * u, qz = cz + dz * u, ex = pl.x - qx, ez = pl.z - qz, d = Math.hypot(ex, ez);
    if (d < PR + r) {
      // pushed along the bar's motion (perpendicular to it), faster at the tip
      const dir = Math.sign(sw.speed) || 1, tx = -dz * dir * Math.sign(u || 1), tz = dx * dir * Math.sign(u || 1);
      const sp = Math.max(7, Math.abs(sw.speed * u) * 1.4);
      knock(pl, tx * .8 + ex * .2, tz * .8 + ez * .2, sp, 6.5, ev, 'sweeper', i, t);
      return;
    }
  }
}
function collideHammer(hm, pl, t, ev, i) {
  const [px, py, pz] = hm.p, a = hammerAngle(hm, t), L = hm.len ?? 4, r = hm.r ?? .9;
  // swing plane: across the path (axis 'z' swings along x)
  const along = hm.axis === 'x';
  const hx = px + (along ? 0 : Math.sin(a) * L), hz = pz + (along ? Math.sin(a) * L : 0), hy = py - Math.cos(a) * L;
  const cy = clamp(hy, pl.y + PR, pl.y + PH - PR);
  const ex = pl.x - hx, ey = cy - hy, ez = pl.z - hz, d = Math.hypot(ex, ey, ez);
  if (d < PR + r) {
    const sv = Math.cos(a) * Math.sign(hammerAngle(hm, t + .02) - a || 1);
    knock(pl, along ? ex * .3 : sv * 3 + ex * .3, along ? sv * 3 + ez * .3 : ez * .3, 13, 7, ev, 'hammer', i, t);
  }
}
function collideBumper(b, pl, t, P, ev, i) {
  partPose(b, t, P);
  const x = P.x, y = P.y, z = P.z, dx = pl.x - x, dz = pl.z - z, d = Math.hypot(dx, dz);
  if (pl.y > y + b.h || pl.y + PH < y) return;
  if (d < b.r + PR && d > 0) {
    pl.x = x + dx / d * (b.r + PR); pl.z = z + dz / d * (b.r + PR);
    knock(pl, dx, dz, 13, 5, ev, 'bumper', i, t);
  }
}

// checkpoint / finish zones (axis aligned boxes around p with size s)
export function inZone(z, pl) {
  return Math.abs(pl.x - z.p[0]) <= z.s[0] / 2 && Math.abs(pl.z - z.p[2]) <= z.s[2] / 2 && pl.y >= z.p[1] - 1 && pl.y <= z.p[1] + z.s[1];
}
export function newPlayer(spawn) {
  return { x: spawn[0], y: spawn[1], z: spawn[2], vx: 0, vy: 0, vz: 0, yaw: spawn[3] || 0, ground: -1, coyote: 0, stun: 0, jumpLock: 0, puffs: 0, gas: 1, t: null };
}
