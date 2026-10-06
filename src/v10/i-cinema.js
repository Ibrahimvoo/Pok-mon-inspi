// =====================================================================
// 13.0 — LE GRAND ÉCRAN : cinématiques plein écran (décors peints, caméra, particules, VFX)
// =====================================================================
const CNB=mkc(W,H,()=>{}),CNG=CNB.getContext('2d');let CN=null;
const cnRng=s=>()=>(s=(s*16807+11)%2147483647)/2147483647;
function cnNoise(d=.8,v=.5,f0=900,f1=60){try{if(!AC||!G?.opt?.snd||CN?.skip)return;const t=AC.currentTime,n=AC.sampleRate*d|0,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n)**1.5;
 const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;fl.type='lowpass';fl.frequency.setValueAtTime(f0,t);fl.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+d);g.gain.value=v*.3*VOL('sv');s.connect(fl).connect(g).connect(AC.destination);s.start()}catch(e){}}
// --- Pinceaux ---
function cnSky(g,stops,y0=0,y1=H){for(let y=y0;y<y1;y+=4){const p=(y-y0)/(y1-y0);let i=0;while(i<stops.length-2&&p>stops[i+1][0])i++;const[a,ca]=stops[i],[b,cb]=stops[i+1],k=Math.max(0,Math.min(1,(p-a)/(b-a||1)));R(g,mix(ca,cb,Math.round(k*8)/8),0,y,W,4)}}
function cnStars(g,T,n=90,ymax=H,a=1,seed=7){if(a<=0)return;const r=cnRng(seed);for(let i=0;i<n;i++){const x=r()*W|0,y=r()*ymax|0,s=r()<.12?2:1,tw=Math.sin(T/400+i*1.7);if(tw<-.6)continue;g.globalAlpha=a*(.55+.45*tw);R(g,i%7?'#e8e4ff':'#fff0b0',x,y,s,s)}g.globalAlpha=1}
function cnRidge(g,seed,base,amp,col,off=0,step=2){for(let x=0;x<W;x+=step){const u=x+off,h=base-amp*(.5*Math.sin(u*.011+seed)+.3*Math.sin(u*.029+seed*2.3)+.2*Math.sin(u*.071+seed*3.7));R(g,col,x,ev(h),step,H)}}
function cnGlow(g,x,y,r,col,a=1){if(r<=0||a<=0)return;g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,a);const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);g.globalAlpha=1;g.globalCompositeOperation='source-over'}
function cnRays(g,x,y,n,len,col,a,rot=0,wd=.12){g.globalCompositeOperation='lighter';g.globalAlpha=a;g.fillStyle=col;for(let i=0;i<n;i++){const an=rot+i*Math.PI*2/n;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an-wd)*len,y+Math.sin(an-wd)*len);g.lineTo(x+Math.cos(an+wd)*len,y+Math.sin(an+wd)*len);g.fill()}g.globalAlpha=1;g.globalCompositeOperation='source-over'}
function cnDisc(g,x,y,r,c){pell(g,ev(x),ev(y),Math.round(r),Math.round(r),c)}
function cnSpr(g,img,x,y,w,h,o={}){if(!img||(o.a??1)<=0)return;g.save();g.globalAlpha=o.a??1;g.translate(ev(x),ev(y));if(o.fl)g.scale(-1,1);g.drawImage(o.sil?silh(img,o.sil):img,-w/2,-h/2,w,h);if(o.tint&&o.tk>0){g.globalAlpha=(o.a??1)*o.tk;g.drawImage(silh(img,o.tint),-w/2,-h/2,w,h)}g.restore()}
const cnMon=(sp,N=96)=>monSpr(sp,0,N);
function cnBolt(g,x1,y1,x2,y2,col,w=2){const n=8;let px=x1,py=y1;for(let i=1;i<=n;i++){const k=i/n,nx=x1+(x2-x1)*k+(i<n?(Math.random()-.5)*22:0),ny=y1+(y2-y1)*k+(i<n?(Math.random()-.5)*22:0);g.strokeStyle=col;g.lineWidth=w+2;g.globalAlpha=.35;g.beginPath();g.moveTo(px,py);g.lineTo(nx,ny);g.stroke();g.globalAlpha=1;g.lineWidth=w;g.strokeStyle='#ffffff';g.stroke();px=nx;py=ny}}
function cnGem(g,x,y,s,T){const c=[C.goldL,C.gold,'#ffffff'];g.fillStyle=c[1];g.beginPath();g.moveTo(x,y-s);g.lineTo(x+s*.7,y);g.lineTo(x,y+s);g.lineTo(x-s*.7,y);g.fill();g.fillStyle=c[0];g.beginPath();g.moveTo(x,y-s);g.lineTo(x+s*.35,y-s*.1);g.lineTo(x,y+s*.3);g.lineTo(x-s*.35,y-s*.1);g.fill();cnGlow(g,x,y,s*4+Math.sin(T/120)*3,'rgba(255,230,140,.9)',.8)}
// --- Particules ---
function cnEmit(n,o){if(!CN)return;for(let i=0;i<n;i++){const a=(o.a0??0)+Math.random()*((o.a1??Math.PI*2)-(o.a0??0)),v=(o.v0??1)+Math.random()*((o.v1??3)-(o.v0??1)),l=(o.l??40)*(.7+Math.random()*.6);
 CN.P.push({k:o.k||'sp',x:o.x+(Math.random()-.5)*(o.sx||0),y:o.y+(Math.random()-.5)*(o.sy||0),vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:o.g??0,dr:o.dr??.98,l,ml:l,c:Array.isArray(o.c)?o.c[i%o.c.length]:o.c||'#ffffff',s:(o.s??2)*(.6+Math.random()*.8),gr:o.gr??0,r:Math.random()*6,vr:(Math.random()-.5)*(o.spin??.3),gy:o.gy??999,tx:o.tx,ty:o.ty,w:o.w??3})}}
function cnParts(g){if(!CN)return;CN.P=CN.P.filter(p=>{p.l--;if(p.l<=0)return false;const k=p.l/p.ml;
 if(p.k==='st'){const dx=p.tx-p.x,dy=p.ty-p.y,d=Math.hypot(dx,dy);if(d<6)return false;p.vx=p.vx*.9+dx/d*.9;p.vy=p.vy*.9+dy/d*.9}
 p.vx*=p.dr;p.vy*=p.dr;p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.s+=p.gr;
 if(p.y>p.gy){p.y=p.gy;p.vy*=-.32;p.vx*=.6;p.vr*=.5}
 const x=ev(p.x),y=ev(p.y);
 if(p.k==='rk'){g.save();g.translate(x,y);g.rotate(p.r);g.fillStyle=p.c;g.beginPath();for(let i=0;i<5;i++){const a=i*1.256,rr2=p.s*(i%2?.75:1);i?g.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2):g.moveTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}g.fill();g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-p.s*.5,-p.s*.6,p.s*.6,p.s*.35);g.restore()}
 else if(p.k==='sh'){g.save();g.translate(x,y);g.rotate(p.r);g.globalAlpha=Math.min(1,k*2)*.85;g.fillStyle=(p.l>>2)%3?p.c:'#ffffff';g.beginPath();g.moveTo(0,-p.s);g.lineTo(p.s*.5,p.s);g.lineTo(-p.s*.4,p.s*.6);g.fill();g.restore();g.globalAlpha=1}
 else if(p.k==='du'){g.globalAlpha=Math.min(.55,k)*.8;cnDisc(g,x,y,p.s,p.c);g.globalAlpha=1}
 else if(p.k==='fb'){const c=k>.75?'#fff6d0':k>.5?C.gold:k>.3?'#e8702e':'#4a3a3a';g.globalAlpha=Math.min(1,k*1.6);cnDisc(g,x,y,p.s,c);g.globalAlpha=1;if(k>.4)cnGlow(g,x,y,p.s*2,'rgba(255,160,60,.6)',k)}
 else if(p.k==='ri'){g.globalAlpha=k;g.strokeStyle=p.c;g.lineWidth=Math.max(1,p.w*k);g.beginPath();g.ellipse(x,y,p.s,p.s*(p.fy||.35),0,0,Math.PI*2);g.stroke();g.globalAlpha=1}
 else if(p.k==='gl')cnGlow(g,x,y,p.s,p.c,k);
 else{g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,k*1.5);const s=Math.max(1,ev(p.s));R(g,p.c,x,y,s,s);if(p.k==='sp'&&s>1){g.globalAlpha*=.4;R(g,p.c,ev(p.x-p.vx*2),ev(p.y-p.vy*2),s,s)}g.globalAlpha=1;g.globalCompositeOperation='source-over'}
 return true});if(CN.P.length>900)CN.P.splice(0,CN.P.length-900)}
const cnRing=(x,y,c='#ffffff',v=6,l=30,fy=.35,w=4)=>CN?.P.push({k:'ri',x,y,vx:0,vy:0,g:0,dr:1,l,ml:l,c,s:4,gr:v,r:0,vr:0,gy:999,w,fy});
// --- Rendu ---
function drawCine(){const c=CN;R(X,'#000000',0,0,W,H);if(!c)return;const g=CNG,T=now()-c.s0;g.imageSmoothingEnabled=false;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';
 try{c.draw?.(g,T,c)}catch(e){console.error(e)}cnParts(g);if(c.fl>0){g.globalAlpha=Math.min(1,c.fl);R(g,c.flC,0,0,W,H);g.globalAlpha=1;c.fl=Math.max(0,c.fl-.045)}
 const z=Math.max(1,c.cam.z),sh=c.sh,ox=ev((Math.random()-.5)*sh*2),oy=ev((Math.random()-.5)*sh*2);c.sh=Math.max(0,c.sh*.9-.04);
 const sx=Math.max(0,Math.min(W-W/z,c.cam.x-W/2/z)),sy=Math.max(0,Math.min(H-H/z,c.cam.y-H/2/z));X.drawImage(CNB,sx,sy,W/z,H/z,ox,oy,W,H);
 const S=c.sub,L=S?wrap(S.s,440,2):[],hb=Math.max(26,L.length*22+(S?.who?30:12));c.lbh+=((S?hb:26)-c.lbh)*.2;const h=ev(c.lbh*c.lb);R(X,'#000000',0,0,W,ev(26*c.lb));R(X,'#000000',0,H-h,W,h);
 if(S&&c.lb>.9){let n=Math.floor((now()-S.t0)*.07),y=H-h+(S.who?36:24);if(S.who)txt(S.who,20,H-h+20,C.gold,{mini:1});L.forEach(l=>{const s=l.slice(0,Math.max(0,n));n-=l.length+1;txt(s,20,y,'#f4f0ff',{});y+=22})}
 if(c.card){const k=Math.min(1,(now()-c.card.t0)/600);X.globalAlpha=k;if(c.card.logo)logo();else txt(c.card.t,W/2,150,C.goldL,{s:3,al:'c',ol:C.ink,olw:3});if(c.card.s)txt(c.card.s,W/2,c.card.logo?186:178,'#e8e4ff',{al:'c'});X.globalAlpha=1}
 if(c.ask&&now()-c.ask<2500&&!c.skip)txt('B ENCORE : PASSER',W-10,18,'#ffffff',{mini:1,al:'r'})}
// --- Lecteur ---
function cnApi(){const sk=()=>!CN||CN.skip,A={
 w:async ms=>{const e=now()+ms;while(now()<e&&!sk())await frame()},
 sub:async(s,who,ms)=>{if(sk())return;CN.adv=0;CN.sub={s,who,t0:now()};const e=now()+(ms??1500+s.length*42);while(now()<e&&!sk()&&!CN.adv)await frame();if(CN)CN.sub=null;await A.w(120)},
 subN:(s,who)=>{if(!sk())CN.sub={s,who,t0:now()}},clr:()=>{if(CN)CN.sub=null},
 tw:async(o,k,to,ms,e=1)=>{const f=o[k],t0=now();for(;;){const p=sk()?1:Math.min(1,(now()-t0)/ms),q=e===2?p*p*(3-2*p):e?1-(1-p)**3:p;o[k]=f+(to-f)*q;if(p>=1)return;await frame()}},
 cam:(x,y,z,ms=900,e=2)=>Promise.all([A.tw(CN.cam,'x',x,ms,e),A.tw(CN.cam,'y',y,ms,e),A.tw(CN.cam,'z',z,ms,e)]),
 shot:(fn,cam=[W/2,H/2,1])=>{if(!CN)return;CN.draw=fn;CN.s0=now();CN.P=[];CN.cam={x:cam[0],y:cam[1],z:cam[2]}},
 cut:async(fn,cam,ms=260)=>{await A.fd(1,ms);A.shot(fn,cam);await A.fd(0,ms)},
 fd:(v,ms)=>sk()?(ui.fade=v,Promise.resolve()):fadeTo(v,ms),
 q:v=>{if(!sk())CN.sh=Math.max(CN.sh,v)},fl:(a,c='#ffffff')=>{if(!sk()){CN.fl=a;CN.flC=c}},
 s:k=>{if(!sk())sfx(k)},n:(...a)=>cnNoise(...a),m:k=>{if(!sk())musPlay(k)},
 card:async(t,s,ms=2600,logo)=>{if(sk())return;CN.card={t,s,logo,t0:now()};await A.w(ms);if(CN)CN.card=null},sk};return A}
const CINE={};const CINT={};
async function cinema(id,o={}){const S=CINE[id];if(!S||CN)return;G.cin??={};G.cin[id]=1;const pm=mode,mw=mus.want,lb=ui.lb;
 await fadeTo(1,320);mode='cine';ui.lb=0;ui.text=null;CN={id,s0:now(),cam:{x:W/2,y:H/2,z:1},sh:0,P:[],fl:0,flC:'#ffffff',lb:1,lbh:26,sub:null,skip:0};
 const kw=k=>{if(!CN)return;if(k==='b'){if(CN.ask&&now()-CN.ask<2500)CN.skip=1;else CN.ask=now()}else if(k==='a')CN.adv=1;if(!CN.skip)waiters.push(kw)};waiters.push(kw);
 const A=cnApi(),run=S(A);fadeTo(0,500);try{await run}catch(e){console.error(e)}
 const i=waiters.indexOf(kw);if(i>=0)waiters.splice(i,1);await fadeTo(1,CN.skip?120:420);CN=null;mode=pm;ui.lb=lb;musStop();if(mw)musPlay(mw);if(!o.dark)await fadeTo(0,320)}

// =====================================================================
// DÉCORS PARTAGÉS
// =====================================================================
const cnMix=(a,b,k)=>mix(a,b,Math.max(0,Math.min(1,Math.round(k*8)/8)));
// Panorama d'Aurélys : ec 0 = plein jour, 1 = éclipse totale ; mx = décalage de la lune ; dawn = teinte d'aube
function cnPano(g,T,s){const ec=s.ec||0,dn=s.dawn||0,top=cnMix(cnMix('#3a78d8','#2a1840',ec),'#5a4a9a',dn),hz=cnMix(cnMix('#a8d8f0','#5a2a5a',ec),'#f6a868',dn);cnSky(g,[[0,top],[1,hz]],0,220);
 cnStars(g,T,80,170,ec*.95);const sx=240,sy=70;if(ec<.9)cnRays(g,sx,sy,12,220,'#fff4c0',.12*(1-ec),T/6000);cnGlow(g,sx,sy,90,ec>.7?'rgba(200,140,255,.9)':'rgba(255,240,180,.9)',.9);cnDisc(g,sx,sy,22,'#fff6d0');
 if(ec>.6){g.globalAlpha=(ec-.6)*2.5;g.strokeStyle='#f0d0ff';g.lineWidth=2;g.beginPath();g.arc(sx,sy,25+Math.sin(T/200)*1.5,0,7);g.stroke();cnRays(g,sx,sy,16,60,'#e0b0ff',.25*(ec-.6),T/3000,.05);g.globalAlpha=1}
 {const m=s.mx??60,ma=Math.max(0,Math.min(1,1-(Math.abs(m)-36)/40));if(ma>0){g.globalAlpha=ma;cnDisc(g,sx+m,sy,22,'#1e1428');g.globalAlpha=1}}
 const dk=k=>c=>cnMix(c,'#140c24',k*ec*.75);const d=dk(1);
 cnRidge(g,1,170,40,d(cnMix('#7a8ac8','#c890a8',dn)),T/400);cnRidge(g,4,196,26,d(cnMix('#5a7a9a','#b07a88',dn)),T/250);
 R(g,d('#6aa858'),0,214,W,H);pell(g,150,246,90,14,d('#7ac0e0'));if((T/300|0)%2)R(g,d('#c8f0ff'),120,242,20,2);R(g,d('#c8f0ff'),168,250,14,2);
 for(let i=0;i<5;i++){const x=300+i*30,y=226+(i%2)*6;R(g,d('#e8dcc0'),x,y,14,10);g.fillStyle=d('#c84848');g.beginPath();g.moveTo(x-2,y);g.lineTo(x+7,y-7);g.lineTo(x+16,y);g.fill();if(ec>.5||dn>.3)R(g,'#ffd870',x+5,y+4,3,3)}
 cnRidge(g,7,262,10,d('#3f7a3a'),T/120,4);cnRidge(g,9,300,8,d('#2c5a2c'),T/80,4);
 if(s.sweep!=null){const x=s.sweep;g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(x-80,0,x+80,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'rgba(255,230,170,.45)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-80,0,160,H);g.globalCompositeOperation='source-over'}}
// Ciel des légendes (prologue) : d = 0 nuit, 1 jour
function cnLegendSky(g,T,s){const d=s.day;cnSky(g,[[0,cnMix('#0b0820','#3a6ac0',d)],[.7,cnMix('#2a1f4a','#f6b070',d)],[1,cnMix('#3a2a5a','#ffd8a0',d)]],0,240);cnStars(g,T,110,200,1-d)}
function cnLand(g,T,s,col1='#2a2550',col2='#1a1638'){const d=s.day||0;cnRidge(g,2,200,46,cnMix(col1,'#5a6aa0',d),T/500);cnRidge(g,5,232,24,cnMix(col2,'#3a4a78',d),T/300);R(g,cnMix('#120e24','#2a3a4a',d),0,262,W,H)}

// =====================================================================
// 1. PROLOGUE — La légende du Cycle
// =====================================================================
CINT.prologue='La légende du Cycle';
CINE.prologue=async A=>{const s={day:0,sunY:300,solA:0,moonY:-40,nocA:0,ang:0,ch:0,beam:0,seal:0,noc2:1,fade2:0};A.m('sanct');
 const sky=(g,T)=>{cnLegendSky(g,T,s);if(s.sunY<300){cnRays(g,240,s.sunY,14,260,'#fff0c0',.18*s.day,T/5000);cnGlow(g,240,s.sunY,110,'rgba(255,220,140,.9)',.9);cnDisc(g,240,s.sunY,30,'#fff2c8')}
  if(s.moonY>-40){cnGlow(g,240,s.moonY,90,'rgba(170,140,255,.8)',.7);cnDisc(g,240,s.moonY,24,'#e8e4ff');cnDisc(g,232,s.moonY-6,5,'#c8c0e8');cnDisc(g,248,s.moonY+6,4,'#c8c0e8')}cnLand(g,T,s)};
 A.shot((g,T)=>{sky(g,T);if(s.solA>0){cnRays(g,240,s.sunY,10,180,C.goldL,.25*s.solA,-T/2500,.08);cnSpr(g,cnMon('solarion'),240,s.sunY-8+Math.sin(T/400)*4,192,192,{a:s.solA});if(Math.random()<.4)cnEmit(1,{k:'em',x:240,y:s.sunY,sx:120,sy:80,a0:-1.9,a1:-1.2,v0:.3,v1:1,c:[C.gold,C.goldL],l:70})}},[240,90,1.6]);
 await A.w(600);A.subN('Il y a bien longtemps, Aurélys vivait au rythme du Cycle.');A.tw(s,'day',1,4200,2);A.tw(s,'sunY',110,4200,2);await A.cam(240,160,1,4200);await A.w(400);
 A.s('cry');A.fl(.7,C.goldL);A.q(5);A.n(1.2,.4,500,80);A.tw(s,'solA',1,900);await A.sub('Le jour, Solarion veillait sur les hommes et sur les champs.');
 await A.cut((g,T)=>{sky(g,T);if(s.nocA>0){cnGlow(g,240,s.moonY+10,120,'rgba(150,90,230,.9)',.7*s.nocA);cnSpr(g,cnMon('nocturion'),240,s.moonY+14+Math.sin(T/500)*5,192,192,{a:s.nocA});if(Math.random()<.5)cnEmit(1,{k:'em',x:240,y:s.moonY+20,sx:160,sy:90,a0:1.2,a1:1.9,v0:.2,v1:.8,c:['#c060ff','#8a70e0','#ffffff'],l:80})}},[240,140,1.2]);
 Object.assign(s,{day:0,sunY:300,moonY:40});A.tw(s,'moonY',100,3000,2);A.cam(240,160,1,3000);await A.w(1600);A.s('cry');A.q(4);A.tw(s,'nocA',1,1200);await A.sub('La nuit, Nocturion gardait les rêves et les créatures de l\'ombre.');
 // La danse des gardiens
 await A.cut((g,T)=>{cnSky(g,[[0,'#2a1f4a'],[.5,'#6a4a8a'],[1,'#f0a070']],0,H);cnStars(g,T,60,140,.6);cnGlow(g,120,140,160,'rgba(255,200,120,.6)',.5);cnGlow(g,360,140,160,'rgba(150,90,230,.6)',.5);
  const a=s.ang,p1=[240+Math.cos(a)*120,150+Math.sin(a)*46],p2=[240+Math.cos(a+Math.PI)*120,150+Math.sin(a+Math.PI)*46];
  cnEmit(2,{k:'em',x:p1[0],y:p1[1],sx:30,sy:20,v0:.1,v1:.5,c:[C.gold,C.goldL],l:60});cnEmit(2,{k:'em',x:p2[0],y:p2[1],sx:30,sy:20,v0:.1,v1:.5,c:['#c060ff','#e0c0ff'],l:60});
  const D=[[p1,'solarion',Math.sin(a)],[p2,'nocturion',Math.sin(a+Math.PI)]].sort((x,y)=>x[2]-y[2]);for(const[p,sp,z]of D){const sz=112+z*24;cnSpr(g,cnMon(sp),p[0],p[1],sz,sz,{fl:sp==='nocturion'})}
  cnRidge(g,3,268,18,'#1a1430',0);R(g,'#120e24',0,286,W,H)});
 A.tw(s,'ang',Math.PI*3,7000,0);await A.sub('Ensemble, ils se partageaient le ciel. Aucun ne régnait sur l\'autre.');await A.w(1800);
 // Le sceau des fondateurs
 const FD=['old','prof','granny','astro','captain'];
 await A.cut((g,T)=>{cnSky(g,[[0,'#0b0820'],[1,'#2a1f4a']],0,H);cnStars(g,T,90,180,1);cnRidge(g,6,200,18,'#1a1638',0);R(g,'#141026',0,214,W,H);
  const cx=240,cy=232,nx=240+(s.ch>.5?(Math.random()-.5)*6*s.ch:0),ny=s.nocY??96;
  if(s.seal>0){g.save();g.translate(cx,cy);g.scale(1,.32);g.rotate(T/1500);g.globalAlpha=s.seal;g.strokeStyle=C.gold;g.lineWidth=4;g.beginPath();g.arc(0,0,130,0,7);g.stroke();g.beginPath();g.arc(0,0,96,0,7);g.stroke();
   for(let i=0;i<6;i++){const a=i*Math.PI/3;g.beginPath();g.moveTo(Math.cos(a)*130,Math.sin(a)*130);g.lineTo(Math.cos(a+2.09)*130,Math.sin(a+2.09)*130);g.stroke()}g.restore();g.globalAlpha=1;cnGlow(g,cx,cy,150,'rgba(255,210,110,.7)',.5*s.seal)}
  if(s.noc2>0){cnGlow(g,nx,ny,110,'rgba(150,90,230,.9)',.7*s.noc2);cnSpr(g,cnMon('nocturion'),nx,ny,176*s.noc2,176*s.noc2,{tint:'#ffe8a0',tk:s.ch*.35})}
  FD.forEach((k,i)=>{const fx=72+i*84,fy=226+(i%2)*8;cnSpr(g,chr(k,3,0),fx,fy-32,48,96,{sil:'#08060f'});
   if(s.ch>0){const e=s.ch,hx=fx,hy=fy-60;g.strokeStyle='rgba(255,220,120,.35)';g.lineWidth=5;g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+(nx-hx)*e,hy+(ny-hy)*e);g.stroke();g.strokeStyle=C.goldL;g.lineWidth=2;for(let j=0;j<=14&&j/14<=e;j++){const q=j/14;g.strokeRect(ev(hx+(nx-hx)*q)-3,ev(hy+(ny-hy)*q)-2,6,4)}cnGlow(g,hx+(nx-hx)*e,hy+(ny-hy)*e,18,'rgba(255,230,150,.9)',.8)}});
  if(s.beam>0){const w=12*s.beam+Math.random()*4;g.globalCompositeOperation='lighter';R(g,'#8a40e0',nx-w,ny+40,w*2,cy-ny-40);R(g,'#e0c0ff',nx-w/3,ny+40,w*2/3,cy-ny-40);g.globalCompositeOperation='source-over';cnGlow(g,cx,cy-6,60+Math.random()*20,'rgba(200,140,255,.9)',1)}});
 s.nocY=86;await A.sub('Mais les fondateurs d\'Aurélys avaient peur de la nuit.');A.s('shard');A.tw(s,'seal',1,900);await A.w(700);
 A.subN('Ils volèrent un peu de la lumière de Solarion… pour en faire des chaînes.');A.s('shard');await A.tw(s,'ch',1,1800,2);A.q(6);await A.w(600);
 A.s('roar');A.n(1.6,.8,700,50);A.q(14);A.fl(.5,'#3a1a5a');cnRing(240,86,'#c060ff',5,40,1,3);await A.w(500);
 A.clr();A.tw(s,'beam',1,250);for(let i=0;i<10;i++){A.q(9);cnEmit(10,{k:'sp',x:240,y:226,a0:-Math.PI,a1:0,v0:2,v1:6,g:.15,c:['#e0c0ff','#c060ff',C.goldL],l:30});if(i%3===0){cnRing(240,232,C.goldL,7,26);A.n(.4,.6,1400,200)}await A.w(110)}
 s.beam=0;A.fl(1);A.n(1.2,.9,1600,40);A.subN('Nocturion se débattit… mais le sceau tint bon.');for(let i=0;i<3;i++)cnRing(240,232,'#ffffff',9-i*2,40);await A.w(900);
 A.tw(s,'nocY',200,1600,2);await A.tw(s,'noc2',0,1600,2);cnEmit(60,{k:'em',x:240,y:200,sx:40,sy:30,a0:-2.4,a1:-.7,v0:1,v1:4,c:['#c060ff','#ffffff',C.goldL],l:60});A.fl(.8,'#e0c0ff');A.s('lv');await A.w(1600);
 // Des jours sans fin
 await A.cut((g,T)=>{cnSky(g,[[0,'#5a98e8'],[.8,'#c8e8f8'],[1,'#f8f0d0']],0,H);cnRays(g,240,40,14,320,'#fff8d0',.16,T/7000);cnGlow(g,240,40,130,'rgba(255,240,180,.9)',.9);cnDisc(g,240,40,34,'#fffbe8');
  cnRidge(g,2,210,36,'#7a9ac8',T/700);cnRidge(g,5,240,22,'#5a8a6a',T/500);R(g,'#4a8a4a',0,262,W,H);
  ['ombrelin','noctyrex','eclipsoeil'].forEach((sp,i)=>{const x=150+i*90,a=Math.max(0,1-Math.max(0,(T-1800-i*700)/1400));cnSpr(g,cnMon(sp,64),x,250,72,72,{a,sil:'#2a2040'});if(a>0&&a<1&&Math.random()<.5)cnEmit(2,{k:'em',x,y:250,sx:40,sy:40,a0:-1.9,a1:-1.2,v0:.4,v1:1.2,c:['#3a2a5a','#8a70e0'],l:50})})},[240,180,1.15]);
 A.cam(240,160,1,5000);await A.sub('Depuis, les nuits d\'Aurélys raccourcissent, d\'année en année…');await A.sub('…et les créatures de l\'ombre s\'éteignent, une à une.');await A.w(800);
 await A.cut((g,T)=>{R(g,'#08060f',0,0,W,H);cnStars(g,T,70,H,.7)});await A.card('','La légende du Cycle',3000,1)};

// =====================================================================
// 2. LA MINE S'EFFONDRE
// =====================================================================
CINT.mine='L\'effondrement de la mine';
let CNMINE=null;
const cnMineBg=()=>CNMINE||(CNMINE=mkc(W,H,g=>{const r=cnRng(3);cnSky(g,[[0,'#2a1e18'],[.6,'#3a2a20'],[1,'#1a1410']]);
 for(let i=0;i<420;i++){const x=r()*W|0,y=r()*230|0,w=6+r()*28|0,h=4+r()*14|0;R(g,['#4a3a2e','#3a2c22','#5a4636','#2e241c'][i%4],ev(x),ev(y),ev(w),ev(h))}
 for(let i=0;i<40;i++)R(g,'#8ac8d8',ev(r()*W),ev(r()*220),2,2);R(g,'#2a2018',0,250,W,H);for(let x=0;x<W;x+=24)R(g,'#5a4430',x,262,14,4);R(g,'#8a8a92',0,258,W,3);R(g,'#8a8a92',0,268,W,3)}));
CINE.mine=async A=>{const s={cx:150,ch:1,blink:0,beam:0,crack:0,pile:0,dark:0,lan:[1,1,1],run:0};A.m('base');
 const lanX=[90,240,390];
 A.shot((g,T)=>{g.drawImage(cnMineBg(),0,0);
  for(const x of[60,420])R(g,'#6a4a2c',x,70,16,190),R(g,'#8a6440',x+2,70,4,190);
  g.save();g.translate(52,72);g.rotate(s.beam);R(g,'#6a4a2c',0,0,392,16);R(g,'#8a6440',0,2,392,4);g.restore();
  if(s.crack>0){g.strokeStyle='#120c08';g.lineWidth=2;const r=cnRng(9);for(let j=0;j<5;j++){let x=80+j*80,y=20;g.beginPath();g.moveTo(x,y);for(let i=0;i<8*s.crack;i++){x+=(r()-.5)*30;y+=8+r()*6;g.lineTo(x,y)}g.stroke()}}
  lanX.forEach((x,i)=>{if(!s.lan[i])return;const a=Math.sin(T/300+i)*.2*(1+s.ch*3),lx=x+Math.sin(a)*24,ly=110+Math.cos(a)*24;g.strokeStyle='#2a2018';g.lineWidth=1;g.beginPath();g.moveTo(x,88);g.lineTo(lx,ly);g.stroke();R(g,'#3a3a40',ev(lx)-5,ev(ly),10,12);R(g,'#ffd870',ev(lx)-3,ev(ly)+2,6,8);cnGlow(g,lx,ly+6,70,'rgba(255,190,90,.8)',.7)});
  if(s.pile>0){g.fillStyle='#3a2c22';g.beginPath();g.moveTo(330,262);for(let x=330;x<=W;x+=10)g.lineTo(x,262-s.pile*(150+Math.sin(x*.3)*16)*Math.min(1,(x-330)/60));g.lineTo(W,262);g.fill();g.fillStyle='#5a4636';for(let i=0;i<14;i++)R(g,'#5a4636',ev(340+i*10),ev(262-s.pile*(40+i*6%60)),10,8)}
  if(s.ch){R(g,'#8a2a2a',232,244,18,14);R(g,'#5a1a1a',232,254,18,4);if((T/(260-s.blink*200)|0)%2)R(g,'#ff4040',238,240,6,4),cnGlow(g,241,242,20,'rgba(255,60,60,.9)',.9);if(Math.random()<.5)cnEmit(1,{x:251,y:244,a0:-2,a1:-1,v0:.5,v1:1.6,g:.05,c:[C.gold,'#ffffff'],l:12})}
  cnSpr(g,chr('grunt',s.run?2:3,s.run?(T/90|0)%3:0),s.cx,226,48,96);
  if(s.dark>0){g.globalAlpha=s.dark;R(g,'#06040a',0,0,W,H);g.globalAlpha=1;if(s.lan[1])cnGlow(g,240,116,60,'rgba(255,190,90,.6)',.6)}
  if(s.ch===0&&Math.random()<.3)cnEmit(1,{k:'du',x:Math.random()*W,y:Math.random()*260,v0:.1,v1:.3,c:'#8a7a6a',s:3,gr:.05,l:120})},[200,200,1.3]);
 await A.sub('Tu veux me suivre, gamin ? Essaie un peu !','Lieutenant Corvin');A.s('alert');A.cam(240,220,1.35,700);await A.sub('Un petit cadeau d\'adieu… Bonne chance pour sortir d\'ici !','Lieutenant Corvin');
 s.run=1;A.s('run');A.tw(s,'cx',560,1100,0);A.cam(240,230,1.6,900);for(let i=0;i<6;i++){A.s('alert');s.blink=i/6;await A.w(330-i*40)}
 // Explosion
 s.ch=0;A.fl(1,'#fff6d0');A.q(18);A.n(1.8,1,1500,40);A.s('roar');A.cam(240,160,1,260,1);
 cnEmit(26,{k:'fb',x:241,y:246,sx:20,sy:10,a0:-Math.PI,a1:0,v0:1,v1:4,dr:.92,s:10,gr:.6,l:50});cnEmit(50,{k:'sp',x:241,y:246,a0:-Math.PI,a1:0,v0:3,v1:9,g:.2,c:[C.gold,'#ffffff','#e8702e'],l:40});
 cnEmit(24,{k:'rk',x:241,y:246,a0:-2.8,a1:-.3,v0:3,v1:8,g:.3,dr:.99,c:['#5a4636','#4a3a2e','#6a5444'],s:6,spin:.5,gy:262,l:140});cnRing(241,250,'#fff0c0',9,28);cnRing(241,250,'#ffffff',6,34);
 await A.w(700);A.subN('La galerie s\'effondre !');
 for(let i=0;i<22;i++){A.q(7);cnEmit(2,{k:'rk',x:60+Math.random()*360,y:30,a0:1.4,a1:1.7,v0:.5,v1:2,g:.35,c:['#5a4636','#4a3a2e','#3a2c22'],s:4+Math.random()*6,spin:.4,gy:262,l:160});cnEmit(3,{k:'du',x:Math.random()*W,y:255,sx:40,a0:Math.PI,a1:Math.PI*2,v0:.3,v1:1.2,dr:.97,c:['#6a5a4a','#8a7a6a'],s:6,gr:.35,l:90});
  if(i===6){s.crack=.01;A.tw(s,'crack',1,1400);A.n(1.4,.7,400,40)}if(i===10){A.s('hit');A.tw(s,'beam',.42,500,0).then(()=>{A.q(16);A.n(.8,.9,800,40);cnEmit(30,{k:'du',x:300,y:250,sx:200,a0:Math.PI,a1:Math.PI*2,v0:.5,v1:2,c:['#6a5a4a','#8a7a6a'],s:8,gr:.4,l:100})})}
  if(i===12){s.lan[2]=0;A.s('bump');cnEmit(12,{x:390,y:120,v0:1,v1:3,g:.2,c:[C.gold,'#ffffff'],l:20})}if(i===15){s.lan[0]=0;A.s('bump')}A.tw(s,'pile',Math.min(1,i/16),200);if(i%4===0)A.n(.7,.6,600,50);await A.w(160)}
 A.tw(s,'dark',.72,1600);await A.w(1200);A.clr();await A.sub('…Le passage derrière Corvin est bouché. Impossible de le poursuivre.');await A.w(400)};

// =====================================================================
// 3. L'ÉCLIPSE — le vol du Cœur d'Aube au Mont Braise
// =====================================================================
CINT.eclipse='Le vol du Cœur d\'Aube';
CINE.eclipse=async A=>{const s={solY:330,pulse:0,drain:0,gem:0,vexX:96,ec:0,mx:-150,beam:0};A.m('final');
 const crater=(g,T)=>{cnSky(g,[[0,'#3a1a2a'],[.5,'#8a3a2a'],[1,'#e8702e']],0,H);if(Math.random()<.6)cnEmit(1,{k:'du',x:Math.random()*W,y:-4,a0:1.3,a1:1.8,v0:.3,v1:.8,c:'#5a4a4a',s:1,l:300});
  cnRidge(g,8,170,30,'#2a1820',T/600);const lv=.6+.4*Math.sin(T/180);cnGlow(g,240,250,180,'rgba(255,120,40,.9)',.6*lv+s.pulse*.4)};
 const rim=g=>{g.fillStyle='#1a1014';g.beginPath();g.moveTo(0,H);g.lineTo(0,240);g.lineTo(140,258);g.lineTo(180,250);g.lineTo(300,250);g.lineTo(340,258);g.lineTo(W,236);g.lineTo(W,H);g.fill();R(g,'#ff8a3a',180,250,120,3);
  for(const[x,y]of[[60,270],[120,290],[380,276],[420,300]]){R(g,'#ff6a2a',x,y,ev(10+x%7),2);cnGlow(g,x,y,14,'rgba(255,120,40,.8)',.6)}};
 A.shot((g,T)=>{crater(g,T);if(s.solY<330){cnRays(g,240,s.solY,12,260,C.goldL,.22,T/2000);cnGlow(g,240,s.solY,120,'rgba(255,220,120,.9)',.9);cnSpr(g,cnMon('solarion'),240,s.solY+Math.sin(T/300)*4,208,208)}rim(g);
  if(Math.random()<.7)cnEmit(1,{k:'em',x:240,y:250,sx:120,a0:-1.9,a1:-1.2,v0:.6,v1:2,c:['#ff8a3a',C.gold,'#ffffff'],l:70})},[240,250,1.5]);
 A.n(2,.7,300,40);for(let i=0;i<5;i++){A.q(5+i*2);A.tw(s,'pulse',1,200).then(()=>A.tw(s,'pulse',0,300));await A.w(320)}
 A.s('roar');A.fl(.9,C.goldL);A.q(18);A.n(1.6,1,900,40);cnEmit(40,{k:'fb',x:240,y:250,sx:80,a0:-2.6,a1:-.5,v0:2,v1:6,g:.12,dr:.96,s:6,gr:.2,l:50});cnRing(240,252,C.goldL,8,30);
 A.cam(240,160,1,1500);await A.tw(s,'solY',140,1500,1);A.s('cry');await A.sub('Le sommet tremble… Solarion jaillit du cratère dans un éclat doré !');
 // Gros plan sur Vex
 await A.cut((g,T)=>{cnSky(g,[[0,'#1a0f2e'],[1,'#5a2a5a']],0,H);for(let i=0;i<14;i++){const y=(i*37+T/3)%H;R(g,'#3a2050',0,ev(y),W,2)}cnGlow(g,300,170,140,'rgba(255,200,90,.8)',.35+.2*Math.sin(T/200));
  cnSpr(g,PEO.vex?.vs,160,190,256,256);cnGem(g,224,148,6+s.gem*10,T);if(Math.random()<.5)cnEmit(1,{k:'em',x:224,y:148,sx:30,sy:30,v0:.2,v1:1,c:[C.gold,'#ffffff'],l:40})},[180,170,1.1]);
 await A.sub('Gardien du jour… Pardonne-moi.','Vex');A.cam(230,160,1.35,1400);A.s('shard');await A.sub('Cœur d\'Aube… À MOI !','Vex');
 // Le vol
 s.solY=110;await A.cut((g,T)=>{crater(g,T);const sx2=330+(s.drain?(Math.random()-.5)*6*s.drain:0),sy2=s.solY;cnGlow(g,sx2,sy2,110,'rgba(255,220,120,.9)',.8*(1-s.drain*.6));
  cnSpr(g,cnMon('solarion'),sx2,sy2,176,176,{tint:'#2a1840',tk:s.drain*.6});rim(g);cnSpr(g,chr('vex',2,0),s.vexX,206,48,96);
  if(s.beam){g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,220,120,.5)';g.lineWidth=8+Math.random()*6;g.beginPath();g.moveTo(sx2,sy2+20);g.quadraticCurveTo(220,90,s.vexX+14,190);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();g.globalCompositeOperation='source-over';
   cnEmit(3,{k:'st',x:sx2,y:sy2+10,sx:40,sy:40,tx:s.vexX+14,ty:190,v0:1,v1:3,dr:1,c:[C.gold,C.goldL,'#ffffff'],l:120})}
  if(s.gem>0)cnGem(g,s.vexX+14,186,4+s.gem*6,T)},[240,170,1]);
 s.beam=1;A.s('shard');A.n(3,.5,1800,200);A.tw(s,'drain',1,3000,0);for(let i=0;i<8;i++){A.q(4);if(i%3===0)A.s('cry');await A.w(380)}A.tw(s,'gem',1,600);s.beam=0;
 A.fl(1,'#3a1a5a');A.s('roar');A.q(18);A.n(1.6,1,700,40);cnRing(s.vexX+14,186,'#c060ff',7,34,1,3);
 A.tw(s,'solY',-200,1300,0);cnEmit(30,{k:'em',x:330,y:110,sx:60,sy:40,a0:-1.8,a1:-1.3,v0:2,v1:5,c:[C.gold,'#ffffff'],l:50});await A.sub('Solarion pousse un cri déchirant et s\'enfuit vers le ciel…');
 // L'éclipse sur Aurélys
 await A.cut((g,T)=>cnPano(g,T,s),[240,120,1.4]);A.m('ecl');A.cam(240,160,1,5000);A.n(5,.5,200,30);
 await A.tw(s,'mx',-34,1800,2);A.subN('La lune glisse devant le soleil…');await A.tw(s,'mx',0,1800,2);A.tw(s,'ec',1,1600,2);A.q(6);A.fl(.6,'#3a1a5a');A.s('roar');
 await A.sub('Le soleil s\'assombrit. Une ÉCLIPSE recouvre Aurélys !');await A.w(800)};

// =====================================================================
// 4. VOLTERRE SE RALLUME
// =====================================================================
CINT.centrale='Le courant revient à Volterre';
CINE.centrale=async A=>{const s={rot:0,spd:.14,arc:0,pulse:-1,lit:0};A.m('base');
 A.shot((g,T)=>{cnSky(g,[[0,'#141a24'],[1,'#2a3240']]);for(let x=0;x<W;x+=40)R(g,'#1e2430',x,0,4,H);R(g,'#3a4250',0,262,W,H);for(let x=0;x<W;x+=32)R(g,'#4a5260',x,262,28,4);
  s.rot+=s.spd;[[150,150,74],[350,170,56]].forEach(([x,y,r],j)=>{cnDisc(g,x,y,r+8,'#2a303a');cnDisc(g,x,y,r,'#4a5462');for(let i=0;i<6;i++){const a=(j?-1:1)*s.rot+i*Math.PI/3;g.fillStyle='#8a96a8';g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a-.25)*r,y+Math.sin(a-.25)*r);g.lineTo(x+Math.cos(a+.1)*r,y+Math.sin(a+.1)*r);g.fill()}cnDisc(g,x,y,12,'#c8d0dc');if(Math.abs(s.spd)>.2)cnGlow(g,x,y,r,'rgba(120,220,255,.7)',.3*Math.min(1,Math.abs(s.spd)/.5))});
  if(s.arc&&Math.random()<.6)cnBolt(g,150+(Math.random()-.5)*120,80+Math.random()*60,350+(Math.random()-.5)*80,110+Math.random()*90,'#7ae0ff');
  if(s.arc&&Math.random()<.4)cnEmit(4,{x:150+(Math.random()-.5)*150,y:150+(Math.random()-.5)*150,v0:1,v1:4,g:.15,c:['#7ae0ff','#ffffff',C.goldL],l:22})},[240,160,1.2]);
 await A.sub('Le grand levier s\'abaisse dans un fracas métallique…');A.s('door');A.q(6);A.n(2.4,.6,400,40);await A.tw(s,'spd',0,1600,0);await A.w(400);
 A.s('shard');s.arc=1;A.tw(s,'spd',-.6,2000,0);A.cam(240,160,1,1800);for(let i=0;i<6;i++){A.q(4);A.s('hit');await A.w(300)}A.subN('…et les turbines repartent dans l\'autre sens !');A.fl(.6,'#7ae0ff');await A.w(1300);
 // La ville se rallume
 const B=[];{const r=cnRng(21);let x=0;while(x<W){const w=30+r()*40|0,h=60+r()*120|0;B.push([x,w,h,r()]);x+=w+4}}
 await A.cut((g,T)=>{cnSky(g,[[0,'#0a0e1e'],[1,'#2a3050']],0,H);cnStars(g,T,50,120,.6);if(Math.random()<.4)cnEmit(2,{x:Math.random()*W,y:-4,a0:1.75,a1:1.8,v0:6,v1:8,dr:1,c:'#6a7aa0',s:1,l:50});
  g.strokeStyle='#0a0c14';g.lineWidth=2;g.beginPath();g.moveTo(W,80);g.quadraticCurveTo(400,120,330,110);g.quadraticCurveTo(300,150,250,150);g.stroke();
  for(const[x,w,h,r]of B){const top=262-h;R(g,'#141826',x,top,w,h);R(g,'#1e2436',x,top,w,2);for(let yy=top+8;yy<258;yy+=12)for(let xx=x+5;xx<x+w-6;xx+=10){const on=(r*7+xx*.13+yy*.07)%1<s.lit*1.2&&(262-yy)/h<s.lit*1.4;R(g,on?'#ffd870':'#232a3e',xx,yy,5,6);if(on&&(xx+yy)%7===0)cnGlow(g,xx+2,yy+3,10,'rgba(255,210,110,.6)',.4)}}
  R(g,'#0c0e18',0,262,W,H);for(let i=0;i<8;i++){const x=30+i*60;R(g,'#2a3040',x,236,3,26);if(s.lit>.6){R(g,'#fff0b0',x-2,232,7,4);cnGlow(g,x+1,236,30,'rgba(255,220,140,.7)',.6)}}
  if(s.pulse>=0&&s.pulse<1){const p=s.pulse,x=W-p*240,y=80+Math.sin(p*Math.PI)*60;cnGlow(g,x,y,26,'rgba(120,230,255,.95)',1);R(g,'#ffffff',ev(x)-2,ev(y)-2,4,4);cnEmit(2,{x,y,v0:.3,v1:1.4,c:['#7ae0ff','#ffffff'],l:16})}},[300,160,1.3]);
 A.cam(240,160,1,2200);A.s('shard');await A.tw(s,'pulse',1,1500,0);s.pulse=-1;A.fl(.7,'#bff0ff');A.s('lv');A.n(.8,.6,2000,300);await A.tw(s,'lit',1,2200,0);await A.sub('Le courant revient à Volterre ! Partout, les fenêtres s\'allument.');await A.w(500)};

// =====================================================================
// 5. LE DÔME VOLE EN ÉCLATS — Nocturion libéré
// =====================================================================
CINT.dome='Nocturion libéré';
CINE.dome=async A=>{const s={crack:0,broken:0,vort:0,sc:1,eyes:0};A.m('final');
 A.shot((g,T)=>{cnSky(g,[[0,'#0a0618'],[1,'#2a1840']],0,H);cnStars(g,T,90,200,s.broken?1:.5);cnDisc(g,360,60,18,'#1e1428');if(s.broken){g.strokeStyle='#f0d0ff';g.lineWidth=2;g.beginPath();g.arc(360,60,21,0,7);g.stroke();cnGlow(g,360,60,50,'rgba(200,140,255,.8)',.6)}
  if(!s.broken){g.strokeStyle='#5a6a9a';g.lineWidth=2;for(let i=1;i<6;i++){g.beginPath();g.arc(240,300,i*56,Math.PI,0);g.stroke()}for(let i=0;i<=10;i++){const a=Math.PI+i*Math.PI/10;g.beginPath();g.moveTo(240,300);g.lineTo(240+Math.cos(a)*300,300+Math.sin(a)*300);g.stroke()}
   g.globalAlpha=.12;g.fillStyle='#8ab0ff';g.beginPath();g.arc(240,300,290,Math.PI,0);g.fill();g.globalAlpha=1;
   if(s.crack>0){g.strokeStyle='#ffffff';g.lineWidth=1;const r=cnRng(5);for(let j=0;j<7;j++){let x=240+(r()-.5)*360,y=40+r()*120;g.beginPath();g.moveTo(x,y);for(let i=0;i<10*s.crack;i++){x+=(r()-.5)*40;y+=(r()-.5)*40;g.lineTo(x,y)}g.stroke()}}}
  g.fillStyle='#120c1e';g.beginPath();g.moveTo(40,H);g.lineTo(150,150);g.lineTo(170,160);g.lineTo(80,H);g.fill();R(g,'#120c1e',0,290,W,H);
  if(s.vort>0){g.save();g.translate(240,170);for(let i=0;i<5;i++){g.rotate(T/600+i*1.256);g.globalAlpha=.3*s.vort;g.fillStyle=i%2?'#8a40e0':'#3a1a6a';g.beginPath();g.ellipse(60,0,90*s.vort,16,0,0,7);g.fill()}g.restore();g.globalAlpha=1;cnGlow(g,240,170,160,'rgba(150,80,230,.9)',.6*s.vort)}
  const z=176*s.sc;cnSpr(g,cnMon('nocturion'),240,170+Math.sin(T/400)*5,z,z);if(s.eyes){cnGlow(g,226,150,16,'rgba(255,120,255,1)',s.eyes);cnGlow(g,254,150,16,'rgba(255,120,255,1)',s.eyes)}},[240,180,1.3]);
 A.n(3,.5,200,30);A.tw(s,'vort',1,2200);A.cam(240,170,1.15,2200);await A.sub('Nocturion ! Montre-leur ce qu\'est une vraie ÉCLIPSE !','Vex');A.s('alert');await A.tw(s,'eyes',1,500);
 A.s('roar');A.n(2,1,900,30);A.q(16);cnRing(240,170,'#e0c0ff',8,40,1,4);A.fl(.5,'#c060ff');A.tw(s,'crack',1,1200);A.tw(s,'sc',1.25,1400);for(let i=0;i<4;i++){A.s('hit');A.q(8);await A.w(300)}
 s.broken=1;A.fl(1,'#ffffff');A.q(20);A.n(2.2,1,3000,60);A.cam(240,160,1,500,1);for(let i=0;i<4;i++)cnRing(240,170,'#ffffff',6+i*3,40,1,3);
 for(let k=0;k<4;k++){cnEmit(40,{k:'sh',x:240,y:120,sx:440,sy:160,a0:.8,a1:2.3,v0:1,v1:4,g:.22,dr:.99,c:['#8ab0ff','#c8e0ff','#5a6a9a'],s:6,spin:.6,l:120});await A.w(150)}
 await A.sub('Les vitres du dôme volent en éclats !');await A.w(600)};

// =====================================================================
// 6. LE RETOUR DU CYCLE
// =====================================================================
CINT.aube='Le retour du Cycle';
CINE.aube=async A=>{const s={gem:0,solY:-120,bow:0,ang:0,orb:0,sph:0,ec:1,mx:0,dawn:0,sweep:null,fly:-80};A.m('sanct');
 A.shot((g,T)=>{cnSky(g,[[0,'#0a0618'],[1,'#2a1840']],0,H);cnStars(g,T,90,H,1);const gy=200-s.gem*80;cnRays(g,240,gy,12,300,C.goldL,.18*s.gem,T/2000);cnGem(g,240,gy,8+s.gem*4,T);
  cnSpr(g,cnMon('nocturion'),360,200,150,150,{fl:1});if(s.solY>-120){cnGlow(g,140,s.solY,120,'rgba(255,220,120,.9)',.9);cnSpr(g,cnMon('solarion'),140,s.solY,150,150)}
  if(s.gem>0&&Math.random()<.5)cnEmit(1,{k:'em',x:240,y:gy,sx:20,sy:20,v0:.3,v1:1.2,c:[C.gold,'#ffffff'],l:50})},[240,180,1.2]);
 A.s('shard');A.cam(240,150,1.1,2200);await A.tw(s,'gem',1,1800,2);A.s('cry');A.fl(.8,C.goldL);A.tw(s,'solY',170,1600,1);await A.sub('Le Cœur d\'Aube s\'élève sous le dôme… et Solarion revient, dans un torrent de lumière !');
 // Face à face
 await A.cut((g,T)=>{cnSky(g,[[0,'#1a0f2e'],[.5,'#3a2050'],[1,'#7a4a6a']],0,H);cnStars(g,T,70,200,.8);const b=Math.sin(s.bow*Math.PI*4)*8*(s.bow<1?1:0);
  if(s.orb){const a=s.ang,r=110*(1-s.sph*.9),p1=[240+Math.cos(a)*r,150+Math.sin(a)*r*.4],p2=[240-Math.cos(a)*r,150-Math.sin(a)*r*.4];cnEmit(2,{k:'em',x:p1[0],y:p1[1],sx:20,sy:20,v0:.1,v1:.4,c:[C.gold,'#ffffff'],l:70});cnEmit(2,{k:'em',x:p2[0],y:p2[1],sx:20,sy:20,v0:.1,v1:.4,c:['#c060ff','#ffffff'],l:70});
   cnGlow(g,p1[0],p1[1],80,'rgba(255,220,120,.8)',.7);cnGlow(g,p2[0],p2[1],80,'rgba(160,100,240,.8)',.7);cnSpr(g,cnMon('solarion'),p1[0],p1[1],120,120);cnSpr(g,cnMon('nocturion'),p2[0],p2[1],120,120,{fl:1})}
  else{cnGlow(g,130,160,120,'rgba(255,220,120,.8)',.7);cnGlow(g,350,160,120,'rgba(160,100,240,.8)',.7);cnSpr(g,cnMon('solarion'),130,160+Math.max(0,b),168,168);cnSpr(g,cnMon('nocturion'),350,160+Math.max(0,b),168,168,{fl:1})}
  if(s.sph>0){cnGlow(g,240,150,30+s.sph*300,'rgba(255,255,240,1)',s.sph);cnRays(g,240,150,18,400,'#ffffff',.3*s.sph,T/1500)}
  cnRidge(g,3,272,14,'#140c24',0);R(g,'#0e0a1a',0,288,W,H)});
 await A.sub('Solarion et Nocturion se font face… Mais ils ne se battent pas.');A.s('cry');await A.tw(s,'bow',1,2600,0);await A.sub('Lentement, le jour et la nuit s\'inclinent l\'un devant l\'autre.');
 s.orb=1;A.s('shard');A.n(4,.5,300,2000);A.tw(s,'ang',Math.PI*6,4200,1);await A.w(2400);A.tw(s,'sph',1,1800,2);await A.w(1600);A.fl(1);A.s('lv');A.q(8);await A.w(400);
 // L'aube
 await A.cut((g,T)=>{cnPano(g,T,s);if(s.fly>-80){const x=s.fly,y=60+Math.sin(x/60)*10;cnSpr(g,cnMon('solarion',64),x,y,56,56);cnSpr(g,cnMon('nocturion',64),x-64,y+16,56,56);cnEmit(1,{k:'em',x:x-30,y:y+8,sx:60,sy:10,v0:.1,v1:.3,c:[C.gold,'#c060ff','#ffffff'],l:60})}},[240,90,1.4]);
 A.m('sanct');A.cam(240,160,1,5000);A.tw(s,'mx',90,3200,2);A.tw(s,'ec',0,3200,2);await A.tw(s,'dawn',1,2000,2);A.subN('Le jour et la nuit se retrouvent. L\'éclipse se dissipe !');s.sweep=-80;A.tw(s,'sweep',560,2600,0);await A.w(1200);A.tw(s,'fly',620,4200,0);A.tw(s,'dawn',.4,3000,2);await A.w(3200);A.clr();await A.w(500)};

// =====================================================================
// CINÉMATHÈQUE — revoir les cinématiques déjà vues (menu)
// =====================================================================
async function cinemaMenu(){const L=Object.keys(CINT).filter(k=>G.cin?.[k]);if(!L.length)return say('Aucune cinématique vue pour l\'instant.');
 for(;;){const i=await choose([...L.map(k=>CINT[k]),'RETOUR'],{x:W/2-150,y:40,w:300,title:'Cinémathèque'});if(i<0||i===L.length)return;const pn=ui.panel;ui.panel=null;await cinema(L[i]);ui.panel=pn}}
// Les sauvegardes existantes débloquent les cinématiques des étapes déjà franchies
const norm13=normalize;normalize=function(g){g=norm13(g);if(!g)return g;const F=g.flags||{};g.cin??={};g.cin.prologue=1;if(F.t_corvin||F.mine)g.cin.mine=1;if(F.eclipse||F.boss)g.cin.eclipse=1;if(F.baseDone)g.cin.centrale=1;if(F.balance)g.cin.dome=g.cin.aube=1;if(g.v<13){g.wn=1;g.v=13}return g};

// =====================================================================
// PLAN DE COUPE D'ÉVEIL — en combat, l'Éveil du Cycle a droit à son gros plan
// =====================================================================
function drawCutin(){const c=ui.cutin,d=G?.opt?.fast?600:1100,p=(now()-c.t0)/d;if(p>=1){ui.cutin=null;return}
 const ein=Math.min(1,p/.18),eout=p>.82?(p-.82)/.18:0,k=1-(1-ein)**3,col=c.lu?'#b89aff':C.goldL,col2=c.lu?'#3a1a6a':'#a8481a',dir=c.s?-1:1;
 X.globalAlpha=.55*k*(1-eout);R(X,'#000000',0,0,W,H);X.globalAlpha=1;
 X.save();X.translate(W/2,H/2);X.rotate(-.18*dir);const bh=ev(110*k*(1-eout));R(X,col2,-W,-bh/2,W*2,bh);R(X,col,-W,-bh/2,W*2,3);R(X,col,-W,bh/2-3,W*2,3);
 X.beginPath();X.rect(-W,-bh/2,W*2,bh);X.clip();for(let i=0;i<16;i++){const y=((i*37)%110)-55,x=((now()*(.9+i%3*.3)+i*97)%(W*2))-W;X.globalAlpha=.5;R(X,i%2?col:'#ffffff',ev(x*dir),ev(y),60+i%4*20,2)}X.globalAlpha=1;
 const sx=ev(dir*(-W*(1-k)+(p>.82?W*eout:0)+(p-.18)*-40));X.drawImage(monSpr(c.sp,0,96,c.sh),sx-110,-80,160,160);X.restore();
 txt(c.lu?'ÉVEIL LUNAIRE':'ÉVEIL SOLAIRE',W/2+dir*90,H/2+60+(1-k)*20,'#ffffff',{s:3,al:'c',ol:C.ink,olw:3})}
const dB13=drawBattle;drawBattle=function(t){dB13(t);if(ui.cutin)drawCutin()};
const awk13=awaken;awaken=async function(s){const m=side(s);ui.cutin={sp:m.sp,sh:m.sh,lu:lunar(),s,t0:now()};sfx('shard');cnNoise(.6,.5,2000,200);await wait(G?.opt?.fast?600:1100);ui.cutin=null;return awk13(s)};
NEWS.splice(0,NEWS.length,[()=>ICO.ecl,'Le Grand Écran','Six cinématiques plein écran aux grands moments de l\'histoire : légende, effondrement, éclipse, dôme en éclats…'],
 [()=>ICO.map,'L\'Atlas d\'Aurélys','La carte est entièrement redessinée : côtes, forêts, volcan, villes, brouillard sur les lieux inconnus. Parcours-la avec les flèches pour lire la fiche de chaque lieu.'],
 [()=>ICO.bracelet,'Éveil en gros plan','Déclencher l\'Éveil du Cycle en combat lance un plan de coupe plein écran, solaire ou lunaire.'],
 [()=>ICO.book,'Cinémathèque','Revois les cinématiques déjà vues depuis le menu (CINÉMAS). B deux fois pour passer une cinématique.']);
