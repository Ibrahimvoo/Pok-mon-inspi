# 20.0 : ajoute les créatures (src/sprites.json) et les personnages (src/art.json) des Terres de Givre, depuis Tuxemon (CC BY-SA 4.0).
# Usage : python3 tools/v20sprites.py [chemin du dépôt Tuxemon]  (défaut : /home/user/tuxemon). Relancer ne duplique rien.
import sys, os, io, json, base64
from PIL import Image
TUX = sys.argv[1] if len(sys.argv) > 1 else '/home/user/tuxemon'
MOD = os.path.join(TUX, 'mods/tuxemon')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V20 = [('piaflocon', 'tweesher'), ('herongel', 'heronquak'), ('aiglacier', 'eaglace'), ('givrelin', 'chillimp'), ('yetimont', 'snowrilla'),
       ('cabrigel', 'caper'), ('cornegivre', 'crankus'), ('pinouce', 'conileaf'), ('sapigivre', 'conifrost'), ('louvigel', 'wolffsky'),
       ('vivacier', 'viviteel'), ('boreaserp', 'vivitrans'), ('stellagel', 'asudopt'), ('grelotin', 'nuenflu'), ('hivernel', 'primordia')]
PEOPLE = [('neva', 'christie_lapi', 'heroine_lapi'), ('borea', 'scientist_black', 'scientist_black'), ('fige', 'xerogrunt_white', 'xerogrunt'),
          ('gresil', 'dragonrider_blue', 'dragonrider_blue'), ('pingouin', 'penguin', 'penguin'), ('moine', 'monk_blue', 'monk_lapi')]
def sharp(im):
    im = im.copy(); px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]; px[x, y] = (r, g, b, 255) if a >= 128 else (0, 0, 0, 0)
    return im
def b64png(im):
    bf = io.BytesIO(); im.save(bf, 'PNG', optimize=True); return base64.b64encode(bf.getvalue()).decode()
def colors(im):
    px = [p[:3] for p in im.getdata() if p[3] and sum(p[:3]) > 60 and sum(p[:3]) < 720]
    q = Image.new('RGB', (len(px), 1)); q.putdata(px); q = q.quantize(6)
    pal = q.getpalette(); cnt = sorted(q.getcolors(), reverse=True); out = []
    for n, i in cnt:
        c = tuple(pal[i*3:i*3+3])
        if all(sum(abs(a-b) for a, b in zip(c, o)) > 90 for o in out): out.append(c)
        if len(out) == 3: break
    while len(out) < 3: out.append(out[-1] if out else (128, 128, 128))
    return ['#%02x%02x%02x' % c for c in out]
# --- créatures
path = os.path.join(ROOT, 'src/sprites.json'); mons = json.load(open(path)); cols = {}
for pid, tux in V20:
    sh = sharp(Image.open(os.path.join(MOD, 'gfx/sprites/battle', tux + '-sheet.png')).convert('RGBA')); f = sh.crop((0, 0, 64, 64))
    mons[pid] = {'f': b64png(f), 'b': b64png(sh.crop((64, 0, 128, 64))), 'i': b64png(sh.crop((0, 64, 48, 88))), 'src': tux}; cols[pid] = colors(f)
json.dump(mons, open(path, 'w'), separators=(',', ':'))
print(json.dumps(cols, separators=(',', ':')))
# --- personnages (feuille de marche 48x128 + sprite de combat 64x64)
p = os.path.join(ROOT, 'src/art.json'); art = json.load(open(p)); P = art['people']
dec = lambda s: Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
OW, BT = dec(P['ow']['img']), dec(P['bt']['img'])
add = [n for n in PEOPLE if n[0] not in P['keys']]
if add:
    n0 = len(P['keys']); OW2 = Image.new('RGBA', (48, 128 * (n0 + len(add)))); BT2 = Image.new('RGBA', (64, 64 * (n0 + len(add))))
    OW2.alpha_composite(OW, (0, 0)); BT2.alpha_composite(BT, (0, 0))
    for i, (k, ow, bt) in enumerate(add):
        OW2.alpha_composite(Image.open(os.path.join(MOD, 'sprites', ow + '.png')).convert('RGBA'), (0, 128 * (n0 + i)))
        b = Image.open(os.path.join(MOD, 'gfx/sprites/player', bt + '.png')).convert('RGBA')
        BT2.alpha_composite(b.crop((64, 0, 128, 64)) if b.size[0] >= 128 else b, (0, 64 * (n0 + i)))
        P['keys'].append(k); P['src'].append([ow, bt])
    P['ow']['img'] = b64png(OW2); P['bt']['img'] = b64png(BT2)
    json.dump(art, open(p, 'w'), separators=(',', ':'))
print(len(V20), 'créatures ;', len(add), 'personnages ajoutés ;', os.path.getsize(path) // 1024, 'Ko +', os.path.getsize(p) // 1024, 'Ko')
