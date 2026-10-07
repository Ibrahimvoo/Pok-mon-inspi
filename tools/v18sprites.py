# 18.0 : ajoute à src/sprites.json les créatures de Tuxemon utilisées par la mise à jour 18.0 (face, dos, icône) et imprime leurs couleurs dominantes.
# Usage : python3 tools/v18sprites.py [chemin du dépôt Tuxemon]  (défaut : /home/user/tuxemon)
import sys, os, io, json, base64
from PIL import Image
TUX = sys.argv[1] if len(sys.argv) > 1 else '/home/user/tuxemon'
BAT = os.path.join(TUX, 'mods/tuxemon/gfx/sprites/battle')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V18 = [('serpetin','hissiorite'),('cobrasier','cobarett'),('pythonova','pythonova'),('braisot','embra'),('eruptor','ruption'),('lapignite','thumpurn'),('volcanin','volconey'),
 ('fournours','furnursus'),('ourscendre','statursus'),('charbonours','coaldiak'),('tikitison','tikoal'),('tikorche','tikorch'),('djinnflamme','djinnbo'),
 ('crabeil','sheye'),('crabermite','shrab'),('algadou','weedsea'),('atlantalgue','weedlantis'),('nudiflor','nudiflot_female'),('nudisprit','nudimind'),
 ('escargout','lesmagu'),('coquillagu','shelagu'),('crustagu','crustagu'),('ornitaupe','taupypus'),('gelilou','jelillow'),('bedouille','bedoo'),('blobulle','uglip'),
 ('eskichiot','eskipup'),('givrechien','houndice'),('tuxou','tux'),('oasiphant','pharavion'),
 ('sushiko','drashimi'),('makirol','tsushimi'),('tobishimi','tobishimi'),('chlorasaure','chloragon'),('sevragon','sapragon'),('dragarbre','dragarbor'),
 ('timibulbe','shybulb'),('narcifeuille','narcileaf'),('helifeuille','helipi'),('copterbe','coppi'),('parasolis','parappi'),('mousseroc','tarpeur'),('vigueur','vigueur'),
 ('choufroid','cohldrabi'),('laitgivre','lettice'),('givrelaitue','frostuce'),('bourgeonge','budaye'),('bambouddha','bamboon'),('croquepiege','trapsnap'),('dionavore','sapsnap'),('bourbeux','sludgehog'),
 ('ecrouvis','nut'),('boulonix','bolt'),('arthrovolt','arthrobolt'),('singelec','tetrchimp'),('apeoro','apeoro'),('kernelec','kernel'),('meduchoc','medushock'),('coleorage','coleorus'),
 ('protomk','mk01_proto'),('alphamk','mk01_alpha'),('deltamk','mk01_delta'),
 ('diablin','devidin'),('diablosaure','devidra'),('diabloraptor','deviraptor'),('briquillon','imbrickcile'),('briquegarde','bricgard'),('briquemoth','brickhemoth'),
 ('fourminet','scarlant'),('fourmicrane','shull'),('myrmidon','myrmison'),('scorpaille','selket'),('scorpharaon','selmatek'),('requiroc','carcharock'),('fenneclat','galnec'),('pincadune','dune_pincher'),('hippotame','hampotamos'),
 ('vampiver','vamporm'),('dracoon','dracune'),('nocturaile','fluttaflap'),('ombrelain','hoarse'),('equinuit','equill'),('cauchemare','hoarseshoo'),('draplin','cairfrey'),('possedrap','possessun'),
 ('araignuit','spighter'),('hyenou','babysnitch'),('hyenombre','baddrscratch'),('ninjombre','yamada'),('poupetronce','hoodoll'),('vaudoronce','wolololl'),
 ('chromoeil','chromeye'),('angrito','angrito'),('tortune','forturtle'),('prophetoise','prophetoise'),('flanlou','flummby'),('grosflan','flummack'),('oursaturne','bursa'),('ourstral','flambear'),
 ('masquetotem','abesnaki'),('chatoeil','cateye'),('glifee','gliffary'),
 ('chenillard','marvillar'),('mantillard','marvantis'),('serpinet','snaki'),('bicephale','snokari'),('toucanari','toucanary'),('raptoucan','raptoucan'),('ouistitou','capiti'),('capisinge','capinyah'),
 ('helichat','propellercat'),('hibougris','pairagrin'),('hiboumage','pairagrim'),('lapitesse','squabbit'),('lapisaure','rabbitosaur'),('fourmilou','aardorn'),('fourmilame','aardart')]
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
    pal = q.getpalette(); cnt = sorted(q.getcolors(), reverse=True)
    out = []
    for n, i in cnt:
        c = tuple(pal[i*3:i*3+3])
        if all(sum(abs(a-b) for a, b in zip(c, o)) > 90 for o in out): out.append(c)
        if len(out) == 3: break
    while len(out) < 3: out.append(out[-1] if out else (128, 128, 128))
    return ['#%02x%02x%02x' % c for c in out]
path = os.path.join(ROOT, 'src/sprites.json'); mons = json.load(open(path))
cols = {}
for pid, tux in V18:
    sh = sharp(Image.open(os.path.join(BAT, tux + '-sheet.png')).convert('RGBA'))
    f = sh.crop((0, 0, 64, 64))
    mons[pid] = {'f': b64png(f), 'b': b64png(sh.crop((64, 0, 128, 64))), 'i': b64png(sh.crop((0, 64, 48, 88))), 'src': tux}
    cols[pid] = colors(f)
json.dump(mons, open(path, 'w'), separators=(',', ':'))
print(json.dumps(cols, separators=(',', ':')))
print(len(V18), 'créatures ;', os.path.getsize(path) // 1024, 'Ko')
