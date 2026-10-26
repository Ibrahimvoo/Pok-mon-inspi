// Breadth-first path finding on the walk grid (used by tests, the free-play dummies and the end-to-end scripts).
import { RES } from './grid.js';

export function findPath(M, ax, ay, bx, by, closed, step = 1) {
  const W = Math.ceil(M.w / step), H = Math.ceil(M.h / step);
  const cell = (x, y) => [Math.floor((x - M.ox) * RES / step), Math.floor((y - M.oy) * RES / step)];
  const center = (i, j) => [M.ox + (i * step + .5) / RES, M.oy + (j * step + .5) / RES];
  const ok = (i, j) => { if (i < 0 || j < 0 || i >= W || j >= H) return false; const [x, y] = center(i, j); return M.canStand(x, y, closed); };
  let [si, sj] = cell(ax, ay), [ti, tj] = cell(bx, by);
  const near = (i, j) => { if (ok(i, j)) return [i, j]; for (let r = 1; r < 8; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) if (ok(i + di, j + dj)) return [i + di, j + dj]; return null; };
  // a diagonal step must not clip a wall corner
  const clear = (i, j, ni, nj) => { const [x0, y0] = center(i, j), [x1, y1] = center(ni, nj); for (let k = 1; k < 6; k++) if (!M.canStand(x0 + (x1 - x0) * k / 6, y0 + (y1 - y0) * k / 6, closed)) return false; return true; };
  const s = near(si, sj), t = near(ti, tj);
  if (!s || !t) return null;
  [si, sj] = s; [ti, tj] = t;
  const prev = new Int32Array(W * H).fill(-1);
  const q = [sj * W + si]; prev[q[0]] = q[0];
  const D = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  for (let h = 0; h < q.length; h++) {
    const c = q[h], i = c % W, j = (c - i) / W;
    if (i === ti && j === tj) break;
    for (const [di, dj] of D) {
      const ni = i + di, nj = j + dj, n = nj * W + ni;
      if (prev[n] !== -1 || !ok(ni, nj)) continue;
      if (di && dj && (!ok(i + di, j) || !ok(i, j + dj) || !clear(i, j, ni, nj))) continue;
      prev[n] = c; q.push(n);
    }
  }
  const end = tj * W + ti;
  if (prev[end] === -1) return null;
  const pts = [];
  for (let c = end; ; c = prev[c]) { const i = c % W; pts.push(center(i, (c - i) / W)); if (prev[c] === c) break; }
  pts.reverse();
  pts.push([bx, by]);
  return pts;
}
