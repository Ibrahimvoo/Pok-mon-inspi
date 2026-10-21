# Post-process renders: filmic bloom for colour images, soft blur for depth maps. Reads a JSON job list on stdin.
import sys, json
import numpy as np
from PIL import Image, ImageFilter

for j in json.load(sys.stdin):
    im = Image.open(j['src']).convert('RGB')
    if j.get('depth'):
        im.convert('L').filter(ImageFilter.GaussianBlur(2)).save(j['dst'], 'WEBP', quality=80, method=6)
        continue
    a = np.asarray(im).astype(np.float32) / 255
    lum = a @ np.array([.2126, .7152, .0722], np.float32)
    bright = Image.fromarray((a * np.clip((lum - .5) / .5, 0, 1)[..., None] * 255).astype(np.uint8))
    acc = np.zeros_like(a)
    for r, wt in ((im.width * .003, .5), (im.width * .011, .4), (im.width * .035, .35)):
        acc += np.asarray(bright.filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255 * wt
    out = 1 - (1 - a) * (1 - np.clip(acc * j.get('bloom', .7), 0, 1))
    Image.fromarray((np.clip(out, 0, 1) * 255 + .5).astype(np.uint8)).save(j['dst'], 'WEBP', quality=j.get('q', 84), method=6)
