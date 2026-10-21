// Épreuve « La Grande Glissade »: an obstacle race on the glacier — slippery ice, a spinning cross,
// a treadmill against the runners, lifts and hammers swinging along the path.
import { GLACIER } from './glacier.js';

const SNOW = '#eef8ff', ICE = '#9fdcf5', BLUE = '#4a86d8', PINK = '#ff8fb1', LILAC = '#b58cf0', YELLOW = '#ffd23f';
export const GLISSADE = {
  id: 'glissade', name: 'La Grande Glissade', short: 'Glissade', kind: 'race', players: '1-4', foot: true,
  blurb: 'Course sur la glace : ça glisse, ça tourne, ça repousse. Gardez l’équilibre jusqu’à l’arrivée !',
  par: [50, 80, 130],
  spawn: [[-4.5, 2, 3, 0], [-1.5, 2, 3, 0], [1.5, 2, 3, 0], [4.5, 2, 3, 0]],
  finishZ: 154,
  parts: [
    { type: 'box', p: [0, 1, 4], s: [16, 2, 10], c: SNOW },
    { type: 'box', p: [0, 1, 15], s: [9, 2, 12], ice: true, c: ICE },
    // 1. the spinning cross
    { type: 'box', p: [0, 1, 28], s: [14, 2, 3], spin: .6, c: BLUE },
    { type: 'box', p: [0, 1.01, 28], s: [3, 2, 14], spin: .6, c: BLUE },
    { type: 'box', p: [0, 1, 40], s: [8, 2, 6], c: SNOW },
    // 2. treadmill against the runners, hammers swinging along the path
    { type: 'box', p: [0, 1, 52], s: [6, 2, 14], conveyor: [0, -3], c: LILAC },
    { type: 'gantry', p: [0, 9, 52], len: 24, w: 4.5 },
    { type: 'hammer', p: [0, 9, 48.5], len: 5.8, r: .9, period: 2.8, axis: 'x', c: PINK },
    { type: 'hammer', p: [0, 9, 55.5], len: 5.8, r: .9, period: 2.8, phase: .5, axis: 'x', c: PINK },
    // 3. lifts over the water
    { type: 'disc', p: [0, .4, 65], r: 3, h: 2, move: [0, 1.6, 0], period: 3, c: ICE },
    { type: 'disc', p: [-2, .4, 72], r: 3, h: 2, move: [0, 1.6, 0], period: 3, phase: .33, c: ICE },
    { type: 'disc', p: [1, .4, 79], r: 3, h: 2, move: [0, 1.6, 0], period: 3, phase: .66, c: ICE },
    { type: 'box', p: [0, 1, 89], s: [10, 2, 6], c: SNOW },
    // 4. narrow ice bridge with two sweeping bars
    { type: 'box', p: [0, 1, 104], s: [4.5, 2, 24], ice: true, c: ICE },
    { type: 'sweeper', p: [0, 2.6, 99], len: 3.4, r: .4, speed: 2, c: YELLOW },
    { type: 'sweeper', p: [0, 2.6, 109], len: 3.4, r: .4, speed: -2.2, phase: .25, c: YELLOW },
    { type: 'box', p: [0, 1, 120], s: [10, 2, 6], c: SNOW },
    // 5. sliding platforms, then the finish
    { type: 'box', p: [-5, 1.5, 128], s: [5, 1, 5], move: [10, 0, 0], period: 3.6, c: BLUE },
    { type: 'box', p: [5, 1.5, 135], s: [5, 1, 5], move: [-10, 0, 0], period: 4, phase: .4, c: BLUE },
    { type: 'box', p: [0, 1, 148], s: [14, 2, 14], c: SNOW },
  ],
  checkpoints: [{ p: [0, 2, 40], s: [8, 4, 6] }, { p: [0, 2, 89], s: [10, 4, 6] }, { p: [0, 2, 120], s: [10, 4, 6] }],
  finish: { p: [0, 2, 152], s: [14, 4, 4] },
  theme: GLACIER.theme,
};
