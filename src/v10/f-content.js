// =====================================================================
// EXTENSION 10.0 — Intégration : nouvelles espèces dans les anciens lieux, essaims, cadeau du Professeur,
// journal des nouvelles quêtes, objectifs d'après-histoire.
// =====================================================================
const ENCX10={route1:[['brisillon',2,4,20,'j'],['pipistrel',3,5,12,'n'],['medichiot',3,5,4,'j']],foret:[['feuilezard',9,11,6],['navounet',9,11,12,'j'],['pousslin',10,12,10,'n']],
 mont:[['tisonnet',14,16,6],['pinsoflamme',14,16,14,'j']],route2:[['serpillou',18,20,14],['rosarine',18,20,10,'j']],grotte:[['pierrouche',23,25,16],['potagheist',23,26,10,'n'],['pionsable',23,25,12]],
 coteaux:[['pionsable',16,18,12],['pinsoflamme',16,18,10,'j'],['rosarine',16,18,10,'j']],lunevie:[['pipistrel',17,20,16,'n'],['cherubat',19,21,4,'n']],volterre:[['filserp',26,29,18],['ventiloon',26,29,16]],
 mine:[['pierrouche',11,13,14],['potagheist',12,14,8,'n']],faille:[['runocon',45,48,10],['claymoroc',45,48,6]],ruines:[['cavalsable',40,43,8],['amphorombre',41,44,6,'n']]};
for(const[k,L]of Object.entries(ENCX10))if(MAPS[k])(MAPS[k].enc??=[]).push(...L);
MAPS.port.fish.push(['dauphinou',18,22,20],['calmarin',20,23,10]);
SWARMS.push(['lac','axoluce',23,26],['bois','cherubat',28,31],['pic','flocelin',50,53],['coteaux','pionsable',17,19],['mont','tisonnet',15,17],['galeries','claymoroc',32,35]);
// --- Le Professeur confie un Vivipère après le deuxième badge
{const PT0=profTalk;profTalk=async function(){if(f().badge2&&!f().viviG&&f().starter){const P='Prof. Saule';f().viviG=1;await say('Ah, tu tombes bien ! Un ami du Lac Opalin m\'a confié une créature étrange : un Vivipère. Personne ne connaît sa forme adulte.',P);
  await say('Il change selon l\'endroit où il grandit. Le volcan, le bois des morts, la ville des turbines, les galeries, le lac… Je te le confie : choisis bien où il atteindra le niveau 20 !',P);
  const m=mon('vivipere',15);dex('vivipere',2);if(G.party.length<6)G.party.push(m);else G.box.push(m);jingle('item');await say('Tu reçois VIVIPÈRE !');rep('cher',2);return save()}return PT0()};
 for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===PT0)n.fn=profTalk}
// --- Journal : nouvelles quêtes (n'apparaissent qu'une fois découvertes)
const quests0=quests;quests=function(){const Q=quests0(),F=f(),n=Object.keys(FSP()).length,sv=k=>G.seen?.[k];
 const A=[[F.ondine0,'Le registre d\'Ondine',F.ondine3?2:1,!F.ondine1?`Pêcher 5 espèces différentes (${n}/5), puis revenir à la cabane du Lac Opalin.`:!F.ondine2?`Pêcher 15 espèces (${n}/15) avec la Méga Canne.`:!F.ondine3?'Montrer un Dragonagi à Ondine. Un Gupflamme qui a remonté toutes les cascades…':'Ondine a son Dragonagi. Son registre est le plus complet d\'Aurélys.'],
  [sv('bois'),'Les lanternes du Bois',F.bLant?2:1,F.bLant?'La crypte des Veilleurs est ouverte.':'Une épitaphe, au nord du Bois Sépulcral, donne l\'ordre des lanternes. Elles ne s\'allument que la nuit.'],
  [F.ghostQ,'Élise, la jeune fille pâle',F.ghostDone?2:1,F.ghostDone?'Ysolde a retrouvé le médaillon de sa sœur. Élise peut dormir.':G.keys.medE?'Rapporter le médaillon d\'Élise à Ysolde, à Lunévie.':'Retrouver le médaillon d\'Élise, près d\'un lac avec une île… la nuit.'],
  [F.gastonQ||sv('galeries'),'Le mineur perdu',F.gastonOk?2:1,F.gastonOk?'Gaston est rentré chez Huguette, à Cendreville.':'Gaston, de Cendreville, s\'est perdu dans les Galeries Oubliées (sous les Coteaux). Un rocher fissuré barre la galerie est.'],
  [sv('recif'),'Les perles des marées',F.perleOk?2:1,F.perleOk?'Perle a son collier.':`Apporter 5 Perles des Marées à la plongeuse du Récif (${G.bag.perle||0}/5).`],
  [nStele()>0,'Les Stèles des Fondateurs',nStele()>=8?2:1,nStele()>=8?'Les huit paroles sont lues. La porte du Temple, sur le Récif des Marées, les reconnaît.':`Déchiffrer les huit stèles (${nStele()}/8). Indices : un îlot, un bois, une galerie, un récif, un volcan, une rive, des coteaux, un pic.`],
  [F.templeO,'Le Temple des Fondateurs',F.legE?2:1,!F.masqOk?'Le cadran du Temple ouvre ses portes selon la phase. Lis les deux statues, puis affronte le gardien des énigmes.':!F.legE?'La porte du sceau ne s\'ouvre que pendant l\'éclipse. La huitième stèle parle de deux larmes…':'Éclipsar est apaisé.'],
  [sv('pic'),'Les quatre feux',F.legA?2:1,[0,1,2,3].every(i=>F['fire'+i])?(F.legA?'Aurorelle, la première aube, a été rencontrée.':'Les quatre feux brûlent. Reviens au sommet du Pic, à l\'aube.'):'Allumer chaque vasque du Pic Céleste à son heure : aube, jour, crépuscule, nuit. (Le Sablier du Cycle choisit l\'heure ; sinon, il suffit de marcher.)'],
  [[0,1,2,3].every(i=>F['fire'+i]),'Le Conseil du Cycle',F.conseilWin?2:1,F.conseilWin?`Vaincu ${F.conseilN} fois. Il revient plus fort à chaque victoire.`:'Au sommet du Pic Céleste : Aube, Jour, Crépuscule, Nuit, puis le Maître. Sans soins entre les combats.'],
  [F.balance,'Le renard errant',F.legR?2:1,F.legR?'Errenard a cessé d\'errer.':'Un renard d\'ombre change de lieu chaque jour. Les crieurs des villes savent où on l\'a vu. Il fuit au bout de deux tours.'],
  [F.badge4,'Les Défis de Volterre',G.monoDone&&Object.keys(TY).every(t=>G.monoDone[t])?2:1,`Orso arbitre les Défis Mono-type et Égalité. Types vaincus : ${Object.keys(G.monoDone||{}).filter(k=>TY[k]).length}/8.`],
  [F.colisQ,'Un colis pour Lou',F.colisOk?2:1,F.colisOk?'Lou a retrouvé sa boîte à musique.':'Rapporter le colis de l\'ancien sbire Bertin à Lou, à Bourg-Lueur.'],
  [G.keys.camera,'L\'album de Lise',Object.keys(G.album||{}).length>=PHOTOS.length?2:1,`Pages réussies : ${Object.keys(G.album||{}).length}/${PHOTOS.length}. Menu > PHOTO avec la bonne créature en tête, au bon endroit, au bon moment.`],
  [F.viviG,'Le mystère du Vivipère',[...G.party,...G.box].some(m=>['vivicendre','viviphyte','vivitron','vividactyle','vivisource'].includes(m.sp))?2:1,'Vivipère change selon le lieu où il atteint le niveau 20 : Mont Braise, Bois Sépulcral, Volterre, Galeries Oubliées, Lac Opalin.']];
 for(const[ok,t,s,h]of A)if(ok)Q.push([t,s,h]);return Q};
// --- Objectifs d'après-histoire 10.0
const postGoal0=postGoal;postGoal=function(g){const r=postGoal0(g);if(!r.startsWith('Tu as tout'))return r;
 const L=[[nStele()<8,`Déchiffre les huit Stèles des Fondateurs (${nStele()}/8). L'une d'elles est sur l'îlot du Lac Opalin, à l'est de la Forêt Murmure.`],[!g.masqOk,'Entre dans le Temple des Fondateurs, sur le Récif des Marées (passeur de Port-Miroir).'],
  [!g.legE,'Rappelle l\'éclipse avec le Sablier et descends au Sceau d\'Éclipsar, avec l\'Amulette du Cycle.'],[!g.legA,'Allume les quatre feux du Pic Céleste (téléphérique de Volterre), puis attends l\'aube au sommet.'],
  [!g.conseilWin,'Affronte le Conseil du Cycle, dans la Citadelle au sommet du Pic Céleste.'],[!g.legR,'Traque Errenard, le renard errant. Les crieurs des villes savent où il est passé.'],[caught()<DEX.length,`Complète le Pixédex : ${caught()}/${DEX.length}.`]].find(x=>x[0]);
 return L?L[1]:'Tu as tout accompli. Aurélys te doit son Cycle… Le Conseil, le Tournoi et le Défi du Crépuscule t\'attendent pour défendre ton titre !'};
for(const k of['lac','recif','bois','pic'])RAINY.add(k);
