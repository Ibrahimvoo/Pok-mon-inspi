# Traces the 12-frame walk cycle of the crewmate from the screen recording supplied by the project owner (a pink
# crewmate with a cherry hat walking on the Skeld, 120 fps capture of a 24 fps animation, camera following the player).
#
# How the frames were found (see the notes at SLOTS): every video frame was anchored on the shadow (the player's
# position), the poses were clustered, and their order fitted against time: pose k shows at
# floor(video_frame * 24 / 120 + 0.6) mod 12, for left and right facing alike (left ones are mirrored).
# For each of the 12 slots, the frames that show it are aligned and averaged (less compression noise), then traced:
# suit (lit and shaded parts), visor (glass, glass shade, shine) and a silhouette of even outline thickness. The cherry
# hat is ignored and the dome under it rebuilt from the convex hull of the head.
# Output: src/among/art/walk-ref.js, in the coordinates of crewmate-ref.js (facing right, feet on y = REF.feet).
# Usage: python3 -I tools/among/trace_walk_video.py <video.mov>
import sys, json, subprocess, tempfile
from pathlib import Path
import numpy as np, cv2
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
video = sys.argv[1]
ref_src = (ROOT / 'src/among/art/crewmate-ref.js').read_text()
REF = json.loads(ref_src.split('export const REF = ')[1].split(';\n')[0])
SHAPES = json.loads(ref_src.split('export const SHAPES = ')[1].split(';\n')[0])

# video frames (0-based, 120 fps) showing each animation frame, with their facing (L = mirrored)
SLOTS = [
    [(122, 'R'), (362, 'R'), (3, 'R'), (182, 'L'), (302, 'L')],
    [(66, 'R'), (250, 'R'), (426, 'L'), (10, 'R'), (130, 'R'), (310, 'L')],
    [(74, 'R'), (434, 'L'), (190, 'L'), (370, 'R')],
    [(18, 'R'), (142, 'R'), (378, 'R'), (198, 'L'), (318, 'L')],
    [(82, 'R'), (263, 'R'), (440, 'L')],
    [(27, 'R'), (386, 'R'), (207, 'L'), (329, 'L'), (448, 'L')],
    [(91, 'R'), (270, 'R'), (154, 'R'), (394, 'R'), (215, 'R')],
    [(40, 'R'), (279, 'R'), (458, 'R'), (99, 'R')],
    [(162, 'R'), (222, 'R'), (339, 'L')],
    [(106, 'R'), (346, 'R'), (466, 'R'), (287, 'L')],
    [(50, 'R'), (230, 'R'), (114, 'R'), (354, 'R'), (474, 'R'), (172, 'L'), (410, 'L')],
    [(58, 'R'), (238, 'R'), (418, 'L')],
]
UP = 4                                      # tracing resolution (video pixels × UP)
W0, H0 = 260, 330                           # crop around the shadow: 130 px each side, 300 above, 30 below

def classes(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    red = (r > 110) & (g < 85) & (b < 95) & (r > 1.6 * b)
    suit = (r > 85) & (b > 60) & (r - g > 45) & ~red
    lit = suit & (r - b > 28)
    glassy = (b > r + 12) & (b > 70) & (g > 55) & ~suit
    shine = (r > 205) & (g > 205) & (b > 205)
    return red, suit, lit, glassy, shine

def anchor(a):
    """the suit and the centre of the shadow under it"""
    red, suit, *_ = classes(a)
    n, cc, st, _ = cv2.connectedComponentsWithStats(suit.astype(np.uint8), 8)
    k = 1 + np.argsort(-st[1:, 4]); x, y, w, h = st[k[0]][:4]
    keep = np.zeros(suit.shape, bool)
    for j in k:
        X, Y, Wd, Ht, A = st[j]
        if A > 80 and X < x + w + 60 and X + Wd > x - 60 and Y < y + h + 80 and Y + Ht > y - 20: keep |= cc == j
    ys, xs = np.where(keep); bot = ys.max()
    mx, mn = a.max(2), a.min(2)
    sh = (mx < 78) & (mx > 33) & (mx - mn < 15)
    band = np.zeros_like(sh); band[max(0, bot - 50):bot + 70, max(0, xs.min() - 40):xs.max() + 40] = True
    sh &= band & ~cv2.dilate(keep.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
    cnt = sh.sum(1); cy = int(np.argmax(cnt))
    rows = [r for r in range(cy - 3, cy + 4) if cnt[r] > cnt[cy] * .6]
    ext = [(np.where(sh[r])[0].min(), np.where(sh[r])[0].max()) for r in rows]
    cx = (np.median([e[0] for e in ext]) + np.median([e[1] for e in ext])) / 2
    return cx, cy

tmp = Path(tempfile.mkdtemp())
subprocess.run(['ffmpeg', '-v', 'error', '-t', '4', '-i', video, str(tmp / 'f%04d.png')], check=True)

def crop(i, side):
    a = np.array(Image.open(tmp / f'f{i + 1:04d}.png').convert('RGB')).astype(np.float32)
    cx, cy = anchor(a.astype(int))
    # sub-pixel crop around the shadow centre, upscaled
    M = np.float32([[UP, 0, -(cx - W0 / 2) * UP], [0, UP, -(cy - 300) * UP]])
    out = cv2.warpAffine(a, M, (W0 * UP, H0 * UP), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return out[:, ::-1] if side == 'L' else out

def averaged(slot):
    imgs = [crop(i, s) for i, s in slot]
    base = imgs[0]; m0 = classes(base.astype(int))[1].astype(np.float32)
    acc = [base]
    for im in imgs[1:]:
        m = classes(im.astype(int))[1].astype(np.float32)
        best = (-1, 0, 0)
        for dy in range(-12, 13, 2):
            for dx in range(-12, 13, 2):
                s = (np.roll(np.roll(m, dy, 0), dx, 1) * m0).sum()
                if s > best[0]: best = (s, dx, dy)
        acc.append(np.roll(np.roll(im, best[2], 0), best[1], 1))
    return np.median(np.stack(acc), axis=0)

disk = lambda R: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * R + 1, 2 * R + 1))
def clean(m, k=2):
    m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_OPEN, disk(k))
    return cv2.morphologyEx(m, cv2.MORPH_CLOSE, disk(k)).astype(bool)

S = None                                     # reference units per traced pixel (set from frame 1 below)
def to_ref(x, y):
    return [round(REF['center'] + (x - W0 * UP / 2) * S, 1), round(REF['feet'] + (y - 300 * UP) * S, 1)]

def polys(mask, min_area=60 * UP, eps=1.1 * UP):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        p = c[:, 0, :].astype(np.float32); k = 3
        pad = np.concatenate([p[-k:], p, p[:k]]); sm = np.array([pad[j:j + 2 * k + 1].mean(axis=0) for j in range(len(p))], np.float32)
        ap = cv2.approxPolyDP(sm.reshape(-1, 1, 2), eps, True)[:, 0, :]
        out.append([to_ref(x, y) for x, y in ap])
    return out

masks = []
for n, slot in enumerate(SLOTS):
    a = averaged(slot); ai = np.clip(a, 0, 255).astype(int)
    red, suit, lit, glassy, shine = classes(ai)
    suit = clean(suit); lit = clean(lit & suit, 3)
    # the character only: suit components close to the biggest one
    nc, cc, st, _ = cv2.connectedComponentsWithStats(suit.astype(np.uint8), 8)
    k = 1 + np.argsort(-st[1:, 4]); x, y, w, h = st[k[0]][:4]
    body = cc == k[0]
    keep = np.zeros_like(suit)
    for j in k:
        X, Y, Wd, Ht, A = st[j]
        if A > 300 * UP and X < x + w + 50 * UP and X + Wd > x - 50 * UP and Y < y + h + 60 * UP: keep |= cc == j
    suit = keep; lit &= suit
    # the visor: the glass blob inside the body's box
    glassy = clean(glassy | (shine & cv2.dilate(glassy.astype(np.uint8), disk(3 * UP)).astype(bool)), 2)
    gv = np.zeros_like(glassy); gv[y:y + h, x:x + w + 20 * UP] = glassy[y:y + h, x:x + w + 20 * UP]
    nv, cv_, sv, _ = cv2.connectedComponentsWithStats(gv.astype(np.uint8), 8)
    visor = cv_ == 1 + int(np.argmax(sv[1:, 4]))
    visor = cv2.morphologyEx(visor.astype(np.uint8), cv2.MORPH_CLOSE, disk(4 * UP)).astype(bool)
    # rebuild the dome under the cherry: convex hull of the head (suit + visor above the visor's middle)
    vy = np.where(visor.any(1))[0]; vmid = (vy.min() + vy.max()) // 2
    head = (body | visor).copy(); head[vmid:] = False
    hull = cv2.convexHull(np.argwhere(head)[:, ::-1].astype(np.int32))
    hm = np.zeros(head.shape, np.uint8); cv2.fillPoly(hm, [hull], 1)
    added = hm.astype(bool) & ~(suit | visor)
    # the added pixels take the colour of the nearest suit pixel (lit front / shaded back)
    if added.any():
        _, lab = cv2.distanceTransformWithLabels((~(suit & ~added)).astype(np.uint8), cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL)
        sy, sx = np.where(suit & ~added); litv = lit[sy, sx]
        idx = np.zeros(lab.max() + 1, bool)
        L = lab[sy, sx]; idx[L] = litv
        lit |= added & idx[lab]
        suit |= added
    # the lit part is one smooth area in the game (the video's compression leaves speckles)
    lit = clean(lit & suit, 6 * UP // 2)
    lit = cv2.morphologyEx(lit.astype(np.uint8), cv2.MORPH_CLOSE, disk(4 * UP)).astype(bool) & suit
    # glass shade / shine inside the visor
    v = ai
    gshade = visor & ((v[..., 1] < 150) | (v[..., 2] < 160)) & ~shine
    gshade = clean(gshade, 3 * UP // 2)
    sh = clean(visor & shine, UP)
    masks.append((suit, lit, visor, gshade, sh))

# scale: a frame with both feet on the ground (frame 1, legs passing) is as tall as the idle base, outline included
suit1, _, visor1, _, _ = masks[1]
top = np.where((suit1 | visor1).any(1))[0].min()
S = (REF['feet'] - 19.5) / (300 * UP - top)
T = int(round(19.5 / S))
frames = []
for n, (suit, lit, visor, gshade, sh) in enumerate(masks):
    sil = cv2.morphologyEx(cv2.dilate((suit | visor).astype(np.uint8), disk(T)), cv2.MORPH_CLOSE, disk(T))
    ring = cv2.dilate(visor.astype(np.uint8), disk(int(round(14.5 / S))))
    frames.append({
        'sil': polys(sil), 'shade': polys(suit), 'lit': polys(lit, eps=1.6 * UP),
        'ring': polys(ring), 'glass': polys(visor), 'glassShade': polys(gshade, 20 * UP, 1.6 * UP), 'shine': polys(sh, 10 * UP),
    })
    print('frame', n, {k: len(v) for k, v in frames[-1].items()}, 'scale', round(S, 4))

js = ('// Generated by tools/among/trace_walk_video.py from the walk of the screen recording supplied by the project owner:\n'
      '// do not edit. 12 frames at 24 fps; shapes in crewmate-ref.js coordinates (facing right, feet on y = REF.feet).\n'
      '// Each frame: silhouette (outline colour), suit (shade), lit part, visor ring, glass, glass shade, shine.\n'
      f'export const WALK = {json.dumps({"fps": 24, "frames": frames}, separators=(",", ":"))};\n')
(ROOT / 'src/among/art/walk-ref.js').write_text(js)
print('written', len(js) // 1024, 'KB')
