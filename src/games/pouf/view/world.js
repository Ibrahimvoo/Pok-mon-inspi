// Builds the 3D scenery of a river course from its track: faceted canyon walls and floating mesas,
// orange banks with bamboo rails, flowing water, vegetation, rocks, signs and the far landscape.
import * as THREE from 'three';
import { DS } from '../sim/track.js';
import { merge, mesh, vflat, vtoon, flat, toon, outline, paint, place, S, Cy, Co, Bx, To, shade, textTexture } from './toon.js';

// ---------------------------------------------------------------- deterministic noise
let seed = 1;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const hash = x => { const s = Math.sin(x * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const noise = x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return hash(i) * (1 - u) + hash(i + 1) * u; };

// Bank cross-sections: [lateral offset beyond the water edge, height above the water], same length for every style.
function profile(style, H) {
  const base = [[0, -1.4], [0, .5], [.85, .62], [.9, .8], [3, .86]];
  if (style === 1) return [...base, [3.3, -1.2], [3.8, -9], [4.7, -28], [5.6, -60], [6.2, -95]];          // mesa: drop into the sky
  if (style === 2) return [...base, [5, 1.15], [8.5, 1.8], [13, 2.4], [40, H], [42, H - 45]];              // beach: gentle slope
  return [...base, [3.4, H * .38], [3.9, H * .72], [4.4, H], [40, H + 1], [42, H - 45]];                   // canyon walls
}

const C = new THREE.Color();
function pushTri(pos, col, a, b, c, color) {
  pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
  C.set(color);
  for (let i = 0; i < 3; i++) col.push(C.r, C.g, C.b);
}
function nonIndexed(pos, col) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

// Frames along which a bank profile is extruded: centre, outward direction, water height, edge distance, style.
function bankFrames(T, side) {
  const out = [], step = 2; // every metre
  for (let i = 0; i < T.n; i += step) {
    const a = T.a[i], nx = -Math.cos(a) * side, nz = -Math.sin(a) * side;
    // average curvature around this point: the inner side of a bend must not fold onto itself
    let ks = 0, kn = 0;
    for (let j = Math.max(0, i - 24); j <= Math.min(T.n - 1, i + 24); j += 4) { ks += T.k[j]; kn++; }
    const k = ks / kn, inner = (side > 0 && k < 0) || (side < 0 && k > 0);
    const maxOff = inner && Math.abs(k) > 1e-4 ? Math.max(4.5, .8 / Math.abs(k) - T.w[i]) : 1e9;
    const f = side > 0 ? T.lf[i] : T.rf[i], t = side > 0 ? T.lt[i] : T.rt[i], kk = side > 0 ? T.lk[i] : T.rk[i];
    out.push({ cx: T.x[i], cz: T.z[i], y: T.y[i], ox: nx, oz: nz, w: T.w[i], f, t, k: kk, H: T.h[i], s: i * DS, maxOff });
  }
  return out;
}
// Half-disc frames closing the river at its start (dir -1) or end (dir 1).
function capFrames(T, end) {
  const i = end ? T.n - 1 : 0, a = T.a[i], tx = Math.sin(a) * (end ? 1 : -1), tz = -Math.cos(a) * (end ? 1 : -1);
  const nx = -Math.cos(a), nz = -Math.sin(a), out = [];
  const st = end ? T.lt[i] : T.lf[i];
  for (let k = 0; k <= 24; k++) {
    const th = k / 24 * Math.PI, c = Math.cos(th), s = Math.sin(th);
    // from the left normal, round the back, to the right normal
    const ox = nx * c + tx * s, oz = nz * c + tz * s;
    out.push({ cx: T.x[i], cz: T.z[i], y: T.y[i], ox, oz, w: T.w[i], f: st, t: st, k: 1, H: T.h[i], s: end ? T.length + k : -k, maxOff: 1e9, cap: true });
  }
  return out;
}

function extrude(frames, theme, pos, col) {
  let prev = null;
  for (const fr of frames) {
    const pa = profile(fr.f, fr.H), pb = profile(fr.t, fr.H), style = fr.k < .5 ? fr.f : fr.t;
    const pts = pa.map((p, j) => {
      let o = p[0] + (pb[j][0] - p[0]) * fr.k, y = p[1] + (pb[j][1] - p[1]) * fr.k;
      if (j >= 5 && j <= 7) { o += (noise(fr.s * .23 + j * 7) - .5) * .9; y += (noise(fr.s * .17 + j * 3.1) - .5) * (style === 1 ? 3 : 1.2); }
      if (j >= 8) y += (noise(fr.s * .05 + j) - .5) * 2.2;
      o = Math.min(o, fr.maxOff + (j >= 8 ? j - 8 : 0) * .4);
      return [fr.cx + fr.ox * (fr.w + o), fr.y + y, fr.cz + fr.oz * (fr.w + o)];
    });
    if (prev) {
      for (let j = 0; j < pts.length - 1; j++) {
        const a = prev.pts[j], b = prev.pts[j + 1], c = pts[j + 1], d = pts[j];
        const color = faceColor(style, j, fr.s, theme);
        pushTri(pos, col, a, b, c, color); pushTri(pos, col, a, c, d, color);
      }
    }
    prev = { pts };
  }
}
function faceColor(style, j, s, th) {
  if (j <= 1) return th.wall;
  if (j <= 3) return j === 3 ? th.ledge : shade(th.ledge, -.04);
  const r = hash(Math.floor(s / 2.5) * 13 + j);
  if (style === 1) return j === 4 ? th.wall : shade(j % 2 ? th.wall : th.ledge, -.05 - r * .08 - (j - 4) * .05);
  if (style === 2) return j === 4 ? th.sand : j <= 6 ? shade(th.sand, (r - .5) * .06) : j === 7 ? shade(th.top, (r - .5) * .05) : th.cliff[3];
  if (j === 7) return shade(th.top, (r - .5) * .05);
  if (j === 8) return th.cliff[3];
  return shade(th.cliff[(j + Math.floor(s / 7)) % 3], (r - .5) * .07);
}

// ---------------------------------------------------------------- water
const WATER_VS = `
attribute float aTau; attribute float aRapid;
varying vec2 vUv; varying float vTau; varying float vRapid; varying float vFog;
void main(){ vUv = uv; vTau = aTau; vRapid = aRapid;
  vec4 mv = modelViewMatrix * vec4(position,1.); vFog = -mv.z; gl_Position = projectionMatrix * mv; }`;
const WATER_FS = `
uniform float uTime; uniform vec3 uDeep, uEdge, uFoam, uFogColor; uniform float uFogNear, uFogFar;
varying vec2 vUv; varying float vTau; varying float vRapid; varying float vFog;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  float a = abs(vUv.x);
  vec3 col = mix(uDeep, uEdge, smoothstep(.2, 1.05, a));
  // streaks advected with the current: coordinate = travel time - t
  float tt = vTau - uTime;
  vec2 p = vec2(vUv.x * 4.5 + n2(vec2(tt * .9, vUv.x * 2.)) * .8, tt * 1.6);
  float s1 = n2(p * vec2(1., .55));
  float streak = smoothstep(.74 - vRapid * .18, .765 - vRapid * .18, s1) * (1. - smoothstep(.775, .80, s1));
  float spark = step(.955 - vRapid * .08, n2(vec2(vUv.x * 22., tt * 11.)));
  col = mix(col, uFoam, clamp(streak * .5 + spark * .35 + vRapid * .1, 0., 1.));
  // foam against the walls
  float edge = smoothstep(.84, .97, a + .035 * sin(vTau * 6. + uTime * 4. + vUv.x * 3.));
  col = mix(col, uFoam, edge * .95);
  float fog = smoothstep(uFogNear, uFogFar, vFog);
  gl_FragColor = vec4(mix(col, uFogColor, fog), 1.);
  #include <colorspace_fragment>
}`;
function buildWater(T, theme) {
  const lat = 8, pos = [], uv = [], tau = [], rapid = [], idx = [];
  let acc = 0;
  const rows = [];
  for (let i = 0; i < T.n; i += 2) {
    if (i > 0) acc += DS * 2 / Math.max(.4, T.flow[i]);
    rows.push({ i, tau: acc });
  }
  for (const r of rows) {
    const i = r.i, a = T.a[i], nx = -Math.cos(a), nz = -Math.sin(a), w = T.w[i] + .05;
    const slope = i < T.n - 2 ? (T.y[i + 2] - T.y[i]) / (2 * DS) : 0;
    for (let j = 0; j <= lat; j++) {
      const u = j / lat * 2 - 1;
      pos.push(T.x[i] + nx * u * w, T.y[i], T.z[i] + nz * u * w);
      uv.push(u, i * DS); tau.push(r.tau * .35); rapid.push(Math.min(1, Math.max(0, (T.flow[i] - 2.5) / 3) + Math.max(0, -slope) * 3));
    }
  }
  const cols = lat + 1;
  for (let r = 0; r < rows.length - 1; r++) for (let j = 0; j < lat; j++) {
    const a = r * cols + j, b = a + 1, c = a + cols, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  // round caps at both ends
  for (const end of [0, 1]) {
    const i = end ? T.n - 1 : 0, a = T.a[i], tx = Math.sin(a) * (end ? 1 : -1), tz = -Math.cos(a) * (end ? 1 : -1), nx = -Math.cos(a), nz = -Math.sin(a);
    const w = T.w[i] + .05, base = pos.length / 3, tv = end ? rows[rows.length - 1].tau * .35 : 0;
    pos.push(T.x[i], T.y[i], T.z[i]); uv.push(0, i * DS); tau.push(tv); rapid.push(0);
    for (let k = 0; k <= 24; k++) {
      const th = k / 24 * Math.PI, ox = nx * Math.cos(th) + tx * Math.sin(th), oz = nz * Math.cos(th) + tz * Math.sin(th);
      pos.push(T.x[i] + ox * w, T.y[i], T.z[i] + oz * w); uv.push(1, i * DS); tau.push(tv); rapid.push(0);
      if (k) idx.push(base, base + k, base + k + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aTau', new THREE.Float32BufferAttribute(tau, 1));
  g.setAttribute('aRapid', new THREE.Float32BufferAttribute(rapid, 1));
  g.setIndex(idx);
  g.computeBoundingSphere();
  const m = new THREE.ShaderMaterial({
    vertexShader: WATER_VS, fragmentShader: WATER_FS, side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 }, uDeep: { value: new THREE.Color(theme.water) }, uEdge: { value: new THREE.Color(theme.waterEdge) },
      uFoam: { value: new THREE.Color(theme.foam) }, uFogColor: { value: new THREE.Color(theme.fog) },
      uFogNear: { value: theme.fogNear }, uFogFar: { value: theme.fogFar },
    },
  });
  const water = new THREE.Mesh(g, m);
  water.receiveShadow = false;
  water.renderOrder = -1;
  return water;
}

// ---------------------------------------------------------------- bamboo rails, logs and tubes
function tubeAlong(points, r, color, radial = 10) {
  const pos = [], idx = [];
  const up = new THREE.Vector3(0, 1, 0), t = new THREE.Vector3(), n = new THREE.Vector3(), b = new THREE.Vector3();
  points.forEach((p, i) => {
    const q = points[Math.min(points.length - 1, i + 1)], o = points[Math.max(0, i - 1)];
    t.set(q[0] - o[0], q[1] - o[1], q[2] - o[2]).normalize();
    n.crossVectors(t, up).normalize(); b.crossVectors(n, t).normalize();
    for (let k = 0; k < radial; k++) {
      const a = k / radial * Math.PI * 2, c = Math.cos(a) * r, s = Math.sin(a) * r;
      pos.push(p[0] + n.x * c + b.x * s, p[1] + n.y * c + b.y * s, p[2] + n.z * c + b.z * s);
    }
  });
  for (let i = 0; i < points.length - 1; i++) for (let k = 0; k < radial; k++) {
    const a = i * radial + k, b2 = i * radial + (k + 1) % radial, c = a + radial, d = b2 + radial;
    idx.push(a, b2, c, b2, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return paint(g, color);
}

// ---------------------------------------------------------------- vegetation & props (merged, instanced)
function treeGeo(theme, v) {
  const L = theme.leaf, tr = theme.trunk, p = [];
  if (v === 0) { // round puffy tree
    p.push(Cy(.22, .34, 3.2, tr, [0, 1.6, 0], [0, 0, .06], 1, 7));
    [[0, 3.8, 0, 1.6], [1.1, 3.3, .3, 1.15], [-1, 3.4, -.2, 1.2], [.2, 4.6, -.3, 1.15], [-.3, 3.2, 1, 1]].forEach(([x, y, z, r], i) =>
      p.push(place(paint(new THREE.IcosahedronGeometry(r, 1), L[i % 3]), [x, y, z])));
  } else if (v === 1) { // wide umbrella tree (canopy layers)
    p.push(Cy(.2, .3, 4.2, tr, [0, 2.1, 0], 0, 1, 7));
    p.push(place(paint(new THREE.CylinderGeometry(2.2, 2.6, .9, 9), L[0]), [0, 4.3, 0]), place(paint(new THREE.CylinderGeometry(1.6, 2.1, .8, 9), L[1]), [.2, 5, .1]), place(paint(new THREE.CylinderGeometry(.9, 1.4, .7, 9), L[2]), [-.1, 5.6, 0]));
  } else if (v === 2) { // palm tree
    for (let k = 0; k < 6; k++) p.push(Cy(.17 - k * .012, .19 - k * .012, .9, k % 2 ? tr : shade(tr, .12), [k * k * .025, .45 + k * .85, 0], [0, 0, -k * .05], 1, 7));
    // fronds: flat cones pointing outwards and drooping (Euler XYZ applies Z, then Y)
    for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; p.push(place(paint(new THREE.ConeGeometry(.42, 2.6, 4), L[k % 2]), [.62 + Math.cos(a) * 1.2, 4.95, Math.sin(a) * 1.2], [0, -a, -Math.PI / 2 - .38], [.25, 1, 1])); }
    p.push(S(.3, '#6b4a2a', [.62, 5.1, 0], 0, 1, 6));
  } else if (v === 3) { // bamboo cluster
    for (let k = 0; k < 5; k++) {
      const x = (hash(k * 3.1) - .5) * 1.4, z = (hash(k * 7.7) - .5) * 1.4, h = 3.5 + hash(k) * 3;
      p.push(Cy(.09, .1, h, theme.rail, [x, h / 2, z], [0, 0, (hash(k * 2) - .5) * .12], 1, 6));
      for (let y = 1; y < h; y += 1.1) p.push(Cy(.11, .11, .08, theme.railRing, [x + (y / h) * (hash(k * 2) - .5) * -.2, y, z], 0, 1, 6));
      p.push(place(paint(new THREE.ConeGeometry(.25, .9, 3), L[k % 3]), [x + .3, h - .3, z], [0, 0, -1], [1, 1, .3]));
    }
  } else if (v === 4) { // reeds / cattails
    for (let k = 0; k < 6; k++) {
      const x = (hash(k * 5.3) - .5) * 1.2, z = (hash(k * 9.1) - .5) * 1.2, h = 1.4 + hash(k * 1.3) * 1.2;
      p.push(Cy(.03, .04, h, L[1], [x, h / 2 - .2, z], 0, 1, 5));
      if (k % 2 === 0) p.push(Cy(.08, .08, .4, '#8b5a34', [x, h - .1, z], 0, 1, 6));
      else p.push(place(paint(new THREE.ConeGeometry(.12, 1.2, 3), L[0]), [x + .15, .4, z], [0, 0, -.5], [1, 1, .3]));
    }
  } else if (v === 5) { // grass tuft
    for (let k = 0; k < 5; k++) p.push(place(paint(new THREE.ConeGeometry(.12, .7, 3), L[k % 3]), [(hash(k) - .5) * .6, .3, (hash(k * 4) - .5) * .6], [(hash(k * 2) - .5) * .7, 0, (hash(k * 3) - .5) * .7]));
  } else if (v === 6) { // pink flower bush
    p.push(place(paint(new THREE.IcosahedronGeometry(.6, 0), L[0]), [0, .4, 0], 0, [1, .7, 1]));
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; p.push(S(.14, k % 2 ? '#ff7fb6' : '#ffb3d4', [Math.cos(a) * .45, .62, Math.sin(a) * .45], 0, 1, 6)); }
  } else if (v === 7) { // snowy pine
    p.push(Cy(.18, .26, 1.6, tr, [0, .8, 0], 0, 1, 6));
    [[2.2, 2.6, 1.9], [1.75, 2.2, 3.1], [1.25, 1.9, 4.2], [.75, 1.5, 5.2]].forEach(([r, h, y], i) => {
      p.push(place(paint(new THREE.ConeGeometry(r, h, 7), L[i % 3]), [0, y, 0], [0, i * .4, 0]));
      p.push(place(paint(new THREE.ConeGeometry(r * .82, h * .4, 7), '#ffffff'), [0, y + h * .34, 0], [0, i * .4, 0]));
    });
  } else if (v === 8) { // gnarled swamp tree with hanging moss
    p.push(place(paint(new THREE.CylinderGeometry(.28, .5, 3.4, 7), tr), [0, 1.6, 0], [.12, 0, .1]));
    p.push(place(paint(new THREE.CylinderGeometry(.14, .22, 2.2, 6), tr), [.7, 3.4, 0], [0, 0, -.8]), place(paint(new THREE.CylinderGeometry(.12, .2, 2, 6), tr), [-.6, 3.5, .3], [.3, 0, .9]));
    [[0, 4.3, 0, 1.5], [1.4, 4, .2, 1.1], [-1.3, 4.1, .3, 1.1]].forEach(([x, y, z, r], i) => p.push(place(paint(new THREE.IcosahedronGeometry(r, 0), L[i % 3]), [x, y, z], 0, [1, .6, 1])));
    for (let k = 0; k < 5; k++) p.push(place(paint(new THREE.ConeGeometry(.16, 1.4, 4), shade(L[1], .15)), [(hash(k) - .5) * 2.6, 3.2, (hash(k * 3) - .5) * 1.6], [Math.PI, 0, 0]));
  } else if (v === 9) { // giant mushroom
    const cap = theme.mush || '#c0479a';
    p.push(Cy(.28, .4, 2.2, '#f3e6d2', [0, 1.1, 0], 0, 1, 8));
    p.push(place(paint(new THREE.SphereGeometry(1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), cap), [0, 2.1, 0], 0, [1, .7, 1]));
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; p.push(S(.2, '#fff3e0', [Math.cos(a) * .9, 2.75, Math.sin(a) * .9], 0, [1, .4, 1], 6)); }
  } else if (v === 10) { // ice crystals
    for (let k = 0; k < 5; k++) {
      const x = (hash(k * 2.3) - .5) * 1.6, z = (hash(k * 5.9) - .5) * 1.6, hh = 1 + hash(k) * 2.2;
      p.push(place(paint(new THREE.OctahedronGeometry(.45, 0), k % 2 ? '#bdeeff' : '#e6f9ff'), [x, hh * .6, z], [(hash(k) - .5) * .5, k, (hash(k * 7) - .5) * .5], [.7, hh, .7]));
    }
  }
  return merge(p);
}
function rockGeo(theme, v) {
  const p = [];
  if (v === 0) p.push(place(paint(new THREE.DodecahedronGeometry(1, 0), theme.rock), [0, 0, 0], [.3, .5, .1], [1, .8, 1.1]));
  else if (v === 1) { // tall stacked slabs (like the lagoon rocks)
    p.push(place(paint(new THREE.BoxGeometry(1.6, 3.4, 1.4), theme.rock), [0, 1.2, 0], [.08, .3, .1]));
    p.push(place(paint(new THREE.BoxGeometry(1.3, 2.6, 1.2), shade(theme.rock, .08)), [1.1, .9, .3], [-.1, .6, -.12]));
    p.push(place(paint(new THREE.BoxGeometry(1.1, 1.8, 1), shade(theme.rock, -.06)), [-.9, .5, .4], [.15, -.3, .1]));
  } else p.push(place(paint(new THREE.IcosahedronGeometry(1, 0), shade(theme.rock, .05)), [0, 0, 0], [0, .7, 0], [1.3, .6, 1]));
  return merge(p);
}

function instanced(geo, mat, list, { cast = true } = {}) {
  const m = new THREE.InstancedMesh(geo, mat, Math.max(1, list.length));
  const o = new THREE.Object3D();
  list.forEach((it, i) => { o.position.set(it[0], it[1], it[2]); o.rotation.set(0, it[3] || 0, 0); o.scale.setScalar(it[4] || 1); o.updateMatrix(); m.setMatrixAt(i, o.matrix); });
  m.count = list.length; m.castShadow = cast; m.receiveShadow = false;
  m.computeBoundingSphere();
  return m;
}

// ---------------------------------------------------------------- signs
export function archSign(text, width, { color = '#2f8fd8', pole: pc = '#86c540', ring = '#5f9c2a' } = {}) {
  const g = new THREE.Group();
  const pole = merge([Cy(.26, .3, 6.6, pc, [0, 3.3, 0], 0, 1, 8), ...[1, 2.2, 3.4, 4.6, 5.8].map(y => Cy(.32, .32, .12, ring, [0, y, 0], 0, 1, 8)), Cy(.36, .36, .3, '#f7a43a', [0, 6.6, 0], 0, 1, 8)]);
  for (const sx of [-1, 1]) { const p = mesh(pole, vtoon()); p.position.x = sx * width / 2; outline(p, .04); g.add(p); }
  const beam = mesh(merge([Cy(.24, .24, width + .6, pc, [0, 0, 0], [0, 0, Math.PI / 2], 1, 8), ...[-.3, 0, .3].map(x => Cy(.29, .29, .1, ring, [x * width, 0, 0], [0, 0, Math.PI / 2], 1, 8))]), vtoon());
  beam.position.y = 6.1; outline(beam, .04); g.add(beam);
  const bw = Math.min(width * .78, text.length * .62 + 1.6);
  const board = mesh(merge([Bx(bw + .4, 1.9, .26, '#b5703a', [0, 0, 0]), Bx(bw, 1.5, .3, color, [0, 0, 0])]), vtoon());
  board.position.y = 6.1; board.rotation.x = -.08; outline(board, .04); g.add(board);
  const tex = textTexture(text, { w: 1024, h: 256, size: Math.min(170, 1700 / text.length), fill: '#ffd23f', stroke: '#173b6b', sw: 30 });
  for (const sz of [1, -1]) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(bw * .98, bw * .98 / 4), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    plane.position.set(0, 6.12, sz * .2); plane.rotation.set(-.08, sz < 0 ? Math.PI : 0, 0, 'YXZ');
    g.add(plane);
  }
  return g;
}

// ---------------------------------------------------------------- whole world
export function buildWorld(T, course) {
  const theme = course.theme;
  seed = 7 + course.id.length * 31;
  const root = new THREE.Group(); root.name = 'world';

  // banks + caps
  const pos = [], col = [];
  for (const side of [1, -1]) { const f = bankFrames(T, side); f.side = side; extrude(f, theme, pos, col); }
  const startCap = capFrames(T, false), endCap = capFrames(T, true);
  startCap.side = 1; extrude(startCap, theme, pos, col);
  endCap.side = 1; extrude(endCap, theme, pos, col);
  // flat shading derives the normals from screen derivatives, so the faces can be drawn from both sides
  const terrain = new THREE.Mesh(nonIndexed(pos, col), flat('#ffffff', { vertexColors: true, side: THREE.DoubleSide }));
  terrain.receiveShadow = true; terrain.name = 'terrain';
  root.add(terrain);

  const water = buildWater(T, theme);
  root.add(water);

  // bamboo rails with darker joints
  const ringList = [], railParts = [];
  for (const side of [1, -1]) {
    const pts = [];
    for (let i = 0; i < T.n; i += 2) {
      const a = T.a[i], nx = -Math.cos(a) * side, nz = -Math.sin(a) * side, d = T.w[i] + .42;
      pts.push([T.x[i] + nx * d, T.y[i] + .78, T.z[i] + nz * d]);
      if (i % 5 === 0) ringList.push([pts[pts.length - 1], T.a[i]]);
    }
    railParts.push(tubeAlong(pts, .4, theme.rail, 10));
  }
  for (const end of [0, 1]) { // rails round the caps
    const i = end ? T.n - 1 : 0, a = T.a[i], tx = Math.sin(a) * (end ? 1 : -1), tz = -Math.cos(a) * (end ? 1 : -1), nx = -Math.cos(a), nz = -Math.sin(a);
    const d = T.w[i] + .42, pts = [];
    for (let k = 0; k <= 24; k++) { const th = k / 24 * Math.PI; pts.push([T.x[i] + (nx * Math.cos(th) + tx * Math.sin(th)) * d, T.y[i] + .78, T.z[i] + (nz * Math.cos(th) + tz * Math.sin(th)) * d]); }
    railParts.push(tubeAlong(pts, .4, theme.rail, 10));
  }
  const rails = new THREE.Mesh(merge(railParts), vtoon());
  rails.castShadow = true; rails.receiveShadow = true;
  root.add(rails);
  const ringGeo = place(paint(new THREE.TorusGeometry(.42, .07, 6, 12), theme.railRing), 0, [0, 0, 0]);
  const rings = new THREE.InstancedMesh(merge([ringGeo]), vtoon(), ringList.length);
  const o3 = new THREE.Object3D();
  ringList.forEach(([p, a], i) => { o3.position.set(p[0], p[1], p[2]); o3.rotation.set(0, -a, 0); o3.updateMatrix(); rings.setMatrixAt(i, o3.matrix); });
  root.add(rings);

  // ---- decoration placement (never on the water of another part of the course)
  const nearWater = (x, z, margin) => {
    for (let i = 0; i < T.n; i += 6) { const dx = x - T.x[i], dz = z - T.z[i]; if (dx * dx + dz * dz < (T.w[i] + margin) ** 2) return true; }
    return false;
  };
  const lists = { tree0: [], tree1: [], palm: [], bamboo: [], reeds: [], grass: [], bush: [], rock0: [], rock1: [], rock2: [] };
  const o = {};
  for (let s = 2; s < T.length - 2; s += 2.5) {
    T.at(s, o);
    for (const side of [1, -1]) {
      const i = Math.round(s / DS), st = (side > 0 ? T.lk[i] : T.rk[i]) < .5 ? (side > 0 ? T.lf[i] : T.rf[i]) : (side > 0 ? T.lt[i] : T.rt[i]);
      const r = rnd(), nx = o.nx * side, nz = o.nz * side;
      const put = (list, off, y, sc = 1, margin = 4) => {
        const x = o.x + nx * (o.w + off), z = o.z + nz * (o.w + off);
        if (!nearWater(x, z, margin)) list.push([x, o.y + y, z, rnd() * 6.28, sc]);
      };
      if (st === 0) { // canyon top
        if (r < .3) put(rnd() < .55 ? lists.tree0 : lists.tree1, 6 + rnd() * 16, o.h + .9, .8 + rnd() * .6, 6);
        if (rnd() < .35) put(lists.grass, 5 + rnd() * 20, o.h + 1, 1 + rnd(), 5);
        if (rnd() < .06) put(lists.rock2, 7 + rnd() * 12, o.h + .9, .8 + rnd(), 6);
        if (rnd() < .07) put(lists.bamboo, 2 + rnd() * .6, .85, .8 + rnd() * .3, 1.6);
      } else if (st === 1) { // mesa ledge
        if (r < .08) put(lists.bamboo, 2.2 + rnd() * .4, .85, .7 + rnd() * .3, 1.6);
        else if (r < .2) put(lists.bush, 2.3, .86, .8 + rnd() * .4, 1.6);
        else if (r < .3) put(lists.grass, 2 + rnd(), .86, 1, 1.6);
      } else { // beach
        if (r < .22) put(lists.palm, 6 + rnd() * 10, 1.6, .9 + rnd() * .3, 5);
        if (rnd() < .25) put(lists.bamboo, 3.5 + rnd() * 6, 1.3, .9, 3);
        if (rnd() < .3) put(lists.grass, 4 + rnd() * 14, 1.6, 1.2, 4);
        if (rnd() < .3) put(lists.reeds, -.7, 0, .9 + rnd() * .4, -1);
        if (rnd() < .08) put(lists.rock1, 5 + rnd() * 6, 1, 1 + rnd() * .5, 4);
        if (rnd() < .2) put(lists.tree0, 12 + rnd() * 18, o.h, 1 + rnd() * .4, 8);
      }
    }
  }
  // vegetation of this course's climate (null removes a kind)
  const flora = { tree0: 0, tree1: 1, palm: 2, bamboo: 3, reeds: 4, grass: 5, bush: 6, ...theme.flora };
  const bushTheme = { ...theme, leaf: Array(3).fill(theme.bush || '#6fb84a') };
  const leafMat = vflat();
  const add = (geo, list, cast = true) => { if (list.length) root.add(instanced(geo, leafMat, list, { cast })); };
  for (const [k, cast] of [['tree0', true], ['tree1', true], ['palm', true], ['bamboo', true], ['reeds', false], ['grass', false], ['bush', false]]) {
    if (flora[k] == null || !lists[k].length) continue;
    add(treeGeo(flora[k] === 6 ? bushTheme : theme, flora[k]), lists[k], cast);
  }
  add(rockGeo(theme, 2), lists.rock2);
  add(rockGeo(theme, 1), lists.rock1);

  // signs: start, checkpoints, finish
  const signs = [];
  const sign = (s, text, kind) => {
    T.at(s, o);
    const g = archSign(text, o.w * 2 + 2.2, { pole: theme.rail, ring: theme.railRing });
    g.position.set(o.x, o.y, o.z);
    g.rotation.y = -o.a + Math.PI;   // the board faces the riders coming downstream
    g.userData = { s, kind };
    root.add(g); signs.push(g);
    const fl = instanced(treeGeo(flora.bush === 6 ? bushTheme : theme, flora.bush ?? 6), leafMat,
      [-1, 1].map(sd => [o.x + o.nx * sd * (o.w + 1.4), o.y + .86, o.z + o.nz * sd * (o.w + 1.4), 0, 1.1]), { cast: false });
    root.add(fl);
    return g;
  };
  sign(course.start, 'DÉPART', 'start');
  course.checkpoints.forEach((s, i) => sign(s, 'CHECKPOINT', 'cp' + (i + 1)));
  sign(course.finish, 'ARRIVÉE', 'finish');

  // far landscape: floating mesas and clouds in the haze
  const far = [], clouds = [];
  const cx = (Math.min(...T.x) + Math.max(...T.x)) / 2, cz = (Math.min(...T.z) + Math.max(...T.z)) / 2;
  for (let k = 0; k < 26; k++) {
    const a = rnd() * Math.PI * 2, d = 230 + rnd() * 260;
    far.push([cx + Math.cos(a) * d, -40 + rnd() * 50, cz + Math.sin(a) * d, rnd() * 6, 14 + rnd() * 24]);
  }
  const mesaGeo = merge([place(paint(new THREE.CylinderGeometry(1, .8, 3, 9), theme.far), [0, 0, 0]), place(paint(new THREE.CylinderGeometry(1.02, 1.02, .25, 9), theme.farTop || theme.grass), [0, 1.55, 0]),
    place(paint(new THREE.ConeGeometry(.8, 1.6, 9), shade(theme.far, -.12)), [0, -2.3, 0], [Math.PI, 0, 0])]);
  root.add(instanced(mesaGeo, vflat(), far, { cast: false }));
  for (let k = 0; k < 40; k++) {
    const a = rnd() * Math.PI * 2, d = 120 + rnd() * 420;
    clouds.push([cx + Math.cos(a) * d, 35 + rnd() * 70, cz + Math.sin(a) * d, rnd() * 6, 6 + rnd() * 10]);
  }
  const cloudGeo = merge([[0, 0, 0, 1], [1.1, -.2, .2, .75], [-1.1, -.25, -.1, .7], [.4, .35, -.3, .7], [-.5, .1, .5, .6]].map(([x, y, z, r]) => place(paint(new THREE.IcosahedronGeometry(r, 1), '#ffffff'), [x, y, z], 0, [1, .7, 1])));
  root.add(instanced(cloudGeo, new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: theme.cloud || '#e8f4ff', emissiveIntensity: .55 }), clouds, { cast: false }));

  return { root, water, signs, theme, update(t) { water.material.uniforms.uTime.value = t; } };
}

export function skyDome(theme) {
  const g = new THREE.SphereGeometry(1200, 24, 12);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color(theme.sky[0]) }, bottom: { value: new THREE.Color(theme.sky[1]) } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: 'uniform vec3 top, bottom; varying vec3 vP; void main(){ float k = smoothstep(-.15, .55, vP.y); gl_FragColor = vec4(mix(bottom, top, k), 1.);\n#include <colorspace_fragment>\n}',
  });
  const sky = new THREE.Mesh(g, m);
  sky.renderOrder = -10; sky.frustumCulled = false;
  return sky;
}
