# Génère src/art.json et src/sprites.json à partir des graphismes libres du projet Tuxemon (voir CREDITS.md) :
#   tiles  : tuiles 16x16 (sol, chemins, rives, falaises, intérieurs) et décors (arbres, bâtiments, mobilier)
#   people : 32 personnages = feuille de marche 16x32 (4 directions x 3 images) + sprite de combat 64x64
#   props  : quelques anciens objets dessinés à la main encore utilisés par le jeu (fragments, sablier...)
#   bg     : fonds de combat (avec version de nuit)
#   sprites.json : les 25 créatures (face, dos et icônes de menu)
# Usage : python3 tools/tuxatlas.py [chemin du dépôt Tuxemon]   (défaut : /home/user/tuxemon/tuxemon)
import sys, os, io, json, base64, zlib, struct, colorsys
import xml.etree.ElementTree as ET
from PIL import Image

TUX = sys.argv[1] if len(sys.argv) > 1 else '/home/user/tuxemon/tuxemon'
MOD = os.path.join(TUX, 'mods/tuxemon')
TSD = os.path.join(MOD, 'gfx/tilesets')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_cache = {}
def sheet(name):
    if name not in _cache:
        _cache[name] = Image.open(os.path.join(TSD, name)).convert('RGBA')
    return _cache[name]
COLS = {'core_outdoor.png': 37, 'core_outdoor_nature.png': 64, 'core_city_and_country.png': 40,
        'core_set pieces.png': 31, 'core_indoor_floors.png': 46, 'core_indoor_walls.png': 46}
CO, NA, CC, SP, IF, IW = 'core_outdoor.png', 'core_outdoor_nature.png', 'core_city_and_country.png', 'core_set pieces.png', 'core_indoor_floors.png', 'core_indoor_walls.png'

def tid(ts, i):
    c = COLS[ts]; x, y = (i % c) * 16, (i // c) * 16
    return sheet(ts).crop((x, y, x + 16, y + 16))
def reg(ts, col, row, w=1, h=1):
    return sheet(ts).crop((col * 16, row * 16, (col + w) * 16, (row + h) * 16))
def stack(*ims):  # empile verticalement des images de même largeur
    w = ims[0].width; out = Image.new('RGBA', (w, sum(i.height for i in ims)))
    y = 0
    for i in ims: out.alpha_composite(i, (0, y)); y += i.height
    return out
def over(*ims):  # superpose des images de même taille
    out = ims[0].copy()
    for i in ims[1:]: out.alpha_composite(i)
    return out
def recolor(im, hue=None, sat=1.0, val=1.0, hshift=0.0):
    out = im.copy(); px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if not a: continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            h = hue if hue is not None else (h + hshift) % 1
            r2, g2, b2 = colorsys.hsv_to_rgb(h, min(1, s * sat), min(1, v * val))
            px[x, y] = (round(r2 * 255), round(g2 * 255), round(b2 * 255), a)
    return out

T = {}  # nom -> image

# ---------------------------------------------------------------- sol extérieur
T['g'] = tid(CO, 111)
for k, i in dict(P_in=154, P_U=191, P_D=117, P_L=155, P_R=153, P_nUL=192, P_nUR=190, P_nDL=118, P_nDR=116,
                 P_iUL=228, P_iUR=229, P_iDL=265, P_iDR=266,
                 S_U=646, S_D=572, S_L=610, S_R=608, S_nUL=647, S_nUR=645, S_nDL=573, S_nDR=571,
                 S_iUL=793, S_iUR=794, S_iDL=830, S_iDR=831, W0=1269, W1=1270, W2=1271, tg=1246,
                 LV0=1970, LV1=2004, LV2=2005, dirt=127, stone=135, cf=2047, cf2=2084, boulder=1139).items():
    T[k] = tid(CO, i)
for n, base in enumerate([1482, 1519, 1556, 1630, 1667, 1741, 1778]):
    for f in range(5): T[f'fl{n}_{f}'] = tid(CO, base + f)
# hautes herbes « sèches » (grottes, volcan) : recoloration de l'herbe haute
T['tgv'] = recolor(T['tg'], hshift=-0.10, sat=.45, val=.70)
T['tgr'] = recolor(T['tg'], hshift=-0.20, sat=.55, val=.70)

# ---------------------------------------------------------------- falaises (grottes, volcan, ruines)
CW = dict(in_=856, face=896, faceL=895, faceR=897, endL=935, endR=936, rD=816, rR=855, rL=857, rcDR=815, rcDL=817, riDL=975, riDR=976)
for k, i in CW.items():
    im = tid(CC, i)
    T['C_' + k] = im                                   # brun (mine, grotte)
    T['V_' + k] = recolor(im, hshift=-0.035, sat=1.25, val=.92)   # volcan, plus rouge
    T['R_' + k] = recolor(im, sat=.18, val=1.08)        # ruines, pierre grise
T['hole'] = reg(CC, 11, 25, 3, 2)
T['caveDoor'] = tid(CC, 487)
T['gate'] = reg(CC, 4, 31, 4, 3)
T['stoneStatue'] = reg(CC, 8, 30, 2, 4)

# ---------------------------------------------------------------- ponton (planches verticales) + version horizontale
T['pierV'] = tid(CC, 286); T['pierT'] = tid(CC, 246); T['pierB'] = tid(CC, 326)
T['pierEL'] = tid(CC, 285); T['pierER'] = tid(CC, 287)
T['pierH'] = T['pierV'].rotate(90, expand=True); T['pierHL'] = T['pierT'].rotate(90, expand=True); T['pierHR'] = T['pierB'].rotate(90, expand=True)
T['pierEU'] = T['pierEL'].rotate(-90, expand=True); T['pierED'] = T['pierER'].rotate(-90, expand=True)

# ---------------------------------------------------------------- végétation et rochers
TREES = dict(tP1=(44, 0), tP2=(46, 0), tR1=(48, 0), tR2=(50, 0), tT1=(44, 4), tT2=(46, 4), tA1=(48, 4), tA2=(50, 4))
for k, (c, r) in TREES.items(): T[k] = reg(NA, c, r, 2, 3)
T['tS1'] = reg(NA, 52, 0, 1, 2); T['tS2'] = reg(NA, 52, 2, 1, 2); T['tS3'] = reg(NA, 52, 4, 1, 2); T['tS4'] = reg(NA, 52, 6, 1, 2)
T['rockS'] = reg(NA, 40, 0); T['rockS2'] = reg(NA, 41, 0); T['rockM'] = reg(NA, 42, 0); T['rockM2'] = reg(NA, 43, 0)
T['rockB'] = reg(NA, 42, 2, 2, 2); T['rockG'] = reg(NA, 42, 6, 2, 2); T['rockGS'] = reg(NA, 42, 4)
T['stump'] = reg(NA, 53, 2); T['logH'] = reg(NA, 54, 0, 3, 1)

# ---------------------------------------------------------------- mobilier urbain
T['signW'] = tid(SP, 199); T['signM'] = tid(SP, 198)
T['lamp'] = stack(tid(SP, 1093), tid(SP, 1124), tid(SP, 1155))
T['statue'] = reg(SP, 6, 34, 1, 2)
T['bush'] = tid(SP, 102); T['potPlant'] = tid(SP, 133)
T['crate'] = tid(SP, 1054); T['crate2'] = tid(SP, 1085); T['vase'] = tid(SP, 1061)
T['torch'] = reg(SP, 11, 26, 1, 1)

# ---------------------------------------------------------------- intérieurs
def wallface(top, mid, bot):  # mur de 3 tuiles compressé en 1 tuile : moulure haute + plinthe
    a, b, c = tid(IW, top), tid(IW, mid), tid(IW, bot)
    out = b.copy(); out.alpha_composite(a.crop((0, 0, 16, 5)), (0, 0)); out.alpha_composite(c.crop((0, 9, 16, 16)), (0, 9))
    return out
T['wallLab'] = wallface(1098, 1144, 1190)
T['wallMint'] = wallface(961, 1007, 1053)
T['wallGrey'] = wallface(960, 1006, 1052)
T['wallLab2'] = stack(tid(IW, 1098), tid(IW, 1144), tid(IW, 1190))
T['flLab'] = tid(IF, 57); T['flStone'] = tid(IF, 388); T['flStone2'] = tid(IF, 389); T['flStone3'] = tid(IF, 434)
T['flWater'] = tid(IF, 58); T['flWater2'] = tid(IF, 12); T['flTech'] = tid(IF, 699); T['flTech2'] = tid(IF, 657)
T['flWood'] = tid(IF, 1169)
for k, i in dict(rugUL=305, rugU=306, rugUR=307, rugL=351, rugC=352, rugR=353, rugDL=397, rugD=398, rugDR=399).items(): T[k] = tid(IF, i)
for k, i in dict(rugUL=305, rugU=306, rugUR=307, rugL=351, rugC=352, rugR=353, rugDL=397, rugD=398, rugDR=399).items(): T['r' + k] = recolor(tid(IF, i), hshift=0.62, sat=1.1, val=.95)
for k, i in dict(bugUL=578, bugU=579, bugUR=580, bugL=624, bugC=625, bugR=626, bugDL=670, bugD=671, bugDR=672).items(): T[k] = tid(IF, i)
T['shelf0'] = reg(SP, 0, 29, 1, 2); T['shelf1'] = reg(SP, 1, 29, 1, 2); T['shelf2'] = reg(SP, 2, 29, 1, 2); T['shelf3'] = reg(SP, 3, 29, 1, 2)
T['pc'] = stack(tid(SP, 10), tid(SP, 41))      # bureau + ordinateur (gauche)
T['pc2'] = stack(tid(SP, 11), tid(SP, 42))
T['tableL'] = stack(tid(SP, 175), tid(SP, 206)); T['tableR'] = stack(tid(SP, 176), tid(SP, 207))
T['counterL'] = tid(SP, 324); T['counterM'] = tid(SP, 202); T['counterR'] = tid(SP, 326)
T['machine'] = stack(tid(SP, 273 - 31), tid(SP, 273)); T['machine2'] = stack(tid(SP, 274 - 31), tid(SP, 274))
T['plant'] = tid(SP, 951); T['plant2'] = tid(SP, 920); T['trash'] = tid(SP, 254)
T['sofaL'] = tid(SP, 1226); T['sofaM'] = tid(SP, 1227); T['sofaR'] = tid(SP, 1228)
T['poster'] = tid(SP, 414); T['stool'] = tid(SP, 79)
T['pipeV'] = reg(SP, 10, 7, 3, 3)
# maison du héros
IS = 'core_indoor_stairs.png'; COLS[IS] = 45
T['bed'] = reg(SP, 10, 3, 1, 2); T['bedR'] = reg(SP, 6, 14, 1, 2); T['nightLamp'] = reg(SP, 8, 3, 1, 2); T['plantPot'] = reg(SP, 9, 3, 1, 2)
T['dresser'] = reg(SP, 0, 5, 1, 2); T['oldPc'] = reg(SP, 1, 5, 2, 2); T['tv'] = reg(SP, 14, 0, 3, 2); T['fridge'] = reg(SP, 5, 7, 1, 2)
T['kitchen'] = reg(SP, 0, 14, 2, 2); T['sink'] = reg(SP, 1, 3, 2, 2); T['bigTable'] = reg(SP, 20, 5, 2, 2); T['sofaB'] = reg(SP, 22, 5, 2, 2)
T['stairsUp'] = stack(tid(IS, 2270), tid(IS, 2315)); T['lampFloor'] = reg(SP, 16, 3, 1, 2)
T['flHome'] = tid(IF, 1123); T['flHome2'] = tid(IF, 1169); T['flPlank'] = tid(IF, 47); T['flPlank2'] = tid(IF, 93); T['wallHome'] = wallface(960, 1006, 1052)
T['frameA'] = reg(SP, 21, 34, 1, 1); T['frameB'] = reg(SP, 22, 34, 1, 1); T['frameC'] = reg(SP, 24, 35, 1, 1)
T['windowW'] = reg(IW, 28, 2, 2, 2)

# ---------------------------------------------------------------- bâtiments (extraits des villes Tuxemon, composés tuile par tuile)
MD = os.path.join(MOD, 'maps')
def tsinfo(t):
    if t.get('source'):
        p = os.path.normpath(os.path.join(MD, t.get('source'))); r = ET.parse(p).getroot(); base = os.path.dirname(p)
    else: r = t; base = MD
    img = r.find('image'); src = os.path.normpath(os.path.join(base, img.get('source')))
    return dict(first=int(t.get('firstgid')), cols=int(r.get('columns') or 0), name=os.path.basename(src), path=src)
def building(mapname, x0, y0, w, h):
    root = ET.parse(os.path.join(MD, mapname)).getroot(); W = int(root.get('width'))
    tss = sorted([tsinfo(t) for t in root.findall('tileset')], key=lambda t: t['first'])
    out = Image.new('RGBA', (w * 16, h * 16))
    for L in root.iter('layer'):
        d = L.find('data'); raw = base64.b64decode(d.text.strip()); raw = zlib.decompress(raw) if d.get('compression') else raw
        for i, g in enumerate(struct.unpack('<%dI' % (len(raw) // 4), raw)):
            g &= 0x1FFFFFFF
            if not g: continue
            x, y = i % W, i // W
            if not (x0 <= x < x0 + w and y0 <= y < y0 + h): continue
            ts = [t for t in tss if t['first'] <= g][-1]
            if ts['name'] != 'core_buildings.png': continue
            lid = g - ts['first']; c = ts['cols']; im = Image.open(ts['path']).convert('RGBA') if ts['path'] not in _cache else _cache[ts['path']]
            _cache[ts['path']] = im
            out.alpha_composite(im.crop(((lid % c) * 16, (lid // c) * 16, (lid % c) * 16 + 16, (lid // c) * 16 + 16)), ((x - x0) * 16, (y - y0) * 16))
    return out
def cols(im, order):  # recompose un bâtiment colonne par colonne (pour l'adapter à l'emprise de la carte)
    out = Image.new('RGBA', (16 * len(order), im.height))
    for j, c in enumerate(order): out.alpha_composite(im.crop((c * 16, 0, c * 16 + 16, im.height)), (j * 16, 0))
    return out
home = building('cotton_town.tmx', 11, 5, 5, 4)
T['bHome'] = cols(home, [0, 1, 3, 4])                       # 4 de large, porte en 3e colonne
T['bLab'] = building('spyder_timber_town.tmx', 2, 9, 5, 4)  # 5 de large, porte au centre
T['bCenter'] = building('spyder_leather_town.tmx', 21, 6, 5, 4)
T['bMart'] = building('spyder_paper_town.tmx', 17, 9, 5, 4)
gf = building('spyder_paper_town.tmx', 6, 9, 6, 4)
T['bGymF'] = cols(gf, [0, 2, 3, 4, 3, 5])                   # porte ramenée en 4e colonne
T['bGymW'] = building('classic_steamshore_city.tmx', 29, 1, 5, 4)
T['bHouse2'] = building('cotton_town.tmx', 11, 5, 5, 4)
T['bHouse3'] = building('classic_hearthrock_city.tmx', 2, 0, 5, 6); T['bHouse4'] = building('classic_hearthrock_city.tmx', 7, 0, 5, 6)
T['bGymN'] = recolor(T['bGymF'], hshift=0.62, sat=.9, val=.85)

# ---------------------------------------------------------------- personnages
PEOPLE = [('hero', 'adventurer', 'adventurer_alt1'), ('rival', 'cooldude_red', 'cooldude_red'), ('prof', 'scientist', 'scientist'),
          ('mom', 'homemaker', 'homemaker'), ('grunt', 'xerogrunt', 'xerogrunt'), ('vex', 'spyderboss', 'spyder_boss'),
          ('valen', 'spyderboss', 'spyder_boss'), ('selene', 'goth', 'goth'), ('leader', 'heroine_red', 'heroine_fiery'),
          ('maelle', 'fashionista_blue', 'fashionista_blue'), ('lumen', 'monk', 'monk'), ('kid', 'postboy', 'postboy'),
          ('girlkid', 'catgirl', 'catgirl'), ('girl', 'picnicker', 'picnicker'), ('assistant', 'scientist_brown', 'scientist_brown'),
          ('botanist', 'florist', 'florist'), ('climber', 'beachcomber', 'beachcomber'), ('old', 'maniac', 'maniac'),
          ('granny', 'granny', 'granny'), ('scout', 'adventurer_yellow', 'adventurer_yellow'), ('camper', 'heroine_brown', 'heroine_brown'),
          ('mountaineer', 'adventurer_green', 'adventurer_green'), ('caver', 'miner_blue', 'miner_blue'), ('miner', 'miner', 'miner'),
          ('sailor', 'soldier', 'soldier'), ('captain', 'riverboatcaptain', 'riverboatcaptain'), ('nurse', 'nurse', 'nurse'),
          ('astro', 'professor_lapi', 'professor_lapi'), ('lili', 'florist_rose', 'florist_rose'), ('fisher', 'fisher_fiery', 'fisher_red'),
          ('gus', 'fisher', 'fisher'), ('vendor', 'shopassistant', 'shopassistant'),
          ('sis', 'catgirl_blonde', 'catgirl_alt1'), ('dad', 'professor_brown', 'professor_brown'),
          ('caius', 'spyderboss_fiery', 'spyder_boss_fiery'), ('ysolde', 'granny_lapi', 'granny'), ('orane', 'goth_green', 'goth_green')]
OW = Image.new('RGBA', (48, 128 * len(PEOPLE))); BT = Image.new('RGBA', (64, 64 * len(PEOPLE)))
for i, (k, ow, bt) in enumerate(PEOPLE):
    OW.alpha_composite(Image.open(os.path.join(MOD, 'sprites', ow + '.png')).convert('RGBA'), (0, 128 * i))
    b = Image.open(os.path.join(MOD, 'gfx/sprites/player', bt + '.png')).convert('RGBA')
    b = b.crop((64, 0, 128, 64)) if b.size == (128, 64) else b.crop((64, 0, 128, 64))
    BT.alpha_composite(b, (0, 64 * i))

# ---------------------------------------------------------------- empaquetage
def pack(images, width=512):
    items = sorted(images.items(), key=lambda kv: (-kv[1].height, -kv[1].width, kv[0]))
    x = y = rowh = 0; pos = {}
    for k, im in items:
        if x + im.width > width: x = 0; y += rowh; rowh = 0
        pos[k] = [x, y, im.width, im.height]; x += im.width; rowh = max(rowh, im.height)
    out = Image.new('RGBA', (width, y + rowh))
    for k, im in items: out.alpha_composite(im, tuple(pos[k][:2]))
    return out, pos
def b64(im):
    bf = io.BytesIO(); im.save(bf, 'PNG', optimize=True); return base64.b64encode(bf.getvalue()).decode()

# ---------------------------------------------------------------- créatures : face, dos (64x64) et icônes de menu (2 x 24x24) -> src/sprites.json
MONS = [('flamiot', 'pantherafira'), ('brasilion', 'criniotherme'), ('goutelin', 'kroki'), ('torrentor', 'krokivip'), ('pousseron', 'baoby'),
        ('sylvorne', 'baobaraffe'), ('ratounet', 'pickoon'), ('ratoroi', 'raccscal'), ('piafou', 'birdee'), ('tetardin', 'tadcool'),
        ('crapaflot', 'fribbit'), ('larvigne', 'fruitera'), ('papivigne', 'megafruitera'), ('volticelle', 'tumblebee'), ('bourdonnerre', 'weavifly'),
        ('lumignon', 'merlicun'), ('phalumine', 'firomenis'), ('rocaillon', 'grintot'), ('rocaroc', 'grinflare'), ('magmor', 'ignibus'),
        ('ombrelin', 'cackleen'), ('noctyrex', 'bewhich'), ('nocturelle', 'noctalo'), ('solarion', 'mingdyn'), ('nocturion', 'drokoro'),
        ('faucaube', 'gryfix'), ('pissenlou', 'dandicub'), ('pissenlion', 'dandylion'), ('rocaton', 'rockitten'), ('granifelin', 'rockat'), ('fumenard', 'foxfire'),
        ('pyrenard', 'vulpyre'), ('hiboulume', 'ambuwl'), ('ricanoir', 'ghosteeth'), ('miroitruite', 'shimmerain'), ('racinou', 'sprightly'), ('racinaile', 'uprout'),
        ('herissou', 'tumblequill'), ('armaroc', 'tumbledillo'), ('etincelot', 'joulraton'), ('lapilune', 'chibiro'),
        ('lueurette', 'seirein'), ('flammeche', 'loliferno'), ('brumelle', 'spirain'), ('tornalis', 'tornicane'), ('relicat', 'memnomnom'), ('sphinxor', 'pyraminx'),
        ('anubrume', 'mauai'), ('peluchon', 'fuzzlet'), ('peluchine', 'fuzzina'), ('astrafelin', 'jemuar'), ('oeillombre', 'uneye'), ('eclipsoeil', 'lendos'),
        ('fossilame', 'shammer'), ('lumipeche', 'fluoresfin'), ('lanterfin', 'incandesfin'), ('abyssombre', 'lightmare'), ('meteosaur', 'metesaur'),
        ('quetzaroc', 'qetzlrokilus'), ('nuageon', 'bumbulus'), ('orageon', 'nimbulex'), ('crepuscel', 'yiinaang'), ('presagelle', 'mystikapi')]
def sharp(im):  # alpha binaire : pixel art net
    im = im.copy(); px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]; px[x, y] = (r, g, b, 255) if a >= 128 else (0, 0, 0, 0)
    return im
def b64png(im):
    bf = io.BytesIO(); im.save(bf, 'PNG', optimize=True); return base64.b64encode(bf.getvalue()).decode()
mons = {}
for pid, tux in MONS:
    sh = sharp(Image.open(os.path.join(MOD, 'gfx/sprites/battle', tux + '-sheet.png')).convert('RGBA'))
    mons[pid] = {'f': b64png(sh.crop((0, 0, 64, 64))), 'b': b64png(sh.crop((64, 0, 128, 64))), 'i': b64png(sh.crop((0, 64, 48, 88))), 'src': tux}
json.dump(mons, open(os.path.join(ROOT, 'src/sprites.json'), 'w'), separators=(',', ':'))

atlas, pos = pack(T)
old = json.load(open(os.path.join(ROOT, 'src/art.json')))
keep = ['heart', 'logs', 'orbS_capsule', 'sablier', 'shard', 'tent', 'rock1', 'brazier']
if 'img' in old.get('props', {}):
    pim = Image.open(io.BytesIO(base64.b64decode(old['props']['img']))).convert('RGBA')
    props = {k: pim.crop((x, y, x + w, y + h)) for k, (x, y, w, h) in old['props']['map'].items() if k in keep}
    pimg, ppos = pack(props, 256)
    oldprops = {'img': b64(pimg), 'map': ppos}
else:
    oldprops = old['props']
# fonds de combat (Superpowers Asset Packs CC0, adaptés pour Tuxemon), quantifiés en 256 couleurs
BG = dict(plaine='valley', plaineN='night_valley', foret='forest', foretN='night_forest', lac='sea', lacN='night_sea',
          grotte='cavern', mont='sand', montN='night_sand')
def bgimg(n):
    im = Image.open(os.path.join(MOD, 'gfx/ui/combat', n + '_background.png')).convert('RGB')
    return im.quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
art = {'tiles': {'img': b64(atlas), 'map': pos}, 'props': oldprops, 'bg': {k: b64(bgimg(v)) for k, v in BG.items()},
       'people': {'keys': [p[0] for p in PEOPLE], 'src': [[p[1], p[2]] for p in PEOPLE], 'ow': {'img': b64(OW)}, 'bt': {'img': b64(BT)}}}
json.dump(art, open(os.path.join(ROOT, 'src/art.json'), 'w'), separators=(',', ':'))
if os.environ.get('ATLAS_PNG'): atlas.save(os.environ['ATLAS_PNG'])
print('tiles', len(T), atlas.size, 'people', len(PEOPLE), 'art.json', os.path.getsize(os.path.join(ROOT, 'src/art.json')) // 1024, 'Ko')
