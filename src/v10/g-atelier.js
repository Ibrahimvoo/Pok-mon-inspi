// =====================================================================
// EXTENSION 11.0 — L'Atelier du Cycle : Tempéraments, Breloques (équipement), Étincelles de forge, Mémoriste.
// Les Breloques occupent un emplacement distinct de l'objet tenu : l'objet tenu est une tactique de combat,
// la breloque façonne le profil de la créature (stats, effet passif, résonance avec un type ou une lignée).
// =====================================================================
const STN11={hp:'PV',atk:'ATTAQUE',def:'DÉFENSE',spd:'VITESSE'};
// --- Tempéraments : +10 % / -10 % (jamais sur les PV)
const NAT={fougueux:['Fougueux','atk','def','Fonce tête baissée.'],temeraire:['Téméraire','atk','spd','Frappe fort, sans se presser.'],robuste:['Robuste','def','atk','Encaisse sans broncher.'],
 placide:['Placide','def','spd','Rien ne le presse.'],vif:['Vif','spd','atk','Toujours un pas d\'avance.'],espiegle:['Espiègle','spd','def','Insaisissable et joueur.'],
 serein:['Serein',0,0,'D\'humeur égale.'],reveur:['Rêveur',0,0,'La tête dans les nuages.'],docile:['Docile',0,0,'Suit sans discuter.']};
const NATK=Object.keys(NAT),natRnd=()=>NATK[rnd(0,NATK.length-1)];
// --- Breloques : [nom, rareté 1-4, bonus % {hp,atk,def,spd}, effet, affinité (type, 'L:' lignée, liste, ou 0), source]
const BQ={
 croc:['Croc de Braise',1,{atk:6},0,'FEU'],ecaille:['Écaille de Rivière',1,{hp:6},0,'EAU'],feuille:['Feuille Tressée',1,{def:6},0,'PLA'],plume:['Plume Statique',1,{spd:6},0,'ELE'],
 galet:['Galet Gravé',1,{def:6},0,'ROC'],osselet:['Osselet Noir',1,{atk:6},0,'OMB'],clochette:['Clochette d\'Aube',1,{spd:6},0,'LUM'],laine:['Ruban de Laine',1,{hp:6},0,'NOR'],
 liege:['Bouclier de Liège',2,{def:5},'first','NOR'],veilleur:['Médaillon du Veilleur',2,{hp:5},'low','OMB'],coquillage:['Coquillage Chantant',2,{hp:5},'rain','EAU'],lanterne:['Lanterne de Veille',2,{atk:4},'night','FEU'],
 tournesol:['Tournesol Séché',2,{atk:4},'day','PLA'],boussole:['Boussole du Voyageur',2,{spd:4},'xp','ELE'],ferachev:['Fer à Cheval',2,{def:4},'gold','ROC'],coeurverre:['Cœur de Verre',2,{hp:4},'bond','LUM'],
 masque:['Masque du Brasier',3,{atk:12,def:-8},0,'FEU'],carapace:['Carapace Ancienne',3,{def:12,spd:-8},0,'ROC'],faucon:['Plume de Faucon',3,{spd:12,hp:-8},0,'ELE'],sablier:['Sablier Fêlé',3,{spd:5},'entry','LUM'],
 prunelle:['Prunelle d\'Éclipse',3,{atk:5},'crit','OMB'],perlemaree:['Perle de Marée',3,{hp:5},'sres','EAU'],racine:['Racine-Mère',3,{def:5},'stab','PLA'],berger:['Étoile du Berger',3,{hp:4,atk:4,def:4,spd:4},0,0],
 braise:['Braise Éternelle',4,{atk:8},'starter','L:flamiot'],source:['Larme de Source',4,{def:8},'starter','L:goutelin'],graine:['Graine Ancestrale',4,{hp:8},'starter','L:pousseron'],
 lien:['Breloque du Lien',4,{},'bondst',0],origine:['Fragment d\'Origine',4,{hp:5,atk:5,def:5,spd:5},'adapt','L:vivipere'],
 echo:['Écho du Cycle',4,{atk:6,spd:6},'sky',['solarion','nocturion','crepuscel','aurorelle','eclipsar','presagelle','heliote','seleniote']],renard:['Queue d\'Errenard',4,{spd:8,atk:6},'entry','L:errenard']};
const BQK=Object.keys(BQ),RARN=['','COMMUNE','RARE','ÉPIQUE','UNIQUE'],RARC=['','#8a8a9a','#3a7ad0','#9a48c8','#d89018'];
const BQFX={first:'Le premier coup reçu en combat est réduit de 25 %.',low:'Sous 1/3 des PV, ses attaques x1,2.',rain:'Sous la pluie ou l\'orage, rend 1/10 des PV à chaque tour.',night:'La nuit, ses attaques x1,15.',day:'Le jour, ses attaques x1,15.',
 xp:'EXP gagnée x1,2.',gold:'Pièces gagnées contre les dresseurs +25 %.',bond:'Le lien grandit deux fois plus vite.',entry:'Sa première attaque après son entrée x1,3.',crit:'Coups critiques plus fréquents.',
 sres:'Dégâts super efficaces reçus -20 %.',stab:'Attaques de son propre type x1,1.',starter:'En résonance : Brasier, Torrent ou Engrais s\'active dès la moitié des PV.',bondst:'+2 % à toutes les stats par cœur de lien.',
 adapt:'En résonance : attaques d\'un autre type que le sien x1,2.',sky:'Sous un ciel (soleil, pluie, éclipse…), attaques x1,1. En résonance : x1,2.'};
// Lignée : remonte jusqu'à la forme de base (calculé une fois)
const PRE11={};for(const k in SP){const e=SP[k].evo;if(!e)continue;for(const x of Array.isArray(e[0])?e:[e])if(SP[x[1]]&&!PRE11[x[1]])PRE11[x[1]]=k}
const root11=sp=>{let k=sp,n=0;while(PRE11[k]&&n++<6)k=PRE11[k];return k};
const bqOk=(m,k)=>{const a=BQ[k]?.[4];if(!a)return false;if(Array.isArray(a))return a.includes(root11(m.sp))||a.includes(m.sp);if(a.startsWith('L:'))return root11(m.sp)===a.slice(2);return SP[m.sp].t===a};
const bqRes=m=>!!m?.eq&&bqOk(m,m.eq),bqFx=m=>m?.eq&&BQ[m.eq]?.[3],bqLv=k=>G?.brqLv?.[k]||0;
const affTxt=k=>{const a=BQ[k][4];return!a?'Aucune affinité':Array.isArray(a)?'Créatures légendaires':a.startsWith('L:')?'Lignée de '+SP[a.slice(2)].name:'Type '+TY[a][0]};
// Bonus de stats d'une breloque (en %, amélioration et résonance comprises ; les malus ne grandissent pas)
function bqStats(k,m){const b=BQ[k];if(!b)return{};const up=1+bqLv(k)/3,rs=m&&bqOk(m,k)?1.5:1,o={};for(const s in b[2]){const v=b[2][s];o[s]=v>0?Math.round(v*up*rs*10)/10:v}
 if(b[3]==='bondst'&&m){const h=2*bondLv(m);for(const s of['hp','atk','def','spd'])o[s]=(o[s]||0)+h}return o}
// --- Stats : tempérament puis breloque (le tout reste léger, st() est appelé très souvent)
const st11=st;st=function(m){const S=st11(m);const n=m.nat&&NAT[m.nat];if(n&&n[1]){S[n[1]]=Math.floor(S[n[1]]*1.1);S[n[2]]=Math.floor(S[n[2]]*.9)}
 if(m.eq&&BQ[m.eq]){const B2=bqStats(m.eq,m);for(const s in B2)S[s]=Math.max(1,Math.floor(S[s]*(1+B2[s]/100)))}return S};
const mon11=mon;mon=function(sp,lv,o={}){const m=mon11(sp,lv,o);if(o.wild)m.nat=natRnd();return m};
const giveNat11=()=>{if(G)for(const m of[...G.party,...G.box])if(!m.nat||!NAT[m.nat])m.nat=natRnd()};
const save11=save;save=function(){giveNat11();return save11()};
const norm11=normalize;normalize=function(g){g=norm11(g);if(!g)return g;g.brq??={};g.brqLv??={};g.brqSeen??={};
 for(const m of[...g.party,...g.box]){if(!m.nat||!NAT[m.nat])m.nat=natRnd();if(m.eq&&!BQ[m.eq])m.eq=null}for(const k in g.brq)if(!BQ[k])delete g.brq[k];if(g.v<11){g.wn=1;g.v=11}return g};
// Changer la breloque d'une créature (les PV suivent le nouveau maximum)
function setEq(m,k){const o=st(m).hp;if(m.eq)G.brq[m.eq]=(G.brq[m.eq]||0)+1;m.eq=k||null;if(k)G.brq[k]--;const n=st(m).hp;if(m.hp>0)m.hp=Math.max(1,Math.min(n,m.hp+Math.max(0,n-o)))}
function gainBq(k,q=1){G.brq??={};G.brqSeen??={};const nw=!G.brqSeen[k];G.brq[k]=(G.brq[k]||0)+q;G.brqSeen[k]=1;return nw}
const ownBq=k=>(G.brq?.[k]||0)+[...G.party,...G.box].filter(m=>m.eq===k).length;
// --- Icônes
const BQP=["...oo...","..o..o..","...oo...","..occo..",".occwCo.",".occcCo.","..oCCo..","...oo..."];
for(const k of BQK){const a=BQ[k][4],c=typeof a==='string'&&TY[a]?TY[a][1]:RARC[BQ[k][1]];ICO['bq_'+k]=icon(BQP,{c,C:mix(c,'#1a1420',.4),w:'#ffffff'})}
IT.etinc=['Étincelle de Forge',0,'Un éclat d\'énergie du Cycle, figé après un combat. L\'orfèvre Anselme, à Cendreville, s\'en sert pour améliorer les Breloques.',0,'quest'];ICO.etinc=icon(SHARDP,{y:'#fff4c0',Y:'#f6a040'});
// --- Effets en combat
const sideOf=m=>B&&m===B.me?0:1;
function bqPop(m,n){if(!B)return;B.bqP??=new Set();const id=(B.me===m?'m':'f')+n;if(B.bqP.has(id))return;B.bqP.add(id);B.tp={s:sideOf(m),t:n,t0:now(),pre:'BRELOQUE : '}}
const dmg11=dmg;dmg=function(a,d,v,sa,sd,avg){const r=dmg11(a,d,v,sa,sd,avg);if(!B||!v.p)return r;let k=1;const fa=bqFx(a),ra=bqRes(a),fd=bqFx(d),rd=bqRes(d),T=SP[a.sp].t,hp=a.hp/st(a).hp,pop=[];
 if(fa==='low'&&hp<=1/3){k*=ra?1.3:1.2;pop.push(a)}
 if(fa==='night'&&isN()||fa==='day'&&!isN()){k*=ra?1.22:1.15}
 if(fa==='entry'&&!B.bqE?.has(a)){k*=ra?1.4:1.3;pop.push(a)}
 if(fa==='stab'&&v.t===T)k*=ra?1.15:1.1;
 if(fa==='starter'&&ra&&{brasier:'FEU',torrent:'EAU',engrais:'PLA'}[tal(a)]===v.t&&hp<=.5){k*=hp>1/3?1.5:1.1;pop.push(a)}
 if(fa==='adapt'&&ra&&v.t!==T)k*=1.2;
 if(fa==='sky'&&B.sky)k*=ra?1.2:1.1;
 if(fa==='crit'&&!avg&&!r.cr&&Math.random()<(ra?.18:.12)){r.cr=true;k*=1.5}
 if(fd==='sres'&&r.ef>1){k*=rd?.7:.8;pop.push(d)}
 if(fd==='first'&&!B.bqF?.has(d)){k*=rd?.65:.75;pop.push(d)}
 r.n=Math.max(1,Math.floor(r.n*k));
 if(!avg){(B.bqE??=new Set()).add(a);if(fd==='first')(B.bqF??=new Set()).add(d);for(const m of pop)bqPop(m,BQ[m.eq][0])}return r};
const entry11=entryTal;entryTal=async function(s){B.bqE?.delete(side(s));return entry11(s)};
const endTurn11=endTurn;endTurn=async function(){for(const s of[0,1]){const m=side(s);if(!m||m.hp<=0||bqFx(m)!=='rain')continue;const wet=['rain','storm'].includes(B.sky?.k)||!B.sky&&G.wx?.k==='rain';
  if(wet&&m.hp<st(m).hp){m.hp=Math.min(st(m).hp,m.hp+Math.max(1,Math.floor(st(m).hp/(bqRes(m)?8:10))));healFx(s);await tween(B.dh,s,m.hp,250);await say(`${who(s)} se ressource grâce à sa breloque.`,0,1)}}
 return endTurn11()};
const gainXp11=gainXp;gainXp=function(m,n,q){if(B&&bqFx(m)==='xp')n=Math.floor(n*(bqRes(m)?1.3:1.2));return gainXp11(m,n,q)};
const bondUp11=bondUp;bondUp=function(m,n){if(m&&n>0&&bqFx(m)==='bond')n=Math.ceil(n*(bqRes(m)?2.5:2));return bondUp11(m,n)};
// Après-histoire : les dresseurs portent eux aussi des breloques (l'équipe du joueur a grandi, eux aussi)
const POOLT={FEU:['croc','lanterne','masque'],EAU:['ecaille','coquillage','perlemaree'],PLA:['feuille','tournesol','racine'],ELE:['plume','boussole','faucon'],ROC:['galet','ferachev','carapace'],OMB:['osselet','veilleur','prunelle'],LUM:['clochette','coeurverre','sablier'],NOR:['laine','liege','berger']};
const battle11=battle;battle=async function(foes,o={}){if(o.tr&&f().balance)for(const m of foes)if(!m.eq){const P=POOLT[SP[m.sp].t]||POOLT.NOR;m.eq=P[o.tr.boss||o.tr.vs?2:rnd(0,1)]}return battle11(foes,o)};
// --- Butin de combat : Étincelles et breloques trouvées (annoncé avant la fin du combat)
const bqTier=()=>{const F=f();return F.balance?3:F.badge3?2:F.badge?2:1};
function bqDrop(maxR,minR=1){const P=BQK.filter(k=>BQ[k][1]>=minR&&BQ[k][1]<=Math.min(3,maxR));const w=P.map(k=>[0,8,3,1][BQ[k][1]]);let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<P.length;i++)if((x-=w[i])<0)return P[i];return P[0]}
const msFlush11=msFlush;msFlush=async function(){const b=B;if(b&&!b.bq11&&f().starter&&!b.o?.noLose){b.bq11=1;const win=b.tr?b.foes.every(m=>m.hp<=0):b.foe.hp<=0&&b.me?.hp>0;
  if(win){let e=b.tr?(b.tr.boss||b.tr.vs?3:1):Math.random()<.12?1:0;if(e){G.bag.etinc=(G.bag.etinc||0)+e;sfx('lv');await say(`Tu récupères ${e>1?e+' Étincelles':'une Étincelle'} de Forge.`,0,1)}
   const gb=G.party.filter(m=>bqFx(m)==='gold'&&b.part.has(m));if(b.tr?.money&&gb.length){const n=Math.floor(b.tr.money*(gb.some(bqRes)?.4:.25));G.money+=n;await say(`Le Fer à Cheval porte chance : ${n} pièces de plus !`,0,1)}
   const ch=b.tr?(b.tr.boss||b.tr.vs?.35:.1):.03;if(f().bqIntro&&Math.random()<ch){const k=bqDrop(b.tr?.boss||b.tr?.vs?bqTier()+1:bqTier());const nw=gainBq(k);jingle('item');await say(`${b.tr?b.tr.name+' te laisse':'Dans l\'herbe foulée, tu trouves'} une breloque : ${BQ[k][0]} !${nw?' (Nouvelle !)':''}`,0,1)}}}
 return msFlush11()};
// --- Menu d'équipement
function bqInfo(k,m){const b=BQ[k],S=bqStats(k,m),st=Object.entries(S).map(([s,v])=>`${v>0?'+':''}${v} % ${STN11[s]}`).join(', ');
 return`${RARN[b[1]]}${bqLv(k)?' +'+bqLv(k):''}. ${st?st+'. ':''}${b[3]?BQFX[b[3]]+' ':''}Affinité : ${affTxt(k)}${m&&bqOk(m,k)?' (en résonance : bonus x1,5)':''}.`}
async function eqMenu(m){const ks=BQK.filter(k=>G.brq?.[k]>0),opts=[...(m.eq?['RETIRER']:[]),...ks];
 if(!opts.length)return say('Tu n\'as aucune breloque. L\'orfèvre Anselme, à Cendreville, en fabrique. On en trouve aussi après les combats et en explorant.');
 const i=await choose(opts.map(k=>k==='RETIRER'?'Retirer '+BQ[m.eq][0]:BQ[k][0]),{x:W-300,y:8,w:292,vis:7,title:`Breloque de ${nm(m)}`,icons:opts.map(k=>k==='RETIRER'?ICO.close:ICO['bq_'+k]),
  info:i=>opts[i]==='RETIRER'?{s:'Remettre la breloque dans ta collection.'}:{icon:bigIco('bq_'+opts[i]),s:bqInfo(opts[i],m)},
  draw:(i,x,y,sel,pr)=>{const k=opts[i],c=pr?'#ffffff':C.ink,o={sh:pr?0:undefined};if(k==='RETIRER')return txt('Retirer',x,y+19,c,o);txt(BQ[k][0]+(bqLv(k)?' +'+bqLv(k):''),x,y+19,bqOk(m,k)&&!pr?RARC[4]:c,o);txt('x'+G.brq[k],x+232,y+19,c,{...o,al:'r'})}});if(i<0)return;const k=opts[i];
 if(k==='RETIRER'){const o=m.eq;setEq(m,null);sfx('ok');return say(`Tu reprends ${BQ[o][0]} à ${nm(m)}.`)}
 setEq(m,k);sfx('ok');if(!f().tip_bq){f().tip_bq=1;await say('Une breloque reste équipée même en changeant d\'équipe. Regarde la page PROFIL du résumé (flèches gauche et droite) pour voir ses effets.')}
 await say(bqOk(m,k)?`${nm(m)} porte ${BQ[k][0]}… La breloque vibre : RÉSONANCE ! Ses bonus sont renforcés.`:`${nm(m)} porte maintenant ${BQ[k][0]}.`)}
// --- Résumé : page 1 (stats, tempérament visible) et page 2 (PROFIL : tempérament, breloque, objet)
summary=async function(m){let pg=0;const pIco=()=>X.drawImage(monSpr(m.sp,0,128,m.sh),44,60-(now()/400|0)%2*2,128,128);
 const head=()=>{const sp=SP[m.sp];panel(8,8,464,304);rr(20,20,176,184,4,'#efe6d2');pell(X,108,182,64,10,'#d8cbb0');pell(X,108,180,58,8,'#e6dcc6');pIco();
  txt(nm(m),28,44);txt('Nv '+m.lv,188,44,C.ink,{al:'r'});const cw=chip(sp.t,28,54);stChip(m,32+cw,54);if(m.sh){X.drawImage(ICO.star,174,56,14,14);txt('CHROMA',188,84,C.acc,{mini:1,al:'r'})}const bl=bondLv(m);for(let h=0;h<5;h++)X.drawImage(h<bl?ICO.hrt:ICO.hrt0,28+h*15,74,14,12);
  if(m.eq){X.drawImage(ICO['bq_'+m.eq],108,71,14,14);if(bqRes(m))txt('RÉSO',126,82,RARC[4],{mini:1})}if(m.item){X.drawImage(ICO[m.item],26,182,16,16);txt(IT[m.item][0],46,195,C.ink2,{s:1,sh:0})}
  for(let i=0;i<2;i++)rr(176+i*10,194,8,6,2,i===pg?C.acc:'#c8bfae')};
 const p1=()=>{const S=st(m),n=NAT[m.nat]||[];head();const mx=Math.max(S.atk,S.def,S.spd)*1.15;
  [['PV','hp',`${m.hp}/${S.hp}`,m.hp/S.hp,hpCol(m.hp/S.hp)],['ATTAQUE','atk',S.atk,S.atk/mx,C.acc],['DÉFENSE','def',S.def,S.def/mx,C.blue],['VITESSE','spd',S.spd,S.spd/mx,C.gold]].forEach(([a,s,b,k,c],i)=>{const y=36+i*30;
   txt(a,212,y,C.mute,{sh:0});if(n[1]===s)txt('+',214+tw(a),y,C.red,{sh:0});if(n[2]===s)txt('-',214+tw(a),y,C.blue,{sh:0});txt(b,456,y,C.ink,{al:'r'});bar(212,y+3,244,k,c,6)});
  const T=TAL[SP[m.sp].tal];txt('TALENT',212,158,C.mute,{sh:0});txt(T[0],456,158,C.acc,{al:'r',sh:0});wrap(T[1],244,1).slice(0,2).forEach((l,i)=>txt(l,212,170+i*10,C.ink2,{s:1,sh:0}));
  const e0=xpFor(m.lv),e1=xpFor(m.lv+1);txt('EXP',212,194,C.blue,{mini:1});txt(`${Math.max(0,e1-m.exp)} AVANT NV ${m.lv+1}`,456,194,C.ink2,{mini:1,al:'r'});bar(212,198,244,(m.exp-e0)/(e1-e0),C.blue,6);
  R(X,C.paper2,20,210,440,2);m.moves.forEach((id,i)=>{const v=MV[id],x=20+(i%2)*222,y=216+(i>>1)*44;rr(x,y,216,40,2,'#efe6d2');chip(v.t,x+6,y+4);txt(v.p?'PUISS '+bp(m,v):'STATUT',x+208,y+16,C.ink2,{mini:1,al:'r'});txt(v.n,x+8,y+36);txt(`PP ${m.pp[i]}/${v.pp}`,x+208,y+34,m.pp[i]?C.ink2:C.red,{mini:1,al:'r'})})};
 const p2=()=>{head();const n=NAT[m.nat]||NAT.docile;let y=36;txt('TEMPÉRAMENT',212,y,C.mute,{sh:0});txt(n[0],456,y,C.acc,{al:'r',sh:0});y+=14;
  txt(n[1]?`+10 % ${STN11[n[1]]}   -10 % ${STN11[n[2]]}`:'Aucun effet sur les stats.',212,y,C.ink2,{s:1,sh:0});y+=12;txt(n[3],212,y,C.ink2,{s:1,sh:0});y+=22;
  txt('BRELOQUE',212,y,C.mute,{sh:0});if(m.eq)txt(RARN[BQ[m.eq][1]],456,y-2,RARC[BQ[m.eq][1]],{mini:1,al:'r'});if(!m.eq){txt('Aucune',456,y,C.ink2,{al:'r',sh:0});wrap('Équipe une breloque depuis le menu ÉQUIPE (choix BRELOQUE). Anselme, l\'orfèvre de Cendreville, en fabrique.',244,1).slice(0,4).forEach((l,i)=>txt(l,212,y+14+i*10,C.ink2,{s:1,sh:0}))}
  else{const k=m.eq,b=BQ[k];y+=16;X.drawImage(ICO['bq_'+k],212,y-13,16,16);txt(b[0]+(bqLv(k)?' +'+bqLv(k):''),232,y,C.ink,{sh:0});y+=12;
   txt(bqRes(m)?'RÉSONANCE ACTIVE':'AFFINITÉ : '+affTxt(k).toUpperCase(),212,y,bqRes(m)?RARC[4]:C.mute,{mini:1});y+=2;
   const S=bqStats(k,m),L=Object.entries(S).map(([s,v])=>`${v>0?'+':''}${v} % ${STN11[s]}`);wrap((L.length?L.join(', ')+'. ':'')+(b[3]?BQFX[b[3]]:''),244,1).slice(0,3).forEach((l,i)=>txt(l,212,y+12+i*10,C.ink2,{s:1,sh:0}))}
  y=176;txt('OBJET TENU',212,y,C.mute,{sh:0});if(!m.item)txt('Aucun',456,y,C.ink2,{al:'r',sh:0});else{txt(IT[m.item][0],456,y,C.ink,{al:'r',sh:0});wrap(IT[m.item][2],244,1).slice(0,2).forEach((l,i)=>txt(l,212,y+12+i*10,C.ink2,{s:1,sh:0}))}
  R(X,C.paper2,20,210,440,2);const S=st(m);[['PV',S.hp],['ATTAQUE',S.atk],['DÉFENSE',S.def],['VITESSE',S.spd]].forEach(([a,v],i)=>{const x=20+i*110;rr(x,218,104,40,2,'#efe6d2');txt(a,x+8,234,C.mute,{mini:1});txt(v,x+96,252,C.ink,{al:'r'})});
  wrap('Stats finales : niveau, tempérament et breloque. La breloque reste attachée à la créature, même dans la Boîte.',440,1).slice(0,2).forEach((l,i)=>txt(l,20,276+i*10,C.ink2,{s:1,sh:0}))};
 ui.panel=()=>pg?p2():p1();for(;;){const k=await key();if(k==='a'||k==='b')break;if(k==='left'||k==='right'){pg^=1;sfx('sel')}}ui.panel=null};
teamMenu=async function(){if(!G.party.length)return say('Tu n\'as pas encore de créature.');for(;;){const i=await partyMenu('Équipe');if(i<0)return;ui.dim='Équipe';
 const j=await choose(['RÉSUMÉ','EN TÊTE','OBJET',...(f().bqIntro?['BRELOQUE']:[]),'RETOUR'],{w:160});ui.dim=null;const m=G.party[i];
 if(j===0)await summary(m);if(j===1&&i>0)G.party.unshift(G.party.splice(i,1)[0]);if(j===2)await itemMenu(m);if(j===3&&f().bqIntro)await eqMenu(m)}};
// --- Anselme, orfèvre de Cendreville : boutique, améliorations, commandes spéciales
const UPC=[[3,800],[6,2500],[10,6000]],UPG=[()=>f().badge2,()=>f().badge4,()=>f().balance],UPGT=['le Badge Miroir','le Badge Volt','le Cycle rétabli'];
const upCost=k=>{const l=bqLv(k),c=UPC[l],x=BQ[k][1]>=3?1.5:1;return c&&[Math.ceil(c[0]*x),Math.ceil(c[1]*x)]};
const SHOPQ=()=>['croc','ecaille','feuille','plume','galet','osselet','clochette','laine',...(f().badge3?['liege','boussole','lanterne','tournesol']:[]),...(f().balance?['berger']:[])];
const bqPrice=k=>BQ[k][1]===1?1200:BQ[k][1]===2?3500:9000;
const SPEC=[['braise',()=>f().badge3&&[...G.party,...G.box].some(m=>root11(m.sp)==='flamiot'),'Ton compagnon de flammes a bien grandi depuis Bourg-Lueur. J\'ai forgé ceci pour lui : sa braise ne s\'éteindra plus.'],
 ['source',()=>f().badge3&&[...G.party,...G.box].some(m=>root11(m.sp)==='goutelin'),'Ton compagnon des sources a bien grandi. Cette larme a été taillée pour lui : quand il faiblit, le torrent monte.'],
 ['graine',()=>f().badge3&&[...G.party,...G.box].some(m=>root11(m.sp)==='pousseron'),'Ton compagnon des prés a bien grandi. Cette graine vient du plus vieil arbre d\'Aurélys : elle réveille son engrais.'],
 ['lien',()=>G.party.some(m=>bondLv(m)>=5),'Je vois un lien rare entre toi et une de tes créatures. Cette breloque se nourrit de ce lien : plus il est fort, plus elle l\'est.'],
 ['origine',()=>[...G.party,...G.box].some(m=>['vivicendre','viviphyte','vivitron','vividactyle','vivisource'].includes(m.sp)),'Ton Vivipère a trouvé sa forme ! Ce fragment vient du même lac que lui : il l\'aidera à maîtriser tous les types.'],
 ['echo',()=>f().conseilWin,'Le Conseil du Cycle est tombé… On en parle jusque dans ma forge. Voici l\'Écho du Cycle : il chante avec les créatures légendaires.'],
 ['renard',()=>f().legR,'Tu as approché Errenard ? Il a laissé une touffe de poils sur ta veste. Je l\'ai tressée en breloque : elle a gardé sa malice.']];
async function anselme(){const A='Anselme';if(!f().badge)return say('Une forge, des pinces, des fils d\'or… Je fabrique des breloques pour les créatures. Reviens quand tu auras le Badge Roc : j\'aurai du travail pour toi !',A,0,'miner');
 if(!f().bqIntro){f().bqIntro=1;await say('Ah, un dresseur avec le Badge Roc ! Je suis Anselme, orfèvre. Je fabrique des BRELOQUES : des bijoux que tes créatures portent en plus de leur objet tenu.',A,0,'miner');
  await say('Une breloque renforce une créature : plus de stats, parfois un effet. Et si elle a de l\'affinité avec son porteur (même type, ou même lignée)… elle RÉSONNE, et ses bonus montent de moitié !',A,0,'miner');
  await say('Après chaque combat contre un dresseur, ramasse les ÉTINCELLES DE FORGE : apporte-les-moi et j\'améliorerai tes breloques. Tiens, voici de quoi commencer.',A,0,'miner');
  const st0=f().starter,k={flamiot:'croc',goutelin:'ecaille',pousseron:'feuille'}[st0]||'laine';gainBq(k);gainBq('laine');G.bag.etinc=(G.bag.etinc||0)+3;jingle('item');
  await say(`Tu reçois ${BQ[k][0]}, Ruban de Laine et 3 Étincelles de Forge ! Équipe-les depuis le menu ÉQUIPE.`);save()}
 for(const[k,ok,t]of SPEC)if(!G.brqSeen?.[k]&&ok()){await say(t,A,0,'miner');gainBq(k);jingle('item');await say(`Tu reçois ${BQ[k][0]} ! (Breloque UNIQUE)`);save()}
 for(;;){show('Que veux-tu ?',A);const i=await choose(['ACHETER','AMÉLIORER','COLLECTION','AU REVOIR'],{w:180});ui.text=null;if(i<0||i===3)return say('Que tes breloques chantent juste !',A,0,'miner');
  if(i===0){const L=SHOPQ();for(;;){const j=await choose(L.map(k=>BQ[k][0]),{x:W-300,y:8,w:292,vis:7,title:`Pièces : ${G.money}`,icons:L.map(k=>ICO['bq_'+k]),info:j=>({icon:bigIco('bq_'+L[j]),s:bqInfo(L[j])}),
    draw:(j,x,y,sel,pr)=>{const c=pr?'#ffffff':C.ink,o={sh:pr?0:undefined};txt(BQ[L[j]][0],x,y+19,c,o);txt(bqPrice(L[j]),x+232,y+19,c,{...o,al:'r'})}});if(j<0)break;const k=L[j];
    if(G.money<bqPrice(k)){await say('Tu n\'as pas assez d\'argent !',A);continue}G.money-=bqPrice(k);gainBq(k);sfx('lv')}save()}
  if(i===1){const L=BQK.filter(k=>ownBq(k)>0);if(!L.length){await say('Tu n\'as aucune breloque à améliorer.',A,0,'miner');continue}
   const j=await choose(L.map(k=>BQ[k][0]+(bqLv(k)?' +'+bqLv(k):'')),{x:W-300,y:8,w:292,vis:7,title:`Étincelles : ${G.bag.etinc||0}`,icons:L.map(k=>ICO['bq_'+k]),
    info:j=>{const k=L[j],c=upCost(k),l=bqLv(k);return{icon:bigIco('bq_'+k),s:!c?'Déjà au maximum (+3). Un chef-d\'œuvre !':`Vers +${l+1} : ${c[0]} Étincelles et ${c[1]} pièces. Bonus de stats x${((4+l)/3).toFixed(2).replace('.',',')} au lieu de x${((3+l)/3).toFixed(2).replace('.',',')}.${UPG[l]()?'':' Il faut d\'abord '+UPGT[l]+'.'}`}}});
   if(j<0)continue;const k=L[j],c=upCost(k),l=bqLv(k);if(!c){await say('Celle-ci est parfaite. Je n\'y toucherais pour rien au monde.',A,0,'miner');continue}
   if(!UPG[l]()){await say(`Pour passer au +${l+1}, il me faut un métal plus pur… Reviens après avoir obtenu ${UPGT[l]}.`,A,0,'miner');continue}
   if((G.bag.etinc||0)<c[0]||G.money<c[1]){await say(`Il me faut ${c[0]} Étincelles et ${c[1]} pièces. Les dresseurs, les Champions et le Conseil en laissent après les combats.`,A,0,'miner');continue}
   const ms=[...G.party,...G.box].filter(m=>m.eq===k).map(m=>[m,st(m).hp]);G.bag.etinc-=c[0];G.money-=c[1];(G.brqLv??={})[k]=l+1;for(const[m,o]of ms)if(m.hp>0)m.hp=Math.min(st(m).hp,m.hp+st(m).hp-o);
   ui.flash=.5;ui.flashC='#ffd860';sfx('lv');await say(`Clang ! Clang ! … ${BQ[k][0]} passe au +${l+1} ! Toutes tes copies en profitent.`,A,0,'miner');save()}
  if(i===2){const n=BQK.filter(k=>G.brqSeen?.[k]).length;await say(`Ta collection : ${n}/${BQK.length} breloques. ${n<BQK.length?'Certaines sont cachées dans les grottes, les bois et les sommets ; d\'autres se gagnent contre les dresseurs. Et les UNIQUES… je les forge pour qui les mérite.':'Tu les as toutes ! Je n\'ai plus rien à t\'apprendre.'}`,A,0,'miner')}}}
MAPS.ville.npcs.push({x:17,y:10,t:'miner',d:0,name:'Orfèvre Anselme',fn:()=>anselme()});
// --- Breloques cachées dans le monde
for(const[map,x,y,k]of[['route2',2,12,'lanterne'],['grotte',7,6,'galet'],['mine',2,9,'ferachev'],['coteaux',1,14,'tournesol'],['bois',21,1,'veilleur'],['galeries',1,1,'carapace'],['recif',24,3,'perlemaree'],['pic',18,10,'faucon']])
 MAPS[map]?.npcs.push({x,y,t:'ball',cond:()=>!f()['hb_'+k],fn:async()=>{f()['hb_'+k]=1;const nw=gainBq(k);jingle('item');await say(`Tu trouves une breloque : ${BQ[k][0]} !${nw?' (Nouvelle !)':''}`);if(!f().bqIntro)await say('Un bijou pour créature… L\'orfèvre de Cendreville saurait sûrement quoi en faire.');save()}});
// --- Mélisse, herboriste et mémoriste de Port-Miroir : capacités oubliées, infusions de tempérament
const relearnable=m=>{const L=new Set();let k=m.sp,n=0;while(k&&n++<6){for(const[l,mv]of SP[k].learn)if(l<=m.lv&&MV[mv]&&!m.moves.includes(mv))L.add(mv);k=PRE11[k]}return[...L]};
async function melisse(){const P='Mélisse';if(!f().melI){f().melI=1;await say('Bonjour, petit. Je suis Mélisse. Les créatures oublient… mais rien ne se perd vraiment. Une tisane de mémoire, et une capacité oubliée revient.',P,0,'granny');
  await say('Et avec mes infusions, je peux même adoucir ou réveiller le tempérament d\'une créature. Ce n\'est pas donné, mais ça marche !',P,0,'granny')}
 for(;;){show('Que puis-je pour toi ?',P);const i=await choose(['SE SOUVENIR','TEMPÉRAMENT','AU REVOIR'],{w:200});ui.text=null;if(i<0||i===2)return say('Prends soin d\'eux.',P,0,'granny');
  const t=await partyMenu(i?'Changer de tempérament':'Se souvenir');if(t<0)continue;const m=G.party[t];
  if(i===0){const L=relearnable(m);if(!L.length){await say(`${nm(m)} n'a rien oublié d'important.`,P,0,'granny');continue}
   const j=await choose(L.map(id=>MV[id].n),{x:W-260,y:8,w:252,vis:7,title:'Souvenir : 500 pièces',info:j=>({t:MV[L[j]].t,s:`Puiss. ${MV[L[j]].p||'-'} · Préc. ${MV[L[j]].a||'-'} · ${mvDesc(MV[L[j]])}`})});if(j<0)continue;
   if(G.money<500){await say('Il te faut 500 pièces pour la tisane.',P,0,'granny');continue}const n=m.moves.length;await learn(m,L[j]);if(m.moves.includes(L[j])){G.money-=500;save()}else if(m.moves.length===n)continue}
  else{if(!f().badge2){await say('Mes infusions sont fortes : reviens quand tu auras le Badge Miroir.',P,0,'granny');continue}const n0=NAT[m.nat]||NAT.docile;
   const j=await choose(NATK.map(k=>NAT[k][0]),{x:W-260,y:8,w:252,vis:9,title:'Infusion : 3000 pièces',info:j=>{const n=NAT[NATK[j]];return{s:(n[1]?`+10 % ${STN11[n[1]]}, -10 % ${STN11[n[2]]}. `:'Aucun effet sur les stats. ')+n[3]+` (Actuel : ${n0[0]}.)`}}});if(j<0)continue;
   if(NATK[j]===m.nat){await say(`${nm(m)} est déjà ${NAT[m.nat][0].toLowerCase()}.`,P,0,'granny');continue}if(G.money<3000){await say('Il te faut 3000 pièces pour l\'infusion.',P,0,'granny');continue}
   G.money-=3000;m.nat=NATK[j];sfx('lv');healFx2();await say(`${nm(m)} boit l'infusion… Il devient ${NAT[m.nat][0].toLowerCase()} !`,P,0,'granny');save()}}}
const healFx2=()=>{ui.flash=.4;ui.flashC='#80ff9a'};
MAPS.port.npcs.push({x:16,y:7,t:'granny',d:0,name:'Herboriste Mélisse',fn:()=>melisse()});
// --- Journal, succès, nouveautés
const quests11=quests;quests=function(){const Q=quests11(),F=f(),n=BQK.filter(k=>G.brqSeen?.[k]).length,u=SPEC.filter(s=>G.brqSeen?.[s[0]]).length;
 if(F.badge)Q.push(['L\'atelier d\'Anselme',n>=BQK.length?2:1,!F.bqIntro?'Un orfèvre, à Cendreville, cherche des dresseurs qui ont le Badge Roc.':`Breloques : ${n}/${BQK.length}, dont ${u}/${SPEC.length} uniques. Huit sont cachées dans le monde ; les uniques récompensent un lien, une lignée ou un exploit.`]);
 if(F.melI)Q.push(['Les tisanes de Mélisse',2,'À Port-Miroir, Mélisse fait revenir les capacités oubliées et change le tempérament des créatures.']);return Q};
ACH.push(['bq1','Premier bijou','Obtenir une breloque.',()=>BQK.some(k=>G.brqSeen?.[k]),['etinc',3]],['bqRes','Résonance','Équiper une breloque qui résonne avec son porteur.',()=>G.party.some(bqRes),['etinc',5]],
 ['bq15','Écrin bien garni','Réunir 15 breloques différentes.',()=>BQK.filter(k=>G.brqSeen?.[k]).length>=15,['etinc',10]],['bqMax','Chef-d\'oeuvre','Améliorer une breloque au +3.',()=>BQK.some(k=>bqLv(k)>=3),['rappelmax',3]],
 ['bqAll','Trésor d\'orfèvre','Réunir toutes les breloques.',()=>BQK.every(k=>G.brqSeen?.[k]),['etinc',30]]);
NEWS.splice(0,NEWS.length,[()=>ICO.bq_masque,'Les Breloques','Un 2e emplacement d\'équipement : 31 breloques, 4 raretés, des effets, et la résonance avec un type ou une lignée. Anselme, à Cendreville.'],
 [()=>ICO.etinc,'Étincelles et améliorations','Les combats laissent des Étincelles de Forge. Anselme améliore tes breloques jusqu\'au +3.'],
 [()=>ICO.bq_braise,'Breloques uniques','Ton starter, Vivipère, les légendaires et Errenard ont chacun la leur. Certaines changent leur façon de combattre.'],
 [()=>ICO.hrt,'Tempéraments','Chaque créature a désormais sa personnalité : +10 % dans une stat, -10 % dans une autre. Page PROFIL du résumé.'],
 [()=>ICO.book,'Mélisse, à Port-Miroir','Fait revenir les capacités oubliées et change le tempérament de tes créatures.'],
 [()=>ICO.dex,'Rappel 10.0','146 Pixémons, six lieux, Stèles des Fondateurs, Conseil du Cycle, pêche, Carnet et succès.']);
const throw11=throwBall;throwBall=async function(k){const r=await throw11(k);const m=B?.foe;if(r===true&&m?.nat&&NAT[m.nat])await say(`${nm(m)} a l'air ${NAT[m.nat][0].toLowerCase()}. ${NAT[m.nat][3]}`);return r};
