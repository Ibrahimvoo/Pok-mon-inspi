// One run of a raft course. The host steps the authoritative simulation and streams snapshots; guests
// predict their own rider, interpolate the raft and replay the host's events at the right moment.
import * as THREE from 'three';
import { RaftSim, unpack, MAX_AIR } from './sim/raft.js';
import { jawsClosure, barHeight } from './sim/hazards.js';
import { sound } from './audio.js';
import { createHud } from './ui/hud.js';
import { gasOf, EMOTES } from './view/characters.js';
import { input as consoleInput } from '../../input.js';
import { logDamage } from './damagelog.js';

export const GO = 3;                    // seconds of countdown before the current carries the raft
const STEP = 1 / 60, SNAP_EVERY = 1 / 20, INPUT_EVERY = 1 / 20, INTERP = .12;
const RUN = 4.3, MIN_SEP = .8, GAS_USE = .42, GAS_REGEN = .34, SUPER_COST = .3, HOLD = .9;
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
export const seatAngle = seat => Math.PI / 2 + seat * Math.PI / 2;
const r3 = v => Math.round(v * 1000) / 1000;

export function createMatch(g, { course, roster, host, meId, spectator = false }) {
  const { arena, lobby } = g;
  arena.load(course);
  arena.setCrew(roster, meId);
  arena.placeAt(course.spawn);
  arena.boardCrew();
  const riders = new Map();
  roster.forEach(p => {
    const m = arena.crew.get(p.id); if (m) m.a = seatAngle(p.seat);
    riders.set(p.id, { id: p.id, a: seatAngle(p.seat), puff: false, sp: 0, spSeen: 0, spUsed: 0, em: '', es: 0, esSeen: 0, gu: 0, guSeen: 0, puffTime: 0, supers: 0, emotes: 0, fxT: 0, sndT: 0 });
  });
  const me = spectator ? null : riders.get(meId);
  const sim = host ? new RaftSim(arena.track, course) : null;
  const hud = createHud(g.overlay, course);
  hud.show(true);
  arena.cam.mode = 'follow'; arena.cam.user = 0; arena.cam.intro = 1;
  arena.showTags(true);
  g.input.setPlaying(true);

  // aim arrow on the water: where the player's gas will push the raft
  const arrowShape = new THREE.Shape(); arrowShape.moveTo(-.35, 0); arrowShape.lineTo(.35, 0); arrowShape.lineTo(.35, 2.2); arrowShape.lineTo(.85, 2.2); arrowShape.lineTo(0, 3.3); arrowShape.lineTo(-.85, 2.2); arrowShape.lineTo(-.35, 2.2);
  const arrowGeo = new THREE.ShapeGeometry(arrowShape); arrowGeo.rotateX(Math.PI / 2);
  const arrow = new THREE.Mesh(arrowGeo, new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
  arrow.renderOrder = 2;
  g.stage.scene.add(arrow);

  let t = 0, acc = 0, snapT = 0, inpT = 0, finishedAt = -1, ended = false, phase = 'count', lastCount = 4, holdT = 0, wakeT = 0;
  let gas = 1, gasDelay = 0, superCd = 0, empty = false, aimShow = 0;
  const buf = [], pendingEv = [];
  let clockSet = false, lastSnapAt = performance.now();
  const view = { x: 0, z: 0, y: 0, yaw: 0, air: MAX_AIR, pop: -1, cp: 0, s: course.spawn, deaths: 0, finished: false, time: 0, inv: 0 };
  const hzState = new Map();

  if (sim) Object.assign(view, sim.st);
  hud.progress(view.s, 0); hud.pops(0); hud.air(MAX_AIR);
  if (spectator) hud.banner('Vous regardez la partie', { subText: 'Vous rejoindrez la prochaine épreuve', ms: 4000 });

  // ------------------------------------------------------------ events (same effects on every screen)
  function applyEvent(e) {
    const rs = arena.rs;
    // every damage is traceable: trap, cause, raft position on the river, simulation time, event
    if (e.k === 'hit' || e.k === 'pop') logDamage({ event: e.k, cause: e.cause, id: e.id ?? -1, course: course.id, t: e.t ?? null,
      pos: { s: e.s ?? null, d: e.d ?? null, x: Math.round(e.x * 100) / 100, z: Math.round(e.z * 100) / 100 }, air: e.k === 'hit' ? e.air : 0, from: host ? 'simulation (hôte)' : 'reçu de l’hôte' });
    if (e.k === 'hit') {
      sound.hit(); arena.fx.stars(e.x, rs.y + 1, e.z, 10);
      hud.air(e.air, true); hud.toast(['Aïe !', 'Ouille !', 'Ça pique !'][Math.floor(Math.random() * 3)], 1200);
      arena.cam.shake = .8; consoleInput.rumble(.7, .5, 220);
    } else if (e.k === 'pop') {
      sound.pop(); arena.throwCrew();
      arena.fx.splash(e.x, rs.y, e.z, 40, 1.6); arena.fx.stars(e.x, rs.y + 1.2, e.z, 14);
      hud.air(0, true); hud.pops(e.deaths);
      hud.banner(e.cause === 'reset' ? 'PLOUF !' : 'POUF ! La bouée a éclaté', { kind: 'bad', ms: 2200, subText: 'Retour au dernier checkpoint…' });
      arena.cam.shake = 1.4; consoleInput.rumble(1, 1, 420);
    } else if (e.k === 'respawn') {
      arena.boardCrew(); sound.splash(1);
      setTimeout(() => arena.fx.splash(arena.rs.x, arena.rs.y, arena.rs.z, 26, 1.1), 30);
      hud.air(MAX_AIR); hud.banner('C’est reparti !', { ms: 1200 });
      gas = 1;
    } else if (e.k === 'cp') {
      sound.checkpoint();
      const s = course.checkpoints[e.i - 1], o = arena.track.at(s);
      arena.fx.confetti(o.x, o.y + 6, o.z, 90, o.w * 1.6);
      hud.banner('CHECKPOINT !', { kind: 'good', ms: 1600, subText: `${e.i} / ${course.checkpoints.length}` });
      consoleInput.rumble(.4, .3, 140);
    } else if (e.k === 'finish') {
      sound.fanfare(); phase = 'finish';
      const o = arena.track.at(course.finish);
      for (let k = 0; k < 3; k++) setTimeout(() => arena.fx.confetti(o.x, o.y + 6, o.z, 120, o.w * 1.8), k * 450);
      hud.banner('ARRIVÉE !', { kind: 'good', ms: 4200, subText: `Temps ${fmt(e.time)} · ${e.deaths} éclatement${e.deaths > 1 ? 's' : ''}` });
      arena.cam.mode = 'finish';
      for (const id of riders.keys()) setTimeout(() => arena.emote(id, 'cheer'), 300 + Math.random() * 600);
      g.input.setPlaying(false);
    } else if (e.k === 'bump') {
      sound.bump(e.v); if (e.v > 3) arena.cam.shake = Math.max(arena.cam.shake, .35);
    }
  }
  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, '0')}`;
  function hostEvents(evs, at = t) {
    if (!evs.length) return;
    evs.forEach(applyEvent);
    lobby.broadcast({ t: 'ev', at: r3(at), e: evs });
    if (evs.some(e => e.k === 'finish')) finishedAt = at;
  }

  // ------------------------------------------------------------ the local rider
  function steer(dt, inp) {
    const m = arena.crew.get(meId);
    const alive = view.pop < 0 && !view.finished && phase !== 'finish';
    arena.cam.user = wrap(arena.cam.user + inp.look);
    let run = 0;
    const mag = Math.hypot(inp.mx, inp.my);
    if (alive && mag > .3) {
      const yaw = arena.cam.yaw + arena.cam.user;
      const fx = Math.sin(yaw), fz = -Math.cos(yaw), rx = Math.cos(yaw), rz = Math.sin(yaw);
      const ax = rx * inp.mx - fx * inp.my, az = rz * inp.mx - fz * inp.my;
      // default: the stick points where the raft should go, so the rider runs to the opposite side
      const pushMode = g.settings.aim !== 'seat';
      const target = wrap((pushMode ? Math.atan2(-az, -ax) : Math.atan2(az, ax)) - view.yaw);
      const others = [...riders.values()].filter(o => o !== me && arena.crew.has(o.id));
      const TAU = Math.PI * 2;
      const arc = d => { const x = wrap(target - me.a) * d; return x >= 0 ? x : x + TAU; };      // distance to the target going in direction d
      const ahead = (o, d) => ((wrap(o.a - me.a) * d) % TAU + TAU) % TAU;                       // distance to rider o going in direction d
      const blocked = d => others.some(o => { const r = ahead(o, d); return r > .01 && r < arc(d) + MIN_SEP * .5; });
      if (arc(1) > .03 && arc(-1) > .03) {
        let dir = arc(1) <= arc(-1) ? 1 : -1;
        if (blocked(dir) && !blocked(-dir)) dir = -dir;   // go round the other way
        const cand = wrap(me.a + dir * Math.min(arc(dir), RUN * dt * Math.min(1, mag * 1.2)));
        const bump = others.some(o => Math.abs(wrap(cand - o.a)) < MIN_SEP && Math.abs(wrap(cand - o.a)) < Math.abs(wrap(me.a - o.a)));
        if (!bump) { me.a = cand; run = dir; }
      }
      aimShow = 1;
    }
    if (m) { m.run += (run - m.run) * Math.min(1, dt * 10); m.a = me.a; }
    // gas
    superCd = Math.max(0, superCd - dt);
    const wants = inp.puff && alive && phase === 'run';
    if (wants && gas > .02) { me.puff = true; gas = Math.max(0, gas - GAS_USE * dt); gasDelay = .35; empty = false; }
    else {
      if (wants && gas <= .02 && !empty) { empty = true; sound.sputter(); }
      me.puff = false;
      gasDelay -= dt; if (gasDelay <= 0) gas = Math.min(1, gas + GAS_REGEN * dt);
      if (!inp.puff) empty = false;
    }
    if (inp.sup && alive && phase === 'run') {
      if (gas >= SUPER_COST && superCd <= 0) { gas -= SUPER_COST; superCd = 1; me.sp++; gasDelay = .5; if (host) me.supers++; }
      else if (superCd <= 0) sound.sputter();
    }
    if (inp.emote && alive) { me.em = inp.emote; me.es++; if (host) me.emotes++; }
    if (inp.respawn && alive && phase === 'run') {
      holdT += dt;
      if (holdT >= HOLD) { holdT = 0; me.gu++; }
    } else holdT = 0;
    hud.hold(holdT / HOLD);
    if (inp.pause) g.openPause();
    hud.gas(gas, gasOf(m?.look?.gas).c[0], empty);
    if (me.puff) aimShow = 1;
  }

  // visual + audio side of every rider's gas and emotes
  function riderFx(dt) {
    const popped = view.pop >= 0;
    for (const r of riders.values()) {
      const m = arena.crew.get(r.id); if (!m) continue;
      m.puff = r.puff && !popped;
      if (r !== me) m.a = r.a;
      const mine = r === me, pan = 0;
      if (m.puff) {
        r.fxT -= dt; r.sndT -= dt;
        if (r.fxT <= 0) { arena.puffFrom(r.id, 1); r.fxT = .085; }
        if (r.sndT <= 0) { sound.puff(r.sndT < -1 ? 1.2 : .7, { vol: mine ? 1 : .55, pitch: .9 + (r.id.length % 5) * .08, pan }); r.sndT = .2 + Math.random() * .1; }
      } else { r.fxT = 0; r.sndT = Math.min(r.sndT, -1.1); }
      if (r.sp > r.spSeen) {
        if (r.spSeen || r.sp - r.spSeen < 3) { arena.puffFrom(r.id, 2.6); sound.bigPuff(); if (mine) { arena.cam.shake = Math.max(arena.cam.shake, .6); consoleInput.rumble(.9, .6, 260); } }
        r.spSeen = r.sp;
      }
      if (r.es > r.esSeen) { r.esSeen = r.es; if (r.em) { arena.emote(r.id, r.em); sound.emote(r.em); } }
      if (host) { if (r.puff && !popped) r.puffTime += dt; }
    }
  }

  // trap sounds near the raft (slams, swooshes)
  function trapSounds() {
    const rs = arena.rs;
    for (const h of course.hazards) {
      if (h.type !== 'jaws' && h.type !== 'bar') continue;
      const ds = Math.abs(h.s - rs.s); if (ds > 45) continue;
      const v = h.type === 'jaws' ? jawsClosure(h, api.viewT) >= 1 : barHeight(h, api.viewT) < .6;
      if (v && !hzState.get(h)) sound.slam(Math.max(0, 1 - ds / 45));
      hzState.set(h, v);
    }
  }

  // ------------------------------------------------------------ guests: snapshot interpolation
  function sampleSnap(rt) {
    if (!buf.length) return;
    while (buf.length > 2 && buf[1].at <= rt) buf.shift();
    const a = buf[0], b = buf[1] || buf[0];
    const k = b.at > a.at ? Math.max(0, Math.min(1.5, (rt - a.at) / (b.at - a.at))) : 0;
    const A = unpack(a.r, {}), B = unpack(b.r, {});
    view.x = A.x + (B.x - A.x) * k; view.z = A.z + (B.z - A.z) * k; view.y = A.y + (B.y - A.y) * k;
    view.yaw = A.yaw + wrap(B.yaw - A.yaw) * k;
    view.s = A.s + (B.s - A.s) * k;
    Object.assign(view, { air: B.air, pop: B.pop, cp: B.cp, deaths: B.deaths, finished: B.finished, time: A.time + (B.time - A.time) * Math.min(1, k), inv: B.inv });
    // other riders: angle interpolation, flags from the newest snapshot
    const pa = new Map(a.p.map(x => [x[0], x])), pb = b.p;
    for (const x of pb) {
      const r = riders.get(x[0]); if (!r || r === me) continue;
      const y = pa.get(x[0]) || x;
      r.a = y[1] + wrap(x[1] - y[1]) * Math.min(1, k);
      r.puff = !!x[2]; r.sp = x[3]; if (x[5] > r.es) { r.em = x[4]; r.es = x[5]; }
      if (!r.spSeen && r.sp) r.spSeen = r.sp;    // do not replay old big puffs after joining
      if (!r.esSeen && r.es) r.esSeen = r.es;
    }
  }

  const api = {
    kind: 'raft', roster,
    get t() { return t; }, get finished() { return view.finished; }, riders, sim, hud,
    // the moment the raft on screen comes from: the host shows its simulation, guests a snapshot INTERP seconds old.
    // Traps are drawn at this same moment, otherwise a guest saw them up to ~0.2 s ahead of the raft (hits looked
    // like they came from nowhere, near misses looked like hits).
    get viewT() { return host ? Math.max(0, t - acc) : Math.max(0, t - INTERP); },
    debug: () => ({ buf: buf.length, t, clockSet, snapAge: performance.now() - lastSnapAt, phase, view: { ...view } }),
    onMsg(m) {
      if (host) {
        if (m.t === 'inp') {
          const r = riders.get(m.from); if (!r) return;
          if (Number.isFinite(m.a)) r.a = wrap(m.a);
          r.puff = !!m.f;
          if (m.sp > r.sp && m.sp - r.sp < 20) { r.supers += m.sp - r.sp; r.sp = m.sp; }
          if (m.es > r.es) { r.es = m.es; r.em = EMOTES.some(e => e.id === m.em) ? m.em : ''; r.emotes++; }
          if (m.gu > r.gu) { r.gu = m.gu; }
        }
        return;
      }
      if (m.t === 'snap') {
        lastSnapAt = performance.now();
        const lat = Math.min(.25, (lobby.rtt || 80) / 2000);
        if (!Number.isFinite(m.at)) return;
        if (!clockSet || Math.abs(m.at + lat - t) > .5) { t = m.at + lat; clockSet = true; }
        else t += (m.at + lat - t) * .1;
        if (!buf.length || m.at > buf[buf.length - 1].at) buf.push(m);
        if (buf.length > 30) buf.shift();
      } else if (m.t === 'ev') {
        for (const e of m.e) pendingEv.push({ at: m.at, e });
      }
    },
    // a player left during the run: their rider jumps off
    removeRider(id) {
      const m = arena.crew.get(id);
      if (m) {
        m.char.root.updateMatrixWorld(true); const p = m.char.root.getWorldPosition(new THREE.Vector3()); arena.fx.splash(p.x, arena.rs.y, p.z, 16, .8);
        m.char.dispose(); m.tag.remove(); m.bubble.remove(); arena.crew.delete(id);
      }
      riders.delete(id);
    },
    update(dt, paused) {
      if (!paused) t += dt;
      const inp = g.input.poll(dt);
      if (paused) { inp.mx = inp.my = 0; inp.puff = false; inp.sup = 0; inp.respawn = false; }
      // countdown
      if (phase === 'count') {
        arena.cam.intro = Math.max(0, 1 - t / (GO - .4));
        const n = Math.ceil(GO - t);
        if (n !== lastCount && n >= 1 && n <= 3) { lastCount = n; hud.banner(String(n), { kind: 'count', ms: 900 }); sound.beep(); }
        if (t >= GO) { phase = 'run'; arena.cam.intro = 0; hud.banner('POUF !', { kind: 'go', ms: 900 }); sound.beep(true); }
      }
      if (me) steer(dt, inp); else { arena.cam.user = wrap(arena.cam.user + inp.look); if (inp.pause) g.openPause(); }

      if (host) {
        // fixed-step authoritative simulation
        if (phase !== 'count' && !paused) {
          acc = Math.min(acc + dt, .25);
          while (acc >= STEP) {
            acc -= STEP;
            // each sub-step sees the traps where they are at its own time: after a long frame (iOS hiccup) all the
            // sub-steps used to test the raft's past positions against the traps' final pose, hence hits from nothing
            const ts = t - acc;
            const inputs = [], evs = [];
            for (const r of riders.values()) {
              if (!arena.crew.has(r.id)) continue;
              const sp = r.sp - r.spUsed; r.spUsed = r.sp;
              inputs.push({ a: r.a, f: r.puff, sp });
              if (r.gu > r.guSeen) { r.guSeen = r.gu; sim.giveUp(evs); }
            }
            sim.step(STEP, ts, inputs, evs);
            hostEvents(evs, ts);
          }
        }
        Object.assign(view, sim.st);
        snapT -= dt;
        if (snapT <= 0 && lobby.online) {
          snapT = SNAP_EVERY;
          lobby.broadcast({ t: 'snap', at: r3(t), r: sim.pack(), p: [...riders.values()].map(r => [r.id, r3(r.a), r.puff ? 1 : 0, r.sp, r.em, r.es]) });
        }
        if (finishedAt >= 0 && t - finishedAt > 4.5 && !ended) {
          ended = true;
          const summary = g.decorate ? g.decorate(api.summary()) : api.summary();
          lobby.broadcast({ t: 'end', summary });
          g.onEnd(summary);
          return;
        }
      } else {
        sampleSnap(t - INTERP);
        while (pendingEv.length && pendingEv[0].at <= t - INTERP) applyEvent(pendingEv.shift().e);
        inpT -= dt;
        if (inpT <= 0 && me) { inpT = INPUT_EVERY; lobby.toHost({ t: 'inp', a: r3(me.a), f: me.puff ? 1 : 0, sp: me.sp, em: me.em, es: me.es, gu: me.gu }); }
        const lag = performance.now() - lastSnapAt;
        hud.net(clockSet && lag > 1500 && !view.finished ? 'Connexion à l’hôte instable…' : '');
      }
      // feed the arena
      Object.assign(arena.rs, { x: view.x, z: view.z, y: view.y, yaw: view.yaw, air: view.pop >= 0 ? 0 : view.air, pop: view.pop, s: view.s, inv: view.inv });
      riderFx(dt);
      trapSounds();
      // wake rings behind the raft
      wakeT -= dt;
      if (wakeT <= 0 && view.pop < 0) { wakeT = .28; arena.fx.ring(view.x, view.y, view.z, 3.1, 1.8, .6); }
      // aim arrow
      aimShow = Math.max(0, aimShow - dt * 2.5);
      if (me && arena.crew.has(meId)) {
        const th = view.yaw + me.a + Math.PI;
        arrow.position.set(view.x + Math.cos(th) * 2.4, view.y + .08, view.z + Math.sin(th) * 2.4);
        arrow.rotation.y = -th + Math.PI / 2;
        arrow.material.opacity = aimShow * .75 * (view.pop < 0 ? 1 : 0);
        arrow.material.color.set(gasOf(arena.crew.get(meId).look.gas).c[0]);
      }
      hud.progress(view.s, view.cp); hud.time(view.time); hud.pops(view.deaths);
      if (view.pop < 0 && !view.finished) hud.air(view.air);
      hud.update(dt);
    },
    // end of run summary (host)
    summary() {
      return { course: course.id, time: r3(sim.st.time), deaths: sim.st.deaths, finished: sim.st.finished, cps: sim.st.cp,
        riders: [...riders.values()].filter(r => arena.crew.has(r.id)).map(r => ({ id: r.id, name: arena.crew.get(r.id)?.name || 'Joueur', look: arena.crew.get(r.id)?.look, puff: Math.round(r.puffTime * 10) / 10, supers: r.supers, emotes: r.emotes })) };
    },
      dispose() {
      hud.dispose(); arrow.removeFromParent(); arrowGeo.dispose(); arrow.material.dispose();
      g.input.setPlaying(false);
    },
  };
  return api;
}
