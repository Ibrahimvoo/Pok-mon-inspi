# 18.0 : ajoute à src/art.json les personnages de la mise à jour 18.0 (feuille de marche 48x128 + sprite de combat 64x64), sans toucher aux autres.
# Usage : python3 tools/v18people.py [chemin du dépôt Tuxemon]  (défaut : /home/user/tuxemon). Relancer ne duplique rien.
import sys, os, io, json, base64
from PIL import Image
TUX = sys.argv[1] if len(sys.argv) > 1 else '/home/user/tuxemon'
MOD = os.path.join(TUX, 'mods/tuxemon')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NEW = [('arlequin', 'magician_fiery', 'magician_fiery'), ('faustine', 'goth_rose', 'goth_rose'), ('berenice', 'witch', 'witch'),
       ('mirella', 'catgirl_violet', 'fashionista_rose'), ('maestro', 'magician_grey', 'magician_alt1'), ('ninja', 'ninja', 'ninja'),
       ('knight', 'knight', 'knight'), ('nomade', 'disciple', 'desert_male'), ('nomade2', 'disciple_fiery', 'desert_female'),
       ('danseuse', 'catgirl_violet', 'dancer'), ('patissiere', 'barmaid', 'barmaid'),
       ('dgmasque', 'magician_blonde', 'magician_blonde'), ('dgsable', 'disciple', 'desert_male'), ('dgfeuille', 'woodnymph', 'earthnymph'), ('dgninja', 'ninja_blue', 'ninja_violet')]
p = os.path.join(ROOT, 'src/art.json'); art = json.load(open(p)); P = art['people']
dec = lambda s: Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
def enc(im):
    bf = io.BytesIO(); im.save(bf, 'PNG', optimize=True); return base64.b64encode(bf.getvalue()).decode()
OW, BT = dec(P['ow']['img']), dec(P['bt']['img'])
add = [n for n in NEW if n[0] not in P['keys']]
if add:
    n0 = len(P['keys']); OW2 = Image.new('RGBA', (48, 128 * (n0 + len(add)))); BT2 = Image.new('RGBA', (64, 64 * (n0 + len(add))))
    OW2.alpha_composite(OW, (0, 0)); BT2.alpha_composite(BT, (0, 0))
    for i, (k, ow, bt) in enumerate(add):
        OW2.alpha_composite(Image.open(os.path.join(MOD, 'sprites', ow + '.png')).convert('RGBA'), (0, 128 * (n0 + i)))
        b = Image.open(os.path.join(MOD, 'gfx/sprites/player', bt + '.png')).convert('RGBA')
        BT2.alpha_composite(b.crop((64, 0, 128, 64)) if b.size[0] >= 128 else b, (0, 64 * (n0 + i)))
        P['keys'].append(k); P['src'].append([ow, bt])
    P['ow']['img'] = enc(OW2); P['bt']['img'] = enc(BT2)
    json.dump(art, open(p, 'w'), separators=(',', ':'))
print('personnages', len(P['keys']), 'ajoutés', len(add), 'art.json', os.path.getsize(p) // 1024, 'Ko')
