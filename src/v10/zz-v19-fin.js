// =====================================================================
// VERSION 19 — en dernier : les nouveautés 19 en tête de l'écran des nouveautés, sauvegarde marquée 19.
// =====================================================================
NEWS.unshift([()=>ICO.dex,'La faune d\'Aurélys','Fini les combats-surprises : les créatures sauvages vivent à découvert, à toi de choisir qui affronter. Les herbes qui frémissent cachent une créature rare, les territoriales te chargent, les plus faibles s\'écartent. (OPTIONS DU JEU : RENCONTRES)'],
 [()=>ICO.capsule,'Des combats qui comptent','Les dresseurs de route proposent des défis (Express, Duel, Sans Objet, météo, Combat Inversé) avec une vraie récompense, et tu peux refuser. Les boss réagissent en plein combat. L\'EXP suit ton niveau : plus besoin de farmer, plus de combats joués d\'avance.'],
 [()=>ICO.book,'Perdre pour apprendre','Après une défaite, une analyse t\'explique ce qui n\'a pas marché et quoi essayer. Tu ne perds plus que 10 % de ton argent, et tu peux réessayer un boss sur place, équipe soignée.'],
 [()=>ICO.map,'Un Acte I revisité','La leçon de Kael, les sentinelles de la Mine, le choix de Corvin (qui compte à Volterre), le silence de la Forêt Murmure, l\'ascension du Mont Braise, une nuit au coin du feu, et les échos de la Grotte.'],
 [()=>ICO.moon,'Les Gardiens du Cycle','Solarion et Nocturion ne se capturent plus en trois lignes. Suis la piste de l\'aube, écoute ce que racontent les chaînes de Nocturion, et relève leurs épreuves : ils te choisiront… ou non.'],
 [()=>ICO.star,'Quêtes et Défis d\'Élite','Le voleur de croissants, le dresseur d\'autrefois, la course des Coteaux, l\'œuf de l\'orage, l\'apprenti Tito et trois Défis d\'Élite. Un « ! » doré signale qui a besoin de toi, et les crieurs racontent l\'histoire du monde.']);
{const norm19=normalize;normalize=function(g){g=norm19(g);if(g&&(g.v||0)<19){g.wn=1;g.v=19}return g}}
