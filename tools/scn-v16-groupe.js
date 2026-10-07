// Test 16.0 (combats en groupe, un seul navigateur) : moteur soumis à des centaines de combats aléatoires (1 à 4 joueurs, arrivées et départs
// en plein combat, objets, capsules, fuite, choix invalides), équilibrage selon le nombre de joueurs, puis relecture visuelle depuis plusieurs places.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',30),mon('goutelin',25)];G.keys.bracelet=1;const G0=G;
 const KN=new Set(['say','send','out','vfx','vst','hit','hp','st','stfx','stg','stv','sky','skyn','tal','pop','miss','prot','burst','hop','ev','evf','awk','ko','join','left','pw','item','ball','run','end']);
 const SPK=Object.keys(SP),HELD=Object.keys(IT).filter(k=>IT[k][4]==='held'),USE=Object.keys(IT).filter(k=>['heal','revive','cure','pp','ball'].includes(IT[k][4])),pick=a=>a[Math.random()*a.length|0];
 const rmon=(lv)=>{const m=mon(pick(SPK),lv??rnd(5,80));m.nat=pick(NATK);m.item=Math.random()<.5?pick(HELD):null;m.eq=Math.random()<.4?pick(BQK):null;m.aff=rnd(0,255);if(Math.random()<.3)m.hp=rnd(0,st(m).hp);if(Math.random()<.2)m.st=pick(['psn','brn','par','slp']);return m};
 const team=n=>Array.from({length:n},()=>rmon());const ally=(i,T)=>({pid:'p'+i,nm:'J'+i,lk:'hero',T:T.map(m=>cbMon(cbSnap(cbCopy(m)))),br:{b:Math.random()<.7,b2:Math.random()<.3}});
 const chk=(E,ev,v)=>{if(G!==G0)throw new Error('G non restauré');if(B!==null)throw new Error('B non restauré');for(const e of ev){if(!KN.has(e.k))throw new Error('événement inconnu '+e.k);if(e.k==='say'&&(typeof e.t!=='string'||/undefined|NaN|\[object/.test(e.t)))throw new Error('texte invalide '+e.t)}
  for(const a of E.A)if(a)for(const m of a.T){if(!(m.hp>=0&&m.hp<=m._S.hp&&Number.isInteger(m.hp)))throw new Error('PV hors bornes '+m.sp+' '+m.hp);if(m.pp.some(p=>p<0))throw new Error('PP négatifs')}
  const F=E.F.m;if(!(F.hp>=0&&F.hp<=F._S.hp))throw new Error('PV sauvage hors bornes');if(v.ph==='act')for(const a of v.A)if(a&&!a.out&&E.A[a.s].T[a.a].hp<=0)throw new Error('K.O. en jeu en phase act');
  if(v.N!==Math.max(1,v.A.filter(a=>a&&!a.out).length)&&v.ph!=='end')throw new Error('puissance incohérente '+v.N);const s=JSON.stringify({ev,v});if(s.length>55000)throw new Error('message trop gros '+s.length)};
 // 1) Combats aléatoires
 let n=0,steps=0;const ends={},kinds={};
 for(let b=0;b<300;b++){const E=cbEngine(cbMon(cbSnap(cbCopy(rmon()))),{sky:Math.random()<.3?{k:'rain',n:99}:null});const T0=team(rnd(1,6));if(!T0.some(alive))T0[0].hp=1;
  E.host({pid:'h',nm:'Hôte',lk:'hero',T:T0.map(m=>cbMon(cbSnap(cbCopy(m)))),a:Math.max(0,T0.findIndex(alive)),stg:{atk:0,def:0,spd:0},ev:0,evOn:1});let v=E.view(),k=0,pid=1;
  while(v.ph!=='end'&&k++<300){const o={cs:{}},r=Math.random();
   if(r<.15){const T=team(rnd(1,6));if(T.some(alive))(o.add=[]).push(ally(pid++,T))}
   const live=v.A.filter(a=>a&&!a.out);if(r>.97&&live.length>1)o.gone=[pick(live.filter(a=>a.s)).s].filter(x=>x!=null);if(r>.94&&r<=.97&&live.length>1)o.lv=[pick(live.filter(a=>a.s)).s].filter(x=>x!=null);
   for(const a of live){const x=Math.random();o.cs[a.s]=x<.03?{run:1}:x<.06?{lv:1}:x<.12?{w:rnd(-1,7)}:x<.18?(()=>{const it=pick(USE);return IT[it][4]==='ball'?{ball:it}:{it,t:rnd(-1,6)}})():x<.2?{}:{m:rnd(-1,4),e:Math.random()<.5?1:0};if(v.ph==='rep')o.cs[a.s]={r:rnd(-1,6)}}
   const res=E.step(o);v=E.view();chk(E,res.ev,v);for(const e of res.ev)kinds[e.k]=(kinds[e.k]||0)+1;steps++}
  ok(v.ph==='end'||k>=300,'fin');ends[v.w]=(ends[v.w]||0)+1;n++;if(b%100===99)L('combats',n,'étapes',steps)}
 ok(n===300,`${n} combats aléatoires, ${steps} étapes, fins ${JSON.stringify(ends)}`);L('événements',JSON.stringify(kinds));
 for(const k of['join','left','pw','item','ball','run','ko','end'])ok(kinds[k]>0,'événement '+k+' vu');
 // 2) Équilibrage : équipes cohérentes (niveau de la créature +3), attaques automatiques, selon le nombre de joueurs
 const SPW=Object.values(MAPS).flatMap(M=>(M.enc||[]).map(e=>e[0])).filter(k=>SP[k]),bal={};
 for(const N of[1,2,3,4]){let w=0,turns=0,dmgT=0,lost=0;for(let b=0;b<300;b++){const lv=rnd(10,40),E=cbEngine(cbMon(cbSnap(cbCopy(mon(pick(SPW),lv)))));const mk=()=>[mon(pick(SPW),lv+3),mon(pick(SPW),lv+1),mon(pick(SPW),lv)].map(m=>cbMon(cbSnap(cbCopy(m))));
   E.host({pid:'h',nm:'H',lk:'hero',T:mk(),a:0,stg:{},ev:0,evOn:0});const add=[];for(let i=1;i<N;i++)add.push({pid:'p'+i,nm:'J'+i,lk:'hero',T:mk(),br:{}});E.step({add,cs:{}});let v=E.view(),k=0;
   const hp0=E.A.map(a=>a.T.reduce((s,m)=>s+m.hp,0));while(v.ph!=='end'&&k++<80){E.step({cs:{}});v=E.view()}
   if(v.w==='win')w++;turns+=v.turn;dmgT+=E.A.reduce((s,a,i)=>s+1-a.T.reduce((t,m)=>t+m.hp,0)/hp0[i],0)/N;lost+=E.A.reduce((s,a)=>s+a.T.filter(m=>m.hp<=0).length,0)/N}
  bal[N]={victoires:Math.round(w/3)+'%',tours:(turns/300).toFixed(1),pvPerdus:Math.round(dmgT/3)+'%',KO:(lost/300).toFixed(2)}}
 L('équilibrage',JSON.stringify(bal));const p1=parseInt(bal[1].pvPerdus);ok([2,3,4].every(N=>Math.abs(parseInt(bal[N].pvPerdus)-p1)<=12&&parseInt(bal[N].victoires)>=parseInt(bal[1].victoires)-8),'à plusieurs, chaque joueur encaisse à peu près autant qu\'en solo (17.0)');
 // 3) Relecture visuelle complète (hôte, puis invité)
 for(const me of[0,1]){const foe=mon('rocaillon',22),E=cbEngine(cbMon(cbSnap(cbCopy(foe))));const T=[mon('brasilion',24),mon('goutelin',22)],mk=a=>a.map(m=>cbMon(cbSnap(cbCopy(m))));
  E.host({pid:'h',nm:'Alice',lk:'girl',T:mk(T),a:0,stg:{},ev:0,evOn:1});const C={id:'t'+me,host:me?0:1,me,real:me?[]:T,oth:[],N:1,part:new Set(),o:{}};
  mode='battle';B={coop:null,foes:[],fi:0,foe:null,me:null,tr:null,o:{},bgk:'plaine',stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],shake:0,tint:null,pf:{f:0,m:0},sky:null,part:new Set(),items:0,lvl:0,ev:[0,0],evUsed:[0,0],evF:[0,0],evOn:[1,0],awk:new Set(),awkC:new Map(),bend:new Set(),turn:0,arm:0,fo:{x:0,y:0,v:1,s:1,b:0},mo:{x:0,y:0,v:1,s:1,b:0},dh:[0,0],hf:1,hm:1,trX:null,showFoe:1,ball:null};
  let r=E.step({add:[{pid:'b',nm:'Bob',lk:'scout',T:mk([mon('pousseron',23),mon('flamiot',20)]),br:{b:1}}]}),v=E.view();
  if(me){C.real=[];cbSetup(C,E.info(),v);await cbSendAnim(C,1)}else{cbSetup(C,{...E.info(),A:[E.info().A[0]]},{...v,A:[v.A[0]],N:1});for(const e of r.ev)await cbEv(C,e);cbView(C,v)}
  ok(C.D[0]&&C.D[1]&&C.N===2&&B.foe.hp===v.F.hp,'deux joueurs à l\'écran, puissance x2 (vue '+me+')');await SNAP('groupe2-'+me);
  r=E.step({add:[{pid:'c',nm:'Chloé',lk:'kid',T:mk([mon('noctyrex',21)]),br:{}},{pid:'d',nm:'Dany',lk:'camper',T:mk([mon('lueurette',19)]),br:{}}]});v=E.view();for(const e of r.ev)await cbEv(C,e);cbView(C,v);
  ok(C.oth.length===3&&C.N===v.N&&v.Nmax===4,'quatre joueurs, puissance x'+C.N);await SNAP('groupe4-'+me);let k=0;
  while(v.ph!=='end'&&k++<40){r=E.step({cs:{0:{m:0,e:1},1:{m:1,e:1}}});v=E.view();for(const e of r.ev)await cbEv(C,e);ok(cbView(C,v)&&B.me===cbAct(C,me)&&B.dh[1]===B.foe.hp,'tour '+k+' relu');if(k===1)await SNAP('tour-'+me)}
  ok(v.ph==='end'&&C.end,'combat relu jusqu\'au bout : '+C.end?.w);B=null;mode='world'}
 ok(G===G0&&G.party.length===2,'partie intacte');L('done')}
