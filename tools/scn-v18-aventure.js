// Test 18.0 (aventure à plusieurs, deux navigateurs) : le chapitre du Carnaval des Masques vécu à deux.
// Alice mène, Bob suit : vol de la clé (scène de porte à Volterre), masque de Mirella, sbires bavards, Arène des Masques (reflets et champion
// combattus à deux, badge pour les deux), uniforme, mot de passe du Théâtre, code du robot, Clara, Faustine à deux, retour de la clé ;
// les amis voient le déguisement ; Oasiphant attrapé par Alice disparaît du monde de Bob.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX&&!ui.text,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const pilot=()=>{const AP=AUTO.pick;AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(m.title==='Mot de passe')return 1;if(m.title==='Code d\'accès')return 1;if(o[0]==='OUI'&&o[1]==='NON')return 0;return AP(m)}};
 const setup=async(nm,lk,map,x,y,d)=>{G.coop={code:'CARN',t0:Date.now(),mates:{}};SLOT='c:CARN';Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,tip_evr:1});
  G.keys.bracelet=1;G.keys.dex=1;G.party=[mon('torrentor',75),mon('bourdonnerre',75),mon('phalumine',75),mon('rocaroc',74)];G.party.forEach(m=>m.aff=150);G.net={n:nm,lk};G.repel=9999;G.bag={potion:3};G.money=50000;G.t=420*3+100;
  for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap(map,x,y,d);await wait(200)};
 const step=async(nm,fn)=>{await BAR(nm);await run(fn);await until(idle,60000);return BAR(nm+'-fin',{...f(),dgk:Object.keys(G.keys).filter(k=>k.startsWith('dg_')),clef:!!G.bag.clecabine,mk:[...G.party,...G.box].some(m=>m.sp==='protomk')})};
 const follow=async(nm,c,ms=240000)=>{await BAR(nm);ok(await until(()=>c()&&idle(),ms),'Bob : '+nm);return BAR(nm+'-fin',{...f(),dgk:Object.keys(G.keys).filter(k=>k.startsWith('dg_')),clef:!!G.bag.clecabine,mk:[...G.party,...G.box].some(m=>m.sp==='protomk'),map:G.map})};
 return{
 A:async()=>{pilot();await setup('Alice','girl','volterre',13,1,1);NET.join('CARN');ok(await until(()=>isAdvMate(peer('Bob'))),'Bob dans l\'aventure');await BAR('in');
  G.dir=1;let b=await step('vol',()=>MAPS.volterre.doors['13,0']());ok(f().v18vol&&b.v18vol,'la clé est volée : scène vécue par les deux');
  await run(()=>warp('carnavelle',28,16,2));await until(idle,60000);ok(f().v18arr,'Alice arrive au Carnaval');await BAR('arrivee');
  loadMap('atelier',7,4,1);b=await step('masque',()=>interact());ok(dgHas('masque')&&b.dgk.includes('dg_masque'),'Mirella offre un masque à chacun');
  await dgWear('masque');NET.hi(1);await BAR('masque-porte');const g1=await BAR('vu-masque');ok(g1==='dgmasque','Bob voit Alice masquée');
  loadMap('carnaval',19,8,1);b=await step('sbires',()=>interact());ok(f().v18ecoute&&b.v18ecoute,'les sbires parlent : les deux ont entendu');
  loadMap('gym5',2,3,1);b=await step('reflet0',()=>interact());ok(f().v18fk0&&b.v18fk0&&window.CBLAST?.Nmax===2,'premier reflet battu à deux');
  loadMap('gym5',9,3,1);b=await step('reflet1',()=>interact());ok(f().v18fk1&&b.v18fk1,'second reflet battu');
  loadMap('gym5',5,2,1);G.dir=1;b=await step('arlequin',()=>interact());ok(f().badge5&&b.badge5&&window.CBLAST?.Nmax===2,'Arlequin battu à deux : Badge Masque pour les deux');
  loadMap('atelier',7,4,1);b=await step('uniforme',()=>interact());ok(dgHas('eclipse')&&b.dgk.includes('dg_eclipse'),'uniforme cousu pour les deux');
  await dgWear('eclipse');loadMap('theatre',14,3,1);b=await step('trappe',()=>interact());ok(f().v18trappe&&b.v18trappe,'mot de passe donné : les deux passent');
  loadMap('theatre',13,1,3);await run(()=>MAPS.theatre.doors['14,1']());await until(idle);ok(G.map==='repaire','Alice descend au Repaire');loadMap('repaire',9,2,1);b=await step('robot',()=>interact());ok(f().v18code&&b.v18code,'code accepté par le robot');
  loadMap('repaire',14,5,1);b=await step('clara',()=>interact());ok(f().v18clara&&b.mk,'Clara libérée : Proto-MK pour les deux');
  loadMap('repaire2',6,3,1);b=await step('faustine',()=>interact());ok(f().v18faus&&G.bag.clecabine&&b.v18faus&&b.clef&&window.CBLAST?.Nmax===2,'Faustine battue à deux : chacun a la clé');
  loadMap('volterre',13,1,1);await BAR('volterre');b=await step('cle',()=>MAPS.volterre.doors['13,0']());ok(f().v18done&&b.v18done,'clé rendue : le téléphérique remarche pour les deux');
  // Légendaire unique : Alice attrape Oasiphant, il quitte le monde de Bob
  Object.assign(f(),{balance:1,obsScene:1,v18lamp:1});delete f().eclipse;G.t=420*9+5;G.bag={cyclecapsule:1};loadMap('oasis',17,13,2);await BAR('legende');
  const AP=AUTO.pick;AUTO.pick=m=>m.opts[0]==='ATTAQUE'&&m.opts[1]==='SAC'?1:AP(m);await run(interact);AUTO.pick=AP;
  ok(f().legO&&G.party.some(m=>m.sp==='oasiphant'),'Oasiphant attrapé par Alice');const l=await BAR('legende-fin');ok(l.legO&&!l.vis&&l.lg==='Alice','chez Bob, Oasiphant a disparu (capturé par Alice)');
  await BAR('fin');NET.leave();L('done')},
 B:async()=>{pilot();await setup('Bob','scout','volterre',8,8,1);NET.join('CARN');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  await follow('vol',()=>f().v18vol);
  loadMap('carnavelle',20,16,2);await run(()=>warp('carnavelle',27,16,2));f().v18arr=1;await until(idle,60000);await BAR('arrivee');
  await follow('masque',()=>dgHas('masque'));await BAR('masque-porte');ok(await until(()=>peer('Alice')?.dg==='masque',20000),'Bob reçoit le déguisement d\'Alice');
  loadMap(peer('Alice').map,peer('Alice').x,peer('Alice').y+1>=MAPS[peer('Alice').map].rows.length?peer('Alice').y:peer('Alice').y+1,1);await until(()=>!!peer('Alice')?.g,10000);await BAR('vu-masque',peer('Alice')?.g?.t);
  await follow('sbires',()=>f().v18ecoute);await follow('reflet0',()=>f().v18fk0);await follow('reflet1',()=>f().v18fk1);await follow('arlequin',()=>f().badge5);
  await follow('uniforme',()=>dgHas('eclipse'));await follow('trappe',()=>f().v18trappe);await follow('robot',()=>f().v18code);await follow('clara',()=>f().v18clara);await follow('faustine',()=>f().v18faus);
  loadMap('volterre',12,2,1);await BAR('volterre');await follow('cle',()=>f().v18done);
  Object.assign(f(),{balance:1,obsScene:1,v18lamp:1});delete f().eclipse;G.t=420*9+5;loadMap('route1',10,8,0);await BAR('legende');
  ok(await until(()=>!!G.coop.lg?.oasiphant,240000),'Bob apprend la capture d\'Oasiphant');await BAR('legende-fin',{legO:f().legO,vis:oasiOk(),lg:G.coop.lg.oasiphant});
  await BAR('fin');NET.leave();L('done')}}})()
