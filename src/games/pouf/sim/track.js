// River course geometry: a centreline integrated from segments (length, turn, width, drop, current),
// sampled every DS metres. Pure maths (no rendering) so the host simulation and the tests share it.
export const DS = 0.5;
const smooth = u => u * u * (3 - 2 * u);
export const STYLES = ['canyon', 'mesa', 'beach'];

export function buildTrack(def) {
  const segs = def.segs;
  const total = segs.reduce((s, g) => s + g.len, 0);
  const n = Math.ceil(total / DS) + 1;
  const T = {
    n, length: (n - 1) * DS, def,
    x: new Float32Array(n), y: new Float32Array(n), z: new Float32Array(n), a: new Float32Array(n),
    w: new Float32Array(n), flow: new Float32Array(n), k: new Float32Array(n), h: new Float32Array(n),
    // bank style on each side: blended from style `from` to style `to` with weight `t`
    lf: new Uint8Array(n), lt: new Uint8Array(n), lk: new Float32Array(n),
    rf: new Uint8Array(n), rt: new Uint8Array(n), rk: new Float32Array(n),
  };
  let x = def.start?.x || 0, z = def.start?.z || 0, y = def.start?.y || 0, a = def.start?.a || 0;
  let w0 = segs[0].w, f0 = segs[0].flow ?? 3, h0 = segs[0].h ?? 7;
  let L0 = STYLES.indexOf(segs[0].L || 'canyon'), R0 = STYLES.indexOf(segs[0].R || 'canyon');
  let i = 0, sAcc = 0;
  for (const g of segs) {
    const L1 = STYLES.indexOf(g.L || STYLES[L0]), R1 = STYLES.indexOf(g.R || STYLES[R0]);
    const w1 = g.w ?? w0, f1 = g.flow ?? f0, h1 = g.h ?? h0, dy = g.dy || 0, turn = (g.turn || 0) * Math.PI / 180;
    const steps = Math.round(g.len / DS), y0 = y, a0 = a;
    for (let j = 0; j < steps && i < n; j++) {
      const u = j / steps, e = smooth(u), blend = Math.min(1, (j * DS) / Math.min(12, g.len));
      T.x[i] = x; T.y[i] = y; T.z[i] = z; T.a[i] = a;
      T.w[i] = w0 + (w1 - w0) * e; T.flow[i] = f0 + (f1 - f0) * e; T.h[i] = h0 + (h1 - h0) * e;
      T.k[i] = turn / g.len;
      T.lf[i] = L0; T.lt[i] = L1; T.lk[i] = smooth(blend); T.rf[i] = R0; T.rt[i] = R1; T.rk[i] = smooth(blend);
      // advance along a constant-curvature arc
      const am = a + T.k[i] * DS / 2;
      x += Math.sin(am) * DS; z -= Math.cos(am) * DS;
      a = a0 + turn * (j + 1) / steps;
      y = y0 + dy * smooth((j + 1) / steps);
      i++; sAcc += DS;
    }
    w0 = w1; f0 = f1; h0 = h1; L0 = L1; R0 = R1;
  }
  for (; i < n; i++) { // last sample
    T.x[i] = x; T.y[i] = y; T.z[i] = z; T.a[i] = a; T.w[i] = w0; T.flow[i] = f0; T.h[i] = h0;
    T.lf[i] = T.lt[i] = L0; T.rf[i] = T.rt[i] = R0; T.lk[i] = T.rk[i] = 1;
  }
  T.at = (s, o = {}) => sampleAt(T, s, o);
  T.project = (px, pz, hint) => project(T, px, pz, hint);
  T.world = (s, d, o = {}) => { T.at(s, o); o.wx = o.x + o.nx * d; o.wz = o.z + o.nz * d; return o; };
  return T;
}

// Interpolated frame at arc length s: position, tangent (tx,tz), left normal (nx,nz), width, current, slope.
export function sampleAt(T, s, o = {}) {
  const f = Math.max(0, Math.min(T.n - 1.0001, s / DS)), i = Math.floor(f), u = f - i;
  const L = (arr) => arr[i] + (arr[i + 1] - arr[i]) * u;
  o.s = s; o.x = L(T.x); o.y = L(T.y); o.z = L(T.z); o.w = L(T.w); o.flow = L(T.flow); o.h = L(T.h); o.k = T.k[i];
  const a = T.a[i] + (T.a[i + 1] - T.a[i]) * u;
  o.a = a; o.tx = Math.sin(a); o.tz = -Math.cos(a); o.nx = o.tz; o.nz = -o.tx;
  o.slope = (T.y[i + 1] - T.y[i]) / DS;
  return o;
}

// Closest point on the centreline: returns { s, d } where d > 0 is towards the left bank.
export function project(T, px, pz, hint) {
  let lo = 0, hi = T.n - 2, best = -1, bd = Infinity;
  if (hint != null && hint >= 0) { const c = Math.round(hint / DS); lo = Math.max(0, c - 60); hi = Math.min(T.n - 2, c + 60); }
  const step = hint != null ? 1 : 4;
  for (let i = lo; i <= hi; i += step) {
    const dx = px - T.x[i], dz = pz - T.z[i], d2 = dx * dx + dz * dz;
    if (d2 < bd) { bd = d2; best = i; }
  }
  if (step > 1) { // refine the coarse search
    const c = best; for (let i = Math.max(0, c - 4); i <= Math.min(T.n - 2, c + 4); i++) {
      const dx = px - T.x[i], dz = pz - T.z[i], d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; best = i; }
    }
  }
  // project on the segment towards the closer neighbour
  let i = best;
  const ax = T.x[i], az = T.z[i];
  let bx = T.x[i + 1], bz = T.z[i + 1];
  let ex = bx - ax, ez = bz - az;
  let u = ((px - ax) * ex + (pz - az) * ez) / (ex * ex + ez * ez);
  if (u < 0 && i > 0) { i--; const cx = T.x[i], cz = T.z[i]; ex = ax - cx; ez = az - cz; u = ((px - cx) * ex + (pz - cz) * ez) / (ex * ex + ez * ez); }
  u = Math.max(i === 0 ? -20 : 0, Math.min(1, u));
  const s = (i + u) * DS;
  const a = T.a[i];
  const nx = -Math.cos(a), nz = -Math.sin(a);
  const cx = T.x[i] + (T.x[i + 1] - T.x[i]) * Math.max(0, u), cz = T.z[i] + (T.z[i + 1] - T.z[i]) * Math.max(0, u);
  return { s, d: (px - cx) * nx + (pz - cz) * nz };
}
