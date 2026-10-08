// =====================================================================
// VERSION 19.5 — tout à la fin : le jeu n'a plus de musique (ni musique de fond, ni mélodies d'objets) ; les effets sonores restent.
// =====================================================================
musPlay=function(){musStop()};
jingle=async function(){sfx('ok')};
NEWS.unshift([()=>ICO.star,'Sans musique','Le jeu n\'a plus de musique : ni musique de fond, ni petites mélodies. Seuls les effets sonores restent (réglables dans les options).']);
{const norm195=normalize;normalize=function(g){g=norm195(g);if(g&&(g.v||0)<19.5){g.wn=1;g.v=19.5}return g}}
