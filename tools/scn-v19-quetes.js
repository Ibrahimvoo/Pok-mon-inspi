// Test 19 : quêtes annexes écrites (voleur de croissants, dresseur d'autrefois, course des Coteaux, œuf de l'orage, apprenti, Défis d'Élite).
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const op=AUTO.pick,pick=f=>{AUTO.pick=m=>{const i=f(m);return i!=null?i:op(m)}},unpick=()=>AUTO.pick=op;
 const at=(k,n,d=1)=>{const x=n.x+(d===1?0:d===0?0:d===2?1:-1),y=n.y+(d===1?1:d===0?-1:0);loadMap(k,x,y,d)};
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1});G.keys.dex=1;G.party=[mon('torrentor',40),mon('brasilion',40)];
 const day=()=>{G.t=CYC*Math.ceil(G.t/CYC)+Math.floor(CYC*.3)},nite=()=>{G.t=CYC*Math.ceil(G.t/CYC)+Math.floor(CYC*.8)};day();
 // 1. Voleur de croissants : enquête puis famille protégée
 const A=MAPS.ville.npcs.find(n=>n.name==='Pâtissier Augustin');at('ville',A);await interact();ok(f().v19q1===1,'Augustin confie l\'enquête');
 for(const c of CRUMB){at('ville',c);await interact()}ok(CRUMB.every((_,i)=>f()['v19c'+i]),'les trois indices sont trouvés');
 const mum=MAPS.ville.npcs.find(n=>n.sp==='ratounet'&&n.fix&&n.x===18);ok(npcs(MAPS.ville).includes(mum),'la petite famille apparaît près de l\'étang');
 at('ville',mum,0);pick(m=>m.title==='La voleuse de croissants'?1:null);await interact();unpick();ok(f().v19q1===2,'on laisse la famille tranquille');
 at('ville',A);await interact();ok(f().v19q1===5,'Augustin nourrira la famille');at('ville',mum,0);const b0=Object.values(G.bag).reduce((a,b)=>a+b,0);await interact();ok(Object.values(G.bag).reduce((a,b)=>a+b,0)===b0+1,'la maman Ratounet laisse un cadeau');
 // 2. Le dresseur d'autrefois
 nite();G.party=[mon('torrentor',65),mon('brasilion',65),mon('phalumine',65),mon('rocaroc',65),mon('bourdonnerre',65),mon('papivigne',65)];const gh=MAPS.bois.npcs.find(n=>n.name==='Dresseur d\'autrefois');at('bois',gh);ok(npcs(MAPS.bois).includes(gh),'le fantôme n\'apparaît que la nuit');await interact();ok(f().v19q2===1,'Albert gagne enfin son dernier combat');
 day();const od=MAPS.coteaux.npcs.find(n=>n.name==='Mamie Odette');at('coteaux',od);const r0=G.bag.ruban||0;await interact();ok(f().v19q2===2&&(G.bag.ruban||0)===r0+1,'Odette reçoit le message et donne le ruban');
 // 3. Course des Coteaux (téléportation vers l'arrivée pour le test)
 f().cot=1;const Z=MAPS.coteaux.npcs.find(n=>n.name==='Coureuse Zia');at('coteaux',Z);await interact();ok(RACE,'la course démarre');await SNAP('course');
 RACE.t0=now();loadMap('coteaux',FLAG.x,FLAG.y+1,1);await onStep();ok(!RACE&&f().v19m3&&f().v19rec,'arrivée : médaille d\'or ('+fmtS(f().v19rec)+')');
 // 4. Œuf de l'orage : on le garde, puis on le rend
 f().r2=1;const ne=MAPS.route2.npcs.find(n=>n.k==='nest19');at('route2',ne);pick(m=>m.title==='L\'œuf de l\'orage'?0:null);await interact();unpick();ok(f().v19q4===2&&egg4(),'l\'œuf est dans la Couveuse, la mère le cherche');
 await interact();ok(f().v19q4===1&&!egg4(),'on rend l\'œuf à sa mère');G.t+=CYC;await interact();ok(f().v19q4===3&&G.bag.mouchoir>0,'le lendemain : une famille de Piafou et un cadeau');
 // 5. L'apprenti : quiz, entraînement, vrai combat
 const T=MAPS.ville.npcs.find(n=>n.name==='Tito');at('ville',T);await interact();ok(f().v19q5===1,'Tito passe son quiz de types');
 f().badge2=1;await interact();ok(f().v19q5===2,'combat d\'entraînement');f().badge4=1;G.party.forEach(m=>{m.lv=90;m.exp=xpFor(90);m.hp=st(m).hp});await interact();ok(f().v19q5===4&&G.bag.dc_tomberoche,'élève contre maître : Tito devient apprenti de Brasia');
 // 6. Défis d'Élite : la Duelliste
 const V=MAPS.route2.npcs.find(n=>n.name==='Vérane la Duelliste');G.party=[mon('torrentor',90)];at('route2',V);await interact();ok(f().v19e1&&G.bag.dc_tranche,'Vérane battue en duel : DC03 Tranche');
 ok(quests().some(q=>q[0]==='Défis d\'Élite'),'journal : Défis d\'Élite');L('fin')}
