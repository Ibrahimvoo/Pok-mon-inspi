// =====================================================================
// BASE
// =====================================================================
const cv=document.getElementById('c'),X=cv.getContext('2d');X.imageSmoothingEnabled=false;
const W=480,H=320,TS=32;
// Palette fonctionnelle : encre/papier (UI), accent braise (interactif), or (rare, légende, niveaux), bleu (info, EXP), vert/jaune/rouge (PV)
const C={ink:'#1f1a33',ink2:'#3b3357',paper:'#fbf5e6',paper2:'#e6d9bd',mute:'#8a80a6',acc:'#e8484f',accL:'#fde3d6',gold:'#f6c445',goldL:'#fff0b0',blue:'#4d8fe6',green:'#4cc46a',yel:'#f5b83d',red:'#e8484f',frame:'#5b4b8a',frameL:'#8573c0',frameD:'#40336a'};
const K={gL:'#86d05c',gM:'#68bc4a',gM2:'#62b446',gD:'#4c9c3e',tg:'#4f9e3f',pL:'#f2dba6',pM:'#e3c186',pD:'#c8a067',wL:'#8ccaf6',wM:'#4f96e4',wD:'#3a76c8',bank:'#3f8a3a',foam:'#eef9ff',aM:'#8c7466',aD:'#74604f',aL:'#a68c7c',rM:'#5e4842',rD:'#45332f',rL:'#7f655c',rDD:'#2e201e',lM:'#f05a24',lL:'#ffa23c',lH:'#ffe27a',lD:'#b8361a'};
const R=(g,c,x,y,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
const mkc=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.imageSmoothingEnabled=false;f&&f(g);return c};
const wait=ms=>new Promise(r=>setTimeout(r,mode==='battle'&&G?.opt?.fast?ms*.5:ms)),frame=()=>new Promise(r=>requestAnimationFrame(r));
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),ev=v=>Math.round(v/2)*2,now=()=>performance.now();
function mix(a,b,k){const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)),A=p(a),B=p(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')}
function seed(s){let h=1779033703;for(const c of s)h=Math.imul(h^c.charCodeAt(0),3432918353)>>>0;return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const HSH=(x,y)=>{let h=Math.imul(x+374761,668265263)^Math.imul(y+977,2246822519);h=Math.imul(h^h>>>15,3266489917);return(h^h>>>16)>>>0};
async function tween(o,k,to,ms,ease){if(mode==='battle'&&G?.opt?.fast)ms*=.5;const f=o[k],t0=now();for(;;){const p=Math.min(1,(now()-t0)/ms),e=ease?1-(1-p)**3:p;o[k]=f+(to-f)*e;if(p>=1)return;await frame()}}
function pell(g,cx,cy,rx,ry,c){g.fillStyle=c;for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y/(ry+.5))**2)));g.fillRect(Math.round(cx-w),Math.round(cy+y),w*2,1)}}
function epx(src){const w=src.width,h=src.height,s=src.getContext('2d').getImageData(0,0,w,h).data,c=mkc(w*2,h*2),g=c.getContext('2d'),out=g.createImageData(w*2,h*2),O=out.data;
 const P=(x,y)=>{x=Math.max(0,Math.min(w-1,x));y=Math.max(0,Math.min(h-1,y));const i=(y*w+x)*4;return(s[i]<<24|s[i+1]<<16|s[i+2]<<8|s[i+3])>>>0};
 const put=(x,y,v)=>{const i=(y*w*2+x)*4;O[i]=v>>>24&255;O[i+1]=v>>>16&255;O[i+2]=v>>>8&255;O[i+3]=v&255};
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=P(x,y),a=P(x,y-1),b=P(x+1,y),c2=P(x-1,y),d=P(x,y+1);
  put(2*x,2*y,c2===a&&c2!==d&&a!==b?a:p);put(2*x+1,2*y,a===b&&a!==c2&&b!==d?b:p);put(2*x,2*y+1,d===c2&&d!==b&&c2!==a?c2:p);put(2*x+1,2*y+1,b===d&&b!==a&&d!==c2?d:p)}
 g.putImageData(out,0,0);return c}
const SIL=new Map();function silh(img,col){let m=SIL.get(img);if(!m)SIL.set(img,m={});return m[col]||(m[col]=mkc(img.width,img.height,g=>{g.drawImage(img,0,0);g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,img.width,img.height)}))}

// =====================================================================
// POLICE BITMAP (1 pixel de police = 1 pixel d'art, accents composés)
// =====================================================================
const FD={A:'01110,10001,10001,11111,10001,10001,10001',B:'11110,10001,10001,11110,10001,10001,11110',C:'01110,10001,10000,10000,10000,10001,01110',D:'11110,10001,10001,10001,10001,10001,11110',E:'11111,10000,10000,11110,10000,10000,11111',F:'11111,10000,10000,11110,10000,10000,10000',G:'01110,10001,10000,10111,10001,10001,01111',H:'10001,10001,10001,11111,10001,10001,10001',I:'111,010,010,010,010,010,111',J:'00111,00010,00010,00010,00010,10010,01100',K:'10001,10010,10100,11000,10100,10010,10001',L:'10000,10000,10000,10000,10000,10000,11111',M:'10001,11011,10101,10101,10001,10001,10001',N:'10001,11001,10101,10011,10001,10001,10001',O:'01110,10001,10001,10001,10001,10001,01110',P:'11110,10001,10001,11110,10000,10000,10000',Q:'01110,10001,10001,10001,10101,10010,01101',R:'11110,10001,10001,11110,10100,10010,10001',S:'01111,10000,10000,01110,00001,00001,11110',T:'11111,00100,00100,00100,00100,00100,00100',U:'10001,10001,10001,10001,10001,10001,01110',V:'10001,10001,10001,10001,10001,01010,00100',W:'10001,10001,10001,10101,10101,10101,01010',X:'10001,10001,01010,00100,01010,10001,10001',Y:'10001,10001,01010,00100,00100,00100,00100',Z:'11111,00001,00010,00100,01000,10000,11111',
a:'00000,00000,01110,00001,01111,10001,01111',b:'10000,10000,10110,11001,10001,10001,11110',c:'0000,0000,0111,1000,1000,1000,0111',d:'00001,00001,01101,10011,10001,10001,01111',e:'00000,00000,01110,10001,11111,10000,01110',f:'0011,0100,1110,0100,0100,0100,0100',g:'00000,00000,01111,10001,10001,10001,01111,00001,01110',h:'10000,10000,10110,11001,10001,10001,10001',i:'1,0,1,1,1,1,1','ı':'0,0,1,1,1,1,1',j:'001,000,011,001,001,001,001,101,010',k:'1000,1000,1001,1010,1100,1010,1001',l:'10,10,10,10,10,10,01',m:'00000,00000,11010,10101,10101,10101,10101',n:'00000,00000,10110,11001,10001,10001,10001',o:'00000,00000,01110,10001,10001,10001,01110',p:'00000,00000,11110,10001,10001,10001,11110,10000,10000',q:'00000,00000,01111,10001,10001,10001,01111,00001,00001',r:'0000,0000,1011,1100,1000,1000,1000',s:'0000,0000,0111,1000,0110,0001,1110',t:'0100,0100,1110,0100,0100,0100,0011',u:'00000,00000,10001,10001,10001,10011,01101',v:'00000,00000,10001,10001,10001,01010,00100',w:'00000,00000,10001,10001,10101,10101,01010',x:'00000,00000,10001,01010,00100,01010,10001',y:'00000,00000,10001,10001,10001,10001,01111,00001,01110',z:'00000,00000,11111,00010,00100,01000,11111',
0:'01110,10001,10011,10101,11001,10001,01110',1:'010,110,010,010,010,010,111',2:'01110,10001,00001,00010,00100,01000,11111',3:'11110,00001,00001,01110,00001,00001,11110',4:'00010,00110,01010,10010,11111,00010,00010',5:'11111,10000,11110,00001,00001,10001,01110',6:'00110,01000,10000,11110,10001,10001,01110',7:'11111,00001,00010,00100,01000,01000,01000',8:'01110,10001,10001,01110,10001,10001,01110',9:'01110,10001,10001,01111,00001,00010,01100',
'.':'0,0,0,0,0,0,1',',':'00,00,00,00,00,00,01,10','!':'1,1,1,1,1,0,1','?':'01110,10001,00001,00010,00100,00000,00100',"'":'1,1',':':'0,0,1,0,0,0,1',';':'00,00,01,00,00,00,01,10','-':'000,000,000,111','+':'000,000,010,111,010','/':'001,001,010,010,010,100,100','(':'01,10,10,10,10,10,01',')':'10,01,01,01,01,01,10','%':'11001,11010,00010,00100,01000,01011,10011','…':'00000,00000,00000,00000,00000,00000,10101','·':'0,0,0,1','—':'000000,000000,000000,111111','▲':'00000,00000,00100,01110,11111','▼':'00000,00000,11111,01110,00100','"':'101,101','œ':'0000000,0000000,0110110,1001001,1001111,1001000,0110111','&':'01100,10010,10100,01000,10101,10010,01101'};
const MD={0:'111,101,101,101,111',1:'010,110,010,010,111',2:'111,001,111,100,111',3:'111,001,111,001,111',4:'101,101,111,001,001',5:'111,100,111,001,111',6:'111,100,111,101,111',7:'111,001,010,010,010',8:'111,101,111,101,111',9:'111,101,111,001,111','/':'001,001,010,100,100','.':'0,0,0,0,1',':':'0,1,0,1,0','+':'000,010,111,010,000','-':'000,000,111,000,000','!':'1,1,1,0,1','?':'111,001,010,000,010',
A:'010,101,111,101,101',B:'110,101,110,101,110',C:'111,100,100,100,111',D:'110,101,101,101,110',E:'111,100,110,100,111',F:'111,100,110,100,100',G:'111,100,101,101,111',H:'101,101,111,101,101',I:'111,010,010,010,111',J:'001,001,001,101,111',K:'101,101,110,101,101',L:'100,100,100,100,111',M:'10001,11011,10101,10001,10001',N:'1001,1101,1011,1001,1001',O:'111,101,101,101,111',P:'110,101,110,100,100',Q:'111,101,101,111,001',R:'110,101,110,101,101',S:'111,100,111,001,111',T:'111,010,010,010,010',U:'101,101,101,101,111',V:'101,101,101,101,010',W:'10001,10001,10101,10101,01010',X:'101,101,010,101,101',Y:'101,101,010,010,010',Z:'111,001,010,100,111'};
const FONT={},MINI={};for(const[k,v]of Object.entries(FD))FONT[k]=v.split(',');for(const[k,v]of Object.entries(MD))MINI[k]=v.split(',');
const GC={},ACC_={'́':['001','010'],'̀':['100','010'],'̂':['010','101'],'̈':['101'],'̧':['010','110']};
const dots=(g,rows,ox,oy)=>rows.forEach((s,y)=>[...s].forEach((v,x)=>v==='1'&&g.fillRect(ox+x,oy+y,1,1)));
function glyph(ch,col,mini){const key=ch+col+(mini?1:0);if(GC[key])return GC[key];let b=ch,mk='';const n=ch.normalize('NFD');if(n.length>1){b=n[0];mk=n[1]}
 if(mini){const r=MINI[b.toUpperCase()]||MINI['?'],w=Math.max(...r.map(s=>s.length));return GC[key]=mkc(w,5,g=>{g.fillStyle=col;dots(g,r,0,0)})}
 if(mk&&b==='i')b='ı';const r=FONT[b]||FONT['?'],bw=Math.max(...r.map(s=>s.length)),w=mk?Math.max(bw,3):bw,ox=(w-bw)>>1;
 return GC[key]=mkc(w,12,g=>{g.fillStyle=col;dots(g,r,ox,3);const A=ACC_[mk];if(A){const up=b!==b.toLowerCase();dots(g,A,(w-3)>>1,mk==='̧'?10:up?(A.length>1?0:1):(A.length>1?2:3))}})}
function tw(s,sc=2,mini,ls=0){let w=0;for(const ch of String(s))w+=ch===' '||ch==='\u00a0'?(mini?3:4)+ls:glyph(ch,C.ink,mini).width+1+ls;return Math.max(0,w-1-ls)*sc}
// txt(texte, x, ligne de base, couleur, {s:échelle, al:'c'|'r', sh:ombre, ol:contour, mini, ls})
function txt(s,x,y,c=C.ink,o={}){s=String(s);const sc=o.s||2,mini=o.mini,hh=mini?5:10,ls=o.ls||0,w=tw(s,sc,mini,ls);if(o.al==='r')x-=w;else if(o.al==='c')x-=Math.round(w/2);x=Math.round(x);const top=Math.round(y-hh*sc);
 const draw=(col,dx,dy)=>{let cx=x+dx;for(const ch of s){if(ch===' '||ch==='\u00a0'){cx+=((mini?3:4)+ls)*sc;continue}const g=glyph(ch,col,mini);X.drawImage(g,cx,top+dy,g.width*sc,g.height*sc);cx+=(g.width+1+ls)*sc}};
 if(o.ol){const d=o.olw||sc;for(const[a,b]of[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]])draw(o.ol,a*d,b*d);if(o.drop)draw(o.ol,0,d*2)}
 const sh=o.sh!==undefined?o.sh:(!o.ol&&!mini&&c===C.ink?C.paper2:0);if(sh){draw(sh,sc,0);draw(sh,0,sc);draw(sh,sc,sc)}
 draw(c,0,0);return w}
function wrap(s,w,sc=2){const out=[];for(const para of String(s).replace(/ ([?!:;])/g,'\u00a0$1').split('\n')){let l='';for(const wd of para.split(' ')){const t=l?l+' '+wd:wd;if(tw(t,sc)>w&&l){out.push(l);l=wd}else l=t}out.push(l)}return out}

// =====================================================================
// ICÔNES 8x8 & SPRITES DE PERSONNAGES (ombrage 2 tons, cycle de marche 3 poses)
// =====================================================================
const IP={o:C.ink,w:'#ffffff',l:'#c9c2d6',r:C.acc,R:'#b8323a',b:C.blue,B:'#2f5fb0',y:C.gold,Y:'#c8902a',p:'#9a5ad0',P:'#6a3a9a',n:'#b07a46',N:'#7a4e2a',g:C.green,G:'#2f8a4a',k:'#2b2540'};
const icon=(rows,ov={})=>mkc(rows[0].length,rows.length,g=>rows.forEach((s,y)=>[...s].forEach((c,x)=>{const col=ov[c]||IP[c];if(c!=='.'&&col)R(g,col,x,y)})));
const BALLR=["..oooo..",".orwrro.","orrrrrRo","ooowwooo","owwwwwlo","owwwwwlo",".ollllo.","..oooo.."],POT=["...oo...","..owwo..","...oo...","..oppo..",".oplppo.",".opppPo.",".oPPPPo.","..oooo.."];
const SHARDP=["...oo...","..oyyo..",".oywwyo.",".oyyyYo.","oyyyyYYo",".oyyYYo.","..oyYo..","...oo..."];
const ICO={pierrelune:icon(SHARDP,{y:'#d8d0f8',Y:'#7a6ac8'}),pierreorage:icon(SHARDP,{y:'#fff4a0',Y:'#d8a018'}),fossile:icon(SHARDP,{y:'#d8c8a8',Y:'#8a6a4a'}),bCre:icon(SHARDP,{y:'#c8b8f0',Y:'#3a2a6a'}),capsule:icon(BALLR),supercapsule:icon(BALLR,{r:C.blue,R:'#2f5fb0'}),hypercapsule:icon(BALLR,{r:'#3b3357',R:'#1f1a33',w:'#fff4c0'}),potion:icon(POT),superpotion:icon(POT,{p:'#f08a3a',P:'#c05a20',l:'#ffd0a0'}),
rappel:icon(["...oo...","..oyyo..",".oyYwyo.","oyyYwyyo","oyYYyyyo",".oyYYyo.","..oyyo..","...oo..."]),bag:icon(["..oooo..",".o....o.","oooooooo","onnnnnno","onnyynno","onnnnnno","oNNNNNNo","oooooooo"]),
save:icon(["oooooooo","oBwwwwBo","oBwwwwBo","oBBBBBBo","oBBooBBo","oBBooBBo","oBBBBBBo","oooooooo"]),home:icon(["...oo...","..orro..",".orrrro.","oRRRRRRo",".owwwwo.",".owoowo.",".owoowo.",".oooooo."]),
close:icon(["oo....oo","oro..oro",".orooro.","..orro..","..orro..",".orooro.","oro..oro","oo....oo"]),coin:icon(["..oooo..",".oyyyyo.","oywyyyYo","oywyyyYo","oyyyyyYo","oyyyyYYo",".oYYYYo.","..oooo.."]),
star:icon(["...oo...","..oyyo..","oooyyooo","oyyyyyyo",".oyyyyo.","..oyyo..",".oyooyo.",".oo..oo."]),flag:icon(["ooo.....","orroo...","orrrroo.","orrroo..","ooo.....","o.......","o.......","o......."]),
pin:icon(["..oooo..",".orrrro.","orrwwrro","orrwwrro",".orrrro.","..orro..","...oo...","........"]),heal:icon(["..oooo..","..orro..","ooorrooo","orrrrrro","orrrrrro","ooorrooo","..orro..","..oooo.."]),
cur:icon(["o....","oo...","oro..","orro.","orrro","orro.","oro..","oo...","o...."]),down:icon(["ooooooo","orrrrro",".orrro.","..oro..","...o..."]),
abtn:icon(["..ooooo..",".orrrrro.","orrwwwrro","orwrrrwro","orwwwwwro","orwrrrwro","orrrrrrro",".oRRRRRo.","..ooooo.."]),bang:icon([".oooooo.","owwwwwwo","owwrrwwo","owwrrwwo","owwrrwwo","owwwwwwo","owwrrwwo","owwwwwwo",".oooooo.","..owo...","...o...."])};
Object.assign(ICO,{sablier:icon(["oooooooo",".oyyyyo.","..oyyo..","...oo...","...oo...","..obbo..",".obbbbo.","oooooooo"],{b:'#6a5ab8'}),rain:icon(["..oooo..",".owwwwo.","owwwwwwo","oooooooo",".b..b...","...b..b.",".b..b...","...b..b."]),q:icon([".oooooo.","owwbbwwo","owbwwbwo","owwwwbwo","owwwbwwo","owwwwwwo","owwwbwwo","owwwwwwo",".oooooo.","..owo...","...o...."]),dots:icon([".oooooo.","owwwwwwo","owwwwwwo","owwwwwwo","obwbwbwo","owwwwwwo","owwwwwwo","owwwwwwo",".oooooo.","..owo...","...o...."]),
 heart:icon([".oooooo.","owwwwwwo","owrrwrro","orrrrrRo","orrrrrRo","owrrrRwo","owwrRwwo","owwwwwwo",".oooooo.","..owo...","...o...."]),note:icon([".oooooo.","owwwwbbo","owwwbwbo","owwwbwwo","owwwbwwo","owbbbwwo","owbbbwwo","owwwwwwo",".oooooo.","..owo...","...o...."]),
 bVol:icon(["....oo..","...oyo..","..oyyo..",".oyyyyoo","oooyyyo.","..oyyo..","..oyo...","..oo...."],{y:'#7ae8f0',Y:'#2a9aa8'}),
 bRoc:icon(["...oo...","..oYyo..",".oYyyyo.","oYyywyyo","oNyyyyNo",".oNNyNo.","..oNNo..","...oo..."],{y:'#e8a050',Y:'#ffd08a',N:'#9a5a2a'}),bMir:icon(["...oo...","..obbo..","..obbo..",".obwbbo.","obwbbbbo","obbbbbBo",".oBbbBo.","..oooo.."]),
 map:icon(["oooooooo","oggyyggo","ogbbygyo","obbbyggo","oggyyggo","oygggbbo","oyggbbbo","oooooooo"]),gear:icon(["...oo...",".oollo..","olllllo.","oll.llo.","oll.llo.","olllllo.",".oollo..","...oo..."]),
 hyperpotion:icon(POT,{p:'#e8484f',P:'#a8303a',l:'#ffc0c0'}),elixir:icon(POT,{p:'#4d8fe6',P:'#2f5fb0',l:'#c8e0ff'}),totalsoin:icon(POT,{p:'#4cc46a',P:'#2f8a4a',l:'#d0f4d0'}),crepuscapsule:icon(BALLR,{r:'#6a3a9a',R:'#40305a',w:'#f6c445'}),cyclecapsule:icon(BALLR,{r:'#ffffff',R:'#1a1420',w:'#e84a8a'}),
 repousse:icon(["..oooo..","..okko..",".oooooo.",".oyyyyo.",".oywyyo.",".oyyyyo.",".oYYYYo.",".oooooo."]),shard:icon(["...oo...","..oyyo..",".oywwyo.",".oyyyYo.","oyyyyYYo",".oyyYYo.","..oyYo..","...oo..."],{y:'#fff0b0',Y:'#f6c445'}),
 rod:icon(["......oo",".....onN","....onNo","...onNo.","..onNo.o",".onNo..o","onNo...o","oNo...rr"]),lantern:icon(["..ooo...",".o...o..","ooooooo.","oyywyyo.","oyyyyyo.","oYyyyYo.","ooooooo.","..ooo..."]),
 dex:icon(["oooooooo","orrrrrro","orwwwwro","orwbbwro","orwwwwro","orrrrrro","oRRRRRRo","oooooooo"]),sun:icon(["...yy...",".y.yy.y.","..yyyy..","yyyYYyyy","yyyYYyyy","..yyyy..",".y.yy.y.","...yy..."]),
 moon:icon(["..ooo...",".oyyo...","oyyo....","oyyo....","oyyo...o","oyyyo.oo",".oyyyyo.","..oooo.."],{y:'#e6e0f6'}),ecl:icon(["..oooo..",".oyyyyo.","oyokkoyo","oykkkkyo","oykkkkyo","oyokkoyo",".oyyyyo.","..oooo.."],{y:'#e8484f'}),
 snd:icon(["...o....","..oo.o..","oooo..o.","owwo.o.o","owwo.o.o","oooo..o.","..oo.o..","...o...."]),book:icon(["oooooooo","obbbbwwo","obbbbwwo","obbbbwwo","obbbbwwo","obbbbwwo","oBBBBlwo","oooooooo"])});
const BERRY=["...Gg...","..oGgo..",".orrwro.","orrrwrro","orrrrrRo","orrrrRRo",".oRRRRo.","..oooo.."],GEM=["...oo...","..owco..",".owccco.","occcccCo",".occcCo.","..occo..","...oo...","........"];
Object.assign(ICO,{baiesoin:icon(BERRY,{g:'#6ac85a',G:'#2f8a4a'}),baieprisme:icon(BERRY,{r:'#9a7ae8',R:'#6a4ab8',g:'#6ac85a',G:'#2f8a4a'}),
 biscuit:icon(["..oooo..",".oyyyyo.","oyNyyyYo","oyyyNyYo","oyNyyyYo","oyyyNYYo",".oYYYYo.","..oooo.."]),
 miettes:icon(["........","..oooo..",".oyyyyo.","oywyyyYo","oyyyyyYo","oNNNNNNo",".oNNNNo.","..oooo.."]),
 ruban:icon(["oo....oo","orooooro","orrRRrro",".orRRro.","..oRRo..",".oro.oro",".oro.oro","..o...o."]),
 griffe:icon(["......oo",".....owo","....owlo","...owlo.","..owlo..",".owlo...","owlo....","ooo....."]),
 amulette:icon(["o......o",".o....o.","..o..o..","...oo...","..obbo..",".obwbbo.",".obbbBo.","..oooo.."]),
 orbe:icon(["..oooo..",".orrrro.","orwrrrRo","orrrrrRo","orrrrRRo","orrrRRRo",".oRRRRo.","..oooo.."],{r:'#e84a8a',R:'#a8305a'}),
 amucycle:icon(["..oooo..",".o....o.",".o....o.","..o..o..","..owNo..",".owwNNo.",".owwNNo.","..oooo.."],{w:'#ffffff',N:'#3a2a6a'}),
 poussiere:icon(["...o....","..oyo...","ooywyoo.","oyyyyyo.",".oyyyo..",".oyoyo..","oyo.oyo.","oo...oo."]),
 grelot:icon(["...oo...","..oyyo..",".oywyyo.",".oyyyyo.",".oyyyYo.","oyyyyYYo","oooooooo","...oo..."]),
 bracelet:icon(["..oyyo..",".oyrryo.","oyorRoyo","oyo..oYo","oyo..oYo","oyo..oYo",".oYyyYo.","..oooo.."]),
 trophy:icon(["oooooooo","oyyyyyYo","ooywyYoo",".oyyyYo.","..oyYo..","...oo...","..oYYo..",".oooooo."]),
 board:icon(["..oooo..","oooyyooo","owwwwwwo","owkkkwwo","owwwwwwo","owkkkkwo","owwwwwwo","oooooooo"]),
 hrt:icon([".oo.oo.","orrorro","orrrrRo",".orrRo.","..oRo..","...o..."],{r:'#ff7aa8',R:'#d84a7a'}),hrt0:icon([".oo.oo.","owwowwo","owwwwlo",".owwlo.","..olo..","...o..."],{w:'#e6dcef',l:'#cfc4dc'})});
ICO.qmark=icon([".oooooo.","owwwwwwo","owwyywwo","owwyywwo","owwyywwo","owwwwwwo","owwyywwo","owwwwwwo",".oooooo.","..owo...","...o...."],{y:'#e8a020'});
ICO.guide=icon([".oooooo.","owwbbwwo","owbwwbwo","owwwbwwo","owwbwwwo","owwwwwwo","owwbwwwo",".oooooo."]);
ICO.team=ICO.capsule;const BALL=epx(ICO.capsule),BIG={};const bigIco=k=>BIG[k]||(BIG[k]=epx(ICO[k]));
const LEGS={d:[["...oppppppppo...","...opPo..oPpo...","...okko..okko..."],["...oppppppppo...","...opPo..okko...","...okko........."],["...oppppppppo...","...okko..oPpo...",".........okko..."]],
s:[["....oppppppo....","....opPooPpo....","....okkookko...."],["....oppppppo....","...oPpo..oPpo...","..okko....okko.."],["....oppppppo....",".....oPppo......",".....okkko......"]]};
const UP={d:["................",".....oooooo.....","....ohhhhhho....","...ohhhwwhhho...","...oHhhhhhhHo...","..ooHHHHHHHHoo..","...odssssssdo...","...osesssseso...","...oSssssssSo...","....oSSssSSo....","...obbbwwbbbo...","..osBbbbbbbBso..","..oSoBbbbbBoSo.."],
u:["................",".....oooooo.....","....ohhhhhho....","...ohhhhhhhho...","...oHhhhhhhHo...","...oHHHHHHHHo...","...oddddddddo...","...oDddddddDo...","...oDDddddDDo...","....oDDDDDDo....","...obbbbbbbbo...","..osBbbbbbbBso..","..oSoBbbbbBoSo.."],
s:["................","....oooooo......","...ohhhhhho.....","...ohhhhwwho....","...oHhhhhhhho...","...oHHHHHHHHHoo.","...oddsssssso...","...oddsssseso...","...oDdsssssSo...","....oDSSSSSo....","....obbbbbbo....","....oBbbsbbo....","....oBbbSbbo...."]};
const LOOK={hero:{h:'#e8484f',d:'#4a3020',b:'#3f6fc8',p:'#2f3050'},mom:{h:'#e07aa0',d:'#8a4a3a',b:'#e07aa0',p:'#6a4a6a'},prof:{h:'#d6d2dc',d:'#d6d2dc',b:'#f4f2f6',p:'#6a5a4a'},rival:{h:'#2a9a62',b:'#2f2a3a',d:'#1a1a1a',p:'#3b3357'},grunt:{h:'#2f2645',b:'#6a3a8a',p:'#2f2645',d:'#2f2645'},vex:{h:'#8a1a9a',b:'#24202e',p:'#8a1a9a',d:'#e8e4ee'},leader:{h:'#8a6a4a',b:'#d8903a',p:'#5a4a3a',d:'#c8603a'},kid:{h:'#f0a838',b:'#58b858',d:'#6a4a2a'},girl:{h:'#e85a8a',b:'#f6c445',p:'#3f6fc8',d:'#a83a5a'},old:{h:'#a8a4b0',b:'#7a6a4a',d:'#a8a4b0'},scout:{h:'#5a7a3a',b:'#8aa04a',d:'#4a3020'},
 maelle:{h:'#2a4a8a',d:'#1f8ab0',b:'#f2f2f6',p:'#2a3a6a'},selene:{h:'#d8d4ec',d:'#d8d4ec',b:'#3a2a5a',p:'#2f2645'},lumen:{h:'#f2e6b0',d:'#f2e6b0',b:'#d8a040',p:'#8a5a2a'},miner:{h:'#f0b020',d:'#5a3a22',b:'#a87a4a',p:'#4a3a2a'},
 sailor:{h:'#f2f2f6',d:'#3a2a1a',b:'#3a6ac8',p:'#f2f2f6'},nurse:{h:'#f2a0c0',d:'#c86a8a',b:'#ffffff',p:'#f2a0c0'},astro:{h:'#3a3a6a',d:'#2a2040',b:'#5a4a9a',p:'#2f2645'},lili:{h:'#6a3a8a',b:'#c0a8e8',p:'#4a3a7a',d:'#4a2a6a'},fisher:{h:'#4a8a4a',d:'#7a5a3a',b:'#c89a4a',p:'#3a4a5a'},valen:{h:'#6a2a8a',d:'#4a1a6a',b:'#24202e',p:'#3a2a4a'},vendor:{h:'#c8603a',d:'#7a3a1a',b:'#4a78d0',p:'#2f3050'}};
const SPR={};
function chr(t,dir,f=0){if(PEO[t])return PEO[t].ow[dir*3+f];const k=t+dir+f;if(SPR[k])return SPR[k];const pal={o:C.ink,s:'#f8d0a8',S:'#d99f78',e:C.ink,w:'#ffffff',k:'#3b3357',h:'#888888',d:'#4a3020',b:'#888888',p:'#2f3050',...LOOK[t]};for(const c of'hdbp')pal[c.toUpperCase()]=mix(pal[c],C.ink,.35);
 const rows=[...UP[dir===0?'d':dir===1?'u':'s'],...LEGS[dir>1?'s':'d'][f]];
 return SPR[k]=mkc(16,16,g=>rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(pal[c])R(g,pal[c],dir===2?15-x:x,y)})))}
const trSpr=(t,big)=>PEO[t]?(big?PEO[t].vs:PEO[t].bt):PEO.grunt[big?'vs':'bt'];
const SHD=mkc(14,5,g=>pell(g,7,2,6,1,'rgba(20,14,40,.32)')),SHD2=mkc(24,8,g=>{g.fillStyle='rgba(22,18,44,.34)';g.beginPath();g.ellipse(12,4,11,3.4,0,0,7);g.fill();g.fillStyle='rgba(22,18,44,.2)';g.beginPath();g.ellipse(12,4,12,4,0,0,7);g.fill()});

// =====================================================================
// DONNÉES DE JEU : types, capacités, talents, espèces, objets
// =====================================================================
const TY={NOR:['NORMAL','#a09888'],FEU:['FEU','#e8702e'],EAU:['EAU','#4a8ad8'],PLA:['PLANTE','#4aa83e'],ELE:['ÉLEC','#d8b018'],ROC:['ROCHE','#9a8260'],OMB:['OMBRE','#7050a0'],LUM:['LUMIÈRE','#e0a820']};
const EF={FEU:{PLA:2,EAU:.5,ROC:.5,FEU:.5},EAU:{FEU:2,ROC:2,EAU:.5,PLA:.5},PLA:{EAU:2,ROC:2,FEU:.5,PLA:.5},ELE:{EAU:2,ROC:.5,PLA:.5,ELE:.5},ROC:{FEU:2,ELE:2,PLA:.5},OMB:{LUM:2,NOR:2,OMB:.5},LUM:{OMB:2,LUM:.5},NOR:{ROC:.5}};
const eff=(a,d)=>EF[a]?.[d]??1;
// Capacités : [id, nom, type, puissance, précision (0 = ne rate jamais), PP, effet, chance %, priorité]
// Effets : brn/psn/par/slp (statut) · atk/def/spd + ou - [n] (+ : lanceur, - : cible) · heal, heal_j (jour), heal_n (nuit) · drain · recoil · rain/sun/eclipse (ciel, 5 tours)
const MV={};[['charge','Charge','NOR',40,100,35],['griffe','Griffe','NOR',50,95,30],['viveatk','Vive-Attaque','NOR',40,100,30,0,0,1],['grondement','Grondement','NOR',0,100,40,'atk-'],['grimace','Grimace','NOR',0,100,30,'def-'],
['belier','Bélier','NOR',85,90,15,'recoil'],['plaquage','Plaquage','NOR',80,100,15,'par',30],['picpic','Picpic','NOR',35,100,35],['vent','Tornade','NOR',50,100,25],['aeropique','Aéropique','NOR',60,0,20],['cri','Cri de Guerre','NOR',0,0,20,'atk+'],['hate','Hâte','NOR',0,0,20,'spd+2'],['berceuse','Berceuse','NOR',0,60,15,'slp'],['soin','Récup','NOR',0,0,10,'heal'],
['braise','Braise','FEU',40,100,25,'brn',10],['crocsfeu','Crocs Feu','FEU',65,95,15,'brn',10],['feufollet','Feu Follet','FEU',0,85,15,'brn'],['lanceflam','Lance-Flammes','FEU',90,100,15,'brn',10],['deflagration','Déflagration','FEU',110,85,5,'brn',30],
['pistolet','Pistolet à O','EAU',40,100,25],['bulles','Bulles d\'O','EAU',55,100,20,'spd-',30],['aquajet','Aqua-Jet','EAU',40,100,20,0,0,1],['vague','Vague','EAU',75,100,15],['dansepluie','Danse Pluie','EAU',0,0,5,'rain'],['hydro','Hydrocanon','EAU',110,80,5],
['liane','Fouet Liane','PLA',45,100,25],['sangsue','Vampi-Sève','PLA',60,100,15,'drain'],['poudretox','Poudre Toxik','PLA',0,75,25,'psn'],['paraspore','Para-Spore','PLA',0,75,25,'par'],['feuille','Tranch\'Herbe','PLA',70,95,20],['photosynth','Photosynthèse','PLA',0,0,10,'heal_j'],['floral','Tempête Florale','PLA',95,100,10],
['eclair','Éclair','ELE',40,100,30,'par',10],['etincelle','Étincelle','ELE',65,100,20,'par',30],['cageclair','Cage-Éclair','ELE',0,90,20,'par'],['dardeclair','Dard-Éclair','ELE',80,95,15,'par',30],['tonnerre','Tonnerre','ELE',95,100,15,'par',10],
['jetpierre','Jet-Pierres','ROC',50,90,15],['durcir','Armure','ROC',0,0,20,'def+'],['eboul','Éboulement','ROC',75,90,10,'spd-',30],['murroc','Mur de Roc','ROC',0,0,10,'def+2'],['lameroc','Lame de Roc','ROC',100,80,5],
['ombrefurtive','Ombre Furtive','OMB',40,100,30,0,0,1],['morsure','Morsure','OMB',60,100,25],['hypnose','Hypnose Noire','OMB',0,65,15,'slp'],['nuit','Griffe Nuit','OMB',80,100,15],['clairlune','Clair de Lune','OMB',0,0,10,'heal_n'],['rayonnoir','Rayon Noir','OMB',90,100,10,'def-',20],['eclipse','Éclipse','OMB',0,0,5,'eclipse'],['lunenoire','Lune Noire','OMB',95,90,5],
['lueur','Lueur','LUM',40,100,30,0,0,1],['aube','Lame d\'Aube','LUM',65,100,20],['poudreor','Poudre d\'Or','LUM',0,75,15,'slp'],['zenith','Zénith','LUM',0,0,5,'sun'],['prisme','Prisme','LUM',90,100,10],['aubeeternelle','Aube Éternelle','LUM',110,90,5],
['lutte','Lutte','NOR',50,0,1,'recoil'],['equilibre','Équilibre','LUM',110,100,5],['pluieetoile','Pluie d\'Étoiles','LUM',80,95,10,'spd-',20],['retour','Retour','NOR',1,100,20]].forEach(([id,n,t,p,a,pp,e,ch,pr])=>MV[id]={id,n,t,p,a,pp,e,ch:p?ch||0:100,pr:pr||0});
const STN={brn:['BRÛ','#e8702e','brûlé','brûler','Brûle'],psn:['PSN','#9a5ad0','empoisonné','empoisonner','Empoisonne'],par:['PAR','#d8b018','paralysé','paralyser','Paralyse'],slp:['SOM','#7a86a8','endormi','endormir','Endort']};
const STAT={atk:'L\'Attaque',def:'La Défense',spd:'La Vitesse'};
const SKY={rain:['PLUIE','#4a8ad8','Il pleut ! EAU x1,5 · FEU x0,5.','La pluie s\'arrête.'],sun:['ZÉNITH','#e0a820','Le soleil brille au zénith ! FEU et LUMIÈRE x1,5 · EAU x0,5.','Le soleil se voile.'],eclipse:['ÉCLIPSE','#7050a0','Une éclipse obscurcit le terrain ! OMBRE x1,5. La LUMIÈRE peut la dissiper.','L\'éclipse se dissipe.']};
function mvDesc(v){const e=v.e||'',m=e.match(/^(atk|def|spd)([+-])(\d?)$/),ch=v.p&&v.ch<100?` (${v.ch}%)`:'';let s='';if(v.id==='lutte')return'Dernier recours : blesse aussi le lanceur.';if(v.id==='retour')return'Puissance selon le lien : jusqu\'à 102 quand vous êtes inséparables.';
 if(m)s=(v.p?'Peut baisser':m[2]==='+'?'Monte':'Baisse')+' '+{atk:'l\'Attaque',def:'la Défense',spd:'la Vitesse'}[m[1]]+(m[2]==='-'?' adverse':'')+(m[3]==='2'?' de 2 crans':'')+ch+'.';
 else if(STN[e])s=(v.p?'Peut '+STN[e][3]+' la cible':STN[e][4]+' la cible')+ch+'.';
 else s={heal:'Soigne la moitié des PV.',heal_j:'Soigne ; bien plus efficace le jour.',heal_n:'Soigne ; bien plus efficace la nuit.',drain:'Rend la moitié des dégâts infligés.',recoil:'Blesse aussi le lanceur.',rain:'Fait pleuvoir 5 tours.',sun:'Invoque le Zénith 5 tours.',eclipse:'Invoque une Éclipse 5 tours.'}[e]||'';
 if(v.pr)s+=' Frappe en premier.';if(!v.a&&v.p)s+=' Ne rate jamais.';return s.trim()}
// Talents : effets passifs propres à chaque espèce (annoncés en combat quand ils se déclenchent)
const TAL={brasier:['Brasier','Attaques FEU x1,5 quand ses PV passent sous le tiers.'],torrent:['Torrent','Attaques EAU x1,5 quand ses PV passent sous le tiers.'],engrais:['Engrais','Attaques PLANTE x1,5 quand ses PV passent sous le tiers.'],
 chapardeur:['Chapardeur','Ramasse parfois un objet après un combat.'],vigilant:['Vigilant','Ne peut pas être endormi.'],electrise:['Électrisé','Peut paralyser qui le frappe au corps à corps.'],fermete:['Fermeté','Survit à 1 PV à un coup fatal reçu PV au maximum.'],
 seve:['Sève Vive','Récupère un peu de PV à chaque tour, le jour.'],noctambule:['Noctambule','Attaques OMBRE x1,3 la nuit et sous une Éclipse.'],corpsardent:['Corps Ardent','Peut brûler qui le frappe au corps à corps.'],
 glissade:['Glissade','Vitesse doublée sous la pluie.'],lueur:['Lueur Nocturne','Attaques LUMIÈRE x1,3 la nuit et sous une Éclipse.'],echo:['Écholocation','Ses attaques ne ratent jamais.'],
 levejour:['Lever du Jour','Invoque le Zénith en entrant au combat.'],eclipsetot:['Éclipse Totale','Invoque une Éclipse en entrant au combat.']};
const SP={};
function S(id,name,t,bs,xp,cr,c,learn,evo,base,stg,tal,desc){SP[id]={id,name,t,bs,xp,cr,c,learn,evo,base:base||id,stg:stg||1,tal,desc}}
const LF=[[1,'griffe'],[1,'grondement'],[6,'braise'],[10,'viveatk'],[13,'crocsfeu'],[17,'feufollet'],[21,'cri'],[26,'lanceflam'],[34,'deflagration']],
 LE=[[1,'charge'],[1,'grimace'],[6,'pistolet'],[10,'bulles'],[13,'morsure'],[17,'durcir'],[22,'vague'],[29,'dansepluie'],[35,'hydro']],
 LP=[[1,'charge'],[1,'grondement'],[6,'liane'],[10,'sangsue'],[13,'paraspore'],[17,'feuille'],[23,'photosynth'],[31,'floral']],
 LR=[[1,'charge'],[3,'grimace'],[6,'viveatk'],[9,'morsure'],[14,'hate'],[19,'plaquage'],[27,'belier'],[33,'nuit']],
 LC=[[1,'charge'],[1,'durcir'],[7,'jetpierre'],[12,'grimace'],[17,'eboul'],[23,'murroc'],[31,'lameroc']],
 LO=[[1,'griffe'],[1,'grondement'],[6,'ombrefurtive'],[10,'morsure'],[15,'hypnose'],[21,'nuit'],[27,'clairlune'],[33,'rayonnoir']],
 LT=[[1,'charge'],[1,'grimace'],[5,'pistolet'],[9,'bulles'],[14,'aquajet'],[19,'dansepluie'],[24,'vague'],[30,'plaquage'],[36,'hydro']],
 LL=[[1,'charge'],[1,'lueur'],[8,'hate'],[12,'aube'],[17,'poudreor'],[23,'zenith'],[29,'prisme'],[35,'soin']],
 LV=[[1,'eclair'],[1,'grimace'],[6,'viveatk'],[10,'etincelle'],[15,'cageclair'],[21,'dardeclair'],[28,'tonnerre'],[34,'hate']],
 LG=[[1,'charge'],[4,'liane'],[8,'poudretox'],[12,'sangsue'],[17,'vent'],[22,'feuille'],[27,'photosynth'],[33,'floral']];
S('flamiot','Flamiot','FEU',[39,52,43,65],62,45,['#f07a3a','#ffd88a','#ffd23a'],LF,[16,'brasilion'],0,1,'brasier','Son pelage tiédit les mains des mineurs de Cendreville en hiver. Sa queue s\'embrase quand il est content.');
S('brasilion','Brasilion','FEU',[66,84,64,82],150,45,['#d8482a','#ffcf7a','#ffe04a'],LF,null,'flamiot',2,'brasier','Il veille sur les foyers d\'Aurélys. Sa crinière de flammes ne s\'éteint jamais, même sous l\'averse.');
S('goutelin','Goutelin','EAU',[44,48,65,43],63,45,['#4aa0e8','#dcf2ff','#9ad8ff'],LE,[16,'torrentor'],0,1,'torrent','Né dans les sources chaudes du Mont Braise. Quand il est heureux, il pleure… littéralement.');
S('torrentor','Torrentor','EAU',[70,74,90,62],150,45,['#2a70c8','#d0ecff','#7ac8ff'],LE,null,'goutelin',2,'torrent','D\'un coup de queue, il fend la roche. La légende dit qu\'il a creusé seul le lac Miroir.');
S('pousseron','Pousseron','PLA',[45,49,49,45],64,45,['#6ac85a','#eef8c8','#e8506a'],LP,[16,'sylvorne'],0,1,'engrais','Le bouquet de feuilles de sa tête s\'ouvre au soleil. Il dort enraciné au milieu des prés.');
S('sylvorne','Sylvorne','PLA',[70,76,72,66],150,45,['#3a9a4a','#e0f0b8','#f06a8a'],LP,null,'pousseron',2,'engrais','Un vrai petit arbre pousse sur sa tête et fleurit au printemps. Les anciens le croyaient messager de Solarion.');
S('ratounet','Ratounet','NOR',[30,56,35,72],51,255,['#a88a6a','#f0e0c8','#e8a0a0'],LR,[14,'ratoroi'],0,1,'chapardeur','Un petit chapardeur qui collectionne tout ce qui brille. Ses poches semblent sans fond.');
S('ratoroi','Ratoroi','NOR',[60,81,62,97],127,127,['#8a6a4a','#f0dcc0','#f0b0b0'],LR,null,'ratounet',2,'chapardeur','Il règne sur les ratounets du quartier. Son masque de bandit ne trompe personne… sauf les gardes.');
S('piafou','Piafou','NOR',[45,50,40,62],55,255,['#c8a070','#f8f0d8','#f0a030'],[[1,'picpic'],[1,'grondement'],[6,'vent'],[11,'viveatk'],[17,'aeropique'],[24,'hate'],[30,'belier']],[20,'faucaube'],0,1,'vigilant','Il piaille dès l\'aube pour réveiller Bourg-Lueur. Personne ne le lui a jamais demandé.');
S('volticelle','Volticelle','ELE',[40,55,40,90],66,120,['#f2d23a','#fff4b8','#3a3a5a'],LV,[24,'bourdonnerre'],0,1,'electrise','Elle butine l\'électricité des orages. Son miel crépite sur la langue.');
S('bourdonnerre','Bourdonnerre','ELE',[70,92,66,104],165,45,['#f2c82a','#fff2c0','#2e2a5a'],LV,null,'volticelle',2,'electrise','Elle défend sa ruche avec un dard chargé de foudre. Son bourdonnement fait vibrer l\'air.');
S('rocaillon','Rocaillon','ROC',[50,70,90,25],60,190,['#9a9088','#c8c0b0','#6a5a50'],LC,[22,'rocaroc'],0,1,'fermete','Il se roule en boule au moindre bruit. Les mineurs le confondent souvent avec un caillou.');
S('rocaroc','Rocaroc','ROC',[75,95,115,35],140,90,['#7a7068','#b8b0a0','#d07a3a'],LC,null,'rocaillon',2,'fermete','Des flammes jaillissent des fissures de sa carapace de roche, chauffée par le volcan. Il ne recule jamais.');
S('larvigne','Larvigne','PLA',[45,42,48,50],55,200,['#a8d84a','#f2f8c8','#7a4a8a'],LG,[18,'papivigne'],0,1,'seve','Elle grignote le raisin des coteaux et grossit à vue d\'œil. Ses grandes oreilles entendent mûrir les fruits.');
S('papivigne','Papivigne','PLA',[70,72,66,88],150,60,['#8ad04a','#c8e86a','#7a4a9a'],LG,null,'larvigne',2,'seve','Ses ailes sont de vraies feuilles de vigne. Ses grappes ont un léger goût de miel.');
S('ombrelin','Ombrelin','OMB',[40,62,40,75],70,120,['#6a4a9a','#c0a8e8','#e84a8a'],LO,[22,'noctyrex'],0,1,'noctambule','Il s\'abrite sous son grand chapeau pour fuir le soleil. Il dépérit quand les nuits sont trop courtes.');
S('noctyrex','Noctyrex','OMB',[76,102,72,95],160,45,['#4a2a7a','#a890d8','#ff4a7a'],LO,null,'ombrelin',2,'noctambule','Le roi des nuits sans lune. Son œil unique luit dans le noir et glace les plus braves.');
S('magmor','Magmor','FEU',[65,85,75,45],95,90,['#c83a2a','#f8a050','#3a2a2a'],[[1,'braise'],[1,'durcir'],[10,'feufollet'],[14,'crocsfeu'],[20,'jetpierre'],[26,'lanceflam'],[34,'deflagration']],null,0,1,'corpsardent','Il somnole dans la lave du Mont Braise. Sa carapace craque comme des braises.');
S('tetardin','Têtardin','EAU',[50,45,50,62],60,190,['#2f8fc0','#f6efcf','#f6c445'],LT,[20,'crapaflot'],0,1,'glissade','Il souffle des bulles pour respirer hors de l\'eau. Sa queue givrée laisse derrière lui une traînée de bruine.');
S('crapaflot','Crapaflot','EAU',[82,82,80,78],150,75,['#2f84bc','#f6efcf','#f6c445'],LT,null,'tetardin',2,'glissade','Les marins de Port-Miroir le saluent comme un capitaine. Il sent venir les tempêtes.');
S('lumignon','Lumignon','LUM',[42,38,45,68],62,160,['#fff1d0','#ffe266','#5a3a6a'],LL,[22,'phalumine'],0,1,'lueur','Cette larve se nourrit de lumière. La nuit, sa corne s\'allume pour guider les voyageurs égarés.');
S('phalumine','Phalumine','LUM',[72,80,66,96],160,60,['#f2b448','#fff2d0','#5a3a6a'],LL,null,'lumignon',2,'lueur','Les ocelles de ses ailes imitent le soleil. Les créatures d\'ombre la fuient… ou la suivent.');
S('nocturelle','Nocturelle','OMB',[55,64,52,88],95,120,['#4a3a8a','#8a78c8','#e85a9a'],[[1,'vent'],[1,'ombrefurtive'],[10,'morsure'],[16,'hypnose'],[22,'clairlune'],[28,'nuit'],[34,'rayonnoir']],null,0,1,'echo','Elle se guide au son dans les grottes les plus noires. Ses ailes battent sans le moindre bruit.');
S('solarion','Solarion','LUM',[100,105,95,100],270,25,['#ffe890','#ffffff','#f0a020'],[[1,'aube'],[1,'soin'],[1,'zenith'],[30,'prisme'],[38,'aubeeternelle']],null,0,2,'levejour','Gardien du jour d\'Aurélys. Sa lumière fait mûrir les récoltes et chasse les cauchemars.');
S('nocturion','Nocturion','OMB',[100,108,90,100],270,25,['#2e2458','#c8bff0','#ff4a9a'],[[1,'nuit'],[1,'clairlune'],[1,'eclipse'],[30,'rayonnoir'],[34,'lunenoire']],null,0,2,'eclipsetot','Gardien de la nuit, scellé jadis par les fondateurs d\'Aurélys. Sans lui, le Cycle boite.');

// --- Nouvelles espèces 5.1 : chacune a un habitat, un horaire ou une météo (voir les tables de rencontres)
const LPI=[[1,'picpic'],[1,'grondement'],[6,'vent'],[11,'viveatk'],[17,'aeropique'],[24,'hate'],[30,'belier'],[36,'plaquage']];
S('faucaube','Faucaube','NOR',[75,85,65,100],155,45,['#8a6a9a','#e8dcc0','#f0c040'],LPI,null,'piafou',2,'vigilant','Il plane au-dessus d\'Aurélys dès la première lueur. Rien de ce qui bouge dans l\'herbe n\'échappe à ses yeux d\'or.');
S('pissenlou','Pissenlou','PLA',[45,40,45,60],58,200,['#f2e6b0','#ffffff','#8a6a3a'],LP,[17,'pissenlion'],0,1,'engrais','Une boule de duvet portée par le vent. Elle se pose là où le soleil tape le plus fort, et s\'y endort aussitôt.');
S('pissenlion','Pissenlion','PLA',[72,82,64,84],150,60,['#f07a8a','#ffe080','#4aa83e'],LP,null,'pissenlou',2,'engrais','Sa crinière de pétales se referme au coucher du soleil. Il rugit pour chasser les nuages.');
S('rocaton','Rocaton','ROC',[45,55,70,40],58,190,['#8a8a92','#c8c8d0','#4a4a52'],LC,[20,'granifelin'],0,1,'fermete','Il dort roulé en boule dans les galeries et ronronne quand on le caresse. Les mineurs le gardent comme porte-bonheur.');
S('granifelin','Granifélin','ROC',[70,92,90,88],150,75,['#7a7a82','#b8b8c0','#3a8ad8'],LC,[[0,'astrafelin',{item:'pierrelune'}]],'rocaton',2,'fermete','Souple comme un chat, dur comme le granit. Il chasse les Rocaillon… mais seulement pour jouer.');
S('fumenard','Fumenard','FEU',[42,56,40,70],62,120,['#a89890','#f07a3a','#5a4a44'],LF,[22,'pyrenard'],0,1,'corpsardent','Il se cache dans les fumerolles du Mont Braise. La nuit, on ne voit de lui que le bout rougeoyant de sa queue.');
S('pyrenard','Pyrénard','FEU',[72,90,62,104],160,45,['#f6c070','#ff8a3a','#ffffff'],LF,null,'fumenard',2,'brasier','Sa queue de flammes laisse une traînée d\'étincelles. On dit qu\'il guide les voyageurs perdus sur le volcan.');
S('hiboulume','Hiboulume','LUM',[80,50,70,60],140,45,['#e8f0e8','#a8d8b0','#f6c445'],[[1,'lueur'],[1,'soin'],[8,'picpic'],[14,'hypnose'],[20,'aube'],[26,'vent'],[32,'prisme']],null,0,1,'lueur','La nuit, il soigne en silence les créatures blessées de la forêt. Ses yeux éclairent comme deux lanternes.');
S('ricanoir','Ricanoir','OMB',[60,95,55,90],150,45,['#1a1420','#ffffff','#e84a8a'],LO,null,0,1,'noctambule','On n\'entend que son rire, entre les colonnes des ruines. Personne n\'a jamais vu son corps : seulement ses dents.');
S('miroitruite','Miroitruite','EAU',[55,65,55,85],90,150,['#3a9ab8','#e84a5a','#f6f0d0'],LT,null,0,1,'glissade','Ses écailles reflètent le ciel comme un miroir. Les pêcheurs de Port-Miroir y lisent le temps du lendemain.');
S('racinou','Racinou','PLA',[50,52,58,38],60,180,['#4aa83e','#c8e86a','#6a4a2a'],LG,[21,'racinaile'],0,1,'seve','Il se plante dans la terre humide pour dormir et se déterre au moindre bruit. Il adore les jours de pluie.');
S('racinaile','Racinaile','PLA',[75,78,72,80],150,60,['#3a9a4a','#a8d8f0','#6a4a2a'],LG,null,'racinou',2,'seve','Ses feuilles battent comme des ailes. Ses racines pendent sous lui et goûtent la terre avant qu\'il ne se pose.');
S('herissou','Hérissou','ROC',[48,58,72,42],62,180,['#8a6a4a','#e8d0a8','#4a3a2a'],LC,[24,'armaroc'],0,1,'fermete','Ses piquants sont de petits cailloux. Sur la Rive Brumeuse, il roule jusqu\'à l\'eau pour boire.');
S('armaroc','Armaroc','ROC',[78,88,100,60],155,60,['#8a7050','#c8b090','#3a2a1a'],LC,null,'herissou',2,'fermete','Il traverse la région en roulant. Sa queue lui sert de lasso pour se hisser en haut des falaises.');
S('etincelot','Étincelot','ELE',[40,58,38,96],70,90,['#c88a3a','#ffe060','#e84a4a'],LV,null,0,1,'electrise','Il n\'apparaît que sous l\'orage, quand l\'air crépite. Ses joues stockent la foudre pour les jours de beau temps.');
S('lapilune','Lapilune','LUM',[60,48,52,84],110,75,['#e8e8f0','#c8b8e8','#8ac8f0'],LL,null,0,1,'lueur','Les nuits claires, il danse sur les rives au clair de lune. Le jour, personne ne sait où il se cache.');

// --- Espèces 7.0 : lignées à embranchements (jour/nuit), évolutions par objet ou par lien, créatures de l'éclipse, fossile, abysses, légendaires
S('lueurette','Lueurette','OMB',[40,50,40,70],62,150,['#4a8ad8','#c8e8ff','#2a3a6a'],LO,[[20,'flammeche',{time:'j'}],[20,'brumelle',{time:'n'}]],0,1,'noctambule','Une petite flamme bleue qui erre près des fumerolles. Si elle grandit au soleil, elle devient feu ; sous la lune, elle devient brume.');
S('flammeche','Flammèche','FEU',[70,88,62,96],158,45,['#f07a3a','#ffe080','#3a2a2a'],LF,null,'lueurette',2,'brasier','Une Lueurette qui a grandi au soleil. Elle danse au-dessus des braises et rit quand le vent souffle.');
S('brumelle','Brumelle','EAU',[70,72,70,92],150,60,['#8ac8f0','#ffffff','#3a5a8a'],LT,[34,'tornalis'],'lueurette',2,'glissade','Une Lueurette qui a grandi sous la lune et s\'est changée en brume vivante. Elle aime les ports au petit matin.');
S('tornalis','Tornalis','EAU',[90,96,80,105],220,45,['#3a74b8','#c8e8ff','#2a2a5a'],LE,null,'lueurette',3,'torrent','Un tourbillon d\'eau et de nuit. Les marins disent qu\'il naît des tempêtes que personne n\'a vu venir.');
S('relicat','Relicat','NOR',[55,55,60,50],70,120,['#c8b08a','#5a4a3a','#3aa8c8'],LR,[[25,'sphinxor',{time:'j'}],[25,'anubrume',{time:'n'}]],0,1,'vigilant','Un chat de pierre réveillé dans les ruines. Il garde des tombeaux dont plus personne ne se souvient. Le soleil ou la lune décidera de son destin.');
S('sphinxor','Sphinxor','LUM',[85,90,85,80],175,45,['#f0c040','#ffffff','#3aa8c8'],LL,null,'relicat',2,'lueur','Le gardien du jour des anciens. Il pose une énigme à qui s\'approche des ruines, et ne pardonne pas la mauvaise réponse.');
S('anubrume','Anubrume','OMB',[85,98,75,90],175,45,['#3a3a4a','#f0c040','#8a5ad0'],LO,null,'relicat',2,'noctambule','Le gardien de la nuit des anciens. Il guide les âmes des créatures éteintes vers les étoiles.');
S('peluchon','Peluchon','NOR',[55,45,50,55],60,160,['#4a8ad8','#f0c040','#e8a0c0'],LR,[[1,'peluchine',{bond:4}]],0,1,'vigilant','Une peluche que quelqu\'un a aimée si fort qu\'elle s\'est mise à bouger. Elle ne grandit qu\'avec beaucoup, beaucoup d\'affection.');
S('peluchine','Peluchine','NOR',[85,80,80,75],160,60,['#3a74c8','#f0c040','#ff7aa8'],LR,null,'peluchon',2,'vigilant','Son lien avec son dresseur est si fort qu\'elle sent sa tristesse à l\'autre bout de la région.');
S('astrafelin','Astrafélin','LUM',[80,100,90,100],185,45,['#7a5ad0','#d8d0f8','#3a3a4a'],LC,null,'rocaton',3,'fermete','Un Granifélin qui a touché une Pierre Lunaire. Ses cristaux captent la lumière des étoiles et la rendent aux nuits sans lune.');
S('oeillombre','Œillombre','OMB',[40,45,45,70],65,120,['#6a2a8a','#f0c040','#e84a8a'],LO,[28,'eclipsoeil'],0,1,'noctambule','Ils sont apparus avec l\'éclipse. Personne ne les avait jamais vus avant… ou personne ne s\'en souvient.');
S('eclipsoeil','Éclipsœil','OMB',[75,95,70,100],175,45,['#4a1a6a','#f0c040','#e84a8a'],LO,null,'oeillombre',2,'noctambule','Son œil d\'or fixe le soleil caché. Quand l\'éclipse prendra fin, dit-on, il fermera les yeux pour mille ans.');
S('fossilame','Fossilame','ROC',[70,105,85,60],170,45,['#8a6a4a','#e8d8b8','#c83a3a'],LC,null,0,1,'fermete','Un fossile ranimé par le Prof. Saule. Il était déjà vieux quand les fondateurs ont endormi la nuit… et il s\'en souvient.');
S('lumipeche','Lumipêche','ELE',[45,50,45,60],64,190,['#3a4a3a','#ffe060','#3a8ab8'],LV,[22,'lanterfin'],0,1,'electrise','Il vit dans les eaux profondes et attire ses proies avec sa petite lanterne. Seule une bonne canne permet de l\'atteindre.');
S('lanterfin','Lanterfin','ELE',[70,80,65,72],150,75,['#3a4a3a','#ffe060','#e84a4a'],LV,[38,'abyssombre'],'lumipeche',2,'electrise','Sa lanterne brille assez pour éclairer le fond du port. Les pêcheurs la prennent pour une étoile tombée.');
S('abyssombre','Abyssombre','ELE',[95,115,85,80],240,45,['#2a2a3a','#ffe060','#e84a4a'],LV,null,'lumipeche',3,'electrise','Le seigneur des abysses d\'Aurélys. On dit qu\'il avale les tempêtes et recrache des éclairs.');
S('meteosaur','Météosaur','ROC',[50,62,55,58],70,120,['#e8702e','#8a5a3a','#ffe080'],LC,[30,'quetzaroc'],0,1,'fermete','On dit qu\'il tombe du ciel les nuits d\'étoiles filantes. Les Coteaux d\'Aurore sont criblés de ses petits cratères.');
S('quetzaroc','Quetzaroc','ROC',[85,100,80,95],190,45,['#e8702e','#4a8ad8','#ffe080'],LC,null,'meteosaur',2,'fermete','Il vole entre les étoiles filantes et en ramène des éclats. Ses ailes de roche chantent dans le vent.');
S('nuageon','Nuageon','EAU',[55,45,55,60],64,170,['#c8e0f0','#ffffff','#5a7a9a'],LE,[[0,'orageon',{item:'pierreorage'}]],0,1,'glissade','Un petit nuage qui pleure quand il est content. Une Pierre Orage, dit-on, le fait gronder pour de bon.');
S('orageon','Orageon','ELE',[80,92,70,96],170,60,['#5a6a8a','#ffe060','#ffffff'],LV,null,'nuageon',2,'electrise','Un nuage d\'orage qui a trouvé sa voix. Il suit les dresseurs qu\'il aime et leur prépare des averses.');
S('crepuscel','Crépuscel','LUM',[100,100,100,100],280,3,['#ffffff','#1a1420','#e84a8a'],[[1,'aube'],[1,'nuit'],[1,'soin'],[40,'prisme'],[40,'rayonnoir'],[50,'equilibre']],null,0,2,'levejour','Né du tout premier crépuscule, il est le Cycle lui-même. Il n\'apparaît que lorsque le jour et la nuit sont en paix.');
S('presagelle','Présagelle','LUM',[90,85,90,110],260,5,['#8a6aa8','#ffe080','#3a3a5a'],[[1,'lueur'],[1,'hypnose'],[1,'clairlune'],[30,'prisme'],[40,'soin']],null,0,2,'lueur','Une jument d\'étoiles qui ne se montre qu\'aux nuits claires. On dit qu\'elle voit l\'avenir, et qu\'elle l\'a déjà vu pour toi.');
const FLY=new Set(['nuageon','orageon','lumipeche','lanterfin','abyssombre','lueurette','brumelle','tornalis','oeillombre','eclipsoeil','quetzaroc','crepuscel','faucaube','racinaile','hiboulume','piafou','volticelle','bourdonnerre','phalumine','papivigne','nocturelle','ombrelin']);
const LNB=[[1,'charge'],[1,'lueur'],[8,'pistolet'],[14,'hate'],[20,'aquajet'],[26,'prisme'],[32,'pluieetoile'],[40,'vague'],[48,'aubeeternelle']];
S('grumeroc','Grumeroc','ROC',[60,75,85,30],80,60,['#7a5a3a','#c89a6a','#e8d0a0'],LC,[38,'conglolem'],0,1,'fermete','Il se roule en boule dans les galeries que creuse la Team Éclipse et avale les cailloux qu\'on lui jette. Il digère même le fer.');
S('conglolem','Conglolem','ROC',[95,110,120,35],200,25,['#6a3a2a','#b86a3a','#f0c070'],LC,null,'grumeroc',2,'fermete','Des centaines de cailloux soudés par la chaleur de la Faille. Quand il se tient immobile, on le prend pour un pilier de la mine.');
S('nebulin','Nébulin','LUM',[50,45,50,70],70,45,['#3a3a7a','#a8b8f0','#f0e0ff'],LNB,[32,'galaxelle'],0,1,'lueur','Il tombe dans les lacs avec les étoiles filantes. On ne le pêche que les nuits où le ciel pleut de la lumière.');
S('galaxelle','Galaxelle','LUM',[70,65,70,85],150,30,['#4a3a8a','#c0b0f8','#ffe8a0'],LNB,[48,'novarium'],'nebulin',2,'lueur','Une galaxie entière tourne dans son corps. Elle danse à la surface de l\'eau pour que les étoiles s\'y reflètent mieux.');
S('novarium','Novarium','LUM',[90,95,85,100],230,10,['#2a2a6a','#d8c8ff','#ffd860'],LNB,null,'nebulin',3,'lueur','Son voile contient la lumière d\'une étoile morte depuis mille ans. Les astronomes de Lunévie l\'appellent "la nuit qui se souvient".');
S('heliote','Héliote','LUM',[80,90,80,95],200,8,['#d86a3a','#f8c070','#ffffff'],[[1,'lueur'],[1,'zenith'],[15,'viveatk'],[25,'hate'],[35,'prisme'],[45,'soin'],[55,'aubeeternelle']],null,0,1,'levejour','Jumeau de Séléniote. Il garde le Sanctuaire tant que le soleil brille, et disparaît au premier rayon de lune.');
S('seleniote','Séléniote','OMB',[80,90,80,95],200,8,['#2a2a4a','#e8e8f8','#8ab8f0'],[[1,'ombrefurtive'],[1,'eclipse'],[15,'hypnose'],[25,'hate'],[35,'rayonnoir'],[45,'clairlune'],[55,'lunenoire']],null,0,1,'eclipsetot','Jumelle d\'Héliote. Elle veille sur le Sanctuaire la nuit. Les deux ne se sont jamais vus, mais chacun laisse un cadeau à l\'autre à l\'aube.');
const DEX=['flamiot','brasilion','goutelin','torrentor','pousseron','sylvorne','ratounet','ratoroi','piafou','faucaube','tetardin','crapaflot','larvigne','papivigne','volticelle','bourdonnerre','lumignon','phalumine','rocaillon','rocaroc','magmor','ombrelin','noctyrex','nocturelle',
 'pissenlou','pissenlion','racinou','racinaile','rocaton','granifelin','astrafelin','herissou','armaroc','fumenard','pyrenard','etincelot','miroitruite','lapilune','hiboulume','ricanoir',
 'lueurette','flammeche','brumelle','tornalis','relicat','sphinxor','anubrume','peluchon','peluchine','nuageon','orageon','meteosaur','quetzaroc','lumipeche','lanterfin','abyssombre',
 'oeillombre','eclipsoeil','fossilame','grumeroc','conglolem','nebulin','galaxelle','novarium','heliote','seleniote','presagelle','crepuscel','solarion','nocturion'];
// Objets : [nom, prix, description, valeur, catégorie]
const IT={potion:['Potion',200,'Soigne 20 PV.',20,'heal'],superpotion:['Super Potion',600,'Soigne 60 PV.',60,'heal'],hyperpotion:['Hyper Potion',1200,'Soigne 150 PV.',150,'heal'],rappel:['Rappel',1500,'Ranime une créature K.O. avec la moitié de ses PV.',0,'revive'],
 totalsoin:['Total Soin',300,'Guérit brûlure, poison, paralysie et sommeil.',0,'cure'],elixir:['Élixir',900,'Rend 10 PP à chaque capacité d\'une créature.',10,'pp'],repousse:['Repousse',350,'Éloigne les créatures sauvages plus faibles pendant 150 pas.',150,'repel'],
 pierrelune:['Pierre Lunaire',2000,'Une pierre tombée du ciel des nuits longues. Fait évoluer certaines créatures.',0,'evo'],pierreorage:['Pierre Orage',2000,'Elle crépite sous les doigts. Fait évoluer certaines créatures.',0,'evo'],
 fossile:['Fossile Ancien',0,'Une pierre où dort une créature d\'un autre âge. Le Prof. Saule saurait quoi en faire.',0,'quest'],
 capsule:['Capsule',200,'Lance-la sur une créature sauvage affaiblie.',1,'ball'],supercapsule:['Super Capsule',600,'Taux de capture x1,5.',1.5,'ball'],hypercapsule:['Hyper Capsule',1200,'Taux de capture x2.',2,'ball'],
 amucycle:['Amulette du Cycle',0,'À tenir. Attaques x1,15, et le porteur ne peut pas être endormi.',0,'held'],cyclecapsule:['Capsule Cycle',0,'Fabriquée par Caïus pour Crépuscel. Elle ne rate jamais.',999,'ball'],poussiere:['Poussière d\'Étoile',0,'Tombée une nuit d\'étoiles filantes. L\'Astronome Lys de Lunévie en raffole.',0,'quest'],crepuscapsule:['Crépuscapsule',800,'Taux x3 la nuit et pendant l\'éclipse, sinon x1.',3,'ball'],
 biscuit:['Biscuit d\'Aube',150,'Une friandise dorée. Renforce beaucoup le lien d\'une créature.',12,'treat'],
 baiesoin:['Baie Sève',250,'À tenir. Rend 1/4 des PV quand ils passent sous la moitié, puis se consomme.',4,'held'],
 baieprisme:['Baie Prisme',300,'À tenir. Guérit aussitôt brûlure, poison, paralysie ou sommeil, puis se consomme.',0,'held'],
 miettes:['Miettes Dorées',0,'À tenir. Rend 1/16 des PV à la fin de chaque tour.',16,'held'],
 ruban:['Ruban Ténacité',0,'À tenir. PV au maximum, survit à un coup fatal avec 1 PV.',0,'held'],
 griffe:['Griffe Vive',0,'À tenir. Une chance sur cinq d\'agir en premier.',.2,'held'],
 amulette:['Amulette Savante',0,'À tenir. EXP gagnée x1,5.',1.5,'held'],
 orbe:['Orbe Furie',0,'À tenir. Attaques x1,3, mais chaque attaque coûte 1/10 des PV.',1.3,'held'],
 grelot:['Grelot Écho',0,'À tenir. Rend 1/8 des dégâts infligés.',8,'held'],
 charbon:['Charbon',0,'À tenir. Attaques FEU x1,2.','FEU','held'],eaumystique:['Eau Mystique',0,'À tenir. Attaques EAU x1,2.','EAU','held'],grainemiracle:['Graine Miracle',0,'À tenir. Attaques PLANTE x1,2.','PLA','held'],aimant:['Aimant',0,'À tenir. Attaques ÉLEC x1,2.','ELE','held'],
 pierredure:['Pierre Dure',0,'À tenir. Attaques ROCHE x1,2.','ROC','held'],encensnoir:['Encens Noir',0,'À tenir. Attaques OMBRE x1,2.','OMB','held'],poudretoile:['Poudre d\'Étoile',0,'À tenir. Attaques LUMIÈRE x1,2.','LUM','held'],mouchoir:['Mouchoir Soie',0,'À tenir. Attaques NORMAL x1,2.','NOR','held']};
// Objets tenus : un renforçateur par type, objets rares (missions, trouvailles) ; ordre d'affichage du sac ; prix de revente
const BOOST={FEU:'charbon',EAU:'eaumystique',PLA:'grainemiracle',ELE:'aimant',ROC:'pierredure',OMB:'encensnoir',LUM:'poudretoile',NOR:'mouchoir'},RARE=['miettes','griffe','grelot','amulette','orbe','ruban'];
const CATO=['heal','revive','cure','pp','treat','evo','ball','repel','held','quest'],sellOf=k=>IT[k][1]?IT[k][1]>>1:IT[k][4]==='held'?(TY[IT[k][3]]?500:900):0;

// =====================================================================
const MS={};for(const[t,k]of Object.entries(BOOST))ICO[k]=icon(GEM,{c:TY[t][1],C:mix(TY[t][1],C.ink,.4)});
// SPRITES DE CRÉATURES — pixel art dessiné à la main (projet libre Tuxemon, CC BY-SA, voir CREDITS.md) :
// face et dos 64x64 affichés en x1 ou x2 (pixels entiers), icônes de menu 24x24 (2 images) affichées en x2.
/*@PIXB@*/
/*@ART@*/
const PIMG={};const PIXREADY=Promise.all(Object.entries(PIXB).flatMap(([id,o])=>['f','b','i'].map(sz=>new Promise(r=>{const im=new Image();im.onload=()=>{(PIMG[id]||(PIMG[id]={}))[sz]=im;r()};im.onerror=r;im.src='data:image/png;base64,'+o[sz]}))));
function monSpr(id,back,N=48,sh,fr=0){const key=id+(back?'b':'f')+N+(sh?'*':'')+fr;if(MS[key])return MS[key];const P=PIMG[id]||{};let c;
 if(N<=48)c=mkc(48,48,g=>{if(P.i)g.drawImage(P.i,fr*24,0,24,24,0,0,48,48)});
 else{const k=Math.max(1,Math.floor(N/64)),im=back?P.b:P.f;c=mkc(N,N,g=>{if(im)g.drawImage(im,0,0,64,64,(N-64*k)>>1,N-64*k,64*k,64*k)})}
 return MS[key]=sh?chroma(c):c}
// Créature dans le monde (compagnon, rencontres fixes) : dos vers le haut, face retournée vers la droite
function monOW(id,d,sh){if(d===1)return monSpr(id,1,64,sh);if(d!==3)return monSpr(id,0,64,sh);const k=id+'R'+(sh?'*':'');return MS[k]||(MS[k]=mkc(64,64,g=>{g.translate(64,0);g.scale(-1,1);g.drawImage(monSpr(id,0,64,sh),0,0)}))}
// Chromatique : rotation de teinte (créatures rares, 1 chance sur 256)
function chroma(c){const g=c.getContext('2d'),d=g.getImageData(0,0,c.width,c.height),a=d.data;for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;let r=a[i]/255,gg=a[i+1]/255,b=a[i+2]/255;const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),l=(mx+mn)/2,dd=mx-mn;if(dd<.06)continue;
  const s2=dd/(1-Math.abs(2*l-1));let h=mx===r?((gg-b)/dd)%6:mx===gg?(b-r)/dd+2:(r-gg)/dd+4;h=(h/6+1.42)%1;const q=(1-Math.abs(2*l-1))*s2,x=q*(1-Math.abs((h*6)%2-1)),m=l-q/2,k=h*6|0,rgb=[[q,x,0],[x,q,0],[0,q,x],[0,x,q],[x,0,q],[q,0,x]][k%6];a[i]=(rgb[0]+m)*255;a[i+1]=(rgb[1]+m)*255;a[i+2]=(rgb[2]+m)*255}
 g.putImageData(d,0,0);return c}

// =====================================================================
// TUILES & CONSTRUCTION DES CARTES (couche statique + avant-plan + tuiles animées)
// =====================================================================
const SOLID=new Set('T~RBYGWn#SoXC^LbkxlZhwJQ@'),SC={};
function shapeSpr(key,w,h,mark,pal){if(SC[key])return SC[key];const g=[...Array(h)].map(()=>Array(w).fill(0));mark(g);const src=g.map(r=>r.slice());
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(!src[y][x]&&[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>(src[y+b]?.[x+a]||0)>0))g[y][x]=9;
 const o=(x,y)=>g[y]?.[x]===9,out=g.map(r=>r.slice());
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const v=g[y][x];if(v===1){if(o(x+1,y)||o(x,y+1))out[y][x]=5;else if(o(x-1,y)||o(x,y-1))out[y][x]=4;else if((x-w*.35)**2+(y-h*.28)**2<(w*.17)**2)out[y][x]=6;else if(x+y*1.3>(w+h)*.62||(x*7+y*13)%11===0)out[y][x]=3}if(v===2&&o(x+1,y))out[y][x]=7}
 return SC[key]=mkc(w,h,c=>{for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(out[y][x])R(c,pal[out[y][x]],x,y)})}
function treeSpr(kind,v){return shapeSpr('t'+kind+v,16,24,g=>{const blob=(cx,cy,rr)=>{for(let y=0;y<24;y++)for(let x=0;x<16;x++)if((x+.5-cx)**2+(y+.5-cy)**2<=rr*rr)g[y][x]=1};
 if(kind==='pine'){for(let t=0;t<3;t++){const top=1+t*5;for(let yy=0;yy<8;yy++){const hw=1+yy*.8+t*.5;for(let x=0;x<16;x++)if(Math.abs(x+.5-8)<=hw&&top+yy<=18)g[top+yy][x]=1}}}
 else{const r=seed('t'+v);blob(8,9.5,6.4);blob(4.8+r(),12.2,4.3);blob(11.2-r(),12.2,4.3);blob(7.5+r()*1.5,5,4.4);if(v===2)blob(8,3.5,3.5)}
 for(let y=17;y<23;y++)for(let x=6;x<10;x++)if(!g[y][x])g[y][x]=2;g[22][5]=g[22][10]=2},
 kind==='pine'?{1:'#2f7a4a',3:'#24603d',4:'#46985a',5:'#1b4c32',6:'#6cbf72',2:'#6a442a',7:'#4a2e1c',9:'#11301f'}:{1:'#3f9b47',3:'#2d7a3b',4:'#5cbd55',5:'#226334',6:'#8ad86c',2:'#7a4f2e',7:'#55361f',9:'#173f27'})}
const rockSpr=v=>shapeSpr('r'+v,16,16,g=>{for(const[cx,cy,rr]of[[8,10,5.6],[5,11.5,3.8],[11,11.5,3.8],[7+v,7,3.6]])for(let y=0;y<16;y++)for(let x=0;x<16;x++)if((x+.5-cx)**2+(y+.5-cy)**2<=rr*rr)g[y][x]=1},{1:'#8d8a9a',3:'#6e6a7c',4:'#b4b2c0',5:'#55516a',6:'#d6d4e0',9:'#2e2a3e'});
const BRAMBLE=shapeSpr('bram',16,16,g=>{for(const[cx,cy,rr]of[[8,9,6],[4.5,10.5,4],[11.5,10.5,4],[7,5.5,3.6],[10.5,6,3]])for(let y=0;y<16;y++)for(let x=0;x<16;x++)if((x+.5-cx)**2+(y+.5-cy)**2<=rr*rr)g[y][x]=1;for(const[x,y]of[[3,7],[12,6],[6,3],[9,12],[13,10],[2,11]])g[y][x]=2},{1:'#3a7a3a',3:'#2a5e30',4:'#5a9a48',5:'#1e4a26',6:'#7ab85a',2:'#9a3a6a',7:'#6a2a4a',9:'#12301a'});
const CRACKED=(()=>{const c=mkc(16,16,g=>{g.drawImage(shapeSpr('crk',16,16,g=>{for(const[cx,cy,rr]of[[8,9.5,6.4],[5,11,4.4],[11,11,4.4],[8,5.5,4.4]])for(let y=0;y<16;y++)for(let x=0;x<16;x++)if((x+.5-cx)**2+(y+.5-cy)**2<=rr*rr)g[y][x]=1},{1:'#a08a78',3:'#86705e',4:'#bca694',5:'#6a5646',6:'#d8c6b4',9:'#3a2a22'}),0,0);
 for(const[x,y]of[[8,3],[7,4],[7,5],[8,6],[9,7],[8,8],[7,9],[6,10],[9,9],[10,10],[11,11],[5,11],[4,12]])R(g,'#3a2a22',x,y)});return c})();
const LAMP=icon(["................",".....oooooo.....","....oyyyyyyo....","....oywwyyyo....","....oyyyyyyo....",".....oooooo.....","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","......okko......","....oooooooo....","....okkkkkko....","....oooooooo....","................"]);
const SIGN=icon(["................","................",".oooooooooooooo.",".oyyyyyyyyyyyyo.",".onnnnnnnnnnnno.",".onNNNNNnNNNnno.",".onnnnnnnnnnnno.",".onNNNNnNNNNnno.",".oNNNNNNNNNNNNo.",".oooooooooooooo.","......onNo......","......onNo......","......onNo......","......onNo......",".....oonNoo.....","................"],{y:'#d8a06a'});
function grassFrames(cs){return[0,1].map(f=>mkc(16,16,g=>{for(const[bx,by]of[[3,7],[9,6],[14,7],[1,15],[6,15],[12,14]]){R(g,cs.dk,bx-3,by+1,7,1);[-2,0,2].forEach((o,i)=>{const hh=i===1?6:4,sw=f?(o<=0?1:0):(o<0?-1:o>0?1:0);for(let k=0;k<hh;k++){const x=bx+o+(k>=hh-2?sw:0),y=by-k;R(g,k===hh-1?cs.hi:k>=hh-3?cs.lt:cs.md,x,y);if(k<hh-1)R(g,cs.dk,x-1,y)}})}}))}
const TG=grassFrames({hi:'#b6ec7a',lt:'#7fd05a',md:'#4f9e3f',dk:'#2f6e30'}),TV=grassFrames({hi:'#ffb070',lt:'#d8743a',md:'#9a4a2a',dk:'#5a2a1e'}),TCV=grassFrames({hi:'#a8b0d0',lt:'#7e84a8',md:'#5a5e7e',dk:'#363850'});
const tp=(g,ox,oy)=>(c,a,b,w=1,h=1)=>{if(a<0){w+=a;a=0}if(b<0){h+=b;b=0}if(a+w>16)w=16-a;if(b+h>16)h=16-b;if(w>0&&h>0){g.fillStyle=c;g.fillRect(ox+a,oy+b,w,h)}};
const RC={R:'#d2524a',B:'#4a78d0',Y:'#d9a63a',G:'#46a06e',A:'#5a9ac8'};
const KC={aM:'#5c566e',aD:'#4a445c',aL:'#726c88',rM:'#3e3852',rD:'#2e2a40',rL:'#5a5474',rDD:'#1a1626',lL:'#7ad8e8'};
function ground(g,M,at,x,y){const ch=at(x,y),p=tp(g,x*16,y*16),h=HSH(x,y),a=2+(h>>>5)%11,b=2+(h>>>9)%11,a2=1+(h>>>13)%13,b2=1+(h>>>17)%13,v=(h>>>21)%12;
 if('bkxl'.includes(ch))return ground(g,M,(xx,yy)=>xx===x&&yy===y?M.under||'.':at(xx,yy),x,y);
 if('.fTSo#,'.includes(ch)){if(ch===','){p(K.tg,0,0,16,16);p('#45903a',a,b,3,1);p('#5aa846',a2,b2,2,1)}else{p(h%5?K.gM:K.gM2,0,0,16,16);
   if(v<3){p(K.gD,a,b+1);p(K.gD,a+2,b+1);p(K.gD,a+1,b+2);p(K.gL,a,b);p(K.gL,a+2,b)}else if(v===3){p(K.gL,a,b,3,1);p(K.gL,a+1,b+1,2,1)}else if(v===4){for(const[i,j]of[[1,0],[0,1],[2,1],[1,2]])p('#ffffff',a+i,b+j);p(C.gold,a+1,b+1)}else if(v===5){p('#8d8a9a',a,b,3,2);p('#c4c2cc',a,b,2,1);p(K.gD,a,b+2,3,1)}else if(v<8){p(K.gD,a,b,1,2);p(K.gD,a2,b2,1,2);p(K.gL,a2+1,b2)}else p(K.gD,a,b)}
  if(ch==='f')for(const[fx,fy,c]of[[2,2,'#e8484f'],[9,3,'#ffffff'],[5,9,C.gold],[12,10,'#e8484f'],[1,12,'#ffffff']].slice(0,3+h%3)){p(K.gD,fx,fy+3,3,1);for(const[i,j]of[[1,0],[0,1],[2,1],[1,2]])p(c,fx+i,fy+j);p(c==='#ffffff'?C.gold:'#fff3b0',fx+1,fy+1)}
  return}
 if(ch==='='){p(K.pM,0,0,16,16);p(K.pD,a,b,2,1);p(K.pL,a2,b2,2,1);if(v<4)p(K.pD,b2,a2);const pl=c=>'=DE'.includes(c),T_=!pl(at(x,y-1)),B_=!pl(at(x,y+1)),L_=!pl(at(x-1,y)),R_=!pl(at(x+1,y));
  if(T_){p(K.gM,0,0,16,2);for(let i=0;i<16;i+=4)p(K.gM,i+((h>>>i)&1)*2,2,2,1);p(K.pD,0,3,16,1)}if(B_){p(K.gM,0,14,16,2);for(let i=0;i<16;i+=4)p(K.gM,i+((h>>>i+1)&1)*2,13,2,1);p(K.pL,0,12,16,1)}
  if(L_){p(K.gM,0,0,2,16);for(let i=0;i<16;i+=4)p(K.gM,2,i+((h>>>i+2)&1)*2,1,2);p(K.pD,3,0,1,16)}if(R_){p(K.gM,14,0,2,16);for(let i=0;i<16;i+=4)p(K.gM,13,i+((h>>>i+3)&1)*2,1,2);p(K.pL,12,0,1,16)}
  if(!T_&&!L_&&!pl(at(x-1,y-1)))p(K.gM,0,0,2,2);if(!T_&&!R_&&!pl(at(x+1,y-1)))p(K.gM,14,0,2,2);if(!B_&&!L_&&!pl(at(x-1,y+1)))p(K.gM,0,14,2,2);if(!B_&&!R_&&!pl(at(x+1,y+1)))p(K.gM,14,14,2,2);return}
 if(ch==='H'){const wt=c=>c==='~'||c==='H',hz=wt(at(x-1,y))||wt(at(x+1,y))||at(x-1,y)==='H'||at(x+1,y)==='H',vt=at(x,y-1)==='H'||at(x,y+1)==='H';p(K.wM,0,0,16,16);
  if(vt&&!hz){p('#6b4a2e',2,0,12,16);for(let i=0;i<16;i+=4){p('#b8844e',3,i,10,3);p('#d8a46a',3,i,10,1)}p('#4a2e1c',1,0,1,16);p('#4a2e1c',14,0,1,16)}
  else{p('#6b4a2e',0,2,16,12);for(let i=0;i<16;i+=4){p('#b8844e',i,3,3,10);p('#d8a46a',i,3,1,10)}if(!wt(at(x,y-1))||at(x,y-1)!=='~'){}p('#4a2e1c',0,1,16,1);p('#4a2e1c',0,14,16,1);p('#8a5a34',0,2,16,1)}return}
 if(ch==='~'){const bk=M.floor?'#8a8478':K.bank,wt=c=>c==='~'||c==='H',T_=!wt(at(x,y-1)),B_=!wt(at(x,y+1)),L_=!wt(at(x-1,y)),R_=!wt(at(x+1,y));p(K.wM,0,0,16,16);p(K.wD,a,b,4,1);p(K.wD,a2,b2,3,1);
  if(!T_&&!B_&&!L_&&!R_&&v===0){p('#2f7a3a',a,b,5,3);p('#4fae4a',a,b,4,1);p('#f4a0c0',a+2,b+1)}
  if(T_){p(K.wD,0,2,16,2);p(bk,0,0,16,2)}if(B_){p(K.wL,0,13,16,1);p(bk,0,14,16,2)}if(L_){p(K.wD,2,0,1,16);p(bk,0,0,2,16)}if(R_){p(K.wL,13,0,1,16);p(bk,14,0,2,16)}return}
 if(ch==='L'){p(K.lM,0,0,16,16);p(K.lL,a,b,3,2);p(K.lL,a2,b2,2,1);p(K.lD,b2,a2,2,1);[[0,-1,[0,0,16,2],[0,2,16,1]],[0,1,[0,14,16,2],[0,13,16,1]],[-1,0,[0,0,2,16],[2,0,1,16]],[1,0,[14,0,2,16],[13,0,1,16]]].forEach(([dx,dy,o,i])=>{if(at(x+dx,y+dy)!=='L'){p(K.rDD,...o);p(K.lD,...i)}});return}
 if(ch==='g'||ch==='v'){const k=M.cave?KC:K;p(ch==='v'?(M.cave?'#4a5a5a':'#7e6658'):k.aM,0,0,16,16);p(k.aD,a,b,3,1);p(k.aD,a+2,b+1,1,2);p(k.aL,a2,b2,2,1);if(v===0)p(k.lL,b2,a2);if(v===1)p(k.aL,a,b2);return}
 if(ch==='^'){const rk=c=>c==='^',K2=M.cave?KC:K;if(!rk(at(x,y+1))){p(K2.rM,0,0,16,16);for(const vx of[2,7,12])p(K2.rD,vx+((h>>>vx)&1),1,1,13);p(K2.rL,h%3+3,3,2,4);p(K2.rDD,0,14,16,2);p(K2.rL,a,12,2,1);if(M.cave&&v<2)p(KC.lL,a,b%8+3,2,2)}else{p(M.cave?'#2a2638':'#6c544c',0,0,16,16);p(K2.rM,a,b,4,2);p(K2.rL,a2,b2,3,1);p(K2.rD,b,a2,2,1)}
  if(!rk(at(x,y-1))){p(K2.rL,0,0,16,2);p(M.cave?'#6a6488':'#9a8076',0,0,16,1)}if(!rk(at(x-1,y)))p(K2.rDD,0,0,1,16);if(!rk(at(x+1,y)))p(K2.rDD,15,0,1,16);return}
 if(RC[ch]){const rc=RC[ch],sh=mix(rc,C.ink,.3),dd=mix(rc,C.ink,.6),lt=mix(rc,'#ffffff',.3),same=c=>c===ch;p(rc,0,0,16,16);
  for(let r=0;r<4;r++){const yy=r*4;p(sh,0,yy+3,16,1);for(let i=(r%2)*2-4;i<16;i+=4){p(sh,i,yy,1,3);p(lt,i+1,yy,2,1)}}
  if(!same(at(x,y-1))){p(lt,0,0,16,2);p(dd,0,0,16,1)}if(!same(at(x,y+1))){p(sh,0,12,16,2);p(dd,0,14,16,2)}if(!same(at(x-1,y)))p(dd,0,0,1,16);if(!same(at(x+1,y)))p(dd,15,0,1,16);return}
 if('WnD'.includes(ch)){const wl=c=>'WnD'.includes(c);p('#f2e6c9',0,0,16,16);p('#e2d1ad',0,4,16,1);p('#e2d1ad',0,9,16,1);if(RC[at(x,y-1)])p('#c9b48c',0,0,16,3);
  p('#a89a8a',0,13,16,3);p('#7e7062',0,13,16,1);p('#7e7062',(h%4)*3+1,14,1,2);p('#7e7062',(h%4)*3+8,14,1,2);if(!wl(at(x-1,y)))p('#c4ae86',0,0,2,13);if(!wl(at(x+1,y)))p('#c4ae86',14,0,2,13);
  if(ch==='n'){p('#6b4e34',3,2,10,9);p('#9fd6f5',4,3,8,7);p('#c8ecff',4,3,8,2);p('#ffffff',5,4,2,1);p('#6b4e34',7,3,1,7);p('#6b4e34',4,6,8,1);p('#d8c8a6',2,11,12,1);if(h%2){p('#7a4e2a',3,12,10,1);p('#e8484f',4,11);p(C.gold,7,11);p('#e8484f',10,11);p(K.gD,5,11);p(K.gD,9,11)}}
  if(ch==='D'){p('#4a2e1c',3,2,10,13);p('#4a2e1c',4,1,8,1);p('#9a6234',4,2,8,13);p('#b8804c',4,2,8,1);p('#7a4a24',6,3,1,12);p('#7a4a24',9,3,1,12);p(C.gold,10,8,1,2);p('#c8b8a0',2,15,12,1)}return}
 const floorP=()=>{if(M.floor==='tech'){p('#3a3352',0,0,16,16);p('#2e2844',0,0,16,1);p('#2e2844',0,0,1,16);p('#463e62',1,1,14,1);if((x+y)%3===0){p('#5ad0e0',7,7,2,2);p('#2e7a8a',6,7,1,2)}}
  else if(M.floor==='stone'){p('#d6cdbf',0,0,16,16);p('#cbc2b3',0,0,8,8);p('#cbc2b3',8,8,8,8);p('#a89e90',0,15,16,1);p('#a89e90',15,0,1,16);p('#a89e90',7,0,1,16);p('#a89e90',0,7,16,1);p('#ece6dc',1,1,2,1);p('#ece6dc',9,9,2,1)}
  else{p('#dcc39b',0,0,16,16);for(let r=0;r<4;r++){p('#c4a67c',0,r*4+3,16,1);p('#c4a67c',((h>>>r*4)%12)+2,r*4,1,3);p('#e8d4b0',((h>>>r*4+2)%10)+3,r*4,3,1)}}
  if('XC'.includes(at(x,y-1)))p('rgba(40,28,70,.22)',0,0,16,3)};
 if(ch==='F'){floorP();return}
 if(ch==='E'&&M.cave){p(KC.aM,0,0,16,16);p('#1a1626',2,0,12,16);for(let i=0;i<4;i++)p(i%2?'#2e2a40':'#3e3852',3,i*4,10,2);return}
 if(ch==='E'){floorP();p('#8a2028',1,2,14,12);p('#b8343e',2,3,12,10);p(C.gold,3,4,10,1);p(C.gold,3,11,10,1);return}
 if(ch==='r'){p('#b8343e',0,0,16,16);p('#a42c36',0,(h%4)*4+1,16,1);if(at(x-1,y)!=='r'){p('#7a1c26',0,0,1,16);p(C.gold,1,0,1,16)}if(at(x+1,y)!=='r'){p('#7a1c26',15,0,1,16);p(C.gold,14,0,1,16)}if(at(x,y-1)==='X')p('rgba(40,28,70,.22)',0,0,16,3);return}
 if(ch==='Z'){floorP();return}
 if(ch==='@'){const K2=K;p(K2.rM,0,0,16,16);p(K2.rL,0,0,16,2);p('#2a1e1c',3,3,10,13);p('#4a3a34',4,3,8,1);pell(g,x*16+8,y*16+7,3,3,f()?.balance?C.gold:'#8a7a6a');p('#1a1410',7,6,2,2);p(K2.rDD,0,14,16,2);return}
 if(ch==='h'){floorP();p('#2a2230',1,1,14,14);p('#140e18',3,3,10,10);p('#3e3446',1,1,14,2);p('#5a5048',1,13,14,2);p('#0a060c',5,6,6,5);return}
 if(ch==='u'){floorP();p('#6e695f',1,1,14,14);p('#8a8478',2,2,12,4);p('#a8a296',3,2,6,1);p('#5a5550',2,12,12,2);return}
 if(ch==='w'){p(K.wD,0,0,16,16);p('#2f66b0',0,4,16,8);for(let i=0;i<16;i+=4)p('#3a6aa0',i,5,3,6);p(K.wM,a,b,3,1);return}
 if(ch==='X'){if(at(x,y+1)!=='X'){if(M.floor==='tech'){p('#2a2440',0,0,16,16);p('#3a3256',1,1,14,9);p('#4a4070',1,1,14,1);p('#5ad0e0',2,11,12,1);p('#1e1a30',0,13,16,3)}else if(M.floor==='stone'){p('#8a8478',0,0,16,16);for(let r=0;r<3;r++){p('#6e695f',0,r*4+3,16,1);for(let i=(r%2)*4;i<16;i+=8)p('#6e695f',i,r*4,1,3);p('#a29c90',(r%2)*4+1,r*4,3,1)}p('#4a463f',0,12,16,4);p('#6e695f',0,12,16,1)}
   else{p('#6e5b8f',0,0,16,16);for(let i=0;i<16;i+=4)p('#7a679b',i,0,2,10);p('#4c3f66',0,10,16,2);p('#d8c8a0',0,12,16,1);p('#3b3152',0,13,16,3)}}else{p('#2e2645',0,0,16,16);p('#3b3152',0,15,16,1)}return}
 if(ch==='C'){if(M.cstyle==='stele'){p(KC.aM,0,0,16,16);p(KC.aD,a,b,3,1);p('rgba(10,8,20,.35)',2,13,13,3);p('#3a3450',3,1,10,13);p('#6a6488',4,2,8,11);p('#8a84a8',4,2,8,1);for(let i=0;i<4;i++)p('#3a3450',5,4+i*2,(h>>i&3)+3,1);p(KC.lL,7,12,2,1);return}
  if(M.cstyle==='valve'){floorP();p('rgba(20,24,40,.3)',2,13,13,3);p('#5a6a7a',6,8,4,7);p('#7a8a9a',6,8,2,7);p(C.ink,2,2,12,12);p('#c8503a',3,3,10,10);p('#e8784a',4,4,8,2);p(C.ink,7,3,2,10);p(C.ink,3,7,10,2);p('#ffd08a',7,7,2,2);return}
  if(M.cstyle==='tech'){floorP();p('rgba(10,8,24,.35)',1,13,14,3);p('#1e1a30',1,3,14,11);p('#3a3256',2,4,12,9);p('#14303a',3,5,10,5);p('#5ad0e0',4,6,(h%5)+3,1);p('#5ad0e0',4,8,(h>>3)%6+2,1);p('#e84a8a',11,11,2,1);return}
  if(M.cstyle==='statue'){floorP();p('rgba(30,24,40,.25)',2,13,13,3);p('#6e695f',3,10,10,5);p('#a8a296',3,10,10,1);p('#5a5550',3,14,10,1);p('#5a5550',4,3,8,7);p('#8a8478',5,3,6,6);p('#a8a296',5,3,4,2);p(C.gold,7,5,2,2);return}
  if(at(x,y-1)==='X'){p('#4a2e1c',0,0,16,16);p('#7a4e2a',1,1,14,14);const BK=['#e8484f','#4d8fe6','#f6c445','#4cc46a','#9a5ad0','#f08a3a'];for(let s=0;s<3;s++){const yy=1+s*5;for(let i=1;i<15;i+=2){const hh=3+((h>>>(i+s*3))&1);p(BK[(h>>>(i*2+s))%6],i,yy+4-hh,2,hh);p('rgba(0,0,0,.18)',i+1,yy+4-hh,1,hh)}p('#4a2e1c',1,yy+4,14,1)}return}
  floorP();p('rgba(40,28,70,.22)',2,13,13,3);p('#5a3a22',1,4,14,10);p('#c8925a',1,3,14,7);p('#dcae74',1,3,14,1);p('#a8723e',1,9,14,2);p('#4a2e1c',2,12,2,3);p('#4a2e1c',12,12,2,3);return}
 p(K.gM,0,0,16,16)}
/*@WORLD@*/

// =====================================================================
// ÉTAT, SAUVEGARDE & CYCLE JOUR/NUIT
// =====================================================================
let G=null,mode='load',busy=false,B=null,move=null,lastBump=0,steps=0,AMB=[];
const ui={wz:1,wzx:0,wzy:0,text:null,menus:[],panel:null,dim:null,fade:1,flash:0,flashC:'#ffffff',banner:null,evo:null,wipe:0,vs:null,toast:null,pop:null,shake:0,note:null,emo:[],lb:0,wfx:[],badge:null,ring:null,slide:0};
const DX=[0,0,-1,1],DY=[1,-1,0,0],OPP=[1,0,3,2];
const xpFor=l=>Math.floor(.6*l**3);
function st(m){const b=SP[m.sp].bs,l=m.lv,f=v=>Math.floor(v*2*l/100)+5;return{hp:Math.floor(b[0]*2*l/100)+l+10,atk:f(b[1]),def:f(b[2]),spd:f(b[3])}}
function mon(sp,lv,o={}){const m={sp,lv,exp:xpFor(lv),moves:[],st:null};for(const[l,mv]of SP[sp].learn)if(l<=lv&&!m.moves.includes(mv)){m.moves.push(mv);if(m.moves.length>4)m.moves.shift()}
 if(o.moves)m.moves=o.moves.slice();m.pp=m.moves.map(id=>MV[id].pp);m.hp=st(m).hp;if(o.wild&&Math.random()<(G?.keys?.charme?3:1)/256)m.sh=1;
 m.aff=o.aff??70;m.item=o.item||(o.wild&&Math.random()<.08?(Math.random()<.5?'baiesoin':BOOST[SP[sp].t]):null);return m}
const nm=m=>SP[m.sp].name,f=()=>G.flags,alive=m=>m.hp>0,fullHeal=m=>{m.hp=st(m).hp;m.st=null;m.slp=0;m.pp=m.moves.map(id=>MV[id].pp)},healAll=()=>G.party.forEach(fullHeal);
const newGame=()=>({v:6,map:'bourg',x:5,y:6,dir:0,party:[],box:[],bag:{potion:1},money:500,flags:{},heal:['bourg',5,6],t:70,dex:{},keys:{},repel:0,play:0,opt:{snd:1}});
const SK='pixemon-eclipse-v1',SLOTK=s=>s>1?SK+'-'+s:SK,lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};let SLOT=Math.min(3,Math.max(1,+lsGet('pixemon-slot')||1));
// Remet à niveau une sauvegarde (y compris celles de la version précédente) : PP, statuts, Pixédex, horloge…
function normalize(g){if(!g||!Array.isArray(g.party)||!g.flags)return null;g.box??=[];g.bag??={};g.party=g.party.filter(m=>m&&SP[m.sp]);g.box=g.box.filter(m=>m&&SP[m.sp]);if(!MAPS[g.map]){g.map='bourg';g.x=8;g.y=8}g.dex??={};for(const k in g.dex)if(!SP[k])delete g.dex[k];g.keys??={};g.repel??=0;g.t??=70;g.play??=0;g.opt??={snd:1};const F=g.flags;
 for(const m of[...g.party,...g.box]){m.moves=m.moves.filter(id=>MV[id]);if(!m.moves.length)m.moves=['charge'];if(!m.pp||m.pp.length!==m.moves.length)m.pp=m.moves.map(id=>MV[id].pp);m.st??=null;m.aff??=Math.min(200,70+m.lv*3);m.item??=null;g.dex[m.sp]=2}
 if(F.intro==null){F.intro=3;F.intro3=F.hSac=F.hCarte=F.hCap=1}
 if(!g.v){if(F.starter)g.keys.dex=1;if(F.boss){F.eclipse=1;F.r2=1}delete F.legend;g.v=3}
 for(const m of[...g.party,...g.box]){if(m.sp==='solarion')F.legS=1;if(m.sp==='nocturion')F.legN=1;if(m.sp==='crepuscel')F.legC=1;if(m.sp==='presagelle')F.legP=1;if(m.sp==='heliote')F.legH=1;if(m.sp==='seleniote')F.legL=1}
 for(const k in g.bag)if(!IT[k])delete g.bag[k];if(F.badge&&!g.keys.bracelet){g.keys.bracelet=1;g.brRetro=1}if(g.v<4){g.wn=1;g.v=4}if(g.v<5){g.wn=1;g.v=5}if(g.v<6){g.wn=1;g.v=6}return g}
function save(){try{const K=SLOTK(SLOT),s=JSON.stringify(G),o=localStorage.getItem(K);if(o&&o!==s)localStorage.setItem(K+'-bak',o);localStorage.setItem(K,s);localStorage.setItem('pixemon-slot',SLOT);G.lastSave=Date.now();ui.toast={t0:now()};return true}catch(e){return false}}
function load(sl=SLOT){for(const k of[SLOTK(sl),SLOTK(sl)+'-bak']){try{const g=normalize(JSON.parse(localStorage.getItem(k)));if(g)return g}catch(e){}}return null}
setInterval(()=>{if(G&&mode==='world'&&!busy&&!ui.menus.length&&Date.now()-(G.lastSave||0)>90000)save()},5000);
setInterval(()=>{if(G&&mode==='world'&&!busy&&mus.want&&SONG[mus.want]&&!SONG[mus.want][3]){const k=mapMus(MAPS[G.map]);if(k&&k!==mus.want)musPlay(k)}},4000);   // la musique suit le passage jour/nuit   // sauvegarde auto discrète
// Cycle d'Aurélys : le temps avance à chaque pas. Avant l'Équilibre, les nuits sont courtes ; après, jour et nuit se partagent le cycle.
const CYC=420,phaseOf=t=>{const n=f().balance?180:120,c=((t%CYC)+CYC)%CYC;return c<40?0:c<CYC-n-40?1:c<CYC-n?2:3};
const PHN=['Aube','Jour','Crépuscule','Nuit','Éclipse'];
const phase=()=>G&&(f().eclipse&&!f().balance||f().eclD!=null&&f().eclD===Math.floor(G.t/CYC))?4:G?phaseOf(G.t):1,night=()=>phase()>=3;
const dex=(sp,v)=>{if(G&&(G.dex[sp]||0)<v)G.dex[sp]=v},caught=()=>DEX.filter(k=>G.dex[k]===2).length;
// Lien : grandit en marchant en tête, en montant de niveau, en gagnant, au coin du feu ou avec une friandise (5 cœurs)
const bp=(a,v)=>v.id==='retour'?Math.max(10,Math.floor((a.aff??70)/2.5)):v.p;
// Quêtes annexes : le rêve de Théo (montrer un Lumignon), la tisane de Rosa (3 Baies Prisme), le roi des mares de Gus (dans gusTalk)
const ownSp=sp=>G.party.some(m=>m.sp===sp)||G.box.some(m=>m.sp===sp);
async function theoTalk(n){const T='Petit Théo',q=f().theoQ||0;
 if(f().starter&&q===0){f().theoQ=1;return say('Tu sais ce que je voudrais voir ? Un LUMIGNON ! Ils brillent dans les herbes de la Route 1, mais seulement la nuit… et moi, la nuit, je dois dormir. Tu m\'en montres un ?',T)}
 if(q===1&&(ownSp('lumignon')||ownSp('phalumine'))){f().theoQ=2;await say('WAOUH ! Il brille pour de vrai ! C\'est le plus beau jour de ma vie !',T);give('poudretoile');G.bag.biscuit=(G.bag.biscuit||0)+2;
  return say('Tiens, de la Poudre d\'Étoile que j\'ai trouvée dans le jardin. Et deux Biscuits d\'Aube, pour ton Lumignon ! Tu reçois Poudre d\'Étoile et Biscuit d\'Aube x2 !',T)}
 return say(n.say(),T)}
async function rosaTalk(n){const R='Mémé Rosa',q=f().rosaQ||0;await say(n.say(),R);
 if(q===0){f().rosaQ=1;return say('Dis, mon petit… Mes vieilles jambes me font souffrir. Une tisane de Baies Prisme me ferait tant de bien. Il m\'en faudrait trois. Les arbres à baies en donnent chaque jour.',R)}
 if(q===1){const nb=G.bag.baieprisme||0;if(nb<3)return say(`Trois Baies Prisme, mon petit. Tu en as ${nb}.`,R);G.bag.baieprisme-=3;f().rosaQ=2;await say('Merci, mon petit ! Avec ça, je pourrai danser au mariage de Maëlle… si elle se décide un jour.',R);
  give('ruban');return say('Tiens, le ruban de mon propre mariage. Celui qui le tient ne tombe jamais au premier coup. Tu reçois le RUBAN TÉNACITÉ !',R)}
 if(q===2)return rosaLapilune()}
// Maman : ses conseils, et RETOUR pour une créature qui t'aime vraiment (lien de 3 cœurs ou plus)
async function momTalk(n){const M='Maman';await say(n.say(),M,0,'mom');if(!f().starter)return;const ok=G.party.some(m=>bondLv(m)>=3&&!m.moves.includes('retour'));
 if(!ok){if(!f().momHint){f().momHint=1;await say('Tu sais, quand une créature t\'aime vraiment, elle peut apprendre RETOUR : une attaque qui puise sa force dans votre lien. Reviens me voir quand l\'une d\'elles sera vraiment complice avec toi !',M,0,'mom')}return}
 if(!await ask('Une de tes créatures t\'aime vraiment, ça se voit. Je peux lui apprendre RETOUR : plus votre lien est fort, plus elle frappe fort. On essaie ?',M))return;
 const j=await partyMenu('Qui doit apprendre ?');if(j<0)return;const m=G.party[j];if(bondLv(m)<3)return say(`${nm(m)} n'est pas encore assez proche de toi. Il faut au moins trois cœurs de lien.`,M,0,'mom');
 if(m.moves.includes('retour'))return say(`${nm(m)} connaît déjà Retour.`);await learn(m,'retour')}
const HEARTS=[50,100,150,200,250],BONDN=['Méfiant','Curieux','Attaché','Complice','Fidèle','Inséparable'],bondLv=m=>HEARTS.filter(v=>(m.aff||0)>=v).length,mine=m=>!!G&&G.party.includes(m),hold=(m,k)=>!!m&&m.item===k;
function bondUp(m,n){if(!m)return;if(n>0&&G?.keys?.coeur)n=Math.ceil(n*1.5);const b=bondLv(m);m.aff=Math.max(0,Math.min(255,(m.aff||0)+n));if(bondLv(m)>b&&mode==='world'&&G.party.includes(m)){ui.note={s:`Lien : ${nm(m)} ${BONDN[bondLv(m)]}`,t0:now()};
 tip('lien','Le lien grandit quand ta créature marche en tête, gagne, monte de niveau ou se repose au feu de camp. Fort, il l\'aide en combat : elle tient bon et chasse ses statuts.')}}

// =====================================================================
// SON : bruitages synthétisés + petite boîte à musique (2 voix, boucles par lieu)
// =====================================================================
let AC;const SFX={sel:[700,.035,'square'],ok:[900,.06,'square'],back:[500,.05,'square'],hit:[180,.14,'sawtooth',50],lv:[520,.28,'triangle',1040],ball:[320,.18,'square',900],bump:[110,.06,'square'],alert:[1200,.12,'square',1600],faint:[500,.4,'triangle',80],run:[400,.2,'triangle',800],grass:[260,.05,'triangle',180],cry:[340,.25,'sawtooth',520],cut:[900,.12,'sawtooth',200],splash:[600,.2,'triangle',150],st:[300,.3,'square',150],shard:[1200,.4,'triangle',2400],blip:[880,.02,'square'],door:[220,.12,'triangle',140],roar:[160,.6,'sawtooth',70]};
const VOL=k=>{const v=G?.opt?.[k];return v==null?1:v/4};
function sfx(k){try{if(!AC||!G?.opt?.snd&&mode!=='title')return;const[fq,d,ty,f2]=SFX[k],o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=ty;o.frequency.setValueAtTime(fq,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime((k==='grass'?.02:k==='blip'?.012:.05)*VOL('sv'),t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(AC.destination);o.start();o.stop(t+d)}catch(e){}}
const initAudio=()=>{try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume?.();mus.want&&musPlay(mus.want)}catch(e){}};
// Partitions : un jeton par croche ; « . » silence, « - » tenue. [tempo ms, [onde, volume, notes]…]
const SONG={
 sanct:[240,['sine',0.06,'A4 - - - E5 - - - D5 - C#5 - - - A4 - B4 - - - E5 - - - F#5 - E5 - - - - -'],['triangle',0.04,'A2 - - - - - - - F#2 - - - - - - - D2 - - - - - - - E2 - - - - - - -'],['sine',0.02,'. . . . A5 - - - . . . . F#5 - - - . . . . B5 - - - . . . . G#5 - - -']],
 nuit:[210,['triangle',0.05,'E5 - - G5 - - B5 - A5 - - - G5 - E5 - D5 - - E5 - - G5 - E5 - - - - - - -'],['triangle',0.035,'C3 - - - G3 - - - A2 - - - E3 - - - F2 - - - C3 - - - G2 - - - - - - -']],
 base:[128,['square',0.018,'E4 E4 . E4 G4 - E4 . A#4 - A4 - G4 - E4 - E4 E4 . E4 G4 - E4 . D5 - C5 - B4 - G4 -'],['triangle',0.05,'E2 . E2 . E2 . E2 . E2 . E2 . E2 . E2 . C2 . C2 . C2 . C2 . D2 . D2 . B1 . B1 .'],['sawtooth',0.008,'E3 - - - - - - - F3 - - - - - - - C3 - - - - - - - B2 - - - - - - -']],
 title:[230,['square',.022,'A4 - - C5 E5 - D5 C5 B4 - - G4 A4 - - - A4 - - C5 E5 - G5 F5 E5 - D5 - E5 - - -'],['triangle',.05,'A2 - - - E3 - - - G2 - - - D3 - - - F2 - - - C3 - - - E2 - - - E3 - - -']],
 town:[150,['square',.02,'E5 - G5 - C6 - B5 A5 G5 - E5 - D5 - C5 - F5 - A5 - G5 - E5 C5 D5 - - - . . . . E5 - G5 - C6 - B5 A5 G5 - E5 - D5 - E5 F5 G5 - E5 - D5 - B4 - C5 - - - . . . .'],['triangle',.045,'C3 . G3 . C3 . G3 . E3 . B3 . E3 . B3 . F3 . C4 . F3 . C4 . G3 . D4 . G3 . B3 . C3 . G3 . C3 . G3 . A2 . E3 . A2 . E3 . F3 . C4 . G3 . D4 . C3 . G3 . C3 . . .']],
 route:[135,['square',.02,'D5 - G5 - B5 - A5 G5 A5 - D5 - . - D5 E5 F#5 - A5 - G5 - E5 - D5 - - - . . B4 C5 D5 - G5 - B5 - A5 G5 A5 - D6 - C6 - B5 A5 G5 - F#5 - E5 - F#5 - G5 - - - . . . .'],['triangle',.045,'G2 . D3 . G2 . D3 . D3 . A3 . D3 . A3 . C3 . G3 . C3 . G3 . D3 . A3 . D3 . F#3 . G2 . D3 . G2 . D3 . F3 . C4 . F3 . C4 . C3 . G3 . D3 . A3 . G2 . D3 . G2 . . .']],
 foret:[175,['square',.018,'E5 - - B4 - - G5 - F#5 - E5 - D5 - - - E5 - - B4 - - A5 - G5 - F#5 - B4 - - - C5 - E5 - G5 - - F#5 E5 - D5 - B4 - - - A4 - C5 - E5 - D5 - E5 - - - - - - -'],['triangle',.045,'E2 - B2 - E3 - B2 - D2 - A2 - D3 - A2 - E2 - B2 - E3 - B2 - B1 - F#2 - B2 - F#2 - C2 - G2 - C3 - G2 - G1 - D2 - G2 - D2 - A1 - E2 - A2 - E2 - E2 - B2 - E3 - B2 -']],
 mont:[160,['square',.018,'D5 - . D5 F5 - E5 - D5 - C5 - A4 - - - D5 - . D5 G5 - F5 - E5 - C#5 - A4 - - - A#4 - D5 - F5 - E5 - D5 - - - A4 - - - G4 - A#4 - D5 - C#5 - D5 - - - - - - -'],['triangle',.05,'D2 . D2 . D3 . D2 . D2 . D2 . A2 . D2 . D2 . D2 . D3 . D2 . A1 . A1 . A2 . A1 . A#1 . A#1 . A#2 . A#1 . F2 . F2 . F3 . F2 . G2 . G2 . A2 . A2 . D2 . D2 . D3 . . .']],
 ecl:[200,['square',.018,'C5 - - D#5 - - G5 - F#5 - - - G5 - - - C5 - - D#5 - - G#5 - G5 - F5 - D#5 - D5 - C5 - - D#5 - - G5 - A#5 - G#5 - G5 - - - F5 - D#5 - D5 - B4 - C5 - - - - - - -'],['triangle',.05,'C2 - G2 - C3 - G2 - C2 - G2 - C3 - G2 - G#1 - D#2 - G#2 - D#2 - G1 - D2 - G2 - D2 - C2 - G2 - C3 - G2 - D#2 - A#2 - D#3 - A#2 - F2 - C3 - G2 - D3 - C2 - G2 - C3 - - -']],
 battle:[112,['square',.02,'A4 . C5 . E5 . A5 G5 F5 . E5 . D5 . E5 . A4 . C5 . E5 . A5 B5 C6 . B5 . A5 . G5 . F5 . A5 . C6 . A5 . G5 . B5 . D6 . B5 . A5 . G5 . F5 . E5 . E5 . G#5 . B5 . E5 .'],['triangle',.05,'A2 A3 A2 A3 A2 A3 A2 A3 F2 F3 F2 F3 F2 F3 F2 F3 A2 A3 A2 A3 A2 A3 A2 A3 G2 G3 G2 G3 G2 G3 G2 G3 F2 F3 F2 F3 F2 F3 F2 F3 G2 G3 G2 G3 G2 G3 G2 G3 A2 A3 A2 A3 D3 D4 D3 D4 E2 E3 E2 E3 E2 E3 E2 E3']],
 boss:[104,['square',.022,'D5 . D5 . F5 . A5 . G#5 . A5 . F5 . D5 . C5 . C5 . E5 . G5 . F5 . E5 . C5 . A4 . A#4 . D5 . F5 . A#5 . A5 . G5 . F5 . E5 . D5 . F5 . A5 . D6 . C#6 . A5 . E5 . C#5 .'],['triangle',.055,'D2 D3 D2 D3 D2 D3 D2 D3 D2 D3 D2 D3 D2 D3 D2 D3 C2 C3 C2 C3 C2 C3 C2 C3 C2 C3 C2 C3 C2 C3 C2 C3 A#1 A#2 A#1 A#2 A#1 A#2 A#1 A#2 A#1 A#2 A#1 A#2 C2 C3 C2 C3 D2 D3 D2 D3 D2 D3 D2 D3 A1 A2 A1 A2 A1 A2 C#2 C#3']],
 gym:[118,['square',.02,'D5 . A4 . D5 . F#5 . E5 . D5 . C#5 . A4 . B4 . D5 . G5 . F#5 . E5 . D5 . E5 . A4 . D5 . A4 . D5 . F#5 . A5 . G5 . F#5 . E5 . D5 . . . A4 . C#5 . D5 - - - . . . .'],['triangle',.05,'D3 D3 A2 A2 D3 D3 A2 A2 A2 A2 E3 E3 A2 A2 C#3 C#3 G2 G2 D3 D3 G2 G2 D3 D3 A2 A2 E3 E3 A2 A2 C#3 C#3 D3 D3 A2 A2 D3 D3 F#3 F#3 G2 G2 A2 A2 B2 B2 C#3 C#3 D3 . A2 . D3 . . . D3 . A2 . D3 . . .']],
 final:[100,['square',.024,'C5 . . D#5 G5 . F5 D#5 D5 . . C5 D5 . D#5 . C5 . . D#5 G5 . A#5 G#5 G5 . . F5 G5 . . . G#5 . G5 . F5 . D#5 . F5 . D#5 . D5 . C5 . D5 . D#5 . F5 . G5 . G5 - - - B4 - - -'],['triangle',.055,'C3 C3 C3 C3 G2 G2 G2 G2 G#2 G#2 G#2 G#2 G2 G2 G2 G2 C3 C3 C3 C3 G2 G2 G2 G2 G#2 G#2 A#2 A#2 C3 C3 C3 C3 F2 F2 F2 F2 C3 C3 C3 C3 A#2 A#2 A#2 A#2 G#2 G#2 G#2 G#2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2 G2']],
 ruines:[190,['square',.016,'A4 - - E5 - - D5 - C5 - - B4 - - A4 - G4 - - A4 - - B4 - C5 - - - E5 - - - A4 - - E5 - - F5 - E5 - - D5 - - C5 - B4 - - C5 - D5 - E5 - - - - - - -'],['triangle',.045,'A2 - - - E3 - - - A2 - - - E3 - - - G2 - - - D3 - - - C3 - - - E3 - - - F2 - - - C3 - - - D3 - - - A2 - - - E2 - - - B2 - - - A2 - - - - - - -']],
 win:[120,['square',.025,'C5 E5 G5 C6 - G5 C6 - - - - -'],['triangle',.05,'C3 - G3 - C3 - E3 - C3 - - -'],1],
 heal:[130,['square',.025,'C5 E5 G5 E5 C6 - - -'],['triangle',.05,'C3 - E3 - G3 - - -'],1],
 item:[110,['square',.025,'G5 A5 B5 D6 - B5 D6 - -'],['triangle',.05,'G3 - D4 - G3 - G4 - -'],1],
 badge:[125,['square',.026,'C5 C5 C5 G5 - E5 - C6 - - G5 A5 B5 C6 - - - -'],['triangle',.05,'C3 - G3 - C3 - E3 - A2 - F3 - G2 - B2 - C3 - -'],1],
 evo:[140,['square',.024,'C5 E5 G5 C6 E6 - D6 - C6 - - -'],['triangle',.05,'C3 - G3 - E3 - G3 - C3 - - -'],1]};
const NOTES={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
const hz=n=>{const m=n.match(/^([A-G]#?)(\d)$/);return 440*2**((NOTES[m[1]]+12*(+m[2]+1)-69)/12)};
const mus={k:null,want:null,step:0,next:0,gain:null,tm:null};
function musPlay(k){mus.want=k;if(!AC||!G?.opt?.snd&&mode!=='title'){musStop();return}if(mus.k===k&&mus.gain)return;musStop();const S=SONG[k];if(!S)return;mus.k=k;mus.step=0;mus.next=AC.currentTime+.05;mus.gain=AC.createGain();mus.gain.gain.value=VOL('mv');mus.gain.connect(AC.destination);
 const V=S.slice(1).filter(v=>Array.isArray(v)).map(([w,vol,n])=>[w,vol,n.split(' ')]),len=Math.max(...V.map(v=>v[2].length));
 mus.tm=setInterval(()=>{const g=mus.gain;if(!g)return;while(mus.next<AC.currentTime+.2){const i=mus.step%len,dt=S[0]/1000;if(S[3]&&mus.step>=len){musStop(k);return}
  for(const[w,vol,n]of V){const t=n[i];if(!t||t==='.'||t==='-')continue;let d=1;while(n[(i+d)%n.length]==='-'&&d<16)d++;const o=AC.createOscillator(),gg=AC.createGain();o.type=w;o.frequency.value=hz(t);const t0=mus.next,t1=t0+dt*d*.92;
   gg.gain.setValueAtTime(vol,t0);gg.gain.setValueAtTime(vol,Math.max(t0,t1-.04));gg.gain.linearRampToValueAtTime(.0001,t1);o.connect(gg).connect(g);o.start(t0);o.stop(t1+.02)}
  mus.step++;mus.next+=dt}},50)}
function musStop(only){if(only&&mus.k!==only)return;clearInterval(mus.tm);mus.tm=null;if(mus.gain){const g=mus.gain;try{g.gain.setTargetAtTime(0,AC.currentTime,.05)}catch(e){}setTimeout(()=>g.disconnect(),300)}mus.gain=null;mus.k=null;if(only&&mus.want&&mus.want!==only)musPlay(mus.want)}
async function jingle(k){const back=mus.want===k?null:mus.want;musStop();musPlay(k);await wait(SONG[k][0]*SONG[k][1][2].split(' ').length+150);if(mus.want===k){mus.want=back;if(back)musPlay(back)}}

// =====================================================================
// ENTRÉES (clavier, pad tactile, souris / toucher sur l'écran)
// =====================================================================
const held={},waiters=[];
const KM={arrowup:'up',z:'up',w:'up',arrowdown:'down',s:'down',arrowleft:'left',q:'left',a:'left',arrowright:'right',d:'right',' ':'a',enter:'a',j:'a',x:'b',escape:'b',backspace:'b',k:'b',m:'start',tab:'start'};
function down(k){initAudio();held[k]=1;press(k)}
addEventListener('keydown',e=>{const k=KM[e.key.toLowerCase()];if(!k)return;e.preventDefault();if(e.repeat){if(waiters.length&&['up','down','left','right'].includes(k))press(k);return}down(k)});
addEventListener('keyup',e=>{const k=KM[e.key.toLowerCase()];if(k)held[k]=0});
addEventListener('blur',()=>{for(const k in held)held[k]=0});
document.querySelectorAll('[data-k]').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();down(k)});['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>held[k]=0))});
// Croix tactile : on peut glisser le doigt d'une direction à l'autre sans le lever ; petite vibration à chaque appui
{const dp=document.querySelector('.dp');let cur=null;const buzz=()=>{try{navigator.vibrate?.(8)}catch(e){}};document.querySelectorAll('[data-k]').forEach(b=>b.addEventListener('pointerdown',buzz));
 if(dp){dp.addEventListener('pointerdown',e=>{cur=e.target.closest?.('[data-k]')?.dataset.k||null});
  dp.addEventListener('pointermove',e=>{if(!cur)return;const k=document.elementFromPoint(e.clientX,e.clientY)?.closest?.('[data-k]')?.dataset.k;if(k&&k!==cur&&dp.contains(document.querySelector(`[data-k="${k}"]`))){held[cur]=0;cur=k;down(k);buzz()}});
  ['pointerup','pointercancel'].forEach(v=>dp.addEventListener(v,()=>{if(cur)held[cur]=0;cur=null}))}}
const cpos=e=>{const r=cv.getBoundingClientRect(),s=W/cv.clientWidth;return{x:(e.clientX-r.left-cv.clientLeft)*s,y:(e.clientY-r.top-cv.clientTop)*s}};
const hit=(m,p)=>m.rects?m.rects.findIndex(r=>r&&p.x>=r[0]&&p.x<r[0]+r[2]&&p.y>=r[1]&&p.y<r[1]+r[3]):-1;
cv.addEventListener('pointermove',e=>{const m=ui.menus[ui.menus.length-1];if(!m)return;const i=hit(m,cpos(e));if(i>=0&&i!==m.i){m.i=i;sfx('sel')}});
cv.addEventListener('pointerdown',e=>{e.preventDefault();initAudio();const m=ui.menus[ui.menus.length-1];if(m){const i=hit(m,cpos(e));if(i>=0){m.i=i;press('a')}else if(m.cancel)press('b');return}press('a')});
function press(k){if(waiters.length){waiters.shift()(k);return}if(mode==='world'&&!busy&&!move){if(k==='a')run(interact);else if(k==='start')run(pauseMenu)}}
function key(ms){return new Promise(r=>{const w=k=>r(k);waiters.push(w);if(ms)setTimeout(()=>{const i=waiters.indexOf(w);if(i>=0){waiters.splice(i,1);r('t')}},ms)})}
async function run(fn){busy=true;try{await fn()}catch(e){console.error(e)}busy=false}
const fadeTo=(v,ms)=>tween(ui,'fade',v,ms),wipeTo=(v,ms)=>tween(ui,'wipe',v,ms,1);

// =====================================================================
// FENÊTRES, TEXTE & MENUS
// =====================================================================
function rr(x,y,w,h,c,col){X.fillStyle=col;X.fillRect(x+c,y,w-2*c,h);X.fillRect(x,y+c,w,h-2*c);if(c>2)X.fillRect(x+2,y+2,w-4,h-4)}
// Fenêtre signature : contour encre, bande violet crépuscule (biseau clair/sombre), filet blanc, papier chaud, ombre portée
function panel(x,y,w,h,o={}){x=ev(x);y=ev(y);w=ev(w);h=ev(h);rr(x+4,y+4,w,h,4,'rgba(12,8,28,.35)');rr(x,y,w,h,4,C.ink);
 rr(x+2,y+2,w-4,h-4,2,C.frame);R(X,C.frameL,x+6,y+2,w-12,2);R(X,C.frameD,x+6,y+h-4,w-12,2);rr(x+6,y+6,w-12,h-12,2,C.ink);R(X,o.fill||C.paper,x+8,y+8,w-16,h-16);R(X,'#ffffff',x+8,y+8,w-16,2);R(X,C.paper2,x+8,y+h-10,w-16,2)}
function tag(x,y,s,col=C.frame){const w=tw(s)+20;rr(x,y,w,24,2,C.ink);rr(x+2,y+2,w-4,20,2,col);R(X,mix(col,'#ffffff',.3),x+4,y+2,w-8,2);txt(s,x+10,y+19,'#ffffff',{sh:C.ink});return w}
function chip(t,x,y){const[n,c]=TY[t],w=tw(n,2,1)+12;rr(x,y,w,16,2,C.ink);R(X,c,x+2,y+2,w-4,12);R(X,mix(c,'#ffffff',.35),x+2,y+2,w-4,2);txt(n,x+6,y+13,C.ink,{mini:1});txt(n,x+6,y+12,'#ffffff',{mini:1});return w}
function bar(x,y,w,k,col,h=10){k=Math.max(0,Math.min(1,k||0));rr(x,y,w,h,2,C.ink);R(X,'#4a4266',x+2,y+2,w-4,h-4);const fw=Math.round((w-4)*k/2)*2;if(fw>0){R(X,col,x+2,y+2,fw,h-4);R(X,mix(col,'#ffffff',.45),x+2,y+2,fw,2);if(h>8)R(X,mix(col,C.ink,.25),x+2,y+h-4,fw,2)}}
const hpCol=k=>k>.5?C.green:k>.2?C.yel:C.red;
function hpBar(x,y,w,k){rr(x-26,y-2,26,14,2,C.ink);txt('PV',x-22,y+9,C.gold,{mini:1});const lo=k<=.2&&k>0&&(now()/240|0)%2;bar(x,y,w,k,lo?'#ff8a8a':hpCol(k))}
function pages(s,w=W-8){const L=wrap(s,w-44),P=[];for(let i=0;i<L.length;i+=2)P.push(L.slice(i,i+2));return P}
const WHO={'Caïus':'caius','Admin Caïus':'caius','Grand-mère Ysolde':'ysolde',Orane:'orane','Championne Orane':'orane','Pêcheur Jo':'fisher',Lou:'sis',Papa:'dad','Prof. Saule':'prof',Kael:'rival',Maman:'mom','Vieux Gus':'gus','Petit Théo':'kid',Lili:'lili',Brasia:'leader','Championne Brasia':'leader',Vex:'vex','Chef Vex':'vex',Valen:'valen',Sélène:'selene','Admin Sélène':'selene',Maëlle:'maelle','Championne Maëlle':'maelle','Ermite Lumen':'lumen',Infirmière:'nurse',Vendeur:'vendor','Campeuse Sacha':'camper','Randonneur Gaspard':'mountaineer','Capitaine Loup':'captain','Mémé Rosa':'granny','Mousse Timéo':'kid','Assistante Lucie':'assistant','Garde-côte':'sailor',Mineur:'miner',Tito:'kid','Lieutenant Corvin':'grunt','Sbire Éclipse':'grunt',Ancien:'old',Randonneuse:'girl'};
const portrait=(k,talk)=>PEO[k]?.pt[talk?1:0];
async function say(s,who,auto,look){const pt=look&&PEO[look]?look:WHO[who];for(const pg of pages(s)){ui.text={s:pg,t:0,who,auto,pt,t0:ui.text?0:now()};const len=pg.join('\n').length;for(;;){const done=ui.text.t>=len,k=await key(done?(auto?(mode==='battle'&&G?.opt?.fast?450:1000):0):40);if(k==='a'||k==='b'){if(!done)ui.text.t=len;else{sfx('sel');break}}else if(k==='t'&&done&&auto)break}}ui.text=null}
const show=(s,who,w)=>ui.text={s:pages(s,w)[0],t:1e9,who,w,pt:WHO[who],t0:ui.text?0:now()};
function drawText(){const T=ui.text;if(!T)return;const k=T.t0?Math.min(1,(now()-T.t0)/140):1,w=T.w||W-8,y=H-90+ev((1-k)*12);X.globalAlpha=k;panel(4,y,w,86);
 let n=Math.floor(T.t);T.s.forEach((l,i)=>{txt(l.slice(0,Math.max(0,n)),22,y+38+i*26);n-=l.length+1});
 if(T.who){let nx=14;if(T.pt&&PEO[T.pt]){const px=10,py=y-80,talk=T.t<1e8&&T.t<T.s.join(' ').length?(now()/120|0)%2:0;rr(px,py,80,80,4,C.ink);rr(px+2,py+2,76,76,2,C.frame);R(X,'#efe6d2',px+4,py+4,72,72);R(X,mix('#efe6d2',C.frameL,.3),px+4,py+46,72,30);X.drawImage(portrait(T.pt,talk),px+4,py+4);R(X,'#ffffff55',px+4,py+4,72,1);nx=96}tag(nx,y-18,T.who)}if(n>=-1&&!T.auto)X.drawImage(ICO.down,w-26,y+66+(now()/260|0)%2*2,14,10);X.globalAlpha=1}
async function choose(opts,o={}){const cols=o.cols||1,rh=o.rh||24,w=o.w||160,rows=Math.ceil(opts.length/cols),vis=Math.min(rows,o.vis||8),h=vis*rh+20+(o.title?26:0);
 const m={opts,i:o.i||0,top:0,cols,rh,w,vis,h,x:o.x??W-w-8,y:o.y??H-98-h,title:o.title,draw:o.draw,info:o.info,infoDraw:o.infoDraw,infoShow:o.infoShow,ib:o.ib,dis:o.dis,icons:o.icons,bare:o.bare,rect:o.rect,t0:now(),press:0,cancel:o.cancel!==false,rects:[]};ui.menus.push(m);let r;
 for(;;){const k=await key(),n=opts.length;if(k==='up'){m.i=cols>1?(m.i-cols+n)%n:(m.i+n-1)%n;sfx('sel')}else if(k==='down'){m.i=cols>1?(m.i+cols)%n:(m.i+1)%n;sfx('sel')}
  else if((k==='left'||k==='right')&&cols===1&&o.jump){m.i=Math.max(0,Math.min(n-1,m.i+(k==='left'?-o.jump:o.jump)));sfx('sel')}else if(k==='left'&&cols>1){m.i=(m.i+n-1)%n;sfx('sel')}else if(k==='right'&&cols>1){m.i=(m.i+1)%n;sfx('sel')}else if(k==='a'){r=m.i;break}else if(k==='b'&&m.cancel){r=-1;break}}
 sfx(r<0?'back':'ok');if(r>=0){m.press=now();await wait(90)}ui.menus.splice(ui.menus.indexOf(m),1);return r}
async function ask(q,who){show(q,who);const r=await choose(['OUI','NON'],{w:110});ui.text=null;return r===0}
function drawMenu(m){const k=Math.min(1,(now()-m.t0)/120),dy=ev((1-k)*8),pr=m.press&&now()-m.press<90;X.globalAlpha=k;m.rects=[];
 if(m.bare){m.opts.forEach((_,i)=>{const r=m.rect(i);m.rects[i]=r;m.draw(i,r,i===m.i,pr&&i===m.i)});X.globalAlpha=1;return}
 const nrows=Math.ceil(m.opts.length/m.cols),ri=Math.floor(m.i/m.cols);if(ri<m.top)m.top=ri;if(ri>=m.top+m.vis)m.top=ri-m.vis+1;
 panel(m.x,m.y+dy,m.w,m.h);let y0=m.y+dy+10;if(m.title){txt(m.title.toUpperCase(),m.x+16,y0+17,C.mute,{sh:0});R(X,C.paper2,m.x+12,y0+22,m.w-24,2);y0+=26}
 const cw=(m.w-20)/m.cols;
 for(let r2=m.top;r2<Math.min(nrows,m.top+m.vis);r2++)for(let c=0;c<m.cols;c++){const i=r2*m.cols+c;if(i>=m.opts.length)break;const rx=ev(m.x+10+c*cw),ry=ev(y0+(r2-m.top)*m.rh),sel=i===m.i,dis=m.dis?.(i);m.rects[i]=[rx,ry,ev(cw),m.rh];
  if(sel){rr(rx,ry+1,ev(cw)-2,m.rh-2,2,pr?C.acc:C.accL);if(!pr)R(X,C.acc,rx,ry+3,2,m.rh-6);X.drawImage(ICO.cur,rx+6+(now()/280|0)%2*2,ry+m.rh/2-9,10,18)}
  let tx=rx+22;if(m.icons){X.drawImage(m.icons[i],rx+22,ry+(m.rh-16)/2,16,16);tx+=22}
  if(m.draw)m.draw(i,tx,ry,sel,pr&&sel);else txt(m.opts[i],tx,ry+m.rh/2+7,pr&&sel?'#ffffff':dis?C.mute:C.ink,{sh:pr&&sel?0:undefined})}
 if(m.top>0)txt('▲',m.x+m.w-24,m.y+dy+24,C.mute,{sh:0});if(m.top+m.vis<nrows)txt('▼',m.x+m.w-24,m.y+dy+m.h-8,C.mute,{sh:0});
 if(m.infoDraw&&m.infoShow?.(m.i)!==false){const[x,y,w,h]=m.ib;panel(x,y,w,h);m.infoDraw(m.i,x,y,w,h)}
 if(m.info){const[x,y,w,h]=m.ib||[4,H-90,W-8,86];panel(x,y,w,h);const inf=m.info(m.i);let tx=x+20,ty=y;if(inf.icon){X.drawImage(inf.icon,x+18,y+26,32,32);tx+=44}if(inf.t){chip(inf.t,x+18,y+16);ty+=26}wrap(inf.s??inf,w-(tx-x)-18).slice(0,2).forEach((l,i)=>txt(l,tx,ty+38+i*26))}
 X.globalAlpha=1}

// =====================================================================
// CARTES : deux actes, 13 lieux. Tuiles spéciales : b ronces (PLANTE), k rocher fissuré (ROCHE), x brasier (EAU), H ponton, l lampadaire, Z barrière d'énergie
// =====================================================================
const I=(x,y,it,q,id)=>({x,y,t:'ball',item:[it,q],id,cond:()=>!f()['i_'+id]});
const SH=(x,y,id)=>({x,y,t:'shard',id,cond:()=>!f()['e_'+id]});
const OB=(x,y,k,o={})=>({x,y,t:'obj',k,...o});
const TR=(id,name,team,money,pre,after,more={})=>({id,name,team,money,pre,after,...more});
const BT=(x,y,bid,bk)=>({x,y,t:'obj',k:'berry',bid,bk,fn:berryTree});
const day=()=>!night(),act2=()=>f().eclipse&&!f().balance,ecl=()=>!!G&&(act2()||f().eclD!=null&&f().eclD===Math.floor(G.t/CYC));
const MAPS={
bourg:{name:'Bourg-Lueur',bg:'plaine',amb:'day',mus:'town',edges:{n:['route1',0]},fish:[['tetardin',4,7,100]],
 rows:["TTTTTTTTT==TTTTTTTTT","TT.......==.......TT","TT.......==.......TT","TT.RRRR..==..GGGGGTT","TT.RRRR..==..GGGGGTT","TT.WnDW..==..WnDnWTT","TT...=..l==....=..TT","TT...===========..TT","TT.......==.....S.TT","TT.f.....==l......TT","TT~~~~...==...ffffTT","TT~~~~...==.......TT","TT~~~~...==...f...TT","TTTTTTTTTTTTTTTTTTTT"],
 deco:[{x:15,y:3.5,k:'potion'},{x:4,y:3,k:'chim'}],smoke:[[71,42]],hidden:[{x:17,y:10,sh:'b1'}],
 doors:{'5,5':['salon',5,6,1],'15,5':['lab',4,6,1]},signs:{'16,8':'BOURG-LUEUR\nLà où chaque aventure s\'allume.'},
 npcs:[{x:6,y:11,t:'gus',d:2,name:'Vieux Gus',fn:gusTalk,qm:()=>G.keys.rod&&(!f().gusQ&&f().badge||f().gusQ===1&&ownSp('crapaflot'))},
  {x:13,y:9,t:'kid',d:0,name:'Petit Théo',time:'j',wan:1,fn:theoTalk,qm:()=>f().starter&&(!f().theoQ||f().theoQ===1&&(ownSp('lumignon')||ownSp('phalumine'))),say:()=>["L'EAU bat le FEU, le FEU bat la PLANTE, et la PLANTE bat l'EAU ! Et la ROCHE ? Elle craint l'EAU et la PLANTE.","Tu savais ? La LUMIÈRE et l'OMBRE sont super efficaces l'une contre l'autre ! Et l'OMBRE effraie les créatures NORMAL.","Ma sœur dit que si une créature dort ou est paralysée, il faut lui donner un Total Soin. Elle sait tout, ma sœur.","Mon Piafou m'adore ! Plus on se balade ensemble, plus notre lien grandit. Avec un lien très fort, il tient bon même face à un coup fatal !","Tu as vu l'arbre à baies près de la mare ? Ses baies repoussent chaque jour. Fais-en tenir une à ta créature : elle la mangera toute seule en combat !"][(G.t>>4)%5]},
  {x:12,y:1,t:'rival',d:0,name:'Kael',cond:()=>f().balance,fn:kaelRematch},BT(17,11,'bourg','baiesoin')],
 step:async()=>{if(G.y<=1&&!f().starter){await say('Hé, petit ! Pas dans les hautes herbes sans créature ! Va d\'abord voir le Prof. Saule.','Vieux Gus');await forceStep(0);return true}}},
lab:{name:'Labo du Prof. Saule',bg:'plaine',amb:'in',dark:1,mus:'town',rows:["XXXXXXXXXX","XCCCFFCCCX","XFFFFFFFFX","XFFCCCFFFX","XFFFFFFFFX","XFFFFFFFFX","XFFFFFFFFX","XXXXEEXXXX"],
 doors:{'4,7':['bourg',15,6,0],'5,7':['bourg',15,6,0]},
 npcs:[{x:7,y:2,t:'prof',d:0,name:'Prof. Saule',cond:()=>!act2(),fn:profTalk},
  ...['flamiot','goutelin','pousseron'].map((sp,i)=>({x:3+i,y:3,t:'ball',fn:()=>pickStarter(sp),cond:()=>!f().starter||sp!==f().starter&&sp!==f().rs&&!f().gift3||sp===f().rs&&!f().kaelPick})),
  {x:2,y:5,t:'rival',d:3,name:'Kael',cond:()=>!f().rival1,say:'Pfff… Le Prof m\'a dit de te laisser choisir en premier. Dépêche-toi, je n\'ai pas toute la journée.'},
  {x:1,y:6,t:'assistant',d:3,name:'Assistante Lucie',wan:1,fn:lucieTalk,qm:()=>f().starter&&(!f().stormQ||f().stormQ===1&&ownSp('etincelot')||OBSR.some(([n])=>nObs()>=n&&!f()['ob'+n])),say:()=>f().keys?.dex?`Ton Pixédex compte ${caught()} créature${caught()>1?'s':''} capturée${caught()>1?'s':''}. Le Prof. récompense chaque palier : 4, 8, 12 et 18 !`:'Le Prof. a passé sa vie à étudier le Cycle d\'Aurélys : le jour, la nuit… et les créatures qui en dépendent.'}]},
route1:{name:'Route 1',bg:'plaine',amb:'day',mus:'route',edges:{s:['bourg',0],n:['ville',0]},enc:[['ratounet',2,4,35],['piafou',2,4,35],['pissenlou',3,5,12,'j'],['etincelot',4,6,16,'r'],['larvigne',3,4,18],['volticelle',3,5,10,'j'],['ombrelin',3,5,14,'n'],['lumignon',3,5,10,'n']],
 rows:["TTTTTTTTT==TTTTTTTTT","TT,,,,...==...,,,,TT","TT,,,,...==...,,,,TT","TT.......==.......TT","TT..TT...==..o....TT","TT..TT...==.......TT","TT,,,,,,,==,,,,,..TT","TT,,,,,,,==,,,,,..TT","TT,,,,,,,==,,,,,..TT","TT.......==.....S.TT","TTTTTT...==...TTTTTT","TT.......==.......TT","TT.,,,,,.==.,,,,,.TT","TT.,,,,,.==.,,,,,.TT","TT.,,,,,.==.,,,,,.TT","TT.......==.....TTTT","TT..f....==....fb.TT","TTTTTTTTT==TTTTTTTTT"],
 signs:{'16,9':'ROUTE 1\nNord : Cendreville · Sud : Bourg-Lueur'},
 npcs:[{x:12,y:3,t:'kid',d:2,tr:TR('leo','Gamin Léo',[['ratounet',4],['piafou',5]],120,'Nos regards se sont croisés ! Ça veut dire COMBAT !','Ouah, t\'es super fort !',{post:'Astuce : les ronces se tranchent avec une créature PLANTE dans ton équipe. Il y en a une près de l\'entrée sud !'})},
  {x:6,y:11,t:'girlkid',d:3,tr:TR('lina','Fillette Lina',[['piafou',5],['volticelle',6]],150,'Mon Volticelle est trop mignon ET trop fort !','Snif… mon Volticelle…',{post:'Les Volticelle ne sortent que le jour. La nuit, ce sont les Lumignon qui brillent dans les herbes !'})},
  I(17,5,'potion',2,'r1a'),I(2,15,'capsule',3,'r1b'),SH(17,16,'r1'),BT(17,3,'r1','baiesoin')]},
ville:{name:'Cendreville',bg:'plaine',amb:'day',mus:'town',edges:{s:['route1',0],e:['foret',0],w:['route2',0]},fish:[['tetardin',5,8,100]],
 rows:["TTTTTTTTTTTTTTTT^^^TTT","TT........S.......S.TT","TT.YYYYYY...RRRRR...TT","TT.YYYYYY...RRRRR...TT","TT.WnWDWn...WnDnW...TT","TT....=.......=.....TT","TT....=========..l..TT","TT.......==.........TT","TTBBBBB..=============","TTBBBBB..=============","TTWnDnW..==.........TT","TT.l=....==....S....TT","k==========....ff...TT","k=.ff....==.........TT","TT.......==...~~~~..TT","TT.......==...~~~~..TT","TTTTTTTTT==TTTTTTTTTTT"],
 deco:[{x:13.5,y:2.5,k:'heal'},{x:4.5,y:8.5,k:'bag'},{x:5.5,y:2.5,k:'star'}],hidden:[{x:19,y:1,sh:'v1'}],
 opens:{k:['r2','=']},doors:{'14,4':()=>center('Cendreville',['ville',14,5]),'4,10':shop,'6,4':['gym',5,8,1],'17,0':mineDoor},signs:{'18,1':'MINE DE CENDREVILLE\nPrudence : les galeries sont instables.','15,11':'CENDREVILLE\nToit rouge : Centre de Soins · Toit bleu : Boutique · Toit doré : Arène','10,1':'STATUE DE SOLARION\n« Que sa lumière veille sur la mine et sur nos foyers. »'.replace(/[«»]/g,'"')},
 npcs:[{x:19,y:7,t:'grunt',d:0,name:'Sbire Éclipse',cond:()=>!f().badge||!f().mine&&!f().rival2,say:()=>f().badge?'Personne ne passe tant que nos gars n\'ont pas fini de creuser dans la mine ! Hé hé…':'La Team Éclipse a des affaires dans la Forêt Murmure. Dégage, minus !'},OB(17,0,'mine',{fn:mineDoor}),
  {x:16,y:13,t:'girl',d:2,name:'Randonneuse',wan:1,say:()=>f().badge?"Au nord de la forêt se dresse le Mont Braise. Ses créatures FEU et ROCHE n'aiment pas l'EAU…":"Brasia utilise des créatures ROCHE. L'EAU et la PLANTE sont très efficaces contre elles ! On pêche des Têtardin dans la mare, d'ailleurs."},
  {x:6,y:14,t:'old',d:3,name:'Ancien',say:()=>f().balance?"Le jour et la nuit, enfin réconciliés… Je n'espérais plus voir ça de mon vivant.":act2?"Une éclipse qui ne finit pas… Les anciens parlaient d'un gardien de la nuit enchaîné quelque part. Je croyais que c'était un conte.":"On raconte que Solarion, le gardien de lumière, dort au sommet du Mont Braise. Et qu'il avait jadis un frère… de l'autre côté du Cycle."},
  {x:7,y:13,t:'lili',d:0,name:'Lili',fn:liliTalk,qm:()=>f().starter&&(!f().lili||f().lili===2)},
  {x:1,y:12,t:'miner',d:3,name:'Mineur',cond:()=>!f().r2,say:()=>f().badge?'L\'éboulement bloque toujours la route de l\'ouest. Même ma pioche n\'en vient pas à bout…':'Route 2 fermée ! Un éboulement bloque le passage vers le lac Miroir.'},
  {x:1,y:13,t:'miner',d:3,name:'Mineur',cond:()=>!f().r2,say:'Faudrait une créature ROCHE vraiment costaude pour dégager tout ça. Comme la Rocaroc de la championne…'}],
 enter:async()=>{if(f().eclipse&&!f().r2)await brasiaClears();else if(f().badge&&!f().mineAlert&&!f().mine&&!f().rival2)await mineAlert()},
 step:async()=>{if(G.x>=19&&(G.y===8||G.y===9)&&(!f().badge||!f().mine&&!f().rival2)){await say(f().badge?'Halte ! Personne ne passe tant que nos gars sont dans la mine ! Va donc jouer ailleurs… hé hé !':'Halte ! La forêt appartient à la Team Éclipse ! Reviens quand tu auras un badge… hé hé !','Sbire Éclipse');await forceStep(2);return true}}},
mine:{name:'Mine de Cendreville',bg:'grotte',amb:'cave',mus:'mont',cave:1,under:'g',encAll:1,
 enc:[['rocaillon',12,14,32],['ratounet',11,13,22],['rocaton',11,13,18],['magmor',13,14,10],['nocturelle',12,14,14,'n'],['ombrelin',12,13,12,'n'],['lumignon',12,13,10,'n']],
 rows:["^^^^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^gggggg^^^^^^^^^^","^^^^^^^^^gggggg^^^^^^^^^^","^^^^^^^^^^^g^^^^^^^^^^^^^","^^^^^^gggggggggggggg^^^^^","^^^^^^g^^^^gg^^^^^^g^^^^^","^^gggggg^^^gg^^^vvvggg^g^","^^gvvvvg^^^gg^^^vvvvvgxg^","^^gvvvvg^^^gg^^^gggg^g^^^",
  "^^ggg^^^^^^gg^^^^^^^^g^^^","^^^^g^^^^ggggggg^^^^^g^^^","^^^^g^^^^g^^^^^g^^^^^g^^^","^^ggggg^^g^^^^^g^^gggggg^","^^gvvvg^^g^^^^^g^^gvvvvg^","^^gggggggggggggggggggggg^","^^^^^^^^^^^gg^^^^^^^^^^^^","^^^^^^^^^^^gg^^^^^^^^^^^^","^^^^^^^^^^^EE^^^^^^^^^^^^"],
 doors:{'11,17':['ville',17,1,0],'12,17':['ville',17,1,0]},signs:{},hidden:[{x:7,y:6,it:'biscuit',q:2,id:'mh1'}],
 npcs:[{x:15,y:14,t:'grunt',d:2,tr:TR('gm1','Sbire Éclipse',[['ratounet',12],['ombrelin',13]],400,'Hé ! Cette mine est réquisitionnée par la Team Éclipse !','Pfff… On n\'est payés que pour creuser, nous…',{post:'Le chef veut des Éclats d\'Aube. Des tonnes. Pour un bracelet, qu\'il dit…'})},
  {x:9,y:12,t:'grunt',d:0,tr:TR('gm2','Sbire Éclipse',[['rocaillon',13],['magmor',13]],400,'Tu cherches le gamin ? Il est tout au fond, derrière le lieutenant !','Aïe aïe aïe…',{post:'Les Éclats d\'Aube réagissent au lien entre un dresseur et sa créature. C\'est pour ça que le chef les veut.'})},
  {x:12,y:6,t:'grunt',d:0,tr:TR('gm3','Sbire Éclipse',[['nocturelle',13],['ratounet',13],['ombrelin',14]],500,'Les Éclats d\'Aube sont des larmes de Solarion. Avec assez de larmes, on peut briser n\'importe quel sceau…','Oups. J\'en ai trop dit.',{post:'Le lieutenant Corvin garde le passage du fond. Il ne rigole pas, lui.'})},
  {x:2,y:6,t:'grunt',d:0,tr:TR('gm4','Sbire Éclipse',[['magmor',14]],400,'Chut ! Je fais la sieste. …Bon, d\'accord, on se bat !','Retour à la sieste…',{post:'Il paraît qu\'il y a une galerie secrète derrière un brasier, à l\'est. Faut de l\'eau pour l\'éteindre.'})},
  {x:11,y:3,t:'grunt',d:0,cond:()=>!f().t_corvin,tr:TR('corvin','Lieutenant Corvin',[['ombrelin',14,['hypnose','morsure','ombrefurtive','grondement']],['rocaillon',15,['jetpierre','durcir','charge','grimace']],['magmor',16,['braise','feufollet','crocsfeu','durcir'],'charbon']],900,
   'Alors c\'est toi qui as battu Brasia ? Le chef Vex m\'a confié cette mine. Personne ne repart d\'ici avec un seul éclat !','Grr… Battu par un gamin !',{vs:1,boss:1,items:1,win:corvinFlees})},
  {x:11,y:1,t:'kid',d:0,name:'Tito',cond:()=>!f().mine,fn:titoTalk},
  I(23,6,'amulette',1,'mi1'),I(2,13,'superpotion',2,'mi2'),I(23,12,'capsule',3,'mi3'),I(16,8,'pierredure',1,'mi4'),I(14,1,'rappel',1,'mi5')],
 enter:async()=>{if(!f().mineIn){f().mineIn=1;await say('L\'air est chargé de poussière. Au loin, des coups de pioche résonnent… et des éclats de voix.')}}},
gym:{name:'Arène de Cendreville',bg:'salle',amb:'in',floor:'stone',cstyle:'statue',dark:1,mus:'gym',rows:["XXXXXXXXXXXX","XFFFFrrFFFFX","XFFFFrrFFFFX","XCCCChhCCCCX","XFFFFrrFFFFX","XFFFFrrFFFFX","XFCCCrrCCCFX","XFFFFrrFFFFX","XFFFFrrFFFFX","XXXXXEEXXXXX"],
 doors:{'5,9':['ville',6,5,0],'6,9':['ville',6,5,0]},signs:{},acts:{'4,9':()=>say('Une plaque : "La roche ne se tire pas, elle se pousse. Comble une faille et la voie s\'ouvrira." Coincé ? Ressors de l\'arène : les rochers reprendront leur place.')},
 npcs:[{x:5,y:1,t:'leader',d:0,los:0,fn:n=>leaderTalk(n,'brasia'),tr:TR('brasia','Championne Brasia',[['rocaillon',12,['jetpierre','durcir','grimace','charge']],['rocaroc',15,['jetpierre','murroc','belier','grimace']]],1200,
   'Bienvenue dans mon arène ! Ici, la roche ne cède jamais : grâce à leur FERMETÉ, mes créatures survivent toujours au premier coup fatal. Et ma Rocaroc sait durcir sa carapace… Montre-moi comment tu comptes percer ma défense !',
   'Incroyable… Tu as trouvé la faille. Tu as gagné !',{vs:1,boss:1,items:1,post:()=>f().eclipse?'Le Cycle est brisé, mais Cendreville tient bon. Va, et ramène la lumière !':'Grimace, attaques super efficaces… ou patience. Il y a toujours une faille, même dans la roche. Retiens-le pour la suite !',
   win:async()=>{f().badge=1;await badgeGet('BADGE ROC',ICO.bRoc);G.bag.hypercapsule=(G.bag.hypercapsule||0)+2;await say('Brasia te remet aussi 2 Hyper Capsules ! La Boutique vend désormais des Hyper Capsules et des Crépuscapsules.');await braceletScene();
    await say('La Team Éclipse rôde en ville depuis des jours. Leur chef, Vex, prépare quelque chose au sommet du Mont Braise, de l\'autre côté de la Forêt Murmure. Sois prudent.','Brasia')}})},
  OB(3,4,'boulder',{push:1}),OB(8,5,'boulder',{push:1}),
  {x:2,y:7,t:'mountaineer',d:3,tr:TR('bob','Montagnard Bob',[['rocaillon',9],['ratounet',10]],300,'Tu veux affronter Brasia ? Passe d\'abord sur mon corps !','Aïe… solide.',{post:'Mes Rocaillon ont tenu bon à 1 PV ? C\'est leur Fermeté ! Il faut deux coups pour les faire tomber depuis leurs PV max. Et pour atteindre Brasia, pousse un rocher dans une faille !'})},
  {x:8,y:2,t:'climber',d:2,tr:TR('zoe','Grimpeuse Zoé',[['rocaillon',10],['piafou',10]],300,'Brasia est la meilleure ! Je ne te laisserai pas passer !','Bon… tu es prêt pour Brasia. Peut-être.',{post:'Quand Brasia utilise Mur de Roc, sa défense grimpe en flèche. Grimace la fait redescendre !'})}]},
foret:{name:'Forêt Murmure',bg:'foret',amb:'foret',tree:'pine',mus:'foret',edges:{w:['ville',0],n:['mont',-9]},fish:[['tetardin',9,12,100]],
 enc:[['larvigne',8,11,26],['piafou',9,11,16],['racinou',9,11,16],['pissenlou',9,11,8,'j'],['hiboulume',11,13,4,'n'],['ratounet',9,11,12],['ombrelin',9,12,14,'n'],['volticelle',10,12,16,'j'],['lumignon',9,12,14,'n'],['nocturelle',10,12,8,'n']],
 rows:["TTTTTTTTTTTTTTTTTT==TTTTTTTT","TTT,,,,,TTTTTT,,,,==,TTTTTTT","TTT,,,,,TTTTTT,,,,==,TTT...T","TT.......TTTT.....==...b...T","TT.TTT.,,,,,,,,,..==.TTT...T","TT.TTT.,,,,,,,,,......TTTTTT","TT.....TTTTTTT...TT...TTTTTT","TT,,,,,TTTTTTT...TT...,,TTTT","==.....,,,,,,,...,,,..,,,.TT","==.....,,,,,,,...,,,.....fTT","TT.TTT.,,,,,,,........TT..TT","TT.TTT.......TTTT.o...TT..TT","TT,,,,,,,,...TTTT.........TT","TT,,,,,,,,...~~~~..f.....TTT","TT,,,,,,,,...~~~~.......TTTT","TTTTTTTTTTTTTTTTTTTTTTTTTTTT"],
 hidden:[{x:25,y:9,sh:'f2'}],
 npcs:[{x:6,y:3,t:'scout',d:0,tr:TR('nina','Scout Nina',[['larvigne',10],['lumignon',11],['piafou',11]],400,'Chut ! La forêt murmure… Elle dit que tu vas perdre !','La forêt avait tort…',{post:'Il paraît qu\'un ermite vit derrière les ronces, au nord-est. Il parle aux éclats de lumière…'})},
  {x:16,y:5,t:'grunt',d:0,tr:TR('g1','Sbire Éclipse',[['ombrelin',12],['ratounet',12]],500,'La Team Éclipse va s\'emparer de Solarion et plonger Aurélys dans la nuit !','Le chef Vex ne va pas être content…',{post:'Tu crois qu\'on est les méchants ? Demande-toi pourquoi les créatures d\'ombre disparaissent…'})},
  {x:11,y:11,t:'grunt',d:2,tr:TR('g2','Sbire Éclipse',[['magmor',13],['nocturelle',12]],500,'Hé ! Tu t\'es perdu, gamin ?','Grr ! Retraite !',{post:'Admin Sélène garde le chemin du sommet. Elle, tu ne la battras pas.'})},
  {x:23,y:12,t:'botanist',d:2,tr:TR('iris','Botaniste Iris',[['larvigne',11],['larvigne',11],['volticelle',12]],400,'Mes Larvigne sont gorgées de soleil ! Elles reprennent des forces à chaque tour, le jour.','Il fallait frapper vite, c\'est ça ?',{post:'La Sève Vive de Larvigne ne marche que le jour. La nuit, ses feuilles se referment.'})},
  {x:24,y:10,t:'camper',d:1,name:'Campeuse Sacha',fn:()=>campHeal('Campeuse Sacha','Une pause au coin du feu ? Ton équipe a l\'air épuisée.')},OB(25,10,'tent'),OB(24,11,'fire'),
  {x:19,y:1,t:'rival',d:0,name:'Kael',fix:1,cond:()=>!f().rival2,say:'…'},
  {x:25,y:3,t:'lumen',d:0,name:'Ermite Lumen',fn:lumenTalk},SH(26,2,'f1'),
  {x:2,y:14,t:'mon',sp:'ombrelin',time:'n',cond:()=>f().lili===1,fn:mimoFound},
  I(3,1,'superpotion',2,'f1i'),I(21,13,'rappel',1,'f2i'),I(20,11,'supercapsule',3,'f3i'),I(23,14,'repousse',2,'f4i'),BT(13,3,'f1','baiesoin'),BT(26,4,'f2','baieprisme')],
 step:async()=>{if(G.x>=18&&G.y<=4&&!f().rival2){await rival2();return true}}},
mont:{name:'Mont Braise',bg:'mont',amb:'mont',mus:'mont',under:'g',edges:{s:['foret',9]},enc:[['rocaillon',14,17,32],['magmor',15,17,24],['fumenard',15,17,12,'n'],['fumenard',15,17,4,'j'],['ratoroi',15,17,16],['ombrelin',15,17,14,'n'],['nocturelle',15,17,12,'n']],
 rows:["^^^^^^^^^^^^^^^^^^^^","^^^^^^^gggg@^^^^^^^^","^^^^^^gggggggS^^^^^^","^^^LL^ggggggg^LL^^^^","^^LLLggggggggggLL^^^","^^LLggvvggggvvggLL^^","^^gggvvvvggvvvvggg^^","^^gggvvvvggvvvvggg^^","^^gg^^^^ggg^^^^^gg^^","^^gg^LL^ggg^LL^ggg^^","^^gggggggggggggggv^^","^^vvvvvgggggvvvvvv^^","^^vvvvvggggvvvvvvv^^","^^^^^^^^^^g^^^^^^^^^","^^^^gggggggggggg^^^^","^^gg^ggvvvvggvvg^^^^","^^gg^ggvvvvggvvggg^^","^^gxggggggg^^ggggg^^","^^^^^ggggLLLLvvvgg^^","^^vvvvggggggggvvvg^^","^^vvvvgggggggggggg^^","^^^^^^^^^gg^^^^^^^^^"],
 doors:{'11,1':ruinsDoor},signs:{'13,2':'STÈLE ANCIENNE\n"Le jour chante, la nuit répond. Que l\'un se taise, et le Cycle se brise."'},hidden:[{x:7,y:1,sh:'m2'},{x:17,y:7,it:'hyperpotion',q:1,id:'mh1'}],
 npcs:[{x:9,y:8,t:'grunt',d:0,tr:TR('g3','Sbire Éclipse',[['magmor',15],['ombrelin',16]],700,'Le chef est en plein rituel ! Tu ne passeras pas !','Chef… pardon…')},
  {x:12,y:6,t:'grunt',d:2,tr:TR('g4','Sbire Éclipse',[['rocaillon',16],['ratoroi',16]],700,'La nuit éternelle approche, gamin !','Impossible…')},
  {x:10,y:13,t:'selene',d:0,cond:()=>!f().t_selene1,tr:TR('selene1','Admin Sélène',[['nocturelle',15,['ombrefurtive','hypnose','morsure','vent']],['magmor',16,['feufollet','braise','durcir','crocsfeu']],['ombrelin',16,['hypnose','morsure','ombrefurtive','grondement']]],1500,
   'Je suis Sélène, admin de la Team Éclipse. Mes créatures ne frappent pas fort : elles endorment, elles brûlent… et elles attendent. Un dresseur sans Total Soin finit toujours par plier.',
   'Tu as su garder la tête froide… Soit. Le chef t\'attend au sommet.',{vs:1,boss:1,items:1,win:async()=>{await say('Tu crois défendre la lumière ? Demande à ton cher Professeur ce que ses ancêtres ont fait à la nuit.','Sélène');await fadeTo(1,250);await fadeTo(0,250)}})},
  {x:13,y:20,t:'mountaineer',d:2,name:'Randonneur Gaspard',fn:()=>campHeal('Randonneur Gaspard','Le sommet est encore loin. Réchauffe ton équipe au feu de camp avant de grimper !')},OB(12,19,'fire'),
  {x:9,y:2,t:'vex',d:0,name:'Vex',fix:1,cond:()=>!f().boss,say:'…'},
  {x:9,y:1,t:'mon',sp:'solarion',time:'j',cond:()=>f().balance&&!f().legS,fn:()=>legend('solarion')},
  SH(2,15,'m1'),I(17,16,'elixir',1,'m3i'),I(16,6,'totalsoin',2,'m4i')],
 step:async()=>{if(G.y<=4&&!f().boss){await bossFight();return true}}},
route2:{name:'Route 2 · Rive Brumeuse',bg:'lac',amb:'day',fog:1,mus:'route',under:'.',edges:{e:['ville',0],w:['port',4]},fish:[['tetardin',17,20,60],['miroitruite',17,20,25],['crapaflot',21,23,15]],
 enc:[['ratoroi',18,21,18],['piafou',18,20,14],['herissou',17,19,16,'j'],['lapilune',18,20,10,'n'],['etincelot',18,20,14,'r'],['racinou',17,19,10,'r'],['volticelle',18,21,18,'j'],['larvigne',17,19,14,'j'],['nocturelle',18,21,20,'n'],['ombrelin',18,21,18,'n'],['lumignon',18,20,16,'n']],
 rows:["TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT","TT,,,,,..TTTTT,,,,,,,..TTTTTTT","TT,,,,,..TTTTT,,,,,,,......TTT","TT....=============.....,,,TTT","======.....TT.....=.....,,,TTT","======.....TT.....=..o..,,,TTT","TT.,,,,,...TT.....=........TTT","TT.,,,,,..~~~~~~~~H~~~~~~...TT","TT........~~~~~~~~H~~~~~~~..TT","TTT..S....~~~~~~~~H~~~~~~~..TT","TTT.......~~~ggk..H..~~~~~..TT","TT,,,,,...~~~ggg~~~~~~~~~...TT","TT,,,,,....~~~~~~~~~~~~..,,,==","TT,,,,,.....=============,,,==","TT...........,,,,,..TTT..,,,TT","TTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"],
 signs:{'5,9':'ROUTE 2 · RIVE BRUMEUSE\nOuest : Port-Miroir · Est : Cendreville'},hidden:[{x:26,y:2,it:'hyperpotion',q:1,id:'r2h'},{x:2,y:14,pg:1}],
 npcs:[{x:4,y:8,t:'camper',d:3,tr:TR('hugo','Campeur Hugo',[['ratoroi',19],['piafou',20]],600,'Depuis l\'éclipse, je campe ici pour observer le ciel. Et pour me battre, aussi !','Ton équipe est rodée…')},
  {x:17,y:10,t:'fisher',d:3,tr:TR('jade','Pêcheuse Jade',[['tetardin',19],['tetardin',20],['crapaflot',21]],700,'Tu viens pêcher sur MON îlot ? Il faudra me battre !','Tu as la main sûre…',{post:'Le rocher fissuré, là ? Une créature ROCHE pourrait le briser. Je crois avoir vu quelque chose briller derrière.'})},
  {x:24,y:2,t:'astro',d:0,time:'n',tr:TR('celeste','Astronome Céleste',[['lumignon',20],['nocturelle',21]],700,'Le soleil est caché depuis des jours… et pourtant, les étoiles n\'ont jamais été aussi belles. Combattons sous elles !','Fascinant…',{post:'Les étoiles bougent bizarrement. Comme si quelque chose de très ancien se réveillait du côté de l\'Observatoire.'})},
  {x:13,y:13,t:'grunt',d:3,tr:TR('g5','Sbire Éclipse',[['ombrelin',20],['magmor',21]],800,'Le chef a fait de toi une priorité ! Rien ne passe vers Port-Miroir !','Vex avait raison de se méfier de toi…')},
  I(2,1,'superpotion',2,'r2a'),I(26,6,'elixir',1,'r2b'),SH(13,11,'r2'),BT(3,10,'r2','baieprisme')]},
port:{name:'Port-Miroir',bg:'lac',amb:'day',mus:'town',edges:{e:['route2',-4],n:['grotte',1]},fish:[['tetardin',18,22,45],['miroitruite',18,22,30],['crapaflot',22,25,25]],
 rows:["TTTTTTTTTTT^gg^TTTTTTTTT","TT.........^gg^.......TT","TT..AAAAA..=..=..RRRRRTT","TT..AAAAA..=..=..RRRRRTT","TT..WnDnW..=..=..WnDnWTT","TT....=....=..=....=..TT","TT....==============..TT","TT.....l...=.......l..TT","TTBBBBB....=.........S==","TTBBBBB....=============","TTWnDnW....=..........TT","TT..=......=...f..ff..TT","TT..========..........TT","TT....................TT","~~~~~~~H~~~~~H~~~~~~~~~~","~~~~~~~H~~~~~HHHH~~~~~~~","~~~~~~~~~~~~~~~~~~~~~~~~","~~~~~~~~~~~~~~~~~~~~~~~~"],
 deco:[{x:17.5,y:2.5,k:'heal'},{x:4.5,y:8.5,k:'bag'},{x:5.5,y:2.5,k:'star'}],hidden:[{x:7,y:15,sh:'p1'},{x:21,y:13,pg:2}],
 doors:{'19,4':()=>center('Port-Miroir',['port',19,5]),'4,10':shop,'6,4':['gym2',5,8,1]},signs:{'21,8':'PORT-MIROIR\nNord : Grotte Écho (accès réservé) · Est : Route 2'},
 npcs:[{x:13,y:7,t:'prof',d:0,name:'Prof. Saule',cond:act2,fn:profTalk},
  {x:16,y:15,t:'captain',d:2,name:'Capitaine Loup',say:()=>f().balance?'La mer retrouve ses marées. Les marées suivent la lune, tu sais.':'Le lac est noir comme de l\'encre depuis l\'éclipse. Avant, l\'Observatoire brillait comme un phare, là-haut sur la falaise. On disait que ses bâtisseurs y avaient enfermé quelque chose…'},
  {x:16,y:11,t:'kid',d:2,name:'Mousse Timéo',wan:1,say:()=>swarm()&&G.t%2?`Les pêcheurs disent qu'un essaim de ${SP[swarm()[1]].name} traîne du côté de ${MAPS[swarm()[0]].name.split(' · ')[0]} aujourd'hui !`:f().badge2?'Maëlle t\'a donné sa Lanterne ? Dans la Grotte Écho, sans lumière, on ne voit même pas ses pieds !':'Maëlle, c\'est la plus forte ! Sous la pluie, ses Crapaflot nagent deux fois plus vite !'},
  {x:20,y:12,t:'granny',d:2,name:'Mémé Rosa',fn:rosaTalk,qm:()=>!f().rosaQ||f().rosaQ===1&&(G.bag.baieprisme||0)>=3||f().rosaQ===2&&ownSp('lapilune'),say:()=>f().balance?'J\'ai revu une vraie nuit étoilée. Merci, petit.':'Valen ? Le gamin qui passait ses nuits sur le ponton avec son Ombrelin ? Il était si gentil… jusqu\'à ce que son Ombrelin s\'éteigne. Il a quitté le port après ça.'},BT(2,13,'port','baiesoin')],
 enter:async()=>{if(act2()&&!f().portScene)await portScene();else if(f().balance&&!f().ponton)await pontonScene()},
 step:async()=>{if(G.y<=1&&act2()){if(!f().badge2){await say('La Grotte Écho est trop dangereuse sans lumière. La championne Maëlle seule peut t\'en ouvrir l\'accès !','Garde-côte');await forceStep(0);return true}if(!f().kael3){await kael3();return true}}}},
gym2:{name:'Arène Miroir',bg:'lac',amb:'in',floor:'stone',dark:1,mus:'gym',rows:["XXXXXXXXXXXX","XFFFFrrFFFFX","XFFFFrrFFFFX","X~~Q~~~~J~~X","XFFFF~~FFFCX","XFFFF~~FFFFX","X~~J~~~~Q~~X","XCFFFrrFFFFX","XFFFFrrFFFFX","XXXXXEEXXXXX"],
 cstyle:'valve',sw:{J:()=>f().tide?'w':'H',Q:()=>f().tide?'H':'w'},acts:{'1,7':valve,'10,4':valve,'4,9':()=>say('Une plaque : "Marée haute, marée basse… Chaque vanne inverse la marée. Les ponts émergent selon le niveau de l\'eau."')},
 doors:{'5,9':['port',6,5,0],'6,9':['port',6,5,0]},
 npcs:[{x:5,y:1,t:'maelle',d:0,los:0,fn:n=>leaderTalk(n,'maelle'),tr:TR('maelle','Championne Maëlle',[['crapaflot',27,['dansepluie','aquajet','bulles','grimace']],['torrentor',28,['vague','morsure','durcir','hydro']],['crapaflot',29,['dansepluie','vague','plaquage','aquajet']]],2500,
   'Je suis Maëlle. La pluie est mon alliée : sous l\'averse, mes Crapaflot nagent deux fois plus vite et l\'EAU frappe une fois et demie plus fort. Change le temps, ou noie-toi sous la vague !',
   'Tu as tenu sous l\'orage… Bravo.',{vs:1,boss:1,items:2,ev:1,post:'Valen et moi, on pêchait ici quand on était petits. Ramène-le, s\'il te plaît. Même s\'il ne le veut pas.',
   win:async()=>{f().badge2=1;await badgeGet('BADGE MIROIR',ICO.bMir);G.keys.lantern=1;jingle('item');ui.pop={ic:ICO.lantern,t0:now()};await say('Maëlle te confie aussi sa LANTERNE DE MARIN ! Elle éclaire les endroits sombres.');
    await say('La Grotte Écho, au nord, mène à l\'Observatoire. Avec ma Lanterne, tu y verras un peu. Avec une créature FEU, LUMIÈRE ou ÉLEC, tu y verras bien mieux.','Maëlle');
    await say('Et… si tu croises Valen — Vex, comme il se fait appeler —, dis-lui que le ponton l\'attend toujours.','Maëlle')}})},
  I(1,4,'elixir',1,'g2a'),
  {x:2,y:5,t:'sailor',d:3,tr:TR('loic','Marin Loïc',[['tetardin',22],['crapaflot',23]],800,'Prêt à te faire tremper ?','Coulé…',{post:'La Danse Pluie dure cinq tours. Tiens bon, ou change la météo avec un Zénith ! Ah, et cet îlot est un cul-de-sac à marée basse…'})},
  {x:10,y:5,t:'sailor',d:2,tr:TR('ana','Matelote Ana',[['volticelle',23],['crapaflot',23]],800,'L\'ÉLEC contre l\'EAU ? Je connais la parade !','Bien joué, moussaillon.')}]},
grotte:{name:'Grotte Écho',bg:'grotte',amb:'cave',mus:'mont',cave:1,dark2:1,under:'g',encAll:1,edges:{s:['port',-1]},
 enc:[['nocturelle',23,26,36],['rocaillon',23,26,26],['rocaton',23,25,14],['granifelin',25,27,4],['rocaroc',25,27,8],['magmor',24,26,12],['ombrelin',23,26,18]],
 rows:["^^^^^^^^^^^^^EE^^^^^^^^^^^","^^^^^^^^^^^^^gg^^^^^^^^^^^","^^^^^^^^^^ggggggggg^^^^^^^","^^^^^^^^^^g^^^^^^gg^^^^^^^","^^^^^^^^^^gvvvvvvggggg^^^^","^^^^^^^^^^^^^^^^^^^^^g^^^^","^^^^gggg^^^^^^^^^^^^^g^^^^","^^^^ggggkgggg^^^^^^^^g^^^^","^^^^gggg^^^^g^^^^^^^^gggg^","^^g^^^^^^^^^g^^^^^^^^g^^g^","^^gvgvvvv^^^g^^^^^^^^g^gg^","^^^^g^^^^^^^g^^^^^^^^g^^^^","^^^^gggggggggggggggggg^^^^","^^^^g^^^^^^^^^^^^^^^^^^^^^","^^^^g^^^vvvvv^^^^^^^^^^^^^","^^^^ggggvvvvvgggg^^^^^^^^^","^^^^^^^^^^^^^gg^^^^^^^^^^^","^^^^^^^^^^^^^gg^^^^^^^^^^^"],
 doors:{'13,0':['obs',8,9,1],'14,0':['obs',9,9,1]},signs:{},hidden:[{x:24,y:8,pg:3}],
 npcs:[{x:24,y:9,t:'caver',d:1,tr:TR('remi','Spéléologue Rémi',[['rocaillon',24],['nocturelle',25]],900,'Chut ! Tu entends l\'écho ? Mes créatures, elles, voient avec leurs oreilles !','L\'écho m\'a trahi…',{post:'Les Nocturelle ne ratent jamais leur cible : elles se guident au son. Pratique, dans le noir !'})},
  {x:18,y:2,t:'grunt',d:0,tr:TR('g6','Sbire Éclipse',[['nocturelle',25],['magmor',25]],900,'Tu as trouvé ton chemin dans le noir ? Pas mal. Mais l\'Observatoire est fermé aux visiteurs !','Ouille… Va, de toute façon le chef t\'attend.')},
  SH(4,6,'g1'),I(2,9,'hyperpotion',1,'gr1'),I(10,3,'totalsoin',2,'gr2'),I(23,10,'elixir',1,'gr3')]},
obs:{name:'Observatoire Éclipse',bg:'tech',amb:'tech',floor:'tech',cstyle:'tech',dark:1,mus:'ecl',rows:["XXXXXXXXXXXXXXXXXX","XCFFFFFFEEFFFFFFCX","XFFFFFFFFFFFFFFFFX","XXXXXXXZZZZXXXXXXX","XFFFFFFFFFFFFFFFFX","XCCFFCCFFFFCCFFCCX","XFFFFFFFFFFFFFFFFX","XFFCFFFFFFFFFFCFFX","XFFFFFFFFFFFFFFFFX","XFFFFFFFFFFFFFFFFX","XXXXXXXXEEXXXXXXXX"],
 hidden:[{x:16,y:9,pg:4}],doors:{'8,10':['grotte',13,1,0],'9,10':['grotte',14,1,0],'8,0':['dome',5,6,1],'9,0':['dome',6,6,1],'8,1':['dome',5,6,1],'9,1':['dome',6,6,1]},opens:{Z:['bar','F']},
 acts:{'15,5':dadDrawer,'3,7':()=>consoleAct(0),'14,7':()=>consoleAct(1),'6,5':()=>consoleAct(2),'12,5':()=>say('Une note froissée, coincée sous un clavier :\n"Ordre de la barrière : LUNE, puis ÉTOILE, puis SOLEIL. Ne l\'oubliez plus ! — S."'),'1,1':()=>say('Un écran affiche une courbe : "Niveau du sceau : 3 %. Réveil imminent."'),'16,1':()=>say('Un journal de bord : "Jour 1 de l\'éclipse. Valen ne dort plus. Il parle à la chose sous le dôme."')},
 npcs:[{x:10,y:9,t:'rival',d:1,name:'Kael',cond:()=>f().obsScene&&!f().vex2,fn:()=>campHeal('Kael','Besoin d\'une pause ? J\'ai de quoi soigner ton équipe. Vas-y, je tiens l\'entrée.')},
  {x:3,y:8,t:'grunt',d:3,tr:TR('g7','Sbire Éclipse',[['noctyrex',32],['nocturelle',31]],1400,'Personne n\'entre dans l\'Observatoire !','J\'ai… échoué…')},
  {x:14,y:6,t:'grunt',d:2,tr:TR('g8','Sbire Éclipse',[['magmor',32],['noctyrex',32]],1400,'La barrière ne s\'ouvrira jamais pour toi !','Elle s\'ouvre avec les consoles… mais je ne te dirai pas l\'ordre !')},
  {x:9,y:2,t:'selene',d:0,cond:()=>!f().selene2done,tr:TR('selene2','Admin Sélène',[['nocturelle',33,['hypnose','nuit','clairlune','ombrefurtive'],'baiesoin'],['magmor',34,['feufollet','lanceflam','durcir','crocsfeu']],['eclipsoeil',34,['hypnose','rayonnoir','morsure','nuit']],['noctyrex',35,['hypnose','nuit','morsure','cri'],'encensnoir']],4000,
   'Encore toi. Valen est là-haut, avec Nocturion. Si tu passes, tu brises le seul espoir des créatures d\'ombre. Endormies, brûlées… comme la dernière fois. Mais je ne retiendrai plus mes coups.',
   '…C\'est fini. Écoute-moi, maintenant.',{vs:1,boss:1,items:1,win:seleneTruth})}],
 enter:async()=>{if(!f().obsScene)await obsScene()}},
ruines:{name:'Ruines de l\'Aube',bg:'grotte',amb:'cave',mus:'ruines',cave:1,under:'g',cstyle:'stele',
 enc:[['noctyrex',40,44,18],['rocaroc',40,44,18],['ricanoir',40,43,8,'n'],['pyrenard',40,43,6],['armaroc',40,43,8],['pissenlion',40,43,6,'j'],['granifelin',40,43,6],['faucaube',40,43,6,'j'],['phalumine',40,43,14],['bourdonnerre',40,43,14],['magmor',40,44,18],['crapaflot',40,43,10],['papivigne',40,43,8]],
 rows:["^^^^^^^^^^^^^^^^^^^^","^^^^^^^CgggC^^^^^^^^","^^^^^^^ggggg^^^^^^^^","^^^^^^^ggggg^^^^^^^^","^^^^^^^^^h^^^^^^^^^^","^^^^^^^^gggg^^^^^^^^","^^^^^^^^gggg^^^^^^^^","^^^^^^^^gggg^^^^^^^^","^^^^^^^^^^g^^^^^^^^^","^^Cgvvvggggggvvvgg^^","^^ggvvvggggggvvvgC^^","^^ggggg^^gg^^ggggg^^","^^vvggg^^gg^^gggvv^^","^^vvggggggggggggvv^^","^^^^^^^^^EE^^^^^^^^^"],
 doors:{'9,14':['mont',10,1,2],'10,14':['mont',10,1,2]},
 acts:{'2,9':()=>say('Une tablette usée : "Nous, fondateurs d\'Aurélys, avions faim. Les nuits étaient longues, les récoltes maigres. Nous voulions le jour, toujours plus de jour."'),
  '17,10':()=>say('Une tablette fendue : "Aldric Saule proposa d\'enchaîner le gardien de la nuit. Personne ne s\'y opposa. Personne ne demanda l\'avis des créatures d\'ombre."'),
  '7,1':()=>say('Une tablette dorée : "Solarion pleura. Sans personne pour lui répondre, sa lumière devint trop lourde à porter."'),
  '11,1':()=>say('Une tablette d\'obsidienne : "À qui lira ces mots : le Cycle n\'a pas de maître. Rendez à chacun sa part, et le monde respirera."')},
 npcs:[OB(10,6,'boulder',{push:1}),OB(9,7,'boulder',{push:1}),
  {x:7,y:3,t:'lumen',d:3,tr:TR('gard1','Gardien de l\'Aube',[['phalumine',46],['sylvorne',46],['rocaroc',47]],5000,'Nul ne foule l\'autel du Cycle sans prouver qu\'il respecte le jour.','Le jour te reconnaît.',{vs:1,boss:1,items:1,ev:1})},
  {x:11,y:2,t:'selene',d:2,tr:TR('gard2','Gardienne du Crépuscule',[['noctyrex',47],['nocturelle',46],['torrentor',47]],5000,'Et la nuit ? Saurais-tu la respecter, elle aussi ?','La nuit te reconnaît aussi.',{vs:1,boss:1,items:1,ev:1})},
  {x:9,y:1,t:'obj',k:'sablier',cond:()=>!G.keys.sablier,fn:sablierGet}]},
dome:{name:'Dôme de l\'Observatoire',bg:'tech',amb:'tech',floor:'tech',cstyle:'tech',dark:1,mus:'ecl',rows:["XXXXXXXXXXXX","XCFFFFFFFFCX","XFFFFFFFFFFX","XFFFrrrrFFFX","XFFFrrrrFFFX","XFFFFFFFFFFX","XCFFFFFFFFCX","XXXXXEEXXXXX"],
 doors:{'5,7':['obs',8,2,0],'6,7':['obs',9,2,0]},acts:{'1,1':()=>say('Le télescope est pointé vers le soleil voilé. Une plaque dit : "Ici fut scellé le gardien de la nuit, pour que le jour règne."'),'10,1':()=>say('Des notes de Valen : "Le Cœur d\'Aube a brisé le sceau. Nocturion m\'écoute. Bientôt, plus aucune créature d\'ombre ne s\'éteindra."')},
 npcs:[{x:5,y:2,t:'vex',d:0,name:'Vex',fix:1,cond:()=>!f().vex2,say:'…'},{x:6,y:1,t:'mon',sp:'nocturion',cond:()=>!f().vex2},
  {x:5,y:1,t:'mon',sp:'nocturion',time:'n',cond:()=>f().balance&&!f().legN,fn:()=>legend('nocturion')},
  {x:2,y:5,t:'valen',d:3,name:'Valen',cond:()=>f().balance,fn:valenTalk}],
 step:async()=>{if(G.y<=5&&!f().vex2){await finalBattle();return true}}}};
const npcs=M=>M.npcs.filter(n=>!n.hid&&(!n.cond||n.cond())&&(!n.time||(n.time==='n')===night()));

// =====================================================================
// MONDE : déplacement, rencontres (jour/nuit), affinités de terrain, pêche, objets cachés, Éclats d'Aube
// =====================================================================
// Affinités : une créature du bon type, en forme, dans l'équipe ouvre le passage
const AFF0={b:['PLA','Des ronces épaisses bloquent le passage.','trancher les ronces','tranche les ronces','PLANTE','#5a9a48'],k:['ROC','Un rocher fissuré barre le chemin.','briser le rocher','brise le rocher','ROCHE','#a08a78'],x:['EAU','Un brasier ardent bloque le chemin.','éteindre le brasier','éteint le brasier','EAU','#ff9a2a']};
const AFF=new Proxy(AFF0,{get:(o,c)=>c==='k'&&G&&MAPS[G.map]?.opens?.k?undefined:o[c]});
// =====================================================================
// MAISON DU HÉROS — introduction jouable : le rêve, le réveil du douzième anniversaire, le sac à préparer,
// Maman, Lou, et les affaires d'Elias (le père, astronome disparu) qui racontent l'histoire par le décor.
// =====================================================================
const hf=k=>!!f()[k],HM='Maman',LOU='Lou';
MAPS.chambre={name:'Ta chambre',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',
 rows:["XXXXXXXXXX","XCCFCCCsCX","XCFFFFFFFX","XFFrrrrFFX","XFFrrrrFFX","XCFFFFFFCX","XXXXXXXXXX"],
 furn:[{x:1,y:1,h:2,k:'bed'},{x:2,y:1,k:'nightLamp'},{x:4,y:1,k:'shelf1'},{x:5,y:1,w:2,k:'oldPc'},{x:7,y:1,k:'stairsUp'},{x:8,y:1,k:'telescope'},{x:1,y:5,k:'dresser'},{x:8,y:5,k:'plantPot'}],
 wdeco:[{x:1,k:'poster2',dx:2},{x:3,k:'calendar',dx:3,y:2},{x:8,k:'window'}],
 doors:{'7,1':['salon',1,2,0]},
 acts:{'1,1':bedAct,'1,2':bedAct,'2,1':()=>closeUp('photo1',2,1),'4,1':()=>closeUp('carnet',4,1),'5,1':pcAct,'6,1':pcAct,'8,1':telescopeAct,'1,5':dresserAct,'8,5':plantAct,'3,0':()=>closeUp('calendrier',3,0),'8,0':telescopeAct},npcs:[]};
MAPS.salon={name:'Maison',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',
 rows:["XXXXXXXXXXXX","XsCCCFFFCCCX","XFFFFFFFFFFX","XFFCCFFFFFFX","XFFCCFFrrrFX","XFFFFFFrrrCX","XCFFFFFFFFFX","XXXXXEXXXXXX"],
 furn:[{x:1,y:1,k:'stairsUp'},{x:2,y:1,w:2,k:'kitchen'},{x:4,y:1,k:'fridge'},{x:8,y:1,w:3,k:'tv'},{x:3,y:3,w:2,h:2,k:'bigTable'},{x:3,y:3,k:'cake',dy:-14,row:4,z:60},{x:4,y:3,k:'letter',dy:-10,row:4,z:61},{x:10,y:5,k:'coat'},{x:1,y:6,k:'plantPot'}],
 wdeco:[{x:6,k:'window'},{x:7,k:'frameB',y:1}],
 doors:{'1,1':['chambre',7,2,0],'5,7':leaveHome},
 acts:{'2,1':kitchenAct,'3,1':kitchenAct,'4,1':()=>say('Un dessin de Lou est aimanté sur le frigo : toi, en géant, combattant un Pixémon en forme de crêpe. Le Pixémon a l\'air de gagner.'),
  '8,1':tvAct,'9,1':tvAct,'10,1':tvAct,'3,3':tableAct,'4,3':tableAct,'3,4':tableAct,'4,4':tableAct,'10,5':coatAct,'7,0':()=>closeUp('photo2',7,0),'6,0':()=>say(act2()?'Le ciel est d\'un violet malade. Le soleil ne s\'est pas levé.':night()?'La nuit sur Bourg-Lueur. Courte, comme toujours.':hf('intro3')?'Bourg-Lueur sous le soleil. Les lanternes de la Fête de l\'Aube se balancent encore.':'Dehors, Bourg-Lueur est décoré de lanternes pour la Fête de l\'Aube. Tout le village est déjà debout.'),
  '1,6':gerardAct},
 npcs:[{x:3,y:2,t:'mom',d:1,name:'Maman',fn:momHome,qm:()=>f().starter&&G.party.some(m=>bondLv(m)>=3&&!m.moves.includes('retour'))},
  {x:8,y:4,t:'sis',d:0,name:'Lou',fn:louTalk,wan:1,qm:()=>hf('intro3')&&f().louQ===1&&ownSp('piafou')},
  {x:6,y:3,t:'dad',d:0,name:'Papa',cond:()=>hf('dadHome'),fn:dadTalk}],
 enter:homeEnter};

// --- liste des affaires à préparer
const PREP=[['hSac','Sac de voyage'],['hCarte','Carte de Dresseur'],['hCap','Casquette']];
function drawChecklist(){if(!G||f().intro!==1||ui.tip||ui.text||ui.menus.length||ui.panel||!['chambre','salon'].includes(G.map))return;const x=W-158,y=8;rr(x,y,150,64,4,C.ink);rr(x+2,y+2,146,60,2,C.paper);txt('Préparer le départ',x+10,y+16,C.acc,{s:1,sh:0});
 PREP.forEach(([k,n],i)=>{const ok=hf(k),yy=y+26+i*12;rr(x+10,yy-6,8,8,1,ok?C.ok||'#3a9a5a':C.paper2);if(ok)R(X,'#ffffff',x+12,yy-4,4,4);txt(n,x+24,yy+1,ok?C.mute:C.ink,{s:1,sh:0})})}
const missing=()=>PREP.filter(([k])=>!hf(k)).map(p=>p[1]);
function prepCheck(){if(!missing().length&&f().intro===1&&!hf('prepOk')){f().prepOk=1;tip('prep','Tout est prêt ! Descends dire au revoir à Maman et Lou, puis sors par la porte du bas.')}}

// --- gros plan : petit zoom caméra sur l'objet, puis illustration encadrée et pensées du héros
async function closeUp(k,tx,ty){const C0=CAM||[0,0];ui.wzx=tx*TS+16-C0[0];ui.wzy=ty*TS+16-C0[1];sfx('sel');await tween(ui,'wz',1.45,320,1);
 const lines=CUL[k]?.()||[];ui.panel=()=>{X.globalAlpha=.55;R(X,'#0c0818',0,0,W,H);X.globalAlpha=1;CUD[k]?.(now())};await wait(120);
 if(!f()['cu_'+k]){f()['cu_'+k]=1;if(['photo1','carnet','photo2','telescope'].includes(k))f().mem=(f().mem||0)+1}
 for(const l of lines)await say(l);if(!lines.length)for(;;){const kk=await key();if(kk==='a'||kk==='b')break}ui.panel=null;await tween(ui,'wz',1,260,1)}
function card(x,y,w,h,col='#f4ead2'){rr(x+4,y+5,w,h,3,'rgba(0,0,0,.35)');rr(x,y,w,h,3,C.ink);rr(x+3,y+3,w-6,h-6,2,col)}
function people(list,x,y,sc=1){list.forEach(([k,dx,dy=0,d=0])=>{const im=chr(k,d,0);X.drawImage(im,x+dx,y+dy-64*sc+8,32*sc,64*sc)})}
function sepia(x,y,w,h,a=.55){X.save();X.globalCompositeOperation='color';X.globalAlpha=a;R(X,'#9a7a4a',x,y,w,h);X.restore();X.globalAlpha=.12;R(X,'#f6e0b0',x,y,w,h);X.globalAlpha=1}
const CUD={
 photo1:t=>{card(130,22,220,178,'#fbf6ea');const x=142,y=34,w=196,h=132;for(let i=0;i<8;i++)R(X,mix('#f6b26b','#fde6b8',i/7),x,y+i*7,w,7);R(X,'#fde6b8',x,y+56,w,6);
  R(X,'#3a78a8',x,y+62,w,h-62);for(let i=0;i<10;i++)R(X,'#8ac0e0',x+(i*37)%180,y+70+(i*13)%50,10,1);R(X,'#7a5434',x+20,y+98,176,10);R(X,'#a8784a',x+20,y+98,176,3);for(const px of[30,90,150,186])R(X,'#5a3a22',x+px,y+106,4,26);
  pell(X,x+150,y+40,14,14,'#ffe8a0');X.globalAlpha=.65;people([['kid',0,0]],x+150,y+100,.55);X.drawImage(monSpr('ombrelin',0,48),x+166,y+78,20,20);X.globalAlpha=1;
  people([['dad',30,0],['hero',62,8],['mom',90,0]],x,y+104,1);sepia(x,y,w,h);txt('Port-Miroir, été',240,186,'#6a5a48',{s:1,al:'c',sh:0})},
 photo2:t=>{card(130,22,220,178,'#fbf6ea');const x=142,y=34,w=196,h=132;R(X,'#141836',x,y,w,h);for(let i=0;i<40;i++)R(X,i%5?'#c8c8f0':'#ffe8a0',x+(i*53)%w,y+(i*29)%70,1,1);
  R(X,'#2a2440',x,y+96,w,36);pell(X,x+98,y+92,46,34,'#5a5878');pell(X,x+98,y+92,42,30,'#7a7898');R(X,'#2a2440',x+52,y+92,92,40);R(X,'#3a3456',x+70,y+70,8,22);R(X,'#ffe8a0',x+94,y+78,8,6);
  people([['dad',48,0],['prof',108,0]],x,y+130,.8);sepia(x,y,w,h,.25);txt('Observatoire, nuit de recherche',240,186,'#6a5a48',{s:1,al:'c',sh:0})},
 carnet:t=>{card(90,18,300,190,'#efe2c0');for(let i=0;i<9;i++)R(X,'#d8c8a0',100,44+i*16,280,1);R(X,'#c83a3a',118,24,1,178);
  const P=[[290,60],[310,52],[332,58],[340,76],[326,92],[304,98],[286,90],[272,104],[258,96],[346,46],[356,40]];X.strokeStyle='#4a5a8a';X.lineWidth=1;X.beginPath();P.forEach(([a,b],i)=>i?X.lineTo(a,b):X.moveTo(a,b));X.stroke();P.forEach(([a,b])=>R(X,'#2a3a6a',a-1,b-1,3,3));
  txt('Les nuits raccourcissent :',128,58,'#3a2a2a',{s:1,sh:0});txt('3 minutes de moins chaque année.',128,74,'#3a2a2a',{s:1,sh:0});txt('Le Cycle boite. Ce qui a été',128,106,'#3a2a2a',{s:1,sh:0});txt('scellé doit-il le rester ?',128,122,'#3a2a2a',{s:1,sh:0});
  txt('Pour mes enfants : un jour, je',128,154,'#5a3a6a',{s:1,sh:0});txt('vous montrerai le vrai ciel. - E.',128,170,'#5a3a6a',{s:1,sh:0});txt('dragon ?',300,118,'#4a5a8a',{s:1,sh:0})},
 lettre:t=>{card(100,20,280,188,'#f8f0dc');R(X,'#c83a3a',220,30,40,6);const L=['Cher voisin,','','Pour la Fête de l\'Aube et tes douze','ans, je t\'attends au labo ce matin.','Un Pixémon t\'y attend.','','Prof. Saule','','PS : Kael a déjà demandé l\'heure','trois fois.'];L.forEach((l,i)=>txt(l,120,56+i*14,i>=8?'#7a6a58':'#3a2a2a',{s:1,sh:0}))},
 carte:t=>{card(110,40,260,150,'#4a7ab8');R(X,'#3a64a0',113,43,254,26);txt('CARTE DE DRESSEUR',240,61,'#ffffff',{al:'c',sh:0});rr(124,80,80,80,3,'#efe6d2');if(PEO.hero)X.drawImage(PEO.hero.pt[0],128,84,72,72);
  [['Bourg-Lueur',92],['12 ans aujourd\'hui',110],['Badges : '+((f().badge?1:0)+(f().badge2?1:0)+(f().badge3?1:0)+(f().badge4?1:0)),128],['Pixédex : '+DEX.filter(k=>G.dex[k]===2).length,146]].forEach(([s,y])=>txt(s,216,y,'#ffffff',{s:1,sh:0}))},
 calendrier:t=>{card(150,30,180,170,'#f4ead2');R(X,'#c83a3a',153,33,174,26);txt('AUJOURD\'HUI',240,52,'#ffffff',{al:'c',sh:0});txt('FÊTE DE L\'AUBE',240,96,'#3a2a2a',{al:'c',sh:0});
  X.strokeStyle='#e8484f';X.lineWidth=3;X.beginPath();X.ellipse(240,132,46,22,0,0,7);X.stroke();X.lineWidth=1;txt('MES 12 ANS !',240,138,'#c83a3a',{al:'c',sh:0})},
 telescope:t=>{card(110,20,260,186,'#141836');for(let i=0;i<60;i++)R(X,i%6?'#c8c8f0':'#ffe8a0',118+(i*61)%240,28+(i*37)%160,i%9?1:2,i%9?1:2);X.globalAlpha=.5+.2*Math.sin(t/400);pell(X,300,70,10,10,'#e8e0ff');X.globalAlpha=1;
  X.strokeStyle='rgba(180,170,255,.35)';X.beginPath();[[150,150],[180,130],[214,138],[236,116],[262,124]].forEach(([a,b],i)=>i?X.lineTo(a,b):X.moveTo(a,b));X.stroke()},
 photo3:t=>{card(130,22,220,178,'#fbf6ea');const x=142,y=34,w=196,h=132;R(X,'#1a1e44',x,y,w,h);for(let i=0;i<30;i++)R(X,'#e8e0ff',x+(i*47)%w,y+(i*31)%60,1,1);R(X,'#fff6d0',x+150,y+14,14,14);R(X,'#1a1e44',x+155,y+12,12,12);
  R(X,'#2a4a7a',x,y+86,w,46);R(X,'#6a4a30',x+40,y+98,120,8);for(let i=0;i<5;i++)R(X,'#4a3020',x+46+i*26,y+106,4,26);
  people([['valen',80,0]],x,y+104,.7);X.drawImage(monSpr('ombrelin',0,40),x+104,y+66,40,40);sepia(x,y,w,h,.3);txt('Valen et Brume, le ponton, 8 ans',240,186,'#6a5a48',{s:1,al:'c',sh:0})},
 lastpage:t=>{card(80,14,320,196,'#efe2c0');const L=['Dernière page.','','Je sais où dort la nuit : sous le dôme.','Je pourrais briser le sceau… mais un ciel','sans jour serait aussi injuste qu\'un ciel','sans nuit. Il doit exister un autre moyen.','','Je pars vers le Nord, où les nuits sont','encore entières, chercher l\'autre moitié','du Cycle. Je reviendrai avec les nuits.','','Pour Lou, pour mon grand, pour toi. - Elias'];L.forEach((l,i)=>txt(l,98,40+i*14,i>=11?'#5a3a6a':'#3a2a2a',{s:1,sh:0}))},
 tv:t=>{card(100,24,280,170,'#22223a');R(X,'#2e6a8a',112,36,256,120);R(X,'#c83a3a',112,136,256,20);txt('FLASH INFO',122,150,'#ffffff',{mini:1});const n=news();n.forEach((l,i)=>txt(l,124,60+i*16,'#ffffff',{s:1,sh:0}))}};
const CUL={photo3:()=>['Une photo d\'un garçon assis au bout d\'un ponton, la nuit. Un Ombrelin dort sur ses genoux, sous un grand chapeau.','Au dos : "Valen et Brume. La nuit la plus longue de l\'été."',hf('ysL')?'C\'est le même garçon que sur la photo de ta famille. Le garçon seul du ponton.':'Il a l\'air heureux.'],photo1:()=>['Une photo, au ponton de Port-Miroir. Papa, Maman et toi, six ans à peine.','Au fond, sur le ponton, un garçon que tu ne connais pas, avec une petite créature sous un grand chapeau. Il a l\'air seul.','Tu ne l\'avais jamais remarqué.'],
 photo2:()=>['Papa et le Prof. Saule devant l\'Observatoire, une nuit de recherche.','Papa tient un carnet sous le bras. Le même que celui de ta chambre.',hf('dadNote')?'Tu sais maintenant ce qu\'il cherchait, cette nuit-là.':'C\'est la dernière photo de lui. Il est parti quelques semaines plus tard.'],
 carnet:()=>['Le carnet de Papa. Elias, astronome. Ses notes sur le ciel d\'Aurélys.','Il dessinait des étoiles reliées entre elles… On dirait un dragon.',hf('legN')?'Nocturion. Il l\'avait vu, lui aussi.':'Le sceau ? Le Cycle qui boite ? Tu n\'as jamais compris ces pages.'],
 lettre:()=>hf('cu_lettre')?['L\'invitation du Prof. Saule.']:['Une lettre du Prof. Saule, posée à côté du gâteau.'],
 carte:()=>['Ta CARTE DE DRESSEUR. La photo date un peu. Tu avais les cheveux en pétard.'],
 calendrier:()=>['Le calendrier. Aujourd\'hui est entouré en rouge, trois fois. Par Lou, sûrement.'],
 telescope:()=>['Le télescope de Papa. Il disait que les étoiles d\'Aurélys se couchaient trop tôt.','Certaines nuits, tu crois voir une ombre bouger entre elles. Comme dans ton rêve.'],
 lastpage:()=>['Papa… Il savait tout. Il a préféré partir plutôt que de tout briser.',hf('balance')?'Les nuits sont revenues. Est-ce qu\'il les voit, là où il est ? Est-ce qu\'il va rentrer ?':'Si les nuits reviennent… il reviendra.'],
 tv:()=>[]};
function news(){const F=f();return F.balance?['Les nuits ont retrouvé leur durée','normale ! Les Pixémons nocturnes','reviennent dans toute la région.','Le Prof. Saule parle de miracle.']:act2()?['ÉCLIPSE : le soleil ne s\'est','pas levé ce matin. Restez chez vous.','La Team Éclipse revendique','l\'événement.']:F.badge?['La Team Éclipse aperçue près','de la mine de Cendreville.','Des mineurs parlent de vols','d\'Éclats d\'Aube.']:F.starter?['Fête de l\'Aube : trois jeunes de','Bourg-Lueur ont reçu leur premier','Pixémon ! La nuit dernière n\'a','duré que 5 heures. Inquiétant ?']:['Fête de l\'Aube ce matin à','Bourg-Lueur ! Et toujours ce mystère :','la nuit dernière n\'a duré que','5 heures, un nouveau record.']}

// --- objets de la chambre
async function bedAct(){if(f().intro<3)return say(hf('cu_bed')?'Non. Pas de "encore cinq minutes". Pas aujourd\'hui.':(f().cu_bed=1,'Ton lit. Encore chaud. Il t\'appelle… Non ! Pas aujourd\'hui !'));return homeRest()}
async function pcAct(){if(f().intro===1&&!hf('hCarte')){if(!hf('mails')){f().mails=1;await say('Ton ordinateur. Deux nouveaux messages.');await say('De : Kael. "Je serai le premier au labo. Le Pixémon FEU est à moi. Bon anniv quand même. -K."');await say('De : inconnu. "VOUS AVEZ GAGNÉ UNE HYPER CAPSULE !!! Cliquez ici." C\'est sûrement une arnaque.')}
  await say('Dans le tiroir du bureau… ta CARTE DE DRESSEUR, toute neuve !');f().hCarte=1;jingle('item');await closeUp('carte',5,1);prepCheck();return}
 if(f().intro<3)return say('Pas le temps de jouer. Le Prof. t\'attend !');await say('Ton ordinateur est relié à la Boîte du Prof. Saule.');return boxMenu()}
async function telescopeAct(){await closeUp('telescope',8,1)}
async function dresserAct(){if(!hf('hSac')){f().hSac=1;await say('Dans le tiroir du bas : ton SAC DE VOYAGE. Maman l\'a déjà rempli de chaussettes. Évidemment.');jingle('item');prepCheck();return}
 return say('Tes vêtements, bien pliés. Pas par toi.')}
async function plantAct(){if(!hf('hCap')){await say('Il y a quelque chose de coincé dans le pot de fleurs…');f().hCap=1;jingle('item');await say('TA CASQUETTE ! Avec un mot : "Trouvée ! T\'es nul à cache-cache. - Lou"');prepCheck();return}
 return say('Une plante. Elle a gardé ta casquette toute la nuit. Merci, la plante.')}

// --- objets du salon
async function kitchenAct(){return say(f().intro<3?'Une montagne de crêpes. Maman en a fait pour tout le village. Littéralement.':night()?'La cuisine sent la soupe aux légumes. Il en reste pour toi, évidemment.':'La cuisine. Maman a laissé un mot : "Les crêpes, c\'est pour le goûter. Lou, c\'est pour TOUT LE MONDE."')}
async function tvAct(){return closeUp('tv',9,1)}
async function tableAct(){if(!hf('cu_lettre'))return closeUp('lettre',3,3);return say(f().intro<3?'Le gâteau d\'anniversaire. Douze bougies… Lou en a déjà mangé une.':'La table de la cuisine. Ta place est toujours mise.')}
async function coatAct(){if(!G.keys.cleE){await say('Le manteau de Papa. Maman ne l\'a jamais rangé. Il sent encore la pluie et l\'huile de télescope.');await say('Dans la poche… une petite clé en laiton, gravée E.L.');G.keys.cleE=1;jingle('item');return say('Tu prends la PETITE CLÉ. Peut-être qu\'elle ouvre quelque chose, quelque part.')}
 return say(hf('dadHome')?'Le manteau de Papa. Il est de nouveau porté.':'Le manteau de Papa. La poche est vide maintenant : la petite clé est avec toi.')}

// --- Maman, Lou, Papa
async function momHome(n){if(f().intro<3){if(!missing().length)return say('Tu as tout ? Alors file, ils t\'attendent ! Passe par la porte, je te rejoins pour te dire au revoir.',HM,0,'mom');
  return say(`Il te manque encore : ${missing().join(', ')}. Ton père disait toujours : "Un bon explorateur vérifie trois fois son sac."`,HM,0,'mom')}
 if(G.party.length&&G.party.some(m=>m.hp<st(m).hp||m.st)){await say('Tu as l\'air épuisé ! Laisse-moi m\'occuper de ton équipe.',HM,0,'mom');await fadeTo(1,250);healAll();await fadeTo(0,250);jingle('heal');await say('Voilà ! Tout le monde est en pleine forme.',HM,0,'mom')}
 return momTalk({say:()=>hf('dadHome')?'Ton père répare son télescope depuis trois jours. Je crois qu\'il fait exprès de ne pas le finir, pour rester à la maison.':f().balance?'Regarde le ciel… Les nuits sont redevenues longues et belles. Où qu\'il soit, ton père le voit aussi.':act2()?'Le soleil ne se lève plus depuis des jours… Fais attention à toi, d\'accord ? Et rentre dormir de temps en temps !':night()?'Il se fait tard ! La nuit, d\'autres créatures sortent des hautes herbes. Ton lit t\'attend, là-haut.':'Si ton équipe est fatiguée, reviens : je m\'en occupe. Et ton lit, là-haut, te permet de choisir l\'heure du réveil.'})}
async function louTalk(n){if(f().intro<3){if(!hf('hCap'))return say(hf('louHint')?'Froid… froid… Indice : elle est avec quelqu\'un qui ne parle jamais. Et qui est vert. Hihi !':(f().louHint=1,'Ta casquette ? Quelle casquette ? Hihi ! Indice : elle est avec quelqu\'un qui ne parle jamais. Et qui est vert.'),LOU,0,'sis');return say('Tu vas avoir un Pixémon ! Moi aussi, j\'en veux un… Encore cinq ans. CINQ ANS.',LOU,0,'sis')}
 const q=f().louQ||0;
 if(q===0&&f().starter){f().louQ=1;await say('Tu as un Pixémon ! Il est trop beau ! Dis, tu peux me montrer un Piafou ? Un vrai ? Ceux qui chantent le matin ?',LOU,0,'sis');return say('Maman dit que je suis trop petite pour aller dans les hautes herbes. Alors ramène-en un dans ton équipe, juste pour que je le voie !',LOU,0,'sis')}
 if(q===1&&ownSp('piafou')){f().louQ=2;await emote(n,'♥',700);await say('UN PIAFOU ! Il est tout doux ! Bonjour, toi ! Tu chantes ? Chante !',LOU,0,'sis');await say('Tiens, c\'est pour toi. Je l\'ai trouvé dans le jardin. Papa disait que ça porte bonheur.',LOU,0,'sis');give('baieprisme',1);await say('Tu reçois une Baie Prisme !');return save()}
 if(q===1)return say('Alors, ce Piafou ? Ils chantent sur la Route 1 le matin, à ce qu\'il paraît.',LOU,0,'sis');
 return say(hf('dadHome')?'Papa m\'apprend les constellations ! Celle-là, c\'est le Dragon. Celle-là… aussi le Dragon. Il y a beaucoup de dragons.':f().balance?'Les nuits sont longues maintenant ! J\'ai vu une étoile filante. J\'ai fait un vœu. C\'est un secret.':act2()?'J\'ai pas peur du noir. J\'ai PAS peur. Tu rentres bientôt, hein ?':['Quand je serai grande, j\'aurai douze Pixémons. Et un dragon.','Maman parle à Papa le soir, devant la fenêtre. Je fais semblant de dormir.','Tu as battu une championne ? En vrai ? Raconte !'][(G.t>>4)%3],LOU,0,'sis')}
async function dadTalk(){return say(['Douze ans, déjà… J\'ai manqué tant de choses. Mais tu m\'as ramené les nuits. Merci.','Le ciel d\'Aurélys est entier, maintenant. Regarde le Dragon, là-haut : il ne se couche plus avant l\'aube.','Ta mère m\'a raconté pour ta casquette. Lou cachait déjà la mienne, à ton âge… enfin, à son âge à elle.'][(G.t>>4)%3],'Papa',0,'dad')}

// --- entrées et sortie de la maison
async function homeEnter(){if(G.map==='salon'&&f().intro===1&&!hf('salon1')){f().salon1=1;const m=MAPS.salon.npcs[0];await cine(1);await emote(m,'!',500);faceTo(m,G.x,G.y);
  await say('Ah ! Le voilà, notre grand de douze ans ! Joyeux anniversaire, mon chéri.',HM,0,'mom');await emote(m,'♥',700);
  await say('Je sais, je sais, le Prof. t\'attend. Mais prends au moins des crêpes pour la route.',HM,0,'mom');give('biscuit',2);await say('Tu reçois 2 Biscuits d\'Aube ! Ta future créature va adorer.');
  await say('Tu as bien tout ? Ton sac, ta carte, ta casquette ? Lou avait l\'air très contente d\'elle, ce matin…',HM,0,'mom');await cine(0);prepCheck()}
 if(G.map==='salon'&&f().balance&&hf('dadNote')&&!hf('dadHome'))await dadReturns()}
async function dadDrawer(){if(!G.keys.cleE)return say('Sous une console, un vieux tiroir en bois, fermé à clé. Deux initiales sont gravées dessus : E.L.');
 if(hf('dadNote'))return say('Le tiroir d\'Elias. Vide, maintenant : sa dernière page est avec toi.');
 await say('La petite clé du manteau de Papa… Elle tourne ! Le tiroir s\'ouvre.');f().dadNote=1;sfx('shard');await closeUp('lastpage',15,5);save()}
async function leaveHome(){if(f().intro>=3)return warp('bourg',5,6,0);const m=MAPS.salon.npcs[0];
 if(missing().length){await emote(m,'!',500);return say(`Hop hop hop ! Tu n'oublies rien ? Il te manque : ${missing().join(', ')}.`,HM,0,'mom')}
 await cine(1);const l=MAPS.salon.npcs[1];await walk(m,'rrddd',170);m.d=0;G.dir=1;
 await say('Mon grand… Ton père aurait voulu être là ce matin. Il avait tout prévu, tu sais : t\'emmener à l\'Observatoire pour tes douze ans, te montrer le ciel.',HM,0,'mom');await emote(m,'…',800);
 await say('Il n\'est jamais revenu de sa dernière nuit là-bas. Mais je suis sûre qu\'il te regarde partir, d\'une façon ou d\'une autre.',HM,0,'mom');
 await say('Allez ! Pas de larmes un jour d\'anniversaire. Tiens, de quoi soigner ta future créature.',HM,0,'mom');give('potion',3);await say('Tu reçois 3 Potions !');
 if((f().mem||0)>=3&&!G.keys.boussole){await say('Tu as regardé les affaires de ton père, hein ? Je l\'ai vu à ta tête. Alors prends ça aussi.',HM,0,'mom');G.keys.boussole=1;jingle('item');await say('Tu reçois la BOUSSOLE D\'ELIAS ! Les objets cachés scintilleront bien plus souvent autour de toi.')}
 faceTo(l,G.x,G.y);await emote(l,'!',400);await say('Attends ! Ramène-moi un Piafou un jour ! Un tout doux ! Et… reviens, hein.',LOU,0,'sis');
 await say('Reviens dormir de temps en temps. Ta chambre, ton lit et mes crêpes t\'attendront.',HM,0,'mom');f().intro=3;f().intro3=1;await cine(0);
tip('home','Ta maison : Maman soigne ton équipe, le lit de ta chambre choisit l\'heure du réveil et ton ordinateur ouvre la Boîte.');return warp('bourg',5,6,0)}

// --- le rêve d'ouverture, puis le réveil
const DREAM=['…Encore ce rêve. Un ciel immense, plus grand que tous les ciels.','Entre les étoiles, une ombre se déplie. Un dragon de nuit. Il n\'a pas l\'air méchant. Il a l\'air triste.','"Les nuits… sont trop courtes…"'];
async function dreamIntro(){mode='intro';ui.slide=3;musStop();await fadeTo(0,900);for(const s of DREAM)await say(s);ui.flash=.9;ui.flashC='#ffffff';sfx('alert');await fadeTo(1,500);
 mode='world';ui.banner=null;f().intro=0;loadMap('chambre',2,2,2);musStop();await fadeTo(0,700);await wakeUp()}
async function wakeUp(){await wait(300);for(let i=0;i<3;i++){sfx('alert');await wait(220)}await emote('me','!',500);await say('DRIIIING ! …Le réveil. Tu as encore rêvé du dragon.');
 const l=tmpN('chambre',{x:7,y:1,t:'sis',d:0,name:'Lou'});sfx('door');await wait(200);await cine(1);await walk(l,'dllll',150);faceTo(l,G.x,G.y);G.dir=3;
 await say('DEBOUT ! Joyeux anniversaire, grand frère ! Douze ans ! T\'es VIEUX !',LOU,0,'sis');await emote(l,'♪',600);
 await say('Maman a fait des crêpes. Plein. Genre, BEAUCOUP trop. Et le Prof. Saule a dit que tu dois aller au labo pour la Fête de l\'Aube !',LOU,0,'sis');
 await say('Tu vas avoir ton premier Pixémon ! C\'est pas juste, moi j\'ai que sept ans…',LOU,0,'sis');await emote(l,'…',500);
 await say('Ah, et… j\'ai peut-être caché un truc à toi. Mais je dirai pas quoi ! Hihi !',LOU,0,'sis');await walk(l,'rrrru',130);rmN('chambre',l);sfx('door');await cine(0);
 musPlay('town');await say('Bon. Il te faut ton sac, ta Carte de Dresseur… et ta casquette. Où est-ce qu\'elle l\'a mise ?');f().intro=1;save();
 tip('look','Approche-toi d\'un objet et appuie sur A pour l\'examiner. Certains objets racontent des choses…')}
async function dadReturns(){f().dadHome=1;const d=MAPS.salon.npcs.find(n=>n.t==='dad');await cine(1);musStop();await camTo(6,3,700);await wait(400);
 await say('…','Papa',0,'dad');faceTo(d,G.x,G.y);await emote(d,'!',700);await say('Tu as trouvé mes notes. Et tu as rendu les nuits au ciel. Je les ai vues revenir, depuis le Nord.','Papa',0,'dad');
 await say('Je suis parti pour chercher un moyen doux de réparer le Cycle. Tu l\'as trouvé avant moi.','Papa',0,'dad');await emote(MAPS.salon.npcs[0],'♥',900);await emote(MAPS.salon.npcs[1],'♥',700);
 await say('Bon anniversaire en retard, champion. Je te dois une nuit à l\'Observatoire.','Papa',0,'dad');await camBack(600);await cine(0);musPlay('town');save()}

// =====================================================================
// ÉCOSYSTÈME VIVANT — des Pixémons sauvages visibles dans le monde. Ils dorment, mangent, jouent, observent
// ou fuient selon l'heure et leur caractère ; certains en chassent d'autres. Les surprendre endormis donne
// un combat où ils sont encore assoupis (capture plus facile). Les espèces suivent les tables de rencontres.
// =====================================================================
const SHY=new Set(['piafou','lapilune','pissenlou','herissou','etincelot','racinou','larvigne','fumenard','miroitruite','tetardin']),
 CURIOUS=new Set(['ratounet','ratoroi','rocaton','volticelle','lumignon','ombrelin','hiboulume']),
 PREY={granifelin:['rocaillon','rocaton'],faucaube:['piafou','larvigne'],pyrenard:['ratounet','ratoroi'],noctyrex:['lumignon','ombrelin'],nocturelle:['larvigne','volticelle']};
function faunaSpawn(k){const M=MAPS[k];for(const m of Object.values(MAPS))m.npcs=m.npcs.filter(n=>!n.fauna);
 if(!M.enc||isInt(M)||!G?.party.length||k==='ruines'&&!f().balance)return;const L=M.enc.filter(e=>!e[4]||(e[4]==='r'?rain():(e[4]==='n')===night()));if(!L.length)return;
 const mw=M.rows[0].length,mh=M.rows.length,n0=mw*mh>420?3:2,taken=new Set(M.npcs.map(n=>n.x+','+n.y));
 for(let i=0;i<n0;i++){const e=L[(Math.random()*L.length)|0];for(let tries=0;tries<40;tries++){const x=1+(Math.random()*(mw-2)|0),y=1+(Math.random()*(mh-2)|0),c=M.rows[y][x];
   if(SOLID.has(c)||'~wHLhE='.includes(c)||M.doors?.[x+','+y]||taken.has(x+','+y)||Math.abs(x-G.x)+Math.abs(y-G.y)<5)continue;taken.add(x+','+y);
   const nocturnal=e[4]==='n'||['OMB','LUM'].includes(SP[e[0]].t),slp=Math.random()<(night()!==nocturnal?.55:.15);
   M.npcs.push({x,y,x0:x,y0:y,d:rnd(0,3),t:'mon',sp:e[0],lv:rnd(e[1],e[2]),fauna:1,wild:1,slp,tt:800+Math.random()*2000,fn:faunaMeet});break}}}
async function faunaMeet(n){if(n.gone)return;n.gone=1;const sp=SP[n.sp].name;
 if(n.slp){await say(`Le ${sp} sauvage dort profondément… Tu t'approches sans bruit.`);tip('dodo','Surprendre une créature endormie : le combat commence alors qu\'elle dort encore. Capture bien plus facile !')}
 else{await emote(n,'!',450);if(SHY.has(n.sp)&&Math.random()<.35){await say(`Le ${sp} sauvage prend peur et s'enfuit !`);puff(n.x,n.y,'#ffffff',10);rmFauna(n);return}}
 const m=mon(n.sp,n.lv,{wild:1});if(n.slp){m.st='slp';m.slp=3}rmFauna(n);await battle([m])}
const rmFauna=n=>{for(const M of Object.values(MAPS)){const i=M.npcs.indexOf(n);if(i>=0)M.npcs.splice(i,1)}};
function faunaTick(dt){const M=MAPS[G.map],NM=npcs(M),busyAt=(x,y)=>x===G.x&&y===G.y||NM.some(o=>o.x===x&&o.y===y||o.rx===x&&o.ry===y)||x===FOL.x&&y===FOL.y;
 const free=(x,y)=>{const c=M.rows[y]?.[x];return c&&!SOLID.has(c)&&!'~wHL'.includes(c)&&!M.doors?.[x+','+y]&&!busyAt(x,y)};
 for(const n of NM){if(!n.fauna||n.walk||n.gone)continue;n.tt-=dt;if(n.tt>0)continue;n.tt=900+Math.random()*1800;
  if(n.slp){if(Math.abs(n.x-G.x)+Math.abs(n.y-G.y)<=4)logObs(n.sp,'dodo');if(Math.random()<.5){const e={n,k:'…',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),900)}continue}
  const dP=Math.abs(n.x-G.x)+Math.abs(n.y-G.y);let away=null;
  const hunter=NM.find(o=>o.fauna&&!o.slp&&PREY[o.sp]?.includes(n.sp)&&Math.abs(o.x-n.x)+Math.abs(o.y-n.y)<=3);
  if(hunter){away=hunter;if(Math.abs(hunter.x-G.x)+Math.abs(hunter.y-G.y)<=5)logObs(hunter.sp,'chasse');if(Math.random()<.5){const e={n:hunter,k:'!',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),600)}}
  else if(dP<=2&&SHY.has(n.sp))away={x:G.x,y:G.y};
  else if(dP<=3&&CURIOUS.has(n.sp)){faceTo(n,G.x,G.y);if(!n.saw){n.saw=1;const e={n,k:'?',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),700)}continue}
  let d;if(away){const opts=[0,1,2,3].filter(k=>free(n.x+DX[k],n.y+DY[k])).sort((a,b)=>(Math.abs(n.x+DX[b]-away.x)+Math.abs(n.y+DY[b]-away.y))-(Math.abs(n.x+DX[a]-away.x)+Math.abs(n.y+DY[a]-away.y)));d=opts[0]}
  else{const c=M.rows[n.y][n.x];if((c==='f'||c===',')&&Math.random()<.3){if(dP<=4)logObs(n.sp,'repas');const e={n,k:'♪',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),700);continue}
   if(Math.random()<.45)continue;d=rnd(0,3);if(Math.abs(n.x+DX[d]-n.x0)>3||Math.abs(n.y+DY[d]-n.y0)>3)d=OPP[d]}
  if(d==null||!free(n.x+DX[d],n.y+DY[d])){if(d!=null)n.d=d;continue}n.walk=1;n.rx=n.x+DX[d];n.ry=n.y+DY[d];npcStep(n,d,away?190:340).then(()=>{n.walk=0;n.rx=n.ry=null})}}

// =====================================================================
// SECRETS, CARNET D'OBSERVATION ET QUÊTES ANNEXES 5.1
// =====================================================================
// Clairière secrète : derrière l'ermitage de Lumen, un arbre n'en est pas un…
MAPS.clairiere={name:'Clairière Secrète',bg:'foret',amb:'foret',mus:'foret',
 rows:["TTTTTTTTTTTTTT","TT,,,TT..ff.TT","T,,,,...f...,T","T..ff..~~~..,T","...S...~~~...T","T,..f..~~~.f.T","T,,......o..,T","T,,,.f....,,,T","TT,,,,TT..,,TT","TTTTTTTTTTTTTT"],
 enc:[['lapilune',12,15,24,'n'],['hiboulume',12,15,18,'n'],['pissenlou',11,13,24,'j'],['pissenlion',14,16,8,'j'],['faucaube',15,17,6,'j'],['racinou',11,13,18]],
 doors:{'0,4':['foret',26,3,2]},signs:{'3,4':'STÈLE ANCIENNE\n"Ici, les fondateurs endormirent la nuit. Ils jurèrent de la réveiller le jour où le ciel serait de nouveau partagé."'},
 hidden:[{x:12,y:2,it:'hypercapsule',q:3,id:'clr1'}],npcs:[BT(11,7,'clr','baieprisme')],enter:async()=>{if(!f().clr){f().clr=1;await say('Les arbres s\'écartent… Une clairière que personne ne semble connaître. L\'air y est plus frais, plus calme.');save()}}};
MAPS.foret.doors={...(MAPS.foret.doors||{}),'27,3':['clairiere',1,4,3]};

// Carnet d'observation : regarder vivre les Pixémons sauvages (sommeil, repas, chasse) remplit le carnet de Lucie.
const OBSK={dodo:'dort',repas:'se régale',chasse:'chasse'};
function logObs(sp,k){if(!G||!f().starter)return;const key=sp+':'+k;G.obs??={};if(G.obs[key])return;G.obs[key]=1;ui.note={s:`Carnet : ${SP[sp].name} ${OBSK[k]}`,t0:now()};sfx('sel');tip('carnet','Nouvelle note dans le carnet d\'observation ! Regarde vivre les Pixémons sauvages (sommeil, repas, chasse), puis va voir l\'Assistante Lucie au labo.')}
const nObs=()=>Object.keys(G.obs||{}).length,OBSR=[[3,'capsule',5],[8,'supercapsule',5],[15,'hypercapsule',4],[24,'biscuit',6]];
async function lucieTalk(){const L='Assistante Lucie';let got=0;
 for(const[n,it,q]of OBSR)if(nObs()>=n&&!f()['ob'+n]){f()['ob'+n]=1;got=1;await say(`${n} observations dans ton carnet ? Formidable ! Les vraies découvertes commencent toujours par regarder.`,L);give(it,q);await say(`Tu reçois ${IT[it][0]} x${q} !`)}
 if(f().starter&&!f().stormQ){f().stormQ=1;return say('Tu sais ce qui me fascine ? Les Étincelot. Ils n\'apparaissent que sous l\'orage, dans les hautes herbes. Si tu en captures un, montre-le-moi !',L)}
 if(f().stormQ===1&&ownSp('etincelot')){f().stormQ=2;await say('Un Étincelot ! Ses joues crépitent encore… Merci ! Ça confirme ma théorie : certaines créatures suivent la météo, pas l\'heure.',L);give('supercapsule',4);await say('Tu reçois 4 Super Capsules !');return say('Autre secret : les Racinou sortent de terre quand il pleut. Et sur la Rive Brumeuse, les nuits claires… regarde bien les rives.',L)}
 if(got)return save();const nx=OBSR.find(r=>nObs()<r[0]);
 return say(f().starter?`Ton carnet d'observation compte ${nObs()} note${nObs()>1?'s':''}.${nx?` Prochaine récompense à ${nx[0]}.`:' Tu as tout vu ! Enfin… presque.'} Approche-toi des Pixémons sauvages sans les effrayer : regarde-les dormir, manger, chasser.`:'Le Prof. a passé sa vie à étudier le Cycle d\'Aurélys : le jour, la nuit… et les créatures qui en dépendent.',L)}
// Gérard, la plante de Lou. Il paraît qu'il écoute.
async function gerardAct(){f().ger=(f().ger||0)+1;const g=f().ger;if(g<7)return say(['Une plante verte. Lou lui parle tous les matins. Elle s\'appelle Gérard.','Gérard ne dit rien. Gérard est une plante.','Tu as l\'impression que Gérard t\'écoute.','Gérard bouge une feuille. Sûrement un courant d\'air.','…Gérard ?','Tu dis bonjour à Gérard. Gérard ne répond pas. Évidemment.'][g-1]);
 if(g===7){await say('…Une baie tombe de la plante et roule à tes pieds. Merci, Gérard.');give('baieprisme',2);return say('Tu reçois 2 Baies Prisme ! (Ne le dis pas à Lou.)')}return say('Gérard a l\'air satisfait.')}
// Mémé Rosa se souvient de la danse des Lapilune
async function rosaLapilune(){const R='Mémé Rosa';if(ownSp('lapilune')){f().rosaQ=3;await say('Oh… un Lapilune ! Je n\'en avais plus vu depuis mes quinze ans…',R);
  await say('Quand j\'étais petite, les nuits duraient jusqu\'à l\'aube. Les Lapilune dansaient sur la Rive Brumeuse, et on dansait avec eux.',R);
  await say('Ma grand-mère disait que les fondateurs avaient endormi la nuit pour que les récoltes ne gèlent plus. Ils avaient promis de la réveiller un jour… Ils ont oublié, je crois.',R);
  give('crepuscapsule',5);return say('Tiens, mon petit. Pour les créatures de la nuit. Tu reçois 5 Crépuscapsules !',R)}
 return say('Tu sais, les nuits claires, il paraît qu\'on voit encore des Lapilune danser sur la Rive Brumeuse. Si tu en vois un, montre-le-moi, veux-tu ?',R)}

// =====================================================================
// EXTENSION 7.0 — Coteaux d'Aurore, village de Lunévie (qui vit la nuit), Arène Crépuscule, Sanctuaire du Cycle.
// Arc narratif : Caïus (admin rival de Sélène), Vex qui se montre enfin, le passé de Valen chez sa grand-mère,
// les doutes de Kael ; post-game : Crépuscel, Présagelle, Défi du Crépuscule, fossile, Super Canne.
// =====================================================================
const tod=(j,n,e,b)=>()=>f().balance&&b?b:act2()&&e?e:night()?n:j;   // réplique selon jour / nuit / éclipse / équilibre retrouvé
MAPS.ville.rows0=null;MAPS.ville.rows[0]="TTTTTTTTTTT==TTT^^^TTT";MAPS.ville.edges.n=['coteaux',0];
MAPS.ville.npcs.push({x:11,y:1,t:'miner',d:0,name:'Mineur',cond:()=>!f().badge,say:'Éboulement sur les Coteaux d\'Aurore ! On dégage la route… Reviens quand tu auras prouvé ta valeur à l\'Arène.'},
 {x:9,y:12,t:'girl',d:2,name:'Habitante',wan:1,say:tod('On dit que la Team Éclipse fouille les Coteaux, au nord. Qu\'est-ce qu\'ils cherchent ?','La nuit, les mineurs chantent pour que les Rocaton s\'endorment.','Le soleil ne revient pas… Les mineurs refusent de descendre dans le noir total.','Les nuits sont longues, maintenant. Les mineurs disent que la roche respire mieux.')});
const STEP0=MAPS.ville.step;

// --- Coteaux d'Aurore (route 3) : vignes, cratères de météores, autel des fondateurs
MAPS.coteaux={name:'Coteaux d\'Aurore',bg:'plaine',amb:'day',mus:'route',edges:{s:['ville',0],n:['lunevie',0]},
 rows:["TTTTT==TTTTTTTTTTTT^^@^T","T,,,,..,,,TT.....C....,T","T,,,,..,,,TT..........,T","T....=========.ooo....,T","TT..=......S.......,,,.T","T,,,=,,,TTTTTT..,,,,,,.T","T,,,=,,,TT^^^^...,,,,..T","T...=...TT^^^^......o..T","T...=........f.....,,,.T","T.o.==========........,T","T,,,,,,,..f..=.^^^^^..,T","T,,,,,,,.....=.^^^^^...T","T..TT...,,,,.=.....,,,.T","T..TT...,,,,.=.o...,,,.T","T.......,,,,==.....f...T","TTTTTTTTTTT==TTTTTTTTTTT"],
 enc:[['pissenlou',15,17,18,'j'],['piafou',15,17,14,'j'],['herissou',16,18,16],['lueurette',16,18,14,'n'],['ombrelin',16,18,10,'n'],['nuageon',16,18,16,'r'],['meteosaur',17,19,6],['relicat',17,19,5],['oeillombre',18,20,22,'e']],
 signs:{'11,4':'COTEAUX D\'AURORE\nNord : Lunévie, le village qui vit la nuit.','17,1':'AUTEL DE L\'AUBE\n"Ici, les fondateurs déposèrent le premier Éclat, en gage de paix entre le jour et la nuit."'},
 hidden:[{x:16,y:2,it:'fossile',q:1,id:'fos1'},{x:1,y:13,it:'pierreorage',q:1,id:'cot2'}],
 doors:{'21,0':sanctuaireDoor},
 npcs:[I(2,9,'superpotion',2,'cot1'),I(22,12,'biscuit',2,'cot3'),BT(20,7,'cot','baiesoin'),
  {x:6,y:8,t:'botanist',d:3,tr:TR('ambre','Vigneronne Ambre',[['pissenlou',16],['larvigne',17],['racinou',17]],650,'Mes vignes, mes règles ! Et ma règle, c\'est : on se bat !','Bon, bon… tu peux goûter un raisin.',{post:tod('Les Pissenlou adorent mes vignes. Ils dorment dessus en plein soleil.','La nuit, les Lueurette viennent danser entre les rangs. C\'est joli… mais ça brûle les feuilles.','Pas de soleil, pas de raisin. Cette éclipse va ruiner la récolte.','Le soleil se lève, la nuit tombe… Mes vignes n\'ont jamais été aussi belles.')})},
  {x:20,y:9,t:'mountaineer',d:2,tr:TR('basile','Randonneur Basile',[['herissou',17],['rocaillon',17],['meteosaur',18]],700,'Tu as vu les cratères ? Des météores ! Et mes créatures sont aussi dures qu\'eux !','Écrasé comme un caillou…',{post:'Les Météosaur tombent du ciel les nuits d\'étoiles filantes. Il y en a un qui creuse près des cratères, en haut.'})},
  {x:13,y:2,t:'grunt',d:0,cond:()=>f().badge&&!f().cot,tr:TR('gc1','Sbire Éclipse',[['ratounet',16],['oeillombre',17]],500,'Halte ! L\'autel est en "maintenance" !','Grr… L\'admin Caïus va me tuer.',{post:'L\'admin Caïus et l\'admin Sélène se disputent encore…'})},
  {x:19,y:3,t:'grunt',d:2,cond:()=>f().badge&&!f().cot,tr:TR('gc2','Sbire Éclipse',[['nocturelle',17],['ombrelin',17]],500,'Tu ne passeras pas !','…D\'accord, tu passes.',{post:'Caïus dit que Vex est trop tendre. Moi, je dis rien. Je tiens à mes oreilles.'})},
  {x:3,y:13,t:'old',d:0,name:'Vieux berger',say:tod('Les fondateurs ont posé l\'autel tout là-haut pour être plus près du ciel. Du jour… et de la nuit.','Regarde les étoiles filantes ! Chacune, dit-on, est un Éclat qui cherche sa maison.','Même les Météosaur se cachent. Le ciel ne leur dit plus rien.','La porte du sanctuaire, en haut à droite… je l\'ai entendue s\'ouvrir. Après tant de siècles !')}],
 step:async()=>{if(f().badge&&!f().cot&&G.y<=3&&G.x>=12&&G.x<=20){await shrineScene();return true}}};

async function shrineScene(){f().cot=1;const P='coteaux',ca=tmpN(P,{x:16,y:2,t:'caius',d:0,name:'Caïus'}),se=tmpN(P,{x:18,y:2,t:'selene',d:0,name:'Sélène'});await cine(1);await camTo(17,2,700);
 await say('Écarte-toi, Sélène. Il y a un Éclat d\'Aube sous cet autel, et je vais le sortir. Quitte à tout casser.','Caïus',0,'caius');faceTo(se,ca.x,ca.y);
 await say('C\'est un autel des fondateurs, Caïus. Vex a été clair : rien n\'est détruit sans nécessité.','Sélène',0,'selene');faceTo(ca,se.x,se.y);
 await say('Vex est devenu tendre. Et toi, tu es sa petite ombre fidèle. Le jour où je dirigerai la Team, on ne demandera plus la permission au ciel.','Caïus',0,'caius');await emote(se,'…',800);
 await camBack(400);await bang(ca);faceTo(ca,G.x,G.y);await say('Tiens… le gamin de la mine. Parfait. J\'avais besoin de me défouler.','Caïus',0,'caius');await cine(0);
 const r=await battle([mon('ombrelin',19),mon('magmor',20),mon('noctyrex',21)],{tr:{name:'Admin Caïus',look:'caius',money:1800,vs:1,boss:1,items:1,ev:1,after:'Impossible…'}});
 if(r!=='win'){rmN(P,ca);rmN(P,se);f().cot=0;return}
 await cine(1);await say('Impossible… Battu par un gamin.','Caïus',0,'caius');const v=tmpN(P,{x:17,y:1,t:'vex',d:0,name:'Vex'});puff(17,1,'#c060ff',16);sfx('door');musStop();await wait(400);
 faceTo(ca,v.x,v.y);faceTo(se,v.x,v.y);await say('Ça suffit, Caïus.','Vex',0,'vex');await emote(ca,'!',500);await say('…Chef.','Caïus',0,'caius');
 faceTo(v,G.x,G.y);await say('Toi. On s\'est déjà croisés, toi et moi. Tu crois que la lumière est toujours gentille ?','Vex',0,'vex');
 await say('Demande aux créatures qui s\'éteignent chaque été parce que la nuit ne leur laisse pas le temps de dormir. Moi, j\'ai demandé. Personne n\'a répondu.','Vex',0,'vex');
 await say('Garde ton Éclat d\'autel. Je n\'ai pas besoin de casser des pierres anciennes pour rendre la nuit au monde.','Vex',0,'vex');puff(17,1,'#c060ff',16);rmN(P,v);puff(16,2,'#c060ff',10);rmN(P,ca);musPlay('route');await wait(300);
 faceTo(se,G.x,G.y);await say('…Il n\'était pas comme ça, avant. Il riait. Il pêchait sur le ponton avec son Ombrelin.','Sélène',0,'selene');
 await say('Tiens. Il le portait toujours sur lui. Je l\'ai ramassé quand il l\'a jeté, le jour où il est devenu Vex. Je n\'arrive plus à le garder.','Sélène',0,'selene');
 G.keys.medaillon=1;jingle('item');await say('Tu reçois le MÉDAILLON DE BRUME. Un nom est gravé au dos : "Brume".');
 await say('Sa grand-mère vit à Lunévie, au nord. Elle saura ce qu\'il faut en faire… mieux que moi.','Sélène',0,'selene');puff(18,2,'#d8d4ec',10);rmN(P,se);await cine(0);save()}

async function sanctuaireDoor(){if(!f().balance)return say('Une porte de pierre scellée dans la falaise. On y voit un soleil et une lune gravés côte à côte, chacun tendant la main vers l\'autre. Elle ne bouge pas.');return warp('sanctuaire',6,10,1)}

// --- Lunévie : le village qui vit la nuit (le jour, presque tout le monde dort)
MAPS.lunevie={name:'Lunévie',bg:'plaine',amb:'day',mus:'town',edges:{s:['coteaux',0]},fish:[['miroitruite',18,22,60],['tetardin',16,20,40]],fish2:[['lumipeche',20,24,50],['nuageon',18,22,30],['miroitruite',20,24,20]],
 rows:["TTTTTTTTTTTTTTTTTTTTTT","TT..........,,,,,,..TT","TT.......f..........TT","TT.RRRRR....AAAAA...TT","TT.RRRRR....AAAAA...TT","TT.WnWDW....WnWDW...TT","TT....=..l.....=....TT","TT....==========....TT","TT..........=.......TT","TTYYYYYY....=GGGGG..TT","TTYYYYYY....=GGGGG..TT","TTWnWDWn....=WnDnW..TT","TT...=......=..=....TT","TT...==========.....TT","TT~~~~H.......=.S.C.TT","TT~~~~H.......=.....TT","TT~~~~...BBBBB=.....TT","TT~~~f...BBBBB=..f..TT","TT.......WnDnW=.....TT","TT...=====.=..=.....TT","TTTTT==TTTTTTTTTTTTTTT"],
 enc:[['lapilune',18,21,30,'n'],['hiboulume',18,21,12,'n'],['lueurette',17,20,20,'n'],['pissenlou',16,19,30,'j'],['peluchon',17,19,8],['oeillombre',19,21,5,'n'],['oeillombre',19,21,24,'e']],
 signs:{'16,14':'SANCTUAIRE DE LUNE\n"Que la nuit soit longue pour ceux qui en ont besoin, et le jour clair pour ceux qui l\'attendent."'},
 doors:{'6,5':['maisonY',4,5,1],'15,5':['maisonP',4,5,1],'5,11':gym3Door,'15,11':()=>center('Lunévie',['lunevie',15,12]),'11,18':shop},
 npcs:[{x:9,y:7,t:'old',d:0,name:'Veilleur Anselme',say:tod('Chut… Lunévie dort le jour. Ici, on vit la nuit : elles sont si courtes qu\'on n\'en perd pas une miette.','Bienvenue à Lunévie ! Le marché ouvre à minuit, l\'Arène aussi. Profite, la nuit file vite.','L\'éclipse… Les jeunes dansent dans les rues. Moi, j\'ai peur. Une nuit qui ne finit pas, ce n\'est plus une nuit.','Les nuits durent jusqu\'à l\'aube, maintenant. On fait la fête… et on dort enfin le matin !')},
  {x:17,y:13,t:'astro',d:0,name:'Astronome Lys',time:'n',fn:lysTalk,qm:()=>f().lysQ===1&&ownSp('meteosaur')},
  {x:6,y:14,t:'valen',d:2,name:'Valen',time:'n',cond:()=>f().medGiven,say:()=>'Brume aimait ce genre de nuit. Longue, calme… Je crois qu\'il aurait aimé te connaître.'},
  {x:7,y:14,t:'rival',d:2,name:'Kael',time:'n',cond:()=>f().medGiven,fn:kaelPonton},
  {x:4,y:12,t:'girlkid',d:1,name:'Petite Mila',time:'n',wan:1,say:tod('','Les Lapilune viennent boire au lac quand la lune est ronde. Il faut pas faire de bruit !','Maman dit que c\'est la nuit pour toujours. C\'est génial ! …Hein, c\'est génial ?','Les Lapilune dansent toute la nuit, maintenant. Moi aussi !')},
  {x:13,y:8,t:'girl',d:2,name:'Marchande endormie',time:'j',say:'Zzz… Revenez ce soir… Zzz… Les Pierres Lunaires sont… à la Boutique… Zzz…'},
  {x:6,y:15,t:'fisher',d:2,name:'Pêcheur Jo',say:()=>G.keys.rod2?'Avec la Super Canne, lance ta ligne au bout du ponton. Ça mord plus profond !':'Le lac de Lunévie est profond. Ma Super Canne y attrape des merveilles. Passe chez moi, la maison au toit rouge.'},
  {x:17,y:15,t:'selene',d:2,name:'Sélène',cond:()=>f().cot&&!f().obsScene&&night(),fn:seleneLune}]};
async function lysTalk(){const A='Astronome Lys';if(f().lysQ===2&&G.bag.poussiere){await say('De la poussière d\'étoile ! Je t\'échange ce que tu veux contre quelques grains.',A,0,'astro');if(await lysTrade())return}if(f().lysQ===2)return say(f().balance?'Solarion et Nocturion… Le jour est une phrase, la nuit est sa respiration.':'Mon Météosaur vient de ton ciel. Chaque nuit, je regarde la même étoile. Merci encore.',A,0,'astro');
 if(!f().lysQ){f().lysQ=1;await say('Les fondateurs ont endormi Nocturion pour que les récoltes ne gèlent plus. Mais un monde sans vraie nuit, c\'est une phrase sans point.',A,0,'astro');
  return say('Dis… tu as déjà vu un Météosaur ? Ils tombent avec les étoiles filantes, sur les Coteaux. Montre-m\'en un, et je te donnerai un morceau de ciel.',A,0,'astro')}
 if(!ownSp('meteosaur'))return say('Un Météosaur, sur les Coteaux d\'Aurore. Ils sont rares… regarde près des cratères.',A,0,'astro');
 f().lysQ=2;await say('Un Météosaur ! Regarde sa carapace : on dirait une carte des étoiles. Tiens, c\'est tombé du ciel la même nuit que lui.',A,0,'astro');give('pierrelune',1);give('pierreorage',1);jingle('item');await say('Tu reçois une PIERRE LUNAIRE et une PIERRE ORAGE !');save()}
async function kaelPonton(){const K='Kael',d=Math.floor(G.t/CYC);if(!f().kp){f().kp=1;await say('Tu sais quoi ? Valen m\'a appris à pêcher, cette nuit. Il est nul. Il fait fuir tous les poissons.',K);
  await say('…Merci. Je n\'aurais pas pu le ramener tout seul.',K);await emote('me','♪',600)}
 if(f().kpDay===d)return say('Demain soir, revanche ! Valen arbitrera. Il dit qu\'il sera impartial. Menteur.',K);if(!await ask('Kael propose un combat. Accepter ?'))return;
 const rs=f().rs||'goutelin',lv=Math.min(70,Math.max(45,...G.party.map(m=>m.lv)));const r=await battle([mon('faucaube',lv-2),mon('pissenlion',lv-2),mon('orageon',lv-1),mon(SP[rs].evo[1],lv)],{tr:{name:'Kael',look:'rival',money:3000,vs:1,boss:1,items:1,ev:1,after:'Encore ! Valen, t\'as vu ça ?!'}});
 if(r==='win'){f().kpDay=d;give('biscuit',2);await say(['Valen rigole. Ça fait des années que Kael ne l\'avait pas entendu rire.','Valen applaudit doucement. Kael fait semblant de ne pas être fier.'][d%2])}save()}
async function seleneLune(){if(f().selL)return say('La nuit est belle, ici. Valen aurait aimé ce village.','Sélène',0,'selene');f().selL=1;await cine(1);
 await say('Oh… toi. Je viens ici quand je n\'arrive plus à penser. La Team ne connaît pas cet endroit.','Sélène',0,'selene');
 await say('Tu sais pourquoi je l\'ai suivi ? Parce qu\'il était le seul à pleurer pour une créature que personne ne connaissait.','Sélène',0,'selene');
 await say('Mais pleurer ne donne pas raison. Si Nocturion se réveille sans le jour pour lui répondre… je ne sais pas ce qui restera.','Sélène',0,'selene');await emote('me','…',600);
 await say('Prends ça. Je n\'en aurai pas besoin là où je vais.','Sélène',0,'selene');give('crepuscapsule',3);await say('Tu reçois 3 Crépuscapsules !');await cine(0);save()}

// --- Maison d'Ysolde, grand-mère de Valen et Kael
MAPS.maisonY={name:'Maison d\'Ysolde',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCCFFCCFX","XFFFFFFFX","XFFrrrFFX","XFFrrrFFX","XCFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf2'},{x:2,y:1,k:'shelf3'},{x:5,y:1,k:'nightLamp'},{x:6,y:1,k:'plantPot'},{x:1,y:5,k:'dresser'}],wdeco:[{x:3,k:'window'},{x:7,k:'frameA'}],
 doors:{'4,6':['lunevie',6,6,0]},
 acts:{'1,1':()=>say('Des livres d\'astronomie, et un cahier d\'enfant : "Les constellations de Valen, 8 ans". Chaque étoile porte le nom d\'une créature.'),'2,1':()=>say('Un vieux fil de pêche, soigneusement enroulé. "Pour le ponton", dit une étiquette.'),'5,1':()=>closeUp('photo3',5,1),'6,1':()=>say('Une plante. Quelqu\'un a planté un petit drapeau dedans : "Kael a gagné".'),'1,5':()=>say('Une écharpe d\'enfant, violette. Trop petite pour Kael. Brodé dessus : "V".')},
 npcs:[{x:4,y:2,t:'ysolde',d:0,name:'Grand-mère Ysolde',fn:ysoldeTalk}],enter:async()=>{if(f().cot&&!f().ysL)await ysoldeScene()}};
async function ysoldeScene(){f().ysL=1;const P='maisonY',Y=MAPS.maisonY.npcs[0],k=tmpN(P,{x:6,y:3,t:'rival',d:2,name:'Kael'}),YN='Grand-mère Ysolde';await cine(1);await emote(k,'!',500);
 await say('Toi ? Qu\'est-ce que tu fais chez ma grand-mère ?!','Kael');await say('Kael, sois poli. Entre, entre. Tu as l\'air d\'avoir marché longtemps.',YN,0,'ysolde');
 if(G.keys.medaillon){await say('Tu tends le Médaillon de Brume.');await emote(Y,'!',700);await say('Ce médaillon… C\'est celui de Brume. L\'Ombrelin de Valen.',YN,0,'ysolde');await emote(k,'!',500);await say('…Valen ? Tu l\'as vu ?! Où ?!','Kael')}
 await say('Valen est le grand frère de Kael. Petit, il passait toutes ses nuits sur le ponton de Port-Miroir, avec Brume, son Ombrelin.',YN,0,'ysolde');
 await say('Un été, les nuits ont été si courtes que Brume n\'a jamais pu se reposer. Un matin, il ne s\'est pas réveillé.',YN,0,'ysolde');
 await say('Valen n\'a plus jamais été le même. Il disait que le soleil avait tué son ami. Un jour, il est parti. On dit qu\'il se fait appeler Vex, maintenant.',YN,0,'ysolde');
 await emote(k,'…',900);await say('Je le savais. Je l\'ai reconnu, à la mine, sous sa capuche. Mais je ne voulais pas y croire.','Kael');
 await say('Et… s\'il avait raison ? Si le monde avait vraiment volé la nuit aux créatures comme Brume ?','Kael');
 await say('Le jour et la nuit ne sont pas des ennemis, mes enfants. Les fondateurs l\'ont oublié en endormant Nocturion. Valen l\'oublie à son tour.',YN,0,'ysolde');
 await say('…J\'ai besoin de me vider la tête. Toi. On se bat. Maintenant.','Kael');await cine(0);
 const rs=f().rs||'goutelin',r=await battle([mon('faucaube',21),mon('volticelle',21),mon(SP[rs].evo[1],24)],{tr:{name:'Kael',look:'rival',money:1500,vs:1,boss:1,items:1,after:'…Ça va mieux. Merci.'}});
 await cine(1);faceTo(k,G.x,G.y);await say(r==='win'?'Tu es toujours un pas devant moi. Ça m\'énerve… et ça me rassure.':'Ha ! Pas aujourd\'hui. Mais tu t\'es bien battu.','Kael');
 await say('Si je retrouve Valen, je ne veux pas le battre. Je veux le ramener. Tu m\'aideras ?','Kael');await emote('me','!',500);
 if(G.keys.medaillon)await say('Garde ce médaillon, petit. Rends-le-lui le jour où tu le verras. Il comprendra.',YN,0,'ysolde');
 puff(6,3,'#ffffff',10);rmN(P,k);await cine(0);healAll();save()}
async function ysoldeTalk(){const YN='Grand-mère Ysolde';if(f().balance&&f().medGiven)return say('Valen est passé. Il est resté toute la nuit sur le ponton, avec Kael. Comme avant. Merci, petit.',YN,0,'ysolde');
 return say(act2()?'Valen a fait ça… Je le sens. Va le trouver, s\'il te plaît. Avant qu\'il ne se perde complètement.':f().balance?'Les nuits sont revenues. Si tu revois Valen, dis-lui que sa grand-mère l\'attend avec une soupe.':'Repose-toi un peu si tu veux. Une grand-mère a toujours une soupe sur le feu.',YN,0,'ysolde')}

// --- Maison du pêcheur Jo : la Super Canne
MAPS.maisonP={name:'Maison de Jo',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCCFFFCFX","XFFFFFFFX","XFFFCCFFX","XFFFCCFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf0'},{x:2,y:1,k:'kitchen',w:1},{x:6,y:1,k:'fridge'},{x:4,y:3,w:2,h:2,k:'bigTable'}],wdeco:[{x:4,k:'window'}],doors:{'4,6':['lunevie',15,6,0]},
 acts:{'1,1':()=>say('"Les grands poissons d\'Aurélys", "Pêcher la nuit", "Mon ami le Miroitruite". Jo a des lectures très ciblées.')},
 npcs:[{x:6,y:4,t:'fisher',d:2,name:'Pêcheur Jo',fn:joTalk,qm:()=>!G.keys.rod2&&ownSp('miroitruite')}]};
async function joTalk(){const J='Pêcheur Jo';if(G.keys.rod2)return say('Les Lumipêche aiment les eaux profondes. On dit qu\'en grandissant, ils deviennent les seigneurs des abysses…',J,0,'fisher');
 if(!G.keys.rod)return say('Tu n\'as même pas de canne ? Va voir le Vieux Gus à Bourg-Lueur, et reviens me voir.',J,0,'fisher');
 if(!ownSp('miroitruite'))return say('Montre-moi un Miroitruite, et je te confierai ma vieille Super Canne. Ils mordent à Port-Miroir et sur la Rive Brumeuse.',J,0,'fisher');
 await say('Un Miroitruite ! Regarde ces écailles… On y voit le ciel de demain. Tu mérites ma Super Canne.',J,0,'fisher');G.keys.rod2=1;jingle('item');
 await say('Tu reçois la SUPER CANNE ! Elle atteint les eaux profondes : de nouvelles créatures mordront dans certains lacs et au port.');save()}

// --- Arène Crépuscule (n'ouvre que la nuit) : Championne Orane, l'équilibre entre LUMIÈRE et OMBRE, salle plongée dans le noir
async function gym3Door(){if(!night()&&!f().badge3&&!f().balance)return say('Une pancarte : "ARÈNE CRÉPUSCULE. Ouverture à la nuit tombée. La Championne Orane ne combat qu\'à la lumière des étoiles."');return warp('gym3',5,7,1)}
MAPS.gym3={name:'Arène Crépuscule',bg:'tech',amb:'in',floor:'stone',cstyle:'statue',dark:1,dark2:1,mus:'gym',rows:["XXXXXXXXXXXX","XFFFFFFFFFFX","XFCFFFFFFCFX","XFFFFrrFFFFX","XFFFFrrFFFFX","XCFFFrrFFFCX","XFFFFrrFFFFX","XFFFFrrFFFFX","XXXXXEEXXXXX"],
 doors:{'5,8':['lunevie',5,12,0],'6,8':['lunevie',5,12,0]},
 npcs:[{x:5,y:1,t:'orane',d:0,los:0,fn:n=>orane(n),tr:TR('orane','Championne Orane',[['lapilune',23,['lueur','clairlune','hate','aube']],['brumelle',23],['hiboulume',24,['soin','hypnose','aube','picpic']],['anubrume',25]],3000,
   'Je suis Orane. Le jour, je dors ; la nuit, j\'écoute le ciel. Mes créatures sont de LUMIÈRE et d\'OMBRE, comme le Cycle. Si tu ne comprends pas l\'équilibre, tu perdras.',
   'Tu as trouvé ta lumière dans le noir. C\'est rare.',{vs:1,boss:1,items:2,ev:1,post:'Le jour et la nuit sont deux moitiés d\'un même souffle. Ne l\'oublie jamais, même quand quelqu\'un te dira le contraire.',
   win:async()=>{f().badge3=1;await badgeGet('BADGE CRÉPUSCULE',ICO.bCre);give('pierrelune',1);await say('Orane te remet aussi une PIERRE LUNAIRE. Certaines créatures changent à son contact.');
    await say('Les fondateurs ont cru protéger le monde en endormant la nuit. Ils ont seulement déplacé la douleur. Souviens-t\'en, quand tu feras face à Vex.','Orane',0,'orane')}})},
  {x:2,y:6,t:'scout',d:3,tr:TR('veil1','Veilleuse Inès',[['lumignon',21],['lapilune',22]],800,'Dans le noir, je vois tout. Et toi ?','Je n\'ai rien vu venir…',{post:'Une créature FEU, ÉLEC ou LUMIÈRE en tête éclaire la salle. Pense-y !'})},
  {x:9,y:4,t:'camper',d:2,tr:TR('veil2','Guetteur Rémi',[['ombrelin',22],['nocturelle',22]],800,'Les étoiles m\'ont annoncé ta défaite !','Les étoiles se trompent parfois…',{post:'Orane n\'a jamais perdu à la lumière du jour. Normal, elle ne combat que la nuit.'})}]};
async function orane(n){if(!f()['t_orane'])return trainerBattle(n);if(!f().balance)return say(n.tr.post,'Orane',0,'orane');
 const c=await choose(['REVANCHE','DÉFI DU CRÉPUSCULE','AU REVOIR'],{w:260});if(c===1)return towerRun();if(c!==0)return;const d=dayN();if(f().rm_orane===d)return say('Les étoiles ont assez parlé pour cette nuit. Reviens demain.','Orane',0,'orane');
 const r=await battle(team(REM.orane(topLv())),{tr:{name:'Championne Orane',look:'orane',money:6000,vs:1,boss:1,items:2,ev:1,after:'Ta lumière ne vacille jamais. Ni la nuit, ni le jour.'}});
 if(r==='win'){f().rm_orane=d;if(!f().rmg_orane){f().rmg_orane=1;give('poudretoile');await say(`Orane te remet ${IT.poudretoile[0]} en souvenir de ce combat !`)}}save()}

// --- Défi du Crépuscule (post-game) : combats enchaînés de difficulté croissante, record et récompenses
const TPOOL=()=>DEX.filter(k=>!['solarion','nocturion','crepuscel','presagelle','heliote','seleniote'].includes(k)&&!SP[k].evo);
async function towerRun(){const O='Orane',best=f().towerBest||0;await say(`Le Défi du Crépuscule : sept combats d'affilée, de plus en plus durs. Ton record : ${best} victoire${best>1?'s':''}. Ton équipe sera soignée avant de commencer.`,O,0,'orane');
 if(!await ask('On commence ?',O))return;healAll();let w=0;const base=Math.min(70,Math.max(40,...G.party.map(m=>m.lv)));const RW={3:['biscuit',3],5:['pierreorage',1],7:['hypercapsule',5]};
 for(;w<7;){const P=TPOOL(),team=[0,1,2].map(i=>mon(P[(Math.random()*P.length)|0],base-2+w+i));const nmT=['Veilleur','Astronome','Guetteuse','Rêveur','Noctambule','Gardienne','Ombre d\'Orane'][w];
  const r=await battle(team,{tr:{name:`${nmT} (${w+1}/7)`,look:['scout','astro','camper','climber','lumen','girl','orane'][w],money:400+w*200,vs:w===6,boss:w===6,items:w>=4?1:0,ev:w>=5?1:0}});if(r!=='win')break;w++;
  if(RW[w]){give(...RW[w]);await say(`Palier de ${w} victoires ! Tu reçois ${IT[RW[w][0]][0]} x${RW[w][1]} !`)}if(w<7&&!await ask(`${w} victoire${w>1?'s':''} ! On continue ? (Ton équipe n'est pas soignée.)`,O))break}
 if(w>best)f().towerBest=w;if(w===7&&!f().tower7){f().tower7=1;give(['griffe','grelot','amulette','orbe'][rnd(0,3)]);await say('Sept victoires… Tu as dompté le crépuscule. Prends ce trésor de l\'Arène.',O,0,'orane')}
 healAll();await say(`Fin du défi : ${w} victoire${w>1?'s':''}. ${w>best?'Nouveau record !':'Reviens quand tu veux.'}`,O,0,'orane');save()}

// --- Sanctuaire du Cycle (après l'équilibre) : Crépuscel, gardien du Cycle
MAPS.sanctuaire={name:'Sanctuaire du Cycle',bg:'plaine',amb:'day',mus:'sanct',rows:["TTTTTTTTTTTTTT","T^^^^^^^^^^^^T","T^^ff....ff^^T","T^f........f^T","T^....C.....^T","T^..........^T","T^f..f..f..f^T","T^^........^^T","TT^^^....^^^TT","TTT^^....^^TTT","TTTTT....TTTTT","TTTTTT@TTTTTTT"],
 doors:{'6,11':['coteaux',21,1,0]},signs:{},
 acts:{'6,4':()=>say('Un autel double : une moitié de pierre blanche, une moitié de pierre noire. Au centre, un creux où pourraient se tenir deux lumières.')},
 npcs:[{x:6,y:3,t:'mon',sp:'crepuscel',d:0,cond:()=>!f().legC&&f().legS&&f().legN,fn:()=>legend2('crepuscel',55,'legC','#ffffff')}],
 enter:async()=>{if(!f().sanct){f().sanct=1;await say('Un sanctuaire oublié, au sommet des Coteaux. Le soleil et la lune y brillent en même temps, au-dessus de l\'autel.');
  if(!(f().legS&&f().legN))await say('Une voix douce, dans le vent : "Reviens quand le jour et la nuit marcheront à tes côtés."')}}};
async function legend2(sp,lv,flag,col){const n=SP[sp].name,L=npcs(MAPS[G.map]).find(x=>x.sp===sp);await cine(1);if(L){rays(L.x,L.y,col,2600);await emote(L,'!',600)}ui.shake=8;sfx('roar');
 await say(sp==='crepuscel'?'Solarion et Nocturion s\'agitent dans leurs capsules… Une silhouette mi-blanche, mi-noire se forme au-dessus de l\'autel. CRÉPUSCEL, le gardien du Cycle !':`${n} te regarde comme s\'il te connaissait déjà…`);
 const ok=await ask(`Affronter ${n} ?`);await cine(0);if(!ok)return;const r=await battle([mon(sp,lv)],{legend:1});
 if(r==='catch'){f()[flag]=1;await say(`${n} a rejoint ton équipe.`)}else if(r==='win')await say(`${n} disparaît dans la lumière… Il reviendra.`)}
// Présagelle : clairière secrète, nuits claires, après l'équilibre
MAPS.clairiere.npcs.push({x:7,y:6,t:'mon',sp:'presagelle',d:2,cond:()=>f().balance&&night()&&!rain()&&!f().legP,fn:()=>legend2('presagelle',50,'legP','#c8b8f0')});

// --- Pêche profonde avec la Super Canne
MAPS.port.fish2=[['lumipeche',24,28,45],['lanterfin',30,34,15],['miroitruite',24,28,40]];MAPS.route2.fish2=[['lumipeche',20,24,40],['nuageon',18,22,40],['miroitruite',20,24,20]];

// --- Fossile : le Prof. Saule ranime la créature
async function fossilProf(){const P='Prof. Saule';if(!G.bag.fossile)return false;await say('Ce… c\'est un Fossile Ancien ! Une créature dort là-dedans depuis l\'époque des fondateurs. Laisse-moi faire.',P);G.bag.fossile--;
 await fadeTo(1,400);sfx('evo');await wait(600);await fadeTo(0,400);const m=mon('fossilame',20);dex('fossilame',2);if(G.party.length<6)G.party.push(m);else G.box.push(m);jingle('item');
 await say(`FOSSILAME s'est réveillé ! ${G.party.includes(m)?'Il rejoint ton équipe.':'Il est envoyé dans la Boîte.'}`);await say('Il a l\'air de se souvenir d\'un ciel très différent du nôtre… Prends soin de lui.',P);save();return true}

// =====================================================================
// EXTENSION 8.0 — Nuits d'étoiles filantes, la Faille (repaire de Caïus, post-game), jumeaux du Sanctuaire.
// =====================================================================
// Une nuit sur trois (hors éclipse), des étoiles filantes traversent le ciel : Météosaur plus fréquents, Nébulin au bout de la Super Canne,
// poussières d'étoile à ramasser sur les Coteaux.
const stars=()=>!!G&&night()&&!act2()&&dayN()%3===1;
MAPS.lunevie.fish2.push(['nebulin',26,30,35,'s']);
MAPS.coteaux.npcs.push(...[[7,1],[20,5],[9,12]].map(([x,y],i)=>({x,y,t:'obj',k:'stardust',cond:()=>stars()&&f()['sd'+i]!==dayN(),fn:async()=>{f()['sd'+i]=dayN();sfx('shard');puff(x,y,'#fff6c0',10);give('poussiere');await say('Tu ramasses une POUSSIÈRE D\'ÉTOILE ! Elle scintille encore.')}})));
MAPS.lunevie.npcs.push({x:13,y:2,t:'astro',d:0,name:'Apprenti Noé',cond:()=>stars(),say:()=>'Une nuit d\'étoiles filantes ! Les Nébulin tombent dans le lac de Lunévie… Il faut une Super Canne pour les atteindre, ils plongent profond.'});

// --- Poussière d'étoile : l'Astronome Lys l'échange contre des objets rares
async function lysTrade(){const A='Astronome Lys',n=G.bag.poussiere||0;if(!n)return false;
 const T=[['pierrelune',2],['pierreorage',2],['hypercapsule',1],['elixir',1],['orbe',6]],c=await choose([...T.map(([k,q])=>`${IT[k][0]} (${q} pouss.)`),'NON MERCI'],{w:300,title:`Poussières : ${n}`});
 if(c<0||c===T.length)return true;const[k,q]=T[c];if(n<q){await say(`Il m'en faut ${q}. Reviens après une nuit d'étoiles filantes !`,A,0,'astro');return true}
 G.bag.poussiere-=q;if(!G.bag.poussiere)delete G.bag.poussiere;give(k);jingle('item');await say(`Tu reçois ${IT[k][0]} !`);save();return true}

// --- La Faille : repaire de Caïus sous les Coteaux (après l'équilibre)
MAPS.coteaux.rows0=null;MAPS.coteaux.rows[7]=MAPS.coteaux.rows[7].slice(0,12)+'^'+MAPS.coteaux.rows[7].slice(13);
MAPS.coteaux.doors['12,7']=async()=>{if(!f().failleQ)return say(f().balance?'Une galerie fraîchement creusée dans la falaise. Des traces de bottes… et un symbole de la Team Éclipse, à moitié effacé. C\'est barricadé.':'La falaise est fissurée ici. On entend comme un écho, très loin à l\'intérieur.');return warp('faille',10,14,1)};
MAPS.coteaux.npcs.push({x:13,y:8,t:'selene',d:2,name:'Sélène',cond:()=>f().balance&&!f().failleDone,fn:seleneFaille,qm:()=>!f().failleQ});
async function seleneFaille(){const S='Sélène';if(f().failleQ)return say('Caïus est au fond de la Faille. Les sbires ont installé deux leviers pour couper le passage. Je t\'attends ici… s\'il te plaît, ramène-le vivant.',S,0,'selene');
 await cine(1);await say('Te voilà. Je n\'osais pas y aller seule.',S,0,'selene');
 await say('Quand Vex est rentré à Lunévie, Caïus a refusé. Il a gardé les sbires les plus durs et il creuse sous le Sanctuaire. Il dit que si le Cycle peut être réparé, il peut aussi être volé.',S,0,'selene');
 await say('Il veut la lumière de Crépuscel. Toute. Pour que plus personne ne décide à sa place quand il fait jour ou nuit.',S,0,'selene');await emote('me','!',600);
 await say('J\'ai ouvert la barricade. Les galeries sont pleines de Grumeroc : ils mangent les cailloux que les foreurs laissent derrière eux. Fais attention.',S,0,'selene');f().failleQ=1;await cine(0);save()}

MAPS.faille={name:'La Faille',bg:'grotte',amb:'cave',mus:'base',cave:1,under:'g',encAll:1,
 rows:["^^^^^^^^^^^^^^^^^^^^^^","^^^^^^^^^^^^^^^^^^^^^^","^^gggg^^gggggg^^gvvvg^","^^gggg^^gggggggggvvvg^","^^^gg^^^gggggg^^gvvvg^","^^^gg^^^^^^g^^^^^^^^^^","^^^gg^^^^^^h^^^^^^^^^^","^^^gg^^^^^^g^^^^^^^^^^","^^^gg^^^ggggggg^^^gg^^","^^^gg^^^^^^Z^^^^^^gg^^","^^^gg^^^^^^g^^^^^^gg^^","^^^k^^gvvvvgvvvvg^x^^^","^^^g^^gvvvvgvvvvggg^^^","^^^ggggvvvvgvvvvg^^^^^","^^^^^^gggggggggggg^^^^","^^^^^^^^^^EE^^^^^^^^^^"],
 enc:[['grumeroc',44,48,40],['rocaillon',44,46,15],['oeillombre',45,48,15],['magmor',44,47,15],['nocturelle',45,47,15,'n']],
 opens:{Z:['fzOpen','g']},doors:{'10,15':['coteaux',12,8,0],'11,15':['coteaux',12,8,0]},
 signs:{'10,9':'Écrit à la craie : "LEVIER GAUCHE ET LEVIER DROIT : LE PASSAGE S\'OUVRE. Ne dites pas au chef qu\'on a oublié le mot de passe."'},
 hidden:[{x:2,y:2,it:'hypercapsule',q:3,id:'fa1'},{x:20,y:4,it:'poussiere',q:3,id:'fa2'}],
 npcs:[I(5,2,'hyperpotion',3,'fa3'),I(12,2,'elixir',2,'fa4'),I(19,9,'orbe',1,'fa5'),
  {x:4,y:8,t:'obj',k:'lever',lv:'fzL',fn:faLever},{x:18,y:8,t:'obj',k:'lever',lv:'fzR',fn:faLever},OB(11,7,'boulder',{push:1}),
  {x:8,y:13,t:'grunt',d:3,tr:TR('fs1','Sbire Éclipse',[['noctyrex',45],['oeillombre',45]],1200,'Le chef Vex est parti ? Tant mieux. Caïus, lui, n\'a pas peur de salir ses mains !','Grr… Le chef va m\'enterrer ici.',{post:'Il y a deux leviers. Un derrière le rocher fissuré à gauche, un derrière le brasier à droite.'})},
  {x:14,y:11,t:'miner',d:2,name:'Foreur',tr:TR('fs2','Foreur Éclipse',[['grumeroc',46,['jetpierre','durcir','eboul','murroc'],'pierredure'],['rocaroc',46]],1300,'On creuse, on creuse… et toi, tu vas finir dans le tas de cailloux !','Ma pioche s\'est cassée…',{post:'Les Grumeroc adorent nos déblais. Ils deviennent énormes en mangeant les cailloux de la Faille.'})},
  {x:3,y:5,t:'caver',d:0,name:'Éclaireuse',tr:TR('fs3','Éclaireuse Éclipse',[['nocturelle',46,['hypnose','ombrefurtive','nuit','hate']],['eclipsoeil',47]],1300,'Je repère, j\'endors, je fuis. Simple et efficace.','Tu ne dormais pas assez, toi…',{post:'Caïus ne dort plus. Il dit que s\'il ferme les yeux, quelqu\'un d\'autre décidera pour lui.'})},
  {x:18,y:10,t:'grunt',d:0,tr:TR('fs4','Sbire d\'élite',[['abyssombre',47,null,'encensnoir'],['anubrume',47,null,'baiesoin']],1500,'Sbire d\'élite. Ça veut dire que je ne perds pas.','…Bon. Ça voulait dire autre chose, alors.',{post:'Le levier ? Vas-y. De toute façon, Caïus t\'attend.'})},
  {x:9,y:3,t:'miner',d:3,name:'Foreur',tr:TR('fs5','Chef Foreur Éclipse',[['conglolem',48,null,'pierredure'],['quetzaroc',48],['magmor',48,null,'charbon']],1800,'Plus loin, c\'est le chantier du chef. Personne ne passe sans casque !','Prends mon casque… Non, je rigole.',{post:'Caïus est juste derrière. Il parle tout seul depuis des jours.'})},
  {x:15,y:3,t:'caius',d:2,name:'Caïus',cond:()=>!f().failleDone,fn:caiusFaille}],
 enter:async()=>{if(!f().failleIn){f().failleIn=1;await say('Des galeries étayées à la hâte, des lampes qui grésillent. Au loin, des coups de pioche… et une voix qui hurle des ordres.')}}};
async function faLever(n){const on=f()[n.lv];if(on)return say('Le levier est déjà baissé.');if(!await ask('Un levier rouillé, relié à un câble. Le baisser ?'))return;
 f()[n.lv]=1;sfx('door');ui.shake=5;await wait(200);if(f().fzL&&f().fzR){f().fzOpen=1;refreshMap(G.map);sfx('shard');await say('Clang ! Quelque part dans la Faille, la barrière d\'énergie s\'éteint.')}else await say('Clac ! Un premier verrou cède. Il en reste un autre.');save()}
async function caiusFaille(n){const C='Caïus',P='faille';await cine(1);faceTo(n,G.x,G.y);
 await say('Évidemment. Toujours toi. Tu as réparé le ciel, hein ? Et après ? Qui décidera la prochaine fois que les nuits raccourcissent ?','Caïus',0,'caius');
 await say('Vex a pleuré dans les bras de sa grand-mère. Sélène est devenue gentille. Moi, je refuse d\'attendre qu\'un gamin et un dragon règlent le monde à ma place.','Caïus',0,'caius');
 await say('Sous ce sanctuaire, il y a toute la lumière du Cycle. Je la prendrai, et le jour comme la nuit m\'obéiront. Fini, la peur.','Caïus',0,'caius');await cine(0);
 const r=await battle([mon('noctyrex',54,{item:'encensnoir'}),mon('conglolem',54,{item:'pierredure'}),mon('eclipsoeil',55,{item:'baiesoin'}),mon('abyssombre',56,{item:'grelot'}),mon('anubrume',57,{item:'orbe'})],{tr:{name:'Admin Caïus',look:'caius',money:6000,vs:1,boss:1,items:2,ev:1,after:'…Encore.'}});
 if(r!=='win')return;await cine(1);await say('Encore… Pourquoi est-ce que je perds toujours face à des gens qui n\'ont même pas peur ?','Caïus',0,'caius');
 const s=tmpN(P,{x:15,y:5,t:'selene',d:1,name:'Sélène'});await wait(200);puff(15,5,'#d8d4ec',8);await walk(s,'u');faceTo(n,s.x,s.y);
 await say('Parce que la peur, ça ne se combat pas, Caïus. Ça se partage. C\'est ce que Vex a enfin compris.',`Sélène`,0,'selene');await emote(n,'…',1100);
 await say('…Je crois que je n\'ai jamais su faire ça. Partager.','Caïus',0,'caius');await say('Alors commence par une soupe. La grand-mère de Valen en fait pour tout le monde.','Sélène',0,'selene');
 await say('Hmpf. …D\'accord. Une soupe. Pas plus.','Caïus',0,'caius');puff(n.x,n.y,'#c060ff',12);f().failleDone=1;faceTo(s,G.x,G.y);
 await say('Merci. Encore une fois. Tiens : c\'était la capsule de Caïus. Il l\'avait fabriquée pour Crépuscel. Elle ne rate jamais. Choisis bien à qui tu la lances.','Sélène',0,'selene');
 give('cyclecapsule',1);jingle('item');await say('Tu reçois la CAPSULE CYCLE ! Une capture garantie, une seule fois.');
 await say('Au fond de la galerie, les foreurs ont trouvé une cavité pleine de Grumeroc. Ils n\'attendent que quelqu\'un pour leur tenir compagnie.','Sélène',0,'selene');puff(s.x,s.y,'#d8d4ec',10);rmN(P,s);await cine(0);healAll();save()}

// --- Les jumeaux du Sanctuaire (après avoir capturé Crépuscel)
MAPS.sanctuaire.npcs.push({x:3,y:5,t:'mon',sp:'heliote',d:3,time:'j',cond:()=>f().legC&&f().legH!==1&&f().legHd!==dayN(),fn:()=>twinMeet('heliote','legH','#ffd890')},
 {x:10,y:5,t:'mon',sp:'seleniote',d:2,time:'n',cond:()=>f().legC&&f().legL!==1&&f().legLd!==dayN(),fn:()=>twinMeet('seleniote','legL','#a8b8f0')});
async function twinMeet(sp,flag,col){const L=npcs(MAPS[G.map]).find(x=>x.sp===sp);await cine(1);if(L){rays(L.x,L.y,col,1600);await emote(L,'!',500)}sfx('roar');
 await say(sp==='heliote'?'Une créature solaire veille sur l\'autel. HÉLIOTE ! Elle ne se montre qu\'au grand jour.':'Une silhouette argentée flotte au-dessus de l\'autel. SÉLÉNIOTE ! Elle ne sort qu\'à la nuit.');const ok=await ask(`Affronter ${SP[sp].name} ?`);await cine(0);if(!ok)return;
 const r=await battle([mon(sp,50)],{legend:1});if(r==='catch'){f()[flag]=1;await say(`${SP[sp].name} a rejoint ton équipe.`)}else{f()[flag+'d']=dayN();await say(`${SP[sp].name} s'efface dans la lumière. Il reviendra ${sp==='heliote'?'demain, au grand jour':'la nuit prochaine'}.`)}}

// =====================================================================
// EXTENSION 9.0 — Volterre, ville de l'énergie entre la Grotte Écho et l'Observatoire.
// La Team Éclipse occupe sa Centrale pour alimenter la barrière de l'Observatoire. Arène Volt du Champion Ambroise (4e badge).
// =====================================================================
MAPS.grotte.doors['13,0']=['volterre',12,20,1];MAPS.grotte.doors['14,0']=['volterre',13,20,1];
MAPS.obs.doors['8,10']=MAPS.obs.doors['9,10']=['volterre',13,1,0];
MAPS.volterre={name:'Volterre',bg:'plaine',amb:'day',tree:'pine',mus:'town',
 rows:["TTTTTTTTTTT^^@^^TTTTTTTTTT","TT,,,,......S=......,,,,TT","TT,,,,.......=..........TT","TT..YYYYYY...=...GGGGG..TT","TT..YYYYYY...=...GGGGG..TT","TT..WnWDWn...=...WnDnW..TT","TT.....=.....=.....=....TT","TT.....=============....TT","TT.f.........=S.......l.TT","TTRRRRR......=....BBBBB.TT","TTRRRRR......=....BBBBB.TT","TTWnWDW....l.=....WnDnW.TT","TT...=.......=......=...TT","TT...================...TT","TT,,,,,,.....=....AAAAA,TT","TT,,,,,,.....=....AAAAA,TT","TT,,,,,,.....=....WnDnW,TT","TT.o,,,,.....=......=...TT","TT...........========...TT","TT,,,,,,....==......f...TT","TTTTTTTTTTTT==TTTTTTTTTTTT","TTTTTTTTTTTT==TTTTTTTTTTTT"],
 enc:[['volticelle',26,29,24],['etincelot',26,29,20],['herissou',27,29,16],['bourdonnerre',28,30,6],['nuageon',27,29,18,'r'],['ombrelin',26,29,16,'n'],['lueurette',27,29,10,'n'],['meteosaur',28,30,4],['oeillombre',28,30,20,'e']],
 doors:{'12,21':['grotte',13,1,0],'13,21':['grotte',14,1,0],'13,0':volGate,'7,5':gym4Door,'19,5':()=>center('Volterre',['volterre',19,6]),'20,11':shop,'5,11':['maisonA',4,5,1],'20,16':centraleDoor},
 signs:{'14,8':'VOLTERRE\n"Ici, le vent tourne les turbines et la foudre allume les lampes."','12,1':'TÉLÉPHÉRIQUE DE L\'OBSERVATOIRE\nAccès réservé aux dresseurs titulaires du BADGE VOLT.'},
 hidden:[{x:2,y:19,it:'pierreorage',q:1,id:'vo1'},{x:23,y:1,it:'elixir',q:1,id:'vo2'}],
 acts:{'22,8':pylon},
 npcs:[I(23,19,'hyperpotion',1,'vo3'),BT(2,8,'vol','baiesoin'),
  {x:13,y:2,t:'sailor',d:0,name:'Garde du téléphérique',cond:()=>!f().badge4&&!f().obsScene,say:()=>f().baseDone?'Le téléphérique remarche ! Mais le règlement est le règlement : il faut le BADGE VOLT d\'Ambroise.':'Plus de courant, plus de téléphérique ! La Team Éclipse a coupé toute la ville pour alimenter… je ne sais quoi, là-haut.'},
  {x:9,y:7,t:'ambroise',d:0,name:'Ambroise',cond:()=>!f().baseDone,fn:ambroiseStreet},
  {x:16,y:12,t:'old',d:2,name:'Électricien Paulin',wan:1,say:tod('Quarante ans que j\'entretiens les turbines. Et ces gamins en noir me les volent en une nuit !','La nuit, Volterre brille comme une constellation. Enfin… quand il y a du courant.','Sans soleil, les panneaux ne chargent plus. Heureusement qu\'il reste le vent.','Les turbines tournent, le soleil revient, la nuit aussi. Je n\'ai jamais eu aussi peu de travail. C\'est merveilleux.')},
  {x:7,y:12,t:'girlkid',d:1,name:'Petite Lina',wan:1,say:()=>f().baseDone?'Mon Volticelle a mangé tellement d\'électricité qu\'il brille dans le noir ! Si ta créature de tête est ÉLEC, essaie la borne près du panneau.':'Il fait tout noir chez moi… Mon Volticelle a peur. Toi aussi, tu as peur du noir ?'},
  {x:21,y:2,t:'scout',d:2,name:'Touriste',time:'j',say:'On dit que de l\'Observatoire, on voit les deux légendaires d\'Aurélys. Moi, je vois surtout des nuages.'},
  {x:10,y:17,t:'grunt',d:1,name:'Sbire Éclipse',cond:()=>!f().baseDone&&f().volArr,say:'La Centrale ? Interdit d\'entrer ! …Quoi ? Bon, d\'accord, la porte est ouverte. Mais c\'est interdit !'}],
 enter:async()=>{if(!f().volArr){f().volArr=1;await volArrive()}}};
async function volArrive(){await say('Un plateau battu par les vents, hérissé de turbines immobiles. Pas une lumière : toute la ville est en panne.');
 const a=MAPS.volterre.npcs.find(n=>n.fn===ambroiseStreet);if(a){await cine(1);await bang(a);await ambroiseStreet(a,1);await cine(0)}}
async function ambroiseStreet(n,first){const A='Ambroise';if(!first&&f().ambQ)return say('La Centrale, au sud-est. Ramène-moi mes turbines, gamin. Et sois prudent : leur commandant n\'est pas un plaisantin.',A,0,'ambroise');
 await say('Hé, toi ! Tu viens de la grotte ? Alors tu es soit très courageux, soit très perdu.',A,0,'ambroise');
 await say('Ambroise, Champion de Volterre. Ingénieur, surtout. C\'est moi qui ai construit le dôme de l\'Observatoire, il y a trente ans.',A,0,'ambroise');
 await say('Et ces voyous de la Team Éclipse ont pris ma Centrale. Tout le courant de la ville part là-haut, vers une barrière autour du dôme.',A,0,'ambroise');
 await say('Mon arène marche à l\'électricité. Pas de courant, pas de combat. Libère la Centrale, et je t\'affronterai avec plaisir.',A,0,'ambroise');f().ambQ=1;save()}
async function centraleDoor(){if(!f().volArr)return;if(f().baseDone)return warp('centrale',9,10,1);await say('Un panneau, collé de travers : "CENTRALE DE VOLTERRE — PROPRIÉTÉ DE LA TEAM ÉCLIPSE". Ils n\'ont même pas fermé à clé.');return warp('centrale',9,10,1)}
async function gym4Door(){if(!f().baseDone)return say('L\'arène est plongée dans le noir. Une pancarte : "Fermé pour cause de panne. Signé : Ambroise, de très mauvaise humeur."');return warp('gym4',5,8,1)}
async function volGate(){if(!f().badge4&&!f().obsScene)return say('Le téléphérique est à l\'arrêt. Le garde te barre le passage : il faut le BADGE VOLT.');
 await say('La cabine du téléphérique grince, puis s\'élève au-dessus des nuages…');return warp('obs',8,9,1)}
async function pylon(){const m=G.party[0];if(!f().baseDone)return say('Une borne de recharge publique. Éteinte, comme le reste de la ville.');
 if(!m||SP[m.sp].t!=='ELE')return say('Une borne de recharge publique : "Réservée aux Pixémons ÉLEC. Gratuit, une fois par jour."');
 if(f().pyl===dayN())return say(`${nm(m)} a déjà fait le plein aujourd'hui. Il crépite de bonheur.`);f().pyl=dayN();sfx('shard');ui.flash=.4;ui.flashC='#fff4a0';fullHeal(m);bondUp(m,4);await emote('fol','♪',600);
 await say(`${nm(m)} se recharge à la borne ! Il est en pleine forme et semble très content de toi.`)}

// --- Maison des Ambroise (anecdotes, indice)
MAPS.maisonA={name:'Maison de Paulin',bg:'plaine',amb:'in',style:'home',dark:1,mus:'town',rows:["XXXXXXXXX","XCCFFFCFX","XFFFFFFFX","XFFFCCFFX","XFFFCCFFX","XFFFFFFFX","XXXXEXXXX"],
 furn:[{x:1,y:1,k:'shelf1'},{x:2,y:1,k:'shelf3'},{x:6,y:1,k:'fridge'},{x:4,y:3,w:2,h:2,k:'bigTable'}],wdeco:[{x:4,k:'window'}],doors:{'4,6':['volterre',5,12,0]},
 acts:{'1,1':()=>say('Des plans de turbines, annotés à la main : "Version 37. Celle-là, elle tournera."'),'2,1':()=>say('Un album photo : Ambroise jeune, devant le dôme de l\'Observatoire en construction. À côté de lui, un homme avec un carnet sous le bras… ton père ?')},
 npcs:[{x:6,y:4,t:'granny',d:2,name:'Mamie Rosette',fn:rosetteTalk}]};
async function rosetteTalk(){const R='Mamie Rosette';if(!f().baseDone)return say('Mon frère Paulin et Ambroise se disputent depuis quarante ans pour savoir qui a inventé la turbine. Moi je dis : personne, c\'est le vent.',R,0,'granny');
 if(!f().roseG){f().roseG=1;give('superpotion',3);return say('Le courant est revenu grâce à toi ? Tiens, des Super Potions. Et repasse quand tu veux, j\'ai toujours une soupe… ah non, ça, c\'est la grand-mère de Lunévie.',R,0,'granny')}
 return say(f().badge4?'Ambroise est intenable depuis votre combat. Il raconte la bataille à tout le monde.':'Ambroise t\'attend à son arène. Il a ressorti sa salopette des grands jours.',R,0,'granny')}

// --- La Centrale (base de la Team Éclipse) : niveau 1
MAPS.centrale={name:'Centrale de Volterre',bg:'tech',amb:'tech',floor:'tech',cstyle:'tech',dark:1,mus:'base',
 rows:["XXXXXXXXXXXXXXXXXXXX","XCFFFCXFFFFFFXCFEECX","XFFFFFXFFFFFFXFFFFFX","XFFFFFXFFFFFFXFFFFFX","XXFXXXXFFFFFFXXZZXXX","XFFFFFFFFFFFFFFFFFFX","XFCCFFFFFFFFFFFFCCFX","XFFFFFFFFFFFFFFFFFFX","XFFFFFFFFFFFFFFFFFFX","XCFFFFFFFFFFFFFFFFCX","XFFFFFFFFFFFFFFFFFFX","XXXXXXXXXEEXXXXXXXXX"],
 opens:{Z:['ceCard','F']},doors:{'9,11':['volterre',20,17,0],'10,11':['volterre',20,17,0],'16,1':['centrale2',8,8,1],'17,1':['centrale2',9,8,1]},
 hidden:[{x:12,y:1,it:'hypercapsule',q:2,id:'ce1'},{x:1,y:10,it:'totalsoin',q:2,id:'ce2'}],
 acts:{'1,1':()=>docRead('vex'),'5,1':()=>docRead('caius'),'2,6':()=>docRead('prod'),'3,6':()=>docRead('prod'),'16,6':()=>docRead('compta'),'17,6':()=>docRead('compta'),'1,9':()=>docRead('code1'),'18,9':()=>docRead('selene'),'14,1':()=>docRead('code2'),'18,1':()=>say('Un écran : "ÉTAGE INFÉRIEUR — SALLE DES GÉNÉRATEURS. Accès : Commandant Orso uniquement."'),
  '15,4':cardLock,'16,4':cardLock},
 npcs:[{x:3,y:2,t:'ball',cond:()=>!G.keys.carteE,fn:async()=>{G.keys.carteE=1;sfx('item');ui.pop={ic:ICO.shard,t0:now()};await say('Tu trouves une CARTE D\'ACCÈS Éclipse, oubliée sur un bureau ! Elle porte la mention : "Salle de contrôle".')}},
  I(11,3,'superpotion',2,'ce3'),
  {x:5,y:8,t:'grunt',d:3,tr:TR('ce_g1','Sbire Éclipse',[['ratoroi',27],['ombrelin',27]],1100,'Un intrus ! Alerte ! …Ah non, l\'alarme est coupée, on n\'a plus de courant pour nous non plus.','C\'est le comble, pour une centrale…',{post:'On envoie tout le jus au dôme. Le chef dit que la barrière doit tenir jusqu\'au réveil de "l\'autre".'})},
  {x:14,y:9,t:'assistant',d:2,name:'Technicienne',tr:TR('ce_t1','Technicienne Éclipse',[['etincelot',27,['cageclair','eclair','hate','viveatk']],['volticelle',28,['cageclair','dardeclair','viveatk','eclair']]],1200,'Paralysie, puis vitesse. C\'est mathématique : tu ne bougeras plus.','Erreur de calcul…',{post:'La carte d\'accès ? Le stagiaire l\'a encore laissée traîner au bureau, à l\'ouest. Quelle équipe…'})},
  {x:3,y:3,t:'grunt',d:2,tr:TR('ce_g2','Sbire Éclipse',[['noctyrex',28]],1100,'Personne n\'entre dans le bureau du commandant !','Bon, entre. Mais ne lis pas ses mémos, c\'est privé.')},
  {x:10,y:2,t:'caver',d:0,name:'Éclaireur',tr:TR('ce_e1','Éclaireur Éclipse',[['nocturelle',28,['hypnose','ombrefurtive','vent','morsure']],['ombrelin',28]],1200,'Dors bien !','Je n\'arrive plus à dormir, moi, depuis l\'éclipse…',{post:'Le code de la salle des générateurs est noté quelque part. Le commandant oublie tout.'})}]};
async function cardLock(){if(f().ceCard)return;if(!G.keys.carteE)return say('Une porte blindée. Un lecteur clignote : "INSÉREZ VOTRE CARTE D\'ACCÈS".');sfx('ok');await say('Tu glisses la Carte d\'accès dans le lecteur… Bip !');f().ceCard=1;refreshMap(G.map);sfx('door');save()}
const DOCS={vex:'Mémo de Vex : "Le Cœur d\'Aube a brisé la moitié du sceau. Il faut encore du temps, et de l\'énergie, pour que Nocturion s\'éveille. La Centrale fournira l\'énergie. Personne ne doit être blessé."',
 caius:'Mémo de Caïus : "Vex parle de rendre la nuit aux créatures. Moi, je parle de la garder. Celui qui tient le Cycle tient le monde. Le moment venu, je saurai quoi faire."',
 prod:'Rapport de production : 87 % du courant de Volterre est détourné vers la barrière du dôme. Les 13 % restants servent à la machine à café du commandant.',
 compta:'Registre des dépenses : 600 capuches violettes, 1 dôme d\'Observatoire (emprunté), 3 tonnes de croquettes pour Noctyrex. Solde : négatif.',
 selene:'Une lettre, jamais envoyée : "Valen, est-ce que tu dors, parfois ? Je t\'ai vu parler au sceau toute la nuit. Je te suivrai, mais j\'ai peur de ce qui se réveillera. — S."',
 code1:'Post-it collé sur l\'écran : "Code des générateurs, 1er chiffre : 3. Comme le nombre de cafés qu\'il me faut pour me souvenir du code."',
 code2:'Tableau blanc : "Code — 2e chiffre : autant que les branches de notre étoile (voir logo). Le 3e est dans la salle du bas, sous la console de gauche."',
 code3:'Gravé sous la console : "3e chiffre : 1. Arrêtez de me demander. — Le commandant."'};
async function docRead(k){f()['doc_'+k]=1;sfx('sel');return say(DOCS[k])}

// --- Niveau inférieur : salle des générateurs et le Commandant Orso
MAPS.centrale2={name:'Centrale · Générateurs',bg:'tech',amb:'tech',floor:'tech',cstyle:'tech',dark:1,get dark2(){return!f().baseDone},mus:'base',
 rows:["XXXXXXXXXXXXXXXXXX","XCCCFFFFFFFFFFCCCX","XFFFFFFFFFFFFFFFFX","XFFFCCFFFFFFCCFFFX","XFFFFFFFFFFFFFFFFX","XXXXXXXZZXXXXXXXXX","XFFFFFFFFFFFFFFFFX","XFCFFFFFFFFFFFFCFX","XFFFFFFFFFFFFFFFFX","XXXXXXXXEEXXXXXXXX"],
 opens:{Z:['ceCode','F']},doors:{'8,9':['centrale',16,2,0],'9,9':['centrale',17,2,0]},
 acts:{'2,7':()=>docRead('code3'),'15,7':()=>say('Un générateur de secours. Il ronronne. Quelqu\'un a écrit dessus au feutre : "NE PAS TOUCHER (Orso)".'),'7,5':codeLock,'8,5':codeLock,
  '1,1':()=>say('Des turbines tournent à plein régime. Un câble épais monte vers le plafond, vers l\'Observatoire.'),'16,1':()=>say('Un écran : "Barrière du dôme : alimentée à 100 %. Réveil de N. : estimé dans 3 jours."')},
 hidden:[{x:16,y:4,it:'elixir',q:2,id:'ce4'}],
 npcs:[I(1,8,'hyperpotion',2,'ce5'),
  {x:4,y:7,t:'grunt',d:3,tr:TR('ce_g3','Sbire Éclipse',[['magmor',28,null,'charbon'],['ratoroi',28]],1200,'Le code ? Je ne le connais pas. Personne ne le connaît, à part le commandant. Et le post-it.','Bon, il y a peut-être aussi le tableau blanc.')},
  {x:13,y:6,t:'grunt',d:2,name:'Sbire d\'élite',tr:TR('ce_g4','Sbire d\'élite',[['noctyrex',29,null,'encensnoir'],['nocturelle',29]],1500,'Sbire d\'élite. Ça veut dire que le commandant connaît mon prénom.','Il va l\'oublier, maintenant…')},
  {x:9,y:2,t:'orso',d:0,name:'Commandant Orso',cond:()=>!f().baseDone,fn:orsoTalk}]};
async function codeLock(){if(f().ceCode)return;await say('Un clavier à code. Trois chiffres.');const D=['1','3','8','6'];let code='';for(let i=0;i<3;i++){const c=await choose(D,{w:120,title:`Chiffre ${i+1}`});if(c<0)return;code+=D[c]}
 if(code!=='381'){sfx('bump');ui.shake=6;return say('BZZT ! "Code erroné." Les documents de la Centrale devraient t\'aider.')}sfx('shard');f().ceCode=1;refreshMap(G.map);await say('Bip-bip-bip ! La barrière s\'éteint.');save()}
async function orsoTalk(n){const O='Commandant Orso';await cine(1);faceTo(n,G.x,G.y);
 await say('Tiens donc. Le gamin qui a battu Corvin, Sélène, et la moitié de mes sbires. Tu sais ce que tu fais, là ?',O,0,'orso');
 await say('Ces turbines alimentent la barrière du dôme. Coupe-les, et la barrière tombe. Et le rêve de Vex avec.',O,0,'orso');
 await say('Moi, son rêve, je m\'en moque. On me paie pour que ça tourne. Alors ça va tourner.',O,0,'orso');await cine(0);
 const r=await battle([mon('noctyrex',29,{item:'encensnoir'}),mon('magmor',29,{item:'charbon'}),mon('eclipsoeil',31,{moves:['hypnose','rayonnoir','morsure','nuit'],item:'baiesoin'})],{tr:{name:'Commandant Orso',look:'orso',money:3500,vs:1,boss:1,items:1,after:'Bon. Ça ne tournera pas.'}});
 if(r!=='win')return;await cine(1);await say('Bon. Ça ne tournera pas. Je vais devoir me trouver un vrai travail.',O,0,'orso');
 await say('Tu veux un conseil ? Là-haut, Vex ne se bat pas pour l\'argent. Ce genre de type, on ne le bat pas. On le convainc. Ou pas.',O,0,'orso');
 puff(n.x,n.y,'#c060ff',12);f().baseDone=1;await wait(300);ui.shake=10;sfx('roar');for(let i=0;i<4;i++){ui.flash=.4;ui.flashC='#fff4a0';await wait(160)}
 await say('Tu abaisses le grand levier. Les turbines ralentissent… puis repartent dans l\'autre sens. Le courant revient à Volterre !');
 const k=tmpN('centrale2',{x:8,y:8,t:'rival',d:1,name:'Kael'});puff(8,8,'#ffffff',8);await walk(k,'uu');
 await say('Hé ! J\'ai vu les lumières se rallumer de la grotte. Bien joué. …Attends, c\'est quoi, ça ?','Kael');await emote(k,'!',600);
 await say('Kael ramasse un dossier tombé du bureau d\'Orso : "Dossier personnel — VEX. Vrai nom : Valen. Ancien du ponton de Port-Miroir."');await emote(k,'…',1100);
 await say(f().ysL?'Grand-mère avait raison. C\'est vraiment lui. Mon frère est là-haut, et il va réveiller un dragon.':'Valen… C\'est le prénom de mon grand frère. Il est parti il y a des années. Ça ne peut pas être…','Kael');
 await say('Je pars devant. Je dois le voir. Bats Ambroise, prends le téléphérique, et retrouve-moi à l\'Observatoire.','Kael');puff(k.x,k.y,'#ffffff',8);rmN('centrale2',k);
 give('miettes',1);jingle('item');await say('Sur le bureau du commandant, tu trouves des MIETTES DORÉES. Orso n\'en aura plus besoin.');await cine(0);healAll();save()}

// --- Arène Volt : barrières électriques à basculer (leviers), Champion Ambroise
MAPS.gym4={name:'Arène Volt',bg:'tech',amb:'in',floor:'tech',cstyle:'tech',dark:1,mus:'gym',
 rows:["XXXXXXXXXXXX","XCFFFFFFFFCX","XFFFFFFFFFFX","XJJJJJJJJJJX","XFFFFFFFFFFX","XFFFFFFFFFFX","XQQQQQQQQQQX","XFFFFFFFFFFX","XFFFFFFFFFFX","XXXXXEEXXXXX"],
 sw:{J:()=>f().volt?'F':'Z',Q:()=>f().volt?'Z':'F'},doors:{'5,9':['volterre',7,6,0],'6,9':['volterre',7,6,0]},
 acts:{'4,9':()=>say('Une plaque : "Le courant ne passe jamais partout à la fois. Chaque levier inverse les barrières. Réfléchis avant de tirer !"')},
 npcs:[{x:2,y:8,t:'obj',k:'lever',lv:'volt',fn:voltLever},{x:9,y:4,t:'obj',k:'lever',lv:'volt',fn:voltLever},{x:2,y:2,t:'obj',k:'lever',lv:'volt',fn:voltLever},
  {x:8,y:7,t:'camper',d:2,name:'Technicien',tr:TR('vt1','Technicien Volt',[['volticelle',27],['etincelot',28]],900,'Tu as compris les leviers ? Moi, j\'ai mis trois semaines.','Court-circuité !',{post:'Les barrières du haut et du bas ne sont jamais ouvertes en même temps. C\'est tout le principe.'})},
  {x:3,y:5,t:'assistant',d:3,name:'Électricienne',tr:TR('vt2','Électricienne Mona',[['bourdonnerre',29,['dardeclair','cageclair','hate','aeropique']]],1000,'Ambroise dit que la paralysie est la plus belle invention de la nature. Après la turbine.','Je suis à plat…',{post:'Ambroise paralyse d\'abord, puis frappe avant toi. Une créature ROCHE ou une baie anti-paralysie, ça aide.'})},
  {x:7,y:2,t:'scout',d:2,name:'Apprenti',tr:TR('vt3','Apprenti Volt',[['herissou',28],['nuageon',29]],1000,'Le Champion est juste derrière moi ! Enfin, juste à côté.','Je retourne à mes câbles…')},
  {x:5,y:1,t:'ambroise',d:0,los:0,fn:n=>leaderTalk(n,'ambroise'),tr:TR('ambroise','Champion Ambroise',[['volticelle',29,['cageclair','dardeclair','hate','viveatk'],'baiesoin'],['etincelot',30,['cageclair','etincelle','hate','eclair']],['bourdonnerre',31,['dardeclair','aeropique','hate','cageclair'],'aimant'],['orageon',32,['tonnerre','cageclair','dansepluie','hate'],'baiesoin']],3200,
   'Je construis des machines depuis cinquante ans, gamin, et j\'ai appris une chose : ce qui ne bouge plus ne gagne plus. Mes créatures paralysent, puis accélèrent. Tu ne verras même pas l\'éclair !',
   'Hé hé… Court-circuit complet. Tu as plus de jus que ma Centrale !',{vs:1,boss:1,items:2,ev:1,post:()=>f().balance?'Le dôme que j\'ai construit a enfin servi à quelque chose de bien. Grâce à toi. Reviens quand tu veux une revanche !':'Le téléphérique t\'attend au nord. Là-haut, sous MON dôme, il y a un garçon qui a oublié que la nuit et le jour tournent ensemble. Va le lui rappeler.',
   win:async()=>{f().badge4=1;await badgeGet('BADGE VOLT',ICO.bVol);give('aimant');G.keys.brv2=1;jingle('item');
    await say('Ambroise te remet un AIMANT, et bricole ton Bracelet du Cycle : la jauge d\'Éveil se remplira plus vite !');
    await say('J\'ai construit le dôme de l\'Observatoire avec un astronome, Elias. Un drôle de type, toujours un carnet sous le bras. Il disait : "Un jour, ce dôme servira à réconcilier le jour et la nuit."','Ambroise',0,'ambroise');
    await say('Je n\'ai jamais compris ce qu\'il voulait dire. Toi, je crois que tu vas comprendre. Le téléphérique est à toi.','Ambroise',0,'ambroise')}})}]};
async function voltLever(){if(!await ask('Un gros levier électrique. L\'abaisser ?'))return;f().volt=f().volt?0:1;sfx('shard');ui.shake=4;ui.flash=.3;ui.flashC='#fff4a0';refreshMap(G.map);await say(f().volt?'Bzzt ! Les barrières du haut s\'éteignent… celles du bas s\'allument.':'Bzzt ! Les barrières du bas s\'éteignent… celles du haut s\'allument.')}

// =====================================================================
// EXTENSION 9.0 — L'éclipse transforme le monde : larmes de Nocturion, marée d'éclipse, statue voilée,
// rencontres d'ombre, et (après Crépuscel) une éclipse que l'on peut rappeler avec le Sablier.
// =====================================================================
// Larmes de Nocturion : 6 lueurs violettes, visibles seulement pendant une éclipse
const LARMES=[['route1',17,16],['foret',26,4],['ville',18,13],['route2',13,11],['port',20,13],['coteaux',22,1]];
LARMES.forEach(([m,x,y],i)=>MAPS[m].npcs.push({x,y,t:'obj',k:'tear',cond:()=>ecl()&&!f()['lm'+i],fn:async()=>{f()['lm'+i]=1;const n=G.keys.larmes=(G.keys.larmes||0)+1;sfx('shard');puff(x,y,'#c060ff',12);ui.flash=.3;ui.flashC='#8a5ad0';
 await say(`Une LARME DE NOCTURION ! Une goutte d'ombre, froide et brillante, qui ne s'évapore pas. (${n}/6)`);if(n===1)await say('Elle ne brille que lorsque le soleil est voilé… Il doit y en avoir d\'autres, cachées là où l\'éclipse s\'attarde.');save()}}));
// La statue de Solarion à Cendreville pleure pendant l'éclipse
MAPS.ville.acts??={};const SOLST=MAPS.ville.signs['10,1'];delete MAPS.ville.signs['10,1'];
MAPS.ville.acts['10,1']=async()=>{if(ecl()&&!G.keys.larmeS){G.keys.larmeS=1;sfx('shard');ui.flash=.5;ui.flashC=C.goldL;await say('La statue de Solarion est voilée d\'ombre… Au creux de sa main de pierre, une goutte de lumière tiède refuse de s\'éteindre.');
  return say('Tu recueilles la LARME DE SOLARION. Elle et les larmes de Nocturion semblent s\'appeler l\'une l\'autre.')}
 return SOLST&&!ecl()?say(SOLST):say(ecl()?'La statue de Solarion est voilée d\'ombre. On dirait qu\'elle baisse la tête.':'La statue de Solarion, protecteur de Cendreville. Son regard de pierre fixe le ciel.')};
// Marée d'éclipse : à Port-Miroir, la mer se retire sous le ponton et découvre une épave
MAPS.port.rows0=null;MAPS.port.rows[16]=MAPS.port.rows[16].slice(0,7)+'U'+MAPS.port.rows[16].slice(8);MAPS.port.rows[17]=MAPS.port.rows[17].slice(0,6)+'UUU'+MAPS.port.rows[17].slice(9);
MAPS.port.sw={...(MAPS.port.sw||{}),U:()=>ecl()?'.':'~'};
MAPS.port.npcs.push({x:8,y:17,t:'ball',cond:()=>ecl()&&!f().wreck,fn:async()=>{f().wreck=1;give('ruban');give('hypercapsule',2);jingle('item');await say('Dans l\'épave découverte par la marée d\'éclipse, tu trouves un RUBAN et 2 Hyper Capsules !');save()}},
 {x:5,y:13,t:'fisher',d:0,name:'Vieux marin',say:()=>ecl()?'Regarde la mer ! Elle s\'est retirée sous le ponton, comme si la lune l\'aspirait. Mon grand-père parlait d\'une épave, là-dessous…':'Quand le soleil s\'éteint en plein jour, la mer recule. C\'est arrivé une fois, il y a soixante ans. On a vu le fond, sous le ponton.'});
// Rencontres d'ombre dans les anciennes zones
MAPS.route1.enc.push(['oeillombre',8,10,10,'e'],['ricanoir',8,10,6,'e']);MAPS.foret.enc.push(['ricanoir',11,13,8,'e'],['oeillombre',11,13,10,'e']);MAPS.route2.enc.push(['eclipsoeil',22,24,4,'e'],['anubrume',22,24,4,'e']);

// Après l'équilibre : l'autel du Sanctuaire accueille les larmes (les deux moitiés du Cycle)
const SANCT0=MAPS.sanctuaire.acts['6,4'];
MAPS.sanctuaire.acts['6,4']=async()=>{if(f().amuC)return say('L\'autel double est apaisé. La moitié blanche et la moitié noire brillent d\'une même lueur.');
 if(!(G.keys.larmeS&&(G.keys.larmes||0)>=6))return say(`Un autel double : une moitié de pierre blanche, une moitié de pierre noire. Deux creux attendent une offrande.${G.keys.larmeS||G.keys.larmes?` (Larme de Solarion : ${G.keys.larmeS?'oui':'non'} · Larmes de Nocturion : ${G.keys.larmes||0}/6)`:''}`);
 await cine(1);await say('Tu déposes la Larme de Solarion dans la pierre blanche, et les six Larmes de Nocturion dans la pierre noire…');sfx('roar');ui.shake=8;for(let i=0;i<3;i++){ui.flash=.6;ui.flashC=i%2?'#ffffff':'#8a5ad0';await wait(220)}
 rays(6,4,'#ffffff',2000);await wait(600);f().amuC=1;delete G.keys.larmes;delete G.keys.larmeS;G.keys.larmesDone=1;give('amucycle');jingle('item');
 await say('Les larmes se mêlent et se figent en un pendentif mi-blanc, mi-noir : l\'AMULETTE DU CYCLE !');
 await say('Une voix, dans le vent : "Ceux qui pleurent pour le jour et pour la nuit ne sont jamais seuls. Porte-la, et ton compagnon ne dormira jamais quand tu auras besoin de lui."');await cine(0);save()};

// Le Sablier peut rappeler l'éclipse une journée, une fois Crépuscel apaisé
async function callEclipse(){f().eclD=dayN();sfx('roar');ui.shake=10;for(let i=0;i<3;i++){ui.flash=.5;ui.flashC='#3a2050';await wait(200)}refreshMap(G.map);musPlay(mapMus(MAPS[G.map]));
 await say('Le sable devient noir… Un disque d\'ombre glisse sur le soleil. L\'éclipse revient sur Aurélys, jusqu\'à la fin de cette journée.')}

// =====================================================================
// EXTENSION 9.0 — Un monde qui vit : marchande itinérante, photographe des liens, carnet de voyage,
// orages de Volterre, et le défi ultime d'Elias.
// =====================================================================
// --- Marchande itinérante : une ville différente chaque jour (le jour), avec un stock qui change
const MERCH=[['bourg',14,8],['ville',16,7],['port',16,11],['lunevie',9,8],['volterre',16,8]],merchHere=()=>{if(!G||!f().badge||night())return null;const L=MERCH.filter(([m])=>G.seen?.[m]);return L.length?L[dayN()%L.length]:null};
const MPOOL=['pierrelune','pierreorage','charbon','eaumystique','grainemiracle','aimant','pierredure','encensnoir','poudretoile','griffe','grelot','ruban','miettes','hypercapsule','elixir'];
MERCH.forEach(([m,x,y])=>MAPS[m].npcs.push({x,y,t:'vendor',d:0,name:'Marchande Zélie',cond:()=>merchHere()?.[0]===m,fn:merchTalk}));
async function merchTalk(){const Z='Marchande Zélie',d=dayN(),pick=[...MPOOL].sort((a,b)=>HSH(d,a.length*31+a.charCodeAt(1))-HSH(d,b.length*31+b.charCodeAt(1))).slice(0,5),PR={hypercapsule:1500,elixir:1800};
 if(!f().zel){f().zel=1;await say('Zélie, marchande itinérante ! Chaque jour une ville, chaque jour un stock. Ce que je vends, tu ne le trouveras dans aucune boutique.',Z,0,'vendor')}
 else await say(['Tu me retrouves toujours, toi ! Regarde ce que j\'ai déniché aujourd\'hui.','Demain, je serai ailleurs. Profites-en !','Des objets rares, à prix… rares.'][d%3],Z,0,'vendor');
 const v=(f().zelN=(f().zelN||0)+(f().zelD!==d?1:0));f().zelD=d;if(v===5&&!f().zelG){f().zelG=1;give('amulette');jingle('item');await say(`Cinq jours que tu me rends visite ! Tiens, un cadeau de fidélité : ${IT.amulette[0]}.`,Z,0,'vendor')}
 await buyMenu(pick,Object.fromEntries(pick.map(k=>[k,PR[k]||(IT[k][4]==='evo'?3000:IT[k][1]||4500)])),Z)}

// --- Photographe des liens (Port-Miroir) : photographie ta créature de tête quand votre lien est fort
MAPS.port.npcs.push({x:9,y:7,t:'girl',d:0,name:'Photographe Lise',fn:photoTalk,qm:()=>{const m=G.party[0];return m&&bondLv(m)>=4&&!(G.photos?.[m.sp]>=bondLv(m))}});
async function photoTalk(){const P='Photographe Lise',m=G.party[0];if(!m)return;const b=bondLv(m);G.photos??={};
 if(b<3)return say(`Ton ${nm(m)} est un peu raide devant l'objectif… Le lien, ça ne se force pas. Voyagez ensemble, nourrissez-le, et revenez me voir.`,P,0,'girl');
 if(G.photos[m.sp]>=b)return say(`J'ai déjà une très belle photo de ${nm(m)} ! Elle est accrochée dans mon atelier. ${b<5?'Si votre lien grandit encore, je referai un portrait.':''}`,P,0,'girl');
 await say(b>=5?`Regarde-moi ce regard ! ${nm(m)} ne voit que toi. Ne bougez plus…`:`${nm(m)} a l'air bien avec toi. Un sourire… Ne bougez plus !`,P,0,'girl');
 sfx('shard');ui.flash=1;ui.flashC='#ffffff';await wait(300);G.photos[m.sp]=b;bondUp(m,3);await emote('fol','♪',600);
 const n4=Object.values(G.photos).filter(v=>v>=4).length,n5=Object.values(G.photos).filter(v=>v>=5).length;await say(`Clic ! Lise a pris en photo ${nm(m)}. (Photos de lien fort : ${n4} · inséparables : ${n5})`);
 if(n4>=1&&!f().ph1){f().ph1=1;give('biscuit',3);await say('Pour ta première photo, Lise t\'offre 3 Biscuits Pixémon. "Ils adorent ça !"')}
 if(n5>=3&&!f().ph3){f().ph3=1;give('grelot');await say('Trois créatures inséparables ! Lise t\'offre un GRELOT ÉCHO.')}
 if(n5>=6&&!G.keys.coeur){G.keys.coeur=1;jingle('item');await say('Six portraits d\'inséparables… Lise t\'offre son plus beau cliché, glissé dans un médaillon : le COEUR DU CYCLE. Tes liens se renforceront plus vite.')}save()}

// --- Carnet de voyage (Touriste de Volterre)
const VISIT=['bourg','ville','foret','mont','route2','port','grotte','volterre','coteaux','lunevie'];
{const t=MAPS.volterre.npcs.find(n=>n.name==='Touriste');if(t){delete t.say;delete t.time;t.fn=touristTalk}}
async function touristTalk(){const T='Touriste',v=VISIT.filter(k=>G.seen?.[k]).length;if(f().carnet)return say('Mon carnet est plein, grâce à toi ! Je suis devenu guide touristique. Bon, je me perds encore, mais avec style.',T,0,'scout');
 if(v<VISIT.length)return say(`Je fais le tour d'Aurélys avec mon carnet de voyage ! Toi, tu as visité ${v} lieux sur ${VISIT.length}. Il te manque : ${VISIT.filter(k=>!G.seen?.[k]).map(k=>MAPS[k].name.split(' · ')[0]).join(', ')}.`,T,0,'scout');
 f().carnet=1;give('hypercapsule',5);give('poussiere',3);jingle('item');await say('Tu as tout visité ! Incroyable. Prends ça, je n\'en aurai plus besoin : 5 Hyper Capsules et 3 Poussières d\'Étoile.',T,0,'scout');save()}

// --- Orages de Volterre : sous la pluie, des éclairs, et un Orageon sauvage peut se montrer
MAPS.volterre.enc.push(['orageon',30,32,3,'r']);
setInterval(()=>{if(G&&mode==='world'&&G.map==='volterre'&&rain()&&Math.random()<.07){ui.flash=.35;ui.flashC='#e8f0ff';sfx('hit')}},1500);

// --- Le défi ultime d'Elias : quand Aurélys n'a presque plus de secrets pour toi
const ELIASOK=()=>f().balance&&f().badge4&&f().legC&&caught()>=60;
const DAD0=dadTalk,dadTalk2=async function(){const P='Papa';if(f().eliasWin)return say(['Je regarde encore le ciel, la nuit. Mais maintenant, c\'est pour le plaisir.','Ambroise m\'a écrit. Il veut te revoir en combat. Moi aussi, d\'ailleurs. Mais pas trop vite : mes créatures boudent encore.'][(G.t>>4)%2],P,0,'dad');
 if(ELIASOK()&&!f().eliasQ){f().eliasQ=1;await say('Tu as presque rempli ton Pixédex… et tu as même parlé à Crépuscel. Tu as fait tout ce que je n\'ai jamais réussi à faire.',P,0,'dad');
  await say('Il me reste une chose à t\'apprendre. Ou plutôt, à apprendre de toi. Rejoins-moi sous le dôme de l\'Observatoire, une nuit. Amène tes meilleures créatures.',P,0,'dad');return save()}
 if(f().eliasQ)return say('Sous le dôme, une nuit. Je t\'attendrai.',P,0,'dad');return DAD0()};
for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===DAD0)n.fn=dadTalk2;
MAPS.dome.npcs.push({x:9,y:2,t:'dad',d:0,name:'Papa',time:'n',cond:()=>f().eliasQ&&!f().eliasWin,fn:eliasBattle});
async function eliasBattle(n){const P='Papa';await cine(1);faceTo(n,G.x,G.y);await say('C\'est ici que j\'ai compris que le Cycle boitait. Ici que je suis parti. Ici que tu l\'as réparé.',P,0,'dad');
 await say('Mes créatures ont vu les nuits du Nord, les étoiles qui ne se couchent jamais. Montre-moi les tiennes. Sans retenue.',P,0,'dad');await cine(0);if(!await ask('Affronter Papa ?'))return;
 const r=await battle([mon('hiboulume',72,{item:'baiesoin'}),mon('sphinxor',73,{item:'poudretoile'}),mon('quetzaroc',73,{item:'pierredure'}),mon('orageon',74,{item:'aimant'}),mon('astrafelin',74,{item:'miettes'}),mon('novarium',76,{item:'orbe'})],{tr:{name:'Elias, astronome',look:'dad',money:12000,vs:1,boss:1,items:3,ev:1,after:'Tu as gagné. Évidemment.'}});
 if(r!=='win'){await say('Pas encore, hein ? Reviens une autre nuit. Je ne bougerai pas d\'ici.',P,0,'dad');return}
 f().eliasWin=1;await cine(1);sfx('roar');rays(n.x,n.y,C.goldL,2000);await wait(600);await say('Tu as gagné. Évidemment. Je l\'ai su le jour où ta mère m\'a écrit que tu étais parti avec ton premier Pixémon.',P,0,'dad');
 await say('Tiens. C\'est l\'étoile que j\'ai suivie jusqu\'au Nord. Je l\'ai fait tailler dans une Pierre Lunaire. Elle est à toi, maintenant.',P,0,'dad');G.keys.etoile=1;give('orbe');give('cyclecapsule');jingle('badge');
 await say(`Tu reçois l'ÉTOILE D'ELIAS, ${IT.orbe[0]} et une Capsule Cycle ! Ta Carte de Dresseur porte désormais l'Étoile.`);await say('Rentrons. Lou va vouloir tout savoir. Et ta mère a sûrement fait un gâteau.',P,0,'dad');await cine(0);save()}

function mapRows(k){const M=MAPS[k];M.rows0??=M.rows.slice();return M.rows0.map((r,y)=>[...r].map((c,x)=>c==='h'&&f()[`c_${k}_${x}_${y}`]?'u':M.sw?.[c]?M.sw[c]():AFF[c]&&f()[`c_${k}_${x}_${y}`]?(M.floor?'F':M.under||'.'):M.opens?.[c]&&f()[M.opens[c][0]]?M.opens[c][1]:c).join(''))}
function refreshMap(k){const M=MAPS[k],r=mapRows(k);if(r.join()!==M.rows.join()){M.rows=r;M.L=null}buildMap(M)}
const mapMus=M=>ecl()&&(M.mus==='route'||M.mus==='foret'||M.mus==='town')?'ecl':M.mus==='town'&&night()?'nuit':M.mus;
function loadMap(map,x,y,d){EPOCH++;const ch=map!==G.map||!ui.banner;G.map=map;G.x=x;G.y=y;if(d!=null)G.dir=d;move=null;AMB=[];refreshMap(map);MAPS[map].npcs.forEach(n=>{n.x0??=n.x;n.y0??=n.y;n.d0??=n.d;n.x=n.x0;n.y=n.y0;n.d=n.d0;n.walk=0;n.rx=n.ry=null;n.ox=n.oy=0});if(ch)ui.banner={s:MAPS[map].name,t0:now()};(G.seen??={})[map]=1;faunaSpawn(map);folReset();CAMO=null;musPlay(mapMus(MAPS[map]));
 if(ch&&!G.wx&&RAINY.has(map)&&f().starter&&Math.random()<.16){G.wx={k:'rain',n:rnd(70,150)};ui.note={s:'Averse',t0:now()+900}}const sw=swarm();if(ch&&sw&&sw[0]===map)setTimeout(()=>{ui.note={s:'Essaim : '+SP[sw[1]].name,t0:now()}},1600)}
async function warp(map,x,y,d){sfx('door');await fadeTo(1,200);loadMap(map,x,y,d);await fadeTo(0,200);save();if(MAPS[map].enter)await MAPS[map].enter()}
function tryMove(d){const pd=G.dir;G.dir=d;const M=MAPS[G.map],tx=G.x+DX[d],ty=G.y+DY[d],mw=M.rows[0].length,mh=M.rows.length;
 if(folMon()&&tx===FOL.x&&ty===FOL.y&&(pd!==d||now()-(FOL.turn||0)<160)){if(pd!==d)FOL.turn=now();return}
 if(tx<0||ty<0||tx>=mw||ty>=mh){const e=M.edges?.['snwe'[d]];if(!e)return;const N=MAPS[e[0]];let nx,ny;if(d<2){nx=G.x+e[1];ny=d?N.rows.length-1:0}else{ny=G.y+e[1];nx=d===2?N.rows[0].length-1:0}run(()=>warp(e[0],nx,ny,d));return}
 const dr=M.doors?.[tx+','+ty];if(dr){run(typeof dr==='function'?dr:()=>warp(...dr));return}
 const bo=npcs(M).find(n=>n.push&&n.x===tx&&n.y===ty);if(bo){if(now()-lastBump>260){lastBump=now();run(()=>pushRock(bo,d))}return}
 const fa=npcs(M).find(n=>n.fauna&&!n.gone&&n.x===tx&&n.y===ty);if(fa){run(()=>faunaMeet(fa));return}
 if(SOLID.has(M.rows[ty][tx])||npcs(M).some(n=>n.x===tx&&n.y===ty||n.rx===tx&&n.ry===ty)){if(now()-lastBump>350){sfx('bump');lastBump=now()}return}
 move={fx:G.x,fy:G.y,tx,ty,t:0};folFollow(G.x,G.y);if(held.b)AMB.push({k:'dst',x:G.x*TS+16,y:G.y*TS+28,l:18,ml:18})}
function updWorld(dt){G.play+=dt;if(move){move.t+=dt/(held.b?95:170);if(move.t>=1){G.x=move.tx;G.y=move.ty;steps++;const s=move.sil;move=null;if(!s)run(onStep)}return}
 if(busy)return;if((FOL.tt-=dt)<=0){FOL.tt=4500;const M=MAPS[G.map];if(folMon()&&(M.hidden||[]).some(h=>!f()[hk(h)]&&Math.abs(h.x-G.x)+Math.abs(h.y-G.y)<=3)){const e={n:'fol',k:'!',t0:now()};ui.emo.push(e);sfx('sel');setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),700)}}
 faunaTick(dt);const NM=npcs(MAPS[G.map]);for(const n of NM)if((n.say||n.fn)&&!n.fix&&!n.tr&&!n.walk&&!['ball','mon','shard','obj'].includes(n.t)){n.tt=(n.tt??Math.random()*3000)-dt;if(n.tt<=0){n.tt=2200+Math.random()*3000;const d=[0,0,2,3,1][Math.random()*5|0];n.d=d;
  if(n.wan&&Math.random()<.6){const M=MAPS[G.map],tx=n.x+DX[d],ty=n.y+DY[d],c=M.rows[ty]?.[tx];if(c&&!SOLID.has(c)&&Math.abs(tx-n.x0)<=2&&Math.abs(ty-n.y0)<=2&&!(tx===G.x&&ty===G.y)&&!(move&&tx===move.tx&&ty===move.ty)&&!(tx===FOL.x&&ty===FOL.y)&&!NM.some(o=>o!==n&&(o.x===tx&&o.y===ty||o.rx===tx&&o.ry===ty))&&!M.doors?.[tx+','+ty]){n.walk=1;n.rx=tx;n.ry=ty;npcStep(n,d,320).then(()=>{n.walk=0;n.rx=n.ry=null})}}}}
 const d=['down','up','left','right'].findIndex(k=>held[k]);if(d>=0)tryMove(d)}
async function pushRock(n,d){const M=MAPS[G.map],bx=n.x+DX[d],by=n.y+DY[d],c=M.rows[by]?.[bx];
 if(c==='h'){sfx('hit');await npcStep(n,d,240);ui.shake=10;debris(bx,by,'#8a8478',12);rmN(G.map,n);n.hid=1;f()[`c_${G.map}_${bx}_${by}`]=1;refreshMap(G.map);sfx('lv');return say('Le rocher comble la faille ! Un passage s\'ouvre.')}
 if(!c||SOLID.has(c)||npcs(M).some(o=>o!==n&&o.x===bx&&o.y===by)||bx===G.x&&by===G.y){sfx('bump');return}sfx('hit');await npcStep(n,d,260);puff(n.x,n.y,'#c8b8a0',4)}
async function valve(){const hi=f().tide;if(!await ask(`Une grosse vanne marine. Marée ${hi?'haute':'basse'}. La tourner ?`))return;sfx('splash');ui.shake=8;for(let i=0;i<3;i++){ui.flash=.25;ui.flashC='#7ac8ff';await wait(140)}f().tide=hi?0:1;refreshMap(G.map);sfx('splash');
 await say(hi?'L\'eau redescend… La marée est BASSE : les ponts de marée basse émergent.':'L\'eau monte ! La marée est HAUTE : les ponts de marée haute émergent, les autres sont submergés.')}
async function forceStep(d){G.dir=d;move={fx:G.x,fy:G.y,tx:G.x+DX[d],ty:G.y+DY[d],t:0,sil:1};folFollow(G.x,G.y);while(move)await frame()}
const RAINY=new Set(['bourg','route1','ville','foret','route2','port','coteaux','lunevie','volterre']),rain=()=>G.wx?.k==='rain'&&RAINY.has(G.map);
const SWARMS=[['route1','volticelle',4,7],['route1','lumignon',4,7],['foret','larvigne',10,13],['foret','nocturelle',10,13],['mont','magmor',15,18],['mont','nocturelle',15,18],['route2','tetardin',18,22],['route2','lumignon',19,22],['grotte','rocaroc',24,27],['route2','papivigne',20,23]];
function swarm(){const day=Math.floor(G.t/CYC),L=SWARMS.filter(([m])=>G.seen?.[m]&&(m!=='route2'&&m!=='grotte'||f().r2));return L.length&&f().badge?L[(day*7919+13)%L.length]:null}
function encTable(M,k){let T=[...(M.enc||[])];const sw=swarm();if(sw&&sw[0]===k)T.push([sw[1],sw[2],sw[3],60]);if(rain()&&M.fish&&T.length){const lv=T.map(e=>e[1]);T.push([M.fish[0][0],Math.min(...lv),Math.max(...T.map(e=>e[2])),28])}return T}
const encW=e=>e[3]*(ecl()&&SP[e[0]].t==='OMB'?2:1)*(e[0]==='meteosaur'&&stars()?4:1),encOk=e=>!e[4]||(e[4]==='r'?rain():e[4]==='e'?ecl():e[4]==='s'?stars():(e[4]==='n')===night());
const pickEnc=T=>{const L=T.filter(encOk);let r=Math.random()*L.reduce((a,e)=>a+encW(e),0);return L.find(e=>(r-=encW(e))<0)||L[0]};
async function onStep(){const M=MAPS[G.map],ch=M.rows[G.y][G.x],ph=phase();G.t++;const ld=G.party[0];if(ld&&ld.hp>0&&G.t%8===0)bondUp(ld,1);if(G.t%48===0)G.party.forEach(m=>m.hp>0&&bondUp(m,1));
 if(G.t%160===0&&folMon()&&bondLv(ld)>=3&&!['in','tech'].includes(M.amb)&&Math.random()<.4){const k=['baiesoin','biscuit','potion','capsule','superpotion','baieprisme'][rnd(0,5)];await emote('fol','!',500);give(k);await say(`${nm(ld)} a déniché quelque chose ! Tu reçois ${IT[k][0]} !`);tip('flair','Quand le lien est fort, ta créature de tête déniche parfois des objets en chemin.')}if(night()&&!act2()&&M.amb!=='in')tip('nuit','C\'est la nuit ! D\'autres créatures sortent des herbes (Lumignon, Ombrelin…), et certains talents changent. Le lit de la maison permet de choisir l\'heure.');if(rain())tip('pluie','Une averse ! Pendant la pluie, les combats commencent sous la PLUIE (EAU x1,5, FEU x0,5) et des créatures d\'eau sortent des herbes.');if(G.wx&&--G.wx.n<=0){G.wx=null;if(RAINY.has(G.map))ui.note={s:'Éclaircie',t0:now()}}if(phase()!==ph&&M.amb!=='in'&&M.amb!=='cave'&&M.amb!=='tech')ui.note={s:PHN[phase()],t0:now()};
 if(ch===','||ch==='v'){sfx('grass');for(let i=0;i<4;i++)AMB.push({k:'rl',x:G.x*TS+8+Math.random()*16,y:G.y*TS+18,vx:(Math.random()-.5)*1.6,vy:-1.5-Math.random(),l:22,c:ch===','?'#7fd05a':M.cave?'#6a7a8a':'#d8743a'})}
 if(steps===40)tip('fol','Ta créature de tête te suit partout. Elle s\'agite quand un objet caché est tout proche. Appuie sur MENU pour l\'équipe, la carte et le journal.');
 if(G.repel>0&&--G.repel===0){await say('L\'effet de la Repousse se dissipe.');return}
 if(M.step&&await M.step())return;if(await checkTrainers())return;
 const tall=ch===','||ch==='v',cave=M.encAll&&ch==='g';
 if((tall||cave)&&M.enc&&G.party.some(alive)&&Math.random()<(tall?.1:.045)){const e=pickEnc(encTable(M,G.map)),lv=rnd(e[1],e[2]);if(G.repel>0&&lv<G.party.find(alive).lv)return;await battle([mon(e[0],lv,{wild:1})])}}
async function checkTrainers(){const M=MAPS[G.map];for(const n of npcs(M)){if(!n.tr||n.los===0||f()['t_'+n.tr.id])continue;let x=n.x,y=n.y;for(let k=1;k<=4;k++){x+=DX[n.d];y+=DY[n.d];if(x===G.x&&y===G.y){await bang(n);for(let i=1;i<k;i++)await npcStep(n,n.d);G.dir=OPP[n.d];await trainerBattle(n);return true}const c=M.rows[y]?.[x];if(!c||SOLID.has(c)||npcs(M).some(o=>o!==n&&o.x===x&&o.y===y))break}}return false}
async function bang(n){await emote(n,'!',750)}
function tip(id,txt2){if(!G||f()['tip_'+id])return;f()['tip_'+id]=1;ui.tip={s:txt2}}
async function tipSay(id,txt2){if(!G||f()['tip_'+id])return;f()['tip_'+id]=1;await say('Astuce : '+txt2)}
function drawTip(){const T=ui.tip;T.t0??=now();const k=now()-T.t0;if(k>6500){ui.tip=null;return}const L=wrap(T.s,W-178,1).slice(0,4),h=16+L.length*11,y=ev(Math.min(8,-h+k/3,8+(6000-k)/3));X.globalAlpha=.94;rr(40,y,W-80,h,3,C.ink);rr(42,y+2,W-84,h-4,2,'#2a2440');X.globalAlpha=1;X.drawImage(ICO.star,50,y+5,12,12);txt('ASTUCE',68,y+14,C.gold,{mini:1});L.forEach((l,i)=>txt(l,118,y+15+i*11,'#ece6d6',{s:1,sh:0}))}
// --- Mise en scène : bandes cinéma, caméra libre, émotions, déplacements scriptés, rayons, flux de particules ---
let CAMO=null;const EMO=()=>({'!':ICO.bang,'?':ICO.q,'…':ICO.dots,'♥':ICO.heart,'♪':ICO.note});
async function emote(n,k='!',ms=700){const e={n,k,t0:now()};ui.emo.push(e);sfx(k==='!'?'alert':k==='♥'||k==='♪'?'ok':'sel');await wait(ms);ui.emo.splice(ui.emo.indexOf(e),1)}
const cine=on=>tween(ui,'lb',on?1:0,320,1);
async function camTo(x,y,ms=700){CAMO??={x:G.x*TS+16,y:G.y*TS+16};await Promise.all([tween(CAMO,'x',x*TS+16,ms,1),tween(CAMO,'y',y*TS+16,ms,1)])}
async function camBack(ms=600){if(!CAMO)return;await Promise.all([tween(CAMO,'x',G.x*TS+16,ms,1),tween(CAMO,'y',G.y*TS+16,ms,1)]);CAMO=null}
async function walk(n,path,ms=200){for(const c of path){const d='dulr'.indexOf(c);if(d>=0)await npcStep(n,d,ms);else n.d='DULR'.indexOf(c)}}
async function pwalk(path){for(const c of path){const d='dulr'.indexOf(c);if(d>=0)await forceStep(d);else G.dir='DULR'.indexOf(c)}}
const faceTo=(n,x,y)=>{const dx=x-n.x,dy=y-n.y;n.d=Math.abs(dx)>Math.abs(dy)?(dx>0?3:2):(dy>0?0:1)};
async function approach(n,max=8){const M=MAPS[G.map];for(let i=0;i<max;i++){const dx=G.x-n.x,dy=G.y-n.y;if(Math.abs(dx)+Math.abs(dy)<=1)break;
  let d=Math.abs(dx)>Math.abs(dy)?(dx>0?3:2):(dy>0?0:1),tx=n.x+DX[d],ty=n.y+DY[d];if(SOLID.has(M.rows[ty]?.[tx]??'T')){d=Math.abs(dx)>Math.abs(dy)?(dy>0?0:dy<0?1:d):(dx>0?3:dx<0?2:d);tx=n.x+DX[d];ty=n.y+DY[d];if(SOLID.has(M.rows[ty]?.[tx]??'T'))break}await npcStep(n,d)}
 faceTo(n,G.x,G.y);G.dir=OPP[n.d]}
const rays=(x,y,c=C.goldL,ms=2000)=>ui.wfx.push({k:'rays',x:x*TS+16,y:y*TS+16,c,t0:now(),ms});
function stream(a,b,c,n=30){for(let i=0;i<n;i++)AMB.push({k:'st',x:a[0]*TS+16+(Math.random()-.5)*20,y:a[1]*TS+8+(Math.random()-.5)*20,tx:b[0]*TS+16,ty:b[1]*TS+8,l:60+i*2,ml:60+i*2,dl:i*2,c:Array.isArray(c)?c[i%c.length]:c})}
function puff(x,y,c='#d8c8f0',n=14){for(let i=0;i<n;i++){const a=Math.random()*6.28,v=.4+Math.random()*1.4;AMB.push({k:'pf',x:x*TS+16,y:y*TS+16,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.3,l:40,ml:40,c})}}
function debris(x,y,c='#a08a78',n=16){for(let i=0;i<n;i++)AMB.push({k:'rkd',x:x*TS+16+(Math.random()-.5)*16,y:y*TS+16,vx:(Math.random()-.5)*4,vy:-2-Math.random()*3,l:50,c:i%3?c:'#ffffff'})}
// Compagnon : la créature de tête suit le joueur, réagit, et flaire les objets cachés
const FOL={x:0,y:0,fx:0,fy:0,d:0,tt:0};
const folMon=()=>G.opt.fol!==0&&G.party[0]&&G.party[0].hp>0?G.party[0]:null;
function folReset(){const d=G.dir,bx=G.x-DX[d],by=G.y-DY[d],M=MAPS[G.map],c=M.rows[by]?.[bx],ok=c&&!SOLID.has(c);FOL.x=FOL.fx=ok?bx:G.x;FOL.y=FOL.fy=ok?by:G.y;FOL.d=d}
function folFollow(fx,fy){FOL.fx=FOL.x;FOL.fy=FOL.y;if(FOL.x!==fx||FOL.y!==fy){FOL.d=fx>FOL.x?3:fx<FOL.x?2:fy>FOL.y?0:1}FOL.x=fx;FOL.y=fy}
async function folTalk(){const m=folMon();if(!m)return;tip('fol','Ta créature de tête te suit partout. Elle s\'agite quand un objet caché est tout proche : regarde bien autour de toi !');const S=st(m),t=SP[m.sp].t,n=nm(m),r=m.st?['…',`${n} ne se sent pas très bien. Un Total Soin l'aiderait.`]:m.hp<S.hp*.3?['…',`${n} a l'air épuisé. Il aimerait se reposer.`]:night()&&t==='OMB'?['♪',`${n} danse dans l'obscurité. La nuit lui va si bien.`]:night()&&t==='LUM'?['♪',`${n} brille doucement pour éclairer ton chemin.`]:act2()?['…',`${n} lève les yeux vers le soleil voilé. Il reste près de toi.`]:FOLB[Math.min(4,bondLv(m))](n)[G.t%2];
 await emote('fol',r[0],500);await say(r[1]+` (Lien : ${BONDN[bondLv(m)]})`)}
const FOLB=[n=>[['…',`${n} t'observe d'un air prudent. Il lui faut encore du temps pour te faire confiance.`],['?',`${n} renifle ta main, encore un peu méfiant.`]],n=>[['?',`${n} te suit, curieux de tout ce que tu fais.`],['♪',`${n} trottine derrière toi en regardant partout.`]],
 n=>[['♥',`${n} te regarde avec confiance.`],['♪',`${n} sautille joyeusement derrière toi.`]],n=>[['♪',`${n} marche fièrement à tes côtés.`],['♥',`${n} pose sa tête contre toi, l'air heureux.`]],n=>[['♥',`${n} te regarde comme si tu étais tout son monde.`],['♥',`${n} ne te quitte plus d'une semelle. Votre lien est immense.`]]];

let EPOCH=0;
async function npcStep(n,d,ms=200){const t0=now(),ep=EPOCH;n.d=d;for(;;){if(ep!==EPOCH){n.ox=n.oy=0;return}const k=Math.min(1,(now()-t0)/ms);n.ox=DX[d]*TS*k;n.oy=DY[d]*TS*k;if(k>=1)break;await frame()}n.x+=DX[d];n.y+=DY[d];n.ox=n.oy=0}
const team=T=>T.map(([s,l,mv,it])=>mon(s,l,{moves:mv,item:it}));
async function trainerBattle(n){const tr=n.tr;await say(tr.pre,tr.name,0,n.t);const r=await battle(team(tr.team),{tr:{...tr,look:n.t}});if(r==='win'){f()['t_'+tr.id]=1;if(tr.win)await tr.win()}save();return r}
function facing(){const M=MAPS[G.map],tx=G.x+DX[G.dir],ty=G.y+DY[G.dir];return{n:npcs(M).find(n=>n.x===tx&&n.y===ty),s:M.signs?.[tx+','+ty],a:M.acts?.[tx+','+ty],h:(M.hidden||[]).find(h=>h.x===tx&&h.y===ty&&!f()[hk(h)]),c:M.rows[ty]?.[tx],tx,ty}}
const hk=h=>h.sh?'e_'+h.sh:h.pg?'pg_'+h.pg:'i_'+h.id;
const OBJ={sablier:'Un sablier de cristal posé sur l\'autel.',boulder:'Un gros rocher. Il bouge un peu quand on le pousse…',tent:'Une tente de toile, rapiécée de partout. Ça sent la soupe.',fire:'Un feu de camp crépite doucement.'};
function give(k,q=1){G.bag[k]=(G.bag[k]||0)+q;jingle('item');ui.pop={ic:ICO[k],t0:now()};if(IT[k]?.[4]==='held')tip('held',HELDTIP)}
const HELDTIP='Objets tenus : une créature peut tenir un objet qui agit tout seul en combat (baies, Charbon, Miettes Dorées…). Équipe-les depuis le SAC, ou depuis ÉQUIPE puis OBJET.';
// Arbres à baies : une récolte par jour d'Aurélys
const dayN=()=>Math.floor(G.t/CYC),berryRipe=n=>f()['bt_'+n.bid]!==dayN();
async function berryTree(n){if(!berryRipe(n))return say('Les baies n\'ont pas encore repoussé. Reviens demain !');const q=rnd(1,2);f()['bt_'+n.bid]=dayN();sfx('grass');puff(n.x,n.y,'#8ad86c',8);give(n.bk,q);await say(`Tu cueilles ${IT[n.bk][0]} x${q} ! Les baies repousseront demain.`)}
async function interact(){const{n,s,a,h,c,tx,ty}=facing(),M=MAPS[G.map];
 if(n){if(!['ball','mon','shard','obj'].includes(n.t))n.d=OPP[G.dir];
  if(n.item){f()['i_'+n.id]=1;give(n.item[0],n.item[1]);return say(`Tu trouves ${IT[n.item[0]][0]} x${n.item[1]} !`)}
  if(n.t==='shard')return getShard(n.id);if(n.t==='obj'&&!n.fn)return say(OBJ[n.k]);
  if(n.fn)return n.fn(n);
  if(n.tr)return f()['t_'+n.tr.id]?say(typeof n.tr.post==='function'?n.tr.post():n.tr.post||n.tr.after,n.tr.name,0,n.t):trainerBattle(n);
  return say(typeof n.say==='function'?n.say():n.say,n.name,0,n.t)}
 if(s)return say(s);if(a)return a();
 if(h){if(h.sh)return getShard(h.sh);if(h.pg)return getPage(h.pg);f()['i_'+h.id]=1;give(h.it,h.q);return say(`Tu fouilles… et trouves ${IT[h.it][0]} x${h.q} !`)}
 if(AFF[c])return fieldMove(c,tx,ty);
 if(c==='~'&&M.fish)return fish();
 if(folMon()&&tx===FOL.x&&ty===FOL.y)return folTalk();
 if(folMon()){const e={n:'fol',k:['♪','♥','…'][G.t%3],t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),650)}}
const PAGES=['Jour 1. Brume ne s\'est pas réveillé ce matin. Le soleil était déjà haut. Il était si fatigué depuis des semaines… Mon Ombrelin, mon ami. J\'avais promis de veiller sur lui.',
 'Maëlle dit que ce n\'est la faute de personne. Mais les vieux registres de l\'Observatoire parlent d\'un sceau, et d\'un gardien de la nuit enchaîné pour que le jour dure. Quelqu\'un a choisi. Quelqu\'un a décidé que Brume compterait moins que les récoltes.',
 'Kael m\'a demandé pourquoi je partais. Je lui ai dit que je reviendrais quand les nuits seraient longues. Il avait huit ans. Il m\'a donné son bonnet vert, pour que j\'aie chaud la nuit. Je l\'ai encore.',
 'Le Cœur d\'Aube brille entre mes mains. Si je brise le sceau, Nocturion sera libre. Et si je me trompe ? Sélène doute. Moi aussi, parfois. Je continue quand même. Pour Brume.'];
async function ruinsDoor(){if(!f().balance)return say('Une porte de pierre scellée, gravée d\'un soleil et d\'une lune entrelacés. Elle ne bouge pas d\'un pouce.');if(!f().ruinsOpen){f().ruinsOpen=1;await cine(1);ui.shake=10;sfx('roar');rays(11,1,C.goldL,2200);await say('Le soleil et la lune gravés sur la porte s\'illuminent… La pierre glisse dans un grondement !');await cine(0)}await warp('ruines',9,13,1)}
async function sablierGet(){await cine(1);rays(9,1,C.goldL,2600);await say('Sur l\'autel repose un sablier de cristal. Une moitié brille comme le jour, l\'autre comme la nuit.');G.keys.sablier=1;jingle('item');ui.pop={ic:ICO.sablier,t0:now()};
 await say('Tu obtiens le SABLIER DU CYCLE ! Depuis le menu, il permet de choisir le moment de la journée.');await cine(0);save()}
async function useSablier(){const M=MAPS[G.map];if(['in','cave','tech'].includes(M.amb))return say('Le sable reste immobile… Il faut être à ciel ouvert.');const O=['AUBE','JOUR','CRÉPUSCULE','NUIT',...(f().legC?['ÉCLIPSE']:[])],i=await choose(O,{x:W-200,y:8,w:192,title:'Sablier du Cycle'});if(i<0)return;if(i===4)return callEclipse();
 const n=f().balance?180:120,b=Math.ceil((G.t+1)/CYC)*CYC;G.t=b+[5,45,CYC-n-35,CYC-n+5][i];await fadeTo(.8,300);sfx('shard');await fadeTo(0,300);await say(`Le sable s'écoule… ${['L\'aube','Le jour','Le crépuscule','La nuit'][i]} tombe sur ${M.name.split(' · ')[0]}.`)}
async function getPage(i){f()['pg_'+i]=1;const n=G.keys.pages=(G.keys.pages||0)+1;jingle('item');ui.pop={ic:ICO.book,t0:now()};await say(`Tu trouves une page déchirée… le journal de Valen ! (${n}/4)`);await say(PAGES[i-1],'Valen')}
async function readPages(){const L=[1,2,3,4].filter(i=>f()['pg_'+i]);if(!L.length)return;for(;;){const i=await choose(L.map(i=>`Page ${i}`),{x:W-170,y:8,w:162,title:'Journal'});if(i<0)return;await say(PAGES[L[i]-1],'Valen')}}
async function getShard(id){f()['e_'+id]=1;const n=G.keys.shards=(G.keys.shards||0)+1;sfx('shard');ui.pop={ic:ICO.shard,t0:now()};ui.flash=.5;ui.flashC=C.goldL;
 await say(`Tu trouves un ÉCLAT D'AUBE ! (${n}/12)`);if(n===1)await say('Un fragment de lumière cristallisée, tiède au toucher. Quelqu\'un saura peut-être à quoi il sert… On parle d\'un ermite dans la Forêt Murmure.')}
async function fieldMove(c,tx,ty){tip('aff','Ronces, rochers fissurés, brasiers : une créature du bon type dans ton équipe ouvre le passage. Les secrets d\'Aurélys se cachent souvent derrière.');const[t,desc,inf,verb,tn,col]=AFF[c],m=G.party.find(m=>alive(m)&&SP[m.sp].t===t);
 if(!m)return say(`${desc} Une créature de type ${tn} en forme, dans ton équipe, pourrait ${inf}.`);
 if(!await ask(`${desc} Demander à ${nm(m)} de ${inf} ?`))return;
 sfx(c==='k'?'hit':c==='x'?'splash':'cut');ui.shake=c==='k'?8:0;for(let i=0;i<16;i++)AMB.push({k:'rl',x:tx*TS+16+(Math.random()-.5)*20,y:ty*TS+16,vx:(Math.random()-.5)*3,vy:-2-Math.random()*2,l:30,c:i%2?col:'#ffffff'});
 f()[`c_${G.map}_${tx}_${ty}`]=1;refreshMap(G.map);await say(`${nm(m)} ${verb} !`)}
async function fish(){if(!G.keys.rod)return say('L\'eau est claire… Avec une canne à pêche, on pourrait y attraper quelque chose.');if(!G.party.some(alive))return say('Ton équipe est trop fatiguée pour pêcher.');
 const M=MAPS[G.map];ui.bob={x:G.x+DX[G.dir],y:G.y+DY[G.dir],t0:now(),bite:0};sfx('splash');show('Tu lances ta ligne… Attends le signal !');
 let k=await key(1300+Math.random()*2600);if(k!=='t'){ui.bob=null;ui.text=null;return say('Trop tôt ! Le poisson s\'est méfié.')}
 ui.bob.bite=now();sfx('alert');show('Ça mord ! Appuie sur A !');k=await key(700);ui.bob=null;ui.text=null;
 if(k!=='a')return say(k==='t'?'Trop tard… Il s\'est décroché.':'Raté ! Il s\'est enfui.');
 const e=pickEnc(G.keys.rod2&&M.fish2&&Math.random()<.5?M.fish2:M.fish);msEvt('fish');await battle([mon(e[0],rnd(e[1],e[2]),{wild:1})],{fish:1})}

// =====================================================================
// LIEUX & HISTOIRE
// Acte I : le Badge Roc, la forêt, le Mont Braise — Vex vole le Cœur d'Aube, l'éclipse commence.
// Acte II : Port-Miroir, la Grotte Écho, l'Observatoire — Valen, Nocturion, et le Cycle à rééquilibrer.
// =====================================================================
const tmpN=(map,o)=>{const n={fix:1,...o};MAPS[map].npcs.push(n);return n},rmN=(map,n)=>{const a=MAPS[map].npcs,i=a.indexOf(n);if(i>=0)a.splice(i,1)};
function setTime(ph){const n=f().balance?180:120,b=Math.ceil((G.t+1)/CYC)*CYC;G.t=b+{1:45,3:CYC-n+5}[ph]}
async function homeRest(){await say('Tu rentres à la maison. Ton lit t\'attend…');show('Jusqu\'à quand dormir ?');const c=await choose(['LE MATIN','LA NUIT','RESSORTIR'],{w:190});ui.text=null;if(c<0||c===2)return;
 await fadeTo(1,300);healAll();G.heal=['bourg',5,6];if(!act2())setTime(c?3:1);await wait(500);await fadeTo(0,300);jingle('heal');
 await say(act2()?'Tu te réveilles… mais le ciel reste voilé par l\'éclipse. Ton équipe est en pleine forme.':G.party.length?`Il fait ${c?'nuit':'jour'}. Ton équipe est en pleine forme !`:'Tu te sens reposé !');save()}
async function center(nmTown,hp){await say(`Bienvenue au Centre de Soins de ${nmTown} !`,'Infirmière');for(;;){show('Que puis-je faire pour toi ?','Infirmière');const i=await choose(['SOIGNER','BOÎTE','MISSIONS','AU REVOIR'],{w:180,icons:[ICO.heal,ICO.team,ICO.board,ICO.close]});ui.text=null;
 if(i===0){await fadeTo(.7,200);healAll();await jingle('heal');await fadeTo(0,200);G.heal=hp;save();await say('Ton équipe est en pleine forme ! (Partie sauvegardée)','Infirmière')}else if(i===1)await boxMenu();else if(i===2)await missionBoard();else return}}
async function campHeal(who,msg){await say(msg,who);if(!await ask('Se reposer près du feu ?',who))return;await fadeTo(1,300);healAll();await wait(300);await fadeTo(0,300);jingle('heal');G.party.forEach(m=>bondUp(m,3));await say('Ton équipe a repris des forces ! Autour du feu, vos liens se resserrent.',who)}
async function boxMenu(){const i=await choose(['RETIRER','DÉPOSER'],{w:160});
 if(i===0){if(!G.box.length)return say('La Boîte est vide.');if(G.party.length>=6)return say('Ton équipe est pleine (6 maximum).');const j=await choose(G.box.map(m=>`${nm(m)}  Nv ${m.lv}`),{x:W-268,y:8,w:260,title:'Boîte'});if(j>=0){const m=G.box.splice(j,1)[0];fullHeal(m);G.party.push(m);await say(`${nm(m)} rejoint ton équipe !`)}}
 else if(i===1){if(G.party.length<2)return say('Tu dois garder au moins une créature !');const j=await partyMenu('Déposer qui ?');if(j>=0){const m=G.party.splice(j,1)[0];G.box.push(m);await say(`${nm(m)} est déposé dans la Boîte.`)}}}
async function shop(){await say('Bienvenue à la Boutique ! Fais ton choix !','Vendeur');
 for(;;){show('Que désires-tu ?','Vendeur');const c=await choose(['ACHETER','VENDRE','QUITTER'],{w:180,icons:[ICO.coin,ICO.bag,ICO.close]});ui.text=null;if(c===0)await buyMenu();else if(c===1)await sellMenu();else break}
 await say('Reviens quand tu veux !','Vendeur')}
const moneyPanel=()=>{panel(8,8,170,46);X.drawImage(ICO.coin,24,22,16,16);txt(G.money,48,38)};
async function buyMenu(list,price,who='Vendeur'){const P=k=>price?.[k]??IT[k][1],ks=list||['potion','superpotion','totalsoin','repousse','rappel','capsule','supercapsule','biscuit','baiesoin',...(f().badge?['hypercapsule','crepuscapsule','baieprisme']:[]),...(f().badge2?['hyperpotion','elixir']:[]),...(f().badge3?['pierrelune','pierreorage']:[])];
 ui.panel=moneyPanel;
 for(;;){const i=await choose(ks.map(k=>IT[k][0]),{x:W-298,y:8,w:290,vis:7,title:'Acheter (A) · Retour (B)',icons:ks.map(k=>ICO[k]),info:i=>({icon:bigIco(ks[i]),s:`${IT[ks[i]][2]} Tu en as ${G.bag[ks[i]]||0}.`}),dis:i=>G.money<P(ks[i]),
  draw:(i,x,y,sel,pr)=>{const c=pr?'#ffffff':G.money<P(ks[i])?C.mute:C.ink,o={sh:pr?0:undefined};txt(IT[ks[i]][0],x,y+19,c,o);txt(P(ks[i]),x+222,y+19,c,{...o,al:'r'})}});
  if(i<0)break;const k=ks[i];if(G.money<P(k)){await say('Tu n\'as pas assez d\'argent !',who);continue}G.money-=P(k);G.bag[k]=(G.bag[k]||0)+1;sfx('lv');if(IT[k][4]==='held')tip('held',HELDTIP)}
 ui.panel=null}
async function sellMenu(){ui.panel=moneyPanel;
 for(;;){const ks=Object.keys(G.bag).filter(k=>G.bag[k]>0&&IT[k]&&sellOf(k)>0).sort((a,b)=>CATO.indexOf(IT[a][4])-CATO.indexOf(IT[b][4]));if(!ks.length){ui.panel=null;await say('Tu n\'as rien à vendre.','Vendeur');return}
  const i=await choose(ks.map(k=>IT[k][0]),{x:W-298,y:8,w:290,vis:7,title:'Vendre (A) · Retour (B)',icons:ks.map(k=>ICO[k]),info:i=>({icon:bigIco(ks[i]),s:`${IT[ks[i]][2]} Tu en as ${G.bag[ks[i]]}.`}),
   draw:(i,x,y,sel,pr)=>{const c=pr?'#ffffff':C.ink,o={sh:pr?0:undefined};txt(IT[ks[i]][0],x,y+19,c,o);txt(sellOf(ks[i]),x+222,y+19,c,{...o,al:'r'})}});
  if(i<0)break;const k=ks[i];if(IT[k][4]==='held'&&!await ask(`Vendre ${IT[k][0]} pour ${sellOf(k)} pièces ?`,'Vendeur'))continue;G.bag[k]--;G.money+=sellOf(k);sfx('lv')}
 ui.panel=null}
async function gusTalk(){const g='Vieux Gus';if(!f().starter)return say('Moi, c\'est Gus. Quarante ans que je pêche dans cette mare ! Va donc chercher ta première créature chez le Prof., on causera après.',g);
 if(!G.keys.rod){await say('Te voilà dresseur ! Écoute le vieux Gus : les créatures d\'eau ne vivent pas dans les herbes. Faut aller les chercher.',g);G.keys.rod=1;sfx('lv');ui.pop={ic:ICO.rod,t0:now()};await say('Tu reçois la VIEILLE CANNE !');
  return say('Face à l\'eau, appuie sur A pour lancer. Quand ça mord, appuie vite ! Trop tôt ou trop tard, et ça file. Les Têtardin de la mare adorent battre les créatures ROCHE, si tu vois ce que je veux dire…',g)}
 const q=f().gusQ||0;
 if(q===0&&f().badge){f().gusQ=1;await say('Dis voir… Tu as déjà vu un Crapaflot, toi ? Le roi des mares. Quarante ans que j\'en rêve, et jamais pu en sortir un de l\'eau.',g);return say('Si un jour tu en attrapes un, montre-le-moi. Je te donnerai mon porte-bonheur. On en pêche à Port-Miroir et sur la Rive Brumeuse, paraît-il.',g)}
 if(q===1&&ownSp('crapaflot')){f().gusQ=2;await say('Par ma barbe… UN CRAPAFLOT ! Regarde-moi ces taches dorées ! Je peux mourir tranquille. Enfin, pas tout de suite.',g);give('miettes');return say('Tiens, mes Miettes Dorées porte-bonheur. Fais-les tenir à une créature : elle reprendra des forces à chaque tour.',g)}
 return say(f().balance?'Les Têtardin mordent mieux à la tombée de la nuit. Ça m\'avait manqué, les vraies nuits.':act2()?'Même les poissons boudent depuis l\'éclipse… Mais ils mordent encore, eux au moins.':['Chaque point d\'eau a ses habitants. Au port, on raconte qu\'on y pêche des Crapaflot !','Un poisson, ça se mérite. Patience, et réflexes !'][G.t>>5&1],g)}
async function pickStarter(sp){if(f().starter){if(!f().balance||f().gift3)return say('Le Prof. Saule garde ce Pixémon pour le prochain jeune dresseur de Bourg-Lueur.');
  await say('Le Prof. Saule t\'observe… puis hoche la tête.');await say('Ce petit n\'a jamais trouvé de dresseur. Il t\'a vu partir, puis revenir en héros. Je crois qu\'il veut te suivre. Prends-en soin !','Prof. Saule');f().gift3=1;const m=mon(sp,30,{aff:100});dex(sp,2);jingle('item');if(G.party.length<6)G.party.push(m);else G.box.push(m);return say(`Tu reçois ${SP[sp].name} !${G.party.includes(m)?'':' Il est envoyé dans la Boîte.'}`)}
 ui.panel=()=>{panel(152,10,176,190);const fl=(now()/400|0)%2*2;pell(X,240,166,52,6,'rgba(31,26,51,.16)');X.drawImage(monSpr(sp,0,128),176,44-fl,128,128);const w=tw(TY[SP[sp].t][0],2,1)+12;chip(SP[sp].t,ev(240-w/2),176);txt(SP[sp].name,240,46,C.ink,{al:'c'})};
 const ok=await ask(`${SP[sp].name}, le Pixémon de type ${TY[SP[sp].t][0]}. Son talent : ${TAL[SP[sp].tal][0]}. Tu le choisis ?`);ui.panel=null;if(!ok)return;
 G.party.push(mon(sp,5,{aff:120}));dex(sp,2);f().starter=sp;folReset();jingle('item');puff(G.x,G.y-1,'#ffffff',12);await say(`Tu as choisi ${SP[sp].name} !`);const rs={flamiot:'goutelin',goutelin:'pousseron',pousseron:'flamiot'}[sp];f().rs=rs;
 const k=MAPS.lab.npcs.find(n=>n.t==='rival');await cine(1);await emote(k,'!');await walk(k,'uR');
 await say(`Alors moi, je prends ${SP[rs].name} ! Il a l'avantage sur le tien. Désolé, c'est la loi des types.`,'Kael');f().kaelPick=1;sfx('ball');puff(3+['flamiot','goutelin','pousseron'].indexOf(rs),3,'#ffffff',10);
 await approach(k,3);await say('Allez, voyons ce qu\'il vaut ! En garde !','Kael');await cine(0);
 const r=await battle([mon(rs,5)],{tr:{name:'Kael',look:'rival',money:100,vs:1,after:'Grr… La prochaine fois, je gagnerai !'},noLose:1});
 f().rival1=1;healAll();const P=MAPS.lab.npcs.find(n=>n.t==='prof');faceTo(P,G.x,G.y);await say(r==='win'?'Bravo ! Battre un adversaire avec l\'avantage du type… Tu as du flair !':'Ne t\'en fais pas : il avait l\'avantage du type. Tu apprendras vite !','Prof. Saule');
 G.keys.dex=1;G.bag.capsule=(G.bag.capsule||0)+5;G.bag.potion=(G.bag.potion||0)+3;jingle('item');ui.pop={ic:ICO.dex,t0:now()};await say('Tiens : un PIXÉDEX, 5 Capsules et 3 Potions. Le Pixédex note chaque créature que tu vois ou captures. Rapporte-m\'en, je te récompenserai !','Prof. Saule');
 await say('Rejoins Cendreville au nord par la Route 1 et affronte Brasia, la championne d\'arène. Ah, et le Vieux Gus, près de la mare, aime bien les jeunes dresseurs…','Prof. Saule');
 const kk=MAPS.lab.npcs.find(n=>n.t==='rival');if(kk){await emote(kk,'♪',500);await say('À plus ! Je serai toujours un pas devant toi !','Kael')}save()}
const DXR=[[4,'supercapsule',5],[8,'elixir',3],[12,'hypercapsule',3],[18,'hyperpotion',5],[30,'pierrelune',1],[40,'pierreorage',1],[50,'amulette',1],[60,'orbe',1]];
async function profTalk(){const P='Prof. Saule';if(f().starter&&await fossilProf())return;if(!f().starter){if(!f().profMet){f().profMet=1;await say('Ah, te voilà ! Joyeux anniversaire ! Douze ans… Le temps file aussi vite que nos nuits.',P);
  await say('Bienvenue dans le monde des Pixémons. Ici, à Aurélys, tout vit au rythme du Cycle : le jour, Solarion veille sur nous. La nuit, d\'autres créatures s\'éveillent.',P);
  await say('Mais les nuits raccourcissent, année après année. Ton père, Elias, a été le premier à le mesurer. Il était mon assistant… et mon ami.',P);
  await say('Il aurait voulu être là aujourd\'hui. Alors je vais faire de mon mieux pour le remplacer, rien que ce matin.',P);await emote('me','…',600)}
  return say('Choisis l\'une des trois capsules sur la table. Chacune contient un Pixémon !',P)}
 let got=0;for(const[n,it,q]of DXR)if(caught()>=n&&!f()['dx'+n]){f()['dx'+n]=1;got=1;await say(`${n} espèces capturées ? Formidable ! Tiens, voici de quoi continuer.`,P);give(it,q);await say(`Tu reçois ${IT[it][0]} x${q} !`)}
 if(caught()>=DEX.length&&!f().dxAll){f().dxAll=1;got=1;give('hypercapsule',10);give('cyclecapsule',1);await say('Tu… tu as complété le Pixédex ? Toutes les créatures d\'Aurélys ! Voici 10 Hyper Capsules, une Capsule Cycle, et toute mon admiration.',P);await say('Ton père aurait adoré voir ça. Il disait que connaître chaque créature, c\'était connaître chaque heure du Cycle.',P)}
 if(got)return save();const nx=DXR.find(r=>caught()<r[0]);
 await say(f().balance?'Les nuits durent autant que les jours, maintenant. Tant de créatures nocturnes à étudier ! On a vu Solarion au sommet du Mont Braise le jour… et Nocturion sous le dôme, la nuit.':act2()?'Le sceau se trouve sous le dôme de l\'Observatoire. Souviens-toi : une attaque LUMIÈRE dissipe l\'éclipse. Prépare ton équipe en conséquence.':['Les créatures ROCHE craignent l\'EAU et la PLANTE. Les FEU craignent l\'EAU et la ROCHE.','Une créature endormie ou paralysée est bien plus facile à capturer. Ta Capsule te remerciera !','Certaines créatures n\'apparaissent que la nuit. Rentre dormir à la maison pour choisir l\'heure de ton réveil.'][(G.t>>5)%3],P);
 if(nx)await say(`Ton Pixédex : ${caught()} espèce${caught()>1?'s':''} capturée${caught()>1?'s':''}. Prochaine récompense à ${nx[0]} !`,P)}
async function liliTalk(){const L='Lili',s=f().lili||0;
 if(s===0){if(!f().starter)return say('Bonjour ! Tu as une créature, toi aussi ?',L);f().lili=1;await say('Tu es dresseur ? Mon Ombrelin, Mimo, s\'est enfui dans la Forêt Murmure ! Il avait peur du soleil… il en a toujours peur.',L);return say('Il ne sort que la nuit, quand tout est sombre. Si tu le vois, ramène-le-moi, s\'il te plaît !',L)}
 if(s===1)return say('Mimo se cache quelque part dans la Forêt Murmure, sûrement dans un coin d\'herbes hautes. Il ne sort que la nuit…',L);
 if(s===2){f().lili=3;await say('MIMO ! Tu l\'as retrouvé ! Oh, merci, merci !',L);give('totalsoin',2);give('crepuscapsule',3);await say('Tu reçois 2 Total Soin et 3 Crépuscapsules !');await say('Et… Mimo tenait ça dans sa bouche. C\'est joli, ça brille. Garde-le !',L);await getShard('l1');
  return say('Dis… pourquoi les nuits sont-elles si courtes ? Mimo est toujours si fatigué. Comme s\'il manquait quelque chose au monde.',L)}
 return say(f().balance?'Mimo n\'a jamais été aussi joyeux ! Les nuits sont longues, il peut enfin jouer.':act2()?'Mimo adore l\'éclipse… mais moi, le soleil me manque. On ne pourrait pas avoir les deux ?':'Mimo va beaucoup mieux. Il dort toute la journée, et la nuit il danse sous la lune !',L)}
async function mimoFound(n){await say('Un petit Ombrelin tremble sous son ombrelle. Il porte un ruban rose… C\'est Mimo !');await say('Tu lui parles doucement. Il se blottit contre toi.');f().lili=2;sfx('lv');await say('Ramène Mimo à Lili, à Cendreville.')}
const TUT=[[1,'lueur'],[2,'aube'],[4,'zenith'],[6,'prisme'],[10,'aubeeternelle']];
async function lumenTalk(){const L='Ermite Lumen',n=G.keys.shards||0;
 if(!f().lumen){f().lumen=1;await say('Oh ! Un visiteur… Je suis Lumen. Je recueille les Éclats d\'Aube : des larmes de Solarion, tombées au fil des siècles.',L);await say('Chaque éclat réveille un savoir oublié. Je peux enseigner les techniques de LUMIÈRE à tes créatures… sauf à celles d\'OMBRE.',L);await say('Un conseil, en passant : les arbres de l\'est ne sont pas tous des arbres. Les Lapilune le savent bien.',L)}
 if(n>=12&&!f().lumen12){f().lumen12=1;G.keys.charme=1;sfx('shard');ui.pop={ic:ICO.shard,t0:now()};await say('Les douze éclats… réunis. Tu es un véritable Porteur d\'Aube. Prends ce CHARME CHROMA : les créatures aux couleurs rares viendront trois fois plus souvent à toi.',L)}
 const av=TUT.filter(([k])=>n>=k),nx=TUT.find(([k])=>n<k);await say(`Tu as trouvé ${n} éclat${n>1?'s':''} sur 12.${nx?` Au prochain palier (${nx[0]} éclat${nx[0]>1?'s':''}), j'enseignerai ${MV[nx[1]].n}.`:''}`,L);
 if(!av.length)return say('Reviens quand tu auras trouvé un éclat. Ils scintillent dans l\'herbe… ou derrière des obstacles que seul un bon type peut franchir.',L);
 for(;;){const i=await choose([...av.map(([,id])=>MV[id].n),'RETOUR'],{x:W-248,y:8,w:240,title:'Enseigner',info:i=>i<av.length?{t:'LUM',s:`Puiss. ${MV[av[i][1]].p||'-'} · ${mvDesc(MV[av[i][1]])||'Attaque de lumière pure.'}`}:{s:'Revenir plus tard.'}});if(i<0||i===av.length)return;
  const id=av[i][1],j=await partyMenu('Qui doit apprendre ?');if(j<0)continue;const m=G.party[j];if(SP[m.sp].t==='OMB'){await say('La lumière ne peut habiter une créature d\'ombre.',L);continue}if(m.moves.includes(id)){await say(`${nm(m)} connaît déjà ${MV[id].n}.`);continue}await learn(m,id)}}
async function rival2(){const k=MAPS.foret.npcs.find(n=>n.t==='rival');await cine(1);await bang(k);await approach(k,6);
 await say('Te voilà enfin ! La Team Éclipse se cache au Mont Braise, juste au nord.','Kael');await emote(k,'…',600);await say('Je dois devenir assez fort pour faire face à quelqu\'un, là-haut. Ne pose pas de questions. Montre-moi juste si tu es à la hauteur !','Kael');await cine(0);
 const r=await battle([mon('piafou',13),mon('volticelle',13),mon(SP[f().rs||'goutelin'].evo[1],15)],{tr:{name:'Kael',look:'rival',money:800,vs:1,after:'Pfff… Tu es devenu vraiment fort.'}});if(r!=='win')return;
 f().rival2=1;healAll();jingle('heal');await say('Tiens, je soigne ton équipe. Vex, le chef, est au sommet. Une admin garde le passage : Sélène. Méfie-toi, elle endort et brûle tout ce qui bouge. Prends des Total Soin !','Kael');
 await walk(k,'uu',150);save()}
async function bossFight(){const M=MAPS.mont,v=M.npcs.find(n=>n.t==='vex');await cine(1);await bang(v);faceTo(v,G.x,G.y);G.dir=OPP[v.d];
 await say('Tiens donc… Le gamin qui a ridiculisé mes sbires.','Vex');await say('Tu crois défendre le bien ? Depuis des siècles, Aurélys vit sous un jour presque sans fin. Les nuits raccourcissent, et les créatures d\'ombre s\'éteignent une à une.','Vex');
 await say('Et ce Bracelet du Cycle à ton poignet… Les éclats que j\'ai pris aux mines de Cendreville en valent bien un.','Vex');
 await say('Solarion garde la clé de leur prison. Ce soir, je la lui prends. Écarte-toi !','Vex');await cine(0);
 const r=await battle([mon('ombrelin',17,{moves:['hypnose','morsure','ombrefurtive','grondement']}),mon('magmor',18,{moves:['feufollet','crocsfeu','durcir','braise']}),mon('noctyrex',20,{moves:['cri','morsure','ombrefurtive','grimace']})],{tr:{name:'Chef Vex',look:'vex',money:3000,vs:1,boss:1,items:1,ev:1,after:'…Battu. Mais tu arrives trop tard.'}});if(r!=='win')return;
 musStop();await cine(1);v.d=1;await camTo(9,2,800);ui.shake=12;sfx('roar');await wait(500);
 const sol=tmpN('mont',{x:9,y:1,t:'mon',sp:'solarion',oy:48,a:0});rays(9,1,C.goldL,4200);tween(sol,'a',1,700);await tween(sol,'oy',0,1100,1);sfx('cry');ui.flash=.7;ui.flashC=C.goldL;
 await say('Le sommet tremble… Solarion jaillit du cratère dans un éclat doré !');await emote(v,'…',600);await say('Gardien du jour… Pardonne-moi. Cœur d\'Aube, à moi !','Vex');
 stream([9,1],[9,2],[C.gold,'#ffffff',C.goldL],60);for(let i=0;i<7;i++){sfx('shard');ui.shake=4;await wait(240)}await emote(sol,'!',500);
 ui.flash=1;ui.flashC='#3a1a5a';f().eclipse=1;sfx('roar');ui.shake=18;tween(sol,'a',0,1200);await tween(sol,'oy',-140,1200);rmN('mont',sol);
 await say('Solarion pousse un cri déchirant et disparaît dans le ciel… Le soleil s\'assombrit. Une ÉCLIPSE recouvre Aurélys !');
 faceTo(v,G.x,G.y);await say('Avec le Cœur d\'Aube, le sceau de l\'Observatoire cédera enfin. Adieu, gamin.','Vex');puff(9,2,'#9a5ad0',26);sfx('door');f().boss=1;await wait(500);musPlay('ecl');
 const k=tmpN('mont',{x:10,y:7,t:'rival',d:1,name:'Kael'});await camTo(G.x,G.y+1,500);await approach(k,5);await emote(k,'!');
 await say('J\'ai tout vu… Ce masque. Cette voix…','Kael');await emote(k,'…',800);await say('C\'était Valen. Mon grand frère. Il a disparu il y a trois ans… C\'est lui que je cherchais.','Kael');
 await say('Il fuit vers l\'Observatoire, de l\'autre côté du lac Miroir. Je vais le ramener. Avec toi, si tu veux bien.','Kael');await say('La Route 2 est bloquée par un éboulement, mais Brasia pourra la dégager. Rentrons à Cendreville !','Kael');
 await camBack();await fadeTo(1,250);rmN('mont',k);await cine(0);await fadeTo(0,250);save()}
async function brasiaClears(){await cine(1);const V='ville',mi=MAPS.ville.npcs.filter(n=>n.t==='miner'),b=tmpN(V,{x:7,y:12,t:'leader',d:2,name:'Brasia'});await camTo(4,12,800);
 await say('Te voilà ! Kael m\'a tout raconté. Le ciel est noir depuis ce matin, la ville a peur.','Brasia');await say('Mineurs, écartez-vous ! Rocaroc, en avant !','Brasia');
 for(const m of mi)emote(m,'!',500);await wait(520);await Promise.all(mi.map(m=>walk(m,'rrrr',150)));for(const m of mi){puff(m.x,m.y,'#c8b8a0',6);m.hid=1}
 const rk=tmpN(V,{x:7,y:13,t:'mon',sp:'rocaroc',d:2});await walk(rk,'llllll',140);ui.shake=16;sfx('hit');debris(0,12);debris(0,13);await wait(260);sfx('hit');ui.shake=12;debris(0,12,'#c8b8a0');f().r2=1;refreshMap(V);await wait(400);
 await walk(rk,'rrr',140);rmN(V,rk);puff(4,13,'#c8b8a0',8);
 await say('Et voilà ! La Route 2 mène à Port-Miroir. Maëlle, la championne du port, connaît la Grotte Écho : le seul chemin vers l\'Observatoire.','Brasia');
 give('totalsoin',3);await say('Tiens, 3 Total Soin. Là-bas, les créatures d\'ombre sont plus fortes pendant l\'éclipse. Ne baisse jamais ta garde.','Brasia');
 await camBack();await fadeTo(1,250);rmN(V,b);await cine(0);await fadeTo(0,250);save()}
async function portScene(){f().portScene=1;const p=MAPS.port.npcs.find(n=>n.t==='prof'),P='Prof. Saule';await cine(1);await emote(p,'!');await approach(p,6);
 await say('Te voilà ! Kael m\'a écrit. J\'ai pris le premier bateau en voyant l\'éclipse.',P);await emote(p,'…',800);
 await say('Il est temps que je te dise la vérité. Il y a des siècles, les fondateurs d\'Aurélys ont scellé Nocturion, le gardien de la nuit, sous l\'Observatoire.',P);
 await say('Ils voulaient des jours sans fin, des récoltes sans fin. Depuis, les nuits raccourcissent… et les créatures d\'ombre s\'affaiblissent. Mes ancêtres en faisaient partie. Je le savais, et je me suis tu.',P);
 await say('Valen a raison sur un point : la nuit a été trahie. Mais une éclipse éternelle étoufferait tout le reste. Avec le Cœur d\'Aube, il peut briser le sceau et soumettre Nocturion.',P);
 await say('Et ces bracelets… Les Éclats d\'Aube réagissent au lien entre un dresseur et sa créature. Valen l\'avait compris avant tout le monde : c\'est pour ça qu\'il les faisait voler.',P);
 await say('Maëlle, la championne du port, connaissait bien Valen. Bats-la : elle seule peut t\'ouvrir la Grotte Écho. Et souviens-toi : une attaque LUMIÈRE dissipe une éclipse. Les Lumignon brillent la nuit sur la Route 2…',P);await cine(0);save()}
async function kael3(){const k=tmpN('port',{x:16,y:2,t:'rival',d:2,name:'Kael'});await cine(1);await bang(k);await approach(k,6);
 await say('Attends. Laisse-moi y aller seul. C\'est mon frère, c\'est à moi de le ramener.','Kael');await emote(k,'…',700);await say('…Tu refuses ? Alors prouve-moi que tu ne seras pas un poids là-haut ! Brasia m\'a confié un bracelet, à moi aussi. On verra qui s\'éveille le mieux !','Kael');await cine(0);
 const r=await battle([mon('piafou',25),mon('bourdonnerre',26),mon(SP[f().rs||'goutelin'].evo[1],28)],{tr:{name:'Kael',look:'rival',money:2000,vs:1,boss:1,items:1,ev:1,after:'Tu es plus fort que moi. Je l\'admets.'}});
 if(r!=='win'){rmN('port',k);return}f().kael3=1;healAll();jingle('heal');await emote(k,'♪',600);await say('On y va ensemble. Mais c\'est moi qui lui parlerai. Je soigne ton équipe… et je te retrouve à l\'Observatoire.','Kael');
 await walk(k,'rr',150);await fadeTo(1,250);rmN('port',k);await fadeTo(0,250);save()}
async function obsScene(){const k=tmpN('obs',{x:10,y:9,t:'rival',d:2,name:'Kael',a:1});puff(10,9,'#d8d4ec',10);await cine(1);await emote(k,'!',500);
 await say('J\'ai pris un raccourci par la falaise. Les sbires sont partout, je m\'occupe des renforts !','Kael');await camTo(9,3,700);await say('Sélène garde l\'accès au dôme, derrière la barrière. Elle se contrôle depuis les consoles… il doit y avoir un code quelque part.','Kael');
 await camBack();rmN('obs',k);f().obsScene=1;await cine(0)}
const CON=['ÉTOILE','LUNE','SOLEIL'],CODE=[1,0,2];
async function consoleAct(i){if(f().bar)return say('La console est éteinte. La barrière est désactivée.');
 if(!await ask(`Une console marquée d'un symbole : ${CON[i]}. L'activer ?`))return;const sq=f().seq||[];sq.push(i);
 if(CODE.slice(0,sq.length).join()!==sq.join()){f().seq=[];sfx('alert');ui.shake=6;return say('BZZT ! ERREUR DE SÉQUENCE. La console se réinitialise.')}
 f().seq=sq;sfx('ok');if(sq.length<3)return say(`Bip ! La console s'illumine. (${sq.length}/3)`);
 await cine(1);await camTo(9,3,600);for(let i=0;i<4;i++){ui.flash=.35;ui.flashC='#e84aff';sfx('blip');await wait(160)}for(const x of[7,8,9,10])puff(x,3,'#e84aff',8);f().bar=1;refreshMap('obs');ui.shake=10;sfx('lv');await say('La barrière d\'énergie s\'éteint dans un grésillement !');await camBack();await cine(0)}
async function seleneTruth(){const n=MAPS.obs.npcs.find(x=>x.t==='selene');await cine(1);await emote(n,'…',800);
 await say('Valen n\'est pas un monstre. Il a vu son Ombrelin s\'éteindre, un matin d\'été, parce que la nuit avait été trop courte pour qu\'il se repose.','Sélène');
 await say('Quand il a découvert le sceau, il a juré de libérer Nocturion. Je l\'ai suivi. Mais une nuit sans fin… je ne sais plus si c\'est juste.','Sélène');
 await say('Tiens. Je l\'ai ramassé dans la grotte. Rends-le à la lumière.','Sélène');await getShard('o1');await say('Le dôme est juste derrière. Sauve-le… de lui-même.','Sélène');
 if(n){await walk(n,'ll',180);puff(n.x,n.y,'#d8d4ec',12)}f().selene2done=1;await cine(0)}
async function finalBattle(){const D='dome',v=MAPS.dome.npcs.find(n=>n.t==='vex'&&n.fix),nc=MAPS.dome.npcs.find(n=>n.sp==='nocturion'&&!n.fn);musStop();await cine(1);await bang(v);await camTo(5,2,700);
 ui.shake=14;sfx('roar');ui.flash=.6;ui.flashC='#7050a0';rays(6,1,'#c060ff',2600);await emote(nc,'!',600);
 faceTo(v,G.x,G.y);await say('Tu es venu jusqu\'ici… Regarde. Nocturion est libre. Plus jamais une créature d\'ombre ne s\'éteindra au soleil.','Vex');
 const k=tmpN(D,{x:6,y:7,t:'rival',d:1,name:'Kael'});await camTo(5,4,500);await approach(k,4);await emote(k,'!',500);
 await say('Valen ! Arrête ! Et toutes les autres créatures ? Les récoltes, les gens… Maman ? Tu veux tout éteindre pour sauver la nuit ?','Kael');
 await emote(v,'…',900);await say('Kael… Tu as grandi.','Vex');await say('Si c\'est le prix, je le paierai. Nocturion ! Montre-leur ce qu\'est une vraie ÉCLIPSE !','Vex');sfx('roar');ui.shake=16;ui.flash=.5;ui.flashC='#3a1a5a';
 await camBack(300);await cine(0);
 const r=await battle([mon('nocturelle',34,{moves:['hypnose','nuit','clairlune','ombrefurtive']}),mon('magmor',35,{moves:['feufollet','lanceflam','jetpierre','durcir']}),mon('noctyrex',35,{moves:['cri','nuit','morsure','ombrefurtive']}),mon('nocturion',38,{moves:['lunenoire','rayonnoir','ombrefurtive','grondement']})],
  {tr:{name:'Vex',look:'vex',money:6000,vs:1,boss:1,items:2,ev:1,after:'Nocturion… Non…'},legend:1});
 if(r!=='win'){rmN(D,k);return}await ending(k)}
async function ending(k){const D='dome',v=MAPS.dome.npcs.find(n=>n.t==='vex'&&n.fix),nc=MAPS.dome.npcs.find(n=>n.sp==='nocturion'&&!n.fn);musStop();await cine(1);await camTo(5,2,600);
 ui.shake=12;sfx('roar');await emote(nc,'…',800);await say('Nocturion vacille… Le Cœur d\'Aube s\'échappe des mains de Vex et s\'élève sous le dôme !');
 const h=tmpN(D,{x:5,y:3,t:'obj',k:'heart',oy:0});sfx('shard');rays(5,2,C.goldL,6500);await tween(h,'oy',-44,1400,1);
 const so=tmpN(D,{x:4,y:1,t:'mon',sp:'solarion',d:3,oy:-150,a:0});tween(so,'a',1,900);await tween(so,'oy',0,1400,1);sfx('cry');ui.flash=.8;ui.flashC=C.goldL;
 await say('Une lumière dorée envahit l\'Observatoire. Solarion est revenu !');stream([5,2],[4,1],[C.gold,'#ffffff'],40);rmN(D,h);await wait(1000);
 await say('Solarion et Nocturion se font face… Mais ils ne se battent pas. Lentement, ils s\'inclinent l\'un devant l\'autre.');
 for(let i=0;i<2;i++){await Promise.all([tween(so,'oy',6,260),tween(nc,'oy',6,260)]);await Promise.all([tween(so,'oy',0,260),tween(nc,'oy',0,260)])}
 await Promise.all([emote(so,'♥',800),emote(nc,'♥',800)]);ui.flash=1;ui.flashC='#ffffff';sfx('lv');await wait(500);
 await say('Le jour et la nuit se retrouvent. L\'éclipse se dissipe !');
 await emote(v,'…',900);puff(v.x,v.y-1,'#ece6d6',10);v.t='valen';sfx('sel');await wait(400);
 await say('…Ils n\'avaient pas besoin que l\'un écrase l\'autre. Juste… d\'exister ensemble. J\'ai failli tout détruire pour le comprendre.','Valen');
 if(k){faceTo(k,v.x,v.y);await say('Rentre à la maison, Valen. Maëlle t\'attend sur le ponton.','Kael')}await emote(v,'♥',700);await say('…D\'accord, petit frère. Et toi — merci de m\'avoir arrêté.','Valen');
 await camBack(400);await fadeTo(1,600);for(const n of[so,k])if(n)rmN(D,n);v.t='vex';f().vex2=1;f().balance=1;await cine(0);
 await credits();mode='world';G.t=CYC*Math.ceil(G.t/CYC)+CYC-170;loadMap('bourg',5,7,0);healAll();G.heal=['bourg',5,6];await fadeTo(0,600);save();
 const mm=MAPS.bourg.npcs.find(n=>n.t==='mom');if(mm){await emote(mm,'!',500);await approach(mm,4);await emote(mm,'♥',700)}
 await say('Te voilà ! Regarde le ciel… Les étoiles. Une vraie nuit. Je suis si fière de toi.','Maman');
 await say('Ton aventure continue : Brasia organise le grand Tournoi du Cycle à Cendreville, Solarion et Nocturion défient les dresseurs qui les méritent, Kael t\'attend au nord du bourg, et il reste des Éclats d\'Aube à trouver !')}
async function legend(sp){const n=SP[sp].name,L=npcs(MAPS[G.map]).find(x=>x.sp===sp&&x.fn);await cine(1);if(L){rays(L.x,L.y,sp==='solarion'?C.goldL:'#c060ff',2600);await emote(L,'!',600)}ui.shake=10;sfx('roar');
 await say(`${n} te fixe de ses yeux ${sp==='solarion'?'dorés':'d\'améthyste'}… Il semble vouloir tester ta force !`);const ok=await ask(`Affronter ${n} ?`);await cine(0);if(!ok)return;
 const r=await battle([mon(sp,45)],{legend:1});if(r==='catch'){f()[sp==='solarion'?'legS':'legN']=1;await say(`${n} a rejoint ton équipe. Prends soin de lui.`)}else if(r==='win')await say(`${n} s'éloigne, apaisé… Il reviendra peut-être.`)}
async function kaelRematch(){const d=Math.floor(G.t/CYC);if(f().kaelDay===d)return say('On remet ça demain ! J\'entraîne mon équipe jusque-là.','Kael');
 await say('Valen et Maëlle m\'ont appris deux-trois trucs. Revanche ?','Kael');if(!await ask('Affronter Kael ?'))return;
 const r=await battle([mon('piafou',40),mon('bourdonnerre',41),mon('phalumine',41),mon(SP[f().rs||'goutelin'].evo[1],44)],{tr:{name:'Kael',look:'rival',money:4000,vs:1,boss:1,items:1,ev:1,after:'Toujours un pas devant moi… Pour l\'instant !'}});if(r==='win'){f().kaelDay=d;if(!f().kaelGift){f().kaelGift=1;const sp=SP[f().rs||'goutelin'].base,m=mon(sp,30,{aff:100});dex(sp,2);await say(`Tiens. Mon ${SP[SP[f().rs].evo[1]].name} a eu un petit frère… enfin, un petit protégé. Il te ressemble : têtu. Élève-le bien.`,'Kael');jingle('item');if(G.party.length<6)G.party.push(m);else G.box.push(m);await say(`Tu reçois ${SP[sp].name} !`)}}save()}
async function valenTalk(){const d=Math.floor(G.t/CYC),V='Valen',v=MAPS.dome.npcs.find(n=>n.fn===valenTalk);
 if(G.keys.medaillon&&!f().medGiven){f().medGiven=1;await cine(1);await say('Tu tends le Médaillon de Brume à Valen.');if(v)await emote(v,'!',800);
  await say('…Où as-tu trouvé ça ? Je l\'avais jeté. Le jour où j\'ai décidé de devenir quelqu\'un d\'autre.',V);await say('Sélène l\'a gardé ? Et grand-mère t\'a dit de me le rendre…',V);if(v)await emote(v,'…',1100);
  await say('Brume n\'est pas mort à cause du soleil. Il est mort parce que personne n\'écoutait le Cycle. Moi non plus, je ne l\'ai pas écouté. J\'ai juste choisi l\'autre camp.',V);
  await say('Je crois que je vais descendre à Lunévie. Grand-mère doit avoir une soupe sur le feu. Et Kael… il mérite un frère, pas un fantôme.',V);
  await say('Merci de me l\'avoir rapporté. Prends ça en échange : le grelot de Brume. Il tintait chaque fois qu\'il rêvait.',V);delete G.keys.medaillon;give('grelot',1);jingle('item');await say('Tu reçois un GRELOT ÉCHO. Valen serre le médaillon contre lui. Pour la première fois, il sourit.');await cine(0);save();return}
 if((G.keys.pages||0)>=4&&!f().pagesDone){f().pagesDone=1;await cine(1);await say('Tu tiens… mes pages ? Je croyais les avoir perdues dans la tempête.',V);if(v)await emote(v,'…',900);
  await say('Brume aurait aimé ces nuits-là. Longues, calmes, pleines d\'étoiles. Merci de les avoir ramassées… et de ne pas m\'avoir jugé seulement sur la fin.',V);
  await say('Laisse-moi te rendre quelque chose. La technique que Nocturion m\'a montrée : LUNE NOIRE. Je peux l\'enseigner à tes créatures d\'OMBRE.',V);await cine(0)}
 if(f().pagesDone){const c=await choose(['ENSEIGNER','COMBATTRE','AU REVOIR'],{w:200});if(c===0){const j=await partyMenu('Qui doit apprendre ?');if(j<0)return;const m=G.party[j];if(SP[m.sp].t!=='OMB')return say('Seule une créature d\'OMBRE peut porter la Lune Noire.',V);if(m.moves.includes('lunenoire'))return say(`${nm(m)} connaît déjà la Lune Noire.`,V);return learn(m,'lunenoire')}if(c!==1)return}
 else await say('Je viens parfois ici, la nuit, pour parler à Nocturion. Il n\'est plus enchaîné. Il revient de lui-même.',V);
 if(f().valenDay===d)return say('Demain soir, si tu veux. Mes créatures se reposent.',V);if(!await ask('Valen propose un combat amical. Accepter ?'))return;
 const r=await battle([mon('nocturelle',42),mon('magmor',42),mon('ombrelin',43),mon('noctyrex',45)],{tr:{name:'Valen',look:'valen',money:4500,vs:1,boss:1,items:1,ev:1,after:'Tu as toujours le dernier mot. C\'est agaçant.'}});if(r==='win')f().valenDay=d;save()}
// --- La Mine de Cendreville : la Team Éclipse y vole des Éclats d'Aube, Tito est coincé au fond ---
async function mineDoor(){if(!f().badge)return say('Une barrière de bois bloque l\'entrée de la mine : "Accès réservé aux mineurs."');await warp('mine',11,16,1)}
// Case libre à quelques pas du joueur, en ligne droite (pour faire arriver un personnage pendant une scène)
function nearSpot(r=3){const M=MAPS[G.map],ok=(x,y)=>{const c=M.rows[y]?.[x];return c&&!SOLID.has(c)&&!npcs(M).some(n=>n.x===x&&n.y===y)&&!(folMon()&&FOL.x===x&&FOL.y===y)&&!M.doors?.[x+','+y]};
 for(let k=r;k>=1;k--)for(const d of[3,2,0,1]){let fine=true;for(let i=1;i<=k;i++)if(!ok(G.x+DX[d]*i,G.y+DY[d]*i)){fine=false;break}if(fine)return[G.x+DX[d]*k,G.y+DY[d]*k]}return[G.x,G.y]}
async function mineAlert(){f().mineAlert=1;const V='ville',[mx,my]=nearSpot(3),mi=tmpN(V,{x:mx,y:my,t:'miner',d:0,name:'Mineur'});faceTo(mi,G.x,G.y);puff(mx,my,'#c8b8a0',6);await cine(1);await emote(mi,'!',600);await approach(mi,6);
 await say('Hé, toi ! Tu es dresseur ? Au secours ! Des sbires de la Team Éclipse sont descendus dans la mine cette nuit, avec des explosifs !','Mineur');
 await say('Ils ont fait sauter la galerie du fond… Mon apprenti, Tito, est coincé là-dessous !','Mineur');
 const[bx,by]=G.x===6&&G.y===5?[6,4]:nearSpot(2),br=tmpN(V,{x:bx,y:by,t:'leader',d:0,name:'Brasia'});faceTo(br,G.x,G.y);sfx('door');await emote(br,'!',500);
 await say('Encore la Team Éclipse ! Je dois rester en ville, au cas où ils remonteraient par les vieux puits.','Brasia');
 await say('Mais toi, tu viens de prouver ta valeur. L\'entrée de la mine est au nord de la ville. Ramène Tito… et découvre ce qu\'ils cherchent là-dessous.','Brasia');
 await fadeTo(1,250);rmN(V,mi);rmN(V,br);await cine(0);await fadeTo(0,250);save()}
async function corvinFlees(){const n=MAPS.mine.npcs.find(x=>x.tr?.id==='corvin'),c=tmpN('mine',{x:n.x,y:n.y,t:'grunt',d:n.d,name:'Lieutenant Corvin'});faceTo(c,G.x,G.y);await cine(1);
 await say('Peu importe… On a déjà assez d\'éclats pour le bracelet du chef. Et pour le sceau de l\'Observatoire.','Lieutenant Corvin');await emote(c,'!',500);
 await say('Oups. Oublie ce que je viens de dire ! Repli !','Lieutenant Corvin');sfx('door');puff(c.x,c.y,'#9a5ad0',22);rmN('mine',c);await say('Le lieutenant disparaît dans un nuage de fumée violette !');await cine(0)}
async function titoTalk(n){if(!f().t_corvin)return say('Au secours ! Un sbire garde le passage, je ne peux pas sortir !','Tito');await cine(1);await emote(n,'!',500);
 await say('Tu… tu es venu me chercher ? Merci ! Le plafond s\'est effondré derrière moi, j\'ai cru que j\'allais rester ici pour toujours.','Tito');
 await say('Les sbires creusaient pour trouver des Éclats d\'Aube. Ils disaient que leur chef en avait besoin pour un bracelet… et pour briser un sceau.','Tito');
 await say('Tiens, je l\'ai trouvée dans les gravats. Mon maître dit qu\'elle rend plus vif. Elle est à toi !','Tito');give('griffe');await say('Tu reçois la GRIFFE VIVE ! Fais-la tenir à une créature : elle agira parfois en premier.');
 await cine(0);await mineEnd()}
async function mineEnd(){await fadeTo(1,300);f().mine=1;loadMap('ville',17,1,0);const mi=tmpN('ville',{x:16,y:2,t:'miner',d:3,name:'Mineur'}),ti=tmpN('ville',{x:18,y:2,t:'kid',d:2,name:'Tito'});await fadeTo(0,300);await cine(1);
 await emote(mi,'♥',600);await say('Tito ! Tu es sain et sauf ! Merci, merci mille fois !','Mineur');G.money+=1000;give('biscuit',3);await say('Tu reçois 1000 pièces et Biscuit d\'Aube x3 !');
 await say('En voyant leur lieutenant détaler, les sbires qui gardaient la sortie est ont pris la fuite. La Forêt Murmure est libre !','Mineur');
 await say('Des éclats volés, un sceau à briser… Vex prépare quelque chose de grave au Mont Braise. Sois prudent.','Mineur');
 await fadeTo(1,250);rmN('ville',mi);rmN('ville',ti);await cine(0);await fadeTo(0,250);save()}
// --- Épilogue : Valen et Maëlle se retrouvent sur le ponton de leur enfance ---
async function pontonScene(){f().ponton=1;const P='port',ma=tmpN(P,{x:12,y:13,t:'maelle',d:3,name:'Maëlle'}),va=tmpN(P,{x:13,y:14,t:'valen',d:2,name:'Valen'});await cine(1);await camTo(13,13,900);
 await say('Tu te souviens ? On venait pêcher ici, quand on était petits. Tu ne ramenais jamais rien.','Maëlle');await emote(va,'…',700);
 await say('Je me souviens de tout. Même de ce que j\'aurais préféré oublier.','Valen');await say('Le ponton t\'attendait. Moi aussi.','Maëlle');await emote(va,'♥',700);
 const k=tmpN(P,{x:14,y:13,t:'rival',d:2,name:'Kael',a:1});puff(14,13,'#ffffff',10);sfx('door');await emote(k,'!',500);await say('Hé ! Vous auriez pu m\'attendre ! Qui a apporté les cannes ?','Kael');
 await camBack(600);faceTo(va,G.x,G.y);await emote(va,'!',500);await say('Te voilà. Merci… pour tout. Pour Kael, pour Nocturion, pour moi.','Valen');
 await say('Tiens. C\'est le grelot de Brume. Il tintait chaque fois qu\'il jouait sous la lune. Je crois qu\'il serait heureux qu\'il sonne encore.','Valen');give('grelot');await say('Tu reçois le GRELOT ÉCHO ! Fais-le tenir : il rend des PV à chaque coup porté.');
 await fadeTo(1,300);for(const n of[ma,va,k])rmN(P,n);await cine(0);await fadeTo(0,300);save()}
// --- Le Bracelet du Cycle (Brasia, après le Badge Roc) ---
async function braceletScene(){const b='Brasia';if(G.keys.bracelet)return;await say('Attends, ce n\'est pas tout. Pendant notre combat, j\'ai vu comment ta créature te regardait. Ce lien-là, ça ne s\'invente pas.',b);
 await say('Les mineurs de Cendreville trouvent parfois des Éclats d\'Aube dans la roche. Ma famille en a serti un dans ce bracelet, il y a très longtemps.',b);
 G.keys.bracelet=1;jingle('item');ui.pop={ic:ICO.bracelet,t0:now()};await say('Tu reçois le BRACELET DU CYCLE !');
 await say('En combat, chaque coup donné ou reçu remplit sa jauge. Quand elle brille, choisis ÉVEIL DU CYCLE avant d\'attaquer : ta créature s\'éveille, une fois par combat.',b);
 await say('Le jour, c\'est un Éveil Solaire : Attaque et Vitesse en hausse, et un peu de soin. La nuit, un Éveil Lunaire : Attaque et Défense en hausse, et les statuts disparaissent.',b);
 await say('Plus ton lien avec ta créature est fort, plus la jauge se remplit vite. Et méfie-toi : la Team Éclipse a volé des éclats, elle aussi…',b)}
// --- Revanches d'arène et Tournoi du Cycle (après l'Équilibre) ---
const topLv=()=>Math.max(40,Math.min(70,...G.party.map(m=>m.lv)));
const LDR={brasia:['','Toujours aussi solide… La roche s\'incline !','pierredure'],maelle:['Le port a retrouvé ses marées. Une revanche, sous la pluie ?','La marée t\'obéit, maintenant ? Bravo.','eaumystique'],ambroise:['Mes turbines tournent jour et nuit, maintenant. Une revanche, pour tester mes nouveaux réglages ?','Encore un court-circuit ! Je retourne à mon atelier.','aimant']};
const REM={ambroise:L=>[['volticelle',L-2,['cageclair','dardeclair','hate','viveatk'],'baiesoin'],['bourdonnerre',L-1,null,'aimant'],['etincelot',L-1,null,'baiesoin'],['orageon',L+1,['tonnerre','cageclair','dansepluie','hate'],'miettes']],brasia:L=>[['rocaroc',L-2,null,'baiesoin'],['magmor',L-1,null,'charbon'],['rocaroc',L+1,null,'pierredure']],orane:L=>[['brumelle',L-1,null,'baiesoin'],['anubrume',L,null,'encensnoir'],['eclipsoeil',L,null,'grelot'],['astrafelin',L+1,null,'poudretoile']],maelle:L=>[['crapaflot',L-1,null,'miettes'],['torrentor',L,null,'eaumystique'],['crapaflot',L+1,null,'baiesoin']]};
async function leaderTalk(n,k){const tr=n.tr;if(!f()['t_'+tr.id])return trainerBattle(n);if(!f().balance)return say(typeof tr.post==='function'?tr.post():tr.post||tr.after,tr.name,0,n.t);
 const tour=k==='brasia',O=['REVANCHE',...(tour?['TOURNOI DU CYCLE']:[]),'AU REVOIR'];show(tour?'Le Cycle est rétabli, et mon arène accueille le Tournoi du Cycle ! Une revanche, ou le grand tournoi ?':LDR[k][0],tr.name);
 const c=await choose(O,{w:240});ui.text=null;if(c<0||O[c]==='AU REVOIR')return;if(O[c]==='TOURNOI DU CYCLE')return tournament();
 const d=dayN();if(f()['rm_'+k]===d)return say('Mes créatures se reposent. Reviens demain !',tr.name,0,n.t);
 const r=await battle(team(REM[k](topLv())),{tr:{name:tr.name,look:n.t,money:tr.money*2,vs:1,boss:1,items:2,ev:1,after:LDR[k][1]}});
 if(r==='win'){f()['rm_'+k]=d;if(!f()['rmg_'+k]){f()['rmg_'+k]=1;const it=LDR[k][2];give(it);await say(`${tr.name} te remet ${IT[it][0]} en souvenir de ce combat !`)}}save()}
function freeNear(){const M=MAPS[G.map];for(const d of[1,2,3,0]){const x=G.x+DX[d],y=G.y+DY[d],c=M.rows[y]?.[x];if(c&&!SOLID.has(c)&&!npcs(M).some(n=>n.x===x&&n.y===y)&&!(folMon()&&FOL.x===x&&FOL.y===y))return[x,y,d]}return[G.x,G.y-1,1]}
async function tournament(){const B2='Brasia',d=dayN();if(f().tourDay===d)return say('Le Tournoi reprendra demain : les champions se reposent !',B2);
 await say('Quatre combats d\'affilée contre les meilleurs dresseurs d\'Aurélys, sans passer par le Centre de Soins. Seuls tes objets pourront t\'aider.',B2);
 if(!await ask('Entrer dans le Tournoi du Cycle ? Ton équipe sera soignée avant le premier combat.',B2))return;
 healAll();jingle('heal');const L=topLv(),rs=f().rs||'goutelin',R=[
  ['selene','Sélène',[['nocturelle',L-2,null,'encensnoir'],['magmor',L-1,null,'baieprisme'],['noctyrex',L,null,'orbe']],'Le Cycle m\'a laissé une seconde chance. Je compte bien la mériter. Montre-moi ce que vaut ta lumière !','Toujours aussi lumineux… Va. Ils t\'attendent.'],
  ['maelle','Maëlle',[['crapaflot',L-1,null,'miettes'],['torrentor',L,null,'eaumystique'],['crapaflot',L,null,'baiesoin']],'Valen m\'a dit que tu étais coriace. Voyons si tu tiens sous la marée haute !','La marée se retire… Bravo.'],
  ['valen','Valen',[['nocturelle',L-1,null,'grelot'],['magmor',L,null,'charbon'],['noctyrex',L+1,null,'encensnoir']],'Nocturion m\'a appris la patience. Toi, tu m\'as appris à perdre. Voyons si la leçon tient toujours !','Tu as toujours le dernier mot.'],
  ['rival','Kael',[['piafou',L],['bourdonnerre',L+1,null,'aimant'],['phalumine',L+1,null,'poudretoile'],[SP[rs].evo[1],L+3,null,'ruban']],'Enfin. La finale, toi contre moi, comme au premier jour au labo. Cette fois, je ne te laisserai rien !','…Champion. Tu le mérites. Mais la prochaine fois, c\'est moi !']];
 for(let i=0;i<R.length;i++){const[look,name,tm,pre,after]=R[i],[ox,oy,dd]=freeNear(),o=tmpN(G.map,{x:ox,y:oy,t:look,d:OPP[dd],name});G.dir=dd;puff(ox,oy,'#ffffff',12);sfx('door');await cine(1);
  await say((i<3?'Combat '+(i+1)+' sur 4':'FINALE')+' : '+name+' entre dans l\'arène !');await say(pre,name,0,look);await cine(0);
  const r=await battle(team(tm),{tr:{name,look,money:0,vs:1,boss:1,items:1,ev:1,after},noLose:1,loseMsg:'Ton équipe est K.O.… Tu es éliminé du Tournoi du Cycle.'});rmN(G.map,o);
  if(r!=='win'){f().tourDay=d;return say('Pas de honte à perdre ici. Reviens demain, plus fort !',B2)}
  if(i<3)await say(`Victoire ! Encore ${3-i} combat${3-i>1?'s':''} avant le titre. Pas de soin, mais tes objets restent utilisables.`,B2)}
 f().tourDay=d;f().tourWins=(f().tourWins||0)+1;await cine(1);await tourFinale();await cine(0);save()}
async function tourFinale(){musStop();ui.flash=1;ui.flashC='#ffffff';sfx('lv');await wait(300);jingle('badge');
 await say('Incroyable… Tu as remporté le Tournoi du Cycle !','Brasia');await say('Dans les gradins, Sélène, Maëlle, Valen et Kael applaudissent. Même le Prof. Saule est venu.');
 const first=!G.keys.trophy;G.keys.trophy=1;if(first)await badgeGet('MAÎTRE DU CYCLE',ICO.trophy);
 G.money+=8000;const rare=RARE.filter(k=>!(G.bag[k]>0)&&!G.party.some(m=>m.item===k)),it=rare.length?rare[rnd(0,rare.length-1)]:'biscuit',q=rare.length?1:5;give(it,q);await say(`Tu remportes 8000 pièces et ${IT[it][0]} x${q} !`);
 (G.hof??=[]).push({t:G.play,n:f().tourWins,team:G.party.map(m=>[m.sp,m.lv,m.sh?1:0])});await hallOfFame(G.hof.length-1);
 healAll();jingle('heal');musPlay(mapMus(MAPS[G.map]));await say(first?'Ton nom est gravé au Panthéon du Cycle. Reviens défendre ton titre quand tu veux : le Tournoi a lieu chaque jour !':'Ton équipe rejoint encore le Panthéon. Le titre te va bien !','Brasia')}
async function hallOfFame(i){const h=G.hof[i];ui.panel=()=>{const t=now();panel(8,8,464,304,{fill:'#efe2bf'});txt('PANTHÉON DU CYCLE',W/2,40,C.acc,{al:'c'});txt(`VICTOIRE ${h.n} - ${fmtT(h.t)}`,W/2,58,C.ink2,{mini:1,al:'c'});
  h.team.forEach(([sp,lv,sh],j)=>{const x=40+(j%3)*140,y=68+(j/3|0)*112,b=((t/380|0)+j)%2*2;pell(X,x+48,y+92,30,5,'#d8cbb0');X.drawImage(monSpr(sp,0,64,!!sh),x+16,y+28-b,64,64);txt(`${SP[sp].name} · Nv ${lv}`,x+48,y+106,C.ink,{s:1,al:'c',sh:0})});
  txt('A : CONTINUER',W-24,302,C.mute,{mini:1,al:'r'})};for(;;){const k=await key();if(k==='a'||k==='b')break}ui.panel=null}
// --- Tableau des Missions : 3 missions à la fois (capture, chasse, pêche), remplacées dès que la récompense est touchée ---
const MSK={cap:'CAPTURE',ko:'CHASSE',fish:'PÊCHE',ev:'ÉVEIL'};
const msTxt=q=>q.k==='cap'?`capturer ${SP[q.v].name}`:q.k==='ko'?`vaincre ${q.need} créatures ${TY[q.v][0]} sauvages`:q.k==='ev'?`éveiller ${q.need} fois une créature en combat`:`pêcher ${q.need} créatures`;
const msShort=q=>q.k==='cap'?`Capturer ${SP[q.v].name}`:q.k==='ko'?`Vaincre ${q.need} ${TY[q.v][0]}`:q.k==='ev'?`Éveiller ${q.need} fois`:`Pêcher ${q.need} créatures`;
function msNew(){const L=G.ms?.L||[],tier=(f().badge?1:0)+(f().eclipse?1:0)+(f().badge2?1:0)+(f().badge3?1:0)+(f().badge4?1:0)+(f().balance?1:0),pk=a=>a[Math.floor(Math.random()*a.length)],zone=k=>MAPS[k].name.split(' · ')[0];
 const E=Object.keys(MAPS).filter(k=>G.seen?.[k]&&MAPS[k].enc).flatMap(k=>MAPS[k].enc.map(e=>({m:k,sp:e[0],tm:e[4]})));
 const kinds=['cap','cap','ko','ko',...(G.keys.rod?['fish']:[]),...(G.keys.bracelet?['ev']:[])];let q=null;
 for(let n=0;n<24&&!q;n++){const k=pk(kinds);
  if(k==='cap'&&E.length){const un=E.filter(e=>G.dex[e.sp]!==2),e=un.length&&Math.random()<.65?pk(un):pk(E);if(L.some(o=>o.k==='cap'&&o.v===e.sp))continue;q={k,v:e.sp,need:1,where:zone(e.m)+(e.tm?` (${e.tm==='n'?'la nuit':'le jour'})`:'')}}
  else if(k==='ko'&&E.length){const t=SP[pk(E).sp].t;if(L.some(o=>o.k==='ko'&&o.v===t))continue;q={k,v:t,need:3+(tier>>1)+rnd(0,1),where:'Créatures sauvages : '+[...new Set(E.filter(e=>SP[e.sp].t===t).map(e=>zone(e.m)))].slice(0,2).join(', ')}}
  else if(k==='fish'){if(L.some(o=>o.k==='fish'))continue;q={k,v:'',need:2+(tier>1?1:0),where:'Face à l\'eau, avec la canne de Gus'}}
  else if(k==='ev'){if(L.some(o=>o.k==='ev'))continue;q={k,v:'',need:2,where:'Remplis la jauge du Bracelet, puis choisis ÉVEIL DU CYCLE'}}}
 q??={k:'ko',v:'NOR',need:3,where:'Créatures sauvages : Route 1'};
 const tt=q.k==='ko'?q.v:q.k==='cap'?SP[q.v].t:q.k==='ev'?'LUM':'EAU',pool=[['biscuit',2],['baiesoin',2],['supercapsule',3],['superpotion',2],['repousse',2],...(tier?[['baieprisme',2],['hypercapsule',2],['elixir',1],[BOOST[tt],1],[BOOST[tt],1]]:[])];
 const own=k=>G.bag[k]>0||G.party.some(m=>m.item===k)||G.box.some(m=>m.item===k),rare=RARE.filter(k=>!own(k));
 q.rw=tier&&rare.length&&Math.random()<.2?[pk(rare),1]:pk(pool);q.gold=300+tier*250+(q.k==='cap'?150:0)+rnd(0,4)*25;q.n=0;return q}
async function missionBoard(){G.ms??={L:[],done:0};while(G.ms.L.length<3)G.ms.L.push(msNew());
 if(!f().tip_ms){f().tip_ms=1;await say('Voici le Tableau des Missions ! Les dresseurs d\'Aurélys y affichent leurs demandes : captures, chasses et pêches. Accomplis-en une, puis reviens toucher ta récompense dans n\'importe quel Centre de Soins.','Infirmière')}
 for(;;){ui.dim='Tableau des Missions';const i=await choose(G.ms.L.map(msShort),{bare:1,rect:i=>[12,40+i*90,456,84],draw:(i,r,sel,pr)=>drawMission(G.ms.L[i],r,sel,pr)});ui.dim=null;if(i<0)return;const q=G.ms.L[i];
  if(q.done){G.money+=q.gold;give(q.rw[0],q.rw[1]);G.ms.done=(G.ms.done||0)+1;await say(`Mission réussie ! Tu reçois ${q.gold} pièces et ${IT[q.rw[0]][0]} x${q.rw[1]} !`);G.ms.L[i]=msNew();save();continue}
  show(`${msShort(q)}. ${q.where}.`);const c=await choose(['GARDER','ABANDONNER'],{w:200});ui.text=null;if(c===1&&await ask('Abandonner cette mission ? Une autre la remplacera.'))G.ms.L[i]=msNew()}}
function drawMission(q,[x,y,w,h],sel,pr){rr(x+4,y+4,w,h,4,'rgba(8,6,20,.45)');rr(x,y,w,h,4,C.ink);rr(x+2,y+2,w-4,h-4,2,sel||pr?C.acc:q.done?C.gold:C.frame);rr(x+6,y+6,w-12,h-12,2,sel?'#fff8ee':C.paper);R(X,'#ffffff',x+8,y+6,w-16,2);
 if(q.k==='cap'){const im=monSpr(q.v,0,48);X.drawImage(G.dex[q.v]?im:silh(im,'#8a80a6'),x+10,y+18,48,48)}else X.drawImage(bigIco(q.k==='ko'?'star':q.k==='ev'?'bracelet':'rod'),x+18,y+26,32,32);
 txt(MSK[q.k],x+66,y+24,C.mute,{mini:1});txt(msShort(q),x+66,y+44,C.ink);txt(q.where,x+66,y+58,C.ink2,{s:1,sh:0});
 bar(x+66,y+64,170,q.n/q.need,q.done?C.green:C.blue,8);txt(`${q.n}/${q.need}`,x+244,y+72,C.ink2,{mini:1});
 X.drawImage(ICO[q.rw[0]],x+w-118,y+16,16,16);txt('x'+q.rw[1],x+w-96,y+29,C.ink,{mini:1});X.drawImage(ICO.coin,x+w-118,y+38,16,16);txt(q.gold,x+w-96,y+51,C.ink,{mini:1});
 if(q.done&&(now()/400|0)%2)txt('RÉCOMPENSE !',x+w-14,y+74,'#c8902a',{mini:1,al:'r'})}
// --- Nouveautés de la version 8.0 : une aventure complète ---
const NEWS=[[()=>ICO.pin,'La Faille (après l\'aventure)','Caïus refuse la paix et creuse sous le Sanctuaire. Leviers, rocher, sbires d\'élite… et la Capsule Cycle.'],
 [()=>monSpr('nebulin',0,48),'7 nouveaux Pixémons','70 espèces : Nébulin et sa lignée stellaire, Grumeroc, Conglolem, et les jumeaux Héliote et Séléniote.'],
 [()=>ICO.poussiere,'Nuits d\'étoiles filantes','Une nuit sur trois : Météosaur plus nombreux, Nébulin à pêcher, poussières d\'étoile à échanger chez Lys.'],
 [()=>ICO.bCre,'Revanches et paliers','Revanche quotidienne contre Orane, récompenses du Pixédex jusqu\'à 60 espèces, rareté affichée.'],
 [()=>ICO.dex,'3 emplacements de sauvegarde','Trois parties en parallèle, volumes séparés pour la musique et les effets.'],
 [()=>ICO.flag,'Toujours un objectif','Le journal t\'indique la prochaine étape, même après la fin de l\'histoire.'],
 [()=>ICO.board,'Graphismes libres','Projet libre Tuxemon et ses artistes : appuie sur A pour les crédits.']];
const newsBody=()=>NEWS.forEach(([ic,t,s],i)=>{const y=48+i*36,im=ic(),sm=im.width<8;X.drawImage(im,24,y+(sm?2:0),sm?14:16,sm?12:16);txt(t,46,y+15);wrap(s,404,1).slice(0,2).forEach((l,j)=>txt(l,46,y+25+j*9,C.ink2,{s:1,sh:0}))});
// Crédits graphiques (détail complet dans CREDITS.md)
const CREDITS=['Graphismes libres du projet Tuxemon et de ses artistes :','github.com/Tuxemon/Tuxemon','',
 'Créatures, personnages et tuiles : Sanglorian, Catch Challenger,','rubberduck, JaskRendix, Kelvin Shadewing, George, ArMM1998,','Mike Bramson, Leo, Kurt Stine, Rawng, Princess-phoenix, pboop,',
 'tamashihoshi, Pixel Scuba, pixelartm, luke83, PastTheFuture, Midi,','RedVoxel, Superpowers Asset Packs et tous les contributeurs.','',
 'Licences : CC BY-SA 4.0 (partage à l\'identique), CC BY 3.0 / 4.0,','CC0 et XYG. Les images du jeu en dérivent et gardent ces licences.','',
 'Liste complète des auteurs : fichier CREDITS.md du projet.'];
async function whatsNew(){let pg=0;ui.panel=()=>{panel(8,8,464,304);X.drawImage(pg?ICO.board:ICO.star,24,22,16,16);txt(pg?'CRÉDITS':'NOUVEAUTÉS 8.0',46,36,C.acc,{sh:0});txt(pg?'A / B : FERMER':'A : CRÉDITS   B : FERMER',456,34,C.mute,{mini:1,al:'r'});R(X,C.paper2,20,44,440,2);
  if(pg)CREDITS.forEach((l,k)=>txt(l,28,66+k*18,k<2?C.ink:C.ink2,{s:1,sh:0}));else newsBody()};
 for(;;){const k=await key();if(k==='a'&&!pg){pg=1;continue}if(k==='a'||k==='b')break}ui.panel=null}
// Guide : table des types (ligne = attaque, colonne = défense) et rappel des mécaniques
async function guide(){let pg=0;const TT=Object.keys(TY),AB={NOR:'NOR',FEU:'FEU',EAU:'EAU',PLA:'PLA',ELE:'ÉLE',ROC:'ROC',OMB:'OMB',LUM:'LUM'};
 ui.panel=()=>{panel(8,8,464,304);X.drawImage(ICO.guide,24,22,16,16);txt(pg?'MÉCANIQUES':'TABLE DES TYPES',46,36,C.acc,{sh:0});txt('PAGE '+(pg+1)+'/2 - B : FERMER',456,34,C.mute,{mini:1,al:'r'});R(X,C.paper2,20,44,440,2);
  if(pg){newsBody();return}const x0=100,y0=72,cw=44,ch=25;
  TT.forEach((t,j)=>{const x=x0+j*cw;rr(x,y0-18,cw-4,16,2,C.ink);R(X,TY[t][1],x+2,y0-16,cw-8,12);txt(AB[t],x+(cw-4)/2,y0-6,'#ffffff',{mini:1,al:'c'})});
  TT.forEach((a,i)=>{const y=y0+2+i*ch;chip(a,22,y+4);TT.forEach((d,j)=>{const x=x0+j*cw,e=eff(a,d);R(X,(i+j)%2?'#efe6d2':'#f6efdf',x,y,cw-4,ch-3);if(e!==1){R(X,e>1?'#bfe8b0':'#f0c0c0',x+2,y+2,cw-8,ch-7);txt(e>1?'X2':'/2',x+(cw-4)/2,y+16,e>1?'#2f7a3a':'#a8303a',{mini:1,al:'c'})}})});
  txt('LIGNE : TYPE QUI ATTAQUE   COLONNE : TYPE QUI DÉFEND',W/2,288,C.mute,{mini:1,al:'c'});txt('X2 : SUPER EFFICACE   /2 : PEU EFFICACE   VIDE : NORMAL',W/2,300,C.ink2,{mini:1,al:'c'})};
 for(;;){const k=await key();if(['left','right','up','down','a'].includes(k)){pg=1-pg;sfx('sel');continue}if(k==='b')break}ui.panel=null}
const fmtT=ms=>{const m=Math.floor(ms/60000);return`${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`};
function goal(){const g=f();return!g.starter?'Va voir le Prof. Saule dans son labo (toit vert).':!g.badge?'Rejoins Cendreville au nord et bats Brasia, la championne d\'arène.':!g.mine&&!g.rival2?'Sauve Tito, l\'apprenti mineur coincé dans la Mine de Cendreville, au nord de la ville.':!g.rival2?'Traverse la Forêt Murmure, à l\'est de Cendreville.':!g.boss?'Gravis le Mont Braise et arrête Vex, le chef de la Team Éclipse.':
 !g.r2?'Retourne à Cendreville : Brasia peut dégager la route de l\'ouest.':!g.portScene?'Suis la Route 2 vers l\'ouest jusqu\'à Port-Miroir.':!g.badge2?'Bats Maëlle, la championne de Port-Miroir, pour accéder à la Grotte Écho.':!g.kael3?'Rejoins la sortie nord de Port-Miroir.':
 !g.obsScene&&!g.volArr?'Traverse la Grotte Écho jusqu\'au plateau de Volterre.':!g.obsScene&&!g.baseDone?'Libère la Centrale de Volterre (au sud-est de la ville), occupée par la Team Éclipse.':!g.obsScene&&!g.badge4?'Bats Ambroise, le Champion de l\'Arène Volt de Volterre.':!g.obsScene?'Prends le téléphérique au nord de Volterre jusqu\'à l\'Observatoire.':!g.bar?'Désactive la barrière : trouve l\'ordre des consoles.':!g.selene2done?'Affronte Sélène devant le dôme.':!g.vex2?'Arrête Vex sous le dôme de l\'Observatoire.':
 postGoal(g)}
function postGoal(g){const L=[[!g.legS||!g.legN,'Défie Solarion (Mont Braise, le jour) et Nocturion (Observatoire, la nuit).'],[!g.failleDone,'Sélène t\'attend sur les Coteaux d\'Aurore : Caïus creuse la Faille sous le Sanctuaire.'],[!g.badge3,'Bats Orane, la Championne de Lunévie. Son arène n\'ouvre que la nuit.'],[!g.tourWins,'Remporte le Tournoi du Cycle de Brasia, à Cendreville.'],[!g.legC,'Monte au Sanctuaire du Cycle, en haut des Coteaux d\'Aurore, avec Solarion et Nocturion.'],[g.legC&&(!g.legH||!g.legL),'Les jumeaux Héliote et Séléniote veillent sur le Sanctuaire, l\'un le jour, l\'autre la nuit.'],[ELIASOK()&&!g.eliasWin,g.eliasQ?'Papa t\'attend sous le dôme de l\'Observatoire, la nuit.':'Rentre voir Papa à Bourg-Lueur : il a quelque chose à te demander.'],[!g.tower7,'Relève le Défi du Crépuscule d\'Orane, à Lunévie : sept victoires d\'affilée.'],[caught()<60,'Complète le Pixédex (60 espèces), un dernier défi t\'attendra.'],[caught()<DEX.length,'Complète le Pixédex. Les nuits d\'étoiles filantes cachent des créatures rares.']].find(x=>x[0]);
 return L?L[1]:'Tu as tout accompli. Aurélys te doit son Cycle… Défends ton titre au Tournoi et bats ton record au Défi du Crépuscule !'}

// =====================================================================
// MENUS DU JEU (équipe, résumé, sac, Pixédex, journal, pause)
// =====================================================================
function stChip(m,x,y){if(!m.st||m.hp<=0)return 0;const[n,c]=STN[m.st],w=tw(n,2,1)+12;rr(x,y,w,16,2,C.ink);R(X,c,x+2,y+2,w-4,12);txt(n,x+6,y+13,C.ink,{mini:1});txt(n,x+6,y+12,'#ffffff',{mini:1});return w}
function partyMenu(title,cancel=true){ui.dim=title;return choose(G.party.map(nm),{bare:1,cols:2,cancel,rect:i=>[12+(i%2)*232,40+(i>>1)*92,224,86],draw:(i,[x,y,w,h],sel,pr)=>{const m=G.party[i],S=st(m),ko=m.hp<=0,yy=y-(sel?2:0);
  rr(x+4,yy+4,w,h,4,'rgba(8,6,20,.45)');rr(x,yy,w,h,4,C.ink);rr(x+2,yy+2,w-4,h-4,2,sel||pr?C.acc:ko?'#6a6280':C.frame);rr(x+6,yy+6,w-12,h-12,2,ko?'#e4dfe8':sel?'#fff8ee':C.paper);R(X,'#ffffff',x+8,yy+6,w-16,2);
  const ic=monSpr(m.sp,0,48,m.sh,sel&&!ko?(now()/220|0)%2:0),bob=0;pell(X,x+38,yy+66,18,3,'rgba(31,26,51,.15)');X.drawImage(ko?silh(ic,'#9a92aa'):ic,x+14,yy+18-bob,48,48);
  txt(nm(m),x+70,yy+28,ko?C.mute:C.ink);txt('NV'+m.lv,x+14,yy+80,C.ink2,{mini:1});if(m.item)X.drawImage(ICO[m.item],x+w-26,yy+14,16,16);const cw=chip(SP[m.sp].t,x+70,yy+34);stChip(m,x+74+cw,yy+34);if(ko){rr(x+w-56,yy+34,44,16,2,C.ink);txt('K.O.',x+w-50,yy+46,'#ff8a8a',{mini:1})}
  hpBar(x+96,yy+56,w-110,m.hp/S.hp);txt(`${m.hp}/${S.hp}`,x+w-14,yy+78,C.ink2,{mini:1,al:'r'})}}).finally(()=>ui.dim=null)}
function drawDim(){if(!ui.dim)return;X.fillStyle='rgba(18,14,34,.8)';X.fillRect(0,0,W,H);tag(12,8,ui.dim.toUpperCase(),C.acc);txt('B : RETOUR',W-14,24,'#c9c2d6',{mini:1,al:'r'})}
async function summary(m){ui.panel=()=>{const S=st(m),sp=SP[m.sp];panel(8,8,464,304);rr(20,20,176,184,4,'#efe6d2');pell(X,108,182,64,10,'#d8cbb0');pell(X,108,180,58,8,'#e6dcc6');X.drawImage(monSpr(m.sp,0,128,m.sh),44,60-(now()/400|0)%2*2,128,128);
 txt(nm(m),28,44);txt('Nv '+m.lv,188,44,C.ink,{al:'r'});const cw=chip(sp.t,28,54);stChip(m,32+cw,54);if(m.sh){X.drawImage(ICO.star,174,56,14,14);txt('CHROMA',188,84,C.acc,{mini:1,al:'r'})}const bl=bondLv(m);for(let h=0;h<5;h++)X.drawImage(h<bl?ICO.hrt:ICO.hrt0,28+h*15,74,14,12);
 if(m.item){X.drawImage(ICO[m.item],26,182,16,16);txt(IT[m.item][0],46,195,C.ink2,{s:1,sh:0})}
 const mx=Math.max(S.atk,S.def,S.spd)*1.15;[['PV',`${m.hp}/${S.hp}`,m.hp/S.hp,hpCol(m.hp/S.hp)],['ATTAQUE',S.atk,S.atk/mx,C.acc],['DÉFENSE',S.def,S.def/mx,C.blue],['VITESSE',S.spd,S.spd/mx,C.gold]].forEach(([a,b,k,c],i)=>{const y=36+i*30;txt(a,212,y,C.mute,{sh:0});txt(b,456,y,C.ink,{al:'r'});bar(212,y+3,244,k,c,6)});
 const T=TAL[sp.tal];txt('TALENT',212,158,C.mute,{sh:0});txt(T[0],456,158,C.acc,{al:'r',sh:0});wrap(T[1],244,1).slice(0,2).forEach((l,i)=>txt(l,212,170+i*10,C.ink2,{s:1,sh:0}));
 const e0=xpFor(m.lv),e1=xpFor(m.lv+1);txt('EXP',212,194,C.blue,{mini:1});txt(`${Math.max(0,e1-m.exp)} AVANT NV ${m.lv+1}`,456,194,C.ink2,{mini:1,al:'r'});bar(212,198,244,(m.exp-e0)/(e1-e0),C.blue,6);
 R(X,C.paper2,20,210,440,2);m.moves.forEach((id,i)=>{const v=MV[id],x=20+(i%2)*222,y=216+(i>>1)*44;rr(x,y,216,40,2,'#efe6d2');chip(v.t,x+6,y+4);txt(v.p?'PUISS '+bp(m,v):'STATUT',x+208,y+16,C.ink2,{mini:1,al:'r'});txt(v.n,x+8,y+36);txt(`PP ${m.pp[i]}/${v.pp}`,x+208,y+34,m.pp[i]?C.ink2:C.red,{mini:1,al:'r'})})};
 for(;;){const k=await key();if(k==='a'||k==='b')break}ui.panel=null}
async function teamMenu(){if(!G.party.length)return say('Tu n\'as pas encore de créature.');for(;;){const i=await partyMenu('Équipe');if(i<0)return;ui.dim='Équipe';const j=await choose(['RÉSUMÉ','EN TÊTE','OBJET','RETOUR'],{w:160});ui.dim=null;if(j===0)await summary(G.party[i]);if(j===1&&i>0)G.party.unshift(G.party.splice(i,1)[0]);if(j===2)await itemMenu(G.party[i])}}
async function itemMenu(m){if(m.item){if(await ask(`${nm(m)} tient ${IT[m.item][0]}. Le reprendre ?`)){const k=m.item;m.item=null;G.bag[k]=(G.bag[k]||0)+1;await say(`Tu reprends ${IT[k][0]} à ${nm(m)}.`)}return}
 const ks=Object.keys(G.bag).filter(k=>G.bag[k]>0&&IT[k]?.[4]==='held');if(!ks.length)return say('Tu n\'as aucun objet à faire tenir. Les baies poussent sur les arbres des routes, et le Tableau des Missions en offre bien d\'autres !');
 const i=await choose(ks.map(k=>IT[k][0]),{x:W-276,y:8,w:268,vis:7,title:'Faire tenir',icons:ks.map(k=>ICO[k]),info:i=>({icon:bigIco(ks[i]),s:IT[ks[i]][2]}),
  draw:(i,x,y,sel,pr)=>{const c=pr?'#ffffff':C.ink,o={sh:pr?0:undefined};txt(IT[ks[i]][0],x,y+19,c,o);txt('x'+G.bag[ks[i]],x+204,y+19,c,{...o,al:'r'})}});if(i>=0)await giveHeld(m,ks[i])}
async function giveHeld(m,k){const old=m.item;G.bag[k]--;m.item=k;if(old)G.bag[old]=(G.bag[old]||0)+1;sfx('ok');tip('held',HELDTIP);await say(old?`${nm(m)} rend ${IT[old][0]} et tient maintenant ${IT[k][0]}.`:`${nm(m)} tient maintenant ${IT[k][0]}.`)}
async function feedTreat(m,k){const b=bondLv(m);m.aff=Math.min(255,(m.aff||0)+IT[k][3]);sfx('ok');ui.pop={ic:ICO[k],t0:now()};const b2=bondLv(m);
 await say(b2>b?`${nm(m)} croque le ${IT[k][0]} avec délice ! Votre lien grandit : ${BONDN[b2]} !`:m.aff>=255?`${nm(m)} adore le ${IT[k][0]}. Vous êtes déjà inséparables !`:`${nm(m)} croque le ${IT[k][0]} avec délice. Votre lien se renforce.`)}
async function bagMenu(inB){for(;;){const ks=Object.keys(G.bag).filter(k=>G.bag[k]>0&&IT[k]).sort((a,b)=>CATO.indexOf(IT[a][4])-CATO.indexOf(IT[b][4]));if(!ks.length){await say('Ton sac est vide.');return null}
 const kind=k=>IT[k][4],noUse=i=>inB?['repel','held','treat'].includes(kind(ks[i])):kind(ks[i])==='ball';
 const i=await choose(ks.map(k=>IT[k][0]),{x:W-276,y:8,w:268,vis:7,title:'Sac',icons:ks.map(k=>ICO[k]),info:i=>({icon:bigIco(ks[i]),s:IT[ks[i]][2]}),dis:noUse,
  draw:(i,x,y,sel,pr)=>{const c=pr?'#ffffff':noUse(i)?C.mute:C.ink,o={sh:pr?0:undefined};txt(IT[ks[i]][0],x,y+19,c,o);txt('x'+G.bag[ks[i]],x+204,y+19,c,{...o,al:'r'})}});if(i<0)return null;const k=ks[i],K=kind(k);
 if(K==='ball'){if(!inB){await say('Ce n\'est pas le moment de l\'utiliser !');continue}if(B.tr){await say('On ne capture pas la créature d\'un dresseur !');continue}G.bag[k]--;return{ball:k}}
 if(K==='quest'){await say(IT[k][2]);continue}
 if(K==='evo'){if(inB){await say('Ce n\'est pas le moment de l\'utiliser !');continue}const t=await partyMenu('Utiliser sur qui ?');if(t<0)continue;const m=G.party[t],to=evoTarget(m,k);if(!to){await say('Ça n\'a aucun effet.');continue}G.bag[k]--;await evolve(m,to);await fadeTo(0,250);save();return{used:1}}
 if(K==='repel'){if(inB){await say('Ce n\'est pas le moment de l\'utiliser !');continue}G.bag[k]--;G.repel=IT[k][3];sfx('lv');await say('Tu utilises une Repousse. Les créatures sauvages plus faibles que ta créature de tête t\'éviteront un moment.');return{used:1}}
 if(K==='held'||K==='treat'){if(inB){await say('Ce n\'est pas le moment de l\'utiliser !');continue}const t=await partyMenu(K==='held'?'Faire tenir à qui ?':'Donner à qui ?');if(t<0)continue;
  if(K==='held')await giveHeld(G.party[t],k);else{G.bag[k]--;await feedTreat(G.party[t],k)}return{used:1}}
 const t=await partyMenu('Utiliser sur qui ?');if(t<0)continue;const m=G.party[t],S=st(m);
 if(K==='revive'?m.hp>0:K==='heal'?m.hp<=0||m.hp>=S.hp:K==='cure'?!m.st||m.hp<=0:m.pp.every((p,j)=>p>=MV[m.moves[j]].pp)){await say('Ça n\'aura aucun effet.');continue}
 G.bag[k]--;sfx('lv');bondUp(m,1);
 if(K==='heal'||K==='revive'){const b0=m.hp;m.hp=K==='revive'?S.hp>>1:Math.min(S.hp,m.hp+IT[k][3]);if(inB&&m===B.me){healFx(0);await tween(B.dh,0,m.hp,400)}await say(K==='revive'?`${nm(m)} est ranimé !`:`${nm(m)} récupère ${m.hp-b0} PV.`)}
 else if(K==='cure'){m.st=null;m.slp=0;await say(`${nm(m)} est guéri !`)}
 else{m.pp=m.pp.map((p,j)=>Math.min(MV[m.moves[j]].pp,p+IT[k][3]));await say(`Les PP de ${nm(m)} sont restaurés.`)}
 return{used:1}}}
function dims(k){const sp=SP[k],b=sp.bs.reduce((a,c)=>a+c,0),h=Math.max(.2,Math.round((Math.pow(b/100,1.6)*.22+(HSH(k.length*7,k.charCodeAt(1))%7)/20)*10)/10),w=Math.round(h*h*h*(14+HSH(k.charCodeAt(0),k.length)%22)*10)/10;return`${String(h).replace('.',',')} m · ${String(w).replace('.',',')} kg`}
function rarity(k){if(['solarion','nocturion','crepuscel'].includes(k))return'LÉGENDAIRE';if(['presagelle','heliote','seleniote'].includes(k))return'MYTHIQUE';let b=0;for(const M of Object.values(MAPS))for(const T of[M.enc,M.fish,M.fish2])if(T){const s=T.reduce((a,e)=>a+e[3],0);for(const e of T)if(e[0]===k)b=Math.max(b,e[3]/s*(e[4]==='s'||e[4]==='e'?.4:1))}return!b?(SP[k].base!==k?'ÉVOLUTION':'UNIQUE'):b>=.18?'COMMUNE':b>=.08?'PEU COMMUNE':'RARE'}
function activ(k){const o={heliote:'Diurne',solarion:'Diurne',seleniote:'Nocturne',nocturion:'Nocturne',presagelle:'Nocturne',crepuscel:'Crépuscule'}[k];if(o)return o;const s=new Set();for(const M of Object.values(MAPS))for(const e of M.enc||[])if(e[0]===k)s.add(e[4]||'t');return s.has('t')||s.has('j')&&s.has('n')?'Jour et nuit':s.has('n')?'Nocturne':s.has('j')?'Diurne':s.has('e')?'Pendant l\'éclipse':s.has('r')?'Par temps de pluie':Object.values(MAPS).some(M=>[...(M.fish||[]),...(M.fish2||[])].some(e=>e[0]===k))?'Aquatique':'Inconnue'}
function habitat(sp){const out=[];for(const M of Object.values(MAPS)){const T=[...(M.enc||[]).filter(e=>e[0]===sp).map(e=>({n:'nuit',j:'jour',r:'pluie',e:'éclipse'})[e[4]]||'tout'),...(M.fish||[]).filter(e=>e[0]===sp).map(()=>'pêche'),...(M.fish2||[]).filter(e=>e[0]===sp).map(e=>e[4]==='s'?'Super Canne, nuits d\'étoiles filantes':'Super Canne')];if(!T.length)continue;const u=[...new Set(T)];out.push(M.name.split(' · ')[0]+(u.length===1&&u[0]!=='tout'?` (${u[0]})`:''))}
 return out.join(', ')||{solarion:'Mont Braise, au sommet. Le jour seulement.',nocturion:'Observatoire, sous le dôme. La nuit seulement.',crepuscel:'Sanctuaire du Cycle, quand le jour et la nuit marchent à tes côtés.',presagelle:'Une clairière secrète, par les nuits claires… dit la légende.',heliote:'Sanctuaire du Cycle, au grand jour, une fois Crépuscel apaisé.',seleniote:'Sanctuaire du Cycle, la nuit, une fois Crépuscel apaisé.',fossilame:'Un fossile, ranimé par un scientifique.'}[sp]||(SP[sp].base!==sp?'Évolution de '+SP[SP[sp].base].name+'.':'')||'Introuvable à l\'état sauvage.'}
async function dexMenu(){const seen=k=>G.dex[k]>0,got=k=>G.dex[k]===2;let last=0;tip('dexd','Pixédex : A ouvre la fiche détaillée d\'une créature déjà vue. GAUCHE / DROITE font défiler la liste plus vite.');
 for(;;){const s=await choose(DEX.map(k=>k),{i:last,jump:10,x:W-218,y:8,w:210,vis:10,rh:26,title:`Pixédex ${caught()}/${DEX.length}`,ib:[8,8,252,304],
  draw:(i,x,y,sel,pr)=>{const k=DEX[i],c=pr?'#ffffff':seen(k)?C.ink:C.mute;txt(String(i+1).padStart(2,'0'),x,y+19,c,{mini:1,sh:0});txt(seen(k)?SP[k].name:'?????',x+18,y+19,c,{sh:pr?0:undefined});if(got(k))X.drawImage(ICO.capsule,x+146,y+5,14,14)},
  infoDraw:(i,x,y,w)=>{const k=DEX[i],sp=SP[k];rr(x+12,y+12,w-24,116,4,'#efe6d2');pell(X,x+w/2,y+116,42,6,'#d8cbb0');if(seen(k))X.drawImage(got(k)?monSpr(k,0,128):silh(monSpr(k,0,128),'#8a80a6'),x+w/2-64,y+4-(now()/400|0)%2*2,128,128);else txt('?',x+w/2,y+96,C.mute,{s:5,al:'c',sh:0});
   txt(seen(k)?sp.name:'?????',x+16,y+152);if(seen(k))chip(sp.t,x+w-16-tw(TY[sp.t][0],2,1)-12,y+138);
   if(got(k)){wrap(sp.desc,w-32,1).slice(0,4).forEach((l,j)=>txt(l,x+16,y+170+j*11,C.ink,{s:1,sh:0}));txt(dims(k)+' · '+activ(k),x+16,y+222,C.ink2,{s:1,sh:0});wrap('Évol. : '+evoInfo(k),w-32,1).slice(0,2).forEach((l,j)=>txt(l,x+16,y+234+j*10,'#6a4a8a',{s:1,sh:0}))}else txt(seen(k)?'Capture-le pour en savoir plus.':'Aucune donnée.',x+16,y+176,C.mute,{s:1,sh:0});
   R(X,C.paper2,x+14,y+252,w-28,2);txt('HABITAT',x+16,y+264,C.mute,{mini:1});if(seen(k))txt(rarity(k),x+w-16,y+264,{COMMUNE:C.mute,RARE:'#c06a2a',LÉGENDAIRE:'#c8902a',MYTHIQUE:'#8a5ad0'}[rarity(k)]||C.ink2,{mini:1,al:'r'});wrap(seen(k)?habitat(k):'Inconnu',w-32,1).slice(0,3).forEach((l,j)=>txt(l,x+16,y+276+j*10,C.ink2,{s:1,sh:0}))}});
  if(s<0)return;last=s;if(!seen(DEX[s])){sfx('bump');continue}last=await dexDetail(s)}}
// Fiche détaillée : statistiques, talent, chaîne d'évolution, attaques apprises, statut de capture
function evoChain(k){const b=SP[k].base,out=[[b,null]];const walk=s=>{const e=SP[s].evo;if(!e)return;for(const[lv,to,c]of Array.isArray(e[0])?e:[e]){out.push([to,c?.item?IT[c.item][0]:c?.bond?'lien '+c.bond:'niv. '+lv+(c?.time==='j'?' jour':c?.time==='n'?' nuit':'')+(c?.eclipse?' éclipse':''),s]);walk(to)}};walk(b);return out}
async function dexDetail(i){const seenK=k=>G.dex[k]>0;for(;;){const k=DEX[i],sp=SP[k],got=G.dex[k]===2,ch=evoChain(k);
 ui.panel=()=>{panel(8,8,464,304);txt(`N. ${String(i+1).padStart(2,'0')}`,24,32,C.mute,{mini:1});txt(sp.name,24,50);chip(sp.t,30+tw(sp.name,2,0)+10,37);txt(got?'CAPTURÉ':'VU',456,32,got?C.green:C.mute,{mini:1,al:'r'});txt(rarity(k),456,48,C.ink2,{mini:1,al:'r'});
  rr(20,60,112,104,4,'#efe6d2');X.drawImage(got?monSpr(k,0,96):silh(monSpr(k,0,96),'#8a80a6'),28,64,96,96);
  ['PV','ATTAQUE','DÉFENSE','VITESSE'].forEach((l,j)=>{const v=sp.bs[j],y=72+j*20;txt(l,146,y+8,C.ink2,{mini:1});R(X,C.ink,212,y,122,8);R(X,'#3a3456',213,y+1,120,6);R(X,v>=100?'#4cc46a':v>=70?'#f6c445':'#e8702e',213,y+1,Math.min(120,v*120/150|0),6);txt(got?v:'?',346,y+8,C.ink,{mini:1})});
  const ta=TAL[sp.tal];txt('TALENT',146,166,C.mute,{mini:1});txt(got&&ta?ta[0]:'?',214,166,C.ink,{mini:1});if(got&&ta)wrap(ta[1],300,1).slice(0,1).forEach(l=>txt(l,146,178,C.ink2,{s:1,sh:0}));
  R(X,C.paper2,20,188,440,2);txt('ÉVOLUTION',24,202,C.mute,{mini:1});ch.slice(0,4).forEach(([s,c,pa],j)=>{const x=30+j*108,sn=seenK(s);if(j){const pa=ch[j][2],lb=(pa!==ch[j-1][0]?'de '+SP[pa].name+' ':'')+(c||'');wrap(lb,58,1).slice(0,3).forEach((l,q)=>txt(l,x-22,218+q*10,C.ink2,{s:1,sh:0,al:'c'}))}rr(x+10,206,44,40,3,s===k?'#f6e2a8':'#efe6d2');X.drawImage(G.dex[s]===2?monSpr(s,0,48):silh(monSpr(s,0,48),'#8a80a6'),x+12,204,40,40);txt(sn?SP[s].name:'?????',x+32,258,C.ink,{s:1,sh:0,al:'c'})});
  if(ch.length>4)txt('+'+(ch.length-4),452,232,C.mute,{mini:1,al:'r'});
  R(X,C.paper2,20,264,440,2);txt('ATTAQUES',24,278,C.mute,{mini:1});sp.learn.slice(-6).forEach(([l,mv],j)=>{const x=24+(j%3)*148,y=292+(j/3|0)*11;txt(got?`Nv ${l} · ${MV[mv].n}`:'?',x,y,got?C.ink:C.mute,{s:1,sh:0})})};
 const kk=await key();if(kk==='left'||kk==='right'){let j=i;do j=(j+(kk==='left'?-1:1)+DEX.length)%DEX.length;while(!seenK(DEX[j]));i=j;sfx('sel');continue}if(kk==='a'||kk==='b'){ui.panel=null;sfx('back');return i}}}
function quests(){const g=f(),n=G.keys.shards||0,nx=DXR.find(r=>caught()<r[0]);return[
 ['Objectif',goal().startsWith('Tu as tout')?2:1,goal()],
 g.starter&&['La vieille canne',G.keys.rod?2:1,G.keys.rod?'Gus t\'a confié sa canne. Face à l\'eau : A, puis A quand ça mord.':'Le Vieux Gus, près de la mare de Bourg-Lueur, veut te parler.'],
 g.theoQ&&['Le rêve de Théo',g.theoQ===2?2:1,g.theoQ===2?'Théo a vu un Lumignon. Il ne parle plus que de ça.':'Montre un Lumignon au Petit Théo, à Bourg-Lueur, le jour. Les Lumignon sortent la nuit sur la Route 1.'],
 g.gusQ&&['Le roi des mares',g.gusQ===2?2:1,g.gusQ===2?'Gus a enfin vu un Crapaflot. Il en parlera encore dans quarante ans.':'Montre un Crapaflot au Vieux Gus, à Bourg-Lueur. On en pêche à Port-Miroir et sur la Rive Brumeuse.'],
 g.rosaQ&&['La tisane de Rosa',g.rosaQ===2?2:1,g.rosaQ===2?'Mémé Rosa a eu sa tisane, et t\'a offert son ruban de mariage.':'Apporte 3 Baies Prisme à Mémé Rosa, à Port-Miroir. Les arbres à baies en donnent chaque jour.'],
 g.lili&&['L\'Ombrelin de Lili',g.lili===3?2:1,g.lili===3?'Mimo est rentré chez Lili.':g.lili===2?'Ramène Mimo à Lili, à Cendreville.':'Mimo se cache dans la Forêt Murmure. Il ne sort que la nuit.'],
 n&&['Éclats d\'Aube',n>=12?2:1,`${n}/12 trouvés. ${g.lumen?'L\'Ermite Lumen enseigne la LUMIÈRE en échange.':'Un ermite de la Forêt Murmure s\'y intéresse, dit-on.'}`],
 G.keys.dex&&['Pixédex',caught()>=DEX.length?2:1,`${caught()}/${DEX.length} capturées.${nx?` Récompense du Prof. à ${nx[0]}.`:''}`],
(()=>{const sw=swarm();return sw&&['Rumeur du jour',1,`Un essaim de ${SP[sw[1]].name} a été aperçu : ${MAPS[sw[0]].name.split(' · ')[0]}. Ça ne durera qu'une journée !`]})(),
 G.keys.pages&&['Le journal de Valen',G.keys.pages>=4?2:1,`${G.keys.pages}/4 pages retrouvées.${G.keys.pages>=4&&!g.pagesDone?' Valen voudra sans doute les relire.':''} Appuie sur A pour les lire.`],
 g.balance&&['Les Ruines de l\'Aube',G.keys.sablier?2:1,G.keys.sablier?'Tu as obtenu le Sablier du Cycle.':g.ruinsOpen?'Les Ruines s\'ouvrent au sommet du Mont Braise. Atteins l\'autel.':'Une porte scellée, au sommet du Mont Braise, réagit peut-être au retour du Cycle…'],
 g.badge&&['Les Coteaux d\'Aurore',g.cot?2:1,g.cot?'Tu as battu l\'Admin Caïus à l\'autel. Sélène t\'a confié le Médaillon de Brume.':'Un éboulement bloquait la route au nord de Cendreville. Elle est dégagée : la Team Éclipse rôde près d\'un vieil autel.'],
 g.cot&&['Le Médaillon de Brume',g.medGiven?2:1,g.medGiven?'Valen a retrouvé le médaillon de Brume. Et le chemin de Lunévie.':g.ysL?'Ysolde t\'a révélé le passé de Valen. Rends-lui le médaillon quand le Cycle sera rétabli : il sera sous le dôme de l\'Observatoire.':'Le médaillon porte un nom : "Brume". Sélène parle d\'une grand-mère à Lunévie, au nord des Coteaux.'],
 g.cot&&['L\'Arène Crépuscule',g.badge3?2:1,g.badge3?'Orane t\'a remis le Badge Crépuscule. La Boutique de Lunévie vend désormais des pierres d\'évolution.':'L\'Arène de Lunévie n\'ouvre qu\'à la nuit tombée. La Championne Orane y combat dans le noir : une créature FEU, ÉLEC ou LUMIÈRE éclaire la salle.'],
 G.keys.rod&&g.cot&&['La Super Canne',G.keys.rod2?2:1,G.keys.rod2?'Avec la Super Canne, de nouvelles créatures mordent dans les eaux profondes (Lunévie, Port-Miroir, Rive Brumeuse).':'Le Pêcheur Jo de Lunévie veut voir un Miroitruite.'],
 (G.bag.fossile||ownSp('fossilame'))&&['Le Fossile Ancien',ownSp('fossilame')?2:1,ownSp('fossilame')?'Le Prof. Saule a ranimé Fossilame.':'Montre le Fossile Ancien au Prof. Saule, à Bourg-Lueur.'],
 g.lysQ&&['Un morceau de ciel',g.lysQ===2?2:1,g.lysQ===2?'L\'Astronome Lys a vu un Météosaur. Elle t\'a offert deux pierres tombées du ciel.':'Montre un Météosaur à l\'Astronome Lys, à Lunévie, la nuit. On en trouve sur les Coteaux d\'Aurore.'],
 stars()&&['Nuit d\'étoiles filantes',1,'Ce soir, le ciel pleut de la lumière : Météosaur plus nombreux sur les Coteaux, Nébulin au bout de la Super Canne à Lunévie, poussières d\'étoile à ramasser sur les Coteaux.'],
 (G.keys.larmes||G.keys.larmeS||G.keys.larmesDone)&&['Les larmes du Cycle',g.amuC?2:1,g.amuC?'L\'autel du Sanctuaire a uni les larmes : tu portes l\'Amulette du Cycle.':`Larme de Solarion : ${G.keys.larmeS?'trouvée':'?'} · Larmes de Nocturion : ${G.keys.larmes||0}/6. Elles ne brillent que pendant une éclipse.${g.legC?' Le Sablier peut la rappeler.':''}`],
 g.eliasQ&&['Le défi d\'Elias',g.eliasWin?2:1,g.eliasWin?'Tu as battu ton père sous le dôme. Tu portes l\'Étoile d\'Elias.':'Papa t\'attend sous le dôme de l\'Observatoire, la nuit, pour un dernier combat.'],
 G.photos&&['Photos de lien',G.keys.coeur?2:1,`${Object.values(G.photos).filter(v=>v>=5).length}/6 portraits d'inséparables chez la Photographe Lise (Port-Miroir).`],
 g.balance&&['La Faille',g.failleDone?2:1,g.failleDone?'Caïus a renoncé. Il a accepté une soupe chez Ysolde. Sélène t\'a confié la Capsule Cycle.':g.failleQ?'Caïus creuse sous le Sanctuaire. Baisse les deux leviers de la Faille pour couper la barrière, puis va le trouver au fond.':'Sélène t\'attend sur les Coteaux d\'Aurore, près d\'une galerie fraîchement creusée.'],
 g.legC&&['Les jumeaux du Sanctuaire',g.legH&&g.legL?2:1,`Héliote ${g.legH?'capturé':'(le jour)'} · Séléniote ${g.legL?'capturée':'(la nuit)'}. Ils veillent sur l'autel du Sanctuaire.`],
 g.balance&&['Le Sanctuaire du Cycle',g.legC?2:1,g.legC?'Crépuscel, gardien du Cycle, a rejoint ton équipe.':g.sanct?'Le sanctuaire attend que Solarion et Nocturion soient à tes côtés.':'Une porte de pierre, en haut des Coteaux d\'Aurore, s\'est ouverte avec le retour du Cycle.'],
 g.balance&&g.badge3&&['Le Défi du Crépuscule',g.tower7?2:1,`Orane propose sept combats d'affilée à Lunévie, la nuit. Record : ${g.towerBest||0}/7.`],
 g.balance&&['Les gardiens',g.legS&&g.legN?2:1,`Solarion ${g.legS?'capturé':'au Mont Braise (jour)'} · Nocturion ${g.legN?'capturé':'à l\'Observatoire (nuit)'}`],
 g.balance&&['Le Tournoi du Cycle',g.tourWins?2:1,g.tourWins?`Remporté ${g.tourWins} fois. Brasia te réinvite chaque jour à Cendreville pour défendre ton titre.`:'Brasia organise un tournoi dans l\'Arène de Cendreville : quatre combats d\'affilée contre les meilleurs dresseurs d\'Aurélys.'],
 G.ms&&['Tableau des Missions',1,`${G.ms.L.filter(q=>q.done).length} récompense(s) à toucher · ${G.ms.done||0} mission(s) réussie(s). Les Centres de Soins affichent les missions.`]].filter(Boolean)}
const RMAP={bourg:[300,262,'BOURG-LUEUR',12,3],route1:[300,214,'ROUTE 1',12,3],ville:[300,166,'CENDREVILLE',0,-12],foret:[384,166,'FORÊT MURMURE',0,20],mont:[384,82,'MONT BRAISE',0,20],route2:[216,166,'RIVE BRUMEUSE',0,-12],port:[132,190,'PORT-MIROIR',0,20],grotte:[132,122,'GROTTE ÉCHO',12,3],obs:[132,26,'OBSERVATOIRE',12,3],volterre:[132,74,'VOLTERRE',12,3],coteaux:[300,118,'COTEAUX D\'AURORE',12,3],lunevie:[300,70,'LUNÉVIE',12,3],sanctuaire:[370,40,'SANCTUAIRE',12,3]},RPAR={centrale:'volterre',centrale2:'volterre',gym4:'volterre',maisonA:'volterre',lab:'bourg',gym:'ville',gym2:'port',dome:'obs',ruines:'mont',mine:'ville',maisonY:'lunevie',maisonP:'lunevie',gym3:'lunevie',chambre:'bourg',salon:'bourg',clairiere:'foret',faille:'coteaux'},RLINK=[['bourg','route1'],['route1','ville'],['ville','foret'],['foret','mont'],['ville','route2'],['route2','port'],['port','grotte'],['grotte','volterre'],['volterre','obs'],['ville','coteaux'],['coteaux','lunevie'],['coteaux','sanctuaire']];
async function regionMap(){const cur=RPAR[G.map]||G.map,seen=k=>G.seen?.[k]||Object.entries(RPAR).some(([a,b])=>b===k&&G.seen?.[a]);
 ui.panel=()=>{panel(8,8,464,304,{fill:'#efe2bf'});const t=now(),p=(c,x,y,w,h)=>R(X,c,x,y,w,h);
  pell(X,150,214,92,46,'#7ab0c8');pell(X,150,212,86,42,'#8ac8e0');for(let i=0;i<9;i++)p('#b8e4f0',100+(i*23)%100,196+(i*7)%30,8,2);
  for(let i=0;i<4;i++){const x=348+i*18,h=30+i%2*10;for(let y=0;y<h;y++)p(y<6&&i===1?'#e8702e':'#9a7a62',x+18-ev(y*.6),ev(92-h+y),ev(y*1.2)+2,1)}
  for(let i=0;i<14;i++){const x=356+(i*29)%70,y=140+(i*17)%40;p('#3f8a3a',x,y,8,8);p('#5aa846',x+2,y,4,2)}
  for(let y=30;y<92;y+=2)p('#8a7a6a',116+ev(Math.sin(y*.3)*3),y,36,2);p('#3a3256',122,40,22,16);pell(X,133,40,11,8,'#4a4070');p('#5ad0e0',130,36,6,2);
  for(const[a,b]of RLINK){const[x1,y1]=RMAP[a],[x2,y2]=RMAP[b],n=Math.ceil(Math.hypot(x2-x1,y2-y1)/6);for(let i=0;i<=n;i++)p(seen(a)&&seen(b)?'#b88a52':'#d4c4a0',ev(x1+(x2-x1)*i/n)-2,ev(y1+(y2-y1)*i/n)-2,4,4)}
  for(const[k,[x,y,n,lx,ly]]of Object.entries(RMAP)){const sn=seen(k),town=['bourg','ville','port'].includes(k);rr(x-7,y-7,14,14,2,C.ink);R(X,sn?(town?C.acc:C.frameL):'#b0a890',x-5,y-5,10,10);R(X,'#ffffff',x-5,y-5,10,2);
   txt(sn?n:'???',x+lx,y+ly,sn?C.ink:C.mute,{mini:1,al:lx?undefined:'c'})}
  const[cx,cy]=RMAP[cur]||RMAP.bourg;if((t/300|0)%2){X.drawImage(ICO.pin,cx-8,cy-26,16,16)}rr(cx-9,cy-9,18,18,3,C.gold);R(X,C.acc,cx-5,cy-5,10,10);
  txt('AURÉLYS',24,36,C.acc,{sh:0});X.drawImage(ICO.flag,24,276,14,14);wrap(goal(),400,1).slice(0,2).forEach((l,i)=>txt(l,44,286+i*10,C.ink,{s:1,sh:0}));txt('A / B : FERMER',456,300,C.mute,{mini:1,al:'r'})};
 for(;;){const k=await key();if(k==='a'||k==='b')break}ui.panel=null}
async function options(){for(;;){const o=G.opt,bar=v=>(v??4)?(v??4)+'/4':'COUPÉ',O=[`SON : ${o.snd?'OUI':'NON'}`,`MUSIQUE : ${bar(o.mv)}`,`EFFETS : ${bar(o.sv)}`,`COMPAGNON : ${o.fol!==0?'OUI':'NON'}`,`TEXTE : ${o.txt===2?'RAPIDE':'NORMAL'}`,`COMBATS : ${o.fast?'RAPIDES':'NORMAUX'}`,'RETOUR'];
 const i=await choose(O,{x:W-252,y:8,w:244,title:'Options'});if(i<0||i===6)return;if(i===5)o.fast=o.fast?0:1;
 if(i===0){o.snd=o.snd?0:1;if(o.snd)musPlay(mapMus(MAPS[G.map]));else musStop()}if(i===1){o.mv=((o.mv??4)+1)%5;if(mus.gain)mus.gain.gain.value=VOL('mv')}if(i===2){o.sv=((o.sv??4)+1)%5;sfx('ok')}if(i===3){o.fol=o.fol===0?1:0;folReset()}if(i===4)o.txt=o.txt===2?1:2;save()}}
async function journal(){const Q0=quests(),Q=[Q0[0],...Q0.slice(1).sort((a,b)=>(a[1]===2)-(b[1]===2))],P=[[]];let y=56;
 for(const q of Q){const hg=32+Math.min(3,wrap(q[2],404,1).length)*10;if(y+hg>292&&P[P.length-1].length){P.push([]);y=56}P[P.length-1].push(q);y+=hg}let pg=0;
 ui.panel=()=>{panel(8,8,464,304);X.drawImage(ICO.book,24,22,16,16);txt('JOURNAL',46,36,C.acc,{sh:0});if(P.length>1)txt(`PAGE ${pg+1}/${P.length}`,456,34,C.mute,{mini:1,al:'r'});R(X,C.paper2,20,44,440,2);let y=56;
  for(const[t,s,h]of P[pg]){X.drawImage(s===2?ICO.star:ICO.flag,24,y+2,14,14);txt(t,46,y+14,s===2?C.mute:C.ink);const L=wrap(h,404,1).slice(0,3);L.forEach((l,i)=>txt(l,46,y+28+i*10,C.ink2,{s:1,sh:0}));y+=24+L.length*10+8}
  txt((P.length>1?'GAUCHE/DROITE : PAGE   ':'')+(G.keys.pages?'A : PAGES DE VALEN   B : FERMER':'A / B : FERMER'),456,300,C.mute,{mini:1,al:'r'})};
 for(;;){const k=await key();if(P.length>1&&(k==='right'||k==='down'||k==='left'||k==='up')){pg=(pg+(k==='right'||k==='down'?1:P.length-1))%P.length;sfx('sel');continue}
  if(k==='a'&&G.keys.pages){const pn=ui.panel;ui.panel=null;await readPages();ui.panel=pn;continue}if(k==='a'||k==='b')break}ui.panel=null}
function drawCard(){panel(8,8,302,214);X.drawImage(ICO.flag,24,24,16,16);txt('OBJECTIF',46,38,C.acc,{sh:0});wrap(goal(),270).slice(0,3).forEach((l,i)=>txt(l,24,66+i*24));
 R(X,C.paper2,20,128,278,2);X.drawImage(ICO.pin,24,138,16,16);txt(MAPS[G.map].name.split(' · ')[0],46,152);const ph=phase(),pi=ph===4?ICO.ecl:ph===3?ICO.moon:ICO.sun;X.drawImage(pi,284,138,16,16);txt(PHN[ph].toUpperCase(),278,150,C.ink2,{mini:1,al:'r'});
 G.party.forEach((m,i)=>{const x=22+i*48;rr(x,160,46,46,2,'#efe6d2');X.drawImage(m.hp>0?monSpr(m.sp,0,48,m.sh):silh(monSpr(m.sp,0,48),'#9a92aa'),x-1,159,48,48)});
 rr(8,226,302,34,4,C.ink);rr(10,228,298,30,2,C.frameD);[['badge',ICO.bRoc],['badge2',ICO.bMir],['badge3',ICO.bCre],['badge4',ICO.bVol]].forEach(([k,ic],i)=>X.drawImage(f()[k]?ic:silh(ic,'#6a5f8f'),20+i*20,234,16,16));if(G.keys.etoile)X.drawImage(ICO.star,104,234,16,16);
 X.drawImage(ICO.shard,72,234,16,16);txt(G.keys.shards||0,92,248,'#ffffff',{sh:C.ink});if(G.keys.bracelet)X.drawImage(ICO.bracelet,132,234,16,16);if(G.keys.trophy)X.drawImage(ICO.trophy,154,234,16,16);X.drawImage(ICO.coin,186,234,16,16);txt(G.money,208,248,'#ffffff',{sh:C.ink})}
async function pauseMenu(){for(;;){ui.panel=drawCard;const O=[['ÉQUIPE',ICO.team],...(G.keys.dex?[['PIXÉDEX',ICO.dex]]:[]),['SAC',ICO.bag],['CARTE',ICO.map],...(G.keys.sablier?[['SABLIER',ICO.sablier]]:[]),['JOURNAL',ICO.book],['GUIDE',ICO.guide],['SAUVER',ICO.save],['OPTIONS',ICO.gear],['TITRE',ICO.home],['FERMER',ICO.close]];
 const i=await choose(O.map(o=>o[0]),{x:W-162,y:8,w:154,rh:O.length>9?24:26,vis:10,icons:O.map(o=>o[1])});ui.panel=null;const k=O[i]?.[0];
 if(i<0||k==='FERMER')return;if(k==='ÉQUIPE')await teamMenu();if(k==='PIXÉDEX')await dexMenu();if(k==='SAC')await bagMenu(false);if(k==='JOURNAL')await journal();if(k==='SAUVER')await say(save()?'Partie sauvegardée !':'Impossible de sauvegarder dans ce navigateur.');
 if(k==='CARTE')await regionMap();if(k==='GUIDE')await guide();if(k==='SABLIER'){ui.panel=null;await useSablier()}if(k==='OPTIONS')await options();
 if(k==='TITRE'&&await ask('Retourner à l\'écran titre ? La progression non sauvegardée sera perdue.')){await fadeTo(1,300);return titleScreen()}}}

// =====================================================================
// COMBAT : PP, statuts, ciel (pluie / zénith / éclipse), talents, IA par paliers, EXP partagée
// =====================================================================
const FOE=[360,70],ME=[120,168];
const sm=v=>v>=0?(2+v)/2:2/(2-v),who=s=>s?nm(B.foe)+(B.tr?' ennemi':' sauvage'):nm(B.me);
const tal=m=>SP[m.sp].tal,isN=()=>night()||B?.sky?.k==='eclipse',side=s=>s?B.foe:B.me;
const immune=(m,k)=>k==='brn'&&SP[m.sp].t==='FEU'||k==='par'&&SP[m.sp].t==='ELE'||k==='psn'&&SP[m.sp].t==='ROC'||k==='slp'&&(tal(m)==='vigilant'||m.item==='amucycle');
function spdOf(m,s){let v=st(m).spd*sm(B.stg[s].spd);if(m.st==='par')v*=.5;if(tal(m)==='glissade'&&B.sky?.k==='rain')v*=2;return v}
function power(a,v){let k=1;const t=v.t,sk=B.sky?.k;if(a.hp<=st(a).hp/3&&{brasier:'FEU',torrent:'EAU',engrais:'PLA'}[tal(a)]===t)k*=1.5;
 if(isN()&&(tal(a)==='noctambule'&&t==='OMB'||tal(a)==='lueur'&&t==='LUM'))k*=1.2;
 if(sk==='rain'){if(t==='EAU')k*=1.5;if(t==='FEU')k*=.5}if(sk==='sun'){if(t==='FEU'||t==='LUM')k*=1.5;if(t==='EAU')k*=.5}if(sk==='eclipse'&&t==='OMB')k*=1.5;const it=a.item&&IT[a.item];if(it&&it[4]==='held'&&it[3]===t)k*=1.2;if(a.item==='orbe')k*=1.3;if(a.item==='amucycle')k*=1.15;return k}
function dmg(a,d,v,sa,sd,avg){const A=st(a).atk*sm(sa.atk)*(a.st==='brn'?.75:1),D=st(d).def*sm(sd.def),ef=eff(v.t,SP[d.sp].t),cr=!avg&&Math.random()<.0625*(mine(a)&&bondLv(a)>=5?2:1);
 return{ef,cr,n:Math.max(1,Math.floor(((2*a.lv/5+2)*bp(a,v)*A/D/50+2)*(v.t===SP[a.sp].t?1.5:1)*ef*power(a,v)*(cr?1.5:1)*(avg?.92:.85+Math.random()*.15)))}}
// IA : 0 sauvage (instinct), 1 dresseur (vise juste), 2 boss (planifie : statuts, ciel, soins, objets)
function ai(fo,me,lv){const fs=B.stg[1],ms=B.stg[0],mx=st(fo).hp;let best=null,bs=-1;const U=fo.moves.filter((id,i)=>fo.pp[i]>0);if(!U.length)return'lutte';
 for(const id of U){const v=MV[id];let s;
  if(v.p){const d=dmg(fo,me,v,fs,ms,1).n;s=Math.min(1.2,d/Math.max(1,me.hp))*100*(v.a&&tal(fo)!=='echo'?v.a/100:1);if(d>=me.hp)s+=40+(v.pr&&spdOf(fo,1)<spdOf(me,0)?40:0);if(STN[v.e]&&!me.st&&!immune(me,v.e))s+=v.ch/4;if(lv&&v.t==='LUM'&&B.sky?.k==='eclipse')s+=15}
  else if(STN[v.e])s=me.st||immune(me,v.e)?0:(lv>1?62:40)*v.a/100;
  else if(/^\w+\+/.test(v.e)){const k=v.e.slice(0,3);s=fs[k]<2&&fo.hp>mx*.6?lv>1?52:30:3}
  else if(/^\w+-/.test(v.e)){const k=v.e.slice(0,3);s=ms[k]>-2?22:2}
  else if(v.e?.startsWith('heal'))s=fo.hp<mx*.45?lv>1?96:70:0;
  else if(SKY[v.e])s=B.sky?.k===v.e?0:lv>1?72:30;else s=10;
  s+=Math.random()*[70,26,9][lv];if(s>bs){bs=s;best=id}}return best}
const spawn=o=>B.fx.push({vx:0,vy:0,g:0,dr:1,s:4,c:'#ffffff',k:'sq',...o,ml:o.l||30,l:o.l||30});
const burstAt=([x,y],n,c,sp=3,o={})=>{for(let i=0;i<n;i++){const a=Math.random()*6.28,v=sp*(.4+Math.random()*.8);spawn({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,dr:.9,l:16+Math.random()*14,c:Array.isArray(c)?c[i%c.length]:c,s:[2,4,4,6][i%4],...o})}};
async function shoot(A,T,n,mk,dur=380){for(let i=0;i<n;i++){const l=Math.round(dur/16.7);spawn({x:A[0]+(Math.random()-.5)*14,y:A[1]+(Math.random()-.5)*14,vx:(T[0]-A[0])/l,vy:(T[1]-A[1])/l,l,...mk(i)});await wait(dur/n/1.4)}await wait(dur*.8)}
function bolt(x,y0,y1){const pts=[];let x2=x;for(let y=y0;y<=y1;y+=12){pts.push([x2,y]);x2=x+(Math.random()-.5)*36}pts.push([x,y1]);return pts}
const PHYS=t=>t==='NOR'||t==='ROC'||t==='OMB';
async function vfx(t,s){const A=s?FOE:ME,T=s?ME:FOE;
 if(PHYS(t)){const o=s?B.fo:B.mo;await tween(o,'x',s?10:-10,80);await tween(o,'x',s?-36:36,90);await tween(o,'x',0,160)}else{burstAt(A,8,['#ffffff',TY[t][1]],1.5,{g:-.05});await wait(140)}
 if(t==='FEU'){await shoot(A,T,10,i=>({c:i%2?'#ffd23a':'#ff7a2a',s:6}));for(let i=0;i<24;i++)spawn({x:T[0]+(Math.random()-.5)*56,y:T[1]+26,vx:(Math.random()-.5)*.6,vy:-1.4-Math.random()*2.4,l:22+Math.random()*16,c:['#ff5a1e','#ff9a2a','#ffe27a'][i%3],s:6});for(let i=0;i<5;i++)spawn({k:'smk',x:T[0]+(Math.random()-.5)*40,y:T[1],vy:-.8,l:40,s:6,c:'#8a7c8c'});B.tint={c:'#ff6a20',a:.22}}
 else if(t==='EAU'){await shoot(A,T,12,i=>({c:i%3?'#7ac8ff':'#ffffff',s:i%3?6:4}));burstAt(T,18,['#7ac8ff','#ffffff','#4a8ad8'],3.5,{g:.25});B.tint={c:'#4a8ad8',a:.15}}
 else if(t==='PLA'){await shoot(A,T,8,()=>({k:'leaf',c:'#5fd05a',s:4}),460);burstAt(T,14,['#5fd05a','#b6ec7a','#2f8a4a'],3,{k:'leaf'})}
 else if(t==='ELE'){for(let i=0;i<3;i++){B.bolts=[bolt(T[0],-10,T[1])];B.tint={c:'#fff6a0',a:.4};sfx('hit');await wait(70);B.bolts=[];await wait(50)}burstAt(T,16,['#ffe27a','#ffffff'],4)}
 else if(t==='ROC'){for(let i=0;i<5;i++)spawn({k:'rock',x:T[0]+(i-2)*16,y:-20-i*26,vy:8,l:Math.round((T[1]+20+i*26)/8),c:'#9a8260',s:12});await wait(460);burstAt([T[0],T[1]+30],16,['#c8b8a0','#9a8260'],2.5,{g:.1})}
 else if(t==='OMB'){spawn({k:'ring',x:T[0],y:T[1],r0:70,r1:-64,l:22,c:'#9a70d0'});B.tint={c:'#24103a',a:.35};await wait(360);burstAt(T,16,['#7050a0','#e84a8a','#2b2540'],3.5)}
 else if(t==='LUM'){for(let i=0;i<5;i++)spawn({k:'beam',x:T[0]+(i-2)*18,y:0,h:T[1]+40,l:22,c:i%2?'#fff0a0':'#ffffff'});B.tint={c:'#fff7d0',a:.45};await wait(320);burstAt(T,18,[C.gold,'#ffffff'],3.5,{k:'star'})}
 if(PHYS(t)){spawn({k:'ring',x:T[0],y:T[1],r0:6,r1:36,l:14,c:'#ffffff'});burstAt(T,10,['#ffffff',C.goldL],4,{k:'star'})}}
async function vfxSt(v,s){const A=s?FOE:ME,T=s?ME:FOE,e=v.e||'',c=TY[v.t][1];
 if(e==='slp'){for(let i=0;i<3;i++){spawn({k:'ring',x:T[0],y:T[1],r0:70-i*10,r1:-60,l:26,c:v.t==='LUM'?C.gold:v.t==='OMB'?'#9a70d0':'#f6a0c8'});await wait(150)}if(v.t==='LUM'||v.t==='PLA')for(let i=0;i<16;i++)spawn({x:T[0]+(Math.random()-.5)*70,y:T[1]-60-Math.random()*30,vy:1.2+Math.random(),l:50,c:i%2?C.goldL:c,s:2});await wait(300)}
 else if(e==='psn'||e==='par'&&v.t==='PLA'){for(let i=0;i<22;i++)spawn({x:T[0]+(Math.random()-.5)*80,y:T[1]-70-Math.random()*40,vy:1+Math.random()*1.2,vx:(Math.random()-.5)*.6,l:60,c:e==='psn'?(i%2?'#9a5ad0':'#d8a0f0'):(i%2?'#ffe27a':'#fff6a0'),s:i%3?2:4});await wait(650)}
 else if(e==='par'){for(let i=0;i<4;i++){const x=T[0]-36+i*24;B.bolts=[bolt(x,T[1]-50,T[1]+40)];B.tint={c:'#fff6a0',a:.25};sfx('hit');await wait(90)}B.bolts=[];burstAt(T,12,['#ffe27a','#ffffff'],3)}
 else if(e==='brn'){for(let i=0;i<3;i++)spawn({k:'sq',x:A[0]+(i-1)*20,y:A[1]-10,vx:(T[0]-A[0])/40,vy:(T[1]-A[1])/40,l:40,c:i%2?'#7a6aff':'#c0a8ff',s:8});await wait(700);burstAt(T,16,['#7a6aff','#c0a8ff','#ffffff'],3);B.tint={c:'#6a4aff',a:.2}}
 else if(/\+/.test(e)){const k=e.slice(0,3),col={atk:C.acc,def:v.t==='ROC'?'#a08a78':C.blue,spd:C.gold}[k];if(v.t==='ROC')for(let i=0;i<10;i++){const a=i/10*6.28;spawn({k:'rock',x:A[0]+Math.cos(a)*90,y:A[1]+Math.sin(a)*50,vx:-Math.cos(a)*90/24,vy:-Math.sin(a)*50/24,l:24,c:'#9a8260',s:8})}
  for(let i=0;i<14;i++)spawn({x:A[0]+(Math.random()-.5)*70,y:A[1]+40,vy:-1.6-Math.random()*1.2,l:36,c:i%2?col:'#ffffff',s:i%3?2:4});await wait(420)}
 else if(/-$/.test(e)){for(let i=0;i<3;i++){spawn({k:'ring',x:A[0],y:A[1],r0:10,r1:60+i*20,l:18,c:c});await wait(110)}const o=s?B.mo:B.fo;for(const dx of[-6,6,-4,4,0]){o.x=dx;await wait(45)}}
 else if(e==='heal_j'){for(let i=0;i<4;i++)spawn({k:'beam',x:A[0]+(i-1.5)*20,y:0,h:A[1]+40,l:30,c:i%2?'#fff0a0':'#d8ffc0'});await wait(400)}
 else if(e==='heal_n'){spawn({k:'ring',x:A[0],y:A[1]-40,r0:2,r1:30,l:40,c:'#e6e0f6'});for(let i=0;i<14;i++)spawn({k:'star',x:A[0]+(Math.random()-.5)*80,y:A[1]-60+Math.random()*40,vy:.6,l:40,c:i%2?'#e6e0f6':'#c8bff0'});await wait(450)}
 else if(e==='rain'){for(let i=0;i<30;i++)spawn({x:Math.random()*W,y:-10-Math.random()*60,vy:7+Math.random()*3,l:50,c:'#c8e4ff',s:2});B.tint={c:'#4a8ad8',a:.3};await wait(400)}
 else if(e==='sun'){B.tint={c:'#fff2b0',a:.55};for(let i=0;i<6;i++)spawn({k:'beam',x:60+i*72,y:0,h:H,l:26,c:'#fff0a0'});await wait(400)}
 else if(e==='eclipse'){spawn({k:'ring',x:W/2,y:H/2,r0:260,r1:-250,l:30,c:'#3a1a5a'});B.tint={c:'#140a24',a:.6};await wait(500);burstAt([W/2,H/2],20,['#9a5ad0','#e84aff'],5)}}
function statFx(sd,up,stat){const[x,y]=sd?FOE:ME,c={atk:C.acc,def:C.blue,spd:C.gold}[stat];for(let i=0;i<7;i++)spawn({k:'glyph',ch:up?'▲':'▼',x:x+(i-3)*16,y:y+(up?30:-40)+(i%2)*10,vy:up?-1.4:1.4,l:34,c})}
function healFx(sd){const[x,y]=sd?FOE:ME;for(let i=0;i<9;i++)spawn({k:'glyph',ch:'+',x:x+(Math.random()-.5)*70,y:y+20+Math.random()*30,vy:-1.1,l:40,c:C.green});B.tint={c:'#80ff9a',a:.12}}
function statusFx(sd,k){const T=sd?FOE:ME,c=STN[k][1];if(k==='slp')for(let i=0;i<4;i++)spawn({k:'txt',ch:'Z',x:T[0]+20+i*8,y:T[1]-10-i*10,vy:-.7,l:50,c:'#c9c2d6'});else burstAt(T,14,[c,'#ffffff'],2.6,{g:k==='psn'?-.06:0});B.tint={c:c,a:.18}}
const popText=(T,s,c)=>spawn({k:'txt',ch:s,x:T[0]+30,y:T[1]-30,vy:-1.6,dr:.9,l:54,c});
async function talPop(s,m=side(s)){B.tp={s,t:TAL[tal(m)][0],t0:now()};await wait(450)}
async function setSky(k,s){if(B.sky?.k===k){B.sky.n=5;return say('Le ciel est déjà ainsi…',0,1)}B.sky={k,n:5};ui.flash=.5;ui.flashC=SKY[k][1];B.skyT=now();sfx(k==='rain'?'splash':'shard');await say(SKY[k][2],0,1)}
// Éveil du Cycle : la jauge se remplit en frappant et en encaissant ; une fois par combat, la créature s'éveille (Solaire le jour, Lunaire la nuit)
const lunar=()=>B.sky?.k==='sun'?false:isN()||phase()===2;
const canEv=s=>!!B.evOn[s]&&B.ev[s]>=100&&!B.evUsed[s]&&side(s).hp>0&&!B.awk.has(side(s));
function evGain(s,n){if(!B.evOn[s]||B.evUsed[s]||B.ev[s]>=100)return;const b=s?0:bondLv(side(s));B.ev[s]=Math.min(100,B.ev[s]+Math.round(n*(b>=5?1.5:b>=3?1.25:1)*(!s&&G.keys.brv2?1.25:1)));if(B.ev[s]>=100){B.evF[s]=now();sfx('shard')}}
async function awaken(s){const m=side(s),T=s?FOE:ME,lu=lunar(),col=lu?'#b89aff':C.goldL,S=st(m);B.evUsed[s]=1;B.ev[s]=0;
 await say(s?(B.tr?B.tr.name+' active son bracelet ! '+nm(m)+' s\'éveille !':nm(m)+' libère la puissance du Cycle !'):'Le Bracelet du Cycle s\'illumine ! '+nm(m)+' s\'éveille !',0,1);
 sfx('roar');B.awk.add(m);B.awkC.set(m,lu?'#b89aff':'#ffd23a');B.zoom=1.1;ui.flash=.8;ui.flashC=col;B.evB={k:lu,t0:now()};
 for(let i=0;i<3;i++){spawn({k:'ring',x:T[0],y:T[1],r0:90-i*20,r1:-80,l:24,c:col});await wait(110)}
 for(let i=0;i<6;i++)spawn({k:'beam',x:T[0]+(i-2.5)*16,y:0,h:T[1]+50,l:30,c:i%2?col:'#ffffff'});burstAt(T,26,[col,'#ffffff',lu?'#e84aff':C.gold],5,{k:'star'});sfx('shard');await wait(650);
 if(!s)msEvt('ev');const ks=lu?['atk','def']:['atk','spd'];for(const k of ks){B.stg[s][k]=Math.min(6,B.stg[s][k]+1);statFx(s,1,k)}sfx('lv');
 await say(`${lu?'Éveil Lunaire':'Éveil Solaire'} ! ${lu?'L\'Attaque et la Défense':'L\'Attaque et la Vitesse'} de ${who(s)} augmentent !`,0,1);
 if(lu){if(m.st){m.st=null;m.slp=0;await say(`La lune purifie ${who(s)} !`,0,1)}}else if(m.hp<S.hp){m.hp=Math.min(S.hp,m.hp+Math.max(1,Math.floor(S.hp/5)));healFx(s);await tween(B.dh,s,m.hp,400);await say(`La lumière soigne ${who(s)} !`,0,1)}
 if(!s)await tipSay('evd','l\'Éveil ne sert qu\'une fois par combat, et ses bonus s\'effacent si ta créature quitte le terrain. Choisis bien ton moment !')}
function evInfo(x,y,w){const lu=lunar();txt(lu?'ÉVEIL LUNAIRE':'ÉVEIL SOLAIRE',x+14,y+27,lu?'#7a5ad0':'#c8902a',{mini:1});
 wrap(lu?'Attaque et Défense +1, guérit les statuts. Une seule fois par combat : les bonus disparaissent si elle quitte le terrain.':'Attaque et Vitesse +1, soigne 1/5 des PV. Une seule fois par combat : les bonus disparaissent si elle quitte le terrain.',w-28,1).slice(0,6).forEach((l,j)=>txt(l,x+14,y+44+j*10,C.ink,{s:1,sh:0}))}
async function pickMove(){const ms=B.me.moves;for(;;){const L=canEv(0)&&!B.arm?['ev',...ms.keys()]:[...ms.keys()],hh=L.length*21+20+(B.arm?26:0),y=H-8-hh;
 const i=await choose(L.map(j=>j==='ev'?'ÉVEIL':MV[ms[j]].n),{x:4,y,w:296,rh:21,ib:[302,y,174,hh],title:B.arm?'Éveil prêt : attaque !':undefined,dis:i=>L[i]!=='ev'&&B.me.pp[L[i]]<=0,
  infoDraw:(i,x,yy,w)=>L[i]==='ev'?evInfo(x,yy,w):moveInfo(L[i],x,yy,w),
  draw:(i,x,yy,sel,pr)=>{const j=L[i];if(j==='ev'){X.drawImage(ICO.star,x,yy+3,14,14);txt('ÉVEIL DU CYCLE',x+18,yy+17,pr?'#ffffff':'#c8902a',{sh:pr?0:C.goldL});return}
   const no=B.me.pp[j]<=0,col=pr?'#ffffff':no?C.mute:C.ink;txt(MV[ms[j]].n,x,yy+17,col,{sh:pr||no?0:undefined});{const v=MV[ms[j]],e=v.p&&G.dex[B.foe.sp]?eff(v.t,SP[B.foe.sp].t):1;if(e!==1){R(X,C.ink,x+197,yy+6,8,8);R(X,e>1?'#f6c445':'#8a8498',x+198,yy+7,6,6);if(e>1)R(X,'#ffffff',x+198,yy+7,2,2)}}txt(`${B.me.pp[j]}/${MV[ms[j]].pp}`,x+250,yy+15,pr?'#ffffff':no?C.red:C.ink2,{mini:1,al:'r'})}});
 if(i<0){if(B.arm){B.arm=0;continue}return -1}if(L[i]==='ev'){B.arm=1;sfx('shard');continue}if(B.me.pp[L[i]]<=0){await say('Plus de PP pour cette capacité !',0,1);continue}return L[i]}}
async function berry(s){const m=side(s),S=st(m);if(hold(m,'baiesoin')&&m.hp>0&&m.hp<=S.hp/2){m.item=null;m.hp=Math.min(S.hp,m.hp+Math.max(1,S.hp>>2));healFx(s);sfx('lv');await tween(B.dh,s,m.hp,350);await say(`${who(s)} mange sa Baie Sève et récupère des PV !`,0,1)}}
// IA : créature suivante choisie selon le duel de types (l'atout d'un boss passe en dernier) ; un boss en mauvaise posture peut rappeler sa créature
function foeScore(f2,me){const z={atk:0,def:0,spd:0},best=(a,d)=>Math.max(0,...a.moves.map((id,i)=>MV[id].p&&a.pp[i]>0?dmg(a,d,MV[id],z,z,1).n/Math.max(1,d.hp):0));return Math.min(1.2,best(f2,me))-.8*Math.min(1.2,best(me,f2))}
function pickFoe(){const L=B.foes.filter(m=>m.hp>0&&m!==B.foe),ace=B.foes[B.foes.length-1];if(L.length<2||!B.lvl)return L[0];const C2=B.lvl>1&&ace.hp>0?L.filter(m=>m!==ace):L;return C2.reduce((a,b)=>foeScore(b,B.me)>foeScore(a,B.me)?b:a)}
function foeSwitchTo(){if(B.lvl<2||B.awk.has(B.foe)||B.turn-(B.lsw??-9)<3)return null;const L=B.foes.filter(m=>m.hp>0&&m!==B.foe);if(!L.length)return null;const ace=B.foes[B.foes.length-1],cur=foeScore(B.foe,B.me);if(cur>-.3)return null;
 let best=null,bs=cur+.4;for(const c of L){if(c===ace&&L.length>1)continue;const s2=foeScore(c,B.me);if(s2>bs){bs=s2;best=c}}return best&&Math.random()<.6?best:null}
async function foeSwitch(m){B.lsw=B.turn;B.awk.delete(B.foe);B.awkC.delete(B.foe);await say(`${B.tr.name} rappelle ${nm(B.foe)} !`,0,1);B.hf=0;B.fo.b=1;await tween(B.fo,'s',0,220);B.fo.b=0;B.fo.v=0;B.foe=m;B.fi=B.foes.indexOf(m);B.stg[1]={atk:0,def:0,spd:0};await sendFoe()}
// Missions : progression signalée pendant le jeu, annoncée en fin de combat
const MSQ=[];
function msEvt(k,v){for(const q of G.ms?.L||[])if(!q.done&&q.k===k&&(k==='fish'||k==='ev'||q.v===v)){q.n=Math.min(q.need,q.n+1);if(q.n>=q.need){q.done=1;MSQ.push(q)}}}
async function msFlush(){while(MSQ.length){const q=MSQ.shift();sfx('lv');await say(`Mission accomplie : ${msTxt(q)} ! Récupère ta récompense au Tableau des Missions d'un Centre de Soins.`)}}
async function battle(foes,o={}){const tr=o.tr;if(o.legend){ui.ring={t0:now(),c:TY[SP[foes[foes.length-1].sp].t][1]};sfx('roar');ui.shake=12;await wait(700)}for(let i=0;i<2;i++){ui.flash=1;ui.flashC='#ffffff';await wait(160)}musPlay(o.legend?'final':tr?.vs?'boss':'battle');
 if(tr&&tr.vs){ui.vs={tr,t0:now()};sfx('alert');await wait(1700)}
 ui.wst=o.legend||tr?.boss?'iris':tr?'bars':o.fish?'wave':'spiral';await wipeTo(1,o.legend?700:420);ui.vs=null;
 mode='battle';B={foes,fi:0,foe:foes[0],me:G.party.find(alive),tr,o,bgk:MAPS[G.map].bg,stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],fx:[],bolts:[],shake:0,tint:null,pf:{f:-320,m:320},sky:null,part:new Set(),items:tr?.items||0,lvl:tr?.boss?2:tr?1:0,ev:[0,0],evUsed:[0,0],evF:[0,0],evOn:[!!G.keys.bracelet,!!(tr?tr.ev:o.legend)],awk:new Set(),awkC:new Map(),bend:new Set(),turn:0,arm:0,
  fo:{x:0,y:0,v:1,s:1,b:0,dk:!tr},mo:{x:0,y:0,v:0,s:0,b:0},dh:[0,foes[0].hp],hf:0,hm:0,trX:tr?0:null,showFoe:!tr,ball:null};
 await wipeTo(0,380);await Promise.all([tween(B.pf,'f',0,600,1),tween(B.pf,'m',0,600,1)]);if(rain()&&!['in','cave','tech'].includes(MAPS[G.map].amb)){B.sky={k:'rain',n:99};await say('Il pleut ! EAU x1,5 · FEU x0,5.',0,1)}
 if(tr){await say(`${tr.name} veut se battre !`);await tween(B,'trX',260,350);B.trX=null;await sendFoe()}
 else{B.fo.b=1;B.fo.dk=0;sfx('cry');burstAt(FOE,12,['#ffffff',C.goldL],3,{k:'star'});await wait(120);B.fo.b=0;tween(B,'hf',1,300,1);dex(B.foe.sp,1);if(B.foe.sh){sfx('shard');burstAt(FOE,20,[C.gold,'#ffffff','#ff8ad8'],4,{k:'star'})}
  await say(`${B.foe.sh?'Oh ! Un ':'Un '}${nm(B.foe)} sauvage ${B.foe.sh?'aux couleurs rares ':''}apparaît !`);await tipSay('cap','Affaiblis une créature sauvage avant de lancer une Capsule. Endormie, paralysée, brûlée ou empoisonnée, elle s\'attrape bien plus facilement.');await entryTal(1)}
 await sendOut();return endBattle(await battleLoop())}
async function entryTal(s){const m=side(s),t=tal(m);if(t==='levejour'||t==='eclipsetot'){await talPop(s);await setSky(t==='levejour'?'sun':'eclipse',s)}}
async function throwArc(b,x0,y0,x1,y1,ms,hgt){const t0=now();for(;;){const t=Math.min(1,(now()-t0)/ms);b.x=x0+(x1-x0)*t;b.y=y0+(y1-y0)*t-hgt*Math.sin(Math.PI*t);b.r=t*14;if(Math.random()<.6)spawn({x:b.x,y:b.y,l:10,c:'#ffffff',s:2});if(t>=1)return;await frame()}}
async function popOut(o,T,m){sfx('ball');spawn({k:'ring',x:T[0],y:T[1]+10,r0:4,r1:44,l:16,c:'#ffffff'});burstAt(T,14,['#ffffff',TY[SP[m.sp].t][1]],3.5,{k:'star'});o.v=1;o.b=1;o.s=0;await tween(o,'s',1,240,1);o.b=0;sfx('cry')}
async function sendFoe(){B.showFoe=1;B.fo={x:0,y:0,v:0,s:0,b:0};B.dh[1]=B.foe.hp;B.part=new Set(B.me&&B.me.hp>0?[B.me]:[]);dex(B.foe.sp,1);await say(`${B.tr.name} envoie ${nm(B.foe)} !`,0,1);const b=B.ball={x:W+20,y:40,r:0};await throwArc(b,W+20,40,FOE[0],FOE[1]+10,320,30);B.ball=null;await popOut(B.fo,FOE,B.foe);tween(B,'hf',1,300,1);await entryTal(1)}
async function sendOut(){B.hm=0;B.mo={x:0,y:0,v:0,s:0,b:0};B.dh[0]=B.me.hp;B.part.add(B.me);show(`En avant, ${nm(B.me)} !`);const b=B.ball={x:-20,y:260,r:0};await throwArc(b,-20,260,ME[0],ME[1]+30,340,90);B.ball=null;await popOut(B.mo,ME,B.me);tween(B,'hm',1,300,1);await wait(350);ui.text=null;if(B.tr?.vs&&bondLv(B.me)>=4&&!B.bondMsg?.has(B.me)){(B.bondMsg||=new Set()).add(B.me);burstAt(ME,10,['#ff7aa8','#ffffff'],2,{k:'star',g:-.05});await say(bondLv(B.me)>=5?`${nm(B.me)} te lance un regard plein de confiance. Vous êtes inséparables.`:`${nm(B.me)} se retourne vers toi, prêt à tout donner.`,0,1)}await entryTal(0)}
async function battleLoop(){for(;;){if(canEv(0)&&!f().tip_evr){f().tip_evr=1;await say('Le Bracelet du Cycle brille ! Ta jauge d\'Éveil est pleine : choisis ATTAQUE, puis ÉVEIL DU CYCLE avant ton attaque.')}show(`Que doit faire ${nm(B.me)} ?`,0,262);const c=await choose(['ATTAQUE','SAC','ÉQUIPE','FUITE'],{x:270,y:H-90,w:206,rh:33,cols:2,cancel:false,dis:i=>i===3&&!!B.tr});let act={};
 if(c===0){ui.text=null;const ms=B.me.moves;if(B.me.pp.every(p=>p<=0)){await say(`${nm(B.me)} n'a plus de PP ! Il se débat…`,0,1);act={mv:'lutte'}}
  else{const i=await pickMove();if(i<0)continue;act={mv:ms[i]}}}
 else if(c===1){ui.text=null;const r=await bagMenu(true);if(!r)continue;if(r.ball&&await throwBall(r.ball))return'catch'}
 else if(c===2){ui.text=null;const i=await partyMenu('Envoyer qui ?');if(i<0)continue;const m=G.party[i];if(m.hp<=0){await say(`${nm(m)} est K.O. !`);continue}if(m===B.me){await say(`${nm(m)} est déjà au combat !`);continue}
  await say(`Reviens, ${nm(B.me)} !`,0,1);B.awk.delete(B.me);B.awkC.delete(B.me);B.hm=0;B.mo.b=1;await tween(B.mo,'s',0,220);B.me=m;B.stg[0]={atk:0,def:0,spd:0};await sendOut()}
 else{ui.text=null;if(B.tr){await say('Impossible de fuir un combat contre un dresseur !');continue}if(Math.random()<.45+.4*spdOf(B.me,0)/spdOf(B.foe,1)){sfx('run');await say('Tu prends la fuite !',0,1);return'run'}await say('Impossible de fuir !',0,1)}
 ui.text=null;if(B.foe.hp<=0||B.me.hp<=0){const r=await checkFaint();if(r&&r!=='next')return r;continue}
 B.turn++;if(B.arm&&act.mv)await awaken(0);B.arm=0;
 const sw=foeSwitchTo(),fItem=!sw&&B.items>0&&B.foe.hp<st(B.foe).hp*.3&&(B.foes.filter(alive).length===1||Math.random()<.6);
 if(!sw&&!fItem&&canEv(1)&&(B.foes.filter(alive).length===1||B.foe.hp<st(B.foe).hp*.7||Math.random()<.35))await awaken(1);
 const fm=sw||fItem?null:ai(B.foe,B.me,B.lvl);
 if(sw){await foeSwitch(sw);let r=act.mv?await useMove(0,act.mv):null;if(r==='next')continue;if(r)return r;r=await endTurn();if(r&&r!=='next')return r;continue}
 let first=1,quick=null;if(act.mv&&!fItem){const pa=MV[act.mv].pr,pf=MV[fm].pr,sa=spdOf(B.me,0),sf=spdOf(B.foe,1);first=pa!==pf?(pa>pf?0:1):sa!==sf?(sa>sf?0:1):Math.random()<.5?0:1;
  if(pa===pf){const qa=hold(B.me,'griffe')&&Math.random()<.2,qf=hold(B.foe,'griffe')&&Math.random()<.2;if(qa!==qf){first=qa?0:1;quick=first}}}
 const seq=act.mv?(first?[1,0]:[0,1]):[1];let r=null;if(quick!=null)await say(`${who(quick)} agit en premier grâce à sa Griffe Vive !`,0,1);
 for(const s of seq){r=s&&fItem?await foeItem():await useMove(s,s?fm:act.mv);if(r)break}
 if(r==='next')continue;if(r)return r;r=await endTurn();if(r&&r!=='next')return r}}
function moveInfo(i,x,y,w){const id=B.me.moves[i],v=MV[id],ef=v.p?eff(v.t,SP[B.foe.sp].t):1,cw=chip(v.t,x+14,y+14);
 if(v.p&&ef!==1)txt(ef>1?'SUPER EFF.':'PEU EFF.',x+w-14,y+27,ef>1?'#c8902a':C.mute,{mini:1,al:'r'});
 txt(v.p?`PUISS ${bp(B.me,v)}  PRÉC ${v.a||'-'}`:`STATUT  PRÉC ${v.a||'-'}`,x+14,y+46,C.ink2,{mini:1});
 const d=(v.t==='LUM'&&v.p&&B.sky?.k==='eclipse'?'Dissipe l\'éclipse ! ':'')+(mvDesc(v)||(v.t===SP[B.me.sp].t&&v.p?'Même type : x1,5.':''));wrap(d,w-28,1).slice(0,4).forEach((l,j)=>txt(l,x+14,y+62+j*10,C.ink,{s:1,sh:0}))}
async function foeItem(){B.items--;const m=B.foe,S=st(m);await say(`${B.tr.name} utilise une Super Potion !`,0,1);sfx('lv');healFx(1);m.hp=Math.min(S.hp,m.hp+Math.max(60,S.hp>>1));m.st=null;await tween(B.dh,1,m.hp,400);await say(`${who(1)} récupère des PV !`,0,1);return null}
async function inflict(s,k,quiet){const m=side(s);if(m.hp<=0)return false;if(m.st||immune(m,k)){if(!quiet)await say(m.st?`${who(s)} est déjà ${STN[m.st][2]}.`:`Ça n'affecte pas ${who(s)}…`,0,1);return false}
 m.st=k;if(k==='slp')m.slp=rnd(2,4);statusFx(s,k);sfx('st');await say(`${who(s)} est ${STN[k][2]} !`,0,1);if(hold(m,'baieprisme')){m.item=null;m.st=null;m.slp=0;healFx(s);sfx('lv');await say(`${who(s)} mange sa Baie Prisme : il n'est plus ${STN[k][2]} !`,0,1)}return true}
async function useMove(s,id){const a=side(s),d=side(1-s),ai_=s,di=1-s,T=s?ME:FOE,dd=s?B.mo:B.fo,v=MV[id];if(a.hp<=0||d.hp<=0&&v.p)return null;
 if(a.st==='slp'){if(--a.slp>0){statusFx(ai_,'slp');await say(`${who(s)} dort profondément…`,0,1);return null}a.st=null;await say(`${who(s)} se réveille !`,0,1)}
 if(a.st==='par'&&Math.random()<.25){statusFx(ai_,'par');await say(`${who(s)} est paralysé ! Il ne peut pas bouger !`,0,1);return null}
 const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);
 await say(`${who(s)} utilise ${v.n} !`,0,1);
 if(v.a&&tal(a)!=='echo'&&Math.random()*100>=v.a){if(v.p)await vfx(v.t,s);popText(T,'RATÉ','#c9c2d6');await say('Mais ça rate !',0,1);return null}
 if(!v.p&&v.id!=='lutte'){burstAt(s?FOE:ME,8,['#ffffff',TY[v.t][1]],1.5,{g:-.05});await vfxSt(v,s)}
 if(v.p){await vfx(v.t,s);const r=dmg(a,d,v,B.stg[ai_],B.stg[di]);let n=r.n,sturdy=0,endure=0;if(tal(d)==='fermete'&&d.hp===st(d).hp&&n>=d.hp){n=d.hp-1;sturdy=1}
  else if(n>=d.hp&&d.hp>1){if(hold(d,'ruban')&&d.hp===st(d).hp){n=d.hp-1;endure=1}else if(mine(d)&&!B.bend.has(d)&&Math.random()<[0,0,0,.1,.15,.2][bondLv(d)]){n=d.hp-1;endure=2;B.bend.add(d)}}
  sfx('hit');if(r.ef>1||r.cr)B.shake=r.cr?14:9;dd.b=1;await wait(70);for(const dx of[8,-6,4,-2,0]){dd.x=dx;dd.b=dx>0?1:0;await wait(40)}
  d.hp=Math.max(0,d.hp-n);evGain(ai_,12+(r.ef>1?8:0)+(r.cr?6:0));evGain(di,Math.max(6,Math.round(30*n/st(d).hp)));popText(T,'-'+n,r.ef>1?C.gold:r.ef<1?'#c9c2d6':'#ffffff');await tween(B.dh,di,d.hp,450);
  if(r.cr){B.zoom=1.07;popText([T[0]-40,T[1]-10],'CRITIQUE !',C.acc);await say('Coup critique !',0,1)}if(r.ef>1)await say('C\'est super efficace !',0,1);if(r.ef<1)await say('Ce n\'est pas très efficace…',0,1);
  if(sturdy){await talPop(di);await say(`${who(di)} tient bon grâce à sa Fermeté !`,0,1)}if(endure===1)await say(`${who(di)} s'accroche grâce à son Ruban Ténacité !`,0,1);
  if(endure===2){burstAt(T,14,['#ff7aa8','#ffffff'],3,{k:'star'});await say(`${who(di)} tient bon pour ne pas te décevoir !`,0,1)}
  if(v.t==='LUM'&&B.sky?.k==='eclipse'){B.sky=null;ui.flash=.7;ui.flashC=C.goldL;burstAt(T,24,[C.gold,'#ffffff'],5,{k:'star'});await say('La lumière déchire l\'éclipse ! Le terrain s\'éclaircit.',0,1)}
  if(v.e==='drain'&&a.hp>0){const A=s?FOE:ME;for(let i=0;i<12;i++)spawn({x:T[0]+(Math.random()-.5)*40,y:T[1]+(Math.random()-.5)*30,vx:(A[0]-T[0])/34,vy:(A[1]-T[1])/34,l:34+i,c:i%2?'#80ff9a':'#d8ffc0',s:4});await wait(300);const h=Math.min(st(a).hp-a.hp,Math.max(1,n>>1));if(h>0){a.hp+=h;healFx(ai_);await tween(B.dh,ai_,a.hp,300);await say(`${who(s)} absorbe de l'énergie !`,0,1)}}
  if(v.e==='recoil'&&a.hp>0){const h=Math.max(1,id==='lutte'?st(a).hp>>2:n>>2);a.hp=Math.max(0,a.hp-h);await tween(B.dh,ai_,a.hp,300);await say(`${who(s)} subit le contrecoup !`,0,1)}
  if(hold(a,'grelot')&&a.hp>0&&a.hp<st(a).hp){a.hp=Math.min(st(a).hp,a.hp+Math.max(1,n>>3));healFx(ai_);await tween(B.dh,ai_,a.hp,250);await say(`${who(s)} récupère des PV grâce à son Grelot Écho.`,0,1)}
  if(hold(a,'orbe')&&a.hp>0){a.hp=Math.max(0,a.hp-Math.max(1,Math.floor(st(a).hp/10)));await tween(B.dh,ai_,a.hp,250);await say(`${who(s)} est blessé par son Orbe Furie !`,0,1)}
  if(d.hp>0)await berry(di);if(a.hp>0)await berry(ai_);
  if(d.hp>0&&v.ch&&Math.random()*100<v.ch){if(STN[v.e])await inflict(di,v.e,1);else if(/^\w+-$/.test(v.e))await statChange(di,v.e.slice(0,3),-1)}
  if(PHYS(v.t)&&a.hp>0&&!a.st&&(tal(d)==='electrise'||tal(d)==='corpsardent')&&Math.random()<.3){const k=tal(d)==='electrise'?'par':'brn';if(!immune(a,k)){await talPop(di);await inflict(ai_,k,1)}}}
 else if(STN[v.e])await inflict(di,v.e);
 else if(SKY[v.e])await setSky(v.e,s);
 else if(v.e?.startsWith('heal')){const mx=st(a).hp,sk=B.sky?.k,nt=isN(),k=v.e==='heal'?.5:v.e==='heal_j'?(sk==='sun'||!nt&&sk!=='rain'?2/3:.25):(nt?.5:sk==='sun'?.25:1/3);
  if(a.hp>=mx)await say('Mais ses PV sont déjà au maximum !',0,1);else{a.hp=Math.min(mx,a.hp+Math.max(1,Math.floor(mx*k)));sfx('lv');healFx(ai_);await tween(B.dh,ai_,a.hp,400);await say(`${who(s)} récupère des PV !`,0,1)}}
 else{const m=v.e.match(/^(\w+)([+-])(\d?)$/);if(dd&&m[2]==='+'){const o=s?B.fo:B.mo;await tween(o,'y',-10,100);await tween(o,'y',0,120)}await statChange(m[2]==='+'?ai_:di,m[1],(m[2]==='+'?1:-1)*(+m[3]||1))}
 return checkFaint()}
async function statChange(sd,k,dl){const cur=B.stg[sd][k],nv=Math.max(-6,Math.min(6,cur+dl));statFx(sd,dl>0,k);sfx(dl>0?'lv':'back');await wait(300);
 if(nv===cur)return say(`${STAT[k]} de ${who(sd)} ne peut plus ${dl>0?'monter':'baisser'} !`,0,1);B.stg[sd][k]=nv;await say(`${STAT[k]} de ${who(sd)} ${dl>0?'augmente':'baisse'}${Math.abs(dl)>1?' beaucoup':''} !`,0,1)}
async function endTurn(){for(const s of[0,1]){const m=side(s);if(m.hp<=0)continue;
  if(m.st==='brn'||m.st==='psn'){const n=Math.max(1,Math.floor(st(m).hp/(m.st==='brn'?16:8)));statusFx(s,m.st);m.hp=Math.max(0,m.hp-n);await tween(B.dh,s,m.hp,300);await say(`${who(s)} souffre ${m.st==='brn'?'de sa brûlure':'du poison'} !`,0,1)}
  if(tal(m)==='seve'&&!isN()&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));healFx(s);await talPop(s);await tween(B.dh,s,m.hp,250);await say(`${who(s)} se régénère grâce à sa Sève Vive.`,0,1)}
  if(hold(m,'miettes')&&m.hp>0&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));healFx(s);await tween(B.dh,s,m.hp,250);await say(`${who(s)} grignote ses Miettes Dorées.`,0,1)}
  if(m.hp>0)await berry(s);
  if(m.st&&m.hp>0&&mine(m)&&bondLv(m)>=4&&Math.random()<.2){const k=m.st;m.st=null;m.slp=0;burstAt(s?FOE:ME,12,['#ff7aa8','#ffffff'],2.5,{k:'star'});await say(`${who(s)} se secoue pour te rassurer : il n'est plus ${STN[k][2]} !`,0,1)}
  if(m.hp>0)evGain(s,6)}
 if(B.sky&&B.sky.n<99&&--B.sky.n<=0){const k=B.sky.k;B.sky=null;await say(SKY[k][3],0,1)}return checkFaint()}
async function faintFx(o,T,sd){sfx('faint');if(sd)B.hf=0;else B.hm=0;o.b=1;await wait(90);o.b=0;await tween(o,'y',90,380);o.v=0;burstAt([T[0],T[1]+40],12,['#e6dcc6','#bdb2a0'],2,{g:-.02})}
// K.O. : gère aussi le double K.O. (contrecoup, brûlure…) sans laisser de créature à 0 PV sur le terrain
async function checkFaint(){const fk=B.foe.hp<=0&&B.fo.v,mk=B.me.hp<=0&&B.mo.v;if(!fk&&!mk)return null;
 if(fk){await faintFx(B.fo,FOE,1);await say(`${who(1)} est K.O. !`,0,1);if(!B.tr)msEvt('ko',SP[B.foe.sp].t);await giveXp()}
 if(mk){await faintFx(B.mo,ME,0);bondUp(B.me,-1);await say(`${nm(B.me)} est K.O. !`,0,1)}
 const more=B.tr&&B.foes.some(m=>m.hp>0&&m!==B.foe);if(fk&&!more)return'win';
 if(B.me.hp<=0){if(!G.party.some(alive))return'lose';let i;for(;;){i=await partyMenu('Envoyer qui ?',false);if(G.party[i].hp>0)break;await say(`${nm(G.party[i])} est K.O. !`)}B.me=G.party[i];B.stg[0]={atk:0,def:0,spd:0};await sendOut()}
 if(fk){B.foe=pickFoe();B.fi=B.foes.indexOf(B.foe);B.stg[1]={atk:0,def:0,spd:0};await sendFoe()}return'next'}
async function giveXp(){const base=Math.max(1,Math.floor(SP[B.foe.sp].xp*B.foe.lv/5*(B.tr?1.5:1))),P=[...B.part].filter(m=>m.hp>0&&G.party.includes(m)),rest=G.party.filter(m=>m.hp>0&&!P.includes(m));
 const xk=(m,n)=>hold(m,'amulette')?Math.floor(n*1.5):n;for(const m of P)await gainXp(m,xk(m,base));if(rest.length){const h=Math.max(1,base>>1);await say(`Le reste de l'équipe gagne ${h} points d'EXP.`,0,1);for(const m of rest)await gainXp(m,xk(m,h),1)}}
async function gainXp(m,n,quiet){if(m.lv>=100)return;if(!quiet)await say(`${nm(m)} gagne ${n} points d'EXP.`,0,1);const act=B&&m===B.me&&B.hm>0;let from=m.exp;m.exp+=n;
 for(;;){const e0=xpFor(m.lv),cap=xpFor(m.lv+1),to=Math.min(m.exp,cap);if(act&&to>from){B.xpv=from;await tween(B,'xpv',to,Math.min(900,180+(to-from)/(cap-e0)*800))}if(m.lv>=100||m.exp<cap)break;
  const o=st(m);m.lv++;bondUp(m,2);const S=st(m);m.hp+=S.hp-o.hp;from=xpFor(m.lv);if(act){B.dh[0]=m.hp;B.lvf=now();burstAt([120,170],16,[C.gold,'#ffffff'],3,{k:'star'})}sfx('lv');
  ui.panel=()=>{panel(W-178,8,170,128);[['PV',S.hp,S.hp-o.hp],['ATTAQUE',S.atk,S.atk-o.atk],['DÉFENSE',S.def,S.def-o.def],['VITESSE',S.spd,S.spd-o.spd]].forEach(([a,v,d],i)=>{const y=36+i*24;txt(a,W-162,y,C.ink2,{sh:0});txt(d?'+'+d:'',W-62,y,C.green,{al:'r',sh:0});txt(v,W-22,y,C.ink,{al:'r'})})};
  await say(`${nm(m)} monte au niveau ${m.lv} !`);ui.panel=null;for(const[l,mv]of SP[m.sp].learn)if(l===m.lv)await learn(m,mv)}
 if(act)B.xpv=null}
async function learn(m,mv){const N=MV[mv].n;if(m.moves.includes(mv))return;if(m.moves.length<4){m.moves.push(mv);m.pp.push(MV[mv].pp);sfx('lv');return say(`${nm(m)} apprend ${N} !`)}
 await say(`${nm(m)} veut apprendre ${N}, mais connaît déjà 4 capacités.`);ui.text=null;const i=await choose([...m.moves.map(id=>MV[id].n),'Ne pas apprendre'],{x:W-248,y:8,w:240,title:'Oublier quoi ?',info:i=>i<4?{t:MV[m.moves[i]].t,s:`Puiss. ${MV[m.moves[i]].p||'-'} · Nouvelle : ${N} (${TY[MV[mv].t][0]}, puiss. ${MV[mv].p||'-'})`}:{s:`Garder les 4 capacités actuelles.`}});
 if(i<0||i===4)return say(`${nm(m)} n'apprend pas ${N}.`);await say(`${nm(m)} oublie ${MV[m.moves[i]].n} et apprend ${N} !`);m.moves[i]=mv;m.pp[i]=MV[mv].pp}
async function throwBall(k){await say(`Tu lances une ${IT[k][0]} !`,0,1);const b=B.ball={x:120,y:200,r:0,ic:k};sfx('ball');await throwArc(b,120,200,FOE[0],FOE[1],520,110);
 spawn({k:'ring',x:FOE[0],y:FOE[1],r0:4,r1:40,l:14,c:'#ffffff'});B.fo.b=1;await tween(B.fo,'s',0,260);B.fo.b=0;await tween(b,'y',FOE[1]+42,240,1);b.r=0;
 const mx=st(B.foe).hp,bk=k==='crepuscapsule'?(isN()?3:1):k==='cyclecapsule'?1e6:IT[k][3],sb={slp:2,par:1.5,psn:1.5,brn:1.5}[B.foe.st]||1,p=Math.min(1,(3*mx-2*B.foe.hp)*SP[B.foe.sp].cr*bk*sb/(3*mx)/255),q=Math.cbrt(p);
 for(let i=0;i<3;i++){await wait(380);if(Math.random()>q){B.ball=null;sfx('hit');spawn({k:'ring',x:FOE[0],y:FOE[1]+30,r0:4,r1:50,l:16,c:'#ffffff'});burstAt(FOE,12,['#ffffff',C.acc],4);B.fo.b=1;await tween(B.fo,'s',1,200);B.fo.b=0;await say(['Oh non ! Il s\'est libéré !','Raah ! Presque !','Argh ! Ça y était presque !'][i],0,1);return false}
  sfx('sel');for(const r of[-.35,.35,-.2,.2,0]){b.r=r;await wait(55)}}
 b.done=1;sfx('lv');burstAt([FOE[0],FOE[1]+40],10,[C.gold,C.goldL],2.5,{k:'star',g:-.04});const m=B.foe,nw=G.dex[m.sp]!==2;dex(m.sp,2);msEvt('cap',m.sp);await say(`Bravo ! ${nm(m)} est attrapé !`);if(m.item)await say(`${nm(m)} tenait ${IT[m.item][0]} !`);if(nw)await say(`Les données de ${nm(m)} sont ajoutées au Pixédex.`);
 m.st=m.st==='slp'?null:m.st;if(G.party.length<6)G.party.push(m);else{G.box.push(m);await say(`${nm(m)} est envoyé dans la Boîte du Centre de Soins.`)}return true}
async function endBattle(r){const{tr,o}=B;
 if(r==='win'&&tr){B.fo.v=0;B.hf=0;B.trX=260;musPlay('win');await tween(B,'trX',0,350,1);await say(`Tu as battu ${tr.name} !`);if(tr.after)await say(tr.after,tr.name,0,tr.look);G.money+=tr.money;sfx('lv');await say(`Tu remportes ${tr.money} pièces.`)}
 if(r==='win')for(const m of B.part)if(G.party.includes(m))bondUp(m,tr?.boss?4:tr?2:1);await msFlush();
 if(r==='win'||r==='catch')for(const m of G.party)if(m.hp>0&&tal(m)==='chapardeur'&&Math.random()<.12){const k=['potion','potion','superpotion','totalsoin','repousse','capsule','elixir','baiesoin','biscuit','baieprisme'][rnd(0,9)];G.bag[k]=(G.bag[k]||0)+1;await say(`${nm(m)} a chapardé : ${IT[k][0]} !`)}
 const wiped=!G.party.some(alive);
 if(r==='lose'){if(o.noLose)await say(o.loseMsg||'Ton équipe est K.O.… Ce n\'était qu\'un premier combat !');else{const l=Math.floor(G.money/2);G.money-=l;await say(`Tu n'as plus de créature en état de se battre… Tu perds ${l} pièces et cours te mettre à l'abri !`)}}
 else if(wiped)await say('Victoire… mais ton équipe est épuisée. Tu cours te mettre à l\'abri !');
 await fadeTo(1,350);B=null;mode='world';ui.text=null;if(r==='lose'||wiped){healAll();if(!o.noLose)loadMap(...G.heal,0)}
 for(const m of G.party){const to=evoTarget(m);if(to&&m.hp>0)await evolve(m,to)}
 musPlay(mapMus(MAPS[G.map]));await fadeTo(0,350);if((r==='lose'||wiped)&&!o.noLose)await say('Ton équipe a été soignée. Ne baisse pas les bras !');return r}
// Évolution : [niveau, cible] ou liste [[niveau, cible, {time:'j'|'n', item, bond, eclipse}], …] (première condition remplie)
function evoTarget(m,item){const e=SP[m.sp].evo;if(!e)return null;for(const[lv,to,c]of Array.isArray(e[0])?e:[e]){if(item){if(c?.item===item)return to;continue}
 if(c?.item||m.lv<lv||c?.time==='j'&&night()||c?.time==='n'&&!night()||c?.bond&&bondLv(m)<c.bond||c?.eclipse&&!act2())continue;return to}return null}
function evoInfo(k){const e=SP[k].evo;if(!e)return SP[k].base!==k&&SP[k].base?`Évolue de ${SP[SP[k].base].name}`:'N\'évolue pas';return(Array.isArray(e[0])?e:[e]).map(([lv,to,c])=>`${SP[to].name} : ${c?.item?IT[c.item][0]:c?.bond?'lien '+c.bond+' cœurs':'niv. '+lv}${c?.time==='j'?' (jour)':c?.time==='n'?' (nuit)':''}`).join(' · ')}
async function evolve(m,to){mode='evo';ui.evo={a:m.sp,b:to,t0:0,fx:[],sh:m.sh};await fadeTo(0,250);await say(`Quoi ? ${nm(m)} évolue !`);ui.evo.t0=now();await wait(3400);
 const old=nm(m),oh=st(m).hp;m.sp=to;dex(to,2);m.hp+=st(m).hp-oh;jingle('evo');ui.flash=1;ui.flashC='#ffffff';await say(`Félicitations ! ${old} a évolué en ${SP[to].name} !`);for(const[l,mv]of SP[to].learn)if(l===m.lv)await learn(m,mv);await fadeTo(1,250);ui.evo=null;mode='world'}

// =====================================================================
// RENDU : MONDE (couche, tuiles animées, entités, avant-plan, ambiance, lumière)
// =====================================================================
const VIG=mkc(W,H,g=>{const gr=g.createRadialGradient(W/2,H/2,H*.38,W/2,H/2,H*.98);gr.addColorStop(0,'rgba(12,8,30,0)');gr.addColorStop(1,'rgba(12,8,30,.34)');g.fillStyle=gr;g.fillRect(0,0,W,H)});
const GLOW=mkc(96,96,g=>{const gr=g.createRadialGradient(48,48,4,48,48,48);gr.addColorStop(0,'rgba(255,140,50,.55)');gr.addColorStop(1,'rgba(255,90,30,0)');g.fillStyle=gr;g.fillRect(0,0,96,96)});
const GLOWY=mkc(96,96,g=>{const gr=g.createRadialGradient(48,48,4,48,48,48);gr.addColorStop(0,'rgba(255,236,150,.6)');gr.addColorStop(1,'rgba(255,220,120,0)');g.fillStyle=gr;g.fillRect(0,0,96,96)});
function ambient(M,cx,cy){const k=M.amb,cnt={};AMB.forEach(p=>cnt[p.k]=(cnt[p.k]||0)+1);const add=(kk,cap,o)=>{if((cnt[kk]||0)<cap)AMB.push({k:kk,x:cx+Math.random()*W,y:cy+Math.random()*H,l:300+Math.random()*300,ph:Math.random()*6,...o})};
 const nt=night();if(k==='day'&&!nt&&Math.random()<.01)add('fly',3,{vx:Math.random()-.5,c:['#ffffff','#f6c445','#9ad6f2'][Math.random()*3|0]});if((k==='day'||k==='mont')&&nt&&Math.random()<.04)add('ff',8,{});
 if(k==='cave'&&Math.random()<.03)add('drip',4,{y:cy,vy:2.2,l:120});if(k==='tech'&&Math.random()<.06)add('spk',10,{vy:-.2,vx:(Math.random()-.5)*.3,l:140});
 if(k==='foret'){if(Math.random()<(nt?.14:.05))add('ff',nt?18:8,{});if(Math.random()<.02)add('leaf',5,{y:cy-8,vx:.3,vy:.5})}
 if(k==='mont'){if(Math.random()<.25)add('em',22,{y:cy+H+4,vy:-.6-Math.random()*.8,vx:(Math.random()-.5)*.4,l:260});if(Math.random()<.05)add('ash',10,{y:cy-4,vy:.35,vx:.2})}
 if(k==='in'&&Math.random()<.05)add('dust',8,{vx:(Math.random()-.5)*.1,vy:-.06});
 if(ecl()&&!['in','cave','tech'].includes(k)&&Math.random()<.08)add('ecm',14,{y:cy+H+4,vy:-.25-Math.random()*.35,vx:(Math.random()-.5)*.3,l:420});
 if(k==='day'&&!nt&&!cnt.bird&&Math.random()<.0018){const y0=cy+20+Math.random()*H*.5;for(let i=0;i<3+(Math.random()*3|0);i++)AMB.push({k:'bird',x:cx-30-i*14-Math.random()*8,y:y0+(i%2?10:0)+i*4,vx:1.3,vy:.18,l:600,ph:i})}
 if(!nt&&Math.random()<.006&&k!=='in'&&k!=='cave'&&k!=='tech'){const tx=(cx/TS|0)+(Math.random()*W/TS|0),ty=(cy/TS|0)+(Math.random()*H/TS|0);if(M.rows[ty]?.[tx]==='~'&&M.rows[ty-1]?.[tx]==='~')AMB.push({k:'fishj',x:tx*TS+16,y:ty*TS+20,vx:(Math.random()<.5?-1:1)*.5,l:36,ml:36})}
 (M.smk||[]).forEach(([sx,sy])=>{if(Math.random()<.04)AMB.push({k:'smk',x:sx+Math.random()*4-2,y:sy,vx:.15,vy:-.35,l:110,ml:110})});
 AMB=AMB.filter(p=>{p.l--;p.ph=(p.ph||0)+.08;if(p.k==='fly'){p.vx=Math.max(-1,Math.min(1,p.vx+(Math.random()-.5)*.2));p.vy=Math.sin(p.ph*1.3)*.6}if(p.k==='ff'){p.x+=Math.sin(p.ph*.7)*.3;p.y+=Math.cos(p.ph*.5)*.25}if(p.k==='leaf')p.x+=Math.sin(p.ph)*.6;if(p.k==='st'){if(p.dl>0){p.dl--;p.l++;return true}p.x+=(p.tx-p.x)*.07+Math.sin(p.ph*3)*.6;p.y+=(p.ty-p.y)*.07}if(p.k==='pf'){p.vx*=.93;p.vy*=.93}if(p.k==='rkd')p.vy+=.22;if(p.k==='fishj'&&p.l===1)AMB.push({k:'spl',x:p.x+p.vx*36,y:p.y,l:24,ml:24});if(p.k==='rl')p.vy+=.15;
  p.x+=p.vx||0;p.y+=p.vy||0;const sx=ev(p.x-cx),sy=ev(p.y-cy);
  if(p.k==='fly'){const fl=(p.ph*4|0)%2;R(X,p.c,sx-4,sy-(fl?2:0),4,fl?2:4);R(X,p.c,sx+2,sy-(fl?2:0),4,fl?2:4);R(X,C.ink,sx,sy,2,4)}
  else if(p.k==='ff'){X.globalAlpha=.45+.45*Math.sin(p.ph*2);R(X,'#f6e27a',sx-2,sy-2,6,6);X.globalAlpha=1;R(X,'#fffbd0',sx,sy,2,2)}
  else if(p.k==='leaf')R(X,'#4fae4a',sx,sy,(p.ph*3|0)%2?4:2,(p.ph*3|0)%2?2:4);
  else if(p.k==='em')R(X,p.l%20<10?'#ffd23a':'#ff7a2a',sx,sy,2,2);else if(p.k==='ash')R(X,'#a8999a',sx,sy,2,2);else if(p.k==='ecm'){X.globalAlpha=Math.min(1,p.l/80)*.7;R(X,p.l%40<20?'#c060ff':'#5a2a8a',ev(sx+Math.sin(p.ph)*3),sy,2,2);X.globalAlpha=1}
  else if(p.k==='dust'){X.globalAlpha=.35;R(X,'#fff5dc',sx,sy,2,2);X.globalAlpha=1}
  else if(p.k==='st'){X.globalAlpha=Math.min(1,p.l/20);R(X,p.c,sx-1,sy-1,4,4);R(X,'#ffffff',sx,sy,2,2);X.globalAlpha=1}
  else if(p.k==='pf'){const k2=1-p.l/p.ml,z=ev(4+k2*14);X.globalAlpha=.75*(1-k2);R(X,p.c,sx-z/2,sy-z/2,z,z);X.globalAlpha=1}
  else if(p.k==='rkd')R(X,p.c,sx,sy,p.l%3?4:2,p.l%3?4:2);
  else if(p.k==='bird'){const fl=((p.ph+p.l/6)|0)%2;X.globalAlpha=.75;R(X,'#2a2440',sx-4,sy-(fl?2:0),4,2);R(X,'#2a2440',sx+2,sy-(fl?2:0),4,2);R(X,'#2a2440',sx,sy,2,2);X.globalAlpha=1}
  else if(p.k==='fishj'){const k2=1-p.l/p.ml,h=Math.sin(k2*Math.PI)*16;R(X,'#f08a3a',sx-3,ev(sy-h),6,2);R(X,'#ffd08a',sx-1,ev(sy-h)-2,2,2);if(k2<.15)R(X,K.foam,sx-4,sy,8,2)}
  else if(p.k==='spl'){const k2=1-p.l/p.ml,r=ev(2+k2*10);X.globalAlpha=1-k2;R(X,K.foam,sx-r,sy,r*2,2);R(X,K.foam,sx-r+2,sy-2,2,2);R(X,K.foam,sx+r-4,sy-2,2,2);X.globalAlpha=1}
  else if(p.k==='drip')R(X,'#8ad8e8',sx,sy,2,4);else if(p.k==='spk'){X.globalAlpha=.4+.4*Math.sin(p.ph*3);R(X,p.l%2?'#5ad0e0':'#e84aff',sx,sy,2,2);X.globalAlpha=1}
  else if(p.k==='smk'){const k2=1-p.l/p.ml;X.globalAlpha=.45*(1-k2);R(X,'#ece8f2',sx,sy,ev(4+k2*8),ev(4+k2*8));X.globalAlpha=1}
  else if(p.k==='rl')R(X,p.c,sx,sy,2,2);else if(p.k==='dst'){const k2=1-p.l/p.ml;X.globalAlpha=.5*(1-k2);R(X,'#e8dcc0',sx-ev(k2*8),sy,ev(4+k2*8),4);X.globalAlpha=1}
  return p.l>0&&sx>-90&&sx<W+90&&sy>-90&&sy<H+90})}
const CLOUD=mkc(260,120,g=>{for(const[x,y,rx,ry]of[[80,60,70,30],[150,50,60,34],[200,66,50,24],[120,76,60,22]])pell(g,x,y,rx,ry,'#141a3a')}),FOG=mkc(W,H,g=>{const r=seed('fog');for(let i=0;i<26;i++)pell(g,r()*W,r()*H,30+r()*60,10+r()*16,'rgba(236,242,250,.07)')});
const PHT=['#ecd2de','#ffffff','#f2c6a0','#5c66b4','#8c5a86'],DARK=mkc(W,H),hexr=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));let TC=[255,255,255];
function lightR(){const T=G.party.filter(alive).map(m=>SP[m.sp].t);return T.includes('FEU')||T.includes('LUM')?104:T.includes('ELE')?84:G.keys.lantern?66:34}
function lighting(M,cx,cy,t,px,py){const mul=c=>{X.globalCompositeOperation='multiply';X.fillStyle=c;X.fillRect(0,0,W,H);X.globalCompositeOperation='source-over'},out=!['in','cave','tech'].includes(M.amb),ph=phase();
 if(M.amb==='foret'){mul('#d2e4c6');if(ph<2){X.globalAlpha=.07;for(let i=0;i<3;i++){const bx=((i*230-cx*.3)%720+720)%720-140;for(let y=0;y<H;y+=4)R(X,'#fff6c0',ev(bx+y*.45),y,40,4)}X.globalAlpha=1}}
 if(out&&ph===1&&M.amb==='day'){X.globalAlpha=.09;for(let i=0;i<2;i++){const span=M.rows[0].length*TS+520,wx=((t*.012+i*span/2)%span+span)%span-260;X.drawImage(CLOUD,ev(wx-cx),ev(i*150+60-cy*.2))}X.globalAlpha=1}
 if(M.amb==='mont')mul('#f0d0c4');if(M.amb==='in')mul('#f6eada');if(M.amb==='tech')mul('#d6cef0');
 if(out&&stars())for(let i=0;i<3;i++){const p=((t/2300+i*.41)%1);if(p<.22){const q=p/.22,x0=((i*173+Math.floor(t/2300+i*.41)*97)%W)+60,y0=10+i*30,x=x0-q*140,y=y0+q*70;X.globalAlpha=(1-q)*.9;for(let j=0;j<12;j++)R(X,j<2?'#ffffff':'#fff0b0',ev(x+j*3),ev(y-j*1.5),2,1);X.globalAlpha=1}}
 if(out){const tg=hexr(PHT[ph]);TC=TC.map((v,i)=>v+(tg[i]-v)*.04);if(TC.some(v=>v<250))mul(`rgb(${TC.map(Math.round)})`);if(ph===4){X.globalAlpha=.12;R(X,'#e8484f',0,0,W,4);R(X,'#e8484f',0,H-4,W,4);X.globalAlpha=1}}
 const lit=out?Math.max(0,(255-TC[0])/200):M.amb==='cave'?.8:0,mh=M.rows.length,mw=M.rows[0].length;X.globalCompositeOperation='lighter';
 for(let y=Math.max(0,cy/TS|0);y<=Math.min(mh-1,(cy+H)/TS|0);y++)for(let x=Math.max(0,cx/TS-1|0);x<=Math.min(mw-1,(cx+W)/TS|0);x++){const c=M.rows[y][x],sx=x*TS-cx,sy=y*TS-cy;
  if(c==='L'){X.globalAlpha=.32+.12*Math.sin(t/400+x+y);X.drawImage(GLOW,sx-32,sy-32)}else if(c==='x'){X.globalAlpha=.4+.1*Math.sin(t/200+x);X.drawImage(GLOW,sx-32,sy-36)}
  else if(lit>.05&&(c==='n'||c==='l')){X.globalAlpha=lit*(c==='l'?.75:.5);c==='l'?X.drawImage(GLOWY,sx-32,sy-62):X.drawImage(GLOWY,sx-16,sy-20,64,64)}}
 X.globalAlpha=1;X.globalCompositeOperation='source-over';
 if(M.dark2){const g=DARK.getContext('2d'),r=lightR()+Math.sin(t/300)*2,lx=px-cx+16,ly=py-cy+10;g.globalCompositeOperation='source-over';g.clearRect(0,0,W,H);g.fillStyle='rgba(6,4,16,.97)';g.fillRect(0,0,W,H);g.globalCompositeOperation='destination-out';
  for(let k=0;k<4;k++)pell(g,lx,ly,ev(r*(1-k*.2)),ev(r*(1-k*.2)*.85),'rgba(0,0,0,.38)');X.drawImage(DARK,0,0)}
 if(rain()){mul('#b4c0d8');X.globalAlpha=.55;for(let i=0;i<70;i++){const rx=ev(((i*137+t*.35)%(W+40))-20),ry=ev(((i*71+t*.75)%(H+40))-20);R(X,'#c8e0ff',rx,ry,2,8)}X.globalAlpha=1;if(Math.random()<.3){const tx=(cx/TS|0)+(Math.random()*W/TS|0),ty=(cy/TS|0)+(Math.random()*H/TS|0);if(!SOLID.has(M.rows[ty]?.[tx]??'T'))AMB.push({k:'spl',x:tx*TS+Math.random()*32,y:ty*TS+Math.random()*32,l:14,ml:14})}}
 if(M.fog){X.globalAlpha=.32+.25*TC[0]/255;for(let i=0;i<2;i++){const o=((t*(i?.012:.02)+cx*(i?.5:.8))%W+W)%W,oy=i*24-(cy*.1)%40;X.drawImage(FOG,-o,oy);X.drawImage(FOG,W-o,oy)}X.globalAlpha=1}
 X.drawImage(VIG,0,0)}
let CAM=[0,0];const cxw=()=>CAM[0],cyw=()=>CAM[1];
const SHARDI=epx(ICO.shard);
const HEARTI=epx(epx(ICO.shard));
function glowAt(x,y,r,a,img=GLOWY){X.globalCompositeOperation='lighter';X.globalAlpha=a;X.drawImage(img,x-r,y-r,r*2,r*2);X.globalAlpha=1;X.globalCompositeOperation='source-over'}
const BUSH=mkc(32,32,g=>{pell(g,16,19,14,11,'#173f27');pell(g,16,18,13,10,'#2d7a3b');pell(g,15,16,11,8,'#3f9b47');pell(g,13,13,6,4,'#5cbd55');pell(g,12,12,2,1,'#8ad86c');R(g,'#55361f',15,28,2,3)});
function drawObj(k,sx,sy,t,n){
 if(k==='mine'){R(X,'#0e0a0c',sx+5,sy+6,22,26);R(X,'#1c1416',sx+7,sy+8,18,24);for(let i=0;i<3;i++)R(X,'#5a4a3e',sx+8,sy+29-i*7,16,1);R(X,'#3a2a24',sx+12,sy+8,1,24);R(X,'#3a2a24',sx+19,sy+8,1,24);
  R(X,'#4a2e1c',sx+2,sy+3,5,29);R(X,'#7a4e2a',sx+3,sy+3,3,29);R(X,'#4a2e1c',sx+25,sy+3,5,29);R(X,'#7a4e2a',sx+26,sy+3,3,29);R(X,'#4a2e1c',sx,sy,32,6);R(X,'#9a6a3e',sx,sy,32,3);R(X,'#c08a52',sx,sy,32,1);
  if(!f().badge){R(X,'#8a5a34',sx+4,sy+14,24,3);R(X,'#8a5a34',sx+4,sy+22,24,3);R(X,'#e8484f',sx+13,sy+15,6,1)}
  glowAt(sx+24,sy+11,22,.22+.08*Math.sin(t/180),GLOW);R(X,C.ink,sx+22,sy+7,5,7);R(X,'#ffd23a',sx+23,sy+8,3,5);return}
 if(k==='berry'){X.drawImage(SHD2,sx+4,sy+24,26,8);X.drawImage(T2('bush')||BUSH,sx,sy-2);if(n&&berryRipe(n)){const c=n.bk==='baieprisme'?['#9a7ae8','#6a4ab8']:['#e8484f','#a8303a'];for(const[bx,by]of[[7,8],[18,6],[12,15],[22,14],[16,21]]){R(X,C.ink,sx+bx-1,sy+by-3,5,5);R(X,c[0],sx+bx,sy+by-2,3,3);R(X,c[1],sx+bx+1,sy+by,2,1);R(X,'#ffffff',sx+bx,sy+by-2,1,1)}}return}
 if(k==='boulder'){X.drawImage(SHD2,sx+4,sy+24,26,8);X.drawImage(T2('boulder')||AIMG.rock1,sx,sy);return}
 if(k==='valve')return;
 if(k==='tear'){const b=Math.sin(t/260+(n?.x||0))*2;glowAt(sx+16,sy+16,22,.3+.12*Math.sin(t/200));R(X,'#3a1a5a',sx+13,sy+10+b,6,9);R(X,'#c060ff',sx+14,sy+11+b,4,7);R(X,'#e8b8ff',sx+14,sy+12+b,2,2);R(X,'#c060ff',sx+15,sy+8+b,2,3);if(((t/150)|0)%9===0)R(X,'#ffffff',sx+20,sy+6,2,2);return}
 if(k==='lever'){const on=n&&f()[n.lv];X.drawImage(SHD2,sx+6,sy+25,20,6);R(X,C.ink,sx+8,sy+18,16,12);R(X,'#5a5a6a',sx+9,sy+19,14,10);R(X,'#8a8a9a',sx+9,sy+19,14,2);R(X,C.ink,on?sx+16:sx+14,on?sy+14:sy+4,3,on?6:16);R(X,on?'#4cc46a':'#e8484f',on?sx+19:sx+12,on?sy+20:sy+1,6,5);R(X,C.ink,sx+15,sy+22,3,3);return}
 if(k==='stardust'){const p=(t/140+(n?.x||0))%6|0;glowAt(sx+16,sy+18,20,.35+.15*Math.sin(t/200));R(X,'#fff6c0',sx+15,sy+12,2,10);R(X,'#fff6c0',sx+11,sy+16,10,2);R(X,'#ffffff',sx+15,sy+16,2,2);if(p<3)R(X,'#ffe8a0',sx+8+p*7,sy+8+p*3,2,2);return}
 if(k==='sablier'){glowAt(sx+16,sy+10,40,.35+.15*Math.sin(t/220));X.drawImage(SHD2,sx+6,sy+25,22,7);X.drawImage(AIMG.sablier,sx+4,sy-6+Math.round(Math.sin(t/300)*2));return}
 if(k==='heart'){glowAt(sx+16,sy+6,52,.55+.2*Math.sin(t/160));X.drawImage(AIMG.heart,sx,sy-14+Math.round(Math.sin(t/300)*2));for(let i=0;i<4;i++){const a=t/500+i*1.57;R(X,'#ffffff',Math.round(sx+16+Math.cos(a)*22),Math.round(sy+6+Math.sin(a)*12),2,2)}return}
 if(k==='tent'){X.drawImage(SHD2,sx+10,sy+26,34,9);X.drawImage(AIMG.tent,sx-4,sy-3);return}
 if(k==='fire'){glowAt(sx+16,sy+16,46,.32+.08*Math.sin(t/120),GLOW);X.drawImage(AIMG.logs,sx,sy+12);for(let i=0;i<4;i++){const fh=7+((t/90+i*4)%4|0)*3,fx=sx+9+i*4;R(X,'#e8481e',fx,sy+22-fh,4,fh);R(X,'#ff9a2a',fx+1,sy+23-fh+3,2,Math.max(2,fh-5));R(X,'#ffe27a',fx+1,sy+19,2,2)}if(Math.random()<.08)AMB.push({k:'em',x:sx+16+cxw(),y:sy+10+cyw(),vy:-.8,vx:(Math.random()-.5)*.4,l:60})}}

function drawWorld(t){const M=MAPS[G.map],mw=M.rows[0].length,mh=M.rows.length;R(X,'#0d0b16',0,0,W,H);
 let px=G.x*TS,py=G.y*TS;if(move){px=(move.fx+(move.tx-move.fx)*move.t)*TS;py=(move.fy+(move.ty-move.fy)*move.t)*TS}px=Math.round(px);py=Math.round(py);
 const cam=(p,m,v)=>Math.round(m*TS<=v?(m*TS-v)/2:Math.max(0,Math.min(m*TS-v,p+16-v/2)));let cx=cam(CAMO?CAMO.x-16:px,mw,W),cy=cam(CAMO?CAMO.y-16:py,mh,H);CAM=[cx,cy];if(ui.shake>0){cx+=ev((Math.random()-.5)*ui.shake);cy+=ev((Math.random()-.5)*ui.shake*.5);ui.shake=Math.max(0,ui.shake-.4)}
 X.drawImage(M.L,-cx,-cy);animTiles(M,cx,cy,t);const bio=biomeOf(M);
 const grassOver=(x,y,sx,sy)=>{const c=M.rows[y]?.[x];if(c===','||c==='v')X.drawImage(frontGrass(M.floor?'plain':bio,0),sx,sy+14)};
 const ents=npcs(M).map(n=>({y:n.y*TS+(n.oy||0),d:()=>{const sx=Math.round(n.x*TS+(n.ox||0)-cx),sy=Math.round(n.y*TS+(n.oy||0)-cy);
  if(n.t==='ball'){const onT=M.rows[n.y]?.[n.x]==='C',oy=onT?-10:12;if(!onT)X.drawImage(SHD2,sx+6,sy+24,18,6);X.drawImage(AIMG.orbS_capsule,sx+8,sy+oy);if(((t/180|0)+n.x*3)%14===0){R(X,'#ffffff',sx+19,sy+oy+1,1,5);R(X,'#ffffff',sx+17,sy+oy+3,5,1)}}
  else if(n.t==='shard'){const bob=Math.round(Math.sin(t/300+n.x)*2);X.drawImage(SHD2,sx+5,sy+24,22,7);glowAt(sx+16,sy+10,38,.3+.15*Math.sin(t/250));X.drawImage(AIMG.shard,sx+6,sy-2+bob);if(((t/140|0)+n.x)%10===0)R(X,'#ffffff',sx+22,sy,2,2)}
  else if(n.t==='obj'){drawObj(n.k,sx,sy,t,n)}
  else if(n.t==='mon'&&n.fauna){const bob=n.slp?0:(t/(n.walk?140:460)|0)%2*2;X.drawImage(SHD,sx-2,sy+20,36,12);X.drawImage(monOW(n.sp,n.d),sx-16,sy-34-bob,64,64);grassOver(n.x,n.y,sx,sy);
   if(n.slp&&((t/500|0)+n.x)%3)txt('z',sx+30+((t/500|0)%3)*3,sy-10-((t/500|0)%3)*6,'#e8e4f6',{s:1})}
  else if(n.t==='mon'){const al=n.a??1;X.globalAlpha=al;X.drawImage(SHD,sx-4,sy+20-(n.oy||0),40,12);const bob=(t/420|0)%2*2;X.globalCompositeOperation='lighter';X.globalAlpha=(.3+.1*Math.sin(t/300))*al;X.drawImage(GLOWY,sx-32,sy-40);X.globalAlpha=al;X.globalCompositeOperation='source-over';X.drawImage(monOW(n.sp,n.d),sx-16,sy-34-bob,64,64);X.globalAlpha=1}
  else{X.drawImage(SHD2,sx+5,sy+25);X.drawImage(chr(n.t,n.d,(n.ox||n.oy)?1+(t/130|0)%2:0),sx,sy-32);grassOver(n.x,n.y,sx,sy);if(n.qm?.())X.drawImage(ICO.qmark,sx+8,sy-44-(t/320|0)%2*2,16,22)}}}));
 const fm=folMon();if(fm&&!(FOL.x===G.x&&FOL.y===G.y&&!move)){const k=move?Math.min(1,move.t):1,fx=Math.round((FOL.fx+(FOL.x-FOL.fx)*k)*TS),fy=Math.round((FOL.fy+(FOL.y-FOL.fy)*k)*TS),fly=FLY.has(fm.sp);
  ents.push({y:fy-1,d:()=>{const sx=fx-cx,sy=fy-cy,hop=move?Math.round(Math.sin(k*Math.PI)*3):fly?Math.round(Math.sin(t/260)*3+3):(t/480|0)%2;X.drawImage(SHD,sx+2,sy+22,28,10);X.drawImage(monOW(fm.sp,FOL.d,fm.sh),sx-16,sy-32-hop-(fly?6:0),64,64);grassOver(FOL.x,FOL.y,sx,sy)}})}
 ents.push({y:py,me:1,d:()=>{const sx=px-cx,sy=py-cy,fr=move&&move.t>.15&&move.t<.7?1+steps%2:0;X.drawImage(SHD2,sx+5,sy+25);X.drawImage(chr('hero',G.dir,fr),sx,sy-32);const gx=move?(move.t>.5?move.tx:move.fx):G.x,gy=move?(move.t>.5?move.ty:move.fy):G.y;grassOver(gx,gy,sx,sy)}});
 for(const h of M.hidden||[])if(!f()[hk(h)]&&((t/150|0)+h.x*7+h.y*3)%(G.keys.boussole?7:night()||M.dark2?12:26)===0){const sx=h.x*TS-cx+12,sy=h.y*TS-cy+10;R(X,'#ffffff',sx,sy-4,2,10);R(X,'#ffffff',sx-4,sy,10,2);R(X,C.goldL,sx,sy,2,2)}
 if(ui.bob){const b=ui.bob,sx=b.x*TS-cx+12,sy=b.y*TS-cy+12+(b.bite?6:Math.round(Math.sin(t/220)*2));R(X,C.ink,sx-1,sy-1,10,10);R(X,'#ffffff',sx,sy+4,8,4);R(X,C.acc,sx,sy,8,4);X.globalAlpha=.5;R(X,'#eef9ff',sx-6,sy+9,20,2);X.globalAlpha=1;R(X,'#ece6d6',px-cx+16,py-cy+4,1,1)}
 // rangées : décors posés sur la rangée r, puis personnages de cette rangée (du fond vers l'avant)
 const rows=new Map();for(const e of ents){const r=Math.floor((e.y+16)/TS);if(!rows.has(r))rows.set(r,[]);rows.get(r).push(e)}
 const r0=Math.max(0,(cy>>5)-1),r1=Math.min(mh+3,((cy+H)>>5)+4);let meHidden=0;
 for(let r=r0;r<=r1;r++){const S=M.S?.[r];if(S)for(const s of S){const sx=s.x-cx,sy=s.y-cy;if(sx>W||sy>H||sx+s.img.width<0||sy+s.img.height<0)continue;X.drawImage(s.img,sx,sy);if(r>Math.floor((py+16)/TS)&&sx<px-cx+28&&sx+s.img.width>px-cx+4&&sy<py-cy+24&&sy+s.img.height>py-cy+4)meHidden=1}
  const E=rows.get(r);if(E){E.sort((a,b)=>a.y-b.y);E.forEach(e=>e.d())}}
 for(const[r,E]of rows)if(r<r0||r>r1)E.forEach(e=>e.d());
 if(meHidden){X.globalAlpha=.5;X.drawImage(silh(chr('hero',G.dir,0),'#2a2050'),px-cx,py-cy-32);X.globalAlpha=1}
 ambient(M,cx,cy);lighting(M,cx,cy,t,px,py);
 if(ui.bob?.bite){X.drawImage(ICO.bang,px-cx+8,py-cy-30,16,22)}
 for(const e of ui.emo){const n=e.n,k=Math.min(1,(now()-e.t0)/160),[wx,wy]=n==='me'?[px,py]:n==='fol'?[FOL.x*TS,FOL.y*TS-10]:[n.x*TS+(n.ox||0),n.y*TS+(n.oy||0)],sx=ev(wx-cx)+8,sy=ev(wy-cy)-30-ev(Math.sin(k*Math.PI)*8);X.drawImage(EMO()[e.k]||ICO.bang,sx,sy,16,22)}
 ui.wfx=ui.wfx.filter(e=>{const k=(now()-e.t0)/e.ms;if(k>=1)return false;const x=e.x-cx,y=e.y-cy,a=Math.sin(Math.min(1,k*1.2)*Math.PI)*.32;X.save();X.globalCompositeOperation='lighter';X.globalAlpha=a;X.translate(x,y);X.rotate(now()/2400);X.fillStyle=e.c;for(let i=0;i<10;i++){X.rotate(Math.PI/5);X.beginPath();X.moveTo(0,0);X.lineTo(170,i%2?-10:-20);X.lineTo(170,i%2?10:20);X.fill()}X.restore();X.globalCompositeOperation='lighter';X.globalAlpha=a*.9;X.drawImage(GLOWY,x-64,y-64,128,128);X.globalAlpha=1;X.globalCompositeOperation='source-over';return true});
 if(!busy&&!move&&!ui.text){const{n,s,a,c,tx,ty}=facing();if(n&&(n.t!=='obj'||n.k==='berry'&&berryRipe(n))||s||a||AFF[c]){const sx=ev(tx*TS-cx)+7,sy=ev(ty*TS-cy)-26-(t/300|0)%2*2;X.drawImage(ICO.abtn,sx,sy,18,18)}}
 if(ui.pop){const k=(now()-ui.pop.t0)/1200;if(k>1)ui.pop=null;else{const sx=px-cx+8,sy=py-cy-30-ev(Math.min(1,k*3)*14);X.globalAlpha=k>.8?(1-k)*5:1;if(ui.pop.ic)X.drawImage(ui.pop.ic,sx,sy,16,16);if((now()/120|0)%2)R(X,'#ffffff',sx+16,sy-2,2,2);X.globalAlpha=1}}
 if(ui.note){const k=now()-ui.note.t0;if(k>2600)ui.note=null;else if(k>=0){const s=ui.note.s.toUpperCase(),w=tw(s,2,1)+40,x=W-8-w,y=ev(Math.min(8,-30+k/4,8+(2200-k)/4)),ph=phase();rr(x,y,w,24,3,C.ink);rr(x+2,y+2,w-4,20,2,C.frameD);if(/LIEN/.test(s))X.drawImage(ICO.hrt,x+7,y+6,14,12);else X.drawImage(/MISSION/.test(s)?ICO.board:/AVERSE|ÉCLAIRCIE/.test(s)?ICO.rain:/ESSAIM/.test(s)?ICO.capsule:ph===4?ICO.ecl:ph===3?ICO.moon:ICO.sun,x+6,y+4,16,16);txt(s,x+28,y+17,'#ffffff',{mini:1})}}
 if(ui.banner){const k=now()-ui.banner.t0;if(k>2800)ui.banner=null;else{const y=ev(Math.min(8,-48+k/3,8+(2400-k)/3)),w=tw(ui.banner.s)+60;panel(8,y,w,44);X.drawImage(ICO.pin,24,y+14,16,16);txt(ui.banner.s,46,y+30)}}}

// =====================================================================
// RENDU : COMBAT (décors par zone, plateformes, HUD, effets)
// =====================================================================
const BGA={};
// Fonds de combat illustrés (Tuxemon / Superpowers, CC0) avec version de nuit ; sol prolongé sous l'horizon du cadre.
function bgArt(k){const nk=night()&&BGI[k+'N']?k+'N':k,im=BGI[nk];if(im)return BGA[nk]||(BGA[nk]=mkc(240,160,g=>{g.drawImage(im,-8,0);g.drawImage(im,0,im.height-1,im.width,1,-8,im.height,im.width,160-im.height)}));return bgArt0(k)}
function bgArt0(k){if(BGA[k])return BGA[k];return BGA[k]=mkc(240,160,g=>{const p=(c,x,y,w=1,h=1)=>R(g,c,x,y,w,h);
 const sky=(cols,hz)=>{const bh=hz/cols.length;cols.forEach((c,i)=>p(c,0,Math.round(i*bh),240,Math.ceil(bh)+1));for(let i=1;i<cols.length;i++){const y=Math.round(i*bh);for(let x=0;x<240;x+=2){p(cols[i-1],x,y);p(cols[i-1],x+1,y+1)}}};
 const ridge=(c,base,amp,fq,ph,hz)=>{for(let x=0;x<240;x++){const y=Math.round(base-amp*(Math.sin(x*fq+ph)*.6+Math.sin(x*fq*2.3+ph*2)*.4));p(c,x,y,1,hz-y+1)}};
 const ground=(c,c2,hz)=>{p(c,0,hz,240,160-hz);let y=hz+3,gp=3;while(y<160){p(c2,0,y,240,1+(gp>8?1:0));y+=gp;gp=Math.round(gp*1.45)+1}};
 const cloud=(x,y,w)=>{p('#ffffff',x+3,y,w-6,3);p('#ffffff',x,y+2,w,4);p('#ffffff',x+5,y-2,Math.round(w*.4),3);p('#d6eef8',x+1,y+5,w-2,1)};
 if(k==='plaine'){sky(['#8fd0f0','#a8dcf4','#c2e8f6','#dcf3f6'],54);cloud(20,12,34);cloud(150,22,26);cloud(200,8,20);ridge('#a8d4a0',48,5,.035,1,54);ridge('#86c27a',52,3,.06,2,54);for(let x=6;x<240;x+=19){p('#5aa25a',x,46+(x%5),4,4);p('#78bc6a',x+1,46+(x%5),2,1)}ground('#b4de8c','#a3d47c',54);for(let i=0;i<40;i++){const x=(i*53)%236,y=60+(i*37)%96;p('#8cc46a',x,y,1,2);p('#8cc46a',x+2,y,1,2)}}
 else if(k==='foret'){sky(['#c8e2c0','#b4d6ac','#9fc898'],54);for(let x=-8;x<240;x+=14){const h=16+(x*7+56)%9;for(let y=0;y<h;y++)p('#7fac86',Math.round(x+7-y*.4),54-h+y,Math.round(y*.8)+1,1)}for(let x=-10;x<240;x+=22){const h=24+(x*5+50)%11;for(let y=0;y<h;y++)p('#4f8a5e',Math.round(x+11-y*.45),54-h+y,Math.round(y*.9)+1,1)}ground('#7fb85e','#72aa54',54);for(let i=0;i<30;i++)p(i%2?'#c8783a':'#9a6a3a',(i*61)%238,62+(i*29)%94,2,1);g.globalAlpha=.12;for(let i=0;i<3;i++)for(let y=0;y<160;y+=2)p('#fffbd8',Math.round(30+i*80+y*.5),y,14,2);g.globalAlpha=1}
 else if(k==='mont'){sky(['#2e2244','#5a3058','#9a4658','#d8684e','#f2a064'],56);for(let y=0;y<40;y++){const hw=Math.round(10+y*1.9);p('#4a2e3a',170-hw,16+y,hw*2,1)}p('#ff7a2a',162,15,16,2);p('#ffd23a',166,15,8,1);for(let i=0;i<4;i++)p('#7a6878',160+i*5-i*i,4-i*3+6,6+i*2,3);ridge('#5a3448',50,6,.05,3,56);ground('#a07a68','#8c6858',56);for(let i=0;i<12;i++){const x=(i*47)%220,y=64+(i*23)%90;p('#5a3a30',x,y,8,1);p('#f07a3a',x+2,y,3,1)}}
 else if(k==='lac'){sky(['#9ad0ec','#b4dcf0','#cce8f2','#e2f2f2'],50);cloud(30,10,30);cloud(170,18,24);ridge('#7aa8a0',46,4,.04,2,50);p('#5a9ac8',0,50,240,22);for(let i=0;i<24;i++)p('#8ac8ec',(i*41)%232,52+(i*13)%18,6,1);p('#cfe8f0',0,50,240,1);ground('#a8d08c','#98c47c',72);for(let i=0;i<30;i++){const x=(i*53)%236,y=78+(i*37)%80;p('#88b86a',x,y,1,2)}}
 else if(k==='grotte'){p('#1c1828',0,0,240,160);for(let i=0;i<14;i++){const x=(i*37)%230,h=10+(i*13)%26;for(let y=0;y<h;y++)p('#2e2a40',x+Math.round(y*.3),y,Math.max(1,8-Math.round(y*.3)),1)}ridge('#2a2638',58,6,.07,1,62);ground('#3e3852','#363048',62);for(let i=0;i<18;i++){const x=(i*61)%236,y=66+(i*29)%90;p('#4a445c',x,y,6,1);if(i%4===0)p('#7ad8e8',x+2,y-1,2,1)}for(let i=0;i<10;i++)p('#7ad8e8',(i*47)%236,(i*19)%50,2,2)}
 else if(k==='tech'){p('#1e1a30',0,0,240,64);for(let x=0;x<240;x+=30){p('#2a2440',x+2,4,26,54);p('#3a3256',x+4,6,22,30);p('#14303a',x+6,8,18,14);p('#5ad0e0',x+7,10,(x%7)+6,1);p('#5ad0e0',x+7,13,(x%5)+8,1);p('#e84a8a',x+20,30,3,2)}pell(g,120,30,26,26,'#3a3256');pell(g,120,30,22,22,'#0e0a1e');for(let i=0;i<12;i++)p('#e6e0f6',104+(i*7)%32,14+(i*11)%32,1,1);p('#4a4070',0,62,240,2);ground('#3a3352','#2e2844',64);for(let x=0;x<240;x+=24)p('#463e62',x,64,1,96)}
 else{p('#8a8478',0,0,240,62);for(let r=0;r<10;r++){p('#6e695f',0,r*6+5,240,1);for(let x=(r%2)*8;x<240;x+=16)p('#6e695f',x,r*6,1,5)}for(let x=20;x<240;x+=70){p('#a8a296',x,0,16,62);p('#c8c2b6',x,0,3,62);p('#6e695f',x+14,0,2,62);p('#b8343e',x+20,6,12,26);p('#8a2028',x+20,30,12,2);p(C.gold,x+24,14,4,4)}p('#4a463f',0,58,240,4);ground('#cfc4ae','#bfb39a',62);for(let x=0;x<240;x+=24)p('#bfb39a',x,62,1,98)}})}
const PLC={lac:['#5a8a6a','#78a888','#9ac8a8'],grotte:['#2e2a40','#3e3852','#565070'],tech:['#2a2440','#3a3352','#4a4266'],plaine:['#5f9a48','#7ab85c','#9fd27c'],foret:['#3f7a40','#5a9a50','#7fbf6a'],mont:['#6a4a40','#8a6a5a','#a8887a'],salle:['#8a8070','#a8a090','#c8c0b0']};
const PLA_={};const platArt=(k,rx,ry)=>PLA_[k+rx]||(PLA_[k+rx]=mkc(rx*2+4,ry*2+8,g=>{const[d,m,l]=PLC[k];pell(g,rx+2,ry+4,rx,ry,d);pell(g,rx+2,ry+2,rx,ry,m);pell(g,rx+2,ry+1,rx-4,ry-3,l);pell(g,rx+2,ry+2,rx-10,ry-5,m);for(let i=0;i<6;i++){const x=6+(i*29)%(rx*2-10);R(g,d,x,ry+((i*7)%ry)-2,1,2);R(g,d,x+2,ry+((i*7)%ry)-2,1,2)}}));
function drawMon(m,back,cx,by,o,t){if(!o.v||o.s<=.01)return;const N=128,img=monSpr(m.sp,back,N,m.sh),w=ev(N*o.s),idle=o.s>=1&&!o.b,fly=FLY.has(m.sp)&&m.hp>0,bob=idle?(fly?ev((Math.sin(t/(back?420:360))+1)*4)+6:(t/(back?460:400)|0)%2*2):0;
 if(fly&&o.s>=1)pell(X,ev(cx+o.x),by+2,ev(N*.3-bob/2),3,'rgba(20,14,40,.22)');X.save();X.beginPath();X.rect(0,0,W,by+8);X.clip();
 const ac=B?.awkC?.get(m);if(ac&&!o.dk&&!o.b){const g2=silh(img,ac),u=Math.max(2,ev(w/N*2));X.globalAlpha=.4+.25*Math.sin(t/170);for(const[dx,dy]of[[-u,0],[u,0],[0,-u],[0,u]])X.drawImage(g2,ev(cx+o.x-w/2)+dx,ev(by+o.y-w+4-bob)+dy,w,w);X.globalAlpha=1}
 X.drawImage(o.dk?silh(img,C.ink):o.b?silh(img,'#ffffff'):img,ev(cx+o.x-w/2),ev(by+o.y-w+4-bob),w,w);X.restore()}
function hud(x,y,w,h,m,side,dh,t){const k=dh/st(m).hp,lo=k<=.2&&k>0;rr(x+4,y+4,w,h,4,'rgba(12,8,28,.35)');rr(x,y,w,h,4,lo&&(t/300|0)%2?C.red:C.ink);rr(x+2,y+2,w-4,h-4,2,C.paper);R(X,'#ffffff',x+4,y+2,w-8,2);R(X,side?C.frame:C.acc,x+2,y+h-6,w-4,4);
 if(B.lvf&&!side&&now()-B.lvf<500){X.globalAlpha=.6*(1-(now()-B.lvf)/500);rr(x+2,y+2,w-4,h-4,2,C.gold);X.globalAlpha=1}
 txt(nm(m),x+12,y+24);txt(m.lv,x+w-12,y+24,C.ink,{al:'r'});txt('NV',x+w-16-tw(m.lv),y+22,C.ink2,{mini:1,al:'r'});if(!side&&m.item)X.drawImage(ICO[m.item],x+w-38-tw(m.lv)-tw('NV',2,1),y+11,14,14);hpBar(x+38,y+32,w-50,k);
 const sg=B.stg[side?1:0];let sx=x+stChip(m,x,y+h+4);if(m.st&&m.hp>0)sx+=4;for(const s of['atk','def','spd'])if(sg[s]){const lab={atk:'ATT',def:'DEF',spd:'VIT'}[s]+(sg[s]>0?'+':'')+sg[s],ww=tw(lab,2,1)+10;rr(sx,y+h+4,ww,14,2,C.ink);R(X,sg[s]>0?C.green:C.blue,sx+2,y+h+6,ww-4,10);txt(lab,sx+5,y+h+14,'#ffffff',{mini:1});sx+=ww+4}
 if(side&&B.tr)B.foes.forEach((f2,i)=>{const bx=x+w-16-(B.foes.length-1-i)*14;X.drawImage(f2.hp>0?BALL:silh(BALL,'#6a5f8f'),bx,y+h+4,12,12)});if(side&&!B.tr&&G.dex[m.sp]===2)X.drawImage(ICO.capsule,x+w-26,y+8,12,12);
 if(!side){txt(`${Math.ceil(dh)}/${st(m).hp}`,x+w-12,y+58,C.ink2,{mini:1,al:'r'});const e0=xpFor(m.lv),e1=xpFor(m.lv+1),xv=B.xpv!=null?B.xpv:m.exp;txt('EXP',x+12,y+70,C.blue,{mini:1});bar(x+42,y+62,w-54,(xv-e0)/(e1-e0),C.blue,8);if(B.xpv!=null)R(X,'#ffffff',x+42+ev((w-58)*Math.min(1,(xv-e0)/(e1-e0))),y+64,2,4)}}
function drawFx(b){b.fx=b.fx.filter(p=>{p.vx*=p.dr;p.vy*=p.dr;p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.l--;const k=p.l/p.ml,x=ev(p.x),y=ev(p.y);
  if(p.k==='sq'){const s=Math.max(2,ev(p.s*Math.min(1,k*1.5)));R(X,p.c,x-s/2,y-s/2,s,s)}
  else if(p.k==='leaf'){const fl=(p.l>>2)%2;R(X,p.c,x,y,fl?6:2,fl?2:6);R(X,'#b6ec7a',x,y,2,2)}
  else if(p.k==='star'){R(X,p.c,x-2,y-2,4,4);if(k>.5){R(X,p.c,x-6,y,12,2);R(X,p.c,x,y-6,2,12)}}
  else if(p.k==='rock'){R(X,C.ink,x-7,y-7,14,14);R(X,p.c,x-5,y-5,10,10);R(X,'#c8b8a0',x-5,y-5,6,2)}
  else if(p.k==='ring'){const r=p.r0+(1-k)*p.r1;for(let i=0;i<16;i++){const a=i/16*6.283;R(X,p.c,ev(p.x+Math.cos(a)*r)-2,ev(p.y+Math.sin(a)*r*.8)-2,4,4)}}
  else if(p.k==='beam'){X.globalAlpha=Math.min(1,k*2)*.8;R(X,p.c,x-4,0,8,p.h);R(X,'#ffffff',x-2,0,4,p.h);X.globalAlpha=1}
  else if(p.k==='smk'){X.globalAlpha=k*.6;const s=p.s*2+ev((1-k)*12);R(X,p.c,x-p.s,y-p.s,s,s);X.globalAlpha=1}
  else if(p.k==='glyph'){X.globalAlpha=Math.min(1,k*2);txt(p.ch,x,y,p.c,{ol:C.ink,sh:0});X.globalAlpha=1}
  else if(p.k==='txt'){X.globalAlpha=Math.min(1,k*3);txt(p.ch,x,y,p.c,{ol:C.ink,al:'c'});X.globalAlpha=1}
  return p.l>0});
 const seg=(pts,c,w,h,dx,dy)=>{for(let i=1;i<pts.length;i++){const a=pts[i-1],e=pts[i],n=Math.ceil(Math.hypot(e[0]-a[0],e[1]-a[1])/2);for(let j=0;j<=n;j++)R(X,c,ev(a[0]+(e[0]-a[0])*j/n)+dx,ev(a[1]+(e[1]-a[1])*j/n)+dy,w,h)}};
 for(const pts of b.bolts){seg(pts,'#ffe27a',8,4,-4,-2);seg(pts,'#ffffff',4,2,-2,0)}}
function drawBattle(t){const b=B;let sx=0,sy=0;if(b.shake>0){sx=ev((Math.random()-.5)*b.shake);sy=ev((Math.random()-.5)*b.shake*.5);b.shake=Math.max(0,b.shake-.6)}R(X,'#000000',0,0,W,H);X.save();X.translate(sx,sy);if(b.zoom>1.002){X.translate(W/2,H/2);X.scale(b.zoom,b.zoom);X.translate(-W/2,-H/2);b.zoom=1+(b.zoom-1)*.86}
 X.drawImage(bgArt(b.bgk),0,0,W,H);if(['plaine','foret','mont','lac'].includes(b.bgk)&&!BGI[b.bgk+'N']){const ph=phase();if(ph===4||ph===3){X.globalCompositeOperation='multiply';X.fillStyle=ph===4?'#9a6e9a':'#7a84c8';X.fillRect(0,0,W,H);X.globalCompositeOperation='source-over';STARS.forEach(([x2,y2,i])=>{if(y2<100&&((t/300|0)+i)%9)R(X,'#e6e0f6',x2,y2,2,2)});if(ph===4){pell(X,64,40,18,18,'#ff7a5a');pell(X,64,40,16,16,'#1e1428')}}}
 if(phase()===4&&BGI[b.bgk+'N']){X.globalAlpha=.3;R(X,'#2a0a3a',0,0,W,H);X.globalAlpha=1;pell(X,64,40,18,18,'#ff7a5a');pell(X,64,40,16,16,'#1e1428')}
 if(b.sky){X.globalAlpha=.22;R(X,SKY[b.sky.k][1],0,0,W,H);X.globalAlpha=1;if(b.sky.k==='rain')for(let i=0;i<40;i++){const rx=((i*97+t*.6)%W),ry=((i*53+t*.9)%H);R(X,'#c8e4ff',ev(rx),ev(ry),2,8)}
  if(b.sky.k==='sun'){X.globalCompositeOperation='lighter';for(let i=0;i<5;i++){X.globalAlpha=.07+.04*Math.sin(t/500+i);X.save();X.translate(((i*130+t*.02)%640)-80,-20);X.rotate(.45);R(X,'#fff0a0',0,0,26,520);X.restore()}X.globalAlpha=1;X.globalCompositeOperation='source-over'}
  if(b.sky.k==='eclipse'){X.globalAlpha=.35;R(X,'#120a22',0,0,W,H);X.globalAlpha=1;pell(X,420,38,22,22,'#c060ff');pell(X,420,38,19,19,'#140c26');for(let i=0;i<14;i++){const k2=((t/4200)+i/14)%1;X.globalAlpha=Math.sin(k2*Math.PI)*.8;R(X,i%2?'#9a5ad0':'#e84aff',ev((i*67)%W),ev(H-k2*H),2,2)}X.globalAlpha=1}}
 for(const[m2,P2,o2]of[[b.foe,FOE,b.fo],[b.me,ME,b.mo]])if(b.awkC.has(m2)&&o2.v&&o2.s>=1&&Math.random()<.18)spawn({x:P2[0]+(Math.random()-.5)*64,y:P2[1]+34,vy:-1.1-Math.random()*1.2,l:30,c:Math.random()<.5?b.awkC.get(m2):'#ffffff',s:Math.random()<.5?2:4});
 for(const[m2,P2,o2]of[[b.foe,FOE,b.fo],[b.me,ME,b.mo]])if(m2.st&&o2.v&&o2.s>=1&&Math.random()<.035){const c2=STN[m2.st][1];if(m2.st==='slp')spawn({k:'txt',ch:'z',x:P2[0]+24,y:P2[1]-14,vy:-.6,vx:.3,l:44,c:'#c9c2d6'});else spawn({x:P2[0]+(Math.random()-.5)*50,y:P2[1]+10+Math.random()*30,vy:m2.st==='psn'||m2.st==='brn'?-.9:0,vx:m2.st==='par'?(Math.random()-.5)*3:0,l:22,c:m2.st==='par'?'#fff6a0':c2,s:4})}const fx=ev(FOE[0]+b.pf.f),mx=ev(ME[0]+b.pf.m),fp=platArt(b.bgk,46,9),mp=platArt(b.bgk,58,11);X.drawImage(fp,fx-fp.width,104,fp.width*2,fp.height*2);X.drawImage(mp,mx-mp.width,206,mp.width*2,mp.height*2);
 if(b.trX!=null){X.drawImage(SHD2,fx-12+ev(b.trX),114,24,8);X.drawImage(trSpr(b.tr.look),fx-64+ev(b.trX),-6)}
 if(b.showFoe)drawMon(b.foe,0,fx,FOE[1]+52,b.fo,t);drawMon(b.me,1,mx,ME[1]+58,b.mo,t);
 if(b.ball){X.save();X.translate(ev(b.ball.x),ev(b.ball.y));X.rotate(b.ball.r||0);const img=b.ball.ic?bigIco(b.ball.ic):BALL;X.drawImage(img,-16,-16,32,32);if(b.ball.done){X.globalAlpha=.35;X.drawImage(silh(img,C.ink),-16,-16,32,32);X.globalAlpha=1}X.restore()}
 drawFx(b);if(b.tint){X.globalAlpha=Math.max(0,b.tint.a);R(X,b.tint.c,0,0,W,H);X.globalAlpha=1;b.tint.a-=.02;if(b.tint.a<=0)b.tint=null}X.restore();
 if(b.showFoe&&b.hf>0)hud(ev(8-(1-b.hf)*260),10,236,52,b.foe,1,b.dh[1],t);
 if(b.sky){const[n,c]=SKY[b.sky.k],s2=b.sky.n>=99?n:`${n} ${b.sky.n}`;tag(8,88,s2,c)}
 if(b.tp){const k=now()-b.tp.t0;if(k>1300)b.tp=null;else{X.globalAlpha=k>1000?(1300-k)/300:1;const s2='TALENT : '+b.tp.t.toUpperCase(),tw2=tw(s2)+20;tag(b.tp.s?8:W-tw2-8,b.tp.s?112:106,s2,C.acc);X.globalAlpha=1}}if(b.hm>0)hud(ev(236+(1-b.hm)*260),132,240,78,b.me,0,b.dh[0],t);
 if(b.evOn[0]&&b.hm>=1)evOrb(206,160,0,t);if(b.evOn[1]&&b.showFoe&&b.hf>=1)evOrb(262,32,1,t);
 if(b.evB){const k=now()-b.evB.t0;if(k>1800)b.evB=null;else{X.globalAlpha=Math.max(0,Math.min(1,k/150,(1800-k)/300));const y=ev(126-Math.max(0,200-k)/6);R(X,'rgba(12,8,28,.6)',0,y-34,W,44);txt(b.evB.k?'ÉVEIL LUNAIRE':'ÉVEIL SOLAIRE',W/2,y,b.evB.k?'#e0d4ff':C.gold,{s:3,al:'c',ol:C.ink,olw:2});X.globalAlpha=1}}}
// Orbe d'Éveil : se remplit de bas en haut, brille quand il est plein
function evOrb(x,y,s,t){const b=B,used=b.evUsed[s],k=used?0:b.ev[s]/100,lu=lunar(),col=lu?'#a888ff':'#f6c445',full=k>=1,aw=b.awk.has(side(s));
 if(full)glowAt(x,y,34,.35+.2*Math.sin(t/140));pell(X,x,y,13,13,C.ink);pell(X,x,y,11,11,'#2a2244');const fh=Math.round(22*k);
 for(let i=0;i<fh;i++){const ry=10-i,hw=Math.floor(Math.sqrt(Math.max(0,121-(ry-.5)**2)));R(X,i===fh-1&&!full?mix(col,'#ffffff',.5):col,x-hw,y+ry,hw*2,1)}
 if(full||aw)X.drawImage(ICO.star,x-7,y-7,14,14);if(full&&(t/200|0)%2)R(X,'#ffffff',x+8,y-12,2,2);
 txt(aw?'ÉVEILLÉ':'ÉVEIL',x,y+24,full||aw?(lu?'#d8c8ff':C.goldL):'#c9c2d6',{mini:1,al:'c',ol:C.ink})}

// --- Moments forts : remise de badge, onde de choc des légendaires, générique de fin ---
async function badgeGet(name,ic,col){ui.badge={name,ic,col,t0:now()};jingle('badge');await wait(900);for(;;){const k=await key();if(k==='a'||k==='b')break}await tween(ui.badge,'out',1,250);ui.badge=null}
function drawBadge(){const b=ui.badge,k=Math.min(1,(now()-b.t0)/600),o=1-(b.out||0);X.globalAlpha=.82*o;R(X,'#0c0a1c',0,0,W,H);X.globalAlpha=o;
 X.save();X.translate(W/2,128);X.rotate(now()/1600);for(let i=0;i<12;i++){X.rotate(Math.PI/6);X.fillStyle=i%2?'rgba(246,196,69,.16)':'rgba(255,255,255,.08)';X.beginPath();X.moveTo(0,0);X.lineTo(300,-30);X.lineTo(300,30);X.fill()}X.restore();
 const z=ev(64*(1-(1-k)**3)*(1+.06*Math.sin(now()/180)));if(z>2){pell(X,W/2,128+z/2+8,z/2,6,'rgba(0,0,0,.35)');X.drawImage(b.ic._b4??=epx(epx(b.ic)),ev(W/2-z/2),ev(128-z/2),z,z)}
 if(Math.random()<.5)R(X,C.goldL,ev(W/2+(Math.random()-.5)*160),ev(128+(Math.random()-.5)*120),2,2);
 if(k>=1){txt(b.name,W/2,212,C.gold,{s:3,al:'c',ol:C.ink,olw:2});txt('OBTENU !',W/2,238,'#ffffff',{al:'c',ol:C.ink})}X.globalAlpha=1}
function drawRing(){const k=(now()-ui.ring.t0)/900;if(k>1){ui.ring=null;return}for(let j=0;j<3;j++){const kk=k-j*.12;if(kk<0)continue;const r=kk*320;X.globalAlpha=Math.max(0,1-kk);for(let i=0;i<48;i++){const a=i/48*6.283;R(X,j?ui.ring.c:'#ffffff',ev(W/2+Math.cos(a)*r)-2,ev(H/2+Math.sin(a)*r*.7)-2,4,4)}}X.globalAlpha=1}
const CRED=()=>['PIXÉMON ÉCLIPSE','','Une aventure dans la région d\'Aurélys','','— LES GARDIENS —','Solarion, gardien du jour','Nocturion, gardien de la nuit','','— AVEC —','Prof. Saule, le chercheur repenti','Kael, le petit frère obstiné','Valen, qui voulait sauver la nuit','Sélène, fidèle jusqu\'au doute','Brasia, la roche de Cendreville','Maëlle, la gardienne du port','Lumen, l\'ermite des éclats','Lili et Mimo','Le Vieux Gus et sa canne','','— TON ÉQUIPE —',...G.party.map(m=>`${nm(m)}  Nv ${m.lv}`),'','— TON VOYAGE —',`Temps de jeu : ${fmtT(G.play)}`,`Pixédex : ${caught()} / ${DEX.length}`,`Éclats d'Aube : ${G.keys.shards||0} / 12`,'','Le jour et la nuit, enfin réunis.','','MERCI D\'AVOIR JOUÉ !'];
let CR=null;
async function credits(){CR={t0:now(),y:H+10,L:CRED()};mode='credits';musPlay('title');await fadeTo(0,600);const end=-(CR.L.length*24)-40;
 while(CR.y>end){const k=held.a?5:1;CR.y-=.6*k;await frame()}await wait(600);await fadeTo(1,800);CR=null}
function drawCredits(t){drawEnd(t);X.globalAlpha=.5;R(X,'#0c0a1c',0,0,W,H);X.globalAlpha=1;if(!CR)return;CR.L.forEach((l,i)=>{const y=ev(CR.y+i*24);if(y<-20||y>H+20)return;const h=l.startsWith('—'),big=i===0;txt(l,W/2,y,big?C.gold:h?C.goldL:'#ece6d6',{s:big?3:2,al:'c',ol:C.ink,sh:0})});txt('A : ACCÉLÉRER',W-10,H-8,'#8f87ad',{mini:1,al:'r'})}
// =====================================================================
// RENDU : TITRE, INTRO, ÉVOLUTION, FIN, VS, TRANSITIONS
// =====================================================================
const SCN=mkc(240,160,g=>{const p=(c,x,y,w=1,h=1)=>R(g,c,x,y,w,h),cols=['#211a3e','#2e2350','#43306a','#6a3c76','#9a4c74','#cf6a6a','#f09a6c'];cols.forEach((c,i)=>p(c,0,i*14,240,15));for(let i=1;i<cols.length;i++)for(let x=0;x<240;x+=2){p(cols[i-1],x,i*14);p(cols[i-1],x+1,i*14+1)}
 for(let r=30;r>16;r-=3)pell(g,176,38,r,r,mix('#9a4c74','#f6c445',(30-r)/24));pell(g,176,38,15,15,'#fff0b0');pell(g,176,38,13,13,C.ink);pell(g,174,37,11,11,'#2a2244');
 for(let x=0;x<240;x++){const y=Math.round(96-10*Math.sin(x*.03)-6*Math.sin(x*.07+1));p('#4a2e5a',x,y,1,160)}for(let y=0;y<46;y++){const hw=Math.round(12+y*1.6);p('#35213f',64-hw,60+y,hw*2,1)}p('#ff7a2a',56,59,16,2);p('#ffd23a',60,59,8,1);
 for(let x=0;x<240;x++){const y=Math.round(116-5*Math.sin(x*.05+2));p('#2c4a38',x,y,1,160)}for(let x=0;x<240;x+=9)p('#1f3a2c',x,112+(x*7)%8,5,6);p('#3e6b3a',0,132,240,28);p('#4f8a46',0,132,240,2);for(let x=0;x<240;x+=6)p('#2f5a2e',x+(x%4),136+(x*3)%14,2,3)});
const STARS=[...Array(40)].map((_,i)=>[ev((i*97)%480),ev((i*53)%150),i]);
function drawScene(t,night){X.drawImage(SCN,0,0,W,H);STARS.forEach(([x,y,i])=>{if(((t/300|0)+i)%9)R(X,i%5?'#c9c2d6':C.goldL,x,y,2,2)});X.globalCompositeOperation='lighter';X.globalAlpha=.3+.1*Math.sin(t/600);X.drawImage(GLOWY,352-48,76-48);X.drawImage(GLOW,128-48,118-48);X.globalAlpha=1;X.globalCompositeOperation='source-over';
 for(let i=0;i<4;i++){const k=(t/2400+i/4)%1;X.globalAlpha=.4*(1-k);R(X,'#c8b8c8',ev(118+i*4+k*30),ev(116-k*80),ev(6+k*14),ev(6+k*14))}X.globalAlpha=1;
 for(let i=0;i<14;i++){const k=(t/5000+i/14)%1,x=ev(((i*71+Math.sin(t/900+i)*20)%480+480)%480),y=ev(300-k*220);X.globalAlpha=Math.sin(k*Math.PI);R(X,i%3?'#ffd23a':'#ff8a3a',x,y,2,2)}X.globalAlpha=1;
 for(let x=0;x<480;x+=32)X.drawImage(TG[((t/520+x*.02)|0)%2],x,288,TS,TS);if(night){X.fillStyle='rgba(10,8,30,.35)';X.fillRect(0,0,W,H)}}
function logo(){const y=92;txt('PIXÉMON',W/2,y,C.gold,{s:6,al:'c',ol:C.ink,olw:4,drop:1});X.save();X.beginPath();X.rect(0,0,W,y-24);X.clip();txt('PIXÉMON',W/2,y,C.goldL,{s:6,al:'c',sh:0});X.restore();
 const w=tw('ÉCLIPSE',3,0,2),bx=ev(W/2-w/2-14);rr(bx,y+8,ev(w+28),40,4,C.ink);rr(bx+2,y+10,ev(w+24),36,2,C.acc);R(X,'#ff8a8a',bx+4,y+10,ev(w+20),2);R(X,'#a8303a',bx+4,y+42,ev(w+20),2);txt('ÉCLIPSE',W/2,y+40,'#ffffff',{s:3,al:'c',ls:2,sh:C.ink})}
function drawTitle(t){drawScene(t);logo();[['flamiot',-22,1],['goutelin',374,0]].forEach(([s,x,fl],i)=>{const bob=((t/380|0)+i)%2*2;X.drawImage(SHD,x+36,268,56,12);X.drawImage(fl?monOW(s,3):monSpr(s,0,128),x,150-bob,128,128)});txt('V8.0',W-10,H-8,'#c9c2d6',{mini:1,al:'r'})}
function drawIntro(t){const sl=ui.slide;if(sl===3){R(X,'#07051a',0,0,W,H);for(let i=0;i<90;i++){const tw2=((t/500|0)+i)%11;if(tw2)R(X,i%7?'#c8c2e6':'#ffe8a0',(i*97)%W,(i*53+(i%3)*7)%H,i%13?1:2,i%13?1:2)}
  const k=(Math.sin(t/1100)+1)/2,dy=Math.round(Math.sin(t/1700)*6);X.globalCompositeOperation='lighter';X.globalAlpha=.18+.12*k;X.drawImage(GLOWY,240-120,120-120+dy,240,240);X.globalCompositeOperation='source-over';
  X.globalAlpha=.55+.25*k;X.drawImage(silh(monSpr('nocturion',0,128),'#1a1238'),176,50+dy,128,128);X.globalAlpha=1;if((t/900|0)%6)for(const ex of[214,226])R(X,'#c070ff',ex,96+dy,3,2);
  X.globalAlpha=.08;R(X,'#4a2a8a',0,0,W,H);X.globalAlpha=1;return}
 if(sl===1){const gr=X.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#7cc4ec');gr.addColorStop(.62,'#c8ecf4');gr.addColorStop(.63,'#6aaa5a');gr.addColorStop(1,'#3e7a3a');X.fillStyle=gr;X.fillRect(0,0,W,H);
  X.globalCompositeOperation='lighter';X.globalAlpha=.6;X.drawImage(GLOWY,240-110,70-110,220,220);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.drawImage(monSpr('solarion',0,128),176,6+Math.round(Math.sin(t/500)*4),128,128);
  for(let i=0;i<5;i++){const x=ev(((t*.03+i*110)%560)-40);X.drawImage(monSpr(['piafou','volticelle','lumignon','larvigne','ratounet'][i],i%2,48),x,236+((t/300|0)+i)%2*2,48,48)}
  const k=(Math.sin(t/1800)+1)/2;X.globalAlpha=k*.35;R(X,'#1a1440',0,0,W,H);X.globalAlpha=1}
 else if(sl===2){drawScene(t,1);X.globalAlpha=.55;R(X,'#1a0a24',0,0,W,H);X.globalAlpha=1;const x=W/2-64,y=110;X.drawImage(silh(trSpr('vex',1),'#0c0812'),x+16,y-16);if((t/700|0)%5)for(const ex of[76,89])R(X,'#e84aff',x+ex,y+17,5,3);
  for(let i=0;i<10;i++){const a=t/900+i*.63;R(X,'#9a5ad0',ev(W/2+Math.cos(a)*150),ev(150+Math.sin(a*1.3)*70),2,2)}}
 else{drawScene(t,1);X.drawImage(SHD2,W/2-12,206,24,8);X.drawImage(trSpr('prof',1),W/2-64,84);if(sl===0)['flamiot','goutelin','pousseron'].forEach((sp,i)=>{const x=W/2-150+i*110+(i>0?60:0),b=((t/380|0)+i)%2*2;X.drawImage(SHD,x+10,214,40,12);X.drawImage(monSpr(sp,0,64),x-4,156-b,64,64)})}}
function drawEvo(){const e=ui.evo;R(X,'#120e24',0,0,W,H);if(!e)return;const t=now(),k=e.t0?Math.min(1.2,(t-e.t0)/3400):0;X.save();X.translate(240,130);X.rotate(t/3000);for(let i=0;i<12;i++){X.rotate(Math.PI/6);X.fillStyle=i%2?'rgba(133,115,192,.18)':'rgba(246,196,69,.12)';X.beginPath();X.moveTo(0,0);X.lineTo(400,-60);X.lineTo(400,60);X.fill()}X.restore();
 pell(X,240,202,100,14,'#2a2244');let id=e.a,sil=false;if(e.t0){const fl=k>.12&&k<1&&Math.floor(t/Math.max(40,280*(1-k)))%2;id=k>=1||fl?e.b:e.a;sil=k>.08&&k<1}const img=monSpr(id,0,128,e.sh);X.drawImage(sil?silh(img,'#ffffff'):img,176,76,128,128);
 if(e.t0&&k<1&&Math.random()<.4){const a=Math.random()*6.28;e.fx.push({x:240+Math.cos(a)*160,y:140+Math.sin(a)*110,l:40})}e.fx=e.fx.filter(p=>{p.x+=(240-p.x)*.06;p.y+=(140-p.y)*.06;p.l--;R(X,C.goldL,ev(p.x),ev(p.y),4,4);return p.l>0})}
function drawEnd(t){drawScene(t,1);X.globalCompositeOperation='lighter';X.globalAlpha=.5;X.drawImage(GLOWY,240-96,90-96,192,192);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.drawImage(monSpr('solarion',0,128),112,16-(t/450|0)%2*2,128,128);X.drawImage(monSpr('nocturion',0,128),240,16-((t/450|0)+1)%2*2,128,128);G.party.forEach((m,i)=>X.drawImage(monSpr(m.sp,0,48),ev(240-G.party.length*26+i*52),160,48,48))}
function drawVs(){const v=ui.vs,k=Math.min(1,(now()-v.t0)/420),e=1-(1-k)**3,o=ev((1-e)*-600);for(let y=0;y<H;y+=4)R(X,(y/4)%2?'#241d3e':C.ink,0,y,W,4);
 X.save();X.translate(0,160);X.rotate(-.18);R(X,C.frame,-40+o,-56,W+80,112);R(X,C.frameL,-40+o,-56,W+80,4);R(X,C.frameD,-40+o,52,W+80,4);X.restore();
 const tx=ev(270+(1-e)*300);X.drawImage(silh(trSpr(v.tr.look,1),C.ink),tx+22,52);X.drawImage(trSpr(v.tr.look,1),tx+16,46);
 txt('VS',ev(110-(1-e)*200),150,C.gold,{s:7,al:'c',ol:C.ink,olw:4,drop:1});txt(v.tr.name.toUpperCase(),ev(130-(1-e)*300),214,'#ffffff',{al:'c',ol:C.ink});if(Math.random()<.5)R(X,C.goldL,ev(Math.random()*W),ev(Math.random()*H),2,2)}
function drawToast(){if(!ui.toast||mode==='title')return;const k=(now()-ui.toast.t0)/1400;if(k>1){ui.toast=null;return}X.globalAlpha=k>.75?(1-k)*4:1;const x=W-112,y=H-30;rr(x,y,104,22,2,C.ink);X.drawImage(ICO.save,x+6,y+3,16,16);txt('SAUVEGARDE',x+28,y+16,'#ffffff',{mini:1});X.globalAlpha=1}
const SPIR=(()=>{const o=[],cw=15,ch=10;let x0=0,y0=0,x1=cw-1,y1=ch-1;while(x0<=x1&&y0<=y1){for(let x=x0;x<=x1;x++)o.push([x,y0]);for(let y=y0+1;y<=y1;y++)o.push([x1,y]);if(y0<y1)for(let x=x1-1;x>=x0;x--)o.push([x,y1]);if(x0<x1)for(let y=y1-1;y>y0;y--)o.push([x0,y]);x0++;y0++;x1--;y1--}return o})();
function drawWipe(){if(ui.wipe<=0)return;const p=ui.wipe,st2=ui.wst||'bars';
 if(st2==='spiral'){const n=Math.ceil(SPIR.length*p);for(let i=0;i<n;i++){const[x,y]=SPIR[i];R(X,i%7?C.ink:C.frame,x*32,y*32,32,32)}return}
 if(st2==='iris'){const r=(1-p)*300;for(let y=0;y<H;y+=4){const dy=y+2-H/2,h=r*r-dy*dy;if(h<=0){R(X,C.ink,0,y,W,4);continue}const hw=Math.sqrt(h);R(X,C.ink,0,y,ev(W/2-hw),4);R(X,C.ink,ev(W/2+hw),y,W,4)}return}
 if(st2==='wave'){for(let x=0;x<W;x+=8){const h=ev(H*Math.min(1,p*1.4-Math.sin(x/40)*.12));R(X,C.ink,x,0,8,h);if(h>4)R(X,'#4a8ad8',x,h-4,8,4)}return}
 for(let i=0;i<10;i++){const w=ev(W*p),y=i*32;R(X,C.ink,i%2?W-w:0,y,w,32);if(w>4)R(X,C.frame,i%2?W-w:w-4,y,4,32)}}
function draw(t){X.imageSmoothingEnabled=false;
 if(mode==='credits')drawCredits(t);else if(mode==='title')drawTitle(t);else if(mode==='world'){if(ui.wz>1.001){X.save();X.translate(ui.wzx,ui.wzy);X.scale(ui.wz,ui.wz);X.translate(-ui.wzx,-ui.wzy);drawWorld(t);X.restore()}else drawWorld(t)}else if(mode==='battle'&&B)drawBattle(t);else if(mode==='evo')drawEvo();else if(mode==='intro')drawIntro(t);else if(mode==='end')drawEnd(t);else R(X,'#000000',0,0,W,H);
 if(ui.lb>0){const h=ev(30*ui.lb);R(X,'#000000',0,0,W,h);R(X,'#000000',0,H-h,W,h)}
 if(ui.ring)drawRing();if(mode==='world')drawChecklist();if(ui.tip&&mode==='world'&&!ui.text&&!ui.menus.length&&!ui.panel)drawTip();drawDim();ui.panel?.();if(ui.badge)drawBadge();drawText();ui.menus.forEach(drawMenu);drawToast();if(ui.vs)drawVs();
 if(ui.flash>0){X.globalAlpha=ui.flash;R(X,ui.flashC,0,0,W,H);X.globalAlpha=1;ui.flash=Math.max(0,ui.flash-.05)}drawWipe();
 if(ui.fade>0){X.globalAlpha=Math.round(ui.fade*5)/5;R(X,'#000000',0,0,W,H);X.globalAlpha=1}}
let last=0;function loop(t){const dt=Math.min(50,t-last);last=t;if(ui.text&&ui.text.t<1e8){const o=ui.text.t|0;ui.text.t+=dt*(G?.opt?.txt===2?.11:.055);if(ui.text.who&&(ui.text.t|0)>o&&(ui.text.t|0)%3===0&&(ui.text.t|0)<ui.text.s.join(' ').length)sfx('blip')}if(mode==='world')updWorld(dt);draw(t);requestAnimationFrame(loop)}

// =====================================================================
// TITRE
// =====================================================================
const INTRO=['Bienvenue dans la région d\'Aurélys ! Ici vivent d\'étranges créatures : les Pixémons. Moi, je suis le Prof. Saule.','Aurélys vit au rythme du Cycle. Le jour, Solarion veille sur nous. La nuit, d\'autres créatures s\'éveillent… même si nos nuits sont bien courtes.','Mais une ombre plane : la Team Éclipse rôde, et veut s\'emparer de la lumière de Solarion.','Ton aventure commence aujourd\'hui, à Bourg-Lueur. Viens me voir au labo !'];
function svInfo(sv,x,y,w){const F=sv.flags,nb=(F.badge?1:0)+(F.badge2?1:0)+(F.badge4?1:0)+(F.badge3?1:0);txt(MAPS[sv.map]?.name.split(' · ')[0]||'',x+16,y+28);txt(fmtT(sv.play||0),x+w-16,y+28,C.ink2,{al:'r'});[ICO.bRoc,ICO.bMir,ICO.bVol,ICO.bCre].forEach((ic,j)=>X.drawImage(j<nb?ic:silh(ic,'#b0a8c0'),x+16+j*20,y+34,14,14));X.drawImage(ICO.dex,x+80,y+34,14,14);txt(DEX.filter(k=>sv.dex?.[k]===2).length,x+98,y+46,C.ink,{mini:1});X.drawImage(ICO.shard,x+128,y+34,14,14);txt(sv.keys?.shards||0,x+146,y+46,C.ink,{mini:1});sv.party.slice(0,6).forEach((m,j)=>X.drawImage(monSpr(m.sp,0,48),x+w-140+j*22,y+28,24,24))}
async function slotPick(title){return choose([1,2,3].map(s=>`PARTIE ${s}${load(s)?'':' · VIDE'}`),{x:W/2-120,y:210,w:240,rh:22,title,ib:[W/2-160,148,320,58],infoShow:()=>true,infoDraw:(i,x,y,w)=>{const sv=load(i+1);if(sv)svInfo(sv,x,y,w);else txt('Emplacement libre',x+w/2,y+36,C.mute,{al:'c'})}})}
async function titleScreen(){mode='title';B=null;move=null;ui.menus=[];ui.text=null;ui.panel=null;ui.dim=null;G=null;musPlay('title');await fadeTo(0,400);
 for(;;){const sv=load(),any=[1,2,3].some(s=>load(s)),opts=[...(sv?['CONTINUER']:[]),...(any?['CHARGER']:[]),'NOUVELLE PARTIE','NOUVEAUTÉS'],i=await choose(opts,{x:W/2-120,y:300-opts.length*22,w:240,rh:22,cancel:false,ib:[W/2-160,148,320,58],infoShow:i=>opts[i]==='CONTINUER',infoDraw:sv?(i,x,y,w)=>{if(opts[i]==='CONTINUER')svInfo(sv,x,y,w)}:null});
  const o=opts[i];if(o==='NOUVEAUTÉS'){await whatsNew();continue}
  let g0=null;if(o==='CONTINUER')g0=sv;else if(o==='CHARGER'){const s=await slotPick('Charger une partie');if(s<0)continue;g0=load(s+1);if(!g0){if(!await ask('Cet emplacement est vide. Commencer une nouvelle partie ici ?'))continue;SLOT=s+1;G=newGame();await fadeTo(1,400);await dreamIntro();return}SLOT=s+1}
  if(g0){G=g0;await fadeTo(1,300);mode='world';ui.banner=null;loadMap(G.map,G.x,G.y,G.dir);await fadeTo(0,300);
   if(G.wn){delete G.wn;await whatsNew()}if(G.brRetro){delete G.brRetro;tip('bracelet','Nouveau : Brasia t\'a fait parvenir le BRACELET DU CYCLE ! En combat, remplis sa jauge, puis choisis ÉVEIL DU CYCLE parmi tes attaques.')}return}
  const s=any?await slotPick('Nouvelle partie'):0;if(s<0)continue;if(load(s+1)&&!await ask(`L'emplacement ${s+1} contient une partie. Elle sera effacée. Continuer ?`))continue;
  SLOT=s+1;G=newGame();await fadeTo(1,400);await dreamIntro();return}}
Promise.all([PIXREADY,ARTREADY]).then(()=>{requestAnimationFrame(loop);run(titleScreen)});
