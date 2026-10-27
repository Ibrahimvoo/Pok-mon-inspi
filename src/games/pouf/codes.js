// Lobby codes and the validation of what other players send about themselves (pure, testable).
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const randomCode = () => Array.from({ length: 5 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
// Same code for every member of a console party: they all land in the same lobby.
export function codeFrom(text) {
  let h = 2166136261;
  for (const ch of String(text)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  let out = '';
  for (let i = 0; i < 5; i++) { out += ALPHABET[(h >>> 0) % ALPHABET.length]; h = Math.imul(h ^ (h >>> 13), 2654435761); }
  return out;
}
export const cleanCode = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);

const ok = (v, max = 24) => typeof v === 'string' && v.length <= max ? v : undefined;
export function sanitizeLook(l = {}) {
  return { species: ok(l.species) || 'hippo', color: /^#[0-9a-f]{6}$/i.test(l.color || '') ? l.color : '#9d8fc4', hat: ok(l.hat) || 'none', extra: ok(l.extra) || 'none', gas: ok(l.gas) || 'green' };
}
