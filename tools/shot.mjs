// Pilote headless : charge le jeu, exécute un scénario (JS dans la page), capture des écrans, remonte les erreurs.
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
const [,,scenario,out='/tmp/shot']=process.argv;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1000,height:700}});const errs=[];
p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERROR '+e.message+'\n'+e.stack));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(600);
const ctx={p,snap:async n=>{await p.locator('#c').screenshot({path:`${out}-${n}.png`})},key:async(k,n=1,d=120)=>{for(let i=0;i<n;i++){await p.keyboard.press(k);await p.waitForTimeout(d)}},wait:ms=>p.waitForTimeout(ms),ev:s=>p.evaluate(s)};
try{const mod=await import(process.cwd()+'/'+scenario);await mod.default(ctx)}catch(e){errs.push('SCENARIO '+e.stack)}
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'NO ERRORS');await b.close();
