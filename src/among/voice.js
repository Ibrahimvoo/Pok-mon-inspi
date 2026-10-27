// Proximity voice chat. WebRTC audio between the players of the same voice group only: the room (authority) tells
// every client who is in its group (view.voice.peers) and relays the signalling only inside a group; the volume of
// each voice is the gain computed by the room from the distance and the walls ('hear' messages).
// Strict isolation: when the group changes (death, meeting, end of game) every connection is closed at once and all
// gains drop to zero before the new group is connected; a voice never plays without a gain sent by the room.
import { net } from '../net.js';
import { PUBLIC_ICE } from '../rtc.js';
import { IOS } from '../input.js';

const PREFS = 'ps5ux.among.voice';
const readPrefs = () => { try { return { enabled: true, ptt: false, pttKey: 'KeyT', mic: '', out: '', volumes: {}, muted: {}, ...JSON.parse(localStorage.getItem(PREFS) || '{}') }; } catch { return { enabled: true, ptt: false, pttKey: 'KeyT', mic: '', out: '', volumes: {}, muted: {} }; } };

export class ProximityVoice extends EventTarget {
  constructor(client) {
    super();
    this.c = client; this.prefs = readPrefs();
    this.peers = new Map(); this.allowed = new Set(); this.group = null; this.gains = new Map();
    this.stream = null; this.track = null; this.ctx = null; this.level = 0; this.state = 'off'; this.error = '';
    this.pttDown = false; this.selfMuted = false; this.talkSent = false; this.ice = PUBLIC_ICE;
    this.offs = [client.on('view', v => this.sync(v)), client.on('hear', m => this.hear(m)), client.on('rtc', m => this.signal(m))];
    this.onKey = e => { if (!this.prefs.ptt || e.code !== this.prefs.pttKey || e.repeat) return; const t = e.target?.tagName; if (t === 'INPUT' || t === 'TEXTAREA') return; this.pttDown = e.type === 'keydown'; this.applyMic(); };
    addEventListener('keydown', this.onKey); addEventListener('keyup', this.onKey);
    this.onDevices = () => this.emit('devices');
    navigator.mediaDevices?.addEventListener?.('devicechange', this.onDevices);
    this.meterTimer = setInterval(() => this.meter(), 90);
  }
  emit(t, d) { this.dispatchEvent(new CustomEvent(t, { detail: d })); }
  on(t, fn) { const h = e => fn(e.detail); this.addEventListener(t, h); return () => this.removeEventListener(t, h); }
  save() { try { localStorage.setItem(PREFS, JSON.stringify(this.prefs)); } catch { /* private mode */ } }

  async start() {
    if (this.state === 'on' || this.state === 'starting') return;
    if (!navigator.mediaDevices?.getUserMedia) { this.fail(location.protocol !== 'https:' && location.hostname !== 'localhost' ? 'Le chat vocal exige une connexion sécurisée (HTTPS).' : 'Ce navigateur ne permet pas le chat vocal.'); return; }
    this.state = 'starting'; this.emit('state');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1, ...(this.prefs.mic ? { deviceId: { exact: this.prefs.mic } } : {}) }, video: false });
    } catch (e) {
      this.state = 'off';
      if (e.name === 'NotAllowedError' || e.name === 'SecurityError') this.fail(IOS ? 'Accès au micro refusé : Réglages iOS › Safari › Micro, ou « aA » › Réglages du site web › Micro.' : 'Accès au micro refusé : autorise le micro dans les réglages du site (icône à gauche de l’adresse).');
      else if (e.name === 'OverconstrainedError' || e.name === 'NotFoundError') { if (this.prefs.mic) { this.prefs.mic = ''; this.save(); return this.start(); } this.fail('Aucun micro détecté.'); }
      else this.fail('Le micro est indisponible (déjà utilisé par une autre application ?).');
      return;
    }
    this.track = this.stream.getAudioTracks()[0];
    this.track.onended = () => { if (this.state === 'on') this.restartMic(); };
    try { if (net.mode === 'online') this.ice = (await net.api('/api/ice')).iceServers; } catch { /* public STUN/TURN */ }
    this.audioCtx();
    try { const src = this.ctx.createMediaStreamSource(this.stream); this.an = this.ctx.createAnalyser(); this.an.fftSize = 512; src.connect(this.an); this.buf = new Float32Array(512); } catch { this.an = null; }
    this.state = 'on'; this.error = ''; this.applyMic();
    this.c.send({ k: 'voice', on: true, muted: !this.micOpen() });
    this.emit('state');
    if (this.c.v) this.sync(this.c.v, true);
  }
  fail(msg) { this.error = msg; this.state = 'off'; this.emit('state'); this.emit('error', msg); }
  audioCtx() {
    if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { this.ctx = null; } }
    this.ctx?.resume?.().catch(() => {});
    return this.ctx;
  }
  stop() {
    for (const id of [...this.peers.keys()]) this.closePeer(id);
    this.stream?.getTracks().forEach(t => t.stop()); this.stream = null; this.track = null;
    if (this.state !== 'off') this.c.send({ k: 'voice', on: false, muted: true });
    this.state = 'off'; this.emit('state');
  }
  async restartMic() {
    // Bluetooth headset switched, device unplugged, iOS interruption: take the microphone again
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, ...(this.prefs.mic ? { deviceId: { exact: this.prefs.mic } } : {}) } });
      const t = s.getAudioTracks()[0];
      for (const p of this.peers.values()) { const sender = p.pc.getSenders().find(x => !x.track || x.track.kind === 'audio'); await sender?.replaceTrack(t); }
      this.stream?.getTracks().forEach(x => x.stop());
      this.stream = s; this.track = t; t.onended = () => this.restartMic();
      this.applyMic();
    } catch (e) { this.fail('Le micro a été coupé : ' + (e.message || 'réessaie')); }
  }
  async setDevice(kind, id) {
    this.prefs[kind] = id; this.save();
    if (kind === 'mic' && this.state === 'on') await this.restartMic();
    if (kind === 'out') for (const p of this.peers.values()) p.el.setSinkId?.(id).catch(() => {});
  }
  async devices() { try { return await navigator.mediaDevices.enumerateDevices(); } catch { return []; } }
  micOpen() { return !this.selfMuted && (!this.prefs.ptt || this.pttDown) && this.allowedToTalk(); }
  allowedToTalk() { return this.c.v?.settings?.voiceChat !== false; }
  applyMic() { if (this.track) this.track.enabled = this.micOpen(); if (this.state === 'on') this.c.send({ k: 'voice', on: true, muted: !this.micOpen() }); this.emit('state'); }
  setMuted(v) { this.selfMuted = !!v; this.applyMic(); }
  setPTT(v) { this.prefs.ptt = !!v; this.save(); this.applyMic(); }
  meter() {
    if (!this.an) return;
    this.an.getFloatTimeDomainData(this.buf);
    let s = 0; for (const v of this.buf) s += v * v;
    this.level = this.level * .5 + Math.min(1, Math.sqrt(s / this.buf.length) * 9) * .5;
    const talking = this.level > .12 && this.micOpen();
    if (talking !== this.talkSent) { this.talkSent = talking; this.c.send({ k: 'talk', on: talking }); }
  }

  // ------------------------------------------------------------ group membership decided by the room
  sync(v, force = false) {
    const group = v.voice?.group || 'all';
    const allowed = new Set(v.settings?.voiceChat === false ? [] : (v.voice?.peers || []));
    if (group !== this.group) {
      // changed group: nothing of the previous group may still be heard or receive our voice
      for (const id of [...this.peers.keys()]) this.closePeer(id);
      this.gains.clear();
      this.group = group;
    }
    for (const id of [...this.peers.keys()]) if (!allowed.has(id)) this.closePeer(id);
    this.allowed = allowed;
    if (this.state !== 'on') return;
    for (const id of allowed) if (!this.peers.has(id) && this.c.me.id < id) this.connect(id, true);
    if (force) this.applyGains();
  }
  hear(m) {
    if (m.group !== this.group) { this.gains.clear(); this.applyGains(); return; }
    this.gains = new Map(m.g.map(([n, g]) => [n, g / 100]));
    this.applyGains();
  }
  volumeOf(id) { return this.prefs.volumes[id] ?? 1; }
  setVolume(id, v) { this.prefs.volumes[id] = v; this.save(); this.applyGains(); }
  setPeerMuted(id, v) { this.prefs.muted[id] = !!v; this.save(); this.applyGains(); }
  applyGains() {
    for (const [id, p] of this.peers) {
      const n = this.c.playerById(id)?.n;
      let g = n != null ? this.gains.get(n) ?? 0 : 0;
      if (!this.allowed.has(id) || this.prefs.muted[id]) g = 0;
      g *= this.volumeOf(id);
      p.target = g;
      if (p.gain && this.ctx) p.gain.gain.setTargetAtTime(g, this.ctx.currentTime, .08);
      else if (p.el) { p.el.muted = g <= 0.001; if (!IOS) p.el.volume = Math.max(0, Math.min(1, g)); }
    }
  }

  // ------------------------------------------------------------ peers
  connect(id, offer) {
    const pc = new RTCPeerConnection({ iceServers: this.ice });
    const p = { id, pc, ice: [], el: null, gain: null, target: 0, restart: 0 };
    this.peers.set(id, p);
    if (this.track) pc.addTrack(this.track, this.stream);
    pc.onicecandidate = e => { if (e.candidate) this.c.send({ k: 'rtc', to: id, data: { type: 'candidate', candidate: e.candidate.toJSON() } }); };
    pc.ontrack = e => this.attach(p, e.streams[0] || new MediaStream([e.track]));
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      clearTimeout(p.restart);
      if (s === 'failed' || s === 'disconnected') p.restart = setTimeout(() => { if (this.peers.get(id) === p && this.allowed.has(id)) { this.closePeer(id); if (this.c.me.id < id) this.connect(id, true); } }, s === 'failed' ? 500 : 5000);
      this.emit('peers');
    };
    if (offer) pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => this.c.send({ k: 'rtc', to: id, data: { type: 'offer', sdp: pc.localDescription.sdp } })).catch(() => {});
    return p;
  }
  attach(p, stream) {
    if (!p.el) {
      p.el = document.createElement('audio'); p.el.autoplay = true; p.el.playsInline = true; p.el.setAttribute('playsinline', '');
      p.el.style.display = 'none'; document.body.append(p.el);
      if (this.prefs.out) p.el.setSinkId?.(this.prefs.out).catch(() => {});
    }
    p.el.srcObject = stream;
    const ctx = this.audioCtx();
    // the element keeps the WebRTC stream flowing; the audible path goes through a gain node (distance volume)
    if (ctx && !IOS) {
      try {
        p.el.muted = true;
        const src = ctx.createMediaStreamSource(stream); p.gain = ctx.createGain(); p.gain.gain.value = 0;
        src.connect(p.gain); p.gain.connect(ctx.destination);
        p.src = src;
      } catch { p.gain = null; }
    }
    p.el.play().catch(() => this.emit('blocked'));
    this.applyGains();
  }
  closePeer(id) {
    const p = this.peers.get(id); if (!p) return;
    clearTimeout(p.restart);
    try { p.gain?.disconnect(); p.src?.disconnect(); } catch { /* ignore */ }
    try { p.pc.close(); } catch { /* ignore */ }
    if (p.el) { p.el.muted = true; p.el.srcObject = null; p.el.remove(); }
    this.peers.delete(id);
    this.emit('peers');
  }
  async signal({ from, data, g }) {
    if (this.state !== 'on' || !this.allowed.has(from) || g !== this.group || !data) return;
    let p = this.peers.get(from);
    try {
      if (data.type === 'offer') {
        if (p && p.pc.signalingState !== 'stable') { this.closePeer(from); p = null; }
        p ||= this.connect(from, false);
        await p.pc.setRemoteDescription({ type: 'offer', sdp: data.sdp });
        for (const c of p.ice.splice(0)) await p.pc.addIceCandidate(c).catch(() => {});
        const a = await p.pc.createAnswer(); await p.pc.setLocalDescription(a);
        this.c.send({ k: 'rtc', to: from, data: { type: 'answer', sdp: p.pc.localDescription.sdp } });
      } else if (data.type === 'answer' && p?.pc.signalingState === 'have-local-offer') {
        await p.pc.setRemoteDescription({ type: 'answer', sdp: data.sdp });
        for (const c of p.ice.splice(0)) await p.pc.addIceCandidate(c).catch(() => {});
      } else if (data.type === 'candidate' && p) {
        if (p.pc.remoteDescription) await p.pc.addIceCandidate(data.candidate).catch(() => {}); else p.ice.push(data.candidate);
      }
    } catch (e) { console.warn('voice signalling', e); }
  }
  unblock() { this.audioCtx(); for (const p of this.peers.values()) p.el?.play().catch(() => {}); }
  destroy() {
    this.stop(); this.offs.forEach(f => f()); clearInterval(this.meterTimer);
    removeEventListener('keydown', this.onKey); removeEventListener('keyup', this.onKey);
    navigator.mediaDevices?.removeEventListener?.('devicechange', this.onDevices);
    try { this.ctx?.close(); } catch { /* ignore */ }
  }
}
