// Install the console on the home screen, on every phone: Android (Chrome, Samsung Internet, Edge, Firefox…) uses the
// web app manifest and the install prompt; iPhone and iPad use Safari's Share menu. Settings › Système shows the right
// steps for the browser in use, and phones get a one-time hint.
import { h, icon } from './ui.js';
import { toast, dialog } from './shell.js';
import { IOS as IOS_PLATFORM } from './input.js';

const UA = navigator.userAgent || '';
const IOS = IOS_PLATFORM || /iPhone|iPad|iPod/.test(UA);
const ANDROID = /Android/i.test(UA);
const SAMSUNG = /SamsungBrowser/i.test(UA);
const FIREFOX = /Firefox|FxiOS/i.test(UA);
// browsers built into messaging apps cannot install pages: the link has to be opened in the real browser first
const IN_APP = /FBAN|FBAV|FB_IAB|Instagram|Messenger|Snapchat|Line\/|TikTok|musical_ly|Twitter|WhatsApp/i.test(UA);
const HINTED = 'ps5ux.installHint';

let deferred = null;
// Chrome, Edge and Samsung Internet announce that the page can be installed (they also show their own banner)
addEventListener('beforeinstallprompt', e => { deferred = e; });
addEventListener('appinstalled', () => {
  deferred = null;
  toast({ title: 'Console installée', sub: 'Ouvrez-la depuis l’écran d’accueil', icon: 'check', log: false });
});

export const installed = () => matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true;
export const canPrompt = () => !!deferred;

// the service worker makes the console installable; it caches nothing (see public/sw.js)
export function registerInstall() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* not available here (private browsing, embedded page) */ });
  }
  const phone = IOS || ANDROID;
  let seen = true;
  try { seen = !!localStorage.getItem(HINTED); } catch { /* storage blocked: no hint */ }
  if (phone && !seen && !installed()) setTimeout(() => {
    try { localStorage.setItem(HINTED, '1'); } catch { /* ignore */ }
    toast({ title: 'Installez la console sur l’écran d’accueil', sub: 'Paramètres › Système › Installer sur l’écran d’accueil', icon: 'download', log: false });
  }, 9000);
}

// the steps for this browser (each step: text, with the name of the button in bold)
function steps() {
  if (IN_APP) return [['Ce navigateur intégré (messagerie, réseau social) ne peut pas installer d’application.'], ['Touchez le menu ', '⋯', ' puis ', IOS ? 'Ouvrir dans Safari' : 'Ouvrir dans le navigateur', '.'], ['Recommencez depuis Safari ou Chrome.']];
  if (IOS) return [['Dans ', 'Safari', ', touchez le bouton ', 'Partager', ' (le carré avec une flèche vers le haut).'], ['Faites défiler et choisissez ', 'Sur l’écran d’accueil', '.'], ['Touchez ', 'Ajouter', '.']];
  if (SAMSUNG) return [['Touchez le menu ', '≡', ' en bas de l’écran (ou l’icône d’installation dans la barre d’adresse).'], ['Choisissez ', 'Ajouter la page à', ' puis ', 'Écran d’accueil', '.'], ['Confirmez avec ', 'Ajouter', '.']];
  if (FIREFOX) return [['Touchez le menu ', '⋮', '.'], ['Choisissez ', 'Installer', ' (ou ', 'Ajouter à l’écran d’accueil', ').'], ['Confirmez avec ', 'Ajouter', '.']];
  if (ANDROID) return [['Touchez le menu ', '⋮', ' en haut à droite.'], ['Choisissez ', 'Installer l’application', ' (ou ', 'Ajouter à l’écran d’accueil', ').'], ['Confirmez avec ', 'Installer', '.']];
  return [['Cliquez sur l’icône d’installation dans la barre d’adresse, ou ouvrez le menu du navigateur.'], ['Choisissez ', 'Installer', ' (ou ', 'Ajouter à l’écran d’accueil', ' sur un téléphone).']];
}

export function installGuide() {
  if (installed()) {
    dialog({ title: 'Déjà installée', body: h('p', 'Vous utilisez la console depuis l’écran d’accueil. Les parties restent ouvertes à vos amis qui jouent dans Safari, Chrome ou un autre navigateur.'), actions: [{ label: 'OK', primary: true }] });
    return;
  }
  const list = h('ol.install-steps', steps().map(parts => h('li', parts.map((p, i) => (i % 2 ? h('b', p) : p)))));
  const actions = [];
  if (deferred) actions.push({ label: 'Installer maintenant', primary: true, icon: 'download', onok: async () => {
    const e = deferred; deferred = null;
    try { await e.prompt(); await e.userChoice; } catch { /* the browser refused: the steps above still work */ }
  } });
  actions.push({ label: 'Fermer', primary: !deferred, sound: 'back' });
  dialog({ title: 'Installer sur l’écran d’accueil', wide: true, actions,
    body: h('div', deferred ? h('p', 'Ce navigateur peut installer la console directement. Sinon :') : null, list,
      h('p.install-note', h('span.icw', { html: icon('info') }), 'La console s’ouvre alors en plein écran comme une application. Elle reste à jour toute seule, et vous pouvez jouer avec des amis qui utilisent le navigateur.')) });
}
