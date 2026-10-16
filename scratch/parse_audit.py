import json

with open('scratch/full_audit_data.json', encoding='utf-8') as f:
    d = json.load(f)

for page in ['Home', 'About Us', 'Course Finder', 'Destinations', 'University Partnerships', 'Book A Demo', 'Privacy Policy']:
    pdata = d[page]['1280px']
    print(f'=== {page} ===')
    h_tags = [h['tag'] for h in pdata.get('headings', [])]
    h1s = [h['text'] for h in pdata.get('headings', []) if h['tag'] == 'H1']
    print(f'H1 count: {len(h1s)}, H1 text: {h1s}')
    
    levels = [int(t[1]) for t in h_tags]
    skips = []
    for i in range(len(levels)-1):
        if levels[i+1] > levels[i] + 1:
            skips.append(f'H{levels[i]} -> H{levels[i+1]}: "{pdata["headings"][i]["text"]}" -> "{pdata["headings"][i+1]["text"]}"')
    if skips:
        print(f'Skipped heading levels count: {len(skips)}')
        for s in skips[:3]:
            print(f'  {s}')
    
    nolabel = pdata.get('inputsMissingLabels', [])
    if nolabel:
        print(f'Inputs missing labels: {nolabel}')

    dead = pdata.get('deadLinks', [])
    if dead:
        print(f'Anchor links: {dead}')

    small = pdata.get('smallTargets', [])
    print(f'Small targets ({pdata.get("smallTargetsCount")}): {[s["text"] + " (" + str(s["width"]) + "x" + str(s["height"]) + "px)" for s in small[:6]]}')
    print()
