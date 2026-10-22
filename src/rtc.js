// Voice chat: WebRTC mesh between the voice members of a party. Signalling goes through the realtime server.
// Echo cancellation + noise suppression are always requested so calls work on the device speaker, without a headset.
import { net } from './net.js';
import { audio } from './audio.js';
import { state } from './state.js';
import { lifecycle, IOS } from './input.js';

export class VoiceError extends Error {}
const events = new EventTarget();
const emit = (t, d) => events.dispatchEvent(new CustomEvent(t, { detail: d }));
const peers = new Map();            // userId → peer
const volumes = new Map();
let local = null, myId = null, myVs = null, joined = false, muted = false, joining = null, held = false;
// Without the project server: public STUN + the free Open Relay TURN (public shared credentials, not a secret)
export const PUBLIC_ICE = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] },
  { urls: ['turn:openrelay.metered.ca:80', 'turn:openrelay.metered.ca:443', 'turn:openrelay.metered.ca:443?transport=tcp'], username: 'openrelayproject', credential: 'openrelayproject' },
];
let iceServers = PUBLIC_ICE;
let meterTimer = 0, meters = new Map(), meterCtx = null;
const holder = document.createElement('div');
holder.setAttribute('aria-hidden', 'true');
holder.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-10px;top:-10px';
document.body.append(holder);

const constraints = () => ({ audio: { echoCancellation: true, noiseSuppression: state.settings.noiseSuppression !== false, autoGainControl: true }, video: false });

// Safari and the app added to the home screen keep separate permissions: each one gets its own instructions
const homeScreenApp = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
export function micErrorText(e) {
  if (e?.name === 'NotAllowedError' || e?.name === 'SecurityError') {
    if (IOS && homeScreenApp()) return 'Accès au micro refusé pour l’app. Réglages iOS → Safari → Micro → « Demander » (ou « Autoriser »), puis fermez l’app (balayez-la vers le haut) et rouvrez-la depuis l’écran d’accueil.';
    if (IOS) return 'Accès au micro refusé. Dans Safari : touchez « aA » puis « Réglages du site web » → Micro → Autoriser, ou Réglages iOS → Safari → Micro.';
    return 'Accès au micro refusé. Autorisez le micro dans les réglages du site (icône à gauche de l’adresse), puis réessayez.';
  }
  if (e?.name === 'NotFoundError' || e?.name === 'OverconstrainedError') return 'Aucun micro n’a été détecté sur cet appareil.';
  if (e?.name === 'NotReadableError' || e?.name === 'AbortError') return 'Le micro est déjà utilisé par une autre application (appel, dictée, autre onglet). Fermez-la puis réessayez.';
  return 'Impossible d’accéder au micro.';
}
async function getMic() {
  if (!navigator.mediaDevices?.getUserMedia) throw new VoiceError(location.protocol !== 'https:' && location.hostname !== 'localhost'
    ? 'Les appels vocaux exigent une connexion sécurisée (HTTPS).' : 'Ce navigateur ne permet pas les appels vocaux.');
  try { return await navigator.mediaDevices.getUserMedia(constraints()); }
  catch (e) { throw new VoiceError(micErrorText(e)); }
}

// ---------------------------------------------------------------- level meters (speaking indicators)
function meter(id, stream) {
  try {
    if (!meterCtx || meterCtx.state === 'closed') meterCtx = audio.ctx || new (window.AudioContext || window.webkitAudioContext)();
    const src = meterCtx.createMediaStreamSource(stream);
    const an = meterCtx.createAnalyser(); an.fftSize = 512;
    src.connect(an);
    meters.set(id, { an, buf: new Float32Array(an.fftSize), src, level: 0 });
  } catch { /* metering is cosmetic */ }
  if (!meterTimer) meterTimer = setInterval(() => {
    const levels = {};
    meters.forEach((m, k) => {
      m.an.getFloatTimeDomainData(m.buf);
      let s = 0; for (const v of m.buf) s += v * v;
      m.level = m.level * .6 + Math.min(1, Math.sqrt(s / m.buf.length) * 8) * .4;
      levels[k] = k === 'me' && (muted || held) ? 0 : m.level;
    });
    emit('levels', levels);
  }, 110);
}
function unmeter(id) { const m = meters.get(id); if (m) { try { m.src.disconnect(); } catch { /* ignore */ } meters.delete(id); } }

// ---------------------------------------------------------------- peers
const isOfferer = otherId => myId < otherId;  // deterministic roles: no offer glare
function signal(p, data) { net.send('rtc', { to: p.id, toVs: p.remoteVs, data }); }

function createPeer(id, remoteVs) {
  const pc = new RTCPeerConnection({ iceServers });
  const p = { id, pc, remoteVs, ice: [], el: null, el2: null, state: 'connecting', restartTimer: 0, created: Date.now(), slots: null, video: {}, flags: { cam: false, screen: null } };
  local.getAudioTracks().forEach(t => pc.addTrack(t, local));
  // the camera, the shared video and the shared sound get their slots in the first offer (see « camera and share »)
  // (they belong to the microphone's stream: a friend still on an older version, which has no slots, then keeps its
  // voice playing instead of replacing it with these extra tracks)
  if (isOfferer(id)) for (const kind of SLOT_KINDS) pc.addTransceiver(kind, { direction: 'sendrecv', streams: [local] });
  pc.onicecandidate = e => { if (e.candidate) signal(p, { type: 'candidate', candidate: e.candidate.toJSON() }); };
  pc.ontrack = e => {
    const i = pc.getTransceivers().indexOf(e.transceiver);
    if (i > 0) remoteSlot(p, i, e.track);
    else if (e.track.kind === 'audio') attachRemote(p, new MediaStream([e.track]));   // the voice alone (not the shared sound)
  };
  pc.onconnectionstatechange = () => {
    const s = pc.connectionState;
    p.state = s === 'connected' ? 'connected' : s === 'failed' ? 'failed' : s === 'disconnected' ? 'reconnecting' : p.state;
    if (s === 'connected') { sendFlags(p); tune(p); }
    emit('peers', voice.peerStates());
    emitMedia();
    clearTimeout(p.restartTimer);
    if (s === 'failed') restart(p);
    else if (s === 'disconnected') p.restartTimer = setTimeout(() => restart(p), 6000);
  };
  peers.set(id, p);
  emit('peers', voice.peerStates());
  return p;
}
async function offer(p, opts) {
  try {
    const o = await p.pc.createOffer(opts);
    await p.pc.setLocalDescription(o);
    signal(p, { type: 'offer', sdp: p.pc.localDescription.sdp });
  } catch (e) { console.warn('offer failed', e); }
}
function restart(p) {
  if (!peers.has(p.id) || !isOfferer(p.id)) return;
  try { p.pc.restartIce?.(); } catch { /* older Safari */ }
  offer(p, { iceRestart: true });
}
function closePeer(p) {
  clearTimeout(p.restartTimer);
  try { p.pc.close(); } catch { /* ignore */ }
  for (const el of [p.el, p.el2]) if (el) { el.srcObject = null; el.remove(); }
  unmeter(p.id);
  peers.delete(p.id);
  emit('peers', voice.peerStates());
  emitMedia();
}

// ---------------------------------------------------------------- camera and share
// Every connection carries, from its first offer, a camera slot, a shared-video slot and a shared-sound slot
// (transceivers 1, 2 and 3 after the microphone). Turning the camera or a share on fills a slot with replaceTrack:
// no renegotiation, so it works the same in Safari, the home-screen app and every other browser. Nothing is sent
// before the player taps the button, and only to the voice members of the same party (the relay checks it).
const SLOT_KINDS = ['video', 'video', 'audio'];
const media = { cam: null, camStream: null, facing: 'user', screen: null, screenAudio: null, screenKind: null, stopShare: null, busy: false };
export const SHARE_SCREEN = !!navigator.mediaDevices?.getDisplayMedia && !IOS;   // iOS has no screen capture for web pages
function bindSlots(p) {
  const tr = p.pc.getTransceivers();
  if (tr.length < 4) return;                 // an older version of the console on the other side: voice only
  p.slots = { cam: tr[1], screen: tr[2], screenAudio: tr[3] };
  for (const t of [tr[1], tr[2], tr[3]]) if (t.direction !== 'sendrecv' && t.direction !== 'stopped') t.direction = 'sendrecv';
  fill(p);
}
function fill(p) {
  if (!p.slots) return;
  p.slots.cam.sender.replaceTrack(media.cam).catch(() => {});
  p.slots.screen.sender.replaceTrack(media.screen).catch(() => {});
  p.slots.screenAudio.sender.replaceTrack(media.screenAudio).catch(() => {});
  tune(p);
}
// bitrate caps shared between the members (mesh: every stream is sent once per friend); congestion control adapts below
function tune(p) {
  if (!p.slots || p.pc.connectionState !== 'connected') return;
  const k = Math.sqrt(Math.max(1, peers.size));
  cap(p.slots.cam.sender, 450e3 / k, 24);
  cap(p.slots.screen.sender, (media.screenKind === 'screen' ? 1500e3 : 1100e3) / k, media.screenKind === 'screen' ? 15 : 24);
}
function cap(sender, bps, fps) {
  try {
    const prm = sender.getParameters();
    if (!prm.encodings?.length) return;
    prm.encodings[0].maxBitrate = Math.round(bps); prm.encodings[0].maxFramerate = fps;
    sender.setParameters(prm).catch(() => {});
  } catch { /* not supported */ }
}
function sendFlags(p) { if (p.slots) signal(p, { type: 'media', cam: !!media.cam, screen: media.screenKind }); }
function broadcastFlags() { peers.forEach(p => { if (p.pc.connectionState === 'connected') sendFlags(p); }); emitMedia(); }
function remoteSlot(p, i, track) {
  if (i === 3) {  // the shared game's sound plays like the voices
    if (!p.el2) { p.el2 = document.createElement('audio'); p.el2.autoplay = true; p.el2.playsInline = true; p.el2.setAttribute('playsinline', ''); holder.append(p.el2); }
    p.el2.srcObject = new MediaStream([track]);
    p.el2.play().catch(() => emit('blocked', true));
    return;
  }
  p.video[i === 1 ? 'cam' : 'screen'] = new MediaStream([track]);
  emitMedia();
}
// what the video panel shows: my camera / my share, and every friend who turned theirs on
function emitMedia() {
  const tiles = [];
  if (media.cam) tiles.push({ id: 'me', kind: 'cam', mine: true, stream: media.camStream, facing: media.facing });
  if (media.screen) tiles.push({ id: 'me', kind: 'screen', mine: true, share: media.screenKind });
  peers.forEach(p => {
    if (p.flags.cam && p.video.cam) tiles.push({ id: p.id, kind: 'cam', stream: p.video.cam, state: p.state });
    if (p.flags.screen && p.video.screen) tiles.push({ id: p.id, kind: 'screen', share: p.flags.screen, stream: p.video.screen, state: p.state });
  });
  emit('media', tiles);
}
const camError = e => new VoiceError(
  e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? (IOS ? 'Accès à la caméra refusé. Dans Safari : « aA » → Réglages du site web → Caméra → Autoriser (pour l’app de l’écran d’accueil : Réglages iOS → Safari → Caméra).' : 'Accès à la caméra refusé. Autorisez la caméra dans les réglages du site, puis réessayez.')
  : e?.name === 'NotFoundError' || e?.name === 'OverconstrainedError' ? 'Aucune caméra disponible sur cet appareil.'
  : e?.name === 'NotReadableError' || e?.name === 'AbortError' ? 'La caméra est déjà utilisée par une autre application.'
  : 'Impossible d’activer la caméra.');
async function openCam(facing) {
  if (!navigator.mediaDevices?.getUserMedia) throw new VoiceError('Ce navigateur ne permet pas la caméra.');
  const want = { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 24, max: 30 } };
  try { return (await navigator.mediaDevices.getUserMedia({ video: { ...want, facingMode: { ideal: facing } }, audio: false })).getVideoTracks()[0]; }
  catch (e) {
    if (e?.name === 'OverconstrainedError') { try { return (await navigator.mediaDevices.getUserMedia({ video: true, audio: false })).getVideoTracks()[0]; } catch (e2) { throw camError(e2); } }
    throw camError(e);
  }
}
function setCamTrack(t) {
  const old = media.cam;
  media.cam = t;
  media.camStream = t ? new MediaStream([t]) : null;   // one stream per camera track: the preview does not restart
  if (t) t.addEventListener('ended', () => { if (media.cam === t) { if (document.hidden) camLostInBackground = true; else voice.setCamera(false); } });
  peers.forEach(fill);
  if (old && old !== t) old.stop();
  broadcastFlags();
}
let camLostInBackground = false;
function attachRemote(p, stream) {
  if (p.el?.srcObject === stream) return;
  if (!p.el) {
    p.el = document.createElement('audio');
    p.el.autoplay = true; p.el.playsInline = true;
    p.el.setAttribute('playsinline', '');
    holder.append(p.el);
  }
  p.el.srcObject = stream;
  p.el.muted = held;
  if (volumes.has(p.id)) p.el.volume = volumes.get(p.id);
  p.el.play().catch(() => emit('blocked', true));
  unmeter(p.id); meter(p.id, stream);
}
async function flushIce(p) {
  for (const c of p.ice.splice(0)) await p.pc.addIceCandidate(c).catch(() => {});
}

export const voice = {
  get active() { return joined; },
  get muted() { return muted; },
  get joining() { return !!joining; },
  canSetVolume: !IOS,  // iOS ignores HTMLMediaElement.volume: the hardware buttons control call volume
  on(type, fn) { const h = e => fn(e.detail); events.addEventListener(type, h); return () => events.removeEventListener(type, h); },
  peerStates() { return Object.fromEntries([...peers.values()].map(p => [p.id, p.state])); },
  // Settings › Sound diagnostics: the microphone in use during a call (label = AirPods, iPhone microphone…)
  micInfo() {
    const t = local?.getAudioTracks()[0];
    return t ? { label: t.label || 'Micro', state: t.readyState, muted: t.muted, enabled: t.enabled } : null;
  },
  testMic: getMic,

  // ------------------------------------------------------------ camera (independent from the microphone)
  get camera() { return !!media.cam; },
  get facing() { return media.facing; },
  get sharing() { return media.screenKind; },
  get busy() { return media.busy; },
  canShareScreen: SHARE_SCREEN,
  gameSource: null,              // set by a running game: () => ({ video, audio, stop }) (see Pouf Party)
  get canShareGame() { return !!this.gameSource; },
  async setCamera(on) {
    if (!on) { setCamTrack(null); return; }
    if (!joined) throw new VoiceError('Rejoignez d’abord le chat vocal du groupe pour activer la caméra.');
    if (media.cam || media.busy) return;
    media.busy = true; emitMedia();
    try { const t = await openCam(media.facing); if (!joined) { t.stop(); return; } setCamTrack(t); }
    finally { media.busy = false; emitMedia(); }
  },
  // front / back camera (iOS cannot open both at once: the current one is released first)
  async flipCamera() {
    if (!media.cam || media.busy) return;
    const facing = media.facing === 'user' ? 'environment' : 'user';
    media.busy = true;
    const prev = media.cam;
    try {
      prev.stop();
      const t = await openCam(facing);
      media.facing = facing;
      setCamTrack(t);
    } catch (e) {
      // the other camera is not available: come back to the previous one
      try { setCamTrack(await openCam(media.facing)); } catch { setCamTrack(null); }
      throw e;
    } finally { media.busy = false; emitMedia(); }
  },
  async hasTwoCameras() {
    try { return (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput').length > 1; } catch { return false; }
  },

  // ------------------------------------------------------------ share: the game (everywhere) or the screen (computers)
  async startShare(kind = 'game') {
    if (!joined) throw new VoiceError('Rejoignez d’abord le chat vocal du groupe pour partager.');
    if (media.busy) return;
    this.stopShare();
    media.busy = true; emitMedia();
    try {
      let video, audio = null, stop;
      if (kind === 'game') {
        if (!this.gameSource) throw new VoiceError('Lancez une partie de Pouf Party pour la partager.');
        ({ video, audio, stop } = this.gameSource());
      } else {
        if (!SHARE_SCREEN) throw new VoiceError('Ce navigateur ne permet pas de partager l’écran (c’est le cas sur iPhone et iPad). Partagez plutôt la partie en cours.');
        let s;
        try { s = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 15, max: 30 }, width: { max: 1920 } }, audio: true }); }
        catch (e) { throw new VoiceError(e?.name === 'NotAllowedError' ? 'Partage d’écran annulé ou refusé.' : 'Impossible de partager l’écran.'); }
        video = s.getVideoTracks()[0]; audio = s.getAudioTracks()[0] || null;
        stop = () => s.getTracks().forEach(t => t.stop());
      }
      if (!joined) { stop(); return; }
      try { video.contentHint = kind === 'game' ? 'motion' : 'detail'; } catch { /* ignore */ }
      // the browser's own « Stop sharing » button ends the track
      video.addEventListener('ended', () => { if (media.screen === video) voice.stopShare(); });
      Object.assign(media, { screen: video, screenAudio: audio, screenKind: kind, stopShare: stop });
      peers.forEach(fill);
      broadcastFlags();
    } finally { media.busy = false; emitMedia(); }
  },
  stopShare() {
    if (!media.screenKind) return;
    const stop = media.stopShare;
    Object.assign(media, { screen: null, screenAudio: null, screenKind: null, stopShare: null });
    peers.forEach(fill);
    try { stop?.(); } catch { /* already stopped */ }
    broadcastFlags();
  },

  async join(userId) {
    if (joined) return;
    if (joining) return joining;
    joining = (async () => {
      audio.capture('voice', true);   // before the microphone opens (iOS refuses capture in a playback-only session)
      try { local = await getMic(); } catch (e) { audio.capture('voice', false); throw e; }
      watchMic(local);
      myId = userId;
      // the project server gives TURN credentials; without it (static site) the public servers are used
      if (net.mode === 'online') { try { iceServers = (await net.api('/api/ice', { timeout: 4000 })).iceServers; } catch { /* keep public STUN */ } }
      local.getAudioTracks().forEach(t => { t.enabled = !muted && !held; });
      try {
        const r = await net.req('voice', { on: true, muted: muted || held });
        myVs = r.vs;
      } catch (e) { local.getTracks().forEach(t => t.stop()); local = null; audio.capture('voice', false); throw e; }
      joined = true;
      meter('me', local);
      // the speaker must not feed the menu music back into the microphone
      audio.duck(0, .4);
      audio.play('join');
      emit('change', { joined: true });
    })();
    try { await joining; } finally { joining = null; }
  },

  leave({ notify = true } = {}) {
    if (!joined && !local) return;
    if (notify) net.send('voice', { on: false, muted: false });
    // nothing keeps filming or sharing after the call
    this.stopShare(); setCamTrack(null);
    peers.forEach(closePeer);
    local?.getTracks().forEach(t => t.stop());
    unmeter('me');
    local = null; joined = false; myVs = null; held = false;
    clearInterval(meterTimer); meterTimer = 0;
    audio.capture('voice', false);   // back to full-quality playback (AirPods leave the hands-free profile)
    audio.duck(1, 1.2);
    audio.play('leave');
    emit('change', { joined: false });
  },

  setMuted(v) {
    muted = !!v;
    local?.getAudioTracks().forEach(t => { t.enabled = !muted && !held; });
    if (joined) net.send('voice', { on: true, muted: muted || held });
    emit('change', { joined, muted });
  },
  // A game that listens to the microphone (Mimic Party) holds the call: the others stop hearing you live and your
  // speaker stays silent so it does not leak into the recording. Releasing it restores exactly the previous state.
  get held() { return held; },
  hold(on) {
    if (held === !!on) return;
    held = !!on;
    local?.getAudioTracks().forEach(t => { t.enabled = !muted && !held; });
    peers.forEach(p => { if (p.el) p.el.muted = held; });
    if (joined) net.send('voice', { on: true, muted: muted || held });
    emit('change', { joined, muted, held });
    // the system may have silenced the microphone during the take (dictation, another capture): bring it back now
    if (!held && joined && !document.hidden && micSilenced()) recoverMic('muted');
  },
  // the call microphone, alive (reopened if the system ended or silenced it): Mimic Party records from a copy of it
  async ensureLive() {
    if (!joined) return;
    if (micSilenced()) await recoverMic('capture');
  },
  // an independent copy of the call microphone (still live while the call is held or muted)
  captureStream() {
    const t = local?.getAudioTracks()[0];
    if (!t || t.readyState === 'ended') return null;
    const c = t.clone(); c.enabled = true;
    return new MediaStream([c]);
  },
  setVolume(id, v) { volumes.set(id, v); const p = peers.get(id); if (p?.el) p.el.volume = v; },
  volume(id) { return volumes.get(id) ?? 1; },
  unblock() { peers.forEach(p => { p.el?.play().catch(() => {}); p.el2?.play().catch(() => {}); }); emit('blocked', false); },

  // reconcile connections with the party roster sent by the server
  sync(party) {
    if (!joined) return;
    if (!party) { this.leave({ notify: false }); return; }
    const me = party.members.find(m => m.id === myId);
    if (!me?.voice) { // the server dropped our voice state (long disconnection): announce ourselves again
      net.req('voice', { on: true, muted, renew: true }).then(r => { myVs = r.vs; peers.forEach(closePeer); }).catch(() => {});
      return;
    }
    if (me.vs !== myVs) { myVs = me.vs; peers.forEach(closePeer); }
    const others = party.members.filter(m => m.id !== myId && m.voice && m.vs);
    peers.forEach(p => { const m = others.find(o => o.id === p.id); if (!m || m.vs !== p.remoteVs) closePeer(p); });
    for (const m of others) {
      if (peers.has(m.id)) continue;
      const p = createPeer(m.id, m.vs);
      if (isOfferer(m.id)) offer(p);
    }
  },

  async handleSignal({ from, fromVs, toVs, data }) {
    if (!joined || (toVs && toVs !== myVs)) return;
    let p = peers.get(from);
    if (p && p.remoteVs !== fromVs) { closePeer(p); p = null; }
    if (!p) { if (data.type !== 'offer') return; p = createPeer(from, fromVs); }
    const pc = p.pc;
    try {
      if (data.type === 'offer') {
        if (pc.signalingState !== 'stable') await pc.setLocalDescription({ type: 'rollback' }).catch(() => {});
        await pc.setRemoteDescription({ type: 'offer', sdp: data.sdp });
        await flushIce(p);
        if (!p.slots) bindSlots(p);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signal(p, { type: 'answer', sdp: pc.localDescription.sdp });
      } else if (data.type === 'answer') {
        if (pc.signalingState === 'have-local-offer') { await pc.setRemoteDescription({ type: 'answer', sdp: data.sdp }); await flushIce(p); if (!p.slots) bindSlots(p); }
      } else if (data.type === 'media') {
        p.flags = { cam: !!data.cam, screen: data.screen === 'game' || data.screen === 'screen' ? data.screen : null };
        emitMedia();
      } else if (data.type === 'candidate' && data.candidate) {
        if (pc.remoteDescription) await pc.addIceCandidate(data.candidate).catch(() => {});
        else p.ice.push(data.candidate);
      }
    } catch (e) { console.warn('signalling error', e); }
  },
};

// The microphone track ends when iOS gives the microphone to another app, or when the audio route changes
// (AirPods or headphones plugged in or removed): a new one is opened and swapped into every connection.
let recovering = null, muteTimer = 0;
const micSilenced = () => { const t = local?.getAudioTracks()[0]; return !t || t.readyState === 'ended' || t.muted; };
function watchMic(stream) {
  const t = stream.getAudioTracks()[0];
  if (!t) return;
  t.addEventListener('ended', () => { if (joined && local === stream && !document.hidden) recoverMic('ended'); });
  // iOS silences ("mutes") the microphone when another capture starts (dictation, Siri, another page) and does not
  // always give it back: the friends then stopped hearing this player. A silence that lasts is repaired.
  t.addEventListener('mute', () => {
    clearTimeout(muteTimer);
    muteTimer = setTimeout(() => { if (joined && local === stream && t.muted && !held && !document.hidden) recoverMic('muted'); }, 2500);
  });
  t.addEventListener('unmute', () => clearTimeout(muteTimer));
}
function recoverMic(why) {
  if (recovering || !joined) return recovering;
  recovering = (async () => {
    try {
      const fresh = await getMic();
      if (!joined) { fresh.getTracks().forEach(x => x.stop()); return; }
      const t = fresh.getAudioTracks()[0];
      t.enabled = !muted && !held;
      for (const p of peers.values()) {
        // the microphone is always the first transceiver (camera and share slots come after it)
        const sender = p.pc.getTransceivers()[0]?.sender || p.pc.getSenders().find(s => s.track?.kind === 'audio');
        await sender?.replaceTrack(t).catch(() => {});
      }
      local?.getTracks().forEach(x => x.stop());
      local = fresh;
      watchMic(local);
      unmeter('me'); meter('me', local);
      audio.events.dispatchEvent(new CustomEvent('log', { detail: { kind: 'mic', why, label: t.label || '' } }));
    } catch (e) { emit('error', e.message); }
    finally { recovering = null; }
  })();
  return recovering;
}
// remote voices are <audio> elements: after a route change iOS may pause them, so they are started again
function replayVoices() {
  peers.forEach(p => {
    p.el?.play().catch(() => emit('blocked', true));
    p.el2?.play().catch(() => {});
    if (['failed', 'disconnected'].includes(p.pc.connectionState)) restart(p);
  });
}
// iOS suspends the microphone and media elements in the background: recover them when the app comes back
lifecycle.addEventListener('resume', async () => {
  if (!joined) return;
  if (micSilenced()) await recoverMic('resume');
  replayVoices();
  // iOS stops the camera in the background: open it again (permission already given) or report it is off
  if (camLostInBackground || media.cam?.readyState === 'ended') {
    camLostInBackground = false;
    try { setCamTrack(await openCam(media.facing)); } catch (e) { setCamTrack(null); emit('error', e.message); }
  }
});
audio.events.addEventListener('reroute', () => {
  if (!joined) return;
  const track = local?.getAudioTracks()[0];
  if (!track || track.readyState === 'ended') recoverMic('route');
  replayVoices();
});
