// Nouvelles créatures d'Aurélys — repère 100x100, regard vers la gauche, pieds vers y≈96.
const E=(g,x,y,rx,ry,r=0)=>{g.moveTo(x+rx*Math.cos(r),y+rx*Math.sin(r));g.ellipse(x,y,rx,ry,r,0,7)};
const MONS={
// TÊTARDIN (EAU) — têtard joufflu des mares, taches dorées, bulle d'air sur la tête
tetardin:[0.74,d=>{
 d.part('#5cc6d8',g=>{g.moveTo(62,70);g.bezierCurveTo(78,62,86,44,94,40);g.bezierCurveTo(96,52,90,70,74,80);g.closePath()});
 d.part('#2f8fc0',g=>{g.moveTo(64,72);g.bezierCurveTo(76,66,84,54,90,48);g.bezierCurveTo(88,60,80,72,70,78);g.closePath()},{ol:false,shade:.5});
 d.part('#2f8fc0',g=>{E(g,34,90,7,5);E(g,56,90,7,5)});
 d.part('#2f8fc0',g=>E(g,44,64,30,26));
 d.part('#f6efcf',g=>E(g,40,76,19,13),{soft:1});
 d.part('#bfeeff',g=>E(g,58,32,8,8),{shade:.6});
 d.flat('#ffffff',g=>E(g,55,29,2.6,2.6));
 d.flat('#f6c445',g=>{E(g,66,58,3.5,3);E(g,62,46,2.6,2.2);E(g,22,70,2.6,2.2)});
 d.eye(31,58,4.6,6.2);d.eye(48,57,4.6,6.2);
 d.line('#1c1630',1.8,g=>{g.moveTo(31,70);g.quadraticCurveTo(39,76,47,70)});
 d.flat('#f08aa0',g=>{E(g,24,67,3.4,2);E(g,54,67,3.4,2)});
}],
// CRAPAFLOT (EAU) — crapaud marin trapu, nageoire dorsale, foulard d'écume, salue d'une patte
crapaflot:[0.96,d=>{
 d.part('#7fdcea',g=>{g.moveTo(66,28);g.lineTo(84,30);g.lineTo(78,40);g.lineTo(90,46);g.lineTo(80,54);g.lineTo(88,62);g.lineTo(70,66);g.closePath()},{shade:.6});
 d.part('#2a78b0',g=>{E(g,28,93,13,5);E(g,66,93,13,5)});
 d.part('#2f84bc',g=>{E(g,34,82,12,11);E(g,62,82,12,11)},{grp:'b'});
 d.part('#2f84bc',g=>E(g,72,64,6,12,.35));
 d.part('#2f84bc',g=>{E(g,48,66,25,24);E(g,46,42,28,19);E(g,32,25,9,9);E(g,59,23,9,9)},{grp:'b'});
 d.part('#f6efcf',g=>E(g,44,71,15,16),{soft:1});
 d.part('#9ae6f0',g=>{g.moveTo(34,56);g.lineTo(58,56);g.lineTo(48,68);g.closePath()},{shade:.5});
 d.part('#2f84bc',g=>{E(g,18,48,6,13,-.55)});
 d.part('#2f84bc',g=>E(g,12,36,7,7));
 d.flat('#f6c445',g=>{E(g,66,36,3.6,3);E(g,72,46,2.4,2);E(g,60,46,2,1.8);E(g,64,76,3,2.6);E(g,22,36,2.4,2)});
 d.eye(32,25,4.2,5.4);d.eye(59,23,4.2,5.4);
 d.line('#14304a',2.2,g=>{g.moveTo(24,44);g.quadraticCurveTo(44,56,66,42)});
 d.flat('#f08aa0',g=>{E(g,24,38,3.4,2);E(g,66,36,3,1.8)});
}],
// LUMIGNON (LUMIÈRE) — luciole duveteuse dont l'abdomen sert de lanterne ; c'est la nuit qu'elle brille le plus
lumignon:[0.72,d=>{
 d.part('#d8f0ff',g=>{E(g,56,34,8,15,-.7);E(g,66,38,7,13,-1.1)},{shade:.4});
 d.part('#ffe266',g=>E(g,70,64,19,17),{shade:.55});
 d.part('#c8945a',g=>{E(g,34,84,5,4);E(g,48,85,5,4)});
 d.part('#fff1d0',g=>{E(g,42,60,22,22);for(let i=0;i<9;i++){const a=Math.PI*(.15+i*.2);E(g,42+Math.cos(a)*21,62+Math.sin(a)*20,5,5)}});
 d.flat('#f2b23a',g=>{g.moveTo(70,48);g.lineTo(74,48);g.lineTo(70,80);g.lineTo(66,80);g.closePath();g.moveTo(80,52);g.lineTo(83,54);g.lineTo(82,76);g.lineTo(79,78);g.closePath()});
 d.flat('#fffbe8',g=>E(g,64,58,4,6));
 d.line('#5a3a6a',2,g=>{g.moveTo(34,42);g.quadraticCurveTo(26,34,24,22);g.moveTo(46,40);g.quadraticCurveTo(48,30,54,20)});
 d.part('#ffe266',g=>{E(g,24,20,4,4);E(g,55,18,4,4)},{shade:.4});
 d.eye(33,58,4.4,5.8);d.eye(49,58,4.4,5.8);
 d.line('#1c1630',1.6,g=>{g.moveTo(37,69);g.quadraticCurveTo(41,73,45,69)});
 d.flat('#f6a0a8',g=>{E(g,26,66,3,1.8);E(g,55,66,3,1.8)});
}],
// PHALUMINE (LUMIÈRE) — grand papillon de nuit aux ailes ocellées de soleils
phalumine:[0.92,d=>{
 const W=(s,f)=>g=>{const x=v=>50+s*(v-50);f(g,x)};
 for(const s of[1,-1]){
  d.part('#e88a3a',W(s,(g,x)=>{g.moveTo(x(47),58);g.bezierCurveTo(x(30),56,x(14),64,x(18),80);g.bezierCurveTo(x(24),92,x(40),84,x(48),70);g.closePath()}));
  d.part('#f2b448',W(s,(g,x)=>{g.moveTo(x(47),44);g.bezierCurveTo(x(34),20,x(14),8,x(5),18);g.bezierCurveTo(x(0),34,x(10),56,x(47),58);g.closePath()}));
 }
 for(const s of[1,-1]){const x=v=>50+s*(v-50);
  d.flat('#fff2d0',g=>{E(g,x(24),34,9,9)});d.flat('#5a3a6a',g=>E(g,x(24),34,5,5));d.flat('#ffe266',g=>E(g,x(24),34,2.2,2.2));
  d.flat('#fff2d0',g=>E(g,x(28),74,5,5));d.flat('#7a3a2a',g=>{g.moveTo(x(10),20);g.quadraticCurveTo(x(8),36,x(14),48);g.lineTo(x(12),48);g.quadraticCurveTo(x(6),34,x(8),20);g.closePath()})}
 d.part('#ffe6a0',g=>E(g,50,62,8,20));
 d.part('#ffe266',g=>E(g,50,80,6,6),{shade:.4});
 d.part('#fff1d0',g=>{E(g,50,38,13,11);for(let i=0;i<7;i++){const a=Math.PI*(.1+i*.133);E(g,50+Math.cos(a)*13,44+Math.sin(a)*6,4,4)}});
 d.line('#7a4a3a',1.8,g=>{g.moveTo(45,30);g.quadraticCurveTo(38,16,30,10);g.moveTo(55,30);g.quadraticCurveTo(62,16,70,10)});
 d.line('#7a4a3a',1.2,g=>{for(const s of[1,-1])for(let i=0;i<4;i++){const t=.3+i*.2,x=50+s*(5+15*t),y=30-20*t;g.moveTo(x,y);g.lineTo(x-s*4,y-2)}});
 d.eye(45,38,3.6,4.6,{iris:'#c86a2a'});d.eye(55,38,3.6,4.6,{iris:'#c86a2a'});
}],
// BOURDONNERRE (ÉLEC) — évolution de Volticelle : bourdon chevalier, rayures en éclair, dard foudroyant
bourdonnerre:[0.9,d=>{
 d.part('#cfeeff',g=>{E(g,58,26,9,22,.75);E(g,72,32,7,17,1.1)},{shade:.35});
 d.part('#2e2a5a',g=>{g.moveTo(84,70);g.lineTo(96,74);g.lineTo(88,78);g.lineTo(98,86);g.lineTo(84,80);g.closePath()});
 d.part('#2e2a5a',g=>{E(g,40,74,3.4,7,.3);E(g,50,76,3.4,7,.1);E(g,60,76,3.4,7,-.1)});
 d.part('#f2c82a',g=>E(g,68,66,21,18));
 d.flat('#2e2a5a',g=>{for(const x0 of[62,76]){g.moveTo(x0-4,48);g.lineTo(x0+2,48);g.lineTo(x0-2,62);g.lineTo(x0+4,62);g.lineTo(x0-6,86);g.lineTo(x0-3,68);g.lineTo(x0-8,68);g.closePath()}});
 d.part('#fff2c0',g=>{E(g,46,58,15,13);for(let i=0;i<8;i++){const a=i*.8;E(g,46+Math.cos(a)*14,58+Math.sin(a)*12,5,5)}},{shade:.6});
 d.part('#f2c82a',g=>E(g,30,40,17,16));
 d.part('#f2c82a',g=>{E(g,30,64,8.5,4.5,.5)});
 d.line('#2e2a5a',2.4,g=>{g.moveTo(26,26);g.lineTo(20,18);g.lineTo(26,15);g.lineTo(18,4);g.moveTo(38,26);g.lineTo(40,16);g.lineTo(46,14);g.lineTo(44,2)});
 d.part('#fff066',g=>{E(g,18,4,3.4,3.4);E(g,44,2,3.4,3.4)},{shade:.3});
 d.eye(23,40,4,5.4);d.eye(38,40,4,5.4);
 d.line('#2e2a5a',1.8,g=>{g.moveTo(18,33);g.lineTo(27,35);g.moveTo(34,35);g.lineTo(43,32)});
 d.line('#1c1630',1.6,g=>{g.moveTo(26,50);g.quadraticCurveTo(31,53,35,49)});
 d.flat('#f6a0a8',g=>{E(g,18,47,2.8,1.8);E(g,42,47,2.8,1.8)});
}],
// PAPIVIGNE (PLANTE) — évolution de Larvigne : papillon aux ailes de feuilles de vigne et grappes de raisin
papivigne:[0.9,d=>{
 const W=s=>v=>50+s*(v-50);
 for(const s of[1,-1]){const x=W(s);
  d.part('#5aa83a',g=>{g.moveTo(x(47),58);g.bezierCurveTo(x(36),62,x(22),66,x(18),84);g.bezierCurveTo(x(30),86,x(42),78,x(48),66);g.closePath()});
  d.part('#8ad04a',g=>{g.moveTo(x(47),48);g.bezierCurveTo(x(40),30,x(22),12,x(4),10);g.bezierCurveTo(x(8),20,x(4),30,x(10),36);g.bezierCurveTo(x(6),44,x(14),56,x(47),58);g.closePath()});}
 for(const s of[1,-1]){const x=W(s);
  d.line('#3f8a2e',1.6,g=>{g.moveTo(x(46),52);g.quadraticCurveTo(x(26),36,x(8),14);g.moveTo(x(30),40);g.lineTo(x(30),26);g.moveTo(x(22),32);g.lineTo(x(12),36)});
  d.part('#7a4a9a',g=>{for(const[a,b]of[[22,82],[27,85],[17,86],[22,89],[27,90],[22,95]])E(g,x(a),b,3.6,3.6)},{shade:.5});}
 d.part('#a8d84a',g=>E(g,50,64,8,19));
 d.flat('#7a4a9a',g=>{E(g,50,60,3,2);E(g,50,68,3,2);E(g,50,76,2.6,1.8)});
 d.part('#c8e86a',g=>E(g,50,40,12,11));
 d.line('#3f8a2e',1.8,g=>{g.moveTo(45,31);g.bezierCurveTo(40,20,30,22,33,14);g.bezierCurveTo(35,9,40,13,37,16);g.moveTo(55,31);g.bezierCurveTo(60,20,70,22,67,14);g.bezierCurveTo(65,9,60,13,63,16)});
 d.eye(45,40,3.6,4.8);d.eye(55,40,3.6,4.8);
 d.line('#1c1630',1.4,g=>{g.moveTo(47,47);g.quadraticCurveTo(50,49,53,47)});
 d.flat('#f08aa0',g=>{E(g,40,46,2.4,1.5);E(g,60,46,2.4,1.5)});
}],
// NOCTURELLE (OMBRE) — chauve-souris des grottes, oreilles en croissant de lune, ailes semées d'étoiles
nocturelle:[0.8,d=>{
 const W=s=>v=>50+s*(v-50);
 for(const s of[1,-1]){const x=W(s);
  d.part('#5a3a9a',g=>{g.moveTo(x(38),50);g.bezierCurveTo(x(28),36,x(14),30,x(4),34);g.quadraticCurveTo(x(10),44,x(6),52);g.quadraticCurveTo(x(14),52,x(14),62);g.quadraticCurveTo(x(22),58,x(26),68);g.quadraticCurveTo(x(32),62,x(40),66);g.closePath()});
  d.flat('#f6c445',g=>{E(g,x(16),42,1.4,1.4);E(g,x(24),50,1.2,1.2);E(g,x(12),48,1,1)});
  d.part('#4a3a8a',g=>{g.moveTo(x(40),44);g.bezierCurveTo(x(30),36,x(26),20,x(34),10);g.bezierCurveTo(x(34),22,x(42),32,x(50),36);g.closePath()});
  d.flat('#e85a9a',g=>{g.moveTo(x(40),40);g.bezierCurveTo(x(34),34,x(31),24,x(34),16);g.bezierCurveTo(x(36),26,x(42),32,x(46),36);g.closePath()});
  d.part('#3a2a6a',g=>E(g,x(44),80,4,4));}
 d.part('#4a3a8a',g=>E(g,50,58,19,19));
 d.part('#8a78c8',g=>E(g,50,66,11,10),{soft:1});
 d.eye(43,55,4.4,5.6,{iris:'#e85a9a'});d.eye(57,55,4.4,5.6,{iris:'#e85a9a'});
 d.line('#1c1630',1.5,g=>{g.moveTo(45,65);g.quadraticCurveTo(50,68,55,65)});
 d.flat('#ffffff',g=>{g.moveTo(46,65.5);g.lineTo(49,65.8);g.lineTo(47.5,69.5);g.closePath()});
}],
// NOCTURION (OMBRE, légendaire) — gardien de la nuit, pendant de Solarion : lynx astral devant un croissant de lune
nocturion:d=>{
 d.part('#c8bff0',g=>{g.moveTo(88,34);g.arc(62,34,26,0,Math.PI*2);g.moveTo(92,26);g.arc(70,26,22,0,Math.PI*2,true)},{shade:.45});
 d.part('#3a2e6a',g=>{g.moveTo(82,60);g.bezierCurveTo(96,58,100,42,92,30);g.bezierCurveTo(96,40,92,50,80,52);g.closePath()});
 d.part('#c8bff0',g=>E(g,92,31,4,4),{shade:.4});
 d.part('#1e1840',g=>{E(g,70,80,4,12,-.05);E(g,42,80,4,12,.05)});
 d.part('#2e2458',g=>{E(g,58,63,24,11,-.05);E(g,77,63,11,12)},{grp:'b'});
 d.part('#2e2458',g=>{E(g,79,80,5,13,-.12);E(g,32,80,5,13,.06)});
 d.part('#d8d8f0',g=>{E(g,31,93,5.5,2.6);E(g,42,92,4.5,2.2);E(g,81,93,5.5,2.6);E(g,70,92,4.5,2.2)});
 d.part('#5a4a9a',g=>E(g,54,70,16,4.5),{soft:1});
 d.part('#2e2458',g=>E(g,36,57,11,14,.25),{grp:'b'});
 d.part('#4a2e8a',g=>{g.moveTo(22,28);g.bezierCurveTo(38,22,52,30,60,44);g.bezierCurveTo(54,42,52,48,46,48);g.bezierCurveTo(48,54,42,58,38,62);g.bezierCurveTo(36,52,30,46,24,44);g.closePath()});
 d.flat('#f6e27a',g=>{E(g,44,34,1.2,1.2);E(g,52,40,1.3,1.3);E(g,40,44,1,1);E(g,64,58,1.1,1.1);E(g,72,56,1,1);E(g,50,60,1,1)});
 d.part('#2e2458',g=>{g.moveTo(18,30);g.lineTo(12,10);g.lineTo(26,24);g.closePath();g.moveTo(27,26);g.lineTo(32,8);g.lineTo(35,28);g.closePath()});
 d.flat('#ff4a9a',g=>{g.moveTo(18,26);g.lineTo(14,14);g.lineTo(23,24);g.closePath()});
 d.part('#2e2458',g=>{E(g,26,36,11,10);E(g,16,41,7.5,5.5)},{grp:'h'});
 d.part('#d8d8f0',g=>{g.moveTo(25,30);g.bezierCurveTo(21,26,23,21,28,20);g.bezierCurveTo(26,23,26,27,29,30);g.closePath()},{shade:.4});
 d.flat('#ff4a9a',g=>{g.moveTo(17,35);g.lineTo(25,33);g.lineTo(27,36);g.lineTo(19,37.5);g.closePath()});
 d.flat('#ffffff',g=>E(g,21,34.6,1.1,1));
 d.flat('#ff4a9a',g=>{g.moveTo(32,60);g.quadraticCurveTo(38,66,46,64);g.quadraticCurveTo(38,68,31,63);g.closePath();g.moveTo(72,58);g.quadraticCurveTo(78,62,84,60);g.quadraticCurveTo(78,65,71,61);g.closePath()});
 d.flat('#120c26',g=>E(g,9.5,40,1.6,1.3));
 d.line('#120c26',1.2,g=>{g.moveTo(12,45);g.quadraticCurveTo(16,47,20,45)},{free:0});
},
};
