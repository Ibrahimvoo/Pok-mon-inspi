# Pixémon Éclipse : consignes de travail

## Règle principale : chaque token doit être utile
- Analyser correctement avant d'agir (éviter les tentatives inutiles), puis agir dès qu'on en sait assez.
- Ne pas répéter ce qui est déjà établi ni réexpliquer le projet ; réponses courtes.
- Modifications ciblées et regroupées ; pas de refactoring inutile ; la solution simple d'abord.
- Réserver la réflexion poussée à ce qui compte : architecture, bugs complexes, gameplay, logique, performance, cohérence.
- Comparer vite les options, éliminer les mauvaises, puis exécuter.
- Ne jamais sacrifier la qualité : comprendre → identifier l'essentiel → choisir l'approche → exécuter → vérifier → corriger seulement le nécessaire → passer à la suite.

## Repères rapides
- Jeu en un seul fichier : `node tools/build.mjs` produit `index.html` (src/shell.html + src/game.js + src/world.js + modules src/v10/*.js concaténés par ordre alphabétique).
- game.js est énorme : chercher avec grep, ne pas relire de gros fichiers.
- Un module étend le jeu en enveloppant une fonction globale : `{const old=f;f=async function(...a){…;return old.apply(this,a)}}`.
- Tests : `node tools/play.mjs tools/scn-XXX.js` (solo) ; `NETMOD=$PWD/tools/relais/node_modules node tools/net2.mjs tools/scn-XXX.js` (à plusieurs, à lancer seul).
- Branche de travail : `claude/pokemon-game-overhaul-zqd6yr` ; publication : copier index.html sur `gh-pages`.
- Commits en français, sans nom de modèle ; toujours committer et pousser à la fin.
- Ne pas redessiner créatures/personnages sans demande (graphismes Tuxemon, CC BY-SA 4.0).
- Ne jamais afficher ni affaiblir le mot de passe du créateur.
