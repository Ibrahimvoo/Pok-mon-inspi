// Cuisson des illustrations : rend tout l'atelier (décors, créatures, personnages) en planches PNG et écrit src/art.json,
// que tools/build.mjs injecte dans index.html. Usage : node tools/atelier/bake.mjs [props|mons|people…]
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
const dir=new URL('.',import.meta.url).pathname,root=new URL('../..',import.meta.url).pathname,outF=root+'src/art.json';
const want=process.argv.slice(2);const prev=existsSync(outF)?JSON.parse(readFileSync(outF,'utf8')):{};
const b=await chromium.launch(),p=await b.newPage();await p.setContent('<body></body>');
p.on('console',m=>console.log('[page]',m.text()));p.on('pageerror',e=>console.log('[pageerror]',e.message));
for(const f of['engine.js','creatures.js','people.js','props.js','pack.js'])if(existsSync(dir+f))await p.addScriptTag({content:readFileSync(dir+f,'utf8')});
const t0=Date.now(),out={...prev};
for(const k of['props','mons','people'])if(!want.length||want.includes(k)){const r=await p.evaluate(`BAKE_${k}?BAKE_${k}():null`);if(r)out[k]=r;console.log(k,r?Object.keys(r.map||r).length:'—',(Date.now()-t0)+'ms')}
writeFileSync(outF,JSON.stringify(out));console.log('art.json',(JSON.stringify(out).length/1024).toFixed(0)+' Ko');await b.close();
