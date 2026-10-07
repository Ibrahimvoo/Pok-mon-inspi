// =====================================================================
// EXTENSION 18.1 — en dernier : les nouveautés 18.1 en tête de l'écran des nouveautés, sauvegarde marquée 18.1.
// =====================================================================
NEWS.unshift([()=>ICO.flag,'Flèche-guide et niveaux','Une flèche dorée montre où aller pour suivre l\'histoire, de carte en carte, et un repère flotte au-dessus de la personne à voir. Les créatures et dresseurs ne dépassent plus le niveau permis par ton avancée, et une équipe en retard gagne plus d\'EXP.'],
 [()=>ICO.book||ICO.star,'Annonce des quêtes','« Nouvelle quête ! », « Quête terminée ! » et « Nouvel objectif » s\'affichent à l\'écran. Dans une aventure à plusieurs, une quête reçue par l\'un est donnée à tout le groupe.']);
{const norm181=normalize;normalize=function(g){g=norm181(g);if(g&&(g.v||0)<18.1){g.wn=1;g.v=18.1}return g}}
