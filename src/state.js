// Persistent console state (library, wallet, downloads, settings). Everything is local and simulated.
import { byId } from './data.js';

const KEY = 'ps5ux.v1';
const now = Date.now();
const H = 3600e3;

// Free games every console owns and keeps installed, including consoles saved before they existed
// (Pouf Party, Mimic Party, UNO and Among Us are the console's games: they must always be on the home screen).
const GIFTS = ['pouf-party', 'mimic-party', 'uno', 'among-us'];
const defaults = () => ({
  user: null,
  gifts: [...GIFTS],
  owned: [...GIFTS],
  installed: [...GIFTS],
  lastPlayed: { 'mimic-party': now - 60e3, uno: now - 90e3, 'pouf-party': now - 2 * H },
  playTime: {},
  trophies: {},
  wishlist: [],
  cart: [],
  wallet: 124.5,
  plan: null,
  downloads: [],
  notifications: [],
  recentSearch: ['pouf', 'course'],
  captures: [],
  settings: {
    sfx: true, sfxVol: 0.7, music: true, musicVol: 0.4, quality: 'high', parallax: true, reduceMotion: false,
    confirm: 'cross', vib: 2, glyphs: 'auto', clock24: true, bigText: false, contrast: false, noiseSuppression: true,
    theme: 'blue', wallpaper: 'game', ageLimit: 0, voiceAllowed: true, captureToast: true, cloudSync: true,
  },
});

function load() {
  const d = defaults();
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!s) return d;
    const merged = { ...d, ...s, settings: { ...d.settings, ...s.settings } };
    // drop ids that no longer exist in the catalogue (games removed from the console)
    const known = id => !!byId[id];
    for (const k of ['owned', 'installed', 'wishlist', 'cart']) merged[k] = (Array.isArray(merged[k]) ? merged[k] : []).filter(known);
    merged.downloads = (Array.isArray(merged.downloads) ? merged.downloads : []).filter(x => known(x?.id));
    for (const k of ['lastPlayed', 'playTime', 'trophies']) merged[k] = Object.fromEntries(Object.entries(merged[k] || {}).filter(([id]) => known(id)));
    merged.captures = (Array.isArray(merged.captures) ? merged.captures : []).filter(c => c && (!c.game || known(c.game)));
    merged.gifts = Array.isArray(merged.gifts) ? merged.gifts : [];
    // The gifts are re-checked on every start: an older cached build (Safari keeps one per tab) used to drop them
    // from `owned` while leaving them in `gifts`, which hid the game for good in Safari but not in the home-screen app.
    for (const id of GIFTS) {
      if (!merged.gifts.includes(id)) merged.gifts.push(id);
      if (!merged.owned.includes(id)) merged.owned.push(id);
      if (!merged.installed.includes(id) && !merged.downloads.some(x => x.id === id)) merged.installed.push(id);
      merged.lastPlayed[id] ||= Date.now() - 60e3;
    }
    // write the repaired save back now, not at the next change
    try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch { /* private mode */ }
    return merged;
  } catch { return d; }
}

export const state = load();
export const bus = new EventTarget();
let saveT = 0;
export function save(what = 'state') {
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode: keep in memory */ } }, 150);
  bus.dispatchEvent(new CustomEvent('change', { detail: what }));
}
export function resetAll() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  Object.assign(state, defaults());
  save('reset');
}

export const builtIn = id => GIFTS.includes(id);   // part of the console: always installed, cannot be deleted
export const owns = id => state.owned.includes(id);
export const installed = id => state.installed.includes(id);
export const downloading = id => state.downloads.find(d => d.id === id);
export const finalPrice = g => +(g.price * (1 - g.discount / 100)).toFixed(2);
export const usedStorage = () => state.installed.reduce((s, id) => s + byId[id].size, 0) + state.downloads.reduce((s, d) => s + byId[d.id].size * d.p, 0);
export const STORAGE_TOTAL = 825;
export const STORAGE_USABLE = 667.2;

export function trophyStats(id) {
  const g = byId[id];
  const got = state.trophies[id] || [];
  const c = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  got.forEach(i => { const t = g.trophies[i]; if (t) c[t.t]++; });
  return { ...c, got: got.length, total: g.trophies.length, pct: Math.round(got.length / g.trophies.length * 100) };
}
export function allTrophies() {
  const c = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const id in state.trophies) { const s = trophyStats(id); for (const k in c) c[k] += s[k]; }
  return c;
}

export function recentGames() {
  return state.installed.slice().sort((a, b) => (state.lastPlayed[b] || 0) - (state.lastPlayed[a] || 0));
}
