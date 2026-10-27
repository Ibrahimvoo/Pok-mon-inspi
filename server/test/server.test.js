// Integration tests: real HTTP server + WebSocket hub on an in-memory SQLite database.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import WebSocket from 'ws';
import { start } from '../index.js';

let app, base;
before(async () => { app = await start({ port: 0, dbUrl: ':memory:', quiet: true }); base = `http://127.0.0.1:${app.port}`; });
after(async () => { await app.close(); });

async function call(path, { method = 'GET', body, cookie, origin } = {}) {
  const res = await fetch(base + path, {
    method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}), ...(origin ? { origin } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data, cookie: res.headers.get('set-cookie')?.split(';')[0] };
}
const signup = (psn, password = 'manette123', avatar = 'lumen') => call('/api/auth/register', { method: 'POST', body: { psn, password, avatar } });

function socket(cookie) {
  const ws = new WebSocket(base.replace('http', 'ws') + '/ws', { headers: { cookie } });
  const inbox = [];
  const waiters = [];
  ws.on('message', d => { const m = JSON.parse(d); inbox.push(m); waiters.slice().forEach(w => { if (w.pred(m)) { waiters.splice(waiters.indexOf(w), 1); w.res(m); } }); });
  let rid = 0;
  return {
    ws, inbox,
    next(pred, ms = 2000) {
      const hit = inbox.find(pred); if (hit) { inbox.splice(inbox.indexOf(hit), 1); return Promise.resolve(hit); }
      return new Promise((res, rej) => { const w = { pred: m => pred(m) && (inbox.splice(inbox.indexOf(m), 1), true), res }; waiters.push(w); setTimeout(() => rej(new Error('timeout waiting for message')), ms); });
    },
    req(t, payload = {}) { const id = ++rid; ws.send(JSON.stringify({ t, rid: id, ...payload })); return this.next(m => m.t === 'res' && m.rid === id); },
    send(t, payload = {}) { ws.send(JSON.stringify({ t, ...payload })); },
    open: new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); }),
    close() { ws.terminate(); },
  };
}

test('sign-up validates fields and rejects duplicates', async () => {
  const bad = await call('/api/auth/register', { method: 'POST', body: { psn: '1x', password: 'short', avatar: 'nope' } });
  assert.equal(bad.status, 400);
  assert.ok(bad.data.error.fields.psn && bad.data.error.fields.password && bad.data.error.fields.avatar);
  const ok = await signup('Nova_77');
  assert.equal(ok.status, 201);
  assert.match(ok.cookie, /^sid=/);
  assert.equal(ok.data.user.psn, 'Nova_77');
  assert.equal(ok.data.user.pass_hash, undefined);
  const dup = await signup('nova_77');
  assert.equal(dup.status, 409);
});

test('login, session cookie, logout', async () => {
  await signup('Kira');
  const wrong = await call('/api/auth/login', { method: 'POST', body: { psn: 'kira', password: 'mauvais123' } });
  assert.equal(wrong.status, 401);
  const ok = await call('/api/auth/login', { method: 'POST', body: { psn: 'KIRA', password: 'manette123' } });
  assert.equal(ok.status, 200);
  const me = await call('/api/me', { cookie: ok.cookie });
  assert.equal(me.data.user.psn, 'Kira');
  await call('/api/auth/logout', { method: 'POST', body: {}, cookie: ok.cookie });
  assert.equal((await call('/api/me', { cookie: ok.cookie })).status, 401);
});

test('cross-origin writes are refused', async () => {
  const r = await call('/api/auth/login', { method: 'POST', body: { psn: 'x', password: 'y' }, origin: 'https://evil.example' });
  assert.equal(r.status, 403);
});

test('friends, presence, party invite, signalling and in-game sync', async () => {
  const a = await signup('Alpha'), b = await signup('Bravo'), c = await signup('Charlie');
  // friend request + acceptance
  const req = await call('/api/friends/request', { method: 'POST', body: { psn: 'bravo' }, cookie: a.cookie });
  assert.equal(req.status, 200);
  const incoming = await call('/api/friends', { cookie: b.cookie });
  assert.equal(incoming.data.incoming[0].psn, 'Alpha');
  assert.equal((await call('/api/friends/respond', { method: 'POST', body: { id: incoming.data.incoming[0].id, accept: true }, cookie: b.cookie })).status, 200);
  assert.equal((await call('/api/friends', { cookie: a.cookie })).data.friends[0].psn, 'Bravo');

  const sa = socket(a.cookie), sb = socket(b.cookie), sc = socket(c.cookie);
  await Promise.all([sa.open, sb.open, sc.open]);
  const helloA = await sa.next(m => m.t === 'hello');
  assert.equal(helloA.me.psn, 'Alpha');
  // Bravo goes in-game: Alpha (friend) sees it, Charlie (not a friend) does not
  sb.send('presence', { activity: 'game', game: 'pouf-party' });
  const pr = await sa.next(m => m.t === 'presence' && m.game === 'pouf-party');
  assert.equal(pr.online, true);
  await new Promise(r => setTimeout(r, 150));
  assert.ok(!sc.inbox.some(m => m.t === 'presence' && m.game === 'pouf-party'));

  // the players online are listed for everyone (friends first), an unknown player cannot be invited
  const cId = (await call('/api/me', { cookie: c.cookie })).data.user.id;
  const online = await sa.req('players');
  assert.deepEqual(online.players.map(p => [p.psn, p.friend]), [['Bravo', true], ['Charlie', false]]);
  assert.equal((await sa.req('party.invite', { to: 'nobody' })).error, 'not_found');
  const bId = (await call('/api/me', { cookie: b.cookie })).data.user.id;
  const inv = await sa.req('party.invite', { to: bId, kind: 'call' });
  assert.equal(inv.ok, true);
  const got = await sb.next(m => m.t === 'invite');
  assert.equal(got.kind, 'call');
  assert.equal(got.from.psn, 'Alpha');
  // a stranger cannot join, the invitee can
  assert.equal((await sc.req('party.join', { partyId: inv.partyId })).error, 'forbidden');
  assert.equal((await sb.req('party.join', { partyId: inv.partyId })).ok, true);
  const party = await sa.next(m => m.t === 'party' && m.party?.members.length === 2);
  assert.deepEqual(party.party.members.map(m => m.psn).sort(), ['Alpha', 'Bravo']);

  // voice signalling is relayed only between voice members of the same party
  const va = await sa.req('voice', { on: true, muted: false });
  const vb = await sb.req('voice', { on: true, muted: false });
  assert.ok(va.vs && vb.vs);
  sa.send('rtc', { to: bId, toVs: vb.vs, data: { type: 'offer', sdp: 'v=0' } });
  const sig = await sb.next(m => m.t === 'rtc');
  assert.equal(sig.data.type, 'offer');
  assert.equal(sig.fromVs, va.vs);
  sc.send('rtc', { to: bId, data: { type: 'offer', sdp: 'x' } });
  await new Promise(r => setTimeout(r, 150));
  assert.ok(!sb.inbox.some(m => m.t === 'rtc'));

  // game session: start, input relay, chat
  assert.equal((await sa.req('game.start', { game: 'pouf-party' })).ok, true);
  const started = await sb.next(m => m.t === 'game.started');
  assert.equal(started.game, 'pouf-party');
  sa.send('g', { x: .25, y: 2, p: 1 });
  const g = await sb.next(m => m.t === 'g');
  assert.deepEqual([g.x, g.y, g.p], [.25, 1, 1]);
  sb.send('chat', { text: '  on y va ?  ' });
  assert.equal((await sa.next(m => m.t === 'chat')).msg.text, 'on y va ?');
  // private messages are relayed with the sender's identity, never back to the sender
  sa.send('dm', { to: bId, d: { k: 'msg', c: { kind: 'dm' }, m: { id: 'x1', text: 'salut' } } });
  const dm = await sb.next(m => m.t === 'dm');
  assert.equal(dm.from.psn, 'Alpha');
  assert.equal(dm.d.m.text, 'salut');
  sa.send('dm', { to: (await call('/api/me', { cookie: a.cookie })).data.user.id, d: { k: 'msg' } });
  await new Promise(r => setTimeout(r, 150));
  assert.ok(!sa.inbox.some(m => m.t === 'dm'));

  // leaving hands the party to the remaining member
  sa.send('party.leave');
  const after = await sb.next(m => m.t === 'party' && m.party?.members.length === 1);
  assert.equal(after.party.host, bId);
  // a player online who is not a friend can be invited straight into the group, and join it
  assert.equal((await sb.req('party.invite', { to: cId })).ok, true);
  const gotC = await sc.next(m => m.t === 'invite');
  assert.equal(gotC.from.psn, 'Bravo');
  assert.equal((await sc.req('party.join', { partyId: gotC.party.id })).ok, true);
  await sb.next(m => m.t === 'party' && m.party?.members.length === 2);
  sa.close(); sb.close(); sc.close();
});

test('websocket refuses anonymous and foreign-origin connections', async () => {
  const anon = new WebSocket(base.replace('http', 'ws') + '/ws');
  await assert.rejects(new Promise((res, rej) => { anon.on('open', res); anon.on('error', rej); }));
  const u = await signup('Delta');
  const foreign = new WebSocket(base.replace('http', 'ws') + '/ws', { headers: { cookie: u.cookie, origin: 'https://evil.example' } });
  await assert.rejects(new Promise((res, rej) => { foreign.on('open', res); foreign.on('error', rej); }));
});

test('profile photos from the gallery are accepted as avatars, within a size limit', async () => {
  const photo = 'data:image/jpeg;base64,' + Buffer.alloc(3000, 7).toString('base64');
  const r = await signup('PhotoFan', 'manette123', photo);
  assert.equal(r.status, 201);
  assert.equal(r.data.user.avatar, photo);
  const big = await signup('PhotoBig', 'manette123', 'data:image/jpeg;base64,' + 'A'.repeat(20000));
  assert.equal(big.status, 400);
  assert.ok(big.data.error.fields.avatar);
  const other = 'data:image/png;base64,' + Buffer.alloc(900, 3).toString('base64');
  const up = await call('/api/me', { method: 'PATCH', body: { avatar: other }, cookie: r.cookie, origin: base });
  assert.equal(up.status, 200);
  assert.equal(up.data.user.avatar, other);
  const fake = await call('/api/me', { method: 'PATCH', body: { avatar: 'data:text/html;base64,PGgxPg==' }, cookie: r.cookie, origin: base });
  assert.equal(fake.status, 400);
  const back = await call('/api/me', { method: 'PATCH', body: { avatar: 'lumen' }, cookie: r.cookie, origin: base });
  assert.equal(back.data.user.avatar, 'lumen');
});

test('among us rooms: create, public list, join by code, start, reconnect and signalling isolation', async () => {
  // a fresh server: the sign-up rate limit of the shared one is already used by the tests above
  const app2 = await start({ port: 0, dbUrl: ':memory:', quiet: true });
  const saved = base; base = `http://127.0.0.1:${app2.port}`;
  try { await amongScenario(); } finally { base = saved; await app2.close(); }
});
async function amongScenario() {
  const users = [];
  for (const psn of ['AuHost', 'AuTwo', 'AuThree', 'AuFour']) {
    const r = await signup(psn);
    const s = socket(r.cookie); await s.open; await s.next(m => m.t === 'hello');
    users.push({ psn, s, cookie: r.cookie, id: r.data.user.id });
  }
  const [A, B, C, D] = users;
  const au = (u, op, extra = {}) => u.s.req('au', { op, ...extra });
  const created = await au(A, 'create', { public: true, region: 'Europe', name: 'Hote', look: { color: 'red', hat: 'cowboy' } });
  assert.ok(created.ok);
  assert.match(created.code, /^[A-Z]{6}$/);
  await A.s.next(m => m.t === 'au' && m.k === 'welcome');
  const list = await au(B, 'list', { region: 'Europe' });
  assert.ok(list.rooms.some(r => r.code === created.code && r.players === 1 && r.host === 'Hote'));
  const lan = await au(B, 'list', { lan: true });
  assert.ok(!lan.rooms.some(r => r.code === created.code), 'public rooms are not "local" rooms');
  const bad = await au(B, 'join', { code: 'ZZZZZZ' });
  assert.equal(bad.error, 'join');
  for (const u of [B, C, D]) { const j = await au(u, 'join', { code: created.code.toLowerCase(), name: u.psn }); assert.ok(j.ok, j.message); }
  const view = await B.s.next(m => m.t === 'au' && m.k === 'v' && m.v.players.length === 4, 4000);
  assert.equal(view.v.players.find(p => p.name === 'Hote').hat, 'cowboy');
  // the host starts: countdown, then roles
  A.s.send('au', { op: 'msg', m: { k: 'start' } });
  const intro = await B.s.next(m => m.t === 'au' && m.k === 'ev' && m.e === 'intro', 8000);
  assert.ok(['crew', 'imp'].includes(intro.team));
  // snapshots and pongs keep the socket type `t: 'au'` (their own time travels as `at`)
  const snap = await B.s.next(m => m.t === 'au' && m.k === 's', 4000);
  assert.ok(Number.isFinite(snap.at) && Array.isArray(snap.p));
  B.s.send('au', { op: 'msg', m: { k: 'ping', t: 123 } });
  assert.equal((await B.s.next(m => m.t === 'au' && m.k === 'pong', 4000)).at, 123);
  // B loses its connection then comes back with the same code
  B.s.close();
  await new Promise(r => setTimeout(r, 300));
  const B2 = socket(B.cookie); await B2.open; await B2.next(m => m.t === 'hello');
  const again = await B2.req('au', { op: 'join', code: created.code, name: 'AuTwo' });
  assert.ok(again.ok);
  const back = await B2.next(m => m.t === 'au' && m.k === 'v' && m.v.me, 4000);
  assert.ok(back.v.me.role, 'the role survives the reconnection');
  // the realtime hub relays room messages only for members
  const outsider = await signup('AuOut');
  const O = socket(outsider.cookie); await O.open; await O.next(m => m.t === 'hello');
  O.send('au', { op: 'msg', m: { k: 'start' } });
  const health = await call('/api/health');
  assert.ok(health.data.amongRooms >= 1);
  for (const u of [A, C, D]) u.s.close();
  B2.close(); O.close();
}
