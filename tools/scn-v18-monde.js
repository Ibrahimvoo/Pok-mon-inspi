// Test 18.0 : les nouveaux lieux. Dimensions, portes, passages entre cartes, accessibilité de chaque PNJ, objet, panneau et case à examiner, rendu.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};const bad=[];
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1,badge2:1,badge3:1,badge4:1,badge5:1,v18vol:1,v18arr:1,v18done:1,v18tomb:1,balance:1});
 const NEW=['route3','carnavelle','carnaval','dunes','oasis','tombeau','tombeau2','marais','corail','gmag','gmag2','atelier','carnH1','commiss','theatre','repaire','repaire2','gym5','tente','bazar','oasisH','cabaneB','paillote'];
 const walk=(k,x,y)=>{const c=mapRows(k)[y]?.[x];return c!=null&&!SOLID.has(c)};
 const doorAt=(k,x,y)=>!!MAPS[k].doors?.[x+','+y];
 for(const k of NEW){const M=MAPS[k];if(!M){bad.push('nomap '+k);continue}const R=mapRows(k),w=R[0].length;if(R.some(r=>r.length!==w))bad.push('rows '+k);
  // portes
  for(const[p,d]of Object.entries(M.doors||{})){const[x,y]=p.split(',').map(Number);if(x<0||y<0||y>=R.length||x>=w)bad.push('doorpos '+k+' '+p);
   if(Array.isArray(d)){const[t,tx,ty]=d;if(!MAPS[t])bad.push('doorto '+k+' '+t);else if(!walk(t,tx,ty)&&!doorAt(t,tx,ty))bad.push('doorland '+k+'>'+t+' '+tx+','+ty+' '+mapRows(t)[ty]?.[tx])}}
  // bords
  for(const[e,[t,o]]of Object.entries(M.edges||{})){if(!MAPS[t]){bad.push('edgeto '+k+' '+t);continue}const N=mapRows(t),nw=N[0].length,nh=N.length;
   if(e==='w'||e==='e'){const x=e==='w'?0:w-1;for(let y=0;y<R.length;y++)if(walk(k,x,y)){const ny=y+o,nx=e==='w'?nw-1:0;if(!walk(t,nx,ny))bad.push(`edge ${k}.${e} y${y} -> ${t} ${nx},${ny}`)}}
   else{const y=e==='n'?0:R.length-1;for(let x=0;x<w;x++)if(walk(k,x,y)){const nx=x+o,ny=e==='n'?nh-1:0;if(!walk(t,nx,ny))bad.push(`edge ${k}.${e} x${x} -> ${t} ${nx},${ny}`)}}}
  for(const[p,s]of Object.entries(M.signs||{})){const[x,y]=p.split(',').map(Number);if(R[y][x]!=='S')bad.push('sign '+k+' '+p+' '+R[y][x])}
  for(const n of M.npcs||[])if(n.x<0||n.y<0||n.y>=R.length||n.x>=w)bad.push('npcpos '+k+' '+(n.name||n.t));else if(SOLID.has(R[n.y][n.x])&&n.t!=='obj')bad.push('npcsolid '+k+' '+(n.name||n.t||n.sp)+' '+n.x+','+n.y+' '+R[n.y][n.x])}
 // accessibilité : depuis l'entrée principale de chaque carte, toutes les cibles doivent être atteignables (une case adjacente libre)
 const ENTRY={route3:[30,9],carnavelle:[28,16],carnaval:[14,22],dunes:[26,21],oasis:[22,10],tombeau:[10,14],tombeau2:[7,10],marais:[14,1],corail:[14,16],gmag:[6,8],gmag2:[12,8],atelier:[4,6],carnH1:[4,5],commiss:[4,6],theatre:[7,10],repaire:[8,11],repaire2:[6,8],gym5:[5,9],tente:[4,5],bazar:[4,6],oasisH:[4,5],cabaneB:[4,5],paillote:[4,5]};
 for(const k of NEW){const M=MAPS[k],R=mapRows(k),w=R[0].length,h=R.length,occ=new Set((M.npcs||[]).filter(n=>n.t!=='ball'||!n.item).map(n=>n.x+','+n.y)),seen=new Set(),q=[ENTRY[k]];
  const pass=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&!SOLID.has(R[y][x])&&!occ.has(x+','+y);
  if(!pass(...ENTRY[k]))bad.push('entry '+k);seen.add(ENTRY[k].join(','));
  while(q.length){const[x,y]=q.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,s=nx+','+ny;if(!seen.has(s)&&pass(nx,ny)){seen.add(s);q.push([nx,ny])}}}
  const near=(x,y)=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has((x+dx)+','+(y+dy)))||seen.has(x+','+y);
  for(const n of M.npcs||[])if(!near(n.x,n.y))bad.push('unreach '+k+' '+(n.name||n.t||n.sp)+' '+n.x+','+n.y);
  for(const p of[...Object.keys(M.doors||{}),...Object.keys(M.signs||{}),...Object.keys(M.acts||{})]){const[x,y]=p.split(',').map(Number);if(!near(x,y))bad.push('unreach '+k+' '+p)}
  for(const hd of M.hidden||[])if(!near(hd.x,hd.y))bad.push('unreachH '+k+' '+hd.id)}
 ok(!bad.length,'cartes cohérentes et tout est accessible '+bad.slice(0,25).join(' | '));
 // rendu de chaque lieu, de jour et de nuit
 for(const k of NEW){loadMap(k,...ENTRY[k],1);G.t=CYC*4+60;await wait(120);G.t=CYC*4+300;await wait(80)}ok(true,'les 23 lieux se construisent et s\'affichent');
 G.t=CYC*4+60;for(const k of['route3','carnavelle','carnaval','dunes','oasis','tombeau','marais','corail','gmag','theatre','repaire','gym5']){loadMap(k,...ENTRY[k],1);await wait(150);await SNAP('v18-'+k)}
 // les rencontres sauvages ne contiennent que des espèces valides, et toutes les espèces 18.0 sont trouvables quelque part
 const found=new Set();for(const M of Object.values(MAPS))for(const e of[...(M.enc||[]),...(M.fish||[]),...(M.fish2||[])]){if(!SP[e[0]])bad.push('enc '+e[0]);found.add(e[0])}
 const evoOf=new Set();for(const k of Object.keys(SP)){const e=SP[k].evo;if(e)for(const x of Array.isArray(e[0])?e:[e])evoOf.add(x[1])}
 const gift=['protomk','oasiphant','djinnflamme','scorpharaon','draplin'];const lost=V18SP.filter(k=>!found.has(k)&&!evoOf.has(k)&&!gift.includes(k));
 ok(!bad.length&&!lost.length,'toutes les espèces 18.0 s\'obtiennent (sauvages, évolutions ou cadeaux) '+lost.join(','));
 L('done')}
