// 3D scenery of the on-foot épreuves: candy platforms over the lagoon, sweepers, hammers, bumpers,
// sinking tiles, arches, a flowing water plane and the far landscape. Poses come from sim/foot.js.
import * as THREE from 'three';
import { partPose, sinkDepth, sinkWarning, hammerAngle, sweeperAngle } from '../sim/foot.js';
import { merge, mesh, outline, vtoon, vflat, paint, place, S, Cy, Co, Bx, shade } from './toon.js';
import { archSign, treeGeo } from './world.js';

const WATER_VS = `varying vec2 vW; varying float vFog;
void main(){ vec4 w = modelMatrix * vec4(position,1.); vW = w.xz; vec4 mv = viewMatrix * w; vFog = -mv.z; gl_Position = projectionMatrix * mv; }`;
const WATER_FS = `uniform float uTime; uniform vec3 uDeep, uFoam, uFogColor; uniform float uFogNear, uFogFar;
varying vec2 vW; varying float vFog;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec2 p = vW * .18 + vec2(uTime * .05, uTime * .11);
  float s1 = n2(p + n2(p * .7 + uTime * .1));
  float streak = smoothstep(.72, .75, s1) * (1. - smoothstep(.77, .80, s1));
  float spark = step(.965, n2(vW * 1.6 + uTime * 1.3));
  vec3 col = mix(uDeep, uFoam, clamp(streak * .5 + spark * .35, 0., 1.));
  gl_FragColor = vec4(mix(col, uFogColor, smoothstep(uFogNear, uFogFar, vFog)), 1.);
  #include <colorspace_fragment>
}`;

function platformGeo(part) {
  const c = part.c || '#fff1d6', side = shade(c, -.18), [w, hgt, d] = part.s;
  const p = [Bx(w, hgt * .72, d, side, [0, -hgt * .14, 0]), Bx(w, hgt * .28, d, c, [0, hgt * .36, 0])];
  // rounded rim along the top edges
  for (const sx of [-1, 1]) p.push(place(paint(new THREE.CylinderGeometry(.18, .18, d, 8), shade(c, .2)), [sx * w / 2, hgt / 2, 0], [Math.PI / 2, 0, 0]));
  for (const sz of [-1, 1]) p.push(place(paint(new THREE.CylinderGeometry(.18, .18, w, 8), shade(c, .2)), [0, hgt / 2, sz * d / 2], [0, 0, Math.PI / 2]));
  if (part.ice) for (let i = -2; i <= 2; i++) p.push(place(paint(new THREE.BoxGeometry(w * .15, .02, d * .5), '#ffffff'), [i * w / 5, hgt / 2 + .015, (i % 2) * d / 6], [0, .5, 0]));
  if (part.bounce) for (let i = 0; i < 3; i++) p.push(Cy(.5, .5, .12, '#ff5d8f', [(i - 1) * 1.4, hgt / 2 + .07, 0], 0, 1, 12));
  if (part.conveyor) for (let i = -2; i <= 2; i++) p.push(Bx(w * .8, .04, .25, shade(c, -.3), [0, hgt / 2 + .02, i * d / 6]));
  return merge(p);
}
function discGeo(part) {
  const c = part.c || '#4fd1c5';
  const p = [Cy(part.r, part.r * .92, part.h * .72, shade(c, -.18), [0, -part.h * .14, 0], 0, 1, 36), Cy(part.r, part.r, part.h * .28, c, [0, part.h * .36, 0], 0, 1, 36)];
  // stripes on the top so the rotation can be read
  if (part.spin) for (let k = 0; k < 6; k++) p.push(place(paint(new THREE.BoxGeometry(part.r * .9, .03, .3), shade(c, .25)), [Math.cos(k / 6 * Math.PI * 2) * part.r * .5, part.h / 2 + .01, Math.sin(k / 6 * Math.PI * 2) * part.r * .5], [0, -k / 6 * Math.PI * 2, 0]));
  p.push(place(paint(new THREE.TorusGeometry(part.r, .16, 6, 36), shade(c, .2)), [0, part.h / 2, 0], [Math.PI / 2, 0, 0]));
  return merge(p);
}

export function buildLevel(level) {
  const theme = level.theme, root = new THREE.Group(), live = [], mat = vtoon(), P = {};
  // water
  const water = new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
    vertexShader: WATER_VS, fragmentShader: WATER_FS,
    uniforms: { uTime: { value: 0 }, uDeep: { value: new THREE.Color(theme.water) }, uFoam: { value: new THREE.Color(theme.foam) }, uFogColor: { value: new THREE.Color(theme.fog) }, uFogNear: { value: theme.fogNear }, uFogFar: { value: theme.fogFar } },
  }));
  root.add(water);
  for (const part of level.parts) {
    if (part.type === 'box' || part.type === 'disc') {
      const m = mesh(part.type === 'box' ? platformGeo(part) : discGeo(part), mat, { receive: true });
      outline(m, .05);
      root.add(m);
      // a ring of foam where pillars meet the water
      const foot = new THREE.Mesh(part.type === 'disc' ? new THREE.RingGeometry(part.r, part.r + .6, 32).rotateX(-Math.PI / 2) : new THREE.PlaneGeometry(part.s[0] + 1.2, part.s[2] + 1.2).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: .35, depthWrite: false }));
      foot.position.y = .03; root.add(foot);
      // pillar down to the water
      const top = part.p[1] - (part.type === 'disc' ? part.h : part.s[1]) / 2;
      if (top > .2 && !part.move) {
        const pil = mesh(merge([Cy(.5, .65, top + 1, shade(part.c || '#fff1d6', -.3), [0, (top - 1) / 2, 0], 0, 1, 10)]), mat);
        pil.position.set(part.p[0], 0, part.p[2]); root.add(pil);
      }
      const update = t => {
        partPose(part, t, P);
        const sink = sinkDepth(part, t), warn = sinkWarning(part, t);
        m.position.set(P.x + (warn ? Math.sin(t * 50) * .06 : 0), P.y - sink, P.z);
        m.rotation.y = P.yaw;
        m.visible = sink < 5.9;
        foot.position.set(P.x, .03, P.z); foot.rotation.y = P.yaw;
        foot.visible = P.y - sink - (part.type === 'disc' ? part.h : part.s[1]) / 2 < .4;
      };
      update(0);
      if (part.move || part.spin || part.sink) live.push(update);
    } else if (part.type === 'sweeper') {
      const g = new THREE.Group(), arms = part.arms ?? 1, step = part.half ? Math.PI * 2 / arms : Math.PI / arms;
      const bars = [];
      for (let k = 0; k < arms; k++) {
        const L = part.half ? part.len : part.len * 2, x0 = part.half ? part.len / 2 : 0;
        const bar = [Cy(part.r, part.r, L, part.c || '#b58cf0', [x0, 0, 0], [0, 0, Math.PI / 2], 1, 12)];
        for (let x = (part.half ? .6 : -part.len + .6); x < part.len; x += 1.2) bar.push(Cy(part.r + .03, part.r + .03, .3, '#ffffff', [x, 0, 0], [0, 0, Math.PI / 2], 1, 12));
        bar.push(S(part.r * 1.6, '#ff5d8f', [part.len, 0, 0], 0, 1, 10)); if (!part.half) bar.push(S(part.r * 1.6, '#ff5d8f', [-part.len, 0, 0], 0, 1, 10));
        const geo = merge(bar); geo.rotateY(-k * step);
        bars.push(geo);
      }
      const m = mesh(merge(bars), mat); outline(m, .04); g.add(m);
      const hub = mesh(merge([Cy(.9, 1.1, 1.4, '#ffd23f', [0, 0, 0], 0, 1, 14), Co(.9, .8, '#ff5d8f', [0, 1.1, 0], 0, 1, 14)]), mat);
      outline(hub, .04); g.add(hub);
      g.position.set(...part.p); root.add(g);
      const update = t => { m.rotation.y = -sweeperAngle(part, t, level); const on = part.start == null || t >= part.start; m.position.y = on ? 0 : Math.min(8, (part.start - t) * 2); };
      update(0); live.push(update);
    } else if (part.type === 'hammer') {
      const g = new THREE.Group(), L = part.len ?? 4, r = part.r ?? .9, c = part.c || '#ff8fb1';
      const hub = mesh(merge([Bx(.5, .5, .5, '#5d6472', [0, 0, 0])]), mat);
      hub.position.set(...part.p); root.add(hub);
      const arm = new THREE.Group();
      const head = mesh(merge([Cy(.1, .1, L, '#5d6472', [0, -L / 2, 0], 0, 1, 6), Cy(r, r, r * 2.4, c, [0, -L, 0], [Math.PI / 2, 0, 0], 1, 16), Cy(r * 1.03, r * 1.03, .3, '#ffffff', [0, -L, r * .7], [Math.PI / 2, 0, 0], 1, 16), Cy(r * 1.03, r * 1.03, .3, '#ffffff', [0, -L, -r * .7], [Math.PI / 2, 0, 0], 1, 16)]), mat);
      outline(head, .04); arm.add(head);
      arm.position.set(...part.p); root.add(arm);
      // same pendulum as the simulation: across the path by default, along it with axis 'x'
      const update = t => { const a = hammerAngle(part, t); if (part.axis === 'x') arm.rotation.set(-a, 0, 0); else arm.rotation.set(0, 0, a); };
      update(0); live.push(update);
    } else if (part.type === 'gantry') {
      // decorative frame holding the hammers: a beam along the path on two portals beside it
      const [x, y, z] = part.p, L = part.len, W = part.w;
      const g = [Bx(.5, .5, L, '#7b8292', [0, 0, 0])];
      for (const sz of [-1, 1]) {
        g.push(Bx(W * 2 + .6, .5, .5, '#7b8292', [0, 0, sz * L / 2]));
        for (const sx of [-1, 1]) g.push(Cy(.25, .32, y + 1, '#7b8292', [sx * W, -y / 2 - .3, sz * L / 2], 0, 1, 8), Cy(.36, .36, .3, '#f7a43a', [sx * W, .35, sz * L / 2], 0, 1, 8));
      }
      const m = mesh(merge(g), mat); outline(m, .04); m.position.set(x, y + .25, z); root.add(m);
    } else if (part.type === 'bumper') {
      const parts = [Cy(part.r, part.r * 1.05, part.h, part.c || '#ff9f43', [0, part.h / 2, 0], 0, 1, 18)];
      for (let k = 0; k < 3; k++) parts.push(Cy(part.r + .04, part.r + .04, .22, '#ffffff', [0, .4 + k * .6, 0], 0, 1, 18));
      parts.push(S(part.r * .9, '#ff5d8f', [0, part.h, 0], 0, [1, .45, 1], 14));
      const m = mesh(merge(parts), mat); outline(m, .04);
      m.position.set(...part.p); root.add(m);
      live.push(t => { partPose(part, t, P); m.position.set(P.x, P.y, P.z); const s = 1 + Math.sin(t * 6 + part.p[0]) * .03; m.scale.set(s, 1, s); });
    }
  }
  // checkpoint and finish arches
  // arches are taller here so the camera behind the runner passes under the board
  const arch = (z, text, w) => { const a = archSign(text, w / 1.5, { pole: theme.rail, ring: theme.railRing }); a.scale.setScalar(1.5); a.position.set(z.p[0], z.p[1] - 1, z.p[2]); root.add(a); };
  level.checkpoints.forEach(z => arch(z, 'CHECKPOINT', z.s[0] + 1));
  if (level.finish) arch({ p: [level.finish.p[0], level.finish.p[1], level.finish.p[2] + level.finish.s[2] / 2 + .5] }, 'ARRIVÉE', level.finish.s[0] + 1);
  if (level.kind === 'race') arch({ p: [0, 3, 8.5] }, 'DÉPART', 15);
  // far landscape: floating islands with palms, mesas and clouds
  const rnd = (() => { let s = 99; return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646; })();
  const isl = [], palms = [], far = [], clouds = [];
  const cz = level.kind === 'race' ? 75 : 0;
  // islands keep clear of the course corridor (race) or of the arena
  const clear = (x, z) => level.kind === 'race' ? Math.abs(x) > 26 || z < -30 || z > (level.finishZ || 150) + 30 : Math.hypot(x, z) > 34;
  for (let k = 0; k < 40 && isl.length < 14; k++) { const a = rnd() * Math.PI * 2, d = 45 + rnd() * 60, x = Math.cos(a) * d, z = cz + Math.sin(a) * d; if (clear(x, z)) isl.push([x, -.4, z, rnd() * 6, 3 + rnd() * 4]); }
  isl.forEach(([x, y, z, , s]) => { if (rnd() < .8) palms.push([x + (rnd() - .5) * s, y + s * .55, z + (rnd() - .5) * s, rnd() * 6, .9 + rnd() * .4]); });
  for (let k = 0; k < 22; k++) { const a = rnd() * Math.PI * 2, d = 200 + rnd() * 240; far.push([Math.cos(a) * d, -30 + rnd() * 40, cz + Math.sin(a) * d, rnd() * 6, 14 + rnd() * 22]); }
  for (let k = 0; k < 30; k++) { const a = rnd() * Math.PI * 2, d = 100 + rnd() * 350; clouds.push([Math.cos(a) * d, 30 + rnd() * 60, cz + Math.sin(a) * d, rnd() * 6, 6 + rnd() * 9]); }
  const inst = (geo, material, list, cast = false) => {
    const m = new THREE.InstancedMesh(geo, material, list.length), o = new THREE.Object3D();
    list.forEach((it, i) => { o.position.set(it[0], it[1], it[2]); o.rotation.set(0, it[3], 0); o.scale.setScalar(it[4]); o.updateMatrix(); m.setMatrixAt(i, o.matrix); });
    m.castShadow = cast; root.add(m); return m;
  };
  inst(merge([place(paint(new THREE.CylinderGeometry(1, .7, 1.1, 9), theme.sand), [0, 0, 0]), place(paint(new THREE.CylinderGeometry(.92, 1, .25, 9), theme.grass), [0, .6, 0])]), vflat(), isl);
  inst(treeGeo(theme, theme.flora?.palm ?? 2), vflat(), palms, true);
  inst(merge([place(paint(new THREE.CylinderGeometry(1, .8, 3, 9), theme.far), [0, 0, 0]), place(paint(new THREE.CylinderGeometry(1.02, 1.02, .25, 9), theme.grass), [0, 1.55, 0]), place(paint(new THREE.ConeGeometry(.8, 1.6, 9), shade(theme.far, -.12)), [0, -2.3, 0], [Math.PI, 0, 0])]), vflat(), far);
  inst(merge([[0, 0, 0, 1], [1.1, -.2, .2, .75], [-1.1, -.25, -.1, .7], [.4, .35, -.3, .7]].map(([x, y, z, r]) => place(paint(new THREE.IcosahedronGeometry(r, 1), '#ffffff'), [x, y, z], 0, [1, .7, 1]))),
    new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: '#e8f4ff', emissiveIntensity: .55 }), clouds);
  return { root, update(t) { water.material.uniforms.uTime.value = t; for (const f of live) f(t); } };
}
