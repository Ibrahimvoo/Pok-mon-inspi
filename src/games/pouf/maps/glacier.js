// Épreuve 2 — « Les Rapides du Glacier »: icebergs, geysers, drifting trunks and a giant ice slide.
// Positions may be given as [segment, fraction] and are resolved to metres by maps/index.js.
export const GLACIER = {
  id: 'glacier', name: 'Les Rapides du Glacier', short: 'Glacier', kind: 'coop', players: '1-4',
  blurb: 'Slalom entre les icebergs, geysers glacés, troncs à la dérive et un toboggan de glace vertigineux.',
  par: [130, 185, 280],
  segs: [
    { len: 32, w: 12, flow: .6, L: 'beach', R: 'beach', h: 3 },          // 0 frozen lake
    { len: 14, w: 6, flow: 2.4, L: 'canyon', R: 'canyon', h: 7 },        // 1
    { len: 32, turn: -25, flow: 2.8 },                                    // 2 iceberg slalom
    { len: 30, turn: 35 },                                                // 3
    { len: 26, w: 7.5, flow: 2.4, L: 'mesa' },                            // 4 geysers
    { len: 30, turn: -15 },                                               // 5
    { len: 22, w: 6.5 },                                                  // 6 checkpoint 1
    { len: 40, w: 6.2, turn: 22, flow: 3, R: 'mesa' },                    // 7 drifting trunks
    { len: 30, turn: -30 },                                               // 8
    { len: 52, dy: -12, w: 5.6, flow: 5.6, L: 'canyon', R: 'canyon', h: 11 }, // 9 ice slide
    { len: 22, w: 10, flow: 1.4 },                                        // 10 pool, checkpoint 2
    { len: 40, turn: 30, w: 6.5, flow: 2.8, L: 'mesa', R: 'canyon', h: 8 }, // 11 mills
    { len: 40, turn: -35, w: 6 },                                         // 12 jaws
    { len: 18, w: 7 },                                                    // 13 checkpoint 3
    { len: 50, w: 8, turn: 10, flow: 2.4, L: 'mesa', R: 'mesa' },         // 14 geysers + snow mines
    { len: 40, turn: -25, w: 6, L: 'canyon', R: 'canyon', h: 8 },         // 15 hammers
    { len: 18, w: 6.5 },                                                  // 16 checkpoint 4
    { len: 40, turn: 20, dy: -4, flow: 3.6 },                             // 17 trunks + saws
    { len: 28, w: 12, flow: .8, L: 'beach', R: 'beach', h: 3 },           // 18 finish lake
  ],
  spawn: [0, .38], start: [1, .7],
  checkpoints: [[6, .5], [10, .6], [13, .5], [16, .5]],
  finish: [18, .5],
  hazards: [
    { type: 'rock', at: [0, .2], d: -8, r: 1.8 }, { type: 'rock', at: [0, .7], d: 8, r: 1.5 },
    // icebergs near the banks: the raft weaves between them without getting pinned
    { type: 'rock', at: [2, .25], d: 3.7, r: 1.2 }, { type: 'rock', at: [2, .55], d: -3.7, r: 1.2 }, { type: 'rock', at: [2, .85], d: 3.6, r: 1.1 },
    { type: 'rock', at: [3, .35], d: -3.6, r: 1.1 }, { type: 'spikes', at: [3, .55], to: [3, .95], side: 1 },
    { type: 'geyser', at: [4, .3], d: -2, r: 1.8, period: 4.2 }, { type: 'geyser', at: [4, .75], d: 2.4, r: 1.8, period: 4.2, phase: .5 },
    { type: 'geyser', at: [5, .35], d: 0, r: 2, period: 3.6, phase: .25 }, { type: 'mine', at: [5, .6], d: 0, amp: 3.5, period: 4.5, r: .8 },
    { type: 'geyser', at: [5, .85], d: -2.5, r: 1.6, period: 3.8, phase: .7 },
    { type: 'log', at: [7, .3], d: 0, amp: 3.6, period: 6, len: 4.5 }, { type: 'log', at: [7, .7], d: 0, amp: 3.6, period: 5, phase: .5, len: 4 },
    { type: 'spikes', at: [8, .1], to: [8, .9], side: -1 }, { type: 'log', at: [8, .4], d: 1, amp: 2.5, period: 4, phase: .2, len: 4 },
    { type: 'mine', at: [8, .8], d: 0, amp: 3.5, period: 3.8, phase: .4, r: .8 },
    { type: 'boost', at: [9, .02], d: 0, len: 8, w: 3, power: 3 },
    { type: 'spikes', at: [9, .15], to: [9, .9], side: 1, inset: .6 }, { type: 'spikes', at: [9, .25], to: [9, .95], side: -1, inset: .6 },
    { type: 'mill', at: [11, .35], side: -1, speed: .85 }, { type: 'spikes', at: [11, .55], to: [11, .95], side: 1 },
    { type: 'mill', at: [11, .85], side: 1, speed: -.9, phase: .3 },
    { type: 'jaws', at: [12, .3], period: 4.4 }, { type: 'jaws', at: [12, .75], period: 4.4, phase: .5 },
    { type: 'geyser', at: [14, .2], d: 2.5, r: 1.8, period: 4, phase: .1 }, { type: 'mine', at: [14, .4], d: 0, amp: 4, period: 5, r: .8 },
    { type: 'geyser', at: [14, .6], d: -2.5, r: 1.8, period: 4, phase: .6 }, { type: 'mine', at: [14, .8], d: 1, amp: 4.5, period: 4, phase: .3, r: .8 },
    { type: 'spikes', at: [15, .05], to: [15, .95], side: -1 }, { type: 'bar', at: [15, .3], period: 3.6 }, { type: 'bar', at: [15, .7], period: 3.2, phase: .4 },
    { type: 'log', at: [17, .25], d: 0, amp: 3, period: 4.5, len: 4 }, { type: 'saw', at: [17, .55], d: 0, amp: 4, period: 4.4, r: 1.3 },
    { type: 'saw', at: [17, .85], d: 0, amp: 4, period: 3.8, phase: .5, r: 1.3 },
  ],
  theme: {
    sky: ['#8fcdf5', '#f2fbff'], fog: '#e3f3ff', fogNear: 70, fogFar: 260,
    water: '#2f9fd4', waterEdge: '#86d9f7', foam: '#ffffff',
    wall: '#7fb6d8', ledge: '#e3f4ff', rail: '#94d8f2', railRing: '#5aaed6',
    cliff: ['#eef8ff', '#d4ebf8', '#f8fcff', '#bcdcef'], top: '#ffffff', sand: '#eef8ff', grass: '#d9f1ff',
    leaf: ['#2f7d5a', '#3b9168', '#286b4c'], trunk: '#7a5236', rock: '#a7bed3', far: '#d6ebfa', farTop: '#ffffff', snowRocks: true,
    trap: '#3b78c9', trapHi: '#79abea', spike: '#f4fbff', mine: '#4a86d8', tower: '#b9e3f7', bush: '#bdeeff',
    flora: { tree0: 7, tree1: 7, palm: 7, bamboo: 10, reeds: null, grass: 10, bush: 10 },
    light: { sky: '#eef8ff', ground: '#cfe3f2', sun: '#ffffff', hemiI: 1.5, sunI: 1.45 },
  },
};
