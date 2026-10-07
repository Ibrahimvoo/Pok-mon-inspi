// Test 17.0 (capture en groupe) : quand plusieurs joueurs lancent une Capsule au même tour, seul le premier à l'avoir lancée attrape la créature.
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(f(),{starter:'flamiot',intro:3,badge:1});G.party=[mon('brasilion',30)];
 const ally=i=>({pid:'p'+i,nm:'J'+i,lk:'hero',T:[cbMon(cbSnap(cbCopy(mon('goutelin',20))))]});
 const throwAll=at=>{const E=cbEngine(cbMon(cbSnap(cbCopy(mon('rocaillon',5)))),{});E.step({add:[ally(0),ally(1),ally(2)],only:1});
  const cs={};[0,1,2].forEach(s=>{cs[s]={ball:'capsule'};if(at)cs[s].at=at[s]});const r0=Math.random;Math.random=()=>0;let r;try{r=E.step({cs,gone:[],lv:[],add:[]})}finally{Math.random=r0}
  const v=E.view();return{v,balls:r.ev.filter(e=>e.k==='ball')}};
 let t=throwAll([300,100,200]);ok(t.v.ph==='end'&&t.v.w==='catch','la créature est attrapée');ok(t.v.by===1,'le joueur le plus rapide (place 1) l\'attrape');ok(t.balls.length===1,'une seule Capsule lancée : le combat s\'arrête aussitôt');
 t=throwAll([100,300,200]);ok(t.v.by===0,'l\'hôte l\'attrape quand il a lancé en premier');
 t=throwAll([500,400,100]);ok(t.v.by===2,'la place 2 l\'attrape quand elle a lancé en premier');
 t=throwAll(null);ok(t.v.by===0,'sans horodatage : ordre des places');
 L('done')}
