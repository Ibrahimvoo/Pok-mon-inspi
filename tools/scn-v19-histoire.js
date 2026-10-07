// Test 19 : l'Acte I revu (leçon de Kael, sentinelles de la mine, choix de Corvin, silence de la forêt, ascension, feu de camp)
// puis les conséquences à Volterre et les crieurs.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const op=AUTO.pick,pick=f=>{AUTO.pick=m=>{const i=f(m);return i!=null?i:op(m)}},unpick=()=>AUTO.pick=op;
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1});G.keys.dex=1;G.party=[mon('torrentor',30),mon('brasilion',30)];
 // 1. Route 1 : la leçon de Kael
 loadMap('bourg',9,1,1);await warp('route1',9,17,1);ok(f().v19r1,'Kael donne sa leçon à l\'entrée de la Route 1');await SNAP('route1-lecon');
 ok(!MAPS.route1.npcs.some(n=>n.name==='Kael'),'Kael est parti en courant');ok(MAPS.route1.npcs.some(n=>n.fauna&&n.slp&&n.sp==='ratounet'),'le Ratounet dort toujours');
 // 2. Mine : sentinelles, Corvin
 f().badge=1;f().mineAlert=1;await warp('mine',11,16,1);ok(f().tip_garde,'conseil des sentinelles');const gm1=MAPS.mine.npcs.find(n=>n.tr?.id==='gm1'),d0=[];for(let i=0;i<8;i++){d0.push(gm1.d);await wait(400)}L('regards de gm1',d0.join(''));ok(new Set(d0).size>1,'les sbires tournent la tête');
 const cv=MAPS.mine.npcs.find(n=>n.tr?.id==='corvin');loadMap('mine',cv.x,cv.y+1,1);pick(m=>m.title==='Corvin est coincé'?0:null);await trainerBattle(cv);unpick();
 ok(f().t_corvin&&f().v19cor===1,'Corvin battu, puis sauvé de la poutre');ok(SAID.some(s=>/n'oublie jamais une dette/.test(s)),'Corvin promet de payer sa dette');
 loadMap('mine',11,2,1);await titoTalk(MAPS.mine.npcs.find(n=>n.name==='Tito'));ok(f().mine,'Tito sauvé');ok(SAID.some(s=>/boitant vers les vieux puits/.test(s)),'les mineurs parlent de Corvin');
 // 3. Forêt : le silence
 await warp('foret',0,8,3);ok(f().v19for,'Iris demande de l\'aide');ok(mus.want==='silence19','la forêt est silencieuse');await SNAP('foret-silence');
 ok(MAPS.foret.npcs.filter(n=>n.fauna&&!n.gone).length<=2,'presque plus aucune créature visible');ok(/Rends sa voix/.test(goal()),'objectif : '+goal());
 loadMap('foret',19,3,1);await rival2();ok(!f().rival2&&G.y===4,'Kael garde le sentier tant que la forêt est malade');
 // machine 1 (cachée) : ta créature la flaire
 loadMap('foret',5,3,1);await MAPS.foret.step();ok(!f().v19dv0,'pas encore trouvée à 2 cases');loadMap('foret',5,2,1);await MAPS.foret.step();ok(f().v19dv0,'machine des herbes trouvée');
 const hp0=G.party[0].hp;pick(m=>m.title==='Quel fil couper ?'?0:null);await interact();unpick();ok(!f().v19d0&&G.party[0].hp<hp0,'mauvais fil : décharge');
 pick(m=>m.title==='Quel fil couper ?'?2:null);await interact();unpick();ok(f().v19d0,'bon fil (jaune) : machine 1 éteinte');
 // machine 2 : la créature envoûtée
 const n2=G.party.length+G.box.length;loadMap('foret',17,13,0);pick(m=>m.title==='Quel fil couper ?'?1:null);await interact();unpick();
 ok(f().v19d1,'machine 2 éteinte');ok(G.party.length+G.box.length===n2+1&&[...G.party,...G.box].some(m=>m.sp==='hiboulume'),'le Hiboulume libéré rejoint l\'équipe');
 // machine 3 : le sbire et l'ordre de Vex
 loadMap('foret',22,8,1);pick(m=>m.title==='Quel fil couper ?'?0:null);await interact();unpick();await SNAP('foret-reveil');
 ok(f().v19d2&&f().v19forDone,'les trois machines sont éteintes, la forêt se réveille');ok(SAID.some(s=>/ORDRE DE VEX/.test(s)),'l\'ordre de Vex est découvert');ok(mus.want!=='silence19','la musique revient');
 loadMap('foret',19,3,1);await rival2();ok(f().rival2,'Kael : le combat du sentier');
 // 4. Mont Braise : l'ascension
 loadMap('mont',9,16,1);await MAPS.mont.step();ok(f().v19t1,'le Mont gronde');loadMap('mont',9,10,1);await MAPS.mont.step();ok(f().v19t2,'Solarion veille au sommet');
 // 5. Après l'éclipse : le feu de camp
 Object.assign(f(),{boss:1,eclipse:1});pick(m=>m.title==='Que dis-tu à Kael ?'?1:null);await warp('ville',21,8,2);unpick();await SNAP('ville-apres');
 ok(f().v19feu&&f().v19k===1&&f().r2,'nuit au coin du feu avec Kael, puis Brasia dégage la route');
 // 6. Volterre : Corvin paie sa dette, et sabote Orso en plein combat
 Object.assign(f(),{portScene:1,badge2:1,kael3:1,volArr:1});await warp('centrale',9,10,1);ok(f().v19cor===3,'Corvin attend à la Centrale');
 B=null;G.party=[mon('torrentor',45),mon('brasilion',45)];const o=MAPS.centrale2.npcs.find(n=>n.name==='Commandant Orso');loadMap('centrale2',o.x,o.y+1,1);await orsoTalk(o);L('orso',f().baseDone);ok(SAID.some(s=>/Espèce de traître/.test(s)),'Orso privé de son générateur en plein combat');
 // 7. Crieurs
 const c=MAPS.ville.npcs.find(n=>n.name==='Crieur');f().v19hl=null;const h=rumor();L('crieur',h);ok(/^Extra|^ÉDITION/.test(h),'le crieur annonce les nouvelles de l\'histoire');
 L('fin')}
