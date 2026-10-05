// Assemble le jeu en un seul fichier HTML autonome : shell + sprites + illustrations cuites + code (module monde inséré).
import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
const r=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sprites=JSON.stringify(JSON.parse(r('src/sprites.json')));
const art=existsSync(new URL('../src/art.json',import.meta.url))?r('src/art.json'):'{}';
const code=r('src/game.js').replace('/*@PIXB@*/','const PIXB='+sprites+';').replace('/*@ART@*/','const ART='+art+';').replace('/*@WORLD@*/',r('src/world.js')).replace('/*@V10@*/',()=>readdirSync(new URL('../src/v10/',import.meta.url)).filter(f=>f.endsWith('.js')).sort().map(f=>r('src/v10/'+f)).join('\n'));
const html=r('src/shell.html').trimEnd()+'\n<script>\n'+code+'\n</script>\n</body></html>\n';
writeFileSync(new URL('../index.html',import.meta.url),html);
console.log('index.html',(html.length/1024).toFixed(0)+' Ko');
