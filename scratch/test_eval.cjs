const { spawn } = require('child_process');

(async () => {
  const chrome = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
  const proc = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--remote-debugging-port=9222',
    'http://localhost:5173/'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  const tabs = await (await fetch('http://localhost:9222/json')).json();
  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('5173')) || tabs.find(t => t.type === 'page');
  console.log('Target tab:', pageTab.title, pageTab.url);

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const call = (method, params = {}) => new Promise(res => {
    const cur = id++;
    const onmsg = e => {
      const d = JSON.parse(e.data);
      if (d.id === cur) { ws.removeEventListener('message', onmsg); res(d.result); }
    };
    ws.addEventListener('message', onmsg);
    ws.send(JSON.stringify({ id: cur, method, params }));
  });
  await call('Page.enable');
  await new Promise(r => setTimeout(r, 1500));
  const evalRes = await call('Runtime.evaluate', {
    expression: 'document.querySelectorAll("h1, h2, h3").length + " headings. Title: " + document.title + ". Root children: " + document.getElementById("root").children.length'
  });
  console.log('Result:', evalRes.result.value);
  ws.close();
  proc.kill();
})();
