// PERSONNAGES D'AURÉLYS — squelette commun (proportions « chibi » de jeu), costumes par modules.
// Un même dessin sert à la carte (32×48), aux combats (64×96) et aux portraits (gros plan) : cohérence garantie.
// Repère : boîte [0,0,64,96], sol à y=94, regard vers la droite pour la vue de profil (la gauche = miroir, même lumière).
(()=>{
const A=ATELIER,{E,C,cap,blob,taper,poly,curve}=A;
const lerp=(a,b,t)=>a+(b-a)*t;
// ---------------------------------------------------------------- squelette
function rig(view,fr,b={}){const k=b.h||1,bw=b.w||1,hr=b.hr||1,gy=94,cx=32;
 const legL=(b.leg||16.5)*k,torH=(b.tor||16)*k,R=18.5*hr;
 let bob=fr?-1:0;const hipY=gy-5-legL+bob*.5,shY=hipY-torH,hy=shY-R*.78+(b.hy||0);
 const r={view,fr,k,bw,R,gy,cx,head:[cx+(view==='side'?1:0),hy+bob],shY,hipY,neckY:shY-1,b};
 const sw=(view==='side'?7.5:11.5)*bw,hw=(view==='side'?6:6.4)*bw;
 r.tw=[sw*2,(view==='side'?7:9)*bw*2];
 if(view==='side'){
  const st=[[0,0],[7,-7],[-7,7]][fr],sa=[[0,0],[-6,6],[6,-6]][fr];
  r.hip={n:[cx,hipY],f:[cx,hipY]};r.an={n:[cx+st[0],gy-3-(fr&&st[0]<0?1.5:0)],f:[cx+st[1],gy-3-(fr&&st[1]<0?1.5:0)]};
  r.kn={n:[lerp(cx,r.an.n[0],.55)+(st[0]>0?1.5:0),lerp(hipY,gy-3,.5)],f:[lerp(cx,r.an.f[0],.55)+(st[1]>0?1.5:0),lerp(hipY,gy-3,.5)]};
  r.sh={n:[cx-.5,shY+3],f:[cx+.5,shY+3]};r.ha={n:[cx+sa[0]+1,hipY+1],f:[cx+sa[1]+1,hipY]};r.el={n:[lerp(r.sh.n[0],r.ha.n[0],.5)-1,lerp(shY+3,hipY,.5)],f:[lerp(r.sh.f[0],r.ha.f[0],.5)-1,lerp(shY+3,hipY,.5)]}}
 else{const s=fr===1?1:fr===2?-1:0;// pas : la jambe gauche (écran) avance au cadre 1
  r.hip={l:[cx-hw,hipY],r:[cx+hw,hipY]};
  r.an={l:[cx-hw-.5,gy-3+(s<0?-2.5:s>0?.5:0)],r:[cx+hw+.5,gy-3+(s>0?-2.5:s<0?.5:0)]};
  r.kn={l:[cx-hw-.3,lerp(hipY,r.an.l[1],.5)],r:[cx+hw+.3,lerp(hipY,r.an.r[1],.5)]};
  r.sh={l:[cx-sw+1.5,shY+3],r:[cx+sw-1.5,shY+3]};
  r.ha={l:[cx-sw-1.5,hipY+1+(s>0?-1.5:s<0?1:0)],r:[cx+sw+1.5,hipY+1+(s<0?-1.5:s>0?1:0)]};
  r.el={l:[lerp(r.sh.l[0],r.ha.l[0],.5)-1,lerp(shY+3,r.ha.l[1],.5)],r:[lerp(r.sh.r[0],r.ha.r[0],.5)+1,lerp(shY+3,r.ha.r[1],.5)]}}
 return r}
// ---------------------------------------------------------------- formes du corps
const torso=(g,r,ext=0,len=0)=>{const[cx]=[r.cx],t=r.shY,b2=r.hipY+2+len,w0=r.tw[0]/2+ext,w1=r.tw[1]/2+ext+len*.12;
 if(r.view==='side'){blob(g,[[cx-w0+1,t+1],[cx+w0-1,t+1],[cx+w0+.5,lerp(t,b2,.5)],[cx+w1,b2],[cx-w1,b2],[cx-w0-.5,lerp(t,b2,.5)]],.4)}
 else blob(g,[[cx-w0+2,t],[cx+w0-2,t],[cx+w0,t+3],[cx+w1,b2],[cx-w1,b2],[cx-w0,t+3]],.35)};
const legPath=(g,a,b,c,r1,r2)=>{cap(g,a[0],a[1],b[0],b[1],r1,(r1+r2)/2);cap(g,b[0],b[1],c[0],c[1],(r1+r2)/2,r2)};
const shoe=(g,r,an,side,big=1)=>{if(r.view==='side')E(g,an[0]+2.6,an[1]+1,6.2*big,3.6*big);else E(g,an[0]+(side==='l'?-.6:side==='r'?.6:0),an[1]+1.1,5.2*big,3.8*big)};
// ---------------------------------------------------------------- rendu d'un personnage
// cfg : skin, hair:{s,c}, eye, top:{t,c,c2,trim,len}, slv:'long'|'short'|'none', bot:{t,c,len}, sock, shoe:{c,t}, hat:{t,c,c2}, acc:[], build:{}
function drawPerson(d,cfg,view,fr,o={}){const r=rig(view,fr,cfg.build||{}),u=d.u,S=cfg.skin||'#f2c49a',T=cfg.top||{},Bt=cfg.bot||{},H=cfg.hair||{},side=view==='side',back=view==='back';
 const acc=new Set(cfg.acc||[]),M=cfg.mods||{};const near=side?'n':'r',far=side?'f':'l';
 const P=(c,f,op)=>d.part(c,f,op),drawHook=(k)=>M[k]&&M[k](d,r,cfg);
 const legC=Bt.t==='pants'||Bt.t==='overalls'?Bt.c:cfg.sock||S,thighC=Bt.t==='shorts'||Bt.t==='skirt'?(Bt.t==='skirt'?(cfg.sock||S):Bt.c):legC;
 // 0. éléments derrière tout (cheveux longs, cape, sac vu de face)
 if(!back)HAIR_BACK(d,r,H);drawHook('behind');
 if(acc.has('cape')&&!back)P(cfg.capeC||'#3a2050',g=>{const t=r.shY,b2=r.gy-8;blob(g,[[r.cx-12,t],[r.cx+12,t],[r.cx+17,b2],[r.cx-17,b2]],.3)},{flat:.4});
 if(acc.has('pack')&&!back&&!side)P(cfg.packC||'#a8743e',g=>{g.roundRect(r.cx-13,r.shY+1,26,r.hipY-r.shY+1,5)},{r:3});
 // 1. bras lointain (profil), jambes
 const arm=(s,front)=>{const sh=r.sh[s],el=r.el[s],ha=r.ha[s],sl=cfg.slv||'long',SC=T.sleeve||T.c||'#888';
  if(sl==='long')P(SC,g=>legPath(g,sh,el,ha,4.3,3.7),{grp:'a'+s});else if(sl==='short'){P(S,g=>legPath(g,sh,el,ha,3.7,3.4),{grp:'a'+s});P(SC,g=>cap(g,sh[0],sh[1],lerp(sh[0],el[0],.8),lerp(sh[1],el[1],.8),4.5,4.2),{grp:'a'+s})}
  else P(S,g=>legPath(g,sh,el,ha,3.7,3.4),{grp:'a'+s});
  P(cfg.glove||S,g=>C(g,ha[0],ha[1]+.8,3.9),{grp:'a'+s});if(M.hand)M.hand(d,r,cfg,s,front)};
 if(side)arm('f',0);
 const legs=(s)=>{const hp=r.hip[s],kn=r.kn[s],an=r.an[s];P(legC,g=>legPath(g,hp,kn,an,4.8,4),{grp:'l'+s});
  if(thighC!==legC)P(thighC,g=>cap(g,hp[0],hp[1],lerp(hp[0],kn[0],.85),lerp(hp[1],kn[1],.85),5.4,5),{grp:'l'+s});
  if(cfg.sockTop)P(cfg.sockTop,g=>cap(g,lerp(kn[0],an[0],.4),lerp(kn[1],an[1],.4),an[0],an[1],4.3,4.1),{grp:'l'+s});
  const sh=cfg.shoe||{c:'#5a3a2a'};P(sh.c,g=>{shoe(g,r,an,s,sh.big||1);if(sh.t==='boot')cap(g,an[0],an[1]-4,an[0]+(side?.5:0),an[1],3.9,3.9)},{grp:'s'+s,r:2.4})};
 if(side){legs('f');legs('n')}else{legs('l');legs('r')}
 // 2. bas (short, jupe, salopette) et torse
 if(Bt.t==='skirt')P(Bt.c,g=>{const t=r.hipY-3,b2=r.hipY+(Bt.len||9);blob(g,[[r.cx-r.tw[1]/2-1,t],[r.cx+r.tw[1]/2+1,t],[r.cx+r.tw[1]/2+5,b2],[r.cx-r.tw[1]/2-5,b2]],.25)},{r:4});
 if(Bt.t==='shorts'||Bt.t==='pants'||Bt.t==='overalls')P(Bt.c,g=>{const t=r.hipY-3,b2=r.hipY+4;g.roundRect(r.cx-r.tw[1]/2-.5,t,r.tw[1]+1,b2-t,2)},{grp:'lb'});
 drawHook('preTorso');
 const len=T.len==='coat'?16:T.len==='robe'?24:T.len==='long'?6:0;
 P(T.c||'#888',g=>torso(g,r,0,len),{r:6});
 if(T.t==='open'&&!back){P(T.c2||'#fff',g=>{const t=r.shY+1,b2=r.hipY+1;poly(g,[[r.cx-3.5,t],[r.cx+3.5,t],[r.cx+3,b2],[r.cx-3,b2]])},{flat:.25});P(T.c||'#888',g=>{poly(g,[[r.cx-r.tw[0]/2+2,r.shY],[r.cx-2,r.shY],[r.cx-3.5,r.hipY+2+len],[r.cx-r.tw[1]/2-len*.12,r.hipY+2+len]]);poly(g,[[r.cx+r.tw[0]/2-2,r.shY],[r.cx+2,r.shY],[r.cx+3.5,r.hipY+2+len],[r.cx+r.tw[1]/2+len*.12,r.hipY+2+len]])},{r:5})}
 if(T.trim&&!back&&!side){d.line(T.trim,1.1,g=>{g.moveTo(r.cx-3.5,r.shY+1);g.lineTo(r.cx-3.6,r.hipY+1+len);g.moveTo(r.cx+3.5,r.shY+1);g.lineTo(r.cx+3.6,r.hipY+1+len)},{lit:1})}
 if(T.t==='stripes'){for(let y=r.shY+3;y<r.hipY+1;y+=3.2)d.line(T.c2||'#2a4a8a',1.2,g=>{g.moveTo(r.cx-14,y);g.lineTo(r.cx+14,y)},{lit:1})}
 if(T.t==='overalls'&&!back){P(Bt.c,g=>{g.roundRect(r.cx-6,r.shY+5,12,r.hipY-r.shY-2,2)},{flat:.3});d.line(Bt.c,1.4,g=>{g.moveTo(r.cx-5,r.shY+6);g.lineTo(r.cx-7,r.shY);g.moveTo(r.cx+5,r.shY+6);g.lineTo(r.cx+7,r.shY)},{lit:1})}
 if(T.belt)P(T.belt,g=>{g.rect(r.cx-r.tw[1]/2-.6,r.hipY-1.5,r.tw[1]+1.2,2.6)},{flat:.3,grp:'belt'});
 if(T.emblem&&!back)T.emblem(d,r);
 drawHook('torso');
 if(acc.has('pack')&&(back||side))P(cfg.packC||'#a8743e',g=>{if(back)g.roundRect(r.cx-11,r.shY+1,22,r.hipY-r.shY+3,5);else g.roundRect(r.cx-14,r.shY+1,9,r.hipY-r.shY+2,3)},{r:3});
 if(acc.has('pack')&&back){P(cfg.packC2||'#7a4e28',g=>{g.roundRect(r.cx-9,r.shY+9,18,8,3)},{r:2});d.line('#f0d8a0',1,g=>{g.moveTo(r.cx-6,r.shY+3);g.lineTo(r.cx+6,r.shY+3)},{lit:1})}
 if(acc.has('pack')&&!back&&!side){d.line(cfg.packC2||'#7a4e28',1.6,g=>{g.moveTo(r.cx-7,r.shY+1);g.lineTo(r.cx-6,r.hipY-2);g.moveTo(r.cx+7,r.shY+1);g.lineTo(r.cx+6,r.hipY-2)},{lit:1})}
 // 3. bras proche, tête
 if(side)arm('n',1);else{arm('l',1);arm('r',1)}
 drawHook('arms');
 P(S,g=>{const[hx,hy]=r.head;E(g,hx,hy+.5,r.R*(side?.92:1),r.R*.93)},{r:r.R*.9});
 if(side&&!back)P(S,g=>{const[hx,hy]=r.head;E(g,hx+r.R*.82,hy+r.R*.2,2.6,2.2)},{grp:'hd'});
 FACE(d,r,cfg,o);
 HAIR_FRONT(d,r,H,cfg);drawHook('head');
 if(cfg.hat)HAT(d,r,cfg.hat);drawHook('top');
 if(acc.has('scarf'))P(cfg.scarfC||'#d8443a',g=>{const y=r.shY-1;if(back){g.roundRect(r.cx-9,y-2,18,5,2);taper(g,[[r.cx+2,y+2],[r.cx+5,y+9],[r.cx+9,y+13]],[2.4,2.2,1.6])}else if(side){g.roundRect(r.cx-7,y-2,14,5,2);taper(g,[[r.cx-4,y+1],[r.cx-9,y+6],[r.cx-13,y+8+(r.fr?2:0)]],[2.3,2,1.4])}else{g.roundRect(r.cx-9,y-2,18,5,2.5);taper(g,[[r.cx+4,y+1],[r.cx+5.5,y+7],[r.cx+5,y+11]],[2.3,2.1,1.6])}},{r:2});
 if(acc.has('glasses')&&!back){const[hx,hy]=r.head,ey=hy+r.R*.18;if(side)d.line('#2a2030',1,g=>{C(g,hx+r.R*.48,ey,3.1)});else d.line('#2a2030',1,g=>{C(g,hx-r.R*.38,ey,3.3);C(g,hx+r.R*.38,ey,3.3);g.moveTo(hx-r.R*.38+3.3,ey);g.lineTo(hx+r.R*.38-3.3,ey)})}
 drawHook('front')}
// ---------------------------------------------------------------- visage
function FACE(d,r,cfg,o){if(r.view==='back')return;const[hx,hy]=r.head,R=r.R,side=r.view==='side',ink='#2a1a24',iris=cfg.eye||'#4a3020',mouth=o.talk;
 const ey=hy+R*.2,ex=R*.36,rx=R*.13,ry=R*.2,mood=cfg.mood;
 const eye=(x)=>{if(mood==='closed'){d.line(ink,1.1,g=>{g.moveTo(x-rx*1.2,ey+ry*.3);g.quadraticCurveTo(x,ey-ry*.6,x+rx*1.2,ey+ry*.3)});return}
  d.flat(ink,g=>E(g,x,ey,rx*1.08,ry*1.05));d.flat(iris,g=>E(g,x,ey+ry*.25,rx*.8,ry*.66));d.flat('#ffffff',g=>E(g,x-rx*.3,ey-ry*.42,Math.max(rx*.42,.55*d.u),Math.max(ry*.3,.55*d.u)),{min:1});
  if(cfg.lash)d.line(ink,1,g=>{g.moveTo(x-rx*1.4,ey-ry*.8);g.lineTo(x+rx*1.3,ey-ry*1.05)});
  if(cfg.brow!==false&&d.u<1.2){const bt=cfg.brow==='angry'?.25:cfg.brow==='sad'?-.25:0;d.line(cfg.browC||(cfg.hair&&cfg.hair.c)||ink,.9,g=>{g.moveTo(x-rx*1.3,ey-ry*1.55-bt*R*.2*(x<hx?-1:1));g.lineTo(x+rx*1.3,ey-ry*1.55+bt*R*.2*(x<hx?-1:1))})}};
 if(side){eye(hx+R*.5);if(d.u<1.2)d.line(ink,.9,g=>{g.moveTo(hx+R*.72,hy+R*.62);g.lineTo(hx+R*.86,hy+R*.6)});d.flat('#f08a8a',g=>E(g,hx+R*.3,hy+R*.48,R*.12,R*.07),{lit:1})}
 else{eye(hx-ex);eye(hx+ex);d.flat('#f2a090',g=>{E(g,hx-ex-R*.1,hy+R*.5,R*.12,R*.07);E(g,hx+ex+R*.1,hy+R*.5,R*.12,R*.07)},{lit:1});
  if(mouth)d.flat('#7a2a30',g=>E(g,hx,hy+R*.62,R*.09,R*.08),{min:1});else d.line(ink,.85,g=>{g.moveTo(hx-R*.09,hy+R*.6);g.quadraticCurveTo(hx,hy+R*.66,hx+R*.09,hy+R*.6)},{thin:1})}
 if(cfg.beard&&!o.nobeard)d.part(cfg.beard,g=>{if(side){blob(g,[[hx-R*.2,hy+R*.45],[hx+R*.7,hy+R*.5],[hx+R*.55,hy+R*1.25],[hx+R*.05,hy+R*1.05]],.5)}else blob(g,[[hx-R*.62,hy+R*.42],[hx+R*.62,hy+R*.42],[hx+R*.45,hy+R*1.15],[hx,hy+R*1.38],[hx-R*.45,hy+R*1.15]],.5)},{fur:.2});
 if(cfg.beard&&!side)d.line(ink,.8,g=>{g.moveTo(hx-R*.1,hy+R*.66);g.lineTo(hx+R*.1,hy+R*.66)})}
// ---------------------------------------------------------------- coiffures
function HAIR_BACK(d,r,H){const[hx,hy]=r.head,R=r.R,side=r.view==='side',c=H.c;
 if(H.s==='long'||H.s==='braid'||H.s==='silver')d.part(c,g=>{if(side)blob(g,[[hx-R*.9,hy-R*.3],[hx+R*.2,hy-R*.5],[hx-R*.1,hy+R*1.9],[hx-R*1.1,hy+R*1.8]],.5);else blob(g,[[hx-R*1.05,hy],[hx+R*1.05,hy],[hx+R*1.1,hy+R*(H.s==='silver'?2.3:1.8)],[hx-R*1.1,hy+R*(H.s==='silver'?2.3:1.8)]],.45)},{fur:.15});
 if(H.s==='ponylow'&&!side)d.part(c,g=>taper(g,[[hx+R*.6,hy+R*.6],[hx+R*.9,hy+R*1.4],[hx+R*.7,hy+R*2]],[3.4,3.6,2]),{fur:.15});
 if(H.s==='pigtails')for(const s of[-1,1])d.part(c,g=>{if(side&&s<0)return;C(g,hx+s*R*1.05,hy-R*.1,R*.42)},{fur:.15})}
function HAIR_FRONT(d,r,H,cfg){if(!H.s||H.s==='none')return;const[hx,hy]=r.head,R=r.R,side=r.view==='side',back=r.view==='back',c=H.c;
 const cap=g=>{// calotte : haut du crâne
  if(back)blob(g,[[hx-R*1.06,hy+R*.1],[hx-R*.95,hy-R*.75],[hx,hy-R*1.12],[hx+R*.95,hy-R*.75],[hx+R*1.06,hy+R*.1],[hx+R*.95,hy+R*.82],[hx,hy+R*.95],[hx-R*.95,hy+R*.82]],.5);
  else if(side)blob(g,[[hx-R*1.02,hy+R*.45],[hx-R*.9,hy-R*.8],[hx+R*.2,hy-R*1.1],[hx+R*.95,hy-R*.55],[hx+R*.95,hy-R*.12],[hx+R*.35,hy-R*.18],[hx-R*.05,hy+R*.15],[hx-R*.35,hy+R*.62]],.5);
  else blob(g,[[hx-R*1.05,hy+R*.25],[hx-R*.95,hy-R*.75],[hx,hy-R*1.12],[hx+R*.95,hy-R*.75],[hx+R*1.05,hy+R*.25],[hx+R*.7,hy-R*.15],[hx+R*.25,hy-R*.05],[hx-R*.3,hy-R*.12],[hx-R*.75,hy-R*.1]],.5)};
 const st=H.s;const op={fur:.18,r:R*.7};
 if(st==='swept'&&!back){d.part(c,g=>{if(side)blob(g,[[hx-R*1.02,hy+R*.4],[hx-R*.9,hy-R*.8],[hx+R*.2,hy-R*1.1],[hx+R*.85,hy-R*.62],[hx+R*.35,hy-R*.55],[hx-R*.3,hy-R*.2],[hx-R*.4,hy+R*.5]],.5);else blob(g,[[hx-R*1.05,hy+R*.1],[hx-R*.95,hy-R*.75],[hx,hy-R*1.12],[hx+R*.95,hy-R*.75],[hx+R*1.05,hy+R*.1],[hx+R*.75,hy-R*.5],[hx,hy-R*.72],[hx-R*.75,hy-R*.5]],.5)},op)}
 if(st==='messy'||st==='spiky'||st==='swept'||st==='short'){if(st!=='swept'||back)d.part(c,cap,op);
  if(st==='messy')d.part(c,g=>{if(back){for(const[x0,y0,x1,y1]of[[-.55,.55,-.75,1.05],[-.1,.7,-.15,1.15],[.4,.6,.6,1.05]])taper(g,[[hx+R*x0,hy+R*y0],[hx+R*x1,hy+R*y1]],[3.4,.7]);taper(g,[[hx-R*.6,hy-R*.8],[hx-R*1.05,hy-R*1.25]],[3.6,.6]);taper(g,[[hx+R*.3,hy-R*.95],[hx+R*.6,hy-R*1.4]],[3.6,.6])}
   else if(side){taper(g,[[hx-R*.5,hy-R*.85],[hx-R*1.0,hy-R*1.3]],[4,.6]);taper(g,[[hx-R*.85,hy-R*.2],[hx-R*1.35,hy-R*.35]],[3.4,.6]);taper(g,[[hx-R*.8,hy+R*.3],[hx-R*1.15,hy+R*.6]],[3,.6]);taper(g,[[hx+R*.35,hy-R*.75],[hx+R*.85,hy-R*.35],[hx+R*1.05,hy+R*.05]],[4,3,.6]);taper(g,[[hx+R*.1,hy-R*.45],[hx+R*.3,hy+R*.02]],[3,.6])}
   else{for(const[x0,y0,x1,y1,w]of[[-.55,-.62,-.72,.0,3.6],[-.15,-.72,-.28,-.08,3.8],[.28,-.7,.36,-.1,3.6],[.62,-.55,.8,.05,3.2]])taper(g,[[hx+R*x0,hy+R*y0],[hx+R*(x0+x1)/2,hy+R*(y0+y1)/2],[hx+R*x1,hy+R*y1]],[w,w*.8,.6]);
    for(const s of[-1,1])taper(g,[[hx+s*R*.86,hy-R*.2],[hx+s*R*1.0,hy+R*.42]],[3.6,.8]);taper(g,[[hx+R*.1,hy-R*1.0],[hx+R*.55,hy-R*1.3],[hx+R*1.0,hy-R*1.25]],[4.2,3,.6])}},op);
  if(st==='spiky')d.part(c,g=>{const n=5;for(let i=0;i<n;i++){const a=-Math.PI*(.15+.7*i/(n-1)),bx=hx+Math.cos(a)*R*.8,by=hy+Math.sin(a)*R*.8;taper(g,[[bx,by],[hx+Math.cos(a)*R*1.45+(side?-R*.35:R*(i===n-1?.25:0)),hy+Math.sin(a)*R*1.4]],[4.2,.5])}if(!back&&!side)taper(g,[[hx+R*.2,hy-R*.5],[hx+R*.55,hy+R*.15]],[4,.6])},op);
  if(st==='swept')d.part(c,g=>{if(!back&&!side){for(const s of[-1,1])taper(g,[[hx+s*R*.82,hy-R*.45],[hx+s*R*.98,hy+R*.15],[hx+s*R*.88,hy+R*.5]],[3.4,3,1.4]);taper(g,[[hx-R*.75,hy-R*.62],[hx,hy-R*.95],[hx+R*.75,hy-R*.62]],[2.4,3.4,2.4])}
   if(side)taper(g,[[hx-R*.95,hy-R*.1],[hx-R*1.3,hy+R*.45]],[3,1.2]);if(H.tail&&(side||back))taper(g,[[hx-(side?R*.95:0),hy+R*.35],[hx-(side?R*1.35:0),hy+R*1.2]],[2.8,1.4])},op)}
 else if(st==='long'||st==='silver'||st==='braid'){d.part(c,cap,op);if(!back)d.part(c,g=>{if(side)taper(g,[[hx+R*.2,hy-R*.9],[hx+R*.85,hy-R*.2],[hx+R*.7,hy+R*.5]],[3,3,1]);else{taper(g,[[hx-R*.8,hy-R*.5],[hx-R*.95,hy+R*.6],[hx-R*.9,hy+R*1.3]],[3.5,3.2,1.6]);taper(g,[[hx+R*.8,hy-R*.5],[hx+R*.95,hy+R*.6],[hx+R*.9,hy+R*1.3]],[3.5,3.2,1.6]);taper(g,[[hx-R*.4,hy-R*.75],[hx-R*.05,hy-R*.2]],[4,1.2]);if(st==='silver')taper(g,[[hx+R*.1,hy-R*.8],[hx+R*.5,hy-R*.1]],[3.6,1])}},op);
  if(back)d.part(c,g=>{blob(g,[[hx-R*1.08,hy],[hx+R*1.08,hy],[hx+R*1.1,hy+R*(st==='silver'?2.2:1.7)],[hx-R*1.1,hy+R*(st==='silver'?2.2:1.7)]],.45)},op);
  if(st==='braid')d.part(c,g=>{const x=back?hx:side?hx-R*.6:hx+R*.85;for(let i=0;i<4;i++)C(g,x+(side?-i*.6:0),hy+R*(1.1+i*.42),R*(.3-i*.03))},{...op,fur:.1})}
 else if(st==='ponylow'||st==='bob'||st==='pigtails'||st==='bun'){d.part(c,cap,op);if(!back&&!side)d.part(c,g=>{for(const s of[-1,1])taper(g,[[hx+s*R*.85,hy-R*.5],[hx+s*R*(st==='bob'?1.05:.95),hy+R*(st==='bob'?.8:.45)]],[3.6,2.4]);taper(g,[[hx-R*.5,hy-R*.8],[hx+R*.1,hy-R*.35],[hx+R*.5,hy-R*.2]],[3,2.6,1])},op);
  if(st==='bob'&&(back||side))d.part(c,g=>blob(g,[[hx-R*1.1,hy-R*.2],[hx+R*(side?.5:1.1),hy-R*.2],[hx+R*(side?.4:1.1),hy+R*.85],[hx-R*1.1,hy+R*.85]],.5),op);
  if(st==='ponylow'&&back)d.part(c,g=>taper(g,[[hx,hy+R*.5],[hx+R*.15,hy+R*1.3],[hx,hy+R*1.9]],[3.6,3.6,2]),op);
  if(st==='bun')d.part(c,g=>C(g,hx-(side?R*.75:0),hy-R*(side?.75:1.05),R*.42),op);
  if(st==='pigtails'&&back)for(const s of[-1,1])d.part(c,g=>C(g,hx+s*R*1.05,hy-R*.1,R*.42),op)}
 else if(st==='bald'){if(back||side)d.part(c,g=>{if(side)blob(g,[[hx-R*1.02,hy-R*.1],[hx-R*.3,hy-R*.3],[hx-R*.1,hy+R*.5],[hx-R*.8,hy+R*.7]],.5);else blob(g,[[hx-R*1.06,hy-R*.2],[hx+R*1.06,hy-R*.2],[hx+R*.9,hy+R*.8],[hx-R*.9,hy+R*.8]],.5)},op);else for(const s of[-1,1])d.part(c,g=>E(g,hx+s*R*.92,hy-R*.05,R*.22,R*.36),op)}}
// ---------------------------------------------------------------- couvre-chefs
function HAT(d,r,h){const[hx,hy]=r.head,R=r.R,side=r.view==='side',back=r.view==='back',c=h.c||'#ffffff',c2=h.c2||A.mix(c,'#000000',.3);
 if(h.t==='goggles'){if(back){d.part(h.c2||'#3a2a20',g=>{g.roundRect(hx-R*1.02,hy-R*.62,R*2.04,R*.26,1)},{flat:.3});return}
  d.part(h.c2||'#3a2a20',g=>{if(side)g.roundRect(hx-R*.95,hy-R*.76,R*1.6,R*.2,1);else g.roundRect(hx-R*1.02,hy-R*.72,R*2.04,R*.2,1)},{flat:.3});
  for(const s of side?[1]:[-1,1]){const x=hx+(side?R*.5:s*R*.36),y=hy-R*.66;d.part(c,g=>C(g,x,y,R*.22),{r:2});d.part(h.lens||'#f6c84a',g=>C(g,x,y,R*.13),{gloss:8,hl:1})}return}
 if(h.t==='cap'){d.part(c,g=>{if(back)blob(g,[[hx-R*1.05,hy-R*.25],[hx-R*.9,hy-R*.85],[hx,hy-R*1.15],[hx+R*.9,hy-R*.85],[hx+R*1.05,hy-R*.25]],.5);else if(side)blob(g,[[hx-R*1.0,hy-R*.2],[hx-R*.8,hy-R*.9],[hx+R*.2,hy-R*1.15],[hx+R*.95,hy-R*.6],[hx+R*.95,hy-R*.3]],.5);else blob(g,[[hx-R*1.05,hy-R*.3],[hx-R*.9,hy-R*.9],[hx,hy-R*1.18],[hx+R*.9,hy-R*.9],[hx+R*1.05,hy-R*.3]],.5)},{r:R*.6});
  if(!back)d.part(c2,g=>{if(side)E(g,hx+R*1.15,hy-R*.32,R*.55,R*.14);else E(g,hx,hy-R*.28,R*.95,R*.24)},{flat:.3})}
 if(h.t==='beanie'){d.part(c,g=>{blob(g,[[hx-R*1.06,hy-R*.2],[hx-R*.95,hy-R*.9],[hx,hy-R*1.22],[hx+R*.95,hy-R*.9],[hx+R*1.06,hy-R*.2]],.5)},{fur:.15,r:R*.6});d.part(c2,g=>{g.roundRect(hx-R*1.08,hy-R*.4,R*2.16,R*.3,2)},{flat:.3});if(h.pom)d.part(h.pom,g=>C(g,hx,hy-R*1.25,R*.25),{fur:.2})}
 if(h.t==='hard'){d.part(c,g=>{blob(g,[[hx-R*1.05,hy-R*.3],[hx-R*.95,hy-R*.95],[hx,hy-R*1.25],[hx+R*.95,hy-R*.95],[hx+R*1.05,hy-R*.3]],.5)},{gloss:6,r:R*.7});d.part(c2,g=>E(g,hx,hy-R*.3,R*1.25,R*.2),{flat:.3});
  if(!back&&h.lamp)d.part('#fff4c0',g=>{C(g,hx+(side?R*.85:0),hy-R*.75,R*.22)},{emit:2})}
 if(h.t==='wide'||h.t==='straw'||h.t==='sou'){const bw=h.t==='sou'?1.2:1.45;d.part(c2,g=>E(g,hx,hy-R*.42,R*bw,R*.36),{flat:.3,r:2});d.part(c,g=>blob(g,[[hx-R*.82,hy-R*.45],[hx-R*.7,hy-R*1.05],[hx,hy-R*1.22],[hx+R*.7,hy-R*1.05],[hx+R*.82,hy-R*.45]],.5),{r:R*.5,noise:h.t==='straw'?.12:0});
  if(h.band)d.part(h.band,g=>{g.roundRect(hx-R*.83,hy-R*.7,R*1.66,R*.24,1)},{flat:.3});if(h.flower&&!back)d.part(h.flower,g=>C(g,hx+R*.55,hy-R*.72,R*.18),{})}
 if(h.t==='sailor'){d.part(c,g=>E(g,hx,hy-R*.7,R*.95,R*.42),{r:R*.4});d.part(c2,g=>{g.roundRect(hx-R*.9,hy-R*.62,R*1.8,R*.22,1)},{flat:.3});if(h.pom)d.part(h.pom,g=>C(g,hx,hy-R*1.1,R*.2),{fur:.2})}
 if(h.t==='peaked'){d.part(c,g=>blob(g,[[hx-R*1.0,hy-R*.45],[hx-R*1.05,hy-R*1.05],[hx,hy-R*1.25],[hx+R*1.05,hy-R*1.05],[hx+R*1.0,hy-R*.45]],.4),{r:R*.5});d.part(c2,g=>{g.roundRect(hx-R*1.0,hy-R*.62,R*2,R*.22,1)},{flat:.3});
  if(!back)d.part('#1a1a24',g=>{if(side)E(g,hx+R*1.0,hy-R*.36,R*.5,R*.12);else E(g,hx,hy-R*.36,R*.8,R*.18)},{gloss:6});if(!back&&h.badge)d.part(h.badge,g=>C(g,hx+(side?R*.6:0),hy-R*.85,R*.16),{gloss:6})}
 if(h.t==='beret'){d.part(c,g=>E(g,hx-(side?R*.2:R*.15),hy-R*.85,R*1.0,R*.4,side?0:-.12),{r:R*.4});d.part(c,g=>C(g,hx,hy-R*1.25,R*.1),{})}
 if(h.t==='hood'){d.part(c,g=>{if(back)blob(g,[[hx-R*1.15,hy+R*.5],[hx-R*1.05,hy-R*.8],[hx,hy-R*1.2],[hx+R*1.05,hy-R*.8],[hx+R*1.15,hy+R*.5],[hx,hy+R*1.1]],.5);else if(side)blob(g,[[hx-R*1.1,hy+R*.8],[hx-R*1.05,hy-R*.7],[hx+R*.1,hy-R*1.2],[hx+R*.85,hy-R*.6],[hx+R*.55,hy-R*.2],[hx+R*.1,hy+R*.3],[hx-R*.1,hy+R*.9]],.5);else{blob(g,[[hx-R*1.15,hy+R*.9],[hx-R*1.1,hy-R*.7],[hx,hy-R*1.2],[hx+R*1.1,hy-R*.7],[hx+R*1.15,hy+R*.9],[hx+R*.82,hy+R*.6],[hx+R*.8,hy-R*.1],[hx,hy-R*.62],[hx-R*.8,hy-R*.1],[hx-R*.82,hy+R*.6]],.5)}},{r:R*.5});
  if(h.visor&&!back)d.part(h.visor,g=>{if(side)g.roundRect(hx+R*.2,hy-R*.05,R*.8,R*.4,2);else g.roundRect(hx-R*.78,hy-R*.08,R*1.56,R*.44,3)},{gloss:5,hl:1})}
 if(h.t==='nurse'){d.part('#ffffff',g=>{poly(g,[[hx-R*.6,hy-R*.75],[hx+R*.6,hy-R*.75],[hx+R*.45,hy-R*1.2],[hx-R*.45,hy-R*1.2]])},{flat:.3});if(!back)d.part('#e8484f',g=>{g.rect(hx-R*.06,hy-R*1.12,R*.12,R*.34);g.rect(hx-R*.17,hy-R*1.01,R*.34,R*.12)},{flat:.2})}
 if(h.t==='crown'){d.part(c,g=>poly(g,[[hx-R*.7,hy-R*.75],[hx-R*.75,hy-R*1.3],[hx-R*.35,hy-R*1.0],[hx,hy-R*1.4],[hx+R*.35,hy-R*1.0],[hx+R*.75,hy-R*1.3],[hx+R*.7,hy-R*.75]]),{gloss:6,hl:1})}
 if(h.t==='mask'&&!back){d.part(c,g=>{if(side)blob(g,[[hx+R*.05,hy-R*.2],[hx+R*.95,hy-R*.3],[hx+R*.95,hy+R*.35],[hx+R*.2,hy+R*.3]],.5);else blob(g,[[hx-R*.95,hy-R*.15],[hx+R*.95,hy-R*.15],[hx+R*.7,hy+R*.42],[hx,hy+R*.3],[hx-R*.7,hy+R*.42]],.5)},{gloss:7,hl:1});
  for(const s of side?[1]:[-1,1])d.flat(h.eyeC||'#e84aff',g=>E(g,hx+(side?R*.55:s*R*.38),hy+R*.1,R*.14,R*.07),{min:1})}
 if(h.t==='bandana'){d.part(c,g=>{blob(g,[[hx-R*1.05,hy-R*.2],[hx-R*.9,hy-R*.9],[hx,hy-R*1.15],[hx+R*.9,hy-R*.9],[hx+R*1.05,hy-R*.2],[hx,hy-R*.45]],.5)},{r:R*.5});if(back||side)d.part(c,g=>{taper(g,[[hx-(side?R*.9:0),hy-R*.2],[hx-(side?R*1.4:R*.35),hy+R*.35]],[2.4,1.2]);if(!side)taper(g,[[hx,hy-R*.2],[hx+R*.35,hy+R*.4]],[2.4,1.2])},{})}}
window.PERSON=drawPerson;window.RIG=rig;
const ITEM={
 cane:(d,r,cfg,s)=>{if(s!==(r.view==='side'?'n':'r'))return;const h=r.ha[s];d.part('#6a4a30',g=>cap(g,h[0]+1,h[1]-1,h[0]+3,r.gy-1,1.2,1.2),{})},
 staff:(d,r,cfg,s)=>{if(s!==(r.view==='side'?'n':'r'))return;const h=r.ha[s];d.part('#7a5a38',g=>cap(g,h[0]+1,r.shY-20,h[0]+1.5,r.gy-1,1.4,1.3),{});d.part('#fff2b0',g=>{poly(g,[[h[0]+1,r.shY-30],[h[0]+5,r.shY-23],[h[0]+1,r.shY-16],[h[0]-3,r.shY-23]])},{emit:2})},
 rod:(d,r,cfg,s)=>{if(s!==(r.view==='side'?'n':'r'))return;const h=r.ha[s],dir=r.view==='side'?1:1;d.line('#6a4a30',1.6,g=>{g.moveTo(h[0],h[1]);g.lineTo(h[0]+10*dir,h[1]-34)});d.line('#e8e4f0',.7,g=>{g.moveTo(h[0]+10*dir,h[1]-34);g.lineTo(h[0]+15*dir,h[1]-6)},{thin:1,free:1})},
 lantern:(d,r,cfg,s)=>{if(s!==(r.view==='side'?'f':'l'))return;const h=r.ha[s];d.part('#3a3450',g=>{g.roundRect(h[0]-3,h[1]+2,6,8,1)},{});d.part('#ffe08a',g=>{g.rect(h[0]-2,h[1]+3.5,4,5)},{emit:2})},
 pick:(d,r)=>{if(r.view==='front')return;const x=r.cx+(r.view==='side'?-4:2);d.part('#7a5a38',g=>cap(g,x-8,r.hipY,x+8,r.shY-10,1.3,1.3),{});d.part('#8a8a9a',g=>{blob(g,[[x+2,r.shY-14],[x+14,r.shY-9],[x+13,r.shY-7],[x+3,r.shY-11],[x-6,r.shY-5],[x-7,r.shY-7]],.3)},{gloss:5})},
 scope:(d,r,cfg,s)=>{if(s!==(r.view==='side'?'n':'r'))return;const h=r.ha[s];d.part('#c8963a',g=>cap(g,h[0]-2,h[1]+1,h[0]+6,h[1]-12,2,1.4),{gloss:6})},
 bag:(d,r)=>{if(r.view==='back')return;const x=r.view==='side'?r.cx-2:r.cx-r.tw[1]/2-1;d.part('#8a6a3a',g=>{g.roundRect(x-3,r.hipY-4,7,7,2)},{})},
 harness:(d,r)=>{if(r.view==='back')return;d.line('#e8c040',1.2,g=>{g.moveTo(r.cx-6,r.hipY-1);g.lineTo(r.cx-3,r.hipY+3);g.moveTo(r.cx+6,r.hipY-1);g.lineTo(r.cx+3,r.hipY+3)},{lit:1})},
 bow:(d,r,cfg)=>{const[hx,hy]=r.head,R=r.R;if(r.view==='front'||r.view==='back')for(const s of[-1,1])d.part(cfg.bowC||'#f6c445',g=>{poly(g,[[hx+s*R*1.0,hy-R*.55],[hx+s*R*1.45,hy-R*.85],[hx+s*R*1.45,hy-R*.25]])},{});else d.part(cfg.bowC||'#f6c445',g=>{poly(g,[[hx-R*.6,hy-R*.9],[hx-R*1.1,hy-R*1.3],[hx-R*1.2,hy-R*.6]])},{})},
 crescent:(d,r)=>{if(r.view==='back')return;const[hx,hy]=r.head,R=r.R,x=hx+(r.view==='side'?-R*.2:R*.55),y=hy-R*.85;d.flat('#e8e4f6',g=>{g.arc(x,y,R*.22,Math.PI*.3,Math.PI*1.7);g.arc(x+R*.1,y,R*.16,Math.PI*1.6,Math.PI*.4,true)},{lit:1})},
 stars:(d,r)=>{if(r.view!=='back')return;for(let i=0;i<6;i++){const x=r.cx-9+(i*7)%18,y=r.shY+3+(i*5)%20;d.flat('#f6e27a',g=>C(g,x,y,.8),{min:1})}},
 bandaid:(d,r)=>{if(r.view==='back')return;const k=r.kn[r.view==='side'?'n':'l'];d.flat('#f2d0a0',g=>{g.rect(k[0]-2,k[1]-1,4,2)})},
 mustache:(d,r)=>{if(r.view==='back')return;const[hx,hy]=r.head,R=r.R;if(r.view==='side')d.part(r.hairC||'#8a8478',g=>E(g,hx+R*.72,hy+R*.48,R*.22,R*.1),{});else d.part('#8a8478',g=>{E(g,hx-R*.15,hy+R*.5,R*.2,R*.1);E(g,hx+R*.15,hy+R*.5,R*.2,R*.1)},{})},
 apron:(d,r,cfg)=>{if(r.view==='back')return;const c=cfg.apronC||'#f6efe2';d.part(c,g=>{if(r.view==='side')g.roundRect(r.cx+1,r.shY+5,6,r.hipY-r.shY+6,2);else g.roundRect(r.cx-6.5,r.shY+5,13,r.hipY-r.shY+6,3)},{flat:.3})},
 shawl:(d,r,cfg)=>{const c=cfg.shawlC||'#a890c8';d.part(c,g=>{if(r.view==='back')blob(g,[[r.cx-12,r.shY-1],[r.cx+12,r.shY-1],[r.cx+10,r.shY+9],[r.cx,r.shY+15],[r.cx-10,r.shY+9]],.4);else blob(g,[[r.cx-12,r.shY-1],[r.cx+12,r.shY-1],[r.cx+11,r.shY+6],[r.cx,r.shY+9],[r.cx-11,r.shY+6]],.4)},{fur:.12})}};
const MODS=(...ks)=>{const m={};for(const k of ks){const[f,slot]=k.split('@');const fn=ITEM[f];const sl=slot||(f==='pick'?'behind':['cane','staff','rod','lantern','scope'].includes(f)?'hand':f==='bow'||f==='crescent'||f==='mustache'?'head':f==='stars'||f==='harness'||f==='bag'||f==='apron'||f==='shawl'?'torso':'front');const prev=m[sl];m[sl]=prev?(...a)=>{prev(...a);fn(...a)}:fn}return m};
window.MODS=MODS;
// ---------------------------------------------------------------- distribution
const SUN=(d,r)=>{const x=r.cx+5.5,y=r.shY+6;d.flat('#f6c445',g=>C(g,x,y,1.6),{lit:1})};
const ECL=(d,r)=>{const x=r.cx,y=r.shY+7;d.flat('#1a1028',g=>C(g,x,y,3.6));d.line('#c070ff',1.1,g=>C(g,x,y,3.4))};
const MOON=(d,r)=>{const x=r.cx,y=r.shY+7;d.flat('#e6e0f6',g=>{g.arc(x,y,3.4,Math.PI*.35,Math.PI*1.65);g.arc(x+1.6,y,2.6,Math.PI*1.55,Math.PI*.45,true)},{lit:1})};
const P=window.PEOPLE={
 hero:{skin:'#f4c8a0',hair:{s:'messy',c:'#5a3420'},eye:'#5a3a24',hat:{t:'goggles',c:'#c8963a',c2:'#5a3a24',lens:'#ffcc55'},top:{t:'open',c:'#2f4c86',c2:'#f2ead8',trim:'#f0a83a',belt:'#6a4228',emblem:SUN},slv:'long',bot:{t:'shorts',c:'#b08a5a'},sockTop:'#f2ead8',shoe:{c:'#7a4a2a',t:'boot'},acc:['pack','scarf'],packC:'#b88446',packC2:'#7a4e28',scarfC:'#d8443a',
  mods:{hand:(d,r,c,s)=>{if(s===(r.view==='side'?'n':'r')){const h=r.ha[s];d.part('#c8963a',g=>{g.roundRect(h[0]-3.6,h[1]-4.8,7.2,2.6,1)},{gloss:6});d.flat('#ff9a3a',g=>C(g,h[0],h[1]-3.5,.9),{min:1})}}}},
 rival:{skin:'#eec0a0',hair:{s:'spiky',c:'#2e2a4a'},eye:'#c88a2a',brow:'angry',top:{t:'hoodie',c:'#262a36',trim:'#3ac0b0',belt:'#1a1c24'},slv:'long',bot:{t:'pants',c:'#3a3f52'},shoe:{c:'#e8eef0'},acc:['scarf'],scarfC:'#2ab0a0',glove:'#2a2e3a'},
 prof:{skin:'#efc6a6',hair:{s:'swept',c:'#d8d4dc',tail:1},eye:'#3a5a3a',beard:'#cfcbd4',top:{t:'open',c:'#f4f2ec',c2:'#5a8a52',len:'coat',trim:'#d8d4cc'},slv:'long',bot:{t:'pants',c:'#6a5848'},shoe:{c:'#4a3424'},acc:['glasses'],build:{h:1.05}},
 mom:{skin:'#f4c8a8',hair:{s:'ponylow',c:'#6a4028'},eye:'#5a3a24',lash:1,top:{t:'dress',c:'#e07a9a'},slv:'short',bot:{t:'skirt',c:'#e07a9a',len:12},sock:'#f4c8a8',shoe:{c:'#8a4a5a'},mods:MODS('apron')},
 grunt:{skin:'#e8c0a0',hair:{s:'none'},eye:'#3a2a4a',top:{t:'suit',c:'#2e2448',belt:'#16121e',emblem:ECL},slv:'long',bot:{t:'pants',c:'#2e2448'},shoe:{c:'#16121e',t:'boot'},glove:'#16121e',hat:{t:'hood',c:'#3a2c5a',visor:'#1a1028'}},
 vex:{skin:'#e6c0a8',hair:{s:'long',c:'#3a1e5a'},eye:'#c88a2a',hat:{t:'mask',c:'#ece8f4',eyeC:'#e84aff'},top:{t:'coat',c:'#1e1a2a',trim:'#9a4ad0',len:'coat',belt:'#120e1a',emblem:ECL},slv:'long',bot:{t:'pants',c:'#1e1a2a'},shoe:{c:'#120e1a',t:'boot'},glove:'#120e1a',acc:['cape'],capeC:'#2a1640'},
 valen:{skin:'#e6c0a8',hair:{s:'long',c:'#3a1e5a'},eye:'#c88a2a',brow:'sad',top:{t:'coat',c:'#2a2638',trim:'#5a4a70',len:'long'},slv:'long',bot:{t:'pants',c:'#2a2638'},shoe:{c:'#1a1622',t:'boot'},acc:['scarf'],scarfC:'#4a2a6a'},
 selene:{skin:'#f0d0c0',hair:{s:'silver',c:'#d8d4ec'},eye:'#7a5ab8',lash:1,top:{t:'coat',c:'#3a2a5a',trim:'#c8c0e0',len:'long',belt:'#c8c0e0',emblem:MOON},slv:'long',bot:{t:'pants',c:'#2a2040'},shoe:{c:'#2a2040',t:'boot'},glove:'#e8e4f0',mods:MODS('crescent')},
 leader:{skin:'#e8b890',hair:{s:'spiky',c:'#c8482a'},eye:'#6a3a1a',brow:'angry',hat:{t:'hard',c:'#e8a020',c2:'#b8781a',lamp:1},top:{t:'overalls',c:'#f2ead8'},slv:'short',bot:{t:'overalls',c:'#d8702e'},shoe:{c:'#5a3a22',t:'boot',big:1.1},glove:'#7a5030',build:{w:1.12},mods:MODS('pick')},
 maelle:{skin:'#f0caa8',hair:{s:'braid',c:'#24407a'},eye:'#2a8ab0',lash:1,hat:{t:'peaked',c:'#1e3a6a',c2:'#e8c060',badge:'#e8c060'},top:{t:'coat',c:'#1e3a6a',trim:'#e8c060',len:'coat',belt:'#e8c060'},slv:'long',bot:{t:'pants',c:'#f2f0ea'},shoe:{c:'#1a2030',t:'boot'},acc:['scarf'],scarfC:'#f4f2ec',mods:MODS('lantern')},
 lumen:{skin:'#e8c0a0',hair:{s:'none'},eye:'#5a4a2a',beard:'#f2eee6',hat:{t:'hood',c:'#e0d0a8'},top:{t:'robe',c:'#d4c294',trim:'#c8963a',len:'robe',belt:'#8a6a3a'},slv:'long',bot:{t:'pants',c:'#8a7a5a'},shoe:{c:'#6a4a30'},mods:MODS('staff')},
 kid:{skin:'#f4c8a0',hair:{s:'short',c:'#e09a40'},eye:'#4a3020',hat:{t:'cap',c:'#3a8ad0',c2:'#2a6aa8'},top:{t:'tee',c:'#f6c445'},slv:'short',bot:{t:'shorts',c:'#3a5a9a'},shoe:{c:'#e8484f'},build:{h:.82},mods:MODS('bandaid')},
 girlkid:{skin:'#f4cca8',hair:{s:'pigtails',c:'#8a5030'},eye:'#5a3a24',lash:1,top:{t:'dress',c:'#f6c445'},slv:'short',bot:{t:'skirt',c:'#f6c445',len:10},sock:'#ffffff',shoe:{c:'#e8484f'},build:{h:.84},mods:MODS('bow'),bowC:'#e8484f'},
 girl:{skin:'#f2c8a4',hair:{s:'ponylow',c:'#a0602a'},eye:'#4a3020',lash:1,hat:{t:'wide',c:'#d8b070',c2:'#c09858',band:'#4a8a4a'},top:{t:'tee',c:'#5aa060',belt:'#6a4a2a'},slv:'short',bot:{t:'shorts',c:'#a88a5a'},sockTop:'#f2ead8',shoe:{c:'#6a4228',t:'boot'},acc:['pack'],packC:'#c86a3a',packC2:'#8a4a28'},
 assistant:{skin:'#f2caa8',hair:{s:'bob',c:'#3a2a1e'},eye:'#3a2a1e',lash:1,top:{t:'open',c:'#f4f2ec',c2:'#8ac0e0',len:'long'},slv:'long',bot:{t:'skirt',c:'#3a4a6a',len:10},sock:'#3a3a4a',shoe:{c:'#2a2a3a'},acc:['glasses']},
 botanist:{skin:'#f2c8a4',hair:{s:'long',c:'#b8582e'},eye:'#3a5a2a',lash:1,hat:{t:'straw',c:'#e8cc80',c2:'#d0b060',band:'#e86a8a',flower:'#ff8aa8'},top:{t:'dress',c:'#f2ead8'},slv:'short',bot:{t:'skirt',c:'#6aa860',len:12},sock:'#f2c8a4',shoe:{c:'#6a4a2a'},mods:MODS('apron','bag'),apronC:'#6aa860'},
 climber:{skin:'#e8bc94',hair:{s:'ponylow',c:'#2a1e1e'},eye:'#3a2a1e',lash:1,hat:{t:'bandana',c:'#e8484f'},top:{t:'tee',c:'#3a8ad0'},slv:'none',bot:{t:'pants',c:'#4a4a5a'},shoe:{c:'#e8a020'},glove:'#5a4a3a',mods:MODS('harness','bag')},
 old:{skin:'#e8c0a0',hair:{s:'bald',c:'#d8d4dc'},eye:'#3a3a3a',beard:null,hat:{t:'beret',c:'#4a4a5a'},top:{t:'open',c:'#7a6a4a',c2:'#e8e2d4'},slv:'long',bot:{t:'pants',c:'#5a5048'},shoe:{c:'#3a2a20'},build:{h:.95},mods:MODS('cane','mustache')},
 granny:{skin:'#f0c8b0',hair:{s:'bun',c:'#e2dee8'},eye:'#5a4a5a',top:{t:'dress',c:'#6a4a7a'},slv:'long',bot:{t:'skirt',c:'#6a4a7a',len:16},sock:'#5a4a5a',shoe:{c:'#3a2a3a'},acc:['glasses'],build:{h:.92},mods:MODS('shawl','cane'),shawlC:'#b8a0d8'},
 scout:{skin:'#f2c4a0',hair:{s:'ponylow',c:'#6a4428'},eye:'#3a4a2a',hat:{t:'wide',c:'#8a7a4a',c2:'#7a6a3a',band:'#4a3a2a'},top:{t:'tee',c:'#c8b070',belt:'#5a4428'},slv:'short',bot:{t:'shorts',c:'#6a5a3a'},sockTop:'#3a6a3a',shoe:{c:'#5a3a22',t:'boot'},acc:['scarf','pack'],scarfC:'#3a8a4a',packC:'#7a6a3a'},
 camper:{skin:'#eec09a',hair:{s:'short',c:'#3a2418'},eye:'#3a2a1e',hat:{t:'beanie',c:'#d8483a',c2:'#a8302a',pom:'#f2ead8'},top:{t:'jacket',c:'#3a7a5a',trim:'#f2c040',belt:'#2a2a2a'},slv:'long',bot:{t:'pants',c:'#5a5048'},shoe:{c:'#4a3424',t:'boot'},acc:['pack'],packC:'#e8a020',packC2:'#a86a10'},
 mountaineer:{skin:'#e8b890',hair:{s:'short',c:'#6a3a20'},eye:'#3a2a1e',beard:'#6a3a20',hat:{t:'beanie',c:'#3a5a9a',c2:'#2a4070'},top:{t:'jacket',c:'#c86a2a',trim:'#2a2a2a',belt:'#3a2a20'},slv:'long',bot:{t:'pants',c:'#4a4a3a'},shoe:{c:'#3a2a20',t:'boot',big:1.1},glove:'#3a3a3a',build:{w:1.1},acc:['pack'],packC:'#4a6a3a'},
 caver:{skin:'#eec09a',hair:{s:'short',c:'#2a2018'},eye:'#3a2a1e',hat:{t:'hard',c:'#f2f0ea',c2:'#b8b4aa',lamp:1},top:{t:'suit',c:'#e8783a',belt:'#3a2a20'},slv:'long',bot:{t:'pants',c:'#e8783a'},shoe:{c:'#3a2a20',t:'boot'},glove:'#4a3a2a',mods:MODS('bag')},
 miner:{skin:'#e8b890',hair:{s:'short',c:'#3a2418'},eye:'#3a2a1e',hat:{t:'hard',c:'#f0b020',c2:'#b8800a',lamp:1},top:{t:'overalls',c:'#a87a4a'},slv:'long',bot:{t:'overalls',c:'#5a5a6a'},shoe:{c:'#3a2a20',t:'boot'},glove:'#6a4a30',mods:MODS('pick','mustache')},
 sailor:{skin:'#f0c4a0',hair:{s:'short',c:'#4a3020'},eye:'#2a3a5a',hat:{t:'sailor',c:'#f6f6f8',c2:'#2a3a6a',pom:'#e8484f'},top:{t:'stripes',c:'#f6f6f8',c2:'#2a4a8a'},slv:'long',bot:{t:'pants',c:'#2a3a6a'},shoe:{c:'#1a1a24'},acc:['scarf'],scarfC:'#2a3a6a'},
 captain:{skin:'#e8b890',hair:{s:'short',c:'#a8a4b0'},eye:'#2a3a5a',beard:'#b8b4c0',hat:{t:'peaked',c:'#1e2a4a',c2:'#f2f0ea',badge:'#e8c060'},top:{t:'coat',c:'#1e2a4a',trim:'#e8c060',len:'long',belt:'#e8c060'},slv:'long',bot:{t:'pants',c:'#1e2a4a'},shoe:{c:'#1a1a24',t:'boot'},build:{w:1.08}},
 nurse:{skin:'#f6d0b8',hair:{s:'bun',c:'#f2a0c0'},eye:'#c85a8a',lash:1,hat:{t:'nurse'},top:{t:'dress',c:'#ffffff'},slv:'short',bot:{t:'skirt',c:'#ffffff',len:11},sock:'#f6d0b8',shoe:{c:'#f2a0c0'},mods:MODS('apron'),apronC:'#f6c4d8'},
 astro:{skin:'#f2caa8',hair:{s:'bob',c:'#8a6ab0'},eye:'#4a3a7a',lash:1,hat:{t:'beret',c:'#2a2a5a'},top:{t:'tee',c:'#e8e4f6'},slv:'long',bot:{t:'skirt',c:'#2a2a5a',len:10},sock:'#2a2a5a',shoe:{c:'#1a1a2a'},acc:['glasses','cape'],capeC:'#1e1e4a',mods:MODS('stars','scope')},
 lili:{skin:'#f6d0b4',hair:{s:'pigtails',c:'#6a3a8a'},eye:'#6a3a8a',lash:1,top:{t:'dress',c:'#c0a8e8'},slv:'short',bot:{t:'skirt',c:'#c0a8e8',len:10},sock:'#ffffff',shoe:{c:'#6a3a8a'},build:{h:.8},mods:MODS('bow'),bowC:'#f2f0fa'},
 fisher:{skin:'#eec09a',hair:{s:'long',c:'#2e4a3a'},eye:'#2a4a3a',lash:1,hat:{t:'straw',c:'#e8cc80',c2:'#d0b060',band:'#3a6a8a'},top:{t:'open',c:'#4a8a6a',c2:'#f2ead8'},slv:'short',bot:{t:'shorts',c:'#3a4a5a'},shoe:{c:'#e8b830',t:'boot'},mods:MODS('rod')},
 gus:{skin:'#e8b890',hair:{s:'short',c:'#e8e4ec'},eye:'#3a4a5a',beard:'#f0ecf2',hat:{t:'sou',c:'#f0c020',c2:'#c89a10'},top:{t:'coat',c:'#f0c020',len:'long',trim:'#c89a10'},slv:'long',bot:{t:'pants',c:'#3a4a3a'},shoe:{c:'#2a4a3a',t:'boot'},build:{h:.96},mods:MODS('rod')},
 vendor:{skin:'#f0c4a0',hair:{s:'short',c:'#5a3a24'},eye:'#3a2a1e',hat:{t:'cap',c:'#4a78d0',c2:'#2a58a8'},top:{t:'tee',c:'#ffffff'},slv:'short',bot:{t:'pants',c:'#3a3a4a'},shoe:{c:'#2a2a2a'},mods:MODS('apron','mustache'),apronC:'#4a78d0'},
};
window.BAKE_people_preview=()=>0;
})();
