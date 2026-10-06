// =====================================================================
// 13.0 — ATLAS D'AURÉLYS : carte illustrée, navigable, avec fiche de chaque lieu
// =====================================================================
const RINFO={bourg:['Village','plain','Ton village natal, au calme entre les champs. Maman et le labo du Prof. Saule.'],
 route1:['Route','plain','Hautes herbes et premiers dresseurs entre Bourg-Lueur et Cendreville.'],
 ville:['Ville','town','La cité minière de Brasia. Arène Roc, boutique, mine et Centre de Soins.'],
 foret:['Forêt','forest','Une forêt dense où les arbres murmurent. Mieux vaut ne pas s\'y perdre.'],
 mont:['Volcan','volcano','Le sommet fumant où dort Solarion, gardien du jour.'],
 route2:['Route','marsh','Une rive noyée de brume entre Cendreville et le port.'],
 port:['Ville','coast','Le port des pêcheurs. Arène Miroir de Maëlle et le vieux ponton.'],
 grotte:['Grotte','mount','Des galeries plongées dans le noir, où chaque bruit revient en écho.'],
 obs:['Observatoire','peak','Le dôme d\'où l\'on observe le ciel. Le sceau de Nocturion y repose.'],
 volterre:['Ville','city','La ville des turbines, toujours sous l\'orage. Arène Volt.'],
 coteaux:['Coteaux','hills','Des collines dorées, la Pension d\'Odette et Firmin, et le chemin du Sanctuaire.'],
 lunevie:['Village','town','Un village qui vit la nuit. Arène Crépuscule d\'Orane.'],
 sanctuaire:['Sanctuaire','peak','Un autel antique où se rejoignent le jour et la nuit.'],
 lac:['Lac','lake','Un lac aux reflets nacrés, au-delà de la Forêt Murmure.'],
 bois:['Forêt','dark','Un bois silencieux où dorment les fondateurs d\'Aurélys.'],
 galeries:['Grotte','hills','D\'anciennes galeries creusées sous les Coteaux.'],
 recif:['Récif','reef','Des îlots battus par les marées, à l\'ouest du port.'],
 pic:['Montagne','snow','Le sommet le plus haut d\'Aurélys, toujours sous la neige.']};
const RBADGE={ville:['badge','bRoc'],port:['badge2','bMir'],lunevie:['badge3','bCre'],volterre:['badge4','bVol']};
const rmXY=k=>{const[x,y]=RMAP[k];return[Math.round(40+(x-62)*1.1),Math.round(30+(y-26)*.8)]};
const RMH=214,RMY=22;let RMC=null,RMSEA=[];
function rmNoise(x,y,s){const h=(i,j)=>{let n=i*374761393+j*668265263+s*1442695;n=(n^(n>>13))*1274126177;return((n^(n>>16))&1023)/1023},xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
 return(h(xi,yi)*(1-u)+h(xi+1,yi)*u)*(1-v)+(h(xi,yi+1)*(1-u)+h(xi+1,yi+1)*u)*v}
function rmBuild(){const K=Object.keys(RMAP).filter(k=>RINFO[k]),P=K.map(k=>[...rmXY(k),k]),pts=[];
 for(const[x,y,k]of P)pts.push([x,y,k==='recif'?14:k==='pic'?26:30,k==='recif'?.8:1]);
 for(const[a,b]of RLINK){if(!RMAP[a]||!RMAP[b])continue;const[x1,y1]=rmXY(a),[x2,y2]=rmXY(b),n=Math.ceil(Math.hypot(x2-x1,y2-y1)/14);for(let i=1;i<n;i++)pts.push([x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,b==='recif'?8:20,.85])}
 const[px,py]=rmXY('port'),bays=[[px-26,py+34,30],[px-60,py-6,26],[px+24,py+44,22]];
 const near=(x,y)=>{const wx=x+(rmNoise(x/14,y/14,21)-.5)*30,wy=y+(rmNoise(x/14,y/14,33)-.5)*30;let b=null,d=1e9;for(const p of P){const e=(p[0]-wx)**2+(p[1]-wy)**2;if(e<d){d=e;b=p[2]}}return d<30*30?b:'route1'};
 RMSEA=[];return mkc(W,RMH,g=>{for(let cy=0;cy<RMH;cy+=2)for(let cx=0;cx<W;cx+=2){const x=cx,y=cy+RMY;let f=0;for(const[qx,qy,s,w]of pts)f=Math.max(f,w*Math.exp(-((qx-x)**2+(qy-y)**2)/(2*s*s)));for(const[bx,by,s]of bays)f-=.9*Math.exp(-((bx-x)**2+(by-y)**2)/(2*s*s));
   f+=(rmNoise(x/18,y/18,3)-.5)*.34+(rmNoise(x/6,y/6,9)-.5)*.1;const n2=rmNoise(x/9,y/9,5);let c;
   if(f<.18){c=f<.06?'#24508c':'#2e62a4';if(((cx*7+cy*13)%97)<3)RMSEA.push([cx,cy])}else if(f<.28)c='#4a8ad0';else if(f<.33)c='#e8d8a0';
   else{const b=RINFO[near(x,y)][1],hi=f>.62;c={plain:n2>.5?'#7cc060':'#72b456',town:n2>.5?'#86c46a':'#7ab85e',forest:n2>.5?'#3f8a3a':'#367c34',volcano:hi?'#7a5a4e':'#8a7a5a',marsh:n2>.5?'#7aa88a':'#6a9a80',coast:'#8ac46a',mount:hi?'#8a7a6a':'#9a9a6a',peak:hi?'#a8a0b8':'#8aa070',city:n2>.5?'#8a9a8a':'#7a8c7c',hills:n2>.5?'#b8c868':'#a8bc5c',lake:'#78b860',dark:n2>.5?'#3a5048':'#34483f',reef:'#d8c890',snow:hi?'#eef2f8':'#a8b0b8'}[b]||'#7cc060'}
   R(g,c,cx,cy,2,2)}
  const r=cnRng(42),T=(x,y,c1,c2)=>{R(g,c1,x-3,y-2,6,4);R(g,c1,x-2,y-5,4,3);R(g,c2,x-1,y-6,2,1);R(g,'#5a3a20',x,y+2,1,2)},
   Mt=(x,y,s,c,cap)=>{for(let i=0;i<s;i++){R(g,c,x-i,y-s+i,i*2+1,1);if(i<s/3&&cap)R(g,cap,x-i,y-s+i,i*2+1,1)}R(g,'#00000022',x,y-s+2,s,s-2)},
   H=(x,y,roof)=>{R(g,'#f0e6d0',x-3,y-2,7,5);R(g,roof,x-4,y-4,9,3);R(g,'#5a4a3a',x,y+1,2,2)};
  for(const[x,y,k]of P){const b=RINFO[k][1],yy=y-RMY;
   if(b==='forest'||b==='dark')for(let i=0;i<26;i++){const a=r()*6.28,d=6+r()*26;T(Math.round(x+Math.cos(a)*d),Math.round(yy+Math.sin(a)*d*.7),b==='dark'?'#24382f':'#2a6a2a',b==='dark'?'#4a6a5a':'#5aa846')}
   if(b==='mount'||b==='peak'||b==='snow')for(let i=0;i<7;i++)Mt(Math.round(x-22+r()*44),Math.round(yy-4+r()*16),7+r()*7|0,b==='snow'?'#c8d0dc':'#8a7a6a',b==='mount'?0:'#ffffff');
   if(b==='volcano'){for(let i=0;i<4;i++)Mt(Math.round(x-26+i*16+r()*4),yy+14,8,'#6a5248');Mt(x,yy+6,16,'#5a4038');R(g,'#ff8a3a',x-3,yy-10,6,2)}
   if(b==='town'||b==='coast'||b==='city'||k==='bourg'){const roofs=b==='city'?['#6a7a9a','#5a6a8a']:['#c84848','#4a7ab8','#d88a3a'];for(let i=0;i<(k==='bourg'?3:5);i++)H(Math.round(x-12+(i%3)*12+r()*2),Math.round(yy-6+(i/3|0)*9),roofs[i%roofs.length]);if(b==='city')for(let i=0;i<3;i++){R(g,'#4a5868',x+16+i*5,yy-14,2,12);R(g,'#c8d0dc',x+15+i*5,yy-15,4,2)}}
   if(b==='lake'){pell(g,x+4,yy+8,16,9,'#3a74b8');pell(g,x+4,yy+8,13,7,'#5aa0d8');R(g,'#c8f0ff',x-2,yy+6,6,1)}
   if(b==='reef')for(let i=0;i<8;i++){const rx=Math.round(x-18+r()*36),ry=Math.round(yy-8+r()*18);R(g,'#8a8478',rx,ry,4,3);R(g,'#ffffff',rx-1,ry+3,6,1)}
   if(k==='obs'){pell(g,x,yy-4,8,6,'#5a5a7a');R(g,'#3a3a56',x-9,yy-4,18,6);R(g,'#5ad0e0',x-1,yy-10,2,3)}
   if(k==='sanctuaire'){for(let i=0;i<4;i++)R(g,'#e8e0d0',x-9+i*6,yy-10,3,10);R(g,'#c8b890',x-11,yy-12,23,2)}
   if(k==='grotte'||k==='galeries'){pell(g,x,yy+2,6,5,'#2a2420');R(g,'#4a3a30',x-7,yy-4,14,2)}
   if(k==='coteaux')for(let i=0;i<5;i++)R(g,'#8a6a3a',x-20+i*9,yy+10,1,6),R(g,'#7a9a3a',x-22+i*9,yy+9,5,2)}})}
function rmSeen(k){return G.seen?.[k]||Object.entries(RPAR).some(([a,b])=>b===k&&G.seen?.[a])}
function rmSpecies(k){const M=MAPS[k],S=new Set();if(!M)return[];for(const a of['enc','fish','fish2','fish3'])for(const e of M[a]||[])if(SP[e[0]])S.add(e[0]);return[...S]}
regionMap=async function(){RMC??=rmBuild();const K=Object.keys(RMAP).filter(k=>RINFO[k]),cur=RMAP[RPAR[G.map]||G.map]?RPAR[G.map]||G.map:'bourg';let sel=cur;
 ui.panel=()=>{const t=now(),g=X;R(g,'#1a2a4a',0,0,W,H);g.drawImage(RMC,0,RMY);
  for(const[x,y]of RMSEA){const o=Math.round(Math.sin(t/700+x*.05+y*.11)*2);R(g,'#7ab4e8',x+o,y+RMY,4,1)}
  for(const[a,b]of RLINK){if(!RINFO[a]||!RINFO[b])continue;const[x1,y1]=rmXY(a),[x2,y2]=rmXY(b),kn=rmSeen(a)&&rmSeen(b),n=Math.ceil(Math.hypot(x2-x1,y2-y1)/4),mx=(x1+x2)/2+(y2-y1)*.12,my=(y1+y2)/2-(x2-x1)*.12;
   for(let i=0;i<=n;i++){if(!kn&&i%3)continue;const q=i/n,x=(1-q)**2*x1+2*(1-q)*q*mx+q*q*x2,y=(1-q)**2*y1+2*(1-q)*q*my+q*q*y2;R(g,kn?'#6a4a2a':'#d8d0b8',Math.round(x)-1,Math.round(y),3,kn?3:2);if(kn)R(g,'#e8c890',Math.round(x)-1,Math.round(y),3,1)}}
  for(const k of K)if(!rmSeen(k)){const[x,y]=rmXY(k);for(let i=0;i<7;i++){const a=i*.9+t/4000,cx=x+Math.cos(a)*14*(i%3?1:.4),cy=y+Math.sin(a)*8;pell(g,Math.round(cx),Math.round(cy)+2,13,9,'#b8bcc8');pell(g,Math.round(cx),Math.round(cy),12,8,'#eef0f6')}}
  for(const k of K){const[x,y]=rmXY(k),sn=rmSeen(k),town=['bourg','ville','port','volterre','lunevie'].includes(k);if(!sn){txt('?',x,y+5,'#8a8aa0',{al:'c'});continue}
   rr(x-5,y-5,10,10,2,C.ink);R(g,town?C.acc:k===sel?C.gold:'#f0e6d0',x-3,y-3,6,6);R(g,'#ffffff',x-3,y-3,6,1);const bd=RBADGE[k];if(bd&&f()[bd[0]])g.drawImage(ICO[bd[1]],x+5,y-12,10,10)}
  const[hx,hy]=rmXY(cur);glowAt(hx,hy,22,.5+.2*Math.sin(t/300));g.drawImage(chr('hero',0,(t/350|0)%2?0:2),hx-8,hy-30,16,32);
  {const[sx,sy]=rmXY(sel),b=Math.abs(Math.sin(t/220))*4;g.strokeStyle=C.gold;g.lineWidth=2;g.beginPath();g.arc(sx,sy,10+Math.sin(t/200)*1.5,0,7);g.stroke();g.drawImage(ICO.pin,sx-8,sy-26-b,16,16)}
  R(g,C.ink,0,0,W,RMY);R(g,'#3a2a5a',0,RMY-2,W,2);X.drawImage(ICO.flag,6,4,14,14);txt(wrap(goal(),270,1)[0]||'',24,15,'#fff0b0',{s:1,sh:0});txt(G.keys.relais?'A : ENVOL · B : FERMER':'FLÈCHES : PARCOURIR · B : FERMER',W-8,14,C.mute,{s:1,sh:0,al:'r'});{const cx=W-22,cy=RMY+24;g.globalAlpha=.85;cnDisc(g,cx,cy,15,'#efe2bf');R(g,C.ink,cx-1,cy-13,2,26);R(g,C.ink,cx-13,cy-1,26,2);g.fillStyle=C.acc;g.beginPath();g.moveTo(cx,cy-16);g.lineTo(cx+4,cy-3);g.lineTo(cx-4,cy-3);g.fill();g.globalAlpha=1;txt('N',cx-22,cy+4,C.ink,{mini:1,al:'c'});txt('AURÉLYS',W-8,RMY+RMH-10,C.gold,{al:'r',ol:C.ink})}
  const y0=RMY+RMH;panel(0,y0,W,H-y0,{fill:'#efe2bf'});const sn=rmSeen(sel),I=RINFO[sel],nm=sn?(MAPS[sel]?.name.split(' · ').pop()||RMAP[sel][2]):'???';
  txt(nm,14,y0+24,C.ink);txt(sn?I[0].toUpperCase():'INEXPLORÉ',14,y0+36,C.mute,{mini:1});if(sel===cur)txt('TU ES ICI',W-14,y0+24,C.acc,{mini:1,al:'r'});else if(flyOk(sel,cur))txt('A : S\'ENVOLER',W-14,y0+24,C.blue,{mini:1,al:'r'});
  wrap(sn?I[2]:'Un lieu que tu n\'as pas encore visité. Le brouillard le cache encore.',260,1).slice(0,3).forEach((l,i)=>txt(l,14,y0+52+i*11,C.ink2,{s:1,sh:0}));
  if(sn){const L=rmSpecies(sel);if(L.length){const c=L.filter(s=>G.dex?.[s]===2).length;txt(`PIXÉMONS ${c}/${L.length}`,W-14,y0+38,C.ink,{mini:1,al:'r'});L.slice(0,8).forEach((s,i)=>{const im=monSpr(s,0,48),x=W-30-(i%4)*24,y=y0+44+(i/4|0)*22;X.drawImage(G.dex?.[s]?im:silh(im,'#8a80a6'),x,y,22,22)})}
   const bd=RBADGE[sel];if(bd)X.drawImage(f()[bd[0]]?ICO[bd[1]]:silh(ICO[bd[1]],'#b0a8c0'),22+tw(nm,2),y0+10,16,16)}
  };
 const pick=d=>{const[sx,sy]=rmXY(sel),[vx,vy]={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[d];let b=null,bs=1e9;for(const k of K){if(k===sel)continue;const[x,y]=rmXY(k),dx=x-sx,dy=y-sy,dd=Math.hypot(dx,dy),c=(dx*vx+dy*vy)/dd;if(c<.45)continue;const sc=dd*(2-c);if(sc<bs){bs=sc;b=k}}return b};
 for(;;){const k=await key();if(k==='a'&&flyOk(sel,cur)){if(await flyTo(sel))return true;continue}if(k==='a'||k==='b'||k==='start')break;const n=pick(k);if(n){sel=n;sfx('sel')}}ui.panel=null};
