// Every playable course, in unlock order.
import { LAGON } from './lagon.js';

export const COURSES = [LAGON];
export const courseById = Object.fromEntries(COURSES.map(c => [c.id, c]));
