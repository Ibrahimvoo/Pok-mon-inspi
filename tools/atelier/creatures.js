// CRÉATURES D'AURÉLYS — style « sprite GBA » : 64×64 affiché ×2, contour sombre continu, ombrage en aplats (4 tons),
// lumière haut-gauche. Vue de FACE (adversaire, regard vers la gauche) et vue de DOS (ta créature, regard vers le haut-droite,
// plus grande et coupée en bas d'écran). Repère 100×100, sol à y≈96.
(()=>{
const A=ATELIER,{E,C,cap,blob,taper,poly,curve}=A;
const eye=(d,x,y,rx,ry,o={})=>A.eye(d,x,y,rx,ry,{glint2:false,...o});
// flamme à trois langues (émissive, sans ombre)
function flame(d,x,y,s=1,o={}){const tilt=o.tilt||0,col=o.cols||['#e8401e','#ff9a2a','#ffe27a'];
 const shape=(k)=>g=>{const w=9*s*k,h=20*s*k;blob(g,[[x-w,y],[x-w*.7,y-h*.45],[x-w*.25+tilt*.3,y-h*.7],[x+tilt,y-h],[x+w*.35+tilt*.4,y-h*.62],[x+w*.85,y-h*.4],[x+w,y],[x+w*.5,y+w*.55],[x-w*.5,y+w*.55]],.5)};
 d.part(col[0],shape(1),{emit:1});d.part(col[1],g=>{g.translate(0,2*s);shape(.68)(g);g.translate(0,-2*s)},{emit:2,ol:false});d.part(col[2],g=>{g.translate(0,4*s);shape(.38)(g);g.translate(0,-4*s)},{emit:2,ol:false})}
const M=window.CREA={};
// =====================================================================================
// FLAMIOT (FEU) — lionceau joufflu, mèche de flamme sur le front, queue qui s'embrase de joie
// =====================================================================================
const FL={fur:'#f0743a',belly:'#ffe2b0',ear:'#c84a3a',mane:'#ffb840'};
M.flamiot={front:d=>{
 d.part(FL.fur,g=>taper(g,[[62,84],[78,82],[88,70],[88,56]],[4.2,3.8,3.2,2.8]));flame(d,88,52,.8,{tilt:2});
 d.part(FL.fur,g=>{E(g,38,90,10,6.5);E(g,62,90,10,6.5)});
 d.part(FL.fur,g=>E(g,50,72,20,18));d.part(FL.belly,g=>E(g,46,76,11,12),{flat:.4});
 d.part(FL.belly,g=>{E(g,33,93,5,2.6);E(g,57,93,5,2.6)},{flat:.3});
 d.part(FL.fur,g=>cap(g,37,66,30,77,5.4,5.2));d.part(FL.fur,g=>cap(g,63,66,68,76,5,4.8));
 d.part(FL.belly,g=>{C(g,30,78,3.6);C(g,68,77,3.4)},{flat:.3});
 d.part(FL.fur,g=>{C(g,27,22,9);C(g,64,19,9)});d.flat(FL.ear,g=>{C(g,27,23,4.6);C(g,64,20,4.6)},{lit:1});
 d.part(FL.fur,g=>blob(g,[[24,42],[25,26],[36,16],[50,14],[64,20],[70,34],[69,48],[60,58],[46,61],[32,58],[24,52],[20,47]],.55));
 d.part(FL.mane,g=>{taper(g,[[44,16],[42,8],[48,2]],[5,4,1.2]);taper(g,[[50,15],[54,6],[58,4]],[4,3,1])},{emit:2});d.part('#ffe27a',g=>taper(g,[[46,14],[46,9],[49,6]],[2.4,1.8,.6]),{emit:2,ol:false});
 d.part(FL.belly,g=>E(g,40,47,13,9),{flat:.4});
 d.flat('#3a1a14',g=>{poly(g,[[33,41],[39,41],[36,45]])});
 d.line('#3a1a14',1.4,g=>{g.moveTo(36,45);g.lineTo(36,48);g.moveTo(30,49);g.quadraticCurveTo(36,52,42,48)});
 d.flat('#ffffff',g=>{poly(g,[[39,49],[41.5,49],[40.5,52]])});
 eye(d,31,34,4,5.4,{iris:'#5a2a14'});eye(d,52,33,4,5.4,{iris:'#5a2a14'});
 d.flat('#ff9a8a',g=>{E(g,25,44,3.4,2);E(g,58,43,3.4,2)},{lit:1})},
back:d=>{
 d.part(FL.fur,g=>E(g,48,92,30,24));
 d.part(FL.fur,g=>taper(g,[[30,92],[16,84],[10,68],[14,54]],[6,5.4,4.6,4]));flame(d,15,50,1.15,{tilt:-3});
 d.part(FL.fur,g=>cap(g,22,74,18,86,6,6));d.part(FL.fur,g=>cap(g,76,72,82,84,6,6));
 d.part(FL.fur,g=>{C(g,30,26,11);C(g,74,24,11)});d.part(A.mix(FL.fur,'#7a2a1a',.3),g=>{C(g,30,27,6);C(g,74,25,6)},{flat:.3});
 d.part(FL.fur,g=>blob(g,[[24,52],[26,32],[40,20],[56,18],[72,24],[80,38],[78,56],[66,66],[50,68],[34,64]],.55));
 d.part(A.mix(FL.fur,'#c03a20',.35),g=>{taper(g,[[52,26],[54,40],[52,52]],[4,4.5,2])},{flat:.2});
 d.part(FL.mane,g=>{taper(g,[[48,22],[44,10],[50,2]],[7,5,1.5]);taper(g,[[56,22],[62,10],[66,8]],[5,4,1])},{emit:2});d.part('#ffe27a',g=>taper(g,[[50,20],[49,12],[52,7]],[3,2.4,.8]),{emit:2,ol:false});
 d.part(FL.fur,g=>blob(g,[[78,44],[84,40],[86,50],[80,54]],.5));
}};
// BRASILION (FEU) — gardien des foyers : lion debout, crinière de flammes, plastron de pierre d'âtre fendu de braise
const BR={fur:'#d8482a',belly:'#ffcf8a',stone:'#4a3a3a',mane:'#ff9a2a'};
M.brasilion={front:d=>{
 d.part(BR.fur,g=>taper(g,[[66,82],[84,80],[94,66],[92,50]],[5,4.4,3.8,3.2]));flame(d,92,46,1.0,{tilt:2});
 // crinière de flammes (vers l'arrière et le haut)
 const mane=(k,col,em,ol)=>d.part(col,g=>{blob(g,[[22,40],[16,26],[22,12],[34,2],[50,-2],[64,4],[78,8],[86,20],[80,30],[86,40],[76,48],[64,54],[44,54]].map(([x,y])=>[50+(x-50)*k,26+(y-26)*k]),.45)},{emit:em,ol});
 mane(1,'#e8401e',1);mane(.84,'#ff9a2a',2,false);mane(.6,'#ffd04a',2,false);
 d.part(BR.fur,g=>{cap(g,40,72,34,90,8,7);cap(g,62,72,66,90,8,7)});d.part(BR.stone,g=>{E(g,32,92,10,5);E(g,66,92,10,5)},{});
 d.part(BR.fur,g=>blob(g,[[30,46],[70,46],[74,70],[64,84],[36,84],[26,70]],.5));
 // plastron d'âtre : pierre sombre, ouverture voûtée où rougeoient les braises
 d.part(BR.stone,g=>blob(g,[[36,50],[64,50],[66,68],[50,78],[34,68]],.45),{r:5});
 d.part('#ff7a2a',g=>{g.moveTo(42,72);g.lineTo(42,62);g.arc(50,62,8,Math.PI,0);g.lineTo(58,72);g.closePath()},{emit:1});
 d.part('#ffd04a',g=>{g.moveTo(45,72);g.lineTo(45,64);g.arc(50,64,5,Math.PI,0);g.lineTo(55,72);g.closePath()},{emit:2,ol:false});
 d.line('#2a1a1a',1.2,g=>{g.moveTo(46,66);g.lineTo(46,72);g.moveTo(50,62);g.lineTo(50,72);g.moveTo(54,66);g.lineTo(54,72)});
 d.part(BR.fur,g=>{cap(g,30,52,18,68,8,7);cap(g,70,52,80,66,7.5,6.5)});d.part(BR.stone,g=>{C(g,16,71,7);C(g,82,69,6.5)},{});
 d.part(BR.fur,g=>{C(g,30,14,6);C(g,64,12,6)});
 d.part(BR.fur,g=>blob(g,[[28,32],[34,16],[50,12],[64,18],[68,32],[62,44],[48,48],[32,44]],.55));
 d.part(BR.belly,g=>E(g,40,37,12,8),{flat:.4});d.flat('#3a1a14',g=>poly(g,[[33,32],[40,32],[36.5,36]]));d.line('#3a1a14',1.4,g=>{g.moveTo(36.5,36);g.lineTo(36.5,39);g.moveTo(30,40);g.quadraticCurveTo(36,43,43,39)});
 d.flat('#ffffff',g=>{poly(g,[[31,40],[33,40],[32,43]]);poly(g,[[40,40],[42,40],[41,43]])});
 eye(d,32,25,3.6,4.2,{iris:'#ffcf3a',pupil:'#2a1010',lid:[.2,.0],lidc:BR.fur});eye(d,51,24,3.6,4.2,{iris:'#ffcf3a',pupil:'#2a1010',lid:[.0,.2],lidc:BR.fur})},
back:d=>{
 d.part(BR.fur,g=>blob(g,[[18,100],[16,70],[30,52],[70,50],[86,66],[86,100]],.5));
 d.part(BR.fur,g=>taper(g,[[24,96],[10,86],[6,70],[10,56]],[6,5.6,5,4.4]));flame(d,10,52,1.25,{tilt:-3});
 d.part(BR.fur,g=>{cap(g,22,64,12,84,9,8);cap(g,80,62,90,82,9,8)});d.part(BR.stone,g=>{C(g,11,86,8);C(g,91,84,8)});
 const mane=(k,col,em,ol)=>d.part(col,g=>blob(g,[[26,56],[18,38],[24,20],[36,8],[52,2],[68,6],[82,16],[88,32],[84,48],[76,60],[52,64]].map(([x,y])=>[54+(x-54)*k,36+(y-36)*k]),.45),{emit:em,ol});
 mane(1,'#e8401e',1);mane(.8,'#ff9a2a',2,false);mane(.55,'#ffd04a',2,false);
 d.part(BR.fur,g=>{C(g,40,20,6.5);C(g,68,20,6.5)});d.part(A.mix(BR.fur,'#5a1a10',.35),g=>{C(g,40,21,3.5);C(g,68,21,3.5)},{flat:.2});
 d.part(BR.fur,g=>blob(g,[[38,44],[40,26],[54,20],[68,26],[70,44],[54,52]],.55));
 d.part(BR.stone,g=>blob(g,[[34,70],[72,70],[74,90],[54,98],[32,90]],.45),{r:5});d.line('#ff8a2a',1.4,g=>{g.moveTo(44,80);g.lineTo(64,80);g.moveTo(46,86);g.lineTo(62,86)})
}};
// =====================================================================================
// GOUTELIN (EAU) — petit axolotl des sources : crête en goutte, branchies en gouttelettes, gros yeux humides
// =====================================================================================
const GO={skin:'#5aa8f0',belly:'#e0f2ff',fin:'#a8dcff',gill:'#ff9ac0'};
M.goutelin={front:d=>{
 d.part(GO.fin,g=>blob(g,[[60,82],[74,74],[90,60],[94,72],[86,86],[68,92]],.5),{flat:.4});
 d.part(GO.skin,g=>taper(g,[[58,86],[74,80],[86,70]],[7,5,2.4]));
 d.part(GO.skin,g=>{E(g,38,91,8,5);E(g,60,91,8,5)});
 d.part(GO.skin,g=>E(g,49,74,17,15));d.part(GO.belly,g=>E(g,45,78,10,10),{flat:.4});
 d.part(GO.skin,g=>{cap(g,36,70,30,79,4.4,4);cap(g,62,70,66,79,4.2,3.8)});
 for(const[x,y,a]of[[22,30,-.6],[19,40,-.1],[22,50,.4]])d.part(GO.gill,g=>{E(g,x,y,6,3.2,a)},{});
 for(const[x,y,a]of[[72,28,.6],[75,38,.1],[72,48,-.4]])d.part(GO.gill,g=>{E(g,x,y,6,3.2,a)},{});
 d.part(GO.skin,g=>blob(g,[[26,44],[28,28],[40,20],[56,20],[68,28],[70,44],[62,56],[48,60],[34,56]],.55));
 d.part(GO.fin,g=>{blob(g,[[42,22],[44,8],[50,0],[54,10],[54,22]],.5)},{gloss:5});d.flat('#ffffff',g=>E(g,47,9,1.6,3),{});
 d.part(GO.belly,g=>E(g,44,48,12,7),{flat:.4});
 d.line('#1c2a50',1.4,g=>{g.moveTo(37,48);g.quadraticCurveTo(44,53,51,48)});
 eye(d,34,37,5,6,{iris:'#2a4a8a'});eye(d,56,36,5,6,{iris:'#2a4a8a'});
 d.flat('#9ad8ff',g=>{E(g,30,46,1.4,2.4)},{});
 d.flat('#ffb0c8',g=>{E(g,28,45,3,1.8);E(g,62,44,3,1.8)},{lit:1})},
back:d=>{
 d.part(GO.fin,g=>blob(g,[[22,98],[8,84],[2,64],[12,62],[22,76],[30,92]],.5),{flat:.4});
 d.part(GO.skin,g=>taper(g,[[34,96],[22,88],[12,74]],[9,7,3]));
 d.part(GO.skin,g=>E(g,52,90,28,22));
 d.part(GO.skin,g=>{cap(g,28,76,22,88,6,5);cap(g,78,74,84,86,6,5)});
 for(const[x,y,a]of[[20,32,-.6],[16,44,-.1],[20,56,.4]])d.part(GO.gill,g=>{E(g,x,y,8,4.2,a)},{});
 for(const[x,y,a]of[[84,30,.6],[88,42,.1],[84,54,-.4]])d.part(GO.gill,g=>{E(g,x,y,8,4.2,a)},{});
 d.part(GO.skin,g=>blob(g,[[24,52],[26,30],[42,18],[62,18],[78,28],[80,50],[66,64],[44,66]],.55));
 d.part(GO.fin,g=>{blob(g,[[46,22],[50,4],[58,-2],[62,10],[60,24]],.5)},{gloss:5});
 d.part(GO.fin,g=>{taper(g,[[52,58],[50,72],[50,88]],[3,3.5,2])},{flat:.5});
 d.part('#3a7ac8',g=>{C(g,40,38,2.6);C(g,62,34,2.2);C(g,70,48,2)},{flat:.2})
}};
// TORRENTOR (EAU) — dragon de rivière debout : grande crête-cascade, branchies devenues chutes, queue-lame qui fend la roche
const TO={skin:'#2f72c8',belly:'#cfeaff',fin:'#7ac8ff',gill:'#ff7aa8',blade:'#e8f4ff'};
M.torrentor={front:d=>{
 d.part(TO.fin,g=>blob(g,[[60,84],[80,80],[96,62],[98,80],[86,94],[64,96]],.5),{flat:.4});d.part(TO.skin,g=>taper(g,[[58,88],[78,84],[94,72]],[9,6,2.6]));
 d.part(TO.blade,g=>blob(g,[[84,74],[96,62],[99,70],[90,80]],.4),{gloss:6,hl:1});
 d.part(TO.skin,g=>{cap(g,40,70,34,90,8,7);cap(g,60,70,64,90,8,7)});d.part(TO.skin,g=>{E(g,30,93,10,4.5);E(g,66,93,10,4.5)});
 d.part(TO.skin,g=>blob(g,[[30,40],[66,40],[72,64],[62,82],[38,82],[28,64]],.5));d.part(TO.belly,g=>blob(g,[[38,46],[58,46],[60,70],[48,80],[36,70]],.5),{flat:.4});
 for(let y=52;y<76;y+=7)d.line(A.mix(TO.belly,'#2f72c8',.35),1,g=>{g.moveTo(39,y);g.lineTo(57,y)},{lit:1});
 d.part(TO.skin,g=>{cap(g,32,48,20,62,7,6);cap(g,66,48,76,60,6.5,5.6)});d.part(TO.skin,g=>{C(g,18,64,6.5);C(g,78,62,6)});
 for(const[x,y,a]of[[16,20,-.7],[13,30,-.1],[17,40,.5]])d.part(TO.gill,g=>E(g,x,y,8,3.6,a));for(const[x,y,a]of[[68,16,.7],[72,26,.1],[69,36,-.5]])d.part(TO.gill,g=>E(g,x,y,8,3.6,a));
 d.part(TO.skin,g=>blob(g,[[22,32],[26,16],[40,8],[56,10],[66,20],[66,34],[56,44],[38,46],[24,42]],.55));
 d.part(TO.fin,g=>blob(g,[[38,10],[42,-2],[54,-4],[66,4],[72,14],[60,14]],.5),{gloss:5});
 d.part(TO.belly,g=>E(g,36,36,13,6.5),{flat:.4});d.line('#16224a',1.4,g=>{g.moveTo(26,36);g.quadraticCurveTo(36,41,47,36)});
 d.flat('#ffffff',g=>{poly(g,[[29,37],[31.5,37],[30,40]]);poly(g,[[42,37],[44.5,37],[43,40]])});
 eye(d,31,24,3.6,4.4,{iris:'#ffcf3a',pupil:'#14204a',lid:[.2,0],lidc:TO.skin});eye(d,49,23,3.6,4.4,{iris:'#ffcf3a',pupil:'#14204a',lid:[0,.2],lidc:TO.skin})},
back:d=>{
 d.part(TO.fin,g=>blob(g,[[20,100],[4,84],[0,60],[10,58],[22,78],[32,96]],.5),{flat:.4});d.part(TO.skin,g=>taper(g,[[36,98],[20,88],[8,70]],[10,8,3]));
 d.part(TO.blade,g=>blob(g,[[2,66],[8,52],[14,58],[10,72]],.4),{gloss:6,hl:1});
 d.part(TO.skin,g=>blob(g,[[22,100],[20,62],[36,44],[70,42],[86,58],[86,100]],.5));
 d.part(TO.skin,g=>{cap(g,24,58,12,80,9,8);cap(g,82,56,92,78,9,8)});
 for(const[x,y,a]of[[22,22,-.7],[18,34,-.1],[22,46,.5]])d.part(TO.gill,g=>E(g,x,y,10,4.6,a));for(const[x,y,a]of[[82,20,.7],[86,32,.1],[82,44,-.5]])d.part(TO.gill,g=>E(g,x,y,10,4.6,a));
 d.part(TO.skin,g=>blob(g,[[28,46],[30,24],[44,14],[62,14],[76,24],[76,46],[60,56],[44,56]],.55));
 d.part(TO.fin,g=>blob(g,[[40,20],[44,2],[56,-4],[68,4],[72,22],[64,30],[54,26]],.5),{gloss:5});
 d.part(TO.fin,g=>{blob(g,[[48,56],[56,54],[60,70],[54,90],[48,74]],.5)},{flat:.5});
 d.part('#1e4a90',g=>{C(g,36,64,3);C(g,70,62,3);C(g,40,80,2.6);C(g,72,80,2.6)},{flat:.2})
}};
// =====================================================================================
// POUSSERON (PLANTE) — faon-pousse : oreilles-feuilles, pousse sur le front, taches-bourgeons sur le dos
// =====================================================================================
const PO={fur:'#b8824a',belly:'#fff0d0',leaf:'#6ac85a',bud:'#f08aa8',stem:'#4a9a3a'};
M.pousseron={front:d=>{
 d.part(PO.fur,g=>{cap(g,74,74,78,92,3.8,3.2);cap(g,82,72,86,90,3.8,3.2)});d.part('#5a3a24',g=>{E(g,78,93,3.8,2.2);E(g,86,91,3.8,2.2)});
 d.part(PO.fur,g=>blob(g,[[46,64],[60,58],[82,58],[90,66],[86,78],[64,80],[48,76]],.5));
 d.part(PO.fur,g=>taper(g,[[88,64],[94,58],[95,52]],[3.4,3,1.6]));d.part(PO.belly,g=>C(g,95,51,3),{});
 for(const[x,y]of[[64,62],[74,61],[82,65],[70,70]])d.part(PO.bud,g=>C(g,x,y,2.8),{gloss:4});
 d.part(PO.fur,g=>{cap(g,52,72,50,92,4.2,3.6);cap(g,62,74,62,92,4.2,3.6)});d.part('#5a3a24',g=>{E(g,50,93,4.4,2.4);E(g,62,93,4.4,2.4)});
 d.part(PO.belly,g=>E(g,56,72,7,5),{flat:.3});
 d.part(PO.fur,g=>cap(g,52,64,42,50,8,7));
 d.part(PO.leaf,g=>{blob(g,[[22,30],[10,22],[2,10],[16,12],[28,24]],.5)});d.part(PO.leaf,g=>{blob(g,[[58,24],[70,12],[84,6],[80,20],[66,30]],.5)});
 d.line(A.mix(PO.leaf,'#1a4a1a',.4),1,g=>{g.moveTo(24,26);g.lineTo(9,14);g.moveTo(62,26);g.lineTo(80,10)},{lit:1});
 d.part(PO.fur,g=>blob(g,[[22,40],[24,24],[36,16],[52,16],[62,26],[62,42],[52,54],[34,56],[22,50]],.55));
 d.part(PO.belly,g=>E(g,33,46,11,8),{flat:.4});d.flat('#3a2418',g=>E(g,26,44,3,2.2));
 d.line('#3a2418',1.3,g=>{g.moveTo(29,50);g.quadraticCurveTo(34,53,39,50)});
 d.part(PO.stem,g=>cap(g,44,18,46,8,1.6,1.4));d.part(PO.leaf,g=>{blob(g,[[46,8],[38,4],[34,-2],[44,0]],.5);blob(g,[[46,8],[54,2],[60,0],[54,8]],.5)});
 eye(d,33,32,4.2,5.4,{iris:'#3a2418'});eye(d,51,31,4.2,5.4,{iris:'#3a2418'});d.flat('#ffaa90',g=>{E(g,25,40,3,1.8);E(g,57,39,3,1.8)},{lit:1})},
back:d=>{
 d.part(PO.fur,g=>{cap(g,30,80,26,100,6,5);cap(g,74,80,78,100,6,5)});
 d.part(PO.fur,g=>blob(g,[[16,82],[24,64],[50,58],[80,62],[90,76],[82,94],[50,98],[20,94]],.5));
 d.part(PO.fur,g=>taper(g,[[18,78],[8,72],[6,64]],[4,3.4,2]));d.part(PO.belly,g=>C(g,6,63,3.6));
 for(const[x,y,r]of[[36,70,4],[52,66,4.4],[68,70,4],[44,82,3.6],[62,82,3.6],[78,80,3.2]])d.part(PO.bud,g=>C(g,x,y,r),{gloss:4});
 d.part(PO.fur,g=>cap(g,50,66,56,50,10,9));
 d.part(PO.leaf,g=>{blob(g,[[36,32],[20,24],[6,12],[24,14],[40,26]],.5)});d.part(PO.leaf,g=>{blob(g,[[72,30],[86,18],[100,10],[96,24],[80,36]],.5)});
 d.part(PO.fur,g=>blob(g,[[34,48],[34,28],[46,18],[64,18],[76,28],[74,46],[58,56]],.55));
 d.part(PO.stem,g=>cap(g,56,20,58,8,2,1.8));d.part(PO.leaf,g=>{blob(g,[[58,8],[48,4],[42,-4],[54,-2]],.5);blob(g,[[58,8],[68,0],[76,-2],[68,8]],.5)})
}};
// SYLVORNE (PLANTE) — cerf messager du printemps : ramure de branches fleuries, crinière de feuilles, pattes d'écorce
const SY={fur:'#8a6a3a',bark:'#6a4a2a',leaf:'#4aa84a',bloom:'#ffb0c8',belly:'#f2e2c0'};
M.sylvorne={front:d=>{
 d.part(SY.bark,g=>{cap(g,70,64,72,94,4.6,3.8);cap(g,82,62,86,92,4.6,3.8)});
 d.part(SY.fur,g=>blob(g,[[40,58],[56,48],[84,48],[96,56],[92,72],[66,74],[44,72]],.5));
 d.part(SY.leaf,g=>taper(g,[[94,54],[99,48],[100,40]],[4,3,1.4]));
 for(const[x,y]of[[62,52],[74,50],[86,54],[68,62],[80,62]])d.part(SY.bloom,g=>C(g,x,y,3),{gloss:4});
 d.part(SY.bark,g=>{cap(g,48,66,44,94,4.8,3.8);cap(g,58,68,58,94,4.8,3.8)});d.part('#3a2418',g=>{E(g,44,95,5,2.4);E(g,58,95,5,2.4);E(g,72,95,4.6,2.2);E(g,86,93,4.6,2.2)});
 d.part(SY.fur,g=>cap(g,52,58,36,34,9,7));
 const pts=[];for(let i=0;i<12;i++){const a=-.6+i*.3,r=i%2?11:16;pts.push([44+Math.cos(a)*r*1.05,48+Math.sin(a)*r*.85])}d.part(SY.leaf,g=>blob(g,pts,.5));
 const branch=(x0,y0,dx,k=1)=>{d.part(SY.bark,g=>{taper(g,[[x0,y0],[x0+dx*5*k,y0-12*k],[x0+dx*3*k,y0-24*k]],[2.6,2.2,1.4]);taper(g,[[x0+dx*5*k,y0-12*k],[x0+dx*14*k,y0-18*k]],[2,1.2]);taper(g,[[x0+dx*4*k,y0-18*k],[x0-dx*6*k,y0-26*k]],[1.8,1])});
  for(const[x,y]of[[x0+dx*3*k,y0-27*k],[x0+dx*14*k,y0-19*k],[x0-dx*6*k,y0-27*k],[x0+dx*9*k,y0-24*k]])d.part(SY.bloom,g=>C(g,x,y,3.6),{gloss:4});for(const[x,y]of[[x0+dx*10*k,y0-12*k],[x0-dx*2*k,y0-20*k]])d.part(SY.leaf,g=>E(g,x,y,3.4,2,dx*.6))};
 branch(26,16,-1,.9);branch(38,14,1);
 d.part(SY.fur,g=>blob(g,[[14,30],[18,18],[30,12],[42,14],[46,26],[40,36],[26,38]],.55));d.part(SY.leaf,g=>{blob(g,[[18,20],[8,14],[4,8],[14,10]],.5);blob(g,[[42,18],[52,12],[58,8],[52,18]],.5)});
 d.part(SY.belly,g=>E(g,18,32,8,5),{flat:.4});d.flat('#2a1810',g=>E(g,12,31,2.4,1.8));eye(d,27,24,3.4,4.2,{iris:'#2a4a1a',lid:[.1,0],lidc:SY.fur})},
back:d=>{
 d.part(SY.bark,g=>{cap(g,24,76,20,102,6.4,5.4);cap(g,80,76,84,102,6.4,5.4)});
 d.part(SY.fur,g=>blob(g,[[10,80],[20,58],[52,52],[86,56],[96,72],[88,92],[52,96],[14,92]],.5));
 for(const[x,y,r]of[[36,64,4.4],[52,60,4.8],[68,64,4.4],[44,76,4],[62,76,4],[80,74,3.8],[26,76,3.6]])d.part(SY.bloom,g=>C(g,x,y,r),{gloss:4});
 d.part(SY.leaf,g=>taper(g,[[14,76],[4,70],[0,60]],[5,4,1.6]));
 d.part(SY.fur,g=>cap(g,54,60,62,38,11,9));
 const pts=[];for(let i=0;i<14;i++){const a=Math.PI*2*i/14,r=i%2?13:19;pts.push([60+Math.cos(a)*r,46+Math.sin(a)*r*.7])}d.part(SY.leaf,g=>blob(g,pts,.5));
 d.part(SY.fur,g=>blob(g,[[50,38],[52,22],[62,14],[74,18],[76,32],[68,42]],.55));
 const branch=(x0,y0,dx)=>{d.part(SY.bark,g=>{taper(g,[[x0,y0],[x0+dx*5,y0-14],[x0+dx*3,y0-28]],[3,2.6,1.6]);taper(g,[[x0+dx*5,y0-14],[x0+dx*16,y0-20]],[2.4,1.4]);taper(g,[[x0+dx*4,y0-20],[x0-dx*7,y0-30]],[2.2,1.2])});
  for(const[x,y]of[[x0+dx*3,y0-31],[x0+dx*16,y0-21],[x0-dx*7,y0-31],[x0+dx*10,y0-27]])d.part(SY.bloom,g=>C(g,x,y,4.2),{gloss:4})};
 branch(56,18,-1);branch(72,16,1);d.part(SY.leaf,g=>{blob(g,[[54,22],[42,18],[38,10],[50,12]],.5);blob(g,[[74,20],[86,16],[92,8],[82,22]],.5)})
}};
})();
