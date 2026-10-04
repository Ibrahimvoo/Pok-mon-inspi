// =====================================================================
// MONDE EN PLEINE RÉSOLUTION — sol organique peint au pixel, décors de l'atelier, architecture, rangées triées.
// Lumière unique haut-gauche : tout projette son ombre vers le bas-droite, comme les illustrations de l'atelier.
// =====================================================================
const AIMG={},PEO={};// illustrations décodées : décors AIMG[nom], personnages PEO[clé] = {ow:[12 vues], bt, vs, pt:[2]}
const imgOf=b=>new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/png;base64,'+b});
const cut=(im,x,y,w,h)=>mkc(w,h,g=>g.drawImage(im,x,y,w,h,0,0,w,h));
const ARTREADY=(async()=>{const P=ART.props;if(P){const im=await imgOf(P.img);if(im)for(const[k,[x,y,w,h]]of Object.entries(P.map))AIMG[k]=cut(im,x,y,w,h)}
 const Q=ART.people;if(Q){const[ow,bt,vs,pt]=await Promise.all([Q.ow,Q.bt,Q.vs,Q.pt].map(o=>imgOf(o.img)));Q.keys.forEach((k,i)=>{PEO[k]={ow:[...Array(12)].map((_,j)=>cut(ow,j*32,i*48,32,48)),bt:cut(bt,(i%8)*64,(i/8|0)*96,64,96),vs:cut(vs,(i%8)*96,(i/8|0)*144,96,144),pt:[0,1].map(j=>{const n=i*2+j;return cut(pt,(n%8)*72,(n/8|0)*72,72,72)})}})}})();
const rgb=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>(v+.5)/16);
const hq=(x,y,s=0)=>HSH(x+s*7919,y-s*104729)/4294967296;
function vnz(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),a=hq(xi,yi,s),b=hq(xi+1,yi,s),c=hq(xi,yi+1,s),d=hq(xi+1,yi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
// Distance euclidienne (profondeur de l'eau, falaises)
function edt2(mask,w,h){const BIG=1e9,n=Math.max(w,h),f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1),g=new Float64Array(w*h);
 const dt=(len)=>{let k=0;v[0]=0;z[0]=-BIG;z[1]=BIG;for(let q=1;q<len;q++){let s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}k++;v[k]=q;z[k]=s;z[k+1]=BIG}k=0;for(let q=0;q<len;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]]}};
 for(let i=0;i<w*h;i++)g[i]=mask[i]?BIG:0;for(let x=0;x<w;x++){for(let y=0;y<h;y++)f[y]=g[y*w+x];dt(h);for(let y=0;y<h;y++)g[y*w+x]=d[y]}
 const o=new Float32Array(w*h);for(let y=0;y<h;y++){for(let x=0;x<w;x++)f[x]=g[y*w+x];dt(w);for(let x=0;x<w;x++)o[y*w+x]=Math.sqrt(d[x])}return o}
// Palettes par biome (du plus sombre au plus clair) — mêmes familles de teintes que l'atelier
const BIOME={
 plain:{g:['#3c7e3a','#4d9244','#5ea54b','#6db353','#86c45d'],tuft:['#437f3a','#7cbd56','#a6d66c'],path:['#8a6a46','#a8875a','#c2a06c','#d6b882','#e8cf9c'],tall:['#1f4f2a','#2b6631','#3a7f3a','#55a145','#7cc25a','#a6dc74'],gnd:['#6e665c','#8a8070','#a29886','#bab09c'],edge:'#4e7a34',
  rock:['#6a6458','#847c6e','#9e9484','#b8ae9c','#d0c6b2'],face:['#4a443e','#5c554c','#706858','#867e6c','#9c9482'],lip:'#ddd4c0'},
 forest:{g:['#264f2e','#2f6034','#3a6f3b','#467e42','#5a9450'],tuft:['#2a5a30','#5e9a4e','#86b862'],path:['#6e5238','#8a6a48','#a4835a','#ba9a6c','#ccb084'],tall:['#16391f','#1f4c27','#2b6030','#3f7c3c','#5c9c4e','#84bc66'],gnd:['#5e5850','#787064','#908878','#a8a08e'],edge:'#3a6230',
  rock:['#3e4a40','#4e5a4c','#5e6a58','#707c66','#849076'],face:['#2a322c','#363e36','#444c42','#545c50','#666e60'],lip:'#8a9a70'},
 mont:{g:['#3e302e','#4e3e3a','#614e48','#766058','#8c7468'],tuft:['#5a4038','#9a5a3a','#c8784a'],path:['#5a463e','#6e5a50','#846e62','#9a8476','#b09a8a'],tall:['#3a1712','#5e2618','#8a3a22','#b8542c','#de7a3e','#f4a868'],gnd:['#4a3a36','#5e4a44','#745e56','#8a7468'],
  rock:['#231a1e','#30262a','#3e3236','#4e4044','#62525a'],face:['#1a1216','#261c20','#33282c','#433638','#56484a'],lip:'#7a6a6a'},
 cave:{g:['#221e30','#2a253a','#332d46','#3d3752','#48425f'],tuft:['#2e2a40','#4e4a68','#6a6688'],path:['#2e2a3e','#3a3550','#46405e','#524c6c','#5e587a'],tall:['#1a2030','#22303e','#2c4248','#3a5a58','#4c766a','#6a9a84'],gnd:['#2a2638','#343046','#3e3a52','#4a4660'],
  rock:['#100c18','#171222','#1f1a2e','#29233a','#342e48'],face:['#0c0912','#130f1c','#1b1626','#241e32','#2e2840'],lip:'#4a4466'},
 ruins:{g:['#2e2630','#382e3a','#443846','#504352','#5e5060'],tuft:['#3a3040','#5a4c5e','#7a6a7c'],path:['#3a3040','#463a4a','#544656','#625464','#706272'],tall:['#2a2232','#3a2e3e','#4a3c4c','#5e4c5c','#7a6474','#9a8494'],gnd:['#383042','#443a4e','#50465a','#5e5468'],
  rock:['#16101a','#1e1624','#281e2e','#32283a','#3e3448'],face:['#110c14','#18121c','#211826','#2a2030','#352a3c'],lip:'#6a5a70'}};
const WAT={edge:'#b4ecf2',sh:'#7ad2e4',mid:'#4cb0dc',deep:'#378ccc',dd:'#2b6fb4',foam:'#f2fdff',bank:['#3a2a1e','#4e3a28','#644a32','#7a5c3e'],lip:'#88a850'};
const LAV=['#5a1a10','#8a2412','#c23c18','#ec5a22','#ff8c2c','#ffc04a','#ffe88a'];
function biomeOf(M){return M===MAPS.ruines?'ruins':M.cave?'cave':M.amb==='mont'?'mont':M.amb==='foret'?'forest':'plain'}
// ---------------------------------------------------------------- sol
function synthGround(M){const mw=M.rows[0].length,mh=M.rows.length,PW=mw*32,PH=mh*32,at=(x,y)=>M.rows[y<0?0:y>=mh?mh-1:y][x<0?0:x>=mw?mw-1:x];
 const bio=biomeOf(M),P=BIOME[bio],cv=mkc(PW,PH),g=cv.getContext('2d'),img=g.createImageData(PW,PH),D=img.data,N=PW*PH;
 const C=k=>P[k].map(rgb),GR=C('g'),PA=C('path'),TA=C('tall'),GN=C('gnd'),TU=C('tuft');
 const grid=pred=>{const a=new Float32Array(mw*mh);let any=0;for(let y=0;y<mh;y++)for(let x=0;x<mw;x++)if(pred(at(x,y),x,y)){a[y*mw+x]=1;any=1}return any?a:null};
 const baseG=M.under==='g';
 const gP=grid(c=>c==='='),gW=grid(c=>'~wHJQ'.includes(c)),gT=grid(c=>c===','||c==='v'),gR=grid(c=>c==='^'||c==='@'),gL=grid(c=>c==='L'),gG=baseG?null:grid(c=>c==='g'||c==='k'),gDeep=grid(c=>c==='w');
 // bruit basse fréquence échantillonné tous les 4 px puis interpolé (rapide sur mobile)
 const NW=(PW>>2)+2,NH=(PH>>2)+2,NL=new Float32Array(NW*NH);for(let j=0;j<NH;j++)for(let i=0;i<NW;i++){const x=i*4,y=j*4;NL[j*NW+i]=vnz(x/46,y/46,3)*.6+vnz(x/15,y/15,5)*.3+vnz(x/6,y/6,9)*.1}
 const nz=(x,y)=>{const u=x/4,v=y/4,i=u|0,j=v|0,fu=u-i,fv=v-j,a=NL[j*NW+i],b=NL[j*NW+i+1],c=NL[(j+1)*NW+i],d=NL[(j+1)*NW+i+1];return a+(b-a)*fu+(c-a)*fv+(a-b-c+d)*fu*fv};
 const fld=(G0,px,py)=>{if(!G0)return 0;const u=(px+.5)/32-.5,v=(py+.5)/32-.5;let i=Math.floor(u),j=Math.floor(v);const fu=u-i,fv=v-j,cx=q=>q<0?0:q>=mw?mw-1:q,cy=q=>q<0?0:q>=mh?mh-1:q,x0=cx(i),x1=cx(i+1),y0=cy(j),y1=cy(j+1);
  return(G0[y0*mw+x0]*(1-fu)+G0[y0*mw+x1]*fu)*(1-fv)+(G0[y1*mw+x0]*(1-fu)+G0[y1*mw+x1]*fu)*fv};
 const mP=new Uint8Array(N),mW=new Uint8Array(N),mT=new Uint8Array(N),mR=new Uint8Array(N),mL=new Uint8Array(N),mG=new Uint8Array(N),fP=new Float32Array(N);
 // proximité d'un terrain (évite de calculer les champs inutilement)
 const near=G0=>{if(!G0)return null;const a=new Uint8Array(mw*mh);for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){let s=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const xx=Math.min(mw-1,Math.max(0,x+i)),yy=Math.min(mh-1,Math.max(0,y+j));s+=G0[yy*mw+xx]}a[y*mw+x]=s>0}return a};
 const nP=near(gP),nW=near(gW),nT=near(gT),nR=near(gR),nL=near(gL),nG=near(gG);
 for(let py=0;py<PH;py++){const ty=py>>5;for(let px=0;px<PW;px++){const tx=px>>5,t=ty*mw+tx,k=py*PW+px,n=nz(px,py),e=n-.5;
   if(nP&&nP[t]){const f=fld(gP,px,py)+e*.3;fP[k]=f;mP[k]=f>.5}
   if(nW&&nW[t])mW[k]=fld(gW,px,py)+e*.26>.5;
   if(nT&&nT[t])mT[k]=fld(gT,px,py)+e*.34+(vnz(px/5,py/5,21)-.5)*.12>.52;
   if(nR&&nR[t])mR[k]=fld(gR,px,py)+e*.3>.56;
   if(nL&&nL[t])mL[k]=fld(gL,px,py)+e*.28>.52;
   if(nG&&nG[t])mG[k]=fld(gG,px,py)+e*.34>.5}}
 const put=(k,c)=>{const i=k*4;D[i]=c[0];D[i+1]=c[1];D[i+2]=c[2];D[i+3]=255};
 const dk=(k,f)=>{const i=k*4;D[i]*=f;D[i+1]*=f;D[i+2]*=f};
 const tint=(k,c,a)=>{const i=k*4;D[i]+=(c[0]-D[i])*a;D[i+1]+=(c[1]-D[i+1])*a;D[i+2]+=(c[2]-D[i+2])*a};
 // 1. sol de base : un ton dominant, grandes plages très douces, quelques marques fines
 for(let py=0;py<PH;py++)for(let px=0;px<PW;px++){const k=py*PW+px,b=BAY[(py&3)*4+(px&3)],n=nz(px,py),h=hq(px,py,1),pal=baseG?GN:GR;
  const v=n+(b-.5)*.09;let li=v>.67?3:v<.26?1:2;if(h<.022)li=Math.max(0,li-1);else if(h>.992)li=Math.min(pal.length-1,li+1);
  if(mG[k]){const v2=vnz(px/7,py/7,13)*.8+(b-.5)*.25+.1;put(k,GN[v2<.35?0:v2<.55?1:v2<.75?2:3])}else put(k,pal[li])}
 if(bio==='forest')for(let i=0;i<N/90;i++){const h=HSH(i,77),x=(h>>>2)%PW,y=(h>>>13)%PH,k=y*PW+x,c=[[150,92,46],[184,120,58],[110,70,40],[96,130,60]][(h>>>5)%4];if(!mP[k]&&!mW[k]){put(k,c);if(x+1<PW&&(h&1))put(k+1,c)}}
 // 2. chemins : terre battue, liseré sombre, cailloux éclairés
 for(let k=0;k<N;k++)if(mP[k]){const px=k%PW,py=k/PW|0,b=BAY[(py&3)*4+(px&3)],v=vnz(px/13,py/13,17)*.8+vnz(px/4,py/4,19)*.2+(b-.5)*.14,h=hq(px,py,4);let li=v<.2?1:v<.7?2:3;if(h>.988)li=4;else if(h<.03)li=1;
  const f=fP[k];if(f<.53)li=0;else if(f<.56&&li>1)li=1;put(k,PA[li])}
 // 3. eau : profondeur, berge en 3/4 au nord, bord clair au sud
 if(nW){const dist=edt2(mW,PW,PH),dp=gDeep;const Wc={e:rgb(WAT.edge),s:rgb(WAT.sh),m:rgb(WAT.mid),d:rgb(WAT.deep),dd:rgb(WAT.dd)},BK=WAT.bank.map(rgb),LIP=rgb(WAT.lip);
  for(let k=0;k<N;k++)if(mW[k]){const px=k%PW,py=k/PW|0,b=BAY[(py&3)*4+(px&3)],d=dist[k]+(b-.5)*2.2+(vnz(px/11,py/11,23)-.5)*5,deep=dp&&dp[(py>>5)*mw+(px>>5)];
   put(k,deep?(d<6?Wc.d:Wc.dd):d<2.2?Wc.e:d<7?Wc.s:d<15?Wc.m:d<26?Wc.d:Wc.dd)}
  // berge : terre visible sous la rive nord (vue de 3/4)
  for(let px=0;px<PW;px++){let run=99;for(let py=0;py<PH;py++){const k=py*PW+px;if(!mW[k]){run=0;continue}run++;if(py-run<0)continue;
    const bh=5+((HSH(px>>2,7)>>>3)%2);if(run<=bh){const r=run-1;if(r===0)put(k,LIP);else put(k,BK[Math.min(3,bh-r)]);if(r===bh-1)put(k,BK[0])}else if(run<=bh+2)tint(k,[20,40,80],.25)}}
  // bord sud : liseré de sable mouillé côté terre
  for(let k=PW;k<N;k++)if(!mW[k]&&mW[k-PW]&&!mR[k]){put(k,[198,180,132]);if(k+PW<N&&!mW[k+PW])tint(k+PW,[150,130,90],.5)}}
 // 4. lave : croûte sombre en plaques, fissures incandescentes, halo chaud alentour
 if(nL){const LV=LAV.map(rgb),dist=edt2(mL,PW,PH);for(let k=0;k<N;k++){const px=k%PW,py=k/PW|0;if(mL[k]){const c=vnz(px/8,py/8,31),cr=Math.abs(vnz(px/5,py/5,37)-.5)<.06,d=dist[k];let li=c>.62?1:c>.55?2:d<2?2:4;if(cr&&c>.5)li=5;if(c<.3)li=5;if(d<1.5)li=0;put(k,LV[li])}}
  const outD=edt2(mL.map(v=>v?0:1),PW,PH);for(let k=0;k<N;k++)if(!mL[k]&&outD[k]<9)tint(k,[255,120,40],.32*(1-outD[k]/9))}
 // 5. falaises : dessus rugueux, face verticale striée au sud, ombre au pied
 if(nR){const RK=P.rock?P.rock.map(rgb):GN,FC=P.face?P.face.map(rgb):GN,LIP=rgb(P.lip||'#7a6a6a'),FH=M.cave?22:20;
  const below=new Int16Array(N);for(let px=0;px<PW;px++){let run=0;for(let py=PH-1;py>=0;py--){const k=py*PW+px;if(mR[k]){run=py===PH-1?99:run+1;below[k]=run}else run=0}}
  const din=edt2(mR,PW,PH);
  for(let k=0;k<N;k++)if(mR[k]){const px=k%PW,py=k/PW|0,b=BAY[(py&3)*4+(px&3)],r=below[k];
   if(r<=FH){const fy=FH-r,col=(HSH(px>>2,(py>>3)+(px>>4))>>>5)%9,st=((py+((HSH(px>>3,1)>>>4)%3))%7===0),v=.25+(fy/FH)*.5+(b-.5)*.2+(col===0?.25:0)-(st?.18:0)+(vnz(px/4,py/9,41)-.5)*.3;
    let li=v<.3?0:v<.48?1:v<.66?2:v<.82?3:4;if(r===FH)li=4;if(r<=2)li=0;put(k,FC[li])}
   else{const v=vnz(px/10,py/10,43)*.6+vnz(px/4,py/4,47)*.4+(b-.5)*.2,lit=din[k]<3?1:0;let li=v<.35?0:v<.55?1:v<.72?2:3;
    if(din[k]<2.5){const up=py>0&&!mR[k-PW],lf=px>0&&!mR[k-1];li=up||lf?4:0}put(k,RK[Math.min(4,li)])}}
  for(let k=0;k<N;k++)if(mR[k]&&below[k]===FH+1)put(k,LIP);
  for(let k=0;k<N;k++)if(!mR[k]){const py=k/PW|0;for(let j=1;j<=5;j++){if(py-j<0)break;if(mR[k-j*PW]){dk(k,.62+j*.06);break}}}}
 // 6. hautes herbes : brins serrés en quinconce, pointes claires
 if(nT){const vv=bio==='mont'||bio==='cave'||bio==='ruins';for(let k=0;k<N;k++)if(mT[k]){put(k,TA[1])}
  for(let py=2;py<PH+6;py+=3)for(let px=((py/3|0)%2)*2;px<PW;px+=4){const jx=px+((HSH(px,py)>>>3)%3)-1,k=Math.min(PH-1,py)*PW+Math.min(PW-1,Math.max(0,jx));if(!mT[k])continue;
   const hgt=5+((HSH(jx,py)>>>7)%4),lean=((HSH(jx,py)>>>11)%3)-1,shade=vnz(jx/14,py/14,51);
   for(let i=0;i<hgt;i++){const y=py-i,x=jx+(i>hgt-3?lean:0);if(y<0||x<0||x>=PW)continue;const q=y*PW+x;const li=i===hgt-1?5:i>=hgt-2?4:i>=hgt-4?3:2;put(q,TA[Math.max(1,li-(shade<.35?1:0))]);if(i<hgt-1&&x+1<PW)put(q+1,TA[i<2?0:1])}}}
 // 7. touffes d'herbe (petits « v » de brins), plus serrées le long des chemins
 if(!baseG||bio!=='plain'){const T0=TU[0],T1=TU[1],T2=TU[2];
  for(let cy=0;cy<PH;cy+=6)for(let cx=0;cx<PW;cx+=6){const h=HSH(cx*3+1,cy*5+2),x=cx+(h>>>4)%5,y=cy+(h>>>8)%5;if(x>=PW-3||y>=PH-2||y<3)continue;const k=y*PW+x,ch=at(x>>5,y>>5);
   if(mP[k]||mW[k]||mT[k]||mR[k]||mL[k]||'RBYGAWnD'.includes(ch))continue;const nearP=fP[k]>.3&&fP[k]<=.5,pr=(h>>>12)%100;
   if(pr<(nearP?70:baseG?8:22)){const big=pr%3===0;put(k+PW,T0);put(k,T1);put(k-PW,T2);put(k+2,T1);put(k+2-PW,T2);if(big){put(k+1+PW,T0);put(k-2+PW,T0);put(k-2,T1)}}}}
 if(nP)for(let cy=0;cy<PH;cy+=9)for(let cx=0;cx<PW;cx+=9){const h=HSH(cx*7+3,cy*3+1),x=cx+(h>>>4)%8,y=cy+(h>>>9)%8;if(x>=PW-3||y>=PH-3)continue;const k=y*PW+x;if(!mP[k]||fP[k]<.6||(h>>>14)%100>30)continue;
  put(k,PA[4]);put(k+1,PA[3]);put(k+PW,PA[3]);put(k+PW+1,PA[1]);put(k+PW*2+1,PA[0]);put(k+PW+2,PA[0])}
 // fleurs ('f') : bouquets de coquelicots, pâquerettes, lavande, boutons d'or (feuilles, tiges, cœur, reflet)
 const FL=[[[200,40,40],[236,76,60],[255,140,110],[60,20,20]],[[220,220,210],[255,252,240],[255,255,255],[246,196,69]],[[110,80,180],[150,118,214],[196,170,240],[90,60,140]],[[214,160,30],[246,206,60],[255,240,150],[180,120,20]]];
 const LEAF=[[46,98,46],[70,132,60],[104,168,80]];
 for(let ty=0;ty<mh;ty++)for(let tx=0;tx<mw;tx++){if(at(tx,ty)!=='f')continue;const h0=HSH(tx,ty);
  for(let c=0;c<3;c++){const hc=HSH(tx*7+c,ty*11+c),bx=tx*32+5+(hc>>>3)%20,by=ty*32+9+(hc>>>9)%17,kind=FL[(h0+c*(h0>>>7&1))%4];
   for(let j=0;j<5;j++){const hj=HSH(bx+j,by-j),x=bx+((hj>>>3)%9)-4,y=by+((hj>>>7)%7)-3;if(x<2||y<3||x>=PW-3||y>=PH-4)continue;const k=y*PW+x;
    put(k+PW,LEAF[1]);put(k+PW*2,LEAF[0]);put(k+PW-1,LEAF[2]);put(k+PW+1,LEAF[0]);
    if(kind===FL[2]){put(k,kind[1]);put(k-PW,kind[2]);put(k-PW*2,kind[1]);put(k+1,kind[0])}
    else{put(k,kind[1]);put(k-1,kind[1]);put(k+1,kind[0]);put(k-PW,kind[2]);put(k+PW,kind[0]);if(kind[3])put(k,kind===FL[1]?kind[3]:kind[1]);put(k-PW-1,kind[2])}}}}
 g.putImageData(img,0,0);M.mask={P:mP,W:mW,T:mT,R:mR,L:mL,PW,PH};return cv}
// ---------------------------------------------------------------- décors posés (rangées)
function sprAt(M,img,x,y,shadow,row){const r=row??Math.max(0,(y-1)>>5);(M.S[r]||=[]).push({img,x,y:y-img.height,by:y});if(shadow)M.SH.push(shadow)}
function treeKind(M,x,y){const bio=biomeOf(M),h=HSH(x*7,y*13),at=(a,b)=>M.rows[b]?.[a];const last=y===M.rows.length-1;
 if(bio==='mont')return'dead';if(last)return bio==='forest'?'hedgeP':'hedge'+(h%2);
 if(bio==='forest')return h%7===0?'oak'+(h%3):'pine'+(h%2);
 if(M===MAPS.route2&&[[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,1]].some(([a,b])=>'~H'.includes(at(x+a,y+b)||'')))return'willow';
 const free=at(x,y-1)!=='T';if(free&&h%9===0)return'cypress';if(free&&h%11===1)return'parasol';return'oak'+(h%3)}
function placeProps(M){const mw=M.rows[0].length,mh=M.rows.length,bio=biomeOf(M);M.S=[];M.SH=[];
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=M.rows[y][x],h=HSH(x,y),ox=x*32,oy=y*32;
  if(c==='T'){const k=treeKind(M,x,y),im=AIMG[k];if(!im)continue;const jx=((h>>>3)%7)-3,jy=((h>>>6)%5)-2,hedge=k.startsWith('hedge');
   sprAt(M,im,ox+16-(im.width>>1)+jx,oy+(hedge?30:28)+jy,{x:ox+16+jx+6,y:oy+(hedge?26:24)+jy,rx:hedge?30:k==='cypress'?9:k==='dead'?10:24,ry:hedge?7:k==='cypress'?4:8,a:hedge?.22:.3})}
  else if(c==='o'){const im=AIMG[bio==='mont'?'rockV':bio==='cave'||bio==='ruins'?'rockC':'rock'+(h%2)];sprAt(M,im,ox+16-20,oy+30,{x:ox+20,y:oy+26,rx:16,ry:5,a:.3})}
  else if(c==='b'){sprAt(M,AIMG.bramble,ox-4,oy+31,{x:ox+19,y:oy+27,rx:16,ry:5,a:.3})}
  else if(c==='k'){sprAt(M,AIMG.crack,ox-4,oy+31,{x:ox+19,y:oy+27,rx:16,ry:5,a:.32})}
  else if(c==='S'&&!M.floor){sprAt(M,AIMG.sign,ox,oy+30,{x:ox+20,y:oy+28,rx:12,ry:3,a:.25})}
  else if(c==='l'){sprAt(M,AIMG.lamp,ox+5,oy+30,{x:ox+20,y:oy+28,rx:7,ry:3,a:.28})}
  else if(c==='x'){sprAt(M,AIMG.brazier,ox,oy+30,{x:ox+18,y:oy+28,rx:14,ry:4,a:.3})}}
 buildings(M);
 for(const r of M.S)if(r)r.sort((a,b)=>a.by-b.by||a.x-b.x)}
// ---------------------------------------------------------------- architecture
// Chaque bâtiment (toit 'R B Y G A' + rangée de murs 'W n D') est composé d'une pièce : soubassement de pierre,
// murs texturés, fenêtres à volets et jardinières, porte encadrée, toit à quatre pans (pan gauche éclairé,
// pan droit dans l'ombre), faîtage, débord de toit qui ombre le mur, cheminée, enseigne. Styles par ville.
const ROOF={R:['#7a2e22','#9e3c2a','#c0533a','#d8704c','#ec9068'],B:['#1e3a6a','#2a5090','#3a6cb4','#5288cc','#78a8e0'],Y:['#7a4e14','#a8701e','#d0962e','#e6b44a','#f6d27a'],G:['#1e5048','#2a6a5c','#3a8672','#56a088','#7cbca2'],A:['#1e4a6a','#2a6690','#3a86b4','#58a2cc','#84c0e0']};
const STYLE={prov:{wall:['#c9a878','#dcbf8e','#ead2a4','#f4e2bc'],sock:['#6e6458','#8a7e70','#a49888'],shut:['#4a7ab8','#6a9ad0'],frame:'#f4ead2',door:['#5a3a22','#7a5030','#9a6a3e']},
 mine:{wall:['#4e4648','#625a5a','#787070','#8e8684'],sock:['#2e282c','#3e3638','#524a4c'],shut:['#8a4a2a','#b0643a'],frame:'#a89e96',door:['#3a2418','#54341f','#6e472a']},
 port:{wall:['#c8ccd4','#dfe2e8','#eef0f4','#fafbfd'],sock:['#5a6a7a','#71808e','#8a98a4'],shut:['#2f6fb0','#4a8ad0'],frame:'#ffffff',door:['#2a3e5a','#3a5478','#4e6c96']}};
function buildings(M){const mw=M.rows[0].length,mh=M.rows.length,at=(x,y)=>M.rows[y]?.[x],seen=new Set(),style=M===MAPS.ville?'mine':M===MAPS.port?'port':'prov';
 for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=at(x,y);if(!ROOF[c]||seen.has(x+','+y))continue;let x1=x,y1=y;while(at(x1+1,y)===c)x1++;while(at(x,y1+1)===c)y1++;
  for(let j=y;j<=y1;j++)for(let i=x;i<=x1;i++)seen.add(i+','+j);const wy=y1+1;if(!'WnD'.includes(at(x,wy)||''))continue;
  const deco=(M.deco||[]).filter(d=>d.x>=x-1&&d.x<=x1+1.5&&d.y>=y-1.5&&d.y<=wy+.5),kind=deco.find(d=>d.k!=='chim')?.k||null,chim=deco.some(d=>d.k==='chim')||(!kind&&c==='R');
  const wall=[...Array(x1-x+1)].map((_,i)=>at(x+i,wy)),img=house({w:x1-x+1,rh:y1-y+1,roof:c,style,wall,kind,chim,seed:x*31+y*7,M});
  sprAt(M,img,x*32-6,(wy+1)*32+2,null,wy);M.SH.push({poly:[[x1*32+32+6,y*32+26],[x1*32+32+16,y*32+40],[x1*32+32+16,(wy+1)*32+8],[x*32+18,(wy+1)*32+8],[x*32+8,(wy+1)*32]],a:.34});
  if(chim)(M.smk??=[]).push([x*32-6+img.chim[0],(wy+1)*32+2-img.height+img.chim[1]])}}
function house(o){const tw=o.w*32,bw=tw+12,WALLH=46,ROOFH=(o.rh+1)*32-WALLH+14,top=22,bh=top+ROOFH+WALLH-10+4,S=STYLE[o.style],RC=ROOF[o.roof],H=(a,b)=>HSH(o.seed+a,b*3+o.seed);
 const cv=mkc(bw,bh),g=cv.getContext('2d'),P=(c,x,y,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
 const wy0=bh-WALLH-4,wy1=bh-4,x0=6,x1=bw-6;// murs entre wy0 et wy1, sol à wy1
 // --- murs
 for(let y=wy0;y<wy1;y++)for(let x=x0;x<x1;x++){const h=H(x,y),v=(h%1000)/1000;let li=2;if(v<.07)li=1;else if(v>.96)li=3;if(y>wy1-14&&((x+y)&1)&&v<.5)li=Math.min(li,1);P(S.wall[li],x,y)}
 if(o.style==='mine'){for(let y=wy0+2;y<wy1-6;y+=6)for(let x=x0+((y/6|0)%2)*5;x<x1;x+=10){P(S.wall[0],x,y,1,5);P(S.wall[0],x,y+5,10,1);P(S.wall[3],x+1,y,8,1)}}
 if(o.style==='prov'){for(let y=wy0;y<wy1-8;y+=7){P(S.wall[1],x0,y,4,6);P(S.wall[3],x0,y,4,1);P(S.wall[1],x1-4,y+3,4,6);P(S.wall[0],x1-4,y+3,1,6)}}
 // soubassement
 for(let x=x0;x<x1;x+=7){const w=Math.min(7,x1-x),hh=6;P(S.sock[1],x,wy1-hh,w,hh);P(S.sock[2],x,wy1-hh,w-1,1);P(S.sock[0],x+w-1,wy1-hh,1,hh);P(S.sock[0],x,wy1-1,w,1)}
 P('rgba(20,14,30,.35)',x0,wy0,x1-x0,5);P('rgba(20,14,30,.18)',x0,wy0+5,x1-x0,3);
 P('rgba(20,14,30,.25)',x1-3,wy0,3,wy1-wy0);
 // --- ouvertures (une par tuile de mur)
 o.wall.forEach((c,i)=>{const cx=x0+i*32+10;
  if(c==='n'){const wx=cx-1,wy=wy0+12;P(S.shut[0],wx-6,wy-1,5,17);P(S.shut[1],wx-6,wy-1,5,1);for(let k=1;k<16;k+=3)P(S.shut[0]==='#4a7ab8'?'#3a64a0':'#00000033',wx-6,wy+k,5,1);
    P(S.shut[0],wx+15,wy-1,5,17);P(S.shut[1],wx+15,wy-1,5,1);for(let k=1;k<16;k+=3)P('#00000033',wx+15,wy+k,5,1);
    P(S.frame,wx-1,wy-2,17,19);P('#2a3a5a',wx,wy-1,15,16);P('#4a76a8',wx+1,wy,13,14);P('#78a8d8',wx+1,wy,13,4);P('#a8d0f0',wx+2,wy+1,4,1);P('#a8d0f0',wx+9,wy+6,3,1);
    P(S.frame,wx+7,wy-1,1,16);P(S.frame,wx,wy+6,15,1);P('#ffffff55',wx+2,wy+9,1,4);
    P('#d8ccb4',wx-2,wy+15,19,2);P('#8a7a64',wx-2,wy+17,19,1);
    if(H(i,5)%3!==0){P('#5a3a22',wx-1,wy+18,17,4);P('#7a5030',wx-1,wy+18,17,1);for(let k=0;k<7;k++){const fx=wx+k*2+1,cc=['#e8484f','#ff7a8a','#f6c445','#ffffff'][(H(i,k)>>>2)%4];P('#3a7a3a',fx,wy+16,2,2);P(cc,fx,wy+14+(k%2),2,2)}}}
  else if(c==='D'){const dx=cx-1,dh=34,dyy=wy1-dh;P('rgba(20,14,30,.3)',dx-3,dyy-3,22,dh+3);P(S.frame,dx-2,dyy-2,20,dh+2);P(S.door[0],dx,dyy,16,dh);P(S.door[1],dx+1,dyy+1,14,dh-1);
    for(let k=dx+3;k<dx+15;k+=4){P(S.door[0],k,dyy+2,1,dh-3);P(S.door[2],k+1,dyy+2,1,dh-3)}P(S.door[0],dx+1,dyy+11,14,1);P('#f6c445',dx+12,dyy+18,2,2);P('#fff0b0',dx+12,dyy+18,1,1);
    P(S.sock[2],dx-4,wy1-2,24,3);P(S.sock[0],dx-4,wy1+1,24,1);
    if(o.kind==='bag'){for(let k=0;k<6;k++){P(k%2?'#ffffff':'#3a6cb4',dx-6+k*5,dyy-9,5,6)}P('#1e3a6a',dx-6,dyy-3,30,1);P('rgba(20,14,30,.3)',dx-6,dyy-2,30,3)}
    if(o.kind==='heal'){P('#ffffff',dx+2,dyy-13,12,10);P('#e8484f',dx+6,dyy-12,4,8);P('#e8484f',dx+4,dyy-10,8,4);P('#7a2e22',dx+2,dyy-4,12,1)}
    if(o.kind==='star'){for(const sx of[dx-6,dx+19]){P('#d8ccb4',sx,dyy-6,3,dh+4);P('#ffffff',sx,dyy-6,1,dh+4);P('#8a7e70',sx+2,dyy-6,1,dh+4)}}}
  else{if(H(i,9)%3===0&&o.style!=='mine'){P('#5a5a6a',cx+6,wy0+8,2,wy1-wy0-10);P('#8a8a9a',cx+6,wy0+8,1,wy1-wy0-10)}
   else if(o.style==='mine'){P('#2e282c',cx+4,wy0+14,8,10);P('#ffb04a',cx+5,wy0+15,6,8);P('#fff0b0',cx+6,wy0+16,2,3);P('#2e282c',cx+7,wy0+10,2,4)}}});
 // --- toit à quatre pans
 const ry0=top,ry1=wy0+4,ins=Math.min(26,(ry1-ry0)*.55,tw*.22),rx0=x0-5,rx1=x1+5,RH=ry1-ry0;
 const lx=y=>rx0+ins*(1-(y-ry0)/RH),rxx=y=>rx1-ins*(1-(y-ry0)/RH);
 for(let y=ry0;y<ry1;y++){const row=((y-ry0)/5)|0,inRow=(y-ry0)%5,L=Math.round(lx(y)),Rr=Math.round(rxx(y)),hl=Math.round(rx0+(ins+4)*(1-(y-ry0)/RH)*.0+ins*(1-(y-ry0)/RH)),
   lhip=Math.round(rx0+(y-ry0)/RH*0+ins),rhip=Math.round(rx1-ins);
  for(let x=rx0;x<rx1;x++){if(x<L-(y-ry0<3?0:0)&&false)continue;const leftHip=x<rx0+ (ins*(y-ry0)/RH),rightHip=x>=rx1-(ins*(y-ry0)/RH);
   const inside=x>=rx0&&x<rx1&&(y-ry0)>=0&&!(x<rx0+ins-(ins*(y-ry0)/RH)-0&&false);
   // silhouette : coins supérieurs chanfreinés
   const ch=ins*(1-(y-ry0)/RH)*.0;
   if(x<rx0+Math.max(0,ins*.6-(y-ry0)*1.2)||x>=rx1-Math.max(0,ins*.6-(y-ry0)*1.2))continue;
   let tone=2;if(leftHip)tone=3;if(rightHip)tone=1;
   const off=o.roof==='B'?(row%2)*4:o.roof==='G'?0:(row%2)*3,u=(x-rx0+off)%(o.roof==='G'?7:o.roof==='B'?8:6);
   if(o.roof==='G'){if(u===0)tone-=1;else if(u===1)tone+=1}else if(o.roof==='B'){if(u===0||inRow===4)tone-=1;if(inRow===0)tone+=1}else{if(u===0)tone-=1;else if(u===1&&inRow<3)tone+=1;if(inRow===4)tone-=1;if(inRow===0&&u>1)tone+=1}
   if((H(x,y)%97)===0)tone-=1;P(RC[Math.max(0,Math.min(4,tone))],x,y)}}
 // arêtiers, faîtage, égout
 for(let y=ry0;y<ry1;y++){const k=(y-ry0)/RH,a=Math.round(rx0+ins*k),b=Math.round(rx1-ins*k)-1;P(RC[4],a,y);P(RC[0],b,y)}
 const rl=Math.round(rx0+ins*.6),rr2=Math.round(rx1-ins*.6);P(RC[0],rl,ry0-1,rr2-rl,1);P(RC[4],rl,ry0,rr2-rl,1);for(let x=rl;x<rr2;x+=4){P(RC[3],x,ry0-2,3,1);P(RC[1],x+3,ry0-1,1,2)}
 P(RC[0],rx0,ry1-1,rx1-rx0,2);P('rgba(255,255,255,.18)',rx0,ry1-3,rx1-rx0,1);
 // cheminée
 let chim=null;if(o.chim){const cx=rx1-ins-16,cy=ry0-8;P('#3a2a2a',cx-1,cy-1,10,20);P('#a8644a',cx,cy,8,18);P('#c8805c',cx,cy,3,18);P('#7a4434',cx+6,cy,2,18);for(let k=cy+3;k<cy+18;k+=4)P('#7a4434',cx,k,8,1);P('#5a4a48',cx-2,cy-3,12,3);P('#7a6a68',cx-2,cy-3,12,1);chim=[cx+4,cy-4]}
 // emblème de toit
 if(o.kind&&o.kind!=='bag'){const mx=Math.round((rx0+rx1)/2),my=Math.round(ry0+RH*.45);g.fillStyle='#2a1e14';g.beginPath();g.arc(mx,my,10,0,7);g.fill();g.fillStyle='#e8c060';g.beginPath();g.arc(mx,my,9,0,7);g.fill();g.fillStyle='#fff6dc';g.beginPath();g.arc(mx,my,7,0,7);g.fill();
  P('#fff0b0',mx-6,my-7,4,1);const ic=ICO[o.kind==='star'?'star':o.kind];if(ic)g.drawImage(ic,mx-6,my-6,12,12)}
 if(o.kind==='potion'){P('#c8ccd4',x1-30,ry0-14,14,8);g.fillStyle='#a8b0bc';g.beginPath();g.arc(x1-23,ry0-14,7,Math.PI,0);g.fill();P('#5a6a7a',x1-24,ry0-24,2,10)}
 cv.chim=chim||[0,0];return cv}
// ---------------------------------------------------------------- construction d'une carte
function buildMap(M){if(M.L)return;if(M.floor||M.amb==='in'||M.amb==='tech'){buildInterior(M);return}M.L=synthGround(M);placeProps(M);const g=M.L.getContext('2d');
 // ombres portées au sol (vers le bas-droite), en une passe multiplicative douce
 g.save();for(const s of M.SH){g.globalAlpha=s.a;g.fillStyle='#1a2440';g.beginPath();if(s.poly){g.moveTo(...s.poly[0]);s.poly.slice(1).forEach(p=>g.lineTo(...p));g.closePath()}else g.ellipse(s.x,s.y,s.rx,s.ry,0,0,7);g.fill()}g.restore();
 bridges(M,g);M.F=null}
function bridges(M,g){const mw=M.rows[0].length,mh=M.rows.length;for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const c=M.rows[y][x];if(!'HJQ'.includes(c)||c!=='H'&&!(M.sw&&M.sw[c]&&M.sw[c]()==='H'))continue;
 const vt='HJQ'.includes(M.rows[y-1]?.[x]||'')||'HJQ'.includes(M.rows[y+1]?.[x]||''),ox=x*32,oy=y*32;g.save();
 if(vt){g.fillStyle='rgba(16,24,48,.35)';g.fillRect(ox+4,oy,26,32);for(let i=0;i<4;i++){const yy=oy+i*8;g.fillStyle='#5a3e26';g.fillRect(ox+3,yy,26,8);g.fillStyle=i%2?'#a87a4a':'#b8884e';g.fillRect(ox+3,yy,26,6);g.fillStyle='#d8a46a';g.fillRect(ox+3,yy,26,1);g.fillStyle='#7a5432';g.fillRect(ox+9+((HSH(x,y+i)>>>3)%10),yy+2,3,1)}
  g.fillStyle='#4a3020';g.fillRect(ox+2,oy,2,32);g.fillRect(ox+28,oy,2,32)}
 else{g.fillStyle='rgba(16,24,48,.35)';g.fillRect(ox,oy+6,32,24);for(let i=0;i<4;i++){const xx=ox+i*8;g.fillStyle='#5a3e26';g.fillRect(xx,oy+4,8,24);g.fillStyle=i%2?'#a87a4a':'#b8884e';g.fillRect(xx,oy+4,6,22);g.fillStyle='#d8a46a';g.fillRect(xx,oy+4,1,22)}
  g.fillStyle='#4a3020';g.fillRect(ox,oy+3,32,2);g.fillRect(ox,oy+26,32,2)}g.restore()}}
// ---------------------------------------------------------------- intérieurs
// Mur nord vu de face (lambris, papier peint, fenêtres, tableaux), murs latéraux vus de dessus, sols texturés,
// mobilier posé en rangées (bibliothèques, table, statues, vannes, consoles) avec ombres vers le bas-droite.
const INT={lab:{floor:['#8a5a34','#a8743e','#c08a50','#d4a064'],wall:['#e8dcc0','#f4ead2'],wain:['#2f5a3e','#3f7a52','#5a9a6a'],top:['#2a1e18','#3e2e24','#5a4434']},
 gym:{floor:['#5e544c','#746a60','#8a8076','#a0968a'],wall:['#4a4044','#5e5456'],wain:['#3a3034','#4e4448','#6a5e60'],top:['#1e1618','#2e2426','#463a3c']},
 gym2:{floor:['#5a7a90','#7094aa','#8aaec2','#a8c8d8'],wall:['#d8e4ec','#eef4f8'],wain:['#2a5a8a','#3a74a8','#5a96c8'],top:['#1a2a3a','#2a3e52','#3e566c']},
 tech:{floor:['#1e1a30','#2a2440','#3a3352','#4a4266'],wall:['#2a2440','#3a3256'],wain:['#1e1a30','#2a2440','#3a3352'],top:['#0e0a18','#18142a','#241e3a']}};
function buildInterior(M){const mw=M.rows[0].length,mh=M.rows.length,PW=mw*32,PH=mh*32,at=(x,y)=>M.rows[y]?.[x],st=M===MAPS.lab?'lab':M===MAPS.gym?'gym':M===MAPS.gym2?'gym2':'tech',I=INT[st];
 M.S=[];M.SH=[];const cv=mkc(PW,PH),g=cv.getContext('2d'),P=(c,x,y,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x,y,w,h)},H=(x,y)=>HSH(x*7+3,y*11+5);
 const isW=(x,y)=>{const c=at(x,y);return c===undefined||c==='X'};
 // sols
 for(let ty=0;ty<mh;ty++)for(let tx=0;tx<mw;tx++){if(isW(tx,ty))continue;const ox=tx*32,oy=ty*32,F=I.floor;
  if(st==='lab'){for(let r=0;r<4;r++){const y=oy+r*8,off=(H(tx,ty+r)>>>3)%24;P(F[2],ox,y,32,8);P(F[3],ox,y,32,1);P(F[1],ox,y+7,32,1);P(F[1],ox+((off+tx*13)%32),y,1,7);for(let k=0;k<4;k++){const h=H(tx*9+k,ty*5+r);P(F[(h>>>5)%3===0?1:2],ox+(h>>>7)%30,y+2+(h>>>11)%4,2+(h>>>13)%4,1)}}}
  else if(st==='gym'||st==='gym2'){for(const[qx,qy]of[[0,0],[16,0],[0,16],[16,16]]){const h=H(tx*2+qx,ty*2+qy),c=F[1+(h>>>4)%2];P(F[0],ox+qx,oy+qy,16,16);P(c,ox+qx,oy+qy,15,15);P(F[3],ox+qx,oy+qy,15,1);P(F[3],ox+qx,oy+qy,1,15);for(let k=0;k<3;k++){const q=HSH(h,k);P(F[(q>>>3)%2],ox+qx+2+(q>>>5)%11,oy+qy+2+(q>>>9)%11,2,1)}if(st==='gym2'&&(h>>>12)%4===0)P('#c8e4f0',ox+qx+3,oy+qy+3,4,1)}}
  else{P(F[1],ox,oy,32,32);P(F[0],ox,oy,32,1);P(F[0],ox,oy,1,32);P(F[2],ox+1,oy+1,30,1);P(F[2],ox+1,oy+1,1,30);P(F[3],ox+15,oy+15,2,2);if((tx+ty)%2===0){P('#2e7a8a',ox+6,oy+15,6,1);P('#5ad0e0',ox+7,oy+15,3,1);P('#2e7a8a',ox+20,oy+15,6,1)}}
  const c=at(tx,ty);
  if(c==='r'){const red=['#7a1c26','#9a2a34','#b8343e','#d24a52'];P(red[2],ox,oy,32,32);for(let k=0;k<32;k+=4)P(red[1],ox,oy+k,32,1);if(at(tx-1,ty)!=='r'){P(red[0],ox,oy,2,32);P('#e8c060',ox+3,oy,1,32)}if(at(tx+1,ty)!=='r'){P(red[0],ox+30,oy,2,32);P('#e8c060',ox+28,oy,1,32)}if(at(tx,ty-1)!=='r'&&!isW(tx,ty-1)){P('#e8c060',ox,oy+2,32,1)}}
  if(c==='E'){P('#3a2418',ox+2,oy+4,28,26);P('#8a2a34',ox+4,oy+6,24,22);P('#e8c060',ox+5,oy+7,22,1);P('#e8c060',ox+5,oy+26,22,1);for(let k=8;k<26;k+=3)P('#6a1c24',ox+5,oy+k,22,1)}
  if(c==='h'){P('#0a060c',ox+3,oy+3,26,26);P('#1a1218',ox+3,oy+3,26,4);P(I.floor[0],ox+2,oy+2,28,1);P('#000000',ox+6,oy+10,20,16)}
  if(c==='u'){P('#6e695f',ox+3,oy+3,26,26);P('#8a8478',ox+4,oy+4,24,9);P('#a8a296',ox+5,oy+4,10,1);P('#5a5550',ox+4,oy+24,24,4)}
  if(c==='~'||c==='w'||(M.sw&&M.sw[c]&&M.sw[c]()==='w')){const deep=c==='w'||M.sw?.[c]?.()==='w';P(deep?'#2a5a98':'#3a7ab8',ox,oy,32,32);for(let k=0;k<5;k++){const h=H(tx*5+k,ty);P(deep?'#3a6aa8':'#5a9ad0',ox+(h>>>3)%26,oy+(h>>>8)%28,4+(h>>>13)%4,1)}
   if(!'~wJQH'.includes(at(tx,ty-1)||'X')){P('#2a3a52',ox,oy,32,5);P('#8ab0c8',ox,oy+5,32,1)}}}
 // murs : face du mur nord (et des cloisons), dessus sombre ailleurs
 for(let ty=0;ty<mh;ty++)for(let tx=0;tx<mw;tx++){if(!isW(tx,ty))continue;const ox=tx*32,oy=ty*32,face=!isW(tx,ty+1)&&at(tx,ty+1)!=='E',T=I.top;
  if(face){const Wc=I.wall,Wn=I.wain;P(Wc[0],ox,oy,32,32);for(let k=0;k<32;k+=8)P(Wc[1],ox+k+2,oy,4,20);P(Wn[1],ox,oy+20,32,12);P(Wn[2],ox,oy+20,32,1);P(Wn[0],ox,oy+31,32,1);for(let k=0;k<32;k+=8)P(Wn[0],ox+k,oy+21,1,10);
   P('rgba(20,14,30,.25)',ox,oy,32,3);
   if(st==='tech'){P('#14303a',ox+4,oy+4,24,12);P('#2e7a8a',ox+4,oy+4,24,1);for(let k=0;k<3;k++)P('#5ad0e0',ox+6,oy+7+k*3,(H(tx,ty+k)>>>4)%16+4,1)}
   const h=H(tx,ty);if(st==='lab'&&tx%3===1&&at(tx,ty+1)==='F'){P('#5a3a22',ox+6,oy+3,20,15);P('#9ad0f0',ox+8,oy+5,16,11);P('#c8ecff',ox+8,oy+5,16,4);P('#ffffff',ox+10,oy+6,4,1);P('#5a3a22',ox+15,oy+5,1,11);P('#5a3a22',ox+8,oy+10,16,1)}
   if(st==='lab'&&tx%3===2&&at(tx,ty+1)==='F'){P('#3a2a1e',ox+5,oy+4,22,14);P('#2a4a3a',ox+6,oy+5,20,12);P('#e8e4d4',ox+8,oy+7,8,1);P('#e8e4d4',ox+8,oy+10,12,1);P('#e8e4d4',ox+8,oy+13,6,1);P('#f6c445',ox+21,oy+8,2,2)}
   if(st==='gym'&&tx%3===0){P('#2e2426',ox+13,oy+6,6,10);P('#ffb04a',ox+14,oy+7,4,5);P('#ffe8a0',ox+15,oy+8,2,2);P('#3e3436',ox+12,oy+15,8,2)}
   if(st==='gym'&&tx%3===1){P('#7a3a1e',ox+8,oy+2,16,18);P('#c86a2a',ox+9,oy+2,14,16);P('#e8a050',ox+9,oy+2,14,1);P('#f6d27a',ox+13,oy+6,6,6);P('#7a3a1e',ox+15,oy+8,2,2);P('#7a3a1e',ox+8,oy+18,8,2);P('#7a3a1e',ox+16,oy+18,8,2)}
   if(st==='gym2'&&tx%2===0){for(let k=0;k<3;k++){P('#3a74a8',ox+4+k*9,oy+8,6,2);P('#5a96c8',ox+6+k*9,oy+6,4,2);P('#8ab8e0',ox+7+k*9,oy+5,2,1)}}}
  else{P(T[1],ox,oy,32,32);P(T[0],ox,oy+28,32,4);for(let k=0;k<2;k++){const h=H(tx*3+k,ty);P(T[2],ox+(h>>>3)%28,oy+(h>>>8)%24,3,1)}
   if(!isW(tx+1,ty)){P(T[2],ox+30,oy,2,32)}if(!isW(tx-1,ty)){P(T[2],ox,oy,2,32)}if(!isW(tx,ty+1)&&at(tx,ty+1)!=='E'){P(T[2],ox,oy+28,32,4)}}}
 // ombre de contact au pied des murs
 for(let ty=1;ty<mh;ty++)for(let tx=0;tx<mw;tx++){if(isW(tx,ty))continue;if(isW(tx,ty-1))P('rgba(16,10,24,.28)',tx*32,ty*32,32,4);if(isW(tx-1,ty))P('rgba(16,10,24,.18)',tx*32,ty*32,3,32)}
 M.L=cv;
 // mobilier
 const runs=[];for(let ty=0;ty<mh;ty++){let tx=0;while(tx<mw){if(at(tx,ty)==='C'){let t2=tx;while(at(t2+1,ty)==='C')t2++;runs.push([tx,t2,ty]);tx=t2+1}else tx++}}
 for(const[x0,x1,ty]of runs){const n=x1-x0+1,cs=M.cstyle;
  if(cs==='statue'){for(let x=x0;x<=x1;x++){const im=furn('statue');sprAt(M,im,x*32,ty*32+31,{x:x*32+19,y:ty*32+28,rx:13,ry:4,a:.3})}continue}
  if(cs==='valve'){const im=furn('valve');sprAt(M,im,x0*32,ty*32+31,{x:x0*32+18,y:ty*32+28,rx:11,ry:3,a:.28});continue}
  if(cs==='tech'){for(let x=x0;x<=x1;x++){const im=furn((x+ty)%3?'console':'server');sprAt(M,im,x*32,ty*32+31,{x:x*32+19,y:ty*32+29,rx:13,ry:3,a:.35})}continue}
  if(isW(x0,ty-1)){for(let x=x0;x<=x1;x++){const im=furn('shelf',x*5+ty);sprAt(M,im,x*32,ty*32+31,null)}continue}
  const im=furn('table',n);sprAt(M,im,x0*32,ty*32+31,{poly:[[x0*32+8,ty*32+30],[x1*32+36,ty*32+30],[x1*32+38,ty*32+35],[x0*32+10,ty*32+35]],a:.3})}
 if(st==='lab'){sprAt(M,furn('plant'),1*32+4,6*32+30,{x:1*32+22,y:6*32+28,rx:9,ry:3,a:.3});sprAt(M,furn('plant'),(mw-2)*32+4,6*32+30,{x:(mw-2)*32+22,y:6*32+28,rx:9,ry:3,a:.3})}
 const g2=M.L.getContext('2d');g2.save();for(const sh of M.SH){g2.globalAlpha=sh.a;g2.fillStyle='#160e24';g2.beginPath();if(sh.poly){g2.moveTo(...sh.poly[0]);sh.poly.slice(1).forEach(p=>g2.lineTo(...p));g2.closePath()}else g2.ellipse(sh.x,sh.y,sh.rx,sh.ry,0,0,7);g2.fill()}g2.restore();
 for(const r of M.S)if(r)r.sort((a,b)=>a.by-b.by||a.x-b.x);M.F=null}
const FURN={};function furn(k,v=0){const key=k+v;if(FURN[key])return FURN[key];let c;const P=(g,col,x,y,w=1,h=1)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
 if(k==='shelf')c=mkc(32,44,g=>{P(g,'#3a2418',0,0,32,44);P(g,'#6a4428',1,1,30,42);P(g,'#8a5a34',1,1,30,2);const BK=['#c8483a','#3a6cb4','#e8b030','#4a9a5a','#8a5ab8','#e07a3a','#f2ead8'];
  for(let s=0;s<3;s++){const y=4+s*13;P(g,'#3a2418',2,y+10,28,2);let x=3;while(x<29){const h=HSH(v*13+s,x),w=2+(h>>>3)%2,hh=7+(h>>>5)%3,col=BK[(h>>>7)%7];if((h>>>11)%9===0){x+=3;continue}P(g,col,x,y+10-hh,w,hh);P(g,'#ffffff44',x,y+10-hh,1,hh);P(g,'#00000033',x+w-1,y+10-hh,1,hh);x+=w}}P(g,'#2a1810',0,42,32,2)});
 else if(k==='table')c=mkc(v*32+8,30,g=>{const w=v*32+8;P(g,'#3a2418',2,10,w-4,18);P(g,'#5a3a22',3,11,w-6,16);for(const lx of[5,w-9])P(g,'#3a2418',lx,18,4,12);P(g,'#2a1810',2,6,w-4,6);P(g,'#f2ead8',1,2,w-2,9);P(g,'#ffffff',2,2,w-4,1);P(g,'#d8ccb4',1,10,w-2,2);for(let x=4;x<w-4;x+=6)P(g,'#e8c060',x,11,3,2)});
 else if(k==='plant')c=mkc(28,40,g=>{P(g,'#7a3a22',8,28,12,11);P(g,'#a8542e',9,28,10,2);P(g,'#5a2a18',8,37,12,2);for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.32,len=14+(i%3)*4;for(let t=0;t<len;t++){const x=14+Math.cos(a)*t*.8,y=28+Math.sin(a)*t;P(g,t>len-4?'#8ad06a':i%2?'#3f8a3c':'#5aa846',Math.round(x),Math.round(y),2,1)}}});
 else if(k==='statue')c=mkc(32,52,g=>{P(g,'#3a3234',4,40,24,12);P(g,'#5e5456',5,40,22,2);P(g,'#2a2224',4,50,24,2);P(g,'#6a6058',8,8,16,33);P(g,'#8a8076',9,8,6,33);P(g,'#4a4240',21,8,3,33);for(let y=12;y<40;y+=7)P(g,'#4a4240',8,y,16,1);P(g,'#a0968a',7,4,18,5);P(g,'#c8bca8',8,4,16,1);P(g,'#e8a020',13,0,6,5);P(g,'#ffd060',14,0,2,2)});
 else if(k==='valve')c=mkc(32,40,g=>{P(g,'#4a5a6a',13,14,6,26);P(g,'#7a8a9a',13,14,2,26);P(g,'#2a3a4a',3,34,26,6);P(g,'#5a6a7a',4,34,24,2);g.fillStyle='#1a1a24';g.beginPath();g.arc(16,12,11,0,7);g.fill();g.fillStyle='#c8963a';g.beginPath();g.arc(16,12,10,0,7);g.fill();g.fillStyle='#1a1a24';g.beginPath();g.arc(16,12,7,0,7);g.fill();for(let i=0;i<4;i++){g.save();g.translate(16,12);g.rotate(i*Math.PI/4);P(g,'#e8b85a',-1,-9,2,18);g.restore()}P(g,'#ffe0a0',14,10,4,4);P(g,'#ffffff',13,3,3,2)});
 else if(k==='console')c=mkc(32,40,g=>{P(g,'#14101e',3,14,26,26);P(g,'#2a2440',4,15,24,24);P(g,'#3a3256',4,15,24,2);P(g,'#14101e',2,2,28,14);P(g,'#0e2a34',4,4,24,10);for(let i=0;i<3;i++)P(g,'#5ad0e0',6,6+i*3,6+(HSH(i,v)>>>4)%14,1);P(g,'#e84a8a',24,11,2,2);P(g,'#4a4070',6,22,20,6);for(let i=0;i<5;i++)P(g,i%2?'#5ad0e0':'#f6c445',7+i*4,24,2,2)});
 else c=mkc(32,48,g=>{P(g,'#14101e',4,2,24,46);P(g,'#2a2440',5,3,22,44);for(let y=6;y<44;y+=6){P(g,'#1e1a30',7,y,18,4);P(g,(y/6)%2?'#5ad0e0':'#3ac070',8,y+1,2,2);P(g,'#e84a8a',22,y+1,1,1)}P(g,'#3a3256',5,3,22,2)});
 return FURN[key]=c}
// ---------------------------------------------------------------- animation au sol (eau, herbes, lave, feu, barrière)
const TIPS={};function tipSpr(bio,f){const k=bio+f;if(TIPS[k])return TIPS[k];const P=BIOME[bio].tall.map(c=>c);return TIPS[k]=mkc(32,32,g=>{for(let i=0;i<7;i++){const h=HSH(i*13,i*7+1),x=3+(h>>>3)%26,y=10+(h>>>8)%18,lean=f?((i%2)?1:-1):0;R(g,P[4],x+lean,y-2,1,2);R(g,P[5],x+lean,y-3,1,1);R(g,P[3],x,y,1,2)}})}
function animTiles(M,cx,cy,t){const mh=M.rows.length,mw=M.rows[0].length,x0=Math.max(0,cx>>5),y0=Math.max(0,cy>>5),x1=Math.min(mw-1,(cx+W)>>5),y1=Math.min(mh-1,(cy+H)>>5),bio=biomeOf(M),mk=M.mask;
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const ch=M.rows[y][x],sx=x*32-cx,sy=y*32-cy,h=HSH(x,y);
  if(ch===','||ch==='v'){const f=((t/700+x*.23+y*.11)|0)%3;if(f<2)X.drawImage(tipSpr(bio,f),sx,sy)}
  else if(ch==='~'||ch==='w'){const fr=(t/600+h%11)|0;for(let i=0;i<2;i++){const q=HSH(x*5+i,y*3+fr),gx=sx+4+(q>>>3)%24,gy=sy+4+(q>>>8)%24,mx=x*32+gx-sx,my=y*32+gy-sy;if(mk&&mk.W[my*mk.PW+mx]&&mk.W[(my-6)*mk.PW+mx]){X.globalAlpha=.55;R(X,'#e8fbff',gx,gy,3,1);R(X,'#bfeef8',gx+1,gy+1,2,1);X.globalAlpha=1}}
   if(((t/120|0)+h)%61===0){const gx=sx+6+(h>>>4)%20,gy=sy+6+(h>>>9)%20;R(X,'#ffffff',gx,gy,1,1)}}
  else if(ch==='x'){for(let i=0;i<3;i++){const fh=8+((t/90+i*3+h)%5|0)*2,fx=sx+10+i*5;R(X,'#ff5a1e',fx-1,sy+16-fh,5,fh);R(X,'#ff9a2a',fx,sy+18-fh,3,fh-3);R(X,'#ffe27a',fx+1,sy+12,1,3)}}
  else if(ch==='Z'){X.globalAlpha=.55+.25*Math.sin(t/110+x*1.7);for(let i=0;i<4;i++)R(X,i%2?'#e84aff':'#9a5ad0',sx+2+i*8,sy,4,32);R(X,'#ffffff',sx+((t/40+x*13)%28|0),sy+((t/70+x*7)%30|0),4,2);X.globalAlpha=1}
  else if(ch==='L'){const ph=((t/160|0)+h)%10;if(ph<4){const bx=sx+6+(h>>>5)%20,by=sy+6+(h>>>9)%20;R(X,'#ffe88a',bx-ph,by,ph*2+1,1);R(X,'#ffe88a',bx,by-ph,1,ph*2+1)}if(((t/90|0)+h)%17===0)R(X,'#fff4c0',sx+(h>>>2)%28,sy+(h>>>6)%28,2,2)}}}
// Brins d'herbe devant les pieds d'un personnage dans les hautes herbes
const FRONT={};function frontGrass(bio,f){const k=bio+f;if(FRONT[k])return FRONT[k];const P=BIOME[bio].tall;return FRONT[k]=mkc(36,16,g=>{for(let i=0;i<14;i++){const x=1+i*2.5|0,hh=7+((i*7)%5),lean=f&&i%2?1:0;for(let j=0;j<hh;j++){R(g,j>=hh-1?P[5]:j>=hh-3?P[4]:j>=hh-5?P[3]:P[2],x+(j>hh-3?lean:0),15-j,1,1);if(j<hh-2)R(g,P[1],x+1,15-j,1,1)}}})}
