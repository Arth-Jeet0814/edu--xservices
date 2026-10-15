import re

with open('scratch/site_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Header details
header = re.search(r'<header[^>]*>([\s\S]*?)</header>', html)
if header:
    with open('scratch/target_header.html', 'w', encoding='utf-8') as f_out:
        f_out.write(header.group(0))
    print('Saved scratch/target_header.html')

# Hero details
hero = re.search(r'<section[^>]*gradient-hero[^>]*>([\s\S]*?)</section>', html)
if hero:
    with open('scratch/target_hero.html', 'w', encoding='utf-8') as f_out:
        f_out.write(hero.group(0))
    print('Saved scratch/target_hero.html')

# Inspect button classes
buttons = re.findall(r'<button[^>]+class=["\']([^"\']*)["\']', html)
print('\nButton classes:')
for b in set(buttons)[:8]:
    print(' -', b)

# Inspect a links with button-like classes
btn_links = re.findall(r'<a[^>]+class=["\']([^"\']*(?:btn|bg-primary|bg-accent|rounded|shadow)[^"\']*)["\']', html)
print('\nButton links:')
for bl in set(btn_links)[:8]:
    print(' -', bl)
