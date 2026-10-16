const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirect = res.headers.location;
        if (!redirect.startsWith('http')) {
          const u = new URL(url);
          redirect = u.origin + redirect;
        }
        return resolve(fetch(redirect));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetch('https://edu-xservices.arthtechnology.in/');
  fs.writeFileSync('scratch/site_raw.html', html);
  console.log('HTML saved! Total length:', html.length);

  // Extract stylesheets
  const linkRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi;
  let match;
  const cssUrls = [];
  while ((match = linkRegex.exec(html)) !== null) {
    cssUrls.push(match[1]);
  }
  console.log('Found CSS URLs:', cssUrls);

  // Extract font links
  const fontRegex = /<link[^>]+href=["']([^"']*fonts\.googleapis\.com[^"']*)["'][^>]*>/gi;
  const fontUrls = [];
  while ((match = fontRegex.exec(html)) !== null) {
    fontUrls.push(match[1]);
  }
  console.log('Found Google Font URLs:', fontUrls);

  // Download CSS files
  for (let u of cssUrls) {
    let fullUrl = u;
    if (!fullUrl.startsWith('http')) {
      fullUrl = 'https://edu-xservices.arthtechnology.in/' + fullUrl.replace(/^\//, '');
    }
    console.log('Fetching CSS:', fullUrl);
    try {
      const css = await fetch(fullUrl);
      const filename = 'scratch/css_' + u.split('/').pop().split('?')[0];
      fs.writeFileSync(filename, css);
      console.log('Saved', filename, 'bytes:', css.length);
    } catch (e) {
      console.error('Error fetching', fullUrl, e.message);
    }
  }
}

run().catch(console.error);
