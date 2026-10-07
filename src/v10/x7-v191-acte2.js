// =====================================================================
// 19.1 — L'ACTE II REVISITÉ
// - Port-Miroir : « La nuit des bateaux perdus ». Le phare s'est éteint avec le soleil et trois bateaux errent dans le noir.
//   Maëlle n'ouvre pas son arène tant que ses marins ne sont pas rentrés. Ton Bracelet rallume l'Éclat du phare, tu guides
//   les bateaux avec le faisceau (vue « du haut du phare »), puis il faut calmer un Torrentor rendu fou par l'éclipse.
// - Le petit veilleur du ponton : un Ombrelin aperçu dans la brume attend chaque nuit au bout du ponton de Valen.
// - Centrale de Volterre : les sbires montent la garde et tournent la tête ; qui passe sans se faire voir prend Orso par surprise.
// - Observatoire : le sceau cède peu à peu, Kael retient un sbire, Sélène peut être convaincue, et en plein combat final,
//   ce que tu as vécu (le ponton, la grotte, Kael, Caïus, Sélène, le petit Ombrelin) devient des mots pour atteindre Valen.
// - Épilogue : ce que tes choix ont changé dans Aurélys.
// =====================================================================
const F191=()=>f();
SONG.phare191=[230,['triangle',.045,'A4 - - - C5 - E5 - D5 - - - C5 - B4 - A4 - - - E4 - - - G4 - - - - - - -'],['sine',.03,'A2 - - - - - - - F2 - - - - - - - D2 - - - - - - - E2 - - - - - - -'],['sine',.014,'. . . . E5 - - - . . . . A5 - - - . . . . F5 - - - . . . . G#5 - - -']];
const halo191=(x,y,r,c,a)=>{X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');X.globalAlpha=a;X.fillStyle=g;X.fillRect(x-r,y-r,r*2,r*2);X.restore()};
const cone191=(x,y,a,w,len,c,al)=>{X.save();X.globalCompositeOperation='lighter';for(const[k,m]of[[1.8,.35],[1.2,.6],[.6,1]]){X.globalAlpha=al*m;X.fillStyle=c;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(a-w*k)*len,y+Math.sin(a-w*k)*len);X.lineTo(x+Math.cos(a+w*k)*len,y+Math.sin(a+w*k)*len);X.closePath();X.fill()}X.restore()};
const said191=async(s,who)=>{try{await say(s,who)}catch(e){}};

// ---------------------------------------------------------------- Port-Miroir : le ponton devient accessible
// Le Passeur Marius bloquait l'unique accès au ponton (et le Capitaine Loup, au bout, était injoignable) : on les décale.
{const P=MAPS.port,mv=(nm,x,y,d)=>{const n=P.npcs.find(n=>n.name===nm);if(n){n.x=x;n.y=y;n.d=d;if('x0'in n)n.x0=x;if('y0'in n)n.y0=y}};
 mv('Passeur Marius',11,13,3);mv('Capitaine Loup',15,13,0);
 const g=typeof GDX!=='undefined'&&GDX.find(e=>e[0]==='port'&&e[1]==='recif');if(g)g[2]={...g[2],x:11,y:13}}

// ---------------------------------------------------------------- Le phare de la Pointe (décor, faisceau dans le monde)
const phLit191=()=>{const F=F191();return!!(F.v191lit||F.v191ph||F.badge2)};
const ph191On=()=>{const F=F191();return act2()&&!!F.portScene&&!F.badge2&&!F.v191ph};
MAPS.port.npcs.push({x:20,y:16,t:'obj',k:'phare191'});
function drawPh191(sx,sy,t){const lit=phLit191();
 R(X,C.ink,sx-6,sy+14,44,16);R(X,'#3e3a4e',sx-4,sy+15,40,12);R(X,'#5c5670',sx,sy+15,14,3);R(X,'#26222f',sx-4,sy+24,40,3);
 if((t/700|0)%2)R(X,'#9ab8e0',sx-8+((t/350|0)%3)*2,sy+27,10,1);
 for(let i=0;i<5;i++){const y=sy+14-(i+1)*13,w=22-i*2,x=sx+5+i;R(X,C.ink,x,y,w,14);R(X,i%2?'#e6dece':'#c24848',x+1,y+1,w-2,12);R(X,i%2?'#fff8ea':'#e06060',x+1,y+1,2,12)}
 const ty=sy+14-5*13;R(X,C.ink,sx+7,ty-16,18,17);R(X,lit?'#fff2a8':'#3a3c52',sx+9,ty-14,14,12);R(X,C.ink,sx+15,ty-14,2,12);
 R(X,C.ink,sx+5,ty-20,22,5);R(X,'#2e2a40',sx+6,ty-19,20,3);R(X,C.ink,sx+14,ty-26,4,7);
 if(lit){glowAt(sx+16,ty-8,30,.45+.15*Math.sin(t/300));R(X,'#ffffff',sx+11,ty-12,3,3)}}
{const do191=drawObj;drawObj=function(k,sx,sy,t,n){if(k==='phare191')return drawPh191(sx,sy,t);return do191(k,sx,sy,t,n)}}
{const lg191=lighting;lighting=function(M,cx,cy,t,px,py){lg191.apply(this,arguments);try{if(M===MAPS.port&&phLit191()&&(act2()||night())&&!PV191.on){const x=20*TS+16-cx,y=16*TS+14-5*13-8-cy;cone191(x,y,t/2400,.06,300,'#fff2b8',.13);glowAt(x,y,24,.5)}}catch(e){}}}

// ---------------------------------------------------------------- Vue « du haut du phare » et mini-jeu du faisceau
const PV191={on:0,epi:0,ang:-Math.PI/2,boats:[],msg:null,home:0,dmg:0,rev:0};
const PVO={x:W/2,y:H+40},PVH=118,pvY191=z=>PVH+6+(1-z)*150;
const pvPos191=(a,z)=>{const y=pvY191(z),s=(y-PVO.y)/Math.sin(a);return[PVO.x+s*Math.cos(a),y]};
const angD191=(a,b)=>Math.abs(((a-b+Math.PI*3)%(Math.PI*2))-Math.PI);
const ROCK191=[[-2.3,.66],[-1.95,.84],[-1.28,.6],[-.86,.86],[-1.62,.42],[-2.05,.36],[-1.1,.33]];
let SIL191=null;const sil191=()=>{if(SIL191)return SIL191;const im=monSpr('torrentor',0,128),c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle='#04060c';g.fillRect(0,0,c.width,c.height);return SIL191=c};
{const dw191=drawWorld;drawWorld=function(t){if(PV191.on)return pvDraw191(t);if(PV191.epi)return epiDraw191(t);return dw191.apply(this,arguments)}}
function pvDraw191(t){const P=PV191;let g=X.createLinearGradient(0,0,0,PVH);g.addColorStop(0,'#05040c');g.addColorStop(1,'#161b32');X.fillStyle=g;X.fillRect(0,0,W,PVH+2);
 for(let i=0;i<46;i++){const sx=(i*137+11)%W,sy=(i*61+7)%(PVH-16);if(((t/600|0)+i*3)%7)R(X,i%5?'#34324e':'#5e5c84',sx,sy,1,1)}
 const ex=392,ey=34;halo191(ex,ey,40,'#fff0b0',.22+.05*Math.sin(t/700));X.fillStyle='#020206';X.beginPath();X.arc(ex,ey,13,0,7);X.fill();X.strokeStyle='#fff0b0';X.globalAlpha=.6;X.lineWidth=1;X.beginPath();X.arc(ex,ey,14,0,7);X.stroke();X.globalAlpha=1;
 X.fillStyle='#0c0f1e';X.beginPath();X.moveTo(0,PVH+2);for(let x=0;x<=W;x+=12)X.lineTo(x,PVH-5-Math.round(5*Math.sin(x/53)+3*Math.sin(x/19)));X.lineTo(W,PVH+2);X.closePath();X.fill();
 X.beginPath();X.moveTo(26,PVH);X.lineTo(44,PVH-34);X.lineTo(96,PVH-38);X.lineTo(118,PVH);X.closePath();X.fill();X.beginPath();X.arc(70,PVH-38,12,Math.PI,0);X.fill();R(X,'#0c0f1e',58,PVH-40,24,4);
 halo191(70,PVH-46,34,'#c060ff',.22+.12*Math.sin(t/450));R(X,'#e8a0ff',69,PVH-52,2,3);
 g=X.createLinearGradient(0,PVH,0,H);g.addColorStop(0,'#101c34');g.addColorStop(1,'#04080f');X.fillStyle=g;X.fillRect(0,PVH,W,H-PVH);
 for(let i=0;i<26;i++){const k=i/26,y=Math.round(PVH+3+Math.pow(k,1.7)*(H-PVH)),o=(t*(.01+k*.03)+i*57)%90;for(let x=-90+o;x<W;x+=90)R(X,i%3?'#14223c':'#1c2e50',Math.round(x),y,Math.round(18+k*30),1)}
 const lit=(a)=>angD191(a,P.ang)<.085;
 for(const[a,z]of ROCK191){const[x,y]=pvPos191(a,z),s=.5+(1-z)*1.3,L=lit(a);X.fillStyle=L?'#3e4660':'#06080e';X.beginPath();X.moveTo(x-12*s,y+2);X.lineTo(x-6*s,y-7*s);X.lineTo(x-1*s,y-4*s);X.lineTo(x+4*s,y-10*s);X.lineTo(x+12*s,y+2);X.closePath();X.fill();
  if(L){R(X,'#8a94b0',Math.round(x+3*s),Math.round(y-10*s),2,2);R(X,'#c8d4f0',Math.round(x-12*s),y+2,Math.round(24*s),1)}}
 X.globalAlpha=.16;const fo=(t*.012)%W;X.drawImage(FOG,-fo,PVH-30);X.drawImage(FOG,W-fo,PVH-30);X.globalAlpha=.1;X.drawImage(FOG,-(t*.02%W),PVH+40);X.drawImage(FOG,W-(t*.02%W),PVH+40);X.globalAlpha=1;
 cone191(PVO.x,PVO.y,P.ang,.075,470,'#fff4c4',.15);
 for(const b of P.boats){if(b.st==='gone')continue;const[x,y]=pvPos191(b.a,b.z),s=.55+(1-b.z)*1.15,L=lit(b.a)||b.st!=='lost',bob=Math.round(Math.sin(t/380+b.i)*1.5);
  if(b.st==='reveal'){const S=sil191(),k=Math.min(1,(now()-P.rev)/1300),h=S.height*s*1.3*k;X.drawImage(S,0,0,S.width,S.height*k,x+10*s,y-h+8,S.width*s*1.3,h);if(k>.6){const w=S.width*s*1.3,ex=Math.round(x+10*s+w*.5),ey=Math.round(y-h+8+h*.3);halo191(ex,ey,16,'#e070ff',.9);R(X,'#ffb0ff',ex-5,ey,3,2);R(X,'#ffb0ff',ex+3,ey,3,2)}}
  X.globalAlpha=L?1:.28;const hw=Math.round(14*s),hy=Math.round(y+bob);R(X,C.ink,Math.round(x-hw),hy-3,hw*2,5);R(X,L?'#9a6440':'#2a1c14',Math.round(x-hw+1),hy-3,hw*2-2,3);R(X,C.ink,Math.round(x-1),hy-Math.round(18*s),2,Math.round(16*s));
  if(L){X.fillStyle='#e8e0cc';X.beginPath();X.moveTo(x+1,hy-17*s);X.lineTo(x+10*s,hy-5*s);X.lineTo(x+1,hy-5*s);X.closePath();X.fill()}X.globalAlpha=1;
  if(L||(t/600|0)%2===b.i%2){R(X,'#ffd27a',Math.round(x-hw+2),hy-Math.round(7*s),2,2);halo191(x-hw+3,hy-6*s,L?12:9,'#ffcf6a',L?.7:.5)}
  if(b.st==='lost'&&b.p>0){X.strokeStyle='#fff0b0';X.lineWidth=2;X.beginPath();X.arc(x,hy-26*s,7,-Math.PI/2,-Math.PI/2+b.p*Math.PI*2);X.stroke()}}
 X.globalAlpha=.85;R(X,'#0a0812',0,H-26,W,26);X.globalAlpha=1;R(X,'#2a2438',0,H-26,W,2);for(let x=8;x<W;x+=40)R(X,'#2a2438',x,H-24,3,24);
 rr(8,8,156,24,3,C.ink);rr(10,10,152,20,2,C.frameD);txt(`BATEAUX RENTRÉS : ${P.home}/3`,18,24,'#ffffff',{mini:1});
 const B=P.boats.find(b=>b.st==='lost');if(B){const left=Math.max(0,1-B.t/B.tmax);rr(W-118,8,110,24,3,C.ink);rr(W-116,10,106,20,2,C.frameD);txt(B.n.toUpperCase(),W-110,20,'#ffd27a',{mini:1});R(X,'#3a2a4a',W-110,23,94,4);R(X,left>.35?'#9ad06a':'#e8484f',W-110,23,Math.round(94*left),4)}
 if(P.msg){const k=now()-P.msg.t0;if(k<2600){const w=tw(P.msg.s,2,1)+28;rr((W-w)/2|0,40,w,22,3,C.ink);rr(((W-w)/2|0)+2,42,w-4,18,2,'#2a2440');txt(P.msg.s,W/2,55,'#fff0b0',{mini:1,al:'c'})}else P.msg=null}
 txt('GAUCHE / DROITE : TOURNER LE FAISCEAU',W/2,H-9,'#c9c2d6',{mini:1,al:'c'})}
const pvMsg191=s=>{PV191.msg={s:s.replace(/…/g,'...').replace(/,/g,'').replace(/'/g,' '),t0:now()}};
async function pvGame191(){const P=PV191;Object.assign(P,{on:1,ang:-Math.PI/2,home:0,dmg:0,msg:null,rev:0,
  boats:[{n:'La Mouette',a:-2.12,z:.58,i:0},{n:'Le Bigorneau',a:-.98,z:.74,i:1},{n:'La Comète',a:-1.7,z:.9,i:2}].map(b=>({...b,st:'wait',p:0,t:0,tmax:22000,v:(b.i%2?-1:1)*.000035,dmg:0}))});
 P.boats[0].st='lost';pvMsg191('Une lueur clignote dans la brume…');let last=now(),gap=0,out=null;const lb0=ui.lb;ui.lb=0;ui.tip=null;
 try{while(!out){await key(16);const t=now(),dt=Math.min(60,t-last);last=t;if(window.PH191HOLD)continue;const cur=P.boats.find(b=>b.st==='lost'||b.st==='reveal');
  if(window.PH191AUTO&&cur){const d=cur.a-P.ang;P.ang+=Math.sign(d)*Math.min(Math.abs(d),dt*.004)}else{if(held.left)P.ang-=dt*.0012;if(held.right)P.ang+=dt*.0012}
  P.ang=Math.max(-Math.PI/2-1.05,Math.min(-Math.PI/2+1.05,P.ang));
  for(const b of P.boats){if(b.st==='home'){b.z-=dt*.00035;b.a+=(-Math.PI/2-b.a)*Math.min(1,dt*.0012);if(b.z<=.02)b.st='gone';continue}
   if(b.st!=='lost')continue;b.t+=dt;b.a+=b.v*dt;if(b.a<-Math.PI/2-1||b.a>-Math.PI/2+1)b.v=-b.v;
   if(angD191(b.a,P.ang)<.085){b.p=Math.min(1,b.p+dt/1300)}else b.p=Math.max(0,b.p-dt/3500);
   if(b.p>=1){if(b.i===2){b.st='reveal';P.rev=now();sfx('roar');ui.shake=10;pvMsg191('Une ombre énorme tourne autour de La Comète !');await wait(1700);await fadeTo(1,300);out='reveal';break}
    b.st='home';P.home++;sfx('ok');pvMsg191(`${b.n} a vu le faisceau ! Cap sur le port !`);gap=1600;continue}
   if(b.t>=b.tmax){b.t=0;b.dmg++;ui.flash=.4;ui.flashC='#e8484f';sfx('hit');ui.shake=6;
    if(b.dmg>=2){b.st='home';P.home++;P.dmg++;pvMsg191(`${b.n} rentre en boitant…`);gap=1600}else{P.dmg++;pvMsg191(`Crac ! ${b.n} a raclé un récif… Vite !`)}}}
  if(gap>0){gap-=dt;if(gap<=0){const nx=P.boats.find(b=>b.st==='wait');if(nx){nx.st='lost';pvMsg191(nx.i===2?'Une dernière lueur tout au fond…':'Une autre lueur clignote…')}}}}}
 finally{P.on=0;ui.lb=lb0}return{dmg:P.dmg}}

// ---------------------------------------------------------------- Port-Miroir : l'alarme
async function alarm191(){const F=F191();if(F.v191al)return;F.v191al=1;const P='port';await cine(1);
 for(let i=0;i<3;i++){sfx('alert');ui.shake=4;await wait(380)}
 await say('DONG… DONG… DONG… La cloche du port sonne l\'alarme. Partout, des volets s\'ouvrent.');
 const[ox,oy]=nearSpot(3),o=tmpN(P,{x:ox,y:oy,t:'girl',d:0,name:'Odile'});faceTo(o,G.x,G.y);await emote(o,'!',500);await approach(o,5);
 await say('Tu es dresseur ? Alors aide-nous, je t\'en supplie ! Trois bateaux sont partis pêcher ce matin. Avec ce ciel noir, ils ne sont jamais rentrés.','Odile');
 await say('Le phare de la Pointe s\'est éteint en même temps que le soleil. Sans lui, personne ne retrouve l\'entrée du port, et il y a des récifs partout…','Odile');
 await say('Mon Ernest est sur La Mouette. Maëlle est au bout du ponton, elle cherche une solution depuis des heures. Va la voir, vite !','Odile');
 await fadeTo(1,200);rmN(P,o);await fadeTo(0,200);await cine(0);save()}
{const ps191=portScene;portScene=async function(){await ps191.apply(this,arguments);if(ph191On()&&!F191().v191al)await alarm191()}}
{const M=MAPS.port,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);if(G.map==='port'&&ph191On()&&!F191().v191al)await alarm191()}}
{const M=MAPS.port,s0=M.step;M.step=async function(){if(G.map==='port'&&ph191On()&&!F191().v191al){await alarm191();return true}return s0?s0.apply(this,arguments):undefined}}
// L'arène reste fermée tant que les bateaux ne sont pas rentrés
{const D=MAPS.port.doors,d0=D['6,4'];D['6,4']=async(...a)=>{if(ph191On())return say('Un mot est punaisé sur la porte : "ARÈNE FERMÉE. Je suis au bout du ponton. Les bateaux d\'abord. — Maëlle"');return Array.isArray(d0)?warp(...d0):d0(...a)}}
// Les gens du port
MAPS.port.npcs.push({x:9,y:13,t:'girl',d:0,name:'Odile',cond:()=>!!F191().v191al,say:()=>F191().v191ph||F191().badge2?(F191().v191dmg?'Ernest dit que La Mouette a encore une bosse sur la coque. Moi, je dis qu\'il est vivant, et c\'est tout ce qui compte.':'Ernest ne parle plus que de toi. "Un doigt de lumière dans le noir", qu\'il dit. Merci, mille fois.'):'Ernest… Reviens, je t\'en prie…'},
 {x:10,y:13,t:'fisher',d:0,name:'Pêcheur Ernest',cond:()=>!!F191().v191ph,say:()=>night()?'La nuit, je regarde le faisceau tourner. Avant, je n\'y faisais même plus attention.':'Le lac est plein de poissons depuis l\'éclipse. Ils ont peur du noir, eux aussi : ils se serrent près des quais.'});

// ---------------------------------------------------------------- Port-Miroir : Maëlle au bout du ponton
MAPS.port.npcs.push({x:15,y:15,t:'maelle',d:0,name:'Maëlle',cond:ph191On,fn:maelPier191});
async function maelPier191(n){const F=F191(),M='Maëlle';faceTo(n,G.x,G.y);
 if(F.v191st===1){await say('La Comète est toujours là-bas, avec ce Torrentor qui lui tourne autour. Gédéon garde le faisceau braqué sur lui.',M);if(!await ask('Repartir avec Maëlle ?'))return;await cine(1);return torrent191()}
 await cine(1);await say('C\'est toi, le dresseur dont Kael m\'a parlé ? Désolée : l\'arène attendra. Mes marins sont là-dehors, dans le noir.',M);
 await say('Le phare de la Pointe brûle grâce à un Éclat d\'Aube. Il boit la lumière du soleil. Plus de soleil… plus de phare. Le vieux Gédéon a tout essayé.',M);await emote(n,'…',700);
 await say('Le Prof dit que les Éclats réagissent au lien entre un dresseur et sa créature. Et toi, tu portes un Bracelet du Cycle…',M);
 if(!await ask('Essayer de rallumer le phare ?','Maëlle')){await say('Je comprends. Mais fais vite… chaque minute compte.',M);return cine(0)}
 await say('Ma barque est amarrée juste là. Accroche-toi !',M);await light191()}
async function light191(){const F=F191(),ld=G.party.find(alive);musStop();await fadeTo(1,350);await camTo(20,14,0);await fadeTo(0,350);
 await say('Maëlle rame dans le noir jusqu\'à la Pointe. En haut de l\'escalier en colimaçon, un vieil homme vous attend, une lampe-tempête à la main.');
 await say('Maëlle ! Et… un minot ? Si vous arrivez à rallumer ce phare, je vous paie des crêpes jusqu\'à la fin de vos jours.','Gédéon');
 await say(`Tu poses la main sur l'Éclat d'Aube, froid comme une pierre. Ton Bracelet s'éveille…${ld?' '+nm(ld)+' se serre contre toi. L\'Éclat palpite au rythme de vos deux cœurs.':''}`);
 ui.shake=8;for(let i=0;i<3;i++){ui.flash=.35;ui.flashC='#fff0b0';sfx('blip');await wait(220)}F.v191lit=1;rays(20,14,C.goldL,2600);sfx('shard');ui.flash=.8;ui.flashC='#fff4c4';if(ld)bondUp(ld,2);musPlay('phare191');
 await say('L\'ÉCLAT S\'EMBRASE ! Pour la première fois depuis l\'éclipse, le faisceau du phare balaie le lac.');
 await say('Ha ! Regardez-moi ça ! …Mais la brume est épaisse, et les bateaux dérivent. Il faut guider le faisceau à la main. Petit, à toi la manivelle !','Gédéon');
 await say('Tourne le faisceau avec GAUCHE et DROITE. Garde la lumière sur un bateau jusqu\'à ce qu\'il te voie. Fais vite : ils dérivent vers les récifs !');
 await fadeTo(1,300);const res=await (async()=>{const p=pvGame191();await wait(30);await fadeTo(0,300);return p})();F.v191dmg=res.dmg;await fadeTo(0,300);
 await say('C\'est La Comète ! Le bateau de mon fils, Yann ! Et cette ombre qui tourne autour…','Gédéon');
 await say('Un Torrentor sauvage. L\'éclipse le rend fou : il ne voit plus rien, il attaque tout ce qui bouge. Gédéon, garde le faisceau sur lui ! Toi, avec moi !','Maëlle');
 F.v191st=1;save();await torrent191()}
{const tb191=throwBall;throwBall=async function(k){if(B?.o?.trial?.cap191){G.bag[k]=(G.bag[k]||0)+1;await say('Le Torrentor fouette l\'eau et la Capsule rebondit sur ses écailles. Ce n\'est pas le moment : il faut le calmer !',0,1);return false}return tb191(k)}}
async function torrent191(){const F=F191();await say('La barque fend l\'eau noire. Le Torrentor jaillit devant la proue, les yeux voilés de violet !');await camBack(0);await cine(0);
 const m=mon('torrentor',Math.max(16,Math.min(26,lvTop()+1)));m.item=null;
 const r=await battle([m],{trial:{k:'tenir',n:4,cap191:1,rule:'Le faisceau du phare apaise peu à peu le Torrentor. Tiens 4 tours SANS le mettre K.O. : protège-toi, soigne-toi, change de créature.'}});
 if(r==='trial'){F.v191tor=2;await cine(1);await say('Le Torrentor s\'immobilise dans la lumière. Le voile violet quitte ses yeux… Il pousse un long cri, presque un soupir, et plonge sans un remous.')}
 else if(r==='win'){F.v191tor=1;await cine(1);await say('Le Torrentor coule, sonné… puis remonte et s\'éloigne en titubant. Il s\'en remettra. Maëlle, elle, a l\'air songeuse.')}
 else{if(r==='run')await say('Maëlle fait demi-tour… La Comète est toujours en danger ! Parle-lui quand tu seras prêt.');return}
 await reunion191()}
async function reunion191(){const F=F191(),P='port';F.v191ph=1;delete F.v191st;await fadeTo(1,400);loadMap(P,14,15,3);
 const mm=tmpN(P,{x:15,y:15,t:'maelle',d:2,name:'Maëlle'}),ya=tmpN(P,{x:13,y:13,t:'sailor',d:0,name:'Yann'}),rz=tmpN(P,{x:14,y:13,t:'girl',d:0,name:'Rozenn'}),er=MAPS.port.npcs.find(n=>n.name==='Pêcheur Ernest');
 await fadeTo(0,500);await say('Une heure plus tard, trois bateaux dansent le long du quai. Tout Port-Miroir est sorti les accueillir.');
 const od=MAPS.port.npcs.find(n=>n.name==='Odile'&&!n.fix);if(od)await emote(od,'♥',600);
 await say('Je l\'ai vu, le faisceau ! Comme un doigt de lumière qui me montrait la route. Odile, je te promets : plus jamais je ne sors par temps noir.','Ernest');if(er)await emote(er,'♥',600);
 await say('Sans vous deux, ce monstre nous aurait coulés. Papa va être insupportable de fierté pendant au moins dix ans.','Yann');
 if(!F.v191dmg)await say('Pas une égratignure sur Le Bigorneau ! Tiens, c\'est la plus belle perle qu\'on ait remontée cette saison. Elle est à toi.','Rozenn');
 else await say('Le Bigorneau a la coque fendue, mais on est tous là. C\'est tout ce qui compte.','Rozenn');
 faceTo(mm,G.x,G.y);await say('Tu sais… quand on était petits, Valen et moi, on venait aider Gédéon à rallumer le phare, chaque soir. Valen disait que tant qu\'il brillerait, personne ne se perdrait jamais.','Maëlle');
 await emote(mm,'…',800);await say('Il s\'est perdu quand même. Toi, tu as ramené tout le monde.','Maëlle');
 if(F.v191tor===2){await say('Et ce Torrentor… tu ne lui as même pas fait de mal. Tiens : une Coquille Calme. Celui qui la porte garde son sang-froid, comme toi tout à l\'heure.','Maëlle');give('coquille');await say('Tu reçois une COQUILLE CALME !')}
 await camTo(16,15,600);await say('Tiens… le petit Ombrelin est encore là, au bout du ponton. Il vient chaque nuit, depuis des années. Mémé Rosa dit qu\'il attend quelqu\'un.','Maëlle');F.v191omH=1;await camBack(500);
 await say('Bon. Mes marins sont rentrés : mon arène est ouverte. Viens me défier quand tu veux. Et ne te retiens pas… moi, je ne me retiendrai pas.','Maëlle');
 give('filetcapsule',3);await say('Ernest et Odile t\'offrent 3 FILET CAPSULES : "Pour les créatures d\'eau et de plante, c\'est imbattable !"');
 give('biscuit',3);await say('Yann te remet 3 BISCUITS D\'AUBE de la part de Gédéon : "Ma mère les faisait pour les créatures du port. Papa dit qu\'elles en raffolent."');
 if(!F.v191dmg){give('perle');await say('Tu reçois une PERLE DES MARÉES !')}
 await fadeTo(1,400);for(const n of[mm,ya,rz])rmN(P,n);await cine(0);await fadeTo(0,400);save()}
// Maëlle, à l'arène, se souvient de la nuit
{const mt=MAPS.gym2?.npcs.find(n=>n.tr?.id==='maelle')?.tr;if(mt){const p0=mt.pre;Object.defineProperty(mt,'pre',{configurable:true,get:()=>F191().v191ph?'Tu as ramené mes marins. Merci… Mais ici, c\'est autre chose. La pluie est mon alliée : sous l\'averse, mes Crapaflot nagent deux fois plus vite et l\'EAU frappe une fois et demie plus fort. Change le temps, ou noie-toi sous la vague !':p0,set:v=>{}})}}

// ---------------------------------------------------------------- Le petit veilleur du ponton
const fr191=(M,x,y)=>{const c=M.rows[y]?.[x];return!!c&&!SOLID.has(c)&&!npcs(M).some(n=>n.x===x&&n.y===y)&&!(x===G.x&&y===G.y)};
const omOwn191=()=>[...G.party,...G.box].some(m=>m.pb19);
const omStory191=()=>{const F=F191();return!!F.r2&&!!(F.v191omH||F.v191om)&&!F.v191omR&&(F.v191om|0)<3&&!omOwn191()};
// Route 2 : une silhouette dans la brume
{const M=MAPS.route2,s0=M.step;M.step=async function(){const F=F191();if(act2()&&!F.v191om&&G.x>=10&&G.x<=22&&await omGlimpse191())return true;return s0?s0.apply(this,arguments):undefined}}
async function omGlimpse191(){const F=F191(),M=MAPS.route2;let p=null;for(let k=3;k<=5&&!p;k++)for(const dy of[0,-1,1])if(fr191(M,G.x-k,G.y+dy)){p=[G.x-k,G.y+dy];break}if(!p)return false;
 F.v191om=1;await cine(1);const o=tmpN('route2',{x:p[0],y:p[1],t:'mon',sp:'ombrelin',d:3,a:.85});puff(p[0],p[1],'#8a7ab0',8);await emote(o,'?',800);
 await say('Dans la brume, un petit Ombrelin te fixe de ses grands yeux. Il n\'a pas l\'air sauvage… plutôt perdu.');
 o.a=.5;await wait(300);o.a=.25;puff(o.x,o.y,'#8a7ab0',12);rmN('route2',o);await say('Le temps d\'un battement de cils, il s\'est fondu dans le brouillard. Vers l\'ouest… vers Port-Miroir.');await cine(0);save();return true}
// Port-Miroir : il attend la nuit, au bout du ponton
MAPS.port.npcs.push({x:16,y:15,t:'mon',sp:'ombrelin',d:0,a:.9,cond:()=>!!F191().r2&&(act2()||night())&&(F191().v191om|0)<3&&!omOwn191(),fn:omPier191});
async function omPier191(n){const F=F191();
 if((F.v191om|0)<2){if(!(G.bag.biscuit>0)){await emote(n,'!',500);await say(F.v191omR?'Le petit Ombrelin recule d\'un pas, puis s\'arrête. Mémé Rosa a parlé de Biscuits d\'Aube…':'Le petit Ombrelin recule, méfiant. Il ne quitte pas des yeux le lac noir, comme s\'il attendait quelqu\'un.');if(!F.v191omH){F.v191omH=1;save()}return}
  if(!await ask('Poser un Biscuit d\'Aube sur le ponton ?'))return;G.bag.biscuit--;await cine(1);
  await say('Tu poses un Biscuit d\'Aube sur les planches et tu recules doucement…');await emote(n,'?',900);
  await say('Le petit Ombrelin s\'approche, renifle… et le croque en trois bouchées. Puis il lève les yeux vers toi.');await emote(n,'♥',800);F.v191om=2;F.v191omH=1;await cine(0)}
 const c=await choose(['L\'EMMENER AVEC MOI','LE LAISSER VEILLER'],{w:260,title:'Le petit Ombrelin te regarde'});
 if(c!==0){await say('Tu lui fais un petit signe. Il se retourne vers le lac. Il sera encore là la prochaine nuit.');return}
 const m=mon('ombrelin',Math.max(14,lvTop()-3));m.pb19=1;m.aff=140;dex('ombrelin',2);if(G.party.length<6)G.party.push(m);else G.box.push(m);F.v191om=3;jingle('item');
 await say(`Le petit Ombrelin saute dans tes bras ! Il rejoint ${G.party.includes(m)?'ton équipe':'la Boîte'}.`);
 await say('Il ne te lâche plus d\'une semelle… mais de temps en temps, il fixe le nord. Vers l\'Observatoire. Garde-le près de toi.');save()}
// Mémé Rosa raconte
{const rn=MAPS.port.npcs.find(n=>n.name==='Mémé Rosa');if(rn){const f0=rn.fn,q0=rn.qm;rn.qm=()=>!!(q0&&q0())||omStory191();
 rn.fn=async function(n){if(!omStory191())return f0.apply(this,arguments);const F=F191(),R='Mémé Rosa';F.v191omR=1;
  await say('Le petit Ombrelin du ponton ? Ah… Tu l\'as vu, toi aussi.',R);
  await say('Brume, l\'Ombrelin de Valen, s\'asseyait chaque nuit au bout du ponton. Le petit est arrivé l\'été où Brume s\'est éteint. Les vieux du port disent que c\'est son petit.',R);
  await say('Depuis, il attend. Il ne laisse personne l\'approcher. Brume, lui, ne résistait jamais à un Biscuit d\'Aube…',R);
  if(!(G.bag.biscuit>0)){give('biscuit');await say('Tiens, j\'en garde toujours un dans mon tablier. Pour lui. Tu reçois un BISCUIT D\'AUBE.',R)}save()}}}

// ---------------------------------------------------------------- Objectifs, guide et journal
{const g191=goal;goal=function(){const F=F191();if(ph191On()&&F.v191al)return F.v191st===1?'La Comète est en danger : rejoins Maëlle au bout du ponton pour calmer le Torrentor.':'Les bateaux de Port-Miroir sont perdus dans le noir. Rejoins Maëlle au bout du ponton.';return g191()}}
GDT.unshift([/rejoins Maëlle au bout du ponton/i,gN('port','Maëlle',15,15,'Maëlle')]);
{const q191=quests;quests=function(){const Q=q191(),F=F191();
 if(F.v191al)Q.push(['La nuit des bateaux perdus',F.v191ph?2:1,F.v191ph?`Les trois bateaux sont rentrés au port${F.v191tor===2?', et tu as calmé le Torrentor sans le blesser':''}.`:'Le phare de la Pointe est éteint et trois bateaux errent dans le noir. Maëlle t\'attend au bout du ponton.']);
 if(F.v191om||F.v191omH)Q.push(['Le petit veilleur du ponton',(F.v191om|0)>=3?2:1,(F.v191om|0)>=3?'Le petit Ombrelin du ponton t\'a suivi.':F.v191omR?'Brume ne résistait jamais à un Biscuit d\'Aube, dit Mémé Rosa. Le petit Ombrelin attend la nuit, au bout du ponton.':'Un petit Ombrelin attend chaque nuit au bout du ponton de Port-Miroir. Mémé Rosa en sait peut-être plus.']);
 return Q}}
