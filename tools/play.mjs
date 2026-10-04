// Test de bout en bout : horloge accélérée + pilote automatique qui répond aux dialogues et menus.
// Usage : node tools/play.mjs <scénario.js> [préfixe captures]   — le scénario est une fonction async exécutée dans la page.
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {readFileSync} from 'node:fs';
const [,,scn,out='/tmp/claude-0/s/play']=process.argv;
const b=await chromium.launch(),p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('console',m=>{const t=m.text();if(m.type()==='error')errs.push(t);else if(t.startsWith('LOG'))console.log(t)});
p.on('pageerror',e=>errs.push('PAGEERROR '+e.message+'\n'+e.stack));
const K=+(process.env.K||12);await p.addInitScript(K=>{const pn=performance.now.bind(performance),t0=pn();performance.now=()=>t0+(pn()-t0)*K;const st=setTimeout,si=setInterval,raf=requestAnimationFrame;
 window.setTimeout=(f,ms,...a)=>st(f,(ms||0)/K,...a);window.setInterval=(f,ms,...a)=>si(f,Math.max(2,(ms||0)/K),...a);window.requestAnimationFrame=cb=>raf(()=>cb(performance.now()))},K);
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(300);
await p.evaluate(()=>{window.AUTO={n:0,pick:m=>{if(mode==='battle'&&B&&B.me&&m.opts.length===B.me.moves.length&&m.opts[0]===MV[B.me.moves[0]].n){let bi=0,bv=-1;B.me.moves.forEach((id,i)=>{const v=MV[id],sc=B.me.pp[i]>0?(v.p||1)*eff(v.t,SP[B.foe.sp].t):-1;if(sc>bv){bv=sc;bi=i}});return bi}if(m.bare)return Math.max(0,G.party.findIndex(alive));return 0}};setInterval(()=>{if(AUTO.off||!waiters.length)return;const m=ui.menus[ui.menus.length-1];if(AUTO.hold?.(m))return;AUTO.n++;
 if(m){let i=AUTO.pick?AUTO.pick(m):0;if(i==null)i=0;if(i<0){press('b');return}if(m.dis?.(i)){i=m.opts.findIndex((_,j)=>!m.dis(j));if(i<0)i=0}m.i=i}press('a')},20)});
await p.addScriptTag({content:`window.SNAP=async n=>{window.__snap=n;while(window.__snap)await wait(30)};window.TEST=async()=>{while(mode!=='world'||busy)await wait(100);await (${readFileSync(scn,'utf8')})()}`});
let done=false,res;const pr=p.evaluate(async()=>{try{await TEST();return'OK'}catch(e){return'FAIL '+e.message+'\n'+e.stack}}).then(r=>{done=true;res=r});
let shots=0;
const t0=Date.now();while(!done&&Date.now()-t0<(+process.env.TMAX||840000)){await p.waitForTimeout(150);const q=await p.evaluate(()=>window.__snap||null).catch(()=>null);if(q){await p.waitForTimeout(40);await p.locator('#c').screenshot({path:`${out}-${q}.png`});await p.evaluate(()=>window.__snap=null);shots++}}
console.log('RESULT',done?res:'TIMEOUT',(Date.now()-t0)/1000+'s',shots,'shots');console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'NO ERRORS');
if(!done)console.log(await p.evaluate(()=>JSON.stringify({mode,map:G?.map,txt:ui.text?.s,menus:ui.menus.map(m=>m.opts.slice(0,4)),flags:G?.flags})));
await b.close();
