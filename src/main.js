import '@fontsource/source-sans-3/latin-300';
import '@fontsource/source-sans-3/latin-400';
import '@fontsource/source-sans-3/latin-600';
import '@fontsource/cinzel/latin-700';
import '@fontsource/bebas-neue/latin-400';
import '@fontsource/syncopate/latin-700';
import '@fontsource/cormorant-garamond/latin-600';
import '@fontsource/teko/latin-600';
import '@fontsource/big-shoulders-display/latin-800';
import '@fontsource/unbounded/latin-700';
import '@fontsource/rajdhani/latin-600';
import '@fontsource/josefin-sans/latin-300';
import '@fontsource/playfair-display/latin-700-italic';
import '@fontsource/anton/latin-400';
import './styles.css';

import { nav } from './nav.js';
import { bg } from './bg.js';
import { audio } from './audio.js';
import { state } from './state.js';
import { go, resetTo, toast, applySettings } from './shell.js';
import { tickDownloads } from './actions.js';
import { openControlCenter } from './screens/cc.js';
import { searchScreen } from './screens/search.js';
import { bootScreen } from './screens/boot.js';

let started = false;

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

try {
  bg.init(document.getElementById('bg'), document.getElementById('bg-fallback'));
  applySettings();
  // global buttons: PS opens the Control Center from any regular screen; "/" opens search
  nav.global = a => {
    const top = nav.top;
    if (a === 'ps') { openControlCenter(); return true; }
    if (a === 'search' && top?.isScreen) { go(searchScreen); return true; }
    return false;
  };
  setInterval(() => tickDownloads(.25), 250);
  // unlock Web Audio on the first real gesture (iOS needs touchend/click)
  for (const ev of ['touchend', 'click', 'keydown']) addEventListener(ev, () => audio.init(), { once: true, capture: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) audio.suspend(); else if (started) audio.resume(); });
  resetTo(bootScreen, {});
  started = true;
} catch (e) {
  fatal(e);
}
