// Headless smoke test: drives the built app with the keyboard and saves screenshots.
// Usage: node tools/smoke.mjs <outDir> "<steps>"   steps: key:Enter | wait:500 | shot:name | click:selector | eval:js
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', process.env.DIST || 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const data = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const [out, steps = ''] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const [vw, vh] = (process.env.VIEWPORT || '1280x720').split('x').map(Number);
const page = await browser.newPage({ viewport: { width: vw, height: vh }, hasTouch: !!process.env.TOUCH, isMobile: !!process.env.TOUCH });
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text()); });
page.on('requestfailed', r => errors.push('requestfailed: ' + r.url()));
if (process.env.FAKEPAD) await page.addInitScript(id => {
  // a fake standard-mapping controller driven by the "pad:<button>" step
  const pad = { id, index: 0, connected: true, mapping: 'standard', timestamp: 0, axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) };
  window.__pad = pad;
  navigator.getGamepads = () => [pad];
  addEventListener('load', () => { const e = new Event('gamepadconnected'); e.gamepad = pad; dispatchEvent(e); });
}, process.env.FAKEPAD);
await page.goto(`http://localhost:${server.address().port}/`);
await page.waitForTimeout(800);
for (const s of steps.split(/\s*;\s*/).filter(Boolean)) {
  const [cmd, ...rest] = s.split(':'); const arg = rest.join(':');
  if (cmd === 'key') for (const k of arg.split(',')) { await page.keyboard.press(k); await page.waitForTimeout(140); }
  else if (cmd === 'wait') await page.waitForTimeout(+arg);
  else if (cmd === 'shot') await page.screenshot({ path: join(out, arg + '.jpg'), quality: 70, type: 'jpeg' });
  else if (cmd === 'click') await page.click(arg);
  else if (cmd === 'tap') await page.tap(arg);
  else if (cmd === 'fill') { const [sel, val] = arg.split('='); await page.fill(sel, val); }
  else if (cmd === 'pad') for (const b of arg.split(',')) {
    await page.evaluate(i => { window.__pad.buttons[i].pressed = true; window.__pad.buttons[i].value = 1; }, +b); await page.waitForTimeout(150);
    await page.evaluate(i => { window.__pad.buttons[i].pressed = false; window.__pad.buttons[i].value = 0; }, +b); await page.waitForTimeout(160);
  }
  else if (cmd === 'eval') console.log('eval:', JSON.stringify(await page.evaluate(arg)));
}
console.log(errors.length ? errors.join('\n') : 'no errors');
await browser.close(); server.close();
