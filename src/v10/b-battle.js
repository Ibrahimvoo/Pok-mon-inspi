// =====================================================================
// EXTENSION 10.0 — Combat : nouveaux effets, talents, ciels Orage / Étoiles, capsules, disques, évolutions conditionnelles.
// =====================================================================
for(const k of V10SP)SP[k].learn=[...SP[k].learn].sort((a,b)=>a[0]-b[0]);
SP.flocelin.evo.push([0,'angeflocon',{item:'pierresoleil'}],[0,'demoniflocon',{item:'pierrelune'}]);SP.cavalsable.evo.unshift([0,'fousable',{item:'pierreaube'}]);
SP.relicat.evo.push([0,'sphinxor',{item:'pierresoleil'}],[0,'anubrume',{item:'pierrelune'}]);SP.lueurette.evo.push([0,'flammeche',{item:'pierresoleil'}]);
// --- Icônes des objets 10.0
Object.assign(ICO,{megacapsule:icon(BALLR,{r:'#f6c445',R:'#b88a1a',w:'#1a1420'}),sombrecapsule:icon(BALLR,{r:'#2a2a3a',R:'#14101e',w:'#8a5ad0'}),rapidecapsule:icon(BALLR,{r:'#4ac8e8',R:'#2a8aa8',w:'#f6c445'}),filetcapsule:icon(BALLR,{r:'#4aa83e',R:'#2a7a2e',w:'#4a8ad8'}),
 maxpotion:icon(POT,{p:'#f6c445',P:'#b88a1a',l:'#fff4c0'}),rappelmax:icon(["...oo...","..oyyo..",".oyYwyo.","oyyYwyyo","oyYYyyyo",".oyYYyo.","..oyyo..","...oo..."],{y:'#ffe080',Y:'#e8a020'}),superrepousse:icon(["..oooo..","..okko..",".oooooo.",".obbbbo.",".obwbbo.",".obbbbo.",".oBBBBo.",".oooooo."]),
 tartecycle:icon(["........","..oooo..",".oyrryo.","oyrwwryo","oYYYYYYo",".oNNNNo.","..oooo..","........"],{N:'#8a5a2a'}),pierresoleil:icon(SHARDP,{y:'#ffd860',Y:'#e8702e'}),pierreaube:icon(SHARDP,{y:'#ffd0e0',Y:'#c86a9a'}),
 fossilefeuille:icon(SHARDP,{y:'#b8d8a0',Y:'#5a7a3a'}),eclatprisme:icon(SHARDP,{y:'#e0f8ff',Y:'#8ac8f0'}),lingot:icon(["........","........","..oooooo",".oyyyyYo","oyywyYYo","oYYYYYo.","oooooo..","........"],{y:'#c8d0e0',Y:'#7a8aa0'}),
 perle:icon(["........","..oooo..",".owwwlo.","owwwwllo","owwwlllo",".olllo..","..oooo..","........"]),etoilefilante:icon(["......oo",".....oyo","...ooyo.","..oyyo..",".oywyo..","oyyyo...","oyyo....",".oo....."],{y:'#ffd860'}),
 pepite:icon(["........","...ooo..","..oyyyo.",".oywyyYo",".oyyyYYo","..oYYYo.","...ooo..","........"])});
for(const k of['casque','bandeau','lunettes','coquille','talisman','pierrechance'])ICO[k]=icon(GEM,{c:{casque:'#8a8a9a',bandeau:'#e84a4a',lunettes:'#4a8ad8',coquille:'#e8c8f0',talisman:'#e8a0c0',pierrechance:'#4ae8a0'}[k],C:C.ink});
for(const m of DISCS)ICO['dc_'+m]=icon(["..oooo..",".owwwwo.","owbbbbwo","owbooBwo","owboobwo","owbbbbwo",".owwwwo.","..oooo.."],{b:TY[MV[m].t][1],B:'#ffffff'});

// --- Ciels et conditions de combat
const PHN0=()=>{const p=phase();return p===0||p===2};
const power0=power;power=function(a,v){let k=power0(a,v);const t=v.t,sk=B.sky?.k,T=tal(a),e=v.e;
 if(sk==='storm'&&t==='ELE')k*=1.5;if(sk==='stars'&&(t==='LUM'||t==='ROC'))k*=1.3;
 if(T==='tenace'&&a.st)k*=1.5;if(T==='aube'&&PHN0())k*=1.3;if(T==='cycle'&&!isN())k*=1.2;if(T==='technicien'&&v.p&&v.p<=60)k*=1.5;if(T==='fidele'&&mine(a))k*=1+.05*bondLv(a);
 if(a.item==='bandeau')k*=1.4;if(a.item==='talisman'&&PHN0())k*=1.25;
 if(e==='night2'&&isN())k*=2;if(e==='dawn'&&PHN0())k*=1.5;if(e==='ecl15'&&(sk==='eclipse'||ecl()))k*=1.5;if(e==='stars15'&&(sk==='stars'||stars()))k*=1.5;if(e==='facade'&&a.st)k*=2;return k};
const dmg0=dmg;dmg=function(a,d,v,sa,sd,avg){let r=dmg0(a,d,v,sa,sd,avg);
 if(!avg&&!r.cr&&(v.e==='crit'||a.item==='pierrechance')&&Math.random()<(v.e==='crit'&&a.item==='pierrechance'?.4:.2))r={...r,cr:true,n:Math.floor(r.n*1.5)};
 if(r.cr&&tal(d)==='cuirasse')r={...r,cr:false,n:Math.max(1,Math.floor(r.n/1.5))};
 if(v.e==='dream'&&d.st==='slp')r.n*=2;if(tal(d)==='cycle'&&isN())r.n=Math.max(1,Math.floor(r.n*.8));if(d.item==='coquille')r.n=Math.max(1,Math.floor(r.n*.85));
 if(v.e==='x2'){r.n+=dmg0(a,d,v,sa,sd,avg).n;r.hits=2;B.hits2=1}return r};
const spdOf0=spdOf;spdOf=function(m,s){return spdOf0(m,s)*(m.item==='bandeau'?.9:1)};
const accOk=(a,v,id)=>!v.a||tal(a)==='echo'||B.field==='volt'&&v.t==='ELE'||B.sky?.k==='storm'&&v.t==='ELE'||id==='fatalfoudre'&&B.sky?.k==='rain'||Math.random()*100<v.a;
const chMul=a=>(tal(a)==='serenite'?2:1)*(a.item==='lunettes'?2:1);
// Talents d'absorption : la capacité nourrit la cible au lieu de la blesser
async function absorbTal(s,v){const d=side(1-s),t=tal(d),di=1-s,k=t==='absorbeau'&&v.t==='EAU'?'heal':t==='paratonnerre'&&v.t==='ELE'||t==='torche'&&v.t==='FEU'?'atk':null;if(!k||d.hp<=0)return false;
 await talPop(di);if(k==='heal'){const mx=st(d).hp;if(d.hp<mx){d.hp=Math.min(mx,d.hp+(mx>>2));healFx(di);await tween(B.dh,di,d.hp,350);await say(`${who(di)} absorbe l'eau et récupère des PV !`,0,1)}else await say(`${who(di)} absorbe l'eau sans effort.`,0,1)}
 else{await say(`${who(di)} absorbe l'attaque !`,0,1);await statChange(di,'atk',1)}return true}
// Effets sans dégâts
const XFX={protect:async(s,a)=>{B.prot??=[-9,-9];B.protL??=[-9,-9];if(B.protL[s]===B.turn-1&&Math.random()<.5){B.protL[s]=-9;return say('Mais cela échoue !',0,1)}B.prot[s]=B.turn;B.protL[s]=B.turn;spawn({k:'ring',x:(s?FOE:ME)[0],y:(s?FOE:ME)[1],r0:10,r1:52,l:22,c:'#a8e8ff'});await say(`${who(s)} se protège !`,0,1)},
 seed:async(s,a,d)=>{B.seedM??=new Set();const di=1-s;if(SP[d.sp].t==='PLA'||B.seedM.has(d))return say(`Ça n'affecte pas ${who(di)}…`,0,1);B.seedM.add(d);burstAt(s?ME:FOE,10,['#80ff9a','#3a9a4a'],2);await say(`${who(di)} est infecté par une graine !`,0,1)},
 roots:async(s,a)=>{B.rootM??=new Set();if(B.rootM.has(a))return say('Mais cela échoue !',0,1);B.rootM.add(a);burstAt(s?FOE:ME,10,['#80ff9a','#a8e8ff'],2,{g:.05});await say(`${who(s)} s'ancre et puise de l'énergie !`,0,1)},
 cure:async(s,a)=>{if(!a.st)return say('Mais cela échoue !',0,1);a.st=null;a.slp=0;healFx(s);sfx('lv');await say(`${who(s)} est guéri !`,0,1)}};
// Effets de fin de tour 10.0 (avant brûlure, poison, etc.)
const endTurn0=endTurn;endTurn=async function(){for(const s of[0,1]){const m=side(s),o=side(1-s);if(m.hp<=0)continue;
  if(B.seedM?.has(m)){const n=Math.max(1,Math.floor(st(m).hp/8));m.hp=Math.max(0,m.hp-n);await tween(B.dh,s,m.hp,250);if(o.hp>0&&o.hp<st(o).hp){o.hp=Math.min(st(o).hp,o.hp+n);healFx(1-s);await tween(B.dh,1-s,o.hp,250)}await say(`La graine draine l'énergie de ${who(s)} !`,0,1)}
  if(m.hp>0&&B.rootM?.has(m)&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));healFx(s);await tween(B.dh,s,m.hp,250);await say(`${who(s)} puise de l'énergie par ses racines.`,0,1)}
  if(m.hp>0&&tal(m)==='turbo'&&B.stg[s].spd<6){await talPop(s);await statChange(s,'spd',1)}
  if(m.hp>0&&m.st&&tal(m)==='medecin'&&Math.random()<.35){const k=m.st;m.st=null;m.slp=0;await talPop(s);healFx(s);await say(`${who(s)} se soigne : il n'est plus ${STN[k][2]} !`,0,1)}}
 return endTurn0()};
const entryTal0=entryTal;entryTal=async function(s){await entryTal0(s);const m=side(s),t=tal(m);if(!m||m.hp<=0)return;
 if(t==='intimidation'&&side(1-s)?.hp>0){await talPop(s);await statChange(1-s,'atk',-1)}
 else if(t==='crachin'||t==='orageux'||t==='astral'){await talPop(s);await setSky(t==='crachin'?'rain':t==='orageux'?'storm':'stars',s)}
 else if(t==='aurore'){await talPop(s);await setSky('sun',s);await statChange(s,'spd',1)}};
// L'IA évite les coups inutiles et sait poser une graine ou se protéger
const ai0=ai;ai=function(fo,me,lv){let id=ai0(fo,me,lv);const v=MV[id],U=fo.moves.filter((x,i)=>fo.pp[i]>0),dmgBest=()=>U.filter(x=>MV[x].p).sort((x,y)=>dmg(fo,me,MV[y],B.stg[1],B.stg[0],1).n-dmg(fo,me,MV[x],B.stg[1],B.stg[0],1).n)[0];
 const useless=x=>{const e=MV[x].e;return e==='seed'&&(SP[me.sp].t==='PLA'||B.seedM?.has(me))||e==='roots'&&B.rootM?.has(fo)||e==='cure'&&!fo.st||e==='protect'&&B.protL?.[1]===B.turn-1};
 if(lv&&U.includes('vampigraine')&&!useless('vampigraine')&&me.hp>st(me).hp*.4&&Math.random()<.45)return'vampigraine';
 if(lv>1&&U.includes('abri')&&!useless('abri')&&fo.hp<st(fo).hp*.35&&(B.seedM?.has(me)||me.st==='psn'||me.st==='brn')&&Math.random()<.5)return'abri';
 if(lv&&U.includes('rafraichir')&&fo.st&&fo.st!=='slp'&&Math.random()<.5)return'rafraichir';
 if(v&&!v.p&&useless(id))return dmgBest()||id;return id};
const mvDesc0=mvDesc;mvDesc=function(v){const e=v.e,X={x2:'Frappe deux fois de suite.',protect:'Bloque les attaques ce tour-ci. Frappe en tout premier. Peut échouer si répété.',facade:'Puissance doublée si le lanceur subit un statut.',crit:'Coups critiques fréquents.',
  cure:'Guérit les statuts du lanceur.',seed:'Draine 1/8 des PV de la cible à chaque tour (sauf PLANTE).',roots:'Rend 1/16 des PV au lanceur à chaque tour.',storm:'Invoque l\'Orage 5 tours.',stars:'Invoque un Ciel Étoilé 5 tours.',
  night2:'Puissance doublée la nuit et sous une Éclipse.',dawn:'Puissance x1,5 à l\'aube et au crépuscule.',ecl15:'Puissance x1,5 pendant une Éclipse.',stars15:'Puissance x1,5 sous les étoiles.',dream:'Puissance doublée sur une cible endormie.',cycle:'LUMIÈRE le jour, OMBRE la nuit.'}[e];
 if(X)return(X+(v.pr>0&&e!=='protect'?' Frappe en premier.':'')).trim();
 if(v.p&&/^\w+\+\d?$/.test(e||''))return`Peut augmenter ${{atk:'l\'Attaque',def:'la Défense',spd:'la Vitesse'}[e.slice(0,3)]} du lanceur${v.ch<100?` (${v.ch}%)`:''}.`;
 if(v.p&&SKY[e])return`Invoque ${e==='eclipse'?'une Éclipse':SKY[e][0]} après avoir frappé.`;
 if(v.id==='fatalfoudre')return'Peut paralyser (30%). Ne rate jamais sous la pluie ou l\'orage.';return mvDesc0(v)};
const useMove0=useMove;useMove=async function(s,id){const a=side(s),v=MV[id];if(v?.e==='cycle'&&isN()){const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]=Math.max(0,a.pp[pi]-1);return useMove0(s,'lamecycle_n')}return useMove0(s,id)};
// Capsules 10.0 et talent Charmeur
function ballMul(k){const f2=B.foe,t=SP[f2.sp].t;let b=k==='crepuscapsule'?(isN()?3:1):k==='cyclecapsule'?1e6:k==='sombrecapsule'?(t==='OMB'?3.5:1):k==='rapidecapsule'?(B.turn<=1?4:1):k==='filetcapsule'?(t==='EAU'||t==='PLA'?3:1):IT[k][3];
 if(G.party.some(m=>m.hp>0&&tal(m)==='charmeur'))b*=1.25;return b}
// Disques Cycle
const discOk=(m,mv)=>MV[mv].t==='NOR'||MV[mv].t===SP[m.sp].t||SP[m.sp].learn.some(e=>e[1]===mv);
async function useDisc(k){const mv=IT[k][3],t=await choose(G.party.map(m=>`${nm(m)}${m.moves.includes(mv)?' · CONNU':discOk(m,mv)?' · OK':' · NON'}`),{bare:0,w:260,title:MV[mv].n});if(t<0)return;const m=G.party[t];
 if(!discOk(m,mv))return say(`${nm(m)} ne peut pas apprendre ${MV[mv].n}.`);if(m.moves.includes(mv))return say(`${nm(m)} connaît déjà ${MV[mv].n}.`);await learn(m,mv);save()}
// Évolutions 10.0 : pluie, éclipse, étoiles filantes, lieu, objet tenu, capacité connue
evoTarget=function(m,item){const e=SP[m.sp].evo;if(!e)return null;for(const[lv,to,c]of Array.isArray(e[0])?e:[e]){if(item){if(c?.item===item)return to;continue}
  if(c?.item||m.lv<lv||c?.time==='j'&&night()||c?.time==='n'&&!night()||c?.bond&&bondLv(m)<c.bond||c?.eclipse&&!act2()||c?.ecl&&!ecl()||c?.rain&&!(G.wx?.k==='rain')||c?.stars&&!stars()||c?.map&&G.map!==c.map&&RPAR10(G.map)!==c.map||c?.held&&m.item!==c.held||c?.move&&!m.moves.includes(c.move))continue;
  if(c?.held){m.item=null}return to}return null};
const RPAR10=k=>RPAR[k]||k;
const EVC=c=>c?.item?IT[c.item][0]:c?.bond?'lien '+c.bond+' cœurs':c?.move?'en connaissant '+MV[c.move].n:null;
evoInfo=function(k){const e=SP[k].evo;if(!e)return SP[k].base!==k&&SP[k].base?`Évolue de ${SP[SP[k].base].name}`:'N\'évolue pas';
 return(Array.isArray(e[0])?e:[e]).map(([lv,to,c])=>`${SP[to].name} : ${EVC(c)||'niv. '+lv}${c?.held?' en tenant '+IT[c.held][0]:''}${c?.time==='j'?' (jour)':c?.time==='n'?' (nuit)':''}${c?.ecl?' (éclipse)':''}${c?.rain?' (sous la pluie)':''}${c?.stars?' (étoiles filantes)':''}${c?.map?' ('+(MAPS[c.map]?.name||c.map).split(' · ')[0]+')':''}`).join(' · ')};
// Effets visuels des nouveaux ciels
function skyFx10(b){const t=now();if(b.sky.k==='storm'){X.globalAlpha=.25;R(X,'#1a1a30',0,0,W,H);X.globalAlpha=1;if((t/90|0)%37===0){X.globalAlpha=.5;R(X,'#fff8d0',0,0,W,H);X.globalAlpha=1}
  X.strokeStyle='rgba(200,220,255,.5)';X.lineWidth=2;for(let i=0;i<22;i++){const x=(i*53+t*.5)%W,y=(i*97+t*.9)%H;X.beginPath();X.moveTo(x,y);X.lineTo(x-4,y+12);X.stroke()}}
 if(b.sky.k==='stars'){X.globalAlpha=.3;R(X,'#141032',0,0,W,H);X.globalAlpha=1;for(let i=0;i<30;i++){const x=(i*97)%W,y=(i*41)%140,k=.5+.5*Math.sin(t/300+i);X.globalAlpha=k;R(X,i%3?'#ffffff':'#ffe080',x,y,2,2)}
  const sx=(t*.25)%(W+200)-100;X.globalAlpha=.8;for(let j=0;j<8;j++)R(X,'#ffffff',sx-j*6,20+j*3,3,2);X.globalAlpha=1}}
