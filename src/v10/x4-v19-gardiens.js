// =====================================================================
// 19 — LES GARDIENS DU CYCLE : Solarion et Nocturion ne se capturent plus en trois lignes. Ils se gagnent.
// - SOLARION, « la piste de l'aube » : il s'envole quand on l'approche et laisse une Plume d'Aube. On le suit du Mont Braise
//   aux Coteaux d'Aurore, puis à Bourg-Lueur, « là où tout a commencé ». Puis l'Épreuve du Zénith : tenir 6 tours sous son
//   soleil. Il ne se laisse pas capturer : il te choisit.
// - NOCTURION, « les chaînes » : il recule devant les humains. La nuit, trois fragments de ses chaînes racontent ce que les
//   fondateurs lui ont fait (Lunévie, la Clairière Secrète, le dôme). Puis l'Épreuve de la Nuit : le ramener sous le quart de
//   ses PV sans le mettre K.O., et sans la moindre attaque LUMIÈRE.
// - Les deux frères ne se sont jamais parlé depuis les chaînes : leur réconciliation, au Sanctuaire, fait naître Crépuscel.
// =====================================================================
const GV=()=>f();
// --- Combats-épreuves : règle annoncée, Capsules inutiles, issue « trial » quand la condition est remplie
{const so19g=sendOut;sendOut=async function(...a){const r=await so19g.apply(this,a);const T=B?.o?.trial;if(T&&!B.tri0){B.tri0=1;
 if(T.sky){B.sky={k:T.sky,n:99};ui.flash=.5;ui.flashC=SKY[T.sky][1];await say(SKY[T.sky][2],0,1)}sfx('shard');await say(T.rule,0,1)}return r}}
{const tb19g=throwBall;throwBall=async function(k){if(B?.o?.trial){G.bag[k]=(G.bag[k]||0)+1;await say(`${SP[B.foe.sp].name} dévie la Capsule d'un revers. Un gardien ne se capture pas : il te choisira… ou non.`,0,1);return false}return tb19g(k)}}
{const um19g=useMove;useMove=async function(s,id){const T=B?.o?.trial;if(T?.ban&&s===0&&MV[id]?.t===T.ban){await say(`${SP[B.foe.sp].name} se détourne de la lumière en grondant… L'attaque se perd dans l'ombre !`,0,1);return null}
 const r=await um19g.apply(this,arguments);if(T?.k==='apaiser'&&s===0&&B?.foe&&B.foe.hp>0&&B.foe.hp<=st(B.foe).hp*T.hp)return'trial';return r}}
{const et19g=endTurn;endTurn=async function(...a){const r=await et19g.apply(this,a);const T=B?.o?.trial;if(r||!T||!B.foe||B.foe.hp<=0)return r;
 if(T.k==='tenir'){if(T.mid&&B.turn===Math.ceil(T.n/2)&&!B.triM){B.triM=1;await say(T.mid,SP[B.foe.sp].name)}if(B.turn>=T.n)return'trial';if(B.turn>0)await say(`Épreuve : ${B.turn}/${T.n} tours.`,0,1)}
 return r}}
async function gv19Join(sp,flag){const m=mon(sp,50);m.aff=150;dex(sp,2);GV()[flag]=1;if(G.party.length<6)G.party.push(m);else G.box.push(m);
 if(typeof lgAnnounce==='function')lgAnnounce(sp);jingle('item');await say(`${SP[sp].name} rejoint ${G.party.includes(m)?'ton équipe':'la Boîte'} ! Il t'a choisi.`);save()}
// --- Objets du monde : fragments de chaîne (violets, la nuit) et dessin
{const do19g=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='chain19')return do19g(k,sx,sy,t,n);const b=Math.round(Math.sin(t/350)*2);glowAt(sx+16,sy+12,34,.35+.15*Math.sin(t/260));
 X.drawImage(SHD2,sx+8,sy+24,16,5);for(const[dx,dy]of[[8,10],[14,14],[20,10]]){R(X,C.ink,sx+dx-1,sy+dy-1+b,8,8);R(X,'#b080e0',sx+dx,sy+dy+b,6,6);R(X,'#3a2a5a',sx+dx+2,sy+dy+2+b,2,2)}
 if((t/200|0)%5===0)R(X,'#ffffff',sx+22,sy+8+b,2,2)}}
const FRAG19=[{m:'lunevie',x:8,y:17,t:'Lunévie'},{m:'clairiere',x:2,y:5,t:'la Clairière Secrète'},{m:'dome',x:8,y:4,t:'le dôme'}];
const frag19N=()=>FRAG19.filter((_,i)=>GV()['v19f'+i]).length;
FRAG19.forEach((F,i)=>MAPS[F.m].npcs.push({x:F.x,y:F.y,t:'obj',k:'chain19',time:'n',cond:()=>GV().balance&&GV().v19noc&&!GV().legN&&!GV()['v19f'+i],fn:()=>frag19(i)}));
// --- Solarion : la piste de l'aube
const SOL19=[{m:'coteaux',x:17,y:2},{m:'bourg',x:15,y:10}];
SOL19.forEach((S,i)=>MAPS[S.m].npcs.push({x:S.x,y:S.y,t:'mon',sp:'solarion',d:0,time:'j',sol19:i+1,cond:()=>GV().balance&&!GV().legS&&GV().v19sol===i+1,fn:()=>sol19Fly(i+1)}));
async function solTakeoff(n,txt){await cine(1);if(n){rays(n.x,n.y,C.goldL,2200);await emote(n,'!',500)}ui.shake=10;sfx('roar');ui.flash=.6;ui.flashC='#ffe8a0';await say(txt);
 if(n){puff(n.x,n.y,'#ffe8a0',26);for(let i=0;i<24;i++)AMB.push({k:'pf',x:n.x*TS+16,y:n.y*TS+8,vx:(Math.random()-.5)*3,vy:-1-Math.random()*3,l:50,ml:50,c:i%2?'#ffd23a':'#ffffff'});n.hid=1}
 await wait(400);sfx('shard');G.keys.plume=(G.keys.plume||0)+1;ui.pop={ic:ICO.star,t0:now()};await say(`Une plume dorée tombe en tournoyant. Tu ramasses une PLUME D'AUBE (${G.keys.plume}/3) ! Elle est tiède, comme un matin d'été.`);await cine(0)}
async function sol19Fly(step){const F=GV(),M=MAPS[G.map],n=npcs(M).find(x=>x.sol19===step);
 if(step===1){await solTakeoff(n,'Solarion pose sur toi ses yeux d\'or… puis bondit dans le ciel. Il ne se laissera pas approcher si facilement.');F.v19sol=2;
  await say('Il file vers le nord, vers l\'endroit où tout a commencé… Bourg-Lueur ?');}
 else{await cine(1);if(n){rays(n.x,n.y,C.goldL,2600);faceTo(n,G.x,G.y);await emote(n,'…',900)}
  await say('Cette fois, Solarion ne s\'envole pas. Une voix chaude résonne directement dans ta tête.');
  await say('« Enfant du Cycle. Tu as rendu la nuit à mon frère. Moi, je l\'ai laissé enchaîner, autrefois. J\'ai détourné les yeux. »','Solarion');
  await say('« Montre-moi que la lumière peut protéger sans écraser. Rejoins-moi au sommet du Mont Braise, quand le soleil sera haut. »','Solarion');
  await cine(0);await solTakeoff(n,'Solarion déploie ses ailes de flamme et s\'élève vers le Mont Braise.');F.v19sol=3;for(const x of MAPS.mont.npcs)if(x.sp==='solarion')x.hid=0}
 save()}
async function solTrial(){const F=GV(),n=npcs(MAPS.mont).find(x=>x.sp==='solarion');await cine(1);if(n)rays(n.x,n.y,C.goldL,2400);ui.shake=10;sfx('roar');
 await say('« Tu es venu. Voici l\'Épreuve du Zénith. Mon soleil va s\'abattre sur toi : tiens six tours sans que les tiens ne tombent tous. »','Solarion');
 await say('« Je ne veux pas que tu me battes. Je veux voir comment tu protèges ceux qui comptent sur toi. »','Solarion');const ok=await ask('Relever l\'Épreuve du Zénith ?');await cine(0);if(!ok)return;
 const m=mon('solarion',50);m.item=null;const r=await battle([m],{legend:1,trial:{k:'tenir',n:6,sky:'sun',rule:'Épreuve du Zénith : tiens 6 tours ! Soigne, change de créature, protège-toi : tout est permis, sauf les Capsules.',mid:'« Tu ne fuis pas. Bien. »'}});
 if(r==='trial'){await cine(1);if(n)rays(n.x,n.y,C.goldL,2600);await say('Le soleil se voile doucement. Solarion replie ses ailes et incline sa tête immense devant toi.');
  await say('« Tu as tenu. Pas en frappant plus fort : en veillant sur les tiens. C\'est ce que j\'aurais dû faire, il y a mille ans. »','Solarion');await cine(0);await gv19Join('solarion','legS');
  await say('Partout dans Aurélys, ce matin-là, les gens jurent que l\'aube était plus dorée que d\'habitude.')}
 else if(r==='catch'){F.legS=1;await say('Solarion a rejoint ton équipe. Prends soin de lui.')}   // combat en groupe (aventure à plusieurs) : épreuve classique
 else if(r==='win')await say('Solarion s\'élève, blessé dans sa fierté. « Tu n\'as rien compris. » Il reviendra demain au sommet.');}
// --- Nocturion : les chaînes
async function noc19Meet(){const F=GV(),n=npcs(MAPS.dome).find(x=>x.sp==='nocturion');await cine(1);if(n)await emote(n,'!',600);ui.shake=6;sfx('roar');
 await say('Nocturion recule dans l\'ombre du dôme. Ses yeux d\'améthyste brillent de méfiance. Des siècles de chaînes… Il ne supporte plus qu\'on s\'approche.');
 await say('Une voix grave, froide comme une nuit d\'hiver : « Les humains m\'ont chanté une berceuse, puis ils m\'ont enchaîné. Pourquoi serais-tu différent ? »','Nocturion');
 if(n){puff(n.x,n.y,'#9a5ad0',24);n.hid=1}F.v19noc=1;await say('Il se dissout dans la nuit. Au sol, là où il se tenait, brillent des maillons violets…');
 await say('Les fragments de ses chaînes. On dit qu\'ils gardent la mémoire de ce qu\'ils ont vu. Il y en aurait trois : ici, à Lunévie, et dans la Clairière Secrète.');await cine(0);save()}
const VIS19=[
 ['Le fragment s\'illumine. Une vision t\'envahit : Lunévie, il y a des siècles. Des lanternes flottent sur le lac, des enfants dansent sur les pontons.',
  'Au-dessus de l\'eau plane une silhouette immense et douce. Les habitants lèvent leurs lanternes vers elle et l\'appellent « le Berger des étoiles ».',
  'La vision se brouille. Une voix très lointaine : « …ils m\'aimaient, autrefois. »'],
 ['Le fragment s\'illumine. Sept silhouettes en robe blanche entourent une créature endormie. Elles chantent une berceuse, si douce que les arbres se taisent.',
  'Le plus jeune des fondateurs pleure en chantant : « Pardonne-nous. Nos champs ont faim de soleil. Nous te réveillerons quand le ciel sera de nouveau partagé. »',
  'Le serment gravé sur la stèle de la clairière… Personne ne l\'a jamais tenu.'],
 ['Le fragment s\'illumine. Le dôme n\'existe pas encore : il n\'y a que la montagne, et des chaînes d\'Éclats d\'Aube rougies au feu de Solarion lui-même.',
  'Pendant qu\'on scelle les chaînes, Solarion détourne les yeux. Il ne dit rien. Il ne fait rien.',
  'Une voix grave, dans ta tête : « Mon frère a laissé faire. Je ne lui ai jamais demandé pourquoi. Je crois que j\'ai peur de la réponse. »']];
async function frag19(i){const F=GV(),M=MAPS[G.map],n=npcs(M).find(x=>x.k==='chain19');await cine(1);sfx('shard');ui.flash=.5;ui.flashC='#b080e0';if(n)stream([n.x,n.y],[G.x,G.y],['#b080e0','#ffffff'],24);await wait(500);
 for(const l of VIS19[i])await say(l);F['v19f'+i]=1;
 if(i===0){const v=npcs(M).find(x=>x.name==='Valen');if(v){faceTo(v,G.x,G.y);await emote(v,'…',800);await say('…Tu l\'as vu aussi ? Les lanternes. Brume aurait adoré ces nuits-là.','Valen',0,'valen')}}
 const k=frag19N();if(k>=3)for(const x of MAPS.dome.npcs)if(x.sp==='nocturion')x.hid=0;await say(k<3?`Fragments de chaîne : ${k}/3. Il en reste ${3-k} à trouver, la nuit.`:'Les trois fragments vibrent ensemble dans ton sac. Nocturion t\'attend sous le dôme, la nuit.');await cine(0);save()}
async function nocTrial(){const F=GV(),n=npcs(MAPS.dome).find(x=>x.sp==='nocturion');await cine(1);if(n){n.hid=0;await emote(n,'…',800)}ui.shake=6;sfx('roar');
 await say('Nocturion t\'attend, immobile. Les trois fragments flottent hors de ton sac et tournent autour de lui.');
 await say('« Tu as vu. Les lanternes, la berceuse, les chaînes. Alors réponds-moi par tes actes, pas par tes mots. »','Nocturion');
 await say('« Approche. Ramène-moi au bord de la chute… sans me faire tomber. Et garde ta lumière loin de moi. »','Nocturion');const ok=await ask('Relever l\'Épreuve de la Nuit ?');await cine(0);if(!ok)return;
 const nm19=mon('nocturion',50);nm19.item=null;const r=await battle([nm19],{legend:1,trial:{k:'apaiser',hp:.25,ban:'LUM',sky:'eclipse',rule:'Épreuve de la Nuit : fais descendre Nocturion sous le quart de ses PV sans le mettre K.O. Aucune attaque LUMIÈRE !'}});
 if(r==='trial'){await cine(1);await say('Nocturion vacille… puis s\'arrête. Il te regarde longtemps, sans colère. Les fragments se brisent en poussière d\'étoiles.');
  await say('« Tu pouvais me faire tomber. Tu ne l\'as pas fait. Mille ans que j\'attendais quelqu\'un qui sache s\'arrêter. »','Nocturion');await cine(0);await gv19Join('nocturion','legN');
  await say('Cette nuit-là, au-dessus d\'Aurélys, le ciel est si clair que l\'on voit la Voie lactée depuis les rues de Volterre.')}
 else if(r==='catch'){F.legN=1;await say('Nocturion a rejoint ton équipe. Prends soin de lui.')}
 else if(r==='win')await say('Nocturion s\'effondre… puis se dissout dans l\'ombre. Tu l\'as fait tomber. Il faudra revenir, une autre nuit, et savoir t\'arrêter.')}
// --- Branchement sur les gardiens existants (Mont Braise le jour, dôme la nuit)
{const lg19=legend;legend=async function(sp){const F=GV();
 if(sp==='solarion'&&F.balance&&!F.legS){if(!F.v19sol){const n=npcs(MAPS[G.map]).find(x=>x.sp==='solarion');await solTakeoff(n,'Solarion pose sur toi ses yeux d\'or… puis bondit dans le ciel dans une gerbe d\'étincelles. Il ne se laissera pas approcher si facilement.');
   F.v19sol=1;await say('Il file au-dessus de la forêt, vers les hauteurs des Coteaux d\'Aurore.');save();return}if(F.v19sol>=3)return solTrial();return say('Le sommet est vide. Solarion est quelque part ailleurs, au soleil…')}
 if(sp==='nocturion'&&F.balance&&!F.legN){if(!F.v19noc)return noc19Meet();if(frag19N()>=3)return nocTrial();return say('Nocturion n\'est qu\'une ombre au fond du dôme. Il attend que tu aies vu ce que gardent ses chaînes.')}
 return lg19(sp)}}
// L'apparition à Bourg-Lueur ou aux Coteaux se déclenche quand on approche à 3 pas
for(const S of SOL19){const M=MAPS[S.m],s0=M.step;M.step=async function(){const F=GV(),n=npcs(M).find(x=>x.sol19&&!x.hid);if(n&&Math.abs(n.x-G.x)+Math.abs(n.y-G.y)<=3&&F.balance&&!F.legS){await sol19Fly(n.sol19);return true}return s0?s0.apply(this,arguments):undefined}}
// --- Objectifs, guide, journal, rumeurs
{const pg19=postGoal;postGoal=function(g){if(g.balance&&!g.legS){const s=g.v19sol|0;return['Les Gardiens : Solarion veille au sommet du Mont Braise, le jour. Va à sa rencontre.','Solarion s\'est envolé : on l\'a vu se poser sur les hauteurs des Coteaux d\'Aurore, le jour.','Solarion file vers l\'endroit où tout a commencé : Bourg-Lueur, le jour.','Solarion t\'attend au sommet du Mont Braise pour l\'Épreuve du Zénith, quand le soleil est haut.'][Math.min(3,s)]}
 if(g.balance&&!g.legN){if(!g.v19noc)return'Les Gardiens : Nocturion s\'est réfugié sous le dôme de l\'Observatoire. Va le voir, la nuit.';if(frag19N()<3)return`Nocturion ne fait confiance à personne. La nuit, trouve les fragments de ses chaînes : dôme, Lunévie, Clairière Secrète (${frag19N()}/3).`;return'Nocturion t\'attend sous le dôme pour l\'Épreuve de la Nuit.'}
 return pg19(g)}}
// Pendant la piste, le sommet est vide ; pendant la quête des fragments, le dôme aussi
{const n=MAPS.mont.npcs.find(x=>x.sp==='solarion'&&x.time==='j'&&x.fn);if(n){const c0=n.cond;n.cond=()=>c0()&&!(GV().v19sol>=1&&GV().v19sol<3)}}
{const n=MAPS.dome.npcs.find(x=>x.sp==='nocturion'&&x.time==='n'&&x.fn);if(n){const c0=n.cond;n.cond=()=>c0()&&!(GV().v19noc&&frag19N()<3)}}
GDT.unshift([/Va à sa rencontre|Épreuve du Zénith/,()=>({...gN('mont',null,9,1,'Solarion'),hint:night()?'Solarion ne se montre que le jour':null})],
 [/hauteurs des Coteaux/,()=>({m:'coteaux',x:17,y:2,lbl:'Hauteurs des Coteaux',hint:night()?'Solarion ne se montre que le jour':null})],
 [/où tout a commencé/,()=>({m:'bourg',x:15,y:10,lbl:'Bourg-Lueur',hint:night()?'Solarion ne se montre que le jour':null})],
 [/réfugié sous le dôme|Épreuve de la Nuit/,()=>({...gN('dome',null,5,1,'Nocturion'),hint:night()?null:'Nocturion ne se montre que la nuit'})],
 [/fragments de ses chaînes/,()=>{const i=FRAG19.findIndex((_,j)=>!GV()['v19f'+j]);const F=FRAG19[i<0?0:i];return{m:F.m,x:F.x,y:F.y,lbl:'Fragment de chaîne',hint:night()?null:'Les fragments ne brillent que la nuit'}}]);
{const q19g=quests;quests=function(){const Q=q19g(),g=GV(),i=Q.findIndex(q=>q&&q[0]==='Les gardiens');if(i>=0&&g.balance){const s=g.legS?'Solarion t\'a choisi':['Solarion : au sommet du Mont Braise (jour)','Solarion : hauteurs des Coteaux (jour)','Solarion : Bourg-Lueur (jour)','Solarion : Épreuve du Zénith au sommet'][Math.min(3,g.v19sol|0)],
  n=g.legN?'Nocturion t\'a choisi':!g.v19noc?'Nocturion : sous le dôme (nuit)':frag19N()<3?`Nocturion : fragments ${frag19N()}/3 (nuit)`:'Nocturion : Épreuve de la Nuit sous le dôme';
  Q[i]=['Les gardiens',g.legS&&g.legN?2:1,`${s} · ${n}. Plumes d'Aube : ${G.keys.plume||0}/3.`]}return Q}}
{const h19g=headline19;headline19=function(){const g=GV();if(g.balance&&!g.legS&&g.v19sol&&g.v19sol<3)return'Extra ! Un oiseau de flamme aperçu au-dessus d\'Aurélys ! Il se pose quelques instants, puis repart vers le nord. Les enfants ramassent des plumes dorées !';
 if(g.balance&&!g.legN&&g.v19noc)return'Extra ! Des lueurs violettes la nuit, à Lunévie et au fond de la Forêt Murmure ! Les anciens parlent de « chaînes qui se souviennent ».';return h19g()}}
// Valen, quand Nocturion t'a choisi
{const vt19=valenTalk;valenTalk=async function(...a){const F=GV();if(F.legN&&!F.v19val){F.v19val=1;await cine(1);await say('…Nocturion t\'a choisi. Je l\'ai senti, cette nuit-là. Le ciel était si clair.','Valen',0,'valen');
 await say('J\'ai voulu le libérer en cassant tout. Toi, tu l\'as écouté. C\'est toute la différence, je crois.','Valen',0,'valen');await say('Brume aurait été fier de toi. …Moi aussi, je crois.','Valen',0,'valen');await cine(0);save();return}return vt19.apply(this,a)}}
// --- Crépuscel : avant le combat, les deux frères se parlent enfin (une seule fois)
{const l2_19=legend2;legend2=async function(sp,lv,flag,col){const F=GV();if(sp!=='crepuscel'||F.v19rec2||F.legC)return l2_19.apply(this,arguments);const S='sanctuaire';
 await cine(1);const so=tmpN(S,{x:4,y:5,t:'mon',sp:'solarion',d:3}),no=tmpN(S,{x:8,y:5,t:'mon',sp:'nocturion',d:2});sfx('ball');puff(4,5,'#ffe8a0',16);puff(8,5,'#b080e0',16);await wait(500);
 await say('Solarion et Nocturion jaillissent de leurs capsules. Pour la première fois depuis mille ans, les deux gardiens se font face.');await emote(no,'…',900);
 await say('« Frère. Pendant mille ans, j\'ai brillé au-dessus de ta prison. Je me répétais que c\'était le prix des moissons. »','Solarion');
 await say('« Je ne te demande pas de pardonner. Je te demande de partager le ciel. Comme avant. »','Solarion');await emote(no,'…',900);
 await say('« Un enfant m\'a écouté quand tu détournais les yeux. Il aurait pu me faire tomber, et il s\'est arrêté. »','Nocturion');
 await say('« Si un enfant le peut… un gardien aussi. »','Nocturion');await walk(so,'r',400);await walk(no,'l',400);
 ui.flash=.8;ui.flashC='#ffffff';sfx('shard');rays(6,4,C.goldL,2600);rays(6,4,'#c060ff',2600);ui.shake=10;await wait(700);rmN(S,so);rmN(S,no);
 await say('La lumière et l\'ombre s\'enroulent l\'une autour de l\'autre au-dessus de l\'autel… et prennent forme.');F.v19rec2=1;save();await cine(0);return l2_19.apply(this,arguments)}}
