// On-foot épreuves in the real console: pick the obstacle race and the survival arena in the lobby,
// run, jump, reach checkpoints and the finish, fall into the water, results. Usage: node tools/pouf/foot.mjs [shotsDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist'), out = process.argv[2];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const web = createServer(async (req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = []; page.on('pageerror', e => errors.push(e.message));
const results = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (fn, ms = 20000) => { try { await page.waitForFunction(fn, null, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const shot = n => out && page.screenshot({ path: join(out, `foot-${n}.jpg`), type: 'jpeg', quality: 75 });
const M = () => page.evaluate(() => { const m = window.__pouf.match; return m && { t: m.t, me: (() => { const p = m.riders.get(window.__pouf.me.id); return p && { x: p.x, y: p.y, z: p.z, fin: p.fin, out: p.out }; })() }; });
const pick = async id => {
  await page.click('.pf-btn[data-key="course"]');
  await until(() => !!document.querySelector('.pf-courses'), 5000);
  await page.click(`.pf-ccard:has-text("${id}")`);
  await until(() => !document.querySelector('.pf-courses:not(.out)'), 5000);
};
try {
  await page.goto(`http://localhost:${web.address().port}/?pfdebug&pflow&peerhost=127.0.0.1:9`);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Coureur'); await page.click('.acc-submit');
  await page.waitForSelector('.home .tile'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(500);
  await page.click('.home .tile.sel');
  await until(() => !!document.querySelector('.pf-title .pf-btn'), 40000);
  await page.click('.pf-btn[data-key="play"]');
  await until(() => /[A-Z0-9]{5}/.test(document.querySelector('.pf-lobby .pf-code b')?.textContent || ''), 30000);
  await pick('Pétillant');
  ok('course d’obstacles choisie dans le salon', await page.evaluate(() => window.__pouf.course.id === 'parcours' && /Pétillant/.test(document.querySelector('.pf-course')?.textContent)));
  await page.click('.pf-btn[data-key="start"]');
  ok('course lancée', await until(() => window.__pouf.state === 'match' && window.__pouf.match.kind === 'foot', 8000));
  if (await until(() => !!document.querySelector('.pf-help'), 4000)) { await page.waitForTimeout(500); await shot('1-help'); await page.click('.pf-help .pf-btn'); }
  await until(() => window.__pouf.match.t > 3.2, 15000);
  await shot('2-start');
  const a = await M();
  await page.keyboard.down('KeyW'); await page.waitForTimeout(1200);
  const b = await M();
  ok('le personnage court', b.me.z - a.me.z > 3, `${a.me.z.toFixed(1)} → ${b.me.z.toFixed(1)}`);
  await page.keyboard.press('Space'); await page.waitForTimeout(250);
  const c = await M();
  ok('le personnage saute', c.me.y > 2.6, `y ${c.me.y.toFixed(2)}`);
  await page.waitForTimeout(800); await shot('3-sweeper');
  await page.keyboard.up('KeyW');
  // fall into the water: back on the start platform
  await page.keyboard.down('KeyD'); await page.waitForTimeout(2500); await page.keyboard.up('KeyD');
  ok('chute à l’eau puis retour sur la plateforme', await until(() => { const p = window.__pouf.match.riders.get(window.__pouf.me.id); return p.y >= 1.9 && Math.abs(p.x) < 9; }, 6000));
  await shot('4-run');
  // the course itself is covered by the unit tests: jump near the spring pad and run to the finish
  await page.evaluate(() => window.__pouf.match.debugTeleport(0, 3.6, 139.5));
  await page.keyboard.down('KeyW'); await page.waitForTimeout(400); await shot('5-spring');
  ok('arrivée franchie', await until(() => window.__pouf.match?.riders.get(window.__pouf.me.id)?.fin != null, 10000));
  await page.keyboard.up('KeyW');
  await page.waitForTimeout(700); await shot('6-finish');
  ok('résultats de la course avec classement', await until(() => /1er/.test(document.querySelector('.pf-results')?.textContent || ''), 12000));
  await page.waitForTimeout(800); await shot('7-results');
  // survival arena
  await page.click('.pf-results .pf-btn[data-key="lobby"]');
  await until(() => !!document.querySelector('.pf-lobby'), 5000);
  await pick('Tourbillon');
  await page.click('.pf-btn[data-key="start"]');
  ok('arène de survie lancée', await until(() => window.__pouf.state === 'match' && window.__pouf.match.kind === 'foot', 8000));
  await until(() => window.__pouf.match.t > 6, 20000);
  await shot('8-arena');
  const alive = await M();
  ok('le joueur tient debout sur l’arène', alive.me.y > 1.5 && alive.me.out == null, JSON.stringify(alive.me));
  // walk off the arena: eliminated, the round ends (solo)
  await page.keyboard.down('KeyA'); await page.waitForTimeout(4000); await page.keyboard.up('KeyA');
  ok('éliminé en tombant à l’eau', await until(() => window.__pouf.match?.riders.get(window.__pouf.me.id)?.out != null || !!document.querySelector('.pf-results'), 8000));
  ok('résultats de survie', await until(() => /Tenu/.test(document.querySelector('.pf-results')?.textContent || ''), 12000));
  await page.waitForTimeout(800); await shot('9-survival-results');
} catch (e) { ok('scénario course', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 3).join(' | '));
await browser.close(); web.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
