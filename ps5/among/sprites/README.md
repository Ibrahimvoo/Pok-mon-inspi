# Sprites originaux des personnages (emplacement d’import)

Le jeu dessine chaque personnage à partir d’une **base unique décalquée** sur la capture de référence
(`src/among/art/crewmate-ref.js`, générée par `tools/among/trace_crewmate.py`). Les feuilles de sprites
originales d’Among Us (marche, fantôme, corps) ne sont pas dans le projet.

Si vous disposez de sprites dont l’utilisation est autorisée, déposez-les ici avec un fichier `crewmate.json` :

```json
{
  "suitHeight": 371,
  "anchor": [165, 371],
  "colorKey": true,
  "idle": "idle.png",
  "walk": ["walk01.png", "walk02.png", "walk03.png", "walk04.png", "walk05.png", "walk06.png",
           "walk07.png", "walk08.png", "walk09.png", "walk10.png", "walk11.png", "walk12.png"],
  "ghost": "ghost.png",
  "dead": "dead.png"
}
```

- `suitHeight` : hauteur en pixels du personnage (haut du casque → bas du pied le plus bas) dans vos images.
- `anchor` : pixel situé au milieu de la combinaison, au niveau des pieds.
- `colorKey: true` : images à clé de couleur (canal rouge = couleur principale, canal bleu = ombre,
  canal vert = visière ; noir et blanc inchangés). Le jeu recolore pour chaque joueur.
- `colorKey: false` : une image par couleur, ex. `"idle": { "red": "red_idle.png", "blue": "blue_idle.png" }`.

Au chargement, ces images remplacent la base décalquée partout (menus, lobby, partie, réunions).
