// =====================================================================
// 13.1 — DÉCORS : jardins, clôtures, boîtes aux lettres, bancs, jardinières… (rendu dans world.js)
// | clôture bois · + clôture blanche · P buisson fleuri (champignon en forêt) · p potager · N banc (2 cases)
// * jardinière (2 cases) · & tonneau/caisses · m pot de fleurs · M boîte aux lettres · V distributeur · O puits (2x2) · % fontaine (4x3)
// =====================================================================
for(const k of['bourg','ville','foret','lac','coteaux','lunevie','bois','route2','volterre'])if(MAPS[k])MAPS[k].lily=1;
// Pose sur l'herbe libre uniquement, jamais sur un PNJ, une porte, un objet caché, un panneau ou une case d'action
function deco(k,list){const M=MAPS[k];if(!M)return;const busy=new Set([...(M.npcs||[]).map(n=>n.x+','+n.y),...Object.keys(M.doors||{}),...Object.keys(M.hidden||{}),...Object.keys(M.signs||{}),...Object.keys(M.acts||{})]),rows=M.rows.map(r=>[...r]);
 for(const[x,y,s]of list)[...s].forEach((c,i)=>{const xx=x+i;if(c===' ')return;if(rows[y]?.[xx]!=='.'||busy.has(xx+','+y)){(window.DECOREF??=[]).push([k,xx,y]);return}rows[y][xx]=c});
 M.rows=rows.map(r=>r.join(''));M.rows0=null}
deco('bourg',[[2,1,'PfPfP'],[7,5,'M'],[12,6,'+++'],[16,6,'++'],[4,9,'||||'],[2,9,'P'],[6,12,'NN'],[16,12,'PP']]);
deco('ville',[[12,5,'**'],[15,5,'**'],[3,5,'P'],[8,5,'P'],[18,2,'OO'],[18,3,'OO'],[11,15,'NN'],[18,15,'PP'],[15,1,'&'],[19,1,'&']]);
deco('port',[[17,5,'**'],[20,5,'**'],[4,5,'P'],[8,5,'P'],[14,12,'&&'],[21,11,'&'],[2,11,'P']]);
deco('lunevie',[[17,2,'+++'],[17,3,'ppp'],[17,4,'ppp'],[17,5,'+++'],[6,16,'NN'],[16,19,'P P'],[17,12,'**']]);
deco('volterre',[[21,6,'VV'],[6,8,'NN'],[22,12,'**'],[9,18,'NN'],[3,18,'**']]);
deco('coteaux',[[20,11,'|||'],[13,4,'ppppp'],[15,14,'NN']]);
deco('route1',[[2,9,'||||||'],[14,9,'||']]);
deco('foret',[[2,3,'P'],[2,6,'P'],[14,6,'P'],[21,6,'P'],[12,12,'P'],[20,12,'P']]);
deco('lac',[[19,2,'PP'],[10,11,'NN'],[2,13,'P']]);
deco('route2',[[2,14,'P'],[7,9,'NN'],[21,6,'P']]);
// 13.2 — la Citadelle est un sanctuaire de pierre, pas une salle technique
if(MAPS.citadelle)MAPS.citadelle.style='cit';
// 13.2 — maisons meublées : lit, commode, tapis d'entrée, cadres et fenêtres (les meubles ne se posent que sur des cases 'C')
function furnish(k,rows,furn,wdeco){const M=MAPS[k];if(!M)return;rows.forEach((r,y)=>{if(r)M.rows[y]=r});M.rows0=null;M.furn=[...(M.furn||[]),...furn];M.wdeco=[...(M.wdeco||[]),...wdeco]}
furnish('maisonP',[,'XCCFFFCCX',,'XCFFCCFFX','XCFFCCFFX','XFFrrrFCX'],[{x:7,y:1,k:'plantPot'},{x:1,y:3,h:2,k:'bed'},{x:7,y:5,k:'crate2'}],[{x:3,k:'calendar'},{x:5,k:'frameB'}]);
furnish('maisonA',[,'XCCFFFCCX',,'XCFFCCFFX',,'XCFrrrFCX'],[{x:7,y:1,k:'potPlant'},{x:1,y:3,k:'dresser'},{x:1,y:5,k:'lampFloor'},{x:7,y:5,k:'vase'}],[{x:3,k:'frameA'},{x:5,k:'frameC'}]);
furnish('lacH',[,'XCCFFFCCX',,'XCFFCCFFX','XCFFCCFFX','XFFrrrFCX'],[{x:1,y:3,h:2,k:'bed'},{x:7,y:5,k:'potPlant'}],[{x:3,k:'frameB'},{x:5,k:'calendar'}]);
furnish('recifH',[,,,'XCFFCCFFX','XCFFCCFFX','XFFrrrFCX'],[{x:1,y:3,k:'crate'},{x:1,y:4,k:'crate2'},{x:7,y:5,k:'barrel'}],[{x:3,k:'frameC'},{x:5,k:'windowN'}]);
furnish('maisonY',[,,,,,'XCFFFFFCX'],[{x:7,y:5,k:'lampFloor'}],[{x:5,k:'calendar'}]);
furnish('dome',[],[{x:1,y:1,k:'telescope'}],[3,4,7,8].map(x=>({x,k:'windowN'})));
furnish('citadelle',[],[],[2,4,8,10].map(x=>({x,k:'torch',y:0})));
// 13.2 — ambiances : bois hanté (brume, feux follets, tombes), cristaux luisants dans les grottes profondes
if(MAPS.bois){MAPS.bois.spooky=1;MAPS.bois.fog=1}
for(const k of['grotte','galeries','faille'])if(MAPS[k])MAPS[k].crys=1;
deco('bois',[[8,1,'t'],[11,1,'t'],[19,4,'t'],[21,4,'t'],[8,12,'t'],[14,12,'t'],[2,3,'t']]);
