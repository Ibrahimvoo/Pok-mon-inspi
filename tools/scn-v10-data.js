// Test 10.0 : données (espèces, capacités, talents, objets), combats avec les nouveaux effets, évolutions conditionnelles
async()=>{const L=(...a)=>console.log('LOG',...a);const bad=[];
 Object.assign(f(),{starter:'goutelin',intro:3,badge:1,badge2:1,badge3:1,badge4:1,eclipse:1,balance:1});G.keys.bracelet=1;
 // données
 for(const k of Object.keys(SP)){const s=SP[k];if(!PIXB[k])bad.push('nospr '+k);for(const[l,m]of s.learn)if(!MV[m])bad.push('nomv '+k+' '+m);const e=s.evo;if(e)for(const x of Array.isArray(e[0])?e:[e])if(!SP[x[1]])bad.push('noevo '+k+' '+x[1]);if(!TAL[s.tal])bad.push('notal '+k+' '+s.tal);if(!DEX.includes(k))bad.push('nodex '+k)}
 for(const k in IT){if(!ICO[k])bad.push('noico '+k)}for(const v of Object.values(MV)){try{mvDesc(v)}catch(e){bad.push('desc '+v.id)}}
 for(const k of DEX){try{evoInfo(k);habitat(k);rarity(k);activ(k);evoChain(k)}catch(e){bad.push('dex '+k+' '+e.message)}}
 L('species',Object.keys(SP).length,'dex',DEX.length,'moves',Object.keys(MV).length,'talents',Object.keys(TAL).length,'items',Object.keys(IT).length);L('BAD',bad.length,bad.slice(0,30).join(' | '));
 // combats : chaque nouvelle capacité utilisée par une créature de chaque nouveau talent
 const NEWMV=['doublecoup','abri','facade','tranche','megaimpact','rafraichir','nitrocharge','roueflamme','flammeclipse','boutefeu','cascade','mareenoire','aquabrume','hydroqueue','tourbillon','vampigraine','lamefeuille','racines','spore','eclatfloral','orage','fatalfoudre','parabocharge','electrotoile','seisme','tomberoche','meteore','eclatroc','machination','griffeombre','devoreve','ombreportee','eblouir','rayonaurore','voilestellaire','lamecycle','aurorale','eclipsetotale','feinterrante','masquesolaire'];
 const sps=V10SP.slice();let i=0;loadMap('route1',10,8,0);
 for(let r=0;r<10;r++){const team=[0,1,2].map(j=>{const sp=sps[(i++)%sps.length];return mon(sp,50,{moves:NEWMV.slice((r*12+j*4)%NEWMV.length,(r*12+j*4)%NEWMV.length+4)})});
  const foe=[0,1].map(j=>{const sp=sps[(i++)%sps.length];return mon(sp,48,{moves:NEWMV.slice((r*7+j*4+2)%NEWMV.length,(r*7+j*4+2)%NEWMV.length+4),item:['casque','coquille','bandeau','pierrechance','lunettes','talisman'][(r+j)%6]})});
  G.party=team;team.forEach((m,k)=>m.item=['bandeau','pierrechance','lunettes','talisman','coquille','casque'][(r+k)%6]);
  AUTO.pick=m=>{if(mode==='battle'&&B?.me&&m.opts.length===B.me.moves.length&&MV[B.me.moves[0]]&&m.opts[0]===MV[B.me.moves[0]].n)return rnd(0,B.me.moves.length-1);if(m.bare)return Math.max(0,G.party.findIndex(alive));return 0};
  const res=await battle(foe,{tr:{name:'Testeur',look:'grunt',money:1,items:1,ev:1},noLose:1});L('battle',r,res,team.map(m=>m.sp+':'+m.hp).join(','))}
 // ciels
 for(const k of['storm','stars']){G.party=[mon('ampystorme',40)];const r=await battle([mon('tempestaile',30)],{noLose:1});L('sky',k,r)}
 // évolutions conditionnelles
 const ev=(sp,lv,o={})=>{const m=mon(sp,lv,o);return evoTarget(m)};
 G.t=CYC*3+60;L('day',night(),ev('flocelin',25),ev('tigeronce',36));G.t=CYC*3+300;L('night',night(),ev('flocelin',25),ev('tigeronce',36),ev('fretillon',28));
 G.wx={k:'rain',n:50};G.map='route1';L('rain',ev('axoluce',26),ev('ventaile',36));G.wx=null;L('norain',ev('axoluce',26),ev('ventaile',36),ev('ventaile',42));
 L('held',ev('spectronce',36),ev('spectronce',36,{item:'encensnoir'}));L('move',ev('toxiris',30),ev('toxiris',30,{moves:['lamefeuille']}));
 G.map='mont';L('map',ev('vivipere',20),ev('cavalsable',36));G.map='bois';L('bois',ev('vivipere',20));
 f().eclD=dayN();L('ecl',ecl(),ev('tisonard',36),ev('serpillou',25));delete f().eclD;
 L('items',evoTarget(mon('flocelin',5),'pierresoleil'),evoTarget(mon('cavalsable',5),'pierreaube'));
 // disques et capsules
 G.party=[mon('flamiot',20),mon('goutelin',20)];G.bag.dc_nitrocharge=1;L('discOk',discOk(G.party[0],'nitrocharge'),discOk(G.party[1],'nitrocharge'),discOk(G.party[1],'abri'));
 L('evoInfo',evoInfo('vivipere'),'|',evoInfo('cavalsable'),'|',evoInfo('spectronce'));
 L('done')}
