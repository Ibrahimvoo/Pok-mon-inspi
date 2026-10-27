# Cuts the wardrobe (« Vestiaire ») art out of the reference phone captures (2532 x 1170) supplied by the project owner:
# the tab icons, every item of the hats, skins, visors, pets and nameplates grids, the cosmicube card and cube, and the
# radial glow behind the preview. Items keep their transparency (the tile colour is keyed out).
# Usage: python3 tools/among/cut_wardrobe.py <uploads dir>   (writes public/among/ui/wd/*.webp and prints the item lists)
import sys, json
from pathlib import Path
import numpy as np, cv2
from PIL import Image, ImageDraw
sys.path.insert(0, str(Path(__file__).parent))
from cut_menu_lib import flood_key, keep_largest

SRC = Path(sys.argv[1]); OUT = Path(__file__).resolve().parents[2] / 'public/among/ui/wd'; OUT.mkdir(parents=True, exist_ok=True)
shot = lambda n: Image.open(SRC / f'{n}-image.png').convert('RGB')
CAP = {'color': '156479cb', 'hat': 'c4c948e5', 'skin': 'd0c5906f', 'visor': '1a05dbc7', 'pet': '3f17b464', 'plate': '0e2041f6', 'cube': '76212a8a'}
def save(im, name): im.save(OUT / f'{name}.webp', quality=90, method=6); return name

# the grids are regular: 5 columns of 165 px tiles, 180 px apart, rows 195 px apart (the 4th row is cut by the capture)
COLS = [199, 379, 559, 739, 919]; ROWS = [308, 503, 698, 893]; TILE = 165
TEAL, GREEN = (143, 180, 182), (136, 227, 158)

def item(img, x, y, n_rows_h):
    I = 9                                                  # inside the tile's own dark border
    h = min(TILE, n_rows_h - y)
    a = np.array(img.crop((x, y, x + TILE, y + h))).astype(int)
    tile_here = lambda p: min(abs(p - TEAL).max(), abs(p - GREEN).max(), abs(p - (96, 160, 112)).max(), abs(p - (160, 200, 196)).max()) < 40
    if not (tile_here(a[12, TILE // 2]) or tile_here(a[min(h - 20, TILE // 2), 6]) or tile_here(a[12, 12])): return None, False
    a = a[I:h - I, I:TILE - I]; hh, ww = a.shape[:2]
    # equipped: the check badge in the top right corner
    tr = a[:40, -50:]
    eq = bool((((tr[..., 1] > 190) & (tr[..., 0] < 150)) | (tr.min(2) > 235)).sum() > 40)
    # background of each row (the tiles darken towards the bottom of the list): sampled at both inner edges
    refs = [(a[j, 2], a[j, -3]) for j in range(hh)]
    def is_bg(j, i):
        p = a[j, i]
        return any(np.abs(p - r).max() < 16 for r in refs[j]) or (eq and p.min() > 225)
    seen = np.zeros((hh, ww), bool); bgm = np.zeros((hh, ww), bool)
    from collections import deque
    q = deque([(j, i) for j in range(hh) for i in (0, ww - 1)] + [(j, i) for i in range(ww) for j in (0, hh - 1)])
    while q:
        j, i = q.popleft()
        if j < 0 or i < 0 or j >= hh or i >= ww or seen[j, i]: continue
        seen[j, i] = True
        if not is_bg(j, i): continue
        bgm[j, i] = True
        q.extend([(j + 1, i), (j - 1, i), (j, i + 1), (j, i - 1)])
    # tile colour enclosed by the item (the inside of the headphones' band): keyed too when it is a real area
    near = np.zeros((hh, ww), bool)
    for j in range(hh): near[j] = (np.abs(a[j] - refs[j][0]).max(1) < 28) | (np.abs(a[j] - refs[j][1]).max(1) < 28) | (np.abs(a[j] - np.array(TEAL)).max(1) < 10)
    n, cc, st, _ = cv2.connectedComponentsWithStats((near & ~bgm).astype(np.uint8), 4)
    for k in range(1, n):
        if st[k][4] > 250: bgm |= cc == k
    rgba = np.dstack([a, np.where(bgm, 0, 255)]).astype(np.uint8)
    if eq:
        rgba[:12, :, 3] = 0; rgba[-26:, :, 3] = 0; rgba[:, :12, 3] = 0; rgba[:, -12:, 3] = 0
        yy, xx = np.mgrid[:hh, :ww]; rgba[(xx - (ww - 12)) ** 2 + (yy - 12) ** 2 < 42 ** 2, 3] = 0
    al = cv2.morphologyEx(rgba[..., 3], cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    # drop specks and the tile's shading line: keep the pieces of a real size (some items have two, like eyebrows)
    n, cc, st, _ = cv2.connectedComponentsWithStats((al > 0).astype(np.uint8), 8)
    if n < 2: return None, eq
    big = st[1:, 4].max()
    keep = np.zeros_like(al)
    for k in range(1, n):
        x0, y0, w0, h0, A = st[k]
        if A >= .08 * big and h0 > 6 and w0 > 6: keep[cc == k] = 255
    rgba[..., 3] = np.minimum(al, keep)
    if (rgba[..., 3] > 0).mean() > .93: return None, eq
    im = Image.fromarray(rgba)
    bb = im.getbbox()
    if not bb: return None, eq
    return im.crop(bb), eq

lists = {}; equipped = {}
for cat in ['hat', 'skin', 'visor', 'pet']:
    img = shot(CAP[cat]); names = []; first = True
    for y in ROWS:
        for x in COLS:
            if first: first = False; continue             # the first tile is « none »
            it, eq = item(img, x, y, 1050)
            if it is None or it.width < 20: continue
            if (cat, y, x) == ('hat', 503, 739): continue        # leaf ears: same colours as the tile, cannot be cut cleanly
            names.append(save(it, f'{cat}-{len(names) + 1:02d}'))
            if eq: equipped[cat] = names[-1]
    lists[cat] = names

# nameplates: wide tiles in two columns
img = shot(CAP['plate']); a = np.array(img).astype(int); plates = []
for (x0, y0, x1, y1) in [(203, 344, 600, 432), (672, 344, 1068, 432), (203, 500, 600, 588), (672, 500, 1068, 588), (203, 656, 600, 744), (672, 656, 1068, 744)]:
    plates.append(save(img.crop((x0, y0, x1, y1)), f'plate-{len(plates) + 1:02d}'))
lists['plate'] = plates
# the check badge drawn over the equipped plate (green, 3rd): its corner is replaced by the same diamonds further left
# (the pattern repeats every period px along the plate)
pa = np.array(Image.open(OUT / 'plate-03.webp').convert('RGB'))
w = pa.shape[1]; row = pa[pa.shape[0] // 2, :, 1].astype(float)
period = max(range(30, 120), key=lambda d: -np.abs(row[d:w // 2 + d] - row[:w // 2]).mean())
k = (70 // period + 1) * period
pa[:, w - 70:] = pa[:, w - 70 - k:w - k]
Image.fromarray(pa).save(OUT / 'plate-03.webp', quality=90)
# tab icons (top bar), unselected look: keyed on the bar colour
img = shot(CAP['color'])
bar = lambda p: max(abs(p[0] - 178), abs(p[1] - 194), abs(p[2] - 210)) < 22 or (abs(p[0] - p[2]) < 30 and 150 < p[0] < 215 and p[2] > p[0])
tabs = []
for k, cx in enumerate([538, 690, 836, 985, 1133, 1283, 1433]):
    src = shot(CAP['hat']) if k == 0 else img      # the colours tab is selected (teal box) in its own capture
    t = flood_key(src.crop((cx - 72, 6, cx + 72, 118)), bar, False)
    tabs.append(save(t.crop(t.getbbox()), f'tab-{k}'))
# cosmicube card and cube
cube = shot(CAP['cube'])
save(cube.crop((200, 334, 1072, 670)), 'cube-card')
c = flood_key(cube.crop((1720, 400, 2110, 890)), lambda p: sum(p[:3]) < 150 and max(p[:3]) - min(p[:3]) < 30, False)
save(c.crop(c.getbbox()), 'cube')
print(json.dumps(lists)); print('equipped', equipped)
