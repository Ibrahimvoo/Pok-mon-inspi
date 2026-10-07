// Test 18.2 : fonds de combat prolongés proprement, taux de rencontres et répit, créatures visibles hors des couloirs,
// options RENCONTRES et COURSE, grottes élargies (tout reste accessible), Éclat caché de Cendreville accessible.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 G=newGame();mode='world';Object.assign(f(),{starter:'goutelin',intro:3,badge:1,badge2:1,mineAlert:1});G.keys.lantern=1;G.party=[mon('torrentor',14)];
 // 1) fonds de combat : 240x160, le bas n'est plus une seule ligne étirée (les lignes sous l'image diffèrent entre elles)
 for(const k of['plaine','foret','lac','grotte','mont']){const c=bgArt(k),g=c.getContext('2d'),row=y=>[...g.getImageData(0,y,240,1).data].join(),h=BGI[k].height;
  ok(c.width===240&&c.height===160,'fond '+k+' 240x160');let diff=0;for(let y=h+1;y<160;y++)if(row(y)!==row(h))diff++;ok(diff>(160-h)/2,`fond ${k} : sol prolongé sans bandes (${diff} lignes différentes)`)}
 // 2) rencontres : grotte ~3 % par pas, répit après un combat, moitié moins avec une équipe bien plus forte, option RARES
 const roll=(k,lv,n=4000)=>{G.party=[mon('torrentor',lv)];let c=0;ENCR=0;for(let i=0;i<n;i++)if(encRoll(MAPS[k],false))c++;return c/n};
 const pm=roll('mine',14);ok(pm>.02&&pm<.04,'sol de la mine ≈ 3 % par pas : '+(pm*100).toFixed(1)+' %');
 const ps=roll('mine',40);ok(ps<pm*.75,'équipe bien plus forte : moins de rencontres ('+(ps*100).toFixed(1)+' %)');
 G.opt.enc=1;const pr=roll('mine',14);G.opt.enc=0;ok(pr<pm*.6,'option RARES : '+(pr*100).toFixed(1)+' %');
 G.party=[mon('torrentor',14)];loadMap('mine',11,14,1);ok(ENCR>=3,'quelques pas de répit en arrivant sur une carte');
 {const p=run(()=>battle([mon('ratounet',3,{wild:1})]));await p;ok(ENCR>=6,'répit de '+ENCR+' pas après un combat');let n=0;const e0=ENCR;for(let i=0;i<e0;i++)if(encRoll(MAPS.mine,false))n++;ok(n===0,'aucune rencontre pendant le répit')}
 // 3) créatures visibles : jamais dans un couloir d'une case
 let bad=0,tot=0;for(let i=0;i<40;i++)for(const k of['mine','grotte','foret','route1','mont']){G.x=1;G.y=1;faunaSpawn(k);for(const n of MAPS[k].npcs.filter(n=>n.fauna)){tot++;if(!roomy(MAPS[k],n.x,n.y))bad++}}
 ok(tot>50&&bad===0,`${tot} créatures visibles placées, aucune dans un couloir`);
 // 4) course : TOUJOURS court sans B, AVEC B court seulement en tenant B
 G.opt.run=1;held.b=0;ok(running(),'COURSE : TOUJOURS court sans rien tenir');held.b=1;ok(!running(),'… et B fait marcher');G.opt.run=0;held.b=0;ok(!running(),'COURSE : AVEC B marche par défaut');held.b=1;ok(running(),'… et court avec B');held.b=0;
 {let seen=null;const op=AUTO.pick;AUTO.pick=m=>{if(m.opts.includes('OPTIONS DU JEU…'))return m.opts.indexOf(seen?'RETOUR':'OPTIONS DU JEU…');if(m.opts.some(o=>/^RENCONTRES/.test(o))){seen=m.opts.slice();return m.opts.indexOf('RETOUR')}return op(m)};const p=options();await wait(500);await p;AUTO.pick=op;
  ok(seen&&seen.some(o=>/^RENCONTRES : /.test(o))&&seen.some(o=>/^COURSE : /.test(o)),'options RENCONTRES et COURSE dans OPTIONS DU JEU')}
 // 5) grottes élargies : tout reste accessible, les obstacles d'affinité gardent leurs salles
 const reach=(k,st,gates=[])=>{const M=MAPS[k],S=new Set(st.map(p=>p.join())),q=[...st];while(q.length){const[x,y]=q.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,kk=nx+','+ny,c=M.rows[ny]?.[nx];if(S.has(kk)||c==null)continue;if(!SOLID.has(c)&&!'~wHL'.includes(c)||gates.includes(kk)){S.add(kk);q.push([nx,ny])}}}return S};
 refreshMap('grotte');refreshMap('mine');
 {const S=reach('grotte',[[13,17],[14,17]]);ok(S.has('13,1')&&S.has('14,1'),'Grotte Écho : la sortie nord est accessible');for(const p of['18,2','24,9','24,8','2,9','10,3','23,10'])ok(S.has(p),'Grotte Écho : case '+p+' accessible');
  ok(!S.has('4,6')&&!S.has('7,6'),'Grotte Écho : la salle de l\'Éclat reste fermée par le rocher fissuré');const S2=reach('grotte',[[13,17]],['8,7']);ok(S2.has('4,6')&&S2.has('7,6'),'… et s\'ouvre une fois le rocher brisé');
  let n1=0;for(const p of S){const[x,y]=p.split(',').map(Number),M=MAPS.grotte,w=(a,b)=>{const c=M.rows[b]?.[a];return c!=null&&!SOLID.has(c)};if(w(x-1,y)&&w(x+1,y)&&!w(x,y-1)&&!w(x,y+1)||!w(x-1,y)&&!w(x+1,y)&&w(x,y-1)&&w(x,y+1))n1++}ok(n1<10,'Grotte Écho : presque plus de couloirs d\'une case ('+n1+')')}
 {const S=reach('mine',[[11,16],[12,16]]);for(const p of['11,4','14,1','2,9','2,13','23,12','16,8','7,6'])ok(S.has(p),'Mine : case '+p+' accessible');
  const R=MAPS.mine.rows.map(r=>[...r]);R[3][11]='^';const M0=MAPS.mine.rows;MAPS.mine.rows=R.map(r=>r.join(''));const S3=reach('mine',[[11,16]]);MAPS.mine.rows=M0;ok(!S3.has('11,1'),'Mine : Tito reste derrière le lieutenant Corvin');ok(!S.has('23,6'),'Mine : la galerie secrète reste derrière le brasier')}
 // 6) Cendreville : l'Éclat caché (19,1) n'est plus enfermé par le puits
 {refreshMap('ville');const S=reach('ville',[[12,0]]);ok([[19,2],[18,1],[20,1],[19,0]].some(([x,y])=>S.has(x+','+y))||S.has('19,1'),'Cendreville : l\'Éclat caché est accessible')}
 ok(NEWS[0][1]==='Nouvelle console'&&NEWS[1][1]==='Combats et rencontres'&&NEWS[2][1]==='Grottes et déplacements','nouveautés 18.2 en tête');ok(normalize(Object.assign(JSON.parse(JSON.stringify(G)),{v:18.1,wn:0})).wn===1,'une sauvegarde 18.1 affiche les nouveautés');
 // 7) un vrai combat dans la grotte s'affiche (capture)
 G.party=[mon('torrentor',30)];loadMap('grotte',13,13,1);AUTO.off=1;{const p=run(()=>battle([mon('rocaton',10,{wild:1})]));await wait(2400);await SNAP('combat-grotte');AUTO.off=0;await p}
 loadMap('grotte',20,8,1);ui.banner=null;await wait(300);await SNAP('grotte-lumiere');
 L('done')}
