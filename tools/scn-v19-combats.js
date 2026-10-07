// Test 19 : rencontres visibles, herbes frémissantes, territoriaux, défis des dresseurs, EXP à l'échelle, boss bavards, analyse de défaite.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1});G.keys.dex=1;G.party=[mon('goutelin',8)];
 // 1. Rencontres visibles
 loadMap('route1',10,10,0);const M=MAPS.route1,fa=()=>M.npcs.filter(n=>n.fauna&&!n.gone);
 ok(fa().length>=4,'route 1 : '+fa().length+' créatures visibles ('+fa().map(n=>n.sp).join(',')+')');
 ok(encRoll(M,true)===false,'aucune rencontre invisible en mode VISIBLES');
 G.opt.encV=0;let hits=0;for(let i=0;i<400;i++){ENCR=0;if(encRoll(M,true))hits++}ok(hits>5,'mode CLASSIQUES : '+hits+' rencontres sur 400 pas');G.opt.encV=1;
 // 2. Herbes frémissantes
 ruNew('route1',1);ok(RU.map==='route1','herbes frémissantes en '+RU.x+','+RU.y);
 let nb=0,lastO=null;const ob=battle;battle=async(F,o={})=>{nb++;lastO=o;L('combat',F[0].sp,F[0].lv,o.rustle?'frémissantes':'');return'run'};
 G.x=RU.x;G.y=RU.y;await onStep();ok(nb===1&&lastO?.rustle,'les herbes frémissantes déclenchent un combat');ok(RU.map===null,'puis elles se calment');
 // 3. Territorial : il charge s'il te voit de près
 let spot=null;for(let y=2;y<M.rows.length-2&&!spot;y++)for(let x=2;x<M.rows[0].length-4&&!spot;x++){const free=k=>{const c=M.rows[y][x+k];return c&&!SOLID.has(c)&&!M.npcs.some(n=>n.x===x+k&&n.y===y)};if(free(0)&&free(1)&&free(2)&&free(3))spot=[x,y]}
 for(const n of fa())rmFauna(n);const t={x:spot[0]+3,y:spot[1],x0:spot[0]+3,y0:spot[1],d:2,t:'mon',sp:'magmor',lv:9,fauna:1,wild:1,slp:false,tt:99999,fn:faunaMeet};M.npcs.push(t);
 G.x=spot[0];G.y=spot[1];nb=0;await fauCharge();ok(nb===1,'un Magmor territorial charge');
 const t2={...t,sp:'magmor',lv:2,gone:0};M.npcs.push(t2);nb=0;G.party=[mon('goutelin',20)];await fauCharge();ok(nb===0,'un territorial bien plus faible n\'ose pas');rmFauna(t2);
 battle=ob;
 // 4. Défi accepté : Léo (combat amical, 3 Capsules)
 G.party=[mon('goutelin',30)];const cap0=G.bag.capsule||0,leo=M.npcs.find(n=>n.tr?.id==='leo');loadMap('route1',leo.x,leo.y+1,1);
 await trainerBattle(leo);ok(f().t_leo&&(G.bag.capsule||0)===cap0+3,'défi de Léo relevé : +3 Capsules');
 ok(SAID.some(s=>/Combat amical/.test(s)),'le défi est annoncé');
 // 5. Défi refusé : Lina reste disponible et ne t'arrête plus
 const op=AUTO.pick;AUTO.pick=m=>m.opts[0]==='OUI'?1:op(m);const lina=M.npcs.find(n=>n.tr?.id==='lina');const r5=await trainerBattle(lina);AUTO.pick=op;
 ok(r5==null&&!f().t_lina&&lina.los===0,'défi de Lina refusé : elle reste là, sans t\'arrêter');
 // 6. Défi Duel réussi (Lina, une seule créature)
 const sb=G.bag.baiesoin||0;await trainerBattle(lina);ok(f().t_lina&&(G.bag.baiesoin||0)===sb+2,'Défi Duel réussi : +2 Baies Sève');
 // 7. Combat Inversé (Iris) : la table des types revient à la normale ensuite
 const e0=eff('EAU','FEU');let inv=null;{const um=useMove;useMove=async function(s,id){if(inv==null)inv=eff('EAU','FEU');return um.apply(this,arguments)}
  loadMap('foret',2,8,0);const iris=MAPS.foret.npcs.find(n=>n.tr?.id==='iris');G.party=[mon('goutelin',40)];await trainerBattle(iris);useMove=um}
 ok(e0===2&&inv===.5&&eff('EAU','FEU')===2,'Combat Inversé : EAU→FEU vaut 0,5 pendant le combat, 2 après');
 // 8. EXP à l'échelle
 {const m=mon('goutelin',30),x0=m.exp;B={foe:mon('ratounet',5),tr:null};await gainXp(m,100,1);const d1=m.exp-x0;const m2=mon('goutelin',10),x2=m2.exp;B.foe=mon('ratounet',20);await gainXp(m2,100,1);const d2=m2.exp-x2;B=null;
  ok(d1<40&&d2>150,'EXP à l\'échelle : '+d1+' (trop fort) contre '+d2+' (plus faible)')}
 // 9. Plancher de niveau : un dresseur ordinaire n'est jamais ridicule
 {Object.assign(f(),{badge:1,mine:1,rival2:1});G.party=[mon('goutelin',22)];let lv=0;const ob2=battle;
  const nina=MAPS.foret.npcs.find(n=>n.tr?.id==='nina');const inner=B=>{};loadMap('foret',nina.x,nina.y+1,1);
  const sp=say;let seen=0;const hk=sendFoe;sendFoe=async function(...a){if(!seen){seen=1;lv=B.foe.lv}return hk.apply(this,a)};await trainerBattle(nina);sendFoe=hk;ok(lv>=Math.min(lvCap(),19),'Nina monte au niveau '+lv+' (plafond '+lvCap()+')')}
 // 10. Boss bavard : Brasia lance sa réplique quand Rocaroc entre
 {G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1});G.party=[mon('torrentor',40)];loadMap('gym',6,4,1);const br=MAPS.gym.npcs.find(n=>n.tr?.id==='brasia');
  await trainerBattle(br);ok(SAID.some(s=>/vrai rempart/.test(s)),'Brasia : réplique de la créature maîtresse');}
 // 11. Défaite : analyse, 10 % de l'argent, RÉESSAYER sur place
 {G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,rival1:1});G.party=[mon('ratounet',4)];G.money=1000;loadMap('gym',6,4,1);const br=MAPS.gym.npcs.find(n=>n.tr?.id==='brasia');
  const n0=SAID.length;const r=await trainerBattle(br);await SNAP('defaite');const S=SAID.slice(n0);L('analyse',S.filter(s=>/^Analyse|^Et aussi/.test(s)).join(' | '));
  ok(r==='lose'&&G.money===900,'défaite : 10 % de l\'argent ('+G.money+')');ok(S.some(s=>/^Analyse : Brasia/.test(s)),'analyse sur mesure de Brasia');ok(G.map==='gym'&&G.party[0].hp===st(G.party[0]).hp,'RÉESSAYER : on reste dans l\'arène, équipe soignée')}
 ok(NEWS.some(n=>n[1]==='La faune d\'Aurélys')&&normalize(Object.assign(JSON.parse(JSON.stringify(G)),{v:18.2,wn:0})).wn===1,'nouveautés 19 présentes, une sauvegarde 18.2 les affiche');
 L('fin')}
