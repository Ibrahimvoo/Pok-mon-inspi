// Every playable course, in unlock order. Positions written as [segment, fraction] are resolved to metres.
import { LAGON } from './lagon.js';
import { GLACIER } from './glacier.js';
import { MARAIS } from './marais.js';

function resolve(def) {
  const starts = [];
  let acc = 0;
  for (const g of def.segs) { starts.push(acc); acc += g.len; }
  const at = v => (Array.isArray(v) ? starts[v[0]] + v[1] * def.segs[v[0]].len : v);
  const c = { ...def, spawn: at(def.spawn), start: at(def.start), finish: at(def.finish), checkpoints: def.checkpoints.map(at) };
  c.hazards = def.hazards.map(({ at: a, to, ...h }) => ({ ...h, s: a != null ? at(a) : h.s, ...(to != null ? { s1: at(to) } : {}) }));
  return c;
}
// par times (3, 2 and 1 stars) scale with the course length when they are not given
function withPar(c) { if (!c.par) { const k = c.finish / 575; c.par = [150, 210, 300].map(v => Math.round(v * k / 5) * 5); } return c; }

export const COURSES = [LAGON, GLACIER, MARAIS].map(resolve).map(withPar);
export const courseById = Object.fromEntries(COURSES.map(c => [c.id, c]));
