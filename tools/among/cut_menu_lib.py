# Background removal shared by the art cutting scripts.
from collections import deque
from PIL import Image, ImageFilter


def flood_key(im, is_bg, edges=True):
    """transparent background: flood fill from the borders through the pixels is_bg accepts (the art has dark outlines)"""
    im = im.convert('RGBA'); w, h = im.size; px = im.load()
    seen = bytearray(w * h); q = deque()
    for x in range(w): q.extend([(x, 0), (x, h - 1)])
    for y in range(h): q.extend([(0, y), (w - 1, y)])
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or seen[y * w + x]: continue
        seen[y * w + x] = 1
        if not is_bg(px[x, y]): continue
        px[x, y] = (0, 0, 0, 0)
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    # rows of the button border caught by the crop: clear the lines that are opaque across the whole width
    for y in [*range(8), *range(h - 8, h)] if edges else []:
        if sum(px[x, y][3] > 0 for x in range(w)) > w * .8:
            for x in range(w): px[x, y] = (0, 0, 0, 0)
    # soften the cut edge by one pixel
    a = im.getchannel('A').filter(ImageFilter.GaussianBlur(.6)); im.putalpha(Image.eval(a, lambda v: min(255, v * 1.6)))
    return im


def keep_largest(im):
    """only the biggest opaque shape stays (drops the edges of neighbouring buttons caught by a crop)"""
    w, h = im.size; a = im.getchannel('A').load(); seen = bytearray(w * h); best = []
    for y0 in range(h):
        for x0 in range(w):
            if seen[y0 * w + x0] or a[x0, y0] < 40: continue
            comp, q = [], deque([(x0, y0)]); seen[y0 * w + x0] = 1
            while q:
                x, y = q.popleft(); comp.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and a[nx, ny] >= 40:
                        seen[ny * w + nx] = 1; q.append((nx, ny))
            if len(comp) > len(best): best = comp
    keep = Image.new('L', im.size, 0); k = keep.load()
    for x, y in best: k[x, y] = 255
    keep = keep.filter(ImageFilter.MaxFilter(3))
    out = im.copy(); out.putalpha(Image.composite(im.getchannel('A'), Image.new('L', im.size, 0), keep)); return out
