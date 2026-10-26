// The dropship where players wait before a game (traced from the reference image, 46 px = 1 crewmate).
const R = (x0, y0, x1, y1) => ({ r: [x0, y0, x1, y1] });
export default {
  id: 'lobby', name: 'Vaisseau', scale: 46, bounds: [250, 40, 920, 700],
  rooms: [{ id: 'lobby', name: 'Vaisseau', label: [588, 600], floor: 'lobby' }],
  ops: [
    ['add', { p: [[332, 302], [505, 302], [505, 285], [645, 285], [645, 302], [843, 302], [843, 600], [822, 622], [352, 622], [332, 600]] }, { room: 'lobby' }],
    ['sub', R(332, 295, 488, 312), { see: true }], ['sub', R(688, 295, 843, 312), { see: true }],
    ['sub', R(447, 320, 505, 384), { see: true }], ['sub', R(652, 334, 710, 376), { see: true }],
    ['sub', R(392, 448, 486, 548), { see: true }], ['sub', R(702, 394, 796, 488), { see: true }],
  ],
  consoles: { laptop: { x: 476, y: 392 }, chest: { x: 681, y: 384 } },
  spawn: [575, 430],
  meeting: { x: 588, y: 470, r: 80 },
  props: [
    { t: 'laptopCrate', r: [447, 320, 505, 384] }, { t: 'hatChest', r: [652, 334, 710, 376] },
    { t: 'crate', r: [392, 448, 486, 548] }, { t: 'crate', r: [702, 394, 796, 488] },
  ],
};
