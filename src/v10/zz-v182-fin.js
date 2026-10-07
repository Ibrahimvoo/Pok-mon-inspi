// =====================================================================
// EXTENSION 18.2 — en dernier : les nouveautés 18.2 en tête de l'écran des nouveautés, sauvegarde marquée 18.2.
// =====================================================================
NEWS.unshift([()=>ICO.capsule,'Combats et rencontres','Les décors de combat remplissent tout l\'écran, sans bandes étirées. Moins de créatures sauvages dans les herbes et les grottes, quelques pas de répit après chaque combat, et l\'option RENCONTRES : RARES.'],
 [()=>ICO.lantern,'Grottes et déplacements','Mine et Grotte Écho élargies, lanterne qui éclaire bien plus loin, créatures visibles hors des couloirs, arbres transparents quand tu passes derrière. Option COURSE : TOUJOURS (par défaut sur écran tactile).']);
{const norm182=normalize;normalize=function(g){g=norm182(g);if(g&&(g.v||0)<18.2){g.wn=1;g.v=18.2}return g}}
