// Test 18.1 : flèche-guide (itinéraire de chaque étape de l'histoire), système de niveaux (plafond, rattrapage d'EXP), annonces de quêtes.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const st0={starter:'goutelin',intro:3,intro3:1,hSac:1,hCarte:1,hCap:1,tip_evr:1};const route=()=>{GDC={k:''};return gdRoute()};
 // 1. Flèche-guide : chaque étape de l'histoire a une cible atteignable depuis un lieu éloigné
 G.flags={intro:1};loadMap('chambre',3,3,1);let r=route();ok(r&&r.t.m==='chambre'&&r.path,'intro : la flèche montre les affaires à prendre ('+r?.lbl+')');
 Object.assign(f(),{hSac:1,hCarte:1,hCap:1});r=route();ok(r.next==='salon'&&r.end[2]==='door','intro : puis la porte de la chambre');
 const S=[[{},'bourg',10,10,'gym'],[{badge:1},'route1',10,10,'mine'],[{mine:1},'ville',10,8,'foret'],[{rival2:1},'foret',3,8,'mont'],[{boss:1,eclipse:1},'mont',10,15,'ville'],[{r2:1},'ville',10,8,'port'],[{portScene:1},'route2',20,13,'gym2'],
  [{badge2:1},'gym2',5,8,'port'],[{kael3:1},'port',10,8,'volterre'],[{volArr:1},'volterre',12,19,'centrale2'],[{baseDone:1},'centrale',9,10,'gym4'],[{badge4:1},'gym4',5,8,'volterre'],[{v18vol:1},'volterre',12,3,'carnavelle'],[{v18arr:1},'carnavelle',27,16,'atelier'],
  [{v18done:1,v18ecoute:1,badge5:1,v18faus:1,K:1},'carnaval',15,20,'volterre'],[{obsScene:1,bar:1},'obs',9,9,'obs'],[{selene2done:1},'obs',9,9,'dome'],[{vex2:1,balance:1},'bourg',10,10,'mont'],[{legS:1,legN:1},'bourg',10,10,'coteaux'],[{failleQ:1},'ville',10,8,'faille']];
 let acc={...st0};for(const[fl,m,x,y,want]of S){if(fl.K){G.keys.dg_masque=G.keys.dg_eclipse=1;delete fl.K}Object.assign(acc,fl);G.flags={...acc};loadMap(m,x,y,1);r=route();ok(r&&r.t.m===want&&(r.t.m===G.map&&!r.goals.length||r.path||r.end),`${goal().slice(0,46)}… → ${r?.t.m} (étape : ${r?.next||'ici'})`)}
 G.flags={...st0,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1};G.keys.dg_masque=1;G.dg=null;loadMap('atelier',4,5,1);r=route();ok(/masque/.test(r.hint||''),'conseil : mettre le masque pour entrer sur la Place');
 G.flags={...st0,balance:1,badge2:1};const g0=goal;goal=()=>'Entre dans le Temple des Fondateurs, sur le Récif des Marées (passeur de Port-Miroir).';loadMap('port',10,10,1);r=route();goal=g0;ok(r.via&&/Passeur/.test(r.via)&&r.maps.includes('recif'),'les bateaux font partie du chemin ('+r.via+')');
 // capture : flèche, repère et bandeau
 G.flags={...st0,badge:1};G.party=[mon('torrentor',20)];G.repel=9999;loadMap('ville',10,9,1);await wait(3200);await SNAP('guide-ville');
 G.opt.guide=0;ok(!gdShow(),'option : la flèche-guide se désactive');G.opt.guide=1;
 // 2. Niveaux : plafond selon l'histoire, écart maximal avec ta meilleure créature, rattrapage d'EXP
 G.flags={...st0,badge:1};G.party=[mon('torrentor',14)];ok(lvCap()===16&&lvRec()===14,'plafond après le 1er badge : '+lvBand());
 for(let i=0;i<30;i++){const l=lvWildCap(33);if(l>16)throw new Error('ÉCHEC créature sauvage trop forte : '+l)}ok(true,'une créature du Bois Sépulcral (Nv 33) ne dépasse pas 16 à ce stade');
 G.party=[mon('torrentor',5)];ok(lvWildCap(14)<=11,'équipe Nv 5 : rien au-dessus du Nv 11');G.party=[mon('torrentor',14)];
 {let lv=null;const p=run(()=>battle([mon('ombrelin',33,{wild:1})]));await until(()=>mode==='battle'&&B?.foe,8000);lv=B?.foe?.lv;await p;ok(lv&&lv<=16,'combat sauvage réel : Nv 33 ramené à '+lv)}
 {const n=MAPS.bois.npcs.find(n=>n.tr&&!n.tr.boss&&!n.tr.vs);let lv=null;const p=run(()=>battle(team(n.tr.team),{tr:{...n.tr,look:n.t}}));await until(()=>mode==='battle'&&B?.foe,8000);lv=Math.max(...B.foes.map(m=>m.lv));await p;ok(lv<=18,'dresseur ordinaire du Bois (Nv '+Math.max(...n.tr.team.map(x=>x[1]))+') ramené à '+lv)}
 {const n=MAPS.gym2.npcs.find(n=>n.tr?.id==='maelle');let lv=null;const p=run(()=>battle(team(n.tr.team),{tr:{...n.tr,look:n.t}}));await until(()=>mode==='battle'&&B?.foe,8000);lv=Math.max(...B.foes.map(m=>m.lv));await p;ok(lv===29,'les Champions gardent leurs niveaux (Maëlle '+lv+')')}
 G.flags={...st0};ok(lvCap()===15,'avant le 1er badge, plafond 15');G.party=[mon('torrentor',5)];{const m=G.party[0],e0=m.exp;await gainXp(m,40,1);ok(m.exp-e0>40,'rattrapage : '+(m.exp-e0)+' EXP au lieu de 40')}
 G.party=[mon('torrentor',30)];{const m=G.party[0],e0=m.exp;await gainXp(m,40,1);ok(m.exp-e0===40,'au-dessus du niveau conseillé : EXP normale')}
 G.flags={...st0,balance:1};ok(lvCap()===100,'après l\'histoire, plus de plafond');
 ok(lvZone('route1')[1]<=7,'niveaux affichés à l\'entrée : '+lvZone('route1'));
 // 3. Annonces de quêtes
 G.flags={...st0,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,v18ecoute:1,badge5:1,v18faus:1,v18done:1,obsScene:1,selene2done:1,vex2:1,balance:1};
 G.party=[mon('torrentor',60)];delete G.qk;QT.q=[];QT.cur=null;loadMap('theatre',7,2,1);await wait(800);ok(G.qk&&!QT.q.length&&!QT.cur,'les quêtes déjà connues ne sont pas annoncées');
 await maestroTalk();await until(()=>QT.cur,4000);ok(QT.cur?.k==='new'&&QT.cur.t==='La Partition Perdue','« NOUVELLE QUÊTE ! » La Partition Perdue');QT.hold=1;await SNAP('quete-nouvelle');QT.hold=0;
 while(QT.cur||QT.q.length)await wait(100);
 const pb=npcs(MAPS.marais).find(n=>n.t==='ball'&&!n.item);await pb.fn();await maestroTalk();await until(()=>QT.cur?.k==='done',6000);ok(QT.cur?.t==='La Partition Perdue','« QUÊTE TERMINÉE ! »');QT.hold=1;await SNAP('quete-finie');QT.hold=0;
 while(QT.cur||QT.q.length)await wait(100);
 G.flags={...st0};delete G.qk;await wait(500);f().badge=1;await until(()=>QT.cur,4000);ok(QT.cur?.k==='new'&&QT.cur.t==='Les Coteaux d\'Aurore','le badge ouvre une quête : Les Coteaux d\'Aurore');ok(QT.q.some(q=>q.k==='goal'&&/Tito/.test(q.d)),'« NOUVEL OBJECTIF » quand l\'histoire avance (à la suite)');
 await until(()=>QT.cur?.k==='goal',9000);await wait(900);QT.hold=1;await SNAP('objectif');QT.hold=0;
 ok(NEWS.slice(0,4).some(n=>n[1]==='Flèche-guide et niveaux'),'nouveautés 18.1 parmi les plus récentes');
 L('done')}
