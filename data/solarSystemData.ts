// Solar System Data Structure
// All major solar system objects with educational content

export interface SolarSystemObject {
    id: string;
    name: string;
    type: 'star' | 'planet' | 'dwarf-planet' | 'satellite' | 'telescope' | 'asteroid-belt';

    // Visual properties
    color: string;
    size: number; // Stylized size for visibility
    distance: number; // Distance from sun (AU - stylized)
    orbitSpeed: number; // Orbital speed multiplier
    rotationSpeed: number; // Rotation speed

    // Scientific Data (km) for Real Scale Mode
    scientificRadius?: number;
    scientificDistance?: number;

    // Special features
    hasRings?: boolean;
    ringColor?: string;
    tilt?: number; // Axial tilt in degrees

    // Educational content
    funFact: string;
    temperature: string;
    realDistance: string; // Actual distance for educational purposes
    averageDistanceToEarth: string;
    orbitalPeriod: string; // New field
    moons: number;
    description: string;

    // For custom objects
    launchDate?: string;
    purpose?: string;
    orbitType?: string;
    orbiting?: string; // ID of the parent object (e.g., 'earth')
}

export const solarSystemData: SolarSystemObject[] = [
    // SUN (The Star)
    {
        id: 'sun',
        name: 'Sun',
        type: 'star',
        color: '#FDB813',
        size: 5,
        scientificRadius: 696340,
        scientificDistance: 0,
        distance: 0,
        orbitSpeed: 0,
        rotationSpeed: 0.005,
        funFact: 'The Sun makes up 99.86% of the mass of the entire Solar System!',
        temperature: '5,500°C (surface) / 15M°C (core)',
        realDistance: '0 km (Center)',
        averageDistanceToEarth: '149.6 million km',
        orbitalPeriod: 'N/A (Center of orbit)',
        moons: 0,
        description: 'Our Star! A nearly perfect sphere of hot plasma that provides the energy for life on Earth.'
    },
    // PLANETS
    {
        id: 'mercury',
        name: 'Mercury',
        type: 'planet',
        color: '#8C7853',
        size: 0.4,
        scientificRadius: 2440,
        scientificDistance: 57900000,
        distance: 4,
        orbitSpeed: 1.6,
        rotationSpeed: 0.01,
        funFact: 'Mercury is the fastest planet, zooming around the Sun in just 88 Earth days!',
        temperature: '430°C (day) / -180°C (night)',
        realDistance: '57.9 million km from the Sun',
        averageDistanceToEarth: '77 million km',
        orbitalPeriod: '88 days',
        moons: 0,
        description: 'The smallest planet and closest to the Sun. Its surface is covered with craters like our Moon!'
    },
    {
        id: 'venus',
        name: 'Venus',
        type: 'planet',
        color: '#FFC649',
        size: 0.9,
        scientificRadius: 6052,
        scientificDistance: 108200000,
        distance: 7,
        orbitSpeed: 1.2,
        rotationSpeed: -0.005, // Retrograde rotation
        funFact: 'Venus spins backwards! It\'s the only planet that rotates in the opposite direction.',
        temperature: '462°C (hottest planet!)',
        realDistance: '108.2 million km from the Sun',
        averageDistanceToEarth: '41 million km',
        orbitalPeriod: '225 days',
        moons: 0,
        description: 'Often called Earth\'s twin because of similar size, but it\'s super hot with thick toxic clouds!'
    },
    {
        id: 'earth',
        name: 'Earth',
        type: 'planet',
        color: '#4A90E2',
        size: 1,
        scientificRadius: 6371,
        scientificDistance: 149600000,
        distance: 10,
        orbitSpeed: 1.0,
        rotationSpeed: 0.02,
        funFact: 'Earth is the only planet we know that has life! It\'s our beautiful home in space.',
        temperature: '15°C (average)',
        realDistance: '149.6 million km from the Sun',
        averageDistanceToEarth: '0 km (You are here!)',
        orbitalPeriod: '365.25 days',
        moons: 1,
        description: 'The Blue Planet! 71% of Earth is covered with water, and it has the perfect conditions for life.'
    },
    // MOON
    {
        id: 'moon',
        name: 'Moon',
        type: 'satellite',
        color: '#D0D0D0',
        size: 0.27,
        scientificRadius: 1737,
        scientificDistance: 384400, // Relative to Earth
        distance: 2, // Relative to Earth
        orbitSpeed: 2.0, // Faster orbit around Earth
        rotationSpeed: 0.01,
        orbiting: 'earth',
        funFact: 'The Moon is Earth\'s only natural satellite. We have visited it with astronauts!',
        temperature: '-23°C (average)',
        realDistance: '384,400 km from Earth',
        averageDistanceToEarth: '384,400 km',
        orbitalPeriod: '27 days',
        moons: 0,
        description: 'Our loyal companion! It controls the tides and lights up our night sky.'
    },
    {
        id: 'mars',
        name: 'Mars',
        type: 'planet',
        color: '#E27B58',
        size: 0.5,
        scientificRadius: 3390,
        scientificDistance: 227900000,
        distance: 15,
        orbitSpeed: 0.8,
        rotationSpeed: 0.018,
        funFact: 'Mars has the biggest volcano in the solar system - Olympus Mons is 3 times taller than Mount Everest!',
        temperature: '-63°C (average)',
        realDistance: '227.9 million km from the Sun',
        averageDistanceToEarth: '140 million km',
        orbitalPeriod: '687 days',
        moons: 2,
        description: 'The Red Planet! It looks red because of rusty iron in its soil. Scientists are looking for signs of ancient life here!'
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        type: 'planet',
        color: '#C88B3A',
        size: 3,
        scientificRadius: 69911,
        scientificDistance: 778600000,
        distance: 25,
        orbitSpeed: 0.4,
        rotationSpeed: 0.04,
        funFact: 'Jupiter is SO BIG that all the other planets could fit inside it! It also has a giant storm called the Great Red Spot.',
        temperature: '-108°C (average)',
        realDistance: '778.5 million km from the Sun',
        averageDistanceToEarth: '628 million km',
        orbitalPeriod: '11.9 years',
        moons: 95,
        description: 'The biggest planet in our solar system! It\'s a gas giant with beautiful swirling clouds and stripes.'
    },
    {
        id: 'saturn',
        name: 'Saturn',
        type: 'planet',
        color: '#FAD5A5',
        size: 2.5,
        scientificRadius: 58232,
        scientificDistance: 1433500000,
        distance: 35,
        orbitSpeed: 0.3,
        rotationSpeed: 0.038,
        hasRings: true,
        ringColor: '#D4AF37',
        funFact: 'Saturn\'s rings are made of billions of pieces of ice and rock! Some pieces are as small as a grain of sand, others as big as a house!',
        temperature: '-138°C (average)',
        realDistance: '1.4 billion km from the Sun',
        averageDistanceToEarth: '1.2 billion km',
        orbitalPeriod: '29.5 years',
        moons: 146,
        description: 'The Lord of the Rings! Saturn has the most spectacular ring system in our solar system.'
    },
    {
        id: 'uranus',
        name: 'Uranus',
        type: 'planet',
        color: '#4FD0E7',
        size: 1.8,
        scientificRadius: 25362,
        scientificDistance: 2872500000,
        distance: 45,
        orbitSpeed: 0.2,
        rotationSpeed: 0.03,
        tilt: 98,
        hasRings: true,
        ringColor: '#6FB1C7',
        funFact: 'Uranus is tilted on its side! It rolls around the Sun like a ball instead of spinning like a top.',
        temperature: '-197°C (average)',
        realDistance: '2.9 billion km from the Sun',
        averageDistanceToEarth: '2.5 billion km',
        orbitalPeriod: '84 years',
        moons: 27,
        description: 'The sideways planet! It\'s an ice giant with a beautiful blue-green color from methane gas.'
    },
    {
        id: 'neptune',
        name: 'Neptune',
        type: 'planet',
        color: '#4166F5',
        size: 1.7,
        scientificRadius: 24622,
        scientificDistance: 4495100000,
        distance: 55,
        orbitSpeed: 0.15,
        rotationSpeed: 0.032,
        funFact: 'Neptune has the strongest winds in the solar system - up to 2,000 km/h! That\'s faster than a jet plane!',
        temperature: '-201°C (average)',
        realDistance: '4.5 billion km from the Sun',
        averageDistanceToEarth: '4.3 billion km',
        orbitalPeriod: '165 years',
        moons: 14,
        description: 'The windiest planet! This deep blue ice giant is the farthest planet from the Sun.'
    },
    // DWARF PLANETS
    {
        id: 'pluto',
        name: 'Pluto',
        type: 'dwarf-planet',
        color: '#D4A574',
        size: 0.2,
        scientificRadius: 1188,
        scientificDistance: 5906380000,
        distance: 65,
        orbitSpeed: 0.1,
        rotationSpeed: 0.008,
        funFact: 'Pluto has a heart-shaped region on its surface! It\'s called Tombaugh Regio and it\'s made of frozen nitrogen.',
        temperature: '-223°C (average)',
        realDistance: '5.9 billion km from the Sun',
        averageDistanceToEarth: '5 billion km',
        orbitalPeriod: '248 years',
        moons: 5,
        description: 'Once considered the 9th planet! Pluto is now classified as a dwarf planet but it\'s still super cool!'
    },

    {
        id: 'eris',
        name: 'Eris',
        type: 'dwarf-planet',
        color: '#E8E8E8',
        size: 0.18,
        distance: 70,
        orbitSpeed: 0.08,
        rotationSpeed: 0.01,
        funFact: 'Eris is almost the same size as Pluto! Finding Eris helped scientists decide to create the "dwarf planet" category.',
        temperature: '-231°C (average)',
        realDistance: '10.1 billion km from the Sun',
        averageDistanceToEarth: '10 billion km',
        orbitalPeriod: '557 years',
        moons: 1,
        description: 'One of the most distant dwarf planets! It\'s named after the Greek goddess of discord.'
    },
    {
        id: 'makemake',
        name: 'Makemake',
        type: 'dwarf-planet',
        color: '#C4A582',
        size: 0.16,
        distance: 68,
        orbitSpeed: 0.09,
        rotationSpeed: 0.012,
        funFact: 'Makemake is named after the creator god of the Rapa Nui people of Easter Island!',
        temperature: '-239°C (average)',
        realDistance: '6.8 billion km from the Sun',
        averageDistanceToEarth: '7 billion km',
        orbitalPeriod: '309 years',
        moons: 1,
        description: 'A mysterious dwarf planet in the outer solar system with a reddish-brown surface.'
    },
    {
        id: 'haumea',
        name: 'Haumea',
        type: 'dwarf-planet',
        color: '#B8A99A',
        size: 0.17,
        distance: 66,
        orbitSpeed: 0.095,
        rotationSpeed: 0.05,
        hasRings: true,
        ringColor: '#D0C8C0',
        funFact: 'Haumea spins super fast! One day on Haumea is only 4 hours long, making it shaped like a football!',
        temperature: '-223°C (average)',
        realDistance: '6.5 billion km from the Sun',
        averageDistanceToEarth: '6.4 billion km',
        orbitalPeriod: '284 years',
        moons: 2,
        description: 'The egg-shaped dwarf planet! It\'s one of the fastest rotating objects in our solar system.'
    },
    // CUSTOM OBJECTS - Satellites & Telescopes
    {
        id: 'james-webb',
        name: 'James Webb Space Telescope',
        type: 'telescope',
        color: '#FFD700',
        size: 0.05,
        distance: 1.8, // Relative to Earth L2
        orbitSpeed: 1.0,
        rotationSpeed: 0,
        orbiting: 'earth',
        funFact: 'James Webb can see galaxies that formed just after the Big Bang, over 13 billion years ago!',
        temperature: '-233°C (operating temp)',
        realDistance: '1.5 million km from Earth (at L2 point)',
        averageDistanceToEarth: '1.5 million km',
        orbitalPeriod: '6 months',
        moons: 0,
        description: 'The most powerful space telescope ever built! It uses infrared light to see through cosmic dust.',
        launchDate: 'December 25, 2021',
        purpose: 'Observing the earliest galaxies and studying exoplanets',
        orbitType: 'Sun-Earth L2 Lagrange Point'
    },
    {
        id: 'hubble',
        name: 'Hubble Space Telescope',
        type: 'telescope',
        color: '#C0C0C0',
        size: 0.04,
        distance: 1.2, // Low Earth Orbit (relative)
        orbitSpeed: 4.0, // Fast orbit
        rotationSpeed: 0.1,
        orbiting: 'earth',
        funFact: 'Hubble has taken over 1.5 million pictures of the universe! It orbits Earth every 95 minutes.',
        temperature: 'Varies (-100°C to 100°C)',
        realDistance: '547 km above Earth',
        averageDistanceToEarth: '547 km',
        orbitalPeriod: '95 minutes',
        moons: 0,
        description: 'A legendary space telescope that has shown us amazing images of distant galaxies, nebulae, and planets!',
        launchDate: 'April 24, 1990',
        purpose: 'Observing distant galaxies, stars, and planets in visible light',
        orbitType: 'Low Earth Orbit'
    },
    {
        id: 'iss',
        name: 'International Space Station',
        type: 'satellite',
        color: '#FFFFFF',
        size: 0.03,
        distance: 1.1, // Very low orbit
        orbitSpeed: 5.0, // Very fast
        rotationSpeed: 0.15,
        orbiting: 'earth',
        funFact: 'The ISS is as big as a football field! Astronauts see 16 sunrises and sunsets every day up there!',
        temperature: 'Controlled at ~21°C inside',
        realDistance: '408 km above Earth',
        averageDistanceToEarth: '408 km',
        orbitalPeriod: '93 minutes',
        moons: 0,
        description: 'A giant laboratory in space where astronauts live and work! It\'s been continuously occupied since 2000.',
        launchDate: 'November 20, 1998 (first module)',
        purpose: 'Scientific research and international cooperation in space',
        orbitType: 'Low Earth Orbit'
    }
];

// Helper function to get objects by type
export const getObjectsByType = (type: SolarSystemObject['type']) => {
    return solarSystemData.filter(obj => obj.type === type);
};

// Helper to get all planets
export const getPlanets = () => getObjectsByType('planet');

// Helper to get all dwarf planets
export const getDwarfPlanets = () => getObjectsByType('dwarf-planet');

// Helper to get all custom objects (satellites + telescopes)
export const getCustomObjects = () =>
    solarSystemData.filter(obj => obj.type === 'satellite' || obj.type === 'telescope');
