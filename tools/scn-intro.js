// Introduction jouable : réveil, gros plans, sac à préparer, sortie bloquée puis départ, retour à la maison.
async()=>{const L=(...a)=>console.log('LOG',...a);const snapP=async(n,fn)=>{AUTO.off=true;const p=fn();await wait(700);await SNAP(n);AUTO.off=false;await p};
 L('debut',G.map,G.x,G.y,f().intro);await SNAP('chambre');
 await snapP('photo',()=>closeUp('photo1',2,1));await snapP('carnet',()=>closeUp('carnet',4,1));await telescopeAct();
 await pcAct();await dresserAct();L('prep',f().hSac,f().hCarte,f().hCap);
 await pwalk('rrrrru');L('pos',G.map,G.x,G.y);G.dir=1;await interact?.();await wait(200);
 // escaliers
 if(G.map!=='salon'){loadMap('salon',1,2,0);await homeEnter()}L('salon',G.map,f().salon1);await SNAP('salon');
 G.x=5;G.y=6;G.dir=0;await leaveHome();L('bloque',G.map,f().intro);
 await louTalk(MAPS.salon.npcs[1]);L('indice',f().louHint);loadMap('chambre',8,4,1);await plantAct();L('cap',f().hCap,f().prepOk);
 await snapP('tv',()=>closeUp('tv',9,1));await coatAct();L('cle',G.keys.cleE);
 loadMap('salon',5,6,0);await leaveHome();L('parti',G.map,f().intro,G.bag.potion,G.keys.boussole,f().mem);await SNAP('bourg');
 // retour : Maman soigne, la chambre donne accès au repos
 await warp('salon',5,6,1);L('retour',G.map,MAPS.salon.npcs[0].x,MAPS.salon.npcs[0].y);
}
