// Épreuve « Le Parcours Pétillant »: an obstacle race on candy platforms above the lagoon.
// Parts: box (p centre, s size, yaw, move/period/phase, spin, bounce, conveyor), disc (r, h, spin),
// sweeper (rotating bar), hammer (pendulum), bumper; zones: checkpoints and finish. The top of the water is y = 0.
import { LAGON } from './lagon.js';

const PINK = '#ff8fb1', YELLOW = '#ffd23f', TEAL = '#4fd1c5', ORANGE = '#ff9f43', LILAC = '#b58cf0', CREAM = '#fff1d6';
export const PARCOURS = {
  id: 'parcours', name: 'Le Parcours Pétillant', short: 'Parcours', kind: 'race', players: '1-4', foot: true,
  blurb: 'Une course d’obstacles au-dessus du lagon : barres tournantes, plateformes mobiles, marteaux et bumpers. Le premier arrivé gagne !',
  par: [45, 70, 120],
  spawn: [[-4.5, 2, 3, 0], [-1.5, 2, 3, 0], [1.5, 2, 3, 0], [4.5, 2, 3, 0]],
  finishZ: 150,
  parts: [
    // start
    { type: 'box', p: [0, 1, 4], s: [16, 2, 10], c: CREAM },
    { type: 'box', p: [0, 1, 13], s: [10, 2, 8], c: PINK },
    // 1. jump over the sweeping bar
    { type: 'disc', p: [0, 1, 25], r: 9, h: 2, c: YELLOW },
    { type: 'sweeper', p: [0, 2.6, 25], len: 8.6, r: .45, speed: 1.35, c: LILAC },
    { type: 'box', p: [0, 1, 37], s: [6, 2, 6], c: PINK },
    // 2. moving platforms over the water
    { type: 'box', p: [-5, 1.5, 44], s: [5, 1, 5], move: [10, 0, 0], period: 4, c: TEAL },
    { type: 'box', p: [5, 1.5, 51], s: [5, 1, 5], move: [-10, 0, 0], period: 4.4, phase: .3, c: ORANGE },
    { type: 'box', p: [0, .2, 58], s: [5, 1, 5], move: [0, 2.6, 0], period: 3.2, c: TEAL },
    { type: 'box', p: [0, 1, 66], s: [10, 2, 6], c: CREAM },
    // 3. hammer bridge
    { type: 'box', p: [0, 1, 79], s: [3.4, 2, 20], c: YELLOW },
    { type: 'gantry', p: [0, 9, 79], len: 18, w: 6 },
    { type: 'hammer', p: [0, 9, 73], len: 5.8, r: 1, period: 2.6, c: PINK },
    { type: 'hammer', p: [0, 9, 79], len: 5.8, r: 1, period: 2.6, phase: .33, c: PINK },
    { type: 'hammer', p: [0, 9, 85], len: 5.8, r: 1, period: 2.6, phase: .66, c: PINK },
    // 4. bumper field
    { type: 'box', p: [0, 1, 99], s: [16, 2, 18], c: CREAM },
    { type: 'bumper', p: [-4, 2, 94], r: 1, h: 2.2, c: ORANGE }, { type: 'bumper', p: [3, 2, 96], r: 1, h: 2.2, c: ORANGE },
    { type: 'bumper', p: [-1, 2, 100], r: 1.2, h: 2.2, c: ORANGE }, { type: 'bumper', p: [5, 2, 102], r: 1, h: 2.2, c: ORANGE },
    { type: 'bumper', p: [-5, 2, 104], r: 1, h: 2.2, c: ORANGE }, { type: 'bumper', p: [1.5, 2, 105], r: .9, h: 2.2, c: ORANGE },
    { type: 'sweeper', p: [0, 2.6, 99], len: 7.5, r: .4, speed: -1, half: true, arms: 2, c: LILAC },
    // 5. spinning stepping stones
    { type: 'disc', p: [0, 1.2, 114], r: 4, h: 2, spin: .8, c: TEAL },
    { type: 'disc', p: [4, 1.6, 123], r: 3.4, h: 2, spin: -1, c: LILAC },
    { type: 'disc', p: [-2, 2, 132], r: 3.4, h: 2, spin: 1.2, c: TEAL },
    // 6. spring pad up to the finish
    { type: 'box', p: [0, 1.6, 139.5], s: [5, 1.2, 4], bounce: 15, c: YELLOW },
    { type: 'box', p: [0, 3, 149], s: [14, 2, 12], c: CREAM },
  ],
  checkpoints: [
    { p: [0, 2, 37], s: [6, 4, 6] }, { p: [0, 2, 66], s: [10, 4, 6] }, { p: [0, 2, 92], s: [16, 4, 4] }, { p: [0, 4, 145], s: [14, 4, 4] },
  ],
  finish: { p: [0, 4, 151], s: [14, 4, 4] },
  theme: LAGON.theme,
};
