// Test 14.0 : Envol, Expéditions, Faille des Songes (génération, accessibilité, boss, réveil), sauvegarde
async()=>{const L=(...a)=>console.log('LOG',...a);const ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const F=f();Object.assign(F,{starter:'flamiot',badge:1,badge2:1,badge3:1,intro:9});if(!G.party.length)G.party.push(mon('flamiot',30));G.party[0].lv=30;G.party[0].exp=xpFor(30);fullHeal(G.party[0]);
 for(const k of['bourg','ville','port','lunevie','coteaux','lac','foret','mont'])G.seen[k]=1;
 // Envol
 loadMap('bourg',14,12,1);await wait(100);const leo=MAPS.bourg.npcs.find(n=>n.name==='Facteur Léo');ok(leo.qm(),'Léo signale le Sifflet');await leo.fn(leo);ok(G.keys.relais,'Sifflet du Relais reçu');
 ok(flyOk('port','bourg')&&!flyOk('volterre','bourg')&&!flyOk('bourg','bourg'),'Envol : seulement les lieux visités');
 for(const k of Object.keys(RELAIS)){const M=MAPS[k],[x,y]=RELAIS[k],c=M.rows[y][x];ok(!SOLID.has(c)&&!M.doors?.[x+','+y],`point d'atterrissage ${k} (${x},${y}) libre '${c}'`)}
 await flyTo('port');ok(G.map==='port'&&G.x===19&&G.y===5,'Envol vers Port-Miroir');loadMap('ville',14,6,0);await flyTo('lunevie');ok(G.map==='lunevie','Envol vers Lunévie');
 loadMap('grotte',5,5,0);ok(!(await flyTo('port'))&&G.map==='grotte','Envol refusé sous terre');
 // Expéditions
 G.box.push(mon('rocaillon',14),mon('goutelin',10));const r0=G.box[0];G.exped=[{m:G.box.shift(),z:'mont',s:3,d:0}];
 loadMap('ville',14,6,0);for(let i=0;i<3;i++)await onStep();ok(exDone(G.exped[0]),'expédition terminée en marchant');
 const bag0=Object.values(G.bag).reduce((a,b)=>a+b,0),lv0=r0.lv;await exReturn(G.exped[0]);
 ok(G.box.includes(r0)&&!G.exped.length,'créature revenue dans la Boîte');ok(Object.values(G.bag).reduce((a,b)=>a+b,0)>bag0,'butin rapporté');ok(r0.lv>lv0,'EXP gagnée ('+lv0+'→'+r0.lv+')');
 for(const z in EXZ){ok(MAPS[z]&&[...EXZ[z][2],...EXZ[z][3]].every(k=>IT[k]),`zone ${z} : butin valide`)}
 // Faille des Songes : génération de nombreux étages
 for(let run=1;run<=40;run++)for(const fl of[1,2,3,4,5,6,9,12,15,23,30]){const D={run,fl,P:40},S=sgGen(D),R=S.rows;ok(R.length===SGH&&R.every(r=>r.length===SGW),'');
  ok(R[S.start[1]][S.start[0]]!=='^','');if(fl%5){ok(S.st&&R[S.st[1]][S.st[0]]==='@'&&R[S.st[1]+1][S.st[0]]!=='^',`run ${run} ét ${fl} : brèche`)}else ok(S.npcs.length===1&&S.npcs[0].tr.boss,'boss');
  const seen=new Set([S.start.join()]),q=[S.start],B=new Set(S.npcs.map(n=>n.x+','+n.y));while(q.length){const[x,y]=q.pop();for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const k=(x+a)+','+(y+b),c=R[y+b]?.[x+a];if(!seen.has(k)&&c&&c!=='^'&&c!=='@'&&!B.has(k)){seen.add(k);q.push([x+a,y+b])}}}
  if(S.st)ok(seen.has(S.st[0]+','+(S.st[1]+1)),'');for(const n of S.npcs)ok([[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>seen.has((n.x+a)+','+(n.y+b))),'');for(const e of S.enc)ok(SP[e[0]],'')}
 L('ok 440 étages générés : brèche accessible, PNJ et objets atteignables');
 const nyxN=MAPS.lunevie.npcs.find(n=>n.name==='Rêveuse Nyx');loadMap('lunevie',18,7,3);await sgEnter();ok(G.map==='songe'&&G.dream?.fl===1,'entrée dans la Faille');await wait(300);await SNAP('songe1');
 ok(save(),'sauvegarde dans la Faille');const sv=JSON.parse(JSON.stringify(G));const g2=normalize(sv);MAPS.songe.key=null;G.dream=g2.dream;loadMap('songe',G.x,G.y,0);ok(g2.dream&&g2.map==='songe'&&MAPS.songe.rows.join()===sgGen(g2.dream).rows.join(),'rechargement : même étage régénéré');
 for(let i=0;i<4;i++)await sgNext();ok(G.dream.fl===5&&MAPS.songe.npcs[0]?.tr?.boss,'étage 5 : un Écho attend');ok(G.bag.songe>=4,'éclats gagnés en descendant');await wait(200);await SNAP('songe5');
 const best=f().sgBest;AUTO.pick=m=>m.opts?.[1]==='SE RÉVEILLER'?1:0;await sgBoss();AUTO.pick=null;ok(G.map==='lunevie'&&!G.dream,'réveil après l\'Écho');ok(best>=5,'record enregistré');
 ok(!Object.keys(f()).some(k=>k.startsWith('i_fs_')||k.startsWith('t_fs_')),'drapeaux du rêve nettoyés');
 await sgEnter();G.party.forEach(m=>m.hp=0);await sgWake(1);ok(G.map==='lunevie'&&!G.dream,'défaite : retour à Lunévie');
 // Chambre : trophées, aménagement complet, accessibilité
 G.deco={own:{},slot:{}};ok(!own14('coupe')&&own14('nightLamp')&&!own14('aquarium'),'trophées verrouillés, meubles d\'origine possédés');
 f().tourWins=1;f().sgBest=Math.max(10,f().sgBest||0);f().badge4=1;G.deco.own.aquarium=1;G.deco.own.frameB=1;G.deco.own.shelf0=1;ok(own14('coupe')&&own14('cristal')&&own14('medaille'),'trophées débloqués');
 Object.assign(G.deco.slot,{table:'cristal',coin:'coupe',etag:'shelf0',gauche:'aquarium',droite:'medaille',mur:'frameB'});roomApply();
 const M=MAPS.chambre,rows=M.rows,walk=c=>c!==undefined&&!SOLID.has(c),nb=[[1,0],[-1,0],[0,1],[0,-1]];
 const reach=R=>{const seen=new Set(['7,2']),q=[[7,2]];while(q.length){const[x,y]=q.pop();for(const[a,b]of nb){const k=(x+a)+','+(y+b);if(!seen.has(k)&&walk(R[y+b]?.[x+a])){seen.add(k);q.push([x+a,y+b])}}}return(x,y)=>nb.some(([a,b])=>seen.has((x+a)+','+(y+b)))};
 const now1=reach(rows),old=reach(ROOM0.rows);
 for(const k of Object.keys(M.acts)){if(!M.acts[k])continue;const[x,y]=k.split(',').map(Number);if(y===0||!old(x,y)&&!(x===3&&y===1))continue;ok(now1(x,y),`chambre : case (${k}) accessible`)}
 for(const o of M.furn)if(o.k!=='stairsUp')ok(rows[o.y][o.x]==='C',`meuble ${o.k} posé sur une case pleine`);ok(Object.keys(DSL).every(s=>ACH.find(a=>a[0]==='deco')[3]()),'succès « Chez soi »');
 const sv2=normalize(JSON.parse(JSON.stringify(G)));ok(sv2.deco.slot.coin==='coupe','déco conservée à la sauvegarde');G.deco.slot={};loadMap('bourg',5,6,0);G.deco=sv2.deco;
 loadMap('chambre',4,3,1);ok(MAPS.chambre.rows[1][3]==='C','déco appliquée en entrant dans la chambre');await wait(300);await SNAP('chambre');
 G.deco.slot={};roomApply();ok(MAPS.chambre.rows.join()===ROOM0.rows.join()&&MAPS.chambre.furn.length===ROOM0.furn.length,'chambre d\'origine restaurée');
 // Journal et succès sans erreur
 ok(quests().length>0&&ACH.every(a=>typeof a[3]()==='boolean'||a[3]()!==undefined),'journal et succès évalués');
 loadMap('lunevie',18,6,3);await wait(300);await SNAP('nyx');L('done')}
