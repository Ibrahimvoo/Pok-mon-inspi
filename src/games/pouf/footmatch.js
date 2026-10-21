// On-foot épreuves (obstacle race, survival arena). Each player runs the physics of their own critter;
// the host collects every state, relays them as snapshots, ranks finishes and eliminations, and ends the round.
import * as THREE from 'three';
import { stepPlayer, newPlayer, inZone } from './sim/foot.js';
import { buildLevel } from './view/level.js';
import { createCharacter, gasOf, EMOTES } from './view/characters.js';
import { createHud } from './ui/hud.js';
import { sound } from './audio.js';
import { input as consoleInput } from '../../input.js';
import { h } from '../../ui.js';
import { state } from '../../state.js';

export const GO = 3;
const STEP = 1 / 60, SEND = 1 / 20, INTERP = .12, KILL_Y = -1.2;
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
const r3 = v => Math.round(v * 1000) / 1000;
const ord = n => (n === 1 ? '1er' : `${n}e`);
const FLAG = { ground: 1, stun: 2, puff: 4, swim: 8, done: 16 };

export function createFootMatch(g, { course, roster, host, meId, spectator = false }) {
  const { arena, lobby, stage } = g;
  const race = course.kind === 'race';
  arena.setVisible(false);
  stage.setTheme(course.theme);
  const level = buildLevel(course);
  stage.scene.add(level.root);
  const fx = arena.fx;
  const hud = createHud(g.overlay, course, { mode: course.kind });
  hud.show(true);
  g.input.setPlaying(true);
  const tags = h('div.pf-tags'); g.overlay.append(tags);

  // every critter in the round
  const players = new Map();
  roster.forEach(p => {
    const char = createCharacter(p.look);
    stage.scene.add(char.root);
    const tag = h(`div.pf-tag${p.id === meId ? '.me' : ''}`, p.name), bubble = h('div.pf-bubble');
    tags.append(tag, bubble);
    const sp = course.spawn[p.seat % course.spawn.length];
    players.set(p.id, { id: p.id, name: p.name, look: p.look, seat: p.seat, char, tag, bubble, buf: [], x: sp[0], y: sp[1], z: sp[2], yaw: sp[3] || 0, flags: FLAG.ground, cp: 0,
      fin: null, out: null, rank: 0, puffs: 0, emotes: 0, last: 0, run: 0, big: 0, es: 0 });
  });
  const me = spectator ? null : players.get(meId);
  let pl = me ? newPlayer(course.spawn[me.seat % course.spawn.length]) : null;
  let cp = 0, deadT = 0, holdT = 0, acc = 0, sendT = 0, snapT = 0, t = 0, phase = 'count', lastCount = 4;
  let finCount = 0, outCount = 0, endAt = -1, ended = false, firstFin = -1, clockSet = false, emSeq = 0;
  const cam = { yaw: course.camYaw || 0, user: 0, pos: new THREE.Vector3(), look: new THREE.Vector3(), shake: 0 };
  const sp0 = course.spawn[0];
  cam.pos.set(sp0[0], sp0[1] + 14, sp0[2] - 16); cam.look.set(sp0[0], sp0[1], sp0[2] + 6);
  const v3 = new THREE.Vector3(), v4 = new THREE.Vector3();
  sound.music(true, { fast: true });
  if (spectator) hud.banner('Vous regardez la partie', { subText: 'Vous rejoindrez la prochaine épreuve', ms: 4000 });

  const respawnPoint = () => {
    if (cp > 0) { const z = course.checkpoints[cp - 1]; const k = me.seat % 4; return [z.p[0] + (k - 1.5) * 1.2, z.p[1], z.p[2], 0]; }
    return course.spawn[me.seat % course.spawn.length];
  };
  function respawn() {
    const p = respawnPoint(); pl = newPlayer(p); pl.gas = 1;
    fx.splash(p[0], p[1], p[2], 12, .7); sound.splash(.6);
  }

  // ------------------------------------------------------------ events shared by everybody
  function announce(e) {
    const p = players.get(e.id); if (!p) return;
    if (e.k === 'fin') {
      p.fin = e.time; p.rank = e.rank;
      if (p === me) { sound.fanfare(); hud.banner(`${ord(e.rank)} !`, { kind: 'good', ms: 3500, subText: `Temps ${fmt(e.time)}` }); fx.confetti(p.x, p.y + 4, p.z, 90, 6); }
      else { sound.checkpoint(); hud.toast(`${p.name} arrive ${ord(e.rank)}`, 2200); }
    } else if (e.k === 'out') {
      p.out = e.at; p.rank = e.rank;
      if (p === me) hud.banner('TOMBÉ !', { kind: 'bad', ms: 2600, subText: `Vous avez tenu ${fmt(e.at)}` });
      else hud.toast(`${p.name} est tombé !`, 2000);
    } else if (e.k === 'em') {
      p.char.emote(e.em); sound.emote(e.em);
      const em = EMOTES.find(x => x.id === e.em); p.bubble.textContent = em?.icon || '';
      p.bubble.classList.remove('show'); void p.bubble.offsetWidth; p.bubble.classList.add('show');
    }
  }
  const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, '0')}`;
  function hostEvent(e) { announce(e); lobby.broadcast({ t: 'fev', e }); }
  // the host ranks finishes and falls in the order they are reported
  function hostFinish(id, time) {
    const p = players.get(id); if (!p || p.fin != null || p.out != null) return;
    finCount++; if (firstFin < 0) firstFin = t;
    hostEvent({ k: 'fin', id, rank: finCount, time: r3(time) });
  }
  function hostOut(id) {
    const p = players.get(id); if (!p || p.out != null || p.fin != null) return;
    const alive = [...players.values()].filter(x => x.out == null).length;
    outCount++;
    hostEvent({ k: 'out', id, rank: alive, at: r3(Math.max(0, t - GO)) });
  }

  // ------------------------------------------------------------ local critter
  function physics(dt, inp) {
    const evs = [];
    if (deadT > 0) { deadT -= dt; if (deadT <= 0 && race) respawn(); return evs; }
    const others = [...players.values()].filter(p => p !== me && p.out == null).map(p => ({ x: p.x, y: p.y, z: p.z }));
    const fwx = Math.sin(cam.yaw + cam.user), fwz = Math.cos(cam.yaw + cam.user);
    const rx = -fwz, rz = fwx;   // screen right when looking along (fwx, fwz)
    let mx = rx * inp.mx - fwx * inp.my, mz = rz * inp.mx - fwz * inp.my;
    const l = Math.hypot(mx, mz); if (l > 1) { mx /= l; mz /= l; }
    const frozen = phase === 'count' || me.fin != null || me.out != null;
    const jump = !frozen && inp.jump > 0;
    acc = Math.min(acc + dt, .25);
    let first = true;
    while (acc >= STEP) {
      acc -= STEP;
      stepPlayer(course, pl, frozen ? { mx: 0, mz: 0, jump: false, puff: false } : { mx, mz, jump: jump && first, puff: inp.sup > 0 && first }, Math.max(0, t - GO), STEP, others, evs);
      first = false;
    }
    if (inp.sup > 0 && !evs.some(e => e.k === 'puff') && !frozen) sound.sputter();
    // fell in the water
    if (pl.y < KILL_Y && deadT <= 0 && me.out == null) {
      fx.splash(pl.x, 0, pl.z, 26, 1.2); sound.splash(1); consoleInput.rumble(.6, .5, 200);
      if (race) { deadT = 1.1; hud.toast('Plouf !', 1000); }
      else { deadT = 1e9; if (host) hostOut(meId); else lobby.toHost({ t: 'fout' }); }
    }
    // checkpoints and the finish line
    if (race && me.fin == null) {
      course.checkpoints.forEach((z, i) => { if (i >= cp && inZone(z, pl)) { cp = i + 1; sound.checkpoint(); hud.banner('CHECKPOINT !', { kind: 'good', ms: 1200 }); fx.confetti(z.p[0], z.p[1] + 5, z.p[2], 60, z.s[0]); } });
      if (inZone(course.finish, pl)) {
        const time = t - GO;
        if (host) hostFinish(meId, time);            // ranks and announces (sets fin)
        else { me.fin = time; lobby.toHost({ t: 'ffin', time: r3(time) }); }
      }
    }
    // hold R: back to the last checkpoint
    if (race && inp.respawn && me.fin == null && deadT <= 0 && phase === 'run') { holdT += dt; if (holdT > .9) { holdT = 0; respawn(); } } else holdT = 0;
    hud.hold(holdT / .9);
    if (inp.emote && me.out == null) { emSeq++; if (host) { me.emotes++; hostEvent({ k: 'em', id: meId, em: inp.emote }); } else lobby.toHost({ t: 'fem', em: inp.emote }); }
    return evs;
  }
  function localFx(evs) {
    for (const e of evs) {
      if (e.k === 'jump') sound.ui();
      else if (e.k === 'land') fx.ring(pl.x, pl.y + .05, pl.z, 1.2, .5, .5);
      else if (e.k === 'boing') { sound.emote('cheer'); fx.stars(pl.x, pl.y + .3, pl.z, 6); }
      else if (e.k === 'puff') { me.big = 1; me.puffs++; puffCloud(me, 1.6); sound.bigPuff(); consoleInput.rumble(.6, .4, 160); }
      else if (e.k === 'knock') { sound.hit(); fx.stars(pl.x, pl.y + 1.6, pl.z, 8); cam.shake = .6; consoleInput.rumble(.8, .6, 220); }
    }
  }
  function puffCloud(p, power) {
    const back = v3.set(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    p.char.root.updateMatrixWorld(true);
    fx.puff(p.char.butt(v4), back, gasOf(p.look.gas).c, power);
  }

  // ------------------------------------------------------------ others: interpolation from snapshots
  function interpolate(p, rt) {
    const b = p.buf;
    if (!b.length) return;
    while (b.length > 2 && b[1].at <= rt) b.shift();
    const A = b[0], B = b[1] || b[0], k = B.at > A.at ? Math.max(0, Math.min(1.3, (rt - A.at) / (B.at - A.at))) : 0;
    p.x = A.x + (B.x - A.x) * k; p.y = A.y + (B.y - A.y) * k; p.z = A.z + (B.z - A.z) * k;
    p.yaw = A.yaw + wrap(B.yaw - A.yaw) * Math.min(1, k); p.flags = B.flags;
    const prevPuffs = p.puffs; p.puffs = B.puffs;
    if (p.puffs > prevPuffs && prevPuffs >= 0) { p.big = 1; puffCloud(p, 1.6); sound.puff(1.4, { vol: .6 }); }
  }

  const api = {
    kind: 'foot', riders: players, roster,
    get t() { return t; }, get finished() { return ended; },
    onMsg(m) {
      if (host) {
        const p = players.get(m.from); if (!p) return;
        if (m.t === 'fs' && Array.isArray(m.s)) {
          const [x, y, z, yaw, flags, cpi, puffs] = m.s;
          if (![x, y, z, yaw].every(Number.isFinite)) return;
          p.buf.push({ at: t, x, y, z, yaw, flags, puffs }); if (p.buf.length > 30) p.buf.shift();
          p.cp = cpi | 0; p.puffsHost = puffs;
        } else if (m.t === 'ffin') hostFinish(m.from, +m.time || Math.max(0, t - GO));
        else if (m.t === 'fout') hostOut(m.from);
        else if (m.t === 'fem' && EMOTES.some(e => e.id === m.em)) { p.emotes++; hostEvent({ k: 'em', id: m.from, em: m.em }); }
        return;
      }
      if (m.t === 'fsnap') {
        if (!Number.isFinite(m.at)) return;
        const lat = Math.min(.25, (lobby.rtt || 80) / 2000);
        if (!clockSet || Math.abs(m.at + lat - t) > .5) { t = m.at + lat; clockSet = true; } else t += (m.at + lat - t) * .1;
        for (const [id, x, y, z, yaw, flags, cpi, puffs] of m.pl) {
          const p = players.get(id); if (!p || p === me) continue;
          if (!p.buf.length || m.at > p.buf[p.buf.length - 1].at) p.buf.push({ at: m.at, x, y, z, yaw, flags, puffs });
          if (p.buf.length > 30) p.buf.shift();
          p.cp = cpi;
        }
      } else if (m.t === 'fev') announce(m.e);
    },
    removeRider(id) {
      const p = players.get(id); if (!p || p === me) return;
      fx.splash(p.x, Math.max(0, p.y), p.z, 14, .8);
      p.char.dispose(); p.tag.remove(); p.bubble.remove();
      players.delete(id);
    },
    update(dt, paused) {
      if (!paused) t += dt;
      const inp = g.input.poll(dt);
      if (paused) { inp.mx = inp.my = 0; inp.puff = false; inp.jump = 0; inp.sup = 0; inp.respawn = false; inp.emote = null; }
      if (phase === 'count') {
        const n = Math.ceil(GO - t);
        if (n !== lastCount && n >= 1 && n <= 3) { lastCount = n; hud.banner(String(n), { kind: 'count', ms: 900 }); sound.beep(); }
        if (t >= GO) { phase = 'run'; hud.banner(race ? 'PARTEZ !' : 'TENEZ BON !', { kind: 'go', ms: 900 }); sound.beep(true); }
      }
      cam.user = wrap(cam.user + inp.look * (g.settings.camSpeed || 1));
      if (inp.pause) g.openPause();
      if (me && me.out == null) {
        localFx(physics(dt, inp));
        me.x = pl.x; me.y = pl.y; me.z = pl.z; me.yaw = pl.yaw;
        me.flags = (pl.ground >= 0 ? FLAG.ground : 0) | (pl.stun > 0 ? FLAG.stun : 0) | (deadT > 0 ? FLAG.swim : 0) | (me.fin != null ? FLAG.done : 0);
        hud.gas(pl.gas, gasOf(me.look.gas).c[0], pl.gas < .5);
      } else if (me) { me.flags = FLAG.swim; }
      // network
      sendT -= dt;
      if (sendT <= 0) {
        sendT = SEND;
        if (me && !host) lobby.toHost({ t: 'fs', s: [r3(me.x), r3(me.y), r3(me.z), r3(me.yaw), me.flags, cp, pl?.puffs || 0] });
      }
      if (host) {
        for (const p of players.values()) if (p !== me) interpolate(p, t - INTERP);
        snapT -= dt;
        if (snapT <= 0 && lobby.online) {
          snapT = SEND;
          lobby.broadcast({ t: 'fsnap', at: r3(t), pl: [...players.values()].map(p => [p.id, r3(p.x), r3(p.y), r3(p.z), r3(p.yaw), p.flags, p === me ? cp : p.cp, p === me ? (pl?.puffs || 0) : (p.puffsHost || 0)]) });
        }
        // end of the round
        const list = [...players.values()], alive = list.filter(p => p.out == null && p.fin == null);
        const over = race ? (alive.length === 0 || (firstFin >= 0 && t - firstFin > 40) || t - GO > (course.maxTime || 300))
          : (alive.length <= (list.length > 1 ? 1 : 0) || t - GO > (course.maxTime || 150));
        if (over && endAt < 0 && phase === 'run') {
          endAt = t;
          if (!race) for (const p of alive) hostEvent({ k: 'fin', id: p.id, rank: 1, time: r3(t - GO) });
        }
        if (endAt >= 0 && t - endAt > 2.5 && !ended) {
          ended = true;
          const summary = g.decorate ? g.decorate(api.summary()) : api.summary();
          lobby.broadcast({ t: 'end', summary });
          g.onEnd(summary);
          return;
        }
      } else for (const p of players.values()) if (p !== me) interpolate(p, t - INTERP);
      // characters
      for (const p of players.values()) {
        const c = p.char;
        const moving = p === me && pl ? Math.min(1, Math.hypot(pl.vx, pl.vz) / 7) : Math.min(1, Math.hypot(p.x - (p.px ?? p.x), p.z - (p.pz ?? p.z)) / Math.max(1e-3, dt) / 7);
        p.px = p.x; p.pz = p.z;
        p.run += (moving - p.run) * Math.min(1, dt * 10);
        p.big = Math.max(0, p.big - dt * 3);
        const f = p.flags;
        const mode = f & FLAG.swim ? 'swim' : f & FLAG.stun ? 'stun' : f & FLAG.ground ? 'stand' : 'air';
        c.root.position.set(p.x, mode === 'swim' ? -.55 : p.y, p.z);
        c.root.rotation.set(0, p.yaw, 0);
        c.root.visible = !(p.out != null && mode === 'swim' && t - GO - p.out > 2);
        c.update(dt, { mode, run: mode === 'stand' ? p.run : 0, big: p.big });
      }
      // camera: behind the critter we follow, turning slowly with its running direction
      const tgt = me && me.out == null ? me : [...players.values()].find(p => p.out == null && p.fin == null) || me || [...players.values()][0];
      if (tgt) {
        // the camera looks down the course (or across the arena); the player turns it with the mouse / right stick
        const yaw = cam.yaw + cam.user, fx_ = Math.sin(yaw), fz = Math.cos(yaw);
        const intro = phase === 'count' ? Math.max(0, 1 - t / (GO - .3)) : 0;
        const dist = (race ? 10 : 11) + intro * 10, hgt = (race ? 6 : 7.5) + intro * 8;
        cam.pos.lerp(v3.set(tgt.x - fx_ * dist, Math.max(tgt.y, 0) + hgt, tgt.z - fz * dist), Math.min(1, dt * 5));
        cam.look.lerp(v4.set(tgt.x + fx_ * 5, Math.max(tgt.y, 0) + 1, tgt.z + fz * 5), Math.min(1, dt * 7));
      }
      const C = stage.camera;
      C.position.copy(cam.pos);
      if (state.settings.reduceMotion) cam.shake = 0;   // console accessibility setting
      if (cam.shake > 0) { cam.shake = Math.max(0, cam.shake - dt * 2.5); C.position.x += (Math.random() - .5) * cam.shake * .4; C.position.y += (Math.random() - .5) * cam.shake * .4; }
      C.lookAt(cam.look);
      if (tgt) stage.focus(tgt.x, Math.max(0, tgt.y), tgt.z);
      level.update(Math.max(0, t - GO));   // obstacles start moving with the race
      fx.update(dt);
      // HUD
      const runT = Math.max(0, t - GO);
      if (race) {
        hud.time(me?.fin ?? runT);
        hud.progress(me ? Math.max(0, me.z) : 0, cp);
        // position: finished first, then by progress along the course
        const order = [...players.values()].sort((a, b) => (a.fin != null) !== (b.fin != null) ? (a.fin != null ? -1 : 1) : a.fin != null ? a.rank - b.rank : b.z - a.z);
        if (me) hud.rank(`${ord(order.indexOf(me) + 1)} / ${order.length}`);
      } else {
        hud.time(me?.out ?? runT);
        const alive = [...players.values()].filter(p => p.out == null).length;
        hud.rank(`${alive} en vie`);
      }
      hud.update(dt);
    },
    updateTags(w, hgt) {
      for (const p of players.values()) {
        p.char.head.getWorldPosition(v3); v3.y += .95;
        v4.copy(v3).project(stage.camera);
        const vis = v4.z < 1 && Math.abs(v4.x) < 1.1 && Math.abs(v4.y) < 1.1 && p.char.root.visible;
        const tr = `translate(${((v4.x * .5 + .5) * w).toFixed(1)}px, ${((-v4.y * .5 + .5) * hgt).toFixed(1)}px)`;
        p.tag.style.transform = tr + ' translate(-50%, -100%)'; p.tag.style.opacity = vis ? 1 : 0;
        p.bubble.style.transform = tr + ' translate(-50%, -190%)';
      }
    },
    // automated tests only (window.__pouf with ?pfdebug): put the local critter somewhere
    debugTeleport(x, y, z) { if (pl) Object.assign(pl, { x, y, z, vx: 0, vy: 0, vz: 0, ground: -1, stun: 0 }); deadT = 0; cam.user = 0; },
    summary() {
      const list = [...players.values()];
      // race: finishers by rank, then the others by progress; survival: by rank (last standing = 1)
      list.sort((a, b) => (a.rank || 99) - (b.rank || 99) || b.z - a.z);
      return { course: course.id, kind: course.kind, time: r3(Math.max(0, t - GO)), finished: true,
        riders: list.map((p, i) => ({ id: p.id, name: p.name, look: p.look, rank: i + 1, time: p.fin, out: p.out, puffs: p === me ? (pl?.puffs || 0) : (p.puffsHost || 0), emotes: p.emotes, puff: 0, supers: 0 })) };
    },
    dispose() {
      hud.dispose(); tags.remove();
      for (const p of players.values()) p.char.dispose();
      level.root.removeFromParent();
      level.root.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      arena.setVisible(true);
      stage.setTheme(arena.course.theme);
      g.input.setPlaying(false);
      sound.music(true);
    },
  };
  return api;
}
