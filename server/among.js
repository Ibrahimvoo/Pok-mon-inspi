// Among Us rooms on the server: the server runs every room (authority), clients talk to it through the realtime
// WebSocket with { t: 'au', op, … } messages. Rooms are found by code, by the public list, or on the same network.
import { Room, TICK } from '../src/among/core/room.js';
import { cleanSettings, MAX_PLAYERS } from '../src/among/core/rules.js';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const REGIONS = ['Europe', 'Amérique du Nord', 'Asie'];

export function createAmongHub({ toUser, log = () => {} }) {
  const rooms = new Map();          // code → Room
  const where = new Map();          // userId → code
  const lanOf = new Map();          // code → public IP of the host (rooms created from "Local")

  function newCode() {
    for (let i = 0; i < 50; i++) {
      const c = Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
      if (!rooms.has(c)) return c;
    }
    throw new Error('no code');
  }
  function leave(userId) {
    const code = where.get(userId);
    if (!code) return;
    where.delete(userId);
    rooms.get(code)?.leave(userId);
  }
  function create(u, m, ip) {
    leave(u.id);
    const code = newCode();
    const room = new Room({
      code, hostId: u.id, isPublic: !!m.public && !m.lan, region: REGIONS.includes(m.region) ? m.region : REGIONS[0], mode: 'online', log,
      // `t` is the socket's message type: a room field of the same name (snapshot and pong times) travels as `at`
      send: (id, msg) => toUser(id, 't' in msg ? { ...msg, at: msg.t, t: 'au', code } : { ...msg, t: 'au', code }),
      onEmpty: () => { rooms.delete(code); lanOf.delete(code); for (const [id, c] of where) if (c === code) where.delete(id); },
    });
    if (m.settings) room.settings = cleanSettings(m.settings, room.settings);
    rooms.set(code, room);
    if (m.lan) lanOf.set(code, ip);
    return code;
  }
  function join(u, code, m) {
    const room = rooms.get(code);
    if (!room) return 'Aucune partie avec ce code. Vérifiez le code.';
    if (where.get(u.id) !== code) leave(u.id);
    const err = room.join(u.id, { name: m.name || u.psn, color: m.look?.color });
    if (err) return err;
    if (m.look) room.handle(u.id, { k: 'look', ...m.look });
    where.set(u.id, code);
    return null;
  }

  const ops = {
    create(u, m, ip) {
      const code = create(u, m, ip);
      const err = join(u, code, m);
      return err ? { error: 'join', message: err } : { ok: true, code };
    },
    join(u, m) {
      const code = String(m.code || '').toUpperCase().replace(/[^A-Z]/g, '');
      if (code.length !== 6) return { error: 'code', message: 'Le code contient 6 lettres.' };
      const err = join(u, code, m);
      return err ? { error: 'join', message: err } : { ok: true, code };
    },
    list(u, m, ip) {
      const lan = !!m.lan;
      const out = [];
      for (const [code, room] of rooms) {
        const info = room.info();
        if (lan ? lanOf.get(code) !== ip : !room.public) continue;
        if (!lan && m.region && info.region !== m.region) continue;
        if (info.phase !== 'lobby' || info.players >= info.max) continue;
        if (m.map && info.map !== m.map) continue;
        out.push(info);
      }
      out.sort((a, b) => b.players - a.players);
      return { ok: true, rooms: out.slice(0, 40), total: rooms.size };
    },
    // what the « Entrer un code » screen shows before joining (host, capacity, region)
    peek(u, m) {
      const room = rooms.get(String(m.code || '').toUpperCase());
      if (!room) return { error: 'code', message: 'Aucune partie avec ce code.' };
      const { host, players, max, region, map, phase } = room.info();
      return { ok: true, room: { host, players, max, region, map, phase, voice: room.settings.voiceChat !== false } };
    },
    msg(u, m) {
      const code = where.get(u.id);
      const room = code && rooms.get(code);
      if (!room || !m.m || typeof m.m !== 'object') return;
      room.handle(u.id, m.m);
      if (m.m.k === 'leave') where.delete(u.id);
    },
    leave(u) { leave(u.id); return { ok: true }; },
  };

  const timer = setInterval(() => {
    for (const room of rooms.values()) {
      try { room.tick(); } catch (e) { log('among tick error', e); }
    }
  }, TICK);
  timer.unref?.();

  return {
    handle(u, m, ip) { const f = ops[m.op]; return f ? f(u, m, ip) : undefined; },
    // the last socket of a user closed: the room keeps the seat during its grace period
    dropped(userId) { const code = where.get(userId); if (code) rooms.get(code)?.drop(userId); },
    stats: () => ({ amongRooms: rooms.size, amongPlayers: where.size, maxPlayers: MAX_PLAYERS }),
    close() { clearInterval(timer); },
    rooms,
  };
}
