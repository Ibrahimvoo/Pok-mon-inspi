// =====================================================================
// EXTENSION 18.0 — LE CARNAVAL DES MASQUES · Histoire, déguisements, magasins, énigmes, légendaires, cinématiques.
// Chapitre inséré après le Badge Volt : la clé du téléphérique est volée, le voleur masqué se cache au Carnaval de Carnavelle.
// Chargé avant l'aventure à plusieurs : les scènes (dialogues avec cinéma, combats, badge) sont vécues par tous les joueurs.
// =====================================================================

// ---------------------------------------------------------------- DÉGUISEMENTS (menu TENUES)
// [nom, apparence dans le monde, effet]
const DG={masque:['Masque de Carnaval','dgmasque','Les gardes de Carnavelle te laissent entrer sur la Place du Carnaval, et la foule te prend pour un fêtard.'],
 eclipse:['Uniforme Éclipse','grunt','Les sbires de la Team Éclipse te prennent pour l\'un des leurs : ils ne t\'attaquent plus et te parlent librement.'],
 sable:['Tenue des Sables','dgsable','Protège de la tempête de sable des Dunes d\'Ambre.'],
 feuille:['Cape de Feuillage','dgfeuille','Camouflage : deux fois moins de créatures sauvages dans les hautes herbes.'],
 ninja:['Tenue de Ninja','dgninja','Les dresseurs ne te remarquent plus : il faut aller leur parler pour les affronter.']};
const dgHas=k=>!!G?.keys?.['dg_'+k],dgIs=k=>!!G?.dg&&(k?G.dg===k:true);
const dgFol=()=>typeof SCX!=='undefined'&&!!SCX&&!SCX.lead;   // ami qui vit la scène d'un autre : il le suit, déguisé comme lui
const dgOk=k=>dgIs(k)||dgFol()&&dgHas(k);
function dgLook(){const d=G?.dg,k=d&&DG[d]?.[1];return k&&PEO[k]?k:myLook()}
function dgGive(k,why){if(!G.keys['dg_'+k]){G.keys['dg_'+k]=1;jingle('item');ui.pop={ic:ICO['dg_'+k],t0:now()}}tip('tenues','Les TENUES se changent depuis le MENU (TENUES). Chaque déguisement a son effet : regarde sa description. Tes amis en ligne te voient déguisé, eux aussi.');if(why)return say(why)}
async function dgWear(k){if(k&&!dgHas(k))return;G.dg=k||null;sfx(k?'ok':'back');puff(G.x,G.y,k?'#f6c445':'#d8c8f0',16);if(NET?.on)NET.hi(1);save()}
async function tenuesMenu(){for(;;){const L=Object.keys(DG).filter(dgHas),O=[...L.map(k=>DG[k][0]+(G.dg===k?' (PORTÉE)':'')),...(G.dg?['RETIRER LA TENUE']:[]),'RETOUR'];
 const i=await choose(O,{x:W-346,y:8,w:338,title:'Tenues',icons:[...L.map(k=>ICO['dg_'+k]),...(G.dg?[ICO.close]:[]),ICO.close],info:j=>({s:j<L.length?DG[L[j]][2]:j===L.length&&G.dg?'Reprendre ton apparence habituelle.':'Fermer.'})});
 if(i<0||O[i]==='RETOUR')return;if(O[i]==='RETIRER LA TENUE'){await dgWear(null);await say('Tu reprends ton apparence habituelle.');continue}
 const k=L[i];if(G.dg===k){await dgWear(null);await say('Tu retires ta tenue.');continue}await dgWear(k);await say(`Tu enfiles : ${DG[k][0]} !`);return}}
// Le MENU gagne une entrée TENUES (juste avant SAUVER) dès qu'on possède un déguisement
{const c18=choose;choose=async function(opts,o={}){const pm=Array.isArray(opts)&&opts.includes('SAUVER')&&opts.includes('TITRE')&&opts.includes('FERMER')&&!opts.includes('TENUES');
 if(!pm||!G||!Object.keys(DG).some(dgHas))return c18(opts,o);const p=opts.indexOf('SAUVER'),O=[...opts.slice(0,p),'TENUES',...opts.slice(p)],ic=o.icons?[...o.icons.slice(0,p),ICO.dg_masque,...o.icons.slice(p)]:o.icons;
 const i=await c18(O,{...o,icons:ic,i:o.i!=null&&o.i>=p?o.i+1:o.i,vis:Math.max(o.vis||10,11)});if(i===p){ui.panel=null;await tenuesMenu();return opts.length}return i<0?i:i>p?i-1:i}}
// Les sbires ne repèrent pas un faux sbire ; les dresseurs ne voient pas un ninja
{const ct18=checkTrainers;checkTrainers=async function(){if(dgIs('ninja'))return false;if(dgIs('eclipse')){const M=MAPS[G.map],H=npcs(M).filter(n=>n.tr&&n.t==='grunt'&&n.los!==0);H.forEach(n=>n.los=0);try{return await ct18()}finally{H.forEach(n=>delete n.los)}}return ct18()}}
{const tb18=trainerBattle;trainerBattle=async function(n){if(n?.disg&&dgOk('eclipse')&&!f()['t_'+n.tr?.id]){await say(n.dgsay||'Salut, collègue !',n.tr.name,0,n.t);return null}return tb18(n)}}
// Cape de Feuillage : une rencontre sur deux est évitée dans les hautes herbes
{const bt18=battle;battle=async function(foes,o={}){if(typeof ENC10!=='undefined'&&ENC10&&dgIs('feuille')&&!o.tr&&!o.legend&&!o.fish&&!o.roam&&Math.random()<.5)return null;return bt18(foes,o)}}
// Tempête de sable : sans Tenue des Sables, impossible d'avancer au nord de la ligne de tempête
let STORMT=0;{const tm18=tryMove;tryMove=function(d){const M=MAPS[G?.map];if(M?.storm&&!dgIs('sable')&&G.y>=M.storm&&G.y+DY[d]<M.storm&&!busy){if(now()-STORMT>1200){STORMT=now();ui.shake=4;sfx('back');run(()=>say(dgHas('sable')?'Une tempête de sable te repousse ! Enfile ta Tenue des Sables (MENU, TENUES).':'Une tempête de sable te repousse ! Impossible d\'avancer sans protection. (Le Chef Saïd, au sud des dunes, prête des Tenues des Sables.)'))}return}return tm18(d)}}
// En ligne : les amis voient ton déguisement
{const s18=NET.send;NET.send=function(k,o={},to,rel){if(k==='hi'&&G?.dg&&DG[G.dg])o={...o,dg:G.dg};return s18.call(this,k,o,to,rel)}}
{const h18=NET.H.hi;NET.H.hi=(m,P)=>{h18(m,P);P.dg=typeof m.dg==='string'&&DG[m.dg]?m.dg:'';if(P.g)P.g.t=P.dg?DG[P.dg][1]:P.look}}
{const gt18=ghostTick;ghostTick=function(){gt18();if(!NET.on)return;for(const P of NET.peers.values())if(P.g){const t=P.dg?DG[P.dg][1]:P.look;if(P.g.t!==t)P.g.t=t}}}
Object.assign(ICO,{dg_masque:icon(["........","oooooooo","owwwwwwo","owkwwkwo","owwwwwwo",".owrrwo.","..oooo..","........"],{r:'#e84a6a',k:'#1a1420'}),dg_eclipse:icon(["...oo...","..okko..",".okppko.","okkkkkko","okpkkpko","okkkkkko",".okkkko.","..oooo.."],{k:'#2a2240',p:'#8a5ad0'}),
 dg_sable:icon(["...oo...","..owwo..",".owwwwo.","owwYYwwo","owwwwwwo","owwwwwwo",".oYYYYo.","..oooo.."],{w:'#f0e0c0',Y:'#c8a050'}),dg_feuille:icon(["...oo...","..oggo..",".ogGggo.","ogggGggo","oGggggGo","ogGggGgo",".oggggo.","..oooo.."],{g:'#4aa83e',G:'#2a7a2e'}),
 dg_ninja:icon(["..oooo..",".okkkko.","okkkkkko","owwkkwwo","okkkkkko",".okkkko.","..okko..","...oo..."],{k:'#2a2a4a'}),bMas:icon(["........","oooooooo","oyyyyyyo","oykyykyo","oyyyyyyo",".oyrryo.","..oooo..","........"],{y:'#e8a8ff',r:'#e84a6a',k:'#3a1a4a'})});

// ---------------------------------------------------------------- AMBIANCES : sable du désert, tempête, vent des gorges, confettis du Carnaval, brume du marais
function sandify(c){const g=c.getContext('2d'),im=g.getImageData(0,0,c.width,c.height),d=im.data,A=[154,104,52],B=[250,226,164];
 for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const l=Math.min(1,(d[i]*.3+d[i+1]*.59+d[i+2]*.11)/200),k=.75;for(let j=0;j<3;j++)d[i+j]=Math.round(d[i+j]*(1-k)+(A[j]+(B[j]-A[j])*l)*k)}g.putImageData(im,0,0);return c}
{const bm18=buildMap;buildMap=function(M){const fresh=!M.L;bm18(M);if(fresh&&M.desert&&M.L)sandify(M.L)}}
{const lg18=lighting;lighting=function(M,cx,cy,t,px,py){lg18(M,cx,cy,t,px,py);const mul=c=>{X.globalCompositeOperation='multiply';X.fillStyle=c;X.fillRect(0,0,W,H);X.globalCompositeOperation='source-over'};
 if(M.desert){mul('#fff0d0');const sy=(M.storm|0)*TS-cy,dg=dgIs('sable'),n=M.storm?(G.y<M.storm?70:40):10;
  for(let i=0;i<n;i++){const s=(i*97.3)%1,y=((i*53+t*.02*(1+s))%(H+40))-20,x=((i*131+t*(.5+s*.6))%(W+120))-60;if(M.storm&&y>sy+40&&G.y>=M.storm&&i%3)continue;X.globalAlpha=.25+s*.3;R(X,i%2?'#f0d8a0':'#c8a060',ev(x),ev(y),ev(10+s*16),2)}X.globalAlpha=1;
  if(M.storm&&G.y<M.storm+6){X.globalAlpha=dg?.12:.22;R(X,'#d8b878',0,0,W,H);X.globalAlpha=1}}
 if(M.windy)for(let i=0;i<14;i++){const s=(i*0.37)%1,x=W-((i*151+t*(.35+s*.4))%(W+80)),y=(i*67+Math.sin(t/900+i)*20)%H;X.globalAlpha=.18;R(X,'#ffffff',ev(x),ev(y),ev(18+s*20),1);X.globalAlpha=1}
 if(M.festive){const C3=['#ff5a8a','#ffd23a','#5ad0ff','#7ae07a','#c87aff'];for(let i=0;i<26;i++){const s=(i*0.618)%1,x=(i*71+Math.sin(t/700+i)*16)%W,y=((i*41+t*(.03+s*.03))%(H+20))-10;R(X,C3[i%5],ev(x),ev(y),(t/200+i|0)%2?4:2,(t/200+i|0)%2?2:4)}
  if(night()){X.globalCompositeOperation='lighter';for(let i=0;i<12;i++){const x=20+i*40,y=18+Math.sin(i*1.3)*6;X.globalAlpha=.35+.15*Math.sin(t/300+i);X.drawImage(glowC(['#ff8ab8','#ffd860','#8ad8ff'][i%3]),x-24,y-24,48,48);X.globalAlpha=1}X.globalCompositeOperation='source-over'}}
 if(M.swamp){mul('#d0e0c4');if(night()){X.globalCompositeOperation='lighter';for(let i=0;i<22;i++){const x=(i*89+Math.sin(t/800+i*2)*30)%W,y=(i*57+Math.cos(t/900+i)*24)%H;X.globalAlpha=(.25+.35*Math.max(0,Math.sin(t/260+i*1.7)));R(X,'#e8ff9a',ev(x),ev(y),3,3);X.globalAlpha=1}X.globalCompositeOperation='source-over'}}}}
// Objets du monde 18.0 : coffres qui restent ouverts
{const do18=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='chest18')return do18(k,sx,sy,t,n);const open=n&&f()[n.fl];X.drawImage(SHD2,sx+4,sy+24,26,8);R(X,C.ink,sx+4,sy+10,24,18);R(X,'#8a5a2a',sx+5,sy+11,22,16);R(X,'#e8c060',sx+5,sy+17,22,2);R(X,open?'#2a1a10':'#c88a3a',sx+5,sy+11,22,5);R(X,'#f6d870',sx+14,sy+15,4,5);if(!open)glowAt(sx+16,sy+18,18,.15+.05*Math.sin(t/300))}}
OBJ.chest18='Un coffre.';

// ---------------------------------------------------------------- MUSIQUES
SONG.carnaval=[125,['square',.02,'C5 E5 G5 - E5 G5 C6 - B5 G5 A5 - G5 - E5 - F5 A5 C6 - A5 C6 D6 - C6 B5 G5 - A5 - G5 - E5 G5 C6 - B5 A5 G5 - F5 E5 D5 - E5 - C5 - D5 F5 A5 - G5 F5 E5 - D5 - G4 - C5 - - -'],['triangle',.045,'C3 G3 C3 G3 C3 G3 C3 G3 F3 C4 F3 C4 G3 D4 G3 D4 C3 G3 C3 G3 A2 E3 A2 E3 D3 A3 G3 D3 C3 G3 C3 .'],['square',.008,'. . E4 . . . E4 . . . F4 . . . G4 . . . E4 . . . E4 . . . F4 . . . E4 .']];
SONG.desert=[170,['square',.018,'E5 - F5 - G#5 - A5 - G#5 F5 E5 - - - B4 - C5 - D5 - E5 - F5 - E5 - D5 C5 B4 - - - E5 - F5 - G#5 - B5 - A5 G#5 F5 - E5 - D5 - C5 - B4 - C5 D5 E5 - - - - - - -'],['triangle',.045,'E2 - - - E3 - - - E2 - - - F2 - - - E2 - - - E3 - - - D2 - - - E2 - - -'],['sine',.02,'. . . . B5 - - - . . . . C6 - - - . . . . B5 - - - . . . . G#5 - - -']];

// ---------------------------------------------------------------- CHAPITRE : LA CLÉ VOLÉE (Volterre)
const AMB18='Ambroise';
{const VG18=volGate;volGate=async function(){const F=f();if(F.badge4&&!F.v18vol)return theft18();if(F.v18vol&&!F.v18done&&!F.obsScene){if(G.bag.clecabine)return ambroiseKey();return say('La cabine du téléphérique est immobile. Le tableau de commande est éventré : sans la clé, impossible de monter. Ambroise est penché dessus, l\'air furieux.')}return VG18()};
 for(const k in MAPS.volterre.doors)if(MAPS.volterre.doors[k]===VG18)MAPS.volterre.doors[k]=volGate}
{const VE18=MAPS.volterre.enter;MAPS.volterre.enter=async function(){await VE18();const F=f();if(F.badge4&&F.obsScene&&!F.v18vol)return theft18()}}
MAPS.volterre.npcs.push({x:11,y:2,t:'ambroise',d:3,name:'Ambroise',cond:()=>f().v18vol&&!f().v18done,fn:()=>G.bag.clecabine?ambroiseKey():say(f().obsScene?'Faustine a volé la clé de secours… Sans elle, au prochain orage, la cabine reste bloquée là-haut. Ramène-la-moi, gamin.':'Carnavelle, à l\'ouest, par les Gorges du Vent. Le voleur portait un masque de Carnaval… et un uniforme de la Team Éclipse sous sa cape. Ramène-moi cette clé !',AMB18,0,'ambroise')});
async function theft18(){const F=f(),post=!!F.obsScene;F.v18vol=1;await cine(1);sfx('alert');ui.shake=6;
 await say(post?'Une alarme hurle près du téléphérique. La porte de la cabine de commande pend sur ses gonds.':'La cabine du téléphérique est là… mais la porte de la cabine de commande est grande ouverte, et le tableau de bord est éventré.');
 const a=tmpN('volterre',{x:13,y:4,t:'ambroise',d:1,name:'Ambroise'});await bang(a);await walk(a,'u',160);
 await say(post?'Gamin ! Tu tombes bien. Quelqu\'un vient de voler la clé de secours du téléphérique !':'Gamin ! Attends ! Quelqu\'un a volé la clé de commande du téléphérique ! Sans elle, la cabine ne bougera pas d\'un centimètre.',AMB18,0,'ambroise');
 if(!post)await say('Kael est monté avec la dernière cabine, juste avant. Dix minutes après, un sbire de la Team Éclipse a forcé la porte et filé vers l\'ouest.',AMB18,0,'ambroise');
 await say('Il portait un masque de Carnaval. Ce soir commence le Carnaval des Masques de Carnavelle, de l\'autre côté des Gorges du Vent : tout le monde y est masqué. L\'endroit rêvé pour disparaître.',AMB18,0,'ambroise');
 await say(post?'La Team Éclipse prépare quelque chose, même après la défaite de Vex. Va à Carnavelle, trouve ce voleur et ramène-moi la clé.':'Va à Carnavelle et récupère cette clé. Je préviens le garde des Gorges : il te laissera passer. Moi, je reste ici réparer ce qu\'ils ont cassé.',AMB18,0,'ambroise');
 await walk(a,'d',160);rmN('volterre',a);await cine(0);tip('v18','Nouveau chapitre : LE CARNAVAL DES MASQUES. Les Gorges du Vent s\'ouvrent à l\'ouest de Volterre.');save()}
async function ambroiseKey(){const F=f();await cine(1);delete G.bag.clecabine;F.v18done=1;sfx('ok');
 await say('Ma clé ! Tu l\'as retrouvée ! … Faustine, la couturière de la Team Éclipse ? Elle a toujours eu du talent pour les déguisements. Et pour les ennuis.',AMB18,0,'ambroise');
 sfx('door');ui.shake=4;await say('Ambroise enfonce la clé dans le tableau de bord. Les moteurs toussent, puis ronronnent. Les lampes de la cabine s\'allument.');
 await say(F.obsScene?'La cabine de secours est sauvée. Tiens, prends ça : de quoi te remercier. Et dis bonjour au Carnaval de ma part !':'Le téléphérique est à toi. Kael t\'attend là-haut, et Vex aussi. Prends ça, tu en auras besoin.',AMB18,0,'ambroise');
 give('maxpotion',3);give('rappelmax',2);await say('Tu reçois 3 Max Potions et 2 Rappels Max !');rep('volterre',3);await cine(0);save()}

// ---------------------------------------------------------------- CARNAVELLE : arrivée, gardes du Carnaval, Mirella
MAPS.carnavelle.enter=async function(){const F=f();if(F.v18arr)return;F.v18arr=1;if(!F.v18vol)F.v18vol=1;await cinema('carnaval');await cine(1);
 const m=tmpN('carnavelle',{x:G.x-1>2?G.x-1:G.x+1,y:G.y,t:'mirella',d:G.x-1>2?3:2,name:'Mirella'});await bang(m);
 await say('Oh ! Pardon, pardon ! J\'ai failli te renverser avec mes rubans… Tu viens pour le Carnaval des Masques ? Sans masque ?','Mirella',0,'mirella');
 await say('Les gardes ne te laisseront jamais entrer sur la Place du Carnaval sans masque ! C\'est la règle depuis trois cents ans.','Mirella',0,'mirella');
 await say('Je m\'appelle Mirella. Je suis couturière : mon atelier est juste là, au milieu de la ville. Passe me voir, je te trouverai un masque !','Mirella',0,'mirella');
 await say('Un voleur masqué ? Ici, tout le monde est masqué… Mais si quelqu\'un a vu quelque chose, c\'est sur la Place, au milieu de la foule.','Mirella',0,'mirella');
 sfx('door');rmN('carnavelle',m);await cine(0);save()};
const carnOpen=()=>dgOk('masque')||!!f().v18done;
async function carnGuard(n){if(dgHas('masque'))return say('Tu as un masque, mais tu ne le portes pas ! Enfile-le (MENU, TENUES) et la Place du Carnaval est à toi.','Garde du Carnaval',0,'sailor');
 return say('Halte ! Pas de masque, pas de Carnaval ! C\'est la règle depuis trois cents ans. L\'Atelier Mirella en vend… enfin, en offre, si elle t\'a à la bonne.','Garde du Carnaval',0,'sailor')}
async function mirellaTalk(){const F=f(),M='Mirella';
 if(!dgHas('masque')){await cine(1);await say('Te voilà ! Assieds-toi… non, reste debout, je prends tes mesures. Hmm. Hmm hmm. Voilà !',M,0,'mirella');
  await dgGive('masque','Mirella te remet un MASQUE DE CARNAVAL, brodé de fil d\'or !');
  await say('Va dans le MENU, puis TENUES, pour le mettre. Avec lui, les gardes te laisseront passer sur la Place du Carnaval, au nord.',M,0,'mirella');
  await say('Et ouvre l\'œil : avec un masque, personne ne te reconnaît. Les gens parlent plus librement… même ceux qui devraient se taire.',M,0,'mirella');await cine(0);save();return}
 if(F.v18ecoute&&!F.badge5){F.v18mq=1;return say('Le Repaire de la Team Éclipse sous le Théâtre ? Et il faut un uniforme pour y entrer ? Je peux t\'en coudre un… mais un uniforme parfait, ça se mérite. Va battre Arlequin, le Champion de l\'Arène des Masques, sur la Place. S\'il te donne son badge, je me mets au travail.',M,0,'mirella')}
 if(F.v18ecoute&&F.badge5&&!dgHas('eclipse')){await cine(1);await say('Le Badge Masque ! Arlequin ne le donne pas à n\'importe qui. Bon… J\'ai passé la nuit à coudre. Ne me demande pas où j\'ai trouvé le tissu.',M,0,'mirella');
  F.v18unif=1;await dgGive('eclipse','Mirella te remet un UNIFORME DE LA TEAM ÉCLIPSE ! Il est parfait… presque trop.');
  await say('Il y a vingt ans, j\'avais une apprentie : Faustine. La plus douée de toutes. Elle est partie un soir avec mes plus beaux patrons… pour la Team Éclipse.',M,0,'mirella');
  await say('Si c\'est elle qui a volé ta clé, elle doit être au Repaire, sous le Théâtre. Enfile l\'uniforme et passe par les coulisses. Et… sois prudent.',M,0,'mirella');await cine(0);save();return}
 const O=['ACHETER','PARLER','AU REVOIR'],c=await choose(O,{w:200,title:'Atelier Mirella'});if(c===0)return buyMenu(['festicapsule','barbapapa','pommamour','masqueor'].filter(k=>k!=='masqueor'||F.v18done),{masqueor:12000},M);
 if(c===1)return say(F.v18faus?'Faustine… Elle a tout de même cousu un uniforme parfait, autrefois. Peut-être qu\'un jour elle recousera autre chose que des mensonges.':F.v18ecoute?'Le Théâtre est sur la Place. Les coulisses sont tout au fond, à droite de la scène.':'Les plus beaux costumes de Carnavelle sortent d\'ici ! Enfin… pas tous. Les meilleurs ninjas s\'habillent chez Maître Kaito, et la sorcière du Marais coud des capes de feuillage.',M,0,'mirella')}

// ---------------------------------------------------------------- PLACE DU CARNAVAL : les sbires bavards, le héraut, l'Arène des Masques
async function gruntsTalk(i){const F=f(),S='Sbire masqué';if(!F.v18arr)return say('Circule.',S,0,'grunt');
 if(!dgOk('masque')&&!dgOk('eclipse'))return say(['Hé, toi, sans masque ! Circule, gamin. On discute entre adultes.','Pas de masque ? Alors pas de conversation.'][i],S,0,'grunt');
 if(F.v18ecoute)return say(['Le mot de passe du machiniste ? « L\'ombre danse avec nous. » Chut, hein.','Faustine a dit : personne ne monte à l\'Observatoire tant que Vex n\'a pas fini. Personne !'][i],S,0,'grunt');
 await cine(1);await say('Psst… T\'es des nôtres ? Avec un masque pareil, sûrement. Écoute bien : la patronne a planqué la clé du téléphérique au Repaire.',S,0,'grunt');
 await say('Le Repaire, sous le Théâtre. L\'entrée est dans les coulisses, derrière le machiniste. Il ne laisse passer que ceux qui portent l\'uniforme.','Autre sbire masqué',0,'grunt');
 await say('Et il faut lui donner le mot de passe : « L\'ombre danse avec nous. » Tant que Vex n\'a pas fini là-haut, personne ne doit monter à l\'Observatoire. Ordre de Faustine !',S,0,'grunt');
 await say('Hé… T\'as une drôle de voix, toi. T\'es sûr que t\'es des nôtres ? … Bah. Sous un masque, tout le monde a une drôle de voix. Allez, file.','Autre sbire masqué',0,'grunt');
 F.v18ecoute=1;await cine(0);tip('v18b','Un uniforme de la Team Éclipse… Mirella, la couturière, pourrait peut-être en coudre un.');save()}
async function heraultTalk(){const F=f(),H='Héraut du Carnaval',d=dayN();
 const c=await choose(['CONCOURS DE COSTUMES','LE CARNAVAL ?','AU REVOIR'],{w:280,title:H});if(c===1)return say('Le Carnaval des Masques fête l\'aube et le crépuscule : le moment où le jour et la nuit portent le même masque. On danse, on chante, on se déguise… et le soir, Grand Bal sur la Place !',H,0,'maestro');
 if(c!==0)return;if(!G.dg)return say('Le Concours de Costumes est ouvert à tous les dresseurs DÉGUISÉS ! Reviens en tenue (MENU, TENUES), et avec ta plus belle créature en tête d\'équipe.',H,0,'maestro');
 if(F.v18cc===d)return say('Tu as déjà défilé aujourd\'hui ! Le jury se repose. Reviens demain avec un nouveau costume !',H,0,'maestro');
 F.v18cc=d;const m=G.party[0],sc=(Object.keys(DG).indexOf(G.dg)*7+d*13+(m?bondLv(m)*9+(m.sh?40:0)+SP[m.sp].stg*5:0))%100;await cine(1);sfx('ok');
 await say(`Le jury observe ton costume (${DG[G.dg][0]}) et ${m?nm(m):'ton allure'}…`,H,0,'maestro');ui.shake=2;await wait(500);
 const R=sc>=70?['pommamour',2,'PREMIER PRIX ! Un tonnerre d\'applaudissements !']:sc>=40?['festicapsule',3,'DEUXIÈME PRIX ! La foule t\'acclame !']:['barbapapa',2,'Prix du public ! Les enfants ont adoré.'];
 give(R[0],R[1]);await say(`${R[2]} Tu reçois ${IT[R[0]][0]} x${R[1]}.`,H,0,'maestro');F.v18ccn=(F.v18ccn|0)+1;await cine(0);save()}
async function gym5Door(){return warp('gym5',5,9,1)}
async function fakeArlequin(n,i){const F=f(),A='Arlequin ?';await cine(1);await emote(n,'?',500);
 await say(['Ha ha ! Raté ! Je ne suis qu\'un reflet ! Mais un reflet qui mord !','Encore raté ! Les reflets, ça se brise… si tu y arrives !'][i],A,0,'arlequin');await cine(0);
 const r=await battle(team([[['draplin',34],['chatoeil',35]],[['flanlou',34],['possedrap',35]]][i]),{tr:{name:'Reflet d\'Arlequin',look:'arlequin',money:1200,after:'Le reflet se brise en mille éclats de lumière…'}});
 if(r==='win'){F['v18fk'+i]=1;sfx('shard');ui.flash=.5;ui.flashC='#e8a8ff';puff(n.x,n.y,'#e8a8ff',20);if(F.v18fk0&&F.v18fk1)await say('Les deux reflets ont disparu. Au fond de l\'arène, une silhouette applaudit lentement : le vrai Arlequin !')}save()}
async function arlequinAfter(){await say('Mirella m\'a parlé de toi. Une couturière qui t\'envoie dans une arène… elle doit avoir un plan. Va la voir à son atelier !','Champion Arlequin',0,'arlequin')}
LDR.arlequin=['Le Carnaval recommence chaque nuit, maintenant que le Cycle tourne rond. Une revanche, sous les lampions ?','Bravo ! Tu as encore vu à travers mes illusions.','pierrechance'];
REM.arlequin=L=>[['possedrap',L-1,null,'baiesoin'],['chatoeil',L-1,null,'pierrechance'],['ninjombre',L,null,'encensnoir'],['prophetoise',L,null,'baiesoin'],['masquetotem',L+1,null,'orbe']];

// ---------------------------------------------------------------- LE THÉÂTRE ET LE REPAIRE DE LA MASCARADE
async function trapGuard(){const F=f(),S='Machiniste louche';if(!dgOk('eclipse'))return say(F.v18ecoute?'Les coulisses sont interdites au public. Hé, je t\'ai à l\'œil, toi. Va voir le spectacle.':'Les coulisses sont interdites au public. Va voir le spectacle, il est très bien. Enfin, paraît-il.',S,0,'grunt');
 await cine(1);await say('Ah, un collègue ! Tu connais la procédure. Le mot de passe ?',S,0,'grunt');
 const O=['« Vive le soleil ! »','« L\'ombre danse avec nous. »','« Masque et cape ! »','« Bonjour ? »'],i=await choose(O,{w:300,title:'Mot de passe'});
 if(i===1){F.v18trappe=1;await say('C\'est bon. Passe. Et ne fais pas de bruit : la patronne répète son grand discours.',S,0,'grunt');await cine(0);save();return}
 await say('Mauvais mot de passe ! T\'es pas un vrai sbire, toi ! Intrus !',S,0,'grunt');await cine(0);
 const r=await battle(team([['hyenou',33],['protomk',34]]),{tr:{name:'Machiniste louche',look:'grunt',money:900,after:'Grr… Reviens quand tu connaîtras le mot de passe, imposteur !'}});save();return r}
async function trapDoor(){if(!f().v18trappe)return say('Une trappe dans le plancher des coulisses. Elle est verrouillée de l\'intérieur… et le machiniste te surveille.');
 await say('La trappe s\'ouvre sur une échelle qui descend dans le noir…');return warp('repaire',8,11,1)}
async function gastonRep(){const S='Sbire Gaston';if(!dgIs('eclipse'))return say('Hé ! Qui t\'es, toi ? … Bah, je m\'en fiche, je suis en pause.',S,0,'grunt');
 if(f().v18gaston)return say('Le code ? MASCARADE. Tu vas l\'oublier toi aussi, hein ? On l\'oublie tous.',S,0,'grunt');
 f().v18gaston=1;await say('Le code de la porte du bureau ? Attends… je l\'ai noté sur ma main. « M-A-S-C… ». MASCARADE ! Voilà. Me dénonce pas, hein.',S,0,'grunt');save()}
async function robotTalk(){const F=f();await cine(1);sfx('alert');await say('BIP. ZONE RÉSERVÉE. CODE D\'ACCÈS ?','Kernélec de garde');
 const O=['ÉCLIPSE','MASCARADE','CARNAVAL','VEX'],i=await choose(O,{w:200,title:'Code d\'accès'});
 if(i===1){F.v18code=1;sfx('ok');await say('BIP BIP. CODE ACCEPTÉ. BIENVENUE, AGENT.','Kernélec de garde');ui.flash=.3;ui.flashC='#7ae0ff';await say('Le robot se range sur le côté. La porte du bureau s\'ouvre avec un sifflement.');await cine(0);save();return}
 await say('BIP. CODE ERRONÉ. ALERTE INTRUS. ALERTE INTRUS.','Kernélec de garde');await cine(0);
 const r=await battle([mon('kernelec',36)],{tr:{name:'Kernélec de garde',look:'grunt',money:0,after:'BIP… REDÉMARRAGE… CODE D\'ACCÈS ?'}});save();return r}
async function officeDoor(){if(!f().v18code)return say('Une lourde porte blindée. Le robot de garde exige un code d\'accès.');return warp('repaire2',6,8,1)}
async function claraTalk(){const F=f(),C='Ingénieure Clara';await cine(1);
 if(dgIs('eclipse'))await say('Encore un sbire ? Je ne vous dirai rien ! … Attends. Tu as l\'air trop gentil pour un sbire. Tu es venu me chercher ?',C,0,'assistant');
 await say('Je suis Clara, l\'ingénieure du téléphérique. Ils m\'ont enlevée pour que personne ne puisse réparer la cabine. Faustine a la clé : elle est dans son bureau, au nord.',C,0,'assistant');
 await say('Tiens, prends ce Proto-MK. Je l\'ai reprogrammé pendant ma captivité : il obéit maintenant aux gentils. Je file prévenir Ambroise !',C,0,'assistant');
 const m=mon('protomk',30,{aff:120});dex('protomk',2);if(G.party.length<6)G.party.push(m);else G.box.push(m);jingle('item');await say(`Tu reçois Proto-MK !${G.party.includes(m)?'':' Il est envoyé dans la Boîte.'}`);
 F.v18clara=1;await cine(0);save()}
async function faustineFight(n){const F=f(),FA='Faustine';await cine(1);await bang(n);
 await say('Tiens, tiens. Un sbire que je n\'ai pas recruté. Et cet uniforme… ces coutures… C\'est du Mirella. Je reconnaîtrais son point de croix entre mille.',FA,0,'faustine');
 await say('Je suis Faustine, la couturière de la Team Éclipse. Les masques, les uniformes, les fausses barbes : c\'est moi. Et la clé du téléphérique… aussi.',FA,0,'faustine');
 await say(F.obsScene?'Vex a perdu ? Peut-être. Mais moi, je n\'ai pas fini mon défilé. Un jour, l\'Éclipse reviendra, et j\'aurai la plus belle robe.':'Vex doit finir son rituel à l\'Observatoire. Personne ne montera. Personne ! Et surtout pas un enfant déguisé avec les chutes de tissu de mon ancienne maîtresse.',FA,0,'faustine');
 await say('Voyons si tu sais porter un costume… sous les projecteurs !',FA,0,'faustine');await cine(0);
 const r=await battle(team([['nocturaile',37,null,'baiesoin'],['possedrap',37],['deltamk',38,null,'baiesoin'],['masquetotem',38,['mascarade','masquesolaire','mirage','prisme'],'orbe']]),{tr:{name:'Couturière Faustine',look:'faustine',money:6000,vs:1,boss:1,items:2,ev:1,after:'Mes coutures… ont craqué ?!'}});
 if(r!=='win')return r;F.v18faus=1;await cine(1);
 await say('Bravo. Vraiment. Tiens, ta précieuse clé. Je n\'en ai plus besoin : j\'ai gagné assez de temps.',FA,0,'faustine');G.bag.clecabine=1;jingle('item');ui.pop={ic:ICO.clecabine,t0:now()};await say('Tu récupères la CLÉ DU TÉLÉPHÉRIQUE !');
 await cinema('mascarade');rmN('repaire2',n);
 await say(F.obsScene?'Faustine a disparu. Rapporte la clé à Ambroise, à Volterre.':'Faustine a disparu. Il faut rapporter la clé à Ambroise, à Volterre… vite !');rep('volterre',2);await cine(0);save();return r}
async function barnabeTalk(){const F=f(),B='Commissaire Barnabé';
 if(F.v18faus&&!F.v18barn){F.v18barn=1;await cine(1);await say('C\'est toi qui as mis la Team Éclipse en déroute sous le Théâtre ? Au nom de toute la police de Carnavelle : merci ! Accepte ces quelques cadeaux.',B,0,'sailor');
  give('maxpotion',3);give('festicapsule',5);await say('Tu reçois 3 Max Potions et 5 Festi Capsules !');await cine(0);save();return}
 return say(F.v18faus?'Faustine court toujours. Elle a promis de revenir au Grand Bal… Une nuit, sur la Place. Ouvre l\'œil, je n\'ai que deux yeux et un agent.':'Un voleur masqué ? Pendant le Carnaval ? Où tout le monde est masqué ? Je… je n\'ai aucune piste. Si tu trouves quoi que ce soit, préviens-moi.',B,0,'sailor')}
async function maestroTalk(){const F=f(),Mo='Maestro Fabrizio';
 if(!F.v18partQ){F.v18partQ=1;return say('Catastrophe ! Ma partition de « La Valse des Masques » s\'est envolée par la fenêtre ! Le vent l\'a emportée vers le sud… vers le Marais des Lucioles. Sans elle, pas de Grand Bal ! Tu veux bien la chercher ?',Mo,0,'maestro')}
 if(F.v18partQ===1&&G.bag.partition){delete G.bag.partition;F.v18partQ=2;await cine(1);await say('Ma partition ! Un peu humide… mais lisible ! Ce soir, l\'orchestre jouera pour toi. Tiens, prends ça : un souvenir de la plus belle valse du monde.',Mo,0,'maestro');
  give('masqueor');give('dc_oracle');await say('Tu reçois un MASQUE D\'OR et le DC Oracle !');await cine(0);save();return}
 return say(F.v18partQ===1?'Ma partition… vers le Marais des Lucioles, au sud de Carnavelle. Le vent l\'a peut-être coincée dans les roseaux.':'Chaque nuit, quand le Cycle tourne, la Valse résonne sur la Place. Danse, jeune dresseur, danse !',Mo,0,'maestro')}
async function theatreGhost(n){const F=f();await emote(n,'!',500);await say('Un petit fantôme sous un drap traverse la scène en ricanant !');const r=await battle([mon('draplin',38)],{});if(r){F.v18drap=1;save()}return r}

// ---------------------------------------------------------------- BOUTIQUES DE CARNAVELLE, DE L'OASIS, DU MARAIS ET DE L'ÎLE
const HELD18=()=>Object.keys(IT).filter(k=>IT[k][4]==='held'&&!['amucycle','orbe'].includes(k));
const GMSHOP=[['Vendeur des Capsules',()=>['capsule','supercapsule','hypercapsule','megacapsule','festicapsule','filetcapsule','sombrecapsule','rapidecapsule','crepuscapsule'],{}],
 ['Vendeuse des Soins',()=>['potion','superpotion','hyperpotion','maxpotion','totalsoin','rappel','rappelmax','elixir','repousse','superrepousse','sirop','granita'],{}],
 ['Vendeur des Objets à tenir',()=>HELD18(),Object.fromEntries(Object.keys(IT).filter(k=>IT[k][4]==='held').map(k=>[k,IT[k][1]||6000]))],
 ['Vendeuse des Disques',()=>DISCS.map(m=>'dc_'+m).filter(k=>IT[k][1]>0),{}],
 ['Vendeur des Pierres',()=>['pierresoleil','pierrelune','pierreorage','pierresable','pierreaube'],{pierreaube:8000,pierrelune:IT.pierrelune?.[1]||2500,pierreorage:IT.pierreorage?.[1]||2500}]];
async function gmShop(i){const[who,L,P]=GMSHOP[i],ks=L().filter(k=>IT[k]),pr={};for(const k of ks)pr[k]=P[k]??(IT[k][1]||1000);
 await say(['Bienvenue au rayon des Capsules ! Pour chaque créature, sa Capsule.','Bienvenue au rayon des Soins ! Rien de tel qu\'une équipe en pleine forme.','Les objets à tenir changent tout en combat. Choisis bien !','Un disque, une capacité, autant de fois que tu veux !','Pierres d\'évolution ! Certaines créatures n\'attendent que ça.'][i],who,0,'vendor');
 for(;;){show('Que désires-tu ?',who);const c=await choose(['ACHETER','VENDRE','QUITTER'],{w:180,icons:[ICO.coin,ICO.bag,ICO.close]});ui.text=null;if(c===0)await buyMenu(ks,pr,who);else if(c===1)await sellMenu();else break}
 return say('Merci, et à bientôt au Grand Magasin !',who,0,'vendor')}
const shop18=async(who,look,hi,L,P={})=>{await say(hi,who,0,look);const ks=L.filter(k=>IT[k]),pr={};for(const k of ks)pr[k]=P[k]??(IT[k][1]||500);
 for(;;){show('Que désires-tu ?',who);const c=await choose(['ACHETER','VENDRE','QUITTER'],{w:180,icons:[ICO.coin,ICO.bag,ICO.close]});ui.text=null;if(c===0)await buyMenu(ks,pr,who);else if(c===1)await sellMenu();else break}};
const pralineShop=()=>shop18('Pâtissière Praline','patissiere','Des douceurs pour toi et tes créatures ! La Pomme d\'Amour, c\'est mon chef-d\'œuvre.',['barbapapa','pommamour','granita','biscuit','tartecycle'],{tartecycle:2500});
const fruitShop=()=>shop18('Marchande de fruits','granny','Des baies bien mûres, cueillies ce matin au Marais !',Object.keys(IT).filter(k=>k.startsWith('baie')),Object.fromEntries(Object.keys(IT).filter(k=>k.startsWith('baie')).map(k=>[k,IT[k][1]||400])));
const bazarShop=()=>shop18('Marchande Zahra','nomade2','Bienvenue au Bazar des Dunes ! Tout ce qu\'il faut pour survivre au désert… et un peu plus.',['sablecapsule','eauoasis','sirop','superrepousse','maxpotion','pierresable','dc_tempetesable','dc_coupsoleil']);
const paillShop=()=>shop18('Gérante Nalani','patissiere','Aloha ! Granités, Capsules et soleil. Le soleil, c\'est gratuit.',['granita','eauoasis','filetcapsule','festicapsule','megacapsule','superpotion','dc_geyser']);
async function berenTalk(){const F=f(),B='Sorcière Bérénice';
 if(!dgHas('feuille')){if(G.party.some(m=>['poupetronce','vaudoronce'].includes(m.sp))){await cine(1);await say('Oh ! Une de mes poupées ! Tu en prends bien soin, je le vois à ses coutures. Tiens, en échange : une cape tissée de feuilles du Marais.',B,0,'berenice');
   await dgGive('feuille','Tu reçois une CAPE DE FEUILLAGE ! Les créatures sauvages ne te remarqueront plus autant.');await cine(0);save();return}
  await say('Hi hi hi… Un visiteur. Mes poupées, les Poupétronce, se promènent la nuit dans le Marais. Montre-m\'en une, et je te coudrai une cape magique.',B,0,'berenice')}
 return shop18(B,'berenice','Potions, Capsules, et quelques… curiosités. Hi hi hi.',['sombrecapsule','sirop','superrepousse','hyperpotion','pierrelune','dc_cauchemar','dc_mascarade'])}
async function ferryTalk(at){const F=f(),C='Capitaine Corentin';if(!F.v18done)return say('Pas de traversée pendant le Carnaval ! Je danse toute la nuit, et j\'ai le mal de mer le lendemain. Reviens quand la fête sera calmée.',C,0,'captain');
 if(at==='carnavelle'){if(!await ask('Cap sur l\'Île Corail ? La traversée est offerte aux héros du Carnaval !',C))return;await fadeTo(1,300);sfx('splash');await wait(400);loadMap('corail',14,16,1);await fadeTo(0,300);save();return say('Terre ! L\'Île Corail ! Je t\'attends au ponton pour le retour.',C,0,'captain')}
 if(!await ask('Retour à Carnavelle ?',C))return;await fadeTo(1,300);sfx('splash');await wait(400);loadMap('carnavelle',7,17,3);await fadeTo(0,300);save()}
async function kaitoTalk(){const F=f(),K='Maître Kaito',n=['r3e','mac','coa'].filter(k=>F['t_'+k]).length;
 if(dgHas('ninja'))return say('Un vrai ninja ne se fait pas remarquer… sauf quand il le décide. Les dresseurs ne te voient plus : à toi de choisir tes combats.',K,0,'ninja');
 if(n<3)return say(`Tu veux apprendre l'art de l'ombre ? Bats d'abord mes trois élèves : Kenji dans les Gorges du Vent, Sora dans le Marais des Lucioles, Hana sur l'Île Corail. (${n}/3)`,K,0,'ninja');
 await cine(1);await say('Mes trois élèves… vaincus. Tu es prêt. Voici la tenue des ninjas de Carnavelle. Avec elle, aucun dresseur ne te remarquera.',K,0,'ninja');await dgGive('ninja','Tu reçois une TENUE DE NINJA !');await cine(0);save()}

// ---------------------------------------------------------------- DUNES, TOMBEAU, OASIS : la lampe, le génie et le gardien de la source
async function saidTalk(){const F=f(),S='Chef Saïd';if(dgHas('sable'))return say('Garde ta Tenue des Sables sur toi dans les dunes. Le Tombeau du Roi est au nord, l\'Oasis à l\'ouest. Que le vent te soit doux.',S,0,'nomade');
 if(!F.badge5)return say('Les Dunes d\'Ambre ne sont pas pour les promeneurs. Reviens avec le badge d\'Arlequin, et je te prêterai une Tenue des Sables.',S,0,'nomade');
 await cine(1);await say('Le Badge Masque. Arlequin t\'a jugé digne : je te juge digne aussi. Prends cette Tenue des Sables. Elle a traversé cent tempêtes.',S,0,'nomade');
 await dgGive('sable','Tu reçois une TENUE DES SABLES !');await say('Enfile-la (MENU, TENUES) avant d\'entrer dans la tempête, au nord. Sans elle, le vent te renverra ici.',S,0,'nomade');await cine(0);save()}
async function tombDoor(){await say('Une porte de pierre gravée d\'un soleil s\'ouvre dans la falaise. Un air frais et sec s\'en échappe.');return warp('tombeau',10,14,1)}
const TSN=['un soleil qui se lève, tourné vers l\'est','un soleil rayonnant, au plus haut','un soleil à moitié englouti, tourné vers l\'ouest','un croissant de lune entouré d\'étoiles'];
async function tombStatue(i){const F=f();if(F.v18tomb)return say(`Une statue de pierre. Sur son front : ${TSN[i]}. Elle semble sourire.`);
 const L=F.v18tst||[];if(L.includes(i))return say(`Une statue. Sur son front : ${TSN[i]}. Ses yeux brillent déjà.`);
 await say(`Une statue de pierre. Sur son front : ${TSN[i]}. Tu poses la main dessus…`);L.push(i);F.v18tst=L;
 if(L.some((v,k)=>v!==k)){F.v18tst=[];sfx('back');ui.shake=4;return say('Les yeux de la statue s\'allument en rouge, puis toutes les statues s\'éteignent. Ce n\'était pas le bon ordre. (La stèle, au centre, donne l\'ordre.)')}
 sfx('shard');ui.flash=.3;ui.flashC='#ffd860';await say('Les yeux de la statue s\'allument d\'une lueur dorée.');
 if(L.length===4){F.v18tomb=1;delete F.v18tst;await cine(1);sfx('roar');ui.shake=10;refreshMap(G.map);await say('Les quatre statues s\'illuminent ensemble. Au nord, le mur scellé s\'effondre dans un nuage de sable !');await cine(0);save()}}
async function cryptGuard(n){const F=f();await cine(1);await bang(n);sfx('roar');ui.shake=8;await say('Un Scorpharaon couronné se dresse devant le coffre du Roi ! Sa queue d\'or fend l\'air.');await cine(0);
 const r=await battle([mon('scorpharaon',44,{item:'baiesoin'})],{legend:1});if(r==='win'||r==='catch'){F.v18garde=1;await say(r==='catch'?'Le gardien du Roi rejoint ton équipe !':'Le gardien s\'enfonce dans le sable, vaincu.');save()}return r}
async function cryptChest(){const F=f();if(F.v18lamp)return say('Le coffre du Roi est vide.');if(!F.v18garde)return say('Le Scorpharaon gardien siffle dès que tu t\'approches du coffre.');
 await cine(1);F.v18lamp=1;G.bag.lampe=1;jingle('item');ui.pop={ic:ICO.lampe,t0:now()};await say('Dans le coffre du Roi des Sables : une LAMPE ANCIENNE, ternie par les siècles. Quelque chose remue à l\'intérieur…');
 await say('Une inscription sur le couvercle : « À l\'Oasis, sous la lune, rends-moi ma liberté. »');await cine(0);save()}
const oasiOk=()=>!!f().v18lamp&&!f().legO&&!G.coop?.lg?.oasiphant&&(phase()===0||phase()===2);
async function oasiphantEvent(n){const F=f();await cinema('oasis');await cine(1);await bang(n);await say('L\'eau de la source se soulève. Assis sur un tapis tissé de nuages, le gardien de l\'Oasis te regarde : OASIPHANT !');await cine(0);
 const r=await battle([mon('oasiphant',50,{item:'baiesoin'})],{legend:1});if(r==='win'||r==='catch'){F.legO=1;await say(r==='catch'?'Oasiphant rejoint ton équipe ! La source chante.':'Oasiphant replonge dans la source. L\'eau brille plus fort que jamais.');save()}return r}
async function aminaTalk(){const F=f(),A='Sage Amina';
 if(!F.v18lamp)return say('Le Roi des Sables avait deux trésors : un génie dans une lampe, et l\'amitié du gardien de la source. Il a emporté la lampe dans son tombeau… Le gardien, lui, ne se montre qu\'à l\'aube et au crépuscule, quand le soleil touche l\'eau.',A,0,'nomade2');
 if(F.legD||G.coop?.lg?.djinnflamme)return say('Le génie est libre. Il a tenu parole : le désert est plus doux depuis. Et le gardien de la source ? Il se montre à l\'aube et au crépuscule.',A,0,'nomade2');
 if(!night())return say('La Lampe Ancienne ! Le génie ne sortira que sous la lune. Reviens me voir la nuit, et nous la frotterons ensemble.',A,0,'nomade2');
 await say('La lune est haute. Frotte la lampe, doucement…',A,0,'nomade2');await cinema('djinn');await cine(1);sfx('roar');ui.shake=10;
 await say('Une fumée rouge jaillit de la lampe et prend forme : DJINNFLAMME, le génie du Roi des Sables ! « Mille ans dans une lampe ! Prouve-moi que tu mérites ton vœu ! »');await cine(0);
 const r=await battle([mon('djinnflamme',50,{item:'baiesoin'})],{legend:1});if(r==='win'||r==='catch'){F.legD=1;delete G.bag.lampe;await say(r==='catch'?'Djinnflamme rejoint ton équipe ! Son vœu : voyager à tes côtés.':'Djinnflamme s\'envole vers les dunes en riant. « Mon vœu ? Être libre ! Merci ! »');if(r==='win'){give('maxpotion',2);give('pierresable')}save()}return r}

// ---------------------------------------------------------------- LE GRAND BAL : Faustine revient, chaque nuit, sur la Place (après le chapitre)
MAPS.carnaval.npcs.push({x:15,y:19,t:'faustine',d:0,name:'Faustine',cond:()=>!!f().v18done&&!!f().v18faus&&night()&&f().v18bal!==dayN(),fn:n=>grandBal(n)});
async function grandBal(n){const F=f(),FA='Faustine',L=topLv();await cine(1);await bang(n);
 await say(F.v18baln?'Encore toi ! Le Grand Bal ne serait pas le Grand Bal sans notre petite danse. En piste !':'Le Grand Bal ! La musique, les masques… et toi. Je t\'avais promis une revanche. Ce soir, pas de clé, pas de complot : juste toi, moi, et la plus belle valse d\'Aurélys.',FA,0,'faustine');await cine(0);
 const r=await battle(team([['nocturaile',L-1],['possedrap',L-1],['deltamk',L],['ninjombre',L],['masquetotem',L+1,null,'orbe']]),{tr:{name:'Couturière Faustine',look:'faustine',money:8000,vs:1,boss:1,items:2,ev:1,after:'Encore battue… mais quelle danse !'}});
 if(r==='win'){F.v18bal=dayN();F.v18baln=(F.v18baln|0)+1;if(F.v18baln===1){give('masqueor');await say('Faustine te lance un MASQUE D\'OR en souriant. « Pour la prochaine fois. »')}else{give('pommamour',2);await say('Faustine te lance 2 Pommes d\'Amour. « À demain soir ! »')}save()}return r}

// ---------------------------------------------------------------- MADAME PROPHÉTIE (une prédiction par jour)
async function fortuneTalk(){const F=f(),P='Madame Prophétie',d=dayN();if(F.v18fo===d)return say('Une prédiction par jour, pas plus. L\'avenir, ça fatigue.',P,0,'berenice');
 F.v18fo=d;const sw=swarm(),L=[sw?`Je vois… des ${SP[sw[1]].name} en nombre, à ${MAPS[sw[0]]?.name.split(' · ')[0]}. Aujourd'hui seulement.`:'Je vois… un ciel calme. Profites-en pour pêcher.',
  'Je vois une créature aux couleurs rares sur ta route. Garde toujours une Capsule sous la main.','Je vois une vieille dame qui a besoin d\'aide. Ou un vieux monsieur. Ou un Ratounet. C\'est flou.','Je vois une grande victoire… et une petite défaite juste avant. C\'est normal.'],k=(d*7)%L.length;
 await cine(1);sfx('shard');await say('Madame Prophétie fait tourner sa boule de cristal. La Prophétoise ferme les yeux…',P,0,'berenice');await say(L[k],P,0,'berenice');
 const it=[['festicapsule',2],['barbapapa',2],['sirop',2],['granita',1]][d%4];give(it[0],it[1]);await say(`Et pour porter chance : ${IT[it[0]][0]} x${it[1]} !`,P,0,'berenice');await cine(0);save()}

// ---------------------------------------------------------------- OBJECTIFS DU JOURNAL
{const g18=goal;goal=function(){const g=f();if(g.starter&&g.badge4&&!g.obsScene){const c=c18Goal(g);if(c)return c}return g18()}}
function c18Goal(g){if(!g.v18vol)return null;
 return!g.v18arr?'Le voleur masqué a fui vers l\'ouest : traverse les Gorges du Vent jusqu\'à Carnavelle.':!dgHas('masque')?'Sans masque, pas de Carnaval : passe à l\'Atelier Mirella, au centre de Carnavelle.'
 :!g.v18ecoute?'Enfile ton masque (MENU, TENUES), entre sur la Place du Carnaval et tends l\'oreille près du Théâtre.':!g.badge5?'Bats Arlequin, le Champion de l\'Arène des Masques, sur la Place du Carnaval.'
 :!dgHas('eclipse')?'Retourne voir Mirella : elle peut te coudre un uniforme de la Team Éclipse.':!g.v18faus?'Déguisé en sbire, passe par les coulisses du Théâtre, entre dans le Repaire et retrouve la clé.'
 :!g.v18done?'Rapporte la clé du téléphérique à Ambroise, à Volterre.':null}
{const pg18=postGoal;postGoal=function(g){if(g.v18vol&&!g.v18done){const c=c18Goal(g);if(c)return c}const r=pg18(g);if(!g.v18done||!/^(Tu as tout|Complète le Pixédex)/.test(r))return r;
 const L=[[!g.v18partQ||g.v18partQ===1,'Le Maestro du Théâtre de Carnavelle a perdu sa partition. Le vent l\'a emportée vers le Marais des Lucioles.'],[!dgHas('sable'),'Le Chef Saïd, dans les Dunes d\'Ambre au nord de la Place du Carnaval, prête des Tenues des Sables.'],
  [!g.v18lamp,'Ouvre le Tombeau du Roi des Sables, au nord des Dunes : la stèle donne l\'ordre des statues.'],[!g.legD,'Frotte la Lampe Ancienne à l\'Oasis, chez la Sage Amina, une nuit de lune.'],[!g.legO,'Le gardien de l\'Oasis se montre à l\'aube et au crépuscule.'],
  [!dgHas('ninja'),'Bats les trois élèves de Maître Kaito (Gorges du Vent, Marais, Île Corail) pour obtenir la Tenue de Ninja.'],[!g.v18baln,'Une nuit, sur la Place du Carnaval, Faustine t\'attend pour le Grand Bal.']].find(x=>x[0]);return L?L[1]:r}}

// ---------------------------------------------------------------- CARTE DE LA RÉGION, ENVOL, BADGE, SUCCÈS, JOURNAL
{const q18=quests;quests=function(){const Q=quests18(q18),F=f();return Q}}
function quests18(q0){const Q=q0(),F=f();if(!F.v18vol)return Q;
 Q.push(['Le Carnaval des Masques',F.v18done?2:1,F.v18done?'La clé du téléphérique est rendue à Ambroise. Faustine court toujours… et danse au Grand Bal, la nuit, sur la Place du Carnaval.':c18Goal(F)||'Rapporte la clé du téléphérique à Ambroise.']);
 const nd=Object.keys(DG).filter(dgHas).length;if(nd)Q.push(['Garde-robe',nd>=5?2:1,`Déguisements : ${nd}/5. ${Object.keys(DG).filter(dgHas).map(k=>DG[k][0]).join(', ')}. Change de tenue depuis le MENU (TENUES).`]);
 if(F.v18done){Q.push(['Le Roi des Sables',F.legD&&F.legO?2:1,!dgHas('sable')?'Le Chef Saïd, au sud des Dunes d\'Ambre, prête des Tenues des Sables aux dresseurs qui ont le Badge Masque.':!F.v18lamp?'Le Tombeau du Roi des Sables s\'ouvre au nord des Dunes. Quatre statues gardent sa crypte.':!F.legD?'La Lampe Ancienne attend d\'être frottée à l\'Oasis, chez la Sage Amina, une nuit de lune.':!F.legO?'Le gardien de la source de l\'Oasis se montre à l\'aube et au crépuscule.':'Le génie est libre et le gardien de la source t\'a rencontré. Le désert te salue.']);
  if(F.v18partQ)Q.push(['La Partition Perdue',F.v18partQ===2?2:1,F.v18partQ===2?'La Valse des Masques résonne de nouveau au Théâtre.':'Le vent a emporté la partition du Maestro vers le Marais des Lucioles.']);
  const nk=['r3e','mac','coa'].filter(k=>F['t_'+k]).length;Q.push(['L\'art de l\'ombre',dgHas('ninja')?2:1,dgHas('ninja')?'Maître Kaito t\'a confié la Tenue de Ninja.':`Élèves de Maître Kaito battus : ${nk}/3 (Gorges du Vent, Marais des Lucioles, Île Corail).`])}
 return Q}
Object.assign(RMAP,{route3:[96,104,'GORGES DU VENT',12,3],carnavelle:[60,150,'CARNAVELLE',12,3],dunes:[44,98,'DUNES D\'AMBRE',-4,-12],marais:[70,214,'MARAIS',12,3],corail:[34,246,'ÎLE CORAIL',12,3]});
Object.assign(RINFO,{route3:['Route','mount','Des gorges battues par le vent entre Volterre et Carnavelle.'],carnavelle:['Ville','city','La cité du Carnaval des Masques. Grand Magasin, Atelier Mirella, Théâtre et Arène des Masques.'],
 dunes:['Désert','volcano','Des dunes d\'ambre sous une tempête éternelle. L\'Oasis de Sahra et le Tombeau du Roi des Sables.'],marais:['Marais','marsh','Un marais où brillent des milliers de lucioles. La sorcière Bérénice y vit.'],corail:['Île','reef','Une île de sable blanc et de totems, à une traversée de Carnavelle.']});
RLINK.push(['volterre','route3'],['route3','carnavelle'],['carnavelle','dunes'],['carnavelle','marais'],['carnavelle','corail']);RBADGE.carnavelle=['badge5','bMas'];
Object.assign(RELAIS,{carnavelle:[15,7],dunes:[27,17],corail:[14,14]});
Object.assign(EXZ,{route3:[31,['PLA','FEU'],['superpotion','hypercapsule','festicapsule','sirop'],['pierresable','ambre']],marais:[33,['EAU','PLA'],['hyperpotion','sombrecapsule','baiesoin','sirop'],['pierrelune','dc_cauchemar']],
 dunes:[38,['ROC','FEU'],['sablecapsule','eauoasis','maxpotion','superrepousse'],['scarabee','pierresable']],corail:[40,['EAU','NOR'],['granita','filetcapsule','coquillage','eauoasis'],['perle','pierreaube']]});
ACH.push(['v18a','Bal masqué','Retrouver la clé du téléphérique volée par Faustine.',()=>!!f().v18faus,['festicapsule',5]],['v18b','Cinq badges','Obtenir le Badge Masque d\'Arlequin.',()=>!!f().badge5,['pommamour',3]],
 ['v18c','Garde-robe complète','Posséder les cinq déguisements.',()=>Object.keys(DG).every(dgHas),['masqueor',1]],['v18d','Le Roi des Sables','Ouvrir la crypte du Tombeau et trouver la Lampe Ancienne.',()=>!!f().v18lamp,['scarabee',2]],
 ['v18e','Reine du Bal','Battre Faustine au Grand Bal.',()=>(f().v18baln|0)>=1,['granita',3]],['v18f','Star du défilé','Participer cinq fois au Concours de Costumes.',()=>(f().v18ccn|0)>=5,['festicapsule',10]]);
// --- Sauvegarde 18.0 : déguisement porté vérifié
{const norm18=normalize;normalize=function(g){g=norm18(g);if(!g)return g;if(g.dg&&(!DG[g.dg]||!g.keys?.['dg_'+g.dg]))g.dg=null;if((g.v||0)<18){g.wn=1;g.v=18}return g}}
const NEWS18=[[()=>ICO.dg_masque,'Le Carnaval des Masques','Après le Badge Volt, la clé du téléphérique est volée ! Gorges du Vent, Carnavelle et son Carnaval, le Grand Magasin, l\'Arène des Masques (5e badge) et le Repaire de la Team Éclipse, où il faut entrer déguisé.'],
 [()=>ICO.dg_sable,'Déguisements','MENU, TENUES : Masque de Carnaval, Uniforme Éclipse, Tenue des Sables, Cape de Feuillage et Tenue de Ninja. Chacun ouvre des lieux ou change les rencontres. Tes amis te voient déguisé.'],
 [()=>ICO.sablecapsule,'117 nouvelles créatures','Dunes d\'Ambre et Oasis, Tombeau du Roi des Sables, Marais des Lucioles et Île Corail : de nouvelles familles partout, et deux légendaires, Oasiphant et Djinnflamme.'],
 [()=>ICO.festicapsule,'Boutiques et défis','Grand Magasin sur deux étages, Bazar des Dunes, pâtisserie, sorcière, paillote ; Concours de Costumes quotidien, prédictions de Madame Prophétie et Grand Bal contre Faustine chaque nuit.']];   // placées en tête par z-v18-fin.js

// ---------------------------------------------------------------- CINÉMATIQUES
CINT.carnaval='Le Carnaval des Masques';CINT.mascarade='La fuite de Faustine';CINT.oasis='Le gardien de la source';CINT.djinn='Le génie de la lampe';
CINE.carnaval=async A=>{const s={fw:[],lit:0,mk:0};A.m('carnaval');
 A.shot((g,T)=>{cnSky(g,[[0,'#140c2a'],[.6,'#3a1a4a'],[1,'#a84a6a']]);cnStars(g,T,60,150,.8);
  for(const f2 of s.fw){const k=(T-f2.t)/1200;if(k<0||k>1)continue;for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=k*f2.r;g.globalAlpha=1-k;R(g,f2.c,ev(f2.x+Math.cos(a)*r),ev(f2.y+Math.sin(a)*r+k*k*20),3,3)}g.globalAlpha=1;cnGlow(g,f2.x,f2.y,40*(1-k),f2.c,.5*(1-k))}
  const B=[[20,60,90],[90,40,120],[150,70,80],[240,50,140],[300,64,96],[380,44,110],[430,60,90]];for(const[x,w,h]of B){R(g,'#1a1028',x,262-h,w,h);R(g,'#2a1838',x,262-h,w,3);for(let yy=262-h+10;yy<256;yy+=14)for(let xx=x+6;xx<x+w-8;xx+=12)R(g,(xx*7+yy*3)%5<s.lit*5?'#ffd870':'#2a2040',xx,yy,6,7)}
  R(g,'#0e0818',0,262,W,H);for(let i=0;i<24;i++){const x=i*21,y=96+Math.sin(i*.8)*8;R(g,'#3a2a3a',x,y,21,1);if(s.lit>.3){const c=['#ff8ab8','#ffd860','#8ad8ff'][i%3];R(g,c,x+8,y+2,5,6);cnGlow(g,x+10,y+5,14,c,.6*s.lit)}}
  if(s.mk>0){g.globalAlpha=Math.min(1,s.mk);for(let i=0;i<5;i++){const x=70+i*86,y=200+Math.sin(T/400+i)*6;cnDisc(g,x,y,18,['#e84a6a','#ffd860','#7ae0ff','#c87aff','#ffffff'][i]);R(g,'#1a1028',x-9,y-4,6,4);R(g,'#1a1028',x+3,y-4,6,4)}g.globalAlpha=1}},[240,160,1]);
 await A.sub('La nuit tombe sur Carnavelle, la cité aux mille masques…');A.s('shard');await A.tw(s,'lit',1,1800,0);
 for(let i=0;i<5;i++){s.fw.push({x:60+i*90,y:50+(i%2)*30,r:50+i*6,c:['#ff5a8a','#ffd23a','#5ad0ff','#7ae07a','#c87aff'][i],t:now()});A.s('hit');A.q(2);await A.w(380)}
 await A.tw(s,'mk',1,900,0);await A.sub('Ce soir commence le Carnaval des Masques. Tout le monde porte un masque… même ceux qui ont quelque chose à cacher.');await A.card('CARNAVELLE','Le Carnaval des Masques',2400)};
CINE.mascarade=async A=>{const s={smk:0,mk:0,f:1,sp:0};A.m('base');
 A.shot((g,T)=>{cnSky(g,[[0,'#0c0e18'],[1,'#2a1a3a']]);for(let x=0;x<W;x+=40)R(g,'#1a1c28',x,0,4,H);R(g,'#2a2a3a',0,250,W,H);
  if(s.f>0){g.globalAlpha=s.f;cnSpr(g,PEO.faustine?.bt,240,180,128,128);g.globalAlpha=1}
  for(let i=0;i<12;i++){const k=Math.min(1,s.mk*1.4-i*.05);if(k<=0)continue;const x=240+Math.cos(i*2.1)*k*200,y=170+Math.sin(i*1.3)*k*110+k*k*60;g.save();g.translate(x,y);g.rotate(k*6+i);R(g,['#e84a6a','#ffd860','#f0f0f0','#c87aff'][i%4],-10,-6,20,12);R(g,'#1a1028',-6,-3,4,3);R(g,'#1a1028',2,-3,4,3);g.restore()}
  if(s.smk>0){g.globalAlpha=Math.min(.9,s.smk);for(let i=0;i<14;i++)cnDisc(g,240+Math.cos(i*1.7+T/600)*s.smk*120,190+Math.sin(i*2.3+T/700)*s.smk*50,26+s.smk*30,i%2?'#d8d0e8':'#a898c0');g.globalAlpha=1}},[240,170,1.15]);
 await A.sub('Ce n\'est qu\'un au revoir. Le Carnaval n\'est pas fini… et moi non plus !','Faustine');A.s('roar');A.q(6);A.tw(s,'smk',1.2,1400,0);await A.w(500);A.tw(s,'f',0,900,0);await A.tw(s,'mk',1,1600,0);A.fl(.4,'#e8a8ff');
 await A.sub('Une pluie de masques retombe sur le bureau. Quand la fumée se dissipe, Faustine a disparu.');await A.w(400)};
CINE.oasis=async A=>{const s={sun:0,rise:0,wv:0};A.m('sanct');
 A.shot((g,T)=>{cnSky(g,[[0,'#3a4a8a'],[.6,'#e8906a'],[1,'#ffd8a0']],0,180);cnDisc(g,240,170-s.sun*30,26,'#fff0b0');cnGlow(g,240,170-s.sun*30,90,'rgba(255,220,150,.9)',.7);
  R(g,'#d8a860',0,180,W,H);for(let i=0;i<5;i++)cnRidge(g,i*2+1,190+i*8,6,['#c89850','#b88840','#a87830','#d8b070','#c8a060'][i],T/900*(i+1),4);
  pell(g,240,236,150,26,'#3a8ab8');pell(g,240,234,140,20,'#5ab0d8');for(let i=0;i<10;i++)R(g,'#c8f0ff',ev(130+i*24+Math.sin(T/300+i)*4),ev(232+(i%3)*4),10,2);
  if(s.rise>0){const y=250-s.rise*100;cnGlow(g,240,y,80,'rgba(120,220,255,.9)',s.rise*.7);cnSpr(g,cnMon('oasiphant',128),240,y,128,128,{a:Math.min(1,s.rise*1.4)});for(let i=0;i<3;i++)cnEmit(1,{x:240+(Math.random()-.5)*120,y:236,a0:-1.9,a1:-1.2,v0:2,v1:4,g:.12,c:['#c8f0ff','#ffffff'],l:30})}},[240,160,1]);
 await A.sub('Le soleil effleure la source de l\'Oasis. L\'eau se met à frémir…');await A.tw(s,'sun',1,1500,0);A.s('roar');A.q(5);A.n(2,.6,600,60);await A.tw(s,'rise',1,2200,0);await A.sub('Le gardien de la source se dresse au-dessus des eaux !');await A.w(300)};
CINE.djinn=async A=>{const s={sm:0,dj:0};A.m('ecl');
 A.shot((g,T)=>{cnSky(g,[[0,'#0a0818'],[1,'#2a1a3a']]);cnStars(g,T,90,200,1);cnDisc(g,380,60,18,'#f0f0ff');cnGlow(g,380,60,50,'rgba(220,220,255,.8)',.5);R(g,'#2a2030',0,240,W,H);
  R(g,'#a87a30',224,226,32,14);R(g,'#d8b050',228,222,24,6);R(g,'#d8b050',254,228,14,4);
  if(s.sm>0){for(let i=0;i<16;i++){const k=i/16,y=222-k*150*s.sm,x=236+Math.sin(k*9+T/200)*20*k;g.globalAlpha=.7*(1-k);cnDisc(g,x,y,6+k*22,i%2?'#c84050':'#e86a50');g.globalAlpha=1}}
  if(s.dj>0){cnGlow(g,240,110,90,'rgba(255,120,80,.9)',s.dj*.6);cnSpr(g,cnMon('djinnflamme',128),240,110,128,128,{a:s.dj})}},[240,160,1]);
 await A.sub('Tu frottes la Lampe Ancienne. Une fois. Deux fois. Trois fois…');A.s('shard');await A.tw(s,'sm',1,1600,0);A.s('roar');A.q(8);A.fl(.6,'#ff8a5a');await A.tw(s,'dj',1,900,0);await A.sub('« ENFIN LIBRE ! »','???');await A.w(300)};
