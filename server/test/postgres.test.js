// Same storage checks against a real PostgreSQL (embedded binaries). Run with: TEST_PG=1 npm test
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { start } from '../index.js';

const enabled = process.env.TEST_PG === '1';
let app, base, dataDir, bin;
// Runs the PostgreSQL binaries shipped by the embedded-postgres package (as the "postgres" user when tests run as root).
import { execFileSync } from 'node:child_process';
import { rmSync, mkdirSync, chownSync } from 'node:fs';
import { userInfo } from 'node:os';
const sh = cmd => (userInfo().uid === 0 ? execFileSync('su', ['postgres', '-s', '/bin/sh', '-c', cmd], { stdio: 'pipe' }) : execFileSync('/bin/sh', ['-c', cmd], { stdio: 'pipe' }));
before(async () => {
  if (!enabled) return;
  const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
  bin = join(root, 'node_modules/@embedded-postgres/linux-x64/native/bin');
  dataDir = join(root, 'tools/.cache/pg/data');
  rmSync(dataDir, { recursive: true, force: true });
  mkdirSync(dataDir, { recursive: true });
  if (userInfo().uid === 0) chownSync(dataDir, Number(execFileSync('id', ['-u', 'postgres']).toString()), Number(execFileSync('id', ['-g', 'postgres']).toString()));
  sh(`${bin}/initdb -D ${dataDir} -U ps5 --auth=trust >/dev/null`);
  sh(`${bin}/pg_ctl -D ${dataDir} -o "-p 54329 -k /tmp" -w start >/dev/null`);
  const { default: pgLib } = await import('pg');
  const c = new pgLib.Client({ connectionString: 'postgres://ps5@localhost:54329/postgres' });
  await c.connect(); await c.query('CREATE DATABASE ps5ux'); await c.end();
  app = await start({ port: 0, dbUrl: 'postgres://ps5@localhost:54329/ps5ux', quiet: true });
  base = `http://127.0.0.1:${app.port}`;
});
after(async () => {
  if (!enabled) return;
  await app?.close();
  try { sh(`${bin}/pg_ctl -D ${dataDir} -m fast -w stop >/dev/null`); } catch { /* already stopped */ }
});

const call = async (path, { method = 'GET', body, cookie } = {}) => {
  const r = await fetch(base + path, { method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: r.status, data: await r.json().catch(() => null), cookie: r.headers.get('set-cookie')?.split(';')[0] };
};

test('PostgreSQL: accounts, sessions and friendships', { skip: !enabled && 'set TEST_PG=1' }, async () => {
  assert.equal((await call('/api/health')).data.db, 'postgres');
  const a = await call('/api/auth/register', { method: 'POST', body: { psn: 'PgAlpha', password: 'manette123', avatar: 'lumen' } });
  const b = await call('/api/auth/register', { method: 'POST', body: { psn: 'PgBravo', password: 'manette123', avatar: 'starfall' } });
  assert.equal(a.status, 201); assert.equal(b.status, 201);
  assert.equal((await call('/api/auth/register', { method: 'POST', body: { psn: 'pgalpha', password: 'manette123', avatar: 'lumen' } })).status, 409);
  assert.equal((await call('/api/auth/login', { method: 'POST', body: { psn: 'PGALPHA', password: 'manette123' } })).status, 200);
  assert.equal((await call('/api/me', { cookie: a.cookie })).data.user.psn, 'PgAlpha');
  assert.equal((await call('/api/friends/request', { method: 'POST', body: { psn: 'pgbravo' }, cookie: a.cookie })).status, 200);
  const inc = await call('/api/friends', { cookie: b.cookie });
  assert.equal(inc.data.incoming[0].psn, 'PgAlpha');
  assert.equal(typeof inc.data.incoming[0].since, 'number');
  await call('/api/friends/respond', { method: 'POST', body: { id: inc.data.incoming[0].id, accept: true }, cookie: b.cookie });
  assert.equal((await call('/api/friends', { cookie: a.cookie })).data.friends[0].psn, 'PgBravo');
  assert.equal((await call('/api/users/search?q=pgb', { cookie: a.cookie })).data.users[0].psn, 'PgBravo');
});
