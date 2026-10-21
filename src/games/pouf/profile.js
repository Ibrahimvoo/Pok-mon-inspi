// Player progression saved on this console: look, level/XP, coins, unlocks, statistics and course records.
import { defaultLook, SPECIES, HATS, EXTRAS, GASES, EMOTES, COLORS } from './view/characters.js';
import { courseById } from './maps/index.js';

const KEY = 'pouf.v1.';
const BOARD = 'pouf.v1.board';
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } };

// XP needed to reach level n+1 from level n
export const levelNeed = n => 160 + n * 90;
export function levelOf(xp) { let n = 1; while (xp >= levelNeed(n)) { xp -= levelNeed(n); n++; } return { level: n, into: xp, need: levelNeed(n) }; }
// coins price of items above the player's level
export const PRICE = 120;

export function loadProfile(user) {
  const p = read(KEY + user.id, null) || {};
  const prof = {
    id: user.id, name: user.psn || 'Joueur',
    look: { ...firstLook(user.id), ...(p.look || {}) },
    xp: p.xp || 0, coins: p.coins ?? 50, bought: p.bought || [],
    stats: { runs: 0, finishes: 0, pops: 0, puffSec: 0, supers: 0, cps: 0, ...(p.stats || {}) },
    best: p.best || {}, settings: { aim: 'push', invert: false, camSpeed: 1, ...(p.settings || {}) },
    tutorial: !!p.tutorial,
  };
  prof.save = () => write(KEY + user.id, { look: prof.look, xp: prof.xp, coins: prof.coins, bought: prof.bought, stats: prof.stats, best: prof.best, settings: prof.settings, tutorial: prof.tutorial });
  prof.level = () => levelOf(prof.xp).level;
  // an item is available when the level is reached or it was bought with coins
  prof.owns = (kind, item) => !item.lvl || prof.level() >= item.lvl || prof.bought.includes(kind + ':' + item.id);
  return prof;
}
// a new player starts with one of the four starter critters and a hat, picked from their id
function firstLook(id) {
  const h = Math.abs(hashStr(id)), base = defaultLook(h % 4);
  return { ...base, hat: ['none', 'cap', 'party', 'flower'][(h >> 3) % 4] };
}
const hashStr = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return h; };

export const CATALOG = { species: SPECIES, hat: HATS, extra: EXTRAS, gas: GASES, emote: EMOTES, color: COLORS.map(c => ({ id: c, name: c })) };

// stars: 3 = under the par time, then 2, 1; a finish always earns at least one
export function starsFor(course, time, finished) {
  if (!finished) return 0;
  const [a, b] = course.par;
  return time <= a ? 3 : time <= b ? 2 : 1;
}

// Apply the outcome of a run to the profile: returns the rewards shown on the results screen.
export function reward(prof, summary, meId) {
  const course = courseById[summary.course];
  const mine = summary.riders.find(r => r.id === meId);
  const stars = starsFor(course, summary.time, summary.finished);
  const before = levelOf(prof.xp).level;
  let xp = 40 + summary.cps * 25 + (summary.finished ? 120 : 0) + stars * 40 + (summary.riders.length > 1 ? 30 : 0);
  if (summary.finished && summary.deaths === 0) xp += 60;
  const coins = Math.round(xp / 4);
  prof.xp += xp; prof.coins += coins;
  const st = prof.stats;
  st.runs++; if (summary.finished) st.finishes++;
  st.pops += summary.deaths; st.cps += summary.cps;
  if (mine) { st.puffSec += mine.puff; st.supers += mine.supers; }
  let record = false;
  if (summary.finished) {
    const b = prof.best[course.id];
    if (!b || summary.time < b.time) { prof.best[course.id] = { time: summary.time, deaths: summary.deaths, stars, at: Date.now() }; record = true; }
    else if (stars > b.stars) b.stars = stars;
    addToBoard(course.id, { time: summary.time, deaths: summary.deaths, stars, names: summary.riders.map(r => r.name), at: Date.now() });
  }
  prof.save();
  const after = levelOf(prof.xp).level;
  const unlocked = [];
  if (after > before) for (const [kind, list] of Object.entries(CATALOG)) for (const it of list) if (it.lvl && it.lvl > before && it.lvl <= after) unlocked.push({ kind, ...it });
  return { xp, coins, stars, record, levelUp: after > before ? after : 0, unlocked };
}

// Records of this console (every profile), best times first.
export function board(courseId) { return (read(BOARD, {})[courseId] || []); }
function addToBoard(courseId, run) {
  const all = read(BOARD, {});
  const list = all[courseId] || [];
  // the same team finishing on several screens of one console is only listed once
  if (!list.some(r => Math.abs(r.time - run.time) < .01 && r.names.join() === run.names.join())) list.push(run);
  list.sort((a, b) => a.time - b.time);
  all[courseId] = list.slice(0, 10);
  write(BOARD, all);
}
