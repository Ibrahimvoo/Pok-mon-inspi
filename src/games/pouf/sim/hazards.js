// Traps of the river courses. Every moving part is a pure function of the match time t, so the host and
// every client compute exactly the same positions without sending them over the network.
// Positions are given in track coordinates: s (metres along the river) and d (lateral, > 0 = left bank).
const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = u => u * u * (3 - 2 * u);
const phase = (h, t) => (((t + (h.phase || 0) * h.period) % h.period) + h.period) % h.period / h.period;

// Jaws: two studded slabs that slam shut across the channel. Returns the closure 0 (open) … 1 (shut).
export function jawsClosure(h, t) {
  const u = phase(h, t);
  if (u < .5) return 0;                    // open
  if (u < .6) return ease((u - .5) / .1);  // slamming
  if (u < .75) return 1;                   // shut
  return 1 - ease((u - .75) / .25);        // reopening
}
// Hammer bar: a spiked log that drops onto the water then rises again. Returns its height above the water.
export function barHeight(h, t) {
  const u = phase(h, t), up = h.up ?? 4.6, down = .55;
  if (u < .55) return up;
  if (u < .62) { const k = (u - .55) / .07; return up - (up - down) * k * k; }
  if (u < .74) return down;
  return down + (up - down) * ease((u - .74) / .26);
}
export const millAngle = (h, t) => (h.phase || 0) * TAU + t * h.speed;
// Geyser: 0 (calm) … 1 (full eruption)
export function geyserPower(h, t) {
  const u = phase(h, t);
  if (u < .62) return 0;
  if (u < .7) return ease((u - .62) / .08);
  if (u < .86) return 1;
  return 1 - ease((u - .86) / .14);
}
// Crocodile jaws: 0 open … 1 snapped shut
export function crocBite(h, t) {
  const u = phase(h, t);
  if (u < .7) return 0;
  if (u < .76) return ease((u - .7) / .06);
  if (u < .84) return 1;
  return 1 - ease((u - .84) / .16);
}
export const sway = (h, t) => (h.d || 0) + (h.amp || 0) * Math.sin(TAU * t / (h.period || 4) + (h.phase || 0) * TAU);

// Mill arms (vertical rotation across the channel) that dip below the riders: lateral spans touching the raft.
// Only the part of an arm between the riders' heads (MILL_TOP) and just under the surface (MILL_FLOOR, the depth of
// the raft) can touch it. The part plunged deeper is hidden by the water: it used to count too, so a raft floating
// above a submerged arm lost air with nothing visible touching it.
export const MILL_TOP = 1.7, MILL_FLOOR = -.3;
// Heights on the raft: up to TUBE_TOP above the water the tube is at least RAFT_R wide; higher up there are only the riders,
// seated SEAT_R from the centre and about RIDER_R wide. An arm or a bar passing at their height over an empty part of the
// rim touches nothing (it used to count as a hit on the whole raft disc).
export const TUBE_TOP = .6, RIDER_R = .45, SEAT_R = 1.58;
// the hammer bar (drawn .2 higher, spikes reaching .9 under its axis every ~2 m) clearly reaches the tube under BAR_LOW
const BAR_LOW = TUBE_TOP + .5, SPIKE_END = .15;
export function millSpans(h, w, t, out = [], top = MILL_TOP, floor = MILL_FLOOR) {
  out.length = 0;
  const dh = h.side * (w + 1.3), L = h.len ?? 7.2, H = h.hub ?? 3.4, n = h.arms ?? 4;
  const a0 = millAngle(h, t);
  for (let i = 0; i < n; i++) {
    const a = a0 + i * TAU / n, c = Math.cos(a), sn = Math.sin(a);
    if (sn >= 0 || H + L * sn > top) continue;                 // arm entirely above the band
    // height along the arm: y(u) = H + L·u·sn for u ∈ [0, 1] (hub → tip), decreasing since sn < 0
    const u0 = clamp((top - H) / (L * sn), 0, 1), u1 = clamp((floor - H) / (L * sn), 0, 1);
    if (u1 <= u0) continue;
    out.push([dh + u0 * L * c, dh + u1 * L * c]);
  }
  return out;
}

const spans = [];
// the rider (seat offsets [s, d] from the raft centre in sd.seats) closest to the lateral line s = 0 within reach, or null
function riderUnder(sd, ds, reach) {
  let best = null;
  for (const o of sd.seats || []) { const e = Math.abs(ds + o[0]); if (e < reach && (!best || e < best.e)) best = { e, o }; }
  return best;
}
// Collision of the raft circle (radius R) with hazard h. sd = raft position in track coordinates (with the riders'
// seats), fr = track frame at h.s. Returns null or { n:[s,d] push direction, depth, hit (damage), crush, kick (extra speed) }.
export function collide(h, sd, R, t, fr) {
  const ds = sd.s - h.s;
  switch (h.type) {
    case 'spikes': {
      // the logs run from s to s1 (drawn .15 m longer at each end); past an end only its corner can touch the raft
      // (the row used to act as an endless wall up to 1.3 m beyond its ends)
      const a = h.s - SPIKE_END, b = h.s1 + SPIKE_END;
      if (sd.s < a - R || sd.s > b + R) return null;
      const lim = fr.w - (h.inset ?? .7), vd = h.side * sd.d - lim, vs = sd.s - clamp(sd.s, a, b);
      if (!vs) { const pen = vd + R; return pen > 0 ? { n: [0, -h.side], depth: pen, hit: true } : null; }
      const ed = Math.min(0, vd), dist = Math.hypot(vs, ed);
      return dist < R ? { n: [vs / dist, h.side * ed / dist], depth: R - dist, hit: true } : null;
    }
    case 'croc': {
      // the crocodile is long and narrow: its head points upstream (snout up to 2.15·k ahead of the pivot), its back
      // ends 3.2·k behind it, about .6·k wide (k = r / 1.1, the scale of the model). Only the jaws bite, when they snap.
      const k = h.r / 1.1, cd = sway(h, t), dd = sd.d - cd, qs = clamp(ds, -1.6 * k, 2.6 * k), vs = ds - qs, dist = Math.hypot(vs, dd);
      const pen = R + .6 * k - dist;
      if (pen <= 0) return null;
      const hit = qs <= .3 * k && crocBite(h, t) > .6;
      return { n: dist > 1e-4 ? [vs / dist, dd / dist] : [-1, 0], depth: pen, hit, kick: hit ? 3 : 0 };
    }
    case 'rock': case 'post': case 'mine': case 'saw': {
      if (Math.abs(ds) > R + h.r + 1) return null;
      const cd = h.type === 'rock' || h.type === 'post' ? h.d : sway(h, t);
      const dd = sd.d - cd, dist = Math.hypot(ds, dd), pen = R + h.r - dist;
      if (pen <= 0) return null;
      const k = dist > 1e-4 ? 1 / dist : 0;
      const hit = h.type === 'mine' || h.type === 'saw';
      return { n: dist > 1e-4 ? [ds * k, dd * k] : [-1, 0], depth: pen, hit };
    }
    case 'turnstile': { // a spiked log turning flat on the water round a post
      const L = h.len ?? 4, r = h.r ?? .45;
      if (Math.abs(ds) > L + R + r) return null;
      const a = (h.phase || 0) * TAU + t * (h.speed ?? 1), c = Math.cos(a), sn = Math.sin(a);
      // seen from above the log is a flat-ended 2L × 2r rectangle (it used to have rounded ends reaching r further)
      const dd = sd.d - (h.d || 0), u = ds * c + dd * sn, v = -ds * sn + dd * c;
      const eu = u - clamp(u, -L, L), ev = v - clamp(v, -r, r), dist = Math.hypot(eu, ev);
      if (dist >= R) {
        // the central post is solid and bow-shaped, so the current slides a raft past it instead of pinning it
        const post = Math.hypot(ds, dd), bd = dd + (dd < 0 ? -.8 : .8), bl = Math.hypot(ds, bd);
        return post < R + .6 ? { n: [ds / bl, bd / bl], depth: R + .6 - post, hit: false } : null;
      }
      const n = dist > 1e-4 ? [(eu * c - ev * sn) / dist, (eu * sn + ev * c) / dist] : v >= 0 ? [-sn, c] : [sn, -c];
      return { n, depth: dist > 1e-4 ? R - dist : R + r - Math.abs(v), hit: true, kick: 2 };
    }
    case 'log': { // a floating trunk along the current, drifting across the river
      const half = (h.len ?? 4.5) / 2, r = h.r ?? .5;
      if (Math.abs(ds) > half + R + r) return null;
      const cd = sway(h, t), qs = clamp(ds, -half, half), vs = ds - qs, vd = sd.d - cd, dist = Math.hypot(vs, vd);
      if (dist >= R + r) return null;
      return { n: dist > 1e-4 ? [vs / dist, vd / dist] : [0, 1], depth: R + r - dist, hit: false };
    }
    case 'jaws': {
      const th = (h.thick ?? 1.3) / 2;
      if (Math.abs(ds) > th + R) return null;
      const c = jawsClosure(h, t), e = fr.w * (1 - c) + .05;   // inner edge of each slab
      // closest point of each slab box: s ∈ [-th, th], |d| ≥ e
      let best = null;
      for (const side of [1, -1]) {
        const qs = clamp(ds, -th, th), qd = side > 0 ? Math.max(sd.d, e) : Math.min(sd.d, -e);
        const vs = ds - qs, vd = sd.d - qd, dist = Math.hypot(vs, vd);
        const inside = Math.abs(ds) <= th && side * sd.d >= e;
        if (!inside && dist >= R) continue;
        const pen = inside ? R + side * sd.d - e : R - dist;
        const n = inside ? [0, -side] : [vs / dist, vd / dist];
        if (!best || pen > best.depth) best = { n, depth: pen, hit: false };
      }
      // squeezed between the two slabs while they close: the raft bursts
      if (best && c > .35 && Math.abs(ds) < th + R * .5 && 2 * e < 2 * R * .9 && jawsClosure(h, t + .05) >= c) best.crush = true;
      return best;
    }
    case 'bar': {
      const y = barHeight(h, t), r = h.r ?? .55;
      if (y > 2.1 || Math.abs(ds) > R + r) return null;
      // low enough to reach the tube: the whole raft; higher: only a rider sitting under it
      if (y < BAR_LOW) return { n: [ds >= 0 ? 1 : -1, 0], depth: R + r - Math.abs(ds), hit: true, kick: 3 };
      const u = riderUnder(sd, ds, RIDER_R + r);
      return u ? { n: [ds + u.o[0] >= 0 ? 1 : -1, 0], depth: RIDER_R + r - u.e, hit: true, kick: 3 } : null;
    }
    case 'mill': {
      if (Math.abs(ds) > R + 1.2) return null;
      const r = h.r ?? .5;
      // the part of an arm at the height of the tube touches the raft disc…
      millSpans(h, fr.w, t, spans, TUBE_TOP);
      for (const [a, b] of spans) {
        const lo = Math.min(a, b), hi = Math.max(a, b), qd = clamp(sd.d, lo, hi);
        const dist = Math.hypot(ds, sd.d - qd);
        if (dist < R + r) return { n: dist > 1e-4 ? [ds / dist, (sd.d - qd) / dist] : [1, 0], depth: R + r - dist, hit: true, kick: 2 };
      }
      // …the part above it only the riders
      millSpans(h, fr.w, t, spans, MILL_TOP, TUBE_TOP);
      for (const [a, b] of spans) {
        const lo = Math.min(a, b), hi = Math.max(a, b);
        for (const o of sd.seats || []) {
          const es = ds + o[0], ed = sd.d + o[1] - clamp(sd.d + o[1], lo, hi), dist = Math.hypot(es, ed);
          if (dist < RIDER_R + r) return { n: dist > 1e-4 ? [es / dist, ed / dist] : [1, 0], depth: RIDER_R + r - dist, hit: true, kick: 2 };
        }
      }
      return null;
    }
  }
  return null;
}

// Zones that change the water without hurting: whirlpools spin the raft, boost lanes speed it up.
export function zoneEffect(h, sd, R, out, t) {
  const ds = sd.s - h.s;
  if (h.type === 'whirl') {
    const dd = sd.d - h.d, dist = Math.hypot(ds, dd);
    if (dist > h.r) return false;
    const k = (1 - dist / h.r) * (h.strength ?? 3);
    // tangential current around the centre, pulling slightly inwards
    out.s += (-dd / (dist || 1)) * k * h.dir - ds / (dist || 1) * k * .25;
    out.d += (ds / (dist || 1)) * k * h.dir - dd / (dist || 1) * k * .25;
    out.spin += k * .45 * h.dir;
    return true;
  }
  if (h.type === 'geyser') {
    const p = geyserPower(h, t);
    const dd = sd.d - h.d, dist = Math.hypot(ds, dd), r = (h.r ?? 1.8) + R;
    if (p <= 0 || dist > r) return false;
    // the eruption shoves the raft away from its centre and spins it
    const k = p * (1 - dist / r) * (h.power ?? 14);
    out.s += (dist > .01 ? ds / dist : 1) * k; out.d += (dist > .01 ? dd / dist : 0) * k;
    out.spin += p * 2.5 * (dd >= 0 ? 1 : -1);
    return true;
  }
  if (h.type === 'boost') {
    if (ds < 0 || ds > h.len || Math.abs(sd.d - h.d) > h.w / 2 + R * .4) return false;
    out.s += h.power ?? 5;
    return true;
  }
  return false;
}
