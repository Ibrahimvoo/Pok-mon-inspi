// Test 18.1 (aventure à plusieurs, deux navigateurs) : Alice parle au Maestro et reçoit une quête ; Bob la reçoit aussi,
// avec l'annonce « NOUVELLE QUÊTE ! » partagée par Alice, et leurs flèches-guides suivent la même étape de l'histoire.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX&&!ui.text,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const setup=async(nm,lk,map,x,y,d)=>{G.coop={code:'QUET',t0:Date.now(),mates:{}};SLOT='c:QUET';Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,
   v18vol:1,v18arr:1,v18ecoute:1,badge5:1,v18faus:1,v18done:1,obsScene:1,selene2done:1,vex2:1,balance:1,tip_evr:1});G.keys.dex=1;G.party=[mon('torrentor',60)];G.net={n:nm,lk};G.repel=9999;G.t=420*3+100;
  for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap(map,x,y,d);await wait(400)};
 return{
 A:async()=>{await setup('Alice','girl','theatre',7,2,1);NET.join('QUET');ok(await until(()=>isAdvMate(peer('Bob'))),'Bob dans l\'aventure');await BAR('in');
  G.dir=1;await run(()=>interact());await until(idle);ok(f().v18partQ===1,'Alice reçoit la quête du Maestro');await until(()=>QT.cur,20000);ok(QT.cur?.t==='La Partition Perdue'&&!QT.cur.from,'Alice : « NOUVELLE QUÊTE ! »');
  const b=await BAR('quete');ok(b&&b.q===1&&b.ann,'Bob a reçu la quête et l\'annonce « partagée par Alice »');GDC={k:''};ok(b.to&&b.to===gdRoute()?.t.m,'Bob et Alice suivent la même flèche ('+b.to+')');
  await BAR('fin');NET.leave();L('done')},
 B:async()=>{await setup('Bob','scout','carnavelle',15,10,1);NET.join('QUET');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>f().v18partQ===1,20000),'Bob : la quête est arrivée');const ann=await until(()=>QT.cur?.t==='La Partition Perdue'&&QT.cur.from==='Alice',8000);QT.hold=1;await SNAP('quete-partagee');QT.hold=0;
  GDC={k:''};const r=gdRoute();L('route',r?.t.m,r?.lbl);await BAR('quete',{q:f().v18partQ,ann:!!ann,to:r?.t.m});await BAR('fin');NET.leave();L('done')}}})()
