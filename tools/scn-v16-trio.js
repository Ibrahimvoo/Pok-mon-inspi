// Test 16.0 (trois joueurs, SIDES=A,B,C) : groupe formé par les menus (FAIRE ÉQUIPE), combat sauvage d'Alice en mode groupe,
// Bob arrive par l'appel à l'aide, Chloé refuse puis rejoint en plein combat par AIDER ; même fin sur les trois écrans, EXP de groupe,
// vraies créatures mises à jour ; puis Bob quitte un deuxième combat en cours de route.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const MP=Object.keys(MAPS).find(k=>MAPS[k].enc&&!isInt(MAPS[k])&&k!=='songe');
 const setup=async(nm,lk,party,i)=>{Object.assign(f(),{starter:'flamiot',intro:3,badge:1,tip_cbask:1,tip_evr:1});G.keys.bracelet=1;G.party=party;G.party.forEach(m=>m.aff=120);G.net={n:nm,lk};G.repel=9999;G.bag={potion:3,capsule:2};
  const M=MAPS[MP],free=(x,y)=>M.rows[y]?.[x]&&!SOLID.has(M.rows[y][x])&&!'~wHLhE='.includes(M.rows[y][x])&&!M.doors?.[x+','+y];let sp=null,c=0;
  for(let y=2;y<M.rows.length-2&&!sp;y++)for(let x=2;x<M.rows[0].length-2&&!sp;x++)if(free(x,y)&&free(x+1,y)&&free(x+2,y)&&c++===i*3)sp=[x,y];
  loadMap(MP,sp[0],sp[1],0);for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);await wait(200)};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const xp=()=>G.party.reduce((s,m)=>s+m.exp,0);
 return{
 A:async()=>{const AP=AUTO.pick,Z={act:null,hold:1};AUTO.hold=m=>Z.hold&&!!CB&&CB.vE?.A.filter(a=>a&&!a.out).length>=2&&!CB.pj.length&&(CB.vE?.Nmax|0)<3&&m?.opts?.[0]==='ATTAQUE';AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(m.title==='Bob'||m.title==='Chloé')return o.indexOf(Z.act);return AP(m)};
  await setup('Alice','girl',[mon('brasilion',34),mon('goutelin',32)],0);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'Bob et Chloé dans le salon');await BAR('in');
  const pb=[...NET.peers.values()].find(P=>P.name==='Bob'),pc=[...NET.peers.values()].find(P=>P.name==='Chloé');ok(pb&&pc,'pseudos reçus');
  Z.act='FAIRE ÉQUIPE';await run(()=>friendMenu(pb.pid));await run(()=>friendMenu(pc.pid));ok(GRP.id&&await until(()=>grpPeers().length===2),'groupe de trois formé par les menus');await BAR('grp',GRP.id);
  const x0=xp(),foe=mon('rocaillon',30,{wild:1});await SNAP('avant');
  const done=run(()=>battle([foe]));ok(await until(()=>B?.coop&&CB,8000),'le combat sauvage passe en mode groupe');
  ok(await until(()=>CB?.vE?.A.filter(a=>a&&!a.out).length>=2,60000),'Bob a rejoint le combat');await until(()=>CB?.vE?.Nmax>=3||!CB,90000);L('état',JSON.stringify(window.CBLAST),JSON.stringify(CB?.vE?.A.map(a=>a&&[a.nm,a.out])));Z.hold=0;ok(window.CBLAST?.Nmax>=3||CB?.vE?.Nmax>=3,'Chloé a rejoint en plein combat : puissance x3');await SNAP('trio');
  await done;ok(mode==='world'&&!B&&!CB,'retour au monde');const R=window.CBLAST;ok(R&&R.Nmax===3,'fin : '+JSON.stringify(R));
  if(R.w==='win'||R.w==='catch')ok(xp()>x0&&(NG().cw|0)===1,'EXP de groupe gagnée et victoire comptée');const all=await BAR('fin1',{w:R.w,by:R.by});ok(all.B.w===R.w&&all.C.w===R.w,'même fin sur les trois écrans');
  // Deuxième combat : Bob part en cours de route
  healAll();await wait(500);const done2=run(()=>battle([mon('rocaillon',36,{wild:1})]));ok(await until(()=>CB?.vE?.A.filter(a=>a&&!a.out).length>=2,60000),'Bob revient aider');
  ok(await until(()=>CB?.vE?.A[1]?.out===1||!CB,120000),'Bob quitte le combat');await done2;ok(mode==='world'&&!B,'deuxième combat terminé');await BAR('fin2');NET.leave();L('done')},
 B:async()=>{const AP=AUTO.pick,Z={n:0,leave:0};AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(o[3]==='PARTIR'&&o[0]==='ATTAQUE'&&Z.leave){Z.n++;if(Z.n>=1)return 3}return AP(m)};
  await setup('Bob','scout',[mon('pousseron',33),mon('flamiot',31)],1);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'salon complet');await BAR('in');
  ok(await until(()=>!!GRP.id,60000),'invitation acceptée');await BAR('grp',GRP.id);const x0=xp(),hp0=JSON.stringify(G.party.map(m=>m.hp));
  ok(await until(()=>!!CBG,90000),'appel à l\'aide accepté, Bob entre dans le combat');await until(()=>!CBG&&mode==='world'&&!busy,400000);
  const R=window.CBLAST;ok(R&&R.me===1,'fin vue par Bob : '+JSON.stringify(R));if(R.w==='win'||R.w==='catch')ok(xp()>x0,'Bob gagne de l\'EXP');ok(JSON.stringify(G.party.map(m=>m.hp))!==hp0||R.w!=='win','PV réels mis à jour');
  await BAR('fin1',{w:R.w,by:R.by});healAll();Z.leave=1;Z.n=0;ok(await until(()=>!!CBG,90000),'Bob rejoint le deuxième combat');ok(await until(()=>!CBG&&mode==='world'&&!busy,200000),'Bob est reparti');ok(window.CBLAST.left===1,'départ volontaire');await BAR('fin2');NET.leave();L('done')},
 C:async()=>{const AP=AUTO.pick,Z={no:1,act:null};AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;if(o[0]==='OUI'&&ui.text?.s?.join(' ').includes('aider')&&Z.no)return 1;if(m.title==='Alice')return o.indexOf(Z.act);return AP(m)};
  await setup('Chloé','kid',[mon('noctyrex',33),mon('lueurette',30)],2);NET.join('TRIO');ok(await until(()=>NET.peers.size===2),'salon complet');await BAR('in');
  ok(await until(()=>!!GRP.id,60000),'invitation acceptée');await BAR('grp',GRP.id);const pa=[...NET.peers.values()].find(P=>P.name==='Alice');
  ok(await until(()=>pa.cb&&pa.cb.n>=2&&CBASK.has(pa.cb.i)&&!busy,90000),'appel à l\'aide refusé, Bob déjà avec Alice');await wait(1500);Z.no=0;Z.act='AIDER';
  await run(()=>friendMenu(pa.pid));Z.no=1;const R=window.CBLAST;ok(R&&R.Nmax===3,'Chloé a combattu avec les deux autres : '+JSON.stringify(R));
  await BAR('fin1',{w:R.w,by:R.by});ok(await until(()=>pa.cb&&!busy,60000),'deuxième combat d\'Alice annoncé');await BAR('fin2');NET.leave();L('done')}}})()
