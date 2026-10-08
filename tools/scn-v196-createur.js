// Test 19.6 : le menu CRÉATEUR par catégories. Chaque action est jouée comme par le joueur, et après chacune
// l'écran doit être revenu (pas d'écran noir : ui.fade=0, mode monde).
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 // file de réponses : une réponse n'est consommée que par le menu qui la propose (les autres menus, ex. apprendre une capacité, répondent par défaut)
 const Q=[],op=AUTO.pick;AUTO.pick=m=>{const o=m.opts;if(!Q.length)return op(m);const w=Q[0],i=typeof w==='number'?w:o.findIndex(x=>x===w||x.startsWith(w));if(i<0||i>=o.length)return op(m);Q.shift();return i};
 const clair=()=>mode==='world'&&!ui.fade&&!ui.evo&&!B,run2=async(fn,...q)=>{Q.length=0;Q.push(...q);await fn();const r=Q.length;Q.length=0;return r};
 G=newGame();mode='world';busy=true;Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,tip_evr:1});G.keys.dex=1;G.party=[mon('torrentor',30),mon('goutelin',10)];G.money=500;G.bag={potion:3,pokeball:2};loadMap('ville',17,11,0);creaSet(CREA_K,CREA_H);
 // 1. Éditeur de créature, puis évolution (le bug de l'écran noir)
 const m=G.party[1],nk=Object.keys(NAT)[1],hk=Object.keys(IT).filter(k=>IT[k][4]==='held').sort((a,b)=>IT[a][0].localeCompare(IT[b][0],'fr'))[0];
 const mv=Object.keys(MV).filter(k=>MV[k]?.n&&!m.moves.includes(k)).sort((a,b)=>MV[a].n.localeCompare(MV[b].n,'fr'))[0];
 let rest=await run2(()=>creaEdit(m),'NIVEAU','4','2','OK','NATURE',NAT[nk][0],'CHROMATIQUE','OBJET TENU',IT[hk][0],'CAPACITÉS',0,MV[mv].n,'RETOUR','RETOUR');
 ok(m.lv===42&&m.nat===nk&&m.sh===1&&m.item===hk&&m.moves[0]===mv&&!rest,`éditeur : Nv 42, ${NAT[nk][0]}, chromatique, ${IT[hk][0]}, ${MV[mv].n}`);
 const sp0=m.sp,to=evoTarget(m);ok(!!to,'Goutelin Nv 42 peut évoluer en '+to);await run2(()=>creaEdit(m),'ÉVOLUER MAINTENANT','RETOUR');ok(m.sp===to&&clair(),`évolution : ${sp0} → ${m.sp}, l'écran est revenu (fade ${ui.fade})`);
 rest=await run2(()=>creaEdit(m),'COPIER','RETOUR');const cp=G.party[2];ok(G.party.length===3&&cp.sp===m.sp&&cp!==m&&clair(),'copier une créature');
 await run2(()=>creaEdit(cp),'RELÂCHER','OUI');ok(G.party.length===2&&!G.party.includes(cp)&&clair(),'relâcher la copie');
 // 2. Créatures : donner, combattre
 rest=await run2(creatorMenu,'ÉQUIPE ET CRÉATURES','DONNER UNE CRÉATURE',SP.flamiot.name,'Niveau 30','NON','COMBATTRE UNE CRÉATURE',SP.goutelin.name,'Niveau 5');
 ok(G.party.length===3&&['flamiot','brasilion'].includes(G.party[2].sp)&&G.party[2].lv>=30&&clair()&&!rest,'donner Flamiot Nv 30 (il peut évoluer après le combat), puis combattre un Goutelin : retour au monde');
 // 3. Monde : téléportation
 await run2(creatorMenu,'MONDE','TÉLÉPORTATION',MAPS.port.name);ok(G.map==='port'&&clair(),'téléportation à Port-Miroir');
 // 4. Monde, objets, argent, histoire
 const p0=G.bag.potion|0,g0=CH.god;
 rest=await run2(creatorMenu,'MONDE','PLUIE','FAUNE','RETOUR','OBJETS ET ARGENT','DONNER UN OBJET',IT.potion[0]+' (x','5','OK','ARGENT : MONTANT EXACT','1','2','3','OK','RETOUR','HISTOIRE','OÙ J\'EN SUIS','RETOUR','POUVOIRS','INVINCIBLE','RETOUR','FERMER');
 ok(G.wx?.k==='rain'&&(G.bag.potion|0)===p0+5&&G.money===123&&CH.god!==g0&&clair()&&!rest,'pluie, faune, Potion x5, argent exact (123), étape actuelle, pouvoir INVINCIBLE');if(CH.god!==g0){CH.god=g0;chSave()}
 rest=await run2(creatorMenu,'OBJETS ET ARGENT','VIDER LE SAC','OUI','RETOUR','FERMER');ok(!Object.keys(G.bag).some(k=>IT[k]?.[4]!=='quest')&&clair()&&!rest,'vider le sac');
 // 5. Chapitre et heure
 Q.push('LE CARNAVAL',0);const r=await creaChapter();Q.length=0;ok(f().v18vol&&f().badge4&&G.map==='carnavelle'&&/carnaval/.test(r)&&clair(),'sauter au chapitre du Carnaval : '+G.map);
 Q.push('Nuit');await creaTime();Q.length=0;ok(night()&&clair(),'heure : la nuit tombe');L('done')}
