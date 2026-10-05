# Découpe chaque créature de la planche, retire le fond et les effets isolés, réduit en vrai pixel art
import numpy as np, json, base64, io, sys
from PIL import Image
from collections import deque
SRC='/root/.claude/uploads/92c01f78-9a29-5d99-9b48-34a9ee54ed2d/5145c8c0-image.png'
OUT='/tmp/claude-0/-home-user-Pok-mon-inspi/92c01f78-9a29-5d99-9b48-34a9ee54ed2d/scratchpad/px/'
A=np.asarray(Image.open(SRC).convert('RGB')).astype(float)
COLS=[(12,216),(228,438),(450,657),(669,879),(891,1096)];ROWS=[(61,322),(334,608),(620,881),(892,1139),(1150,1411)]
DEX=['flamiot','brasilion','goutelin','torrentor','pousseron','sylvorne','ratounet','ratoroi','piafou','tetardin','crapaflot','larvigne','papivigne','volticelle','bourdonnerre','lumignon','phalumine','rocaillon','rocaroc','magmor','ombrelin','noctyrex','nocturelle','solarion','nocturion']
def extract(i,glow=False):
    (x0,x1),(y0,y1)=COLS[i%5],ROWS[i//5]
    c=A[y0+20:y1-60,x0+2:x1-2].copy();h,w,_=c.shape
    bg=np.median(np.concatenate([c[0],c[-1],c[:,0],c[:,-1]]),axis=0)
    near=np.sqrt(((c-bg)**2).sum(2))<26
    # ombre portée au sol : fond assombri, gris, dans le bas de la carte
    r=c/bg;sat=c.max(2)-c.min(2);sh=(r.max(2)-r.min(2)<.07)&(r.mean(2)>.6)&(r.mean(2)<.97)&(sat<40)
    sh[:int(h*.6)]=False;near|=sh
    if glow:
        lum=c@[.3,.59,.11];pass
    # le numéro de la carte (#01) en haut à gauche
    near[:14,:46]=True
    vis=np.zeros((h,w),bool);q=deque()
    for y in range(h):
        for x in (0,w-1):
            if near[y,x] and not vis[y,x]:vis[y,x]=1;q.append((y,x))
    for x in range(w):
        for y in (0,h-1):
            if near[y,x] and not vis[y,x]:vis[y,x]=1;q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<h and 0<=nx<w and near[ny,nx] and not vis[ny,nx]:vis[ny,nx]=1;q.append((ny,nx))
    m=~vis
    if glow:
        # ouverture morphologique : les rayons fins disparaissent, le corps épais reste
        def sh(a,dy,dx):
            b=np.zeros_like(a);ys=slice(max(dy,0),h+min(dy,0));yd=slice(max(-dy,0),h+min(-dy,0));xs=slice(max(dx,0),w+min(dx,0));xd=slice(max(-dx,0),w+min(-dx,0));b[ys,xs]=a[yd,xd];return b
        R=4;off=[(dy,dx) for dy in range(-R,R+1) for dx in range(-R,R+1) if dy*dy+dx*dx<=R*R]
        e=m.copy()
        for dy,dx in off:e&=sh(m,dy,dx)
        d=np.zeros_like(m)
        for dy,dx in off:d|=sh(e,dy,dx)
        m=d&m
    # composantes : on garde la créature, on retire étincelles et particules isolées
    lab=np.zeros((h,w),int);sizes=[];n=0
    for y in range(h):
        for x in range(w):
            if m[y,x] and not lab[y,x]:
                n+=1;lab[y,x]=n;q=deque([(y,x)]);s=0
                while q:
                    yy,xx=q.popleft();s+=1
                    for dy,dx in((1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)):
                        ny,nx=yy+dy,xx+dx
                        if 0<=ny<h and 0<=nx<w and m[ny,nx] and not lab[ny,nx]:lab[ny,nx]=n;q.append((ny,nx))
                sizes.append(s)
    big=max(sizes);keep=[k+1 for k,s in enumerate(sizes) if s>=big*.06]
    m=np.isin(lab,keep)
    ys,xs=np.where(m);return c[ys.min():ys.max()+1,xs.min():xs.max()+1],m[ys.min():ys.max()+1,xs.min():xs.max()+1]
def kmeans(P,k):
    P=P.astype(float);lum=P@[.3,.59,.11];idx=np.argsort(lum);C=P[idx[np.linspace(0,len(P)-1,k).astype(int)]]
    for _ in range(14):
        d=((P[:,None,:]-C[None])**2).sum(2);l=d.argmin(1)
        for j in range(k):
            if (l==j).any():C[j]=P[l==j].mean(0)
    return C,l
def pixelize(c,m,size,k):
    h,w=m.shape;s=size/max(h,w);tw,th=max(1,round(w*s)),max(1,round(h*s))
    rgb=np.zeros((th,tw,3));al=np.zeros((th,tw))
    for ty in range(th):
        for tx in range(tw):
            ya,yb=int(ty/s),max(int(ty/s)+1,int((ty+1)/s));xa,xb=int(tx/s),max(int(tx/s)+1,int((tx+1)/s))
            mm=m[ya:yb,xa:xb];al[ty,tx]=mm.mean()
            if mm.any():
                px=c[ya:yb,xa:xb][mm];lum=px@[.3,.59,.11]
                # la couleur dominante plutôt que la moyenne : garde les contours sombres et les reflets nets
                med=np.median(lum);sel=px[lum<=med] if (lum.max()-lum.min())>90 and (lum<70).mean()>.25 else px
                rgb[ty,tx]=np.median(sel,axis=0)
    op=al>.45
    # retire les pixels isolés
    o2=op.copy()
    for y in range(th):
        for x in range(tw):
            if op[y,x] and sum(op[y+dy,x+dx] for dy,dx in((1,0),(-1,0),(0,1),(0,-1)) if 0<=y+dy<th and 0<=x+dx<tw)<=1:o2[y,x]=0
    op=o2
    C,l=kmeans(rgb[op],k);q=np.zeros_like(rgb);q[op]=C[l]
    # contour sombre d'un pixel, teinté par la couleur voisine
    out=q.copy()
    for y in range(th):
        for x in range(tw):
            if op[y,x] and any(not(0<=y+dy<th and 0<=x+dx<tw) or not op[y+dy,x+dx] for dy,dx in((1,0),(-1,0),(0,1),(0,-1))):
                out[y,x]=q[y,x]*.28+np.array([20,14,32])*.72
    img=np.zeros((size,size,4),np.uint8);oy=size-th;ox=(size-tw)//2
    img[oy:oy+th,ox:ox+tw,:3]=out.clip(0,255);img[oy:oy+th,ox:ox+tw,3]=op*255
    return Image.fromarray(img,'RGBA')
res={}
for i,id in enumerate(DEX):
    c,m=extract(i,id=='solarion');leg=id in('solarion','nocturion')
    a48=pixelize(c,m,46 if not leg else 47,16);a60=pixelize(c,m,58 if not leg else 59,18)
    s48=Image.new('RGBA',(48,48));s48.paste(a48,(1,1));s60=Image.new('RGBA',(60,60));s60.paste(a60,(1,1))
    imgs={'48':s48,'96':s48.resize((96,96),Image.NEAREST),'120':s60.resize((120,120),Image.NEAREST)}
    res[id]={}
    for k,im in imgs.items():
        b=io.BytesIO();im.save(b,'PNG');res[id][k]=base64.b64encode(b.getvalue()).decode()
    imgs['120'].save(OUT+id+'.png');print(id,c.shape,flush=True)
json.dump(res,open(OUT+'sprites.json','w'))
