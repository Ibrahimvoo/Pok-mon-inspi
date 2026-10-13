// =====================================================================
// VERSION 20.0 — LES TERRES DE GIVRE
//  - Après la première aube (v193fin), il neige sur Lunévie : le Col du Givre s'ouvre au nord (v20a).
//  - Col du Givre : congères (une créature FEU les fait fondre), plaques de glace où l'on glisse, le Yétimont des cimes (v20yeti).
//  - Frimas : Neva et l'Arène Givre (badge6, terrain Givre), la boutique, Mamie Flocon et ses moufles (v20mf), le pêcheur pingouin (v20pg).
//  - Lac Gelé : la glace jusqu'au Glacier, gardé par le lieutenant Grésil des Figés (v20gres) ; Frère Hivert raconte Hivernel.
//  - Cœur du Glacier : Boréa veut figer les saisons (v20w : tes mots ; v20bor), Hivernel s'éveille (legG), épilogue (v20done).
//  - Ensuite, l'hiver est une saison : un jour sur trois, la neige tombe sur Lunévie (et des créatures GLACE avec elle).
// Les puzzles de glace ont été vérifiés par un solveur : toujours solubles, et l'on peut toujours revenir à l'entrée.
// =====================================================================
const F20=()=>f()||{};
// ---------------------------------------------------------------- Congères : une créature FEU les fait fondre (comme ronces, rochers et brasiers)
SOLID.add('z');AFF0.z=['FEU','Une congère de neige tassée bloque le passage.','faire fondre la congère','fait fondre la congère','FEU','#ff9a2a'];
let CONG20=null;
function cong20(){return CONG20||(CONG20=mkc(32,40,g=>{const P=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
 P('rgba(60,80,120,.35)',3,34,26,5);P('#b8cce4',2,20,28,16);P('#d8e6f6',3,14,26,16);P('#eef6fe',6,9,20,14);P('#ffffff',9,6,14,8);P('#ffffff',5,15,8,5);
 P('#c8d8ee',19,22,9,8);P('#a6bcd8',2,33,28,3);P('#ffffff',11,7,6,2);P('#e0ecf8',22,13,4,3)}))}
// ---------------------------------------------------------------- Glace : on glisse jusqu'au premier obstacle
function ice20Paint(M){const g=M.L.getContext('2d'),R=M.rows;for(let y=0;y<R.length;y++)for(let x=0;x<R[0].length;x++){if(R[y][x]!=='i')continue;
 const ox=x*32,oy=y*32,h=HSH(x*5+2,y*9+1)>>>0,e=(a,b)=>R[b]?.[a]!=='i';
 g.fillStyle='#b4def4';g.fillRect(ox,oy,32,32);g.fillStyle='#cdeefc';g.fillRect(ox+2,oy+2,28,28);
 g.fillStyle='#ffffff';for(let k=0;k<2;k++){const sx=ox+3+((h>>>(k*5))%20),sy=oy+4+((h>>>(k*5+3))%20);g.fillRect(sx,sy,6,2);g.fillRect(sx+2,sy+2,6,2)}
 g.fillStyle='#96cbe8';if(h%3===0)g.fillRect(ox+2+((h>>>8)%22),oy+4+((h>>>12)%22),8,1);if(h%5===1)g.fillRect(ox+4+((h>>>9)%18),oy+6+((h>>>13)%18),1,6);
 g.fillStyle='rgba(70,130,180,.45)';if(e(x,y-1))g.fillRect(ox,oy,32,3);if(e(x-1,y))g.fillRect(ox,oy,3,32);g.fillStyle='rgba(255,255,255,.7)';if(e(x,y+1))g.fillRect(ox,oy+29,32,3);if(e(x+1,y))g.fillRect(ox+29,oy,3,32)}}
{const bm20=buildMap;buildMap=function(M){const fresh=!M.L;bm20(M);if(!fresh)return;M._snowB=!!M.snow;if(!M.ice20)return;
 if(M.rows.some(r=>r.includes('i')))ice20Paint(M);
 if(M.tint20){const g=M.L.getContext('2d');g.fillStyle=M.tint20;g.fillRect(0,0,M.L.width,M.L.height)}
 if(!isInt(M)){let n=0;M.rows.forEach((r,y)=>{for(let x=0;x<r.length;x++)if(r[x]==='z'){sprAt(M,cong20(),x*32,(y+1)*32);n++}});if(n)for(const r of M.S)if(r)r.sort((a,b)=>a.by-b.by||a.x-b.x)}}}
let SLIDE20=null;const ice20=(x,y)=>MAPS[G.map]?.rows[y]?.[x]==='i';
function slide20(d){const M=MAPS[G.map],tx=G.x+DX[d],ty=G.y+DY[d],c=M.rows[ty]?.[tx];
 if(c==null||SOLID.has(c)||M.doors?.[tx+','+ty]||npcs(M).some(n=>n.x===tx&&n.y===ty||n.rx===tx&&n.ry===ty))return false;
 G.dir=d;move={fx:G.x,fy:G.y,tx,ty,t:0};folFollow(G.x,G.y);if(Math.random()<.5)AMB.push({k:'dst',x:G.x*TS+16,y:G.y*TS+28,l:14,ml:14});return true}
{const uw20=updWorld;updWorld=function(dt){
 if(G&&!move&&!busy&&mode==='world'){if(SLIDE20!=null){const d=SLIDE20;SLIDE20=null;if(ice20(G.x,G.y)&&slide20(d))return}
  const F=F20();if(!ui.text){if(G.map==='lunevie'&&F.v193fin&&!F.v20a)return void run(lune20);if(G.map==='frimas'&&F.v20a&&!F.v20b&&G.y>=17)return void run(frimas20)}}
 const m=move,r=uw20.apply(this,arguments);if(m&&!move&&ice20(G.x,G.y)){SLIDE20=G.dir;if(!F20().tip_ice20)tip('ice20','Sur la glace, on glisse tout droit jusqu\'au premier obstacle : rocher, statue, mur… Choisis bien ta direction avant de t\'élancer !')}return r}}
{const lm20=loadMap;loadMap=function(map){SLIDE20=null;const M=MAPS[map];if(M&&M._snowB!==undefined&&M._snowB!==!!M.snow)M.L=null;return lm20.apply(this,arguments)}}
// ---------------------------------------------------------------- Terrain Givre (Arène de Neva) : GLACE x1,3 · FEU x0,8
{const pw20=power;power=function(a,v){let k=pw20(a,v);if(B?.field==='givre'){if(v.t==='GLA')k*=1.3;else if(v.t==='FEU')k*=.8}return k}}
{const af20=arenaField;arenaField=async function(k){if(k!=='givre')return af20(k);B.field=k;ui.flash=.6;ui.flashC='#e0f6ff';sfx('shard');
 return say('Terrain Givre ! Le sol de l\'arène est une patinoire : GLACE x1,3 · FEU x0,8.',0,1)}}
// ---------------------------------------------------------------- Décors : canons à neige de Boréa
{const do20=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='canon20')return do20(k,sx,sy,t,n);const on=!F20().v20bor,bl=(t/260|0)%2;
 X.drawImage(SHD2,sx+3,sy+24,26,8);R(X,C.ink,sx+5,sy+8,22,22);R(X,'#8a98ac',sx+6,sy+9,20,20);R(X,'#c8d4e4',sx+6,sy+9,20,3);R(X,'#5a6678',sx+6,sy+26,20,3);
 R(X,C.ink,sx+12,sy,8,10);R(X,'#6a7890',sx+13,sy+1,6,8);R(X,on?(bl?'#5ad0f0':'#2a8ab8'):'#3a3a48',sx+9,sy+14,4,4);R(X,on?'#e84a4a':'#3a3a48',sx+19,sy+14,4,4);
 if(on&&n&&Math.random()<.15)AMB.push({k:'pf',x:n.x*TS+16,y:n.y*TS+2,vx:(Math.random()-.5)*.6,vy:-.8-Math.random()*.6,l:30,ml:30,c:'#ffffff'})}}
// ---------------------------------------------------------------- Lieux
IST.givre={fl:['flLab'],wall:'wallMint',top:'#1c2836',rug:'b'};
Object.assign(BLD,{frimas:{R:'bHouse3',A:'bHouse4',G:'bCenter',B:'bMart',Y:'bGymW'}});
ICO.bGiv=icon(["...o....","o.oyo.o.",".oyYyo..","oyYwYyo.",".oyYyo..","o.oyo.o.","...o....","........"],{y:'#9ae0ff',Y:'#4ab4e0'});
REPN.frimas='Frimas';REPG.frimas=[['chocolat',5],['glacon',1]];Object.assign(TOWN,{col:'frimas',frimas:'frimas',gym6:'frimas',maisonF:'frimas',refuge:'frimas',lacgele:'frimas',glacier:'frimas'});
const T20=(x,y,t,d,id,name,team,money,pre,after,post,o={})=>T18(x,y,t,d,id,name,team,money,pre,after,post,o);
// Lunévie : le passage du nord (fermé par les arbres jusqu'au premier hiver), la neige un jour sur trois après le chapitre
MAPS.lunevie.rows0=null;MAPS.lunevie.rows[0]=MAPS.lunevie.rows[0].slice(0,10)+'QQ'+MAPS.lunevie.rows[0].slice(12);
MAPS.lunevie.sw={...(MAPS.lunevie.sw||{}),Q:()=>F20().v20a?'=':'T'};MAPS.lunevie.edges.n=['col',0];
const winter20=()=>{const F=F20();return!!(F.v20a&&(!F.v20done||dayN()%3===0))};
Object.defineProperty(MAPS.lunevie,'snow',{get:winter20,configurable:true});
{let E0=MAPS.lunevie.enc;Object.defineProperty(MAPS.lunevie,'enc',{get:()=>winter20()?[...E0,['piaflocon',19,23,22],['givrelin',19,23,16],['grelotin',21,24,8],['flocelin',19,23,10]]:E0,set:v=>{E0=v},configurable:true})}

MAPS.col={name:'Col du Givre',bg:'mont',amb:'mont',snow:1,ice20:1,mus:'mont',edges:{s:['lunevie',0],n:['frimas',2]},
 rows:["^^^^^^^^^^..^^^^^^^^^^^^","^^^^^^^^^^..^^^^^^^^^^^^","^^^,,,,^^^..^^^^,,,,,^^^","^^,,,,,,..==..,,,,,,,,^^","^^,,,,,....=....,,,,,,^^","^^^^^......=.....o...^^^","^^^^^^^^^^^.^^^^^^^^^^^^","^^..z......=......,,,.^^","^^..^^^....=.....,,,,.^^","^^..^^^S...=......,,,.^^","^^..^^^....=..........^^","^^..^^^^^^^.^^^^^^^^^^^^","^^..^^^iiioiiioi^^^^^^^^","^^..^^^ioiioiiii^^,,,^^^","^^..^^^iiiiiooii^^,,,^^^","^^..^^^iiiiiiiii^^^k^^^^","^^..^^^oiiiiiiii^^...^^^","^^..^^^iiiiiiiii^^...^^^","^^..^^^iiiiiiiii.....^^^","^^..^^^.........^^^^^^^^","^^..,,,....=....,,,,..^^","^^..,,,....=....,,,,..^^","^^.........=.......o..^^","^^,,,..o...=....,,,...^^","^^,,,......=....,,,...^^","^^.....S...==.........^^","^^,,,,......=...,,,,..^^","^^,,,,......=...,,,,..^^","^^^^^^^^^^..^^^^^^^^^^^^","^^^^^^^^^^..^^^^^^^^^^^^"],
 enc:[['piaflocon',45,48,16],['givrelin',45,48,14],['cabrigel',45,48,14],['pinouce',45,47,12],['vivacier',46,48,10],['flocelin',46,48,8],['grelotin',46,49,6],['louvigel',47,49,8,'n'],['eskichiot',46,48,8,'n'],['stellagel',50,52,3,'s']],
 signs:{'7,9':'COL DU GIVRE\nNord : Frimas. Sud : Lunévie.\n« Sur la glace, on ne s\'arrête que contre un obstacle. »','7,25':'COL DU GIVRE\nAttention : congères et plaques de glace.\nUne créature FEU fait fondre la neige tassée.'},
 hidden:[{x:3,y:8,it:'moufle',q:1,id:'mf1'},{x:20,y:13,it:'cristal',q:1,id:'colh2'},{x:2,y:3,it:'chocolat',q:2,id:'colh3'}],
 npcs:[{x:11,y:6,t:'mon',sp:'yetimont',d:0,cond:()=>!F20().v20yeti,fn:n=>yeti20(n)},
  T20(5,21,'girl',3,'cola','Skieuse Lou',[['piaflocon',46],['cabrigel',47],['pinouce',47]],2200,'Tu as vu cette poudreuse ? Parfaite pour un combat !','Je retourne sur les pistes…','La glace du Col, c\'est une patinoire : tu glisses jusqu\'à ce qu\'un rocher t\'arrête. Regarde bien avant de t\'élancer !'),
  T20(14,23,'fige',2,'colb','Sbire des Figés',[['givrelin',47],['louvigel',48]],2400,'Halte ! Boréa a dit : personne ne passe le Col. Le monde doit rester tel qu\'il est !','Brr… Même mes créatures grelottent.','Boréa veut figer les saisons. Plus de changement, plus de perte. C\'est beau, non ? …Non ?'),
  T20(17,9,'mountaineer',2,'colc','Alpiniste Igor',[['vivacier',48],['cornegivre',49]],2500,'Plus haut, un Yétimont énorme bloque le passage. Il est furieux ! Montre-moi d\'abord que tu es prêt.','Tu es prêt. Lui, je ne sais pas.','Les Yétimont vivaient près du Glacier. Ces gens en blanc les ont chassés, et maintenant ils sont furieux.'),
  T20(6,3,'fige',3,'cold','Sbire des Figés',[['louvigel',49],['sapigivre',49]],2500,'Tu as passé le Yétimont ?! Impossible !','Je vais prévenir le lieutenant Grésil…','Le lieutenant Grésil garde le Lac Gelé, au nord de Frimas. Il n\'a jamais perdu un combat.'),
  T20(18,3,'scout',2,'cole','Skieur Hugo',[['herongel',49],['sapigivre',49],['grelotin',48]],2500,'Frimas est juste au nord ! Mais d\'abord, un petit slalom… de combat !','Tu skies mieux que moi, c\'est sûr.','À Frimas, Neva est la Championne. Elle patine sur la glace de son arène comme si elle volait.'),
  I(20,7,'chocolat',2,'colb1'),I(2,18,'givrecapsule',3,'colb2'),I(19,13,'pierregivre',1,'colb3'),I(19,18,'maxpotion',1,'colb4')]};

MAPS.frimas={name:'Frimas',bg:'plaine',amb:'day',snow:1,mus:'town',edges:{s:['col',-2],n:['lacgele',-1]},
 rows:["TTTTTTTTTTTT..TTTTTTTTTTTT","TT..........==..........TT","TT..RRRRR...==...AAAAA..TT","TT..RRRRR...==...AAAAA..TT","TT..WnWDW...==...WnWDW..TT","TT.....=....==......=...TT","TT.....==============...TT","TT..........==..........TT","TT.GGGGG...l==l..YYYYY..TT","TT.GGGGG....==...YYYYY..TT","TT.WnDnW....==...WnDnW..TT","TT...=......==.....=....TT","TT...===============....TT","TT..........==..........TT","TT.BBBBB..S.==....~~~~..TT","TT.BBBBB....==...~~~~~~.TT","TT.WnDnW....==...~~H~~~.TT","TT...=......==...~~H~~~.TT","TT...=========..........TT","TT..........==..........TT","TTTTTTTTTTTT..TTTTTTTTTTTT","TTTTTTTTTTTT..TTTTTTTTTTTT"],
 doors:{'7,4':['maisonF',4,5,1],'20,4':['refuge',4,5,1],'5,10':()=>center('Frimas',['frimas',5,11]),'19,10':['gym6',5,10,1],'5,16':()=>frimasShop()},
 signs:{'10,14':'FRIMAS\n« Le village où l\'hiver dormait. »\nNord : Lac Gelé. Sud : Col du Givre.'},
 fish:[['flocelin',46,49,40],['eskichiot',46,49,30],['tetardin',45,48,30]],fish2:[['herongel',48,51,40],['crapaflot',47,50,45],['boreaserp',50,52,15]],
 npcs:[N18(9,7,'kid',0,'Petit Anouk',()=>F20().v20done?'Neva m\'apprend à patiner ! Je tombe tout le temps, mais c\'est rigolo.':F20().v20b?'Les gens en blanc disent que l\'hiver ne finira jamais. Moi j\'aime l\'hiver… mais j\'aimerais bien voir des fleurs, une fois.':'Un étranger ! Tu viens du sud ? C\'est vrai que chez vous, il y a des fleurs ?'),
  N18(15,13,'old',2,'Vieux Joran',()=>F20().v20done?'Ce matin, j\'ai vu un perce-neige. Le premier de ma vie ! Il paraît que ça veut dire que le printemps viendra.':'Pendant trois cents ans, la neige n\'a jamais fondu ici. Nos grands-parents disaient que l\'hiver s\'était endormi au fond du Glacier, avec son gardien.'),
  N18(21,18,'pingouin',2,'Monsieur Pingouin',null,{fn:()=>pingouin20(),qm:()=>F20().v20b&&!F20().v20pg}),
  N18(14,19,'rival',1,'Kael',()=>F20().badge6?'Le Badge Givre ! Moi, Neva m\'a battu en trois tours. Elle glisse partout, je n\'ai rien compris. Les Figés sont au Lac Gelé, au nord. Fais attention, d\'accord ?':'Je t\'ai rattrapé ! Valen est resté à Lunévie, il dit qu\'il a « une allergie à la neige ». Neva, la Championne, est dans l\'arène, juste là.',{cond:()=>F20().v20b&&!F20().v20done}),
  {x:15,y:7,t:'borea',d:0,name:'Boréa',tr:TR('borea','Chercheuse Boréa',[['grelotin',58]],6000,'','',{post:'Neva m\'apprend à regarder la neige fondre. C\'est plus difficile que de la figer.'}),los:0,cond:()=>F20().v20done&&F20().v20w===2,fn:n=>boreaF20(n)}]};
MAPS.maisonF={name:'Frimas · Maison de Mamie Flocon',bg:'plaine',amb:'in',style:'home',mus:'town',rows:["XXXXXXXXX","XCFFFFFCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'potPlant'},{x:7,y:1,k:'lampFloor'}],doors:{'4,6':['frimas',7,5,0]},
 npcs:[N18(4,2,'granny',0,'Mamie Flocon',null,{fn:()=>mamie20(),qm:()=>!F20().v20mf||F20().v20mf===1&&(G.bag.moufle||0)>=3}),{x:6,y:3,t:'mon',sp:'grelotin',d:2,fn:()=>say('Le Grelotin de Mamie Flocon grelotte au coin du feu. Il cache quelque chose de brillant dans sa fourrure… une cuillère ?')}]};
MAPS.refuge={name:'Frimas · Refuge des Saisons',bg:'plaine',amb:'in',style:'cit',mus:'town',rows:["XXXXXXXXX","XCFFFFFCX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'lampFloor'},{x:7,y:1,k:'lampFloor'}],doors:{'4,6':['frimas',20,5,0]},
 npcs:[N18(4,2,'moine',0,'Frère Hivert',null,{fn:()=>hivert20()})]};
MAPS.gym6={name:'Arène Givre',bg:'plaine',amb:'in',style:'givre',cstyle:'statue',ice20:1,mus:'gym',rows:["XXXXXXXXXXX","XXXXFFFXXXX","XXXXXFXXXXX","XiiiiiCiiiX","XiiiiCiiiiX","XiiiiiiiiiX","XiiiiiiiiiX","XCiiCiCiCCX","XiiiiiiiiiX","XFFFFFFFFFX","XFFFFFFFFFX","XXXXXEXXXXX"],
 doors:{'5,11':['frimas',19,11,0]},
 npcs:[{x:5,y:1,t:'neva',d:0,name:'Neva',tr:TR('neva','Championne Neva',[['sapigivre',55,['eclatgivre','lamefeuille','armuregivre','vampigraine']],['cornegivre',56,['avalanche','tomberoche','armuregivre','ruade']],['boreaserp',56,['rayonglace','eclatroc','abri','ventglacial'],'baiesoin'],['aiglacier',58,['blizzard','aeropique','rayonglace','tornade'],'glacon']],5800,
   'Tu es arrivé jusqu\'ici sans tomber ? Pas mal ! Sur la glace, il faut savoir où l\'on va avant de partir. En combat aussi. Montre-moi !','Tu as glissé plus loin que moi… Bravo ! Voici le BADGE GIVRE.',
   {vs:1,boss:1,items:2,ev:1,field:'givre',post:()=>F20().v20done?'Hivernel dort de nouveau, mais pas pour toujours : il revient chaque hiver. Reviens me voir, je veux une revanche !':'Les Figés tiennent le Lac Gelé, au nord. Leur lieutenant, Grésil, garde l\'entrée du Glacier. Sois prudent… et ne regarde pas tes pieds sur la glace.',
    win:async()=>{F20().badge6=1;await badgeGet('BADGE GIVRE',ICO.bGiv);give('dc_blizzard');await say('Neva te remet aussi le DC Blizzard ! Une attaque GLACE redoutable, quand elle touche.');await neva20After()}}),los:0,fn:n=>leaderTalk(n,'neva')},
  T20(2,10,'girl',1,'g6a','Patineuse Elsa',[['piaflocon',52],['herongel',53]],1900,'Une pirouette, deux pirouettes… combat !','Je suis tombée sur les fesses. Encore.','Sur la glace de l\'arène, les statues sont tes amies : ce sont elles qui t\'arrêtent.'),
  T20(8,10,'scout',1,'g6b','Patineur Olaf',[['cabrigel',52],['louvigel',53]],1900,'Neva m\'a appris à freiner. Toi, je vais t\'apprendre à perdre !','Je n\'ai pas freiné à temps…','Neva a grandi à Frimas. Elle n\'a jamais vu l\'été. Elle dit qu\'elle n\'est pas pressée.')]};

MAPS.lacgele={name:'Lac Gelé',bg:'lac',amb:'mont',snow:1,ice20:1,mus:'mont',edges:{s:['frimas',1]},
 rows:["^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^,,,...,,,^^^^^^^^","^^^^^^^,,.....,,^^^^^^^^","^^^^^^^^^^^.^^^^^^^^^^^^","^^^^~iiiioiiiiioioio^^^^","^^^^iiiiiiiiiiiiiiii^^^^","^^^^iiiiioiiiiiiiiii^^^^","^^^^iii~iiiiiiiiiiii^^^^","^^^^i~iiiiiiiiiiii~i^^^^","^^^^iioiiioiiiiiiiii^^^^","^^^^iioiiiiiiiiiiiii^^^^","^^^^iiiioiiiiiiiiii~^^^^","^^^^iioiiii~iiiiiiii^^^^","^^^^................^^^^","^^,,,,.....==.....,,,,^^","^^,,,,.....==.....,,,,^^","^^...o.....==.....o...^^","^^.,,,.....==.....,,,.^^","^^.,,,..S..==.....,,,.^^","^^^^^^^^^^^..^^^^^^^^^^^","^^^^^^^^^^^..^^^^^^^^^^^"],
 doors:{'11,2':['glacier',8,14,1]},
 enc:[['herongel',48,51,14],['cabrigel',47,50,12],['cornegivre',49,51,6],['piaflocon',47,49,12],['louvigel',48,51,10,'n'],['sapigivre',49,51,6],['pinouce',47,49,10],['flocelin',47,50,10],['stellagel',51,53,3,'s']],
 fish:[['flocelin',47,50,40],['eskichiot',47,50,30],['herongel',48,51,30]],fish2:[['boreaserp',50,53,30],['herongel',50,52,40],['crapaflot',49,52,30]],
 signs:{'8,20':'LAC GELÉ\n« La glace porte, mais ne retient pas. »\nAu nord : le Glacier.'},
 hidden:[{x:21,y:19,it:'moufle',q:1,id:'mf2'},{x:2,y:16,it:'cristal',q:1,id:'lach2'},{x:15,y:3,it:'pierregivre',q:1,id:'lach3'}],
 npcs:[{x:11,y:4,t:'gresil',d:0,name:'Lieutenant Grésil',cond:()=>!F20().v20gres,fn:n=>gresil20(n)},
  T20(6,17,'fige',3,'laca','Sbire des Figés',[['herongel',50],['givrelin',50],['cabrigel',51]],2600,'Le lac est à nous ! Boréa a dit que plus rien ne changerait ici.','Ça a changé, là. Pour moi.','Le lieutenant Grésil attend de l\'autre côté du lac. Pour le rejoindre, il faut glisser… et réfléchir.'),
  T20(17,18,'fige',2,'lacb','Sbire des Figés',[['vivacier',50],['louvigel',51]],2600,'Tu ne traverseras pas la glace ! …Enfin, si tu y arrives, je ne pourrai rien faire.','J\'aurais dû rester à Lunévie.','Boréa était astronome, avant. Elle regardait les étoiles. Maintenant elle ne regarde plus que la glace.'),
  T20(3,19,'fisher',0,'lacc','Pêcheur Inuk',[['eskichiot',50],['herongel',51],['flocelin',50]],2400,'Chut ! Tu vas faire fuir les poissons sous la glace !','Bon, ils sont partis de toute façon.','Au bout du lac, il y a un trou dans la glace. On y pêche des Boréaserp, avec une bonne canne.'),
  I(18,16,'givrecapsule',3,'lacb1'),I(3,18,'chocolat',2,'lacb2'),I(20,16,'hyperpotion',2,'lacb3')]};

MAPS.glacier={name:'Cœur du Glacier',bg:'grotte',amb:'cave',cave:1,ice20:1,tint20:'rgba(120,190,255,.18)',mus:'ruines',
 rows:["^^^^^^^^^^^^^^^^^^","^^^^^........^^^^^","^^^^^........^^^^^","^^^^^........^^^^^","^^^^^^^^.^^^^^^^^^","^^^^^iiiioioi^^^^^","^^^^^ioiiiiio^^^^^","^^^^^iiioiiii^^^^^","^^^^^iiiiiiii^^^^^","^^^^^oiiiiiii^^^^^","^^^^^........^^^^^","^^^............^^^","^..z...........^^^","^..^^......o...^^^","^^^^^....=....^^^^","^^^^^^^^EE^^^^^^^^"],
 doors:{'8,15':['lacgele',11,3,0],'9,15':['lacgele',11,3,0]},
 enc:[['louvigel',50,53,14],['vivacier',49,52,14],['boreaserp',52,54,6],['grelotin',49,52,12],['givrelin',49,52,14],['cornegivre',51,53,8],['stellagel',52,54,4,'s'],['lucifrimas',53,55,2,'e']],
 hidden:[{x:1,y:13,it:'moufle',q:1,id:'mf3'},{x:12,y:1,it:'cristal',q:2,id:'glah2'}],
 npcs:[{x:8,y:3,t:'borea',d:0,name:'Boréa',cond:()=>!F20().v20bor,fn:n=>borea20(n)},
  OB10(6,2,'canon20',()=>say(F20().v20bor?'Le canon à neige de Boréa est éteint. Il n\'en sort plus qu\'un petit filet de vapeur.':'Un canon à neige relié par des câbles au fond du Glacier. Il aspire une lumière bleue… et souffle un froid mordant.'),{}),
  OB10(10,2,'canon20',()=>say(F20().v20bor?'Le canon à neige de Boréa est éteint.':'Un second canon. Ses câbles plongent dans la glace, vers une lueur qui bat comme un cœur.'),{}),
  {x:8,y:1,t:'mon',sp:'hivernel',d:0,cond:()=>F20().v20bor&&!F20().legG,fn:n=>hivernel20(n)},
  T20(5,11,'fige',3,'gla','Sbire des Figés',[['grelotin',52],['boreaserp',53]],2800,'Encore toi ?! Boréa a presque fini !','Presque… c\'est déjà trop tard pour moi.','Boréa est tout au fond, derrière la glace. Elle parle au Glacier comme s\'il pouvait l\'entendre.'),
  T20(13,13,'fige',2,'glb','Sbire des Figés',[['yetimont',53],['louvigel',53]],2800,'Personne ne dérange Boréa ! Elle sauve le monde !','En le congelant ? …Dit comme ça.','Les canons de Boréa aspirent le Cœur de Givre. Quand il sera gelé, l\'hiver ne finira plus jamais.'),
  I(14,11,'pierregivre',1,'glb1'),I(1,12,'maxpotion',2,'glb2')]};

// ---------------------------------------------------------------- Histoire
const frimasShop=()=>shop18('Vendeuse Solveig','girl','Bienvenue à la boutique de Frimas ! Ici, tout tient chaud… sauf la glace.',['givrecapsule','chocolat','pierregivre','hyperpotion','maxpotion','superrepousse','totalsoin','dc_avalanche','dc_eclatsolaire']);
async function lune20(){const F=F20(),K='Kael',A='Veilleur Anselme',L=[];await cine(1);ui.shake=0;
 const add=(dx,dy,t,name)=>{const p=[G.x+dx,G.y+dy],c=MAPS.lunevie.rows[p[1]]?.[p[0]];if(c&&!SOLID.has(c)&&!npcs(MAPS.lunevie).some(n=>n.x===p[0]&&n.y===p[1])){const n=tmpN('lunevie',{x:p[0],y:p[1],t,d:0,name});L.push(n);faceTo(n,G.x,G.y);return n}return null};
 await say('Quelque chose de froid se pose sur ton nez… Puis un autre flocon. Et un autre. Il NEIGE sur Lunévie !');
 const k=add(1,0,'rival',K)||add(-1,0,'rival',K)||add(0,1,'rival',K);if(k)await emote(k,'!');
 await say('Tu as vu ?! De la neige ! Mamie dit qu\'il n\'a pas neigé ici depuis trois cents ans ! Elle a ressorti un vieux manteau qui sent la naphtaline.',K,0,'rival');
 F.v20a=1;MAPS.lunevie.L=null;refreshMap('lunevie');await wait(300);
 await say('Le Cycle tourne de nouveau… et avec lui, les saisons reviennent. Voici le premier hiver d\'Aurélys depuis la fondation.',A,0,'old');
 ui.shake=10;sfx('roar');await wait(400);await say('Un grondement sourd descend des montagnes, au nord. Puis le silence… et un craquement immense, comme un lac qui se brise.');
 await say('Le Col du Givre ! La glace qui le fermait depuis des siècles vient de céder. Au-delà, il y a Frimas, un village que personne d\'ici n\'a jamais vu.',A,0,'old');
 await say('Un village perdu sous la neige ? On y va ! …Enfin, toi d\'abord. Moi, je dois prévenir Valen. Tiens, prends ça : il va faire froid là-haut.',K,0,'rival');
 give('chocolat',3);await say('Kael te donne trois CHOCOLATS CHAUDS !');
 await fadeTo(1,400);for(const n of L)rmN('lunevie',n);await fadeTo(0,400);await cine(0);
 await say('Au nord de Lunévie, les arbres givrés ont laissé place à un passage. Le Col du Givre t\'attend.');save()}
async function yeti20(n){const F=F20();await cine(1);faceTo(n,G.x,G.y);await emote(n,'!');ui.shake=8;sfx('roar');
 await say('Un Yétimont gigantesque barre le passage ! Il gronde, les yeux pleins de colère… Il a été chassé de chez lui.');await cine(0);
 const r=await battle([mon('yetimont',52)],{legend:1});
 if(r==='win'||r==='catch'){F.v20yeti=1;await say(r==='catch'?'Le Yétimont a rejoint ton équipe ! Le passage est libre.':'Le Yétimont s\'ébroue, puis s\'éloigne vers les cimes en grommelant. Le passage est libre !');save()}}
async function frimas20(){const F=F20(),N='Neva';await cine(1);const n=tmpN('frimas',{x:G.x,y:Math.max(1,G.y-4),t:'neva',d:0,name:N});
 await emote(n,'!');for(let i=0;i<3&&Math.abs(n.y-G.y)>1;i++)await npcStep(n,0);faceTo(n,G.x,G.y);
 await say('Halte ! …Oh, un dresseur. Pardon, je t\'ai pris pour un Figé. Ils portent tous des manteaux blancs.',N,0,'neva');
 await say('Je suis Neva, la Championne de Frimas. Depuis que le Col s\'est ouvert, des gens en blanc arrivent du sud : les Figés. Leur cheffe, Boréa, dit qu\'elle va « sauver Aurélys de son propre Cycle ».',N,0,'neva');
 await say('Ils campent au Lac Gelé, au nord, devant le Glacier. Si tu veux m\'aider, prouve-le d\'abord dans mon arène. La glace ne pardonne pas les hésitations !',N,0,'neva');
 F.v20b=1;await fadeTo(1,300);rmN('frimas',n);await fadeTo(0,300);await cine(0);rep('frimas',1);save()}
async function neva20After(){const N='Neva';await say('Écoute. Le lieutenant de Boréa, Grésil, garde l\'entrée du Glacier, de l\'autre côté du Lac Gelé. Pour le rejoindre, il faut traverser la glace.',N,0,'neva');
 await say('Et autre chose : Frère Hivert, au Refuge des Saisons, connaît la légende du Glacier mieux que personne. Va le voir si tu veux comprendre ce que cherche Boréa.',N,0,'neva');rep('frimas',2);achCheck()}
async function pingouin20(){const F=F20(),P='Monsieur Pingouin';
 if(F.v20pg)return say('Le secret de la pêche sous la glace ? La patience. Et un costume bien chaud. Surtout le costume.',P,0,'pingouin');
 if(!F.v20pgQ){F.v20pgQ=1;await say('Ne fais pas cette tête : c\'est un costume. Le froid, ça ne pardonne pas ! Je pêche ici depuis quarante hivers.',P,0,'pingouin');
  return say('Dis-moi, tu as déjà vu un Hérongel ? Ils pêchent sur une patte, immobiles comme des glaçons. Montre-m\'en un, et je t\'apprendrai mon plus beau secret.',P,0,'pingouin')}
 if(!ownSp('herongel'))return say('Un Hérongel ! Les Piaflocon deviennent Hérongel en grandissant. On en voit aussi pêcher au Lac Gelé, avec une Super Canne.',P,0,'pingouin');
 F.v20pg=1;await say('Un Hérongel ! Regarde cette patience dans le regard… Tiens, tu l\'as bien mérité.',P,0,'pingouin');give('dc_rayonglace');await say('Tu reçois le DC Rayon Glace !');rep('frimas',2);save()}
async function mamie20(){const F=F20(),M='Mamie Flocon',n=G.bag.moufle||0;
 if(F.v20mf===2)return say('Mes moufles sont au sec, grâce à toi. Reviens quand tu veux, il y a toujours du chocolat chaud ici.',M,0,'granny');
 if(!F.v20mf){F.v20mf=1;await say('Oh, un visiteur ! Entre, entre, il fait un froid de Cabrigel dehors. Tiens, un chocolat chaud.',M,0,'granny');give('chocolat');
  return say('Dis-moi… tu n\'aurais pas vu mes moufles ? J\'en ai perdu trois en promenant mon Grelotin : une sur le Col, une au bord du Lac Gelé… et la troisième, je n\'ose pas y penser. Il fouille partout, ce petit.',M,0,'granny')}
 if(n<3)return say(`Tu en as retrouvé ${n} sur 3 ? Mon Grelotin les cache partout, le coquin. Fouille bien la neige !`,M,0,'granny');
 G.bag.moufle-=3;if(!G.bag.moufle)delete G.bag.moufle;F.v20mf=2;await say('Mes trois moufles ! Encore un peu humides, mais entières. Tu es un amour.',M,0,'granny');
 give('glacon');give('chocolat',5);await say('Mamie Flocon te donne un GLAÇON ÉTERNEL et cinq CHOCOLATS CHAUDS !');rep('frimas',3);achCheck();save()}
async function hivert20(){const F=F20(),H='Frère Hivert';
 if(F.v20done)return say(`Les saisons tournent de nouveau. Un jour sur trois, la neige descend jusqu'à Lunévie : c'est l'hiver d'Aurélys. ${F.legG?'Et Hivernel voyage avec toi… prends soin de lui.':'Hivernel dort au fond du Glacier. Il attend peut-être quelqu\'un.'}`,H,0,'moine');
 if(!F.v20b)return say('Bienvenue, voyageur. Ce refuge accueille tous ceux que l\'hiver a surpris.',H,0,'moine');
 await say('Il y a trois siècles, quand les fondateurs ont enchaîné Nocturion et arrêté le Cycle, les saisons se sont arrêtées aussi.',H,0,'moine');
 await say('Hivernel, le gardien de l\'hiver, s\'est endormi au fond du Glacier, et son cœur avec lui. Ici, l\'hiver est resté. Partout ailleurs, il a disparu.',H,0,'moine');
 await say('Maintenant que le Cycle tourne, Hivernel s\'éveille. Mais si quelqu\'un s\'empare de son cœur pendant son sommeil… l\'hiver ne finira plus jamais.',H,0,'moine');
 if(!F.v20hv){F.v20hv=1;give('pierregivre');await say('Frère Hivert te confie une PIERRE GIVRE. « Certaines créatures n\'attendent que le grand froid pour grandir. »')}save()}
async function gresil20(n){const F=F20(),Gr='Lieutenant Grésil';await cine(1);faceTo(n,G.x,G.y);await emote(n,'!');
 await say('Tu as traversé le lac… Impressionnant. Mais personne n\'entre dans le Glacier. Boréa y achève son œuvre.',Gr,0,'gresil');
 await say('Quand le Cœur de Givre sera à elle, l\'hiver ne finira plus. Plus de nuits trop longues, plus d\'éclipses, plus de pertes. Rien ne changera plus jamais.',Gr,0,'gresil');await cine(0);
 const r=await battle(team([['louvigel',55,['crocgivre','griffeombre','avalanche','viveatk']],['herongel',55],['cornegivre',56],['yetimont',57,['avalanche','blizzard','seisme','doublecoup'],'baiesoin']]),{tr:{name:'Lieutenant Grésil',look:'gresil',money:4200,vs:1,boss:1,items:2,after:'La glace a cédé… sous mes pieds.'}});
 if(r!=='win')return;F.v20gres=1;await cine(1);
 await say('Tu ne comprends pas. Boréa a tout perdu à cause du Cycle. Elle veut juste que ça s\'arrête. …Va. Je ne te retiendrai plus.',Gr,0,'gresil');
 await fadeTo(1,300);rmN('lacgele',n);const H=tmpN('lacgele',{x:11,y:4,t:'moine',d:0,name:'Frère Hivert'});await fadeTo(0,300);
 await say('Ah, te voilà. Je t\'ai suivi depuis Frimas, en glissant moins bien que toi. Écoute-moi.','Frère Hivert',0,'moine');
 await say('Boréa a relié des canons à neige au Cœur de Givre, au fond du Glacier. S\'il gèle tout entier, Hivernel ne se réveillera jamais, et l\'hiver restera pour toujours.','Frère Hivert',0,'moine');
 await say('Arrête-la. Et si Hivernel s\'éveille… écoute-le. Il n\'est pas en colère. Il a seulement très, très froid.','Frère Hivert',0,'moine');
 await fadeTo(1,300);rmN('lacgele',H);await fadeTo(0,300);await cine(0);save()}
async function borea20(n){const F=F20(),Bo='Boréa';await cine(1);faceTo(n,G.x,G.y);await emote(n,'…',700);
 await say('Encore un pas, et le Cœur de Givre sera figé pour toujours. Tu arrives trop tard… ou juste à temps pour voir le monde s\'arrêter.',Bo,0,'borea');
 await say('J\'étais astronome, à l\'Observatoire. Quand les nuits étaient trop courtes, mon Piaflocon ne dormait jamais. Un matin, il ne s\'est pas réveillé. Puis l\'éclipse. Puis la fin du monde, presque.',Bo,0,'borea');
 await say('Maintenant, le Cycle recommence, et avec lui les saisons. Les fleurs vont faner. Les créatures vont vieillir. Tout va passer. Avec ce cœur, je peux tout figer. Plus personne ne perdra rien.',Bo,0,'borea');
 const W=['LE CHANGEMENT, C\'EST LA VIE','JE COMPRENDS TA PEINE','TU AS TORT'],w=await choose(W,{w:300,title:'Que réponds-tu à Boréa ?'});F.v20w=w<0?3:w+1;
 await say(['Un monde qui ne change plus, c\'est un monde qui ne vit plus. Les fleurs fanent… mais elles repoussent.','Perdre quelqu\'un, ça fait mal. Mais figer le monde ne le ramènera pas.','Tu veux décider pour tout le monde. Comme les fondateurs, il y a trois cents ans.'][F.v20w-1]);
 await say(F.v20w===2?'…Ne sois pas gentil avec moi. Pas maintenant. Si tu veux m\'arrêter, bats-moi !':F.v20w===1?'Repousser ? Et si rien ne repousse ? …Assez parlé. Montre-moi que tu as raison !':'Comme les fondateurs ?! Je ne suis pas comme eux ! Je vais te le prouver !',Bo,0,'borea');await cine(0);
 const r=await battle(team([['grelotin',58,['soin','rayonglace','armuregivre','eclatgivre'],'baiesoin'],['stellagel',59,['blizzard','prisme','clairlune','rayonglace']],['louvigel',59,['crocgivre','griffeombre','avalanche','viveatk'],'griffe'],['boreaserp',60,['rayonglace','eclatroc','abri','blizzard']],['yetimont',60,['avalanche','seisme','blizzard','megaimpact'],'orbe'],['aiglacier',62,['blizzard','aeropique','rayonglace','tornade'],'glacon']]),
  {tr:{name:'Boréa',look:'borea',money:9000,vs:1,boss:1,items:2,ev:1,field:'givre',after:'…Le froid… ne protège de rien.'}});
 if(r!=='win')return;F.v20bor=1;F.t_borea=1;await cine(1);ui.shake=10;sfx('roar');ui.flash=.6;ui.flashC='#c8f0ff';
 await say('Les canons de Boréa s\'éteignent l\'un après l\'autre. Sous la glace, une lueur bleue se met à battre… lentement, puis plus fort.');
 const L=npcs(MAPS.glacier).find(x=>x.sp==='hivernel');if(L){rays(L.x,L.y,'#9ae0ff',2600);await emote(L,'!',700)}
 await say('Le Cœur de Givre… il bat ? Il battait, depuis tout ce temps ? J\'ai cru qu\'il dormait. Il avait juste… froid.',Bo,0,'borea');
 await say('Au-dessus de l\'autel de glace, une silhouette immense déploie des ailes de givre. HIVERNEL, le gardien des saisons, ouvre les yeux.');await cine(0);
 await hivernel20(L,1)}
async function hivernel20(n,first){const F=F20();if(!first){await cine(1);if(n){rays(n.x,n.y,'#9ae0ff',2000);await emote(n,'!',600)}sfx('roar');await say('Hivernel te regarde, immobile. Autour de lui, la glace chante doucement.');await cine(0)}
 if(await ask('Affronter Hivernel ?')){const r=await battle([mon('hivernel',60)],{legend:1});if(r==='catch'){F.legG=1;await say('Hivernel a rejoint ton équipe. Un souffle frais traverse le Glacier.');achCheck()}else if(r==='win')await say('Hivernel s\'envole dans un tourbillon de flocons… puis revient se poser sur l\'autel. Il attend.')}
 else await say('Hivernel incline la tête, puis se pose sur l\'autel de glace. Il restera là.');
 if(!F.v20done)await ending20();save()}
async function ending20(){const F=F20(),S='frimas',L=[];await cine(1);await fadeTo(1,700);loadMap(S,12,13,1);
 const add=(x,y,t,name)=>L.push(tmpN(S,{x,y,t,d:0,name}));add(12,11,'neva','Neva');add(11,12,'rival','Kael');add(14,12,'moine','Frère Hivert');if(F.v20w===2)add(13,11,'borea','Boréa');await fadeTo(0,700);
 await say('Au fond du Glacier, la glace s\'est mise à chanter. Partout dans le nord, la neige fond doucement… pas complètement. Juste assez.');
 await say('Regarde, au bord du chemin ! Un perce-neige. Le premier depuis trois cents ans.','Neva',0,'neva');
 await say('Valen va être jaloux. …Dis, l\'hiver, c\'est une saison, maintenant ? Alors il reviendra l\'année prochaine ?','Kael',0,'rival');
 await say('Il reviendra. Et il repartira. C\'est ça, une saison : quelque chose qui part, et qui revient.','Frère Hivert',0,'moine');
 if(F.v20w===2)await say('…J\'ai cru que figer le monde le protégerait. Mais un monde qui ne change plus ne vit plus. Je resterai à Frimas, si Neva veut bien de moi. J\'ai beaucoup à réapprendre.','Boréa',0,'borea');
 const E=[F.legG?'Hivernel a choisi de te suivre. Mais chaque hiver, il retourne veiller sur le Glacier.':'Hivernel veille au fond du Glacier. On dit qu\'il attend encore quelqu\'un.',
  F.v20w===2?'Boréa étudie les saisons avec Neva. Elle note chaque flocon, chaque bourgeon. Elle sourit, parfois.':F.v20w===1?'Boréa est repartie à l\'Observatoire. Elle y regarde de nouveau les étoiles, et note la date de chaque première neige.':'Boréa a disparu dans les montagnes. Les Yétimont, eux, sont rentrés chez eux.',
  'Désormais, un jour sur trois, la neige tombe jusqu\'à Lunévie : c\'est l\'hiver d\'Aurélys. Et chaque printemps, il repart.'];for(const s of E)await say(s);
 await fadeTo(1,600);for(const n of L)rmN(S,n);F.v20done=1;MAPS.lunevie.L=null;await fadeTo(0,600);await cine(0);
 await say('FIN DU CHAPITRE : LES TERRES DE GIVRE. Neva attend une revanche dans son arène… et Aurélys a encore bien des secrets.');rep('frimas',3);achCheck();save()}
async function boreaF20(n){if(!F20().t_borea)F20().t_borea=1;return leaderTalk(n,'borea')}
LDR.neva=['Une revanche sur la glace ? Cette fois, je ne glisserai pas !','Tu as encore glissé plus loin que moi… Bravo.','pierregivre'];
REM.neva=L=>[['sapigivre',L-1,null,'baiesoin'],['cornegivre',L-1,null,'ruban'],['boreaserp',L,null,'baiesoin'],['yetimont',L,null,'orbe'],['aiglacier',L+1,null,'glacon']];
LDR.borea=['Un combat ? D\'accord. Mais cette fois, je veux voir comment ton équipe change au fil des saisons.','Tu as encore changé. Moi aussi, un peu.','cristal'];
REM.borea=L=>[['grelotin',L-1,null,'baiesoin'],['stellagel',L,null,'poudretoile'],['louvigel',L,null,'griffe'],['boreaserp',L,null,'baiesoin'],['yetimont',L,null,'orbe'],['aiglacier',L+1,null,'glacon']];
// ---------------------------------------------------------------- Objectifs, guide, journal, succès, carte, envol, expéditions
{const pg20=postGoal;postGoal=function(g){if(g.v193fin&&!g.v20done){
  if(!g.v20a)return'Il neige sur Lunévie pour la première fois depuis trois siècles ! Va voir ce qui se passe au village.';
  if(!g.v20b)return'Franchis le Col du Givre, au nord de Lunévie, jusqu\'au village de Frimas.';
  if(!g.badge6)return'Bats Neva, la Championne de l\'Arène Givre de Frimas.';
  if(!g.v20gres)return'Traverse le Lac Gelé, au nord de Frimas : le lieutenant Grésil garde l\'entrée du Glacier.';
  if(!g.v20bor)return'Descends au Cœur du Glacier et arrête Boréa avant qu\'elle ne fige les saisons.';
  return'Hivernel s\'éveille au fond du Glacier. Va à sa rencontre.'}return pg20(g)}}
GDT.unshift([/Il neige sur Lunévie/,{m:'lunevie',lbl:'Lunévie'}],[/Franchis le Col du Givre/,{m:'frimas',lbl:'Frimas'}],[/Bats Neva/,gN('gym6','neva',5,1,'Neva, Championne')],
 [/Traverse le Lac Gelé/,gN('lacgele','Lieutenant Grésil',11,4,'Lieutenant Grésil')],[/arrête Boréa/,gN('glacier','Boréa',8,3,'Boréa')],[/Hivernel s'éveille/,gN('glacier',null,8,1,'Hivernel')]);
{const q20=quests;quests=function(){const Q=q20(),F=F20();if(!F.v20a)return Q;
 Q.push(['Les Terres de Givre',F.v20done?2:1,F.v20done?'Tu as arrêté Boréa et réveillé Hivernel : l\'hiver est redevenu une saison.':!F.badge6?'Il neige sur Lunévie ! Au nord, le Col du Givre mène à Frimas et à son Arène Givre.':'Les Figés de Boréa tiennent le Lac Gelé et le Glacier, au nord de Frimas.']);
 if(F.v20mf)Q.push(['Les moufles de Mamie Flocon',F.v20mf===2?2:1,F.v20mf===2?'Tu as rapporté les trois moufles perdues à Mamie Flocon.':`Mamie Flocon a perdu trois moufles : sur le Col, au Lac Gelé… et ailleurs. (${G.bag.moufle||0}/3)`]);
 if(F.v20pgQ)Q.push(['Le pêcheur pingouin',F.v20pg?2:1,F.v20pg?'Tu as montré un Hérongel à Monsieur Pingouin.':'Monsieur Pingouin, à Frimas, voudrait voir un Hérongel.']);return Q}}
ACH.push(['v20a','Premier hiver','Voir tomber la première neige sur Lunévie.',()=>!!F20().v20a,['chocolat',3]],['v20b','Six badges','Obtenir le Badge Givre de Neva.',()=>!!F20().badge6,['givrecapsule',5]],
 ['v20c','Le dégel','Arrêter Boréa au Cœur du Glacier.',()=>!!F20().v20bor,['pierregivre',1]],['v20d','Gardien des saisons','Capturer Hivernel.',()=>!!F20().legG,['glacon',1]],
 ['v20e','Moufles retrouvées','Rapporter ses trois moufles à Mamie Flocon.',()=>F20().v20mf===2,['chocolat',5]]);
Object.assign(RMAP,{col:[300,44,'COL DU GIVRE',12,3],frimas:[262,26,'FRIMAS',-4,-12],lacgele:[222,30,'LAC GELÉ',0,20]});
Object.assign(RINFO,{col:['Col','snow','Un col enneigé au nord de Lunévie : congères, glace et Yétimont.'],frimas:['Village','snow','Le village où l\'hiver dormait. Arène Givre de Neva, Refuge des Saisons.'],lacgele:['Lac','snow','Un lac gelé à traverser en glissant. Au nord, le Cœur du Glacier.']});
Object.assign(RPAR,{gym6:'frimas',maisonF:'frimas',refuge:'frimas',glacier:'lacgele'});RLINK.push(['lunevie','col'],['col','frimas'],['frimas','lacgele']);RBADGE.frimas=['badge6','bGiv'];
Object.assign(RELAIS,{frimas:[12,13]});
Object.assign(EXZ,{col:[46,['GLA','ROC'],['chocolat','givrecapsule','hyperpotion'],['pierregivre','cristal']],lacgele:[48,['GLA','EAU'],['chocolat','givrecapsule','maxpotion'],['cristal','pierregivre']]});
CREA_CH.push(['LES TERRES DE GIVRE','lunevie',{legS:1,legN:1,failleDone:1,legC:1,sanct:1,v193gr:1,v193fin:1}]);
// Ambiance : la neige tombe aussi pendant les combats dans les lieux enneigés
{const db20=drawBattle;drawBattle=function(t){db20(t);if(!G||!MAPS[G.map]?.snow||!B||B.coop)return;X.globalAlpha=.8;
 for(let i=0;i<40;i++){const s=i%3?2:3,sx=((i*137+t*.025*(1+i%3)+Math.sin(t/900+i)*14)%(W+40))-20,sy=((i*71+t*.045*(1+i%3))%(H+40))-20;R(X,i%4?'#ffffff':'#dce6f8',sx|0,sy|0,s,s)}X.globalAlpha=1}}
