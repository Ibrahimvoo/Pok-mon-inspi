// Audit des données (sans jouer) : espèces, capacités, évolutions, cartes, portes, rencontres, dresseurs, objets.
// Usage : node tools/play.mjs tools/scn-audit.js — chaque incohérence est listée ; le test échoue s'il y en a.
(async()=>{const P=[],bad=(...a)=>P.push(a.join(' '));
 for(const[k,s]of Object.entries(SP)){
  for(const[l,mv]of s.learn)if(!MV[mv])bad('espèce',k,'capacité inconnue',mv,'niv',l);
  if(!SP[s.base])bad('espèce',k,'base inconnue',s.base);
  const ev=s.evo;if(ev)(Array.isArray(ev[0])?ev:[ev]).forEach(e=>{const t=Array.isArray(e)?e[1]:e;if(typeof t==='string'&&!SP[t])bad('espèce',k,'évolution inconnue',t)});
  if(!TY[s.t])bad('espèce',k,'type inconnu',s.t);if(!PIMG[k])bad('espèce',k,'sans sprite');
  if(!DEX.includes(k))bad('espèce',k,'absente du Pixédex')}
 for(const k of DEX)if(!SP[k])bad('Pixédex',k,'espèce inconnue');
 for(const[k,v]of Object.entries(MV))if(!TY[v.t])bad('capacité',k,'type inconnu',v.t);
 const spOk=(w,sp)=>{if(!SP[sp])bad(w,'espèce inconnue',sp)};
 for(const[k,M]of Object.entries(MAPS)){const w='carte '+k,R=M.rows,h=R.length,wd=R[0].length;
  R.forEach((r,y)=>{if(r.length!==wd)bad(w,'ligne',y,'de largeur',r.length,'au lieu de',wd)});
  for(const[pos,d]of Object.entries(M.doors||{})){const[x,y]=pos.split(',').map(Number);if(x<0||y<0||x>=wd||y>=h)bad(w,'porte hors carte',pos);
   if(Array.isArray(d)){const N=MAPS[d[0]];if(!N){bad(w,'porte',pos,'vers carte inconnue',d[0]);continue}const c=N.rows[d[2]]?.[d[1]];if(c==null)bad(w,'porte',pos,'arrive hors de',d[0],d[1],d[2]);else if(SOLID.has(c)&&!N.doors?.[d[1]+','+d[2]])bad(w,'porte',pos,'arrive sur une case pleine',d[0],d[1],d[2],JSON.stringify(c))}}
  for(const[dir,e]of Object.entries(M.edges||{})){const N=MAPS[e[0]];if(!N){bad(w,'bord',dir,'vers carte inconnue',e[0]);continue}
   // chaque case praticable du bord doit arriver sur une case praticable de la carte voisine (sinon le joueur est coincé dans un mur)
   const d='snwe'.indexOf(dir),NR=mapRows(e[0]),R0=mapRows(k),nh=NR.length,nw=NR[0].length,ok=c=>c!=null&&!SOLID.has(c);
   for(let i=0;i<(d<2?wd:h);i++){const x=d<2?i:d===2?0:wd-1,y=d<2?(d===0?h-1:0):i;if(!ok(R0[y][x]))continue;
    const nx=d<2?x+e[1]:d===2?nw-1:0,ny=d<2?(d===0?0:nh-1):y+e[1],c=NR[ny]?.[nx];if(!ok(c)&&!N.doors?.[nx+','+ny]&&!N.opens?.[c]&&!N.sw?.[c]&&!N.sw?.[(N.rows0||N.rows)[ny]?.[nx]]&&!AFF0[c])bad(w,'bord',dir,'case',x,y,'arrive sur',e[0],nx,ny,JSON.stringify(c??'hors carte'))}}
  for(const e of[...(M.enc||[]),...(M.fish||[]),...(M.fish2||[]),...(M.fish3||[])])spOk(w+' rencontre',e[0]);
  for(const hd of M.hidden||[]){if(hd.it&&!IT[hd.it])bad(w,'objet caché inconnu',hd.it);if(hd.x>=wd||hd.y>=h)bad(w,'objet caché hors carte',hd.id)}
  for(const n of M.npcs||[]){if(n.x<0||n.y<0||n.x>=wd||n.y>=h)bad(w,'PNJ hors carte',n.name||n.t,n.x,n.y);
   if(n.tr)for(const[sp]of n.tr.team||[])spOk(w+' dresseur '+n.tr.id,sp);if(n.sp&&!SP[n.sp])bad(w,'PNJ créature inconnue',n.sp);
   if(n.it&&!IT[n.it])bad(w,'objet au sol inconnu',n.it)}}
 for(const[k,b]of Object.entries(BOOST))if(!IT[b])bad('renforçateur',k,'objet inconnu',b);
 console.log('LOG audit',Object.keys(SP).length,'espèces',Object.keys(MV).length,'capacités',Object.keys(MAPS).length,'cartes');
 for(const l of P)console.log('LOG ✗',l);if(P.length)throw new Error(P.length+' incohérence(s)')})
