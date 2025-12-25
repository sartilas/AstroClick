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
    eccentricity?: number; // 0 = circle, >0 = ellipse
    periapsis?: number; // Argument of periapsis (rotation of orbit) in degrees
    inclination?: number; // Orbital inclination in degrees
    ascendingNode?: number; // Longitude of ascending node in degrees

    // Scientific Data (km) for Real Scale Mode
    scientificRadius?: number;
    scientificDistance?: number;

    // Special features
    hasRings?: boolean;
    ringColor?: string;
    tilt?: number; // Axial tilt in degrees

    // Atmosphere properties
    hasAtmosphere?: boolean;
    atmosphereColor?: string; // Main atmosphere color (glow color)
    atmosphereIntensity?: number; // 0-1, how thick/visible the atmosphere is
    atmosphereType?: 'thin' | 'normal' | 'thick'; // Atmosphere thickness type

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
        eccentricity: 0,
        periapsis: 0,
        inclination: 0,
        ascendingNode: 0,
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
        distance: 9, // Increased to avoid Sun clipping
        orbitSpeed: 1.6,
        rotationSpeed: 0.01,
        eccentricity: 0.205,
        periapsis: 29,
        inclination: 7.0,
        ascendingNode: 48,
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
        distance: 12,
        orbitSpeed: 1.2,
        rotationSpeed: -0.005, // Retrograde rotation
        hasAtmosphere: true,
        atmosphereColor: '#FFA500',
        atmosphereType: 'thick',
        eccentricity: 0.007,
        periapsis: 55,
        inclination: 3.4,
        ascendingNode: 76,
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
        distance: 16,
        orbitSpeed: 1.0,
        rotationSpeed: 0.02,
        hasAtmosphere: true,
        atmosphereColor: '#4A90E2',
        atmosphereType: 'normal',
        eccentricity: 0.017,
        periapsis: 102,
        inclination: 0,
        ascendingNode: -11,
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
        distance: 22,
        orbitSpeed: 0.8,
        rotationSpeed: 0.018,
        hasAtmosphere: true,
        atmosphereColor: '#E27B58',
        atmosphereType: 'thin',
        eccentricity: 0.094,
        periapsis: 286,
        inclination: 1.85,
        ascendingNode: 49,
        funFact: 'Mars has the biggest volcano in the solar system - Olympus Mons is 3 times taller than Mount Everest!',
        temperature: '-63°C (average)',
        realDistance: '227.9 million km from the Sun',
        averageDistanceToEarth: '140 million km',
        orbitalPeriod: '687 days',
        moons: 2,
        description: 'The Red Planet! It looks red because of rusty iron in its soil. Scientists are looking for signs of ancient life here!'
    },
    // MARS MOONS
    {
        id: 'phobos',
        name: 'Phobos',
        type: 'satellite',
        color: '#8B7355',
        size: 0.1,
        scientificRadius: 11,
        scientificDistance: 9376,
        distance: 1, // Relative to Mars
        orbitSpeed: 3.0,
        rotationSpeed: 0.01,
        orbiting: 'mars',
        funFact: 'Phobos rises in the west and sets in the east twice a day!',
        temperature: '-40°C',
        realDistance: '9,376 km from Mars',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '7 hours',
        moons: 0,
        description: 'The larger and inner moon of Mars. It is a lumpy, heavily cratered rock.'
    },
    {
        id: 'deimos',
        name: 'Deimos',
        type: 'satellite',
        color: '#CDB79E',
        size: 0.08,
        scientificRadius: 6,
        scientificDistance: 23460,
        distance: 2,
        orbitSpeed: 1.5,
        rotationSpeed: 0.01,
        orbiting: 'mars',
        funFact: 'Deimos is more like an asteroid than a moon.',
        temperature: '-40°C',
        realDistance: '23,460 km from Mars',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '30 hours',
        moons: 0,
        description: 'The smaller and outer moon of Mars. It looks more like a smooth asteroid.'
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        type: 'planet',
        color: '#E3DCCB', // NASA-ish Beige dominant
        size: 3,
        scientificRadius: 69911,
        scientificDistance: 778600000,
        distance: 40,
        orbitSpeed: 0.4,
        rotationSpeed: 0.04,
        hasAtmosphere: true,
        atmosphereColor: '#C88B3A', // Keep the glow warm
        atmosphereType: 'thick',
        eccentricity: 0.049,
        periapsis: 274,
        inclination: 1.3,
        ascendingNode: 100,
        funFact: 'Jupiter is SO BIG that all the other planets could fit inside it! It also has a giant storm called the Great Red Spot.',
        temperature: '-108°C (average)',
        realDistance: '778.5 million km from the Sun',
        averageDistanceToEarth: '628 million km',
        orbitalPeriod: '11.9 years',
        moons: 95,
        description: 'The biggest planet in our solar system! It\'s a gas giant with beautiful swirling clouds and stripes.'
    },
    // JUPITER MOONS (Galilean)
    {
        id: 'io',
        name: 'Io',
        type: 'satellite',
        color: '#FBFF00', // Sulfur yellow
        size: 0.25,
        scientificRadius: 1821,
        scientificDistance: 421700,
        distance: 3.5,
        orbitSpeed: 2.5,
        rotationSpeed: 0.01,
        orbiting: 'jupiter',
        funFact: 'Io has over 400 active volcanoes! It smells like rotten eggs due to sulfur.',
        temperature: '-143°C',
        realDistance: '421,700 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '1.8 days',
        moons: 0,
        description: 'Jupiter\'s volcanic moon. Its yellow color comes from sulfur from its massive eruptions.'
    },
    {
        id: 'europa',
        name: 'Europa',
        type: 'satellite',
        color: '#F5F5DC', // Beige/White
        size: 0.22,
        scientificRadius: 1560,
        scientificDistance: 671100,
        distance: 4.5,
        orbitSpeed: 2.0,
        rotationSpeed: 0.01,
        orbiting: 'jupiter',
        funFact: 'Europa has more water than Earth! It\'s hidden under a thick shell of ice.',
        temperature: '-160°C',
        realDistance: '671,100 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '3.5 days',
        moons: 0,
        description: 'An icy moon with a smooth surface. Scientists believe a vast ocean lies beneath the ice.'
    },
    {
        id: 'ganymede',
        name: 'Ganymede',
        type: 'satellite',
        color: '#708090', // Slate gray
        size: 0.35, // Largest moon
        scientificRadius: 2634,
        scientificDistance: 1070400,
        distance: 6.0,
        orbitSpeed: 1.5,
        rotationSpeed: 0.01,
        orbiting: 'jupiter',
        funFact: 'Ganymede is the only moon with its own magnetic field!',
        temperature: '-163°C',
        realDistance: '1,070,400 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '7.1 days',
        moons: 0,
        description: 'The giant of moons. It is the only moon known to have its own magnetic field.'
    },
    {
        id: 'callisto',
        name: 'Callisto',
        type: 'satellite',
        color: '#696969', // Dim gray
        size: 0.32,
        scientificRadius: 2410,
        scientificDistance: 1882700,
        distance: 7.5,
        orbitSpeed: 1.0,
        rotationSpeed: 0.01,
        orbiting: 'jupiter',
        funFact: 'Callisto is the most heavily cratered object in the solar system.',
        temperature: '-139°C',
        realDistance: '1,882,700 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '16.7 days',
        moons: 0,
        description: 'An old, cratered moon. It may also have a subsurface salty ocean.'
    },
    {
        id: 'saturn',
        name: 'Saturn',
        type: 'planet',
        color: '#EAD6B8', // Pale Gold/Tan
        size: 2.5,
        scientificRadius: 58232,
        scientificDistance: 1433500000,
        distance: 60,
        orbitSpeed: 0.3,
        rotationSpeed: 0.038,
        hasRings: true,
        ringColor: '#D4AF37',
        hasAtmosphere: true,
        atmosphereColor: '#FAD5A5',
        atmosphereType: 'thick',
        eccentricity: 0.057,
        periapsis: 336,
        inclination: 2.48,
        ascendingNode: 113,
        funFact: 'Saturn\'s rings are made of billions of pieces of ice and rock! Some pieces are as small as a grain of sand, others as big as a house!',
        temperature: '-138°C (average)',
        realDistance: '1.4 billion km from the Sun',
        averageDistanceToEarth: '1.2 billion km',
        orbitalPeriod: '29.5 years',
        moons: 146,
        description: 'The Lord of the Rings! Saturn has the most spectacular ring system in our solar system.'
    },
    // SATURN MOONS
    {
        id: 'titan',
        name: 'Titan',
        type: 'satellite',
        color: '#FFD700',
        size: 0.4,
        scientificRadius: 2574,
        scientificDistance: 1221800,
        distance: 5.0,
        orbitSpeed: 1.2,
        rotationSpeed: 0.01,
        orbiting: 'saturn',
        hasAtmosphere: true,
        atmosphereColor: '#F4a460',
        atmosphereType: 'thick',
        funFact: 'Titan has a thick atmosphere and liquid lakes of methane and ethane!',
        temperature: '-179°C',
        realDistance: '1,221,800 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '16 days',
        moons: 0,
        description: 'Saturn\'s largest moon. It has a thick nitrogen atmosphere and is like a frozen Earth.'
    },
    {
        id: 'enceladus',
        name: 'Enceladus',
        type: 'satellite',
        color: '#FFFFFF',
        size: 0.1,
        scientificRadius: 252,
        scientificDistance: 237900,
        distance: 2.5,
        orbitSpeed: 2.5,
        rotationSpeed: 0.01,
        orbiting: 'saturn',
        funFact: 'Enceladus shoots geysers of salty water into space!',
        temperature: '-201°C',
        realDistance: '237,900 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '1.4 days',
        moons: 0,
        description: 'A shiny, icy moon with a subsurface ocean.'
    },
    {
        id: 'uranus',
        name: 'Uranus',
        type: 'planet',
        color: '#AFDBF5', // Pale Cyan (Uranian Blue)
        size: 1.8,
        scientificRadius: 25362,
        scientificDistance: 2872500000,
        distance: 80,
        orbitSpeed: 0.2,
        rotationSpeed: 0.03,
        tilt: 98,
        hasRings: true,
        ringColor: '#6FB1C7',
        hasAtmosphere: true,
        atmosphereColor: '#4FD0E7',
        atmosphereType: 'thick',
        eccentricity: 0.046,
        periapsis: 96,
        inclination: 0.77,
        ascendingNode: 74,
        funFact: 'Uranus is tilted on its side! It rolls around the Sun like a ball instead of spinning like a top.',
        temperature: '-197°C (average)',
        realDistance: '2.9 billion km from the Sun',
        averageDistanceToEarth: '2.5 billion km',
        orbitalPeriod: '84 years',
        moons: 27,
        description: 'The sideways planet! It\'s an ice giant with a beautiful blue-green color from methane gas.'
    },
    // URANUS MOONS
    {
        id: 'titania',
        name: 'Titania',
        type: 'satellite',
        color: '#C0C0C0',
        size: 0.12,
        scientificRadius: 788,
        scientificDistance: 435900,
        distance: 3.0,
        orbitSpeed: 1.5,
        rotationSpeed: 0.01,
        orbiting: 'uranus',
        funFact: 'Titania is the largest moon of Uranus with a giant canyon.',
        temperature: '-203°C',
        realDistance: '435,900 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '8.7 days',
        moons: 0,
        description: 'A dirty ice ball mixed with rock.'
    },
    {
        id: 'neptune',
        name: 'Neptune',
        type: 'planet',
        color: '#7CA1FF', // Much lighter Azure Blue (User request)
        size: 1.7,
        scientificRadius: 24622,
        scientificDistance: 4495100000,
        distance: 100,
        orbitSpeed: 0.15,
        rotationSpeed: 0.032,
        hasAtmosphere: true,
        atmosphereColor: '#4166F5',
        atmosphereType: 'thick',
        eccentricity: 0.011,
        periapsis: 265,
        inclination: 1.77,
        ascendingNode: 131,
        funFact: 'Neptune has the strongest winds in the solar system - up to 2,000 km/h! That\'s faster than a jet plane!',
        temperature: '-201°C (average)',
        realDistance: '4.5 billion km from the Sun',
        averageDistanceToEarth: '4.3 billion km',
        orbitalPeriod: '165 years',
        moons: 14,
        description: 'The windiest planet! This deep blue ice giant is the farthest planet from the Sun.'
    },
    // NEPTUNE MOONS
    {
        id: 'triton',
        name: 'Triton',
        type: 'satellite',
        color: '#FFC0CB',
        size: 0.21,
        scientificRadius: 1353,
        scientificDistance: 354700,
        distance: 3.0,
        orbitSpeed: 1.8,
        rotationSpeed: 0.01,
        orbiting: 'neptune',
        hasAtmosphere: true,
        atmosphereColor: '#FFC0CB',
        atmosphereType: 'thin',
        funFact: 'Triton orbits backwards! It likely came from the Kuiper Belt.',
        temperature: '-235°C',
        realDistance: '354,700 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '5.8 days',
        moons: 0,
        description: 'The only orbiting large moon in the solar system that orbits in the opposite direction.'
    },
    // DWARF PLANETS
    {
        id: 'ceres',
        name: 'Ceres',
        type: 'dwarf-planet',
        color: '#A9A9A9',
        size: 0.15,
        scientificRadius: 476,
        scientificDistance: 414000000,
        distance: 30, // Asteroid belt between Mars (22) and Jupiter (40)
        orbitSpeed: 0.6,
        rotationSpeed: 0.02,
        inclination: 10.6,
        ascendingNode: 80,
        funFact: 'Ceres is the only dwarf planet in the inner solar system, located in the asteroid belt!',
        temperature: '-105°C (average)',
        realDistance: '414 million km from the Sun',
        averageDistanceToEarth: '260 million km',
        orbitalPeriod: '4.6 years',
        moons: 0,
        description: 'The queen of the asteroid belt! Ceres is the largest object between Mars and Jupiter and might have a subsurface ocean.'
    },
    {
        id: 'pluto',
        name: 'Pluto',
        type: 'dwarf-planet',
        color: '#D4A574',
        size: 0.2,
        scientificRadius: 1188,
        scientificDistance: 5906380000,
        distance: 120,
        orbitSpeed: 0.1,
        rotationSpeed: 0.008,
        hasAtmosphere: true,
        atmosphereColor: '#87CEFA',
        atmosphereType: 'thin',
        eccentricity: 0.244,
        periapsis: 113,
        inclination: 17.16,
        ascendingNode: 110,
        funFact: 'Pluto has a heart-shaped region on its surface! It\'s called Tombaugh Regio and it\'s made of frozen nitrogen.',
        temperature: '-223°C (average)',
        realDistance: '5.9 billion km from the Sun',
        averageDistanceToEarth: '5 billion km',
        orbitalPeriod: '248 years',
        moons: 5,
        description: 'Once considered the 9th planet! Pluto is now classified as a dwarf planet but it\'s still super cool!'
    },
    // PLUTO MOONS (Charon)
    {
        id: 'charon',
        name: 'Charon',
        type: 'satellite',
        color: '#A9A9A9',
        size: 0.1,
        scientificRadius: 606,
        scientificDistance: 19591,
        distance: 1.5,
        orbitSpeed: 0.5,
        rotationSpeed: 0.01,
        orbiting: 'pluto',
        funFact: 'Charon is so big compared to Pluto that they orbit each other!',
        temperature: '-220°C',
        realDistance: '19,591 km',
        averageDistanceToEarth: 'Varies',
        orbitalPeriod: '6.4 days',
        moons: 0,
        description: 'Pluto\'s largest moon. It forms a binary system with Pluto.'
    },

    {
        id: 'eris',
        name: 'Eris',
        type: 'dwarf-planet',
        color: '#E8E8E8',
        size: 0.18,
        distance: 130,
        orbitSpeed: 0.08,
        rotationSpeed: 0.01,
        inclination: 44,
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
        distance: 135,
        orbitSpeed: 0.09,
        rotationSpeed: 0.012,
        inclination: 29,
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
        distance: 125,
        orbitSpeed: 0.095,
        rotationSpeed: 0.05,
        hasRings: true,
        ringColor: '#D0C8C0',
        inclination: 28,
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
        size: 0.2, // Increased size for visibility
        distance: 17.5, // 16 (Earth) + 1.5 (L2 offset)
        orbitSpeed: 1.0, // Match Earth speed
        rotationSpeed: 0,
        // orbiting: 'earth', // REMOVED to orbit Sun directly at L2 position
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
