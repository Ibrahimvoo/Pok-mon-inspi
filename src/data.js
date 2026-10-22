// Catalogue of the console: Pouf Party, the one real, playable game. Every title, studio and visual is original.
const T = (n, d, t) => ({ n, d, t });
export const GAMES = [
  { id: 'pouf-party', title: 'Pouf Party', publisher: 'Bulle & Bouée', genre: 'Party game', genres: ['Party', 'Action', 'Indé'],
    release: '2026-10-21', price: 0, discount: 0, rating: 4.9, votes: 1280, pegi: 3, size: 2.4, players: '1-4 joueurs (en ligne)',
    font: 'luckiest', mood: 'warm', thumb: .5, accent: '#ffd23f', playable: true,
    tagline: 'Gonflés à bloc. Ensemble.',
    desc: 'Montez à quatre sur une bouée et dévalez des rivières pleines de pièges en vous propulsant… à coups de pouf ! Coordonnez-vous pour éviter piques, mâchoires, moulins et crocodiles, validez les checkpoints et franchissez l’arrivée. Entre deux descentes, affrontez-vous à pied dans une course d’obstacles et dans l’arène du Grand Tourbillon. Jeu en ligne entre amis, personnages à personnaliser, emotes et records.',
    features: ['vibration', 'audio3d', 'online'], activities: ['La Descente du Lagon Rose', 'Le Parcours Pétillant', 'Le Grand Tourbillon'],
    trophies: [
      T('Premier plouf', 'Terminer une descente', 'bronze'),
      T('Tous à bord', 'Terminer une descente à au moins deux joueurs', 'bronze'),
      T('Sans une crevaison', 'Terminer une descente sans éclater la bouée', 'silver'),
      T('Super pouf', 'Utiliser 50 super poufs', 'silver'),
      T('Pilote de rivière', 'Obtenir trois étoiles sur une épreuve', 'gold'),
      T('Pouf légendaire', 'Obtenir tous les autres trophées', 'platinum'),
    ] },
];
export const byId = Object.fromEntries(GAMES.map(g => [g.id, g]));

export const FONT = {
  cinzel: "'Cinzel', serif", bebas: "'Bebas Neue', sans-serif", syncopate: "'Syncopate', sans-serif", unbounded: "'Unbounded', sans-serif",
  cormorant: "'Cormorant Garamond', serif", teko: "'Teko', sans-serif", josefin: "'Josefin Sans', sans-serif", shoulders: "'Big Shoulders Display', sans-serif",
  anton: "'Anton', sans-serif", rajdhani: "'Rajdhani', sans-serif", playfair: "'Playfair Display', serif", luckiest: "'Luckiest Guy', sans-serif",
};

export const FEATURES = {
  vibration: 'Retour haptique', triggers: 'Gâchettes adaptatives', audio3d: 'Audio 3D', hdr: 'HDR', online: 'Jeu en ligne',
};

export const MEDIA = [
  { id: 'streamix', title: 'Streamix', color: '#e5383b', mark: 'S', kind: 'Films et séries' },
  { id: 'cineplus', title: 'Ciné+', color: '#1b1f3b', mark: 'C+', kind: 'Cinéma' },
  { id: 'melodia', title: 'Melodia', color: '#17c964', mark: '♪', kind: 'Musique' },
  { id: 'tubevision', title: 'TubeVision', color: '#ff3b30', mark: '▶', kind: 'Vidéos' },
  { id: 'livearena', title: 'Live Arena', color: '#8a5cff', mark: 'LA', kind: 'Diffusion en direct' },
  { id: 'kidzone', title: 'KidZone', color: '#ffb020', mark: 'K', kind: 'Jeunesse' },
];

export const PLANS = [
  { id: 'essential', name: 'PlayStation Plus Essential', price: 8.99, perks: ['Jeu en ligne', '3 jeux offerts chaque mois', 'Sauvegardes dans le cloud', 'Réductions exclusives'], color: '#c9a64b' },
  { id: 'extra', name: 'PlayStation Plus Extra', price: 13.99, perks: ['Tous les avantages Essentiel', 'Catalogue de plus de 400 jeux', 'Ajouts chaque mois'], color: '#b0b8c4' },
  { id: 'premium', name: 'PlayStation Plus Premium', price: 16.99, perks: ['Tous les avantages Extra', 'Classiques rétro', 'Essais de jeux', 'Streaming dans le cloud'], color: '#1c1c1e' },
];

export const NEWS = {
  default: ['Mise à jour 1.04 disponible', 'Nouveau mode photo', 'Événement communautaire ce week-end'],
};
