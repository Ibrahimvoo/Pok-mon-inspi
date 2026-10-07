// =====================================================================
// EXTENSION 10.0 — Progression : réputation, succès, carnet (collections, chroniques, statistiques), album photo,
// pêche à la Méga Canne, concours d'Ondine, fossile feuille, nouveaux paliers du Pixédex, options d'accessibilité.
// =====================================================================
const ST10=()=>(G.stat??={cap:0,capN:0,capR:0,capE:0,capS:0,shiny:0,evo:0,fish:0,berry:0,win:0,trW:0}),FSP=()=>(G.fishSp??={});
// --- Réputation : chaque ville (et deux confréries) se souvient de ce que tu as fait pour elle
const REPN={bourg:'Bourg-Lueur',cendre:'Cendreville',port:'Port-Miroir',lunevie:'Lunévie',volterre:'Volterre',cher:'Chercheurs',peche:'Pêcheurs'},REPT=[0,4,10,18,28],REPL=['Inconnu','Connu','Apprécié','Respecté','Héros local'];
const REPG={bourg:[['biscuit',5],['rappelmax',2]],cendre:[['pierredure',1],['bandeau',1]],port:[['eaumystique',1],['maxpotion',3]],lunevie:[['encensnoir',1],['lunettes',1]],volterre:[['aimant',1],['dc_orage',1]],cher:[['eclatprisme',1],['pierreaube',1]],peche:[['filetcapsule',5],['megacapsule',5]]};
const TOWN={bourg:'bourg',route1:'bourg',lab:'bourg',chambre:'bourg',salon:'bourg',ville:'cendre',foret:'cendre',mont:'cendre',mine:'cendre',gym:'cendre',coteaux:'cendre',galeries:'cendre',ruines:'cendre',clairiere:'cendre',
 route2:'port',port:'port',grotte:'port',gym2:'port',recif:'port',recifH:'port',lac:'port',lacH:'port',temple:'port',sceau:'port',lunevie:'lunevie',bois:'lunevie',crypte:'lunevie',gym3:'lunevie',maisonY:'lunevie',maisonP:'lunevie',sanctuaire:'lunevie',faille:'lunevie',
 volterre:'volterre',centrale:'volterre',centrale2:'volterre',gym4:'volterre',maisonA:'volterre',obs:'volterre',dome:'volterre',pic:'volterre',citadelle:'volterre'};
const repLv=k=>{const v=G.rep?.[k]||0;let l=0;REPT.forEach((t,i)=>{if(v>=t)l=i});return l};
function rep(k,n=1){if(!G||!REPN[k])return;G.rep??={};const l0=repLv(k);G.rep[k]=(G.rep[k]||0)+n;const l1=repLv(k);if(l1>l0){ui.note={s:`${REPN[k]} : ${REPL[l1]}`,t0:now()};sfx('lv');
  const g=l1===2?REPG[k][0]:l1===4?REPG[k][1]:null;if(g){G.bag[g[0]]=(G.bag[g[0]]||0)+g[1];(G.mail??=[]).push(`${REPN[k]} te remercie : ${IT[g[0]][0]} x${g[1]} ajouté à ton sac.`)}}achCheck()}
const tb0=trainerBattle;trainerBattle=async function(n){const r=await tb0(n);if(r==='win'){rep(TOWN[G.map]||'bourg',1);ST10().trW++}return r};
const buyMenu0=buyMenu;buyMenu=function(list,price,who){if(price||!G)return buyMenu0(list,price,who);const l=repLv(TOWN[G.map]||'bourg'),d=[0,0,.05,.1,.15][l];
 const ks=list||['potion','superpotion','totalsoin','repousse','rappel','capsule','supercapsule','biscuit','baiesoin',...(f().badge?['hypercapsule','crepuscapsule','baieprisme','filetcapsule']:[]),...(f().badge2?['hyperpotion','elixir','superrepousse','sombrecapsule']:[]),...(f().badge3?['pierrelune','pierreorage','rapidecapsule']:[]),...(f().badge4?['maxpotion','megacapsule','pierresoleil']:[]),...(f().balance?['rappelmax']:[])];
 return buyMenu0(ks,d?Object.fromEntries(ks.map(k=>[k,Math.round(IT[k][1]*(1-d)/10)*10])):null,who)};
// Le disquaire de Volterre vend les Disques Cycle (enseignement réutilisable)
MAPS.volterre.npcs.push({x:15,y:12,t:'scout',d:0,name:'Disquaire Max',fn:async()=>{const D='Disquaire Max';if(!f().badge4)return say('Mes Disques Cycle enseignent des capacités à tes créatures. Réutilisables à l\'infini ! Mais je ne vends qu\'aux dresseurs qui ont le Badge Volt.',D,0,'scout');
 await say('Les Disques Cycle ! Un disque, une capacité, autant de fois que tu veux. Compatible avec les créatures du même type, ou si la capacité est NORMALE.',D,0,'scout');const L=DISCS.map(m=>'dc_'+m).filter(k=>IT[k][1]>0&&!G.bag[k]);if(!L.length)return say('Tu as toute ma collection ! Respect.',D,0,'scout');await buyMenu(L,Object.fromEntries(L.map(k=>[k,IT[k][1]])),D)}});
MPOOL.push('bandeau','coquille','casque','megacapsule','pierresoleil','tartecycle','dc_rafraichir');

// --- Succès : objectifs internes avec récompenses
const ACH=[['cap10','Apprenti collectionneur','Capturer 10 espèces.',()=>caught()>=10,['supercapsule',5]],['cap50','Collectionneur','Capturer 50 espèces.',()=>caught()>=50,['hypercapsule',5]],['cap100','Encyclopédiste','Capturer 100 espèces.',()=>caught()>=100,['megacapsule',5]],
 ['cap140','Mémoire d\'Aurélys','Capturer 140 espèces.',()=>caught()>=140,['rappelmax',3]],['seen','Oeil de lynx','Voir toutes les espèces du Pixédex.',()=>DEX.every(k=>G.dex[k]>0),['pierreaube',1]],
 ['badges','Quatre badges','Obtenir les quatre badges d\'Aurélys.',()=>f().badge&&f().badge2&&f().badge3&&f().badge4,['maxpotion',3]],['balance','Gardien du Cycle','Rétablir l\'équilibre entre le jour et la nuit.',()=>!!f().balance,['dc_lamecycle',1]],
 ['capE','Chasseur d\'ombres','Capturer une créature pendant une éclipse.',()=>ST10().capE>=1,['sombrecapsule',5]],['capN','Oiseau de nuit','Capturer 10 créatures la nuit.',()=>ST10().capN>=10,['crepuscapsule',5]],['capR','Chanteur sous la pluie','Capturer 5 créatures sous la pluie.',()=>ST10().capR>=5,['filetcapsule',5]],
 ['capS','Vœu exaucé','Capturer une créature une nuit d\'étoiles filantes.',()=>ST10().capS>=1,['etoilefilante',2]],['shiny','Couleurs rares','Capturer une créature chromatique.',()=>ST10().shiny>=1,['pierrechance',1]],
 ['evo20','Métamorphoses','Faire évoluer 20 créatures.',()=>ST10().evo>=20,['pierresoleil',1]],['fish20','Patience de pêcheur','Ferrer 20 créatures à la canne.',()=>ST10().fish>=20,['superrepousse',5]],['fishSp','Ichtyologue','Pêcher 12 espèces différentes.',()=>Object.keys(FSP()).length>=12,['dc_cascade',1]],
 ['steles','Lecteur de pierres','Déchiffrer les huit Stèles des Fondateurs.',()=>nStele()>=8,['eclatprisme',1]],['larmes','Deux larmes','Forger l\'Amulette du Cycle.',()=>!!f().amuC,['talisman',1]],
 ['legend','Légendes vivantes','Capturer Solarion, Nocturion, Crépuscel, Aurorelle et Éclipsar.',()=>['solarion','nocturion','crepuscel','aurorelle','eclipsar'].every(k=>G.dex[k]===2),['cyclecapsule',1]],
 ['mythic','Rumeurs confirmées','Capturer Présagelle, Héliote, Séléniote, Errenard et Masquaserp.',()=>['presagelle','heliote','seleniote','errenard','masquaserp'].every(k=>G.dex[k]===2),['orbe',1]],
 ['aurorelle','La première aube','Rencontrer Aurorelle au Pic Céleste.',()=>!!f().legA,['poudretoile',1]],['eclipsar','Le soleil dévoré','Apaiser Éclipsar au fond du Temple.',()=>!!f().legE,['encensnoir',1]],['errenard','Sur la piste du renard','Capturer Errenard.',()=>!!f().legR&&G.dex.errenard===2,['rapidecapsule',5]],
 ['bond5','Inséparables','Atteindre le lien maximal avec une créature.',()=>[...G.party,...G.box].some(m=>bondLv(m)>=5),['biscuit',5]],['team70','Équipe d\'élite','Avoir six créatures de niveau 70 ou plus dans l\'équipe.',()=>G.party.length===6&&G.party.every(m=>m.lv>=70),['maxpotion',5]],
 ['tour','Tournoi du Cycle','Remporter le Tournoi du Cycle.',()=>!!G.keys.trophy,['amulette',1]],['tower','Défi du Crépuscule','Atteindre l\'étage 10 du Défi du Crépuscule.',()=>(f().towerBest||0)>=10,['miettes',1]],['elias','Fils et fille des étoiles','Vaincre Elias sous le dôme.',()=>!!f().eliasWin,['dc_megaimpact',1]],
 ['conseil','Maître du Cycle','Vaincre le Conseil du Cycle.',()=>!!f().conseilWin,['rappelmax',5]],['mono','Fidèle à un type','Remporter un Défi Mono-type.',()=>!!f().monoWin,['bandeau',1]],['nohealGym','Sans filet','Battre un Champion sans utiliser d\'objet.',()=>!!f().noHealGym,['griffe',1]],
 ['zones','Grand voyageur','Visiter tous les lieux d\'Aurélys.',()=>['bourg','route1','ville','foret','mont','route2','port','grotte','volterre','coteaux','lunevie','lac','bois','galeries','recif','temple','pic','sanctuaire'].every(k=>G.seen?.[k]),['hypercapsule',10]],
 ['photos','Photographe','Réussir 7 photos de l\'album.',()=>Object.keys(G.album||{}).length>=7,['dc_rayonaurore',1]],['photosAll','Regard d\'Aurélys','Compléter l\'album photo.',()=>Object.keys(G.album||{}).length>=PHOTOS.length,['pierreaube',1]],
 ['missions','Toujours prêt','Accomplir 20 missions du tableau.',()=>(G.ms?.done||0)>=20,['megacapsule',3]],['berry','Cueilleur','Récolter 20 fois des baies.',()=>ST10().berry>=20,['baieprisme',5]],['rich','Fortune','Posséder 100 000 pièces.',()=>G.money>=100000,['pepite',3]],
 ['repOne','Héros local','Devenir un héros local quelque part.',()=>Object.keys(REPN).some(k=>repLv(k)>=4),['tartecycle',3]],['repAll','Aimé de tous','Être respecté partout (niveau 3 dans les sept réputations).',()=>Object.keys(REPN).every(k=>repLv(k)>=3),['rappelmax',3]],
 ['quests','Bon samaritain','Terminer 10 quêtes secondaires.',()=>sideDone()>=10,['amulette',1]],['secret','Attends… je peux aller là ?','Ouvrir la crypte du Bois Sépulcral.',()=>!!f().bLant,['dc_machination',1]]];
const sideDone=()=>['gastonOk','ghostDone','perleOk','ondine1','ondine3','hugTarte','carnet','wendC','galC','cryC','masqOk','zel','ph1','theoQ','rosaQ','lili','gusQ'].filter(k=>f()[k]).length;
function achCheck(){if(!G||!f().starter)return;G.ach??={};for(const[id,n,,ok,rw]of ACH){if(G.ach[id])continue;let v=false;try{v=ok()}catch(e){}if(!v)continue;G.ach[id]=dayN()+1;G.bag[rw[0]]=(G.bag[rw[0]]||0)+rw[1];(G.mail??=[]).push(`Succès « ${n} » : ${IT[rw[0]][0]} x${rw[1]} ajouté à ton sac.`);ui.note={s:'SUCCÈS : '+n,t0:now()};sfx('badge')}}
const ach=id=>{achCheck()};
// Les messages (succès, réputation) sont annoncés au calme, après un combat ou un changement de lieu
async function mailFlush(){if(!G?.mail?.length)return;const L=G.mail.splice(0);for(const s of L.slice(0,4))await say(s);if(L.length>4)await say(`… et ${L.length-4} autre${L.length>5?'s':''} récompense${L.length>5?'s':''} (voir le Carnet).`)}
const endBattle0=endBattle;endBattle=async function(r){const b=B,used=b?.usedBag;if(r==='catch'&&b){const S=ST10();S.cap++;if(night()||ecl())S.capN++;if(rain())S.capR++;if(ecl())S.capE++;if(stars())S.capS++;if(b.foe.sh)S.shiny++;if(b.o.fish)FSP()[b.foe.sp]=2}
 if(r==='win'&&b?.tr&&LEADERS10.includes(b.tr.name)&&!used)f().noHealGym=1;const out=await endBattle0(r);achCheck();await mailFlush();return out};
const LEADERS10=['Championne Brasia','Championne Maëlle','Championne Orane','Champion Ambroise','Brasia','Maëlle','Orane','Ambroise'];
const bag0=bagMenu;bagMenu=async function(inB){const r=await bag0(inB);if(inB&&r&&B)B.usedBag=1;return r};
const evolve0=evolve;evolve=async function(m,to){const r=await evolve0(m,to);ST10().evo++;achCheck();return r};
const berry0=berryTree;berryTree=async function(n){const ok=berryRipe(n);const r=await berry0(n);if(ok&&!berryRipe(n))ST10().berry++;return r};
for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===berry0)n.fn=berryTree;
const warp0=warp;warp=async function(...a){await warp0(...a);achCheck();await mailFlush()};
DXR.push([80,'megacapsule',5],[100,'dc_megaimpact',1],[120,'pierreaube',1],[140,'rappelmax',3]);
const dex0=dex;
// --- Fossile Feuille : le Prof. Saule ranime Fougeron
{const FP0=fossilProf;fossilProf=async function(){if(G.bag.fossilefeuille){const P='Prof. Saule';delete G.bag.fossilefeuille;await say('Un Fossile Feuille ! Une fougère pétrifiée… et quelque chose dort dedans. Laisse-moi faire.',P);await fadeTo(1,400);sfx('lv');await wait(600);await fadeTo(0,400);
  const m=mon('fougeron',25);dex('fougeron',2);if(G.party.length<6)G.party.push(m);else G.box.push(m);await say('Le fossile s\'ouvre ! Un FOUGERON s\'étire et bâille. Il te regarde déjà comme un vieil ami.');rep('cher',3);save();return true}return FP0()};
 for(const M of Object.values(MAPS))for(const n of M.npcs||[])if(n.fn===profTalk){}}

// --- Album photo : Lise prête son appareil ; chaque objectif réussi est une page de l'album
const PHOTOS=[['feu_mont','Un Pixémon FEU sur le Mont Braise',m=>SP[m.sp].t==='FEU'&&G.map==='mont'],['omb_ecl','Une créature OMBRE pendant l\'éclipse',m=>SP[m.sp].t==='OMB'&&ecl()],
 ['eau_pluie','Une créature EAU sous la pluie',m=>SP[m.sp].t==='EAU'&&rain()],['lum_etoiles','Une créature LUMIÈRE une nuit d\'étoiles filantes',m=>SP[m.sp].t==='LUM'&&stars()],
 ['pic_aube','Une créature au Pic Céleste, à l\'aube',m=>G.map==='pic'&&phase()===0],['lac_lien','Une créature inséparable (lien max) au Lac Opalin',m=>G.map==='lac'&&bondLv(m)>=5],
 ['pla_bois','Une créature PLANTE au Bois Sépulcral, la nuit',m=>SP[m.sp].t==='PLA'&&G.map==='bois'&&night()],['temple','Une créature dans le Temple des Fondateurs',m=>G.map==='temple'],
 ['legend','Un légendaire au Sanctuaire du Cycle',m=>['solarion','nocturion','crepuscel','aurorelle','eclipsar'].includes(m.sp)&&G.map==='sanctuaire'],['chroma','Une créature aux couleurs rares',m=>!!m.sh],
 ['vivi','Un Vivipère évolué, là où il a grandi',m=>{const o={vivicendre:'mont',viviphyte:'bois',vivitron:'volterre',vividactyle:'galeries',vivisource:'lac'}[m.sp];return!!o&&G.map===o}],
 ['ele_volt','Une créature ÉLEC à Volterre, sous l\'orage',m=>SP[m.sp].t==='ELE'&&G.map==='volterre'&&rain()],['fossil','Un fossile ranimé, au grand air',m=>['fossilame','fougeron','stegofeuille','brachisylve'].includes(m.sp)&&!['in','cave','tech'].includes(MAPS[G.map].amb)],
 ['top','Une créature de niveau 80 ou plus',m=>m.lv>=80]];
const PHR=[[3,'biscuit',5],[6,'bandeau',1],[9,'megacapsule',5],[12,'pierreaube',1]];
ICO.camera=icon(["........",".oo.....","oooooooo","owwoowwo","owobbowo","owobbowo","owwoowwo","oooooooo"]);ICO.rod3=icon(["......oo",".....oyY","....oyYo","...oyYo.","..oyYo.o",".oyYo..o","oyYo...o","oYo...rr"]);
{const P0=photoTalk;photoTalk=async function(){if(!G.keys.camera){G.keys.camera=1;jingle('item');await say('Tu aimes les photos, toi aussi ? Tiens, prends mon vieil appareil. Je n\'en ai plus besoin, j\'ai le mien !','Photographe Lise',0,'girl');
  await say('Dans ton menu, PHOTO immortalise ta créature de tête. Mon album a des pages blanches : un FEU sur le Mont Braise, une OMBRE pendant l\'éclipse… Remplis-les et reviens me voir !','Photographe Lise',0,'girl');tip('photo','Nouveau : l\'APPAREIL PHOTO ! Menu, puis PHOTO. L\'album (Menu, puis CARNET) liste les clichés à réussir.')}
  const n=Object.keys(G.album||{}).length;for(const[k,it,q]of PHR)if(n>=k&&!f()['phr'+k]){f()['phr'+k]=1;give(it,q);await say(`${k} photos dans l'album ! Lise t'offre ${IT[it][0]} x${q}.`)}return P0()};
 for(const n of MAPS.port.npcs)if(n.fn===P0)n.fn=photoTalk}
async function takePhoto(){const m=G.party.find(alive);if(!m)return say('Personne à photographier…');if(['in','tech'].includes(MAPS[G.map].amb)&&G.map!=='temple')return say('Il fait trop sombre ici pour une belle photo.');
 sfx('shard');ui.flash=1;ui.flashC='#ffffff';await wait(250);G.album??={};const hit=PHOTOS.find(([k,,ok])=>!G.album[k]&&ok(m));
 if(hit){G.album[hit[0]]={sp:m.sp,map:G.map,ph:phase(),sh:!!m.sh,d:dayN()};bondUp(m,2);await say(`Clic ! Nouvelle page de l'album : « ${hit[1]} » — avec ${nm(m)} ! (${Object.keys(G.album).length}/${PHOTOS.length})`);rep('cher',1);achCheck();save()}
 else await say(`Clic ! Une jolie photo de ${nm(m)}. Elle ne remplit aucune page de l'album, mais elle ira dans ton carnet de souvenirs.`)}

// --- Pêche 10.0 : mini-jeu de ferrage, Méga Canne, carnet de prises
const FISH3={lac:[['gupflamme',36,40,40],['dragonagi',45,48,6],['medulune',38,42,20,'s'],['axoluce',36,40,34]],recif:[['squalame',46,50,20],['hectapieuvre',44,48,30],['abyssombre',48,52,10],['requinuit',44,48,30,'n']],
 port:[['lanterfin',40,44,40],['abyssombre',46,50,15],['tornalis',46,50,10],['dauphinou',40,44,35]],route2:[['miroitruite',38,42,40],['brumelle',38,42,30],['tornalis',44,48,8],['nuageon',38,42,22]],lunevie:[['lanterfin',40,44,30],['galaxelle',40,44,10,'s'],['miroitruite',38,42,40]]};
for(const[k,T]of Object.entries(FISH3))if(MAPS[k])MAPS[k].fish3=T;
MAPS.lunevie.fish??=[['miroitruite',18,22,40],['tetardin',16,20,40],['nebulin',22,26,15,'s']];
fish=async function(){if(!G.keys.rod)return say('L\'eau est claire… Avec une canne à pêche, on pourrait y attraper quelque chose.');if(!G.party.some(alive))return say('Ton équipe est trop fatiguée pour pêcher.');
 const M=MAPS[G.map],R3=G.keys.rod3&&M.fish3,T0=R3&&Math.random()<.6?M.fish3:G.keys.rod2&&M.fish2&&Math.random()<.5?M.fish2:M.fish,e=pickEnc(T0.filter(encOk).length?T0:M.fish);
 const rare=SP[e[0]].cr<=45||e[4]==='s';ui.bob={x:G.x+DX[G.dir],y:G.y+DY[G.dir],t0:now(),bite:0};sfx('splash');show(`Tu lances ta ${G.keys.rod3?'Méga Canne':G.keys.rod2?'Super Canne':'canne'}… Attends le signal !`);
 let k=await key(1300+Math.random()*2600);if(k!=='t'){ui.bob=null;ui.text=null;return say('Trop tôt ! Le poisson s\'est méfié.')}
 ui.bob.bite=now();sfx('alert');show(rare?'Ça mord fort ! Arrête le curseur dans la zone verte !':'Ça mord ! Arrête le curseur dans la zone verte !');
 const w=rare?.16:.26,z0=.15+Math.random()*(.7-w),sp=rare?1.25:.9;ui.fishBar={t0:now(),w,z0,sp};k=await key(4200);const fb=ui.fishBar;ui.fishBar=null;ui.bob=null;ui.text=null;
 const p=fb?fishPos(fb):0;if(k!=='a'||p<fb.z0||p>fb.z0+fb.w)return say(k==='t'?'Il s\'est décroché…':'Raté ! La ligne a cassé net.');
 ST10().fish++;msEvt('fish');if(!FSP()[e[0]]){FSP()[e[0]]=1;rep('peche',1)}await battle([mon(e[0],rnd(e[1],e[2]),{wild:1})],{fish:1})};
const fishPos=fb=>{const t=(now()-fb.t0)/1000*fb.sp;return(1-Math.cos(t*Math.PI))/2};
function drawFishBar(){const fb=ui.fishBar,x=W/2-110,y=86,w=220;panel(x-10,y-10,w+20,52);rr(x,y,w,16,2,C.ink);R(X,'#4a6a8a',x+2,y+2,w-4,12);R(X,'#4cc46a',x+2+(w-4)*fb.z0,y+2,(w-4)*fb.w,12);R(X,'#a8f0b0',x+2+(w-4)*fb.z0,y+2,(w-4)*fb.w,2);
 const p=fishPos(fb),cx=x+2+(w-4)*p;R(X,C.ink,cx-3,y-4,6,24);R(X,'#ffffff',cx-2,y-3,4,22);txt('A : FERRER',W/2,y+32,C.ink2,{mini:1,al:'c'})}
const draw0=draw;draw=function(t){draw0(t);if(ui.fishBar)drawFishBar();if(G?.opt?.calm){ui.shake=0;if(ui.flash>.3)ui.flash=.3;if(B)B.shake=0}};
async function ondineTalk(){const O='Ondine',n=Object.keys(FSP()).length;
 if(!f().ondine0){f().ondine0=1;await say('Une visiteuse ! Je suis Ondine, gardienne du Lac Opalin. Je recense tout ce qui nage en Aurélys.',O,0,'girl');await say('Fais-moi une faveur : pêche au moins cinq espèces différentes, n\'importe où. Je tiens un registre, et il est vide depuis l\'hiver.',O,0,'girl')}
 if(!f().ondine1){if(n<5)return say(`Ton carnet de pêche : ${n} espèce${n>1?'s':''} sur 5. Essaie la mer, les rivières, le lac… et la nuit, ça change tout.`,O,0,'girl');
  f().ondine1=1;G.keys.rod3=1;jingle('item');ui.pop={ic:ICO.rod3,t0:now()};await say('Cinq espèces ! Tu as l\'œil. Tiens, ma MÉGA CANNE. Elle descend plus profond que toutes les autres, là où vivent les plus grands.',O,0,'girl');
  await say('Avec elle, le ferrage est plus dur : il faut arrêter le curseur dans la zone verte. Les poissons rares tirent fort !',O,0,'girl');rep('peche',3);rep('port',2);return save()}
 if(!f().ondine2){if(n<15)return say(`Le registre progresse : ${n} espèces sur 15. Avec la Méga Canne, essaie le Récif des Marées et le port.`,O,0,'girl');f().ondine2=1;give('megacapsule',5);give('dc_cascade');await say('Quinze espèces ! Mon registre n\'a jamais été aussi beau. Prends ces 5 Méga Capsules et ce disque.',O,0,'girl');rep('peche',4);return save()}
 if(!f().ondine3){if(!G.party.some(m=>m.sp==='dragonagi'))return say('Il me reste un rêve : voir un Dragonagi. Un Gupflamme qui a remonté toutes les cascades… On dit qu\'il vit au fond de ce lac. Montre-m\'en un, un jour.',O,0,'girl');
  f().ondine3=1;give('maxpotion',3);give('eaumystique');await say('Un Dragonagi… Il est encore plus beau que dans les livres. Merci, merci ! Prends ça, et reviens pêcher quand tu veux.',O,0,'girl');rep('peche',4);return save()}
 return say(['Le lac est calme aujourd\'hui. Les Axoluce dorment au fond.','Les nuits d\'étoiles filantes, les Médulune montent à la surface. Jette ta ligne près de l\'îlot.','Mon registre compte '+n+' espèces grâce à toi.'][dayN()%3],O,0,'girl')}

// --- Objets du monde 10.0 (stèles, lanternes, coffres, notes, cadran, statues, feux des phases)
const drawObj0=drawObj;drawObj=function(k,sx,sy,t,n){
 if(k==='stele'){const lit=n&&f()['st_'+n.sid];X.drawImage(SHD2,sx+4,sy+24,26,8);R(X,C.ink,sx+7,sy-4,18,32);R(X,'#8a8a9a',sx+8,sy-3,16,30);R(X,'#a8a8b8',sx+8,sy-3,16,3);R(X,'#6a6a7a',sx+22,sy-3,2,30);
  for(let i=0;i<5;i++)R(X,lit?'#8ae8ff':'#5a5a6a',sx+11+(i%2)*4,sy+2+i*5,6,2);if(lit)glowAt(sx+16,sy+10,20,.18+.06*Math.sin(t/300));return}
 if(k==='lantern'){const on=n&&(f().bLant||(f().bLantL||[]).includes(n.lid)),col=['#ff9ab8','#ffd860','#ff8a3a','#6a8aff'][n?.lid||0];X.drawImage(SHD2,sx+8,sy+26,18,6);R(X,C.ink,sx+15,sy+8,3,22);R(X,C.ink,sx+9,sy-2,15,13);R(X,'#3a3a4a',sx+10,sy-1,13,11);
  if(on){R(X,col,sx+12,sy+1,9,7);glowAt(sx+16,sy+4,26,.4+.12*Math.sin(t/180))}else R(X,'#1a1a24',sx+12,sy+1,9,7);return}
 if(k==='chest'){const open=n&&(n.fn&&((G.map==='crypte'&&f().cryC)||(G.map==='galeries'&&f().galC)));X.drawImage(SHD2,sx+4,sy+24,26,8);R(X,C.ink,sx+4,sy+10,24,18);R(X,'#8a5a2a',sx+5,sy+11,22,16);R(X,'#c8963a',sx+5,sy+17,22,2);R(X,open?'#2a1a10':'#a86a32',sx+5,sy+11,22,5);R(X,'#ffd860',sx+14,sy+16,4,4);return}
 if(k==='note'){R(X,C.ink,sx+9,sy+14,15,12);R(X,'#f4ead2',sx+10,sy+15,13,10);for(let i=0;i<3;i++)R(X,'#8a80a6',sx+12,sy+17+i*3,9,1);return}
 if(k==='dial'){X.drawImage(SHD2,sx+2,sy+24,28,8);R(X,C.ink,sx+3,sy+6,26,22);R(X,'#a89878',sx+4,sy+7,24,20);const a=(tPh()/4)*Math.PI*2-Math.PI/2;for(let i=0;i<4;i++){const b=i/4*Math.PI*2-Math.PI/2;R(X,FIREC[i],sx+15+Math.round(Math.cos(b)*8),sy+16+Math.round(Math.sin(b)*7),3,3)}
  R(X,C.ink,sx+15+Math.round(Math.cos(a)*5),sy+16+Math.round(Math.sin(a)*4),3,3);R(X,C.ink,sx+15,sy+16,3,3);return}
 if(k==='statue'){X.drawImage(T2('statue')||T2('stoneStatue'),sx,sy-32);return}
 if(k==='fire'){const on=n&&f()['fire'+n.fid],c=FIREC[n?.fid||0];X.drawImage(SHD2,sx+4,sy+24,26,8);R(X,C.ink,sx+6,sy+16,20,12);R(X,'#6a6a7a',sx+7,sy+17,18,10);R(X,'#8a8a9a',sx+7,sy+17,18,2);
  if(on){const fl=Math.sin(t/90)*2;R(X,c,sx+10,sy+6+fl,12,11);R(X,'#ffffff',sx+14,sy+10+fl,4,5);glowAt(sx+16,sy+10,30,.45+.1*Math.sin(t/150))}else R(X,'#3a3a4a',sx+10,sy+14,12,3);return}
 return drawObj0(k,sx,sy,t,n)};
Object.assign(OBJ,{stele:'Une stèle couverte de runes.',lantern:'Une lanterne.',chest:'Un coffre.',note:'Un carnet.',dial:'Un cadran.',statue:'Une statue.',fire:'Une vasque.'});

// --- Carnet : succès, relations, collections, chroniques, album, statistiques
async function carnet(){const T=[['SUCCÈS',ICO.star],['VILLES',ICO.heart],['TRÉSORS',ICO.shard],['ALBUM',ICO.camera],['RÉCITS',ICO.book],['STATS',ICO.dex]];let tab=0,sc=0;
 const rows=()=>{const F=f();if(tab===0)return ACH.map(([id,n,d,,rw])=>[G.ach?.[id]?ICO.star:silh(ICO.star,'#b8b0c8'),n,`${d} Récompense : ${IT[rw[0]][0]} x${rw[1]}.`,!!G.ach?.[id]]);
  if(tab===1)return Object.keys(REPN).map(k=>{const l=repLv(k),v=G.rep?.[k]||0,nx=REPT[l+1];return[ICO.heart,`${REPN[k]} — ${REPL[l]}`,`Niveau ${l}/4. ${nx?`Prochain palier : ${v}/${nx}.`:'Palier maximal !'} ${l>=2&&!['cher','peche'].includes(k)?`Réduction en boutique : ${[0,0,5,10,15][l]} %.`:''}`,l>=4]});
  if(tab===2){const pg=[1,2,3,4].filter(i=>F['pg_'+i]).length;return[[ICO.book,`Stèles des Fondateurs : ${nStele()}/8`,'Huit pierres gravées racontent l\'origine du Cycle.',nStele()>=8],[ICO.book,`Pages du journal de Valen : ${pg}/4`,'Dispersées dans les Ruines du Mont Braise.',pg>=4],
   [ICO.shard,`Éclats d'Aube : ${G.keys.shards||0}`,'L\'Ermite Lumen enseigne une capacité contre chaque groupe d\'éclats.',(G.keys.shards||0)>=10],[ICO.moon,`Larmes du Cycle : ${F.amuC?'Amulette forgée':(G.keys.larmes||0)+'/6 + '+(G.keys.larmeS?1:0)+'/1'}`,'Elles n\'apparaissent que pendant l\'éclipse.',!!F.amuC],
   [ICO.fossile,`Fossiles ranimés : ${['fossilame','fougeron'].filter(k=>G.dex[k]===2).length}/2`,'Fossile Ancien (Coteaux) et Fossile Feuille (Galeries).',['fossilame','fougeron'].every(k=>G.dex[k]===2)],
   [ICO.dc_abri,`Disques Cycle : ${DISCS.filter(m=>G.bag['dc_'+m]).length}/${DISCS.length}`,'Vendus à Volterre, ou cachés dans les nouveaux lieux.',DISCS.every(m=>G.bag['dc_'+m])],
   [ICO.rod,`Carnet de pêche : ${Object.keys(FSP()).length} espèces`,`${G.keys.rod3?'Méga Canne':G.keys.rod2?'Super Canne':G.keys.rod?'Canne':'Pas de canne'}. ${ST10().fish} prises ferrées.`,Object.keys(FSP()).length>=15],
   [ICO.flame||ICO.sun,`Feux des phases : ${[0,1,2,3].filter(i=>F['fire'+i]).length}/4`,'Sur le Pic Céleste, chacun s\'allume à son heure.',[0,1,2,3].every(i=>F['fire'+i])],
   [ICO.star,`Légendaires et mythiques : ${['solarion','nocturion','crepuscel','aurorelle','eclipsar','presagelle','heliote','seleniote','errenard','masquaserp'].filter(k=>G.dex[k]===2).length}/10`,'Chacun a son histoire, et son heure.',false]]}
  if(tab===3)return PHOTOS.map(([k,d])=>{const a=G.album?.[k];return[a?monSpr(a.sp,0,48,a.sh):silh(ICO.camera,'#b8b0c8'),d,a?`${SP[a.sp].name} · ${MAPS[a.map].name.split(' · ')[0]} · ${PHN[a.ph]}`:'Page blanche.',!!a]});
  if(tab===4){const L=STELES.map(([m,,,s],i)=>F['st_'+i]?[ICO.book,`Stèle ${i+1} — ${MAPS[m].name.split(' · ')[0]}`,s,true]:[silh(ICO.book,'#b8b0c8'),`Stèle ${i+1}`,'Non déchiffrée.',false]);
   for(const k of Object.keys(DOCS))if(F['doc_'+k])L.push([ICO.book,'Document de la Centrale',DOCS[k],true]);if(F.galC||F.gastonQ)L.push([ICO.book,'Carnets des Galeries','Caïus cherchait l\'ombre sous la mer ; Vex refusait de creuser une tombe ; Sélène a refusé de le suivre.',true]);return L}
  const S=ST10();return[[ICO.dex,`Pixédex : ${DEX.filter(k=>G.dex[k]>0).length} vues · ${caught()} capturées`,`Sur ${DEX.length} espèces connues.`,caught()>=DEX.length],[ICO.capsule,`Captures : ${S.cap}`,`La nuit : ${S.capN} · Sous la pluie : ${S.capR} · Éclipse : ${S.capE} · Étoiles : ${S.capS} · Chromatiques : ${S.shiny}`,false],
   [ICO.star,`Évolutions : ${S.evo}`,`Combats de dresseurs gagnés : ${S.trW}. Missions accomplies : ${G.ms?.done||0}.`,false],[ICO.coin,`Fortune : ${G.money} pièces`,`Baies récoltées : ${S.berry}. Temps de jeu : ${fmtT(G.play)}.`,false],
   [ICO.flag,`Quêtes secondaires terminées : ${sideDone()}`,`Succès : ${Object.keys(G.ach||{}).length}/${ACH.length}.`,false]]};
 const VIS=6;ui.panel=()=>{panel(8,8,464,304);T.forEach(([n,ic],i)=>{const x=16+i*76;rr(x,14,74,22,2,i===tab?C.acc:C.paper2);X.drawImage(ic,x+4,17,16,16);txt(n,x+22,30,i===tab?'#ffffff':C.ink,{mini:1,sh:0})});
  const L=rows();R(X,C.paper2,20,42,440,2);L.slice(sc,sc+VIS).forEach(([ic,t,s,ok],i)=>{const y=50+i*40;if(ic){const big=ic.width>24;X.drawImage(ic,big?18:24,y+(big?-6:4),big?40:16,big?40:16)}txt(t,62,y+14,ok?C.green:C.ink,{s:1.5});wrap(s,390,1).slice(0,2).forEach((l,j)=>txt(l,62,y+25+j*9,C.ink2,{s:1,sh:0}))});
  txt(`${sc+1}-${Math.min(L.length,sc+VIS)} / ${L.length}   GAUCHE/DROITE : ONGLET - HAUT/BAS : DEFILER - B : FERMER`,456,300,C.mute,{mini:1,al:'r'})};
 for(;;){const k=await key(),n=rows().length;if(k==='left'||k==='right'){tab=(tab+(k==='right'?1:T.length-1))%T.length;sc=0;sfx('sel')}else if(k==='down'){if(sc+VIS<n){sc++;sfx('sel')}}else if(k==='up'){if(sc>0){sc--;sfx('sel')}}else if(k==='a'||k==='b')break}ui.panel=null}
// Menu pause : CARNET (et PHOTO quand on a l'appareil)
pauseMenu=async function(){for(;;){ui.panel=drawCard;const O=[['ÉQUIPE',ICO.team],...(G.keys.dex?[['PIXÉDEX',ICO.dex]]:[]),['SAC',ICO.bag],['CARTE',ICO.map],...(G.keys.sablier?[['SABLIER',ICO.sablier]]:[]),...(G.keys.camera?[['PHOTO',ICO.camera]]:[]),['JOURNAL',ICO.book],...(f().starter?[['CARNET',ICO.star]]:[]),...(G.cin&&Object.keys(G.cin).length?[['CINÉMAS',ICO.ecl]]:[]),['GUIDE',ICO.guide],['SAUVER',ICO.save],['OPTIONS',ICO.gear],['TITRE',ICO.home],['FERMER',ICO.close]];
 const i=await choose(O.map(o=>o[0]),{x:W-162,y:8,w:154,rh:O.length>9?24:26,vis:10,icons:O.map(o=>o[1])});ui.panel=null;const k=O[i]?.[0];
 if(i<0||k==='FERMER')return;if(k==='ÉQUIPE')await teamMenu();if(k==='PIXÉDEX')await dexMenu();if(k==='SAC')await bagMenu(false);if(k==='JOURNAL')await journal();if(k==='CARNET')await carnet();if(k==='PHOTO'){await takePhoto();return}
 if(k==='SAUVER')await say(save()?'Partie sauvegardée !':'Impossible de sauvegarder dans ce navigateur.');
 if(k==='CARTE'&&await regionMap())return;if(k==='CINÉMAS')await cinemaMenu();if(k==='GUIDE')await guide();if(k==='SABLIER'){ui.panel=null;await useSablier()}if(k==='OPTIONS')await options();
 if(k==='TITRE'&&await ask('Retourner à l\'écran titre ? La progression non sauvegardée sera perdue.')){await fadeTo(1,300);return titleScreen()}}};
// Options : animations réduites (accessibilité)
{const OP0=options;options=async function(){const o=G.opt;const i=await choose([`DIFFICULTÉ : ${f().expert?'EXPERT':'NORMALE'}`,`ANIMATIONS : ${o.calm?'RÉDUITES':'NORMALES'}`,`FLÈCHE-GUIDE : ${o.guide!==0?'OUI':'NON'}`,`RENCONTRES : ${o.encV!==0?'VISIBLES':o.enc?'RARES':'CLASSIQUES'}`,`COURSE : ${(o.run??(TOUCH?1:0))?'TOUJOURS':'AVEC B'}`,'AUTRES OPTIONS…','RETOUR'],{x:W-308,y:8,w:300,title:'Options',info:j=>({s:['EXPERT : des dresseurs plus forts, pour les joueurs aguerris.','RÉDUITES : moins de secousses et d\'effets à l\'écran.','Une flèche dorée montre le chemin vers l\'objectif de l\'histoire.','VISIBLES : les créatures se promènent à découvert, tu choisis tes combats. CLASSIQUES : rencontres-surprises dans les herbes. RARES : surprises bien moins fréquentes.','TOUJOURS : tu cours sans rien tenir (B pour marcher). AVEC B : maintiens B pour courir.','Son, musique, effets, compagnon, vitesse du texte et des combats.','Fermer les options.'][j]})});if(i===0){await difficulty();return options()}if(i===1){o.calm=o.calm?0:1;save();return options()}if(i===2){o.guide=o.guide!==0?0:1;save();return options()}if(i===3){if(o.encV!==0){o.encV=0;o.enc=0}else if(!o.enc)o.enc=1;else{o.encV=1;o.enc=0}save();faunaSpawn(G.map);return options()}if(i===4){o.run=(o.run??(TOUCH?1:0))?0:1;save();return options()}if(i===5)return OP0()}}

// --- Sauvegardes : migration vers la 10.0 (aucune donnée perdue, nouveaux champs créés à la volée)
const norm0=normalize;normalize=function(g){g=norm0(g);if(!g)return g;g.rep??={};g.ach??={};g.album??={};g.fishSp??={};g.stat??={cap:0,capN:0,capR:0,capE:0,capS:0,shiny:0,evo:0,fish:0,berry:0,win:0,trW:0};g.mail??=[];
 if(g.v<10){g.wn=1;g.v=10}return g};
const newGame0=newGame;
// Nouveautés 10.0
NEWS.splice(0,NEWS.length,[()=>ICO.dex,'76 nouvelles espèces','146 Pixémons ! Évolutions par lieu, météo, éclipse, étoiles, objet tenu ou capacité. Vivipère prend la forme de son monde.'],
 [()=>ICO.map,'Six nouveaux lieux','Lac Opalin, Bois Sépulcral (la nuit), Galeries Oubliées, Récif des Marées, Temple des Fondateurs, Pic Céleste.'],
 [()=>ICO.book,'Les Stèles des Fondateurs','Huit fragments racontent l\'origine du Cycle… et ouvrent un temple sous la mer. Aurorelle, Éclipsar, Masquaserp, Errenard.'],
 [()=>ICO.star,'Carnet, succès et réputation','42 succès récompensés, 7 réputations, collections, chroniques, statistiques, album photo.'],
 [()=>ICO.rod,'Pêche et Méga Canne','Mini-jeu de ferrage, carnet de prises, concours d\'Ondine au Lac Opalin.'],
 [()=>ICO.bag,'Combat approfondi','40 capacités (Abri, Vampigraine, Lame du Cycle…), 21 talents, ciels Orage et Étoiles, Disques Cycle, nouvelles capsules.'],
 [()=>ICO.trophy||ICO.star,'Le Conseil du Cycle','Au sommet du Pic Céleste, quatre maîtres des phases et un dernier adversaire. Défis Mono-type à Volterre.']);
