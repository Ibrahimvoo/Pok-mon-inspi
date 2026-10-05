// =====================================================================
// EXTENSION 10.0 — Après l'histoire : le Conseil du Cycle (Citadelle du Pic Céleste), les Défis de Volterre,
// les anciens de la Team Éclipse, des habitants qui vivent leur journée, un compagnon plus expressif.
// =====================================================================
// --- Carte de la région
Object.assign(RMAP,{lac:[426,206,'LAC OPALIN',0,-12],bois:[216,70,'BOIS SÉPULCRAL',0,-12],galeries:[350,124,'GALERIES',12,3],recif:[66,272,'RÉCIF',12,3],pic:[62,40,'PIC CÉLESTE',0,20]});
Object.assign(RPAR,{lacH:'lac',crypte:'bois',temple:'recif',sceau:'recif',recifH:'recif',citadelle:'pic'});RLINK.push(['foret','lac'],['lunevie','bois'],['coteaux','galeries'],['port','recif'],['volterre','pic']);

// --- Citadelle du Cycle : quatre maîtres des phases, puis le Maître du Cycle
MAPS.citadelle={name:'Citadelle du Cycle',bg:'tech',amb:'in',floor:'stone',cstyle:'statue',mus:'gym',
 rows:["XXXXXXXXXXXXX","XFFFFFFFFFFFX","XCFFFFrFFFFCX","XFFFFFrFFFFFX","XFFFFFrFFFFFX","XCFFFFrFFFFCX","XFFFFFrFFFFFX","XFFFFFrFFFFFX","XCFFFFrFFFFCX","XFFFFFrFFFFFX","XFFFFFrFFFFFX","XFFFFFrFFFFFX","XFFFFFrFFFFFX","XXXXXXEXXXXXX"],
 doors:{'6,13':['pic',10,1,0]},npcs:[]};
const CONS=[
 {id:'cAube',name:'Maîtresse Aurore',t:'lili',x:2,y:9,d:3,ph:'AUBE',col:'#ff9ab8',sky:'sun',
  pre:'L\'aube est la plus fragile des heures. Elle ne dure qu\'un instant… mais sans elle, rien ne commence. Montre-moi ton premier pas !',after:'Ton aube est solide. Avance.',
  team:L=>[['cardinova',L,['rayonaurore','nitrocharge','aeropique','lanceflam'],'talisman'],['angeflocon',L,['rayonaurore','voilestellaire','cascade','soin'],'baiesoin'],['sphinxor',L+1,['prisme','eblouir','zenith','soin'],'poudretoile'],['nounoursol',L+1,['rayonaurore','facade','abri','doublecoup'],'miettes'],['fousable',L+2,['rayonaurore','seisme','prisme','abri'],'pierrechance']]},
 {id:'cJour',name:'Maître Héliodore',t:'leader',x:10,y:9,d:2,ph:'JOUR',col:'#ffd860',sky:'sun',
  pre:'Le jour ne recule devant rien. Il brûle, il pousse, il grandit. Tiendras-tu sous mon soleil de midi ?',after:'Ton feu brûle aussi fort que le mien. Avance.',
  team:L=>[['pyrenard',L,['lanceflam','nitrocharge','tranche','zenith'],'charbon'],['velocisylve',L,['lamefeuille','eclatfloral','tranche','racines'],'griffe'],['brachisylve',L+1,['floral','seisme','racines','photosynth'],'miettes'],['vivicendre',L+1,['lanceflam','morsure','facade','abri'],'bandeau'],['pyronox',L+2,['boutefeu','flammeclipse','tranche','cri'],'orbe']]},
 {id:'cCrep',name:'Sélène',t:'selene',x:2,y:5,d:3,ph:'CRÉPUSCULE',col:'#ff8a3a',sky:'eclipse',
  pre:'Tu t\'étonnes de me voir ici ? Valen m\'a confié le crépuscule. Il dit que je connais mieux que personne l\'heure où l\'on hésite entre deux camps.',after:'Valen avait raison sur toi. Et sur moi aussi, peut-être. Avance.',
  team:L=>[['anubrume',L,['nuit','hypnose','devoreve','clairlune'],'encensnoir'],['galaxelle',L,['prisme','pluieetoile','soin','voilestellaire'],'coquille'],['strellune',L+1,['griffeombre','machination','aeropique','hate'],'griffe'],['runestique',L+1,['griffeombre','meteore','machination','eclatroc'],'lunettes'],['eclipsoeil',L+2,['lunenoire','rayonnoir','eclipse','machination'],'orbe']]},
 {id:'cNuit',name:'Vex',t:'vex',x:10,y:5,d:2,ph:'NUIT',col:'#6a8aff',sky:'eclipse',
  pre:'J\'ai voulu éteindre le jour pour garder la nuit. Je me trompais : la nuit n\'a de sens que si elle finit. Alors je la garde, maintenant. Et je la garde bien.',after:'…Tu l\'as encore fait. Va. Valen t\'attend. Et… merci, pour le Cycle.',
  team:L=>[['noctyrex',L,['nuit','morsure','machination','lunenoire'],'encensnoir'],['lucifrimas',L,['lunenoire','devoreve','hypnose','cascade'],'lunettes'],['vengeronce',L+1,['griffeombre','vampigraine','lamefeuille','abri'],'miettes'],['requinuit',L+1,['mareenoire','griffeombre','cascade','tranche'],'bandeau'],['wendigrave',L+2,['griffeombre','ombreportee','machination','seisme'],'orbe']]},
 {id:'cMaitre',name:'Valen, Maître du Cycle',t:'valen',x:6,y:1,d:0,ph:'CYCLE',col:'#ffffff',
  pre:'Ma famille gardait le Temple des Fondateurs. Moi, j\'ai fui ce devoir, et Vex a failli tout briser. Alors j\'ai bâti cette Citadelle, pour que plus jamais personne ne garde le Cycle seul.',after:'Le Cycle n\'appartient à personne. Mais aujourd\'hui, il te salue.',
  team:L=>[['astrafelin',L,['prisme','eclatroc','hate','soin'],'poudretoile'],['tornalis',L,['hydro','dansepluie','mareenoire','tourbillon'],'eaumystique'],['regalance',L+1,['megaimpact','masquesolaire','seisme','abri'],'casque'],['prisaserpent',L+1,['fatalfoudre','orage','parabocharge','electrotoile'],'aimant'],['seraphivre',L+2,['aubeeternelle','lamecycle','voilestellaire','soin'],'talisman'],['eclipsoeil',L+3,['lunenoire','eclipse','rayonnoir','machination'],'orbe']]}];
const consLv=()=>f().conseilWin?Math.min(85,72+(f().conseilN||1)*2):62;
CONS.forEach((c,i)=>MAPS.citadelle.npcs.push({x:c.x,y:c.y,t:c.t,d:c.d,name:c.name,cid:i,fn:()=>consTalk(i)}));
MAPS.citadelle.npcs.push({x:4,y:12,t:'nurse',d:3,name:'Gardienne de la Citadelle',fn:async()=>{const P='Gardienne de la Citadelle';if((f().consP||0)>0)return say('Le Conseil est commencé. Plus de soins jusqu\'au Maître ! Courage.',P,0,'nurse');await campHeal(P,'Le Conseil du Cycle : l\'Aube, le Jour, le Crépuscule, la Nuit, puis le Maître. Dans l\'ordre, sans repos. Laisse-moi soigner ton équipe avant d\'entrer.')}},
 OB10(8,12,'stele',()=>say(`PANTHÉON DE LA CITADELLE\n${f().conseilWin?`Tu y es inscrit ${f().conseilN} fois. Le Conseil se renforce à chaque victoire (niveau ${consLv()}).`:'Aucun nom n\'y est encore gravé depuis la fondation.'}`),{sid:-1}));
async function consTalk(i){const c=CONS[i],p=f().consP||0,F=f();if(p<i)return say(i===4?'Le Maître attend que les quatre phases t\'aient jugé.':`Respecte l'ordre du Cycle : ${CONS[p].ph} d'abord.`,c.name,0,c.t);
 if(p>i)return say(c.after,c.name,0,c.t);const L=consLv();await cine(1);sfx('alert');ui.flash=.5;ui.flashC=c.col;await say(`${c.ph} — ${c.name}`);await say(c.pre,c.name,0,c.t);await cine(0);
 const r=await battle(team(c.team(L)),{tr:{name:c.name,look:c.t,money:4000+i*1500,vs:1,boss:1,items:i===4?4:2,ev:1,after:c.after,field:i===2?'crep':null}});
 if(r!=='win'){f().consP=0;await say('Le Conseil t\'a battu. Il faudra recommencer depuis l\'Aube.',c.name,0,c.t);return save()}
 f().consP=i+1;if(i<4){sfx('lv');await say(`${c.ph} vaincu ! (${i+1}/4)`);return save()}
 f().consP=0;F.conseilN=(F.conseilN||0)+1;const first=!F.conseilWin;F.conseilWin=1;await cine(1);sfx('roar');rays(6,1,'#ffffff',2400);await wait(500);
 await say(first?'Valen pose la main sur ton épaule. "Tu es le premier à graver ton nom ici. Pas le dernier, j\'espère. Le Conseil reviendra plus fort à chaque fois."':'"Encore toi. Le Cycle tourne, et toi aussi."','Valen, Maître du Cycle',0,'valen');
 (G.hof??=[]).push({t:G.play,n:F.conseilN,team:G.party.map(m=>[m.sp,m.lv,m.sh?1:0])});if(first){give('rappelmax',5);give('cyclecapsule');G.keys.couronne=1;await say('Tu reçois 5 Rappels Max, une Capsule Cycle et la COURONNE DU CYCLE !')}else give('pepite',3);
 await cine(0);rep('volterre',5);achCheck();await hallOfFame(G.hof.length-1);save()}

// --- Défis de Volterre : Mono-type et Égalité (tout le monde au niveau 50)
MAPS.volterre.npcs.push({x:21,y:18,t:'orso',d:2,name:'Arbitre Orso',fn:()=>defiTalk()});
const MONOTR=[['Dresseur','scout'],['Dresseuse','girl'],['Montagnard','mountaineer'],['Scientifique','assistant'],['Vétéran','captain']];
async function defiTalk(){const O='Arbitre Orso';if(!f().badge4)return say('Ancien commandant de la Centrale, reconverti en arbitre. Les Défis de Volterre sont réservés aux détenteurs du Badge Volt.',O,0,'orso');
 if(!f().orsoD){f().orsoD=1;await say('Surpris ? Après la Centrale, Ambroise m\'a proposé un travail honnête. J\'arbitre, maintenant. C\'est moins bruyant que commander des sbires.',O,0,'orso')}
 const c=await choose(['DÉFI MONO-TYPE','DÉFI ÉGALITÉ (NIV. 50)','RÈGLES','PARTIR'],{w:260,title:'Défis de Volterre'});if(c<0||c===3)return;
 if(c===2)return say('MONO-TYPE : toute ton équipe doit partager un type. Cinq combats d\'affilée, sans soins. ÉGALITÉ : tes créatures sont ramenées au niveau 50, et l\'adversaire aussi. Cinq combats, sans soins. Chaque type vaincu rapporte une récompense.',O,0,'orso');
 if(c===0){const ts=[...new Set(G.party.map(m=>SP[m.sp].t))];if(ts.length!==1||G.party.length<3)return say('Il me faut au moins trois créatures… et toutes du même type !',O,0,'orso');return defiRun(ts[0],0)}
 if(G.party.length<3)return say('Il faut au moins trois créatures pour le Défi Égalité.',O,0,'orso');return defiRun(null,1)}
async function defiRun(ty,eq){const O='Arbitre Orso',saved=eq?G.party.map(m=>({m,lv:m.lv,hp:m.hp,exp:m.exp})):null;if(!await ask(ty?`Défi Mono-type ${TY[ty][0]} : cinq combats sans soins. On y va ?`:'Défi Égalité : tout le monde au niveau 50. On y va ?',O))return;
 healAll();NOEVO10=eq;if(eq)for(const s of saved){s.m.lv=50;s.m.exp=xpFor(50);s.m.hp=st(s.m).hp}
 const pool=DEX.filter(k=>!['solarion','nocturion','crepuscel','aurorelle','eclipsar','presagelle','heliote','seleniote','errenard','masquaserp'].includes(k)&&SP[k].stg>=2&&(!ty||SP[k].t!==ty||Math.random()<.3));let win=0;
 for(let i=0;i<5;i++){const L=eq?50:Math.min(78,Math.max(...G.party.map(m=>m.lv))+i),T=[0,1,2].map(j=>[pool[(dayN()*31+i*7+j*13)%pool.length],L+(j===2?1:0)]),[nmT,lk]=MONOTR[i];
  await say(`Combat ${i+1}/5 !`,O,0,'orso');const r=await battle(team(T),{tr:{name:`${nmT} ${['Ilian','Mara','Tobias','Nina','Augustin'][i]}`,look:lk,money:600+i*200,items:i>=3?1:0,ev:i===4?1:0},noLose:1,loseMsg:'Ton équipe est K.O.… Le défi s\'arrête ici.'});if(r!=='win')break;win++}
 NOEVO10=0;if(eq)for(const s of saved){s.m.lv=s.lv;s.m.exp=s.exp;s.m.hp=Math.min(st(s.m).hp,s.m.hp)}healAll();
 if(win<5)return say(`${win} victoire${win>1?'s':''} sur 5. Reviens quand tu veux : le défi change chaque jour.`,O,0,'orso');
 f().monoWin=1;G.monoDone??={};const k=ty||'EQ',nw=!G.monoDone[k];G.monoDone[k]=1;sfx('badge');await say('Cinq sur cinq ! Le public de Volterre est debout !',O,0,'orso');
 if(nw){const it=ty?BOOST[ty]:'griffe';give(it);G.money+=5000;await say(`Récompense : ${IT[it][0]} et 5 000 pièces.`)}else{G.money+=2000;await say('Tu remportes 2 000 pièces.')}
 if(Object.keys(TY).every(t=>G.monoDone[t])&&!f().monoAll){f().monoAll=1;give('pierrechance');give('dc_lamecycle');await say('Tous les types ! Orso t\'offre une Pierre Chance et le DC Lame du Cycle.')}rep('volterre',2);achCheck();save()}

// --- Les anciens de la Team Éclipse : après l'Équilibre, chacun cherche sa place
const EXG=[['ville',5,7,'Ancien sbire Rémi',['Quand j\'ai rejoint la Team, on me promettait des nuits éternelles. Moi, je voulais juste un travail. Maintenant, je répare les rails de la mine.','Brasia m\'a embauché. Elle crie fort, mais elle paie à l\'heure.']],
 ['port',3,7,'Ancienne sbire Clara',['J\'étais dans l\'équipe de Sélène. Elle nous disait toujours : "Si un ordre vous fait honte, ne l\'exécutez pas." Caïus nous disait le contraire.','Je pêche avec les vieux du port, maintenant. Ils ne posent pas de questions.']],
 ['lunevie',18,13,'Ancien sbire Jo-Ann',['Les rangs de la Team ? Les sbires, puis les chefs d\'escouade, puis les admins : Sélène, Caïus, et Orso pour la Centrale. Au-dessus, Vex. Et au-dessus de Vex… personne. C\'était ça, le problème.','Vex vient parfois à Lunévie, la nuit. Il regarde les étoiles avec Ysolde. Personne n\'ose lui parler.']],
 ['volterre',4,17,'Ancien sbire Bertin',['Caïus voulait réveiller ce qui dort sous la mer. Vex voulait seulement que les nuits durent. Sélène ne voulait rien de tout ça : elle voulait retrouver Valen.','J\'ai un colis à rendre. Un objet que j\'ai volé à Bourg-Lueur, il y a deux ans. Je n\'ose pas y aller.']]];
EXG.forEach(([m,x,y,n,L],i)=>MAPS[m].npcs.push({x,y,t:'grunt',d:0,name:n,cond:()=>!!f().balance,fn:i===3?()=>bertinTalk():async()=>say(L[dayN()%L.length],n,0,'grunt')}));
IT.colis=['Colis de Bertin',0,'Un petit paquet ficelé. Adressé à "Lou, Bourg-Lueur".',0,'quest'];ICO.colis=icon(["........","..oooo..",".oyyyyo.","oyyYyyyo","oYYYYYYo","oyyYyyyo","oyyYyyyo","oooooooo"]);
async function bertinTalk(){const N='Ancien sbire Bertin';if(f().colisOk)return say('Lou a gardé la boîte à musique ? … Tant mieux. Merci de l\'avoir rapportée.',N,0,'grunt');
 if(!f().colisQ){await say('Il y a deux ans, en mission, j\'ai volé une boîte à musique dans une maison de Bourg-Lueur. Une petite fille pleurait, je l\'entends encore.',N,0,'grunt');if(!await ask('Rapporter le colis à Bourg-Lueur ?'))return;f().colisQ=1;G.bag.colis=1;jingle('item');return say('Merci… L\'adresse dit "Lou". Dis-lui… dis-lui ce que tu veux. Pas mon nom, peut-être.',N,0,'grunt')}
 return say('Tu as rendu le colis ?',N,0,'grunt')}
{const L0=louTalk;louTalk=async function(n){if(G.bag?.colis&&f().colisQ&&!f().colisOk){delete G.bag.colis;f().colisOk=1;await say('Un colis pour moi ? … MA BOÎTE À MUSIQUE ! Celle de Papa ! Je la croyais perdue pour toujours !','Lou',0,'sis');
  await say('Qui l\'avait ? … Un ancien de la Team ? Il l\'a rendue tout seul ? Alors… je lui pardonne. Dis-lui merci. Et tiens, c\'est pour toi : j\'ai mis des mois à le tricoter.','Lou',0,'sis');give('ruban');rep('bourg',4);rep('volterre',2);return save()}return L0(n)};
 for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===L0)n.fn=louTalk}

// --- Une journée à Aurélys : habitants qui changent de place selon l'heure et réagissent au monde
const DAYN=[['ville',12,7,'Boulangère Margot','girl',()=>!night(),()=>rain()?'Les jours de pluie, tout le monde veut du pain chaud. Je n\'arrête pas !':f().balance?'Depuis que les nuits sont revenues, je fais des croissants de lune. Ils partent en une heure !':'Mon pain se vend mieux quand le soleil brille. Logique, non ?'],
 ['ville',4,12,'Boulangère Margot','girl',()=>night(),()=>'Le soir, je rentre chez moi et je compte les étoiles. Après une journée de pétrin, ça repose les bras.'],
 ['port',15,11,'Pêcheur Lucien','fisher',()=>phase()===0||phase()===1,()=>phase()===0?'L\'aube, c\'est l\'heure des Miroitruite. Elles montent voir le ciel.':'Il fait trop chaud à midi. Les poissons dorment, et moi aussi bientôt.'],
 ['port',7,13,'Pêcheur Lucien','fisher',()=>phase()>=2,()=>'La nuit, je pêche depuis la jetée. Les Lumipêche allument leurs lanternes pour moi.'],
 ['lunevie',8,15,'Astronome apprentie Iris','girl',()=>night(),()=>stars()?'Une pluie d\'étoiles ! Je dois tout noter, tout ! Aide-moi à compter !':'Lunévie se réveille quand le soleil se couche. Bienvenue chez nous !'],
 ['lunevie',16,8,'Astronome apprentie Iris','girl',()=>!night(),()=>'Le jour, je dors. Enfin, j\'essaie. Les Pissenlou ronflent.'],
 ['volterre',10,8,'Ingénieure Paula','assistant',()=>!night(),()=>rain()?'L\'orage fait tourner les turbines à fond ! Les Ventiloon adorent ça.':f().baseDone?'Depuis que la Centrale est libérée, Volterre ne manque plus jamais de courant.':'La Team Éclipse détourne notre courant… On ne peut rien faire.'],
 ['bourg',10,9,'Facteur retraité Émile','old',()=>true,()=>f().badge4?'Quatre badges ! Ton père en aurait pleuré. Bon, il pleure déjà pour un rien.':f().badge?'Un badge ! À ton âge, je livrais encore le courrier à pied jusqu\'à Cendreville.':'Bonne route, petit. Reviens nous voir de temps en temps.'],
 ['coteaux',8,4,'Enfant curieux','kid',()=>!night(),()=>ecl()?'Maman dit qu\'il ne faut pas regarder le soleil quand il est mangé. Mais il est tout noir, ça ne fait pas mal !':'On joue à cache-cache avec les Pissenlou ! Ils gagnent toujours.']];
DAYN.forEach(([m,x,y,n,t,c,s])=>MAPS[m].npcs.push({x,y,t,d:0,name:n,cond:c,wan:1,say:s}));

// --- Compagnon : réactions selon le lieu, le temps, l'heure et son type ; talents d'exploration
{const FT0=folTalk;folTalk=async function(){const m=folMon();if(!m||Math.random()<.45)return FT0();const n=nm(m),t=SP[m.sp].t,M=MAPS[G.map],ph=phase();
 const L=[t==='FEU'&&rain()&&`${n} se blottit contre toi pour échapper à la pluie.`,t==='EAU'&&rain()&&`${n} danse sous la pluie, ravi !`,t==='FEU'&&G.map==='mont'&&`${n} respire l'air brûlant du volcan à pleins poumons.`,t==='OMB'&&night()&&`${n} se fond dans l'obscurité. On ne voit plus que ses yeux qui brillent.`,
  t==='LUM'&&ph===1&&`${n} tourne son visage vers le soleil, les yeux fermés.`,t==='LUM'&&ecl()&&`${n} tremble un peu. La lumière lui manque.`,t==='PLA'&&G.map==='lac'&&`${n} trempe ses feuilles dans l'eau du lac.`,t==='ROC'&&M.cave&&`${n} tapote les parois de la grotte, comme s'il reconnaissait quelqu'un.`,
  t==='ELE'&&G.map==='volterre'&&`${n} se charge d'électricité près des turbines. Ses poils se dressent !`,G.map==='bois'&&`${n} se colle à toi. Le Bois Sépulcral lui fait un peu peur.`,G.map==='temple'&&`${n} fixe les runes des murs, fasciné.`,G.map==='pic'&&`${n} regarde le vide, puis toi, puis le vide. Il préférerait redescendre.`,
  stars()&&`${n} suit des yeux les étoiles filantes et pousse un petit cri à chacune.`,ph===0&&`${n} s'étire longuement. L'aube le rend tout doux.`,ph===2&&`${n} regarde le soleil se coucher, sans bouger.`,bondLv(m)>=5&&`${n} pose sa tête contre toi. Vous n'avez plus besoin de mots.`].filter(Boolean);
 if(!L.length)return FT0();bondUp(m,1);const e={n:'fol',k:'♥',t0:now()};ui.emo.push(e);setTimeout(()=>ui.emo.splice(ui.emo.indexOf(e),1),900);return say(L[rnd(0,L.length-1)])};
 for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===FT0)n.fn=folTalk}
let ENC10=0,NOEVO10=0;
const onStep0=onStep;onStep=async function(){const ld=folMon(),T=ld&&tal(ld);
 if(T==='flair'&&G.t%90===0&&!['in','tech'].includes(MAPS[G.map].amb)&&Math.random()<.35){const k=['potion','capsule','baiesoin','superpotion','biscuit','pepite','perle','etoilefilante'][rnd(0,7)];await emote('fol','!',500);give(k);await say(`${nm(ld)} renifle le sol… et déterre ${IT[k][0]} ! (Talent Flair)`)}
 ENC10=1;try{return await onStep0()}finally{ENC10=0}};
const battle0=battle;battle=async function(foes,o={}){if(ENC10&&!o.tr&&!o.legend&&!o.fish&&!o.roam&&foes.length===1&&folMon()&&tal(folMon())==='feutre'&&Math.random()<.5)return null;ENC10=0;return battle0(foes,o)};
const evoT10=evoTarget;evoTarget=function(m,item){return NOEVO10&&!item?null:evoT10(m,item)};
