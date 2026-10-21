# Console UI — concept inspiré de la PS5

Une expérience web qui reproduit l’ergonomie de la PS5 : démarrage, création de compte, choix de l’utilisateur, écran d’accueil, hub de jeu, PlayStation Store, fiches produit, bibliothèque, recherche, profil, Base de jeu (amis, groupes, appels vocaux), centre de contrôle, menu Créer, paramètres. Jouable à la **manette**, au **clavier**, à la **souris** et au **toucher**, dans Safari, Chrome, Firefox ou Edge (ordinateur, iPad, iPhone en paysage).

> Projet de démonstration **non officiel**, ni affilié à Sony Interactive Entertainment ni approuvé par elle. Les 18 jeux et leurs visuels sont fictifs ; les achats et les jeux sont simulés. Le **multijoueur, les comptes et les appels vocaux sont réels** et fonctionnent dès que le serveur est lancé.

## Jouer avec un ami sans rien installer (salons)

Ouvrez la console (par exemple https://ibrahimvoo.github.io/Pok-mon-inspi/ps5/), créez votre profil, puis **avatar → Base de jeu → Créer un salon** : le lien est partagé (Messages, WhatsApp…). Votre ami l’ouvre, crée son profil et rejoint directement : chat vocal sans casque, discussion et parties partagées. Les deux appareils sont reliés en direct (WebRTC) après une mise en relation par le service gratuit PeerJS ; aucun serveur à déployer. Si iOS recharge la page, le salon se rétablit tout seul. Sur certains réseaux mobiles très stricts, la connexion directe peut échouer : le Wi-Fi fonctionne en général.

## Démarrer

```bash
npm install
npm run serve        # compile le client puis lance le serveur → http://localhost:8080
```

Développement : `npm start` (serveur sur :8080) dans un terminal et `npm run dev` (Vite, qui relaie `/api` et `/ws` vers le serveur) dans un autre.

Sans serveur (fichiers statiques seuls, GitHub Pages, aperçu claude.ai), l’application démarre en **mode hors ligne** : profil local, toute l’interface disponible, multijoueur et appels désactivés avec une explication.

## Déployer (multijoueur et appels sur iPhone)

Les appels vocaux exigent **HTTPS** (Safari refuse le micro sinon). Le serveur sert à la fois le client, l’API et le WebSocket : un seul service à déployer.

- **Render (gratuit)** : *New → Blueprint* → choisir ce dépôt. `render.yaml` crée le service web et une base PostgreSQL gratuite. L’adresse `https://…onrender.com` s’ouvre ensuite dans Safari. (Sur l’offre gratuite, le service s’endort après 15 min d’inactivité et la base PostgreSQL gratuite de Render expire après 30 jours : utilisez une base Neon ou Supabase gratuite via `DATABASE_URL` pour la garder.)
- **Docker** : `docker build -t ps5-ui . && docker run -p 8080:8080 -v ps5data:/app/data ps5-ui` (SQLite dans le volume), derrière un reverse proxy HTTPS.

| Variable | Rôle |
| --- | --- |
| `PORT` | Port d’écoute (8080 par défaut) |
| `DATABASE_URL` | `postgres://…` pour PostgreSQL, sinon chemin du fichier SQLite (`data/ps5ux.sqlite`) |
| `TRUST_PROXY=1` | Derrière un proxy HTTPS (Render, Fly, Nginx) : cookies `Secure`, IP réelle |
| `ALLOWED_ORIGINS` | Origines supplémentaires autorisées (séparées par des virgules) |
| `STUN_URLS` | Serveurs STUN (Google et Cloudflare par défaut) |
| `TURN_URL`, `TURN_SECRET` | Serveur TURN (coturn `use-auth-secret`) pour les réseaux mobiles stricts : identifiants temporaires générés côté serveur, le secret ne quitte jamais le serveur |

## Fonctionnalités en ligne

- **Comptes** : au premier lancement, création du compte (identifiant en ligne unique, mot de passe, avatar) avec validation côté client et côté serveur ; connexion, déconnexion, changement d’avatar, plusieurs comptes sur la même console (« Qui utilise cette manette ? »).
- **Amis** : recherche par identifiant, demandes envoyées / reçues en temps réel, acceptation, suppression, statut en direct (en ligne, joue à…, dans un groupe, vu il y a…).
- **Groupes et sessions** : invitations, rejoindre le groupe ouvert d’un ami, discussion écrite, lancement d’un jeu partagé (les membres sont invités à rejoindre la partie), viseurs et signaux synchronisés en temps réel pendant la session.
- **Appels vocaux** : WebRTC entre les membres du groupe, avec annulation d’écho, réduction du bruit et gain automatique pour parler **sans casque** (micro et haut-parleur de l’appareil). Muet, volume par membre (sauf iOS), indicateur de parole, reprise du micro et renégociation après une interruption, la musique de la console se coupe pendant l’appel.
- **Robustesse** : reconnexion automatique avec délai croissant, détection des connexions mortes (ping), délai de grâce de 15 s côté serveur pour ne pas sortir un joueur de son groupe lors d’un rechargement ou d’un changement d’app, gestion des erreurs réseau et des refus de micro avec des messages clairs.

## Bouton PS de la manette sur iPhone / iPad

Sur iOS, **le bouton Home (PS) est réservé au système** : un appui ouvre l’app Jeux d’Apple et met Safari en arrière-plan. Une page web ne peut pas l’empêcher (seule une app native peut désactiver ce geste via `GCController…preferredSystemGestureState`), et l’API Gamepad de Safari ne transmet pas ce bouton. Ce que fait l’application :

- le centre de contrôle s’ouvre aussi avec le **pavé tactile** ou en **maintenant Options** (et les indications à l’écran l’affichent sur iOS) ;
- au retour, les boutons sont réinitialisés (aucune action fantôme), l’audio, le WebSocket et le micro sont relancés ;
- si iOS a déchargé la page, l’écran, le jeu en cours et la session sont **restaurés automatiquement** sans repasser par le démarrage, et le groupe est conservé ; le vocal est reproposé (iOS exige un geste pour rouvrir le micro) ;
- *Paramètres → Système → Journal des interruptions* montre ce que le système a fait (arrière-plan, gel, rechargement, restauration).

## Commandes

| Action | Manette | Clavier | Souris / toucher |
| --- | --- | --- | --- |
| Naviguer | Croix, stick gauche | Flèches | Survol / balayage |
| Valider / Retour | ✕ / ○ (inversables) | Entrée / Échap | Clic / bouton ‹ |
| Onglets | L1 / R1 | Q / E | — |
| Options | Options | O | « … » |
| Centre de contrôle | PS, pavé tactile, maintenir Options | P | bouton tactile |
| Créer (captures) | Share / Créer | C | — |
| Recherche | — | / | loupe |

## Sécurité

Mots de passe hachés avec scrypt (sel aléatoire), jamais stockés sur l’appareil ; session par jeton aléatoire stocké haché en base, cookie `HttpOnly`, `SameSite=Lax`, `Secure` en HTTPS, expiration glissante de 30 jours ; contrôle d’origine sur les écritures et le WebSocket ; limites de débit (inscription, connexion, recherches, demandes d’ami, messages) ; en-têtes de sécurité et CSP stricte ; seules les données publiques (identifiant, avatar, statut) sont visibles par les amis ; le relais WebRTC n’est accepté qu’entre membres vocaux d’un même groupe ; aucune clé secrète côté client.

## Tests

```bash
npm test          # API + WebSocket (SQLite en mémoire)
npm run test:pg   # mêmes contrôles de stockage sur un vrai PostgreSQL
npm run e2e:salon # salons sans serveur : vocal, discussion, partie partagée, reprise après rechargement
npm run e2e       # deux navigateurs réels : inscription, amis, appel vocal (micro simulé), session partagée, coupure réseau, interruption + rechargement
```

## Technique

Vite + JavaScript natif (sans framework), serveur Node 22 (`http`, `ws`, `node:sqlite` ou `pg`), arrière-plan WebGL avec cartes de profondeur, audio synthétisé (Web Audio), visuels originaux rendus par `tools/art/shader.glsl` (`npm run art`). Polices open source via Fontsource (OFL).
