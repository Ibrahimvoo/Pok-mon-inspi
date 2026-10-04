// Pipeline « courbes → pixel art » utilisé pour les nouvelles créatures.
// Chaque créature est décrite par des parties vectorielles (repère 100x100, regard vers la gauche).
// Rendu : masque par partie (sur-échantillonné), occlusion, ombrage auto (lumière haut-gauche, ombre teintée violet),
// contour coloré (teinte sombre de la partie), puis détails « plats » (yeux, motifs) par-dessus.
(()=>{
const hex=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
const mixc=(a,b,k)=>{const A=hex(a),B=hex(b);return A.map((v,i)=>Math.round(v+(B[i]-v)*k))};
const SS=4;
let SCL=1;
function mask(N,draw,line){const c=document.createElement('canvas');c.width=c.height=N*SS;const g=c.getContext('2d');g.scale(N*SS/100,N*SS/100);g.translate(50,97);g.scale(SCL,SCL);g.translate(-50,-97);g.fillStyle=g.strokeStyle='#000';g.lineCap=g.lineJoin='round';
 g.beginPath();draw(g);if(line){g.lineWidth=line/Math.min(1,SCL);g.stroke()}else g.fill('nonzero');
 const d=g.getImageData(0,0,N*SS,N*SS).data,m=new Uint8Array(N*N),thr=line?SS*SS*.3:SS*SS*.5;
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){let s=0;for(let j=0;j<SS;j++)for(let i=0;i<SS;i++)s+=d[((y*SS+j)*N*SS+x*SS+i)*4+3]>127;m[y*N+x]=s>=thr?1:0}
 return m}
window.renderMon=function(def,N){SCL=1;if(Array.isArray(def)){SCL=def[0];def=def[1]}
 const parts=[],flats=[];
 const api={part:(c,draw,o={})=>parts.push({c,draw,o}),flat:(c,draw,o={})=>flats.push({c,draw,o}),line:(c,w,draw,o={})=>flats.push({c,draw,o:{line:w,free:1,...o}}),
  eye:(x,y,rx,ry,o={})=>{flats.push({c:o.c||'#1c1630',draw:g=>{g.moveTo(x+rx,y);g.ellipse(x,y,rx,ry,o.rot||0,0,7)},o:{}});if(o.iris)flats.push({c:o.iris,draw:g=>g.ellipse(x+rx*.1,y+ry*.45,rx*.75,ry*.45,0,0,7),o:{}});
   flats.push({c:'#ffffff',draw:g=>g.ellipse(x-rx*.32,y-ry*.38,Math.max(rx*.36,1.1),Math.max(ry*.3,1.1),0,0,7),o:{min:1}});if(o.glint2)flats.push({c:'#ffffff',draw:g=>g.ellipse(x+rx*.35,y+ry*.4,rx*.16,ry*.14,0,0,7),o:{}})}};
 def(api);
 const top=new Int16Array(N*N).fill(-1),M=parts.map(p=>mask(N,p.draw));
 M.forEach((m,i)=>{for(let k=0;k<N*N;k++)if(m[k])top[k]=i});
 const out=new Uint8ClampedArray(N*N*4),put=(k,rgb)=>{out[k*4]=rgb[0];out[k*4+1]=rgb[1];out[k*4+2]=rgb[2];out[k*4+3]=255};
 const SH='#3a2464',s1=Math.max(1.5,N*.075),s2=Math.max(1,N*.028),s3=Math.max(1,N*.032);
 const inM=(m,x,y)=>{x=Math.round(x);y=Math.round(y);return x>=0&&y>=0&&x<N&&y<N&&m[y*N+x]};
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){const k=y*N+x,i=top[k];if(i<0)continue;const p=parts[i],m=M[i],o=p.o,c=p.c;
  let col=hex(c);
  if(!o.noshade){const sk=o.shade??1;
   if(!inM(m,x+s2*.7,y+s2))col=mixc(c,SH,.5*sk);else if(!inM(m,x+s1*.6,y+s1))col=mixc(c,SH,.3*sk);else if(!inM(m,x-s3*.6,y-s3)&&!o.nolight)col=mixc(c,'#fff8e4',.42*sk)}
  // contour coloré : bord extérieur ou bord au-dessus d'une partie plus basse
  let edge=false;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;const j=xx<0||yy<0||xx>=N||yy>=N?-1:top[yy*N+xx];
   if(j<0||(j<i&&o.ol!==false&&!(o.grp&&parts[j].o.grp===o.grp))){edge=true;break}}
  if(edge)col=mixc(c,o.olc||'#140c26',o.soft?.45:.68);
  put(k,col)}
 for(const f of flats){const m=mask(N,f.draw,f.o.line);for(let k=0;k<N*N;k++)if(m[k]&&(top[k]>=0||f.o.free))put(k,hex(f.c))
}
 const c=document.createElement('canvas');c.width=c.height=N;c.getContext('2d').putImageData(new ImageData(out,N,N),0,0);return c.toDataURL('image/png').split(',')[1]};
})();
