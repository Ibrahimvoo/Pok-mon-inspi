// End-to-end test of Mimic Party online with two real browsers against the real server: friends, voice group,
// A creates a game, B accepts the invitation and lands in A's lobby, both play a whole match (the voice chat is held
// during the takes) and see the same results. Screenshots go to argv[2].
// Usage: npm run e2e:mimic-online [shotsDir]   (SKIP_MATCH=1 tests only the lobby)
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { start } from '../server/index.js';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const shots = process.argv[2] || null;
const app = await start({ port: 0, dbUrl: ':memory:', quiet: true });
const base = `http://localhost:${app.port}`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (name, cond, extra = '') => { results.push(cond); console.log(cond ? '✓' : '✗', name, extra); };

async function player(name) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name} pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|peerjs/.test(m.text())) errors.push(`${name} console: ${m.text()}`); });
  await page.goto(base);
  return { ctx, page, name, shot: async n => shots && page.screenshot({ path: join(shots, `online-${name}-${n}.jpg`), type: 'jpeg', quality: 70 }) };
}
const until = async (page, fn, arg, ms = 10000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 150 }); return true; } catch { return false; } };

try {
  const A = await player('A'), B = await player('B');
  for (const P of [A, B]) await P.page.keyboard.press('Enter');
  async function signup(P, psn) {
    await P.page.waitForSelector('.account .acc-form', { timeout: 12000 });
    await P.page.fill('.f-input >> nth=0', psn);
    await P.page.fill('.f-input >> nth=1', 'manette2026');
    await P.page.fill('.f-input >> nth=2', 'manette2026');
    await P.page.click('.acc-submit');
    return until(P.page, () => !!document.querySelector('.home .tile'), null, 10000);
  }
  ok('inscriptions', await signup(A, 'Nova_A') && await signup(B, 'Orion_B'));
  const openBase = async (P, tab) => {
    if (!(await P.page.locator('.gamebase:not(.covered)').count())) {
      await P.page.click('.tb-avatar');
      await P.page.click('.menu .list-item:has-text("Base de jeu")');
      await P.page.waitForSelector('.gamebase', { timeout: 5000 });
    }
    if (tab) await P.page.click(`.gamebase .tab:has-text("${tab}")`);
  };
  await openBase(A, 'Ajouter un ami');
  await A.page.fill('.gamebase .f-input', 'orion');
  await A.page.press('.gamebase .f-input', 'Enter');
  await until(A.page, () => /Orion_B/.test(document.querySelector('.gamebase .gb-list')?.innerText || ''));
  await A.page.click('.gamebase .gb-row[data-key^="r-"]:has-text("Orion_B")');
  await A.page.click('.menu .list-item:has-text("Envoyer une demande d’ami")');
  await until(B.page, () => /Nouvelle demande d’ami/.test(document.getElementById('toasts').innerText));
  await openBase(B, 'Demandes');
  await B.page.click('.gamebase button:has-text("Accepter")');
  await A.page.click('.gamebase .tab:has-text("Amis")');
  await until(A.page, () => /Orion_B/.test(document.querySelector('.gamebase .gb-list')?.innerText || ''));
  await A.page.click('.gamebase .gb-row:has-text("Orion_B")');
  await A.page.click('.menu .list-item:has-text("Démarrer un appel vocal")');
  await until(B.page, () => /vous appelle/.test(document.querySelector('.incoming')?.innerText || ''));
  await B.page.click('.incoming button:has-text("Répondre")');
  ok('groupe vocal à deux', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2')) && await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2')));
  for (const P of [A, B]) { await P.page.keyboard.press('Escape'); await P.page.waitForTimeout(400); await P.page.keyboard.press('Escape'); await P.page.waitForTimeout(400); }

  // A launches Mimic Party and creates a game
  await A.page.waitForSelector('.home .tile', { timeout: 8000 });
  await A.page.waitForTimeout(600);
  await A.shot('0-console');
  await A.page.keyboard.press('Enter');
  ok('A : menu du jeu', await until(A.page, () => !!document.querySelector('.mmp-scene.mmp-home:not(.out)'), null, 60000));
  await A.page.click('.mmp-home >> text=CRÉER UNE PARTIE');
  await until(A.page, () => /QUEL MODE/.test(document.querySelector('.mmp-modal')?.innerText || ''));
  await A.page.keyboard.press('Enter');
  ok('A : lobby', await until(A.page, () => !!document.querySelector('.mmp-scene.mmp-lobby:not(.out)')));
  for (let i = 0; i < 4; i++) { const t = await A.page.locator('.mmp-lobby .rules .r >> nth=0').innerText(); if (t.trim().endsWith('3')) break; await A.page.click('.mmp-lobby .rules .r >> nth=0'); }

  // B gets the invitation and joins A's lobby
  ok('B : invitation reçue', await until(B.page, () => /a lancé Mimic Party/.test(document.body.innerText), null, 10000));
  ok('B : une seule invitation', (await B.page.locator('button:has-text("Rejoindre la partie")').count()) === 1);
  await B.page.keyboard.press('Enter');
  ok('B : dans le lobby de A', await until(B.page, () => /NOVA_A/.test(document.querySelector('.mmp-scene.mmp-lobby:not(.out)')?.innerText || ''), null, 60000));
  ok('A : B apparaît dans le lobby', await until(A.page, () => /ORION_B/.test(document.querySelector('.mmp-scene.mmp-lobby:not(.out)')?.innerText || ''), null, 15000));
  await B.page.waitForTimeout(1200);
  await A.shot('1-lobby'); await B.shot('1-lobby');

  // match
  if (!process.env.SKIP_MATCH) {
  await A.page.keyboard.press('o');
  await until(A.page, () => /BESOIN DE TON MICRO/.test(document.querySelector('.mmp-modal')?.innerText || ''), null, 8000);
  await A.page.keyboard.press('Enter');
  ok('les deux consoles démarrent la partie', await until(A.page, () => /ANNOUNCE/.test(document.querySelector('.mmp-roundbox')?.innerText || ''), null, 15000) && await until(B.page, () => /ANNOUNCE/.test(document.querySelector('.mmp-roundbox')?.innerText || ''), null, 15000));
  let held = false, shotRec = false;
  const t0 = Date.now();
  let done = [false, false];
  while (Date.now() - t0 < 8 * 60e3 && !(done[0] && done[1])) {
    for (const [i, P] of [A, B].entries()) {
      const st = await P.page.evaluate(() => ({ phase: document.querySelector('.mmp-scene:not(.out) .mmp-roundbox span')?.innerText || '', results: !!document.querySelector('.mmp-scene.mmp-results:not(.out)'), mic: /MICRO/.test(document.querySelector('.mmp-modal')?.innerText || '') }));
      if (st.results) done[i] = true;
      if (st.mic) await P.page.keyboard.press('Enter');
      if (st.phase === 'RECORDING' && !held) held = await P.page.evaluate(() => [...document.querySelectorAll('.mmp-hold')].some(e => !e.classList.contains('hidden')));
      if (st.phase === 'RECORDING' && !shotRec) { shotRec = true; await P.page.waitForTimeout(2500); await P.shot('2-recording'); }
    }
    await A.page.waitForTimeout(400);
  }
  ok('les deux consoles arrivent aux résultats', done[0] && done[1]);
  ok('chat vocal mis en pause pendant la prise', held);
  await A.page.waitForTimeout(2000);
  await A.shot('3-results'); await B.shot('3-results');
  const totals = async P => P.page.evaluate(() => [...document.querySelectorAll('.mmp-scene:not(.out) .mmp-card')].map(c => c.innerText.replace(/\s+/g, ' ')).join(' | '));
  const ta = await totals(A), tb = await totals(B);
  ok('mêmes scores sur les deux consoles', ta && ta === tb, `${ta} / ${tb}`);
  ok('chat vocal rétabli après la partie', !(await A.page.evaluate(() => [...document.querySelectorAll('.mmp-hold')].some(e => !e.classList.contains('hidden')))) && !/Micro en pause/.test(await A.page.locator('#party-hud').innerText().catch(() => '')));
  // A goes back to the lobby, B follows
  await A.page.click('.mmp-results >> text=LOBBY');
  await B.page.click('.mmp-results >> text=LOBBY');
  }
  ok('retour au lobby commun', await until(B.page, () => /NOVA_A/.test(document.querySelector('.mmp-scene.mmp-lobby:not(.out)')?.innerText || ''), null, 15000) && await until(A.page, () => /ORION_B/.test(document.querySelector('.mmp-scene.mmp-lobby:not(.out)')?.innerText || ''), null, 15000));
  // A quits: B is told and goes back to the menu
  await B.page.evaluate(() => { window.__toasts = []; new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => window.__toasts.push(n.innerText || '')))).observe(document.getElementById('toasts'), { childList: true }); });
  await A.page.click('.mmp-lobby .br >> text=QUITTER');
  ok('A revient au menu du jeu', await until(A.page, () => !!document.querySelector('.mmp-scene.mmp-home:not(.out)'), null, 15000));
  ok('B prévenu quand l’hôte quitte', await until(B.page, () => window.__toasts.some(t => /Partie en ligne terminée/.test(t)), null, 30000), await B.page.evaluate(() => JSON.stringify(window.__toasts)));
  ok('B revient au menu du jeu', await until(B.page, () => !!document.querySelector('.mmp-scene.mmp-home:not(.out)'), null, 15000));
  await A.shot('4-quit'); await B.shot('4-quit');
} catch (e) { ok('exception', false, e.stack); }
ok('aucune erreur JavaScript', !errors.length, errors.join('\n'));
await browser.close(); await app.close?.();
process.exit(results.every(Boolean) ? 0 : 1);
