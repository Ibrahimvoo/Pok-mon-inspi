// Épreuve « La Patinoire Folle »: survival on a sheet of ice — bumpers slide across, a bar sweeps
// faster and faster, and the corners melt away. Whoever stays on the ice longest wins.
import { GLACIER } from './glacier.js';

const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([sx, sz], k) => ({
  type: 'box', p: [sx * 9, 1, sz * 9], s: [6, 2, 6], ice: true, c: '#c4ecfb',
  // each corner shakes for 3 s, melts, and freezes again half a minute later
  sink: { start: 22 + k * 8, period: 40, on: .08 } }));
export const PATINOIRE = {
  id: 'patinoire', name: 'La Patinoire Folle', short: 'Patinoire', kind: 'survival', players: '1-4', foot: true,
  blurb: 'Une patinoire glissante, des bumpers qui foncent et des coins qui fondent : tenez le plus longtemps possible !',
  par: [100, 70, 35],
  spawn: [[3, 2, -3, 0], [3, 2, 3, Math.PI], [-3, 2, 3, Math.PI], [-3, 2, -3, 0]],
  accel: .004,
  maxTime: 150,
  parts: [
    { type: 'box', p: [0, 1, 0], s: [12, 2, 24], ice: true, c: '#9fdcf5' },
    { type: 'box', p: [0, 1.005, 0], s: [24, 2, 12], ice: true, c: '#9fdcf5' },
    ...corners,
    { type: 'bumper', p: [-10, 2, 0], r: 1.2, h: 2.2, move: [20, 0, 0], period: 7, c: '#ff9f43' },
    { type: 'bumper', p: [0, 2, -10], r: 1.2, h: 2.2, move: [0, 0, 20], period: 8, phase: .5, c: '#ff9f43' },
    { type: 'sweeper', p: [0, 2.6, 0], len: 12, r: .45, speed: .7, half: true, arms: 2, start: 12, c: '#b58cf0' },
  ],
  checkpoints: [],
  theme: GLACIER.theme,
};
