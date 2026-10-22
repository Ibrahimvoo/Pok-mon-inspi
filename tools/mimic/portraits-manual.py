# Hand-picked portrait crops (time, centre x, centre y, size in the 720x1280 frame) where face detection was poor.
import sys, subprocess, numpy as np, cv2
V = {1: sys.argv[1], 2: sys.argv[2]}; OUT, PREV = sys.argv[3:5]
M = {
 'des-chevals-qui-appellent-des-chevals': (1, 17.7, 260, 1000, 400), 'guettez-le-gateau': (1, 39.2, 360, 1025, 480),
 'ref-mystere-l-interview': (1, 52.8, 330, 430, 420), 'descends': (1, 85.0, 330, 560, 240), 'c-est-moi-wesh': (2, 9.1, 330, 1000, 500),
 'on-ne-pleure-pas': (2, 59.0, 380, 330, 300), 'quelle-humiliation': (2, 66.7, 365, 455, 210), 'moi-je-mange-pas-le-nem': (2, 86.2, 220, 548, 150),
 'tu-m-sors-ton-pepper-spray': (1, 3.3, 330, 940, 360), 'je-change-de-vie': (1, 25.9, 360, 875, 420), 'ref-mystere-le-velo': (1, 49.2, 360, 800, 560),
 'sakura-sasuke-remix': (1, 66.1, 330, 400, 420), 'je-roucoule': (1, 90.0, 400, 380, 200), 'ton-gros-front-la': (1, 98.5, 300, 480, 300),
 'un-proverbe-chinois': (2, 92.7, 420, 420, 200), 'un-entonnoir-un-entonnoir': (2, 102.5, 410, 390, 260), 'un-p-tit-wrap': (2, 110.9, 300, 1000, 420),
 'tu-touches-a-ma-sensibilite': (2, 148.1, 470, 920, 240), 'chante-skype': (2, 140.5, 360, 700, 600), 'ca-va-peter': (2, 158.0, 330, 930, 420),
}
for rid, (v, t, cx, cy, s) in M.items():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.2f}', '-i', V[v], '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-'], capture_output=True).stdout
    im = np.frombuffer(raw, np.uint8).reshape(1280, 720, 3)
    x0 = int(max(0, min(720 - s, cx - s / 2))); y0 = int(max(0, min(1280 - s, cy - s / 2)))
    crop = cv2.resize(im[y0:y0 + s, x0:x0 + s], (256, 256), interpolation=cv2.INTER_AREA)
    cv2.imwrite(f'{OUT}/{rid}.webp', crop, [cv2.IMWRITE_WEBP_QUALITY, 82]); cv2.imwrite(f'{PREV}/{rid}.jpg', cv2.resize(crop, (128, 128)))
