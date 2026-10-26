// Shared game rules: colours, cosmetics ids, lobby settings (with their limits), roles and presets.
// Everything a client sends is checked against these tables by the authority.
export const PROTOCOL = 1;
export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 15;
export const NAME_MAX = 12;

// main colours sampled from the reference screenshots (customisation grid and the red crewmate); shadows as in the game
export const COLORS = [
  { id: 'red', name: 'Rouge', body: '#d71e22', shade: '#7a0838' },
  { id: 'blue', name: 'Bleu', body: '#132ed1', shade: '#09158e' },
  { id: 'green', name: 'Vert', body: '#117f2d', shade: '#0a4d2e' },
  { id: 'pink', name: 'Rose', body: '#ed54ba', shade: '#ab2bad' },
  { id: 'orange', name: 'Orange', body: '#ef7d0d', shade: '#b33e15' },
  { id: 'yellow', name: 'Jaune', body: '#f5f557', shade: '#c38823' },
  { id: 'black', name: 'Noir', body: '#3f474e', shade: '#1e1f26' },
  { id: 'white', name: 'Blanc', body: '#d6e0f0', shade: '#8394bf' },
  { id: 'purple', name: 'Violet', body: '#6b2fbb', shade: '#3b177c' },
  { id: 'brown', name: 'Marron', body: '#71491e', shade: '#5e2615' },
  { id: 'cyan', name: 'Cyan', body: '#38fedc', shade: '#24a8be' },
  { id: 'lime', name: 'Citron vert', body: '#50ef39', shade: '#15a742' },
  { id: 'maroon', name: 'Bordeaux', body: '#5f1d2e', shade: '#411921' },
  { id: 'rose', name: 'Rose pâle', body: '#ecc0d3', shade: '#de92b3' },
  { id: 'banana', name: 'Banane', body: '#f0e7a8', shade: '#d2bc89' },
  { id: 'gray', name: 'Gris', body: '#758593', shade: '#46565f' },
  { id: 'tan', name: 'Beige', body: '#918877', shade: '#51413e' },
  { id: 'coral', name: 'Corail', body: '#d76464', shade: '#b4434a' },
];
export const COLOR_IDS = COLORS.map(c => c.id);

export const COSMETICS = {
  hat: ['none', 'astronaut', 'slime', 'cowboy', 'poop', 'tophat', 'flowerpot', 'goggles', 'hardhat', 'heart', 'military', 'police', 'paperhat', 'wizard', 'cap',
    'crown', 'eyebrows', 'halo', 'elf', 'beanie', 'chef', 'party', 'santa', 'headphones', 'bandana', 'antenna', 'egg', 'leaf', 'mohawk', 'pirate', 'viking', 'beret'],
  skin: ['none', 'red', 'mechanic', 'captain', 'jeans', 'military', 'police', 'doctor', 'suit', 'whitesuit', 'security', 'astro'],
  visor: ['none', 'mask', 'eyelash', 'gum'],
  pet: ['none', 'mini', 'dog', 'robot', 'slug', 'ufo', 'hamster'],
  plate: ['none', 'hex', 'stripes', 'stars', 'circuit', 'lava', 'snow'],
};

export const ROLES = {
  crewmate: { team: 'crew', name: 'Coéquipier', blurb: 'Fais tes tâches', desc: 'Termine toutes tes tâches et trouve les Imposteurs.' },
  scientist: { team: 'crew', name: 'Scientifique', blurb: 'Consulte les signes vitaux à tout moment', desc: 'Ouvre les signes vitaux n’importe où. La batterie se vide pendant l’utilisation et se recharge avec le temps et tes tâches.' },
  engineer: { team: 'crew', name: 'Ingénieur', blurb: 'Peut utiliser les conduits', desc: 'Utilise les conduits comme les Imposteurs, avec un temps de recharge et une durée maximale à l’intérieur.' },
  guardianAngel: { team: 'crew', name: 'Ange gardien', blurb: 'Protège les coéquipiers après ta mort', desc: 'Tu commences comme coéquipier. Une fois mort, tu peux protéger un joueur : les attaques contre lui échouent pendant la protection.', ghost: true },
  noisemaker: { team: 'crew', name: 'Tapageur', blurb: 'Donne l’alerte en mourant', desc: 'Si tu es tué, une alerte sonore et une flèche indiquent ton corps à l’équipage pendant quelques secondes.' },
  tracker: { team: 'crew', name: 'Mouchard', blurb: 'Suis un joueur sur ta carte', desc: 'Pose un traceur sur un joueur proche : sa position s’affiche sur ta carte et par une flèche pendant la durée du suivi.' },
  detective: { team: 'crew', name: 'Détective', blurb: 'Récolte des indices, résous les meurtres', desc: 'Après la découverte d’un corps, ton carnet note la victime, le lieu et le rôle du tueur. Interroge des suspects pour savoir où ils étaient au moment du meurtre.' },
  judge: { team: 'crew', name: 'Juge', blurb: 'Rends un verdict pendant les réunions', desc: 'Pendant le vote, condamne un joueur : si c’est un Imposteur, il est éliminé sur-le-champ. Si tu te trompes, c’est toi qui meurs (réglable).' },
  impostor: { team: 'imp', name: 'Imposteur', blurb: 'Élimine et sabote', desc: 'Élimine l’équipage, sabote le vaisseau et voyage par les conduits sans te faire repérer.' },
  shapeshifter: { team: 'imp', name: 'Métamorphe', blurb: 'Prends l’apparence d’un autre', desc: 'Transforme-toi en un autre joueur pendant une durée limitée pour semer le doute.' },
  phantom: { team: 'imp', name: 'Spectre', blurb: 'Deviens invisible', desc: 'Disparais pendant quelques secondes. Tu ne peux ni tuer ni utiliser les conduits tant que tu es invisible.' },
  viper: { team: 'imp', name: 'Vipère', blurb: 'Tes victimes se dissolvent', desc: 'Les corps de tes victimes se dissolvent après un délai : ils ne peuvent plus être signalés.' },
};
export const CREW_ROLES = ['scientist', 'engineer', 'guardianAngel', 'noisemaker', 'tracker', 'detective', 'judge'];
export const IMP_ROLES = ['shapeshifter', 'phantom', 'viper'];

// numeric settings: [default, min, max, step]
const N = (d, min, max, step, unit = '') => ({ type: 'num', d, min, max, step, unit });
const B = d => ({ type: 'bool', d });
const E = (d, opts) => ({ type: 'enum', d, opts });
export const SETTINGS = {
  map: E('skeld', [['skeld', 'The Skeld'], ['polus', 'Polus']]),
  maxPlayers: N(10, 4, 15, 1),
  impostors: N(1, 1, 3, 1),
  killCooldown: N(25, 10, 60, 2.5, 's'),
  impostorVision: N(1.5, .25, 5, .25, 'x'),
  killDistance: E(1, [[0, 'Courte'], [1, 'Moyenne'], [2, 'Longue']]),
  playerSpeed: N(1, .5, 3, .25, 'x'),
  crewVision: N(1, .25, 5, .25, 'x'),
  emergencyMeetings: N(1, 0, 9, 1),
  emergencyCooldown: N(15, 0, 60, 5, 's'),
  discussionTime: N(15, 0, 120, 15, 's'),
  votingTime: N(120, 15, 300, 15, 's'),
  anonymousVotes: B(false),
  confirmEjects: B(true),
  taskBar: E('always', [['always', 'Toujours'], ['meetings', 'Réunions'], ['never', 'Jamais']]),
  visualTasks: B(true),
  commonTasks: N(1, 0, 2, 1),
  longTasks: N(1, 0, 3, 1),
  shortTasks: N(2, 0, 5, 1),
  voiceChat: B(true),
  voiceRange: N(6, 3, 12, 1, 'm'),
  ghostVoiceAll: B(true),
};
export const SETTING_GROUPS = [
  ['Imposteurs', ['impostors', 'killCooldown', 'impostorVision', 'killDistance']],
  ['Coéquipiers', ['playerSpeed', 'crewVision']],
  ['Réunions', ['emergencyMeetings', 'emergencyCooldown', 'discussionTime', 'votingTime', 'anonymousVotes', 'confirmEjects']],
  ['Tâches', ['taskBar', 'visualTasks', 'commonTasks', 'longTasks', 'shortTasks']],
  ['Chat vocal de proximité', ['voiceChat', 'voiceRange', 'ghostVoiceAll']],
];
export const LABELS = {
  map: 'Carte', maxPlayers: 'Capacité', impostors: 'Nombre d’imposteurs', killCooldown: 'Temps mort frags', impostorVision: 'Vision imposteurs',
  killDistance: 'Distance frags', playerSpeed: 'Vitesse joueurs', crewVision: 'Vision coéquipiers', emergencyMeetings: 'Réunions d’urgence',
  emergencyCooldown: 'Délai réunions d’urgence', discussionTime: 'Temps de discussion', votingTime: 'Temps de vote', anonymousVotes: 'Votes anonymes',
  confirmEjects: 'Confirmer les éjections', taskBar: 'Barre des tâches', visualTasks: 'Tâches visuelles', commonTasks: 'Tâches communes',
  longTasks: 'Tâches longues', shortTasks: 'Tâches courtes', voiceChat: 'Chat vocal', voiceRange: 'Portée de la voix', ghostVoiceAll: 'Fantômes : voix sans limite de distance',
};

// per-role options: count + chance, then the role's own parameters
export const ROLE_OPTIONS = {
  scientist: { vitalsCooldown: N(15, 0, 60, 2.5, 's'), batteryDuration: N(5, 1, 30, 1, 's') },
  engineer: { ventCooldown: N(30, 0, 60, 2.5, 's'), ventDuration: N(15, 0, 60, 2.5, 's') },
  guardianAngel: { protectCooldown: N(60, 10, 120, 2.5, 's'), protectDuration: N(10, 2.5, 30, 2.5, 's'), protectVisible: B(true) },
  noisemaker: { alertDuration: N(10, 1, 20, 1, 's'), impostorsAlerted: B(false) },
  tracker: { trackCooldown: N(15, 0, 60, 2.5, 's'), trackDuration: N(30, 5, 60, 2.5, 's'), trackDelay: N(1, 0, 5, .5, 's') },
  detective: { suspects: N(2, 1, 5, 1), interrogateCooldown: N(20, 0, 60, 2.5, 's'), revealKiller: B(true) },
  judge: { uses: N(1, 1, 3, 1), diesIfWrong: B(true), firstMeeting: B(true) },
  shapeshifter: { shiftCooldown: N(20, 5, 60, 2.5, 's'), shiftDuration: N(30, 5, 60, 2.5, 's'), evidence: B(true) },
  phantom: { vanishCooldown: N(30, 5, 60, 2.5, 's'), vanishDuration: N(10, 2.5, 30, 2.5, 's') },
  viper: { dissolveTime: N(25, 5, 60, 2.5, 's') },
};
export const ROLE_LABELS = {
  vitalsCooldown: 'Recharge des signes vitaux', batteryDuration: 'Durée de la batterie', ventCooldown: 'Recharge des conduits', ventDuration: 'Durée max dans les conduits',
  protectCooldown: 'Recharge de la protection', protectDuration: 'Durée de la protection', protectVisible: 'Protection visible des imposteurs',
  alertDuration: 'Durée de l’alerte', impostorsAlerted: 'Les imposteurs reçoivent l’alerte', trackCooldown: 'Recharge du traceur', trackDuration: 'Durée du suivi',
  trackDelay: 'Délai de position', suspects: 'Suspects par manche', interrogateCooldown: 'Recharge de l’interrogatoire', revealKiller: 'Révéler le rôle du tueur',
  uses: 'Verdicts par partie', diesIfWrong: 'Le juge meurt s’il se trompe', firstMeeting: 'Verdict possible dès la 1re réunion',
  shiftCooldown: 'Recharge de la métamorphose', shiftDuration: 'Durée de la métamorphose', evidence: 'Animation visible',
  vanishCooldown: 'Recharge de l’invisibilité', vanishDuration: 'Durée de l’invisibilité', dissolveTime: 'Délai de dissolution',
};
export const KILL_RANGE = [1.1, 1.8, 2.5];   // world units for Courte / Moyenne / Longue
export const USE_RANGE = 1.15;
export const REPORT_RANGE = 2.2;
export const VISION_BASE = 4.6;             // light radius at 1x
export const SPEED_BASE = 3.6;              // world units per second at 1x
export const LIGHTS_VISION = .25;           // crewmate vision multiplier while the lights are out
export const ABILITY_RANGE = 1.9;

function defaults(schema) { return Object.fromEntries(Object.entries(schema).map(([k, v]) => [k, v.d])); }
export function defaultSettings() {
  return { ...defaults(SETTINGS), roles: Object.fromEntries(Object.entries(ROLE_OPTIONS).map(([r, o]) => [r, { count: 0, chance: 0, ...defaults(o) }])) };
}
function cleanValue(def, v) {
  if (def.type === 'bool') return typeof v === 'boolean' ? v : def.d;
  if (def.type === 'enum') { const hit = def.opts.find(([k]) => k === v); return hit ? hit[0] : def.d; }
  const n = Number(v);
  if (!Number.isFinite(n)) return def.d;
  const c = Math.min(def.max, Math.max(def.min, n));
  return Math.round((c - def.min) / def.step) * def.step + def.min;
}
// accept a full or partial settings object from a client, return a complete and valid one
export function cleanSettings(raw, base = defaultSettings()) {
  const out = { ...base, roles: { ...base.roles } };
  if (!raw || typeof raw !== 'object') return out;
  for (const k of Object.keys(SETTINGS)) if (k in raw) out[k] = cleanValue(SETTINGS[k], raw[k]);
  if (raw.roles && typeof raw.roles === 'object') {
    for (const r of Object.keys(ROLE_OPTIONS)) {
      const src = raw.roles[r];
      if (!src || typeof src !== 'object') continue;
      const cur = { ...out.roles[r] };
      const maxCount = IMP_ROLES.includes(r) ? 3 : MAX_PLAYERS;
      if ('count' in src) cur.count = cleanValue(N(0, 0, maxCount, 1), src.count);
      if ('chance' in src) cur.chance = cleanValue(N(0, 0, 100, 10), src.chance);
      for (const [k, def] of Object.entries(ROLE_OPTIONS[r])) if (k in src) cur[k] = cleanValue(def, src[k]);
      out.roles[r] = cur;
    }
  }
  return out;
}
export const maxImpostors = n => (n <= 6 ? 1 : n <= 8 ? 2 : 3);

export const PRESETS = {
  classic: { name: 'Classique', desc: 'Préréglage pour une partie sans rôles avec des paramètres de jeu équilibrés.', settings: {} },
  roles: { name: 'Rôles à gogo', desc: 'Préréglage avec de nombreux rôles et des paramètres de jeu équilibrés.', settings: { roles: {
    scientist: { count: 1, chance: 60 }, engineer: { count: 1, chance: 60 }, guardianAngel: { count: 1, chance: 50 }, noisemaker: { count: 1, chance: 50 },
    tracker: { count: 1, chance: 50 }, detective: { count: 1, chance: 50 }, judge: { count: 1, chance: 40 },
    shapeshifter: { count: 1, chance: 40 }, phantom: { count: 1, chance: 40 }, viper: { count: 1, chance: 40 } } } },
};
export function presetSettings(id, keep = {}) {
  const p = PRESETS[id] || PRESETS.classic;
  const s = cleanSettings(p.settings);
  // the map and the capacity belong to the room, not to the preset
  if (keep.map) s.map = keep.map;
  if (keep.maxPlayers) s.maxPlayers = keep.maxPlayers;
  return s;
}

export function fmtSetting(key, v) {
  const d = SETTINGS[key];
  if (!d) return String(v);
  if (d.type === 'bool') return v ? 'Oui' : 'Non';
  if (d.type === 'enum') return (d.opts.find(([k]) => k === v) || [0, String(v)])[1];
  return `${String(+v.toFixed(2)).replace('.', ',')}${d.unit}`;
}
export function fmtRoleOpt(role, key, v) {
  const d = ROLE_OPTIONS[role]?.[key];
  if (!d) return String(v);
  if (d.type === 'bool') return v ? 'Oui' : 'Non';
  return `${String(+v.toFixed(2)).replace('.', ',')}${d.unit}`;
}
