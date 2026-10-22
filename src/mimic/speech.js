// Speech recognition (Web Speech API) for Mimic Party: hears the words of an imitation or a spoken quiz answer.
// Runs next to the recording when the browser allows it; any failure simply leaves the acoustic score on its own.
const Rec = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
const KEY = 'mimic.speech';
const IOS = typeof navigator !== 'undefined' && (/iP(hone|ad|od)/.test(navigator.platform || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

let blocked = false;   // denied, offline or fighting with the recorder on this device: stop trying this session
const remembered = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };

export const speech = {
  get supported() { return !!Rec; },
  // mode: 'auto' | 'on' | 'off' (game settings)
  usable(mode = 'auto') {
    if (!Rec || blocked || mode === 'off') return false;
    if (mode === 'on') return true;
    // iOS gives the microphone to dictation: the recording (and the voice chat) would go silent. Acoustic score only.
    return !IOS && !remembered().conflict;
  },
  // the recorder got silence while recognition was running (seen on some iOS versions): stop running both together
  markConflict() { blocked = true; try { localStorage.setItem(KEY, JSON.stringify({ conflict: true })); } catch { /* private mode */ } },
  get blockedReason() { return blocked ? 'unavailable' : null; },

  // Starts listening; returns { stop(): Promise<string[]>, abort() }. `onText` gets the live transcript.
  start({ lang = 'fr-FR', onText } = {}) {
    if (!Rec || blocked) return null;
    const finals = [], alts = new Set();
    let interim = '', ended = false, stopping = false, rec = null, endWait = null, restarts = 0, failed = false, audio = false;
    const open = () => {
      try {
        rec = new Rec();
        rec.lang = lang; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 4;
        rec.onaudiostart = () => { audio = true; };
        rec.onresult = e => {
          interim = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const r = e.results[i];
            if (r.isFinal) { finals.push(r[0].transcript); for (let k = 0; k < r.length; k++) alts.add(r[k].transcript); }
            else interim += r[0].transcript;
          }
          onText?.((finals.join(' ') + ' ' + interim).trim());
        };
        rec.onerror = e => {
          if (['not-allowed', 'service-not-allowed', 'network', 'audio-capture', 'language-not-supported'].includes(e.error)) { blocked = true; failed = true; }
        };
        rec.onend = () => {
          // Chrome stops after a pause: keep listening until the game asks to stop
          if (!stopping && !blocked && restarts < 4) { restarts++; open(); return; }
          ended = true; endWait?.();
        };
        rec.start();
      } catch { ended = true; failed = true; endWait?.(); }
    };
    open();
    const result = () => {
      const all = [finals.join(' '), interim, ...alts].map(s => s.trim()).filter(Boolean);
      return [...new Set(all)];
    };
    return {
      // recognition could not run (offline, refused…): the words must not count as "nothing said"
      get failed() { return failed || (!audio && !finals.length && !interim); },
      stop() {
        stopping = true;
        if (ended) return Promise.resolve(result());
        return new Promise(res => {
          const t = setTimeout(() => { try { rec?.abort(); } catch { /* ignore */ } res(result()); }, 1600);
          endWait = () => { clearTimeout(t); res(result()); };
          try { rec?.stop(); } catch { clearTimeout(t); res(result()); }
        });
      },
      abort() { stopping = true; try { rec?.abort(); } catch { /* ignore */ } },
    };
  },
};

// ---------------------------------------------------------------- text matching (pure)
export function normText(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/\bp'?tit\b/g, 'petit').replace(/\bqu'?tu\b/g, 'que tu').replace(/\bd'/g, 'de ').replace(/\bm'/g, 'me ')
    .replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m || !n) return m || n;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
// 0…1: how well a transcript contains the expected phrase (word overlap and spelling distance, best window)
export function phraseScore(heard, phrase) {
  const h = normText(heard), p = normText(phrase);
  if (!h || !p) return 0;
  const hw = h.split(' '), pw = p.split(' ');
  let best = 0;
  for (let len = Math.max(1, pw.length - 1); len <= pw.length + 2; len++) {
    for (let i = 0; i + len <= hw.length || (i === 0 && hw.length < len); i++) {
      const win = hw.slice(i, i + len).join(' ');
      best = Math.max(best, 1 - lev(win, p) / Math.max(win.length, p.length));
    }
  }
  const words = pw.filter(w => hw.some(x => x === w || (w.length > 3 && lev(x, w) <= 1))).length / pw.length;
  return Math.max(0, Math.min(1, Math.max(best, words * .95)));
}
export function bestPhrase(transcripts, phrases) {
  let best = 0;
  for (const t of transcripts || []) for (const p of phrases || []) best = Math.max(best, phraseScore(t, p));
  return best;
}
// quiz: index of the choice that was said (or -1)
export function pickSpoken(transcripts, choices) {
  let bi = -1, bs = .62;
  choices.forEach((c, i) => {
    const s = bestPhrase(transcripts, [c.title, ...(c.say || [])]);
    if (s > bs) { bs = s; bi = i; }
  });
  return bi;
}
