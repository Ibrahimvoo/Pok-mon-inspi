# White outlines of the dropship's laptop and hat chest, shown when a player stands close enough to use them (the game
# outlines usable objects in white). The objects have black outlines: the floor around them is flood-filled away.
# Usage: python3 tools/among/cut_lobby_glow.py   (reads public/among/maps/dropship.webp, writes public/among/ui/glow-*.webp)
import json, sys
from pathlib import Path
from PIL import Image, ImageChops, ImageFilter
sys.path.insert(0, str(Path(__file__).parent))
from cut_menu_lib import flood_key

PUB = Path(__file__).resolve().parents[2] / 'public/among'
ship = Image.open(PUB / 'maps/dropship.webp').convert('RGB')
BOX = {'laptop': (437, 290, 516, 399), 'chest': (641, 314, 716, 383)}
info = {}
for name, (x0, y0, x1, y1) in BOX.items():
    floor = lambda p: sum(p[:3]) > 150 and max(p[:3]) - min(p[:3]) < 24          # the grey floor and walls, not the green crate
    obj = flood_key(ship.crop((x0, y0, x1, y1)), floor, False)
    mask = obj.getchannel('A').point(lambda v: 255 if v > 90 else 0)
    # holes inside the object (light parts the fill reached through a gap) belong to the object
    outside = flood_key(mask.convert('RGB'), lambda p: p[0] == 0, False).getchannel('A').point(lambda v: 255 if v > 90 else 0)
    mask = outside.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    ring = ImageChops.subtract(mask.filter(ImageFilter.MaxFilter(7)), mask).filter(ImageFilter.GaussianBlur(.7))
    out = Image.new('RGBA', mask.size, (255, 255, 255, 0)); out.putalpha(ring)
    out.save(PUB / f'ui/glow-{name}.webp', quality=92); info[name] = [x0, y0, x1 - x0, y1 - y0]
print(json.dumps(info))
