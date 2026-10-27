# Cuts the game-settings art (role tabs, role pictures, preset cards, map banner and icons, the « ? » crewmate) and the
# « Personnaliser » button out of the reference phone captures (2532 x 1170) supplied by the project owner.
# Usage: python3 tools/among/cut_settings.py <uploads dir>   (writes public/among/ui/gs/*.webp and ui/customize.webp)
import sys
from pathlib import Path
from PIL import Image, ImageDraw
sys.path.insert(0, str(Path(__file__).parent))
from cut_menu_lib import flood_key, keep_largest

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parents[2] / 'public/among/ui/gs'
OUT.mkdir(parents=True, exist_ok=True)
shot = lambda name: Image.open(SRC / f'{name}-image.png').convert('RGB')
LOBBY, PRESETS, GAME, ROLES, ROLES2 = shot('39f62b38'), shot('e4e5837f'), shot('b8fdd80b'), shot('0b8bd1a9'), shot('f3ce0a68')
ROLE_SHOT = {'scientist': 'aaa4b1f7', 'guardianAngel': 'c148369c', 'engineer': 'e88c2d28', 'noisemaker': '3d4aaaf6', 'tracker': '8215ffff',
             'detective': 'f3ce0a68', 'judge': '85c0cc17', 'influencer': '7464659a', 'shapeshifter': 'edccb0c1', 'phantom': '7edbb42e', 'viper': '4a084ad2'}
# x of each role tab in the strip: [unselected source, x0] and the x0 in its own capture, where it is selected
TAB_X = {'scientist': (ROLES, 1110, 1110), 'guardianAngel': (ROLES, 1260, 1260), 'engineer': (ROLES, 1410, 1410), 'noisemaker': (ROLES, 1558, 1558),
         'tracker': (ROLES, 1708, 1708), 'detective': (ROLES, 1855, 1295), 'judge': (ROLES2, 1445, 1445), 'influencer': (ROLES2, 1592, 1592),
         'shapeshifter': (ROLES2, 1740, 1740), 'phantom': (ROLES2, 1888, 1888), 'viper': (ROLES2, 2038, 2038)}
dark = lambda p: sum(p[:3]) < 130 and max(p[:3]) - min(p[:3]) < 22

def save(im, name, folder=OUT):
    im.save(folder / f'{name}.webp', quality=90, method=6); print(name, im.size)

def tab(img, x0):
    # the close button sits right after the last tab: stop the crop before it
    return keep_largest(flood_key(img.crop((x0 - 8, 238, min(x0 + 150, 2180), 378)), dark, False))

for role, (src, x_off, x_on) in TAB_X.items():
    save(tab(src, x_off), f'tab-{role}')
    save(tab(shot(ROLE_SHOT[role]), x_on), f'tab-{role}-on')
    save(shot(ROLE_SHOT[role]).crop((972, 584, 1385, 842)), f'role-{role}')
save(tab(ROLES, 962), 'tab-all-on')
save(tab(shot('aaa4b1f7'), 962), 'tab-all')

save(PRESETS.crop((1074, 433, 1538, 947)), 'preset-classic')
save(PRESETS.crop((1608, 433, 2072, 947)), 'preset-roles')
save(GAME.crop((1110, 254, 2033, 358)), 'banner-skeld')

def disc(img, cx, cy, r=55):
    im = img.crop((cx - r, cy - r, cx + r, cy + r)).convert('RGBA')
    m = Image.new('L', (r * 8, r * 8), 0); ImageDraw.Draw(m).ellipse((4, 4, r * 8 - 4, r * 8 - 4), fill=255)
    im.putalpha(m.resize(im.size, Image.LANCZOS)); return im
MINT, GREY = (46, 231, 199), (76, 76, 76)
def recolor(im, test, rgb, ref):
    im = im.copy(); px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a and test(r, g, b): k = (r + g + b) / 3 / ref; px[x, y] = (*[min(255, round(c * k)) for c in rgb], a)
    return im
def unbadge(im):
    # the selection badge of the capture (top right): mirrored from the left side of the round icon; the page draws its own
    im = im.copy(); px = im.load(); w = im.width
    for y in range(im.height):
        for x in range(w):
            if (x - 97) ** 2 + (y - 13) ** 2 < 24 ** 2: px[x, y] = px[w - 1 - x, y]
    return im
is_mint = lambda r, g, b: g > 150 and b > 120 and g - r > 70
is_grey = lambda r, g, b: max(r, g, b) - min(r, g, b) < 10 and 60 < r < 95
for name, cx in [('skeld', 1386), ('mira', 1508), ('polus', 1631), ('airship', 1752), ('fungle', 1874)]:
    im = disc(GAME, cx, 424)
    if name == 'skeld':
        im = unbadge(im)
        save(im, 'map-skeld-on'); save(recolor(im, is_mint, GREY, 159), 'map-skeld')
    else:
        save(im, f'map-{name}'); save(recolor(im, is_grey, MINT, 76), f'map-{name}-on')

# the « ? » crewmate and the white frame of the help box, text area emptied (the page writes the text)
help_ = GAME.crop((332, 418, 880, 633)).copy()
ImageDraw.Draw(help_).rectangle((160, 14, 536, 200), fill=(0, 0, 0))
save(flood_key(help_, lambda p: 20 < sum(p[:3]) < 130 and max(p[:3]) - min(p[:3]) < 22, False), 'help')

save(flood_key(LOBBY.crop((2130, 925, 2325, 1110)), lambda p: sum(p[:3]) < 120 and max(p[:3]) - min(p[:3]) < 30, False), 'customize', OUT.parent)
