// =====================================================================
// EXTENSION 17.1 — Un seul monde pour toute l'aventure
// - Légendaires uniques : le premier joueur de l'aventure qui en capture un le garde ; il disparaît aussitôt du monde des autres.
// - Créatures visibles partagées : sur une même carte, tous les joueurs de l'aventure voient les mêmes créatures, aux mêmes endroits
//   (et la même averse). Le premier arrivé sur la carte les fait vivre et les envoie aux autres ; qui touche une créature le premier l'affronte.
// =====================================================================

// --- Légendaires : espèce → drapeau qui la retire du monde (et ouvre la suite, comme une capture)
const LGF={solarion:'legS',nocturion:'legN',crepuscel:'legC',presagelle:'legP',heliote:'legH',seleniote:'legL',wendigrave:'wendC',masquaserp:'masqOk',eclipsar:'legE',aurorelle:'legA',errenard:'legR'};
const lgMine=()=>G?Object.keys(LGF).filter(sp=>G.dex?.[sp]===2&&!G.coop?.lg?.[sp]):[];
// Un ami de l'aventure a capturé ce légendaire : il quitte ton monde
function lgTake(sp,who){if(!G?.coop||!LGF[sp]||G.dex?.[sp]===2||G.coop.lg?.[sp])return false;(G.coop.lg??={})[sp]=netName(who)||'Ton ami';
 f()[LGF[sp]]=1;if(sp==='errenard'){delete f().roamHp;delete f().roamSt}if(G.dex[sp]!==2)dex(sp,1);if(G.map)save();return true}
function lgAnnounce(sp){if(!advCode()||!NET.on||!LGF[sp])return;for(const P of matePeers())if(isAdvMate(P))NET.send('lg',{sp},P.pid,true)}
NET.H.lg=(m,P)=>{if(!isAdvMate(P)||!G||!LGF[m.sp])return;if(lgTake(m.sp,P.name))NET.note(`${P.name} a capturé ${SP[m.sp].name} ! Il a quitté ton monde.`)};
// Capture seul (ou en hôte d'un combat de groupe)
{const bt171=battle;battle=async function(foes,o={}){const r=await bt171(foes,o);if(r==='catch'&&!o.tr&&(o.legend||o.roam)){const sp=(Array.isArray(foes)?foes[0]:foes)?.sp;if(LGF[sp])lgAnnounce(sp)}return r}}
// Capture en invité d'un combat de groupe
{const cf171=cbFinish;cbFinish=async function(C){const r=await cf171(C),e=C.end||{},o=C.o||{},sp=C.foe?.sp;if(e.w==='catch'&&e.by===C.me&&!C.left&&(o.legend||o.roam)&&LGF[sp])lgAnnounce(sp);return r}}
// Présence : les légendaires capturés voyagent avec le « hi », pour les amis qui n'étaient pas connectés
{const s171=NET.send;NET.send=function(k,o={},to,rel){if(k==='hi'&&G&&advCode()){const L=lgMine();if(L.length)o={...o,lgc:L}}return s171.call(this,k,o,to,rel)}}
{const h171=NET.H.hi;NET.H.hi=(m,P)=>{h171(m,P);if(!G||!isAdvMate(P)||!Array.isArray(m.lgc))return;for(const sp of m.lgc.slice(0,12))if(typeof sp==='string'&&LGF[sp]&&lgTake(sp,P.name))NET.note(`${P.name} a capturé ${SP[sp].name} ! Il a quitté ton monde.`)}}

// =====================================================================
// Créatures visibles partagées
// =====================================================================
const FA={map:'',own:true,src:'',got:0,t0:0,last:0,sent:'',ts:0,tk:null,by:{}};
const FAID=/^[a-z0-9]{5}$/,faId=()=>rid6().slice(0,5);
const faOn=()=>!!advCode()&&NET.on&&!!G&&!!G.map&&!NOGHOST.has(G.map)&&G.map!=='songe'&&!MAPS[G.map]?.dream&&!G.dream;
const faMates=k=>matePeers().filter(P=>isAdvMate(P)&&P.dv===NETDV()&&P.map===k);
const faList=()=>(MAPS[G.map]?.npcs||[]).filter(n=>n.fauna&&!n.gone);
const faLead=()=>FA.src?NET.peers.get(FA.src):null;
const FSP0=faunaSpawn;
{faunaSpawn=function(k){FA.map=k;FA.got=0;FA.t0=Date.now();FA.sent='';FA.by={};
 if(faOn()&&k===G.map&&faMates(k).length){for(const M of Object.values(MAPS))M.npcs=M.npcs.filter(n=>!n.fauna);FA.own=false;FA.src='';for(const P of faMates(k))NET.send('fa-q',{m:k},P.pid);return}
 FA.own=true;FA.src='';FSP0(k);for(const n of MAPS[k].npcs)if(n.fauna&&!n.fid)n.fid=faId();FA.ts=0}}
// Chez ceux qui suivent, les créatures ne bougent que sur ordre du meneur
{const ft171=faunaTick;faunaTick=function(dt){if(faOn()&&!FA.own&&FA.map===G.map)return;return ft171(dt)}}
function faState(){const L=faList().slice(0,8).map(n=>[n.fid||(n.fid=faId()),n.sp,n.lv,n.walk&&n.rx!=null?n.rx:n.x,n.walk&&n.ry!=null?n.ry:n.y,n.d&3,n.slp?1:0]);return{m:G.map,L,wx:G.wx?.k==='rain'?1:0}}
function faSend(force){if(!faOn()||!FA.own||FA.map!==G.map||!faMates(G.map).length)return;const s=faState(),j=JSON.stringify(s),t=Date.now();
 if(!force&&j===FA.sent&&t-FA.ts<1000)return;FA.sent=j;FA.ts=t;NET.send('fa-s',s)}
setInterval(()=>{try{faSend(0);faPromote()}catch(e){console.error(e)}},250);
NET.H['fa-q']=(m,P)=>{if(isAdvMate(P)&&faOn()&&FA.own&&m.m===G.map)faSend(1)};
NET.H['fa-s']=(m,P)=>{if(!isAdvMate(P)||P.dv!==NETDV()||!faOn()||m.m!==G.map||FA.map!==G.map||!Array.isArray(m.L))return;
 if(FA.own){if(!(P.pid<NET.pid))return;FA.own=false}
 else if(FA.src&&FA.src!==P.pid){const L=faLead();if(L&&L.map===G.map&&FA.src<P.pid)return}
 FA.src=P.pid;FA.got=1;FA.last=Date.now();faAdopt(m)};
function faAdopt(m){const M=MAPS[G.map],seen=new Set();
 for(const e of m.L.slice(0,8)){if(!Array.isArray(e))continue;const[id,sp,lv,x,y,d,slp]=e;if(typeof id!=='string'||!FAID.test(id)||!SP[sp]||!okXY(G.map,x,y))continue;seen.add(id);
  let n=M.npcs.find(o=>o.fauna&&o.fid===id);
  if(!n){n={x,y,x0:x,y0:y,d:d&3,t:'mon',sp,lv:Math.max(1,Math.min(100,lv|0)),fauna:1,wild:1,slp:!!slp,tt:1000,fn:faunaMeet,fid:id};M.npcs.push(n);continue}
  if(n.gone)continue;n.slp=!!slp;
  if(n.walk)continue;const dx=x-n.x,dy=y-n.y;
  if(!dx&&!dy){n.d=d&3;continue}
  if(Math.abs(dx)+Math.abs(dy)===1){const dd=dx>0?3:dx<0?2:dy>0?0:1;n.walk=1;n.rx=x;n.ry=y;npcStep(n,dd,300).then(()=>{n.walk=0;n.rx=n.ry=null;if(n.x!==x||n.y!==y){n.x=x;n.y=y}})}
  else{n.x=x;n.y=y;n.d=d&3}}
 for(const n of M.npcs.filter(o=>o.fauna&&!o.gone&&!seen.has(o.fid)))rmFauna(n);
 if(m.wx&&!G.wx&&RAINY.has(G.map))G.wx={k:'rain',n:80};else if(!m.wx&&G.wx?.k==='rain')G.wx=null}
// Le meneur est parti (autre carte, déconnexion) : on prend le relais avec les créatures déjà là
function faPromote(){if(!faOn()||FA.own||FA.map!==G.map)return;const L=faLead(),t=Date.now();
 if(L&&L.map===G.map&&NET.peers.has(L.pid)&&t-FA.last<6000)return;if(!FA.got&&t-FA.t0<3500)return;
 FA.own=true;FA.src='';for(const n of faList())if(!n.fid)n.fid=faId();if(!FA.got&&!faList().length)FSP0(G.map);for(const n of faList())if(!n.fid)n.fid=faId();faSend(1)}
// Qui touche une créature le premier l'affronte ; le meneur tranche
{const fm171=faunaMeet;faunaMeet=async function(n){if(n.gone)return;
 if(!faOn()||!n.fid||FA.map!==G.map)return fm171(n);
 if(FA.own){FA.by[n.fid]=NG().n||'Ton ami';const r=fm171(n);faSend(1);return r}
 const L=faLead();if(!L)return fm171(n);n.gone=1;const id=n.fid;FA.tk={id,ok:null,by:''};NET.send('fa-t',{m:G.map,id},L.pid,true);
 const t0=Date.now();while(FA.tk?.ok==null&&Date.now()-t0<6000)await wait(40);const R=FA.tk;FA.tk=null;
 if(R&&R.ok===0){rmFauna(n);sfx('back');await say(`Trop tard ! ${R.by||'Ton ami'} a trouvé ce ${SP[n.sp].name} avant toi.`);return}
 // Sans réponse alors que le meneur est toujours là : on ne risque pas un combat en double, la créature reste et on peut réessayer
 n.gone=0;if(R?.ok!==1&&NET.peers.has(L.pid)&&L.map===G.map)return;return fm171(n)}}
NET.H['fa-t']=(m,P)=>{if(!isAdvMate(P)||typeof m.id!=='string'||!FAID.test(m.id))return;
 if(!faOn()||!FA.own||m.m!==G.map){NET.send('fa-r',{id:m.id,ok:1},P.pid,true);return}
 const n=(MAPS[G.map].npcs||[]).find(o=>o.fauna&&o.fid===m.id);
 if(n&&!n.gone){n.gone=1;rmFauna(n);FA.by[m.id]=P.name;NET.send('fa-r',{id:m.id,ok:1},P.pid,true);faSend(1);return}
 NET.send('fa-r',{id:m.id,ok:0,by:FA.by[m.id]||''},P.pid,true)};
NET.H['fa-r']=(m,P)=>{const T=FA.tk;if(T&&T.id===m.id&&P.pid===FA.src){T.ok=m.ok?1:0;T.by=netName(m.by)||''}};

// Les succès d'un légendaire restent à celui qui l'a capturé
for(const e of ACH)if(LGF[e[0]]&&typeof e[3]==='function'){const c=e[3];e[3]=()=>c()&&!G.coop?.lg?.[e[0]]}
// --- Sauvegarde 17.1 : légendaires pris par les amis vérifiés ; on montre les nouveautés
{const norm171=normalize;normalize=function(g){g=norm171(g);if(!g)return g;if(g.coop){const lg=g.coop.lg;if(!lg||typeof lg!=='object')delete g.coop.lg;else for(const k of Object.keys(lg))if(!LGF[k]||typeof lg[k]!=='string')delete lg[k]}
 if(g.v<17.1){g.wn=1;g.v=17.1}return g}}
NEWS.unshift([()=>ICO.team,'Un seul monde','Aventure à plusieurs : vous voyez tous les mêmes créatures dans les herbes, aux mêmes endroits. Le premier qui en touche une l\'affronte (les autres le rejoignent). Et un légendaire n\'est qu\'à un seul joueur : le premier qui le capture le garde, il disparaît du monde des autres.']);
