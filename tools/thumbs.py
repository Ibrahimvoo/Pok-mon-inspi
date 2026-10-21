# Square tile crops (640x640) from each hero render, centred on the focus declared in src/data.js (thumb: 0..1).
import re, os
from PIL import Image
root = os.path.join(os.path.dirname(__file__), '..')
src = open(os.path.join(root, 'src/data.js'), encoding='utf8').read()
for gid, focus in re.findall(r"id: '([\w-]+)'.*?thumb: ([\d.]+)", src, re.S):
    p = os.path.join(root, 'public/art', gid + '.webp')
    if not os.path.exists(p): continue
    im = Image.open(p).convert('RGB'); w, h = im.size
    x = min(max(int(float(focus) * w - h / 2), 0), w - h)
    im.crop((x, 0, x + h, h)).resize((640, 640), Image.LANCZOS).save(p.replace('.webp', '-t.webp'), 'WEBP', quality=82, method=6)
    print(gid, focus)
