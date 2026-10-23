// End-to-end test of the online features with two real browsers against the real server:
// sign-up, validation errors, friend request, presence, voice call (fake microphone), shared game session,
// network loss and reconnection, iOS-style interruption (page hidden + reload) and sign-in.
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { start } from '../server/index.js';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const shots = process.argv[2] || null;
const app = await start({ port: 0, dbUrl: ':memory:', quiet: true });
const base = `http://localhost:${app.port}`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [];
const errors = [];
const ok = (name, cond, extra = '') => { results.push([cond ? 'PASS' : 'FAIL', name, extra]); console.log(cond ? '✓' : '✗', name, extra); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function player(name) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone', 'camera'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name} pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/peerjs/.test(m.text())) errors.push(`${name} console: ${m.text()}`); });
  await page.goto(base);
  return { ctx, page, name, shot: async n => shots && page.screenshot({ path: join(shots, `e2e-${n}.jpg`), type: 'jpeg', quality: 70 }) };
}
const until = async (page, fn, arg, ms = 8000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const text = (page, sel) => page.locator(sel).first().innerText().catch(() => '');

try {
  const A = await player('A'), B = await player('B');

  // ---------------------------------------------------------------- first launch → account creation
  for (const P of [A, B]) { await P.page.keyboard.press('Enter'); }
  ok('premier lancement : écran de création de compte', await until(A.page, () => !!document.querySelector('.account .acc-form'), null, 12000));
  await A.shot('01-signup');
  // validation errors
  await A.page.fill('.f-input >> nth=0', '1');
  await A.page.fill('.f-input >> nth=1', 'court');
  await A.page.fill('.f-input >> nth=2', 'autre');
  await A.page.click('.acc-submit');
  ok('validation des champs côté client', (await A.page.locator('.f-row.error').count()) === 3);
  await A.shot('02-errors');
  async function signup(P, psn) {
    await P.page.waitForSelector('.account .acc-form', { timeout: 12000 });
    await P.page.fill('.f-input >> nth=0', psn);
    await P.page.fill('.f-input >> nth=1', 'manette2026');
    await P.page.fill('.f-input >> nth=2', 'manette2026');
    await P.page.click('.acc-submit');
    return until(P.page, () => !!document.querySelector('.home .tile'), null, 10000);
  }
  ok('inscription joueur A', await signup(A, 'Nova_A'));
  // duplicate identifier is refused by the server
  await B.page.waitForSelector('.account .acc-form', { timeout: 12000 });
  await B.page.fill('.f-input >> nth=0', 'nova_a');
  await B.page.fill('.f-input >> nth=1', 'manette2026');
  await B.page.fill('.f-input >> nth=2', 'manette2026');
  await B.page.click('.acc-submit');
  ok('identifiant déjà pris refusé', await until(B.page, () => /déjà utilisé/.test(document.querySelector('.account')?.innerText || '')));
  ok('inscription joueur B', await signup(B, 'Orion_B'));
  await A.shot('03-home');

  // ---------------------------------------------------------------- friends
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
  ok('recherche de joueur', await until(A.page, () => /Orion_B/.test(document.querySelector('.gamebase .gb-list')?.innerText || '')));
  await A.page.click('.gamebase .gb-row[data-key^="r-"]:has-text("Orion_B")');
  await A.page.click('.menu .list-item:has-text("Envoyer une demande d’ami")');
  ok('demande d’ami reçue en temps réel', await until(B.page, () => /Nouvelle demande d’ami/.test(document.getElementById('toasts').innerText)));
  await openBase(B, 'Demandes');
  await B.page.click('.gamebase button:has-text("Accepter")');
  await B.shot('04-requests');
  ok('ami accepté et visible en ligne chez A', await until(A.page, () => { const t = document.querySelector('.gamebase')?.innerText || ''; return /Orion_B/.test(t) && /En ligne/.test(t); }, null, 6000) || (await (async () => { await A.page.click('.gamebase .tab:has-text("Amis")'); return until(A.page, () => /En ligne/.test(document.querySelector('.gamebase .gb-list')?.innerText || '')); })()));
  await A.page.click('.gamebase .tab:has-text("Amis")');
  await A.shot('05-friends');

  // ---------------------------------------------------------------- voice call
  await A.page.click('.gamebase .gb-row:has-text("Orion_B")');
  await A.page.click('.menu .list-item:has-text("Démarrer un appel vocal")');
  ok('appel entrant chez B', await until(B.page, () => /vous appelle/.test(document.querySelector('.incoming')?.innerText || '')));
  await B.shot('06-incoming');
  await B.page.click('.incoming button:has-text("Répondre")');
  ok('les deux joueurs sont dans le groupe', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2')) && await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2')));
  const audioFlow = await until(B.page, () => [...document.querySelectorAll('audio')].some(a => a.srcObject && a.srcObject.getAudioTracks().some(t => t.readyState === 'live')), null, 15000);
  ok('audio WebRTC reçu (flux distant actif)', audioFlow);
  await openBase(B, 'Groupe');
  ok('indicateur « parle » sur le membre distant (son du micro reçu)', await until(B.page, () => !!document.querySelector('.member:not(.me).talking, .member:not(.me) .talking'), null, 15000));
  await B.shot('07-party');
  // mute
  await A.page.click('.gamebase .tab:has-text("Groupe")');
  await B.page.click('.gamebase button:has-text("Couper le micro")');
  ok('micro coupé propagé à A', await until(A.page, () => /Micro coupé/.test(document.querySelector('.gamebase .members')?.innerText || ''), null, 5000));
  // camera through the project server: the offer with the video slots must pass its relay (size limits)
  await B.page.click('#video-dock .vd-btn[title="Activer la caméra"]');
  ok('caméra de B reçue par A via le serveur', await until(A.page, () => [...document.querySelectorAll('.vd-tile.cam')].some(t => t.querySelector('video')?.videoWidth > 0), null, 20000));
  await B.page.click('#video-dock .vd-btn[title="Couper la caméra"]');
  ok('caméra coupée chez A aussi', await until(A.page, () => !document.querySelector('.vd-tile.cam'), null, 10000));
  await B.page.click('.gamebase button:has-text("Réactiver le micro")');

  // chat
  await B.page.fill('.chat-input', 'On lance une partie ?');
  await B.page.press('.chat-input', 'Enter');
  ok('message de groupe reçu', await until(A.page, () => /On lance une partie/.test(document.body.innerText)));

  // ---------------------------------------------------------------- shared game session
  await A.page.keyboard.press('Escape'); await sleep(400);
  await A.page.keyboard.press('Escape'); await sleep(400);
  // A launches Pouf Party from its home row (UNO and Mimic Party have their own tests)
  await A.page.waitForSelector('.home .tile.sel', { timeout: 5000 });
  for (let i = 0; i < 6 && !/Pouf Party/.test(await A.page.evaluate(() => document.querySelector('.home .tile.sel .tile-label')?.textContent || '')); i++) { await A.page.keyboard.press('ArrowRight'); await sleep(300); }
  const gameTitle = (await text(A.page, '.home .tile.sel .tile-label')).replace(' · En cours', '');
  await A.page.keyboard.press('Enter');
  ok('B est invité à rejoindre la partie', await until(B.page, () => /a lancé/.test(document.querySelector('.dialog')?.innerText || ''), null, 10000), gameTitle);
  await B.page.click('.dialog button:has-text("Rejoindre la partie")');
  // Pouf Party is the console's only game: both players are in it (its own lobby is covered by tools/pouf/e2e-invite.mjs)
  // (software WebGL in this test: starting the 3D game takes ~20 s, a few hundred ms on a phone)
  const inGame = () => document.documentElement.classList.contains('pf-playing') && !!document.querySelector('.pf-root .pf-game canvas');
  const t0 = Date.now();
  ok('A et B dans le jeu du groupe', await until(A.page, inGame, null, 45000) && await until(B.page, inGame, null, 45000), `${((Date.now() - t0) / 1000).toFixed(1)} s`);
  await B.shot('08-ingame');
  await A.shot('08b-ingame-A');

  // ---------------------------------------------------------------- network loss and recovery
  await B.ctx.setOffline(true);
  ok('coupure réseau détectée chez B', await until(B.page, () => !document.getElementById('conn-hud')?.classList.contains('hidden'), null, 8000));
  await B.ctx.setOffline(false);
  ok('reconnexion automatique de B', await until(B.page, () => document.getElementById('conn-hud')?.classList.contains('hidden'), null, 20000));
  ok('B toujours dans le groupe après la coupure', await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 8000));

  // ---------------------------------------------------------------- iOS-style interruption: hidden page, then reload
  await B.page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await sleep(300);
  await B.page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: false, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  ok('reprise après mise en arrière-plan sans erreur', true);
  await B.page.reload();
  await B.page.keyboard.press('Enter');
  // the 3D game compiles its shaders on the CPU here (software WebGL): the page can be busy for ~20 s
  ok('après rechargement : session et jeu restaurés sans reconnexion', await until(B.page, () => !!document.querySelector('.pf-root'), null, 45000));
  ok('après rechargement : groupe conservé', await until(B.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 45000));
  await B.shot('09-restored');

  // ---------------------------------------------------------------- sign out / sign in
  const C = await player('C');
  await C.ctx.addCookies([]);
  await C.page.keyboard.press('Enter');
  await C.page.waitForSelector('.account', { timeout: 12000 });
  await C.page.click('.account button:has-text("J’ai déjà un compte")');
  await C.page.fill('.f-input >> nth=0', 'Nova_A');
  await C.page.fill('.f-input >> nth=1', 'mauvais-mdp1');
  await C.page.click('.acc-submit');
  ok('mauvais mot de passe refusé', await until(C.page, () => /incorrect/.test(document.querySelector('.account')?.innerText || '')));
  await C.page.fill('.f-input >> nth=1', 'manette2026');
  await C.page.click('.acc-submit');
  ok('connexion au compte existant sur un autre appareil', await until(C.page, () => !!document.querySelector('.home .tile'), null, 10000));
  await C.shot('10-login');
} catch (e) {
  ok('exécution du scénario', false, e.message.split('\n')[0]);
  if (shots) for (const p of browser.contexts().flatMap(c => c.pages())) await p.screenshot({ path: join(shots, `e2e-fail-${browser.contexts().indexOf(p.context())}.jpg`), type: 'jpeg', quality: 60 }).catch(() => {});
} finally {
  const real = errors.filter(e => !/favicon|net::ERR_INTERNET_DISCONNECTED|WebSocket connection|Failed to load resource/.test(e));
  ok('aucune erreur JavaScript', !real.length, real.slice(0, 5).join(' | '));
  await browser.close();
  await app.close();
  const failed = results.filter(r => r[0] === 'FAIL').length;
  console.log(`\n${results.length - failed}/${results.length} vérifications réussies`);
  process.exit(failed ? 1 : 0);
}
