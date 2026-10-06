// Test 13.2 : intérieurs meublés accessibles, salles tech animées, bois hanté, cristaux, rendu de tous les lieux
async()=>{const L=(...a)=>console.log('LOG',...a);const ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 const walk=c=>c!==undefined&&!SOLID.has(c)&&!'~wL'.includes(c),nb=[[1,0],[-1,0],[0,1],[0,-1]];
 for(const k of['maisonP','maisonA','lacH','recifH','maisonY','dome','citadelle']){const M=MAPS[k],rows=M.rows,seen=new Set(),q=[];
  for(const s of Object.keys(M.doors||{})){const[x,y]=s.split(',').map(Number);for(const[a,b]of nb)if(walk(rows[y+b]?.[x+a])){seen.add((x+a)+','+(y+b));q.push([x+a,y+b])}}
  while(q.length){const[x,y]=q.pop();for(const[a,b]of nb){const nx=x+a,ny=y+b,kk=nx+','+ny;if(!seen.has(kk)&&walk(rows[ny]?.[nx])){seen.add(kk);q.push([nx,ny])}}}
  const near=(x,y)=>seen.has(x+','+y)||nb.some(([a,b])=>seen.has((x+a)+','+(y+b)));
  for(const n of M.npcs||[])if(n.x!=null)ok(near(n.x,n.y),`${k} : PNJ (${n.x},${n.y}) accessible`);
  for(const s of Object.keys(M.acts||{})){const[x,y]=s.split(',').map(Number);ok(near(x,y),`${k} : objet (${x},${y}) accessible`)}
  for(const o of M.furn||[])for(let b=o.y;b<o.y+(o.h||1);b++)ok(rows[b][o.x]==='C',`${k} : meuble ${o.k} posé sur une case pleine`)}
 AUTO.off=1;for(const k of Object.keys(MAPS)){MAPS[k].L=null;loadMap(k,1,1,0);await wait(25)}AUTO.off=0;ok(true,'tous les lieux construits sans erreur');
 for(const k of['obs','centrale','centrale2','dome'])ok(MAPS[k].blink?.length>0&&MAPS[k].glo?.length>0,`${k} : voyants et spots animés`);
 ok(MAPS.citadelle.style==='cit'&&MAPS.bois.spooky&&MAPS.bois.rows.some(r=>r.includes('t')),'Citadelle en pierre, Bois Sépulcral hanté avec tombes');
 ok(['grotte','galeries','faille'].every(k=>MAPS[k].crys)&&MAPS.galeries.glo?.length>0,'cristaux luisants dans les grottes profondes');
 for(const k of['obs','maisonP','bois','galeries']){loadMap(k,MAPS[k].rows[0].length>>1,MAPS[k].rows.length>>1,0);await wait(200);await SNAP(k)}L('done')}
