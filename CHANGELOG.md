# Changelog

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
