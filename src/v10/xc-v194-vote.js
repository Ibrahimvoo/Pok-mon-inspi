// =====================================================================
// Version 19.4 : dans l'aventure à plusieurs, les choix de l'histoire commune se votent
//  - pendant une scène partagée, chacun vote ; le meneur de la scène compte (majorité ; égalité : tirage au sort)
//    puis annonce le résultat à tous. Sans réponse au bout de 30 s, on décide sans les absents.
//  - en solo (ou si la scène n'est pas partagée) : le choix habituel
//  - en combat de groupe, chacun trouve ses propres mots pour Valen et pour Caïus (sans effet sur le combat partagé)
// =====================================================================
const VT={v:new Map(),r:new Map()};
const vtId=s=>typeof s==='string'&&/^[a-z0-9]{6}:\d{1,3}$/.test(s),vtL=s=>typeof s==='string'&&s.length>0&&s.length<=40;
NET.H['vt-v']=(m,P)=>{if(!isAdvMate(P)||!vtId(m.id)||!vtL(m.l))return;let M=VT.v.get(m.id);if(!M)VT.v.set(m.id,M=new Map());M.set(P.pid,m.l);M.t=Date.now()};
NET.H['vt-r']=(m,P)=>{if(!isAdvMate(P)||!vtId(m.id)||!vtL(m.l))return;
 const L=Array.isArray(m.L)?m.L.slice(0,4).filter(x=>Array.isArray(x)&&vtL(x[0])&&vtL(x[1])).map(x=>[x[0].slice(0,16),x[1]]):[];VT.r.set(m.id,{l:m.l,tie:!!m.tie,L,t:Date.now()})};
setInterval(()=>{const t=Date.now();for(const K of[VT.v,VT.r])for(const[k,v]of K)if(t-(v.t||0)>300000)K.delete(k)},30000);
async function voteLabel(opts,o={}){const S=SCX,all=o.all||opts,grp=!!(S&&S.sid&&NET.on&&typeof advCode==='function'&&advCode());
 const c=await choose(opts,grp?{...o,info:()=>({s:'Vote du groupe : la majorité l\'emporte. En cas d\'égalité, le sort décide.'})}:o),mine=opts[Math.max(0,c)];if(!grp)return mine;
 const id=S.sid+':'+(S.vi=(S.vi|0)+1);let res;
 if(S.lead){const fol=()=>[...S.fol].filter(pid=>NET.peers.has(pid)),miss=()=>fol().filter(pid=>!VT.v.get(id)?.has(pid)),t0=Date.now();if(!fol().length)return mine;
  while(miss().length&&Date.now()-t0<30000){show(`Vote : en attente de ${miss().map(pid=>NET.peers.get(pid)?.name||'?').join(', ')}… ${Math.ceil((30000-(Date.now()-t0))/1000)} s (B : décider sans attendre)`,0);if(await key(250)==='b')break}ui.text=null;
  const M=VT.v.get(id)||new Map(),L=[[NG().n||'Toi',mine]];for(const pid of fol()){const l=M.get(pid);if(l&&all.includes(l))L.push([NET.peers.get(pid)?.name||'Ami',l])}VT.v.delete(id);
  const n={};for(const[,l]of L)n[l]=(n[l]|0)+1;const top=Math.max(...Object.values(n)),C=Object.keys(n).filter(l=>n[l]===top);
  res={l:C[Math.random()*C.length|0],tie:C.length>1,L};for(const pid of fol())NET.send('vt-r',{id,l:res.l,tie:res.tie?1:0,L},pid,true)}
 else{NET.send('vt-v',{id,l:mine},S.leader,true);const t0=Date.now();
  while(!VT.r.has(id)&&Date.now()-t0<60000&&NET.peers.has(S.leader)){show('Vote envoyé ! En attente des autres joueurs…',0);await key(250)}ui.text=null;
  res=VT.r.get(id);VT.r.delete(id);if(!res||!all.includes(res.l))return mine}
 if(res.L.length>1)await say(`Votes : ${res.L.map(([n,l])=>`${n} : ${l}`).join(' · ')}.`);
 await say(res.tie?`Égalité ! Le sort a choisi : ${res.l}.`:`Le groupe a choisi : ${res.l}.`);return res.l}
async function voteChoose(opts,o={}){return opts.indexOf(await voteLabel(opts,o))}
// Combat de groupe contre Valen ou Caïus : les mots de chacun, quand le boss envoie sa dernière créature
{const ce=cbEv;cbEv=async function(C,e){const r=await ce.apply(this,arguments);
 try{if(e?.k==='fsend'&&C?.foe&&mode==='battle'){const tn=C.tr?.name;if(tn==='Vex'&&C.foe.sp==='nocturion'&&!C.w191){C.w191=1;await words191(1)}else if(tn==='Admin Caïus'&&C.foe.sp==='anubrume'&&!C.w193){C.w193=1;await words193(1)}}}catch(err){console.error(err)}return r}}
