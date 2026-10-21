// Setting rows shared by Settings and the Control Center: toggles, sliders, cycles, buttons.
import { h, icon } from './ui.js';
import { audio } from './audio.js';
import { state, save } from './state.js';

const label = (title, desc) => h('div.sl', h('div.st', title), desc && h('div.sd', desc));

export function toggle(title, desc, key, onchange) {
  const sw = h(`div.switch${state.settings[key] ? '.on' : ''}`);
  return h('div.set-item', {
    f: true, onok: () => {
      state.settings[key] = !state.settings[key];
      sw.classList.toggle('on', state.settings[key]);
      save('settings'); audio.play('toggle'); onchange?.(state.settings[key]);
    },
  }, label(title, desc), sw);
}

export function slider(title, desc, key, onchange, { min = 0, max = 1, step = .1 } = {}) {
  const fill = h('i'), knob = h('b'), bar = h('div.slider', fill, knob), val = h('span');
  const paint = () => { const p = (state.settings[key] - min) / (max - min) * 100; fill.style.width = p + '%'; knob.style.left = p + '%'; val.textContent = Math.round(p) + ' %'; };
  const set = v => {
    v = Math.min(max, Math.max(min, Math.round(v / step) * step));
    if (v === state.settings[key]) return false;
    state.settings[key] = +v.toFixed(3); paint(); save('settings'); onchange?.(state.settings[key]); return true;
  };
  const el = h('div.set-item', { f: true }, label(title, desc), h('div.sv', val, bar));
  el.adjust = d => { if (set(state.settings[key] + d * step)) audio.play('move'); else el.classList.add(d > 0 ? 'bump-right' : 'bump-left'); };
  bar.addEventListener('pointerdown', e => {
    const r = bar.getBoundingClientRect();
    const move = ev => set(min + (max - min) * Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)));
    move(e);
    const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); audio.play('move'); };
    addEventListener('pointermove', move); addEventListener('pointerup', up);
  });
  paint();
  return el;
}

export function cycle(title, desc, key, options, onchange) {
  const val = h('span');
  const paint = () => { val.textContent = (options.find(o => o[0] === state.settings[key]) || options[0])[1]; };
  const step = d => {
    let i = options.findIndex(o => o[0] === state.settings[key]);
    i = (i + d + options.length) % options.length;
    state.settings[key] = options[i][0]; paint(); save('settings'); audio.play('toggle'); onchange?.(state.settings[key]);
  };
  const el = h('div.set-item', { f: true, onok: () => step(1) }, label(title, desc),
    h('div.sv.cycle', h('span.icw', { html: icon('chevron', 'l') }), val, h('span.icw', { html: icon('chevron') })));
  el.adjust = step;
  paint();
  return el;
}

export function action(title, desc, onok, right) {
  return h('div.set-item', { f: true, onok }, label(title, desc), right ? h('div.sv', right) : h('div.sv', { html: icon('chevron') }));
}
export function info(title, value) {
  return h('div.set-item.static', label(title), h('div.sv', value));
}

// left/right on a slider or cycle row adjusts it instead of moving focus
export function adjustable(layer, a) {
  const f = layer.focused;
  if ((a === 'left' || a === 'right') && f?.adjust) { f.adjust(a === 'right' ? 1 : -1); return true; }
  return false;
}
