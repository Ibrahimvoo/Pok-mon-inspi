// Messages: the list of conversations (Game Base tab) and a conversation, with text, voice messages, quick replies,
// a call (or a group call) and, for a group, its name, its members and leaving it.
import { h, icon, art, img, ago } from '../ui.js';
import { go, menu, toast, dialog, confirmDialog } from '../shell.js';
import { nav } from '../nav.js';
import { input } from '../input.js';
import { audio } from '../audio.js';
import { session } from '../session.js';
import { social } from '../social.js';
import { messages, convName, preview, fmtDur } from '../messages.js';
import { openKeyboard } from '../keyboard.js';

const PADS = ['ps', 'xbox', 'nintendo', 'generic'];
const QUICK = ['Salut !', 'On joue ?', 'J’arrive !', 'Ok 👍', 'Plus tard'];
const fail = (title, e) => toast({ title, sub: e?.message || 'Action impossible.', icon: 'chat', sound: 'error', log: false });

export const openChat = c => go(chatScreen, { id: c.id });
function convAvatar(c) {
  const o = c.members.filter(m => m.id !== session.current?.id);
  if (c.kind === 'dm' || o.length < 2) return h('div.avatar', img(art.thumb(o[0]?.avatar)));
  return h('div.msg-group-av', o.slice(0, 2).map(m => h('div.avatar', img(art.thumb(m.avatar)))));
}

// ------------------------------------------------------------ choosing friends (new group, adding members)
export function pickFriends({ title, exclude = [], max = messages.maxGroup - 1, onDone }) {
  const list = social.friends.filter(f => !exclude.includes(f.id));
  if (!list.length) { toast({ title: 'Aucun ami à ajouter', sub: 'Ajoutez des amis dans la Base de jeu', icon: 'friends', sound: 'error', log: false }); return; }
  const chosen = new Set();
  const rows = list.map(f => {
    const row = h('div.gb-row.pick', { f: true, onok: () => {
      if (chosen.has(f.id)) chosen.delete(f.id);
      else if (chosen.size < max) chosen.add(f.id);
      else { audio.play('error'); return; }
      row.classList.toggle('on', chosen.has(f.id)); audio.play('toggle');
    } }, h('div.gb-av', h('div.avatar', img(art.thumb(f.avatar)))), h('div.grow', h('div.gb-name', f.psn)), h('span.icw.pick-check', { html: icon('check') }));
    return row;
  });
  dialog({ title, wide: true, body: h('div.pick-list', { 'data-scroll': 'y' }, rows),
    actions: [{ label: 'Valider', primary: true, onok: () => { const sel = list.filter(f => chosen.has(f.id)); if (sel.length) onDone(sel); } }, { label: 'Annuler', sound: 'back' }] });
}
function askName(title, value, onDone) {
  if (PADS.includes(input.device)) { openKeyboard({ title, value, maxLength: 40, onDone }); return; }
  const inp = h('input.f-input', { type: 'text', value, maxLength: 40, placeholder: 'Ex : Les Gaulmont', enterkeyhint: 'done', 'aria-label': title });
  const d = dialog({ title, body: h('div.f-row', inp), actions: [{ label: 'Valider', primary: true, onok: () => onDone(inp.value) }, { label: 'Annuler', sound: 'back' }] });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); d.close(null); onDone(inp.value); } });
  setTimeout(() => inp.focus(), 50);
}
export function newGroup() {
  pickFriends({ title: 'Nouveau groupe : choisissez vos amis', onDone: sel => askName('Nom du groupe (facultatif)', '', name => {
    try { const c = messages.createGroup(sel, name); messages.askNotifications(); openChat(c); } catch (e) { fail('Groupe impossible', e); }
  }) });
}
function newMessage(anchor) {
  if (!social.friends.length) { toast({ title: 'Aucun ami pour le moment', sub: 'Ajoutez des amis pour leur écrire', icon: 'friends', sound: 'error', log: false }); return; }
  menu([...social.friends].sort((a, b) => a.psn.localeCompare(b.psn)).slice(0, 30).map(f => ({ label: f.psn, icon: 'chat', onok: () => openChat(messages.direct(f)) })), anchor);
}

// ------------------------------------------------------------ the Game Base tab
export function messagesView() {
  const list = messages.list;
  const actions = h('div.gb-controls', { 'data-row': '' },
    h('button.btn.primary', { f: true, 'data-key': 'new-msg', onok: e => newMessage(e.currentTarget) }, h('span.icw', { html: icon('chat') }), 'Nouveau message'),
    h('button.btn', { f: true, 'data-key': 'new-group', onok: newGroup }, h('span.icw', { html: icon('friends') }), 'Nouveau groupe'));
  if (!list.length) return h('div', actions, h('div.gb-empty', h('div.gb-empty-ic', { html: icon('chat') }), h('h2', 'Aucune conversation'),
    h('p', 'Écrivez à un ami ou créez un groupe : messages écrits et vocaux, et une notification quand on vous répond. Un ami hors ligne recevra vos messages à sa prochaine connexion.')));
  return h('div', actions, h('div.gb-list', list.map(c => {
    const last = c.msgs[c.msgs.length - 1];
    const mine = last && last.from === session.current?.id && !last.sys;
    return h(`div.gb-row${c.unread ? '.unread' : ''}`, { f: true, 'data-key': 'c-' + c.id, onok: () => openChat(c) },
      h('div.gb-av', convAvatar(c)),
      h('div.grow', h('div.gb-name', convName(c), c.kind === 'group' ? h('small.gb-code-tag', ` · ${c.members.length} membres`) : null),
        h('div.gb-sub', last ? `${mine ? 'Vous : ' : c.kind === 'group' && !last.sys ? last.psn + ' : ' : ''}${preview(last)} · ${ago(last.at).toLowerCase()}` : 'Nouvelle conversation')),
      c.unread ? h('span.msg-badge', c.unread) : null);
  })));
}

// ------------------------------------------------------------ a conversation
export function chatScreen({ id }) {
  let draft = '', typing = false, recTimer = 0, layer = null;
  const title = h('h1'), sub = h('span.gb-sub');
  const body = h('div.page.chat-page', { 'data-scroll': 'y', 'data-pad': 160 });
  const root = h('div.gamebase.chat-screen', h('div.page-head', h('span.icw', { html: icon('chat') }), h('div.chat-title', title, sub)), body);
  const c0 = messages.conv(id);

  function callAll(c) {
    const on = c.members.filter(m => m.id !== session.current?.id && social.presenceOf(m.id).online);
    if (!on.length) { toast({ title: 'Personne n’est en ligne', sub: 'Vos messages leur parviendront à leur prochaine connexion', icon: 'phone', sound: 'error', log: false }); return; }
    audio.play('ok');
    (async () => {
      for (const m of on) { try { await social.invite(m.id, c.kind === 'dm' ? 'call' : 'party'); } catch (e) { fail(`Appel de ${m.psn}`, e); } }
      toast({ title: c.kind === 'dm' ? `Appel de ${on[0].psn}…` : `Vocal de groupe : ${on.length} invité${on.length > 1 ? 's' : ''}`, icon: 'phone', sound: null, log: false });
    })();
  }
  function groupMenu(c, anchor) {
    menu([
      { label: 'Renommer le groupe', icon: 'settings', onok: () => askName('Nouveau nom du groupe', c.name || '', v => { messages.rename(c, v); render(); }) },
      c.members.length < messages.maxGroup ? { label: 'Ajouter des amis', icon: 'userPlus', onok: () => pickFriends({ title: 'Ajouter au groupe', exclude: c.members.map(m => m.id), max: messages.maxGroup - c.members.length, onDone: sel => messages.addMembers(c, sel) }) } : null,
      { label: `Membres (${c.members.length}) : ${c.members.map(m => m.psn).join(', ')}`.slice(0, 90), icon: 'friends', onok: () => {} },
      { label: 'Quitter le groupe', icon: 'trash', onok: () => confirmDialog(`Quitter « ${convName(c)} » ?`, 'Vous ne recevrez plus les messages de ce groupe.', 'Quitter', () => { messages.leave(c); layer.back(); }, { danger: true }) },
    ].filter(Boolean), anchor);
  }
  function bubble(c, m) {
    if (m.sys) return h('div.chat-sys.msg-sys', m.text);
    const mine = m.from === session.current?.id;
    const status = mine ? (m.wait?.length ? (m.got ? 'Distribué à une partie du groupe' : 'En attente de distribution') : 'Distribué') : '';
    const content = m.voice
      ? h(`button.msg-voice${messages.playing === m.id ? '.on' : ''}`, { f: true, 'data-key': 'v-' + m.id, onok: async () => {
        if (messages.playing === m.id) { messages.stopPlaying(); return; }
        try { await messages.play(m); } catch (e) { fail('Message vocal', e); }
      } }, h('span.icw', { html: icon(messages.playing === m.id ? 'close' : 'play') }), h('span.msg-wave'), h('span', fmtDur(m.voice.dur)))
      : h('div.msg-text', m.text);
    return h(`div.msg${mine ? '.mine' : ''}`,
      !mine ? h('div.avatar.msg-av', img(art.thumb(m.avatar))) : null,
      h('div.msg-bubble', !mine && c.kind === 'group' ? h('b.msg-from', m.psn) : null, content,
        h('div.msg-meta', new Date(m.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), status ? ' · ' + status : '')));
  }
  function render() {
    const c = messages.conv(id);
    if (!c) { body.replaceChildren(h('div.gb-empty', h('h2', 'Conversation fermée'), h('p', 'Cette conversation n’existe plus sur cette console.'))); return; }
    messages.read(c);
    const key = layer?.focused?.dataset.key;
    const o = c.members.filter(m => m.id !== session.current?.id);
    title.textContent = convName(c);
    sub.textContent = c.kind === 'dm'
      ? (social.presenceOf(o[0]?.id).online ? 'En ligne' : 'Hors ligne · recevra vos messages à sa prochaine connexion')
      : `${c.members.length} membres · ${o.filter(m => social.presenceOf(m.id).online).length} en ligne`;
    const rec = messages.recording;
    const controls = h('div.gb-controls', { 'data-row': '' },
      h('button.btn', { f: true, 'data-key': 'call', onok: () => callAll(c) }, h('span.icw', { html: icon('phone') }), c.kind === 'dm' ? 'Appel vocal' : 'Vocal de groupe'),
      c.kind === 'group' ? h('button.btn', { f: true, 'data-key': 'rename', onok: () => askName('Nouveau nom du groupe', c.name || '', v => { messages.rename(c, v); render(); }) }, h('span.icw', { html: icon('settings') }), 'Renommer') : null,
      c.kind === 'group' ? h('button.btn', { f: true, 'data-key': 'group', onok: e => groupMenu(c, e.currentTarget) }, h('span.icw', { html: icon('more') }), 'Groupe')
        : h('button.btn', { f: true, 'data-key': 'del', onok: () => confirmDialog('Supprimer la conversation ?', 'Elle sera effacée de cette console uniquement.', 'Supprimer', () => { messages.remove(c); layer.back(); }, { danger: true }) }, h('span.icw', { html: icon('trash') }), 'Supprimer'));
    const list = h('div.msg-list', { 'data-scroll': 'y' }, c.msgs.length ? c.msgs.map(m => bubble(c, m)) : h('div.chat-sys', 'Aucun message pour l’instant. Dites bonjour !'));
    const inp = h('input.chat-input', { type: 'text', value: draft, maxLength: 500, placeholder: 'Écrire un message…', enterkeyhint: 'send', 'aria-label': 'Message' });
    const send = v => { if (!String(v).trim()) return; messages.askNotifications(); messages.send(c, v); draft = ''; audio.play('ok'); };
    inp.addEventListener('input', () => { draft = inp.value; });
    inp.addEventListener('focus', () => { typing = true; });
    inp.addEventListener('blur', () => { setTimeout(() => { if (!document.activeElement?.classList.contains('chat-input')) typing = false; }, 0); });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); send(inp.value); } });
    if (typing) setTimeout(() => inp.focus({ preventScroll: true }), 0);
    const write = h('div.f-row.chat-row', { f: true, 'data-key': 'write', onok: () => {
      if (PADS.includes(input.device)) openKeyboard({ title: `Message à ${convName(c)}`, maxLength: 500, onDone: send });
      else inp.focus();
    } }, inp);
    const voiceRow = h('div.gb-controls.msg-rec', { 'data-row': '' }, rec === null
      ? h('button.btn', { f: true, 'data-key': 'rec', onok: async () => {
        messages.askNotifications();
        try { await messages.startRecording(); audio.play('ok'); } catch (e) { fail('Micro indisponible', e); }
      } }, h('span.icw', { html: icon('mic') }), 'Message vocal')
      : [h('button.btn.primary.rec-on', { f: true, 'data-key': 'rec-send', onok: async () => { try { await messages.sendRecording(c); audio.play('ok'); } catch (e) { fail('Message vocal', e); } } },
        h('i.rec-dot'), h('span.rec-time', fmtDur(rec)), 'Envoyer'),
      h('button.btn', { f: true, 'data-key': 'rec-cancel', onok: () => { messages.cancelRecording(); audio.play('back'); } }, h('span.icw', { html: icon('close') }), 'Annuler')]);
    body.replaceChildren(controls, list,
      h('div.chips', { 'data-row': '' }, QUICK.map((q, i) => h('button.chip', { f: true, 'data-key': 'q' + i, onok: () => send(q) }, q))),
      voiceRow, write);
    setTimeout(() => { list.scrollTop = list.scrollHeight; }, 0);
    if (layer && nav.top === layer) {
      const el = key && root.querySelector(`[data-key="${CSS.escape(key)}"]`);
      if (el) nav.focus(el, { silent: true, instant: true });
      else if (!layer.focused?.isConnected) nav.focusFirst(layer);
    }
  }
  const offs = [];
  layer = {
    root, mood: 'home', bg: null, shade: 1, dim: .6,
    hints: [['ok', 'Sélectionner'], ['back', 'Retour']],
    onEnter() {
      messages.openConv = id;
      offs.push(messages.on('change', render),
        messages.on('play', render), messages.on('rec', render),
        messages.on('recmax', async () => { const c = messages.conv(id); if (c) { try { await messages.sendRecording(c); toast({ title: 'Message vocal envoyé', sub: 'Durée maximale : 1 minute', icon: 'mic', sound: null, log: false }); } catch (e) { fail('Message vocal', e); } } }),
        social.on('presence', render), social.on('friends', render));
      recTimer = setInterval(() => { const t = root.querySelector('.rec-time'), r = messages.recording; if (t && r !== null) t.textContent = fmtDur(r); }, 250);
    },
    onLeave() {
      if (messages.openConv === id) messages.openConv = null;
      offs.forEach(f => f()); offs.length = 0; clearInterval(recTimer);
      if (messages.recording !== null) messages.cancelRecording();
      messages.stopPlaying();
    },
  };
  render();
  (body.querySelector('[data-key="write"]') || body.querySelector('[data-f]'))?.setAttribute('data-autofocus', '');
  if (!c0) setTimeout(() => layer.back(), 0);
  return layer;
}
