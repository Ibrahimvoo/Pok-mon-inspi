// =====================================================================
// 19 — DES COMBATS QUI COMPTENT
// - EXP à l'échelle : battre plus faible que soi rapporte peu, battre plus fort rapporte beaucoup (plus de sur-niveau, plus de farm).
// - Dresseurs ordinaires jamais ridiculement faibles face à ton équipe (sans dépasser le plafond de l'histoire).
// - Dresseurs de route = DÉFIS : une règle (Express, Duel, Sans Objet, météo, Combat Inversé…), une vraie récompense, et le droit
//   de refuser. Les apprentis des arènes livrent un conseil sur leur Champion. Sbires, rivaux et boss restent incontournables.
// - Boss : répliques et retournements en plein combat (entrée de la créature maîtresse, dernier souffle).
// - Défaite : analyse claire de ce qui n'a pas marché + conseil, 10 % de l'argent seulement, et RÉESSAYER sur place.
// =====================================================================
// --- EXP à l'échelle (formule « à la 5e génération ») + un peu plus pour les vrais combats
// Plafond souple : au-delà du niveau des grands combats à venir, l'EXP ralentit fortement (mais ne s'arrête pas).
{const gx19=gainXp;gainXp=function(m,n,q){if(B?.foe&&m&&n>0&&!B.coop&&!B.pvp){const Lf=B.foe.lv,Lm=m.lv,k=Math.pow((2*Lf+10)/(Lf+Lm+10),2.5)*(B.tr?1.25:1);n=n*Math.max(.15,Math.min(1.8,k));
  const cap=lvCap();if(!f().expert&&cap<100)n*=Lm>=cap+3?.1:Lm>=cap?.3:1;n=Math.max(1,Math.round(n))}return gx19(m,n,q)}}
// Niveaux conseillés / plafonds de l'histoire, alignés sur les vrais Champions et boss
lvBand=function(){const g=f();if(!g)return[5,100];if(g.balance)return[45,100];
 return!g.starter?[5,6]:!g.badge?[11,14]:!g.mine||!g.rival2?[14,16]:!g.boss?[16,18]:!g.portScene?[18,21]:!g.badge2?[22,25]:!g.kael3?[24,26]:!g.volArr?[25,27]
  :!g.baseDone?[27,29]:!g.badge4?[29,31]:!g.obsScene&&!g.v18arr?[31,33]:!g.obsScene&&!g.badge5?[33,35]:!g.obsScene&&!g.v18done?[34,36]:[35,37]};
// --- Plancher de niveau des dresseurs ordinaires : jamais plus de 3 niveaux sous ta meilleure créature (plafond de l'histoire respecté)
const trFloor19=()=>Math.min(lvCap(),lvTop()-3);
// --- Défis des dresseurs : [règle, paramètre, récompense, quantité, conseil sur le Champion]
const CH19={leo:['aucun',0,'capsule',3],lina:['duel',0,'baiesoin',2],
 bob:['sansobjet',0,'superpotion',2,'Brasia ouvre avec Rocaillon et garde Rocaroc pour la fin. Le ROC encaisse les coups… mais l\'EAU et la PLANTE le font fondre.'],
 zoe:['express',6,'pierredure',1,'Rocaroc est lent comme une montagne. Frappe le premier, et vise ses points faibles : EAU, PLANTE.'],
 nina:['express',5,'grainemiracle',1],iris:['inverse',0,'baieprisme',3],hugo:['soleil',0,'charbon',1],jade:['pluie',0,'eaumystique',1],celeste:['eclipse',0,'poudretoile',1],
 loic:['sansobjet',0,'superpotion',3,'Maëlle fait tomber la pluie sur toute l\'arène : ses attaques EAU cognent fort. L\'ÉLEC et la PLANTE sont ses cauchemars.'],
 ana:['duel',0,'aimant',1,'Sous la pluie, le FEU ne vaut presque rien. Laisse tes créatures FEU au repos contre Maëlle.'],
 remi:['express',6,'supercapsule',3],ambre:['soleil',0,'baieprisme',3],basile:['sansobjet',0,'pierrelune',1],
 veil1:['duel',0,'encensnoir',1,'Orane combat dans le noir : FEU, ÉLEC et LUMIÈRE éclairent son terrain. Ses créatures OMBRE craignent la LUMIÈRE.'],
 veil2:['express',6,'crepuscapsule',3,'Le terrain d\'Orane bascule entre soleil et ombre à chaque tour. Garde une créature pour chaque moitié du cycle.'],
 vt1:['sansobjet',0,'hyperpotion',2,'Sur le Terrain Volt d\'Ambroise, les attaques ÉLEC ne ratent jamais. Une créature ROC les arrête net.'],
 vt2:['express',4,'lunettes',1,'Orageon, l\'atout d\'Ambroise, frappe vite et fort. Ralentis-le (paralysie) ou mise sur le ROC.'],
 vt3:['duel',0,'elixir',2,'Ambroise ouvre avec des créatures rapides mais fragiles. Une attaque ROC bien placée suffit souvent.'],
 lacp1:['pluie',0,'superpotion',3],lacp2:['inverse',0,'hypercapsule',2],lacp3:['soleil',0,'baieprisme',4],boisp1:['eclipse',0,'sombrecapsule',3],boisp2:['express',5,'filetcapsule',3],
 galp1:['duel',0,'casque',1],galp2:['sansobjet',0,'coquille',1],recp1:['pluie',0,'filetcapsule',2],recp2:['inverse',0,'pepite',1],temp1:['eclipse',0,'hypercapsule',3],
 picp1:['express',5,'maxpotion',2],picp2:['duel',0,'bandeau',1],picp3:['inverse',0,'rappelmax',1],
 r3a:['soleil',0,'superpotion',3],r3b:['sansobjet',0,'pierreorage',1],r3c:['express',5,'hyperpotion',2],r3d:['duel',0,'mouchoir',1],r3e:['eclipse',0,'rapidecapsule',3],
 cpa:['inverse',0,'festicapsule',3],cpb:['duel',0,'barbapapa',3],dua:['soleil',0,'eauoasis',3],dub:['express',5,'sablecapsule',3],duc:['sansobjet',0,'pierresable',1],
 maa:['pluie',0,'baiesoin',4],mab:['inverse',0,'filetcapsule',3],mac:['express',5,'ruban',1],coa:['duel',0,'orbe',1],cob:['soleil',0,'granita',3],coc:['pluie',0,'maxpotion',1],
 g5a:['inverse',0,'festicapsule',2,'Arlequin adore les illusions : ses créatures changent de rôle en plein spectacle. Garde des réponses variées.'],
 g5b:['duel',0,'pommamour',2,'Le grand final d\'Arlequin, c\'est Masquetotem. Il encaisse beaucoup : prévois de quoi tenir la distance.']};
const RULE19={aucun:['Combat amical',''],express:['Défi Express','Gagne en {n} tours ou moins.'],duel:['Défi Duel','Gagne avec une seule de tes créatures, sans en changer.'],
 sansobjet:['Défi Sans Objet','Gagne sans utiliser le Sac.'],pluie:['Combat sous la pluie','EAU x1,5, FEU x0,5 pendant tout le combat.'],soleil:['Combat au zénith','FEU et LUMIÈRE x1,5, EAU x0,5 pendant tout le combat.'],
 eclipse:['Combat dans l\'ombre','OMBRE x1,5 pendant tout le combat.'],inverse:['Combat Inversé','Les faiblesses deviennent des résistances, et inversement !']};
const ch19Txt=C=>{const[t,d]=RULE19[C[0]];return(t+(d?' : '+d.replace('{n}',C[1]):'.'))};
{const tb19=trainerBattle;trainerBattle=async function(n){const tr=n?.tr,C=tr&&CH19[tr.id];if(!C||f()['t_'+tr.id])return tb19(n);
 if(typeof SCX!=='undefined'&&SCX&&!SCX.lead){tr.ch19=C;try{return await tb19(n)}finally{delete tr.ch19}}   // scène d'un ami (aventure à plusieurs) : on le rejoint sans redemander
 await say(tr.pre,tr.name,0,n.t);await say(`${ch19Txt(C)} Récompense : ${IT[C[2]][0]}${C[3]>1?' x'+C[3]:''}.`,tr.name,0,n.t);
 if(!await ask(`Relever le défi ? (${IT[C[2]][0]}${C[3]>1?' x'+C[3]:''})`,tr.name)){n.los=0;await say('Pas de souci ! Reviens me voir quand tu veux.',tr.name,0,n.t);return null}
 const pre=tr.pre,fl=tr.field;tr.pre=['C\'est parti !','En garde !','Voyons ce que tu vaux !'][rnd(0,2)];if(C[0]!=='aucun'&&!fl)tr.field='r19'+C[0];tr.ch19=C;
 try{return await tb19(n)}finally{tr.pre=pre;tr.field=fl;delete tr.ch19}}}
// Règles appliquées au début du combat (via le terrain d'arène)
let INV19=null;
function inv19On(){if(INV19)return;INV19={};for(const a of Object.keys(TY)){INV19[a]=EF[a]?{...EF[a]}:null;const r={};for(const d of Object.keys(TY)){const v=EF[a]?.[d]??1;if(v!==1)r[d]=v>1?.5:2}EF[a]=r}}
function inv19Off(){if(!INV19)return;for(const a of Object.keys(INV19)){if(INV19[a])EF[a]=INV19[a];else delete EF[a]}INV19=null}
{const af19=arenaField;arenaField=async function(k){if(typeof k!=='string'||!k.startsWith('r19'))return af19(k);const r=k.slice(3),C=B?.tr?.ch19;
 const fx={pluie:['rain','#4a8ad8'],soleil:['sun','#e0a820'],eclipse:['eclipse','#7050a0']}[r];sfx('shard');
 if(fx){B.sky={k:fx[0],n:99};ui.flash=.5;ui.flashC=fx[1];return say(SKY[fx[0]][2],0,1)}
 if(r==='inverse'){inv19On();ui.flash=.6;ui.flashC='#ff8ad8';return say('Combat Inversé ! Les faiblesses deviennent des résistances, et inversement. Les immunités tombent !',0,1)}
 ui.flash=.3;ui.flashC='#ffd23a';return say(C?ch19Txt(C):'Défi !',0,1)}}
// --- Suivi du combat (pour les défis et l'analyse de défaite)
{const so19=sendOut;sendOut=async function(...a){if(B){(B.u19??=new Set()).add(B.me)}return so19.apply(this,a)}}
{const um19=useMove;useMove=async function(s,id){try{if(B&&id&&MV[id]){const A=(B.a19??={me:[],foe:[],slow:0,turns:0,st:0}),v=MV[id];
  if(s===0){A.turns++;if(spdOf(B.me,0)<spdOf(B.foe,1))A.slow++;if(v.p)A.me.push(eff(v.t,SP[B.foe.sp].t))}else if(v.p)A.foe.push([v.t,eff(v.t,SP[B.me.sp].t)])}}catch(e){}
 return um19.apply(this,arguments)}}
// --- Boss : répliques et retournements en plein combat
const PH19=[
 [t=>t.name==='Championne Brasia',['Rocaroc ! Montre-lui ce qu\'est un vrai rempart !','def'],['Tu tiens bon… La roche s\'use, mais elle ne cède pas si facilement !'],'Brasia : créatures ROC, très résistantes. L\'EAU et la PLANTE les font fondre ; le FEU et le NORMAL rebondissent dessus.'],
 [t=>t.name==='Lieutenant Corvin',['Magmor, fais chauffer la galerie !','sun'],['Pas question de rentrer bredouille devant le chef !'],'Corvin : OMBRE, ROC puis Magmor (FEU), qui fait monter la chaleur. Garde une créature EAU ou ROC pour la fin.'],
 [t=>t.name==='Kael'&&t.money===800,['On s\'est entraînés jour et nuit, mon partenaire et moi !','atk'],['Pas encore… Je refuse de perdre contre toi !'],'Kael : son partenaire a l\'avantage sur ta créature de départ. Fais-le affronter par une autre créature.'],
 [t=>t.name==='Kael'&&t.money>800,['Regarde bien ! C\'est pour Valen que je deviens plus fort !','atk'],['Encore ! Je n\'ai pas dit mon dernier mot !'],'Kael : une équipe variée, menée par son partenaire. Prépare une réponse à chacun de ses types.'],
 [t=>t.name==='Chef Vex',['Regarde bien. Voilà ce que la nuit a de plus noir.','eclipse'],['…Tu crois défendre le soleil. Tu ne sais même pas ce qu\'il a coûté.'],'Vex : créatures OMBRE, et une éclipse qui les renforce. La LUMIÈRE dissipe l\'éclipse et frappe fort l\'OMBRE.'],
 [t=>t.name==='Admin Sélène',['Je ne me bats pas pour Vex. Je me bats pour ce qu\'il était.','spd'],['Tu as de la lumière dans les yeux… Comme lui, avant.'],'Sélène : OMBRE et FEU, rapides. Un statut (paralysie, sommeil) la ralentit beaucoup.'],
 [t=>t.name==='Championne Maëlle',['La marée monte ! Emporte tout !','spd'],['Valen disait que la mer ne cède jamais. Prouve-lui le contraire !'],'Maëlle : EAU sous une pluie permanente. L\'ÉLEC et la PLANTE font mouche ; le FEU est inutile ici.'],
 [t=>t.name==='Commandant Orso',['Turbines à plein régime !','atk'],['Si ça saute, tout Volterre saute avec !'],'Orso : une équipe ÉLEC et OMBRE. Le ROC bloque l\'électricité.'],
 [t=>t.name==='Champion Ambroise',['Orageon ! Fais trembler les plombs !','atk'],['Ha ! Ça, c\'est du courant !'],'Ambroise : ÉLEC sur Terrain Volt (ses éclairs ne ratent jamais). Le ROC est ta meilleure défense.'],
 [t=>t.name==='Arlequin',['Mesdames et messieurs… le clou du spectacle !','spd'],['Le public t\'adore… je déteste ça.'],'Arlequin : des créatures très différentes et Masquetotem, très solide, pour finir. Varie tes attaques.'],
 [t=>t.name==='Couturière Faustine',['Chaque fil a sa place. Toi, tu n\'en as aucune.','def'],['Mes coutures… Elles lâchent ?!'],'Faustine : des créatures défensives. Les statuts (poison, brûlure) usent ses murs.'],
 [t=>t.name==='Championne Orane',['Dans le noir, on ne voit que ce qui brille.','atk'],['Ta lumière ne vacille pas. Bien.'],'Orane : OMBRE et LUMIÈRE sur un terrain qui bascule à chaque tour. Change de créature avec le cycle.'],
 [t=>t.name==='Vex',['Nocturion… prête-moi ta colère !','eclipse'],['Valen ! Regarde-moi ! Ce n\'est pas toi, ça !','kael'],'Vex : OMBRE sous éclipse. La LUMIÈRE dissipe l\'éclipse ; garde ton Éveil pour son dernier atout.'],
 [t=>t.name==='Valen',['Brume aurait aimé ce combat.','spd'],['Encore un peu… Montre-moi jusqu\'où tu vas.']],
 [t=>t.name==='Elias, astronome',['Allez. Montre à ton vieux père ce que tu as appris.','atk'],['Ha ! Ta mère va me charrier pendant des semaines.']],
 [t=>t.name==='Admin Caïus',['La Faille m\'appartient !','def'],['Impossible… La terre me répond, d\'habitude !'],'Caïus : ROC et OMBRE très défensifs. L\'EAU et la PLANTE percent ses murs.']];
const ph19=()=>B?.tr&&!B.coop?PH19.find(p=>{try{return p[0](B.tr)}catch(e){return false}}):null;
async function ph19Fx(k){if(!B?.foe||B.foe.hp<=0)return;
 if(['atk','def','spd'].includes(k))return statChange(1,k,1);
 if(k==='sun'||k==='eclipse'){B.sky={k,n:4};ui.flash=.5;ui.flashC=SKY[k][1];sfx('shard');return say(SKY[k][2],0,1)}
 if(k==='kael'){await say('…Kael.',B.tr.name,0,B.tr.look);await say(`${nm(B.foe)} hésite… Sa colère vacille !`,0,1);return statChange(1,'atk',-2)}}
{const sf19=sendFoe;sendFoe=async function(...a){const r=await sf19.apply(this,a);const P=ph19();if(P&&B.foes.length>1&&B.foe===B.foes[B.foes.length-1]&&!B.ph19a){B.ph19a=1;await say(P[1][0],B.tr.name,0,B.tr.look);if(P[1][1])await ph19Fx(P[1][1])}return r}}
{const et19=endTurn;endTurn=async function(...a){const r=await et19.apply(this,a);if(r||!B?.foe)return r;const P=ph19();
 if(P&&!B.ph19b&&B.foe.hp>0&&B.foe.hp<=st(B.foe).hp*.35&&B.foes.filter(alive).length===1){B.ph19b=1;const L=P[2];if(L[1]==='kael')await say(L[0],'Kael',0,'rival');else await say(L[0],B.tr.name,0,B.tr.look);if(L[1])await ph19Fx(L[1])}return r}}
// --- Analyse de défaite : ce qui n'a pas marché, et quoi essayer
const TN19={NOR:'NORMAL',FEU:'FEU',EAU:'EAU',PLA:'PLANTE',ELE:'ÉLEC',ROC:'ROC',OMB:'OMBRE',LUM:'LUMIÈRE'};
const tn19=t=>TN19[t]||t;
function an19(b){const A=b.a19||{me:[],foe:[],slow:0,turns:0},L=[],foes=b.foes||[b.foe],FT=[...new Set(foes.map(m=>SP[m.sp].t))],P=b.ph19?.()||null;
 const myLv=[...(b.u19||[b.me])].reduce((a,m)=>a+m.lv,0)/Math.max(1,(b.u19||[b.me]).size||1),foeLv=Math.max(...foes.map(m=>m.lv));
 // Types : attaques super efficaces disponibles ?
 const good=FT.map(t=>Object.keys(TY).filter(a=>(EF[a]?.[t]??1)>1));const have=new Set();for(const m of G.party)for(const id of m.moves)if(MV[id]?.p)have.add(MV[id].t);
 const miss=FT.filter((t,i)=>good[i].length&&!good[i].some(a=>have.has(a)));const avg=A.me.length?A.me.reduce((a,e)=>a+e,0)/A.me.length:1;
 if(miss.length){const t=miss[0],g=good[FT.indexOf(t)].map(tn19).join(' ou ');L.push(P?.[3]?`Aucune de tes créatures ne connaît d'attaque ${g}. Capture-en une, ou cherche une capacité à apprendre.`:`Ses créatures ${tn19(t)} craignent ${g}… et aucune de tes créatures n'a d'attaque de ce type. Capture-en une, ou cherche une capacité à apprendre.`)}
 else if(A.me.length>=2&&avg<1){const t=FT[0],g=good[0].map(tn19).join(' ou ');L.push(`Tes attaques étaient souvent peu efficaces. Contre ${tn19(t)}, mise sur ${g} : envoie la bonne créature dès le début.`)}
 const hurt={};for(const[t,e]of A.foe)if(e>1)hurt[t]=(hurt[t]||0)+1;const ht=Object.entries(hurt).sort((a,b)=>b[1]-a[1])[0];
 if(ht&&ht[1]>=2)L.push(`Ses attaques ${tn19(ht[0])} touchaient tes points faibles. Change de créature quand le type ne te favorise pas : ça ne coûte qu'un tour.`);
 if(A.turns>=3&&A.slow/A.turns>.7)L.push('Ses créatures agissaient presque toujours avant les tiennes. La paralysie, une attaque prioritaire ou la Griffe Vive renversent ça.');
 if(foeLv-myLv>=5)L.push(`Ses créatures avaient environ ${Math.round(foeLv-myLv)} niveaux d'avance. Les défis des dresseurs et les créatures sauvages de la zone t'aideront à combler l'écart.`);
 const heal=['potion','superpotion','hyperpotion','maxpotion','baiesoin','totalsoin'].some(k=>G.bag[k]>0);if(!b.usedBag&&heal&&b.tr)L.push('Tu n\'as utilisé aucun objet : une Potion au bon moment change tout.');
 if(G.keys.bracelet&&b.evOn?.[0]&&!(b.evUsed?.[0]>0)&&b.tr)L.push('Ton Bracelet du Cycle peut déclencher l\'Éveil (ATTAQUE, puis ÉVEIL DU CYCLE) quand sa jauge est pleine. Garde-le pour son atout.');
 if(P&&P[3])L.unshift(P[3]);if(!L.length)L.push('Change l\'ordre de ton équipe : commence par la créature la mieux adaptée, et garde la plus solide pour son dernier atout.');
 return L.slice(0,3)}
{const eb19=endBattle;endBattle=async function(r){const b=B;
 if(b&&b.tr?.ch19&&r==='win'){const C=b.tr.ch19,ok=C[0]==='express'?(b.turn||0)<=C[1]:C[0]==='duel'?(b.u19?.size||1)<=1:C[0]==='sansobjet'?!b.usedBag:true;inv19Off();
  const res=await eb19(r);const why={express:`Il t'a fallu ${b.turn} tours.`,duel:'Tu as changé de créature.',sansobjet:'Tu as utilisé le Sac.'}[C[0]];
  if(ok){give(C[2],C[3]);sfx('lv');await say(`${C[0]==='aucun'?'':'Défi réussi ! '}${b.tr.name} te remet ${IT[C[2]][0]}${C[3]>1?' x'+C[3]:''} !`)}else await say(`Défi raté… ${why||''} Tu gagnes quand même le combat.`);
  if(C[4])await say(C[4],b.tr.name,0,b.tr.look);return res}
 inv19Off();
 if(!(b&&r==='lose'&&!b.o?.noLose&&!b.coop&&!b.pvp&&G.party))return eb19(r);
 b.ph19=ph19;const L=an19(b),boss=!!(b.tr||b.o?.trial);sfx('back');await say('Ton équipe est à terre… Voyons ce qui n\'a pas marché.',0,1);
 for(let i=0;i<L.length;i++)await say((i?'Et aussi : ':'Analyse : ')+L[i]);
 b.o.noLose=1;b.o.loseMsg='Ton équipe a besoin de repos.';const res=await eb19(r);
 const l=Math.floor(G.money*.1);G.money-=l;if(l)await say(`Dans la panique, tu perds ${l} pièces.`);
 let back=!boss;if(boss)back=(await choose(['RÉESSAYER ICI (ÉQUIPE SOIGNÉE)','RETOURNER SE SOIGNER'],{w:300}))===1;
 if(back&&G.heal){await fadeTo(1,300);loadMap(...G.heal,0);await fadeTo(0,300);await say('Ton équipe a été soignée. Ne baisse pas les bras !')}
 else if(boss)await say('Ton équipe est soignée. Prends le temps de revoir ta stratégie (MENU, ÉQUIPE), puis retente ta chance !');return res}}
// --- Courbe des Champions : Maëlle arrivait beaucoup trop tôt trop forte (27-29 juste après une route de niveau 17-21)
{const m=MAPS.gym2?.npcs.find(n=>n.tr?.id==='maelle');if(m&&m.tr.team[0][1]===27)m.tr.team=m.tr.team.map(([s,l,...r])=>[s,l-2,...r])}
// --- Combats ordinaires : plancher de niveau (après tout le reste)
{const bt19=battle;battle=async function(foes,o={}){
 try{if(G&&Array.isArray(foes)&&o.tr&&!o.tr.boss&&!o.tr.vs&&!o.noCap&&G.map!=='songe'&&!f().expert){const fl=trFloor19();for(const m of foes)if(m&&m.lv<fl){m.lv=fl;m.exp=xpFor(fl);m.hp=st(m).hp}}}catch(e){}
 try{return await bt19(foes,o)}finally{inv19Off()}}}
