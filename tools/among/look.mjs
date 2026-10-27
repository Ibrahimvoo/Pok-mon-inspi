// Dev helper: free play in a real browser, run a script of steps and take screenshots.
// Usage: node tools/among/look.mjs <skeld|polus> <outDir> '<js steps body>'   (steps get: page, P (eval helper), shot(name), sleep)
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const dist = join(dirname(fileURLToPath(import.meta.url)), '../../dist');
const [map = 'skeld', out = '.', body = ''] = process.argv.slice(2);
await mkdir(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg', '.png': 'image/png' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const b = await readFile(join(dist, p === '/' ? 'index.html' : p)); res.writeHead(200, { 'Content-Type': types[extname(p)] || 'text/html' }); res.end(b); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/Failed to load|WebSocket|ERR_/.test(m.text())) errs.push(m.text()); });
await page.goto(`http://localhost:${web.address().port}/?aufps=8`);
await page.keyboard.press('Enter');
await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Test');
if (await page.$('.f-input >> nth=1')) await page.fill('.f-input >> nth=1', 'manette123');
await page.click('.acc-submit'); await page.waitForSelector('.home .tile'); await page.waitForTimeout(400);
const [idx, cur] = await page.evaluate(() => { const t = [...document.querySelectorAll('.home .tile')]; return [t.findIndex(e => e.querySelector('.tile-label')?.textContent.trim() === 'Among Us'), t.findIndex(e => e.classList.contains('focused'))]; });
for (let i = cur; i < idx; i++) await page.keyboard.press('ArrowRight');
for (let i = cur; i > idx; i--) await page.keyboard.press('ArrowLeft');
await page.keyboard.press('Enter'); await page.waitForSelector('.au-main');
await page.click('.am-big:has-text("JOUER")'); await page.click('.am-small:has-text("ENTRAÎNEMENT")'); await page.click(`.am-map >> nth=${map === 'polus' ? 1 : 0}`);
await page.waitForFunction(() => globalThis.__au?.c?.phase === 'play' && globalThis.__au.c.v?.tasks?.length, null, { timeout: 30000 });
const P = (fn, arg) => page.evaluate(fn, arg);
const shot = n => page.screenshot({ path: join(out, n + '.png'), timeout: 120000 });
const sleep = ms => page.waitForTimeout(ms);
try { await new Function('page', 'P', 'shot', 'sleep', `return (async () => { ${body} })()`)(page, P, shot, sleep); } catch (e) { console.log('STEP ERROR', e.message); }
console.log(errs.length ? 'PAGE ERRORS: ' + errs.join(' | ') : 'no page errors');
await browser.close(); web.close();
