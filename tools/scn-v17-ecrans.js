// Test 17.0 (écrans et sauvegardes, un seul navigateur, réseau simulé) : apparence choisie dans les OPTIONS et visible sur son propre personnage,
// menu des aventures, salle d'attente, CONTINUER L'AVENTURE sur l'écran titre, menu EN LIGNE (réglages, joueurs), menu d'un joueur de l'aventure
// (ALLER LE VOIR), annulation d'une aventure sans laisser de sauvegarde, sauvegardes abîmées réparées.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',36),mon('goutelin',30)];G.net={n:'Ibra',lk:'hero'};loadMap('ville',9,7,0);await wait(300);AUTO.off=1;
 const snapUI=async(n,fn,keys=['b'])=>{const p=fn();await wait(500);await SNAP(n);for(const k of keys){press(k);await wait(150)}await p};
 // 1) Apparence depuis les options
 ok(myLook()==='hero','apparence de base');{const p=options();await wait(300);ok(ui.menus.some(m=>m.opts[0]==='APPARENCE'),'APPARENCE dans les options');press('a');await wait(300);await SNAP('apparence');
  const m=ui.menus[ui.menus.length-1];m.i=LOOKS.indexOf('kid');press('a');await wait(300);press('b');await p}
 ok(NG().lk==='kid'&&myLook()==='kid'&&JSON.parse(localStorage.getItem('pixemon-profile')||'{}').lk==='kid','apparence choisie et retenue par l\'appareil');await wait(200);await SNAP('moi');
 // 2) Écran titre : menu des aventures, salle d'attente
 const G0=G;G=null;mode='title';{const p=advMenu();await wait(400);ok(ui.menus.some(m=>m.opts.includes('NOUVELLE AVENTURE')&&m.opts.includes('REJOINDRE')),'menu des aventures');await SNAP('aventures');press('b');ok(await p===false,'retour')}
 const S0=advFresh('K7QZ');NG().n='Ibra';NG().lk='kid';save();ok(!!localStorage.getItem(SK+'-coop-K7QZ')&&localStorage.getItem('pixemon-last')==='c:K7QZ','sauvegarde de l\'aventure ébauchée');
 NET.on=true;NET.code='K7QZ';NET.R=[{up:true,tick(){},pub(){return true},close(){}}];const P1={pid:'aaaaaaaa',id:'aaaaaaaaaa',name:'Léo',look:'scout',map:'ville',x:10,y:7,d:0,q:[],t:Date.now()+1e9,ps:0,b:1,ld:'goutelin',dv:NETDV(),bz:0,av:'K7QZ'};NET.peers.set(P1.pid,P1);
 {const p=advLobby('K7QZ',1);await wait(500);await SNAP('salle');press('down');await wait(150);press('a');await wait(300);press('a');await wait(200);ok(await p===0,'salle d\'attente quittée')}
 advAbort(S0);ok(!localStorage.getItem(SK+'-coop-K7QZ')&&localStorage.getItem('pixemon-last')!=='c:K7QZ'&&SLOT===S0.slot&&!NET.on,'annulation : aucune sauvegarde laissée');
 // 3) Vraie aventure sauvegardée : CONTINUER L'AVENTURE sur l'écran titre
 G=JSON.parse(JSON.stringify(G0));G.coop={code:'R2D2',t0:Date.now(),mates:{aaaaaaaaaa:'Léo'}};SLOT='c:R2D2';save();G=null;mode='title';
 {const sv=load('c:R2D2');ok(sv&&sv.coop.code==='R2D2'&&sv.net.lk==='kid','aventure enregistrée à part')}
 {const AP=AUTO.pick;let shot=0;AUTO.off=0;AUTO.hold=m=>m&&!shot&&m.opts.includes('CONTINUER L\'AVENTURE');AUTO.pick=m=>m.opts.includes('CONTINUER L\'AVENTURE')?0:AP(m);
  const tp=titleScreen();await wait(900);ok(ui.menus.some(m=>m.opts[0]==='CONTINUER L\'AVENTURE'&&!m.opts.includes('JOUER EN LIGNE')),'CONTINUER L\'AVENTURE en tête de l\'écran titre');await SNAP('titre');shot=1;await tp;AUTO.hold=null;AUTO.pick=AP;AUTO.off=1}
 ok(mode==='world'&&G&&G.coop?.code==='R2D2'&&SLOT==='c:R2D2'&&NET.on&&NET.code==='R2D2'&&myLook()==='kid','aventure reprise et connexion lancée');
 NET.leave(true);NET.on=true;NET.code='R2D2';NET.R=[{up:true,tick(){},pub(){return true},close(){}}];P1.av='R2D2';P1.map='ville';P1.x=11;P1.y=7;NET.peers.set(P1.pid,P1);frAdd(P1);await wait(400);
 ok(isAdvMate(P1)&&isMate(P1)&&npcs(MAPS.ville).some(n=>n.net===P1.pid),'Léo, de l\'aventure, sur la carte');await SNAP('carte');
 await snapUI('enligne',()=>onlineMenu());await snapUI('reglages',()=>netSettings());
 {const p=friendMenu(P1.pid);await wait(400);const m=ui.menus[ui.menus.length-1];ok(m.opts.includes('ALLER LE VOIR')&&!m.opts.includes('AJOUTER EN AMI'),'menu d\'un joueur de l\'aventure : ALLER LE VOIR');await SNAP('ami');press('b');await p}
 {const p=frMenu();await wait(400);await SNAP('amis');press('b');await wait(150);press('b');await p}
 // 4) Sauvegardes abîmées
 {const g=JSON.parse(JSON.stringify(G));g.coop={code:'nope'};g.net.aj='toujours';g.net.fs='oui';const n=normalize(g);ok(!n.coop&&!n.net.aj&&n.net.fs===undefined,'aventure et réglages invalides nettoyés')}
 {const g=JSON.parse(JSON.stringify(G));g.v=16;delete g.coop;const n=normalize(g);ok(n.v===17&&n.wn,'migration 16 -> 17')}
 NET.peers.clear();for(const n of[...MAPS.ville.npcs])if(n.net)MAPS.ville.npcs.splice(MAPS.ville.npcs.indexOf(n),1);NET.on=false;NET.R=[];frDel(P1.id);AUTO.off=0;L('done')}
