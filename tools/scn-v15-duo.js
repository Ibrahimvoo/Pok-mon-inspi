// Test 15.0 (deux joueurs, par les vrais menus) : salon créé puis rejoint au clavier, pseudo et apparence, échange croisé,
// combat complet (3 contre 3, niveau 50) avec le même vainqueur sur les deux écrans, abandon, déconnexion en plein combat.
({A:async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=20000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const AP=AUTO.pick,Z={menu:'RETOUR',tp:0};
 AUTO.pick=m=>{const o=m.opts;if(m.title==='En ligne')return o.indexOf(Z.menu);if(o.includes('QUITTER'))return o.indexOf('RETOUR');
  if(m.title==='Bob'&&o.includes('COMBAT'))return o.indexOf(Z.act);if(m.title==='Format du combat'||m.title==='Niveaux')return 0;
  if(ui.dim?.startsWith('Choisis')){const r=Z.tp<3?Z.tp:o.length-1;Z.tp++;return r}if(ui.dim==='Proposer qui ?')return 1;if(o[0]==='ÉCHANGER')return 0;
  if(m.bare&&B?.pvp){const A=B.pvp,T=A.D[A.me];return Math.max(0,T.findIndex((x,i)=>x.hp>0&&i!==A.act[A.me]))}return AP(m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1,badge2:1});G.keys.bracelet=1;G.party=[mon('brasilion',36),mon('goutelin',30),mon('pousseron',28),mon('noctyrex',30)];G.party.forEach(m=>m.aff=160);G.net={n:'Alice',lk:'girl'};
 loadMap('ville',17,11,0);await wait(200);
 Z.menu='CRÉER UN SALON';await run(onlineMenu);Z.menu='RETOUR';ok(NET.on&&/^[A-Z2-9]{4}$/.test(NET.code),'salon créé par le menu : '+NET.code);
 await BAR('code',NET.code);ok(await until(()=>NET.peers.size===1),'Bob a rejoint le salon');const P=[...NET.peers.values()][0];ok(P.name==='Bob'&&P.look==='scout','pseudo et apparence choisis par Bob : '+P.name+' '+P.look);
 await BAR('joined');await SNAP('salon');
 const before=G.party.map(m=>m.sp);Z.act='ÉCHANGE';await run(()=>friendMenu(P.pid));const got=G.party[1];
 ok(got.sp!==before[1]&&(NG().tr|0)===1,`échange fait : ${before[1]} contre ${got.sp}`);ok(got.ot==='Bob'&&G.dex[got.sp]===2&&!got._S,'créature reçue de Bob, inscrite au Pixédex');
 const T1=await BAR('traded',{gave:before[1],got:got.sp});ok(T1.got===before[1]&&T1.gave===got.sp,'échange croisé cohérent des deux côtés');
 const snap=()=>JSON.stringify(G.party.map(m=>[m.sp,m.hp,m.lv,m.pp,m.st,m.item]));const s0=snap();Z.act='COMBAT';Z.tp=0;await run(()=>friendMenu(P.pid));
 const N=NG();ok((N.w|0)+(N.l|0)+(N.d|0)===1,'combat terminé : '+JSON.stringify({w:N.w,l:N.l,d:N.d}));ok(snap()===s0,'équipe réelle intacte après le combat');ok(mode==='world'&&!B&&!NET.act,'retour au monde');
 const R=await BAR('fight1',{w:N.w|0,l:N.l|0,d:N.d|0});ok(R.w===(N.l|0)&&R.l===(N.w|0)&&R.d===(N.d|0),'même vainqueur sur les deux écrans');
 const w0=N.w|0;Z.tp=0;await run(()=>friendMenu(P.pid));ok((NG().w|0)===w0+1&&(NG().bt|0)===2,'victoire par abandon de Bob');await BAR('fight2');
 Z.tp=0;await run(()=>friendMenu(P.pid));ok((NG().bt|0)===2&&mode==='world'&&!B&&!NET.act,'combat annulé quand Bob se déconnecte');ok(await until(()=>NET.peers.size===0),'Bob a quitté le salon');
 achCheck();ok(G.ach.net1&&G.ach.netT&&G.ach.netW,'succès en ligne');await BAR('end');NET.leave();L('done')},
 B:async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=20000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const AP=AUTO.pick,Z={menu:'RETOUR',tp:0,keys:[],ff:0,na:0};
 AUTO.pick=m=>{const o=m.opts;if(m.title==='En ligne')return o.indexOf(Z.menu);if(o.includes('QUITTER'))return o.indexOf('RETOUR');
  if(o.includes('EFF')&&o.includes('OK'))return o.indexOf(Z.keys.shift()??'OK');if(m.bare&&o.length===LOOKS.length&&o[0]===LOOKS[0])return LOOKS.indexOf('scout');
  if(ui.dim?.startsWith('Choisis')){const r=Z.tp<3?Z.tp:o.length-1;Z.tp++;return r}if(ui.dim==='Proposer qui ?')return 2;if(o[0]==='ÉCHANGER')return 0;
  if(m.bare&&B?.pvp){const A=B.pvp,T=A.D[A.me];return Math.max(0,T.findIndex((x,i)=>x.hp>0&&i!==A.act[A.me]))}
  if(o[0]==='ATTAQUE'&&o[3]==='ABANDON'){Z.na++;return Z.ff&&Z.na>=2?3:0}return AP(m)};
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1});G.keys.bracelet=1;G.party=[mon('goutelin',32),mon('flamiot',27),mon('tisonnet',25),mon('lueurette',22)];G.net={};
 loadMap('ville',19,11,0);await wait(200);const code=await BAR('code');
 Z.menu='REJOINDRE';Z.keys=['b','o','b','OK',...code.split(''),'OK'];await run(onlineMenu);Z.menu='RETOUR';ok(NET.on&&NET.code===code&&NG().n==='Bob'&&NG().lk==='scout','salon rejoint au clavier, pseudo Bob');
 ok(await until(()=>NET.peers.size===1),'Alice visible');await BAR('joined');
 const before=G.party.map(m=>m.sp);ok(await until(()=>(NG().tr|0)===1,60000),'échange accepté et fait');const got=G.party[2];ok(got.ot==='Alice'&&got.sp!==before[2],'créature reçue d\'Alice');
 await BAR('traded',{gave:before[2],got:got.sp});
 ok(await until(()=>(NG().bt|0)===1&&mode==='world'&&!NET.act,240000),'premier combat terminé');const N=NG();await BAR('fight1',{w:N.w|0,l:N.l|0,d:N.d|0});
 Z.ff=1;Z.na=0;Z.tp=0;ok(await until(()=>(NG().bt|0)===2&&mode==='world'&&!NET.act,120000),'abandon au deuxième tour');ok((NG().l|0)>=1,'abandon compté comme défaite');Z.ff=0;Z.tp=0;await BAR('fight2');
 ok(await until(()=>B?.pvp&&B.pvp.v&&B.pvp.v.n>=1,120000),'troisième combat commencé');await SNAP('combat');NET.leave();
 ok(await until(()=>mode==='world'&&!B&&!NET.act,60000),'retour au monde après la déconnexion');ok((NG().bt|0)===2,'combat interrompu non compté');await BAR('end');L('done')}})
