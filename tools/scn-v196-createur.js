// Test 19.6 : le menu CRÉATEUR par catégories — éditeur de créature (niveau exact, nature, chromatique, objet tenu, capacité),
// un objet précis en quantité, un pouvoir, sauter à un chapitre, changer l'heure.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const Q=[],op=AUTO.pick;AUTO.pick=m=>{const o=m.opts;if(!Q.length)return op(m);const w=Q.shift(),i=typeof w==='number'?w:o.findIndex(x=>x===w||x.startsWith(w));if(i<0)throw new Error('option absente : '+w+' dans '+o.slice(0,8));return i};
 G=newGame();mode='world';busy=true;Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,tip_evr:1});G.keys.dex=1;G.party=[mon('torrentor',30),mon('goutelin',10)];loadMap('ville',17,11,0);creaSet(CREA_K,CREA_H);
 // 1. Éditeur de créature
 const m=G.party[1],nk=Object.keys(NAT)[1],hk=Object.keys(IT).filter(k=>IT[k][4]==='held').sort((a,b)=>IT[a][0].localeCompare(IT[b][0],'fr'))[0];
 const mv=Object.keys(MV).filter(k=>MV[k]?.n&&!m.moves.includes(k)).sort((a,b)=>MV[a].n.localeCompare(MV[b].n,'fr'))[0];
 Q.push('NIVEAU','4','2','OK','NATURE',NAT[nk][0],'CHROMATIQUE','OBJET TENU',IT[hk][0],'CAPACITÉS',0,MV[mv].n,'RETOUR','RETOUR');await creaEdit(m);
 ok(m.lv===42&&m.nat===nk&&m.sh===1&&m.item===hk&&m.moves[0]===mv&&!Q.length,`éditeur : Nv 42, ${NAT[nk][0]}, chromatique, ${IT[hk][0]}, ${MV[mv].n}`);
 // 2. Le menu par catégories : un objet précis, un pouvoir
 const p0=G.bag.potion|0;Q.push('OBJETS ET ARGENT','DONNER UN OBJET',IT.potion[0]+' (x','5','OK','RETOUR','POUVOIRS','INVINCIBLE','RETOUR','FERMER');const g0=CH.god;await creatorMenu();
 ok((G.bag.potion|0)===p0+5&&CH.god!==g0&&!Q.length,'menu : Potion x5 reçues, pouvoir INVINCIBLE basculé');if(CH.god!==g0){CH.god=g0;chSave()}
 // 3. Histoire et monde
 Q.push('LE CARNAVAL',0);const r=await creaChapter();ok(f().v18vol&&f().badge4&&G.map==='carnavelle'&&/carnaval/.test(r),'sauter au chapitre du Carnaval : '+G.map);
 Q.push('Nuit');await creaTime();ok(night(),'heure : la nuit tombe');L('done')}
