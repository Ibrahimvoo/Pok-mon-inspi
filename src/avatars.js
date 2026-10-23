// Avatar ids accepted from other players (the game art thumbnails), or a profile photo chosen from the gallery
// (a small square JPEG embedded as a data URL, checked on the client and on the server).
import { GAMES } from './data.js';
export const AVATARS = GAMES.map(g => g.id);
export const PHOTO_MAX = 16000;
export const isPhoto = a => typeof a === 'string' && a.length <= PHOTO_MAX && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(a);
export const validAvatar = a => AVATARS.includes(a) || isPhoto(a);
