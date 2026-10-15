import re

with open('scratch/site_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Header
header = re.search(r'<header[^>]*>[\s\S]*?</header>', html)
if header:
    print('HEADER:\n', header.group(0)[:800])
else:
    print('No header tag, finding top nav:')
    nav = re.search(r'<nav[^>]*>[\s\S]*?</nav>', html)
    if nav:
        print('NAV:\n', nav.group(0)[:800])

# Main sections
sections = re.findall(r'<section[^>]*class=["\']([^"\']*)["\']', html)
print('\nSections classes:')
for s in sections[:10]:
    print(' ', s)

# Footer
footer = re.search(r'<footer[^>]*>[\s\S]*?</footer>', html)
if footer:
    print('\nFOOTER:\n', footer.group(0)[:800])

# Hero
hero = re.search(r'<section[^>]*class=["\'][^"\']*(?:hero|gradient)[^"\']*["\'][\s\S]*?</section>', html)
if hero:
    print('\nHERO:\n', hero.group(0)[:800])
