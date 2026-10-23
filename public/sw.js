// Service worker of the console: it only makes the console installable as an app (Android Chrome, Samsung Internet,
// Edge…). Nothing is cached: every request goes to the network as before, so the home-screen app always runs the
// latest published version (the same as the browser, which matters to play together).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Hors connexion</title><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#02060f;color:#fff;font:18px system-ui,sans-serif;text-align:center">' +
    '<div><h1 style="font-weight:500">Pas de connexion Internet</h1><p>La console a besoin d’Internet. Reconnectez-vous puis réessayez.</p>' +
    '<button onclick="location.reload()" style="font:inherit;padding:.6em 1.4em;border-radius:99px;border:0">Réessayer</button></div></body></html>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
