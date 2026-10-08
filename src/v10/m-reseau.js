// =====================================================================
// EXTENSION 15.0 — En ligne entre amis : salons à code, relais publics gratuits (MQTT sur WebSocket sécurisé, sans compte),
// présence et déplacements des amis sur la carte, messages rapides, émotes, invitations.
// Les messages importants (invitations, échanges, combats) attendent un accusé de réception et sont renvoyés sinon.
// =====================================================================
const NETV=1,NETP='pixemon-eclipse/v1/',NETAB='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
// Plusieurs relais en parallèle : chaque message part sur tous ceux qui répondent, les doublons sont ignorés à l'arrivée.
const NETRL=(typeof NET_RELAYS!=='undefined'&&Array.isArray(NET_RELAYS))?NET_RELAYS:[{u:'wss://broker.emqx.io:8084/mqtt'},{u:'wss://broker.hivemq.com:8884/mqtt'},{u:'wss://mqtt.eclipseprojects.io/mqtt'},{u:'wss://public.cloud.shiftr.io',l:'public',w:'public'},{u:'wss://test.mosquitto.org:8081/mqtt'}];
const netTopic=c=>{let a=2166136261,b=5381;for(const ch of 'pxe15:'+c){const k=ch.charCodeAt(0);a=Math.imul(a^k,16777619)>>>0;b=(Math.imul(b,33)^k)>>>0}return NETP+a.toString(16).padStart(8,'0')+b.toString(16).padStart(8,'0')};
const NETDV=()=>DEX.length+'.'+Object.keys(MV).length+'.'+Object.keys(IT).length+'.'+Object.keys(BQ).length;
const NOGHOST=new Set(['songe','chambre','salon']),netRoom=()=>typeof advCode==='function'&&advCode()?'l\'aventure':'le salon';
const LOOKS=['hero','girl','kid','girlkid','scout','camper','botanist','climber','caver','sailor','fisher','astro','assistant','mountaineer'];
const QCHAT=['Salut !','Ça va ?','On fait un combat ?','On échange ?','Viens par ici !','Attends-moi !','J\'arrive !','Bien joué !','Merci !','Trop fort !','Oups !','Regarde !','Je reviens vite.','À plus !'];
const QEMO=['!','?','♥','♪','…'];
const NG=()=>(G.net??={});
const netName=s=>String(s??'').normalize('NFC').replace(/[^A-Za-z0-9 \-éèêëàâäîïôöûüùçÉÈÊÀÂÎÔÛÇ]/g,'').replace(/\s+/g,' ').trim().slice(0,10);
const U8E=new TextEncoder(),U8D=new TextDecoder();
const u8cat=(...a)=>{let n=0;for(const x of a)n+=x.length;const o=new Uint8Array(n);let i=0;for(const x of a){o.set(x,i);i+=x.length}return o};
const mqS=s=>{const b=typeof s==='string'?U8E.encode(s):s;return u8cat([b.length>>8&255,b.length&255],b)};
function mqP(h,body){const L=[];let n=body.length;do{let d=n&127;n>>>=7;if(n)d|=128;L.push(d)}while(n);return u8cat([h],L,body)}

// --- Un relais MQTT 3.1.1 (QoS 0) : connexion, abonnement au salon, publication, ping, reconnexion progressive
class Relay{constructor(c){this.c=c;this.ws=null;this.up=false;this.buf=new Uint8Array(0);this.fail=0;this.next=0;this.rx=0;this.pk=1;this.at=0}
 open(){this.close();this.at=this.rx=Date.now();let ws;try{ws=new WebSocket(this.c.u,['mqtt'])}catch(e){this.down();return}this.ws=ws;ws.binaryType='arraybuffer';
  ws.onopen=()=>{if(ws!==this.ws)return;const c=this.c,fl=0x06|(c.l?0x80:0)|(c.w?0x40:0),cid='pxe'+NET.pid+Math.random().toString(36).slice(2,6);
   this.send(mqP(0x10,u8cat(mqS('MQTT'),[4,fl,0,40],mqS(cid),mqS(NET.topic),mqS(NET.will()),c.l?mqS(c.l):[],c.w?mqS(c.w):[])))};
  ws.onmessage=e=>{if(ws!==this.ws||!(e.data instanceof ArrayBuffer))return;this.rx=Date.now();const d=new Uint8Array(e.data);this.buf=this.buf.length?u8cat(this.buf,d):d;if(this.buf.length>200000){this.close();this.down();return}this.parse()};
  ws.onclose=ws.onerror=()=>{if(ws!==this.ws)return;this.ws=null;this.down()}}
 parse(){for(;;){const b=this.buf;if(b.length<2)return;let n=0,m=1,i=1,c;do{if(i>=b.length)return;c=b[i++];n+=(c&127)*m;m*=128}while(c&128&&i<5);if(b.length<i+n)return;
  const h=b[0],p=b.subarray(i,i+n);this.buf=b.slice(i+n);try{this.pkt(h,p)}catch(e){console.error(e)}}}
 pkt(h,p){const t=h>>4;
  if(t===2){if(p[1]===0){this.up=true;this.fail=0;this.send(mqP(0x82,u8cat([0,this.pk++&255],mqS(NET.topic),[0])));NET.relayUp(this)}else{this.close();this.down()}}
  else if(t===3&&p.length>=2){const q=h>>1&3,tl=p[0]<<8|p[1];let o=2+tl+(q?2:0);if(o>p.length)return;let s;try{s=U8D.decode(p.subarray(o))}catch(e){return}NET.recv(s)}}
 send(u){try{if(this.ws&&this.ws.readyState===1){this.ws.send(u);return true}}catch(e){}return false}
 pub(s){return this.up&&this.send(mqP(0x30,u8cat(mqS(NET.topic),U8E.encode(s))))}
 close(bye){const ws=this.ws;this.ws=null;this.up=false;this.buf=new Uint8Array(0);if(!ws)return;ws.onopen=ws.onmessage=ws.onclose=ws.onerror=null;try{if(bye&&ws.readyState===1)ws.send(new Uint8Array([0xE0,0]))}catch(e){}try{ws.close()}catch(e){}}
 down(){const was=this.up;this.up=false;this.fail++;this.next=Date.now()+Math.min(30000,1500*2**Math.min(5,this.fail-1));if(was)NET.relayDown(this)}
 tick(t){if(!this.ws){if(t>=this.next)this.open();return}if(!this.up){if(t-this.at>12000){this.close();this.down()}return}
  if(t-this.rx>50000||this.chk&&t-this.chk>6000&&this.rx<this.chk){this.chk=0;this.close();this.down();return}if(this.chk&&this.rx>=this.chk)this.chk=0;if(t-(this.pg||0)>15000){this.pg=t;this.send(new Uint8Array([0xC0,0]))}}}

// --- Le salon : identité de session, pairs, messages (simples ou fiables), file d'invitations, journal
const NET={dbg:[],on:false,code:'',topic:'',pid:'',seq:0,R:[],peers:new Map(),seen:new Map(),pend:new Map(),H:{},log:[],toasts:[],inv:null,act:null,path:[],lk:'',lm:'',lf:0,lhi:0,lwho:0,ever:0,
 will(){return JSON.stringify({v:NETV,f:this.pid,s:0,k:'bye'})},
 up(){return this.R.some(r=>r.up)},
 join(code){this.leave(true);this.code=code;this.topic=netTopic(code);this.pid=Array.from({length:8},()=>'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random()*36|0]).join('');this.seq=0;this.peers.clear();this.seen.clear();this.pend.clear();
  this.log=[];this.inv=null;this.act=null;this.on=true;this.ever=0;this.lk='';this.path=[];this.R=NETRL.map(c=>new Relay(c));this.R.forEach(r=>r.open());NG().room=code;this.note(`${G?.coop?.code===code?'Aventure':'Salon'} ${code} : connexion…`)},
 leave(quiet){if(!this.on)return;try{this.out(JSON.stringify({v:NETV,f:this.pid,s:++this.seq,k:'bye'}))}catch(e){}const R=this.R;setTimeout(()=>R.forEach(r=>r.close(1)),150);
  for(const p of this.pend.values())p.ko?.();this.pend.clear();for(const P of this.peers.values())ghostDel(P);this.peers.clear();this.R=[];this.on=false;this.code='';this.inv=null;this.act=null;if(!quiet)this.note('Tu as quitté le salon.')},
 relayUp(r){this.ever=1;this.hi(1);this.send('who')},
 relayDown(r){},
 out(s){let n=0;for(const r of this.R)if(r.pub(s))n++;return n},
 send(k,o={},to,rel){if(!this.on)return rel?Promise.resolve(false):0;
  // Messages rapides et émotes : un exemplaire par ami, avec accusé de réception, pour qu'ils ne se perdent pas en route
  if((k==='ch'||k==='em')&&!to&&!rel&&this.peers.size){for(const P of this.peers.values())this.send(k,o,P.pid,5);return 0}
  const m={...o,v:NETV,f:this.pid,s:++this.seq,k};delete m.to;delete m.r;if(to)m.to=to;if(rel)m.r=1;const s=JSON.stringify(m);this.out(s);if(k!=='p'&&k!=='hi')this.trace('>',k,m.s,to);
  if(rel)return new Promise(res=>this.pend.set(m.s,{s,to,t:Date.now(),t0:Date.now(),max:(rel>1?rel:30)*1000,ok:()=>res(true),ko:()=>res(false)}));return m.s},
 ack(m){this.out(JSON.stringify({v:NETV,f:this.pid,s:++this.seq,k:'ack',a:m.s,to:m.f}))},
 recv(s){if(!this.on||s.length>60000)return;let m;try{m=JSON.parse(s)}catch(e){return}
  if(!m||typeof m!=='object'||m.v!==NETV||typeof m.f!=='string'||!/^[a-z0-9]{8}$/.test(m.f)||m.f===this.pid||typeof m.k!=='string'||!Number.isInteger(m.s)||m.s<0)return;
  if(m.to!=null&&m.to!==this.pid)return;const key=m.f+':'+m.s;if(this.seen.has(key)){if(m.r)this.ack(m);return}this.seen.set(key,Date.now());if(m.r)this.ack(m);
  if(m.k==='ack'){const p=this.pend.get(m.a);if(p&&p.to===m.f){this.pend.delete(m.a);p.ok()}return}
  if(m.k==='bye'){const P=this.peers.get(m.f);if(!P)return;
   // « bye » de dernière volonté (s=0) : un seul relais a perdu ce joueur ; s'il parle encore par un autre relais, il reste
   if(m.s===0&&this.R.filter(r=>r.up).length>1){this.seen.delete(key);P.bye=Date.now();this.trace('bye?',P.name)}else this.drop(P,'a quitté le salon.');return}
  let P=this.peers.get(m.f);if(!P){if(m.k!=='hi'){if(m.k!=='p'&&Date.now()-(this.lwhoS||0)>2000){this.lwhoS=Date.now();this.send('who')}return}if(this.peers.size>=8)return;P={pid:m.f,name:'Ami',look:'hero',map:'',x:0,y:0,d:0,q:[],t:0,ps:-1,b:0,dv:'',bz:0};this.peers.set(m.f,P);P.nw=1}
  P.t=Date.now();if(m.k!=='p'&&m.k!=='hi')this.trace('<',m.k,m.s,P.name);try{if(Object.prototype.hasOwnProperty.call(this.H,m.k))this.H[m.k](m,P)}catch(e){console.error(e)}},
 trace(...a){this.dbg.push(a.join(' '));if(this.dbg.length>80)this.dbg.shift()},
 hi(force){const t=Date.now();if(!G||!force&&t-this.lhi<5000)return;this.lhi=t;const F=f(),pos={m:G.map,x:G.x,y:G.y,d:G.dir};
  this.send('hi',{n:NG().n||'Dresseur',lk:NG().lk||'hero',...pos,b:['badge','badge2','badge3','badge4','badge5'].filter(k=>F[k]).length,ld:G.party[0]?.sp||'',dv:NETDV(),bz:this.act||mode==='battle'?1:0})},
 drop(P,why){this.trace('drop',P.name,why);ghostDel(P);this.peers.delete(P.pid);if(why)this.note(`${P.name} ${why}`);this.H.gone?.(P)},
 note(s,ic){this.toasts.push({s,ic,t0:Date.now()});if(this.toasts.length>4)this.toasts.shift();this.log.push(s);if(this.log.length>30)this.log.shift()},
 tick(){if(!this.on)return;if(!G){this.leave(true);return}const t=Date.now();for(const r of this.R)r.tick(t);
  for(const[k,p]of this.pend)if(t-p.t>1200){if(t-p.t0>p.max){this.pend.delete(k);p.ko()}else{p.t=t;this.out(p.s)}}
  if(this.seen.size>3000||t-(this.lsp||0)>20000){this.lsp=t;for(const[k,v]of this.seen)if(t-v>120000)this.seen.delete(k)}
  for(const P of[...this.peers.values()])if(t-P.t>(this.act&&this.act.with===P.pid?60000:18000))this.drop(P,'a perdu la connexion.');else if(P.bye&&P.t<=P.bye&&t-P.bye>8000)this.drop(P,'a quitté le salon.');
  if(!this.up())return;this.hi();
  if(G&&mode==='world'){const k=G.map+','+G.x+','+G.y+','+G.dir;if(k!==this.lk){this.lk=k;if(G.map!==this.lm){this.lm=G.map;this.path=[];this.send('p',{m:G.map,p:[[G.x,G.y,G.dir]],j:1});this.lf=t}else this.path.push([G.x,G.y,G.dir])}}
  if(this.path.length&&t-this.lf>180){this.lf=t;this.send('p',{m:G.map,p:this.path.slice(-10),rn:running()?1:0});this.path=[]}}};
setInterval(()=>{try{NET.tick();if(NET.on)ghostTick()}catch(e){console.error(e)}},50);
addEventListener('visibilitychange',()=>{if(document.visibilityState!=='visible'||!NET.on)return;const t=Date.now();for(const r of NET.R)if(!r.up){r.close();r.next=0}else{r.chk=t;r.pg=0}NET.hi(1)});
addEventListener('pagehide',()=>{if(NET.on)NET.leave(true)});

// --- Messages de présence
const okMap=m=>typeof m==='string'&&!!MAPS[m];
const okXY=(m,x,y)=>Number.isInteger(x)&&Number.isInteger(y)&&y>=0&&x>=0&&y<MAPS[m].rows.length&&x<MAPS[m].rows[0].length;
NET.H.who=()=>{if(Date.now()-(NET.lwho||0)>800){NET.lwho=Date.now();NET.hi(1)}};
NET.H.hi=(m,P)=>{const n=netName(m.n)||'Ami',nw=P.nw;P.nw=0;P.name=n;P.look=LOOKS.includes(m.lk)?m.lk:'hero';P.b=Math.max(0,Math.min(5,m.b|0));P.ld=SP[m.ld]?m.ld:'';P.dv=String(m.dv||'').slice(0,40);P.bz=m.bz?1:0;
 if(m.s>P.ps&&okMap(m.m)&&okXY(m.m,m.x,m.y)){P.ps=m.s;const d=m.d&3;if(P.map!==m.m){P.map=m.m;P.x=m.x;P.y=m.y;P.d=d;P.q=[];P.snap=1}else P.q.push([m.x,m.y,d])}
 if(nw){NET.note(`${n} a rejoint ${netRoom()} !`);sfx('ok');NET.hi(1)}if(P.g){P.g.t=P.look}};
NET.H.p=(m,P)=>{if(m.s<P.ps||!okMap(m.m)||!Array.isArray(m.p))return;P.ps=m.s;const L=m.p.slice(-12).filter(e=>Array.isArray(e)&&okXY(m.m,e[0],e[1]));if(!L.length)return;
 if(P.map!==m.m||m.j){P.map=m.m;const[x,y,d]=L[L.length-1];P.x=x;P.y=y;P.d=d&3;P.q=[];P.snap=1;return}P.run=!!m.rn;for(const[x,y,d]of L)P.q.push([x,y,d&3]);if(P.q.length>24)P.q.splice(0,P.q.length-24)};
NET.H.ch=(m,P)=>{const i=m.c|0;if(i<0||i>=QCHAT.length)return;P.say={s:QCHAT[i],t0:now()};NET.note(`${P.name} : ${QCHAT[i]}`);sfx('sel')};
NET.H.em=(m,P)=>{const k=QEMO[m.e|0];if(!k)return;if(P.g&&P.g.mp===G?.map){const e={n:P.g,k,t0:now()};ui.emo.push(e);setTimeout(()=>{const i=ui.emo.indexOf(e);if(i>=0)ui.emo.splice(i,1)},1500)}else NET.note(`${P.name} : ${k}`)};

// --- Les amis apparaissent sur la carte (ils ne bloquent pas le passage ; A devant eux ouvre le menu d'ami)
function ghostDel(P){const g=P.g;if(!g)return;const L=MAPS[g.mp]?.npcs;if(L){const i=L.indexOf(g);if(i>=0)L.splice(i,1)}P.g=null}
function ghostTick(){if(!G||!MAPS[G.map])return;const here=G.map,T=now();
 for(const P of NET.peers.values()){const show=P.map===here&&!NOGHOST.has(here)&&okXY(here,P.x,P.y);
  if(!show){ghostDel(P);continue}
  let g=P.g;if(g&&g.mp!==here){ghostDel(P);g=null}
  if(!g){g=P.g={net:P.pid,t:P.look,x:P.x,y:P.y,d:P.d,ox:0,oy:0,fix:1,mp:here,mv:null,fn:()=>friendMenu(P.pid)};MAPS[here].npcs.push(g);P.snap=0}
  if(P.snap){P.snap=0;g.mv=null;g.x=P.x;g.y=P.y;g.d=P.d;g.ox=g.oy=0}
  if(g.mv){const k=Math.min(1,(T-g.mv.t0)/g.mv.ms);g.ox=(g.mv.tx-g.mv.fx)*TS*k;g.oy=(g.mv.ty-g.mv.fy)*TS*k;if(k>=1){g.x=g.mv.tx;g.y=g.mv.ty;g.ox=g.oy=0;g.mv=null}}
  while(!g.mv&&P.q.length){const[x,y,d]=P.q.shift();P.x=x;P.y=y;P.d=d;const dx=x-g.x,dy=y-g.y;if(!dx&&!dy){g.d=d;continue}
   if(Math.abs(dx)+Math.abs(dy)===1){g.d=dx>0?3:dx<0?2:dy>0?0:1;g.mv={fx:g.x,fy:g.y,tx:x,ty:y,t0:T,ms:P.q.length>4?70:P.run?95:170}}else{g.x=x;g.y=y;g.d=d;g.ox=g.oy=0}}
  if(!g.mv&&!P.q.length)g.d=P.d}}
{const lm15=loadMap;loadMap=function(...a){for(const P of NET.peers.values())ghostDel(P);return lm15.apply(this,a)}}
{const tm15=tryMove;tryMove=function(d){const gs=[];for(const P of NET.peers.values())if(P.g){P.g.hid=1;gs.push(P.g)}try{return tm15(d)}finally{for(const g of gs)g.hid=0}}}
{const ts15=titleScreen;titleScreen=async function(){if(NET.on)NET.leave(true);return ts15()}}

// --- Affichage : noms au-dessus des amis, bulles de messages, voyant de connexion, notifications
{const dw15=drawWorld;drawWorld=function(t){dw15(t);if(!NET.on||!CAM)return;
 for(const P of NET.peers.values()){const g=P.g;if(!g||g.mp!==G.map)continue;const sx=ev(g.x*TS+g.ox-CAM[0])+16,sy=ev(g.y*TS+g.oy-CAM[1]);if(sx<-60||sx>W+60||sy<-60||sy>H+60)continue;
  const nw=tw(P.name,1)+8;rr(sx-nw/2,sy-50,nw,12,2,'rgba(20,14,40,.72)');txt(P.name,sx,sy-40,'#ffffff',{s:1,al:'c',sh:0});
  if(P.say){const k=now()-P.say.t0;if(k>4200)P.say=null;else{const w=tw(P.say.s,1)+14,x=Math.max(4,Math.min(W-w-4,sx-w/2)),y=sy-74;X.globalAlpha=k>3800?(4200-k)/400:1;rr(x,y,w,20,3,C.ink);rr(x+1,y+1,w-2,18,2,C.paper);R(X,C.ink,sx-2,y+19,4,3);txt(P.say.s,x+7,y+14,C.ink,{s:1,sh:0});X.globalAlpha=1}}}}}
function drawNet(){if(!NET.on||!G)return;const t=Date.now();
 if(mode==='world'&&!ui.text&&!ui.menus.length&&!ui.panel){const up=NET.up(),n=NET.peers.size,s=up?`EN LIGNE ${NET.code} - ${n+1}`:`CONNEXION ${NET.code}...`,w=tw(s,2,1)+26,x=6,y=H-22;
  rr(x,y,w,16,2,'rgba(20,14,40,.75)');pell(X,x+9,y+8,3,3,up?'#4cc46a':(t/400|0)%2?'#f6c445':'#8a80a6');txt(s,x+17,y+11,'#ffffff',{mini:1})}
 NET.toasts=NET.toasts.filter(o=>t-o.t0<4200);if(mode!=='world')return;
 NET.toasts.slice(-2).forEach((o,i)=>{const k=t-o.t0,a=k<200?k/200:k>3800?(4200-k)/400:1,w=Math.min(W-20,tw(o.s,1)+24),x=ev(W/2-w/2),y=58+i*22;X.globalAlpha=Math.max(0,a);rr(x,y,w,18,3,C.ink);rr(x+2,y+2,w-4,14,2,C.frameD);txt(o.s,W/2,y+13,'#ffffff',{s:1,al:'c',sh:0});X.globalAlpha=1})}
{const dr15=draw;draw=function(t){dr15(t);try{drawNet()}catch(e){}}}
