// Réduction « pixel art » d'un sprite (120 px → 64 px) : chaque pixel de sortie prend la couleur dominante de son empreinte
// (pondérée pour garder contours sombres et reflets blancs), puis le contour extérieur est rétabli en couleur sombre.
window.pixDown=function(src,N=64){const S=src.width,k=S/N,sg=src.getContext('2d').getImageData(0,0,S,S).data,out=new Uint8ClampedArray(N*N*4);
 const lum=(r,g,b)=>.299*r+.587*g+.114*b,key=i=>(sg[i]<<16)|(sg[i+1]<<8)|sg[i+2];
 const SUB=5;
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){const cnt=new Map();let tr=0,n=0;
  for(let j=0;j<SUB;j++)for(let i=0;i<SUB;i++){const sx=Math.min(S-1,Math.floor((x+(i+.5)/SUB)*k)),sy=Math.min(S-1,Math.floor((y+(j+.5)/SUB)*k)),q=(sy*S+sx)*4;n++;
   if(sg[q+3]<128){tr++;continue}const kk=key(q),L=lum(sg[q],sg[q+1],sg[q+2]);const w=L<60?1.45:L>235?1.6:1;cnt.set(kk,(cnt.get(kk)||0)+w)}
  const o=(y*N+x)*4;if(tr>n*.5)continue;let best=0,bw=-1;for(const[kk,w]of cnt)if(w>bw){bw=w;best=kk}out[o]=best>>16&255;out[o+1]=best>>8&255;out[o+2]=best&255;out[o+3]=255}
 // contour : tout pixel opaque au bord prend la teinte sombre la plus proche dans son voisinage source
 const A=(x,y)=>x>=0&&y>=0&&x<N&&y<N&&out[(y*N+x)*4+3]>0;
 const darkAt=(x,y)=>{let bd=1e9,bc=null;const x0=Math.floor((x-.5)*k),x1=Math.ceil((x+1.5)*k),y0=Math.floor((y-.5)*k),y1=Math.ceil((y+1.5)*k);for(let sy=Math.max(0,y0);sy<Math.min(S,y1);sy++)for(let sx=Math.max(0,x0);sx<Math.min(S,x1);sx++){const q=(sy*S+sx)*4;if(sg[q+3]<128)continue;const L=lum(sg[q],sg[q+1],sg[q+2]);if(L<bd){bd=L;bc=[sg[q],sg[q+1],sg[q+2]]}}return bd<90?bc:null};
 const edge=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++){if(!A(x,y))continue;if(!A(x-1,y)||!A(x+1,y)||!A(x,y-1)||!A(x,y+1))edge.push([x,y])}
 for(const[x,y]of edge){const o=(y*N+x)*4,L=lum(out[o],out[o+1],out[o+2]);if(L<90)continue;const c=darkAt(x,y);if(c){out[o]=c[0];out[o+1]=c[1];out[o+2]=c[2]}}
 const c=document.createElement('canvas');c.width=c.height=N;c.getContext('2d').putImageData(new ImageData(out,N,N),0,0);return c};
