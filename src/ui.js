// DOM helpers, icon set, formatters and art paths.
import { FONT } from './data.js';

export function h(sel, props, ...kids) {
  const [, tag = 'div', rest = ''] = sel.match(/^([a-z0-9]*)(.*)$/i);
  const el = document.createElement(tag || 'div');
  rest.replace(/([.#])([\w-]+)/g, (_, t, v) => { if (t === '.') el.classList.add(v); else el.id = v; });
  if (props && (typeof props !== 'object' || props instanceof Node || Array.isArray(props))) { kids.unshift(props); props = null; }
  for (const k in props || {}) {
    const v = props[k];
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'f') el.dataset.f = v === true ? '' : v;
    else if (k in el && k !== 'list' && !k.startsWith('data') && !k.startsWith('aria')) el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  append(el, kids);
  return el;
}
function append(el, kids) {
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k instanceof Node ? k : document.createTextNode(k));
  }
}
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const P = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/><circle cx="12" cy="12" r="6.6"/>',
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M6 9.5V20h4.5v-5.5h3V20H18V9.5"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.6 2H4.4z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
  download: '<path d="M12 3.5v11.5M7 10.5l5 5 5-5"/><path d="M4.5 18.5v2h15v-2"/>',
  friends: '<circle cx="9" cy="8.5" r="3.3"/><path d="M2.8 19.5c.6-3.4 3.2-5.4 6.2-5.4s5.6 2 6.2 5.4"/><circle cx="17" cy="9.5" r="2.6"/><path d="M16.2 14.3c2.7-.2 4.6 1.5 5 4.2"/>',
  music: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.6"/><circle cx="17.5" cy="16" r="2.6"/>',
  volume: '<path d="M4 9.5h3.5L12.5 5v14l-5-4.5H4z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.6 6.4a8.2 8.2 0 0 1 0 11.2"/>',
  access: '<circle cx="12" cy="4.6" r="1.8"/><path d="M4.5 8.2 12 9.6l7.5-1.4M12 9.6v4.6l-3.4 6.6M12 14.2l3.4 6.6"/>',
  power: '<path d="M12 3v8.5"/><path d="M7 6.2a7.5 7.5 0 1 0 10 0"/>',
  wifi: '<path d="M2.5 9.2a14 14 0 0 1 19 0M5.6 12.5a9.5 9.5 0 0 1 12.8 0M8.7 15.8a5 5 0 0 1 6.6 0"/><circle cx="12" cy="19" r="1.2"/>',
  cart: '<path d="M3 4h2.6l2.2 11h10.4l2-8H7"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="16.5" cy="19.5" r="1.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
  trophy: '<path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 6H4.2a3.3 3.3 0 0 0 3.6 4.4M16.5 6h3.3a3.3 3.3 0 0 1-3.6 4.4M12 13.5V17M8.5 20.5h7l-.8-3.5H9.3z"/>',
  more: '<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>',
  bag: '<path d="M5 8h14l-1 12.5H6z"/><path d="M8.8 10.5V7a3.2 3.2 0 0 1 6.4 0v3.5"/>',
  library: '<rect x="3.5" y="9" width="17" height="11.5" rx="1.6"/><path d="M5.5 6h13M7.5 3.3h9"/>',
  check: '<path d="m5 12.5 4.5 4.5L19.5 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  gamepad: '<path d="M7.2 7.5h9.6c2.6 0 4.2 2.8 4.7 6.8.4 3-1.5 4.6-3.3 3.1l-2.4-2H8.2l-2.4 2c-1.8 1.5-3.7-.1-3.3-3.1.5-4 2.1-6.8 4.7-6.8z"/><path d="M8 10v3M6.5 11.5h3"/><circle cx="15.8" cy="10.6" r=".9"/><circle cx="17.6" cy="12.4" r=".9"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 9.5h.01M9.3 9.5h.01M12.6 9.5h.01M15.9 9.5h.01M18.2 9.5h.01M6 12.5h.01M9.3 12.5h.01M12.6 12.5h.01M15.9 12.5h.01M18.2 12.5h.01M8 15.3h8"/>',
  user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c.9-4 3.8-6.2 7.5-6.2s6.6 2.2 7.5 6.2"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="8.6"/><path d="M12 11v5.5M12 7.6v.2"/>',
  storage: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6.5 14.5h4M16.5 14.5h.01"/>',
  display: '<rect x="2.8" y="4.5" width="18.4" height="12" rx="1.6"/><path d="M8.5 20h7M12 16.5V20"/>',
  battery: '<rect x="2.5" y="7.5" width="17" height="9" rx="1.8"/><path d="M21.5 10.5v3"/><rect x="4.5" y="9.5" width="10" height="5" rx=".6" fill="currentColor" stroke="none"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.3-5.4"/><path d="M19.5 4v4.5H15"/>',
  moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  sort: '<path d="M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  globe: '<circle cx="12" cy="12" r="8.8"/><path d="M3.5 12h17M12 3.2c2.4 2.4 3.6 5.4 3.6 8.8s-1.2 6.4-3.6 8.8c-2.4-2.4-3.6-5.4-3.6-8.8S9.6 5.6 12 3.2z"/>',
  sparkle: '<path d="M12 3.5 13.8 10l6.2 2-6.2 2L12 20.5 10.2 14 4 12l6.2-2z"/>',
  switcher: '<rect x="3" y="6" width="12" height="12" rx="2"/><path d="M18 8v8M21 9.5v5"/>',
  tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.8 8.8-8.7 8.7z"/><circle cx="8" cy="8" r="1.4"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5l3.2 2"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 9.5h18M15.5 14h2"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  micOff: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 10.4 5.2M18.5 11.5a6.4 6.4 0 0 1-.4 2.2M12 18v3M4 4l16 16"/>',
  phone: '<path d="M5 4h3.5l1.7 4.3-2.2 1.5a11 11 0 0 0 6.2 6.2l1.5-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>',
  phoneOff: '<path d="M3.2 13.6c4.9-4.2 12.7-4.2 17.6 0l-1.5 2.9-3.6-1.3v-2.4a10 10 0 0 0-7.4 0v2.4l-3.6 1.3z"/>',
  party: '<circle cx="8" cy="9" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M2.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M13.5 14.6c2.6-.6 5.4.8 6 4.4"/>',
  chat: '<path d="M4 5.5h16v10H9.5L5 19v-3.5H4z"/>',
  userPlus: '<circle cx="10" cy="8.5" r="3.8"/><path d="M3 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6M18.5 7v6M15.5 10h6"/>',
};
export function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;
}
export const ic = (name, cls) => h('span.icw', { html: icon(name, cls) });

// Face-button glyphs, drawn as outline shapes like the console UI.
const G = {
  cross: '<path d="M7 7l10 10M17 7 7 17"/>',
  circle: '<circle cx="12" cy="12" r="5.6"/>',
  triangle: '<path d="M12 6 18.2 16.8H5.8z"/>',
  square: '<rect x="6.6" y="6.6" width="10.8" height="10.8" rx=".6"/>',
};
export function glyphSvg(shape) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${G[shape]}</svg>`;
}

export const art = {
  hero: id => `art/${id}.webp`,
  thumb: id => `art/${id}-t.webp`,
  depth: id => `art/${id}-d.webp`,
  shot: (id, i) => `art/${id}-s${i}.webp`,
};

// Typographic game logo rendered with the title's display face.
export function logo(g, cls = '') {
  const el = h(`div.logo.logo-${g.font}${cls ? '.' + cls : ''}`, g.title);
  el.style.fontFamily = FONT[g.font];
  return el;
}

export const price = n => n === 0 ? 'Gratuit' : n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
export const size = n => `${n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Go`;
export function hours(min) {
  if (!min) return 'Jamais joué';
  if (min < 60) return `${Math.round(min)} min`;
  return `${Math.floor(min / 60)} h ${String(Math.round(min % 60)).padStart(2, '0')}`;
}
export function ago(ts) {
  if (!ts) return 'Jamais';
  const m = (Date.now() - ts) / 60000;
  if (m < 1) return 'À l’instant';
  if (m < 60) return `Il y a ${Math.round(m)} min`;
  if (m < 1440) return `Il y a ${Math.round(m / 60)} h`;
  const d = Math.round(m / 1440);
  return d === 1 ? 'Hier' : `Il y a ${d} jours`;
}
export const date = s => new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
export const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function img(src, cls = '', alt = '') {
  const el = h(`img${cls ? '.' + cls.split(' ').join('.') : ''}`, { src, alt, decoding: 'async', draggable: false });
  el.addEventListener('error', () => el.classList.add('broken'), { once: true });
  return el;
}

export function stars(r) {
  const el = h('span.stars');
  for (let i = 1; i <= 5; i++) el.append(h('span.st' + (r >= i - .25 ? '.on' : r >= i - .75 ? '.half' : ''), { html: icon('star') }));
  return el;
}

export function pegi(n) {
  return h(`span.pegi.p${n}`, h('b', n), h('small', 'PEGI'));
}
export const wait = ms => new Promise(r => setTimeout(r, ms));

export function avatarImg(gameId, dim = '6rem') {
  return h('div.avatar', { style: { width: dim, height: dim } }, img(art.thumb(gameId)));
}
