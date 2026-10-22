// Touch and start-up checks on a phone-sized touch screen (static build, no server):
// a Safari profile saved by older versions (game missing, removed games in the save), taps on the user card,
// the avatar menu, the profile, the Game Base and its friends, tapping outside a menu, Pouf Party from the home row.
// Usage: npm run build && node tools/e2e-touch.mjs [screenshotDir]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const shots = process.argv[2] || null;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const url = `http://localhost:${web.address().port}/`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 10000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// what an older version of the console left in Safari's storage: Pouf Party dropped from the library while still
// marked as gifted, trophies / play time / captures of games that no longer exist, a local profile
const OLD = {
  gifts: ['pouf-party'], owned: ['ashen-crown', 'starfall'], installed: ['ashen-crown', 'starfall'],
  lastPlayed: { 'ashen-crown': Date.now() - 1000, starfall: Date.now() - 5000 }, playTime: { 'ashen-crown': 600 },
  trophies: { 'ashen-crown': [0, 1], starfall: [0] }, wishlist: ['sands-meridian'], cart: ['nightline'],
  downloads: [{ id: 'lumen', p: .5 }], captures: [{ id: 'x', kind: 'shot', game: 'ashen-crown', frame: 1, t: Date.now() }, { id: 'y', kind: 'shot', game: null, t: Date.now() }],
  settings: { sfx: true },
};
const USER = { id: 'local-ab12cd34', psn: 'Ibra', avatar: 'neon-requiem', online: false };

try {
  const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  await ctx.addInitScript(([old, user]) => {
    if (sessionStorage.getItem('seeded')) return;
    sessionStorage.setItem('seeded', '1');
    localStorage.setItem('ps5ux.v1', JSON.stringify(old));
    localStorage.setItem('ps5ux.accounts', JSON.stringify([user]));
    localStorage.setItem('ps5ux.current', JSON.stringify(user.id));
  }, [OLD, USER]);
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`); });
  const shot = async n => shots && page.screenshot({ path: join(shots, `touch-${n}.jpg`), type: 'jpeg', quality: 70 });
  await page.goto(url);

  // ---------------------------------------------------------------- start: tap the screen, then the user card
  await page.waitForSelector('.boot .press', { timeout: 15000 });
  await page.tap('.boot');
  ok('écran « Qui utilise cette manette ? »', await until(page, () => !!document.querySelector('.users .user'), null, 20000));
  await shot('01-users');
  await page.tap('.users .user[data-id="local-ab12cd34"]');
  ok('toucher sa carte de profil ouvre l’accueil', await until(page, () => !!document.querySelector('.home .tile'), null, 10000));

  // ---------------------------------------------------------------- the game is back (old Safari save)
  const home = await page.evaluate(() => [...document.querySelectorAll('.home .tile .tile-label')].map(e => e.textContent));
  ok('Pouf Party visible sur l’accueil malgré l’ancienne sauvegarde', home.some(t => t.startsWith('Pouf Party')), JSON.stringify(home));
  ok('aucun jeu supprimé sur l’accueil', home.length === 3, `${home.length} tuiles`);
  const saved = await page.evaluate(() => new Promise(r => setTimeout(() => r(JSON.parse(localStorage.getItem('ps5ux.v1'))), 400)));
  ok('sauvegarde nettoyée', saved && saved.owned.join() === 'pouf-party' && saved.installed.join() === 'pouf-party' && !saved.trophies['ashen-crown'] && saved.captures.length === 1 && !saved.downloads.length && !saved.cart.length, JSON.stringify({ owned: saved?.owned, installed: saved?.installed }));
  await shot('02-home');

  // ---------------------------------------------------------------- avatar → menu → profile
  await page.tap('.tb-avatar');
  ok('toucher sa photo de profil ouvre le menu', await until(page, () => !!document.querySelector('.menu .list-item'), null, 4000));
  await shot('03-avatar-menu');
  // tapping next to the menu closes it
  await page.touchscreen.tap(420, 300);
  ok('toucher à côté du menu le ferme', await until(page, () => !document.querySelector('.overlay.in .menu') && !document.querySelector('.menu:not(.out *)'), null, 3000));
  await sleep(400);
  await page.tap('.tb-avatar');
  await page.waitForSelector('.menu .list-item', { timeout: 4000 });
  await page.tap('.menu .list-item:has-text("Profil")');
  ok('le profil s’ouvre', await until(page, () => !!document.querySelector('.profile:not(.out) .prof-name'), null, 5000));
  ok('photo et nom du profil', await page.evaluate(() => /neon-requiem-t\.webp/.test(document.querySelector('.prof-head .avatar img')?.src || '') && document.querySelector('.prof-name')?.textContent === 'Ibra'));
  await shot('04-profile');

  // ---------------------------------------------------------------- friends (Game Base) from the profile, then back
  await page.tap('.prof-actions .btn:has-text("Base de jeu")');
  ok('la Base de jeu (amis) s’ouvre depuis le profil', await until(page, () => !!document.querySelector('.gamebase:not(.out) .tab'), null, 5000));
  await page.tap('.gamebase .tab:has-text("Groupe")');
  ok('onglet Groupe : créer ou rejoindre un salon d’ami', await until(page, () => /Rejoindre un salon/.test(document.querySelector('.gamebase')?.innerText || ''), null, 4000));
  await shot('05-gamebase');
  await page.tap('#touchbar [data-action="back"]');
  ok('bouton Retour tactile : retour au profil', await until(page, () => !!document.querySelector('.profile:not(.covered):not(.out)'), null, 4000));
  await page.tap('#touchbar [data-action="back"]');
  ok('retour à l’accueil', await until(page, () => !!document.querySelector('.home:not(.covered)'), null, 4000));

  // ---------------------------------------------------------------- settings: avatar list scrolls inside the screen
  await page.tap('.tb-right .round[title="Paramètres"]');
  await page.waitForSelector('.settings, .set-item', { timeout: 5000 });
  const cat = page.locator('[data-cat="users"]');
  if (await cat.count()) await cat.tap();
  const avatarRow = page.locator('.set-item:has-text("Changer d’avatar")');
  ok('réglage « Changer d’avatar » présent', await avatarRow.count() > 0);
  await avatarRow.tap();
  ok('menu des avatars dans l’écran (défilable)', await until(page, () => { const m = document.querySelector('.menu'); if (!m) return false; const r = m.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight + 1 && m.scrollHeight > m.clientHeight; }, null, 4000));
  await page.locator('.menu .list-item:has-text("Pouf Party")').tap();
  ok('avatar changé', await until(page, () => /pouf-party-t\.webp/.test(document.querySelector('.set-item .avatar img')?.src || ''), null, 4000));
  await shot('06-avatar');
  for (let i = 0; i < 2; i++) { await page.tap('#touchbar [data-action="back"]'); await sleep(350); }

  // ---------------------------------------------------------------- launch Pouf Party with two taps on its tile
  await until(page, () => !!document.querySelector('.home:not(.covered)'), null, 4000);
  const tile = page.locator('.home .tile:has-text("Pouf Party")');
  await tile.tap(); await sleep(300); await tile.tap();
  ok('Pouf Party se lance depuis l’accueil au toucher', await until(page, () => document.documentElement.classList.contains('pf-playing'), null, 15000));
  ok('menu du jeu affiché', await until(page, () => !!document.querySelector('.pf-title .pf-btn'), null, 45000));
  await page.tap('.pf-me-slot');
  ok('toucher sa carte de joueur ouvre la personnalisation', await until(page, () => !!document.querySelector('.pf-layer:not(.out) .pf-crow, .pf-custom'), null, 5000));
  await shot('07-game');
  ok('aucune erreur JavaScript', !errors.length, errors.join(' | '));
} catch (e) {
  ok('déroulé sans exception', false, e.message);
} finally {
  console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
  await browser.close(); web.close();
  process.exit(results.every(Boolean) ? 0 : 1);
}
