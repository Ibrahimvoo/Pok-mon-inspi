// Captures 20.0 : carte de dresseur (six badges), table des types (neuf types), carte de la région, combat GLACE, Pixédex.
(async()=>{const L=(...a)=>console.log('LOG',...a),until=async(c,ms=20000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const F=f();Object.assign(F,{starter:'goutelin',rs:'pousseron',intro:3,badge:1,badge2:1,badge3:1,badge4:1,badge5:1,badge6:1,v18vol:1,v20a:1,v20b:1,balance:1,v193fin:1});
 G.keys.dex=1;G.keys.bracelet=1;G.keys.etoile=1;G.keys.trophy=1;G.keys.shards=12;G.money=987654;for(const k of['frimas','col','lacgele','lunevie'])(G.seen??={})[k]=1;
 G.party=[mon('aiglacier',60),mon('yetimont',58),mon('brasilion',60)];for(const k of V20SP)G.dex[k]=2;loadMap('frimas',12,13,0);await wait(300);
 const shot=async(n,fn)=>{AUTO.off=1;const p=run(fn);await wait(700);await SNAP(n);press('b');await wait(200);press('b');await wait(200);press('b');AUTO.off=0;await until(()=>!busy,8000)};
 ui.panel=drawCard;await wait(200);await SNAP('carte-dresseur');ui.panel=null;
 await shot('types',guide);await shot('region',regionMap);
 AUTO.off=1;const p=run(()=>battle([mon('sapigivre',50)],{}));await until(()=>mode==='battle'&&ui.menus.length,8000);await SNAP('combat');AUTO.off=0;await until(()=>!busy,60000);
 L('ok captures')})
