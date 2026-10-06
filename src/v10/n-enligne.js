// =====================================================================
// EXTENSION 15.0 — Menu EN LIGNE : pseudo et apparence, salons à code, liste d'amis, messages rapides,
// invitations (combat ou échange) et échanges de créatures entre amis.
// =====================================================================
ICO.net=icon(["b......b",".b.oo.b.","..o..o..","...oo...","...yy...","...oo...","..oyyo..",".oooooo."]);
// --- Sauvegarde 15.0 : profil en ligne (pseudo, apparence, palmarès)
{const norm15=normalize;normalize=function(g){g=norm15(g);if(!g)return g;g.net??={};const n=g.net;n.n=netName(n.n);if(!LOOKS.includes(n.lk))n.lk='hero';for(const k of['w','l','d','tr','bt'])n[k]=Math.max(0,n[k]|0);if(n.room&&!/^[A-Z2-9]{4}$/.test(n.room))delete n.room;
 if(g.v<15){g.wn=1;g.v=15}return g}}
// --- Clavier à l'écran : flèches + A (ou toucher les touches) ; B efface, puis annule
async function kbInput(title,max,keys,o={}){let s=o.init||'';const K=[...keys,'EFF','OK'],cols=o.cols||11,kw=o.kw||38,kh=30,rows=Math.ceil(K.length/cols),x0=ev((W-cols*kw)/2),y0=H-14-rows*kh;
 const cap=()=>o.caps&&(!s||/[ \-]$/.test(s)),lab=k=>k===' '?'ESP':cap()?k.toUpperCase():k;
 ui.panel=()=>{panel(8,8,W-16,y0-16);txt(title,24,36,C.acc,{sh:0});rr(24,48,W-48,36,3,'#efe6d2');const tx=36+txt(s,36,74,C.ink,{s:2});if((now()/400|0)%2&&s.length<max)R(X,C.acc,tx+(s?4:0),54,3,22);txt(`${s.length}/${max}`,W-36,74,C.mute,{mini:1,al:'r'});
  if(o.hint)wrap(o.hint,W-56,1).slice(0,2).forEach((l,j)=>txt(l,24,100+j*11,C.ink2,{s:1,sh:0}));txt('B : EFFACER    OK : VALIDER',24,y0-22,C.mute,{mini:1})};
 try{for(;;){const i=await choose(K,{bare:1,cols,rect:i=>[x0+(i%cols)*kw,y0+(i/cols|0)*kh,kw-4,kh-4],draw:(i,[x,y,w,h],sel,pr)=>{const k=K[i],sp=k==='EFF'||k==='OK';rr(x,y,w,h,3,C.ink);rr(x+2,y+2,w-4,h-4,2,pr?C.acc:sel?C.accL:sp?C.paper2:C.paper);
   const mi=sp||k===' ';txt(mi?lab(k):lab(k),x+w/2,y+(mi?18:20),pr?'#ffffff':C.ink,{s:2,al:'c',sh:0,mini:mi})}});
  if(i<0){if(!s)return null;s=s.slice(0,-1);continue}const k=K[i];if(k==='EFF'){s=s.slice(0,-1);continue}
  if(k==='OK'){const v=o.ok?o.ok(s):s;if(v)return v;sfx('bump');continue}if(s.length>=max){sfx('bump');continue}s+=cap()?k.toUpperCase():k}}finally{ui.panel=null}}
const NAMEK=[...'abcdefghijklmnopqrstuvwxyz','é','è','ç',...'0123456789','-',' '];
async function askName(){const r=await kbInput('TON PSEUDO EN LIGNE',10,NAMEK,{caps:1,init:NG().n||'',hint:'Un surnom, pas ton vrai nom ! Tes amis le verront au-dessus de ta tête.',ok:s=>netName(s).length>=2?netName(s):null});if(r){NG().n=r;save()}return r}
async function askLook(){const cur=Math.max(0,LOOKS.indexOf(NG().lk)),c=7,x0=ev((W-c*62)/2);ui.panel=()=>{panel(8,8,W-16,H-16);txt('TON APPARENCE EN LIGNE',24,36,C.acc,{sh:0});txt('Tes amis te verront ainsi sur la carte.',24,56,C.ink2,{s:1,sh:0})};
 const i=await choose(LOOKS,{i:cur,bare:1,cols:c,rect:i=>[x0+(i%c)*62,74+(i/c|0)*110,58,104],draw:(i,[x,y,w,h],sel,pr)=>{rr(x,y,w,h,3,C.ink);rr(x+2,y+2,w-4,h-4,2,pr?C.acc:sel?C.accL:'#efe6d2');X.drawImage(chr(LOOKS[i],0,sel?1+(now()/200|0)%2:0),x+w/2-16,y+18,32,64);if(LOOKS[i]===NG().lk)X.drawImage(ICO.star,x+w-18,y+6,12,12)}});
 ui.panel=null;if(i>=0){NG().lk=LOOKS[i];save();if(NET.on)NET.hi(1)}}
async function netProfile(){for(;;){const i=await choose([`PSEUDO : ${NG().n||'?'}`,'APPARENCE','RETOUR'],{x:W-252,y:8,w:244,title:'Mon profil'});if(i<0||i===2)return;if(i===0)await askName();if(i===1)await askLook()}}
const NETHELP=['EN LIGNE, tu joues avec tes amis, chacun sur son téléphone ou son ordinateur, sans compte et sans rien installer.','Un joueur CRÉE UN SALON et reçoit un code de 4 lettres. Les autres choisissent REJOINDRE et tapent ce code. Jusqu\'à 8 joueurs par salon.',
 'Dans le salon, vous vous voyez sur la carte quand vous êtes au même endroit. Approche-toi d\'un ami et appuie sur A : COMBAT ou ÉCHANGE.','Combat entre amis : vos créatures sont soignées avant et après, rien n\'est perdu. Échange : les objets tenus et les breloques restent chez toi.',
 'Sécurité : choisis un pseudo, jamais ton vrai nom. Les messages sont des phrases toutes prêtes. Ne donne le code qu\'à des gens que tu connais.'];
// --- Menu EN LIGNE
const netWhere=P=>P.map&&MAPS[P.map]?MAPS[P.map].name.split(' · ')[0]:'?';
function netPanel(){panel(8,8,W-176,H-16);const up=NET.up();X.drawImage(ICO.net,22,20,16,16);txt(`SALON ${NET.code}`,44,34,C.acc,{sh:0});pell(X,W-196,28,4,4,up?'#4cc46a':'#f6c445');txt(up?'CONNECTE':'CONNEXION...',W-206,32,C.mute,{mini:1,al:'r'});R(X,C.paper2,20,44,W-200,2);
 const L=[{name:NG().n+' (toi)',look:NG().lk,map:G.map,b:['badge','badge2','badge3','badge4'].filter(k=>f()[k]).length,me:1},...NET.peers.values()];
 L.slice(0,8).forEach((P,i)=>{const y=52+i*30;X.drawImage(chr(P.look,0,0),20,y-8,16,32);txt(P.name,42,y+12,P.me?C.ink2:C.ink,{s:1.5});txt(netWhere(P)+(P.bz?' · occupé':''),42,y+24,C.mute,{s:1,sh:0});for(let j=0;j<P.b;j++)X.drawImage(ICO.star,W-206-j*12,y+4,10,10)});
 if(!NET.peers.size)wrap(up?`En attente d'amis… Donne-leur le code ${NET.code} : ils choisissent EN LIGNE, puis REJOINDRE.`:'Connexion aux relais en cours… Vérifie que ton appareil est connecté à Internet.',W-210,1).forEach((l,j)=>txt(l,22,100+j*11,C.ink2,{s:1,sh:0}));
 const nl=NET.log.slice(-3);nl.forEach((l,j)=>txt(l,22,H-50+j*11,C.mute,{s:1,sh:0}));txt(`RELAIS ${NET.R.filter(r=>r.up).length}/${NET.R.length}`,W-206,H-22,C.mute,{mini:1,al:'r'})}
async function onlineMenu(){if(!NG().n){await say('EN LIGNE, tu peux retrouver tes amis dans Aurélys : vous vous voyez sur la carte, vous vous défiez et vous échangez vos créatures.');if(!await askName())return;await askLook();await say('C\'est noté ! Crée un salon, ou rejoins celui d\'un ami avec son code.')}
 for(;;){if(!NET.on){const O=[['CRÉER UN SALON',ICO.home],['REJOINDRE',ICO.pin],...(NG().room?[[`SALON ${NG().room}`,ICO.net]]:[]),['PROFIL',ICO.star],['AIDE',ICO.guide],['RETOUR',ICO.close]],k=O[await choose(O.map(o=>o[0]),{x:W-244,y:8,w:236,icons:O.map(o=>o[1]),title:'En ligne'})]?.[0];
   if(!k||k==='RETOUR')return;if(k==='PROFIL'){await netProfile();continue}if(k==='AIDE'){for(const l of NETHELP)await say(l);continue}
   let code=k.startsWith('SALON ')?NG().room:null;if(k==='CRÉER UN SALON')code=Array.from({length:4},()=>NETAB[Math.random()*NETAB.length|0]).join('');
   if(k==='REJOINDRE'){code=await kbInput('CODE DU SALON',4,[...NETAB],{cols:8,kw:44,hint:'Demande le code de 4 caractères à ton ami.',ok:s=>s.length===4?s:null});if(!code)continue}
   NET.join(code);save();show('Connexion au salon…');const t0=Date.now();while(!NET.up()&&Date.now()-t0<9000){const kk=await key(150);if(kk==='b')break}ui.text=null;
   if(!NET.up()){await say('La connexion est lente… Le jeu continue d\'essayer tout seul. Vérifie ton accès à Internet.');continue}
   await say(k==='CRÉER UN SALON'?`Ton salon est ouvert ! Son code : ${code}. Donne-le à tes amis : ils choisissent EN LIGNE, puis REJOINDRE.`:`Tu es dans le salon ${code} !`);continue}
  ui.panel=netPanel;const O=[['AMIS',ICO.team],['MESSAGE',ICO.note],['ÉMOTE',ICO.heart],['PROFIL',ICO.star],['QUITTER',ICO.close],['RETOUR',ICO.home]];
  const k=O[await choose(O.map(o=>o[0]),{x:W-164,y:8,w:156,icons:O.map(o=>o[1])})]?.[0];ui.panel=null;
  if(!k||k==='RETOUR')return;if(k==='PROFIL')await netProfile();
  if(k==='QUITTER'&&await ask('Quitter le salon ? Tes amis ne te verront plus.')){NET.leave();return}
  if(k==='MESSAGE'){const i=await choose(QCHAT,{x:W-252,y:8,w:244,vis:9,title:'Message rapide'});if(i>=0){NET.send('ch',{c:i});ME15.say={s:QCHAT[i],t0:now()};NET.log.push('Toi : '+QCHAT[i]);return}}
  if(k==='ÉMOTE'){const i=await choose(QEMO.map((_,j)=>['Surprise','Question','Cœur','Musique','Silence'][j]),{x:W-200,y:8,w:192,title:'Émote',icons:QEMO.map(e=>EMO()[e])});if(i>=0){NET.send('em',{e:i});emote('me',QEMO[i],900);return}}
  if(k==='AMIS'){const L=[...NET.peers.values()];if(!L.length){await say(`Personne d'autre n'est dans le salon. Donne le code ${NET.code} à tes amis !`);continue}
   const i=await choose(L.map(P=>P.name),{x:W-252,y:8,w:244,title:'Amis',info:i=>({s:`${netWhere(L[i])}${L[i].bz?' · occupé':''} · ${L[i].b} badge${L[i].b>1?'s':''}${L[i].ld?' · '+SP[L[i].ld].name+' en tête':''}`})});if(i>=0&&await friendMenu(L[i].pid))return}}}
// Ma propre bulle de message (les amis la voient chez eux)
const ME15={say:null};
{const dw15b=drawWorld;drawWorld=function(t){dw15b(t);if(!ME15.say||!CAM)return;const k=now()-ME15.say.t0;if(k>4200){ME15.say=null;return}let px=G.x*TS,py=G.y*TS;if(move){px=(move.fx+(move.tx-move.fx)*move.t)*TS;py=(move.fy+(move.ty-move.fy)*move.t)*TS}
 const sx=ev(px-CAM[0])+16,sy=ev(py-CAM[1]),w=tw(ME15.say.s,1)+14,x=Math.max(4,Math.min(W-w-4,sx-w/2)),y=sy-60;X.globalAlpha=k>3800?(4200-k)/400:1;rr(x,y,w,20,3,C.ink);rr(x+1,y+1,w-2,18,2,C.paper);R(X,C.ink,sx-2,y+19,4,3);txt(ME15.say.s,x+7,y+14,C.ink,{s:1,sh:0});X.globalAlpha=1}}
// --- Menu d'un ami (depuis la liste ou en lui parlant sur la carte)
async function friendMenu(pid){const P=NET.peers.get(pid);if(!P)return say('Ce joueur n\'est plus dans le salon.');
 const i=await choose(['COMBAT','ÉCHANGE','MESSAGE','RETOUR'],{x:W-200,y:8,w:192,title:P.name,info:()=>({s:`${netWhere(P)}${P.bz?' · occupé':''} · ${P.b} badge${P.b>1?'s':''}${P.ld?' · '+SP[P.ld].name+' en tête':''}`})});
 if(i<0||i===3)return false;if(!NET.peers.has(pid))return say(`${P.name} n'est plus dans le salon.`);
 if(i===2){const j=await choose(QCHAT,{x:W-252,y:8,w:244,vis:9,title:'Message rapide'});if(j>=0){NET.send('ch',{c:j});ME15.say={s:QCHAT[j],t0:now()};NET.log.push('Toi : '+QCHAT[j])}return true}
 if(P.dv!==NETDV()){await say(`${P.name} n'a pas la même version du jeu que toi. Rechargez tous les deux la page pour avoir la dernière version.`);return true}
 if(i===1){if(G.party.length<2){await say('Il te faut au moins deux créatures dans ton équipe pour échanger.');return true}const r=await netInvite(P,'tr',{});if(r)await tradeFlow(P,r,1);return true}
 if(G.party.length<1)return say('Il te faut au moins une créature !');
 const fm=await choose(['3 CONTRE 3','6 CONTRE 6','RETOUR'],{x:W-252,y:8,w:244,title:'Format du combat',info:j=>({s:['Chacun choisit 3 créatures de son équipe. Rapide et tactique !','Toute l\'équipe, jusqu\'à 6 créatures chacun.','Annuler.'][j]})});if(fm<0||fm===2)return true;
 const lv=await choose(['TOUS AU NIVEAU 50','NIVEAUX RÉELS','RETOUR'],{x:W-252,y:8,w:244,title:'Niveaux',info:j=>({s:['Toutes les créatures passent au niveau 50 : idéal entre amis qui n\'en sont pas au même point de l\'aventure.','Chaque créature garde son vrai niveau.','Annuler.'][j]})});if(lv<0||lv===2)return true;
 const ru={n:fm?6:3,l50:lv?0:1,ph:Math.min(3,phase())},r=await netInvite(P,'bt',ru);if(r)await pvpFlow(P,r,ru,0);return true}

// --- Invitations : une seule à la fois ; si on est occupé, réponse automatique
const PHT15=[' à l\'aube','',' au crépuscule',' de nuit'],ruTxt=ru=>`${ru.n===6?'6 contre 6':'3 contre 3'}, ${ru.l50?'tous au niveau 50':'niveaux réels'}${PHT15[ru.ph]||''}`;
const netId=()=>Math.random().toString(36).slice(2,10);
async function netInvite(P,t,ru){const id=netId(),A=NET.act={k:'inv',id,with:P.pid,resp:null};NET.send('inv',{id,t,ru},P.pid,true);
 show(`Invitation envoyée à ${P.name}… (B : annuler)`);const t0=Date.now();let why=null;
 for(;;){if(A.resp)break;if(!NET.peers.has(P.pid)){why='gone';break}if(Date.now()-t0>45000){why='late';break}const k=await key(150);if(k==='b'){why='cancel';break}}ui.text=null;
 if(NET.act===A)NET.act=why||!A.resp.ok?null:{k:t,id,with:P.pid,me:0};if(why){NET.send('inv-x',{id},P.pid,true);if(why==='gone')await say(`${P.name} a quitté le salon.`);if(why==='late')await say(`${P.name} n'a pas répondu.`);return null}
 if(!A.resp.ok){await say(A.resp.why==='busy'?`${P.name} est occupé pour le moment.`:`${P.name} a refusé.`);return null}return id}
NET.H.inv=(m,P)=>{const ok=typeof m.id==='string'&&m.id.length<=12&&(m.t==='bt'||m.t==='tr');if(!ok)return;if(NET.act||NET.inv&&NET.inv.id!==m.id||mode!=='world'||P.dv!==NETDV()){NET.send('invr',{id:m.id,ok:0,why:'busy'},P.pid,true);return}
 const ru=m.t==='bt'?{n:m.ru?.n===6?6:3,l50:m.ru?.l50?1:0,ph:Math.max(0,Math.min(3,m.ru?.ph|0))}:{};NET.inv={id:m.id,from:P.pid,t:m.t,ru,t0:Date.now()};NET.note(`${P.name} te propose ${m.t==='bt'?'un combat':'un échange'} !`);sfx('alert')};
NET.H.invr=(m,P)=>{const A=NET.act;if(A?.k==='inv'&&A.id===m.id&&A.with===P.pid)A.resp={ok:!!m.ok,why:m.why==='busy'?'busy':''}};
NET.H['inv-x']=(m,P)=>{if(NET.inv?.id===m.id&&NET.inv.from===P.pid){NET.inv=null;if(!NET.act)NET.note(`${P.name} a annulé son invitation.`)}if(NET.act?.id===m.id&&NET.act.with===P.pid)NET.act.x=1};
async function promptInvite(){const I=NET.inv,P=NET.peers.get(I?.from);if(!I||!P){NET.inv=null;return}
 show(I.t==='bt'?`${P.name} te propose un combat (${ruTxt(I.ru)}). Accepter ?`:`${P.name} te propose un échange de créatures. Accepter ?`,0);const r=await choose(['OUI','NON'],{w:110});ui.text=null;
 const live=NET.inv===I&&NET.peers.has(P.pid)&&Date.now()-I.t0<45000;NET.inv=null;if(!live)return say('L\'invitation a expiré.');
 if(r!==0){NET.send('invr',{id:I.id,ok:0},P.pid,true);return}
 if(I.t==='tr'&&G.party.length<2){NET.send('invr',{id:I.id,ok:0},P.pid,true);return say('Il te faut au moins deux créatures pour échanger.')}
 NET.act={k:I.t,id:I.id,with:P.pid,me:1};const ok=await NET.send('invr',{id:I.id,ok:1},P.pid,true);if(!ok){NET.act=null;return say('La connexion avec ton ami s\'est interrompue.')}
 if(I.t==='tr')await tradeFlow(P,I.id,0);else await pvpFlow(P,I.id,I.ru,1)}
setInterval(()=>{if(G&&mode==='world'&&f().starter&&!f().tip_net15&&!ui.tip&&!busy&&!ui.text&&(G.play||0)>120000)tip('net15','Nouveau : le menu EN LIGNE (touche MENU) te permet de retrouver tes amis : salon à code, combats et échanges.');
 const I=NET.inv;if(!I)return;if(!NET.on||Date.now()-I.t0>45000||!NET.peers.has(I.from)){NET.inv=null;return}
 if(!I.shown&&G&&mode==='world'&&!busy&&!move&&!ui.menus.length&&!ui.text&&!waiters.length){I.shown=1;run(promptInvite)}},200);

// --- Créatures envoyées sur le réseau : copie propre à l'envoi, vérification stricte à la réception
const snapMon=(m,full)=>{const o={sp:m.sp,lv:m.lv,exp:m.exp,moves:m.moves.slice(0,4),pp:m.pp.slice(0,4),hp:m.hp,st:m.st||null,slp:m.slp||0,aff:m.aff|0,nat:m.nat,sh:m.sh?1:0};if(m.ot)o.ot=m.ot;if(m.egg)o.egg=m.egg;if(full){o.item=m.item||null;o.eq=m.eq||null}return o};
function netMon(o,full){if(!o||typeof o!=='object'||typeof o.sp!=='string'||!SP[o.sp])return null;const lv=Math.max(1,Math.min(100,o.lv|0));
 const mv=[...new Set((Array.isArray(o.moves)?o.moves:[]).filter(id=>typeof id==='string'&&MV[id]&&id!=='lutte'))].slice(0,4);const m=mon(o.sp,lv,mv.length?{moves:mv}:{});
 m.pp=m.moves.map((id,i)=>{const v=Array.isArray(o.pp)&&mv.length?o.pp[i]:null;return Number.isInteger(v)?Math.max(0,Math.min(MV[id].pp,v)):MV[id].pp});
 m.nat=NAT[o.nat]?o.nat:natRnd();m.sh=o.sh?1:0;m.aff=Math.max(0,Math.min(255,o.aff|0));m.exp=Math.max(xpFor(lv),Math.min(lv>=100?xpFor(100):xpFor(lv+1)-1,Number.isFinite(o.exp)?Math.floor(o.exp):0));
 m.item=full&&IT[o.item]?.[4]==='held'?o.item:null;m.eq=full&&BQ[o.eq]?o.eq:null;const mx=st(m).hp;m.hp=Number.isInteger(o.hp)?Math.max(0,Math.min(mx,o.hp)):mx;m.st=m.hp>0&&STN[o.st]?o.st:null;m.slp=m.st==='slp'?Math.max(1,Math.min(4,o.slp|0)):0;
 const ot=netName(o.ot);if(ot)m.ot=ot;if(o.egg)m.egg=o.egg==='elias'?'elias':1;return m}

// --- Échange entre amis : chacun propose, voit l'offre de l'autre, et confirme ; l'échange n'a lieu que si les deux confirmations se sont croisées
async function tradeFlow(P,id,host){NET.hi(1);const A=NET.act?.k==='tr'&&NET.act.id===id?NET.act:(NET.act={k:'tr',id,with:P.pid});A.their??=null;A.tv??=0;A.ok??=null;A.x??=0;let mine=null,mv=0,done=false;
 const gone=()=>!NET.peers.has(P.pid)||A.x;
 try{for(;;){if(gone())break;
   if(!mine){ui.text=null;const j=await partyMenu('Proposer qui ?');if(j<0){if(await ask('Annuler l\'échange ?'))break;continue}if(gone())break;mine=G.party[j];mv++;
    if(!await NET.send('tr-of',{id,ver:mv,m:snapMon(mine)},P.pid,true)){await say('La connexion avec ton ami s\'est interrompue.');break}}
   if(!A.their){show(`Tu proposes ${nm(mine)}. ${P.name} choisit… (B : annuler)`);let c=0;while(!A.their&&!gone()){const k=await key(150);if(k==='b'){c=1;break}}ui.text=null;if(c){if(await ask('Annuler l\'échange ?'))break;continue}if(gone())break}
   const th=A.their,tm=netMon(th.m);if(!tm){A.their=null;continue}
   ui.panel=()=>tradePanel(mine,tm,P);const i=await choose(['ÉCHANGER','VOIR SON OFFRE','CHANGER LA MIENNE','ANNULER'],{x:W-252,y:H-120,w:244});ui.panel=null;if(gone())break;
   if(A.their!==th){await say(`${P.name} a changé sa proposition.`);continue}
   if(i===1){await summary(tm);continue}if(i===2){mine=null;continue}if(i<0||i===3){if(await ask('Annuler l\'échange ?'))break;continue}
   // Confirmation : impossible d'annuler une fois envoyée
   if(!await NET.send('tr-ok',{id,a:mv,b:th.v},P.pid,true)){await say('La connexion avec ton ami s\'est interrompue.');break}
   show(`Tu as confirmé. En attente de ${P.name}…`);const t0=Date.now();while(!(A.ok&&A.ok.a===th.v&&A.ok.b===mv)&&A.their===th&&!gone()&&Date.now()-t0<60000)await key(150);ui.text=null;
   if(A.ok&&A.ok.a===th.v&&A.ok.b===mv){done=tradeCommit(mine,tm,P);break}if(gone())break;if(A.their!==th){await say(`${P.name} a changé sa proposition.`);continue}
   await say(`${P.name} n'a pas confirmé à temps.`);break}
 }finally{if(NET.act===A)NET.act=null;NET.hi(1)}
 if(!done){NET.send('tr-x',{id},P.pid,true);if(!NET.peers.has(P.pid))await say(`${P.name} a quitté le salon. L'échange est annulé.`);else if(A.x)await say(`${P.name} a annulé l'échange.`);else await say('Échange annulé.');return}
 await tradeAnim(done.out,done.in,P);await say(`Tu envoies ${nm(done.out)} à ${P.name}… et tu reçois ${nm(done.in)} !`);if(done.in.ot)await say(`${nm(done.in)} vient de chez ${done.in.ot} : il gagne plus d'EXP (x1,5).`);if(done.kept)await say('Les objets et breloques qu\'il portait restent chez toi.')}
NET.H['tr-of']=(m,P)=>{const A=NET.act;if(A?.k!=='tr'||A.id!==m.id||A.with!==P.pid||!Number.isInteger(m.ver)||m.ver<=A.tv||!netMon(m.m))return;A.tv=m.ver;A.their={v:m.ver,m:m.m};A.ok=null};
NET.H['tr-ok']=(m,P)=>{const A=NET.act;if(A?.k==='tr'&&A.id===m.id&&A.with===P.pid)A.ok={a:m.a,b:m.b}};
NET.H['tr-x']=(m,P)=>{const A=NET.act;if(A?.k==='tr'&&A.id===m.id&&A.with===P.pid)A.x=1};
function tradeCommit(mine,tm,P){const i=G.party.indexOf(mine);if(i<0)return false;let kept=0;if(mine.eq){setEq(mine,null);kept=1}if(mine.item){G.bag[mine.item]=(G.bag[mine.item]||0)+1;mine.item=null;kept=1}
 if(!tm.ot)tm.ot=P.name;if(tm.ot===NG().n)delete tm.ot;G.party[i]=tm;dex(tm.sp,2);NG().tr=(NG().tr||0)+1;folReset();save();return{out:mine,in:tm,kept}}
function tradePanel(a,b,P){panel(8,8,W-16,H-128);txt('ÉCHANGE',24,34,C.acc,{sh:0});txt('Objets tenus et breloques restent chez leur dresseur.',W-24,32,C.mute,{s:1,sh:0,al:'r'});
 [[a,'TOI',24],[b,P.name.toUpperCase(),W/2+12]].forEach(([m,who,x])=>{const w=W/2-36;rr(x,42,w,144,4,'#efe6d2');txt(who,x+8,56,C.mute,{mini:1});if(m.sh)X.drawImage(ICO.star,x+w-20,46,14,14);X.drawImage(monSpr(m.sp,0,64,m.sh),x+4,58,64,64);
  txt(nm(m),x+74,78);txt('Nv '+m.lv,x+74,96,C.ink2,{s:1.5});chip(SP[m.sp].t,x+74,102);if(NAT[m.nat])txt(NAT[m.nat][0],x+74,132,C.ink2,{s:1,sh:0});
  m.moves.slice(0,4).forEach((id,j)=>txt(MV[id].n,x+8+(j%2)*((w-16)/2),150+(j>>1)*14,C.ink,{s:1,sh:0}))});
 const ax=W/2,ay=112;R(X,C.acc,ax-9,ay,18,2);for(let i=0;i<4;i++){R(X,C.acc,ax-9+i,ay-i,1,2+2*i);R(X,C.acc,ax+8-i,ay-i,1,2+2*i)}}
async function tradeAnim(a,b,P){const t0=now();ui.panel=()=>{const k=Math.min(1,(now()-t0)/2200);X.fillStyle='rgba(18,14,34,.85)';X.fillRect(0,0,W,H);const e=k<.5?k*2:1,f2=k>.5?(k-.5)*2:0;
  if(k<.5){X.globalAlpha=1-e;X.drawImage(monSpr(a.sp,0,128,a.sh),W/2-64,ev(H/2-80-e*140),128,128);X.globalAlpha=1}else{X.globalAlpha=f2;X.drawImage(monSpr(b.sp,0,128,b.sh),W/2-64,ev(H/2-80-(1-f2)*140),128,128);X.globalAlpha=1}
  for(let i=0;i<10;i++){const a2=now()/300+i*.63;R(X,i%2?C.gold:'#ffffff',ev(W/2+Math.cos(a2)*90),ev(H/2-20+Math.sin(a2)*50),3,3)}};sfx('ball');await wait(1100);sfx('evo');await wait(1100);jingle('item');await wait(400);ui.panel=null}

// --- Menu pause : EN LIGNE (après le premier compagnon)
pauseMenu=async function(){for(;;){ui.panel=drawCard;const O=[['ÉQUIPE',ICO.team],...(G.keys.dex?[['PIXÉDEX',ICO.dex]]:[]),['SAC',ICO.bag],['CARTE',ICO.map],...(f().starter?[['EN LIGNE',ICO.net]]:[]),...(G.keys.sablier?[['SABLIER',ICO.sablier]]:[]),...(G.keys.camera?[['PHOTO',ICO.camera]]:[]),['JOURNAL',ICO.book],...(f().starter?[['CARNET',ICO.star]]:[]),...(G.cin&&Object.keys(G.cin).length?[['CINÉMAS',ICO.ecl]]:[]),['GUIDE',ICO.guide],['SAUVER',ICO.save],['OPTIONS',ICO.gear],['TITRE',ICO.home],['FERMER',ICO.close]];
 const i=await choose(O.map(o=>o[0]),{x:W-162,y:8,w:154,rh:O.length>9?24:26,vis:10,icons:O.map(o=>o[1])});ui.panel=null;const k=O[i]?.[0];
 if(i<0||k==='FERMER')return;if(k==='ÉQUIPE')await teamMenu();if(k==='PIXÉDEX')await dexMenu();if(k==='SAC')await bagMenu(false);if(k==='JOURNAL')await journal();if(k==='CARNET')await carnet();if(k==='PHOTO'){await takePhoto();return}
 if(k==='EN LIGNE'){await onlineMenu();return}
 if(k==='SAUVER')await say(save()?'Partie sauvegardée !':'Impossible de sauvegarder dans ce navigateur.');
 if(k==='CARTE'&&await regionMap())return;if(k==='CINÉMAS')await cinemaMenu();if(k==='GUIDE')await guide();if(k==='SABLIER'){ui.panel=null;await useSablier()}if(k==='OPTIONS')await options();
 if(k==='TITRE'&&await ask(NET.on?'Retourner à l\'écran titre ? Tu quitteras le salon en ligne, et la progression non sauvegardée sera perdue.':'Retourner à l\'écran titre ? La progression non sauvegardée sera perdue.')){await fadeTo(1,300);return titleScreen()}}};
