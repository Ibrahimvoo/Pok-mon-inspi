// Test 19.2 (aventure à plusieurs, deux navigateurs) : Bob a réglé « DEMANDER » mais, dans l'aventure, il rejoint quand même
// tout de suite le combat d'Alice ; rencontres réduites à deux ; si l'équipe gagne, une équipe K.O. se relève avec 1 PV, sur place.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX&&!ui.text,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const setup=async(nm,lk,lv)=>{G.coop={code:'COOP',t0:Date.now(),mates:{}};SLOT='c:COOP';Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,tip_evr:1});G.keys.dex=1;G.party=[mon('torrentor',lv)];G.net={n:nm,lk};G.repel=9999;
  for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap('carnavelle',15,10,1);await wait(400)};
 return{
 A:async()=>{await setup('Alice','girl',60);NET.join('COOP');ok(await until(()=>isAdvMate(peer('Bob'))&&peer('Bob').dv===NETDV()),'Bob dans l\'aventure');await BAR('in');
  ok(coN()===2&&coK()===.5,'deux joueurs : une rencontre sur deux');ok(fauAdj(MAPS.foret,6)<=5||fauAdj(MAPS.route1||MAPS.foret,6)===4,'faune moins nombreuse à deux');
  await run(()=>battle([mon('goutelin',3,{wild:1})]));await until(idle);await BAR('fin');NET.leave();L('done')},
 B:async()=>{await setup('Bob','scout',30);NG().aj='ask';const notes=[];{const n0=NET.note;NET.note=function(t,...a){notes.push(String(t));return n0.call(this,t,...a)}}
  NET.join('COOP');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>!!CBG,20000),'Bob rejoint le combat d\'Alice sans qu\'on lui demande');ok(notes.some(t=>t.includes('toute l\'équipe')),'annonce : toute l\'équipe le rejoint');
  await until(idle,40000);const m0=G.party[0],x=G.x,y=G.y,mp=G.map;
  B={coop:null,foes:[],foe:mon('goutelin',3,{wild:1}),me:m0,tr:null,o:{},bgk:'plaine',stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],pf:{f:0,m:0},part:new Set(),fo:{x:0,y:0,v:1,s:1,b:0},mo:{x:0,y:0,v:0,s:0,b:0},dh:[0,0],ev:[0,0],evUsed:[0,0],evOn:[0,0],awk:new Set(),awkC:new Map(),bend:new Set()};
  mode='battle';m0.hp=0;await run(()=>endBattle('win'));await until(idle);ok(m0.hp===1&&G.map===mp&&G.x===x&&G.y===y,'équipe gagnante : Bob se relève avec 1 PV, sur place');
  await BAR('fin');NET.leave();L('done')}}})()
