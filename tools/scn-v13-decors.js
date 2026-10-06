// Test 13.1 : décors — rien de ce qui était accessible ne doit devenir inaccessible, rendu sans erreur de chaque lieu, biome neige
async()=>{const L=(...a)=>console.log('LOG',...a);const ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const DECO='|+PpN*&mMVO%',walk=c=>c!==undefined&&!SOLID.has(c)&&!'~wL'.includes(c);
 const reach=rows=>{const h=rows.length,w=rows[0].length,seen=new Set(),q=[];
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if((x===0||y===0||x===w-1||y===h-1)&&walk(rows[y][x])){seen.add(x+','+y);q.push([x,y])}
  while(q.length){const[x,y]=q.pop();for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+a,ny=y+b,k=nx+','+ny;if(!seen.has(k)&&walk(rows[ny]?.[nx])){seen.add(k);q.push([nx,ny])}}}return seen};
 const near=(S,x,y)=>[[0,0],[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>S.has((x+a)+','+(y+b)));let tot=0;
 for(const[k,M]of Object.entries(MAPS)){if(isInt(M))continue;const now=M.rows,before=now.map(r=>[...r].map(c=>DECO.includes(c)?'.':c).join(''));if(before.join()===now.join())continue;
  const A=reach(before),B=reach(now),T=[...(M.npcs||[]).map(n=>[n.x,n.y,'pnj']),...Object.keys(M.doors||{}).map(s=>[...s.split(',').map(Number),'porte']),...Object.keys(M.signs||{}).map(s=>[...s.split(',').map(Number),'panneau']),...Object.keys(M.hidden||{}).map(s=>[...s.split(',').map(Number),'caché']),...Object.keys(M.acts||{}).map(s=>[...s.split(',').map(Number),'action'])];
  for(const[x,y,t]of T)if(near(A,x,y))ok(near(B,x,y),`${k} : ${t} (${x},${y}) toujours accessible`);tot++}
 ok(tot>=10,`${tot} lieux décorés vérifiés`);
 // Chaque lieu extérieur se construit et s'affiche sans erreur
 AUTO.off=1;for(const k of Object.keys(MAPS)){if(isInt(MAPS[k]))continue;MAPS[k].L=null;loadMap(k,1,1,0);await wait(30)}AUTO.off=0;ok(true,'tous les extérieurs construits');
 ok(biomeOf(MAPS.pic)==='snow'&&TL.sn&&TL.N_face&&TL.fwB&&TL.fpB,'Pic Céleste enneigé, tuiles de clôture présentes');
 loadMap('bourg',9,8,0);await wait(200);await SNAP('bourg');loadMap('pic',10,12,0);await wait(200);await SNAP('pic');L('done')}
