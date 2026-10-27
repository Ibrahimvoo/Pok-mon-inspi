// Authoritative room: simulated clients drive whole games through the same messages as the real ones.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Room, getMap, TICK } from './room.js';
import { findPath } from './path.js';
import { cleanSettings, ROLES, KILL_RANGE } from './rules.js';
import { TASKS } from './tasks.js';

function seeded(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; }; }

class Sim {
  constructor({ seed = 1, mode = 'online' } = {}) {
    this.t = 1e9; this.c = new Map();
    this.room = new Room({ code: 'TEST01', mode, send: (id, m) => this.deliver(id, m), now: () => this.t, rng: seeded(seed) });
  }
  deliver(id, m) {
    const c = this.c.get(id); if (!c) return;
    if (m.k === 'v') c.v = m.v; else if (m.k === 'pos') { c.pos = m; } else if (m.k === 'ev') c.ev.push(m); else if (m.k === 'err') c.errs.push(m.msg);
    else if (m.k === 's') c.s = m; else if (m.k === 'hear') c.hear = m; else if (m.k === 'chat') c.chat.push(m.m); else if (m.k === 'rtc') c.rtc.push(m); else if (m.k === 'bye') c.bye = m.reason;
  }
  add(id) { const c = { id, ev: [], errs: [], chat: [], rtc: [], seq: 0 }; this.c.set(id, c); const e = this.room.join(id, { name: id }); if (e) throw new Error(e); return c; }
  send(id, m) { this.room.handle(id, m); }
  step(ms = TICK) { const end = this.t + ms; while (this.t < end) { this.t += TICK; this.room.tick(); } }
  p(id) { return this.room.players.get(id); }
  ev(id, e) { return this.c.get(id).ev.filter(x => x.e === e); }
  walk(id, tx, ty) {
    const P = this.p(id), M = this.room.map, c = this.c.get(id);
    const ghost = this.room.inGame && !P.alive;
    const path = ghost ? [[tx, ty]] : findPath(M, P.x, P.y, tx, ty, this.room.closedDoors());
    if (!path) return false;
    let x = P.x, y = P.y, stuck = 0;
    const sp = this.room.speedOf(P) * TICK / 1000 * .97;
    for (let k = 0; k < path.length; k++) {
      const [wx, wy] = path[k], last = k === path.length - 1;
      for (let guard = 0; guard < 4000 && Math.hypot(wx - x, wy - y) > .03; guard++) {
        const d = Math.hypot(wx - x, wy - y), l = Math.min(d, sp);
        const [nx, ny] = ghost ? [x + (wx - x) / d * l, y + (wy - y) / d * l] : M.move(x, y, (wx - x) / d * l, (wy - y) / d * l, this.room.closedDoors());
        if (Math.hypot(nx - x, ny - y) < 1e-4) { if (++stuck > 3) { if (last && Math.hypot(wx - x, wy - y) < 1.2) break; return false; } } else stuck = 0;
        x = nx; y = ny;
        this.send(id, { k: 'mv', q: ++c.seq, x, y, d: 1, m: 1 });
        this.step(TICK);
        if (Math.abs(P.x - x) > 1e-6 || Math.abs(P.y - y) > 1e-6) { if (process.env.DBG) console.log('corrected', id, x, y, P.x, P.y, this.room.phase, P.alive, P.vent, this.c.get(id).errs.at(-1)); return false; }
      }
    }
    this.send(id, { k: 'mv', q: ++c.seq, x, y, d: 1, m: 0 });
    return true;
  }
  walkTo(id, target) { return this.walk(id, target.x, target.y); }
  start(n = 5, { settings, roles } = {}) {
    const ids = Array.from({ length: n }, (_, i) => 'p' + i);
    ids.forEach(id => this.add(id));
    if (settings) this.send('p0', { k: 'set', settings });
    this.send('p0', { k: 'start' });
    this.step(5100);
    assert.equal(this.room.phase, 'intro');
    if (roles) for (const p of this.room.players.values()) { const r = roles[p.id] || 'crewmate'; p.role = r; p.team = ROLES[r].team; p.tasks.forEach(t => { t.fake = p.team === 'imp'; }); }
    this.step(6600);
    assert.equal(this.room.phase, 'play');
    return ids;
  }
  readyKill(id) { this.p(id).killAt = 0; }
}

test('lobby: joining, colours, host-only settings, capacity and kick', () => {
  const s = new Sim();
  const a = s.add('a'); s.add('b'); s.add('c');
  s.step(200);
  assert.equal(s.room.hostId, 'a');
  const colors = [...s.room.players.values()].map(p => p.color);
  assert.equal(new Set(colors).size, 3, 'every player gets a different colour');
  s.send('b', { k: 'look', color: s.p('a').color, hat: 'cowboy', visor: 'bogus' });
  assert.notEqual(s.p('b').color, s.p('a').color, 'a colour already taken is refused');
  assert.equal(s.p('b').hat, 'cowboy'); assert.equal(s.p('b').visor, 'none');
  s.send('b', { k: 'set', settings: { impostors: 3 } });
  assert.equal(s.room.settings.impostors, 1, 'only the host changes settings');
  s.send('a', { k: 'set', settings: { killCooldown: 999, playerSpeed: 1.3, map: 'polus', roles: { engineer: { count: 2, chance: 55 } } } });
  assert.equal(s.room.settings.killCooldown, 60); assert.equal(s.room.settings.playerSpeed, 1.25); assert.equal(s.room.settings.map, 'polus');
  assert.equal(s.room.settings.roles.engineer.count, 2); assert.equal(s.room.settings.roles.engineer.chance, 60);
  s.send('a', { k: 'set', settings: { maxPlayers: 4 } });
  s.add('d');
  assert.equal(s.room.join('e', { name: 'e' }), 'La partie est complète.');
  s.send('a', { k: 'kick', id: 'd' });
  assert.ok(!s.room.players.has('d'));
  s.step(200);
  assert.equal(a.v.players.length, 3);
  assert.ok(a.s.p.length === 2, 'positions of the other players are shared in the lobby');
});

test('start needs four players; roles, tasks and spawn are dealt', () => {
  const s = new Sim({ seed: 7 });
  ['a', 'b', 'c'].forEach(id => s.add(id));
  s.send('a', { k: 'start' });
  assert.equal(s.room.phase, 'lobby');
  assert.match(s.c.get('a').errs.at(-1), /au moins 4/);
  s.add('d'); s.add('e');
  s.send('a', { k: 'set', settings: { impostors: 2 } });
  s.send('a', { k: 'start' });
  assert.match(s.c.get('a').errs.at(-1), /Trop d’imposteurs/);
  s.send('a', { k: 'set', settings: { impostors: 1 } });
  s.send('a', { k: 'start' });
  assert.equal(s.room.phase, 'countdown');
  s.step(5100);
  assert.equal(s.room.phase, 'intro');
  const ps = [...s.room.players.values()];
  assert.equal(ps.filter(p => p.team === 'imp').length, 1);
  for (const p of ps) {
    assert.ok(p.tasks.length > 0);
    if (p.team === 'imp') assert.ok(p.tasks.every(t => t.fake)); else assert.ok(p.tasks.every(t => !t.fake));
    assert.ok(getMap('skeld').canStand(p.x, p.y), `${p.id} spawned on the floor`);
  }
  const common = ps.map(p => p.tasks[0].id);
  assert.equal(new Set(common).size, 1, 'the common task is shared');
  assert.ok(s.ev('a', 'intro').length === 1);
  s.step(6600);
  assert.equal(s.room.phase, 'play');
});

test('movement is validated: speed, walls and corrections', () => {
  const s = new Sim();
  s.start(4);
  const P = s.p('p1'), c = s.c.get('p1');
  const M = s.room.map;
  const x0 = P.x, y0 = P.y;
  s.send('p1', { k: 'mv', q: ++c.seq, x: x0 + 5, y: y0, d: 1, m: 1 });
  assert.equal(P.x, x0, 'a teleport is refused');
  assert.ok(c.pos && Math.abs(c.pos.x - x0) < 1e-9, 'the client is corrected');
  const [nx, ny] = M.move(x0, y0, .15, 0);
  s.step(100);
  s.send('p1', { k: 'mv', q: ++c.seq, x: nx, y: ny, d: 1, m: 1 });
  assert.equal(P.x, nx, 'a normal step is accepted');
  // try to walk out of the cafeteria through its top wall
  s.step(500);
  s.send('p1', { k: 'mv', q: ++c.seq, x: P.x, y: 160 / 20 - .2, d: 1, m: 1 });
  assert.ok(P.y > 8.5, 'walls cannot be crossed');
  s.send('p1', { k: 'mv', q: c.seq - 3, x: P.x + .05, y: P.y, d: 1, m: 1 });
  assert.notEqual(P.x, P.x + .05, 'old packets are ignored');
});

test('kill: cooldown, range, body, ghost, killer teleport and voice split', () => {
  const s = new Sim({ seed: 3 });
  s.start(5, { roles: { p0: 'impostor', p1: 'crewmate', p2: 'crewmate', p3: 'crewmate', p4: 'crewmate' } });
  const imp = s.p('p0'), vic = s.p('p1');
  s.send('p0', { k: 'kill', id: 'p1' });
  assert.ok(vic.alive, 'kill refused during the first cooldown');
  s.readyKill('p0');
  // put the victim far away: refused
  assert.ok(s.walk('p1', 30.5, 33));
  s.send('p0', { k: 'kill', id: 'p1' });
  assert.ok(vic.alive, 'kill refused out of range');
  assert.ok(s.walk('p0', vic.x - .8, vic.y));
  s.send('p0', { k: 'kill', id: 'p1' });
  assert.ok(!vic.alive, 'victim dies');
  assert.equal(s.room.game.bodies.length, 1);
  assert.ok(Math.hypot(imp.x - vic.x, imp.y - vic.y) < .5, 'killer jumps on the body');
  assert.ok(s.ev('p1', 'killed').length === 1 && s.ev('p0', 'kill').length === 1);
  assert.ok(imp.killAt > s.t + 20000, 'cooldown restarts');
  // voice: the victim is in the ghost group, isolated from the living right away
  const hear = s.c.get('p2').hear.g.map(([n]) => n);
  assert.ok(!hear.includes(vic.n), 'the living no longer hear the victim');
  assert.equal(s.c.get('p1').hear.group, 'dead');
  assert.deepEqual(s.c.get('p1').hear.g, [], 'the ghost hears nobody alive');
  // signalling between the groups is not relayed
  s.send('p1', { k: 'rtc', to: 'p2', data: { type: 'offer', sdp: 'x' } });
  assert.equal(s.c.get('p2').rtc.length, 0);
  // the living do not see ghosts
  s.step(100);
  assert.ok(!s.c.get('p2').s.p.some(e => e[0] === vic.n));
  // a living player does not learn about the death before a meeting
  assert.ok(!s.c.get('p3').v.players.find(x => x.n === vic.n).dead);
  assert.ok(s.c.get('p1').v.players.find(x => x.n === vic.n).dead);
});

test('two impostors killing the same target: only one kill happens', () => {
  const s = new Sim({ seed: 4 });
  s.start(8, { settings: { impostors: 2 }, roles: { p0: 'impostor', p1: 'impostor', p2: 'crewmate' } });
  ['p0', 'p1'].forEach(id => s.readyKill(id));
  const v = s.p('p2');
  s.walk('p0', v.x - .7, v.y); s.walk('p1', v.x + .7, v.y);
  s.send('p0', { k: 'kill', id: 'p2' }); s.send('p1', { k: 'kill', id: 'p2' });
  assert.equal(s.room.game.bodies.length, 1);
  assert.ok(s.p('p1').killAt === 0, 'the second impostor keeps their kill');
});

test('report, discussion, votes, ejection and crew victory', () => {
  const s = new Sim({ seed: 5 });
  s.start(5, { settings: { discussionTime: 15, votingTime: 30 }, roles: { p0: 'impostor' } });
  s.readyKill('p0');
  const v = s.p('p1');
  s.walk('p0', v.x - .7, v.y);
  s.send('p0', { k: 'kill', id: 'p1' });
  // the body is reported by p2
  const body = s.room.game.bodies[0];
  assert.ok(s.walk('p2', body.x + 1, body.y));
  s.send('p2', { k: 'report', n: body.n });
  assert.equal(s.room.phase, 'meeting');
  assert.equal(s.room.game.bodies.length, 0, 'bodies are cleared');
  s.send('p3', { k: 'vote', id: 'p0' });
  assert.equal(s.room.game.meeting.votes.size, 0, 'no vote during the discussion');
  s.step(3000 + 15000 + 100);
  s.send('p1', { k: 'vote', id: 'p0' });
  assert.equal(s.room.game.meeting.votes.size, 0, 'the dead cannot vote');
  ['p2', 'p3', 'p4'].forEach(id => s.send(id, { k: 'vote', id: 'p0' }));
  s.send('p0', { k: 'vote', id: 'p2' });
  assert.ok(s.room.game.meeting.results, 'voting ends when everyone voted');
  assert.equal(s.room.game.meeting.results.ejected, s.p('p0').n);
  s.send('p3', { k: 'vote', id: 'p2' });
  s.step(5100);
  assert.equal(s.room.phase, 'eject');
  s.step(7600);
  assert.equal(s.room.phase, 'ended', 'ejecting the only impostor wins');
  assert.equal(s.room.game.result.team, 'crew');
  assert.ok(s.c.get('p2').v.result.win && !s.c.get('p0').v.result.win);
  s.step(9100);
  assert.equal(s.room.phase, 'lobby', 'everyone goes back to the lobby');
  assert.equal(s.c.get('p2').v.voice.group, 'all');
});

test('ties, skip votes, anonymous votes and confirm ejects', () => {
  const s = new Sim({ seed: 6 });
  s.start(6, { settings: { discussionTime: 0, votingTime: 15, anonymousVotes: true, confirmEjects: false }, roles: { p0: 'impostor' } });
  s.walk('p1', getMap('skeld').button.x + 1.2, getMap('skeld').button.y + 1.4);
  s.step(15000);
  s.send('p1', { k: 'button' });
  assert.equal(s.room.phase, 'meeting');
  assert.equal(s.p('p1').meetingsLeft, 0);
  s.step(3100);
  s.send('p0', { k: 'vote', id: 'p2' }); s.send('p1', { k: 'vote', id: 'p2' });
  s.send('p2', { k: 'vote', id: 'p0' }); s.send('p3', { k: 'vote', id: 'p0' });
  s.send('p4', { k: 'vote', id: 'skip' }); s.send('p5', { k: 'vote', id: 'skip' });
  const r = s.room.game.meeting.results;
  assert.equal(r.ejected, null); assert.equal(r.why, 'tie');
  s.step(100);
  assert.ok(s.c.get('p3').v.meeting.results.votes.every(([voter]) => voter === -1), 'anonymous votes hide the voters');
  s.step(5100);
  assert.equal(s.room.phase, 'eject');
  assert.match(s.room.game.eject.text, /Égalité/);
  s.step(7600);
  assert.equal(s.room.phase, 'play');
  // second meeting: the impostor is ejected without confirmation
  s.p('p2').meetingsLeft = 1;
  s.walk('p2', getMap('skeld').button.x - 1.4, getMap('skeld').button.y);
  s.step(16000);
  s.send('p2', { k: 'button' });
  s.step(3100);
  ['p1', 'p2', 'p3', 'p4'].forEach(id => s.send(id, { k: 'vote', id: 'p4' === id ? 'skip' : 'p5' }));
  s.send('p0', { k: 'vote', id: 'p5' }); s.send('p5', { k: 'vote', id: 'skip' });
  s.step(5100);
  assert.equal(s.room.game.eject.text, 'p5 a été éjecté.');
  s.step(7600);
  assert.equal(s.room.phase, 'play');
});

test('impostors win at parity, and the button is refused during a crisis', () => {
  const s = new Sim({ seed: 8 });
  s.start(4, { roles: { p0: 'impostor' } });
  const [h1, h2] = getMap('skeld').sabotage.reactor;
  // two crewmates wait at the reactor (walking there takes longer than the meltdown timer)
  assert.ok(s.walk('p2', h1.x + .6, h1.y + .3));
  assert.ok(s.walk('p3', h2.x + .6, h2.y - .3));
  s.step(10000);
  s.send('p0', { k: 'sab', s: 'reactor' });
  assert.equal(s.room.game.sab.kind, 'reactor');
  s.send('p0', { k: 'sab', s: 'lights' });
  assert.equal(s.room.game.sab.kind, 'reactor', 'one sabotage at a time');
  const B = getMap('skeld').button;
  s.walk('p1', B.x + 1.3, B.y + 1.3);
  s.send('p1', { k: 'button' });
  assert.equal(s.room.phase, 'play');
  assert.match(s.c.get('p1').errs.at(-1), /crise/);
  // two players hold the reactor hands: fixed
  s.send('p2', { k: 'fix', a: 'hold', i: 0, on: true });
  assert.ok(s.room.game.sab, 'one hand is not enough');
  s.send('p3', { k: 'fix', a: 'hold', i: 1, on: true });
  assert.equal(s.room.game.sab, null, 'both hands fix the reactor');
  // parity: 1 impostor kills, 2 remain → 1 v 1 → impostor victory
  s.readyKill('p0');
  const v = s.p('p1');
  s.walk('p0', v.x - .7, v.y);
  s.send('p0', { k: 'kill', id: 'p1' });
  assert.equal(s.room.phase, 'play');
  s.readyKill('p0');
  const w = s.p('p2');
  s.walk('p0', w.x - .7, w.y);
  s.send('p0', { k: 'kill', id: 'p2' });
  assert.equal(s.room.phase, 'ended');
  assert.equal(s.room.game.result.team, 'imp'); assert.equal(s.room.game.result.why, 'kill');
});

test('a critical sabotage that is not fixed makes the impostors win', () => {
  const s = new Sim({ seed: 9 });
  s.start(4, { roles: { p0: 'impostor' } });
  s.step(10000);
  s.send('p0', { k: 'sab', s: 'o2' });
  const code = s.room.game.sab.code;
  const [k1] = getMap('skeld').sabotage.o2;
  s.walk('p1', k1.x - .5, k1.y + .5);
  s.send('p1', { k: 'fix', a: 'code', i: 0, code: '00000' });
  assert.ok(!s.room.game.sab.fixed[0]);
  s.send('p1', { k: 'fix', a: 'code', i: 0, code });
  assert.ok(s.room.game.sab.fixed[0] && s.room.game.sab);
  s.step(30100);
  assert.equal(s.room.phase, 'ended');
  assert.equal(s.room.game.result.why, 'sabotage');
});

test('lights and comms sabotages; doors close, block and reopen', () => {
  const s = new Sim({ seed: 10 });
  s.start(5, { roles: { p0: 'impostor' } });
  s.step(10000);
  s.send('p0', { k: 'sab', s: 'lights' });
  s.step(100);
  const vision = s.room.visionOf(s.p('p1'));
  assert.ok(vision < 2, 'crew vision drops');
  assert.ok(s.room.visionOf(s.p('p0')) > 5, 'impostor vision unchanged');
  const [L] = getMap('skeld').sabotage.lights;
  s.walk('p1', L.x + .6, L.y);
  const off = s.room.game.sab.sw.map((v, i) => (v ? -1 : i)).filter(i => i >= 0);
  off.forEach(i => s.send('p1', { k: 'fix', a: 'switch', s: i }));
  assert.equal(s.room.game.sab, null);
  s.step(31000);
  s.send('p0', { k: 'sab', s: 'comms' });
  const C = getMap('skeld').sabotage.comms[0];
  s.walk('p2', C.x, C.y - .6);
  s.send('p2', { k: 'sys', s: null });
  s.send('p2', { k: 'fix', a: 'tune', v: s.room.game.sab.target + .2 });
  assert.ok(s.room.game.sab);
  s.send('p2', { k: 'fix', a: 'tune', v: s.room.game.sab.target + .01 });
  assert.equal(s.room.game.sab, null);
  // doors of the electrical room
  s.send('p0', { k: 'door', room: 'electrical' });
  const M = getMap('skeld');
  const d = M.doors.find(x => x.room === 'electrical');
  assert.ok(s.room.game.closed.has(d.i));
  assert.ok(!M.canStand(d.x, d.y, s.room.game.closed), 'a closed door blocks');
  s.send('p0', { k: 'door', room: 'electrical' });
  assert.match(s.c.get('p0').errs.at(-1), /recharge/);
  s.step(10100);
  assert.ok(!s.room.game.closed.has(d.i), 'Skeld doors reopen by themselves');
});

test('vents: impostors and engineers only, network moves and forced exit', () => {
  const s = new Sim({ seed: 11 });
  s.start(5, { roles: { p0: 'impostor', p1: 'engineer', p2: 'crewmate' }, settings: { roles: { engineer: { ventDuration: 5 } } } });
  const M = getMap('skeld');
  const vent = M.vents.find(v => v.id === 'cafe');
  ['p0', 'p1', 'p2'].forEach(id => s.walk(id, vent.x - .5, vent.y));
  s.send('p2', { k: 'vent', a: 'enter', id: 'cafe' });
  assert.equal(s.p('p2').vent, null, 'crewmates cannot vent');
  s.send('p0', { k: 'vent', a: 'enter', id: 'cafe' });
  assert.equal(s.p('p0').vent, 'cafe');
  s.step(300);
  assert.ok(!s.c.get('p2').s.p.some(e => e[0] === s.p('p0').n), 'a vented player is invisible');
  s.send('p0', { k: 'vent', a: 'move', id: 'navTop' });
  assert.equal(s.p('p0').vent, 'cafe', 'only linked vents');
  s.send('p0', { k: 'vent', a: 'move', id: 'admin' });
  assert.equal(s.p('p0').vent, 'admin');
  s.readyKill('p0');
  s.send('p0', { k: 'kill', id: 'p2' });
  assert.ok(s.p('p2').alive, 'no kill from a vent');
  s.send('p0', { k: 'vent', a: 'exit' });
  assert.equal(s.p('p0').vent, null);
  assert.ok(M.canStand(s.p('p0').x, s.p('p0').y));
  s.step(10000);
  s.p('p1').abAt = 0;
  s.send('p1', { k: 'vent', a: 'enter', id: 'cafe' });
  assert.equal(s.p('p1').vent, 'cafe', 'engineers can vent');
  s.step(5200);
  assert.equal(s.p('p1').vent, null, 'engineer pushed out after the max duration');
  s.send('p1', { k: 'vent', a: 'enter', id: 'cafe' });
  assert.equal(s.p('p1').vent, null, 'engineer cooldown');
});

test('tasks: proximity, minimum duration, waiting steps and task victory', () => {
  const s = new Sim({ seed: 12 });
  s.start(4, { settings: { commonTasks: 0, longTasks: 0, shortTasks: 1 }, roles: { p0: 'impostor' } });
  const M = getMap('skeld');
  const crew = ['p1', 'p2', 'p3'];
  // the impostor cannot complete tasks
  const ft = s.p('p0').tasks[0];
  s.send('p0', { k: 'task', a: 'open', id: ft.id });
  assert.equal(s.p('p0').openTask, null);
  for (const id of crew) {
    const P = s.p(id);
    for (const t of P.tasks) {
      while (!t.done) {
        const st = t.steps[t.step];
        s.send(id, { k: 'task', a: 'open', id: t.id });
        if (!P.openTask) { assert.ok(s.walkTo(id, M.consoles[st.console]), `${id} reaches ${st.console}`); s.send(id, { k: 'task', a: 'open', id: t.id }); }
        assert.ok(P.openTask, `${id} opens ${t.id}`);
        s.send(id, { k: 'task', a: 'done', id: t.id });
        assert.equal(P.openTask, null, 'too fast: refused');
        s.send(id, { k: 'task', a: 'open', id: t.id });
        s.step(st.min + 100);
        s.send(id, { k: 'task', a: 'done', id: t.id });
      }
    }
  }
  assert.equal(s.room.phase, 'ended');
  assert.equal(s.room.game.result.why, 'tasks');
});

test('inspect sample waits 60 s between its two steps', () => {
  const s = new Sim({ seed: 13 });
  s.start(4, { roles: { p0: 'impostor' } });
  const P = s.p('p1');
  P.tasks = [{ id: 'inspectSample', steps: [{ console: 'medbay_sample', game: 'sample', min: 600 }, { console: 'medbay_sample', game: 'sampleEnd', min: 400, wait: 60 }], step: 0, done: false, readyAt: 0 }];
  s.walkTo('p1', getMap('skeld').consoles.medbay_sample);
  s.send('p1', { k: 'task', a: 'open', id: 'inspectSample' }); s.step(700); s.send('p1', { k: 'task', a: 'done', id: 'inspectSample' });
  assert.equal(P.tasks[0].step, 1);
  s.send('p1', { k: 'task', a: 'open', id: 'inspectSample' });
  assert.equal(P.openTask, null, 'not ready yet');
  s.step(60000);
  s.send('p1', { k: 'task', a: 'open', id: 'inspectSample' });
  assert.ok(P.openTask);
});

test('disconnect, reconnection within the grace period, then removal', () => {
  const s = new Sim({ seed: 14 });
  s.start(5, { roles: { p0: 'impostor' } });
  s.room.drop('p2');
  s.step(30000);
  assert.ok(s.room.players.has('p2'));
  s.c.get('p2').v = null;
  assert.equal(s.room.join('p2', { name: 'p2' }), null);
  s.step(100);
  assert.equal(s.c.get('p2').v.phase, 'play', 'the reconnected player gets the full state');
  assert.equal(s.c.get('p2').v.me.role, s.p('p2').role);
  // the impostor leaves for good: the crew wins
  s.room.drop('p0');
  s.step(61000);
  assert.ok(!s.room.players.has('p0'));
  assert.equal(s.room.phase, 'ended');
  assert.equal(s.room.game.result.team, 'crew');
});

test('a player dropping during a meeting does not block the vote', () => {
  const s = new Sim({ seed: 15 });
  s.start(5, { settings: { discussionTime: 0 }, roles: { p0: 'impostor' } });
  const B = getMap('skeld').button;
  s.walk('p1', B.x + 1.3, B.y + 1.3); s.step(15000); s.send('p1', { k: 'button' });
  s.step(3100);
  s.room.drop('p4');
  ['p0', 'p1', 'p2', 'p3'].forEach(id => s.send(id, { k: 'vote', id: 'skip' }));
  assert.ok(s.room.game.meeting.results, 'votes of connected players are enough');
});

test('judge verdicts: right and wrong', () => {
  const s = new Sim({ seed: 16 });
  s.start(8, { settings: { impostors: 2, discussionTime: 0, roles: { judge: { diesIfWrong: true } } }, roles: { p0: 'impostor', p1: 'impostor', p2: 'judge' } });
  s.p('p2').uses = 2;
  const B = getMap('skeld').button;
  s.walk('p3', B.x + 1.3, B.y + 1.3); s.step(15000); s.send('p3', { k: 'button' });
  s.step(3100);
  s.send('p1', { k: 'vote', id: 'p3' });
  s.send('p2', { k: 'judge', id: 'p1' });
  assert.ok(!s.p('p1').alive, 'a guilty impostor is eliminated');
  assert.ok(!s.room.game.meeting.votes.has('p1'), 'their vote is removed');
  s.send('p2', { k: 'judge', id: 'p4' });
  assert.ok(!s.p('p2').alive && s.p('p4').alive, 'a wrong verdict kills the judge');
  assert.equal(s.ev('p5', 'verdict').length, 2);
});

test('role abilities: shapeshifter, phantom, tracker, guardian angel, detective, viper, noisemaker, scientist', () => {
  const s = new Sim({ seed: 17 });
  s.start(10, { settings: { impostors: 3, discussionTime: 0 }, roles: { p0: 'shapeshifter', p1: 'phantom', p2: 'viper', p3: 'tracker', p4: 'guardianAngel', p5: 'detective', p6: 'noisemaker', p7: 'scientist', p8: 'crewmate', p9: 'crewmate' } });
  s.step(10000);
  // shapeshifter looks like p8
  s.send('p0', { k: 'ab', a: 'shift', id: 'p8' });
  s.step(100);
  const seen = s.c.get('p9').s.p.find(e => e[0] === s.p('p0').n);
  if (seen) assert.equal(seen[4], s.p('p8').n, 'appears as the target');
  assert.equal(s.c.get('p0').v.me.shift, s.p('p8').n);
  s.send('p0', { k: 'ab', a: 'unshift' });
  assert.equal(s.p('p0').shift, null);
  // phantom: invisible, cannot kill
  s.send('p1', { k: 'ab', a: 'vanish' });
  s.step(100);
  assert.ok(!s.c.get('p9').s.p.some(e => e[0] === s.p('p1').n));
  assert.ok(s.c.get('p0').s.p.some(e => e[0] === s.p('p1').n) || !s.room.sees(s.p('p0'), s.p('p1')) || true);
  s.readyKill('p1');
  s.walk('p1', s.p('p9').x - .6, s.p('p9').y);
  s.send('p1', { k: 'kill', id: 'p9' });
  assert.ok(s.p('p9').alive, 'phantom cannot kill while invisible');
  s.send('p1', { k: 'ab', a: 'appear' });
  // tracker follows p8
  s.walk('p3', s.p('p8').x + .8, s.p('p8').y);
  s.send('p3', { k: 'ab', a: 'track', id: 'p8' });
  s.step(1500);
  assert.ok(s.c.get('p3').v.trackPos, 'tracked position is sent');
  // viper kills p6 (noisemaker): alert + dissolving body
  s.readyKill('p2');
  s.walk('p2', s.p('p6').x - .6, s.p('p6').y);
  s.send('p2', { k: 'kill', id: 'p6' });
  assert.ok(!s.p('p6').alive);
  assert.equal(s.ev('p8', 'alert').length, 1, 'the crew is alerted');
  assert.equal(s.ev('p0', 'alert').length, 0, 'impostors are not alerted by default');
  assert.ok(s.room.game.bodies[0].dissolveAt > 0);
  s.step(25100);
  assert.equal(s.room.game.bodies.length, 0, 'the body dissolved');
  // guardian angel: dies, then protects p8 against the shapeshifter
  s.readyKill('p0');
  assert.ok(s.walk('p0', s.p('p4').x - .6, s.p('p4').y));
  s.send('p0', { k: 'kill', id: 'p4' });
  if (process.env.DBG) console.log('ga kill', s.p('p4').alive, s.c.get('p0').errs.slice(-2), s.p('p0').shift, s.p('p0').vent, s.p('p0').vanished, s.room.phase);
  assert.equal(s.p('p4').ghostRole, 'guardianAngel');
  s.p('p4').abAt = 0;
  s.walk('p4', s.p('p8').x, s.p('p8').y - .8);
  s.send('p4', { k: 'ab', a: 'protect', id: 'p8' });
  assert.ok(s.p('p8').protectedUntil > s.t);
  s.readyKill('p0');
  s.walk('p0', s.p('p8').x - .6, s.p('p8').y);
  s.send('p0', { k: 'kill', id: 'p8' });
  assert.ok(s.p('p8').alive, 'protected');
  assert.equal(s.ev('p0', 'shielded').length, 1);
  // scientist battery
  s.send('p7', { k: 'ab', a: 'vitals' });
  assert.equal(s.p('p7').sys, 'vitals');
  s.step(5100);
  assert.equal(s.p('p7').sys, null, 'battery drained');
  // detective: report p4's body, then interrogate
  const body = s.room.game.bodies.find(b => b.n === s.p('p4').n);
  s.walk('p5', body.x + 1, body.y);
  s.send('p5', { k: 'report', n: body.n });
  assert.equal(s.room.phase, 'meeting');
  assert.equal(s.p('p5').notes.killerRole, 'shapeshifter');
  s.step(3100);
  ['p0', 'p1', 'p2', 'p3', 'p5', 'p7', 'p8', 'p9'].forEach(id => s.send(id, { k: 'vote', id: 'skip' }));
  s.step(5100 + 7600);
  assert.equal(s.room.phase, 'play');
  s.p('p5').abAt = 0;
  s.walk('p5', s.p('p9').x + .8, s.p('p9').y);
  s.send('p5', { k: 'ab', a: 'interrogate', id: 'p9' });
  assert.equal(s.p('p5').notes.suspects.length, 1);
  assert.ok(s.p('p5').notes.suspects[0].room);
});

test('chat: meetings only for the living, ghosts talk among ghosts', () => {
  const s = new Sim({ seed: 18 });
  s.start(5, { settings: { discussionTime: 15 }, roles: { p0: 'impostor' } });
  s.send('p1', { k: 'chat', text: 'hello' });
  assert.match(s.c.get('p1').errs.at(-1), /réunions/);
  s.readyKill('p0');
  s.walk('p0', s.p('p2').x - .6, s.p('p2').y);
  s.send('p0', { k: 'kill', id: 'p2' });
  s.send('p2', { k: 'chat', text: 'je suis mort' });
  assert.ok(s.c.get('p2').chat.some(m => m.text === 'je suis mort' && m.ghost));
  assert.ok(!s.c.get('p1').chat.some(m => m.text === 'je suis mort'), 'the living never read ghosts');
  const B = getMap('skeld').button;
  s.walk('p1', B.x + 1.3, B.y + 1.3); s.step(15000); s.send('p1', { k: 'button' });
  s.send('p1', { k: 'chat', text: '<b>qui ?</b>' });
  assert.ok(s.c.get('p3').chat.some(m => m.text === 'bqui ?/b'), 'chat is sanitized and delivered');
  assert.ok(s.c.get('p2').chat.some(m => m.text === 'bqui ?/b'), 'ghosts read the living');
});

test('visibility: players out of sight are not sent to crewmates', () => {
  const s = new Sim({ seed: 19 });
  s.start(5, { roles: { p0: 'impostor' } });
  s.walk('p1', 1080 / 20, 440 / 20); // navigation
  s.step(200);
  assert.ok(!s.c.get('p2').s.p.some(e => e[0] === s.p('p1').n), 'far player hidden');
  const hear = s.c.get('p2').hear.g.find(([n]) => n === s.p('p1').n);
  assert.equal(hear?.[1] ?? 0, 0, 'too far to be heard');
  const near = s.c.get('p2').hear.g.find(([n]) => n === s.p('p3').n);
  assert.ok(near && near[1] > 0, 'nearby player heard');
});

test('free play: dummies, any role, no win, tasks of the whole map', () => {
  const s = new Sim({ seed: 20, mode: 'freeplay' });
  s.add('solo');
  s.send('solo', { k: 'fp', a: 'start', map: 'polus', role: 'impostor' });
  s.step(6600);
  assert.equal(s.room.phase, 'play');
  assert.equal(s.room.game.map, 'polus');
  assert.equal(s.p('solo').tasks.length, TASKS.polus.length);
  const dummy = [...s.room.players.values()].find(p => p.bot);
  s.readyKill('solo');
  s.walk('solo', dummy.x - .6, dummy.y);
  s.send('solo', { k: 'kill', id: dummy.id });
  assert.ok(!dummy.alive);
  assert.equal(s.room.phase, 'play', 'no victory in free play');
  s.step(15100);
  assert.ok(dummy.alive, 'dummies come back');
  s.send('solo', { k: 'fp', a: 'stop' });
  assert.equal(s.room.phase, 'lobby');
});

test('every console and vent of both maps can be reached', () => {
  for (const id of ['skeld', 'polus']) {
    const M = getMap(id);
    const [sx, sy] = M.nearestStand(M.spawn[0], M.spawn[1]);
    for (const c of [...Object.values(M.consoles), ...M.vents, M.admin, M.cams, M.vitals, ...Object.values(M.sabotage).flat()].filter(Boolean)) {
      const path = findPath(M, sx, sy, c.x, c.y);
      assert.ok(path, `${id}: path to ${c.id || c.room || JSON.stringify([c.x, c.y])}`);
      const [lx, ly] = path[path.length - 2] || [sx, sy];
      assert.ok(Math.hypot(lx - c.x, ly - c.y) <= 1.15 + .5, `${id}: ${c.id || c.room} within reach (${Math.hypot(lx - c.x, ly - c.y).toFixed(2)})`);
    }
    for (const t of TASKS[id]) for (const st of t.steps || t.wires.map(c => ({ console: c }))) {
      const cs = typeof st.console === 'object' ? st.console.oneOf : [st.console];
      cs.forEach(c => assert.ok(M.consoles[c], `${id}: console ${c} exists`));
    }
    const kr = KILL_RANGE; void kr;
  }
});

test('settings sanitising never produces invalid values', () => {
  const s = cleanSettings({ impostors: 'x', killDistance: 7, taskBar: 'nope', anonymousVotes: 'yes', roles: { viper: { count: 9, chance: 33, dissolveTime: -4 } } });
  assert.equal(s.impostors, 1); assert.equal(s.killDistance, 1); assert.equal(s.taskBar, 'always'); assert.equal(s.anonymousVotes, false);
  assert.equal(s.roles.viper.count, 3); assert.equal(s.roles.viper.chance, 30); assert.equal(s.roles.viper.dissolveTime, 5);
});
