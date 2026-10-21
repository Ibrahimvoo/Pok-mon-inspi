// On-screen keyboard for text fields when playing with a controller (physical keyboards and touch use the native field).
import { h, icon } from './ui.js';
import { nav } from './nav.js';
import { input } from './input.js';
import { audio } from './audio.js';
import { closeLayer, renderHints } from './shell.js';

const LETTERS = [['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'], ['w', 'x', 'c', 'v', 'b', 'n', '-', '_', '.', '@']];
const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const SYMBOLS = [['!', '?', '#', '$', '%', '&', '*', '+', '=', '/'], ['(', ')', ':', ';', ',', '\'', '"', '€', '£', '~'], ['<', '>', '[', ']', '{', '}', '^', '|', '\\', '§']];

export function openKeyboard({ title, value = '', password = false, maxLength = 64, onDone }) {
  let text = value, shift = false, sym = false, reveal = false;
  const prevRaw = input.getRaw();
  const shown = h('span.kb-text');
  const caret = h('span.caret');
  const eye = password ? h('button.round', { f: true, title: 'Afficher', onok: () => { reveal = !reveal; paint(); audio.play('toggle'); } }, h('span.icw', { html: icon('eye') })) : null;
  const rows = h('div.kb-rows');
  const box = h('div.osk.kb-osk', { 'data-group': 'kb' });
  const root = h('div.overlay.kb-layer', h('div.kb-back'),
    h('div.kb-top', h('div.kb-title', title), h('div.kb-field', shown, caret), eye), box);
  const layer = {
    root,
    hints: [['ok', 'Saisir'], ['square', 'Effacer'], ['triangle', 'Espace'], ['options', 'Valider'], ['back', 'Annuler']],
    back() { input.setRaw(prevRaw); closeLayer(layer); audio.play('back'); },
    onAction(a) {
      if (a === 'square') { del(); return true; }
      if (a === 'triangle') { type(' '); return true; }
      if (a === 'options' || a === 'r2') { done(); return true; }
      if (a === 'l2') { shift = !shift; build(); return true; }
    },
  };
  function paint() { shown.textContent = password && !reveal ? '•'.repeat(text.length) : text; }
  function type(c) { if (text.length >= maxLength) { audio.play('error'); return; } text += shift ? c.toUpperCase() : c; if (shift) { shift = false; build(true); } paint(); audio.play('key'); }
  function del() { text = text.slice(0, -1); paint(); audio.play('back'); }
  function done() { input.setRaw(prevRaw); closeLayer(layer); audio.play('ok'); onDone?.(text); }
  function key(label, fn, cls = '') { return h(`button.key${cls}`, { f: true, onok: fn }, label); }
  function build(keepFocus) {
    const idx = keepFocus ? [...box.querySelectorAll('[data-f]')].indexOf(layer.focused) : -1;
    const letters = sym ? SYMBOLS : LETTERS;
    box.replaceChildren(
      h('div.osk-row', DIGITS.map(d => key(d, () => type(d)))),
      ...letters.map(r => h('div.osk-row', r.map(c => key(shift && !sym ? c.toUpperCase() : c, () => type(c))))),
      h('div.osk-row',
        key(h('span.icw', { html: icon('chevron') }), () => { shift = !shift; build(true); audio.play('toggle'); }, '.w2' + (shift ? '.accent' : '')),
        key(sym ? 'ABC' : '#+=', () => { sym = !sym; build(true); audio.play('toggle'); }, '.w2'),
        key('Espace', () => type(' '), '.w3'),
        key(h('span.icw', { html: icon('close') }), del, '.w2'),
        key('Valider', done, '.w2.accent')));
    box.querySelector('.osk-row:last-child .key:first-child .icw')?.style.setProperty('transform', 'rotate(-90deg)');
    if (idx >= 0) nav.focus(box.querySelectorAll('[data-f]')[idx], { silent: true, instant: true });
  }
  input.setRaw(e => {
    if (nav.top !== layer) return false;
    if (e.key === 'Enter') { done(); return true; }
    if (e.key === 'Backspace') { del(); return true; }
    if (e.key.length === 1) { text = text.length < maxLength ? text + e.key : text; paint(); audio.play('key'); return true; }
    return false;
  });
  build(); paint();
  root.classList.add('in');
  document.getElementById('app').append(root);
  nav.push(layer);
  renderHints();
  audio.play('open');
  return layer;
}
