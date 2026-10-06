// =====================================================================
// EXTENSION 12.0 — Les Héritiers du Cycle : Pension des Coteaux, œufs et hérédité, Couveuse, l'œuf d'Elias,
// échanges avec les habitants, mode Expert (plafond de niveau), Salle de jeux de Volterre (Mémo du Cycle).
// =====================================================================
const LEG12=['solarion','nocturion','crepuscel','aurorelle','eclipsar','presagelle','heliote','seleniote','errenard','masquaserp'];
const VIVI12=['vivipere','vivicendre','viviphyte','vivitron','vividactyle','vivisource'];
const EGGP=["...oooo...","..owwwwo..",".owwwyywo.",".owwwyywo.","owwwwwwwwo","owyywwwwlo","owyywwwwlo","owwwwwyylo","owwwwwyylo",".owwwwwlo.","..ollllo..","...oooo..."];
const eggIco=e=>{const k='egg_'+(e.el?'elias':SP[e.sp].t);return ICO[k]||(ICO[k]=e.el?icon(EGGP,{w:'#3a3a8a',y:'#ffe8a0',l:'#26265e'}):icon(EGGP,{w:'#fff8e8',y:TY[SP[e.sp].t][1],l:'#d8ccb0'}))};
ICO.couveuse=icon(EGGP,{w:'#e8e0d0',y:'#c8902a',l:'#b8ac98'});
IT.rubanher=['Ruban d\'Héritage',4000,'Tenu par une créature déposée à la Pension : son tempérament est transmis à coup sûr à l\'œuf.',0,'held'];ICO.rubanher=icon(["..r..r..",".rRr.rR.","..rrrr..","...rr...","..r..r..",".r....r.","r......r","........"],{r:'#e05a8a',R:'#a83a6a'});
IT.jeton=['Jeton de Jeu',0,'Gagné au Mémo du Cycle, dans la Salle de jeux de Volterre. Le gérant les échange contre des lots.',0,'quest'];ICO.jeton=icon(["..oooo..",".oyyyyo.","oyYwwYyo","oyYwYYyo","oyYwYYyo","oyYwwYyo",".oyyyyo.","..oooo.."]);
// --- Familles
const fam12=r=>Object.keys(SP).filter(k=>root11(k)===r);
const famMoves=r=>{const S=new Set();for(const k of fam12(r))for(const[,mv]of SP[k].learn)if(MV[mv])S.add(mv);return S};
// --- Pension : compatibilité, ponte
function penCompat(){const[a,b]=G.pen||[];if(!a||!b)return 0;if([a,b].some(m=>LEG12.includes(m.sp)))return 0;const va=VIVI12.includes(a.sp),vb=VIVI12.includes(b.sp);
 if(root11(a.sp)===root11(b.sp))return 2;if(va||vb)return 1;return SP[a.sp].t===SP[b.sp].t?1:0}
const COMPT=['Ils s\'ignorent complètement. Pas d\'œuf à espérer, je le crains.','Ils s\'entendent bien. Un œuf, peut-être, avec un peu de patience.','Ils sont inséparables ! Un œuf ne devrait pas tarder.'];
function makeEgg(){const[a,b]=G.pen,va=VIVI12.includes(a.sp),vb=VIVI12.includes(b.sp);let sp=va&&!vb?root11(b.sp):vb&&!va?root11(a.sp):root11((Math.random()<.5?a:b).sp);
 const R=G.pen.find(m=>m.item==='rubanher'),nat=R?R.nat:Math.random()<.5?(Math.random()<.5?a:b).nat:natRnd();
 const fm=famMoves(sp),base=new Set(mon(sp,1).moves),mv=[...new Set([...a.moves,...b.moves])].filter(x=>fm.has(x)&&!base.has(x)).slice(0,2);
 const sh=Math.random()<(G.pen.some(m=>m.sh)?1/16:1/64)*(G.keys.charme?2:1);
 return{sp,nat,mv,sh:sh?1:0,steps:SP[sp].cr>=150?400:SP[sp].cr>=60?700:1000,par:[a.sp,b.sp]}}
// --- Pas : pension, ponte, couveuse
const step12=onStep;onStep=async function(){await step12.apply(this,arguments);if(!G)return;
 if(G.pen?.length){for(const m of G.pen)m.exp+=1;if(G.pen.length===2&&!G.penEgg&&++G.penS>=128){G.penS=0;const c=penCompat();if(c&&Math.random()<(c===2?.5:.25)){G.penEgg=1;if(!f().tip_egg)tip('egg','La Pension des Coteaux a quelque chose pour toi : un œuf ! Va voir Papi Firmin.')}}}
 if(!G.eggs?.length||mode!=='world')return;const hot=G.party.some(m=>m.hp>0&&['corpsardent','torche'].includes(SP[m.sp].tal));for(const e of G.eggs)e.steps-=hot?2:1;
 const e=G.eggs.find(e=>e.steps<=0);if(e)await hatch(e)};
// --- Éclosion
async function hatch(e){G.eggs.splice(G.eggs.indexOf(e),1);const m=mon(e.sp,1);m.nat=e.nat;m.sh=e.sh||0;m.aff=HEARTS[e.el?2:1];m.egg=e.el?'elias':1;
 for(const mv of e.mv||[])if(MV[mv]&&!m.moves.includes(mv)){m.moves.push(mv);if(m.moves.length>4)m.moves.shift()}m.pp=m.moves.map(x=>MV[x].pp);m.hp=st(m).hp;
 await say('Hein ? L\'œuf dans la Couveuse bouge !');const t0=now();let out=0;
 ui.panel=()=>{const k=now()-t0;X.fillStyle='rgba(18,14,34,.75)';X.fillRect(0,0,W,H);if(!out){const w=k>600?Math.sin(k/(k>1800?40:90))*(k>1800?.25:.12):0;X.save();X.translate(W/2,H/2+40);X.rotate(w);X.drawImage(eggIco(e),-40,-96,80,96);X.restore()}
  else{const s=Math.min(1,(now()-out)/300);X.drawImage(monSpr(m.sp,0,128,m.sh),W/2-64,H/2-90+(1-s)*20,128,128);txt(SP[m.sp].name.toUpperCase(),W/2,H/2+64,'#ffffff',{al:'c'})}};
 sfx('sel');await wait(1200);sfx('sel');await wait(900);sfx('hit');await wait(500);ui.flash=1;ui.flashC='#ffffff';sfx('evo');out=now();await wait(700);jingle('item');
 dex(m.sp,2);await say(`${SP[m.sp].name} est sorti de l'œuf !${m.sh?' Ses couleurs sont… différentes ! Il est CHROMATIQUE !':''}`);
 await say(`${SP[m.sp].name} a l'air ${NAT[m.nat][0].toLowerCase()}. ${e.mv?.length?'Il connaît déjà '+e.mv.map(x=>MV[x].n).join(' et ')+', héritée de ses parents !':'Il te regarde comme si tu étais le centre du monde.'}`);
 if(e.el){await say('Un petit papier était glissé contre la coquille. L\'écriture de Papa…');
  await say('« Si tu lis ceci, c\'est que tu as rétabli le Cycle. Je n\'en ai jamais douté. Cet œuf, je l\'ai trouvé sous le dôme, la nuit où les étoiles sont tombées sur Aurélys. »','Elias',0,'dad');
  await say('« Il attendait quelqu\'un qui regarde le ciel sans en avoir peur. Je crois que c\'est toi. Prends soin de lui. Papa. »','Elias',0,'dad')}
 ui.panel=null;f().hatched=(f().hatched||0)+1;if(G.party.length<6)G.party.push(m);else{G.box.push(m);await say(`${SP[m.sp].name} est envoyé dans la Boîte.`)}save()}
// --- Pension : Mamie Odette (dépôt, retrait) et Papi Firmin (les œufs)
const pensionFee=m=>100+100*Math.max(0,m.lv0===undefined?0:penLv(m)-m.lv0);
function penLv(m){let l=m.lv;while(l<100&&l<expCap()&&m.exp>=xpFor(l+1))l++;return l}
function penOut(m){const L=penLv(m);while(m.lv<L){m.lv++;for(const[l,mv]of SP[m.sp].learn)if(l===m.lv&&!m.moves.includes(mv)&&MV[mv]){m.moves.push(mv);if(m.moves.length>4)m.moves.shift()}}
 m.exp=Math.min(m.exp,xpFor(Math.min(100,m.lv+1))-1);m.pp=m.moves.map(x=>MV[x].pp);delete m.lv0;fullHeal(m)}
async function odette(){const O='Mamie Odette';G.pen??=[];
 if(!f().penI){f().penI=1;await say('Bienvenue à la Pension des Coteaux, mon petit ! Mon Firmin et moi, on garde les créatures des dresseurs pressés.',O,0,'granny');
  await say('Confie-m\'en deux. Pendant que tu voyages, elles gagnent de l\'expérience… et si elles s\'entendent bien, il arrive qu\'on trouve un OEUF près de la clôture !',O,0,'granny');
  await say('Les créatures d\'une même famille s\'entendent à merveille ; celles du même type, plutôt bien. Et les Vivipère s\'entendent avec tout le monde, ces petits caméléons !',O,0,'granny');
  G.keys.couveuse=1;jingle('item');ui.pop={ic:ICO.couveuse,t0:now()};await say('Tiens, prends cette COUVEUSE : elle garde jusqu\'à trois œufs au chaud. Ils éclosent pendant que tu marches. Une créature au talent Corps Ardent ou Torche dans ton équipe les fait éclore deux fois plus vite.',O,0,'granny');save()}
 for(;;){const P=G.pen;show(P.length?`${P.map(m=>`${nm(m)} (Nv ${penLv(m)})`).join(' et ')} ${P.length>1?'vont':'va'} bien.${P.length===2?' '+COMPT[penCompat()]:''}`:'Que puis-je pour toi ?',O);
  const i=await choose(['DÉPOSER','RETIRER','AU REVOIR'],{w:180});ui.text=null;if(i<0||i===2)return say('Reviens quand tu veux, mon petit !',O,0,'granny');
  if(i===0){if(P.length>=2){await say('J\'en garde déjà deux. Mes vieux bras n\'en porteraient pas plus !',O,0,'granny');continue}if(G.party.length<2){await say('Il faut garder au moins une créature avec toi.',O,0,'granny');continue}
   const j=await partyMenu('Déposer qui ?');if(j<0)continue;const m=G.party.splice(j,1)[0];m.lv0=m.lv;P.push(m);G.penS=0;sfx('ok');await say(`Tu confies ${nm(m)} à la Pension.${m.item==='rubanher'?' Son Ruban d\'Héritage transmettra son tempérament.':''}`,0);save()}
  if(i===1){if(!P.length){await say('Je ne garde aucune de tes créatures pour l\'instant.',O,0,'granny');continue}if(G.party.length>=6){await say('Ton équipe est pleine !',O,0,'granny');continue}
   const j=P.length>1?await choose(P.map(m=>`${nm(m)}  Nv ${penLv(m)}`),{w:220,title:'Retirer'}):0;if(j<0)continue;const m=P[j],fee=pensionFee(m),g=penLv(m)-m.lv;
   if(!await ask(`${nm(m)}${g>0?` a gagné ${g} niveau${g>1?'x':''}.`:''} Ça fera ${fee} pièces. D'accord ?`,O))continue;if(G.money<fee){await say('Tu n\'as pas assez d\'argent, mon petit.',O,0,'granny');continue}
   G.money-=fee;P.splice(j,1);penOut(m);G.party.push(m);sfx('lv');await say(`${nm(m)} te saute dans les bras !`);save()}}}
async function firmin(){const Fn='Papi Firmin',F=f();G.eggs??=[];
 if(F.balance&&!F.eggElias&&F.penI){if(G.eggs.length>=3)return say('J\'ai quelque chose de très spécial pour toi… mais ta Couveuse est pleine. Fais d\'abord éclore un œuf.',Fn,0,'old');
  await say('Approche, j\'ai quelque chose à te dire. Il y a des années, un astronome est passé par ici. Un grand type, la tête dans les étoiles.',Fn,0,'old');
  await say('Il m\'a confié un œuf qui brillait faiblement, et il m\'a dit : « Gardez-le au chaud. Le jour où mon enfant aura rétabli le Cycle, donnez-le-lui. »',Fn,0,'old');
  await say('Je n\'ai jamais compris ce qu\'il voulait dire… jusqu\'à aujourd\'hui. Ton père croyait en toi bien avant tout le monde.',Fn,0,'old');
  F.eggElias=1;G.eggs.push({sp:'nebulin',nat:'reveur',mv:['voilestellaire'].filter(x=>MV[x]),sh:1,steps:500,el:1,par:[]});jingle('item');await say('Tu reçois l\'OEUF D\'ELIAS ! Il rejoint ta Couveuse.');return save()}
 if(G.penEgg){if(G.eggs.length>=3)return say('Ta Couveuse est pleine ! Fais éclore un œuf, puis reviens chercher celui-ci.',Fn,0,'old');
  const e=makeEgg();G.penEgg=0;G.eggs.push(e);jingle('item');ui.pop={ic:eggIco(e),t0:now()};await say('Ah, te voilà ! On a trouvé ça près de la clôture ce matin. Je ne sais pas d\'où il sort… enfin, je m\'en doute un peu !',Fn,0,'old');
  await say(`Tu reçois un OEUF ! Il rejoint ta Couveuse (${G.eggs.length}/3).`);await tipSay('egg2','Les œufs éclosent en marchant. Le menu (carte de dresseur) montre leur progression. Un petit éclos hérite parfois du tempérament et des capacités de ses parents.');return save()}
 if(!F.penI)return say('Bonjour ! C\'est ma femme, Odette, qui s\'occupe des dépôts. Moi, je surveille la clôture.',Fn,0,'old');
 const c=G.pen?.length===2?penCompat():-1;return say(c<0?'Confie deux créatures à Odette. Si elles s\'entendent, je te préviendrai dès qu\'un œuf apparaît !':COMPT[c].replace('Ils','Tes deux protégés').replace('Tes deux protégés s\'ignorent','Tes deux protégés s\'ignorent'),Fn,0,'old')}
MAPS.coteaux.npcs.push({x:16,y:12,t:'old',d:0,name:'Papi Firmin',qm:()=>G.penEgg||f().balance&&!f().eggElias&&f().penI,fn:()=>firmin()},{x:17,y:12,t:'granny',d:0,name:'Mamie Odette',fn:()=>odette()},
 {x:14,y:13,t:'mon',d:2,get sp(){return G?.pen?.[0]?.sp||'ratounet'},cond:()=>!!G?.pen?.[0],fn:()=>say(`${nm(G.pen[0])} gambade dans l'enclos. Il a l'air heureux.`)},
 {x:16,y:13,t:'mon',d:3,get sp(){return G?.pen?.[1]?.sp||'ratounet'},cond:()=>!!G?.pen?.[1],fn:()=>say(`${nm(G.pen[1])} se repose au soleil.`)});
// Couveuse visible sur la carte de dresseur (menu)
const card12=drawCard;drawCard=function(){card12();const E=G.eggs||[];if(!E.length)return;panel(8,264,302,46);txt('COUVEUSE',22,284,C.acc,{mini:1});
 E.forEach((e,i)=>{const x=96+i*70;X.drawImage(eggIco(e),x,272,20,24);const p=e.steps<=60?'Presque !':e.steps<=200?'Ça bouge':'Patience';txt(p,x+24,284,C.ink2,{mini:1});bar(x+24,290,40,1-Math.min(1,e.steps/(e.el?500:1000)),C.gold,4)})};
// --- Échanges avec les habitants (une fois chacun) : [id, carte, x, y, apparence, nom, famille voulue, donne, niveau, objet, tempérament, condition, intro, merci]
const TRD=[['malo','ville',5,13,'kid','Petit Malo','ratounet','ricanoir',12,'baiesoin','espiegle',()=>f().badge,'Mon Ricanoir rigole tout le temps, même la nuit. Maman en a marre ! J\'aimerais un Ratounet, c\'est plus calme…','Ricanoir va adorer tes aventures ! Et moi, je vais enfin dormir.'],
 ['yann','port',9,13,'sailor','Matelot Yann','lumipeche',()=>third12(),20,'baiesoin','robuste',()=>1,'J\'ai recueilli un petit starter qu\'un dresseur avait abandonné sur le quai. Il mérite de voyager. Moi, je rêve d\'un Lumipêche pour éclairer ma cale.','Prends soin de lui, moussaillon. Il en a vu, des tempêtes.'],
 ['iris','coteaux',6,4,'botanist','Botaniste Iris','herissou','tisonnet',20,'charbon','vif',()=>1,'Mon Tisonnet a mis le feu à mes semis… deux fois. Un Hérissou serait parfait pour mes vignes. Tu échanges ?','Tisonnet sera plus heureux avec un dresseur qui marche beaucoup. Et mes vignes respirent !'],
 ['zoe','lunevie',3,8,'girl','Noctambule Zoé','lueurette','nounoursol',24,'baiesoin','placide',()=>1,'Je vis la nuit, et mon Nounoursol, lui, dort dès que le soleil se couche. On ne se voit jamais ! Une Lueurette, ce serait mieux pour moi.','Lueurette et moi, on va veiller ensemble. Merci !'],
 ['tom','volterre',3,12,'scout','Ingénieur Tom','filserp',()=>f().rs||'goutelin',30,'baiesoin','fougueux',()=>f().badge4,'Un rival m\'a laissé son starter après une défaite… il voulait « repartir de zéro ». Moi, je veux un Filserp pour mes câbles. Marché conclu ?','Il a un sacré caractère. Je crois qu\'il cherchait quelqu\'un comme toi.']];
const third12=()=>['flamiot','goutelin','pousseron'].find(k=>k!==f().starter&&k!==(f().rs||'goutelin'))||'pousseron';
const trdSp=T=>typeof T[7]==='function'?T[7]():T[7];
async function trader(T){const[id,,,,look,who,want,,lv,item,nat,cond,intro,thx]=T,F=f(),gv=trdSp(T);
 if(F['trd_'+id])return say(thx,who,0,look);if(!cond())return say('Je cherche à faire un échange… mais tu n\'as pas l\'air prêt. Reviens plus tard !',who,0,look);
 await say(intro,who,0,look);if(!await ask(`Échanger un ${SP[want].name} (ou une de ses évolutions) contre ${SP[gv].name} ?`,who))return say('Dommage… Repasse si tu changes d\'avis !',who,0,look);
 const ok=G.party.map((m,i)=>root11(m.sp)===want?i:-1).filter(i=>i>=0);if(!ok.length)return say(`Tu n'as pas de ${SP[want].name} dans ton équipe. On en trouve ${SP[want].name==='Ratounet'?'sur la Route 1':'dans la nature'} !`,who,0,look);
 let j=ok[0];if(ok.length>1){j=await partyMenu('Échanger qui ?');if(!ok.includes(j))return}const o=G.party[j];
 if(o.eq)setEq(o,null);if(o.item){G.bag[o.item]=(G.bag[o.item]||0)+1;o.item=null}
 const m=mon(gv,lv,{item});m.nat=nat;m.ot=who;await fadeTo(1,300);sfx('ok');await wait(300);G.party[j]=m;await fadeTo(0,300);dex(gv,2);F['trd_'+id]=1;jingle('item');
 await say(`Tu envoies ${nm(o)} à ${who}… et tu reçois ${SP[gv].name} !`);await say(`Un ${SP[gv].name} échangé gagne plus d'EXP (x1,5). Il tient ${IT[item]?.[0]||'un objet'}.`);await say(thx,who,0,look);save()}
for(const T of TRD)MAPS[T[1]]?.npcs.push({x:T[2],y:T[3],t:T[4],d:0,name:T[5],qm:()=>!f()['trd_'+T[0]]&&T[11](),fn:()=>trader(T)});
const xp12=gainXp;gainXp=function(m,n,q){if(m?.ot)n=Math.floor(n*1.5);const c=expCap();if(f()?.expert&&m.lv>=c){if(B&&!q&&!(B.capS??=new Set()).has(m)){B.capS.add(m);return say(`${nm(m)} a atteint le niveau maximum du mode Expert (${c}).`,0,1)}return}
 if(f()?.expert)n=Math.max(0,Math.min(n,xpFor(c)-m.exp));return xp12(m,n,q)};
// --- Mode Expert : dresseurs plus forts, plafond de niveau selon les badges, primes plus généreuses
const expCap=()=>{const F=f();return!F?.expert||F.balance?100:F.badge4?46:F.badge2?34:F.badge?30:15};
const battle12=battle;battle=async function(foes,o={}){const F=f(),ex=F?.expert&&o.tr&&!NOEVO10;
 if(ex)for(const m of foes){const d=Math.max(1,Math.round(m.lv*.08))+(o.tr.boss?1:0);m.lv=Math.min(100,m.lv+d);m.exp=xpFor(m.lv);m.hp=st(m).hp;if(!m.item&&Math.random()<(o.tr.boss?1:.4))m.item='baiesoin'}
 const r=await battle12(foes,o);if(ex&&r==='win'){const b=Math.floor((o.tr.money||0)*.25);if(b){G.money+=b;await say(`Prime Expert : ${b} pièces de plus.`)}if(o.tr.boss)F.expB=(F.expB||0)+1}return r};
async function difficulty(){const F=f(),O=F.expert;
 await say(O?'Mode EXPERT actif : dresseurs plus forts (environ +8 % de niveaux, baies pour les boss), niveau maximum selon tes badges, primes +25 %.':'Mode NORMAL. Le mode EXPERT rend les dresseurs plus forts (environ +8 % de niveaux, baies pour les boss), plafonne le niveau de tes créatures selon tes badges (15, 30, 34, 46, puis libre) et augmente les primes de 25 %.');
 if(!await ask(O?'Repasser en mode NORMAL ?':'Passer en mode EXPERT ? (On peut changer à tout moment.)'))return;F.expert=O?0:1;sfx('ok');save();return say(F.expert?`Mode EXPERT activé. Niveau maximum actuel : ${expCap()}.`:'Mode NORMAL activé.')}
// --- Salle de jeux de Volterre : Mémo du Cycle
let MEMO=null;
async function memoGame(){const pool=DEX.filter(k=>G.dex[k]>0&&!LEG12.includes(k)),src=(pool.length>=8?pool:DEX.filter(k=>!LEG12.includes(k))).slice();
 const P=[];while(P.length<8){const k=src.splice(rnd(0,src.length-1),1)[0];P.push(k)}const cards=[...P,...P].map(sp=>({sp,up:0,ok:0}));for(let i=cards.length-1;i>0;i--){const j=rnd(0,i);[cards[i],cards[j]]=[cards[j],cards[i]]}
 MEMO={cards,cur:0,miss:0,pairs:0,max:10};const M=MEMO,gx=W/2-118,gy=44,cw=56,ch=56;
 ui.panel=()=>{panel(8,8,464,304);txt('MÉMO DU CYCLE',24,30,C.acc,{sh:0});txt(`PAIRES ${M.pairs}/8   ERREURS ${M.miss}/${M.max}`,456,30,C.ink2,{mini:1,al:'r'});
  M.cards.forEach((c,i)=>{const x=gx+(i%4)*60,y=gy+(i>>2)*60,sel=i===M.cur;rr(x-2,y-2,cw+4,ch+4,3,sel?C.acc:C.ink);if(c.up||c.ok){rr(x,y,cw,ch,2,c.ok?'#e8f6e0':'#fff8ee');X.drawImage(monSpr(c.sp,0,48),x+4,y+4,48,48)}
   else{rr(x,y,cw,ch,2,'#3a3266');X.drawImage(ICO.star,x+20,y+20,16,16)}});txt('FLÈCHES : CHOISIR   A : RETOURNER   B : ABANDONNER',W/2,296,C.mute,{mini:1,al:'c'})};
 let first=-1;for(;;){if(M.pairs===8||M.miss>=M.max)break;const k=await key();
  if(k==='b'){if(await ask('Abandonner la partie ? Tu gardes les jetons des paires trouvées.'))break;continue}
  if(['left','right','up','down'].includes(k)){const d={left:-1,right:1,up:-4,down:4}[k];M.cur=(M.cur+d+16)%16;sfx('sel');continue}
  if(k!=='a')continue;const c=M.cards[M.cur];if(c.up||c.ok)continue;c.up=1;sfx('ok');if(first<0){first=M.cur;continue}
  const a=M.cards[first];if(a.sp===c.sp){a.ok=c.ok=1;a.up=c.up=0;M.pairs++;jingle('item')}else{M.miss++;sfx('bump');await wait(700);a.up=c.up=0}first=-1}
 await wait(300);ui.panel=null;const perfect=M.pairs===8&&M.miss<=4,tk=M.pairs+(M.pairs===8?4:0)+(perfect?4:0);MEMO=null;
 G.bag.jeton=(G.bag.jeton||0)+tk;if(perfect)f().memoP=1;f().memoN=(f().memoN||0)+1;
 return say(M.pairs===8?`Toutes les paires !${perfect?' Partie PARFAITE !':''} Tu gagnes ${tk} jetons.`:`Partie terminée : ${M.pairs} paire${M.pairs>1?'s':''}. Tu gagnes ${tk} jeton${tk>1?'s':''}.`)}
const PRZ=[['biscuit',3],['etinc',4],['hyperpotion',5],['rubanher',12],['rappelmax',15],['pierreaube',20],['bq:berger',40]];
async function felix(){const Fx='Gérant Félix',F=f();
 if(!F.memoI){F.memoI=1;await say('Bienvenue à la Salle de jeux de Volterre ! Depuis que le courant est revenu, mes machines tournent à plein régime !',Fx,0,'scout');
  await say('Notre jeu vedette : le MÉMO DU CYCLE. Seize cartes, huit paires de Pixémons. Retrouve-les toutes avant dix erreurs ! Chaque paire rapporte un jeton, et une partie parfaite en rapporte bien plus.',Fx,0,'scout')}
 for(;;){const free=F.memoD!==dayN();show(`Jetons : ${G.bag.jeton||0}. ${free?'Ta partie du jour est offerte !':'Une partie : 300 pièces.'}`,Fx);
  const i=await choose(['JOUER','LOTS','AU REVOIR'],{w:160,icons:[ICO.jeton,ICO.coin,ICO.close]});ui.text=null;if(i<0||i===2)return say('Reviens tenter ta chance !',Fx,0,'scout');
  if(i===0){if(!free){if(G.money<300){await say('Il faut 300 pièces pour jouer.',Fx,0,'scout');continue}G.money-=300}else F.memoD=dayN();await memoGame();save()}
  if(i===1){const lab=([k])=>k.startsWith('bq:')?BQ[k.slice(3)][0]:IT[k][0],ic=([k])=>k.startsWith('bq:')?ICO['bq_'+k.slice(3)]:ICO[k];
   for(;;){const j=await choose(PRZ.map(lab),{x:W-300,y:8,w:292,vis:7,title:`Jetons : ${G.bag.jeton||0}`,icons:PRZ.map(ic),info:j=>{const[k]=PRZ[j];return k.startsWith('bq:')?{icon:bigIco('bq_'+k.slice(3)),s:bqInfo(k.slice(3))}:{icon:bigIco(k),s:IT[k][2]}},
     dis:j=>(G.bag.jeton||0)<PRZ[j][1],draw:(j,x,y,sel,pr)=>{const c=pr?'#ffffff':(G.bag.jeton||0)<PRZ[j][1]?C.mute:C.ink,o={sh:pr?0:undefined};txt(lab(PRZ[j]),x,y+19,c,o);txt(PRZ[j][1],x+232,y+19,c,{...o,al:'r'})}});
    if(j<0)break;const[k,p]=PRZ[j];if((G.bag.jeton||0)<p){await say('Pas assez de jetons !',Fx,0,'scout');continue}G.bag.jeton-=p;if(k.startsWith('bq:')){gainBq(k.slice(3));jingle('item')}else give(k);await say(`Tu reçois ${lab(PRZ[j])} !`)}save()}}}
MAPS.volterre.npcs.push({x:16,y:6,t:'scout',d:0,name:'Gérant Félix',fn:()=>felix()});
// --- Sauvegarde, journal, succès, nouveautés
const norm12=normalize;normalize=function(g){g=norm12(g);if(!g)return g;g.pen??=[];g.eggs??=[];g.penS??=0;g.penEgg??=0;for(const m of g.pen)if(!m.nat||!NAT[m.nat])m.nat=natRnd();g.eggs=g.eggs.filter(e=>SP[e.sp]);if(g.v<12){g.wn=1;g.v=12}return g};
const quests12=quests;quests=function(){const Q=quests12(),F=f(),n=TRD.filter(T=>F['trd_'+T[0]]).length;
 if(F.penI)Q.push(['La Pension des Coteaux',1,`${G.pen?.length?'En pension : '+G.pen.map(nm).join(', ')+'. ':''}${G.eggs?.length?'Couveuse : '+G.eggs.length+'/3 œufs. ':''}${F.hatched?F.hatched+' œuf'+(F.hatched>1?'s':'')+' éclos. ':''}${F.balance&&!F.eggElias?'Papi Firmin a quelque chose de très spécial pour toi.':''}`.trim()||'Confie deux créatures compatibles à Mamie Odette : un œuf apparaîtra peut-être.']);
 else if(F.badge)Q.push(['La Pension des Coteaux',1,'Un vieux couple garde les créatures des dresseurs, sur les Coteaux d\'Aurore. On dit que des œufs y apparaissent…']);
 if(F.badge)Q.push(['Échanges',n>=TRD.length?2:1,`${n}/${TRD.length} échanges faits. Des habitants de Cendreville, Port-Miroir, des Coteaux, de Lunévie et de Volterre cherchent une créature précise.`]);
 if(F.memoI)Q.push(['Salle de jeux de Volterre',F.memoP?2:1,`Mémo du Cycle : ${F.memoN||0} partie${(F.memoN||0)>1?'s':''}.${F.memoP?' Partie parfaite réussie !':' Une partie parfaite (4 erreurs au plus) rapporte gros.'}`]);return Q};
ACH.push(['egg1','Premier souffle','Faire éclore un œuf.',()=>(f().hatched||0)>=1,['biscuit',3]],['egg10','Éleveur passionné','Faire éclore 10 œufs.',()=>(f().hatched||0)>=10,['rubanher',1]],
 ['elias','Le cadeau d\'Elias','Faire éclore l\'œuf d\'Elias.',()=>[...G.party,...G.box].some(m=>m.egg==='elias'),['pierreaube',1]],['trade5','Bon voisinage','Faire les cinq échanges d\'Aurélys.',()=>TRD.every(T=>f()['trd_'+T[0]]),['etinc',8]],
 ['memo','Mémoire d\'éléphant','Réussir une partie parfaite au Mémo du Cycle.',()=>!!f().memoP,['etinc',5]],['expert','Sans filet','Battre 5 boss en mode Expert.',()=>(f().expB||0)>=5,['rappelmax',2]]);
NEWS.splice(0,NEWS.length,[()=>ICO.couveuse,'La Pension des Coteaux','Confie deux créatures à Odette et Firmin : elles gagnent de l\'EXP, et parfois un œuf apparaît. Couveuse de 3 œufs.'],
 [()=>ICO.rubanher,'Hérédité','Le petit hérite du tempérament (sûr avec le Ruban d\'Héritage), de capacités de ses parents, et a plus de chances d\'être chromatique.'],
 [()=>ICO.star,'L\'œuf d\'Elias','Après avoir rétabli le Cycle, Papi Firmin garde un cadeau laissé par ton père.'],
 [()=>ICO.team,'Échanges','Cinq habitants proposent un échange, dont deux starters. Une créature échangée gagne plus d\'EXP.'],
 [()=>ICO.jeton,'Salle de jeux de Volterre','Le Mémo du Cycle : retrouve les paires, gagne des jetons et échange-les contre des lots.'],
 [()=>ICO.gear,'Mode Expert','Dans les options : dresseurs plus forts, niveau maximum selon les badges, primes +25 %.']);
