// Test 20.0 : tout le chapitre des Terres de Givre, en jouant vraiment les glissades (solutions du solveur), les combats et les scènes.
(async()=>{const L=(...a)=>console.log('LOG',...a);{const ce=console.error;console.error=(...a)=>{L('ERREUR',G?.map,a.map(x=>x?.stack||x).join(' ').slice(0,700));ce(...a)}}const ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m+' — carte '+G.map+' '+G.x+','+G.y);L('ok',m)},
 until=async(c,ms=60000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()},
 idle=()=>mode==='world'&&!busy&&!move&&!ui.text&&!ui.menus.length&&SLIDE20==null,
 calm=()=>{const M=MAPS[G.map];M.npcs=M.npcs.filter(n=>!n.fauna)},
 go=async s=>{for(const c of s){await until(idle);calm();tryMove({b:0,h:1,g:2,d:3}[c]);await wait(60);await until(idle)}},
 talk=async d=>{await until(idle);calm();healAll();G.dir=d;run(interact);await wait(100);await until(idle,240000)};
 {const b0=battle;battle=async function(...a){const r=await b0.apply(this,a);L('combat',a[1]?.tr?.name||'sauvage',r,G.party.map(m=>m.hp).join('/'));return r}}const F=f();Object.assign(F,{starter:'goutelin',rs:'pousseron',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,v18done:1,v18faus:1,v18ecoute:1,badge5:1,
  obsScene:1,bar:1,selene2done:1,vex2:1,balance:1,badge3:1,legS:1,legN:1,legC:1,v19rec2:1,failleDone:1,sanct:1,v193gr:1,v193fin:1,tip_evr:1});
 G.keys.dex=1;G.keys.bracelet=1;G.keys.relais=1;G.party=[mon('torrentor',85),mon('brasilion',85),mon('sylvorne',85),mon('ratoroi',85),mon('faucaube',85)];G.heal=['lunevie',15,12];G.repel=1e9;
 // Lunévie : la première neige, le passage du nord
 loadMap('lunevie',11,3,1);await wait(300);await until(()=>F.v20a&&idle());ok(F.v20a,'scène de la première neige');ok(MAPS.lunevie.rows[0][10]==='='&&MAPS.lunevie.snow,'passage du nord ouvert et neige sur Lunévie');
 ok(G.bag.chocolat>=3,'chocolats de Kael');await SNAP('lunevie');
 G.x=10;G.y=1;await go('hh');ok(G.map==='col'&&G.y===29,'bord nord de Lunévie → Col du Givre');
 // Congère : une créature FEU la fait fondre
 loadMap('col',5,7,2);await wait(100);await talk(2);ok(F.c_col_4_7,'congère fondue par Brasilion');ok(mapRows('col')[7][4]!=='z','la congère a disparu');
 // Énigme de glace du Col (solution du solveur depuis 11,20)
 loadMap('col',11,20,1);await wait(100);await SNAP('col');await go('hdddhghgh');ok(G.x===11&&G.y===11,'énigme de glace du Col résolue');
 await go('hhhh');ok(G.y===7,'au pied du Yétimont');await talk(1);ok(F.v20yeti,'Yétimont des cimes');
 await go('hhhhhhhh');ok(G.map==='frimas','arrivée à Frimas');await until(()=>F.v20b&&idle());ok(F.v20b,'Neva accueille le joueur');await SNAP('frimas');
 // Arène Givre
 loadMap('gym6',5,10,1);await wait(100);await go('hhghdh');ok(G.x===5&&G.y===2,'énigme de l\'arène résolue');await SNAP('arene');await talk(1);ok(F.badge6,'Badge Givre');ok(G.bag.dc_blizzard,'DC Blizzard');
 // Lac Gelé et Grésil
 loadMap('lacgele',11,18,1);await wait(100);await SNAP('lac');await go('hhhghghdbdhgh');ok(G.x===11&&G.y===5,'énigme du Lac Gelé résolue');await talk(1);ok(F.v20gres,'lieutenant Grésil');
 await go('hhh');ok(G.map==='glacier','entrée du Glacier');
 // Cœur du Glacier : Boréa, Hivernel, épilogue
 await go('hhhhghdh');ok(G.x===8&&G.y===4,'énigme du Glacier résolue');await SNAP('glacier');await talk(1);
 ok(F.v20bor&&F.v20w,'Boréa vaincue (mots : '+F.v20w+')');await until(()=>F.v20done&&idle(),240000);ok(F.v20done&&G.map==='frimas','épilogue à Frimas');
 // Le reste du chapitre : quêtes, revanches, saisons
 G.bag.moufle=3;loadMap('maisonF',4,3,1);await wait(100);await talk(1);await talk(1);ok(F.v20mf===2&&G.bag.glacon,'moufles de Mamie Flocon');
 loadMap('frimas',20,18,3);await wait(100);G.party.push(mon('herongel',50));await talk(3);await talk(3);ok(F.v20pg&&G.bag.dc_rayonglace,'pêcheur pingouin');
 ok(SP.flocelin.t==='GLA'&&eff('FEU','GLA')===2&&eff('GLA','PLA')===2,'type GLACE');ok(postGoal(F)&&!/Glacier|Neva|Givre/.test(postGoal(F)),'objectif suivant après le chapitre : '+postGoal(F));
 ok(quests().some(q=>q[0]==='Les Terres de Givre'&&q[1]===2),'journal');achCheck();
 L('fin',F.legG?'Hivernel capturé':'Hivernel vaincu',dayN()%3===0?'(jour d\'hiver)':'')})
