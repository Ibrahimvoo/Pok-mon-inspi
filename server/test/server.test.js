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
  sb.send('presence', { activity: 'game', game: 'starfall' });
  const pr = await sa.next(m => m.t === 'presence' && m.game === 'starfall');
  assert.equal(pr.online, true);
  await new Promise(r => setTimeout(r, 150));
  assert.ok(!sc.inbox.some(m => m.t === 'presence' && m.game === 'starfall'));

  // only friends can be invited
  const notFriend = await sa.req('party.invite', { to: (await call('/api/me', { cookie: c.cookie })).data.user.id });
  assert.equal(notFriend.error, 'not_friend');
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
  assert.equal((await sa.req('game.start', { game: 'starfall' })).ok, true);
  const started = await sb.next(m => m.t === 'game.started');
  assert.equal(started.game, 'starfall');
  sa.send('g', { x: .25, y: 2, p: 1 });
  const g = await sb.next(m => m.t === 'g');
  assert.deepEqual([g.x, g.y, g.p], [.25, 1, 1]);
  sb.send('chat', { text: '  on y va ?  ' });
  assert.equal((await sa.next(m => m.t === 'chat')).msg.text, 'on y va ?');

  // leaving hands the party to the remaining member
  sa.send('party.leave');
  const after = await sb.next(m => m.t === 'party' && m.party?.members.length === 1);
  assert.equal(after.party.host, bId);
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
