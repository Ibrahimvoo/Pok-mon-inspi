// =====================================================================
// 18.2 — CONFORT DE JEU : quelques pas de répit après chaque combat (plus de combats coup sur coup), conseil de course.
// Le reste de la version 18.2 est dans le moteur : fonds de combat prolongés proprement (bgArt), taux de rencontres
// revus (encRoll), créatures visibles tenues hors des couloirs (roomy), course automatique (running), cartes élargies.
// =====================================================================
{const bt182=battle;battle=async function(...a){try{return await bt182.apply(this,a)}finally{ENCR=Math.max(ENCR,rnd(6,9))}}}
{const st182=onStep;onStep=async function(...a){if(G&&steps===25)tip('course',(G.opt?.run??(TOUCH?1:0))?'Tu cours automatiquement. Maintiens B pour marcher. (MENU, OPTIONS, OPTIONS DU JEU : COURSE)':'Maintiens B (Échap) en marchant pour courir. Sur écran tactile, l\'option COURSE : TOUJOURS fait courir sans rien tenir.');return st182.apply(this,a)}}
