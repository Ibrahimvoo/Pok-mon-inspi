// Full-screen WebGL backdrop: depth-map parallax on game art, cross-fades, drifting particles and the default theme.
import { stick } from './input.js';

const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
const FS = `precision highp float;
varying vec2 v;
uniform sampler2D i0,d0,i1,d1;
uniform float mixv,theme,time,dim,parts,has0,has1;
uniform vec2 res,par;
uniform vec3 tint;
float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
vec2 cover(vec2 uv,float z){float sa=res.x/res.y,ia=16./9.;vec2 s=sa>ia?vec2(1.,ia/sa):vec2(sa/ia,1.);return (uv-.5)*s/z+.5;}
vec3 art(sampler2D im,sampler2D dp,vec2 uv,float z){
  vec2 c=cover(uv,z); c.y=1.-c.y;
  vec2 o=par*vec2(.022,-.014);
  float d=texture2D(dp,c).r; vec2 q=c+o*(d-.4);
  d=texture2D(dp,q).r; q=c+o*(d-.4);
  d=texture2D(dp,q).r; q=c+o*(d-.4);
  return texture2D(im,q).rgb;}
vec3 themeCol(vec2 uv){
  vec3 c=mix(tint*.05,tint*.17,smoothstep(-.2,1.1,uv.y+uv.x*.25));
  c+=tint*.36*exp(-length((uv-vec2(.78,.62))*vec2(1.,1.8))*2.2);
  for(int i=0;i<4;i++){float f=float(i);
    float y=.38+.07*f+.06*sin(uv.x*2.6+time*.11+f*1.9)+.025*sin(uv.x*6.3-time*.17+f*3.);
    float d=abs(uv.y-y);
    float spark=.6+.4*sin(uv.x*90.+time*.6+f*7.);
    c+=mix(tint,vec3(1.),.3)*exp(-d*260.)*.18*spark+tint*.85*exp(-d*22.)*.035;}
  return c;}
void main(){
  vec2 uv=v;
  float z=1.07+.015*sin(time*.07);
  vec3 th=(has0<.5||has1<.5||theme>.001)?themeCol(uv):vec3(0.);
  vec3 a=has0>.5?art(i0,d0,uv,z):th;
  vec3 b=has1>.5?art(i1,d1,uv,z+.02*(1.-mixv)):th;
  vec3 col=mix(a,b,smoothstep(0.,1.,mixv));
  col=mix(col,th,theme);
  // drifting bokeh particles, three depth layers
  if(parts>.5){
    vec2 asp=vec2(res.x/res.y,1.);
    for(int i=0;i<3;i++){float f=float(i);
      vec2 p=uv*asp*(6.+f*5.)+vec2(time*.02*(1.+f),-time*.035*(1.+f*.6))+par*.04*(f+1.);
      vec2 c=floor(p);vec2 r=vec2(h(c+f*17.),h(c+f*31.+4.));
      float s=h(c+9.+f);
      float d=length(fract(p)-r);
      float tw=.5+.5*sin(time*(.6+s)+s*30.);
      col+=vec3(.75,.85,1.)*smoothstep(.05+.04*(2.-f),0.,d)*step(.82,s)*tw*(.05+.03*f);}
  }
  vec2 q=uv-.5; col*=1.-dot(q,q)*.55;
  gl_FragColor=vec4(col*dim,1.);
}`;

let gl, prog, U = {}, canvas, fb, raf = 0;
const cache = new Map();             // url → { tex, w, h, used }
let flat;                            // neutral depth texture for images without a depth map
let cur = null, next = null;         // { img, depth } entries
let mix = 0, themeV = 1, themeT = 1, dimV = 1, dimT = 1, quality = 'high', parallaxOn = true, frame = 0, reduce = false;
const par = { x: 0, y: 0, tx: 0, ty: 0 };
let token = 0, paused = false;
// console theme: colour of the animated backdrop, and whether game art replaces it
export const THEMES = {
  blue: { label: 'Bleu', hex: '#0b6bd8', hi: '#2f8cff', tint: [.06, .35, 1] },
  violet: { label: 'Violet', hex: '#7a3fd8', hi: '#a77bff', tint: [.42, .2, 1] },
  red: { label: 'Rouge', hex: '#c8323f', hi: '#ff5a66', tint: [1, .14, .2] },
  pink: { label: 'Rose', hex: '#c8337e', hi: '#ff5fae', tint: [1, .2, .6] },
  green: { label: 'Vert', hex: '#12a36a', hi: '#3fdc98', tint: [.06, 1, .55] },
  gold: { label: 'Or', hex: '#c98a12', hi: '#ffc23d', tint: [1, .62, .08] },
};
const tint = [...THEMES.blue.tint], tintT = [...THEMES.blue.tint];
let fixedTheme = false, lastShow = null;

function tex(src) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  if (src) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src);
  else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([100, 100, 100]));
  return t;
}
function loadImage(url) {
  return new Promise((res, rej) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(() => res(im));
    im.onerror = () => rej(new Error('Image introuvable : ' + url));
    im.src = url;
  });
}
async function getTex(url) {
  if (!url) return null;
  let e = cache.get(url);
  if (!e) {
    e = { p: loadImage(url).then(im => { e.tex = tex(im); return e; }) };
    cache.set(url, e);
    e.p.catch(() => cache.delete(url));
  }
  e.used = performance.now();
  await e.p;
  // keep GPU memory bounded
  if (cache.size > 14) {
    const old = [...cache.entries()].filter(([, x]) => x.tex && x !== cur?.img && x !== cur?.depth && x !== next?.img && x !== next?.depth).sort((a, b) => a[1].used - b[1].used);
    for (const [k, x] of old.slice(0, cache.size - 14)) { gl.deleteTexture(x.tex); cache.delete(k); }
  }
  return e;
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 1.5 : quality === 'eco' ? .7 : 1);
  const w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
}

function draw(t) {
  raf = requestAnimationFrame(draw);
  if (document.hidden || paused) return;
  frame++;
  if (quality === 'eco' && frame % 2) return;
  const k = reduce ? 1 : .08;
  // parallax target: pointer, right stick, or a slow idle drift
  const sx = stick.rx || stick.x * .35, sy = stick.ry || stick.y * .35;
  const tx = parallaxOn ? (Math.abs(sx) > .05 ? sx : par.tx) + Math.sin(t * .00021) * .15 : 0;
  const ty = parallaxOn ? (Math.abs(sy) > .05 ? sy : par.ty) + Math.cos(t * .00017) * .1 : 0;
  par.x += (tx - par.x) * .045; par.y += (ty - par.y) * .045;
  themeV += (themeT - themeV) * k; dimV += (dimT - dimV) * k;
  for (let i = 0; i < 3; i++) tint[i] += (tintT[i] - tint[i]) * k;
  if (next) {
    mix = Math.min(1, mix + (reduce ? 1 : .035));
    if (mix >= 1) { cur = next; next = null; mix = 0; }
  }
  resize();
  gl.viewport(0, 0, canvas.width, canvas.height);
  const bind = (unit, e, name) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, e?.tex || flat); gl.uniform1i(U[name], unit); };
  bind(0, cur?.img, 'i0'); bind(1, cur?.depth, 'd0'); bind(2, next?.img, 'i1'); bind(3, next?.depth, 'd1');
  gl.uniform1f(U.has0, cur ? 1 : 0); gl.uniform1f(U.has1, next ? 1 : 0);
  gl.uniform1f(U.mixv, next ? mix : 0);
  gl.uniform1f(U.theme, themeV);
  gl.uniform3f(U.tint, tint[0], tint[1], tint[2]);
  gl.uniform1f(U.time, t / 1000);
  gl.uniform1f(U.dim, dimV);
  gl.uniform1f(U.parts, quality === 'eco' ? 0 : 1);
  gl.uniform2f(U.res, canvas.width, canvas.height);
  gl.uniform2f(U.par, par.x, -par.y);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// CSS fallback when WebGL is unavailable
let fbIx = 0;
function fallbackShow(url) {
  if (!fb) return;
  const layers = fb.children;
  fbIx = 1 - fbIx;
  layers[fbIx].style.backgroundImage = url ? `url(${url})` : '';
  layers[fbIx].classList.add('on');
  layers[1 - fbIx].classList.remove('on');
}

export const bg = {
  get webgl() { return !!gl; },
  init(c, fallbackEl) {
    canvas = c;
    fb = fallbackEl;
    try {
      gl = c.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: false });
      if (!gl) throw new Error('WebGL indisponible');
      const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const l = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
      for (const n of ['i0', 'd0', 'i1', 'd1', 'mixv', 'theme', 'time', 'dim', 'parts', 'has0', 'has1', 'res', 'par', 'tint']) U[n] = gl.getUniformLocation(prog, n);
      flat = tex(null);
      c.addEventListener('webglcontextlost', e => { e.preventDefault(); cancelAnimationFrame(raf); gl = null; document.documentElement.classList.add('no-webgl'); fallbackShow(cur?.url); });
      raf = requestAnimationFrame(draw);
    } catch (e) {
      console.warn(e);
      gl = null;
      document.documentElement.classList.add('no-webgl');
    }
    addEventListener('pointermove', e => { par.tx = (e.clientX / innerWidth) * 2 - 1; par.ty = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
    addEventListener('deviceorientation', e => { if (e.gamma == null) return; par.tx = Math.max(-1, Math.min(1, e.gamma / 25)); par.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 25)); }, { passive: true });
  },
  configure({ quality: q, parallax, reduceMotion, theme, wallpaper }) {
    quality = q; parallaxOn = parallax; reduce = reduceMotion;
    tintT.splice(0, 3, ...(THEMES[theme] || THEMES.blue).tint);
    const fixed = wallpaper === 'theme';
    if (fixed !== fixedTheme) { fixedTheme = fixed; this.show(...(lastShow || [null])); }
  },
  // show game art (with optional depth map), or pass null for the default theme
  async show(img, depth) {
    lastShow = [img, depth];
    const my = ++token;
    if (fixedTheme) img = null;
    if (!img) { themeT = 1; if (!gl) fallbackShow(null); return; }
    if (!gl) { fallbackShow(img); themeT = 0; return; }
    try {
      const [ti, td] = await Promise.all([getTex(img), depth ? getTex(depth).catch(() => null) : null]);
      if (my !== token) return;
      const entry = { img: ti, depth: td, url: img };
      if (cur && cur.url === img && !next) { themeT = 0; return; }
      if (next) { cur = next; mix = 0; }
      if (themeV > .5) cur = null;
      next = entry; mix = 0; themeT = 0;
    } catch (e) { console.warn(e); if (my === token) themeT = 1; }
  },
  preload(urls) { if (gl) urls.forEach(u => getTex(u).catch(() => {})); else urls.forEach(u => { new Image().src = u; }); },
  dim(v) { dimT = v; },
  // skip rendering entirely while an opaque screen hides the backdrop
  pause(v) { paused = v; },
};
