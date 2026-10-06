// =====================================================================
// EXTENSION 10.0 — Le monde s'agrandit : Lac Opalin, Bois Sépulcral, Galeries Oubliées, Récif des Marées,
// Temple des Fondateurs, Pic Céleste. Huit stèles racontent l'origine du Cycle et ouvrent le Temple.
// =====================================================================
BLD.lac={R:'bHouse3'};BLD.recif={R:'bHouse3'};
const biomeOf0=biomeOf;biomeOf=M=>M.biome||biomeOf0(M);
const OB10=(x,y,k,fn,o={})=>({x,y,t:'obj',k,fn,...o});
// --- Stèles des Fondateurs : l'histoire du Cycle, en huit fragments à travers Aurélys
const STELES=[
 ['lac',10,6,'Avant les hommes, le ciel n\'avait pas d\'heure. Une seule lumière, ni jour ni nuit, flottait sur Aurélys : Aurorelle, la première aube.'],
 ['bois',4,3,'Aurorelle se fendit en deux pour que le monde puisse enfin dormir. De sa moitié chaude naquit Solarion ; de sa moitié froide, Nocturion.'],
 ['galeries',19,1,'Les deux frères se disputèrent le ciel. De leur querelle naquit une ombre qui n\'appartenait à aucun d\'eux : Éclipsar, le soleil dévoré.'],
 ['recif',4,4,'Les fondateurs vinrent de la mer, sept familles sur sept barques. Ils bâtirent un temple sur le récif pour garder l\'ombre endormie.'],
 ['mont',16,15,'Pour sceller Éclipsar, ils forgèrent le Cœur d\'Aube avec la lumière des deux frères, et allumèrent un feu pour chaque phase sur le Pic Céleste.'],
 ['route2',5,10,'Tant que les quatre feux brûlent chacun à son heure, le Cycle tient. Quand l\'un s\'éteint, l\'ombre rêve qu\'elle se réveille.'],
 ['coteaux',2,12,'Le premier gardien du sceau s\'appelait Valen. Le nom passa, de génération en génération, à qui veillait sur le Temple.'],
 ['pic',3,13,'Si l\'ombre s\'éveille un jour, qu\'on ne la combatte pas seulement : qu\'on lui offre les deux larmes, et qu\'on lui rappelle qu\'elle aussi fait partie du Cycle.']];
const nStele=()=>STELES.filter((s,i)=>f()['st_'+i]).length;
async function readStele(i){const[,,,txt]=STELES[i],nw=!f()['st_'+i];f()['st_'+i]=1;sfx('shard');ui.flash=.25;ui.flashC='#c8e8ff';
 await say(`Une stèle couverte de runes. Elles s'illuminent sous tes doigts… (Stèle ${i+1}/8)`);await say(txt);
 if(nw){const n=nStele();await say(`Tu recopies le texte dans ton journal. Stèles déchiffrées : ${n}/8.`);if(n===1)tip('stele','Les Stèles des Fondateurs racontent l\'origine du Cycle. Huit sont dispersées dans Aurélys, et quelque chose semble les attendre sur le Récif des Marées.');
  if(n===8){await say('Les huit fragments forment un tout. Tu sens comme un appel, venu de la mer, au sud de Port-Miroir…');}rep('cher',2);save()}}
const steleN=(i)=>{const[m,x,y]=STELES[i];return OB10(x,y,'stele',()=>readStele(i),{sid:i})};
STELES.forEach((s,i)=>{if(!['lac','bois','galeries','recif','pic'].includes(s[0]))MAPS[s[0]].npcs.push(steleN(i))});

// ---------------------------------------------------------------- LAC OPALIN (à l'est de la Forêt Murmure)
MAPS.foret.rows0=null;MAPS.foret.rows[8]=MAPS.foret.rows[8].slice(0,26)+'==';MAPS.foret.rows[9]=MAPS.foret.rows[9].slice(0,26)+'==';MAPS.foret.edges.e=['lac',-1];
MAPS.foret.npcs.push({x:25,y:8,t:'camper',d:2,name:'Campeur',cond:()=>!f().badge2,say:'Le sentier de l\'est mène au Lac Opalin. Les créatures y sont coriaces : reviens avec deux badges !'});
MAPS.lac={name:'Lac Opalin',bg:'lac',amb:'day',mus:'route',edges:{w:['foret',1]},
 rows:["TTTTTTTTTTTT^^^^^^TTTTTTTTTTTT",
       "TT,,,,,..TT^^~~~~^^TT.RRRRR.TT",
       "TT,,,,,...T^~~~~~~^...RRRRR.TT",
       "TT.......~~~~~~~~~~...WnWDW.TT",
       "TT....~~~~~~~~~~~~~~....=...TT",
       "TT...~~~~,,,,~~~~~~~~...=...TT",
       "TT...~~~~,.,,~~~~~~~~...=...TT",
       "==...HHHH,,,,~~~~~~~HHHHH...TT",
       "==....~~~~~~~~~~~~~~....=,,,TT",
       "TT,,,..~~~~~~~~~~~~.....=,,,TT",
       "TT,,,,,..~~~~~~~~....,,,=,,,TT",
       "TT,,,,,,.........,,,,,,,=,,,TT",
       "TT,,,,..TTT...f..,,,,,,,=,,,TT",
       "TT......TTT.......o....S=...TT",
       "TT,,,,,,,.....,,,,,.....=b..TT",
       "TT,,,,,,,..f..,,,,,.....=b..TT",
       "TT,,,,......,,,,,.......=b..TT",
       "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"],
 enc:[['navounet',22,25,16,'j'],['brisillon',22,25,14],['rosarine',22,25,12,'j'],['pipistrel',22,25,14,'n'],['axoluce',23,26,10],['serpillou',22,25,12],['cherubat',24,27,4,'n'],['oeillombre',24,26,18,'e'],['nounoursol',25,27,3,'j']],
 fish:[['axoluce',20,26,40],['miroitruite',20,25,30],['guppyre',20,24,30]],fish2:[['guppyre',26,30,40],['gupflamme',30,34,12],['axoluce',26,30,30],['medulune',32,36,18,'s']],
 signs:{'23,13':'LAC OPALIN\nOuest : Forêt Murmure. "Ne pêchez pas les nuits d\'étoiles filantes… sauf si vous voulez voir une méduse de lumière."'},
 hidden:[{x:27,y:15,it:'pierreaube',q:1,id:'lac1'},{x:2,y:12,it:'pepite',q:1,id:'lac2'},{x:11,y:5,it:'perle',q:1,id:'lac3'}],
 doors:{'25,3':['lacH',4,5,1]},
 npcs:[I(3,1,'filetcapsule',3,'lacb1'),I(18,16,'superpotion',3,'lacb2'),BT(14,14,'lac','baieprisme'),steleN(0),
  {x:21,y:7,t:'fisher',d:2,tr:TR('lacp1','Pêcheur Armand',[['miroitruite',24],['axoluce',25],['crapaflot',25]],900,'Chut ! Tu fais fuir les poissons… Bon, puisque tu es là, combat !','Ils mordaient bien, pourtant…',{post:tod('Les Guppyre aiment l\'eau tiède des cascades. Avec une Super Canne, on en sort parfois un gros.','La nuit, le lac luit. Ce sont les Axoluce, au fond.','L\'éclipse a fait remonter des choses étranges du fond du lac.','Une nuit d\'étoiles filantes, j\'ai vu une méduse de lumière. Personne ne me croit.')})},
  {x:4,y:10,t:'girl',d:3,tr:TR('lacp2','Nageuse Coralie',[['dauphinou',24],['tetardin',24],['guppyre',26]],850,'Un plongeon, puis un combat ! C\'est mon échauffement.','Je retourne nager…',{post:'Sur l\'îlot, il y a une vieille pierre gravée. Je n\'ose pas la toucher.'})},
  {x:15,y:12,t:'botanist',d:0,tr:TR('lacp3','Botaniste Lilas',[['rosarine',25],['navounet',25],['pissenlou',26]],850,'Ne piétine pas mes Rosarine !','Elles ont adoré le combat, finalement.',{post:'Une Rosarine devient Toxiris, et une Toxiris qui maîtrise la Lame-Feuille devient… je garde la surprise.'})},
  {x:19,y:13,t:'old',d:2,name:'Vieil ermite',say:tod('Les Vivipère prennent la forme du lieu où ils grandissent. Ici, au lac, ils deviennent eau.','La nuit, j\'entends chanter sous l\'eau. C\'est peut-être ma vieille oreille.','L\'éclipse… Les anciens disaient qu\'un temple, sur la mer, retenait cette ombre.','Le lac n\'a jamais été aussi clair. Le Cycle va bien.')}]};
MAPS.lacH={name:'Cabane d\'Ondine',bg:'lac',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCCFFFCFX","XFFFFFFFX","XFFFCCFFX","XFFFCCFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf2'},{x:2,y:1,k:'plantPot'},{x:6,y:1,k:'kitchen'},{x:4,y:3,w:2,h:2,k:'bigTable'}],wdeco:[{x:4,k:'window'}],doors:{'4,6':['lac',25,4,0]},
 acts:{'1,1':()=>say('Des carnets de pêche, classés par saison. Le dernier s\'intitule : "Le poisson qui remonte les cascades."'),'2,1':()=>say('Une plante aquatique dans un bocal. Elle se tourne vers toi.')},
 npcs:[{x:6,y:4,t:'girl',d:2,name:'Ondine',fn:()=>ondineTalk()}]};

// ---------------------------------------------------------------- BOIS SÉPULCRAL (à l'ouest de Lunévie, la nuit seulement)
MAPS.lunevie.rows0=null;MAPS.lunevie.rows[7]='=='+MAPS.lunevie.rows[7].slice(2);MAPS.lunevie.rows[8]='=='+MAPS.lunevie.rows[8].slice(2);MAPS.lunevie.edges.w=['bois',0];
MAPS.bois={name:'Bois Sépulcral',bg:'foret',amb:'foret',mus:'ruines',biome:'forest',edges:{e:['lunevie',0]},
 rows:["TTTTTTTTTTTTTTTTTTTTTTTT",
       "TT,,,,TT....TTTTT,,,,,TT",
       "TT,,,,TT.C..TTTTT,,,,,TT",
       "TT....TT.,..........,,TT",
       "TT.,..........TTT.....TT",
       "TTT.TTTT,,,,..TTT..TTTTT",
       "TTT.TTTT,,,,.......TTTTT",
       "TT....,,,,,,,,,.........",
       "TT.TT.,,,,TTTT,,,.......",
       "TT.TT.....TTTT,,,..TT.TT",
       "TT,,,,,...........,,,.TT",
       "TT,,,,,..TTTTT..,,,,,.TT",
       "TT,,,....TT^TT.....,,.TT",
       "TT..o....TT.TT..f.....TT",
       "TT,,,,,...........,,,,TT",
       "TTTTTTTTTTTTTTTTTTTTTTTT"],
 enc:[['feuilezard',27,31,14,'j'],['navounet',27,30,12,'j'],['serpillou',27,30,10,'j'],['pousslin',28,32,16,'n'],['potagheist',28,32,12,'n'],['cherubat',29,32,8,'n'],['pipistrel',27,31,14,'n'],['ricanoir',28,31,8,'n'],['spectronce',31,34,3,'n'],['oeillombre',29,32,20,'e']],
 signs:{'9,2':'STÈLE BRISÉE\n"Ici reposent ceux qui ont veillé le Cycle. Allumez les lanternes dans l\'ordre du jour : l\'aube à l\'est, le jour au nord, le crépuscule à l\'ouest, la nuit au sud."'},
 hidden:[{x:2,y:1,it:'dc_griffeombre',q:1,id:'bois1'},{x:21,y:1,it:'superrepousse',q:2,id:'bois2'},{x:4,y:13,it:'encensnoir',q:1,id:'bois3'}],
 doors:{'11,12':async()=>{if(!f().bLant)return say('Une petite crypte scellée par une grille rouillée. Les lanternes alentour sont éteintes.');await warp('crypte',4,6,1)}},
 npcs:[steleN(1),
  {x:22,y:7,t:'old',d:2,name:'Gardien du bois',cond:()=>!night()&&!ecl(),say:'Le Bois Sépulcral dort le jour. Les morts aussi ont droit au repos. Reviens à la nuit tombée.'},
  OB10(16,9,'lantern',()=>lantern(0),{lid:0}),OB10(13,3,'lantern',()=>lantern(1),{lid:1}),OB10(3,7,'lantern',()=>lantern(2),{lid:2}),OB10(12,14,'lantern',()=>lantern(3),{lid:3}),
  {x:8,y:10,t:'girl',d:0,name:'Jeune fille pâle',cond:()=>night()&&!f().ghostDone,fn:()=>ghostTalk()},
  {x:17,y:4,t:'caver',d:2,tr:TR('boisp1','Mystique Morgane',[['potagheist',30],['ricanoir',30],['pousslin',31]],1100,'Les esprits m\'ont dit que tu viendrais…','Ils ne m\'avaient pas dit que tu gagnerais.',{post:'Les Pousslin marchent la nuit. Si l\'un d\'eux grandit près d\'une tombe, il devient Spectronce.'})},
  {x:19,y:10,t:'scout',d:2,tr:TR('boisp2','Scout Hugo',[['feuilezard',30],['gecktile',31],['pipistrel',30]],1000,'Je campe ici pour prouver que je n\'ai pas peur !','J\'ai… pas peur. Du tout.',{post:'Il paraît qu\'un Vivipère qui grandit ici devient plante. Moi, je ne grandis pas ici. Trop peur.'})},
  I(21,13,'sombrecapsule',3,'boisb1'),I(2,10,'hyperpotion',2,'boisb2'),BT(6,14,'bois','baiesoin')]};
MAPS.crypte={name:'Crypte des Veilleurs',bg:'grotte',amb:'cave',mus:'ruines',cave:true,biome:'ruins',rows:["^^^^^^^^^","^C..g..C^","^.......^","^..g.g..^","^.......^","^C.....C^","^^^^E^^^^"],
 doors:{'4,6':['bois',11,13,0]},
 npcs:[OB10(4,2,'chest',async n=>{if(f().cryC)return say('Le coffre est vide.');f().cryC=1;give('talisman');await say('Dans un coffre de pierre : le TALISMAN DU CYCLE ! Un médaillon gravé des quatre phases.');save()}),
  {x:2,y:3,t:'mon',sp:'wendigrave',d:0,cond:()=>!f().wendC,fn:async n=>{await cine(1);await emote(n,'!',600);sfx('roar');ui.shake=8;await say('Un Wendigrave immense garde la crypte ! Ses bois raclent le plafond.');await cine(0);const r=await battle([mon('wendigrave',38,{item:'miettes'})],{legend:1});if(r==='win'||r==='catch'){f().wendC=1;await say(r==='catch'?'Le gardien de la crypte rejoint ton équipe.':'Le gardien s\'efface dans l\'ombre.')}}}]};
async function lantern(i){const L=f().bLantL||[];if(f().bLant)return say('La lanterne brûle d\'une flamme bleue et calme.');if(!night()&&!ecl())return say('Une lanterne éteinte. La mèche est humide : elle ne prendra pas avant la nuit.');
 const order=[0,1,2,3];if(L.includes(i))return say('Cette lanterne est déjà allumée.');L.push(i);f().bLantL=L;sfx('shard');
 if(L.some((v,k)=>v!==order[k])){f().bLantL=[];sfx('back');ui.flash=.4;ui.flashC='#3a2a5a';return say('La flamme vacille et toutes les lanternes s\'éteignent d\'un coup… Ce n\'était pas le bon ordre. (L\'épitaphe, près de l\'entrée nord, donne l\'ordre.)')}
 await say(['La lanterne de l\'est s\'allume : une flamme rose, comme l\'aube.','La lanterne du nord s\'allume : une flamme dorée, comme le jour.','La lanterne de l\'ouest s\'allume : une flamme orangée, comme le crépuscule.','La lanterne du sud s\'allume : une flamme bleue, comme la nuit.'][i]);
 if(L.length===4){f().bLant=1;sfx('roar');ui.shake=6;rays(11,12,'#8ab8ff',1800);await say('Les quatre flammes se répondent. Au sud, la grille de la crypte grince et s\'ouvre…');rep('lunevie',2);save()}}
async function ghostTalk(){const P='Jeune fille pâle',q=f().ghostQ||0;
 if(q===0){f().ghostQ=1;await say('Tu me vois ? Personne ne me voit, d\'habitude… Je m\'appelle Élise. Je cherche mon médaillon. Je l\'ai perdu près de l\'eau, il y a longtemps. Très longtemps.',P,0,'girl');return say('Un lac, je crois. Avec une petite île au milieu. J\'y allais avec… je ne me souviens plus avec qui.',P,0,'girl')}
 if(q===1&&!G.bag.medaillon)return say('Mon médaillon… Près d\'un lac, avec une île… Il brillait sous la lune.',P,0,'girl');
 if(q===1){delete G.bag.medaillon;f().ghostQ=2;await say('Mon médaillon ! Il y a le portrait de… de Ysolde. Ma petite sœur. Elle m\'attendait à Lunévie, le soir où je ne suis pas rentrée.',P,0,'girl');
  await say('Va lui dire que je ne suis pas partie fâchée. Dis-lui que je regardais les étoiles, comme elle. Garde le médaillon pour moi… et donne-le-lui.',P,0,'girl');G.keys.medE=1;return save()}
 return say('Ysolde a reçu le médaillon ? … Alors je peux m\'endormir. Merci.',P,0,'girl')}
IT.medaillon=['Médaillon terni',0,'Un médaillon d\'argent couvert de vase. À l\'intérieur, un portrait effacé.',0,'quest'];ICO.medaillon=icon(SHARDP,{y:'#d8d8e8',Y:'#7a7a8a'});
MAPS.lac.npcs.push({x:11,y:6,t:'ball',cond:()=>f().ghostQ===1&&!G.bag.medaillon&&!f().medFound&&night(),fn:async()=>{f().medFound=1;G.bag.medaillon=1;jingle('item');await say('Coincé entre deux pierres, sous la stèle : un médaillon d\'argent qui brille sous la lune !');save()}});
{const Y0=ysoldeTalk;ysoldeTalk=async function(){const YN='Grand-mère Ysolde';if(G.keys.medE&&!f().ghostDone){f().ghostDone=1;delete G.keys.medE;await say('Ce médaillon… C\'est celui d\'Élise ! Ma grande sœur. Elle est partie au Bois Sépulcral un soir d\'étoiles, et on ne l\'a jamais retrouvée.',YN,0,'ysolde');
  await say('Elle n\'était pas fâchée… Elle regardait les étoiles… Soixante-dix ans que j\'attendais de l\'entendre. Merci, petit. Merci.',YN,0,'ysolde');give('pierresoleil');give('biscuit',5);await say('Ysolde te donne une Pierre Soleil et 5 Biscuits d\'Aube : "Élise les adorait."');rep('lunevie',4);return save()}return Y0()};
 for(const n of MAPS.maisonY.npcs)if(n.fn===Y0)n.fn=ysoldeTalk}

// ---------------------------------------------------------------- GALERIES OUBLIÉES (sous les Coteaux d'Aurore)
MAPS.coteaux.doors['17,11']=async()=>{if(!f().badge3)return say('Une vieille entrée de mine, condamnée par des planches : "GALERIES — DANGER". Un mineur de Lunévie saura peut-être l\'ouvrir… après le badge de l\'Arène Crépuscule.');await warp('galeries',2,14,1)};
MAPS.galeries={name:'Galeries Oubliées',bg:'grotte',amb:'cave',mus:'mont',cave:true,encAll:true,
 rows:["^^^^^^^^^^^^^^^^^^^^^^^^^^","^ggggg^^^^^^ggggggggg^^^^^","^ggggg^^^^^^ggggggggg^^^^^","^ggggg^^^^^^^^^^g^^^^^^^^^","^^h^^^^^^^^^^^^^g^^^^^^^^^","^gggggg^^^ggggggggg^^^^^^^","^gvvggg^^^gvvvggggg^^^^^^^","^gvvggg^^^gvvvggggg^^^^^^^",
       "^gggggg^^^ggggggggg^^^^^^^","^^^^g^^^^^^^^^g^^^^^ggggg^","^^^^gggggggg^^g^^^^^ggggg^","^^^^gvvvvvvv^^g^^^^^ggggg^","^gg^g^^^^^^^^^g^^^^^ggggg^","^gg^g^^^^^^^^^g^^^^^ggggg^","^gggggggggggkgggggggggggg^","^^E^^^^^^^^^^^^^^^^^^^^^^^"],
 enc:[['pierrouche',30,34,18],['pionsable',30,34,16],['rocaton',30,33,12],['grumeroc',31,34,10],['potagheist',30,33,10],['claymoroc',33,36,4],['runocon',33,36,3],['rocaillon',30,33,12]],
 doors:{'2,15':['coteaux',17,12,0]},
 hidden:[{x:1,y:1,it:'fossilefeuille',q:1,id:'gal1'},{x:24,y:9,it:'pepite',q:2,id:'gal2'},{x:18,y:5,it:'dc_seisme',q:1,id:'gal3'},{x:6,y:5,it:'etoilefilante',q:1,id:'gal4'}],
 npcs:[steleN(2),{x:2,y:5,t:'obj',k:'boulder',push:1},{x:12,y:8,t:'obj',k:'boulder',push:1},
  OB10(12,1,'chest',async()=>{if(f().galC)return say('Le coffre est vide.');f().galC=1;give('casque');give('lingot',2);await say('Un coffre de la Team Éclipse ! Dedans : un CASQUE BRUT et 2 Lingots de Volterre.');save()}),
  OB10(4,2,'note',()=>{f().galN1=1;return say('Un carnet de la Team Éclipse, daté de six ans : "Caïus veut forer jusqu\'au cœur des Coteaux. Il dit que l\'ombre dort sous la mer, mais que ses racines passent ici. Vex refuse. Il dit qu\'on ne creuse pas une tombe pour réveiller ce qu\'elle contient."')}),
  OB10(21,9,'note',()=>{f().galN2=1;return say('Un second carnet : "Sélène est venue ce soir. Elle a regardé les runes longtemps, puis elle a dit : \'Si c\'est ça que Caïus cherche, je ne le suivrai pas.\' Le lendemain, Caïus a fait murer la galerie nord."')}),
  {x:10,y:8,t:'miner',d:3,name:'Mineur Gaston',cond:()=>!f().gastonOk,fn:()=>gastonTalk()},
  {x:17,y:6,t:'caver',d:2,tr:TR('galp1','Spéléologue Ninon',[['pierrouche',32],['rocaton',32],['pionsable',33]],1200,'Tu te perds aussi ? Battons-nous en attendant les secours !','Bon, on n\'est pas perdus : j\'ai une carte. À l\'envers.',{post:'Les rochers se poussent. Si l\'un tombe dans une faille, il la comble. Il y en a une, tout à l\'ouest.'})},
  {x:23,y:10,t:'miner',d:0,tr:TR('galp2','Mineur Bastien',[['grumeroc',33],['claymoroc',34],['conglolem',35]],1300,'Ce filon est à moi !','Prends-le, ton filon…',{post:'Les Claymoroc gardent des tombes. Ils n\'obéissent qu\'à ceux qui ont un grand cœur.'})},
  I(24,12,'hypercapsule',2,'galb1'),I(1,12,'elixir',2,'galb2')]};
async function gastonTalk(){const M='Mineur Gaston';if(!f().gastonQ){f().gastonQ=1;await say('Ouf, enfin quelqu\'un ! Je suis Gaston, de Cendreville. Ma lampe s\'est éteinte, je tourne en rond depuis deux jours…',M,0,'miner');}
 if(!await ask('Raccompagner Gaston jusqu\'à la sortie ?'))return say('Ne me laisse pas trop longtemps… Il y a des choses qui ricanent, dans le noir.',M,0,'miner');
 await fadeTo(1,400);f().gastonOk=1;loadMap('coteaux',17,12,0);await fadeTo(0,400);await say('Tu ramènes Gaston à la lumière du jour. Il cligne des yeux, puis éclate de rire.');
 await say('Merci ! Tiens, mon porte-bonheur : une Pierre Chance. Et passe voir ma femme à Cendreville, elle te doit une tarte, maintenant.',M,0,'miner');give('pierrechance');rep('cendre',4);save()}
MAPS.ville.npcs.push({x:15,y:12,t:'granny',d:2,name:'Huguette',fn:async()=>{const H='Huguette';if(!f().gastonOk)return say(f().gastonQ?'Tu as vu mon Gaston ? Dans les Galeries Oubliées ? Ramène-le-moi, je t\'en prie !':'Mon mari Gaston est descendu dans les vieilles galeries, sous les Coteaux… Il n\'est pas remonté.',H,0,'granny');
 if(!f().hugTarte){f().hugTarte=1;give('tartecycle',2);return say('Tu as ramené mon Gaston ! Tiens : deux Tartes du Cycle, ma spécialité. Tes créatures vont t\'adorer.',H,0,'granny')}return say(['Gaston ne descend plus dans les galeries. Il élève des Rocaton, maintenant.','Une autre tarte ? Reviens demain, mon four est tout petit !'][dayN()%2],H,0,'granny')}});

// ---------------------------------------------------------------- RÉCIF DES MARÉES (en bateau depuis Port-Miroir)
MAPS.port.npcs.push({x:13,y:13,t:'sailor',d:0,name:'Passeur Marius',fn:async()=>{const P='Passeur Marius';if(!f().badge2)return say('Mon bateau va au Récif des Marées, au large. Mais la mer est rude : reviens avec le Badge Miroir !',P,0,'sailor');
 if(!await ask('Embarquer pour le Récif des Marées ?',P))return;sfx('splash');await fadeTo(1,500);loadMap('recif',11,15,0);await fadeTo(0,500);if(!f().recifV){f().recifV=1;await say('Le bateau accoste sur un récif de sable blanc. Au loin, au milieu des rochers, une grande porte de pierre émerge des flots.')}}});
MAPS.recif={name:'Récif des Marées',bg:'lac',amb:'day',mus:'route',
 rows:["~~~~~~~~~~~~~~~~~~~~~~~~~~",
       "~~~^^^^^^^^@^^^^^^~~~~~~~~",
       "~~~^.......=.....^~~,,,,~~",
       "~~~^..,,,..=..,,.^~,,,,,,~",
       "~~~^.......=.......,,f,,,~",
       "~~~~~..,,..=..,,,~~,,,,,~~",
       "~~~~~~.....=....~~~~,,~~~~",
       "~~~~~~~~...=...~~~~~~HH~~~",
       "~~,,,~~~~..=..~~~~~~~HH~~~",
       "~,,,,,,HHHH=HHHHHH~~~HH~~~",
       "~,,f,,~~~~~=~~~~~HHHHHH~~~",
       "~~,,,~~~~..=..~~~~~~~~~~~~",
       "~~~~~~~....=..RRRRR..~~~~~",
       "~~~~~~~....=..RRRRR..,~~~~",
       "~~~~~~~....=..WnWDW.,,~~~~",
       "~~~~~~~....=.....=..~~~~~~",
       "~~~~~~~~~~~HH~~~~~~~~~~~~~",
       "~~~~~~~~~~~~~~~~~~~~~~~~~~"],
 enc:[['brisillon',34,37,12],['ventaile',36,39,8],['serpillou',34,37,12],['crapaflot',34,37,10],['cardiflamme',36,39,6,'j'],['strellune',36,39,10,'n'],['pythombre',37,40,16,'e']],
 fish:[['dauphinou',32,36,35],['calmarin',33,37,30],['fretillon',32,36,25,'n'],['miroitruite',32,36,20]],fish2:[['aileronde',38,42,30],['hectapieuvre',38,42,25],['squalame',44,46,5],['requinuit',40,44,20,'n'],['abyssombre',44,47,4]],
 signs:{'11,1':'TEMPLE DES FONDATEURS\n"Que celui qui connaît les huit paroles entre. Les autres, que la mer les ramène."'},
 doors:{'11,1':async()=>{if(nStele()<8)return say(`Une porte de pierre couverte de runes. Huit cercles y sont gravés ; ${nStele()} brillent faiblement. (Stèles des Fondateurs : ${nStele()}/8)`);if(!f().templeO){f().templeO=1;await cine(1);sfx('roar');ui.shake=10;rays(11,1,'#c8e8ff',2200);await say('Les huit cercles s\'illuminent l\'un après l\'autre. La porte du Temple s\'enfonce lentement dans le sable…');await cine(0)}await warp('temple',9,15,1)},
  '17,14':['recifH',4,5,1]},
 hidden:[{x:22,y:2,it:'perle',q:2,id:'rec1'},{x:2,y:10,it:'dc_cascade',q:1,id:'rec2'},{x:5,y:3,it:'etoilefilante',q:1,id:'rec3'}],
 npcs:[steleN(3),{x:11,y:16,t:'sailor',d:1,name:'Passeur Marius',fn:async()=>{if(!await ask('Rentrer à Port-Miroir ?','Passeur Marius'))return;sfx('splash');await fadeTo(1,500);loadMap('port',13,12,0);await fadeTo(0,500)}},
  {x:21,y:4,t:'girl',d:2,name:'Plongeuse Perle',fn:()=>perleTalk()},
  {x:3,y:9,t:'fisher',d:3,tr:TR('recp1','Marin Yvon',[['crapaflot',36],['aileronde',37],['calmarin',37]],1400,'Un étranger sur mon récif ? À l\'abordage !','Coulé…',{post:'Les Squalame gardent le récif. Il faut une Super Canne et beaucoup de patience.'})},
  {x:16,y:3,t:'scout',d:2,tr:TR('recp2','Archéologue Inès',[['relicat',37],['claymoroc',37],['pionsable',38]],1500,'Je fouille ce temple depuis dix ans. Tu n\'y entreras pas avant moi !','Bon… on y entre ensemble ?',{post:()=>nStele()<8?'Huit stèles, dispersées dans toute la région. Une sur l\'îlot du Lac Opalin, une sous les Coteaux, une au Pic… Je n\'ai jamais trouvé les autres.':'Tu as lu les huit stèles ?! Alors la porte… Vas-y. Raconte-moi tout en sortant.'})},
  I(8,4,'megacapsule',2,'recb1'),I(22,7,'maxpotion',1,'recb2'),BT(20,13,'recif','baieprisme')]};
MAPS.recifH={name:'Cabane du Récif',bg:'lac',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCCFFFFCX","XFFFFFFFX","XFFFCCFFX","XFFFCCFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf1'},{x:2,y:1,k:'stool'},{x:7,y:1,k:'plant'},{x:4,y:3,w:2,h:2,k:'bigTable'}],wdeco:[{x:4,k:'window'}],doors:{'4,6':['recif',17,15,0]},
 acts:{'1,1':()=>say('Des cartes marines. Un récif est entouré à l\'encre rouge : "Ici, la mer se retire pendant l\'éclipse."')},
 npcs:[{x:2,y:4,t:'old',d:3,name:'Ermite Corail',fn:()=>corailTalk()},{x:6,y:4,t:'nurse',d:2,name:'Soigneuse Marine',fn:()=>campHeal('Soigneuse Marine','Les créatures arrivent fourbues, après la traversée. Laisse-moi les soigner.')}]};
async function perleTalk(){const P='Plongeuse Perle',n=G.bag.perle||0;if(f().perleOk)return say('Je plonge encore, mais pour le plaisir. Le récif est plus beau que tous les colliers.',P,0,'girl');
 if(n<5)return say(`Je collectionne les Perles des Marées. Il en faudrait cinq pour un collier digne de ma grand-mère… Tu en as ${n}. On en trouve dans le sable, au Lac Opalin et ici.`,P,0,'girl');
 if(!await ask('Donner 5 Perles des Marées à Perle ?'))return;G.bag.perle-=5;f().perleOk=1;give('coquille');give('dc_mareenoire');await say('Merci ! Tiens : une COQUILLE CALME, et ce disque que j\'ai trouvé dans une épave.',P,0,'girl');rep('port',4);save()}
async function corailTalk(){const C2='Ermite Corail';await say(['Les fondateurs sont venus de la mer. Sept barques. Ils ont bâti le Temple ici, parce qu\'ici, la marée se retire quand le soleil s\'éteint.','Il y a deux gardiens dans le Temple. Le premier pose des énigmes. Le second… le second dort, et il vaut mieux qu\'il dorme.','Valen ? Oui, j\'ai connu un Valen. Son grand-père était le dernier gardien du Temple. La famille a quitté le récif quand le gamin avait cinq ans.'][f().corN=((f().corN||0)+1)%3],C2,0,'old');
 if(!f().corGift&&f().templeO){f().corGift=1;give('rapidecapsule',5);await say('Tiens, pour le Temple : 5 Rapide Capsules. Certaines choses, là-dedans, ne se laissent approcher qu\'une seconde.',C2,0,'old')}}

// ---------------------------------------------------------------- TEMPLE DES FONDATEURS : le cadran des phases ouvre les portes
MAPS.temple={name:'Temple des Fondateurs',bg:'grotte',amb:'cave',mus:'ruines',biome:'ruins',cave:true,encAll:true,
 rows:["^^^^^^^^^^^^^^^^^^^",
       "^^^^^^^^^@^^^^^^^^^",
       "^C...^^^.g.^^^...C^",
       "^.ggg.1..g..2.ggg.^",
       "^.g^g.^^.g.^^.g^g.^",
       "^.ggg.^^ggg^^.ggg.^",
       "^.....^^^3^^^.....^",
       "^^^4^^^^.g.^^^^5^^^",
       "^...g...ggggg...g.^",
       "^.g^^^g..g.g..g^^.^",
       "^.g^C^g..ggg..g^C.^",
       "^.g^^^g...g...g^^.^",
       "^.ggggg..ggg..ggg.^",
       "^^^^^^^^.ggg.^^^^^^",
       "^C......ggggg.....^",
       "^.......ggggg....C^",
       "^^^^^^^^^EE^^^^^^^^"],
 sw:{1:()=>tPh()===0?'.':'^',2:()=>tPh()===1?'.':'^',3:()=>tPh()===2?'.':'^',4:()=>tPh()===3?'.':'^',5:()=>tPh()===3?'.':'^'},
 enc:[['potagheist',40,44,14],['amphorombre',42,45,8],['runocon',40,44,12],['cavalsable',40,44,12],['relicat',40,43,10],['claymoroc',41,45,10],['sphinxor',43,46,4,'j'],['anubrume',43,46,4,'n'],['oeillombre',42,45,16,'e']],
 doors:{'9,16':['recif',11,2,0],'10,16':['recif',11,2,0],'9,1':async()=>{if(!f().masqOk)return say('Une porte frappée d\'un masque solaire. Une voix résonne : "Réponds d\'abord au gardien des énigmes."');if(!ecl())return say('La porte du sceau est froide et muette. Elle ne s\'ouvrira que lorsque le soleil sera dévoré. (Le Sablier peut rappeler l\'éclipse.)');await warp('sceau',5,8,1)}},
 signs:{'1,2':'Inscription : "AU CADRAN, ON CHOISIT L\'HEURE. À L\'HEURE, LE TEMPLE CHOISIT SES PORTES."','17,2':'Inscription : "L\'aube ouvre l\'est du jour. Le jour ouvre l\'ouest. Le crépuscule ouvre le cœur. La nuit ouvre les deux ailes du bas."','1,14':'Inscription : "Le gardien des énigmes ne se montre qu\'à qui a lu les deux statues."','17,15':'Inscription : "Huit paroles, deux larmes, quatre feux. Ainsi tient le Cycle."'},
 hidden:[{x:1,y:3,it:'dc_lamecycle',q:1,id:'tem1'},{x:17,y:5,it:'eclatprisme',q:1,id:'tem2'},{x:1,y:8,it:'lunettes',q:1,id:'tem3'},{x:17,y:12,it:'pepite',q:2,id:'tem4'}],
 npcs:[OB10(9,12,'dial',()=>dialTurn()),
  {x:9,y:9,t:'mon',sp:'masquaserp',d:0,cond:()=>f().tStat2&&!f().masqOk,fn:()=>masquaserpScene()},
  OB10(3,10,'statue',async()=>{f().tStatJ=1;f().tStat2=f().tStatJ&&f().tStatN;await say('La statue du jour. Sur le socle : "Je donne sans compter, et pourtant je m\'en vais chaque soir."');if(f().tStat2)await say('Au centre du Temple, quelque chose bouge…')}),
  OB10(15,10,'statue',async()=>{f().tStatN=1;f().tStat2=f().tStatJ&&f().tStatN;await say('La statue de la nuit. Sur le socle : "Je cache tout, et pourtant je montre les étoiles."');if(f().tStat2)await say('Au centre du Temple, quelque chose bouge…')}),
  {x:3,y:14,t:'caver',d:3,tr:TR('temp1','Gardien Kéran',[['amphorombre',43],['runestique',44],['regalance',45]],2500,'Nul ne trouble le Temple. Nul.','Tu as lu les huit paroles… Alors tu as le droit.',{post:'Les portes changent avec le cadran. Tourne-le, puis regarde bien quel mur a disparu.'})},
  I(15,3,'rappelmax',1,'temb1'),I(3,3,'megacapsule',3,'temb2')]};
const tPh=()=>f().tDial||0;
async function dialTurn(){const P=['AUBE','JOUR','CRÉPUSCULE','NUIT'],c=await choose(P.map(p=>'TOURNER VERS : '+p),{w:300,title:'Cadran des phases'});if(c<0)return;f().tDial=c;sfx('roar');ui.shake=6;refreshMap('temple');
 await say(`Le cadran pivote dans un grondement. L'aiguille indique : ${P[c]}. Quelque part, un mur de pierre glisse…`)}
async function masquaserpScene(){const N='Masquaserp',n=npcs(MAPS.temple).find(x=>x.sp==='masquaserp');await cine(1);rays(n.x,n.y,'#3ac8f0',2000);await emote(n,'?',700);
 await say('Un serpent masqué se dresse devant toi. Sa voix résonne sans qu\'il ouvre la bouche : "Trois questions. Trois réponses. Ensuite seulement, je jugerai."');
 const Q=[['"Qui fut la première lumière, avant le soleil et la lune ?"',['Solarion','Aurorelle','Crépuscel'],1],['"Combien de feux tiennent le Cycle, sur le Pic Céleste ?"',['Deux','Quatre','Huit'],1],['"Que faut-il offrir à l\'ombre qui s\'éveille ?"',['Le Cœur d\'Aube','Deux larmes','Une capsule'],1]];
 for(const[q,o,ok]of Q){show(q,N);const r=await choose(o,{w:200});ui.text=null;if(r!==ok){sfx('back');await say('"Non." Le masque s\'assombrit. "Lis encore les stèles, et reviens."');await cine(0);return}sfx('lv');await say('"…Juste."')}
 await say('"Tu connais le Cycle. Alors prouve que tu sais le défendre."');await cine(0);const r=await battle([mon('masquaserp',50)],{legend:1});
 if(r==='win'||r==='catch'){f().masqOk=1;await say(r==='catch'?'Masquaserp a rejoint ton équipe. Au fond du Temple, la porte du sceau frémit.':'Masquaserp s\'incline et se dissout dans la pierre. Au fond du Temple, la porte du sceau frémit.')}}
MAPS.sceau={name:'Sceau d\'Éclipsar',bg:'grotte',amb:'cave',mus:'sanct',biome:'ruins',cave:true,rows:["^^^^^^^^^^^","^C...g...C^","^...ggg...^","^..ggggg..^","^...ggg...^","^....g....^","^C...g...C^","^....g....^","^^^^^E^^^^^"],
 doors:{'5,8':['temple',9,2,0]},
 npcs:[{x:5,y:2,t:'mon',sp:'eclipsar',d:0,cond:()=>!f().legE,fn:()=>eclipsarScene()}]};
async function eclipsarScene(){const N='Éclipsar',n=npcs(MAPS.sceau).find(x=>x.sp==='eclipsar');await cine(1);musStop();sfx('roar');ui.shake=14;for(let i=0;i<3;i++){ui.flash=.7;ui.flashC=i%2?'#1a1420':'#f6c445';await wait(250)}
 rays(n.x,n.y,'#f6c445',2600);await emote(n,'!',800);await say('Un lion d\'or et d\'ombre ouvre les yeux. Le soleil dévoré, l\'Éclipse elle-même. ÉCLIPSAR !');
 const calm=G.bag.amucycle||G.party.some(m=>m.item==='amucycle');
 if(calm){await say('L\'Amulette du Cycle se met à briller. Les deux larmes, la blanche et la noire, chantent ensemble…');await say('Éclipsar baisse la tête. Sa colère s\'apaise : il veut seulement savoir si tu es digne de marcher avec lui.')}
 else{await say('Sa colère fait trembler le Temple ! Il semble chercher quelque chose… comme une offrande que tu n\'as pas.');await say('(La huitième stèle parlait de deux larmes. Peut-être faudrait-il revenir avec l\'Amulette du Cycle.)');await cine(0);musPlay('sanct');return}
 const ok=await ask('Affronter Éclipsar ?');await cine(0);if(!ok){musPlay('sanct');return}
 const r=await battle([mon('eclipsar',60,{item:'encensnoir'})],{legend:1});
 if(r==='catch'){f().legE=1;await say('Éclipsar a rejoint ton équipe. Le Temple, pour la première fois depuis mille ans, respire.');ach('eclipsar')}else if(r==='win')await say('Éclipsar se rendort, apaisé… Il reviendra quand le soleil sera de nouveau dévoré.');
 if((r==='win'||r==='catch')&&!f().visionV)await valenVision();musPlay('sanct')}
async function valenVision(){f().visionV=1;await cine(1);musStop();await fadeTo(.75,700);sfx('shard');
 await say('Une vision traverse ton esprit, comme un souvenir qui n\'est pas le tien…');await say('Le même sceau, il y a longtemps. Un vieil homme tient une lanterne au-dessus de l\'autel. À côté de lui, un petit garçon aux cheveux clairs serre la main d\'une fillette.');
 await say('« Un jour, Valen, ce sera ton tour de veiller. Et le tien aussi, Sélène, si tu le veux. »','Vieux gardien');await say('Le garçon regarde l\'ombre endormie, terrifié. Il lâche la main de la fillette et s\'enfuit vers la mer.');
 await fadeTo(0,700);await cine(0);await say('La vision s\'efface. Valen et Sélène… se connaissaient donc depuis l\'enfance, ici, au Temple.')}
{const V0=valenTalk;valenTalk=async function(...a){if(f().visionV&&!f().valenV){const V='Valen';f().valenV=1;await say('Tu as vu mon grand-père, au Temple ? … Alors tu sais. J\'ai fui ce sceau quand j\'avais cinq ans. J\'ai laissé Sélène seule avec cette peur.',V,0,'valen');
  await say('Toute ma vie, j\'ai cru que fuir m\'avait sauvé. C\'est en revenant que je l\'ai été. Merci de m\'avoir ramené là-bas, même en rêve.',V,0,'valen');give('dc_eclipse');await say('Valen te confie le DC Éclipse, un disque gravé au Temple.');rep('cher',3);return save()}return V0(...a)};
 for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===V0)n.fn=valenTalk}


// ---------------------------------------------------------------- PIC CÉLESTE (téléphérique de Volterre, après l'Équilibre) : les quatre feux, Aurorelle
{const VG0=volGate;volGate=async function(){if(!f().balance)return VG0();const c=await choose(['OBSERVATOIRE','PIC CÉLESTE','RESTER'],{w:220,title:'Téléphérique'});if(c===0)return VG0();if(c===1){sfx('door');await say('La cabine grimpe au-dessus des nuages, plus haut que l\'Observatoire, jusqu\'aux neiges éternelles…');await warp('pic',10,18,1)}};
 for(const k in MAPS.volterre.doors)if(MAPS.volterre.doors[k]===VG0)MAPS.volterre.doors[k]=volGate}
MAPS.pic={name:'Pic Céleste',bg:'mont',amb:'mont',snow:1,mus:'mont',
 rows:["^^^^^^^^^^@^^^^^^^^^",
       "^^^^^^gggggggg^^^^^^",
       "^^^^ggggvvvvgggg^^^^",
       "^^^gggvvvvvvvvggg^^^",
       "^^gggg^^^gg^^^gggg^^",
       "^^vvvg^^^gg^^^gvvv^^",
       "^^vvvgggggggggggvvv^",
       "^^^^ggg^^^^^^^ggg^^^",
       "^gggggg^vvvv^gggggg^",
       "^gvvvgg^vvvv^ggvvvg^",
       "^gvvvggggggggggvvvg^",
       "^gggg^^^^gg^^^^gggg^",
       "^^ggg^^vvvvvv^^ggg^^",
       "^^ggggggvvvvggggggg^",
       "^^^vvvgggggggvvv^^^^",
       "^^^vvvggggggggvv^^^^",
       "^^^^^^^gggggg^^^^^^^",
       "^^^^^^^gggggg^^^^^^^",
       "^^^^^^^^ggggg^^^^^^^",
       "^^^^^^^^^EE^^^^^^^^^"],
 enc:[['flocelin',50,54,18],['angeflocon',53,56,5,'j'],['demoniflocon',53,56,5,'n'],['cardiflamme',50,54,12,'j'],['tempestaile',53,57,5],['eoloeil',52,55,10],['runocon',50,54,10],['strellune',50,54,10,'n'],['quetzaroc',53,56,6],['meteosaur',50,53,10,'s'],['lucifrimas',56,58,3,'e']],
 doors:{'9,19':async()=>{if(!await ask('Redescendre en téléphérique jusqu\'à Volterre ?'))return;await warp('volterre',13,1,0)},'10,19':async()=>{if(!await ask('Redescendre en téléphérique jusqu\'à Volterre ?'))return;await warp('volterre',13,1,0)},
  '10,0':async()=>{if(!(f().fire0&&f().fire1&&f().fire2&&f().fire3))return say('Une immense porte de glace, scellée. Quatre vasques éteintes l\'entourent sur la montagne… "Que chaque feu brûle à son heure."');await warp('citadelle',6,12,1)}},
 signs:{'9,4':'PIC CÉLESTE\n"Allume chaque feu à son heure : l\'aube, le jour, le crépuscule, la nuit. Quand les quatre brûleront, la première lumière reviendra."'},
 hidden:[{x:2,y:9,it:'dc_voilestellaire',q:1,id:'pic1'},{x:18,y:10,it:'etoilefilante',q:2,id:'pic2'},{x:3,y:15,it:'pierreaube',q:1,id:'pic3'}],
 npcs:[steleN(7),OB10(3,6,'fire',()=>phaseFire(0),{fid:0}),OB10(16,6,'fire',()=>phaseFire(1),{fid:1}),OB10(2,12,'fire',()=>phaseFire(2),{fid:2}),OB10(17,12,'fire',()=>phaseFire(3),{fid:3}),
  {x:9,y:1,t:'mon',sp:'aurorelle',d:0,cond:()=>f().fire0&&f().fire1&&f().fire2&&f().fire3&&phase()===0&&!f().legA,fn:()=>aurorelleScene()},
  {x:12,y:17,t:'mountaineer',d:2,tr:TR('picp1','Alpiniste Sven',[['tempestaile',54],['eoloeil',54],['angeflocon',55]],3000,'À cette altitude, seuls les meilleurs respirent encore !','Tu as le souffle long…',{post:'Les Flocelin deviennent anges au soleil, et démons sous la lune. Les plus rares, on les voit sous les étoiles ou pendant l\'éclipse.'})},
  {x:6,y:13,t:'climber',d:3,tr:TR('picp2','Grimpeuse Astrid',[['cardinova',55],['quetzaroc',55],['demoniflocon',56]],3000,'La vue d\'ici, il faut la mériter !','Bon, tu la mérites.',{post:'Les quatre feux… On raconte qu\'ils tiennent le ciel. Quand j\'étais petite, ils brûlaient encore.'})},
  {x:14,y:8,t:'astro',d:2,tr:TR('picp3','Astronome Céleste',[['seraphivre',57],['novarium',57],['medulune',56]],3200,'Les étoiles m\'ont prédit ce combat.','…Elles ne m\'ont pas dit le résultat.',{post:()=>stars()?'Ce soir, il pleut des étoiles ! Les Runocon s\'éveillent, et les Angeflocon changent.':'Reviens une nuit d\'étoiles filantes. La montagne chante.'})},
  I(1,8,'maxpotion',2,'picb1'),I(15,2,'megacapsule',3,'picb2')]};
const FIREN=['AUBE','JOUR','CRÉPUSCULE','NUIT'],FIREC=['#ff9ab8','#ffd860','#ff8a3a','#6a8aff'];
async function phaseFire(i){if(f()['fire'+i])return say(`Le feu de ${FIREN[i]} brûle, d'une flamme ${['rose','dorée','orangée','bleue'][i]}, sans consumer quoi que ce soit.`);
 if(phase()!==i&&!(i===3&&phase()===4))return say(`Une vasque gravée : « ${FIREN[i]} ». Elle refuse de s'allumer : ce n'est pas son heure. (Il est actuellement : ${PHN[phase()]}.)`);
 if(!await ask(`Allumer le feu de ${FIREN[i]} ?`))return;f()['fire'+i]=1;sfx('shard');ui.flash=.6;ui.flashC=FIREC[i];const n=[0,1,2,3].filter(k=>f()['fire'+k]).length;await say(`Le feu de ${FIREN[i]} s'allume ! (${n}/4)`);
 if(n===4){await cine(1);sfx('roar');ui.shake=10;rays(10,0,'#ffffff',2400);await say('Les quatre feux s\'élancent vers le ciel. La porte de glace au sommet se fend, et une lueur rose vacille là-haut… comme une aube qui attend son heure.');await cine(0);rep('cher',4)}save()}
async function aurorelleScene(){const n=npcs(MAPS.pic).find(x=>x.sp==='aurorelle');await cine(1);musStop();for(let i=0;i<3;i++){ui.flash=.6;ui.flashC=['#ff9ab8','#ffffff','#a8c8f0'][i];await wait(260)}rays(n.x,n.y,'#ffd0e0',3000);await emote(n,'♪',800);
 await say('Une silhouette de lumière se détache de l\'aurore. Ni jour, ni nuit : AURORELLE, la première aube.');await say('Elle te regarde comme on regarde quelqu\'un qu\'on attendait depuis longtemps.');const ok=await ask('Affronter Aurorelle ?');await cine(0);if(!ok)return musPlay('mont');
 const r=await battle([mon('aurorelle',60,{item:'poudretoile'})],{legend:1});if(r==='catch'){f().legA=1;await say('Aurorelle a rejoint ton équipe. Le ciel du Pic garde, un instant, la couleur de l\'aube.');ach('aurorelle')}else if(r==='win')await say('Aurorelle se dissout dans la lumière du matin. Elle reviendra à l\'aube.');musPlay('mont')}

// ---------------------------------------------------------------- ERRENARD : la créature errante (après l'Équilibre)
// Chaque jour, il apparaît dans un lieu différent (indice : la rumeur du jour). Il fuit après deux tours ; ses PV restent entamés.
const ROAM=['route1','foret','route2','coteaux','lac','bois','recif','pic'];
const roamMap=()=>{const L=ROAM.filter(k=>G.seen?.[k]);return f().balance&&!f().legR&&L.length?L[(dayN()*7+3)%L.length]:null};
for(const k of ROAM){const M=MAPS[k],c=[...M.rows.keys()].flatMap(y=>[...M.rows[y]].map((ch,x)=>(ch===','||ch==='v'||ch==='g')?[x,y]:null)).filter(Boolean);const[x,y]=c[(c.length*7>>3)]||[5,5];
 M.npcs.push({x,y,t:'mon',sp:'errenard',d:2,roam:1,cond:()=>roamMap()===k&&f().roamD!==dayN(),fn:()=>roamMeet()})}
async function roamMeet(){const n=npcs(MAPS[G.map]).find(x=>x.roam);await emote(n,'!',500);sfx('roar');await say('Un renard d\'ombre aux yeux rouges ! Errenard, la créature errante !');
 const m=mon('errenard',55);if(f().roamHp)m.hp=Math.min(m.hp,f().roamHp);if(f().roamSt)m.st=f().roamSt;const r=await battle([m],{roam:1});
 f().roamD=dayN();if(r==='catch'){f().legR=1;delete f().roamHp;await say('Errenard a rejoint ton équipe. Il ne fuira plus.');ach('errenard')}else{f().roamHp=m.hp;f().roamSt=m.st;if(r==='win'){delete f().roamHp;delete f().roamSt;await say('Errenard s\'effondre, puis disparaît dans un tourbillon d\'ombre. Il reviendra ailleurs, demain, remis de ses blessures.')}}save()}
// Errenard fuit au bout de deux tours, sauf s'il est endormi ou paralysé
const endTurnR=endTurn;endTurn=async function(){const r=await endTurnR();if(B?.o?.roam&&r==null&&B.turn>=2&&B.foe.hp>0&&B.foe.st!=='slp'&&B.foe.st!=='par'){await say('Errenard bondit hors du combat et disparaît !',0,1);B.fled=1;return'flee'}return r};

// --- Rumeurs : un PNJ par grande ville donne l'indice du jour (Errenard, essaims, marchande)
function rumor(){const r=roamMap(),sw=swarm(),mz=merchHere();const L=[];if(r)L.push(`On a vu un renard d'ombre du côté de : ${MAPS[r].name}. Il ne reste jamais deux jours au même endroit.`);if(sw)L.push(`Un essaim de ${SP[sw[1]].name} a été signalé : ${MAPS[sw[0]].name}.`);if(mz)L.push(`La marchande Zélie a posé ses caisses à ${MAPS[mz[0]].name} aujourd'hui.`);
 if(stars())L.push('Cette nuit, il pleut des étoiles. Les pêcheurs du Lac Opalin vont veiller tard.');if(nStele()<8&&f().badge2)L.push('Des archéologues parlent de stèles gravées, dispersées dans Aurélys. Huit, dit-on.');L.push('Rien de neuf… à part que le facteur Léo s\'est encore perdu.');return L[dayN()%L.length]}
for(const[m,x,y]of[['ville',13,12],['port',9,12],['lunevie',10,8],['volterre',8,13]])MAPS[m].npcs.push({x,y,t:'kid',d:0,name:'Crieur',fn:()=>say(rumor(),'Crieur',0,'kid')});

// Corrections de placement (PNJ dans un arbre, objet sur un rocher)
{const M=MAPS.coteaux,b=M.npcs.find(n=>n.name==='Vieux berger'),c=M.npcs.find(n=>n.id==='cot1');if(b)b.x=2;if(c)c.x=1}
