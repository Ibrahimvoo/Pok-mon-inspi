// Screenshots of the dev viewer: node tools/pouf/shot.mjs <out.jpg> "<query>" [WxH]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [out, query = '', size = '1280x720', page0 = 'view'] = process.argv.slice(2);
const [w, h] = size.split('x').map(Number);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: w, height: h } });
const errs = [];
page.on('pageerror', e => { errs.push(e.message); page.evaluate(() => { window.failed = true; }).catch(() => {}); }); page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
await page.goto(`http://localhost:${process.env.PORT || 5173}/tools/pouf/${page0}.html?${query}`);
await page.waitForFunction(() => window.ready || window.failed, null, { timeout: 90000 }).catch(e => errs.push('timeout ' + e.message));
await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
console.log(errs.length ? errs.join('\n') : 'ok');
await browser.close();
