// End-to-end test of rooms by code (no project server): static build + a local PeerJS broker, two browsers.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const shots = process.argv[2] || null;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9123, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9123`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 10000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
async function player(name, psn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|peerjs/.test(m.text())) errors.push(`${name}: ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', psn);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  return { ctx, page, shot: n => shots && page.screenshot({ path: join(shots, `salon-${n}.jpg`), type: 'jpeg', quality: 70 }) };
}
try {
  const A = await player('A', 'Hote_A'), B = await player('B', 'Invite_B');
  ok('profils créés sans serveur', true);
  await A.page.click('.tb-avatar'); await A.page.click('.menu .list-item:has-text("Base de jeu")');
  await A.page.waitForSelector('.gamebase');
  await A.page.click('.gamebase button:has-text("Créer un salon")');
  ok('salon créé', await until(A.page, () => /Salon [A-Z0-9]{6}/.test(document.querySelector('.gamebase')?.innerText || '')));
  const code = (await A.page.locator('.party-head h2').innerText()).match(/[A-Z0-9]{6}/)[0];
  // without a share sheet or clipboard (headless), the link is shown in a dialog
  if (await until(A.page, () => /Code du salon/.test(document.querySelector('.dialog')?.innerText || ''), null, 3000)) {
    ok('lien de partage affiché', /#salon=/.test(await A.page.locator('.salon-link').innerText()));
    await A.page.click('.dialog button:has-text("OK")');
  }
  await A.shot('1-host');
  // B opens the shared link
  await B.page.evaluate(c => { location.hash = 'salon=' + c; }, code);
  ok('lien d’invitation reconnu chez B', await until(B.page, () => /Rejoindre le salon/.test(document.querySelector('.dialog')?.innerText || '')));
  await B.page.click('.dialog button:has-text("Rejoindre")');
  ok('B dans le salon de A', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 15000) && await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 15000));
  ok('audio reçu chez B', await until(B.page, () => [...document.querySelectorAll('audio')].some(a => a.srcObject?.getAudioTracks().some(t => t.readyState === 'live')), null, 20000));
  ok('audio reçu chez A', await until(A.page, () => [...document.querySelectorAll('audio')].some(a => a.srcObject?.getAudioTracks().some(t => t.readyState === 'live')), null, 20000));
  ok('A entend B parler (indicateur)', await until(A.page, () => !!document.querySelector('.member:not(.me).talking, .member:not(.me) .talking'), null, 15000));
  await A.page.fill('.chat-input', 'Salut !'); await A.page.press('.chat-input', 'Enter');
  ok('discussion reçue chez B', await until(B.page, () => /Salut !/.test(document.body.innerText)));
  await A.shot('2-party');
  // shared game
  await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(300); // leaves the text field
  await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(600); // leaves Game Base
  // launches Pouf Party (UNO and Mimic Party have their own tests)
  const idx = await A.page.evaluate(() => [...document.querySelectorAll('.home .tile')].findIndex(e => /^Pouf Party/.test(e.querySelector('.tile-label')?.textContent.trim() || '')));
  await A.page.click(`.home .tile >> nth=${idx}`);
  ok('B invité à la partie', await until(B.page, () => /a lancé/.test(document.querySelector('.dialog')?.innerText || ''), null, 12000));
  await B.page.click('.dialog button:has-text("Rejoindre la partie")');
  // Pouf Party, the console's only game, runs on both devices (software WebGL here: ~20 s to start)
  const inGame = () => document.documentElement.classList.contains('pf-playing') && !!document.querySelector('.pf-root .pf-game canvas');
  ok('partie partagée active', await until(A.page, inGame, null, 90000) && await until(B.page, inGame, null, 90000));
  await B.shot('3-ingame');
  // guest reload (iOS discarding the tab): comes back into the same room
  await B.page.reload();
  ok('invité reconnecté au salon après rechargement', await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 90000));
  ok('hôte voit toujours 2 joueurs', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 20000));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 4).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
