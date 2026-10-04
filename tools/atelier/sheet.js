// Planches de contrôle : grille d'illustrations avec étiquettes, sur fond clair et fond sombre, à l'échelle voulue.
window.SHEET=function(items,o={}){const sc=o.scale||1,pad=8,cols=o.cols||6,cw=Math.max(...items.map(i=>i.c.width))*sc+pad*2,ch=Math.max(...items.map(i=>i.c.height))*sc+pad*2+12;
 const rows=Math.ceil(items.length/cols),cv=document.createElement('canvas');cv.width=cols*cw;cv.height=rows*ch;const g=cv.getContext('2d');g.imageSmoothingEnabled=false;
 items.forEach((it,i)=>{const x=(i%cols)*cw,y=(i/cols|0)*ch;g.fillStyle=it.bg||o.bg||((i%cols+(i/cols|0))%2?'#e8e0cc':'#ddd4bd');g.fillRect(x,y,cw,ch);
  g.drawImage(it.c,x+pad+(cw-pad*2-it.c.width*sc)/2,y+pad+(ch-pad*2-12-it.c.height*sc),it.c.width*sc,it.c.height*sc);g.fillStyle=o.fg||'#3a3050';g.font='10px monospace';g.fillText(it.n||'',x+4,y+ch-4)});return cv};
