// Camera and shared gameplay in a voice call (room by code, local PeerJS broker, fake camera/microphone):
// camera both ways with real frames, front/back switch hidden with a single camera, the shared game with its picture,
// stop, permission refused, and nothing left filming after hanging up. Usage: npm run build && node tools/e2e-video.mjs [dir]
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
const broker = PeerServer({ port: 9133, path: '/', host: '127.0.0.1' });
const url = `http://localhost:${web.address().port}/?peerhost=127.0.0.1:9133&pfdebug&pflow`;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] });
const results = [], errors = [];
const ok = (n, c, x = '') => { results.push(c); console.log(c ? '✓' : '✗', n, x); };
const until = async (page, fn, arg, ms = 10000) => { try { await page.waitForFunction(fn, arg, { timeout: ms, polling: 100 }); return true; } catch { return false; } };
async function player(name, psn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, permissions: ['microphone', 'camera'] });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errors.push(`${name}: ${m.text()}`); });
  await page.goto(url);
  await page.keyboard.press('Enter');
  await page.waitForSelector('.account .acc-form', { timeout: 15000 });
  await page.fill('.f-input >> nth=0', psn);
  await page.click('.acc-submit');
  await page.waitForSelector('.home .tile', { timeout: 15000 });
  return { ctx, page, shot: n => shots && page.screenshot({ path: join(shots, `video-${n}.jpg`), type: 'jpeg', quality: 70 }) };
}
try {
  const A = await player('A', 'Camera_A'), B = await player('B', 'Camera_B');
  // A opens a room, B joins it by its link: both are in the voice call (fake microphones)
  await A.page.click('.tb-avatar'); await A.page.click('.menu .list-item:has-text("Base de jeu")');
  await A.page.waitForSelector('.gamebase');
  await A.page.click('.gamebase button:has-text("Créer un salon")');
  await until(A.page, () => /Salon [A-Z0-9]{6}/.test(document.querySelector('.gamebase')?.innerText || ''));
  const code = (await A.page.locator('.party-head h2').innerText()).match(/[A-Z0-9]{6}/)[0];
  if (await until(A.page, () => !!document.querySelector('.dialog'), null, 3000)) await A.page.click('.dialog button:has-text("OK")');
  await B.page.evaluate(c => { location.hash = 'salon=' + c; }, code);
  await until(B.page, () => /Rejoindre le salon/.test(document.querySelector('.dialog')?.innerText || ''));
  await B.page.click('.dialog button:has-text("Rejoindre")');
  const inCall = () => (document.querySelector('#party-hud')?.innerText || '').includes('2') && !!document.querySelector('#video-dock:not(.hidden) .vd-btn');
  ok('appel établi, commandes vidéo visibles', await until(A.page, inCall, null, 30000) && await until(B.page, inCall, null, 30000));
  ok('caméra éteinte tant qu’on ne la demande pas', await A.page.evaluate(() => !document.querySelector('.vd-tile')));

  // ---------------------------------------------------------------- camera A → B
  await A.page.click('#video-dock .vd-btn[title="Activer la caméra"]');
  ok('aperçu de sa propre caméra (indicateur actif)', await until(A.page, () => { const v = document.querySelector('.vd-tile.cam video'); return v && v.videoWidth > 0 && !!document.querySelector('.vd-tile.cam .vd-live'); }, null, 15000));
  const frames = page => page.evaluate(() => { const v = document.querySelector('.vd-tile.cam video'); return v ? v.getVideoPlaybackQuality?.().totalVideoFrames ?? (v.videoWidth ? 1 : 0) : -1; });
  ok('B reçoit la caméra de A', await until(B.page, () => { const v = document.querySelector('.vd-tile.cam video'); return v && v.videoWidth > 0 && /Camera_A/.test(document.querySelector('.vd-tile.cam')?.innerText || ''); }, null, 20000));
  const f1 = await frames(B.page); await B.page.waitForTimeout(1500); const f2 = await frames(B.page);
  ok('images en direct chez B', f2 > f1, `${f1} → ${f2} images`);
  // the microphone is muted from the Game Base: the camera keeps going
  await A.page.click('.gamebase button[data-key="mute"]');
  ok('micro coupé indépendamment : la caméra continue', await until(A.page, () => /Réactiver le micro/.test(document.querySelector('.gamebase')?.innerText || ''), null, 4000)
    && await until(B.page, () => { const v = document.querySelector('.vd-tile.cam video'); return v && v.videoWidth > 0; }, null, 3000));
  await A.page.click('.gamebase button[data-key="mute"]');
  ok('un seul appareil photo : pas de bouton avant/arrière', await A.page.evaluate(() => !document.querySelector('#video-dock .vd-btn[title^="Caméra "]')));
  await A.shot('1-camera');

  // ---------------------------------------------------------------- camera B → A, then A off
  await B.page.click('#video-dock .vd-btn[title="Activer la caméra"]');
  ok('caméras dans les deux sens', await until(A.page, () => [...document.querySelectorAll('.vd-tile.cam')].some(t => /Camera_B/.test(t.innerText) && t.querySelector('video')?.videoWidth > 0), null, 20000));
  await A.page.click('#video-dock .vd-btn[title="Couper la caméra"]');
  ok('caméra coupée : disparaît chez B', await until(B.page, () => ![...document.querySelectorAll('.vd-tile.cam')].some(t => /Camera_A/.test(t.innerText)), null, 10000));
  ok('caméra coupée : plus d’aperçu chez A', await A.page.evaluate(() => ![...document.querySelectorAll('.vd-tile.cam')].some(t => /Vous/.test(t.innerText))));

  // ---------------------------------------------------------------- shared gameplay
  await A.page.keyboard.press('Escape'); await A.page.waitForTimeout(400);
  await A.page.click('.home .tile.sel');
  // in a party, the game opens straight into the members' shared lobby
  ok('partie lancée pendant l’appel', await until(A.page, () => !!document.querySelector('.pf-title .pf-btn, .pf-lobby .pf-btn'), null, 60000));
  if (await until(B.page, () => /a lancé/.test(document.querySelector('.dialog')?.innerText || ''), null, 5000)) await B.page.click('.dialog button:has-text("Plus tard")');
  ok('bouton « Partager la partie » pendant le jeu', await until(A.page, () => !!document.querySelector('#video-dock .vd-btn[title="Partager la partie"]'), null, 5000));
  await A.page.click('#video-dock .vd-btn[title="Partager la partie"]');
  ok('indicateur de partage chez A', await until(A.page, () => /Vous partagez la partie/.test(document.getElementById('video-dock').innerText), null, 8000));
  ok('B voit la partie de A en direct', await until(B.page, () => { const v = document.querySelector('.vd-tile.screen video'); return v && v.videoWidth > 0 && /Camera_A · partie/.test(document.querySelector('.vd-tile.screen').innerText); }, null, 25000));
  // two live audio outputs for A at B's: A's voice and A's shared game sound
  ok('son du jeu transmis (piste audio du partage)', await B.page.evaluate(() => [...document.querySelectorAll('audio')].filter(a => a.srcObject?.getAudioTracks()[0]?.readyState === 'live').length >= 2));
  await B.page.click('.vd-tile.screen');
  ok('vignette agrandie au toucher (image affichée, centrée)', await until(B.page, () => { const v = document.querySelector('#video-big:not(.hidden) .vd-big video'), r = v?.getBoundingClientRect(); return r && v.videoWidth > 0 && r.width > innerWidth * .6 && Math.abs(r.left + r.width / 2 - innerWidth / 2) < 4; }, null, 5000));
  await B.page.waitForTimeout(500);
  await B.shot('2-share');
  await B.page.click('#video-big');
  ok('vue agrandie fermée au toucher', await until(B.page, () => document.getElementById('video-big').classList.contains('hidden'), null, 3000));
  await A.page.click('#video-dock .vd-btn[title="Arrêter le partage"]');
  ok('partage arrêté : disparaît chez B', await until(B.page, () => !document.querySelector('.vd-tile.screen'), null, 10000));

  // ---------------------------------------------------------------- hanging up stops everything
  await A.page.click('#video-dock .vd-btn[title="Partager la partie"]');
  await until(B.page, () => !!document.querySelector('.vd-tile.screen video'), null, 20000);
  await B.page.evaluate(() => document.querySelector('#party-hud')?.click());
  await B.page.waitForSelector('.gamebase', { timeout: 5000 });
  await B.page.click('.gamebase button[data-key="leave"]');
  await B.page.click('.dialog button:has-text("Quitter")');
  ok('après avoir raccroché : plus de vidéo ni de panneau chez B', await until(B.page, () => !document.querySelector('.vd-tile') && document.getElementById('video-dock').classList.contains('hidden'), null, 10000));
  ok('chez A : la vidéo de B disparaît', await until(A.page, () => ![...document.querySelectorAll('.vd-tile')].some(t => /Camera_B/.test(t.innerText)), null, 20000));

  // ---------------------------------------------------------------- permission refused
  const C = await player('C', 'Refus_C');
  await C.page.evaluate(() => {
    const real = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = c => c?.video ? Promise.reject(new DOMException('refusé', 'NotAllowedError')) : real(c);
  });
  await C.page.evaluate(c => { location.hash = 'salon=' + c; }, code);
  await until(C.page, () => /Rejoindre le salon/.test(document.querySelector('.dialog')?.innerText || ''));
  await C.page.click('.dialog button:has-text("Rejoindre")');
  await until(C.page, () => !!document.querySelector('#video-dock:not(.hidden) .vd-btn'), null, 30000);
  await C.page.click('#video-dock .vd-btn[title="Activer la caméra"]');
  ok('caméra refusée : message clair, rien d’activé', await until(C.page, () => /Accès à la caméra refusé/.test(document.getElementById('toasts').innerText) && !document.querySelector('.vd-tile.cam'), null, 8000));

  // ---------------------------------------------------------------- whole screen (computers): the browser's picker is
  // replaced by a drawn stream; the browser's own « Stop sharing » ends the track
  await C.page.evaluate(() => {
    navigator.mediaDevices.getDisplayMedia = async () => {
      const c = document.createElement('canvas'); c.width = 640; c.height = 360; const g = c.getContext('2d');
      setInterval(() => { g.fillStyle = `hsl(${Date.now() / 10 % 360} 70% 50%)`; g.fillRect(0, 0, 640, 360); }, 50);
      const s = c.captureStream(15); window.__screenTrack = s.getVideoTracks()[0]; return s;
    };
  });
  await C.page.click('#video-dock .vd-btn[title="Partager l’écran"]');
  ok('partage d’écran reçu par les autres', await until(A.page, () => [...document.querySelectorAll('.vd-tile.screen')].some(t => /Refus_C · écran/.test(t.innerText) && t.querySelector('video')?.videoWidth > 0), null, 25000));
  await C.page.evaluate(() => window.__screenTrack.dispatchEvent(new Event('ended')));
  ok('arrêt par le navigateur : partage terminé partout', await until(C.page, () => !/Vous partagez/.test(document.getElementById('video-dock').innerText) && !!document.querySelector('#video-dock .vd-btn[title="Partager l’écran"]'), null, 5000)
    && await until(A.page, () => ![...document.querySelectorAll('.vd-tile.screen')].some(t => /Refus_C/.test(t.innerText)), null, 10000));
} catch (e) { ok('scénario', false, e.message.split('\n')[0]); }
ok('aucune erreur JavaScript', !errors.length, errors.slice(0, 4).join(' | '));
await browser.close(); web.close(); broker.close?.();
console.log(`\n${results.filter(Boolean).length}/${results.length} vérifications réussies`);
process.exit(results.every(Boolean) ? 0 : 1);
