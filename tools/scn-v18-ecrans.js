// Test 18.0 : écrans (carte de la région, nouveautés, menu TENUES, carte de dresseur, Pixédex, cinématiques) et relecture visuelle.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1,badge2:1,badge3:1,badge4:1,badge5:1,v18vol:1,v18arr:1,v18done:1,balance:1});G.keys.dex=1;G.keys.carte=1;
 for(const k of['volterre','route3','carnavelle','carnaval','dunes','oasis','marais','corail'])(G.seen??={})[k]=1;for(const k of Object.keys(DG))G.keys['dg_'+k]=1;for(const k of V18SP)G.dex[k]=2;
 G.party=[mon('dragarbre',55),mon('pythonova',50),mon('oasiphant',50),mon('masquetotem',45)];loadMap('carnavelle',15,7,0);G.dg='masque';
 // menu TENUES dans le MENU
 let shot=0;const op=AUTO.pick;AUTO.pick=m=>{if(m.opts.includes('TENUES')&&!shot){shot=1;setTimeout(()=>SNAP('pause'),60);return null}if(m.title==='Tenues'&&shot===1){shot=2;setTimeout(()=>SNAP('tenues'),60);return m.opts.length-1}return op(m)};
 {const r=run(async()=>{const i=await choose(['ÉQUIPE','SAC','SAUVER','OPTIONS','TITRE','FERMER'],{x:W-244,y:8,w:236});return i});await wait(400);while(ui.menus.length){press('a');await wait(150)}await r}
 AUTO.pick=op;ok(shot>=1,'TENUES apparaît dans le MENU');
 await wait(200);await SNAP('monde-masque');ok(dgLook()==='dgmasque','le joueur apparaît masqué');
 // carte de la région, nouveautés, menu pause et tenues : pilote automatique coupé le temps des photos
 AUTO.off=1;{const p=regionMap();await wait(900);await SNAP('carte');for(let i=0;i<6&&ui.menus.length+(ui.panel?1:0);i++){press('b');await wait(250)}await p}
 {const p=whatsNew();await wait(700);await SNAP('nouveautes');for(let i=0;i<12&&(ui.panel||ui.menus.length||ui.text);i++){press('b');await wait(200)}await p}
 {const p=pauseMenu();await wait(600);await SNAP('menu');const m=ui.menus[ui.menus.length-1];ok(m&&m.opts.includes('TENUES'),'TENUES dans le vrai MENU');m.i=m.opts.indexOf('TENUES');press('a');await wait(600);await SNAP('menu-tenues');
  for(let i=0;i<10&&(ui.menus.length||ui.text);i++){press('b');await wait(250)}await p}
 AUTO.off=0;
 // cinématiques
 for(const id of['carnaval','mascarade','oasis','djinn']){const p=run(()=>cinema(id));await wait(2600);await SNAP('cine-'+id);while(CN){press('b');await wait(60);press('b');await wait(400)}await p;ok(G.cin[id],'cinématique '+id)}
 // tempête de sable
 G.dg=null;loadMap('dunes',26,16,1);await wait(300);await SNAP('tempete');G.dg='sable';loadMap('dunes',16,6,1);await wait(300);await SNAP('desert');
 G.dg=null;G.t=CYC*3+300;loadMap('carnaval',14,16,1);await wait(300);await SNAP('carnaval-nuit');loadMap('marais',14,8,0);await wait(300);await SNAP('marais-nuit');
 L('done')}
