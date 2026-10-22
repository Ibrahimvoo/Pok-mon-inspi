// Mimic Party interface pieces, drawn after the game's screens: chunky buttons, navy panels, player cards, the round
// box, the sound card, the cyan waveform panel, the score text and the prize wheel.
import { h } from '../ui.js';
import { glyph } from '../shell.js';

export const ICON = {
  play: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#1b1b22"/><path d="M15 11.5v17l14-8.5z" fill="#fff"/></svg>',
  hammer: '<svg viewBox="0 0 40 40"><rect x="1" y="1" width="38" height="38" rx="9" fill="#173cb8"/><path d="M12 29.5 22.5 19" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M19 12.5l5.5-3 7.5 7.5-3 5.5z" fill="#fff"/></svg>',
  star: '<svg viewBox="0 0 40 40"><path d="M20 3.5l5 10.4 11.4 1.5-8.3 7.9 2.1 11.3L20 29.1 9.8 34.6l2.1-11.3L3.6 15.4 15 13.9z" fill="#ffcf2a" stroke="#c98a00" stroke-width="2" stroke-linejoin="round"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 4.5 16.5 12 9 19.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  left: '<svg viewBox="0 0 40 40"><path d="M26 8 12 20l14 12z" fill="#fff"/></svg>',
  right: '<svg viewBox="0 0 40 40"><path d="M14 8l14 12-14 12z" fill="#fff"/></svg>',
  gear: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#1d2140"/><path d="M20 9.5l2 .3.7 2.6 2 .9 2.4-1.3 2.9 2.9-1.3 2.4.9 2 2.6.7.3 2-.3 2-2.6.7-.9 2 1.3 2.4-2.9 2.9-2.4-1.3-2 .9-.7 2.6-2 .3-2-.3-.7-2.6-2-.9-2.4 1.3-2.9-2.9 1.3-2.4-.9-2-2.6-.7-.3-2 .3-2 2.6-.7.9-2-1.3-2.4 2.9-2.9 2.4 1.3 2-.9.7-2.6z" fill="#fff"/><circle cx="20" cy="20" r="4.2" fill="#1d2140"/></svg>',
  people: '<svg viewBox="0 0 40 40"><circle cx="15" cy="12" r="6.5" fill="#fff"/><path d="M3 33c0-7 5-11.5 12-11.5S27 26 27 33z" fill="#fff"/><circle cx="28" cy="13" r="5" fill="#fff"/><path d="M29 21.5c5 .3 9 4 9 10.5h-8.5c0-4-1.2-7.5-3.5-9.8z" fill="#fff"/></svg>',
  trophy: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#2a3166"/><path d="M13 10h14v7a7 7 0 0 1-14 0z" fill="#fff"/><path d="M13 12H9.5c0 4 2 6.5 4.6 6.8M27 12h3.5c0 4-2 6.5-4.6 6.8" fill="none" stroke="#fff" stroke-width="2"/><path d="M18.5 23.5h3V27h3.5v3h-10v-3h3.5z" fill="#fff"/></svg>',
  info: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18.5" fill="#1f6cf2" stroke="#fff" stroke-width="2"/><circle cx="20" cy="12" r="2.8" fill="#fff"/><rect x="17.4" y="17" width="5.2" height="13" rx="2.4" fill="#fff"/></svg>',
  lock: '<svg viewBox="0 0 40 40"><rect x="10" y="18" width="20" height="17" rx="4" fill="#fff"/><path d="M14 18v-5a6 6 0 0 1 11.6-2" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><circle cx="20" cy="26" r="2.6" fill="#13a05f"/></svg>',
  plus: '<svg viewBox="0 0 40 40"><path d="M20 8v24M8 20h24" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 40 40"><rect x="2" y="2" width="36" height="36" rx="7" fill="#1fb36b"/><path d="M11 20.5l6 6 12-13" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  box: '<svg viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="7" fill="#22224a" stroke="#4a4a8a" stroke-width="2.5"/></svg>',
  eye: '<svg viewBox="0 0 40 40"><rect x="1" y="1" width="38" height="38" rx="9" fill="#2a2a4a"/><path d="M6 20s5.5-8.5 14-8.5S34 20 34 20s-5.5 8.5-14 8.5S6 20 6 20z" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="20" cy="20" r="4.4" fill="#fff"/></svg>',
  speaker: '<svg viewBox="0 0 40 40"><path d="M6 15h7l9-7v24l-9-7H6z" fill="#22d24a"/><path d="M26 13.5a8.5 8.5 0 0 1 0 13M29.5 9a14 14 0 0 1 0 22" fill="none" stroke="#22d24a" stroke-width="3.2" stroke-linecap="round"/></svg>',
  crown: '<svg viewBox="0 0 40 40"><path d="M5 30 7.5 12l8 8L20 9l4.5 11 8-8L35 30z" fill="#ffd21f" stroke="#a87400" stroke-width="2" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 40 40"><path d="M9 9l22 22M31 9 9 31" stroke="#ff2a3a" stroke-width="6.5" stroke-linecap="round"/></svg>',
  refresh: '<svg viewBox="0 0 40 40"><path d="M31 20a11 11 0 1 1-3.3-7.8" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><path d="M31 6.5v8h-8" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  search: '<svg viewBox="0 0 40 40"><circle cx="17" cy="17" r="9" fill="none" stroke="#fff" stroke-width="3.4"/><path d="M24 24l8 8" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/></svg>',
  mic: '<svg viewBox="0 0 40 40"><rect x="14" y="4" width="12" height="20" rx="6" fill="#fff"/><path d="M9 19a11 11 0 0 0 22 0M20 30v6" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></svg>',
  tomato: '<svg viewBox="0 0 40 40"><circle cx="20" cy="23" r="13" fill="#e0281c"/><path d="M14 11l6 4 6-4-3 6h-6z" fill="#3c8a2a"/><ellipse cx="15" cy="19" rx="3.5" ry="2" fill="#ff8a7a"/></svg>',
};
export const icon = (name, cls = '') => h(`span.mmp-ic${cls ? '.' + cls : ''}`, { html: ICON[name] || '' });

// chunky button; kind: yellow | blue | purple | green | dark | navy | red
export function button(label, { kind = 'yellow', ic = null, onok, v, auto = false, cls = '', chevron = false, key = null, disabled = false } = {}) {
  return h(`button.mmp-b.${kind}${cls ? '.' + cls : ''}`, { f: true, 'data-v': v || null, 'data-autofocus': auto ? '' : null, disabled: disabled || null, onok },
    ic ? icon(ic, 'lead') : null, key ? glyph(key) : null, h('span.t', label), chevron ? icon('chevron', 'chev') : null);
}
// the bubbly, outlined titles of the game (Lobby, Recherche d'une partie..., sound names, scores)
export function bubbly(text, cls = '') {
  const el = h(`div.mmp-bubbly${cls ? '.' + cls : ''}`);
  [...text].forEach((ch, i) => {
    const s = h('span', ch === ' ' ? ' ' : ch);
    s.style.setProperty('--r', ((Math.sin(i * 2.7) * 3) | 0) + 'deg');
    s.style.setProperty('--y', ((Math.cos(i * 1.9) * .06).toFixed(3)) + 'em');
    el.append(s);
  });
  return el;
}
export function panel(cls, ...kids) { return h(`div.mmp-panel${cls ? '.' + cls : ''}`, ...kids); }

// player card (cards row at the top of the game, and the profile card of the home screen)
export function card({ name, score = null, portrait, bg = '#e5483f', rot = 0, level = null, big = false, team = null, me = false }) {
  const pic = h('div.pic', portrait ? h('img', { src: portrait, alt: '' }) : null);
  pic.style.setProperty('--bg', team === 'red' ? '#e5483f' : team === 'blue' ? '#3b6ff0' : bg);
  const el = h(`div.mmp-card${big ? '.big' : ''}${me ? '.me' : ''}`, pic, h('div.nm', name), score != null ? h('div.sc', String(score)) : null, level != null ? h('div.lv', `LVL.${level}`) : null);
  el.style.setProperty('--rot', rot + 'deg');
  return el;
}
export function roundBox(n, total, phase) { return h('div.mmp-roundbox', h('b', `MANCHE ${n} / ${total}`), h('span', phase)); }

// the cyan-framed waveform: reference in blue, the player's take in pink, red playhead
export class Wave {
  constructor() {
    this.cv = h('canvas');
    this.count = h('b.cnt');
    this.el = h('div.mmp-wave', this.cv, this.count);
    this.peaks = null; this.rec = []; this.head = -1; this.recLen = 0;
  }
  setRef(buf, seconds) {
    const x = buf.getChannelData ? buf.getChannelData(0) : buf, n = 220, step = Math.max(1, Math.floor(x.length / n));
    const p = new Float32Array(n);
    let mx = 1e-6;
    for (let i = 0; i < n; i++) { let m = 0; for (let j = i * step; j < Math.min(x.length, (i + 1) * step); j += 4) m = Math.max(m, Math.abs(x[j])); p[i] = m; mx = Math.max(mx, m); }
    for (let i = 0; i < n; i++) p[i] = Math.pow(p[i] / mx, .7);
    this.peaks = p; this.dur = seconds; this.rec = []; this.head = -1;
    this.draw();
  }
  setHead(k) { this.head = k; this.draw(); }
  pushRec(level, k) { this.rec.push([k, level]); this.head = k; this.draw(); }
  setCount(txt) { this.count.textContent = txt || ''; this.count.classList.toggle('on', !!txt); }
  draw() {
    const cv = this.cv, r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    const W = Math.max(10, Math.round(r.width * dpr)), H = Math.max(10, Math.round(r.height * dpr));
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const c = cv.getContext('2d');
    c.clearRect(0, 0, W, H);
    const pad = W * .22, w = W - pad * 2, mid = H / 2;
    c.fillStyle = 'rgba(255,255,255,.05)'; c.fillRect(pad, 0, w, H);
    c.fillStyle = '#b07890'; c.fillRect(0, mid - dpr * .7, W, dpr * 1.4);
    const bar = (i, n, v, colIn, colOut) => {
      const x = pad + i / n * w, bw = Math.max(1, w / n * .9), hh = Math.max(dpr, v * (H * .46));
      const g = c.createLinearGradient(0, mid - hh, 0, mid + hh);
      g.addColorStop(0, colOut); g.addColorStop(.5, colIn); g.addColorStop(1, colOut);
      c.fillStyle = g; c.fillRect(x, mid - hh, bw, hh * 2);
    };
    if (this.peaks) this.peaks.forEach((v, i) => bar(i, this.peaks.length, v, '#ffffff', '#2457e0'));
    // the take, drawn over the reference as it is recorded
    for (const [k, v] of this.rec) bar(Math.floor(k * 220), 220, Math.min(1, v * 1.1), '#ffe1f4', '#ff2fa8');
    if (this.head >= 0) { c.fillStyle = '#ff1a3a'; c.fillRect(pad + this.head * w - dpr * 3, 0, dpr * 6, H); }
  }
}

// score text: "N / 100", "0 (aucun son)"
export function scoreText(v, silent) {
  const el = h(`div.mmp-scoretext${silent ? '.none' : v >= 70 ? '.hi' : v >= 30 ? '.mid' : '.low'}`);
  el.append(bubbly(silent ? '0 (aucun son)' : `${v} / 100`));
  return el;
}

// ---------------------------------------------------------------- prize wheel (end of round)
export const WHEEL = [
  { label: '+5', add: 5, color: '#8a3ff0', ic: 'star' }, { label: '+1', add: 1, color: '#e23fd0', ic: 'star' },
  { label: 'x1', mul: 1, color: '#ff4f9a', ic: 'mic' }, { label: 'x1', mul: 1, color: '#ff962a', ic: 'mic' },
  { label: 'x1', mul: 1, color: '#c3dd3a', ic: 'mic' }, { label: '+10', add: 10, color: '#3fcf4f', ic: 'star' },
  { label: '+20', add: 20, color: '#2fd0dc', ic: 'star' }, { label: 'x1,5', mul: 1.5, color: '#3a86f0', ic: 'star' },
];
export function wheel() {
  const n = WHEEL.length, R = 200, seg = 360 / n;
  const pol = (a, r) => [250 + Math.cos((a - 90) * Math.PI / 180) * r, 250 + Math.sin((a - 90) * Math.PI / 180) * r];
  let slices = '';
  WHEEL.forEach((s, i) => {
    const a0 = i * seg - seg / 2, a1 = a0 + seg, [x0, y0] = pol(a0, R), [x1, y1] = pol(a1, R);
    const [cx, cy] = pol(i * seg, 128), [lx, ly] = pol(i * seg, 70);
    slices += `<path d="M250 250L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z" fill="${s.color}"/>`;
    slices += `<g transform="translate(${cx} ${cy}) rotate(${i * seg})"><circle r="40" fill="rgba(255,255,255,.35)" stroke="rgba(255,255,255,.85)" stroke-width="4"/>${s.ic === 'star'
      ? '<path d="M0-24l7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2z" fill="#ffcf2a" stroke="#fff3c0" stroke-width="3" stroke-linejoin="round"/>'
      : '<rect x="-9" y="-24" width="18" height="30" rx="9" fill="#d8d8e8" stroke="#8a8aa6" stroke-width="3"/><path d="M0 6v14M-10 22h20" stroke="#8a8aa6" stroke-width="4" stroke-linecap="round"/>'}</g>`;
    slices += `<text x="${lx}" y="${ly}" transform="rotate(${i * seg} ${lx} ${ly})" text-anchor="middle" dominant-baseline="middle" class="wl">${s.label}</text>`;
  });
  let bulbs = '';
  for (let i = 0; i < 16; i++) { const [x, y] = pol(i * 22.5 + 11.25, 226); bulbs += `<circle cx="${x}" cy="${y}" r="11" class="bulb" fill="#fff6cf"/>`; }
  const el = h('div.mmp-wheel', { html: `<svg viewBox="0 0 500 500"><circle cx="250" cy="250" r="242" fill="#e8262c" stroke="#a5101a" stroke-width="6"/>${bulbs}<g class="rot">${slices}</g><circle cx="250" cy="250" r="48" fill="#ffd21f" stroke="#e8a000" stroke-width="7"/><path d="M250 222l8 17 19 3-14 13 4 19-17-9-17 9 4-19-14-13 19-3z" fill="#f2441d"/></svg><svg class="pin" viewBox="0 0 60 80"><path d="M30 78C30 78 4 46 4 28a26 26 0 0 1 52 0c0 18-26 50-26 50z" fill="#ffcf1f" stroke="#c98a00" stroke-width="3"/><circle cx="30" cy="27" r="11" fill="#f2441d"/></svg>` });
  const rot = el.querySelector('.rot');
  return {
    el,
    // spins and lands on segment i; resolves after `ms`
    spin(i, ms = 4200) {
      const turns = 5 + Math.floor(Math.random() * 2), jitter = (Math.random() - .5) * seg * .6;
      const to = -(turns * 360 + i * seg + jitter);
      rot.style.transition = `transform ${ms}ms cubic-bezier(.12,.62,.08,1)`;
      rot.style.transform = `rotate(${to}deg)`;
      return new Promise(r => setTimeout(r, ms));
    },
  };
}

// "MIMIC PARTY" ticket badge (cards)
export function ticket() { return h('div.mmp-ticket', h('b', 'MIMIC'), h('i', 'PARTY')); }
export const fmtBonus = b => (!b ? '' : b.add ? `+${b.add}` : `x${String(b.mul).replace('.', ',')}`);
