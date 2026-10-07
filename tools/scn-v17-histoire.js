// Test 17.0 (scènes d'histoire partagées, deux navigateurs, aventure à plusieurs) : case piégée de la Forêt Murmure (Kael, cinématique et combat
// à deux, Bob était ailleurs dans la forêt), entrée de Cendreville (cinématique sans combat vécue par Bob déjà sur place, récompenses pour les deux), ami occupé qui rattrape la scène après coup (résultat repris,
// sans prime), réglage « ne pas suivre » (aide en combat mais pas de scène), légendaire attrapé par l'un (il disparaît chez l'autre, 17.1),
// meneur qui se déconnecte en plein combat de scène.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const setup=async(nm,lk,party,map,x,y,d)=>{G.coop={code:'HIST',t0:Date.now(),mates:{}};SLOT='c:HIST';Object.assign(f(),{starter:'flamiot',intro:3,intro3:1,badge:0,tip_evr:1,rival1:1});G.keys.bracelet=1;G.keys.dex=1;
  G.party=party;G.party.forEach(m=>m.aff=150);G.net={n:nm,lk};G.repel=9999;G.bag={potion:3};G.t=420*3+100;for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap(map,x,y,d);await wait(200)};
 const team=lv=>[mon('goutelin',lv),mon('pousseron',lv-1),mon('flamiot',lv-2)];
 return{
 A:async()=>{const AP=AUTO.pick,Z={ball:0,hold:0};AUTO.hold=m=>Z.hold&&m?.opts?.[0]==='ATTAQUE';AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(Z.ball&&o[0]==='ATTAQUE'&&o[1]==='SAC')return 1;return AP(m)};
  await setup('Alice','girl',team(26),'foret',18,5,1);NET.join('HIST');ok(await until(()=>isAdvMate(peer('Bob'))),'Bob dans l\'aventure');await BAR('in');
  // 1) Case piégée : Kael surgit au nord de la forêt
  loadMap('foret',18,4,1);await run(onStep);ok(f().rival2===1&&window.CBLAST?.tr==='Kael'&&window.CBLAST.Nmax===2,'Kael affronté à deux dans la Forêt Murmure');const k1=await BAR('kael');ok(k1.rival2&&k1.map==='foret','Bob a vécu la scène avec Alice');
  // 2) Entrée de Cendreville pendant l'éclipse : Brasia dégage la Route 2 (cinématique sans combat)
  Object.assign(f(),{eclipse:1,boss:1,badge:1,mine:1});delete f().r2;loadMap('route1',9,1,1);await BAR('eclipse');const ts=G.bag.totalsoin|0;
  await run(()=>warp('ville',9,7,0));ok(f().r2===1&&(G.bag.totalsoin|0)===ts+3,'Route 2 dégagée, 3 Total Soin');const e1=await BAR('eclipse-fin');ok(e1.r2&&e1.ts,'Bob a vu la scène de Brasia et reçu ses Total Soin');
  // 3) Bob est occupé : Alice bat la Fillette Lina seule, Bob rattrape la scène ensuite (résultat repris, sans prime)
  G.party=team(60);healAll();loadMap('route1',7,11,2);await BAR('occupe');await run(interact);ok(f().t_lina===1&&window.CBLAST?.Nmax===1,'Lina battue par Alice seule (Bob occupé)');const o1=await BAR('occupe-fin');ok(o1.t_lina&&o1.money===o1.m0,'Bob a rattrapé la scène : Lina battue chez lui aussi, sans prime');
  // 4) Bob ne suit plus les scènes : il vient quand même aider au combat contre la Scout Nina, sans la scène
  healAll();loadMap('foret',6,4,1);await BAR('nesuitpas');await run(interact);ok(f().t_nina===1&&window.CBLAST?.Nmax===2,'Nina battue avec l\'aide de Bob');const n1=await BAR('nesuitpas-fin');ok(!n1.t_nina&&n1.money===n1.m0+400&&n1.stay,'Bob a aidé (prime) sans vivre la scène (Nina reste à battre chez lui)');
  // 5) Légendaire : Alice attrape Solarion, il disparaît du monde de Bob
  Object.assign(f(),{balance:1});delete f().eclipse;G.party=team(55);healAll();G.bag={cyclecapsule:1};loadMap('mont',9,2,1);await BAR('legende');Z.ball=1;await run(interact);Z.ball=0;
  ok(f().legS===1&&G.party.some(m=>m.sp==='solarion'),'Solarion attrapé par Alice');const l1=await BAR('legende-fin');ok(l1.legS&&!l1.visible&&!l1.has&&l1.lg==='Alice','chez Bob, Solarion a disparu (capturé par Alice)');
  // 6) Alice se déconnecte en plein combat de scène (Botaniste Iris) : Bob s'en sort proprement
  healAll();loadMap('foret',22,12,3);await BAR('coupure');Z.hold=1;const pi=run(interact);ok(await until(()=>CB&&CB.vE?.A.filter(a=>a&&!a.out).length>=2,60000),'Bob est dans le combat d\'Alice');await BAR('dedans');NET.leave();Z.hold=0;await pi;
  ok(idle()&&f().t_iris===1,'Alice finit seule le combat contre Iris');await BAR('coupure-fin');NET.join('HIST');ok(await until(()=>isAdvMate(peer('Bob')),30000),'Alice reconnectée');await BAR('fin');NET.leave();L('done')},
 B:async()=>{const AP=AUTO.pick;AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;return AP(m)};
  await setup('Bob','scout',team(26),'foret',6,8,0);NET.join('HIST');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>f().rival2===1&&idle(),240000),'scène de Kael suivie');ok(G.map==='foret'&&G.x===18&&G.y===4&&window.CBLAST?.tr==='Kael'&&window.CBLAST.Nmax===2,'Bob a rejoint Alice dans la forêt, Kael affronté avec elle');await BAR('kael',{rival2:f().rival2,map:G.map});
  Object.assign(f(),{eclipse:1,boss:1,badge:1,mine:1});delete f().r2;loadMap('ville',4,13,0);const ts=G.bag.totalsoin|0;await BAR('eclipse');ok(await until(()=>f().r2===1&&idle(),240000),'scène de Brasia suivie');ok(G.map==='ville'&&G.x===9&&G.y===7,'Bob, déjà dans Cendreville, a rejoint Alice pour la scène');await BAR('eclipse-fin',{r2:f().r2,ts:(G.bag.totalsoin|0)===ts+3});
  // 3) occupé pendant la scène de Lina, puis rattrapage
  G.party=team(60);healAll();loadMap('route1',4,8,0);const m0=G.money;await BAR('occupe');const hold=run(()=>wait(25000));ok(await until(()=>!busy,60000),'Bob se libère');await hold;
  ok(await until(()=>f().t_lina===1&&idle(),120000),'Bob rattrape la scène de Lina');ok(G.map==='route1','Bob transporté devant Lina');await BAR('occupe-fin',{t_lina:f().t_lina,money:G.money,m0});
  // 4) ne plus suivre les scènes
  NG().fs=0;SCQ.length=0;healAll();loadMap('route1',4,8,0);const m1=G.money;await BAR('nesuitpas');ok(await until(()=>!!CBG,60000),'Bob rejoint le combat d\'Alice en renfort');ok(await until(()=>idle(),120000),'combat fini');
  await wait(1500);await BAR('nesuitpas-fin',{t_nina:f().t_nina|0,money:G.money,m0:m1,stay:G.map==='route1'&&G.x===4&&G.y===8});NG().fs=1;SCQ.length=0;
  // 5) légendaire
  Object.assign(f(),{balance:1});delete f().eclipse;G.party=team(55);healAll();loadMap('mont',12,10,0);await BAR('legende');ok(await until(()=>idle()&&window.CBLAST?.r==='run'&&window.CBLAST?.by===0,180000),'Bob a combattu Solarion avec Alice, qui l\'a attrapé');
  await BAR('legende-fin',{legS:f().legS|0,visible:npcs(MAPS.mont).some(n=>n.sp==='solarion'),has:G.party.some(m=>m.sp==='solarion'),lg:G.coop.lg?.solarion||''});
  // 6) coupure
  healAll();loadMap('route1',4,8,0);await BAR('coupure');ok(await until(()=>!!CBG,90000),'Bob suit la scène d\'Iris et entre dans le combat');await BAR('dedans');ok(await until(()=>idle(),120000),'Bob revient au monde malgré la coupure');ok(!f().t_iris,'combat interrompu : Iris reste à battre chez Bob');
  await BAR('coupure-fin');ok(await until(()=>isAdvMate(peer('Alice')),30000),'Alice revenue');await BAR('fin');NET.leave();L('done')}}})()
