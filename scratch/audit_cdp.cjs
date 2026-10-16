const { spawn } = require('child_process');
const fs = require('fs');

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/about-us', name: 'About Us' },
  { path: '/course-finder', name: 'Course Finder' },
  { path: '/destinations', name: 'Destinations' },
  { path: '/university-partnerships', name: 'University Partnerships' },
  { path: '/book-a-demo', name: 'Book A Demo' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/terms-conditions', name: 'Terms & Conditions' }
];

const VIEWPORTS = [
  { width: 360, height: 800, label: '360px' },
  { width: 768, height: 1024, label: '768px' },
  { width: 1280, height: 800, label: '1280px' },
  { width: 1920, height: 1080, label: '1920px' }
];

const AUDIT_SCRIPT = `
(() => {
  const docW = document.documentElement.offsetWidth;
  const scrollW = document.documentElement.scrollWidth;
  const innerW = window.innerWidth;
  
  // 1. Horizontal overflow
  const overflowing = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > innerW + 1 && r.width > 0 && r.height > 0) {
      overflowing.push({
        tag: el.tagName,
        id: el.id || '',
        className: (el.className || '').toString().slice(0, 100),
        right: Math.round(r.right),
        width: Math.round(r.width)
      });
    }
  });

  // 2. Headings hierarchy
  const headings = [];
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
    headings.push({
      tag: h.tagName,
      text: h.innerText.trim().slice(0, 80),
      visible: h.offsetParent !== null
    });
  });

  // 3. Images audit
  const images = [];
  document.querySelectorAll('img').forEach(img => {
    images.push({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt'),
      hasAlt: img.hasAttribute('alt'),
      widthAttr: img.getAttribute('width'),
      heightAttr: img.getAttribute('height'),
      isLazy: img.getAttribute('loading') === 'lazy',
      naturalW: img.naturalWidth,
      naturalH: img.naturalHeight
    });
  });

  // 4. Touch target sizes (< 44px)
  const smallTargets = [];
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    if (el.offsetParent !== null) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && (r.width < 43.5 || r.height < 43.5)) {
        smallTargets.push({
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

  // 5. Form inputs
  const formInputs = [];
  document.querySelectorAll('input, select, textarea').forEach(inp => {
    let hasLabel = false;
    if (inp.id) {
      const l = document.querySelector(\`label[for="\${inp.id}"]\`);
      if (l && l.innerText.trim()) hasLabel = true;
    }
    if (inp.closest('label')) hasLabel = true;
    if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby')) hasLabel = true;

    formInputs.push({
      tag: inp.tagName,
      type: inp.type || 'text',
      id: inp.id || null,
      name: inp.name || null,
      hasLabel,
      hasAriaInvalid: inp.hasAttribute('aria-invalid'),
      hasAriaRequired: inp.hasAttribute('aria-required') || inp.required
    });
  });

  // 6. Navigation links
  const links = [];
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '' || (href && href.startsWith('#'))) {
      links.push({
        text: a.innerText.trim().slice(0, 40),
        href,
        className: (a.className || '').toString().slice(0, 80)
      });
    }
  });

  // 7. ARIA / A11y checks
  const ariaChecks = {
    missingAriaLabelsOnButtons: [],
    emptyLinks: []
  };
  document.querySelectorAll('button').forEach(b => {
    const text = b.innerText.trim();
    const aria = b.getAttribute('aria-label') || b.getAttribute('aria-labelledby');
    if (!text && !aria) {
      ariaChecks.missingAriaLabelsOnButtons.push({
        className: (b.className || '').toString().slice(0, 80)
      });
    }
  });
  document.querySelectorAll('a').forEach(a => {
    const text = a.innerText.trim();
    const aria = a.getAttribute('aria-label') || a.getAttribute('aria-labelledby');
    const img = a.querySelector('img');
    if (!text && !aria && (!img || !img.getAttribute('alt'))) {
      ariaChecks.emptyLinks.push({
        href: a.getAttribute('href'),
        className: (a.className || '').toString().slice(0, 80)
      });
    }
  });

  return {
    title: document.title,
    docWidth: docW,
    scrollWidth: scrollW,
    innerWidth: innerW,
    hasOverflow: scrollW > innerW,
    overflowCount: overflowing.length,
    overflowing: overflowing.slice(0, 8),
    headingsCount: headings.length,
    headings,
    imagesCount: images.length,
    imagesMissingAlt: images.filter(i => !i.hasAlt || i.alt === null || i.alt.trim() === ''),
    imagesMissingDimensions: images.filter(i => !i.widthAttr || !i.heightAttr),
    smallTargetsCount: smallTargets.length,
    smallTargets: smallTargets.slice(0, 15),
    formInputsCount: formInputs.length,
    inputsMissingLabels: formInputs.filter(f => !f.hasLabel),
    deadLinks: links,
    ariaChecks
  };
})()
`;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const chromePath = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--remote-debugging-port=9222',
    'http://localhost:5173/'
  ]);

  await sleep(2500);

  try {
    const listRes = await fetch('http://localhost:9222/json');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5173')) || tabs.find(t => t.type === 'page');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    const pending = new Map();
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg.result || msg.error);
        pending.delete(msg.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        pending.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');

    const auditResults = {};

    for (const page of PAGES) {
      auditResults[page.name] = {};
      const targetUrl = `http://localhost:5173${page.path}`;

      for (const vp of VIEWPORTS) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });

        await send('Page.navigate', { url: targetUrl });
        await sleep(1000);

        const evalRes = await send('Runtime.evaluate', {
          expression: AUDIT_SCRIPT,
          returnByValue: true
        });

        const data = evalRes.result ? evalRes.result.value : null;
        auditResults[page.name][vp.label] = data;
        
        console.log(`[${page.name}] @ ${vp.label}: Overflow=${data ? data.hasOverflow : 'ERR'} (${data ? data.scrollWidth : 0}px vs ${vp.width}px), Headings=${data ? data.headingsCount : 0}, SmallTargets=${data ? data.smallTargetsCount : 0}, InputsMissingLabels=${data ? data.inputsMissingLabels.length : 0}`);
      }
    }

    ws.close();
    fs.writeFileSync('scratch/full_audit_data.json', JSON.stringify(auditResults, null, 2), 'utf8');
    console.log('Audit complete! Output saved to scratch/full_audit_data.json');
  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    proc.kill();
  }
}

run();
