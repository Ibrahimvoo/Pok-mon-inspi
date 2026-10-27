// Messages: private conversations with a friend and named groups, text and voice messages, with a notification when
// one arrives. Conversations are kept on the device, per profile (voice messages in IndexedDB). A message goes
// straight to each recipient (peer to peer without a server, relayed by the realtime server with an account); a
// recipient who is offline gets it as soon as they come back online, until they acknowledge it.
import { session } from './session.js';
import { net } from './net.js';
import { pfriends } from './friends.js';
import { voice } from './rtc.js';
import { audio } from './audio.js';
import { toast } from './shell.js';
import { art } from './ui.js';

const MAX_MSGS = 200, MAX_GROUP = 8, MAX_VOICE_S = 60, MAX_DATA = 190000, RETRY = 8000;
const events = new EventTarget();
const emit = (t, d) => events.dispatchEvent(new CustomEvent(t, { detail: d }));
const str = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const who = u => ({ id: str(u.id, 64), psn: str(u.psn, 16) || 'Joueur', avatar: str(u.avatar, 40) });

// ---------------------------------------------------------------- storage (per profile)
const KEY = id => `ps5ux.msgs.${id}`;
let me = null, db = { convs: {}, pending: {} };
function load(id) {
  try { const v = JSON.parse(localStorage.getItem(KEY(id))); if (v?.convs) return { convs: v.convs, pending: v.pending || {} }; } catch { /* empty */ }
  return { convs: {}, pending: {} };
}
function save() {
  if (!me) return;
  try { localStorage.setItem(KEY(me.id), JSON.stringify(db)); } catch { /* full or private mode: kept until the page closes */ }
}
// voice messages are blobs: IndexedDB, or memory when it is unavailable
const mem = new Map();
let idb = null;
function store() {
  idb ||= new Promise(resolve => {
    try {
      const r = indexedDB.open('ps5ux-voice', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('notes');
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(null);
    } catch { resolve(null); }
  });
  return idb;
}
async function putVoice(id, blob) {
  mem.set(id, blob);
  const d = await store();
  if (d) try { d.transaction('notes', 'readwrite').objectStore('notes').put(blob, id); } catch { /* memory only */ }
}
async function getVoice(id) {
  if (mem.has(id)) return mem.get(id);
  const d = await store();
  if (!d) return null;
  return new Promise(resolve => {
    try { const r = d.transaction('notes').objectStore('notes').get(id); r.onsuccess = () => resolve(r.result || null); r.onerror = () => resolve(null); }
    catch { resolve(null); }
  });
}
async function dropVoice(ids) {
  ids.forEach(id => mem.delete(id));
  const d = await store();
  if (d) try { const s = d.transaction('notes', 'readwrite').objectStore('notes'); ids.forEach(id => s.delete(id)); } catch { /* ignore */ }
}
const toData = blob => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(blob); });
const fromData = async data => (await fetch(data)).blob();

// ---------------------------------------------------------------- conversations
const dmId = id => 'dm:' + id;
function conv(id) { return db.convs[id]; }
function others(c) { return c.members.filter(m => m.id !== me?.id); }
export function convName(c) {
  if (c.kind === 'dm') return others(c)[0]?.psn || 'Ami';
  if (c.name) return c.name;
  const o = others(c).map(m => m.psn);
  return o.length <= 2 ? o.join(' et ') || 'Groupe' : `${o.slice(0, 2).join(', ')} et ${o.length - 2} autre${o.length > 3 ? 's' : ''}`;
}
function push(c, m) {
  c.msgs.push(m);
  if (c.msgs.length > MAX_MSGS) dropVoice(c.msgs.splice(0, c.msgs.length - MAX_MSGS).filter(x => x.voice).map(x => x.id));
  c.at = m.at;
}
const descriptor = c => c.kind === 'dm' ? { kind: 'dm' } : { kind: 'group', id: c.id, name: c.name, nameAt: c.nameAt, members: c.members };
export const preview = m => m.voice ? `Message vocal (${fmtDur(m.voice.dur)})` : m.text;
export const fmtDur = s => { s = Math.round(s); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

// ---------------------------------------------------------------- transport
const peerMode = () => !session.online && pfriends.enabled;
const reachable = id => peerMode() ? pfriends.online(id) : session.online && net.status === 'online';
function transmit(to, d) {
  if (peerMode()) return pfriends.message(to, d);
  if (!net.send('dm', { to, d })) throw new Error('Hors ligne');
  return Promise.resolve();
}
const lastTry = new Map();
async function payload(c, m) {
  const out = { id: m.id, at: m.at };
  if (m.text) out.text = m.text;
  if (m.ev) out.ev = m.ev;
  if (m.voice) {
    const blob = await getVoice(m.id);
    if (!blob) return null;               // the recording is gone: nothing left to deliver
    out.voice = { dur: m.voice.dur, data: await toData(blob) };
  }
  return { k: m.sys ? 'sys' : 'msg', c: descriptor(c), m: out };
}
function enqueue(c, m) {
  m.wait = others(c).map(o => o.id);
  for (const id of m.wait) { (db.pending[id] ||= []).push({ c: c.id, m: m.id }); lastTry.delete(id); }
  save();
  flush();
}
let flushing = false;
async function flush() {
  if (flushing || !me) return;
  flushing = true;
  try {
    for (const [to, list] of Object.entries(db.pending)) {
      if (!reachable(to) || Date.now() - (lastTry.get(to) || 0) < RETRY) continue;
      lastTry.set(to, Date.now());
      for (const p of list.slice(0, 20)) {
        const c = conv(p.c), m = c?.msgs.find(x => x.id === p.m);
        const d = c && m ? await payload(c, m) : null;
        if (!d) { ack(to, [p.m]); continue; }
        try { await transmit(to, d); } catch { break; }
      }
    }
  } finally { flushing = false; }
}
// a recipient confirmed: stop sending these messages to them
function ack(from, ids) {
  const list = db.pending[from];
  if (!list) return;
  db.pending[from] = list.filter(p => !ids.includes(p.m));
  if (!db.pending[from].length) delete db.pending[from];
  for (const c of Object.values(db.convs)) for (const m of c.msgs) if (m.wait && ids.includes(m.id)) { m.wait = m.wait.filter(x => x !== from); m.got = true; }
  save();
  emit('change');
}

// ---------------------------------------------------------------- receiving
let friendOf = () => false;
async function receive(from, d) {
  if (!me || !d || typeof d !== 'object') return;
  const u = who(from);
  if (!u.id || u.id === me.id) return;
  if (d.k === 'ack') { if (Array.isArray(d.ids)) ack(u.id, d.ids.map(x => str(x, 40))); return; }
  if (d.k !== 'msg' && d.k !== 'sys') return;
  const m = d.m || {};
  const id = str(m.id, 40);
  if (!id) return;
  // whatever happens next, the sender can stop sending it
  transmit(u.id, { k: 'ack', ids: [id] }).catch(() => {});
  const c = await accept(u, d.c || {}, d.k === 'sys' && m.ev);
  if (!c || c.msgs.some(x => x.id === id)) return;
  const msg = { id, from: u.id, psn: u.psn, avatar: u.avatar, at: Math.min(Date.now(), +m.at || Date.now()) };
  if (d.k === 'sys') {
    msg.sys = true; msg.ev = str(m.ev, 10);
    msg.text = str(m.text, 120);
    if (msg.ev === 'rename' && c.kind === 'group' && (+d.c.nameAt || 0) >= (c.nameAt || 0)) { c.name = str(d.c.name, 40); c.nameAt = +d.c.nameAt || Date.now(); }
    if (msg.ev === 'leave') c.members = c.members.filter(x => x.id !== u.id);
  } else if (m.voice && typeof m.voice.data === 'string' && m.voice.data.startsWith('data:audio/') && m.voice.data.length < MAX_DATA * 1.4) {
    try { await putVoice(id, await fromData(m.voice.data)); } catch { return; }
    msg.voice = { dur: Math.min(MAX_VOICE_S, Math.max(0, +m.voice.dur || 0)) };
  } else {
    msg.text = str(m.text, 500);
    if (!msg.text) return;
  }
  push(c, msg);
  const open = messages.openConv === c.id && !document.hidden;
  if (!open) c.unread = (c.unread || 0) + 1;
  save();
  emit('change');
  emit('message', { conv: c, msg });
  if (!open) notify(c, msg);
}
// which conversation this belongs to: only friends may start one, group members may write in it
async function accept(u, desc, ev) {
  if (desc.kind !== 'group') {
    if (!friendOf(u.id)) return null;
    const id = dmId(u.id);
    let c = conv(id);
    if (!c) c = db.convs[id] = { id, kind: 'dm', members: [who(me), u], msgs: [], unread: 0, at: Date.now() };
    else c.members = [who(me), u];
    return c;
  }
  const id = str(desc.id, 40);
  if (!/^g:[a-z0-9]+$/.test(id)) return null;
  const list = Array.isArray(desc.members) ? desc.members.slice(0, MAX_GROUP).map(who).filter(x => x.id) : [];
  let c = conv(id);
  if (!c && ev === 'leave') return null;
  if (!c) {
    if (!friendOf(u.id) || !list.some(x => x.id === me.id)) return null;
    c = db.convs[id] = { id, kind: 'group', name: str(desc.name, 40), nameAt: +desc.nameAt || 0, members: list, msgs: [], unread: 0, at: Date.now() };
  } else if (!c.members.some(x => x.id === u.id) && !friendOf(u.id)) return null;
  else if (ev === 'add' || ev === 'create') c.members = list.some(x => x.id === me.id) ? list : c.members;
  if (!c.members.some(x => x.id === u.id) && ev !== 'leave') c.members.push(u);
  // a friend's new name and picture
  c.members = c.members.map(x => x.id === u.id ? u : x);
  return c;
}
let perm = false;
function notify(c, m) {
  const group = c.kind === 'group';
  const title = m.sys ? convName(c) : group ? convName(c) : `Message de ${m.psn}`;
  const sub = m.sys ? m.text : group ? `${m.psn} : ${preview(m)}` : preview(m);
  toast({ title, sub, img: art.thumb(m.avatar), sound: 'notify' });
  // the console is in the background (another tab, another app): the system notification
  if (document.hidden && perm && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try { const n = new Notification(title, { body: sub, tag: c.id, icon: art.thumb(m.avatar) }); n.onclick = () => { focus(); n.close(); }; } catch { /* not allowed here */ }
  }
}

// ---------------------------------------------------------------- recording a voice message
let rec = null;
function mimeType() {
  if (typeof MediaRecorder === 'undefined') return null;
  return ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm', 'audio/ogg;codecs=opus'].find(t => MediaRecorder.isTypeSupported?.(t)) || '';
}
async function startRecording() {
  if (rec) return;
  const type = mimeType();
  if (type === null) throw new Error('Ce navigateur ne permet pas d’enregistrer un message vocal.');
  audio.capture('voicenote', true);
  let stream = null, own = true;
  try {
    // already in a call: record the call's microphone (opening it twice fails on iOS)
    if (voice.active) { await voice.ensureLive?.(); stream = voice.captureStream?.() || null; own = !stream; }
    if (!stream) {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Le micro exige une connexion sécurisée (adresse en https://).');
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
    }
  } catch (e) {
    audio.capture('voicenote', false);
    throw e?.name === 'NotAllowedError' ? new Error('Autorisez le micro pour enregistrer un message vocal.') : e;
  }
  const r = new MediaRecorder(stream, { ...(type ? { mimeType: type } : {}), audioBitsPerSecond: 16000 });
  const chunks = [];
  r.ondataavailable = e => { if (e.data?.size) chunks.push(e.data); };
  rec = { r, chunks, stream, own, t0: Date.now(), timer: setTimeout(() => emit('recmax'), MAX_VOICE_S * 1000) };
  r.start(1000);
  emit('rec', true);
}
function endRecording() {
  const x = rec;
  if (!x) return Promise.resolve(null);
  rec = null;
  clearTimeout(x.timer);
  return new Promise(resolve => {
    x.r.onstop = () => {
      if (x.own) x.stream.getTracks().forEach(t => t.stop());
      audio.capture('voicenote', false);
      emit('rec', false);
      const dur = Math.min(MAX_VOICE_S, (Date.now() - x.t0) / 1000);
      resolve({ blob: new Blob(x.chunks, { type: x.r.mimeType || x.chunks[0]?.type || 'audio/webm' }), dur });
    };
    try { x.r.stop(); } catch { x.r.onstop(); }
  });
}

// ---------------------------------------------------------------- playing one
let player = null;
async function play(m) {
  stopPlaying();
  const blob = await getVoice(m.id);
  if (!blob) throw new Error('Ce message vocal n’est plus disponible.');
  const url = URL.createObjectURL(blob);
  const a = new Audio(url);
  player = { a, url, id: m.id };
  const done = () => { if (player?.a === a) { URL.revokeObjectURL(url); player = null; emit('play', null); } };
  a.onended = done; a.onerror = done;
  emit('play', m.id);
  try { await a.play(); } catch (e) { done(); throw new Error('Lecture impossible sur cet appareil.'); }
}
function stopPlaying() { if (player) { player.a.pause(); URL.revokeObjectURL(player.url); player = null; emit('play', null); } }

// ---------------------------------------------------------------- public API
export const messages = {
  openConv: null,             // the conversation on screen (no notification, no unread count for it)
  on(type, fn) { const h2 = e => fn(e.detail); events.addEventListener(type, h2); return () => events.removeEventListener(type, h2); },
  get list() { return Object.values(db.convs).sort((a, b) => b.at - a.at); },
  get unread() { return Object.values(db.convs).reduce((n, c) => n + (c.unread || 0), 0); },
  get recording() { return rec ? (Date.now() - rec.t0) / 1000 : null; },
  get playing() { return player?.id || null; },
  get maxGroup() { return MAX_GROUP; },
  conv,
  name: convName,
  // the conversation with a friend (created on first use)
  direct(f) {
    const id = dmId(f.id);
    db.convs[id] ||= { id, kind: 'dm', members: [who(me), who(f)], msgs: [], unread: 0, at: Date.now() };
    save();
    return db.convs[id];
  },
  createGroup(friends, name = '') {
    if (!me) throw new Error('Aucun profil connecté.');
    const list = friends.slice(0, MAX_GROUP - 1).map(who);
    if (!list.length) throw new Error('Choisissez au moins un ami.');
    const c = { id: 'g:' + uid(), kind: 'group', name: str(name, 40), nameAt: Date.now(), members: [who(me), ...list], msgs: [], unread: 0, at: Date.now() };
    db.convs[c.id] = c;
    system(c, 'create', `${me.psn} a créé le groupe${c.name ? ` « ${c.name} »` : ''}`);
    return c;
  },
  send(c, text) {
    text = str(text, 500);
    if (!text || !me) return;
    const m = { id: uid(), from: me.id, psn: me.psn, avatar: me.avatar, at: Date.now(), text };
    push(c, m); enqueue(c, m); emit('change');
  },
  rename(c, name) {
    name = str(name, 40);
    if (c.kind !== 'group' || name === (c.name || '')) return;
    c.name = name; c.nameAt = Date.now();
    system(c, 'rename', name ? `${me.psn} a renommé le groupe « ${name} »` : `${me.psn} a retiré le nom du groupe`);
  },
  addMembers(c, friends) {
    const add = friends.map(who).filter(f => !c.members.some(x => x.id === f.id)).slice(0, MAX_GROUP - c.members.length);
    if (!add.length) return;
    c.members.push(...add);
    system(c, 'add', `${me.psn} a ajouté ${add.map(f => f.psn).join(', ')}`);
  },
  leave(c) {
    if (c.kind === 'group') system(c, 'leave', `${me.psn} a quitté le groupe`);
    this.remove(c);
  },
  // forget a conversation on this device only
  remove(c) {
    dropVoice(c.msgs.filter(m => m.voice && !m.wait?.length).map(m => m.id));
    delete db.convs[c.id];
    save(); emit('change');
  },
  read(c) { if (c?.unread) { c.unread = 0; save(); emit('change'); } },
  startRecording,
  cancelRecording: () => endRecording(),
  async sendRecording(c) {
    const r = await endRecording();
    if (!r || r.dur < .6 || !r.blob.size) throw new Error('Message trop court : maintenez l’enregistrement au moins une seconde.');
    if (r.blob.size > MAX_DATA) throw new Error('Message vocal trop long.');
    const m = { id: uid(), from: me.id, psn: me.psn, avatar: me.avatar, at: Date.now(), voice: { dur: r.dur } };
    await putVoice(m.id, r.blob);
    push(c, m); enqueue(c, m); emit('change');
  },
  play, stopPlaying,
  // the system notification while the console is in the background: asked once, on a tap
  askNotifications() {
    perm = true;
    try { if (typeof Notification !== 'undefined' && Notification.permission === 'default') Notification.requestPermission().catch?.(() => {}); } catch { /* unsupported */ }
  },
  // social.js tells who my friends are (without importing it: social imports the screens)
  setFriendCheck(fn) { friendOf = fn; },
  flush,
  _receive: receive,
};
function system(c, ev, text) {
  const m = { id: uid(), from: me.id, psn: me.psn, avatar: me.avatar, at: Date.now(), sys: true, ev, text };
  push(c, m); enqueue(c, m); emit('change');
}

// ---------------------------------------------------------------- wiring
function use(user) {
  const id = user?.id || null;
  if (id === me?.id) { if (me && user) me = who(user); return; }
  stopPlaying();
  me = id ? who(user) : null;
  db = id ? load(id) : { convs: {}, pending: {} };
  try { perm = typeof Notification !== 'undefined' && Notification.permission === 'granted'; } catch { perm = false; }
  lastTry.clear();
  emit('change');
}
document.addEventListener('session:change', e => use(e.detail));
if (session.current) use(session.current);
pfriends.on('dm', ({ from, d }) => { if (peerMode()) receive(from, d); });
pfriends.on('players', () => flush());
net.on('dm', m => { if (session.online) receive(m.from, m.d); });
net.on('hello', () => { lastTry.clear(); flush(); });
net.on('presence', p => { if (p.online) { lastTry.delete(p.id); flush(); } });
setInterval(flush, 15000);
if (/[?&]pfdebug/.test(location.search)) window.__messages = messages;
