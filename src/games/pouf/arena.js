// The live 3D scene of a course: scenery, traps, the raft with its crew, effects, name tags and camera rig.
// Used by the title screen and the lobby (showcase camera) as well as during a run (follow camera).
import * as THREE from 'three';
import { buildTrack } from './sim/track.js';
import { RAFT_R } from './sim/raft.js';
import { buildWorld } from './view/world.js';
import { createTraps, createRaft } from './view/props.js';
import { createFx } from './view/fx.js';
import { createCharacter, gasOf, EMOTES } from './view/characters.js';
import { h } from '../../ui.js';
import { state } from '../../state.js';

export const SEAT_R = 1.58, DECK_Y = .3;
const v3 = new THREE.Vector3(), v4 = new THREE.Vector3();
const lerpAngle = (a, b, k) => a + (Math.atan2(Math.sin(b - a), Math.cos(b - a))) * k;

export function createArena(stage, overlay) {
  const tags = h('div.pf-tags');
  overlay.append(tags);
  let world = null, traps = null, raft = null, fx = null, track = null, course = null;
  const crew = new Map();        // id → { char, a, tag, bubble, look, puffing, mode, fly }
  const cam = { mode: 'orbit', yaw: 0, user: 0, pos: new THREE.Vector3(), look: new THREE.Vector3(), shake: 0, t: 0, focusId: null, intro: 0 };
  const rs = { x: 0, z: 0, y: 0, yaw: 0, air: 3, pop: -1, s: 0, inv: 0 };
  const o = {};

  const arena = {
    get track() { return track; }, get course() { return course; }, get fx() { return fx; }, get raft() { return raft; }, rs, crew, cam,
    load(c) {
      if (course?.id === c.id) return;
      arena.unload();
      course = c; track = buildTrack(c);
      stage.setTheme(c.theme);
      world = buildWorld(track, c); stage.scene.add(world.root);
      traps = createTraps(track, c); stage.scene.add(traps.root);
      raft = createRaft(); stage.scene.add(raft.root);
      fx = createFx(stage.scene); stage.scene.add(fx.shadow);
      arena.placeAt(c.spawn);
      for (const m of crew.values()) raft.body.add(m.char.root);
    },
    unload() {
      if (!course) return;
      for (const m of crew.values()) m.char.root.removeFromParent();
      fx.dispose();
      for (const r of [world.root, traps.root, raft.root]) { r.removeFromParent(); r.traverse(x => { if (x.geometry && !x.geometry.userData.shared) x.geometry.dispose(); }); }
      course = null;
    },
    placeAt(s, d = 0) {
      track.world(s, d, o);
      Object.assign(rs, { x: o.wx, z: o.wz, y: o.y, yaw: o.a, air: 3, pop: -1, s, inv: 0 });
      cam.yaw = o.a; cam.pos.set(o.wx - o.tx * 10, o.y + 6, o.wz - o.tz * 10);
    },
    // crew: [{ id, name, look, seat }] — characters are rebuilt only when their look changes
    setCrew(list, meId) {
      const keep = new Set(list.map(p => p.id));
      for (const [id, m] of crew) if (!keep.has(id)) { m.char.dispose(); m.tag.remove(); m.bubble.remove(); crew.delete(id); }
      for (const p of list) {
        let m = crew.get(p.id);
        const key = JSON.stringify(p.look);
        if (m && m.key !== key) { m.char.dispose(); m.char = createCharacter(p.look); raft?.body.add(m.char.root); m.key = key; }
        if (!m) {
          m = { char: createCharacter(p.look), key, a: (p.seat ?? crew.size) * Math.PI / 2 + Math.PI / 2, tag: h('div.pf-tag'), bubble: h('div.pf-bubble'), puff: false, puffT: 0, big: 0, run: 0, mode: 'raft', fly: null };
          tags.append(m.tag, m.bubble);
          raft?.body.add(m.char.root);
          crew.set(p.id, m);
        }
        m.name = p.name; m.me = p.id === meId; m.look = p.look;
        m.tag.textContent = p.name; m.tag.classList.toggle('me', m.me);
      }
    },
    seatAngle(id) { return crew.get(id)?.a ?? 0; },
    emote(id, em) {
      const m = crew.get(id); if (!m) return;
      m.char.emote(em);
      const e = EMOTES.find(x => x.id === em);
      m.bubble.textContent = e?.icon || '';
      m.bubble.classList.remove('show'); void m.bubble.offsetWidth; m.bubble.classList.add('show');
    },
    // gas from a rider: power 1 = steady stream, 2+ = big puff
    puffFrom(id, power = 1) {
      const m = crew.get(id); if (!m || !fx) return;
      const th = rs.yaw + m.a, dir = v4.set(Math.cos(th), 0, Math.sin(th));
      m.char.root.updateMatrixWorld(true);
      fx.puff(m.char.butt(v3), dir, gasOf(m.look.gas).c, power);
      if (power > 1.5) m.big = 1;
    },
    // a burst raft throws everybody in the air; they swim until the respawn
    throwCrew() {
      for (const m of crew.values()) {
        const th = rs.yaw + m.a + (Math.random() - .5) * .8, sp = 4 + Math.random() * 3;
        m.fly = { x: rs.x + Math.cos(th) * SEAT_R, y: rs.y + 1, z: rs.z + Math.sin(th) * SEAT_R, vx: Math.cos(th) * sp, vy: 8 + Math.random() * 3, vz: Math.sin(th) * sp, spin: (Math.random() - .5) * 14, swim: false };
        stage.scene.add(m.char.root);
      }
    },
    boardCrew() { for (const m of crew.values()) { m.fly = null; raft.body.add(m.char.root); m.char.root.rotation.set(0, 0, 0); } },

    update(dt, t) {
      cam.t += dt;
      if (!course) return;
      world.update(t); traps.update(t);
      // raft pose with a bit of bobbing; tilts towards where the gas pushes
      const bob = Math.sin(cam.t * 2.1) * .06;
      raft.root.position.set(rs.x, rs.y + bob, rs.z);
      raft.root.rotation.y = -rs.yaw;
      let tx = 0, tz = 0;
      for (const m of crew.values()) if (m.puff && !m.fly) { const th = m.a; tx -= Math.cos(th); tz -= Math.sin(th); }
      raft.body.rotation.x += ((tz * .07 + Math.sin(cam.t * 1.3) * .025) - raft.body.rotation.x) * Math.min(1, dt * 4);
      raft.body.rotation.z += ((-tx * .07 + Math.cos(cam.t * 1.1) * .025) - raft.body.rotation.z) * Math.min(1, dt * 4);
      raft.setState(rs.air, rs.pop, cam.t);
      raft.body.visible = rs.pop < 0 || rs.pop < .4;
      if (rs.inv > 0 && rs.pop < 0) raft.body.visible = Math.floor(cam.t * 12) % 2 === 0 || rs.inv < .2;
      fx.shadow.position.set(rs.x, rs.y + .03, rs.z); fx.shadow.scale.setScalar(RAFT_R * 1.15); fx.shadow.visible = rs.pop < 0;
      // crew
      for (const [id, m] of crew) {
        const c = m.char;
        c.root.visible = cam.mode !== 'closeup' || id === cam.focusId;
        if (m.fly) {
          const f = m.fly;
          if (!f.swim) {
            f.vy -= 18 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z += f.vz * dt;
            c.root.rotation.x += f.spin * dt; c.root.rotation.z += f.spin * .6 * dt;
            const wy = track.at(Math.max(0, track.project(f.x, f.z, rs.s).s), o).y;
            if (f.y < wy && f.vy < 0) { f.swim = true; f.y = wy; fx.splash(f.x, wy, f.z, 14, .8); c.root.rotation.set(0, Math.random() * 6, 0); }
          } else { f.y += (track.at(Math.max(0, track.project(f.x, f.z, rs.s).s), o).y - .55 - f.y) * Math.min(1, dt * 5); if (Math.random() < dt * 2) fx.ring(f.x, f.y + .5, f.z, 1.4, 1, .6); }
          c.root.position.set(f.x, f.y, f.z);
          c.update(dt, { mode: f.swim ? 'swim' : 'fly' });
        } else {
          c.root.position.set(Math.cos(m.a) * SEAT_R, DECK_Y, Math.sin(m.a) * SEAT_R);
          c.root.rotation.set(0, -m.a - Math.PI / 2, 0);
          m.big = Math.max(0, m.big - dt * 3);
          c.update(dt, { mode: m.mode, run: m.run, puff: m.puff, big: m.big });
        }
      }
      fx.update(dt);
      // camera
      const C = stage.camera;
      if (cam.mode === 'follow') {
        track.at(Math.min(track.length, Math.max(0, rs.s) + 7), o);
        cam.yaw = lerpAngle(cam.yaw, o.a, Math.min(1, dt * 1.6));
        const yaw = cam.yaw + cam.user, fx_ = Math.sin(yaw), fz = -Math.cos(yaw);
        const dist = 11.5, hgt = 6.8;
        let px = rs.x - fx_ * dist, pz = rs.z - fz * dist, py = rs.y + hgt;
        if (cam.intro > 0) { // crane shot during the countdown: from high above the lagoon down to the raft
          const k = cam.intro * cam.intro * (3 - 2 * cam.intro);
          px -= fx_ * 9 * k; pz -= fz * 9 * k; py += 16 * k;
        }
        cam.pos.lerp(v3.set(px, py, pz), Math.min(1, dt * (cam.intro > 0 ? 3 : 5)));
        cam.look.lerp(v4.set(rs.x + fx_ * 4, rs.y + 1.2, rs.z + fz * 4), Math.min(1, dt * 6));
      } else if (cam.mode === 'orbit') {
        const a = cam.t * .12 + cam.user;
        cam.pos.lerp(v3.set(rs.x + Math.cos(a) * 10, rs.y + 4.6, rs.z + Math.sin(a) * 10), Math.min(1, dt * 2));
        cam.look.lerp(v4.set(rs.x, rs.y + 1.3, rs.z), Math.min(1, dt * 3));
      } else if (cam.mode === 'closeup') {
        const m = crew.get(cam.focusId);
        if (m) {
          m.char.root.updateMatrixWorld(true);
          const p = m.char.root.getWorldPosition(v4);
          const th = rs.yaw + m.a, ax = Math.cos(th), az = Math.sin(th);
          // face to face from the middle of the raft (the others step aside), the rider framed left of the menu
          const k = Math.sin(cam.t * .4) * .35;
          const cx = p.x - ax * 3.1 + az * k, cz = p.z - az * 3.1 - ax * k;
          cam.pos.lerp(v3.set(cx, p.y + 1.25, cz), Math.min(1, dt * 3));
          cam.look.lerp(v4.set(p.x - az * .9, p.y + .85, p.z + ax * .9), Math.min(1, dt * 4));
        }
      } else if (cam.mode === 'finish') {
        const a = cam.t * .35;
        cam.pos.lerp(v3.set(rs.x + Math.cos(a) * 8, rs.y + 3.6, rs.z + Math.sin(a) * 8), Math.min(1, dt * 2));
        cam.look.lerp(v4.set(rs.x, rs.y + 1, rs.z), Math.min(1, dt * 3));
      }
      C.position.copy(cam.pos);
      if (state.settings.reduceMotion) cam.shake = 0;   // console accessibility setting
      if (cam.shake > 0) { cam.shake = Math.max(0, cam.shake - dt * 2.5); C.position.x += (Math.random() - .5) * cam.shake * .5; C.position.y += (Math.random() - .5) * cam.shake * .5; }
      C.lookAt(cam.look);
      stage.focus(rs.x, rs.y, rs.z);
    },
    // name tags and emote bubbles follow the heads on screen
    updateTags(w, hgt) {
      const C = stage.camera;
      for (const m of crew.values()) {
        m.char.head.getWorldPosition(v3); v3.y += .95;
        v4.copy(v3).project(C);
        const vis = v4.z < 1 && Math.abs(v4.x) < 1.1 && Math.abs(v4.y) < 1.1 && !(m.fly?.swim && rs.pop < 0);
        const x = (v4.x * .5 + .5) * w, y = (-v4.y * .5 + .5) * hgt;
        const tr = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        m.tag.style.transform = tr + ' translate(-50%, -100%)';
        m.tag.style.opacity = vis ? 1 : 0;
        m.bubble.style.transform = tr + ' translate(-50%, -190%)';
      }
    },
    showTags(v) { tags.classList.toggle('hidden', !v); },
    // the on-foot épreuves use their own scene: hide the river while they run
    setVisible(v) {
      for (const r of [world?.root, traps?.root, raft?.root, fx?.shadow]) if (r) r.visible = v;
      tags.classList.toggle('hidden', !v);
    },
    dispose() {
      arena.unload();
      for (const m of crew.values()) m.char.dispose();
      crew.clear(); tags.remove();
    },
  };
  return arena;
}
