// Test 10.0 : Défis de Volterre, colis de Bertin, photo, succès, sauvegarde, mini-jeu de pêche
async()=>{const L=(...a)=>console.log('LOG',...a);const F=f();
 G.party=[mon('torrentor',88),mon('rocaroc',88),mon('brasilion',88),mon('sylvorne',88),mon('orageon',88),mon('novarium',88)];G.party.forEach(m=>m.aff=255);
 Object.assign(F,{starter:'goutelin',rs:'flamiot',intro:3,badge:1,badge2:1,badge3:1,badge4:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,kael3:1,obsScene:1,vex2:1,balance:1,baseDone:1,volArr:1,dadHome:1});
 G.keys.rod=1;G.keys.rod2=1;G.keys.sablier=1;G.keys.dex=1;G.keys.bracelet=1;G.bag.amucycle=1;G.money=50000;
 const AP=AUTO.pick;const setPh=i=>{const n=180,b=Math.ceil((G.t+1)/CYC)*CYC;G.t=b+[5,45,CYC-n-35,CYC-n+5][i]};const go=async(m,x,y,d=0)=>{loadMap(m,x,y,d);await wait(200)},npc=(pred)=>npcs(MAPS[G.map]).find(pred),talk=async n=>{if(!n){L('NO NPC');return}await n.fn(n)};
 for(let i=0;i<8;i++)F['st_'+i]=1;F.masqOk=1; setInterval(()=>console.log('LOG hb',mode,G.map,B?.turn,B?.foe?.sp,ui.text?.s?.slice(0,50),ui.menus.map(m=>(m.title||'')+':'+m.opts.slice(0,3).join('/')).join('|'),!!ui.panel,!!ui.fishBar),4000);
 // DÉFIS
 await go('volterre',21,19,1);const P0=G.party;G.party=[mon('flamiot',60),mon('brasilion',60),mon('pyrenard',60)];L('mono',F.monoWin,JSON.stringify(G.monoDone));
 G.party=[mon('flamiot',20),mon('goutelin',30),mon('pousseron',25)];const lv0=G.party.map(m=>m.lv+':'+m.sp);AUTO.pick=m=>m.title==='Défis de Volterre'?1:AP(m);await defiTalk();L('eq',lv0.join(),'->',G.party.map(m=>m.lv+':'+m.sp).join());AUTO.pick=AP;G.party=P0;
 // ANCIENS SBIRES, COLIS
 await go('volterre',4,18,1);await talk(npc(n=>n.name==='Ancien sbire Bertin'));L('colis',G.bag.colis);await go('salon',3,4,0);const lou=MAPS.salon.npcs.find(n=>n.t==='sis');if(lou){await louTalk(lou)}L('colisOk',F.colisOk);
 // PHOTO, CARNET
 G.keys.camera=1;await go('mont',9,19,1);G.party.unshift(mon('flamiot',30));await takePhoto();L('album',JSON.stringify(Object.keys(G.album)));G.party.shift();
 achCheck();L('ach',Object.keys(G.ach).length,Object.keys(G.ach).join(','));L('mail',G.mail.length);await mailFlush();
 AUTO.off=1;const cp=carnet();await wait(300);await SNAP('carnet0');press('right');await wait(200);await SNAP('carnet1');press('right');await wait(200);await SNAP('carnet2');press('right');press('right');await wait(200);await SNAP('carnet4');press('right');await wait(200);await SNAP('carnet5');press('b');await cp;AUTO.off=0;
 const rp=regionMap();AUTO.off=1;await wait(300);await SNAP('map');press('b');await rp.catch?.(()=>0);AUTO.off=0;
 L('save',save(),JSON.stringify(G).length);const g2=load();L('reload',!!g2,g2&&g2.v,Object.keys(g2.rep||{}).length);
 await go('lac',22,7,2);for(let r=0;r<3;r++){AUTO.off=1;const fp=fish();let tries=0;while(!ui.fishBar&&tries++<600)await wait(20);L('bar',!!ui.fishBar,ui.text?.s);for(let i=0;i<600&&ui.fishBar;i++){const fb=ui.fishBar,p=fishPos(fb);if(p>fb.z0+.03&&p<fb.z0+fb.w-.03){press('a');break}await wait(3)}AUTO.off=0;await fp;L('fished',ST10().fish)}
 L('done')}
