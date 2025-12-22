# Changelog

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
