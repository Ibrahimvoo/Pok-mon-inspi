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
  if (course.kind === 'survival') { const [a, b, c] = course.par; return time >= a ? 3 : time >= b ? 2 : time >= c ? 1 : 0; }
  if (!finished) return 0;
  const [a, b] = course.par;
  return time <= a ? 3 : time <= b ? 2 : 1;
}
// one result per player for the on-foot épreuves: race time or survival time, and the rank
export function footResult(summary, meId) {
  const mine = summary.riders.find(r => r.id === meId);
  if (!mine) return null;
  const survival = summary.kind === 'survival';
  const value = survival ? (mine.out ?? mine.time ?? summary.time) : mine.time;
  return { mine, value, finished: survival ? true : mine.time != null, survival };
}

// Apply the outcome of a run to the profile: returns the rewards shown on the results screen.
export function reward(prof, summary, meId) {
  const course = courseById[summary.course];
  if (course.foot) return rewardFoot(prof, summary, meId, course);
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

function rewardFoot(prof, summary, meId, course) {
  const r = footResult(summary, meId);
  const before = levelOf(prof.xp).level, n = summary.riders.length;
  const stars = r.finished ? starsFor(course, r.value, true) : 0;
  let xp = 40 + stars * 35 + (r.finished ? 60 : 0) + (n > 1 ? [90, 55, 30, 15][r.mine.rank - 1] || 10 : 0);
  if (r.survival) xp += Math.round(r.value);
  const coins = Math.round(xp / 4);
  prof.xp += xp; prof.coins += coins;
  prof.stats.runs++; if (r.finished) prof.stats.finishes++;
  if (r.mine.rank === 1 && n > 1) prof.stats.wins = (prof.stats.wins || 0) + 1;
  let record = false;
  if (r.finished && r.value != null) {
    const b = prof.best[course.id], better = !b || (r.survival ? r.value > b.time : r.value < b.time);
    if (better) { prof.best[course.id] = { time: r.value, deaths: 0, stars, at: Date.now() }; record = true; }
    else if (stars > b.stars) b.stars = stars;
    addToBoard(course.id, { time: r.value, deaths: 0, stars, names: [r.mine.name], at: Date.now() }, r.survival);
  }
  prof.save();
  const after = levelOf(prof.xp).level, unlocked = [];
  if (after > before) for (const [kind, list] of Object.entries(CATALOG)) for (const it of list) if (it.lvl && it.lvl > before && it.lvl <= after) unlocked.push({ kind, ...it });
  return { xp, coins, stars, record, levelUp: after > before ? after : 0, unlocked, rank: r.mine.rank };
}

// Tournament points of one round: rank in races and survival; team stars in the descents (+2 for the best pusher).
export function roundPoints(s) {
  const pts = {}, c = courseById[s.course];
  if (s.kind === 'race' || s.kind === 'survival') s.riders.forEach(r => { pts[r.id] = s.kind === 'race' && r.time == null ? 1 : [10, 7, 5, 3][r.rank - 1] || 2; });
  else {
    const base = [1, 4, 6, 8][starsFor(c, s.time, s.finished)], mvp = s.riders.slice().sort((a, b) => b.puff - a.puff)[0];
    s.riders.forEach(r => { pts[r.id] = base + (r === mvp && s.riders.length > 1 ? 2 : 0); });
  }
  return pts;
}

// Records of this console (every profile), best times first.
export function board(courseId) { return (read(BOARD, {})[courseId] || []); }
function addToBoard(courseId, run, longestFirst = false) {
  const all = read(BOARD, {});
  const list = all[courseId] || [];
  // the same team finishing on several screens of one console is only listed once
  if (!list.some(r => Math.abs(r.time - run.time) < .01 && r.names.join() === run.names.join())) list.push(run);
  list.sort((a, b) => (longestFirst ? b.time - a.time : a.time - b.time));
  all[courseId] = list.slice(0, 10);
  write(BOARD, all);
}
