// Test 17.0 (aventure à plusieurs, deux navigateurs, par les vrais menus) : Alice crée l'aventure depuis l'écran titre, Bob la rejoint avec le code ;
// apparences ; chacun choisit sa créature au labo et Kael les affronte ensemble ; dresseur de la Route 1 en scène partagée (Bob est transporté et
// combat avec Alice) ; combat sauvage rejoint automatiquement depuis une autre carte ; championne Brasia : badge, bracelet et récompenses
// pour les deux ; heure commune ; ALLER LE VOIR ; sauvegarde puis CONTINUER depuis l'écran titre : reconnexion automatique.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const cbBare=m=>{if(!m.bare||!B?.coop)return null;const D=B.coop.D[B.coop.me];return Math.max(0,D.T.findIndex((x,i)=>x.hp>0&&i!==D.a))};
 const pilot=Z=>{const AP=AUTO.pick;AUTO.pick=m=>{const o=m.opts,cb=cbBare(m);if(cb!=null)return cb;
   if(o.includes('AVENTURE À PLUSIEURS')&&o.includes('NOUVELLE PARTIE'))return Z.quick&&o[0]==='CONTINUER L\'AVENTURE'?0:o.indexOf('AVENTURE À PLUSIEURS');
   if(o.includes('NOUVELLE AVENTURE')&&o.includes('REJOINDRE'))return Math.max(0,o.indexOf(Z.adv));
   if(o.includes('EFF')&&o.includes('OK'))return o.indexOf(Z.keys.shift()??'OK');
   if(m.bare&&o.length===LOOKS.length&&o[0]===LOOKS[0])return LOOKS.indexOf(Z.look);
   if(m.title===Z.mate&&o.includes('COMBAT'))return Math.max(0,o.indexOf(Z.act));
   return AP(m)}};
 const intro=()=>{Object.assign(f(),{intro:3,intro3:1,hSac:1,hCarte:1,hCap:1,prepOk:1,salon1:1});G.repel=9999};
 const peer=nm=>[...NET.peers.values()].find(P=>P.name===nm),duo=()=>mode==='battle'&&!!B?.coop&&B.coop.oth.length>=1;
 const shot=async(n,ms)=>{let done=0;const H0=AUTO.hold;AUTO.hold=m=>!done&&duo()&&!!m?.opts?.includes('ATTAQUE')||!!H0?.(m);   // menu d'action retenu le temps de la photo
  if(await until(()=>duo()&&ui.menus.some(m=>m.opts.includes('ATTAQUE')),ms)){await wait(250);await SNAP(n)}done=1;AUTO.hold=H0};
 const ghostT=nm=>{const P=peer(nm);return P&&P.g?P.g.t:null};
 return{
 A:async()=>{const Z={adv:'NOUVELLE AVENTURE',keys:['a','l','i','c','e','OK'],look:'girl',mate:'Bob',act:''};pilot(Z);
  AUTO.hold=m=>m?.opts?.[0]==='COMMENCER'&&!Z.go;
  const tp=run(titleScreen);ok(await until(()=>ui.menus.some(m=>m.opts[0]==='COMMENCER'),60000),'aventure créée depuis l\'écran titre');const code=G.coop.code;ok(/^[A-Z2-9]{4}$/.test(code)&&SLOT==='c:'+code&&NET.code===code,'code de l\'aventure : '+code);
  await BAR('code',code);ok(await until(()=>[...NET.peers.values()].some(P=>P.av===code&&P.name==='Bob'),30000),'Bob apparaît dans la salle d\'attente');await SNAP('salle');Z.go=1;await tp;
  ok(mode==='world'&&G.coop?.code===code&&NG().n==='Alice'&&myLook()==='girl','intro commencée, pseudo et apparence d\'Alice');await BAR('intro');intro();
  // Labo : Alice choisit en premier, Kael attend Bob, puis les affronte ensemble
  loadMap('lab',3,4,1);await wait(300);const p1=run(interact);ok(await until(()=>!!KW,60000),'Alice a choisi, Kael attend Bob');await BAR('attente');
  await shot('kael',90000);await p1;ok(f().starter==='flamiot'&&f().rival1&&G.keys.dex&&G.bag.capsule>=5,'Pixédex et capsules reçus après Kael');const R=window.CBLAST;ok(R&&R.Nmax===2&&R.tr==='Kael','Kael affronté à deux : '+JSON.stringify(R));
  const k1=await BAR('kael',{rs:f().rs,w:R.w});ok(k1.rs===f().rs&&k1.w===R.w,'même Kael et même issue sur les deux écrans');
  // Route 1 : Alice parle au Gamin Léo, Bob est transporté et combat avec elle
  G.party=[mon('flamiot',14),mon('pousseron',12)];healAll();const m0=G.money;loadMap('route1',11,3,3);await wait(300);await BAR('route');
  await run(interact);ok(f().t_leo===1&&G.money===m0+120,'Gamin Léo battu, 120 pièces');ok(window.CBLAST.Nmax===2,'combat contre Léo à deux');const r1=await BAR('leo');ok(r1.t_leo&&r1.money===r1.m0+120,'Bob a aussi battu Léo et touché la prime');
  // Combat sauvage de Bob, rejoint automatiquement depuis une autre carte
  loadMap('ville',9,7,0);await wait(200);const t0=G.t;await BAR('sauvage');ok(await until(()=>!!CBG,30000),'Alice rejoint tout de suite le combat sauvage de Bob');
  ok(await until(()=>!CBG&&mode==='world'&&!busy,180000),'combat sauvage terminé');ok(G.map==='ville'&&G.x===9&&G.y===7,'Alice revient là où elle était');const w2=await BAR('sauvage-fin',{w:window.CBLAST.w,me:window.CBLAST.me});ok(w2.w===window.CBLAST.w,'même issue chez les deux');
  // Arène : Brasia, badge et bracelet pour les deux
  G.party=[mon('goutelin',20),mon('pousseron',18)];healAll();const m1=G.money,hc=G.bag.hypercapsule|0;loadMap('gym',5,2,1);await wait(300);await BAR('arene');
  const pb=run(interact);await shot('brasia',120000);await pb;ok(f().badge===1&&f().t_brasia===1&&G.keys.bracelet===1&&(G.bag.hypercapsule|0)===hc+2&&G.money===m1+1200,'Brasia battue à deux : badge, bracelet, capsules, prime');
  const b1=await BAR('brasia',{t:G.t});ok(b1.badge&&b1.bracelet&&b1.prime,'Bob a aussi le badge, le bracelet et la prime');ok(Math.abs(b1.t-G.t)<60,'heure commune : '+G.t+' / '+b1.t);
  await BAR('allervoir');ok(await until(()=>ghostT('Bob')==='scout',15000),'Bob est venu près d\'Alice, avec son apparence');await SNAP('ensemble');
  // Sauvegarde, retour au titre, CONTINUER : reconnexion automatique
  save();await BAR('titre');Z.adv='CONTINUER '+code;Z.go=1;await run(titleScreen);ok(mode==='world'&&SLOT==='c:'+code&&G.coop.code===code&&f().badge===1&&NET.code===code,'aventure reprise depuis l\'écran titre');
  ok(await until(()=>isAdvMate(peer('Bob')),30000),'Bob retrouvé automatiquement');ok(isFriend(peer('Bob')),'Bob est dans la liste d\'amis');await BAR('fin');NET.leave();L('done')},
 B:async()=>{const Z={adv:'REJOINDRE',keys:[],look:'scout',mate:'Alice',act:'ALLER LE VOIR'};pilot(Z);const code=await BAR('code');Z.keys=[...code.split(''),'OK','b','o','b','OK'];
  await run(titleScreen);ok(mode==='world'&&G.coop?.code===code&&SLOT==='c:'+code&&NG().n==='Bob'&&myLook()==='scout','aventure rejointe avec le code, pseudo et apparence de Bob');
  await BAR('intro');intro();loadMap('lab',4,4,1);await wait(300);await BAR('attente');ok(await until(()=>peer('Alice')?.kw,20000),'Alice attend devant Kael');
  await run(interact);ok(f().starter==='goutelin'&&f().rival1&&G.keys.dex,'Bob a choisi et combattu Kael');const R=window.CBLAST;ok(R&&R.Nmax===2&&R.tr==='Kael','Kael affronté à deux');await BAR('kael',{rs:f().rs,w:R.w});
  G.party=[mon('goutelin',14),mon('flamiot',12)];healAll();const m0=G.money;loadMap('bourg',5,7,0);await wait(300);await BAR('route');
  ok(await until(()=>f().t_leo===1&&mode==='world'&&!busy,180000),'scène partagée : Bob a suivi Alice et battu Léo');ok(G.map==='route1','Bob a été transporté sur la Route 1');ok(window.CBLAST.Nmax===2,'combat contre Léo à deux');
  await BAR('leo',{t_leo:f().t_leo,money:G.money,m0});
  loadMap('route1',5,8,0);await wait(200);await BAR('sauvage');await run(()=>battle([mon('ratounet',6,{wild:1})]));ok(window.CBLAST.Nmax===2&&window.CBLAST.me===0,'Alice a rejoint le combat sauvage');await BAR('sauvage-fin',{w:window.CBLAST.w,me:0});
  G.party=[mon('pousseron',20),mon('goutelin',18)];healAll();const m1=G.money,hc=G.bag.hypercapsule|0;loadMap('ville',3,12,0);await wait(200);await BAR('arene');
  ok(await until(()=>f().badge===1&&G.keys.bracelet===1&&mode==='world'&&!busy,240000),'scène de Brasia vécue avec Alice');ok(G.map==='gym'&&f().t_brasia===1,'Bob transporté à l\'arène, Brasia battue');
  await BAR('brasia',{badge:f().badge,bracelet:G.keys.bracelet,prime:G.money===m1+1200&&(G.bag.hypercapsule|0)===hc+2,t:G.t});
  loadMap('ville',4,13,0);await wait(200);const A=peer('Alice');await run(()=>friendMenu(A.pid));ok(G.map===A.map&&Math.abs(G.x-A.x)+Math.abs(G.y-A.y)<=1,'ALLER LE VOIR : Bob rejoint Alice');await BAR('allervoir');
  save();await BAR('titre');Z.quick=1;await run(titleScreen);ok(mode==='world'&&SLOT==='c:'+code&&G.coop.code===code&&f().badge===1&&G.keys.bracelet===1,'aventure reprise en un clic (CONTINUER L\'AVENTURE sur l\'écran titre)');
  ok(await until(()=>isAdvMate(peer('Alice')),30000),'Alice retrouvée automatiquement');await BAR('fin');NET.leave();L('done')}}})()
