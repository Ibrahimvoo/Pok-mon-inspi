# Traces the crewmate of a reference screenshot (customisation screen, idle pose facing right) into vector shapes:
# colour segmentation → region masks → contours → src/among/art/crewmate-ref.js. Every player colour is then drawn
# from these same shapes, only the two body colours change.
# Usage: python3 -I tools/among/trace_crewmate.py reference.png x0 y0 x1 y1 out.js
import sys, json
import numpy as np, cv2
from PIL import Image

src, x0, y0, x1, y1, out = sys.argv[1], *map(int, sys.argv[2:6]), sys.argv[6]
im = np.array(Image.open(src).convert('RGB').crop((x0, y0, x1, y1))).astype(int)
H, W, _ = im.shape
r, g, b = im[..., 0], im[..., 1], im[..., 2]
lum = (r * 299 + g * 587 + b * 114) // 1000

# silhouette: everything the exterior flood fill does not reach through non-outline pixels
work = ((lum >= 34) * 255).astype(np.uint8)
mask = np.zeros((H + 2, W + 2), np.uint8)
for p in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1)]:
    if work[p[1], p[0]] == 255: cv2.floodFill(work, mask, p, 128)
sil = work != 128

main = (r > 150) & (g < 90) & (b < 110)
shadow = (r > 70) & (r <= 150) & (g < 45) & (b > 20) & (b < 110)
light = (b > 165) & (g > 150) & (r < 200)
hi = (r > 215) & (g > 215) & (b > 215)
mid = ~light & ~hi & (b > 85) & (g > 70) & (r < 140) & (b >= g - 10)
dark = lum < 34
ring = dark & (b > r + 4)
lab = np.zeros((H, W), np.uint8)
lab[sil] = 1
for k, m in [(3, shadow), (2, main), (6, mid), (5, light), (7, hi), (4, ring)]: lab[sil & m] = k

def clean(m, k=3):
    m = m.astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((k, k), np.uint8))
    return cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((k, k), np.uint8)).astype(bool)
def fill_holes(m):
    cs, _ = cv2.findContours(m.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    f = np.zeros(m.shape, np.uint8); cv2.drawContours(f, cs, -1, 1, -1); return f.astype(bool)
def disk(R): yy, xx = np.mgrid[-R:R + 1, -R:R + 1]; return ((xx ** 2 + yy ** 2) <= R * R).astype(np.uint8)
def near(m, R): return cv2.dilate(m.astype(np.uint8), disk(R)).astype(bool)

suit = clean(np.isin(lab, [2, 3]))
n, cc, stats, _ = cv2.connectedComponentsWithStats(suit.astype(np.uint8), 8)
comps = sorted(range(1, n), key=lambda i: -stats[i][4])
body_in = cc == comps[0]
pack_in = cc == comps[1]
if stats[comps[1]][0] > stats[comps[0]][0]: body_in, pack_in = pack_in, body_in
visor = fill_holes(clean(np.isin(lab, [4, 5, 6, 7])))
glass = fill_holes(clean(np.isin(lab, [5, 6, 7]) | (visor & (lab == 1) & ~near(~visor, 6))))
outline = lab == 1
body_sil = fill_holes(clean((outline & near(body_in | visor, 26)) | body_in | visor, 5))
pack_sil = fill_holes(clean((outline & near(pack_in, 26)) | pack_in, 5))

ys, xs = np.where(sil)
ox, oy = xs.min(), ys.min()
# legs: below the top of the crotch; the gap splits them
# find the gap between the two legs near the feet, then climb it up to the crotch
yb = int(np.where(body_in.any(axis=1))[0].max()) - 30
row = np.where(body_in[yb])[0]
breaks = np.where(np.diff(row) > 2)[0]
i = max(breaks, key=lambda k: row[k + 1] - row[k])
gap = (row[i] + row[i + 1]) / 2
crotch = yb
while crotch > 0 and not body_in[crotch - 1, int(gap)]: crotch -= 1
cut = crotch - 1

def poly(m, eps=.55):
    cs, _ = cv2.findContours(m.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    res = []
    for c in cs:
        if cv2.contourArea(c) < 30: continue
        pts = c[:, 0, :].astype(float)
        # light smoothing of the pixel staircase, then simplification
        k = 3
        pad = np.concatenate([pts[-k:], pts, pts[:k]])
        sm = np.array([pad[i:i + 2 * k + 1].mean(axis=0) for i in range(len(pts))])
        ap = cv2.approxPolyDP(sm.astype(np.float32).reshape(-1, 1, 2), eps, True)[:, 0, :]
        res.append([[round(float(x) - ox + .5, 1), round(float(y) - oy + .5, 1)] for x, y in ap])
    return res

# the body piece and the leg pieces overlap by a few rows so no seam shows where they meet
above = np.zeros((H, W), bool); above[:cut + 4] = True
above_in = np.zeros((H, W), bool); above_in[:cut + 6] = True   # the fill reaches a bit lower than its outline
below = np.zeros((H, W), bool); below[cut - 3:] = True
left = np.zeros((H, W), bool); left[:, :int(gap)] = True
shapes = {
    'packSil': poly(pack_sil), 'packIn': poly(pack_in), 'packLit': poly(near(clean(main & pack_in), 1) & pack_in),
    'bodySil': poly(body_sil & above), 'bodyIn': poly(body_in & above_in), 'bodyLit': poly(near(clean(main & body_in), 1)),
    'backLegSil': poly(body_sil & below & left), 'backLegIn': poly(body_in & below & left),
    'frontLegSil': poly(body_sil & below & ~left), 'frontLegIn': poly(body_in & below & ~left),
    'visor': poly(visor), 'glass': poly(near(glass, 1) & visor), 'glassShade': poly(near(clean(lab == 6), 1) & glass), 'shine': poly(near(clean(lab == 7), 1)),
}
med = lambda m: [int(v) for v in np.median(im[cv2.erode(m.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool)], axis=0)]
meta = {
    'size': [int(xs.max() - ox + 1), int(ys.max() - oy + 1)], 'cut': round(float(cut - oy + 1), 1), 'gap': round(float(gap - ox), 1),
    'feet': round(float(ys.max() - oy + 1), 1), 'center': round(float((np.where(body_in.any(axis=0))[0].min() + np.where(body_in.any(axis=0))[0].max()) / 2 - ox), 1),
    'colors': { 'outline': med(outline), 'main': med(main & sil), 'shadow': med(shadow & sil), 'ring': med(lab == 4), 'glass': med(lab == 5), 'glassShade': med(lab == 6), 'shine': med(lab == 7) },
    'source': 'customisation screenshot supplied by the project owner (idle pose, facing right)',
}
legbot = lambda m: int(np.where(m.any(axis=1))[0].max() - oy + 1)
meta['backLegBottom'] = legbot(body_sil & below & left); meta['frontLegBottom'] = legbot(body_sil & below & ~left)
with open(out, 'w') as f:
    f.write('// Generated by tools/among/trace_crewmate.py from the reference screenshot: do not edit by hand.\n')
    f.write('// Coordinates are reference pixels, origin at the top-left of the silhouette, crewmate facing right.\n')
    f.write('export const REF = ' + json.dumps(meta) + ';\n')
    f.write('export const SHAPES = ' + json.dumps(shapes, separators=(',', ':')) + ';\n')
print(json.dumps(meta))
print({k: [len(p) for p in v] for k, v in shapes.items()})
