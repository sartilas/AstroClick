# Changelog

## [2.0.0] - 2026-06-12

### Added
- **☄️ Comète de Halley** : orbite rétrograde très excentrique (inclinaison 162°), noyau voxel glacé, coma lumineuse et deux queues de particules (ionique bleue + poussière incurvée) qui s'allongent à l'approche du Soleil. Fiche éducative traduite en 6 langues.
- **Visite guidée** : la caméra enchaîne automatiquement les 11 étapes (Soleil → Pluton + Halley) avec fiche info, barre de contrôle flottante (précédent/suivant/stop). Compatible système Kerbol.
- **Barre de recherche** : recherche insensible aux accents dans les noms traduits, vol caméra vers l'objet sélectionné.
- **Positions à une date** : calendrier (1900-2100) basé sur les longitudes moyennes J2000 des 8 planètes + Pluton. Pause automatique et toast de confirmation à l'application.
- **Quiz Spatial** : 8 questions générées depuis les données (lunes, faits, températures, distances), traduites, avec meilleur score persistant (localStorage).
- **Comparateur de planètes** : tailles relatives visuelles, ratio, tableau comparatif traduit (diamètre, température, lunes, période, distance).
- **Mode photo** : capture PNG du canvas avec fond reconstitué et filigrane AstroClick.
- **Halo solaire** (SunGlow) : couronne procédurale à deux couches avec pulsation, hors mode RTX.
- **Double couche d'étoiles** pour la profondeur de parallaxe.
- **En-têtes de sécurité HTTP** : CSP complète, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

### Changed
- **Migration majeure** : Next.js 14 → 15.5.19, React 18 → 19, React Three Fiber 8 → 9, drei 9 → 10, three 0.160 → 0.180, postprocessing v3, framer-motion v12 (corrige les CVE de l'Image Optimizer Next 14).
- **Performances** : positions des corps résolues une fois par frame dans PhysicsManager (au lieu de ~300 traversées de scène/frame), buffers de couleurs voxel envoyés en un seul transfert GPU, suppression des allocations par frame (Vector3/Color/Object3D), shadow map solaire 4096→2048, dpr plafonné à 2.
- **Labels 3D** : textes satellites/Lagrange/zone habitable convertis de troika `<Text>` (shaders incompatibles three 0.180) vers des labels DOM, cohérents avec les labels de survol des planètes.
- **UI harmonisée** : modales Quiz et Comparateur alignées sur l'identité du site (titres en dégradé, sous-titres mono).
- **Image Docker** : node:18-alpine (EOL) → node:22-alpine.
- **Audio** : son d'explosion auto-hébergé (`/explosion.mp3`) au lieu du CDN Pixabay.

### Fixed
- **Popover calendrier** invisible (clippé par l'`overflow-x-auto` du dock) → repositionné en `fixed` au-dessus du dock.
- **Ghosting RTX** : `renderer.autoClear` non restauré à la désactivation de l'EffectComposer, provoquant des traînées d'accumulation avec `preserveDrawingBuffer`.
- **Halo solaire amplifié par le bloom en RTX** → masqué en mode RTX.
- **Écran de chargement bloqué** dans les onglets en arrière-plan (rAF suspendu) → fallback par timer.
- **Quiz** : le nom de l'objet n'apparaît plus dans les questions « à quel objet correspond ce fait ».
- **Mémoïsation cassée** de SatelliteMesh (callback inline) et tick UI multi-frames (modulo) dans PhysicsManager.
- **Trail satellites** retiré (meshline rend une géométrie plein écran avec three 0.180) — lueur moteur conservée.

### Security
- CSP stricte (connect-src limité à NASA + Umami, frame-ancestors 'none').
- Suppression du protocole HTTP autorisé pour les images NASA.
- `npm audit` : 10 → 2 vulnérabilités (les 2 restantes : postcss embarqué dans Next, outil de build uniquement).

## [1.4.2] - 2026-01-04

### Added
- **Traductions Paradoxe de Fermi**: Ajout des traductions complètes pour la modal du Paradoxe de Fermi dans toutes les langues (EN, FR, ZH, ES, HI, RU).
  - Titre, introduction, théories (Grand Filtre, Terre Rare, Silence Radio, Forêt Sombre).
  - Calculateur de l'Équation de Drake traduit dans toutes les langues.
- **Section alienShip**: Traductions pour le tooltip du vaisseau alien ("Signal Détecté", "Paradoxe de Fermi").

### Fixed
- **James Webb au Point L2**: Le télescope spatial James Webb orbite désormais correctement au point de Lagrange L2, synchronisé avec la Terre.
  - Paramètres orbitaux (excentricité, périapside, inclinaison) alignés avec ceux de la Terre.
  - Distance scientifique corrigée (151.1 millions km du Soleil).
  - Période orbitale corrigée de "6 mois" à "1 an (synchrone avec la Terre)".
- **Erreur Client-Side Fermi**: Correction de l'erreur qui se produisait lors du survol/clic sur le vaisseau du Paradoxe de Fermi (traductions manquantes).

## [1.4.1] - 2026-01-02

### Added
- **Traduction Russe (RU)**: Ajout complet du support de la langue russe pour l'interface et tous les objets célestes (Système Solaire + Kerbol).
- **Sélecteur de Langue**: Interface avec drapeaux (🇫🇷🇬🇧🇷🇺🇪🇸🇨🇳🇮🇳) dans le dock pour changer de langue manuellement.

### Fixed
- **Habitable Zone**: Le label "Zone Habitable" est maintenant correctement traduit dans toutes les langues.
- **SEO**: Ajout de `ru-RU` aux URL alternatives et aux métadonnées Schema.org.

## [1.4.0] - 2025-12-25

### Added
- **Nouveaux Corps Célestes**: Ajout de Cérès, Phobos, Deimos, Io, Europe, Ganymède, Callisto, Titan, Encelade, Titania, Triton et Charon avec traductions complètes (FR, EN, ES, ZH, HI).
- **Mécanique Orbitale 3D**: Implémentation d'orbites képlériennes réalistes (excentricité, inclinaison, nœud ascendant).
- **Améliorations Visuelles**: Génération procédurale pour les géantes gazeuses (bandes de Jupiter, GRS, couleurs précises pour Saturne, Uranus, Neptune).

### Changed
- **Optimisation Majeure**: Refonte de `VoxelSphere` et `CelestialBody` (React.memo, cache global de couleurs, matrices de rotation pré-calculées). Réduction drastique de la charge CPU/Mémoire.
- **Traductions**: Corrections pour l'espagnol (Moho, Dres) et l'hindi (Éris, Makemake, Haumea).
- **Espacement Orbital**: Ajustement des distances en mode "Simplifié" pour éviter les collisions (Mercure/Soleil, Astéroïdes).
- **Codebase**: Nettoyage du code redondant et suppression des calculs inutiles.

## [1.3.3] - 2025-12-22

### Fixed
- **SEO Favicon**: Correction de la configuration des icônes pour Google (suppression des métadonnées conflictuelles).
- **Robots.txt**: Autorisation du dossier `_next` pour permettre le crawl des assets par Googlebot.

## [1.3.2] - 2025-12-22

### Changed
- **Contact**: Ajout d'une icône Mail et uniformisation du style pour le lien de contact dans la fenêtre "À propos".
- **Version**: Mise à jour du numéro de version.

## [1.3.1] - 2025-12-20

### Fixed
- **Traductions KSP**: Ajout des traductions complètes pour tous les corps célestes du système Kerbol (FR, EN, ES, ZH, HI).
- **Bug "Mars" → "March"**: Correction de la traduction automatique du navigateur qui transformait "Mars" en "March" (attribut `translate="no"`).
- **Bug "Vall" → "Valley"**: Correction du label incorrect sur la lune Vall (KSP).
- **Collision Minmus/Gilly**: Rééquilibrage des distances orbitales dans le système Kerbol pour éviter les chevauchements visuels.

### Changed
- **Performance**: Réduction du temps de chargement de 5s à 1.5s.
- **UI**: Suppression des badges "SEO Optimisé" et "PWA Ready" du modal À propos.

## [1.3.0] - 2025-12-20

### Added
- **SEO & Référencement Google**:
    - Fichier `robots.ts` pour le crawling des moteurs de recherche (Googlebot, Bingbot).
    - Fichier `sitemap.ts` dynamique avec support multilingue (FR, EN, ES, ZH, HI).
    - Métadonnées Open Graph complètes pour le partage sur Facebook/LinkedIn.
    - Twitter Cards pour un aperçu riche sur Twitter.
    - Données structurées JSON-LD (Schema.org) pour les résultats enrichis Google.
    - Configuration PWA avec `manifest.json`.
    - Balises `hreflang` pour le SEO international.
- **UI/UX**:
    - Badges "SEO Optimisé" et "PWA Ready" dans la modal À propos.
    - Lien vers astroclick.org dans la modal À propos.
    
### Changed
- Langue HTML passée de `en` à `fr` pour correspondre au contenu principal.
- Métadonnées enrichies avec mots-clés, auteurs, et descriptions optimisées.
- Ajout de preconnect/dns-prefetch pour les images NASA (performance).

## [1.2.0] - 2025-12-18

### Added
- **Satellite Vizualisation**:
    - Added visible orbit lines for major satellites (Moon, Europa, Titan, etc.).
    - Interactive orbit tooltips with information and navigation links.
    - Dynamic coloring of orbits based on parent planet.
- **UI/UX**:
    - Added "Reset View" button to quickly return to default camera position.
    - Added "Dev" badges for experimental features (RTX, Orbit Scale).
    - Improved accessibility and labels.

### Changed
- Refined satellite distances in 'Real Scale' mode for better visibility.
- improved navigation controls.

## [1.1.0] - 2025-12-17

### Added
- **New Visualization Layers**:
    - Habitable Zone (Green visualizer)
    - Gravity Wells (Space-time grid distortion)
    - Lagrange Points (L1-L5 network visualization)
- **Audio**: New background track "Cinematic Ambient Sci-Fi".
- **Visuals**:
    - "RTX Mode" integration into the main HUD.
    - Shooting Stars effect background.
    - Improved cursor interactions (Rocket Cursor).
    - Leaderboard component (foundation).
    - Physics Manager implementation.

### Changed
- **UI/UX**:
    - Consolidated Orbit Scale and Layer controls into a single "Simulation View" panel.
    - Updated HUD aesthetics (glassmorphism, compact icons).
    - Migrated separate "RTX" button to the main toolbar.
    - Refactored `SolarSystem` to handle state via props.
- **Rendering**:
    - Enhanced celestial colors (Saturn rings, Asteroid belt).
    - Improved Voxel representations.

### Fixed
- Fixed black color issues on Saturn's rings and asteroid belt.
- Removed duplicate translation keys.
- Resolved UI overlap issues between Orbit Scale and Layer controls.
