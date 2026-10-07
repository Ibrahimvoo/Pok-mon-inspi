// Test 17.0 (trois joueurs, SIDES=A,B,C, salon ordinaire) : amis ajoutés par les menus (AJOUTER EN AMI), ralliement automatique aux combats
// depuis une autre carte, Chloé en mode « demander » refuse puis rejoint en plein combat (REJOINDRE SON COMBAT) ; même fin sur les trois écrans,
// EXP de groupe et vraies créatures mises à jour ; Bob quitte un combat en cours ; combat contre un dresseur rejoint par une amie (prime pour
// chacun) ; les amis restent amis dans un autre salon ; un ami retiré ne rejoint plus.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const setup=async(nm,lk,party,map,x,y)=>{Object.assign(f(),{starter:'flamiot',intro:3,badge:1,tip_evr:1});G.keys.bracelet=1;G.party=party;G.party.forEach(m=>m.aff=120);G.net={n:nm,lk};G.repel=9999;G.bag={potion:3,capsule:2};
  for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap(map,x,y,0);await wait(200)};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const xp=()=>G.party.reduce((s,m)=>s+m.exp,0),peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ;
 return{
 A:async()=>{const AP=AUTO.pick,Z={act:null,hold:1,who:''};AUTO.hold=m=>Z.hold&&!!CB&&CB.vE?.A.filter(a=>a&&!a.out).length>=2&&!CB.pj.length&&(CB.vE?.Nmax|0)<3&&m?.opts?.[0]==='ATTAQUE';
  AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if((m.title==='Bob'||m.title==='Chloé')&&o.includes('COMBAT'))return Math.max(0,o.indexOf(Z.act));return AP(m)};
  await setup('Alice','girl',[mon('brasilion',34),mon('goutelin',32)],'ville',9,7);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'Bob et Chloé dans le salon');await BAR('in');
  const pb=peer('Bob'),pc=peer('Chloé');ok(pb&&pc&&pb.id&&pc.id,'identités reçues');
  Z.act='AJOUTER EN AMI';await run(()=>friendMenu(pb.pid));await run(()=>friendMenu(pc.pid));ok(isFriend(pb)&&isFriend(pc)&&matePeers().length===2,'Bob et Chloé ajoutés en amis par les menus');await BAR('amis1');await BAR('amis2');
  // 1) Combat sauvage d'Alice : Bob arrive tout seul d'une autre carte, Chloé (mode « demander ») refuse puis rejoint en plein combat
  const x0=xp(),foe=mon('rocaillon',30,{wild:1});await SNAP('avant');
  const done=run(()=>battle([foe]));ok(await until(()=>B?.coop&&CB,8000),'le combat sauvage passe en mode groupe');
  ok(await until(()=>CB?.vE?.A.filter(a=>a&&!a.out).length>=2,60000),'Bob a rejoint automatiquement');await until(()=>CB?.vE?.Nmax>=3||!CB,90000);Z.hold=0;ok(window.CBLAST?.Nmax>=3||CB?.vE?.Nmax>=3,'Chloé a rejoint en plein combat : trois joueurs');await SNAP('trio');
  await done;ok(mode==='world'&&!B&&!CB,'retour au monde');const R=window.CBLAST;ok(R&&R.Nmax===3,'fin : '+JSON.stringify(R));
  if(R.w==='win'||R.w==='catch')ok(xp()>x0&&(NG().cw|0)===1,'EXP de groupe gagnée et victoire comptée');const all=await BAR('fin1',{w:R.w,by:R.by});ok(all.B.w===R.w&&all.C.w===R.w,'même fin sur les trois écrans');
  // 2) Bob part en cours de route
  healAll();await wait(500);const done2=run(()=>battle([mon('rocaillon',36,{wild:1})]));ok(await until(()=>CB?.vE?.A.filter(a=>a&&!a.out).length>=2,60000),'Bob revient aider');
  ok(await until(()=>CB?.vE?.A.find(a=>a&&a.nm==='Bob')?.out===1||!CB,120000),'Bob quitte le combat');await done2;ok(mode==='world'&&!B,'deuxième combat terminé');await BAR('fin2');
  // 3) Combat de Bob contre un dresseur : Alice le rejoint, prime pour les deux
  healAll();const m0=G.money;await BAR('dresseur');ok(await until(()=>!!CBG,60000),'Alice rejoint le combat de Bob contre le dresseur');ok(await until(()=>idle(),240000),'combat contre le dresseur terminé');
  const RT=window.CBLAST;ok(RT.tr==='Gamin Léo'&&RT.me>=1,'Alice a combattu le Gamin Léo avec Bob');if(RT.w==='win')ok(G.money===m0+120&&!f().t_leo,'prime reçue (Léo reste à battre dans le monde d\'Alice)');await BAR('dresseur-fin',RT.w);
  // 4) Autre salon : les amis restent amis
  NET.leave();await wait(400);NET.join('AMIS');ok(await until(()=>matePeers().length===2,30000),'nouveau salon : Bob et Chloé toujours amis');await BAR('salon2');
  ok(await until(()=>!!CBG,60000),'combat de Chloé rejoint automatiquement dans le nouveau salon');ok(await until(()=>idle(),200000),'combat de Chloé terminé');await BAR('fin3');
  // 5) Bob retire Alice de ses amis : il ne la rejoint plus
  await BAR('retire');healAll();const done5=run(()=>battle([mon('ratounet',20,{wild:1})]));ok(await until(()=>B?.coop&&CB,8000),'combat en groupe (Chloé est toujours une amie)');await done5;
  ok(window.CBLAST&&!JSON.stringify(window.CBLAST).includes('"left":1')&&(window.CBLAST.Nmax|0)<=2,'Bob, qui a retiré Alice, n\'est pas venu');await BAR('fin5');NET.leave();L('done')},
 B:async()=>{const AP=AUTO.pick,Z={leave:0,n:0,act:''};AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(o[3]==='PARTIR'&&o[0]==='ATTAQUE'&&Z.leave){Z.n++;if(Z.n>=1)return 3}if((m.title==='Alice'||m.title==='Chloé')&&o.includes('COMBAT'))return Math.max(0,o.indexOf(Z.act));return AP(m)};
  await setup('Bob','scout',[mon('pousseron',33),mon('flamiot',31)],'route1',5,8);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'salon complet');await BAR('in');
  ok(await until(()=>isFriend(peer('Alice')),60000),'demande d\'ami d\'Alice acceptée');await BAR('amis1');Z.act='AJOUTER EN AMI';await run(()=>friendMenu(peer('Chloé').pid));ok(isFriend(peer('Chloé')),'Bob ajoute aussi Chloé');Z.act='';await BAR('amis2');const x0=xp(),hp0=JSON.stringify(G.party.map(m=>m.hp)),pos0=[G.map,G.x,G.y];
  ok(await until(()=>!!CBG,90000),'Bob est appelé et entre dans le combat d\'Alice, depuis la Route 1');await until(()=>!CBG&&mode==='world'&&!busy,400000);
  const R=window.CBLAST;ok(R&&R.me>=1,'fin vue par Bob : '+JSON.stringify(R));if(R.w==='win'||R.w==='catch')ok(xp()>x0,'Bob gagne de l\'EXP');ok(JSON.stringify(G.party.map(m=>m.hp))!==hp0||R.w!=='win','PV réels mis à jour');
  ok(G.map===pos0[0]&&G.x===pos0[1]&&G.y===pos0[2],'Bob revient sur la Route 1, là où il était');
  await BAR('fin1',{w:R.w,by:R.by});healAll();Z.leave=1;Z.n=0;ok(await until(()=>!!CBG,90000),'Bob rejoint le deuxième combat');ok(await until(()=>!CBG&&mode==='world'&&!busy,200000),'Bob est reparti');ok(window.CBLAST.left===1,'départ volontaire');Z.leave=0;await BAR('fin2');
  // Combat contre le Gamin Léo (Route 1)
  healAll();const m0=G.money;loadMap('route1',11,3,3);await wait(300);await BAR('dresseur');await run(interact);const RT=window.CBLAST;ok(RT.tr==='Gamin Léo'&&RT.me===0&&RT.Nmax===3,'Bob a affronté Léo avec ses deux amies');
  if(RT.w==='win')ok(f().t_leo===1&&G.money===m0+120,'Léo battu, prime pour Bob');await BAR('dresseur-fin',RT.w);
  NET.leave();await wait(400);NET.join('AMIS');ok(await until(()=>matePeers().length===2,30000),'nouveau salon : amis retrouvés');await BAR('salon2');ok(await until(()=>!!CBG,60000),'Bob rejoint aussi le combat de Chloé');ok(await until(()=>idle(),200000),'fini');await BAR('fin3');
  // Bob retire Alice
  Z.act='RETIRER DES AMIS';await run(()=>friendMenu(peer('Alice').pid));ok(!isFriend(peer('Alice')),'Alice retirée des amis de Bob');await BAR('retire');await wait(4000);ok(!CBG&&idle(),'Bob ne rejoint plus Alice');await BAR('fin5');NET.leave();L('done')},
 C:async()=>{const AP=AUTO.pick,Z={no:1,act:null};AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(o[0]==='OUI'&&ui.text?.s?.join(' ').includes('Le rejoindre')&&Z.no)return 1;if(m.title==='Alice'&&o.includes('COMBAT'))return Math.max(0,o.indexOf(Z.act));
   if(m.title==='Réglages en ligne')return Z.set?(Z.set=0,0):2;if(o.includes('RÉGLAGES')&&o.includes('JOUEURS')){const r=Math.max(0,o.indexOf(Z.menu));Z.menu='RETOUR';return r}return AP(m)};
  await setup('Chloé','kid',[mon('noctyrex',33),mon('lueurette',30)],'ville',3,12);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'salon complet');await BAR('in');
  ok(await until(()=>isFriend(peer('Alice')),60000),'demande d\'ami d\'Alice acceptée');await BAR('amis1');ok(await until(()=>isFriend(peer('Bob'))&&!busy,60000),'demande d\'ami de Bob acceptée');
  Z.set=1;Z.menu='RÉGLAGES';await run(onlineMenu);ok(NG().aj==='ask','réglage : demander avant de rejoindre');await BAR('amis2');
  const pa=peer('Alice');ok(await until(()=>pa.cb&&pa.cb.n>=2&&CBSKIP.has(pa.cb.i)&&!busy,90000),'proposition de rejoindre refusée, Bob déjà avec Alice');await wait(1500);Z.no=0;Z.act='REJOINDRE SON COMBAT';
  await run(()=>friendMenu(pa.pid));Z.no=1;const R=window.CBLAST;ok(R&&R.Nmax===3,'Chloé a combattu avec les deux autres : '+JSON.stringify(R));
  await BAR('fin1',{w:R.w,by:R.by});NG().aj='auto';ok(await until(()=>!!CBG,60000),'Chloé (de nouveau en mode automatique) rejoint le deuxième combat');ok(await until(()=>idle(),200000),'deuxième combat fini');await BAR('fin2');
  await BAR('dresseur');ok(await until(()=>!!CBG,60000),'Chloé rejoint aussi le combat de Bob contre Léo');ok(await until(()=>idle(),240000),'fini');await BAR('dresseur-fin');
  NET.leave();await wait(400);NET.join('AMIS');ok(await until(()=>matePeers().length===2,30000),'nouveau salon : amis retrouvés');await BAR('salon2');healAll();
  await run(()=>battle([mon('ratounet',22,{wild:1})]));ok((window.CBLAST.Nmax|0)===3,'Alice et Bob rejoignent le combat de Chloé');await BAR('fin3');
  await BAR('retire');ok(await until(()=>!!CBG,30000),'Chloé rejoint toujours Alice');ok(await until(()=>idle(),200000),'fini');await BAR('fin5');NET.leave();L('done')}}})()
