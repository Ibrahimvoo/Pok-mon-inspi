# Pixémon Éclipse

Un jeu de créatures en pixel art, en un seul fichier HTML : **ouvre `index.html` dans un navigateur** (ordinateur ou mobile).

**Commandes** : flèches/ZQSD pour bouger · Espace/Entrée = A · Échap = B (maintenir pour courir) · M = menu · souris et écran tactile acceptés.

## L'histoire

Aurélys vit au rythme du Cycle : le jour, Solarion veille ; la nuit, les créatures d'ombre s'éveillent… mais les nuits sont étrangement courtes.

- **Acte I** : Bourg-Lueur, la Route 1, Cendreville et le Badge Roc de Brasia, qui confie le Bracelet du Cycle. La Team Éclipse pille alors la Mine de Cendreville pour voler des Éclats d'Aube : il faut y sauver Tito, l'apprenti mineur, face au lieutenant Corvin. Puis la Forêt Murmure et le Mont Braise, où Vex, chef de la Team Éclipse, vole le Cœur d'Aube de Solarion et plonge la région dans une éclipse.
- **Acte II** : la Rive Brumeuse, Port-Miroir et sa championne Maëlle, la Grotte Écho, plongée dans le noir, et l'Observatoire. Là, on découvre qui est vraiment Vex, ce que les fondateurs d'Aurélys ont fait à Nocturion, le gardien de la nuit, et pourquoi il faut rétablir l'équilibre plutôt que de vaincre la nuit.
- **Après la fin** : un vrai cycle jour/nuit, Valen et Maëlle réunis sur le ponton, le Tournoi du Cycle de Brasia (quatre combats d'affilée et un Panthéon), des revanches d'arène, les Ruines de l'Aube et leur Sablier du Cycle, Solarion et Nocturion à défier, le journal de Valen, les Éclats d'Aube et le Pixédex à compléter.

## Ce qui fait le jeu

| Système | En bref |
|---|---|
| Éveil du Cycle | Le Bracelet de Brasia se charge à chaque coup donné ou reçu. Une fois par combat, ÉVEIL DU CYCLE éveille la créature : Solaire le jour (Attaque et Vitesse +1, soin), Lunaire la nuit (Attaque et Défense +1, statuts guéris). Vex, Maëlle, Kael et les gardiens s'éveillent aussi. |
| Lien | Chaque créature a un lien (5 cœurs) qui grandit en marchant en tête, en gagnant, en montant de niveau, au feu de camp ou avec des Biscuits d'Aube. Un lien fort lui fait tenir un coup fatal, chasser ses statuts, réussir plus de critiques et remplir plus vite la jauge d'Éveil. |
| Objets tenus | Baies (Sève, Prisme), Miettes Dorées, Ruban Ténacité, Griffe Vive, Amulette Savante, Orbe Furie, Grelot Écho et un renforçateur par type. Arbres à baies qui repoussent chaque jour ; la Boutique rachète les objets. |
| Tableau des Missions | Dans les Centres de Soins : trois missions (capture, chasse par type, pêche) récompensées par de l'argent et des objets, remplacées dès qu'on touche la récompense. |
| IA des dresseurs | Les dresseurs envoient la créature la mieux placée face à la tienne ; les boss gardent leur atout pour la fin et rappellent une créature en mauvaise posture. |
| Cycle jour/nuit | Le temps avance à chaque pas. Les créatures, les PNJ, les soins et certains talents changent selon l'heure. Le lit de la maison (puis le Sablier) permet de choisir l'heure. |
| Événements | Averses (combats sous la pluie, créatures d'eau dans les herbes) et essaim du jour, annoncé dans le journal. |
| Affinités de terrain | Ronces → une créature PLANTE dans l'équipe ; rocher fissuré → ROCHE ; brasier → EAU. Elles ouvrent des raccourcis et des secrets. |
| Énigmes | Arène de Brasia : pousser des rochers dans les failles. Arène de Maëlle : deux vannes inversent la marée. Ruines : un casse-tête de rochers plus corsé. |
| Ciel de combat | Pluie, Zénith et Éclipse durent 5 tours et modifient les dégâts. Une attaque LUMIÈRE dissipe une éclipse. |
| Statuts et talents | Brûlure, poison, paralysie, sommeil ; chaque espèce a un talent passif annoncé en combat (Fermeté, Glissade, Sève Vive…). |
| PP et IA | Les capacités s'usent. Les dresseurs visent juste ; les boss posent des statuts, changent le ciel et utilisent des potions. |
| EXP partagée | Les participants gagnent toute l'EXP, le reste de l'équipe la moitié. |
| Compagnon | La créature de tête suit le joueur, réagit quand on lui parle et flaire les objets cachés. |
| Exploration | Pêche (canne de Gus), 12 Éclats d'Aube et l'Ermite Lumen, quête de Lili, 4 pages du journal de Valen, Pixédex récompensé, Repousse, créatures chromatiques. |

## Mise en scène

Cinématiques avec bandes noires, caméra et bulles d'émotion ; portraits animés dans les dialogues ; intro illustrée ; écran de badge ; générique de fin. En combat : vol stationnaire des créatures ailées, élan des attaques, effets propres à chaque type et à chaque capacité de soutien, zoom sur les critiques, barre d'EXP animée, transitions selon la situation. Dans le monde : lumières de nuit, brume, nuages, oiseaux, poissons, pluie. Musique chiptune par lieu (villes, routes, forêt, montagne, arènes, éclipse, ruines, combats, finale).

Le menu contient la carte de la région, le journal des quêtes (sur plusieurs pages) et les options (son, compagnon, vitesse du texte, combats rapides). L'écran titre présente les nouveautés de la version 4.0. Les sauvegardes des versions précédentes sont reprises automatiquement : les créatures reçoivent un lien selon leur niveau, et le Bracelet du Cycle est remis si le Badge Roc est déjà obtenu.

## Développement

```
src/shell.html      page, style et pad tactile
src/game.js         code du jeu (données, cartes, histoire, combat, rendu)
src/sprites.json    sprites des créatures (PNG base64, 48/96/120 px)
tools/build.mjs     assemble index.html             → node tools/build.mjs
tools/art.mjs       dessine les nouvelles créatures  → node tools/art.mjs [id…]
tools/sim.mjs       simule les combats de boss      → node tools/sim.mjs   (V3=1 : sans Éveil ni lien, BOND=0..5)
tools/play.mjs      parcours automatique (Playwright) → node tools/play.mjs tools/scn-story.js
tools/scn-v4.js     teste les mécaniques 4.0         → node tools/play.mjs tools/scn-v4.js
tools/fontcheck.mjs vérifie que chaque caractère existe dans la police bitmap
```
