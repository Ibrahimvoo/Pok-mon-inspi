// Floating video panel of the voice call: my camera preview, the friends' cameras and the shared gameplay / screen,
// with the camera (on/off, front/back) and share buttons. Lives in the HUD, above every screen and the game.
import { h, icon } from './ui.js';
import { voice } from './rtc.js';
import { social } from './social.js';
import { toast } from './shell.js';
import { audio } from './audio.js';

const ICONS = {
  cam: '<path d="M3.5 7.5h11v9h-11z"/><path d="m14.5 10.5 6-3.5v10l-6-3.5"/>',
  camOff: '<path d="M3.5 7.5h11v9h-11z"/><path d="m14.5 10.5 6-3.5v10l-6-3.5"/><path d="M3 3l18 18"/>',
  flip: '<path d="M4 9a8 8 0 0 1 14.5-3.5M20 15a8 8 0 0 1-14.5 3.5"/><path d="M18.5 2.5v3.5H15M5.5 21.5V18H9"/>',
  share: '<rect x="3" y="4.5" width="18" height="12" rx="1.6"/><path d="M8.5 20h7M12 16.5V20M12 13V8M9.5 10.5 12 8l2.5 2.5"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="1.5"/>',
  min: '<path d="M6 12h12"/>',
};
const ic = (name, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>${extra}`;

const dock = h('div#video-dock.hidden', { role: 'region', 'aria-label': 'Vidéo de l’appel' });
const bar = h('div.vd-bar');
const tilesEl = h('div.vd-tiles');
dock.append(bar, tilesEl);
// a tile touched is shown large in its own layer (tap again, or on the backdrop, to close)
const bigEl = h('div#video-big.hidden', { onclick: () => { big = null; render(); } });
document.getElementById('hud').append(dock, bigEl);

let tiles = [], minimized = false, twoCams = false, big = null;
const nameOf = id => id === 'me' ? 'Vous' : social.party?.members.find(m => m.id === id)?.psn || 'Ami';

async function run(fn) {
  try { await fn(); }
  catch (e) { toast({ title: 'Vidéo', sub: e?.message || 'Action impossible.', icon: 'info', sound: 'error', log: false }); }
  render();
}
function button(name, label, onclick, { on = false, danger = false } = {}) {
  return h(`button.vd-btn${on ? '.on' : ''}${danger ? '.danger' : ''}`, { type: 'button', title: label, 'aria-label': label, html: ic(name), onclick: e => { e.stopPropagation(); audio.play('ok'); onclick(); } });
}

function renderBar() {
  const items = [];
  if (voice.camera) {
    items.push(button('camOff', 'Couper la caméra', () => run(() => voice.setCamera(false)), { on: true }));
    if (twoCams) items.push(button('flip', voice.facing === 'user' ? 'Caméra arrière' : 'Caméra avant', () => run(() => voice.flipCamera())));
  } else items.push(button('cam', 'Activer la caméra', () => run(() => voice.setCamera(true))));
  if (voice.sharing) items.push(button('stop', 'Arrêter le partage', () => run(() => voice.stopShare()), { danger: true }));
  else if (voice.canShareGame) items.push(button('share', 'Partager la partie', () => run(() => voice.startShare('game'))));
  else if (voice.canShareScreen) items.push(button('share', 'Partager l’écran', () => run(() => voice.startShare('screen'))));
  if (tiles.length) items.push(button('min', minimized ? 'Afficher la vidéo' : 'Réduire la vidéo', () => { minimized = !minimized; render(); }));
  bar.replaceChildren(...items);
  bar.classList.toggle('busy', voice.busy);
}

// a <video> per stream, reused between renders so the picture does not flicker
const videos = new Map();
function videoFor(key, stream, mirror) {
  let v = videos.get(key);
  if (!v) {
    v = document.createElement('video');
    v.muted = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
    videos.set(key, v);
  }
  if (v.srcObject !== stream) { v.srcObject = stream; v.play().catch(() => {}); }
  v.classList.toggle('mirror', !!mirror);
  return v;
}

function renderTiles() {
  const keys = new Set();
  tilesEl.replaceChildren(...tiles.map(t => {
    const key = `${t.id}:${t.kind}`; keys.add(key);
    const label = t.kind === 'cam' ? nameOf(t.id) : t.mine ? `Vous partagez ${t.share === 'game' ? 'la partie' : 'l’écran'}` : `${nameOf(t.id)} · ${t.share === 'game' ? 'partie' : 'écran'}`;
    const body = t.stream ? videoFor(key, t.stream, t.mine && t.kind === 'cam' && t.facing === 'user')
      : h('div.vd-local-share', h('span', { html: ic('share') }), h('b', 'Partage en cours'), h('small', 'Vos amis voient votre partie'));
    const el = h(`div.vd-tile.${t.kind}${big === key ? '.shown-big' : ''}${t.state && t.state !== 'connected' ? '.weak' : ''}`, {
      onclick: () => { if (!t.stream) return; big = big === key ? null : key; render(); },
    }, body, h('div.vd-label', t.mine ? h('i.vd-live') : null, label),
      t.state === 'reconnecting' ? h('div.vd-state', 'Connexion instable…') : null);
    return el;
  }));
  // streams that are gone: release the elements
  for (const [k, v] of videos) if (!keys.has(k) && !k.endsWith('#big')) { v.srcObject = null; videos.delete(k); }
  if (big && !keys.has(big)) big = null;
  const t = big && tiles.find(x => `${x.id}:${x.kind}` === big);
  bigEl.classList.toggle('hidden', !t);
  if (t) bigEl.replaceChildren(h(`div.vd-big.${t.kind}`, videoFor(big + '#big', t.stream, t.mine && t.kind === 'cam' && t.facing === 'user'), h('div.vd-label', tilesEl.querySelector('.shown-big .vd-label')?.textContent || '')));
  else { bigEl.replaceChildren(); for (const [k, v] of videos) if (k.endsWith('#big')) { v.srcObject = null; videos.delete(k); } }
}

function render() {
  const show = voice.active || tiles.length;
  dock.classList.toggle('hidden', !show);
  if (!show) { big = null; bigEl.classList.add('hidden'); bigEl.replaceChildren(); tilesEl.replaceChildren(); for (const v of videos.values()) v.srcObject = null; videos.clear(); return; }
  dock.classList.toggle('min', minimized);
  renderBar();
  renderTiles();
}

voice.on('media', async list => {
  tiles = list; render();
  // the list of cameras is only complete once one has been allowed
  if (voice.camera && !twoCams) { twoCams = await voice.hasTwoCameras(); if (twoCams) render(); }
});
voice.on('change', async () => {
  if (voice.active) twoCams = await voice.hasTwoCameras();
  render();
});
voice.on('error', msg => toast({ title: 'Appel', sub: msg, icon: 'info', sound: 'error', log: false }));
document.addEventListener('pf:share', render);   // a game started or stopped: the share button changes
render();
export const videoDock = { render };
