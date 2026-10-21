// Floating party indicator: who is in the voice group, who is talking, microphone and connection state.
import { h, icon, art, img } from './ui.js';
import { social } from './social.js';
import { voice } from './rtc.js';
import { net } from './net.js';
import { session } from './session.js';

const el = h('button#party-hud.hidden', { type: 'button', 'data-action': 'gamebase', 'aria-label': 'Ouvrir le groupe' });
const conn = h('div#conn-hud.hidden', { role: 'status' });
document.getElementById('hud').append(el, conn);

function render() {
  const p = social.party;
  el.classList.toggle('hidden', !p);
  if (p) {
    el.replaceChildren(
      h('span.icw.ph-ic', { html: icon(voice.active ? (voice.muted ? 'micOff' : 'mic') : 'party') }),
      h('div.ph-avs', p.members.slice(0, 5).map(m => h(`div.avatar.speak${m.online ? '' : '.away'}`, { 'data-uid': m.id === session.current?.id ? 'me' : m.id, title: m.psn }, img(art.thumb(m.avatar))))),
      h('span.ph-txt', voice.active ? (voice.muted ? 'Micro coupé' : `${p.members.length} en vocal`) : `Groupe · ${p.members.length}`));
  }
  const s = net.status;
  const show = session.online && (s === 'reconnecting' || s === 'connecting');
  conn.classList.toggle('hidden', !show);
  conn.replaceChildren(h('span.btn-spin'), 'Reconnexion au serveur…');
}
social.on('party', render);
social.on('status', render);
voice.on('change', render);
voice.on('levels', lv => {
  document.querySelectorAll('[data-uid]').forEach(a => {
    const v = lv[a.dataset.uid] || 0;
    a.classList.toggle('talking', v > .12);
  });
});
document.addEventListener('session:change', render);
render();
