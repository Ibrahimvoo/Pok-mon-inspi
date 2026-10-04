// DÉCORS D'AURÉLYS — arbres, buissons, rochers, mobilier urbain. Repère : boîte [0,0,w,h] en pixels de jeu (1 unité = 1 px),
// pied de l'objet en bas au centre. Mêmes règles que tout le reste : lumière haut-gauche, rampes partagées.
(()=>{
const A=ATELIER,{E,C,cap,blob,taper,poly,curve}=A,hash=A.hash;
// Amas de feuillage : contour festonné (grappes de feuilles), irrégularité contrôlée par graine
function clump(g,cx,cy,rx,ry,s,lobes=11,depth=.13){const pts=[];for(let i=0;i<lobes*2;i++){const a=i/(lobes*2)*Math.PI*2,k=i%2?1-depth*(.6+hash(i,s,3)*.8):1+hash(i,s,5)*.05;pts.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k])}blob(g,pts,.55)}
const P=window.PROPS={};
// CHÊNE VERT (plaines) : tronc noueux, houppier en 4-6 grappes
const oak=(v,pal)=>d=>{const s=v*17+3,r=i=>hash(i,s,11);
 d.part(pal.bark,g=>{g.moveTo(26,88);g.bezierCurveTo(28,76,29,64,27,52);g.lineTo(37,52);g.bezierCurveTo(35,64,36,76,40,88);g.closePath();
  g.moveTo(28,64);g.quadraticCurveTo(18,58,14,50);g.lineTo(18,48);g.quadraticCurveTo(24,56,30,58);g.closePath();
  g.moveTo(34,62);g.quadraticCurveTo(44,56,48,48);g.lineTo(51,51);g.quadraticCurveTo(46,60,36,66);g.closePath()},{noise:.08});
 d.part(pal.bark,g=>{g.moveTo(22,90);g.quadraticCurveTo(26,84,28,80);g.lineTo(38,80);g.quadraticCurveTo(40,84,46,90);g.closePath()},{grp:'tr'});
 const cl=[[32,30,24,20],[17,42,15,13],[47,41,15,13],[32,47,19,12],[22,22,13,12],[43,22,13,12]].slice(0,4+v%3);
 cl.forEach(([x,y,rx,ry],i)=>d.part(i%2&&pal.leaf2?pal.leaf2:pal.leaf,g=>clump(g,x+(r(i)-.5)*3,y+(r(i+9)-.5)*3,rx,ry,s+i),{fur:.22,noise:.06,grp:i?undefined:undefined}));
 d.part(pal.leaf,g=>clump(g,32,31,21,17,s+40,13,.1),{fur:.25,noise:.05});
 for(let i=0;i<14;i++){const a=r(i+30)*6.28,rr=r(i+50)*16;d.flat(pal.leafL,g=>E(g,26+Math.cos(a)*rr,26+Math.sin(a)*rr*.8,1.6,1.1),{lit:1,lmax:2})}
 if(pal.fruit)for(let i=0;i<5;i++){const x=16+r(i+70)*34,y=26+r(i+80)*22;d.flat(pal.fruit,g=>C(g,x,y,1.4),{min:1})}};
P.oak0={w:64,h:92,def:oak(0,{bark:'#7a5638',leaf:'#4f9a3e',leaf2:'#5aa846',leafL:'#86c45a'})};
P.oak1={w:64,h:92,def:oak(1,{bark:'#74523a',leaf:'#4a9440',leaf2:'#58a24a',leafL:'#80c060'})};
P.oak2={w:64,h:92,def:oak(2,{bark:'#7a5638',leaf:'#55a040',leaf2:'#4a9038',leafL:'#90cc60',fruit:'#e84a3f'})};
// SAPIN (Forêt Murmure) : étages dentelés, bleu-vert profond
const pine=v=>d=>{const s=v*13+7;d.part('#5a3e2c',g=>{g.moveTo(29,92);g.lineTo(31,60);g.lineTo(35,60);g.lineTo(37,92);g.closePath()});
 const tiers=[[64,30,26],[48,25,22],[33,19,18],[19,12,14]];
 tiers.forEach(([y,hw,h],i)=>d.part(i%2?'#2f6e4c':'#2a6548',g=>{const pts=[[33,y-h-4]];const n=7;for(let k=0;k<=n;k++){const x=33-hw+k*(hw*2/n),dy=k%2?-3:2+hash(k,s+i,2)*2;pts.push([x+(k===0?-1:k===n?1:0),y+dy])}poly(g,[pts[0],...pts.slice(1).reverse(),pts[0]].slice(0,-1).reverse())},{fur:.2,noise:.05}));
 d.part('#2a6548',g=>{g.moveTo(33,2);g.lineTo(38,12);g.lineTo(28,12);g.closePath()});
 for(let i=0;i<10;i++){const y=14+hash(i,s,4)*48,x=33+(hash(i,s,6)-.5)*(y*.6);d.flat('#5aa070',g=>E(g,x,y,1.4,.9),{lit:1})}};
P.pine0={w:66,h:94,def:pine(0)};P.pine1={w:66,h:94,def:pine(1)};
// PIN PARASOL : tronc fin et courbe, couronne plate en ombrelle
P.parasol={w:76,h:96,def:d=>{d.part('#7a5a40',g=>{g.moveTo(34,96);g.bezierCurveTo(36,76,32,56,40,36);g.lineTo(45,37);g.bezierCurveTo(38,58,42,78,42,96);g.closePath();g.moveTo(39,50);g.quadraticCurveTo(28,40,22,32);g.lineTo(25,30);g.quadraticCurveTo(32,38,41,46);g.closePath()},{noise:.06});
 [[38,22,32,11],[24,26,16,8],[54,25,17,8],[40,14,20,8]].forEach(([x,y,rx,ry],i)=>d.part(i%2?'#4a8a46':'#3f7f42',g=>clump(g,x,y,rx,ry,70+i,14,.12),{fur:.2,noise:.05,flat:.55}));
 for(let i=0;i<10;i++)d.flat('#7ab868',g=>E(g,18+hash(i,4,4)*42,12+hash(i,5,4)*14,1.8,1),{lit:1})}};
// CYPRÈS : flamme verte élancée
P.cypress={w:32,h:96,def:d=>{d.part('#5a4030',g=>{g.moveTo(14,96);g.lineTo(15,86);g.lineTo(18,86);g.lineTo(19,96);g.closePath()});
 d.part('#2f6a3e',g=>{const pts=[];for(let i=0;i<=20;i++){const t=i/20,y=4+t*84,hw=(Math.sin(Math.min(1,t*1.25)*Math.PI*.55)*9+1)*(1-Math.max(0,t-.85)*3);pts.push([16+hw+(i%2?1.3:0),y])}for(let i=20;i>=0;i--){const t=i/20,y=4+t*84,hw=(Math.sin(Math.min(1,t*1.25)*Math.PI*.55)*9+1)*(1-Math.max(0,t-.85)*3);pts.push([16-hw-(i%2?1.3:0),y])}blob(g,pts,.4)},{fur:.3,noise:.06});
 for(let i=0;i<8;i++)d.flat('#5a9a5a',g=>E(g,13+hash(i,9,1)*6,14+i*9,1.2,2),{lit:1})}};
// SAULE PLEUREUR (Rive Brumeuse)
P.willow={w:76,h:96,def:d=>{d.part('#6a5040',g=>{g.moveTo(32,96);g.bezierCurveTo(34,80,30,60,36,40);g.lineTo(42,40);g.bezierCurveTo(38,60,42,80,44,96);g.closePath()},{noise:.06});
 d.part('#6aa850',g=>clump(g,38,28,30,20,91,12,.08),{fur:.2,flat:.7});
 for(let i=0;i<9;i++){const x=12+i*6.5,len=40+hash(i,3,3)*20;d.part(i%2?'#5a9a48':'#64a24e',g=>taper(g,[[x,24],[x+(i<4?-3:3),24+len*.5],[x+(i<4?-4:4),24+len]],[3.2,2.6,1.2]),{fur:.25,flat:.5})}
 for(let i=0;i<14;i++)d.flat('#a8d880',g=>E(g,14+hash(i,8,2)*48,20+hash(i,7,2)*44,1,2),{lit:1})}};
// ARBRE CALCINÉ (Mont Braise)
P.dead={w:56,h:84,def:d=>{d.part('#4a3a36',g=>{g.moveTo(24,84);g.bezierCurveTo(26,64,22,48,26,30);g.lineTo(31,30);g.bezierCurveTo(30,50,34,66,34,84);g.closePath();
 g.moveTo(27,46);g.quadraticCurveTo(16,40,10,24);g.lineTo(13,23);g.quadraticCurveTo(20,36,28,41);g.closePath();g.moveTo(30,38);g.quadraticCurveTo(40,30,44,16);g.lineTo(47,18);g.quadraticCurveTo(42,32,31,44);g.closePath();
 g.moveTo(27,32);g.lineTo(24,14);g.lineTo(27,14);g.lineTo(30,30);g.closePath()},{noise:.1});
 d.line('#ff7a2a',1,g=>{g.moveTo(28,70);g.lineTo(29,62);g.lineTo(27,56)},{lit:0})}};
// BUISSON / HAIE BASSE (bordures sud)
const bush=(v,pal)=>d=>{[[16,22,15,12],[34,20,14,13],[50,23,13,11],[30,28,22,9]].forEach(([x,y,rx,ry],i)=>d.part(i%2?pal[1]:pal[0],g=>clump(g,x,y,rx,ry,v*31+i,10,.14),{fur:.22,noise:.05}));
 for(let i=0;i<9;i++)d.flat(pal[2],g=>E(g,8+hash(i,v,9)*48,14+hash(i,v,8)*12,1.5,1),{lit:1});if(pal[3])for(let i=0;i<4;i++)d.flat(pal[3],g=>C(g,10+hash(i,v,7)*44,16+hash(i,v,6)*12,1.3),{min:1})};
P.hedge0={w:64,h:36,def:bush(0,['#4a9440','#58a24a','#86c45a'])};P.hedge1={w:64,h:36,def:bush(1,['#468e3e','#529c46','#80c060','#fff6e0'])};
P.hedgeP={w:64,h:36,def:bush(2,['#2f6e4c','#2a6548','#5aa070'])};
// ROCHERS
const rock=(v,pal)=>d=>{const s=v*7;d.part(pal[0],g=>blob(g,[[4,26],[6,14],[14,6],[26,4],[34,10],[38,22],[34,30],[18,31]].map(([x,y])=>[x+(hash(x,y,s)-.5)*3,y+(hash(y,x,s)-.5)*3]),.5),{noise:.06,r:9});
 d.part(pal[1],g=>blob(g,[[20,14],[26,8],[33,12],[35,22],[27,26],[20,22]],.5),{noise:.05,r:6});
 d.line(pal[2],1,g=>{g.moveTo(14,12);g.lineTo(17,18);g.lineTo(15,24)},{lit:1});if(pal[3])d.flat(pal[3],g=>{E(g,9,9,4,2.2,-.4)},{lit:1})};
P.rock0={w:40,h:34,def:rock(0,['#8d8a9a','#9a96a8','#55516a','#6aa850'])};P.rock1={w:40,h:34,def:rock(1,['#9a8f86','#a89c92','#5a5048'])};
P.rockV={w:40,h:34,def:rock(2,['#5a4a48','#6a5654','#2e2220'])};P.rockC={w:40,h:34,def:rock(3,['#5c566e','#6a6480','#2e2a40','#7ad8e8'])};
// ROCHER FISSURÉ (affinité ROCHE)
P.crack={w:40,h:38,def:d=>{d.part('#a08a78',g=>blob(g,[[3,32],[4,16],[12,5],[26,3],[36,12],[38,28],[30,36],[12,37]],.5),{noise:.06});
 d.line('#2e2018',1.6,g=>{g.moveTo(20,4);g.lineTo(18,12);g.lineTo(22,18);g.lineTo(17,26);g.lineTo(20,35)});d.line('#2e2018',1.2,g=>{g.moveTo(22,18);g.lineTo(29,22)});d.line('#e8d8c4',1,g=>{g.moveTo(17,5);g.lineTo(15,12)},{lit:0})}};
// RONCES (affinité PLANTE) : fourré épineux à baies violettes
P.bramble={w:40,h:38,def:d=>{[[12,24,11,11],[28,24,11,11],[20,14,12,10],[20,28,16,8]].forEach(([x,y,rx,ry],i)=>d.part(i%2?'#3a7a3a':'#336e36',g=>clump(g,x,y,rx,ry,120+i,9,.2),{fur:.25}));
 for(let i=0;i<10;i++){const x=6+hash(i,2,1)*28,y=8+hash(i,3,1)*24;d.line('#c8b890',.9,g=>{g.moveTo(x,y);g.lineTo(x+2,y-2)},{lit:0})}
 for(let i=0;i<7;i++){const x=8+hash(i,5,1)*24,y=10+hash(i,6,1)*20;d.flat('#7a2a6a',g=>C(g,x,y,1.8));d.flat('#d070b0',g=>C(g,x-.6,y-.6,.7),{min:1})}}};
// SOUCHE
P.stump={w:32,h:26,def:d=>{d.part('#7a5638',g=>{g.moveTo(5,24);g.lineTo(7,10);g.lineTo(25,10);g.lineTo(27,24);g.closePath()},{noise:.06});d.part('#c8a070',g=>E(g,16,10,9,4),{flat:.2});d.line('#8a6040',.8,g=>{E(g,16,10,5,2)})}};
// PANNEAU, LAMPADAIRE, BRASERO
P.sign={w:32,h:40,def:d=>{d.part('#6a4a30',g=>{g.rect(8,16,3,24);g.rect(21,16,3,24)});d.part('#b8844e',g=>{g.roundRect(3,6,26,16,2)},{flat:.35,r:3,noise:.04});
 d.line('#7a5030',.9,g=>{g.moveTo(6,12);g.lineTo(26,12);g.moveTo(6,16);g.lineTo(26,16)},{lit:1});d.flat('#f6e2b0',g=>{g.rect(5,7,22,2)},{lit:1})}};
P.lamp={w:22,h:64,def:d=>{d.part('#3a3450',g=>{g.rect(9,16,4,44);g.roundRect(5,58,12,5,1)},{r:2});d.part('#3a3450',g=>{g.moveTo(4,16);g.lineTo(18,16);g.lineTo(15,20);g.lineTo(7,20);g.closePath()});
 d.part('#ffe8a0',g=>{g.moveTo(5,6);g.lineTo(17,6);g.lineTo(15,16);g.lineTo(7,16);g.closePath()},{emit:2});d.part('#3a3450',g=>{g.moveTo(3,6);g.lineTo(11,1);g.lineTo(19,6);g.closePath()});
 d.line('#3a3450',1,g=>{g.moveTo(11,6);g.lineTo(11,16)})}};
P.brazier={w:32,h:30,def:d=>{d.part('#6a6480',g=>{g.moveTo(4,14);g.lineTo(28,14);g.lineTo(24,26);g.lineTo(8,26);g.closePath()},{r:4});d.part('#8a84a0',g=>E(g,16,14,12,3),{flat:.2});d.flat('#3a1a10',g=>E(g,16,14,10,2))}};
})();
// ORBES DE CAPTURE D'AURÉLYS — cœur de verre lumineux tenu par deux anneaux de laiton (sphère armillaire),
// motif repris de l'Observatoire et du Sablier : la technologie du monde tourne autour des astres.
(()=>{const A=ATELIER,{E,C,poly,blob}=A,P=window.PROPS;
 const ORB={capsule:['#ff8a3a','#c8783a'],supercapsule:['#5ab0f0','#b8c0cc'],hypercapsule:['#ff5aa8','#e8c040'],crepuscapsule:['#a86af0','#6a4a3a']};
 const orb=(core,ring)=>d=>{
  d.part(ring,g=>{g.ellipse(16,18,14.5,4.6,-.08,Math.PI*1.02,Math.PI*1.98)},{line:2.8,r:1.4});
  d.part(ring,g=>{g.roundRect(14,4.2,4,3.4,1.2)},{gloss:6});
  d.part(core,g=>A.C(g,16,17,9.6),{gloss:9,hl:1,r:9.6});
  d.line(A.mix(core,'#1a1028',.45),.9,g=>{g.moveTo(16,7.6);g.quadraticCurveTo(19.5,17,16,26.6)},{lit:1});
  d.flat('#ffffff',g=>E(g,12.4,12.6,2.8,1.9,-.5),{});
  d.part(ring,g=>{g.ellipse(16,18,14.5,4.6,-.08,Math.PI*.0,Math.PI*1.0)},{line:2.8,r:1.4,gloss:6,hl:1});
  d.part(A.mix(core,'#ffffff',.35),g=>A.C(g,16,22.6,2.1),{gloss:8,hl:1})};
 for(const[k,[core,ring]]of Object.entries(ORB)){P['orb_'+k]={w:32,h:32,def:orb(core,ring)};P['orbS_'+k]={w:16,h:16,box:[0,0,32,32],def:orb(core,ring)}}
 // Éclat d'Aube : cristal doré, cœur incandescent
 P.shard={w:20,h:24,def:d=>{d.part('#f6c445',g=>poly(g,[[10,1],[17,9],[15,20],[10,23],[5,20],[3,9]]),{gloss:6,hl:1,r:4});d.part('#fff0b0',g=>poly(g,[[10,4],[14,10],[10,19],[6,10]]),{emit:2});d.line('#c8902a',.8,g=>{g.moveTo(10,1);g.lineTo(10,23)},{lit:1})}};
 // Cœur d'Aube
 P.heart={w:32,h:36,def:d=>{d.part('#ffb030',g=>poly(g,[[16,1],[28,12],[24,30],[16,35],[8,30],[4,12]]),{gloss:6,hl:1,r:6});d.part('#fff4c0',g=>poly(g,[[16,6],[23,14],[16,29],[9,14]]),{emit:2});d.part('#ff7a2a',g=>poly(g,[[16,14],[19,19],[16,25],[13,19]]),{emit:1})}};
 // Sablier du Cycle : laiton et verre, sable d'or
 P.sablier={w:24,h:32,def:d=>{d.part('#c8963a',g=>{g.roundRect(2,1,20,4,1);g.roundRect(2,27,20,4,1)},{gloss:6});d.part('#c8963a',g=>{g.rect(3,4,2,24);g.rect(19,4,2,24)},{gloss:6});
  d.part('#cfe8f4',g=>{poly(g,[[6,5],[18,5],[13,16],[18,27],[6,27],[11,16]])},{gloss:10,hl:1,flat:.5});d.part('#f6c445',g=>{poly(g,[[8,19],[16,19],[18,27],[6,27]]);poly(g,[[9,7],[15,7],[12,13]])},{flat:.4})}};
 // Tente de campeur et feu de camp (bois)
 P.tent={w:40,h:34,def:d=>{d.part('#3a6a4a',g=>poly(g,[[20,2],[38,32],[2,32]]),{r:6});d.part('#2a4e36',g=>poly(g,[[20,2],[26,32],[14,32]]),{r:3});d.part('#1a1a14',g=>poly(g,[[20,12],[24,32],[16,32]]),{flat:.2});d.line('#c8b890',1,g=>{g.moveTo(20,2);g.lineTo(20,-1)})}};
 P.logs={w:32,h:20,def:d=>{for(const[a,b,c,e]of[[4,15,26,9],[6,8,28,16],[16,4,16,17]])d.part('#6a4428',g=>A.cap(g,a,b,c,e,2.6,2.6),{noise:.06});d.part('#3a3a44',g=>{for(let i=0;i<7;i++){const a=i/7*6.28;C(g,16+Math.cos(a)*13,13+Math.sin(a)*5,2.4)}},{r:2})}};
})();
