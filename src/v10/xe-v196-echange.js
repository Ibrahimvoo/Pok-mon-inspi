// =====================================================================
// Version 19.6 : l'échange entre amis devient complet. Chacun propose une créature (ou aucune), jusqu'à 4 objets et de l'argent,
// voit l'offre de l'autre, puis confirme ; l'échange n'a lieu que si les deux confirmations se sont croisées (comme avant).
// =====================================================================
const TRK=k=>!!IT[k]&&IT[k][4]!=='quest';
function trOf(o){if(!o||typeof o!=='object')return null;const m=o.m?netMon(o.m):null;if(o.m&&!m)return null;
 const it=Array.isArray(o.it)?o.it.slice(0,4).filter(x=>Array.isArray(x)&&TRK(x[0])&&Number.isInteger(x[1])&&x[1]>0&&x[1]<=999).map(x=>[x[0],x[1]]):[];
 const mo=Number.isInteger(o.mo)?Math.max(0,Math.min(9999999,o.mo)):0;return m||it.length||mo?{m,it,mo}:null}
const trTxt=o=>[o.m?`${nm(o.m)} Nv ${o.m.lv}`:'',...o.it.map(([k,q])=>`${IT[k][0]} x${q}`),o.mo?`${o.mo} pièces`:''].filter(Boolean).join(', ')||'rien';
async function trQty(max,title){const V=[1,2,5,10,max].filter((v,i,a)=>v<=max&&a.indexOf(v)===i),i=await choose(V.map(v=>v===max?`TOUT (${max})`:String(v)),{x:W-182,y:8,w:174,title});return i<0?0:V[i]}
async function trBuild(o){for(;;){const L=['PROPOSER',`CRÉATURE : ${o.m?nm(o.m)+' Nv '+o.m.lv:'AUCUNE'}`,`OBJETS : ${o.it.length?o.it.map(([k,q])=>IT[k][0]+' x'+q).join(', '):'AUCUN'}`,`ARGENT : ${o.mo}`,'ANNULER'];
 const i=await choose(L,{x:W-292,y:8,w:284,title:'Ta proposition'});
 if(i===0){if(!o.m&&!o.it.length&&!o.mo){await say('Ta proposition est vide.');continue}return o}
 if(i<0||i===4)return null;
 if(i===1){const c=await choose(['CHOISIR DANS L\'ÉQUIPE','AUCUNE CRÉATURE'],{w:260});if(c===1)o.m=null;else if(c===0){const j=await partyMenu('Proposer qui ?');if(j>=0)o.m=G.party[j]}}
 if(i===2)for(;;){const A=o.it.length<4?['+ AJOUTER UN OBJET']:[],j=await choose([...o.it.map(([k,q])=>`RETIRER : ${IT[k][0]} x${q}`),...A,'RETOUR'],{x:W-292,y:8,w:284,title:'Objets proposés'});
  if(j<0||j>=o.it.length+A.length)break;if(j<o.it.length){o.it.splice(j,1);continue}
  const B=Object.keys(G.bag).filter(k=>TRK(k)&&(G.bag[k]|0)>0&&!o.it.some(x=>x[0]===k)).sort((a,b)=>IT[a][0].localeCompare(IT[b][0],'fr'));if(!B.length){await say('Plus rien à proposer dans ton sac.');continue}
  const k=await choose(B.map(x=>`${IT[x][0]} (x${G.bag[x]})`),{x:W-232,y:8,w:224,vis:12,title:'Quel objet ?'});if(k<0)continue;const q=await trQty(Math.min(999,G.bag[B[k]]),'Combien ?');if(q)o.it.push([B[k],q])}
 if(i===3){const V=[0,100,500,1000,5000,G.money|0].filter((v,i,a)=>v<=(G.money|0)&&a.indexOf(v)===i),j=await choose(V.map(v=>v===(G.money|0)&&v?`TOUT (${v})`:String(v)),{x:W-182,y:8,w:174,title:'Argent'});if(j>=0)o.mo=V[j]}}}
const trSnap=o=>({m:o.m?snapMon(o.m):null,it:o.it,mo:o.mo});
// Peut-on donner ça ? (vérifié par chacun AVANT de confirmer : une fois les deux confirmations croisées, l'échange se fait des deux côtés)
function trCan(mine,th){if(mine.m&&!G.party.includes(mine.m))return'Ta créature n\'est plus dans ton équipe.';if(mine.it.some(([k,q])=>(G.bag[k]|0)<q))return'Tu n\'as plus ces objets.';if((G.money|0)<mine.mo)return'Tu n\'as plus assez d\'argent.';
 if(mine.m&&!th.m&&!G.party.some(x=>x!==mine.m&&alive(x)))return'Tu dois garder au moins une créature en forme dans ton équipe.';return null}
tradeFlow=async function(P,id,host){NET.hi(1);const A=NET.act?.k==='tr'&&NET.act.id===id?NET.act:(NET.act={k:'tr',id,with:P.pid});A.their??=null;A.tv??=0;A.ok??=null;A.x??=0;let mine=null,mv=0,done=false;
 const gone=()=>!NET.peers.has(P.pid)||A.x;
 try{for(;;){if(gone())break;
   if(!mine){ui.text=null;let m=null;const j=await partyMenu('Proposer qui ?');if(j>=0)m=G.party[j];else{const c=await choose(['PROPOSER SANS CRÉATURE','ANNULER L\'ÉCHANGE'],{w:280});if(c!==0){if(c===1||await ask('Annuler l\'échange ?'))break;continue}}
    if(gone())break;const o=await trBuild({m,it:[],mo:0});if(!o){if(await ask('Annuler l\'échange ?'))break;continue}if(gone())break;mine=o;mv++;
    if(!await NET.send('tr-of',{id,ver:mv,o:trSnap(mine)},P.pid,true)){await say('La connexion avec ton ami s\'est interrompue.');break}}
   if(!A.their){show(`Tu proposes : ${trTxt(mine)}. ${P.name} choisit… (B : annuler)`);let c=0;while(!A.their&&!gone()){const k=await key(150);if(k==='b'){c=1;break}}ui.text=null;if(c){if(await ask('Annuler l\'échange ?'))break;continue}if(gone())break}
   const th=A.their,to=trOf(th.o);if(!to){A.their=null;continue}
   ui.panel=()=>tradePanel2(mine,to,P);const i=await choose(['ÉCHANGER','VOIR SON OFFRE','CHANGER LA MIENNE','ANNULER'],{x:W-252,y:H-120,w:244});ui.panel=null;if(gone())break;
   if(A.their!==th){await say(`${P.name} a changé sa proposition.`);continue}
   if(i===1){if(to.m)await summary(to.m);else await say(`${P.name} propose : ${trTxt(to)}.`);continue}
   if(i===2){const o=await trBuild({m:mine.m,it:mine.it.map(x=>[...x]),mo:mine.mo});if(o){mine=o;mv++;A.ok=null;NET.send('tr-of',{id,ver:mv,o:trSnap(mine)},P.pid,true)}continue}
   if(i<0||i===3){if(await ask('Annuler l\'échange ?'))break;continue}
   const why=trCan(mine,to);if(why){await say(why);continue}
   if(!await NET.send('tr-ok',{id,a:mv,b:th.v},P.pid,true)){await say('La connexion avec ton ami s\'est interrompue.');break}
   show(`Tu as confirmé. En attente de ${P.name}…`);const t0=Date.now();while(!(A.ok&&A.ok.a===th.v&&A.ok.b===mv)&&A.their===th&&!gone()&&Date.now()-t0<60000)await key(150);ui.text=null;
   if(A.ok&&A.ok.a===th.v&&A.ok.b===mv){done=tradeCommit2(mine,to,P);break}if(gone())break;if(A.their!==th){await say(`${P.name} a changé sa proposition.`);continue}
   await say(`${P.name} n'a pas confirmé à temps.`);break}
 }finally{if(NET.act===A)NET.act=null;NET.hi(1)}
 if(!done){NET.send('tr-x',{id},P.pid,true);if(!NET.peers.has(P.pid))await say(`${P.name} a quitté ${netRoom()}. L'échange est annulé.`);else if(A.x)await say(`${P.name} a annulé l'échange.`);else await say('Échange annulé.');return}
 if(done.out&&done.in)await tradeAnim(done.out,done.in,P);else sfx('ok');
 await say(`Tu donnes à ${P.name} : ${trTxt(done.gave)}. Tu reçois : ${trTxt(done.got)} !`);if(done.in?.ot)await say(`${nm(done.in)} vient de chez ${done.in.ot} : il gagne plus d'EXP (x1,5).`);if(done.kept)await say('Les objets et breloques que portait ta créature restent chez toi.')};
NET.H['tr-of']=(m,P)=>{const A=NET.act;if(A?.k!=='tr'||A.id!==m.id||A.with!==P.pid||!Number.isInteger(m.ver)||m.ver<=A.tv||!trOf(m.o))return;A.tv=m.ver;A.their={v:m.ver,o:m.o};A.ok=null};
function tradeCommit2(mine,to,P){if(trCan(mine,to))return false;const out=mine.m,tm=to.m;let kept=0;
 if(out){if(out.eq){setEq(out,null);kept=1}if(out.item){G.bag[out.item]=(G.bag[out.item]||0)+1;out.item=null;kept=1}}
 if(tm){if(!tm.ot)tm.ot=P.name;if(tm.ot===NG().n)delete tm.ot}
 if(out){const i=G.party.indexOf(out);if(tm)G.party[i]=tm;else G.party.splice(i,1)}else if(tm)(G.party.length<6?G.party:G.box).push(tm);if(tm)dex(tm.sp,2);
 for(const[k,q]of mine.it){G.bag[k]-=q;if(G.bag[k]<=0)delete G.bag[k]}for(const[k,q]of to.it)G.bag[k]=Math.min(999,(G.bag[k]|0)+q);G.money=Math.min(9999999,(G.money|0)-mine.mo+to.mo);
 NG().tr=(NG().tr||0)+1;folReset();save();return{out,in:tm,kept,gave:mine,got:to}}
function tradePanel2(a,b,P){panel(8,8,W-16,H-128);txt('ÉCHANGE',24,34,C.acc,{sh:0});txt('Objets tenus et breloques restent chez leur dresseur.',W-24,32,C.mute,{s:1,sh:0,al:'r'});
 [[a,'TOI',24],[b,P.name.toUpperCase(),W/2+12]].forEach(([o,who,x])=>{const w=W/2-36,m=o.m;rr(x,42,w,144,4,'#efe6d2');txt(who,x+8,56,C.mute,{mini:1});
  if(m){if(m.sh)X.drawImage(ICO.star,x+w-20,46,14,14);X.drawImage(monSpr(m.sp,0,48,m.sh),x+4,58,48,48);txt(nm(m),x+58,76);txt('Nv '+m.lv,x+58,92,C.ink2,{s:1.5})}else txt('Aucune créature',x+8,80,C.ink2,{s:1,sh:0});
  const L=[...o.it.map(([k,q])=>`${IT[k][0]} x${q}`),...(o.mo?[`${o.mo} pièces`]:[])];L.slice(0,5).forEach((s,j)=>txt(s,x+8,118+j*13,C.ink,{s:1,sh:0}));if(!L.length)txt('Aucun objet',x+8,118,C.mute,{s:1,sh:0})});
 const ax=W/2,ay=112;R(X,C.acc,ax-9,ay,18,2);for(let i=0;i<4;i++){R(X,C.acc,ax-9+i,ay-i,1,2+2*i);R(X,C.acc,ax+8-i,ay-i,1,2+2*i)}}
