import urllib.request
import re
import os

url = 'https://edu-xservices.arthtechnology.in/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open('scratch/site_raw.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print('Saved site_raw.html, length:', len(html))

        # Find all stylesheets
        css_links = re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\'][^>]*>', html, re.I)
        print('CSS links:', css_links)

        # Find font links
        font_links = re.findall(r'<link[^>]+href=["\']([^"\']*fonts\.googleapis\.com[^"\']*)["\'][^>]*>', html, re.I)
        print('Font links:', font_links)

        # Download CSS files
        for c in css_links:
            c_url = c if c.startswith('http') else url.rstrip('/') + '/' + c.lstrip('/')
            print('Downloading:', c_url)
            try:
                c_req = urllib.request.Request(c_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(c_req) as c_res:
                    c_content = c_res.read().decode('utf-8', errors='ignore')
                    fname = os.path.basename(c.split('?')[0])
                    with open(f'scratch/{fname}', 'w', encoding='utf-8') as f_out:
                        f_out.write(c_content)
                    print(f'Saved scratch/{fname}, size: {len(c_content)}')
            except Exception as e:
                print('Error downloading CSS:', e)

except Exception as e:
    print('Error fetching page:', e)
