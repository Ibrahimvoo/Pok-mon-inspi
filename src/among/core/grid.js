// Map compiler shared by the authority (server or hosting console) and every client: rasterises the traced map into
// grids used for movement, collision, line of sight, vision and room lookup. World unit = one crewmate width.
export const RES = 8;                 // grid cells per world unit
export const RADIUS = 0.26;           // feet radius of a crewmate (world units)

const inPoly = (pts, x, y) => {
  let ins = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
};
// shapes are written in image pixels: {r:[x0,y0,x1,y1]} rectangle, {p:[[x,y]…]} polygon, {c:[x,y,r]} circle
export function shapeTest(s, k) {
  if (s.r) { const [a, b, c, d] = s.r.map(v => v / k); return (x, y) => x >= a && x <= c && y >= b && y <= d; }
  if (s.c) { const [cx, cy, r] = s.c.map(v => v / k); return (x, y) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r; }
  if (s.p) { const pts = s.p.map(([x, y]) => [x / k, y / k]); return (x, y) => inPoly(pts, x, y); }
  throw new Error('shape');
}
export function shapeBox(s, k) {
  if (s.r) return s.r.map(v => v / k);
  if (s.c) { const [x, y, r] = s.c; return [(x - r) / k, (y - r) / k, (x + r) / k, (y + r) / k]; }
  const xs = s.p.map(p => p[0] / k), ys = s.p.map(p => p[1] / k);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

// two-pass chamfer distance (in cells) from every cell to the nearest cell where src is 0
function distance(src, w, h) {
  const D = new Float32Array(w * h);
  const INF = 1e6, A = 1, B = Math.SQRT2;
  for (let i = 0; i < w * h; i++) D[i] = src[i] ? INF : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; let d = D[i]; if (!d) continue;
    if (x > 0) d = Math.min(d, D[i - 1] + A); else d = Math.min(d, A);
    if (y > 0) { d = Math.min(d, D[i - w] + A); if (x > 0) d = Math.min(d, D[i - w - 1] + B); if (x < w - 1) d = Math.min(d, D[i - w + 1] + B); } else d = Math.min(d, A);
    D[i] = d;
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x; let d = D[i]; if (!d) continue;
    if (x < w - 1) d = Math.min(d, D[i + 1] + A); else d = Math.min(d, A);
    if (y < h - 1) { d = Math.min(d, D[i + w] + A); if (x < w - 1) d = Math.min(d, D[i + w + 1] + B); if (x > 0) d = Math.min(d, D[i + w - 1] + B); } else d = Math.min(d, A);
    D[i] = d;
  }
  return D;
}

export function compileMap(def) {
  const k = def.scale;
  const [bx0, by0, bx1, by1] = def.bounds.map(v => v / k);
  const ox = Math.floor(bx0), oy = Math.floor(by0);
  const w = Math.ceil((bx1 - ox) * RES), h = Math.ceil((by1 - oy) * RES);
  const floor = new Uint8Array(w * h), sight = new Uint8Array(w * h), room = new Uint8Array(w * h);
  const rooms = def.rooms.map((r, i) => ({ ...r, i: i + 1, label: r.label && [r.label[0] / k, r.label[1] / k] }));
  const roomIndex = Object.fromEntries(rooms.map(r => [r.id, r.i]));
  const cx = i => ox + (i + .5) / RES, cy = j => oy + (j + .5) / RES;
  for (const [op, s, o = {}] of def.ops) {
    const test = shapeTest(s, k), [a, b, c, d] = shapeBox(s, k);
    const i0 = Math.max(0, Math.floor((a - ox) * RES)), i1 = Math.min(w - 1, Math.ceil((c - ox) * RES));
    const j0 = Math.max(0, Math.floor((b - oy) * RES)), j1 = Math.min(h - 1, Math.ceil((d - oy) * RES));
    const ri = o.room ? roomIndex[o.room] : 0;
    if (o.room && !ri) throw new Error(`unknown room ${o.room} in ${def.id}`);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      if (!test(cx(i), cy(j))) continue;
      const n = j * w + i;
      if (op === 'add') { floor[n] = 1; sight[n] = 1; if (ri) room[n] = ri; }
      else if (op === 'sub') { floor[n] = 0; sight[n] = o.see ? 1 : 0; }
      else if (op === 'room') { room[n] = ri; }
    }
  }
  // feet can stand where the floor is at least RADIUS away from any wall or obstacle
  const fd = distance(floor, w, h);
  const walk = new Uint8Array(w * h);
  const rc = RADIUS * RES;
  for (let n = 0; n < w * h; n++) walk[n] = fd[n] >= rc ? 1 : 0;
  // distance from any cell to the walkable area (validation tolerance for positions sent by clients)
  const inv = new Uint8Array(w * h); for (let n = 0; n < w * h; n++) inv[n] = walk[n] ? 0 : 1;
  const toWalk = distance(inv, w, h);
  const P = ([x, y]) => [x / k, y / k];
  const doors = (def.doors || []).map((d, i) => {
    const [a, b, c, e] = d.r.map(v => v / k);
    const block = [], seal = [];
    const m = RADIUS + .05;
    for (let j = Math.max(0, Math.floor((b - m - oy) * RES)); j <= Math.min(h - 1, Math.ceil((e + m - oy) * RES)); j++)
      for (let ii = Math.max(0, Math.floor((a - m - ox) * RES)); ii <= Math.min(w - 1, Math.ceil((c + m - ox) * RES)); ii++) {
        const x = cx(ii), y = cy(j);
        if (x >= a - m && x <= c + m && y >= b - m && y <= e + m) block.push(j * w + ii);
        if (x >= a && x <= c && y >= b && y <= e) seal.push(j * w + ii);
      }
    return { ...d, i, box: [a, b, c, e], x: (a + c) / 2, y: (b + e) / 2, vertical: e - b > c - a, block, seal };
  });
  const doorBlock = new Int16Array(w * h).fill(-1), doorSeal = new Int16Array(w * h).fill(-1);
  doors.forEach(d => { d.block.forEach(n => { doorBlock[n] = d.i; }); d.seal.forEach(n => { doorSeal[n] = d.i; }); });
  const vents = (def.vents || []).map(v => ({ ...v, x: v.x / k, y: v.y / k }));
  const spot = o => (o ? { ...o, x: o.x / k, y: o.y / k } : null);
  const consoles = Object.fromEntries(Object.entries(def.consoles || {}).map(([id, c]) => [id, { id, ...spot(c) }]));
  const M = {
    id: def.id, name: def.name, def, k, ox, oy, w, h, floor, sight, walk, toWalk, room, rooms, roomIndex,
    width: bx1 - ox, height: by1 - oy, doors, doorBlock, doorSeal, vents, consoles,
    button: spot(def.button), spawn: P(def.spawn), meeting: def.meeting && { x: def.meeting.x / k, y: def.meeting.y / k, r: def.meeting.r / k },
    admin: spot(def.admin), vitals: spot(def.vitals), cams: def.cams && { ...spot(def.cams), views: def.cams.views.map(spot) },
    sabotage: def.sabotage ? Object.fromEntries(Object.entries(def.sabotage).map(([s, list]) => [s, list.map(spot)])) : {},
    props: def.props || [], decor: def.decor || {},
    cell(x, y) { const i = Math.floor((x - ox) * RES), j = Math.floor((y - oy) * RES); return i < 0 || j < 0 || i >= w || j >= h ? -1 : j * w + i; },
    // closed: Set (or array) of closed door indices
    canStand(x, y, closed) {
      const n = this.cell(x, y);
      if (n < 0 || !walk[n]) return false;
      return !(closed && doorBlock[n] >= 0 && closedHas(closed, doorBlock[n]));
    },
    nearWalk(x, y, tol, closed) {
      const n = this.cell(x, y);
      if (n < 0 || toWalk[n] > tol * RES) return false;
      return !(closed && doorBlock[n] >= 0 && closedHas(closed, doorBlock[n]) && doorSeal[n] >= 0);
    },
    inside(x, y) { return x >= ox && y >= oy && x <= ox + w / RES && y <= oy + h / RES; },
    // slide along walls: full step, else each axis separately
    move(x, y, dx, dy, closed) {
      const len = Math.hypot(dx, dy), steps = Math.max(1, Math.ceil(len / .06));
      const sx = dx / steps, sy = dy / steps;
      for (let s = 0; s < steps; s++) {
        if (this.canStand(x + sx, y + sy, closed)) { x += sx; y += sy; continue; }
        let moved = false;
        if (sx && this.canStand(x + sx, y, closed)) { x += sx; moved = true; }
        if (sy && this.canStand(x, y + sy, closed)) { y += sy; moved = true; }
        if (!moved) break;
      }
      return [x, y];
    },
    // free movement for ghosts: anywhere inside the map bounds
    clampBounds(x, y) { return [Math.min(ox + w / RES - .3, Math.max(ox + .3, x)), Math.min(oy + h / RES - .3, Math.max(oy + .3, y))]; },
    transparent(n, closed) { return sight[n] && !(closed && doorSeal[n] >= 0 && closedHas(closed, doorSeal[n])); },
    // line of sight between two points (walls and closed doors block it)
    los(x0, y0, x1, y1, closed) {
      const d = Math.hypot(x1 - x0, y1 - y0), steps = Math.max(1, Math.ceil(d * RES * 1.5));
      for (let s = 1; s < steps; s++) {
        const t = s / steps, n = this.cell(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
        if (n < 0 || !this.transparent(n, closed)) return false;
      }
      return true;
    },
    // distance travelled by a ray before it meets an opaque cell
    ray(x, y, ang, max, closed) {
      const dx = Math.cos(ang), dy = Math.sin(ang), step = 1 / (RES * 1.6);
      let t = 0;
      while (t < max) {
        t += step;
        const n = this.cell(x + dx * t, y + dy * t);
        if (n < 0 || !this.transparent(n, closed)) return Math.max(0, t - step * .5);
      }
      return max;
    },
    roomAt(x, y) { const n = this.cell(x, y); const r = n >= 0 ? room[n] : 0; return r ? rooms[r - 1] : null; },
    nearestStand(x, y, closed, maxR = 4) {
      if (this.canStand(x, y, closed)) return [x, y];
      for (let r = 1 / RES; r <= maxR; r += 1 / RES) {
        for (let a = 0; a < 24; a++) {
          const t = a / 24 * Math.PI * 2, px = x + Math.cos(t) * r, py = y + Math.sin(t) * r;
          if (this.canStand(px, py, closed)) return [px, py];
        }
      }
      return [this.spawn[0], this.spawn[1]];
    },
  };
  return M;
}
const closedHas = (c, i) => (c instanceof Set ? c.has(i) : Array.isArray(c) ? c.includes(i) : !!c[i]);
