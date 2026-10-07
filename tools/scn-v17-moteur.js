// Test 17.0 (moteur de combat en groupe contre les dresseurs, un seul navigateur) : centaines de combats aléatoires contre des équipes de
// dresseurs (1 à 6 créatures, champions, objets, Éveil adverse, terrains d'arène), 1 à 4 joueurs qui arrivent et repartent ;
// équilibrage selon le nombre de joueurs ; relecture visuelle d'un combat contre un dresseur depuis l'hôte et depuis un invité.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',30),mon('goutelin',25)];G.keys.bracelet=1;const G0=G;
 const KN=new Set(['say','send','out','vfx','vst','hit','hp','st','stfx','stg','stv','sky','skyn','tal','pop','miss','prot','burst','hop','ev','evf','awk','ko','join','left','pw','item','ball','run','end','fsend','fitem']);
 const SPK=Object.keys(SP),HELD=Object.keys(IT).filter(k=>IT[k][4]==='held'),USE=Object.keys(IT).filter(k=>['heal','revive','cure','pp','ball'].includes(IT[k][4])),pick=a=>a[Math.random()*a.length|0];
 const rmon=(lv)=>{const m=mon(pick(SPK),lv??rnd(5,80));m.nat=pick(NATK);m.item=Math.random()<.5?pick(HELD):null;m.eq=Math.random()<.4?pick(BQK):null;m.aff=rnd(0,255);if(Math.random()<.3)m.hp=rnd(0,st(m).hp);if(Math.random()<.2)m.st=pick(['psn','brn','par','slp']);return m};
 const fmon=lv=>{const m=mon(pick(SPK),lv);if(Math.random()<.3)m.item=pick(HELD);if(Math.random()<.2)m.eq=pick(BQK);return cbMon(cbSnap(cbCopy(m)))};
 const team=n=>Array.from({length:n},()=>rmon());const ally=(i,T)=>({pid:'p'+i,nm:'J'+i,lk:'hero',T:T.map(m=>cbMon(cbSnap(cbCopy(m)))),br:{b:Math.random()<.7,b2:Math.random()<.3}});
 const FIELDS=[null,null,'volt','maree','crep','roc'];
 const chk=(E,ev,v,tr)=>{if(G!==G0)throw new Error('G non restauré');if(B!==null)throw new Error('B non restauré');for(const e of ev){if(!KN.has(e.k))throw new Error('événement inconnu '+e.k);if(e.k==='say'&&(typeof e.t!=='string'||/undefined|NaN|\[object/.test(e.t)))throw new Error('texte invalide '+e.t)}
  for(const a of E.A)if(a)for(const m of a.T){if(!(m.hp>=0&&m.hp<=m._S.hp&&Number.isInteger(m.hp)))throw new Error('PV hors bornes '+m.sp+' '+m.hp);if(m.pp.some(p=>p<0))throw new Error('PP négatifs')}
  for(const m of E.F.T)if(!(m.hp>=0&&m.hp<=m._S.hp&&Number.isInteger(m.hp)))throw new Error('PV adverses hors bornes '+m.sp+' '+m.hp+'/'+m._S.hp);
  if(!Array.isArray(v.F.T)||v.F.T.length!==E.F.T.length||!E.F.T[v.F.i]||E.F.m!==E.F.T[v.F.i])throw new Error('équipe adverse incohérente');
  if(v.ph!=='end'&&E.F.m.hp<=0)throw new Error('créature adverse K.O. restée en jeu');if(v.ph==='act')for(const a of v.A)if(a&&!a.out&&E.A[a.s].T[a.a].hp<=0)throw new Error('K.O. en jeu en phase act');
  if(v.N!==Math.max(1,v.A.filter(a=>a&&!a.out).length)&&v.ph!=='end')throw new Error('puissance incohérente '+v.N);
  if(v.ph==='end'){if(v.w==='win'&&E.F.T.some(m=>m.hp>0))throw new Error('victoire avec des créatures adverses debout');if(tr&&(v.w==='catch'||v.w==='run'&&v.why==='run'))throw new Error('capture ou fuite contre un dresseur')}
  const s=JSON.stringify({ev,v});if(s.length>55000)throw new Error('message trop gros '+s.length)};
 // 1) Combats aléatoires contre des dresseurs
 let n=0,steps=0;const ends={},kinds={},fields={};
 for(let b=0;b<300;b++){const lv=rnd(5,70),nf=rnd(1,6),FT=Array.from({length:nf},()=>fmon(Math.max(2,lv+rnd(-4,4)))),boss=Math.random()<.4,fld=pick(FIELDS);fields[fld]=(fields[fld]||0)+1;
  const tr={name:'Dresseur '+b,look:pick(['rival','grunt','leader','maelle','vex']),money:rnd(100,5000),after:'Bien joué.',boss:boss?1:0,vs:1,ev:Math.random()<.5?1:0};
  const E=cbEngine(FT,{tr,items:rnd(0,2),fev:!!tr.ev,field:fld,sky:fld==='maree'?{k:'rain',n:99}:fld==='crep'?{k:'sun',n:99}:Math.random()<.2?{k:'rain',n:5}:null,o:{noLose:Math.random()<.2?1:0}});
  const T0=team(rnd(1,6));if(!T0.some(alive))T0[0].hp=1;
  E.host({pid:'h',nm:'Hôte',lk:'hero',T:T0.map(m=>cbMon(cbSnap(cbCopy(m)))),a:Math.max(0,T0.findIndex(alive)),stg:{atk:0,def:0,spd:0},ev:0,evOn:1});let v=E.view(),k=0,pid=1;
  if(Math.random()<.5){const r=E.step({add:[ally(pid++,team(rnd(1,4)).map(m=>(m.hp=Math.max(1,m.hp),m)))],only:1});v=E.view();chk(E,r.ev,v,tr);for(const e of r.ev)kinds[e.k]=(kinds[e.k]||0)+1}
  while(v.ph!=='end'&&k++<400){const o={cs:{}},r=Math.random();
   if(r<.12){const T=team(rnd(1,6));if(T.some(alive))(o.add=[]).push(ally(pid++,T))}
   const live=v.A.filter(a=>a&&!a.out);if(r>.97&&live.length>1)o.gone=[pick(live.filter(a=>a.s)).s].filter(x=>x!=null);if(r>.94&&r<=.97&&live.length>1)o.lv=[pick(live.filter(a=>a.s)).s].filter(x=>x!=null);
   for(const a of live){const x=Math.random();o.cs[a.s]=x<.03?{run:1}:x<.05?{lv:1}:x<.12?{w:rnd(-1,7)}:x<.18?(()=>{const it=pick(USE);return IT[it][4]==='ball'?{ball:it}:{it,t:rnd(-1,6)}})():x<.2?{}:{m:rnd(-1,4),e:Math.random()<.5?1:0};if(v.ph==='rep')o.cs[a.s]={r:rnd(-1,6)}}
   const res=E.step(o);v=E.view();chk(E,res.ev,v,tr);for(const e of res.ev)kinds[e.k]=(kinds[e.k]||0)+1;steps++}
  ok(v.ph==='end'||k>=400,'fin');ends[v.w]=(ends[v.w]||0)+1;n++;if(b%100===99)L('combats',n,'étapes',steps)}
 ok(n===300,`${n} combats contre des dresseurs, ${steps} étapes, fins ${JSON.stringify(ends)}, terrains ${JSON.stringify(fields)}`);L('événements',JSON.stringify(kinds));
 for(const k of['fsend','fitem','join','left','pw','item','ko','end','awk','sky'])ok(kinds[k]>0,'événement '+k+' vu');ok(!ends.catch,'aucune capture contre un dresseur');
 // 2) Équilibrage contre des dresseurs (3 créatures, niveau des joueurs +2), attaques automatiques
 const SPW=Object.values(MAPS).flatMap(M=>(M.enc||[]).map(e=>e[0])).filter(k=>SP[k]),bal={};
 for(const N of[1,2,3,4]){let w=0,dmgT=0;for(let b=0;b<300;b++){const lv=rnd(10,40),E=cbEngine([0,1,2].map(()=>cbMon(cbSnap(cbCopy(mon(pick(SPW),lv+1))))),{tr:{name:'T',look:'grunt',money:100,boss:0}});const mk=()=>[mon(pick(SPW),lv+2),mon(pick(SPW),lv+1),mon(pick(SPW),lv)].map(m=>cbMon(cbSnap(cbCopy(m))));
   E.host({pid:'h',nm:'H',lk:'hero',T:mk(),a:0,stg:{},ev:0,evOn:0});const add=[];for(let i=1;i<N;i++)add.push({pid:'p'+i,nm:'J'+i,lk:'hero',T:mk(),br:{}});E.step({add,only:1});let v=E.view(),k=0;
   const hp0=E.A.map(a=>a.T.reduce((s,m)=>s+m.hp,0));while(v.ph!=='end'&&k++<120){E.step({cs:{}});v=E.view()}
   if(v.w==='win')w++;dmgT+=E.A.reduce((s,a,i)=>s+1-a.T.reduce((t,m)=>t+m.hp,0)/hp0[i],0)/N}
  bal[N]={victoires:Math.round(w/3)+'%',pvPerdus:Math.round(dmgT/3)+'%'}}
 L('équilibrage dresseurs',JSON.stringify(bal));const p1=parseInt(bal[1].pvPerdus),w1=parseInt(bal[1].victoires);ok([2,3,4].every(N=>Math.abs(parseInt(bal[N].pvPerdus)-p1)<=15&&parseInt(bal[N].victoires)>=w1-12),'à plusieurs, le dresseur reste un vrai défi sans devenir injuste');
 // 3) Relecture visuelle d'un combat contre un dresseur (hôte, puis invité) : envoi des créatures suivantes, Super Potion, Éveil adverse, terrain
 for(const me of[0,1]){const FT=[mon('rocaillon',14),mon('magmor',15),mon('rocaroc',16)].map(m=>cbMon(cbSnap(cbCopy(m)))),tr={name:'Championne Brasia',look:'leader',money:1200,after:'Tu as trouvé la faille !',boss:1,vs:1,ev:1};
  const E=cbEngine(FT,{tr,items:1,fev:1,fevV:90,field:'roc',o:{noLose:0},bg:'salle'});const T=[mon('brasilion',18),mon('goutelin',16)],mk=a=>a.map(m=>cbMon(cbSnap(cbCopy(m))));
  E.host({pid:'h',nm:'Alice',lk:'girl',T:mk(T),a:0,stg:{},ev:0,evOn:1});const C={id:'t'+me,host:me?0:1,me,real:me?[]:T,oth:[],N:1,part:new Set(),o:{}};
  mode='battle';B={coop:null,foes:[],fi:0,foe:null,me:null,tr:me?null:{...tr},o:{},bgk:'salle',field:null,stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],shake:0,tint:null,pf:{f:0,m:0},sky:null,part:new Set(),items:0,lvl:0,ev:[0,0],evUsed:[0,0],evF:[0,0],evOn:[1,0],awk:new Set(),awkC:new Map(),bend:new Set(),turn:0,arm:0,fo:{x:0,y:0,v:1,s:1,b:0},mo:{x:0,y:0,v:1,s:1,b:0},dh:[0,0],hf:1,hm:1,trX:null,showFoe:1,ball:null};
  let r=E.step({add:[{pid:'b',nm:'Bob',lk:'scout',T:mk([mon('pousseron',17),mon('flamiot',15)]),br:{b:1}}],only:1}),v=E.view();
  if(me){C.real=[];cbSetup(C,E.info(),v);await cbSendAnim(C,1)}else{cbSetup(C,{...E.info(),A:[E.info().A[0]]},{...v,A:[v.A[0]],N:1});for(const e of r.ev)await cbEv(C,e);cbView(C,v)}
  ok(C.D[0]&&C.D[1]&&C.N===2&&B.foe.hp===v.F.hp&&B.tr&&B.tr.name===tr.name&&B.foes.length===3&&B.field==='roc'&&B.evOn[1],'combat contre une championne à deux : puissance x2, 3 créatures adverses, terrain Roc (vue '+me+')');await SNAP('dresseur-'+me);
  let k=0,sent=0,used=0,awk=0;
  while(v.ph!=='end'&&k++<60){r=E.step({cs:{0:{m:0,e:1},1:{m:1,e:1}}});v=E.view();for(const e of r.ev){if(e.k==='fsend')sent++;if(e.k==='fitem')used++;if(e.k==='awk'&&e.s===CBF)awk++;await cbEv(C,e)}
   ok(cbView(C,v)&&B.foe===C.FT[v.F.i]&&B.foe.hp===v.F.hp&&B.dh[1]===B.foe.hp,'tour '+k+' relu (créature adverse '+(v.F.i+1)+'/3)');if(sent===1&&!C.shot){C.shot=1;await SNAP('suivante-'+me)}}
  ok(v.ph==='end'&&C.end,'combat relu jusqu\'au bout : '+C.end?.w+' ('+sent+' envois, '+used+' potion, '+awk+' éveil adverse)');ok(v.w!=='win'||sent===2,'les trois créatures de la championne sont passées');
  const info=E.info();ok(info.tr&&info.tr.name===tr.name&&info.tr.money===1200&&info.tr.field==='roc'&&info.FT.length===3,'informations du dresseur transmises');
  const back=cbTrIn(JSON.parse(JSON.stringify(info.tr)));ok(back.name===tr.name&&back.look==='leader'&&back.money===1200&&back.after===tr.after&&back.field==='roc','dresseur relu à l\'arrivée');
  B=null;mode='world'}
 // 4) Données hostiles : dresseur et options nettoyés
 const bad=cbTrIn({name:'<b>\u0001Vex\u0002',look:'dragon',money:1e9,after:'x'.repeat(900),field:'lave'});ok(bad.name==='<b>Vex'&&bad.look==='grunt'&&bad.money===100000&&bad.after.length===300&&bad.field===null,'dresseur nettoyé');
 const bo=cbOptIn({noLose:'oui',legend:0,loseMsg:'\u0001'.repeat(5)+'y'.repeat(500)});ok(bo.noLose===1&&!bo.legend&&bo.loseMsg.length===200&&bo.coop===1,'options nettoyées');
 ok(G===G0&&G.party.length===2,'partie intacte');L('done')}
