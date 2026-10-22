// Profile pictures: Pouf Party's cover plus the original portraits kept from the former catalogue (accounts created
// with them stay valid). Shared with the server, which only accepts these ids.
export const AVATAR_LIST = [
  ['pouf-party', 'Pouf Party'], ['ashen-crown', 'Chevalière'], ['tidebreaker', 'Brise-lames'], ['starfall', 'Nébuleuse'],
  ['neon-requiem', 'Néon'], ['hollow-pines', 'Forêt'], ['apex-circuit', 'Circuit'], ['lumen', 'Lumière'], ['abyssal', 'Abysses'],
  ['northbound', 'Aurore'], ['sands-meridian', 'Désert'], ['valewalker', 'Sommets'], ['matchday', 'Stade'],
  ['titan-protocol', 'Titan'], ['moonlit-bay', 'Baie'], ['whispergrove', 'Lucioles'], ['orbital-drift', 'Orbite'],
  ['nightline', 'Minuit'], ['last-light', 'Crépuscule'],
].map(([id, name]) => ({ id, name }));
export const AVATARS = AVATAR_LIST.map(a => a.id);
