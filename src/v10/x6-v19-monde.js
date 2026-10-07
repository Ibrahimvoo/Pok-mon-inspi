// =====================================================================
// 19 — LE MONDE SE SOUVIENT : la Grotte Écho porte bien son nom. Trois pierres veinées de bleu gardent les voix de ceux qui
// sont passés par là : Kael enfant cherchant son frère, Valen faisant une promesse à Brume, Sélène choisissant de le suivre.
// Rien à gagner, sinon comprendre qui est vraiment Vex.
// =====================================================================
{const do19m=drawObj;drawObj=function(k,sx,sy,t,n){if(k!=='echo19')return do19m(k,sx,sy,t,n);const done=n&&f()['v19ec'+n.e19],p=.25+.2*Math.sin(t/400+(n?.e19||0));
 X.drawImage(SHD2,sx+4,sy+24,24,7);glowAt(sx+16,sy+12,done?18:34,done?.12:p);R(X,C.ink,sx+6,sy+6,20,20);R(X,'#5a6478',sx+7,sy+7,18,18);R(X,'#7a86a0',sx+8,sy+8,8,6);
 R(X,done?'#5a7aa0':'#7ac8ff',sx+12,sy+10,2,12);R(X,done?'#5a7aa0':'#7ac8ff',sx+14,sy+15,7,2);R(X,done?'#5a7aa0':'#aee0ff',sx+19,sy+12,2,4);if(!done&&(t/180|0)%6===0)R(X,'#ffffff',sx+20,sy+8,2,2)}}
const ECHO19=[{x:3,y:12,v:[['Une voix d\'enfant, aiguë, paniquée : « Valen ? VALEN ! Réponds-moi ! Je sais que tu es là ! »'],['Une voix de vieille dame, très douce : « Kael, mon grand… Rentre. Il fait noir. Ton frère reviendra quand il sera prêt. »'],['« Il a promis de m\'apprendre à pêcher… Il a PROMIS ! »']],
  end:'L\'écho s\'éteint. Kael avait dix ans. Il a cherché son frère jusqu\'ici, tout seul, dans le noir.'},
 {x:18,y:12,v:[['Une voix de jeune homme, cassée : « Brume… Tu m\'entends ? Je te le promets. Je vais réparer le ciel. »'],['« Plus jamais un jour trop long ne te volera. Plus jamais. »'],['Un tout petit cri d\'Ombrelin résonne, très loin… puis plus rien.']],
  end:'L\'écho s\'éteint. Ce garçon-là n\'était pas encore Vex. Juste un frère, et quelqu\'un qui avait perdu son meilleur ami.'},
 {x:9,y:3,v:[['Une voix de femme, calme : « Tu es sûr de toi, Valen ? Briser un sceau que les fondateurs ont posé… »'],['« Non. Mais si on ne fait rien, qui le fera ? Les créatures de l\'ombre s\'éteignent une à une, Sélène. »'],['Un long silence. Puis : « …Alors je viens avec toi. Quelqu\'un doit veiller sur toi. »']],
  end:'L\'écho s\'éteint. Sélène ne l\'a jamais suivi par conviction. Elle l\'a suivi pour qu\'il ne soit pas seul.'}];
ECHO19.forEach((E,i)=>MAPS.grotte.npcs.push({x:E.x,y:E.y,t:'obj',k:'echo19',e19:i,fn:()=>echo19(i)}));
async function echo19(i){const E=ECHO19[i],F=f();if(F['v19ec'+i])return say('La pierre est silencieuse. Elle a déjà tout dit.');await cine(1);
 await say('Une pierre veinée de bleu. Tu poses la main dessus… Elle vibre, et la grotte entière se met à murmurer.');sfx('shard');ui.flash=.5;ui.flashC='#7ac8ff';await wait(300);
 for(const[l]of E.v){await say(l);await wait(150)}F['v19ec'+i]=1;await say(E.end);
 const n=[0,1,2].filter(j=>F['v19ec'+j]).length;if(n===3&&!F.v19ecall){F.v19ecall=1;const ld=G.party.find(alive);if(ld)bondUp(ld,2);await say('Les trois pierres se sont tues. Tu comprends un peu mieux le garçon qui est devenu Vex… et pourquoi Kael ne renoncera jamais à lui.')}
 else if(n<3)await say(`Pierres d'écho : ${n}/3. D'autres voix attendent quelque part dans la grotte.`);await cine(0);save()}
{const M=MAPS.grotte,e0=M.enter;M.enter=async function(){if(e0)await e0.apply(this,arguments);if(f().starter)tip('echo','On dit que les pierres bleues de la Grotte Écho gardent les voix de ceux qui sont passés par là. Approche-toi et appuie sur A.')}}
{const q19m=quests;quests=function(){const Q=q19m(),F=f(),n=[0,1,2].filter(j=>F['v19ec'+j]).length;if(n)Q.push(['Les échos de la grotte',n>=3?2:1,n>=3?'Tu as entendu Kael, Valen et Sélène. La Grotte Écho n\'a plus rien à dire.':`${n}/3 pierres d'écho écoutées dans la Grotte Écho.`]);return Q}}
