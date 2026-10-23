// Games that really run inside the console (the rest of the catalogue uses the simulated session).
import * as pouf from './pouf/console.js';
import { mimicScreen, closeMimic, MIMIC_ID } from '../mimic/index.js';
import { unoScreen, closeUno, UNO_ID } from '../uno/index.js';

const PLAYABLE = { [pouf.GAME_ID]: pouf, [MIMIC_ID]: { screen: mimicScreen, end: closeMimic }, [UNO_ID]: { screen: unoScreen, end: closeUno } };
export const playable = id => PLAYABLE[id] || null;
