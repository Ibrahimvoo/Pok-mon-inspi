// Parcours complet de l'histoire (équipe dopée : on teste l'enchaînement, pas l'équilibrage)
async()=>{const L=(...a)=>console.log('LOG',...a);
 G=newGame();mode='world';loadMap('bourg',5,6,0);await SNAP('bourg');
 await run(()=>pickStarter('goutelin'));L('starter',f().starter,f().rival1,G.party.length);
 await gusTalk();L('rod',G.keys.rod);
 G.party=[mon('torrentor',60),mon('bourdonnerre',60),mon('phalumine',60),mon('rocaroc',60),mon('papivigne',60),mon('brasilion',60)];
 const fightAll=async k=>{loadMap(k,MAPS[k].npcs[0].x,MAPS[k].npcs[0].y);for(const n of [...MAPS[k].npcs])if(n.tr&&!f()['t_'+n.tr.id]&&(!n.cond||n.cond())){await trainerBattle(n);L('beat',n.tr.id,!!f()['t_'+n.tr.id])}};
 await fightAll('route1');await fightAll('gym');L('badge',f().badge);
 loadMap('foret',2,8);await SNAP('foret');await fightAll('foret');await rival2();L('rival2',f().rival2);
 // affinités & éclats
 G.dir=3;loadMap('foret',22,3,3);await interact();L('ronces',MAPS.foret.rows[3][23]);loadMap('foret',24,3,3);await SNAP('ermite');
 loadMap('route1',15,16,3);await interact();loadMap('route1',16,16,3);await interact();L('shards',G.keys.shards);
 loadMap('foret',24,3,3);G.dir=3;let tch=0;const op=AUTO.pick;AUTO.pick=m=>m.title==='Enseigner'?(tch++?m.opts.length-1:0):op(m);await interact();AUTO.pick=op;L('lumen',f().lumen,G.party[2].moves);
 await liliTalk();loadMap('foret',2,13,0);G.dir=0;G.t=CYC-20;L('night',night());await interact();L('lili',f().lili);await liliTalk();L('lili3',f().lili,G.keys.shards);G.t=70;
 loadMap('mont',9,20,1);await SNAP('mont-bas');await fightAll('mont');L('selene1',f().t_selene1);
 loadMap('mont',4,17,2);G.dir=2;await interact();L('brasier',MAPS.mont.rows[17][3]);
 loadMap('mont',9,5,1);await bossFight();L('boss',f().boss,f().eclipse,phase());await SNAP('eclipse');
 loadMap('ville',10,12,2);await MAPS.ville.enter();L('r2',f().r2);await SNAP('ville-act2');
 loadMap('route2',27,13,2);await SNAP('route2');await fightAll('route2');
 loadMap('route2',16,10,2);G.dir=2;await interact();L('rocher',MAPS.route2.rows[10][15]);
 loadMap('port',22,8,2);await MAPS.port.enter();L('port',f().portScene);await SNAP('port');
 await fightAll('gym2');L('badge2',f().badge2,G.keys.lantern);
 loadMap('port',12,1,1);await MAPS.port.step();L('kael3',f().kael3);
 loadMap('grotte',13,16,1);await SNAP('grotte');await fightAll('grotte');
 loadMap('obs',8,9,1);await MAPS.obs.enter();L('obsScene',f().obsScene);await SNAP('obs');
 await fightAll('obs');for(const i of[1,0,2])await consoleAct(i);L('bar',f().bar,MAPS.obs.rows[3]);
 const sel=MAPS.obs.npcs.find(n=>n.t==='selene');loadMap('obs',9,4,1);await trainerBattle(sel);L('selene2',f().selene2done);
 loadMap('dome',5,5,1);await SNAP('dome');await finalBattle();L('final',f().vex2,f().balance,G.map);await SNAP('fin');
 G.t=CYC*9+CYC-50;loadMap('dome',5,3,1);G.dir=1;L('legN visible',npcs(MAPS.dome).map(n=>n.sp||n.t).join());
 await kaelRematch();L('done',caught(),G.keys.shards);
 await ruinsDoor();L('ruins',G.map);await fightAll('ruines');const sb=MAPS.ruines.npcs.find(n=>n.k==='sablier');loadMap('ruines',9,2,1);G.dir=1;await interact();L('sablier',G.keys.sablier);loadMap('route1',10,8,0);await useSablier();L('time',PHN[phase()])}
