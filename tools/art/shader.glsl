#version 300 es
// Procedural key-art kit. Every game visual in /public/art is rendered from this file.
precision highp float;
out vec4 fragColor;

uniform vec2 uRes;
uniform int uScene;   // 0 terrain, 1 ocean, 2 space, 3 city, 4 forest, 5 road, 6 abstract, 7 underwater, 8 ruins, 9 stadium
uniform int uMode;    // 0 colour, 1 depth
uniform float uSeed;
uniform vec3 uA, uB, uC, uD, uE;   // palette: zenith, horizon, light, ground, accent
uniform vec4 uP, uQ;               // scene params
uniform vec4 uCam;                 // x, z, height above ground, yaw
uniform vec3 uLook;                // pitch, focal length, roll
uniform vec2 uSun;                 // azimuth (relative to yaw), elevation
uniform vec4 uFig;                 // screen x, feet y, height, type (0 = none)
uniform vec4 uRock;                // side (-1/1, 0 none), plateau y, edge x, roughness
uniform vec4 uGrade;               // exposure, contrast, saturation, grain

#define PI 3.14159265
vec3 SUN; vec2 UV; float ASP;

// ---------------------------------------------------------------- noise
float h12(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float h13(vec3 p){ p=fract(p*.1031); p+=dot(p,p.zyx+31.32); return fract((p.x+p.y)*p.z); }
vec2 h22(vec2 p){ vec3 q=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); q+=dot(q,q.yzx+33.33); return fract((q.xx+q.yz)*q.zy); }
float vn(vec2 p){ vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h12(i),h12(i+vec2(1,0)),u.x),mix(h12(i+vec2(0,1)),h12(i+vec2(1,1)),u.x),u.y); }
float vn3(vec3 p){ vec3 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),u.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),u.x),u.y),
             mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),u.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),u.x),u.y),u.z); }
const mat2 M2=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){ float s=0.,a=.5; for(int i=0;i<7;i++){ s+=a*vn(p); p=M2*p; a*=.5; } return s; }
float fbm4(vec2 p){ float s=0.,a=.5; for(int i=0;i<4;i++){ s+=a*vn(p); p=M2*p; a*=.5; } return s; }
float fbm3(vec3 p){ float s=0.,a=.5; for(int i=0;i<5;i++){ s+=a*vn3(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.5; } return s; }
vec3 vnd(vec2 x){ vec2 p=floor(x),f=fract(x),u=f*f*(3.-2.*f),du=6.*f*(1.-f);
  float a=h12(p),b=h12(p+vec2(1,0)),c=h12(p+vec2(0,1)),d=h12(p+vec2(1,1));
  return vec3(a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y, du*(vec2(b-a,c-a)+(a-b-c+d)*u.yx)); }

float sdCap(vec2 p,vec2 a,vec2 b,float r){ vec2 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h)-r; }
float sdTri(vec2 p,vec2 p0,vec2 p1,vec2 p2){
  vec2 e0=p1-p0,e1=p2-p1,e2=p0-p2,v0=p-p0,v1=p-p1,v2=p-p2;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.),pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.),pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  float s=sign(e0.x*e2.y-e0.y*e2.x);
  vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y); }
float sdBox2(vec2 p,vec2 b){ vec2 d=abs(p)-b; return length(max(d,0.))+min(max(d.x,d.y),0.); }

// ---------------------------------------------------------------- shared helpers
vec3 camRay(vec2 uv,float yaw,float pitch,float f){
  vec3 fw=vec3(sin(yaw)*cos(pitch),sin(pitch),cos(yaw)*cos(pitch));
  vec3 rt=normalize(cross(vec3(0,1,0),fw)); vec3 up=cross(fw,rt);
  float r=uLook.z; vec2 q=vec2(uv.x*cos(r)-uv.y*sin(r),uv.x*sin(r)+uv.y*cos(r));
  return normalize(fw*f+rt*q.x+up*q.y); }
vec3 sunDir(float yaw){ return normalize(vec3(sin(yaw+uSun.x)*cos(uSun.y),sin(uSun.y),cos(yaw+uSun.x)*cos(uSun.y))); }

float stars(vec2 p,float dens){
  float s=0.;
  for(int i=0;i<3;i++){
    vec2 q=p*(180.+float(i)*140.); vec2 c=floor(q); vec2 r=h22(c+float(i)*17.+uSeed);
    float b=step(1.-dens,h12(c+3.1*float(i)+uSeed));
    float d=length(fract(q)-r);
    s+=b*smoothstep(.09,0.,d)*(.4+r.x*1.6)*(1.-float(i)*.25);
  }
  return s; }

vec3 skyBase(vec3 rd){
  float y=max(rd.y,0.);
  vec3 col=mix(uB,uA,pow(y,.42));
  float s=max(dot(rd,SUN),0.);
  col+=uC*(pow(s,5.)*.28+pow(s,48.)*.55);
  col+=uC*smoothstep(.99935,.99965,s)*7.;
  return col; }

vec3 clouds(vec3 rd,vec3 col,float cover,float dark){
  if(rd.y<=0.) return col;
  vec2 p=rd.xz/(rd.y+.06)*.9+uSeed*1.3;
  float n=fbm(p*1.3+fbm(p*.7)*.8);
  float d=smoothstep(1.-cover,1.-cover+.35,n);
  float s=pow(max(dot(rd,SUN),0.),6.);
  vec3 cc=mix(uB*.55+uA*.2,uB*1.1,.5)*(1.-dark*.7);
  cc+=uC*(.25+s*1.4)*(1.-d*.6)*(1.-dark*.8);
  return mix(col,cc,d*smoothstep(0.,.18,rd.y)*.92); }

vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.); }

// ---------------------------------------------------------------- figure (key-art silhouette)
float sdFigure(vec2 q,float type){
  float d=1e3;
  if(type>2.5){ // astronaut
    d=length(q-vec2(0,.86))-.085;
    d=min(d,sdBox2(q-vec2(-.05,.66),vec2(.08,.13))-.02);
    d=min(d,sdCap(q,vec2(0,.78),vec2(0,.5),.09));
    d=min(d,sdCap(q,vec2(-.04,.5),vec2(-.07,.02),.042));
    d=min(d,sdCap(q,vec2(.04,.5),vec2(.08,.02),.042));
    d=min(d,sdCap(q,vec2(.09,.74),vec2(.15,.52),.034));
    d=min(d,sdCap(q,vec2(-.09,.74),vec2(-.13,.5),.034));
    return d; }
  float sway=sin(q.y*9.+uSeed)*.012;
  d=length(q-vec2(0,.9))-.064;
  if(type>1.5) d=min(d,length(q-vec2(-.014,.895))-.078); // hood
  d=min(d,sdCap(q,vec2(0,.78),vec2(0,.56),.088));
  d=min(d,sdCap(q,vec2(-.085,.79),vec2(.085,.79),.042));
  d=min(d,sdCap(q,vec2(-.04,.55),vec2(-.075,.03),.045));
  d=min(d,sdCap(q,vec2(.04,.55),vec2(.07,.03),.043));
  d=min(d,sdCap(q,vec2(-.1,.78),vec2(-.13,.52),.034));
  d=min(d,sdCap(q,vec2(.1,.78),vec2(.15,.57),.033));
  if(type<1.5){ // warrior: planted blade + cape
    d=min(d,sdCap(q,vec2(.13,.6),vec2(.26,-.02),.011));
    d=min(d,sdCap(q,vec2(.105,.66),vec2(.16,.56),.012)); }
  vec2 c=q; c.x+=sway*(.8-c.y);
  float cape=min(sdTri(c,vec2(-.09,.84),vec2(.07,.82),vec2(-.4,.16)),sdTri(c,vec2(-.09,.84),vec2(-.4,.16),vec2(-.12,.08)));
  d=min(d,cape-.004);
  return d; }

// returns (alpha, rim) in .xy, writes nothing else
vec2 figure(vec2 uv){
  if(uFig.w<.5) return vec2(0);
  vec2 q=(uv-uFig.xy)/uFig.z;
  float d=sdFigure(q,uFig.w)*uFig.z;
  float px=1.4/uRes.y;
  float a=smoothstep(px,-px,d);
  vec2 e=vec2(.002,0);
  vec2 g=normalize(vec2(sdFigure(q+e.xy,uFig.w)-sdFigure(q-e.xy,uFig.w),sdFigure(q+e.yx,uFig.w)-sdFigure(q-e.yx,uFig.w))+1e-6);
  vec2 sdir=normalize(vec2(sin(uSun.x)*1.3,max(uSun.y,.05))+1e-4);
  float rim=smoothstep(-.0018,0.,d)*max(dot(g,sdir),0.)*a;
  return vec2(a,rim); }

// foreground cliff silhouette; returns (alpha, rim, top y at this x)
vec3 cliff(vec2 uv){
  if(abs(uRock.x)<.5) return vec3(0);
  float sx=uv.x*uRock.x;
  float top=uRock.y+.035*fbm4(vec2(sx*7.,uSeed))+.05*(sx-uRock.z)-1.2*smoothstep(uRock.z+.01,uRock.z-.16,sx+.03*vn(vec2(uv.y*14.,2.)));
  float d=uv.y-top;
  float px=1.4/uRes.y;
  float a=smoothstep(px,-px,d);
  float rim=smoothstep(-.0035,0.,d)*a*smoothstep(-.4,.4,uv.x*sign(uSun.x+1e-3));
  return vec3(a,rim,top); }

// ---------------------------------------------------------------- 0 terrain
float TH(vec2 x,int oct){
  vec2 p=x*uP.y; float a=0.,b=1.; vec2 d=vec2(0);
  for(int i=0;i<14;i++){ if(i>=oct)break; vec3 n=vnd(p+uSeed); d+=n.yz; a+=b*n.x/(1.+dot(d,d)); b*=.5; p=M2*p; }
  float h=a*uP.x;
  h-=uP.w*exp(-pow(x.x*.25,2.)); // carved valley along z
  return h; }

vec3 planetDisc(vec3 rd,vec3 c,float R,vec3 base,vec3 tint,vec3 col){
  vec3 cd=normalize(c); float cosr=cos(R);
  float k=dot(rd,cd);
  vec3 t1=normalize(cross(cd,vec3(0,1,0))),t2=cross(t1,cd);
  vec2 q=vec2(dot(rd,t1),dot(rd,t2))/sin(R);
  float r=length(q);
  float glow=exp(-max(r-1.,0.)*9.)*.35;
  col+=tint*glow*smoothstep(1.6,1.,r);
  if(r<1.){
    vec3 n=vec3(q,sqrt(1.-r*r));
    float bands=fbm(vec2(n.y*6.+fbm(n.xy*3.)*1.2,n.x*.6)+uSeed);
    vec3 s=mix(base,base*1.6+tint*.2,bands);
    vec3 L=normalize(vec3(-.6,.3,.7));
    float l=smoothstep(-.15,.6,dot(n,L));
    col=mix(col,s*l+tint*pow(1.-n.z,3.)*.8,smoothstep(1.,.985,r)); }
  return col; }

vec3 aurora(vec3 rd,vec3 col){
  if(rd.y<0.) return col;
  float az=atan(rd.x,rd.z);
  vec3 acc=vec3(0);
  for(int i=0;i<3;i++){
    float fi=float(i);
    float base=.16+fi*.07+.08*sin(az*2.2+fi*1.7+uSeed)+.04*fbm4(vec2(az*3.,fi));
    float h=rd.y-base;
    float curtain=smoothstep(0.,.015,h)*exp(-h*(9.-fi*2.));
    float streak=.35+.65*fbm4(vec2(az*38.+fi*10.,h*2.));
    acc+=mix(uE,vec3(.75,.25,.85),smoothstep(0.,.25,h))*curtain*streak*(.6-fi*.12);
  }
  return col+acc*1.2; }

vec4 sceneTerrain(vec2 uv){
  float yaw=uCam.w;
  SUN=sunDir(yaw);
  vec3 ro=vec3(uCam.x,0.,uCam.y); ro.y=TH(ro.xz,8)+uCam.z;
  vec3 rd=camRay(uv,yaw,uLook.x,uLook.y);
  bool night=uQ.z>.5;
  float water=uP.z;
  float tmax=60.;
  float t=.05; float hit=0.;
  for(int i=0;i<420;i++){
    vec3 p=ro+rd*t; float h=p.y-max(TH(p.xz,8),water);
    if(abs(h)<.0008*t){ hit=1.; break; }
    if(t>tmax) break;
    t+=.42*h*(1.+t*.004);
  }
  vec3 sky=skyBase(rd);
  if(night){ sky+=stars(rd.xz/(rd.y+.3),.03)*smoothstep(0.,.2,rd.y)*.9; }
  if(uQ.w>2.5) sky=aurora(rd,sky);
  if(uQ.w>1.5&&uQ.w<2.5){ sky=planetDisc(rd,vec3(sin(yaw-.5),.28,cos(yaw-.5)),.24,uE*.5,uE,sky); sky=planetDisc(rd,vec3(sin(yaw+.42),.4,cos(yaw+.42)),.05,vec3(.6,.55,.6),uC,sky); }
  sky=clouds(rd,sky,uQ.y,night?.7:0.);
  vec3 col=sky; float depth=0.;
  if(hit>.5){
    vec3 p=ro+rd*t;
    bool isWater=p.y<=water+.0005;
    float e=.0012*t+.0004;
    vec3 n=normalize(vec3(TH(p.xz-vec2(e,0),13)-TH(p.xz+vec2(e,0),13),2.*e,TH(p.xz-vec2(0,e),13)-TH(p.xz+vec2(0,e),13)));
    // soft shadow
    float sh=1.; float st=.02;
    for(int i=0;i<64;i++){ vec3 q=p+SUN*st; float hh=q.y-TH(q.xz,7); sh=min(sh,14.*hh/st); st+=clamp(hh,.02,.6); if(sh<.001||st>14.)break; }
    sh=clamp(sh,0.,1.);
    float slope=n.y;
    float r=fbm4(p.xz*40.);
    vec3 mat=uD*(.65+.5*r);
    float grass=smoothstep(.72,.9,slope)*smoothstep(uQ.x,uQ.x-.35,p.y);
    mat=mix(mat,uE*(.55+.45*r),grass*(uQ.w<.5?1.:0.));
    float snow=smoothstep(uQ.x-.06,uQ.x+.05,p.y+.08*r)*smoothstep(.55,.78,slope);
    mat=mix(mat,vec3(.92,.94,1.)*.95,snow);
    float dif=clamp(dot(n,SUN),0.,1.)*sh;
    float amb=.5+.5*n.y;
    float bac=clamp(dot(n,normalize(vec3(-SUN.x,0,-SUN.z))),0.,1.);
    vec3 lin=uC*dif*(night?1.6:3.6)+mix(uB,uA,.5)*amb*(night?.45:.5)+uC*bac*.1;
    col=mat*lin;
    if(uQ.w>.5&&uQ.w<1.5){ // volcanic lava veins
      float f=fbm(p.xz*5.+3.);
      float lv=smoothstep(.018,.0,abs(f-.5))*smoothstep(.3,.08,p.y/max(uP.x,.01))*smoothstep(3.,8.,t);
      col+=vec3(1.,.3,.05)*lv*3.+vec3(1.,.25,.05)*smoothstep(.25,.0,p.y/uP.x)*.35; }
    if(isWater){
      vec3 rr=reflect(rd,vec3(fbm4(p.xz*60.)*.04-.02,1.,fbm4(p.zx*60.)*.04-.02));
      float fr=.04+.96*pow(1.-max(-rd.y,0.),5.);
      col=mix(uD*.15,skyBase(rr),fr*.9);
    }
    float fogA=1.-exp(-t*.035*(1.+uQ.y));
    float hf=exp(-max(p.y,0.)*2.2)*(1.-exp(-t*.05));
    vec3 fogC=mix(uB,uC*1.3,pow(max(dot(rd,SUN),0.),5.)*.75);
    if(uQ.w>.5&&uQ.w<1.5) fogC=mix(fogC,vec3(.9,.3,.08),.35);
    col=mix(col,fogC,clamp(fogA+hf*.35,0.,1.));
    depth=1.-clamp(t/30.,0.,1.);
    depth=pow(depth,1.5);
  }
  if(uQ.w>.5&&uQ.w<1.5){ // embers
    vec2 q=uv*vec2(26.,15.)+vec2(0,uSeed); vec2 c=floor(q); vec2 o=h22(c);
    float sz=mix(.03,.09,h12(c+9.));
    col+=vec3(1.,.42,.1)*smoothstep(sz,0.,length(fract(q)-o))*step(.9,h12(c+5.))*1.6*smoothstep(.3,-.2,uv.y);
  }
  return vec4(col,depth); }

// ---------------------------------------------------------------- 1 ocean
const mat2 OM=mat2(1.6,1.2,-1.2,1.6);
float seaOct(vec2 uv,float ch){ uv+=vn(uv); vec2 wv=1.-abs(sin(uv)); vec2 sw=abs(cos(uv)); wv=mix(wv,sw,wv); return pow(1.-pow(wv.x*wv.y,.65),ch); }
float seaMap(vec3 p,int it){
  float fq=.16,amp=uP.x,ch=uP.y,h=0.; vec2 uv=p.xz; uv.x*=.75;
  for(int i=0;i<8;i++){ if(i>=it)break; float d=seaOct((uv+uSeed)*fq,ch)+seaOct((uv-uSeed)*fq,ch); h+=d*amp; uv*=OM; fq*=1.9; amp*=.22; ch=mix(ch,1.,.2); }
  return p.y-h; }
vec4 sceneOcean(vec2 uv){
  float yaw=uCam.w; SUN=sunDir(yaw);
  vec3 ro=vec3(uCam.x,uCam.z,uCam.y);
  vec3 rd=camRay(uv,yaw,uLook.x,uLook.y);
  vec3 sky=skyBase(rd);
  if(uQ.z>.5) sky+=stars(rd.xz/(rd.y+.3),.03)*smoothstep(0.,.2,rd.y);
  sky=clouds(rd,sky,uQ.y,uQ.x);
  if(uQ.w>.5) sky+=vec3(.45,.5,.7)*exp(-length((uv-vec2(-.35,.3))*vec2(.6,1.))*3.5)*smoothstep(.45,.75,fbm(uv*4.+uSeed))*1.4;
  vec3 col=sky; float depth=0.;
  // horizon silhouettes (islands / lighthouse rock)
  float hy=rd.y;
  float az=atan(rd.x,rd.z)-yaw;
  if(uP.z>.5){
    float isl=.012+.03*smoothstep(.0,.18,.18-abs(az-.35))*fbm4(vec2(az*20.,1.))*2.+.018*smoothstep(.1,0.,abs(az+.5))*fbm4(vec2(az*30.,4.))*2.;
    if(hy<isl&&hy>-0.002){ col=mix(uB*.35,uA*.2,.4); depth=.25; }
  }
  if(rd.y<0.){
    float tm=0.,tx=1000.;
    float hx=seaMap(ro+rd*tx,3);
    float hm=seaMap(ro,3); float tmid=0.;
    for(int i=0;i<10;i++){ tmid=mix(tm,tx,hm/(hm-hx)); float hmid=seaMap(ro+rd*tmid,3); if(hmid<0.){tx=tmid;hx=hmid;}else{tm=tmid;hm=hmid;} }
    vec3 p=ro+rd*tmid;
    float e=.04*tmid*.01+.002;
    float hp=seaMap(p,6);
    vec3 n=normalize(vec3(seaMap(vec3(p.x+e,p.y,p.z),6)-hp,e,seaMap(vec3(p.x,p.y,p.z+e),6)-hp));
    n=mix(n,vec3(0,1,0),smoothstep(0.,300.,tmid));
    float fr=clamp(1.-dot(n,-rd),0.,1.); fr=pow(fr,3.)*.65;
    vec3 refl=clouds(reflect(rd,n),skyBase(reflect(rd,n)),uQ.y,uQ.x);
    vec3 refr=uD+uE*pow(dot(n,SUN)*.4+.6,80.)*.12*(1.+uQ.x);
    vec3 c=mix(refr,refl,fr);
    float atten=max(1.-tmid*tmid*.0004,0.);
    c+=uE*(p.y-uP.x)*.18*atten;
    c+=uC*pow(max(dot(reflect(rd,n),SUN),0.),60.)*1.8*(1.-uQ.x*.7);
    float foam=smoothstep(1.25*uP.x,2.*uP.x,p.y)*uQ.x*.6;
    c=mix(c,vec3(.85,.9,.95)*(.4+.6*uC),foam*.6*atten);
    col=mix(c,sky,smoothstep(.0,-.05,rd.y)*0.+(1.-exp(-tmid*.004)));
    depth=1.-clamp(tmid/120.,0.,1.);
  }
  if(uP.w>.5){ // lighthouse on a rock, right side
    vec2 q=(uv-vec2(.42,-tan(uLook.x)*uLook.y))/.55;
    float rock=q.y-(.035*smoothstep(.2,0.,abs(q.x))+.012*fbm4(vec2(q.x*30.,2.))-.006);
    float tower=sdBox2(q-vec2(0,.1),vec2(.011-.004*(q.y-.03)/.12,.07));
    float top=sdBox2(q-vec2(0,.18),vec2(.015,.011));
    float d=min(max(max(rock,-q.y-.004),abs(q.x)-.2),min(tower,top));
    float a=smoothstep(.0015,-.0015,d);
    col=mix(col,uA*.12,a); if(a>.5) depth=.45;
    vec2 lp=q-vec2(0,.18);
    float ang=atan(lp.y,lp.x);
    float beam=smoothstep(.12,0.,abs(ang-.08))*exp(-length(lp)*2.2);
    col+=vec3(1.,.9,.7)*(beam*.8+exp(-length(lp)*90.)*2.);
  }
  return vec4(col,depth); }

// ---------------------------------------------------------------- 2 space
vec3 planetSurf(vec3 nn){
  if(uQ.x>.5){
    float land=smoothstep(.5,.56,fbm(nn.xy*3.+uSeed));
    vec3 s=mix(vec3(.02,.07,.2),mix(vec3(.12,.22,.08),vec3(.45,.36,.24),fbm4(nn.xy*9.)),land);
    return mix(s,vec3(1.),smoothstep(.52,.78,fbm(nn.xy*4.+vec2(3.,nn.y*2.)))*.85); }
  float b=fbm(vec2(nn.y*5.+fbm(nn.xy*2.5+uSeed)*1.4,nn.x*.5)+uSeed);
  b=smoothstep(.25,.75,b);
  vec3 s=mix(uE*.3+uD,mix(uC,uB,.35)*.8,b);
  return s*(.85+.15*sin(nn.y*70.+b*9.)); }
vec4 sceneSpace(vec2 uv){
  vec2 p=uv*1.4+uSeed;
  vec2 w=vec2(fbm(p*1.6),fbm(p*1.6+5.2));
  float n=fbm(p*1.8+w*1.7);
  float dust=smoothstep(.35,.75,fbm(p*3.+w*2.+8.));
  vec3 neb=mix(uA,uB,smoothstep(.3,.8,n))*pow(n,2.2)*uP.w;
  neb+=uE*pow(smoothstep(.45,.9,fbm(p*2.4-w)),3.)*uP.w*.9;
  neb*=1.-dust*.75;
  vec3 col=uD*.4+neb;
  col+=vec3(stars(uv*.7,.06)*(1.-dust*.6));
  for(int i=0;i<5;i++){
    vec2 c=(h22(vec2(float(i),uSeed))-.5)*vec2(ASP,1.)*.95; vec2 d=uv-c;
    float s=.0006/dot(d,d)*.02+exp(-abs(d.x)*900.)*exp(-abs(d.y)*25.)*.5+exp(-abs(d.y)*900.)*exp(-abs(d.x)*25.)*.5;
    col+=mix(vec3(.8,.9,1.),uC,h12(c))*s*(.4+h12(c+1.)); }
  float depth=.05+n*.1;
  vec2 q=(uv-uP.xy)/uP.z; float r=length(q);
  vec3 L=normalize(vec3(uSun.x,uSun.y,.35));
  float px=2./uRes.y/uP.z;
  float lit2=smoothstep(-.2,.6,dot(normalize(vec3(q,0.)),L)+.3);
  
  // ring (behind half)
  vec2 rq=vec2(q.x*cos(.35)+q.y*sin(.35),(-q.x*sin(.35)+q.y*cos(.35))/.22);
  float rr=length(rq);
  float ring=uQ.y*smoothstep(1.35,1.42,rr)*smoothstep(2.3,2.2,rr)*(.45+.55*fbm4(vec2(rr*40.,0.)))*(1.-smoothstep(1.86,1.9,rr)*smoothstep(1.97,1.93,rr)*.8);
  float front=step(0.,-rq.y);
  vec3 rc=uC*.85*(.35+.65*smoothstep(-.4,.6,dot(normalize(q),L.xy)));
  col=mix(col,rc,ring*.85*(1.-front)*smoothstep(1.-px,1.+px,r));
  if(r<1.){
    vec3 nn=vec3(q,sqrt(1.-r*r));
    float l=smoothstep(-.12,.55,dot(nn,L));
    vec3 pl=planetSurf(nn)*l*1.4+uE*pow(1.-nn.z,2.2)*l*1.3;
    // ring shadow on the globe
    pl*=1.-uQ.y*.6*smoothstep(.04,0.,abs(nn.y*.9+nn.x*.33+.05))*l;
    col=mix(col,pl,smoothstep(1.,1.-px,r)); depth=.55+.15*nn.z; }
  col+=uE*exp(-abs(r-1.)*14.)*lit2*.8;
  col=mix(col,rc,ring*.9*front);
  if(ring*front>.1) depth=.75;
  // small moon
  vec2 mq=(uv-uP.xy-vec2(-.9,.42)*uP.z)/(uP.z*.12); float mr=length(mq);
  if(mr<1.){ vec3 mn=vec3(mq,sqrt(1.-mr*mr)); col=mix(col,vec3(.55,.52,.5)*(.6+.4*fbm4(mq*3.))*smoothstep(-.1,.5,dot(mn,L)),smoothstep(1.,.95,mr)); depth=.6; }
  return vec4(col,depth); }

// ---------------------------------------------------------------- 3 neon city (2.5D layers)
vec4 cityLayers(vec2 uv){
  vec3 col=mix(uB,uA,smoothstep(-.15,.55,uv.y));
  col+=uC*exp(-abs(uv.y-uP.x-.05)*5.)*.35;
  col+=stars(uv*.6,.01)*smoothstep(.2,.5,uv.y)*.3;
  float depth=0.;
  for(int i=0;i<10;i++){
    float z=float(i)/9.;
    float sc=mix(30.,2.6,z);
    float x=uv.x*sc+float(i)*31.7+uSeed;
    float c=floor(x); float fx=fract(x);
    float hr=h12(vec2(c,float(i)));
    float tall=step(.86,h12(vec2(c,9.)));
    float hgt=uP.x+mix(.0,.1,z)+hr*mix(.1,.32,z)+tall*mix(.25,.3,z);
    float gap=mix(.03,.12,h12(vec2(c,4.)));
    float setback=step(.5,h12(vec2(c,5.)))*.18;
    float wcut=mix(gap,gap+setback,step(hgt-.06*(1.-z*.5),uv.y));
    float inB=step(wcut,fx)*step(fx,1.-wcut)*step(uv.y,hgt)*step(.08,hr+tall);
    float ant=step(abs(fx-.5),.012+.01*z)*step(uv.y,hgt+.07*(1.-z*.4))*step(.55,hr)*step(hgt,uv.y+.07);
    float fog=mix(.9,.04,pow(z,.75));
    float haze=smoothstep(hgt-.05,uP.x-.1,uv.y)*.35*(1.-z);
    if(inB+ant>.5){
      vec3 b=mix(uD,uD*.35,z)*(.8+.2*vn(vec2(fx*20.,uv.y*sc*3.)));
      float ww=(fx-wcut)/(1.-2.*wcut);
      vec2 wq=vec2(ww*mix(10.,22.,hr),(hgt-uv.y)*sc*mix(28.,40.,hr));
      vec2 wc=floor(wq); vec2 wf=fract(wq);
      float floorLit=step(.9,h12(vec2(wc.y,c+float(i))));
      float lit=max(step(.7,h12(wc+c*7.1+float(i))),floorLit)*inB;
      float wm=step(.2,wf.x)*step(wf.x,.8)*step(.3,wf.y)*step(wf.y,.85);
      vec3 wcol=mix(vec3(1.,.72,.42),vec3(.55,.8,1.),step(.6,h12(wc+2.)));
      b+=wcol*wm*lit*mix(.25,.7,z);
      // neon signage
      float hasSign=step(.55,h12(vec2(c,13.)))*step(.25,z);
      float vert=step(.5,h12(vec2(c,17.)));
      float sy=hgt-.04-h12(vec2(c,14.))*.2;
      vec2 sq=vec2(fx-mix(.5,.15+.7*h12(vec2(c,18.)),vert),uv.y-sy);
      vec2 ss=vert>.5?vec2(.045,.09+h12(vec2(c,15.))*.08):vec2(.25,.03);
      float sd=sdBox2(sq*vec2(1.,sc/6.),ss*vec2(1.,sc/6.));
      vec3 nc=h12(vec2(c,16.))>.5?uE:uC;
      float glyph=step(.45,vn(floor(sq*vec2(60.,90.))*.7+c));
      b=mix(b,nc*(1.2+glyph*.8),hasSign*smoothstep(.004,0.,sd));
      // red aircraft lights
      b+=vec3(1.,.1,.05)*ant*step(hgt+.06*(1.-z*.4),uv.y+.006)*2.;
      col=mix(b,mix(uB,uC*.55,.25),clamp(fog+haze,0.,1.));
      depth=z;
    } else {
      float hasSign=step(.55,h12(vec2(c,13.)))*step(.25,z);
      float sy=hgt-.04-h12(vec2(c,14.))*.2;
      vec3 nc=h12(vec2(c,16.))>.5?uE:uC;
      col+=nc*hasSign*exp(-length(vec2((fx-.5)/sc,uv.y-sy))*22.)*.25*(1.-fog);
    }
  }
  return vec4(col,depth); }
vec4 sceneCity(vec2 uv){
  float horizon=uP.y;
  vec4 r;
  if(uv.y>horizon){ r=cityLayers(uv); }
  else {
    float dy=horizon-uv.y;
    vec2 ru=vec2(uv.x+(vn(vec2(uv.x*50.,dy*260.))-.5)*.01*(1.+dy*5.),horizon+dy*.9);
    vec4 m=cityLayers(ru);
    float wet=.45+.45*smoothstep(.3,.7,fbm4(uv*vec2(5.,22.)));
    r.rgb=mix(uD*.2,m.rgb*.9,wet*exp(-dy*1.8));
    r.a=.8+dy;
  }
  vec2 rq=vec2(uv.x+uv.y*.16,uv.y)*vec2(140.,5.)+uSeed;
  float rn=step(.94,h12(floor(rq)))*smoothstep(.0,.1,fract(rq.x))*smoothstep(.22,.1,fract(rq.x));
  r.rgb+=vec3(.6,.7,.9)*rn*.12;
  return r; }

// ---------------------------------------------------------------- 4 forest
float pine(vec2 p,float h,float w){ // p relative to trunk base
  float y=p.y/h; if(y<0.||y>1.) return 1.;
  float tiers=fract(y*mix(6.,9.,w));
  float width=(1.-y)*.24*h*(.78+.22*tiers)+.005;
  return abs(p.x)-width*(.88+.24*vn(vec2(p.y*160.,w*9.))); }
vec4 sceneForest(vec2 uv){
  vec2 lp=vec2(uP.z,uP.w);
  float ld=length(uv-lp);
  vec3 col=mix(uB,uA,smoothstep(-.2,.6,uv.y));
  col+=uC*exp(-ld*3.)*.8+uC*exp(-ld*22.)*1.2;
  if(uQ.y>.5) col+=vec3(1.)*smoothstep(.052,.048,ld)*.9;
  col+=stars(uv*.6,.02)*smoothstep(.1,.5,uv.y)*.5*uQ.y;
  float depth=0.; float nearOcc=0.;
  for(int i=0;i<8;i++){
    float z=float(i)/7.;
    float sc=mix(20.,3.2,z);
    float x=uv.x*sc+float(i)*13.1+uSeed;
    float base=uP.x-.04*z-.06*z*z+.02*vn(vec2(uv.x*3.,float(i)));
    float occ=0.;
    for(int k=-1;k<=1;k++){
      float c=floor(x)+float(k);
      float hr=h12(vec2(c,float(i)));
      if(hr<.15) continue;
      float tx=c+.5+(h12(vec2(c,7.))-.5)*.6;
      float hh=mix(.18,.85,z)*(.6+.6*hr);
      float d=pine(vec2((x-tx)/sc,uv.y-base),hh,hr);
      occ=max(occ,smoothstep(.0015,-.0015,d));
    }
    occ=max(occ,smoothstep(.002,-.002,uv.y-base));
    if(occ>0.){
      float fog=mix(.86,.0,pow(z,.7));
      vec3 tc=mix(uD,uD*.25,z);
      vec3 fc=mix(uB,uC,exp(-ld*2.)*.6);
      col=mix(col,mix(tc,fc,fog),occ);
      if(occ>.5) depth=.15+z*.85;
      if(z>.3) nearOcc=max(nearOcc,occ);
    }
    // drifting mist between layers
    col=mix(col,mix(uB,uC*.7,.3),smoothstep(.55,.95,fbm4(vec2(uv.x*2.+float(i),uv.y*6.)))*.18*(1.-z)*smoothstep(base+.25,base,uv.y));
  }
  // god rays from light
  vec2 dir=normalize(uv-lp+1e-4);
  float ang=atan(dir.y,dir.x);
  float rays=pow(fbm4(vec2(ang*14.,uSeed)),3.)*exp(-ld*1.6)*smoothstep(0.,.3,ld);
  col+=uC*rays*.55*(1.-nearOcc*.85);
  // fireflies / embers
  vec2 q=uv*vec2(26.,14.)+uSeed; vec2 c=floor(q); vec2 o=h22(c);
  col+=uE*smoothstep(.08,0.,length(fract(q)-o))*step(.8,h12(c+3.))*1.5*smoothstep(.1,-.25,uv.y);
  return vec4(col,depth); }

// ---------------------------------------------------------------- 5 road with light trails
vec4 sceneRoad(vec2 uv){
  float hz=uP.x; float camH=.6;
  SUN=normalize(vec3(uSun.x,uSun.y,1.));
  vec3 col=mix(uB,uA,pow(clamp((uv.y-hz)/.6,0.,1.),.6));
  float sd=length((uv-vec2(uSun.x*.6,hz+uSun.y))*vec2(1.,1.));
  col+=uC*(exp(-sd*4.)*.7+smoothstep(.07,.065,sd)*2.5);
  col=clouds(normalize(vec3(uv.x,max(uv.y-hz,0.)+.01,1.)),col,uQ.y,.2);
  float depth=0.;
  // horizon skyline
  float sk=hz+.02+.06*step(.5,h12(vec2(floor(uv.x*60.),1.)))*h12(vec2(floor(uv.x*60.),2.))*smoothstep(.5,0.,abs(uv.x+.1));
  sk+=.03*fbm4(vec2(uv.x*6.,3.));
  if(uv.y<sk&&uv.y>hz){ col=uA*.25+uC*.05; col+=vec3(1.,.8,.5)*step(.9,h12(floor(uv*vec2(400.,300.))))*.8; depth=.05; }
  if(uv.y<=hz){
    float z=camH/max(hz-uv.y,1e-4);
    float cx=uP.y*z*z*.0025;
    float x=uv.x*z-cx;
    float road=step(abs(x),3.2);
    vec3 g=uD*.6*(.6+.4*fbm4(vec2(x,z)*.5));
    vec3 asph=vec3(.035,.037,.045)*(.7+.3*vn(vec2(x*30.,z*4.)));
    // wet reflection of sky
    asph+=mix(uB,uC,.3)*.18*smoothstep(1.,30.,z);
    vec3 c=mix(g,asph,road);
    float lane=step(abs(x),.08)*step(.5,fract(z*.12))*road;
    float edge=(step(abs(abs(x)-3.),.07))*road;
    c=mix(c,vec3(.8),max(lane,edge)*.8*exp(-z*.01));
    c=mix(c,mix(uB,uC,.25),1.-exp(-z*.012));
    col=c; depth=clamp(1.-z/80.,0.,1.);
    // light trails (in screen space)
    for(int k=0;k<4;k++){
      float lo=float(k)<1.5?-1.5-float(k)*.35:1.5+(float(k)-2.)*.35;
      float sxp=(lo+cx)/z;
      float dx=(uv.x-sxp)*uRes.x/1000.;
      float tr=exp(-abs(dx)*mix(900.,160.,smoothstep(0.,6.,1./z*6.)))*smoothstep(80.,6.,z);
      vec3 tc=float(k)<1.5?vec3(1.,.85,.6):uE;
      col+=tc*tr*1.6;
    }
  }
  return vec4(col,depth); }

// ---------------------------------------------------------------- SDF scenes (abstract / ruins)
float sdSph(vec3 p,float r){ return length(p)-r; }
float sdBox(vec3 p,vec3 b){ vec3 q=abs(p)-b; return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.); }
float sdTor(vec3 p,vec2 t){ vec2 q=vec2(length(p.xz)-t.x,p.y); return length(q)-t.y; }
float sdCyl(vec3 p,float r,float h){ vec2 d=abs(vec2(length(p.xz),p.y))-vec2(r,h); return min(max(d.x,d.y),0.)+length(max(d,0.)); }
mat3 rotY(float a){ float c=cos(a),s=sin(a); return mat3(c,0,-s,0,1,0,s,0,c); }
mat3 rotX(float a){ float c=cos(a),s=sin(a); return mat3(1,0,0,0,c,s,0,-s,c); }

vec2 mapAbstract(vec3 p){
  vec2 r=vec2(p.y,0.);
  float d=sdSph(p-vec3(-1.3,1.,.6),1.); if(d<r.x) r=vec2(d,1.);
  d=sdBox(rotY(.6)*(p-vec3(1.5,.75,.2)),vec3(.7))-.06; if(d<r.x) r=vec2(d,2.);
  d=sdTor(rotX(1.1)*(p-vec3(.15,.62,-1.4)),vec2(.7,.22)); if(d<r.x) r=vec2(d,3.);
  d=sdSph(p-vec3(.3,.35,1.9),.35); if(d<r.x) r=vec2(d,4.);
  d=sdSph(p-vec3(-2.6,2.6,-1.8),.45); if(d<r.x) r=vec2(d,4.);
  d=sdBox(rotY(-.3)*rotX(.4)*(p-vec3(2.7,2.4,-1.5)),vec3(.3))-.04; if(d<r.x) r=vec2(d,1.);
  return r; }
vec2 mapRuins(vec3 p){
  float fl=p.y-.25*fbm4(p.xz*.25)+.15;
  vec2 r=vec2(fl,0.);
  vec3 q=p; float id=floor(q.z/4.+.5); q.z-=id*4.;
  q.x=abs(q.x)-3.2;
  float hr=h12(vec2(id,sign(p.x)));
  float H=id>-1.&&id<7.?(hr>.3?3.6:1.+hr*3.):0.;
  if(H>0.){
    float c=sdCyl(q-vec3(0,H*.5,0),.42+.02*sin(atan(q.z,q.x)*16.),H*.5);
    c=min(c,sdBox(q-vec3(0,H+.12,0),vec3(.62,.13,.62)));
    c=min(c,sdBox(q-vec3(0,.12,0),vec3(.6,.12,.6)));
    if(c<r.x) r=vec2(c,1.); }
  float lin=sdBox(p-vec3(0,4.15,14.),vec3(3.9,.25,.6)); if(lin<r.x) r=vec2(lin,1.);
  float tmp=sdBox(p-vec3(0,4.,34.),vec3(9.,5.,2.)); tmp=max(tmp,-sdBox(p-vec3(0,2.,32.),vec3(1.4,3.5,4.)));
  if(tmp<r.x) r=vec2(tmp,2.);
  float blk=sdBox(rotY(.5)*(p-vec3(-1.6,.3,5.)),vec3(.9,.35,.45))-.03; if(blk<r.x) r=vec2(blk,1.);
  return r; }
vec2 mapS(vec3 p){ return uScene==6?mapAbstract(p):mapRuins(p); }
vec3 nrmS(vec3 p){ vec2 e=vec2(.0015,0); return normalize(vec3(mapS(p+e.xyy).x-mapS(p-e.xyy).x,mapS(p+e.yxy).x-mapS(p-e.yxy).x,mapS(p+e.yyx).x-mapS(p-e.yyx).x)); }
float shS(vec3 ro,vec3 rd,float k){ float r=1.,t=.02; for(int i=0;i<80;i++){ float h=mapS(ro+rd*t).x; r=min(r,k*h/t); t+=clamp(h,.02,.4); if(r<.001||t>30.)break; } return clamp(r,0.,1.); }
float aoS(vec3 p,vec3 n){ float o=0.,s=1.; for(int i=1;i<6;i++){ float h=.04*float(i); o+=(h-mapS(p+n*h).x)*s; s*=.75; } return clamp(1.-2.5*o,0.,1.); }
vec2 traceS(vec3 ro,vec3 rd,float tmax){ float t=.01; for(int i=0;i<200;i++){ vec2 h=mapS(ro+rd*t); if(h.x<.0005*t) return vec2(t,h.y); t+=h.x*.9; if(t>tmax)break; } return vec2(-1.); }

vec3 matAbs(float m,vec3 p){
  if(m<.5) return mix(uD,uD*.85,step(.5,fract(p.x*.5)+0.)*0.);
  if(m<1.5) return uE; if(m<2.5) return uC; if(m<3.5) return uB*1.1; return vec3(.95); }

vec4 sceneSDF(vec2 uv){
  float yaw=uCam.w; SUN=sunDir(yaw);
  vec3 ro=vec3(uCam.x,uCam.z,uCam.y);
  vec3 rd=camRay(uv,yaw,uLook.x,uLook.y);
  bool abs_=uScene==6;
  vec3 bg=abs_?mix(uB,uA,smoothstep(-.3,.8,uv.y)):skyBase(rd);
  if(!abs_) bg=clouds(rd,bg,uQ.y,0.);
  vec3 col=bg; float depth=0.;
  vec2 h=traceS(ro,rd,abs_?40.:80.);
  if(h.x>0.){
    vec3 p=ro+rd*h.x; vec3 n=nrmS(p);
    float sh=shS(p+n*.003,SUN,abs_?10.:16.);
    float ao=aoS(p,n);
    vec3 m;
    if(abs_) m=matAbs(h.y,p);
    else { float r=fbm4(p.xz*2.+p.y*3.); m=h.y<.5?uD*(.8+.3*fbm4(p.xz*6.)):uD*mix(1.05,.75,r)*vec3(1.,.95,.88); }
    float dif=clamp(dot(n,SUN),0.,1.)*sh;
    float sky=.5+.5*n.y;
    vec3 lin=uC*dif*(abs_?2.2:3.2)+mix(uA,uB,.4)*sky*ao*(abs_?.9:.6);
    lin+=uC*.25*clamp(dot(n,-normalize(vec3(SUN.x,0.,SUN.z))),0.,1.)*ao*(abs_?0.:1.);
    col=m*lin;
    vec3 rf=reflect(rd,n);
    float fr=pow(1.-max(dot(n,-rd),0.),5.);
    float spec=pow(max(dot(rf,SUN),0.),abs_?60.:16.)*dif;
    col+=uC*spec*(abs_?1.2:.2);
    if(abs_){
      vec2 h2=traceS(p+n*.01,rf,20.);
      vec3 rc=h2.x>0.?matAbs(h2.y,p+rf*h2.x)*.6:mix(uB,uA,.5);
      col+=rc*(.04+fr*.5)*(h.y>3.5?2.:1.)*ao; }
    float fogA=1.-exp(-h.x*(abs_?.02:.016));
    vec3 fc=abs_?mix(uB,uA,.3):mix(uB,uC,pow(max(dot(rd,SUN),0.),4.)*.7);
    col=mix(col,fc,fogA);
    depth=1.-clamp(h.x/(abs_?14.:45.),0.,1.);
  }
  if(!abs_){ // dust in sun
    col+=uC*pow(max(dot(rd,SUN),0.),6.)*.15*(.6+.4*fbm4(uv*4.+uSeed)); }
  return vec4(col,depth); }

// ---------------------------------------------------------------- 7 underwater
vec4 sceneUnder(vec2 uv){
  vec3 col=mix(uA,uB,smoothstep(.55,-.5,uv.y));
  float sx=uv.x-uP.z;
  // surface + snell window
  float surf=smoothstep(.35,.55,uv.y);
  float caus=pow(abs(sin(fbm(uv*vec2(5.,9.)+uSeed)*12.)),12.);
  col+=uC*surf*(.25+caus*.6)*smoothstep(.6,.0,abs(sx));
  // god rays
  float ang=sx/(.9-uv.y);
  float rays=pow(fbm4(vec2(ang*9.,uSeed)),2.5)*smoothstep(-.6,.5,uv.y);
  col+=uC*rays*.7;
  float depth=.05;
  // whale silhouette
  if(uP.w>.5){
    vec2 q=(uv-vec2(uP.x,uP.y))/.25; q.y-=.06*sin(q.x*2.);
    float body=length(q*vec2(.42,1.35))-.42;
    float tail=min(sdTri(q,vec2(-.85,.02),vec2(-1.45,.16),vec2(-1.3,-.05)),sdCap(q,vec2(-.4,.0),vec2(-1.,.04),.08));
    float fin=sdTri(q,vec2(.3,-.12),vec2(-.15,-.62),vec2(.05,-.15));
    float d=min(min(body,tail),fin);
    float a=smoothstep(.02,-.02,d);
    float fog=.55;
    vec3 wc=mix(uD*.6,uB,fog)+uC*.2*smoothstep(0.,.3,q.y)*a;
    col=mix(col,wc,a); if(a>.5) depth=.45; }
  // diver
  if(uFig.w>.5){
    vec2 q=(uv-uFig.xy)/uFig.z; q=vec2(q.x*cos(1.2)-q.y*sin(1.2),q.x*sin(1.2)+q.y*cos(1.2));
    float d=sdFigure(q+vec2(0.,-.5),3.);
    float a=smoothstep(.02,-.02,d);
    col=mix(col,uD*.25,a); if(a>.5) depth=.85;
    vec2 lp=uv-(uFig.xy+vec2(.06,.0));
    col+=uE*exp(-length(lp)*40.)*1.6; }
  // seabed
  float bed=-.38+.08*fbm4(vec2(uv.x*3.,1.))+.05*sin(uv.x*2.);
  float ba=smoothstep(.003,-.003,uv.y-bed);
  col=mix(col,uD*.35+uB*.3,ba); if(ba>.5) depth=.3+(bed-uv.y);
  // marine snow
  vec2 g=uv*vec2(60.,34.)+uSeed; vec2 c=floor(g);
  col+=vec3(.7,.9,1.)*smoothstep(.12,0.,length(fract(g)-h22(c)))*step(.85,h12(c))*.35;
  return vec4(col,depth); }

// ---------------------------------------------------------------- 9 stadium
vec4 sceneStadium(vec2 uv){
  float hz=uP.x;
  vec3 col=mix(uB,uA,smoothstep(hz,.6,uv.y));
  float depth=0.;
  // stands
  float st=hz+.2+.04*sin(uv.x*1.5);
  if(uv.y>hz&&uv.y<st){
    vec2 g=floor(uv*vec2(500.,260.));
    vec3 crowd=mix(vec3(.01),mix(uE,uC,h12(g+1.)),h12(g)*.3)*(.15+.3*smoothstep(hz,st,uv.y));
    crowd+=vec3(1.)*step(.997,h12(g+7.))*1.5;
    float tier=step(.85,fract((uv.y-hz)*40.));
    col=mix(crowd,vec3(.02),tier*.6)+uC*.06; depth=.1; }
  // roof
  if(uv.y>st&&uv.y<st+.03){ col=vec3(.03); depth=.1; }
  // floodlights
  for(int i=0;i<4;i++){
    float fx=-.75+float(i)*.5; vec2 lp=vec2(fx,st+.06+.02*float(i%2));
    vec2 d=uv-lp;
    float panel=sdBox2(d,vec2(.06,.025));
    vec2 gq=fract(d*vec2(110.,90.));
    col+=uC*smoothstep(.002,0.,panel)*step(.25,gq.x)*step(.25,gq.y)*3.;
    col+=uC*(exp(-length(d*vec2(.6,1.))*12.)*.3+exp(-abs(d.y)*300.)*exp(-abs(d.x)*5.)*.15+exp(-abs(d.x)*400.)*exp(-abs(d.y)*7.)*.12);
    // beam into haze
    float bd=abs(d.x+d.y*.3*sign(fx))/(-d.y+.05);
    col+=uC*.035*smoothstep(.5,0.,bd)*step(d.y,0.)*smoothstep(-.6,0.,d.y);
  }
  if(uv.y<=hz){
    float camH=.35;
    float z=camH/max(hz-uv.y,1e-4);
    float x=uv.x*z;
    float stripe=step(.5,fract(z*.18+x*.0));
    vec3 g=mix(uD*.8,uD*1.15,stripe)*(.85+.25*fbm4(vec2(x*8.,z*2.)));
    float lines=step(abs(fract(x*.05+.5)-.5)*20.,.06)*0.+step(abs(z-18.),.06*z*.02+.05)+step(abs(abs(x)-10.),.06)*step(z,18.)*step(8.,z)+step(abs(z-8.),.05)*step(abs(x),10.);
    g=mix(g,vec3(.9),clamp(lines,0.,1.)*.85);
    g*=.6+.6*exp(-abs(x)*.05);
    col=mix(g,mix(uB,uC,.15),1.-exp(-z*.02));
    depth=clamp(1.-z/60.,0.,1.);
    // ball
    vec2 bq=(uv-vec2(uP.y,uP.z))/.11; float br=length(bq);
    if(br<1.){
      vec3 n=vec3(bq,sqrt(1.-br*br));
      vec3 rn=rotY(.7)*rotX(.4)*n; float pent=0.; const float G=1.618;
      vec3 V[6]=vec3[6](vec3(0,1,G),vec3(0,-1,G),vec3(1,G,0),vec3(-1,G,0),vec3(G,0,1),vec3(-G,0,1));
      for(int k=0;k<6;k++){ vec3 v=normalize(V[k]); pent=max(pent,smoothstep(.925,.935,abs(dot(rn,v)))); }
      vec3 bc=mix(vec3(.92),vec3(.04),pent);
      float l=clamp(dot(n,normalize(vec3(.3,.8,.6))),0.,1.)*.9+.15;
      col=mix(col,bc*l+uC*pow(1.-n.z,3.)*.4,smoothstep(1.,.97,br)); depth=1.; }
    float shd=length((uv-vec2(uP.y,uP.z-.11))*vec2(1.,5.))/.11; col*=mix(.4,1.,smoothstep(.4,1.2,shd));
  }
  // haze
  col+=uC*.025*fbm4(uv*3.+uSeed);
  return vec4(col,depth); }

// ---------------------------------------------------------------- main
void main(){
  vec2 fc=gl_FragCoord.xy;
  vec2 uv=(fc-.5*uRes)/uRes.y; UV=uv; ASP=uRes.x/uRes.y;
  vec4 r;
  if(uScene==0) r=sceneTerrain(uv);
  else if(uScene==1) r=sceneOcean(uv);
  else if(uScene==2) r=sceneSpace(uv);
  else if(uScene==3) r=sceneCity(uv);
  else if(uScene==4) r=sceneForest(uv);
  else if(uScene==5) r=sceneRoad(uv);
  else if(uScene==7) r=sceneUnder(uv);
  else if(uScene==9) r=sceneStadium(uv);
  else r=sceneSDF(uv);
  vec3 col=r.rgb; float depth=r.a;
  // foreground cliff + figure
  vec3 cl=cliff(uv);
  if(cl.x>0.){
    vec3 rc=uD*.12*(.7+.6*fbm4(uv*30.))+uA*.03;
    rc+=uC*cl.y*.9;
    col=mix(col,rc,cl.x); depth=mix(depth,.92+(cl.z-uv.y),cl.x); }
  if(uScene!=7){
    vec2 f=figure(uv);
    if(f.x>0.){ col=mix(col,uD*.06+uA*.02,f.x); col+=uC*f.y*1.3; depth=mix(depth,1.,f.x); }
  }
  if(uMode==1){ fragColor=vec4(vec3(clamp(depth,0.,1.)),1.); return; }
  col*=uGrade.x;
  col=aces(col);
  col=pow(col,vec3(1./2.2));
  col=mix(vec3(dot(col,vec3(.299,.587,.114))),col,uGrade.z);
  col=mix(col,smoothstep(0.,1.,col),uGrade.y);
  vec2 v=fc/uRes; col*=.55+.45*pow(16.*v.x*v.y*(1.-v.x)*(1.-v.y),.22);
  col+=(h12(fc+uSeed*7.)-.5)*uGrade.w;
  fragColor=vec4(clamp(col,0.,1.),1.);
}
