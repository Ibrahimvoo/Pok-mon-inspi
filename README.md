# Console UI — concept inspiré de la PS5

Une expérience web interactive qui reproduit l’ergonomie d’une console de salon de dernière génération : démarrage, choix de l’utilisateur, écran d’accueil, hub de jeu, boutique, fiches produit, bibliothèque, recherche, profil, paramètres et centre de contrôle. Tout se joue à la **manette**, au **clavier**, à la **souris** ou au **toucher**, directement dans le navigateur (Safari, Chrome, Firefox, Edge — ordinateur, iPad et iPhone en paysage).

> Projet de démonstration **non officiel**. Il n’est ni affilié à Sony Interactive Entertainment ni approuvé par elle. Les 18 jeux, studios et visuels sont fictifs ; aucun achat, téléchargement ou service en ligne réel n’a lieu.

## Lancer le projet

```bash
npm install
npm run dev       # serveur de développement (http://localhost:5173)
npm run build     # version de production dans dist/
npm run preview   # sert dist/ localement
```

`dist/` est un site statique : il peut être servi par n’importe quel hébergement. Le workflow `.github/workflows/pages.yml` le publie sur GitHub Pages à chaque push sur `main` (activez *Settings → Pages → Source : GitHub Actions* une fois).

## Commandes

| Action | Manette (DualSense / Xbox) | Clavier | Souris / toucher |
| --- | --- | --- | --- |
| Naviguer | Croix directionnelle, stick gauche | Flèches | Survol / balayage |
| Valider | ✕ / A | Entrée, Espace | Clic / tap |
| Retour | ○ / B | Échap, Retour arrière | Clic droit / bouton ‹ |
| Onglets | L1 / R1 | Q / E | — |
| Options | Options / Menu | O | Bouton « … » |
| Centre de contrôle | PS / Guide | P | Bouton PS (tactile) |
| Recherche / clavier virtuel | △ / Y | / ou T | Icône loupe |
| Faire pivoter la boîte 3D, parallaxe | Stick droit | — | Glisser / mouvement |
| Plein écran | — | F | Paramètres → Écran |

Les manettes sont détectées automatiquement (API Gamepad) : les indications en bas de l’écran passent aux symboles PlayStation, Xbox, Nintendo ou clavier selon le dernier périphérique utilisé. Le bouton de validation (✕ ou ○), l’intensité des vibrations et les icônes peuvent être changés dans *Paramètres → Accessoires et manettes*.

## Fonctionnalités

- **Accueil** : rangée de jeux ancrée comme sur console, hub contextuel (Jouer / Reprendre, activités, trophées, amis, actualités), onglets Jeux / Multimédia, musique d’ambiance qui change selon le jeu sélectionné.
- **Boutique** : carrousel à la une, rayons, offres, abonnements, catalogue filtrable et triable, panier, liste de souhaits, achat simulé avec porte-monnaie fictif (fonds insuffisants gérés).
- **Fiche produit** : boîte de jeu en 3D orientable, captures, description, informations, PEGI, évaluations.
- **Téléchargements** simulés avec progression en direct, installation, suppression et gestion du stockage.
- **Session de jeu simulée** : écran de chargement, plan cinématique, trophée débloqué, suspension / reprise depuis le centre de contrôle.
- **Recherche** universelle (jeux, applications, paramètres) avec clavier virtuel AZERTY, saisie physique et tactile.
- **Profil** (niveau, trophées, progression, amis), **paramètres** fonctionnels et enregistrés (son, qualité graphique, parallaxe 3D, accessibilité, manettes, stockage, réseau, compte, réinitialisation).
- **Centre de contrôle** : notifications, téléchargements, amis, musique, son, accessibilité, manettes, mode repos / extinction / redémarrage.
- Écrans de chargement, repli sans WebGL, gestion des erreurs non bloquante, persistance locale.

## Technique

- **Vite + JavaScript natif** (aucun framework, ~45 Ko gzip), modules ES, CSS pur avec une interface qui se met à l’échelle comme une TV (1rem = 10 px en 1080p).
- **Arrière-plan WebGL** : parallaxe 2.5D à partir de cartes de profondeur, fondus enchaînés, particules, thème dynamique ; mis en pause sous les écrans opaques et quand l’onglet est masqué.
- **Visuels originaux** : chaque jaquette, fond et capture est rendu par `tools/art/shader.glsl` (paysages raymarchés, océan, espace, ville néon, forêt, ruines…) via `npm run art` (Chromium headless), puis traité par `tools/post.py` (bloom) et `tools/thumbs.py`.
- **Audio** entièrement synthétisé avec Web Audio (sons d’interface, carillon de démarrage, trophées, musique générative).
- `tools/smoke.mjs` pilote la version compilée dans Chromium headless (clavier, toucher, manette simulée) et enregistre des captures.

Polices : Source Sans 3 et polices d’affichage open source via Fontsource (licence OFL).
