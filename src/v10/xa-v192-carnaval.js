// =====================================================================
// Version 19.2 : le Carnaval revisité
//  - le voleur masqué (celui de la clé, à Volterre) se cache parmi quatre danseurs de la Place : observer, puis accuser (3 essais)
//    démasqué (v192v=2) : combat contre Pipo, il rend l'Orbe de Faustine (son Masquetotem ne l'a plus) et Barnabé l'embarque
//    enfui (v192v=3) : Faustine est prévenue et garde un objet de plus
//  - Mirella confie que Faustine était son apprentie (v192mi) ; après le combat : « Que dis-tu à Faustine ? » (v192fa 1/2/3)
//  - conséquences : Barnabé, Mirella après le chapitre, et l'épilogue de la fin
// =====================================================================
const DN192=[[11,17,'Danseur au masque de lune','rouge',0,1,'il'],[19,18,'Danseur au masque de soleil','bleue',1,1,'il'],[12,11,'Danseur au masque de chat','rouge',1,1,'il'],[17,21,'Danseuse au masque d\'oiseau','rouge',1,0,'elle']];
const DNX192=['Moi ? Un voleur ? Je suis pâtissier ! Regarde, j\'ai encore du sucre glace sous le masque.','Quelle honte ! Je danse au Carnaval depuis quarante ans ! Mes étincelles viennent des feux d\'artifice, figure-toi.',null,'Accuser une dame qui danse ? Ton costume est joli, mais tes manières, beaucoup moins !'];
async function dancer192(i){const F=f(),[,,N,p,g,h,il]=DN192[i];await cine(1);
 await say(`Tu observes discrètement : une plume ${p} sur le masque, des gants ${g?'couverts de poudre d\'étincelles':'tout propres'}, et ${h?`${il} fredonne un air entêtant`:`${il} ne fait aucun bruit`}.`);
 const c=await choose(['L\'ACCUSER','LAISSER'],{w:200,title:N});if(c!==0){await cine(0);return}
 if(i!==2){F.v192e=(F.v192e|0)+1;await say(DNX192[i],N,0,'dgmasque');
  if(F.v192e>=3){F.v192v=3;await say('Pendant que tu accusais un innocent, le danseur au masque de chat s\'est éclipsé dans la foule… Le voleur a filé !');await say('Il est parti ! Il va sûrement tout raconter à sa cheffe…','Petit Léo',0,'kid')}
  else await say(`Raté ! Il te reste ${3-F.v192e} essai${3-F.v192e>1?'s':''} avant que le voleur ne file. Relis bien les indices de Léo.`);await cine(0);save();return}
 await say('Le danseur au masque de chat sursaute… puis arrache son masque : c\'est un sbire de la Team Éclipse !');
 await say('Pipo, pour vous servir ! Enfin, pour servir Faustine. La clé du téléphérique ? Déjà livrée à la patronne, hé hé ! Et toi, tu vas danser… avec mes créatures !','Pipo le voleur',0,'grunt');await cine(0);
 const r=await battle(team([['hyenou',34],['chatoeil',35]]),{tr:{name:'Pipo le voleur',look:'grunt',money:1500,after:'Pas les gants ! Ils sont neufs !'}});if(r!=='win'){save();return r}
 F.v192v=2;await cine(1);await say('D\'accord, d\'accord ! La clé est au Repaire, sous le Théâtre, dans le bureau de Faustine. Et ça… c\'est l\'Orbe de son Masquetotem. Je l\'avais « emprunté ». Prends-le, il me porte malheur.','Pipo le voleur',0,'grunt');
 give('orbe',1);jingle('item');await say('Tu récupères l\'ORBE de Faustine ! Son Masquetotem sera moins redoutable.');
 await say('Pipo ! Au nom de la loi du Carnaval, tu es… euh… arrêté ! Merci, jeune dresseur.','Commissaire Barnabé',0,'sailor');await cine(0);save();return r}
{const M=MAPS.carnaval;DN192.forEach(([x,y,N],i)=>M.npcs.push({x,y,t:'dgmasque',d:[0,3,2,1][i],name:N,cond:()=>f().v192v===1&&!f().v18faus,fn:()=>dancer192(i)}));
 M.npcs.push({x:16,y:9,t:'kid',d:0,name:'Petit Léo',cond:()=>!!f().v192v&&!f().v18done,say:()=>{const v=f().v192v;return v===1?`Le voleur : plume ROUGE, gants pleins de poudre d'ÉTINCELLES, et il FREDONNE. Il se cache parmi les quatre danseurs masqués !${f().v192e?` (encore ${3-f().v192e} essai${3-f().v192e>1?'s':''})`:''}`:v===2?'Tu l\'as démasqué ! Quand je serai grand, je serai détective. Ou danseur. Ou les deux !':'Il a filé… La prochaine fois, on l\'aura !'}});
 const e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);const F=f();if(!F.v18arr||F.v192v||F.v18faus||F.v18done)return;F.v192v=1;await cine(1);sfx('alert');
  await say('Hé ! Toi, avec le masque ! J\'ai vu le voleur de Volterre, celui de la clé ! Il est ici, déguisé en danseur !','Petit Léo',0,'kid');
  await say('Il avait une plume ROUGE sur le masque, des gants pleins de poudre d\'ÉTINCELLES… et il FREDONNE tout le temps. Il se cache parmi les quatre danseurs masqués de la Place. Démasque-le ! Mais si tu te trompes trop souvent, il filera.','Petit Léo',0,'kid');
  tip('v192v','Observe chaque danseur (A), puis accuse celui qui correspond aux trois indices. Trois erreurs, et le voleur s\'enfuit.');await cine(0);save()}}
{const cg=c18Goal;c18Goal=function(g){if(g.v192v===1&&g.v18arr&&!g.v18ecoute&&!g.v18faus)return'Le voleur masqué se cache parmi les danseurs de la Place du Carnaval : plume rouge, gants pleins d\'étincelles, il fredonne. Démasque-le !';return cg(g)}}
// Mirella : Faustine était son apprentie ; après le chapitre, la réponse de Faustine
{const mt=mirellaTalk;mirellaTalk=async function(){const F=f(),M='Mirella';
 if(F.v192fa===1&&F.v18faus&&!F.v192mr){F.v192mr=1;await cine(1);await say('Faustine m\'a écrit. Juste quatre mots : « Garde-moi ma place. » Je ne sais pas ce que tu lui as dit… Merci. Prends ça : c\'est elle qui l\'avait taillée, autrefois.',M,0,'mirella');
  give('pierrechance',1);jingle('item');await say('Tu reçois une Pierre Chance !');await cine(0);save();return}
 const r=await mt.apply(this,arguments);
 if(dgHas('eclipse')&&!F.v18faus&&!F.v192mi){F.v192mi=1;await say('Et si tu croises Faustine… dis-lui que sa place à l\'atelier l\'attend toujours. Son dé à coudre aussi.',M,0,'mirella');save()}return r}}
async function faustineWords192(F){const O=F.v192mi?['MIRELLA T\'ATTEND','RENDS-TOI !']:['RENDS-TOI !','POURQUOI ?'],FA='Faustine',c=await voteLabel(O,{w:280,title:'Que dis-tu à Faustine ?',all:['MIRELLA T\'ATTEND','RENDS-TOI !','POURQUOI ?']});
 if(c==='MIRELLA T\'ATTEND'){F.v192fa=1;await say('… Mirella ? Elle a dit ça ? Après tout ce que j\'ai fait ?',FA,0,'faustine');await say('Elle a gardé mon dé à coudre, je parie. Elle garde tout. … Ne la fais pas attendre pour moi. Je lui dirai moi-même. Un jour.',FA,0,'faustine')}
 else if(c==='POURQUOI ?'){F.v192fa=3;await say('Pourquoi ? Parce que Vex m\'a promis une robe taillée dans la nuit elle-même. Demande donc à ma chère Mirella ce que ça fait, d\'être oubliée.',FA,0,'faustine')}
 else{F.v192fa=2;await say('Me rendre ? À un enfant déguisé ? Le rideau tombe, petit. Mais pas sur moi.',FA,0,'faustine')}}
{const bt=barnabeTalk;barnabeTalk=async function(){const F=f();if(F.v192v===2&&!F.v192ba){F.v192ba=1;await cine(1);await say('Pipo est au violon ! Il chante l\'hymne de la Team Éclipse à tue-tête, c\'est insupportable. Tiens, pour ton aide.','Commissaire Barnabé',0,'sailor');
  give('festicapsule',3);await say('Tu reçois 3 Festi Capsules !');await cine(0);save()}return bt.apply(this,arguments)}}
