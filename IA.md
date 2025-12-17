# Documentation du Projet AstroClick (IA.md)

Ce document sert de référence technique et fonctionnelle pour les agents IA travaillant sur le projet.

## 1. Vue d'ensemble
**AstroClick** est une application web éducative interactive en 3D permettant d'explorer le système solaire. Elle adopte un style visuel "Voxel" (cubique) et propose des fonctionnalités ludiques comme le lancement de satellites.

### Stack Technique
- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **3D / Rendu** : Three.js via `@react-three/fiber` (R3F) et `@react-three/drei`.
- **Styling** : Tailwind CSS avec des dégradés et effets de verre (Glassmorphism).
- **Icons** : Lucide-react.

## 2. Structure du Projet
```
/app
  page.tsx          # Point d'entrée principal. Gère l'état global (UI, audio, sélection).
  layout.tsx        # Layout racine (fontes, métadonnées).
  globals.css       # Styles globaux et animations Tailwind custom.

/components
  SolarSystem.tsx   # Scène 3D principale. Contient le Canvas R3F.
  Scene             # Composant interne de SolarSystem qui gère l'éclairage et les objets.
  CelestialBody.tsx # Représente une planète ou un astre. Gère son orbite et ses satellites.
  Sun.tsx           # Composant spécifique pour le Soleil (lumière, glow).
  AsteroidBelt.tsx  # Génère et anime la ceinture d'astéroïdes (instances de cubes).
  PhysicsManager.tsx # Gère la simulation des fusées/satellites (lancement, gravité, collision, designs).
  Leaderboard.tsx   # Affiche le classement des satellites (Overlay HTML).
  ShootingStars.tsx # Effet visuel d'étoiles filantes en arrière-plan.
  InfoCard.tsx      # Carte d'information affichée lors de la sélection d'un astre.
  LoadingScreen.tsx # Écran de chargement initial.
  RocketCursor.tsx  # Remplace le curseur par une fusée 3D (mode interactif).
  types.ts          # Définitions TypeScript partagées (Rocket, Explosion).

/data
  solarSystemData.ts # Données statiques des planètes (taille, distance, vitesse, couleur, description).
  dictionary.ts      # Traductions (FR, EN, ES, etc.) pour l'internationalisation.
```

## 3. Fonctionnalités Clés

### Système Solaire
- **Orbites** : Les planètes orbitent autour du Soleil. Deux modes : "Simplifié" (échelles réduites pour visibilité) et "Réel" (distances énormes).
- **Voxel Design** : Utilisation de `VoxelSphere` (sphères composées de petits cubes) pour un look rétro-futuriste.
- **Interactivité** : Clic sur une planète pour zoomer et afficher sa fiche d'info (`InfoCard`).

### Mini-Jeu Satellites (`PhysicsManager`)
- **Lancement** : Appuyer sur `Espace` ou activer le mode "Rocket Cursor" pour lancer des satellites.
- **Physique** : Simulation simple de gravité (attraction par les planètes) et d'un "attracteur" de souris temporaire.
- **Designs Aléatoires** : 10 modèles de satellites différents générés aléatoirement lors du lancement.
- **Leaderboard** : Tableau des scores persistants (distance parcourue) affiché en haut à gauche.

### Interface (HUD)
- **Contrôles** : Musique, Volume, Thème (Noir/Gradient), Vitesse de simulation, Mode Orbite.
- **Internationalisation** : Support multi-langues via un sélecteur simple.

## 4. Conventions de Code
- **États** : L'état global (sélection, langue, options) est dans `page.tsx` et passé via props.
- **3D** : Tout ce qui est rendu dans `<Canvas>` doit être un composant R3F. Pas de hooks HTML/DOM directs dans le Canvas sans `<Html>`.
- **Performance** : Utilisation de `useFrame` pour les animations (orbites, physique). Préférence pour `InstancedMesh` si beaucoup d'objets (ex: astéroïdes).

## 5. Ressources
- **Musique** : `/public/cinematic-ambient-sci-fi.mp3`
- **Logo** : `/public/logo.png`
