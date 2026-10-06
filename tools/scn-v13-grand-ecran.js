// Test 13.0 : cinématiques (lecture, passage avec B, nettoyage), cinémathèque, Atlas d'Aurélys, plan de coupe d'Éveil, migration
async()=>{const L=(...a)=>console.log('LOG',...a);const F=f(),AP=AUTO.pick,ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(F,{starter:'flamiot',intro:3,badge:1});G.keys.dex=1;G.party=[mon('brasilion',40)];save();loadMap('ville',5,5,0);await wait(300);
 // Chaque cinématique se joue jusqu'au bout et rend la main au monde
 for(const id of Object.keys(CINE)){const t0=now();await cinema(id);ok(mode==='world'&&!CN&&!waiters.length&&ui.fade===0,`${id} jouée (${((now()-t0)/1000).toFixed(1)} s de jeu)`)}
 ok(Object.keys(CINT).every(k=>G.cin[k]),'cinématiques vues enregistrées');
 // Passer avec B (deux appuis)
 AUTO.off=1;const t1=now(),p=cinema('prologue');while(!CN)await wait(20);await wait(800);press('b');await wait(60);ok(CN&&!CN.skip,'un seul B ne passe pas');press('b');await p;AUTO.off=0;
 ok(mode==='world'&&!CN&&now()-t1<6000&&!waiters.length,'B, B : cinématique passée');
 // Cinémathèque dans le menu
 let seq=['CINÉMAS'];AUTO.pick=m=>{if(m.opts.includes('CINÉMAS')){const v=seq.shift();return v?m.opts.indexOf(v):-1}if(m.title==='Cinémathèque')return(AUTO.cm=(AUTO.cm||0)+1)<2?m.opts.indexOf(CINT.mine):-1;return AP(m)};
 const cn0=G.cin.mine;await pauseMenu();AUTO.pick=AP;ok(AUTO.cm>=2&&cn0&&mode==='world','cinémathèque : revoir la mine');
 // Atlas : navigation au clavier et fiche
 for(const k of Object.keys(RMAP))G.seen[k]=1;AUTO.off=1;const mp=regionMap();await wait(300);await SNAP('atlas');press('up');await wait(100);press('right');await wait(100);await SNAP('atlas2');press('b');await mp;AUTO.off=0;ok(!ui.panel,'atlas ouvert, parcouru, fermé');
 ok(rmSpecies('route1').length>0&&RINFO.bourg&&Object.keys(RMAP).every(k=>RINFO[k]),'fiches de lieu complètes');
 // Plan de coupe d'Éveil en combat
 G.keys.bracelet=1;const bp=battle([mon('brisillon',8)],{});let q=0;while(!B?.me&&q++<200)await wait(20);B.ev[0]=100;let seen=0;const iv=setInterval(()=>{if(ui.cutin)seen=1},10);
 AUTO.pick=m=>mode==='battle'&&m.opts.some(o=>/ÉVEIL/.test(o))?m.opts.findIndex(o=>/ÉVEIL/.test(o)):AP(m);await bp;clearInterval(iv);AUTO.pick=AP;ok(seen,'plan de coupe d\'Éveil affiché');
 // Migration 12 -> 13 : les étapes franchies débloquent les cinématiques
 const old=JSON.parse(JSON.stringify(G));old.v=12;delete old.cin;old.flags={...old.flags,t_corvin:1,boss:1,baseDone:1};const n2=normalize(old);
 ok(n2.v>=13&&n2.cin.prologue&&n2.cin.mine&&n2.cin.eclipse&&n2.cin.centrale&&!n2.cin.aube,'migration 12 -> 13');
 save();ok(load().cin.dome,'sauvegarde des cinématiques vues');
 AUTO.off=1;const wp=whatsNew();await wait(400);await SNAP('news');press('b');await wp;AUTO.off=0;L('done')}
