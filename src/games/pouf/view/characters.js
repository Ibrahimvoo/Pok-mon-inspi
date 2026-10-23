// The Poufs: chubby original critters built from primitives, with procedural animation
// (idle, running round the rim, puffing, emotes, flying off a burst raft, swimming).
import * as THREE from 'three';
import { merge, mesh, outline, vtoon, paint, S, Cy, Co, Bx, Ca, To, shade } from './toon.js';

export const SPECIES = [
  { id: 'hippo', name: 'Bobo', kind: 'Hippopotame', main: '#9d8fc4', belly: '#c9bfe6' },
  { id: 'capy', name: 'Capi', kind: 'Capybara', main: '#e0975a', belly: '#f2bf8a' },
  { id: 'frog', name: 'Gloup', kind: 'Grenouille', main: '#7cc94a', belly: '#e4f08a' },
  { id: 'walrus', name: 'Morso', kind: 'Morse', main: '#5d8fd0', belly: '#a9c8ef' },
  { id: 'bear', name: 'Nono', kind: 'Ours', main: '#6e5a52', belly: '#b89a84', lvl: 2 },
  { id: 'pig', name: 'Groin', kind: 'Cochon', main: '#f39bb0', belly: '#ffd0da', lvl: 4 },
];
export const COLORS = ['#9d8fc4', '#e0975a', '#7cc94a', '#5d8fd0', '#6e5a52', '#f39bb0', '#f2c94c', '#e8605a', '#4fc6b8', '#8a8f9c', '#b46fd6', '#f4f1ea'];
export const HATS = [
  { id: 'none', name: 'Aucun' }, { id: 'cap', name: 'Casquette' }, { id: 'party', name: 'Chapeau de fête' }, { id: 'flower', name: 'Fleur' },
  { id: 'bucket', name: 'Bob de pêcheur', lvl: 2 }, { id: 'crown', name: 'Couronne', lvl: 3 }, { id: 'viking', name: 'Casque viking', lvl: 5 },
  { id: 'propeller', name: 'Casquette à hélice', lvl: 6 }, { id: 'chef', name: 'Toque', lvl: 7 }, { id: 'bow', name: 'Nœud', lvl: 1 },
];
export const EXTRAS = [{ id: 'none', name: 'Aucun' }, { id: 'shades', name: 'Lunettes de soleil' }, { id: 'bowtie', name: 'Nœud papillon', lvl: 2 }, { id: 'scarf', name: 'Écharpe', lvl: 3 }];
export const GASES = [
  { id: 'green', name: 'Classique', c: ['#c4ef3f', '#e2fb7a'] }, { id: 'pink', name: 'Barbe à papa', c: ['#ff8fd0', '#ffc3e8'] },
  { id: 'blue', name: 'Menthe glaciale', c: ['#7ad8ff', '#c4f0ff'], lvl: 2 }, { id: 'violet', name: 'Myrtille', c: ['#b28bff', '#d9c6ff'], lvl: 3 },
  { id: 'gold', name: 'Or', c: ['#ffd23f', '#fff09a'], lvl: 6 }, { id: 'rainbow', name: 'Arc-en-ciel', c: ['#ff6b6b', '#ffd23f', '#6be36b', '#6bc8ff', '#c08bff'], lvl: 8 },
];
export const EMOTES = [
  { id: 'wave', name: 'Coucou', icon: '👋' }, { id: 'laugh', name: 'Rire', icon: '😂' }, { id: 'dance', name: 'Danse', icon: '🕺' },
  { id: 'cheer', name: 'Hourra', icon: '🎉' }, { id: 'angry', name: 'Grrr', icon: '😤', lvl: 2 }, { id: 'love', name: 'Bisou', icon: '😘', lvl: 4 },
];
export const defaultLook = (i = 0) => ({ species: SPECIES[i % 4].id, color: SPECIES[i % 4].main, hat: ['none', 'cap', 'party', 'flower'][i % 4], extra: 'none', gas: 'green' });
export const speciesOf = id => SPECIES.find(s => s.id === id) || SPECIES[0];
// Two riders with the same species and colour are hard to tell apart: later ones get another colour.
export function distinctLooks(list) {
  const used = new Set();
  return list.map(p => {
    let look = p.look || defaultLook(0);
    const key = l => l.species + l.color;
    if (used.has(key(look))) {
      const c = COLORS.find(col => !used.has(look.species + col) && col !== look.color);
      if (c) look = { ...look, color: c };
    }
    used.add(key(look));
    return { ...p, look };
  });
}
export const gasOf = id => GASES.find(g => g.id === id) || GASES[0];

const WHITE = '#fbfbf7', DARK = '#2a2230', PINK = '#f28aa0';

function headParts(sp, c, b) {
  const p = [];
  const dark = shade(c, -.25);
  const eyes = (x, y, z, r = .12, lid = true) => {
    for (const sx of [-1, 1]) {
      p.push(S(r, WHITE, [sx * x, y, z]), S(r * .55, DARK, [sx * x, y + .005, z + r * .72]), S(r * .18, WHITE, [sx * x + .025, y + .04, z + r * 1.05], 0, 1, 6));
      // heavy lids give the deadpan look
      if (lid) p.push(lidGeo(r * 1.08, c, [sx * x, y + .012, z]));
    }
  };
  switch (sp) {
    case 'hippo':
      p.push(S(.4, c, [0, .28, .02], 0, [1.1, .92, 1]));
      p.push(S(.3, c, [0, .12, .33], 0, [1.32, .86, 1]));
      for (const sx of [-1, 1]) p.push(S(.05, dark, [sx * .12, .27, .6], 0, [1, .7, 1], 8), S(.085, c, [sx * .28, .62, -.02], 0, [1, 1.25, .6], 10), S(.045, PINK, [sx * .28, .63, .02], 0, [1, 1.2, .5], 8));
      p.push(Bx(.085, .1, .05, WHITE, [-.09, -.05, .6]), Bx(.085, .1, .05, WHITE, [.09, -.05, .6]));
      eyes(.17, .44, .3);
      break;
    case 'capy':
      p.push(S(.38, c, [0, .3, 0], 0, [1, .95, 1.05]));
      p.push(S(.28, c, [0, .2, .34], 0, [.95, .82, 1.2]));
      p.push(S(.12, DARK, [0, .3, .64], 0, [1.3, .6, .55], 10));
      for (const sx of [-1, 1]) p.push(S(.075, dark, [sx * .24, .6, -.08], 0, [1, 1, .6], 8));
      eyes(.2, .44, .24, .1);
      break;
    case 'frog':
      p.push(S(.42, c, [0, .24, .04], 0, [1.22, .78, 1]));
      p.push(S(.3, b, [0, .1, .16], 0, [1.15, .5, 1]));
      for (const sx of [-1, 1]) { p.push(S(.17, c, [sx * .21, .5, .16])); p.push(S(.07, PINK, [sx * .3, .17, .36], 0, [1, .6, .5], 8)); }
      p.push(To(.2, .022, DARK, [0, .12, .34], [Math.PI / 2 + .25, 0, Math.PI], [1.25, 1, 1], Math.PI));
      eyes(.21, .55, .25, .13);
      break;
    case 'walrus':
      p.push(S(.4, c, [0, .28, .02], 0, [1.08, .95, 1]));
      for (const sx of [-1, 1]) {
        p.push(S(.17, b, [sx * .11, .14, .36], 0, [1, .85, .9]));
        p.push(Co(.045, .32, WHITE, [sx * .1, -.08, .44], [Math.PI + .12, 0, -sx * .1], 1, 8));
        for (let k = 0; k < 3; k++) p.push(S(.018, DARK, [sx * (.08 + k * .05), .16 - k * .025, .5], 0, 1, 6));
      }
      p.push(S(.075, PINK, [0, .25, .48], 0, [1.2, .9, 1], 10));
      eyes(.16, .45, .3, .11);
      break;
    case 'bear':
      p.push(S(.4, c, [0, .3, .02], 0, [1.06, .95, 1]));
      p.push(S(.2, b, [0, .15, .32], 0, [1.15, .85, 1]));
      p.push(S(.075, DARK, [0, .24, .5], 0, [1.3, .9, 1], 10));
      for (const sx of [-1, 1]) p.push(S(.13, c, [sx * .3, .6, -.02], 0, [1, 1, .55]), S(.075, b, [sx * .3, .6, .04], 0, [1, 1, .4], 10));
      eyes(.16, .42, .3, .1);
      break;
    case 'pig':
      p.push(S(.4, c, [0, .28, .02], 0, [1.08, .95, 1]));
      p.push(Cy(.15, .16, .14, shade(c, .15), [0, .2, .4], [Math.PI / 2, 0, 0]));
      for (const sx of [-1, 1]) { p.push(S(.035, DARK, [sx * .055, .2, .48], 0, [1, 1.3, .6], 8)); p.push(Co(.12, .2, c, [sx * .25, .62, 0], [.5, 0, -sx * .5], [1, 1, .5])); }
      eyes(.17, .43, .3, .1);
      break;
  }
  return p;
}
// Upper half of a sphere, tilted forward: the eyelid
function lidGeo(r, c, p) {
  const g = new THREE.SphereGeometry(r, 14, 8, 0, Math.PI * 2, 0, Math.PI * .42);
  g.rotateX(.62);
  g.translate(p[0], p[1], p[2]);
  return paint(g, c);
}

function hatParts(id) {
  const p = [];
  switch (id) {
    case 'cap':
      p.push(S(.3, '#e8463c', [0, 0, 0], 0, [1, .55, 1]), Cy(.22, .24, .03, '#e8463c', [0, -.01, .26], 0, [1, 1, 1.2]), S(.05, WHITE, [0, .16, 0], 0, 1, 8));
      break;
    case 'party':
      p.push(Co(.18, .48, '#46b8f0', [0, .2, 0]), To(.18, .03, '#ffd23f', [0, -.03, 0], [Math.PI / 2, 0, 0]), S(.07, '#ff5d8f', [0, .46, 0], 0, 1, 10));
      for (let i = 0; i < 3; i++) p.push(To(.15 - i * .045, .022, '#ff5d8f', [0, .06 + i * .12, 0], [Math.PI / 2, 0, 0]));
      break;
    case 'flower':
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; p.push(S(.09, '#ffffff', [Math.cos(a) * .11, .02, Math.sin(a) * .11], 0, [1, .45, 1], 10)); }
      p.push(S(.07, '#ffcf3f', [0, .05, 0], 0, [1, .6, 1], 10));
      break;
    case 'bucket':
      p.push(Cy(.22, .27, .2, '#e9d9a6', [0, .06, 0]), Cy(.4, .4, .03, '#d9c48c', [0, -.04, 0]), Cy(.225, .225, .05, '#5d8a4a', [0, .02, 0]));
      break;
    case 'crown':
      p.push(Cy(.24, .22, .16, '#f6c33b', [0, .04, 0], 0, 1, 16));
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; p.push(Co(.06, .16, '#f6c33b', [Math.cos(a) * .2, .2, Math.sin(a) * .2], 0, 1, 8), S(.035, i % 2 ? '#e8463c' : '#46b8f0', [Math.cos(a) * .23, .06, Math.sin(a) * .23], 0, 1, 8)); }
      break;
    case 'viking':
      p.push(S(.31, '#a7adb8', [0, -.02, 0], 0, [1, .7, 1]), To(.3, .035, '#8a6a42', [0, -.04, 0], [Math.PI / 2, 0, 0]));
      for (const sx of [-1, 1]) p.push(Co(.07, .3, '#fff3d6', [sx * .33, .12, 0], [0, 0, -sx * .9], 1, 10));
      break;
    case 'propeller':
      p.push(S(.3, '#4aa3f0', [0, 0, 0], 0, [1, .55, 1]), Cy(.22, .24, .03, '#ffd23f', [0, -.01, .26], 0, [1, 1, 1.2]), Cy(.02, .02, .14, '#888', [0, .2, 0], 0, 1, 6));
      break;
    case 'chef':
      p.push(Cy(.22, .22, .22, WHITE, [0, .08, 0]));
      for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; p.push(S(.13, WHITE, [Math.cos(a) * .12, .26, Math.sin(a) * .12])); }
      p.push(S(.14, WHITE, [0, .32, 0]));
      break;
    case 'bow':
      for (const sx of [-1, 1]) p.push(Co(.1, .2, '#ff5d8f', [sx * .1, 0, 0], [0, 0, sx * Math.PI / 2], [1, 1, .6], 10));
      p.push(S(.06, '#e8467a', [0, 0, 0], 0, 1, 10));
      break;
  }
  return p;
}

function extraParts(id, sp) {
  const p = [];
  if (id === 'shades') {
    const y = sp === 'frog' ? .55 : sp === 'capy' ? .44 : .44, z = sp === 'frog' ? .4 : .42, x = sp === 'frog' ? .21 : .17;
    for (const sx of [-1, 1]) p.push(Bx(.2, .12, .04, '#1d1d26', [sx * x, y, z], [0, sx * .15, 0]));
    p.push(Bx(.16, .03, .03, '#1d1d26', [0, y + .03, z + .02]));
  }
  return p;
}

let geoCache = new Map();
function geoFor(key, build) { if (!geoCache.has(key)) geoCache.set(key, merge(build())); return geoCache.get(key); }

// Build a character. Returns { root, update(dt, st), look, dispose }.
export function createCharacter(look) {
  const sp = speciesOf(look.species).id;
  const c = look.color || speciesOf(sp).main, b = shade(c, .38), mat = vtoon();
  const root = new THREE.Group(); root.name = 'pouf';
  const hips = new THREE.Group(); root.add(hips);
  // body: pear shaped, big round behind
  const body = mesh(geoFor(`body:${c}:${look.extra}`, () => {
    const prof = [[0, .02], [.3, .03], [.48, .12], [.58, .28], [.61, .45], [.58, .62], [.5, .8], [.38, .95], [.22, 1.05], [0, 1.08]].map(([x, y]) => new THREE.Vector2(x, y));
    const lathe = new THREE.LatheGeometry(prof, 20); lathe.scale(1, 1, .94);
    const parts = [lathe, S(.42, b, [0, .48, .26], 0, [1, 1.15, .55]),
      S(.31, c, [-.17, .42, -.36], 0, [1, 1, .9]), S(.31, c, [.17, .42, -.36], 0, [1, 1, .9]),
      S(.09, shade(c, -.1), [0, .34, -.62], 0, [1, 1, 1], 8)];
    paint(lathe, c);
    if (look.extra === 'bowtie') parts.push(Co(.09, .16, '#e8463c', [-.08, .98, .3], [0, 0, Math.PI / 2], [1, 1, .6], 8), Co(.09, .16, '#e8463c', [.08, .98, .3], [0, 0, -Math.PI / 2], [1, 1, .6], 8), S(.05, '#c4302a', [0, .98, .33], 0, 1, 8));
    if (look.extra === 'scarf') parts.push(To(.33, .09, '#e8463c', [0, .96, 0], [Math.PI / 2, 0, 0], [1, 1, .9]), Ca(.07, .25, '#e8463c', [.18, .8, .3], [.3, 0, .2]));
    return parts;
  }), mat);
  outline(body, .03);
  hips.add(body);
  const head = new THREE.Group(); head.position.set(0, .98, .04); hips.add(head);
  const headMesh = mesh(geoFor(`head:${sp}:${c}:${look.extra}`, () => [...headParts(sp, c, b), ...extraParts(look.extra, sp)]), mat);
  outline(headMesh, .026);
  head.add(headMesh);
  let prop = null;
  if (look.hat && look.hat !== 'none') {
    const hat = mesh(geoFor('hat:' + look.hat, () => hatParts(look.hat)), mat);
    outline(hat, .02);
    const top = sp === 'frog' ? .58 : .66;
    hat.position.set(0, look.hat === 'flower' || look.hat === 'bow' ? top - .02 : top, 0);
    if (look.hat === 'flower' || look.hat === 'bow') { hat.position.x = .2; hat.rotation.z = -.4; }
    head.add(hat);
    if (look.hat === 'propeller') {
      prop = mesh(geoFor('prop', () => [Bx(.5, .015, .07, '#e8463c', [0, 0, 0]), Bx(.07, .015, .5, '#ffd23f', [0, 0, 0])]), mat);
      prop.position.set(0, .28, 0); hat.add(prop);
    }
  }
  // limbs
  const limb = (key, build, x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); const m = mesh(geoFor(key, build), mat); outline(m, .022); g.add(m); hips.add(g); return g; };
  const armL = limb('arm:' + c, () => [Ca(.1, .3, c, [0, -.2, 0]), S(.12, shade(c, .12), [0, -.42, .02])], .5, .78, .1);
  const armR = limb('arm:' + c, () => [Ca(.1, .3, c, [0, -.2, 0]), S(.12, shade(c, .12), [0, -.42, .02])], -.5, .78, .1);
  const legL = limb('leg:' + c, () => [Ca(.13, .1, c, [0, -.08, 0]), S(.16, shade(c, -.08), [0, -.17, .06], 0, [1, .55, 1.3])], .25, .2, 0);
  const legR = limb('leg:' + c, () => [Ca(.13, .1, c, [0, -.08, 0]), S(.16, shade(c, -.08), [0, -.17, .06], 0, [1, .55, 1.3])], -.25, .2, 0);
  hips.position.y = .2;

  // animation state
  let t = Math.random() * 10, puffT = 0, emoteT = 0, emoteId = null;
  const api = {
    root, look, head, hips,
    // world position of the behind, where the gas comes out
    butt(out = new THREE.Vector3()) { return out.set(0, .62, -.72).applyMatrix4(hips.matrixWorld); },
    emote(id) { emoteId = id; emoteT = 0; },
    // st: { mode: 'raft'|'stand'|'fly'|'swim'|'menu', run: -1..1, puff: bool, big: number(0..1 flash) }
    update(dt, st = {}) {
      t += dt;
      const run = st.run || 0, ar = Math.abs(run), mode = st.mode || 'stand';
      puffT = st.puff ? Math.min(1, puffT + dt * 6) : Math.max(0, puffT - dt * 4);
      if (emoteId) { emoteT += dt; if (emoteT > 2.6 || (ar > .3 && emoteT > .4) || st.puff) emoteId = null; }
      // defaults
      let hy = .2, hrx = 0, hrz = 0, hry = 0, sx = 1, sy = 1, aLx = -1.15, aRx = -1.15, aLz = .25, aRz = -.25, lL = 0, lR = 0, headX = 0, headZ = 0;
      if (mode === 'raft' || mode === 'stand' || mode === 'menu') {
        const br = Math.sin(t * 2.2) * .02;
        sy = 1 + br; sx = 1 - br * .6;
        if (mode !== 'raft') { aLx = aRx = -.25; aLz = .35; aRz = -.35; }
        if (ar > .05) { // running round the rim (sideways shuffle)
          const ph = t * 14;
          hy += Math.abs(Math.sin(ph)) * .09 * ar; hrz = Math.sin(ph) * .08 * ar; lL = Math.sin(ph) * .7 * ar; lR = -lL;
          hry = -run * .5;
        }
        if (puffT > 0) { // straining: crouch, wobble, lean in
          const w = Math.sin(t * 38) * .06 * puffT;
          sy -= .1 * puffT - w; sx += .07 * puffT + w * .5; hrx += .28 * puffT; headX = -.15 * puffT;
        }
        if (st.big > 0) { sy -= st.big * .35; sx += st.big * .25; hrx += st.big * .4; }
        if (emoteId) {
          const k = Math.min(1, emoteT * 5) * Math.min(1, (2.6 - emoteT) * 4);
          if (emoteId === 'wave') { aRx = -2.9 * k + aRx * (1 - k); aRz = (-.4 + Math.sin(t * 12) * .45) * k; headZ = .15 * k; }
          if (emoteId === 'laugh') { hrx = -.25 * k; headX = -.4 * k; sy += Math.sin(t * 30) * .05 * k; hrz = Math.sin(t * 15) * .06 * k; }
          if (emoteId === 'dance') { hrz = Math.sin(t * 8) * .3 * k; hy += Math.abs(Math.sin(t * 8)) * .15 * k; aLx = -2.6 * k * (.5 + .5 * Math.sin(t * 8)); aRx = -2.6 * k * (.5 - .5 * Math.sin(t * 8)); hry = Math.sin(t * 4) * .5 * k; }
          if (emoteId === 'cheer') { aLx = aRx = -2.9 * k; aLz = .5 * k; aRz = -.5 * k; hy += Math.abs(Math.sin(t * 9)) * .25 * k; }
          if (emoteId === 'angry') { hrx = .2 * k; sy += Math.sin(t * 40) * .03 * k; aLz = 1.2 * k; aRz = -1.2 * k; aLx = aRx = -.6 * k; headX = .2 * k; }
          if (emoteId === 'love') { aLx = aRx = -1.9 * k; aLz = -.3 * k; aRz = .3 * k; headZ = Math.sin(t * 3) * .2 * k; hry = Math.sin(t * 3) * .2 * k; }
        }
      } else if (mode === 'air') { // jumping: arms up, knees tucked
        aLx = -2.5; aRx = -2.5; aLz = .7; aRz = -.7; lL = .9; lR = .5; hrx = -.1; headX = -.15;
        if (st.big > 0) { sy -= st.big * .25; sx += st.big * .2; }
      } else if (mode === 'stun') { // knocked: wobbling and dizzy
        hrz = Math.sin(t * 14) * .35; hrx = .25; headZ = Math.sin(t * 9) * .4; aLx = -1.8; aRx = -.4; aLz = 1.1; aRz = -1.1; lL = Math.sin(t * 16) * .6; lR = -lL;
      } else if (mode === 'fly') {
        aLx = -2.8 + Math.sin(t * 25) * .5; aRx = -2.8 - Math.sin(t * 25) * .5; aLz = 1; aRz = -1; lL = Math.sin(t * 20); lR = -lL; headX = -.3;
      } else if (mode === 'swim') {
        hrx = .9; hy = .05; aLx = -2.2 + Math.sin(t * 7) * 1.2; aRx = -2.2 - Math.sin(t * 7) * 1.2; aLz = .8; aRz = -.8; lL = Math.sin(t * 9) * .5; lR = -lL; headX = -.8;
      }
      hips.position.y = hy; hips.rotation.set(hrx, hry, hrz); hips.scale.set(sx, sy, sx);
      head.rotation.set(headX, 0, headZ);
      armL.rotation.set(aLx, 0, aLz); armR.rotation.set(aRx, 0, aRz);
      legL.rotation.x = lL; legR.rotation.x = lR;
      if (prop) prop.rotation.y += dt * (12 + ar * 20);
    },
    dispose() { root.removeFromParent(); },
  };
  api.update(0);
  return api;
}
export function clearCharacterCache() { geoCache.forEach(g => g.dispose()); geoCache = new Map(); }
