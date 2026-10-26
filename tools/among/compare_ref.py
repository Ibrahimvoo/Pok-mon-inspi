# Compares the rendered base crewmate (ours.png, silhouette at the origin) with the crewmate of a reference
# screenshot: silhouette IoU and colour agreement per region. Usage: compare_ref.py ours.png ref.png x0 y0 x1 y1
import sys
import numpy as np, cv2
from PIL import Image
ours_p, ref_p, x0, y0, x1, y1 = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
ref = np.array(Image.open(ref_p).convert('RGB').crop((x0, y0, x1, y1))).astype(int)
lum = (ref[..., 0] * 299 + ref[..., 1] * 587 + ref[..., 2] * 114) // 1000
work = ((lum >= 34) * 255).astype(np.uint8); H, W = work.shape
mask = np.zeros((H + 2, W + 2), np.uint8)
for p in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1)]:
    if work[p[1], p[0]] == 255: cv2.floodFill(work, mask, p, 128)
sil = work != 128
ys, xs = np.where(sil)
sil = sil[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
refc = ref[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
o = np.array(Image.open(ours_p).convert('RGBA')).astype(int)
h, w = min(o.shape[0], sil.shape[0]), min(o.shape[1], sil.shape[1])
mo = o[:h, :w, 3] > 127; ms = sil[:h, :w]
iou = (mo & ms).sum() / (mo | ms).sum()
d = np.abs(o[:h, :w, :3] - refc[:h, :w]).sum(axis=2)
agree = (d[mo & ms] < 60).mean()
print(f'reference silhouette IoU {iou:.4f} · colour agreement {agree * 100:.1f} %')
print('FAIL' if iou < .985 or agree < .9 else 'reference match OK')
