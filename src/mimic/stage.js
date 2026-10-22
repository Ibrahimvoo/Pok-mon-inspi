// The 3D room of Mimic Party (the cosy studio of the game): plum walls with the emblem, wooden floor, hanging lamps,
// string lights, red armchair, speakers, green sofa, pink rugs, "GOOD VIBES ONLY" neon and the mic stand at the
// centre. Hosts the characters, moves the camera between the game's shots, throws tomatoes and renders portraits.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Avatar, presetById, HEAD_Y } from './avatar.js';
import { drawLogo } from './logo.js';

const C = c => new THREE.Color(c);
const std = (color, rough = .7, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
const glow = color => new THREE.MeshBasicMaterial({ color });
function box(w, h, d, m, r = .08) { return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)), m); }
function canvasTex(w, h, draw, { repeat, srgb = true } = {}) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  draw(cv.getContext('2d'), w, h, cv);
  const t = new THREE.CanvasTexture(cv);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  t.anisotropy = 4;
  return t;
}
const ease = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// camera shots seen in the game (positions in metres, characters ~1.9 m)
export const SHOTS = {
  home: { pos: [-1.75, 1.5, 5.3], look: [-3.75, 1.5, -1.6], fov: 44 },
  lobby: { pos: [2.2, 3.4, 9.4], look: [-1.6, 1.4, -3.2], fov: 50 },
  stage: { pos: [0, 4.1, 11.5], look: [0, 2.3, -4.6], fov: 46 },
  wide: { pos: [0, 4.6, 13], look: [0, 2.3, -4.6], fov: 48 },
};

const AURA_TEX = {};
export const AURAS = [
  { id: 'none', name: 'Aucune' }, { id: 'hearts', name: 'Cœurs' }, { id: 'stars', name: 'Étoiles' },
  { id: 'notes', name: 'Notes' }, { id: 'bubbles', name: 'Bulles' }, { id: 'flames', name: 'Flammes' },
];
// small canvas sprite for each aura particle
export function auraCanvas(kind, size = 64) {
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  const c = cv.getContext('2d'), s = size / 64;
  c.scale(s, s); c.lineJoin = 'round';
  if (kind === 'hearts') { c.fillStyle = '#ff4f9a'; c.strokeStyle = '#ffffff'; c.lineWidth = 4; c.beginPath(); c.moveTo(32, 54); c.bezierCurveTo(4, 34, 8, 8, 32, 20); c.bezierCurveTo(56, 8, 60, 34, 32, 54); c.fill(); c.stroke(); }
  else if (kind === 'stars') { c.fillStyle = '#ffd84a'; c.strokeStyle = '#fff6c0'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 11 : 26, a = i / 10 * Math.PI * 2 - Math.PI / 2; c.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke(); }
  else if (kind === 'notes') { c.fillStyle = '#9b6bff'; c.beginPath(); c.ellipse(22, 46, 10, 8, -.4, 0, 7); c.fill(); c.fillRect(29, 12, 5, 34); c.beginPath(); c.moveTo(34, 12); c.quadraticCurveTo(50, 18, 46, 32); c.lineTo(42, 30); c.quadraticCurveTo(44, 22, 34, 20); c.fill(); }
  else if (kind === 'bubbles') { const g = c.createRadialGradient(26, 24, 2, 32, 32, 26); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(.6, 'rgba(120,220,255,.35)'); g.addColorStop(1, 'rgba(120,220,255,.8)'); c.fillStyle = g; c.beginPath(); c.arc(32, 32, 24, 0, 7); c.fill(); }
  else if (kind === 'flames') { const g = c.createLinearGradient(0, 8, 0, 60); g.addColorStop(0, '#ffe066'); g.addColorStop(1, '#ff4a1a'); c.fillStyle = g; c.beginPath(); c.moveTo(32, 6); c.bezierCurveTo(50, 26, 52, 40, 44, 52); c.bezierCurveTo(38, 60, 26, 60, 20, 52); c.bezierCurveTo(12, 40, 18, 28, 32, 6); c.fill(); }
  return cv;
}
function auraTexture(kind) {
  if (!AURA_TEX[kind]) { AURA_TEX[kind] = new THREE.CanvasTexture(auraCanvas(kind)); AURA_TEX[kind].colorSpace = THREE.SRGBColorSpace; }
  return AURA_TEX[kind];
}

export class Stage {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'mmp-3d';
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' }); }
    catch { this.failed = true; return; }
    this.renderer = renderer;
    renderer.setPixelRatio(Math.min(1.5, devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    this.scene = new THREE.Scene();
    this.scene.background = C('#2a0f18');
    this.camera = new THREE.PerspectiveCamera(50, 16 / 9, .1, 80);
    this.cam = { pos: new THREE.Vector3(...SHOTS.stage.pos), look: new THREE.Vector3(...SHOTS.stage.look), fov: 50 };
    this.tween = null;
    this.avatars = new Map();
    this.fx = [];
    this.halloween = [];
    this.buildRoom();
    this.applyCam();
    this.running = false; this.last = 0;
    this.loop = this.loop.bind(this);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.canvas);
  }

  // ---------------------------------------------------------------- room
  buildRoom() {
    const S = this.scene;
    S.add(new THREE.HemisphereLight(C('#ffe0c8'), C('#3a1620'), 1.15));
    S.add(new THREE.AmbientLight(C('#ff9db4'), .22));
    const key = new THREE.DirectionalLight(C('#fff0dc'), 1.5); key.position.set(1.5, 6, 9); key.target.position.set(0, 1.2, -1); S.add(key, key.target);
    const rim = new THREE.DirectionalLight(C('#ff7ab0'), .35); rim.position.set(-6, 5, -2); S.add(rim);
    // floor: warm planks running towards the camera, brighter where the lamps fall
    const floorTex = canvasTex(1024, 1024, (c, w, h) => {
      const n = 10, pw = w / n;
      for (let i = 0; i < n; i++) {
        const base = [[176, 98, 56], [163, 88, 50], [186, 108, 62], [168, 94, 52]][i % 4];
        let y = 0;
        while (y < h) {
          const len = 260 + Math.random() * 420, v = (Math.random() - .5) * 18;
          c.fillStyle = `rgb(${base[0] + v},${base[1] + v * .7},${base[2] + v * .5})`;
          c.fillRect(i * pw, y, pw, len);
          c.fillStyle = 'rgba(70,30,15,.55)'; c.fillRect(i * pw, y, pw, 3);
          for (let g = 0; g < 6; g++) { c.fillStyle = `rgba(90,45,20,${.06 + Math.random() * .06})`; c.fillRect(i * pw + Math.random() * pw, y, 1.5, len); }
          y += len;
        }
        c.fillStyle = 'rgba(60,24,12,.75)'; c.fillRect(i * pw, 0, 3, h);
      }
    }, { repeat: [3.3, 2.1] });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(36, 24), std('#ffffff', .82, { map: floorTex }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, 2);
    S.add(floor);
    // warm pool of light around the mic
    const pool = new THREE.Mesh(new THREE.CircleGeometry(4.2, 48), new THREE.MeshBasicMaterial({ map: canvasTex(256, 256, (c, w) => { const g = c.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2); g.addColorStop(0, 'rgba(255,170,80,.42)'); g.addColorStop(1, 'rgba(255,140,60,0)'); c.fillStyle = g; c.fillRect(0, 0, w, w); }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(0, .015, .4); S.add(pool);
    // walls
    const wallTex = canvasTex(64, 512, (c, w, h) => { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3f1626'); g.addColorStop(.55, '#6a2b3f'); g.addColorStop(1, '#5e2436'); c.fillStyle = g; c.fillRect(0, 0, w, h); });
    const wallM = std('#ffffff', .95, { map: wallTex });
    const back = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), wallM); back.position.set(0, 6, -4.6); S.add(back);
    for (const side of [-1, 1]) { const sw = new THREE.Mesh(new THREE.PlaneGeometry(20, 12), std('#4a1a2a', .95)); sw.position.set(side * 18, 6, 4); sw.rotation.y = -side * Math.PI / 2; S.add(sw); }
    const base = new THREE.Mesh(new THREE.BoxGeometry(40, .16, .06), std('#2c0f18', .8)); base.position.set(0, .08, -4.57); S.add(base);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(40, 24), std('#20080f', 1)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, 11, 4); S.add(ceil);
    // emblem painted on the wall
    this.logoTex = canvasTex(1024, 1058, (c, w, h, cv) => drawLogo(cv));
    this.logo = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 4.65), std('#ffffff', .9, { map: this.logoTex, transparent: true }));
    this.logo.position.set(0, 4.35, -4.57); S.add(this.logo);
    // "GOOD VIBES ONLY" neon
    const neon = canvasTex(512, 420, (c) => {
      c.font = '700 112px "Sniglet", "Lilita One", sans-serif'; c.textAlign = 'center';
      c.shadowColor = '#ff4f9a'; c.shadowBlur = 24; c.fillStyle = '#ff9cc4';
      ['GOOD', 'VIBES', 'ONLY'].forEach((w, i) => { c.save(); c.translate(256, 120 + i * 118); c.rotate(-.1); c.fillText(w, 0, 0); c.restore(); });
    });
    const neonM = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.4), new THREE.MeshBasicMaterial({ map: neon, transparent: true }));
    neonM.position.set(-4.3, 4.85, -4.55); S.add(neonM);
    this.addFurniture();
    this.addLights();
    // mic stand at the front of the stage
    const mic = this.mic = new THREE.Group();
    const dark = std('#2b2b30', .45, { metalness: .5 });
    const baseM = new THREE.Mesh(new THREE.CylinderGeometry(.24, .26, .04, 28), dark); baseM.position.y = .02; mic.add(baseM);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, 1.36, 10), dark); pole.position.y = .7; mic.add(pole);
    const headG = new THREE.Group(); headG.position.y = 1.38; headG.rotation.x = -.55; mic.add(headG);
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(.032, .13, 4, 10), std('#1e1e22', .4, { metalness: .4 })); body.position.y = .08; headG.add(body);
    const grille = new THREE.Mesh(new THREE.SphereGeometry(.058, 18, 14), std('#9a9aa6', .35, { metalness: .7 })); grille.position.y = .2; headG.add(grille);
    mic.position.set(0, 0, 1.9);
    S.add(mic);
  }
  addFurniture() {
    const S = this.scene;
    const add = (o, p, ry = 0) => { o.position.set(...p); o.rotation.y = ry; S.add(o); return o; };
    // red armchair with yellow buttons (left)
    const chair = new THREE.Group(), red = std('#d81f2b', .6), gold = std('#e0a92a', .4, { metalness: .3 });
    const seat = box(1.5, .5, 1.25, red, .18); seat.position.y = .52; chair.add(seat);
    const back = box(1.55, 1.5, .38, red, .2); back.position.set(0, 1.25, -.48); chair.add(back);
    for (const s of [-1, 1]) { const arm = box(.34, .78, 1.25, red, .15); arm.position.set(s * .78, .78, 0); chair.add(arm); }
    for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), std('#ffd84a', .4)); b.position.set(-.45 + (i % 3) * .45, .95 + Math.floor(i / 3) * .35, -.28); chair.add(b); }
    for (const [x, z] of [[-.6, .5], [.6, .5], [-.6, -.5], [.6, -.5]]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(.05, .04, .3, 8), gold); l.position.set(x, .15, z); chair.add(l); }
    add(chair, [-5.9, 0, -2.6], .45);
    // plants
    const plant = (scale = 1) => {
      const g = new THREE.Group();
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(.34, .26, .55, 20), std('#d8d2c8', .7)); pot.position.y = .27; g.add(pot);
      const leafM = std('#2f6e3c', .7);
      for (let i = 0; i < 9; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), leafM);
        leaf.scale.set(.09, .55, .03);
        const a = i / 9 * Math.PI * 2;
        leaf.position.set(Math.cos(a) * .18, .95, Math.sin(a) * .18);
        leaf.rotation.set(Math.sin(a) * .7, -a, Math.cos(a) * .7);
        g.add(leaf);
      }
      g.scale.setScalar(scale); return g;
    };
    add(plant(1.15), [-4.6, 0, -3.3]);
    add(plant(1.1), [7.3, 0, -3.4]);
    // speakers: brown cabinet, lavender front, two dark drivers
    const speaker = () => {
      const g = new THREE.Group();
      const cab = box(1.15, 1.65, .95, std('#8a4527', .7), .1); cab.position.y = .83; g.add(cab);
      const face = box(1.02, 1.5, .08, std('#a9b3f2', .55), .05); face.position.set(0, .84, .48); g.add(face);
      for (const [y, r] of [[1.2, .29], [.56, .37]]) {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(r, r, .06, 32), std('#5a5f8a', .5)); ring.rotation.x = Math.PI / 2; ring.position.set(0, y, .53); g.add(ring);
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(r * .78, r * .5, .06, 32), std('#2a2c45', .6)); cone.rotation.x = Math.PI / 2; cone.position.set(0, y, .55); g.add(cone);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(r * .28, 16, 10), std('#3d4066', .4)); cap.scale.z = .4; cap.position.set(0, y, .57); g.add(cap);
      }
      return g;
    };
    add(speaker(), [-3.2, 0, -3.55], .3);
    add(speaker(), [3.3, 0, -3.55], -.3);
    // green sofa, coffee table and candle (right)
    const sofa = new THREE.Group(), olive = std('#454f22', .8);
    const sb = box(3.4, .55, 1.35, olive, .18); sb.position.y = .45; sofa.add(sb);
    const sback = box(3.4, 1, .4, olive, .18); sback.position.set(0, 1, -.5); sofa.add(sback);
    for (const s of [-1, 1]) { const a = box(.38, .8, 1.35, olive, .16); a.position.set(s * 1.7, .62, 0); sofa.add(a); }
    const cushion = box(.65, .6, .2, std('#c0186d', .7), .1); cushion.position.set(-1.1, .95, -.25); cushion.rotation.z = .2; sofa.add(cushion);
    add(sofa, [7.2, 0, -1.4], -1.05);
    const table = new THREE.Group(), wood = std('#6e3b22', .6);
    const top = box(1.7, .12, .95, wood, .04); top.position.y = .58; table.add(top);
    for (const [x, z] of [[-.7, .35], [.7, .35], [-.7, -.35], [.7, -.35]]) { const l = box(.1, .55, .1, wood, .02); l.position.set(x, .28, z); table.add(l); }
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .14, 12), std('#e8e0d0', .6)); candle.position.set(.3, .72, 0); table.add(candle);
    const flame = new THREE.Mesh(new THREE.SphereGeometry(.03, 8, 6), glow('#ffcc55')); flame.scale.y = 1.8; flame.position.set(.3, .83, 0); table.add(flame);
    add(table, [5.1, 0, -.5], -.25);
    // round pink rugs with rings
    const rugTex = canvasTex(512, 512, (c, w) => {
      for (let r = w / 2; r > 0; r -= 26) { c.beginPath(); c.arc(w / 2, w / 2, r, 0, Math.PI * 2); c.fillStyle = (r / 26 | 0) % 2 ? '#b8236f' : '#c42c7a'; c.fill(); }
      c.strokeStyle = 'rgba(255,140,200,.35)'; c.lineWidth = 4; for (let r = 60; r < w / 2; r += 52) { c.beginPath(); c.arc(w / 2, w / 2, r, 0, Math.PI * 2); c.stroke(); }
    });
    for (const [x, z, r] of [[-4.9, -.4, 2.3], [5.6, -.2, 2.5]]) {
      const rug = new THREE.Mesh(new THREE.CircleGeometry(r, 48), std('#ffffff', .95, { map: rugTex }));
      rug.rotation.x = -Math.PI / 2; rug.scale.y = .62; rug.position.set(x, .012, z); S.add(rug);
    }
    // shelves: fairy lights and plants (left), vinyl and cat plush (right)
    const shelfM = std('#c9a690', .7);
    const sl = box(2.7, .1, .45, shelfM, .03); sl.position.set(-6.8, 4.45, -4.35); S.add(sl);
    add(plant(.55), [-7.6, 4.5, -4.3]); add(plant(.5), [-6.2, 4.5, -4.3]);
    this.fairy = [];
    for (let i = 0; i < 9; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.075, 10, 8), glow('#ffd84a'));
      b.position.set(-8 + i * .3, 4.42 - (i % 3 === 1 ? .35 : i % 3 === 2 ? .2 : 0) - Math.sin(i) * .05, -4.1);
      S.add(b); this.fairy.push(b);
    }
    const sr = box(1.8, .08, .4, shelfM, .03); sr.position.set(5.6, 4.15, -4.37); S.add(sr);
    const vinyl = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .03, 32), std('#1d1a24', .3)); vinyl.rotation.x = Math.PI / 2; vinyl.position.set(5.0, 4.62, -4.5); S.add(vinyl);
    const label = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .035, 20), std('#e3438f', .5)); label.rotation.x = Math.PI / 2; label.position.set(5.0, 4.62, -4.49); S.add(label);
    const cat = new THREE.Group(), lil = std('#d9c4ef', .8);
    const cb = new THREE.Mesh(new THREE.SphereGeometry(.26, 16, 12), lil); cb.scale.set(1, .85, .9); cb.position.y = .24; cat.add(cb);
    const ch = new THREE.Mesh(new THREE.SphereGeometry(.22, 16, 12), lil); ch.position.y = .6; cat.add(ch);
    for (const s of [-1, 1]) { const ear = new THREE.Mesh(new THREE.ConeGeometry(.08, .14, 10), lil); ear.position.set(s * .12, .8, 0); cat.add(ear); const e = new THREE.Mesh(new THREE.SphereGeometry(.02, 8, 6), glow('#3a2a4a')); e.position.set(s * .08, .62, .2); cat.add(e); }
    add(cat, [6.1, 4.19, -4.3], -.3);
    // wall lamp (right)
    const lamp = new THREE.Group();
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, .6, 8), std('#c8c8d8', .4)); arm.rotation.z = Math.PI / 2; arm.position.set(-.3, 0, 0); lamp.add(arm);
    const shade = new THREE.Mesh(new THREE.SphereGeometry(.25, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), std('#d8d8ea', .5)); shade.rotation.x = Math.PI; lamp.add(shade);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 10), glow('#ffe066')); bulb.position.y = -.12; lamp.add(bulb);
    add(lamp, [7.6, 5.6, -4.3]);
  }
  addLights() {
    const S = this.scene;
    // two hanging lamps with visible beams, like the game's stage
    for (const x of [-2.5, 2.5]) {
      const wire = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, 2.4, 6), std('#1c1014', .8)); wire.position.set(x, 7.8, -2.4); S.add(wire);
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, .16, 12), std('#2a1a1c', .6)); sock.position.set(x, 6.55, -2.4); S.add(sock);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(.17, 18, 14), glow('#ffe36a')); bulb.position.set(x, 6.36, -2.4); S.add(bulb);
      const beam = new THREE.Mesh(new THREE.ConeGeometry(2.1, 5.2, 32, 1, true), new THREE.MeshBasicMaterial({ color: '#ffcf8a', transparent: true, opacity: .055, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
      beam.position.set(x, 3.75, -2.4); S.add(beam);
      const spot = new THREE.SpotLight(C('#ffc77a'), 55, 14, .62, .75, 1.4); spot.position.set(x, 6.3, -2.4); spot.target.position.set(x * .6, 0, -1.2); S.add(spot, spot.target);
    }
    const centre = new THREE.SpotLight(C('#ffb36a'), 70, 16, .45, .8, 1.5); centre.position.set(0, 7.5, 4); centre.target.position.set(0, 0, .4); this.scene.add(centre, centre.target);
    // string lights across the top right
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(1.2, 7.3, -4.3), new THREE.Vector3(5, 5.2, -4.3), new THREE.Vector3(10, 6.4, -4.3));
    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, .012, 5), std('#22140f', .8)); S.add(wire);
    for (let i = 1; i < 18; i++) {
      const p = curve.getPoint(i / 18);
      const b = new THREE.Mesh(new THREE.SphereGeometry(i % 2 ? .09 : .07, 10, 8), i % 2 ? glow('#ffd84a') : std('#3a2416', .5));
      b.position.copy(p); b.position.y -= .1; S.add(b);
    }
  }
  // seasonal decoration (lobby rule "Événement Halloween")
  setHalloween(on) {
    if (!!this.halloween.length === !!on) return;
    if (!on) { this.halloween.forEach(o => this.scene.remove(o)); this.halloween = []; return; }
    const pumpkin = (s) => {
      const g = new THREE.Group(), m = std('#ff7a1a', .6);
      for (let i = 0; i < 6; i++) { const r = new THREE.Mesh(new THREE.SphereGeometry(.3, 16, 12), m); r.scale.set(.55, .85, 1); r.rotation.y = i / 6 * Math.PI; r.position.y = .25; g.add(r); }
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(.04, .05, .14, 8), std('#3d6b25', .7)); stem.position.y = .55; g.add(stem);
      for (const x of [-.09, .09]) { const e = new THREE.Mesh(new THREE.ConeGeometry(.05, .07, 3), glow('#ffde6a')); e.rotation.z = Math.PI; e.position.set(x, .32, .29); g.add(e); }
      g.scale.setScalar(s); return g;
    };
    const ghost = () => {
      const g = new THREE.Group(), m = std('#f4f4ff', .6);
      const b = new THREE.Mesh(new THREE.CapsuleGeometry(.22, .3, 6, 14), m); b.position.y = .4; g.add(b);
      for (const x of [-.08, .08]) { const e = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 6), glow('#1a1020')); e.position.set(x, .55, .2); g.add(e); }
      return g;
    };
    const items = [[pumpkin(1.1), [-2.3, 0, -3.1]], [pumpkin(.8), [2.4, 0, -3.2]], [pumpkin(.55), [-7, 4.5, -4.3]], [ghost(), [5.6, 4.19, -4.3]], [pumpkin(.9), [4.4, .64, -.5]]];
    for (const [o, p] of items) { o.position.set(...p); this.scene.add(o); this.halloween.push(o); }
  }

  // ---------------------------------------------------------------- characters
  avatar(id) { return this.avatars.get(id); }
  addAvatar(id, presetId, { x = 0, z = 0, face = 0 } = {}) {
    let a = this.avatars.get(id);
    if (a) { if (a.preset.id !== presetId) a.setPreset(presetById(presetId)); }
    else { a = new Avatar(presetById(presetId)); this.avatars.set(id, a); this.scene.add(a.root); }
    a.root.position.set(x, 0, z); a.root.rotation.y = face; a.walk = null;
    return a;
  }
  removeAvatar(id) { const a = this.avatars.get(id); if (a) { a.dispose(); this.avatars.delete(id); } }
  clearAvatars(keep = []) { for (const id of [...this.avatars.keys()]) if (!keep.includes(id)) this.removeAvatar(id); }
  // a row in front of the back wall, as on the game's stage
  slots(n) {
    const gap = n > 4 ? 1.75 : 2.1;
    return Array.from({ length: n }, (_, i) => ({ x: (i - (n - 1) / 2) * gap, z: -1.7 }));
  }
  get micSpot() { return { x: 0, z: .95 }; }
  // menu pose: the player's character close to the camera with a mic in front of it
  homePose(a) {
    a.root.position.set(-3.15, 0, 2.15); a.root.rotation.y = .32; a.walk = null;
    this.mic.position.set(-2.42, 0, 3.02); this.mic.rotation.y = .5;
  }
  stagePose() { this.mic.position.set(0, 0, 1.9); this.mic.rotation.y = 0; }

  // particle aura around a character (Auras menu)
  setAura(id, kind) {
    const a = this.avatars.get(id);
    if (!a) return;
    if (a.aura) { a.root.remove(a.aura); a.aura = null; }
    if (!kind || kind === 'none') return;
    const tex = auraTexture(kind), g = new THREE.Group();
    g.userData = { kind, parts: [] };
    for (let i = 0; i < 12; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      sp.userData = { a: i / 12 * Math.PI * 2, y: Math.random() * 2.4, s: .18 + Math.random() * .14, v: .35 + Math.random() * .3 };
      g.add(sp); g.userData.parts.push(sp);
    }
    a.root.add(g); a.aura = g;
  }
  updateAuras(dt) {
    for (const a of this.avatars.values()) {
      if (!a.aura) continue;
      for (const sp of a.aura.userData.parts) {
        const u = sp.userData; u.y += dt * u.v; u.a += dt * .6;
        if (u.y > 2.9) u.y = .1;
        sp.position.set(Math.cos(u.a) * .85, u.y, Math.sin(u.a) * .55);
        sp.scale.setScalar(u.s * (a.aura.userData.kind === 'bubbles' ? 1.2 : 1));
        sp.material.opacity = Math.min(1, u.y * 2) * Math.min(1, (2.9 - u.y) * 1.5);
      }
    }
  }

  // ---------------------------------------------------------------- camera
  shot(name, { dur = 1.1, avatar = null } = {}) {
    let s = SHOTS[name];
    if (name === 'close' && avatar) {
      const p = avatar.root.position, hy = avatar.headY;
      s = { pos: [p.x + .3, hy * .97, p.z + 1.75], look: [p.x - .04, hy * .9, p.z], fov: 42 };
    }
    if (!s) return;
    const to = { pos: new THREE.Vector3(...s.pos), look: new THREE.Vector3(...s.look), fov: s.fov || 50 };
    if (!dur) { this.cam = to; this.tween = null; this.applyCam(); return; }
    this.tween = { from: { pos: this.cam.pos.clone(), look: this.cam.look.clone(), fov: this.cam.fov }, to, t: 0, dur };
  }
  applyCam() {
    const c = this.camera;
    c.position.copy(this.cam.pos); c.fov = this.cam.fov; c.updateProjectionMatrix(); c.lookAt(this.cam.look);
  }
  // screen position (0…1) of a world point
  project(v) { const p = v.clone().project(this.camera); return { x: (p.x + 1) / 2, y: (1 - p.y) / 2, front: p.z < 1 }; }

  // ---------------------------------------------------------------- effects
  throwTomato(target) {
    if (!target) return;
    const from = new THREE.Vector3((Math.random() - .5) * 6, 1.2 + Math.random(), 7.5);
    const to = target.headWorld(new THREE.Vector3()); to.y -= .2 + Math.random() * .5; to.x += (Math.random() - .5) * .5;
    const g = new THREE.Group();
    const t = new THREE.Mesh(new THREE.SphereGeometry(.11, 14, 10), std('#e02a1d', .35)); g.add(t);
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(.06, .05, 5), std('#3c8a2a', .6)); leaf.position.y = .1; g.add(leaf);
    g.position.copy(from); this.scene.add(g);
    this.fx.push({ kind: 'tomato', obj: g, from, to, t: 0, dur: .55 + Math.random() * .2, target });
  }
  splat(at, target) {
    target?.hit();
    const m = new THREE.MeshBasicMaterial({ color: '#c8160f', transparent: true, opacity: .9, depthWrite: false });
    for (let i = 0; i < 6; i++) {
      const d = new THREE.Mesh(new THREE.CircleGeometry(.08 + Math.random() * .16, 12), m.clone());
      d.rotation.x = -Math.PI / 2; d.position.set(at.x + (Math.random() - .5) * 1.4, .02 + i * .001, at.z + (Math.random() - .3) * 1.2);
      this.scene.add(d); this.fx.push({ kind: 'decal', obj: d, t: 0, dur: 7 });
    }
    for (let i = 0; i < 10; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.03 + Math.random() * .03, 6, 5), m);
      b.position.copy(at);
      this.scene.add(b); this.fx.push({ kind: 'drop', obj: b, v: new THREE.Vector3((Math.random() - .5) * 3, 1 + Math.random() * 2, (Math.random() - .2) * 2), t: 0, dur: 1.2 });
    }
  }
  clearFx() { for (const f of this.fx) { this.scene.remove(f.obj); } this.fx = []; }

  // ---------------------------------------------------------------- portraits (cards)
  portrait(presetId, bg = '#e5483f', size = 192) {
    if (this.failed) return '';
    const scene = new THREE.Scene();
    scene.background = C(bg);
    scene.add(new THREE.HemisphereLight(C('#fff4e8'), C('#5a2a20'), 1.6));
    const d = new THREE.DirectionalLight(C('#ffffff'), 1.6); d.position.set(1, 2, 4); scene.add(d);
    const a = new Avatar(presetById(presetId), { scale: 1 });
    a.root.rotation.y = -.22; a.lidRest = -.6; a.update(.016);
    scene.add(a.root);
    const cam = new THREE.PerspectiveCamera(30, 1, .1, 20);
    cam.position.set(.1, 1.5, 1.45); cam.lookAt(0, 1.42, 0);
    const rt = new THREE.WebGLRenderTarget(size, size, { colorSpace: THREE.SRGBColorSpace, samples: 4 });
    const r = this.renderer, prevTone = r.toneMapping;
    r.setRenderTarget(rt); r.render(scene, cam); r.setRenderTarget(null);
    r.toneMapping = prevTone;
    const px = new Uint8Array(size * size * 4);
    r.readRenderTargetPixels(rt, 0, 0, size, size, px);
    rt.dispose(); a.dispose();
    const cv = document.createElement('canvas'); cv.width = cv.height = size;
    const ctx = cv.getContext('2d'), img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) img.data.set(px.subarray((size - 1 - y) * size * 4, (size - y) * size * 4), y * size * 4);
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL('image/png');
  }

  // ---------------------------------------------------------------- loop
  resize() {
    if (this.failed) return;
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // narrow screens: step back so the stage still fits
    this.camera.zoom = Math.min(1, (w / h) / 1.6);
    this.camera.updateProjectionMatrix();
  }
  start() { if (this.failed || this.running) return; this.running = true; this.last = performance.now(); requestAnimationFrame(this.loop); }
  stop() { this.running = false; }
  loop(now) {
    if (!this.running) return;
    requestAnimationFrame(this.loop);
    const dt = Math.min(.05, (now - this.last) / 1000); this.last = now;
    if (this.tween) {
      const tw = this.tween; tw.t += dt;
      const k = ease(Math.min(1, tw.t / tw.dur));
      this.cam.pos.lerpVectors(tw.from.pos, tw.to.pos, k); this.cam.look.lerpVectors(tw.from.look, tw.to.look, k); this.cam.fov = tw.from.fov + (tw.to.fov - tw.from.fov) * k;
      if (k >= 1) this.tween = null;
    }
    this.applyCam();
    for (const a of this.avatars.values()) a.update(dt);
    this.updateAuras(dt);
    const t = now / 1000;
    this.fairy?.forEach((b, i) => { b.material.color.setScalar(.75 + Math.sin(t * 2 + i) * .25); });
    for (let i = this.fx.length - 1; i >= 0; i--) {
      const f = this.fx[i]; f.t += dt;
      const k = Math.min(1, f.t / f.dur);
      if (f.kind === 'tomato') {
        f.obj.position.lerpVectors(f.from, f.to, k); f.obj.position.y += Math.sin(k * Math.PI) * 1.2; f.obj.rotation.x += dt * 9;
        if (k >= 1) { this.scene.remove(f.obj); this.fx.splice(i, 1); this.splat(f.to, f.target); }
      } else if (f.kind === 'drop') {
        f.v.y -= 9 * dt; f.obj.position.addScaledVector(f.v, dt);
        if (f.obj.position.y < .02 || k >= 1) { this.scene.remove(f.obj); this.fx.splice(i, 1); }
      } else if (f.kind === 'decal') {
        if (k > .7) f.obj.material.opacity = .9 * (1 - (k - .7) / .3);
        if (k >= 1) { this.scene.remove(f.obj); this.fx.splice(i, 1); }
      }
    }
    this.onFrame?.(dt);
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.stop(); this.ro?.disconnect();
    this.clearFx();
    for (const id of [...this.avatars.keys()]) this.removeAvatar(id);
    this.renderer?.dispose();
    this.renderer?.forceContextLoss?.();
  }
}
