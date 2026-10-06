// Test 11.0 : Atelier d'Anselme, breloques (équipement, résonance, effets, butin, amélioration), tempéraments, Mélisse, sauvegarde
async()=>{const L=(...a)=>console.log('LOG',...a);const F=f(),AP=AUTO.pick,ok=(c,m)=>{if(!c)throw new Error('ÉCHEC '+m);L('ok',m)};
 Object.assign(F,{starter:'flamiot',intro:3,badge:1,badge2:1,badge3:1});G.keys.dex=1;G.money=60000;
 G.party=[mon('brasilion',30),mon('goutelin',25),mon('pousseron',22)];G.party.forEach(m=>m.aff=120);save();
 ok(G.party.every(m=>NAT[m.nat]),'tempéraments attribués à la sauvegarde');
 const w=mon('brisillon',5,{wild:1});ok(NAT[w.nat],'tempérament des créatures sauvages');
 // Tempérament : effet chiffré
 const t=mon('flamiot',50);t.nat='fougueux';const a=st(t);t.nat='serein';const b=st(t);ok(a.atk>b.atk&&a.def<b.def&&a.hp===b.hp,'fougueux +ATT -DÉF '+a.atk+'/'+b.atk);
 // Anselme : intro + cadeaux, puis achat d'une breloque et sortie
 const go=async(m,x,y,d=0)=>{loadMap(m,x,y,d);await wait(300)};await go('ville',17,11,1);
 let seq=['ACHETER',1,-1,'AU REVOIR'];AUTO.pick=m=>{if(m.title?.startsWith('Pièces')||m.opts.includes('ACHETER')){const v=seq.shift();return typeof v==='string'?m.opts.indexOf(v):v??-1}return AP(m)};
 const n0=npcs(MAPS.ville).find(n=>n.name==='Orfèvre Anselme');ok(n0,'Anselme présent');await n0.fn(n0);
 ok(F.bqIntro&&G.brq.croc>=1&&G.brq.laine>=1&&G.bag.etinc>=3,'cadeaux d\'Anselme '+JSON.stringify(G.brq));ok(G.brq.ecaille>=1,'achat breloque');ok(G.brqSeen.braise,'breloque unique du starter (Badge 3 + Flamiot)');
 // Équipement : résonance (Croc de Braise sur type FEU)
 const m0=G.party[0],s0=st(m0).atk;setEq(m0,'croc');const s1=st(m0).atk;ok(bqRes(m0)&&s1>s0,`résonance croc ATT ${s0}->${s1}`);
 setEq(m0,'braise');ok(m0.eq==='braise'&&G.brq.croc===1,'échange de breloque, l\'ancienne revient');
 const m1=G.party[1],h0=st(m1).hp;setEq(m1,'ecaille');ok(st(m1).hp>h0&&m1.hp===st(m1).hp,'PV max et PV actuels suivent la breloque');setEq(m1,null);ok(m1.hp===st(m1).hp&&G.brq.ecaille===1,'retrait : PV bornés');
 // Menu ÉQUIPE > BRELOQUE (vrai menu)
 AUTO.pick=m=>m.opts.includes('BRELOQUE')?m.opts.indexOf('BRELOQUE'):m.title?.startsWith('Breloque de')?m.opts.findIndex(o=>o.startsWith('Ecaille')||o.startsWith('Écaille')):m.title==='Équipe'||m.bare?(AUTO.tm=(AUTO.tm||0)+1)<2?1:-1:AP(m);
 await teamMenu();ok(G.party[1].eq==='ecaille','équipement par le menu');AUTO.pick=AP;
 // Résumé : pages STATS et PROFIL
 AUTO.off=1;let p=summary(m0);await wait(300);await SNAP('resume1');press('right');await wait(300);await SNAP('resume2');press('b');await p;AUTO.off=0;
 // Combat : butin (Étincelles), effet d'entrée affiché
 setEq(m0,'sablier');achCheck();G.bag.etinc=0;const r=await battle([mon('brisillon',12)],{tr:{name:'Gamin Test',money:400,boss:1,pre:'',team:[]}});ok(r==='win','combat gagné');ok(G.bag.etinc===3,'3 Étincelles après un boss : '+G.bag.etinc);
 // Amélioration (+1 avec Badge Miroir)
 G.bag.etinc=20;const lv0=bqLv('croc'),c0=st(m0);setEq(m0,'croc');const atk0=st(m0).atk;seq=['AMÉLIORER','AU REVOIR'];AUTO.pick=m=>{if(m.opts.includes('ACHETER')){const v=seq.shift();return v?m.opts.indexOf(v):-1}if(m.title?.startsWith('Étincelles'))return m.opts.findIndex(o=>o.startsWith('Croc'));return AP(m)};
 await n0.fn(n0);ok(bqLv('croc')===lv0+1&&st(m0).atk>atk0&&G.bag.etinc===17,`croc +1 : ATT ${atk0}->${st(m0).atk}`);AUTO.pick=AP;
 // Pop-up d'effet de breloque en combat
 setEq(m0,'sablier');const bp2=battle([mon('brisillon',12)],{});let q=0;while(!B?.tp?.pre&&q++<500)await wait(20);ok(B?.tp?.pre,'pop-up breloque en combat');await SNAP('bq-pop');await bp2;
 // Mélisse : se souvenir + infusion
 await go('port',16,8,1);const me=npcs(MAPS.port).find(n=>n.name==='Herboriste Mélisse');ok(me,'Mélisse présente');const g=G.party[2];g.moves=[g.moves[0]];g.pp=[g.pp[0]];const mv0=g.moves.length,cash=G.money;
 seq=['SE SOUVENIR','TEMPÉRAMENT','AU REVOIR'];AUTO.pick=m=>{if(m.opts.includes('SE SOUVENIR')){const v=seq.shift();return v?m.opts.indexOf(v):-1}if(m.bare)return 2;if(m.title?.startsWith('Infusion'))return NATK.indexOf(g.nat==='vif'?'robuste':'vif');return AP(m)};
 await me.fn(me);ok(g.moves.length===mv0+1&&G.money===cash-3500&&['vif','robuste'].includes(g.nat),`souvenir + infusion (${g.moves}) ${g.nat} ${cash-G.money}`);AUTO.pick=AP;
 // Breloque cachée
 await go('route2',3,12,2);const hb=npcs(MAPS.route2).find(n=>n.x===2&&n.y===12);ok(hb,'breloque cachée visible');const lb0=G.brq.lanterne||0;await hb.fn(hb);ok(G.brq.lanterne===lb0+1&&!npcs(MAPS.route2).find(n=>n.x===2&&n.y===12),'breloque cachée ramassée');
 // Après-histoire : dresseurs équipés
 F.balance=1;const foes=[mon('flamiot',30)];const bp=battle(foes,{tr:{name:'Test',money:1,team:[]}});await wait(100);ok(!!foes[0].eq,'dresseur équipé après l\'histoire : '+foes[0].eq);AUTO.off=0;await bp;F.balance=0;
 // Sauvegarde / chargement
 save();const g2=load();ok(g2.party[0].eq===m0.eq&&g2.party[0].nat===m0.nat&&g2.brqLv.croc===bqLv('croc')&&g2.brq.lanterne>=1,'sauvegarde : breloques, niveaux, tempéraments');
 // vieille sauvegarde sans tempérament
 const old=JSON.parse(JSON.stringify(G));old.v=10;for(const m of old.party){delete m.nat;delete m.eq}delete old.brq;delete old.brqLv;const n2=normalize(old);ok(n2.party.every(m=>NAT[m.nat])&&n2.brq&&n2.v>=11,'migration 10 -> 11');
 // Journal, nouveautés, succès
 achCheck();ok(G.ach.bq1&&G.ach.bqRes,'succès breloques');AUTO.off=1;const jp=journal();await wait(400);await SNAP('journal');press('b');await jp;const wp=whatsNew();await wait(400);await SNAP('news');press('b');await wp;
 const ep=eqMenu(G.party[0]);await wait(400);await SNAP('eqmenu');press('b');await ep;AUTO.off=0;
 L('done')}
