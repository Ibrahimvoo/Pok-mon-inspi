// Friends, presence, parties (voice groups), invitations and game sessions, backed by the realtime server.
import { net } from './net.js';
import { voice, VoiceError } from './rtc.js';
import { session } from './session.js';
import { p2p } from './p2p.js';
import { byId } from './data.js';
import { owns, installed, state } from './state.js';
import { audio } from './audio.js';
import { input } from './input.js';
import { toast, dialog, go, navExtras, saveNav } from './shell.js';
import { h, icon, art, img } from './ui.js';

const events = new EventTarget();
const emit = (t, d) => events.dispatchEvent(new CustomEvent(t, { detail: d }));

export const social = {
  friends: [], incoming: [], outgoing: [], party: null, loaded: false, error: null,
  presence: new Map(),
  on(type, fn) { const h2 = e => fn(e.detail); events.addEventListener(type, h2); return () => events.removeEventListener(type, h2); },
  get available() { return session.online || p2p.active; },
  get salon() { return p2p.active ? p2p : null; },
  get me() { return session.current; },

  async refresh() {
    if (!session.online) { emit('friends', this); return; }
    try {
      const r = await net.api('/api/friends');
      this.friends = r.friends; this.incoming = r.incoming; this.outgoing = r.outgoing;
      r.friends.forEach(f => { if (f.presence) this.presence.set(f.id, f.presence); });
      this.loaded = true; this.error = null;
    } catch (e) { this.error = e.message; }
    emit('friends', this);
  },
  presenceOf(id) { return this.presence.get(id) || { online: false }; },
  friend(id) { return this.friends.find(f => f.id === id); },
  async request(psn) { const r = await net.api('/api/friends/request', { method: 'POST', body: { psn } }); await this.refresh(); return r; },
  async respond(id, accept) { await net.api('/api/friends/respond', { method: 'POST', body: { id, accept } }); await this.refresh(); },
  async remove(id) { await net.api(`/api/friends/${encodeURIComponent(id)}`, { method: 'DELETE' }); await this.refresh(); },
  async search(q) { return (await net.api(`/api/users/search?q=${encodeURIComponent(q)}`)).users; },

  setPresence(activity, game = null) { this._presence = { activity, game }; net.send('presence', this._presence); },

  // ------------------------------------------------------------ parties & calls
  // ------------------------------------------------------------ rooms by code (no server needed)
  async createSalon(code) { await p2p.create(code); await this.joinVoice(); return p2p.code; },
  // after iOS reloaded the page: reopen the same room (host) or reconnect to it (guest)
  async restoreSalon({ code, host }) {
    try { if (host) await p2p.create(code); else await p2p.join(code); toast({ title: 'Salon rétabli', sub: `Code ${p2p.code}`, icon: 'party', sound: null, log: false }); }
    catch (e) { toast({ title: 'Salon perdu', sub: e.message, icon: 'party', sound: 'error', log: false }); }
  },
  async joinSalon(code) { await p2p.join(code); await this.joinVoice(); },
  async shareSalon() {
    if (!p2p.active) return;
    const text = `Rejoins mon salon sur la console : code ${p2p.code}`;
    try { if (navigator.share) { await navigator.share({ title: 'Salon PS5', text, url: p2p.link }); return; } } catch (e) { if (e?.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(p2p.link); toast({ title: 'Lien copié', sub: `Envoyez-le à votre ami · code ${p2p.code}`, icon: 'party', log: false }); }
    catch { dialog({ title: `Code du salon : ${p2p.code}`, body: h('div', 'Envoyez ce lien à votre ami :', h('div.salon-link', p2p.link)), actions: [{ label: 'OK', primary: true }] }); }
  },
  async invite(friendId, kind = 'party') {
    const r = await net.req('party.invite', { to: friendId, kind });
    if (!voice.active) await this.joinVoice();
    return r;
  },
  async call(friendId) { return this.invite(friendId, 'call'); },
  async createParty() { await net.req('party.create'); await this.joinVoice(); },
  async join(partyId, { withVoice = true } = {}) {
    await net.req('party.join', { partyId });
    if (withVoice) await this.joinVoice();
  },
  async joinVoice() {
    if (!state.settings.voiceAllowed) { voiceError(new Error('Le chat vocal est désactivé par le contrôle parental (Paramètres › Famille et contrôle parental).')); return; }
    try {
      await voice.join(this.me.id);
      // the roster may have arrived while the microphone was opening: connect to everyone already in voice
      voice.sync(this.party);
    } catch (e) { voiceError(e); }
  },
  async leave() {
    voice.leave();
    if (p2p.active) { p2p.leave(); this.party = null; emit('party', null); return; }
    await net.req('party.leave').catch(() => {}); this.party = null; emit('party', null);
  },
  decline(partyId, kind) { net.send('party.decline', { partyId, kind }); },
  chat(text) { net.send('chat', { text }); },
  startGame(game) { if (this.party) net.req('game.start', { game }).catch(() => {}); },
  stopGame() { if (this.party?.game) net.send('game.stop'); },
  sendGame(x, y, p) { net.send('g', { x, y, p }); },
};

function voiceError(e) {
  const msg = e instanceof VoiceError ? e.message : e?.message || 'Le chat vocal n’a pas pu démarrer.';
  dialog({ title: 'Micro indisponible', body: h('div', msg, h('div.sim-note', h('span.icw', { html: icon('info') }), 'Vous restez dans le groupe et pouvez discuter par écrit.')), actions: [{ label: 'OK', primary: true }] });
}

// ---------------------------------------------------------------- incoming invitations / calls
let ringing = null;
function incoming({ kind, from, party }) {
  if (ringing) ringing.close(null);
  const game = party.game ? byId[party.game.id] : null;
  const isCall = kind === 'call' && !game;
  const title = isCall ? `${from.psn} vous appelle` : game ? `${from.psn} vous invite à jouer à ${game.title}` : `${from.psn} vous invite dans son groupe`;
  let ringTimer = 0, timeout = 0;
  const stop = () => { clearInterval(ringTimer); clearTimeout(timeout); ringing = null; };
  const d = dialog({
    title,
    body: h('div.call-card', h('div.avatar.call-av', img(art.thumb(from.avatar))), h('div', h('div.call-name', from.psn),
      h('div.call-sub', isCall ? 'Appel vocal · le micro et le haut-parleur de l’appareil seront utilisés' : `Groupe de ${party.size} joueur${party.size > 1 ? 's' : ''}${game ? ' · session de jeu' : ''}`))),
    actions: [
      { label: isCall ? 'Répondre' : 'Rejoindre', icon: isCall ? 'phone' : 'party', primary: true, onok: async () => {
        stop();
        try {
          await social.join(party.id);
          if (game) joinGame(game.id);
        } catch (e) { toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); }
      } },
      { label: 'Refuser', icon: 'phoneOff', sound: 'back', onok: () => { stop(); social.decline(party.id, kind); } },
    ],
    onClose: stop,
  });
  d.root.classList.add('incoming');
  ringing = d;
  audio.play('ring'); input.rumble(.6, .6, 300);
  ringTimer = setInterval(() => { audio.play('ring'); input.rumble(.4, .4, 200); }, 2600);
  timeout = setTimeout(() => { if (ringing === d) { d.close(null); social.decline(party.id, kind); toast({ title: 'Appel manqué', sub: from.psn, img: art.thumb(from.avatar), sound: 'error' }); } }, 40000);
}

// opening a game launched by someone else in the party
export async function joinGame(gameId) {
  const g = byId[gameId];
  const { launch } = await import('./screens/game.js');
  const { openProduct, startDownload } = await import('./actions.js');
  if (!owns(gameId)) {
    dialog({ title: `Vous ne possédez pas ${g.title}`, body: 'Achetez le jeu dans le PlayStation Store pour rejoindre cette session.', actions: [{ label: 'Voir dans le PlayStation Store', primary: true, onok: () => openProduct(gameId) }, { label: 'Fermer', sound: 'back' }] });
  } else if (!installed(gameId)) {
    dialog({ title: `${g.title} n’est pas installé`, body: 'Téléchargez le jeu pour rejoindre vos amis.', actions: [{ label: 'Télécharger', icon: 'download', primary: true, onok: () => startDownload(gameId) }, { label: 'Fermer', sound: 'back' }] });
  } else launch(gameId);
}

// ---------------------------------------------------------------- server events
net.on('hello', m => {
  m.friends.forEach(p => social.presence.set(p.id, p));
  social.party = m.party;
  if (social._presence) net.send('presence', social._presence);
  voice.sync(m.party);
  emit('party', m.party);
  social.refresh();
});
net.on('presence', p => {
  const before = social.presence.get(p.id);
  social.presence.set(p.id, p);
  emit('presence', p);
  const f = social.friend(p.id);
  if (f && p.online && before && !before.online) toast({ title: `${f.psn} est en ligne`, img: art.thumb(f.avatar), sound: null, log: false });
});
net.on('friends', () => social.refresh());
net.on('friend.request', m => { toast({ title: 'Nouvelle demande d’ami', sub: `${m.from.psn} souhaite vous ajouter`, img: art.thumb(m.from.avatar) }); social.refresh(); });
net.on('friend.accepted', m => { toast({ title: 'Demande d’ami acceptée', sub: `${m.by.psn} fait maintenant partie de vos amis`, img: art.thumb(m.by.avatar) }); social.refresh(); });
net.on('invite', incoming);
net.on('declined', m => toast({ title: m.kind === 'call' ? 'Appel refusé' : 'Invitation refusée', sub: m.by.psn, img: art.thumb(m.by.avatar), sound: 'error', log: false }));
net.on('party', m => {
  const prev = social.party;
  social.party = m.party;
  navExtras.party = !!m.party; saveNav();
  voice.sync(m.party);
  if (!m.party && prev && m.reason === 'disconnected') toast({ title: 'Groupe quitté', sub: 'Connexion perdue trop longtemps', icon: 'party', sound: 'error' });
  if (m.party && prev) {
    const joined = m.party.members.filter(x => !prev.members.some(y => y.id === x.id));
    joined.forEach(x => { if (x.id !== social.me?.id) { audio.play('join'); toast({ title: `${x.psn} a rejoint le groupe`, img: art.thumb(x.avatar), sound: null, log: false }); } });
  }
  emit('party', m.party);
});
net.on('chat', m => {
  if (!social.party || social.party.id !== m.partyId) return;
  social.party.chat.push(m.msg);
  emit('chat', m.msg);
  if (m.msg.from !== social.me?.id && !document.querySelector('.gamebase.party-open')) toast({ title: m.msg.psn, sub: m.msg.text, icon: 'chat', sound: 'notify', log: false });
});
net.on('game.started', m => {
  const g = byId[m.game];
  dialog({ title: `${m.by.psn} a lancé ${g.title}`, body: 'Rejoignez la session de jeu de votre groupe.', actions: [
    { label: 'Rejoindre la partie', icon: 'play', primary: true, onok: () => joinGame(m.game) },
    { label: 'Plus tard', sound: 'back' },
  ] });
});
net.on('g', m => emit('g', m));
net.on('salon', m => { if (m.error) { voice.leave({ notify: false }); toast({ title: 'Salon', sub: m.error, icon: 'party', sound: 'error' }); } });
// a shared link (…#salon=CODE) opens the room directly once someone is signed in
export function checkSalonLink() {
  const code = (location.hash.match(/salon=([A-Za-z0-9]{6})/) || [])[1];
  if (!code || !session.current || p2p.code === code.toUpperCase()) return;
  history.replaceState(null, '', location.pathname + location.search);
  dialog({ title: `Rejoindre le salon ${code.toUpperCase()} ?`, body: 'Un ami vous invite à jouer et discuter en vocal. Le micro de l’appareil sera utilisé (pas besoin de casque).', actions: [
    { label: 'Rejoindre', icon: 'party', primary: true, onok: async () => { try { await social.joinSalon(code); toast({ title: 'Salon rejoint', sub: `Code ${code.toUpperCase()}`, icon: 'party', log: false }); } catch (e) { toast({ title: 'Impossible de rejoindre', sub: e.message, icon: 'party', sound: 'error', log: false }); } } },
    { label: 'Annuler', sound: 'back' }] });
}
addEventListener('hashchange', checkSalonLink);
voice.on('change', d => { navExtras.voice = !!d.joined; saveNav(); });
net.on('rtc', m => voice.handleSignal(m));
net.on('status', s => emit('status', s));
net.on('auth', () => {
  if (!session.current?.online) return;
  voice.leave({ notify: false });
  toast({ title: 'Session expirée', sub: 'Reconnectez-vous pour retrouver vos amis', icon: 'user', sound: 'error' });
  import('./screens/account.js').then(m => go(m.accountScreen, { mode: 'login', psn: session.current?.psn }));
});
