// Test 15.0 (arène, un seul navigateur) : moteur de combat en ligne soumis à des centaines de combats aléatoires
// (équipes, objets, breloques, tempéraments, choix invalides, changements, Éveil, abandons), puis relecture visuelle complète d'un combat.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',30),mon('goutelin',25)];G.keys.bracelet=1;const G0=G,KN=new Set(['say','send','out','vfx','vst','hit','hp','st','stfx','stg','stv','sky','skyn','tal','pop','miss','prot','burst','hop','ev','evf','awk','ko','end']);
 const SPK=Object.keys(SP),HELD=Object.keys(IT).filter(k=>IT[k][4]==='held'),pick=a=>a[Math.random()*a.length|0];
 const rmon=()=>{const m=mon(pick(SPK),rnd(5,80));m.nat=pick(NATK);m.item=Math.random()<.6?pick(HELD):null;m.eq=Math.random()<.5?pick(BQK):null;m.aff=rnd(0,255);m.sh=Math.random()<.1?1:0;
  if(Math.random()<.5){const all=Object.keys(MV).filter(x=>x!=='lutte');m.moves=[...new Set([pick(all),pick(all),pick(all),pick(all)])];m.pp=m.moves.map(x=>MV[x].pp)}return m};
 let battles=0,turns=0,ends={0:0,1:0,'-1':0},ff=0,maxT=0;const kinds={};
 for(let b=0;b<400;b++){const n=Math.random()<.5?3:6,l50=Math.random()<.5,ru={n,l50:l50?1:0,ph:rnd(0,3)};
  const S=[0,1].map(()=>Array.from({length:rnd(1,n)},()=>pvpSnap(pvpCopy(rmon(),l50))));const T=S.map(s=>pvpTeam(s,n,l50));ok(T[0]&&T[1],'équipes valides');
  const E=pvpEngine(T[0],T[1],ru,[{b:Math.random()<.7,b2:Math.random()<.3},{b:Math.random()<.7,b2:Math.random()<.3}]);let ev=E.start(),v=E.view(),k=0;
  const chk=(ev,v)=>{if(G!==G0)throw new Error('G non restauré');if(B!==null)throw new Error('B non restauré');for(const e of ev){if(!KN.has(e.k))throw new Error('événement inconnu '+e.k);kinds[e.k]=(kinds[e.k]||0)+1;if(e.k==='say'&&(typeof e.t!=='string'||/undefined|NaN/.test(e.t)))throw new Error('texte invalide '+e.t)}
   for(const s of[0,1])for(const m of T[s]){if(!(m.hp>=0&&m.hp<=m._S.hp&&Number.isInteger(m.hp)))throw new Error('PV hors bornes '+m.sp+' '+m.hp);if(m.pp.some(p=>p<0))throw new Error('PP négatifs')}
   if(v.ph==='act')for(const s of[0,1])if(T[s][v.a[s]].hp<=0)throw new Error('créature K.O. en jeu en phase act');
   if(v.ph==='rep')for(const s of[0,1])if(v.need[s]&&!T[s].some((m,i)=>m.hp>0&&i!==v.a[s]))throw new Error('remplacement impossible');
   JSON.stringify({ev,v})};
  chk(ev,v);
  while(v.ph!=='end'&&k++<400){const rc=s=>{const r=Math.random();if(r<.004)return{f:1};if(r<.12)return{w:rnd(-1,6)};if(r<.15)return{m:'L'};return{m:rnd(-1,4),e:Math.random()<.5?1:0}};
   if(v.ph==='act'){ev=E.act([rc(0),rc(1)])}else ev=E.rep([v.need[0]?{r:rnd(-1,6)}:null,v.need[1]?{r:rnd(-1,6)}:null]);v=E.view();chk(ev,v);turns++}
  ok(v.ph==='end'||k>=400,'fin de combat');if(k<400){ends[v.w]++;if(v.why==='ff')ff++}maxT=Math.max(maxT,k);battles++;if(b%100===99)L('combats',battles,'tours',turns)}
 ok(battles===400,`${battles} combats, ${turns} tours, fins ${JSON.stringify(ends)}, abandons ${ff}, max ${maxT} tours`);L('événements',JSON.stringify(kinds));
 // Abandon direct et égalité
 {const T0=[pvpMon(pvpSnap(pvpCopy(mon('flamiot',20))))],T1=[pvpMon(pvpSnap(pvpCopy(mon('goutelin',20))))],E=pvpEngine(T0,T1,{n:3,l50:0,ph:1},[{},{}]);E.start();const ev=E.ff(1);ok(E.view().w===0&&E.view().why==='ff'&&ev.some(e=>e.k==='end'),'abandon : victoire de l\'autre côté')}
 // Les copies ne touchent pas l'équipe réelle
 {const m=G.party[0],h=m.hp,lv=m.lv,c=pvpCopy(m,1);c.hp=0;c.pp[0]=0;ok(m.hp===h&&m.lv===lv&&m.pp[0]>0&&c.lv===50&&c._S&&st(c).hp===c._S.hp,'copie indépendante, niveau 50 et stats figées')}
 // Relecture visuelle complète d'un combat (les deux points de vue)
 for(const me of[0,1]){const ru={n:3,l50:1,ph:3},S0=[mon('brasilion',40),mon('goutelin',30),mon('pousseron',30)].map(m=>pvpSnap(pvpCopy(m,1))),S1=[mon('noctyrex',40),mon('flamiot',30)].map(m=>pvpSnap(pvpCopy(m,1)));
  const E=pvpEngine(S0.map(o=>pvpMon(o,1)),S1.map(o=>pvpMon(o,1)),ru,[{b:1},{b:1}]),A={me,D:[S0.map(o=>pvpMon(o,1)),S1.map(o=>pvpMon(o,1))],act:[0,0],nm:['Alice','Bob'],lk:['girl','scout'],br:[{b:1},{b:1}],ru};
  mode='battle';B=pvpDisp(A);B.trX=null;let ev=E.start();for(const e of ev)await pvpEv(A,e);ok(pvpView(A,E.view()),'vue initiale');let k=0;
  while(A.v.ph!=='end'&&k++<60){ev=A.v.ph==='act'?E.act([{m:0,e:1},{m:1,e:1}]):E.rep([{r:-1},{r:-1}]);for(const e of ev)await pvpEv(A,e);ok(pvpView(A,E.view())&&B.me===pvpAct(A,me)&&B.foe===pvpAct(A,1-me),'tour '+k+' relu');if(k===2)await SNAP('pvp'+me)}
  ok(A.v.ph==='end','combat relu jusqu\'au bout (vue '+me+')');B=null;mode='world'}
 ok(G===G0&&G.party.length===2&&G.party[0].hp===st(G.party[0]).hp,'partie intacte');L('done')}
