// =====================================================================
// 19.1 — DE VOLTERRE AU DÔME
// - Centrale : les sbires tournent la tête (on peut passer dans leur dos). Personne ne t'a vu ? Orso est pris de court.
// - Observatoire : le sceau cède (3 %, 2 %, 1 %, 0 %), Kael retient un sbire, une énigme remplace le mot de passe écrit
//   en clair, et Sélène peut être convaincue (son écho dans la Grotte, sa lettre à la Centrale).
// - Combat final : « Que dis-tu à Valen ? » Le ponton, la promesse à Brume, Kael, Caïus, Sélène, le petit Ombrelin :
//   chaque mot trouvé en route fait vaciller Nocturion.
// - Épilogue : ce que tes choix ont changé, avant le générique.
// =====================================================================
// ---------------------------------------------------------------- Centrale : des sentinelles, pas un couloir de combats
const SENT191={centrale:{ce_g1:[3,1,2,0],ce_g2:[2,1,0,1],ce_e1:[0,2,0,3]},centrale2:{ce_g3:[3,1,0,1]}};
setInterval(()=>{try{if(mode!=='world'||busy||move||!G||F191().baseDone)return;const S=SENT191[G.map];if(!S)return;const t=now();
 for(const n of npcs(MAPS[G.map])){const P=n.tr&&S[n.tr.id];if(!P||F191()['t_'+n.tr.id]||n.walk)continue;if((n.st191??=t+rnd(500,1500))>t)continue;
  n.st191=t+1800+Math.random()*1200;n.si191=((n.si191||0)+1)%P.length;n.d=P[n.si191];
  if(Math.random()<.3){const e={n,k:'?',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),500)}
  if(sees19(n)){run(checkTrainers);return}}}catch(e){}},110);
{const M=MAPS.centrale,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);if(G.map==='centrale'&&!F191().baseDone)tip('garde191','Les sbires de la Centrale montent la garde et tournent la tête. Passe dans leur dos : si personne ne te voit, Orso ne s\'y attendra pas.')}}
const CEN191=['ce_g1','ce_t1','ce_g2','ce_e1','ce_g3','ce_g4'];
{const o0=orsoTalk;orsoTalk=async function(n){const F=F191();
  if(!F.baseDone&&F.v191gh==null)F.v191gh=CEN191.every(k=>!F['t_'+k])?1:0;
  if(F.v191gh===1&&!F.baseDone&&!F.v191ghS){F.v191ghS=1;await cine(1);await emote(n,'!',600);await say('Le Commandant Orso sursaute si fort qu\'il renverse son café sur le tableau de bord.');await cine(0)}
  await o0.apply(this,arguments);
  if(F.baseDone&&F.v191gh===1&&!F.v191ghR){F.v191ghR=1;G.money+=2500;sfx('ok');await say('Dans le tiroir d\'Orso, une enveloppe : "PRIME DE SÉCURITÉ". Elle n\'a protégé personne. Tu trouves 2 500 pièces !')}};const on=MAPS.centrale2.npcs.find(n=>n.name==='Commandant Orso');if(on)on.fn=orsoTalk}
PH19.unshift([t=>t.name==='Commandant Orso'&&f().v191gh===1&&f().v19cor!==3,['Euh… Turbines ? Quelqu\'un ? Allô ?! Pourquoi personne n\'a sonné l\'alerte ?!'],['Des incapables… Je suis entouré d\'incapables !'],'Orso : ÉLEC et OMBRE, pris de court. Le ROC bloque l\'électricité.']);

// ---------------------------------------------------------------- Observatoire : le sceau cède
async function seal191(p,s){ui.shake=10;sfx('roar');ui.flash=.3;ui.flashC='#7050a0';await say(`${s} Sur un écran, une ligne clignote en rouge : SCEAU DE NOCTURION — ${p} %.`)}
{const M=MAPS.obs,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=F191();if(G.map==='obs'&&F.obsScene&&!F.vex2&&!F.v191s3){F.v191s3=1;await cine(1);await seal191(3,'Le sol de l\'Observatoire tremble. Un grondement sourd monte du dôme.');await cine(0)}}}
{const ca191=consoleAct;consoleAct=async function(){const was=!!f().bar;await ca191.apply(this,arguments);const F=F191();if(!was&&F.bar&&!F.v191s2&&!F.vex2){F.v191s2=1;await seal191(2,'Derrière la barrière, le dôme gronde de plus belle.')}}}
const sealSel191=async()=>{const F=F191();if(F.selene2done&&!F.v191s1&&!F.vex2){F.v191s1=1;await seal191(1,'Le dôme rugit. Il n\'y a plus une seconde à perdre.')}};
{const st=MAPS.obs.npcs.find(n=>n.tr?.id==='selene2')?.tr;if(st){const w0=st.win;st.win=async function(){if(w0)await w0.apply(this,arguments);await sealSel191()}}}
// L'énigme des consoles (au lieu de l'ordre écrit en clair)
MAPS.obs.acts['12,5']=()=>say('Une note froissée, coincée sous un clavier :\n"La barrière obéit au Cycle. D\'abord celle qui veille quand tout dort. Puis ses mille sœurs, qui s\'allument une à une. Enfin, celui qui les chasse toutes. — S."');
// Kael retient un sbire ; Sélène peut être convaincue
{const tb191=trainerBattle;trainerBattle=async function(n){const id=n?.tr?.id,F=F191();
 if(id==='g8'&&!F.t_g8&&F.obsScene&&!F.vex2)return kaelG8191(n);
 if(id==='selene2'&&!F.t_selene2&&(F.v19ec2||F.doc_selene)&&!F.vex2)return selene191(n,tb191);
 return tb191.apply(this,arguments)}}
async function kaelG8191(n){const F=F191(),M=MAPS.obs,kc=M.npcs.find(x=>x.t==='rival'&&!x.fix);if(kc)kc.hid=1;try{return await kaelG8b191(n,F,M)}finally{if(kc)kc.hid=0}}
async function kaelG8b191(n,F,M){await cine(1);await say(n.tr.pre,n.tr.name,0,n.t);
 const p=[[0,1],[1,0],[-1,0],[0,-1]].map(([dx,dy])=>[n.x+dx,n.y+dy]).find(([x,y])=>fr191(M,x,y))||nearSpot(2);
 const k=tmpN('obs',{x:p[0],y:p[1],t:'rival',d:0,name:'Kael'});puff(p[0],p[1],'#ffffff',10);sfx('door');faceTo(k,n.x,n.y);await emote(k,'!',400);
 await say('Celui-là, il est pour moi ! Va aux consoles, je te couvre !','Kael');faceTo(n,k.x,k.y);await emote(n,'!',400);
 for(let i=0;i<3;i++){ui.shake=6;sfx('hit');puff((n.x+k.x)/2,(n.y+k.y)/2,i%2?'#ffd060':'#c060ff',10);await wait(350)}
 await say('Les créatures de Kael et celles du sbire s\'affrontent dans un tourbillon d\'éclairs et d\'ombres…');F.t_g8=1;await emote(n,'…',700);
 await say('…Battu par le petit frère du chef. Il va me renvoyer creuser à la mine.',n.tr.name,0,n.t);
 await emote(k,'♪',500);await say('Et d\'un ! Je retourne surveiller l\'entrée. Fonce !','Kael');puff(k.x,k.y,'#ffffff',8);rmN('obs',k);await cine(0);save();return'win'}
async function selene191(n,tb){const F=F191(),S='Admin Sélène';await cine(1);faceTo(n,G.x,G.y);await emote(n,'…',600);
 await say('Encore toi. Valen est là-haut, avec Nocturion. Si tu passes, tu brises le seul espoir des créatures d\'ombre.',S,0,'selene');
 const O=[];if(F.v19ec2)O.push(['"TU L\'AS SUIVI POUR LUI."','echo']);if(F.doc_selene)O.push(['"TU AS PEUR DE CE QUI S\'ÉVEILLE."','lettre']);O.push(['SE PRÉPARER AU COMBAT','fight']);
 const c=await choose(O.map(o=>o[0]),{w:330,title:'Que dis-tu à Sélène ?'});await cine(0);const k=c<0?'fight':O[c][1];if(k==='fight')return tb(n);
 await cine(1);if(k==='echo')await say('Dans la Grotte Écho, une pierre t\'a fait entendre sa voix. Tu le lui dis : elle ne l\'a pas suivi parce qu\'elle y croyait. Elle l\'a suivi pour qu\'il ne soit pas seul.');
 else await say('Tu lui parles de la lettre trouvée à la Centrale. "Je te suivrai, mais j\'ai peur de ce qui se réveillera." Elle avait raison d\'avoir peur.');
 await emote(n,'!',600);await say(k==='echo'?'…Cette grotte n\'oublie rien, hein.':'…Tu as lu ça. Je ne l\'ai jamais envoyée.',S,0,'selene');await emote(n,'…',900);
 await say('Si je me bats contre toi, je gagne peut-être. Et après ? Je le regarde disparaître sous ce dôme ?',S,0,'selene');
 await say('Non. Je ne veux ni le vaincre, ni te vaincre. Je veux le ramener. Alors on y va ensemble.',S,0,'selene');
 F.t_selene2=1;F.v191sel=1;await cine(0);await seleneTruth();await sealSel191();save();return'win'}
// Sélène entre au dôme avec toi
{const fb191=finalBattle;finalBattle=async function(){const F=F191();if(!F.v191s0){F.v191s0=1;await cine(1);ui.shake=14;sfx('roar');await say('CRAC. Quelque part sous tes pieds, la dernière chaîne vient de céder. SCEAU DE NOCTURION — 0 %.');await cine(0)}
 const se=F.v191sel&&!F.vex2?tmpN('dome',{x:3,y:6,t:'selene',d:3,name:'Sélène'}):null;try{return await fb191.apply(this,arguments)}finally{if(se)rmN('dome',se)}}}

// ---------------------------------------------------------------- Combat final : « Que dis-tu à Valen ? »
{const sf191=sendFoe;sendFoe=async function(...a){const r=await sf191.apply(this,a);try{if(B&&!B.coop&&!B.pvp&&B.tr?.name==='Vex'&&B.foe?.sp==='nocturion'&&!B.w191){B.w191=1;await words191()}}catch(e){console.error(e)}return r}}
{const um191=useMove;useMove=async function(s,id){if(s===1&&B?.hes191>0&&B.foe?.sp==='nocturion'&&B.foe.hp>0){B.hes191--;await say('Nocturion n\'attaque pas. Il regarde Valen, immobile.',0,1);return null}return um191.apply(this,arguments)}}
async function words191(grp){const F=F191(),V='Valen',lk='vex',A=[];
 if(F.badge2)A.push(['LE PONTON',async()=>{await say('"Maëlle t\'attend sur le ponton. Elle m\'a fait promettre de te le dire."');await say('…Le ponton. On y pêchait des nuits entières sans jamais rien attraper.',V,0,lk);return 1}]);
 if(F.v19ec1)A.push(['LA PROMESSE À BRUME',async()=>{await say('"Dans la Grotte Écho, j\'ai entendu ta promesse à Brume. Tu voulais réparer le ciel. Pas l\'éteindre."');await say('Tu… as entendu ça ? Personne n\'était censé l\'entendre.',V,0,lk);return 1}]);
 A.push(['KAEL',async()=>{const k=F.v19k;await say(k===1?'"Kael a cru pendant des années que c\'était sa faute si tu étais parti."':k===2?'"Tu avais raison sur la nuit. Mais pas comme ça. Pas en faisant payer tout le reste."':'"Kael n\'est pas venu te battre. Il est venu te ramener à la maison."');
  await say(k===1?'…Sa faute ? Il avait dix ans. C\'est moi qui suis parti. Moi.':k===2?'…Pas comme ça. Alors comment ? Dis-moi comment !':'À la maison… Je ne sais même plus où c\'est.',V,0,lk);return 1}]);
 if(F.v19cor===3||F.doc_caius)A.push(['CAÏUS',async()=>{await say(F.doc_caius?'"Caïus l\'a écrit noir sur blanc : celui qui tient le Cycle tient le monde. Il attend que tu brises le sceau pour tout prendre."':'"Corvin m\'a prévenu : Caïus ne pense qu\'au pouvoir. Il se sert de toi."');await say('Caïus… Non. Il m\'a toujours poussé à aller plus loin. Toujours plus loin…',V,0,lk);return 1}]);
 if(F.v191sel)A.push(['SÉLÈNE',async()=>{await say('Valen. Je t\'ai suivi pour que tu ne sois pas seul. Pas pour te regarder disparaître.','Sélène',0,'selene');await say('…Sélène.',V,0,lk);return 1}]);
 const om=G.party.find(m=>m.pb19);
 if(om)A.push(['LE PETIT OMBRELIN',async()=>{await say('Le petit Ombrelin du ponton s\'échappe de ta Capsule et file droit vers Valen !');await say('…Brume ? Non… Tu n\'es pas Brume. Mais tu as ses yeux.',V,0,lk);
  await say('Valen tombe à genoux et serre le petit Ombrelin contre lui. "Nocturion… arrête. Arrête, je t\'en prie."');B.hes191=2;bondUp(om,2);F.v191omF=1;return 2}]);
 await say('Le masque de Vex se fissure. Derrière, tu vois Valen, à bout de forces. Il hésite… C\'est le moment de lui parler.');
 let d=0;for(;;){const c=await choose([...A.map(a=>a[0]),'SE BATTRE'],{w:300,title:'Que dis-tu à Valen ?'});if(c<0||c>=A.length)break;
  const[lbl,fn]=A.splice(c,1)[0];d+=await fn();(F.v191w??=[]).includes(lbl)||F.v191w.push(lbl);if(!A.length)break}
 F.v191d=Math.max(F.v191d|0,d);if(!d)return;
 if(grp)return say(d>=3?'Valen relâche son emprise. Sa voix se brise, et Nocturion hésite : tout le groupe le sent.':'Valen vacille… puis se reprend.');
 if(d>=3){if(B.sky?.k==='eclipse'){B.sky=null;ui.flash=.5;ui.flashC=C.goldL}await say('Valen relâche son emprise. L\'éclipse se dissipe : Nocturion se bat seul, et sa colère retombe.');if(B.foe.hp>0)await statChange(1,'atk',-1);
  if(d>=5){await say('Valen n\'ordonne plus rien. Il regarde Nocturion… et Nocturion le regarde.');if(B.foe.hp>0)await statChange(1,'spd',-1)}}
 else await say('Valen vacille… puis se reprend. Il faudrait plus que des mots pour l\'atteindre. Des souvenirs, peut-être, que tu n\'as pas trouvés en chemin.')}

// ---------------------------------------------------------------- Épilogue : ce que tes choix ont changé
{const cr191=credits;credits=async function(){const F=F191();if(F.vex2&&F.balance&&!F.v191epi){F.v191epi=1;try{await epilogue191()}catch(e){console.error(e)}PV191.epi=0}return cr191.apply(this,arguments)}}
function epiDraw191(t){let g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#070a1e');g.addColorStop(.7,'#1a1d44');g.addColorStop(1,'#3a2a52');X.fillStyle=g;X.fillRect(0,0,W,H);
 for(let i=0;i<90;i++){const sx=(i*151+23)%W,sy=(i*67+11)%(H-90),tw2=((t/400|0)+i*7)%9;if(tw2)R(X,i%7?'#c8c6ec':'#ffffff',sx,sy,i%11?1:2,i%11?1:2)}
 halo191(380,60,46,'#e8ecff',.22);X.fillStyle='#f4f2ff';X.beginPath();X.arc(380,60,14,0,7);X.fill();X.fillStyle='#1a1d44';X.beginPath();X.arc(386,56,13,0,7);X.fill();
 halo191(W/2,H+30,170,'#ffb070',.18+.04*Math.sin(t/900));
 X.fillStyle='#0a0b18';X.beginPath();X.moveTo(0,H);for(let x=0;x<=W;x+=12)X.lineTo(x,H-52-Math.round(14*Math.sin(x/70)+6*Math.sin(x/23)));X.lineTo(W,H);X.closePath();X.fill();
 X.beginPath();X.moveTo(300,H-60);X.lineTo(318,H-96);X.lineTo(360,H-100);X.lineTo(378,H-60);X.closePath();X.fill();X.beginPath();X.arc(339,H-100,10,Math.PI,0);X.fill();halo191(339,H-104,22,'#c080ff',.18)}
async function epilogue191(){const F=F191();PV191.epi=1;musPlay('nuit');await fadeTo(0,900);
 const L=['Cette nuit-là, pour la première fois depuis des siècles, la nuit d\'Aurélys dura jusqu\'au matin.'];
 if(F.v191ph||F.badge2)L.push(F.v191tor===2?'À Port-Miroir, Gédéon rallume le phare chaque soir. Un Torrentor escorte parfois les barques jusqu\'au quai : les pêcheurs l\'appellent "le Calme".':'À Port-Miroir, Gédéon rallume le phare chaque soir. Plus aucun bateau ne s\'est perdu depuis.');
 if(F.v19forDone)L.push('Dans la Forêt Murmure, Iris a planté un jardin là où se dressaient les machines. Les créatures y chantent plus fort qu\'ailleurs.');
 if(F.v19cor===3)L.push('Corvin a raccroché sa capuche violette. À Cendreville, Tito lui apprend à creuser… pour de vrai.');else if(F.v19cor)L.push('Le lieutenant Corvin a disparu avec les derniers sbires. Certains jurent l\'avoir vu rôder du côté des Coteaux.');
 if(F.v192v===2)L.push('Pipo, le voleur masqué, balaie la Place du Carnaval chaque matin. Il dit que c\'est le plus beau déguisement qu\'il ait porté : celui d\'honnête homme.');else if(F.v192v===3)L.push('Le voleur masqué court toujours. Chaque année, au Carnaval, quelqu\'un jure l\'avoir reconnu dans la foule.');
 if(F.v192fa===1)L.push('Un soir, Faustine a frappé à la porte de l\'Atelier Mirella. Elles cousent ensemble les costumes du prochain Carnaval.');else if(F.v192fa)L.push('Faustine n\'a jamais été retrouvée. Mais au Grand Bal, une robe de nuit étoilée danse toujours un peu à l\'écart.');
 if(F.v191gh===1)L.push('Le Commandant Orso raconte encore qu\'un fantôme a traversé sa Centrale sans déclencher une seule alarme. Personne ne le croit.');
 L.push(F.v191sel?'Sélène est restée près du dôme, entre Valen et Nocturion. Elle dit qu\'il lui reste une dette à régler : Caïus.':'Sélène a quitté l\'Observatoire sans un mot. On dit qu\'elle est partie vers le nord, sur la piste de Caïus.');
 if((F.v191d|0)>=3)L.push('Valen ne parle pas beaucoup de cette nuit-là. Mais il répète souvent qu\'on ne l\'a pas battu : on l\'a retrouvé.');
 for(const s of L)await say(s);
 const om=G.party.find(m=>m.pb19);if(om&&F.v191omF){await say('Le petit Ombrelin du ponton regarde Valen… puis toi.');const c=await choose(['IL RESTE AVEC MOI','IL VA AVEC VALEN'],{w:240,title:'Le petit Ombrelin'});
  if(c===1&&G.party.length>1){G.party.splice(G.party.indexOf(om),1);F.v191om=4;await say('Le petit Ombrelin s\'est blotti contre Valen. Depuis, on les voit chaque soir au bout du ponton, avec Maëlle. Il ne fixe plus le lac : il n\'attend plus personne.')}
  else{F.v191om=5;await say('Le petit Ombrelin a choisi de rester avec toi. Mais chaque soir, il file s\'asseoir un moment au bout du ponton, à côté de Valen.')}}
 await say('Et Kael ? Il a retrouvé son frère. Il dit qu\'il te doit tout… et qu\'il te battra la prochaine fois.');
 await fadeTo(1,900)}
// Après l'aventure : le petit Ombrelin qui a choisi Valen
MAPS.dome.npcs.push({x:3,y:5,t:'mon',sp:'ombrelin',d:2,a:.9,cond:()=>!!F191().balance&&F191().v191om===4,fn:()=>say('Le petit Ombrelin dort, roulé en boule contre la botte de Valen. Il ronfle tout doucement.')});
{const q191b=quests;quests=function(){const Q=q191b(),F=F191();if(F.baseDone&&F.v191gh===1)Q.push(['Le fantôme de la Centrale',2,'Tu as traversé la Centrale de Volterre sans te faire voir une seule fois. Orso n\'en revient toujours pas.']);
 if(F.v191sel)Q.push(['Les mots de Sélène',2,'Tu as convaincu Sélène sans combattre. Elle est entrée au dôme avec toi.']);
 if(F.v191w?.length)Q.push(['Les mots pour Valen',2,`En plein combat, tu as parlé à Valen : ${F.v191w.join(', ').toLowerCase()}.`]);return Q}}
