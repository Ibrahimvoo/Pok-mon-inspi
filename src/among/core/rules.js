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

// the wardrobe items (art/cosmetics.js has their names and pictures)
const ids = (p, n) => Array.from({ length: n }, (_, i) => `${p}-${String(i + 1).padStart(2, '0')}`);
export const COSMETICS = {
  hat: ['none', ...ids('hat', 18)], skin: ['none', ...ids('skin', 17)], visor: ['none', ...ids('visor', 8)], pet: ['none', ...ids('pet', 1)],
  plate: ['none', 'plate-02', 'plate-03', 'plate-04', 'plate-05', 'plate-06'],
};

export const ROLES = {
  crewmate: { team: 'crew', name: 'Coéquipier', blurb: 'Fais tes tâches', desc: 'Termine toutes tes tâches et trouve les Imposteurs.' },
  scientist: { team: 'crew', name: 'Scientifique', blurb: 'Consulte les signes vitaux à tout moment', desc: 'Ouvre les signes vitaux n’importe où. La batterie se vide pendant l’utilisation et se recharge avec le temps et tes tâches.' },
  engineer: { team: 'crew', name: 'Ingénieur', blurb: 'Peut utiliser les conduits', desc: 'Utilise les conduits comme les Imposteurs, avec un temps de recharge et une durée maximale à l’intérieur.' },
  guardianAngel: { team: 'crew', name: 'Ange gardien', blurb: 'Protège les coéquipiers après ta mort', desc: 'Tu commences comme coéquipier. Une fois mort, tu peux protéger un joueur : les attaques contre lui échouent pendant la protection.', ghost: true },
  noisemaker: { team: 'crew', name: 'Tapageur', blurb: 'Donne l’alerte en mourant', desc: 'Si tu es tué, une alerte sonore et une flèche indiquent ton corps à l’équipage pendant quelques secondes.' },
  tracker: { team: 'crew', name: 'Mouchard', blurb: 'Suis un joueur sur ta carte', desc: 'Pose un traceur sur un joueur proche : sa position s’affiche sur ta carte et par une flèche pendant la durée du suivi.' },
  detective: { team: 'crew', name: 'Détective', blurb: 'Récolte des indices, résous les meurtres', desc: 'Après la découverte d’un corps, ton carnet note la victime, le lieu et le rôle du tueur. Interroge des suspects pour savoir où ils étaient au moment du meurtre.' },
  judge: { team: 'crew', name: 'Juge', blurb: 'Rends un verdict pendant les réunions', desc: 'Pendant le vote, condamne un joueur : si c’est un Imposteur, il est éliminé sur-le-champ. Si tu te trompes, c’est toi qui meurs. Le verdict se débloque avec tes tâches.' },
  influencer: { team: 'crew', name: 'Influenceur', blurb: 'Envoie des messages aux vivants', desc: 'Une fois mort, envoie des messages aux coéquipiers encore en vie, avec un temps mort entre deux messages.', ghost: true },
  impostor: { team: 'imp', name: 'Imposteur', blurb: 'Élimine et sabote', desc: 'Élimine l’équipage, sabote le vaisseau et voyage par les conduits sans te faire repérer.' },
  shapeshifter: { team: 'imp', name: 'Métamorphe', blurb: 'Prends l’apparence d’un autre', desc: 'Transforme-toi en un autre joueur pendant une durée limitée pour semer le doute.' },
  phantom: { team: 'imp', name: 'Spectre', blurb: 'Deviens invisible', desc: 'Disparais pendant quelques secondes. Tu ne peux ni tuer ni utiliser les conduits tant que tu es invisible.' },
  viper: { team: 'imp', name: 'Vipère', blurb: 'Tes victimes se dissolvent', desc: 'Les corps de tes victimes se dissolvent après un délai : ils ne peuvent plus être signalés.' },
};
export const CREW_ROLES = ['scientist', 'guardianAngel', 'engineer', 'noisemaker', 'tracker', 'detective', 'judge', 'influencer'];
// the INFO text of each role in the role settings of the game
export const ROLE_INFO = {
  scientist: 'Accédez à tout moment aux signes vitaux.\nTerminez des tâches pour recharger votre batterie.',
  guardianAngel: 'Lance un champ de protection autour des survivants de l’équipage.',
  engineer: 'Peut utiliser les conduits.',
  noisemaker: 'Alertez tous les coéquipiers sur les lieux quand on vous tue.',
  tracker: 'Posez un mouchard sur un coéquipier pour suivre ses déplacements sur la carte.',
  detective: 'Ajoutez des informations dans vos notes.\nInterrogez les coéquipiers.',
  judge: 'Prenez le contrôle du vote d’une réunion pour éjecter un imposteur. Si vous avez tort, vous vous faites éjecter.',
  influencer: 'Envoyez des messages aux coéquipiers encore en vie.',
  shapeshifter: 'Métamorphosez-vous et prenez l’apparence d’autres coéquipiers.',
  phantom: 'Devenez invisible pour espionner les autres ou échapper à la mort.',
  viper: 'L’acide dissout lentement le corps des victimes.',
};
export const IMP_ROLES = ['shapeshifter', 'phantom', 'viper'];

// numeric settings: [default, min, max, step]
const N = (d, min, max, step, unit = '') => ({ type: 'num', d, min, max, step, unit });
const B = d => ({ type: 'bool', d });
const hidden = def => ({ ...def, hidden: true });        // kept by the rules, not shown in the role settings of the game
const E = (d, opts) => ({ type: 'enum', d, opts });
export const SETTINGS = {
  map: E('skeld', [['skeld', 'The Skeld'], ['polus', 'Polus']]),
  maxPlayers: N(10, 4, 15, 1),
  impostors: N(1, 1, 3, 1),
  killCooldown: N(25, 10, 60, 2.5, 's'),
  impostorVision: N(1.5, .25, 5, .25, 'x'),
  killDistance: E(1, [[0, 'Courte'], [1, 'Moyen'], [2, 'Longue']]),
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
  map: 'Carte', maxPlayers: 'Capacité', impostors: 'Nombre d\'imposteurs', killCooldown: 'Temps mort Frags', impostorVision: 'Vision imposteurs',
  killDistance: 'Distance frags', playerSpeed: 'Vitesse joueurs', crewVision: 'Vision coéquipiers', emergencyMeetings: 'Réunions d\'urgence',
  emergencyCooldown: 'Temps mort Réunions d\'urgence', discussionTime: 'Temps de discussion', votingTime: 'Temps de vote', anonymousVotes: 'Votes anonymes',
  confirmEjects: 'Confirmer les éjections', taskBar: 'Barre des tâches', visualTasks: 'Tâches visuelles', commonTasks: 'Tâches communes',
  longTasks: 'Tâches longues', shortTasks: 'Tâches courtes', voiceChat: 'Chat vocal', voiceRange: 'Portée de la voix', ghostVoiceAll: 'Fantômes : voix sans limite de distance',
};

// per-role options: count + chance, then the role's own parameters
export const ROLE_OPTIONS = {
  scientist: { vitalsCooldown: N(15, 5, 60, 5, 's'), batteryDuration: N(5, 5, 30, 5, 's') },
  guardianAngel: { protectCooldown: N(60, 10, 120, 5, 's'), protectDuration: N(10, 5, 30, 5, 's'), protectVisible: B(false) },
  engineer: { ventCooldown: N(30, 0, 60, 5, 's'), ventDuration: N(15, 5, 60, 5, 's') },
  noisemaker: { impostorsAlerted: B(true), alertDuration: N(10, 1, 20, 1, 's') },
  tracker: { trackCooldown: N(15, 5, 60, 5, 's'), trackDelay: N(1, 0, 5, 1, 's'), trackDuration: N(30, 5, 120, 5, 's') },
  detective: { suspects: N(3, 2, 4, 1), interrogateCooldown: hidden(N(20, 0, 60, 2.5, 's')), revealKiller: hidden(B(true)) },
  judge: { taskUnlock: N(50, 0, 100, 10), uses: hidden(N(1, 1, 3, 1)), diesIfWrong: hidden(B(true)), firstMeeting: hidden(B(true)) },
  influencer: { messageCooldown: N(20, 5, 60, 5, 's') },
  shapeshifter: { evidence: B(false), shiftDuration: N(30, 5, 30, 5, 's'), shiftCooldown: N(10, 5, 60, 5, 's') },
  phantom: { vanishDuration: N(30, 5, 60, 5, 's'), vanishCooldown: N(15, 5, 60, 5, 's') },
  viper: { dissolveTime: N(15, 5, 60, 5, 's') },
};
export const ROLE_LABELS = {
  vitalsCooldown: 'Temps mort Affichage des signes vitaux', batteryDuration: 'Durée de batterie',
  protectCooldown: 'Temps mort Protection', protectDuration: 'Durée de protection', protectVisible: 'Les imposteurs voient la protection',
  ventCooldown: 'Temps mort Utilisation de conduit', ventDuration: 'Temps max dans les conduits',
  impostorsAlerted: 'Les imposteurs reçoivent une alerte', alertDuration: 'Durée de l\'alerte',
  trackCooldown: 'Temps mort du suivi', trackDelay: 'Délai de suivi', trackDuration: 'Durée du suivi',
  suspects: 'Suspects par cas', interrogateCooldown: 'Temps mort Interrogatoire', revealKiller: 'Révéler le rôle du tueur',
  taskUnlock: '% tâches pour débloquer le rôle', uses: 'Verdicts par partie', diesIfWrong: 'Le juge meurt s\'il se trompe', firstMeeting: 'Verdict possible dès la 1re réunion',
  messageCooldown: 'Temps mort avant le prochain message',
  evidence: 'Laisser une trace de métamorphose', shiftDuration: 'Durée de métamorphose', shiftCooldown: 'Temps mort Métamorphose',
  vanishDuration: 'Durée de disparition', vanishCooldown: 'Temps mort Disparition', dissolveTime: 'Temps de dissolution',
};
export const KILL_RANGE = [1.1, 1.8, 2.5];   // world units for Courte / Moyenne / Longue
export const USE_RANGE = 1.15;
export const REPORT_RANGE = 2.2;
export const VISION_BASE = 5;               // light radius at 1x (the reference frames show a fully lit screen height)
export const SPEED_BASE = 2.7;              // world units per second at 1x, measured on the supplied trailer
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
    tracker: { count: 1, chance: 50 }, detective: { count: 1, chance: 50 }, judge: { count: 1, chance: 40 }, influencer: { count: 1, chance: 40 },
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
  return `${d.unit === 's' || d.unit === 'x' ? (+v).toFixed(d.unit === 'x' && v * 100 % 10 ? 2 : 1).replace('.', ',') : String(+v.toFixed(2)).replace('.', ',')}${d.unit}`;
}
export function fmtRoleOpt(role, key, v) {
  const d = ROLE_OPTIONS[role]?.[key];
  if (!d) return String(v);
  if (d.type === 'bool') return v ? 'Oui' : 'Non';
  return `${String(+v.toFixed(2)).replace('.', ',')}${d.unit}`;
}
// on-screen scale, measured on the reference screenshots (lobby crate vs crewmate, Skeld cafeteria tables)
export const CREW_HEIGHT = .82;             // world units from the top of the dome to the feet
export const VIEW_HEIGHT = 7.4;             // world units visible from the top to the bottom of the screen
