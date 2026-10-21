// Accounts, sessions and friendships. Passwords are hashed with scrypt; session tokens are stored hashed.
import { scrypt as scryptCb, randomBytes, timingSafeEqual, createHash, randomUUID } from 'node:crypto';
import { promisify } from 'node:util';
import { GAMES } from '../src/data.js';

const scrypt = promisify(scryptCb);
const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
export const SESSION_TTL = 30 * 24 * 3600e3;
export const AVATARS = GAMES.map(g => g.id);
const PSN_RE = /^[A-Za-z][A-Za-z0-9_-]{2,15}$/;

export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

export function validateSignup({ psn, password, avatar }) {
  const errors = {};
  if (typeof psn !== 'string' || !PSN_RE.test(psn)) errors.psn = 'De 3 à 16 caractères : lettres, chiffres, « - » ou « _ », en commençant par une lettre.';
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) errors.password = 'Au moins 8 caractères.';
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) errors.password = 'Utilisez au moins une lettre et un chiffre.';
  if (!AVATARS.includes(avatar)) errors.avatar = 'Choisissez un avatar.';
  return errors;
}

async function hashPassword(pw) {
  const salt = randomBytes(16);
  const key = await scrypt(pw.normalize('NFKC'), salt, 32, SCRYPT);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}
const DUMMY = 'scrypt$AAAAAAAAAAAAAAAAAAAAAA==$' + Buffer.alloc(32).toString('base64');
async function verifyPassword(pw, stored = DUMMY) {
  const [, s, k] = stored.split('$');
  const key = await scrypt(String(pw).normalize('NFKC'), Buffer.from(s, 'base64'), 32, SCRYPT);
  const want = Buffer.from(k, 'base64');
  return want.length === key.length && timingSafeEqual(key, want) && stored !== DUMMY;
}
const sha = t => createHash('sha256').update(t).digest('hex');
export const publicUser = u => u && { id: u.id, psn: u.psn, avatar: u.avatar, createdAt: u.created_at };

export function accounts(db) {
  const pair = (a, b) => (a < b ? [a, b] : [b, a]);
  return {
    async register({ psn, password, avatar }) {
      const errors = validateSignup({ psn, password, avatar });
      if (Object.keys(errors).length) throw Object.assign(new AppError(400, 'invalid', 'Certains champs sont invalides.'), { fields: errors });
      const key = psn.toLowerCase();
      if (await db.get('SELECT id FROM users WHERE psn_key = ?', [key])) throw Object.assign(new AppError(409, 'taken', 'Cet identifiant en ligne est déjà utilisé.'), { fields: { psn: 'Cet identifiant en ligne est déjà utilisé.' } });
      const user = { id: randomUUID(), psn, psn_key: key, pass_hash: await hashPassword(password), avatar, created_at: Date.now() };
      try {
        await db.run('INSERT INTO users (id, psn, psn_key, pass_hash, avatar, created_at, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [user.id, user.psn, user.psn_key, user.pass_hash, user.avatar, user.created_at, user.created_at]);
      } catch (e) {
        if (/unique|duplicate/i.test(e.message)) throw new AppError(409, 'taken', 'Cet identifiant en ligne est déjà utilisé.');
        throw e;
      }
      return user;
    },
    async login({ psn, password }) {
      if (typeof psn !== 'string' || typeof password !== 'string' || psn.length > 32 || password.length > 128) throw new AppError(400, 'invalid', 'Identifiant ou mot de passe manquant.');
      const user = await db.get('SELECT * FROM users WHERE psn_key = ?', [psn.toLowerCase()]);
      const ok = await verifyPassword(password, user?.pass_hash);
      if (!user || !ok) throw new AppError(401, 'bad_credentials', 'Identifiant en ligne ou mot de passe incorrect.');
      return user;
    },
    async createSession(userId) {
      const token = randomBytes(32).toString('base64url');
      const now = Date.now();
      await db.run('INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)', [sha(token), userId, now, now + SESSION_TTL]);
      return token;
    },
    async userForToken(token) {
      if (!token || token.length > 100) return null;
      const row = await db.get('SELECT u.*, s.expires_at AS s_exp, s.created_at AS s_created FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?', [sha(token)]);
      if (!row) return null;
      if (row.s_exp < Date.now()) { await db.run('DELETE FROM sessions WHERE token_hash = ?', [sha(token)]); return null; }
      // sliding expiry, refreshed at most once a day
      if (row.s_exp - Date.now() < SESSION_TTL - 24 * 3600e3) await db.run('UPDATE sessions SET expires_at = ? WHERE token_hash = ?', [Date.now() + SESSION_TTL, sha(token)]);
      return row;
    },
    async destroySession(token) { if (token) await db.run('DELETE FROM sessions WHERE token_hash = ?', [sha(token)]); },
    async setAvatar(userId, avatar) {
      if (!AVATARS.includes(avatar)) throw new AppError(400, 'invalid', 'Avatar inconnu.');
      await db.run('UPDATE users SET avatar = ? WHERE id = ?', [avatar, userId]);
    },
    async touch(userId) { await db.run('UPDATE users SET last_seen = ? WHERE id = ?', [Date.now(), userId]); },
    async byId(id) { return db.get('SELECT * FROM users WHERE id = ?', [id]); },
    async search(q, selfId) {
      const key = String(q || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');
      if (key.length < 2) return [];
      return (await db.all('SELECT * FROM users WHERE psn_key LIKE ? AND id <> ? ORDER BY psn_key LIMIT 10', [key + '%', selfId])).map(publicUser);
    },

    // ------------------------------------------------------------ friends
    async relations(userId) {
      const rows = await db.all(`SELECT f.status, f.requested_by, f.created_at AS since, u.id, u.psn, u.avatar, u.last_seen
        FROM friendships f JOIN users u ON u.id = CASE WHEN f.user_a = ? THEN f.user_b ELSE f.user_a END
        WHERE f.user_a = ? OR f.user_b = ?`, [userId, userId, userId]);
      const out = { friends: [], incoming: [], outgoing: [] };
      for (const r of rows) {
        const u = { id: r.id, psn: r.psn, avatar: r.avatar, lastSeen: r.last_seen, since: r.since };
        if (r.status === 'accepted') out.friends.push(u);
        else (r.requested_by === userId ? out.outgoing : out.incoming).push(u);
      }
      out.friends.sort((a, b) => a.psn.localeCompare(b.psn));
      return out;
    },
    async friendIds(userId) {
      const rows = await db.all("SELECT user_a, user_b FROM friendships WHERE status = 'accepted' AND (user_a = ? OR user_b = ?)", [userId, userId]);
      return rows.map(r => (r.user_a === userId ? r.user_b : r.user_a));
    },
    async request(userId, psn) {
      const other = await db.get('SELECT * FROM users WHERE psn_key = ?', [String(psn || '').toLowerCase()]);
      if (!other) throw new AppError(404, 'not_found', 'Aucun joueur ne porte cet identifiant en ligne.');
      if (other.id === userId) throw new AppError(400, 'self', 'Vous ne pouvez pas vous ajouter vous-même.');
      const [a, b] = pair(userId, other.id);
      const existing = await db.get('SELECT * FROM friendships WHERE user_a = ? AND user_b = ?', [a, b]);
      if (existing?.status === 'accepted') throw new AppError(409, 'already', 'Vous êtes déjà amis.');
      if (existing && existing.requested_by === userId) throw new AppError(409, 'pending', 'Demande déjà envoyée.');
      if (existing) { // they already asked us: accept
        await db.run("UPDATE friendships SET status = 'accepted' WHERE user_a = ? AND user_b = ?", [a, b]);
        return { other, accepted: true };
      }
      const count = await db.get("SELECT COUNT(*) AS n FROM friendships WHERE requested_by = ? AND status = 'pending'", [userId]);
      if (Number(count.n) >= 50) throw new AppError(429, 'too_many', 'Trop de demandes en attente.');
      await db.run("INSERT INTO friendships (user_a, user_b, status, requested_by, created_at) VALUES (?, ?, 'pending', ?, ?)", [a, b, userId, Date.now()]);
      return { other, accepted: false };
    },
    async respond(userId, otherId, accept) {
      const [a, b] = pair(userId, String(otherId));
      const row = await db.get('SELECT * FROM friendships WHERE user_a = ? AND user_b = ?', [a, b]);
      if (!row || row.status !== 'pending' || row.requested_by === userId) throw new AppError(404, 'not_found', 'Demande introuvable.');
      if (accept) await db.run("UPDATE friendships SET status = 'accepted' WHERE user_a = ? AND user_b = ?", [a, b]);
      else await db.run('DELETE FROM friendships WHERE user_a = ? AND user_b = ?', [a, b]);
    },
    async remove(userId, otherId) {
      const [a, b] = pair(userId, String(otherId));
      const r = await db.run('DELETE FROM friendships WHERE user_a = ? AND user_b = ?', [a, b]);
      if (!r.changes) throw new AppError(404, 'not_found', 'Ce joueur ne fait pas partie de vos amis.');
    },
  };
}
