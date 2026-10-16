import subprocess, time, json, urllib.request, os, asyncio
from tornado.websocket import websocket_connect
from tornado.ioloop import IOLoop

PAGES = [
    ('/', 'Home'),
    ('/about-us', 'About Us'),
    ('/course-finder', 'Course Finder'),
    ('/destinations', 'Destinations'),
    ('/university-partnerships', 'University Partnerships'),
    ('/book-a-demo', 'Book A Demo'),
    ('/privacy-policy', 'Privacy Policy'),
    ('/terms-conditions', 'Terms & Conditions')
]

VIEWPORTS = [
    (360, 800, '360px'),
    (768, 1024, '768px'),
    (1280, 800, '1280px'),
    (1920, 1080, '1920px')
]

AUDIT_JS = '''
(() => {
    const results = {
        title: document.title,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        overflowElements: [],
        headings: [],
        images: [],
        buttonsAndLinks: [],
        forms: [],
        contrastIssues: [],
        focusOutlineIssues: []
    };

    // 1. Check Horizontal Overflow Elements
    const w = window.innerWidth;
    document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > w + 2 && r.width > 0 && r.height > 0) {
            results.overflowElements.push({
                tag: el.tagName,
                id: el.id || null,
                className: (el.className || '').toString().slice(0, 100),
                right: Math.round(r.right),
                width: Math.round(r.width)
            });
        }
    });

    // 2. Headings hierarchy
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        results.headings.push({
            level: h.tagName,
            text: h.innerText.trim().slice(0, 60),
            isVisible: h.offsetParent !== null
        });
    });

    // 3. Images audit
    document.querySelectorAll('img').forEach(img => {
        results.images.push({
            src: img.getAttribute('src') || '',
            alt: img.getAttribute('alt'),
            hasAlt: img.hasAttribute('alt'),
            widthAttr: img.getAttribute('width'),
            heightAttr: img.getAttribute('height'),
            renderedWidth: img.naturalWidth || img.width,
            renderedHeight: img.naturalHeight || img.height,
            isLazy: img.getAttribute('loading') === 'lazy'
        });
    });

    // 4. Touch target sizes (< 44px)
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && el.offsetParent !== null) {
            const hasMinSize = r.width >= 43.5 && r.height >= 43.5;
            if (!hasMinSize) {
                results.buttonsAndLinks.push({
                    tag: el.tagName,
                    text: (el.innerText || el.getAttribute('aria-label') || el.value || '').trim().slice(0, 30),
                    width: Math.round(r.width),
                    height: Math.round(r.height),
                    href: el.getAttribute('href') || null,
                    className: (el.className || '').toString().slice(0, 80)
                });
            }
        }
    });

    // 5. Form controls audit
    document.querySelectorAll('input, select, textarea').forEach(inp => {
        const id = inp.id;
        const type = inp.type || inp.tagName.toLowerCase();
        let hasLabel = false;
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label && label.innerText.trim().length > 0) hasLabel = true;
        }
        if (inp.closest('label')) hasLabel = true;
        if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby')) hasLabel = true;

        results.forms.push({
            tag: inp.tagName,
            type: type,
            id: id || null,
            name: inp.name || null,
            hasLabel: hasLabel,
            placeholder: inp.placeholder || null,
            required: inp.required,
            hasAriaRequired: inp.getAttribute('aria-required') === 'true',
            hasAriaInvalid: inp.hasAttribute('aria-invalid')
        });
    });

    return results;
})()
'''

async def main():
    user_data = os.path.join(os.environ['TEMP'], 'chrome_audit_profile')
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f'--user-data-dir={user_data}',
        '--remote-debugging-port=9222',
        'http://localhost:5173/'
    ])
    time.sleep(2)
    
    output = {}
    try:
        req = urllib.request.urlopen('http://localhost:9222/json')
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]['webSocketDebuggerUrl']
        ws = await websocket_connect(ws_url, max_message_size=50*1024*1024)

        msg_id = 1
        async def call(method, params=None):
            nonlocal msg_id
            m = {'id': msg_id, 'method': method, 'params': params or {}}
            msg_id += 1
            await ws.write_message(json.dumps(m))
            while True:
                msg = await ws.read_message()
                resp = json.loads(msg)
                if resp.get('id') == m['id']:
                    return resp.get('result', {})

        await call('Page.enable')

        for path, page_name in PAGES:
            output[page_name] = {}
            url = f'http://localhost:5173{path}'
            for w, h, vp_name in VIEWPORTS:
                # Set viewport size
                await call('Emulation.setDeviceMetricsOverride', {
                    'width': w,
                    'height': h,
                    'deviceScaleFactor': 1,
                    'mobile': w < 768
                })
                await call('Page.navigate', {'url': url})
                # wait for page load & animations
                await asyncio.sleep(0.8)
                
                res = await call('Runtime.evaluate', {
                    'expression': AUDIT_JS,
                    'returnByValue': True
                })
                data = res.get('result', {}).get('value', {})
                output[page_name][vp_name] = data
                print(f"[{page_name}] @ {vp_name}: Overflow={data.get('hasHorizontalOverflow')}, Headings={len(data.get('headings', []))}, SmallTargets={len(data.get('buttonsAndLinks', []))}")

        with open('scratch/audit_results.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2)
        print('Saved scratch/audit_results.json successfully!')

        ws.close()
    finally:
        proc.terminate()

IOLoop.current().run_sync(main)
