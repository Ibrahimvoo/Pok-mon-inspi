// =====================================================================
// EXTENSION 18.0 — LE CARNAVAL DES MASQUES · Données : capacités, objets, 117 nouvelles espèces (sprites Tuxemon, voir CREDITS.md).
// Ce bloc est chargé avant l'aventure à plusieurs (q-aventure) : les portes et les entrées de lieux des nouvelles cartes y sont partagées.
// =====================================================================
// --- Capacités 18.0 : [id, nom, type, puissance, précision, PP, effet, chance %, priorité] (effets déjà connus des trois moteurs de combat)
[['tornade','Tornade','NOR',75,95,15,'spd-',30],['ruade','Ruade','NOR',90,100,10,'recoil'],['coupdeplume','Coup de Plume','NOR',60,100,20,0,0,1],
 ['coupsoleil','Coup de Soleil','FEU',90,100,10,'brn',20],['flammedanse','Danse Flamme','FEU',0,0,10,'atk+2'],['tempetebraise','Tempête de Braise','FEU',70,100,15,'spd+',100],
 ['ressac','Ressac','EAU',70,100,15,'drain'],['geyser','Geyser','EAU',110,85,5],['oasis','Eau d\'Oasis','EAU',0,0,10,'heal'],['deluge','Déluge Sacré','EAU',120,90,5,'rain',100],
 ['bambouclap','Coup de Bambou','PLA',80,100,15,'crit'],['sevenoire','Sève Noire','PLA',75,100,10,'night2'],['parfum','Parfum Sucré','PLA',0,90,15,'slp'],
 ['courtcircuit','Court-Circuit','ELE',80,100,15,'par',20],['surtension','Surtension','ELE',0,0,10,'spd+2'],['rayonmk','Rayon MK','ELE',100,90,5,'def-',30],
 ['tempetesable','Tempête de Sable','ROC',85,95,10,'spd-',30],['ensablement','Sables Mouvants','ROC',55,100,15,'spd-',100],['brique','Coup de Brique','ROC',90,90,10,'def-',20],
 ['mauvaissort','Mauvais Sort','OMB',0,100,15,'atk-'],['mascarade','Mascarade','OMB',75,100,15,'crit'],['cauchemar','Cauchemar','OMB',100,100,10,'dream'],
 ['mirage','Mirage','LUM',70,100,15,'atk-',30],['oracle','Oracle','LUM',90,100,10,'stars15'],['lampegenie','Lampe du Génie','FEU',130,90,5,'recoil']
].forEach(([id,n,t,p,a,pp,e,ch,pr])=>MV[id]={id,n,t,p,a,pp,e,ch:p?ch||0:100,pr:pr||0});

// --- Objets 18.0 (catégories déjà connues : capsules, soins, friandises, pierres, objets à revendre, objets de quête, disques)
Object.assign(IT,{
 sablecapsule:['Sable Capsule',1000,'Taux x3 sur les créatures ROCHE et FEU, sinon x1. Vendue au Bazar des Dunes.',3,'ball'],
 festicapsule:['Festi Capsule',1200,'Taux x2,5 la nuit, quand les lampions du Carnaval s\'allument ; x1,5 le jour.',1.5,'ball'],
 eauoasis:['Eau d\'Oasis',450,'Une eau fraîche puisée à l\'Oasis. Soigne 90 PV.',90,'heal'],
 granita:['Granité Glacé',900,'Le dessert vedette du Carnaval. Soigne 160 PV.',160,'heal'],
 sirop:['Sirop de Menthe',350,'Une gorgée bien fraîche qui guérit tous les statuts.',0,'cure'],
 barbapapa:['Barbe à Papa',300,'Une friandise du Carnaval, rose et légère. Renforce le lien.',12,'treat'],
 pommamour:['Pomme d\'Amour',650,'Une pomme nappée de caramel rouge. Renforce beaucoup le lien.',20,'treat'],
 pierresable:['Pierre Sable',3000,'Chaude et granuleuse, elle sent le désert. Fait évoluer certaines créatures.',0,'evo'],
 scarabee:['Scarabée d\'Or',0,'Un bijou en forme de scarabée, trouvé dans le Tombeau. Se revend 7 000 pièces.',0,'sell'],
 masqueor:['Masque d\'Or',0,'Un masque de Carnaval en or fin. Se revend 9 000 pièces.',0,'sell'],
 coquillage:['Coquillage Rose',0,'Un joli coquillage de l\'Île Corail. Se revend 1 500 pièces.',0,'sell'],
 ambre:['Ambre des Dunes',0,'Une goutte de résine dorée, vieille de mille ans. Se revend 3 000 pièces.',0,'sell'],
 clecabine:['Clé du Téléphérique',0,'La clé de commande du téléphérique de Volterre. Ambroise l\'attend.',0,'quest'],
 lampe:['Lampe Ancienne',0,'Une lampe à huile ternie, trouvée au fond du Tombeau. Quelque chose bouge à l\'intérieur.',0,'quest'],
 partition:['Partition Perdue',0,'Une partition déchirée : « La Valse des Masques ». Le chef d\'orchestre du Théâtre la cherche.',0,'quest']});
CATO.includes('treat')||CATO.push('treat');
Object.assign(SELLV,{scarabee:7000,masqueor:9000,coquillage:1500,ambre:3000});
const V18DISC=['tempetesable','courtcircuit','cauchemar','oracle','ressac','bambouclap','coupsoleil','mascarade','tornade','geyser'];
V18DISC.forEach((m,i)=>{DISCS.push(m);IT['dc_'+m]=[`DC${String(DISCS.length).padStart(2,'0')} ${MV[m].n}`,[5000,4000,5000,5000,3500,3500,4000,3500,3000,6000][i],`Disque Cycle. Enseigne ${MV[m].n} (${TY[MV[m].t][0]}) à une créature compatible. Réutilisable.`,m,'disc']});
{const bm18=ballMul;ballMul=function(k){if(k==='sablecapsule'){const t=SP[B.foe.sp].t;return t==='ROC'||t==='FEU'?3:1}if(k==='festicapsule')return isN()?2.5:1.5;return bm18(k)}}
Object.assign(ICO,{sablecapsule:icon(BALLR,{r:'#e8c870',R:'#b8904a',w:'#fff4d8'}),festicapsule:icon(BALLR,{r:'#e84a9a',R:'#a82a6a',w:'#ffe060'}),
 eauoasis:icon(POT,{p:'#6ad0e8',P:'#2a8ab8',l:'#e0f8ff'}),granita:icon(POT,{p:'#ff8ab8',P:'#c84a7a',l:'#ffe0f0'}),sirop:icon(POT,{p:'#6ae89a',P:'#2aa85a',l:'#e0fff0'}),
 barbapapa:icon(["...oo...","..owwo..",".owppwo.","owpppwwo","owppppwo",".owwppo.","..ooo...","...o...."],{p:'#ffb8d8'}),
 pommamour:icon(["....o...","...o....","..oooo..",".orrrro.","orrwrrro","orrrrrro",".orrrro.","..oooo.."],{r:'#d82a3a'}),
 pierresable:icon(SHARDP,{y:'#f0d890',Y:'#c8a050'}),scarabee:icon(["........",".o.oo.o.","..oyyo..",".oyyyyo.","oyyYYyyo",".oyyyyo.","..oYYo..",".o.oo.o."],{y:'#ffd860',Y:'#b88a1a'}),
 masqueor:icon(["........","oooooooo","oyyyyyyo","oyoyyoyo","oyyyyyyo",".oyyyyo.","..oooo..","........"],{y:'#ffd860'}),
 coquillage:icon(["...oo...","..oppo..",".opwppo.","opwppppo","oppppppo",".oppppo.","..oooo..","........"],{p:'#ffb8c8'}),ambre:icon(SHARDP,{y:'#ffb84a',Y:'#c86a1a'}),
 clecabine:icon(["........",".ooo....","oyyyo...","oyoyoooo","oyyyoyoy",".ooo.o.o","........","........"],{y:'#c8d0e0'}),
 lampe:icon(["........","...oo...","..oyyo..","oooyyooo","oyyyyyyo",".oyyyyo.","..oooo..","........"],{y:'#d8b050'}),
 partition:icon(["oooooooo","owwwwwwo","owkwwkwo","owkwwkwo","okkwkkwo","owwwwwwo","oooooooo","........"],{k:'#1a1420'})});
for(const m of V18DISC)ICO['dc_'+m]=icon(["..oooo..",".owwwwo.","owbbbbwo","owbooBwo","owboobwo","owbbbbwo",".owwwwo.","..oooo.."],{b:TY[MV[m].t][1],B:'#ffffff'});

// --- Apprentissages 18.0
const LFD=[[1,'braise'],[1,'grondement'],[6,'morsure'],[10,'roueflamme'],[15,'ensablement'],[20,'crocsfeu'],[26,'coupsoleil'],[32,'tempetesable'],[38,'lanceflam'],[45,'boutefeu']],
 LFV=[[1,'braise'],[1,'charge'],[5,'viveatk'],[9,'roueflamme'],[14,'tempetebraise'],[19,'flammedanse'],[24,'crocsfeu'],[30,'lanceflam'],[36,'coupsoleil'],[44,'deflagration']],
 LRS=[[1,'charge'],[1,'jetpierre'],[6,'ensablement'],[10,'morsure'],[15,'eclatroc'],[20,'tempetesable'],[26,'brique'],[32,'seisme'],[40,'meteore']],
 LMA=[[1,'pistolet'],[1,'charge'],[6,'bulles'],[10,'vampigraine'],[15,'ressac'],[20,'sevenoire'],[26,'cascade'],[32,'geyser']],
 LCO=[[1,'pistolet'],[1,'charge'],[6,'aquajet'],[11,'ressac'],[16,'tourbillon'],[22,'cascade'],[28,'hydroqueue'],[34,'geyser']],
 LGI=[[1,'pistolet'],[1,'morsure'],[6,'bulles'],[11,'aquajet'],[16,'tourbillon'],[21,'crocsfeu'],[27,'cascade'],[33,'hydroqueue'],[40,'hydro']],
 LPF=[[1,'liane'],[1,'charge'],[5,'vampigraine'],[10,'tornade'],[15,'bambouclap'],[20,'feuille'],[26,'lamefeuille'],[32,'eclatfloral'],[40,'floral']],
 LPM=[[1,'liane'],[1,'charge'],[5,'parfum'],[10,'sangsue'],[15,'sevenoire'],[20,'vampigraine'],[26,'lamefeuille'],[32,'spore'],[38,'floral']],
 LEM=[[1,'charge'],[1,'eclair'],[6,'durcir'],[10,'etincelle'],[15,'courtcircuit'],[20,'surtension'],[26,'tonnerre'],[34,'rayonmk'],[42,'fatalfoudre']],
 LRB=[[1,'charge'],[1,'durcir'],[6,'jetpierre'],[10,'brique'],[16,'eclatroc'],[22,'abri'],[28,'tomberoche'],[34,'seisme'],[42,'megaimpact']],
 LOM=[[1,'ombrefurtive'],[1,'grimace'],[6,'mauvaissort'],[10,'morsure'],[15,'mascarade'],[20,'hypnose'],[26,'griffeombre'],[32,'cauchemar'],[40,'lunenoire']],
 LLM=[[1,'lueur'],[1,'charge'],[6,'eblouir'],[10,'mirage'],[16,'rayonaurore'],[22,'clairlune'],[28,'oracle'],[34,'prisme'],[42,'aubeeternelle']],
 LNV=[[1,'charge'],[1,'grondement'],[5,'viveatk'],[9,'tornade'],[14,'doublecoup'],[19,'coupdeplume'],[24,'tranche'],[30,'ruade'],[36,'megaimpact']];
const V18SP=[];const S18=(...a)=>{S(...a);V18SP.push(a[0])};
// FEU
S18('serpetin','Serpétin','FEU',[44,56,42,64],62,170,['#e4482f','#fdc43b','#3e3e3e'],LFD,[20,'cobrasier'],0,1,'corpsardent',"Un petit serpent qui se dore au soleil des Dunes d'Ambre. Il siffle des étincelles quand on marche sur sa queue.");
S18('cobrasier','Cobrasier','FEU',[64,78,60,84],148,90,['#766054','#ca8f57','#4b4241'],LFD,[38,'pythonova'],'serpetin',2,'corpsardent',"Sa collerette se gonfle d'air brûlant pour impressionner ses rivaux. Les caravaniers l'entendent avant de le voir.");
S18('pythonova','Pythonova','FEU',[86,104,80,96],232,45,['#635347','#f2aa61','#fd573f'],LFD,null,'serpetin',3,'intimidation',"Un serpent immense dont les écailles rougeoient comme des braises. Il dort enroulé autour des pyramides et se réveille quand le sable chante.");
S18('braisot','Braisot','FEU',[48,58,46,58],64,170,['#f86000','#d00000','#f0ab21'],LFV,[30,'eruptor'],0,1,'brasier',"Une petite flamme qui danse sur les rochers chauds des Gorges du Vent. Le vent l'agace : il le fait vaciller.");
S18('eruptor','Éruptor','FEU',[82,98,84,62],178,60,['#898887','#f8a810','#b11718'],LFV,null,'braisot',2,'tenace',"Un volcan miniature sur pattes. Quand il est en colère, il projette des pierres brûlantes à des mètres de haut.");
S18('lapignite','Lapignite','FEU',[46,56,44,70],62,180,['#aa1500','#fef1ae','#3c0700'],LFV,[28,'volcanin'],0,1,'vigilant',"Un lapin aux oreilles de braise. Il tape du pied pour réchauffer son terrier, et ses voisins se plaignent de la chaleur.");
S18('volcanin','Volcanin','FEU',[72,90,66,98],160,75,['#f24f00','#ffd77b','#531b00'],LFV,null,'lapignite',2,'turbo',"Il bondit si vite que ses pattes laissent des traces de feu sur le sol. Les danseurs du Carnaval l'imitent.");
S18('fournours','Fournours','FEU',[60,56,56,38],64,150,['#7b4d16','#ff0000','#bc6e12'],LFV,[24,'ourscendre'],0,1,'brasier',"Un ourson dont le ventre est un petit four. Les boulangers de Carnavelle l'adorent : il cuit les brioches tout seul.");
S18('ourscendre','Ourscendre','FEU',[82,78,82,46],150,75,['#948252','#e0b74a','#5a4e2e'],LFV,[40,'charbonours'],'fournours',2,'tenace',"Il médite des heures assis en tailleur, et les cendres retombent sur lui comme de la neige.");
S18('charbonours','Charbonours','FEU',[108,108,98,52],235,45,['#654022','#ae8b40','#322011'],[...LFV,[48,'boutefeu']],null,'fournours',3,'tenace',"Le plus gros ours d'Aurélys. Son pelage est du charbon brûlant ; il ne craint ni la pluie ni la neige.");
S18('tikitison','Tikitison','FEU',[52,60,62,40],66,150,['#69412c','#c59271','#24170f'],LFV,[30,'tikorche'],0,1,'cuirasse',"Un totem de bois sculpté qui garde la plage de l'Île Corail. Le soir, ses yeux s'allument comme des lampes.");
S18('tikorche','Tikorche','FEU',[80,94,96,52],170,60,['#93563c','#c79375','#311d15'],LFV,null,'tikitison',2,'cuirasse',"Un grand totem enflammé. Les pêcheurs de l'île disent qu'il éloigne les tempêtes en grimaçant vers le large.");
S18('djinnflamme','Djinnflamme','FEU',[90,118,80,108],270,5,['#96212f','#dfd28e','#c84050'],[[1,'braise'],[1,'mauvaissort'],[25,'flammedanse'],[35,'coupsoleil'],[42,'mascarade'],[48,'lanceflam'],[55,'lampegenie']],null,0,1,'technicien',"Le génie prisonnier de la Lampe Ancienne. Il exauce un vœu à qui le libère… mais choisit lui-même lequel.");
// EAU
S18('crabeil','Crabéil','EAU',[46,58,62,48],62,180,['#ff3701','#ffa101','#ff714b'],LCO,[28,'crabermite'],0,1,'cuirasse',"Un crabe qui cache son œil unique sous une coquille. Il pince d'abord et regarde ensuite.");
S18('crabermite','Crabermite','EAU',[70,96,94,54],160,75,['#dd0000','#bbbbb8','#3f0605'],LCO,null,'crabeil',2,'cuirasse',"Il a trouvé une coquille à sa taille… un crâne de Pixémon des mers. Les plongeurs s'écartent quand il passe.");
S18('algadou','Algadou','EAU',[52,48,56,50],62,180,['#4ab036','#f7eb87','#394e36'],LCO,[32,'atlantalgue'],0,1,'seve',"Une boule d'algues douce comme un coussin. Elle s'accroche aux bateaux pour voyager.");
S18('atlantalgue','Atlantalgue','EAU',[88,82,90,68],170,60,['#69b950','#f6e4a7','#58775f'],[...LCO,[40,'floral']],null,'algadou',2,'seve',"Une forêt d'algues vivante. On raconte qu'une cité engloutie dort dans ses racines.");
S18('nudiflor','Nudiflor','EAU',[50,44,52,62],64,160,['#a0c8c0','#50a0d0','#264354'],LCO,[[30,'nudisprit',{time:'n'}]],0,1,'serenite',"Une limace de mer aux couleurs pastel. Elle ondule dans les lagons de l'Île Corail.");
S18('nudisprit','Nudisprit','EAU',[78,72,80,94],160,75,['#a8d4d0','#917085','#3e303f'],[...LCO,[36,'oracle']],null,'nudiflor',2,'astral',"Un Nudiflor qui a grandi sous la lune. Il devine les marées des jours à l'avance.");
S18('escargout','Escargout','EAU',[50,44,60,30],60,190,['#97e9cf','#3abab7','#3d7268'],LMA,[20,'coquillagu'],0,1,'medecin',"Un escargot du Marais qui laisse derrière lui une traînée d'eau claire. Les grenouilles le suivent pour boire.");
S18('coquillagu','Coquillagu','EAU',[70,62,86,36],145,90,['#505274','#b47688','#1c2435'],LMA,[[38,'crustagu',{rain:1}]],'escargout',2,'medecin',"Sa coquille épaisse résiste à tout. Il ne la quitte que sous la pluie, pour se changer en autre chose.");
S18('crustagu','Crustagu','EAU',[92,96,106,54],230,45,['#be7c66','#47a8a6','#e9cab9'],LMA,null,'escargout',3,'cuirasse',"Un Coquillagu qui a quitté sa coquille sous une averse d'orage. Ses pinces coupent les roseaux comme du papier.");
S18('ornitaupe','Ornitaupe','EAU',[66,64,62,64],140,120,['#8c5e0f','#c0a756','#4c2e0a'],[...LMA,[36,'seisme']],null,0,1,'glissade',"Moitié taupe, moitié canard, il creuse des tunnels sous l'eau. Personne ne sait vraiment ce qu'il est.");
S18('gelilou','Gélilou','EAU',[56,40,50,50],64,170,['#e0f0e8','#56a8c6','#204050'],LMA,[28,'bedouille'],0,1,'absorbeau',"Une petite méduse d'eau douce qui flotte dans les mares du Marais des Lucioles. Elle chatouille plus qu'elle ne pique.");
S18('bedouille','Bédouille','EAU',[90,70,78,58],160,75,['#176aa8','#b7d3cc','#57aeb7'],LMA,null,'gelilou',2,'absorbeau',"Elle se gonfle d'eau jusqu'à ressembler à un ballon. Quand elle se vide, c'est une vraie cascade.");
S18('blobulle','Blobulle','EAU',[104,50,60,30],150,90,['#ccbfc6','#73d1d7','#905160'],LCO,null,0,1,'medecin',"Il vit tout au fond de la mer et remonte une fois par an. Il a l'air triste, mais c'est juste sa tête.");
S18('eskichiot','Eskichiot','EAU',[48,56,46,64],62,170,['#e8eaec','#b0bdc4','#596062'],LGI,[[30,'givrechien',{time:'n'}]],0,1,'vigilant',"Un chiot au poil de neige qui vit dans les Dunes : la nuit, le désert gèle et il est enfin dans son élément.");
S18('givrechien','Givrechien','EAU',[74,90,70,98],160,75,['#e8eaec','#004e6f','#b0bdc4'],LGI,null,'eskichiot',2,'noctambule',"Il hurle à la lune sur les dunes glacées. Son souffle fige le sable en cristaux.");
S18('tuxou','Tuxou','EAU',[70,66,70,72],170,25,['#1c1c23','#d8d5c4','#5d5860'],[...LGI,[30,'abri'],[36,'facade']],null,0,1,'flair',"Un manchot très digne qui se promène sur la plage de l'Île Corail. Il semble connaître tous les secrets de l'île.");
S18('oasiphant','Oasiphant','EAU',[110,96,108,84],300,3,['#67b4ce','#5b5e66','#3a3235'],[[1,'pistolet'],[1,'oasis'],[30,'ressac'],[38,'aquabrume'],[45,'deluge'],[52,'geyser'],[60,'soin']],null,0,1,'crachin',"Le gardien de l'Oasis, assis sur un tapis tissé de nuages. Là où il pose sa trompe, une source jaillit du sable.");
// PLANTE
S18('sushiko','Sushiko','PLA',[46,50,50,52],60,190,['#f9c9b9','#a5987a','#322e29'],LPF,[18,'makirol'],0,1,'seve',"Une petite boule de riz enroulée dans une feuille. Le chef du Marché de Carnavelle jure qu'il ne l'a jamais cuisinée.");
S18('makirol','Makirol','PLA',[64,68,70,66],140,90,['#b04c45','#b6a488','#45393a'],LPF,[34,'tobishimi'],'sushiko',2,'seve',"Il roule sur lui-même pour se déplacer. Les enfants de l'Île Corail font la course avec lui.");
S18('tobishimi','Tobishimi','PLA',[84,98,84,90],225,45,['#b2362f','#eb582e','#dcc8a5'],[...LPF,[44,'cascade']],null,'sushiko',3,'technicien',"Un dragon de riz et d'algues. Il nage aussi bien qu'il pousse, et se coiffe d'œufs de poisson.");
S18('chlorasaure','Chlorasaure','PLA',[52,62,52,52],70,30,['#843694','#5f266a','#2b112f'],LPF,[32,'sevragon'],0,1,'engrais',"Un bébé dragon qui se nourrit de rosée. Très rare : il ne naît qu'au cœur du Marais, une nuit sur cent.");
S18('sevragon','Sèvragon','PLA',[76,88,76,72],160,30,['#a349a4','#53254d','#2b132b'],LPF,[52,'dragarbre'],'chlorasaure',2,'engrais',"Sa sève est si sucrée que les Pixémons insectes le suivent partout. Il déteste ça.");
S18('dragarbre','Dragarbre','PLA',[106,128,100,96],290,15,['#2b132b','#a0499a','#e30526'],[...LPF,[56,'seisme'],[62,'meteore']],null,'chlorasaure',3,'intimidation',"Un dragon-arbre millénaire. Ses ailes de feuilles couvrent tout le Marais quand il les déploie.");
S18('timibulbe','Timibulbe','PLA',[44,40,46,56],60,190,['#c5c012','#1b8918','#65491d'],LPM,[[0,'narcifeuille',{item:'pierresoleil'}]],0,1,'feutre',"Un bulbe timide qui s'enterre dès qu'on le regarde. On le reconnaît à sa petite feuille qui dépasse.");
S18('narcifeuille','Narcifeuille','PLA',[72,70,72,90],165,75,['#fce360','#243e21','#0a3d71'],LPM,null,'timibulbe',2,'serenite',"Une fleur qui ne s'ouvre qu'au soleil. Elle passe des heures à admirer son reflet dans les mares.");
S18('helifeuille','Hélifeuille','PLA',[40,46,40,70],58,190,['#409038','#78e0f8','#2a6a2a'],LPF,[16,'copterbe'],0,1,'turbo',"Une graine-hélice qui se laisse porter par le vent des Gorges. Elle atterrit toujours la tête en bas.");
S18('copterbe','Copterbe','PLA',[58,64,56,88],140,90,['#409038','#ff3a29','#2a6a2a'],LPF,[32,'parasolis'],'helifeuille',2,'turbo',"Ses feuilles tournent si vite qu'il peut faire du surplace. Il espionne les nids d'oiseaux.");
S18('parasolis','Parasolis','PLA',[78,84,74,108],220,45,['#0b68c8','#5fbc23','#2a6a2a'],LPF,null,'helifeuille',3,'turbo',"Il plane au-dessus des Gorges du Vent comme un parasol géant. Les voyageurs s'abritent du soleil sous son ombre.");
S18('mousseroc','Mousseroc','PLA',[58,52,72,30],64,170,['#909068','#4b4c37','#6a7a4a'],LPM,[30,'vigueur'],0,1,'cuirasse',"Une pierre couverte de mousse… qui marche. Il s'immobilise des jours entiers pour que la mousse pousse.");
S18('vigueur','Vigueur','PLA',[92,100,100,40],180,60,['#909068','#cbc9f3','#5e4b3d'],[...LPM,[34,'brique']],null,'mousseroc',2,'tenace',"Un colosse de pierre et de lianes. Il porte les blocs du chantier de Carnavelle comme des plumes.");
S18('choufroid','Choufroid','PLA',[50,46,56,40],60,190,['#defab0','#38752f','#97abb1'],LPM,[20,'laitgivre'],0,1,'medecin',"Un petit chou couvert de givre, même en plein été. Les cuisiniers le gardent pour rafraîchir les salades.");
S18('laitgivre','Laitgivre','PLA',[68,62,74,52],140,90,['#6fa03d','#defab0','#45601a'],LPM,[36,'givrelaitue'],'choufroid',2,'medecin',"Ses feuilles croquantes givrent tout ce qu'elles touchent. Il adore se rouler dans la rosée.");
S18('givrelaitue','Givrelaitue','PLA',[94,82,98,64],220,45,['#38752f','#defab0','#7e8373'],[...LPM,[42,'hydro']],null,'choufroid',3,'seve',"Une salade géante couronnée de glace. On dit qu'elle garde les potagers du Marais au frais l'été.");
S18('bourgeonge','Bourgeonge','PLA',[50,54,48,58],62,170,['#ffe1aa','#c0aa8a','#645544'],LPF,[28,'bambouddha'],0,1,'fidele',"Un petit singe-bourgeon qui grimpe aux bambous de l'Île Corail. Il médite la tête en bas.");
S18('bambouddha','Bambouddha','PLA',[84,94,80,80],170,60,['#dac056','#6c5c19','#372f05'],LPF,null,'bourgeonge',2,'fidele',"Un sage des bambous. Il frappe avec sa canne de bambou si vite qu'on n'entend qu'un seul coup.");
S18('croquepiege','Croquepiège','PLA',[52,62,48,46],64,170,['#3f4725','#b9d563','#177c35'],LPM,[[30,'dionavore',{time:'n'}]],0,1,'intimidation',"Une plante carnivore qui fait semblant de dormir. Les insectes qui s'approchent trop… disparaissent.");
S18('dionavore','Dionavore','PLA',[80,100,76,62],170,60,['#157532','#abd333','#5b9e23'],LPM,null,'croquepiege',2,'intimidation',"Un Croquepiège qui a grandi la nuit. Ses mâchoires se referment plus vite qu'un clignement d'œil.");
S18('bourbeux','Bourbeux','PLA',[92,80,90,34],165,60,['#a36a32','#3cb322','#246314'],[...LPM,[30,'ensablement'],[38,'seisme']],null,0,1,'cuirasse',"Un tas de boue et de racines qui grogne quand on le réveille. Il se cache sous la vase du Marais.");
// ÉLEC
S18('ecrouvis','Écrouvis','ELE',[44,50,62,46],60,190,['#808088','#d1d7db','#4c4e68'],LEM,[18,'boulonix'],0,1,'electrise',"Un écrou vivant tombé d'une machine de la Team Éclipse. Il roule partout à la recherche de sa vis.");
S18('boulonix','Boulonix','ELE',[62,70,80,58],140,90,['#808088','#404868','#c8c8d0'],LEM,[36,'arthrovolt'],'ecrouvis',2,'electrise',"Il a trouvé sa vis. Maintenant, il cherche le reste de la machine.");
S18('arthrovolt','Arthrovolt','ELE',[80,102,96,86],225,45,['#8e8e8e','#f3f30e','#3e3e3e'],LEM,null,'ecrouvis',3,'orageux',"Un insecte de métal qui a enfin reconstruit sa machine… autour de lui. Ses antennes crachent des éclairs.");
S18('singelec','Singélec','ELE',[50,58,46,72],64,170,['#b9a47d','#e4e1c6','#4d383d'],LEM,[[0,'apeoro',{item:'pierreorage'}]],0,1,'electrise',"Un petit singe qui joue avec les lampions du Carnaval. Il en a déjà fait sauter trois.");
S18('apeoro','Apéoro','ELE',[82,98,74,102],175,60,['#c3b337','#4d4a32','#958847'],LEM,null,'singelec',2,'orageux',"Un grand singe d'or qui appelle l'orage en tapant sur sa poitrine. Il règne sur les toits de Carnavelle.");
S18('kernelec','Kernélec','ELE',[70,80,90,70],170,45,['#5a1d52','#edda46','#322f2f'],LEM,null,0,1,'cuirasse',"Un robot de garde de la Team Éclipse, programmé pour surveiller le Repaire. Il ne dort jamais.");
S18('meduchoc','Méduchoc','ELE',[66,78,62,88],165,75,['#c0e0e8','#e86850','#55a3c8'],[...LEM,[30,'aquajet']],null,0,1,'paratonnerre',"Une méduse électrique qui monte à la surface quand l'orage gronde sur l'Île Corail. Ne pas toucher !");
S18('coleorage','Coléorage','ELE',[72,84,82,70],170,60,['#91c851','#f4d04c','#55772e'],[...LEM,[28,'lamefeuille']],null,0,1,'paratonnerre',"Un scarabée dont les élytres captent la foudre. Il illumine le Marais les soirs d'orage.");
S18('protomk','Proto-MK','ELE',[54,60,62,56],70,90,['#282828','#ff0000','#585858'],LEM,[28,'alphamk'],0,1,'cuirasse',"Le premier robot de combat de la Team Éclipse. Il obéit à n'importe qui… même à ceux qui portent son uniforme par erreur.");
S18('alphamk','Alpha-MK','ELE',[74,88,82,74],160,45,['#3b3b3b','#d72d2d','#a30000'],LEM,[44,'deltamk'],'protomk',2,'cuirasse',"Une version améliorée, plus rapide et plus solide. Ses yeux rouges balayent les couloirs du Repaire.");
S18('deltamk','Delta-MK','ELE',[92,112,100,96],245,25,['#282828','#cd2e2e','#950000'],[...LEM,[50,'megaimpact']],null,'protomk',3,'technicien',"Le chef-d'œuvre des ingénieurs de la Team Éclipse. Repogrammé avec gentillesse, c'est un compagnon fidèle.");
// ROCHE
S18('diablin','Diablin','ROC',[50,62,54,52],64,170,['#ff9d1e','#b10c0a','#b86a05'],LRS,[24,'diablosaure'],0,1,'fermete',"Un petit lézard des Dunes d'Ambre aux cornes de grès. Il se prend pour un dragon.");
S18('diablosaure','Diablosaure','ROC',[72,86,76,66],150,75,['#f69814','#b5281c','#ab6d58'],LRS,[42,'diabloraptor'],'diablin',2,'fermete',"Il court sur deux pattes à travers les dunes. Ses griffes laissent des empreintes que le vent n'efface jamais.");
S18('diabloraptor','Diabloraptor','ROC',[90,118,90,96],240,45,['#ff9d1e','#a5100b','#ca790e'],[...LRS,[46,'boutefeu']],null,'diablin',3,'intimidation',"Le tyran des Dunes d'Ambre. Sa crête de feu se dresse quand il charge, et le sable fond sur son passage.");
S18('briquillon','Briquillon','ROC',[52,54,70,34],62,180,['#c06e53','#d3d4cf','#7e4d3f'],LRB,[24,'briquegarde'],0,1,'cuirasse',"Une brique tombée d'un mur qui a décidé de vivre sa vie. Il adore les chantiers.");
S18('briquegarde','Briquegarde','ROC',[74,76,96,40],150,75,['#bd6c4f','#d4d6d0','#764d3f'],LRB,[40,'briquemoth'],'briquillon',2,'cuirasse',"Un mur ambulant qui protège les maisons de Carnavelle des tempêtes de sable.");
S18('briquemoth','Briquemoth','ROC',[110,108,130,36],245,45,['#ca7e63','#bebaba','#464140'],LRB,null,'briquillon',3,'fermete',"Une forteresse vivante. Les enfants de Carnavelle jouent à cache-cache dans ses fenêtres.");
S18('fourminet','Fourminet','ROC',[44,56,52,58],60,190,['#c03030','#2a2a2a','#e8c870'],LRS,[20,'fourmicrane'],0,1,'technicien',"Une fourmi rouge qui transporte vingt fois son poids en sable. Elle ne travaille jamais seule.");
S18('fourmicrane','Fourmicrâne','ROC',[64,78,76,62],145,90,['#d8d0c0','#c03030','#2a2a2a'],LRS,[38,'myrmidon'],'fourminet',2,'technicien',"Elle porte un crâne en guise de casque. Les fourmilières du Tombeau en sont pleines.");
S18('myrmidon','Myrmidon','ROC',[84,108,96,82],230,45,['#c03030','#e8c870','#2a2a2a'],[...LRS,[44,'megaimpact']],null,'fourminet',3,'intimidation',"Le général des fourmis du désert. Il commande une armée entière d'un seul claquement de mandibules.");
S18('scorpaille','Scorpaille','ROC',[56,66,70,52],66,150,['#d0a060','#8a5a2a','#3a2a1a'],[...LRS,[22,'poudretox']],[[0,'scorpharaon',{item:'pierresable'}]],0,1,'cuirasse',"Un scorpion de sable qui se cache sous les dalles du Tombeau. Sa queue brille comme de l'or.");
S18('scorpharaon','Scorpharaon','ROC',[88,104,104,72],230,45,['#d0a060','#3a2a1a','#f0d890'],[...LRS,[22,'poudretox'],[44,'mascarade']],null,'scorpaille',2,'intimidation',"Un scorpion géant couronné, gardien des rois des sables. Une Pierre Sable l'a réveillé de son sommeil de mille ans.");
S18('requiroc','Requiroc','ROC',[90,112,84,92],210,30,['#8a8a8a','#e8e0d0','#4a4a4a'],[...LRS,[30,'aquajet'],[40,'hydroqueue']],null,0,1,'intimidation',"Un requin qui nage dans le sable comme dans l'eau. On ne voit que son aileron filer entre les dunes.");
S18('fenneclat','Fennéclat','ROC',[58,66,58,96],150,120,['#e8c890','#c08050','#5a3a2a'],[...LRS,[18,'viveatk'],[34,'tranche']],null,0,1,'vigilant',"Un fennec aux oreilles immenses qui entend les créatures sous le sable. Il guide les caravanes jusqu'à l'Oasis.");
S18('pincadune','Pinçadune','ROC',[60,72,84,44],140,120,['#e8b080','#a85a3a','#f0e0c0'],[...LRS,[20,'pistolet']],null,0,1,'cuirasse',"Un crabe des dunes qui marche toujours de côté, même quand il fuit.");
S18('hippotame','Hippotame','ROC',[110,84,92,30],170,75,['#8a8ab8','#5a5a8a','#e8e0f0'],[...LRS,[16,'bulles'],[30,'cascade']],null,0,1,'absorbeau',"Un hippopotame qui passe ses journées dans la boue du Marais. Il ouvre la bouche, et c'est un bâillement de dix minutes.");
// OMBRE
S18('vampiver','Vampiver','OMB',[46,52,46,58],60,190,['#c84a8a','#3a2a4a','#e8e0f0'],LOM,[20,'dracoon'],0,1,'noctambule',"Un ver qui sort la nuit pour mordiller les fruits mûrs du Marais. Il fuit la lumière des lucioles.");
S18('dracoon','Dracoon','OMB',[60,62,72,52],140,90,['#6a3a6a','#c84a8a','#2a1a2a'],LOM,[[36,'nocturaile',{time:'n'}]],'vampiver',2,'cuirasse',"Un cocon suspendu aux branches mortes. Il bat comme un cœur quand on colle l'oreille contre lui.");
S18('nocturaile','Nocturaile','OMB',[78,96,70,106],225,45,['#8a4a8a','#2a1a2a','#e86aa8'],LOM,null,'vampiver',3,'noctambule',"Un papillon de nuit aux ailes de velours sombre. Sa poudre plonge dans des rêves étranges.");
S18('ombrelain','Ombrelain','OMB',[48,56,46,66],62,180,['#3a3a4a','#8a8aa8','#e8e8f0'],LOM,[24,'equinuit'],0,1,'feutre',"Un poulain d'ombre qui galope sur les dunes la nuit. Ses sabots ne laissent aucune trace.");
S18('equinuit','Équinuit','OMB',[70,80,66,90],150,75,['#2a2a3a','#8a8aa8','#e8e8f0'],LOM,[[40,'cauchemare',{time:'n'}]],'ombrelain',2,'feutre',"Un cheval noir à la crinière de fumée. Les caravaniers jurent qu'il les guide quand ils se perdent.");
S18('cauchemare','Cauchemare','OMB',[86,110,80,104],235,45,['#2a1a3a','#a8e84a','#5a3a6a'],LOM,null,'ombrelain',3,'intimidation',"Le destrier des mauvais rêves. Ceux qui l'entendent hennir la nuit se réveillent en sursaut.");
S18('draplin','Draplin','OMB',[48,50,52,60],64,170,['#e8e8f0','#c8c8d8','#2a2a3a'],LOM,[[30,'possedrap',{time:'n'}]],0,1,'echo',"Un petit fantôme qui se cache sous un drap, comme un enfant qui joue au fantôme. Il hante les coulisses du Théâtre.");
S18('possedrap','Possédrap','OMB',[74,82,74,92],165,60,['#8a5ad0','#2a1a3a','#e8e0f0'],LOM,null,'draplin',2,'echo',"Un Draplin qui a trouvé un costume de scène et ne l'a jamais rendu. Il joue tous les rôles à la fois.");
S18('araignuit','Araignuit','OMB',[64,84,62,88],160,75,['#a83a3a','#3a2a2a','#8a8a8a'],[...LOM,[24,'poudretox']],null,0,1,'feutre',"Une araignée qui tisse sa toile entre les roseaux du Marais. Les lucioles s'y prennent et l'éclairent toute la nuit.");
S18('hyenou','Hyénou','OMB',[52,60,46,62],62,180,['#c08a4a','#6a4a2a','#2a1a1a'],LOM,[26,'hyenombre'],0,1,'chapardeur',"Il ricane quand il chaparde. Il chaparde tout le temps. Il ricane tout le temps.");
S18('hyenombre','Hyénombre','OMB',[76,92,70,86],160,75,['#a87a4a','#3a2a1a','#c8a870'],LOM,null,'hyenou',2,'chapardeur',"Le chef des Hyénou du désert. Il vole les dattes de l'Oasis et partage avec toute la meute.");
S18('ninjombre','Ninjombre','OMB',[72,102,66,112],200,30,['#3a2a7a','#8a7ad8','#1a1430'],[...LOM,[30,'abri'],[44,'tranche']],null,0,1,'technicien',"Un ninja d'ombre qui file de toit en toit à Carnavelle. On ne l'a jamais vu entier : seulement son écharpe.");
S18('poupetronce','Poupétronce','OMB',[50,58,52,48],64,170,['#5a8a3a','#c84a6a','#2a3a1a'],[...LOM,[18,'vampigraine']],[32,'vaudoronce'],0,1,'serenite',"Une poupée de feuilles cousue par la sorcière du Marais. Elle danse quand personne ne la regarde.");
S18('vaudoronce','Vaudoronce','OMB',[80,90,78,74],170,60,['#3a5a2a','#a83a5a','#e8d0a0'],[...LOM,[18,'vampigraine'],[36,'sevenoire']],null,'poupetronce',2,'tenace',"Une grande poupée-cactus couverte d'épines. Elle protège la cabane de la sorcière avec une patience infinie.");
// LUMIÈRE
S18('chromoeil','Chromœil','LUM',[46,52,54,62],62,180,['#c8c8d8','#5a8ad8','#3a3a4a'],LLM,[30,'angrito'],0,1,'vigilant',"Un œil de métal tombé d'un satellite. Il regarde les étoiles toute la nuit, comme s'il voulait y retourner.");
S18('angrito','Angrito','LUM',[76,84,80,84],165,75,['#c8c8d8','#e84a4a','#3a3a4a'],LLM,null,'chromoeil',2,'technicien',"Un Chromœil qui a trouvé un corps de métal. Il bougonne sans arrêt, mais protège ses amis.");
S18('tortune','Tortune','LUM',[60,44,70,30],64,170,['#c8a8e8','#6a5a8a','#e8d8a0'],LLM,[[36,'prophetoise'],[0,'prophetoise',{item:'pierreaube'}]],0,1,'serenite',"Une tortue dont la carapace montre des cartes de bonne aventure. Elle ne prédit que de bonnes nouvelles.");
S18('prophetoise','Prophétoise','LUM',[96,80,102,48],230,45,['#e8a830','#c84a2a','#f6e090'],[...LLM,[40,'coupsoleil']],null,'tortune',2,'astral',"La diseuse de bonne aventure du Carnaval. Ses prédictions se réalisent toujours… d'une manière ou d'une autre.");
S18('flanlou','Flanlou','LUM',[58,46,56,44],60,190,['#f6e060','#c87a2a','#3a2a1a'],LLM,[26,'grosflan'],0,1,'medecin',"Un flan caramel qui tremblote quand il rit. Les pâtissiers de Carnavelle le traitent comme un roi.");
S18('grosflan','Grosflan','LUM',[98,70,84,40],160,75,['#f6e060','#c87a2a','#ffffff'],LLM,null,'flanlou',2,'medecin',"Un flan géant couvert de crème. Il n'attaque pas : il s'assoit sur l'adversaire.");
S18('oursaturne','Oursaturne','LUM',[62,62,60,50],66,150,['#e84a3a','#f6c445','#3a2a4a'],LLM,[[34,'ourstral',{time:'n'}]],0,1,'astral',"Un ourson qui joue avec les anneaux d'une planète. Il tombe du ciel les nuits d'étoiles filantes.");
S18('ourstral','Ourstral','LUM',[96,100,88,64],225,45,['#e84a3a','#f6c445','#ffffff'],[...LLM,[38,'meteore']],null,'oursaturne',2,'astral',"Un grand ours cosmique qui lance des comètes. Il revient sur les Dunes chaque nuit pour compter les étoiles.");
S18('masquetotem','Masquetotem','LUM',[80,90,94,80],200,25,['#e84a4a','#ffffff','#2a2a2a'],[...LLM,[24,'mascarade'],[40,'masquesolaire']],null,0,1,'technicien',"Un serpent caché derrière un masque sacré. Il est le symbole du Carnaval de Carnavelle depuis sa fondation.");
S18('chatoeil','Chatœil','LUM',[64,74,60,98],160,75,['#8a8aa8','#e8e8f0','#3a3a4a'],[...LLM,[20,'griffe']],null,0,1,'vigilant',"Un chat au troisième œil qui ne sort que la nuit sur les toits de Carnavelle. Il voit l'avenir… à deux secondes près.");
S18('glifee','Glifée','LUM',[66,62,74,88],165,60,['#b8a8e8','#8a6ad8','#ffffff'],LLM,null,0,1,'lueur',"Une fée de cristal qui danse au-dessus de l'Oasis. Elle laisse derrière elle une traînée d'étincelles.");
// NORMAL
S18('chenillard','Chenillard','NOR',[44,48,44,46],56,200,['#5a9a3a','#e84a4a','#2a2a2a'],LNV,[24,'mantillard'],0,1,'medecin',"Une chenille qui mâchonne les feuilles des Gorges du Vent. Elle devient verte de jalousie quand on mange devant elle.");
S18('mantillard','Mantillard','NOR',[70,90,64,88],150,90,['#4aa83e','#e84a4a','#f0e0a0'],LNV,null,'chenillard',2,'technicien',"Une mante élégante qui se tient toujours droite. Ses pattes tranchent les herbes hautes en un éclair.");
S18('serpinet','Serpinet','NOR',[50,56,44,62],62,180,['#6a8ad8','#e8e0a0','#2a3a6a'],LNV,[28,'bicephale'],0,1,'intimidation',"Un serpent curieux qui passe sa tête partout. Il se fait souvent coincer.");
S18('bicephale','Bicéphale','NOR',[78,88,70,82],160,75,['#5a7ac8','#e8e0a0','#2a3a6a'],LNV,null,'serpinet',2,'intimidation',"Deux têtes, deux avis. Il met une heure à décider où aller, mais il attaque toujours ensemble.");
S18('toucanari','Toucanari','NOR',[46,54,40,70],62,180,['#2a8ac8','#e84a2a','#f6c445'],[[1,'picpic'],[1,'grondement'],[6,'vent'],[10,'coupdeplume'],[15,'aeropique'],[20,'tornade'],[26,'tranche'],[32,'ruade']],[30,'raptoucan'],0,1,'vigilant',"Un oiseau au bec multicolore qui chante les airs du Carnaval. Il ne connaît que trois notes.");
S18('raptoucan','Raptoucan','NOR',[74,92,66,104],170,60,['#2a8ac8','#4aa83e','#e84a2a'],[[1,'picpic'],[1,'grondement'],[6,'vent'],[10,'coupdeplume'],[15,'aeropique'],[20,'tornade'],[26,'tranche'],[32,'ruade'],[40,'megaimpact']],null,'toucanari',2,'intimidation',"Le seigneur des cieux de l'Île Corail. Il plonge sur sa proie depuis les nuages.");
S18('ouistitou','Ouistitou','NOR',[48,52,44,70],60,190,['#c8a070','#f0d8b0','#6a4a2a'],LNV,[28,'capisinge'],0,1,'chapardeur',"Un petit singe farceur qui vole les chapeaux des touristes de l'Île Corail.");
S18('capisinge','Capisinge','NOR',[78,86,70,92],160,75,['#8a5a3a','#f0d8b0','#3a2a1a'],LNV,null,'ouistitou',2,'fidele',"Le chef des singes de l'île. Il porte une cape et se prend pour un héros, et il en est un.");
S18('helichat','Hélichat','NOR',[60,64,56,96],150,90,['#5a5a5a','#e8c870','#2a2a2a'],[...LNV,[20,'aeropique']],null,0,1,'turbo',"Un chat avec une hélice sur la tête. Personne ne sait d'où elle vient, et lui non plus.");
S18('hibougris','Hibougris','NOR',[50,52,50,58],62,180,['#a8a8a8','#e8d8b0','#4a4a4a'],[[1,'picpic'],[1,'hypnose'],[6,'vent'],[10,'coupdeplume'],[15,'aeropique'],[21,'clairlune'],[27,'tornade'],[33,'tranche']],[[0,'hiboumage',{item:'pierrelune'}]],0,1,'vigilant',"Un hibou sage qui veille sur les Gorges la nuit. Il hoche la tête quand il est d'accord.");
S18('hiboumage','Hiboumage','NOR',[80,78,78,92],170,60,['#e8e8f0','#a8a8a8','#f6c445'],[[1,'picpic'],[1,'hypnose'],[6,'vent'],[10,'coupdeplume'],[15,'aeropique'],[21,'clairlune'],[27,'tornade'],[33,'tranche'],[40,'oracle']],null,'hibougris',2,'serenite',"Un Hibougris touché par la lumière de la lune. Ses plumes brillent comme de l'argent.");
S18('lapitesse','Lapitesse','NOR',[50,54,46,76],62,180,['#a8a8a8','#e8e8f0','#4a4a4a'],LNV,[30,'lapisaure'],0,1,'turbo',"Un lapin qui court plus vite que son ombre. Littéralement : son ombre arrive après lui.");
S18('lapisaure','Lapisaure','NOR',[86,92,78,84],170,60,['#8a8a8a','#e8e8f0','#3a3a3a'],[...LNV,[36,'seisme']],null,'lapitesse',2,'tenace',"Un lapin qui a mangé trop de carottes géantes. Il ressemble maintenant à un dinosaure et en est très fier.");
S18('fourmilou','Fourmilou','NOR',[52,52,48,48],60,190,['#c8a070','#f0d8b0','#6a4a2a'],LNV,[24,'fourmilame'],0,1,'flair',"Un petit fourmilier au museau qui renifle tout. Il déterre des objets oubliés dans les Dunes.");
S18('fourmilame','Fourmilame','NOR',[76,84,70,74],150,90,['#a87a4a','#f0d8b0','#4a3a2a'],[...LNV,[30,'ensablement']],null,'fourmilou',2,'flair',"Sa langue est aussi longue que lui. Les fourmis du Tombeau ont appris à le craindre.");
['djinnflamme','nudiflor','nudisprit','helifeuille','copterbe','parasolis','meduchoc','nocturaile','draplin','possedrap','chromoeil','glifee','toucanari','raptoucan','hibougris','hiboumage','helichat','oasiphant','gelilou'].forEach(k=>FLY.add(k));
// Ordre du Pixédex : les familles 18.0 avant les légendaires, puis Oasiphant et Djinnflamme parmi eux
{const LG=['oasiphant','djinnflamme'],i=DEX.indexOf('heliote');DEX.splice(i<0?DEX.length:i,0,...V18SP.filter(k=>!LG.includes(k)));const j=DEX.indexOf('errenard');DEX.splice(j<0?DEX.length:j,0,...LG)}
for(const k of V18SP)SP[k].learn=[...SP[k].learn].sort((a,b)=>a[0]-b[0]);
// Les anciennes familles apprennent aussi quelques capacités 18.0
addLearn(LC2,30,'tempetesable');addLearn(LV2,22,'courtcircuit');addLearn(LO2,34,'cauchemar');addLearn(LL2,30,'oracle');addLearn(LE2,20,'ressac');addLearn(LN2,14,'tornade');
