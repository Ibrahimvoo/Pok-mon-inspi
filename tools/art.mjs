// Génère les sprites des nouvelles créatures (48/96/120) dans src/sprites.json + planche de prévisualisation.
// Usage : node tools/art.mjs [id…]   (sans argument : toutes les créatures de tools/art/mons.js)
import {chromium} from '/opt/node22/lib/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('..',import.meta.url).pathname,sp=JSON.parse(readFileSync(root+'src/sprites.json','utf8'));
const b=await chromium.launch(),p=await b.newPage();await p.setContent('<body></body>');
await p.addScriptTag({content:readFileSync(root+'tools/art/pipeline.js','utf8')});await p.addScriptTag({content:readFileSync(root+'tools/art/mons.js','utf8')});
const ids=process.argv.slice(2).length?process.argv.slice(2):await p.evaluate('Object.keys(MONS)');
for(const id of ids)sp[id]=await p.evaluate(id=>Object.fromEntries([48,96,120].map(n=>[n,renderMon(MONS[id],n)])),id);
writeFileSync(root+'src/sprites.json',JSON.stringify(sp));
// planche : toutes les créatures en 120 + 48 pour vérifier la lisibilité
const all=Object.keys(sp),html=`<body style="margin:0;background:#faf5e6;display:flex;flex-wrap:wrap;width:${8*128}px">${all.map(k=>`<div style="width:128px;height:150px;text-align:center;font:10px monospace"><img style="image-rendering:pixelated" src="data:image/png;base64,${sp[k][120]}"><br><img style="image-rendering:pixelated" src="data:image/png;base64,${sp[k][48]}"> ${k}</div>`).join('')}</body>`;
await p.setViewportSize({width:8*128,height:Math.ceil(all.length/8)*150});await p.setContent(html);await p.waitForTimeout(200);
await p.screenshot({path:process.env.ART_OUT||'/tmp/claude-0/s/art.png',fullPage:true});console.log('ok',ids.join(','));await b.close();
