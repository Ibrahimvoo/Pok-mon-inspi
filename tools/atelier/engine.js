// ATELIER — moteur de rendu « volumes → pixel art » partagé par toutes les illustrations du jeu.
// Une seule direction de lumière (haut-gauche, légèrement de face), une seule logique de rampes de couleurs
// (ombres froides tirant vers le violet, lumières chaudes), des contours sélectifs : tout appartient au même monde.
// Une illustration = des « parties » (formes fermées) décrites en coordonnées de dessin, des « aplats » (motifs,
// yeux) et des traits. Chaque partie reçoit un volume (champ de distance → relief → normales), est éclairée,
// projette une ombre portée sur les parties placées derrière elle, puis est quantifiée en 5 tons.
(()=>{
const A=window.ATELIER={};
// ---------------------------------------------------------------- couleurs (OKLab / OKLCH)
const s2l=c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4},l2s=c=>{c=c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055;return Math.max(0,Math.min(255,Math.round(c*255)))};
const hex=s=>{if(Array.isArray(s))return s;s=s.replace('#','');if(s.length===3)s=[...s].map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(s.slice(i,i+2),16))};
const toHex=([r,g,b])=>'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
function lab(c){let[r,g,b]=hex(c).map(s2l);const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
 return[.2104542553*l+.793617785*m-.0040720468*s,1.9779984951*l-2.428592205*m+.4505937099*s,.0259040371*l+.7827717662*m-.808675766*s]}
function unlab([L,a,b]){const l=(L+.3963377774*a+.2158037573*b)**3,m=(L-.1055613458*a-.0638541728*b)**3,s=(L-.0894841775*a-1.291485548*b)**3;
 const f=v=>{v=Math.max(0,v);return l2s(v)};return[f(4.0767416621*l-3.3077115913*m+.2309699292*s),f(-1.2684380046*l+2.6097574011*m-.3413193965*s),f(-.0041960863*l-.7034186147*m+1.707614701*s)]}
A.hex=hex;A.toHex=toHex;A.lab=lab;A.unlab=unlab;
A.mix=(a,b,k)=>{const A1=lab(a),B1=lab(b);return toHex(unlab(A1.map((v,i)=>v+(B1[i]-v)*k)))};
// Rampe de tons : k ∈ [-3, 2] (−3 contour, −2 ombre profonde, −1 ombre, 0 base, 1 lumière, 2 reflet).
// Les ombres tournent vers le pourpre (le jaune vers l'orangé, le vert vers le bleu-vert), les lumières vers le jaune.
const TC={};
const DEG=Math.PI/180;
function hueToward(h,k){// h en radians, sens choisi par famille de teinte
 const d=h/DEG,deg=((d%360)+360)%360;
 if(k<0){// ombre
  let dir=deg>=55&&deg<135?-1:deg<55||deg>=345?-1:1;if(deg>=300&&deg<345)dir=1;
  const amt=Math.min(1,-k/2)*(deg>=55&&deg<135?26:deg>=135&&deg<300?20:14);return h+dir*amt*DEG}
 let dir=deg>=100&&deg<280?-1:1;if(deg<100&&deg>=60)dir=deg<90?1:0;const amt=Math.min(1,k/2)*12;return h+dir*amt*DEG}
A.tone=function(c,k){const key=c+'|'+k;if(TC[key])return TC[key];let[L,a,b]=lab(c);let C=Math.hypot(a,b),h=Math.atan2(b,a);
 const dl={'-3':-.36,'-2':-.235,'-1':-.12,'0':0,'1':.075,'2':.15}[k]??k*.11;
 if(k<0){h=hueToward(h,k);C*=k<=-2?.98:1.04;const tint=Math.min(1,-k/2)*.032*(1-Math.min(1,C/.08));a=C*Math.cos(h)+tint*Math.cos(285*DEG);b=C*Math.sin(h)+tint*Math.sin(285*DEG);L=Math.max(.06,L+dl*(L<.35?.7:1))}
 else if(k>0){h=hueToward(h,k);C*=k>=2?.8:.93;const tint=k/2*.018*(1-Math.min(1,C/.08));a=C*Math.cos(h)+tint*Math.cos(85*DEG);b=C*Math.sin(h)+tint*Math.sin(85*DEG);L=Math.min(.985,L+dl*(L>.85?.5:1))}
 return TC[key]=toHex(unlab([L,a,b]))};
// ---------------------------------------------------------------- distance euclidienne exacte (Felzenszwalb)
const BIG=1e10;
function dt1(f,n,d,v,z){let k=0;v[0]=0;z[0]=-BIG;z[1]=BIG;for(let q=1;q<n;q++){let s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}k++;v[k]=q;z[k]=s;z[k+1]=BIG}
 k=0;for(let q=0;q<n;q++){while(z[k+1]<q)k++;d[q]=(q-v[k])*(q-v[k])+f[v[k]]}}
function edt(mask,w,h){const n=Math.max(w,h),f=new Float64Array(n),d=new Float64Array(n),v=new Int32Array(n),z=new Float64Array(n+1),g=new Float64Array(w*h);
 for(let i=0;i<w*h;i++)g[i]=mask[i]?BIG:0;
 for(let x=0;x<w;x++){for(let y=0;y<h;y++)f[y]=g[y*w+x];dt1(f,h,d,v,z);for(let y=0;y<h;y++)g[y*w+x]=d[y]}
 const out=new Float32Array(w*h);for(let y=0;y<h;y++){for(let x=0;x<w;x++)f[x]=g[y*w+x];dt1(f,w,d,v,z);for(let x=0;x<w;x++)out[y*w+x]=Math.sqrt(d[x])}return out}
function blur(src,w,h,r,mask){if(r<1)return src;const t=new Float32Array(w*h),o=new Float32Array(w*h);
 for(let y=0;y<h;y++){let acc=0,cnt=0;const row=y*w;for(let x=-r;x<w+r;x++){const xa=x+r,xr=x-r-1;if(xa<w&&xa>=0){acc+=src[row+xa];cnt++}if(xr>=0&&xr<w){acc-=src[row+xr];cnt--}if(x>=0&&x<w)t[row+x]=acc/cnt}}
 for(let x=0;x<w;x++){let acc=0,cnt=0;for(let y=-r;y<h+r;y++){const ya=y+r,yr=y-r-1;if(ya<h&&ya>=0){acc+=t[ya*w+x];cnt++}if(yr>=0&&yr<h){acc-=t[yr*w+x];cnt--}if(y>=0&&y<h)o[y*w+x]=mask&&!mask[y*w+x]?src[y*w+x]:acc/cnt}}return o}
const hash=(x,y,s=0)=>{let h=Math.imul(x+374761+s*31,668265263)^Math.imul(y+977+s*7,2246822519);h=Math.imul(h^h>>>15,3266489917);return((h^h>>>16)>>>0)/4294967296};
function vnoise(x,y,s=0){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
 const a=hash(xi,yi,s),b=hash(xi+1,yi,s),c=hash(xi,yi+1,s),d=hash(xi+1,yi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
A.hash=hash;A.vnoise=vnoise;
// ---------------------------------------------------------------- rendu
// o = {w,h,box:[x0,y0,x1,y1],flip,ss,light,amb,cast,args,olc}
A.LIGHT=[-.52,-.72,.58];
A.render=function(def,o){
 const W=o.w,H=o.h,SS=o.ss||4,GW=W*SS,GH=H*SS,[bx0,by0,bx1,by1]=o.box||[0,0,100,100];
 const sc=Math.min(W/(bx1-bx0),H/(by1-by0)),offx=(W-(bx1-bx0)*sc)/2,offy=o.alignBottom?H-(by1-by0)*sc:(H-(by1-by0)*sc)/2,u=1/sc;
 const parts=[],flats=[];let L=o.light||A.LIGHT;{const n=Math.hypot(...L);L=L.map(v=>v/n)}
 const api={u,W,H,args:o.args||{},flip:!!o.flip,
  part:(c,draw,opt={})=>{parts.push({c,draw,o:opt});return parts.length-1},
  flat:(c,draw,opt={})=>flats.push({c,draw,o:opt}),
  line:(c,w,draw,opt={})=>flats.push({c,draw,o:{...opt,line:w}}),
  dot:(c,x,y,opt={})=>flats.push({c,dot:[x,y],o:opt}),
  cut:(draw)=>parts.push({cut:1,draw,o:{}})};
 def(api,o.args||{});
 const cv=document.createElement('canvas');cv.width=GW;cv.height=GH;const g=cv.getContext('2d',{willReadFrequently:true});
 const setT=(k)=>{g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,cv.width,cv.height);g.scale(k,k);g.translate(offx,offy);g.scale(sc,sc);g.translate(-bx0,-by0);if(o.flip){g.translate(bx0+bx1,0);g.scale(-1,1)}g.fillStyle=g.strokeStyle='#000';g.lineCap=g.lineJoin='round'};
 const raster=(draw,line)=>{setT(SS);g.beginPath();draw(g);if(line){g.lineWidth=Math.max(line,u*1.05);g.stroke()}else g.fill(o.evenodd?'evenodd':'nonzero');const d=g.getImageData(0,0,GW,GH).data,m=new Uint8Array(GW*GH);for(let i=0;i<GW*GH;i++)m[i]=d[i*4+3]>=128;return m};
 const top=new Int16Array(GW*GH).fill(-1);
 parts.forEach((p,i)=>{p.m=raster(p.draw,p.o.line);if(p.cut){for(let k=0;k<GW*GH;k++)if(p.m[k])top[k]=-1;return}if(p.o.clip!=null){const cm=parts[p.o.clip].m;for(let k=0;k<GW*GH;k++)if(p.m[k]&&!cm[k])p.m[k]=0}for(let k=0;k<GW*GH;k++)if(p.m[k])top[k]=i});
 // relief : hauteur = profil circulaire de la distance au bord ; normales par différences centrales
 const NX=new Float32Array(GW*GH),NY=new Float32Array(GW*GH),NZ=new Float32Array(GW*GH),HT=new Float32Array(GW*GH);
 parts.forEach((p,i)=>{if(p.cut)return;const po=p.o;let any=false;for(let k=0;k<GW*GH;k++)if(top[k]===i){any=true;break}if(!any)return;
  const D=edt(p.m,GW,GH);let mx=0;for(let k=0;k<GW*GH;k++)if(D[k]>mx)mx=D[k];
  const R=po.r!=null?po.r*sc*SS:mx*(po.round??1),hs=po.flat?(typeof po.flat==='number'?po.flat:.3):1;
  let Hh=new Float32Array(GW*GH);for(let k=0;k<GW*GH;k++)if(p.m[k]){const t=Math.min(1,D[k]/Math.max(1,R));Hh[k]=R*Math.sqrt(1-(1-t)*(1-t))*hs}
  Hh=blur(Hh,GW,GH,Math.max(1,SS>>1),null);
  const tl=po.tilt||[0,0];
  for(let y=1;y<GH-1;y++)for(let x=1;x<GW-1;x++){const k=y*GW+x;if(top[k]!==i)continue;
   let dx=(Hh[k+1]-Hh[k-1])/2,dy=(Hh[k+GW]-Hh[k-GW])/2;if(!p.m[k+1]||!p.m[k-1])dx*=1;const nx=-dx+tl[0],ny=-dy+tl[1],nz=1,n=Math.hypot(nx,ny,nz);NX[k]=nx/n;NY[k]=ny/n;NZ[k]=nz/n;HT[k]=Hh[k]}});
 // ombre portée des parties de devant sur celles de derrière (vers le bas-droite), occlusion des creux
 const cs=(o.cast??2.6)*sc*SS,cdx=Math.round(-L[0]/Math.hypot(L[0],L[1])*cs),cdy=Math.round(-L[1]/Math.hypot(L[0],L[1])*cs);
 const lev=new Int8Array(W*H).fill(-9),own=new Int16Array(W*H).fill(-1),inten=new Float32Array(W*H);
 const GBA=o.preset==='gba',TH=o.th||(GBA?[.2,.46,.84,9]:[.30,.47,.74,.9]);
 for(let oy=0;oy<H;oy++)for(let ox=0;ox<W;ox++){const cnt=new Map();let tot=0;
  for(let j=0;j<SS;j++)for(let i=0;i<SS;i++){const t=top[(oy*SS+j)*GW+ox*SS+i];if(t>=0){cnt.set(t,(cnt.get(t)||0)+1);tot++}}
  if(tot<SS*SS*(o.cov??.5))continue;let best=-1,bc=0;for(const[t,c]of cnt)if(c>bc||c===bc&&t>best){best=t;bc=c}
  const p=parts[best],po=p.o;let I=0,n=0,sh=0;
  for(let j=0;j<SS;j++)for(let i=0;i<SS;i++){const sx=ox*SS+i,sy=oy*SS+j,k=sy*GW+sx;if(top[k]!==best)continue;
   const nl=NX[k]*L[0]+NY[k]*L[1]+NZ[k]*L[2],wrap=po.wrap??.25;let d=Math.max(0,(nl+wrap)/(1+wrap));
   if(po.gloss){const rz=2*nl*NZ[k]-L[2];if(rz>.0)d+=Math.pow(Math.max(0,rz),po.gloss)*.6}
   I+=d;n++;
   if(!po.nocast){const qx=sx+cdx,qy=sy+cdy;if(qx>=0&&qy>=0&&qx<GW&&qy<GH){const q=top[qy*GW+qx];if(q>best&&!(po.grp&&parts[q].o.grp===po.grp)&&!parts[q].o.nocastOn)sh++}}}
  I/=n;sh/=n;
  if(po.tex){I+=po.tex((ox+.5)/W,(oy+.5)/H,ox,oy)}
  if(po.fur&&!GBA){const f=vnoise(ox*.9,oy*.45,best)*.5+vnoise(ox*.3,oy*.3,best+9)*.5;I+=(f-.5)*po.fur}
  if(po.noise&&!GBA){I+=(hash(ox,oy,best)-.5)*po.noise}
  I=I*(1-sh*(po.castK??.55))+(po.bias||0);I=Math.max(0,Math.min(1.2,I));inten[oy*W+ox]=I;
  let lv=I<TH[0]?-2:I<TH[1]?-1:I<TH[2]?0:I<TH[3]?1:2;if(lv===2&&!po.gloss&&!po.hl)lv=1;if(GBA&&lv===1&&po.gloss&&I>.97)lv=2;if(po.min!=null&&lv<po.min)lv=po.min;if(po.max!=null&&lv>po.max)lv=po.max;if(po.emit)lv=po.emit===2?1:0;
  lev[oy*W+ox]=lv;own[oy*W+ox]=best}
 // nettoyage : un pixel isolé prend le ton de ses voisins (pas de bruit de quantification)
 for(let pass=0;pass<2;pass++)for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const k=y*W+x,p=own[k];if(p<0)continue;const nb=[k-1,k+1,k-W,k+W].filter(q=>own[q]===p);if(nb.length<3)continue;const l0=lev[nb[0]];if(lev[k]!==l0&&nb.every(q=>lev[q]===l0))lev[k]=l0}
 // couleurs + contours sélectifs
 const out=new Uint8ClampedArray(W*H*4),put=(k,c)=>{const v=hex(c);out[k*4]=v[0];out[k*4+1]=v[1];out[k*4+2]=v[2];out[k*4+3]=255};
 const OLC=o.olc||'#170e2a';
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const k=y*W+x,p=own[k];if(p<0)continue;const P=parts[p],po=P.o,c=po.col?.(x/W,y/H)||P.c;
  let col=po.ramp?po.ramp[Math.max(0,Math.min(po.ramp.length-1,lev[k]+3))]:A.tone(c,lev[k]);
  if(po.ol!==false){let outer=0,inner=0,lit=0;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy,q=xx<0||yy<0||xx>=W||yy>=H?-1:own[yy*W+xx];
    if(q<0){outer++;if(dx<0||dy<0)lit++}else if(q<p&&po.olIn!==false&&!(po.grp&&parts[q].o.grp===po.grp)&&!parts[q].cut)inner++}
   if(outer){const sideLit=lit>0&&lit===outer&&lev[k]>=0;col=po.olc||(po.ramp?po.ramp[0]:GBA?A.mix(A.tone(c,-3),OLC,sideLit?.42:.62):sideLit?A.mix(A.tone(c,-2),OLC,.25):A.mix(A.tone(c,-3),OLC,.45))}
   else if(inner)col=po.ilc||(po.ramp?po.ramp[Math.min(1,po.ramp.length-1)]:GBA?A.mix(A.tone(c,-3),OLC,.3):A.mix(A.tone(c,-2),OLC,.18))}
  put(k,col)}
 // aplats (motifs, yeux) et traits
 for(const f of flats){let m;if(f.dot){const[x,y]=f.dot;m=new Uint8Array(W*H);let px=offx+(o.flip?(bx0+bx1-x):x)*sc-bx0*sc,py=offy+(y-by0)*sc;px=Math.floor(px);py=Math.floor(py);if(px>=0&&py>=0&&px<W&&py<H)m[py*W+px]=1}
  else{setT(1);g.beginPath();f.draw(g);if(f.o.line){g.lineWidth=Math.max(f.o.line,u*(f.o.thin?.9:1.1));g.stroke()}else g.fill();const d=g.getImageData(0,0,W,H).data;m=new Uint8Array(W*H);for(let i=0;i<W*H;i++)m[i]=d[i*4+3]>=(f.o.line?(f.o.thr??90):(f.o.thr??128));
   if(f.o.min&&!m.some(v=>v)){let bx=0,by=0,bv=0;for(let i=0;i<W*H;i++)if(d[i*4+3]>bv){bv=d[i*4+3];bx=i%W;by=i/W|0}if(bv>0)m[by*W+bx]=1}}
  for(let k=0;k<W*H;k++){if(!m[k])continue;if(own[k]<0&&!f.o.free)continue;if(f.o.on!=null&&![].concat(f.o.on).includes(own[k]))continue;
   let c=f.c;if(f.o.lit&&own[k]>=0){let l=lev[k];if(f.o.lmax!=null)l=Math.min(l,f.o.lmax);c=A.tone(c,l)}put(k,c);if(own[k]<0){own[k]=-2}}}
 const cvs=document.createElement('canvas');cvs.width=W;cvs.height=H;cvs.getContext('2d').putImageData(new ImageData(out,W,H),0,0);return cvs};
// ---------------------------------------------------------------- outils de dessin
const E=(g,x,y,rx,ry,r=0)=>{g.moveTo(x+rx*Math.cos(r),y+rx*Math.sin(r));g.ellipse(x,y,rx,ry,r,0,Math.PI*2)};
const C=(g,x,y,r)=>E(g,x,y,r,r);
// capsule entre deux points (membres), rayons r1 → r2
function cap(g,x1,y1,x2,y2,r1,r2=r1){const a=Math.atan2(y2-y1,x2-x1),n=a+Math.PI/2;g.moveTo(x1+Math.cos(n)*r1,y1+Math.sin(n)*r1);g.arc(x1,y1,r1,n,n+Math.PI);g.lineTo(x2-Math.cos(n)*r2,y2-Math.sin(n)*r2);g.arc(x2,y2,r2,n+Math.PI,n+Math.PI*2);g.closePath()}
// polygone lissé (courbe passant par les points, Catmull-Rom fermée)
function blob(g,pts,t=.5){const n=pts.length;g.moveTo(pts[0][0],pts[0][1]);for(let i=0;i<n;i++){const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
 g.bezierCurveTo(p1[0]+(p2[0]-p0[0])*t/3,p1[1]+(p2[1]-p0[1])*t/3,p2[0]-(p3[0]-p1[0])*t/3,p2[1]-(p3[1]-p1[1])*t/3,p2[0],p2[1])}g.closePath()}
// courbe ouverte lissée
function curve(g,pts,t=.5){const n=pts.length;g.moveTo(pts[0][0],pts[0][1]);for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)];
 g.bezierCurveTo(p1[0]+(p2[0]-p0[0])*t/3,p1[1]+(p2[1]-p0[1])*t/3,p2[0]-(p3[0]-p1[0])*t/3,p2[1]-(p3[1]-p1[1])*t/3,p2[0],p2[1])}}
// forme effilée le long d'une courbe (queues, flammes, mèches) : points + largeurs
function taper(g,pts,ws){const n=pts.length,L=[],R=[];for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)],ang=Math.atan2(b[1]-a[1],b[0]-a[0])+Math.PI/2,w=ws[i]??ws[ws.length-1];
 L.push([pts[i][0]+Math.cos(ang)*w,pts[i][1]+Math.sin(ang)*w]);R.push([pts[i][0]-Math.cos(ang)*w,pts[i][1]-Math.sin(ang)*w])}blob(g,[...L,...R.reverse()],.45)}
function poly(g,pts){g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath()}
A.E=E;A.C=C;A.cap=cap;A.blob=blob;A.curve=curve;A.taper=taper;A.poly=poly;
// Œil expressif : contour sombre, iris, pupille, reflets ; humeurs : 'joie' (arc fermé), 'colere', 'sommeil'
A.eye=function(d,x,y,rx,ry,o={}){const ink=o.ink||'#1c1430';
 if(o.mood==='joie'){d.line(ink,o.lw||Math.max(1.6,rx*.5),g=>{g.moveTo(x-rx,y+ry*.25);g.quadraticCurveTo(x,y-ry*1.1,x+rx,y+ry*.25)});return}
 if(o.mood==='sommeil'){d.line(ink,o.lw||Math.max(1.4,rx*.45),g=>{g.moveTo(x-rx,y);g.quadraticCurveTo(x,y+ry*.7,x+rx,y)});return}
 d.flat(ink,g=>E(g,x,y,rx,ry,o.rot||0));
 if(o.white)d.flat(o.white,g=>E(g,x,y,rx*.78,ry*.82,o.rot||0));
 if(o.iris)d.flat(o.iris,g=>E(g,x+(o.lx||0)*rx,y+ry*.18+(o.ly||0)*ry,rx*(o.white?.62:.74),ry*(o.white?.62:.62),o.rot||0));
 if(o.iris2)d.flat(o.iris2,g=>E(g,x+(o.lx||0)*rx,y+ry*.42+(o.ly||0)*ry,rx*.55,ry*.32,o.rot||0));
 if(o.pupil)d.flat(o.pupil,g=>E(g,x+(o.lx||0)*rx,y+ry*.2+(o.ly||0)*ry,rx*(o.slit?.18:.36),ry*(o.slit?.62:.4),o.rot||0));
 d.flat('#ffffff',g=>E(g,x-rx*.3+(o.lx||0)*rx*.5,y-ry*.32,Math.max(rx*.34,.6*d.u),Math.max(ry*.28,.6*d.u)),{min:1});
 if(o.glint2!==false&&rx>2.4)d.flat('#ffffff',g=>E(g,x+rx*.34,y+ry*.42,rx*.15,ry*.12));
 if(o.lid){const t=o.lid;d.flat(o.lidc,g=>{g.moveTo(x-rx*1.3,y-ry*(1.05-t[0]*2));g.lineTo(x+rx*1.3,y-ry*(1.05-t[1]*2));g.lineTo(x+rx*1.3,y-ry*1.3);g.lineTo(x-rx*1.3,y-ry*1.3);g.closePath()},{lit:1,on:o.on});
  d.line(ink,o.lw||Math.max(1.2,rx*.3),g=>{g.moveTo(x-rx*1.15,y-ry*(1.05-t[0]*2));g.lineTo(x+rx*1.15,y-ry*(1.05-t[1]*2))})}};
})();
