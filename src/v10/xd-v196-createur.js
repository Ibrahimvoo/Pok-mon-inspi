// =====================================================================
// Version 19.6 : un vrai menu CRÉATEUR, rangé par catégories. Il n'agit que sur TA partie.
//  Équipe et créatures (éditeur complet : niveau exact, capacités, objet tenu, nature, chromatique, évolution, copie…),
//  objets et argent (objet précis et quantité), histoire (où j'en suis, sauter à un chapitre), monde (lieu, heure, météo, faune), pouvoirs.
// =====================================================================
async function creaNum(title,max,lo,hi){const s=await kbInput(title,max,[...'0123456789'],{cols:5,kw:44,ok:s=>s.length?s:null});if(!s)return null;const n=parseInt(s,10);return Number.isFinite(n)?Math.max(lo,Math.min(hi,n)):null}
const creaBox={x:W-232,y:8,w:224,vis:12};
async function creaPickLv2(){const V=[5,15,30,50,75,100],i=await choose([...V.map(v=>'Niveau '+v),'AUTRE…'],{x:W-182,y:8,w:174,title:'Niveau'});if(i<0)return null;return i<V.length?V[i]:creaNum('NIVEAU (1 À 100)',3,1,100)}
async function creaPickMon(title){const L=[...G.party.map(m=>[m,'']),...G.box.map(m=>[m,' (Boîte)'])];if(!L.length){await say('Tu n\'as aucune créature.');return null}
 const i=await choose(L.map(([m,b])=>`${nm(m)} Nv ${m.lv}${m.sh?' *':''}${b}`),{...creaBox,title});return i<0?null:L[i][0]}
const creaKeep=m=>{delete m._S;const mx=st(m).hp;m.hp=Math.min(Math.max(1,m.hp|0),mx)};
async function creaEdit(m){let last=0;for(;;){if(!G.party.includes(m)&&!G.box.includes(m))return;
 const O=[[`NIVEAU : ${m.lv}`,async()=>{const n=await creaNum('NIVEAU (1 À 100)',3,1,100);if(n==null)return;m.lv=n;m.exp=xpFor(n);creaKeep(m);fullHeal(m);sfx('ok');return`${nm(m)} est maintenant niveau ${n}.`}],
  ['CAPACITÉS…',async()=>{for(;;){const n=m.moves.length,j=await choose([...m.moves.map(id=>MV[id].n),...(n<4?['+ AJOUTER']:[]),'RETOUR'],{x:W-232,y:8,w:224,title:'Quelle capacité ?'});if(j<0||j>=n+(n<4?1:0))return;
    const L=Object.keys(MV).filter(k=>MV[k]?.n).sort((a,b)=>MV[a].n.localeCompare(MV[b].n,'fr')),k=await choose(L.map(x=>MV[x].n),{...creaBox,title:'Nouvelle capacité'});if(k<0)continue;
    const id=L[k];if(m.moves.includes(id)){await say(`${nm(m)} connaît déjà ${MV[id].n}.`);continue}if(j<n){m.moves[j]=id;m.pp[j]=MV[id].pp}else{m.moves.push(id);m.pp.push(MV[id].pp)}sfx('ok')}}],
  [`OBJET TENU : ${m.item&&IT[m.item]?IT[m.item][0]:'AUCUN'}`,async()=>{const L=Object.keys(IT).filter(k=>IT[k][4]==='held').sort((a,b)=>IT[a][0].localeCompare(IT[b][0],'fr')),k=await choose(['AUCUN',...L.map(x=>IT[x][0])],{...creaBox,title:'Objet tenu'});if(k<0)return;m.item=k?L[k-1]:null;sfx('ok')}],
  [`NATURE : ${NAT[m.nat]?.[0]||'AUCUNE'}`,async()=>{const L=Object.keys(NAT),k=await choose(L.map(x=>NAT[x][0]),{...creaBox,title:'Nature'});if(k<0)return;m.nat=L[k];creaKeep(m);sfx('ok')}],
  [`CHROMATIQUE : ${onOff(m.sh)}`,()=>{m.sh=m.sh?0:1;sfx('shard')}],
  ['ÉVOLUER MAINTENANT',async()=>{const to=evoTarget(m);if(!to)return`${nm(m)} ne peut pas évoluer pour l'instant.`;ui.panel=null;await evolve(m,to);await fadeTo(0,250);creaKeep(m);save();return null}],
  ['SOIGNER',()=>{fullHeal(m);m.st=null;m.slp=0;sfx('heal');return`${nm(m)} est en pleine forme.`}],
  ['COPIER',()=>{const c=JSON.parse(JSON.stringify(m));delete c._S;c.eq=null;const p=G.party.length<6;(p?G.party:G.box).push(c);folReset();sfx('ok');return`Une copie de ${nm(c)} ${p?'rejoint ton équipe':'part dans la Boîte'}.`}],
  ['RELÂCHER',async()=>{if(G.party.includes(m)&&!G.party.some(x=>x!==m&&alive(x)))return'Garde au moins une autre créature en forme dans ton équipe.';if(!await ask(`Relâcher ${nm(m)} ? C'est définitif.`))return;
   for(const L of[G.party,G.box]){const i=L.indexOf(m);if(i>=0)L.splice(i,1)}folReset();sfx('back');return'exit'}],
  ['RETOUR',()=>'exit']];
 const i=await choose(O.map(o=>o[0]),{x:W-262,y:8,w:254,vis:11,title:`${nm(m).toUpperCase()} Nv ${m.lv}`,i:last});if(i<0)return;last=i;const r=await O[i][1]();save();if(r==='exit')return;if(r)await say(r)}}
// Chapitres : les étapes déjà franchies au début de chaque grand moment (pour tester ; mieux vaut une sauvegarde à part)
const CREA_CH=[['ACTE I : CENDREVILLE','ville',{intro:3,intro3:1,rival1:1}],['ACTE II : PORT-MIROIR','port',{badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1}],
 ['ACTE II : VOLTERRE','volterre',{portScene:1,badge2:1,kael3:1,volArr:1}],['LE CARNAVAL','carnavelle',{baseDone:1,badge4:1,v18vol:1}],['L\'OBSERVATOIRE','volterre',{v18arr:1,v18ecoute:1,badge5:1,v18faus:1,v18done:1}],
 ['APRÈS LA FIN','coteaux',{obsScene:1,bar:1,selene2done:1,vex2:1,balance:1}]];
async function creaChapter(){const i=await choose(CREA_CH.map(c=>c[0]),{x:W-262,y:8,w:254,title:'Sauter à…'});if(i<0)return;
 if(!await ask('Ta partie avancera jusqu\'à ce chapitre (rien n\'est retiré). Pour tester, mieux vaut une sauvegarde à part. Continuer ?'))return;
 const F=f();for(let k=0;k<=i;k++)Object.assign(F,CREA_CH[k][2]);if(!F.starter)F.starter='flamiot';G.keys.dex=1;if(F.badge)G.keys.bracelet=1;
 if(!G.party.length){G.party.push(mon(F.starter,[8,18,26,32,40,55][i]));dex(F.starter,2)}const k=CREA_CH[i][1],s=MAPS[k]&&creaSpot(k);
 if(s){ui.panel=null;sfx('door');await fadeTo(1,220);loadMap(k,s[0],s[1],0);await fadeTo(0,220);if(NET.on)NET.hi(1)}save();return`Te voilà au chapitre : ${CREA_CH[i][0].toLowerCase()}.`}
async function creaTime(){const i=await choose(PHN.slice(0,4),{x:W-182,y:8,w:174,title:'Heure'});if(i<0)return;for(let d=1;d<=CYC;d++){const t=(G.t|0)+d;if(phaseOf(t)===i){G.t=t;break}}if(G.map)loadMap(G.map,G.x,G.y,G.dir);return`Il fait maintenant : ${PHN[i].toLowerCase()}.`}
creatorMenu=async function(){let last=0,sub=-1,l2=0;for(;;){
 const S=[['ÉQUIPE ET CRÉATURES…',[
   ['ÉDITER UNE CRÉATURE',async()=>{const m=await creaPickMon('Éditer qui ?');if(m)await creaEdit(m)}],
   ['DONNER UNE CRÉATURE',async()=>{const sp=await creaPickSp('Quelle créature ?');if(!sp)return;const lv=await creaPickLv2();if(!lv)return;const m=mon(sp,lv);if(await ask('Chromatique ?'))m.sh=1;dex(sp,creaLeg(sp)?1:2);
    const p=G.party.length<6;(p?G.party:G.box).push(m);folReset();jingle('item');return`${SP[sp].name} (Nv ${lv}) ${p?'rejoint ton équipe':'est envoyé dans la Boîte'} !`}],
   ['COMBATTRE UNE CRÉATURE',async()=>{const sp=await creaPickSp('Affronter qui ?');if(!sp)return;const lv=await creaPickLv2();if(!lv)return;if(!G.party.some(alive))return'Il te faut une créature en forme.';ui.panel=null;await battle([mon(sp,lv,{wild:1})],{});return'exit'}],
   ['ÉQUIPE NIVEAU 100',()=>{for(const m of G.party){m.lv=100;m.exp=xpFor(100);delete m._S}healAll();sfx('ok');return'Toute l\'équipe est niveau 100 !'}],
   ['ÉQUIPE CHROMATIQUE',()=>{for(const m of G.party)m.sh=1;sfx('shard');return'Toute l\'équipe brille !'}],
   ['SOIN TOTAL',()=>{healAll();sfx('heal');return'Équipe soignée !'}],
   ['PIXÉDEX COMPLET',()=>{for(const k of DEX)if(SP[k])G.dex[k]=Math.max(G.dex[k]|0,creaLeg(k)?1:2);G.keys.dex=1;sfx('ok');return'Pixédex complété !'}]]],
  ['OBJETS ET ARGENT…',[
   ['DONNER UN OBJET',async()=>{const L=Object.keys(IT).filter(k=>IT[k][4]!=='quest').sort((a,b)=>IT[a][0].localeCompare(IT[b][0],'fr')),i=await choose(L.map(k=>`${IT[k][0]} (x${G.bag[k]|0})`),{...creaBox,title:'Quel objet ?'});if(i<0)return;
    const q=await creaNum('QUANTITÉ (1 À 999)',3,1,999);if(!q)return;const k=L[i];G.bag[k]=Math.min(999,(G.bag[k]|0)+q);jingle('item');return`Tu reçois ${IT[k][0]} x${q}.`}],
   ['TOUS LES OBJETS x99',()=>{for(const k of Object.keys(IT))if(IT[k][4]!=='quest')G.bag[k]=Math.max(G.bag[k]|0,99);jingle('item');return'Sac rempli : au moins 99 de chaque objet.'}],
   ['VIDER LE SAC',async()=>{if(!await ask('Vider le sac ? (les objets de quête restent)'))return;for(const k of Object.keys(G.bag))if(IT[k]?.[4]!=='quest')delete G.bag[k];sfx('back');return'Sac vidé.'}],
   ['ARGENT : MONTANT EXACT',async()=>{const n=await creaNum('ARGENT (0 À 9 999 999)',7,0,9999999);if(n==null)return;G.money=n;sfx('ok');return`Tu as maintenant ${n} pièces.`}],
   ['ARGENT +100 000',()=>{G.money=Math.min(9999999,(G.money|0)+100000);jingle('item');return`Tu as maintenant ${G.money} pièces.`}],
   ['TOUTES LES CLÉS',()=>{for(const k of['dex','carte','boussole','bracelet','brv2','camera','charme','couveuse','lantern','rod','rod2','rod3','sablier'])G.keys[k]=1;sfx('ok');return'Tous les objets clés débloqués (canne, bracelet, sablier…).'}],
   ['TOUS LES DÉGUISEMENTS',()=>{for(const k of Object.keys(DG))G.keys['dg_'+k]=1;sfx('ok');return'Tous les déguisements sont dans ton armoire : MENU, TENUES.'}]]],
  ['HISTOIRE…',[
   ['OÙ J\'EN SUIS',()=>`Étape actuelle : ${goal()||'aucune'}`],
   ['SAUTER À UN CHAPITRE',creaChapter],
   ['TOUS LES BADGES',()=>{for(const k of['badge','badge2','badge3','badge4','badge5'])f()[k]=1;G.keys.bracelet=1;sfx('ok');return'Les cinq badges sont à toi !'}]]],
  ['MONDE…',[
   ['TÉLÉPORTATION',async()=>{const L=Object.keys(MAPS).filter(k=>MAPS[k].name&&!MAPS[k].dream&&k!=='songe'&&k!==G.map).sort((a,b)=>MAPS[a].name.localeCompare(MAPS[b].name,'fr')),i=await choose(L.map(k=>MAPS[k].name),{...creaBox,title:'Aller où ?'});if(i<0)return;
    const s=creaSpot(L[i]);if(!s)return'Impossible d\'aller là.';ui.panel=null;sfx('door');await fadeTo(1,220);loadMap(L[i],s[0],s[1],0);await fadeTo(0,220);if(NET.on)NET.hi(1);return'exit'}],
   [`HEURE : ${PHN[phase()]||''}`,creaTime],
   [`PLUIE : ${onOff(G.wx?.k==='rain')}`,()=>{G.wx=G.wx?.k==='rain'?null:{k:'rain',n:600}}],
   ['FAUNE : RÉINITIALISER',()=>{faunaSpawn(G.map);return'Les créatures sauvages du lieu sont revenues.'}]]],
  ['POUVOIRS…',[
   [`INVINCIBLE : ${onOff(CH.god)}`,()=>{CH.god^=1}],[`K.O. EN UN COUP : ${onOff(CH.ko)}`,()=>{CH.ko^=1}],[`CAPTURE GARANTIE : ${onOff(CH.cap)}`,()=>{CH.cap^=1}],
   [`TRAVERSER LES MURS : ${onOff(CH.wall)}`,()=>{CH.wall^=1}],[`VITESSE : x${CH.spd}`,()=>{CH.spd=CH.spd>=4?1:CH.spd*2}],[`REPOUSSE INFINI : ${onOff(CH.rep)}`,()=>{CH.rep^=1;if(!CH.rep)G.repel=0}],[`EXP x10 : ${onOff(CH.xp)}`,()=>{CH.xp^=1}]]],
  ['VERROUILLER L\'ACCÈS',async()=>{if(!await ask('Retirer l\'accès créateur de cet appareil ? (il faudra retaper le mot de passe)'))return;creaSet(CREA_K,null);return'exit'}],
  ['FERMER',()=>'exit']];
 if(sub<0){const i=await choose(S.map(s=>s[0]),{x:W-262,y:8,w:254,title:'CRÉATEUR',i:last});if(i<0)return;last=i;if(Array.isArray(S[i][1])){sub=i;l2=0;continue}
  const r=await S[i][1]();chSave();if(r==='exit')return;if(r)await say(r);continue}
 const L=S[sub][1],j=await choose([...L.map(o=>o[0]),'RETOUR'],{x:W-262,y:8,w:254,vis:11,title:S[sub][0].replace('…',''),i:l2});if(j<0||j>=L.length){sub=-1;continue}l2=j;
 const r=await L[j][1]();chSave();save();if(r==='exit')return;if(r)await say(r)}}
