// =====================================================================
// VERSION 20.0 — LES TERRES DE GIVRE · Données : le type GLACE, ses capacités, ses objets et 15 nouvelles espèces
// (sprites Tuxemon, voir CREDITS.md). Le monde et l'histoire sont dans y2-v20-givre.js.
// =====================================================================
// --- Type GLACE : super efficace contre PLANTE et ÉLEC ; résiste à GLACE et EAU ; craint FEU et ROCHE.
TY.GLA=['GLACE','#4ab4e0'];
EF.GLA={PLA:2,ELE:2,FEU:.5,EAU:.5,GLA:.5};EF.FEU.GLA=2;EF.ROC.GLA=2;EF.EAU.GLA=.5;
// --- Capacités 20.0 : [id, nom, type, puissance, précision, PP, effet, chance %, priorité] (effets déjà connus des trois moteurs de combat)
[['poudreuse','Poudreuse','GLA',40,100,30,'spd-',10],['ventglacial','Vent Glacial','GLA',55,95,15,'spd-',100],['crocgivre','Croc Givre','GLA',65,95,15,'crit'],
 ['eclatgivre','Éclat de Givre','GLA',75,100,15,'def-',20],['avalanche','Avalanche','GLA',90,100,10],['rayonglace','Rayon Glace','GLA',90,100,10,'par',10],
 ['blizzard','Blizzard','GLA',110,70,5,'spd-',30],['armuregivre','Armure de Givre','GLA',0,0,10,'def+2'],['souffleboreal','Souffle Boréal','GLA',120,95,5,'spd-',50],
 ['eclatsolaire','Éclat Solaire','FEU',80,100,10,'brn',20]
].forEach(([id,n,t,p,a,pp,e,ch,pr])=>MV[id]={id,n,t,p,a,pp,e,ch:p?ch||0:100,pr:pr||0});
// Effet visuel des attaques GLACE : éclats de givre et poudreuse
{const vfx20=vfx;vfx=async function(t,s){if(t!=='GLA')return vfx20.apply(this,arguments);const A=s?FOE:ME,T=s?ME:FOE;
 burstAt(A,8,['#ffffff','#9ae0ff'],1.5,{g:-.05});await wait(120);await shoot(A,T,12,i=>({c:i%3?'#bfefff':'#ffffff',s:i%3?5:3}));
 burstAt(T,20,['#e8f8ff','#9ae0ff','#ffffff'],3,{g:.08});for(let i=0;i<16;i++)spawn({x:T[0]+(Math.random()-.5)*70,y:T[1]-30-Math.random()*20,vx:(Math.random()-.5)*.5,vy:.6+Math.random(),l:36,c:i%2?'#ffffff':'#c8f0ff',s:4});B.tint={c:'#9ae0ff',a:.18}}}

// --- Objets 20.0
Object.assign(IT,{
 givrecapsule:['Givre Capsule',1000,'Taux x3 sur les créatures GLACE et EAU, sinon x1. Vendue à Frimas.',3,'ball'],
 chocolat:['Chocolat Chaud',700,'Une tasse fumante de Frimas. Soigne 120 PV.',120,'heal'],
 pierregivre:['Pierre Givre',3000,'Froide comme un matin d\'hiver. Fait évoluer certaines créatures.',0,'evo'],
 glacon:['Glaçon Éternel',0,'À tenir. Attaques GLACE x1,2.','GLA','held'],
 cristal:['Cristal de Givre',0,'Un cristal qui ne fond jamais, même au soleil. Se revend 5 000 pièces.',0,'sell'],
 moufle:['Moufle Perdue',0,'Une moufle tricotée main, couverte de neige. Mamie Flocon, à Frimas, en a perdu trois.',0,'quest'],
 coeurgivre:['Cœur de Givre',0,'Un cristal qui bat doucement, comme un cœur. Il vient du fond du Glacier.',0,'quest']});
BOOST.GLA='glacon';Object.assign(SELLV,{cristal:5000});
{const bm20=ballMul;ballMul=function(k){if(k==='givrecapsule'){const t=SP[B.foe.sp].t;return t==='GLA'||t==='EAU'?3:1}return bm20(k)}}
const V20DISC=['blizzard','rayonglace','avalanche','eclatsolaire'];
V20DISC.forEach((m,i)=>{DISCS.push(m);IT['dc_'+m]=[`DC${String(DISCS.length).padStart(2,'0')} ${MV[m].n}`,[6000,5000,4500,5000][i],`Disque Cycle. Enseigne ${MV[m].n} (${TY[MV[m].t][0]}) à une créature compatible. Réutilisable.`,m,'disc']});
Object.assign(ICO,{givrecapsule:icon(BALLR,{r:'#9ae0ff',R:'#3a8ac0',w:'#ffffff'}),chocolat:icon(POT,{p:'#a8683a',P:'#6a3a1a',l:'#f0d8b8'}),
 pierregivre:icon(SHARDP,{y:'#c8f0ff',Y:'#5aaad8'}),glacon:icon(GEM,{c:TY.GLA[1],C:mix(TY.GLA[1],C.ink,.4)}),cristal:icon(SHARDP,{y:'#e8faff',Y:'#8ad0f0'}),
 moufle:icon(["..oooo..",".orrrro.","orrrrrro","orwrwrro","orrrrrro","orrrrro.",".orrro..","..ooo..."],{r:'#d84a5a'}),
 coeurgivre:icon(["........",".oo..oo.","obbo.obo","obbbobbo",".obbbbo.","..obbo..","...oo...","........"],{b:'#9ae0ff'})});
for(const m of V20DISC)ICO['dc_'+m]=icon(["..oooo..",".owwwwo.","owbbbbwo","owbooBwo","owboobwo","owbbbbwo",".owwwwo.","..oooo.."],{b:TY[MV[m].t][1],B:'#ffffff'});

// --- Apprentissages 20.0
const LGB=[[1,'picpic'],[1,'poudreuse'],[5,'vent'],[9,'ventglacial'],[14,'coupdeplume'],[19,'aeropique'],[24,'eclatgivre'],[30,'tornade'],[36,'rayonglace'],[44,'blizzard']],
 LGY=[[1,'charge'],[1,'poudreuse'],[6,'grondement'],[10,'crocgivre'],[15,'doublecoup'],[20,'eclatgivre'],[26,'avalanche'],[32,'seisme'],[38,'blizzard'],[44,'megaimpact']],
 LGC=[[1,'charge'],[1,'durcir'],[6,'poudreuse'],[11,'eclatgivre'],[16,'armuregivre'],[22,'ruade'],[28,'avalanche'],[35,'tomberoche'],[42,'blizzard']],
 LGP=[[1,'liane'],[1,'charge'],[5,'vampigraine'],[10,'feuille'],[16,'poudreuse'],[22,'lamefeuille'],[28,'armuregivre'],[34,'eclatgivre'],[40,'floral'],[46,'blizzard']],
 LGW=[[1,'morsure'],[1,'poudreuse'],[6,'grondement'],[10,'crocgivre'],[16,'viveatk'],[22,'eclatgivre'],[28,'griffeombre'],[34,'avalanche'],[40,'rayonglace']],
 LGS=[[1,'charge'],[1,'durcir'],[6,'jetpierre'],[10,'brique'],[16,'eclatroc'],[22,'abri'],[28,'tomberoche'],[34,'ventglacial'],[40,'rayonglace']];
const V20SP=[];const S20=(...a)=>{S(...a);V20SP.push(a[0])};
S20('piaflocon','Piaflocon','GLA',[45,50,42,66],62,190,['#c2f6f9','#f2c79b','#565757'],LGB,[24,'herongel'],0,1,'vigilant',"Un petit oiseau qui gonfle ses plumes pour avoir chaud. Il sautille dans la neige fraîche en laissant des étoiles de pattes.");
S20('herongel','Hérongel','GLA',[68,72,64,86],150,90,['#e4f2f4','#594f46','#bcc8c6'],LGB,[38,'aiglacier'],'piaflocon',2,'vigilant',"Il pêche immobile dans les lacs gelés, sur une seule patte, pendant des heures. Les poissons le prennent pour un glaçon.");
S20('aiglacier','Aiglacier','GLA',[88,100,84,108],240,45,['#98c7cc','#d3f5f7','#667273'],LGB,null,'piaflocon',3,'intimidation',"Le seigneur des cimes. Quand il déploie ses ailes de givre, la tempête se lève derrière lui.");
S20('givrelin','Givrelin','GLA',[62,66,56,44],66,170,['#40afd7','#68d1c5','#232e4b'],LGY,[32,'yetimont'],0,1,'tenace',"Un petit yéti grognon qui lance des boules de neige à tout ce qui bouge. Il adore qu'on les lui renvoie.");
S20('yetimont','Yétimont','GLA',[112,118,92,52],235,45,['#33b3c0','#b6edd1','#0e80f5'],[...LGY,[50,'avalanche']],null,'givrelin',2,'tenace',"La légende des montagnes. On ne voit souvent que ses empreintes, larges comme une table, qui s'arrêtent au bord d'une falaise.");
S20('cabrigel','Cabrigel','GLA',[56,58,62,48],64,180,['#bcc9cb','#54b4e2','#495c5f'],LGC,[33,'cornegivre'],0,1,'fermete',"Un chevreau à la toison de neige. Il grimpe les parois verglacées sans jamais glisser.");
S20('cornegivre','Cornegivre','GLA',[100,96,110,50],220,60,['#a4e3f7','#4a678a','#7399d8'],LGC,null,'cabrigel',2,'fermete',"Son épaisse toison le protège des pires blizzards. Ses cornes de glace sonnent comme des cloches quand il charge.");
S20('pinouce','Pinouce','PLA',[48,46,58,42],60,190,['#a6cf77','#e8e656','#606b48'],LGP,[[0,'sapigivre',{item:'pierregivre'}]],0,1,'seve',"Une jeune pousse de pin qui se faufile entre les rochers. Au contact du grand froid, ses aiguilles se couvrent de givre.");
S20('sapigivre','Sapigivre','GLA',[86,84,104,56],200,75,['#217a54','#c5cdd1','#37ae74'],LGP,null,'pinouce',2,'cuirasse',"Un sapin couvert de neige qui ne perd jamais ses aiguilles. Les Piaflocon s'abritent dans ses branches pendant les tempêtes.");
S20('louvigel','Louvigel','GLA',[72,94,66,96],175,60,['#6ebdd0','#5866a2','#e8f4f8'],LGW,null,0,2,'intimidation',"Il chasse en meute les nuits de pleine lune. Son hurlement fait tomber le givre des branches.");
S20('vivacier','Vivacier','ROC',[60,64,80,50],70,160,['#5c5c8e','#464958','#2b2a31'],LGS,[34,'boreaserp'],0,1,'cuirasse',"Un serpent aux écailles d'acier qui dort enroulé dans les éboulis. Le froid le rend lent… mais jamais fragile.");
S20('boreaserp','Boréaserp','GLA',[90,92,96,92],225,45,['#4141a6','#7c69d2','#bad1d7'],[...LGS,[46,'blizzard']],null,'vivacier',2,'cuirasse',"Un Vivacier qui a hiverné au cœur du Glacier. Sa queue porte un pompon de neige qui ne fond jamais.");
S20('stellagel','Stellagel','GLA',[80,88,76,104],210,25,['#4caed8','#0f1745','#f0c860'],[[1,'poudreuse'],[1,'lueur'],[10,'ventglacial'],[18,'clairlune'],[26,'eclatgivre'],[34,'rayonglace'],[42,'prisme'],[50,'blizzard']],null,0,2,'echo',"Il ne se montre que les nuits d'étoiles filantes, au-dessus des glaciers. Ses ailes reflètent un ciel qui n'existe pas encore.");
S20('grelotin','Grelotin','GLA',[70,48,62,58],120,120,['#d8c8b0','#ab9173','#554a3c'],[[1,'charge'],[1,'poudreuse'],[5,'grimace'],[10,'ventglacial'],[15,'soin'],[20,'eclatgivre'],[26,'armuregivre'],[32,'rayonglace']],null,0,1,'chapardeur',"Il frissonne tout le temps, même au soleil. Il ramasse tout ce qui brille et le cache dans sa fourrure.");
S20('hivernel','Hivernel','GLA',[105,112,100,98],300,3,['#405ba5','#b7cbff','#807ce2'],[[1,'poudreuse'],[1,'armuregivre'],[1,'rayonglace'],[40,'avalanche'],[45,'blizzard'],[50,'souffleboreal'],[55,'soin']],null,0,1,'fermete',"Le gardien oublié des saisons. Quand le Cycle s'est arrêté, il s'est endormi au fond du Glacier, et l'hiver avec lui.");
['piaflocon','herongel','aiglacier','stellagel','hivernel'].forEach(k=>FLY.add(k));
DEX.push(...V20SP);
// Le grand froid gagne quelques anciennes familles : Flocelin, Eskichiot et Givrechien deviennent GLACE, d'autres apprennent le givre
for(const k of['flocelin','eskichiot','givrechien'])if(SP[k])SP[k].t='GLA';
const learn20=(k,lv,mv)=>{if(!SP[k])return;SP[k].learn=[...SP[k].learn];addLearn(SP[k].learn,lv,mv)};
learn20('flocelin',8,'poudreuse');learn20('flocelin',18,'ventglacial');learn20('eskichiot',12,'crocgivre');learn20('eskichiot',26,'eclatgivre');
learn20('givrechien',12,'crocgivre');learn20('givrechien',26,'eclatgivre');learn20('givrechien',38,'blizzard');
learn20('laitgivre',24,'eclatgivre');learn20('givrelaitue',24,'eclatgivre');learn20('lucifrimas',40,'rayonglace');learn20('angeflocon',30,'rayonglace');learn20('demoniflocon',30,'crocgivre');
