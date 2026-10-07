// Test 17.0 (aventure à trois, SIDES=A,B,C) : trois joueurs de la même aventure arrivent au labo à des moments différents ; Kael attend que
// chacun ait choisi sa créature puis affronte les trois ensemble ; ensuite une scène de dresseur déclenchée par Chloé est vécue par les deux autres.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX,peers=()=>[...NET.peers.values()];
 const setup=async(nm,lk,x)=>{const AP=AUTO.pick;AUTO.pick=m=>{const cb=cbBare(m);return cb!=null?cb:AP(m)};G.coop={code:'TRIO',t0:Date.now(),mates:{}};SLOT='c:TRIO';Object.assign(f(),{intro:3,intro3:1,tip_evr:1});G.net={n:nm,lk};G.repel=9999;
  for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap('lab',x,4,1);await wait(200);NET.join('TRIO');ok(await until(()=>peers().filter(isAdvMate).length===2),nm+' : les deux autres sont dans l\'aventure');await BAR('in')};
 const kael=async(nm)=>{await run(interact);const R=window.CBLAST;ok(f().starter&&f().rival1&&G.keys.dex&&R?.tr==='Kael'&&R.Nmax===3,nm+' a affronté Kael avec les deux autres : '+JSON.stringify(R));return R};
 const after=async(nm,sp)=>{G.party=[mon(sp,16),mon('pousseron',14)];healAll();const m0=G.money;await BAR('kael-fin',{rs:f().rs});return m0};
 return{
 A:async()=>{await setup('Alice','girl',3);const R=await kael('Alice');const m0=await after('Alice','flamiot');loadMap('ville',9,7,0);await BAR('scene');
  ok(await until(()=>f().t_leo===1&&idle(),180000),'Alice a suivi la scène de Chloé');ok(G.money===m0+120&&G.map==='route1','prime et transport');const all=await BAR('fin',{w:window.CBLAST.w,N:window.CBLAST.Nmax});ok(all.B.N===3&&all.C.N===3&&all.B.w===all.A.w&&all.C.w===all.A.w,'même combat à trois chez tout le monde');NET.leave();L('done')},
 B:async()=>{await setup('Bob','scout',4);await wait(2500);await kael('Bob');const m0=await after('Bob','goutelin');loadMap('bourg',5,7,0);await BAR('scene');
  ok(await until(()=>f().t_leo===1&&idle(),180000),'Bob a suivi la scène de Chloé');ok(G.money===m0+120,'prime');await BAR('fin',{w:window.CBLAST.w,N:window.CBLAST.Nmax});NET.leave();L('done')},
 C:async()=>{await setup('Chloé','kid',5);ok(await until(()=>peers().length===2&&peers().every(P=>P.kw),60000),'Alice et Bob attendent devant Kael');await kael('Chloé');const m0=await after('Chloé','pousseron');loadMap('route1',11,3,3);await BAR('scene');
  await run(interact);ok(f().t_leo===1&&G.money===m0+120,'Chloé bat Léo');ok(window.CBLAST.Nmax===3,'à trois');await BAR('fin',{w:window.CBLAST.w,N:window.CBLAST.Nmax});NET.leave();L('done')}}})()
