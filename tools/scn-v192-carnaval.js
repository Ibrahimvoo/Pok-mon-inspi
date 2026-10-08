// Test 19.2 : le Carnaval revisité — le voleur dans la foule (erreur, puis démasqué), la confidence de Mirella,
// Faustine affaiblie (sans son Orbe), « Que dis-tu à Faustine ? », Barnabé, Mirella après le chapitre, et l'épilogue.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const op=AUTO.pick,pick=f=>{AUTO.pick=m=>{const i=f(m);return i!=null?i:op(m)}};
 G=newGame();mode='world';busy=true;Object.assign(f(),{starter:'goutelin',intro:3,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,tip_evr:1});
 G.keys.dex=1;G.keys.bracelet=1;G.party=[mon('torrentor',60),mon('brasilion',58)];loadMap('carnavelle',11,14,0);dgGive('masque');G.dg='masque';
 // 1. La Place : Léo a vu le voleur
 await warp('carnaval',15,21,1);ok(f().v192v===1,'Léo : le voleur se cache parmi les danseurs');ok(/Démasque-le/.test(goal()),'objectif : '+goal());
 const D=i=>MAPS.carnaval.npcs.find(n=>n.name===DN192[i][2]);ok([0,1,2,3].every(i=>npcs(MAPS.carnaval).includes(D(i))),'quatre danseurs masqués sur la Place');
 G.x=12;G.y=12;G.dir=1;await SNAP('danseurs');
 // 2. Une erreur, puis le bon
 pick(m=>m.opts?.[0]==='L\'ACCUSER'?0:null);await D(0).fn(D(0));ok(f().v192e===1&&f().v192v===1,'mauvais danseur : une erreur');
 await D(2).fn(D(2));ok(f().v192v===2&&G.bag.orbe>=1,'Pipo démasqué et battu : l\'Orbe de Faustine récupéré');ok(!npcs(MAPS.carnaval).includes(D(2)),'les danseurs ont quitté la parade');
 await barnabeTalk();ok(f().v192ba===1,'Barnabé remercie pour Pipo');
 // 3. Mirella : l'uniforme, puis la confidence
 Object.assign(f(),{v18ecoute:1,badge5:1});await warp('atelier',3,4,1);await mirellaTalk();ok(dgHas('eclipse')&&f().v192mi===1&&SAID.some(s=>/sa place à l'atelier/.test(s)),'Mirella coud l\'uniforme et parle de Faustine');
 // 4. Faustine (sans Orbe), puis le choix
 G.dg='eclipse';Object.assign(f(),{v18trappe:1,v18code:1,v18clara:1});await warp('repaire2',6,8,1);const fa=MAPS.repaire2.npcs.find(n=>n.name==='Faustine');
 let ace=null;{const ob=battle;battle=async function(foes,o){if(o?.tr?.name==='Couturière Faustine')ace=foes[foes.length-1];return ob.apply(this,arguments)}}
 pick(m=>m.opts?.[0]==='MIRELLA T\'ATTEND'?0:null);await fa.fn(fa);ok(ace&&ace.sp==='masquetotem'&&!ace.item,'Faustine : son Masquetotem n\'a plus d\'Orbe');
 ok(f().v18faus&&G.bag.clecabine&&f().v192fa===1,'« Mirella t\'attend » : Faustine est touchée');ok(SAID.some(s=>/Ce bavard/.test(s)),'Faustine sait que Pipo a parlé');
 // 5. Après le chapitre
 await warp('atelier',3,4,1);await mirellaTalk();ok(f().v192mr===1&&G.bag.pierrechance>=1,'Mirella a reçu une lettre de Faustine');
 f().v191sel=1;const L0=SAID.length;try{await Promise.race([epilogue191(),wait(20000)])}catch(e){}
 ok(SAID.slice(L0).some(s=>/Pipo, le voleur masqué/.test(s))&&SAID.slice(L0).some(s=>/Atelier Mirella/.test(s)),'épilogue : Pipo et Faustine');
 PV191.epi=0;mode='world';await fadeTo(0,100);L('done')}
