// The team raft and the animated traps of the river (their motion comes from sim/hazards.js).
import * as THREE from 'three';
import { RAFT_R } from '../sim/raft.js';
import { jawsClosure, barHeight, millAngle, sway, geyserPower, crocBite } from '../sim/hazards.js';
import { DS } from '../sim/track.js';
import { merge, mesh, outline, vtoon, paint, place, S, Cy, Co, Bx, To, shade } from './toon.js';

let PURPLE = '#b24fc8', PURPLE_HI = '#c97be0', SPIKE = '#fbf7f2';

// ---------------------------------------------------------------- raft
export function createRaft() {
  const root = new THREE.Group(), body = new THREE.Group();
  root.add(body);
  const R = RAFT_R - .25;
  const tube = mesh(merge([place(paint(new THREE.TorusGeometry(R, .44, 14, 40), '#f7dcb8'), [0, .35, 0], [Math.PI / 2, 0, 0]),
    place(paint(new THREE.TorusGeometry(R, .46, 8, 40, Math.PI * 2), '#8fe0d6'), [0, .2, 0], [Math.PI / 2, 0, 0], [1, 1, .55])]), vtoon());
  outline(tube, .035);
  body.add(tube);
  const deckParts = [Cy(R - .1, R - .1, .16, '#9fd273', [0, .38, 0], 0, 1, 32)];
  for (let i = -2; i <= 2; i++) { const x = i * .62, half = Math.sqrt(Math.max(0, (R - .14) ** 2 - x * x)); deckParts.push(Bx(.05, .02, half * 2, '#6f9f4b', [x + .31, .47, 0])); }
  // red handles and orange brackets round the tube
  for (let k = 0; k < 4; k++) {
    const a = k * Math.PI / 2 + Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
    deckParts.push(place(paint(new THREE.TorusGeometry(.3, .09, 6, 12, Math.PI), '#c8423a'), [c * R, .72, s * R], [0, -a + Math.PI / 2, 0]));
    deckParts.push(Bx(.5, .3, .25, '#f2a33a', [c * (R + .5), .05, s * (R + .5)], [0, -a, 0]));
  }
  const deck = mesh(merge(deckParts), vtoon());
  deck.receiveShadow = true;
  outline(deck, .03);
  body.add(deck);
  let pop = 0;
  return {
    root, body, tube,
    // air: 0..3, popT: seconds since the burst (-1 when inflated)
    setState(air, popT, t) {
      const deflate = air >= 3 ? 1 : air === 2 ? .92 : .8;
      tube.scale.set(1, 1, deflate + Math.sin(t * 30) * (air < 3 ? .012 : 0));
      if (popT >= 0) {
        pop = popT;
        const s = popT < .12 ? 1 + popT * 3 : Math.max(0, 1.36 - (popT - .12) * 6);
        body.scale.setScalar(s);
        body.visible = s > .01;
      } else if (pop) { pop = 0; body.scale.setScalar(1); body.visible = true; }
    },
  };
}

// ---------------------------------------------------------------- traps
function spikedLog(len, r = .45, density = 2.6, dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
  // log along +x centred at the origin, spikes radiating in the given (y,z) directions
  const p = [Cy(r, r, len, PURPLE, [0, 0, 0], [0, 0, Math.PI / 2], 1, 12)];
  for (let x = -len / 2 + .4; x < len / 2; x += 1.4) p.push(Cy(r + .04, r + .04, .18, PURPLE_HI, [x, 0, 0], [0, 0, Math.PI / 2], 1, 12));
  const n = Math.max(2, Math.round(len * density / dirs.length));
  for (let i = 0; i < n; i++) {
    const x = -len / 2 + (i + .5) * len / n;
    dirs.forEach(([dy, dz], k) => {
      const off = (k % 2) * .5 * len / n;
      const g = paint(new THREE.ConeGeometry(.16, .55, 8), SPIKE);
      g.translate(0, r + .2, 0); g.rotateX(Math.atan2(dz, dy)); g.translate(x + off - (off ? len / n / 4 : 0), 0, 0);
      p.push(g);
    });
  }
  return merge(p);
}

export function createTraps(T, course) {
  const th0 = course.theme;
  // trap colours follow the course's palette
  PURPLE = th0.trap || '#b24fc8'; PURPLE_HI = th0.trapHi || '#c97be0'; SPIKE = th0.spike || '#fbf7f2';
  const MINE = th0.mine || '#d2463c', POLE = th0.rail || '#86c540', POLE_RING = th0.railRing || '#5f9c2a', TOWER = th0.tower || '#f39bb0';
  const root = new THREE.Group(), live = [], o = {}, o2 = {};
  const mat = vtoon();
  const add = (m, ink = .035) => { if (ink) outline(m, ink); root.add(m); return m; };
  for (const h of course.hazards) {
    T.at(h.s, o);
    if (h.type === 'spikes') {
      // purple logs bolted to the bank, spikes pointing at the water
      const parts = [];
      for (let s = h.s; s < h.s1 - .1; s += 4) {
        const s2 = Math.min(h.s1, s + 4), len = s2 - s;
        const g = spikedLog(len + .3, .42, 2.4, [[.3, -1], [-.25, -1], [1, -.6], [-.9, -.5]].map(([y, z]) => { const l = Math.hypot(y, z); return [y / l, z / l]; }));
        T.at((s + s2) / 2, o2);
        const d = h.side * (o2.w - .2);
        // the log runs along the river; its spiky side (local -z) faces the centre line
        const m4 = new THREE.Matrix4().compose(new THREE.Vector3(o2.x + o2.nx * d, o2.y + .35, o2.z + o2.nz * d),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -o2.a + Math.PI / 2 + (h.side > 0 ? Math.PI : 0), 0)), new THREE.Vector3(1, 1, 1));
        g.applyMatrix4(m4);
        parts.push(g);
      }
      add(mesh(merge(parts), mat));
    } else if (h.type === 'rock' || h.type === 'post') {
      const rk = th0.rock || '#8d8f99';
      const g = h.type === 'post' ? merge([Cy(h.r, h.r * 1.1, 4, POLE, [0, 1.5, 0], 0, 1, 10)]) :
        merge([place(paint(new THREE.DodecahedronGeometry(1, 0), rk), [0, .3, 0], [.4, h.s, .2], [1, 1.3, 1]),
          place(paint(new THREE.DodecahedronGeometry(.7, 0), shade(rk, .1)), [.5, 1.1, .2], [.1, h.s * 2, .5]),
          place(paint(new THREE.IcosahedronGeometry(.55, 0), shade(rk, -.08)), [-.55, .9, -.3], [.6, 0, .3]),
          ...(th0.snowRocks ? [place(paint(new THREE.DodecahedronGeometry(.75, 0), '#ffffff'), [0, 1.25, 0], [.4, h.s, .2], [1, .45, 1.05])] : [])]);
      const m = mesh(g, h.type === 'post' ? mat : new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }));
      T.world(h.s, h.d, o2);
      m.position.set(o2.wx, o2.y, o2.wz); m.scale.setScalar(h.r * (h.type === 'rock' ? 1.15 : 1));
      add(m, h.type === 'post' ? .03 : 0);
    } else if (h.type === 'mine') {
      const g = merge([S(1, MINE, [0, 0, 0], 0, [1, .78, 1], 18), Cy(1.02, 1.02, .22, '#fbf7f2', [0, -.02, 0], 0, 1, 18),
        ...Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2, el = i % 2 ? .25 : .9; const g2 = paint(new THREE.ConeGeometry(.2, .55, 8), SPIKE); g2.translate(0, 1.05, 0); g2.rotateZ(-el); g2.rotateY(a); return g2; }),
        Co(.22, .6, SPIKE, [0, 1.05, 0], 0, 1, 8)]);
      const m = add(mesh(g, mat));
      m.scale.setScalar(h.r * .95);
      live.push(t => { T.world(h.s, sway(h, t), o2); m.position.set(o2.wx, o2.y + .15 + Math.sin(t * 2.4 + h.s) * .12, o2.wz); m.rotation.y = t * .6; });
    } else if (h.type === 'saw') {
      const parts = [Cy(1, 1, .16, '#c3c9d4', [0, 0, 0], 0, 1, 28), Cy(.32, .32, .3, '#d2463c', [0, .05, 0], 0, 1, 14)];
      for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; parts.push(place(paint(new THREE.ConeGeometry(.16, .42, 4), SPIKE), [Math.cos(a) * 1.12, 0, Math.sin(a) * 1.12], [0, -a, -Math.PI / 2 - .4])); }
      const m = add(mesh(merge(parts), mat));
      m.scale.setScalar(h.r / 1.12);
      live.push(t => { T.world(h.s, sway(h, t), o2); m.position.set(o2.wx, o2.y + .55, o2.wz); m.rotation.y = -t * 7; m.rotation.z = Math.sin(t * 3) * .08; });
    } else if (h.type === 'jaws') {
      // two studded slabs sliding from the banks, framed by bamboo posts
      const w = o.w, len = w + 1.2, th = h.thick ?? 1.3;
      const slabGeo = () => {
        const p = [Bx(len, 3.2, th, '#6f7685', [len / 2, 1.2, 0]), Bx(len + .1, .25, th + .1, '#565c69', [len / 2, 2.85, 0])];
        for (let i = 0; i < Math.floor(len / .9); i++) for (let j = 0; j < 3; j++) for (const sz of [1, -1]) p.push(Bx(.32, .32, .12, SPIKE, [.5 + i * .9, .3 + j * .9, sz * (th / 2 + .03)]));
        return merge(p);
      };
      const slabs = [1, -1].map(side => {
        const g = new THREE.Group(), m = mesh(slabGeo(), mat);
        outline(m, .04);
        g.add(m); root.add(g); return { g, side };
      });
      // the slabs retract into stone housings on the banks
      const housing = merge([Bx(len + .5, 4, th + .6, '#7b8292', [0, 1.5, 0]), Bx(len + .7, .45, th + .8, '#f7a43a', [0, 3.6, 0]),
        Bx(len * .7, 7, th * .8, '#6a7180', [len * .1, -4, 0]), ...[-1, 1].map(z => Bx(.5, .5, .1, '#ffd23f', [-(len + .5) / 2 + .6, 2.6, z * (th + .62) / 2]))]);
      for (const side of [1, -1]) {
        const m = add(mesh(housing, mat));
        T.world(h.s, side * (w + .1 + (len + .5) / 2), o2);
        m.position.set(o2.wx, o2.y - .3, o2.wz);
        m.rotation.y = side > 0 ? Math.PI - o2.a : -o2.a;
      }
      live.push(t => {
        const c = jawsClosure(h, t), e = w * (1 - c);
        for (const { g, side } of slabs) {
          T.world(h.s, side * (e + .02), o2);
          g.position.set(o2.wx, o2.y - .4, o2.wz);
          // local x (from the inner edge outwards) → towards this bank
          g.rotation.y = side > 0 ? Math.PI - o2.a : -o2.a;
        }
      });
    } else if (h.type === 'bar') {
      const w = o.w, g = new THREE.Group();
      const log = mesh(spikedLog(w * 2 + 1, .45, 2.4, [[-1, 0], [-.7, .7], [-.7, -.7], [0, 1], [0, -1]]), mat);
      outline(log, .035); g.add(log);
      root.add(g);
      for (const side of [1, -1]) {
        const p = add(mesh(merge([Cy(.35, .45, 6.4, POLE, [0, 3.2, 0], 0, 1, 8), Cy(.5, .5, .4, '#f7a43a', [0, 6.4, 0], 0, 1, 8), ...[1.4, 2.8, 4.2].map(y => Cy(.42, .42, .1, POLE_RING, [0, y, 0], 0, 1, 8))]), mat));
        T.world(h.s, side * (w + 1.1), o2); p.position.set(o2.wx, o2.y, o2.wz);
      }
      g.rotation.y = Math.PI - o.a; // the log spans the river
      // its own copy of the frame: `o` is reused by the next traps, so the bar used to be drawn at the last trap of the
      // course while it still hit at its real place, where nothing could be seen
      const at = { x: o.x, y: o.y, z: o.z };
      live.push(t => { g.position.set(at.x, at.y + barHeight(h, t) + .2, at.z); });
    } else if (h.type === 'mill') {
      const w = o.w, L = h.len ?? 7.2, H = h.hub ?? 3.4, n = h.arms ?? 4;
      const tower = add(mesh(merge([Cy(.7, 1, H + 1.2, TOWER, [0, (H - 1.2) / 2, 0], 0, 1, 10), Cy(.9, .9, .4, '#f7a43a', [0, -1, 0], 0, 1, 10), Co(1, 1.4, '#e8605a', [0, H + .3, 0], 0, 1, 10)]), mat));
      T.world(h.s, h.side * (w + 1.3), o2);
      tower.position.set(o2.wx - o2.tx * 1.2, o2.y, o2.wz - o2.tz * 1.2);
      const wheel = new THREE.Group();
      const arms = [];
      for (let i = 0; i < n; i++) {
        const g = spikedLog(L, .4, 2.2, [[0, 1], [0, -1], [1, 0], [-1, 0]]);
        g.translate(L / 2, 0, 0); g.rotateZ(i * Math.PI * 2 / n);
        arms.push(g);
      }
      arms.push(Cy(.65, .65, .9, '#f7a43a', [0, 0, 0], [Math.PI / 2, 0, 0], 1, 12));
      const wm = mesh(merge(arms), mat); outline(wm, .035);
      wheel.add(wm); root.add(wheel);
      wheel.position.set(o2.wx, o2.y + H, o2.wz);
      // the wheel turns in the plane made of the river's lateral axis and the vertical
      const basis = new THREE.Matrix4().makeBasis(new THREE.Vector3(o2.nx, 0, o2.nz), new THREE.Vector3(0, 1, 0), new THREE.Vector3(o2.tx, 0, o2.tz));
      wheel.quaternion.setFromRotationMatrix(basis);
      live.push(t => { wm.rotation.z = millAngle(h, t); });
    } else if (h.type === 'whirl') {
      const g = new THREE.Group();
      const m = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: .55, depthWrite: false });
      for (let k = 0; k < 3; k++) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(h.r * (.25 + k * .25), h.r * (.25 + k * .25) + .18, 40, 1, 0, Math.PI * 1.3), m);
        ring.rotation.x = -Math.PI / 2; ring.position.y = .05 + k * .01; ring.userData.k = k; g.add(ring);
      }
      T.world(h.s, h.d, o2); g.position.set(o2.wx, o2.y, o2.wz);
      root.add(g);
      live.push(t => g.children.forEach(r => { r.rotation.z = t * (2.4 - r.userData.k * .5) * h.dir; }));
    } else if (h.type === 'geyser') {
      // a foam disc that bubbles before the eruption, then a column of water
      const r = h.r ?? 1.8;
      const foamM = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: .4, depthWrite: false });
      const foam = new THREE.Mesh(new THREE.CircleGeometry(r, 28).rotateX(-Math.PI / 2), foamM);
      const colM = new THREE.MeshLambertMaterial({ color: th0.foam || '#ffffff', emissive: '#bfefff', emissiveIntensity: .35, transparent: true, opacity: .85 });
      const col = new THREE.Mesh(merge([Cy(r * .55, r * .8, 1, '#ffffff', [0, .5, 0], 0, 1, 14), ...[0, 1, 2, 3, 4].map(k => S(r * .42, '#ffffff', [Math.cos(k * 1.3) * r * .35, 1.02, Math.sin(k * 1.3) * r * .35], 0, 1, 8))]), colM);
      T.world(h.s, h.d, o2);
      const g = new THREE.Group(); g.position.set(o2.wx, o2.y + .05, o2.wz); g.add(foam, col); root.add(g);
      live.push(t => {
        const p = geyserPower(h, t), u = ((t / h.period + (h.phase || 0)) % 1 + 1) % 1;
        const warn = u > .45 && u < .62 ? .5 + .5 * Math.sin(t * 30) : 0;
        foamM.opacity = .25 + warn * .35 + p * .4;
        foam.scale.setScalar(1 + warn * .08 + p * .25);
        col.visible = p > .01; col.scale.set(1 + Math.sin(t * 20) * .04, Math.max(.01, p * 7.5), 1 + Math.cos(t * 23) * .04);
      });
    } else if (h.type === 'croc') {
      // a crocodile head sticking out of the water; the upper jaw snaps shut
      const green = th0.croc || '#5e9e3e', belly = '#e7e29a';
      const head = new THREE.Group();
      const lower = mesh(merge([Bx(1.1, .32, 2.2, green, [0, -.05, .9]), Bx(.9, .1, 1.9, belly, [0, .12, .9]),
        ...[-1, 1].flatMap(sx => [0, 1, 2, 3].map(k => Co(.07, .22, '#ffffff', [sx * .42, .25, .3 + k * .45], 0, 1, 6)))]), mat);
      const upperG = new THREE.Group(); upperG.position.set(0, .12, -.1);
      const upper = mesh(merge([Bx(1.15, .4, 2.3, green, [0, .2, 1]), ...[-1, 1].map(sx => S(.22, green, [sx * .32, .5, .05], 0, 1, 10)),
        ...[-1, 1].map(sx => S(.13, '#fff7c2', [sx * .32, .62, .1], 0, 1, 8)), ...[-1, 1].map(sx => Bx(.04, .16, .05, '#1d1d26', [sx * .32, .64, .2])),
        ...[-1, 1].map(sx => S(.05, '#2a3b20', [sx * .2, .42, 2.1], 0, 1, 6)), ...[-1, 1].flatMap(sx => [0, 1, 2, 3].map(k => Co(.07, .22, '#ffffff', [sx * .44, -.02, .4 + k * .45], [Math.PI, 0, 0], 1, 6)))]), mat);
      outline(lower, .03); outline(upper, .03);
      upperG.add(upper); head.add(lower, upperG);
      const bumps = mesh(merge([0, 1, 2].map(k => S(.4, green, [0, -.15, -1 - k * .9], 0, [1.2, .5, 1], 8))), mat);
      head.add(bumps);
      head.scale.setScalar(h.r / 1.1);
      root.add(head);
      live.push(t => {
        T.world(h.s, sway(h, t), o2);
        head.position.set(o2.wx, o2.y + .1 + Math.sin(t * 1.7 + h.s) * .05, o2.wz);
        // snout pointing upstream, at the incoming rafts
        head.rotation.y = -o2.a;
        upperG.rotation.x = -(1 - crocBite(h, t)) * .75;
      });
    } else if (h.type === 'turnstile') {
      const L = h.len ?? 4;
      const g = spikedLog(L * 2, .45, 2.4, [[1, 0], [0, 1], [0, -1], [.7, .7], [.7, -.7]]);
      const m = mesh(g, mat); outline(m, .035);
      const post = mesh(merge([Cy(.55, .6, 2.4, POLE, [0, .6, 0], 0, 1, 10), Cy(.7, .7, .3, '#f7a43a', [0, 1.9, 0], 0, 1, 10)]), mat); outline(post, .035);
      T.world(h.s, h.d || 0, o2);
      const grp = new THREE.Group(); grp.position.set(o2.wx, o2.y + .35, o2.wz); grp.add(m); root.add(grp);
      post.position.set(o2.wx, o2.y, o2.wz); root.add(post);
      // the log's axis is (cos a, sin a) in the river frame (along the current, towards the left bank)
      const fa = o2.a;
      live.push(t => {
        const a = (h.phase || 0) * Math.PI * 2 + t * (h.speed ?? 1);
        const dx = Math.cos(a) * Math.sin(fa) + Math.sin(a) * -Math.cos(fa), dz = Math.cos(a) * -Math.cos(fa) + Math.sin(a) * -Math.sin(fa);
        grp.rotation.y = Math.atan2(-dz, dx);
      });
    } else if (h.type === 'log') {
      const len = h.len ?? 4.5, r = h.r ?? .5;
      const g = mesh(merge([Cy(r, r, len, '#8a5a34', [0, 0, 0], [Math.PI / 2, 0, 0], 1, 10), ...[-1, 1].map(z => Cy(r * .82, r * .82, .04, '#d9b07a', [0, 0, z * len / 2], [Math.PI / 2, 0, 0], 1, 10)),
        ...[-.25, .15].map(z => Cy(r + .03, r + .03, .12, '#6e4527', [0, 0, z * len], [Math.PI / 2, 0, 0], 1, 10)), S(.22, '#6fb84a', [.1, r, .6], 0, [1.3, .5, 1], 6)]), mat);
      outline(g, .03); root.add(g);
      live.push(t => { T.world(h.s, sway(h, t), o2); g.position.set(o2.wx, o2.y + .12, o2.wz); g.rotation.set(Math.sin(t * 1.3 + h.s) * .05, -o2.a, Math.sin(t * 2.1) * .2); });
    } else if (h.type === 'boost') {
      const g = new THREE.Group(), cm = new THREE.MeshBasicMaterial({ color: '#ffd23f' });
      const chev = new THREE.Shape(); chev.moveTo(-1, 0); chev.lineTo(0, .9); chev.lineTo(1, 0); chev.lineTo(.6, 0); chev.lineTo(0, .55); chev.lineTo(-.6, 0);
      const geo = new THREE.ShapeGeometry(chev); geo.rotateX(-Math.PI / 2);
      const chevs = [];
      for (let k = 0; k < 4; k++) { const c = new THREE.Mesh(geo, cm); c.scale.setScalar(h.w * .45); g.add(c); chevs.push(c); }
      root.add(g);
      live.push(t => chevs.forEach((c, k) => {
        const u = ((t * .8 + k / 4) % 1), s = h.s + u * h.len;
        T.world(s, h.d, o2);
        c.position.set(o2.wx, o2.y + .06, o2.wz); c.rotation.y = -o2.a;
        c.scale.setScalar(h.w * .45 * Math.sin(u * Math.PI));
      }));
    }
  }
  return { root, update(t) { for (const f of live) f(t); } };
}
