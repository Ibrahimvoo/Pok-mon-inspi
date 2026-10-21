// Games that really run inside the console (the rest of the catalogue uses the simulated session).
import * as pouf from './pouf/console.js';

const PLAYABLE = { [pouf.GAME_ID]: pouf };
export const playable = id => PLAYABLE[id] || null;
