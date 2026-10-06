// Test 15.0 (écrans) : clavier, apparence, menu du salon, ami sur la carte avec bulle, menu d'ami, choix d'équipe, échange, équipe adverse.
// Un faux ami est injecté localement (aucun réseau) pour vérifier les mises en page.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1,badge2:1});G.keys.bracelet=1;G.party=[mon('brasilion',36),mon('goutelin',30),mon('pousseron',28),mon('noctyrex',30),mon('lueurette',22)];G.net={n:'Ibra',lk:'kid'};
 loadMap('ville',17,11,0);await wait(300);AUTO.off=1;const snapUI=async(n,fn,keys=['b'])=>{const p=fn();await wait(500);await SNAP(n);for(const k of keys){press(k);await wait(120)}await p};
 await snapUI('clavier',()=>kbInput('TON PSEUDO EN LIGNE',10,NAMEK,{caps:1,init:'Léo',hint:'Un surnom, pas ton vrai nom ! Tes amis le verront au-dessus de ta tête.'}),['b','b','b','b']);
 await snapUI('code',()=>kbInput('CODE DU SALON',4,[...NETAB],{cols:8,kw:44,init:'K7',hint:'Demande le code de 4 caractères à ton ami.'}),['b','b','b']);
 await snapUI('apparence',()=>askLook());
 // Faux salon avec deux amis
 NET.on=true;NET.code='K7QZ';NET.R=[{up:true,tick(){},pub(){return true},close(){}}];const mk=(pid,name,look,x,y,b)=>{const P={pid,name,look,map:'ville',x,y,d:0,q:[],t:Date.now()+1e9,ps:0,b,ld:'goutelin',dv:NETDV(),bz:0};NET.peers.set(pid,P);return P};
 const P1=mk('aaaaaaaa','Léo','scout',19,11,2),P2=mk('bbbbbbbb','Mia','girl',15,12,1);NET.log.push('Léo a rejoint le salon !','Mia : Salut !');P1.say={s:'On fait un combat ?',t0:now()+1e9};
 await wait(300);ok(npcs(MAPS.ville).some(n=>n.net==='aaaaaaaa')&&npcs(MAPS.ville).some(n=>n.net==='bbbbbbbb'),'deux amis sur la carte');P1.say.t0=now();await wait(200);await SNAP('carte');
 await snapUI('salon',()=>onlineMenu());
 await snapUI('ami',()=>friendMenu('aaaaaaaa'));
 {const p=pvpPickTeam(3,1);await wait(400);for(const k of['a','right','a','down','down']){press(k);await wait(200)}await wait(300);await SNAP('equipe');for(const k of['b','b','b']){press(k);await wait(200)}ok(await p===null,'choix d\'équipe annulé')}
 const t=netMon(snapMon(mon('tisonnet',25)));await snapUI('echange',()=>{ui.panel=()=>tradePanel(G.party[1],t,P1);return choose(['ÉCHANGER','VOIR SON OFFRE','CHANGER LA MIENNE','ANNULER'],{x:W-252,y:H-120,w:244}).finally(()=>ui.panel=null)});
 const A={me:0,D:[[pvpMon(pvpSnap(pvpCopy(G.party[0],1)),1)],[mon('goutelin',50),mon('flamiot',50),mon('noctyrex',50)].map(m=>pvpMon(pvpSnap(pvpCopy(m,1)),1))],act:[0,0],nm:['Ibra','Léo'],lk:['kid','scout']};A.D[1][1].hp=0;
 await snapUI('adverse',()=>pvpFoeTeam(A));
 // Sauvegarde d'une version précédente : profil en ligne créé, nouveautés annoncées, pseudo nettoyé
 {const old=JSON.parse(JSON.stringify(G));old.v=14;delete old.net;const n2=normalize(old);ok(n2.v===15&&n2.wn&&n2.net&&n2.net.lk==='hero'&&(n2.net.w|0)===0,'migration 14 -> 15');
  const o2=JSON.parse(JSON.stringify(G));o2.net={n:'<b>Léo</b>!!',lk:'dragon',w:'x',room:'zz'};const n3=normalize(o2);ok(n3.net.n==='bLéob'&&n3.net.lk==='hero'&&n3.net.w===0&&!n3.net.room,'profil en ligne nettoyé : '+n3.net.n)}
 NET.peers.clear();for(const n of[...MAPS.ville.npcs])if(n.net)MAPS.ville.npcs.splice(MAPS.ville.npcs.indexOf(n),1);NET.on=false;NET.code='';NET.R=[];AUTO.off=0;await wait(200);ok(!npcs(MAPS.ville).some(n=>n.net),'amis retirés');
 // Écran titre : JOUER EN LIGNE reprend la partie et ouvre directement le menu en ligne ; EN LIGNE est dans le menu pause
 save();const AP=AUTO.pick;let seen=0,shot=0;AUTO.hold=m=>m&&!shot&&(m.opts.includes('JOUER EN LIGNE')||m.title==='En ligne');
 AUTO.pick=m=>m.opts.includes('JOUER EN LIGNE')?m.opts.indexOf('JOUER EN LIGNE'):m.title==='En ligne'?(seen=1,m.opts.indexOf('RETOUR')):m.opts.includes('EN LIGNE')?m.opts.indexOf('FERMER'):AP(m);
 const tp=titleScreen();await wait(900);ok(ui.menus.some(m=>m.opts.includes('JOUER EN LIGNE')),'JOUER EN LIGNE sur l\'écran titre');await SNAP('titre');shot=1;await wait(400);shot=0;
 {const t=Date.now();while(!ui.menus.some(m=>m.title==='En ligne')&&Date.now()-t<8000)await wait(50)}ok(ui.menus.some(m=>m.title==='En ligne'),'menu en ligne ouvert depuis le titre');await SNAP('titre-enligne');shot=1;await tp;
 ok(seen&&mode==='world'&&G&&G.net.n==='Ibra','partie reprise, retour au jeu');AUTO.hold=null;
 AUTO.off=1;const pp=pauseMenu();await wait(500);ok(ui.menus.some(m=>m.opts.includes('EN LIGNE')),'EN LIGNE dans le menu pause');await SNAP('pause');press('b');await pp;AUTO.off=0;AUTO.pick=AP;L('done')}
