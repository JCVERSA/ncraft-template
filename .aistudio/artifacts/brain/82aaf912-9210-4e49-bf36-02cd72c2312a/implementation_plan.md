# Nebula Arcade // 16-Bit Bedrock Cartridge Engine

Console de gestion et simulateur interactif pour serveur Minecraft Bedrock Dedicated Server (BDS), inspirée de l'esthétique néo-brutaliste rétro-arcade 16-bit des bornes d'arcade japonaises et de l'univers géologique du Nether.

## User Review & Critical Decisions

> [!IMPORTANT]
> Les trois choix fonctionnels et visuels confirmés lors de la phase de clarification :
> - **Niveau de fonctionnalité** : Simulateur interactif complet avec logs temps réel, modification dynamique de `server.properties`, gestion des joueurs/OPs avec XUID, pipeline de déploiement à 5 étapes avec mascotte animée et terminal CRT interactif acceptant les commandes console (`/op`, `/say`, `/stop`, `/kick`, `/whitelist`, `/tps`, etc.).
> - **Modes d'affichage & Responsive** : Bascule fluide et adaptative automatique avec barre de contrôle permettant de tester directement l'affichage **Bureau (3 colonnes arcade cabinet)** ou **Mobile (console portable 440px avec bouton d'action flottant FAB)**.
> - **Effets sonores rétro 16-bit** : Générateur audio Web Audio API synthétisant en temps réel les bruits d'insertion de pièce ("coin"), bips CRT, clics mécaniques, alerte K.O., et jingle de démarrage avec bouton mute/volume accessible.

## 1. Overview & Core Concept

- **Expérience utilisateur** : Une console d'administration de serveur de jeu sous forme de meuble d'arcade physique rétro 16-bit. L'opérateur peut insérer des crédits, flasher la ROM BDS Minecraft, modifier les règles de jeu (motd, max-players, mode Survie/Créatif/Aventure, distance de vue, cheats), gérer les opérateurs autorisés (XUID), déclencher des étapes de pipeline de déploiement et exécuter des commandes en direct sur un écran CRT à lignes de balayage vertes phosphorées.
- **Public cible** : Administrateurs de serveurs Minecraft Bedrock, fans de rétro-gaming et amateurs d'interfaces néo-brutalistes aux couleurs tranchées.
- **Valeur clé** : Rendre la gestion technique d'un serveur Bedrock ludique, visuelle et tactile, tout en restant rigoureusement fidèle au fichier `server.properties` et aux identifiants XUID réels.

## 2. User Experience & Visual Design

### Design System & Identité Visuelle
- **Style esthétique** : Néo-brutalisme arcade 16-bit avec ombres nettes portées noires (`box-shadow: 6px 6px 0px #000`), bordures épaisses de 4px, typographies pixélisées et stickers animés.
- **Palette de couleurs principale** :
  - Jaune Arcade : `#FFE600` (cartes de configuration, boutons d'action)
  - Rose Néon : `#FF4D8D` (emplacement de la cartouche, boutons K.O., alertes)
  - Cyan Fluo : `#00F0FF` (pipeline de déploiement, tags de connexion, invite CLI)
  - Violet Magma : `#9333EA` / `#A855F7` (bandeau titre console, liste des opérateurs)
  - Vert Émeraude : `#22C55E` (télémétrie rang S, validations de build)
  - Fond Écran & Trame : `#0b0717` avec motif pointillé radial rétro (`radial-gradient`)
- **Typographies** :
  - Titres et boutons d'action : `Archivo Black` & `Space Grotesk`
  - Métriques et labels gamer : `Chakra Petch`
  - Textes rétro et cartouche : `Press Start 2P`
  - Logs console CRT et code technique : `JetBrains Mono`
- **Composants d'affichage** :
  - *Ticker Marquee défilant* : alertes système en direct, TPS (20.0), port en ligne.
  - *Cartouche physique 3D* : fentes d'aération rainurées, connecteur doré 8 broches, jaquette Nether Bastion SMP et sélecteur de version BDS.
  - *Pipeline de déploiement animé* : Mascotte "NPC: Master Librarian" avec bulle de dialogue, jauge de flash ROM, 5 étapes cliquables (Pass/Active/Wait/KO).
  - *Panneau server.properties tactile* : sélecteur de mode de jeu (Survie, Créatif, Aventure), sélecteur de difficulté, réglage pas-à-pas des slots de joueurs (1 à 100) et accordéon accordant les chunks et cheats.
  - *Gestionnaire d'opérateurs (XUID)* : cartes rétro avec kicks interactifs, détection de clé corrompue et modale d'enrôlement de joueur.
  - *Terminal CRT rétro* : écran bombé à balayage phosphoré vert (`#39ff14`), simulateur de logs continus et invite de commande interactive.

## 3. Key Product Decisions & Trade-Offs

- **Simulateur d'état réactif et persistant** :
  - *Approche retenue* : Moteur d'état React complet avec synchronisation en mémoire et dans le `localStorage`. La console simule des événements réalistes (connexions de joueurs, variations de TPS, logs de serveur périodiques) tout en réagissant instantanément aux modifications des formulaires.
  - *Pourquoi* : Offre une fluidité totale sans latence réseau ni dépendance externe fragile, avec la possibilité d'exporter/importer la configuration `server.properties` au format texte réel Minecraft.
- **Architecture de double vue (Desktop Cabinet & Mobile GameBoy)** :
  - *Approche retenue* : Un commutateur en haut de page permet d'alterner entre `Vue automatique (responsive)`, `Mode Bureau Arcade (3 colonnes)` et `Mode Portable Handheld (440px avec barre d'action FAB)` pour apprécier les deux rendus présentés dans les maquettes.
  - *Pourquoi* : Satisfait directement la demande du prompt en mettant en valeur les deux mises en page distinctes fournies.
- **Moteur audio Web Audio sans dépendance externe** :
  - *Approche retenue* : Synthétiseur de fréquences carré/triangle/bruit blanc natif (`AudioContext`) émulant fidèlement les puces PSG d'anciennes consoles 16-bit (bip de validation, jingle de démarrage d'insert coin, glitch d'erreur, clic de bouton).
  - *Pourquoi* : Pas de fichier audio externe susceptible d'échouer ou de charger lentement ; son instantané avec switch mute.

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEBULA ARCADE DASHBOARD                         │
├────────────────────────────────────────────────────────────────────────┤
│  Top Ticker Marquee (TPS, Port, World, Stability, Version Banner)      │
│  View Switcher Toolbar (Auto Responsive / Desktop 3-Col / Mobile Handheld) │
├────────────────────────────────────────────────────────────────────────┤
│                           MAIN CONSOLE HOOD                            │
│  - System Rev 2.0 Badge - IP:Port Quick-Copy - Stop/Start Daemon Toggle │
├────────────────────┬─────────────────────────┬─────────────────────────┤
│   LEFT COLUMN      │      CENTER COLUMN      │      RIGHT COLUMN       │
│  [Cartridge Slot]  │ [server.properties Cfg] │   [CRT Terminal 01]     │
│  - 3D ROM Boxart   │ - MOTD Banner           │ - Phosphor Scanlines    │
│  - Gold Pin Reveal │ - Level Name            │ - TPS/RAM/CPU Metrics   │
│  - BDS Version Sel │ - Game Mode Selector    │ - Live Server Logs Stream│
│  - HP Heart Meter  │ - Difficulty Stepper    │ - Coin Slot & CRT Reset │
│                    │ - Max Players & Ports   │ - Command Line Runner   │
│  [Deploy Pipeline] │ - Advanced Engine Chunks│                         │
│  - NPC Librarian   │                         │ [High Score Telemetry]  │
│  - 5-Step Pipeline │ [Player Roster // OPS]  │ - Packet Loss 0.00%     │
│  - Flash RAM Gauge │ - Enlist OP Modal       │ - Active Nether Chunks  │
│  - Mascot Triggers │ - Kick / Purge Handlers │ - Storage 24.2 GB Free  │
└────────────────────┴─────────────────────────┴─────────────────────────┘
```

### State Management & Handlers
- `serverConfig` : motd, level-name, gamemode ('survival' | 'creative' | 'adventure'), difficulty ('peaceful' | 'easy' | 'normal' | 'hard'), maxPlayers, port, viewDistance, simulationDistance, cheatsEnabled, worldSeed.
- `pipelineState` : currentStep (1-5), status ('RUNNING' | 'IDLE' | 'ERROR' | 'COMPLETED'), progressPercentage, npcDialogue, npcMood ('idle' | 'active' | 'fail').
- `rosterOps` : liste des opérateurs Minecraft avec gamertag, XUID, rôle ('OP LVL 4' | 'MODERATOR' | 'CORRUPT'). Actions : ajouter, kicker, purger.
- `consoleLogs` : tableau d'entrées horodatées avec tags de sévérité (`PASS`, `WARN`, `K.O.`, `CMD`, `INFO`).
- `arcadeAudio` : déclencheurs sonores pour chaque bouton, curseur et action.
