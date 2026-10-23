// Profile photo from the gallery (or the camera): the picked image is cropped to a centred square, resized and
// compressed to a small JPEG so it travels with the profile (server account, salons, UNO seats).
import { isPhoto } from './avatars.js';

const SIZE = 160, MAX = 12000;
export function pickPhoto() {
  return new Promise((resolve, reject) => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*';
    inp.style.position = 'fixed'; inp.style.left = '-1000px';
    document.body.append(inp);
    const done = () => setTimeout(() => inp.remove(), 0);
    inp.addEventListener('change', async () => {
      const f = inp.files?.[0];
      done();
      if (!f) { resolve(null); return; }
      try { resolve(await toAvatar(f)); } catch (e) { reject(e); }
    }, { once: true });
    inp.addEventListener('cancel', () => { done(); resolve(null); }, { once: true });
    inp.click();
  });
}
async function load(file) {
  const url = URL.createObjectURL(file);
  try {
    const im = new Image();
    im.decoding = 'async';
    im.src = url;
    await im.decode();
    return im;
  } catch { throw new Error('Cette image ne peut pas être lue. Choisissez une photo JPEG ou PNG.'); }
  finally { setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
export async function toAvatar(file) {
  if (!file.type.startsWith('image/')) throw new Error('Choisissez une image.');
  const im = await load(file);
  const w = im.naturalWidth, h = im.naturalHeight;
  if (!w || !h) throw new Error('Image vide.');
  const side = Math.min(w, h);
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const g = c.getContext('2d');
  g.imageSmoothingQuality = 'high';
  g.fillStyle = '#fff'; g.fillRect(0, 0, SIZE, SIZE);
  g.drawImage(im, (w - side) / 2, (h - side) / 2, side, side, 0, 0, SIZE, SIZE);
  for (let q = .86; q >= .4; q -= .08) {
    const url = c.toDataURL('image/jpeg', q);
    if (url.length <= MAX && isPhoto(url)) return url;
  }
  throw new Error('Image trop lourde, essayez une autre photo.');
}
