// Catalogue of the console: Pouf Party, Mimic Party, UNO and Among Us, the real, playable games.
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
// Mimic Party (src/mimic): unofficial fan recreation, sounds from the owner's videos.
GAMES.unshift({ id: 'mimic-party', title: 'Mimic Party', publisher: 'Recréation non officielle', genre: 'Party game', genres: ['Party', 'Humour'],
  release: '2026-10-22', price: 14.99, discount: 0, rating: 4.9, votes: 3120, pegi: 12, size: 1.2, players: '1-8 joueurs (local et en ligne)',
  font: 'unbounded', mood: 'party', thumb: .5, accent: '#ff4fb0', playable: true, real: true,
  tagline: 'Imite les réfs. Fais rire tes potes.',
  desc: 'Le party game des imitations : écoute une réf culte, imite-la au micro et laisse le jury noter les paroles, la mélodie, le rythme et la ressemblance. Blind test, concours de cris, notes à tenir et rythmes à reproduire, jusqu’à 8 joueurs sur la même console ou en ligne avec ton groupe : le chat vocal se met en pause pendant que tu imites, puis tout le monde réécoute ton imitation.',
  features: ['voice', 'vibration', 'online'], activities: ['Partie rapide', 'Blind test des réfs', 'En ligne avec le groupe'],
  trophies: [
    T('Première imitation', 'Terminer une imitation', 'bronze'),
    T('Copie conforme', 'Obtenir 90 ou plus à une imitation', 'silver'),
    T('Chouchou du public', 'Remporter le choix du public', 'bronze'),
    T('Soirée réussie', 'Terminer une partie à 3 joueurs ou plus', 'bronze'),
    T('Champion de la soirée', 'Gagner une partie à plusieurs', 'gold'),
    T('Perfectionniste', 'Obtenir tous les autres trophées', 'platinum'),
  ] });
// UNO (src/uno): unofficial recreation of the card game, cards and visuals redrawn.
GAMES.unshift({ id: 'uno', title: 'UNO', publisher: 'Recréation non officielle', genre: 'Jeu de cartes', genres: ['Party', 'Cartes'],
  release: '2026-10-23', price: 9.99, discount: 0, rating: 4.8, votes: 5480, pegi: 3, size: .4, players: '1-4 joueurs (ordinateur et en ligne)',
  font: 'lilita', mood: 'party', thumb: .5, accent: '#e3262b', playable: true, real: true,
  tagline: 'Le jeu de cartes culte, entre amis.',
  desc: 'Le jeu de cartes UNO avec les règles officielles : cartes Passe ton tour, Inversion, +2, Joker et Joker +4 (avec contestation du bluff), annonce « UNO ! » obligatoire sous peine de deux cartes, et points jusqu’à 500. Joue contre l’ordinateur ou crée un salon avec code pour jouer en ligne avec jusqu’à 3 amis, et active les règles maison : Accumulation, 7-0, À la volée, Forcer le jeu, Pas de bluff et Pioche jouable.',
  features: ['vibration', 'online'], activities: ['Partie rapide', 'Salon entre amis', 'Règles maison'],
  trophies: [
    T('Première manche', 'Remporter une manche', 'bronze'),
    T('UNO !', 'Annoncer UNO avant de poser son avant-dernière carte', 'bronze'),
    T('Pris la main dans le sac', 'Faire piocher un joueur qui a oublié d’annoncer UNO', 'bronze'),
    T('Bluff démasqué', 'Contester un Joker +4 posé en bluff', 'silver'),
    T('Entre amis', 'Terminer une partie en ligne avec un ami', 'silver'),
    T('Champion', 'Remporter une partie', 'gold'),
    T('Perfectionniste', 'Obtenir tous les autres trophées', 'platinum'),
  ] });
// Among Us: real, playable recreation (src/among). Maps, crewmates and role sounds come from the owner's references.
GAMES.unshift({ id: 'among-us', title: 'Among Us', publisher: 'Recréation non officielle', genre: 'Party game', genres: ['Party', 'Action'],
  release: '2026-10-26', price: 4.99, discount: 0, rating: 4.8, votes: 8120, pegi: 7, size: 1.1, players: '4-15 joueurs (en ligne et local)',
  font: 'lilita', mood: 'space', thumb: .5, accent: '#c51111', playable: true, real: true,
  tagline: 'Un imposteur se cache parmi vous.',
  desc: 'Le jeu de déduction sociale : équipiers et imposteurs à bord du Skeld ou sur Polus. Tâches interactives, sabotages, conduits, réunions d’urgence et votes, avec les rôles Scientifique, Ingénieur, Ange gardien, Tapageur, Mouchard, Détective, Juge, Métamorphe, Spectre et Vipère. Salons publics ou privés avec code, mode Entraînement, et chat vocal de proximité qui sépare strictement les vivants des fantômes.',
  features: ['voice', 'vibration', 'online'], activities: ['Partie en ligne', 'Entraînement', 'Salon privé avec code'],
  trophies: [
    T('Première tâche', 'Terminer une tâche', 'bronze'),
    T('Démasqué', 'Éjecter un Imposteur', 'silver'),
    T('Imposteur parfait', 'Gagner en tant qu’Imposteur', 'gold'),
    T('Équipage soudé', 'Gagner en tant qu’Équipier', 'silver'),
    T('Perfectionniste', 'Obtenir tous les autres trophées', 'platinum'),
  ] });
export const byId = Object.fromEntries(GAMES.map(g => [g.id, g]));

export const FONT = {
  cinzel: "'Cinzel', serif", bebas: "'Bebas Neue', sans-serif", syncopate: "'Syncopate', sans-serif", unbounded: "'Unbounded', sans-serif",
  cormorant: "'Cormorant Garamond', serif", teko: "'Teko', sans-serif", josefin: "'Josefin Sans', sans-serif", shoulders: "'Big Shoulders Display', sans-serif",
  anton: "'Anton', sans-serif", rajdhani: "'Rajdhani', sans-serif", playfair: "'Playfair Display', serif", luckiest: "'Luckiest Guy', sans-serif", lilita: "'Lilita One', sans-serif",
};

export const FEATURES = {
  vibration: 'Retour haptique', triggers: 'Gâchettes adaptatives', audio3d: 'Audio 3D', hdr: 'HDR', online: 'Jeu en ligne', voice: 'Micro et reconnaissance vocale',
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
