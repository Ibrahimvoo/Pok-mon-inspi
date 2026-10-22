// The players' 3D characters, modelled after the game's: egg-shaped head sitting on the sweater, brown side-swept
// helmet of hair with a crown tuft, big bulging eyes under heavy lids, thick arched brows, button nose, wide toothy
// grin, boxy sweater, long arms in an A-pose ending in big cream mitten gloves, straight jeans and brown shoes.
// Built from primitives with a procedural rig: idle, real walk cycle (hips, knees, ankles, arm swing, bob), talking
// at the mic, emotes and tomato hits.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const PRESETS = [
  { id: 'leo', name: 'Léo', skin: '#efb887', hair: 'swept', hairColor: '#6e3d2b', shirt: '#1767f2', pants: '#3b63b4', eyes: '#7f8f3c', brows: '#5c3020', lids: -.15 },
  { id: 'bibou', name: 'Bibou', skin: '#ffc829', hair: 'none', shirt: '#e3242a', pants: '#2c5ad6', eyes: '#3d6fd0', brows: '#9a5a12', lids: -.45 },
  { id: 'krank', name: 'Krank', skin: '#f4c6a4', hair: 'long', hairColor: '#ff6cb2', shirt: '#ff58a4', pants: '#d8468e', eyes: '#3d6fd0', brows: '#c43a7c', lids: -.4 },
  { id: 'miao', name: 'Miao', skin: '#eab48b', hair: 'blond', hairColor: '#f0bf4e', shirt: '#8a5cf0', pants: '#7444d6', eyes: '#3d6fd0', brows: '#a37022', lids: -.3 },
  { id: 'tino', name: 'Tino', skin: '#c88a5d', hair: 'cap', hairColor: '#e22b2b', shirt: '#3bbd58', pants: '#2c58a6', eyes: '#4c301e', brows: '#2a160c', lids: -.3 },
  { id: 'bonnie', name: 'Bonnie', skin: '#f2c39b', hair: 'beanie', hairColor: '#2d6be0', shirt: '#ff952a', pants: '#3b63b4', eyes: '#7f8f3c', brows: '#6b3a22', lids: -.35 },
  { id: 'zed', name: 'Zed', skin: '#8e5a3b', hair: 'curly', hairColor: '#211611', shirt: '#2bb5d6', pants: '#283d7e', eyes: '#3c2616', brows: '#1a0f08', lids: -.3 },
  { id: 'nina', name: 'Nina', skin: '#f6d1b2', hair: 'bun', hairColor: '#3c2317', shirt: '#ffcd33', pants: '#3b63b4', eyes: '#5b3b25', brows: '#3c2317', lids: -.35 },
];
export const presetById = id => PRESETS.find(p => p.id === id) || PRESETS[0];
export const EMOTES = [
  { id: 'wave', name: 'Coucou' }, { id: 'dance', name: 'Danse' }, { id: 'clap', name: 'Bravo' },
  { id: 'hop', name: 'Sautille' }, { id: 'victory', name: 'Victoire' }, { id: 'shrug', name: 'Bof' },
];
export const HEAD_Y = 1.47;   // head centre of an unscaled character (feet at 0, 1.78 m tall)

// ---------------------------------------------------------------- shared geometry and materials
const mats = new Map();
function mat(color, rough = .78, basic = false) {
  const k = `${color}|${rough}|${basic}`;
  if (!mats.has(k)) mats.set(k, basic ? new THREE.MeshBasicMaterial({ color }) : new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 }));
  return mats.get(k);
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// egg head: cheeks fuller low on the face, rounded chin, slightly flat front
function headShape(v) {
  const y = v.y * 1.16;
  const w = 1 + .07 * Math.exp(-(((v.y + .22) / .45) ** 2)) - .12 * smooth(-.55, -1, v.y);
  v.set(v.x * w * .9, y, v.z * w * (v.z > 0 ? .88 : .95));
  return v;
}
const HEAD = (() => {
  const g = new THREE.SphereGeometry(1, 48, 36), p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { headShape(v.fromBufferAttribute(p, i)); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals(); return g;
})();
// hair as a shell around the head; below the hairline the shell sinks into the skull, which draws a clean edge
function hairShell(style) {
  const g = new THREE.SphereGeometry(1, 56, 40), p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const az = Math.atan2(v.x, v.z), front = (1 + Math.cos(az)) / 2;
    let line = -.62 + 1.08 * Math.pow(front, 1.1);                      // forehead .46, temples ≈ -.1, nape -.62
    if (style === 'swept') line -= .18 * Math.exp(-(((az + .55) / .42) ** 2));   // fringe swept down over one temple
    if (style === 'long') line = Math.min(line, front > .75 ? .42 : -1.05);
    if (style === 'blond') line -= .2 * Math.exp(-(((az - .3) / .5) ** 2));
    const lock = 1 + .018 * Math.sin(az * 6 + v.y * 4) * smooth(-.1, .5, v.y);   // soft sculpted locks
    const lift = 1 + .13 * smooth(.1, 1, v.y) + .03 * smooth(.3, .6, v.y) * Math.max(0, Math.cos(az));
    const r = .84 + (1.075 * lock * lift - .84) * smooth(line - .07, line + .03, v.y);   // smooth edge into the skull
    headShape(v); v.multiplyScalar(r);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals(); return g;
}
const HAIR = {};
const hairGeo = style => (HAIR[style] ||= hairShell(style));
const SPHERE = new THREE.SphereGeometry(1, 28, 20), SPH_LO = new THREE.SphereGeometry(1, 16, 12);
const CAP = new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI * .5);
const DISC = new THREE.CircleGeometry(1, 28);
const caps = {};
const capsule = (r, l) => (caps[`${r}|${l}`] ||= new THREE.CapsuleGeometry(r, l, 8, 18));
const TORSO = new RoundedBoxGeometry(.56, .52, .36, 5, .12);
const HEM = new RoundedBoxGeometry(.565, .06, .365, 3, .03);
const PELVIS = new RoundedBoxGeometry(.47, .2, .31, 4, .09);
const SHIN = new THREE.CylinderGeometry(.092, .104, .3, 18);
const SHOE = new RoundedBoxGeometry(.17, .11, .28, 4, .05);
const SOLE = new RoundedBoxGeometry(.175, .03, .285, 2, .012);
const COLLAR = new THREE.TorusGeometry(.1, .036, 10, 24);
// Face decal: mouth and eyebrows painted on a canvas mapped onto a shell that hugs the head (no protruding corners).
// The canvas covers u ∈ [.11, .39] (front of the sphere) and v ∈ [.25, .75].
const FACE_U = [.11, .39], FACE_V = [.25, .75];
const faceTex = new Map();
function faceTexture(brows, open) {
  const k = `${brows}|${open}`;
  if (faceTex.has(k)) return faceTex.get(k);
  const cv = document.createElement('canvas'); cv.width = cv.height = 512;
  const c = cv.getContext('2d');
  c.lineCap = c.lineJoin = 'round';
  // thick arched brows, slightly frowning towards the nose (the game's smug look)
  c.strokeStyle = brows; c.lineWidth = 40;
  for (const side of [-1, 1]) { c.beginPath(); c.moveTo(256 + side * 66, 158); c.quadraticCurveTo(256 + side * 116, 104, 256 + side * 172, 132); c.stroke(); }
  // wide grin with the upper teeth; `open` (0…1) drops the jaw for lip-sync
  const cx = 248, top = 360, w = 128, depth = 30 + open * 70;
  c.beginPath();
  c.moveTo(cx - w, top - 4); c.quadraticCurveTo(cx, top + 16, cx + w + 8, top - 14);
  c.quadraticCurveTo(cx + w * .7, top + depth + 10, cx, top + depth + 12); c.quadraticCurveTo(cx - w * .75, top + depth + 6, cx - w, top - 4);
  c.closePath(); c.fillStyle = '#5c1622'; c.fill();
  c.save(); c.clip();
  c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(cx - w, top - 6); c.quadraticCurveTo(cx, top + 14, cx + w + 8, top - 16); c.lineTo(cx + w + 8, top + 26); c.quadraticCurveTo(cx, top + 42, cx - w, top + 20); c.closePath(); c.fill();
  if (open > .25) { c.fillStyle = '#e85a78'; c.beginPath(); c.ellipse(cx + 8, top + depth + 2, w * .5, 16 + open * 8, 0, Math.PI, 0); c.fill(); }
  c.restore();
  c.strokeStyle = 'rgba(90,30,30,.55)'; c.lineWidth = 5;
  c.beginPath(); c.moveTo(cx - w, top - 4); c.quadraticCurveTo(cx, top + 16, cx + w + 8, top - 14); c.stroke();
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(1 / (FACE_U[1] - FACE_U[0]), 1 / (FACE_V[1] - FACE_V[0]));
  t.offset.set(-FACE_U[0] * t.repeat.x, -FACE_V[0] * t.repeat.y);
  faceTex.set(k, t);
  return t;
}
const OPEN_STEPS = [0, .35, .7, 1];
// iris and pupil as caps on the eyeball, so the lids can slide over them
const IRIS = new THREE.SphereGeometry(1, 32, 8, 0, Math.PI * 2, 0, .6).rotateX(Math.PI / 2);
const PUPIL = new THREE.SphereGeometry(1, 20, 4, 0, Math.PI * 2, 0, .28).rotateX(Math.PI / 2);
const GLINT = new THREE.SphereGeometry(1, 10, 3, 0, Math.PI * 2, 0, .12).rotateX(Math.PI / 2);
const SHARED = new Set([HEAD, SPHERE, SPH_LO, CAP, DISC, TORSO, HEM, PELVIS, SHIN, SHOE, SOLE, COLLAR, IRIS, PUPIL, GLINT]);
const isShared = g => SHARED.has(g) || Object.values(HAIR).includes(g) || Object.values(caps).includes(g);

function mesh(geo, m, { s = 1, p = [0, 0, 0], r = [0, 0, 0] } = {}) {
  const o = new THREE.Mesh(geo, m);
  if (Array.isArray(s)) o.scale.set(...s); else o.scale.setScalar(s);
  o.position.set(...p); o.rotation.set(...r);
  return o;
}

export class Avatar {
  constructor(preset, { scale = 1.07 } = {}) {
    this.root = new THREE.Group();
    this.root.scale.setScalar(scale);
    this.baseScale = scale;
    this.t = Math.random() * 10; this.blink = 1 + Math.random() * 3; this.level = 0;
    this.mode = 'idle'; this.emote = null; this.emoteT = 0; this.walk = null; this.walkW = 0; this.phase = 0; this.hitT = 0;
    this.build(preset);
  }
  get headY() { return HEAD_Y * this.baseScale; }
  build(preset) {
    this.preset = preset;
    if (this.body) { this.root.remove(this.body); this.body.traverse(o => { if (o.geometry && !isShared(o.geometry)) o.geometry.dispose(); }); this.faceMat?.dispose(); }
    const p = preset;
    const skin = mat(p.skin, .62), shirt = mat(p.shirt, .86), shirtDark = mat(new THREE.Color(p.shirt).multiplyScalar(.82).getStyle(), .9);
    const jeans = mat(p.pants, .9), glove = mat('#f2dcb6', .7), shoe = mat('#7a4527', .7), sole = mat('#4a2a18', .8), hairM = mat(p.hairColor || '#000', .88);
    this.lidRest = p.lids ?? -.3;
    const body = this.body = new THREE.Group();
    body.add(mesh(DISC, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .3, depthWrite: false }), { s: [.42, .42, 1], p: [0, .01, 0], r: [-Math.PI / 2, 0, 0] }));
    // hips → legs (thigh, knee, shin, ankle, shoe)
    const hips = this.hips = new THREE.Group(); hips.position.y = .7; body.add(hips);
    hips.add(mesh(PELVIS, jeans, { p: [0, -.02, 0] }));
    this.legs = [-1, 1].map(side => {
      const thigh = new THREE.Group(); thigh.position.set(side * .12, -.06, 0); hips.add(thigh);
      thigh.add(mesh(capsule(.1, .19), jeans, { p: [0, -.15, 0] }));
      const knee = new THREE.Group(); knee.position.y = -.31; thigh.add(knee);
      knee.add(mesh(SHIN, jeans, { p: [0, -.13, 0] }));
      const ankle = new THREE.Group(); ankle.position.y = -.3; knee.add(ankle);
      ankle.add(mesh(SHOE, shoe, { p: [0, -.02, .045] }));
      ankle.add(mesh(SOLE, sole, { p: [0, -.068, .045] }));
      return { thigh, knee, ankle, side };
    });
    // torso: boxy sweater with a hem band and a rolled collar
    const torso = this.torso = new THREE.Group(); torso.position.y = .02; hips.add(torso);
    torso.add(mesh(TORSO, shirt, { p: [0, .25, 0] }));
    torso.add(mesh(HEM, shirtDark, { p: [0, .02, 0] }));
    torso.add(mesh(COLLAR, shirtDark, { p: [0, .5, 0], r: [Math.PI / 2, 0, 0] }));
    // arms: shoulder → sleeve, elbow → forearm, wrist → mitten glove with fingers and thumb
    this.arms = [-1, 1].map(side => {
      const sh = new THREE.Group(); sh.position.set(side * .305, .42, 0); torso.add(sh);
      sh.add(mesh(SPHERE, shirt, { s: [.1, .1, .1] }));
      sh.add(mesh(capsule(.078, .17), shirt, { p: [0, -.13, 0] }));
      const el = new THREE.Group(); el.position.y = -.27; sh.add(el);
      el.add(mesh(capsule(.074, .19), shirt, { p: [0, -.13, 0] }));
      el.add(mesh(SPH_LO, shirtDark, { s: [.08, .03, .08], p: [0, -.26, 0] }));
      const hand = new THREE.Group(); hand.position.y = -.28; hand.scale.setScalar(1.42); el.add(hand);
      hand.add(mesh(SPHERE, glove, { s: [.072, .08, .045], p: [0, -.06, 0] }));
      for (let f = 0; f < 4; f++) hand.add(mesh(capsule(.02, .045), glove, { p: [(f - 1.5) * .032 * -side, -.125, .012], r: [.35, 0, (f - 1.5) * .08 * side] }));
      hand.add(mesh(capsule(.022, .035), glove, { p: [-side * .07, -.05, .03], r: [0, 0, side * .9] }));
      return { sh, el, hand, side };
    });
    // head on the collar (no visible neck)
    const head = this.head = new THREE.Group(); head.position.y = .5; head.scale.setScalar(1.3); torso.add(head);
    const hc = .19;   // centre of the skull above the collar
    head.add(mesh(HEAD, skin, { s: .225, p: [0, hc, 0] }));
    for (const side of [-1, 1]) head.add(mesh(SPHERE, skin, { s: [.026, .046, .034], p: [side * .205, hc - .01, -.005] }));
    head.add(mesh(SPHERE, mat(new THREE.Color(p.skin).offsetHSL(-.01, .05, -.04).getStyle(), .55), { s: [.032, .028, .03], p: [0, hc - .05, .2] }));
    // eyes: bulging, iris + pupil + highlight, heavy upper lids
    this.lids = [];
    for (const side of [-1, 1]) {
      const e = new THREE.Group(); e.position.set(side * .074, hc + .03, .172); head.add(e);
      const ES = [.054, .058, .042];
      e.add(mesh(SPHERE, mat('#f1ede7', .35), { s: ES }));
      const look = new THREE.Group(); look.rotation.set(.06, -side * .08, 0); e.add(look);
      look.add(mesh(IRIS, mat(p.eyes || '#7f8f3c', .45), { s: ES.map(v => v * 1.03) }));
      look.add(mesh(PUPIL, mat('#0c0806', .3), { s: ES.map(v => v * 1.04) }));
      const glint = mesh(GLINT, mat('#ffffff', .3, true), { s: ES.map(v => v * 1.05), r: [-.28, .3, 0] });
      look.add(glint);
      const lid = new THREE.Group(); e.add(lid);
      lid.add(mesh(CAP, skin, { s: [.059, .063, .049] }));
      lid.rotation.x = this.lidRest; this.lids.push(lid);
    }
    // painted face: brows and grin on a shell hugging the head
    this.browColor = p.brows || '#5c3020';
    this.faceMat = new THREE.MeshStandardMaterial({ map: faceTexture(this.browColor, 0), transparent: true, roughness: .6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    this.openStep = 0;
    head.add(mesh(HEAD, this.faceMat, { s: .2265, p: [0, hc, 0] }));
    // hair
    const shell = s => mesh(hairGeo(s), hairM, { s: .225, p: [0, hc, 0] });
    switch (p.hair) {
      case 'swept':
        head.add(shell('swept'));
        head.add(mesh(SPHERE, hairM, { s: [.055, .09, .04], p: [.02, hc + .27, -.09], r: [-.7, 0, -.35] }));   // crown tuft
        head.add(mesh(SPHERE, hairM, { s: [.09, .035, .06], p: [-.07, hc + .16, .15], r: [.5, .2, .45] }));   // fringe lock
        for (const side of [-1, 1]) head.add(mesh(SPHERE, hairM, { s: [.02, .05, .03], p: [side * .19, hc + .04, .03] }));
        break;
      case 'long':
        head.add(shell('long'));
        head.add(mesh(capsule(.12, .18), hairM, { s: [1.5, 1, .8], p: [0, hc - .12, -.1] }));
        break;
      case 'blond':
        head.add(shell('blond'));
        head.add(mesh(SPHERE, hairM, { s: [.11, .045, .07], p: [.04, hc + .19, .12], r: [.4, -.2, -.3] }));
        break;
      case 'cap': {
        const c = mat(p.hairColor, .7);
        head.add(mesh(CAP, c, { s: [.215, .19, .21], p: [0, hc + .07, -.005], r: [-.12, 0, 0] }));
        head.add(mesh(new THREE.CylinderGeometry(1, 1, 1, 24), c, { s: [.14, .012, .12], p: [0, hc + .1, .2], r: [.22, 0, 0] }));
        head.add(mesh(SPH_LO, mat('#ffffff', .7), { s: .022, p: [0, hc + .265, .01] }));
        break;
      }
      case 'beanie': {
        const c = mat(p.hairColor, .95);
        head.add(mesh(CAP, c, { s: [.22, .26, .215], p: [0, hc + .06, 0], r: [-.06, 0, 0] }));
        head.add(mesh(new THREE.TorusGeometry(.2, .032, 10, 32), c, { p: [0, hc + .08, .005], r: [Math.PI / 2 - .06, 0, 0] }));
        head.add(mesh(SPH_LO, mat('#ffffff', .95), { s: .045, p: [0, hc + .33, -.02] }));
        break;
      }
      case 'curly':
        head.add(shell('blond'));
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; head.add(mesh(SPH_LO, hairM, { s: .055, p: [Math.cos(a) * .15, hc + .21 + Math.sin(i * 1.7) * .02, Math.sin(a) * .13 - .02] })); }
        break;
      case 'bun':
        head.add(shell('swept'));
        head.add(mesh(SPHERE, hairM, { s: .075, p: [0, hc + .3, -.06] }));
        break;
      default: break;
    }
    this.root.add(body);
  }
  setPreset(p) { this.build(p); }
  get position() { return this.root.position; }
  headWorld(out = new THREE.Vector3()) { return this.head.localToWorld(out.set(0, .45, 0)); }
  play(emote, dur = 2.4) { this.emote = emote; this.emoteT = 0; this.emoteDur = dur; }
  stopEmote() { this.emote = null; }
  hit() { this.hitT = .5; }
  // walks to (x, z) with a real gait, then turns to face `face` (0 = the camera)
  walkTo(x, z, face = 0) {
    return new Promise(res => { this.walk?.res(); this.walk = { x, z, face, res, turning: false }; });
  }
  update(dt) {
    this.t += dt;
    const t = this.t, A = this.arms, L = this.legs;
    // blink
    this.blink -= dt;
    const closing = this.blink < .11;
    if (this.blink < 0) this.blink = 2.4 + Math.random() * 3.2;
    const lidTarget = closing ? 1.45 : this.lidRest + Math.sin(t * .5) * .04 + (this.mode === 'talk' ? -.2 : 0);
    for (const l of this.lids) l.rotation.x += (lidTarget - l.rotation.x) * Math.min(1, dt * (closing ? 40 : 10));
    // walking: move, steer, and drive the gait phase from the distance covered
    let moving = false;
    if (this.walk) {
      const w = this.walk, p = this.root.position, dx = w.x - p.x, dz = w.z - p.z, d = Math.hypot(dx, dz);
      const speed = 1.35 * this.baseScale;
      if (d > .03) {
        moving = true;
        const target = Math.atan2(dx, dz);
        let diff = Math.atan2(Math.sin(target - this.root.rotation.y), Math.cos(target - this.root.rotation.y));
        this.root.rotation.y += diff * Math.min(1, dt * 9);
        const step = Math.min(d, dt * speed * (.35 + .65 * this.walkW) * (Math.abs(diff) > 1.2 ? .3 : 1));
        p.x += dx / d * step; p.z += dz / d * step;
        this.phase += step / (.62 * this.baseScale) * Math.PI;
      } else {
        p.x = w.x; p.z = w.z;
        let diff = Math.atan2(Math.sin(w.face - this.root.rotation.y), Math.cos(w.face - this.root.rotation.y));
        this.root.rotation.y += diff * Math.min(1, dt * 8);
        if (Math.abs(diff) < .03) { this.root.rotation.y = w.face; const r = w.res; this.walk = null; r(); }
        else moving = this.walkW > .2;
      }
    }
    this.walkW += ((moving ? 1 : 0) - this.walkW) * Math.min(1, dt * 7);
    const W = this.walkW, ph = this.phase;
    // ---- base pose (idle): breathing, weight shift, arms hanging in an A-pose
    let thigh = [0, 0], knee = [0, 0], ankle = [0, 0], sx = [Math.sin(t * 1.1) * .04, -Math.sin(t * 1.1) * .04], sz = [-.26, .26], el = [-.1, -.1];
    let bob = Math.sin(t * 2.1) * .006, hipY = Math.sin(t * .7) * .03, hipZ = Math.sin(t * .7) * .025, torsoX = .02, torsoY = 0;
    let headX = Math.sin(t * .9) * .03, headY = Math.sin(t * .55) * .12, headZ = Math.sin(t * .7) * .03, hop = 0;
    // ---- walk cycle blended in by W
    if (W > .001) {
      const s = Math.sin(ph), c = Math.cos(ph);
      const lerp = (a, b) => a + (b - a) * W;
      thigh = [lerp(0, .55 * s), lerp(0, -.55 * s)];
      // the knee folds while the leg swings forward (peak just behind the vertical), the foot stays level
      knee = [lerp(0, .1 + .95 * Math.max(0, Math.sin(ph + 2.36))), lerp(0, .1 + .95 * Math.max(0, Math.sin(ph + Math.PI + 2.36)))];
      ankle = [(thigh[0] - knee[0]) * .75, (thigh[1] - knee[1]) * .75];
      sx = [lerp(sx[0], -.5 * s), lerp(sx[1], .5 * s)];
      sz = [lerp(-.26, -.16), lerp(.26, .16)];
      el = [lerp(-.1, -.35 - .25 * Math.max(0, -s)), lerp(-.1, -.35 - .25 * Math.max(0, s))];
      bob = lerp(bob, -.035 + .045 * Math.abs(c));
      hipY = lerp(hipY, .09 * s); hipZ = lerp(hipZ, .04 * c); torsoX = lerp(.02, .08); torsoY = lerp(0, -.14 * s);
      headX = lerp(headX, -.04); headY = lerp(headY, .07 * s); headZ = lerp(headZ, -.03 * c);
    }
    // ---- talking at the mic: the body follows the voice
    if (this.mode === 'talk' && W < .5) {
      const lv = this.level;
      sx = [-.55 - lv * .6 + Math.sin(t * 4.3) * .18, -.15 - Math.sin(t * 2.9) * .25 * (lv + .3)];
      sz = [-.45, .38]; el = [-1.1 - lv * .4, -.35];
      torsoX = .06 + lv * .08; bob += Math.sin(t * 7) * .012 * (1 + lv * 2);
      headX = -lv * .18 + Math.sin(t * 8) * lv * .08; headY = Math.sin(t * 1.3) * .2; headZ = Math.sin(t * 2.2) * .06;
    }
    // ---- emotes
    if (this.emote && W < .5) {
      this.emoteT += dt;
      const k = this.emoteT;
      switch (this.emote) {
        case 'wave': sz[0] = -2.55; sx[0] = -.15; el[0] = -.35 + Math.sin(k * 11) * .45; headZ = .12; headY = .15; break;
        case 'dance': hipZ = Math.sin(k * 7) * .2; sz = [-1.5 - Math.sin(k * 7) * .7, 1.5 - Math.sin(k * 7) * .7]; el = [-.8, -.8]; bob = Math.abs(Math.sin(k * 7)) * .05; headY = Math.sin(k * 7) * .3; thigh = [Math.max(0, Math.sin(k * 7)) * .4, Math.max(0, -Math.sin(k * 7)) * .4]; knee = [thigh[0] * 1.4, thigh[1] * 1.4]; break;
        case 'clap': { const c2 = Math.abs(Math.sin(k * 11)); sx = [-1.15, -1.15]; sz = [-.1 + c2 * .35, .1 - c2 * .35]; el = [-.9, -.9]; headX = .05; break; }
        case 'hop': hop = Math.abs(Math.sin(k * 6)) * .26; sz = [-.75, .75]; knee = [hop * 1.5, hop * 1.5]; thigh = [-hop, -hop]; break;
        case 'victory': sz = [-2.75, 2.75]; el = [-.2, -.2]; hop = Math.abs(Math.sin(k * 5)) * .2; headX = -.18; break;
        case 'shrug': sz = [-.75, .75]; el = [-1.5, -1.5]; sx = [-.5, -.5]; headZ = Math.sin(k * 2) * .18; break;
        default: break;
      }
      if (this.emoteDur && k > this.emoteDur) this.emote = null;
    }
    if (this.hitT > 0) { this.hitT -= dt; headX += this.hitT * 1.1; torsoX -= this.hitT * .5; sz = [sz[0] - this.hitT * 1.5, sz[1] + this.hitT * 1.5]; }
    // ---- apply (arms ease towards their targets)
    const k = Math.min(1, dt * 14);
    L.forEach((l, i) => { l.thigh.rotation.x = -thigh[i]; l.knee.rotation.x = knee[i]; l.ankle.rotation.x = ankle[i] - .02; });
    A.forEach((a, i) => { a.sh.rotation.x += (sx[i] - a.sh.rotation.x) * k; a.sh.rotation.z += (sz[i] - a.sh.rotation.z) * k; a.el.rotation.x += (el[i] - a.el.rotation.x) * k; });
    this.hips.position.y = .7 + bob + hop; this.hips.rotation.y = hipY; this.hips.rotation.z = hipZ;
    this.torso.rotation.x = torsoX; this.torso.rotation.y = torsoY - hipY * .7;
    this.torso.scale.set(1, 1 + Math.sin(t * 2.1) * .01, 1);
    this.head.rotation.x += (headX - this.head.rotation.x) * Math.min(1, dt * 10);
    this.head.rotation.y += (headY - this.head.rotation.y) * Math.min(1, dt * 6);
    this.head.rotation.z += (headZ - this.head.rotation.z) * Math.min(1, dt * 6);
    const want = this.level > .05 ? Math.min(3, Math.round(this.level * 4)) : this.hitT > .2 ? 2 : 0;
    if (want !== this.openStep) { this.openStep = want; this.faceMat.map = faceTexture(this.browColor, OPEN_STEPS[want]); this.faceMat.needsUpdate = true; }
  }
  dispose() {
    this.walk?.res();
    this.root.parent?.remove(this.root);
    this.body?.traverse(o => { if (o.geometry && !isShared(o.geometry)) o.geometry.dispose(); });
    this.faceMat?.dispose();
  }
}
