// Test 19 : les Gardiens du Cycle (piste de Solarion, Épreuve du Zénith, fragments de Nocturion, Épreuve de la Nuit).
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,obsScene:1,volArr:1,baseDone:1,badge4:1,bar:1,selene2done:1,vex2:1,balance:1,v18vol:1,v18done:1});
 G.keys.dex=1;G.keys.bracelet=1;const day=()=>{G.t=CYC*Math.ceil(G.t/CYC)+Math.floor(CYC*.3)},nite=()=>{G.t=CYC*Math.ceil(G.t/CYC)+Math.floor(CYC*.8)};day();ok(!night(),'il fait jour');
 ok(/Solarion veille au sommet/.test(goal()),'objectif : '+goal());
 // 1. Solarion s'envole du sommet
 const sm=MAPS.mont.npcs.find(n=>n.sp==='solarion'&&n.fn);loadMap('mont',sm.x,sm.y+1,1);ok(npcs(MAPS.mont).includes(sm),'Solarion au sommet');await interact();
 ok(f().v19sol===1&&G.keys.plume===1,'il s\'envole et laisse une Plume d\'Aube');ok(!npcs(MAPS.mont).includes(sm),'le sommet est vide');
 // 2. Coteaux, 3. Bourg-Lueur
 loadMap('coteaux',17,5,1);await MAPS.coteaux.step();ok(f().v19sol===2&&G.keys.plume===2,'deuxième apparition aux Coteaux');
 loadMap('bourg',15,12,1);await MAPS.bourg.step();await SNAP('solarion-bourg');ok(f().v19sol===3&&G.keys.plume===3&&SAID.some(s=>/détourné les yeux/.test(s)),'Solarion parle à Bourg-Lueur');
 // 4. Épreuve du Zénith : tenir 6 tours (équipe qui ne fait que se protéger)
 G.party=[0,1,2,3,4,5].map(()=>mon('rocaroc',70,{moves:['durcir']}));loadMap('mont',sm.x,sm.y+1,1);ok(npcs(MAPS.mont).includes(sm),'Solarion est revenu au sommet');
 const n0=G.bag.capsule=5;await interact();ok(f().legS&&[...G.party,...G.box].some(m=>m.sp==='solarion'),'Épreuve du Zénith réussie : Solarion t\'a choisi');ok(SAID.some(s=>/Épreuve : 3\/6/.test(s)),'compte des tours affiché');
 // 5. Nocturion recule, fragments
 nite();ok(night(),'il fait nuit');const dn=MAPS.dome.npcs.find(n=>n.sp==='nocturion'&&n.fn);loadMap('dome',dn.x,dn.y+1,1);await interact();ok(f().v19noc===1,'Nocturion recule et parle des chaînes');
 ok(!npcs(MAPS.dome).includes(dn),'le dôme est vide pendant la quête');
 loadMap('dome',8,5,1);await interact();ok(f().v19f2,'fragment du dôme : les chaînes');
 loadMap('lunevie',8,16,0);await interact();ok(f().v19f0,'fragment de Lunévie : les lanternes');
 loadMap('clairiere',2,4,0);await interact();await SNAP('fragment');ok(f().v19f1,'fragment de la clairière : la berceuse');ok(/Épreuve de la Nuit/.test(goal()),'objectif : '+goal());
 // 6. Épreuve de la Nuit : attaques LUMIÈRE interdites, le ramener sous le quart de ses PV
 G.party=[mon('phalumine',70),mon('rocaroc',70,{moves:['durcir']})];{const um=useMove;useMove=async function(s,id){if(B?.o?.trial&&s===0&&B.turn>=2&&B.foe.hp>0){B.foe.hp=Math.floor(st(B.foe).hp*.2);id='durcir'}return um.call(this,s,id)};const et=useMove;
  loadMap('dome',dn.x,dn.y+1,1);ok(npcs(MAPS.dome).includes(dn),'Nocturion attend');await interact();useMove=um}
 ok(SAID.some(s=>/se perd dans l'ombre/.test(s)),'les attaques LUMIÈRE sont refusées');ok(f().legN&&G.party.some(m=>m.sp==='nocturion'),'Épreuve de la Nuit réussie : Nocturion t\'a choisi');
 ok(!/Gardiens/.test(goal()),'objectif suivant : '+goal());
 // 7. Au Sanctuaire, les deux frères se réconcilient avant Crépuscel
 day();G.party=[mon('torrentor',90),mon('brasilion',90)];const cr=MAPS.sanctuaire.npcs.find(n=>n.sp==='crepuscel');loadMap('sanctuaire',cr.x,cr.y+1,1);await interact();ok(f().v19rec2&&SAID.some(s=>/partager le ciel/.test(s)),'Solarion et Nocturion se réconcilient : Crépuscel apparaît');L('fin')}
