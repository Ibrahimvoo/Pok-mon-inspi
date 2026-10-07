# Relais MQTT de test (sans npm)

Quand `npm i aedes ws` est impossible (registre bloqué), ces deux mini-modules les remplacent pour les tests à plusieurs :

    NETMOD=$PWD/tools/relais/node_modules node tools/net2.mjs tools/scn-v15-duo.js   (chemin absolu obligatoire)

- `ws` : serveur WebSocket minimal (poignée de main, trames binaires, ping, fermeture, sous-protocole `mqtt`).
- `aedes` : relais MQTT 3.1.1 minimal (CONNECT avec testament et identifiants, SUBSCRIBE, PUBLISH QoS 0/1, PING, DISCONNECT),
  avec les crochets `authorizeForward` (DROP) et `authenticate` (AUTH) utilisés par `net2.mjs`.
