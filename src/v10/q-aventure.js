// =====================================================================
// EXTENSION 17.0 — Aventure à plusieurs : toute l'histoire à deux (jusqu'à quatre), sauvegardée sur chaque appareil sous un code commun.
// - Écran titre : NOUVELLE AVENTURE (un code à donner), REJOINDRE (le code d'un ami), CONTINUER (reconnexion automatique).
// - Les joueurs d'une même aventure sont amis d'office : chacun rejoint automatiquement les combats des autres.
// - Scènes partagées : quand l'un déclenche une scène de l'histoire (dresseur, champion, boss, cinématique, légendaire…), les autres la
//   vivent aussi, chacun sur son écran, et ses combats se jouent ensemble (l'hôte est celui qui l'a déclenchée). Tout le monde avance.
// - Tutoriel à plusieurs : chacun choisit sa créature au labo, puis Kael affronte tout le monde en même temps.
// - L'heure d'Aurélys est commune ; ALLER LE VOIR téléporte auprès d'un joueur de l'aventure.
// - Chacun voit enfin sa propre apparence (choisie dans OPTIONS ou dans le profil en ligne) : la même que celle que voient ses amis.
// =====================================================================

// --- Apparence : réglable depuis les options, visible par soi et par les autres
askLook=async function(){const cur=Math.max(0,LOOKS.indexOf(NG().lk)),c=7,x0=ev((W-c*62)/2);ui.panel=()=>{panel(8,8,W-16,H-16);txt('TON APPARENCE',24,36,C.acc,{sh:0});txt('C\'est toi dans le monde : tu te vois ainsi, et tes amis aussi.',24,56,C.ink2,{s:1,sh:0})};
 const i=await choose(LOOKS,{i:cur,bare:1,cols:c,rect:i=>[x0+(i%c)*62,74+(i/c|0)*110,58,104],draw:(i,[x,y,w,h],sel,pr)=>{rr(x,y,w,h,3,C.ink);rr(x+2,y+2,w-4,h-4,2,pr?C.acc:sel?C.accL:'#efe6d2');X.drawImage(chr(LOOKS[i],0,sel?1+(now()/200|0)%2:0),x+w/2-16,y+18,32,64);if(LOOKS[i]===NG().lk)X.drawImage(ICO.star,x+w-18,y+6,12,12)}});
 ui.panel=null;if(i>=0){NG().lk=LOOKS[i];profSave();if(G.map)save();if(NET.on)NET.hi(1)}};
{const OP17=options;options=async function(){for(;;){const i=await choose(['APPARENCE','OPTIONS DU JEU…','RETOUR'],{x:W-252,y:8,w:244,title:'Options',info:j=>({s:['Choisis ton apparence : c\'est ainsi que tu apparais dans le monde, pour toi comme pour tes amis.','Difficulté, animations, son, musique, texte, vitesse des combats…','Fermer.'][j]})});
 if(i<0||i===2)return;if(i===0){await askLook();continue}return OP17()}}}
// Profil de l'appareil : pseudo et apparence proposés d'office dans les nouvelles parties en ligne
const PROF=(()=>{try{const o=JSON.parse(lsGet('pixemon-profile')||'{}');return{n:netName(o.n),lk:LOOKS.includes(o.lk)?o.lk:''}}catch(e){return{n:'',lk:''}}})();
function profSave(){if(!G?.net)return;if(G.net.n)PROF.n=G.net.n;if(G.net.lk)PROF.lk=G.net.lk;try{localStorage.setItem('pixemon-profile',JSON.stringify(PROF))}catch(e){}}
{const an17=askName;askName=async function(){if(!NG().n&&PROF.n)NG().n=PROF.n;const r=await an17();if(r)profSave();return r}}

// =====================================================================
// Sauvegardes des aventures (une par code, sur chaque appareil) et écran titre
// =====================================================================
const ADVK=SK+'-coop-',ADVHELP=['AVENTURE À PLUSIEURS : toute l\'histoire à deux, trois ou quatre ! L\'un crée l\'aventure (NOUVELLE AVENTURE) et reçoit un code de 4 caractères ; les autres choisissent REJOINDRE et tapent ce code.',
 'Chacun commence dans sa chambre, puis vous vous retrouvez au labo du Prof. Saule : chacun choisit sa créature… et Kael vous affronte tous en même temps !',
 'Dès que l\'un de vous combat (créature sauvage, dresseur, champion…), les autres le rejoignent automatiquement, où qu\'ils soient. Plus vous êtes nombreux, plus l\'adversaire est fort.',
 'Quand l\'un de vous déclenche une scène de l\'histoire, les autres la vivent aussi sur leur écran et le rejoignent : vous avancez ensemble et chacun reçoit badges et récompenses.',
 'La partie est sauvegardée sur chaque appareil. Pour reprendre, choisissez tous AVENTURE À PLUSIEURS, puis CONTINUER : vous vous retrouvez automatiquement.',
 'Perdu ? Dans le menu EN LIGNE, choisis JOUEURS, puis un ami et ALLER LE VOIR pour le rejoindre en un instant.'];
function advSaves(){const L=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||!k.startsWith(ADVK)||k.endsWith('-bak'))continue;const c=k.slice(ADVK.length);if(!/^[A-Z2-9]{4}$/.test(c))continue;const g=load('c:'+c);if(g)L.push({code:c,g})}}catch(e){}
 return L.sort((a,b)=>(b.g.lastSave||b.g.coop?.t0||0)-(a.g.lastSave||a.g.coop?.t0||0))}
const advGen=()=>{for(;;){const c=Array.from({length:4},()=>NETAB[Math.random()*NETAB.length|0]).join('');if(!lsGet(ADVK+c))return c}};
const advMates=g=>Object.values(g?.coop?.mates||{}).filter(s=>typeof s==='string').slice(0,3);
const numSlot=()=>Math.min(3,Math.max(1,+lsGet('pixemon-slot')||1));
{const ts17=titleScreen;titleScreen=async function(){if(typeof SLOT!=='number')SLOT=numSlot();KW=null;SCQ.length=0;return ts17()}}
function advInfo(g,code,x,y,w){txt(`AVENTURE ${code}`,x+16,y+28,C.acc);txt(MAPS[g.map]?.name.split(' · ')[0]||'',x+16,y+50);txt(fmtT(g.play||0),x+w-16,y+50,C.ink2,{al:'r'});
 const F=g.flags,nb=(F.badge?1:0)+(F.badge2?1:0)+(F.badge3?1:0)+(F.badge4?1:0);[ICO.bRoc,ICO.bMir,ICO.bVol,ICO.bCre].forEach((ic,j)=>X.drawImage(j<nb?ic:silh(ic,'#b0a8c0'),x+16+j*20,y+58,14,14));
 g.party.slice(0,6).forEach((m,j)=>X.drawImage(monSpr(m.sp,0,48),x+16+j*30,y+78,28,28));const mt=advMates(g);wrap(mt.length?'Avec '+mt.join(', '):'Pas encore d\'autre joueur.',w-32,1).slice(0,2).forEach((l,j)=>txt(l,x+16,y+122+j*11,C.ink2,{s:1,sh:0}))}
async function advMenu(){for(;;){const L=advSaves().slice(0,4),O=[...L.map(s=>`CONTINUER ${s.code}`),'NOUVELLE AVENTURE','REJOINDRE',...(L.length?['EFFACER']:[]),'AIDE','RETOUR'];
 ui.panel=()=>{panel(8,8,W-16,H-16);X.drawImage(ICO.team,22,20,16,16);txt('AVENTURE À PLUSIEURS',44,34,C.acc,{sh:0});R(X,C.paper2,20,44,W-40,2);
  if(!L.length)wrap('Toute l\'histoire avec tes amis : chacun sur son téléphone ou son ordinateur, sans compte. Crée une aventure et donne son code, ou rejoins celle d\'un ami.',W-282,1).forEach((l,j)=>txt(l,262,70+j*12,C.ink2,{s:1,sh:0}))};
 const i=await choose(O,{x:16,y:52,w:236,rh:24,vis:9,ib:[256,52,W-272,150],infoShow:j=>j<L.length,infoDraw:(j,x,y,w)=>{if(L[j])advInfo(L[j].g,L[j].code,x,y,w)}});const k=O[i];
 if(i<0||k==='RETOUR'){ui.panel=null;return false}
 if(k==='AIDE'){const pn=ui.panel;ui.panel=null;for(const l of ADVHELP)await say(l);ui.panel=pn;continue}
 if(k==='EFFACER'){const j=await choose([...L.map(s=>s.code),'RETOUR'],{x:16,y:52,w:236,title:'Effacer laquelle ?'});if(j<0||j>=L.length)continue;
  if(await ask(`Effacer l'aventure ${L[j].code} de cet appareil ? Tes amis garderont la leur.`)){try{localStorage.removeItem(ADVK+L[j].code);localStorage.removeItem(ADVK+L[j].code+'-bak')}catch(e){}}continue}
 ui.panel=null;if(k.startsWith('CONTINUER ')){if(await advContinue(k.slice(10)))return true;continue}
 if(k==='NOUVELLE AVENTURE'){if(await advNew())return true;continue}
 if(k==='REJOINDRE'){if(await advJoin())return true;continue}}}
async function advProfile(){if(!NG().n&&PROF.n)NG().n=PROF.n;if((!NG().lk||NG().lk==='hero')&&PROF.lk)NG().lk=PROF.lk;const r=await askName();if(!r)return false;await askLook();return true}
function advFresh(code){const S0={slot:SLOT,last:lsGet('pixemon-last'),code};G=newGame();G.coop={code,t0:Date.now(),mates:{}};G.map='chambre';G.x=2;G.y=2;G.dir=2;SLOT='c:'+code;return S0}
// Annulation avant le début : la sauvegarde ébauchée (pseudo, apparence) disparaît, l'écran titre redevient comme avant
function advAbort(S0){if(NET.on)NET.leave(true);G=null;SLOT=S0.slot;try{localStorage.removeItem(ADVK+S0.code);localStorage.removeItem(ADVK+S0.code+'-bak');if(S0.last==null)localStorage.removeItem('pixemon-last');else localStorage.setItem('pixemon-last',S0.last)}catch(e){}}
async function advNew(){const code=advGen(),S0=advFresh(code);if(!await advProfile()){advAbort(S0);return false}
 NET.join(code);if(!await advLobby(code,1)){advAbort(S0);return false}save();await fadeTo(1,400);await dreamIntro();return true}
async function advJoin(){const code=await kbInput('CODE DE L\'AVENTURE',4,[...NETAB],{cols:8,kw:44,hint:'Demande le code de 4 caractères à ton ami (il le voit dans sa salle d\'attente ou dans le menu EN LIGNE).',ok:s=>s.length===4?s:null});if(!code)return false;
 if(load('c:'+code)){if(await ask(`Tu as déjà une partie dans l'aventure ${code}. La continuer ?`))return advContinue(code);return false}
 const S0=advFresh(code);if(!await advProfile()){advAbort(S0);return false}NET.join(code);show(`Recherche de l'aventure ${code}… (B : annuler)`);const t0=Date.now();let found=0,stop=0;
 while(Date.now()-t0<15000){if([...NET.peers.values()].some(P=>P.av===code)){found=1;break}const k=await key(200);if(k==='b'){stop=1;break}}ui.text=null;
 if(stop||!found&&!await ask(`Personne n'est connecté à l'aventure ${code} pour l'instant. Vérifie le code avec ton ami. La commencer quand même ?`)){advAbort(S0);return false}
 if(!await advLobby(code,0)){advAbort(S0);return false}save();await fadeTo(1,400);await dreamIntro();return true}
async function advContinue(code){const g=load('c:'+code);if(!g)return false;const S0=SLOT;G=g;SLOT='c:'+code;G.coop??={code};G.coop.code=code;G.coop.mates??={};
 if(!NG().n&&!await advProfile()){G=null;SLOT=S0;return false}
 await fadeTo(1,300);mode='world';ui.banner=null;loadMap(G.map,G.x,G.y,G.dir);NET.join(code);await fadeTo(0,300);
 if(G.wn){delete G.wn;await whatsNew()}return true}
// Salle d'attente : le code, les joueurs connectés, puis chacun commence quand il veut
async function advLobby(code,mk){const mates=()=>[...NET.peers.values()].filter(P=>P.av===code);
 ui.panel=()=>{panel(8,8,W-16,H-16);X.drawImage(ICO.team,22,20,16,16);txt(mk?'NOUVELLE AVENTURE':'AVENTURE TROUVÉE',44,34,C.acc,{sh:0});R(X,C.paper2,20,44,W-40,2);const up=NET.up();
  txt('CODE',24,64,C.mute,{mini:1});rr(22,70,156,42,3,'#efe6d2');txt(code,100,102,C.ink,{s:4,al:'c',ls:2});
  wrap(mk?'Donne ce code à tes amis : sur l\'écran titre, ils choisissent AVENTURE À PLUSIEURS, puis REJOINDRE.':'Tu as rejoint l\'aventure de tes amis !',W-220,1).forEach((l,j)=>txt(l,186,76+j*12,C.ink2,{s:1,sh:0}));
  txt('JOUEURS',24,132,C.mute,{mini:1});const L=[{name:(NG().n||'?')+' (toi)',look:NG().lk||'hero',dv:NETDV()},...mates()];
  L.slice(0,4).forEach((P,i)=>{const y=138+i*30;X.drawImage(chr(PEO[P.look]?P.look:'hero',0,0),24,y,16,32);txt(P.name,46,y+20,C.ink,{s:1.5});if(P.dv!==NETDV())txt('autre version du jeu !',200,y+20,C.red,{mini:1})});
  if(!mates().length)txt(up?'En attente de tes amis…':'Connexion…',46,180+(L.length-1)*30,C.mute,{s:1,sh:0});
  pell(X,W-36,28,4,4,up?'#4cc46a':(now()/400|0)%2?'#f6c445':'#8a80a6');txt(up?'CONNECTÉ':'CONNEXION…',W-46,32,C.mute,{mini:1,al:'r'});
  wrap('Chacun commence dans sa chambre, puis vous vous retrouvez au labo du Prof. Saule pour choisir vos créatures… et affronter Kael ensemble !',W-56,1).forEach((l,j)=>txt(l,24,H-56+j*11,C.ink2,{s:1,sh:0}))};
 let go=0;for(;;){const i=await choose(['COMMENCER','ANNULER'],{x:W-200,y:H-150,w:184});
  if(i===0){if(!NET.up()&&!await ask('La connexion n\'est pas encore établie. Commencer quand même ? Le jeu continuera d\'essayer tout seul.'))continue;
   if(mates().some(P=>P.dv!==NETDV())){await say('Un joueur n\'a pas la même version du jeu. Rechargez tous la page pour avoir la dernière version.');continue}
   if(!mates().length&&!await ask('Personne d\'autre n\'est encore là. Commencer quand même ? Tes amis pourront te rejoindre à tout moment avec le code.'))continue;go=1;break}
  if(await ask('Quitter cette aventure ?'))break}ui.panel=null;return go}

// =====================================================================
// Présence : aventure, attente de Kael, heure commune ; les joueurs d'une aventure deviennent amis d'office
// =====================================================================
let KW=null;   // en attente du combat contre Kael (tutoriel à plusieurs) : {rs, id}
{const s17=NET.send;NET.send=function(k,o={},to,rel){if(k==='hi'&&G){o={...o,t:G.t|0};if(advCode())o.av=advCode();if(KW)o.kw=KW.rs;if(G.flags?.rival1)o.r1=1}return s17.call(this,k,o,to,rel)}}
{const h17=NET.H.hi;NET.H.hi=(m,P)=>{h17(m,P);P.av=typeof m.av==='string'&&/^[A-Z2-9]{4}$/.test(m.av)?m.av:'';P.kw=SP[m.kw]?m.kw:'';P.r1=m.r1?1:0;P.gt=Number.isFinite(m.t)?Math.max(0,Math.floor(m.t)):0;
 if(isAdvMate(P)&&G){if(P.id&&!isFriend(P))frAdd(P);if(P.gt>G.t&&P.gt-G.t<CYC*500)G.t=P.gt;const mt=(G.coop.mates??={});const key=P.id||P.pid;if(mt[key]!==P.name)mt[key]=P.name}}}
// Bandeau et panneau : AVENTURE au lieu de SALON
drawNet=function(){if(!NET.on||!G)return;const t=Date.now(),adv=advCode();
 if(mode==='world'&&!ui.text&&!ui.menus.length&&!ui.panel){const up=NET.up(),n=NET.peers.size,s=up?`${adv?'AVENTURE':'EN LIGNE'} ${NET.code} - ${n+1}`:`CONNEXION ${NET.code}...`,w=tw(s,2,1)+26,x=6,y=H-22;
  rr(x,y,w,16,2,'rgba(20,14,40,.75)');pell(X,x+9,y+8,3,3,up?'#4cc46a':(t/400|0)%2?'#f6c445':'#8a80a6');txt(s,x+17,y+11,'#ffffff',{mini:1})}
 NET.toasts=NET.toasts.filter(o=>t-o.t0<4200);if(mode!=='world')return;
 NET.toasts.slice(-2).forEach((o,i)=>{const k=t-o.t0,a=k<200?k/200:k>3800?(4200-k)/400:1,w=Math.min(W-20,tw(o.s,1)+24),x=ev(W/2-w/2),y=58+i*22;X.globalAlpha=Math.max(0,a);rr(x,y,w,18,3,C.ink);rr(x+2,y+2,w-4,14,2,C.frameD);txt(o.s,W/2,y+13,'#ffffff',{s:1,al:'c',sh:0});X.globalAlpha=1})};
{const np17=netPanel;netPanel=function(){np17();if(!advCode())return;rr(40,22,150,16,2,C.paper);txt(`AVENTURE ${NET.code}`,44,34,C.acc,{sh:0})}}

// =====================================================================
// Menu EN LIGNE : salon ou aventure, joueurs, amis, réglages
// =====================================================================
async function netSettings(){for(;;){const N=NG(),O=[`COMBATS DES AMIS : ${N.aj==='ask'?'DEMANDER':'REJOINDRE'}`,`SCÈNES DE L'HISTOIRE : ${N.fs===0?'NE PAS SUIVRE':'SUIVRE'}`,'RETOUR'];
 const i=await choose(O,{x:W-308,y:8,w:300,title:'Réglages en ligne',info:j=>({s:['Quand un ami (ou un joueur de ton aventure) commence un combat : le rejoindre tout de suite, ou te demander d\'abord.','Aventure à plusieurs : quand un ami déclenche une scène de l\'histoire, tu la vis avec lui (tu es transporté près de lui).','Fermer.'][j]})});
 if(i<0||i===2)return;if(i===0)N.aj=N.aj==='ask'?'auto':'ask';if(i===1)N.fs=N.fs===0?1:0;save()}}
onlineMenu=async function(){if(!NG().n){await say('EN LIGNE, tu peux retrouver tes amis dans Aurélys : vous vous voyez sur la carte, vous vous défiez, vous échangez vos créatures et vous combattez ensemble.');if(!await askName())return;await askLook();await say('C\'est noté ! Crée un salon, ou rejoins celui d\'un ami avec son code.')}
 for(;;){const adv=advCode();
  if(!NET.on){const O=adv?[[`RECONNECTER ${adv}`,ICO.net],['MES AMIS',ICO.team],['PROFIL',ICO.star],['RÉGLAGES',ICO.gear],['AIDE',ICO.guide],['RETOUR',ICO.close]]:[['CRÉER UN SALON',ICO.home],['REJOINDRE',ICO.pin],...(NG().room?[[`SALON ${NG().room}`,ICO.net]]:[]),['MES AMIS',ICO.team],['PROFIL',ICO.star],['RÉGLAGES',ICO.gear],['AIDE',ICO.guide],['RETOUR',ICO.close]];
   const k=O[await choose(O.map(o=>o[0]),{x:W-244,y:8,w:236,icons:O.map(o=>o[1]),title:adv?`Aventure ${adv}`:'En ligne'})]?.[0];
   if(!k||k==='RETOUR')return;if(k==='PROFIL'){await netProfile();continue}if(k==='AIDE'){for(const l of adv?ADVHELP:NETHELP)await say(l);continue}if(k==='MES AMIS'){await frMenu();continue}if(k==='RÉGLAGES'){await netSettings();continue}
   let code=k.startsWith('RECONNECTER')?adv:k.startsWith('SALON ')?NG().room:null;if(k==='CRÉER UN SALON')code=Array.from({length:4},()=>NETAB[Math.random()*NETAB.length|0]).join('');
   if(k==='REJOINDRE'){code=await kbInput('CODE DU SALON',4,[...NETAB],{cols:8,kw:44,hint:'Demande le code de 4 caractères à ton ami.',ok:s=>s.length===4?s:null});if(!code)continue}
   NET.join(code);save();show('Connexion…');const t0=Date.now();while(!NET.up()&&Date.now()-t0<9000){const kk=await key(150);if(kk==='b')break}ui.text=null;
   if(!NET.up()){await say('La connexion est lente… Le jeu continue d\'essayer tout seul. Vérifie ton accès à Internet.');continue}
   await say(adv?`Te revoilà dans l'aventure ${code} !`:k==='CRÉER UN SALON'?`Ton salon est ouvert ! Son code : ${code}. Donne-le à tes amis : ils choisissent EN LIGNE, puis REJOINDRE.`:`Tu es dans le salon ${code} !`);continue}
  ui.panel=netPanel;const O=[['JOUEURS',ICO.team],['MES AMIS',ICO.heart],['MESSAGE',ICO.note],['ÉMOTE',ICO.heart],['PROFIL',ICO.star],['RÉGLAGES',ICO.gear],['QUITTER',ICO.close],['RETOUR',ICO.home]];
  const k=O[await choose(O.map(o=>o[0]),{x:W-164,y:8,w:156,icons:O.map(o=>o[1])})]?.[0];ui.panel=null;
  if(!k||k==='RETOUR')return;if(k==='PROFIL')await netProfile();if(k==='RÉGLAGES'){await netSettings();continue}if(k==='MES AMIS'){await frMenu();continue}
  if(k==='QUITTER'&&await ask(adv?'Te déconnecter de l\'aventure ? Tu pourras continuer seul et te reconnecter plus tard (menu EN LIGNE).':'Quitter le salon ? Tes amis ne te verront plus.')){NET.leave();return}
  if(k==='MESSAGE'){const i=await choose(QCHAT,{x:W-252,y:8,w:244,vis:9,title:'Message rapide'});if(i>=0){NET.send('ch',{c:i});ME15.say={s:QCHAT[i],t0:now()};NET.log.push('Toi : '+QCHAT[i]);return}}
  if(k==='ÉMOTE'){const i=await choose(QEMO.map((_,j)=>['Surprise','Question','Cœur','Musique','Silence'][j]),{x:W-200,y:8,w:192,title:'Émote',icons:QEMO.map(e=>EMO()[e])});if(i>=0){NET.send('em',{e:i});emote('me',QEMO[i],900);return}}
  if(k==='JOUEURS'){const L=[...NET.peers.values()];if(!L.length){await say(adv?`Personne d'autre n'est connecté à l'aventure ${NET.code} pour l'instant.`:`Personne d'autre n'est dans le salon. Donne le code ${NET.code} à tes amis !`);continue}
   const i=await choose(L.map(P=>P.name+(isMate(P)?' ★':'')),{x:W-252,y:8,w:244,title:adv?'Joueurs de l\'aventure':'Joueurs du salon',info:i=>({s:`${netWhere(L[i])}${L[i].cb?' · en combat':L[i].bz?' · occupé':''}${isAdvMate(L[i])?' · ton aventure':isFriend(L[i])?' · ton ami':''} · ${L[i].b} badge${L[i].b>1?'s':''}${L[i].ld?' · '+SP[L[i].ld].name+' en tête':''}`})});if(i>=0&&await friendMenu(L[i].pid))return}}};

// =====================================================================
// ALLER LE VOIR : téléportation auprès d'un joueur de l'aventure
// =====================================================================
function advCanGo(P){return isAdvMate(P)&&!!G&&(f().intro|0)>=3&&okMap(P.map)&&okXY(P.map,P.x,P.y)&&!NOGHOST.has(P.map)&&P.map!=='songe'&&!MAPS[P.map].dream&&!G.dream}
function advSpot(map,x,y){const M=MAPS[map],ok=(a,b)=>{const c=M.rows[b]?.[a];return!!c&&!SOLID.has(c)&&c!=='E'&&!M.doors?.[a+','+b]&&!npcs(M).some(n=>!n.net&&n.x===a&&n.y===b)};
 for(const[dx,dy]of[[0,1],[1,0],[-1,0],[0,-1]])if(ok(x+dx,y+dy))return[x+dx,y+dy];return[x,y]}
async function advGoTo(P){if(!advCanGo(P))return say(`Impossible de rejoindre ${P.name} là où il se trouve.`);const[x,y]=advSpot(P.map,P.x,P.y);
 sfx('door');await fadeTo(1,250);loadMap(P.map,x,y,P.d);await fadeTo(0,250);NET.hi(1);await say(`Tu rejoins ${P.name} !`)}

// =====================================================================
// Scènes partagées (aventure à plusieurs) : la scène est rejouée chez chaque joueur, ses combats sont communs
// =====================================================================
const SCQ=[],SCEND=new Map();   // scènes proposées par les autres, scènes terminées chez leur meneur (sid → nombre de combats)
setInterval(()=>{const t=Date.now();for(const[k,v]of SCEND)if(t-v.t>600000)SCEND.delete(k)},10000);
const scOn=()=>!!advCode()&&NET.on&&!!G&&!G.dream;
async function scRun(ref,fn){if(SCX||!scOn()||NOGHOST.has(ref.m)||ref.m==='songe'||MAPS[ref.m]?.dream)return fn();const S=SCX={lead:1,ref,sid:null,bi:0,cur:null,pos:{m:G.map,x:G.x,y:G.y,d:G.dir},fol:new Set(),t:G.t|0};
 try{return await fn()}finally{if(SCX===S)SCX=null;if(S.sid){SCEND.set(S.sid,{nb:S.bi,t:Date.now()});for(const P of matePeers())if(isAdvMate(P))NET.send('sc-end',{sid:S.sid,nb:S.bi},P.pid,true)}}}
// Une scène devient « partagée » dès son premier temps fort : cinématique, combat, badge
function scMark(){const S=SCX;if(!S?.lead||S.sid||(f().intro|0)<3)return;const L=matePeers().filter(P=>isAdvMate(P)&&P.dv===NETDV());if(!L.length)return;S.sid=rid6();
 for(const P of L)NET.send('sc-go',{sid:S.sid,ref:S.ref,pos:S.pos,t:S.t},P.pid,true)}
{const cn17=cinema;cinema=function(...a){scMark();return cn17.apply(this,a)}}
{const bg17=badgeGet;badgeGet=async function(...a){scMark();return bg17.apply(this,a)}}
function scResolve(r){const M=MAPS[r?.m];if(!M)return null;
 if(r.t==='npc'){const n=M.npcs.find(n=>!n.net&&!n.fauna&&n.t===r.nt&&(n.x0??n.x)===r.x&&(n.y0??n.y)===r.y&&(n.name||'')===(r.nm||''));return n&&typeof n.fn==='function'&&npcs(M).includes(n)&&!(n.tr&&f()['t_'+n.tr.id])?()=>n.fn(n):null}
 if(r.t==='tr'){const n=M.npcs.find(n=>n.tr&&n.tr.id===r.tid);return n&&npcs(M).includes(n)&&!f()['t_'+r.tid]?()=>trainerBattle(n):null}
 if(r.t==='act'){const a=M.acts?.[r.k];return typeof a==='function'?()=>a():null}
 if(r.t==='door'){const d=M.doors?.[r.k];return typeof d==='function'?()=>d():null}
 if(r.t==='step')return typeof M.step==='function'?()=>M.step():null;
 if(r.t==='enter')return typeof M.enter==='function'?()=>M.enter():null;return null}
const scFree=()=>cbFree()&&scOn()&&NG().fs!==0&&(f().intro|0)>=3&&!NOGHOST.has(G.map)&&G.map!=='songe';
const scNear=q=>['npc','tr'].includes(q.ref.t)||G.map===q.pos.m&&!SCEND.has(q.sid);   // une case, une porte ou une entrée de lieu : seulement sur la même carte
const scCan=q=>scFree()&&scNear(q)&&!!scResolve(q.ref);
NET.H['sc-go']=(m,P)=>{if(!isAdvMate(P)||typeof m.sid!=='string'||!/^[a-z0-9]{6}$/.test(m.sid)||!m.ref||typeof m.ref!=='object'||SCQ.some(q=>q.sid===m.sid))return;const p=m.pos;
 if(!p||!okMap(p.m)||!okXY(p.m,p.x,p.y)||typeof m.ref.m!=='string'||!MAPS[m.ref.m]||NOGHOST.has(p.m)){NET.send('sc-a',{sid:m.sid,ok:0},P.pid,true);return}
 const q={sid:m.sid,ref:m.ref,pos:{m:p.m,x:p.x,y:p.y,d:p.d&3},t:Math.max(0,m.t|0),from:P.pid,t0:Date.now()},ok=scCan(q);if(ok||['npc','tr'].includes(q.ref.t))SCQ.push(q);NET.send('sc-a',{sid:m.sid,ok:ok?1:0},P.pid,true)};   // une scène de case ou de lieu manquée se vivra en y passant
NET.H['sc-a']=(m,P)=>{const S=SCX;if(S?.lead&&S.sid===m.sid&&m.ok){S.fol.add(P.pid);if(CB&&CB.id===S.cur&&!CB.exp.get(P.pid)?.fol)CB.exp.set(P.pid,{fol:1})}};
NET.H['sc-f']=NET.H['sc-a'];
NET.H['sc-fe']=(m,P)=>{const S=SCX;if(S?.lead&&S.sid===m.sid)S.fol.delete(P.pid);const e=CB?.exp?.get(P.pid);if(e?.fol)e.end=1};
NET.H['sc-end']=(m,P)=>{if(typeof m.sid!=='string'||!/^[a-z0-9]{6}$/.test(m.sid))return;SCEND.set(m.sid,{nb:Math.max(0,Math.min(50,m.nb|0)),t:Date.now()})};
setInterval(()=>{if(!SCQ.length)return;const t=Date.now();for(let i=SCQ.length-1;i>=0;i--){const q=SCQ[i],e=SCEND.get(q.sid);if(t-q.t0>180000||!NET.peers.has(q.from)||e&&t-e.t>45000)SCQ.splice(i,1)}
 if(!SCQ.length||!scFree())return;const q=SCQ.shift();run(()=>scFollow(q))},200);
async function scFollow(q){const P=NET.peers.get(q.from);if(!P)return;const fn=scNear(q)?scResolve(q.ref):null;if(!fn){NET.send('sc-fe',{sid:q.sid},P.pid,true);return}
 if(q.t>G.t)G.t=q.t;sfx('alert');NET.note(`${P.name} : une scène de l'histoire commence !`);
 if(G.map!==q.pos.m||G.x!==q.pos.x||G.y!==q.pos.y){await fadeTo(1,220);loadMap(q.pos.m,q.pos.x,q.pos.y,q.pos.d);await fadeTo(0,220)}else G.dir=q.pos.d;
 const S=SCX={lead:0,sid:q.sid,leader:P.pid,bi:0};NET.send('sc-f',{sid:q.sid,ok:1},P.pid,true);NET.hi(1);
 try{await fn()}catch(e){console.error(e)}finally{if(SCX===S)SCX=null;NET.send('sc-fe',{sid:q.sid},P.pid,true);NET.hi(1)}}
// Déclencheurs : parler à un PNJ (ou examiner), un dresseur, une porte spéciale, une case piégée, l'entrée d'un lieu
{const it17=interact;interact=async function(){if(SCX||!scOn())return it17();const{n,s,a,tx,ty}=facing();
 if(n&&!n.net&&!n.fauna&&!n.item&&n.t!=='ball'&&typeof n.fn==='function')return scRun({t:'npc',m:G.map,nt:n.t,x:n.x0??n.x,y:n.y0??n.y,nm:n.name||''},()=>it17());
 if(!n&&!s&&typeof a==='function')return scRun({t:'act',m:G.map,k:tx+','+ty},()=>it17());return it17()}}
{const tb17=trainerBattle;trainerBattle=async function(n){if(SCX||!n?.tr||!scOn())return tb17(n);return scRun({t:'tr',m:G.map,tid:n.tr.id},()=>tb17(n))}}
for(const[mk,M]of Object.entries(MAPS)){if(M.doors)for(const k of Object.keys(M.doors))if(typeof M.doors[k]==='function'){const d0=M.doors[k];M.doors[k]=(...a)=>scRun({t:'door',m:mk,k},()=>d0(...a))}
 if(typeof M.step==='function'){const s0=M.step;M.step=()=>scRun({t:'step',m:mk},()=>s0())}
 if(typeof M.enter==='function'){const e0=M.enter;M.enter=()=>scRun({t:'enter',m:mk},()=>e0())}}
// Combats de scène : l'hôte est le meneur ; chez les autres, la scène rejoint ce combat (ou reprend son résultat s'il est déjà fini)
function scRv(id){const S=SCX,m=/^([a-z0-9]{6})b(\d+)$/.exec(id);if(KW&&id===KW.id)return'wait';if(!m)return null;
 if(S?.lead&&S.sid===m[1])return +m[2]>=S.bi||id===S.cur?'wait':'none';const e=SCEND.get(m[1]);return e&&+m[2]>=e.nb?'none':null}
function cbRvDone(id,r){if(!id)return;if(!CBRES.has(id))CBRES.set(id,{w:['win','catch','lose','run'].includes(r)?r:'run',by:-1,t:Date.now()});const L=PJB.get(id);if(L){const R=CBRES.get(id);for(const j of L.L)NET.send('cb-no',{id,why:'over',w:R.w,by:R.by},j.pid,true);PJB.delete(id)}}
async function scJoin(P,id,sid,bi){const res=await cbJoin(P,id,{quiet:1,msg:`Le combat commence chez ${P.name}… (B : combattre sans l'attendre)`,ask:`Combattre sans attendre ${P.name} ?`,max:150000,stop:()=>{const e=SCEND.get(sid);return!!e&&bi>=e.nb}});
 if('r' in res)return res.r==null?null:res.r;
 if(res.no==='over'&&res.w){const r=cbRes(res.w);await say(r==='win'?`${P.name} a déjà remporté ce combat !`:r==='lose'?`${P.name} a perdu ce combat…`:`Le combat de ${P.name} est déjà terminé.`);return r}return null}
{const bt17=battle;battle=async function(foes,o={}){const S=SCX;
 if(S&&!S.lead&&S.sid){const bi=S.bi++,id=S.sid+'b'+bi,P=NET.peers.get(S.leader);if(P){const r=await scJoin(P,id,S.sid,bi);if(r!=null)return r}return bt17(foes,o)}
 let id=null;if(S?.lead){scMark();if(S.sid){id=S.sid+'b'+(S.bi++);S.cur=id;CBSC={id,fol:new Set(S.fol)}}}
 let r=null;try{r=await bt17(foes,o);return r}finally{if(id){if(CBSC?.id===id)CBSC=null;if(S.cur===id)S.cur=null;cbRvDone(id,r)}}}}

// =====================================================================
// Tutoriel à plusieurs : chacun choisit sa créature, puis Kael affronte tout le monde en même temps
// =====================================================================
{const ps17=pickStarter;pickStarter=async function(sp){if(f().starter||!scOn()||!matePeers().some(isAdvMate))return ps17(sp);return pickStarterCoop(sp)}}
async function pickStarterCoop(sp){ui.panel=()=>{panel(152,10,176,190);const fl=(now()/400|0)%2*2;pell(X,240,166,52,6,'rgba(31,26,51,.16)');X.drawImage(monSpr(sp,0,128),176,44-fl,128,128);const w=tw(TY[SP[sp].t][0],2,1)+12;chip(SP[sp].t,ev(240-w/2),176);txt(SP[sp].name,240,46,C.ink,{al:'c'})};
 const ok=await ask(`${SP[sp].name}, le Pixémon de type ${TY[SP[sp].t][0]}. Son talent : ${TAL[SP[sp].tal][0]}. Tu le choisis ?`);ui.panel=null;if(!ok)return;
 G.party.push(mon(sp,5,{aff:120}));dex(sp,2);f().starter=sp;folReset();jingle('item');puff(G.x,G.y-1,'#ffffff',12);await say(`Tu as choisi ${SP[sp].name} !`);NET.hi(1);
 const adv=()=>matePeers().filter(P=>isAdvMate(P)&&P.dv===NETDV()),W0=adv().filter(P=>P.kw);let rs=W0[0]?.kw||{flamiot:'goutelin',goutelin:'pousseron',pousseron:'flamiot'}[sp];f().rs=rs;
 const k=MAPS.lab.npcs.find(n=>n.t==='rival');await cine(1);await emote(k,'!');await walk(k,'uR');
 await say(W0.length?`Moi, j'ai pris ${SP[rs].name} ! Celui de ${W0[0].name} ne fera pas le poids.`:`Alors moi, je prends ${SP[rs].name} ! Il a l'avantage sur le tien. Désolé, c'est la loi des types.`,'Kael');f().kaelPick=1;sfx('ball');puff(3+['flamiot','goutelin','pousseron'].indexOf(rs),3,'#ffffff',10);
 await approach(k,3);KW={rs,id:'k'+NET.pid};NET.hi(1);
 const pend=()=>adv().filter(P=>!P.kw&&!P.r1);
 if(pend().length){await say(`Attends… ${pend().map(P=>P.name).join(' et ')} n'a pas encore choisi ! Je vais tous vous affronter en même temps. On l'attend !`,'Kael');
  while(pend().length){show(`En attente de ${pend().map(P=>`${P.name} (${netWhere(P)})`).join(', ')}… (B : affronter Kael sans attendre)`,0);const kk=await key(250);if(kk==='b'){ui.text=null;if(await ask('Affronter Kael sans attendre tes amis ?'))break}}ui.text=null}
 const part=[NET.pid,...adv().filter(P=>P.kw).map(P=>P.pid)].sort(),host=part[0],hp=host===NET.pid?null:NET.peers.get(host);if(hp?.kw){rs=hp.kw;f().rs=rs}
 await say(part.length>1?'Allez, voyons ce que vous valez ! En garde, tout le monde !':'Allez, voyons ce qu\'il vaut ! En garde !','Kael');await cine(0);
 const id='k'+host,tr={name:'Kael',look:'rival',money:100,vs:1,after:'Grr… La prochaine fois, je gagnerai !'};let r=null;
 if(!hp){KW={rs,id};CBSC={id,fol:new Set(part.filter(p=>p!==NET.pid))};try{r=await battle([mon(rs,5)],{tr,noLose:1})}finally{if(CBSC?.id===id)CBSC=null;cbRvDone(id,r)}}
 else{const res=await cbJoin(hp,id,{quiet:1,msg:`Le combat contre Kael commence chez ${hp.name}… (B : l'affronter seul)`,ask:'Affronter Kael seul ?',max:120000});
  if('r' in res&&res.r!=null)r=res.r;else if(res.no==='over'&&res.w)r=cbRes(res.w);if(r==null)r=await battle([mon(rs,5)],{tr,noLose:1})}
 KW=null;NET.hi(1);
 f().rival1=1;healAll();const P0=MAPS.lab.npcs.find(n=>n.t==='prof');faceTo(P0,G.x,G.y);await say(r==='win'?'Bravo ! Battre un adversaire avec l\'avantage du type… Tu as du flair !':'Ne t\'en fais pas : il avait l\'avantage du type. Tu apprendras vite !','Prof. Saule');
 G.keys.dex=1;G.bag.capsule=(G.bag.capsule||0)+5;G.bag.potion=(G.bag.potion||0)+3;jingle('item');ui.pop={ic:ICO.dex,t0:now()};await say('Tiens : un PIXÉDEX, 5 Capsules et 3 Potions. Le Pixédex note chaque créature que tu vois ou captures. Rapporte-m\'en, je te récompenserai !','Prof. Saule');
 await say('Rejoignez Cendreville au nord par la Route 1 et affrontez Brasia, la championne d\'arène. Ensemble, vous irez loin !','Prof. Saule');
 const kk=MAPS.lab.npcs.find(n=>n.t==='rival');if(kk){await emote(kk,'♪',500);await say('À plus ! Je serai toujours un pas devant vous !','Kael')}save()}

// --- Sauvegarde 17.0 : aventure à plusieurs vérifiée ; on montre les nouveautés
{const norm17=normalize;normalize=function(g){g=norm17(g);if(!g)return g;if(g.coop&&(typeof g.coop!=='object'||!/^[A-Z2-9]{4}$/.test(g.coop.code||'')))delete g.coop;if(g.coop&&(typeof g.coop.mates!=='object'||!g.coop.mates))g.coop.mates={};
 if(g.net){if(!['auto','ask'].includes(g.net.aj))delete g.net.aj;if(g.net.fs!==0)delete g.net.fs}if(g.v<17){g.wn=1;g.v=17}return g}}
ACH.push(['adv1','Aventure partagée','Battre un champion d\'arène avec un ami de ton aventure.',()=>!!G.net?.advL,['hyperpotion',3]]);
{const eb17=endBattle;endBattle=async function(r){const b=B;if(r==='win'&&b?.coop&&b.tr&&LEADERS10.includes(b.tr.name)&&advCode()&&(b.coop.N>1||b.coop.v?.Nmax>1))NG().advL=1;return eb17(r)}}
NEWS.unshift([()=>ICO.team,'Aventure à plusieurs','Toute l\'histoire avec tes amis ! Écran titre : AVENTURE À PLUSIEURS. Tutoriel contre Kael à plusieurs, scènes partagées, combats contre les dresseurs et les champions ensemble. Et chacun voit enfin sa propre apparence !']);
