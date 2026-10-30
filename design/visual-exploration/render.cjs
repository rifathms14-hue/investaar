const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch();
  for (const n of ['a', 'b', 'c']) {
    const p = await b.newPage({ viewport: { width: 1500, height: 1500 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(`direction-${n}.html`)); await p.waitForTimeout(500);
    await (await p.$('.board')).screenshot({ path: `direction-${n}.png` }); await p.close(); }
  await b.close(); })();
