// Heads-up display during a run: course progress with checkpoints, raft air, timer, bursts counter,
// the player's gas gauge, key hints for the active device and big centre banners.
import { h } from '../../../ui.js';
import { input as consoleInput } from '../../../input.js';
import { glyph } from '../../../shell.js';

const SVG = {
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#fff"/><path d="M12 6.5V12l3.6 2.2" stroke="#33465c" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  pop: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2 5.2 5.4-2-2.5 5 4.6 3-5.5.8.6 5.6L12 16.4 7.4 20l.6-5.6-5.5-.8 4.6-3-2.5-5 5.4 2z" fill="#fff"/></svg>',
  raft: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#f7dcb8" stroke="#2b2230" stroke-width="1.6"/><circle cx="12" cy="12" r="5.6" fill="#9fd273" stroke="#2b2230" stroke-width="1.2"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M5 21V3" stroke="#fff" stroke-width="2"/><path d="M6 4h12l-3 4 3 4H6z" fill="#fff"/><path d="M6 4h3v4H6zM12 4h3v4h-3zM9 8h3v4H9zM15 8h3l-1 2 1 2h-3z" fill="#2b2230"/></svg>',
};
export const fmtTime = s => { s = Math.max(0, s); const m = Math.floor(s / 60), r = s - m * 60; return `${String(m).padStart(2, '0')}:${r.toFixed(2).padStart(5, '0')}`; };
const PADS = ['ps', 'xbox', 'nintendo', 'generic'];

export function createHud(root, course, { mode = 'raft' } = {}) {
  const span = mode === 'race' ? course.finishZ : course.finish || 1;
  const ticks = mode === 'survival' ? [] : course.checkpoints.map(c => h('i.tick', { style: { left: ((typeof c === 'number' ? c : c.p[2]) / span * 100) + '%' } }));
  const marker = h('b.marker'), fill = h('span.fill');
  const prog = h('div.pf-prog', h('div.line', fill, ...ticks, marker), h('span.flag', { html: SVG.flag }));
  const airSegs = [h('i'), h('i'), h('i')];
  const air = h('div.pf-air', h('span.ic', { html: SVG.raft }), h('div.segs', airSegs));
  const timeTx = h('span'), timer = h('div.pf-pill.timer', h('span.ic', { html: SVG.clock }), timeTx);
  const popTx = h('span', '0'), pops = h('div.pf-pill.pops', h('span.ic', { html: SVG.pop }), popTx);
  const gasFill = h('i'), gas = h('div.pf-gas', h('div.bar', gasFill), h('small', mode === 'raft' ? 'GAZ' : 'POUF'));
  const holdRing = h('i.hold');
  const keyPause = h('div.pf-key'), keyRespawn = h('div.pf-key', holdRing);
  const keys = h('div.pf-keys', keyPause, keyRespawn);
  const banner = h('div.pf-banner'), sub = h('div.pf-sub');
  const toast = h('div.pf-toast');
  const net = h('div.pf-net');
  const rankTx = h('span'), rank = h('div.pf-pill.rank', rankTx);
  const el = h(`div.pf-hud.hidden.mode-${mode}`, prog, air, timer, pops, rank, gas, keys, banner, sub, toast, net);
  root.append(el);
  let bannerT = 0, toastT = 0, lastDevice = '';

  function renderKeys() {
    const d = consoleInput.device;
    if (d === lastDevice) return;
    lastDevice = d;
    const pad = PADS.includes(d);
    keyPause.replaceChildren(pad ? glyph('options') : h('span.gl.key', 'Échap'), h('span', 'PAUSE'));
    keyRespawn.replaceChildren(holdRing, pad ? glyph('triangle') : h('span.gl.key', 'R'), h('span', 'RÉAPPARAÎTRE'));
    keyRespawn.classList.toggle('hidden', mode === 'survival');
    keys.classList.toggle('hidden', d === 'touch');
  }
  const api = {
    el,
    show(v) { el.classList.toggle('hidden', !v); renderKeys(); },
    rank(text) { if (rankTx.textContent !== text) { rankTx.textContent = text; rank.classList.remove('bump'); void rank.offsetWidth; rank.classList.add('bump'); } },
    progress(s, cp) {
      const k = Math.max(0, Math.min(1, s / span));
      marker.style.left = (k * 100) + '%'; fill.style.width = (k * 100) + '%';
      ticks.forEach((t, i) => t.classList.toggle('done', i < cp));
    },
    air(n, flash) {
      airSegs.forEach((s, i) => s.classList.toggle('on', i < n));
      air.classList.toggle('low', n <= 1);
      if (flash) { air.classList.remove('flash'); void air.offsetWidth; air.classList.add('flash'); }
    },
    time(s) { timeTx.textContent = fmtTime(s); },
    pops(n) { if (popTx.textContent !== String(n)) { popTx.textContent = n; pops.classList.remove('bump'); void pops.offsetWidth; pops.classList.add('bump'); } },
    gas(v, color, empty) { gasFill.style.width = (v * 100).toFixed(1) + '%'; gasFill.style.background = color; gas.classList.toggle('empty', !!empty); },
    hold(k) { holdRing.style.setProperty('--k', k); keyRespawn.classList.toggle('holding', k > 0); },
    banner(text, { kind = '', ms = 1400, subText = '' } = {}) {
      banner.textContent = text; banner.className = 'pf-banner show ' + kind;
      sub.textContent = subText; sub.classList.toggle('show', !!subText);
      bannerT = ms / 1000;
    },
    toast(text, ms = 2600) { toast.textContent = text; toast.classList.add('show'); toastT = ms / 1000; },
    net(text) { net.textContent = text || ''; },
    update(dt) {
      renderKeys();
      if (bannerT > 0 && (bannerT -= dt) <= 0) { banner.classList.remove('show'); sub.classList.remove('show'); }
      if (toastT > 0 && (toastT -= dt) <= 0) toast.classList.remove('show');
    },
    dispose() { el.remove(); },
  };
  api.air(3); api.time(0);
  return api;
}
