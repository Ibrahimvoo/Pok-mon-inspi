// Vérifie que tous les caractères des textes du jeu existent dans la police bitmap (sinon ils s'affichent « ? »).
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../src/game.js',import.meta.url),'utf8');
const FD=eval('('+src.match(/const FD=(\{[\s\S]*?\});\nconst MD/)[1]+')');const ok=new Set([...Object.keys(FD),' ','\n',' ']);
const lit=src.match(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g)||[],bad=new Map();
for(const l of lit){const s=l.slice(1,-1).replace(/\\n/g,'\n').replace(/\\(['"`])/g,'$1').replace(/\$\{[^}]*\}/g,'').replace(/[«»]/g,'');if(!/ [a-zàâçéèêëîïôûùüœ]{2,}/i.test(s)||/[;{}]|=>|\|\|/.test(s))continue;
 for(const ch of s){const b=ch.normalize('NFD')[0];if(!ok.has(ch)&&!ok.has(b))bad.set(ch,(bad.get(ch)||'')+(bad.has(ch)?'':s.slice(0,50)))}}
console.log(bad.size?[...bad].map(([c,e])=>JSON.stringify(c)+' ← '+e).join('\n'):'police OK');
