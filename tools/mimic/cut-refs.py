# Cuts the curated refs out of the two videos: trim, cap at a natural pause, level, fade, encode MP3 + refs.json.
import sys, json, wave, subprocess, os, unicodedata, re, numpy as np
S, V1, V2, OUT = sys.argv[1:5]
os.makedirs(OUT, exist_ok=True)
REFS = json.load(open(f'{S}/refs_src.json'))
SR = 44100
def pcm(video, a, b):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-t', str(b - a), '-i', video, '-vn', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
def slug(t):
    t = unicodedata.normalize('NFD', t).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:40]
out = []
for r in REFS:
    y = pcm(V1 if r['v'] == 1 else V2, r['a'], r['b'])
    h = int(.02 * SR)
    n = len(y) // h
    db = 20 * np.log10(np.sqrt((y[:n * h].reshape(n, h) ** 2).mean(1)) + 1e-6)
    # cap long clips at the quietest moment between 5 and 7.5 s so no word is cut in half
    if len(y) > 7.6 * SR:
        lo, hi = int(5 / .02), min(n - 6, int(7.5 / .02))
        win = np.convolve(db, np.ones(6) / 6, 'same')
        cut = lo + int(np.argmin(win[lo:hi]))
        y = y[:cut * h + 3 * h]
        db = db[:cut + 3]
    # drop leading / trailing near-silence
    thr = max(-45, db.max() - 32)
    act = np.where(db > thr)[0]
    s0, s1 = max(0, act[0] - 3) * h, min(len(y), (act[-1] + 4) * h)
    y = y[s0:s1]
    # level: active RMS to -17 dBFS, soft limit peaks
    act_rms = np.sqrt(np.mean(y[np.abs(y) > 10 ** (thr / 20)] ** 2) + 1e-12)
    y = y * (10 ** (-17 / 20) / act_rms)
    y = np.tanh(y * 1.1) / np.tanh(1.1) * .89
    f = int(.025 * SR)
    y[:f] *= np.linspace(0, 1, f); y[-f * 2:] *= np.linspace(1, 0, f * 2)
    rid = slug(r['title'])
    tmp = f'{S}/tmp.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-c:a', 'libmp3lame', '-b:a', '64k', '-ar', '44100', '-ac', '1', f'{OUT}/{rid}.mp3'], check=True)
    e = {'id': rid, 'title': r['title'], 'dur': round(len(y) / SR, 2)}
    if r.get('say'): e['say'] = r['say']
    if r.get('mystery'): e['mystery'] = True
    if r.get('tags'): e['tags'] = r['tags']
    out.append(e)
    print(f"{rid:42s} {e['dur']:5.2f}s")
json.dump(out, open(f'{S}/refs.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), 'refs')
