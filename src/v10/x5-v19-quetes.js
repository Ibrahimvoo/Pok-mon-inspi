// =====================================================================
// 19 — QUÊTES ANNEXES ÉCRITES : peu nombreuses, mais chacune avec un personnage, une petite histoire et une mécanique à elle.
// - Le voleur de croissants (Cendreville) : enquête sur des miettes, puis un choix : capturer la voleuse ou protéger sa famille.
// - Le dresseur d'autrefois (Bois Sépulcral, la nuit) : un fantôme qui n'a jamais livré son dernier combat. Et une sœur qui attend.
// - La course des Coteaux : un mini-jeu chronométré, trois médailles, un record à battre.
// - L'œuf de l'orage (Route 2) : le garder… ou le rendre. Les deux choix ont un prix.
// - L'apprenti (Tito) : de ses premières leçons de types à un vrai combat d'élève contre maître.
// - Les Défis d'Élite : trois dresseurs hors du chemin, une règle, une équipe pensée pour elle, une récompense rare.
// Un « ! » doré flotte au-dessus de ceux qui ont quelque chose à te demander.
// =====================================================================
const QF=()=>f();const QG19=[];
{const dw19q=drawWorld;drawWorld=function(t){dw19q(t);if(!G||mode!=='world'||!f().starter)return;for(const q of QG19){if(q.m!==G.map)continue;let on=false;try{on=q.on()}catch(e){}if(!on)continue;const n=q.n;if(!npcs(MAPS[G.map]).includes(n))continue;
 const sx=Math.round(n.x*TS+(n.ox||0)-CAM[0])+16,sy=Math.round(n.y*TS+(n.oy||0)-CAM[1])-26+Math.round(Math.sin(t/220)*2);rr(sx-7,sy-12,14,18,3,C.ink);rr(sx-5,sy-10,10,14,2,'#ffd23a');txt('!',sx,sy+1,C.ink,{al:'c'})}}}
// ---------------------------------------------------------------- Le voleur de croissants
{const do19q=drawObj;drawObj=function(k,sx,sy,t,n){if(k==='crumb19'){for(const[dx,dy]of[[10,20],[16,24],[21,19],[13,15]]){R(X,'#8a5a2a',sx+dx,sy+dy,3,2);R(X,'#e8b860',sx+dx,sy+dy,2,1)}if((t/250|0)%4===0)R(X,'#ffffff',sx+18,sy+16,2,2);return}
 if(k==='flag19'){X.drawImage(SHD2,sx+8,sy+24,16,5);R(X,C.ink,sx+13,sy-6,3,32);R(X,'#c8c0b0',sx+14,sy-5,1,30);const w=Math.round(Math.sin(t/160)*2);R(X,C.ink,sx+15,sy-6,14,11);R(X,'#e84a4a',sx+16,sy-5+w*0,12+w,9);R(X,'#ffffff',sx+19,sy-2,4,3);return}
 if(k==='nest19'){X.drawImage(SHD2,sx+4,sy+22,24,7);R(X,'#5a3a1a',sx+5,sy+16,22,9);R(X,'#8a6030',sx+6,sy+15,20,4);R(X,'#a87a40',sx+8,sy+14,4,2);R(X,'#a87a40',sx+18,sy+14,5,2);
  if(n?.egg19&&n.egg19()){R(X,C.ink,sx+12,sy+8,9,10);R(X,'#f2f2e6',sx+13,sy+9,7,8);R(X,'#7ab0e0',sx+14,sy+11,2,2);R(X,'#7ab0e0',sx+17,sy+14,2,2)}return}
 return do19q(k,sx,sy,t,n)}}
const AUG={x:18,y:5,t:'vendor',d:0,name:'Pâtissier Augustin',fn:()=>q1Talk()};MAPS.ville.npcs.push(AUG);QG19.push({m:'ville',n:AUG,on:()=>!QF().v19q1||QF().v19q1===2||QF().v19q1===3&&!QF().v19q1r});
const CRUMB=[{x:18,y:7,t:'Des miettes de croissant, toutes fraîches, et de toutes petites traces de pattes. Elles filent vers le sud…'},{x:15,y:10,t:'Encore des miettes ! Quelqu\'un a laissé tomber un bout de croûte en courant. La piste continue vers l\'étang.'},{x:19,y:12,t:'Un croissant entier, à moitié grignoté ! On entend de petits couinements, tout près de l\'eau…'}];
CRUMB.forEach((c,i)=>MAPS.ville.npcs.push({x:c.x,y:c.y,t:'obj',k:'crumb19',cond:()=>QF().v19q1===1&&!QF()['v19c'+i],fn:async()=>{QF()['v19c'+i]=1;sfx('sel');await say(c.t);if(CRUMB.every((_,j)=>QF()['v19c'+j]))await say('La piste mène à l\'étang, juste au sud.')}}));
const famOn=()=>{const F=QF();return F.v19c2&&[1,2,5].includes(F.v19q1)};
const RMUM={x:18,y:14,t:'mon',sp:'ratounet',d:1,fix:1,cond:famOn,fn:()=>q1Den()},RBAB={x:19,y:14,t:'mon',sp:'ratounet',d:3,fix:1,cond:famOn,fn:()=>q1Den()};MAPS.ville.npcs.push(RMUM,RBAB);
async function q1Talk(){const F=QF(),A='Pâtissier Augustin';
 if(!F.v19q1){await say('Trois croissants ! Tous les matins, il m\'en manque trois ! Je ferme boutique à double tour, pourtant…',A,0,'vendor');
  await say('Tu as l\'air d\'avoir l\'œil, toi. Tu veux bien mener l\'enquête ? Le voleur a forcément laissé des traces.',A,0,'vendor');F.v19q1=1;tip('enquete','Une enquête : cherche des indices par terre, autour de la boutique (A pour examiner).');return}
 if(F.v19q1===1)return say('Alors, ce voleur ? Regarde par terre : les miettes, ça ne ment pas !',A,0,'vendor');
 if(F.v19q1===2){await say('Tu l\'as trouvé ?! …Une maman Ratounet ? Avec des petits ?',A,0,'vendor');await emote(AUG,'…',900);
  await say('…Bon. Bon, bon, bon. Je mettrai un panier de croûtons au bord de l\'étang, tous les soirs. Mais qu\'elle ne touche plus à mes croissants, hein !',A,0,'vendor');
  await say('Tiens. Pour l\'enquête. Et… merci de ne pas lui avoir fait de mal.',A,0,'vendor');give('biscuit',3);give('superpotion',2);jingle('item');await say('Tu reçois Biscuit d\'Aube x3 et Super Potion x2 !');F.v19q1=5;save();return}
 if(F.v19q1===3&&!F.v19q1r){F.v19q1r=1;await say('Plus un seul croissant ne disparaît ! Tu es un vrai détective. Tiens, pour ta peine !',A,0,'vendor');G.money+=600;sfx('lv');await say('Tu reçois 600 pièces.');save();return}
 return say(F.v19q1===5?'La maman Ratounet vient chercher ses croûtons tous les soirs. Les petits grossissent à vue d\'œil ! Et mes croissants sont saufs.':'Des croissants tout chauds ! …Pas touche, hein.',A,0,'vendor')}
async function q1Den(){const F=QF();
 if(F.v19q1===5){if(F.v19q1d===dayN())return say('La maman Ratounet fait sa toilette au soleil. Ses petits dorment en tas.');F.v19q1d=dayN();const k=['baiesoin','baieprisme','biscuit','potion','superpotion'][rnd(0,4)];
  await emote(RMUM,'♥',600);give(k);await say(`La maman Ratounet trottine vers toi et dépose quelque chose à tes pieds : ${IT[k][0]} ! Un merci à sa façon.`);save();return}
 if(F.v19q1===2)return say('La petite famille grignote ses croûtons. Il faudrait en parler à Augustin, le pâtissier.');
 await cine(1);await emote(RMUM,'!',500);await say('Une Ratounet maigrichonne se dresse, les poils hérissés, devant deux petits qui dévorent… des croissants.');
 await say('Elle ne recule pas d\'un pouce. Elle tremble, mais elle ne recule pas.');await cine(0);
 const c=await choose(['LA CAPTURER','LA LAISSER TRANQUILLE'],{w:260,title:'La voleuse de croissants'});
 if(c===1){F.v19q1=2;await say('Tu laisses la petite famille tranquille. Il faudrait en parler à Augustin…');save();return}
 const r=await battle([mon('ratounet',Math.max(4,Math.min(12,lvTop()-2)),{wild:1})]);F.v19q1=3;
 await say(r==='catch'?'Les deux petits s\'enfuient en couinant dans les roseaux. Tu ne les reverras pas.':'La Ratounet attrape ses petits par la peau du cou et disparaît dans les roseaux.');save()}
// ---------------------------------------------------------------- Le dresseur d'autrefois (Bois Sépulcral, la nuit)
const GHO={x:16,y:7,t:'old',d:2,name:'Dresseur d\'autrefois',time:'n',cond:()=>!QF().v19q2,fn:()=>q2Ghost()};MAPS.bois.npcs.push(GHO);QG19.push({m:'bois',n:GHO,on:()=>!QF().v19q2});
setInterval(()=>{try{if(mode==='world'&&G?.map==='bois'&&night()&&!QF().v19q2)for(let i=0;i<2;i++)AMB.push({k:'wisp',x:GHO.x*TS+16+(Math.random()-.5)*30,y:GHO.y*TS+(Math.random()-.5)*30,vx:0,vy:-.3,l:60,ml:60,c:i?'#c8d8ff':'#ffffff'})}catch(e){}},400);
async function q2Ghost(){const F=QF(),A='Albert';await cine(1);await say('Un vieil homme en tenue de dresseur d\'un autre temps. Ses contours tremblent comme une flamme de bougie.');
 await say('Encore un passant… Tu as l\'air solide. Moi, j\'ai raté mon dernier combat. Le grand tournoi de Cendreville, il y a soixante ans. La fièvre m\'a cloué au lit la veille.',A,0,'old');
 await say('Depuis, je tourne en rond ici. Affronte l\'équipe que je n\'ai jamais pu aligner. Avec les règles de mon temps : pas d\'objets du Sac !',A,0,'old');
 const ok=await ask('Affronter le dresseur d\'autrefois ?');await cine(0);if(!ok)return;const L=Math.max(15,Math.min(70,lvTop()-1));
 const r=await battle(team([['ratoroi',L],['magmor',L],['crapaflot',L],['granifelin',L+1,null,'griffe']]),{tr:{name:'Albert, dresseur d\'autrefois',look:'old',money:0,vs:1,boss:1,items:0,field:'r19sansobjet',ch19:['sansobjet',0,'rappelmax',1],after:'Ha… Ha ha ! Voilà donc ce que ça fait.'}});
 if(r!=='win')return;await cine(1);await say('Voilà donc ce que ça fait, de livrer ce combat-là. Soixante ans que j\'attendais.',A,0,'old');
 await say('J\'ai une petite sœur. Odette. Elle tient la pension des Coteaux, il paraît… Dis-lui que j\'ai gagné. Dis-lui qu\'Albert a tenu sa promesse.',A,0,'old');
 puff(GHO.x,GHO.y,'#ffffff',24);for(let i=0;i<20;i++)AMB.push({k:'wisp',x:GHO.x*TS+16,y:GHO.y*TS+8,vx:(Math.random()-.5)*1.5,vy:-.8-Math.random(),l:80,ml:80,c:'#e0e8ff'});F.v19q2=1;
 await say('Le vieil homme sourit, et se dissout dans la brume comme un souffle.');await cine(0);save()}
{const od19=odette;odette=async function(...a){const F=QF();if(F.v19q2!==1)return od19.apply(this,a);const O='Mamie Odette';await cine(1);
 await say('Albert ? …Mon grand frère Albert ? Tu l\'as… vu ?',O,0,'old');await say('Il m\'avait promis de gagner le tournoi de Cendreville pour moi. J\'avais six ans. Il est parti avant.',O,0,'old');
 await say('…Il a tenu parole, alors. Il a toujours tenu parole, cette tête de mule.',O,0,'old');await say('Tiens. C\'était son ruban de dresseur, je le garde depuis soixante ans. Il serait content qu\'il serve encore.',O,0,'old');
 give('ruban');jingle('item');await say('Tu reçois le Ruban Ténacité d\'Albert !');F.v19q2=2;await cine(0);save()}}
// ---------------------------------------------------------------- La course des Coteaux
const ZIA={x:12,y:13,t:'girl',d:1,name:'Coureuse Zia',fn:()=>q3Talk()},FLAG={x:19,y:2,t:'obj',k:'flag19',fn:()=>say('Un petit drapeau rouge planté au sommet des Coteaux. "ARRIVÉE — Record : Zia, la meilleure."')};
MAPS.coteaux.npcs.push(ZIA,FLAG);QG19.push({m:'coteaux',n:ZIA,on:()=>!QF().v19q3});
let RACE=null;const fmtS=ms=>(ms/1000).toFixed(1).replace('.',',')+' s';
function q3Path(){const M=MAPS.coteaux,sx=ZIA.x,sy=ZIA.y-1,seen=new Set([sx+','+sy]),q=[[sx,sy,0]];for(let h=0;h<q.length;h++){const[x,y,d]=q[h];if(Math.abs(x-FLAG.x)+Math.abs(y-FLAG.y)===1)return d;
 for(let k=0;k<4;k++){const nx=x+DX[k],ny=y+DY[k],c=M.rows[ny]?.[nx];if(!c||SOLID.has(c)||seen.has(nx+','+ny)||nx===FLAG.x&&ny===FLAG.y)continue;seen.add(nx+','+ny);q.push([nx,ny,d+1])}}return 30}
const q3Lim=()=>{const P=q3Path();return[P*120+1200,P*170+1800,P*250+2600]};
async function q3Talk(){const F=QF(),Z='Coureuse Zia';if(RACE)return;const[g,s,b]=q3Lim();
 if(!F.v19q3)await say('Salut ! Tu vois le drapeau rouge, tout en haut des Coteaux ? Personne n\'arrive à me battre jusque là-haut !',Z,0,'girl');
 await say(`Or : moins de ${fmtS(g)}. Argent : ${fmtS(s)}. Bronze : ${fmtS(b)}.${F.v19rec?' Ton record : '+fmtS(F.v19rec)+'.':''} Cours sans t'arrêter… et évite les créatures !`,Z,0,'girl');
 if(!await ask('Prêt pour la course ?'))return;F.v19q3??=1;
 for(const k of['3…','2…','1…']){ui.note={s:k,t0:now()};sfx('blip');await wait(600)}ui.note={s:'PARTEZ !',t0:now()};sfx('alert');RACE={t0:now(),lim:[g,s,b]};
 tip('course19','Course : rejoins le drapeau rouge le plus vite possible. Un combat ou une sortie de la carte annulent la course.')}
async function q3End(){const F=QF(),R=RACE;RACE=null;const t=now()-R.t0,[g,s,b]=R.lim,Z='Coureuse Zia',med=t<=g?3:t<=s?2:t<=b?1:0;sfx(med?'lv':'back');
 await say(`Arrivée ! Temps : ${fmtS(t)}. ${['Trop lent… Pas de médaille cette fois.','Médaille de BRONZE !','Médaille d\'ARGENT !','Médaille d\'OR ! Record de Zia pulvérisé !'][med]}`);
 if(!F.v19rec||t<F.v19rec)F.v19rec=Math.round(t);
 const W=[null,['superpotion',2],['hyperpotion',2],['rapidecapsule',5]];for(let m=1;m<=med;m++)if(!F['v19m'+m]){F['v19m'+m]=1;give(...W[m]);jingle('item');await say(`Zia te lance un prix depuis le bas de la colline : ${IT[W[m][0]][0]} x${W[m][1]} !`,Z,0,'girl')}
 if(med===3)F.v19q3=2;save()}
{const bt19q=battle;battle=async function(...a){if(RACE){RACE=null;ui.note={s:'Course annulée',t0:now()}}return bt19q.apply(this,a)}}
// Pendant la course, la faune territoriale et les herbes frémissantes te laissent tranquille (sauf si tu fonces dedans)
{const fc19=fauCharge;fauCharge=async function(){if(RACE)return false;return fc19()}}{const ct19=checkTrainers;checkTrainers=async function(){if(RACE)return false;return ct19()}}{const rh19=ruHit;ruHit=async function(){if(RACE)return;return rh19()}}
{const lm19q=loadMap;loadMap=function(...a){if(RACE&&a[0]!=='coteaux'){RACE=null}return lm19q.apply(this,a)}}
{const st19q=onStep;onStep=async function(...a){await st19q.apply(this,a);if(RACE&&G.map==='coteaux'&&Math.abs(G.x-FLAG.x)+Math.abs(G.y-FLAG.y)<=1&&mode==='world')await q3End()}}
{const dw19r=drawWorld;drawWorld=function(t){dw19r(t);if(!RACE||mode!=='world')return;const ms=now()-RACE.t0,s=`COURSE  ${fmtS(ms)}`,w=tw(s,2)+24,x=(W-w)/2,c=ms<=RACE.lim[0]?'#f6d870':ms<=RACE.lim[1]?'#d8dce8':ms<=RACE.lim[2]?'#d8945a':'#e86a6a';
 rr(x,6,w,26,3,C.ink);rr(x+2,8,w-4,22,2,'#2a2440');txt(s,x+12,26,c)}}
// ---------------------------------------------------------------- L'œuf de l'orage (Route 2)
const NEST={x:8,y:10,t:'obj',k:'nest19',cond:()=>QF().r2,fn:()=>q4Nest(),egg19:()=>!QF().v19q4||QF().v19q4===1};MAPS.route2.npcs.push(NEST);QG19.push({m:'route2',n:NEST,on:()=>!QF().v19q4});
const MUM4={x:9,y:9,t:'mon',sp:'piafou',d:2,fix:1,cond:()=>QF().v19q4===2,fn:()=>q4Mum()};MAPS.route2.npcs.push(MUM4);
setInterval(()=>{try{if(mode==='world'&&G?.map==='route2'&&QF().v19q4===2&&Math.random()<.3){const e={n:MUM4,k:'…',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),800)}}catch(e){}},1500);
const egg4=()=>(G.eggs||[]).find(e=>e.q19);
async function q4Nest(){const F=QF();
 if(!F.v19q4){await say('Un nid tombé d\'une branche pendant l\'orage. Au fond roule un œuf tiède, tacheté de bleu. Aucun parent en vue.');
  const c=await choose(['PRENDRE L\'ŒUF','LE REMETTRE À L\'ABRI'],{w:260,title:'L\'œuf de l\'orage'});
  if(c===0){G.eggs??=[];if(G.eggs.length>=3)return say('Ta Couveuse est pleine… Tu ne peux pas l\'emporter.');G.eggs.push({sp:'piafou',nat:Object.keys(NAT)[rnd(0,Object.keys(NAT).length-1)],mv:[],sh:Math.random()<1/8?1:0,steps:420,par:[],q19:1});
   F.v19q4=2;jingle('item');await say('Tu glisses l\'œuf dans ta Couveuse. Il est tout chaud.');await wait(300);sfx('cry');await say('Au-dessus de la rive, une Piafou tourne en rond en criant. Elle fouille le sol, puis repart. Puis revient.');save();return}
  F.v19q4=1;F.v19q4d=dayN();await say('Tu cales le nid sous une grosse racine, bien à l\'abri du vent. Tu repasseras voir.');save();return}
 if(F.v19q4===1){if(F.v19q4d===dayN())return say('Le nid est bien calé sous sa racine. L\'œuf est toujours là. Reviens demain.');
  F.v19q4=3;await cine(1);sfx('cry');await say('Trois petits Piafou piaillent dans le nid ! Leur mère se pose sur une branche et t\'observe longuement.');
  await say('Elle descend, dépose un petit trésor à tes pieds, puis retourne nourrir ses petits.');give('mouchoir');give('baieprisme',3);jingle('item');await say('Tu reçois le Mouchoir Soie et Baie Prisme x3 !');await cine(0);save();return}
 if(F.v19q4===2){if(egg4()&&await ask('La Piafou te fixe depuis le nid vide. Lui rendre son œuf ?')){G.eggs.splice(G.eggs.indexOf(egg4()),1);F.v19q4=1;F.v19q4d=dayN();sfx('ok');await say('Tu reposes l\'œuf dans le nid. La Piafou se jette dessus et le couve en gonflant ses plumes.');save();return}
  return say('Le nid est vide. Quelques plumes bleues tremblent au fond.')}
 return say('Le nid déborde de plumes et de piaillements. Toute une petite famille.')}
async function q4Mum(){if(egg4())return q4Nest();return say('La Piafou fouille encore les herbes autour du nid vide. Elle ne t\'approche pas.')}
// ---------------------------------------------------------------- L'apprenti : Tito
const TITO={x:16,y:1,t:'kid',d:0,name:'Tito',cond:()=>QF().mine&&(QF().v19q5|0)<4,fn:()=>q5Talk()};MAPS.ville.npcs.push(TITO);
QG19.push({m:'ville',n:TITO,on:()=>{const F=QF(),s=F.v19q5|0;return s===0||s===1&&F.badge2||s===2&&(F.badge4||F.balance)}});
function q5Quiz(){const T=['ROC','FEU','EAU','PLA','OMB','ELE'],ks=Object.keys(TY),L=[];for(const d of T){const good=ks.filter(a=>(EF[a]?.[d]??1)>1),bad=ks.filter(a=>(EF[a]?.[d]??1)<=1);if(good.length&&bad.length>=2)L.push([d,good[0],bad])}return L}
async function q5Talk(){const F=QF(),T='Tito',s=F.v19q5|0;
 if(s===0){await say('C\'est toi ! Tu m\'as sorti de la mine ! Depuis, je ne pense qu\'à une chose : devenir dresseur, comme toi.',T,0,'kid');
  await say('Apprends-moi ! Comment tu choisis tes attaques ? Interroge-moi, je veux savoir si j\'ai compris !',T,0,'kid');
  const Q=q5Quiz();let ok=0;const picks=[];for(let i=0;i<3&&Q.length;i++)picks.push(Q.splice(rnd(0,Q.length-1),1)[0]);
  for(const[d,g,bad]of picks){const opts=[g,bad[rnd(0,bad.length-1)],bad.filter(x=>x!==g)[rnd(0,bad.length-1)]||bad[0]];const O=[...new Set(opts)].sort(()=>Math.random()-.5);
   const c=await choose(O.map(tn19),{w:200,title:`Contre ${tn19(d)}, Tito doit utiliser…`});if(O[c]===g){ok++;sfx('ok');await say(`${tn19(g)} contre ${tn19(d)}… Super efficace ! Je note, je note !`,T,0,'kid')}else{sfx('back');await say(`Hmm… ${c>=0?tn19(O[c]):'Rien'} contre ${tn19(d)}, ça ne marche pas fort. Contre ${tn19(d)}, c'est ${tn19(g)} qu'il faut !`,T,0,'kid')}}
  F.v19q5=1;await say(ok>=2?'J\'ai tout compris ! Je vais m\'attraper une créature et m\'entraîner. Reviens me voir quand tu auras battu Maëlle, d\'accord ?':'C\'est plus dur que ça en a l\'air… Je vais réviser. Reviens me voir quand tu auras battu Maëlle !',T,0,'kid');
  give('potion',2);await say('Tito te donne deux Potions « pour la leçon ».');save();return}
 if(s===1){if(!F.badge2)return say('Je révise mes types tous les soirs ! Reviens quand tu auras battu Maëlle, à Port-Miroir.',T,0,'kid');
  await say('Regarde ! J\'ai attrapé un Rocaton tout seul ! On fait un petit combat d\'entraînement ? Doucement, hein !',T,0,'kid');if(!await ask('Entraîner Tito ?'))return;
  const r=await battle(team([['rocaton',Math.max(12,lvTop()-8)],['ratounet',Math.max(12,lvTop()-8)]]),{tr:{name:'Apprenti Tito',look:'kid',money:300,after:'J\'ai perdu… mais j\'ai appris plein de trucs !'}});
  if(r!=='win')return;F.v19q5=2;await say('Tu as vu ? Mon Rocaton a résisté à ta première attaque ! Je m\'entraîne encore. La prochaine fois, ce sera pour de vrai !',T,0,'kid');save();return}
 if(s===2){if(!F.badge4&&!F.balance)return say('Je m\'entraîne au fond de la mine, avec les mineurs. Reviens quand tu auras battu Ambroise, à Volterre : je serai prêt !',T,0,'kid');
  await say('Tu es revenu ! Cette fois, plus d\'entraînement. Élève contre maître. Et j\'ai bien appris ta leçon : une réponse pour chaque type !',T,0,'kid');if(!await ask('Affronter Tito pour de vrai ?'))return;
  const L=Math.max(20,Math.min(70,lvTop()));const r=await battle(team([['rocaroc',L-1,null,'pierredure'],['crapaflot',L-1],['pissenlion',L-1],['magmor',L,null,'charbon']]),{tr:{name:'Apprenti Tito',look:'kid',money:2500,vs:1,boss:1,items:1,after:'…J\'ai perdu. Mais tu as eu chaud, avoue !'}});
  if(r!=='win')return;F.v19q5=4;await cine(1);await say('Brasia m\'a vu m\'entraîner. Elle me prend comme apprenti à l\'arène ! Un jour, c\'est moi que tu affronteras là-bas.',T,0,'kid');
  await say('Tiens. C\'est le premier disque que j\'ai gagné. Il est à toi : sans toi, je serais encore coincé sous la mine.',T,0,'kid');give('dc_tomberoche');jingle('item');await say('Tu reçois le DC14 Tomberoche !');await cine(0);save()}}
MAPS.gym.npcs.push({x:3,y:7,t:'kid',d:0,name:'Apprenti Tito',cond:()=>QF().v19q5===4,say:()=>['Brasia dit que je pose trop de questions. Moi, je dis qu\'elle ne répond pas assez !','Un jour, je serai Champion. Et tu seras mon premier défi.','Contre le ROC : EAU ou PLANTE. Je le sais par cœur, maintenant.'][dayN()%3]});
// ---------------------------------------------------------------- Les Défis d'Élite
const ELITE19=[
 {id:'e1',m:'route2',x:22,y:4,t:'girl',name:'Vérane la Duelliste',need:()=>QF().badge2,rule:['duel',0,'dc_tranche',1],team:L=>[['granifelin',L+4,null,'casque']],
  pre:'Un seul combattant. Le tien contre le mien. Pas de changement, pas d\'excuses. C\'est ça, un vrai duel.',after:'…Joli. Ta créature et toi, vous ne faites qu\'un.'},
 {id:'e2',m:'carnavelle',x:24,y:18,t:'old',name:'Le Maître Inversé',need:()=>QF().v18arr,rule:['inverse',0,'dc_machination',1],team:L=>[['rocaroc',L+2],['magmor',L+2],['orageon',L+3],['crapaflot',L+3]],
  pre:'Dans mon dojo, le monde tourne à l\'envers. Les faiblesses protègent, les forces trahissent. Désapprends tout, et reviens me voir.',after:'Ha ! Tu as désappris vite. C\'est le plus difficile.'},
 {id:'e3',m:'lunevie',x:4,y:1,t:'astro',name:'Séraphine du Crépuscule',time:'n',need:()=>QF().badge3||QF().balance,rule:['eclipse',0,'dc_eclipse',1],team:L=>[['nocturelle',L+2],['lapilune',L+2],['eclipsoeil',L+3],['anubrume',L+4,null,'encensnoir']],
  pre:'La nuit, mes créatures ne voient que l\'ombre. Et l\'ombre ne pardonne rien. Tu oses ?',after:'Tu as su allumer la lumière au bon moment. Peu le savent.'}];
for(const E of ELITE19){const n={x:E.x,y:E.y,t:E.t,d:0,name:E.name,time:E.time,cond:()=>E.need(),fn:()=>elite19(E)};MAPS[E.m].npcs.push(n);QG19.push({m:E.m,n,on:()=>!QF()['v19'+E.id]})}
async function elite19(E){const F=QF();if(F['v19'+E.id])return say(E.after,E.name,0,E.t);await say(E.pre,E.name,0,E.t);await say(`Défi d'Élite. ${ch19Txt(E.rule)} Récompense : ${IT[E.rule[2]][0]}.`,E.name,0,E.t);
 if(!await ask('Relever le Défi d\'Élite ?'))return say('Reviens quand tu te sentiras prêt.',E.name,0,E.t);const L=Math.max(20,Math.min(72,lvTop()));
 const r=await battle(team(E.team(L)),{tr:{name:E.name,look:E.t,money:3000,vs:1,boss:1,items:2,ev:1,field:'r19'+E.rule[0],ch19:E.rule,after:E.after}});if(r==='win'){F['v19'+E.id]=1;save()}}
// ---------------------------------------------------------------- Journal et rumeurs
{const q19q=quests;quests=function(){const Q=q19q(),F=QF();
 if(F.v19q1)Q.push(['Le voleur de croissants',F.v19q1>=3&&(F.v19q1===5||F.v19q1r)?2:1,F.v19q1===1?`Suis la piste du voleur d'Augustin, à Cendreville. Indices : ${CRUMB.filter((_,i)=>F['v19c'+i]).length}/3.`:F.v19q1===2?'La voleuse est une maman Ratounet. Va en parler à Augustin.':F.v19q1===3?'La voleuse est partie. '+(F.v19q1r?'Augustin t\'a récompensé.':'Va le dire à Augustin.'):'Augustin nourrit la petite famille. La maman Ratounet te laisse parfois un cadeau, près de l\'étang.']);
 if(F.v19q2)Q.push(['Le dresseur d\'autrefois',F.v19q2>=2?2:1,F.v19q2>=2?'Odette a retrouvé la paix. Tu portes le ruban d\'Albert.':'Albert a enfin gagné son dernier combat. Va le dire à sa sœur Odette, à la pension des Coteaux.']);
 if(F.v19q3)Q.push(['La course des Coteaux',F.v19q3>=2?2:1,`Rejoins le drapeau des Coteaux le plus vite possible. Record : ${F.v19rec?fmtS(F.v19rec):'aucun'}. Médailles : ${[1,2,3].filter(m=>F['v19m'+m]).length}/3.`]);
 if(F.v19q4)Q.push(['L\'œuf de l\'orage',F.v19q4===3||F.v19q4===2&&!egg4()?2:1,F.v19q4===1?'Tu as remis l\'œuf à l\'abri. Repasse voir le nid un autre jour.':F.v19q4===2?(egg4()?'Tu as gardé l\'œuf. Sa mère le cherche encore sur la Route 2…':'L\'œuf a éclos. Sa mère tourne encore au-dessus de la rive.'):'Une famille de Piafou grandit sur la Route 2.']);
 if(F.v19q5)Q.push(['L\'apprenti',F.v19q5>=4?2:1,F.v19q5===1?'Tito révise ses types. Reviens le voir à Cendreville après avoir battu Maëlle.':F.v19q5===2?'Tito s\'entraîne dur. Il veut un vrai combat après ton badge de Volterre.':'Tito est devenu l\'apprenti de Brasia.']);
 const ne=ELITE19.filter(E=>E.need()).length;if(ne)Q.push(['Défis d\'Élite',ELITE19.every(E=>F['v19'+E.id])?2:1,ELITE19.filter(E=>E.need()).map(E=>`${E.name} (${MAPS[E.m].name.split(' · ')[0]}${E.time==='n'?', la nuit':''}) : ${F['v19'+E.id]?'vaincu':'à défier'}`).join(' · ')]);
 return Q}}
{const h19q=headline19;headline19=function(){const g=QF(),h=h19q();if(g.badge&&!g.v19q1&&Math.random()<.35)return'Extra ! Le pâtissier Augustin, à Cendreville, se fait voler trois croissants chaque matin ! La police est perplexe.';
 if(g.badge3&&!g.v19q2&&Math.random()<.3)return'Extra ! Un dresseur fantôme hanterait le Bois Sépulcral, les nuits sans lune. Il défierait les passants !';return h}}
