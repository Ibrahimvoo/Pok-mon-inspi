# Console UI — concept inspiré de la PS5

Une expérience web qui reproduit l’ergonomie de la PS5 : démarrage, création de compte, choix de l’utilisateur, écran d’accueil, hub de jeu, PlayStation Store, fiches produit, bibliothèque, recherche, profil, Base de jeu (amis, groupes, appels vocaux), centre de contrôle, menu Créer, paramètres. Jouable à la **manette**, au **clavier**, à la **souris** et au **toucher**, dans Safari, Chrome, Firefox ou Edge (ordinateur, iPad, iPhone en paysage).

> Projet de démonstration **non officiel**, ni affilié à Sony Interactive Entertainment ni approuvé par elle. Le jeu et ses visuels sont originaux ; les achats sont simulés. La console ne contient plus qu’un seul jeu, **Pouf Party**, un vrai jeu jouable (voir plus bas) : les 18 jeux fictifs du catalogue d’origine ont été retirés (leurs illustrations restent disponibles comme photos de profil). Le **multijoueur, les comptes et les appels vocaux sont réels** et fonctionnent dès que le serveur est lancé.

## Jouer avec un ami sans rien installer (salons)

Ouvrez la console (par exemple https://ibrahimvoo.github.io/Pok-mon-inspi/ps5/), créez votre profil, puis **avatar → Base de jeu → Créer un salon** : le lien est partagé (Messages, WhatsApp…). Votre ami l’ouvre, crée son profil et rejoint directement : chat vocal sans casque, discussion et parties partagées. Les deux appareils sont reliés en direct (WebRTC) après une mise en relation par le service gratuit PeerJS ; aucun serveur à déployer. Si iOS recharge la page, le salon se rétablit tout seul. Safari et l’app ajoutée à l’écran d’accueil jouent ensemble (sur iPhone, un lien s’ouvre toujours dans Safari : depuis l’app, saisissez le code). Si l’hôte est parti envoyer le lien depuis une autre app, son ami patiente jusqu’à 40 s au lieu d’échouer ; dans Pouf Party, si un invité a repris la partie pendant l’absence de l’hôte, celui-ci la rejoint à son retour au lieu de rester seul dans un second salon. Les codes à 5 caractères (partie Pouf Party) et à 6 caractères (salon) sont acceptés aux deux endroits. Sur certains réseaux mobiles très stricts, la connexion directe peut échouer : le Wi-Fi fonctionne en général.

## Pouf Party — un vrai jeu multijoueur 3D dans la console

**Pouf Party** est un jeu de party game original, jouable pour de vrai depuis la console : sélectionnez sa jaquette sur l’accueil (ou dans la bibliothèque / le PlayStation Store, où il est gratuit et déjà installé), ouvrez sa fiche puis **Jouer**. Le jeu se lance en plein écran ; le bouton PS (ou P, ou le pavé tactile sur iOS) ouvre le centre de contrôle, et *Quitter le jeu* ramène à l’accueil.

- **Descentes en bouée (coopération)** : jusqu’à 4 critters sur une bouée ; chacun pousse la bouée depuis son côté à coups de « pouf ». Quatre rivières : *La Descente du Lagon Rose* (reprise des épreuves de référence : rondins à piques, mâchoires, mines, moulins, barres-marteaux, scies, tourbillon, toboggan), *Les Rapides du Glacier* (icebergs, geysers, troncs à la dérive), *Le Marais au Crépuscule* (crocodiles, mines toxiques) et *Les Cascades Turquoise* (trois chutes d’eau dans la jungle, tourniquets à piques qui balaient la rivière : on passe en serrant la berge). Trois coups et la bouée éclate : tout le monde repart du dernier checkpoint validé.
- **Courses à pied** : *Le Parcours Pétillant* (barres tournantes, plateformes mobiles, marteaux, bumpers, disques qui tournent, tremplin) et *La Grande Glissade* (glace glissante, croix tournante, tapis roulant, ascenseurs). Le premier arrivé gagne, classement à l’arrivée.
- **Survie** : *Le Grand Tourbillon* (les barres accélèrent, le sol s’enfonce) et *La Patinoire Folle* (bumpers qui foncent, coins qui fondent) ; le dernier debout gagne.
- **Mode tournoi** : l’hôte enchaîne six épreuves ; chacune rapporte des points (rang en course et en survie, étoiles de l’équipe en descente) et le meilleur total gagne.
- **En ligne entre amis** : *Jouer* crée un salon avec un code à 5 caractères ; les amis choisissent *Rejoindre une partie* ou ouvrent le lien `…#pouf=CODE`. Les membres d’un groupe ou d’un salon de la console arrivent automatiquement dans le même salon, et les amis en ligne peuvent être invités depuis le jeu. Connexion directe WebRTC (mise en relation PeerJS), l’hôte calcule la partie et les autres reçoivent l’état 20 fois par seconde ; si l’hôte part, un autre joueur reprend le salon. Sans connexion, le jeu reste jouable en solo.
- **Progression** : personnages (6 espèces), couleurs, chapeaux, accessoires, couleur du gaz, emotes, XP, niveaux, pièces pour débloquer, étoiles, records de la console, trophées de la console.
- **Commandes** : clavier (ZQSD ou WASD, Espace, Maj/E, R, 1-6, Échap), souris (clic pour capturer la caméra), manette (sticks, ✕/R2, □/R1, △, croix directionnelle, Options) et écran tactile (joystick et boutons).

Le jeu est isolé dans `src/games/pouf/` (chargé à la demande : la console ne télécharge three.js qu’au lancement du jeu) ; `src/games/registry.js` déclare les jeux réellement jouables. Pouf Party est intégré à la console : il est toujours installé et ne peut pas être supprimé. Les visuels de la jaquette sont rendus avec le moteur du jeu (`npm run art:pouf`).

## Caméra et partage de la partie

Pendant un appel vocal de groupe ou de salon, un panneau vidéo apparaît à droite de l’écran (aussi au-dessus du jeu) ; les mêmes commandes sont dans la *Base de jeu → Groupe* et dans le *centre de contrôle*.

- **Caméra** : activée uniquement après un toucher (le navigateur demande l’autorisation), indicateur rouge tant qu’elle filme, bouton *caméra avant / arrière* quand l’appareil en a deux, indépendante du micro (couper l’un ne coupe pas l’autre). Les caméras des amis s’affichent quand ils l’activent ; toucher une vignette l’agrandit.
- **Partager la partie** : vos amis voient votre partie de Pouf Party en direct, avec le son du jeu. Seule l’image du jeu est transmise (copie réduite du rendu 3D) : cela fonctionne aussi sur iPhone et iPad, où Safari et les apps de l’écran d’accueil ne permettent pas de partager l’écran.
- **Partager l’écran** (ordinateur : Chrome, Edge, Firefox, Safari macOS) : fenêtre, onglet ou écran entier ; le bouton « Arrêter le partage » du navigateur est pris en compte. Le bouton n’est pas proposé là où la fonction n’existe pas.
- **Sécurité** : la vidéo passe par les mêmes connexions WebRTC chiffrées que la voix, uniquement entre les membres du vocal d’un même groupe ou salon (le serveur et l’hôte du salon refusent tout autre relais). Raccrocher coupe la caméra et le partage ; rien ne continue de filmer en arrière-plan.

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
npm test          # API + WebSocket (SQLite en mémoire) + physique de Pouf Party (bouée, pièges, checkpoints, course à pied)
npm run test:pg   # mêmes contrôles de stockage sur un vrai PostgreSQL
npm run e2e:salon # salons sans serveur : vocal, discussion, partie partagée, reprise après rechargement
npm run e2e:resume # hôte mis en arrière-plan (page gelée) : l’ami patiente puis rejoint, reprise de la partie sans salon en double
npm run e2e:video  # caméra dans les deux sens, partage de la partie et de l’écran, arrêt, refus d’autorisation, raccrocher
npm run e2e:touch # écran tactile de téléphone : carte utilisateur, photo de profil, profil, amis, menus, ancienne sauvegarde Safari, lancement du jeu
npm run e2e       # deux navigateurs réels : inscription, amis, appel vocal (micro simulé), session partagée, coupure réseau, interruption + rechargement
npm run e2e:pouf  # Pouf Party : partie en ligne à deux (bouée et course), clavier, manette, tactile, survie, retour à la console
```

## Diagnostic sur l’appareil

- *Paramètres → Son → Diagnostic audio* : état de la lecture, session audio iOS, micro de l’appel, boutons **Tester le son** et **Tester le micro** (pour distinguer un problème de lecture d’un problème de micro, avec le haut-parleur, des écouteurs ou des AirPods).
- *Paramètres → Système → Journal des interruptions* : arrière-plan, rechargements, restaurations, et désormais les changements de sortie audio (écouteurs branchés ou retirés), les relances du son et du micro.
- *Pouf Party → Options → Journal des dégâts* : chaque coup, éclatement ou renversement avec le piège responsable (type et numéro), la cause, la position (sur la rivière ou dans le niveau), le temps de la partie, l’heure et la source (simulation de l’hôte ou reçu de l’hôte). Avec `?pfdebug` dans l’adresse, ces entrées sont aussi écrites dans la console.

## Technique

Vite + JavaScript natif (sans framework), serveur Node 22 (`http`, `ws`, `node:sqlite` ou `pg`), arrière-plan WebGL avec cartes de profondeur, audio synthétisé (Web Audio), visuels originaux rendus par `tools/art/shader.glsl` (`npm run art`). Polices open source via Fontsource (OFL).
