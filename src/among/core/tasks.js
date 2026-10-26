// Task catalogue. A task is a list of steps; each step happens at a console of the map and opens a minigame.
// `oneOf` picks a console when the task is dealt, `wires` picks three panels in order. `min` is the shortest
// believable time (ms) for the minigame: the authority refuses faster completions. `wait` (s) makes the next
// step available only after a delay (inspect sample, reboot wifi).
export const GAMES = {
  swipe: { name: 'Glisser la carte', min: 900 }, wires: { name: 'Réparer les câbles', min: 1200 }, download: { name: 'Télécharger', min: 7000 },
  upload: { name: 'Envoyer', min: 7000 }, divert: { name: 'Dériver l’énergie', min: 600 }, accept: { name: 'Accepter l’énergie', min: 400 },
  align: { name: 'Aligner la sortie moteur', min: 900 }, fuelFill: { name: 'Remplir le jerrican', min: 2500 }, fuelPour: { name: 'Faire le plein', min: 2500 },
  sample: { name: 'Inspecter l’échantillon', min: 600 }, sampleEnd: { name: 'Inspecter l’échantillon', min: 400 }, reactor: { name: 'Démarrer le réacteur', min: 5000 },
  scan: { name: 'Soumettre l’analyse', min: 8500 }, asteroids: { name: 'Détruire les astéroïdes', min: 5000 }, garbage: { name: 'Vider les ordures', min: 1800 },
  calibrate: { name: 'Calibrer le distributeur', min: 2000 }, chart: { name: 'Tracer la route', min: 1200 }, filter: { name: 'Nettoyer le filtre O2', min: 1500 },
  shields: { name: 'Activer les boucliers', min: 800 }, steer: { name: 'Stabiliser la direction', min: 500 }, manifolds: { name: 'Déverrouiller les collecteurs', min: 2000 },
  keys: { name: 'Insérer les clés', min: 800 }, boarding: { name: 'Scanner la carte d’embarquement', min: 1200 }, weather: { name: 'Réparer la station météo', min: 1500 },
  weatherLab: { name: 'Relancer la station météo', min: 400 }, wifi: { name: 'Redémarrer le Wi-Fi', min: 600 }, wifiEnd: { name: 'Redémarrer le Wi-Fi', min: 400 },
  jugFill: { name: 'Remplir la bonbonne', min: 2000 }, jugPour: { name: 'Remplacer la bonbonne', min: 2000 }, waterCan: { name: 'Prendre l’arrosoir', min: 400 },
  waterPlants: { name: 'Arroser les plantes', min: 1000 }, telescope: { name: 'Aligner le télescope', min: 1200 }, temperature: { name: 'Relever la température', min: 1200 },
  drill: { name: 'Réparer la foreuse', min: 1200 }, waterwheel: { name: 'Ouvrir la roue à aubes', min: 1500 }, tree: { name: 'Surveiller l’arbre', min: 1500 },
  canisters: { name: 'Remplir les bonbonnes', min: 2500 }, artifacts: { name: 'Ranger les artefacts', min: 2000 },
};
const S = (console, game, extra = {}) => ({ console, game, ...extra });

export const TASKS = {
  skeld: [
    { id: 'swipeCard', name: 'Glisser la carte', kind: 'common', steps: [S('admin_swipe', 'swipe')] },
    { id: 'fixWiring', name: 'Réparer les câbles', kind: 'common', wires: ['elec_wires', 'storage_wires', 'admin_wires', 'nav_wires', 'cafe_wires', 'sec_wires'] },
    { id: 'alignEngine', name: 'Aligner la sortie moteur', kind: 'long', steps: [S('upper_align', 'align'), S('lower_align', 'align')] },
    { id: 'fuelEngines', name: 'Faire le plein des moteurs', kind: 'long', steps: [S('storage_fuel', 'fuelFill'), S('upper_fuel', 'fuelPour'), S('storage_fuel', 'fuelFill'), S('lower_fuel', 'fuelPour')] },
    { id: 'inspectSample', name: 'Inspecter l’échantillon', kind: 'long', steps: [S('medbay_sample', 'sample'), S('medbay_sample', 'sampleEnd', { wait: 60 })] },
    { id: 'startReactor', name: 'Démarrer le réacteur', kind: 'long', steps: [S('reactor_start', 'reactor')] },
    { id: 'submitScan', name: 'Soumettre l’analyse', kind: 'long', visual: 'scan', steps: [S('medbay_scan', 'scan')] },
    { id: 'clearAsteroids', name: 'Détruire les astéroïdes', kind: 'long', visual: 'asteroids', steps: [S('weapons_seat', 'asteroids')] },
    { id: 'emptyGarbage', name: 'Vider les ordures', kind: 'long', steps: [S('cafe_garbage', 'garbage'), S('storage_chute', 'garbage')] },
    { id: 'emptyChute', name: 'Vider la goulotte', kind: 'long', steps: [S('o2_chute', 'garbage'), S('storage_chute', 'garbage')] },
    { id: 'calibrateDistributor', name: 'Calibrer le distributeur', kind: 'short', steps: [S('elec_calib', 'calibrate')] },
    { id: 'chartCourse', name: 'Tracer la route', kind: 'short', steps: [S('nav_chart', 'chart')] },
    { id: 'cleanO2', name: 'Nettoyer le filtre O2', kind: 'short', steps: [S('o2_filter', 'filter')] },
    { id: 'divertPower', name: 'Dériver l’énergie', kind: 'short', steps: [S('elec_power', 'divert', { link: 1 }), S({ oneOf: ['upper_power', 'lower_power', 'sec_power', 'nav_power', 'shields_power', 'weapons_power', 'o2_power', 'comms_power'] }, 'accept')] },
    { id: 'primeShields', name: 'Activer les boucliers', kind: 'short', steps: [S('shields_prime', 'shields')] },
    { id: 'stabilizeSteering', name: 'Stabiliser la direction', kind: 'short', steps: [S('nav_steer', 'steer')] },
    { id: 'unlockManifolds', name: 'Déverrouiller les collecteurs', kind: 'short', steps: [S('reactor_manifold', 'manifolds')] },
    { id: 'uploadData', name: 'Transférer les données', kind: 'short', steps: [S({ oneOf: ['cafe_upload', 'comms_upload', 'elec_upload', 'nav_upload', 'weapons_upload'] }, 'download'), S('admin_upload', 'upload')] },
  ],
  polus: [
    { id: 'swipeCard', name: 'Glisser la carte', kind: 'common', steps: [S('office_swipe', 'swipe')] },
    { id: 'insertKeys', name: 'Insérer les clés', kind: 'common', steps: [S('dropship_keys', 'keys')] },
    { id: 'scanBoardingPass', name: 'Scanner la carte d’embarquement', kind: 'common', steps: [S('office_pass', 'boarding')] },
    { id: 'fixWiring', name: 'Réparer les câbles', kind: 'common', wires: ['elec_wires', 'o2_wires', 'comms_wires', 'office_wires', 'lab_wires', 'specimen_wires'] },
    { id: 'fuelEngines', name: 'Faire le plein des moteurs', kind: 'long', steps: [S('storage_fuel', 'fuelFill'), S('engine_left', 'fuelPour'), S('storage_fuel', 'fuelFill'), S('engine_right', 'fuelPour')] },
    { id: 'fixWeatherNodes', name: 'Réparer la station météo', kind: 'long', steps: [S({ oneOf: ['node_o2', 'node_comms', 'node_lava', 'node_lab', 'node_specimen', 'node_weapons'] }, 'weather'), S('lab_weather', 'weatherLab')] },
    { id: 'rebootWifi', name: 'Redémarrer le Wi-Fi', kind: 'long', steps: [S('comms_wifi', 'wifi'), S('comms_wifi', 'wifiEnd', { wait: 60 })] },
    { id: 'replaceWaterJug', name: 'Remplacer la bonbonne d’eau', kind: 'long', steps: [S('boiler_jug', 'jugFill'), S('office_jug', 'jugPour')] },
    { id: 'inspectSample', name: 'Inspecter l’échantillon', kind: 'long', steps: [S('lab_sample', 'sample'), S('lab_sample', 'sampleEnd', { wait: 60 })] },
    { id: 'submitScan', name: 'Soumettre l’analyse', kind: 'long', visual: 'scan', steps: [S('lab_scan', 'scan')] },
    { id: 'waterPlants', name: 'Arroser les plantes', kind: 'long', steps: [S('storage_water', 'waterCan'), S('o2_plants', 'waterPlants')] },
    { id: 'clearAsteroids', name: 'Détruire les astéroïdes', kind: 'long', visual: 'asteroids', steps: [S('weapons_asteroids', 'asteroids')] },
    { id: 'alignTelescope', name: 'Aligner le télescope', kind: 'short', steps: [S('lab_telescope', 'telescope')] },
    { id: 'recordTemperature', name: 'Relever la température', kind: 'short', steps: [S({ oneOf: ['lab_temp', 'outside_temp'] }, 'temperature')] },
    { id: 'repairDrill', name: 'Réparer la foreuse', kind: 'short', steps: [S('lab_drill', 'drill')] },
    { id: 'openWaterwheel', name: 'Ouvrir la roue à aubes', kind: 'short', steps: [S('boiler_wheel', 'waterwheel')] },
    { id: 'monitorTree', name: 'Surveiller l’arbre', kind: 'short', steps: [S('o2_tree', 'tree')] },
    { id: 'fillCanisters', name: 'Remplir les bonbonnes', kind: 'short', steps: [S('o2_canisters', 'canisters')] },
    { id: 'storeArtifacts', name: 'Ranger les artefacts', kind: 'short', steps: [S('specimen_artifacts', 'artifacts')] },
    { id: 'unlockManifolds', name: 'Déverrouiller les collecteurs', kind: 'short', steps: [S('specimen_manifold', 'manifolds')] },
    { id: 'chartCourse', name: 'Tracer la route', kind: 'short', steps: [S('dropship_chart', 'chart')] },
    { id: 'uploadData', name: 'Transférer les données', kind: 'short', steps: [S({ oneOf: ['office_upload', 'elec_upload', 'weapons_upload', 'lab_upload', 'specimen_upload', 'o2_upload'] }, 'download'), S('comms_upload', 'upload')] },
  ],
};
export const taskDef = (map, id) => TASKS[map]?.find(t => t.id === id);

const shuffle = (a, rng) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// concrete steps for one player (random consoles resolved)
export function instantiate(def, rng) {
  if (def.wires) {
    const picked = shuffle(def.wires.map((c, i) => i), rng).slice(0, 3).sort((a, b) => a - b);
    return picked.map(i => ({ console: def.wires[i], game: 'wires', min: GAMES.wires.min }));
  }
  const steps = def.steps.map(s => ({ ...s, console: typeof s.console === 'object' ? s.console.oneOf[Math.floor(rng() * s.console.oneOf.length)] : s.console, min: GAMES[s.game].min }));
  // "divert power" tells the electrical panel which room the energy goes to
  steps.forEach((s, i) => { if (s.link) { s.target = steps[i + 1].console; delete s.link; } });
  return steps;
}
// deal tasks: the common tasks are shared by every crewmate, long and short ones are drawn per player
export function dealTasks(map, settings, rng, playerIds) {
  const all = TASKS[map];
  const pick = (kind, n) => shuffle(all.filter(t => t.kind === kind), rng).slice(0, n);
  const common = pick('common', settings.commonTasks);
  const commonSteps = new Map(common.map(t => [t.id, instantiate(t, rng)]));
  const out = new Map();
  for (const id of playerIds) {
    const list = [...common.map(t => ({ id: t.id, steps: commonSteps.get(t.id).map(s => ({ ...s })) })),
      ...pick('long', settings.longTasks).map(t => ({ id: t.id, steps: instantiate(t, rng) })),
      ...pick('short', settings.shortTasks).map(t => ({ id: t.id, steps: instantiate(t, rng) }))];
    out.set(id, list.map(t => ({ ...t, step: 0, done: false, readyAt: 0 })));
  }
  return out;
}
// free play: every task of the map
export function allTasks(map, rng) {
  return TASKS[map].map(t => ({ id: t.id, steps: instantiate(t, rng), step: 0, done: false, readyAt: 0 }));
}
