import sys
from PIL import Image
files=sys.argv[2:]; cols=2
ims=[Image.open(f).convert('RGB').resize((640,360)) for f in files]
rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(640*cols,360*rows))
for i,im in enumerate(ims): S.paste(im,((i%cols)*640,(i//cols)*360))
S.save(sys.argv[1],quality=80)
