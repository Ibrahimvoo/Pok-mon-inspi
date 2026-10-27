// Particle effects drawn with a few instanced meshes: gas clouds, wake rings, splashes, confetti, stars.
import * as THREE from 'three';
import { toon } from './toon.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();

// Instanced pool with per-instance colour and opacity.
class Pool {
  constructor(geo, mat, max, { alpha = false } = {}) {
    this.max = max; this.items = []; this.free = [];
    this.mesh = new THREE.InstancedMesh(geo, mat, max);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false; this.mesh.castShadow = false;
    this.mesh.setColorAt(0, _c.set('#ffffff'));
    if (alpha) {
      this.alpha = new THREE.InstancedBufferAttribute(new Float32Array(max), 1);
      this.alpha.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute('aAlpha', this.alpha);
      mat.transparent = true; mat.depthWrite = false;
      mat.onBeforeCompile = sh => {
        sh.vertexShader = sh.vertexShader.replace('void main() {', 'attribute float aAlpha; varying float vAlpha;\nvoid main() { vAlpha = aAlpha;');
        sh.fragmentShader = sh.fragmentShader.replace('void main() {', 'varying float vAlpha;\nvoid main() {').replace('#include <dithering_fragment>', '#include <dithering_fragment>\ngl_FragColor.a *= vAlpha;');
      };
    }
    this.mesh.count = 0;
  }
  spawn(p) { if (this.items.length >= this.max) this.items.shift(); this.items.push(p); return p; }
  flush(write) {
    const m = this.mesh;
    let n = 0;
    for (const it of this.items) { write(it, n); n++; }
    m.count = n;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    if (this.alpha) this.alpha.needsUpdate = true;
  }
}

export function createFx(scene) {
  const puffs = new Pool(new THREE.IcosahedronGeometry(1, 1), toon('#ffffff'), 420);
  const rings = new Pool(new THREE.RingGeometry(.82, 1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffffff' }), 90, { alpha: true });
  const drops = new Pool(new THREE.IcosahedronGeometry(1, 0), toon('#ffffff'), 260);
  const confetti = new Pool(new THREE.BoxGeometry(1, .12, .6), new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide }), 360);
  const stars = new Pool(new THREE.OctahedronGeometry(1, 0), new THREE.MeshBasicMaterial({ color: '#ffffff' }), 60);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#0b3a66', transparent: true, opacity: .22, depthWrite: false }));
  for (const p of [puffs, rings, drops, confetti, stars]) scene.add(p.mesh);
  const R = () => Math.random();

  const api = {
    // a gas cloud: pos = emission point, dir = outward direction (unit), colors = palette
    puff(pos, dir, colors, power = 1) {
      const n = Math.round(2 + power * 2);
      for (let i = 0; i < n; i++) {
        const sp = (2.4 + R() * 2.4) * Math.sqrt(power);
        puffs.spawn({ x: pos.x + (R() - .5) * .3, y: pos.y + (R() - .5) * .3, z: pos.z + (R() - .5) * .3,
          vx: dir.x * sp + (R() - .5) * 1.4, vy: .6 + R() * 1.2, vz: dir.z * sp + (R() - .5) * 1.4,
          age: 0, life: .9 + R() * .6 + power * .25, s0: .18 + R() * .12, s1: (.36 + R() * .3) * (.75 + power * .35), c: colors[Math.floor(R() * colors.length)], rot: R() * 6 });
      }
    },
    ring(x, y, z, size = 2.6, life = 1.6, alpha = .75) { rings.spawn({ x, y: y + .04, z, age: 0, life, s0: size * .55, s1: size * 1.45, a: alpha }); },
    splash(x, y, z, n = 18, power = 1) {
      for (let i = 0; i < n; i++) {
        const a = R() * Math.PI * 2, sp = (1.5 + R() * 3) * power;
        drops.spawn({ x, y: y + .1, z, vx: Math.cos(a) * sp, vy: (3 + R() * 4) * power, vz: Math.sin(a) * sp, age: 0, life: 1.5, s: .08 + R() * .14, c: R() < .3 ? '#d7f3ff' : '#ffffff' });
      }
      api.ring(x, y, z, 2.2, 1.2, .9);
    },
    confetti(x, y, z, n = 80, spread = 4) {
      const cols = ['#ff5d8f', '#ffd23f', '#46b8f0', '#7cc94a', '#b46fd6', '#ff8a3d'];
      for (let i = 0; i < n; i++) confetti.spawn({ x: x + (R() - .5) * spread, y: y + R() * 2, z: z + (R() - .5) * spread, vx: (R() - .5) * 6, vy: 5 + R() * 7, vz: (R() - .5) * 6,
        age: 0, life: 3 + R() * 1.5, s: .16 + R() * .1, c: cols[i % cols.length], rx: R() * 6, ry: R() * 6, sx: (R() - .5) * 14, sy: (R() - .5) * 14 });
    },
    stars(x, y, z, n = 8) {
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; stars.spawn({ x, y, z, vx: Math.cos(a) * 3, vy: 2 + R() * 2, vz: Math.sin(a) * 3, age: 0, life: .8, s: .18, c: i % 2 ? '#ffd23f' : '#ffffff' }); }
    },
    shadow,
    update(dt) {
      puffs.flush((p, i) => {
        p.age += dt;
        const k = Math.exp(-2.2 * dt);
        p.vx *= k; p.vz *= k; p.vy = p.vy * k + .35 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        const u = p.age / p.life, g = u < .18 ? u / .18 : 1, sh = u > .7 ? 1 - (u - .7) / .3 : 1;
        const s = (p.s0 + (p.s1 - p.s0) * Math.min(1, u * 2.2)) * g * Math.max(0, sh);
        _m.compose(_p.set(p.x, p.y, p.z), _q.setFromEuler(_e.set(p.rot, p.rot * .7, 0)), _s.set(s, s * .9, s));
        puffs.mesh.setMatrixAt(i, _m); puffs.mesh.setColorAt(i, _c.set(p.c));
      });
      puffs.items = puffs.items.filter(p => p.age < p.life);
      rings.flush((p, i) => {
        p.age += dt;
        const u = p.age / p.life, s = p.s0 + (p.s1 - p.s0) * (1 - (1 - u) * (1 - u));
        _m.compose(_p.set(p.x, p.y, p.z), _q.identity(), _s.set(s, 1, s));
        rings.mesh.setMatrixAt(i, _m); rings.alpha.setX(i, p.a * (1 - u));
      });
      rings.items = rings.items.filter(p => p.age < p.life);
      drops.flush((p, i) => {
        p.age += dt; p.vy -= 16 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        const s = p.s * Math.max(0, 1 - p.age / p.life);
        _m.compose(_p.set(p.x, p.y, p.z), _q.identity(), _s.set(s, s, s));
        drops.mesh.setMatrixAt(i, _m); drops.mesh.setColorAt(i, _c.set(p.c));
      });
      drops.items = drops.items.filter(p => p.age < p.life && p.y > -3);
      confetti.flush((p, i) => {
        p.age += dt; p.vy -= 9 * dt; const k = Math.exp(-1.6 * dt); p.vx *= k; p.vz *= k; p.vy = Math.max(p.vy, -2.4);
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.rx += p.sx * dt; p.ry += p.sy * dt;
        const s = p.s * Math.min(1, (p.life - p.age) * 2);
        _m.compose(_p.set(p.x, p.y, p.z), _q.setFromEuler(_e.set(p.rx, p.ry, 0)), _s.set(s, s, s));
        confetti.mesh.setMatrixAt(i, _m); confetti.mesh.setColorAt(i, _c.set(p.c));
      });
      confetti.items = confetti.items.filter(p => p.age < p.life);
      stars.flush((p, i) => {
        p.age += dt; p.vy -= 6 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
        const s = p.s * (1 - p.age / p.life);
        _m.compose(_p.set(p.x, p.y, p.z), _q.setFromEuler(_e.set(p.age * 8, p.age * 5, 0)), _s.set(s, s * 1.6, s));
        stars.mesh.setMatrixAt(i, _m); stars.mesh.setColorAt(i, _c.set(p.c));
      });
      stars.items = stars.items.filter(p => p.age < p.life);
    },
    clear() { for (const p of [puffs, rings, drops, confetti, stars]) p.items.length = 0; },
    dispose() { for (const p of [puffs, rings, drops, confetti, stars]) { p.mesh.removeFromParent(); p.mesh.geometry.dispose(); p.mesh.dispose(); } shadow.removeFromParent(); },
  };
  return api;
}
