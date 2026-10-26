// Samples the floor colour of every room (and of the corridors / outdoor ground) from the reference map images,
// so the vector maps use the same colours. Output: src/among/art/floors.js
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { compileMap, RES } from '../../src/among/core/grid.js';
const out = {};
for (const [id, img] of [['skeld', process.argv[2]], ['polus', process.argv[3]]]) {
  const M = compileMap((await import(`../../src/among/core/maps/${id}.js`)).default);
  const pts = { hull: [] }, add = (k, x, y) => { (pts[k] ||= []).push([Math.round(x * M.k), Math.round(y * M.k)]); };
  for (let j = 0; j < M.h; j += 2) for (let i = 0; i < M.w; i += 2) {
    const n = j * M.w + i, x = M.ox + (i + .5) / RES, y = M.oy + (j + .5) / RES;
    if (M.walk[n]) { const r = M.room[n]; add(r ? M.rooms[r - 1].id : '_corridor', x, y); }
  }
  const json = execFileSync('python3', ['-I', '-c', `
import json, sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB'); pts = json.loads(sys.stdin.read()); res = {}
for k, ps in pts.items():
  cols = sorted([im.getpixel((x, y)) for x, y in ps if 0 <= x < im.width and 0 <= y < im.height], key=lambda c: sum(c))
  if not cols: continue
  core = cols[len(cols)//4: 3*len(cols)//4] or cols
  res[k] = '#%02x%02x%02x' % tuple(int(sum(c[i] for c in core)/len(core)) for i in range(3))
print(json.dumps(res))`, img], { input: JSON.stringify(pts) }).toString();
  out[id] = JSON.parse(json);
}
writeFileSync('src/among/art/floors.js', `// Floor colours sampled from the reference map images (tools/among/sample_floors.mjs).\nexport const FLOORS = ${JSON.stringify(out, null, 1)};\n`);
console.log(out);
