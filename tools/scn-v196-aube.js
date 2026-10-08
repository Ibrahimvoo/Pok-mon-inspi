// Test (aventure à plusieurs, deux navigateurs) : Alice affronte Crépuscel au Sanctuaire, Bob suit la scène et rejoint le combat.
// Les deux vivent ensuite la première aube partagée (v193fin).
(()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)},until=async(c,ms=30000)=>{const t=Date.now();while(!c()&&Date.now()-t<ms)await wait(30);return c()};
 const idle=()=>mode==='world'&&!busy&&!CBG&&!CB&&!CBJ&&!SCX&&!ui.text,peer=nm=>[...NET.peers.values()].find(P=>P.name===nm);
 const tpick=m=>{const C=CB||CBG,T=C?.D?.[C.me]?.T;if(T&&m.opts?.length===T.length&&T.every((x,i)=>m.opts[i]===nm(x))){const i=T.findIndex(x=>x.hp>0);return i<0?null:i}return null};
 const SAID=[];{const os=say;say=async function(s,...a){SAID.push(String(s));return os.call(this,s,...a)}}
 const setup=async(nm,lk,x)=>{{const op0=AUTO.pick;AUTO.pick=m=>tpick(m)??op0(m)}G.coop={code:'AUBE',t0:Date.now(),mates:{}};SLOT='c:AUBE';
  Object.assign(f(),{starter:'goutelin',intro:3,intro3:1,rival1:1,badge:1,mine:1,rival2:1,boss:1,eclipse:1,r2:1,portScene:1,badge2:1,kael3:1,volArr:1,baseDone:1,badge4:1,v18vol:1,v18arr:1,v18done:1,v18faus:1,
   obsScene:1,bar:1,selene2done:1,vex2:1,balance:1,legS:1,legN:1,v19rec2:1,failleDone:1,sanct:1,v193gr:1,tip_evr:1});G.keys.dex=1;G.party=[mon('torrentor',90),mon('brasilion',90)];G.net={n:nm,lk};G.repel=9999;day();loadMap('sanctuaire',x,4,1);await wait(400)};
 return{
 A:async()=>{await setup('Alice','girl',6);NET.join('AUBE');ok(await until(()=>isAdvMate(peer('Bob'))&&peer('Bob').dv===NETDV()),'Bob dans l\'aventure');await BAR('in');
  G.x=6;G.y=4;G.dir=1;await run(()=>interact());await until(idle,90000);ok(f().v193fin===1&&SAID.some(s=>/Ils sont venus/.test(s)),'Alice : la première aube partagée');
  const b=await BAR('fin',{fin:f().v193fin|0});ok(b.fin===1,'Bob l\'a vécue lui aussi');NET.leave();L('done')},
 B:async()=>{await setup('Bob','scout',5);NET.join('AUBE');ok(await until(()=>isAdvMate(peer('Alice'))),'Alice dans l\'aventure');await BAR('in');
  ok(await until(()=>f().v193fin===1&&idle(),150000),'Bob a suivi Alice au Sanctuaire : la première aube partagée');ok(SAID.some(s=>/Ils sont venus/.test(s)),'Bob voit les invités arriver');
  await BAR('fin',{fin:f().v193fin|0});NET.leave();L('done')}}})()
