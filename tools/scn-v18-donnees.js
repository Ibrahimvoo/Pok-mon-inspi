// Test 18.0 : données (espèces, capacités, objets, sprites), combats avec les capacités 18.0, évolutions, capsules
async()=>{const L=(...a)=>console.log('LOG',...a),ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};const bad=[];
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1,badge2:1,badge3:1,badge4:1,eclipse:1,balance:1});G.keys.bracelet=1;
 for(const k of Object.keys(SP)){const s=SP[k];if(!PIXB[k])bad.push('nospr '+k);if(!PIMG[k]?.f||!PIMG[k]?.b||!PIMG[k]?.i)bad.push('noimg '+k);for(const[l,m]of s.learn)if(!MV[m])bad.push('nomv '+k+' '+m);
  const e=s.evo;if(e)for(const x of Array.isArray(e[0])?e:[e]){if(!SP[x[1]])bad.push('noevo '+k+' '+x[1]);if(x[2]?.item&&!IT[x[2].item])bad.push('noevoitem '+k)}
  if(!TAL[s.tal])bad.push('notal '+k+' '+s.tal);if(!DEX.includes(k))bad.push('nodex '+k);if(!TY[s.t])bad.push('notype '+k);if(s.bs.length!==4||s.bs.some(v=>!(v>0)))bad.push('stats '+k);if(!s.desc)bad.push('desc '+k);
  if(!SP[s.base])bad.push('nobase '+k);if(s.c.length!==3||s.c.some(c=>!/^#[0-9a-f]{6}$/i.test(c)))bad.push('col '+k)}
 ok(new Set(DEX).size===DEX.length,'pas de doublon dans le Pixédex ('+DEX.length+')');
 for(const k in IT){if(!ICO[k])bad.push('noico '+k);if(!CATO.includes(IT[k][4]))bad.push('cat '+k)}for(const v of Object.values(MV)){try{mvDesc(v)}catch(e){bad.push('desc '+v.id)}}
 for(const k of DEX){try{evoInfo(k);habitat(k);rarity(k);activ(k);evoChain(k)}catch(e){bad.push('dex '+k+' '+e.message)}}
 L('species',Object.keys(SP).length,'nouvelles',V18SP.length,'dex',DEX.length,'moves',Object.keys(MV).length,'items',Object.keys(IT).length);
 ok(!bad.length,'données valides '+bad.slice(0,20).join(' | '));ok(V18SP.length===117,'117 espèces 18.0');
 // combats : chaque capacité 18.0, utilisée par des espèces 18.0
 const NEW=['tornade','ruade','coupdeplume','coupsoleil','flammedanse','tempetebraise','ressac','geyser','oasis','deluge','bambouclap','sevenoire','parfum','courtcircuit','surtension','rayonmk','tempetesable','ensablement','brique','mauvaissort','mascarade','cauchemar','mirage','oracle','lampegenie'];
 const sps=V18SP.slice();let i=0;loadMap('route1',10,8,0);
 AUTO.pick=m=>{if(mode==='battle'&&B?.me&&m.opts.length===B.me.moves.length&&MV[B.me.moves[0]]&&m.opts[0]===MV[B.me.moves[0]].n)return rnd(0,B.me.moves.length-1);if(m.bare)return Math.max(0,G.party.findIndex(alive));return 0};
 for(let r=0;r<8;r++){const team=[0,1,2].map(j=>mon(sps[(i++)%sps.length],50,{moves:NEW.slice((r*9+j*4)%NEW.length,(r*9+j*4)%NEW.length+4)}));
  const foe=[0,1].map(j=>mon(sps[(i++)%sps.length],48,{moves:NEW.slice((r*5+j*4+2)%NEW.length,(r*5+j*4+2)%NEW.length+4)}));G.party=team;
  const res=await battle(foe,{tr:{name:'Testeur',look:'grunt',money:1,items:1,ev:1},noLose:1});ok(['win','lose'].includes(res),'combat '+r+' : '+res)}
 // les nouveaux légendaires en combat sauvage
 G.party=[mon('dragarbre',70)];for(const sp of['oasiphant','djinnflamme']){const r=await battle([mon(sp,50)],{legend:1,noLose:1});ok(!!r,'légendaire '+sp+' : '+r)}
 // capsules
 B={foe:mon('serpetin',10),turn:3};ok(ballMul('sablecapsule')===3,'Sable Capsule x3 sur FEU');B.foe=mon('algadou',10);ok(ballMul('sablecapsule')===1,'Sable Capsule x1 sur EAU');
 G.t=CYC*2+40;ok(ballMul('festicapsule')===1.5,'Festi Capsule x1,5 le jour');G.t=CYC*2+300;ok(ballMul('festicapsule')===2.5,'Festi Capsule x2,5 la nuit');B=null;
 // évolutions
 const ev=(sp,lv,o={})=>evoTarget(mon(sp,lv,o));G.t=CYC*3+40;
 ok(ev('serpetin',20)==='cobrasier'&&ev('cobrasier',38)==='pythonova','Serpétin → Cobrasier → Pythonova');ok(ev('chlorasaure',31)===null&&ev('sevragon',52)==='dragarbre','Sèvragon au niveau 52');
 ok(ev('draplin',30)===null,'Draplin n\'évolue pas le jour');G.t=CYC*3+300;ok(ev('draplin',30)==='possedrap','Draplin évolue la nuit');
 G.wx={k:'rain',n:50};loadMap('route1',10,8,0);ok(ev('coquillagu',38)==='crustagu','Coquillagu évolue sous la pluie');G.wx=null;ok(ev('coquillagu',38)===null,'… et pas sans pluie');
 ok(evoTarget(mon('scorpaille',5),'pierresable')==='scorpharaon'&&evoTarget(mon('singelec',5),'pierreorage')==='apeoro'&&evoTarget(mon('timibulbe',5),'pierresoleil')==='narcifeuille','évolutions par pierre');
 ok(DISCS.length>=34&&IT.dc_tempetesable&&IT.dc_geyser,'disques 18.0');G.party=[mon('serpetin',20)];ok(discOk(G.party[0],'coupsoleil')&&!discOk(G.party[0],'geyser'),'compatibilité des disques');
 L('done')}
