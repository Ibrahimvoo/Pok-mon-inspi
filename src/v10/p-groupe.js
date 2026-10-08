// =====================================================================
// EXTENSIONS 16.0 et 17.0 — Combats en groupe : jusqu'à 4 joueurs se battent ensemble contre une créature sauvage, un dresseur,
// un champion, un boss ou un légendaire. Les AMIS (ajoutés une fois pour toutes, ils le restent d'un salon à l'autre) et les joueurs
// d'une même AVENTURE À PLUSIEURS rejoignent automatiquement les combats les uns des autres, où qu'ils soient sur la carte.
// L'adversaire se renforce selon le nombre de joueurs encore debout (PV, Attaque, Défense, Vitesse, une action par joueur).
// L'hôte (celui qui a lancé le combat) calcule chaque tour avec les vraies formules du jeu ; tous les écrans rejouent les mêmes
// événements. Chacun combat avec ses vraies créatures : PV, PP, statuts et objets consommés sont conservés, l'EXP est gagnée.
// =====================================================================
// Renforcement de l'adversaire selon le nombre de joueurs debout, réglé par simulation : chacun encaisse à peu près autant qu'en solo
// (dresseurs : ~55 % de victoires contre ~45 % seul, ~85 % des PV perdus contre ~80 % ; créatures sauvages : ~30 % des PV contre ~27 %)
const CBF=4,CBMAX=4,CBK=[null,{hp:1,atk:1,def:1,spd:1},{hp:1.9,atk:1.12,def:1.08,spd:1.05},{hp:2.7,atk:1.22,def:1.12,spd:1.08},{hp:3.5,atk:1.32,def:1.15,spd:1.1}],CBXP=[1,1,1.2,1.35,1.5],CBXPT=[1,1,1.1,1.2,1.3];
const CBME=[120,168],CBP=[[34,208,.44],[214,130,.42],[44,162,.38]];
const PAL=C;let CB=null,CBG=null,CBJ=null,CBSC=null,SCX=null;
const rid6=()=>Array.from({length:6},()=>'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random()*36|0]).join('');
const fmtK=k=>String(k).replace('.',',');
const CBID=/^[a-z0-9]{1,16}$/,cbRes=w=>w==='catch'?'win':['win','lose','run'].includes(w)?w:'run';

// --- Identité stable de l'appareil et liste d'amis (gardée dans le navigateur, valable pour toutes les parties)
const NETID=(()=>{let v=lsGet('pixemon-net-id');if(!/^[a-z0-9]{10}$/.test(v||'')){v=Array.from({length:10},()=>'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random()*36|0]).join('');try{localStorage.setItem('pixemon-net-id',v)}catch(e){}}return v})();
let FRL=(()=>{try{const a=JSON.parse(lsGet('pixemon-friends')||'[]');return Array.isArray(a)?a.filter(o=>o&&/^[a-z0-9]{10}$/.test(o.id)).slice(0,40):[]}catch(e){return[]}})();
const frSave=()=>{try{localStorage.setItem('pixemon-friends',JSON.stringify(FRL))}catch(e){}};
const isFriend=P=>!!P?.id&&FRL.some(o=>o.id===P.id);
function frAdd(P){if(!P?.id||P.id===NETID)return;const o=FRL.find(o=>o.id===P.id);if(o){o.n=P.name;o.lk=P.look;o.t=Date.now()}else FRL.unshift({id:P.id,n:P.name,lk:P.look,t:Date.now()});FRL=FRL.slice(0,40);frSave()}
function frDel(id){FRL=FRL.filter(o=>o.id!==id);frSave()}
const advCode=()=>G?.coop?.code||'';
const isAdvMate=P=>!!P&&!!advCode()&&P.av===advCode();
const isMate=P=>!!P&&NET.on&&NET.peers.has(P.pid)&&(isAdvMate(P)||isFriend(P));
const matePeers=()=>NET.on?[...NET.peers.values()].filter(isMate):[];
const grpPeers=matePeers;

// --- Présence : identité, combat ouvert
function cbInfo(){const C=CB,v=C?.vE;if(!C||!v||v.ph==='end'||!C.foe)return null;const n=v.A.filter(a=>a&&!a.out).length;return n>=CBMAX?null:{i:C.id,sp:C.foe.sp,lv:C.foe.lv,n,...(C.tr?{tr:C.tr.name}:{})}}
{const s16=NET.send;NET.send=function(k,o={},to,rel){if(k==='hi'){o={...o,id:NETID};const c=cbInfo();if(c)o.cb=c}return s16.call(this,k,o,to,rel)}}
{const h16=NET.H.hi;NET.H.hi=(m,P)=>{h16(m,P);P.id=typeof m.id==='string'&&/^[a-z0-9]{10}$/.test(m.id)?m.id:'';const c=m.cb;
 P.cb=c&&typeof c==='object'&&typeof c.i==='string'&&CBID.test(c.i)&&SP[c.sp]?{i:c.i,sp:c.sp,lv:Math.max(1,Math.min(100,c.lv|0)),n:Math.max(1,Math.min(CBMAX,c.n|0)),tr:typeof c.tr==='string'?netTr(c.tr):''}:null;
 if(isFriend(P)){const o=FRL.find(o=>o.id===P.id);if(o&&(o.n!==P.name||o.lk!==P.look)){o.n=P.name;o.lk=P.look;frSave()}}}}
const netTr=s=>String(s).replace(/[\x00-\x1f]/g,'').slice(0,40);
{const lv16=NET.leave;NET.leave=function(q){CBJ=null;return lv16.call(this,q)}}
{const g16=NET.H.gone;NET.H.gone=P=>{g16?.(P);const C=CB;if(C?.vE){const a=C.vE.A.find(x=>x&&x.pid===P.pid&&!x.out);if(a)C.pg.add(a.s);C.pj=C.pj.filter(j=>j.pid!==P.pid)}if(CBG&&CBG.hostPid===P.pid)CBG.lost=1}}

// --- Invitation « devenir amis » (persistante : on combat ensemble automatiquement à chaque rencontre)
{const inv16=NET.H.inv;NET.H.inv=(m,P)=>{if(m.t!=='fr')return inv16(m,P);if(typeof m.id!=='string'||m.id.length>12)return;
 if(isFriend(P)){NET.send('invr',{id:m.id,ok:1},P.pid,true);return}
 if(NET.act||NET.inv&&NET.inv.id!==m.id||mode!=='world'){NET.send('invr',{id:m.id,ok:0,why:'busy'},P.pid,true);return}
 NET.inv={id:m.id,from:P.pid,t:'fr',ru:{},t0:Date.now()};NET.note(`${P.name} veut devenir ton ami !`);sfx('alert')}}
{const pi16=promptInvite;promptInvite=async function(){const I=NET.inv;if(I?.t!=='fr')return pi16();const P=NET.peers.get(I.from);if(!P){NET.inv=null;return}
 show(`${P.name} veut devenir ton ami : dès que l'un de vous combattra, l'autre le rejoindra automatiquement. Accepter ?`,0);const r=await choose(['OUI','NON'],{w:110});ui.text=null;
 const live=NET.inv===I&&NET.peers.has(P.pid)&&Date.now()-I.t0<45000;NET.inv=null;if(!live)return say('L\'invitation a expiré.');
 if(r!==0){NET.send('invr',{id:I.id,ok:0},P.pid,true);return}
 if(!await NET.send('invr',{id:I.id,ok:1},P.pid,true))return say('La connexion avec ton ami s\'est interrompue.');
 frAdd(P);NET.hi(1);sfx('ok');await say(`Tu es maintenant ami avec ${P.name} ! Dès que l'un de vous combat, l'autre le rejoint automatiquement, où qu'il soit.`)}}
async function frInvite(P){if(isFriend(P))return say(`${P.name} est déjà ton ami.`);if(!P.id)return say(`${P.name} n'a pas la même version du jeu que toi. Rechargez tous les deux la page.`);
 const id=netId(),A=NET.act={k:'inv',id,with:P.pid,resp:null};NET.send('inv',{id,t:'fr'},P.pid,true);show(`Demande envoyée à ${P.name}… (B : annuler)`);const t0=Date.now();let why=null;
 for(;;){if(A.resp)break;if(!NET.peers.has(P.pid)){why='gone';break}if(Date.now()-t0>45000){why='late';break}const k=await key(150);if(k==='b'){why='cancel';break}}ui.text=null;if(NET.act===A)NET.act=null;
 if(why){NET.send('inv-x',{id},P.pid,true);if(why==='gone')await say(`${P.name} a quitté ${netRoom()}.`);if(why==='late')await say(`${P.name} n'a pas répondu.`);return}
 if(!A.resp.ok)return say(A.resp.why==='busy'?`${P.name} est occupé pour le moment.`:`${P.name} a refusé.`);
 frAdd(P);NET.hi(1);sfx('ok');await say(`${P.name} est maintenant ton ami ! Dès que l'un de vous combat, l'autre le rejoint automatiquement, où qu'il soit.`)}
// Liste d'amis : présents dans le salon ou non
async function frMenu(){for(;;){if(!FRL.length)return say('Tu n\'as pas encore d\'ami. Approche-toi d\'un joueur du salon, appuie sur A et choisis AJOUTER EN AMI.');
 const here=o=>[...NET.peers.values()].find(P=>P.id===o.id);const L=FRL.slice(0,20);
 const i=await choose([...L.map(o=>o.n+(here(o)?' ★':'')),'RETOUR'],{x:W-252,y:8,w:244,vis:8,title:`Mes amis (${FRL.length})`,info:i=>i<L.length?{s:here(L[i])?`Dans ce salon · ${netWhere(here(L[i]))}${here(L[i]).cb?' · en combat':''}`:'Pas dans ce salon pour l\'instant.'}:{s:'Fermer.'}});
 if(i<0||i===L.length)return;const o=L[i],P=here(o);if(P){await friendMenu(P.pid);continue}
 if(await ask(`Retirer ${o.n} de tes amis ?`)){frDel(o.id);NET.hi(1);await say(`${o.n} n'est plus dans ta liste d'amis.`)}}}

// --- Menu d'un joueur (depuis la liste ou en lui parlant sur la carte)
friendMenu=async function(pid){const P=NET.peers.get(pid);if(!P)return say('Ce joueur n\'est plus connecté.');const fr=isFriend(P),adv=isAdvMate(P),same=P.dv===NETDV(),help=isMate(P)&&same&&!!P.cb&&!CB&&!CBG;
 const go=adv&&typeof advCanGo==='function'&&advCanGo(P);
 const O=[...(help?['REJOINDRE SON COMBAT']:[]),...(go?['ALLER LE VOIR']:[]),'COMBAT','ÉCHANGE',...(adv?[]:[fr?'RETIRER DES AMIS':'AJOUTER EN AMI']),'MESSAGE','RETOUR'];
 const k=O[await choose(O,{x:W-212,y:8,w:204,title:P.name,info:()=>({s:`${netWhere(P)}${P.cb?' · en combat':P.bz?' · occupé':''}${adv?' · ton aventure':fr?' · ton ami':''} · ${P.b} badge${P.b>1?'s':''}${P.ld?' · '+SP[P.ld].name+' en tête':''}`})})];
 if(!k||k==='RETOUR')return false;if(!NET.peers.has(pid))return say(`${P.name} n'est plus connecté.`);
 if(k==='MESSAGE'){const j=await choose(QCHAT,{x:W-252,y:8,w:244,vis:9,title:'Message rapide'});if(j>=0){NET.send('ch',{c:j});ME15.say={s:QCHAT[j],t0:now()};NET.log.push('Toi : '+QCHAT[j])}return true}
 if(k==='AJOUTER EN AMI'){await frInvite(P);return true}
 if(k==='RETIRER DES AMIS'){if(await ask(`Retirer ${P.name} de tes amis ? Vous ne rejoindrez plus automatiquement vos combats.`)){frDel(P.id);NET.hi(1);await say(`${P.name} n'est plus ton ami.`)}return true}
 if(k==='ALLER LE VOIR'){await advGoTo(P);return true}
 if(!same){await say(`${P.name} n'a pas la même version du jeu que toi. Rechargez tous les deux la page pour avoir la dernière version.`);return true}
 if(k==='REJOINDRE SON COMBAT'){CBSKIP.add(P.cb.i);await cbJoin(P,P.cb.i);return true}
 if(k==='ÉCHANGE'){if(G.party.length<2){await say('Il te faut au moins deux créatures dans ton équipe pour échanger.');return true}const r=await netInvite(P,'tr',{});if(r)await tradeFlow(P,r,1);return true}
 if(G.party.length<1)return say('Il te faut au moins une créature !');
 const fm=await choose(['3 CONTRE 3','6 CONTRE 6','RETOUR'],{x:W-252,y:8,w:244,title:'Format du combat',info:j=>({s:['Chacun choisit 3 créatures de son équipe. Rapide et tactique !','Toute l\'équipe, jusqu\'à 6 créatures chacun.','Annuler.'][j]})});if(fm<0||fm===2)return true;
 const lv=await choose(['TOUS AU NIVEAU 50','NIVEAUX RÉELS','RETOUR'],{x:W-252,y:8,w:244,title:'Niveaux',info:j=>({s:['Toutes les créatures passent au niveau 50 : idéal entre amis qui n\'en sont pas au même point de l\'aventure.','Chaque créature garde son vrai niveau.','Annuler.'][j]})});if(lv<0||lv===2)return true;
 const ru={n:fm?6:3,l50:lv?0:1,ph:Math.min(3,phase())},r=await netInvite(P,'bt',ru);if(r)await pvpFlow(P,r,ru,0);return true};
NETHELP.splice(3,0,'AJOUTER EN AMI (en parlant à un joueur) : vous restez amis pour toujours. Dès que l\'un de vous combat (créature sauvage, dresseur, champion…), les autres le rejoignent automatiquement, où qu\'ils soient. Jusqu\'à 4 joueurs par combat : plus vous êtes nombreux, plus l\'adversaire est fort, et plus l\'EXP grimpe !');
{const np16=netPanel;netPanel=function(){np16();const L=[null,...NET.peers.values()];L.slice(0,8).forEach((P,i)=>{if(!P)return;const y=52+i*30;if(isMate(P))X.drawImage(ICO.star,8,y,10,10);if(P.cb)X.drawImage(ICO.bang,30,y-10,12,12)});const n=matePeers().length;if(n)txt(`${advCode()?'AVENTURE':'AMIS'} ICI : ${n}`,22,H-62,PAL.acc,{mini:1})}}
// Sur la carte : étoile pour les amis, « ! » au-dessus d'un joueur en combat
{const dw16=drawWorld;drawWorld=function(t){dw16(t);if(!NET.on||!CAM)return;for(const P of NET.peers.values()){const g=P.g;if(!g||g.mp!==G.map)continue;const sx=ev(g.x*TS+g.ox-CAM[0])+16,sy=ev(g.y*TS+g.oy-CAM[1]),nw=tw(P.name,1)+8;
  if(isMate(P))X.drawImage(ICO.star,sx-nw/2-13,sy-50,12,12);if(P.cb||P.bz){const b=(t/300|0)%2;X.drawImage(P.cb?ICO.bang:ICO.dots||ICO.bang,sx+nw/2+2,sy-52-b,12,12)}}}}

// =====================================================================
// Copies de combat (vraies valeurs : PV, PP, statut, objet) et contrôle à la réception
// =====================================================================
function cbCopy(m){const S=st14(m);return{sp:m.sp,lv:m.lv,exp:m.exp,moves:m.moves.slice(0,4),pp:m.pp.slice(0,4),hp:m.hp,st:m.st||null,slp:m.slp||0,aff:m.aff|0,nat:m.nat,sh:m.sh?1:0,item:m.item||null,eq:m.eq||null,...(m.ot?{ot:m.ot}:{}),_S:{hp:S.hp,atk:S.atk,def:S.def,spd:S.spd}}}
const cbSnap=c=>({...snapMon(c,1),_S:{...c._S}});
function cbMon(o){const m=netMon(o,1);if(!m)return null;const b=st14(m),S={};for(const k of['hp','atk','def','spd']){const v=o._S?.[k];S[k]=Number.isFinite(v)&&v>=b[k]*.7&&v<=b[k]*1.7?Math.floor(v):b[k]}
 m._S=S;m.hp=Math.max(0,Math.min(S.hp,m.hp));if(m.hp<=0){m.st=null;m.slp=0}return m}
const cbTeam=L=>{if(!Array.isArray(L)||!L.length||L.length>6)return null;const T=L.map(cbMon);return T.every(Boolean)&&T.some(m=>m.hp>0)?T:null};
const CBITK=['heal','revive','cure','pp'];
function cbSan(c){const o={};if(!c||typeof c!=='object')return o;const I=v=>Number.isInteger(v)&&v>=-1&&v<8;
 if(c.lv)return{lv:1};if(c.run)return{run:1};if(typeof c.ball==='string'&&IT[c.ball]?.[4]==='ball')return{ball:c.ball};
 if(typeof c.it==='string'&&CBITK.includes(IT[c.it]?.[4])&&I(c.t))return{it:c.it,t:c.t};if(I(c.w))return{w:c.w};if(I(c.r))return{r:c.r};if(I(c.m))o.m=c.m;if(c.e)o.e=1;return o}
// Dresseur et options envoyés aux autres écrans
const cbTrOut=tr=>tr?{name:String(tr.name||'Dresseur'),look:String(tr.look||'grunt'),money:Math.max(0,tr.money|0),after:typeof tr.after==='string'?tr.after:'',boss:tr.boss?1:0,vs:tr.vs?1:0,ev:tr.ev?1:0,field:tr.field||null}:null;
function cbTrIn(t){if(!t||typeof t!=='object')return null;const s=(v,n)=>String(v??'').replace(/[\x00-\x1f]/g,'').slice(0,n);
 return{name:s(t.name,40)||'Dresseur',look:PEO[t.look]?t.look:'grunt',money:Math.max(0,Math.min(100000,t.money|0)),after:s(t.after,300),boss:t.boss?1:0,vs:t.vs?1:0,ev:t.ev?1:0,field:['volt','maree','crep','roc'].includes(t.field)?t.field:null}}
const cbOptOut=o=>({noLose:o?.noLose?1:0,legend:o?.legend?1:0,roam:o?.roam?1:0,fish:o?.fish?1:0,...(typeof o?.loseMsg==='string'?{loseMsg:o.loseMsg}:{})});
const cbOptIn=o=>({coop:1,noLose:o?.noLose?1:0,legend:o?.legend?1:0,roam:o?.roam?1:0,fish:o?.fish?1:0,...(typeof o?.loseMsg==='string'?{loseMsg:String(o.loseMsg).replace(/[\x00-\x1f]/g,'').slice(0,200)}:{})});

// =====================================================================
// Le moteur de l'hôte : alliés 0 à 3 contre l'adversaire (identifiant 4) — une créature sauvage ou toute l'équipe d'un dresseur.
// Synchrone, avec B et G remplacés pendant le calcul.
// =====================================================================
function cbEngine(foes,o={}){const R=()=>Math.random(),FT=(Array.isArray(foes)?foes:[foes]).slice(0,6),tr=o.tr||null,S0=FT.map(m=>({...m._S})),A=[];
 const F={T:FT,i:Math.max(0,Math.min(FT.length-1,o.fi|0)),m:null,stg:{atk:0,def:0,spd:0,...(o.stg||{})},prot:-9,protL:-9,N:1,dead:new Set(),items:tr?Math.max(0,o.items|0):0,
  evOn:!!o.fev,ev:Math.max(0,Math.min(100,o.fevV|0)),evU:o.fevU?1:0,lvl:tr?(tr.boss?2:1):0};F.m=FT[F.i];FT.forEach((m,i)=>{if(m.hp<=0)F.dead.add(i)});
 const LB={coop:1,me:null,foe:F.m,foes:FT,tr:tr?{name:tr.name,look:tr.look}:null,o:{},stg:[{atk:0,def:0,spd:0},F.stg],sky:o.sky?{...o.sky}:null,field:o.field||null,turn:o.turn|0,prot:[-9,-9],protL:[-9,-9],seedM:new Map(),rootM:new Set(),bqE:new Set(),bqF:new Set(),bqP:new Set(),
  bend:new Set(),awk:new Set(),awkC:new Map(),koS:new Set(),evOn:[0,0],ev:[0,0],evUsed:[0,0],evF:[0,0],part:new Set(),fx:[],n:0,ph:'act',w:null,why:'',by:-1,items:0,lvl:F.lvl,Nmax:1};
 let E=null;
 const mon=s=>s===CBF?F.m:A[s]?A[s].T[A[s].a]:null,stgOf=s=>s===CBF?F.stg:A[s].stg,gOf=s=>s===CBF?F:A[s],live=()=>A.filter(a=>a&&!a.out),alv=()=>FT.filter(m=>m.hp>0).length;
 const slotOf=m=>{if(FT.includes(m))return CBF;for(const a of A)if(a&&a.T.includes(m))return a.s;return null};
 const bind=s=>{LB.me=mon(s);LB.stg[0]=A[s].stg;LB.stg[1]=F.stg;LB.protL[1]=F.protL};
 const SPD=s=>{if(s===CBF)return spdOf(F.m,1);bind(s);return spdOf(mon(s),0)};
 const Q=s=>'\x01'+s,say_=t=>E.push({k:'say',t}),hpE=(s,fx)=>E.push({k:'hp',s,hp:mon(s).hp,fx});
 const run=fn=>{const B0=B,G0=G,bp0=bqPop;E=[];B=LB;LB.foe=F.m;G={...G0,party:A.flatMap(a=>a?a.T:[])};
  bqPop=(m,n)=>{const s=slotOf(m);if(s==null)return;const id=s+':'+n;if(LB.bqP.has(id))return;LB.bqP.add(id);E.push({k:'pop',s,t:n})};
  try{fn()}finally{B=B0;G=G0;bqPop=bp0}const out=E;E=null;return out};
 function evGain_(s,n){if(s===CBF){if(!F.evOn||F.evU||F.ev>=100)return;F.ev=Math.min(100,F.ev+n);if(F.ev>=100)E.push({k:'evf',s:CBF});return}
  const a=A[s];if(!a||!a.evOn||a.evU||a.ev>=100)return;const b=bondLv(mon(s));a.ev=Math.min(100,a.ev+Math.round(n*(b>=5?1.5:b>=3?1.25:1)*(a.b2?1.25:1)));if(a.ev>=100)E.push({k:'evf',s})}
 const evE=s=>{if(s===CBF){if(F.evOn)E.push({k:'ev',s:CBF,v:F.ev,u:F.evU});return}if(A[s])E.push({k:'ev',s,v:A[s].ev,u:A[s].evU?1:0})};
 function stat_(sd,k,dl){const g=stgOf(sd),cur=g[k],nv=Math.max(-6,Math.min(6,cur+dl)),ok=nv!==cur;if(ok)g[k]=nv;E.push({k:'stg',s:sd,stat:k,up:dl>0?1:0,v:nv,ok:ok?1:0});
  say_(ok?`${STAT[k]} de ${Q(sd)} ${dl>0?'augmente':'baisse'}${Math.abs(dl)>1?' beaucoup':''} !`:`${STAT[k]} de ${Q(sd)} ne peut plus ${dl>0?'monter':'baisser'} !`)}
 function sky_(k){if(LB.sky?.k===k){LB.sky.n=5;say_('Le ciel est déjà ainsi…');return}LB.sky={k,n:5};E.push({k:'sky',sky:{k,n:5}});say_(SKY[k][2])}
 function inflict_(s,k,quiet){const m=mon(s);if(!m||m.hp<=0)return false;if(m.st||immune(m,k)){if(!quiet)say_(m.st?`${Q(s)} est déjà ${STN[m.st][2]}.`:`Ça n'affecte pas ${Q(s)}…`);return false}
  m.st=k;if(k==='slp')m.slp=rnd(2,4);E.push({k:'st',s,st:k});say_(`${Q(s)} est ${STN[k][2]} !`);
  if(hold(m,'baieprisme')){m.item=null;m.st=null;m.slp=0;E.push({k:'st',s,st:null,heal:1});say_(`${Q(s)} mange sa Baie Prisme : il n'est plus ${STN[k][2]} !`)}return true}
 function berry_(s){const m=mon(s),S=st(m);if(hold(m,'baiesoin')&&m.hp>0&&m.hp<=S.hp/2){m.item=null;m.hp=Math.min(S.hp,m.hp+Math.max(1,S.hp>>2));hpE(s,'heal');say_(`${Q(s)} mange sa Baie Sève et récupère des PV !`)}}
 function absorb_(s,d,v){const m=mon(d),t=tal(m),k=t==='absorbeau'&&v.t==='EAU'?'heal':t==='paratonnerre'&&v.t==='ELE'||t==='torche'&&v.t==='FEU'?'atk':null;if(!k||m.hp<=0)return false;E.push({k:'tal',s:d});
  if(k==='heal'){const mx=st(m).hp;if(m.hp<mx){m.hp=Math.min(mx,m.hp+(mx>>2));hpE(d,'heal');say_(`${Q(d)} absorbe l'eau et récupère des PV !`)}else say_(`${Q(d)} absorbe l'eau sans effort.`)}
  else{say_(`${Q(d)} absorbe l'attaque !`);stat_(d,'atk',1)}return true}
 function xfx_(e,s,d){const a=mon(s),dm=mon(d),g=gOf(s);
  if(e==='protect'){if(g.protL===LB.turn-1&&R()<.5){g.protL=-9;return say_('Mais cela échoue !')}g.prot=LB.turn;g.protL=LB.turn;E.push({k:'prot',s});return say_(`${Q(s)} se protège !`)}
  if(e==='seed'){if(SP[dm.sp].t==='PLA'||LB.seedM.has(dm))return say_(`Ça n'affecte pas ${Q(d)}…`);LB.seedM.set(dm,s);E.push({k:'burst',s:d,c:['#80ff9a','#3a9a4a']});return say_(`${Q(d)} est infecté par une graine !`)}
  if(e==='roots'){if(LB.rootM.has(a))return say_('Mais cela échoue !');LB.rootM.add(a);E.push({k:'burst',s,c:['#80ff9a','#a8e8ff']});return say_(`${Q(s)} s'ancre et puise de l'énergie !`)}
  if(e==='cure'){if(!a.st)return say_('Mais cela échoue !');a.st=null;a.slp=0;E.push({k:'st',s,st:null,heal:1});return say_(`${Q(s)} est guéri !`)}}
 function use_(s,d,id){const a=mon(s),dm=mon(d);let v=MV[id];if(!v||!a||a.hp<=0||!dm||dm.hp<=0&&v.p)return;
  if(v.e==='cycle'&&isN()&&MV.lamecycle_n){const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);id='lamecycle_n';v=MV[id]}
  if(a.st==='slp'){if(--a.slp>0){E.push({k:'stfx',s,st:'slp'});say_(`${Q(s)} dort profondément…`);return}a.st=null;E.push({k:'st',s,st:null});say_(`${Q(s)} se réveille !`)}
  if(a.st==='par'&&R()<.25){E.push({k:'stfx',s,st:'par'});say_(`${Q(s)} est paralysé ! Il ne peut pas bouger !`);return}
  const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);say_(`${Q(s)} utilise ${v.n} !`);
  if(v.p&&gOf(d).prot===LB.turn){say_(`${Q(d)} se protège !`);return}
  if(!accOk(a,v,id)){if(v.p)E.push({k:'vfx',s,d,t:v.t});E.push({k:'miss',s:d});say_('Mais ça rate !');return}
  if(v.p&&absorb_(s,d,v))return;
  if(!v.p&&v.id!=='lutte')E.push({k:'vst',s,d,mv:id});
  if(v.p){E.push({k:'vfx',s,d,t:v.t});const r=dmg(a,dm,v,stgOf(s),stgOf(d));let n=r.n,sturdy=0,endure=0;
   if(tal(dm)==='fermete'&&dm.hp===st(dm).hp&&n>=dm.hp){n=dm.hp-1;sturdy=1}
   else if(n>=dm.hp&&dm.hp>1){if(hold(dm,'ruban')&&dm.hp===st(dm).hp){n=dm.hp-1;endure=1}else if(d!==CBF&&!LB.bend.has(dm)&&R()<[0,0,0,.1,.15,.2][bondLv(dm)]){n=dm.hp-1;endure=2;LB.bend.add(dm)}}
   dm.hp=Math.max(0,dm.hp-n);evGain_(s,12+(r.ef>1?8:0)+(r.cr?6:0));evGain_(d,Math.max(6,Math.round(30*n/st(dm).hp)));if(s!==CBF)A[s].dmg+=n;
   E.push({k:'hit',s:d,a:s,n,hp:dm.hp,ef:r.ef,cr:r.cr?1:0});evE(s);evE(d);
   if(sturdy){E.push({k:'tal',s:d});say_(`${Q(d)} tient bon grâce à sa Fermeté !`)}if(endure===1)say_(`${Q(d)} s'accroche grâce à son Ruban Ténacité !`);
   if(endure===2){E.push({k:'burst',s:d,c:['#ff7aa8','#ffffff']});say_(`${Q(d)} tient bon pour ne pas décevoir son dresseur !`)}
   if(v.t==='LUM'&&LB.sky?.k==='eclipse'){LB.sky=null;E.push({k:'sky',sky:null,lum:1,s:d});say_('La lumière déchire l\'éclipse ! Le terrain s\'éclaircit.')}
   if(v.e==='drain'&&a.hp>0){const h=Math.min(st(a).hp-a.hp,Math.max(1,n>>1));if(h>0){a.hp+=h;hpE(s,'heal');say_(`${Q(s)} absorbe de l'énergie !`)}}
   if(v.e==='recoil'&&a.hp>0){const h=Math.max(1,id==='lutte'?st(a).hp>>2:n>>2);a.hp=Math.max(0,a.hp-h);hpE(s);say_(`${Q(s)} subit le contrecoup !`)}
   if(hold(a,'grelot')&&a.hp>0&&a.hp<st(a).hp){a.hp=Math.min(st(a).hp,a.hp+Math.max(1,n>>3));hpE(s,'heal');say_(`${Q(s)} récupère des PV grâce à son Grelot Écho.`)}
   if(hold(a,'orbe')&&a.hp>0){a.hp=Math.max(0,a.hp-Math.max(1,Math.floor(st(a).hp/10)));hpE(s);say_(`${Q(s)} est blessé par son Orbe Furie !`)}
   if(dm.hp>0)berry_(d);if(a.hp>0)berry_(s);if(r.hits)say_('Touché 2 fois !');
   if(v.ch&&R()*100<v.ch*chMul(a)){if(STN[v.e]){if(dm.hp>0)inflict_(d,v.e,1)}else if(/^\w+-$/.test(v.e)){if(dm.hp>0)stat_(d,v.e.slice(0,3),-1)}else if(/^\w+\+\d?$/.test(v.e)){if(a.hp>0)stat_(s,v.e.slice(0,3),+(v.e.match(/\d$/)?.[0]||1))}else if(SKY[v.e]&&a.hp>0)sky_(v.e)}
   if(PHYS(v.t)&&a.hp>0&&hold(dm,'casque')){a.hp=Math.max(0,a.hp-Math.max(1,st(a).hp>>3));hpE(s);say_(`${Q(s)} se blesse sur le Casque Brut !`)}
   if(PHYS(v.t)&&a.hp>0&&!a.st&&(tal(dm)==='electrise'||tal(dm)==='corpsardent')&&R()<.3){const k=tal(dm)==='electrise'?'par':'brn';if(!immune(a,k)){E.push({k:'tal',s:d});inflict_(s,k,1)}}}
  else if(STN[v.e])inflict_(d,v.e);
  else if(SKY[v.e])sky_(v.e);
  else if(v.e?.startsWith('heal')){const mx=st(a).hp,sk=LB.sky?.k,nt=isN(),k=v.e==='heal'?.5:v.e==='heal_j'?(sk==='sun'||!nt&&sk!=='rain'?2/3:.25):(nt?.5:sk==='sun'?.25:1/3);
   if(a.hp>=mx)say_('Mais ses PV sont déjà au maximum !');else{a.hp=Math.min(mx,a.hp+Math.max(1,Math.floor(mx*k)));hpE(s,'heal');say_(`${Q(s)} récupère des PV !`)}}
  else if(XFX[v.e])xfx_(v.e,s,d);
  else{const m=/^(\w+)([+-])(\d?)$/.exec(v.e||'');if(m&&STAT[m[1]]){if(m[2]==='+')E.push({k:'hop',s});stat_(m[2]==='+'?s:d,m[1],(m[2]==='+'?1:-1)*(+m[3]||1))}}}
 function end_(){const L=[...live().map(a=>a.s),CBF];
  for(const s of L){const m=mon(s);if(!m||m.hp<=0||bqFx(m)!=='rain')continue;if(['rain','storm'].includes(LB.sky?.k)&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,Math.floor(st(m).hp/(bqRes(m)?8:10))));hpE(s,'heal');say_(`${Q(s)} se ressource grâce à sa breloque.`)}}
  for(const s of L){const m=mon(s);if(!m||m.hp<=0)continue;
   if(LB.seedM.has(m)){const by=LB.seedM.get(m),o=by===CBF?F.m:A[by]&&!A[by].out?mon(by):null,n=Math.max(1,Math.floor(st(m).hp/8));m.hp=Math.max(0,m.hp-n);hpE(s);if(o&&o!==m&&o.hp>0&&o.hp<st(o).hp){o.hp=Math.min(st(o).hp,o.hp+n);hpE(by,'heal')}say_(`La graine draine l'énergie de ${Q(s)} !`)}
   if(m.hp>0&&LB.rootM.has(m)&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));hpE(s,'heal');say_(`${Q(s)} puise de l'énergie par ses racines.`)}
   if(m.hp>0&&tal(m)==='turbo'&&stgOf(s).spd<6){E.push({k:'tal',s});stat_(s,'spd',1)}
   if(m.hp>0&&m.st&&tal(m)==='medecin'&&R()<.35){const k=m.st;m.st=null;m.slp=0;E.push({k:'tal',s});E.push({k:'st',s,st:null,heal:1});say_(`${Q(s)} se soigne : il n'est plus ${STN[k][2]} !`)}}
  for(const s of L){const m=mon(s);if(!m||m.hp<=0)continue;
   if(m.st==='brn'||m.st==='psn'){const n=Math.max(1,Math.floor(st(m).hp/(m.st==='brn'?16:8)));E.push({k:'stfx',s,st:m.st});m.hp=Math.max(0,m.hp-n);hpE(s);say_(`${Q(s)} souffre ${m.st==='brn'?'de sa brûlure':'du poison'} !`)}
   if(tal(m)==='seve'&&!isN()&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));E.push({k:'tal',s});hpE(s,'heal');say_(`${Q(s)} se régénère grâce à sa Sève Vive.`)}
   if(hold(m,'miettes')&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));hpE(s,'heal');say_(`${Q(s)} grignote ses Miettes Dorées.`)}
   if(m.hp>0)berry_(s);
   if(s!==CBF&&m.st&&m.hp>0&&bondLv(m)>=4&&R()<.2){const k=m.st;m.st=null;m.slp=0;E.push({k:'burst',s,c:['#ff7aa8','#ffffff']});E.push({k:'st',s,st:null});say_(`${Q(s)} se secoue pour rassurer son dresseur : il n'est plus ${STN[k][2]} !`)}
   if(m.hp>0)evGain_(s,6)}
  for(const a of live())evE(a.s);evE(CBF);
  if(LB.field==='crep'){const k=LB.sky?.k==='sun'?'eclipse':'sun';LB.sky={k,n:99};E.push({k:'sky',sky:{k,n:99}});say_(k==='sun'?'Le Crépuscule bascule : le soleil revient sur l\'arène !':'Le Crépuscule bascule : l\'ombre recouvre l\'arène !')}
  else if(LB.sky&&LB.sky.n<99&&--LB.sky.n<=0){const k=LB.sky.k;LB.sky=null;E.push({k:'sky',sky:null});say_(SKY[k][3])}else if(LB.sky)E.push({k:'skyn',n:LB.sky.n})}
 function entry_(s){const m=mon(s);if(!m||m.hp<=0)return;LB.bqE.delete(m);const t=tal(m);
  if(t==='levejour'||t==='eclipsetot'){E.push({k:'tal',s});sky_(t==='levejour'?'sun':'eclipse')}
  else if(t==='intimidation'){if(s===CBF){const L=live().filter(a=>mon(a.s).hp>0);if(L.length){E.push({k:'tal',s});for(const a of L)stat_(a.s,'atk',-1)}}else if(F.m.hp>0){E.push({k:'tal',s});stat_(CBF,'atk',-1)}}
  else if(t==='crachin'||t==='orageux'||t==='astral'){E.push({k:'tal',s});sky_(t==='crachin'?'rain':t==='orageux'?'storm':'stars')}
  else if(t==='aurore'){E.push({k:'tal',s});sky_('sun');stat_(s,'spd',1)}}
 const canEv_=s=>{const a=A[s],m=mon(s);return!!a.evOn&&a.ev>=100&&!a.evU&&m.hp>0&&!LB.awk.has(m)};
 function awaken_(s){const a=A[s],m=mon(s),lu=lunar(),S=st(m),ks=lu?['atk','def']:['atk','spd'];a.evU=1;a.ev=0;LB.awk.add(m);LB.awkC.set(m,lu?'#b89aff':'#ffd23a');E.push({k:'awk',s,lu:lu?1:0});
  for(const k of ks)a.stg[k]=Math.min(6,a.stg[k]+1);E.push({k:'stv',s,v:{...a.stg},ks});
  say_(`${lu?'Éveil Lunaire':'Éveil Solaire'} ! ${lu?'L\'Attaque et la Défense':'L\'Attaque et la Vitesse'} de ${Q(s)} augmentent !`);
  if(lu){if(m.st){m.st=null;m.slp=0;E.push({k:'st',s,st:null,heal:1});say_(`La lune purifie ${Q(s)} !`)}}else if(m.hp<S.hp){m.hp=Math.min(S.hp,m.hp+Math.max(1,Math.floor(S.hp/5)));hpE(s,'heal');say_(`La lumière soigne ${Q(s)} !`)}evE(s)}
 // L'adversaire : Éveil (dresseurs qui ont le bracelet, légendaires), Super Potion des dresseurs, créature suivante
 const canEvF_=()=>F.evOn&&F.ev>=100&&!F.evU&&F.m.hp>0&&!LB.awk.has(F.m);
 function awakenF_(){const m=F.m,lu=lunar(),S=st(m),ks=lu?['atk','def']:['atk','spd'];F.evU=1;F.ev=0;LB.awk.add(m);LB.awkC.set(m,lu?'#b89aff':'#ffd23a');
  say_(tr?`${tr.name} active son bracelet ! ${Q(CBF)} s'éveille !`:`${Q(CBF)} libère la puissance du Cycle !`);E.push({k:'awk',s:CBF,lu:lu?1:0});
  for(const k of ks)F.stg[k]=Math.min(6,F.stg[k]+1);E.push({k:'stv',s:CBF,v:{...F.stg},ks});
  say_(`${lu?'Éveil Lunaire':'Éveil Solaire'} ! ${lu?'L\'Attaque et la Défense':'L\'Attaque et la Vitesse'} de ${Q(CBF)} augmentent !`);
  if(lu){if(m.st){m.st=null;m.slp=0;E.push({k:'st',s:CBF,st:null,heal:1});say_(`La lune purifie ${Q(CBF)} !`)}}else if(m.hp<S.hp){m.hp=Math.min(S.hp,m.hp+Math.max(1,Math.floor(S.hp/5)));hpE(CBF,'heal');say_(`La lumière soigne ${Q(CBF)} !`)}evE(CBF)}
 function fitem_(){const m=F.m,S=st(m);F.items--;say_(`${tr.name} utilise une Super Potion !`);m.hp=Math.min(S.hp,m.hp+Math.max(60,S.hp>>1));m.st=null;m.slp=0;E.push({k:'fitem',hp:m.hp});say_(`${Q(CBF)} récupère des PV !`)}
 function scale_(i){const m=FT[i],K=CBK[F.N],b=S0[i],r=m.hp/Math.max(1,m._S.hp);m._S={hp:Math.max(1,Math.round(b.hp*K.hp)),atk:Math.max(1,Math.round(b.atk*K.atk)),def:Math.max(1,Math.round(b.def*K.def)),spd:Math.max(1,Math.round(b.spd*K.spd))};
  if(m.hp>0)m.hp=Math.max(1,Math.min(m._S.hp,Math.round(r*m._S.hp)))}
 function next_(){const L=FT.map((_,i)=>i).filter(i=>FT[i].hp>0);if(!L.length)return false;let i=L[0];
  if(F.lvl&&L.length>1){const ace=FT.length-1,C2=F.lvl>1&&FT[ace].hp>0?L.filter(j=>j!==ace):L,tg=pickT(new Set());if(tg!=null){bind(tg);const me=mon(tg);i=C2.reduce((a,b)=>foeScore(FT[b],me)>foeScore(FT[a],me)?b:a,C2[0])}else i=C2[0]}
  F.i=i;F.m=FT[i];LB.foe=F.m;F.stg={atk:0,def:0,spd:0};LB.stg[1]=F.stg;F.prot=F.protL=-9;E.push({k:'fsend',i,hp:F.m.hp,mx:F.m._S.hp});entry_(CBF);return true}
 function send_(s,i){const a=A[s];a.stg={atk:0,def:0,spd:0};a.a=i;a.part.add(i);a.need=0;LB.koS.delete(mon(s));E.push({k:'send',s,i,hp:mon(s).hp})}
 function switch_(s,i){const o=mon(s);LB.awk.delete(o);LB.awkC.delete(o);E.push({k:'out',s});send_(s,i);entry_(s)}
 function fin(w,why,by=-1){LB.w=w;LB.why=why;LB.by=by;LB.ph='end';E.push({k:'end',w,why,by})}
 function power_(){const N=Math.max(1,Math.min(CBMAX,live().length));if(N===F.N)return;const up=N>F.N;F.N=N;for(let i=0;i<FT.length;i++)scale_(i);LB.Nmax=Math.max(LB.Nmax,N);E.push({k:'pw',N,up:up?1:0,hp:F.m.hp,mx:F.m._S.hp})}
 function faint_(){if(F.m.hp<=0&&!F.dead.has(F.i)){F.dead.add(F.i);E.push({k:'ko',s:CBF});say_(`${Q(CBF)} est K.O. !`);LB.awk.delete(F.m);LB.awkC.delete(F.m);if(!alv()){fin('win','ko');return}}
  for(const a of live()){const m=mon(a.s);if(m.hp<=0&&!LB.koS.has(m)){LB.koS.add(m);E.push({k:'ko',s:a.s});say_(`${Q(a.s)} est K.O. !`);LB.awk.delete(m);LB.awkC.delete(m)}}}
 function settle_(){let ch=0;for(const a of live()){if(mon(a.s).hp>0)continue;if(a.T.some(m=>m.hp>0))a.need=1;else{a.out=2;a.need=0;E.push({k:'left',s:a.s,why:'ko'});ch=1}}
  if(!live().length)return fin('lose','ko');if(ch)power_();LB.ph=live().some(a=>a.need)?'rep':'act'}
 function leave_(s,why){const a=A[s];if(!a||a.out===1||LB.ph==='end')return;const was=a.out;a.out=1;a.need=0;const m=mon(s);LB.awk.delete(m);LB.awkC.delete(m);E.push({k:'left',s,why});
  if(was)return;if(!live().length)return fin(A.some(x=>x&&x.out===2)?'lose':'run','left');power_();if(LB.ph==='rep'&&!live().some(x=>x.need))LB.ph='act'}
 function join_(j){const s=[0,1,2,3].find(i=>!A[i]||A[i].out===1);if(s==null)return null;const i=Math.max(0,j.T.findIndex(alive));
  const a={s,pid:j.pid,nm:j.nm,lk:j.lk,T:j.T,a:i,stg:{atk:0,def:0,spd:0},prot:-9,protL:-9,ev:0,evU:0,evOn:!!j.br?.b,b2:!!j.br?.b2,out:0,need:0,part:new Set([i]),dmg:0};A[s]=a;
  E.push({k:'join',s,pid:a.pid,nm:a.nm,lk:a.lk,tm:a.T.map(cbSnap)});E.push({k:'send',s,i,hp:mon(s).hp});entry_(s);power_();return s}
 const okSw=(s,w)=>Number.isInteger(w)&&!!A[s].T[w]&&A[s].T[w].hp>0&&w!==A[s].a;
 const moveId=(s,c)=>{const m=mon(s);if(m.pp.every(p=>p<=0))return'lutte';let i=c|0;if(!(i>=0&&i<m.moves.length&&m.pp[i]>0))i=m.pp.findIndex(p=>p>0);return m.moves[i]};
 const autoC=s=>{const m=mon(s);let bi=-1,bv=-1;m.moves.forEach((id,i)=>{const v=MV[id];if(m.pp[i]<=0)return;const sc=(v.p||5)*eff(v.t,SP[F.m.sp].t)*(v.t===SP[m.sp].t?1.5:1);if(sc>bv){bv=sc;bi=i}});return{m:bi<0?0:bi}};
 const pickT=used=>{const L=live().filter(a=>mon(a.s).hp>0);if(!L.length)return null;const P=L.filter(a=>!used.has(a.s)),C2=P.length?P:L;return C2[R()*C2.length|0].s};
 const foeMv=d=>{bind(d);return ai(F.m,mon(d),F.lvl||(F.N>=2?1:0))};
 function item_(s,k,t){const a=A[s],m=a.T[t|0],K=IT[k]?.[4];if(!m||!CBITK.includes(K))return;const S=st(m);
  const no=K==='revive'?m.hp>0:K==='heal'?m.hp<=0||m.hp>=S.hp:K==='cure'?!m.st||m.hp<=0:m.pp.every((p,j)=>p>=MV[m.moves[j]].pp);
  if(!no){if(K==='heal'||K==='revive'){m.hp=K==='revive'?S.hp>>1:Math.min(S.hp,m.hp+IT[k][3]);LB.koS.delete(m)}else if(K==='cure'){m.st=null;m.slp=0}else m.pp=m.pp.map((p,j)=>Math.min(MV[m.moves[j]].pp,p+IT[k][3]))}
  E.push({k:'item',s,i:t|0,it:k,ok:no?0:1,hp:m.hp,st:m.st||0,pp:m.pp.slice()})}
 function ball_(s,k){const m=F.m,mx=st(m).hp,bk=ballMul(k),sb={slp:2,par:1.5,psn:1.5,brn:1.5}[m.st]||1,p=Math.min(1,(3*mx-2*m.hp)*SP[m.sp].cr*bk*sb/(3*mx)/255),q=Math.cbrt(p);let n=0;while(n<3&&R()<=q)n++;
  E.push({k:'ball',s,it:k,n,ok:n>=3?1:0});if(n>=3){fin('catch','catch',s);return true}return false}
 function turn_(cs){LB.turn++;const c={};for(const a of live()){const x=cs[a.s];c[a.s]=x&&typeof x==='object'?x:autoC(a.s)}
  for(const a of live())if(c[a.s].lv&&a.s!==0)leave_(a.s,'run');if(LB.ph==='end')return;
  if(!tr&&c[0]?.run&&A[0]&&!A[0].out){const ok=R()<.45+.4*SPD(0)/Math.max(1,SPD(CBF));E.push({k:'run',s:0,ok:ok?1:0});if(ok)return fin('run','run')}
  for(const a of live()){const x=c[a.s];if(x.it)item_(a.s,x.it,x.t)}
  if(!tr)for(const a of live().filter(a=>c[a.s].ball).sort((p,q)=>(c[p.s].at??1e15)-(c[q.s].at??1e15))){const x=c[a.s];if(IT[x.ball]?.[4]==='ball'&&ball_(a.s,x.ball))return}
  for(const a of live()){const x=c[a.s];if(x.w!=null){if(okSw(a.s,x.w))switch_(a.s,x.w);else c[a.s]=autoC(a.s)}}
  for(const a of live()){const x=c[a.s];if(x.w==null&&!x.it&&!x.ball&&!x.run&&x.e&&canEv_(a.s))awaken_(a.s)}
  let fIt=0;if(tr&&F.items>0&&F.m.hp>0&&F.m.hp<F.m._S.hp*.3&&(alv()===1||R()<.6)){fitem_();fIt=1}
  if(!fIt&&canEvF_()&&(alv()===1||F.m.hp<F.m._S.hp*.7||R()<.35))awakenF_();
  const Lq=[];for(const a of live()){const x=c[a.s];if(x.w!=null||x.it||x.ball||x.run||mon(a.s).hp<=0)continue;Lq.push({s:a.s,id:moveId(a.s,x.m)})}
  const K=live().filter(a=>mon(a.s).hp>0).length-fIt,used=new Set();for(let j=0;j<K;j++){const d=pickT(used);if(d==null)break;used.add(d);Lq.push({s:CBF,d,id:foeMv(d)})}
  for(const x of Lq){x.pr=MV[x.id]?.pr|0;x.sp=SPD(x.s);x.q=hold(mon(x.s),'griffe')&&R()<.2?1:0;x.r=R()}
  Lq.sort((x,y)=>y.pr-x.pr||y.q-x.q||y.sp-x.sp||y.r-x.r);const hit=new Set();
  for(const x of Lq){if(LB.ph==='end')return;if(F.m.hp<=0)break;
   if(x.s===CBF){let d=x.d;if(!A[d]||A[d].out||mon(d).hp<=0){d=pickT(hit);if(d==null)continue;x.id=foeMv(d)}hit.add(d);if(x.q)say_(`${Q(CBF)} agit en premier grâce à sa Griffe Vive !`);use_(CBF,d,x.id)}
   else{const a=A[x.s];if(!a||a.out||mon(x.s).hp<=0)continue;if(x.q)say_(`${Q(x.s)} agit en premier grâce à sa Griffe Vive !`);use_(x.s,CBF,x.id)}
   faint_()}
  if(LB.ph==='end')return;if(F.m.hp>0){end_();faint_();if(LB.ph==='end')return}
  if(F.m.hp<=0&&!next_())return;settle_()}
 function rep_(cs){const nd=live().filter(a=>a.need);for(const a of nd){let i=cs[a.s]?.r;if(!okSw(a.s,i))i=a.T.findIndex((m,j)=>m.hp>0&&j!==a.a);if(i<0){a.need=0;continue}send_(a.s,i)}
  LB.ph='act';for(const a of nd)entry_(a.s)}
 return{LB,A,F,
  host:h=>{A[0]={s:0,pid:h.pid,nm:h.nm,lk:h.lk,T:h.T,a:h.a,stg:{atk:0,def:0,spd:0,...(h.stg||{})},prot:-9,protL:-9,ev:h.ev|0,evU:0,evOn:!!h.evOn,b2:!!h.b2,out:0,need:0,part:new Set([h.a]),dmg:0}},
  step:(o={})=>{const add=[];const ev=run(()=>{LB.n++;for(const s of o.gone||[])leave_(s,'gone');for(const s of o.lv||[])leave_(s,'run');
    for(const j of o.add||[]){if(LB.ph==='end')break;const s=join_(j);if(s!=null)add.push({pid:j.pid,s})}
    if(LB.ph==='end'||o.only)return;const cs=o.cs||{};if(LB.ph==='rep')rep_(cs);else turn_(cs)});return{ev,add}},
  info:()=>({F:{...snapMon(F.m,1),_S:{...S0[F.i]}},FT:FT.map((m,i)=>({...snapMon(m,1),_S:{...S0[i]}})),fi:F.i,tr:cbTrOut(tr?{...tr,field:LB.field}:null),o:o.o||{},bg:o.bg||'',
   A:A.map(a=>a?{s:a.s,pid:a.pid,nm:a.nm,lk:a.lk,tm:a.T.map(cbSnap)}:null)}),
  view:()=>({n:LB.n,ph:LB.ph,w:LB.w,why:LB.why,by:LB.by,turn:LB.turn,N:F.N,Nmax:LB.Nmax,sky:LB.sky?{...LB.sky}:null,
   F:{hp:F.m.hp,mx:F.m._S.hp,st:F.m.st||0,stg:{...F.stg},i:F.i,T:FT.map(m=>[m.hp,m._S.hp,m.st||0]),ev:F.ev,evU:F.evU},
   A:A.map(a=>a?{s:a.s,pid:a.pid,nm:a.nm,a:a.a,out:a.out,need:a.need,stg:{...a.stg},ev:a.ev,evU:a.evU?1:0,awk:LB.awk.has(mon(a.s))?1:0,T:a.T.map(m=>[m.hp,m.pp.slice(),m.st||0,m.item||0]),P:[...a.part]}:null)})}}

// =====================================================================
// Affichage (tous les écrans) : ma créature à la place habituelle, celles des amis plus petites autour, l'adversaire en face
// =====================================================================
const cbAct=(C,s)=>s===CBF?C.foe:C.D[s]?.T[C.D[s].a];
function cbPos(C,s){if(s===CBF)return FOE;if(s===C.me)return CBME;const i=C.oth.indexOf(s),p=CBP[i]||CBP[0];return[p[0],p[1]-ev(64*p[2])]}
const cbSpr=(C,s)=>s===CBF?B.fo:C.D[s].o;
const cbName=(C,s)=>{if(s===CBF)return nm(C.foe)+(C.tr?' ennemi':' sauvage');const D=C.D[s],m=D?.T[D.a];if(!m)return'?';return s===C.me?nm(m):`${nm(m)} de ${D.nm}`};
const cbTxt=(C,t)=>String(t).slice(0,400).replace(/\x01([0-4])/g,(_,c)=>cbName(C,+c)).replace(/[\x00-\x1f]/g,'');
const cbHp=(m,v)=>Math.max(0,Math.min(st(m).hp,Number.isFinite(v)?Math.floor(v):0));
// Les effets visuels du jeu visent « ma créature » : on la fait pointer, le temps d'un effet, sur la créature d'un ami
async function cbWith(C,s,fn){if(s==null||s===CBF||!C.D[s])return fn();const p=cbPos(C,s),m0=[ME[0],ME[1]],mo=B.mo;ME[0]=p[0];ME[1]=p[1];B.mo=C.D[s].o;try{return await fn()}finally{ME[0]=m0[0];ME[1]=m0[1];B.mo=mo}}
function cbSetD(C,a){const T=cbTeam(a.tm);if(!T)return null;const old=C.D[a.s];const D=C.D[a.s]={s:a.s,pid:a.pid,nm:netName(a.nm)||'Ami',lk:LOOKS.includes(a.lk)?a.lk:'hero',T,a:0,o:a.s===C.me?B.mo:{x:0,y:0,v:0,s:0,b:0},dh:0,out:0,ev:0,evU:0,stg:{atk:0,def:0,spd:0}};
 if(a.s!==C.me&&!C.oth.includes(a.s))C.oth.push(a.s);if(old&&old.pid!==D.pid&&a.s!==C.me)D.o={x:0,y:0,v:0,s:0,b:0};return D}
function cbSetup(C,info,v){C.D=[];const L=Array.isArray(info?.FT)&&info.FT.length?info.FT.slice(0,6):[info?.F];C.FT=L.map(cbMon);if(!C.FT.length||C.FT.some(m=>!m))throw new Error('créature illisible');
 C.fi=Math.max(0,Math.min(C.FT.length-1,info.fi|0));C.foe=C.FT[C.fi];C.fsnap=L[C.fi];C.tr=cbTrIn(info.tr);
 for(const a of info.A||[])if(a&&a.pid!==undefined){const D=cbSetD(C,a);if(!D)throw new Error('équipe illisible');D.o.v=1;D.o.s=1}
 if(!C.D[C.me])throw new Error('place introuvable');B.coop=C;B.foe=C.foe;B.foes=C.FT;B.fi=C.fi;B.awk=new Set();B.awkC=new Map();if(!C.host)B.tr=C.tr;B.showFoe=1;
 if(C.tr?.field)B.field=C.tr.field;if(C.tr?.ev)B.evOn[1]=1;cbView(C,v,1)}
function cbView(C,v,first){if(!v||typeof v!=='object'||!Array.isArray(v.A))return false;C.v=v;if(v.ph==='end'&&!C.end)C.end={w:['win','catch','run','lose'].includes(v.w)?v.w:'run',why:String(v.why||''),by:Number.isInteger(v.by)?v.by:-1};C.N=Math.max(1,Math.min(CBMAX,v.N|0));
 if(Array.isArray(v.F?.T)&&v.F.T.length===C.FT.length)C.FT.forEach((m,i)=>{const r=v.F.T[i];if(!Array.isArray(r))return;m._S={...m._S,hp:Math.max(1,r[1]|0)};m.hp=cbHp(m,r[0]);m.st=m.hp>0&&STN[r[2]]?r[2]:null});
 const fi=Number.isInteger(v.F?.i)&&C.FT[v.F.i]?v.F.i:C.fi;if(fi!==C.fi){C.fi=fi;C.foe=C.FT[fi];B.foe=C.foe;B.fi=fi}
 const F=C.foe;F._S={...F._S,hp:Math.max(1,v.F?.mx|0)};F.hp=cbHp(F,v.F?.hp);F.st=F.hp>0&&STN[v.F?.st]?v.F.st:null;
 for(const a of v.A){if(!a)continue;const D=C.D[a.s];if(!D)continue;if(Array.isArray(a.T)&&a.T.length===D.T.length)D.T.forEach((m,i)=>{const r=a.T[i];if(!Array.isArray(r))return;m.hp=cbHp(m,r[0]);if(Array.isArray(r[1]))m.pp=m.moves.map((id,j)=>Math.max(0,Math.min(MV[id].pp,r[1][j]|0)));m.st=m.hp>0&&STN[r[2]]?r[2]:null;if(!m.st)m.slp=0;m.item=IT[r[3]]?r[3]:null});
  if(D.T[a.a|0])D.a=a.a|0;D.out=a.out|0;D.stg={atk:a.stg?.atk|0,def:a.stg?.def|0,spd:a.stg?.spd|0};D.ev=Math.max(0,Math.min(100,a.ev|0));D.evU=a.evU?1:0;D.dh=cbAct(C,a.s).hp;
  const m=cbAct(C,a.s);if(a.awk)B.awk.add(m);else{B.awk.delete(m);B.awkC.delete(m)}if(a.s!==C.me&&first&&!D.out)D.o.v=1}
 const Dm=C.D[C.me];if(Dm){B.me=cbAct(C,C.me);B.dh[0]=B.me.hp;B.stg[0]={...Dm.stg};B.ev[0]=Dm.ev;B.evUsed[0]=Dm.evU}
 B.dh[1]=F.hp;B.stg[1]={atk:v.F?.stg?.atk|0,def:v.F?.stg?.def|0,spd:v.F?.stg?.spd|0};B.ev[1]=Math.max(0,Math.min(100,v.F?.ev|0));B.evUsed[1]=v.F?.evU?1:0;
 B.sky=v.sky&&SKY[v.sky.k]?{k:v.sky.k,n:Math.max(1,Math.min(99,v.sky.n|0))}:null;B.turn=v.turn|0;return true}
function cbDrawMon(m,cx,by,o,t,k){if(!m||!o.v||o.s<=.01)return;const N=128,img=monSpr(m.sp,1,N,m.sh),w=ev(N*o.s*k),bob=o.s>=1&&!o.b?(t/460|0)%2*2:0,x=ev(cx+o.x*k-w/2),y=ev(by+o.y*k-w+4-bob);
 const ac=B?.awkC?.get(m);if(ac&&!o.b){const g2=silh(img,ac);X.globalAlpha=.4+.25*Math.sin(t/170);for(const[dx,dy]of[[-2,0],[2,0],[0,-2],[0,2]])X.drawImage(g2,x+dx,y+dy,w,w);X.globalAlpha=1}
 X.drawImage(o.b?silh(img,'#ffffff'):img,x,y,w,w)}
function cbMini(C,s,x,y){const D=C.D[s],m=D&&D.T[D.a];if(!m)return;const w=76;rr(x+2,y+2,w,24,3,'rgba(12,8,28,.35)');rr(x,y,w,24,3,PAL.ink);rr(x+2,y+2,w-4,20,2,PAL.paper);
 txt(D.nm,x+5,y+11,PAL.acc,{mini:1});if(m.st&&m.hp>0)R(X,STN[m.st][1],x+w-9,y+5,4,4);const k=Math.max(0,(D.dh??m.hp)/st(m).hp);bar(x+5,y+13,w-10,k,hpCol(k),7)}
function drawCoop(t){const b=B,C=b.coop;let sx=0,sy=0;if(b.shake>0){sx=ev((Math.random()-.5)*b.shake);sy=ev((Math.random()-.5)*b.shake*.5);b.shake=Math.max(0,b.shake-.6)}R(X,'#000000',0,0,W,H);X.save();X.translate(sx,sy);if(b.zoom>1.002){X.translate(W/2,H/2);X.scale(b.zoom,b.zoom);X.translate(-W/2,-H/2);b.zoom=1+(b.zoom-1)*.86}
 X.drawImage(bgArt(b.bgk),0,0,W,H);if(['plaine','foret','mont','lac'].includes(b.bgk)&&!BGI[b.bgk+'N']){const ph=phase();if(ph===4||ph===3){X.globalCompositeOperation='multiply';X.fillStyle=ph===4?'#9a6e9a':'#7a84c8';X.fillRect(0,0,W,H);X.globalCompositeOperation='source-over';STARS.forEach(([x2,y2,i])=>{if(y2<100&&((t/300|0)+i)%9)R(X,'#e6e0f6',x2,y2,2,2)})}}
 if(b.sky){X.globalAlpha=.22;R(X,SKY[b.sky.k][1],0,0,W,H);X.globalAlpha=1;if(b.sky.k==='rain')for(let i=0;i<40;i++){const rx=((i*97+t*.6)%W),ry=((i*53+t*.9)%H);R(X,'#c8e4ff',ev(rx),ev(ry),2,8)}skyFx10(b)}
 const fx=ev(FOE[0]+b.pf.f),mx=ev(CBME[0]+b.pf.m),fp=platArt(b.bgk,46,9),mp=platArt(b.bgk,58,11),Dm=C.D[C.me];X.drawImage(fp,fx-fp.width,104,fp.width*2,fp.height*2);
 const L=[[b.foe,FOE,b.fo],...C.oth.map(s=>[cbAct(C,s),cbPos(C,s),C.D[s].o]),...(Dm?[[cbAct(C,C.me),CBME,Dm.o]]:[])];
 for(const[m2,P2,o2]of L)if(m2&&o2.v&&o2.s>=1){if(b.awkC.has(m2)&&Math.random()<.18)spawn({x:P2[0]+(Math.random()-.5)*64,y:P2[1]+34,vy:-1.1-Math.random()*1.2,l:30,c:Math.random()<.5?b.awkC.get(m2):'#ffffff',s:Math.random()<.5?2:4});
  if(m2.st&&Math.random()<.035){const c2=STN[m2.st][1];if(m2.st==='slp')spawn({k:'txt',ch:'z',x:P2[0]+24,y:P2[1]-14,vy:-.6,vx:.3,l:44,c:'#c9c2d6'});else spawn({x:P2[0]+(Math.random()-.5)*50,y:P2[1]+10+Math.random()*30,vy:-.6,l:22,c:c2,s:4})}}
 [...C.oth.keys()].reverse().forEach(i=>{const s=C.oth[i],D=C.D[s],p=CBP[i];if(!D||!p)return;const x=ev(p[0]+b.pf.m),k=p[2];X.drawImage(mp,ev(x-mp.width*k),ev(p[1]-22*k),ev(mp.width*2*k),ev(mp.height*2*k));cbDrawMon(cbAct(C,s),x,p[1],D.o,t,k)});
 X.drawImage(mp,mx-mp.width,206,mp.width*2,mp.height*2);
 if(b.trX!=null&&b.tr){X.drawImage(SHD2,fx-12+ev(b.trX),114,24,8);X.drawImage(trSpr(b.tr.look),fx-64+ev(b.trX),-6)}
 if((C.N||1)>1&&b.fo.v&&b.fo.s>=1&&b.foe.hp>0){const img=monSpr(b.foe.sp,0,128,b.foe.sh),g2=silh(img,'#ff5a4a'),w=128,x=fx+b.fo.x-w/2,y=FOE[1]+52+b.fo.y-w+4,u=2+C.N;X.globalAlpha=.25+.12*Math.sin(t/160);for(const[dx,dy]of[[-u,0],[u,0],[0,-u],[0,u]])X.drawImage(g2,ev(x)+dx,ev(y)+dy,w,w);X.globalAlpha=1}
 if(b.showFoe)drawMon(b.foe,0,fx,FOE[1]+52,b.fo,t);if(Dm)drawMon(cbAct(C,C.me),1,mx,CBME[1]+58,Dm.o,t);
 if(b.ball){X.save();X.translate(ev(b.ball.x),ev(b.ball.y));X.rotate(b.ball.r||0);const img=b.ball.ic?bigIco(b.ball.ic):BALL;X.drawImage(img,-16,-16,32,32);if(b.ball.done){X.globalAlpha=.35;X.drawImage(silh(img,PAL.ink),-16,-16,32,32);X.globalAlpha=1}X.restore()}
 drawFx(b);if(b.tint){X.globalAlpha=Math.max(0,b.tint.a);R(X,b.tint.c,0,0,W,H);X.globalAlpha=1;b.tint.a-=.02;if(b.tint.a<=0)b.tint=null}X.restore();
 if(b.showFoe&&b.hf>0){hud(ev(8-(1-b.hf)*260),10,236,52,b.foe,1,b.dh[1],t);if((C.N||1)>1){const s2='x'+C.N,w2=tw(s2)+20,x2=ev(250+(b.evOn[1]?30:0)-(1-b.hf)*260);rr(x2,14,w2,24,2,PAL.ink);rr(x2+2,16,w2-4,20,2,(t/400|0)%2?'#c8322e':'#e04a3a');txt(s2,x2+10,33,'#ffffff',{sh:PAL.ink})}}
 if(b.evOn[1]&&b.showFoe&&b.hf>=1)evOrb(262,32,1,t);
 C.oth.filter(s=>C.D[s]&&!C.D[s].out).forEach((s,i)=>cbMini(C,s,8+i*80,84));C.oth.forEach((s,i)=>{const D=C.D[s],p=CBP[i];if(!D||!p||!D.o.v||D.out||D.o.s<1)return;txt(D.nm,ev(p[0]+b.pf.m),p[1]+9,'#ffffff',{mini:1,al:'c',ol:PAL.ink})});
 if(b.sky){const[n,c]=SKY[b.sky.k],s2=b.sky.n>=99?n:`${n} ${b.sky.n}`;tag(8,112,s2,c)}
 if(b.field){const F2={volt:['TERRAIN VOLT','#c8a018'],maree:['MARÉE','#2f6fb0'],crep:['CRÉPUSCULE','#7050a0'],roc:['TERRAIN ROC','#8a6a40']}[b.field];if(F2)tag(8,b.sky?138:112,F2[0],F2[1])}
 if(b.tp){const k=now()-b.tp.t0;if(k>1300)b.tp=null;else{X.globalAlpha=k>1000?(1300-k)/300:1;const s2=(b.tp.pre||'TALENT : ')+b.tp.t.toUpperCase(),tw2=tw(s2)+20;tag(b.tp.s?8:W-tw2-8,b.tp.s?70:106,s2,PAL.acc);X.globalAlpha=1}}
 if(b.hm>0&&b.me)hud(ev(236+(1-b.hm)*260),132,240,78,b.me,0,b.dh[0],t);if(b.evOn[0]&&b.hm>=1)evOrb(206,160,0,t);
 if(b.evB){const k=now()-b.evB.t0;if(k>1800)b.evB=null;else{X.globalAlpha=Math.max(0,Math.min(1,k/150,(1800-k)/300));const y=ev(126-Math.max(0,200-k)/6);R(X,'rgba(12,8,28,.6)',0,y-34,W,44);txt(b.evB.k?'ÉVEIL LUNAIRE':'ÉVEIL SOLAIRE',W/2,y,b.evB.k?'#e0d4ff':PAL.gold,{s:3,al:'c',ol:PAL.ink,olw:2});X.globalAlpha=1}}}
{const dB16=drawBattle;drawBattle=function(t){if(B?.coop){drawCoop(t);if(ui.cutin)drawCutin();return}return dB16(t)}}

// Envoi animé d'une créature à une place donnée
async function cbSendAnim(C,s){const D=C.D[s],n=cbAct(C,s),P=cbPos(C,s),o=D.o,mine=s===C.me;if(!n)return;o.x=0;o.y=0;o.v=0;o.s=0;o.b=0;D.dh=n.hp;
 if(mine){B.me=n;B.hm=0;B.dh[0]=n.hp;show(`En avant, ${nm(n)} !`)}else show(`${D.nm} envoie ${nm(n)} !`);
 const bl=B.ball={x:-20,y:260,r:0};await throwArc(bl,-20,260,P[0],P[1]+30,340,90);B.ball=null;await popOut(o,P,n);if(mine){tween(B,'hm',1,300,1);C.part?.add(D.a)}await wait(350);ui.text=null}
async function cbFaint(C,s){const P=cbPos(C,s),o=cbSpr(C,s);if(s===CBF)return faintFx(o,P,1);if(s===C.me)return faintFx(o,P,0);
 const k=CBP[C.oth.indexOf(s)]?.[2]||.5;sfx('faint');o.b=1;await wait(90);o.b=0;await tween(o,'y',90,380);o.v=0;burstAt([P[0],P[1]+40*k],8,['#e6dcc6','#bdb2a0'],2,{g:-.02})}
async function cbAwkFx(T,lu){const col=lu?'#b89aff':PAL.goldL;sfx('roar');ui.flash=.6;ui.flashC=col;for(let i=0;i<3;i++){spawn({k:'ring',x:T[0],y:T[1],r0:70-i*16,r1:-60,l:24,c:col});await wait(110)}burstAt(T,20,[col,'#ffffff'],4,{k:'star'});await wait(400)}

// --- Relecture d'un événement
async function cbEv(C,e){if(!e||typeof e!=='object')return;const s=e.s===CBF?CBF:Number.isInteger(e.s)&&e.s>=0&&e.s<CBMAX?e.s:null;
 if(e.k==='join'){if(s==null||s===CBF)return;const D=cbSetD(C,e);if(!D)return;D.o.v=0;if(s!==C.me){sfx('ok');await say(`${D.nm} rejoint le combat !`,0,1)}return}
 if(e.k==='fsend'){const i=e.i|0,n=C.FT[i];if(!n)return;C.fi=i;C.foe=n;B.foe=n;B.fi=i;n._S={...n._S,hp:Math.max(1,e.mx|0)};n.hp=cbHp(n,e.hp);B.stg[1]={atk:0,def:0,spd:0};B.fo={x:0,y:0,v:0,s:0,b:0};B.dh[1]=n.hp;B.hf=0;dex(n.sp,1);
  await say(`${C.tr?.name||'L\'adversaire'} envoie ${nm(n)} !`,0,1);const bl=B.ball={x:W+20,y:40,r:0};await throwArc(bl,W+20,40,FOE[0],FOE[1]+10,320,30);B.ball=null;await popOut(B.fo,FOE,n);tween(B,'hf',1,300,1);return}
 if(e.k==='fitem'){const n=C.foe;n.hp=cbHp(n,e.hp);n.st=null;n.slp=0;sfx('lv');healFx(1);await tween(B.dh,1,n.hp,400);return}
 if(s!=null&&s!==CBF&&!C.D[s])return;const D=s!=null&&s!==CBF?C.D[s]:null,mine=s===C.me,m=s==null?null:cbAct(C,s),P=s==null?null:cbPos(C,s),o=s==null?null:cbSpr(C,s);
 const dhK=x=>x===CBF?[B.dh,1]:x===C.me?[B.dh,0]:[C.D[x],'dh'],side=x=>x===CBF?1:0;
 switch(e.k){
  case'say':return say(cbTxt(C,e.t),0,1);
  case'send':{const i=e.i|0,n=D.T[i];if(!n||s===CBF)return;if(D.a!==i||!o.v||o.s<1){D.a=i;n.hp=cbHp(n,e.hp);D.out=0;if(mine){B.stg[0]={atk:0,def:0,spd:0}}D.stg={atk:0,def:0,spd:0};await cbSendAnim(C,s)}
   if(mine){B.me=n;B.dh[0]=n.hp;C.part?.add(i)}return}
  case'out':{if(s===CBF)return;const n=m;B.awk.delete(n);B.awkC.delete(n);await say(mine?`Reviens, ${nm(n)} !`:`${D.nm} rappelle ${nm(n)} !`,0,1);if(mine)B.hm=0;o.b=1;await tween(o,'s',0,220);o.b=0;o.v=0;return}
  case'vfx':{if(!TY[e.t])return;const d=e.d===CBF?CBF:e.d|0;if(s===CBF){if(C.D[d])await cbWith(C,d,()=>vfx(e.t,1))}else await cbWith(C,s,()=>vfx(e.t,0));return}
  case'vst':{const v=MV[e.mv];if(!v)return;const d=e.d===CBF?CBF:e.d|0,al=s===CBF?d:s;await cbWith(C,C.D[al]?al:null,async()=>{burstAt(s===CBF?FOE:ME,8,['#ffffff',TY[v.t][1]],1.5,{g:-.05});await vfxSt(v,side(s))});return}
  case'hit':{const hp=cbHp(m,e.hp),ef=Number.isFinite(e.ef)?e.ef:1;sfx('hit');if(ef>1||e.cr)B.shake=e.cr?14:9;o.b=1;await wait(70);for(const dx of[8,-6,4,-2,0]){o.x=dx;o.b=dx>0?1:0;await wait(40)}
   m.hp=hp;popText(P,'-'+Math.max(0,e.n|0),ef>1?PAL.gold:ef<1?'#c9c2d6':'#ffffff');const[ob,kk]=dhK(s);await tween(ob,kk,hp,450);
   if(e.cr){B.zoom=1.07;popText([P[0]-40,P[1]-10],'CRITIQUE !',PAL.acc);await say('Coup critique !',0,1)}if(ef>1)await say('C\'est super efficace !',0,1);if(ef<1)await say('Ce n\'est pas très efficace…',0,1);return}
  case'hp':{const hp=cbHp(m,e.hp);m.hp=hp;if(e.fx==='heal'){await cbWith(C,s,()=>healFx(side(s)));sfx('lv')}const[ob,kk]=dhK(s);await tween(ob,kk,hp,e.fx==='heal'?400:300);return}
  case'st':m.st=STN[e.st]?e.st:null;if(!m.st)m.slp=0;await cbWith(C,s,()=>{if(m.st){statusFx(side(s),m.st);sfx('st')}else if(e.heal){healFx(side(s));sfx('lv')}});return;
  case'stfx':if(STN[e.st])await cbWith(C,s,()=>statusFx(side(s),e.st));return;
  case'stg':if(STAT[e.stat]){await cbWith(C,s,()=>statFx(side(s),!!e.up,e.stat));sfx(e.up?'lv':'back');await wait(300);if(e.ok){const v=Math.max(-6,Math.min(6,e.v|0));if(s===CBF)B.stg[1][e.stat]=v;else{D.stg[e.stat]=v;if(mine)B.stg[0][e.stat]=v}}}return;
  case'stv':{const g=s===CBF?B.stg[1]:D.stg;for(const k of['atk','def','spd'])g[k]=Math.max(-6,Math.min(6,e.v?.[k]|0));if(mine)B.stg[0]={...D.stg};for(const k of Array.isArray(e.ks)?e.ks:[])if(STAT[k])await cbWith(C,s,()=>statFx(side(s),1,k));sfx('lv');await wait(300);return}
  case'sky':if(e.sky&&SKY[e.sky.k]){B.sky={k:e.sky.k,n:Math.max(1,Math.min(99,e.sky.n|0))};ui.flash=.5;ui.flashC=SKY[e.sky.k][1];B.skyT=now();sfx(e.sky.k==='rain'?'splash':'shard')}
   else{B.sky=null;if(e.lum){ui.flash=.7;ui.flashC=PAL.goldL;burstAt(FOE,24,[PAL.gold,'#ffffff'],5,{k:'star'})}}return;
  case'skyn':if(B.sky)B.sky.n=Math.max(1,Math.min(99,e.n|0));return;
  case'tal':{const t=m&&TAL[tal(m)]?.[0];if(t){B.tp={s:side(s),t,t0:now()};await wait(450)}return}
  case'pop':if(typeof e.t==='string'){B.tp={s:side(s),t:e.t.slice(0,30),t0:now(),pre:'BRELOQUE : '};await wait(300)}return;
  case'miss':popText(P,'RATÉ','#c9c2d6');return;
  case'prot':spawn({k:'ring',x:P[0],y:P[1],r0:10,r1:52,l:22,c:'#a8e8ff'});return;
  case'burst':burstAt(P,12,Array.isArray(e.c)?e.c.slice(0,4).map(String):['#ffffff'],2.5,{k:'star'});return;
  case'hop':await tween(o,'y',-10,100);await tween(o,'y',0,120);return;
  case'ev':if(s===CBF){B.ev[1]=Math.max(0,Math.min(100,e.v|0));B.evUsed[1]=e.u?1:0;return}if(D){D.ev=Math.max(0,Math.min(100,e.v|0));D.evU=e.u?1:0;if(mine){B.ev[0]=D.ev;B.evUsed[0]=D.evU}}return;
  case'evf':if(s===CBF){B.evF[1]=now();sfx('shard');return}if(mine){B.evF[0]=now();sfx('shard')}return;
  case'awk':{const lu=!!e.lu;if(s===CBF){const n=C.foe;B.awk.add(n);B.awkC.set(n,lu?'#b89aff':'#ffd23a');B.evUsed[1]=1;B.ev[1]=0;B.zoom=1.1;B.evB={k:lu,t0:now()};await cbAwkFx(FOE,lu);return}
   await say(mine?`Le Bracelet du Cycle s'illumine ! ${nm(m)} s'éveille !`:`${D.nm} active son bracelet ! ${nm(m)} s'éveille !`,0,1);
   if(mine){ui.cutin={sp:m.sp,sh:m.sh,lu,s:0,t0:now()};sfx('shard');if(typeof cnNoise==='function')cnNoise(.6,.5,2000,200);await wait(G?.opt?.fast?600:1100);ui.cutin=null;B.evUsed[0]=1;B.ev[0]=0;B.evB={k:lu,t0:now()};B.zoom=1.1;msEvt('ev')}
   D.evU=1;D.ev=0;B.awk.add(m);B.awkC.set(m,lu?'#b89aff':'#ffd23a');await cbAwkFx(P,lu);return}
  case'ko':await cbFaint(C,s);if(m){B.awk.delete(m);B.awkC.delete(m)}if(mine){const r=C.real[D.a];if(r)bondUp(r,-1)}return;
  case'left':{if(s===CBF)return;D.out=e.why==='ko'?2:1;if(mine){if(e.why==='ko'){C.wiped=1;await say('Tu n\'as plus de créature en état de se battre… Tes amis continuent sans toi !')}return}
   if(o.v){o.b=1;await tween(o,'s',0,220);o.b=0;o.v=0}await say(e.why==='ko'?`${D.nm} n'a plus de créature en état de se battre !`:e.why==='gone'?`${D.nm} a perdu la connexion.`:`${D.nm} quitte le combat.`,0,1);return}
  case'pw':{const N=Math.max(1,Math.min(CBMAX,e.N|0)),F=C.foe,who2=C.tr?`L'équipe de ${C.tr.name}`:`${nm(F)} sauvage`;C.N=N;F._S={...F._S,hp:Math.max(1,e.mx|0)};F.hp=cbHp(F,e.hp);B.dh[1]=F.hp;
   if(e.up){sfx('roar');B.shake=10;ui.flash=.6;ui.flashC='#ff6a5a';for(let i=0;i<3;i++)spawn({k:'ring',x:FOE[0],y:FOE[1],r0:20+i*12,r1:70,l:22,c:i%2?'#ff5a4a':'#ffd0c0'});burstAt(FOE,18,['#ff5a4a','#ffd23a','#ffffff'],4,{k:'star'})}else sfx('back');
   await say(e.up?`${who2} devient plus puissant${C.tr?'e':''} ! Puissance x${N} !`:`${who2} s'affaiblit un peu… Puissance x${N}.`,0,1);return}
  case'item':{const it=IT[e.it]?e.it:null,n=D.T[e.i|0];if(!it||!n)return;const K=IT[it][4],b0=n.hp;await say(mine?`Tu utilises ${IT[it][0]} sur ${nm(n)} !`:`${D.nm} utilise ${IT[it][0]} sur ${nm(n)} !`,0,1);
   if(!e.ok)return say('Mais cela n\'a aucun effet…',0,1);n.hp=cbHp(n,e.hp);n.st=n.hp>0&&STN[e.st]?e.st:null;if(!n.st)n.slp=0;if(Array.isArray(e.pp))n.pp=n.moves.map((id,j)=>Math.max(0,Math.min(MV[id].pp,e.pp[j]|0)));sfx('lv');
   if(n===m){await cbWith(C,s,()=>healFx(0));const[ob,kk]=dhK(s);await tween(ob,kk,n.hp,400)}
   return say(K==='revive'?`${nm(n)} est ranimé !`:K==='heal'?`${nm(n)} récupère ${n.hp-b0} PV.`:K==='cure'?`${nm(n)} est guéri !`:`Les PP de ${nm(n)} sont restaurés.`,0,1)}
  case'ball':{const k=IT[e.it]?e.it:'capsule',n=Math.max(0,Math.min(3,e.n|0));await say(mine?`Tu lances une ${IT[k][0]} !`:`${D.nm} lance une ${IT[k][0]} !`,0,1);
   const bl=B.ball={x:P[0],y:P[1]+20,r:0,ic:k};sfx('ball');await throwArc(bl,P[0],P[1]+20,FOE[0],FOE[1],520,110);spawn({k:'ring',x:FOE[0],y:FOE[1],r0:4,r1:40,l:14,c:'#ffffff'});B.fo.b=1;await tween(B.fo,'s',0,260);B.fo.b=0;await tween(bl,'y',FOE[1]+42,240,1);bl.r=0;
   for(let i=0;i<3;i++){await wait(380);if(i>=n&&!e.ok){B.ball=null;sfx('hit');spawn({k:'ring',x:FOE[0],y:FOE[1]+30,r0:4,r1:50,l:16,c:'#ffffff'});burstAt(FOE,12,['#ffffff',PAL.acc],4);B.fo.b=1;await tween(B.fo,'s',1,200);B.fo.b=0;return say(['Oh non ! Il s\'est libéré !','Raah ! Presque !','Argh ! Ça y était presque !'][i],0,1)}
    sfx('sel');for(const r of[-.35,.35,-.2,.2,0]){bl.r=r;await wait(55)}}
   bl.done=1;sfx('lv');burstAt([FOE[0],FOE[1]+40],10,[PAL.gold,PAL.goldL],2.5,{k:'star',g:-.04});if(!mine)await say(`${D.nm} a attrapé ${nm(C.foe)} !`,0,1);return}
  case'run':if(e.ok){sfx('run');await say(mine?'Tu prends la fuite !':`${D.nm} prend la fuite ! ${nm(C.foe)} sauvage en profite pour filer.`,0,1)}else await say(mine?'Impossible de fuir !':`${D.nm} n'arrive pas à fuir !`,0,1);return;
  case'end':C.end={w:['win','catch','run','lose'].includes(e.w)?e.w:'run',why:String(e.why||''),by:Number.isInteger(e.by)?e.by:-1};return}}

// =====================================================================
// Choix du joueur
// =====================================================================
function cbTeamMenu(C,title){const D=C.D[C.me],L=D.T;ui.dim=title;return choose(L.map(nm),{bare:1,cols:2,rect:i=>[12+(i%2)*232,40+(i>>1)*92,224,86],draw:(i,[x,y,w,h],sel,pr)=>{const m=L[i],S=st(m),ko=m.hp<=0,yy=y-(sel?2:0),act=i===D.a;
  rr(x+4,yy+4,w,h,4,'rgba(8,6,20,.45)');rr(x,yy,w,h,4,PAL.ink);rr(x+2,yy+2,w-4,h-4,2,sel||pr?PAL.acc:ko?'#6a6280':PAL.frame);rr(x+6,yy+6,w-12,h-12,2,ko?'#e4dfe8':sel?'#fff8ee':PAL.paper);R(X,'#ffffff',x+8,yy+6,w-16,2);
  const ic=monSpr(m.sp,0,48,m.sh);X.drawImage(ko?silh(ic,'#9a92aa'):ic,x+14,yy+18,48,48);txt(nm(m),x+70,yy+28,ko?PAL.mute:PAL.ink);txt('NV'+m.lv,x+14,yy+80,PAL.ink2,{mini:1});
  const cw=chip(SP[m.sp].t,x+70,yy+34);stChip(m,x+74+cw,yy+34);if(act)txt('EN JEU',x+w-12,yy+46,PAL.acc,{mini:1,al:'r'});if(ko){rr(x+w-56,yy+34,44,16,2,PAL.ink);txt('K.O.',x+w-50,yy+46,'#ff8a8a',{mini:1})}
  hpBar(x+96,yy+56,w-110,m.hp/S.hp);txt(`${m.hp}/${S.hp}`,x+w-14,yy+78,PAL.ink2,{mini:1,al:'r'})}}).finally(()=>ui.dim=null)}
async function cbBag(C){const ks=Object.keys(G.bag).filter(k=>G.bag[k]>0&&IT[k]&&(IT[k][4]==='ball'&&!C.tr||CBITK.includes(IT[k][4]))).sort((a,b)=>CATO.indexOf(IT[a][4])-CATO.indexOf(IT[b][4]));if(!ks.length){await say('Tu n\'as rien d\'utile en combat dans ton sac.');return null}
 for(;;){const i=await choose(ks.map(k=>IT[k][0]),{x:W-276,y:8,w:268,vis:7,title:'Sac',icons:ks.map(k=>ICO[k]),info:i=>({icon:bigIco(ks[i]),s:IT[ks[i]][2]}),draw:(i,x,y,sel,pr)=>{const c=pr?'#ffffff':PAL.ink;txt(IT[ks[i]][0],x,y+19,c,{sh:pr?0:undefined});txt('x'+G.bag[ks[i]],x+204,y+19,c,{al:'r',sh:pr?0:undefined})}});
  if(i<0)return null;const k=ks[i],K=IT[k][4];if(!(G.bag[k]>0))continue;if(K==='ball'){G.bag[k]--;B.usedBag=1;return{ball:k}}
  const t=await cbTeamMenu(C,'Utiliser sur qui ?');if(t<0)continue;const m=C.D[C.me].T[t],S=st(m);
  if(K==='revive'?m.hp>0:K==='heal'?m.hp<=0||m.hp>=S.hp:K==='cure'?!m.st||m.hp<=0:m.pp.every((p,j)=>p>=MV[m.moves[j]].pp)){await say('Ça n\'aura aucun effet.');continue}
  G.bag[k]--;B.usedBag=1;const r=C.real[t];if(r)bondUp(r,1);return{it:k,t}}}
async function cbChoose(C,stop){for(;;){if(stop())return null;if(canEv(0)&&!f().tip_evr){f().tip_evr=1;await say('Le Bracelet du Cycle brille ! Ta jauge d\'Éveil est pleine : choisis ATTAQUE, puis ÉVEIL DU CYCLE avant ton attaque.')}
 show(`Que doit faire ${nm(B.me)} ?`,0,234);const c=await choose(['ATTAQUE','SAC','ÉQUIPE',C.host?'FUITE':'PARTIR'],{x:242,y:H-90,w:234,rh:33,cols:2,dis:i=>i===3&&C.host&&!!C.tr});ui.text=null;if(stop())return null;if(c<0)continue;
 if(c===0){if(B.me.pp.every(p=>p<=0)){await say(`${nm(B.me)} n'a plus de PP ! Il se débat…`,0,1);return{m:-1}}const i=await pickMove();if(stop())return null;if(i<0)continue;const e=B.arm?1:0;B.arm=0;return{m:i,e}}
 if(c===1){const r=await cbBag(C);if(r){if(stop()){if(r.it)G.bag[r.it]++;if(r.ball)G.bag[r.ball]++;return null}return r}continue}
 if(c===2){const i=await cbTeamMenu(C,'Envoyer qui ?');if(stop())return null;if(i<0)continue;const m=C.D[C.me].T[i];if(m.hp<=0){await say(`${nm(m)} est K.O. !`);continue}if(i===C.D[C.me].a){await say(`${nm(m)} est déjà au combat !`);continue}return{w:i}}
 if(c===3){const n=C.v.A.filter(a=>a&&!a.out).length;if(C.host){if(C.tr){await say('Impossible de fuir un combat contre un dresseur !');continue}if(n>1&&!await ask('Fuir ? Le combat s\'arrêtera pour tout le monde.'))continue;return{run:1}}if(await ask('Quitter le combat ? Tes amis continueront sans toi.'))return{lv:1}}}}
async function cbRep(C,stop){for(;;){if(stop())return null;const i=await cbTeamMenu(C,'Envoyer qui ?');if(stop())return null;if(i<0)continue;const m=C.D[C.me].T[i];if(m.hp<=0){await say(`${nm(m)} est K.O. !`);continue}if(i===C.D[C.me].a){await say(`${nm(m)} est déjà au combat !`);continue}return{r:i}}}

// =====================================================================
// Hôte : dès qu'un ami (ou un joueur de l'aventure) est connecté, le combat passe en mode groupe et les amis sont appelés
// =====================================================================
const PJB=new Map(),CBRES=new Map(),CBSKIP=new Set();   // inscriptions anticipées, résultats récents, combats à ne plus rejoindre tout seul
setInterval(()=>{const t=Date.now();for(const[k,v]of PJB)if(t-v.t>180000)PJB.delete(k);for(const[k,v]of CBRES)if(t-v.t>600000)CBRES.delete(k)},5000);
const cbOk=()=>NET.on&&NET.up()&&!!B&&!B.coop&&!B.pvp&&!B.o?.solo&&(matePeers().some(P=>P.dv===NETDV())||!!CBSC?.fol?.size);
{const bl16=battleLoop;battleLoop=async function(){if(cbOk())return cbHost();return bl16()}}
const cbRvState=id=>typeof scRv==='function'?scRv(id):null;   // 'wait' : combat de scène à venir chez moi ; 'none' : il n'aura pas lieu
NET.H['cb-jn']=(m,P)=>{if(typeof m.id!=='string'||!CBID.test(m.id))return;const mk=()=>{const T=cbTeam(m.tm);return T?{pid:P.pid,nm:P.name,lk:P.look,T,br:{b:m.br?.b?1:0,b2:m.br?.b2?1:0}}:null};
 if(P.dv!==NETDV()){NET.send('cb-no',{id:m.id,why:'bad'},P.pid,true);return}
 const C=CB;if(C&&m.id===C.id){const v=C.vE;if(!v||v.ph==='end'){NET.send('cb-no',{id:m.id,why:'over',w:v?.w||'run',by:v?.by??-1},P.pid,true);return}
  if(v.A.some(a=>a&&a.pid===P.pid&&!a.out)||C.pj.some(j=>j.pid===P.pid))return;if(v.A.filter(a=>a&&a.out!==1).length+C.pj.length>=CBMAX){NET.send('cb-no',{id:m.id,why:'full'},P.pid,true);return}
  const j=mk();if(!j){NET.send('cb-no',{id:m.id,why:'bad'},P.pid,true);return}C.pj.push(j);return}
 const R=CBRES.get(m.id);if(R){NET.send('cb-no',{id:m.id,why:'over',w:R.w,by:R.by},P.pid,true);return}
 const rv=cbRvState(m.id);if(rv==='wait'){const j=mk();if(!j){NET.send('cb-no',{id:m.id,why:'bad'},P.pid,true);return}const L=PJB.get(m.id)||{L:[],t:Date.now()};L.L=L.L.filter(x=>x.pid!==P.pid);L.L.push(j);PJB.set(m.id,L);return}
 NET.send('cb-no',{id:m.id,why:rv==='none'?'none':'over'},P.pid,true)};
NET.H['cb-jx']=(m,P)=>{const L=PJB.get(m.id);if(L)L.L=L.L.filter(x=>x.pid!==P.pid);const C=CB;if(!C||m.id!==C.id)return;C.pj=C.pj.filter(j=>j.pid!==P.pid);const a=C.vE?.A.find(x=>x&&x.pid===P.pid&&!x.out);if(a)C.pl.add(a.s);const e=C.exp?.get(P.pid);if(e)e.st='no'};
NET.H['cb-ch']=(m,P)=>{const C=CB;if(!C||m.id!==C.id||!Number.isInteger(m.n)||!C.vE||m.n<=C.vE.n)return;const a=C.vE.A.find(x=>x&&x.pid===P.pid&&!x.out);if(!a)return;const c=cbSan(m.c);if(c.lv){C.pl.add(a.s);return}c.at=Date.now();(C.ch[m.n]??={})[a.s]??=c};
NET.H['cb-lv']=(m,P)=>{const C=CB;if(!C||m.id!==C.id)return;const a=C.vE?.A.find(x=>x&&x.pid===P.pid&&x.out!==1);if(a)C.pl.add(a.s)};
NET.H['cb-ack']=(m,P)=>{const C=CB;if(!C||m.id!==C.id)return;const e=C.exp.get(P.pid);if(e&&!e.fol)e.st=m.ok?'yes':'no'};
function cbBroadcast(C,r,nv,add){for(const a of nv.A)if(a&&a.s!==0&&a.out!==1&&NET.peers.has(a.pid)&&!r.add.some(x=>x.s===a.s))NET.send('cb-st',{id:C.id,n:nv.n,ev:r.ev,vw:nv},a.pid,90);
 if(r.add.length){const info=C.E.info();for(const x of r.add)NET.send('cb-in',{id:C.id,sl:x.s,st:info,vw:nv},x.pid,90)}
 for(const j of add)if(!r.add.some(x=>x.pid===j.pid))NET.send('cb-no',{id:C.id,why:nv.ph==='end'?'over':'full',w:nv.w||'',by:nv.by??-1},j.pid,true)}
async function cbHost(){const sc=CBSC;CBSC=null;const id=sc?.id&&CBID.test(sc.id)?sc.id:(netId().replace(/[^a-z0-9]/g,'').slice(0,10)||rid6()),real=G.party.slice(),wild=B.foe,tr=B.tr;
 const E=cbEngine(B.foes.map(cbCopy),{tr:cbTrOut(tr),sky:B.sky,field:B.field,turn:B.turn,stg:B.stg[1],items:B.items|0,fev:!!B.evOn[1],fevV:B.ev[1],fevU:B.evUsed[1],fi:Math.max(0,B.foes.indexOf(B.foe)),o:cbOptOut(B.o),bg:B.bgk});
 E.host({pid:NET.pid,nm:NG().n||'Dresseur',lk:myLook(),T:real.map(cbCopy),a:Math.max(0,real.indexOf(B.me)),stg:B.stg[0],ev:B.ev[0],evOn:!!B.evOn[0],b2:!!G.keys.brv2});
 const C={id,host:1,me:0,E,real,wild,o:B.o,ch:{},pj:[],pg:new Set(),pl:new Set(),oth:[],N:1,part:new Set([Math.max(0,real.indexOf(B.me))]),exp:new Map(),fol:sc?.fol||new Set()};C.vE=E.view();
 const pre=PJB.get(id);if(pre){C.pj.push(...pre.L);PJB.delete(id)}
 try{cbSetup(C,E.info(),C.vE);CB=C;NET.hi(1);cbCall(C);await cbGather(C);await cbHostLoop(C)}catch(e){console.error(e);for(const a of C.vE?.A||[])if(a&&a.s!==0&&!a.out)NET.send('cb-x',{id},a.pid,true);C.end??={w:'run',why:'err',by:-1}}
 finally{CB=null;const w=C.end?.w||'run';CBRES.set(id,{w,by:C.end?.by??-1,t:Date.now()});for(const j of C.pj)NET.send('cb-no',{id,why:'over',w,by:C.end?.by??-1},j.pid,true);NET.hi(1)}return cbFinish(C)}
function cbCall(C){for(const P of matePeers()){if(P.dv!==NETDV()||C.pj.some(j=>j.pid===P.pid))continue;if(C.fol.has(P.pid)){C.exp.set(P.pid,{fol:1});continue}
 C.exp.set(P.pid,{st:'call',t:Date.now()});NET.send('cb-call',{id:C.id,...cbInfo()},P.pid,true)}}
// Avant le premier tour : on attend un instant les amis qui arrivent (et ceux qui suivent la même scène de l'histoire)
async function cbGather(C){const t0=Date.now(),pend=()=>{const L=[],dt=Date.now()-t0;for(const[pid,e]of C.exp){const P=NET.peers.get(pid);if(!P||C.pj.some(j=>j.pid===pid))continue;
   if(e.fol?!e.end&&dt<90000:e.st==='yes'?dt<12000:e.st==='call'&&dt<2500)L.push(P)}return L};
 let skip=0;while(!skip&&pend().length){const L=pend();show(`En attente de ${L.map(P=>P.name).join(', ')}… (B : commencer sans attendre)`,0);const k=await key(200);if(k==='b'){ui.text=null;if(await ask('Commencer sans les attendre ? Ils pourront te rejoindre en plein combat.'))skip=1}}ui.text=null;
 if(C.pj.length){const add=C.pj.splice(0,CBMAX),r=C.E.step({add,only:1}),nv=C.vE=C.E.view();cbBroadcast(C,r,nv,add);if(r.add.length)NET.hi(1);for(const e of r.ev)await cbEv(C,e);cbView(C,nv)}}
async function cbHostLoop(C){for(;;){const v=C.v;if(!v||v.ph==='end'||C.end)break;const n=v.n+1,meA=v.A[0],need=!!meA&&meA.out===0&&(v.ph==='act'||!!meA.need);
  let c=null;if(need){c=v.ph==='act'?await cbChoose(C,()=>false):await cbRep(C,()=>false);if(c)c.at=Date.now()}
  const lim=v.ph==='act'?45000:30000,t0=Date.now();let skip=0;
  const who=()=>(C.vE.A||[]).filter(a=>a&&a.s!==0&&!a.out&&(v.ph==='act'||a.need)&&!C.pg.has(a.s)&&!C.pl.has(a.s)&&!C.ch[n]?.[a.s]&&NET.peers.has(a.pid));
  while(who().length&&!skip&&Date.now()-t0<lim){const L=who();show(`En attente de ${L.map(a=>a.nm).join(', ')}… ${Math.ceil((lim-(Date.now()-t0))/1000)} s`,0);const k=await key(250);if(k==='b'){ui.text=null;if(await ask('Ne plus attendre ? Leurs créatures attaqueront toutes seules.'))skip=1}}ui.text=null;
  for(const a of C.vE.A)if(a&&a.s!==0&&!a.out&&!NET.peers.has(a.pid))C.pg.add(a.s);
  const cs={...(C.ch[n]||{})};if(c)cs[0]=c;for(const k of Object.keys(C.ch))if(+k<=n)delete C.ch[k];
  const gone=[...C.pg],lv=[...C.pl],add=C.pj.splice(0,CBMAX);C.pg.clear();C.pl.clear();
  const r=C.E.step({cs,gone,lv,add}),nv=C.vE=C.E.view();cbBroadcast(C,r,nv,add);
  if(r.add.length||gone.length||lv.length)NET.hi(1);if(nv.ph==='end')NET.trace('cb-fin',nv.w,nv.why,nv.n);
  for(const e of r.ev)await cbEv(C,e);cbView(C,nv)}}

// =====================================================================
// Ami qui rejoint : automatiquement (appel de l'hôte ou combat repéré), à la demande, ou au rendez-vous d'une scène
// =====================================================================
function cbFree(){return NET.on&&!!G&&mode==='world'&&!busy&&!move&&!ui.menus.length&&!ui.text&&!waiters.length&&!NET.inv&&!NET.act&&!CB&&!CBG&&!CBJ&&!SCX&&G.party.some(alive)}
NET.H['cb-call']=(m,P)=>{if(typeof m.id!=='string'||!CBID.test(m.id))return;const ok=isMate(P)&&P.dv===NETDV()&&SP[m.sp];
 if(ok&&!P.cb)P.cb={i:m.id,sp:m.sp,lv:Math.max(1,Math.min(100,m.lv|0)),n:Math.max(1,Math.min(CBMAX,m.n|0)),tr:typeof m.tr==='string'?netTr(m.tr):''};
 NET.send('cb-ack',{id:m.id,ok:ok&&cbFree()&&(NG().aj!=='ask'||isAdvMate(P))&&!CBSKIP.has(m.id)?1:0},P.pid,true)};
setInterval(()=>{if(!cbFree())return;for(const P of matePeers())if(P.cb&&P.dv===NETDV()&&!CBSKIP.has(P.cb.i)&&P.cb.n<CBMAX){CBSKIP.add(P.cb.i);run(()=>cbAuto(P));return}},200);
async function cbAuto(P){const c=P.cb;if(!c||!NET.peers.has(P.pid))return;const vs=c.tr?`contre ${c.tr}`:`un ${SP[c.sp].name} sauvage (Nv ${c.lv})`;
 if(NG().aj==='ask'&&!isAdvMate(P)){sfx('alert');show(`${P.name} affronte ${vs} ! Le rejoindre ?`,0);const r=await choose(['OUI','NON'],{w:110});ui.text=null;if(r!==0)return}else{sfx('alert');NET.note(isAdvMate(P)?`${P.name} affronte ${vs} : toute l'équipe le rejoint !`:`${P.name} affronte ${vs} : tu le rejoins !`)}
 await cbJoin(P,c.i)}
NET.H['cb-in']=(m,P)=>{const J=CBJ;if(J&&m.id===J.id&&P.pid===J.host&&!J.st&&m.st&&typeof m.st==='object'&&m.vw&&Number.isInteger(m.sl))J.st=m};
NET.H['cb-no']=(m,P)=>{const J=CBJ;if(J&&m.id===J.id&&P.pid===J.host){J.no=['full','bad','none'].includes(m.why)?m.why:'over';J.w=['win','catch','run','lose'].includes(m.w)?m.w:'';J.by=Number.isInteger(m.by)?m.by:-1}};
NET.H['cb-st']=(m,P)=>{const C=CBG;if(C&&m.id===C.id&&P.pid===C.hostPid&&Number.isInteger(m.n)&&m.n>(C.v?.n|0))C.res[m.n]??={ev:Array.isArray(m.ev)?m.ev.slice(0,800):[],v:m.vw}};
NET.H['cb-x']=(m,P)=>{const C=CBG;if(C&&m.id===C.id&&P.pid===C.hostPid)C.lost=1;const J=CBJ;if(J&&m.id===J.id&&P.pid===J.host)J.no='over'};
// Rejoindre un combat : renvoie {r} (résultat du combat joué) ou {no, w} (pas joué : complet, terminé, annulé…)
async function cbJoin(P,id,o={}){if(CB||CBG||CBJ)return{no:'busy'};if(id)CBSKIP.add(id);if(!id||!NET.peers.has(P.pid)){if(!o.quiet)await say(`${P.name} n'est plus en combat.`);return{no:'gone'}}
 const real=G.party.slice();if(!real.some(alive)){if(!o.quiet)await say('Tes créatures sont K.O. ! Soigne-les avant d\'aller aider.');return{no:'ko'}}
 const J=CBJ={id,host:P.pid,st:null,no:null,w:'',by:-1};NET.send('cb-jn',{id,tm:real.map(m=>cbSnap(cbCopy(m))),br:{b:G.keys.bracelet?1:0,b2:G.keys.brv2?1:0}},P.pid,90);
 const msg=o.msg||`Tu rejoins le combat de ${P.name}… (B : annuler)`;show(msg,0);const t0=Date.now();let why=null;
 for(;;){if(J.st||J.no)break;if(!NET.peers.has(P.pid)){why='gone';break}if(o.stop?.()){why='stop';break}if(Date.now()-t0>(o.max||90000)){why='late';break}const k=await key(150);
  if(k==='b'){ui.text=null;if(!o.ask||await ask(o.ask)){why='cancel';break}show(msg,0)}}ui.text=null;CBJ=null;
 if(!J.st){if(why!=='gone')NET.send('cb-jx',{id},P.pid,true);const res={no:J.no||why,w:J.w,by:J.by};if(o.quiet)return res;
  if(J.no)await say(J.no==='full'?`Le combat de ${P.name} est complet (4 joueurs).`:J.no==='bad'?'Ton équipe n\'a pas pu être envoyée.':`Le combat de ${P.name} est déjà terminé.`);
  else if(why==='gone')await say(`${P.name} a quitté ${netRoom()}.`);else if(why==='late')await say(`${P.name} ne répond pas.`);return res}
 return{r:await cbGuest(P,J.st,real)}}
async function cbGuest(P,M,real){const v0=M.vw;if(v0&&v0.ph==='end'){window.CBLAST={w:v0.w,by:v0.by,me:M.sl|0,Nmax:v0.Nmax|0,r:'run',left:0,late:1};NET.hi(1);await say(`Trop tard ! Le combat de ${P.name} vient de se terminer.`);return cbRes(v0.w)}
 const info=M.st||{},tr=cbTrIn(info.tr),o=cbOptIn(info.o),C={id:M.id,host:0,hostPid:P.pid,hostNm:P.name,me:M.sl|0,real,o,res:{},oth:[],N:1,part:new Set()};
 musPlay(o.legend?'final':tr?.vs?'boss':'battle');for(let i=0;i<2;i++){ui.flash=1;ui.flashC='#ffffff';await wait(160)}
 if(tr?.vs){ui.vs={tr,t0:now()};sfx('alert');await wait(1300)}ui.wst=o.legend||tr?.boss?'iris':tr?'bars':'spiral';await wipeTo(1,420);ui.vs=null;
 mode='battle';B={coop:null,foes:[],fi:0,foe:null,me:null,tr,o,bgk:PLC[info.bg]?info.bg:MAPS[G.map]?.bg||'plaine',field:tr?.field||null,stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],shake:0,tint:null,pf:{f:-320,m:320},sky:null,part:new Set(),items:0,lvl:tr?(tr.boss?2:1):0,
  ev:[0,0],evUsed:[0,0],evF:[0,0],evOn:[!!G.keys.bracelet,tr?.ev?1:0],awk:new Set(),awkC:new Map(),bend:new Set(),turn:0,arm:0,fo:{x:0,y:0,v:1,s:1,b:0},mo:{x:0,y:0,v:0,s:0,b:0},dh:[0,0],hf:1,hm:0,trX:null,showFoe:1,ball:null};
 let ok=1;try{cbSetup(C,info,M.vw)}catch(e){console.error(e);ok=0}
 if(ok){const Dm=C.D[C.me];Dm.o.v=0;C.part.add(Dm.a);CBG=C;NET.hi(1);await wipeTo(0,380);await Promise.all([tween(B.pf,'f',0,600,1),tween(B.pf,'m',0,600,1)]);dex(C.foe.sp,1);
  await say(`Tu rejoins ${P.name} contre ${C.tr?C.tr.name:nm(C.foe)+' sauvage'} !${C.N>1?` Puissance x${C.N} !`:''}`);await cbSendAnim(C,C.me);
  try{await cbGuestLoop(C)}catch(e){console.error(e);C.lost=1}finally{CBG=null}
  if(C.lost&&!C.left&&!C.end)await say(`La connexion avec ${P.name} est perdue. Le combat s'arrête.`)}
 else{NET.send('cb-lv',{id:C.id},P.pid,true);B=null;mode='world';await wipeTo(0,300);await say('Le combat n\'a pas pu être lu. Tu retournes à ton aventure.');NET.hi(1);return null}
 const r=await cbFinish(C);await endBattle(r);save();NET.hi(1);return r}
async function cbGuestLoop(C){const lost=()=>C.lost||!NET.on||!NET.peers.has(C.hostPid);
 while(C.v&&C.v.ph!=='end'&&!C.end&&!lost()){const v=C.v,n=v.n+1,me=v.A[C.me];if(!me||me.out===1)break;const need=me.out===0&&(v.ph==='act'||!!me.need);
  let c=null;const stop=()=>lost()||!!C.res[n];
  if(need){const kick=setInterval(()=>{if(stop()&&waiters.length)press('b')},120);try{c=v.ph==='act'?await cbChoose(C,stop):await cbRep(C,stop)}finally{clearInterval(kick)}}
  if(lost())break;
  if(c){if(C.res[n]){if(c.it)G.bag[c.it]=(G.bag[c.it]||0)+1;if(c.ball)G.bag[c.ball]=(G.bag[c.ball]||0)+1}else{NET.send('cb-ch',{id:C.id,n,c},C.hostPid,90);if(c.lv){C.left=1;break}}}
  const t0=Date.now();
  await cbWait('En attente des autres joueurs…',()=>!!C.res[n]||lost()||Date.now()-t0>180000,async()=>{if(!await ask(me.out===2?'Quitter le combat ?':'Quitter le combat ? Tes amis continueront sans toi.'))return false;NET.send('cb-lv',{id:C.id},C.hostPid,true);C.left=1;return true});
  if(C.left)break;const r=C.res[n];if(!r){NET.trace('cb-perdu',n,lost()?1:0);C.lost=1;break}delete C.res[n];
  for(const e of r.ev)await cbEv(C,e);cbView(C,r.v)}}
async function cbWait(msg,done,onB){show(msg,0);for(;;){if(done())break;const k=await key(150);if(done())break;if(k==='b'&&onB){ui.text=null;if(await onB())break;if(!done())show(msg,0)}}ui.text=null}

// =====================================================================
// Fin du combat (tous) : vraies créatures mises à jour, EXP de groupe, capture, puis la fin habituelle du jeu (endBattle)
// =====================================================================
async function cbFinish(C){const v=C.v||{},end=C.end||{w:'run',by:-1},me=C.me,Dm=C.D?.[me];
 if(Dm)Dm.T.forEach((d,i)=>{const r=C.real[i];if(!r)return;const mx=st(r).hp;r.hp=Math.max(0,Math.min(mx,d.hp|0));r.pp=r.moves.map((id,j)=>Math.max(0,Math.min(MV[id].pp,Number.isInteger(d.pp[j])?d.pp[j]:r.pp[j])));r.st=r.hp>0?d.st||null:null;r.slp=r.st==='slp'?Math.max(1,d.slp||1):0;r.item=d.item||null});
 const won=!C.left&&(end.w==='win'||end.w==='catch'),N=NG(),o=C.o||{};let r=C.left?'run':end.w==='catch'?(end.by===me?'catch':(o.legend||o.roam)?'run':'win'):end.w;if(!G.party.some(alive))r=won?'win':'lose';
 ui.text=null;B.ball=end.w==='catch'&&!C.left?B.ball:null;
 if(won&&Dm){const Nm=Math.max(1,Math.min(CBMAX,v.Nmax|0)),FT=C.FT||[C.foe],down=C.tr?FT:[C.foe],base=Math.max(1,Math.floor(down.reduce((s2,m)=>s2+SP[m.sp].xp*m.lv/5*(C.tr?1.5:1),0)*(C.tr?CBXPT:CBXP)[Nm])),Pi=new Set([...(v.A?.[me]?.P||[]),...C.part]);
  const P=[...Pi].map(i=>C.real[i]).filter(m=>m&&m.hp>0&&G.party.includes(m)),rest=G.party.filter(m=>m.hp>0&&!P.includes(m)),xk=(m,n)=>hold(m,'amulette')?Math.floor(n*1.5):n,act=C.real[Dm.a];
  if(act&&act.hp>0){B.me=act;B.dh[0]=act.hp;B.hm=1}else B.hm=0;
  if(Nm>1)await say(`Combat en groupe à ${Nm} : EXP x${fmtK((C.tr?CBXPT:CBXP)[Nm])} !`,0,1);for(const m of P)await gainXp(m,xk(m,base));
  if(rest.length){const h=Math.max(1,base>>1);await say(`Le reste de l'équipe gagne ${h} points d'EXP.`,0,1);for(const m of rest)await gainXp(m,xk(m,h),1)}
  if(end.w==='win'&&!C.tr)msEvt('ko',SP[C.foe.sp].t);if(Nm>1){N.cw=(N.cw|0)+1;if(Nm>=CBMAX)N.c4=1;if(C.tr)N.ct=(N.ct|0)+1}B.part=new Set(P)}else B.part=new Set();
 if(end.w==='catch'&&end.by===me&&!C.left){const k=C.foe.hp/Math.max(1,st(C.foe).hp);let m=C.host?C.wild:netMon(C.fsnap,1);
  if(m){m.hp=Math.max(1,Math.round(k*st14(m).hp));m.st=C.foe.st==='slp'?null:C.foe.st;m.slp=0;delete m._S;B.foe=m;const nw=G.dex[m.sp]!==2;dex(m.sp,2);msEvt('cap',m.sp);await say(`Bravo ! ${nm(m)} est attrapé !`);if(m.item)await say(`${nm(m)} tenait ${IT[m.item][0]} !`);if(nw)await say(`Les données de ${nm(m)} sont ajoutées au Pixédex.`);
   if(m.nat&&NAT[m.nat])await say(`${nm(m)} a l'air ${NAT[m.nat][0].toLowerCase()}. ${NAT[m.nat][3]}`);if(G.party.length<6)G.party.push(m);else{G.box.push(m);await say(`${nm(m)} est envoyé dans la Boîte du Centre de Soins.`)}}else r='win'}
 else if(C.host&&C.wild&&!C.tr){B.foe=C.wild}
 if(end.w==='catch'&&end.by!==me&&!C.left){const D=C.D?.[end.by],lg=(o.legend||o.roam)&&advCode()&&lgTake(C.foe.sp,D?.nm);await say(`${D?.nm||'Ton ami'} a attrapé ${nm(C.foe)} en premier ! ${lg?'Il est à lui : il a quitté ton monde.':o.legend||o.roam?'Il en existe peut-être un autre pour toi, quelque part…':'Il est à lui.'}`)}
 if(!C.host)B.tr=C.tr;B.o=C.o||{};window.CBLAST={w:end.w,by:end.by,me,Nmax:v.Nmax|0,r,left:C.left?1:0,tr:C.tr?.name||''};return r}

// --- Sauvegarde 16.0 (rien de nouveau à stocker hors des compteurs en ligne) : on montre les nouveautés
{const norm16=normalize;normalize=function(g){g=norm16(g);if(!g)return g;if(g.v<16){g.wn=1;g.v=16}return g}}
// --- Succès, nouveautés
ACH.push(['coop1','Ensemble, on est plus forts','Gagner un combat en groupe.',()=>(G.net?.cw|0)>=1,['etinc',5]],['coop4','Escouade au complet','Gagner un combat en groupe à quatre joueurs.',()=>!!G.net?.c4,['hypercapsule',3]],['coopT','Duo de dresseurs','Battre un dresseur en combat de groupe.',()=>(G.net?.ct|0)>=1,['superpotion',3]]);
{const q16=quests;quests=function(){const Q0=q16();if(G?.net?.cw)Q0.push(['Combats en groupe',1,`Victoires en groupe : ${G.net.cw|0}${G.net.ct?` (dont ${G.net.ct|0} contre des dresseurs)`:''}.${G.net.c4?' Escouade au complet !':''}`]);return Q0}}
NEWS.unshift([()=>ICO.team,'Combats en groupe','EN LIGNE : AJOUTER EN AMI, et dès que l\'un de vous combat (créature sauvage, dresseur, champion…), les autres le rejoignent automatiquement, où qu\'ils soient. Jusqu\'à 4 par combat : plus vous êtes nombreux, plus l\'adversaire est fort… et plus l\'EXP grimpe !']);
