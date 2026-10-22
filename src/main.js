import './fonts.js';
import './styles.css';

import { nav } from './nav.js';
import { bg } from './bg.js';
import { lifecycle, lifelog } from './input.js';
import { session } from './session.js';
import { openCreateMenu } from './screens/create.js';
import { audio } from './audio.js';
import { state } from './state.js';
import { go, resetTo, toast, applySettings, loadNav } from './shell.js';
import { tickDownloads } from './actions.js';
import { openControlCenter } from './screens/cc.js';
import { searchScreen } from './screens/search.js';
import { bootScreen, resumeScreen } from './screens/boot.js';
import { ROUTES } from './routes.js';
import './social.js';
import './partyhud.js';
import './videodock.js';

let started = false;

// Static hosts (GitHub Pages) may serve a cached copy: load the newer build once it has been published.
// Safari keeps its own cache (separate from the home-screen app) and can answer a plain reload from it, so the
// page is reopened at a fresh address (?v=…), which the browser has never cached; the marker is removed afterwards.
const FRESH = 'v';
async function checkVersion() {
  const mine = document.querySelector('script[type="module"][src]')?.getAttribute('src');
  if (!mine || location.protocol === 'file:') return;
  try {
    const html = await (await fetch(location.pathname, { cache: 'no-store' })).text();
    const latest = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1];
    const key = 'ps5ux.reloadedFor';
    if (latest && latest !== mine && sessionStorage.getItem(key) !== latest) {
      sessionStorage.setItem(key, latest);
      const u = new URL(location.href);
      u.searchParams.set(FRESH, Date.now().toString(36));
      location.replace(u.href);
    }
  } catch { /* offline: keep the current version */ }
}
function dropFreshMarker() {
  if (!new URLSearchParams(location.search).has(FRESH)) return;
  const u = new URL(location.href);
  u.searchParams.delete(FRESH);
  try { history.replaceState(history.state, '', u.pathname + u.search + u.hash); } catch { /* ignore */ }
}

function fatal(err) {
  const msg = String(err?.message || err || 'Erreur inconnue');
  const el = document.createElement('div');
  el.className = 'fatal';
  el.innerHTML = '<div><h1>Impossible de démarrer l’interface</h1><p>Un problème est survenu pendant le chargement. Rechargez la page pour réessayer.</p><button class="btn primary focused" type="button">Recharger</button><code></code></div>';
  el.querySelector('code').textContent = msg;
  el.querySelector('button').onclick = () => location.reload();
  addEventListener('keydown', e => { if (e.key === 'Enter') location.reload(); });
  document.body.append(el);
}

let lastErr = 0;
function report(err) {
  console.error(err);
  if (!started) return fatal(err);
  if (Date.now() - lastErr < 4000) return;
  lastErr = Date.now();
  toast({ title: 'Une erreur est survenue', sub: 'L’interface continue de fonctionner normalement', icon: 'info', sound: 'error', log: false });
}
addEventListener('error', e => { if (e.target && e.target !== window && e.target.tagName) return; report(e.error || e.message); }, true);
addEventListener('unhandledrejection', e => report(e.reason));

// iOS Safari only turns a tap into a click when the touched element, or an ancestor below <body>, listens for
// clicks (or shows a pointer cursor). Most controls are <div data-f> handled by the delegated listener in input.js:
// without these no-op listeners, the avatar, the user cards and the menus never received the tap on iPhone.
for (const id of ['app', 'hud']) document.getElementById(id)?.addEventListener('click', () => {});

try {
  dropFreshMarker();
  bg.init(document.getElementById('bg'), document.getElementById('bg-fallback'));
  applySettings();
  // global buttons: PS opens the Control Center from any regular screen; "/" opens search
  nav.global = a => {
    const top = nav.top;
    if (a === 'ps') { openControlCenter(); return true; }
    if (a === 'search' && top?.isScreen) { go(searchScreen); return true; }
    if (a === 'gamebase' && session.current) { if (top?.route?.name !== 'gamebase') go(ROUTES.gamebase, { tab: 'party' }); return true; }
    if (a === 'create' && session.current) { openCreateMenu(); return true; }
    return false;
  };
  setInterval(() => tickDownloads(.25), 250);
  // unlock Web Audio on the first real gesture (iOS needs touchend/click)
  for (const ev of ['touchend', 'click', 'keydown']) addEventListener(ev, () => audio.init(), { once: true, capture: true });
  lifecycle.addEventListener('suspend', () => audio.suspend());
  // route changes, restarts and the microphone show up in Settings › System › Journal des interruptions
  audio.events.addEventListener('log', e => lifelog({ type: 'audio', ...e.detail }));
  lifecycle.addEventListener('resume', () => { if (started) audio.resume(); });
  resetTo(loadNav() ? resumeScreen : bootScreen, {});
  checkVersion();
  started = true;
} catch (e) {
  fatal(e);
}
