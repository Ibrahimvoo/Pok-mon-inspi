// Test « fuzz » : partie de fin de jeu, puis sur chaque carte on parle à chaque PNJ visible (dialogues, combats, menus pilotés).
// Toute erreur (console.error, exception) est notée avec la carte et le PNJ. Usage : node tools/play.mjs tools/scn-fuzz.js
// MAPS=a,b : seulement ces cartes. Une interaction qui dure plus de 25 s est interrompue (le pilote répond B jusqu'au retour au calme).
(async()=>{const L=(...a)=>console.log('LOG',...a),E=[],ctx={m:'',n:''};
 {const ce=console.error;console.error=function(...a){E.push(`[${ctx.m} / ${ctx.n}] `+a.map(x=>x?.stack||String(x)).join(' ').slice(0,400));return ce.apply(this,a)}}
 window.addEventListener('error',e=>E.push(`[${ctx.m} / ${ctx.n}] ${e.message}`));
 const idle=()=>!busy&&mode==='world'&&!ui.text&&!ui.menus.length,until=async(c,ms)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(40);return c()};
 Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,v18done:1,v18faus:1,v18ecoute:1,badge5:1,
  obsScene:1,bar:1,selene2done:1,vex2:1,balance:1,badge3:1,legS:1,legN:1,legC:1,v19rec2:1,failleDone:1,sanct:1,v193gr:1,v193fin:1,tourWins:1,tip_evr:1});
 G.keys.dex=1;G.keys.bracelet=1;G.keys.relais=1;G.party=[mon('torrentor',100),mon('brasilion',100),mon('sylvorne',100)];G.repel=1e9;G.money=1e6;
 const only=(window.FUZZMAPS||'').split(',').filter(Boolean),keys=Object.keys(MAPS).filter(k=>!only.length||only.includes(k)&&MAPS[k]);
 const pick0=AUTO.pick;let nTalk=0;
 for(const k of keys){const M=MAPS[k];ctx.m=k;ctx.n='(entrée)';
  try{const R=mapRows(k),spot=(x0,y0)=>{for(let r=0;r<6;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const x=x0+dx,y=y0+dy,c=R[y]?.[x];if(c&&!SOLID.has(c)&&!M.doors?.[x+','+y]&&!npcs(M).some(n=>n.x===x&&n.y===y))return[x,y]}return null};
   const s=spot(R[0].length>>1,R.length>>1)||[1,1];loadMap(k,s[0],s[1],0);await wait(60);
   for(const n of[...npcs(M)]){if(!npcs(M).includes(n)||n.fauna)continue;ctx.n=n.name||n.tr?.name||n.sp||n.k||n.t;
    let at=null;for(const d of[0,1,2,3]){const x=n.x-DX[d],y=n.y-DY[d],c=R[y]?.[x];if(c&&!SOLID.has(c)&&!npcs(M).some(o=>o!==n&&o.x===x&&o.y===y)){at=[x,y,d];break}}
    if(!at)continue;if(G.map!==k)loadMap(k,at[0],at[1],at[2]);G.x=at[0];G.y=at[1];G.dir=at[2];G.party.forEach(m=>{m.hp=st(m).hp;m.st=null});
    nTalk++;const p=run(interact);if(!await until(()=>idle()&&!waiters.length,25000)){AUTO.pick=()=>-1;await until(idle,15000);AUTO.pick=pick0}await p.catch?.(()=>0);await wait(20)}}
  catch(e){E.push(`[${k}] ${e.stack||e}`.slice(0,400))}
  AUTO.pick=pick0;if(!idle()){AUTO.pick=()=>-1;await until(idle,15000);AUTO.pick=pick0}}
 L('fuzz',keys.length,'cartes',nTalk,'interactions',E.length,'erreurs');for(const e of E)L('✗',e);if(E.length)throw new Error(E.length+' erreur(s)')})
