// Draws a compiled map (walkable floor, walls, doors, vents, consoles) over the reference image to check the tracing.
// Usage: node tools/among/overlay.mjs skeld reference.jpg out.png
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { compileMap, RES } from '../../src/among/core/grid.js';
const [id, img, out] = process.argv.slice(2);
const def = (await import(`../../src/among/core/maps/${id}.js`)).default;
const M = compileMap(def);
const dump = { k: M.k, ox: M.ox, oy: M.oy, w: M.w, h: M.h, RES, walk: Buffer.from(M.walk).toString('base64'), floor: Buffer.from(M.floor).toString('base64'), sight: Buffer.from(M.sight).toString('base64'),
  doors: M.doors.map(d => d.box), vents: M.vents.map(v => [v.x, v.y, v.id]), consoles: Object.values(M.consoles).map(c => [c.x, c.y, c.id]),
  sab: Object.values(M.sabotage).flat().map(c => [c.x, c.y]), rooms: M.rooms.map(r => [r.label?.[0], r.label?.[1], r.name]), spawn: M.spawn };
const tmp = out + '.json';
writeFileSync(tmp, JSON.stringify(dump));
execFileSync('python3', ['-I', '-c', `
import json, base64, sys
from PIL import Image, ImageDraw
d = json.load(open(sys.argv[1])); im = Image.open(sys.argv[2]).convert('RGBA')
k, ox, oy, w, h, R = d['k'], d['ox'], d['oy'], d['w'], d['h'], d['RES']
walk = base64.b64decode(d['walk']); floor = base64.b64decode(d['floor']); sight = base64.b64decode(d['sight'])
ov = Image.new('RGBA', im.size, (0,0,0,0)); dr = ImageDraw.Draw(ov)
cs = k / R
for j in range(h):
  for i in range(w):
    n = j*w+i
    x0, y0 = (ox + i/R)*k, (oy + j/R)*k
    if walk[n]: dr.rectangle([x0, y0, x0+cs, y0+cs], fill=(0,255,0,70))
    elif floor[n]: dr.rectangle([x0, y0, x0+cs, y0+cs], fill=(255,255,0,60))
    elif sight[n]: dr.rectangle([x0, y0, x0+cs, y0+cs], fill=(0,160,255,70))
P = lambda x, y: (x*k, y*k)
for a,b,c,e in d['doors']: dr.rectangle([a*k,b*k,c*k,e*k], outline=(255,0,255,255), width=2)
for x,y,i in d['vents']: X,Y=P(x,y); dr.ellipse([X-5,Y-5,X+5,Y+5], fill=(255,60,60,255)); dr.text((X+5,Y-5), i, fill=(255,80,80,255))
for x,y,i in d['consoles']: X,Y=P(x,y); dr.rectangle([X-3,Y-3,X+3,Y+3], fill=(255,255,0,255)); dr.text((X+4,Y), i.split('_',1)[-1], fill=(255,255,255,255))
for x,y in d['sab']: X,Y=P(x,y); dr.rectangle([X-4,Y-4,X+4,Y+4], fill=(255,0,0,255))
for x,y,nm in d['rooms']:
  if x is not None: X,Y=P(x,y); dr.text((X-20,Y), nm, fill=(0,255,255,255))
X,Y=P(*d['spawn']); dr.ellipse([X-6,Y-6,X+6,Y+6], outline=(255,255,255,255), width=2)
Image.alpha_composite(im, ov).convert('RGB').save(sys.argv[3])
`, tmp, img, out]);
console.log('walk cells', M.walk.reduce((a, b) => a + b, 0), 'grid', M.w, 'x', M.h);
