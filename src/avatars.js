// Profile pictures: a photo from the gallery (small square JPEG as a data URL), or Pouf Party's cover plus the original portraits kept from the former catalogue (accounts created
// with them stay valid). Shared with the server, which only accepts these ids.
export const AVATAR_LIST = [
  ['pouf-party', 'Pouf Party'], ['ashen-crown', 'Chevalière'], ['tidebreaker', 'Brise-lames'], ['starfall', 'Nébuleuse'],
  ['neon-requiem', 'Néon'], ['hollow-pines', 'Forêt'], ['apex-circuit', 'Circuit'], ['lumen', 'Lumière'], ['abyssal', 'Abysses'],
  ['northbound', 'Aurore'], ['sands-meridian', 'Désert'], ['valewalker', 'Sommets'], ['matchday', 'Stade'],
  ['titan-protocol', 'Titan'], ['moonlit-bay', 'Baie'], ['whispergrove', 'Lucioles'], ['orbital-drift', 'Orbite'],
  ['nightline', 'Minuit'], ['last-light', 'Crépuscule'],
].map(([id, name]) => ({ id, name }));
export const AVATARS = AVATAR_LIST.map(a => a.id);
// a photo picked in the gallery, checked on the client and on the server
export const PHOTO_MAX = 16000;
export const isPhoto = a => typeof a === 'string' && a.length <= PHOTO_MAX && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(a);
export const validAvatar = a => AVATARS.includes(a) || isPhoto(a);
