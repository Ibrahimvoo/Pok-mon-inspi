// Test 10.0 : Lac Opalin, Ondine, stèle, lanternes du Bois, crypte, fantôme d'Élise, Galeries Oubliées
async()=>{const L=(...a)=>console.log('LOG',...a);const F=f();
 G.party=[mon('torrentor',88),mon('rocaroc',88),mon('brasilion',88),mon('sylvorne',88),mon('orageon',88),mon('novarium',88)];G.party.forEach(m=>m.aff=255);
 Object.assign(F,{starter:'goutelin',rs:'flamiot',intro:3,badge:1,badge2:1,badge3:1,badge4:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,kael3:1,obsScene:1,vex2:1,balance:1,baseDone:1,volArr:1,dadHome:1});
 G.keys.rod=1;G.keys.rod2=1;G.keys.sablier=1;G.keys.dex=1;G.keys.bracelet=1;G.bag.amucycle=1;G.money=50000;
 const AP=AUTO.pick;const go=async(m,x,y,d=0)=>{loadMap(m,x,y,d);await wait(200)},npc=(pred)=>npcs(MAPS[G.map]).find(pred),talk=async n=>{if(!n){L('NO NPC');return}await n.fn(n)};
 // LAC
 await go('foret',27,8,3);L('foretEdge',JSON.stringify(MAPS.foret.edges));tryMove(3);await wait(900);L('lac?',G.map,G.x,G.y);await SNAP('lac');
 for(const k of['axoluce','guppyre','miroitruite','crapaflot','tetardin'])FSP()[k]=1;await go('lacH',4,5,1);await talk(npc(n=>n.name==='Ondine'));L('ondine1',F.ondine1,G.keys.rod3);
 await go('lac',10,7,1);await talk(npc(n=>n.sid===0));L('stele0',F.st_0,nStele());
 for(const id of['lacp1','lacp2','lacp3']){const n=MAPS.lac.npcs.find(n=>n.tr?.id===id);await trainerBattle(n);}L('lacTr',F.t_lacp1,F.t_lacp2,F.t_lacp3,'rep',JSON.stringify(G.rep));
 // pêche (mini-jeu)
 await go('lac',22,7,2);AUTO.off=1;const fp=fish();let tries=0;while(!ui.fishBar&&tries++<400)await wait(30);await SNAP('fishbar');
 for(let i=0;i<400&&ui.fishBar;i++){const fb=ui.fishBar,p=fishPos(fb);if(p>fb.z0+.02&&p<fb.z0+fb.w-.02){press('a');break}await wait(5)}AUTO.off=0;await fp;L('fished',ST10().fish,Object.keys(FSP()).length);
 // BOIS (nuit) : énigme des lanternes, crypte, fantôme
 setTime(3);await go('bois',22,7,2);await SNAP('bois');for(const i of[0,2])await lantern(i);L('lantBad',JSON.stringify(F.bLantL),F.bLant);for(const i of[0,1,2,3])await lantern(i);L('lantOk',F.bLant);
 await go('bois',11,13,1);await MAPS.bois.doors['11,12']();L('crypte',G.map);await talk(npc(n=>n.k==='chest'));const w=npc(n=>n.sp==='wendigrave');await talk(w);L('cry',F.cryC,F.wendC,G.bag.talisman);
 await go('bois',9,10,1);await talk(npc(n=>n.name==='Jeune fille pâle'));L('ghost',F.ghostQ);await go('lac',11,7,1);await talk(npc(n=>n.t==='ball'&&n.x===11&&n.y===6));L('med',G.bag.medaillon);
 await go('bois',9,10,1);await talk(npc(n=>n.name==='Jeune fille pâle'));await go('maisonY',3,4,1);await ysoldeTalk();L('ghostDone',F.ghostDone,G.bag.pierresoleil);
 // GALERIES
 setTime(1);await go('coteaux',17,12,1);await MAPS.coteaux.doors['17,11']();L('gal',G.map,G.x,G.y);F.c_galeries_12_14=1;refreshMap('galeries');
 await go('galeries',2,6,1);await pushRock(npc(n=>n.push&&n.x===2&&n.y===5),1);L('hole',F.c_galeries_2_4,mapRows('galeries')[4][2]);
 await go('galeries',10,7,0);await gastonTalk();L('gaston',F.gastonOk,G.map,G.bag.pierrechance);await go('ville',14,12,3);await talk(npc(n=>n.name==='Huguette'));L('tarte',G.bag.tartecycle);
 await go('galeries',12,2,1);await talk(npc(n=>n.k==='chest'));L('galC',F.galC,G.bag.casque);
 L('done')}
