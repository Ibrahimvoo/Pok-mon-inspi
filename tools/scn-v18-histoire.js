// Test 18.0 : le chapitre du Carnaval des Masques de bout en bout, puis le désert, le Tombeau, les légendaires, le ferry, les quêtes et les boutiques.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1});G.keys.dex=1;G.keys.bracelet=1;
 G.party=[mon('torrentor',70),mon('bourdonnerre',70),mon('phalumine',70),mon('rocaroc',70),mon('papivigne',70),mon('brasilion',70)];G.money=200000;
 const pick=(want)=>{const op=AUTO.pick;AUTO.pick=m=>{const i=want(m);return i!=null?i:op(m)};return()=>AUTO.pick=op};
 const fightAll=async k=>{for(const n of[...MAPS[k].npcs])if(n.tr&&!f()['t_'+n.tr.id]&&(!n.cond||n.cond())&&!n.disg){loadMap(k,n.x,n.y+1>=MAPS[k].rows.length?n.y-1:n.y+1);await trainerBattle(n)}};
 // 1. Volterre : la clé est volée
 loadMap('volterre',13,1,1);ok(/téléphérique/.test(goal()),'objectif avant : '+goal());await volGate();ok(f().v18vol&&G.map==='volterre','la clé est volée, on reste à Volterre');ok(/Gorges du Vent/.test(goal()),'objectif : '+goal());
 await volGate();ok(G.map==='volterre','sans la clé, le téléphérique ne part pas');ok(!npcs(MAPS.volterre).some(n=>n.name==='Garde des Gorges'),'le garde des Gorges laisse passer');
 ok(npcs(MAPS.volterre).some(n=>n.name==='Ambroise'),'Ambroise attend près du téléphérique');
 // 2. Gorges du Vent puis Carnavelle
 await warp('route3',30,9,2);await fightAll('route3');ok(['r3a','r3b','r3c','r3d','r3e'].every(k=>f()['t_'+k]),'les 5 dresseurs des Gorges');
 await warp('carnavelle',28,16,2);ok(f().v18arr&&!npcs(MAPS.carnavelle).some(n=>n.t==='mirella'),'arrivée au Carnaval (cinématique + Mirella)');ok(/Mirella/.test(goal()),'objectif : '+goal());
 ok(npcs(MAPS.carnavelle).filter(n=>n.name==='Garde du Carnaval').length===2,'sans masque, les gardes bloquent la Place');
 loadMap('atelier',4,4,1);await mirellaTalk();ok(dgHas('masque')&&!G.dg,'Mirella offre le masque');ok(/TENUES/.test(goal()),'objectif : '+goal());
 // menu TENUES dans le menu pause
 {let st=0;const r=pick(m=>{if(m.opts.includes('TENUES')&&st===0){st=1;return m.opts.indexOf('TENUES')}if(m.title==='Tenues'&&st===1){st=2;return 0}if(m.opts.includes('FERMER')&&st===2)return m.opts.indexOf('FERMER');return null});await pauseMenu();r()}
 ok(G.dg==='masque'&&dgLook()==='dgmasque','TENUES depuis le MENU : le masque est porté');ok(carnOpen()&&!npcs(MAPS.carnavelle).some(n=>n.name==='Garde du Carnaval'),'masqué, la Place est ouverte');
 await dgWear(null);ok(!carnOpen(),'sans le masque, les gardes reviennent');await dgWear('masque');
 // 3. La Place : les sbires bavards
 await warp('carnaval',14,21,1);loadMap('carnaval',19,8,1);await gruntsTalk(0);ok(f().v18ecoute,'les sbires parlent du Repaire et du mot de passe');ok(/Arlequin/.test(goal()),'objectif : '+goal());
 loadMap('atelier',4,4,1);await mirellaTalk();ok(f().v18mq&&!dgHas('eclipse'),'Mirella demande le Badge Masque d\'abord');
 // 4. L'Arène des Masques
 await gym5Door();ok(G.map==='gym5','entrée de l\'arène');ok(!npcs(MAPS.gym5).some(n=>n.tr?.id==='arlequin'),'le vrai Arlequin est caché');await fightAll('gym5');
 for(const i of[0,1]){const n=MAPS.gym5.npcs.find(n=>n.name==='Arlequin ?'&&n.x===(i?9:2));loadMap('gym5',n.x,n.y+1,1);await fakeArlequin(n,i)}ok(f().v18fk0&&f().v18fk1,'les deux reflets sont brisés');
 const arl=npcs(MAPS.gym5).find(n=>n.tr?.id==='arlequin');ok(!!arl,'le vrai Arlequin apparaît');loadMap('gym5',5,2,1);await interact();ok(f().badge5&&G.bag.dc_mascarade,'Badge Masque et DC Mascarade');
 loadMap('atelier',4,4,1);await mirellaTalk();ok(dgHas('eclipse')&&f().v18unif,'Mirella coud l\'uniforme');ok(/coulisses/.test(goal()),'objectif : '+goal());
 // 5. Le Théâtre : mot de passe
 await warp('theatre',7,10,1);loadMap('theatre',14,3,1);await trapGuard();ok(!f().v18trappe,'sans uniforme, le machiniste refuse');
 await dgWear('eclipse');{const r=pick(m=>m.title==='Mot de passe'?0:null);await trapGuard();r()}ok(!f().v18trappe,'mauvais mot de passe : combat et refus');
 {const r=pick(m=>m.title==='Mot de passe'?1:null);await trapGuard();r()}ok(f().v18trappe&&!npcs(MAPS.theatre).some(n=>n.name==='Machiniste louche'),'bon mot de passe');
 await trapDoor();ok(G.map==='repaire','dans le Repaire');
 // 6. Le Repaire, déguisé
 loadMap('repaire',4,9,1);G.dir=1;const before=Object.keys(f()).filter(k=>/^t_rp/.test(k)).length;await checkTrainers();ok(Object.keys(f()).filter(k=>/^t_rp/.test(k)).length===before,'en uniforme, les sbires ne t\'attaquent pas');
 {const g=MAPS.repaire.npcs.find(n=>n.tr?.id==='rpa');const r=await trainerBattle(g);ok(r==null&&!f().t_rpa,'parler à un sbire en uniforme : une simple discussion')}
 await gastonRep();ok(f().v18gaston,'Gaston donne le code');await officeDoor();ok(G.map==='repaire','porte fermée sans code');
 {const r=pick(m=>m.title==='Code d\'accès'?0:null);await robotTalk();r()}ok(!f().v18code,'mauvais code : alerte');
 {const r=pick(m=>m.title==='Code d\'accès'?1:null);await robotTalk();r()}ok(f().v18code,'bon code : le robot s\'écarte');
 await claraTalk();ok(f().v18clara&&[...G.party,...G.box].some(m=>m.sp==='protomk'),'Clara libérée, Proto-MK reçu');
 await officeDoor();ok(G.map==='repaire2','bureau de Faustine');loadMap('repaire2',6,3,1);await faustineFight(MAPS.repaire2.npcs.find(n=>n.t==='faustine'));
 ok(f().v18faus&&G.bag.clecabine,'Faustine battue, clé récupérée');ok(/Ambroise/.test(goal()),'objectif : '+goal());
 await dgWear(null);loadMap('commiss',4,3,1);await barnabeTalk();ok(f().v18barn,'récompense du commissaire');
 // 7. Retour à Volterre
 loadMap('volterre',13,1,1);await volGate();ok(f().v18done&&!G.bag.clecabine,'Ambroise répare le téléphérique');ok(/téléphérique/.test(goal()),'l\'histoire reprend : '+goal());
 await volGate();ok(G.map==='obs','le téléphérique monte à l\'Observatoire');
 // 8. Après le chapitre (et la fin de l'histoire) : Grand Bal, ferry, désert, tombeau, légendaires, quêtes
 Object.assign(f(),{obsScene:1,selene2done:1,vex2:1,balance:1});
 ok(npcs(MAPS.carnavelle).every(n=>n.name!=='Garde du Carnaval'),'après le chapitre, la Place est ouverte à tous');
 G.t=CYC*5+300;loadMap('carnaval',15,20,1);const fb=npcs(MAPS.carnaval).find(n=>n.t==='faustine');ok(!!fb,'Faustine au Grand Bal, la nuit');G.party.forEach(m=>{m.lv=100;m.exp=xpFor(100)});healAll();await grandBal(fb);healAll();ok(f().v18baln===1&&G.bag.masqueor,'Grand Bal remporté');ok(!npcs(MAPS.carnaval).some(n=>n.t==='faustine'),'une fois par nuit');
 G.t=CYC*6+60;loadMap('carnavelle',7,17,2);await ferryTalk('carnavelle');ok(G.map==='corail','ferry vers l\'Île Corail');await ferryTalk('corail');ok(G.map==='carnavelle','retour à Carnavelle');
 loadMap('dunes',26,16,1);tryMove(1);await wait(400);ok(G.y===16,'sans Tenue des Sables, la tempête repousse');while(ui.text)await wait(50);
 await saidTalk();ok(dgHas('sable'),'Saïd prête la Tenue des Sables');await dgWear('sable');tryMove(1);await wait(400);ok(G.y===15,'avec la tenue, on avance dans la tempête');
 await tombDoor();ok(G.map==='tombeau'&&mapRows('tombeau')[4][10]==='^','Tombeau : mur scellé');
 await tombStatue(1);ok(!(f().v18tst||[]).length,'mauvais ordre : tout s\'éteint');for(const i of[0,1,2,3])await tombStatue(i);ok(f().v18tomb&&mapRows('tombeau')[4][10]==='g'&&MAPS.tombeau.rows[4][10]==='g','les statues ouvrent la crypte');
 await warp('tombeau2',7,9,1);await cryptChest();ok(!f().v18lamp,'le gardien protège le coffre');await cryptGuard(MAPS.tombeau2.npcs.find(n=>n.sp==='scorpharaon'));ok(f().v18garde,'gardien vaincu');await cryptChest();ok(f().v18lamp&&G.bag.lampe,'Lampe Ancienne');
 G.t=CYC*7+60;loadMap('oasisH',4,3,1);await aminaTalk();ok(!f().legD,'le génie ne sort pas le jour');G.t=CYC*7+300;await aminaTalk();ok(f().legD,'Djinnflamme libéré la nuit');
 G.t=CYC*8+5;L('phase',PHN[phase()]);loadMap('oasis',17,13,3);ok(oasiOk()&&npcs(MAPS.oasis).some(n=>n.sp==='oasiphant'),'Oasiphant apparaît à l\'aube');await oasiphantEvent(MAPS.oasis.npcs.find(n=>n.sp==='oasiphant'));ok(f().legO&&!oasiOk(),'Oasiphant vaincu ou capturé');
 f().t_r3e=1;f().t_mac=1;f().t_coa=1;loadMap('carnH1',4,3,1);await kaitoTalk();ok(dgHas('ninja'),'Tenue de Ninja');
 G.party[5]=mon('poupetronce',30);loadMap('cabaneB',4,3,1);await berenTalk();ok(dgHas('feuille'),'Cape de Feuillage');ok(ACH.find(a=>a[0]==='v18c')[3](),'succès : garde-robe complète');
 await dgWear('ninja');loadMap('marais',20,14,1);G.dir=0;const bt=Object.keys(f()).length;await checkTrainers();ok(Object.keys(f()).length===bt,'en ninja, les dresseurs ne te voient pas');
 loadMap('theatre',7,2,1);await maestroTalk();ok(f().v18partQ===1,'quête de la partition');const pb=npcs(MAPS.marais).find(n=>n.t==='ball'&&!n.item);ok(!!pb,'la partition est dans le Marais');await pb.fn();await maestroTalk();ok(f().v18partQ===2&&G.bag.dc_oracle,'partition rendue');
 loadMap('carnaval',14,18,1);await heraultTalk();ok(f().v18ccn===1,'Concours de Costumes');await heraultTalk();ok(f().v18ccn===1,'une fois par jour');loadMap('tente',4,3,1);await fortuneTalk();ok(f().v18fo===dayN(),'prédiction du jour');
 // boutiques : acheter un objet dans chaque rayon
 for(let i=0;i<5;i++){let st=0,bu=0;const n0=JSON.stringify(G.bag),r=pick(m=>{if(m.opts[0]==='ACHETER'){st++;return st===1?0:2}if(/^Acheter/.test(m.title||''))return bu++?-1:0;return null});await gmShop(i);r();ok(JSON.stringify(G.bag)!==n0,'Grand Magasin, rayon '+i)}
 for(const fn of[pralineShop,fruitShop,bazarShop,paillShop]){let st=0,bu=0;const r=pick(m=>{if(m.opts[0]==='ACHETER'){st++;return st===1?0:2}if(/^Acheter/.test(m.title||''))return bu++?-1:0;return null});const m0=G.money;await fn();r();ok(G.money<m0,'boutique '+fn.name)}
 // objectifs de fin
 L('post',postGoal(f()));{const Q=quests();ok(['Le Carnaval des Masques','Garde-robe','Le Roi des Sables','La Partition Perdue','L\'art de l\'ombre'].every(t=>Q.some(q=>q[0]===t)),'journal : les quêtes 18.0')}
 ok(normalize(JSON.parse(JSON.stringify(G))).v>=18,'sauvegarde 18.0');{const g=JSON.parse(JSON.stringify(G));g.dg='pirate';ok(normalize(g).dg===null,'un déguisement inconnu est retiré au chargement')}
 L('done')}
