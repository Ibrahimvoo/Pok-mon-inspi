// Test 19.3 : la fin du Cycle — Sélène se souvient, Corvin repenti baisse un levier (ou garde le chantier, puis quitte la Team),
// « Que dis-tu à Caïus ? », Crépuscel attend que Caïus soit arrêté, la première aube partagée, l'épilogue et FIN.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 G=newGame();mode='world';busy=true;Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,v18done:1,v18faus:1,
  obsScene:1,bar:1,selene2done:1,vex2:1,balance:1,legS:1,legN:1,v19rec2:1,v191sel:1,v191d:3,v192fa:1,v19cor:3,tip_evr:1});G.keys.dex=1;G.keys.bracelet=1;G.party=[mon('torrentor',90),mon('brasilion',90)];loadMap('coteaux',13,9,1);
 // 1. Sélène, sur les Coteaux
 const se=MAPS.coteaux.npcs.find(n=>n.name==='Sélène'&&n.x===13);await se.fn(se);ok(f().failleQ&&SAID.some(s=>/Il me restait une dette/.test(s)),'Sélène se souvient de l\'Observatoire');
 // 2. Corvin repenti : il baisse le levier de gauche
 await warp('faille',10,14,1);ok(f().fzL===1&&f().v193cw===1&&!f().fzOpen,'Corvin repenti baisse le levier de gauche');
 // 3. Corvin resté sbire : il garde le chantier, puis quitte la Team
 f().v19cor=2;const co=MAPS.faille.npcs.find(n=>n.name==='Corvin'&&n.fn&&n.x===14);ok(npcs(MAPS.faille).includes(co),'Corvin garde le chantier de Caïus');
 await co.fn(co);ok(f().v193cor===1&&!npcs(MAPS.faille).includes(co),'Corvin battu : « Il est encore temps », il quitte la Team');
 // 4. Caïus : les mots, puis la fin du combat
 const ca=MAPS.faille.npcs.find(n=>n.t==='caius');await ca.fn(ca);ok(f().failleDone&&(f().v193d|0)>=5&&f().v193w.includes('CORVIN')&&f().v193w.includes('FAUSTINE'),'Que dis-tu à Caïus ? '+f().v193w.join(', '));
 ok(f().v193cai===2&&SAID.some(s=>/une assiette de plus/.test(s)),'Caïus veut voir Crépuscel ; Valen et Sélène sont venus');ok(G.bag.cyclecapsule===1,'Capsule Cycle reçue');
 ok(/Sanctuaire du Cycle/.test(goal()),'objectif : '+goal());
 // 5. Le Sanctuaire : Crépuscel, la première aube, FIN
 const cr=MAPS.sanctuaire.npcs.find(n=>n.sp==='crepuscel');f().failleDone=0;await warp('sanctuaire',6,10,1);ok(!npcs(MAPS.sanctuaire).includes(cr)&&f().v193gr&&SAID.some(s=>/Quelqu'un creuse sous le Sanctuaire/.test(s)),'avant la Faille : Crépuscel ne se montre pas');
 f().failleDone=1;G.x=6;G.y=4;G.dir=1;ok(npcs(MAPS.sanctuaire).includes(cr),'Caïus arrêté : Crépuscel attend');
 const p=interact();while(!PV193.on)await wait(40);AUTO.off=1;await wait(300);await SNAP('aube');AUTO.off=0;while(!PV193.fin)await wait(30);AUTO.off=1;await wait(200);await SNAP('fin');AUTO.off=0;await p;
 ok(f().v193fin&&!PV193.on&&SAID.some(s=>/Ils sont venus/.test(s))&&SAID.some(s=>/Caïus a rebouché la Faille/.test(s))&&SAID.some(s=>/ancien lieutenant/.test(s)),'la première aube partagée, l\'épilogue, puis FIN');
 ok(!MAPS.sanctuaire.npcs.some(n=>n.fix&&['Kael','Valen','Caïus','Corvin'].includes(n.name)),'les invités sont repartis');
 ok(['Les mots pour Caïus','Il est encore temps','La première aube partagée','Le fil de Faustine'].every(t=>quests().some(q=>q[0]===t)),'le journal s\'en souvient');
 // 6. Une partie déjà finie avant la 19.3 : la première aube se joue en revenant au Sanctuaire
 Object.assign(f(),{v193fin:0,legC:1});await warp('coteaux',21,2,0);await warp('sanctuaire',6,10,1);ok(f().v193fin===1&&!PV193.on,'partie déjà finie : la première aube se joue au retour au Sanctuaire');
 // 7. Aventure à plusieurs : un ami capture Crépuscel ; pour moi le combat finit en « fuite », mais la première aube se joue quand même
 Object.assign(f(),{v193fin:0,legC:0});G.coop={code:'AUBE',t0:Date.now(),mates:{}};G.dex.crepuscel=1;for(const k of['party','box'])G[k]=G[k].filter(m=>m.sp!=='crepuscel');
 {const ob=battle;battle=async(foes,o)=>{if(o?.legend&&foes[0].sp==='crepuscel'){lgTake('crepuscel','Alice');return'run'}return ob(foes,o)};const L0=SAID.length;await legend2('crepuscel',55,'legC','#ffffff');battle=ob;
  ok(f().v193fin===1&&SAID.slice(L0).some(s=>/Crépuscel a choisi de suivre Alice/.test(s))&&!SAID.slice(L0).some(s=>/se pose près de toi/.test(s)),'un ami capture Crépuscel : la première aube se joue aussi pour moi')}
 L('done')}
