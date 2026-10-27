// Épreuve « Le Grand Tourbillon »: survival on a round arena — sweeping bars that speed up and floor
// tiles that sink one after another. The last critter standing wins.
import { LAGON } from './lagon.js';

const tiles = [];
for (let k = 0; k < 12; k++) {
  const a = k / 12 * Math.PI * 2, r = 10;
  tiles.push({ type: 'box', p: [Math.cos(a) * r, 1, Math.sin(a) * r], s: [5.4, 2, 4.4], yaw: -a + Math.PI / 2, c: k % 2 ? '#ffd23f' : '#ff9f43',
    sink: { start: 15, period: 14, phase: k * 5 / 12 % 1, on: .62 } });
}
export const TOURBILLON = {
  id: 'tourbillon', name: 'Le Grand Tourbillon', short: 'Tourbillon', kind: 'survival', players: '1-4', foot: true,
  blurb: 'Restez sur l’arène le plus longtemps possible : les barres accélèrent et le sol s’enfonce. Le dernier debout gagne !',
  par: [90, 60, 30],   // seconds survived for 3, 2 and 1 star(s)
  // between the arms of the sweeper's starting position
  spawn: [[2.5, 2, -2.5, 0], [2.5, 2, 2.5, Math.PI], [-2.5, 2, 2.5, Math.PI], [-2.5, 2, -2.5, 0]],
  accel: .006,
  maxTime: 150,
  parts: [
    { type: 'disc', p: [0, 1, 0], r: 7.4, h: 2, c: '#4fd1c5' },
    ...tiles,
    { type: 'sweeper', p: [0, 2.6, 0], len: 12.6, r: .45, speed: .85, phase: 0, c: '#b58cf0' },
    { type: 'sweeper', p: [0, 3.35, 0], len: 12.6, r: .45, speed: -.55, half: true, arms: 1, start: 30, c: '#ff5d8f' },
  ],
  checkpoints: [],
  theme: LAGON.theme,
};
