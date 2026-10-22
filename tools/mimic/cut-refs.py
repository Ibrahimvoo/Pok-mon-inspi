# Cuts the refs out of the two source videos (tools/mimic/refs-src.json: video, start, end in seconds).
# The bounds follow the video's own cuts (scene changes and the black transitions between memes, whose "boom" is
# never kept); inside them the silence before and after the meme is trimmed, a ref longer than `max` seconds ends at
# its quietest moment past `max - 1.5` s, then the level is evened out (-17 dBFS of speech) and the ref is encoded.
# usage: python3 cut-refs.py refs-src.json video1 video2 outdir
import sys, json, wave, subprocess, os, numpy as np
SRC, V1, V2, OUT = sys.argv[1:5]
os.makedirs(OUT, exist_ok=True)
SR, H = 44100, 441                       # 10 ms frames
def pcm(video, a, b):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', video, '-vn', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
def frames(y):
    n = len(y) // H; f = y[:n * H].reshape(n, H)
    db = 20 * np.log10(np.sqrt((f ** 2).mean(1)) + 1e-7)
    zc = np.abs(np.diff(np.sign(f), axis=1)).mean(1) / 2 * SR / 1000
    return db, zc
report = {}
for r in json.load(open(SRC)):
    y = pcm(V1 if r['v'] == 1 else V2, r['a'], r['b'])
    db, zc = frames(y)
    # a transition "boom" (loud and almost only bass) touching an edge belongs to the black screen, not to the meme
    boom = (db > -14) & (zc < .35)
    s, e = 0, len(db)
    while s < e and boom[s]: s += 1
    while e > s and boom[e - 1]: e -= 1
    # silence before / after the meme
    thr = max(-46, db[s:e].max() - 34)
    act = np.where(db[s:e] > thr)[0] + s
    s, e = max(s, act[0] - 4), min(e, act[-1] + 9)
    # too long: end at the quietest 150 ms between max - 1.5 s and max
    if r.get('max') and (e - s) * H / SR > r['max']:
        lo, hi = s + int((r['max'] - 1.5) * 100), s + int(r['max'] * 100)
        win = np.convolve(db, np.ones(15) / 15, 'same')
        e = lo + int(np.argmin(win[lo:hi])) + 5
    y = y[s * H:e * H].copy()
    # level: speech RMS to -17 dBFS, peaks softly limited
    act_rms = np.sqrt(np.mean(y[np.abs(y) > 10 ** (thr / 20)] ** 2) + 1e-12)
    y = y * (10 ** (-17 / 20) / act_rms)
    y = np.tanh(y * 1.1) / np.tanh(1.1) * .89
    fi, fo = int(.008 * SR), int(.03 * SR)
    y[:fi] *= np.linspace(0, 1, fi); y[-fo:] *= np.linspace(1, 0, fo)
    tmp = f'{OUT}/.tmp.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-c:a', 'libmp3lame', '-b:a', '64k', '-ar', str(SR), '-ac', '1', f"{OUT}/{r['id']}.mp3"], check=True)
    os.remove(tmp)
    t0, t1 = r['a'] + s * H / SR, r['a'] + e * H / SR
    report[r['id']] = {'v': r['v'], 'from': round(t0, 2), 'to': round(t1, 2), 'dur': round(len(y) / SR, 2)}
    print(f"{r['id']:40s} v{r['v']} {t0:7.2f} → {t1:7.2f}  {len(y) / SR:5.2f} s")
json.dump(report, open(f'{OUT}/cuts.json', 'w'), indent=1)
