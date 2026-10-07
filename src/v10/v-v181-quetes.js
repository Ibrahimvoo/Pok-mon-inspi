// =====================================================================
// 18.1 — ANNONCE DES QUÊTES : « NOUVELLE QUÊTE ! », « QUÊTE TERMINÉE ! » et « NOUVEL OBJECTIF » s'affichent dès qu'une
// quête du journal apparaît, se termine, ou que l'objectif de l'histoire change. Dans une aventure à plusieurs, une quête
// reçue en parlant à quelqu'un est donnée à tous les joueurs (drapeaux de la quête et objets remis au départ).
// =====================================================================
const QTX=new Set(['Objectif','Pixédex','Rumeur du jour','Nuit d\'étoiles filantes','En ligne','Combats en groupe','Expéditions','Ta chambre','Salle de jeux de Volterre','Échanges']);
const QT={q:[],cur:null,from:null,fromT:0};
function qtNow(){let Q;try{Q=quests()}catch(e){return null}const o={};for(const q of Q||[])if(Array.isArray(q)&&typeof q[0]==='string'&&!QTX.has(q[0]))o[q[0]]=[q[1]|0,String(q[2]||'')];return o}
const qtIdle=()=>G&&mode==='world'&&!busy&&!ui.text&&!ui.menus.length&&!ui.panel&&!ui.tip&&!CN&&!SCX;
function qtCheck(){if(!G?.flags||!f().starter||G.qk&&!qtIdle())return;const N=qtNow();if(!N)return;let g='';try{g=goal()}catch(e){}
 if(!G.qk){G.qk={};for(const[k,v]of Object.entries(N))G.qk[k]=v[0];G.qg=g;return}
 const from=Date.now()-QT.fromT<20000?QT.from:null,descs=[];
 for(const[k,[s,d]]of Object.entries(N)){const o=G.qk[k];if(o==null&&s){QT.q.push({k:s===2?'done':'new',t:k,d,from});descs.push(d)}else if(o===1&&s===2)QT.q.push({k:'done',t:k,d});G.qk[k]=s}
 if(g!==G.qg){if(G.qg!=null&&g&&!descs.includes(g)&&!/^Tu as tout/.test(g))QT.q.push({k:'goal',t:'Objectif',d:g});G.qg=g}
 if(descs.length)QT.from=null}
setInterval(()=>{try{qtCheck()}catch(e){}},300);
// Bannière : glisse du haut de l'écran, reste quelques secondes, puis la suivante
const QTS={new:['NOUVELLE QUÊTE !','#ffd23a','#5a3a08'],done:['QUÊTE TERMINÉE !','#7ae07a','#1a4a20'],goal:['NOUVEL OBJECTIF','#8ad0ff','#16345a']};
function qtDraw(){if(mode!=='world'||!G)return;const T=now();
 if(!QT.cur&&QT.q.length&&qtIdle()){QT.cur={...QT.q.shift(),t0:T};sfx(QT.cur.k==='done'?'lv':QT.cur.k==='new'?'shard':'ok')}
 const c=QT.cur;if(!c)return;if(!qtIdle()){c.t0+=T-(c.last||T);c.last=T;return}c.last=T;if(QT.hold)c.t0=T-1000;const k=T-c.t0,D=c.k==='goal'?4200:5200;if(k>D){QT.cur=null;return}
 const[hd,col,dk]=QTS[c.k],w=392,x=(W-w)/2,L=wrap(c.d,w-30,1).slice(0,3),h=(c.k==='goal'?28:48)+L.length*11+(c.from?11:0),y=Math.round(Math.min(26,-h+k/2,26+(D-400-k)/2));if(y<-h)return;
 X.globalAlpha=.96;rr(x+3,y+3,w,h,4,'rgba(8,6,20,.45)');rr(x,y,w,h,4,C.ink);rr(x+2,y+2,w-4,h-4,3,'#231c3e');X.globalAlpha=1;R(X,col,x+2,y+2,w-4,16);
 X.drawImage(c.k==='goal'?ICO.flag:ICO.book||ICO.star,x+8,y+3,14,14);txt(hd,x+28,y+13,dk,{s:1,sh:0});
 if((T/300|0)%2&&c.k!=='goal'){R(X,'#ffffff',x+w-18,y+6,2,2);R(X,'#ffffff',x+w-26,y+11,2,2)}
 let yy=y+22;if(c.k!=='goal'){txt(c.t,x+12,yy+14,col,{sh:0});yy+=22}
 L.forEach((l,i)=>txt(l,x+12,yy+10+i*11,'#ece6d6',{s:1,sh:0}));if(c.from)txt(`Partagée par ${c.from}`,x+w-12,y+h-6,'#b8b0d0',{s:1,sh:0,al:'r'})}
{const dr181=draw;draw=function(t){dr181(t);try{qtDraw()}catch(e){}}}
// La flèche-guide s'efface le temps de l'annonce
{const gs181=gdShow;gdShow=()=>!QT.cur&&gs181()}
// --- Aventure à plusieurs : une quête reçue en parlant à quelqu'un est donnée à tout le groupe
const QDENY=/^(expert|intro|intro3|starter|rs|wn|v|constructor|prototype|tourDay|towerBest)$|^rm_/;
const qtOkF=(k,v)=>typeof k==='string'&&/^[A-Za-z][A-Za-z0-9_]{0,23}$/.test(k)&&!QDENY.test(k)&&(v===true||Number.isInteger(v)&&v>0&&v<1e7);
const qtOkK=(k,v)=>typeof k==='string'&&/^[A-Za-z][A-Za-z0-9_]{0,23}$/.test(k)&&!QDENY.test(k)&&(v===true||Number.isInteger(v)&&v>0&&v<100);
function qtShare(F0,B0,K0,Q0){if(!F0||!Q0||typeof advCode!=='function'||!advCode()||!NET.on)return;const Q1=qtNow();if(!Q1)return;
 const nq=Object.keys(Q1).filter(k=>Q0[k]==null&&Q1[k][0]===1);if(!nq.length)return;const F=f(),fl={},bg={},ky={};
 for(const[k,v]of Object.entries(F))if(!F0[k]&&qtOkF(k,v))fl[k]=v;
 for(const[k,v]of Object.entries(G.bag||{}))if(Object.hasOwn(IT,k)&&v>(B0[k]|0))bg[k]=Math.min(5,v-(B0[k]|0));
 for(const[k,v]of Object.entries(G.keys||{}))if(!K0[k]&&qtOkK(k,v))ky[k]=v;
 for(const P of matePeers())if(isAdvMate(P))NET.send('qt',{q:nq.slice(0,4),fl,bg,ky},P.pid,true)}
// Une scène avec combat, cinématique ou badge est déjà vécue par tous (scènes partagées) : on ne partage que les simples conversations.
let QTEV=0;{const b181=battle;battle=function(...a){QTEV++;return b181.apply(this,a)}}{const c181=cinema;cinema=function(...a){QTEV++;return c181.apply(this,a)}}{const g181=badgeGet;badgeGet=function(...a){QTEV++;return g181.apply(this,a)}}
{const it181=interact;interact=async function(){const ok=G?.flags&&typeof advCode==='function'&&advCode()&&NET.on&&!SCX,F0=ok?{...f()}:null,B0=ok?{...G.bag}:null,K0=ok?{...G.keys}:null,Q0=ok?qtNow():null,e0=QTEV;
 const r=await it181();if(ok&&QTEV===e0)try{qtShare(F0,B0,K0,Q0)}catch(e){}return r}}
NET.H['qt']=(m,P)=>{if(!isAdvMate(P)||!G?.flags||!m||typeof m!=='object'||Array.isArray(m))return;const F=f(),o=v=>v&&typeof v==='object'&&!Array.isArray(v)?Object.entries(v).slice(0,24):[];let ch=0;
 for(const[k,v]of o(m.fl))if(qtOkF(k,v)&&!F[k]){F[k]=v;ch=1}
 for(const[k,v]of o(m.bg))if(Object.hasOwn(IT,k)&&Number.isInteger(v)&&v>0&&v<=5&&!(G.bag[k]>0)){G.bag[k]=v;ch=1}
 for(const[k,v]of o(m.ky))if(qtOkK(k,v)&&!G.keys[k]){G.keys[k]=v;ch=1}
 if(ch){QT.from=String(P.name||'Ton ami').slice(0,16);QT.fromT=Date.now();save()}};
