// Test 19.6 (réseau, deux joueurs) : échange complet. Alice propose Goutelin + 2 Potions + 100 pièces ; Bob ne propose pas de créature, mais 3 Super Potions.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=20000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const pick=(Z,me)=>{const AP=AUTO.pick;AUTO.pick=m=>{const o=m.opts,t=m.title,ix=s=>o.findIndex(x=>x.startsWith(s));
  if(t==='Bob'&&o.includes('ÉCHANGE'))return o.indexOf('ÉCHANGE');if(ui.dim==='Proposer qui ?')return me.cr;
  if(t==='Ta proposition')return!Z.it?2:me.mo&&!Z.mo?3:0;if(t==='Objets proposés')return!Z.it?ix('+ AJOUTER'):ix('RETOUR');if(t==='Quel objet ?')return ix(IT[me.it][0]+' (');
  if(t==='Combien ?'){Z.it=1;return ix(me.q)}if(t==='Argent'){Z.mo=1;return ix(String(me.mo))}if(o[0]==='ÉCHANGER')return 0;return AP(m)}};
 const setup=async(nm,lk,party,bag,money)=>{Object.assign(f(),{starter:'goutelin',intro:3,badge:1});G.party=party;G.bag=bag;G.money=money;G.net={n:nm,lk};loadMap('ville',17,11,0);await wait(200)};
 return{
 A:async()=>{const Z={};pick(Z,{cr:1,it:'potion',q:'2',mo:100});await setup('Alice','girl',[mon('torrentor',30),mon('goutelin',12)],{potion:10},500);
  NET.join('ECH1');ok(await until(()=>NET.peers.size===1),'Bob est là');const P=[...NET.peers.values()][0];await BAR('in');
  await run(()=>friendMenu(P.pid));
  ok(G.party.length===1&&G.party[0].sp==='torrentor'&&G.bag.potion===8&&G.bag.superpotion===3&&G.money===400,`Alice : Goutelin, 2 Potions et 100 pièces donnés ; 3 Super Potions reçues (${G.party.length}, ${G.bag.potion}, ${G.bag.superpotion}, ${G.money})`);
  const b=await BAR('fin');ok(b.ok,'Bob a bien reçu l\'échange');NET.leave();L('done')},
 B:async()=>{const Z={};pick(Z,{cr:-1,it:'superpotion',q:'TOUT'});await setup('Bob','scout',[mon('brasilion',30)],{superpotion:3},0);
  NET.join('ECH1');ok(await until(()=>NET.peers.size===1),'Alice est là');await BAR('in');
  ok(await until(()=>G.party.length===2&&!NET.act,30000),'Bob reçoit Goutelin');const g=G.party[1];
  const okB=g.sp==='goutelin'&&g.ot==='Alice'&&G.bag.potion===2&&!G.bag.superpotion&&G.money===100;ok(okB,`Bob : Goutelin d'Alice, 2 Potions, 100 pièces ; plus de Super Potion (${G.bag.potion}, ${G.bag.superpotion}, ${G.money})`);
  await BAR('fin',{ok:okB});NET.leave();L('done')}}})()
