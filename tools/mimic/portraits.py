# Picks, for each ref, the frame with the largest clear face and saves a square portrait (fallback: centre crop).
import sys, json, subprocess, os, re, unicodedata
import numpy as np, cv2
SRC, V1, V2, OUT, PREV = sys.argv[1:6]
os.makedirs(OUT, exist_ok=True); os.makedirs(PREV, exist_ok=True)
front = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
alt = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt2.xml')
def slug(t):
    t = unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:40]
def frame(v, t):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.2f}', '-i', v, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(1280, 720, 3) if len(raw) == 1280 * 720 * 3 else None
# where the actual clip lives in each part of the compilations (the rest carries rankings and captions)
ZONES = {1: [(0, 58.5, (0, 600, 720, 1280)), (58.5, 64.6, (0, 200, 720, 1280)), (64.6, 78, (0, 160, 720, 780)), (78, 104.5, (230, 170, 720, 1000)),
             (104.5, 123.5, (0, 150, 720, 1280)), (123.5, 127, (0, 150, 720, 560)), (127, 143.6, (0, 380, 720, 1280))],
         2: [(0, 7.8, (0, 0, 720, 1280)), (7.8, 39.3, (0, 640, 720, 1280)), (39.3, 55.7, (0, 300, 720, 1280)), (55.7, 98.7, (260, 160, 720, 1280)),
             (98.7, 136.2, (0, 740, 720, 1280)), (136.2, 144, (0, 330, 720, 1080)), (144, 162, (0, 580, 720, 1280))]}
def zone(v, t):
    for a, b, z in ZONES[v]:
        if a <= t < b: return z
    return (0, 0, 720, 1280)
# where the actual clip lives in each part of the compilations (the rest carries rankings and captions)
ZONES = {1: [(0, 58.5, (0, 600, 720, 1280)), (58.5, 64.6, (0, 200, 720, 1280)), (64.6, 78, (0, 160, 720, 780)), (78, 104.5, (230, 170, 720, 1000)),
             (104.5, 123.5, (0, 150, 720, 1280)), (123.5, 127, (0, 150, 720, 560)), (127, 143.6, (0, 380, 720, 1280))],
         2: [(0, 7.8, (0, 0, 720, 1280)), (7.8, 39.3, (0, 640, 720, 1280)), (39.3, 55.7, (0, 300, 720, 1280)), (55.7, 98.7, (260, 160, 720, 1280)),
             (98.7, 136.2, (0, 740, 720, 1280)), (136.2, 144, (0, 330, 720, 1080)), (144, 162, (0, 580, 720, 1280))]}
def zone(v, t):
    for a, b, z in ZONES[v]:
        if a <= t < b: return z
    return (0, 0, 720, 1280)
for r in json.load(open(SRC)):
    rid = slug(r['title']); v = V1 if r['v'] == 1 else V2
    zx0, zy0, zx1, zy1 = zone(r['v'], (r['a'] + r['b']) / 2)
    zx0, zy0, zx1, zy1 = zone(r['v'], (r['a'] + r['b']) / 2)
    best = None
    for k in range(9):
        t = r['a'] + (r['b'] - r['a']) * (k + .5) / 9
        im = frame(v, t)
        if im is None: continue
        g = cv2.equalizeHist(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY))
        m = np.zeros_like(g); m[zy0:zy1, zx0:zx1] = 1; g = g * m
        m = np.zeros_like(g); m[zy0:zy1, zx0:zx1] = 1; g = g * m
        fs = list(front.detectMultiScale(g, 1.1, 6, minSize=(70, 70))) + list(alt.detectMultiScale(g, 1.1, 5, minSize=(70, 70)))
        for (x, y, w, h) in fs:
            sharp = cv2.Laplacian(g[y:y + h, x:x + w], cv2.CV_64F).var()
            score = w * h * (1 + min(sharp, 400) / 400)
            if not best or score > best[0]: best = (score, im, (x, y, w, h))
        if best is None and k == 4: mid = im
    if best:
        _, im, (x, y, w, h) = best
        cx, cy, s = x + w / 2, y + h / 2 + h * .08, max(w, h) * 1.75
    else:
        im = mid if 'mid' in dir() else frame(v, (r['a'] + r['b']) / 2)
        cx, cy, s = (zx0 + zx1) / 2, (zy0 + zy1) / 2, 520
    s = min(s, zx1 - zx0, zy1 - zy0)
    x0 = int(max(zx0, min(zx1 - s, cx - s / 2))); y0 = int(max(zy0, min(zy1 - s, cy - s / 2)))
    crop = cv2.resize(im[y0:y0 + int(s), x0:x0 + int(s)], (256, 256), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f'{OUT}/{rid}.webp', crop, [cv2.IMWRITE_WEBP_QUALITY, 82])
    cv2.imwrite(f'{PREV}/{rid}.jpg', cv2.resize(crop, (128, 128)))
    print(rid, 'face' if best else 'centre')
