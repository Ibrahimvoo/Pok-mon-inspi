// Diagnostic journal of the damage taken in Pouf Party: which entity, why, where, when and from which event.
// Shown in Options › Journal des dégâts (readable on a phone), printed in the console with ?pfdebug and exposed as
// window.__poufDamage for the automated checks. Pure module: the simulations only add fields to their events.
const LIMIT = 60;
export const damageLog = [];
const NAMES = {
  spikes: 'Rondin à piques', rock: 'Rocher', post: 'Poteau', mine: 'Mine', saw: 'Scie', croc: 'Crocodile', turnstile: 'Tourniquet à piques',
  log: 'Tronc', jaws: 'Mâchoires', crush: 'Mâchoires (écrasement)', bar: 'Barre-marteau', mill: 'Moulin', reset: 'Retour au checkpoint demandé',
  sweeper: 'Barre tournante', hammer: 'Marteau', bumper: 'Bumper',
};
export const hazardName = type => NAMES[type] || type || 'inconnu';
const debug = typeof location !== 'undefined' && /[?&]pfdebug/.test(location.search);
if (debug && typeof window !== 'undefined') window.__poufDamage = damageLog;

// entry: { event: 'hit' | 'pop' | 'knock', cause, id (index of the trap in the course), course, t (match time), pos, air, from }
export function logDamage(entry) {
  const e = { wall: Date.now(), ...entry, entity: `${hazardName(entry.cause)}${entry.id >= 0 ? ` n°${entry.id + 1}` : ''}` };
  damageLog.unshift(e);
  damageLog.length = Math.min(damageLog.length, LIMIT);
  if (debug) console.info('[Pouf Party] dégât', JSON.stringify(e));
  return e;
}
