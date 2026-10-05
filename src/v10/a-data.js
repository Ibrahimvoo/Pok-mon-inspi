// =====================================================================
// EXTENSION 10.0 — ÉDITION ULTIME · Données : capacités, talents, ciels, objets, 76 nouvelles espèces.
// Ce bloc est injecté juste avant le démarrage : toutes les données et fonctions du jeu existent déjà.
// =====================================================================
// --- Capacités : [id, nom, type, puissance, précision, PP, effet, chance %, priorité]
// Nouveaux effets : x2 (frappe deux fois) · protect · facade · crit · cure · seed · roots · storm/stars (ciel)
// night2 (x2 la nuit) · dawn (x1,5 à l'aube et au crépuscule) · ecl15 (x1,5 sous éclipse) · stars15 (x1,5 sous les étoiles)
// dream (x2 sur une cible endormie) · cycle (LUMIÈRE le jour, OMBRE la nuit) · atk+/spd+ avec puissance : bonus pour le lanceur
[['doublecoup','Double Coup','NOR',35,90,20,'x2'],['abri','Abri','NOR',0,0,10,'protect',0,4],['facade','Façade','NOR',70,100,20,'facade'],['tranche','Tranche','NOR',70,100,20,'crit'],
 ['megaimpact','Méga-Impact','NOR',120,90,5,'recoil'],['rafraichir','Rafraîchir','NOR',0,0,15,'cure'],
 ['nitrocharge','Nitrocharge','FEU',50,100,20,'spd+',100],['roueflamme','Roue de Feu','FEU',60,100,25,'brn',10],['flammeclipse','Flamme d\'Éclipse','FEU',80,100,10,'ecl15'],['boutefeu','Boutefeu','FEU',120,100,10,'recoil'],
 ['cascade','Cascade','EAU',80,100,15],['mareenoire','Marée Noire','EAU',65,100,15,'night2'],['aquabrume','Anneau Brume','EAU',0,0,15,'roots'],['hydroqueue','Hydro-Queue','EAU',90,90,10],['tourbillon','Tourbillon','EAU',60,95,15,'spd-',50],
 ['vampigraine','Vampigraine','PLA',0,90,10,'seed'],['lamefeuille','Lame-Feuille','PLA',90,100,15,'crit'],['racines','Racines','PLA',0,0,20,'roots'],['spore','Spore','PLA',0,85,10,'slp'],['eclatfloral','Éclat Floral','PLA',75,100,15,'dawn'],
 ['orage','Orage','ELE',0,0,5,'storm'],['fatalfoudre','Fatal-Foudre','ELE',110,70,10,'par',30],['parabocharge','Parabocharge','ELE',65,100,15,'drain'],['electrotoile','Toile Élek','ELE',55,95,15,'spd-',100],
 ['seisme','Séisme','ROC',100,100,10],['tomberoche','Tomberoche','ROC',60,95,15,'spd-',100],['meteore','Météore','ROC',100,90,5,'stars15'],['eclatroc','Lame Pierre','ROC',70,100,15,'crit'],
 ['machination','Machination','OMB',0,0,20,'atk+2'],['griffeombre','Griffe Ombre','OMB',70,100,15,'crit'],['devoreve','Dévorêve','OMB',55,100,15,'dream'],['ombreportee','Ombre Portée','OMB',80,100,15,'def-',20],
 ['eblouir','Éblouissement','LUM',0,100,20,'atk-'],['rayonaurore','Rayon Aurore','LUM',75,100,15,'dawn'],['voilestellaire','Voile Stellaire','LUM',0,0,5,'stars'],['lamecycle','Lame du Cycle','LUM',85,100,10,'cycle'],
 ['aurorale','Aurore Boréale','LUM',100,100,5,'spd+',100],['eclipsetotale','Éclipse Totale','OMB',120,95,5,'eclipse',100],['feinterrante','Feinte Errante','OMB',70,100,10,0,0,1],['masquesolaire','Masque Solaire','LUM',90,100,10,'def-',30]
].forEach(([id,n,t,p,a,pp,e,ch,pr])=>MV[id]={id,n,t,p,a,pp,e,ch:p?ch||0:100,pr:pr||0});
MV.lamecycle_n={...MV.lamecycle,id:'lamecycle_n',t:'OMB'};

Object.assign(TAL,{tenace:['Ténacité','Attaque x1,5 quand il subit un statut.'],aube:['Heure Dorée','Attaques x1,3 à l\'aube et au crépuscule.'],cycle:['Cycle Vivant','Attaques x1,2 le jour ; dégâts reçus x0,8 la nuit.'],
 technicien:['Technicien','Capacités de 60 de puissance ou moins x1,5.'],cuirasse:['Cuirasse','Ne subit jamais de coup critique.'],absorbeau:['Absorbe-Eau','Les attaques EAU le soignent au lieu de le blesser.'],
 paratonnerre:['Paratonnerre','Les attaques ÉLEC augmentent son Attaque au lieu de le blesser.'],torche:['Torche','Les attaques FEU augmentent son Attaque au lieu de le blesser.'],intimidation:['Intimidation','Baisse l\'Attaque adverse en entrant au combat.'],
 crachin:['Crachin','Fait pleuvoir en entrant au combat.'],orageux:['Orageux','Invoque l\'Orage en entrant au combat.'],astral:['Astral','Invoque un Ciel Étoilé en entrant au combat.'],turbo:['Turbo','Sa Vitesse augmente à la fin de chaque tour.'],
 medecin:['Médecin','Peut guérir ses statuts à la fin de chaque tour.'],serenite:['Sérénité','Double les chances d\'effets secondaires de ses attaques.'],flair:['Flair','En tête d\'équipe, déniche bien plus souvent des objets en chemin.'],
 feutre:['Pas Feutré','En tête d\'équipe, réduit de moitié les rencontres sauvages.'],charmeur:['Charmeur','En tête d\'équipe, facilite les captures (x1,25).'],fidele:['Cœur Fidèle','Attaques x1,05 par cœur de lien.'],
 aurore:['Aurore Éternelle','Invoque le Zénith en entrant au combat et monte sa Vitesse.'],fuyant:['Insaisissable','Une créature errante qui fuit après deux tours… sauf si elle dort ou est paralysée.']});
Object.assign(SKY,{storm:['ORAGE','#d8b018','Un orage éclate ! ÉLEC x1,5 et la foudre ne rate jamais.','L\'orage s\'éloigne.'],stars:['ÉTOILES','#8a7ae0','Le ciel se couvre d\'étoiles ! LUMIÈRE et ROCHE x1,3.','Les étoiles pâlissent.']});

// --- Objets 10.0
Object.assign(IT,{
 megacapsule:['Méga Capsule',2200,'Taux de capture x2,5. Vendue à Volterre et chez Zélie.',2.5,'ball'],sombrecapsule:['Sombre Capsule',900,'Taux x3,5 sur les créatures OMBRE, sinon x1.',3.5,'ball'],
 rapidecapsule:['Rapide Capsule',1000,'Taux x4 si elle est lancée au premier tour, sinon x1.',4,'ball'],filetcapsule:['Filet Capsule',900,'Taux x3 sur les créatures EAU et PLANTE, sinon x1.',3,'ball'],
 maxpotion:['Max Potion',2500,'Soigne tous les PV.',9999,'heal'],rappelmax:['Rappel Max',4000,'Ranime une créature K.O. avec tous ses PV.',1,'revive'],superrepousse:['Super Repousse',700,'Éloigne les créatures plus faibles pendant 300 pas.',300,'repel'],
 tartecycle:['Tarte du Cycle',0,'La spécialité de Mamie Rosette. Lien fortement renforcé.',30,'treat'],
 pierresoleil:['Pierre Soleil',2500,'Chaude comme un matin d\'été. Fait évoluer certaines créatures.',0,'evo'],
 pierreaube:['Pierre d\'Aube',0,'Un éclat rosé, ni jour ni nuit. Fait évoluer certaines créatures… et intrigue les savants.',0,'evo'],
 fossilefeuille:['Fossile Feuille',0,'Une fougère pétrifiée où dort une créature. Le Prof. Saule saura la ranimer.',0,'quest'],
 casque:['Casque Brut',0,'À tenir. Blesse qui le frappe au corps à corps (1/8 de ses PV).',8,'held'],
 bandeau:['Bandeau Choix',0,'À tenir. Attaques x1,4, mais le porteur est un peu plus lent.',1.4,'held'],
 lunettes:['Lunettes Sages',0,'À tenir. Les effets secondaires de ses attaques se déclenchent deux fois plus.',2,'held'],
 coquille:['Coquille Calme',0,'À tenir. Dégâts reçus x0,85.',.85,'held'],
 talisman:['Talisman du Cycle',0,'À tenir. Attaques x1,25 à l\'aube et au crépuscule.',1.25,'held'],
 pierrechance:['Pierre Chance',0,'À tenir. Coups critiques bien plus fréquents.',0,'held'],
 eclatprisme:['Éclat Prisme',0,'Un fragment taillé par les fondateurs. Les savants paient cher pour en voir un.',0,'quest'],
 lingot:['Lingot de Volterre',0,'Un lingot d\'alliage rare. Se revend 5 000 pièces.',0,'sell'],
 perle:['Perle des Marées',0,'Une perle nacrée du Récif. Se revend 2 500 pièces.',0,'sell'],
 etoilefilante:['Étoile Filante',0,'Un éclat de météore encore chaud. Se revend 3 500 pièces.',0,'sell'],
 pepite:['Pépite',0,'Une pépite d\'or pur. Se revend 4 000 pièces.',0,'sell']});
CATO.push('disc','sell');RARE.push('casque','bandeau','lunettes','coquille','talisman','pierrechance');
const SELLV={lingot:5000,perle:2500,etoilefilante:3500,pepite:4000,eclatprisme:6000};
// Disques Cycle : enseignent une capacité à toute créature compatible (type de la capacité = type de la créature, ou capacité NORMAL)
const DISCS=['abri','facade','tranche','rafraichir','nitrocharge','flammeclipse','cascade','mareenoire','lamefeuille','racines','orage','parabocharge','seisme','tomberoche','machination','griffeombre','rayonaurore','voilestellaire','lamecycle','megaimpact','dansepluie','zenith','eclipse','hate'];
DISCS.forEach((m,i)=>IT['dc_'+m]=[`DC${String(i+1).padStart(2,'0')} ${MV[m].n}`,[0,3000,3000,2000,3000,4000,3000,4000,4000,2000,5000,3000,5000,2500,3000,3500,4000,5000,6000,6000,2500,2500,3000,2000][i],`Disque Cycle. Enseigne ${MV[m].n} (${TY[MV[m].t][0]}) à une créature compatible. Réutilisable.`,m,'disc']);
// rafraichir : -> 'cure'; prix 0 = introuvable en boutique (récompense)

// --- Learnsets 10.0
const LF2=[[1,'griffe'],[1,'grondement'],[5,'braise'],[9,'viveatk'],[13,'roueflamme'],[17,'nitrocharge'],[22,'tranche'],[27,'lanceflam'],[33,'flammeclipse'],[40,'boutefeu']],
 LBF=[[1,'picpic'],[1,'braise'],[6,'vent'],[10,'nitrocharge'],[15,'aeropique'],[20,'roueflamme'],[25,'hate'],[30,'lanceflam'],[37,'rayonaurore'],[44,'deflagration']],
 LE2=[[1,'charge'],[1,'pistolet'],[5,'aquajet'],[9,'tourbillon'],[13,'morsure'],[18,'cascade'],[23,'mareenoire'],[29,'hydroqueue'],[35,'aquabrume'],[42,'hydro']],
 LSH=[[1,'morsure'],[1,'aquajet'],[8,'tourbillon'],[14,'tranche'],[19,'cascade'],[25,'mareenoire'],[31,'griffeombre'],[37,'hydroqueue'],[45,'megaimpact']],
 LP2=[[1,'charge'],[1,'liane'],[5,'vampigraine'],[9,'racines'],[13,'sangsue'],[17,'feuille'],[22,'lamefeuille'],[27,'spore'],[32,'eclatfloral'],[38,'floral']],
 LPO=[[1,'liane'],[1,'ombrefurtive'],[6,'vampigraine'],[11,'morsure'],[16,'sangsue'],[21,'griffeombre'],[26,'machination'],[31,'lamefeuille'],[36,'devoreve'],[42,'ombreportee']],
 LV2=[[1,'eclair'],[1,'grimace'],[6,'etincelle'],[10,'electrotoile'],[14,'viveatk'],[18,'parabocharge'],[24,'dardeclair'],[29,'orage'],[34,'tonnerre'],[42,'fatalfoudre']],
 LC2=[[1,'charge'],[1,'durcir'],[6,'jetpierre'],[10,'tomberoche'],[15,'eclatroc'],[20,'abri'],[25,'eboul'],[32,'seisme'],[40,'meteore']],
 LO2=[[1,'griffe'],[1,'ombrefurtive'],[6,'morsure'],[12,'griffeombre'],[16,'hypnose'],[21,'machination'],[26,'devoreve'],[31,'ombreportee'],[38,'lunenoire']],
 LL2=[[1,'charge'],[1,'lueur'],[6,'eblouir'],[10,'hate'],[14,'rayonaurore'],[20,'voilestellaire'],[26,'prisme'],[32,'lamecycle'],[40,'aubeeternelle']],
 LN2=[[1,'charge'],[1,'grondement'],[6,'doublecoup'],[10,'viveatk'],[15,'tranche'],[19,'abri'],[24,'facade'],[29,'rafraichir'],[33,'plaquage'],[40,'megaimpact']],
 LSK=[[1,'picpic'],[1,'grondement'],[5,'vent'],[9,'doublecoup'],[14,'aeropique'],[19,'abri'],[24,'hate'],[29,'tranche'],[35,'megaimpact']],
 LIC=[[1,'charge'],[1,'pistolet'],[6,'lueur'],[10,'tourbillon'],[15,'hypnose'],[20,'voilestellaire'],[26,'cascade'],[32,'lamecycle']],
 LANG=[[1,'lueur'],[1,'pistolet'],[10,'tourbillon'],[20,'voilestellaire'],[25,'rayonaurore'],[30,'prisme'],[36,'soin'],[42,'aubeeternelle'],[48,'pluieetoile']],
 LDEM=[[1,'ombrefurtive'],[1,'pistolet'],[10,'tourbillon'],[20,'hypnose'],[25,'griffeombre'],[30,'devoreve'],[36,'machination'],[42,'lunenoire'],[48,'eclipsetotale']],
 LVIV=[[1,'charge'],[1,'grondement'],[5,'viveatk'],[9,'morsure'],[14,'doublecoup'],[18,'abri'],[23,'facade'],[28,'retour']];
const V10SP=[];const S10=(...a)=>{S(...a);V10SP.push(a[0])};
// FEU
S10('tisonnet','Tisonnet','FEU',[45,58,42,62],62,45,['#e8702e','#f6c445','#3a8a4a'],LF2,[18,'tisonard'],0,1,'brasier','Un petit lézard qui mâchouille des braises. Il crache des étincelles quand il éternue, ce qui inquiète beaucoup les forgerons.');
S10('tisonard','Tisonard','FEU',[68,84,62,80],150,45,['#e8702e','#f6c445','#a8402a'],LF2,[[36,'pyronox',{ecl:1}]],'tisonnet',2,'brasier','Sa crinière de flammes double de volume quand il est en colère. Il n\'évolue, dit-on, que sous un soleil éteint.');
S10('pyronox','Pyronox','FEU',[88,112,78,95],235,45,['#a8402a','#f6c445','#3a2a4a'],LF2,null,'tisonnet',3,'tenace','Un Tisonard qui a vu l\'Éclipse. Ses flammes sont devenues pourpres et brûlent même dans l\'eau. Il dort le jour, chasse la nuit.');
S10('pinsoflamme','Pinsoflamme','FEU',[42,52,40,70],60,190,['#d8323a','#f6c445','#2a2a2a'],LBF,[20,'cardiflamme'],0,1,'vigilant','Un oisillon au plumage de braise. Il chante à l\'aube, si fort qu\'on l\'entend depuis Bourg-Lueur.');
S10('cardiflamme','Cardiflamme','FEU',[64,76,60,94],145,90,['#c8202a','#f6c445','#2a2a2a'],LBF,[38,'cardinova'],'pinsoflamme',2,'vigilant','Il plane au-dessus du Mont Braise en suivant les courants chauds. Les volcanologues le suivent pour trouver les fumerolles.');
S10('cardinova','Cardinova','FEU',[82,96,74,112],225,45,['#b8101a','#ffe080','#1a1a1a'],LBF,null,'pinsoflamme',3,'aube','Ses ailes s\'embrasent aux premières et aux dernières lueurs du jour. On dit qu\'il porte le soleil sur son dos jusqu\'à l\'horizon.');
// EAU
S10('axoluce','Axoluce','EAU',[55,48,52,58],66,120,['#3ac8b8','#ffe060','#1a5a6a'],LE2,[[26,'ampystorme',{rain:1}]],0,1,'absorbeau','Il luit faiblement au fond du Lac Opalin. Quand l\'orage gronde, ses taches s\'allument comme des lampions.');
S10('ampystorme','Ampystorme','ELE',[82,92,74,90],175,45,['#3a8ab8','#ffe060','#e8f0ff'],LV2,null,'axoluce',2,'paratonnerre','Un Axoluce qui a grandi sous la pluie d\'orage. Il stocke la foudre dans sa queue et la relâche en ondes bleutées.');
S10('dauphinou','Dauphinou','EAU',[55,50,45,72],64,150,['#3a6ad8','#c8e8ff','#4aa83e'],LE2,[22,'aileronde'],0,1,'glissade','Il saute hors de l\'eau pour saluer les bateaux. Les marins le considèrent comme un porte-bonheur.');
S10('aileronde','Aileronde','EAU',[78,72,68,88],150,75,['#2a4ab8','#c8e8ff','#4aa83e'],LE2,[40,'squalame'],'dauphinou',2,'glissade','Il nage en cercles autour des récifs pour en chasser les intrus. Sa nageoire fend les vagues comme une lame.');
S10('squalame','Squalame','EAU',[90,110,80,105],235,45,['#e8a03a','#3a6a4a','#ffffff'],LSH,null,'dauphinou',3,'tenace','Le gardien du Récif des Marées. Ses nageoires ont la dureté de l\'acier ; il ne recule devant aucune tempête.');
S10('guppyre','Guppyre','EAU',[40,45,45,60],58,200,['#f6c445','#ffffff','#e8702e'],LE2,[25,'gupflamme'],0,1,'crachin','Un petit poisson doré qui crache des bulles chaudes. Il n\'aime que l\'eau tiède des sources volcaniques.');
S10('gupflamme','Gupflamme','EAU',[65,74,64,80],145,90,['#f6c445','#e8702e','#ffffff'],LE2,[45,'dragonagi'],'guppyre',2,'torche','Ses nageoires dégagent une vapeur brûlante. Il adore remonter les cascades d\'un seul bond.');
S10('dragonagi','Dragonagi','EAU',[95,108,85,92],250,30,['#f6c445','#e8702e','#a8402a'],[...LE2,[48,'lanceflam'],[52,'boutefeu']],null,'guppyre',3,'torche','Un Gupflamme qui a remonté la plus haute cascade d\'Aurélys. Il nage dans l\'eau comme dans la lave.');
S10('calmarin','Calmarin','EAU',[50,48,60,55],64,170,['#3a4ab8','#e84a4a','#f0e0ff'],LE2,[30,'hectapieuvre'],0,1,'cuirasse','Il se cache sous les rochers du Récif et projette de l\'encre quand on le surprend.');
S10('hectapieuvre','Hectapieuvre','EAU',[88,85,95,62],170,60,['#2a3ab8','#c83a6a','#f0e0ff'],LE2,null,'calmarin',2,'cuirasse','Ses huit bras manipulent les coquillages avec une adresse étonnante. On dit qu\'il collectionne les objets perdus des marins.');
S10('fretillon','Frétillon','EAU',[45,55,40,70],62,170,['#5a8ab8','#ffffff','#e84a4a'],LSH,[[28,'requinuit',{time:'n'}]],0,1,'glissade','Un petit poisson-fantôme qui frétille dans les eaux sombres. Le jour, il se cache sous les quais.');
S10('requinuit','Requinuit','EAU',[85,100,70,92],170,60,['#8aa8a0','#3a4a4a','#e84a4a'],LSH,null,'fretillon',2,'noctambule','Un Frétillon qui a grandi sous la lune. Il chasse la nuit, quand la marée découvre les récifs.');
S10('medulune','Médulune','LUM',[75,70,80,75],180,25,['#f0f0ff','#a8b8f0','#3a3a7a'],[[1,'lueur'],[1,'pistolet'],[12,'aquabrume'],[18,'clairlune'],[24,'voilestellaire'],[30,'prisme'],[38,'pluieetoile']],null,0,1,'astral','Une méduse de lumière qui monte à la surface du Lac Opalin les nuits d\'étoiles filantes. Elle n\'a jamais touché la terre ferme.');
S10('flocelin','Flocelin','EAU',[48,45,55,60],66,120,['#c8e8ff','#ffffff','#3a5a8a'],LIC,[[25,'angeflocon',{time:'j'}],[25,'demoniflocon',{time:'n'}]],0,1,'vigilant','Un flocon vivant né sur le Pic Céleste. Il ne fond jamais. Le soleil ou la lune choisira ce qu\'il deviendra.');
S10('angeflocon','Angeflocon','LUM',[70,72,75,80],155,60,['#e8f0ff','#ff9ab8','#c8e8ff'],LANG,[[42,'seraphivre',{stars:1}]],'flocelin',2,'lueur','Un Flocelin qui a grandi au soleil. Il bénit les cordées de grimpeurs et les guide dans la tempête.');
S10('demoniflocon','Démoniflocon','OMB',[70,82,70,80],155,60,['#3a4a5a','#e84a4a','#c8e8ff'],LDEM,[[42,'lucifrimas',{ecl:1}]],'flocelin',2,'noctambule','Un Flocelin qui a grandi sous la lune. Il souffle des bourrasques glacées sur ceux qui s\'aventurent trop haut.');
S10('seraphivre','Séraphivre','LUM',[92,95,90,103],245,30,['#f0e0ff','#ff9ab8','#a8d8f0'],LANG,null,'flocelin',3,'astral','Un Angeflocon touché par une nuit d\'étoiles filantes. Ses ailes de givre reflètent toutes les constellations.');
S10('lucifrimas','Lucifrimas','OMB',[92,108,85,95],245,30,['#2a3a4a','#e84a4a','#a8c8e8'],LDEM,null,'flocelin',3,'eclipsetot','Un Démoniflocon qui a vu l\'Éclipse. Là où il passe, le givre noir recouvre tout, même le soleil.');
// PLANTE
S10('feuilezard','Feuilézard','PLA',[45,52,45,65],62,45,['#4aa83e','#c8e86a','#e84a4a'],LP2,[16,'gecktile'],0,1,'engrais','Il dort au soleil sur les feuilles larges du Bois Sépulcral et change de couleur selon l\'humeur.');
S10('gecktile','Gecktile','PLA',[62,75,58,88],145,45,['#3a983e','#c8e86a','#e84a4a'],LP2,[34,'velocisylve'],'feuilezard',2,'engrais','Il grimpe aux arbres plus vite qu\'il ne court. Ses pattes collent même à la roche mouillée.');
S10('velocisylve','Vélocisylve','PLA',[78,98,72,118],230,45,['#2a882e','#c8e86a','#e84a4a'],LP2,null,'feuilezard',3,'turbo','Le plus rapide des Pixémons d\'Aurélys en forêt. On ne le voit pas passer : on voit seulement les feuilles retomber.');
S10('pousslin','Pousslin','PLA',[50,48,55,40],62,170,['#4a8a3e','#a8c8a0','#6a5a3a'],LPO,[[24,'spectronce',{time:'n'}]],0,1,'seve','Un arbrisseau qui marche la nuit pour trouver un meilleur coin d\'ombre. Il se replante avant l\'aube.');
S10('spectronce','Spectronce','OMB',[72,80,74,60],150,75,['#3a6a3e','#a8c8a0','#e84a4a'],LPO,[[36,'vengeronce',{held:'encensnoir'}]],'pousslin',2,'noctambule','Un Pousslin qui a pris racine dans un cimetière. Ses branches murmurent les noms des voyageurs disparus.');
S10('vengeronce','Vengeronce','OMB',[95,108,92,62],235,45,['#2a4a2e','#e8d0a0','#e84a4a'],LPO,null,'pousslin',3,'tenace','Ses racines vont si profond qu\'elles touchent, dit-on, le royaume des ombres. Il protège le Bois Sépulcral avec rancune.');
S10('fougeron','Fougeron','PLA',[58,55,68,42],70,45,['#6a9a3e','#f6c445','#e84a4a'],LP2,[18,'stegofeuille'],0,1,'cuirasse','Ranimé d\'un Fossile Feuille. Il broutait les fougères géantes bien avant les premiers fondateurs.');
S10('stegofeuille','Stégofeuille','PLA',[78,78,92,48],155,45,['#5a8a3e','#f6c445','#e84a4a'],LP2,[38,'brachisylve'],'fougeron',2,'cuirasse','Les plaques de son dos sont de vraies feuilles qui se rechargent au soleil.');
S10('brachisylve','Brachisylve','PLA',[110,96,105,55],240,45,['#4a7a3e','#f6c445','#ff9ab8'],[...LP2,[44,'seisme']],null,'fougeron',3,'seve','Un géant paisible au long cou fleuri. Les oiseaux nichent dans sa crinière de fleurs sans qu\'il le remarque.');
S10('navounet','Navounet','PLA',[50,55,50,40],60,190,['#a87a4a','#4aa83e','#f0e0c0'],LP2,[20,'tigeronce'],0,1,'seve','Un navet qui s\'est déterré tout seul. Il adore qu\'on lui gratte les feuilles du dessus.');
S10('tigeronce','Tigeronce','PLA',[70,78,70,58],140,90,['#8a5a3a','#4aa83e','#f0e0c0'],LP2,[[36,'wendigrave',{time:'n'}]],'navounet',2,'seve','Il s\'enroule autour des clôtures des fermes pour dormir debout. Les fermiers le tolèrent : il éloigne les rongeurs.');
S10('wendigrave','Wendigrave','OMB',[90,105,78,85],225,45,['#5a3a2a','#a8c870','#e84a4a'],LPO,null,'navounet',3,'intimidation','Une ombre à bois de cerf qui hante la lisière du Bois Sépulcral. Il ne sort que les nuits sans lune.');
S10('rosarine','Rosarine','PLA',[45,50,45,62],62,170,['#7a3a9a','#4aa83e','#f6c445'],LP2,[22,'toxiris'],0,1,'serenite','Une fleur coquette qui se recoiffe dans les flaques. Son parfum endort les insectes.');
S10('toxiris','Toxiris','PLA',[68,78,64,80],145,90,['#c8d8f0','#7a3a9a','#4aa83e'],[...LP2,[25,'poudretox']],[[1,'ninjasmin',{move:'lamefeuille'}]],'rosarine',2,'serenite','Ses pétales distillent un poison doux. Elle évolue le jour où elle maîtrise la Lame-Feuille.');
S10('ninjasmin','Ninjasmin','PLA',[78,102,70,108],225,45,['#a8d8c8','#4aa83e','#e84a4a'],[...LP2,[30,'tranche'],[40,'griffeombre']],null,'rosarine',3,'technicien','Elle se déplace sans un bruit, deux feuilles-lames à la main. Les jardins de Lunévie sont sous sa protection.');
// ÉLEC
S10('filserp','Filserp','ELE',[45,55,45,62],62,170,['#2a2a2a','#a8a8a8','#ffe060'],LV2,[24,'ouroborelec'],0,1,'electrise','Un câble vivant né des étincelles de la Centrale. Il se branche aux prises pour dormir.');
S10('ouroborelec','Ouroborelec','ELE',[68,78,72,72],150,90,['#2a2a2a','#c8e8ff','#ffe060'],LV2,[40,'prisaserpent'],'filserp',2,'electrise','Il se mord la queue pour former une boucle de courant infinie. Il pourrait alimenter une maison pendant un an.');
S10('prisaserpent','Prisaserpent','ELE',[85,102,85,98],230,45,['#2a2a2a','#e84a4a','#ffe060'],LV2,null,'filserp',3,'orageux','Le maître des lignes à haute tension de Volterre. Quand il s\'énerve, toute la ville clignote.');
S10('ventiloon','Ventiloon','ELE',[48,48,52,72],64,150,['#5a6a8a','#c8c8d8','#ffe060'],LV2,[28,'eoloeil'],0,1,'turbo','Il tourne sur lui-même pour produire de l\'électricité. Les ingénieurs de Volterre l\'adorent.');
S10('eoloeil','Éoloeil','ELE',[72,80,75,100],160,60,['#3a4a6a','#c8c8d8','#ffe060'],LV2,null,'ventiloon',2,'turbo','Son œil unique surveille le ciel. Il prévient les tempêtes une heure avant tout le monde.');
// ROCHE
S10('pionsable','Pionsable','ROC',[48,55,62,40],60,180,['#e8d8b0','#c8b090','#3a3a3a'],LC2,[22,'cavalsable'],0,1,'fermete','Un petit pion de sable qui avance toujours tout droit. On dit qu\'il rêve de devenir roi.');
S10('cavalsable','Cavalsable','ROC',[70,82,80,62],150,75,['#e8d8b0','#e84a4a','#a8c8e8'],LC2,[[36,'fousable',{map:'temple'}],[36,'toursable']],'pionsable',2,'fermete','Un chevalier de sable à l\'armure polie. Au Temple des Fondateurs, dit-on, il se change en sage plutôt qu\'en forteresse.');
S10('fousable','Fousable','LUM',[78,95,80,98],225,45,['#e8d8b0','#e84a4a','#c8e8ff'],[...LC2,[38,'rayonaurore'],[44,'prisme']],null,'pionsable',3,'technicien','Un Cavalsable qui a médité au Temple des Fondateurs. Il se déplace en diagonale et ne se trompe jamais de chemin.');
S10('toursable','Toursable','ROC',[105,92,120,38],225,45,['#e8d8b0','#5a4a3a','#3a3a3a'],LC2,null,'pionsable',3,'cuirasse','Une tour de sable si solide qu\'on construit des maisons contre elle. Elle bouge… mais seulement en ligne droite.');
S10('pierrouche','Pierrouche','ROC',[45,55,65,50],62,170,['#5a5a6a','#e84a4a','#a8a8b8'],LC2,[24,'runocon'],0,1,'cuirasse','Un insecte à carapace de pierre qui creuse les Galeries Oubliées. Il mange les vieux cailloux gravés.');
S10('runocon','Runocon','ROC',[65,65,95,40],145,90,['#4a4a5a','#e84a4a','#a8a8b8'],LC2,[[38,'runestique',{stars:1}]],'pierrouche',2,'cuirasse','Un cocon de pierre couvert de runes. Les runes s\'allument, dit-on, sous les étoiles filantes.');
S10('runestique','Runestique','OMB',[78,100,78,102],225,45,['#2a2a3a','#e84a4a','#f0e0ff'],LO2,null,'pierrouche',3,'technicien','Un moustique runique sorti de son cocon une nuit d\'étoiles. Ses ailes chantent une langue que seuls les fondateurs parlaient.');
S10('claymoroc','Claymoroc','ROC',[70,85,85,55],160,60,['#e8902e','#a85a2a','#f0e0a0'],LC2,[[40,'regalance',{bond:3}]],0,1,'intimidation','Un soldat de terre cuite qui garde les ruines. Il n\'obéit qu\'à ceux qu\'il juge dignes.');
S10('regalance','Régalance','ROC',[100,115,105,65],245,25,['#e8902e','#f6c445','#f0e0a0'],[...LC2,[44,'megaimpact'],[50,'masquesolaire']],null,'claymoroc',2,'intimidation','Le général des anciens soldats d\'argile. Il a juré fidélité au dresseur qui a gagné son cœur, et ne trahit jamais un serment.');
// OMBRE
S10('potagheist','Potagheist','OMB',[50,52,62,40],66,150,['#e8c8a0','#8a5ad0','#4a3a2a'],LO2,[30,'amphorombre'],0,1,'cuirasse','Un esprit qui s\'est installé dans une vieille jarre. Il fait tinter le couvercle pour qu\'on le remarque.');
S10('amphorombre','Amphorombre','OMB',[82,88,98,55],170,60,['#4a3a5a','#e8c070','#8a5ad0'],LO2,null,'potagheist',2,'cuirasse','Ses tentacules d\'ombre sortent d\'une amphore millénaire. Il garde les réserves des fondateurs au Temple.');
S10('pipistrel','Pipistrel','OMB',[42,52,40,72],60,190,['#8a5a4a','#ff9ab8','#3a2a2a'],LO2,[[26,'strellune',{time:'n'}]],0,1,'feutre','Une petite chauve-souris qui dort accrochée aux branches. Elle se réveille au crépuscule en bâillant.');
S10('strellune','Strellune','OMB',[72,82,62,100],155,75,['#6a4a3a','#ff9ab8','#3a2a2a'],LO2,null,'pipistrel',2,'feutre','Elle vole si silencieusement que même les Hiboulume ne l\'entendent pas. Elle aime les nuits sans lune.');
S10('serpillou','Serpillou','NOR',[50,55,48,55],62,160,['#e8702e','#f0e0a0','#4a8a3e'],LN2,[[25,'pythombre',{ecl:1}]],0,1,'intimidation','Un petit serpent orangé qui se faufile dans les maisons pour voler les crêpes. On ne lui en veut jamais longtemps.');
S10('pythombre','Pythombre','OMB',[85,100,75,88],180,45,['#5a7a3a','#e84a4a','#2a2a3a'],LO2,null,'serpillou',2,'tenace','Un Serpillou qui a grandi pendant l\'Éclipse. Il est devenu énorme, sombre, et ne vole plus de crêpes : il vole des tartes entières.');
// NORMAL
S10('brisillon','Brisillon','NOR',[42,48,40,64],56,220,['#f6e0a0','#a87a4a','#e84a4a'],LSK,[18,'ventaile'],0,1,'vigilant','Un oisillon dodu qui suit le vent. Il s\'endort parfois en plein vol et se réveille… ailleurs.');
S10('ventaile','Ventaile','NOR',[62,66,58,86],130,120,['#f6e0a0','#c89a4a','#e84a4a'],LSK,[[36,'tempestaile',{rain:1}],[42,'tempestaile']],'brisillon',2,'vigilant','Il plane des heures sans battre des ailes. Les jours d\'orage, il grimpe dans les nuages pour s\'y entraîner.');
S10('tempestaile','Tempestaile','NOR',[83,92,75,110],215,45,['#f6e0a0','#a83a2a','#3a3a3a'],[...LSK,[38,'orage'],[46,'fatalfoudre']],null,'brisillon',3,'orageux','Il naît d\'un Ventaile qui a traversé un orage. Le battement de ses ailes fait gronder le tonnerre.');
S10('medichiot','Médichiot','NOR',[60,40,50,50],66,140,['#ff9ab8','#ffffff','#e84a4a'],[[1,'charge'],[1,'soin'],[6,'grimace'],[10,'doublecoup'],[15,'rafraichir'],[20,'abri'],[26,'facade'],[32,'plaquage']],[[1,'doctoutou',{bond:3}]],0,1,'medecin','Un chiot infirmier. Il lèche les blessures des créatures et s\'assied à côté des malades jusqu\'à ce qu\'ils guérissent.');
S10('doctoutou','Doctoutou','NOR',[95,70,80,70],160,60,['#ff9ab8','#ffffff','#e84a4a'],[[1,'charge'],[1,'soin'],[10,'doublecoup'],[15,'rafraichir'],[20,'abri'],[26,'facade'],[32,'plaquage'],[38,'megaimpact']],null,'medichiot',2,'medecin','Le meilleur ami des infirmières de Centre de Soins. Il sait reconnaître une créature malade à l\'odeur.');
S10('nounoursol','Nounoursol','LUM',[95,80,78,55],170,45,['#8a5a3a','#f6c445','#ffe080'],[[1,'charge'],[1,'lueur'],[8,'doublecoup'],[14,'rayonaurore'],[20,'abri'],[26,'facade'],[32,'prisme'],[40,'aubeeternelle']],null,0,1,'fidele','Un ourson qui porte un petit soleil entre ses pattes. Il ne le lâche jamais, même pour dormir.');
S10('cherubat','Chérubat','OMB',[62,62,58,90],140,75,['#3a3a3a','#f6c445','#ff9ab8'],[[1,'ombrefurtive'],[1,'grimace'],[8,'morsure'],[14,'eblouir'],[20,'machination'],[26,'devoreve'],[32,'griffeombre'],[38,'lunenoire']],null,0,1,'charmeur','Une chauve-souris au visage d\'ange. Elle s\'approche des voyageurs pour leur voler… un câlin.');
S10('vivipere','Vivipère','NOR',[55,55,50,55],65,45,['#e8d0a0','#a87a4a','#4a3a2a'],LVIV,[[20,'vivicendre',{map:'mont'}],[20,'viviphyte',{map:'bois'}],[20,'vivitron',{map:'volterre'}],[20,'vividactyle',{map:'galeries'}],[20,'vivisource',{map:'lac'}]],0,1,'fidele','Un serpent changeant dont on ne connaît pas la forme adulte. Il prend celle du lieu où il grandit : volcan, bois, ville, galerie ou lac.');
S10('vivicendre','Vivicendre','FEU',[70,95,65,85],184,45,['#e8702e','#f6c445','#a8402a'],LF2,null,'vivipere',2,'torche','Un Vivipère qui a grandi sur le Mont Braise. Ses écailles sont des braises qui ne s\'éteignent pas.');
S10('viviphyte','Viviphyte','PLA',[75,75,90,80],184,45,['#c8e86a','#4aa83e','#e84a4a'],LP2,null,'vivipere',2,'seve','Un Vivipère qui a grandi au Bois Sépulcral. Des feuilles poussent le long de son corps.');
S10('vivitron','Vivitron','ELE',[65,92,62,101],184,45,['#5a4ab8','#ffe060','#3a3a6a'],LV2,null,'vivipere',2,'paratonnerre','Un Vivipère qui a grandi à Volterre, entre les turbines. Il court le long des câbles.');
S10('vividactyle','Vividactyle','ROC',[80,90,100,50],184,45,['#c8a070','#8a6a4a','#4a3a2a'],LC2,null,'vivipere',2,'cuirasse','Un Vivipère qui a grandi dans les Galeries Oubliées. Il a poussé des ailes de pierre.');
S10('vivisource','Vivisource','EAU',[100,70,70,80],184,45,['#3a6ad8','#c8e8ff','#2a3a8a'],LE2,null,'vivipere',2,'absorbeau','Un Vivipère qui a grandi au Lac Opalin. Il se dissout dans l\'eau et réapparaît où il veut.');
// LÉGENDAIRES ET MYTHIQUES
S10('aurorelle','Aurorelle','LUM',[100,105,95,110],290,3,['#f0e0ff','#a8c8f0','#ff9ab8'],[[1,'lueur'],[1,'zenith'],[1,'rayonaurore'],[40,'voilestellaire'],[45,'prisme'],[50,'aurorale'],[60,'aubeeternelle']],null,0,1,'aurore','La première lumière du monde, celle d\'avant le soleil. Elle ne se montre qu\'à l\'aube, sur le Pic Céleste, à qui a rallumé les quatre feux des phases.');
S10('eclipsar','Éclipsar','OMB',[110,115,100,95],300,3,['#1a1420','#f6c445','#8a5ad0'],[[1,'nuit'],[1,'eclipse'],[1,'rayonnoir'],[45,'machination'],[50,'lunenoire'],[55,'eclipsetotale'],[60,'soin']],null,0,1,'eclipsetot','L\'Éclipse elle-même, endormie sous le Temple des Fondateurs. Quand Solarion et Nocturion se disputent, c\'est lui qui se réveille.');
S10('errenard','Errenard','OMB',[85,90,80,120],240,10,['#a8a8b8','#3a3a4a','#e84a4a'],[[1,'ombrefurtive'],[1,'feinterrante'],[20,'hypnose'],[30,'griffeombre'],[40,'clairlune'],[50,'lunenoire']],null,0,1,'fuyant','Un renard d\'ombre qui erre de région en région sans jamais dormir deux fois au même endroit. Ceux qui l\'ont vu ne s\'accordent jamais sur sa couleur.');
S10('masquaserp','Masquaserp','LUM',[90,100,90,100],260,5,['#3a8ab8','#e84a4a','#f6c445'],[[1,'lueur'],[1,'masquesolaire'],[20,'hypnose'],[30,'prisme'],[40,'lamecycle'],[50,'soin']],null,0,1,'technicien','Le gardien masqué des énigmes du Temple. Il pose trois questions, et ne se laisse approcher que par qui y répond.');
['cardiflamme','cardinova','pinsoflamme','ampystorme','angeflocon','demoniflocon','seraphivre','lucifrimas','ventiloon','eoloeil','runestique','pipistrel','strellune','brisillon','ventaile','tempestaile','cherubat','aurorelle','masquaserp','medulune','vividactyle'].forEach(k=>FLY.add(k));
// Ordre du Pixédex : les nouvelles familles s'insèrent avant les légendaires
{const LEG=['heliote','seleniote','presagelle','crepuscel','solarion','nocturion'];const tail=DEX.splice(DEX.indexOf('heliote'));
 DEX.push(...V10SP.filter(k=>!['aurorelle','eclipsar','errenard','masquaserp'].includes(k)),'heliote','seleniote','errenard','masquaserp','presagelle','aurorelle','eclipsar','crepuscel','solarion','nocturion');for(const k of tail)if(!DEX.includes(k))DEX.push(k)}
// Nouveaux mouvements appris par les anciennes familles (insérés au bon niveau)
const addLearn=(L,lv,mv)=>{if(L.some(e=>e[1]===mv))return;const i=L.findIndex(e=>e[0]>lv);L.splice(i<0?L.length:i,0,[lv,mv])};
addLearn(LF,30,'nitrocharge');addLearn(LF,40,'flammeclipse');addLearn(LE,26,'cascade');addLearn(LE,40,'aquabrume');addLearn(LP,20,'vampigraine');addLearn(LP,27,'lamefeuille');addLearn(LR,23,'facade');addLearn(LR,38,'megaimpact');
addLearn(LC,27,'tomberoche');addLearn(LC,36,'seisme');addLearn(LO,24,'griffeombre');addLearn(LO,38,'machination');addLearn(LT,27,'mareenoire');addLearn(LL,26,'rayonaurore');addLearn(LL,38,'lamecycle');addLearn(LV,25,'parabocharge');addLearn(LV,38,'orage');
for(const k of['flamiot','brasilion']){addLearn(SP[k].learn===LF?[]:SP[k].learn,40,'flammeclipse')}
