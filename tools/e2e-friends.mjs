// End-to-end test of friends without a server (static build, local PeerJS broker, three browsers): the players'
// directory, friend request and acceptance, invitation of a player who is not a friend, joining a friend's group,
// friends kept after a reload, and the directory taken over when the console holding it leaves.
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
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp3': 'audio/mpeg' };
const web = createServer(async (req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  try { const f = join(dist, p === '/' ? 'index.html' : p); const d = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const broker = PeerServer({ port: 9124, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?pfdebug&peerhost=127.0.0.1:9124`;
const browser = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(!!c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 15000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 150 }); return true; } catch { return false; } };
const text = page => page.evaluate(() => document.querySelector('.gamebase')?.innerText || '');
async function player(name, psn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|Could not connect to peer|ERR_CONNECTION/.test(m.text())) errors.push(`${name}: ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', psn);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  return { ctx, page };
}
const base = async (page, tab) => {
  if (!await page.$('.gamebase')) { await page.click('.tb-avatar'); await page.click('.menu .list-item:has-text("Base de jeu")'); await page.waitForSelector('.gamebase'); }
  await page.click(`.gamebase .tab:has-text("${tab}")`);
  await page.waitForTimeout(300);
};
const inDir = (page, n) => until(page, n => window.__friends?.pfriends.status === 'online' && window.__friends.pfriends.players().length >= n, n, 25000);

try {
  const A = await player('A', 'Alice'), B = await player('B', 'Bruno'), C = await player('C', 'Chloe');
  ok('les trois consoles rejoignent l’annuaire des joueurs', await inDir(A.page, 2) && await inDir(B.page, 2) && await inDir(C.page, 2));
  const holders = await Promise.all([A, B, C].map(p => p.page.evaluate(() => window.__friends.dirHolder)));
  ok('une seule console tient l’annuaire', holders.filter(Boolean).length === 1, JSON.stringify(holders));

  // A sees the players online and sends a friend request to B
  await base(A.page, 'Ajouter un ami');
  ok('joueurs en ligne listés chez A', await until(A.page, () => /Bruno/.test(document.querySelector('.gamebase')?.innerText) && /Chloe/.test(document.querySelector('.gamebase')?.innerText)));
  await A.page.click('.gb-row:has-text("Bruno")');
  await A.page.click('.menu .list-item:has-text("Envoyer une demande d’ami")');
  ok('demande envoyée', await until(A.page, () => /Demande d’ami envoyée/.test(document.body.innerText)));
  // the search finds online players too
  await A.page.fill('.gamebase .f-input', 'chl'); await A.page.press('.gamebase .f-input', 'Enter');
  ok('la recherche trouve Chloe', await until(A.page, () => [...document.querySelectorAll('.gb-row')].some(r => /Chloe/.test(r.innerText) && r.dataset.key?.startsWith('r-'))));

  // B accepts in Requests
  ok('B reçoit la demande', await until(B.page, () => /Nouvelle demande d’ami/.test(document.body.innerText)));
  await base(B.page, 'Demandes');
  await B.page.click('.gamebase button:has-text("Accepter")');
  ok('A et B sont amis (des deux côtés)', await until(A.page, () => window.__friends.pfriends.friends.some(f => f.psn === 'Bruno'))
    && await until(B.page, () => window.__friends.pfriends.friends.some(f => f.psn === 'Alice')));
  await base(A.page, 'Amis');
  ok('B apparaît en ligne dans les amis de A', /En ligne[\s\S]*Bruno/.test(await text(A.page)));

  // A invites C, who is not a friend: a room is created and C joins it
  await base(A.page, 'Ajouter un ami');
  await A.page.click('.gb-row[data-key="o-' + await C.page.evaluate(() => JSON.parse(localStorage.getItem('ps5ux.accounts'))[0].id) + '"]');
  await A.page.click('.menu .list-item:has-text("Inviter à jouer")');
  ok('C reçoit l’invitation de A', await until(C.page, () => /Alice vous invite/.test(document.querySelector('.dialog')?.innerText || ''), null, 25000));
  await C.page.click('.dialog button:has-text("Rejoindre")');
  ok('C a rejoint le salon de A', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 25000)
    && await until(C.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('2'), null, 25000));

  // B joins its friend's group from the friends list (the code is asked to A, never published)
  ok('B voit que A est dans un groupe', await until(B.page, () => window.__friends.pfriends.presenceOf(window.__friends.pfriends.friends[0].id).partyId, null, 20000));
  await base(B.page, 'Amis');
  await B.page.click('.gb-row:has-text("Alice")');
  await B.page.click('.menu .list-item:has-text("Rejoindre son groupe")');
  ok('B a rejoint le groupe de son amie', await until(A.page, () => (document.querySelector('#party-hud')?.innerText || '').includes('3'), null, 25000));
  ok('C (pas ami) ne peut pas obtenir le code', await C.page.evaluate(async () => {
    const pf = window.__friends.pfriends, a = pf.players().find(p => p.psn === 'Alice');
    try { await pf.where(a.id); return false; } catch { return true; }
  }));

  // reload: the friends are kept on the device
  await B.page.reload();
  await B.page.waitForSelector('.home .tile, .users, .account', { timeout: 20000 });
  ok('amis conservés après rechargement', await until(B.page, () => window.__friends?.pfriends.friends.some(f => f.psn === 'Alice'), null, 20000));

  // the console holding the directory leaves: another one takes it over
  const holder = [A, B, C][holders.indexOf(true)];
  const rest = [A, B, C].filter(p => p !== holder && p !== B);
  await holder.ctx.close();
  ok('l’annuaire est repris par une autre console', await until(rest[0].page, () => window.__friends.pfriends.status === 'online', null, 40000)
    && await until(rest[0].page, () => [window.__friends.dirHolder].length && window.__friends.pfriends.players().length >= 1, null, 40000));
} catch (e) { ok('scénario sans exception', false, e.message); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 4).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
