// =====================================================================
// EXTENSION 14.0 — Le Grand Voyage : Envol (Relais de Léo), Expéditions de la Boîte,
// Faille des Songes (donjon généré, rejouable), chambre à décorer (Meublerie de Port-Miroir).
// =====================================================================
ICO.relais=icon(["......yy","....yyYo","..yyYYo.","oyyYYo..","oYYYo...",".ooo....","..o.....","........"]);
ICO.expe=icon(["..oooo..",".oyyyyo.","oyobboyo","oybbbbyo","oybbbbyo","oyobboyo",".oyyyyo.","..oooo.."],{b:'#3a8a4a'});
// --- Envol : Facteur Léo prête son Piafou messager après le Badge Miroir
const RELAIS={bourg:[5,6],ville:[14,5],port:[19,5],lunevie:[15,12],volterre:[19,6],coteaux:[12,8],lac:[24,4],recif:[11,15],pic:[10,18]};
const flyOk=(k,cur)=>!!(G.keys.relais&&RELAIS[k]&&G.seen?.[k]&&k!==cur);
async function flyTo(k){const nmK=MAPS[k].name.split(' · ').pop();
 if(['in','cave','tech'].includes(MAPS[G.map].amb)||MAPS[G.map].noFly){await say('Le Piafou du Relais ne peut pas te rejoindre ici. Il faut être à ciel ouvert.');return false}
 if(!await ask(`S'envoler vers ${nmK} ?`))return false;
 const t0=now(),P=ui.panel;ui.panel=()=>{P?.();const k2=Math.min(1,(now()-t0)/900);X.fillStyle=`rgba(200,230,255,${k2*.6})`;X.fillRect(0,0,W,H);X.drawImage(monSpr('piafou',0,48),-60+k2*(W+120),H/2-40-Math.sin(k2*3.14)*50,64,64)};
 sfx('run');await wait(900);ui.panel=null;await fadeTo(1,250);loadMap(k,RELAIS[k][0],RELAIS[k][1],0);await fadeTo(0,350);sfx('ok');f().flyN=(f().flyN||0)+1;save();
 if(MAPS[k].enter)await MAPS[k].enter();await say(`Le Piafou te dépose à ${nmK} et repart en piaillant.`,0,1);return true}
{const L=MAPS.bourg.npcs.find(n=>n.name==='Facteur Léo');if(L){const fn0=L.fn,qm0=L.qm;
 L.qm=()=>qm0()||!!(f().badge2&&!G.keys.relais);
 L.fn=async n=>{if(!f().badge2||G.keys.relais)return fn0(n);const F='Facteur Léo';
  await say('Le Badge Miroir ! Tout Bourg-Lueur ne parle que de ça. Tu voyages tellement que mes lettres n\'arrivent jamais à te rattraper…',F,0,'kid');
  await say('Alors j\'ai dressé un Piafou messager. Il connaît chaque toit, chaque quai et chaque col d\'Aurélys. Il porte un sac de courrier… ou un dresseur, s\'il faut !',F,0,'kid');
  G.keys.relais=1;jingle('item');ui.pop={ic:ICO.relais,t0:now()};
  await say('Tu reçois le SIFFLET DU RELAIS !');
  await say('Ouvre la CARTE et choisis un lieu où tu es déjà allé : siffle (A), et le Piafou t\'y emmène. Pas sous terre ni sous un toit, il n\'aime pas ça.',F,0,'kid');save()}}}
// --- Expéditions : les créatures de la Boîte explorent les lieux visités
// [lieu, niveau conseillé, types à l'aise, butin courant, butin rare]
const EXZ={route1:[5,['NOR','PLA'],['potion','capsule','baiesoin','biscuit','repousse'],['superpotion']],
 foret:[11,['PLA','OMB'],['baiesoin','baieprisme','superpotion','biscuit'],['pierrelune','grainemiracle']],
 mont:[16,['FEU','ROC'],['superpotion','supercapsule','etinc','pepite'],['pierresoleil','charbon']],
 coteaux:[17,['PLA','NOR'],['baieprisme','biscuit','superpotion','totalsoin'],['tartecycle','pepite']],
 route2:[20,['EAU','PLA'],['superpotion','supercapsule','totalsoin','baiesoin'],['eaumystique','perle']],
 lac:[24,['EAU','LUM'],['hyperpotion','filetcapsule','perle','baieprisme'],['etoilefilante','pierrelune']],
 grotte:[25,['ROC','OMB'],['elixir','hypercapsule','pepite','etinc'],['pierrelune','pierredure']],
 volterre:[28,['ELE','NOR'],['hyperpotion','elixir','etinc','rapidecapsule'],['pierreorage','aimant']],
 bois:[30,['OMB','PLA'],['sombrecapsule','rappel','elixir','baieprisme'],['encensnoir','pierrelune']],
 galeries:[32,['ROC','ELE'],['lingot','pepite','etinc','hypercapsule'],['pierreorage','fossilefeuille']],
 recif:[36,['EAU','ROC'],['perle','filetcapsule','maxpotion','elixir'],['dc_cascade','etoilefilante']],
 pic:[52,['LUM','NOR'],['megacapsule','rappelmax','etoilefilante','maxpotion'],['pierreaube','poudretoile']]};
const EXD=[['COURTE',240,1],['LONGUE',600,2]];
const exOk=()=>!!f().badge;
const exDone=e=>e.s<=0;
const step14=onStep;onStep=async function(){await step14.apply(this,arguments);if(!G?.exped?.length)return;let back=0;for(const e of G.exped)if(e.s>0&&--e.s===0)back=1;
 if(back){ui.note={s:'Une expédition est de retour !',t0:now()};tip('expe','Une expédition est rentrée ! Va dans un Centre de Soins (BOÎTE, puis EXPÉDITIONS) pour accueillir ta créature et son butin.')}};
function exLoot(e){const Z=EXZ[e.z],m=e.m,match=Z[1].includes(SP[m.sp].t),strong=m.lv>=Z[0],D=EXD[e.d||0];
 const n=(1+(match?1:0)+(strong?1:0)+(bondLv(m)>=3?1:0))*D[2],L={};
 for(let i=0;i<n;i++){const rare=Math.random()<(match?.22:.1)*(strong?1.2:.7),k=rare?Z[3][rnd(0,Z[3].length-1)]:Z[2][rnd(0,Z[2].length-1)];if(IT[k])L[k]=(L[k]||0)+1}
 const xp=Math.round(72*Z[0]*D[2]*(strong?1:1.4));return{L,xp,match,strong}}
async function exReturn(e){const m=e.m,Z=EXZ[e.z],r=exLoot(e),lv0=m.lv;G.exped.splice(G.exped.indexOf(e),1);
 m.exp+=r.xp;penOut(m);bondUp(m,8*EXD[e.d||0][2]);fullHeal(m);G.box.push(m);f().expN=(f().expN||0)+1;
 for(const[k,q]of Object.entries(r.L))G.bag[k]=(G.bag[k]||0)+q;jingle('item');
 await say(`${nm(m)} rentre de ${MAPS[e.z].name.split(' · ').pop()}${r.match?', ravi : ce lieu lui va comme un gant':''} !`);
 await say(`Il rapporte : ${Object.entries(r.L).map(([k,q])=>`${IT[k][0]} x${q}`).join(', ')||'quelques souvenirs'}.${m.lv>lv0?` Il est passé au niveau ${m.lv} !`:''} Votre lien s'est renforcé.`);
 if(Object.keys(r.L).some(k=>EXZ[e.z][3].includes(k)))await say('Une trouvaille rare ! Les créatures qui connaissent bien un lieu en dénichent plus souvent.')}
async function expeMenu(){const N='Infirmière';G.exped??=[];
 if(!f().expI){f().expI=1;await say('Les Centres de Soins d\'Aurélys forment un réseau : les créatures de la Boîte peuvent partir en EXPÉDITION dans les lieux que tu as déjà visités.',N);
  await say('Elles en rapportent des objets, de l\'expérience et un lien plus fort. Une créature dont le type convient au lieu, et assez forte pour lui, trouve bien plus de choses, et parfois des raretés.',N);
  await say('Trois expéditions à la fois au maximum. Elles avancent pendant que tu marches. Tu pourras les accueillir dans n\'importe quel Centre.',N)}
 for(;;){const E=G.exped,done=E.filter(exDone);
  show(E.length?E.map(e=>`${nm(e.m)} : ${MAPS[e.z].name.split(' · ').pop()} — ${exDone(e)?'de retour !':e.s+' pas'}`).join(' · '):'Aucune créature en expédition.',N);
  const O=[...(done.length?['ACCUEILLIR']:[]),'ENVOYER','RETOUR'],i=await choose(O,{w:170});ui.text=null;const k=O[i];if(i<0||k==='RETOUR')return;
  if(k==='ACCUEILLIR'){for(const e of done)await exReturn(e);save();continue}
  if(E.length>=3){await say('Trois créatures sont déjà en route. Attends qu\'une revienne !',N);continue}
  if(!G.box.length){await say('Ta Boîte est vide. Dépose d\'abord une créature dans la Boîte.',N);continue}
  const j=await choose(G.box.map(m=>`${nm(m)}  Nv ${m.lv}  ${SP[m.sp].t}`),{x:W-268,y:8,w:260,vis:8,title:'Qui envoyer ?'});if(j<0)continue;const m=G.box[j];
  const Z=Object.keys(EXZ).filter(z=>G.seen?.[z]);
  const z=await choose(Z.map(z=>`${(MAPS[z].name.split(' · ').pop()).slice(0,16)}  Nv ${EXZ[z][0]}${EXZ[z][1].includes(SP[m.sp].t)?' ★':''}`),{x:W-268,y:8,w:260,vis:8,title:'Où ?',info:q=>({icon:monSpr(m.sp,0,48),s:`Types à l'aise : ${EXZ[Z[q]][1].join(', ')}. ${EXZ[Z[q]][1].includes(SP[m.sp].t)?nm(m)+' s\'y sentira chez lui (★).':''} ${m.lv<EXZ[Z[q]][0]?'Un peu dangereux pour son niveau : il gagnera plus d\'EXP mais trouvera moins.':''}`})});if(z<0)continue;
  const d=await choose(EXD.map(([l,s])=>`${l} (${s} pas)`),{w:200,title:'Durée'});if(d<0)continue;
  G.box.splice(j,1);if(m.eq)setEq(m,null);E.push({m,z:Z[z],s:EXD[d][1],d});sfx('run');await say(`${nm(m)} part explorer ${MAPS[Z[z]].name.split(' · ').pop()} ! Il reviendra dans ${EXD[d][1]} pas.`,N);save()}}
const box14=boxMenu;boxMenu=async function(){if(!exOk())return box14();G.exped??=[];const nd=G.exped.filter(exDone).length;
 const i=await choose(['RETIRER','DÉPOSER',`EXPÉDITIONS${nd?' !':''}`],{w:190});if(i<0)return;if(i===2)return expeMenu();
 if(i===0){if(!G.box.length)return say('La Boîte est vide.');if(G.party.length>=6)return say('Ton équipe est pleine (6 maximum).');const j=await choose(G.box.map(m=>`${nm(m)}  Nv ${m.lv}`),{x:W-268,y:8,w:260,vis:8,title:'Boîte'});if(j>=0){const m=G.box.splice(j,1)[0];fullHeal(m);G.party.push(m);await say(`${nm(m)} rejoint ton équipe !`)}}
 else{if(G.party.length<2)return say('Tu dois garder au moins une créature !');const j=await partyMenu('Déposer qui ?');if(j>=0){const m=G.party.splice(j,1)[0];G.box.push(m);await say(`${nm(m)} est déposé dans la Boîte.`)}}};
// --- Faille des Songes : donjon généré à Lunévie, étages infinis, Échos tous les 5 étages
IT.songe=['Éclat de Songe',0,'Un fragment de rêve cristallisé, rapporté de la Faille des Songes. La Rêveuse Nyx, à Lunévie, l\'échange contre des lots.',0,'quest'];
ICO.songe=icon(["...pp...","..pwPp..",".pwpPPp.","pwppPPPp",".pPPPPp.","..pPPp..","...pp...","........"]);
const SGW=24,SGH=17;
const rng32=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const sgLv=D=>Math.max(5,Math.min(98,Math.round(D.P*.8)+D.fl));
const ECHO=[['Écho de Kael','rival',['NOR','PLA','FEU','EAU'],'Tu veux savoir si tu es devenu plus fort ? Moi aussi. Même en rêve, je ne te ferai pas de cadeau !'],
 ['Écho de Sélène','selene',['OMB','LUM'],'Les rêves sont faits de crépuscule. Ici, je suis chez moi.'],
 ['Écho de Vex','vex',['OMB','FEU'],'Tu croyais m\'avoir laissé derrière toi ? Les rêves gardent tout. Même les erreurs.'],
 ['Écho de Caïus','caius',['ROC','ELE'],'Je suis la part de Caïus qui n\'a jamais renoncé à la Faille. Montre-moi ta lumière.'],
 ['Écho de Valen','valen',['OMB','LUM','EAU'],'Je ne suis qu\'un souvenir de Valen. Mais un souvenir peut encore se battre pour le Cycle.']];
const SGTR=[['Ombre rêveuse','girl'],['Dresseur oublié','scout'],['Somnambule','old'],['Écho sans nom','kid'],['Marin des songes','sailor'],['Pêcheuse de brume','fisher']];
const sgPool=()=>DEX.filter(k=>SP[k]&&!LEG12.includes(k));
function sgTeam(r,n,lv,types){let P=sgPool();if(types){const T=P.filter(k=>types.includes(SP[k].t));if(T.length>=n)P=T.sort((a,b)=>SP[b].bs.reduce((s,v)=>s+v,0)-SP[a].bs.reduce((s,v)=>s+v,0)).slice(0,Math.max(n*3,12))}
 const out=[];while(out.length<n){const k=P[Math.floor(r()*P.length)];if(!out.includes(k)||P.length<n)out.push(k)}return out.map(k=>[k,lv])}
function sgGen(D){const fl=D.fl,r=rng32(D.run*7919+fl*104729),ri=(a,b)=>a+Math.floor(r()*(b-a+1)),boss=fl%5===0,L=sgLv(D);
 const g=[...Array(SGH)].map(()=>Array(SGW).fill('^')),rooms=[],npcs=[],id=s=>`fs_${D.run}_${fl}_${s}`;
 if(boss)rooms.push({x:4,y:3,w:16,h:11});else{let t=0;while(rooms.length<6&&t++<300){const w=ri(4,7),h=ri(3,5),x=ri(1,SGW-w-1),y=ri(2,SGH-h-1);if(rooms.some(o=>x<o.x+o.w+1&&x+w+1>o.x&&y<o.y+o.h+1&&y+h+1>o.y))continue;rooms.push({x,y,w,h})}rooms.sort((a,b)=>a.x-b.x)}
 for(const o of rooms)for(let y=o.y;y<o.y+o.h;y++)for(let x=o.x;x<o.x+o.w;x++)g[y][x]='g';
 const cen=o=>[o.x+(o.w>>1),o.y+(o.h>>1)];
 for(let i=1;i<rooms.length;i++){let[x,y]=cen(rooms[i-1]);const[tx,ty]=cen(rooms[i]),hf=r()<.5;
  const hz=()=>{while(x!==tx){x+=Math.sign(tx-x);g[y][x]='g'}},vt=()=>{while(y!==ty){y+=Math.sign(ty-y);g[y][x]='g'}};if(hf){hz();vt()}else{vt();hz()}}
 if(!boss)for(const o of rooms.slice(1))if(r()<.65){const w=ri(2,Math.min(4,o.w-1)),h=ri(1,Math.min(3,o.h-1)),x=ri(o.x,o.x+o.w-w),y=ri(o.y,o.y+o.h-h);for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)g[yy][xx]='v'}
 const[sx,sy]=boss?[12,12]:cen(rooms[0]);g[sy][sx]='g';let st=null;
 if(!boss){const far=rooms.slice(1).sort((a,b)=>Math.hypot(...cen(b).map((v,i)=>v-[sx,sy][i]))-Math.hypot(...cen(a).map((v,i)=>v-[sx,sy][i])))[0]||rooms[0];
  const cs=[];for(let x=far.x;x<far.x+far.w;x++)if(g[far.y-1][x]==='^')cs.push(x);const x=cs.length?cs[Math.floor(r()*cs.length)]:far.x;st=[x,far.y-1];g[far.y-1][x]='@';g[far.y][x]='g'}
 const used=new Set([sx+','+sy,...(st?[st[0]+','+(st[1]+1)]:[])]),free=()=>{for(let k=0;k<60;k++){const o=rooms[ri(boss?0:1,rooms.length-1)]||rooms[0],x=ri(o.x,o.x+o.w-1),y=ri(o.y+1,o.y+o.h-1);if(g[y][x]!=='^'&&!used.has(x+','+y)&&Math.abs(x-sx)+Math.abs(y-sy)>3){used.add(x+','+y);return[x,y]}}return null};
 const LOOT=L<25?['superpotion','supercapsule','baiesoin','biscuit','totalsoin','elixir']:L<50?['hyperpotion','hypercapsule','elixir','rappel','baieprisme','etinc']:['maxpotion','megacapsule','rappelmax','elixir','etinc','pepite'];
 if(boss){const e=ECHO[(fl/5-1)%ECHO.length],n=Math.min(6,3+Math.floor(fl/10));
  npcs.push({x:12,y:5,t:e[1],d:0,name:e[0],los:0,tr:TR(id('boss'),e[0],sgTeam(r,n,L+3,e[2]).map(([s,l])=>[s,l,undefined,'baiesoin']),L*60,e[3],'Le rêve se trouble… Tu as gagné.',{boss:1,post:'L\'écho s\'est dissipé.',win:()=>sgBoss()})})}
 else{for(let i=ri(1,3);i>0;i--){const p=free();if(p)npcs.push(I(p[0],p[1],LOOT[ri(0,LOOT.length-1)],ri(1,2),id('i'+i)))}
  if(r()<.3){const p=free();if(p)npcs.push(I(p[0],p[1],'songe',ri(1,2),id('s')))}
  for(let i=Math.min(3,ri(0,1)+(fl>=8?1:0));i>0;i--){const p=free();if(!p)continue;const[nm2,lk]=SGTR[ri(0,SGTR.length-1)];
   npcs.push({x:p[0],y:p[1],t:lk,d:ri(0,3),name:nm2,tr:TR(id('t'+i),nm2,sgTeam(r,fl<5?2:fl<15?3:4,L),L*25,'… Tu marches dans mes rêves. Alors tu te bats dans mes rêves.','Je… me réveille ?',{post:'Le rêveur s\'est assoupi.'})})}
  if(r()<.28){const p=free();if(p)npcs.push({x:p[0],y:p[1],t:'obj',k:'fire',name:'Feu onirique',fn:async n=>{if(f()[id('f')])return say('Les braises du feu onirique sont froides.');f()[id('f')]=1;await fadeTo(.6,250);healAll();await fadeTo(0,250);jingle('heal');await say('Un feu qui ne brûle pas. Sa chaleur soigne ton équipe… puis il s\'éteint.')}})}
  const pass=(x,y)=>g[y]?.[x]&&g[y][x]!=='^'&&g[y][x]!=='@',reach=()=>{const B=new Set(npcs.map(n=>n.x+','+n.y)),S=new Set([sx+','+sy]),q=[[sx,sy]];while(q.length){const[x,y]=q.pop();for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const k=(x+a)+','+(y+b);if(!S.has(k)&&pass(x+a,y+b)&&!B.has(k)){S.add(k);q.push([x+a,y+b])}}}return S.has(st[0]+','+(st[1]+1))&&npcs.every(n=>[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>S.has((n.x+a)+','+(n.y+b))))};
  while(npcs.length&&!reach())npcs.pop()}
 const enc=sgTeam(r,5,0).map(([k],i)=>[k,Math.max(2,L-2),L+1,i?20:8]);
 return{rows:g.map(r2=>r2.join('')),npcs,enc,start:[sx,sy],st}}
MAPS.songe={name:'Faille des Songes',bg:'grotte',amb:'cave',cave:true,dream:1,encAll:true,crys:1,noFly:1,mus:'ruines',rows:sgGen({run:1,fl:1,P:20}).rows,enc:[],doors:{},npcs:[]};
function sgBuild(D){const S=sgGen(D),M=MAPS.songe;M.rows=S.rows;delete M.rows0;M.L=null;M.glo=[];M.blink=[];M.npcs=S.npcs;M.enc=S.enc;M.doors=S.st?{[S.st.join(',')]:()=>sgNext()}:{};M.name=`Faille des Songes · Étage ${D.fl}`;M.key=D.run+'_'+D.fl;return S}
async function sgEnter(){const P=Math.max(...G.party.map(m=>m.lv));G.dream={run:(Date.now()%1e7)|0,fl:1,P,got:0};const S=sgBuild(G.dream);sfx('shard');await fadeTo(1,500);ui.banner=null;loadMap('songe',...S.start,1);await fadeTo(0,500);
 await say(`Tu plonges dans la Faille… Étage 1. Les rêves s'accordent à ta force (niveau ${sgLv(G.dream)} environ).`);await tipSay('songe','Trouve la brèche dans la roche pour descendre. Pas de Centre de Soins ici : seuls de rares feux oniriques soignent. Tous les 5 étages, un Écho t\'attend ; après l\'avoir vaincu, tu peux te réveiller avec ton butin.');save()}
async function sgNext(){const D=G.dream;if(!D)return;D.fl++;D.got++;G.bag.songe=(G.bag.songe||0)+1;f().sgBest=Math.max(f().sgBest||0,D.fl);sfx('door');await fadeTo(1,300);const S=sgBuild(D);ui.banner=null;loadMap('songe',...S.start,1);await fadeTo(0,300);
 if(D.fl%5===0){await cine(1);await camTo(12,5,700);await say('Une silhouette familière se dresse au fond de la salle… mais ses contours tremblent comme une flamme.');await camBack();await cine(0)}save()}
async function sgBoss(){const D=G.dream;G.bag.songe=(G.bag.songe||0)+5;D.got+=5;f().sgEcho=(f().sgEcho||0)+1;await fadeTo(.6,300);healAll();await fadeTo(0,300);jingle('heal');
 await say(`L'écho se dissipe en poussière d'étoiles. Tu ramasses 5 Éclats de Songe, et une douce chaleur soigne ton équipe.`);
 const i=await choose(['DESCENDRE PLUS BAS','SE RÉVEILLER'],{w:230,title:`Étage ${D.fl}`});if(i===0)return sgNext();return sgWake(0)}
function sgEnd(){const F=f();for(const k of Object.keys(F))if(k.startsWith('i_fs_')||k.startsWith('t_fs_')||k.startsWith('fs_'))delete F[k];G.dream=null}
async function sgWake(lost){const D=G.dream;sgEnd();await fadeTo(1,600);healAll();loadMap('lunevie',19,8,1);await fadeTo(0,600);
 await say(lost?`Tu te réveilles en sursaut près de la Faille… Le rêve s'est dissipé à l'étage ${D.fl}.`:`Tu ouvres les yeux à Lunévie. Tu es descendu jusqu'à l'étage ${D.fl}.`);await say(`Éclats de Songe rapportés pendant ce rêve : ${D.got}. Record : étage ${f().sgBest||1}.`,'Rêveuse Nyx',0,'girl');save()}
const load14=loadMap;loadMap=function(map,...a){if(G?.dream&&map!=='songe')sgEnd();if(map==='songe'&&G?.dream&&MAPS.songe.key!==G.dream.run+'_'+G.dream.fl)sgBuild(G.dream);if(map==='chambre')roomApply(1);return load14(map,...a)};
const battle14=battle;battle=async function(foes,o={}){if(G?.map!=='songe'||!G.dream)return battle14(foes,o);o.noLose=1;o.loseMsg='Ton équipe s\'effondre… Le rêve se trouble et se dissipe.';
 const r=await battle14(foes,o);if(r==='lose'||!G.party.some(alive))await sgWake(1);return r};
const PRZ14=[['biscuit',2],['maxpotion',3],['etinc',3],['elixir',3],['megacapsule',5],['rappelmax',6],['rubanher',10],['pierreaube',14],['dc_voilestellaire',18],['dc_lamecycle',22],['bq:boussole',25],['bq:masque',30]];
async function nyx(){const N='Rêveuse Nyx',F=f();
 if(!F.badge3)return say('Chut… La faille dort encore. Reviens quand le Crépuscule de Lunévie t\'aura reconnu.',N,0,'girl');
 if(!F.sgI){F.sgI=1;await say('Tu la vois, toi aussi ? Cette faille dans l\'air… Depuis que le Cycle a vacillé, les rêves d\'Aurélys fuient par ici.',N,0,'girl');
  await say('De l\'autre côté, c\'est la FAILLE DES SONGES. Les couloirs changent à chaque plongée, et les créatures s\'accordent à la force de ceux qui rêvent.',N,0,'girl');
  await say('Plus tu descends, plus c\'est dangereux. Tous les cinq étages, un ÉCHO t\'attend : le souvenir de quelqu\'un que tu as croisé. Bats-le, et tu pourras te réveiller.',N,0,'girl');
  await say('Rapporte-moi des ÉCLATS DE SONGE. Je les transforme en choses… très réelles.',N,0,'girl')}
 for(;;){show(`Éclats de Songe : ${G.bag.songe||0}. Record : étage ${F.sgBest||0}.`,N);const i=await choose(['PLONGER','LOTS','AU REVOIR'],{w:170,icons:[ICO.songe,ICO.coin,ICO.close]});ui.text=null;
  if(i<0||i===2)return say('Fais de beaux rêves…',N,0,'girl');
  if(i===0){if(!G.party.some(alive))return say('Ton équipe est épuisée. On ne rêve bien qu\'après s\'être reposé.',N,0,'girl');if(!await ask('Plonger dans la Faille des Songes ? (Pas de soins entre les étages, sauf les feux oniriques.)',N))continue;return sgEnter()}
  const lab=([k])=>k.startsWith('bq:')?BQ[k.slice(3)][0]:IT[k][0],ic=([k])=>k.startsWith('bq:')?ICO['bq_'+k.slice(3)]:ICO[k];
  for(;;){const j=await choose(PRZ14.map(lab),{x:W-300,y:8,w:292,vis:7,title:`Éclats : ${G.bag.songe||0}`,icons:PRZ14.map(ic),info:j=>{const[k]=PRZ14[j];return k.startsWith('bq:')?{icon:bigIco('bq_'+k.slice(3)),s:bqInfo(k.slice(3))}:{icon:bigIco(k),s:IT[k][2]}},
    dis:j=>(G.bag.songe||0)<PRZ14[j][1],draw:(j,x,y,sel,pr)=>{const c=pr?'#ffffff':(G.bag.songe||0)<PRZ14[j][1]?C.mute:C.ink,o={sh:pr?0:undefined};txt(lab(PRZ14[j]),x,y+19,c,o);txt(PRZ14[j][1],x+232,y+19,c,{...o,al:'r'})}});
   if(j<0)break;const[k,p]=PRZ14[j];if((G.bag.songe||0)<p){await say('Pas assez d\'éclats…',N,0,'girl');continue}G.bag.songe-=p;if(k.startsWith('bq:')){gainBq(k.slice(3));jingle('item')}else give(k);await say(`Tu reçois ${lab(PRZ14[j])} !`)}save()}}
MAPS.lunevie.npcs.push({x:19,y:7,t:'girl',d:2,name:'Rêveuse Nyx',qm:()=>f().badge3&&!f().sgI,fn:()=>nyx()},{x:18,y:6,t:'obj',k:'songe',name:'Faille',fn:()=>nyx()});
const drawObj14=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='songe')return drawObj14(k,sx,sy,t,n);const on=f()?.badge3,cx=sx+16,cy=sy+10;
 if(on)glowAt(cx,cy,34,.35+.12*Math.sin(t/240));pell(X,cx,cy,13,17,on?'#2a1a4a':'#3a3448');pell(X,cx,cy,9,13,on?'#4a2a8a':'#4a4458');pell(X,cx,cy,4,7,on?'#c8a8ff':'#5a5468');
 for(let i=0;i<14;i++){const a=t/(on?420:1600)+i*.449,d=5+(i*7%13),c=['#e0c8ff','#9a6ae8','#ffffff','#6ad8ff'][i%4];X.globalAlpha=on?.9:.3;X.fillStyle=c;X.fillRect(Math.round(cx+Math.cos(a)*d*.8),Math.round(cy+Math.sin(a)*d*1.1),2,2)}X.globalAlpha=1};
// --- Sauvegarde, journal, succès
const norm14=normalize;normalize=function(g){g=norm14(g);if(!g)return g;g.exped??=[];g.exped=g.exped.filter(e=>e.m&&SP[e.m.sp]&&EXZ[e.z]);
 if(g.dream&&g.map!=='songe')g.dream=null;if(g.map==='songe'&&!g.dream){g.map='lunevie';g.x=19;g.y=8}if(g.v<14){g.wn=1;g.v=14}return g};
// --- Chambre à décorer : catalogue sur ton PC, six emplacements, trophées gagnés en jouant
// [nom, prix (0 = trophée), description, condition de trophée]
const DFU={nightLamp:['Lampe de chevet',0,'La petite lampe qui t\'a vu lire jusqu\'à minuit.'],vase:['Vase de Lunévie',800,'Un vase bleu nuit, peint à la main par les artisans de Lunévie.'],
 potPlant:['Plante en pot',600,'Elle pousse doucement. Elle a l\'air contente d\'être là.'],plant:['Grande plante',900,'Ses feuilles frôlent le plafond. Les Pixémons PLANTE adorent.'],plant2:['Fougère',900,'Une fougère touffue, rapportée de la Forêt Murmure.'],
 lampFloor:['Lampadaire',1200,'Une lumière chaude pour les longues nuits du Cycle.'],crate:['Caisse de voyage',300,'Pleine de cartes, de cordes et de souvenirs de route.'],
 shelf1:['Étagère à souvenirs',0,'Ton étagère de toujours.'],shelf0:['Bibliothèque',1500,'Des livres sur les Pixémons, le Cycle et les étoiles.'],shelf2:['Étagère à bocaux',1500,'Des bocaux de baies, de sable et de cailloux brillants.'],shelf3:['Étagère à jeux',1500,'Des boîtes de jeux… et une console de Volterre.'],
 dresser:['Commode',0,'Ta commode. Un tiroir ne ferme plus depuis tes huit ans.'],plantPot:['Plante verte',0,'Maman l\'arrose quand tu n\'es pas là.'],
 poster2:['Affiche du Cycle',0,'L\'affiche de Solarion et Nocturion, un peu cornée.'],poster:['Affiche de Pixémon',500,'Une affiche des Pixémons d\'Aurélys.'],frameA:['Tableau des collines',1800,'Un paysage des Coteaux d\'Aurore au soleil couchant.'],frameB:['Portrait de famille',1800,'Toi, Maman, Lou… et Papa, revenu.'],frameC:['Marine de Port-Miroir',1800,'Le port, ses barques et son phare.'],
 aquarium:['Aquarium',4000,'Un aquarium où nagent des Miroitruite miniatures. Hypnotisant.'],
 coupe:['Coupe du Tournoi',0,'La coupe du Tournoi du Cycle. Ton nom y est gravé.',()=>(f().tourWins||0)>=1,'Gagner le Tournoi du Cycle'],
 cristal:['Lampe de Songe',0,'Un éclat de la Faille des Songes qui luit doucement la nuit.',()=>(f().sgBest||0)>=10,'Atteindre l\'étage 10 de la Faille des Songes'],
 peluche:['Peluche du starter',0,'Une peluche de ton premier Pixémon, cousue par Maman.',()=>[...G.party,...G.box].some(m=>bondLv(m)>=5),'Un lien « Inséparable » avec une créature'],
 globe:['Globe d\'Aurélys',0,'Un globe où chaque lieu visité brille d\'une petite étoile.',()=>Object.keys(RELAIS).every(k=>G.seen?.[k]),'Visiter tous les lieux où le Piafou peut se poser'],
 medaille:['Vitrine des badges',0,'Les quatre badges d\'Aurélys, bien alignés sur du velours.',()=>!!f().badge4,'Obtenir les quatre badges']};
const DSL={table:['Table de chevet',2,1,'nightLamp',['nightLamp','vase','potPlant','peluche','cristal']],
 coin:['Coin près du lit',3,1,null,[null,'plant','plant2','lampFloor','crate','coupe','globe','aquarium']],
 etag:['Étagère',4,1,'shelf1',['shelf1','shelf0','shelf2','shelf3']],
 gauche:['Coin de la commode',1,5,'dresser',['dresser','lampFloor','potPlant','aquarium','coupe','medaille','crate']],
 droite:['Coin de la fenêtre',8,5,'plantPot',['plantPot','plant','plant2','lampFloor','vase','globe','medaille','peluche']],
 mur:['Mur',1,0,'poster2',['poster2','poster','frameA','frameB','frameC']]};
const own14=k=>k==null||DFU[k][1]===0&&!DFU[k][3]||G.deco?.own?.[k]||!!DFU[k][3]?.();
// Meubles dessinés à la main (32 px de large, posés au sol)
const DPROC={coupe:()=>mkc(32,40,g=>{const P=(c,x,y,w,h)=>R(g,c,x,y,w,h);P('#6a4a2a',8,32,16,6);P('#8a6a3a',9,32,14,2);P('#c8902a',13,24,6,8);P('#f6c445',8,8,16,16);P('#fff0a0',10,9,4,12);P('#c8902a',4,10,4,8);P('#c8902a',24,10,4,8);P('#f6c445',5,11,2,6);P('#f6c445',25,11,2,6);P('#a8701a',8,22,16,2)}),
 cristal:()=>mkc(32,40,g=>{const P=(c,x,y,w,h)=>R(g,c,x,y,w,h);P('#3a2a4a',9,32,14,6);P('#5a4a6a',10,32,12,2);P('#3a2a6a',11,14,10,18);P('#9a6ae8',13,8,6,22);P('#e0c8ff',14,9,2,14);P('#9a6ae8',8,18,4,12);P('#c8a8ff',9,19,2,8);P('#4ac0d8',21,20,4,10)}),
 aquarium:()=>mkc(32,40,g=>{const P=(c,x,y,w,h)=>R(g,c,x,y,w,h);P('#4a3022',3,30,26,8);P('#6a4a32',4,30,24,2);P('#2a2a3a',3,10,26,20);P('#3a8ad0',4,11,24,18);P('#6ab8f0',4,11,24,3);P('#e8d8a0',4,26,24,3);P('#3a9a4a',7,18,2,8);P('#4ab85a',9,21,2,5);P('#f68a3a',14,16,5,3);P('#ffffff',18,16,1,1);P('#f6e04a',20,22,4,2);P('#ffffff',22,13,1,1);P('#ffffff',24,18,1,1)}),
 peluche:()=>mkc(32,32,g=>{const sp=f().starter||'flamiot',im=monSpr(sp,0,48);g.drawImage(im,4,4,24,24);g.globalAlpha=.25;R(g,'#fff4e0',4,4,24,24);g.globalAlpha=1}),
 globe:()=>mkc(32,40,g=>{const P=(c,x,y,w,h)=>R(g,c,x,y,w,h);P('#4a3022',10,34,12,4);P('#6a4a32',15,26,2,8);P('#c8963a',6,8,2,20);pell(g,16,16,10,10,'#2e62a4');pell(g,13,13,4,3,'#7cc060');pell(g,20,19,3,4,'#7cc060');pell(g,12,20,2,2,'#e8d8a0');P('#ffffff',11,9,2,2);P('#ffe880',19,12,1,1);P('#ffe880',14,21,1,1)}),
 medaille:()=>mkc(32,40,g=>{const P=(c,x,y,w,h)=>R(g,c,x,y,w,h);P('#4a3022',3,14,26,24);P('#6a1a2a',5,16,22,20);P('#8a2a3a',5,16,22,2);for(const[i,k]of['bRoc','bMir','bCre','bVol'].entries())if(ICO[k])g.drawImage(ICO[k],7+(i%2)*10,18+(i>>1)*9,8,8);P('#c8e0f0',5,16,1,20)})};
const DPRC={},proc14=PROC2;PROC2=function(k){return DPROC[k]?DPRC[k]??=DPROC[k]():proc14(k)};
const ROOM0={furn:MAPS.chambre.furn.slice(),wdeco:MAPS.chambre.wdeco.slice(),rows:MAPS.chambre.rows.slice(),acts:{...MAPS.chambre.acts}};
function roomApply(quiet){const M=MAPS.chambre,S=G?.deco?.slot||{},pick=s=>s in S?S[s]:DSL[s][3],at=new Set(Object.values(DSL).filter(d=>d[2]>0).map(d=>d[1]+','+d[2]));
 M.furn=ROOM0.furn.filter(o=>!at.has(o.x+','+o.y));M.wdeco=ROOM0.wdeco.filter(o=>o.x!==DSL.mur[1]);M.acts={...ROOM0.acts};const rows=ROOM0.rows.map(r=>[...r]);
 for(const[s,[,x,y,def]]of Object.entries(DSL)){const k=pick(s);if(s==='mur'){M.wdeco.push({x,k,dx:2});continue}
  if(k){M.furn.push({x,y,k});rows[y][x]='C'}else rows[y][x]=ROOM0.rows[y][x];if(k!==def)M.acts[x+','+y]=k?()=>say(`${DFU[k][0]}. ${DFU[k][2]}`):undefined}
 M.rows=M.rows0=rows.map(r=>r.join(''));M.L=null;if(!quiet&&G?.map==='chambre')refreshMap('chambre')}
async function roomMenu(){G.deco??={own:{},slot:{}};
 for(;;){const i=await choose(['AMÉNAGER','CATALOGUE','ANCIEN PC','QUITTER'],{w:180,title:'Ton PC'});if(i<0||i===3)return;if(i===2)return pcAct();
  if(i===1){const L=Object.keys(DFU).filter(k=>DFU[k][1]>0);for(;;){const j=await choose(L.map(k=>DFU[k][0]),{x:W-300,y:8,w:292,vis:7,title:`Catalogue déco · ${G.money} pièces`,
     info:j=>({s:`${DFU[L[j]][2]}${G.deco.own[L[j]]?' (Déjà chez toi.)':''}`}),dis:j=>!!G.deco.own[L[j]]||G.money<DFU[L[j]][1],
     draw:(j,x,y,sel,pr)=>{const k=L[j],c=pr?'#ffffff':G.deco.own[k]||G.money<DFU[k][1]?C.mute:C.ink,o={sh:pr?0:undefined};txt(DFU[k][0],x,y+19,c,o);txt(G.deco.own[k]?'OK':DFU[k][1],x+232,y+19,c,{...o,al:'r'})}});
    if(j<0)break;const k=L[j];if(G.deco.own[k]||G.money<DFU[k][1]){sfx('bump');continue}if(!await ask(`Commander ${DFU[k][0]} pour ${DFU[k][1]} pièces ?`))continue;G.money-=DFU[k][1];G.deco.own[k]=1;sfx('ok');await say(`Commande passée ! ${DFU[k][0]} est livré dans ta chambre. Choisis sa place avec AMÉNAGER.`);save()}continue}
  const SK=Object.keys(DSL),cur=s=>s in G.deco.slot?G.deco.slot[s]:DSL[s][3],lab=k=>k?DFU[k][0]:'(vide)';
  const s=await choose(SK.map(s=>`${DSL[s][0]} : ${lab(cur(s))}`),{x:W-330,y:8,w:322,vis:6,title:'Aménager'});if(s<0)continue;const sl=SK[s],O=DSL[sl][4],ok=O.filter(own14);
  const t=await choose(O.map(k=>own14(k)?lab(k):`??? (${DFU[k][4]||'à commander'})`),{x:W-330,y:8,w:322,vis:8,title:DSL[sl][0],dis:j=>!own14(O[j])});if(t<0||!own14(O[t]))continue;
  G.deco.slot[sl]=O[t];roomApply();sfx('ok');await say(`${O[t]?lab(O[t])+' trouve sa place':'L\'emplacement est libéré'}. ${ok.length>1?'':'Le catalogue du PC propose d\'autres meubles.'}`);save()}}
for(const p of['5,1','6,1'])MAPS.chambre.acts[p]=ROOM0.acts[p]=async()=>{if(f().intro<3)return pcAct();return roomMenu()};
const trophy14=()=>{if(!G?.deco)return;const k=Object.keys(DFU).find(k=>DFU[k][3]&&DFU[k][3]()&&!G.deco.seen?.[k]);if(k){(G.deco.seen??={})[k]=1;ui.note={s:`Nouveau trophée pour ta chambre : ${DFU[k][0]}`,t0:now()}}};
const step14b=onStep;onStep=async function(){await step14b.apply(this,arguments);if(G&&G.t%40===0)trophy14()};
const norm14b=normalize;normalize=function(g){g=norm14b(g);if(!g)return g;g.deco??={own:{},slot:{}};g.deco.own??={};g.deco.slot??={};for(const s of Object.keys(g.deco.slot))if(!DSL[s])delete g.deco.slot[s];return g};
// --- Journal, succès, nouveautés
const quests14=quests;quests=function(){const Q=quests14(),F=f();
 if(G.keys.relais)Q.push(['Le Relais de Léo',2,`Ouvre la CARTE et appuie sur A pour t'envoler vers un lieu visité (${Object.keys(RELAIS).filter(k=>G.seen?.[k]).length}/${Object.keys(RELAIS).length} points de relais connus).`]);
 else if(F.badge2)Q.push(['Le Relais de Léo',1,'Le Facteur Léo, à Bourg-Lueur, voudrait te montrer quelque chose depuis que tu as le Badge Miroir.']);
 if(F.badge)Q.push(['Expéditions',1,`${G.exped?.length?'En route : '+G.exped.map(e=>nm(e.m)+(exDone(e)?' (de retour !)':'')).join(', ')+'. ':''}${F.expN||0} expédition${(F.expN||0)>1?'s':''} terminée${(F.expN||0)>1?'s':''}. Envoie les créatures de ta Boîte explorer depuis un Centre de Soins.`]);
 if(F.sgI)Q.push(['La Faille des Songes',F.sgBest>=30?2:1,`Record : étage ${F.sgBest||0}. Échos vaincus : ${F.sgEcho||0}. La Rêveuse Nyx, à Lunévie, échange les Éclats de Songe.`]);
 else if(F.badge3)Q.push(['La Faille des Songes',1,'Une faille étrange s\'est ouverte au bord de Lunévie. Une jeune femme la surveille.']);
 if(G.deco)Q.push(['Ta chambre',1,`Trophées : ${Object.keys(DFU).filter(k=>DFU[k][3]&&DFU[k][3]()).length}/${Object.keys(DFU).filter(k=>DFU[k][3]).length}. Aménage-la depuis le PC de ta chambre.`]);return Q};
ACH.push(['fly10','Les ailes du Relais','S\'envoler 10 fois avec le Piafou de Léo.',()=>(f().flyN||0)>=10,['biscuit',5]],
 ['expe10','Chef d\'expédition','Terminer 10 expéditions.',()=>(f().expN||0)>=10,['etinc',6]],
 ['songe10','Rêveur lucide','Atteindre l\'étage 10 de la Faille des Songes.',()=>(f().sgBest||0)>=10,['songe',5]],
 ['songe30','Maître des songes','Atteindre l\'étage 30 de la Faille des Songes.',()=>(f().sgBest||0)>=30,['pierreaube',1]],
 ['echo5','Chasseur d\'échos','Vaincre 5 Échos dans la Faille des Songes.',()=>(f().sgEcho||0)>=5,['rappelmax',2]],
 ['deco','Chez soi','Remplir les six emplacements de ta chambre avec des objets choisis.',()=>Object.keys(DSL).every(s=>G.deco?.slot?.[s]&&G.deco.slot[s]!==DSL[s][3]),['hyperpotion',3]]);
NEWS.splice(0,NEWS.length,[()=>ICO.relais,'L\'Envol','Après le Badge Miroir, le Facteur Léo prête son Piafou messager : depuis la CARTE, envole-toi vers neuf lieux déjà visités.'],
 [()=>ICO.expe,'Expéditions','Au Centre de Soins, envoie les créatures de ta Boîte explorer les lieux visités : objets, EXP, lien, et des raretés pour qui connaît le terrain.'],
 [()=>ICO.songe,'La Faille des Songes','À Lunévie, un donjon qui change à chaque plongée, des étages sans fin, des Échos de Kael, Sélène, Vex, Caïus et Valen, et des Éclats de Songe à échanger.'],
 [()=>ICO.home,'Ta chambre','Le PC de ta chambre devient un catalogue de déco : six emplacements à aménager, et des trophées qui arrivent quand tu les mérites.']);
