// End-to-end test of messages without a server (static build, local PeerJS broker, three browsers): a private
// conversation, notifications, a named group renamed by a member, a voice message and delivery to a friend
// who was offline when it was sent.
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
const broker = PeerServer({ port: 9125, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?pfdebug&peerhost=127.0.0.1:9125`;
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
const idOf = page => page.evaluate(() => 'local-' + window.__friends.pfriends.code.replace('-', '').toLowerCase());
const befriend = async (X, Y) => {
  const y = await idOf(Y.page), x = await idOf(X.page);
  await X.page.evaluate(id => window.__friends.pfriends.request(window.__friends.pfriends.players().find(p => p.id === id)), y);
  await until(Y.page, id => window.__friends.pfriends.incoming.some(f => f.id === id), x);
  await Y.page.evaluate(id => window.__friends.pfriends.respond(id, true), x);
  return until(X.page, id => window.__friends.pfriends.friends.some(f => f.id === id), y);
};
const convs = page => page.evaluate(() => window.__messages.list.map(c => ({ id: c.id, kind: c.kind, name: window.__messages.name(c), unread: c.unread, msgs: c.msgs.map(m => ({ text: m.text, sys: !!m.sys, voice: !!m.voice, psn: m.psn, wait: m.wait?.length || 0 })) })));

try {
  const A = await player('A', 'Ibrahim'), B = await player('B', 'Timeo'), C = await player('C', 'Lea');
  ok('les trois consoles rejoignent l’annuaire', await inDir(A.page, 2) && await inDir(B.page, 2) && await inDir(C.page, 2));
  ok('amis A-B, A-C et B-C', await befriend(A, B) && await befriend(A, C) && await befriend(B, C));

  // private message from the Game Base: Messages tab › New message › Timeo
  await base(A.page, 'Messages');
  ok('onglet Messages vide au départ', /Aucune conversation/.test(await text(A.page)));
  await A.page.click('.gamebase .btn:has-text("Nouveau message")');
  await A.page.click('.menu .list-item:has-text("Timeo")');
  await A.page.waitForSelector('.chat-screen');
  await A.page.fill('.chat-screen .chat-input', 'Salut Timeo, ça va ?');
  await A.page.press('.chat-screen .chat-input', 'Enter');
  ok('B reçoit la notification « Message de Ibrahim »', await until(B.page, () => [...document.querySelectorAll('.toast')].some(t => /Message de Ibrahim/.test(t.innerText) && /Salut Timeo/.test(t.innerText))));
  ok('B a 1 message non lu', await until(B.page, () => window.__messages.unread === 1));
  ok('A voit « Distribué »', await until(A.page, () => /Distribué/.test(document.querySelector('.chat-screen')?.innerText)));
  // B opens the conversation from the Messages tab and replies with a quick reply
  await base(B.page, 'Messages');
  ok('B voit la conversation avec le badge non lu', /Ibrahim/.test(await text(B.page)) && !!await B.page.$('.gb-row.unread'));
  await B.page.click('.gb-row:has-text("Ibrahim")');
  await B.page.waitForSelector('.chat-screen');
  ok('ouvrir la conversation la marque comme lue', await until(B.page, () => window.__messages.unread === 0));
  await B.page.click('.chat-screen .chip:has-text("On joue ?")');
  ok('A reçoit la réponse dans la conversation ouverte (sans notification)', await until(A.page, () => /On joue \?/.test(document.querySelector('.msg-list')?.innerText)) && await A.page.evaluate(() => window.__messages.unread === 0));

  // a group created by A, named, then renamed by B: everyone gets the new name and a notification
  await A.page.click('.chat-screen'); await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);
  await base(A.page, 'Messages');
  await A.page.click('.gamebase .btn:has-text("Nouveau groupe")');
  await A.page.click('.pick-list .gb-row:has-text("Timeo")');
  await A.page.click('.pick-list .gb-row:has-text("Lea")');
  await A.page.click('.dialog .btn:has-text("Valider")');
  await A.page.waitForSelector('.dialog .f-input');
  await A.page.fill('.dialog .f-input', 'Les potes');
  await A.page.click('.dialog .btn:has-text("Valider")');
  await A.page.waitForSelector('.chat-screen');
  ok('C est ajouté au groupe et notifié', await until(C.page, () => [...document.querySelectorAll('.toast')].some(t => /Les potes/.test(t.innerText) && /créé le groupe/.test(t.innerText))));
  await A.page.fill('.chat-screen .chat-input', 'Bienvenue dans le groupe');
  await A.page.press('.chat-screen .chat-input', 'Enter');
  ok('C reçoit le message du groupe « Les potes · Ibrahim : … »', await until(C.page, () => [...document.querySelectorAll('.toast')].some(t => /Les potes/.test(t.innerText) && /Ibrahim : Bienvenue/.test(t.innerText))));
  const g = (await convs(B.page)).find(c => c.kind === 'group');
  ok('B a le groupe avec ses 3 membres', !!g && g.name === 'Les potes');
  await B.page.evaluate(id => window.__messages.rename(window.__messages.conv(id), 'Les Gaulmont'), g.id);
  ok('C : notification « Timeo a renommé le groupe « Les Gaulmont » »', await until(C.page, () => [...document.querySelectorAll('.toast')].some(t => /Timeo a renommé le groupe « Les Gaulmont »/.test(t.innerText))));
  ok('le nouveau nom s’affiche chez A dans la conversation ouverte', await until(A.page, () => document.querySelector('.chat-screen h1')?.textContent === 'Les Gaulmont'));
  // rename from the UI too
  await A.page.click('.chat-screen .btn:has-text("Renommer")');
  await A.page.fill('.dialog .f-input', 'Les Gaulmont 2');
  await A.page.press('.dialog .f-input', 'Enter');
  ok('renommage depuis l’écran reçu par B et C', await until(B.page, id => window.__messages.name(window.__messages.conv(id)) === 'Les Gaulmont 2', g.id) && await until(C.page, id => window.__messages.name(window.__messages.conv(id)) === 'Les Gaulmont 2', g.id));

  // a voice message (fake microphone) recorded in the group
  await A.page.click('.chat-screen .btn:has-text("Message vocal")');
  ok('enregistrement en cours affiché', await until(A.page, () => !!document.querySelector('.rec-on')));
  await A.page.waitForTimeout(2200);
  await A.page.click('.chat-screen .rec-on');
  ok('B reçoit le message vocal avec notification', await until(B.page, () => [...document.querySelectorAll('.toast')].some(t => /Ibrahim : Message vocal \(0:0\d\)/.test(t.innerText)), null, 20000));
  ok('C a le message vocal dans le groupe', await until(C.page, id => window.__messages.conv(id).msgs.some(m => m.voice), g.id));
  await B.page.keyboard.press('Escape'); await B.page.waitForTimeout(400);
  await base(B.page, 'Messages');
  await B.page.click('.gb-row:has-text("Les Gaulmont 2")');
  await B.page.waitForSelector('.chat-screen .msg-voice');
  await B.page.click('.chat-screen .msg-voice');
  ok('B lit le message vocal', await until(B.page, () => !!document.querySelector('.msg-voice.on') || window.__messages.playing !== null, null, 5000));
  ok('aucune erreur de lecture', !await B.page.$('.toast:has-text("Lecture impossible")') && !await B.page.$('.toast:has-text("plus disponible")'));

  // C goes offline; A writes to C; C comes back and gets it
  const cid = await idOf(C.page);
  await C.page.close();
  ok('C est hors ligne', await until(A.page, id => !window.__friends.pfriends.online(id), cid, 30000));
  await A.page.evaluate(id => { const f = window.__friends.pfriends.friends.find(x => x.id === id); window.__messages.send(window.__messages.direct(f), 'Tu le recevras en revenant'); }, cid);
  ok('message en attente chez A', await A.page.evaluate(id => window.__messages.conv('dm:' + id).msgs.at(-1).wait.length === 1, cid));
  C.page = await C.ctx.newPage();
  C.page.on('pageerror', e => errors.push(`C: ${e.message}`));
  await C.page.goto(url);
  await C.page.keyboard.press('Enter');
  await C.page.waitForTimeout(1500);
  if (!await C.page.$('.home .tile')) await C.page.click('text=Lea');
  ok('C reçoit le message à son retour', await until(C.page, () => window.__messages?.list.some(c => c.kind === 'dm' && c.msgs.some(m => m.text === 'Tu le recevras en revenant')), null, 40000));
  ok('A voit le message distribué', await until(A.page, id => !window.__messages.conv('dm:' + id).msgs.at(-1).wait.length, cid, 20000));
  ok('C a gardé le groupe après rechargement', (await convs(C.page)).some(c => c.name === 'Les Gaulmont 2' && c.msgs.some(m => m.voice)));
} catch (e) { ok('scénario sans exception', false, e.message); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 4).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
