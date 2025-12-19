// Kerbol System Data (Kerbal Space Program)
// All celestial bodies from the KSP universe with Easter eggs and scientific data

import { SolarSystemObject } from './solarSystemData';

// Kerbol System uses its own scale - 1 Kerbin AU = 13,599,840 km
export const kerbolSystemData: SolarSystemObject[] = [
    // KERBOL (The Star)
    {
        id: 'kerbol',
        name: 'Kerbol',
        type: 'star',
        color: '#FFD700', // Gold - Jaune soleil brillant
        size: 5,
        scientificRadius: 261600, // km
        scientificDistance: 0,
        distance: 0,
        orbitSpeed: 0,
        rotationSpeed: 0.005,
        funFact: '⚠️ Easter Egg: In older KSP versions, descending below -250m caused a division by zero crash. There is no solid surface!',
        temperature: '5,840 K (surface)',
        realDistance: '0 km (Center)',
        averageDistanceToEarth: 'N/A (Kerbin reference)',
        orbitalPeriod: 'N/A (Center of orbit)',
        moons: 7, // 7 planets
        description: 'The yellow dwarf star at the center of the Kerbol System. Similar to our Sun, but much smaller. Its bright corona is visible during eclipses.'
    },

    // MOHO (Mercury Analog)
    {
        id: 'moho',
        name: 'Moho',
        type: 'planet',
        color: '#5C4033', // Marron foncé / Café
        size: 0.35,
        scientificRadius: 250, // km
        scientificDistance: 5263138, // km
        distance: 6,
        orbitSpeed: 1.8,
        rotationSpeed: 0.01,
        funFact: '🕳️ Easter Egg: The "Mohole" - A gigantic near-vertical hole at the North Pole, a terrain generation bug kept by devs because players loved it!',
        temperature: 'Extreme (No atmosphere)',
        realDistance: '5.26 million km from Kerbol',
        averageDistanceToEarth: '~8.3 Gm from Kerbin (varies)',
        orbitalPeriod: '~102 Kerbin days (~25 Earth days)',
        moons: 0,
        description: 'The closest planet to Kerbol. A scorched, airless world covered in craters. Its surface is dark brown with reddish volcanic patches.'
    },

    // EVE (Venus Analog)
    {
        id: 'eve',
        name: 'Eve',
        type: 'planet',
        color: '#8A2BE2', // Violet vif (Blue Violet)
        size: 0.95,
        scientificRadius: 700, // km
        scientificDistance: 9832684, // km
        distance: 11,
        orbitSpeed: 1.3,
        rotationSpeed: -0.008, // Slow rotation
        funFact: '💜 Easter Egg: The atmosphere is so thick that solar panels can shatter from dynamic pressure at low speeds! Its purple oceans contain "Explodium".',
        temperature: 'Extremely hot',
        realDistance: '9.83 million km from Kerbol',
        averageDistanceToEarth: '~3.7 Gm from Kerbin',
        orbitalPeriod: '~261 Kerbin days',
        moons: 1, // Gilly
        description: 'The easiest planet to reach, but the hardest to leave! A beautiful purple world with an extremely dense atmosphere (1.7g surface gravity) and mysterious purple oceans.',
        hasAtmosphere: true,
        atmosphereColor: '#9932CC', // Dark Orchid - violet atmosphere
        atmosphereIntensity: 0.9,
        atmosphereType: 'thick'
    },

    // GILLY (Eve\'s moon - captured asteroid)
    {
        id: 'gilly',
        name: 'Gilly',
        type: 'satellite',
        color: '#8B7D6B', // Beige grisâtre / Pierre ponce
        size: 0.08,
        scientificRadius: 13, // km - tiny!
        scientificDistance: 31500, // km from Eve
        distance: 2.0,
        orbitSpeed: 3.5,
        rotationSpeed: 0.02,
        orbiting: 'eve',
        funFact: '🦘 Easter Egg: Gravity is so low (0.005g) that you can put yourself in orbit just by jumping with a jetpack! Walking is nearly impossible.',
        temperature: 'Cold (No atmosphere)',
        realDistance: '31,500 km from Eve',
        averageDistanceToEarth: '~3.7 Gm from Kerbin',
        orbitalPeriod: '~7 Kerbin days',
        moons: 0,
        description: 'A tiny, irregularly-shaped captured asteroid orbiting Eve. Its extremely low gravity makes landing and walking a unique challenge.'
    },

    // KERBIN (Earth Analog - Home Planet)
    {
        id: 'kerbin',
        name: 'Kerbin',
        type: 'planet',
        color: '#0052A5', // Bleu saphir profond (océans)
        size: 1,
        scientificRadius: 600, // km
        scientificDistance: 13599840, // km (1 Kerbin AU)
        distance: 17,
        orbitSpeed: 1.0,
        rotationSpeed: 0.02,
        funFact: '🏠 Easter Egg: Kerbin is full of secrets! KSC 2 (an abandoned space center), black monoliths (2001 Space Odyssey reference), and developer memorials!',
        temperature: '~15°C (average)',
        realDistance: '13.6 million km from Kerbol (1 AU)',
        averageDistanceToEarth: '0 km (Home Planet)',
        orbitalPeriod: '426 Kerbin days (1 year = 426 6h days)',
        moons: 2, // The Mun, Minmus
        description: 'The home of the Kerbals! The only planet with a breathable oxygen atmosphere and plant life. Blue oceans, green continents, and white polar caps.',
        hasAtmosphere: true,
        atmosphereColor: '#87CEEB',
        atmosphereIntensity: 0.5,
        atmosphereType: 'normal'
    },

    // THE MUN (Kerbin\'s main moon - Moon Analog)
    {
        id: 'the-mun',
        name: 'The Mun',
        type: 'satellite',
        color: '#808080', // Gris neutre parfait
        size: 0.3,
        scientificRadius: 200, // km
        scientificDistance: 12000, // km from Kerbin
        distance: 2.5,
        orbitSpeed: 2.2,
        rotationSpeed: 0.01,
        orbiting: 'kerbin',
        funFact: '🌑 Easter Egg: Multiple Arch formations and black Monoliths are scattered across the surface - a clear homage to 2001: A Space Odyssey!',
        temperature: '-40°C (average)',
        realDistance: '12,000 km from Kerbin',
        averageDistanceToEarth: '12,000 km',
        orbitalPeriod: '~6.5 Kerbin days',
        moons: 0,
        description: 'Kerbin\'s grey, heavily cratered natural satellite. The first destination for most Kerbal space explorers and a rite of passage for every KSP player!'
    },

    // MINMUS (Kerbin\'s second moon)
    {
        id: 'minmus',
        name: 'Minmus',
        type: 'satellite',
        color: '#98FB98', // Vert menthe pâle (Pale Green)
        size: 0.15,
        scientificRadius: 60, // km
        scientificDistance: 47000, // km from Kerbin
        distance: 4.0,
        orbitSpeed: 1.5,
        rotationSpeed: 0.015,
        orbiting: 'kerbin',
        funFact: '🍧 Easter Egg: According to KSP lore, Minmus is made of frozen dessert (mint ice cream)! Its icy green color supports this theory.',
        temperature: '-80°C (extremely cold)',
        realDistance: '47,000 km from Kerbin',
        averageDistanceToEarth: '47,000 km',
        orbitalPeriod: '~47 Kerbin days',
        moons: 0,
        description: 'A small, mint-colored moon covered in strange icy flats. Its low gravity and unusual terrain make it a popular destination for fuel mining operations.'
    },

    // DUNA (Mars Analog)
    {
        id: 'duna',
        name: 'Duna',
        type: 'planet',
        color: '#CD853F', // Peru - Orange/bronze terreux
        size: 0.55,
        scientificRadius: 320, // km
        scientificDistance: 20726155, // km
        distance: 26,
        orbitSpeed: 0.75,
        rotationSpeed: 0.018,
        funFact: '👽 Easter Egg: A giant Kerbal Face rock formation (Mars Face reference) + a pyramid emitting SSTV signals that decode to a Soyuz spacecraft image!',
        temperature: '-40°C (thin atmosphere)',
        realDistance: '20.73 million km from Kerbol',
        averageDistanceToEarth: '~7.1 Gm from Kerbin',
        orbitalPeriod: '~801 Kerbin days',
        moons: 1, // Ike
        description: 'The first interplanetary target for most explorers! A rust-red world with a thin atmosphere and extensive white polar ice caps. Perfect for rover expeditions.',
        hasAtmosphere: true,
        atmosphereColor: '#E9967A',
        atmosphereIntensity: 0.25,
        atmosphereType: 'thin'
    },

    // IKE (Duna\'s moon)
    {
        id: 'ike',
        name: 'Ike',
        type: 'satellite',
        color: '#696969', // Dim Gray - plus sombre que la Mun
        size: 0.22,
        scientificRadius: 130, // km
        scientificDistance: 3200, // km from Duna
        distance: 2.0,
        orbitSpeed: 2.8,
        rotationSpeed: 0.01,
        orbiting: 'duna',
        funFact: '🔒 Easter Egg: Ike is tidally locked to Duna and appears huge in Duna\'s sky! It\'s so close that its gravity noticeably affects Duna operations.',
        temperature: '-60°C (No atmosphere)',
        realDistance: '3,200 km from Duna',
        averageDistanceToEarth: '~7.1 Gm from Kerbin',
        orbitalPeriod: '~3 Kerbin days',
        moons: 0,
        description: 'A large grey moon tidally locked to Duna. Its close orbit and substantial size make it dominate Duna\'s sky, creating spectacular views.'
    },

    // DRES (Ceres Analog - Dwarf Planet)
    {
        id: 'dres',
        name: 'Dres',
        type: 'dwarf-planet',
        color: '#9C9C9C', // Gris clair
        size: 0.22,
        scientificRadius: 138, // km
        scientificDistance: 40839348, // km
        distance: 42,
        orbitSpeed: 0.45,
        rotationSpeed: 0.012,
        funFact: '🤔 Easter Egg: "Dres doesn\'t exist" - A running community joke because nobody ever visits! It has a massive canyon scar across its surface.',
        temperature: '-150°C (very cold)',
        realDistance: '40.84 million km from Kerbol',
        averageDistanceToEarth: '~27.2 Gm from Kerbin',
        orbitalPeriod: '~2,206 Kerbin days (5.18 years)',
        moons: 0, // Has Drestroids (scattered asteroids)
        description: 'A lonely dwarf planet in the asteroid belt, often forgotten by explorers. Its pale grey surface resembles the Mun with white ice patches. The Dres Canyon is a giant geological scar.'
    },

    // JOOL (Jupiter Analog - Gas Giant)
    {
        id: 'jool',
        name: 'Jool',
        type: 'planet',
        color: '#6B8E23', // Olive Drab - Vert olive avec bandes
        size: 3.2,
        scientificRadius: 6000, // km
        scientificDistance: 68773560, // km
        distance: 60,
        orbitSpeed: 0.25,
        rotationSpeed: 0.04,
        funFact: '☠️ Easter Egg: Descending too deep into Jool\'s atmosphere instantly destroys your spacecraft! The "Jool 5" challenge (landing on all 5 moons) is legendary.',
        temperature: '-100°C (upper atmosphere)',
        realDistance: '68.77 million km from Kerbol',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~4,853 Kerbin days (11.4 years)',
        moons: 5, // Laythe, Vall, Tylo, Bop, Pol
        description: 'A massive green gas giant! The "final boss" for beginner players. Its five moons form a complex system with Laythe, Vall, and Tylo in 1:2:4 Laplace resonance (like Jupiter\'s moons).',
        hasAtmosphere: true,
        atmosphereColor: '#9ACD32', // Yellow Green - bandes atmosphériques
        atmosphereIntensity: 0.7,
        atmosphereType: 'thick'
    },

    // LAYTHE (Jool\'s moon - Europa/Earth hybrid)
    {
        id: 'laythe',
        name: 'Laythe',
        type: 'satellite',
        color: '#182946', // Bleu pétrole très sombre (océan)
        size: 0.45,
        scientificRadius: 500, // km
        scientificDistance: 27184, // km from Jool
        distance: 4.5,
        orbitSpeed: 3.0, // Laplace resonance: 1x
        rotationSpeed: 0.02,
        orbiting: 'jool',
        funFact: '🌊 Easter Egg: Laythe has a breathable atmosphere but is cold and radioactive! It\'s the only other body with oceans besides Kerbin.',
        temperature: '-10°C (cold but habitable)',
        realDistance: '27,184 km from Jool',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~3 Kerbin days (1:2:4 resonance)',
        moons: 0,
        description: 'An oceanic moon with a breathable (but cold and radioactive) atmosphere. Its islands and blue oceans make it the most Earth-like world outside Kerbin. Part of the Laplace resonance.',
        hasAtmosphere: true,
        atmosphereColor: '#4A90E2',
        atmosphereIntensity: 0.45,
        atmosphereType: 'normal'
    },

    // VALL (Jool\'s moon - Ice moon)
    {
        id: 'vall',
        name: 'Vall',
        type: 'satellite',
        color: '#ADD8E6', // Light Blue - Bleu glace clair
        size: 0.35,
        scientificRadius: 300, // km
        scientificDistance: 43152, // km from Jool
        distance: 6.0,
        orbitSpeed: 2.0, // Laplace resonance: 2x
        rotationSpeed: 0.015,
        orbiting: 'jool',
        funFact: '❄️ Easter Egg: Vall\'s icy surface hides mysterious geological features. It\'s part of the 1:2:4 Laplace resonance with Laythe and Tylo!',
        temperature: '-120°C (frozen)',
        realDistance: '43,152 km from Jool',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~6 Kerbin days (1:2:4 resonance)',
        moons: 0,
        description: 'A beautiful blue ice ball orbiting Jool. Its smooth, frozen surface makes landing relatively easy. Part of the 1:2:4 Laplace orbital resonance.'
    },

    // TYLO (Jool\'s moon - Large rocky moon)
    {
        id: 'tylo',
        name: 'Tylo',
        type: 'satellite',
        color: '#D2B48C', // Tan - Beige/crème rocheux
        size: 0.5,
        scientificRadius: 600, // km
        scientificDistance: 68500, // km from Jool
        distance: 8.0,
        orbitSpeed: 1.5, // Laplace resonance: 4x
        rotationSpeed: 0.012,
        orbiting: 'jool',
        funFact: '💪 Easter Egg: Tylo has Kerbin-level gravity but NO atmosphere! Landing here is considered one of the hardest challenges in KSP.',
        temperature: '-90°C (No atmosphere)',
        realDistance: '68,500 km from Jool',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~12 Kerbin days (1:2:4 resonance)',
        moons: 0,
        description: 'A massive rocky moon with no atmosphere but Kerbin-level gravity. Landing here is extremely difficult and requires enormous amounts of fuel. Part of the Laplace resonance.'
    },

    // BOP (Jool\'s moon - Captured asteroid)
    {
        id: 'bop',
        name: 'Bop',
        type: 'satellite',
        color: '#4E4035', // Brun sépia foncé
        size: 0.1,
        scientificRadius: 65, // km
        scientificDistance: 128500, // km from Jool
        distance: 10.0,
        orbitSpeed: 1.2,
        rotationSpeed: 0.02,
        orbiting: 'jool',
        funFact: '🦑 Easter Egg: Near Bop\'s North Pole lies the corpse of the "Space Kraken" - impaled! The Kraken is the mythical creature representing KSP physics bugs.',
        temperature: '-150°C (Very cold)',
        realDistance: '128,500 km from Jool',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~38 Kerbin days',
        moons: 0,
        description: 'A small, brown, lumpy captured asteroid. Its irregular shape and low gravity make it tricky to land on. Home to the legendary Dead Kraken Easter egg!'
    },

    // POL (Jool\'s moon - Smallest)
    {
        id: 'pol',
        name: 'Pol',
        type: 'satellite',
        color: '#F4A460', // Brun sable / Orange pastel
        size: 0.08,
        scientificRadius: 44, // km
        scientificDistance: 179890, // km from Jool
        distance: 12.0,
        orbitSpeed: 1.0,
        rotationSpeed: 0.025,
        orbiting: 'jool',
        funFact: '🌵 Easter Egg: Pol\'s surface is covered in strange yellow spiky rock formations, giving it a pollen grain or cactus-like appearance!',
        temperature: '-160°C (Very cold)',
        realDistance: '179,890 km from Jool',
        averageDistanceToEarth: '~55.1 Gm from Kerbin',
        orbitalPeriod: '~66 Kerbin days',
        moons: 0,
        description: 'The smallest and outermost of Jool\'s moons. Its yellow, spiky surface resembles a pollen grain. Low gravity makes landing easy but walking treacherous.'
    },

    // EELOO (Pluto/Europa Analog)
    {
        id: 'eeloo',
        name: 'Eeloo',
        type: 'dwarf-planet',
        color: '#F5FFFA', // Mint Cream - Blanc très pur
        size: 0.28,
        scientificRadius: 210, // km
        scientificDistance: 90118820, // km
        distance: 85,
        orbitSpeed: 0.12,
        rotationSpeed: 0.008,
        funFact: '📡 Easter Egg: Originally planned as a moon of a second gas giant (never added). Its "Tiger Stripes" are like Europa. Signal delay to Kerbin is extreme!',
        temperature: '-210°C (Extremely cold)',
        realDistance: '90.12 million km from Kerbol',
        averageDistanceToEarth: '~76.5 Gm from Kerbin',
        orbitalPeriod: '~7,257 Kerbin days (17 years)',
        moons: 0,
        description: 'A distant ice world with an eccentric orbit that sometimes crosses Jool\'s. Its bright white surface is marked by brown "Tiger Stripes" crevasses, reminiscent of Jupiter\'s moon Europa.'
    }
];

// Helper function to get Kerbol system objects by type
export const getKerbolObjectsByType = (type: SolarSystemObject['type']) => {
    return kerbolSystemData.filter(obj => obj.type === type);
};

// Helper to get all Kerbol planets
export const getKerbolPlanets = () => getKerbolObjectsByType('planet');

// Helper to get all Kerbol moons
export const getKerbolMoons = () => kerbolSystemData.filter(obj => obj.type === 'satellite');

// Get moons of a specific body
export const getKerbolMoonsOf = (parentId: string) =>
    kerbolSystemData.filter(obj => obj.orbiting === parentId);
