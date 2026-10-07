// Test 19.1 : l'Acte II revisité — la nuit des bateaux perdus, le petit veilleur du ponton, la Centrale en douce,
// l'Observatoire (sceau, Kael, Sélène convaincue), les mots pour Valen et l'épilogue.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const op=AUTO.pick,pick=f=>{AUTO.pick=m=>{const i=f(m);return i!=null?i:op(m)}},unpick=()=>AUTO.pick=op;
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,v19r1:1,v19feu:1,v19k:1,v19forDone:1});G.keys.dex=1;G.keys.bracelet=1;
 G.party=[mon('torrentor',30),mon('brasilion',30)];
 // 1. Route 2 : le petit Ombrelin dans la brume
 loadMap('route2',15,13,2);await MAPS.route2.step();ok(f().v191om===1,'un petit Ombrelin aperçu dans la brume');ok(!MAPS.route2.npcs.some(n=>n.sp==='ombrelin'&&n.fix),'il a disparu');
 // 2. Port-Miroir : le Prof, puis l'alarme
 await warp('port',22,8,2);ok(f().portScene&&f().v191al,'le Prof parle, puis la cloche sonne l\'alarme');ok(/Rejoins Maëlle au bout du ponton/.test(goal()),'objectif : '+goal());
 const mar=MAPS.port.npcs.find(n=>n.name==='Passeur Marius');ok(mar.x===11,'le ponton est libre (Marius décalé)');
 await MAPS.port.doors['6,4']();ok(G.map==='port'&&SAID.some(s=>/Les bateaux d'abord/.test(s)),'l\'arène est fermée');
 // 3. Maëlle, le phare, le faisceau, le Torrentor
 window.PH191AUTO=1;(async()=>{while(!PV191.on)await wait(20);window.PH191HOLD=1;await wait(200);await SNAP('phare-vue');window.PH191HOLD=0;while(PV191.on&&!PV191.boats.some(b=>b.st==='reveal'))await wait(10);window.PH191HOLD=1;await wait(400);await SNAP('phare-ombre');window.PH191HOLD=0})();
 loadMap('port',14,15,3);await interact();L('torrentor',f().v191tor,'dégâts',f().v191dmg);
 ok(f().v191lit&&f().v191ph,'le phare est rallumé et les bateaux sont rentrés');ok([1,2].includes(f().v191tor),'le Torrentor est calmé ou repoussé');
 ok(G.bag.biscuit>=3&&G.bag.filetcapsule>=3,'récompenses du port');ok(SAID.some(s=>/Valen disait que tant qu'il brillerait/.test(s)),'Maëlle parle de Valen et du phare');
 ok(!ph191On()&&!MAPS.port.npcs.some(n=>n.t==='maelle'&&npcs(MAPS.port).includes(n)),'Maëlle est retournée à son arène');
 loadMap('port',17,12,0);await wait(200);await SNAP('port-phare');
 await MAPS.port.doors['6,4']();ok(G.map==='gym2','l\'arène est ouverte');ok(/ramené mes marins/.test(MAPS.gym2.npcs.find(n=>n.tr?.id==='maelle').tr.pre),'Maëlle se souvient de la nuit');
 // 4. Le petit veilleur du ponton
 const ro=MAPS.port.npcs.find(n=>n.name==='Mémé Rosa');loadMap('port',ro.x,ro.y+1,1);ok(ro.qm(),'Mémé Rosa a quelque chose à dire');await interact();ok(f().v191omR,'Mémé Rosa raconte Brume et le petit');
 loadMap('port',15,15,3);pick(m=>m.title==='Le petit Ombrelin te regarde'?0:null);await interact();unpick();
 ok(f().v191om===3&&G.party.some(m=>m.pb19),'le petit Ombrelin rejoint l\'équipe');
 // 5. Centrale : personne ne t'a vu
 Object.assign(f(),{badge2:1,kael3:1,volArr:1});G.party=[mon('torrentor',45),mon('brasilion',45),...G.party.filter(m=>m.pb19)];G.party[2].lv=40;
 await warp('centrale',9,10,1);ok(f().tip_garde191,'conseil : passer dans le dos des sbires');const g1=MAPS.centrale.npcs.find(n=>n.tr?.id==='ce_g1'),d0=[];for(let i=0;i<8;i++){d0.push(g1.d);await wait(400)}ok(new Set(d0).size>1,'les sbires tournent la tête');
 const o=MAPS.centrale2.npcs.find(n=>n.name==='Commandant Orso');const m0=G.money;loadMap('centrale2',o.x,o.y+1,1);await o.fn(o);
 ok(f().baseDone&&f().v191gh===1,'Orso battu sans qu\'aucun sbire ne t\'ait vu');ok(SAID.some(s=>/Mes sbires dorment debout/.test(s)),'Orso pris de court');ok(G.money>=m0+2500,'la prime de sécurité');
 ok(SAID.some(s=>/Caïus\. Il surveille mon frère/.test(s))&&!SAID.some(s=>/Ça ne peut pas être/.test(s)),'Kael sait déjà que Vex est Valen : le dossier parle de Caïus');
 // 6. Observatoire
 Object.assign(f(),{badge4:1,doc_caius:1,v19ec1:1,v19ec2:1});await warp('obs',8,9,1);ok(f().obsScene&&f().v191s3,'le sceau tient à 3 %');
 const g8=MAPS.obs.npcs.find(n=>n.tr?.id==='g8');loadMap('obs',g8.x-1,g8.y,3);await trainerBattle(g8);ok(f().t_g8&&SAID.some(s=>/Celui-là, il est pour moi/.test(s)),'Kael retient un sbire');
 await MAPS.obs.acts['12,5']();ok(SAID.some(s=>/ses mille sœurs/.test(s)),'l\'énigme des consoles');
 for(const i of[1,0,2])await consoleAct(i);ok(f().bar&&f().v191s2,'la barrière tombe, le sceau à 2 %');
 const se=MAPS.obs.npcs.find(n=>n.tr?.id==='selene2');loadMap('obs',9,4,1);pick(m=>m.title==='Que dis-tu à Sélène ?'?0:null);await trainerBattle(se);unpick();
 ok(f().v191sel&&f().selene2done&&f().t_selene2&&f().v191s1,'Sélène convaincue sans combat, le sceau à 1 %');
 // 7. Le combat final et l'épilogue
 healAll();(async()=>{while(!PV191.epi||!ui.text)await wait(5);AUTO.off=1;await wait(300);await SNAP('epilogue');AUTO.off=0})();
 pick(m=>m.title==='Que dis-tu à Valen ?'?0:m.title==='Le petit Ombrelin'?1:null);await warp('dome',5,6,1);loadMap('dome',5,5,1);await MAPS.dome.step();unpick();
 L('mots',JSON.stringify(f().v191w));ok(f().vex2&&f().balance,'Vex est arrêté');ok((f().v191w||[]).length>=5&&f().v191w.includes('LE PETIT OMBRELIN'),'tous les mots pour Valen');
 ok(SAID.some(s=>/Tu n'es pas Brume/.test(s)),'le petit Ombrelin retrouve Valen');ok(SAID.some(s=>/Nocturion n'attaque pas/.test(s))||SAID.some(s=>/se dissipe/.test(s)),'Nocturion hésite');
 ok(f().v191epi&&SAID.some(s=>/dura jusqu'au matin/.test(s))&&SAID.some(s=>/fantôme a traversé sa Centrale/.test(s)),'épilogue des conséquences');
 ok(f().v191om===4&&!G.party.some(m=>m.pb19),'le petit Ombrelin a choisi Valen');
 Object.assign(f(),{balance:1});loadMap('dome',2,6,1);ok(npcs(MAPS.dome).some(n=>n.sp==='ombrelin'),'il dort contre la botte de Valen');
 const Q=quests().map(q=>q[0]);L('quêtes',Q.join(' | '));ok(['La nuit des bateaux perdus','Le petit veilleur du ponton','Le fantôme de la Centrale','Les mots de Sélène','Les mots pour Valen'].every(q=>Q.includes(q)),'journal des quêtes');
 L('fin')}
