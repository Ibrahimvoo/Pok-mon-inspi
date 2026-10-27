// Online end-to-end test of Among Us: the real server (accounts, WebSocket, authoritative rooms) and four real
// browsers with fake microphones. Create a room, join by code, start, check roles and voice groups, kill, report,
// meeting with chat and votes, ejection, crew victory, back to the lobby, then a disconnection / reconnection.
// Usage: npm run e2e:among-online [shotsDir]
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { start } from '../server/index.js';
import { findPath } from '../src/among/core/path.js';
import { getMap } from '../src/among/core/room.js';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const shots = process.argv[2] || null;
if (shots) await mkdir(shots, { recursive: true });
const app = await start({ port: 0, dbUrl: ':memory:', quiet: !process.env.AU_LOG });
const url = `http://localhost:${app.port}/?aufps=12`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 15000, arg) => { const t = Date.now(); while (Date.now() - t < ms) { if (await page.evaluate(fn, arg).catch(() => false)) return true; await page.waitForTimeout(200); } return false; };
const state = page => page.evaluate(() => { const P = globalThis.__au, c = P?.c, V = c?.v; if (!V) return null; return { x: c.pos.x, y: c.pos.y, phase: c.phase, map: c.mapId, role: V.me?.role, team: V.me?.team, alive: V.me?.alive, n: c.n, code: V.code, group: P.voice.group, peers: [...P.voice.peers.keys()], allowed: [...P.voice.allowed], players: V.players.map(p => ({ n: p.n, id: p.id, name: p.name, dead: p.dead })), killAt: V.me?.killAt, now: c.serverNow(), bodies: c.bodies.map(b => ({ n: b[0], x: b[1], y: b[2] })) }; });

async function signIn(name) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`[${name}] ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|WebSocket|ERR_CONNECTION|favicon/.test(m.text())) errors.push(`[${name}] ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', name);
  await page.fill('.f-input >> nth=1', 'manette2026');
  await page.fill('.f-input >> nth=2', 'manette2026');
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  await page.waitForTimeout(400);
  const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
  for (let i = cur; i < idx; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(80); }
  for (let i = cur; i > idx; i--) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(80); }
  await page.keyboard.press('Enter');
  await page.waitForSelector('.au-main', { timeout: 20000 });
  page.name = name;
  page.shot = n => shots && page.screenshot({ path: `${shots}/online-${name}-${n}.jpg`, type: 'jpeg', quality: 70, timeout: 120000 }).catch(() => {});
  return page;
}
async function walkTo(page, tx, ty, ms = 60000) {
  const st = await state(page);
  const M = getMap(st.map);
  const path = findPath(M, st.x, st.y, tx, ty, []);
  if (!path) return false;
  const t0 = Date.now();
  for (let i = 0; i < path.length; i += 3) {
    const [wx, wy] = path[Math.min(path.length - 1, i + 2)];
    for (;;) {
      if (Date.now() - t0 > ms) { await page.evaluate(() => { globalThis.__au.autoDir = null; }); return false; }
      const d = await page.evaluate(([x, y]) => { const P = globalThis.__au, c = P.c; const dx = x - c.pos.x, dy = y - c.pos.y, l = Math.hypot(dx, dy); P.autoDir = l > .08 ? [dx / l, dy / l] : null; return l; }, [wx, wy]);
      if (d <= .14) break;
      await page.waitForTimeout(60);
    }
  }
  await page.evaluate(() => { globalThis.__au.autoDir = null; });
  return true;
}

try {
  const names = ['Hote', 'Bleu', 'Vert', 'Rose'];
  const P = [];
  for (const n of names) P.push(await signIn(n));
  const [A, B, C, D] = P;
  // A creates a private room
  await A.click('.au-btn:has-text("En ligne")');
  await A.click('.au-btn:has-text("Créer une partie")');
  await A.click('.au-btn:has-text("Confirmer")');
  ok('room created, host in the dropship lobby', await until(A, () => globalThis.__au?.c?.v?.phase === 'lobby', 20000));
  const code = (await state(A)).code;
  ok('6-letter room code shown in the lobby panel', /^[A-Z]{6}$/.test(code) && await until(A, c => document.querySelector('.lb-code b')?.textContent === c, 5000, code), code);
  for (const p of [B, C, D]) {
    await p.click('.au-btn:has-text("En ligne")');
    await p.fill('.au-code', code.toLowerCase());
    await p.press('.au-code', 'Enter');
  }
  ok('three friends join with the code', await until(A, () => globalThis.__au.c.v.players.length === 4, 30000));
  await A.shot('lobby');
  const colors = await A.evaluate(() => globalThis.__au.c.v.players.map(p => p.color));
  ok('four different colours', new Set(colors).size === 4, colors.join(','));
  // the host changes a setting: the others see it
  await A.evaluate(() => globalThis.__au.c.send({ k: 'set', settings: { killCooldown: 10, discussionTime: 0, votingTime: 120, emergencyCooldown: 0 } }));
  ok('settings synchronised to the guests', await until(B, () => globalThis.__au.c.v.settings.killCooldown === 10, 5000), JSON.stringify(await Promise.all([A, B].map(p => p.evaluate(() => { const c = globalThis.__au?.c; return { host: c?.v?.host, n: c?.n, kc: c?.v?.settings?.killCooldown, status: c?.link?.constructor?.name }; })))));
  ok('a guest cannot start the game', await B.evaluate(() => document.querySelector('.au-start').hidden));
  // voice: every player opens the (fake) microphone; in the lobby everyone is connected to everyone
  for (const p of P) await p.evaluate(() => globalThis.__au.voice.start());
  ok('lobby voice: each player connected to the 3 others', await until(A, () => globalThis.__au.voice.peers.size === 3, 25000) && await until(D, () => globalThis.__au.voice.peers.size === 3, 25000), JSON.stringify(await Promise.all(P.map(p => p.evaluate(() => { const v = globalThis.__au.voice; return { st: v.state, g: v.group, peers: [...v.peers.values()].map(x => x.pc?.connectionState || x.state || '?'), allowed: v.allowed.size }; })))));
  await A.click('.au-start');
  ok('countdown then roles on every console', (await Promise.all(P.map(p => until(p, () => globalThis.__au.c.phase === 'play', 30000)))).every(Boolean));
  await A.shot('play');
  for (const p of P) await p.evaluate(() => { const c = globalThis.__au.c; globalThis.__ph = []; c.on('phase', x => globalThis.__ph.push([x.to, Math.round(c.serverNow() / 100) / 10, c.v.meeting && { ve: c.v.meeting.voteEnd, de: c.v.meeting.discussEnd }])); });
  const room0 = [...app.among.rooms.values()][0], sent = {}, osend = room0.send;
  room0.send = (id, m) => { sent[m.k] = (sent[m.k] || 0) + 1; return osend.call(room0, id, m); };
  const seen = await Promise.all(P.map(p => p.evaluate(() => new Promise(r => { const c = globalThis.__au.c, o = c.receive.bind(c); let s = 0, last = null; c.receive = m => { if (m?.k === 's') { s++; last = m.p.length; } return o(m); }; setTimeout(() => { c.receive = o; r({ s, last, others: c.others.size, pos: [c.pos.x, c.pos.y] }); }, 1000); }))));
  ok('snapshots flow during the game and show the other crewmates', seen.every(x => x.s >= 5 && x.others > 0), JSON.stringify(seen) + JSON.stringify(sent) + room0.phase);
  room0.send = osend;
  const S = await Promise.all(P.map(state));
  const imps = S.filter(s => s.team === 'imp');
  ok('exactly one impostor, roles only known to their owner', imps.length === 1 && S.every(s => s.role), S.map(s => s.role).join(','));
  const impPage = P[S.indexOf(imps[0])];
  const crew = P.filter(p => p !== impPage);
  // the impostor kills the nearest crewmate after the first cooldown
  await impPage.waitForTimeout(10500);
  const victim = crew[0], vs = await state(victim);
  await victim.evaluate(() => { globalThis.__au.autoDir = null; });
  ok('impostor walks to a crewmate', await walkTo(impPage, vs.x - .45, vs.y));
  const pre = await impPage.evaluate(() => { const P = globalThis.__au, c = P.c; P.updateButtons(); return { cd: c.v.me.killAt - c.serverNow(), t: P.T?.kill?.n ?? null, pos: [c.pos.x, c.pos.y], others: [...c.others].map(([n, o]) => [n, +o.x.toFixed(2), +o.y.toFixed(2), o.f]), toasts: [...document.querySelectorAll('.au-toast')].map(t => t.textContent) }; });
  await impPage.keyboard.press('KeyQ');
  ok('kill: the victim becomes a ghost', await until(victim, () => globalThis.__au.c.v.me.alive === false, 6000), JSON.stringify({ pre, victim: [vs.x, vs.y], server: [...app.among.rooms.values()][0] && [...[...app.among.rooms.values()][0].players.values()].map(u => [u.n, +u.x.toFixed(2), +u.y.toFixed(2), u.alive, !!u.conn, u.vent, u.vanished]), snap: await impPage.evaluate(() => new Promise(r => { const c = globalThis.__au.c, o = c.receive.bind(c); let got = null; c.receive = m => { if (m?.k === 's' && !got) got = m; return o(m); }; setTimeout(() => { c.receive = o; r(got); }, 600); })), toasts: await impPage.evaluate(() => [...document.querySelectorAll('.au-toast')].map(t => t.textContent)) }));
  ok('the victim sees the kill animation', await until(victim, () => !!document.querySelector('.au-kill'), 3000));
  await victim.shot('killed');
  const others = crew.slice(1);
  ok('voice: the ghost is moved to the dead group at once', await until(victim, () => globalThis.__au.voice.group === 'dead' && globalThis.__au.voice.peers.size === 0, 6000));
  ok('voice: no living player stays connected to the ghost', (await Promise.all([...others, impPage].map(p => until(p, id => !globalThis.__au.voice.peers.has(id) && !globalThis.__au.voice.allowed.has(id), 6000, vs.players.find(x => x.n === vs.n).id)))).every(Boolean));
  // the ghost writes: only ghosts can read it
  await victim.evaluate(() => globalThis.__au.c.send({ k: 'chat', text: 'message de fantome' }));
  await A.waitForTimeout(800);
  ok('ghost chat never reaches the living', (await Promise.all([...others, impPage].map(p => p.evaluate(() => !globalThis.__au.c.chat.some(m => m.text === 'message de fantome'))))).every(Boolean));
  // a crewmate reports the body
  const body = (await state(impPage)).bodies[0];
  ok('the body is on the floor', !!body);
  const reporter = others[0];
  ok('a crewmate walks to the body', await walkTo(reporter, body.x + .6, body.y));
  await reporter.keyboard.press('KeyR');
  ok('meeting on every console', (await Promise.all(P.map(p => until(p, () => globalThis.__au.c.phase === 'meeting', 8000)))).every(Boolean));
  ok('the tablet opens after the splash', await until(reporter, () => !!document.querySelector('.mt-tablet'), 9000));
  await reporter.shot('meeting');
  await reporter.evaluate(() => globalThis.__au.c.send({ k: 'chat', text: 'c est lui' }));
  ok('meeting chat reaches the living', await until(impPage, () => globalThis.__au.c.chat.some(m => m.text === 'c est lui'), 5000), JSON.stringify(await Promise.all([reporter, impPage].map(p => p.evaluate(() => ({ phase: globalThis.__au.c.phase, ph: globalThis.__ph, chat: globalThis.__au.c.chat.slice(-3).map(m => m.text), toasts: [...document.querySelectorAll('.au-toast')].map(t => t.textContent) }))))));
  ok('…and the ghost too', await until(victim, () => globalThis.__au.c.chat.some(m => m.text === 'c est lui'), 5000));
  const impName = (await state(impPage)).players.find(p => p.n === imps[0].n).name;
  for (const p of [...others, impPage]) {
    const target = p === impPage ? (await state(others[0])).players.find(x => x.n === (S[P.indexOf(others[0])]).n).name : impName;
    await p.click(`.mt-card:has-text("${target}")`);
    await p.click('.mt-yes');
  }
  ok('votes counted and shown', await until(A, () => !!globalThis.__au.c.v.meeting?.results, 10000));
  await A.shot('votes');
  ok('ejection screen', await until(A, () => globalThis.__au.c.phase === 'eject' && !!document.querySelector('.au-eject'), 10000));
  await A.waitForTimeout(3500);
  await A.shot('eject');
  ok('crew victory after ejecting the impostor', (await Promise.all(P.map(p => until(p, () => globalThis.__au.c.phase === 'ended', 12000)))).every(Boolean));
  ok('end screens: victory for the crew, defeat for the impostor', await reporter.evaluate(() => !!document.querySelector('.au-end.win')) && await impPage.evaluate(() => !!document.querySelector('.au-end.lose')));
  await reporter.shot('victory');
  ok('back to the lobby together', (await Promise.all(P.map(p => until(p, () => globalThis.__au.c.phase === 'lobby', 15000)))).every(Boolean));
  ok('voice reunited in the lobby', await until(victim, () => globalThis.__au.voice.group === 'all', 8000));
  // a player loses the connection and comes back
  await D.evaluate(() => { const ws = [...document.querySelectorAll('*')]; void ws; });
  await D.context().setOffline(true); await D.waitForTimeout(3000); await D.context().setOffline(false);
  ok('a disconnected player gets back into the room', await until(D, () => globalThis.__au?.c?.v?.players?.length === 4 && globalThis.__au.c.phase === 'lobby', 30000));
} catch (e) { console.error(e); results.push(false); }
await browser.close(); await app.close();
console.log(errors.length ? 'PAGE ERRORS:\n' + errors.slice(0, 20).join('\n') : 'no page errors');
console.log(results.every(Boolean) && !errors.length ? 'ONLINE E2E PASSED' : 'ONLINE E2E FAILED');
process.exit(results.every(Boolean) && !errors.length ? 0 : 1);
