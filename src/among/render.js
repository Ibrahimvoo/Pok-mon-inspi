// Draws the world: the reference map image, vents, bodies, crewmates (one shared base), names, the light cone with
// shadows behind the walls, task arrows and highlights. Everything is in world units scaled to the screen like the
// reference footage (VIEW_HEIGHT units from top to bottom).
import { drawCrew, drawDead, WALK_FRAMES } from './art/crew.js';
import { mapArt, drawMapImage } from './art/maparts.js';
import { COLORS, CREW_HEIGHT, VIEW_HEIGHT, VISION_BASE, LIGHTS_VISION, USE_RANGE } from './core/rules.js';

const colorOf = id => COLORS.find(c => c.id === id) || COLORS[0];
const WALK_FPS = 24;

export class Renderer {
  constructor(canvas, client) {
    this.canvas = canvas; this.c = client; this.g = canvas.getContext('2d');
    this.shade = document.createElement('canvas');
    this.walkT = 0; this.vents = []; this.fx = []; this.cam = null; this.camView = null;
    this.time = 0; this.highlight = null; this.arrows = [];
  }
  resize() {
    const r = this.canvas.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; this.shade.width = w; this.shade.height = h; }
    this.canvas.dpr = 1; this.dpr = dpr; this.W = w; this.H = h;
    this.U = h / VIEW_HEIGHT;
  }
  ventFx(x, y) { this.vents.push({ x, y, t: 0 }); }
  puff(x, y, color) { this.fx.push({ x, y, t: 0, color }); }
  look(n) { return this.c.player(n) || { color: 'red', name: '' }; }

  frame(dt) {
    this.resize();
    const { g, c, U, W, H } = this;
    this.time += dt;
    c.interpolate(dt);
    const meMoving = c.moving;
    this.walkT = meMoving ? this.walkT + dt : 0;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const art = mapArt(c.mapId);
    const cx = this.camView ? this.camView.x : c.pos.x, cy = this.camView ? this.camView.y : c.pos.y;
    this.cam = { x: cx, y: cy };
    g.setTransform(U, 0, 0, U, W / 2 - cx * U, H / 2 - cy * U);
    drawMapImage(g, art);
    const M = c.map, V = c.v, inPlay = c.inGame && c.phase === 'play';
    // vents opening and closing
    this.vents = this.vents.filter(v => (v.t += dt) < .45);
    for (const v of this.vents) drawVentOpen(g, v.x, v.y, Math.sin(Math.min(1, v.t / .45) * Math.PI));
    // usable objects glow in yellow like the original
    if (this.highlight) { const h = this.highlight; g.save(); g.strokeStyle = 'rgba(255,233,60,.95)'; g.lineWidth = .07; g.shadowColor = '#ffe93c'; g.shadowBlur = 10; g.beginPath(); g.arc(h.x, h.y, .38, 0, Math.PI * 2); g.stroke(); g.restore(); }
    // bodies
    for (const [n, x, y, dissolve] of c.bodies) {
      const L = this.look(n);
      drawDead(g, L.color, x, y, CREW_HEIGHT, { alpha: 1 - dissolve * .9 });
      if (dissolve > 0) { g.fillStyle = `rgba(140,255,90,${.35 * dissolve})`; g.beginPath(); g.ellipse(x, y - .1, .45, .2, 0, 0, Math.PI * 2); g.fill(); }
    }
    // crewmates sorted by depth
    const list = [];
    for (const [n, o] of c.others) list.push({ n, x: o.x, y: o.y, f: o.f, look: o.look ?? n, walkT: o.walkT });
    const meFlags = c.selfFlags || 0;
    if (!(V?.me?.vent && inPlay)) list.push({ n: c.n, x: c.pos.x, y: c.pos.y, f: (meMoving ? 1 : 0) | (c.dir < 0 ? 2 : 0) | (c.ghost ? 4 : 0) | (meFlags & (8 | 16 | 32 | 64 | 128 | 256)), look: V?.me?.shift ?? c.n, walkT: this.walkT, me: true });
    list.sort((a, b) => a.y - b.y);
    const iAmImp = V?.me?.team === 'imp';
    for (const p of list) this.crewmate(p, iAmImp);
    // effects (shapeshift / vanish puffs)
    this.fx = this.fx.filter(f => (f.t += dt) < .6);
    for (const f of this.fx) { g.fillStyle = `rgba(230,230,230,${.6 * (1 - f.t / .6)})`; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; g.beginPath(); g.arc(f.x + Math.cos(a) * f.t * 1.2, f.y - .45 + Math.sin(a) * f.t * .8, .16 + f.t * .2, 0, Math.PI * 2); g.fill(); } }
    // light: crewmates see within their vision, walls cast shadows (not in the lobby, not for ghosts)
    if (inPlay && !c.ghost && !this.camView) this.vision(M, V);
    // arrows to the current steps of my tasks, the tracked player and the noisemaker alert
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (inPlay) this.drawArrows(V);
  }
  crewmate(p, iAmImp) {
    const { g } = this, c = this.c;
    const L = this.look(p.look), real = this.look(p.n);
    const ghost = !!(p.f & 4);
    let alpha = 1;
    if (ghost) alpha = .5;
    if (p.f & 64) alpha = p.me ? .4 : .3;            // phantom: only its own team (and ghosts) still see it, faded
    const left = !!(p.f & 2);
    const frame = p.f & 1 && !ghost ? Math.floor(p.walkT * WALK_FPS * (c.v?.settings?.playerSpeed || 1)) % WALK_FRAMES : -1;
    const bob = ghost ? Math.sin(this.time * 2.2 + p.n) * .05 : 0;
    // shadow under the feet
    if (!ghost) { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(p.x, p.y, .27, .075, 0, 0, Math.PI * 2); g.fill(); }
    drawCrew(g, L.color, p.x, p.y + bob, CREW_HEIGHT, { frame, left, ghost, alpha });
    // medbay scan
    if (p.f & 8) { g.save(); g.globalAlpha = .55 + Math.sin(this.time * 8) * .2; g.fillStyle = '#5dff8a'; const yy = p.y - CREW_HEIGHT * (.5 + .5 * Math.sin(this.time * 3)); g.fillRect(p.x - .34, yy, .68, .04); g.globalAlpha = .18; g.fillRect(p.x - .34, p.y - CREW_HEIGHT, .68, CREW_HEIGHT); g.restore(); }
    // guardian angel protection
    if (p.f & 32) { g.save(); g.strokeStyle = 'rgba(120,220,255,.9)'; g.lineWidth = .04; g.fillStyle = 'rgba(120,220,255,.15)'; g.beginPath(); g.ellipse(p.x, p.y - CREW_HEIGHT / 2, .5, .62, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.restore(); }
    // name (impostors see each other in red)
    const imp = iAmImp && (c.player(p.n)?.imp || (p.me && c.v?.me?.team === 'imp'));
    const name = L.name || real.name || '';
    if (name) {
      const fs = .2;
      g.save(); g.globalAlpha = alpha === 1 ? 1 : Math.max(.5, alpha);
      g.font = `600 ${fs}px Sniglet, "Arial Rounded MT Bold", Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'bottom';
      g.lineWidth = .045; g.strokeStyle = 'rgba(0,0,0,.85)'; g.lineJoin = 'round';
      const ny = p.y + bob - CREW_HEIGHT - .05;
      g.strokeText(name, p.x, ny); g.fillStyle = imp ? '#ff1b1b' : '#fff'; g.fillText(name, p.x, ny);
      if (p.f & 256) { g.fillStyle = '#7dff9b'; g.beginPath(); g.arc(p.x + g.measureText(name).width / 2 + .1, ny - .1, .045, 0, Math.PI * 2); g.fill(); }
      g.restore();
    }
  }
  visionRadius(V) {
    const s = V.settings, me = V.me;
    if (me.team === 'imp') return VISION_BASE * s.impostorVision;
    return VISION_BASE * s.crewVision * (V.sab?.kind === 'lights' ? LIGHTS_VISION : 1);
  }
  vision(M, V) {
    const { g, U, W, H, shade } = this, c = this.c;
    const R = this.visionRadius(V);
    const sg = shade.getContext('2d');
    sg.setTransform(1, 0, 0, 1, 0, 0); sg.globalCompositeOperation = 'source-over';
    sg.clearRect(0, 0, W, H);
    sg.fillStyle = 'rgba(0,0,0,.82)'; sg.fillRect(0, 0, W, H);
    sg.setTransform(U, 0, 0, U, W / 2 - this.cam.x * U, H / 2 - this.cam.y * U);
    sg.globalCompositeOperation = 'destination-out';
    const px = c.pos.x, py = c.pos.y - .3, N = 260, closed = V.closed;
    sg.beginPath();
    for (let i = 0; i <= N; i++) {
      const a = i / N * Math.PI * 2, d = M.ray(px, py, a, R, closed) + .25;
      const x = px + Math.cos(a) * Math.min(R, d), y = py + Math.sin(a) * Math.min(R, d);
      i ? sg.lineTo(x, y) : sg.moveTo(x, y);
    }
    const gr = sg.createRadialGradient(px, py, 0, px, py, R);
    gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(.82, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    sg.fillStyle = gr; sg.fill();
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(shade, 0, 0);
  }
  toScreen(x, y) { return [this.W / 2 + (x - this.cam.x) * this.U, this.H / 2 + (y - this.cam.y) * this.U]; }
  drawArrows(V) {
    const { g, W, H } = this, c = this.c, M = c.map;
    const targets = [];
    for (const t of V.tasks || []) {
      if (t.done || t.fake && false) continue;
      const st = t.steps[t.step]; const cs = st && M.consoles[st.console];
      if (cs) targets.push({ x: cs.x, y: cs.y, color: '#ffe23c' });
    }
    if (V.sab) for (const s of M.sabotage[V.sab.kind] || []) targets.push({ x: s.x, y: s.y, color: '#ff2c2c', blink: true });
    if (V.trackPos) targets.push({ x: V.trackPos[0], y: V.trackPos[1], color: colorOf(c.player(V.me.track?.n)?.color).body, big: true });
    for (const a of V.alerts || []) targets.push({ x: a.x, y: a.y, color: '#ffffff', blink: true });
    const m = 46 * this.dpr;
    for (const t of targets) {
      const [sx, sy] = this.toScreen(t.x, t.y);
      if (sx > m && sx < W - m && sy > m && sy < H - m) continue;     // on screen: no arrow, like the original
      if (t.blink && Math.floor(this.time * 3) % 2) continue;
      const a = Math.atan2(sy - H / 2, sx - W / 2);
      const k = Math.min((W / 2 - m) / Math.abs(Math.cos(a) || 1e-6), (H / 2 - m) / Math.abs(Math.sin(a) || 1e-6));
      const x = W / 2 + Math.cos(a) * k, y = H / 2 + Math.sin(a) * k, s = (t.big ? 26 : 20) * this.dpr;
      g.save(); g.translate(x, y); g.rotate(a);
      g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * .6, -s * .7); g.lineTo(-s * .25, 0); g.lineTo(-s * .6, s * .7); g.closePath();
      g.fillStyle = t.color; g.strokeStyle = 'rgba(0,0,0,.8)'; g.lineWidth = 3 * this.dpr; g.stroke(); g.fill();
      g.restore();
    }
  }
}
function drawVentOpen(g, x, y, k) {
  g.save(); g.translate(x, y);
  g.fillStyle = '#0b0e10'; g.fillRect(-.34, -.18, .68, .36);
  g.fillStyle = '#8b959c'; g.fillRect(-.36, -.2 - .45 * k, .72, .12);
  g.restore();
}
export { USE_RANGE };
