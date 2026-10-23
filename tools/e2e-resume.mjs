// Multiplayer across an app put in the background: on iOS the host leaves the app (Safari tab or home-screen app) to
// send the link, the page is frozen and loses the broker. Simulated here by cutting the broker connection and
// pausing the page's JavaScript (CDP debugger). Checks:
//  1. console room: a friend joining while the host is away waits and gets in when the host comes back;
//  2. Pouf Party lobby: same, by game code;
//  3. Pouf Party lobby: the host stays away long enough for a guest to take the lobby over; on return the former
//     host joins that lobby (it used to stay alone in a second lobby with the same code).
// Usage: npm run build && node tools/e2e-resume.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';

const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = process.env.DIST || join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9131, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9131&pfdebug&pflow`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 15000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 200 }); return true; } catch { return false; } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function player(name, psn) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  if (process.env.DBG) page.on('console', m => console.log(`  [${name} ${m.type()}] ${m.text().slice(0, 160)}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|WebGL|GPU stall|Could not connect to peer|Lost connection to server/.test(m.text())) errors.push(`${name}: ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 20000 });
  await page.fill('.f-input >> nth=0', psn);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 20000 });
  // iOS freezes a backgrounded page: no JavaScript runs. Simulated with the debugger (Page.setWebLifecycleState has
  // no effect in headless mode); network events wait in the queue like on the phone.
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Debugger.enable');
  return { ctx, page, name, freeze: () => cdp.send('Debugger.pause'), wake: () => cdp.send('Debugger.resume') };
}
const openBase = async (P, tab) => {
  await P.page.click('.tb-avatar'); await P.page.click('.menu .list-item:has-text("Base de jeu")');
  await P.page.waitForSelector('.gamebase:not(.out)', { timeout: 5000 });
  if (tab) await P.page.click(`.gamebase .tab:has-text("${tab}")`);
};
const launchGame = async P => {
  await P.page.waitForSelector('.home:not(.covered) .tile.sel', { timeout: 10000 });
  await P.page.click('.home .tile.sel');
  return until(P.page, () => !!document.querySelector('.pf-title .pf-btn'), null, 60000);
};

try {
  const A = await player('A', 'Hote_A'), B = await player('B', 'Invite_B');

  // ---------------------------------------------------------------- 1. console room
  await openBase(A, 'Groupe');
  await A.page.click('.gamebase button:has-text("Créer un salon")');
  ok('salon créé', await until(A.page, () => /Salon [A-Z0-9]{6}/.test(document.querySelector('.gamebase')?.innerText || '')));
  const salon = (await A.page.locator('.gamebase').innerText()).match(/Salon ([A-Z0-9]{6})/)[1];
  if (await A.page.locator('.dialog button:has-text("OK")').count()) await A.page.click('.dialog button:has-text("OK")');
  // A leaves the app to send the code: broker connection lost, page frozen
  await A.page.evaluate(() => window.__p2p.peer.disconnect());
  await sleep(500); await A.freeze();
  await openBase(B, 'Groupe');
  await B.page.fill('.gamebase .salon-code', salon);
  const t0 = Date.now();
  await B.page.click('.gamebase button:has-text("Rejoindre")');
  // away for 25 s: longer than one connection attempt, the old code gave up with « Aucun salon ouvert »
  ok('l’invité attend l’hôte au lieu d’échouer', await until(B.page, () => /En attente de l’hôte/.test(document.getElementById('toasts').innerText), null, 25000));
  await sleep(Math.max(0, t0 + 25000 - Date.now()));
  await A.wake();
  ok('salon rejoint au retour de l’hôte', await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 40000)
    && await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 20000));
  await A.ctx.close(); await B.ctx.close();

  // ---------------------------------------------------------------- 2. game lobby: joining while the host is away
  const C = await player('C', 'Hote_C'), D = await player('D', 'Invite_D');
  ok('Pouf Party lancé (hôte)', await launchGame(C));
  await C.page.click('.pf-title .pf-btn:has-text("Jouer")');
  ok('partie créée', await until(C.page, () => window.__pouf?.lobby.online === true && /^[A-Z0-9]{5}$/.test(window.__pouf.lobby.code || ''), null, 30000));
  const code = await C.page.evaluate(() => window.__pouf.lobby.code);
  ok('Pouf Party lancé (invité)', await launchGame(D));
  await C.page.evaluate(() => window.__pouf.lobby.peer.disconnect());
  await sleep(500); await C.freeze();
  await D.page.evaluate(c => { window.__pouf.joinCode(c); }, code);   // not awaited: the join waits for the host
  ok('le jeu attend l’hôte', await until(D.page, () => /En attente de l’hôte/.test(document.body.innerText), null, 25000));
  await sleep(8000);
  await C.wake();
  ok('partie rejointe au retour de l’hôte', await until(D.page, () => window.__pouf?.lobby.role === 'guest' && window.__pouf.lobby.members.length === 2, null, 40000));

  // ---------------------------------------------------------------- 3. host away long enough to be replaced
  await C.page.evaluate(() => window.__pouf.lobby.peer.disconnect());
  await sleep(300); await C.freeze();
  ok('un invité reprend la partie (même code)', await until(D.page, c => window.__pouf?.lobby.role === 'host' && window.__pouf.lobby.code === c, code, 90000));
  await C.wake();
  ok('l’ancien hôte rejoint la partie reprise', await until(C.page, c => window.__pouf?.lobby.role === 'guest' && window.__pouf.lobby.code === c, code, 40000)
    && await until(D.page, () => window.__pouf.lobby.members.filter(m => m.online !== false).length === 2, null, 20000), JSON.stringify(await C.page.evaluate(() => ({ role: window.__pouf.lobby.role, members: window.__pouf.lobby.members.length }))));
  ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 4).join(' | '));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
