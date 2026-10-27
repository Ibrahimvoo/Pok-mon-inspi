// Cosmetics of the wardrobe (hats, skins, visors, pets, nameplates): the items are the pictures of the wardrobe grids,
// cut from the reference captures (tools/among/cut_wardrobe.py), drawn on the crewmate at the places measured on the
// wardrobe preview (bucket hat, star visor, « Gastronaute » skin, plant pet on a crewmate of known size).
import { REF, SHAPES } from './crewmate-ref.js';
import { WALK } from './walk-ref.js';

const N = (id, name) => ({ id, name });
export const ITEMS = {
  hat: [N('hat-01', 'Pastèque'), N('hat-02', 'Soyez pas seau - floral'), N('hat-03', 'Crâne fleuri'), N('hat-04', 'Buisson'), N('hat-05', 'Mallette'),
    N('hat-06', 'Petit nuage'), N('hat-07', 'Feuilles de palmier'), N('hat-08', 'Casque audio'), N('hat-09', 'Casque d’astronaute'), N('hat-10', 'Slime'),
    N('hat-11', 'Chapeau de cowboy'), N('hat-12', 'Caca'), N('hat-13', 'Haut-de-forme'), N('hat-14', 'Pot de fleurs'), N('hat-15', 'Lunettes d’aviateur'),
    N('hat-16', 'Casque de chantier'), N('hat-17', 'Cœur'), N('hat-18', 'Képi militaire')],
  skin: [N('skin-01', 'Écharpe'), N('skin-02', 'Buisson'), N('skin-03', 'Veste - bleu marine'), N('skin-04', 'Veste - beige'), N('skin-05', 'Veste - grise'),
    N('skin-06', 'Combinaison - bleue'), N('skin-07', 'Combinaison - rouge'), N('skin-08', 'Gastronaute - blanc'), N('skin-09', 'Gastronaute - orange'),
    N('skin-10', 'Capitaine'), N('skin-11', 'Mécanicien'), N('skin-12', 'Militaire'), N('skin-13', 'Police'), N('skin-14', 'Docteur'),
    N('skin-15', 'Costume noir'), N('skin-16', 'Costume blanc'), N('skin-17', 'Sécurité')],
  visor: [N('visor-01', 'Bonnes étoiles violettes'), N('visor-02', 'Autocollant'), N('visor-03', 'Lunettes'), N('visor-04', 'Masque à gaz - rouge'),
    N('visor-05', 'Masque à gaz - bleu'), N('visor-06', 'Masque de protection'), N('visor-07', 'Sourcils'), N('visor-08', 'Post-it')],
  pet: [N('pet-01', 'Plante carnivore')],
  plate: [N('plate-02', 'Confettis'), N('plate-03', 'Losanges verts'), N('plate-04', 'Nid d’abeilles'), N('plate-05', 'Brume'), N('plate-06', 'Bois')],
};
export const NONE_PLATE = 'plate-01';
export const itemName = (cat, id) => ITEMS[cat]?.find(i => i.id === id)?.name || '';

const imgs = new Map();
export function itemImage(id) {
  if (!id || id === 'none') return null;
  let i = imgs.get(id);
  if (!i) { i = new Image(); i.decoding = 'async'; i.src = `among/ui/wd/${id}.webp`; imgs.set(id, i); }
  return i.complete && i.naturalWidth ? i : null;
}
export function preloadItems() { for (const list of Object.values(ITEMS)) for (const it of list) itemImage(it.id); }

// where the head and the visor are, for the idle base and each walk frame (reference units)
const bbox = list => { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const p of list) for (const [x, y] of p) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a, b, c, d]; };
function metrics(sil, glass, suit) {
  const [, top] = bbox(sil);
  const head = sil.flat().filter(([, y]) => y < top + 45);
  const cx = head.reduce((s, [x]) => s + x, 0) / head.length;
  return { top, cx, bottom: bbox(suit)[3], glass: bbox(glass), suit };
}
const IDLE = metrics(SHAPES.bodySil, SHAPES.glass, [...SHAPES.bodyIn, ...SHAPES.backLegIn, ...SHAPES.frontLegIn]);
const FRAMES = WALK.frames.map(f => metrics(f.sil, f.glass, f.shade));
const H = REF.feet;                             // suit height, reference units

// sizes measured on the wardrobe preview: per pixel of the item pictures, in suit heights
const K = { hat: .78 / 123, visor: .69 / 117, skin: .5 / 108, pet: .58 / 123 };
function put(g, img, x, y, w) { const h = img.naturalHeight * w / img.naturalWidth; g.drawImage(img, x - w / 2, y - h, w, h); }

// in the coordinates of the reference box of the crewmate (origin at its top-left, facing right)
export function drawWorn(g, look, frame = -1, { ghost = false } = {}) {
  if (!look) return;
  const M = frame >= 0 ? FRAMES[frame % FRAMES.length] : IDLE;
  const skin = !ghost && itemImage(look.skin);
  if (skin) {
    // standing: the picture of the skin as it is (its own outline), over the lower half of the suit, like the preview;
    // walking: the same picture kept inside the moving suit
    const w = skin.naturalWidth * K.skin * H;
    if (frame < 0) put(g, skin, REF.center + 5, REF.feet + 2, w);
    else {
      g.save(); g.beginPath();
      for (const p of M.suit) { g.moveTo(p[0][0], p[0][1]); for (let i = 1; i < p.length; i++) g.lineTo(p[i][0], p[i][1]); g.closePath(); }
      g.clip(); put(g, skin, M.cx + 5, M.bottom + 2, w); g.restore();
    }
  }
  const visor = itemImage(look.visor);
  if (visor) {
    const [a, b, c, d] = M.glass, w = visor.naturalWidth * K.visor * H;
    put(g, visor, (a + c) / 2 - 6, (b + d) / 2 + visor.naturalHeight * w / visor.naturalWidth / 2, w);
  }
  const hat = itemImage(look.hat);
  if (hat) put(g, hat, M.cx, M.top + .2 * H, hat.naturalWidth * K.hat * H);
}
// the pet stands beside the crewmate (in front, like the wardrobe preview); same coordinates as drawWorn
export function drawPet(g, look) {
  const pet = itemImage(look?.pet);
  if (pet) put(g, pet, REF.center + .33 * H, REF.feet + .13 * H, pet.naturalWidth * K.pet * H);
}
