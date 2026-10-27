# Cuts the menu and lobby art (logo, button icons, card pictures, map logo, wardrobe) out of the reference
# screenshots supplied by the project owner (2532 x 1170 phone captures) and removes their backgrounds.
# Usage: python3 tools/among/cut_menu.py <main menu> <play> <online> <lobby> <host>   (writes public/among/ui/*.webp)
import sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).parent))
from cut_menu_lib import flood_key

OUT = Path(__file__).resolve().parents[2] / 'public/among/ui'
menu, play, online, lobby, host = (Image.open(p).convert('RGB') for p in sys.argv[1:6])

def teal(p):          # bright teal of the big buttons and its light diagonal stripes
    r, g, b = p[:3]; return g > 170 and b > 150 and r < 190 and g - r > 45
def darkteal(p):      # grey-teal of the small buttons
    r, g, b = p[:3]; return 50 < g < 150 and 40 < b < 140 and r < 110 and g - r > 25 and abs(g - b) < 30
def dark(p): return sum(p[:3]) < 150

def save(im, name, scale=1):
    if scale != 1: im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.save(OUT / f'{name}.webp', quality=90, method=6); print(name, im.size)

# the logo: white strokes over the teal wall -> white with the stroke brightness as alpha
logo = menu.crop((180, 140, 765, 300)).convert('L')
bg = 95
alpha = logo.point(lambda v: max(0, min(255, round((v - bg) * 255 / (235 - bg)))))
lg = Image.new('RGBA', logo.size, (255, 255, 255, 0)); lg.putalpha(alpha); save(lg, 'logo')

for name, box, key in [
    ('ic-play', (150, 355, 320, 482), teal), ('ic-inventory', (180, 482, 305, 605), teal), ('ic-store', (178, 608, 305, 730), teal),
    ('ic-news', (165, 762, 250, 840), darkteal), ('ic-account', (165, 850, 255, 930), darkteal), ('ic-settings', (165, 938, 250, 1015), darkteal),
]:
    save(flood_key(menu.crop(box), key), name)
# account badge of the top bar
save(menu.crop((214, 30, 286, 102)), 'ic-badge')

# card pictures (the label band is drawn by the page)
save(play.crop((1237, 402, 1678, 842)), 'card-local')
save(play.crop((1697, 402, 2138, 842)), 'card-online')
save(online.crop((1215, 370, 1620, 566)), 'card-create')
save(online.crop((1215, 664, 1620, 860)), 'card-code')
save(online.crop((1682, 370, 2168, 864)), 'card-find')

# lobby: map logo, wardrobe, top button faces, copy icon
save(flood_key(lobby.crop((1964, 396, 2340, 490)), lambda p: sum(p[:3]) < 170 and max(p[:3]) - min(p[:3]) < 30, False), 'logo-skeld')
save(flood_key(lobby.crop((2140, 925, 2315, 1110)), lambda p: sum(p[:3]) < 120 and max(p[:3]) - min(p[:3]) < 30, False), 'wardrobe')
save(lobby.crop((1970, 46, 2066, 136)), 'top-chat')
save(lobby.crop((2083, 46, 2179, 136)), 'top-gear')
save(lobby.crop((2249, 46, 2345, 136)), 'top-tablet')

# the round picture of the host screen (crewmate under the spotlight)
from PIL import ImageDraw
av = host.crop((762, 156, 1028, 422)).convert('RGBA')
mask = Image.new('L', (av.width * 4, av.height * 4), 0); ImageDraw.Draw(mask).ellipse((6, 6, av.width * 4 - 6, av.height * 4 - 6), fill=255)
av.putalpha(mask.resize(av.size, Image.LANCZOS)); save(av, 'host-avatar')

# the dropship reference image has a white page around the ship: make it transparent (the lobby shows space)
ship_path = OUT.parent / 'maps/dropship.webp'
ship = Image.open(ship_path).convert('RGB')
if ship.getpixel((2, ship.height // 2))[0] > 200:
    keyed = flood_key(ship, lambda p: min(p[:3]) > 222 and max(p[:3]) - min(p[:3]) < 22, False)
    keyed.save(ship_path, quality=92, method=6); print('dropship keyed', keyed.size)
