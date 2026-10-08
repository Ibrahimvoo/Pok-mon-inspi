// =====================================================================
// Version 19.3 : la fin du Cycle
//  - la Faille devient le dernier chapitre de la Team Éclipse : Sélène se souvient de l'Observatoire (v191sel) ;
//    Corvin repenti (v19cor=3) baisse un levier pour toi, sinon il garde le chantier de Caïus (combat, puis v193cor 1=il quitte la Team, 2=non)
//  - « Que dis-tu à Caïus ? » quand il envoie sa dernière créature (v193w, v193d) ; la fin du combat en dépend (v193cai 1=la soupe, 2=il veut voir Crépuscel)
//  - Crépuscel ne se montre qu'une fois Caïus arrêté (il creusait sous le Sanctuaire) ; objectif mis dans l'ordre de l'histoire
//  - après Crépuscel : la première aube partagée au Sanctuaire, un épilogue des conséquences, puis FIN (v193fin)
// =====================================================================
const PV193={on:0,fin:0};
function epiDraw193(t){let g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#241a46');g.addColorStop(.5,'#8a4a7c');g.addColorStop(.78,'#e89a66');g.addColorStop(1,'#ffd890');X.fillStyle=g;X.fillRect(0,0,W,H);
 for(let i=0;i<46;i++){const sx=(i*151+23)%W,sy=(i*67+11)%(H*.42|0),tw2=((t/500|0)+i*7)%9;if(tw2)R(X,i%5?'#d8d0f4':'#ffffff',sx,sy,1,1)}
 halo191(110,74,40,'#e8ecff',.24);X.fillStyle='#f4f2ff';X.beginPath();X.arc(110,74,13,0,7);X.fill();X.fillStyle='#5a3a6e';X.beginPath();X.arc(116,70,12,0,7);X.fill();
 const sy=H-58+Math.round(2*Math.sin(t/900));halo191(W-120,sy,130,'#ffe0a0',.32+.05*Math.sin(t/700));X.fillStyle='#fff1c0';X.beginPath();X.arc(W-120,sy,24,Math.PI,0);X.fill();
 X.fillStyle='#2a1a36';X.beginPath();X.moveTo(0,H);for(let x=0;x<=W;x+=12)X.lineTo(x,H-48-Math.round(12*Math.sin(x/64)+6*Math.sin(x/21)));X.lineTo(W,H);X.closePath();X.fill();
 const cx=W/2|0;R(X,'#2a1a36',cx-34,H-104,10,52);R(X,'#2a1a36',cx+24,H-104,10,52);R(X,'#2a1a36',cx-40,H-112,80,10);halo191(cx,H-86,26,'#fff4d8',.22);halo191(cx,H-86,16,'#c080ff',.16);
 if(PV193.fin){X.fillStyle='rgba(16,10,30,.4)';X.fillRect(0,0,W,H);txt('FIN',W/2,H/2-34,'#fff4d8',{al:'c',s:6});txt('Le Cycle tourne de nouveau.',W/2,H/2,'#ffe8c0',{al:'c'});txt('Merci d\'avoir joué !',W/2,H/2+24,'#ffd890',{al:'c'})}}
{const dw=drawWorld;drawWorld=function(t){if(PV193.on)return epiDraw193(t);return dw.apply(this,arguments)}}

// ---------------------------------------------------------------- Sélène, sur les Coteaux, se souvient de l'Observatoire
{const sf=seleneFaille;window.seleneFaille193=async function(){const F=f(),q=F.failleQ;await sf.apply(this,arguments);if(q||!F.failleQ)return;
 await say(F.v191sel?'Il me restait une dette, tu te souviens ? C\'est lui. Ramène-le, et elle sera réglée.':'Et… pardon d\'être partie sans un mot, à l\'Observatoire. Je n\'étais pas prête. Maintenant, je le suis.','Sélène',0,'selene')};
 for(const n of MAPS.coteaux.npcs)if(n.fn===sf)n.fn=seleneFaille193}

// ---------------------------------------------------------------- Corvin dans la Faille
{const M=MAPS.faille,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=f();if(F.v19cor!==3||F.v193cw||F.failleDone)return;F.v193cw=1;
 await cine(1);const[cx,cy]=nearSpot(2),c=tmpN('faille',{x:cx,y:cy,t:'grunt',d:0,name:'Corvin'});faceTo(c,G.x,G.y);puff(cx,cy,'#c8b8a0',8);await emote(c,'!',400);
 await say('Je savais que tu viendrais. …Ouais, c\'est moi. Corvin. Avec un vrai casque, cette fois.','Corvin',0,'grunt');
 await say('Tito m\'a appris à creuser pour de vrai. Et ces galeries, c\'est moi qui les ai étayées, avant de raccrocher : je les connais par cœur.','Corvin',0,'grunt');
 await say('Le levier de gauche, derrière le rocher fissuré : je m\'en occupe. Toi, va chercher l\'autre. Et Caïus… parle-lui. Il n\'écoute personne, mais il entend tout.','Corvin',0,'grunt');
 puff(c.x,c.y,'#c8b8a0',8);rmN('faille',c);F.fzL=1;sfx('door');ui.shake=4;await say('Clac ! Au loin, un levier s\'abaisse.');if(F.fzR&&!F.fzOpen){F.fzOpen=1;refreshMap(G.map)}await cine(0);save()}}
async function corvinFaille193(n){const F=f(),C='Corvin',v=F.v19cor;await cine(1);faceTo(n,G.x,G.y);await emote(n,'!',500);
 await say(v===1?'Tu m\'as sorti de sous la poutre, gamin. Je n\'ai pas oublié. Mais Caïus m\'a donné un toit quand plus personne ne voulait de moi.':'Le gamin de la poutre. La mine, Volterre… et maintenant ici. Caïus m\'a donné un toit quand plus personne ne voulait de moi.',C,0,'grunt');
 await say('Je garde son chantier. Personne ne passe. Pas même toi.',C,0,'grunt');await cine(0);
 const r=await battle(team([['nocturelle',50],['rocaroc',51,null,'pierredure'],['magmor',52,null,'charbon']]),{tr:{name:'Contremaître Corvin',look:'grunt',money:2500,vs:1,items:1,after:'…Toujours toi. Toujours.'}});if(r!=='win')return r;
 await cine(1);await say('Tu sais ce qui est drôle ? Je creuse depuis des semaines, et je n\'ai jamais rien trouvé. Juste des cailloux. Et des Grumeroc.',C,0,'grunt');
 const c=await choose(['IL EST ENCORE TEMPS','VA-T\'EN'],{w:260,title:'Corvin'});
 if(c===0){F.v193cor=1;await say('"Il est encore temps. À Cendreville, Tito cherche quelqu\'un qui sait étayer une galerie."');await emote(n,'…',900);
  await say('Le petit mineur ? Celui dont j\'ai fait sauter la galerie ? …Il me recevrait, moi ?',C,0,'grunt');await say('Hmpf. On verra. Je sors d\'ici. Mais pas pour Caïus.',C,0,'grunt')}
 else{F.v193cor=2;await say('Ouais. C\'est ce que tout le monde me dit.',C,0,'grunt')}
 puff(n.x,n.y,'#c8b8a0',10);await cine(0);save();return r}
MAPS.faille.npcs.push({x:14,y:3,t:'grunt',d:2,name:'Corvin',cond:()=>[1,2,4].includes(f().v19cor)&&!f().v193cor&&!f().failleDone,fn:n=>corvinFaille193(n)});

// ---------------------------------------------------------------- Caïus : les mots, puis la fin du combat
async function words193(){const F=f(),C='Caïus',lk='caius',A=[];
 A.push(['LA PEUR',async()=>{await say('"Tu n\'as pas peur de la nuit, Caïus. Tu as peur que quelqu\'un décide à ta place."');await say('…Tais-toi. Tu ne sais rien de moi.',C,0,lk);return 1}]);
 if(F.v191sel)A.push(['SÉLÈNE',async()=>{await say('"Sélène attend dehors. Elle n\'est pas venue te battre. Elle est venue te chercher."');await say('Sélène… Elle a toujours été la plus courageuse de nous trois.',C,0,lk);return 1}]);
 if((F.v191d|0)>=3)A.push(['VALEN',async()=>{await say('"Valen est rentré chez lui. Personne ne lui a rien pris. On l\'a juste retrouvé."');await say('Rentré… Comme si c\'était si simple.',C,0,lk);return 1}]);
 if(F.v19cor===3||F.v193cor===1)A.push(['CORVIN',async()=>{await say('"Corvin a raccroché sa capuche. Il creuse avec Tito, à Cendreville. Pour de vrai."');await say('Corvin ? Ce dur à cuire ? …Il dort la nuit, maintenant ?',C,0,lk);return 1}]);
 if(F.v192fa===1)A.push(['FAUSTINE',async()=>{await say('"Même Faustine est rentrée à l\'atelier de Mirella. Il n\'est jamais trop tard."');await say('Faustine… et ses robes de nuit. Elle aussi, alors.',C,0,lk);return 1}]);
 if(F.legS&&F.legN)A.push(['LES GARDIENS',async()=>{await say('"Solarion et Nocturion n\'ont jamais voulu de maître. Ils m\'ont choisi parce que je ne voulais pas les tenir."');await say('…Choisi. Sans chaînes. C\'est… possible ?',C,0,lk);return 1}]);
 await say('Caïus serre les poings. Pour la première fois, sa voix tremble. C\'est le moment de lui parler.');
 let d=0;for(;;){const c=await choose([...A.map(a=>a[0]),'SE BATTRE'],{w:300,title:'Que dis-tu à Caïus ?'});if(c<0||c>=A.length)break;
  const[lbl,fn]=A.splice(c,1)[0];d+=await fn();(F.v193w??=[]).includes(lbl)||F.v193w.push(lbl);if(!A.length)break}
 F.v193d=Math.max(F.v193d|0,d);if(!d)return;
 if(d>=3){await say('Caïus baisse les yeux. Ses ordres arrivent en retard : sa créature hésite.');if(B.foe.hp>0)await statChange(1,'atk',-1);if(d>=4&&B.foe.hp>0)await statChange(1,'spd',-1)}
 else await say('Caïus secoue la tête et se reprend. Il faudrait d\'autres mots… ceux des gens que tu as aidés en chemin.')}
{const sf193=sendFoe;sendFoe=async function(...a){const r=await sf193.apply(this,a);try{if(B&&!B.coop&&!B.pvp&&B.tr?.name==='Admin Caïus'&&B.foe?.sp==='anubrume'&&!B.w193){B.w193=1;await words193()}}catch(e){console.error(e)}return r}}
async function caius193(n){const F=f(),C='Caïus',P='faille';await cine(1);faceTo(n,G.x,G.y);
 await say('Évidemment. Toujours toi. Tu as réparé le ciel, hein ? Et après ? Qui décidera la prochaine fois que les nuits raccourcissent ?',C,0,'caius');
 await say('Valen a pleuré dans les bras de sa grand-mère. Sélène est devenue gentille. Moi, je refuse d\'attendre qu\'un gamin et un dragon règlent le monde à ma place.',C,0,'caius');
 await say('Sous ce sanctuaire, il y a toute la lumière du Cycle. Je la prendrai, et le jour comme la nuit m\'obéiront. Fini, la peur.',C,0,'caius');await cine(0);
 const r=await battle([mon('noctyrex',54,{item:'encensnoir'}),mon('conglolem',54,{item:'pierredure'}),mon('eclipsoeil',55,{item:'baiesoin'}),mon('abyssombre',56,{item:'grelot'}),mon('anubrume',57,{item:'orbe'})],{tr:{name:'Admin Caïus',look:'caius',money:6000,vs:1,boss:1,items:2,ev:1,after:'…Encore.'}});
 if(r!=='win')return;await cine(1);const d=F.v193d|0;await say('Encore… Pourquoi est-ce que je perds toujours face à des gens qui n\'ont même pas peur ?',C,0,'caius');
 const[sx,sy]=nearSpot(2),s=tmpN(P,{x:sx,y:sy,t:'selene',d:1,name:'Sélène'});puff(sx,sy,'#d8d4ec',8);faceTo(s,n.x,n.y);faceTo(n,s.x,s.y);await wait(200);
 await say('Parce que la peur, ça ne se combat pas, Caïus. Ça se partage. C\'est ce que Valen a enfin compris.','Sélène',0,'selene');
 if(F.v191sel)await say('À l\'Observatoire, quelqu\'un m\'a tendu la main au lieu de me battre. Alors aujourd\'hui, c\'est moi qui te la tends.','Sélène',0,'selene');
 let v=null;if((F.v191d|0)>=3){const[vx,vy]=nearSpot(3);v=tmpN(P,{x:vx,y:vy,t:'valen',d:1,name:'Valen'});puff(vx,vy,'#c060ff',8);faceTo(v,n.x,n.y);
  await say('Caïus. Grand-mère a fait de la soupe. Elle a mis une assiette de plus. Elle met toujours une assiette de plus.','Valen',0,'valen')}
 await emote(n,'…',1100);
 if(d>=3){F.v193cai=2;await say('Toute ma vie, j\'ai cru que si je ne tenais pas tout, tout me tomberait dessus.',C,0,'caius');
  await say('Je ne veux plus voler la lumière de Crépuscel. …Mais je voudrais la voir. Une fois. Sans la tenir.',C,0,'caius');
  await say('Alors viens au Sanctuaire, quand il se montrera. Nous y serons tous.','Sélène',0,'selene')}
 else{F.v193cai=1;await say('…Je crois que je n\'ai jamais su faire ça. Partager.',C,0,'caius');await say('Alors commence par une soupe. La grand-mère de Valen en fait pour tout le monde.','Sélène',0,'selene');
  await say('Hmpf. …D\'accord. Une soupe. Pas plus.',C,0,'caius')}
 puff(n.x,n.y,'#c060ff',12);F.failleDone=1;if(v){puff(v.x,v.y,'#c060ff',8);rmN(P,v)}faceTo(s,G.x,G.y);
 await say('Merci. Encore une fois. Tiens : c\'était la capsule de Caïus. Il l\'avait fabriquée pour Crépuscel. Elle ne rate jamais. Choisis bien à qui tu la lances.','Sélène',0,'selene');
 give('cyclecapsule',1);jingle('item');await say('Tu reçois la CAPSULE CYCLE ! Une capture garantie, une seule fois.');
 await say('Au fond de la galerie, les foreurs ont trouvé une cavité pleine de Grumeroc. Ils n\'attendent que quelqu\'un pour leur tenir compagnie.','Sélène',0,'selene');puff(s.x,s.y,'#d8d4ec',10);rmN(P,s);
 if(F.legS&&F.legN)await say('Sous tes pieds, le grondement s\'est tu. Là-haut, au Sanctuaire du Cycle, Solarion et Nocturion s\'agitent dans leurs capsules.');await cine(0);healAll();save()}
{const n=MAPS.faille.npcs.find(n=>n.t==='caius');if(n)n.fn=caius193}

// ---------------------------------------------------------------- Le Sanctuaire : Crépuscel attend que Caïus soit arrêté
{const cr=MAPS.sanctuaire.npcs.find(n=>n.sp==='crepuscel');if(cr){const c0=cr.cond;cr.cond=()=>c0()&&!!f().failleDone}
 const M=MAPS.sanctuaire,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=f();if(F.legC&&F.failleDone&&!F.v193fin){await finale193();return}if(F.legS&&F.legN&&!F.failleDone&&!F.v193gr){F.v193gr=1;ui.shake=4;sfx('bump');
  await say('Sous l\'autel, la roche gronde. Des coups de pioche résonnent, très loin en dessous… Quelqu\'un creuse sous le Sanctuaire.');await say('Une voix douce, dans le vent : "Arrête celui qui creuse. Ensuite, je viendrai."')}}}
{const pg=postGoal;postGoal=function(g){if(g.balance&&g.legS&&g.legN&&g.failleDone&&!g.legC&&!g.v193fin)return'Caïus a renoncé. Monte au Sanctuaire du Cycle, en haut des Coteaux d\'Aurore : Solarion et Nocturion y attendent leur frère de lumière.';return pg(g)}}

// ---------------------------------------------------------------- La première aube partagée, puis FIN
let CR193=null;
{const ob=battle;battle=async function(foes,o){const r=await ob.apply(this,arguments);if(o?.legend&&foes?.[0]?.sp==='crepuscel')CR193=r;return r}}
{const l2=legend2;legend2=async function(sp){CR193=null;const r=await l2.apply(this,arguments);if(sp==='crepuscel'&&(CR193==='win'||CR193==='catch')&&!f().v193fin)await finale193();return r}}
async function finale193(){const F=f(),S='sanctuaire',L=[];await cine(1);musPlay('title');
 await say('Au-dessus de l\'autel, le soleil et la lune brillent ensemble. Pour la première fois depuis mille ans, Aurélys connaît un vrai crépuscule.');
 await fadeTo(1,500);const add=(x,t,name)=>L.push(tmpN(S,{x,y:7,t,d:1,name}));add(4,'selene','Sélène');add(5,'rival','Kael');add(7,'valen','Valen');
 if(F.v193cai===2)add(8,'caius','Caïus');if(F.v19cor===3||F.v193cor===1)add(9,'grunt','Corvin');await fadeTo(0,500);
 await say('Des pas sur le sentier. Ils sont venus. Tous.');
 await say('Alors c\'est ça, un vrai crépuscule. Petits, Valen et moi, on restait dehors jusqu\'à la dernière lueur. On ne savait pas que c\'était si rare.','Kael',0,'rival');
 await say((F.v191d|0)>=3?'Brume aurait adoré voir ça. …Tu sais, je crois qu\'il le voit.':'Je n\'ai pas vraiment le droit d\'être ici. Mais Kael a insisté. Il insiste toujours.','Valen',0,'valen');
 await say(F.v191sel?'Ma dette est réglée. Je crois que je vais enfin dormir la nuit.':'Je suis partie sans un mot, à l\'Observatoire. Alors je le dis maintenant : merci.','Sélène',0,'selene');
 if(F.v193cai===2)await say('C\'est… plus beau que tout ce que j\'aurais pu voler.','Caïus',0,'caius');
 if(F.v19cor===3||F.v193cor===1)await say('Avec Tito, on a étayé le sentier jusqu\'ici. Ça tiendra mille ans. Promis.','Corvin',0,'grunt');
 if(F.legC)await say('Crépuscel se pose près de toi. Une moitié de lui brille comme le jour, l\'autre comme la nuit… et toutes les deux te regardent.');
 await fadeTo(1,700);PV193.on=1;await fadeTo(0,900);
 const E=[F.legC?'Crépuscel a choisi de te suivre. Mais chaque soir, à l\'heure où le jour et la nuit se croisent, il retourne veiller au Sanctuaire.':'Crépuscel est reparti dans la lumière. On dit qu\'il veille sur chaque aube et chaque crépuscule d\'Aurélys.'];
 E.push(F.v193cai===2?'Caïus a rebouché la Faille de ses propres mains. Il vit à Lunévie, chez la grand-mère de Valen. Il dort la nuit, maintenant.':'Caïus a accepté la soupe. Une seule. Puis une deuxième. On dit qu\'il n\'est jamais reparti de Lunévie.');
 if(F.v193cor===1)E.push('À Cendreville, un ancien lieutenant étaie les galeries avec Tito. Il ne parle jamais de sa capuche violette.');else if(F.v193cor===2)E.push('Corvin a disparu dans les galeries de la Faille. Les Grumeroc, eux, ont un nouveau gardien bourru.');
 E.push((F.v191d|0)>=3?'Kael et Valen ont repeint ensemble la maison de leur grand-mère. Elle dit qu\'elle n\'a jamais eu autant de bols à laver.':'Kael et Valen se parlent encore peu. Mais chaque soir, ils regardent le même ciel.');
 E.push('Et toi ? Le Cycle tourne de nouveau, et il te reste mille routes : le Tournoi, le Conseil du Cycle, et toutes les créatures qui manquent encore à ton Pixédex.');
 for(const s of E)await say(s);
 PV193.fin=1;sfx('lv');for(let i=0;i<40;i++){const k=await key(250);if(k==='a'||k==='b')break}
 await fadeTo(1,700);PV193.on=0;PV193.fin=0;for(const n of L)rmN(S,n);F.v193fin=1;musPlay(mapMus(MAPS[G.map]));await fadeTo(0,600);await cine(0);
 await say('Ton aventure continue. Aurélys a encore bien des secrets…');save()}
// ---------------------------------------------------------------- Journal : ce que tu as vécu à la fin
{const q193=quests;quests=function(){const Q=q193(),F=f();if(F.v192v===2)Q.push(['Le voleur dans la foule',2,'Tu as démasqué Pipo parmi les danseurs du Carnaval.']);
 if(F.v192fa===1)Q.push(['Le fil de Faustine',2,'Tu as transmis à Faustine le message de Mirella.']);
 if(F.v193cor===1)Q.push(['Il est encore temps',2,'Dans la Faille, Corvin a quitté la Team Éclipse pour de bon.']);
 if(F.v193w?.length)Q.push(['Les mots pour Caïus',2,`En plein combat, tu as parlé à Caïus : ${F.v193w.join(', ').toLowerCase()}.`]);
 if(F.v193fin)Q.push(['La première aube partagée',2,'Au Sanctuaire du Cycle, tu as vu le premier vrai crépuscule avec tous ceux que tu as aidés.']);return Q}}
