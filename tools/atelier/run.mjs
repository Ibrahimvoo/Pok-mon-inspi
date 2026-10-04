// Exécute un script d'atelier dans Chromium (moteur + bibliothèques d'illustrations chargés) et enregistre la planche PNG.
// Usage : node tools/atelier/run.mjs <script.js> <sortie.png>   — le script est le corps d'une fonction async qui renvoie un canvas.
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const dir=new URL('.',import.meta.url).pathname,[,,script,out]=process.argv;
const b=await chromium.launch(),p=await b.newPage();await p.setContent('<body></body>');
p.on('console',m=>console.log('[page]',m.text()));p.on('pageerror',e=>console.log('[pageerror]',e.message));
for(const f of['engine.js','sheet.js','creatures.js','people.js','props.js'])if(existsSync(dir+f))await p.addScriptTag({content:readFileSync(dir+f,'utf8')});
const t0=Date.now();
const data=await p.evaluate(`(async()=>{const cv=await (async()=>{${readFileSync(script,'utf8')}})();return cv.toDataURL('image/png')})()`);
writeFileSync(out,Buffer.from(data.split(',')[1],'base64'));console.log('ok',out,(Date.now()-t0)+'ms');await b.close();
