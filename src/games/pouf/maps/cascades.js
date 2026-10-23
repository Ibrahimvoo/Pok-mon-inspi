// Épreuve « Les Cascades Turquoise »: a jungle river falling down three waterfalls, with spiked
// turnstiles spinning on the water, crocodiles and a whirlpool in the pools between the falls.
export const CASCADES = {
  id: 'cascades', name: 'Les Cascades Turquoise', short: 'Cascades', kind: 'coop', players: '1-4',
  blurb: 'Trois cascades vertigineuses dans la jungle, des tourniquets à piques et des crocodiles dans les bassins.',
  par: [150, 210, 310],
  segs: [
    { len: 30, w: 12, flow: .6, L: 'beach', R: 'beach', h: 3 },          // 0 lagoon
    { len: 14, w: 6, flow: 2.4, L: 'canyon', R: 'canyon', h: 7 },        // 1 start
    { len: 30, turn: 20, w: 8, flow: 2.8 },                               // 2 first turnstile
    { len: 16, dy: -5, flow: 5, w: 5.8 },                                 // 3 cascade 1
    { len: 26, w: 8.5, flow: 1.6, turn: -20 },                            // 4 pool
    { len: 20, w: 6.5 },                                                  // 5 checkpoint 1
    { len: 40, turn: 30, w: 8, flow: 2.8, L: 'mesa' },                    // 6 turnstiles
    { len: 16, dy: -6, flow: 5.5, w: 5.6, L: 'canyon', h: 9 },            // 7 cascade 2
    { len: 26, w: 9, flow: 1.6 },                                         // 8 pool with mines
    { len: 20, w: 6.5, turn: -20 },                                       // 9 checkpoint 2
    { len: 40, turn: -25, w: 6.5, flow: 2.8 },                            // 10 mill + jaws
    { len: 30, turn: 30, R: 'mesa' },                                     // 11 crocodiles and trunks
    { len: 18, dy: -7, flow: 6, w: 5.6, R: 'canyon', h: 10 },             // 12 cascade 3
    { len: 24, w: 9, flow: 1.6 },                                         // 13 pool, checkpoint 3
    { len: 40, turn: 20, w: 8, flow: 3, R: 'mesa' },                      // 14 turnstile
    { len: 30, turn: -30, w: 6.5 },                                       // 15 saws
    { len: 18, w: 6.5 },                                                  // 16 checkpoint 4
    { len: 30, turn: 10, dy: -3, w: 8, flow: 3.6, R: 'canyon' },          // 17 final gauntlet
    { len: 28, w: 12, flow: .8, L: 'beach', R: 'beach', h: 3 },           // 18 finish lagoon
  ],
  spawn: [0, .38], start: [1, .7],
  checkpoints: [[5, .3], [9, .5], [13, .75], [16, .5]],
  finish: [18, .5],
  hazards: [
    { type: 'rock', at: [0, .25], d: -8.5, r: 1.6 }, { type: 'rock', at: [0, .75], d: 8, r: 1.4 },
    { type: 'turnstile', at: [2, .5], d: 0, len: 2.8, speed: .9 },
    { type: 'spikes', at: [3, .1], to: [3, .9], side: 1, inset: .6 },
    { type: 'whirl', at: [4, .45], d: 1.5, r: 4.4, dir: -1, strength: 3 }, { type: 'rock', at: [4, .8], d: -4, r: 1.3 },
    { type: 'turnstile', at: [6, .45], d: 0, len: 2.8, speed: -1, phase: .25 }, { type: 'spikes', at: [6, .58], to: [6, .7], side: -1 },
    { type: 'turnstile', at: [6, .85], d: 0, len: 2.8, speed: 1.1 },
    { type: 'spikes', at: [7, .1], to: [7, .9], side: 1, inset: .6 }, { type: 'spikes', at: [7, .2], to: [7, .95], side: -1, inset: .6 },
    { type: 'mine', at: [8, .35], d: 0, amp: 4.5, period: 5, r: .8 }, { type: 'mine', at: [8, .75], d: 1, amp: 4, period: 4.2, phase: .5, r: .8 },
    { type: 'mill', at: [10, .3], side: 1, speed: .9 }, { type: 'jaws', at: [10, .75], period: 4.4 },
    { type: 'croc', at: [11, .25], d: 2.6, period: 3.4, r: 1.15 }, { type: 'log', at: [11, .55], d: 0, amp: 3, period: 4.8, len: 4.2 },
    { type: 'croc', at: [11, .85], d: -2.6, period: 3.4, phase: .5, r: 1.15 },
    { type: 'boost', at: [12, .02], d: 0, len: 8, w: 3, power: 3 }, { type: 'spikes', at: [12, .15], to: [12, .9], side: -1, inset: .6 },
    { type: 'turnstile', at: [14, .4], d: 0, len: 2.8, speed: 1.2 },
    { type: 'spikes', at: [14, .5], to: [14, .95], side: 1 },
    { type: 'saw', at: [15, .3], d: 0, amp: 4, period: 4.8, r: 1.3 }, { type: 'saw', at: [15, .72], d: 0, amp: 4, period: 4.2, phase: .5, r: 1.3 },
    { type: 'turnstile', at: [17, .3], d: 0, len: 2.8, speed: -1.2 }, { type: 'mine', at: [17, .7], d: 0, amp: 3.4, period: 3.6, r: .8 },
  ],
  theme: {
    sky: ['#5ec4f0', '#e2f8ff'], fog: '#d6f2ff', fogNear: 70, fogFar: 260,
    water: '#1fb4c4', waterEdge: '#7fe6e8', foam: '#ffffff',
    wall: '#c98a4a', ledge: '#e2ab66', rail: '#86c540', railRing: '#5f9c2a',
    cliff: ['#7fae5a', '#6a9a4c', '#90c068', '#5d8a44'], top: '#7ab84c', sand: '#f0d49a', grass: '#86c540',
    leaf: ['#3f9a3a', '#5cb848', '#2f7f2f'], trunk: '#7a5236', rock: '#8a8f80', far: '#9ccf7a', farTop: '#5f9c3a',
    croc: '#4f8f36', bush: '#4f9a3a',
    flora: { tree0: 1, tree1: 0, palm: 2, bamboo: 3, reeds: 4, grass: 5, bush: 6 },
  },
};
