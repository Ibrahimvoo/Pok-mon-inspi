// The MIMIC PARTY emblem (glossy lips + three sound waves over a dark plate), redrawn as vector shapes after the
// game's logo: used on the splash, the menus and painted on the back wall of the 3D room.
const BEIGE = '#e9c48f', INK = '#121014';
const LIPS_UP = 'M92 206C120 128 186 98 226 130C262 100 344 114 378 192C330 176 132 178 92 206Z';
const LIPS_LOW = 'M92 206C142 306 326 324 378 192C334 238 138 242 92 206Z';
const MOUTH = 'M108 205C152 180 322 174 362 194C322 250 152 256 108 205Z';
const TEETH = 'M132 191C192 176 292 174 344 190L338 205C282 196 192 198 138 208Z';

export async function fontsReady() {
  try { await Promise.all([document.fonts.load('120px "Lilita One"'), document.fonts.load('80px "Sniglet"')]); } catch { /* fallback faces */ }
}

// draws the emblem in a 600 × 620 box scaled to the canvas
export function drawLogo(canvas, { glow = false } = {}) {
  const c = canvas.getContext('2d'), s = Math.min(canvas.width / 600, canvas.height / 620);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate((canvas.width - 600 * s) / 2, (canvas.height - 620 * s) / 2);
  c.scale(s, s);
  c.lineJoin = c.lineCap = 'round';
  if (glow) { c.shadowColor = 'rgba(255, 60, 160, .45)'; c.shadowBlur = 40; }
  // sound waves
  const arc = (r, color) => {
    c.beginPath(); c.arc(330, 205, r, -0.78, 0.78);
    c.strokeStyle = BEIGE; c.lineWidth = 58; c.stroke();
    c.strokeStyle = INK; c.lineWidth = 46; c.stroke();
    c.strokeStyle = color; c.lineWidth = 30; c.stroke();
  };
  c.save(); c.translate(40, -10);
  arc(118, '#ffd21f'); arc(166, '#ff2f93'); arc(214, '#7d2fd6');
  c.restore();
  c.shadowBlur = 0;
  // lips
  c.save(); c.translate(250, 210); c.rotate(-0.17); c.translate(-235, -210);
  const up = new Path2D(LIPS_UP), low = new Path2D(LIPS_LOW), mouth = new Path2D(MOUTH);
  for (const [w, col] of [[44, BEIGE], [26, INK]]) { c.lineWidth = w; c.strokeStyle = col; c.stroke(up); c.stroke(low); c.stroke(mouth); }
  c.fillStyle = '#2b0614'; c.fill(mouth);
  c.fillStyle = '#ffffff'; c.fill(new Path2D(TEETH));
  c.fillStyle = '#ff3d95'; c.beginPath(); c.ellipse(232, 232, 66, 22, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#ffd21f'; c.beginPath(); c.ellipse(212, 236, 26, 9, 0, 0, Math.PI * 2); c.fill();
  const g = c.createLinearGradient(0, 100, 0, 320); g.addColorStop(0, '#ff5fb0'); g.addColorStop(1, '#e8127a');
  c.fillStyle = g; c.fill(up); c.fill(low);
  c.fillStyle = 'rgba(255,255,255,.85)';
  c.beginPath(); c.ellipse(170, 146, 30, 9, -0.5, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(158, 262, 22, 7, 0.45, 0, Math.PI * 2); c.fill();
  c.restore();
  // dark plate with a curved bottom
  const plate = new Path2D('M56 372Q52 344 84 342L520 334Q552 334 552 364L548 520Q546 548 516 552Q300 596 88 572Q58 568 58 540Z');
  c.lineWidth = 22; c.strokeStyle = BEIGE; c.stroke(plate);
  c.fillStyle = '#17141c'; c.fill(plate);
  // wordmark
  c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  const word = (txt, y, size, fill, edge) => {
    c.font = `${size}px "Lilita One", "Arial Black", sans-serif`;
    c.lineWidth = size * .16; c.strokeStyle = INK; c.strokeText(txt, 304, y);
    c.fillStyle = edge; c.fillText(txt, 304, y + size * .05);
    c.fillStyle = fill; c.fillText(txt, 304, y);
  };
  word('MIMIC', 470, 150, '#ffd60a', '#b88a00');
  word('PARTY', 556, 104, '#ff2a8a', '#a3104f');
  c.restore();
  return canvas;
}

let cached = null;
// a data URL of the emblem for the DOM (menus, splash)
export function logoUrl() {
  if (cached) return cached;
  const cv = document.createElement('canvas'); cv.width = 600; cv.height = 620;
  drawLogo(cv);
  return (cached = cv.toDataURL('image/png'));
}
export function resetLogoCache() { cached = null; }
