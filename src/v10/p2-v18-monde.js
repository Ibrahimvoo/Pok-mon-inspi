// =====================================================================
// EXTENSION 18.0 — LE CARNAVAL DES MASQUES · Le monde : Gorges du Vent, Carnavelle et sa Place du Carnaval, Dunes d'Ambre,
// Oasis de Sahra, Tombeau du Roi des Sables, Marais des Lucioles, Île Corail ; Grand Magasin, Atelier Mirella, Théâtre, Repaire.
// Chargé avant l'aventure à plusieurs : les portes, cases et entrées de ces lieux deviennent des scènes partagées.
// =====================================================================
const V18R={
 route3:["^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^","^^,,,,,,^^^^^^^^^^^^^^^,,,,,,^^^","^^,,,,,,..^^^^^^^^^^^^.,,,,,,.^^","^^,,,o,,..^^^^^^^^^^^^........^^","^^^^^.........................k^","^^^^^^^..,,,,,,....===========^^","^^^^^^^..,,,,,,....=......^^^^^^","^^,,,....,,,,,,....=..,,,.^^^^^^","^^,,,..........S...o..,,,.....^^","^^,k,...o..=====================","^^^^^^.....=........^^^^^^^^^^^^","^^^^^^.....=....,,,,,^^^^^^^^^^^","=====......=....,,,,,....,,,,.^^","============....,,,,,....,,,,.^^","^^^^^^^^...,,,,,,.....,,,,.o..^^","^^^^^^^^...,,,,,,.....,,,,....^^","^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"],
 carnavelle:["TTTTTTTTTTTTTT==TTTTTTTTTTTTTT","TTTTTTTTTTTTTT==TTTTTTTTTTTTTT","TT....BBBBB...==...GGGGG....TT","TT.f..BBBBB...==...GGGGG..f.TT","TT....BBBBB.S.==...GGGGG....TT","TT....WnDnW...==...WnDnW.S..TT","TT..======================..TT","TT...........l==l...........TT","TT......RRRRR.==...AAAAA....TT","TT......RRRRR.==...AAAAA....TT","TT..f...RRRRR.==.NNAAAAA....TT","TT......RRRRR.==...AAAAA...fTT","TT......RRRRR.==...AAAAA....TT","TT......WnWDW.==...WnWDW....TT","TT.~~=====================..TT","TT~~~~..=....l==l...........TT","TT~~~~..=.....================","TT~~~~HH=&&&..================","TT~~~~..=.....==.YYYYY......TT","TT~~~~..=&&&..==.YYYYY..,,,,TT","TT~~~~HH=.....==.YYYYY..,,,,TT","TT~~~~..=.....==.WnDnW..,,,,TT","TT~~~~====**==============..TT","TT~~~~........==............TT","TTTTTTTTTTTTTT==TTTTTTTTTTTTTT","TTTTTTTTTTTTTT==TTTTTTTTTTTTTT"],
 carnaval:["TTTTTTTTTTTTTTTTTTTTTTTTTT==TT","TTTTTTTTTTTTTTTTTTTTTTTTTT==TT","TT&&......&........&......==TT","TT..........AAAAAA........==TT","TT.......l..AAAAAA..l....f==TT","TT..f.......AAAAAA........==TT","TT..........WnWDWn.....S..==TT","TT..........S..=..........==TT","TT..========================TT","TT..=....................=..TT","TT..=.RRRRR........YYYYYY=..TT","TT..=.RRRRR........YYYYYY=..TT","TT..=.RRRRR...==...YYYYYY=..TT","TT..=.RRRRR..%%%%..WnWDWn=..TT","TT..=.RRRRR..%%%%........=..TT","TT..=.WnWDW...==.........=..TT","TT..======================..TT","TT............==............TT","TT.,,,,,,..l..==..l..,,,,,,.TT","TT.,,,,,,...*.==.*...,,,,,,.TT","TT.,,,,,,NN...==...NN,,,,,,.TT","TT.,,,,,,.....==.....,,,,,,.TT","TTTTTTTTTTTTTT==TTTTTTTTTTTTTT","TTTTTTTTTTTTTT==TTTTTTTTTTTTTT"],
 dunes:["^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^","^^..^^^^^......^^^....^^^^^^^.^^","^^..^^^^^.......^.....^^^^^^^.^^","^^..^^^^^.......=====.^^^^^^^.^^","^^..............=.....^^^^^^^.^^","^^.,,,,,,..^^^..=.............^^","^^.,,,,,,..^^^..=......u......^^","^^.,,,,,,..^^^..=...........,,^^","^^..............=...^^^^^...,,^^","==========......=...^^^^^...,,^^","==========......=...^^^^^...,,^^","^^.......=..,,,.=.........k.,,^^","^^....u..=o.,,,.=..,,,,,....,,^^","^^.......=..,,,.=..,,,,,......^^","^^.......=......=.............^^","^^.......===================..^^","^^^^^^^...........S.......==..^^","^^^^^^^.,,,...............==..^^","^^^^^^^.,,,.^^^^^^.,,,,,,.==..^^","^^^^^^^.,,,.^^^^^^.,,,,,,.==..^^","^^^^^^^.,,,.^^^^^^.,,,,,,.==..^^","^^^^^^^^^^^^^^^^^^^^^^^^^^==^^^^","^^^^^^^^^^^^^^^^^^^^^^^^^^==^^^^"],
 oasis:["TTTTTTTTTTTTTTTTTTTTTTTT","TTTBBBBBTTTTTTRRRRRTTTTT","TT.BBBBB......RRRRR...TT","TT.BBBBB......RRRRR..fTT","TT.WnDnW......WnWDW...TT","TT...==============...TT","TT...=............=...TT","TT...=............=...TT","TTf..=.S..........=...TT","TT...=............=...TT","TT...===================","TT...====~~~~~~=========","TT,,,=..~~~~~~~~......TT","TT,,,=..~~~~~~~~......TT","TT,,,=..~~~~~~~~.u..o.TT","TT......~~~~~~~~......TT","TTTTTTTTTT~~~~TTTTTTTTTT","TTTTTTTTTTTTTTTTTTTTTTTT"],
 tombeau:["^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^CggC^^^^^^^^^","^^^^^^^^^ghgg^^^^^^^^^","^^^^^^^^^gggg^^^^^^^^^","^^^^^^^^^^QQ^^^^^^^^^^","^^^vvgCggggggggCgvv^^^","^^^vvggggggggggggvv^^^","^^^gggggggggggggggg^^^","^^^CggggggggggggggC^^^","^^^ggggg^^^^^^ggggg^^^","^^^ggggg^gSgg^ggggg^^^","^^^ggggg^gggg^ggggg^^^","^^^vvvggggggggggvvv^^^","^^^vvvggggggggggvvv^^^","^^^^^^^^^^gg^^^^^^^^^^","^^^^^^^^^^EE^^^^^^^^^^"],
 tombeau2:["^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^","^^vvgCggggCgvv^^","^^vvggggggggvv^^","^^gggg^gg^gggg^^","^^gggggggggggg^^","^^CggggggggggC^^","^^gggggggggggg^^","^^gggggggggggg^^","^^gggggggggggg^^","^^^^^^^gg^^^^^^^","^^^^^^^EE^^^^^^^"],
 marais:["TTTTTTTTTTTTTT==TTTTTTTTTTTTTT","TTRRRRRTTTTTTT==TTTTTTTTTTTTTT","TTRRRRR.......==............TT","TTRRRRR....b..==....b.......TT","TTWnWDW.......==..........f.TT","TT...====================...TT","TT,,,=..................=,,,TT","TT,,,=.~~~~~~,,,,.......=,,,TT","TT,,,=.~~~~~~,,,,~~~~~..=,,,TT","TT,,,=.~~~~~~,,,,~~~~~..=,,,TT","TT,,,=.~~~~~~,,,,~~~~~..=,,,TT","TT,,,=.......,,,,~~~~~..=,,,TT","TT,,,=...~~~.,,,,..,,,,.=,,,TT","TT,,,=...~~~.......,,,,.=...TT","TT,,,=...~~~..===========...TT","TT,,,=.,,,,,,...............TT","TT.P.=.,,,,,,.........~~~~~~TT","TT...====S============~~~~~~TT","TT~~~~~~~~......,,,,,,~~~~~~TT","TT~~~~~~~~......,,,,,,.....oTT","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"],
 corail:["~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~","~~..TTTTTTTT.......TTTTTTTT.~~","~~..TTTTTTTT,,,,,,.TTTTTTTT.~~","~~..TTTTTTTT,,,,,,.TTTTTTTT.~~","~~..TTTTTTTT,,,,,,.,,,,,,...~~","~~...,,,,,....=======,,,,...~~","~~...,,,,,....=....,,,,,,...~~","~~...,,,,,.f..=...RRRRR,,...~~","~~...,,,,,....=...RRRRR.....~~","~~............=...RRRRR.....~~","~~............=...WnWDW..C..~~","~~..C...=S=============.....~~","~~............==............~~","~~....o.......==........u...~~","~~............HH............~~","~~............HH............~~","~~~~~~~~~~~~~~HH~~~~~~~~~~~~~~","~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"]};
Object.assign(BLD,{carnavelle:{B:'bMart',G:'bCenter',R:'bHouse3',A:'bHouse4',Y:'bPlant'},carnaval:{A:'bGymF',Y:'bGymN',R:'bHouse4'},oasis:{B:'bMart',R:'bHouse2'},marais:{R:'bHouse2'},corail:{R:'bHouse2'}});
IST.shop={fl:['flLab'],wall:'wallMint',top:'#26323a',rug:'r'};IST.bazar={fl:['flPlank'],wall:'wallHome',top:'#3a2a1e',rug:'r'};
const N18=(x,y,t,d,name,say,o={})=>({x,y,t,d,name,say,...o});
const T18=(x,y,t,d,id,name,team,money,pre,after,post,o={})=>({x,y,t,d,tr:TR(id,name,team,money,pre,after,{post,...(o.tr||{})}),...o});
const CH18=(x,y,fl,fn)=>({x,y,t:'obj',k:'chest18',fl,fn});

// ---------------------------------------------------------------- VOLTERRE : la sortie ouest vers les Gorges du Vent
MAPS.volterre.rows0=null;MAPS.volterre.rows[13]='====='+MAPS.volterre.rows[13].slice(5);(MAPS.volterre.edges??={}).w=['route3',-4];
MAPS.volterre.npcs.push(N18(1,13,'sailor',3,'Garde des Gorges',()=>f().badge4?'Ambroise a fermé les Gorges du Vent : trop de vent, trop de sbires. Va le voir au téléphérique, il t\'expliquera.':'Les Gorges du Vent ? Fermées. Ordre d\'Ambroise. Reviens avec le Badge Volt, et surtout avec sa permission.',{cond:()=>!f().v18vol}));

// ---------------------------------------------------------------- ROUTE 3 · GORGES DU VENT
MAPS.route3={name:'Route 3 · Gorges du Vent',bg:'mont',amb:'day',mus:'route',biome:'mont',windy:1,edges:{e:['volterre',4],w:['carnavelle',4]},rows:V18R.route3,
 enc:[['helifeuille',29,32,16],['mousseroc',29,32,12],['braisot',30,32,12],['lapignite',29,32,12],['chenillard',29,31,14],['briquillon',30,32,10],['fourmilou',29,31,10],['copterbe',32,33,3],['ecrouvis',29,32,10],['lapitesse',29,32,10],['fournours',30,32,8],['kernelec',32,34,2],
  ['hibougris',30,32,14,'n'],['hyenou',30,32,12,'n'],['chromoeil',31,33,6,'n'],['singelec',30,32,14,'r'],['ventiloon',30,32,8,'r'],['oeillombre',31,33,18,'e']],
 signs:{'15,8':'GORGES DU VENT\nEst : Volterre. Ouest : Carnavelle, la cité du Carnaval.\n« Tenez vos chapeaux. »'},
 hidden:[{x:2,y:3,it:'ambre',q:1,id:'r3h1'},{x:29,y:12,it:'eauoasis',q:2,id:'r3h2'},{x:13,y:15,it:'pepite',q:1,id:'r3h3'}],
 npcs:[I(29,3,'festicapsule',3,'r3b1'),I(8,15,'superpotion',3,'r3b2'),I(28,15,'pierresable',1,'r3b3'),
  T18(24,4,'girl',2,'r3a','Parapentiste Zoé',[['helifeuille',30],['copterbe',32],['piafou',31]],1100,'Le vent est parfait aujourd\'hui ! Un combat pour fêter ça ?','Je me suis envolée… dans le mauvais sens.','Les Héliffeuille se laissent porter par le vent jusqu\'à Carnavelle. Ils y vont pour le Carnaval, comme tout le monde.'),
  T18(6,8,'mountaineer',0,'r3b','Montagnard Brice',[['briquillon',31],['mousseroc',31],['braisot',32]],1200,'Ces gorges, je les connais par cœur. Toi, par contre…','Bon, tu les connais mieux que moi, finalement.','Un sbire de la Team Éclipse est passé en courant tout à l\'heure. Il portait un masque de Carnaval et serrait une clé contre lui.'),
  T18(17,12,'miner',2,'r3c','Ouvrière Nadia',[['briquegarde',33],['ecrouvis',31],['fourminet',31]],1200,'On répare la route après chaque tempête. Et toi, tu casses tout ?','Ma route tient mieux que mes créatures…','Les Briquillon adorent les chantiers. Si tu en vois un, c\'est qu\'un mur est en train de se construire tout seul.'),
  T18(26,14,'danseuse',2,'r3d','Danseuse Lola',[['lapignite',31],['volcanin',33]],1300,'Je m\'entraîne pour le Carnaval ! Danse avec moi… en combat !','Tu as le rythme dans la peau !','Au Carnaval, tout le monde porte un masque. Sans masque, les gardes ne te laissent pas entrer sur la Place !'),
  T18(8,2,'ninja',0,'r3e','Ninja Kenji',[['hyenou',31],['araignuit',32]],1400,'Tu ne m\'avais pas vu, hein ? Personne ne me voit.','Tu m\'as vu. Tu m\'as même battu.','Mon maître, Kaito, vit à Carnavelle. Si tu bats ses trois élèves, il t\'apprendra peut-être l\'art de passer inaperçu.',{ninja:1}),
  N18(20,4,'old',2,'Vieux berger','Les Gorges hurlent quand le vent tourne. Les anciens disaient que c\'est Tornalis qui se dispute avec les falaises.'),
  N18(11,6,'scout',3,'Touriste perdu',()=>f().v18done?'Carnavelle, c\'est fini pour cette année ? Dommage. Bon, au moins je sais où c\'est, maintenant.':'Tu sais où est Carnavelle ? Toujours à l\'ouest ? Merci ! Je ne veux pas rater le Carnaval des Masques !')]};

// ---------------------------------------------------------------- CARNAVELLE
MAPS.carnavelle={name:'Carnavelle',bg:'plaine',amb:'day',mus:'carnaval',edges:{e:['route3',-4],n:['carnaval',0],s:['marais',0]},rows:V18R.carnavelle,
 doors:{'8,5':['gmag',6,8,1],'21,5':()=>center('Carnavelle',['carnavelle',21,6]),'11,13':['atelier',4,6,1],'22,13':['carnH1',4,5,1],'19,21':['commiss',4,6,1]},
 signs:{'12,4':'GRAND MAGASIN DE CARNAVELLE\nDeux étages, cinq rayons : tout pour le dresseur !','25,5':'CARNAVELLE\n« La cité où chacun peut être quelqu\'un d\'autre. »\nNord : Place du Carnaval. Sud : Marais des Lucioles.'},
 hidden:[{x:3,y:3,it:'festicapsule',q:2,id:'cvh1'},{x:27,y:23,it:'barbapapa',q:2,id:'cvh2'},{x:4,y:10,it:'masqueor',q:1,id:'cvh3'}],
 enc:[['helichat',31,33,20],['lapitesse',30,32,25],['flanlou',30,32,20],['singelec',30,32,15],['chatoeil',31,33,10,'n'],['draplin',31,33,10,'n']],fish:[['crabeil',30,33,40],['algadou',30,33,40],['dauphinou',30,33,20]],fish2:[['crabeil',34,37,30],['algadou',34,37,30],['blobulle',36,40,15],['aileronde',34,37,25]],
 npcs:[N18(14,1,'sailor',0,'Garde du Carnaval',null,{fn:n=>carnGuard(n),cond:()=>!carnOpen()}),N18(15,1,'sailor',0,'Garde du Carnaval',null,{fn:n=>carnGuard(n),cond:()=>!carnOpen()}),
  {x:6,y:17,t:'captain',d:1,name:'Capitaine Corentin',fn:()=>ferryTalk('carnavelle')},
  N18(12,17,'patissiere',3,'Pâtissière Praline',null,{fn:()=>pralineShop()}),N18(12,19,'granny',3,'Marchande de fruits',null,{fn:()=>fruitShop()}),
  N18(24,10,'kid',2,'Petit Max',tod('Mon grand frère dit qu\'au Carnaval, même les Pixémons portent des masques ! C\'est vrai ?','La nuit, les lampions s\'allument et tout le monde danse sur la Place. Moi, je dois dormir. C\'est nul.','Il fait tout noir… même le Carnaval a peur de l\'éclipse.','Le Carnaval, c\'est la fête du jour ET de la nuit. Maman dit que c\'est grâce à toi.'),{wan:1}),
  N18(5,7,'girl',1,'Touriste masquée',()=>dgIs('masque')?'Oh ! Joli masque ! On ne te reconnaît pas du tout. Enfin, je ne t\'ai jamais vu, donc forcément.':'Tu n\'as pas encore de masque ? L\'Atelier Mirella, juste là, en vend de magnifiques. Sans masque, les gardes te refoulent !',{wan:1}),
  N18(26,15,'sailor',2,'Marin bavard',()=>f().v18done?'Le Capitaine Corentin emmène les voyageurs à l\'Île Corail. Ses Raptoucan, ses totems, ses plages… Le paradis !':'Le ferry pour l\'Île Corail ne part pas pendant le Carnaval. Le capitaine danse toute la nuit, et il a le mal de mer le lendemain.'),
  N18(18,9,'old',0,'Grand-père Tito',tod('Je suis né à Carnavelle, il y a soixante-dix Carnavals. Chaque année, la ville se déguise… et chaque année, quelqu\'un en profite.','La nuit, regarde les toits. On dit qu\'un ninja d\'ombre y court entre les cheminées.','Même pendant l\'éclipse, on a fait le Carnaval. Il faut bien rire un peu.','Tu as sauvé le Carnaval ET le Cycle ? Il faudra que je mette ton masque dans le musée.')),
  N18(20,15,'botanist',1,'Fleuriste',()=>'Le Marais des Lucioles, au sud, brille comme un ciel étoilé la nuit. Mais méfie-toi de la cabane de la sorcière… Enfin, elle est gentille. Surtout si on lui achète quelque chose.',{wan:1}),
  I(27,2,'sirop',2,'cvb1'),I(12,23,'festicapsule',2,'cvb2'),BT(26,22,'carn','baieprisme')]};

// ---------------------------------------------------------------- PLACE DU CARNAVAL
MAPS.carnaval={name:'Place du Carnaval',bg:'plaine',amb:'day',mus:'carnaval',edges:{s:['carnavelle',0],n:['dunes',0]},rows:V18R.carnaval,festive:1,
 doors:{'15,6':['theatre',7,10,1],'22,13':()=>gym5Door(),'9,15':['tente',4,5,1]},
 signs:{'23,6':'ARÈNE DES MASQUES\nChampion : Arlequin, l\'illusionniste.\n« Ce que tu vois n\'est peut-être pas ce qui est. »','12,7':'THÉÂTRE DES LUMIÈRES\nCe soir : « La Valse des Masques ». Entrée libre.'},
 hidden:[{x:2,y:2,it:'granita',q:1,id:'cph1'},{x:27,y:21,it:'pommamour',q:1,id:'cph2'}],
 npcs:[N18(19,7,'grunt',3,'Sbire masqué',null,{fn:()=>gruntsTalk(0),cond:()=>!f().v18faus}),N18(20,7,'grunt',2,'Sbire masqué',null,{fn:()=>gruntsTalk(1),cond:()=>!f().v18faus}),
  N18(26,3,'nomade',2,'Caravanière Lyla',()=>dgIs('sable')?'Avec ta Tenue des Sables, la tempête ne te fera rien. Au nord, les Dunes d\'Ambre, l\'Oasis… et le Tombeau.':'Au nord, les Dunes d\'Ambre. La tempête de sable n\'y cesse jamais : sans Tenue des Sables, tu seras repoussé. Saïd, le chef de caravane, en prête aux dresseurs méritants.'),
  N18(7,18,'danseuse',0,'Danseuse étoile',tod('Un, deux, trois, tourne ! Au Carnaval, on danse du matin au soir.','À la nuit tombée, les lampions s\'allument et le Grand Bal commence !','Danser dans le noir, c\'est encore plus magique.','Tu veux danser ? Non ? Dommage !'),{wan:1}),
  N18(22,19,'dgmasque',1,'Fêtard masqué','Qui suis-je ? Personne ne le sait ! Même pas moi, j\'ai oublié sous quel masque je suis venu.',{wan:1}),
  N18(9,9,'kid',0,'Jongleur',()=>'Regarde, je jongle avec trois Capsules ! … Deux. … Une. Bon, j\'arrête.'),
  N18(18,9,'girlkid',0,'Fillette costumée',()=>dgIs()?`Trop beau, ton costume de ${DG[G.dg][0].toLowerCase()} !`:'Moi, je suis déguisée en Flanlou ! Tu vois pas ? C\'est le chapeau caramel.'),
  N18(14,17,'maestro',2,'Héraut du Carnaval',null,{fn:()=>heraultTalk()}),
  T18(5,13,'danseuse',1,'cpa','Danseuse Inès',[['flanlou',33],['singelec',33],['volcanin',34]],1500,'Le Carnaval, c\'est aussi des combats ! Tu entres dans la danse ?','Quelle cadence !','Arlequin, le champion, adore les illusions. Dans son arène, rien n\'est ce qu\'il paraît.',{los:0}),
  T18(24,17,'dgmasque',2,'cpb','Fêtard Masqué',[['chatoeil',34],['possedrap',33]],1500,'Ha ha ! Sous mon masque, je suis invincible !','Le masque n\'aide pas, finalement.','Les Draplin du Théâtre adorent les costumes. Certains ne les rendent jamais.',{los:0}),
  I(3,21,'pommamour',1,'cpb1'),I(26,9,'festicapsule',3,'cpb2')]};

// ---------------------------------------------------------------- DUNES D'AMBRE (tempête de sable au-delà de la ligne 15 sans Tenue des Sables)
MAPS.dunes={name:'Dunes d\'Ambre',bg:'mont',amb:'day',mus:'desert',biome:'mont',desert:1,storm:15,edges:{s:['carnaval',0],w:['oasis',0]},rows:V18R.dunes,
 doors:{'16,3':()=>tombDoor()},
 enc:[['serpetin',36,39,14],['diablin',36,39,14],['fourminet',36,38,14],['fenneclat',37,40,8],['pincadune',36,39,10],['fourmilou',36,38,10],['serpinet',36,39,10],['requiroc',39,42,2],['cobrasier',39,41,3],
  ['eskichiot',36,39,14,'n'],['ombrelain',36,39,14,'n'],['oursaturne',37,40,6,'n'],['hyenou',36,39,12,'n'],['oeillombre',38,41,18,'e']],
 signs:{'18,17':'DUNES D\'AMBRE\nTempête de sable permanente au nord. Tenue des Sables indispensable.\nOuest : Oasis de Sahra. Nord : Tombeau du Roi des Sables.'},
 hidden:[{x:29,y:2,it:'scarabee',q:1,id:'duh1'},{x:3,y:13,it:'ambre',q:1,id:'duh2'},{x:22,y:12,it:'sablecapsule',q:3,id:'duh3'}],
 npcs:[N18(20,17,'nomade',2,'Chef Saïd',null,{fn:()=>saidTalk()}),
  I(28,13,'pierresable',1,'dub1'),I(3,2,'maxpotion',1,'dub2'),I(8,21,'eauoasis',3,'dub3'),
  T18(13,5,'nomade',3,'dua','Nomade Farid',[['serpetin',38],['fenneclat',39],['diablosaure',39]],1800,'Le désert ne pardonne pas. Moi non plus !','Le désert t\'a adopté, on dirait.','La nuit, le désert gèle. Les Eskichiot sortent de leurs terriers pour jouer dans le givre.'),
  T18(25,8,'nomade2',2,'dub','Nomade Yasmina',[['pincadune',38],['cobrasier',40]],1800,'Une tempête, un combat. C\'est la loi des dunes.','Le vent tourne…','Le Tombeau, au nord, s\'ouvre à qui comprend la course du soleil. C\'est écrit sur la stèle, à l\'intérieur.'),
  T18(4,15,'knight',0,'duc','Chevalier Ensablé',[['briquegarde',39],['scorpaille',38],['fourmicrane',39]],2000,'Halte ! Je garde ces dunes depuis… depuis longtemps. Combat !','Je retourne monter la garde. Encore.','Mon armure est pleine de sable. C\'est très désagréable.')]};

// ---------------------------------------------------------------- OASIS DE SAHRA
MAPS.oasis={name:'Oasis de Sahra',bg:'lac',amb:'day',mus:'desert',sand:1,edges:{e:['dunes',0]},rows:V18R.oasis,
 doors:{'5,4':['bazar',4,6,1],'17,4':['oasisH',4,5,1]},
 signs:{'7,8':'OASIS DE SAHRA\n« L\'eau d\'ici n\'a jamais tari. On dit qu\'un gardien veille sur la source. »'},
 hidden:[{x:2,y:14,it:'perle',q:1,id:'oah1'},{x:21,y:2,it:'scarabee',q:1,id:'oah2'}],
 enc:[['glifee',38,41,10],['flanlou',37,40,12],['fenneclat',38,40,10],['tortune',37,40,12],['serpetin',37,40,10],['hyenou',37,40,12,'n'],['chatoeil',38,41,8,'n']],
 fish:[['gelilou',36,39,50],['algadou',36,39,50]],fish2:[['bedouille',40,43,40],['nudiflor',38,41,40],['blobulle',40,43,20]],
 npcs:[{x:16,y:13,t:'mon',sp:'oasiphant',d:3,cond:()=>oasiOk(),fn:n=>oasiphantEvent(n)},
  N18(11,7,'nomade2',0,'Porteuse d\'eau',tod('L\'eau de l\'Oasis guérit la fatigue. Le Bazar en vend en bouteille, mais rien ne vaut la source.','La nuit, quelque chose respire sous l\'eau. Quelque chose de très grand.','Même pendant l\'éclipse, la source n\'a pas tari.','Le gardien de la source dort à l\'aube, dit-on. Quand le soleil touche l\'eau.'),{wan:1}),
  N18(20,8,'old',3,'Vieux sage',()=>f().v18lamp?'Cette lampe… frotte-la ici, à l\'Oasis, quand la lune est haute. Si ce qui dort dedans est encore éveillé, il saura quoi faire.':'Le Roi des Sables dort dans son tombeau, au nord des dunes. On dit qu\'il a emporté avec lui une lampe… et ce qui vivait dedans.'),
  I(21,15,'eauoasis',3,'oab1'),BT(3,9,'oasis','baiesoin')]};

// ---------------------------------------------------------------- TOMBEAU DU ROI DES SABLES et sa Crypte
MAPS.tombeau={name:'Tombeau du Roi des Sables',bg:'grotte',amb:'cave',mus:'ruines',cave:1,biome:'ruins',under:'g',rows:V18R.tombeau,sw:{Q:()=>f().v18tomb?'g':'^'},
 doors:{'10,15':['dunes',16,4,0],'11,15':['dunes',16,4,0],'10,2':['tombeau2',7,9,1]},
 signs:{'10,10':'STÈLE DU ROI\n« Salue d\'abord le soleil qui se lève, puis le soleil au plus haut, puis le soleil qui se couche. Enfin, souhaite bonne nuit à la lune. »'},
 enc:[['fourmicrane',40,43,14],['scorpaille',40,43,12],['draplin',40,43,12],['vampiver',40,42,12],['myrmidon',43,45,3],['nocturaile',43,45,3],['masquetotem',42,44,2],['ninjombre',43,45,2],['pierrouche',40,42,10]],
 hidden:[{x:3,y:13,it:'scarabee',q:1,id:'tbh1'},{x:18,y:13,it:'dc_tempetesable',q:1,id:'tbh2'}],
 acts:{'18,8':()=>tombStatue(0),'15,5':()=>tombStatue(1),'3,8':()=>tombStatue(2),'6,5':()=>tombStatue(3)},
 npcs:[T18(5,11,'knight',1,'tba','Garde Royal Osiris',[['scorpaille',41],['myrmidon',42]],2200,'Nul n\'entre dans la demeure du Roi !','Le Roi… ne m\'en voudra pas. J\'espère.','La crypte du Roi est derrière le mur scellé. Les quatre statues ouvrent le passage.'),
  T18(16,11,'knight',3,'tbb','Garde Royal Anubis',[['fourmicrane',41],['possedrap',42],['pythonova',42]],2200,'Le Roi des Sables dort. Ne le réveille pas !','Il dort encore. Ouf.','Le Roi avait un ami : un génie, enfermé dans une lampe. Il l\'a gardé jusque dans la mort.'),
  I(4,6,'maxpotion',2,'tbb1'),I(17,6,'sablecapsule',3,'tbb2'),I(11,12,'hypercapsule',3,'tbb3')]};
MAPS.tombeau2={name:'Crypte du Roi',bg:'grotte',amb:'cave',mus:'ruines',cave:1,biome:'ruins',under:'g',rows:V18R.tombeau2,
 doors:{'7,11':['tombeau',10,3,0],'8,11':['tombeau',10,3,0]},
 hidden:[{x:2,y:2,it:'masqueor',q:1,id:'tch1'}],
 npcs:[{x:7,y:5,t:'mon',sp:'scorpharaon',d:0,cond:()=>!f().v18garde,fn:n=>cryptGuard(n)},CH18(7,2,'v18lamp',()=>cryptChest()),CH18(12,3,'v18coffre2',async()=>{if(f().v18coffre2)return say('Le coffre est vide.');f().v18coffre2=1;give('scarabee',2);give('pierresable');await say('Dans un coffre de pierre : 2 SCARABÉES D\'OR et une PIERRE SABLE !');save()})]};

// ---------------------------------------------------------------- MARAIS DES LUCIOLES
MAPS.marais={name:'Marais des Lucioles',bg:'foret',amb:'foret',mus:'foret',biome:'forest',swamp:1,edges:{n:['carnavelle',0]},rows:V18R.marais,
 doors:{'5,4':['cabaneB',4,5,1]},
 signs:{'9,17':'MARAIS DES LUCIOLES\nNord : Carnavelle. « Ne suivez pas les lumières après minuit. »'},
 enc:[['escargout',31,34,14],['timibulbe',31,34,12],['choufroid',31,34,12],['croquepiege',32,35,10],['ornitaupe',32,35,8],['bourbeux',33,35,6],['chenillard',31,33,10],['coleorage',33,35,8,'r'],['meduchoc',33,35,4,'r'],
  ['vampiver',31,34,14,'n'],['araignuit',33,35,10,'n'],['poupetronce',32,35,12,'n'],['chlorasaure',30,32,1,'n'],['hippotame',33,35,6],['oeillombre',33,36,18,'e']],
 fish:[['gelilou',30,33,40],['escargout',30,33,30],['tetardin',30,33,30]],fish2:[['bedouille',34,37,30],['coquillagu',34,37,30],['hippotame',35,38,20],['crapaflot',34,37,20]],
 hidden:[{x:27,y:6,it:'sombrecapsule',q:3,id:'mah2'},{x:3,y:6,it:'encensnoir',q:1,id:'mah3'}],
 npcs:[T18(14,10,'botanist',2,'maa','Herboriste Mona',[['timibulbe',33],['choufroid',33],['narcifeuille',35]],1500,'Ne piétine pas mes herbes médicinales !','Elles repousseront… elles repoussent toujours.','Les Timibulbe deviennent Narcifeuille au contact d\'une Pierre Soleil. Ils adorent se regarder dans les mares, après.'),
  T18(25,12,'fisher',2,'mab','Pêcheur Albin',[['gelilou',33],['escargout',33],['bedouille',35]],1500,'Ici, ça mord surtout… les moustiques.','Même mes créatures mordent mieux que les poissons.','Sous la pluie, les Coquillagu sortent de leur coquille. Ce qui en sort fait peur.'),
  T18(20,15,'ninja',1,'mac','Ninja Sora',[['araignuit',34],['croquepiege',34]],1600,'Dans le marais, l\'ombre est mon amie.','Mon maître sera déçu…','Il paraît qu\'au cœur du marais, une nuit sur cent, naît un bébé dragon. Moi, je ne l\'ai jamais vu.',{ninja:1}),
  N18(16,3,'old',2,'Promeneur égaré',tod('Le jour, le Marais est tranquille. Les Escargout laissent des traînées d\'eau claire partout.','Regarde les lucioles ! Des milliers… Les anciens disent qu\'elles guident les âmes perdues.','Même l\'éclipse n\'éteint pas les lucioles.','Le Marais brille plus que jamais, la nuit. C\'est un beau spectacle.')),
  {x:12,y:13,t:'ball',cond:()=>f().v18partQ===1&&!G.bag.partition,fn:async()=>{G.bag.partition=1;jingle('item');await say('Coincée dans les roseaux, une feuille de papier détrempée : la PARTITION PERDUE ! « La Valse des Masques »… Le Maestro du Théâtre sera ravi.');save()}},I(26,19,'superrepousse',2,'mab1'),I(3,15,'sirop',2,'mab2'),I(21,3,'dc_cauchemar',1,'mab3'),BT(23,4,'marais','baiesoin')]};

// ---------------------------------------------------------------- ÎLE CORAIL (ferry depuis Carnavelle)
MAPS.corail={name:'Île Corail',bg:'lac',amb:'day',mus:'route',sand:1,rows:V18R.corail,
 doors:{'21,12':['paillote',4,5,1]},
 signs:{'9,13':'ÎLE CORAIL\n« Sable blanc, eau turquoise et totems grognons. »'},
 enc:[['toucanari',38,41,14],['ouistitou',38,41,14],['bourgeonge',38,41,12],['tikitison',38,41,12],['sushiko',38,40,12],['crabeil',38,41,10],['raptoucan',41,43,3],['tuxou',40,42,2],
  ['nudiflor',38,41,10,'n'],['chatoeil',39,41,6,'n'],['meduchoc',39,42,10,'r'],['oeillombre',40,43,18,'e']],
 fish:[['crabeil',38,41,40],['algadou',38,41,40],['dauphinou',38,41,20]],fish2:[['atlantalgue',42,45,30],['nudisprit',42,45,20],['blobulle',42,45,25],['squalame',44,46,10],['meduchoc',42,45,15]],
 hidden:[{x:3,y:15,it:'coquillage',q:3,id:'coh1'},{x:27,y:6,it:'perle',q:2,id:'coh2'},{x:12,y:4,it:'pierreaube',q:1,id:'coh3'}],
 acts:{'4,13':()=>say('Un totem de bois sculpté. Il a l\'air de bouder. Quelqu\'un a déposé un collier de fleurs à ses pieds.'),'25,12':()=>say('Un grand totem. Sur son socle : « Celui qui sourit au Tikorche aura du beau temps. » Tu souris. Il ne se passe rien. Ou peut-être que si.')},
 npcs:[{x:15,y:17,t:'captain',d:2,name:'Capitaine Corentin',fn:()=>ferryTalk('corail')},
  T18(8,9,'ninja',0,'coa','Ninja Hana',[['ninjombre',41],['raptoucan',41]],2000,'Sur l\'île, le vent porte les ninjas jusqu\'aux nuages.','Je dois encore m\'entraîner.','Maître Kaito t\'attend à Carnavelle, si tu as battu ses trois élèves.',{ninja:1}),
  T18(22,7,'girl',2,'cob','Vacancière Clémence',[['sushiko',40],['makirol',41],['crabermite',41]],1900,'Des vacances sans combat, ce ne sont pas des vacances !','Bon, je retourne bronzer.','Le Tuxou se promène sur la plage le matin. Il est très rare, et très digne.'),
  T18(5,11,'fisher',0,'coc','Pêcheur Marlon',[['algadou',40],['atlantalgue',42]],2000,'Ici, on pêche des Algadou gros comme des ballons !','Le poisson s\'est enfui avec ma victoire.','Avec la Méga Canne, au bout du ponton, on remonte parfois un Squalame.'),
  N18(11,15,'girlkid',1,'Petite Moana',tod('J\'ai construit un château de sable ! Un Pinçadune l\'a cassé. Il marche de côté, alors il ne regarde pas où il va.','La nuit, les Nudiflor brillent dans le lagon. On dirait des étoiles tombées dans l\'eau.','Il fait noir, même sur la plage…','Le soleil se couche sur la mer. C\'est le plus beau moment de la journée.'),{wan:1}),
  I(26,9,'festicapsule',3,'cob1'),I(3,6,'granita',2,'cob2'),BT(26,10,'corail','baieprisme')]};

// ---------------------------------------------------------------- INTÉRIEURS
MAPS.gmag={name:'Grand Magasin · Rez-de-chaussée',bg:'plaine',amb:'in',style:'shop',mus:'town',rows:["XXXXXXXXXXXXXX","XCCCCCFFCCCCCX","XFFFFFFFFFFFFX","XCCCFFFFFFCCCX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XFFCCFFFFCCFFX","XFFFFFFFFFFFsX","XFFFFFFFFFFFFX","XXXXXXEEXXXXXX"],
 furn:[{x:12,y:7,k:'stairsUp'},{x:1,y:8,k:'plantPot'}],wdeco:[{x:6,k:'window'},{x:7,k:'window'}],
 doors:{'6,9':['carnavelle',8,6,0],'7,9':['carnavelle',8,6,0],'12,7':['gmag2',12,7,2]},
 acts:Object.fromEntries([...[1,2,3].map(x=>[x+',3',()=>gmShop(0)]),...[10,11,12].map(x=>[x+',3',()=>gmShop(1)]),...[3,4].map(x=>[x+',6',()=>say('Une vitrine de Capsules de toutes les couleurs. La Festi Capsule a même des paillettes.')]),...[9,10].map(x=>[x+',6',()=>say('Une pyramide de Potions. Un panneau : « Ne pas prendre celle du bas. »')])]),
 npcs:[N18(2,2,'vendor',0,'Vendeur des Capsules',null,{fn:()=>gmShop(0)}),N18(11,2,'vendor',0,'Vendeuse des Soins',null,{fn:()=>gmShop(1)}),
  N18(7,4,'kid',2,'Enfant émerveillé','Deux étages de magasin ! Au premier, il y a des disques, des pierres magiques et des trucs à tenir !',{wan:1}),N18(4,8,'granny',1,'Cliente pressée','Je cherche une Pomme d\'Amour pour mon Grosflan. La pâtissière du port en vend… mais il faut faire la queue.')]};
MAPS.gmag2={name:'Grand Magasin · Premier étage',bg:'plaine',amb:'in',style:'shop',mus:'town',rows:["XXXXXXXXXXXXXX","XCCCCCFFCCCCCX","XFFFFFFFFFFFFX","XCCCFFFFFFCCCX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XCCCFFFFFFFFFX","XFFFFFFFFFFFsX","XFFFFFFFFFFFFX","XXXXXXXXXXXXXX"],
 furn:[{x:12,y:7,k:'stairsUp'},{x:1,y:8,k:'plantPot'},{x:12,y:1,k:'vend'}],wdeco:[{x:6,k:'window'},{x:7,k:'window'}],
 doors:{'12,7':['gmag',12,8,2]},
 acts:Object.fromEntries([...[1,2,3].map(x=>[x+',3',()=>gmShop(2)]),...[10,11,12].map(x=>[x+',3',()=>gmShop(3)]),...[1,2,3].map(x=>[x+',6',()=>gmShop(4)])]),
 npcs:[N18(2,2,'vendor',0,'Vendeur des Objets à tenir',null,{fn:()=>gmShop(2)}),N18(11,2,'vendor',0,'Vendeuse des Disques',null,{fn:()=>gmShop(3)}),N18(2,5,'vendor',0,'Vendeur des Pierres',null,{fn:()=>gmShop(4)}),
  N18(8,5,'scout',3,'Collectionneur','Il me manque un seul Disque Cycle. Le DC qui enseigne Cauchemar… On dit qu\'il est caché quelque part dans le Marais.')]};
MAPS.atelier={name:'Atelier Mirella',bg:'plaine',amb:'in',style:'home',mus:'town',rows:["XXXXXXXXXX","XCCFFFFCCX","XFFFFFFFFX","XFCCCCFFFX","XFFFFFFFFX","XFFFFFFFFX","XFFFFFFFFX","XXXXEXXXXX"],
 furn:[{x:1,y:1,k:'dresser'},{x:2,y:1,k:'shelf1'},{x:7,y:1,k:'shelf3'},{x:8,y:1,k:'plantPot'},{x:7,y:5,k:'coat'},{x:1,y:5,k:'coat'}],wdeco:[{x:4,k:'window'},{x:5,k:'frameA',y:1}],
 doors:{'4,7':['carnavelle',11,14,0]},acts:{'2,3':()=>mirellaTalk(),'3,3':()=>mirellaTalk(),'4,3':()=>mirellaTalk(),'5,3':()=>mirellaTalk(),'7,5':()=>say('Un mannequin habillé en uniforme de la Team Éclipse… à moitié cousu. Une étiquette : « Pour le Carnaval. Ou pas. »'),'1,5':()=>say('Un mannequin vêtu d\'une tenue de ninja. Très discret. Tu ne l\'avais même pas remarqué.')},
 npcs:[N18(7,3,'mirella',0,'Mirella',null,{fn:()=>mirellaTalk()})]};
MAPS.carnH1={name:'Maison de Maître Kaito',bg:'plaine',amb:'in',style:'home',mus:'town',rows:["XXXXXXXXX","XCCFFFCCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf2'},{x:2,y:1,k:'plantPot'},{x:6,y:1,k:'shelf0'},{x:7,y:1,k:'potPlant'}],wdeco:[{x:4,k:'window'}],doors:{'4,6':['carnavelle',22,14,0]},
 npcs:[N18(4,2,'ninja',2,'Maître Kaito',null,{fn:()=>kaitoTalk()})]};
MAPS.commiss={name:'Commissariat de Carnavelle',bg:'plaine',amb:'in',style:'lab',mus:'town',rows:["XXXXXXXXXX","XCCCFFCCCX","XFFFFFFFFX","XFFCCCCFFX","XFFFFFFFFX","XFFFFFFFFX","XFFFFFFFFX","XXXXEXXXXX"],
 furn:[{x:3,y:3,w:2,h:1,k:'bigTable'},{x:5,y:3,k:'pc'},{x:6,y:3,k:'oldPc'}],doors:{'4,7':['carnavelle',19,22,0]},
 npcs:[N18(4,2,'sailor',2,'Commissaire Barnabé',null,{fn:()=>barnabeTalk()}),N18(7,5,'sailor',3,'Agent Pépin',()=>f().v18faus?'Le patron dit que tu as fait le travail de tout le commissariat. Moi, je dis que c\'était facile. Mais je ne l\'ai pas fait.':'On recherche un voleur masqué. Au Carnaval. Où tout le monde est masqué. Bonne chance à nous.')]};
MAPS.theatre={name:'Théâtre des Lumières',bg:'plaine',amb:'in',style:'cit',mus:'town',rows:["XXXXXXXXXXXXXXXX","XFFFFFFFFFFFFFhX","XFFFFFFFFFFFFFFX","XCCCCCCFFCCCCCCX","XFFFFFFFFFFFFFFX","XFCCCCFrrFCCCCFX","XFFFFFFrrFFFFFFX","XFCCCCFrrFCCCCFX","XFFFFFFrrFFFFFFX","XFCCCCFrrFCCCCFX","XFFFFFFrrFFFFFFX","XXXXXXXEEXXXXXXX"],
 furn:[{x:1,y:1,k:'plantPot'},{x:13,y:1,k:'crates'},{x:2,y:5,k:'sofaL'},{x:3,y:5,k:'sofaM'},{x:4,y:5,k:'sofaM'},{x:5,y:5,k:'sofaR'},{x:10,y:5,k:'sofaL'},{x:11,y:5,k:'sofaM'},{x:12,y:5,k:'sofaM'},{x:13,y:5,k:'sofaR'},{x:2,y:7,k:'sofaL'},{x:3,y:7,k:'sofaM'},{x:4,y:7,k:'sofaM'},{x:5,y:7,k:'sofaR'},{x:10,y:7,k:'sofaL'},{x:11,y:7,k:'sofaM'},{x:12,y:7,k:'sofaM'},{x:13,y:7,k:'sofaR'},{x:2,y:9,k:'sofaL'},{x:3,y:9,k:'sofaM'},{x:4,y:9,k:'sofaM'},{x:5,y:9,k:'sofaR'},{x:10,y:9,k:'sofaL'},{x:11,y:9,k:'sofaM'},{x:12,y:9,k:'sofaM'},{x:13,y:9,k:'sofaR'}],
 doors:{'7,11':['carnaval',15,7,0],'8,11':['carnaval',15,7,0],'14,1':()=>trapDoor()},
 npcs:[N18(14,2,'grunt',1,'Machiniste louche',null,{fn:()=>trapGuard(),cond:()=>!f().v18trappe}),N18(7,1,'maestro',0,'Maestro Fabrizio',null,{fn:()=>maestroTalk()}),
  {x:3,y:2,t:'mon',sp:'draplin',d:0,cond:()=>night()&&!f().v18drap,fn:n=>theatreGhost(n)},
  N18(12,8,'girl',1,'Spectatrice','Chut ! La répétition va commencer ! … Ah non, c\'est fini. Ou c\'était l\'entracte ?',{wan:1})]};
MAPS.repaire={name:'Repaire de la Mascarade',bg:'grotte',amb:'tech',mus:'base',rows:["XXXXXXXXXEEXXXXXXXXX","XCCCFFFFFFFFFFFFCCCX","XFFFFFFFFFFFFFFFFFFX","XFFXXXXXXFFXXXXXXFFX","XFFXFFFFXFFXFFFFXFFX","XFFXFFFFXFFXFFFFXFFX","XFFXXFXXXFFXXXFXXFFX","XFFFFFFFFFFFFFFFFFFX","XFFFFFFFFFFFFFFFFFFX","XCCFFFFFFFFFFFFFFCCX","XFFFFFFFFFFFFFFFFFFX","XFFFFFFFFFFFFFFFFFFX","XFFFFFFFsFFFFFFFFFFX","XXXXXXXXXXXXXXXXXXXX"],
 furn:[{x:8,y:12,k:'stairsUp'}],cstyle:'tech',
 doors:{'8,12':['theatre',14,2,0],'9,0':()=>officeDoor(),'10,0':()=>officeDoor()},
 acts:{'1,9':()=>say('Un ordinateur allumé. Sur l\'écran : « OPÉRATION MASCARADE — Étape 1 : voler la clé. Étape 2 : danser. »'),'2,9':()=>say('Des piles de costumes de sbires, tous parfaitement repassés. Faustine est très exigeante.'),'17,9':()=>say('Un schéma du téléphérique de Volterre. Quelqu\'un a entouré la cabine de commande au feutre rouge.'),'18,9':()=>say('Une caisse de masques. Une étiquette : « Pour les invités du Grand Bal ». Ils prévoient quelque chose…')},
 npcs:[T18(4,8,'grunt',1,'rpa','Sbire Éclipse',[['protomk',35],['ecrouvis',34]],1600,'Hé ! T\'es pas de chez nous, toi ! Attrape-le !','Faustine va me faire repasser des costumes pendant une semaine…','Faustine dit que la clé ne doit jamais quitter son bureau.',{disg:1,dgsay:'Salut, collègue ! T\'as vu ? Faustine a encore changé le code de la porte du bureau. Je ne m\'en souviens jamais.'}),
  T18(15,8,'grunt',2,'rpb','Sbire Éclipse',[['hyenombre',35],['chromoeil',34]],1600,'Un intrus ! Au Repaire ! Combat !','Je n\'aurais pas dû quitter mon poste…','La patronne garde la clé dans son bureau, au nord. Et seul le bon code ouvre la porte.',{disg:1,dgsay:'Le code du jour ? Pff… Demande à Gaston, dans la salle de gauche. Lui, il le note sur sa main.'}),
  T18(10,10,'grunt',1,'rpc','Sbire Éclipse',[['alphamk',36],['possedrap',35]],1700,'Halte ! Montre ton badge ! … T\'as pas de badge ? Combat !','Mes robots ne m\'ont pas protégé…','Les robots Kernélec voient à travers les déguisements. Heureusement, ils sont en panne depuis mardi.',{disg:1,dgsay:'Encore une ronde… Cette mascarade, c\'est épuisant. Vivement que Vex finisse son truc à l\'Observatoire.'}),
  N18(5,4,'grunt',0,'Sbire Gaston',null,{fn:()=>gastonRep()}),N18(14,4,'assistant',0,'Ingénieure Clara',null,{fn:()=>claraTalk(),cond:()=>!f().v18clara}),
  {x:9,y:1,t:'mon',sp:'kernelec',d:0,cond:()=>!f().v18code,fn:()=>robotTalk()},I(13,5,'hyperpotion',2,'rpb1'),I(6,5,'dc_courtcircuit',1,'rpb2')]};
MAPS.repaire2={name:'Bureau de Faustine',bg:'grotte',amb:'tech',mus:'base',rows:["XXXXXXXXXXXXXX","XCCCCFFFFCCCCX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XFFCCFFFFCCFFX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XFFFFFFFFFFFFX","XXXXXXEEXXXXXX"],
 furn:[{x:1,y:1,k:'machine'},{x:12,y:1,k:'machine2'}],cstyle:'tech',
 doors:{'6,9':['repaire',9,1,0],'7,9':['repaire',10,1,0]},
 acts:{'3,4':()=>say('Des croquis de costumes. Le dernier : « Robe du Grand Bal — pour la nuit où Vex éteindra le soleil pour de bon ». Brr.'),'4,4':()=>say('Une machine à coudre de luxe. Elle est encore chaude.'),'9,4':()=>say('Un mannequin portant un masque d\'or. Il te fixe.'),'10,4':()=>say('Une lettre de Vex : « Faustine, tiens Volterre loin de l\'Observatoire. Personne ne doit monter. Personne. »')},
 npcs:[N18(6,2,'faustine',0,'Faustine',null,{fn:n=>faustineFight(n),cond:()=>!f().v18faus})]};
MAPS.gym5={name:'Arène des Masques',bg:'plaine',amb:'in',style:'cit',mus:'gym',rows:["XXXXXXXXXXXX","XFFFFFFFFFFX","XFFFFFFFFFFX","XFFFFFFFFFFX","XCCFFFFFFCCX","XFFFFFFFFFFX","XFFrrrrrrFFX","XFFrFFFFrFFX","XFFrrrrrrFFX","XFFFFFFFFFFX","XXXXXEEXXXXX"],
 doors:{'5,10':['carnaval',22,14,0],'6,10':['carnaval',22,14,0]},
 npcs:[{x:2,y:2,t:'arlequin',d:0,name:'Arlequin ?',cond:()=>!f().v18fk0&&!f().badge5,fn:n=>fakeArlequin(n,0)},{x:9,y:2,t:'arlequin',d:0,name:'Arlequin ?',cond:()=>!f().v18fk1&&!f().badge5,fn:n=>fakeArlequin(n,1)},
  {x:5,y:1,t:'arlequin',d:0,name:'Arlequin',tr:TR('arlequin','Champion Arlequin',[['possedrap',35,['mascarade','hypnose','cauchemar','mauvaissort']],['chatoeil',35,['mirage','griffe','oracle','viveatk'],'baiesoin'],['prophetoise',36,['oracle','coupsoleil','mirage','soin']],['masquetotem',37,['mascarade','masquesolaire','mirage','prisme'],'baiesoin']],5200,
   'Bienvenue dans mon arène ! Tu as trouvé le vrai Arlequin parmi les reflets… Mais sauras-tu voir à travers mes illusions ?','Bravo ! Tu as vu ce que personne ne voit. Voici le BADGE MASQUE !',
   {vs:1,boss:1,items:2,ev:1,post:()=>f().v18unif?'Mirella m\'a raconté ton infiltration. Un vrai numéro d\'illusionniste ! Reviens quand tu veux une revanche.':'Mirella t\'attend à son atelier. Je lui ai dit que tu méritais son plus beau costume… même s\'il est noir et un peu sinistre.',
    win:async()=>{f().badge5=1;await badgeGet('BADGE MASQUE',ICO.bMas);give('dc_mascarade');await say('Arlequin te remet aussi le DC Mascarade ! Une attaque OMBRE qui frappe là où l\'adversaire ne l\'attend pas.');await arlequinAfter()}}),los:0,cond:()=>f().v18fk0&&f().v18fk1||f().badge5,fn:n=>leaderTalk(n,'arlequin')},
  T18(2,5,'danseuse',1,'g5a','Illusionniste Anaïs',[['draplin',34],['flanlou',34],['chatoeil',35]],1600,'Un, deux, trois… disparu ! Ah non, je suis encore là. Combat !','Mon tour de magie a raté…','Arlequin cache son vrai visage parmi trois reflets. Les faux t\'attaquent quand tu les démasques.'),
  T18(9,5,'dgmasque',3,'g5b','Mime Pierrot',[['possedrap',35],['tortune',34]],1600,'…','… (il mime une défaite très dramatique)','… (il te montre les deux Arlequins des côtés, puis hausse les épaules)')]};
MAPS.tente={name:'Tente de Madame Prophétie',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCFFFFFCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'potPlant'},{x:7,y:1,k:'lampFloor'}],doors:{'4,6':['carnaval',9,16,0]},
 npcs:[N18(4,2,'berenice',0,'Madame Prophétie',null,{fn:()=>fortuneTalk()}),{x:6,y:2,t:'mon',sp:'prophetoise',d:3,fn:()=>say('La Prophétoise de Madame Prophétie te regarde fixement. Elle hoche la tête, comme si elle savait déjà tout.')}]};
MAPS.bazar={name:'Bazar des Dunes',bg:'plaine',amb:'in',style:'bazar',mus:'desert',rows:["XXXXXXXXXX","XCCCFFCCCX","XFFFFFFFFX","XCCCCFFFFX","XFFFFFFFFX","XFFFFFFFFX","XFFFFFFFFX","XXXXEXXXXX"],
 furn:[{x:6,y:1,k:'barrel'},{x:7,y:1,k:'crates'},{x:8,y:5,k:'barrel'}],doors:{'4,7':['oasis',5,5,0]},acts:{'1,3':()=>bazarShop(),'2,3':()=>bazarShop(),'3,3':()=>bazarShop(),'4,3':()=>bazarShop()},
 npcs:[N18(2,2,'nomade2',0,'Marchande Zahra',null,{fn:()=>bazarShop()})]};
MAPS.oasisH={name:'Maison d\'Amina',bg:'plaine',amb:'in',style:'bazar',mus:'desert',rows:["XXXXXXXXX","XCCFFFCCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf2'},{x:2,y:1,k:'vase'},{x:6,y:1,k:'potPlant'},{x:7,y:1,k:'barrel'}],doors:{'4,6':['oasis',17,5,0]},
 npcs:[N18(4,2,'nomade2',0,'Sage Amina',null,{fn:()=>aminaTalk()})]};
MAPS.cabaneB={name:'Cabane de Bérénice',bg:'foret',amb:'in',style:'home',dark:1,mus:'foret',rows:["XXXXXXXXX","XCCFFFCCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf3'},{x:2,y:1,k:'potPlant'},{x:6,y:1,k:'kitchen'},{x:7,y:1,k:'barrel'}],doors:{'4,6':['marais',5,5,0]},
 npcs:[N18(4,2,'berenice',0,'Sorcière Bérénice',null,{fn:()=>berenTalk()}),{x:2,y:4,t:'mon',sp:'vaudoronce',d:0,fn:()=>say('Une grande Vaudoronce monte la garde. Elle te regarde, puis regarde ton porte-monnaie.')}]};
MAPS.paillote={name:'Paillote du Lagon',bg:'lac',amb:'in',style:'bazar',mus:'route',rows:["XXXXXXXXX","XCCCFFCCX","XFFFFFFFX","XCCCFFFFX","XFFFFFFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:6,y:1,k:'barrel'},{x:7,y:1,k:'plantPot'}],doors:{'4,6':['corail',21,13,0]},acts:{'1,3':()=>paillShop(),'2,3':()=>paillShop(),'3,3':()=>paillShop()},
 npcs:[N18(2,2,'patissiere',0,'Gérante Nalani',null,{fn:()=>paillShop()}),N18(6,4,'sailor',3,'Plongeur','Au large de l\'île, il y a des Squalame. Ne pêche pas trop près des récifs avec une petite canne : tu perdrais ta ligne… et ta dignité.')]};
for(const k of['carnaval','gmag','gmag2','atelier','carnH1','commiss','theatre','gym5','tente','repaire','repaire2'])RPAR[k]='carnavelle';
Object.assign(RPAR,{oasis:'dunes',bazar:'dunes',oasisH:'dunes',tombeau:'dunes',tombeau2:'dunes',cabaneB:'marais',paillote:'corail'});
