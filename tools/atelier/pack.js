// Empaquetage en planches : rangement par étagères (hauteur décroissante), 1 px de marge.
window.PACK=function(items,maxW=1024){items=[...items].sort((a,b)=>b.c.height-a.c.height||b.c.width-a.c.width);let x=0,y=0,rowH=0,W=0;const map={};
 for(const it of items){if(x+it.c.width>maxW){x=0;y+=rowH+1;rowH=0}it.x=x;it.y=y;x+=it.c.width+1;rowH=Math.max(rowH,it.c.height);W=Math.max(W,x)}
 const cv=document.createElement('canvas');cv.width=W;cv.height=y+rowH;const g=cv.getContext('2d');for(const it of items){g.drawImage(it.c,it.x,it.y);map[it.n]=[it.x,it.y,it.c.width,it.c.height]}
 return{img:cv.toDataURL('image/png').split(',')[1],map}};
window.BAKE_props=()=>PACK(Object.entries(PROPS).map(([k,p])=>({n:k,c:ATELIER.render(p.def,{w:p.w,h:p.h,box:p.box||[0,0,p.w,p.h]})})));
// Personnages : 12 vues par personnage (face, dos, gauche, droite × 3 poses) en 32×48, art de combat 64×96 et 96×144, portraits 72×72 (bouche fermée/ouverte).
window.BAKE_people=()=>{const A=ATELIER,keys=Object.keys(PEOPLE),grid=(fw,fh,cols,cells)=>{const rows=Math.ceil(cells.length/cols),cv=document.createElement('canvas');cv.width=fw*cols;cv.height=fh*rows;const g=cv.getContext('2d');cells.forEach((c,i)=>g.drawImage(c,(i%cols)*fw,(i/cols|0)*fh));return cv.toDataURL('image/png').split(',')[1]};
 const ow=[];for(const k of keys){const p=PEOPLE[k];for(const[v,fl]of[['front',0],['back',0],['side',1],['side',0]])for(const f of[0,1,2])ow.push(A.render(d=>PERSON(d,p,v,f),{w:32,h:48,box:[0,0,64,96],flip:!!fl}))}
 const bt=keys.map(k=>A.render(d=>PERSON(d,PEOPLE[k],'front',0),{w:64,h:96,box:[0,0,64,96]}));
 const vs=keys.map(k=>A.render(d=>PERSON(d,PEOPLE[k],'front',0),{w:96,h:144,box:[0,0,64,96]}));
 const pt=[];for(const k of keys){const p=PEOPLE[k],r=RIG('front',0,p.build||{}),[hx,hy]=r.head;for(const talk of[0,1])pt.push(A.render(d=>PERSON(d,p,'front',0,{talk}),{w:72,h:72,box:[hx-22,hy-25,hx+22,hy+19]}))}
 return{keys,ow:{img:grid(32,48,12,ow),fw:32,fh:48},bt:{img:grid(64,96,8,bt),fw:64,fh:96},vs:{img:grid(96,144,8,vs),fw:96,fh:144},pt:{img:grid(72,72,8,pt),fw:72,fh:72}}};
