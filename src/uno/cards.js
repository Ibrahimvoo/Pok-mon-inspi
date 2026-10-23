// UNO cards drawn as SVG (one shared sprite, every card is a <use>): coloured face with a white border, the tilted
// oval outline, big white figures circled in black like the console version, and the black UNO back.
import { h } from '../ui.js';

export const HEX = { r: '#e2231a', y: '#f7d211', g: '#43a844', b: '#0f6dc9', w: '#111' };
const LIGHT = { r: '#f4483a', y: '#ffe456', g: '#5cc25a', b: '#2f8ae6', w: '#2a2a2a' };
const W = 120, H = 186, CX = 60, CY = 93;
// figures of the console cards: heavy geometric sans, white, circled in black with a black shadow down-left
const NUM = "Montserrat, 'Arial Black', Arial, sans-serif";
const LOGO = "'Lilita One', 'Arial Black', sans-serif";
const NS = 'http://www.w3.org/2000/svg';

function figure(txt, x, y, size, rot = 0) {
  const tr = rot ? ` transform="rotate(${rot} ${x} ${y})"` : '';
  const t = (fill, dx, dy, sw) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" font-family="${NUM}" font-weight="800" font-size="${size}" text-anchor="middle" dominant-baseline="central" fill="${fill}" stroke="#000" stroke-width="${(size * sw).toFixed(2)}" stroke-linejoin="round" paint-order="stroke"${tr}>${txt}</text>`;
  const bar = (dx, dy, fill) => `<rect x="${(x - size * .2 + dx).toFixed(1)}" y="${(y + size * .42 + dy).toFixed(1)}" width="${(size * .4).toFixed(1)}" height="${(size * .07).toFixed(1)}" fill="${fill}" stroke="#000" stroke-width="${(size * .05).toFixed(2)}"${tr}/>`;
  const under = txt === '6' || txt === '9';
  const sx = -size * .055, sy = size * .055;
  return t('#000', sx, sy, .2) + (under ? bar(sx, sy, '#000') : '') + t('#fff', 0, 0, .12) + (under ? bar(0, 0, '#fff') : '');
}
// symbols drawn in a 100×100 box, white with a black outline
const SKIP = (fill = '#fff') => `<g fill="none" stroke-linecap="butt">${[['#000', 19], [fill, 11]].map(([c, w]) => `<circle cx="50" cy="50" r="29" stroke="${c}" stroke-width="${w}"/><path d="M30 70 70 30" stroke="${c}" stroke-width="${w}"/>`).join('')}</g>`;
const ARROW = 'M-30 -8 L20 -8 L20 -21 L44 0 L20 21 L20 8 L-30 8 Z';
const REV = (fill = '#fff') => `<g stroke-linejoin="round">${[[-45, 1], [135, 1]].map(([r]) => `<path d="${ARROW}" transform="translate(50 50) rotate(${r}) translate(-4 -13)" fill="${fill}" stroke="#000" stroke-width="5"/>`).join('')}</g>`;
const mini = (x, y, fill, rot = 0) => `<g transform="rotate(${rot} ${x + 15} ${y + 22})"><rect x="${x}" y="${y}" width="30" height="45" rx="4" fill="#fff" stroke="#000" stroke-width="2.6"/><rect x="${x + 3.5}" y="${y + 3.5}" width="23" height="38" rx="2.5" fill="${fill}"/><ellipse cx="${x + 15}" cy="${y + 22.5}" rx="8" ry="15" transform="rotate(30 ${x + 15} ${y + 22.5})" fill="none" stroke="#fff" stroke-width="1.3"/></g>`;
const ovalPath = (rx, ry, cx = CX, cy = CY) => `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(30 ${cx} ${cy})"`;
function quadOval(id, cx, cy, rx, ry, stroke = 2.2) {
  return `<clipPath id="${id}"><ellipse ${ovalPath(rx, ry, cx, cy)}/></clipPath>
    <g clip-path="url(#${id})"><rect x="${cx - rx * 2}" y="${cy - ry * 2}" width="${rx * 2}" height="${ry * 2}" fill="${HEX.r}"/><rect x="${cx}" y="${cy - ry * 2}" width="${rx * 2}" height="${ry * 2}" fill="${HEX.b}"/>
    <rect x="${cx - rx * 2}" y="${cy}" width="${rx * 2}" height="${ry * 2}" fill="${HEX.y}"/><rect x="${cx}" y="${cy}" width="${rx * 2}" height="${ry * 2}" fill="${HEX.g}"/></g>
    <ellipse ${ovalPath(rx, ry, cx, cy)} fill="none" stroke="#fff" stroke-width="${stroke}"/>`;
}
const box = (inner, x, y, size) => `<g transform="translate(${x - size / 2} ${y - size / 2}) scale(${size / 100})">${inner}</g>`;
const frame = c => `<rect width="${W}" height="${H}" rx="10" fill="#fff"/><rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="6.5" fill="url(#ug-${c})"/>`;

function face(c, v) {
  const col = HEX[c];
  let center = '', corner = '';
  const cornerTxt = t => figure(t, 18, 24, 25) + figure(t, W - 18, H - 24, 25, 180);
  if (/\d/.test(v)) { center = figure(v, CX, CY, 86); corner = cornerTxt(v); }
  else if (v === 'S') { center = box(SKIP(), CX, CY, 64); corner = box(SKIP(), 19, 25, 25) + box(SKIP(), W - 19, H - 25, 25); }
  else if (v === 'R') { center = box(REV(), CX, CY, 78); corner = box(REV(), 19, 25, 28) + box(REV(), W - 19, H - 25, 28); }
  else if (v === 'D') {
    center = `<g transform="translate(${CX - 29} ${CY - 34})">${mini(0, 20, col, -10)}${mini(26, 0, col, -10)}</g>`;
    corner = figure('+2', 23, 23, 23) + figure('+2', W - 23, H - 23, 23, 180);
  } else if (v === 'W') {
    center = quadOval('qw', CX, CY, 45, 82, 2.6);
    corner = quadOval('qw1', 17, 25, 8, 14, 1.4) + quadOval('qw2', W - 17, H - 25, 8, 14, 1.4);
  } else if (v === 'F') {
    center = `<g transform="translate(${CX - 42} ${CY - 38})">${mini(0, 26, HEX.g, -12)}${mini(19, 6, HEX.b, -12)}${mini(37, 30, HEX.r, -12)}${mini(55, 10, HEX.y, -12)}</g>`;
    corner = figure('+4', 23, 23, 23) + figure('+4', W - 23, H - 23, 23, 180);
  }
  return frame(c) + (v === 'W' ? '' : `<ellipse ${ovalPath(46, 84)} fill="none" stroke="#fff" stroke-width="2.4"/>`) + center + corner;
}
function back() {
  const uno = (fill, dx, dy, stroke, sw) => `<text x="${CX + dx}" y="${CY + dy}" font-family="${LOGO}" font-size="42" text-anchor="middle" dominant-baseline="central" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" transform="rotate(-28 ${CX} ${CY}) skewX(-8)">UNO</text>`;
  return `<rect width="${W}" height="${H}" rx="10" fill="#fff"/><rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="6.5" fill="#0c0c0c"/>
    <ellipse ${ovalPath(47, 85)} fill="#e2231a"/><ellipse ${ovalPath(47, 85)} fill="none" stroke="#9e0f0b" stroke-width="1.6"/>
    ${uno('#000', -3, 4, '#000', 9)}${uno('#ffe01b', 0, 0, '#000', 6)}`;
}
const GRADS = Object.keys(HEX).map(c => `<linearGradient id="ug-${c}" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="${LIGHT[c]}"/><stop offset=".55" stop-color="${HEX[c]}"/><stop offset="1" stop-color="${HEX[c]}"/></linearGradient>`).join('');

let sprite = null;
function ensureSprite() {
  if (sprite?.isConnected) return;
  const syms = ['<defs>' + GRADS + '</defs>', '<symbol id="uno-back" viewBox="0 0 120 186">' + back() + '</symbol>'];
  for (const c of ['r', 'y', 'g', 'b']) for (const v of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'S', 'R', 'D']) syms.push(`<symbol id="uno-${c}${v}" viewBox="0 0 120 186">${face(c, v)}</symbol>`);
  syms.push(`<symbol id="uno-wW" viewBox="0 0 120 186">${face('w', 'W')}</symbol>`, `<symbol id="uno-wF" viewBox="0 0 120 186">${face('w', 'F')}</symbol>`);
  sprite = document.createElementNS(NS, 'svg');
  sprite.setAttribute('aria-hidden', 'true');
  sprite.setAttribute('width', '0'); sprite.setAttribute('height', '0');
  sprite.classList.add('uno-sprite');
  sprite.innerHTML = syms.join('');
  // clip paths live outside the symbols so every <use> finds them
  const defs = sprite.querySelector('defs');
  sprite.querySelectorAll('symbol clipPath').forEach(cp => defs.append(cp));
  document.body.append(sprite);
}
const use = id => `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><use href="#${id}"/></svg>`;
export const codeOf = card => (card ? card.c + card.v : 'back');
export const NAMES = { S: 'Passe ton tour', R: 'Inversion', D: '+2', W: 'Joker', F: 'Joker +4' };
export function cardLabel(card) {
  if (!card) return 'Carte';
  const col = { r: 'rouge', y: 'jaune', g: 'vert', b: 'bleu' }[card.c];
  if (card.c === 'w') return NAMES[card.v];
  return `${NAMES[card.v] || card.v} ${col}`;
}
// a card element: face up (card given) or face down; `flip` adds both faces for 3D turns
export function cardEl(card, { flip = false, cls = '' } = {}) {
  ensureSprite();
  const el = h(`div.uno-card${cls ? '.' + cls : ''}`);
  if (flip) el.innerHTML = `<div class="uf front">${card ? use('uno-' + codeOf(card)) : ''}</div><div class="uf backf">${use('uno-back')}</div>`;
  else el.innerHTML = use(card ? 'uno-' + codeOf(card) : 'uno-back');
  if (card) { el.dataset.id = card.i; el.dataset.code = codeOf(card); el.setAttribute('aria-label', cardLabel(card)); }
  return el;
}
export function setFace(el, card) {
  const f = el.querySelector('.front');
  if (f) f.innerHTML = use('uno-' + codeOf(card));
  el.dataset.code = codeOf(card);
}
// the symbol shown big above the pile when a card is played
export function bigSymbol(card) {
  const v = card.v, c = card.c;
  if (/\d/.test(v)) return h('div.uno-big.num', { 'data-c': c }, v);
  if (v === 'D' || v === 'F') return h('div.uno-big.num', { 'data-c': v === 'F' ? 'w' : c }, v === 'D' ? '+2' : '+4');
  if (v === 'W') return h('div.uno-big.wild', { html: `<svg viewBox="0 0 120 186">${quadOval('qbig', 60, 93, 44, 78, 3)}</svg>` });
  return h('div.uno-big.sym', { 'data-c': c, html: `<svg viewBox="0 0 100 100">${v === 'S' ? SKIP(HEX[c]) : REV(HEX[c])}</svg>` });
}

// computer players: little robots on pastel squares, like the console version
const ROBOTS = [
  { bg: '#d9c6f5', body: '#d8262f', eye: '#ffd23f' },
  { bg: '#ffd8a8', body: '#5a5fd6', eye: '#7df3ff' },
  { bg: '#fff09a', body: '#47c39a', eye: '#2b2b2b' },
  { bg: '#bfe9ff', body: '#ff7a3d', eye: '#ffffff' },
];
export function robotAvatar(k) {
  const r = ROBOTS[k % ROBOTS.length];
  const svg = `<svg xmlns="${NS}" viewBox="0 0 64 64"><rect width="64" height="64" fill="${r.bg}"/><rect x="30" y="6" width="4" height="9" fill="#444"/><circle cx="32" cy="6" r="4" fill="${r.eye}" stroke="#444" stroke-width="2"/>
    <rect x="14" y="14" width="36" height="28" rx="9" fill="${r.body}" stroke="#2a2a2a" stroke-width="2.5"/><rect x="19" y="20" width="26" height="14" rx="6" fill="#1d1d2b"/>
    <circle cx="26" cy="27" r="3.6" fill="${r.eye}"/><circle cx="38" cy="27" r="3.6" fill="${r.eye}"/><path d="M27 37h10" stroke="#2a2a2a" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="18" y="44" width="28" height="18" rx="6" fill="${r.body}" stroke="#2a2a2a" stroke-width="2.5"/><circle cx="32" cy="52" r="3.5" fill="${r.eye}" stroke="#2a2a2a" stroke-width="1.5"/>
    <rect x="9" y="24" width="5" height="10" rx="2.5" fill="#444"/><rect x="50" y="24" width="5" height="10" rx="2.5" fill="#444"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}
export const BOT_NAMES = ['Sarah', 'Robert', 'Jeffery', 'Jennifer'];
