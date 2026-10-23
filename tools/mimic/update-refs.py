# Updates src/mimic/refs.json from the cut report (durations) and keeps titles, lyrics, tags and packs.
import sys, json
REFS, CUTS = sys.argv[1:3]
refs, cuts = json.load(open(REFS)), json.load(open(CUTS))
FIX = {
 # the part of the rant that says it (the same clip also gives « Tu touches à ma sensibilité »)
 'ton-gros-front-la': {'say': ['mon gros front', 'gros front']},
 'tu-touches-a-ma-sensibilite': {'say': ['tu touches à ma sensibilité']},
 'descends': {'say': ['descends', 'arrête de crier']},
 'je-roucoule': {'say': ['je roucoule', "je t'attache"]},
}
NEW = {'oui-je-l-ai': {'id': 'oui-je-l-ai', 'title': "Oui je l'ai", 'say': ["oui je l'ai", 'dis-moi la marchandise'], 'pack': 'africa', 'after': 'tu-touches-a-ma-sensibilite'}}
out = []
for r in refs:
    r = {**r, **FIX.get(r['id'], {})}
    out.append(r)
    for n in NEW.values():
        if n['after'] == r['id'] and n['id'] not in [x['id'] for x in refs]: out.append({k: v for k, v in n.items() if k != 'after'})
for r in out:
    if r['id'] not in cuts: sys.exit(f"no cut for {r['id']}")
    d = {'id': r['id'], 'title': r['title'], 'dur': cuts[r['id']]['dur']}
    for k in ('say', 'mystery', 'tags', 'pack'):
        if k in r: d[k] = r[k]
    r.clear(); r.update(d)
missing = set(cuts) - {r['id'] for r in out}
if missing: sys.exit(f'cuts without a ref: {missing}')
json.dump(out, open(REFS, 'w'), ensure_ascii=False, indent=1)
print(len(out), 'refs')
