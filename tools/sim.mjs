// Simulateur d'équilibrage : rejoue des milliers de combats de boss avec les vraies données/formules du jeu.
// Joueur : IA « dresseur » + potions + changement de créature sensé. Usage : node tools/sim.mjs  (V3=1 : règles de la version 3, sans Éveil ni lien)
// Version 4 : Éveil des deux côtés (boss marqués ev), lien du joueur (BOND=0..5, défaut 3), objets tenus, choix de la créature suivante selon les types.
import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../src/game.js',import.meta.url),'utf8');
const data=src.slice(src.indexOf('const TY='),src.indexOf('const MS={}'));
const ctx=new Function(data+';return{TY,EF,eff,MV,STN,SKY,TAL,SP,IT}')();const{eff,MV,STN,SP}=ctx;const V3=!!process.env.V3,BOND=+(process.env.BOND??3);
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const st=m=>{const b=SP[m.sp].bs,l=m.lv,f=v=>Math.floor(v*2*l/100)+5;return{hp:Math.floor(b[0]*2*l/100)+l+10,atk:f(b[1]),def:f(b[2]),spd:f(b[3])}};
function mon(sp,lv,mv){const m={sp,lv,moves:[],st:null};for(const[l,id]of SP[sp].learn)if(l<=lv&&!m.moves.includes(id)){m.moves.push(id);if(m.moves.length>4)m.moves.shift()}if(mv)m.moves=mv.slice();m.pp=m.moves.map(id=>MV[id].pp);m.hp=st(m).hp;return m}
const sm=v=>v>=0?(2+v)/2:2/(2-v),tal=m=>SP[m.sp].tal;
function sim(P,F,o={}){const B={stg:[{atk:0,def:0,spd:0},{atk:0,def:0,spd:0}],sky:null,night:!!o.night,ev:[0,0],evU:[0,0]};let me=P.find(m=>m.hp>0),fo=F[0],fi=0,pots=o.pots??2,fitems=o.items??1,turns=0;
 const EV=V3?[0,0]:[1,o.ev?1:0],bk=BOND>=5?1.5:BOND>=3?1.25:1,gain=(s,n)=>{if(EV[s]&&!B.evU[s])B.ev[s]=Math.min(100,B.ev[s]+Math.round(n*(s?1:bk)))};
 const awaken=s=>{const m=side(s),lu=isN();B.evU[s]=1;B.stg[s].atk=Math.min(6,B.stg[s].atk+1);if(lu){B.stg[s].def=Math.min(6,B.stg[s].def+1);m.st=null}else{B.stg[s].spd=Math.min(6,B.stg[s].spd+1);m.hp=Math.min(st(m).hp,m.hp+Math.floor(st(m).hp/5))}};
 const berry=s=>{const m=side(s);if(m.item==='baiesoin'&&m.hp>0&&m.hp<=st(m).hp/2){m.item=null;m.hp=Math.min(st(m).hp,m.hp+(st(m).hp>>2))}};
 const fscore=(f2,m)=>{const z={atk:0,def:0,spd:0},b=(a,d)=>Math.max(0,...a.moves.map((id,i)=>MV[id].p&&a.pp[i]>0?dmg(a,d,MV[id],z,z,1)/Math.max(1,d.hp):0));return Math.min(1.2,b(f2,m))-.8*Math.min(1.2,b(m,f2))};
 const nextFoe=()=>{const L=F.filter(m=>m.hp>0&&m!==fo),ace=F[F.length-1];if(V3||L.length<2)return L[0];const C2=ace.hp>0?L.filter(m=>m!==ace):L;return C2.reduce((a,b)=>fscore(b,me)>fscore(a,me)?b:a)};
 const isN=()=>B.night||B.sky?.k==='eclipse',side=s=>s?fo:me;
 const immune=(m,k)=>k==='brn'&&SP[m.sp].t==='FEU'||k==='par'&&SP[m.sp].t==='ELE'||k==='psn'&&SP[m.sp].t==='ROC'||k==='slp'&&tal(m)==='vigilant';
 const spd=(m,s)=>st(m).spd*sm(B.stg[s].spd)*(m.st==='par'?.5:1)*(tal(m)==='glissade'&&B.sky?.k==='rain'?2:1);
 const power=(a,v)=>{let k=1,t=v.t,sk=B.sky?.k;if(a.hp<=st(a).hp/3&&{brasier:'FEU',torrent:'EAU',engrais:'PLA'}[tal(a)]===t)k*=1.5;if(isN()&&(tal(a)==='noctambule'&&t==='OMB'||tal(a)==='lueur'&&t==='LUM'))k*=1.2;if(sk==='rain'){if(t==='EAU')k*=1.5;if(t==='FEU')k*=.5}if(sk==='sun'){if(t==='FEU'||t==='LUM')k*=1.5;if(t==='EAU')k*=.5}if(sk==='eclipse'&&t==='OMB')k*=1.5;const it=a.item&&ctx.IT[a.item];if(it&&it[4]==='held'&&it[3]===t)k*=1.2;if(a.item==='orbe')k*=1.3;return k};
 const dmg=(a,d,v,sa,sd,avg)=>{const A=st(a).atk*sm(sa.atk)*(a.st==='brn'?.75:1),D=st(d).def*sm(sd.def),ef=eff(v.t,SP[d.sp].t),cr=!avg&&Math.random()<.0625;return Math.max(1,Math.floor(((2*a.lv/5+2)*v.p*A/D/50+2)*(v.t===SP[a.sp].t?1.5:1)*ef*power(a,v)*(cr?1.5:1)*(avg?.92:.85+Math.random()*.15)))};
 const ai=(a,d,s,lv)=>{const as=B.stg[s],ds=B.stg[1-s],mx=st(a).hp;let best='lutte',bs=-1;for(const id of a.moves.filter((_,i)=>a.pp[i]>0)){const v=MV[id];let sc;
  if(v.p){const x=dmg(a,d,v,as,ds,1);sc=Math.min(1.2,x/Math.max(1,d.hp))*100*(v.a&&tal(a)!=='echo'?v.a/100:1);if(x>=d.hp)sc+=40+(v.pr&&spd(a,s)<spd(d,1-s)?40:0);if(STN[v.e]&&!d.st&&!immune(d,v.e))sc+=v.ch/4;if(lv&&v.t==='LUM'&&B.sky?.k==='eclipse')sc+=s===0?70:15}
  else if(STN[v.e])sc=d.st||immune(d,v.e)?0:(lv>1?62:40)*v.a/100;else if(/^\w+\+/.test(v.e))sc=as[v.e.slice(0,3)]<2&&a.hp>mx*.6?lv>1?52:30:3;else if(/^\w+-/.test(v.e))sc=ds[v.e.slice(0,3)]>-2?22:2;
  else if(v.e?.startsWith('heal'))sc=a.hp<mx*.45?lv>1?96:70:0;else if(ctx.SKY[v.e])sc=B.sky?.k===v.e?0:lv>1?72:30;else sc=10;sc+=Math.random()*[70,26,9][lv];if(sc>bs){bs=sc;best=id}}return best};
 const inflict=(s,k)=>{const m=side(s);if(m.hp<=0||m.st||immune(m,k))return;m.st=k;if(k==='slp')m.slp=rnd(2,4)};
 const entry=s=>{const t=tal(side(s));if(t==='levejour')B.sky={k:'sun',n:5};if(t==='eclipsetot')B.sky={k:'eclipse',n:5}};
 const use=(s,id)=>{const a=side(s),d=side(1-s),v=MV[id];if(a.hp<=0)return;
  if(a.st==='slp'){if(--a.slp>0)return;a.st=null}if(a.st==='par'&&Math.random()<.25)return;const pi=a.moves.indexOf(id);if(pi>=0)a.pp[pi]--;
  if(v.a&&tal(a)!=='echo'&&Math.random()*100>=v.a)return;
  if(v.p){let n=dmg(a,d,v,B.stg[s],B.stg[1-s]);if(tal(d)==='fermete'&&d.hp===st(d).hp&&n>=d.hp)n=d.hp-1;else if(!V3&&s===1&&!d.end&&n>=d.hp&&d.hp>1&&Math.random()<[0,0,0,.1,.15,.2][BOND]){n=d.hp-1;d.end=1}
   d.hp=Math.max(0,d.hp-n);gain(s,12+(eff(v.t,SP[d.sp].t)>1?8:0));gain(1-s,Math.max(6,Math.round(30*n/st(d).hp)));if(a.item==='orbe')a.hp=Math.max(0,a.hp-Math.floor(st(a).hp/10));berry(1-s);berry(s);if(v.t==='LUM'&&B.sky?.k==='eclipse')B.sky=null;
   if(v.e==='drain')a.hp=Math.min(st(a).hp,a.hp+(n>>1));if(v.e==='recoil')a.hp=Math.max(0,a.hp-Math.max(1,id==='lutte'?st(a).hp>>2:n>>2));
   if(d.hp>0&&v.ch&&Math.random()*100<v.ch){if(STN[v.e])inflict(1-s,v.e);else if(/-$/.test(v.e))B.stg[1-s][v.e.slice(0,3)]=Math.max(-6,B.stg[1-s][v.e.slice(0,3)]-1)}
   if(['NOR','ROC','OMB'].includes(v.t)&&a.hp>0&&!a.st&&(tal(d)==='electrise'||tal(d)==='corpsardent')&&Math.random()<.3)inflict(s,tal(d)==='electrise'?'par':'brn')}
  else if(STN[v.e])inflict(1-s,v.e);else if(ctx.SKY[v.e])B.sky={k:v.e,n:5};
  else if(v.e?.startsWith('heal')){const mx=st(a).hp,sk=B.sky?.k,nt=isN(),k=v.e==='heal'?.5:v.e==='heal_j'?(sk==='sun'||!nt&&sk!=='rain'?2/3:.25):(nt?.5:sk==='sun'?.25:1/3);a.hp=Math.min(mx,a.hp+Math.floor(mx*k))}
  else{const m=v.e.match(/^(\w+)([+-])(\d?)$/),sd=m[2]==='+'?s:1-s;B.stg[sd][m[1]]=Math.max(-6,Math.min(6,B.stg[sd][m[1]]+(m[2]==='+'?1:-1)*(+m[3]||1)))}};
 const best=()=>{const al=P.filter(m=>m.hp>0);return al.sort((a,b)=>score(b)-score(a))[0]},score=m=>Math.max(...m.moves.map(id=>MV[id].p?eff(MV[id].t,SP[fo.sp].t)*(MV[id].t===SP[m.sp].t?1.5:1)*MV[id].p:0))/eff(SP[fo.sp].t,SP[m.sp].t)+m.hp/st(m).hp*20;
 entry(1);me=best();entry(0);
 for(;turns<200;turns++){let pa=null;if(EV[0]&&B.ev[0]>=100&&!B.evU[0])awaken(0);if(EV[1]&&B.ev[1]>=100&&!B.evU[1]&&(F.filter(m=>m.hp>0).length===1||fo.hp<st(fo).hp*.7||Math.random()<.35))awaken(1);
  if(pots>0&&me.hp<st(me).hp*.3&&fo.hp>st(fo).hp*.2){pots--;me.hp=Math.min(st(me).hp,me.hp+60);me.st=null;pa='item'}
  else if(me.st&&me.st!=='brn'&&pots>0&&o.cures){pots--;me.st=null;pa='item'}
  const fit=fitems>0&&fo.hp<st(fo).hp*.3&&(fi===F.length-1||Math.random()<.6),fm=fit?null:ai(fo,me,1,o.lvl??2),pm=pa?null:ai(me,fo,0,1);
  let seq;if(pa)seq=[1];else if(fit)seq=[1,0];else{const a=MV[pm].pr,b=MV[fm].pr,sa=spd(me,0),sf=spd(fo,1);seq=a!==b?(a>b?[0,1]:[1,0]):sa!==sf?(sa>sf?[0,1]:[1,0]):Math.random()<.5?[0,1]:[1,0]}
  let ko=0;for(const s of seq){if(s&&fit){fitems--;fo.hp=Math.min(st(fo).hp,fo.hp+Math.max(60,st(fo).hp>>1));fo.st=null}else use(s,s?fm:pm);if(fo.hp<=0||me.hp<=0){ko=1;break}}
  if(!ko){for(const s of[0,1]){const m=side(s);if(m.hp<=0)continue;if(m.st==='brn'||m.st==='psn')m.hp=Math.max(0,m.hp-Math.max(1,Math.floor(st(m).hp/(m.st==='brn'?16:8))));if(tal(m)==='seve'&&!isN())m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));if(m.item==='miettes'&&m.hp>0)m.hp=Math.min(st(m).hp,m.hp+Math.max(1,st(m).hp>>4));berry(s);if(m.hp>0)gain(s,6)}if(B.sky&&--B.sky.n<=0)B.sky=null}
  if(fo.hp<=0){if(!F.some(m=>m.hp>0))return{win:1,turns,left:P.filter(m=>m.hp>0).length};fo=nextFoe();fi=F.indexOf(fo);B.stg[1]={atk:0,def:0,spd:0};entry(1)}
  if(me.hp<=0){if(!P.some(m=>m.hp>0))return{win:0,turns,fi};me=best();B.stg[0]={atk:0,def:0,spd:0};entry(0)}}
 return{win:0,turns}}
const run=(name,mk,mkF,o,N=2000)=>{let w=0,t=0,l=0,fl=[0,0,0,0,0];for(let i=0;i<N;i++){const r=sim(mk(),mkF(),o);w+=r.win;t+=r.turns;l+=r.left||0;if(!r.win)fl[r.fi??4]++}console.log(name.padEnd(46),'victoire',(w/N*100).toFixed(0).padStart(3)+'%','· tours',(t/N).toFixed(1),'· restants',(l/Math.max(1,w)).toFixed(1),'· défaites sur',fl.join('/'))};
const T=(...a)=>a.map(([s,l,mv,it])=>Object.assign(mon(s,l,mv),{item:it||null}));
const BOSS={
 brasia:()=>T(['rocaillon',12,['jetpierre','durcir','grimace','charge']],['rocaroc',15,['jetpierre','murroc','belier','grimace']]),
 selene1:()=>T(['nocturelle',15,['ombrefurtive','hypnose','morsure','vent']],['magmor',16,['feufollet','braise','durcir','crocsfeu']],['ombrelin',16,['hypnose','morsure','ombrefurtive','grondement']]),
 vex1:()=>T(['ombrelin',17,['hypnose','morsure','ombrefurtive','grondement']],['magmor',18,['feufollet','crocsfeu','durcir','braise']],['noctyrex',20,['cri','morsure','ombrefurtive','grimace']]),
 maelle:()=>T(...(process.env.M||'crapaflot:27:dansepluie,aquajet,bulles,grimace|torrentor:28:vague,morsure,durcir,hydro|crapaflot:29:dansepluie,vague,plaquage,aquajet').split('|').map(x=>{const[a,b,c,d]=x.split(':');return[a,+b,c.split(','),V3?null:d]})),
 selene2:()=>T(['nocturelle',29,['hypnose','nuit','clairlune','ombrefurtive']],['magmor',30,['feufollet','lanceflam','durcir','crocsfeu']],['noctyrex',31,['hypnose','nuit','morsure','cri']]),
 vex2:()=>T(['nocturelle',29,['hypnose','nuit','clairlune','ombrefurtive']],['magmor',30,['feufollet','lanceflam','jetpierre','durcir']],['noctyrex',30,['cri','nuit','morsure','ombrefurtive']],['nocturion',31,['lunenoire','rayonnoir','ombrefurtive','grondement']])};
const ST={flamiot:['flamiot','brasilion'],goutelin:['goutelin','torrentor'],pousseron:['pousseron','sylvorne']},sv=(s,l)=>l>=16?ST[s][1]:ST[s][0];
const V=process.env.VAR;if(V&&0){const[l1,l2]=V.split(',').map(Number);BOSS.vex2=()=>T(['nocturelle',+(process.env.A||30),['hypnose','nuit','clairlune','ombrefurtive']],['magmor',+(process.env.A||30)+1,['feufollet','lanceflam','jetpierre','durcir']],['noctyrex',l2,['cri','nuit','morsure','ombrefurtive']],['nocturion',l1,(process.env.MV||'lunenoire,rayonnoir,ombrefurtive,grondement').split(',')])}
for(const s of Object.keys(ST)){console.log('— Départ :',s);
 run('Brasia  (Nv 13 + Larvigne 11 + Têtardin 11 + Piafou 11)',()=>T([sv(s,13),13],['larvigne',11],['tetardin',11],['piafou',11]),BOSS.brasia,{pots:3,items:1});
 run('Brasia  (Nv 13 + Piafou 11 + Ratounet 11, sans contre)',()=>T([sv(s,13),13],['piafou',11],['ratounet',11]),BOSS.brasia,{pots:3,items:1});
 run('Sélène 1 (Nv 17 + 3 x Nv 15, Total Soin)',()=>T([sv(s,17),17],['larvigne',15],['tetardin',15],['volticelle',15]),BOSS.selene1,{pots:4,items:1,cures:1});
 run('Vex 1   (Nv 19 + 3 x Nv 17)',()=>T([sv(s,19),19],['larvigne',17],['tetardin',17],['rocaillon',17]),BOSS.vex1,{pots:3,items:1,ev:1});
 run('Maëlle  (Nv 26 + 4 x Nv 24)',()=>T([sv(s,26),26],['papivigne',24],['crapaflot',24],['volticelle',24],['rocaroc',24]),BOSS.maelle,{pots:4,items:2,ev:1});
 run('Sélène 2 (Nv 29 + 4 x Nv 27)',()=>T([sv(s,29),29],['papivigne',27],['crapaflot',27],['bourdonnerre',27],['rocaroc',27]),BOSS.selene2,{pots:4,items:1,cures:1,night:1});
 run('Vex 2   (Nv 32 + 5 x Nv 30, avec Phalumine)',()=>T([sv(s,32),32],['phalumine',30],['crapaflot',30],['bourdonnerre',30],['rocaroc',30],['papivigne',30]),BOSS.vex2,{pots:5,items:2,night:1,ev:1});
 run('Vex 2   (Nv 32 + 5 x Nv 30, sans LUMIÈRE)',()=>T([sv(s,32),32],['noctyrex',30],['crapaflot',30],['bourdonnerre',30],['rocaroc',30],['papivigne',30]),BOSS.vex2,{pots:5,items:2,night:1,ev:1})}
