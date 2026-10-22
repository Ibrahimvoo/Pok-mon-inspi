// Control-flow signals shared by the game shell, the mini-games and the online mode.
export const CANCEL = Symbol('cancel');    // the flow was replaced (menu, quit…)
export const RESTART = Symbol('restart');  // the current turn starts over (pause, retry)
export const SKIP = Symbol('skip');        // the player gives up this turn
export const ID = 'mimic-party';
