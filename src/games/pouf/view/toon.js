// Cartoon look: banded toon shading, flat-shaded scenery, inverted-hull outlines and small geometry helpers.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

let gradient;
function gradientMap() {
  if (gradient) return gradient;
  const data = new Uint8Array([120, 120, 120, 255, 196, 196, 196, 255, 255, 255, 255, 255]);
  gradient = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false; gradient.needsUpdate = true;
  return gradient;
}

const cache = new Map();
export function toon(color, opts = {}) {
  const key = 'toon' + color + JSON.stringify(opts);
  if (!cache.has(key)) cache.set(key, new THREE.MeshToonMaterial({ color, gradientMap: gradientMap(), ...opts }));
  return cache.get(key);
}
export const vtoon = () => toon('#ffffff', { vertexColors: true });
export function flat(color, opts = {}) {
  const key = 'flat' + color + JSON.stringify(opts);
  if (!cache.has(key)) cache.set(key, new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts }));
  return cache.get(key);
}
export const vflat = () => flat('#ffffff', { vertexColors: true });

// Inverted hull: back faces pushed along the normals, drawn in a dark ink colour.
const inks = new Map();
export function inkMaterial(width = .028, color = '#2b2230') {
  const key = width + color;
  if (inks.has(key)) return inks.get(key);
  const m = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  m.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${width.toFixed(4)};`); };
  m.customProgramCacheKey = () => 'ink' + key;
  inks.set(key, m);
  return m;
}
export function outline(mesh, width, color) {
  const o = new THREE.Mesh(mesh.geometry, inkMaterial(width, color));
  o.name = 'ink'; o.castShadow = false; o.receiveShadow = false;
  mesh.add(o);
  return o;
}

// ---------------------------------------------------------------- geometry building
const tmpC = new THREE.Color();
// Paint every vertex of a geometry with one colour (for vertex-coloured merged meshes).
export function paint(geo, color) {
  tmpC.set(color);
  const n = geo.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { a[i * 3] = tmpC.r; a[i * 3 + 1] = tmpC.g; a[i * 3 + 2] = tmpC.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return geo;
}
const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
// Place a geometry: position [x,y,z], rotation [rx,ry,rz], scale number|[sx,sy,sz].
export function place(geo, p, r, s = 1) {
  p = p || [0, 0, 0]; r = r || [0, 0, 0];
  e.set(r[0], r[1], r[2]); q.setFromEuler(e);
  sc.set(...(Array.isArray(s) ? s : [s, s, s]));
  m4.compose(v.set(p[0], p[1], p[2]), q, sc);
  geo.applyMatrix4(m4);
  return geo;
}
// Merge parts that only keep position/normal/colour.
export function merge(parts) {
  const clean = parts.map(g => {
    const x = g.index ? g : g;
    for (const k of Object.keys(x.attributes)) if (!['position', 'normal', 'color'].includes(k)) x.deleteAttribute(k);
    if (!x.attributes.color) paint(x, '#ffffff');
    return x;
  });
  const indexed = clean.every(g => g.index);
  const list = indexed ? clean : clean.map(g => (g.index ? g.toNonIndexed() : g));
  const out = mergeGeometries(list, false);
  list.forEach(g => g.dispose());
  return out;
}
// Shorthands for coloured primitives
export const S = (r, c, p, rot, s, seg = 16) => place(paint(new THREE.SphereGeometry(r, seg, Math.max(8, seg * .75 | 0)), c), p, rot, s);
export const Cy = (rt, rb, h, c, p, rot, s, seg = 14) => place(paint(new THREE.CylinderGeometry(rt, rb, h, seg), c), p, rot, s);
export const Co = (r, h, c, p, rot, s, seg = 12) => place(paint(new THREE.ConeGeometry(r, h, seg), c), p, rot, s);
export const Bx = (w, h, d, c, p, rot, s) => place(paint(new THREE.BoxGeometry(w, h, d), c), p, rot, s);
export const Ca = (r, len, c, p, rot, s, seg = 10) => place(paint(new THREE.CapsuleGeometry(r, len, 4, seg), c), p, rot, s);
export const To = (r, tube, c, p, rot, s, arc = Math.PI * 2) => place(paint(new THREE.TorusGeometry(r, tube, 8, 20, arc), c), p, rot, s);

export function mesh(geo, mat, { cast = true, receive = false } = {}) {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast; m.receiveShadow = receive;
  return m;
}

// Lighten / darken a css colour
export function shade(color, k) {
  tmpC.set(color);
  if (k > 0) tmpC.lerp(new THREE.Color('#ffffff'), k); else tmpC.multiplyScalar(1 + k);
  return '#' + tmpC.getHexString();
}

// Canvas text texture (signs, banners) in the game display face.
export function textTexture(text, { w = 1024, h = 256, font = 'Luckiest Guy', size = 150, fill = '#ffd23f', stroke = '#1e4f8a', bg = null, sw = 26 } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.font = `${size}px "${font}", "Arial Black", sans-serif`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineJoin = 'round'; g.lineWidth = sw; g.strokeStyle = stroke;
  const y = h / 2 + size * .08;
  g.strokeText(text, w / 2, y);
  g.fillStyle = fill; g.fillText(text, w / 2, y);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
