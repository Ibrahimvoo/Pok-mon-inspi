// Storage adapter: SQLite (node:sqlite, default) or PostgreSQL (DATABASE_URL=postgres://…).
// Both expose the same async API and take `?` placeholders.
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    psn TEXT NOT NULL,
    psn_key TEXT NOT NULL UNIQUE,
    pass_hash TEXT NOT NULL,
    avatar TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    last_seen BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at BIGINT NOT NULL,
    expires_at BIGINT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id)',
  `CREATE TABLE IF NOT EXISTS friendships (
    user_a TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_b TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    requested_by TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (user_a, user_b)
  )`,
  'CREATE INDEX IF NOT EXISTS friendships_b ON friendships(user_b)',
];

async function sqlite(file) {
  const { DatabaseSync } = await import('node:sqlite');
  if (file !== ':memory:') mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 3000;');
  const cache = new Map();
  const st = sql => { let s = cache.get(sql); if (!s) { s = db.prepare(sql); cache.set(sql, s); } return s; };
  return {
    kind: 'sqlite',
    async all(sql, p = []) { return st(sql).all(...p); },
    async get(sql, p = []) { return st(sql).get(...p); },
    async run(sql, p = []) { return { changes: Number(st(sql).run(...p).changes) }; },
    async exec(sql) { db.exec(sql); },
    async close() { db.close(); },
  };
}

async function postgres(url) {
  const { default: pg } = await import('pg');
  // BIGINT columns hold millisecond timestamps: read them back as numbers
  pg.types.setTypeParser(20, v => Number(v));
  const pool = new pg.Pool({ connectionString: url, max: 10 });
  const q = (sql, p) => { let i = 0; return pool.query(sql.replace(/\?/g, () => '$' + (++i)), p); };
  return {
    kind: 'postgres',
    async all(sql, p = []) { return (await q(sql, p)).rows; },
    async get(sql, p = []) { return (await q(sql, p)).rows[0]; },
    async run(sql, p = []) { return { changes: (await q(sql, p)).rowCount }; },
    async exec(sql) { await pool.query(sql); },
    async close() { await pool.end(); },
  };
}

export async function openDb(url) {
  const db = /^postgres(ql)?:\/\//.test(url || '') ? await postgres(url) : await sqlite(url || 'data/ps5ux.sqlite');
  for (const s of SCHEMA) await db.exec(s);
  return db;
}
