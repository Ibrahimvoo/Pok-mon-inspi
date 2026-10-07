// =====================================================================
// 19 — LA FAUNE D'AURÉLYS : fini les combats-surprises. Les créatures sauvages se voient, vivent et réagissent à toi.
// - RENCONTRES : VISIBLES (par défaut) : plus aucune rencontre invisible dans les herbes ni dans les grottes. On choisit ses combats.
//   (OPTIONS DU JEU : RENCONTRES : CLASSIQUES rétablit l'ancien système pour ceux qui aiment.)
// - 3 à 7 créatures visibles selon la taille du lieu, tirées selon leur rareté réelle ; elles reviennent peu à peu, loin de toi.
// - Herbes frémissantes : une touffe s'agite quelque part. Une créature plus rare s'y cache (et plus souvent aux couleurs rares).
// - Les territoriaux (prédateurs, grosses attaques) te chargent s'ils te voient de près. Les créatures bien plus faibles que ton
//   équipe s'écartent de ton chemin. Avec une Repousse, toute la faune t'évite.
// =====================================================================
const encVis=()=>!!G&&G.opt?.encV!==0;
{const er19=encRoll;encRoll=function(M,tall){if(encVis())return false;return er19(M,tall)}}
// Habitat : herbes hautes, et sol des grottes là où l'on rencontrait des créatures
const fauHab=M=>{const L=[];M.rows.forEach((r,y)=>{for(let x=0;x<r.length;x++){const c=r[x];if(c===','||c==='v'||M.encAll&&c==='g')L.push([x,y])}});return L};
const fauTarget=M=>{const n=Math.max(3,Math.min(7,2+Math.round(fauHab(M).length/22)));return typeof fauAdj==='function'?fauAdj(M,n):n};
const fauOk=k=>{const M=MAPS[k];return!!(M?.enc?.length&&!isInt(M)&&G?.party?.length&&!(k==='ruines'&&!f().balance))};
const fauLive=M=>M.npcs.filter(n=>n.fauna&&!n.gone);
function fauAdd(k,far){const M=MAPS[k];if(!fauOk(k))return null;const T=encTable(M,k).filter(encOk);if(!T.length)return null;const e=pickEnc(T);if(!e)return null;
 const mw=M.rows[0].length,mh=M.rows.length,H=fauHab(M),busyAt=(x,y)=>x===G.x&&y===G.y||M.npcs.some(n=>n.x===x&&n.y===y||n.rx===x&&n.ry===y);
 const okT=(x,y)=>{const c=M.rows[y]?.[x];if(!c||SOLID.has(c)||'~wHLhE='.includes(c)||M.doors?.[x+','+y]||busyAt(x,y)||!roomy(M,x,y))return false;const dx=Math.abs(x-G.x),dy=Math.abs(y-G.y);return far?dx>9||dy>6:dx+dy>=5};
 for(let t=0;t<70;t++){let x,y;if(H.length&&t<50&&Math.random()<.8)[x,y]=H[Math.random()*H.length|0];else{x=1+(Math.random()*(mw-2)|0);y=1+(Math.random()*(mh-2)|0)}if(!okT(x,y))continue;
  const noct=e[4]==='n'||['OMB','LUM'].includes(SP[e[0]].t),slp=Math.random()<(night()!==noct?.5:.12);
  const n={x,y,x0:x,y0:y,d:rnd(0,3),t:'mon',sp:e[0],lv:rnd(e[1],e[2]),fauna:1,wild:1,slp,tt:800+Math.random()*2000,fn:faunaMeet};if(faOn())n.fid=faId();M.npcs.push(n);return n}return null}
// Au chargement d'une carte : population complète, tirée selon la rareté (le meneur seulement, dans une aventure à plusieurs)
{const fs19=faunaSpawn;faunaSpawn=function(k){fs19(k);ruNew(k,.6);if(!encVis()||!fauOk(k)||faOn()&&!FA.own)return;const M=MAPS[k];M.npcs=M.npcs.filter(n=>!n.fauna);
 const tg=fauTarget(M);for(let i=0,n=0;n<tg&&i<tg*3;i++)if(fauAdd(k,0))n++}}
// Herbes frémissantes
const RU={map:null,x:0,y:0,last:0};
function ruNew(k,p){RU.map=null;if(!encVis()||!fauOk(k)||Math.random()>p)return;const M=MAPS[k],H=fauHab(M).filter(([x,y])=>Math.abs(x-G.x)+Math.abs(y-G.y)>=6&&!M.npcs.some(n=>n.x===x&&n.y===y));if(H.length<10)return;
 const[x,y]=H[Math.random()*H.length|0];Object.assign(RU,{map:k,x,y,last:steps})}
setInterval(()=>{try{if(mode!=='world'||!G||RU.map!==G.map||busy&&!move)return;const M=MAPS[G.map],c=M.rows[RU.y]?.[RU.x],col=c===','?'#9ae07a':M.cave||c==='g'?'#9aa8b8':'#e8945a';
 for(let i=0;i<2;i++)AMB.push({k:'rl',x:RU.x*TS+6+Math.random()*20,y:RU.y*TS+20,vx:(Math.random()-.5)*1.8,vy:-1.6-Math.random()*1.2,l:20,c:col});
 if(Math.abs(RU.x-G.x)+Math.abs(RU.y-G.y)<=4&&Math.random()<.12)sfx('grass')}catch(e){}},170);
// Les herbes frémissantes se voient bien : de petits traits qui tremblent au-dessus de la touffe, de jour comme de nuit
{const dw19f=drawWorld;drawWorld=function(t){dw19f(t);if(mode!=='world'||!G||RU.map!==G.map)return;const sx=RU.x*TS-CAM[0],sy=RU.y*TS-CAM[1],k=(t/110|0)%10;if(k>6)return;const o=k%2?2:-1;
 X.globalAlpha=.9;for(const[x,y,h]of[[3,10,6],[27,10,6],[8,4,5],[22,4,5],[15,0,4]])R(X,'#ffffff',sx+x+(x<15?-o:x>15?o:0),sy+y-(k%2),2,h);X.globalAlpha=1}}
async function ruHit(){const M=MAPS[G.map];RU.map=null;RU.last=steps;if(!G.party.some(alive))return;const T=encTable(M,G.map).filter(encOk);if(!T.length)return;
 const S=[...T].sort((a,b)=>encW(a)-encW(b)),R=S.slice(0,Math.max(1,Math.ceil(S.length/3))),e=R[Math.random()*R.length|0],lv=Math.min(e[2]+1,rnd(e[1],e[2])+1);
 sfx('grass');for(let i=0;i<14;i++)AMB.push({k:'rl',x:G.x*TS+4+Math.random()*24,y:G.y*TS+18,vx:(Math.random()-.5)*3,vy:-2-Math.random()*2,l:26,c:'#9ae07a'});
 await say('Les herbes frémissent… Quelque chose en jaillit !');tip('fremi','Herbes frémissantes : une créature plus rare de la zone s\'y cache, et elle a plus de chances d\'avoir des couleurs rares. Il y en a une de temps en temps dans chaque lieu sauvage.');
 const m=mon(e[0],lv,{wild:1});if(!m.sh&&Math.random()<1/40)m.sh=1;await battle([m],{rustle:1})}
// Territoriaux : ils chargent quand tu passes trop près, dans leur ligne de vue. Les plus faibles n'osent pas.
const fauTerr=k=>!!(PREY[k]||SP[k]?.bs[1]>=85)&&!SHY.has(k);
async function fauCharge(){if(!encVis()||G.repel>0||!G.party.some(alive))return false;const M=MAPS[G.map],ld=G.party.find(alive),L=npcs(M);
 for(const n of L){if(!n.fauna||n.gone||n.slp||n.walk||!fauTerr(n.sp)||n.lv<ld.lv-8)continue;const dx=G.x-n.x,dy=G.y-n.y;if(dx&&dy)continue;const dist=Math.abs(dx)+Math.abs(dy);if(dist<1||dist>3)continue;
  if((MAPS[G.map].cave||MAPS[G.map].dark)&&dist>2)continue;const d=dx>0?3:dx<0?2:dy>0?0:1;let ok=true;for(let i=1;i<dist;i++){const x=n.x+DX[d]*i,y=n.y+DY[d]*i,c=M.rows[y]?.[x];if(!c||SOLID.has(c)||L.some(o=>o!==n&&o.x===x&&o.y===y)){ok=false;break}}if(!ok)continue;
  n.d=d;n.walk=1;await emote(n,'!',420);for(let i=1;i<dist;i++)await npcStep(n,d,130);n.walk=0;n.rx=n.ry=null;
  tip('terr','Certaines créatures défendent leur territoire : si elles te voient de près, elles te chargent. Observe-les et contourne-les, ou relève le défi !');
  await say(`Le ${SP[n.sp].name} sauvage défend son territoire !`);await faunaMeet(n);return true}return false}
// Les créatures bien plus faibles que ton équipe (ou toute la faune, sous Repousse) s'écartent de ton chemin
{const ft19=faunaTick;faunaTick=function(dt){if(!encVis()||!G?.party)return ft19(dt);const ld=G.party.find(alive),add=[];
 if(ld)for(const n of MAPS[G.map].npcs)if(n.fauna&&!n.gone&&!SHY.has(n.sp)&&(G.repel>0||n.lv<ld.lv-10)){SHY.add(n.sp);add.push(n.sp)}
 try{return ft19(dt)}finally{for(const k of add)SHY.delete(k)}}}
// Chaque pas : herbes frémissantes, charge des territoriaux, retour lent de la faune
{const st19=onStep;onStep=async function(...a){const k=G?.map,x=G?.x,y=G?.y;await st19.apply(this,a);if(!G||G.map!==k||G.x!==x||G.y!==y||mode!=='world')return;
 if(!encVis())return;if(steps>30&&fauOk(k))tip('faune','Les créatures sauvages vivent à découvert : touche-en une pour l\'affronter, contourne-la si tu es pressé. Endormie, elle se laisse surprendre.');
 if(RU.map===k&&RU.x===x&&RU.y===y){await ruHit();return}
 if(await fauCharge())return;
 if(!RU.map&&steps-RU.last>45&&Math.random()<.04)ruNew(k,1);
 if(steps%22===0&&fauOk(k)&&(!faOn()||FA.own)){const M=MAPS[k];if(fauLive(M).length<fauTarget(M))fauAdd(k,1)}}}
