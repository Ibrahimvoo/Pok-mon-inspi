# Traces the reactor / seismic hand scanner of the sabotage footage (1280×720 frames) into a polygon in the 640×360
# screen units of the task screens. The scan bar moves, so the hand masks of several frames are united.
# Usage: python3 -I tools/among/trace_hand.py frame1.png [frame2.png …] > out.json
import sys, json
import numpy as np, cv2
from PIL import Image
X0, Y0, X1, Y1 = 380, 140, 900, 640          # around the hand
acc = None
for f in sys.argv[1:]:
    a = np.array(Image.open(f).convert('RGB').crop((X0, Y0, X1, Y1))).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = ((r > 170) & (g < 150) & (b < 110) & (r - g > 90)) | ((r > 200) & (g > 200) & (b > 200))   # orange cells, white scan bar
    acc = m if acc is None else acc | m
m = acc.astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
def poly(mask):
    cs, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    c = cv2.approxPolyDP(max(cs, key=cv2.contourArea), 1.2, True)[:, 0, :]
    return [[round((x + X0) / 2, 1), round((y + Y0) / 2, 1)] for x, y in c]
# outer edge of the white rim (the white rim and the black outline inside it are drawn as bands along this edge)
print(json.dumps({'rim': poly(m)}))
