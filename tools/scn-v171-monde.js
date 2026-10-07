// Test 17.1 (un seul monde, deux navigateurs, aventure à plusieurs) : mêmes créatures visibles chez Alice et Bob sur la Route 1 (espèces, places,
// déplacements, averse), créature prise par l'un qui disparaît chez l'autre, arbitrage « trop tard », relais quand le meneur s'en va,
// légendaire capturé seul par Alice qui disparaît du monde de Bob (sans lui donner le succès).
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const setup=async(nm,lk,map,x,y)=>{G.coop={code:'MOND',t0:Date.now(),mates:{}};SLOT='c:MOND';Object.assign(f(),{starter:'flamiot',intro:3,intro3:1,tip_evr:1,rival1:1,balance:1});G.keys.dex=1;
  G.party=[mon('goutelin',30)];G.net={n:nm,lk,aj:'ask'};G.repel=99999;G.t=420*3+100;G.wx=null;for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap(map,x,y,0);await wait(200)};
 const snap=()=>faList().map(n=>[n.fid,n.sp,n.walk&&n.rx!=null?n.rx:n.x,n.walk&&n.ry!=null?n.ry:n.y]).sort();
 const same=(a,b)=>a.length===b.length&&a.every((e,i)=>e[0]===b[i][0]&&e[1]===b[i][1]&&Math.abs(e[2]-b[i][2])+Math.abs(e[3]-b[i][3])<=1);
 return{
 A:async()=>{await setup('Alice','girl','route1',9,14);NET.join('MOND');ok(await until(()=>isAdvMate(peer('Bob'))),'Bob dans l\'aventure');
  ok(FA.own&&faList().length>=2,'Alice mène la Route 1 ('+faList().map(n=>n.sp).join(', ')+')');await BAR('in');
  const b1=await BAR('vu',snap());ok(same(snap(),b1),'Bob voit les mêmes créatures aux mêmes endroits');
  await wait(4000);const b2=await BAR('vu2',snap());ok(same(snap(),b2),'après quelques pas, toujours les mêmes places');
  G.wx={k:'rain',n:200};await BAR('pluie');await BAR('pluie-ok');
  const tid=await BAR('prise');ok(await until(()=>!faList().some(n=>n.fid===tid)),'la créature prise par Bob a disparu chez Alice');ok(FA.by[tid]==='Bob','Alice sait que Bob l\'a prise');
  await BAR('prise-ok');await BAR('tard');
  // Alice touche une créature ; Bob la touche juste après : trop tard pour lui
  const tx=await BAR('touche');const X=faList().find(n=>n.fid===tx);ok(!!X,'créature visée trouvée');const pm=run(()=>faunaMeet(X));await BAR('touche-ok');await pm;healAll();await BAR('touche-fin');
  // Alice s'en va : Bob prend le relais
  const keep=snap();loadMap('bourg',5,7,0);await BAR('parti',keep);await BAR('relais');
  // Légendaire capturé seul par Alice
  G.dex.aurorelle=2;f().legA=1;NET.hi(1);await BAR('aurorelle');L('done')},
 B:async()=>{await setup('Bob','scout','bourg',5,7);NET.join('MOND');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>peer('Alice').map==='route1'),'Bob sait qu\'Alice est sur la Route 1');loadMap('route1',10,14,0);
  ok(!FA.own&&await until(()=>FA.got&&faList().length>=2),'Bob suit Alice : il reçoit ses créatures');await wait(300);ok(await BAR('vu',snap()),'vu');
  await wait(4000);await BAR('vu2',snap());
  await BAR('pluie');ok(await until(()=>rain()),'l\'averse d\'Alice arrive chez Bob');await BAR('pluie-ok');
  // Bob prend une créature (arbitrage par Alice), sans lancer de combat
  const n=faList()[0],id=n.fid;FA.tk={id,ok:null};NET.send('fa-t',{m:G.map,id},FA.src,true);ok(await until(()=>FA.tk.ok!=null),'réponse d\'Alice');ok(FA.tk.ok===1,'Bob est le premier : il peut l\'affronter');FA.tk=null;
  await BAR('prise',id);ok(await until(()=>!faList().some(x=>x.fid===id)),'elle n\'est plus dans la liste partagée');await BAR('prise-ok');
  FA.tk={id,ok:null};NET.send('fa-t',{m:G.map,id},FA.src,true);ok(await until(()=>FA.tk.ok!=null),'réponse d\'Alice');ok(FA.tk.ok===0&&FA.tk.by==='Bob','une créature déjà prise est refusée (« trop tard »)');FA.tk=null;await BAR('tard');
  const X=faList()[0],S0=say,T=[];say=(t,...r)=>{T.push(String(t));return S0(t,...r)};await BAR('touche',X.fid);ok(await until(()=>!faList().includes(X)),'Alice a pris la créature');
  const b0=window.CBLAST;await run(()=>faunaMeet(X));say=S0;ok(T.some(t=>t.startsWith('Trop tard ! Alice a trouvé ce '+SP[X.sp].name)),'Bob : « Trop tard ! Alice a trouvé ce '+SP[X.sp].name+' avant toi. »');ok(window.CBLAST===b0&&mode==='world','pas de combat en double chez Bob');
  await BAR('touche-ok');await BAR('touche-fin');
  const keep=await BAR('parti');ok(await until(()=>FA.own,15000),'Alice partie : Bob mène la Route 1');const s=snap();ok(s.length===keep.length&&s.every((e,i)=>e[0]===keep[i][0]&&e[1]===keep[i][1]),'mêmes créatures après le relais');await BAR('relais');
  ok(await until(()=>f().legA===1&&G.coop.lg?.aurorelle==='Alice'),'Aurorelle capturée par Alice : elle quitte le monde de Bob');ok(!npcs(MAPS.pic).some(n=>n.sp==='aurorelle'),'plus d\'Aurorelle au Pic Céleste chez Bob');
  ok(!ACH.find(e=>e[0]==='aurorelle')[3](),'le succès d\'Aurorelle reste à Alice');ok(G.dex.aurorelle===1,'Aurorelle vue dans le Pixédex de Bob');await BAR('aurorelle');L('done')}}})()
