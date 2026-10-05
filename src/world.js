// =====================================================================
// MONDE — cartes dessinées avec les tuiles libres du projet Tuxemon (CC BY-SA, voir CREDITS.md).
// Chaque carte est composée en tuiles 16x16 à l'échelle 1 puis agrandie ×2 (pixels nets). Les bords de chemins,
// les rives et les falaises sont auto-tuilés par quarts de tuile selon les voisins ; arbres, bâtiments et mobilier
// sont des décors triés en profondeur avec les personnages. Eau, lave et fleurs sont animées image par image.
// =====================================================================
const AIMG={},PEO={},TL={},TL2={},BGI={};
const imgOf=b=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/png;base64,'+b});
const cut=(im,x,y,w,h)=>mkc(w,h,g=>g.drawImage(im,x,y,w,h,0,0,w,h));
const up2=c=>mkc(c.width*2,c.height*2,g=>g.drawImage(c,0,0,c.width*2,c.height*2));
const T2=k=>TL2[k]||(TL[k]?TL2[k]=up2(TL[k]):null);
const rgb=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
// Portrait de dialogue : tête et épaules découpées dans le sprite de combat (64x64), agrandies ×2.
function portraitOf(bt,bob){const d=bt.getContext('2d').getImageData(0,0,64,64).data,op=(x,y)=>d[(y*64+x)*4+3]>40;let y0=0;while(y0<63&&![...Array(64).keys()].some(x=>op(x,y0)))y0++;
 let sx=0,n=0;for(let y=y0;y<Math.min(64,y0+12);y++)for(let x=0;x<64;x++)if(op(x,y)){sx+=x;n++}
 const cx=n?Math.round(sx/n):32,L=Math.max(0,Math.min(30,cx-17)),top=Math.max(0,y0-2);return mkc(72,72,g=>g.drawImage(bt,L,top,34,34,2,2+bob,68,68))}
const ARTREADY=(async()=>{const P=ART.props;if(P){const im=await imgOf(P.img);if(im)for(const[k,[x,y,w,h]]of Object.entries(P.map))AIMG[k]=cut(im,x,y,w,h)}
 const Tt=ART.tiles;if(Tt){const im=await imgOf(Tt.img);if(im)for(const[k,[x,y,w,h]]of Object.entries(Tt.map))TL[k]=cut(im,x,y,w,h)}
 for(const[k,b]of Object.entries(ART.bg||{})){const im=await imgOf(b);if(im)BGI[k]=im}
 const Q=ART.people;if(Q){const[ow,bt]=await Promise.all([Q.ow,Q.bt].map(o=>imgOf(o.img))),ROW=[0,3,1,2],COL=[1,0,2];
  Q.keys.forEach((k,i)=>{const b1=cut(bt,0,i*64,64,64),b2=up2(b1);
   PEO[k]={ow:[...Array(12)].map((_,j)=>mkc(32,64,g=>g.drawImage(ow,COL[j%3]*16,i*128+ROW[j/3|0]*32,16,32,0,0,32,64))),bt:b2,vs:b2,pt:[portraitOf(b1,0),portraitOf(b1,2)]}})}})();

function biomeOf(M){return M===MAPS.ruines?'ruins':M.cave?'cave':M.amb==='mont'?'mont':M.amb==='foret'?'forest':'plain'}
const isInt=M=>!!(M.floor||M.amb==='in'||M.amb==='tech');
function sprAt(M,img,x,y,row){if(!img)return;const r=row??Math.max(0,(y-1)>>5);(M.S[r]||=[]).push({img,x,y:y-img.height,by:y})}
function buildMap(M){if(M.L)return;M.S=[];if(isInt(M))buildInterior(M);else buildOutdoor(M);for(const r of M.S)if(r)r.sort((a,b)=>a.by-b.by||a.x-b.x);M.F=null}

// ---------------------------------------------------------------- extérieurs
const WATC=new Set('~wH');
const BLD={bourg:{R:'bHome',G:'bLab'},ville:{Y:'bGymF',R:'bCenter',B:'bMart'},port:{A:'bGymW',R:'bCenter',B:'bMart'}},BLDDEF={R:'bHouse2',G:'bLab',B:'bMart',Y:'bGymF',A:'bGymW'},
 DOORC={bHome:2,bLab:2,bCenter:2,bMart:2,bGymF:3,bGymW:2,bHouse2:3};
function mapKey(M){for(const k in MAPS)if(MAPS[k]===M)return k}
function buildOutdoor(M){const mw=M.rows[0].length,mh=M.rows.length,bio=biomeOf(M),key=mapKey(M),
 at=(x,y)=>M.rows[y<0?0:y>=mh?mh-1:y][x<0?0:x>=mw?mw-1:x],at0=(x,y)=>M.rows[y]?.[x],
 isWt=(x,y)=>WATC.has(at(x,y)),isP=(x,y)=>at(x,y)==='=',isWl=(x,y)=>{const c=at(x,y);return c==='^'||c==='@'},
 C1=mkc(mw*16,mh*16),g=C1.getContext('2d'),put=(k,x,y)=>{const t=TL[k];if(t)g.drawImage(t,x,y)},
 half=(k,x,y,side)=>{const t=TL[k];if(t)g.drawImage(t,side*8,0,8,16,x+side*8,y,8,16)},
 cl=bio==='mont'?'V_':bio==='ruins'?'R_':'C_',floorK=bio==='mont'?'dirt':bio==='ruins'?'stone':bio==='cave'?'cf':'g',grassy=floorK==='g',cliffs=!grassy||M.rows.some(r=>r.includes('^'));
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=M.rows[y][x],ox=x*16,oy=y*16,h=HSH(x*3+1,y*5+2);
  if(WATC.has(c)){put('W0',ox,oy);if(c==='H'){const v=at(x,y-1)==='H'||at(x,y+1)==='H'||at(x-1,y)!=='H'&&at(x+1,y)!=='H'&&(isWt(x-1,y)||isWt(x+1,y));
    if(v){put(at(x,y-1)!=='H'&&!isWt(x,y-1)?'pierV':at(x,y-1)==='H'?'pierV':'pierT',ox,oy);if(at(x,y+1)!=='H'&&isWt(x,y+1))put('pierB',ox,oy)}
    else{put('pierH',ox,oy);if(at(x-1,y)!=='H'&&isWt(x-1,y))put('pierHL',ox,oy);if(at(x+1,y)!=='H'&&isWt(x+1,y))put('pierHR',ox,oy)}}continue}
  if(c==='L'){put('LV0',ox,oy);continue}
  if(c==='^'||c==='@'){put(floorK,ox,oy);if(isWl(x,y+1))put(cl+'in_',ox,oy);
   else{const wl=isWl(x-1,y),wr=isWl(x+1,y);half(cl+(!wl?'faceL':isWl(x-1,y+1)?'endL':'face'),ox,oy,0);half(cl+(!wr?'faceR':isWl(x+1,y+1)?'endR':'face'),ox,oy,1)}continue}
  if(c==='='){put('P_in',ox,oy);continue}
  const base=floorK;
  if(base==='g'){for(let q=0;q<4;q++){const dx=q&1?1:-1,dy=q>>1?1:-1,qx=(q&1)*8,qy=(q>>1)*8;let pc='g';
    for(const[s,f]of[['S',isWt],['P',isP]]){const a=f(x,y+dy),b=f(x+dx,y),d=f(x+dx,y+dy),V=dy<0?'U':'D',Hh=dx<0?'L':'R';
     const k=a&&b?s+'_i'+V+Hh:a?s+'_'+V:b?s+'_'+Hh:d?s+'_n'+V+Hh:null;if(k){pc=k;break}}
    g.drawImage(TL[pc],qx,qy,8,8,ox+qx,oy+qy,8,8)}}
  else put(base==='cf'&&h%11===0?'cf2':base,ox,oy);
  if(cliffs){const wb=isWl(x,y+1),wl=isWl(x-1,y),wr=isWl(x+1,y);
   if(wb&&wl&&!wr)put(cl+'riDL',ox,oy);else if(wb&&wr&&!wl)put(cl+'riDR',ox,oy);else{if(wb)put(cl+'rD',ox,oy);if(wl)put(cl+'rL',ox,oy);if(wr)put(cl+'rR',ox,oy)}
   if(!wb&&!wl&&isWl(x-1,y+1))put(cl+'rcDL',ox,oy);if(!wb&&!wr&&isWl(x+1,y+1))put(cl+'rcDR',ox,oy)}
  if(c===',')put('tg',ox,oy);else if(c==='v')put(grassy?'tg':bio==='mont'?'tgr':'tgv',ox,oy);
  else if(c==='h'){g.fillStyle='#1a1216';g.beginPath();g.ellipse(ox+8,oy+9,6.5,5.5,0,0,7);g.fill();g.fillStyle='#0a0608';g.beginPath();g.ellipse(ox+8,oy+10,5,4,0,0,7);g.fill()}
  else if(c==='E'&&!grassy){g.fillStyle='rgba(255,236,190,.16)';g.fillRect(ox+2,oy+2,12,12)}}
 M.L=up2(C1);
 // arbres : couverture des zones 'T' par des arbres de 2x2 tuiles (3 de haut), du bas vers le haut
 const cov=new Set(),TK=bio==='forest'?['tP1','tP2','tP1','tT1','tP2']:key==='route2'?['tT1','tT2','tT1','tR2']:['tR1','tR2','tP1','tR1','tP2','tR2'];
 for(let y=mh-1;y>=0;y--)for(let x=0;x<mw;x++){if(at0(x,y)!=='T'||cov.has(x+','+y))continue;const two=at0(x+1,y)==='T'&&!cov.has((x+1)+','+y);
  if(two||at0(x-1,y)==='T'){const ax=two?x:x-1,k=TK[HSH(ax*7+1,y*13+3)%TK.length];sprAt(M,T2(k),ax*32,(y+1)*32);for(const[a,b]of[[ax,y],[ax+1,y],[ax,y-1],[ax+1,y-1]])if(at0(a,b)==='T')cov.add(a+','+b)}
  else{sprAt(M,T2(bio==='forest'?'tS1':'tS2'),x*32,(y+1)*32);cov.add(x+','+y)}}
 // décors ponctuels
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=M.rows[y][x],ox=x*32,by=(y+1)*32,h=HSH(x,y);
  if(c==='S'){if(/^(STATUE|STÈLE)/.test(M.signs?.[x+','+y]||''))sprAt(M,T2('stoneStatue'),ox-16,by);else sprAt(M,T2(bio==='plain'?'signW':'signM'),ox,by)}
  else if(c==='l')sprAt(M,T2('lamp'),ox,by);
  else if(c==='o')sprAt(M,T2(bio==='plain'||bio==='forest'?'boulder':bio==='mont'?'rockM':'rockGS'),ox,by);
  else if(c==='b')sprAt(M,T2('tS2'),ox,by);
  else if(c==='k')sprAt(M,T2(bio==='plain'||bio==='forest'?'rockM2':'rockGS'),ox,by);
  else if(c==='x')sprAt(M,AIMG.brazier,ox,by);
  else if(c==='u')sprAt(M,T2('rockS'),ox,by);
  else if(c==='C')sprAt(M,T2(bio==='ruins'?'statue':'stoneStatue'),bio==='ruins'?ox:ox-16,by);
  else if(c==='@')sprAt(M,T2('gate'),ox-48,by);
  else if(c==='^'&&M.doors?.[x+','+y])sprAt(M,T2('caveDoor'),ox,by)}
 // bâtiments : bloc de toit (R B Y G A) + rangée de murs (W n D), alignés sur leur porte
 const seen=new Set();
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=M.rows[y][x];if(!'RBYGA'.includes(c)||seen.has(x+','+y))continue;
  let x1=x,y1=y;while(at0(x1+1,y)===c)x1++;while(at0(x,y1+1)===c)y1++;for(let b=y;b<=y1;b++)for(let a=x;a<=x1;a++)seen.add(a+','+b);
  let wy=y1+1;while('WnD'.includes(at0(x,wy+1)||'?'))wy++;let dx=-1;for(let a=x;a<=x1;a++)if(at0(a,wy)==='D')dx=a;
  const k=BLD[key]?.[c]||BLDDEF[c],im=T2(k);if(!im)continue;const left=dx>=0?(dx-DOORC[k])*32:x*32;sprAt(M,im,left,(wy+1)*32)}}

// ---------------------------------------------------------------- intérieurs
const IST={home:{fl:['flPlank2'],wall:'wallLab',top:'#3a2a26',rug:'b'},lab:{fl:['flLab'],wall:'wallLab',top:'#3b3346',rug:''},gym:{fl:['flStone','flStone2','flStone3','flStone'],wall:'wallGrey',top:'#2a2224',rug:'r'},
 gym2:{fl:['flWater'],wall:'wallMint',top:'#1c2836',rug:'b'},tech:{fl:['flTech','flTech2'],wall:'wallGrey',top:'#110d1a',rug:'b'}};
let VALVE=null;function valveSpr(){return VALVE||(VALVE=mkc(32,44,g=>{const P=(c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};P('#3a4a5a',13,16,6,26);P('#6a7a8a',13,16,2,26);P('#22303e',4,38,24,6);P('#5a6a7a',5,38,22,2);
 g.fillStyle='#1a1a24';g.beginPath();g.arc(16,13,12,0,7);g.fill();g.fillStyle='#c8963a';g.beginPath();g.arc(16,13,10,0,7);g.fill();g.fillStyle='#1a1a24';g.beginPath();g.arc(16,13,7,0,7);g.fill();
 for(let i=0;i<4;i++){g.save();g.translate(16,13);g.rotate(i*Math.PI/4);P('#e8b85a',-1,-9,2,18);g.restore()}P('#ffe0a0',14,11,4,4)}))}
function buildInterior(M){const mw=M.rows[0].length,mh=M.rows.length,st=M.style||(M===MAPS.lab?'lab':M===MAPS.gym?'gym':M===MAPS.gym2?'gym2':'tech'),S=IST[st],
 at=(x,y)=>M.rows[y]?.[x],isW=(x,y)=>{const c=at(x,y);return c===undefined||c==='X'},C1=mkc(mw*16,mh*16),g=C1.getContext('2d'),put=(k,x,y)=>{const t=TL[k];if(t)g.drawImage(t,x,y)},
 rugAt=(x,y)=>at(x,y)==='r';
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=at(x,y),ox=x*16,oy=y*16,h=HSH(x*7+3,y*11+5);
  if(isW(x,y)){if(!isW(x,y+1)&&at(x,y+1)!=='E'||at(x,y+1)==='E'&&y===0){put(S.wall,ox,oy)}else{g.fillStyle=S.top;g.fillRect(ox,oy,16,16);g.fillStyle='rgba(255,255,255,.06)';if(!isW(x+1,y))g.fillRect(ox+15,oy,1,16);if(!isW(x-1,y))g.fillRect(ox,oy,1,16);if(!isW(x,y+1))g.fillRect(ox,oy+15,16,1)}continue}
  put(st==='tech'?S.fl[x%4===1&&y%3===1?1:0]:S.fl[h%S.fl.length],ox,oy);
  if(c==='r'){const p=S.rug==='b'?'bug':S.rug==='r'?'rrug':'rug',u=rugAt(x,y-1),d=rugAt(x,y+1),l=rugAt(x-1,y),r=rugAt(x+1,y);
   put(p+(!u?(!l?'UL':!r?'UR':'U'):!d?(!l?'DL':!r?'DR':'D'):!l?'L':!r?'R':'C'),ox,oy)}
  else if(c==='~'||c==='w'||c==='H'){put('W0',ox,oy);if(c==='H')put(WATC.has(at(x-1,y)||'')||WATC.has(at(x+1,y)||'')?'pierV':'pierH',ox,oy);else if(!WATC.has(at(x,y-1)||'X')){g.fillStyle='rgba(10,20,40,.45)';g.fillRect(ox,oy,16,3)}}
  else if(c==='E'){g.fillStyle='#5a1e26';g.fillRect(ox+1,oy+3,14,11);g.fillStyle='#8a2e36';g.fillRect(ox+2,oy+4,12,9);g.fillStyle='#c8a050';g.fillRect(ox+2,oy+4,12,1);g.fillRect(ox+2,oy+12,12,1)}
  else if(c==='h'){g.fillStyle='#0a060c';g.fillRect(ox+1,oy+1,14,14);g.fillStyle='#22181e';g.fillRect(ox+1,oy+1,14,3)}
  if(isW(x,y-1)&&!isW(x,y)){g.fillStyle='rgba(16,10,24,.22)';g.fillRect(ox,oy,16,2)}}
 // décor du mur nord : affiches / fenêtres selon la salle
 for(let x=1;x<mw-1;x++)if(isW(x,0)&&!isW(x,1)&&at(x,1)!=='C'&&HSH(x,mw)%4===0&&st==='lab')put('poster',x*16,2);
 for(const d of M.wdeco||[]){const im=TL[d.k]||PROC(d.k);if(im)g.drawImage(im,d.x*16+(d.dx||0),d.y??1)}
 M.L=up2(C1);
 const cov=new Set();for(const o of M.furn||[]){const w=o.w||1,h=o.h||1;for(let b=o.y;b<o.y+h;b++)for(let a=o.x;a<o.x+w;a++)cov.add(a+','+b);const im=T2(o.k)||PROC2(o.k),by=(o.y+h)*32+(o.dy||0);if(im)(M.S[o.row??Math.max(0,(by-1)>>5)]||=[]).push({img:im,x:o.x*32+(o.dx||0),y:by-im.height,by:by+(o.z||0)})}
 const runs=[];for(let y=0;y<mh;y++){let x=0;while(x<mw){if(at(x,y)==='C'&&!cov.has(x+','+y)){let x2=x;while(at(x2+1,y)==='C'&&!cov.has((x2+1)+','+y))x2++;runs.push([x,x2,y]);x=x2+1}else x++}}
 for(const[x0,x1,y]of runs){const cs=M.cstyle,by=(y+1)*32;
  for(let x=x0;x<=x1;x++){const ox=x*32,i=x-x0;
   if(cs==='statue')sprAt(M,T2('statue'),ox,by);
   else if(cs==='valve')sprAt(M,valveSpr(),ox,by);
   else if(cs==='tech')sprAt(M,T2(['machine','pc','machine2','pc2'][(x+y)%4]),ox,by);
   else if(isW(x0,y-1))sprAt(M,T2(i%3===1?'pc':'shelf'+((x*3+y)%4)),ox,by);
   else sprAt(M,T2(x0===x1?'counterM':i===0?'counterL':x===x1?'counterR':'counterM'),ox,by)}}
 if(st==='lab'){sprAt(M,T2('plant'),32,7*32);sprAt(M,T2('plant'),(mw-2)*32,7*32)}}

// ---------------------------------------------------------------- petits objets dessinés à la main (maison du héros)
const PROCC={};function PROC(k){if(PROCC[k])return PROCC[k];const P=(g,c,x,y,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};let c=null;
 if(k==='window')c=mkc(16,13,g=>{P(g,'#6a4a32',0,0,16,13);P(g,'#9ad6f4',2,2,12,9);P(g,'#c8ecff',2,2,12,3);P(g,'#ffffff',3,3,3,1);P(g,'#6a4a32',7,2,2,9);P(g,'#6a4a32',2,6,12,1);P(g,'#e8d0a0',0,11,16,2)});
 else if(k==='windowN')c=mkc(16,13,g=>{P(g,'#6a4a32',0,0,16,13);P(g,'#1e2450',2,2,12,9);P(g,'#ffffff',4,4,1,1);P(g,'#ffe890',11,3,1,1);P(g,'#ffffff',9,8,1,1);P(g,'#6a4a32',7,2,2,9);P(g,'#6a4a32',2,6,12,1);P(g,'#e8d0a0',0,11,16,2)});
 else if(k==='calendar')c=mkc(10,12,g=>{P(g,'#f4ead2',0,1,10,11);P(g,'#c83a3a',0,1,10,3);P(g,'#3a2a2a',2,0,1,2);P(g,'#3a2a2a',7,0,1,2);for(let i=0;i<3;i++)for(let j=0;j<4;j++)P(g,'#a89a88',1+j*2,5+i*2,1,1);g.strokeStyle='#e8484f';g.strokeRect(4.5,6.5,3,3)});
 else if(k==='poster2')c=mkc(12,13,g=>{P(g,'#3a2a2a',0,0,12,13);P(g,'#f07a3a',1,1,10,11);P(g,'#ffd88a',3,3,6,6);P(g,'#d8482a',5,4,2,4);P(g,'#ffffff',1,10,10,2)});
 return PROCC[k]=c}
function PROC2(k){const key='2'+k;if(PROCC[key])return PROCC[key];const P=(g,c,x,y,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};let c=null;
 if(k==='telescope')c=mkc(32,48,g=>{P(g,'#3a2a22',8,30,2,16);P(g,'#3a2a22',22,30,2,16);P(g,'#4a3a2a',15,28,2,18);P(g,'#5a4030',6,44,20,2);g.save();g.translate(16,24);g.rotate(-.55);P(g,'#2a1c18',-14,-5,28,10);P(g,'#c8963a',-13,-4,26,8);P(g,'#f2c66a',-13,-4,26,2);P(g,'#8a5a22',6,-5,3,10);P(g,'#1a1418',12,-4,3,8);g.restore()});
 else if(k==='coat')c=mkc(32,64,g=>{P(g,'#4a3022',15,14,3,46);P(g,'#2e1e16',9,58,15,4);P(g,'#6a4a32',10,14,13,2);P(g,'#3a4a6a',9,18,15,26);P(g,'#4a5c80',10,18,4,26);P(g,'#2a3650',20,18,3,26);P(g,'#c8a050',15,24,2,2);P(g,'#c8a050',15,32,2,2);P(g,'#8a3a2a',8,12,6,4);P(g,'#a84a34',9,12,4,2)});
 else if(k==='cake')c=mkc(32,32,g=>{P(g,'#e8e0d0',6,20,20,6);P(g,'#f6c0d0',8,14,16,7);P(g,'#ffe8f0',8,14,16,2);P(g,'#e8484f',11,16,2,2);P(g,'#e8484f',19,16,2,2);for(const x of[11,15,19]){P(g,'#8ac8f0',x,8,2,6);P(g,'#ffd23a',x,5,2,3);P(g,'#ffffff',x,5,1,1)}});
 else if(k==='letter')c=mkc(32,32,g=>{P(g,'#f4ead2',8,18,16,10);P(g,'#d8ccb4',8,18,16,1);P(g,'#c83a3a',14,22,4,3);g.strokeStyle='#b8ac94';g.beginPath();g.moveTo(8,18);g.lineTo(16,24);g.lineTo(24,18);g.stroke()});
 else if(k==='box')c=mkc(32,32,g=>{P(g,'#7a5434',4,10,24,20);P(g,'#a8784a',5,11,22,6);P(g,'#c89a62',5,11,22,2);P(g,'#5a3a24',4,17,24,1);P(g,'#e8d0a0',13,10,6,20)});
 return PROCC[key]=c}
// ---------------------------------------------------------------- animations au sol (eau, lave, fleurs, flammes, barrière)
function animTiles(M,cx,cy,t){const mh=M.rows.length,mw=M.rows[0].length,x0=Math.max(0,cx>>5),y0=Math.max(0,cy>>5),x1=Math.min(mw-1,(cx+W)>>5),y1=Math.min(mh-1,(cy+H)>>5),
 wf=T2('W'+((t/200|0)%3)),lf=T2('LV'+((t/150|0)%3)),ff=(t/250|0)%5,at=(x,y)=>M.rows[y]?.[x];
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const ch=M.rows[y][x],sx=x*32-cx,sy=y*32-cy,h=HSH(x,y);
  if(ch==='~'||ch==='w'){X.drawImage(wf,sx,sy);if(ch==='w'){X.globalAlpha=.22;R(X,'#0a1a40',sx,sy,32,32);X.globalAlpha=1}
   if(at(x+1,y)==='H')X.drawImage(T2('pierEL'),sx,sy);if(at(x-1,y)==='H')X.drawImage(T2('pierER'),sx,sy);if(at(x,y+1)==='H'&&at(x,y+2)!=='H'&&at(x+1,y+1)==='H')X.drawImage(T2('pierEU'),sx,sy);if(at(x,y-1)==='H'&&at(x+1,y-1)==='H')X.drawImage(T2('pierED'),sx,sy)
   if(isInt(M)&&!WATC.has(at(x,y-1)||'X'))R(X,'rgba(10,20,40,.4)',sx,sy,32,6)}
  else if(ch==='L'){X.drawImage(lf,sx,sy);const e=(dx,dy)=>at(x+dx,y+dy)!=='L';
   if(e(0,-1)){R(X,'#4a1c12',sx,sy,32,4);R(X,'#8a3418',sx,sy+4,32,2)}if(e(0,1)){R(X,'#4a1c12',sx,sy+28,32,4);R(X,'#8a3418',sx,sy+26,32,2)}
   if(e(-1,0)){R(X,'#4a1c12',sx,sy,4,32);R(X,'#8a3418',sx+4,sy,2,32)}if(e(1,0)){R(X,'#4a1c12',sx+28,sy,4,32);R(X,'#8a3418',sx+26,sy,2,32)}}
  else if(ch==='f')X.drawImage(T2(`fl${HSH(x*3+1,y*5+2)%7}_${ff}`),sx,sy);
  else if(ch==='x'){for(let i=0;i<3;i++){const fh=8+((t/90+i*3+h)%5|0)*2,fx=sx+10+i*5;R(X,'#ff5a1e',fx-1,sy+12-fh,5,fh);R(X,'#ff9a2a',fx,sy+14-fh,3,fh-3);R(X,'#ffe27a',fx+1,sy+8,1,3)}}
  else if(ch==='Z'){X.globalAlpha=.55+.25*Math.sin(t/110+x*1.7);for(let i=0;i<4;i++)R(X,i%2?'#e84aff':'#9a5ad0',sx+2+i*8,sy,4,32);R(X,'#ffffff',sx+((t/40+x*13)%28|0),sy+((t/70+x*7)%30|0),4,2);X.globalAlpha=1}}}
// Herbes hautes devant les pieds d'un personnage (moitié basse de la tuile d'herbe haute)
const FRONT={};function frontGrass(bio,f){const k=bio+f;if(FRONT[k])return FRONT[k];const src=TL[bio==='mont'?'tgr':bio==='cave'||bio==='ruins'?'tgv':'tg'];
 return FRONT[k]=mkc(32,18,g=>{if(src)g.drawImage(src,0,7,16,9,0,0,32,18)})}
