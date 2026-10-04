# Pixémon Éclipse

Un jeu de créatures en pixel art, en un seul fichier HTML : **ouvre `index.html` dans un navigateur** (ordinateur ou mobile).

**Commandes** : flèches/ZQSD pour bouger · Espace/Entrée = A · Échap = B (maintenir pour courir) · M = menu · souris et écran tactile acceptés.

## L'histoire

Aurélys vit au rythme du Cycle : le jour, Solarion veille ; la nuit, les créatures d'ombre s'éveillent… mais les nuits sont étrangement courtes.

- **Acte I** : Bourg-Lueur, la Route 1, Cendreville et le Badge Roc de Brasia, la Forêt Murmure, puis le Mont Braise. Vex, chef de la Team Éclipse, y vole le Cœur d'Aube de Solarion et une éclipse recouvre la région.
- **Acte II** : la Rive Brumeuse, Port-Miroir et sa championne Maëlle, la Grotte Écho, plongée dans le noir, et l'Observatoire. Là, on découvre qui est vraiment Vex, ce que les fondateurs d'Aurélys ont fait à Nocturion, le gardien de la nuit, et pourquoi il faut rétablir l'équilibre plutôt que de vaincre la nuit.
- **Après la fin** : un vrai cycle jour/nuit, Solarion et Nocturion à défier, des revanches, les Éclats d'Aube et le Pixédex à compléter.

## Mécaniques principales

| Système | En bref |
|---|---|
| Cycle jour/nuit | Le temps avance à chaque pas. Les créatures, les PNJ, les soins et certains talents changent selon l'heure. Le lit de la maison permet de choisir son réveil. |
| Affinités de terrain | Ronces → une créature PLANTE dans l'équipe ; rocher fissuré → ROCHE ; brasier → EAU. Elles ouvrent des raccourcis et des secrets. |
| Ciel de combat | Pluie, Zénith et Éclipse durent 5 tours et modifient les dégâts. Une attaque LUMIÈRE dissipe une éclipse. |
| Statuts | Brûlure, poison, paralysie, sommeil. Le Total Soin les guérit, et ils facilitent les captures. |
| Talents | Chaque espèce a un talent passif, annoncé en combat (Fermeté, Glissade, Sève Vive…). |
| PP et IA | Les capacités s'usent. Les dresseurs visent juste ; les boss posent des statuts, changent le ciel et utilisent des potions. |
| EXP partagée | Les participants gagnent toute l'EXP, le reste de l'équipe la moitié. |
| Exploration | Pêche (canne de Gus), 12 Éclats d'Aube (dont des cachés qui scintillent), l'Ermite Lumen et ses leçons de LUMIÈRE, quête de Lili, Pixédex récompensé, Repousse, créatures chromatiques. |

## Développement

```
src/shell.html     page, style et pad tactile
src/game.js        code du jeu (données, cartes, histoire, combat, rendu)
src/sprites.json   sprites des créatures (PNG base64, 48/96/120 px)
tools/build.mjs    assemble index.html            → node tools/build.mjs
tools/art.mjs      dessine les nouvelles créatures → node tools/art.mjs [id…]
tools/sim.mjs      simule les combats de boss     → node tools/sim.mjs
tools/play.mjs     parcours automatique (Playwright) → node tools/play.mjs tools/scn-story.js
tools/fontcheck.mjs vérifie que chaque caractère existe dans la police bitmap
```

Les sauvegardes de la version précédente sont reprises automatiquement.
