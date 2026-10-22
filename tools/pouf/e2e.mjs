// End-to-end test of Pouf Party inside the console: two real browsers, a local PeerJS broker,
// launch from the home screen, lobby by code, ready/start, synchronised run, controls, respawn, quit.
// Usage: npm run build && node tools/pouf/e2e.mjs [screenshotDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';

const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const shots = process.argv[2] || null;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9124, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9124&pfdebug&pflow`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 15000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const G = (page, js) => page.evaluate(js);

async function player(name, psn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|WebGL|GPU stall/.test(m.text())) errors.push(`${name}: ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', psn);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  return { ctx, page, shot: n => shots && page.screenshot({ path: join(shots, `pouf-${n}.jpg`), type: 'jpeg', quality: 72 }) };
}
const hold = async (page, key, ms) => { await page.keyboard.down(key); await page.waitForTimeout(ms); await page.keyboard.up(key); };

try {
  const A = await player('A', 'Hote_A');
  await A.page.waitForTimeout(400);   // Pouf Party, the only game, is selected when the home screen opens
  ok('jaquette Pouf Party sur l’accueil', await until(A.page, () => /Pouf Party/.test(document.querySelector('.home .tile.sel .tile-label')?.textContent || '')));
  await A.page.click('.home .tile.sel');
  ok('écran de lancement de la console', await until(A.page, () => !!document.querySelector('.launch'), null, 5000));
  ok('écran titre du jeu', await until(A.page, () => !!document.querySelector('.pf-title .pf-btn'), null, 30000));
  await A.page.waitForTimeout(800);
  await A.shot('1-title');
  await A.page.keyboard.press('Enter');   // "Jouer" has the focus
  ok('salon créé avec un code', await until(A.page, () => /^[A-Z0-9]{5}$/.test(document.querySelector('.pf-code b')?.textContent || ''), null, 20000));
  const code = await A.page.locator('.pf-code b').innerText();
  ok('salon en ligne', await until(A.page, () => window.__pouf?.lobby.online === true));
  await A.shot('2-lobby');

  const B = await player('B', 'Invite_B');
  await B.page.evaluate(c => { location.hash = 'pouf=' + c; }, code);
  ok('lien d’invitation reconnu', await until(B.page, () => /Rejoindre la partie/.test(document.querySelector('.dialog')?.innerText || ''), null, 8000));
  await B.page.click('.dialog button:has-text("Rejoindre")');
  ok('B arrive dans le salon de A', await until(B.page, () => window.__pouf?.lobby.role === 'guest' && document.querySelectorAll('.pf-lobby .pf-player:not(.empty)').length === 2, null, 40000),
    JSON.stringify(await B.page.evaluate(() => ({ role: window.__pouf?.lobby.role, members: window.__pouf?.lobby.members.length, rows: document.querySelectorAll('.pf-player:not(.empty)').length, layers: [...document.querySelectorAll('.pf-layer')].map(l => l.className) }))));
  ok('A voit B dans le salon', await until(A.page, () => document.querySelectorAll('.pf-player:not(.empty)').length === 2, null, 10000));
  await B.shot('3-lobby-guest');
  await B.page.click('.pf-btn[data-key="start"]');
  ok('B prêt', await until(A.page, () => window.__pouf.lobby.members.find(m => !m.host)?.ready === true, null, 8000));
  await A.page.click('.pf-btn[data-key="start"]');
  ok('la partie démarre chez A', await until(A.page, () => window.__pouf.state === 'match' && !!document.querySelector('.pf-hud:not(.hidden)'), null, 8000));
  ok('la partie démarre chez B', await until(B.page, () => window.__pouf.state === 'match', null, 8000));
  // first run shows the tutorial: close it
  for (const P of [A, B]) { if (await until(P.page, () => !!document.querySelector('.pf-help'), null, 3000)) await P.page.click('.pf-help .pf-btn'); }
  ok('horloge synchronisée', await until(B.page, () => Math.abs(window.__pouf.match.t - 0) > 0 && window.__pouf.lobby.rtt > 0, null, 8000));
  await A.page.waitForTimeout(3200);   // countdown
  await A.shot('4-run-host');
  const s0 = await G(A.page, () => window.__pouf.match.sim.st.s);
  // both players aim forward (stick up) and puff: their riders run to the back and push
  await Promise.all([A.page.keyboard.down('KeyW'), B.page.keyboard.down('KeyW')]);
  await A.page.waitForTimeout(700);
  await Promise.all([A.page.keyboard.down('Space'), B.page.keyboard.down('Space')]);
  await A.page.waitForTimeout(4000);
  await Promise.all([A.page.keyboard.up('Space'), B.page.keyboard.up('Space'), A.page.keyboard.up('KeyW'), B.page.keyboard.up('KeyW')]);
  await A.page.waitForTimeout(1200);
  const s1 = await G(A.page, () => window.__pouf.match.sim.st.s);
  ok('les poufs font avancer la bouée', s1 - s0 > 5, `${s0.toFixed(1)} → ${s1.toFixed(1)} m`);
  const puffB = await G(A.page, () => [...window.__pouf.match.riders.values()].find(r => r.id !== window.__pouf.me.id)?.puffTime || 0);
  ok('l’hôte reçoit les commandes de B', puffB > 1, `${puffB.toFixed(1)} s de pouf`);
  const dB = await G(B.page, () => window.__pouf.arena.rs.s), dA = await G(A.page, () => window.__pouf.arena.rs.s);
  ok('B voit la bouée au même endroit', dB - 12 > 3 && Math.abs(dA - dB) < 2.5, `A ${dA.toFixed(1)} / B ${dB.toFixed(1)} ` + JSON.stringify(await G(B.page, () => window.__pouf.match.debug())) + ' A ' + JSON.stringify(await G(A.page, () => ({ t: window.__pouf.match.t, online: window.__pouf.lobby.online, conns: window.__pouf.lobby.conns.size, fps: window.__fps }))));
  await B.shot('5-run-guest');
  // hold R: the raft bursts and everybody is put back at the last checkpoint
  await hold(A.page, 'KeyR', 2600);
  ok('éclatement synchronisé', await until(B.page, () => window.__pouf.arena.rs.pop >= 0 || document.querySelector('.pf-pill.pops span:last-child')?.textContent === '1', null, 5000),
    JSON.stringify(await G(A.page, () => ({ deaths: window.__pouf.match.sim.st.deaths, pop: window.__pouf.match.sim.st.pop, gu: window.__pouf.match.riders.get(window.__pouf.me.id)?.gu, playing: !!document.querySelector('.pf-touch.on'), layers: window.__pouf.layers.length }))));
  ok('compteur d’éclatements', await until(B.page, () => document.querySelector('.pf-pill.pops span:last-child')?.textContent === '1', null, 6000));
  ok('réapparition', await until(A.page, () => window.__pouf.match.sim.st.pop < 0 && window.__pouf.match.sim.st.air === 3, null, 6000));
  // pause menu then quit the game: back to the console
  await A.page.keyboard.press('Escape');
  ok('menu pause', await until(A.page, () => !!document.querySelector('.pf-pause'), null, 4000));
  await A.shot('6-pause');
  await A.page.click('.pf-pause .pf-btn[data-key="quit"]');
  await A.page.click('.dialog button:has-text("Quitter")');
  ok('retour à l’accueil de la console', await until(A.page, () => !document.querySelector('.pf-root') && !!document.querySelector('.home .tile'), null, 8000));
  ok('B reste en partie avec un nouvel hôte', await until(B.page, () => window.__pouf.lobby.role === 'host', null, 20000));
  await B.shot('7-reelected');
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 5).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
