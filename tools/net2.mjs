// Test en ligne à deux joueurs : relais MQTT locaux (aedes, sur WebSocket) + deux navigateurs sans tête, chacun avec son pilote automatique.
// Usage : node tools/net2.mjs <scénario.js> [préfixe captures]   (SIDES=A,B,C : trois joueurs ; BAR renvoie alors {A:…,B:…,C:…})
//   Le scénario est un objet ({A:async()=>…, B:async()=>…}) exécuté dans chaque page. BAR('nom',valeur) attend l'autre joueur et renvoie sa valeur, SNAP('nom') capture l'écran.
//   NETMOD : dossier contenant les modules aedes et ws (npm i aedes ws) ; DROP=0.2 : 20 % des messages perdus ; K : accélération du temps ;
//   EXT=ws://hôte:port/chemin[|utilisateur|mot de passe],… : utiliser des relais déjà lancés au lieu des relais aedes ;
//   AUTH=utilisateur:motdepasse : les relais aedes exigent ces identifiants, seul le premier relais les envoie (le second est refusé).
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {readFileSync} from 'node:fs';import {createRequire} from 'node:module';
const req=createRequire((process.env.NETMOD||process.cwd()+'/node_modules')+'/');
const Ae=req('aedes'),{WebSocketServer,createWebSocketStream}=req('ws');
const [,,scn,out='/tmp/claude-0/s/net']=process.argv;const DROP=+(process.env.DROP||0),PORTS=(process.env.PORTS||'18884,18885').split(',').map(Number),K=+(process.env.K||6);
const mkBroker=async()=>Ae.createBroker?await Ae.createBroker():Ae.Aedes?await Ae.Aedes.createBroker():Ae();   // aedes 0.x (fonction) ou 1.x ({Aedes})
const EXT=(process.env.EXT||'').split(',').filter(Boolean);const srv=[];if(!EXT.length)for(const port of PORTS){const b=await mkBroker();if(DROP)b.authorizeForward=(c,p)=>Math.random()<DROP?null:p;if(process.env.AUTH){const[u,w]=process.env.AUTH.split(':');b.authenticate=(c,un,pw,cb)=>cb(null,un===u&&String(pw||'')===w)}
 const wss=new WebSocketServer({port,handleProtocols:ps=>ps.has('mqtt')?'mqtt':false});wss.on('connection',ws=>b.handle(createWebSocketStream(ws)));srv.push({b,wss,port})}
const relays0=EXT.length?EXT.map(u=>{const[url,l,w]=u.split('|');return l?{u:url,l,w}:{u:url}}):PORTS.map(p=>({u:`ws://127.0.0.1:${p}/mqtt`})),relays=process.env.AUTH?relays0.map((r,i)=>i?r:{...r,l:process.env.AUTH.split(':')[0],w:process.env.AUTH.split(':')[1]}):relays0;
const SIDES=(process.env.SIDES||'A,B').split(','),bars={};let failed=0;const BAR=(S,n,v)=>new Promise(r=>{if(failed)return r(null);const L=bars[n]??=[];L.push({S,r,v});if(L.length===SIDES.length){if(L.length===2){L[0].r(L[1].v??true);L[1].r(L[0].v??true)}else{const o={};for(const x of L)o[x.S]=x.v??true;for(const x of L)x.r(o)}}});
const failAll=()=>{failed=1;for(const L of Object.values(bars))for(const b of L)b.r(null)};
const br=await chromium.launch();const src=readFileSync(scn,'utf8');const res={},errs=Object.fromEntries(SIDES.map(S=>[S,[]]));let shots=0;
async function side(S){const p=await br.newPage({viewport:{width:1000,height:700}});
 p.on('console',m=>{const t=m.text();if(m.type()==='error')errs[S].push(t);else if(t.startsWith('LOG'))console.log(S,t)});p.on('pageerror',e=>errs[S].push('PAGEERROR '+e.message+'\n'+e.stack));
 await p.exposeFunction('BAR',(n,v)=>BAR(S,n,v));await p.exposeFunction('SNAPX',async n=>{await p.waitForTimeout(40);await p.locator('#c').screenshot({path:`${out}-${S}-${n}.png`});shots++});
 await p.exposeFunction('RELAY',async(cmd,i)=>{const s=srv[i];if(cmd==='kill'){for(const c of s.wss.clients)c.terminate();s.wss.close()}return 1});
 await p.addInitScript(([K,relays])=>{window.NET_RELAYS=relays;const pn=performance.now.bind(performance),t0=pn();performance.now=()=>t0+(pn()-t0)*K;const st=setTimeout,si=setInterval,raf=requestAnimationFrame;
  window.setTimeout=(f,ms,...a)=>st(f,(ms||0)/K,...a);window.setInterval=(f,ms,...a)=>si(f,Math.max(2,(ms||0)/K),...a);window.requestAnimationFrame=cb=>raf(()=>cb(performance.now()))},[K,relays]);
 await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(300);
 await p.evaluate(S=>{window.NSIDE=S;window.AUTO={n:0,pick:m=>{if(mode==='battle'&&B&&B.me&&m.opts.length===B.me.moves.length&&m.opts[0]===MV[B.me.moves[0]].n){let bi=0,bv=-1;B.me.moves.forEach((id,i)=>{const v=MV[id],sc=B.me.pp[i]>0?(v.p||1)*eff(v.t,SP[B.foe.sp].t):-1;if(sc>bv){bv=sc;bi=i}});return bi}if(m.bare)return Math.max(0,G.party.findIndex(alive));return 0}};
  setInterval(()=>{if(AUTO.off||!waiters.length)return;const m=ui.menus[ui.menus.length-1];if(AUTO.hold?.(m))return;AUTO.n++;if(m){let i=AUTO.pick?AUTO.pick(m):0;if(i==null)i=0;if(i<0){press('b');return}if(m.dis?.(i)){i=m.opts.findIndex((_,j)=>!m.dis(j));if(i<0)i=0}m.i=i}press('a')},20)},S);
 await p.addScriptTag({content:`window.SNAP=n=>SNAPX(n);window.NSCN=(${src});window.TEST=async()=>{while(mode!=="world"||busy)await wait(100);await NSCN[NSIDE]()}`});
 res[S]=await p.evaluate(async()=>{try{await TEST();return'OK'}catch(e){return'FAIL '+e.message+'\n'+e.stack}});
 if(!res[S].startsWith('OK')){failAll();console.log(S,'STATE',await p.evaluate(()=>JSON.stringify({mode,map:G?.map,txt:ui.text?.s,menus:ui.menus.map(m=>m.opts.slice(0,4)),act:NET?.act,peers:NET?[...NET.peers.values()].map(P=>P.name):0,dbg:NET?.dbg?.slice(-40)})).catch(e=>e.message))}
 return p}
const t0=Date.now(),TMAX=+(process.env.TMAX||600000);const tm=setTimeout(()=>{console.log('RESULT TIMEOUT',JSON.stringify(res));process.exit(2)},TMAX);
await Promise.all(SIDES.map(side));clearTimeout(tm);
console.log('RESULT',SIDES.map(S=>res[S]?.split('\n')[0]).join(' | '),(Date.now()-t0)/1000+'s',shots,'shots');for(const S of SIDES){if(!res[S].startsWith('OK'))console.log(S,res[S]);console.log(S,errs[S].length?'ERRORS:\n'+errs[S].join('\n'):'NO ERRORS')}
await br.close();for(const s of srv){s.wss.close();s.b.close?.()}process.exit(SIDES.every(S=>res[S]==='OK')?0:1);
