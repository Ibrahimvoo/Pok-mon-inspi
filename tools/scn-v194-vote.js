// Test 19.4 (aventure à plusieurs, deux navigateurs) : dans la Faille, Alice parle à Corvin ; Bob suit la scène.
// Vote « Corvin » : Alice dit VA-T'EN, Bob IL EST ENCORE TEMPS → égalité, le sort tranche, le même résultat pour les deux.
// Puis Caïus en combat de groupe : chacun trouve ses propres mots quand Caïus envoie sa dernière créature.
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX&&!ui.text,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 // en combat de groupe, après un K.O. : envoyer une créature encore debout (le pilote automatique choisirait la première)
 const tpick=m=>{const C=CB||CBG,T=C?.D?.[C.me]?.T;if(T&&m.opts?.length===T.length&&T.every((x,i)=>m.opts[i]===nm(x))){const i=T.findIndex(x=>x.hp>0);return i<0?null:i}return null};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const setup=async(nm,lk,x)=>{{const op0=AUTO.pick;AUTO.pick=m=>tpick(m)??op0(m)}G.coop={code:'VOTE',t0:Date.now(),mates:{}};SLOT='c:VOTE';Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,
   v18vol:1,v18arr:1,v18done:1,v18faus:1,obsScene:1,bar:1,selene2done:1,vex2:1,balance:1,legS:1,legN:1,v19rec2:1,v191sel:1,v191d:3,v19cor:2,failleQ:1,failleIn:1,tip_evr:1});
  G.keys.dex=1;G.party=[mon('torrentor',90),mon('brasilion',90)];G.net={n:nm,lk};G.repel=9999;for(const M2 of Object.values(MAPS))M2.npcs=M2.npcs.filter(n=>!n.fauna);loadMap('faille',x,3,3);await wait(400)};
 return{
 A:async()=>{await setup('Alice','girl',13);NET.join('VOTE');ok(await until(()=>isAdvMate(peer('Bob'))&&peer('Bob').dv===NETDV()),'Bob dans l\'aventure');await BAR('in');
  const op=AUTO.pick;AUTO.pick=m=>m.opts?.[0]==='IL EST ENCORE TEMPS'?1:op(m);
  G.x=13;G.y=3;G.dir=3;await run(()=>interact());await until(idle,60000);AUTO.pick=op;
  ok(f().v193cor&&SAID.some(s=>/Égalité ! Le sort a choisi/.test(s))&&SAID.some(s=>/Alice : VA-T'EN/.test(s)&&/Bob : IL EST ENCORE TEMPS/.test(s)),'vote Corvin : égalité, le sort tranche ('+f().v193cor+')');
  const b=await BAR('corvin',{cor:f().v193cor});ok(b.cor===f().v193cor,'le même résultat pour Alice et Bob');
  G.x=14;G.y=3;G.dir=3;await run(()=>interact());await until(idle,90000);ok(f().failleDone&&f().v193w?.includes('LA PEUR')&&(f().v193d|0)>=3,'Alice : ses mots pour Caïus en combat de groupe ('+f().v193w+')');
  const c=await BAR('caius',{d:f().v193d|0});ok(c.d>=3,'Bob a trouvé ses mots lui aussi ('+c.d+')');await BAR('fin');NET.leave();L('done')},
 B:async()=>{await setup('Bob','scout',12);NET.join('VOTE');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>!!f().v193cor&&idle(),90000),'Bob a suivi la scène et voté');const a=await BAR('corvin',{cor:f().v193cor});ok(a.cor===f().v193cor,'Bob : même résultat que le groupe');
  ok(await until(()=>!!f().failleDone&&idle(),150000),'Bob a combattu Caïus avec Alice');ok(f().v193w?.includes('LA PEUR'),'Bob : ses propres mots ('+f().v193w+')');
  await BAR('caius',{d:f().v193d|0});await BAR('fin');NET.leave();L('done')}}})()
