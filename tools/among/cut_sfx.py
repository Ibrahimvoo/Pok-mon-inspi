# Cuts the role reveal sound effects out of the supplied "All roles sound effects" video (windows found on its
# frames, onset found on the audio). Usage: python3 -I tools/among/cut_sfx.py video.mp4 outdir
import sys, subprocess, wave, numpy as np, tempfile, os
video, out = sys.argv[1], sys.argv[2]
W = { 'shhh': (0, 2.9), 'introCrew': (3, 5.9), 'introImp': (52.6, 55.6), 'crewmate': (6.5, 9.2), 'engineer': (13, 15.9), 'guardianAngel': (19.4, 22.2),
      'scientist': (25.8, 28.9), 'tracker': (32.4, 35.9), 'noisemaker': (39.4, 42.9), 'detective': (46.4, 51.9), 'impostor': (55.8, 60.6),
      'shapeshifter': (65.4, 69.9), 'phantom': (73.4, 79.9), 'viper': (83.6, 88.2) }
tmp = os.path.join(tempfile.mkdtemp(), 'a.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-vn', '-ac', '1', '-ar', '16000', tmp], check=True)
w = wave.open(tmp); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768; sr = 16000
hop = 320
for name, (t0, t1) in W.items():
    seg = a[int(t0 * sr):int(t1 * sr)]
    db = 20 * np.log10(np.array([np.sqrt((seg[i:i + hop] ** 2).mean()) for i in range(0, len(seg) - hop, hop)]) + 1e-9)
    floor = np.percentile(db, 10)
    on = next((i for i, v in enumerate(db) if v > floor + 9), 0)
    start = t0 + max(0, on - 2) * hop / sr
    dur = min(2.8, t1 - start)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{start:.3f}', '-t', f'{dur:.3f}', '-i', video, '-vn', '-ac', '1', '-ar', '44100',
                    '-af', f'afade=t=out:st={max(0, dur - .45):.3f}:d=0.45,loudnorm=I=-18:TP=-2', '-c:a', 'libmp3lame', '-b:a', '96k', os.path.join(out, name + '.mp3')], check=True)
    print(name, f'{start:.2f}s +{dur:.2f}s')
