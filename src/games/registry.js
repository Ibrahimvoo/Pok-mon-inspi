// Games that really run inside the console (the rest of the catalogue uses the simulated session).
import * as pouf from './pouf/console.js';
import { mimicScreen, closeMimic, MIMIC_ID } from '../mimic/index.js';

const PLAYABLE = { [pouf.GAME_ID]: pouf, [MIMIC_ID]: { screen: mimicScreen, end: closeMimic } };
export const playable = id => PLAYABLE[id] || null;
