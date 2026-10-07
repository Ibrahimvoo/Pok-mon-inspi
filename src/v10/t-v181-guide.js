// =====================================================================
// 18.1 — FLÈCHE-GUIDE (façon Yo-kai Watch) : une flèche dorée tourne autour du joueur et montre le chemin de l'objectif,
// de carte en carte (bords, portes, bateaux). Un repère flotte au-dessus de la personne ou de la porte à atteindre,
// et un bandeau rappelle qui aller voir et la prochaine étape. Option : MENU, OPTIONS, FLÈCHE-GUIDE.
// =====================================================================
const gN=(m,who,x,y,lbl)=>({m,who,x,y,lbl});
// Cible de chaque objectif (les textes de goal() / postGoal()). {m} seul : arriver sur la carte suffit.
const GDT=[
 [/Prof\. Saule dans son labo/,()=>{const F=f();if(F.intro===1){const P={hSac:[1,5],hCarte:[5,1],hCap:[8,5]},k=PREP.find(p=>!hf(p[0]));
   if(k)return{...gN('chambre',null,P[k[0]][0],P[k[0]][1],k[1]),hint:'Avant de partir : sac, Carte de Dresseur et casquette'};return{...gN('salon',null,5,7,'Porte d\'entrée'),door:1,hint:'Dis au revoir à Maman, puis sors'}}
  return gN('lab','prof',7,2,'Prof. Saule')}],
 [/bats Brasia/,gN('gym','brasia',5,1,'Brasia, Championne')],
 [/Sauve Tito/,gN('mine','Tito',11,1,'Tito')],
 [/Traverse la Forêt Murmure/,gN('foret','Kael',19,1,'Kael')],
 [/Gravis le Mont Braise/,gN('mont','Vex',9,2,'Vex')],
 [/Brasia peut dégager/,{m:'ville',lbl:'Cendreville'}],
 [/Suis la Route 2/,{m:'port',lbl:'Port-Miroir'}],
 [/Bats Maëlle/,gN('gym2','maelle',5,1,'Maëlle, Championne')],
 [/sortie nord de Port-Miroir/,{m:'port',edge:'n',lbl:'Sortie nord du port'}],
 [/Grotte Écho jusqu'au plateau/,{m:'volterre',lbl:'Volterre'}],
 [/Libère la Centrale/,gN('centrale2','Commandant Orso',9,2,'Commandant Orso')],
 [/Bats Ambroise, le Champion/,gN('gym4','ambroise',5,1,'Ambroise, Champion')],
 [/Prends le téléphérique/,{m:'volterre',x:13,y:0,door:1,lbl:'Téléphérique'}],
 [/Désactive la barrière/,{m:'obs',lbl:'Les trois consoles'}],
 [/Affronte Sélène devant le dôme/,gN('obs','selene2',9,2,'Sélène')],
 [/Arrête Vex sous le dôme/,gN('dome','Vex',5,2,'Vex')],
 [/jusqu'à Carnavelle/,{m:'carnavelle',lbl:'Carnavelle'}],
 [/Atelier Mirella|Retourne voir Mirella/,gN('atelier','Mirella',7,3,'Mirella')],
 [/tends l'oreille/,gN('carnaval','Sbire masqué',19,7,'Sbires masqués')],
 [/Bats Arlequin/,()=>{const F=f();return!F.v18fk0?gN('gym5',null,2,2,'Reflet d\'Arlequin'):!F.v18fk1?gN('gym5',null,9,2,'Reflet d\'Arlequin'):gN('gym5','arlequin',5,1,'Arlequin, Champion')}],
 [/Déguisé en sbire/,()=>{const F=f(),t=!F.v18trappe?gN('theatre','Machiniste louche',14,2,'Machiniste louche'):!F.v18gaston?gN('repaire','Sbire Gaston',5,4,'Sbire Gaston'):!F.v18code?gN('repaire',null,9,1,'Robot gardien'):gN('repaire2','Faustine',6,2,'Faustine');
   if(!dgOk('eclipse'))t.hint=dgHas('eclipse')?'Mets l\'Uniforme Éclipse : MENU, TENUES':null;return t}],
 [/Rapporte la clé du téléphérique/,gN('volterre','Ambroise',11,2,'Ambroise')],
 [/Défie Solarion/,()=>!f().legS?{...gN('mont',null,9,1,'Solarion'),hint:night()?'Solarion ne se montre que le jour':null}:{...gN('dome',null,5,1,'Nocturion'),hint:night()?null:'Nocturion ne se montre que la nuit'}],
 [/Sélène t'attend sur les Coteaux/,()=>!f().failleQ?gN('coteaux','Sélène',13,8,'Sélène'):gN('faille','Caïus',15,3,'Caïus')],
 [/Bats Orane/,()=>({...gN('gym3','orane',5,1,'Orane, Championne'),hint:night()?null:'L\'arène n\'ouvre que la nuit'})],
 [/Tournoi du Cycle de Brasia/,gN('gym','brasia',5,1,'Brasia : Tournoi du Cycle')],
 [/Monte au Sanctuaire/,gN('sanctuaire',null,6,3,'Cœur du Sanctuaire')],
 [/jumeaux Héliote/,{m:'sanctuaire',lbl:'Sanctuaire du Cycle'}],
 [/Papa t'attend sous le dôme/,()=>({...gN('dome','Papa',9,2,'Papa'),hint:night()?null:'Il t\'attend la nuit'})],
 [/Rentre voir Papa/,gN('salon','Papa',6,3,'Papa')],
 [/Défi du Crépuscule/,gN('gym3','orane',5,1,'Orane : Défi du Crépuscule')],
 [/Temple des Fondateurs/,{m:'temple',lbl:'Temple des Fondateurs'}],
 [/Sceau d'Éclipsar/,gN('sceau',null,5,2,'Sceau d\'Éclipsar')],
 [/feux du Pic Céleste/,{m:'pic',lbl:'Les quatre feux'}],
 [/Conseil du Cycle/,{m:'citadelle',lbl:'Conseil du Cycle'}],
 [/Maestro du Théâtre/,()=>f().v18partQ===1&&!G.bag.partition?gN('marais',null,12,13,'La partition'):gN('theatre','Maestro Fabrizio',7,1,'Maestro Fabrizio')],
 [/Chef Saïd/,gN('dunes','Chef Saïd',20,17,'Chef Saïd')],
 [/Tombeau du Roi des Sables/,()=>f().v18tomb?gN('tombeau2',null,7,2,'Coffre du Roi'):{m:'tombeau',lbl:'Les quatre statues'}],
 [/Frotte la Lampe/,()=>({...gN('oasisH','Sage Amina',4,2,'Sage Amina'),hint:night()?null:'Le génie ne sort que la nuit'})],
 [/gardien de l'Oasis/,()=>({...gN('oasis',null,16,13,'Source de l\'Oasis'),hint:[0,2].includes(phase())?null:'Il se montre à l\'aube et au crépuscule'})],
 [/Maître Kaito/,()=>{const F=f();return!F.t_r3e?gN('route3','r3e',8,2,'Élève de Kaito'):!F.t_mac?gN('marais','mac',20,15,'Élève de Kaito'):!F.t_coa?gN('corail','coa',8,9,'Élève de Kaito'):gN('carnH1','Maître Kaito',4,2,'Maître Kaito')}],
 [/Grand Bal/,()=>({...gN('carnaval',null,15,19,'Faustine'),hint:night()?null:'Le Grand Bal a lieu la nuit'})]];
// Passages qui ne sont ni des bords ni des portes : bateaux et téléphérique.
const GDX=[['port','recif',{who:'Passeur Marius',x:13,y:13},()=>f().badge2,'Passeur Marius (bateau)'],['recif','port',{who:'Passeur Marius',x:11,y:16},null,'Passeur Marius (bateau)'],
 ['carnavelle','corail',{who:'Capitaine Corentin',x:6,y:17},()=>f().v18done,'Capitaine Corentin (ferry)'],['corail','carnavelle',{who:'Capitaine Corentin',x:15,y:17},null,'Capitaine Corentin (ferry)'],
 ['volterre','pic',{door:1,x:13,y:0},()=>f().balance,'Téléphérique'],['pic','volterre',{door:1,x:9,y:19},null,'Téléphérique']];
const GDDES=new Set(['dunes','oasis','oasisH','tombeau','tombeau2']),GDCARN=new Set(['carnaval','gym5','theatre','tente','repaire','repaire2','dunes','oasis','oasisH','bazar','tombeau','tombeau2']);
let GDG=null;
function gdGraph(){if(GDG)return GDG;const L={},add=(a,l)=>(L[a]||=[]).push(l);
 for(const[k,M]of Object.entries(MAPS)){for(const[s,e]of Object.entries(M.edges||{}))if(MAPS[e[0]])add(k,{to:e[0],edge:s});
  for(const[p,v]of Object.entries(M.doors||{})){const[x,y]=p.split(',').map(Number);
   if(Array.isArray(v)){if(MAPS[v[0]])add(k,{to:v[0],door:1,x,y});continue}const m=String(v).match(/warp\('(\w+)'/);if(m&&MAPS[m[1]])add(k,{to:m[1],door:1,x,y})}}
 // Portes « fonction » (arènes, mine, Théâtre…) : on les relie grâce à la porte de retour, qui dépose le joueur juste devant.
 for(const[k,M]of Object.entries(MAPS))for(const v of Object.values(M.doors||{})){if(!Array.isArray(v))continue;const[A,tx,ty]=v,D=MAPS[A]?.doors;if(!D||(L[A]||[]).some(l=>l.to===k))continue;
  let best=null,bd=3;for(const[p,w]of Object.entries(D)){if(Array.isArray(w))continue;const[x,y]=p.split(',').map(Number),d=Math.abs(x-tx)+Math.abs(y-ty);if(d<bd){bd=d;best=[x,y]}}
  if(best)add(A,{to:k,door:1,x:best[0],y:best[1]})}
 for(const[a,b,o,ok,lbl]of GDX)if(MAPS[a]&&MAPS[b])add(a,{to:b,...o,ok,via:lbl});
 return GDG=L}
const gdLinks=k=>(gdGraph()[k]||[]).filter(l=>!l.ok||l.ok());
function gdDist(t){const D={[t]:0},q=[t],rev={};for(const[a,ls]of Object.entries(gdGraph()))for(const l of ls)if(!l.ok||l.ok())(rev[l.to]||=[]).push(a);
 while(q.length){const k=q.shift();for(const a of rev[k]||[])if(D[a]==null){D[a]=D[k]+1;q.push(a)}}return D}
function gdTarget(){if(!G?.flags||!f().starter&&f().intro==null)return null;let s;try{s=goal()}catch(e){return null}
 const r=GDT.find(([re])=>re.test(s));if(!r)return null;const t=typeof r[1]==='function'?r[1]():r[1];return t&&MAPS[t.m]?{...t,goal:s}:null}
let GDB=null;   // cases occupées par des PNJ, calculées une fois par recherche
const gdPass=(M,x,y,ign)=>{const c=M.rows[y]?.[x];if(c==null||SOLID.has(c)||M.doors?.[x+','+y])return false;if(ign)return true;return!(GDB||gdBusy(M)).has(x+','+y)};
const gdBusy=M=>{const S=new Set();for(const n of npcs(M))if(!n.fauna){S.add(n.x+','+n.y);if(n.rx!=null)S.add(n.rx+','+n.ry)}return S};
// Cases à atteindre sur la carte courante pour une cible (PNJ : une case voisine ; porte : la porte ; bord : la bordure).
function gdGoals(M,o){const S=[],mw=M.rows[0].length,mh=M.rows.length;
 if(o.edge){const d='snwe'.indexOf(o.edge);for(let i=0;i<(d<2?mw:mh);i++){const x=d<2?i:d===2?0:mw-1,y=d<2?(d?0:mh-1):i;if(gdPass(M,x,y,1))S.push([x,y,o.edge])}return S}
 let x=o.x,y=o.y;if(o.who){const n=npcs(M).find(n=>n.name===o.who||n.tr?.id===o.who||n.t===o.who);if(n){x=n.x;y=n.y}}if(x==null)return S;
 if(o.door||M.doors?.[x+','+y])return[[x,y,'door']];if(gdPass(M,x,y,1)&&!npcs(M).some(n=>n.x===x&&n.y===y))S.push([x,y]);
 for(let d=0;d<4;d++)if(gdPass(M,x+DX[d],y+DY[d],1))S.push([x+DX[d],y+DY[d]]);return S}
function gdBfs(M,goals,ign){GDB=gdBusy(M);try{return gdBfs0(M,goals,ign)}finally{GDB=null}}
function gdBfs0(M,goals,ign){const mw=M.rows[0].length,key=(x,y)=>y*mw+x,G2=new Map(goals.map(g=>[key(g[0],g[1]),g])),prev=new Map([[key(G.x,G.y),-1]]),q=[[G.x,G.y]];
 for(let h=0;h<q.length;h++){const[x,y]=q[h],k=key(x,y);if(G2.has(k)){const P=[];let c=k;while(c!==-1){P.unshift([c%mw,c/mw|0]);c=prev.get(c)}return{path:P,g:G2.get(k)}}
  for(let d=0;d<4;d++){const nx=x+DX[d],ny=y+DY[d],nk=key(nx,ny);if(prev.has(nk))continue;if(G2.has(nk)||gdPass(M,nx,ny,ign)){prev.set(nk,k);q.push([nx,ny])}}}return null}
// Itinéraire complet : prochaine carte, cases visées, chemin, conseils (masque, tenue des sables).
let GDC={k:'',r:null};
function gdRoute(){const t=gdTarget();if(!t)return null;const ck=[G.map,G.x,G.y,t.goal,t.m,t.x,t.y,t.lbl,now()/600|0].join('|');if(GDC.k===ck)return GDC.r;
 const M=MAPS[G.map],r={t,lbl:t.lbl,hint:t.hint||null,next:null,via:null,goals:[],path:null,maps:[G.map]};
 if(t.m===G.map){r.goals=gdGoals(M,t);if(!t.edge&&!t.door&&t.x!=null){const n=t.who&&npcs(M).find(n=>n.name===t.who||n.tr?.id===t.who||n.t===t.who);r.tp=n?[n.x,n.y]:[t.x,t.y]}}
 else{const D=gdDist(t.m);if(D[G.map]==null){r.far=1}else{const C=gdLinks(G.map).filter(l=>D[l.to]===D[G.map]-1);r.next=C[0]?.to;r.via=C.find(l=>l.via)?.via||null;
   for(const l of C)r.goals.push(...gdGoals(M,l));let k=r.next;while(k&&k!==t.m){r.maps.push(k);const n=gdLinks(k).find(l=>D[l.to]===D[k]-1);k=n?.to}r.maps.push(t.m)}}
 if(r.goals.length){const b=gdBfs(M,r.goals,0)||gdBfs(M,r.goals,1);if(b){r.path=b.path;r.end=b.g}else r.end=r.goals.reduce((a,g)=>Math.hypot(g[0]-G.x,g[1]-G.y)<Math.hypot(a[0]-G.x,a[1]-G.y)?g:a)}
 {const all=[...r.maps,t.m];if(!GDCARN.has(G.map)&&all.some(k=>GDCARN.has(k))&&!carnOpen()&&dgHas('masque'))r.hint='Mets ton masque pour entrer : MENU, TENUES';
  else if(!r.hint&&all.some(k=>GDDES.has(k))&&(t.m!=='dunes'||t.y<15)&&!dgOk('sable')&&dgHas('sable'))r.hint='Mets la Tenue des Sables : MENU, TENUES'}
 GDC={k:ck,r};return r}
const gdOn=()=>G?.opt?.guide!==0;
function gdShow(){return gdOn()&&mode==='world'&&!busy&&!ui.text&&!ui.menus.length&&!ui.panel&&!CAMO&&!CN&&!SCX}
{const dw181=drawWorld;drawWorld=function(t){dw181(t);if(!gdShow()||!CAM)return;let r;try{r=gdRoute()}catch(e){return}if(!r||!r.end)return;
 const[cx,cy]=CAM;let px=G.x*TS,py=G.y*TS;if(move){px=(move.fx+(move.tx-move.fx)*move.t)*TS;py=(move.fy+(move.ty-move.fy)*move.t)*TS}
 const bob=Math.round(Math.sin(t/180)*3),[ex,ey,ek]=r.end,ed='snwe'.indexOf(ek);
 // Repère : au-dessus de la personne visée, au-dessus de la porte, ou au bord de la carte (pointé vers la sortie)
 let mx,my,md=0;if(ed>=0){mx=ex*TS-cx+16+DX[ed]*12;my=ey*TS-cy+16+DY[ed]*12;md=ed}else if(ek==='door'){mx=ex*TS-cx+16;my=ey*TS-cy+10+bob}else{const[tx,ty]=r.tp||[ex,ey];mx=tx*TS-cx+16;my=ty*TS-cy-50+bob}
 if(ed>=0){mx+=DX[ed]*bob;my+=DY[ed]*bob}if(mx>-20&&mx<W+20&&my>-20&&my<H+20)gdMark(mx,my,md);
 // Flèche qui tourne autour du joueur, dirigée vers un point du chemin trois pas plus loin
 let wx=null,wy=null;const P=r.path;if(P&&P.length>1){const p=P[Math.min(3,P.length-1)];wx=p[0];wy=p[1]}else if(P&&ed>=0){wx=G.x+DX[ed];wy=G.y+DY[ed]}else if(!P&&(ex!==G.x||ey!==G.y)){wx=ex;wy=ey}
 if(wx==null)return;const a=Math.atan2(wy*TS-py,wx*TS-px),R=40+Math.sin(t/160)*3;gdArrow(px-cx+16+Math.cos(a)*R,py-cy+4+Math.sin(a)*R*.85,a)}}
function gdArrow(x,y,a){X.save();X.translate(Math.round(x),Math.round(y));X.rotate(a);const P=[[15,0],[-8,-12],[-3,0],[-8,12]],path=(o,c)=>{X.beginPath();P.forEach(([u,v],i)=>i?X.lineTo(u+o,v+o):X.moveTo(u+o,v+o));X.closePath();X.fillStyle=c;X.fill()};
 path(2,'rgba(12,8,28,.5)');path(0,'#ffd23a');X.lineWidth=2.5;X.strokeStyle='#1f1a33';X.stroke();X.beginPath();X.moveTo(10,0);X.lineTo(-5,-8);X.lineTo(-2,0);X.closePath();X.fillStyle='#fff6c0';X.fill();X.restore()}
function gdMark(x,y,d){X.save();X.translate(Math.round(x),Math.round(y));X.rotate([Math.PI/2,-Math.PI/2,Math.PI,0][d]);const P=[[8,0],[-6,-9],[-2,0],[-6,9]];
 X.beginPath();P.forEach(([u,v],i)=>i?X.lineTo(u,v):X.moveTo(u,v));X.closePath();X.fillStyle=(now()/260|0)%2?'#ffd23a':'#ffb020';X.fill();X.lineWidth=2;X.strokeStyle='#1f1a33';X.stroke();X.restore()}
// Bandeau d'objectif (en haut à gauche) : qui aller voir, prochaine étape, conseil.
{const dn181=drawNet;drawNet=function(){dn181();if(!G||!gdShow()||ui.banner||ui.tip||ui.fade>0)return;let r;try{r=gdRoute()}catch(e){return}if(!r)return;
 const L1=r.lbl,L2=r.hint||(r.via&&r.next?'Étape : '+r.via:r.next?'Étape : '+MAPS[r.next].name.split(' · ')[0]:r.far?'Destination : '+MAPS[r.t.m].name.split(' · ')[0]:null);
 const w=Math.min(W-16,Math.max(tw(L1,1),L2?tw(L2,1):0)+34),h=L2?30:18,x=6,y=6;X.globalAlpha=.9;rr(x,y,w,h,3,C.ink);rr(x+2,y+2,w-4,h-4,2,'#2a2050');X.globalAlpha=1;
 X.drawImage(ICO.flag,x+5,y+3,12,12);txt(L1,x+21,y+13,'#ffe27a',{s:1,sh:0});if(L2)txt(L2,x+21,y+25,r.hint?'#ffb0a0':'#d8d0ee',{s:1,sh:0})}}
