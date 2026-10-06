// Test 12.0 : Pension, œufs et hérédité, éclosion, œuf d'Elias, échanges, mode Expert, Mémo du Cycle, sauvegarde
async()=>{const L=(...a)=>console.log('LOG',...a);const F=f(),AP=AUTO.pick,ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(F,{starter:'flamiot',rs:'goutelin',intro:3,badge:1,badge2:1,badge4:1});G.keys.dex=1;G.money=50000;G.repel=9999;
 const top=SP.ratounet.learn.filter(([l])=>l>1).map(x=>x[1]).pop();
 const pa=mon('ratounet',14),pb=mon('ratounet',16);pa.moves=[pa.moves[0],top];pa.pp=pa.moves.map(x=>MV[x].pp);pa.nat='vif';pa.item='rubanher';pb.nat='robuste';
 G.party=[mon('brasilion',40),pa,pb,mon('lumipeche',20),mon('herissou',18)];G.party[0].aff=200;save();
 const go=async(m,x,y,d=0)=>{loadMap(m,x,y,d);await wait(300)};let seq;
 const menuSeq=(key,extra)=>m=>{if(m.opts.includes(key)){const v=seq.shift();return typeof v==='string'?m.opts.indexOf(v):v??-1}const r=extra?.(m);return r??AP(m)};
 // Pension : intro, Couveuse, dépôt de deux Ratounet
 await go('coteaux',15,12,3);const od=npcs(MAPS.coteaux).find(n=>n.name==='Mamie Odette'),fi=npcs(MAPS.coteaux).find(n=>n.name==='Papi Firmin');ok(od&&fi,'Odette et Firmin présents');
 seq=['DÉPOSER','DÉPOSER','AU REVOIR'];let dq=[1,1];AUTO.pick=menuSeq('DÉPOSER',m=>m.bare?dq.shift():null);await od.fn(od);
 ok(G.keys.couveuse&&G.pen.length===2&&G.party.length===3,'Couveuse reçue, deux créatures en pension');ok(penCompat()===2,'même famille : compatibilité maximale');
 await SNAP('pension');
 // Ponte forcée, puis Firmin remet l'œuf
 const R0=Math.random;G.penS=127;Math.random=()=>.1;await onStep();Math.random=R0;ok(G.penEgg===1,'un œuf apparaît après des pas');ok(fi.qm(),'bulle ! sur Firmin');
 AUTO.pick=AP;await fi.fn(fi);const e=G.eggs[0];ok(e&&e.sp==='ratounet'&&e.nat==='vif'&&e.mv.includes(top),`œuf : ratounet, tempérament du Ruban, capacité héritée ${top}`);
 AUTO.off=1;const pp=pauseMenu();await wait(400);await SNAP('couveuse-menu');press('b');await pp;AUTO.off=0;
 // Éclosion (Corps Ardent : Brasilion ? sinon pas normaux)
 e.steps=1;const n0=G.party.length;const hp=onStep();await wait(1500);await SNAP('eclosion');await hp;const b=G.party[n0];
 ok(G.party.length===n0+1&&b.sp==='ratounet'&&b.lv===1&&b.egg&&b.moves.includes(top)&&b.nat==='vif','éclosion : petit niveau 1 avec héritage');ok(G.dex.ratounet===2&&F.hatched===1,'Pixédex et compteur');
 // Retrait : EXP de pension et frais
 G.pen[0].exp=xpFor(G.pen[0].lv+3)+5;const cash=G.money,lv0=G.pen[0].lv;seq=['RETIRER','AU REVOIR'];AUTO.pick=menuSeq('DÉPOSER',m=>m.title==='Retirer'?0:null);await od.fn(od);
 const w=G.party[G.party.length-1];ok(w.lv===lv0+3&&G.money===cash-400&&G.pen.length===1,`retrait : +3 niveaux (${w.lv}), 400 pièces`);AUTO.pick=AP;
 // Échanges : Malo (Cendreville) et Yann (Port-Miroir)
 await go('ville',5,12,1);const ma=npcs(MAPS.ville).find(n=>n.name==='Petit Malo');ok(ma?.qm(),'Malo propose un échange');AUTO.pick=m=>m.bare?G.party.indexOf(w):AP(m);await ma.fn(ma);AUTO.pick=AP;
 const rc=G.party.find(m=>m.sp==='ricanoir');ok(rc&&rc.ot==='Petit Malo'&&F.trd_malo&&!ma.qm(),'échange Ratounet contre Ricanoir');const x0=rc.exp;await gainXp(rc,100,1);ok(rc.exp===x0+150,'créature échangée : EXP x1,5');
 await go('port',9,12,1);const ya=npcs(MAPS.port).find(n=>n.name==='Matelot Yann');await ya.fn(ya);ok(G.party.some(m=>m.sp==='pousseron'&&m.ot),'troisième starter obtenu par échange');
 AUTO.off=1;let sp=summary(rc);await wait(200);press('right');await wait(300);await SNAP('profil-origine');press('b');await sp;AUTO.off=0;
 // Mode Expert
 await difficulty();ok(F.expert===1&&expCap()===46,'mode Expert activé, plafond 46');const cap=mon('flamiot',46);cap.exp=xpFor(46);await gainXp(cap,5000,1);ok(cap.lv===46&&cap.exp===xpFor(46),'plafond de niveau respecté');
 const foes=[mon('brisillon',20)];const m0=G.money,bp=battle(foes,{tr:{name:'Test',money:400,boss:1,team:[]}});await wait(100);ok(foes[0].lv>=23&&foes[0].item,`dresseur Expert : niveau ${foes[0].lv}, objet ${foes[0].item}`);
 const r=await bp;ok(r==='win'&&G.money>=m0+500&&F.expB===1,'prime Expert et boss compté');
 AUTO.off=1;const op=options();await wait(300);await SNAP('options');press('b');await op;AUTO.off=0;await difficulty();ok(!F.expert,'retour au mode normal');
 // Œuf d'Elias
 F.balance=1;G.eggs=[];AUTO.pick=AP;await go('coteaux',15,12,3);ok(fi.qm(),'Firmin a un cadeau après le Cycle rétabli');await fi.fn(fi);ok(G.eggs[0]?.el,'œuf d\'Elias reçu');
 G.eggs[0].steps=1;await onStep();const el=[...G.party,...G.box].find(m=>m.egg==='elias');ok(el&&el.sp==='nebulin'&&el.sh&&el.moves.includes('voilestellaire'),'Nébulin d\'Elias : chromatique, Voile Stellaire');
 // Mémo du Cycle (Félix, Volterre) : partie parfaite pilotée
 await go('volterre',16,7,0);const fx=npcs(MAPS.volterre).find(n=>n.name==='Gérant Félix');ok(fx,'Félix présent');
 AUTO.hold=m=>!!MEMO&&!m;let solving=0;const solve=async()=>{while(!MEMO)await wait(20);await wait(200);await SNAP('memo');const C=MEMO.cards,done=new Set();for(let i=0;i<16;i++){if(done.has(i))continue;const j=C.findIndex((c,k)=>k!==i&&c.sp===C[i].sp);done.add(i);done.add(j);
   for(const t of[i,j]){MEMO.cur=t;press('a');await wait(60)}}};
 seq=['JOUER','LOTS','AU REVOIR'];AUTO.pick=menuSeq('JOUER',m=>m.title?.startsWith('Jetons')?(solving++?-1:PRZ.findIndex(p=>p[0]==='rubanher')):null);const fp=fx.fn(fx);await solve();await fp;AUTO.hold=null;AUTO.pick=AP;
 ok(F.memoP&&G.bag.jeton===4&&G.bag.rubanher>=1,`partie parfaite : 16 jetons, Ruban acheté (reste ${G.bag.jeton})`);
 // Sauvegarde et migration
 save();const g2=load();ok(g2.pen.length===1&&g2.flags.trd_malo&&g2.flags.hatched===2,'sauvegarde : pension, échanges, éclosions');
 const old=JSON.parse(JSON.stringify(G));old.v=11;delete old.pen;delete old.eggs;const n2=normalize(old);ok(n2.v>=12&&Array.isArray(n2.pen)&&Array.isArray(n2.eggs),'migration 11 -> 12');
 achCheck();ok(G.ach.egg1&&G.ach.elias&&G.ach.memo,'succès 12.0');
 AUTO.off=1;const jp=journal();await wait(400);await SNAP('journal');press('b');await jp;const wp=whatsNew();await wait(400);await SNAP('news');press('b');await wp;AUTO.off=0;
 L('done')}
