// Task minigames and sabotage repair panels. Each one builds its own interaction in `el` and calls api.done() only
// when the player really completed it (the room also refuses completions faster than the task's minimum time).
// api: { done(), close(), sfx(name), step: { console, game, target }, roomName(id), sab, fix(msg) }
import * as POLUS from './tasks/polus.js';
import * as SKELD from './tasks/skeld.js';
const NS = 'http://www.w3.org/2000/svg';
const $ = (tag, attrs = {}, kids = []) => { const e = document.createElement(tag); for (const k in attrs) { if (k === 'style') e.style.cssText = attrs[k]; else if (k === 'text') e.textContent = attrs[k]; else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } kids.forEach(c => c && e.append(c)); return e; };
const svg = (w, h, html) => { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', `0 0 ${w} ${h}`); s.innerHTML = html; return s; };
const rnd = (a, b) => a + Math.random() * (b - a);
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// pointer position in SVG/element coordinates
function local(e, el, w, h) { const r = el.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * w, (e.clientY - r.top) / r.height * h]; }
function drag(el, { down, move, up }) {
  el.addEventListener('pointerdown', e => {
    if (down && down(e) === false) return;
    e.preventDefault(); el.setPointerCapture?.(e.pointerId);
    const mv = ev => move?.(ev), u = ev => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', u); el.removeEventListener('pointercancel', u); up?.(ev); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', u); el.addEventListener('pointercancel', u);
  });
}
function hold(btn, { start, stop }) {
  let on = false;
  const s = e => { e.preventDefault(); if (!on) { on = true; btn.classList.add('on'); start(); } };
  const t = () => { if (on) { on = false; btn.classList.remove('on'); stop(); } };
  btn.addEventListener('pointerdown', s); btn.addEventListener('pointerup', t); btn.addEventListener('pointerleave', t); btn.addEventListener('pointercancel', t);
}
const finish = (api, el, msg = 'Tâche terminée !') => { if (el.dataset.done) return; el.dataset.done = 1; el.append($('div', { class: 'mg-done', text: msg })); api.sfx('taskDone'); setTimeout(() => api.done(), 650); };
const panel = (el, cls, title) => { el.classList.add('mg', cls); if (title) el.append($('div', { class: 'mg-title', text: title })); return el; };

const WIRE = ['#e2262b', '#2a52e8', '#f2d417', '#d92ae0'];
export const MINIGAMES = {
  swipe(el, api) {
    panel(el, 'mg-swipe', 'Glisser la carte');
    const msg = $('div', { class: 'mg-lcd', text: 'VEUILLEZ INSÉRER LA CARTE' });
    const reader = $('div', { class: 'mg-reader' }), card = $('div', { class: 'mg-card', text: 'ID' });
    el.append(msg, reader, $('div', { class: 'mg-wallet' }, [card]));
    let stage = 0, t0 = 0;
    drag(card, {
      down: () => { if (!stage) { stage = 1; card.classList.add('up'); msg.textContent = 'VEUILLEZ GLISSER LA CARTE'; return false; } t0 = performance.now(); },
      move: e => { const r = reader.getBoundingClientRect(); const x = Math.max(0, Math.min(r.width - card.offsetWidth, e.clientX - r.left - card.offsetWidth / 2)); card.style.setProperty('--x', x + 'px'); card.dataset.x = x / (r.width - card.offsetWidth); },
      up: () => {
        const p = +card.dataset.x || 0, dt = performance.now() - t0;
        card.style.setProperty('--x', '0px'); card.dataset.x = 0;
        if (p < .92) { msg.textContent = 'MAUVAISE LECTURE. RÉESSAYEZ.'; api.sfx('click'); return; }
        if (dt < 500) { msg.textContent = 'TROP RAPIDE. RÉESSAYEZ.'; api.sfx('click'); return; }
        if (dt > 1300) { msg.textContent = 'TROP LENT. RÉESSAYEZ.'; api.sfx('click'); return; }
        msg.textContent = 'ACCEPTÉ. MERCI.'; finish(api, el);
      },
    });
  },
  wires(el, api) {
    panel(el, 'mg-wires', 'Réparer les câbles');
    const right = shuffle([0, 1, 2, 3]);
    const s = svg(600, 420, `<rect width="600" height="420" fill="#2b2f33"/>${[0, 1, 2, 3].map(i => `<rect x="20" y="${60 + i * 90}" width="46" height="26" fill="${WIRE[i]}"/><rect x="534" y="${60 + right.indexOf(i) * 90}" width="46" height="26" fill="${WIRE[i]}"/><circle class="lamp" data-i="${i}" cx="590" cy="${48 + right.indexOf(i) * 90}" r="7" fill="#330"/>`).join('')}<g class="lines"></g>`);
    el.append(s);
    const lines = s.querySelector('.lines'), done = new Set();
    let cur = null;
    drag(s, {
      down: e => { const [x, y] = local(e, s, 600, 420); const i = [0, 1, 2, 3].find(k => x < 90 && Math.abs(y - (73 + k * 90)) < 30); if (i == null || done.has(i)) return false; cur = document.createElementNS(NS, 'line'); cur.setAttribute('stroke', WIRE[i]); cur.setAttribute('stroke-width', 18); cur.setAttribute('x1', 66); cur.setAttribute('y1', 73 + i * 90); cur.dataset.i = i; lines.append(cur); },
      move: e => { if (!cur) return; const [x, y] = local(e, s, 600, 420); cur.setAttribute('x2', x); cur.setAttribute('y2', y); },
      up: e => {
        if (!cur) return; const [x, y] = local(e, s, 600, 420), i = +cur.dataset.i;
        const k = right.indexOf(i);
        if (x > 500 && Math.abs(y - (73 + k * 90)) < 32) { cur.setAttribute('x2', 534); cur.setAttribute('y2', 73 + k * 90); done.add(i); s.querySelector(`.lamp[data-i="${i}"]`).setAttribute('fill', '#ff0'); api.sfx('taskStep'); if (done.size === 4) finish(api, el); }
        else cur.remove();
        cur = null;
      },
    });
  },
  download(el, api, upload = false) {
    panel(el, 'mg-dl', upload ? 'Envoyer les données' : 'Télécharger les données');
    const bar = $('i'), txt = $('div', { class: 'mg-small', text: '' });
    const btn = $('button', { class: 'mg-btn', text: upload ? 'Envoyer' : 'Télécharger' });
    el.append($('div', { class: 'mg-folders' }, [$('div', { class: 'mg-folder', text: upload ? 'Ma tablette' : api.roomName() }), $('div', { class: 'mg-folder', text: upload ? 'Quartier général' : 'Ma tablette' })]), $('div', { class: 'mg-progress' }, [bar]), txt, btn);
    btn.onclick = () => {
      btn.remove(); const t0 = performance.now(), D = 8000;
      const tick = () => { if (!el.isConnected) return; const k = Math.min(1, (performance.now() - t0) / D); bar.style.width = k * 100 + '%'; txt.textContent = k < 1 ? `Temps estimé : ${Math.ceil((1 - k) * D / 1000)} s` : 'Terminé'; if (k < 1) requestAnimationFrame(tick); else finish(api, el); };
      tick();
    };
  },
  upload(el, api) { MINIGAMES.download(el, api, true); },
  fuelFill(el, api) { holdFill(el, api, 'Remplir le jerrican', 3200, '#f2c230'); },
  fuelPour(el, api) { holdFill(el, api, 'Faire le plein', 3200, '#f2c230', true); },
  jugFill(el, api) { holdFill(el, api, 'Remplir la bonbonne', 2600, '#4fb6ff'); },
  jugPour(el, api) { holdFill(el, api, 'Remplacer la bonbonne', 2600, '#4fb6ff', true); },
  canisters(el, api) { holdFill(el, api, 'Remplir les bonbonnes d’O2', 3000, '#9fe9ff'); },
  garbage(el, api) {
    panel(el, 'mg-garbage', 'Vider les ordures');
    const pile = $('div', { class: 'mg-trash' }), lever = $('div', { class: 'mg-lever' }, [$('i')]);
    for (let i = 0; i < 18; i++) pile.append($('b', { style: `left:${rnd(5, 85)}%;top:${rnd(10, 80)}%;background:hsl(${rnd(0, 360)} 40% 45%)` }));
    el.append(pile, lever, $('div', { class: 'mg-small', text: 'Tire le levier vers le bas et maintiens-le.' }));
    let down = false, left = 1;
    drag(lever, { move: e => { const R = lever.getBoundingClientRect(); down = e.clientY > R.top + R.height * .7; lever.classList.toggle('down', down); }, up: () => { down = false; lever.classList.remove('down'); } });
    const tick = () => { if (!el.isConnected) return; if (down && left > 0) { left -= .008; [...pile.children].forEach((b, i) => { if (i / 18 > left) b.style.opacity = 0; }); if (left <= 0) return finish(api, el); } requestAnimationFrame(tick); };
    tick();
  },
  sample(el, api) {
    panel(el, 'mg-sample', 'Inspecter l’échantillon');
    const btn = $('button', { class: 'mg-btn', text: '▶ Lancer l’analyse' });
    el.append($('div', { class: 'mg-tubes' }, [0, 1, 2, 3, 4].map(() => $('i'))), btn, $('div', { class: 'mg-small', text: 'L’analyse prend 60 secondes : tu peux faire autre chose et revenir.' }));
    btn.onclick = () => { btn.disabled = true; el.querySelectorAll('.mg-tubes i').forEach(t => t.classList.add('blue')); setTimeout(() => finish(api, el, 'Revenez dans 60 s'), 700); };
  },
  sampleEnd(el, api) {
    panel(el, 'mg-sample', 'Sélectionnez l’anomalie');
    const bad = Math.floor(Math.random() * 5);
    el.append($('div', { class: 'mg-tubes' }, [0, 1, 2, 3, 4].map(i => { const t = $('button', { class: 'tube ' + (i === bad ? 'red' : 'blue') }); t.onclick = () => { if (i === bad) finish(api, el); else { api.sfx('click'); el.querySelector('.mg-small').textContent = 'Mauvais tube ! Recommence l’analyse plus tard.'; } }; return t; })), $('div', { class: 'mg-small', text: 'Touche le tube différent.' }));
  },
  scan(el, api) {
    panel(el, 'mg-scan', 'Soumettre l’analyse');
    const bar = $('i'), info = $('div', { class: 'mg-lcd', text: 'Analyse en cours…' });
    el.append(info, $('div', { class: 'mg-progress' }, [bar]));
    const t0 = performance.now(), D = 10000, lines = ['ID : ' + (api.me?.name || '').toUpperCase(), 'TAILLE : 1 m 07', 'POIDS : 42 kg', 'GROUPE : O−', 'COULEUR : ' + (api.me?.colorName || '').toUpperCase()];
    const tick = () => { if (!el.isConnected) return; const k = Math.min(1, (performance.now() - t0) / D); bar.style.width = k * 100 + '%'; info.textContent = lines.slice(0, 1 + Math.floor(k * lines.length)).join(' · ') + (k < 1 ? ` · fin dans ${Math.ceil((1 - k) * D / 1000)} s` : ''); if (k < 1) requestAnimationFrame(tick); else finish(api, el); };
    tick();
  },
  asteroids(el, api) {
    panel(el, 'mg-ast', 'Détruire les astéroïdes');
    const s = svg(600, 420, '<rect width="600" height="420" fill="#04101d"/><g class="a"></g><path d="M300 200v20M290 210h20" stroke="#3fe07a" stroke-width="3"/>');
    const count = $('div', { class: 'mg-small', text: 'Détruits : 0 / 20' });
    el.append(s, count);
    const g = s.querySelector('.a'); let n = 0; const rocks = [];
    const spawn = () => { const r = { x: 640, y: rnd(30, 390), vx: -rnd(1.3, 2.6), vy: rnd(-.6, .6), s: rnd(16, 30), e: document.createElementNS(NS, 'circle') }; r.e.setAttribute('r', r.s); r.e.setAttribute('fill', '#7d6a5a'); r.e.setAttribute('stroke', '#3a2f26'); r.e.setAttribute('stroke-width', 4); g.append(r.e); rocks.push(r); };
    s.addEventListener('pointerdown', e => {
      const [x, y] = local(e, s, 600, 420); api.sfx('click');
      const hit = rocks.find(r => Math.hypot(r.x - x, r.y - y) < r.s + 8);
      if (hit) { hit.e.remove(); rocks.splice(rocks.indexOf(hit), 1); n++; count.textContent = `Détruits : ${n} / 20`; if (n >= 20) finish(api, el); }
    });
    let t = 0;
    const tick = () => { if (!el.isConnected || el.dataset.done) return; if (++t % 34 === 0 && rocks.length < 7) spawn(); for (const r of [...rocks]) { r.x += r.vx; r.y += r.vy; r.e.setAttribute('cx', r.x); r.e.setAttribute('cy', r.y); if (r.x < -40) { r.e.remove(); rocks.splice(rocks.indexOf(r), 1); } } requestAnimationFrame(tick); };
    spawn(); tick();
  },
  chart(el, api) {
    panel(el, 'mg-chart', 'Tracer la route');
    const pts = [[60, 330], [170, rnd(120, 320)], [290, rnd(100, 330)], [410, rnd(100, 330)], [540, rnd(120, 300)]];
    const s = svg(600, 420, `<rect width="600" height="420" fill="#0d2c55"/><path d="${pts.map((p, i) => (i ? 'L' : 'M') + p.join(' ')).join(' ')}" stroke="#9fd0ff" stroke-width="3" stroke-dasharray="10 8" fill="none"/>${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="none" stroke="#ffd24a" stroke-width="3"/>`).join('')}<path class="ship" d="M-14 -10 L18 0 L-14 10 Z" fill="#fff"/>`);
    el.append(s);
    let k = 0; const ship = s.querySelector('.ship'); const at = (x, y) => ship.setAttribute('transform', `translate(${x} ${y})`); at(...pts[0]);
    drag(s, { down: e => { const [x, y] = local(e, s, 600, 420); return Math.hypot(x - pts[k][0], y - pts[k][1]) < 40; }, move: e => { const [x, y] = local(e, s, 600, 420); at(x, y); if (Math.hypot(x - pts[k + 1][0], y - pts[k + 1][1]) < 22) { k++; api.sfx('taskStep'); if (k === pts.length - 1) { at(...pts[k]); finish(api, el); } } }, up: () => at(...pts[k]) });
  },
  manifolds(el, api) {
    panel(el, 'mg-mani', 'Déverrouiller les collecteurs');
    const box = $('div', { class: 'mg-grid10' }); let next = 1;
    shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).forEach(n => { const b = $('button', { text: n }); b.onclick = () => { if (n === next) { b.classList.add('ok'); next++; api.sfx('click'); if (next > 10) finish(api, el); } else { next = 1; api.sfx('click'); box.querySelectorAll('.ok').forEach(x => x.classList.remove('ok')); el.classList.add('err'); setTimeout(() => el.classList.remove('err'), 300); } }; box.append(b); });
    el.append(box, $('div', { class: 'mg-small', text: 'Touche les nombres de 1 à 10 dans l’ordre.' }));
  },
  keys(el, api) {
    panel(el, 'mg-keys', 'Insérer les clés');
    const slot = $('div', { class: 'mg-keyslot' }), key = $('div', { class: 'mg-key', text: '🔑' });
    el.append(slot, key, $('div', { class: 'mg-small', text: 'Glisse la clé dans la serrure puis tourne-la.' }));
    let inserted = false;
    drag(key, { move: e => { if (inserted) return; const R = el.getBoundingClientRect(); key.style.left = (e.clientX - R.left - 30) + 'px'; key.style.top = (e.clientY - R.top - 30) + 'px'; }, up: () => { if (inserted) return; const a = key.getBoundingClientRect(), b = slot.getBoundingClientRect(); if (Math.hypot(a.x - b.x, a.y - b.y) < 70) { inserted = true; key.style.left = slot.offsetLeft + 'px'; key.style.top = slot.offsetTop + 'px'; api.sfx('taskStep'); } } });
    key.addEventListener('click', () => { if (inserted) { key.classList.add('turned'); finish(api, el); } });
  },
  boarding(el, api) {
    panel(el, 'mg-board', 'Scanner la carte d’embarquement');
    const pass = $('div', { class: 'mg-pass' }, [$('b', { text: api.me?.name || 'Équipier' }), $('i', { text: '▦▦▦' })]), scanner = $('div', { class: 'mg-scanner', text: 'SCANNER' });
    el.append(scanner, pass, $('div', { class: 'mg-small', text: 'Glisse la carte sur le scanner.' }));
    drag(pass, { move: e => { const R = el.getBoundingClientRect(); pass.style.left = (e.clientX - R.left - 70) + 'px'; pass.style.top = (e.clientY - R.top - 45) + 'px'; }, up: () => { const a = pass.getBoundingClientRect(), b = scanner.getBoundingClientRect(); if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) { scanner.classList.add('ok'); finish(api, el); } } });
  },
  weather(el, api) {
    panel(el, 'mg-maze', 'Réparer la station météo');
    // a random maze; trace the path from the left entrance to the right exit
    const C = 9, R = 6, cell = 56, ox = 48, oy = 42, walls = new Set();
    const vis = new Set(), st = [[0, 0]]; vis.add('0,0');
    const all = new Set(); for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) { all.add(`${x},${y},r`); all.add(`${x},${y},d`); }
    while (st.length) { const [x, y] = st[st.length - 1]; const n = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]).map(([dx, dy]) => [x + dx, y + dy]).find(([a, b]) => a >= 0 && b >= 0 && a < C && b < R && !vis.has(`${a},${b}`)); if (!n) { st.pop(); continue; } const [a, b] = n; all.delete(a > x ? `${x},${y},r` : a < x ? `${a},${b},r` : b > y ? `${x},${y},d` : `${a},${b},d`); vis.add(`${a},${b}`); st.push(n); }
    all.forEach(w => walls.add(w));
    let lines = '';
    walls.forEach(w => { const [x, y, t] = w.split(','); const X = ox + (+x + 1) * cell, Y = oy + (+y + 1) * cell; if (t === 'r' && +x < C - 1) lines += `M${X} ${Y - cell}V${Y}`; if (t === 'd' && +y < R - 1) lines += `M${X - cell} ${Y}H${X}`; });
    const s = svg(600, 420, `<rect width="600" height="420" fill="#c9bf9e"/><rect x="${ox}" y="${oy}" width="${C * cell}" height="${R * cell}" fill="#8a7f62" stroke="#3b3424" stroke-width="6"/><path d="${lines}" stroke="#3b3424" stroke-width="6"/><path class="trail" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`);
    el.append(s, $('div', { class: 'mg-small', text: 'Trace le chemin de l’entrée (haut gauche) à la sortie (bas droite).' }));
    let path = [[0, 0]]; const trail = s.querySelector('.trail');
    const draw = () => trail.setAttribute('d', path.map(([x, y], i) => `${i ? 'L' : 'M'}${ox + x * cell + cell / 2} ${oy + y * cell + cell / 2}`).join(''));
    const open = ([x, y], [a, b]) => (Math.abs(x - a) + Math.abs(y - b) === 1) && !walls.has(a > x ? `${x},${y},r` : a < x ? `${a},${b},r` : b > y ? `${x},${y},d` : `${a},${b},d`);
    draw();
    drag(s, { move: e => { const [px, py] = local(e, s, 600, 420); const c = [Math.floor((px - ox) / cell), Math.floor((py - oy) / cell)]; const last = path[path.length - 1]; if (c[0] === last[0] && c[1] === last[1]) return; const back = path.length > 1 && path[path.length - 2][0] === c[0] && path[path.length - 2][1] === c[1]; if (back) path.pop(); else if (open(last, c) && !path.some(p => p[0] === c[0] && p[1] === c[1])) path.push(c); draw(); if (c[0] === C - 1 && c[1] === R - 1 && path[path.length - 1] === c) finish(api, el); } });
  },
  weatherLab(el, api) { const b = $('button', { class: 'mg-btn', text: 'Relancer la station météo' }); panel(el, 'mg-simple', 'Station météo'); el.append(b); b.onclick = () => finish(api, el); },
  wifi(el, api) { leverTask(el, api, 'Redémarrer le Wi-Fi', 'down', 'Revenez dans 60 s'); },
  wifiEnd(el, api) { leverTask(el, api, 'Rallumer le Wi-Fi', 'up'); },
  waterCan(el, api) { const b = $('button', { class: 'mg-btn', text: '🚿 Prendre l’arrosoir' }); panel(el, 'mg-simple', 'Arroser les plantes'); el.append(b); b.onclick = () => finish(api, el); },
  waterPlants(el, api) {
    panel(el, 'mg-plants', 'Arroser les plantes');
    let n = 4; const row = $('div', { class: 'mg-row' });
    for (let i = 0; i < 4; i++) { const p = $('button', { class: 'plant', text: '🥀' }); p.onclick = () => { if (p.dataset.ok) return; p.dataset.ok = 1; p.textContent = '🌱'; api.sfx('taskStep'); if (--n === 0) finish(api, el); }; row.append(p); }
    el.append(row, $('div', { class: 'mg-small', text: 'Touche chaque plante pour l’arroser.' }));
  },
  telescope(el, api) {
    panel(el, 'mg-tele', 'Aligner le télescope');
    const tx = rnd(-500, 500), ty = rnd(-300, 300);
    const s = svg(600, 420, `<rect width="600" height="420" fill="#000"/><g class="sky">${Array.from({ length: 120 }, () => `<circle cx="${rnd(-900, 1500)}" cy="${rnd(-700, 1100)}" r="${rnd(1, 3)}" fill="#fff"/>`).join('')}<g transform="translate(${300 + tx} ${210 + ty})"><circle r="26" fill="#7b5bd8"/><circle r="10" fill="#ffd24a"/></g></g><circle cx="300" cy="210" r="34" fill="none" stroke="#3fe07a" stroke-width="3"/>`);
    el.append(s, $('div', { class: 'mg-small', text: 'Déplace le ciel pour centrer la planète.' }));
    let x = 0, y = 0, px, py; const sky = s.querySelector('.sky');
    drag(s, { down: e => { [px, py] = local(e, s, 600, 420); }, move: e => { const [a, b] = local(e, s, 600, 420); x += a - px; y += b - py; px = a; py = b; sky.setAttribute('transform', `translate(${x} ${y})`); }, up: () => { if (Math.hypot(tx + x, ty + y) < 22) finish(api, el); } });
  },
  temperature(el, api) {
    panel(el, 'mg-temp', 'Relever la température');
    const target = Math.round(rnd(-40, 70)); let v = target + (Math.random() < .5 ? -1 : 1) * Math.round(rnd(5, 18));
    const log = $('div', { class: 'mg-lcd big', text: v }), read = $('div', { class: 'mg-lcd big', text: target + '°' });
    const up = $('button', { class: 'mg-btn small', text: '▲' }), down = $('button', { class: 'mg-btn small', text: '▼' });
    const set = d => { v += d; log.textContent = v; api.sfx('click'); if (v === target) finish(api, el); };
    up.onclick = () => set(1); down.onclick = () => set(-1);
    el.append($('div', { class: 'mg-row' }, [$('div', {}, [$('div', { class: 'mg-small', text: 'JOURNAL' }), up, log, down]), $('div', {}, [$('div', { class: 'mg-small', text: 'RELEVÉ' }), read])]));
  },
  drill(el, api) {
    panel(el, 'mg-drill', 'Réparer la foreuse');
    let n = 4; const box = $('div', { class: 'mg-drillbox' });
    for (let i = 0; i < 4; i++) { const w = $('button', { class: 'warn', text: '!', style: `left:${rnd(5, 80)}%;top:${rnd(8, 75)}%` }); let hits = 3; w.onclick = () => { api.sfx('click'); if (--hits === 0) { w.remove(); if (--n === 0) finish(api, el); } else w.style.opacity = .4 + hits * .2; }; box.append(w); }
    el.append(box, $('div', { class: 'mg-small', text: 'Touche chaque alerte trois fois.' }));
  },
  waterwheel(el, api) {
    panel(el, 'mg-wheel', 'Ouvrir la roue à aubes');
    const s = svg(600, 420, '<rect width="600" height="420" fill="#4a3b30"/><g class="w"><circle cx="300" cy="210" r="150" fill="none" stroke="#c9a77a" stroke-width="22"/><path d="M300 60V360M150 210H450M194 104L406 316M406 104L194 316" stroke="#c9a77a" stroke-width="14"/></g><rect x="520" y="60" width="30" height="300" fill="#222"/><rect class="f" x="520" y="360" width="30" height="0" fill="#4fb6ff"/>');
    el.append(s, $('div', { class: 'mg-small', text: 'Fais tourner la roue dans le sens des aiguilles d’une montre.' }));
    let ang = 0, last = null, total = 0;
    drag(s, { move: e => { const [x, y] = local(e, s, 600, 420); const a = Math.atan2(y - 210, x - 300); if (last != null) { let d = a - last; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; if (d > 0) { total += d; ang += d; } } last = a; s.querySelector('.w').setAttribute('transform', `rotate(${ang * 57.3} 300 210)`); const k = Math.min(1, total / (Math.PI * 4)); s.querySelector('.f').setAttribute('y', 360 - 300 * k); s.querySelector('.f').setAttribute('height', 300 * k); if (k >= 1) finish(api, el); }, up: () => { last = null; } });
  },
  tree(el, api) {
    panel(el, 'mg-tree', 'Surveiller l’arbre');
    const rows = [0, 1, 2, 3].map(() => ({ t: rnd(.15, .85), v: rnd(0, 1) }));
    const box = $('div', { class: 'mg-row' });
    rows.forEach((r, i) => { const s = $('div', { class: 'mg-vslider' }, [$('em', { style: `bottom:${r.t * 100}%` }), $('i')]); s.style.setProperty('--k', r.v); drag(s, { move: e => { const R = s.getBoundingClientRect(); r.v = Math.max(0, Math.min(1, (R.bottom - e.clientY) / R.height)); s.style.setProperty('--k', r.v); }, up: () => { if (rows.every(x => Math.abs(x.v - x.t) < .05)) finish(api, el); } }); box.append(s); });
    el.append(box, $('div', { class: 'mg-small', text: 'Amène chaque jauge sur son repère.' }));
  },
  artifacts(el, api) {
    panel(el, 'mg-art', 'Ranger les artefacts');
    const items = ['💎', '🦴', '🪨', '🧪'], slots = $('div', { class: 'mg-slots' }), tray = $('div', { class: 'mg-tray' });
    let n = 4;
    shuffle(items.slice()).forEach(it => slots.append($('div', { class: 'slot', text: it, 'data-i': it })));
    items.forEach(it => { const a = $('div', { class: 'artifact', text: it }); tray.append(a); drag(a, { move: e => { a.style.position = 'fixed'; a.style.left = e.clientX - 28 + 'px'; a.style.top = e.clientY - 28 + 'px'; }, up: e => { const t = document.elementsFromPoint(e.clientX, e.clientY).find(x => x.classList?.contains('slot')); a.style.position = ''; a.style.left = a.style.top = ''; if (t && t.dataset.i === it && !t.dataset.ok) { t.dataset.ok = 1; t.classList.add('ok'); a.remove(); api.sfx('taskStep'); if (--n === 0) finish(api, el); } } }); });
    el.append(slots, tray);
  },

  // ---------------------------------------------------------------- sabotages
  door(el, api) {
    panel(el, 'mg-door', 'Ouvrir la porte');
    let n = 0; const row = $('div', { class: 'mg-row' });
    for (let i = 0; i < 5; i++) { const b = $('button', { class: 'switch' }); b.onclick = () => { if (b.classList.contains('on')) return; b.classList.add('on'); api.sfx('click'); if (++n === 5) { api.fix({ a: 'door', i: api.index }); setTimeout(() => api.close(), 300); } }; row.append(b); }
    el.append(row, $('div', { class: 'mg-small', text: 'Bascule les cinq interrupteurs pour déverrouiller.' }));
  },
};
function holdFill(el, api, title, ms, color, pour = false) {
  panel(el, 'mg-fill', title);
  const tank = $('div', { class: 'mg-tank' }, [$('i', { style: `background:${color}` })]), btn = $('button', { class: 'mg-btn', text: 'Maintenir' });
  el.append(tank, btn, $('div', { class: 'mg-small', text: 'Maintiens le bouton jusqu’au remplissage.' }));
  let k = pour ? 0 : 0, raf = 0, last = 0;
  const step = t => { if (!el.isConnected) return; k = Math.min(1, k + (t - last) / ms); last = t; tank.firstChild.style.height = k * 100 + '%'; if (k >= 1) { finish(api, el); return; } raf = requestAnimationFrame(step); };
  hold(btn, { start: () => { last = performance.now(); raf = requestAnimationFrame(step); }, stop: () => cancelAnimationFrame(raf) });
}
function leverTask(el, api, title, dir, msg) {
  panel(el, 'mg-wifi', title);
  const lever = $('div', { class: 'mg-lever big ' + (dir === 'up' ? 'down' : '') }, [$('i')]);
  el.append(lever, $('div', { class: 'mg-small', text: dir === 'down' ? 'Abaisse le levier pour éteindre le Wi-Fi.' : 'Relève le levier pour rallumer le Wi-Fi.' }));
  drag(lever, { move: e => { const R = lever.getBoundingClientRect(); const down = e.clientY > R.top + R.height * .65, up = e.clientY < R.top + R.height * .35; if (dir === 'down' && down) { lever.classList.add('down'); finish(api, el, msg); } if (dir === 'up' && up) { lever.classList.remove('down'); finish(api, el); } } });
}

// task screens reproduced from the in-game footage replace the earlier versions
for (const k of ['asteroids', 'download', 'upload', 'wifi', 'wifiEnd', 'weather', 'weatherLab', 'temperature', 'telescope', 'sample', 'sampleEnd', 'scan', 'drill',
  'chart', 'keys', 'fuelFill', 'fuelPour', 'jugFill', 'jugPour', 'canisters', 'waterwheel', 'swipe', 'boarding', 'tree', 'wires', 'manifolds', 'garbage']) MINIGAMES[k] = POLUS[k];
// the Skeld task screens and the sabotage repair screens (measured on the sabotage footage)
for (const k of ['divert', 'accept', 'align', 'calibrate', 'filter', 'shields', 'steer', 'reactor', 'lights', 'comms', 'o2Keypad']) MINIGAMES[k] = SKELD[k];
MINIGAMES.reactorHand = MINIGAMES.seismicHand = SKELD.handScan;
