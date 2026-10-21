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
let local = null, myId = null, myVs = null, joined = false, muted = false, joining = null;
let iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
let meterTimer = 0, meters = new Map(), meterCtx = null;
const holder = document.createElement('div');
holder.setAttribute('aria-hidden', 'true');
holder.style.cssText = 'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-10px;top:-10px';
document.body.append(holder);

const constraints = () => ({ audio: { echoCancellation: true, noiseSuppression: state.settings.noiseSuppression !== false, autoGainControl: true }, video: false });

async function getMic() {
  if (!navigator.mediaDevices?.getUserMedia) throw new VoiceError(location.protocol !== 'https:' && location.hostname !== 'localhost'
    ? 'Les appels vocaux exigent une connexion sécurisée (HTTPS).' : 'Ce navigateur ne permet pas les appels vocaux.');
  try { return await navigator.mediaDevices.getUserMedia(constraints()); }
  catch (e) {
    if (e.name === 'NotAllowedError' || e.name === 'SecurityError') throw new VoiceError(IOS
      ? 'Accès au micro refusé. Dans Safari : touchez « aA » puis « Réglages du site web » → Micro → Autoriser, ou Réglages iOS → Safari → Micro.'
      : 'Accès au micro refusé. Autorisez le micro dans les réglages du site (icône à gauche de l’adresse), puis réessayez.');
    if (e.name === 'NotFoundError' || e.name === 'OverconstrainedError') throw new VoiceError('Aucun micro n’a été détecté sur cet appareil.');
    if (e.name === 'NotReadableError' || e.name === 'AbortError') throw new VoiceError('Le micro est déjà utilisé par une autre application.');
    throw new VoiceError('Impossible d’accéder au micro.');
  }
}

// ---------------------------------------------------------------- level meters (speaking indicators)
function meter(id, stream) {
  try {
    meterCtx ||= audio.ctx || new (window.AudioContext || window.webkitAudioContext)();
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
      levels[k] = k === 'me' && muted ? 0 : m.level;
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
  const p = { id, pc, remoteVs, ice: [], el: null, state: 'connecting', restartTimer: 0, created: Date.now() };
  local.getAudioTracks().forEach(t => pc.addTrack(t, local));
  pc.onicecandidate = e => { if (e.candidate) signal(p, { type: 'candidate', candidate: e.candidate.toJSON() }); };
  pc.ontrack = e => attachRemote(p, e.streams[0] || new MediaStream([e.track]));
  pc.onconnectionstatechange = () => {
    const s = pc.connectionState;
    p.state = s === 'connected' ? 'connected' : s === 'failed' ? 'failed' : s === 'disconnected' ? 'reconnecting' : p.state;
    emit('peers', voice.peerStates());
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
  if (p.el) { p.el.srcObject = null; p.el.remove(); }
  unmeter(p.id);
  peers.delete(p.id);
  emit('peers', voice.peerStates());
}
function attachRemote(p, stream) {
  if (p.el?.srcObject === stream) return;
  if (!p.el) {
    p.el = document.createElement('audio');
    p.el.autoplay = true; p.el.playsInline = true;
    p.el.setAttribute('playsinline', '');
    holder.append(p.el);
  }
  p.el.srcObject = stream;
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

  async join(userId) {
    if (joined) return;
    if (joining) return joining;
    joining = (async () => {
      local = await getMic();
      myId = userId;
      try { iceServers = (await net.api('/api/ice')).iceServers; } catch { /* keep public STUN */ }
      local.getAudioTracks().forEach(t => { t.enabled = !muted; });
      try {
        const r = await net.req('voice', { on: true, muted });
        myVs = r.vs;
      } catch (e) { local.getTracks().forEach(t => t.stop()); local = null; throw e; }
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
    peers.forEach(closePeer);
    local?.getTracks().forEach(t => t.stop());
    unmeter('me');
    local = null; joined = false; myVs = null;
    clearInterval(meterTimer); meterTimer = 0;
    audio.duck(1, 1.2);
    audio.play('leave');
    emit('change', { joined: false });
  },

  setMuted(v) {
    muted = !!v;
    local?.getAudioTracks().forEach(t => { t.enabled = !muted; });
    if (joined) net.send('voice', { on: true, muted });
    emit('change', { joined, muted });
  },
  setVolume(id, v) { volumes.set(id, v); const p = peers.get(id); if (p?.el) p.el.volume = v; },
  volume(id) { return volumes.get(id) ?? 1; },
  unblock() { peers.forEach(p => p.el?.play().catch(() => {})); emit('blocked', false); },

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
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signal(p, { type: 'answer', sdp: pc.localDescription.sdp });
      } else if (data.type === 'answer') {
        if (pc.signalingState === 'have-local-offer') { await pc.setRemoteDescription({ type: 'answer', sdp: data.sdp }); await flushIce(p); }
      } else if (data.type === 'candidate' && data.candidate) {
        if (pc.remoteDescription) await pc.addIceCandidate(data.candidate).catch(() => {});
        else p.ice.push(data.candidate);
      }
    } catch (e) { console.warn('signalling error', e); }
  },
};

// iOS suspends the microphone and media elements in the background: recover them when the app comes back
lifecycle.addEventListener('resume', async () => {
  if (!joined) return;
  const track = local?.getAudioTracks()[0];
  if (!track || track.readyState === 'ended') {
    try {
      const fresh = await getMic();
      const t = fresh.getAudioTracks()[0];
      t.enabled = !muted;
      for (const p of peers.values()) {
        const sender = p.pc.getSenders().find(s => !s.track || s.track.kind === 'audio');
        await sender?.replaceTrack(t);
      }
      local?.getTracks().forEach(x => x.stop());
      local = fresh;
      unmeter('me'); meter('me', local);
    } catch (e) { emit('error', e.message); }
  }
  peers.forEach(p => {
    p.el?.play().catch(() => emit('blocked', true));
    if (['failed', 'disconnected'].includes(p.pc.connectionState)) restart(p);
  });
});
