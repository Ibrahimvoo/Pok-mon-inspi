// Épreuve 3 — « Le Marais au Crépuscule »: crocodiles, whirlpools, toxic mines and gnarled trees at sunset.
export const MARAIS = {
  id: 'marais', name: 'Le Marais au Crépuscule', short: 'Marais', kind: 'coop', players: '1-4',
  blurb: 'Au coucher du soleil, les crocodiles claquent des dents entre les tourbillons et les mines toxiques.',
  par: [140, 200, 300],
  segs: [
    { len: 30, w: 12, flow: .6, L: 'beach', R: 'beach', h: 3 },          // 0 lagoon
    { len: 14, w: 6.2, flow: 2.2, L: 'canyon', R: 'beach', h: 6 },       // 1
    { len: 36, turn: 30, flow: 2.4 },                                     // 2 crocodiles
    { len: 30, turn: -20, w: 7 },                                         // 3 whirlpool
    { len: 30, turn: -25 },                                               // 4 logs
    { len: 20, w: 6.5 },                                                  // 5 checkpoint 1
    { len: 46, w: 8, turn: 15, flow: 2.2, L: 'mesa', R: 'beach' },        // 6 toxic mine field
    { len: 30, turn: -30, w: 6.5, L: 'canyon' },                          // 7 crocodile row
    { len: 20, w: 7 },                                                    // 8 checkpoint 2
    { len: 40, dy: -7, w: 5.6, flow: 4.6, L: 'canyon', R: 'canyon', h: 9 }, // 9 slide
    { len: 34, turn: 40, w: 7, flow: 2.6, L: 'mesa', R: 'canyon' },       // 10 mills + whirl
    { len: 30, turn: -40 },                                               // 11 jaws
    { len: 18, w: 6.5 },                                                  // 12 checkpoint 3
    { len: 46, w: 7.5, turn: 10, flow: 2.6, L: 'beach', R: 'mesa' },      // 13 crocs + saws
    { len: 40, turn: -25, w: 6, L: 'canyon', R: 'canyon', h: 8 },         // 14 hammers
    { len: 18, w: 6.5 },                                                  // 15 checkpoint 4
    { len: 36, turn: 20, dy: -3, flow: 3.4, L: 'beach', R: 'beach' },     // 16 the gauntlet
    { len: 28, w: 12, flow: .8, h: 3 },                                   // 17 finish
  ],
  spawn: [0, .38], start: [1, .7],
  checkpoints: [[5, .5], [8, .5], [12, .5], [15, .5]],
  finish: [17, .5],
  hazards: [
    { type: 'rock', at: [0, .25], d: -8.5, r: 1.6 }, { type: 'rock', at: [0, .75], d: 8, r: 1.4 },
    { type: 'croc', at: [2, .25], d: 2.6, period: 3.4, r: 1.2 }, { type: 'croc', at: [2, .55], d: -2.6, period: 3.4, phase: .5, r: 1.2 },
    { type: 'croc', at: [2, .85], d: 2.2, period: 3, phase: .2, r: 1.2 },
    { type: 'whirl', at: [3, .5], d: 0, r: 4.6, dir: -1, strength: 3.4 }, { type: 'spikes', at: [3, .1], to: [3, .9], side: 1 },
    { type: 'log', at: [4, .3], d: 0, amp: 3, period: 5, len: 4.5 }, { type: 'log', at: [4, .75], d: 0, amp: 3, period: 4.2, phase: .5, len: 4 },
    { type: 'mine', at: [6, .2], d: 0, amp: 4, period: 6, r: .75 }, { type: 'mine', at: [6, .45], d: -1.5, amp: 3.2, period: 5, phase: .3, r: .75 },
    { type: 'mine', at: [6, .7], d: 1.5, amp: 3.5, period: 5.5, phase: .6, r: .75 }, { type: 'mine', at: [6, .92], d: 0, amp: 3.5, period: 4.6, phase: .15, r: .75 },
    { type: 'croc', at: [7, .2], d: -2.8, period: 3.8, r: 1.1 }, { type: 'croc', at: [7, .5], d: 2.8, period: 3.8, phase: .33, r: 1.1 },
    { type: 'croc', at: [7, .8], d: -2.6, period: 3.8, phase: .66, r: 1.1 }, { type: 'spikes', at: [7, .05], to: [7, .95], side: 1 },
    { type: 'boost', at: [9, .02], d: 0, len: 8, w: 3, power: 3 },
    { type: 'spikes', at: [9, .15], to: [9, .9], side: -1, inset: .6 }, { type: 'spikes', at: [9, .2], to: [9, .95], side: 1, inset: .6 },
    { type: 'mill', at: [10, .3], side: 1, speed: .9 }, { type: 'whirl', at: [10, .6], d: 1, r: 4, dir: 1, strength: 3 },
    { type: 'mill', at: [10, .85], side: -1, speed: -.85, phase: .25 },
    { type: 'jaws', at: [11, .35], period: 4.2 }, { type: 'jaws', at: [11, .8], period: 4.2, phase: .45 },
    { type: 'croc', at: [13, .2], d: 0, amp: 3, period: 4, r: 1.2 }, { type: 'saw', at: [13, .45], d: 0, amp: 4.3, period: 4.6, r: 1.3 },
    { type: 'croc', at: [13, .7], d: 0, amp: 3.2, period: 3.6, phase: .5, r: 1.2 }, { type: 'saw', at: [13, .92], d: 0, amp: 4, period: 3.8, phase: .3, r: 1.3 },
    { type: 'spikes', at: [14, .05], to: [14, .95], side: 1 }, { type: 'bar', at: [14, .3], period: 3.4 }, { type: 'bar', at: [14, .7], period: 3, phase: .5 },
    { type: 'mine', at: [16, .2], d: 0, amp: 3.5, period: 3.6, r: .8 }, { type: 'croc', at: [16, .45], d: -2.4, period: 2.8, r: 1.2 },
    { type: 'jaws', at: [16, .7], period: 4 }, { type: 'mill', at: [16, .9], side: 1, speed: 1 },
  ],
  theme: {
    sky: ['#f08a6e', '#ffe2b8'], fog: '#ffd2a8', fogNear: 60, fogFar: 240,
    water: '#3a9c8a', waterEdge: '#7ccaa6', foam: '#eafff4',
    wall: '#8a6a4a', ledge: '#b0915f', rail: '#7a9e3a', railRing: '#557a24',
    cliff: ['#916f92', '#7b5d80', '#a483a3', '#6d5370'], top: '#6f9a4f', sand: '#c9a874', grass: '#7fae4a',
    leaf: ['#4f8a3a', '#6aa548', '#3f7530'], trunk: '#5a3f2e', rock: '#6f6a7a', far: '#b98aa8', farTop: '#6f9a4f',
    trap: '#e08a2a', trapHi: '#f2b35a', spike: '#fff3d6', mine: '#8a4fd0', tower: '#c98a5a', bush: '#5f9a3e', mush: '#c0479a', croc: '#5e9e3e',
    cloud: '#ffd9c2',
    flora: { tree0: 8, tree1: 9, palm: 8, bamboo: 3, reeds: 4, grass: 5, bush: 9 },
    light: { sky: '#ffe4c8', ground: '#9a7a9a', sun: '#ffc48a', hemiI: 1.35, sunI: 1.7 },
  },
};
