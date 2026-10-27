// Persistent console state (library, wallet, downloads, settings). Everything is local and simulated.
import { byId } from './data.js';

const KEY = 'ps5ux.v1';
const now = Date.now();
const H = 3600e3;

const defaults = () => ({
  user: null,
  owned: ['among-us', 'uno', 'mimic-party', 'ashen-crown', 'starfall', 'neon-requiem', 'valewalker', 'lumen', 'tidebreaker', 'northbound', 'moonlit-bay', 'hollow-pines', 'abyssal'],
  installed: ['among-us', 'uno', 'mimic-party', 'ashen-crown', 'starfall', 'neon-requiem', 'valewalker', 'lumen', 'tidebreaker', 'northbound'],
  lastPlayed: { 'among-us': now - 30e3, 'mimic-party': now - 60e3, uno: now - 90e3, 'ashen-crown': now - 2 * H, 'neon-requiem': now - 26 * H, starfall: now - 50 * H, valewalker: now - 96 * H, lumen: now - 140 * H, tidebreaker: now - 200 * H, northbound: now - 300 * H },
  playTime: { 'ashen-crown': 41 * 60, 'neon-requiem': 12 * 60, starfall: 63 * 60, valewalker: 88 * 60, lumen: 7 * 60, tidebreaker: 15 * 60, northbound: 22 * 60 },
  trophies: { 'ashen-crown': [0, 1, 2], 'neon-requiem': [0], starfall: [0, 1, 3, 4], valewalker: [0, 1, 2, 3, 4, 5], lumen: [0, 1], tidebreaker: [0], northbound: [0, 1] },
  wishlist: ['sands-meridian'],
  cart: [],
  wallet: 124.5,
  plan: null,
  downloads: [],
  notifications: [],
  recentSearch: ['valewalker', 'course'],
  captures: [],
  gifts: ['mimic-party', 'uno', 'among-us'],
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
    // drop ids that no longer exist in the catalogue
    for (const k of ['owned', 'installed', 'wishlist', 'cart']) merged[k] = merged[k].filter(id => byId[id]);
    merged.downloads = merged.downloads.filter(x => byId[x.id]);
    // consoles saved before a game was added receive it once, installed and on the home screen
    merged.gifts = Array.isArray(s.gifts) ? s.gifts : [];
    for (const id of ['mimic-party', 'uno', 'among-us']) {
      if (merged.gifts.includes(id)) continue;
      merged.gifts.push(id);
      if (!merged.owned.includes(id)) merged.owned.unshift(id);
      if (!merged.installed.includes(id)) merged.installed.unshift(id);
      merged.lastPlayed[id] = Date.now();
    }
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
