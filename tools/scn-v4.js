// Mécaniques de la version 4 : migration de sauvegarde, lien, arbres à baies, objets tenus, Éveil (joueur et boss), IA de changement,
// missions, revente, revanche d'arène et Tournoi du Cycle. Usage : node tools/play.mjs tools/scn-v4.js
async()=>{const L=(...a)=>console.log('LOG',...a),until=async(c,ms=60000)=>{const t0=performance.now();while(!c()){if(performance.now()-t0>ms)throw new Error('timeout: '+c);await wait(30)}};
 // 1. Ancienne sauvegarde (v3) : lien, objet et Bracelet ajoutés, écran des nouveautés prévu
 localStorage.setItem(SK,JSON.stringify({map:'ville',x:10,y:12,dir:0,party:[{sp:'brasilion',lv:24,exp:xpFor(24),moves:['braise','griffe'],pp:[25,30],hp:60}],box:[],bag:{potion:2},money:900,flags:{starter:'flamiot',badge:1,rival1:1},heal:['ville',14,5],t:500,dex:{},keys:{dex:1},v:3,opt:{snd:0}}));
 const ld=load();L('migration v',ld.v,'wn',ld.wn,'bracelet',ld.keys.bracelet,'aff',ld.party[0].aff,'item',ld.party[0].item);
 // 2. Nouvelle partie : lien du starter
 G=newGame();G.opt.snd=0;mode='world';loadMap('bourg',5,6,0);await run(()=>pickStarter('flamiot'));const s0=G.party[0];L('starter aff',s0.aff,'coeurs',bondLv(s0));
 s0.aff=148;bondUp(s0,3);L('lien',s0.aff,bondLv(s0),ui.note?.s);await SNAP('lien-note');
 // Maman enseigne Retour (lien de 3 cœurs ou plus) ; puissance selon le lien
 loadMap('bourg',4,6,2);await interact();L('retour',s0.moves.includes('retour'),bp(s0,MV.retour),bp({aff:255},MV.retour));
 // 3. Arbre à baies de Bourg-Lueur (17,11)
 loadMap('bourg',16,11,3);await SNAP('arbre');await interact();const nb=G.bag.baiesoin||0;await interact();L('baies',nb,G.bag.baiesoin||0,'repousse demain',!berryRipe(MAPS.bourg.npcs.find(n=>n.k==='berry')));
 // 4. Objet tenu + résumé
 await giveHeld(s0,'baiesoin');L('tient',s0.item,G.bag.baiesoin);AUTO.off=1;let p=summary(s0);await wait(300);await SNAP('resume');AUTO.off=0;await p;
 // 5. Éveil du joueur (jauge pleine d'office) contre une créature sauvage
 G.keys.bracelet=1;G.party=[mon('brasilion',40,{aff:255,item:'charbon'}),s0];let shot=0;AUTO.hold=m=>!!m&&m.opts[0]==='ÉVEIL'&&!shot;
 p=battle([mon('magmor',40)]);await until(()=>B&&B.ev);B.ev[0]=100;await until(()=>ui.menus.at(-1)?.opts[0]==='ÉVEIL');await SNAP('eveil-menu');shot=1;
 let aw=0;await until(()=>B&&(aw=B.awk.size)>0);await SNAP('eveil-aura');await p;L('éveil joueur',aw,'tip evd',f().tip_evd);
 // 6. Boss : changement de créature selon les types + Éveil adverse
 let sw=0,fe=0;const fs0=foeSwitch;foeSwitch=async m=>{sw++;return fs0(m)};
 for(let k=0;k<3;k++){G.party=[mon('torrentor',34),mon('rocaroc',40)];p=battle(team([['brasilion',30],['sylvorne',30],['magmor',33]]),{tr:{name:'Testeur',look:'grunt',money:0,boss:1,ev:1,items:0}});
  await until(()=>B&&B.ev);B.ev[1]=100;const iv=setInterval(()=>{if(B?.awk&&[...B.awk].some(m=>!G.party.includes(m)))fe=1},40);await p;clearInterval(iv)}
 foeSwitch=fs0;L('boss rappels',sw,'éveil adverse',fe);
 // 7. Missions : génération, accomplissement, récompense
 G.party=[mon('brasilion',40)];G.seen={bourg:1,route1:1,ville:1,foret:1};G.keys.rod=1;f().badge=1;loadMap('ville',14,5,1);
 let bd=0;const op=AUTO.pick;AUTO.pick=m=>m.bare&&ui.dim==='Tableau des Missions'?(bd++%2?-1:0):op(m);await missionBoard();L('missions',G.ms.L.map(q=>q.k+':'+q.v+':'+q.need).join(' | '));
 AUTO.off=1;p=missionBoard();await wait(300);await SNAP('missions');AUTO.off=0;await p;
 const q0=G.ms.L[0],m0=G.money;for(let i=0;i<q0.need;i++)msEvt(q0.k,q0.v);L('accomplie',q0.done,MSQ.length);await msFlush();bd=0;await missionBoard();AUTO.pick=op;L('récompense',G.money-m0,G.ms.done,G.ms.L[0]!==q0);
 // 8. Revente
 G.bag={charbon:1};const m1=G.money;await sellMenu();L('vente',G.money-m1,G.bag.charbon);
 // 9. Après l'Équilibre : revanche de Maëlle puis Tournoi du Cycle
 Object.assign(f(),{balance:1,vex2:1,eclipse:1,t_brasia:1,t_maelle:1,badge2:1});G.party=[mon('torrentor',100),mon('bourdonnerre',100),mon('phalumine',100),mon('sylvorne',100),mon('rocaroc',100),mon('brasilion',100)];G.bag={hyperpotion:20,rappel:5};
 loadMap('gym2',5,2,1);await leaderTalk(MAPS.gym2.npcs.find(n=>n.t==='maelle'),'maelle');L('revanche maelle',f().rm_maelle===dayN(),G.bag.eaumystique);
 loadMap('gym',5,2,1);AUTO.pick=m=>m.opts.includes('TOURNOI DU CYCLE')?1:op(m);await leaderTalk(MAPS.gym.npcs.find(n=>n.t==='leader'),'brasia');AUTO.pick=op;
 L('tournoi',f().tourWins,G.keys.trophy,G.hof?.length,f().tourDay===dayN());
 // 10. Épilogue du ponton, combats rapides
 loadMap('port',20,9,2);await MAPS.port.enter();L('ponton',f().ponton,G.bag.grelot);G.opt.fast=1;const tf=performance.now();await battle([mon('ratounet',5)]);L('combat rapide (ms)',Math.round(performance.now()-tf));G.opt.fast=0;
 // 11. Écrans : nouveautés, journal
 AUTO.off=1;p=whatsNew();await wait(300);await SNAP('nouveautes');AUTO.off=0;await p;AUTO.off=1;p=journal();await wait(300);await SNAP('journal');AUTO.off=0;await p;L('fin')}
