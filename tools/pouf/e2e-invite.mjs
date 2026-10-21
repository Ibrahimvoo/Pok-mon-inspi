// Invitations with online accounts (real server): two friends, the host invites from the game's lobby,
// the friend accepts the console invitation and lands in the same lobby. Usage: npm run build && node tools/pouf/e2e-invite.mjs
import { createRequire } from 'node:module';
import { PeerServer } from 'peer';
import { start } from '../../server/index.js';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const app = await start({ port: 0, dbUrl: ':memory:', quiet: true });
const broker = PeerServer({ port: 9126, path: '/', host: '127.0.0.1' });
const base = `http://localhost:${app.port}/?peerhost=127.0.0.1:9126&pfdebug&pflow`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, ms = 10000) => { try { await page.waitForFunction(fn, null, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
async function player(name, psn) {
  // the test broker runs on another port than the server: let the page reach it despite the server's CSP
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 620 }, permissions: ['microphone'], bypassCSP: true });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  await page.goto(base);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', psn); await page.fill('.f-input >> nth=1', 'manette2026'); await page.fill('.f-input >> nth=2', 'manette2026');
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  return page;
}
const openBase = async (P, tab) => {
  if (!(await P.locator('.gamebase:not(.covered)').count())) { await P.click('.tb-avatar'); await P.click('.menu .list-item:has-text("Base de jeu")'); await P.waitForSelector('.gamebase', { timeout: 5000 }); }
  if (tab) await P.click(`.gamebase .tab:has-text("${tab}")`);
};
try {
  const A = await player('A', 'Capitaine_A'), B = await player('B', 'Moussaillon_B');
  await openBase(A, 'Ajouter un ami');
  await A.fill('.gamebase .f-input', 'moussaillon'); await A.press('.gamebase .f-input', 'Enter');
  await until(A, () => /Moussaillon_B/.test(document.querySelector('.gamebase .gb-list')?.innerText || ''));
  await A.click('.gamebase .gb-row:has-text("Moussaillon_B")');
  await until(B, () => /Nouvelle demande d’ami/.test(document.getElementById('toasts').innerText));
  await openBase(B, 'Demandes'); await B.click('.gamebase button:has-text("Accepter")');
  ok('amis sur le serveur', await until(A, () => /Moussaillon_B/.test(document.querySelector('.gamebase')?.innerText || ''), 8000));
  // leave the Game Base (the first Escape may only leave the search field)
  for (const P of [A, B]) for (let i = 0; i < 3 && await P.locator('.gamebase:not(.out)').count(); i++) { await P.keyboard.press('Escape'); await P.waitForTimeout(500); }
  // A opens Pouf Party and its lobby
  await A.click('.home .tile:has-text("Pouf Party")');
  await until(A, () => !!document.querySelector('.pf-title .pf-btn'), 40000);
  await A.click('.pf-btn[data-key="play"]');
  ok('salon en ligne', await until(A, () => window.__pouf?.lobby.online === true, 20000));
  await A.click('.pf-btn[data-key="invite"]');
  ok('ami en ligne proposé dans le jeu', await until(A, () => /Moussaillon_B/.test(document.querySelector('.pf-friends')?.innerText || ''), 10000));
  await A.click('.pf-friend:has-text("Moussaillon_B")');
  ok('invitation reçue sur la console de B', await until(B, () => /vous invite à jouer à Pouf Party/.test(document.querySelector('.dialog')?.innerText || ''), 15000));
  await B.click('.dialog button:has-text("Rejoindre")');
  ok('B lance Pouf Party', await until(B, () => !!window.__pouf, 40000));
  ok('A et B dans le même salon', await until(A, () => window.__pouf.lobby.members.length === 2, 40000) && await until(B, () => window.__pouf?.lobby.members.length === 2 && window.__pouf.lobby.code === window.__pouf.partyCode(), 40000),
    JSON.stringify(await Promise.all([A, B].map(P => P.evaluate(() => ({ code: window.__pouf?.lobby.code, role: window.__pouf?.lobby.role, n: window.__pouf?.lobby.members.length }))))));
} catch (e) {
  ok('scénario', false, e.message.split('\n').slice(0, 3).join(' '));
  for (const [i, ctx] of browser.contexts().entries()) { const P = ctx.pages()[0]; console.log(i, JSON.stringify(await P.evaluate(() => ({ app: [...document.querySelectorAll('#app > *')].map(e => e.className).slice(-3), sel: document.querySelector('.home .tile.sel .tile-label')?.textContent, focused: document.querySelector('.focused')?.className })))); await P.screenshot({ path: `/tmp/claude-0/-home-user-Pok-mon-inspi/98cdb4a1-67c4-511c-8f1a-95066c17c91c/scratchpad/inv-${i}.jpg`, type: 'jpeg', quality: 70 }); }
}
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 3).join(' | '));
await browser.close(); broker.close?.(); await app.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
