// Tournament mode, solo: the épreuves follow each other and the points add up. Usage: node tools/pouf/tour.mjs [shotsDir]
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
const shot = n => out && page.screenshot({ path: join(out, `tour-${n}.jpg`), type: 'jpeg', quality: 75 });
const closeHelp = async () => { if (await until(() => !!document.querySelector('.pf-help:not(.out)'), 4000)) await page.click('.pf-help .pf-btn'); };
try {
  await page.goto(`http://localhost:${web.address().port}/?pfdebug&pflow&peerhost=127.0.0.1:9`);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form'); await page.fill('.f-input >> nth=0', 'Champion'); await page.click('.acc-submit');
  await page.waitForSelector('.home .tile'); await page.waitForTimeout(400);   // Pouf Party is selected on arrival
  await page.click('.home .tile.sel');
  await until(() => !!document.querySelector('.pf-title .pf-btn'), 40000);
  await page.click('.pf-btn[data-key="play"]');
  await until(() => /[A-Z0-9]{5}/.test(document.querySelector('.pf-lobby .pf-code b')?.textContent || ''), 30000);
  await page.click('.pf-btn[data-key="mode"]');
  ok('mode tournoi activé', await until(() => /Tournoi Pouf Party/.test(document.querySelector('.pf-course')?.textContent || ''), 4000));
  await shot('1-lobby');
  await page.click('.pf-btn[data-key="start"]');
  ok('épreuve 1 : la descente', await until(() => window.__pouf.state === 'match' && window.__pouf.course.id === 'lagon', 8000));
  await closeHelp();
  await until(() => window.__pouf.match.t > 3.2, 15000);
  // carry the raft next to the finish line
  await page.evaluate(() => { const m = window.__pouf.match, T = window.__pouf.arena.track, o = T.world(568, 0, {}); m.sim.st.cp = 4; Object.assign(m.sim.st, { x: o.wx, z: o.wz, s: 568, vx: 0, vz: 0, inv: 3 }); });
  ok('résultats avec le classement du tournoi', await until(() => /épreuve 1 sur 6/.test(document.querySelector('.pf-results')?.textContent || ''), 25000));
  const pts1 = await page.evaluate(() => document.querySelector('.pf-tour-row .pts')?.textContent);
  ok('points de la descente', /\d+ pts/.test(pts1 || ''), pts1);
  await shot('2-round1');
  await page.click('.pf-btn[data-key="next"]');
  ok('épreuve 2 : la course', await until(() => window.__pouf.state === 'match' && window.__pouf.course.id === 'parcours', 8000));
  await closeHelp();
  await until(() => window.__pouf.match.t > 3.2, 15000);
  await page.evaluate(() => window.__pouf.match.debugTeleport(0, 3.6, 139.5));
  await page.keyboard.down('KeyW');
  ok('points cumulés après la course', await until(() => { const t = document.querySelector('.pf-results')?.textContent || ''; return /épreuve 2 sur 6/.test(t); }, 25000));
  await page.keyboard.up('KeyW');
  const pts2 = await page.evaluate(() => document.querySelector('.pf-tour-row .pts')?.textContent);
  ok('le total augmente', parseInt(pts2) > parseInt(pts1), `${pts1} → ${pts2}`);
  await shot('3-round2');
  await page.click('.pf-btn[data-key="lobby"]');
  ok('abandon du tournoi : retour au salon', await until(() => !!document.querySelector('.pf-lobby') && window.__pouf.tour === null, 6000));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 3).join(' | '));
await browser.close(); web.close();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
