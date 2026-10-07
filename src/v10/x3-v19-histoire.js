// =====================================================================
// 19 — L'HISTOIRE PREND SON TEMPS : des moments à vivre entre les combats.
// ACTE I
// - Route 1 : Kael t'apprend à lire la faune, puis te lance la course jusqu'à Cendreville.
// - Mine : les sbires montent la garde et tournent la tête (passe dans leur dos… ou affronte-les).
//   Corvin coincé sous l'éboulement : l'aider ou le laisser ? Le choix compte, plus tard, à Volterre.
// - Forêt Murmure : « Le silence de la forêt ». Trois machines de la Team Éclipse terrorisent les créatures : une cachée dans
//   les herbes (ta créature la flaire), une gardée par une créature envoûtée, une surveillée par un sbire. Lis l'étiquette,
//   coupe le bon fil. La forêt se réveille… et l'on découvre pourquoi Vex voulait qu'elle se taise.
// - Mont Braise : la montagne gronde et le sommet bat comme un cœur pendant l'ascension.
// - Après l'éclipse : une nuit au coin du feu avec Kael.
// ACTE II
// - Volterre : Corvin revient. Allié (il sabote le générateur d'Orso en plein combat) ou rancunier (il t'attend de pied ferme).
// - Les crieurs racontent l'histoire du monde au fil de l'aventure ; les habitants vivent l'éclipse.
// =====================================================================
SONG.silence19=[420,['sine',.02,'C3 - - - - - - - - - - - - - - - D#3 - - - - - - - - - - - - - - -'],['triangle',.012,'. . . . . . . . G2 - - - - - - - . . . . . . . . F#2 - - - - - - -']];
const F19=()=>f();
// ---------------------------------------------------------------- Route 1 : la leçon de Kael
async function r1Lesson(){const F=F19();F.v19r1=1;const R='route1',M=MAPS[R];
 const free=(x,y)=>{const c=M.rows[y]?.[x];return c&&!SOLID.has(c)&&!M.npcs.some(n=>n.x===x&&n.y===y)&&!(x===G.x&&y===G.y)};
 let kx=G.x,ky=G.y-2;if(!free(kx,ky))[kx,ky]=nearSpot(2);const k=tmpN(R,{x:kx,y:ky,t:'rival',d:1,name:'Kael'});
 let sx=null,sy=null;for(const[x,y]of[[5,13],[6,12],[4,14],[6,14],[13,13],[14,12],[15,14],[5,7]])if(free(x,y)&&!M.npcs.some(n=>Math.abs(n.x-x)+Math.abs(n.y-y)<1)){sx=x;sy=y;break}
 let rt=null;if(sx!=null){for(const n of M.npcs.filter(n=>n.fauna&&Math.abs(n.x-sx)+Math.abs(n.y-sy)<=1))rmFauna(n);rt={x:sx,y:sy,x0:sx,y0:sy,d:0,t:'mon',sp:'ratounet',lv:3,fauna:1,wild:1,slp:true,tt:99999,fn:faunaMeet};if(typeof faOn==='function'&&faOn())rt.fid=faId();M.npcs.push(rt)}
 await cine(1);await emote(k,'!',500);faceTo(k,G.x,G.y);await say('Chut ! Pas un bruit… Viens voir.','Kael');
 if(rt){await camTo(rt.x,rt.y,700);await emote(rt,'…',900);await say('Un Ratounet qui fait la sieste. Ici, les créatures sauvages vivent à découvert : tu les vois, elles te voient. À toi de choisir qui affronter.','Kael');
  await say('Approche-toi sans bruit d\'une créature endormie et le combat commence pendant son sommeil. Rêvé pour une capture.','Kael');await camBack(500)}
 await say('Les timides détalent, les curieuses viennent te renifler… et les costaudes défendent leur coin. Celles-là, on les contourne. Ou on fonce !','Kael');
 await say('Ah, et si une touffe d\'herbe frémit toute seule : fonce. Une créature rare se cache dedans.','Kael');await emote(k,'♪',500);
 await say('Bon ! Le premier à Cendreville a gagné. Et ne traîne pas : Brasia n\'attend pas les escargots !','Kael');
 await walk(k,'uuu',140);await fadeTo(1,200);rmN(R,k);await fadeTo(0,200);await cine(0);save()}
{const M=MAPS.route1,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=F19();if(F.rival1&&F.starter&&!F.v19r1&&!F.badge&&G.y>=M.rows.length-3)await r1Lesson()}}
// ---------------------------------------------------------------- Mine : sentinelles et choix de Corvin
const SENT19={gm1:[2,3,2,1],gm2:[1,3,0,3],gm3:[0,2,0,3]};
const sees19=n=>{const M=MAPS[G.map];let x=n.x,y=n.y;for(let k=1;k<=4;k++){x+=DX[n.d];y+=DY[n.d];if(x===G.x&&y===G.y)return true;const c=M.rows[y]?.[x];if(!c||SOLID.has(c)||npcs(M).some(o=>o!==n&&o.x===x&&o.y===y))return false}return false};
setInterval(()=>{try{if(mode!=='world'||busy||move||!G||G.map!=='mine'||F19().mine)return;const t=now();
 for(const n of npcs(MAPS.mine)){const P=n.tr&&SENT19[n.tr.id];if(!P||F19()['t_'+n.tr.id]||n.walk)continue;if((n.st19??=t+rnd(400,1400))>t)continue;
  n.st19=t+1700+Math.random()*1100;n.si19=((n.si19||0)+1)%P.length;n.d=P[n.si19];
  if(Math.random()<.3){const e={n,k:'?',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),500)}
  if(sees19(n)){run(checkTrainers);return}}}catch(e){}},110);
{const M=MAPS.mine,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);if(!F19().mine)tip('garde','Les sbires montent la garde et tournent la tête de temps en temps. Passe dans leur dos pour les éviter… ou affronte-les.')}}
{const cv=MAPS.mine.npcs.find(n=>n.tr?.id==='corvin');if(cv)cv.tr.win=()=>corvinFlees()}
{const cf0=corvinFlees;corvinFlees=async function(){if(F19().v19cor)return cf0();const n=MAPS.mine.npcs.find(x=>x.tr?.id==='corvin'),c=tmpN('mine',{x:n.x,y:n.y,t:'grunt',d:n.d,name:'Lieutenant Corvin'});faceTo(c,G.x,G.y);await cine(1);
 await say('Peu importe… On a déjà assez d\'éclats pour le bracelet du chef. Et pour le sceau de l\'Observatoire.','Lieutenant Corvin');await emote(c,'!',500);
 await say('Oups. Oublie ce que je viens de dire ! Repli !','Lieutenant Corvin');await cinema('mine');
 ui.shake=12;sfx('hit');debris(c.x,c.y,'#a08a78',22);c.d=0;await wait(300);await say('AAARGH ! Ma jambe ! La poutre…','Lieutenant Corvin');await emote(c,'…',700);
 await say('Le plafond craque encore. Corvin est coincé sous une poutre, à deux pas des éboulis. Il serre les dents pour ne pas crier.');
 const i=await choose(['L\'AIDER','LE LAISSER LÀ'],{w:220,title:'Corvin est coincé'});const ld=G.party.find(alive);
 if(i!==1){F19().v19cor=1;await say(`${ld?nm(ld):'Ta créature'} glisse son dos sous la poutre et pousse de toutes ses forces…`);ui.shake=8;sfx('bump');puff(c.x,c.y,'#c8b8a0',12);await wait(400);
  await say('La poutre roule sur le côté. Corvin se relève en grimaçant.');faceTo(c,G.x,G.y);await emote(c,'?',700);
  await say('…Pourquoi t\'as fait ça ? Je suis ton ennemi, gamin. J\'ai fait sauter la galerie de ton copain.','Lieutenant Corvin');await emote(c,'…',900);
  await say('Je n\'oublie jamais une dette. Jamais. On se reverra.','Lieutenant Corvin');await walk(c,'ll',420)}
 else{F19().v19cor=2;await say('Tu tournes les talons. Les mineurs le sortiront de là… et la police aussi.');await emote(c,'!',500);
  await say('Hé ! HÉ ! Tu vas me laisser là ?! Tu vas le regretter, tu m\'entends ? Le chef saura qui tu es !','Lieutenant Corvin')}
 await fadeTo(1,250);rmN('mine',c);await cine(0);await fadeTo(0,250);save()}}
{const me0=mineEnd;mineEnd=async function(){await me0.apply(this,arguments);const v=F19().v19cor;if(v===1)await say('(Plus tard, les mineurs racontent qu\'un homme en capuche violette a été vu boitant vers les vieux puits. Personne ne l\'a arrêté.)');
 else if(v===2)await say('(Plus tard, les mineurs racontent qu\'ils ont sorti le lieutenant Corvin des gravats. Il a été emmené au commissariat de Carnavelle, en criant ton nom.)')}}
// ---------------------------------------------------------------- Forêt Murmure : le silence de la forêt
const DIA19=[{x:5,y:1,hid:1,lab:'Une étiquette : "SÉCURITÉ — Ne coupez ni le fil du milieu, ni celui couleur de feu."',ok:2},
 {x:17,y:14,lab:'Une étiquette : "Le bon fil a la couleur de l\'eau qui dort."',ok:1,guard:'hiboulume'},
 {x:22,y:7,lab:'Une étiquette : "Ni le bleu, ni celui de droite. — Vex"',ok:0,grunt:1}];
const for19On=()=>{const F=F19();return!!F.mine&&!F.rival2&&!F.v19forDone};
const dia19N=()=>DIA19.filter((d,i)=>F19()['v19d'+i]).length;
function fauAdj(M,n){if(M===MAPS.foret){if(for19On())return 2;if(F19().v19forDone)return Math.min(8,n+1)}return n}
{const mp19=musPlay;musPlay=function(k){if(G?.map==='foret'&&mode==='world'&&k&&k===mapMus(MAPS.foret)&&for19On())k='silence19';return mp19(k)}}
// Dessin : un diapason métallique planté dans le sol, qui vibre et clignote en violet
{const do19=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='diap19')return do19(k,sx,sy,t,n);const v=Math.round(Math.sin(t/40))*1,bl=(t/300|0)%2;
 X.drawImage(SHD2,sx+6,sy+24,20,6);R(X,C.ink,sx+13+v,sy+2,6,24);R(X,'#9aa4b4',sx+14+v,sy+3,4,22);R(X,'#c8d0dc',sx+14+v,sy+3,1,22);R(X,C.ink,sx+8,sy+22,16,5);R(X,'#5a6070',sx+9,sy+23,14,3);
 R(X,C.ink,sx+10+v,sy-2,3,8);R(X,C.ink,sx+19+v,sy-2,3,8);R(X,'#9aa4b4',sx+11+v,sy-1,1,6);R(X,'#9aa4b4',sx+20+v,sy-1,1,6);
 glowAt(sx+16,sy+6,22,bl?.45:.2);R(X,bl?'#e070ff':'#7a3a9a',sx+15+v,sy+8,2,2);
 if((t/120|0)%3===0){R(X,'#c080e0',sx+4,sy+6,2,1);R(X,'#c080e0',sx+26,sy+6,2,1);R(X,'#c080e0',sx+2,sy+10,2,1);R(X,'#c080e0',sx+28,sy+10,2,1)}}}
DIA19.forEach((d,i)=>MAPS.foret.npcs.push({x:d.x,y:d.y,t:'obj',k:'diap19',d19:i,cond:()=>for19On()&&!F19()['v19d'+i]&&(!d.hid||F19().v19dv0),fn:()=>dia19Use(i)}));
async function irisAsk(){const F=F19();F.v19for=1;const M=MAPS.foret;await cine(1);musPlay('silence19');
 await say('La forêt est silencieuse. Pas un chant, pas un bruissement. Même le vent semble retenir son souffle.');
 const[ix,iy]=nearSpot(3),ir=tmpN('foret',{x:ix,y:iy,t:'botanist',d:2,name:'Botaniste Iris'});faceTo(ir,G.x,G.y);puff(ix,iy,'#9ae07a',8);await emote(ir,'!',500);await approach(ir,5);
 await say('Toi ! Tu entends ? …Rien. Depuis cette nuit, les créatures se terrent. Il y a ce bourdonnement, tout au fond des oreilles. Ça me rend folle.','Botaniste Iris');
 await say('J\'ai vu des capuches violettes planter des machines entre les arbres. Trois, je crois. Les créatures qui s\'en approchent deviennent folles de peur.','Botaniste Iris');
 await say('Une est cachée dans les hautes herbes, au nord-ouest : ta créature la sentira mieux que nous. Une autre près de la mare. La dernière vers le camp de l\'est.','Botaniste Iris');
 await say('Il y a une étiquette sur chacune. Lis-la avant de couper quoi que ce soit… Je compte sur toi !','Botaniste Iris');
 await fadeTo(1,200);rmN('foret',ir);await fadeTo(0,200);await cine(0);save()}
{const M=MAPS.foret,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);if(for19On()&&!F19().v19for)await irisAsk();else if(for19On()&&dia19N()>=3)await forAwake()}}
// La machine cachée : ta créature la flaire
let SNIF19=0;
{const M=MAPS.foret,s0=M.step;M.step=async function(){if(for19On()&&F19().v19for&&!F19().v19dv0&&!F19().v19d0){const d=DIA19[0],dist=Math.abs(d.x-G.x)+Math.abs(d.y-G.y);
  if(dist<=1){F19().v19dv0=1;await cine(1);if(folMon())await emote('fol','!',600);ui.shake=3;sfx('blip');await say(`${folMon()?nm(folMon())+' gronde vers les herbes, le poil hérissé…':'Le bourdonnement est assourdissant ici…'} Une tige de métal dépasse des herbes hautes : la première machine !`);await cine(0);save();return true}
  if(dist<=4&&now()-SNIF19>2500){SNIF19=now();sfx('blip');if(folMon()){const e={n:'fol',k:dist<=2?'!':'?',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),600)}}}
 return s0?s0.apply(this,arguments):undefined}}
async function dia19Use(i){const d=DIA19[i],F=F19(),M=MAPS.foret,n=M.npcs.find(x=>x.d19===i);
 if(d.guard&&!F.v19grd){await cine(1);const[gx,gy]=nearSpot(2),g=tmpN('foret',{x:gx,y:gy,t:'mon',sp:d.guard,d:0});puff(gx,gy,'#c060ff',12);sfx('cry');await emote(g,'!',500);
  await say(`Un ${SP[d.guard].name} surgit de derrière la machine ! Ses yeux sont voilés de violet, il ne voit plus rien d'autre que toi.`);await cine(0);
  const m=mon(d.guard,Math.max(12,Math.min(16,lvTop()-1)),{wild:1});const r=await battle([m],{trance:1});rmN('foret',g);
  if(r==='run'||r==='lose'||r==null){if(r==='run')await say(`Le ${SP[d.guard].name} reste planté devant la machine, les yeux violets. Il faudra revenir.`);return}
  F.v19grd=r==='catch'?2:1;save()}
 sfx('blip');await say(`La machine bourdonne si fort que tes dents vibrent. ${d.lab}`);
 const c=await choose(['FIL ROUGE','FIL BLEU','FIL JAUNE','NE RIEN TOUCHER'],{w:220,title:'Quel fil couper ?'});if(c<0||c===3)return;
 if(c!==d.ok){ui.shake=6;ui.flash=.5;ui.flashC='#e070ff';sfx('hit');const ld=G.party.find(alive);if(ld){ld.hp=Math.max(1,ld.hp-Math.ceil(st(ld).hp/4))}
  return say(`BZZZT ! Une décharge violette te secoue${ld?' et touche '+nm(ld):''} ! Ce n'était pas le bon fil. Relis l'étiquette…`)}
 sfx('cut');await wait(250);ui.flash=.4;ui.flashC='#e070ff';if(n)puff(n.x,n.y,'#c060ff',18);F['v19d'+i]=1;sfx('shard');await say('Clac ! La machine s\'éteint dans un dernier grésillement.');
 if(d.guard&&F.v19grd===1){const[gx,gy]=nearSpot(2),g=tmpN('foret',{x:gx,y:gy,t:'mon',sp:d.guard,d:0});await emote(g,'♥',700);
  await say(`Le ${SP[d.guard].name} cligne des yeux. Le voile violet a disparu. Il s'approche de toi, tout doucement… Il veut te suivre !`);
  const m=mon(d.guard,Math.max(12,Math.min(16,lvTop()-1)));m.aff=120;dex(d.guard,2);if(G.party.length<6)G.party.push(m);else G.box.push(m);jingle('item');await say(`${SP[d.guard].name} rejoint ${G.party.includes(m)?'ton équipe':'la Boîte'} !`);rmN('foret',g);F.v19grd=2}
 if(d.grunt){await cine(1);const[gx,gy]=nearSpot(3),s=tmpN('foret',{x:gx,y:gy,t:'grunt',d:0,name:'Sbire Éclipse'});faceTo(s,G.x,G.y);await emote(s,'!',500);await approach(s,4);
  await say('Hé ! Qui touche à nos diapasons ?! Le chef a dit : la forêt doit se taire jusqu\'à demain soir !','Sbire Éclipse');await cine(0);
  const r=await battle(team([['ombrelin',Math.min(16,lvTop())],['nocturelle',Math.min(17,lvTop()+1)]]),{tr:{name:'Sbire Éclipse',look:'grunt',money:700,after:'Le chef va me transformer en paillasson…'}});
  if(r==='win'){await cine(1);await say('Bon, bon ! De toute façon, c\'est trop tard. Ce soir, au Mont Braise, plus personne n\'entendra crier Solarion !','Sbire Éclipse');await emote(s,'!',400);
   await say('…J\'ai rien dit ! Repli !','Sbire Éclipse');await walk(s,'uuu',140);rmN('foret',s);await say('Il a laissé tomber un papier froissé : "ORDRE DE VEX — Faire taire la forêt. Personne ne doit entendre ce qui se passera au sommet."');await cine(0)}
  else rmN('foret',s)}
 save();if(G.map!=='foret')return;if(dia19N()>=3)await forAwake();else await say(`Machines éteintes : ${dia19N()}/3. Le bourdonnement faiblit…`)}
async function forAwake(){const F=F19();F.v19forDone=1;await cine(1);musStop();await wait(600);await say('Le dernier bourdonnement s\'éteint. Le silence, encore… puis un premier chant, tout près.');
 musPlay('foret');sfx('shard');ui.flash=.4;ui.flashC='#c8ffb0';const cx=G.x*TS,cy=G.y*TS;
 for(let i=0;i<40;i++)AMB.push({k:'fly',x:cx+(Math.random()-.5)*520,y:cy+(Math.random()-.5)*300,vx:(Math.random()-.5)*2,vy:-.5,l:120+Math.random()*80,c:['#ffffff','#f6d870','#9ae07a','#ff8ad8'][i%4]});
 for(let i=0;i<4;i++)fauAdd('foret',0);await wait(500);
 await say('Puis dix, puis cent. Les branches s\'agitent, des ailes battent partout : la Forêt Murmure retrouve sa voix.');
 const[ix,iy]=nearSpot(3),ir=tmpN('foret',{x:ix,y:iy,t:'botanist',d:2,name:'Botaniste Iris'});faceTo(ir,G.x,G.y);await approach(ir,5);await emote(ir,'♥',700);
 await say('Tu entends ça ? Tu entends ?! Ils sont revenus… Merci. Mille fois merci.','Botaniste Iris');
 await say('Prends ça. Ce sont des graines de ma serre, et mes meilleures potions. Kael t\'attend au nord, près du sentier du Mont Braise : il a l\'air inquiet.','Botaniste Iris');
 give('superpotion',3);give('baieprisme',2);jingle('item');await say('Tu reçois Super Potion x3 et Baie Prisme x2 !');await fadeTo(1,200);rmN('foret',ir);await fadeTo(0,200);await cine(0);save()}
// Kael garde le passage tant que la forêt est malade
{const rv0=rival2;rival2=async function(){if(!for19On())return rv0.apply(this,arguments);const k=MAPS.foret.npcs.find(n=>n.t==='rival');await cine(1);if(k){faceTo(k,G.x,G.y);await emote(k,'!',400)}
 await say('Attends ! Tu n\'entends pas ? Ce silence… Les créatures se cachent. La forêt est malade, on ne peut pas la laisser comme ça.','Kael');
 await say(`Iris dit que la Team Éclipse a planté des machines. Trouve-les, je garde le sentier du Mont. (Machines éteintes : ${dia19N()}/3)`,'Kael');await cine(0);await back19()}}
async function back19(){const M=MAPS[G.map];for(const d of[0,2,3,1]){const x=G.x+DX[d],y=G.y+DY[d],c=M.rows[y]?.[x];if(c&&!SOLID.has(c)&&!npcs(M).some(n=>n.x===x&&n.y===y)){await forceStep(d);return}}}
// ---------------------------------------------------------------- Mont Braise : l'ascension
{const M=MAPS.mont,s0=M.step;M.step=async function(){const F=F19();
 if(!F.boss&&!F.v19t1&&G.y<=16){F.v19t1=1;ui.shake=14;sfx('roar');debris(G.x+1,G.y-2,'#a08a78',18);await say('Le Mont Braise gronde sous tes pieds. Des cailloux dévalent la pente…');tip('mont','Le Mont tremble : quelque chose se passe au sommet.')}
 else if(!F.boss&&!F.v19t2&&G.y<=10){F.v19t2=1;await cine(1);await camTo(9,1,900);rays(9,1,C.goldL,2200);ui.flash=.3;ui.flashC='#ffe8a0';sfx('shard');
  await say('Tout là-haut, une lueur dorée pulse au rythme d\'un cœur. Une silhouette immense, aux ailes de flamme, garde le sommet.');
  await say('Solarion, le gardien du jour. Dans les contes, il ne se montre jamais aux humains…');await camBack(700);await cine(0)}
 return s0?s0.apply(this,arguments):undefined}}
// ---------------------------------------------------------------- Une nuit au coin du feu
async function campfire19(){const F=F19();F.v19feu=1;const V='ville',[fx,fy]=nearSpot(2);await fadeTo(1,400);const fire=tmpN(V,{x:fx,y:fy,t:'obj',k:'fire'});
 const kp=[[fx+1,fy],[fx-1,fy],[fx,fy+1],[fx,fy-1]].find(([x,y])=>{const c=MAPS[V].rows[y]?.[x];return c&&!SOLID.has(c)&&!(x===G.x&&y===G.y)&&!MAPS[V].npcs.some(n=>n.x===x&&n.y===y)})||[fx,fy+1];
 const k=tmpN(V,{x:kp[0],y:kp[1],t:'rival',d:0,name:'Kael'});faceTo(k,fx,fy);{const dx=fx-G.x,dy=fy-G.y;G.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?3:2):(dy>0?0:1)}await cine(1);await fadeTo(0,500);
 await say('Le ciel reste noir. Personne à Cendreville n\'arrive à dormir. Kael a allumé un feu sur la place, et il fixe les braises depuis une heure.');
 await emote(k,'…',900);await say('…Tu sais ce qui est bizarre ? Je l\'ai reconnu à sa façon de pencher la tête. Il faisait pareil quand il réparait mon vélo.','Kael');
 await say('Valen avait un Ombrelin. Brume. Il le portait sur son épaule partout, même à table. Un matin d\'été, Brume ne s\'est pas réveillé.','Kael');
 await say('Valen a dit que c\'était la faute du soleil. Que les jours trop longs tuaient les créatures de l\'ombre. Il est parti le lendemain. J\'avais dix ans.','Kael');
 const a=await choose(['ON VA LE RAMENER','TU N\'Y ES POUR RIEN','ET SI IL AVAIT RAISON ?'],{w:300,title:'Que dis-tu à Kael ?'});F.v19k=a<0?0:a;
 if(a===2){await emote(k,'!',500);await say('…Peut-être. Je ne sais pas. Mais même s\'il avait raison, il n\'avait pas le droit de faire ça. Pas comme ça.','Kael');await say('Il y a forcément un autre moyen. Un moyen où personne ne paie à la place des autres.','Kael')}
 else if(a===1){await emote(k,'…',700);await say('J\'ai longtemps cru que s\'il était parti, c\'était parce que je n\'étais pas assez fort pour le retenir.','Kael');await say('…Merci. Vraiment.','Kael')}
 else{await emote(k,'♪',600);await say('Ouais. On va le ramener. Même s\'il faut le traîner par la cape jusqu\'à la maison.','Kael')}
 const ld=G.party.find(alive);if(ld){bondUp(ld,3);await say(`${nm(ld)} vient se blottir contre toi, près du feu. Sa chaleur fait du bien.`)}
 await say('Bon. Dodo. Demain, on repart. Et je te préviens : la prochaine fois qu\'on se bat, je ne te ferai pas de cadeau.','Kael');await emote(k,'♪',500);
 await fadeTo(1,600);rmN(V,fire);rmN(V,k);G.t=CYC*Math.ceil(G.t/CYC)+40;await cine(0);await fadeTo(0,600)}
{const bc0=brasiaClears;brasiaClears=async function(){if(!F19().v19feu)await campfire19();return bc0.apply(this,arguments)}}
// ---------------------------------------------------------------- Volterre : le retour de Corvin
async function corvin19(){const F=F19(),C='centrale';await cine(1);const[cx,cy]=nearSpot(2),c=tmpN(C,{x:cx,y:cy,t:'grunt',d:0,name:'Corvin'});faceTo(c,G.x,G.y);
 if(F.v19cor===1){await emote(c,'!',400);await say('Psst ! Pas un bruit. …Ouais, c\'est moi. Corvin. Je t\'avais dit que je n\'oubliais jamais une dette.','Corvin');
  await say('Orso tient le générateur, en bas. Quand tu l\'affronteras, je couperai son alimentation de secours. Ses créatures perdront leur surcharge en plein combat.','Corvin');
  await say('Et écoute bien : Vex… il s\'appelle Valen. Il croit vraiment sauver les créatures de l\'ombre. Mais l\'autre admin, Caïus, ne pense qu\'au pouvoir. Le jour où ça tourne mal, méfie-toi de lui.','Corvin');
  await say('Moi, après ce soir, je raccroche la capuche. Bonne chance, gamin.','Corvin');F.v19cor=3;await walk(c,'rr',200);rmN(C,c);await cine(0);save();return}
 await emote(c,'!',400);await say('Tiens, tiens… Le gamin qui m\'a laissé sous la poutre. Les cellules de Carnavelle, ça ne retient personne, tu sais ?','Corvin');
 await say('Orso m\'a repris dans l\'équipe. Et il m\'a laissé la porte. Rien que pour toi.','Corvin');await cine(0);
 const r=await battle(team([['nocturelle',27],['rocaroc',28,null,'pierredure'],['magmor',29,null,'charbon']]),{tr:{name:'Lieutenant Corvin',look:'grunt',money:2000,vs:1,boss:1,items:1,after:'…Encore toi. Toujours toi.'}});
 if(r!=='win'){rmN(C,c);return}F.v19cor=4;await cine(1);await say('Va donc voir Orso. J\'ai relancé son générateur à fond : il va t\'en faire voir.','Corvin');await walk(c,'rr',200);rmN(C,c);await cine(0);save()}
{const M=MAPS.centrale,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=F19();if(F.volArr&&!F.baseDone&&(F.v19cor===1||F.v19cor===2))await corvin19()}}
{const pf19=ph19Fx;ph19Fx=async function(k){if(k!=='corvin19')return pf19(k);if(!B?.foe||B.foe.hp<=0)return;ui.flash=.4;ui.flashC='#202030';sfx('back');
 await say('Clac ! Toutes les lumières de la salle s\'éteignent d\'un coup. Au loin, quelqu\'un siffle.',0,1);await say('CORVIN ?! Espèce de traître !',B.tr.name,0,B.tr.look);return statChange(1,'spd',-2)}}
PH19.unshift([t=>t.name==='Commandant Orso'&&f().v19cor===3,['Turbines à plein régime ! Surcharge !','corvin19'],['Sans le générateur… je ne suis qu\'un gars avec une moustache.'],'Orso : ÉLEC et OMBRE. Le ROC bloque l\'électricité.'],
 [t=>t.name==='Commandant Orso'&&f().v19cor===4,['Corvin a relancé les générateurs ! Plein régime !','atk'],['Si ça saute, tout Volterre saute avec !'],'Orso : ÉLEC et OMBRE, gonflé à bloc. Le ROC bloque l\'électricité ; la paralysie le freine.']);
// Après l'aventure : ce qu'est devenu Corvin
MAPS.ville.npcs.push({x:18,y:2,t:'miner',d:0,name:'Corvin',cond:()=>f().v19cor===3&&f().balance,fn:()=>say(['Tito m\'apprend à creuser pour de vrai. Il est plus patient que le chef, ce gamin.','Les éclats, je les rends aux mineurs, maintenant. Ça fait drôle d\'être du bon côté de la pioche.','Valen est passé, l\'autre jour. On a parlé longtemps. Je crois qu\'on va mieux, tous les deux.'][dayN()%3],'Corvin',0,'miner')});
// ---------------------------------------------------------------- Les crieurs racontent le monde
function headline19(){const g=F19();if(!g.starter)return null;
 if(g.balance)return g.legS&&g.legN?'Extra ! Solarion et Nocturion veillent de nouveau ensemble sur Aurélys ! Les anciens disent que ça n\'était plus arrivé depuis des siècles.':'ÉDITION SPÉCIALE ! Le jour ET la nuit sont revenus ! Pour la première fois depuis des siècles, les nuits sont longues et pleines d\'étoiles.';
 if(g.v18vol&&!g.v18done)return'Extra ! Un voleur masqué file vers Carnavelle avec la clé du téléphérique ! Le Carnaval des Masques est maintenu malgré tout !';
 if(g.badge4)return'Extra ! Le téléphérique de l\'Observatoire va repartir ! Que se passe-t-il là-haut, sous le dôme ?';
 if(g.baseDone)return'Extra ! La lumière revient à Volterre ! On raconte qu\'un jeune dresseur a mis le Commandant Orso en déroute.';
 if(g.volArr)return'Extra ! La Centrale de Volterre aux mains de la Team Éclipse ! Tout le courant de la ville file vers l\'Observatoire !';
 if(g.badge2)return'Extra ! Volterre privée de courant ! Les ingénieurs accusent des capuches violettes.';
 if(g.r2)return'Extra ! Depuis l\'éclipse, les créatures d\'ombre sortent en plein jour. Les pêcheurs de Port-Miroir n\'osent plus prendre la mer !';
 if(g.eclipse)return'ÉDITION SPÉCIALE ! Le ciel est noir en plein jour ! Le Professeur Saule demande à chacun de garder ses créatures près de soi.';
 if(g.rival2)return'Extra ! Le Mont Braise tremble depuis ce matin ! Des randonneurs parlent d\'une lueur dorée au sommet… et de capuches violettes.';
 if(g.v19forDone)return'Extra ! La Forêt Murmure chante de nouveau ! Un jeune dresseur aurait débranché les machines de la Team Éclipse !';
 if(g.mine)return'Extra ! La Forêt Murmure ne murmure plus ! Les campeurs parlent d\'un bourdonnement étrange entre les arbres…';
 if(g.badge)return'Extra ! Des explosions dans la Mine de Cendreville cette nuit ! Les mineurs accusent la Team Éclipse !';
 return'Extra ! La Championne Brasia n\'a pas perdu un combat depuis trois semaines ! Qui osera la défier ?'}
{const rm19=rumor;rumor=function(){const h=headline19();if(h&&F19().v19hl!==h){F19().v19hl=h;return h}return h&&Math.random()<.5?h:rm19()}}
// ---------------------------------------------------------------- Objectifs, guide et journal
{const g19=goal;goal=function(){const g=F19();if(g.mine&&!g.rival2&&!g.v19forDone)return`Rends sa voix à la Forêt Murmure : trouve et débranche les machines de la Team Éclipse (${dia19N()}/3).`;return g19()}}
GDT.unshift([/Rends sa voix à la Forêt/,()=>{const F=F19();if(!F.v19for)return{m:'foret',lbl:'Forêt Murmure'};
 if(!F.v19d0)return{m:'foret',x:4,y:3,lbl:F.v19dv0?'La machine des herbes':'Les herbes hautes du nord-ouest'};if(!F.v19d1)return{m:'foret',x:17,y:13,lbl:'Près de la mare'};return{m:'foret',x:21,y:8,lbl:'Vers le camp de l\'est'}}]);
{const q19=quests;quests=function(){const Q=q19(),F=F19();
 if(F.v19for||F.v19forDone)Q.push(['Le silence de la forêt',F.v19forDone?2:1,F.v19forDone?'La Forêt Murmure chante de nouveau. Iris t\'a offert ses meilleures potions.':`Débranche les machines de la Team Éclipse (${dia19N()}/3). Lis l'étiquette avant de couper un fil !`]);
 if(F.v19cor)Q.push(['Le lieutenant Corvin',F.v19cor>=3?2:1,F.v19cor===1?'Tu as sauvé Corvin de l\'éboulement. "Je n\'oublie jamais une dette", a-t-il dit.':F.v19cor===2?'Tu as laissé Corvin sous la poutre. Il a juré de se venger.':F.v19cor===3?'Corvin a payé sa dette à la Centrale, et raccroché sa capuche.':'Corvin t\'a attendu à la Centrale. Il a perdu, encore.']);
 return Q}}
