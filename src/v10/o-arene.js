// =====================================================================
// EXTENSION 15.0 — Arène des amis : combats en ligne entre deux joueurs.
// L'hôte (celui qui a lancé le défi) calcule chaque tour avec les vraies formules du jeu (dégâts, talents, objets tenus,
// breloques, tempéraments, lien, Éveil, ciels), puis les deux écrans rejouent la même suite d'événements, chacun de son côté.
// Les deux équipes sont des copies soignées : après le combat, rien n'a changé dans la vraie équipe.
// =====================================================================
const st14=st;st=function(m){return m&&m._S?{...m._S}:st14(m)};   // stats figées d'une copie de combat (calculées chez son dresseur)
const PVPT=[20,100,220,300];   // horloge de l'arène : aube, jour, crépuscule, nuit (choisie par l'hôte)
const Q=s=>'\x01'+s;           // jeton « créature en jeu du côté s », remplacé par son nom sur chaque écran
// --- Copies de combat
function pvpCopy(m,l50){const c={sp:m.sp,lv:l50?50:m.lv,exp:0,moves:m.moves.slice(0,4),pp:[],hp:0,st:null,slp:0,aff:m.aff|0,nat:m.nat,sh:m.sh?1:0,item:m.item||null,eq:m.eq||null};
 c.exp=l50?xpFor(50):m.exp;c.pp=c.moves.map(id=>MV[id].pp);const S=st14(c);c._S={hp:S.hp,atk:S.atk,def:S.def,spd:S.spd};c.hp=S.hp;return c}
const pvpSnap=c=>({...snapMon(c,1),_S:c._S});
function pvpMon(o,l50){if(!o||typeof o!=='object')return null;const m=netMon(l50?{...o,lv:50,exp:xpFor(50)}:o,1);if(!m)return null;m.st=null;m.slp=0;m.pp=m.moves.map(id=>MV[id].pp);
 const b=st14(m),S={};for(const k of['hp','atk','def','spd']){const v=o._S?.[k];S[k]=Number.isFinite(v)&&v>=b[k]*.7&&v<=b[k]*1.7?Math.floor(v):b[k]}m._S=S;m.hp=S.hp;return m}
function pvpTeam(L,n,l50){if(!Array.isArray(L)||!L.length||L.length>n)return null;const T=L.map(o=>pvpMon(o,l50));return T.every(Boolean)?T:null}

// --- Le moteur de l'hôte : synchrone, il travaille sur un état de combat à part (B et G sont remplacés le temps du calcul)
function pvpEngine(T0,T1,ru,br){const T=[T0,T1],LB={pvp:1,T,ai:[0,0],me:T0[0],foe:T1[0],foes:T1,tr:{name:'?'},o:{},stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],sky:null,field:null,turn:0,prot:[-9,-9],protL:[-9,-9],
  seedM:new Set(),rootM:new Set(),bqE:new Set(),bqF:new Set(),bqP:new Set(),bend:new Set(),awk:new Set(),awkC:new Map(),evOn:[!!br[0]?.b,!!br[1]?.b],b2:[!!br[0]?.b2,!!br[1]?.b2],ev:[0,0],evUsed:[0,0],evF:[0,0],part:new Set(),fx:[],need:[0,0],ph:'act',n:0,w:null,why:'',ap:ru.ph|0};
 let E=null;const R=()=>Math.random(),say_=t=>E.push({k:'say',t}),hpE=(s,fx)=>E.push({k:'hp',s,hp:side(s).hp,fx}),evE=()=>E.push({k:'ev',v:[...LB.ev],u:[...LB.evUsed]});
 const run=fn=>{const B0=B,G0=G,bp0=bqPop;E=[];B=LB;G={...G0,party:[...T0,...T1],flags:{balance:1},t:PVPT[LB.ap]??100,wx:null};
  bqPop=(m,n)=>{const s=m===LB.me?0:1,id=s+n;if(LB.bqP.has(id))return;LB.bqP.add(id);E.push({k:'pop',s,t:n})};
  try{fn()}finally{B=B0;G=G0;bqPop=bp0}const out=E;E=null;return out};
 const setAct=(s,i)=>{LB.ai[s]=i;if(s)LB.foe=T1[i];else LB.me=T0[i]};
 function evGain_(s,n){if(!LB.evOn[s]||LB.evUsed[s]||LB.ev[s]>=100)return;const b=bondLv(side(s));LB.ev[s]=Math.min(100,LB.ev[s]+Math.round(n*(b>=5?1.5:b>=3?1.25:1)*(LB.b2[s]?1.25:1)));if(LB.ev[s]>=100)E.push({k:'evf',s})}
 function stat_(sd,k,dl){const cur=LB.stg[sd][k],nv=Math.max(-6,Math.min(6,cur+dl)),ok=nv!==cur;if(ok)LB.stg[sd][k]=nv;E.push({k:'stg',s:sd,stat:k,up:dl>0?1:0,v:nv,ok:ok?1:0});
  say_(ok?`${STAT[k]} de ${Q(sd)} ${dl>0?'augmente':'baisse'}${Math.abs(dl)>1?' beaucoup':''} !`:`${STAT[k]} de ${Q(sd)} ne peut plus ${dl>0?'monter':'baisser'} !`)}
 function sky_(k){if(LB.sky?.k===k){LB.sky.n=5;say_('Le ciel est déjà ainsi…');return}LB.sky={k,n:5};E.push({k:'sky',sky:{k,n:5}});say_(SKY[k][2])}
 function inflict_(s,k,quiet){const m=side(s);if(m.hp<=0)return false;if(m.st||immune(m,k)){if(!quiet)say_(m.st?`${Q(s)} est déjà ${STN[m.st][2]}.`:`Ça n'affecte pas ${Q(s)}…`);return false}
  m.st=k;if(k==='slp')m.slp=rnd(2,4);E.push({k:'st',s,st:k});say_(`${Q(s)} est ${STN[k][2]} !`);
  if(hold(m,'baieprisme')){m.item=null;m.st=null;m.slp=0;E.push({k:'st',s,st:null,heal:1});say_(`${Q(s)} mange sa Baie Prisme : il n'est plus ${STN[k][2]} !`)}return true}
 function berry_(s){const m=side(s),S=st(m);if(hold(m,'baiesoin')&&m.hp>0&&m.hp<=S.hp/2){m.item=null;m.hp=Math.min(S.hp,m.hp+Math.max(1,S.hp>>2));hpE(s,'heal');say_(`${Q(s)} mange sa Baie Sève et récupère des PV !`)}}
 function absorb_(s,v){const d=side(1-s),t=tal(d),di=1-s,k=t==='absorbeau'&&v.t==='EAU'?'heal':t==='paratonnerre'&&v.t==='ELE'||t==='torche'&&v.t==='FEU'?'atk':null;if(!k||d.hp<=0)return false;E.push({k:'tal',s:di});
  if(k==='heal'){const mx=st(d).hp;if(d.hp<mx){d.hp=Math.min(mx,d.hp+(mx>>2));hpE(di,'heal');say_(`${Q(di)} absorbe l'eau et récupère des PV !`)}else say_(`${Q(di)} absorbe l'eau sans effort.`)}
  else{say_(`${Q(di)} absorbe l'attaque !`);stat_(di,'atk',1)}return true}
 function xfx_(e,s,a,d){
  if(e==='protect'){if(LB.protL[s]===LB.turn-1&&R()<.5){LB.protL[s]=-9;return say_('Mais cela échoue !')}LB.prot[s]=LB.turn;LB.protL[s]=LB.turn;E.push({k:'prot',s});return say_(`${Q(s)} se protège !`)}
  if(e==='seed'){const di=1-s;if(SP[d.sp].t==='PLA'||LB.seedM.has(d))return say_(`Ça n'affecte pas ${Q(di)}…`);LB.seedM.add(d);E.push({k:'burst',s:di,c:['#80ff9a','#3a9a4a']});return say_(`${Q(di)} est infecté par une graine !`)}
  if(e==='roots'){if(LB.rootM.has(a))return say_('Mais cela échoue !');LB.rootM.add(a);E.push({k:'burst',s,c:['#80ff9a','#a8e8ff']});return say_(`${Q(s)} s'ancre et puise de l'énergie !`)}
  if(e==='cure'){if(!a.st)return say_('Mais cela échoue !');a.st=null;a.slp=0;E.push({k:'st',s,st:null,heal:1});return say_(`${Q(s)} est guéri !`)}}
 function use_(s,id){const a=side(s),d=side(1-s);let v=MV[id];if(!v||a.hp<=0||d.hp<=0&&v.p)return;
  if(v.e==='cycle'&&isN()&&MV.lamecycle_n){const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);id='lamecycle_n';v=MV[id]}
  if(a.st==='slp'){if(--a.slp>0){E.push({k:'stfx',s,st:'slp'});say_(`${Q(s)} dort profondément…`);return}a.st=null;E.push({k:'st',s,st:null});say_(`${Q(s)} se réveille !`)}
  if(a.st==='par'&&R()<.25){E.push({k:'stfx',s,st:'par'});say_(`${Q(s)} est paralysé ! Il ne peut pas bouger !`);return}
  const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);say_(`${Q(s)} utilise ${v.n} !`);
  if(v.p&&LB.prot[1-s]===LB.turn){say_(`${Q(1-s)} se protège !`);return}
  if(!accOk(a,v,id)){if(v.p)E.push({k:'vfx',s,t:v.t});E.push({k:'miss',s:1-s});say_('Mais ça rate !');return}
  if(v.p&&absorb_(s,v))return;
  if(!v.p&&v.id!=='lutte')E.push({k:'vst',s,mv:id});
  if(v.p){E.push({k:'vfx',s,t:v.t});const r=dmg(a,d,v,LB.stg[s],LB.stg[1-s]);let n=r.n,sturdy=0,endure=0;
   if(tal(d)==='fermete'&&d.hp===st(d).hp&&n>=d.hp){n=d.hp-1;sturdy=1}
   else if(n>=d.hp&&d.hp>1){if(hold(d,'ruban')&&d.hp===st(d).hp){n=d.hp-1;endure=1}else if(!LB.bend.has(d)&&R()<[0,0,0,.1,.15,.2][bondLv(d)]){n=d.hp-1;endure=2;LB.bend.add(d)}}
   d.hp=Math.max(0,d.hp-n);evGain_(s,12+(r.ef>1?8:0)+(r.cr?6:0));evGain_(1-s,Math.max(6,Math.round(30*n/st(d).hp)));
   E.push({k:'hit',s:1-s,n,hp:d.hp,ef:r.ef,cr:r.cr?1:0});evE();
   if(sturdy){E.push({k:'tal',s:1-s});say_(`${Q(1-s)} tient bon grâce à sa Fermeté !`)}if(endure===1)say_(`${Q(1-s)} s'accroche grâce à son Ruban Ténacité !`);
   if(endure===2){E.push({k:'burst',s:1-s,c:['#ff7aa8','#ffffff']});say_(`${Q(1-s)} tient bon pour ne pas décevoir son dresseur !`)}
   if(v.t==='LUM'&&LB.sky?.k==='eclipse'){LB.sky=null;E.push({k:'sky',sky:null,lum:1,s:1-s});say_('La lumière déchire l\'éclipse ! Le terrain s\'éclaircit.')}
   if(v.e==='drain'&&a.hp>0){const h=Math.min(st(a).hp-a.hp,Math.max(1,n>>1));if(h>0){a.hp+=h;hpE(s,'heal');say_(`${Q(s)} absorbe de l'énergie !`)}}
   if(v.e==='recoil'&&a.hp>0){const h=Math.max(1,id==='lutte'?st(a).hp>>2:n>>2);a.hp=Math.max(0,a.hp-h);hpE(s);say_(`${Q(s)} subit le contrecoup !`)}
   if(hold(a,'grelot')&&a.hp>0&&a.hp<st(a).hp){a.hp=Math.min(st(a).hp,a.hp+Math.max(1,n>>3));hpE(s,'heal');say_(`${Q(s)} récupère des PV grâce à son Grelot Écho.`)}
   if(hold(a,'orbe')&&a.hp>0){a.hp=Math.max(0,a.hp-Math.max(1,Math.floor(st(a).hp/10)));hpE(s);say_(`${Q(s)} est blessé par son Orbe Furie !`)}
   if(d.hp>0)berry_(1-s);if(a.hp>0)berry_(s);if(r.hits)say_('Touché 2 fois !');
   if(v.ch&&R()*100<v.ch*chMul(a)){if(STN[v.e]){if(d.hp>0)inflict_(1-s,v.e,1)}else if(/^\w+-$/.test(v.e)){if(d.hp>0)stat_(1-s,v.e.slice(0,3),-1)}else if(/^\w+\+\d?$/.test(v.e)){if(a.hp>0)stat_(s,v.e.slice(0,3),+(v.e.match(/\d$/)?.[0]||1))}else if(SKY[v.e]&&a.hp>0)sky_(v.e)}
   if(PHYS(v.t)&&a.hp>0&&hold(d,'casque')){a.hp=Math.max(0,a.hp-Math.max(1,st(a).hp>>3));hpE(s);say_(`${Q(s)} se blesse sur le Casque Brut !`)}
   if(PHYS(v.t)&&a.hp>0&&!a.st&&(tal(d)==='electrise'||tal(d)==='corpsardent')&&R()<.3){const k=tal(d)==='electrise'?'par':'brn';if(!immune(a,k)){E.push({k:'tal',s:1-s});inflict_(s,k,1)}}}
  else if(STN[v.e])inflict_(1-s,v.e);
  else if(SKY[v.e])sky_(v.e);
  else if(v.e?.startsWith('heal')){const mx=st(a).hp,sk=LB.sky?.k,nt=isN(),k=v.e==='heal'?.5:v.e==='heal_j'?(sk==='sun'||!nt&&sk!=='rain'?2/3:.25):(nt?.5:sk==='sun'?.25:1/3);
   if(a.hp>=mx)say_('Mais ses PV sont déjà au maximum !');else{a.hp=Math.min(mx,a.hp+Math.max(1,Math.floor(mx*k)));hpE(s,'heal');say_(`${Q(s)} récupère des PV !`)}}
  else if(XFX[v.e])xfx_(v.e,s,a,d);
  else{const m=/^(\w+)([+-])(\d?)$/.exec(v.e||'');if(m&&STAT[m[1]]){if(m[2]==='+')E.push({k:'hop',s});stat_(m[2]==='+'?s:1-s,m[1],(m[2]==='+'?1:-1)*(+m[3]||1))}}}
 function end_(){
  for(const s of[0,1]){const m=side(s);if(m.hp<=0||bqFx(m)!=='rain')continue;if(['rain','storm'].includes(LB.sky?.k)&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,Math.floor(st(m).hp/(bqRes(m)?8:10))));hpE(s,'heal');say_(`${Q(s)} se ressource grâce à sa breloque.`)}}
  for(const s of[0,1]){const m=side(s),o=side(1-s);if(m.hp<=0)continue;
   if(LB.seedM.has(m)){const n=Math.max(1,Math.floor(st(m).hp/8));m.hp=Math.max(0,m.hp-n);hpE(s);if(o.hp>0&&o.hp<st(o).hp){o.hp=Math.min(st(o).hp,o.hp+n);hpE(1-s,'heal')}say_(`La graine draine l'énergie de ${Q(s)} !`)}
   if(m.hp>0&&LB.rootM.has(m)&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));hpE(s,'heal');say_(`${Q(s)} puise de l'énergie par ses racines.`)}
   if(m.hp>0&&tal(m)==='turbo'&&LB.stg[s].spd<6){E.push({k:'tal',s});stat_(s,'spd',1)}
   if(m.hp>0&&m.st&&tal(m)==='medecin'&&R()<.35){const k=m.st;m.st=null;m.slp=0;E.push({k:'tal',s});E.push({k:'st',s,st:null,heal:1});say_(`${Q(s)} se soigne : il n'est plus ${STN[k][2]} !`)}}
  for(const s of[0,1]){const m=side(s);if(m.hp<=0)continue;
   if(m.st==='brn'||m.st==='psn'){const n=Math.max(1,Math.floor(st(m).hp/(m.st==='brn'?16:8)));E.push({k:'stfx',s,st:m.st});m.hp=Math.max(0,m.hp-n);hpE(s);say_(`${Q(s)} souffre ${m.st==='brn'?'de sa brûlure':'du poison'} !`)}
   if(tal(m)==='seve'&&!isN()&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));E.push({k:'tal',s});hpE(s,'heal');say_(`${Q(s)} se régénère grâce à sa Sève Vive.`)}
   if(hold(m,'miettes')&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));hpE(s,'heal');say_(`${Q(s)} grignote ses Miettes Dorées.`)}
   if(m.hp>0)berry_(s);
   if(m.st&&m.hp>0&&bondLv(m)>=4&&R()<.2){const k=m.st;m.st=null;m.slp=0;E.push({k:'burst',s,c:['#ff7aa8','#ffffff']});E.push({k:'st',s,st:null});say_(`${Q(s)} se secoue pour rassurer son dresseur : il n'est plus ${STN[k][2]} !`)}
   if(m.hp>0)evGain_(s,6)}
  evE();if(LB.sky&&LB.sky.n<99&&--LB.sky.n<=0){const k=LB.sky.k;LB.sky=null;E.push({k:'sky',sky:null});say_(SKY[k][3])}else if(LB.sky)E.push({k:'skyn',n:LB.sky.n})}
 function entry_(s){const m=side(s);LB.bqE.delete(m);if(!m||m.hp<=0)return;const t=tal(m);
  if(t==='levejour'||t==='eclipsetot'){E.push({k:'tal',s});sky_(t==='levejour'?'sun':'eclipse')}
  else if(t==='intimidation'&&side(1-s)?.hp>0){E.push({k:'tal',s});stat_(1-s,'atk',-1)}
  else if(t==='crachin'||t==='orageux'||t==='astral'){E.push({k:'tal',s});sky_(t==='crachin'?'rain':t==='orageux'?'storm':'stars')}
  else if(t==='aurore'){E.push({k:'tal',s});sky_('sun');stat_(s,'spd',1)}}
 function awaken_(s){const m=side(s),lu=lunar(),S=st(m),ks=lu?['atk','def']:['atk','spd'];LB.evUsed[s]=1;LB.ev[s]=0;LB.awk.add(m);LB.awkC.set(m,lu?'#b89aff':'#ffd23a');E.push({k:'awk',s,lu:lu?1:0});
  for(const k of ks)LB.stg[s][k]=Math.min(6,LB.stg[s][k]+1);E.push({k:'stv',s,v:{...LB.stg[s]},ks});
  say_(`${lu?'Éveil Lunaire':'Éveil Solaire'} ! ${lu?'L\'Attaque et la Défense':'L\'Attaque et la Vitesse'} de ${Q(s)} augmentent !`);
  if(lu){if(m.st){m.st=null;m.slp=0;E.push({k:'st',s,st:null,heal:1});say_(`La lune purifie ${Q(s)} !`)}}else if(m.hp<S.hp){m.hp=Math.min(S.hp,m.hp+Math.max(1,Math.floor(S.hp/5)));hpE(s,'heal');say_(`La lumière soigne ${Q(s)} !`)}evE()}
 function switch_(s,i){const o=side(s);LB.awk.delete(o);LB.awkC.delete(o);E.push({k:'out',s});LB.stg[s]={atk:0,def:0,spd:0};setAct(s,i);E.push({k:'send',s,i,hp:side(s).hp});entry_(s)}
 function faint_(){const k=[LB.me.hp<=0,LB.foe.hp<=0];if(!k[0]&&!k[1])return false;
  for(const s of[0,1])if(k[s]){const m=side(s);E.push({k:'ko',s});say_(`${Q(s)} est K.O. !`);LB.awk.delete(m);LB.awkC.delete(m)}
  const left=T.map(t=>t.some(m=>m.hp>0));if(!left[0]||!left[1]){fin(!left[0]&&!left[1]?-1:left[0]?0:1,'ko');return true}LB.need=[k[0]?1:0,k[1]?1:0];LB.ph='rep';return true}
 function fin(w,why){LB.w=w;LB.why=why;LB.ph='end';E.push({k:'end',w,why})}
 const moveId=(s,c)=>{const m=side(s);if(m.pp.every(p=>p<=0))return'lutte';let i=c|0;if(!(i>=0&&i<m.moves.length&&m.pp[i]>0))i=m.pp.findIndex(p=>p>0);return m.moves[i]};
 const okSw=(s,w)=>Number.isInteger(w)&&!!T[s][w]&&T[s][w].hp>0&&w!==LB.ai[s];
 return{LB,
  start:()=>run(()=>{E.push({k:'send',s:0,i:0,hp:LB.me.hp});E.push({k:'send',s:1,i:0,hp:LB.foe.hp});entry_(0);entry_(1);LB.ph='act'}),
  ff:s=>run(()=>{LB.n++;fin(s<0?-1:1-s,'ff')}),
  act:cs=>run(()=>{LB.n++;LB.turn++;LB.need=[0,0];const c=[0,1].map(s=>cs[s]&&typeof cs[s]==='object'?cs[s]:{m:0});
   if(c[0].f||c[1].f)return fin(c[0].f&&c[1].f?-1:c[0].f?1:0,'ff');
   for(const s of[0,1])if(c[s].w!=null&&okSw(s,c[s].w))switch_(s,c[s].w);else if(c[s].w!=null)c[s]={m:0};
   for(const s of[0,1])if(c[s].w==null&&c[s].e&&canEv(s))awaken_(s);
   const ids=[0,1].map(s=>c[s].w==null?moveId(s,c[s].m):null);let seq=[0,1].filter(s=>ids[s]);
   if(seq.length===2){const pa=MV[ids[0]].pr|0,pb=MV[ids[1]].pr|0,sa=spdOf(LB.me,0),sb=spdOf(LB.foe,1);let first=pa!==pb?(pa>pb?0:1):sa!==sb?(sa>sb?0:1):R()<.5?0:1;
    if(pa===pb){const qa=hold(LB.me,'griffe')&&R()<.2,qb=hold(LB.foe,'griffe')&&R()<.2;if(qa!==qb){first=qa?0:1;say_(`${Q(first)} agit en premier grâce à sa Griffe Vive !`)}}seq=first?[1,0]:[0,1]}
   for(const s of seq){use_(s,ids[s]);if(LB.me.hp<=0||LB.foe.hp<=0)break}
   if(!faint_()){end_();faint_()}}),
  rep:cs=>run(()=>{LB.n++;const nd=[...LB.need];for(const s of[0,1])if(nd[s]){let i=cs[s]?.r;if(!okSw(s,i))i=T[s].findIndex((m,j)=>m.hp>0&&j!==LB.ai[s]);LB.stg[s]={atk:0,def:0,spd:0};setAct(s,i);E.push({k:'send',s,i,hp:side(s).hp})}
   LB.need=[0,0];LB.ph='act';for(const s of[0,1])if(nd[s])entry_(s);if(LB.me.hp<=0||LB.foe.hp<=0)faint_()}),
  view:()=>({n:LB.n,ph:LB.ph,need:[...LB.need],w:LB.w,why:LB.why,a:[...LB.ai],T:T.map(t=>t.map(m=>[m.hp,m.pp.slice(),m.st||0,m.item||0])),stg:LB.stg.map(o=>({...o})),sky:LB.sky?{...LB.sky}:null,ev:[...LB.ev],evU:[...LB.evUsed],awk:[LB.awk.has(LB.me)?1:0,LB.awk.has(LB.foe)?1:0]})}}

// --- Affichage (les deux écrans) : l'état de combat local, vu depuis sa propre équipe
function pvpDisp(A){const me=A.me,op=1-me,D=A.D;return{pvp:A,foes:D[op],fi:0,foe:D[op][0],me:D[me][0],tr:{name:A.nm[op],look:A.lk[op]},o:{},bgk:'salle',stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],shake:0,tint:null,pf:{f:-320,m:320},sky:null,part:new Set(),items:0,lvl:1,
 ev:[0,0],evUsed:[0,0],evF:[0,0],evOn:[!!A.br[me]?.b,!!A.br[op]?.b],awk:new Set(),awkC:new Map(),bend:new Set(),turn:0,arm:0,fo:{x:0,y:0,v:0,s:0,b:0},mo:{x:0,y:0,v:0,s:0,b:0},dh:[0,0],hf:0,hm:0,trX:0,showFoe:0,ball:null}}
const pvpAct=(A,s)=>A.D[s][A.act[s]];
const pvpHp=(m,v)=>Math.max(0,Math.min(st(m).hp,Number.isFinite(v)?Math.floor(v):0));
const pvpTxt=(A,t)=>String(t).slice(0,400).replace(/\x01([01])/g,(_,c)=>{const s=+c,m=pvpAct(A,s);return s===A.me?nm(m):`${nm(m)} de ${A.nm[s]}`}).replace(/[\x00-\x1f]/g,'');
async function pvpEv(A,e){if(!e||typeof e!=='object')return;const s=e.s===1?1:0,ls=s^A.me,m=pvpAct(A,s),T=ls?FOE:ME,o=ls?B.fo:B.mo;
 switch(e.k){
  case'say':return say(pvpTxt(A,e.t),0,1);
  case'send':{const i=e.i|0,n=A.D[s][i];if(!n)return;A.act[s]=i;n.hp=pvpHp(n,e.hp);
   if(ls){B.foe=n;B.fi=i;B.showFoe=1;B.fo={x:0,y:0,v:0,s:0,b:0};B.dh[1]=n.hp;B.stg[1]={atk:0,def:0,spd:0};await say(`${A.nm[s]} envoie ${nm(n)} !`,0,1);const b=B.ball={x:W+20,y:40,r:0};await throwArc(b,W+20,40,FOE[0],FOE[1]+10,320,30);B.ball=null;await popOut(B.fo,FOE,n);tween(B,'hf',1,300,1)}
   else{B.me=n;B.hm=0;B.mo={x:0,y:0,v:0,s:0,b:0};B.dh[0]=n.hp;B.stg[0]={atk:0,def:0,spd:0};show(`En avant, ${nm(n)} !`);const b=B.ball={x:-20,y:260,r:0};await throwArc(b,-20,260,ME[0],ME[1]+30,340,90);B.ball=null;await popOut(B.mo,ME,n);tween(B,'hm',1,300,1);await wait(350);ui.text=null}return}
  case'out':B.awk.delete(m);B.awkC.delete(m);if(ls){await say(`${A.nm[s]} rappelle ${nm(m)} !`,0,1);B.hf=0;B.fo.b=1;await tween(B.fo,'s',0,220);B.fo.b=0;B.fo.v=0}else{await say(`Reviens, ${nm(m)} !`,0,1);B.hm=0;B.mo.b=1;await tween(B.mo,'s',0,220);B.mo.b=0;B.mo.v=0}return;
  case'vfx':if(TY[e.t])await vfx(e.t,ls);return;
  case'vst':{const v=MV[e.mv];if(v){burstAt(T,8,['#ffffff',TY[v.t][1]],1.5,{g:-.05});await vfxSt(v,ls)}return}
  case'hit':{const hp=pvpHp(m,e.hp),ef=Number.isFinite(e.ef)?e.ef:1;sfx('hit');if(ef>1||e.cr)B.shake=e.cr?14:9;o.b=1;await wait(70);for(const dx of[8,-6,4,-2,0]){o.x=dx;o.b=dx>0?1:0;await wait(40)}
   m.hp=hp;popText(T,'-'+Math.max(0,e.n|0),ef>1?C.gold:ef<1?'#c9c2d6':'#ffffff');await tween(B.dh,ls,hp,450);
   if(e.cr){B.zoom=1.07;popText([T[0]-40,T[1]-10],'CRITIQUE !',C.acc);await say('Coup critique !',0,1)}if(ef>1)await say('C\'est super efficace !',0,1);if(ef<1)await say('Ce n\'est pas très efficace…',0,1);return}
  case'hp':{const hp=pvpHp(m,e.hp);m.hp=hp;if(e.fx==='heal'){healFx(ls);sfx('lv')}await tween(B.dh,ls,hp,e.fx==='heal'?400:300);return}
  case'st':m.st=STN[e.st]?e.st:null;if(!m.st)m.slp=0;if(m.st){statusFx(ls,m.st);sfx('st')}else if(e.heal){healFx(ls);sfx('lv')}return;
  case'stfx':if(STN[e.st])statusFx(ls,e.st);return;
  case'stg':if(STAT[e.stat]){statFx(ls,!!e.up,e.stat);sfx(e.up?'lv':'back');await wait(300);if(e.ok)B.stg[ls][e.stat]=Math.max(-6,Math.min(6,e.v|0))}return;
  case'stv':for(const k of['atk','def','spd'])B.stg[ls][k]=Math.max(-6,Math.min(6,e.v?.[k]|0));for(const k of Array.isArray(e.ks)?e.ks:[])if(STAT[k])statFx(ls,1,k);sfx('lv');await wait(300);return;
  case'sky':if(e.sky&&SKY[e.sky.k]){B.sky={k:e.sky.k,n:Math.max(1,Math.min(99,e.sky.n|0))};ui.flash=.5;ui.flashC=SKY[e.sky.k][1];B.skyT=now();sfx(e.sky.k==='rain'?'splash':'shard')}
   else{B.sky=null;if(e.lum){ui.flash=.7;ui.flashC=C.goldL;burstAt(T,24,[C.gold,'#ffffff'],5,{k:'star'})}}return;
  case'skyn':if(B.sky)B.sky.n=Math.max(1,Math.min(99,e.n|0));return;
  case'tal':{const t=TAL[tal(m)]?.[0];if(t){B.tp={s:ls,t,t0:now()};await wait(450)}return}
  case'pop':if(typeof e.t==='string'){B.tp={s:ls,t:e.t.slice(0,30),t0:now(),pre:'BRELOQUE : '};await wait(300)}return;
  case'miss':popText(T,'RATÉ','#c9c2d6');return;
  case'prot':spawn({k:'ring',x:T[0],y:T[1],r0:10,r1:52,l:22,c:'#a8e8ff'});return;
  case'burst':burstAt(T,12,Array.isArray(e.c)?e.c.slice(0,4).map(String):['#ffffff'],2.5,{k:'star'});return;
  case'hop':await tween(o,'y',-10,100);await tween(o,'y',0,120);return;
  case'ev':for(const c of[0,1]){B.ev[c^A.me]=Math.max(0,Math.min(100,e.v?.[c]|0));B.evUsed[c^A.me]=e.u?.[c]?1:0}return;
  case'evf':B.evF[ls]=now();sfx('shard');return;
  case'awk':{const lu=!!e.lu,col=lu?'#b89aff':C.goldL;await say(ls?`${A.nm[s]} active son bracelet ! ${nm(m)} s'éveille !`:`Le Bracelet du Cycle s'illumine ! ${nm(m)} s'éveille !`,0,1);
   ui.cutin={sp:m.sp,sh:m.sh,lu,s:ls,t0:now()};sfx('shard');if(typeof cnNoise==='function')cnNoise(.6,.5,2000,200);await wait(G?.opt?.fast?600:1100);ui.cutin=null;
   B.evUsed[ls]=1;B.ev[ls]=0;sfx('roar');B.awk.add(m);B.awkC.set(m,lu?'#b89aff':'#ffd23a');B.zoom=1.1;ui.flash=.8;ui.flashC=col;B.evB={k:lu,t0:now()};
   for(let i=0;i<3;i++){spawn({k:'ring',x:T[0],y:T[1],r0:90-i*20,r1:-80,l:24,c:col});await wait(110)}
   for(let i=0;i<6;i++)spawn({k:'beam',x:T[0]+(i-2.5)*16,y:0,h:T[1]+50,l:30,c:i%2?col:'#ffffff'});burstAt(T,26,[col,'#ffffff',lu?'#e84aff':C.gold],5,{k:'star'});sfx('shard');await wait(650);return}
  case'ko':await faintFx(o,T,ls);B.awk.delete(m);B.awkC.delete(m);return;
  case'end':A.why=e.why==='ff'?'ff':'ko';return}}
// Réconciliation après chaque tour : l'état de l'hôte fait foi (PV, PP, statuts, objets, créatures en jeu, ciel, jauges)
function pvpView(A,v){if(!v||typeof v!=='object'||!Array.isArray(v.T)||v.T.length!==2||!Array.isArray(v.a))return false;
 for(const s of[0,1]){const t=A.D[s],L=v.T[s];if(!Array.isArray(L)||L.length!==t.length)return false;t.forEach((m,i)=>{const r=L[i];if(!Array.isArray(r))return;m.hp=pvpHp(m,r[0]);if(Array.isArray(r[1]))m.pp=m.moves.map((id,j)=>Math.max(0,Math.min(MV[id].pp,r[1][j]|0)));m.st=m.hp>0&&STN[r[2]]?r[2]:null;if(!m.st)m.slp=0;m.item=IT[r[3]]?r[3]:null})
  const a=v.a[s]|0;if(t[a])A.act[s]=a}
 A.v={n:v.n|0,ph:['act','rep','end'].includes(v.ph)?v.ph:'end',need:[v.need?.[0]?1:0,v.need?.[1]?1:0],w:v.w===0||v.w===1||v.w===-1?v.w:null,why:v.why==='ff'?'ff':'ko'};
 if(B?.pvp===A){const me=A.me,op=1-me;B.me=pvpAct(A,me);B.foe=pvpAct(A,op);B.dh=[B.me.hp,B.foe.hp];for(const s of[0,1])if(v.stg?.[s])for(const k of['atk','def','spd'])B.stg[s^me][k]=Math.max(-6,Math.min(6,v.stg[s][k]|0));
  B.sky=v.sky&&SKY[v.sky.k]?{k:v.sky.k,n:Math.max(1,Math.min(99,v.sky.n|0))}:null;for(const s of[0,1]){B.ev[s^me]=Math.max(0,Math.min(100,v.ev?.[s]|0));B.evUsed[s^me]=v.evU?.[s]?1:0;const m=pvpAct(A,s);if(v.awk?.[s])B.awk.add(m);else{B.awk.delete(m);B.awkC.delete(m)}}}
 return true}

// --- Choix du joueur (attaque, Éveil, changement, abandon) ; « kick » quitte les menus si l'adversaire part ou abandonne
function pvpTeamMenu(A,title){const L=A.D[A.me];ui.dim=title;return choose(L.map(nm),{bare:1,cols:2,rect:i=>[12+(i%2)*232,40+(i>>1)*92,224,86],draw:(i,[x,y,w,h],sel,pr)=>{const m=L[i],S=st(m),ko=m.hp<=0,yy=y-(sel?2:0),act=i===A.act[A.me];
  rr(x+4,yy+4,w,h,4,'rgba(8,6,20,.45)');rr(x,yy,w,h,4,C.ink);rr(x+2,yy+2,w-4,h-4,2,sel||pr?C.acc:ko?'#6a6280':C.frame);rr(x+6,yy+6,w-12,h-12,2,ko?'#e4dfe8':sel?'#fff8ee':C.paper);R(X,'#ffffff',x+8,yy+6,w-16,2);
  const ic=monSpr(m.sp,0,48,m.sh);pell(X,x+38,yy+66,18,3,'rgba(31,26,51,.15)');X.drawImage(ko?silh(ic,'#9a92aa'):ic,x+14,yy+18,48,48);txt(nm(m),x+70,yy+28,ko?C.mute:C.ink);txt('NV'+m.lv,x+14,yy+80,C.ink2,{mini:1});
  const cw=chip(SP[m.sp].t,x+70,yy+34);stChip(m,x+74+cw,yy+34);if(act)txt('EN JEU',x+w-12,yy+46,C.acc,{mini:1,al:'r'});if(ko){rr(x+w-56,yy+34,44,16,2,C.ink);txt('K.O.',x+w-50,yy+46,'#ff8a8a',{mini:1})}
  hpBar(x+96,yy+56,w-110,m.hp/S.hp);txt(`${m.hp}/${S.hp}`,x+w-14,yy+78,C.ink2,{mini:1,al:'r'})}}).finally(()=>ui.dim=null)}
async function pvpFoeTeam(A){const L=A.D[1-A.me];ui.panel=()=>{panel(8,8,W-16,H-16);txt(`ÉQUIPE DE ${A.nm[1-A.me].toUpperCase()}`,24,34,C.acc,{sh:0});
  L.forEach((m,i)=>{const x=20+(i%3)*150,y=46+(i/3|0)*128,ko=m.hp<=0;rr(x,y,142,120,4,'#efe6d2');X.drawImage(ko?silh(monSpr(m.sp,0,64),'#9a92aa'):monSpr(m.sp,0,64,m.sh),x+39,y+4,64,64);txt(nm(m),x+71,y+82,ko?C.mute:C.ink,{al:'c'});txt('NV'+m.lv,x+8,y+98,C.ink2,{mini:1});chip(SP[m.sp].t,x+60,y+88);hpBar(x+34,y+104,100,m.hp/st(m).hp)});
  txt('A / B : FERMER',W-24,H-20,C.mute,{mini:1,al:'r'})};for(;;){const k=await key();if(k==='a'||k==='b')break}ui.panel=null}
async function pvpChoose(A,stop){for(;;){if(stop())return null;show(`Que doit faire ${nm(B.me)} ?`,0,262);const c=await choose(['ATTAQUE','ÉQUIPE','ADVERSE','ABANDON'],{x:270,y:H-90,w:206,rh:33,cols:2});ui.text=null;if(stop())return null;if(c<0)continue;
 if(c===0){if(B.me.pp.every(p=>p<=0)){await say(`${nm(B.me)} n'a plus de PP ! Il se débat…`,0,1);return{m:'L'}}const i=await pickMove();if(stop())return null;if(i<0)continue;const e=B.arm?1:0;B.arm=0;return{m:i,e}}
 if(c===1){const i=await pvpTeamMenu(A,'Envoyer qui ?');if(stop())return null;if(i<0)continue;const m=A.D[A.me][i];if(m.hp<=0){await say(`${nm(m)} est K.O. !`);continue}if(i===A.act[A.me]){await say(`${nm(m)} est déjà au combat !`);continue}return{w:i}}
 if(c===2){await pvpFoeTeam(A);continue}
 if(c===3&&await ask('Abandonner le combat ? Ce sera une défaite.'))return{f:1}}}
async function pvpRep(A,stop){for(;;){if(stop())return null;const i=await pvpTeamMenu(A,'Envoyer qui ?');if(stop())return null;if(i<0)continue;const m=A.D[A.me][i];if(m.hp<=0){await say(`${nm(m)} est K.O. !`);continue}if(i===A.act[A.me]){await say(`${nm(m)} est déjà au combat !`);continue}return{r:i}}}
async function pvpWait(A,msg,done){let ff=0;show(msg,0);for(;;){if(done())break;const k=await key(150);if(done())break;if(k==='b'&&!ff){ui.text=null;if(await ask('Abandonner le combat ? Ce sera une défaite.')){ff=1;A.onFF?.()}if(!done())show(msg,0)}}ui.text=null}

// --- Choix des créatures avant le combat
async function pvpPickTeam(n,l50){const P=G.party,need=Math.min(n,P.length),sel=[];if(P.length<=need){await say(P.length>1?'Tu combats avec toute ton équipe, dans l\'ordre.':'Tu combats avec ta seule créature.');return P.map((_,i)=>i)}
 const OK=P.length;for(;;){ui.dim=`Choisis ${need} créatures`;const i=await choose([...P.map(nm),'OK'],{bare:1,cols:2,i:sel.length===need?OK:0,rect:i=>i===OK?[W-124,H-36,112,30]:[12+(i%2)*232,40+(i>>1)*80,224,74],
  draw:(i,[x,y,w,h],s2,pr)=>{if(i===OK){const ok=sel.length===need;rr(x,y,w,h,4,C.ink);rr(x+2,y+2,w-4,h-4,2,pr?C.acc:s2?C.accL:ok?C.paper:C.paper2);txt(`OK  ${sel.length}/${need}`,x+w/2,y+20,ok?C.ink:C.mute,{al:'c',sh:0});return}
   const m=P[i],k=sel.indexOf(i),yy=y-(s2?2:0);rr(x,yy,w,h,4,C.ink);rr(x+2,yy+2,w-4,h-4,2,pr||s2?C.acc:k>=0?C.gold:C.frame);rr(x+6,yy+6,w-12,h-12,2,k>=0?'#fff6d8':C.paper);
   X.drawImage(monSpr(m.sp,0,48,m.sh),x+10,yy+14,48,48);txt(nm(m),x+64,yy+28);txt(`Nv ${m.lv}${l50&&m.lv!==50?' - passe au 50':''}`,x+64,yy+44,C.ink2,{s:1,sh:0});chip(SP[m.sp].t,x+64,yy+50);
   if(k>=0){pell(X,x+w-22,yy+22,11,11,C.ink);pell(X,x+w-22,yy+22,9,9,C.gold);txt(k+1,x+w-22,yy+30,C.ink,{al:'c',sh:0})}}});ui.dim=null;
  if(i<0){if(!sel.length)return null;sel.pop();continue}if(i===OK){if(sel.length===need)return sel;sfx('bump');continue}
  const j=sel.indexOf(i);if(j>=0)sel.splice(j,1);else if(sel.length<need)sel.push(i);else sfx('bump')}}

// --- Déroulement complet : équipes, introduction, tours, fin
NET.H['bt-tm']=(m,P)=>{const A=NET.act;if(A?.k==='bt'&&A.id===m.id&&A.with===P.pid&&A.me===0&&!A.tm)A.tm={tm:m.tm,br:{b:m.br?.b?1:0,b2:m.br?.b2?1:0}}};
NET.H['bt-go']=(m,P)=>{const A=NET.act;if(A?.k==='bt'&&A.id===m.id&&A.with===P.pid&&A.me===1&&!A.go)A.go=m};
NET.H['bt-ch']=(m,P)=>{const A=NET.act;if(A?.k==='bt'&&A.id===m.id&&A.with===P.pid&&A.me===0&&Number.isInteger(m.n))(A.gch??={})[m.n]??=(m.c&&typeof m.c==='object'?m.c:{})};
NET.H['bt-tr']=(m,P)=>{const A=NET.act;if(A?.k==='bt'&&A.id===m.id&&A.with===P.pid&&A.me===1&&Number.isInteger(m.n))(A.res??={})[m.n]??={ev:Array.isArray(m.ev)?m.ev.slice(0,400):[],v:m.vw}};
NET.H['bt-ff']=(m,P)=>{const A=NET.act;if(A?.k==='bt'&&A.id===m.id&&A.with===P.pid)A.oppFF=1};
NET.H['bt-x']=(m,P)=>{const A=NET.act;if((A?.k==='bt'||A?.k==='tr')&&A.id===m.id&&A.with===P.pid)A.x=1};
NET.H.gone=P=>{const A=NET.act;if(A&&A.with===P.pid)A.gone=1};
async function pvpFlow(P,id,ru,me){const A=NET.act?.k==='bt'&&NET.act.id===id?NET.act:(NET.act={k:'bt',id,with:P.pid});Object.assign(A,{me,ru,D:null,act:[0,0],v:null,nm:[],lk:[],br:[]});A.tm??=null;A.go??=null;A.gch??={};A.res??={};A.oppFF??=0;A.x??=0;A.gone??=0;NET.hi(1);
 const lost=()=>A.gone||A.x||!NET.peers.has(P.pid),send=(k,o)=>NET.send(k,{id,...o},P.pid,90).then(ok=>{if(!ok)A.gone=1});let started=0;
 try{const pick=await pvpPickTeam(ru.n,ru.l50);if(!pick||lost()){NET.send('bt-x',{id},P.pid,true);if(!lost())await say('Combat annulé.');else await say(A.x?`${P.name} a annulé le combat.`:`${P.name} a quitté le salon.`);return}
  const mine=pick.map(i=>pvpCopy(G.party[i],ru.l50)),brc={b:G.keys.bracelet?1:0,b2:G.keys.brv2?1:0};let eng=null,ev0;
  if(me===1){send('bt-tm',{tm:mine.map(pvpSnap),br:brc});show(`En attente de ${P.name}…`);while(!A.go&&!lost()){const k=await key(150);if(k==='b'&&await ask('Annuler le combat ?')){NET.send('bt-x',{id},P.pid,true);return}if(!A.go&&!lost())show(`En attente de ${P.name}…`)}ui.text=null;
   if(!A.go){await say(A.x?`${P.name} a annulé le combat.`:`${P.name} a quitté le salon.`);return}const g=A.go,T0=pvpTeam(g.tm?.[0],6,ru.l50),T1=pvpTeam(g.tm?.[1],6,ru.l50);
   if(!T0||!T1){NET.send('bt-x',{id},P.pid,true);return say('Les données du combat sont illisibles. Combat annulé.')}A.D=[T0,T1];A.br=[{b:g.br?.[0]?.b?1:0},{b:g.br?.[1]?.b?1:0}];ev0=Array.isArray(g.ev)?g.ev:[];A.v0=g.vw}
  else{show(`En attente de ${P.name}…`);while(!A.tm&&!lost()){const k=await key(150);if(k==='b'&&await ask('Annuler le combat ?')){NET.send('bt-x',{id},P.pid,true);return}if(!A.tm&&!lost())show(`En attente de ${P.name}…`)}ui.text=null;
   if(!A.tm){await say(A.x?`${P.name} a annulé le combat.`:`${P.name} a quitté le salon.`);return}
   const S0=mine.map(pvpSnap),T1=pvpTeam(A.tm.tm,ru.n,ru.l50);if(!T1){NET.send('bt-x',{id},P.pid,true);return say(`L'équipe de ${P.name} est illisible. Combat annulé.`)}const S1=T1.map(pvpSnap);
   A.br=[brc,A.tm.br];eng=pvpEngine(S0.map(o=>pvpMon(o,ru.l50)),S1.map(o=>pvpMon(o,ru.l50)),ru,A.br);ev0=eng.start();A.v0=eng.view();A.D=[S0.map(o=>pvpMon(o,ru.l50)),S1.map(o=>pvpMon(o,ru.l50))];
   send('bt-go',{tm:[S0,S1],br:A.br,nm:[NG().n,P.name],lk:[NG().lk,P.look],ev:ev0,vw:A.v0})}
  A.nm=me?[P.name,NG().n]:[NG().n,P.name];A.lk=me?[P.look,NG().lk]:[NG().lk,P.look];A.act=[0,0];
  // Introduction
  started=1;const op=1-me;musPlay('boss');ui.vs={tr:{name:A.nm[op],look:A.lk[op]},t0:now()};sfx('alert');await wait(1700);ui.wst='bars';await wipeTo(1,420);ui.vs=null;
  mode='battle';B=pvpDisp(A);await wipeTo(0,380);await Promise.all([tween(B.pf,'f',0,600,1),tween(B.pf,'m',0,600,1)]);
  await say(`${A.nm[op]} veut se battre ! Combat entre amis${ru.l50?', toutes les créatures au niveau 50':''}${PHT15[ru.ph]||''}.`);await tween(B,'trX',260,350);B.trX=null;
  for(const e of ev0.slice(0,400))await pvpEv(A,e);if(!pvpView(A,A.v0))throw new Error('état illisible');
  // Tours
  A.onFF=()=>{if(me===1)NET.send('bt-ff',{id},P.pid,true);else A.myFF=1};
  while(A.v.ph!=='end'&&!lost()){const v=A.v,n=v.n+1,need=v.ph==='act'||v.need[me];let c=null;
   const stop=()=>lost()||A.oppFF&&me===0||me===1&&!!A.res[n]||A.myFF;const kick=setInterval(()=>{if(stop()&&waiters.length)press('b')},120);
   try{if(need)c=v.ph==='act'?await pvpChoose(A,stop):await pvpRep(A,stop)}finally{clearInterval(kick)}if(lost())break;
   let res=null;
   if(me===0){if(c?.f||A.myFF)res={ev:eng.ff(0),v:null};else if(A.oppFF)res={ev:eng.ff(1),v:null};
    else{const gNeed=v.ph==='act'||v.need[1];if(gNeed){await pvpWait(A,`En attente de ${P.name}…`,()=>A.gch[n]||lost()||A.oppFF||A.myFF);if(lost())break}
     if(A.myFF)res={ev:eng.ff(0)};else if(A.oppFF&&!A.gch[n])res={ev:eng.ff(1)};else{const cs=[c,A.gch[n]||{}];res={ev:v.ph==='act'?eng.act(cs):eng.rep(cs)}}}
    res.v=eng.view();send('bt-tr',{n:res.v.n,ev:res.ev,vw:res.v})}
   else{if(c&&!A.res[n])send('bt-ch',{n,c});await pvpWait(A,`En attente de ${P.name}…`,()=>A.res[n]||lost());if(!A.res[n])break;res=A.res[n]}
   for(const e of res.ev)await pvpEv(A,e);if(!pvpView(A,res.v))throw new Error('état illisible')}
  await pvpEnd(A,P)}
 catch(e){console.error(e);NET.send('bt-x',{id},P.pid,true);if(started){A.v={ph:'end',w:null};await pvpEnd(A,P)}else await say('Le combat n\'a pas pu commencer.')}
 finally{if(NET.act===A)NET.act=null;ui.dim=null;ui.panel=null;ui.cutin=null;ui.vs=null;NET.hi(1)}}
async function pvpEnd(A,P){const me=A.me,op=1-me,w=A.v?.ph==='end'?A.v.w:null,ff=A.v?.why==='ff'||A.why==='ff',N=NG();ui.text=null;
 if(B?.pvp===A){if(w===me){B.fo.v=0;B.hf=0;B.trX=260;musPlay('win');await tween(B,'trX',0,350,1);await say(ff?`${A.nm[op]} abandonne ! Tu remportes le combat.`:`Tu as battu ${A.nm[op]} !`);N.w=(N.w|0)+1}
  else if(w===-1){await say('Égalité ! Plus personne ne tient debout.');N.d=(N.d|0)+1}
  else if(w===op){await say(ff?'Tu as abandonné le combat.':`${A.nm[op]} remporte le combat… Bien joué quand même !`);N.l=(N.l|0)+1}
  else await say(`La connexion avec ${A.nm[op]||P.name} a été perdue. Le combat est annulé.`);
  if(w!=null){N.bt=(N.bt|0)+1;await say(`Tes créatures se reposent : elles sont en pleine forme. Bilan en ligne : ${N.w|0} victoire${(N.w|0)>1?'s':''}, ${N.l|0} défaite${(N.l|0)>1?'s':''}.`)}
  await fadeTo(1,350)}
 B=null;mode='world';ui.text=null;achCheck();save();musPlay(mapMus(MAPS[G.map]));await fadeTo(0,350)}

// --- Succès, nouveautés, journal
ACH.push(['net1','Bienvenue en ligne','Rejoindre un salon avec un ami.',()=>!!G.net?.met,['etinc',3]],['netT','Échange d\'amitié','Échanger une créature avec un ami.',()=>(G.net?.tr|0)>=1,['etinc',5]],
 ['netW','Duel entre amis','Gagner un combat en ligne.',()=>(G.net?.w|0)>=1,['etinc',5]],['netW5','Champion du salon','Gagner 5 combats en ligne.',()=>(G.net?.w|0)>=5,['hypercapsule',5]]);
{const hi15=NET.H.hi;NET.H.hi=(m,P)=>{hi15(m,P);if(G&&!G.net?.met){NG().met=1;achCheck()}}}
{const q15=quests;quests=function(){const Q0=q15();if(G?.net?.met||G?.net?.n)Q0.push(['En ligne',1,`Salon ${NET.on?NET.code+' (connecté)':'fermé'}. Combats : ${G.net.w|0} victoire(s), ${G.net.l|0} défaite(s), ${G.net.d|0} égalité(s). Échanges : ${G.net.tr|0}.`]);return Q0}}
NEWS.splice(0,NEWS.length,[()=>ICO.net,'En ligne entre amis','Menu EN LIGNE : crée un salon (code de 4 lettres) ou rejoins celui d\'un ami. Vous vous voyez sur la carte, sans compte.'],
 [()=>ICO.trophy||ICO.star,'Combats entre amis','3 contre 3 ou 6 contre 6, tous au niveau 50 ou aux vrais niveaux. Talents, objets, breloques et Éveil comptent. Rien n\'est perdu.'],
 [()=>ICO.team,'Échanges','Propose une créature, regarde celle de ton ami, confirmez tous les deux. Une créature reçue gagne plus d\'EXP.'],
 [()=>ICO.note,'Messages et émotes','Des phrases toutes prêtes et des émotes qui s\'affichent au-dessus de ta tête. Choisis ton pseudo et ton apparence.']);
