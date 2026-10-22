// Two browsers race on foot: positions are synchronised, finishes are ranked by the host, both see the results.
// Usage: npm run build && node tools/pouf/e2e-foot.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const broker = PeerServer({ port: 9125, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9125&pfdebug&pflow`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 15000) => { try { await page.waitForFunction(fn, null, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
async function player(name, psn) {
  const page = await (await browser.newContext({ viewport: { width: 960, height: 540 } })).newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 }); await page.fill('.f-input >> nth=0', psn); await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  return page;
}
const other = (page) => page.evaluate(() => { const m = window.__pouf.match; const p = [...m.riders.values()].find(r => r.id !== window.__pouf.me.id); return { x: p.x, z: p.z, fin: p.fin, rank: p.rank }; });
try {
  const A = await player('A', 'Lievre'), B = await player('B', 'Tortue');
  await A.waitForTimeout(400); await A.click('.home .tile.sel');   // Pouf Party is selected on arrival
  await until(A, () => !!document.querySelector('.pf-title .pf-btn'), 40000);
  await A.click('.pf-btn[data-key="play"]');
  await until(A, () => window.__pouf?.lobby.online && /[A-Z0-9]{5}/.test(document.querySelector('.pf-code b')?.textContent || ''), 20000);
  await A.click('.pf-btn[data-key="course"]'); await until(A, () => !!document.querySelector('.pf-courses'), 5000);
  await A.click('.pf-ccard:has-text("Pétillant")');
  const code = await A.locator('.pf-code b').innerText();
  await B.evaluate(c => { location.hash = 'pouf=' + c; }, code);
  await until(B, () => /Rejoindre la partie/.test(document.querySelector('.dialog')?.innerText || ''), 8000);
  await B.click('.dialog button:has-text("Rejoindre")');
  ok('B dans le salon, épreuve reçue', await until(B, () => window.__pouf?.lobby.role === 'guest' && window.__pouf.course.id === 'parcours', 40000));
  await B.click('.pf-btn[data-key="start"]');
  await until(A, () => window.__pouf.lobby.members.find(m => !m.host)?.ready === true, 8000);
  await A.click('.pf-btn[data-key="start"]');
  ok('course lancée chez les deux', await until(A, () => window.__pouf.match?.kind === 'foot', 8000) && await until(B, () => window.__pouf.match?.kind === 'foot', 8000));
  for (const P of [A, B]) if (await until(P, () => !!document.querySelector('.pf-help'), 3000)) await P.click('.pf-help .pf-btn');
  await until(A, () => window.__pouf.match.t > 3.3, 20000); await until(B, () => window.__pouf.match.t > 3.3, 20000);
  const b0 = await other(A);
  await B.keyboard.down('KeyW'); await B.waitForTimeout(2000); await B.keyboard.up('KeyW');
  await A.waitForTimeout(800);
  const b1 = await other(A);
  ok('A voit B courir', b1.z - b0.z > 4, `${b0.z.toFixed(1)} → ${b1.z.toFixed(1)}`);
  const bz = await B.evaluate(() => window.__pouf.match.riders.get(window.__pouf.me.id).z);
  ok('position cohérente', Math.abs(bz - b1.z) < 2.5, `B ${bz.toFixed(1)} / vu par A ${b1.z.toFixed(1)}`);
  // A then B jump to the spring pad: A arrives first
  await A.evaluate(() => window.__pouf.match.debugTeleport(0, 3.6, 139.5));
  await A.keyboard.down('KeyW');
  ok('A arrive premier', await until(A, () => window.__pouf.match?.riders.get(window.__pouf.me.id)?.rank === 1, 12000),
    JSON.stringify(await A.evaluate(() => { const m = window.__pouf.match; return m && [...m.riders.values()].map(r => ({ n: r.name, z: +r.z.toFixed(1), y: +r.y.toFixed(1), fin: r.fin, rank: r.rank })); })));
  await A.keyboard.up('KeyW');
  ok('B voit A premier', await until(B, () => { const m = window.__pouf.match; const a = m && [...m.riders.values()].find(r => r.id !== window.__pouf.me.id); return a?.rank === 1; }, 8000));
  await B.evaluate(() => window.__pouf.match.debugTeleport(0, 3.6, 139.5));
  await B.keyboard.down('KeyW');
  ok('B arrive deuxième', await until(B, () => window.__pouf.match?.riders.get(window.__pouf.me.id)?.rank === 2 || /2e/.test(document.querySelector('.pf-results')?.textContent || ''), 15000),
    JSON.stringify(await B.evaluate(() => { const m = window.__pouf.match; return m ? { t: +m.t.toFixed(1), fps: Math.round(window.__fps), riders: [...m.riders.values()].map(r => ({ n: r.name, z: +r.z.toFixed(1), y: +r.y.toFixed(1), fin: r.fin, rank: r.rank, f: r.flags })) } : { state: window.__pouf.state }; })));
  await B.keyboard.up('KeyW');
  ok('résultats : A 1er, B 2e chez A', await until(A, () => { const t = document.querySelector('.pf-results')?.textContent || ''; return /1er/.test(t) && /Lievre/.test(t) && /2e/.test(t); }, 12000));
  ok('résultats chez B', await until(B, () => /2e place/.test(document.querySelector('.pf-results')?.textContent || ''), 12000), (await B.evaluate(() => document.querySelector('.pf-results')?.textContent || 'pas de résultats')).slice(0, 160));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 3).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
