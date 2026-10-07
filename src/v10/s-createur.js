// =====================================================================
// COMMANDES DU CRÉATEUR — menu caché, protégé par un mot de passe.
// Accès : MENU, choisir SAUVER trois fois de suite (en moins de 6 s), entrer le mot de passe.
// L'appareil s'en souvient ensuite : CRÉATEUR apparaît en haut du MENU.
// Pour changer le mot de passe : remplacer CREA_H par le résultat de creaHash('NOUVEAU') (console du navigateur).
// =====================================================================
const CREA_H='1ndsyy2r97q',CREA_K='pxe-crea',CREA_O='pxe-crea-opt';
function creaCy(s,seed){let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0;i<s.length;i++){const ch=s.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}
 h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)}
function creaHash(p){let h='pxe-crea:'+String(p).toUpperCase();for(let i=0;i<20000;i++)h=creaCy(h,i);return h}
const creaGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}},creaSet=(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}};
const creaOn=()=>creaGet(CREA_K)===CREA_H;
const CH=(()=>{try{return{god:0,ko:0,cap:0,wall:0,spd:1,rep:0,xp:0,...JSON.parse(creaGet(CREA_O)||'{}')}}catch(e){return{god:0,ko:0,cap:0,wall:0,spd:1,rep:0,xp:0}}})();
const chSave=()=>creaSet(CREA_O,JSON.stringify(CH)),chActive=()=>creaOn()&&!!G;

// --- Effets permanents (seulement sur l'appareil déverrouillé)
{const d0=dmg;dmg=function(a,d,...r){const o=d0(a,d,...r);if(!chActive())return o;if(CH.god&&G.party.includes(d))o.n=0;else if(CH.ko&&G.party.includes(a))o.n=99999;return o}}
{const b0=ballMul;ballMul=function(k){return chActive()&&CH.cap?99999:b0(k)}}
{const x0=gainXp;gainXp=function(m,n,q){return x0(m,chActive()&&CH.xp?n*10:n,q)}}
{const t0=tryMove;tryMove=function(d){if(!chActive()||!CH.wall)return t0(d);const s=[...SOLID];SOLID.clear();try{return t0(d)}finally{for(const c of s)SOLID.add(c)}}}
{const u0=updWorld;updWorld=function(dt){if(chActive()&&CH.spd>1&&move)move.t+=dt*(CH.spd-1)/(held.b?95:170);return u0(dt)}}
setInterval(()=>{if(chActive()&&CH.rep&&mode==='world')G.repel=Math.max(G.repel|0,999)},1000);

// --- Accès caché depuis le MENU
const CREA_T=[];
{const c0=choose;choose=async function(opts,o={}){const pause=Array.isArray(opts)&&opts.includes('SAUVER')&&opts.includes('TITRE')&&opts.includes('FERMER')&&!opts.includes('CRÉATEUR');
 if(!pause)return c0(opts,o);
 if(creaOn()){const i=await c0(['CRÉATEUR',...opts],{...o,icons:o.icons?[ICO.gear,...o.icons]:o.icons,rh:22,vis:Math.max(o.vis||10,11)});if(i===0){ui.panel=null;await creatorMenu();return opts.length}return i<0?i:i-1}
 while(CREA_T.length&&Date.now()-CREA_T[0]>30000)CREA_T.shift();
 const i=await c0(opts,CREA_T.length?{...o,i:opts.indexOf('SAUVER')}:o);if(opts[i]!=='SAUVER'){CREA_T.length=0;return i}const t=Date.now();CREA_T.push(t);
 if(CREA_T.length<3)return i;CREA_T.length=0;ui.panel=null;const p=await kbInput('MOT DE PASSE',12,[...NETAB],{cols:8,kw:44});
 if(p&&creaHash(p)===CREA_H){creaSet(CREA_K,CREA_H);sfx('ok');await say('Accès créateur activé sur cet appareil ! Ouvre le MENU : CRÉATEUR est tout en haut.')}else if(p)sfx('back');return opts.length}}

// --- Le menu
const onOff=v=>v?'OUI':'NON';
function creaSpot(k){const M=MAPS[k],h=M.rows.length,w=M.rows[0].length,cx=w>>1,cy=h>>1,N=npcs(M);let best=null,bd=1e9;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=M.rows[y][x];if(SOLID.has(c)||c==='E'||M.doors?.[x+','+y]||N.some(n=>n.x===x&&n.y===y))continue;const dd=Math.abs(x-cx)+Math.abs(y-cy);if(dd<bd){bd=dd;best=[x,y]}}return best}
async function creaPickSp(title){const L=DEX.filter(k=>SP[k]);const i=await choose(L.map(k=>SP[k].name),{x:W-232,y:8,w:224,vis:12,title});return i<0?null:L[i]}
async function creaPickLv(){const V=[5,15,30,50,75,100],i=await choose(V.map(v=>'Niveau '+v),{x:W-182,y:8,w:174,title:'Niveau'});return i<0?null:V[i]}
const creaLeg=sp=>typeof LGF!=='undefined'&&LGF[sp]&&typeof advCode==='function'&&advCode();
async function creatorMenu(){let last=0;for(;;){
 const O=[['SOIN TOTAL',()=>{healAll();sfx('heal');return'Équipe soignée !'}],
  [`INVINCIBLE : ${onOff(CH.god)}`,()=>{CH.god^=1}],
  [`K.O. EN UN COUP : ${onOff(CH.ko)}`,()=>{CH.ko^=1}],
  [`CAPTURE GARANTIE : ${onOff(CH.cap)}`,()=>{CH.cap^=1}],
  [`TRAVERSER LES MURS : ${onOff(CH.wall)}`,()=>{CH.wall^=1}],
  [`VITESSE : x${CH.spd}`,()=>{CH.spd=CH.spd>=4?1:CH.spd*2}],
  [`REPOUSSE INFINI : ${onOff(CH.rep)}`,()=>{CH.rep^=1;if(!CH.rep)G.repel=0}],
  [`EXP x10 : ${onOff(CH.xp)}`,()=>{CH.xp^=1}],
  ['ARGENT +100 000',()=>{G.money=Math.min(9999999,(G.money|0)+100000);jingle('item');return`Tu as maintenant ${G.money} ¥.`}],
  ['TOUS LES OBJETS x99',()=>{for(const k of Object.keys(IT))if(IT[k][4]!=='quest')G.bag[k]=99;jingle('item');return'Sac rempli : 99 de chaque objet.'}],
  ['ÉQUIPE NIVEAU 100',()=>{for(const m of G.party){m.lv=100;m.exp=xpFor(100)}healAll();sfx('ok');return'Toute l\'équipe est niveau 100 !'}],
  ['ÉQUIPE CHROMATIQUE',()=>{for(const m of G.party)m.sh=1;sfx('shard');return'Toute l\'équipe brille !'}],
  ['DONNER UNE CRÉATURE',async()=>{const sp=await creaPickSp('Quelle créature ?');if(!sp)return;const lv=await creaPickLv();if(!lv)return;const m=mon(sp,lv);dex(sp,creaLeg(sp)?1:2);
   if(G.party.length<6){G.party.push(m);jingle('item');return`${SP[sp].name} (Nv ${lv}) rejoint ton équipe !`}G.box.push(m);jingle('item');return`${SP[sp].name} (Nv ${lv}) est envoyé dans la Boîte.`}],
  ['COMBATTRE UNE CRÉATURE',async()=>{const sp=await creaPickSp('Affronter qui ?');if(!sp)return;const lv=await creaPickLv();if(!lv)return;if(!G.party.some(m=>m.hp>0))return'Il te faut une créature en forme.';
   ui.panel=null;await battle([mon(sp,lv,{wild:1})],{});return null}],
  ['PIXÉDEX COMPLET',()=>{for(const k of DEX)if(SP[k])G.dex[k]=Math.max(G.dex[k]|0,creaLeg(k)?1:2);G.keys.dex=1;sfx('ok');return'Pixédex complété !'}],
  ['TOUTES LES CLÉS',()=>{for(const k of['dex','carte','boussole','bracelet','brv2','camera','charme','couveuse','lantern','rod','rod2','rod3','sablier'])G.keys[k]=1;sfx('ok');return'Tous les objets clés débloqués (canne, bracelet, sablier…).'}],
  ['TÉLÉPORTATION',async()=>{const L=Object.keys(MAPS).filter(k=>MAPS[k].name&&!MAPS[k].dream&&k!=='songe'&&k!==G.map);const i=await choose(L.map(k=>MAPS[k].name),{x:W-232,y:8,w:224,vis:12,title:'Aller où ?'});if(i<0)return;
   const s=creaSpot(L[i]);if(!s)return'Impossible d\'aller là.';ui.panel=null;sfx('door');await fadeTo(1,220);loadMap(L[i],s[0],s[1],0);await fadeTo(0,220);if(NET.on)NET.hi(1);return'exit'}],
  [`PLUIE : ${onOff(G.wx?.k==='rain')}`,()=>{G.wx=G.wx?.k==='rain'?null:{k:'rain',n:600}}],
  ['VERROUILLER L\'ACCÈS',async()=>{if(!await ask('Retirer l\'accès créateur de cet appareil ? (il faudra retaper le mot de passe)'))return;creaSet(CREA_K,null);return'exit'}],
  ['FERMER',()=>'exit']];
 const i=await choose(O.map(o=>o[0]),{x:W-262,y:8,w:254,vis:11,title:'CRÉATEUR',i:last});if(i<0)return;last=i;
 const r=await O[i][1]();chSave();if(r==='exit')return;if(r)await say(r)}}
