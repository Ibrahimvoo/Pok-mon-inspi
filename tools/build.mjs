// Assemble le jeu en un seul fichier HTML autonome : shell + données de sprites + code.
import {readFileSync,writeFileSync} from 'node:fs';
const r=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sprites=JSON.stringify(JSON.parse(r('src/sprites.json')));
const html=r('src/shell.html').trimEnd()+'\n<script>\n'+r('src/game.js').replace('/*@PIXB@*/','const PIXB='+sprites+';')+'\n</script>\n</body></html>\n';
writeFileSync(new URL('../index.html',import.meta.url),html);
console.log('index.html',(html.length/1024).toFixed(0)+' Ko');
