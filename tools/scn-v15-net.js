// Test 15.0 (réseau, deux joueurs) : salon partagé, présence, déplacements visibles, coupure d'un relais, messages rapides, émotes, départ du salon.
({A:async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=8000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',30),mon('goutelin',25)];G.net={n:'Alice',lk:'girl'};loadMap('ville',17,11,0);await wait(200);
 await BAR('setup');NET.join('TST1');ok(await until(()=>NET.up()),'relais connectés');ok(await until(()=>NET.peers.size===1),'Bob visible dans le salon');const P=[...NET.peers.values()][0];
 ok(P.name==='Bob'&&P.look==='scout','nom et apparence de Bob');const S0=await BAR('start');const[bx,by]=[P.x,P.y];
 ok(await until(()=>P.g&&P.g.x===bx&&P.g.y===by),`Bob apparaît sur la carte (${P.g?.x},${P.g?.y})`);ok(npcs(MAPS.ville).includes(P.g),'Bob est une entité de la carte');
 await BAR('seen');ok(await until(()=>P.g&&P.g.y===by+2&&!P.g.mv,10000),`Bob marche de deux cases (${P.g?.x},${P.g?.y})`);await SNAP('vu');if(NET.R.filter(r=>r.up).length>1){await RELAY('kill',0);ok(await until(()=>NET.R.filter(r=>r.up).length===1),'un relais coupé, l\'autre tient')}await BAR('walked');
 ok(await until(()=>P.say?.s==='Salut !'),'message rapide reçu par le relais restant');ok(NET.log.some(s=>s.includes('Bob : Salut')),'journal du salon');await SNAP('bulle');await BAR('chat');
 ok(await until(()=>ui.emo.some(e=>e.n===P.g&&e.k==='♥')),'émote au-dessus de Bob');await BAR('emo');
 ok(await until(()=>NET.peers.size===0,25000),'Bob a quitté le salon');ok(!npcs(MAPS.ville).some(n=>n.net),'plus de fantôme sur la carte');NET.leave();L('done')},
 B:async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=8000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1});G.party=[mon('goutelin',28)];G.net={n:'Bob',lk:'scout'};
 const M=MAPS.ville,free=(x,y)=>M.rows[y]?.[x]&&!SOLID.has(M.rows[y][x])&&!npcs(M).some(n=>n.x===x&&n.y===y)&&!M.doors?.[x+','+y];let sp=null;
 for(let y=4;y<M.rows.length-3&&!sp;y++)for(let x=12;x<M.rows[0].length-2&&!sp;x++)if(free(x,y)&&free(x,y+1)&&free(x,y+2)&&Math.abs(x-17)+Math.abs(y-11)>2)sp=[x,y];ok(sp,'case libre trouvée '+sp);
 loadMap('ville',sp[0],sp[1],0);await wait(200);await BAR('setup');NET.join('TST1');ok(await until(()=>NET.peers.size===1),'Alice visible');await BAR('start');await BAR('seen');
 for(const d of[0,0]){tryMove(d);await until(()=>!move);await wait(60)}ok(G.x===sp[0]&&G.y===sp[1]+2,'Bob a marché');await BAR('walked');
 NET.send('ch',{c:0});await BAR('chat');NET.send('em',{e:2});await BAR('emo');await wait(300);NET.leave();L('done')}})
