// Settings: two-pane layout; every option is functional and persisted.
import { byId, PLANS, GAMES } from '../data.js';
import { isPhoto } from '../avatars.js';
import { pickPhoto } from '../photo.js';
import { session } from '../session.js';
import { net } from '../net.js';
import { IOS, readLifelog } from '../input.js';
import { state, save, bus, resetAll, usedStorage, STORAGE_USABLE, STORAGE_TOTAL } from '../state.js';
import { h, icon, size, price, art, img, wait } from '../ui.js';
import { go, toast, confirmDialog, applySettings, renderHints, resetTo, menu } from '../shell.js';
import { nav } from '../nav.js';
import { audio } from '../audio.js';
import { bg } from '../bg.js';
import { input, padKind, toggleFullscreen } from '../input.js';
import { toggle, slider, cycle, action, info, adjustable } from '../widgets.js';
import { uninstall } from '../actions.js';

export const CATEGORIES = [
  { id: 'sound', label: 'Son', icon: 'volume', keywords: 'audio volume musique effets sonores' },
  { id: 'display', label: 'Écran et vidéo', icon: 'display', keywords: 'graphismes qualité parallaxe 3d plein écran' },
  { id: 'access', label: 'Accessibilité', icon: 'access', keywords: 'animations contraste taille du texte' },
  { id: 'pads', label: 'Accessoires', icon: 'gamepad', keywords: 'manette dualsense vibrations boutons clavier' },
  { id: 'family', label: 'Famille et contrôle parental', icon: 'lock', keywords: 'enfant âge pegi restriction vocal' },
  { id: 'captures', label: 'Captures et diffusions', icon: 'display', keywords: 'capture écran vidéo créer share galerie' },
  { id: 'saved', label: 'Données sauvegardées et paramètres jeu/appli', icon: 'storage', keywords: 'sauvegarde cloud synchronisation' },
  { id: 'storage', label: 'Stockage', icon: 'storage', keywords: 'espace ssd supprimer jeux' },
  { id: 'network', label: 'Réseau', icon: 'wifi', keywords: 'internet connexion wi-fi test' },
  { id: 'users', label: 'Utilisateurs et comptes', icon: 'user', keywords: 'profil porte-monnaie fonds compte abonnement' },
  { id: 'system', label: 'Système', icon: 'settings', keywords: 'heure horloge réinitialiser version à propos' },
];
const COLORS = ['#2f8cff', '#ff7a3d', '#5dffb0', '#ff3d9a', '#ffc27a', '#a78bfa', '#59d6ff', '#f87171', '#facc15', '#34d399'];

function panelFor(cat, layer) {
  const s = state.settings;
  const A = applySettings;
  switch (cat) {
    case 'sound': return [
      toggle('Effets sonores', 'Sons de navigation et de notification', 'sfx', A),
      slider('Volume des effets sonores', null, 'sfxVol', v => { A(); audio.play('move'); }),
      toggle('Musique de l’écran d’accueil', 'Ambiance générée en temps réel, adaptée au jeu sélectionné', 'music', A),
      slider('Volume de la musique', null, 'musicVol', A),
      toggle('Réduction du bruit (appels)', 'Filtre les bruits de fond du micro. L’annulation d’écho reste toujours active pour parler sans casque.', 'noiseSuppression', A),
      info('Pendant un appel', 'La musique se coupe pour éviter l’écho dans le haut-parleur'),
    ];
    case 'display': return [
      cycle('Qualité graphique', 'Résolution de rendu et particules de l’arrière-plan', 'quality', [['high', 'Élevée'], ['balanced', 'Équilibrée'], ['eco', 'Économie d’énergie']], A),
      toggle('Effet de profondeur 3D', 'Parallaxe des arrière-plans selon la souris, le stick droit ou l’inclinaison', 'parallax', A),
      action('Plein écran', 'Touche F au clavier', () => { audio.play('ok'); toggleFullscreen(); }),
      info('Rendu', bg.webgl ? 'WebGL · cartes de profondeur' : 'Mode compatibilité (CSS)'),
      info('Affichage', `${innerWidth} × ${innerHeight} · ×${(devicePixelRatio || 1).toFixed(1)}`),
    ];
    case 'access': return [
      toggle('Réduire les animations', 'Transitions instantanées, sans zoom ni parallaxe automatique', 'reduceMotion', A),
      toggle('Contraste élevé', 'Assombrit les arrière-plans derrière le texte', 'contrast', A),
      toggle('Texte plus grand', 'Agrandit l’ensemble de l’interface', 'bigText', A),
    ];
    case 'pads': {
      const pads = input.pads();
      const kindName = { ps: 'Manette sans fil DualSense', xbox: 'Manette Xbox', nintendo: 'Manette Nintendo', generic: 'Manette de jeu' };
      return [
        h('div.pad-list', pads.length ? pads.map(p => h('div.pad-row', h('span.icw', { html: icon('gamepad') }), h('div', kindName[padKind(p.id)], h('small', `${p.id.slice(0, 60)} · ${p.mapping === 'standard' ? 'disposition standard' : 'disposition inconnue'}`)), h('span', { style: { marginLeft: 'auto', color: 'var(--dim)', fontSize: '1.8rem' } }, 'Connectée')))
          : h('div.pad-row', h('span.icw', { html: icon('gamepad') }), h('div', 'Aucune manette détectée', h('small', 'Branchez une manette (USB ou Bluetooth) puis appuyez sur un bouton.')))),
        IOS ? h('div.fblock.ios-note', { f: true, style: { margin: '0 0 2rem', maxWidth: '110rem' } }, h('div.st', { style: { fontSize: '2.3rem', marginBottom: '1rem' } }, 'Bouton PS sur iPhone et iPad'),
          h('div.about', 'iOS réserve le bouton PS (Home) de la manette : un appui ouvre l’app Jeux d’Apple et met cette page en arrière-plan. Une page web ne peut pas désactiver ce comportement (seule une app native le peut). Ici, le centre de contrôle s’ouvre avec le pavé tactile ou en maintenant Options. Quand vous revenez, la console reprend exactement là où vous étiez.')) : null,
        cycle('Bouton de validation', 'Choisissez le bouton qui confirme une sélection', 'confirm', [['cross', 'Croix (✕)'], ['circle', 'Rond (○)']], A),
        cycle('Intensité des vibrations', null, 'vib', [[0, 'Désactivées'], [1, 'Faibles'], [2, 'Moyennes'], [3, 'Fortes']], A),
        action('Tester les vibrations', null, () => { audio.play('ok'); if (!pads.length) toast({ title: 'Aucune manette', sub: 'Connectez une manette pour tester les vibrations', icon: 'gamepad', sound: 'error', log: false }); input.rumble(1, 1, 450); }),
        cycle('Icônes des boutons', 'Indications affichées en bas de l’écran', 'glyphs', [['auto', 'Automatique'], ['ps', 'PlayStation'], ['xbox', 'Xbox'], ['kb', 'Clavier']], A),
        h('div.fblock', { f: true, style: { margin: '3rem 0 0', maxWidth: '110rem' } }, h('div.st', { style: { fontSize: '2.3rem', marginBottom: '1.4rem' } }, 'Raccourcis clavier'),
          h('div.about', 'Flèches : naviguer · Entrée / Espace : valider · Échap / Retour arrière : retour · Q / E : onglets (L1 / R1) · O : options · T : triangle · P : centre de contrôle · / : recherche · F : plein écran')),
      ];
    }
    case 'family': return [
      cycle('Restriction d’âge des jeux', 'Les jeux dont la classification PEGI dépasse cette limite ne peuvent pas être lancés', 'ageLimit', [[0, 'Aucune restriction'], [7, 'PEGI 7 maximum'], [12, 'PEGI 12 maximum'], [16, 'PEGI 16 maximum']], A),
      toggle('Chat vocal et appels', 'Autoriser les groupes vocaux et les appels avec les amis', 'voiceAllowed', A),
    ];
    case 'captures': return [
      toggle('Notification après une capture', null, 'captureToast', A),
      info('Capture d’écran', 'Bouton Créer (Share) ou touche C'),
      action('Ouvrir la galerie multimédia', `${state.captures.length} élément(s)`, () => { audio.play('ok'); import('./create.js').then(m => go(m.galleryScreen)); }),
    ];
    case 'saved': return [
      toggle('Synchroniser automatiquement les sauvegardes', 'Sauvegardes locales de cet appareil (aucun envoi réel dans le cloud)', 'cloudSync', A),
      info('Progression enregistrée', `${Object.keys(state.trophies).length} jeux · ${state.captures.length} captures`),
    ];
    case 'storage': {
      const used = usedStorage(), sys = STORAGE_TOTAL - STORAGE_USABLE;
      const games = [...state.installed].sort((a, b) => byId[b].size - byId[a].size);
      return [
        h('div', { style: { fontSize: '2.2rem' } }, `${size(STORAGE_USABLE - used)} libres sur ${size(STORAGE_USABLE)}`),
        h('div.storage-bar', games.map((id, i) => h('i', { style: { width: byId[id].size / STORAGE_TOTAL * 100 + '%', background: COLORS[i % COLORS.length] } })), h('i', { style: { width: sys / STORAGE_TOTAL * 100 + '%', background: 'rgba(255,255,255,.35)' } })),
        h('div.storage-legend', h('span', h('i', { style: { background: COLORS[0] } }), `Jeux et applications · ${size(used)}`), h('span', h('i', { style: { background: 'rgba(255,255,255,.35)' } }), `Système · ${size(sys)}`)),
        ...games.map(id => action(byId[id].title, `${size(byId[id].size)} · sélectionnez pour supprimer`, () => { audio.play('ok'); uninstall(id); }, h('span.icw', { html: icon('trash') }))),
      ];
    }
    case 'network': {
      const box = h('div.net-test', ['Téléchargement', 'Envoi', 'Latence'].map(l => h('div', h('b', '—'), h('span', l))));
      let running = false;
      return [
        info('Connexion', 'Wi-Fi 6 · « Maison_5G » (simulé)'),
        info('Adresse IP', '192.168.1.42'),
        action('Tester la connexion Internet', 'Mesure simulée du débit', async () => {
          if (running) return; running = true; audio.play('ok');
          const [d, u, p] = box.querySelectorAll('b');
          for (let i = 0; i < 24; i++) { d.textContent = Math.round(180 + Math.random() * 260) + ' Mb/s'; u.textContent = Math.round(40 + Math.random() * 60) + ' Mb/s'; p.textContent = Math.round(8 + Math.random() * 14) + ' ms'; await wait(90); }
          d.textContent = '412 Mb/s'; u.textContent = '87 Mb/s'; p.textContent = '11 ms';
          audio.play('notify'); running = false;
        }),
        box,
      ];
    }
    case 'users': {
      const u = session.current || { psn: '—', avatar: GAMES[0].id };
      const plan = PLANS.find(p => p.id === state.plan);
      const setAvatar = async a => {
        try {
          if (session.online) await net.api('/api/me', { method: 'PATCH', body: { avatar: a } });
          session.use({ ...u, avatar: a }, !!u.online);
          toast({ title: isPhoto(a) ? 'Photo de profil mise à jour' : 'Avatar mis à jour', img: art.thumb(a), log: false });
          layer.refresh();
        } catch (e) { toast({ title: 'Modification impossible', sub: e.message, icon: 'user', sound: 'error', log: false }); }
      };
      const fromGallery = async () => {
        try { const a = await pickPhoto(); if (a) await setAvatar(a); }
        catch (e) { toast({ title: 'Photo impossible', sub: e.message, icon: 'user', sound: 'error', log: false }); }
      };
      const changeAvatar = el => menu([{ label: 'Choisir une photo (galerie)…', icon: 'plus', onok: fromGallery },
        ...GAMES.slice(0, 12).map(g => ({ label: g.title + (g.id === u.avatar ? '  ✓' : ''), icon: 'user', onok: () => setAvatar(g.id) }))], el);
      return [
        info('Identifiant en ligne', u.psn),
        info('Type de compte', u.online ? `Compte en ligne · ${net.status === 'online' ? 'connecté' : 'reconnexion…'}` : 'Profil hors ligne (cet appareil uniquement)'),
        action('Changer d’avatar', null, e => { audio.play('ok'); changeAvatar(e.currentTarget); }, h('div.avatar', { style: { width: '5rem', height: '5rem' } }, img(art.thumb(u.avatar)))),
        info('Porte-monnaie', price(state.wallet)),
        action('Ajouter 50 € (simulé)', 'Fonds fictifs pour tester les achats', () => { state.wallet = +(state.wallet + 50).toFixed(2); save('wallet'); audio.play('purchase'); layer.refresh(); }),
        info('Abonnement', plan ? plan.name : 'Aucun'),
        action('Changer d’utilisateur', null, () => { audio.play('ok'); import('./boot.js').then(m => go(m.usersScreen, { switching: true })); }),
        action('Se déconnecter', u.online ? 'Ferme la session sur cet appareil (le compte reste sur le serveur)' : 'Revenir à l’écran de sélection', () => {
          audio.play('ok');
          confirmDialog('Se déconnecter ?', 'Vous quitterez votre groupe et vos appels en cours.', 'Se déconnecter', async () => {
            const { voice } = await import('../rtc.js'); voice.leave();
            await session.signOut();
            const m = await import('./boot.js'); resetTo(m.usersScreen, {});
          }, { danger: true });
        }),
      ];
    }
    case 'system': return [
      toggle('Format 24 heures', 'Affichage de l’horloge', 'clock24', A),
      info('Version', 'Console UI Concept 2.0'),
      action('Journal des interruptions', 'Ce que le système a fait de l’application (arrière-plan, rechargement, reprise)', () => {
        audio.play('ok');
        const label = { launch: 'Démarrage', suspend: 'Mise en arrière-plan', resume: 'Retour au premier plan', freeze: 'Gel par le système', restored: 'Session restaurée' };
        const why = e => e.type === 'launch' ? (e.discarded ? 'page rechargée après suppression par le système' : e.nav === 'reload' ? 'page rechargée' : 'ouverture') : e.type === 'resume' ? `absent ${Math.round((e.away || 0) / 1000)} s${e.reason === 'bfcache' ? ' · restauration du cache' : ''}` : e.type === 'restored' ? `${e.screens} écran(s)${e.game ? ' · jeu ' + (byId[e.game]?.title || '') : ''}` : e.reason || '';
        const list = readLifelog();
        import('../shell.js').then(s => s.dialog({ title: 'Journal des interruptions', wide: true, body: h('div.trophy-list', list.length ? list.map(e => h('div.trophy-item', h('div', h('div.tn', label[e.type] || e.type), h('div.td', why(e))), h('div.tr', new Date(e.t).toLocaleTimeString('fr-FR')))) : h('div', 'Aucun évènement.')), actions: [{ label: 'Fermer', primary: true, sound: 'back' }] }));
      }),
      action('Réinitialiser l’expérience', 'Efface la bibliothèque, les achats et les réglages enregistrés dans ce navigateur', () => {
        audio.play('ok');
        confirmDialog('Réinitialiser ?', 'Toutes les données locales (achats simulés, téléchargements, trophées, réglages) seront effacées.', 'Réinitialiser', () => { resetAll(); location.reload(); }, { danger: true });
      }),
      h('div.fblock', { f: true, style: { margin: '3rem 0 0', maxWidth: '110rem' } }, h('div.about',
        'Projet de démonstration non officiel, inspiré de l’interface de la PlayStation 5. Il n’est ni affilié à Sony Interactive Entertainment ni approuvé par elle. ',
        'Tous les jeux, studios, visuels et sons sont des créations originales : les visuels sont calculés par des shaders 3D, la musique et les effets sont synthétisés en temps réel. ',
        'Aucun achat, téléchargement ou service en ligne réel n’est effectué.')),
    ];
  }
  return [];
}

export function settingsScreen({ cat: start = 'sound' } = {}) {
  let cat = start;
  const catEls = CATEGORIES.map(c => {
    const el = h('div.set-cat', { f: true, 'data-cat': c.id, onok: () => { const first = panel.querySelector('[data-f]'); if (first) nav.focus(first); } }, h('span.icw', { html: icon(c.icon) }), c.label);
    el.addEventListener('focus:f', () => show(c.id));
    return el;
  });
  const panel = h('div.set-panel', { 'data-scroll': 'y', 'data-pad': 120 });
  const root = h('div.settings', h('div.page-head', h('h1', { style: { display: 'flex', gap: '1.4rem', alignItems: 'center' } }, h('span.icw', { html: icon('settings') }), 'Paramètres')),
    h('div.page', h('div.set-nav', { 'data-group': 'cats' }, catEls), panel));
  function show(id, force) {
    if (id === cat && !force && panel.childElementCount) return;
    cat = id;
    catEls.forEach(e => e.classList.toggle('on', e.dataset.cat === id));
    const c = CATEGORIES.find(x => x.id === id);
    panel.replaceChildren(h('h2', c.label), ...panelFor(id, layer));
    panel.scrollTop = 0;
  }
  const onChange = e => { if (['installed', 'downloads'].includes(e.detail) && cat === 'storage' && nav.top === layer) { if (e.detail === 'installed') layer.refresh(); } };
  bus.addEventListener('change', onChange);
  const layer = {
    root, bg: null, mood: 'home', shade: 1, dim: .6,
    hints: [['ok', 'Sélectionner'], ['back', 'Retour']],
    refresh() {
      const idx = [...panel.querySelectorAll('[data-f]')].indexOf(layer.focused);
      show(cat, true);
      const all = panel.querySelectorAll('[data-f]');
      if (idx >= 0 && all.length) nav.focus(all[Math.min(idx, all.length - 1)], { silent: true, instant: true });
      else if (idx >= 0) nav.focus(catEls.find(e => e.dataset.cat === cat), { silent: true });
    },
    onAction(a) {
      if (adjustable(layer, a)) return true;
      if (a === 'back' && panel.contains(layer.focused)) { nav.focus(catEls.find(e => e.dataset.cat === cat)); audio.play('back'); return true; }
      if (a === 'left' && panel.contains(layer.focused)) { nav.focus(catEls.find(e => e.dataset.cat === cat)); return true; }
      if (a === 'right' && layer.focused?.classList.contains('set-cat')) { const f = panel.querySelector('[data-f]'); if (f) nav.focus(f); return true; }
    },
    onResume() { if (cat === 'users' || cat === 'storage' || cat === 'pads') layer.refresh(); },
    onLeave: () => bus.removeEventListener('change', onChange),
  };
  show(cat, true);
  catEls.find(e => e.dataset.cat === cat).setAttribute('data-autofocus', '');
  return layer;
}
