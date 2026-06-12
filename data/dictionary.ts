export type Language = 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ru';

export const dictionary: Record<Language, any> = {
    en: {
        title: "AstroClick",
        subtitle: "Solar System Exploration, Cube by Cube.",
        clickInstruction: "Click on any planet or object to learn more! 🚀",
        orbitScale: "ORBIT SCALE",
        timeControl: "TIME CONTROL",
        simplified: "SIMPLIFIED",
        realScale: "REAL SCALE",
        layers: "LAYERS",
        layerNone: "None",
        layerHabitable: "Habitable Zone",
        layerGravity: "Gravity Well",
        layerLagrange: "Lagrange Points",
        backToSpace: "🚀 Back to Space",
        didYouKnow: "💡 Did you know?",
        temperature: "Temperature",
        distance: "Distance",
        distanceEarth: "Avg Dist. to Earth",
        moons: "Moons",
        special: "Special",
        launchDate: "Launch Date",
        purpose: "Purpose",
        orbit: "Orbit",
        orbitOf: "Orbit of",
        planet: "🪐 Planet",
        dwarfPlanet: "⭐ Dwarf Planet",
        telescope: "🔭 Space Telescope",
        satellite: "🛰️ Satellite",
        star: "☀️ Star",
        nasaGallery: "NASA Gallery",
        loadingImages: "Loading NASA Images...",
        galleryUnavailable: "Gallery unavailable",
        systemToggle: "SYSTEM",
        solarSystem: "Solar",
        kerbolSystem: "Kerbol (KSP)",
        distanceKerbin: "Avg Dist. to Kerbin",
        contact: "Questions or suggestions? Contact us:",
        aboutDescription: "AstroClick is a free, non-profit educational project.",
        aboutDevWith: "Developed with the help of AI",
        aboutEasterEgg: "Psst... Click 3 times on the logo for a cosmic surprise!",
        aboutOpenSource: "Source code freely available for education.",
        comet: "☄️ Comet",
        features: {
            tourTitle: "Guided Tour",
            tourStop: "Stop tour",
            tourNext: "Next",
            tourPrev: "Previous",
            searchPlaceholder: "Search an object…",
            searchNoResult: "No result",
            quizTitle: "Space Quiz",
            quizQuestion: "Question",
            quizScore: "Score",
            quizBest: "Best score",
            quizCorrect: "Correct!",
            quizWrong: "Wrong!",
            quizNext: "Next question",
            quizFinish: "See result",
            quizRestart: "Play again",
            quizQMoons: "How many moons does {name} have?",
            quizQFact: "Which object matches this fact?",
            quizQClosest: "Which of these objects is closest to the star?",
            quizQTemp: "What is the temperature of {name}?",
            quizPerfect: "Perfect! A true astronomer! 🏆",
            quizGood: "Great! You know your solar system! 🚀",
            quizOk: "Not bad! Keep exploring! 🔭",
            quizBad: "Explore a bit more and try again! 🌍",
            compareTitle: "Planet Comparator",
            compareDiameter: "Diameter",
            photoSaved: "📸 Photo saved!",
            photoButton: "Photo mode",
            dateTitle: "Positions on a date",
            dateApply: "Apply",
            dateToday: "Today",
            dateNote: "Approximate planet positions (J2000 mean longitudes).",
            dateActive: "Positions on"
        },
        objects: {
            sun: { name: "Sun", desc: "The star at the center of our Solar System. It provides light and energy to all planets.", funFact: "The Sun accounts for 99.86% of the mass in the solar system!" },
            mercury: { name: "Mercury", desc: "The smallest planet and closest to the Sun. Its surface is covered with craters like our Moon!", funFact: "Mercury is the fastest planet, zooming around the Sun in just 88 Earth days!" },
            venus: { name: "Venus", desc: "Often called Earth's twin because of similar size, but it's super hot with thick toxic clouds!", funFact: "Venus spins backwards! It's the only planet that rotates in the opposite direction." },
            earth: { name: "Earth", desc: "The Blue Planet! 71% of Earth is covered with water, and it has the perfect conditions for life.", funFact: "Earth is the only planet we know that has life! It's our beautiful home in space." },
            mars: { name: "Mars", desc: "The Red Planet! It looks red because of rusty iron in its soil. Scientists are looking for signs of ancient life here!", funFact: "Mars has the biggest volcano in the solar system - Olympus Mons is 3 times taller than Mount Everest!" },
            jupiter: { name: "Jupiter", desc: "The biggest planet in our solar system! It's a gas giant with beautiful swirling clouds and stripes.", funFact: "Jupiter is SO BIG that all the other planets could fit inside it! It also has a giant storm called the Great Red Spot." },
            saturn: { name: "Saturn", desc: "The Lord of the Rings! Saturn has the most spectacular ring system in our solar system.", funFact: "Saturn's rings are made of billions of pieces of ice and rock! Some pieces are as small as a grain of sand, others as big as a house!" },
            uranus: { name: "Uranus", desc: "The sideways planet! It's an ice giant with a beautiful blue-green color from methane gas.", funFact: "Uranus is tilted on its side! It rolls around the Sun like a ball instead of spinning like a top." },
            neptune: { name: "Neptune", desc: "The windiest planet! This deep blue ice giant is the farthest planet from the Sun.", funFact: "Neptune has the strongest winds in the solar system - up to 2,000 km/h! That's faster than a jet plane!" },
            pluto: { name: "Pluto", desc: "Once considered the 9th planet! Pluto is now classified as a dwarf planet but it's still super cool!", funFact: "Pluto has a heart-shaped region on its surface! It's called Tombaugh Regio and it's made of frozen nitrogen." },
            ceres: { name: "Ceres", desc: "The asteroid belt's biggest resident! Ceres might have a hidden ocean under its icy surface.", funFact: "Ceres lives in the asteroid belt between Mars and Jupiter! It's the largest object there." },
            eris: { name: "Eris", desc: "One of the most distant dwarf planets! It's named after the Greek goddess of discord.", funFact: "Eris is almost the same size as Pluto! Finding Eris helped scientists decide to create the 'dwarf planet' category." },
            makemake: { name: "Makemake", desc: "A mysterious dwarf planet in the outer solar system with a reddish-brown surface.", funFact: "Makemake is named after the creator god of the Rapa Nui people of Easter Island!" },
            haumea: { name: "Haumea", desc: "The egg-shaped dwarf planet! It's one of the fastest rotating objects in our solar system.", funFact: "Haumea spins super fast! One day on Haumea is only 4 hours long, making it shaped like a football!" },
            'james-webb': { name: "James Webb", desc: "The most powerful space telescope ever built! It uses infrared light to see through cosmic dust.", funFact: "James Webb can see galaxies that formed just after the Big Bang, over 13 billion years ago!" },
            hubble: { name: "Hubble", desc: "A legendary space telescope that has shown us amazing images of distant galaxies, nebulae, and planets!", funFact: "Hubble has taken over 1.5 million pictures of the universe! It orbits Earth every 95 minutes." },
            iss: { name: "ISS", desc: "A giant laboratory in space where astronauts live and work! It's been continuously occupied since 2000.", funFact: "The ISS is as big as a football field! Astronauts see 16 sunrises and sunsets every day up there!" },
            // Kerbol System Objects
            kerbol: { name: "Kerbol", desc: "The yellow dwarf star at the center of the Kerbol System, similar to our Sun but much smaller.", funFact: "⚠️ Easter Egg: In older KSP versions, descending below -250m caused a division by zero crash!" },
            moho: { name: "Moho", desc: "The closest planet to Kerbol, scorched and airless with dark volcanic terrain.", funFact: "🕳️ The Mohole: A gigantic near-vertical hole at the North Pole - a bug turned into a feature!" },
            eve: { name: "Eve", desc: "Easy to reach, impossible to leave! A purple world with crushing atmosphere and mysterious oceans.", funFact: "💜 The atmosphere is so thick that solar panels shatter from pressure! Oceans are filled with 'Explodium'." },
            gilly: { name: "Gilly", desc: "A tiny captured asteroid orbiting Eve with extremely low gravity.", funFact: "🦘 Gravity is 0.005g - you can orbit just by jumping with a jetpack!" },
            kerbin: { name: "Kerbin", desc: "Home of the Kerbals! The only planet with breathable atmosphere and life.", funFact: "🏠 Full of secrets: KSC 2, black monoliths (2001 reference), and developer memorials!" },
            'the-mun': { name: "The Mun", desc: "Kerbin's grey, cratered moon. The first destination for every KSP player!", funFact: "🌑 Multiple Arch formations and Monoliths - a 2001: Space Odyssey tribute!" },
            minmus: { name: "Minmus", desc: "A small mint-colored moon with strange icy flats and very low gravity.", funFact: "🍧 According to lore, Minmus is made of frozen dessert (mint ice cream)!" },
            duna: { name: "Duna", desc: "The rust-red Mars analog. First interplanetary target for most Kerbal explorers.", funFact: "👽 Giant Kerbal Face rock + a pyramid with SSTV signals that decode to a Soyuz image!" },
            ike: { name: "Ike", desc: "A large grey moon tidally locked to Duna, dominating its sky.", funFact: "🔒 So close that its gravity noticeably affects Duna operations!" },
            dres: { name: "Dres", desc: "A lonely forgotten dwarf planet in the asteroid belt. 'Dres doesn't exist' joke.", funFact: "🤔 Running community joke: nobody ever visits! Has a massive canyon scar." },
            jool: { name: "Jool", desc: "The green gas giant - the 'final boss' for beginners with 5 complex moons.", funFact: "☠️ Descend too deep and you're instantly destroyed! The 'Jool 5' challenge is legendary." },
            laythe: { name: "Laythe", desc: "An oceanic moon with breathable but cold/radioactive atmosphere. Most Earth-like world!", funFact: "🌊 Part of the 1:2:4 Laplace resonance with Vall and Tylo!" },
            vall: { name: "Vall", desc: "A beautiful blue ice ball. Smooth frozen surface makes landing easy.", funFact: "❄️ Part of the legendary 1:2:4 Laplace orbital resonance!" },
            tylo: { name: "Tylo", desc: "Massive rocky moon with Kerbin gravity but NO atmosphere. Hardest landing!", funFact: "💪 Landing here is one of the hardest challenges in all of KSP!" },
            bop: { name: "Bop", desc: "A lumpy brown captured asteroid with the Dead Kraken Easter egg.", funFact: "🦑 The Space Kraken corpse is impaled near the North Pole!" },
            pol: { name: "Pol", desc: "Yellow spiky moon resembling a pollen grain. Strange rock formations.", funFact: "🌵 Surface covered in strange yellow spiky rocks - looks like a cactus!" },
            eeloo: { name: "Eeloo", desc: "A distant ice world with Tiger Stripes like Jupiter's moon Europa.", funFact: "📡 Was planned as a moon of a second gas giant that was never added!" }
        },
        alienShip: {
            signalDetected: "Signal Detected",
            fermiParadox: "Fermi Paradox"
        },
        drake: {
            title: "Drake Equation Calculator",
            description: "Estimate the number of active, communicative extraterrestrial civilizations in the Milky Way galaxy.",
            variables: {
                R: { name: "Star Formation Rate", desc: "Average rate of star formation in our galaxy per year.", unit: "/ year" },
                fp: { name: "Fraction with Planets", desc: "Fraction of stars that have planetary systems.", unit: "" },
                ne: { name: "Habitable Planets", desc: "Average number of planets that could support life, per star with planets.", unit: "" },
                fl: { name: "Fraction with Life", desc: "Fraction of habitable planets where life actually develops.", unit: "" },
                fi: { name: "Fraction with Intelligence", desc: "Fraction of planets with life that develop intelligent civilizations.", unit: "" },
                fc: { name: "Fraction with Communication", desc: "Fraction of civilizations that develop detectable signals.", unit: "" },
                L: { name: "Civilization Lifespan", desc: "Length of time civilizations release detectable signals.", unit: "years" }
            },
            presets: {
                skeptical: "Skeptical",
                scientific: "Scientific",
                optimistic: "Optimistic"
            },
            result: {
                detectableCivilizations: "Detectable Civilizations",
                empty: "We may be alone in the galaxy...",
                lonely: "A few neighbors, but so far away we may never hear them.",
                crowded: "The galaxy is teeming with life! Where is everyone?"
            }
        },
        fermiModal: {
            title: "The Fermi Paradox",
            intro: "If there are billions of stars and planets in the universe, why haven't we encountered extraterrestrials yet?",
            introDesc: "This is the fundamental question posed by physicist Enrico Fermi in 1950. Given the age of the universe (13.8 billion years) and its immensity, the probability of extraterrestrial life seems high. Yet, there is only silence.",
            footer: "The mystery remains. Are we alone, or are we simply looking in the wrong place?",
            theories: {
                greatFilter: {
                    title: "The Great Filter",
                    description: "There may be an evolutionary obstacle that is nearly impossible to overcome (such as the emergence of multicellular life or technological self-destruction) that prevents civilizations from reaching the stage of interstellar travel."
                },
                rareEarth: {
                    title: "Rare Earth",
                    description: "The conditions necessary for complex life (planet size, stabilizing moon, calm sun, magnetic field) may be much rarer than we think."
                },
                radioSilence: {
                    title: "Radio Silence",
                    description: "Perhaps civilizations emit radio signals for a very short period before changing technology or disappearing, making detection difficult."
                },
                darkForest: {
                    title: "The Dark Forest",
                    description: "A disturbing theory: the universe is like a dark forest full of predators. Intelligent civilizations deliberately hide to avoid being annihilated by more advanced ones."
                }
            }
        }
    },
    fr: {
        title: "AstroClick",
        subtitle: "L'exploration spatiale, cube par cube.",
        clickInstruction: "Cliquez sur une planète pour en découvrir tous les secrets ! 🚀",
        orbitScale: "ÉCHELLE ORBITALE",
        timeControl: "VITESSE DU TEMPS",
        simplified: "SCHÉMATIQUE",
        realScale: "ÉCHELLE RÉELLE",
        layers: "FILTRES",
        layerNone: "Aucun",
        layerHabitable: "Zone Habitable",
        layerGravity: "Puits de Gravité",
        layerLagrange: "Points de Lagrange",
        backToSpace: "🚀 Retour à l'exploration",
        didYouKnow: "💡 Le saviez-vous ?",
        temperature: "Température",
        distance: "Distance du Soleil",
        distanceEarth: "Distance moyenne de la Terre",
        moons: "Nombre de lunes",
        special: "Caractéristiques",
        launchDate: "Date de lancement",
        purpose: "Mission principale",
        orbit: "Orbite",
        orbitOf: "Orbite de",
        orbitalPeriod: "Période orbitale",
        planet: "🪐 Planète",
        dwarfPlanet: "⭐ Planète naine",
        telescope: "🔭 Télescope spatial",
        satellite: "🛰️ Satellite",
        star: "☀️ Étoile",
        nasaGallery: "Galerie NASA",
        loadingImages: "Chargement des images NASA...",
        galleryUnavailable: "Galerie temporairement indisponible",
        systemToggle: "SYSTÈME STELLAIRE",
        solarSystem: "Système Solaire",
        kerbolSystem: "Kerbol (KSP)",
        distanceKerbin: "Distance moyenne de Kerbin",
        contact: "Une question ou suggestion ? Contactez-nous :",
        aboutDescription: "AstroClick est un projet éducatif gratuit et à but non lucratif.",
        aboutDevWith: "Développé avec l'aide de l'IA",
        aboutEasterEgg: "Psst... Cliquez 3 fois sur le logo pour une surprise cosmique !",
        aboutOpenSource: "Code source disponible librement pour l'éducation.",
        comet: "☄️ Comète",
        features: {
            tourTitle: "Visite guidée",
            tourStop: "Arrêter la visite",
            tourNext: "Suivant",
            tourPrev: "Précédent",
            searchPlaceholder: "Rechercher un objet…",
            searchNoResult: "Aucun résultat",
            quizTitle: "Quiz Spatial",
            quizQuestion: "Question",
            quizScore: "Score",
            quizBest: "Meilleur score",
            quizCorrect: "Correct !",
            quizWrong: "Raté !",
            quizNext: "Question suivante",
            quizFinish: "Voir le résultat",
            quizRestart: "Rejouer",
            quizQMoons: "Combien de lunes possède {name} ?",
            quizQFact: "À quel objet correspond ce fait ?",
            quizQClosest: "Lequel de ces objets est le plus proche de l'étoile ?",
            quizQTemp: "Quelle est la température de {name} ?",
            quizPerfect: "Parfait ! Un vrai astronome ! 🏆",
            quizGood: "Très bien ! Tu connais ton système solaire ! 🚀",
            quizOk: "Pas mal ! Continue d'explorer ! 🔭",
            quizBad: "Explore encore un peu et réessaie ! 🌍",
            compareTitle: "Comparateur de planètes",
            compareDiameter: "Diamètre",
            photoSaved: "📸 Photo enregistrée !",
            photoButton: "Mode photo",
            dateTitle: "Positions à une date",
            dateApply: "Appliquer",
            dateToday: "Aujourd'hui",
            dateNote: "Positions approximatives des planètes (longitudes moyennes J2000).",
            dateActive: "Positions du"
        },
        objects: {
            sun: {
                name: "Soleil",
                desc: "Notre étoile ! Le Soleil est une gigantesque boule de gaz brûlant qui fournit lumière et chaleur à toutes les planètes de notre système.",
                funFact: "Le Soleil représente à lui seul 99,86% de la masse totale du système solaire ! Toutes les planètes réunies ne font que 0,14%."
            },
            mercury: {
                name: "Mercure",
                desc: "La plus petite planète et la plus proche du Soleil. Sa surface criblée de cratères ressemble beaucoup à notre Lune.",
                funFact: "Mercure est la planète la plus rapide : elle boucle son tour du Soleil en seulement 88 jours terrestres !"
            },
            venus: {
                name: "Vénus",
                desc: "Souvent appelée 'sœur jumelle' de la Terre pour sa taille similaire, mais c'est en réalité un enfer brûlant recouvert de nuages d'acide sulfurique !",
                funFact: "Vénus tourne à l'envers ! C'est la seule planète du système solaire qui effectue sa rotation dans le sens inverse des autres."
            },
            earth: {
                name: "Terre",
                desc: "La Planète Bleue ! Recouverte à 71% d'eau, elle possède les conditions idéales pour abriter la vie. C'est notre maison dans l'immensité de l'espace.",
                funFact: "La Terre est le seul endroit connu dans l'univers où la vie existe ! Elle abrite plus de 8 millions d'espèces différentes."
            },
            mars: {
                name: "Mars",
                desc: "La Planète Rouge ! Elle tire sa couleur caractéristique de l'oxyde de fer (rouille) présent dans son sol. Les scientifiques y recherchent des traces de vie ancienne.",
                funFact: "Mars possède le plus grand volcan du système solaire : Olympus Mons, 3 fois plus haut que l'Everest et aussi large que la France !"
            },
            jupiter: {
                name: "Jupiter",
                desc: "La géante du système solaire ! Cette immense planète gazeuse arbore de magnifiques bandes nuageuses et une tempête légendaire : la Grande Tache Rouge.",
                funFact: "Jupiter est si massive que toutes les autres planètes du système solaire pourraient tenir à l'intérieur ! Sa Grande Tache Rouge fait rage depuis plus de 400 ans."
            },
            saturn: {
                name: "Saturne",
                desc: "Le Seigneur des Anneaux ! Saturne possède le système d'anneaux le plus spectaculaire et le plus visible de tout le système solaire.",
                funFact: "Les anneaux de Saturne sont composés de milliards de fragments de glace et de roche ! Certains sont minuscules comme des grains de sable, d'autres gigantesques comme des maisons."
            },
            uranus: {
                name: "Uranus",
                desc: "La planète couchée ! Cette géante de glace bleu-vert doit sa couleur au méthane présent dans son atmosphère.",
                funFact: "Uranus est inclinée à 98° sur son axe ! Elle 'roule' littéralement autour du Soleil comme une boule de bowling plutôt que de tourner comme une toupie."
            },
            neptune: {
                name: "Neptune",
                desc: "La planète des tempêtes ! Cette géante de glace d'un bleu profond est la plus éloignée du Soleil et possède les vents les plus violents du système.",
                funFact: "Neptune détient le record des vents les plus puissants : jusqu'à 2 100 km/h ! C'est plus rapide que la vitesse du son."
            },
            pluto: {
                name: "Pluton",
                desc: "L'ancien 9ème planète ! Reclassée comme planète naine en 2006, Pluton reste fascinante avec sa surface glacée et son atmosphère ténue.",
                funFact: "Pluton possède un 'cœur' ! Cette région en forme de cœur, nommée Tombaugh Regio, est composée d'azote gelé et mesure 1 600 km de large."
            },
            ceres: {
                name: "Cérès",
                desc: "La reine de la ceinture d'astéroïdes ! Cérès est le plus gros objet entre Mars et Jupiter. Elle pourrait abriter un océan souterrain.",
                funFact: "Cérès représente environ un tiers de la masse totale de la ceinture d'astéroïdes ! Elle a été découverte en 1801, bien avant les autres planètes naines."
            },
            eris: {
                name: "Éris",
                desc: "La discorde céleste ! Cette planète naine, nommée d'après la déesse grecque de la discorde, est l'une des plus massives du système solaire externe.",
                funFact: "C'est la découverte d'Éris en 2005 qui a provoqué le reclassement de Pluton ! Elle est légèrement plus petite mais plus massive que Pluton."
            },
            makemake: {
                name: "Makemake",
                desc: "Le créateur mystérieux ! Cette planète naine rougeâtre orbite dans les confins glacés du système solaire, au-delà de Neptune.",
                funFact: "Makemake est nommée d'après le dieu créateur des Rapa Nui, les habitants de l'île de Pâques ! Elle a été découverte le jour de Pâques 2005."
            },
            haumea: {
                name: "Haumea",
                desc: "L'œuf cosmique ! Cette planète naine est unique : sa rotation ultra-rapide lui donne une forme ovale, comme un ballon de rugby.",
                funFact: "Haumea effectue une rotation complète en seulement 4 heures ! C'est l'un des objets qui tourne le plus vite dans le système solaire."
            },
            'james-webb': {
                name: "James Webb",
                desc: "Le télescope le plus puissant jamais lancé dans l'espace ! Il observe l'univers en infrarouge pour percer les voiles de poussière cosmique.",
                funFact: "Le miroir du James Webb mesure 6,5 mètres de diamètre ! Il peut voir des galaxies formées il y a 13,5 milliards d'années, juste après le Big Bang."
            },
            hubble: {
                name: "Hubble",
                desc: "Un véritable pionnier légendaire ! Depuis 1990, ce télescope spatial nous offre des images époustouflantes de galaxies lointaines, de nébuleuses colorées et de phénomènes cosmiques.",
                funFact: "Hubble a capturé plus de 1,5 million d'images de l'univers ! Il orbite la Terre à 547 km d'altitude et fait un tour complet toutes les 95 minutes."
            },
            iss: {
                name: "Station Spatiale Internationale",
                desc: "Un laboratoire géant en orbite ! Des astronautes de différentes nationalités y vivent et travaillent en permanence depuis novembre 2000.",
                funFact: "L'ISS est aussi grande qu'un terrain de football ! Les astronautes à bord assistent à 16 levers et 16 couchers de soleil chaque jour."
            },
            // Système Kerbol (KSP)
            kerbol: {
                name: "Kerbol",
                desc: "L'étoile naine jaune au centre du système Kerbol. Similaire à notre Soleil, mais bien plus petite et parfaite pour les missions Kerbal !",
                funFact: "⚠️ Easter Egg : Dans les anciennes versions de KSP, descendre sous -250m causait un crash par division par zéro ! Il n'y a pas de surface solide."
            },
            moho: {
                name: "Moho",
                desc: "La planète la plus proche de Kerbol. Un monde calciné et sans atmosphère, couvert de cratères et de plaines volcaniques sombres.",
                funFact: "🕳️ Le Mohole : Un gigantesque trou quasi-vertical au Pôle Nord ! C'était un bug de génération de terrain que les développeurs ont gardé car les joueurs l'adoraient."
            },
            eve: {
                name: "Eve",
                desc: "Facile à atteindre, presque impossible à quitter ! Ce magnifique monde violet possède une atmosphère écrasante et des océans mystérieux.",
                funFact: "💜 L'atmosphère d'Eve est si dense que les panneaux solaires peuvent exploser sous la pression ! Ses océans contiennent de l'« Explodium »."
            },
            gilly: {
                name: "Gilly",
                desc: "Un minuscule astéroïde capturé en orbite autour d'Eve. Sa forme irrégulière et sa gravité quasi inexistante en font un défi unique.",
                funFact: "🦘 La gravité de Gilly n'est que de 0,005g ! On peut littéralement se mettre en orbite rien qu'en sautant avec un jetpack."
            },
            kerbin: {
                name: "Kerbin",
                desc: "Le foyer des Kerbals ! C'est la seule planète avec une atmosphère respirable et de la vie. Océans bleus, continents verts et calottes polaires blanches.",
                funFact: "🏠 Kerbin regorge de secrets : KSC 2 (un centre spatial abandonné), des monolithes noirs (référence à 2001), et des mémoriaux aux développeurs !"
            },
            'the-mun': {
                name: "The Mun",
                desc: "La lune grise et cratérisée de Kerbin. La première destination de tout joueur KSP et un rite de passage incontournable !",
                funFact: "🌑 On trouve sur la Mun de multiples formations en arche et des Monolithes noirs - un hommage évident à 2001 : L'Odyssée de l'espace !"
            },
            minmus: {
                name: "Minmus",
                desc: "La petite lune couleur menthe de Kerbin. Ses étranges plaines glacées et sa faible gravité en font une destination populaire.",
                funFact: "🍧 Selon la légende KSP, Minmus serait faite de glace à la menthe ! Sa couleur vert pâle soutient parfaitement cette théorie."
            },
            duna: {
                name: "Duna",
                desc: "L'analogue de Mars ! Un monde rouge-rouille avec une atmosphère ténue et d'imposantes calottes glaciaires aux pôles. Parfait pour les rovers.",
                funFact: "👽 On y trouve un visage de Kerbal géant (référence au visage de Mars) et une pyramide émettant des signaux SSTV qui décodent une image de Soyouz !"
            },
            ike: {
                name: "Ike",
                desc: "L'imposante lune grise de Duna. Elle est en rotation synchrone et domine le ciel de Duna par sa taille impressionnante.",
                funFact: "🔒 Ike est si proche de Duna que sa gravité affecte notablement les opérations à la surface ! Elle crée des vues spectaculaires dans le ciel."
            },
            dres: {
                name: "Dres",
                desc: "Une planète naine solitaire dans la ceinture d'astéroïdes. Souvent oubliée des explorateurs, elle possède un canyon géant.",
                funFact: "🤔 « Dres n'existe pas » - Une blague récurrente de la communauté KSP car personne n'y va jamais ! Elle mérite pourtant le détour."
            },
            jool: {
                name: "Jool",
                desc: "La majestueuse géante gazeuse verte ! Le « boss final » des joueurs débutants avec son système complexe de 5 lunes en résonance orbitale.",
                funFact: "☠️ Descendre trop profondément dans l'atmosphère de Jool détruit instantanément votre vaisseau ! Le défi « Jool 5 » (atterrir sur les 5 lunes) est légendaire."
            },
            laythe: {
                name: "Laythe",
                desc: "Une lune océanique avec une atmosphère respirable mais froide et radioactive. Le monde le plus similaire à Kerbin en dehors de celui-ci !",
                funFact: "🌊 Laythe fait partie de la résonance de Laplace 1:2:4 avec Vall et Tylo, comme les lunes galiléennes de Jupiter !"
            },
            vall: {
                name: "Vall",
                desc: "Une magnifique boule de glace bleutée. Sa surface lisse et gelée rend l'atterrissage relativement facile. Paysages à couper le souffle.",
                funFact: "❄️ Vall fait partie de la légendaire résonance orbitale de Laplace 1:2:4 avec Laythe et Tylo !"
            },
            tylo: {
                name: "Tylo",
                desc: "Une massive lune rocheuse avec la gravité de Kerbin mais SANS atmosphère. L'atterrissage le plus difficile du jeu !",
                funFact: "💪 Atterrir sur Tylo est considéré comme l'un des plus grands défis de tout KSP. Il faut des quantités énormes de carburant !"
            },
            bop: {
                name: "Bop",
                desc: "Un petit astéroïde capturé, brun et bosselé. Sa forme irrégulière et sa faible gravité rendent l'atterrissage délicat.",
                funFact: "🦑 L'Easter Egg du Kraken Mort ! Le cadavre du légendaire Kraken de l'espace est empalé près du Pôle Nord de Bop."
            },
            pol: {
                name: "Pol",
                desc: "La plus petite lune de Jool avec une surface jaune hérissée de pics rocheux. Elle ressemble à un grain de pollen géant.",
                funFact: "🌵 La surface de Pol est couverte d'étranges formations rocheuses jaunes et épineuses - on dirait un cactus cosmique !"
            },
            eeloo: {
                name: "Eeloo",
                desc: "Un monde glacé aux confins du système. Sa surface blanche est marquée de crevasses brunes rappelant les « Tiger Stripes » d'Europe.",
                funFact: "📡 Eeloo devait à l'origine être la lune d'une seconde géante gazeuse qui n'a jamais été ajoutée au jeu !"
            }
        },
        alienShip: {
            signalDetected: "Signal Détecté",
            fermiParadox: "Paradoxe de Fermi"
        },
        drake: {
            title: "Calculateur de l'Équation de Drake",
            description: "Estimez le nombre de civilisations extraterrestres actives et capables de communiquer dans la Voie lactée.",
            variables: {
                R: { name: "Taux de formation d'étoiles", desc: "Nombre moyen d'étoiles formées dans notre galaxie par an.", unit: "/ an" },
                fp: { name: "Fraction avec planètes", desc: "Fraction d'étoiles possédant des systèmes planétaires.", unit: "" },
                ne: { name: "Planètes habitables", desc: "Nombre moyen de planètes potentiellement habitables par étoile.", unit: "" },
                fl: { name: "Fraction avec vie", desc: "Fraction de planètes habitables où la vie apparaît.", unit: "" },
                fi: { name: "Fraction avec intelligence", desc: "Fraction de planètes avec vie qui développent l'intelligence.", unit: "" },
                fc: { name: "Fraction avec communication", desc: "Fraction de civilisations développant des signaux détectables.", unit: "" },
                L: { name: "Durée de vie (années)", desc: "Durée pendant laquelle une civilisation émet des signaux détectables.", unit: "ans" }
            },
            presets: {
                skeptical: "Sceptique",
                scientific: "Scientifique",
                optimistic: "Optimiste"
            },
            result: {
                detectableCivilizations: "Civilisations détectables",
                empty: "Nous sommes peut-être seuls dans la galaxie...",
                lonely: "Quelques voisins, mais si lointains que nous ne les entendrons peut-être jamais.",
                crowded: "La galaxie grouille de vie ! Où sont-ils tous ?"
            }
        },
        fermiModal: {
            title: "Le Paradoxe de Fermi",
            intro: "S'il y a des milliards d'étoiles et de planètes dans l'univers, pourquoi n'avons-nous pas encore rencontré d'extraterrestres ?",
            introDesc: "C'est la question fondamentale posée par le physicien Enrico Fermi en 1950. Avec l'âge de l'univers (13,8 milliards d'années) et son immensité, la probabilité d'une vie extraterrestre semble élevée. Pourtant, c'est le grand silence.",
            footer: "Le mystère reste entier. Sommes-nous seuls, ou regardons-nous simplement au mauvais endroit ?",
            theories: {
                greatFilter: {
                    title: "Le Grand Filtre",
                    description: "Il existe peut-être un obstacle évolutif quasi-impossible à franchir (comme l'apparition de la vie multicellulaire ou l'autodestruction technologique) qui empêche les civilisations d'atteindre le stade du voyage interstellaire."
                },
                rareEarth: {
                    title: "Terre Rare",
                    description: "Les conditions nécessaires à la vie complexe (taille de la planète, lune stabilisatrice, soleil calme, champ magnétique) sont peut-être beaucoup plus rares que nous ne le pensons."
                },
                radioSilence: {
                    title: "Le Silence Radio",
                    description: "Peut-être que les civilisations émettent des signaux radio pendant une très courte période avant de changer de technologie ou de disparaître, rendant la détection difficile."
                },
                darkForest: {
                    title: "La Forêt Sombre",
                    description: "Théorie inquiétante : l'univers est comme une forêt sombre pleine de prédateurs. Les civilisations intelligentes se cachent volontairement pour ne pas être anéanties par d'autres plus avancées."
                }
            }
        }
    },
    zh: {
        title: "太阳系探索者",
        subtitle: "探索宇宙的奇迹！",
        clickInstruction: "点击任何行星了解更多！🚀",
        orbitScale: "轨道比例",
        timeControl: "时间控制",
        simplified: "简化",
        realScale: "真实",
        layers: "图层",
        layerNone: "无",
        layerHabitable: "宜居带",
        layerGravity: "重力井",
        layerLagrange: "拉格朗日点",
        backToSpace: "🚀 返回太空",
        didYouKnow: "💡 你知道吗？",
        temperature: "温度",
        distance: "距离",
        distanceEarth: "与地球距离",
        moons: "卫星",
        special: "特征",
        launchDate: "发射日期",
        purpose: "任务",
        orbit: "轨道",
        orbitOf: "轨道",
        planet: "🪐 行星",
        dwarfPlanet: "⭐ 矮行星",
        telescope: "🔭 太空望远镜",
        satellite: "🛰️ 卫星",
        star: "☀️ 恒星",
        nasaGallery: "NASA 画廊",
        loadingImages: "加载 NASA 图像中...",
        galleryUnavailable: "画廊不可用",
        systemToggle: "系统",
        solarSystem: "太阳系",
        kerbolSystem: "Kerbol (KSP)",
        distanceKerbin: "到Kerbin距离",
        contact: "有问题或建议？联系我们：",
        aboutDescription: "AstroClick 是一个免费的非营利教育项目。",
        aboutDevWith: "在 AI 的帮助下开发",
        aboutEasterEgg: "嘘... 点击 Logo 3 次有惊喜！",
        aboutOpenSource: "源代码免费开放供教育使用。",
        comet: "☄️ 彗星",
        features: {
            tourTitle: "导览模式",
            tourStop: "停止导览",
            tourNext: "下一个",
            tourPrev: "上一个",
            searchPlaceholder: "搜索天体…",
            searchNoResult: "无结果",
            quizTitle: "太空问答",
            quizQuestion: "问题",
            quizScore: "得分",
            quizBest: "最高分",
            quizCorrect: "答对了！",
            quizWrong: "答错了！",
            quizNext: "下一题",
            quizFinish: "查看结果",
            quizRestart: "再玩一次",
            quizQMoons: "{name}有多少颗卫星？",
            quizQFact: "这个事实对应哪个天体？",
            quizQClosest: "以下哪个天体离恒星最近？",
            quizQTemp: "{name}的温度是多少？",
            quizPerfect: "完美！真正的天文学家！🏆",
            quizGood: "很棒！你很了解太阳系！🚀",
            quizOk: "不错！继续探索吧！🔭",
            quizBad: "再多探索一下，然后再试一次！🌍",
            compareTitle: "行星对比",
            compareDiameter: "直径",
            photoSaved: "📸 照片已保存！",
            photoButton: "拍照模式",
            dateTitle: "指定日期的位置",
            dateApply: "应用",
            dateToday: "今天",
            dateNote: "行星的大致位置（J2000平黄经）。",
            dateActive: "位置日期"
        },
        objects: {
            sun: { name: "太阳", desc: "位于我们太阳系中心的恒星。它为所有行星提供光和能量。", funFact: "太阳占整个太阳系质量的99.86%！" },
            mercury: { name: "水星", desc: "最小的行星，最接近太阳。表面像月球一样布满陨石坑！", funFact: "水星是公转最快的行星，只需88个地球日就能绕太阳一圈！" },
            venus: { name: "金星", desc: "因大小相似而被称为地球的姐妹，但它是一个拥有浓厚毒云的灼热地狱！", funFact: "金星逆向自转！它是唯一一个向反方向旋转的行星。" },
            earth: { name: "地球", desc: "蓝色星球！地球71%的表面被水覆盖，拥有孕育生命的完美条件。", funFact: "地球是我们所知唯一拥有生命的行星！这是我们美丽的太空家园。" },
            mars: { name: "火星", desc: "红色星球！表面生锈的铁使其呈现红色。科学家正在这里寻找古代生命的迹象！", funFact: "火星拥有太阳系最大的火山——奥林帕斯山，比珠穆朗玛峰高三倍！" },
            jupiter: { name: "木星", desc: "太阳系最大的行星！它是一颗气态巨行星，拥有美丽的漩涡云和条纹。", funFact: "木星非常大，所有其他行星都可以装进它里面！它还有一个巨大的风暴，称为大红斑。" },
            saturn: { name: "土星", desc: "指环王！土星拥有太阳系中最壮观的环系统。", funFact: "土星环由数十亿块冰和岩石组成！有些像沙粒一样小，有些像房子一样大！" },
            uranus: { name: "天王星", desc: "侧躺的行星！一颗因甲烷而呈蓝绿色的冰巨星。", funFact: "天王星侧身倾斜！它像球一样滚动绕太阳公转，而不是像陀螺一样旋转。" },
            neptune: { name: "海王星", desc: "风力最强的行星！这颗深蓝色的冰巨星是距离太阳最远的行星。", funFact: "海王星拥有太阳系最强的风——高达2000公里/小时！比喷气式飞机还快！" },
            pluto: { name: "冥王星", desc: "曾经的第九大行星！现在被归类为矮行星，但依然超酷！", funFact: "冥王星表面有一个心形区域，叫做汤博区，由冻结的氮组成。" },
            ceres: { name: "谷神星", desc: "小行星带最大的居民！谷神星冰冷的表面下可能隐藏着海洋。", funFact: "谷神星位于火星和木星之间的小行星带！它是那里最大的物体。" },
            eris: { name: "阋神星", desc: "最遥远的矮行星之一！以希腊不和女神命名。", funFact: "阋神星几乎和冥王星一样大！它的发现促使科学家创立了“矮行星”分类。" },
            makemake: { name: "鸟神星", desc: "外太阳系神秘的矮行星，表面呈红褐色。", funFact: "鸟神星以复活节岛拉帕努伊人的创造神命名！" },
            haumea: { name: "妊神星", desc: "蛋形的矮行星！它是太阳系中自转最快的天体之一。", funFact: "妊神星自转超快！一天只有4小时，这使它变成了橄榄球形状！" },
            'james-webb': { name: "詹姆斯·韦伯", desc: "有史以来最强大的太空望远镜！利用红外线穿透宇宙尘埃。", funFact: "詹姆斯·韦伯可以看到大爆炸后不久形成的星系，距今超过130亿年！" },
            hubble: { name: "哈勃", desc: "传奇的太空望远镜，向我们展示了遥远星系和星云的惊人图像！", funFact: "哈勃已经拍摄了超过150万张宇宙照片！它每95分钟绕地球一圈。" },
            iss: { name: "国际空间站", desc: "宇航员生活和工作的太空巨大实验室！自2000年以来一直持续有人驻留。", funFact: "国际空间站和足球场一样大！宇航员在那里每天能看到16次日出和日落！" },
            // Kerbol系统
            kerbol: { name: "Kerbol", desc: "Kerbol系统中心的黄矮星，类似我们的太阳但小得多。", funFact: "⚠️ 彩蛋：在KSP旧版本中，下降到-250m以下会导致除以零崩溃！" },
            moho: { name: "Moho", desc: "距离Kerbol最近的行星，无大气，表面被灼烧。", funFact: "🕳️ Mohole：北极有一个巨大的垂直洞穴 - 一个被保留的bug！" },
            eve: { name: "Eve", desc: "容易到达，难以离开！紫色世界，大气压极高。", funFact: "💜 大气如此稠密，太阳能板会因压力破碎！海洋里是'Explodium'！" },
            gilly: { name: "Gilly", desc: "一颗绕Eve运行的微小捕获小行星，重力极低。", funFact: "🦘 重力只有0.005g - 用喷气背包跳跃就能入轨！" },
            kerbin: { name: "Kerbin", desc: "Kerbal的家园！唯一有可呼吸大气和生命的星球。", funFact: "🏠 充满秘密：KSC 2、黑色方尖碑（2001参考）和开发者纪念碑！" },
            'the-mun': { name: "The Mun", desc: "Kerbin灰色、布满陨石坑的卫星。每个KSP玩家的第一目标！", funFact: "🌑 多个拱门和方尖碑 - 向2001太空漫游致敬！" },
            minmus: { name: "Minmus", desc: "一颗薄荷色的小卫星，有奇怪的冰原和极低重力。", funFact: "🍧 根据传说，Minmus是由冷冻甜点（薄荷冰淇淋）制成的！" },
            duna: { name: "Duna", desc: "铁锈红色的火星类似物。大多数探险者的第一个行星际目标。", funFact: "👽 巨大的Kerbal脸岩石 + 金字塔发射SSTV信号解码为联盟号图像！" },
            ike: { name: "Ike", desc: "一颗大型灰色卫星，与Duna潮汐锁定，主宰其天空。", funFact: "🔒 如此接近，它的重力明显影响Duna上的操作！" },
            dres: { name: "Dres", desc: "小行星带中被遗忘的矮行星。'Dres不存在'笑话。", funFact: "🤔 社区笑话：没人去那里！有一条巨大的峡谷。" },
            jool: { name: "Jool", desc: "绿色气态巨行星 - 初学者的'最终Boss'，有5颗复杂卫星。", funFact: "☠️ 下降太深会立即被摧毁！'Jool 5'挑战是传奇。" },
            laythe: { name: "Laythe", desc: "有可呼吸但寒冷/放射性大气的海洋卫星。最像地球！", funFact: "🌊 与Vall和Tylo形成1:2:4拉普拉斯共振！" },
            vall: { name: "Vall", desc: "美丽的蓝色冰球。光滑的冰面使着陆容易。", funFact: "❄️ 传奇的1:2:4拉普拉斯轨道共振的一部分！" },
            tylo: { name: "Tylo", desc: "巨大的岩石卫星，有Kerbin级重力但无大气。最难着陆！", funFact: "💪 在这里着陆是KSP中最难的挑战之一！" },
            bop: { name: "Bop", desc: "一颗棕色凹凸不平的捕获小行星，有死Kraken彩蛋。", funFact: "🦑 太空Kraken的尸体被刺穿在北极附近！" },
            pol: { name: "Pol", desc: "黄色尖刺卫星，像花粉粒。奇怪的岩石构造。", funFact: "🌵 表面覆盖着奇怪的黄色尖刺岩石 - 像仙人掌！" },
            eeloo: { name: "Eeloo", desc: "遥远的冰雪世界，有像木星欧罗巴的虎纹。", funFact: "📡 原计划是第二颗从未添加的气态巨行星的卫星！" }
        },
        alienShip: {
            signalDetected: "检测到信号",
            fermiParadox: "费米悖论"
        },
        drake: {
            title: "德雷克方程计算器",
            description: "估算银河系中活跃的、能够进行交流的外星文明数量。",
            variables: {
                R: { name: "恒星形成率", desc: "银河系每年形成的恒星平均数量。", unit: "/ 年" },
                fp: { name: "拥有行星的比例", desc: "拥有行星系统的恒星比例。", unit: "" },
                ne: { name: "宜居行星", desc: "每颗恒星拥有的潜在宜居行星平均数量。", unit: "" },
                fl: { name: "生命出现比例", desc: "宜居行星中出现生命的比例。", unit: "" },
                fi: { name: "智慧生命比例", desc: "有生命的行星中发展出智慧文明的比例。", unit: "" },
                fc: { name: "通讯能力比例", desc: "发展出可探测信号的文明比例。", unit: "" },
                L: { name: "文明寿命（年）", desc: "文明发射可探测信号的持续时间。", unit: "年" }
            },
            presets: {
                skeptical: "保守",
                scientific: "科学",
                optimistic: "乐观"
            },
            result: {
                detectableCivilizations: "可探测的文明",
                empty: "我们可能是银河系中唯一的...",
                lonely: "有一些邻居，但距离太远，我们可能永远听不到他们。",
                crowded: "银河系充满了生命！他们都在哪里？"
            }
        },
        fermiModal: {
            title: "费米悖论",
            intro: "如果宇宙中有数十亿颗恒星和行星，为什么我们还没有遇到外星人？",
            introDesc: "这是物理学家恩里科·费米在1950年提出的根本问题。考虑到宇宙的年龄（138亿年）和其广阔，外星生命存在的可能性似乎很高。然而，一切都是寂静的。",
            footer: "谜团依然存在。我们是孤独的，还是只是找错了地方？",
            theories: {
                greatFilter: {
                    title: "大过滤器",
                    description: "可能存在一个几乎无法跨越的进化障碍（如多细胞生命的出现或技术自毁），阻止文明达到星际旅行的阶段。"
                },
                rareEarth: {
                    title: "稀有地球",
                    description: "复杂生命所需的条件（行星大小、稳定的卫星、平静的太阳、磁场）可能比我们想象的要稀有得多。"
                },
                radioSilence: {
                    title: "无线电静默",
                    description: "也许文明只在很短的时间内发射无线电信号，然后就改变技术或消失了，这使得探测变得困难。"
                },
                darkForest: {
                    title: "黑暗森林",
                    description: "一个令人不安的理论：宇宙就像一片充满捕食者的黑暗森林。智慧文明故意隐藏起来，以免被更先进的文明毁灭。"
                }
            }
        }
    },
    es: {
        title: "Explorador del Sistema Solar",
        subtitle: "¡Descubre las maravillas del espacio!",
        clickInstruction: "¡Haz clic en cualquier planeta para aprender más! 🚀",
        orbitScale: "ESCALA ÓRBITA",
        timeControl: "CONTROL DE TIEMPO",
        simplified: "SIMPLIFICADO",
        realScale: "REAL",
        layers: "CAPAS",
        layerNone: "Ninguna",
        layerHabitable: "Zona Habitable",
        layerGravity: "Pozo Gravedad",
        layerLagrange: "Puntos Lagrange",
        backToSpace: "🚀 Volver al Espacio",
        didYouKnow: "💡 ¿Sabías que?",
        temperature: "Temperatura",
        distance: "Distancia",
        distanceEarth: "Dist. a la Tierra",
        moons: "Lunas",
        special: "Especial",
        launchDate: "Lanzamiento",
        purpose: "Misión",
        orbit: "Órbita",
        orbitOf: "Órbita de",
        planet: "🪐 Planeta",
        dwarfPlanet: "⭐ Planeta Enano",
        telescope: "🔭 Telescopio",
        satellite: "🛰️ Satélite",
        star: "☀️ Estrella",
        nasaGallery: "Galería de la NASA",
        loadingImages: "Cargando imágenes...",
        galleryUnavailable: "Galería no disponible",
        systemToggle: "SISTEMA",
        solarSystem: "Solar",
        kerbolSystem: "Kerbol (KSP)",
        distanceKerbin: "Dist. a Kerbin",
        contact: "¿Preguntas o sugerencias? Contáctanos:",
        aboutDescription: "AstroClick es un proyecto educativo gratuito y sin fines de lucro.",
        aboutDevWith: "Desarrollado con la ayuda de IA",
        aboutEasterEgg: "Psst... ¡Haz clic 3 veces en el logo para una sorpresa cósmica!",
        aboutOpenSource: "Código fuente disponible libremente para educación.",
        comet: "☄️ Cometa",
        features: {
            tourTitle: "Visita guiada",
            tourStop: "Detener la visita",
            tourNext: "Siguiente",
            tourPrev: "Anterior",
            searchPlaceholder: "Buscar un objeto…",
            searchNoResult: "Sin resultados",
            quizTitle: "Quiz Espacial",
            quizQuestion: "Pregunta",
            quizScore: "Puntuación",
            quizBest: "Mejor puntuación",
            quizCorrect: "¡Correcto!",
            quizWrong: "¡Fallaste!",
            quizNext: "Siguiente pregunta",
            quizFinish: "Ver resultado",
            quizRestart: "Jugar de nuevo",
            quizQMoons: "¿Cuántas lunas tiene {name}?",
            quizQFact: "¿A qué objeto corresponde este dato?",
            quizQClosest: "¿Cuál de estos objetos está más cerca de la estrella?",
            quizQTemp: "¿Cuál es la temperatura de {name}?",
            quizPerfect: "¡Perfecto! ¡Un verdadero astrónomo! 🏆",
            quizGood: "¡Muy bien! ¡Conoces tu sistema solar! 🚀",
            quizOk: "¡No está mal! ¡Sigue explorando! 🔭",
            quizBad: "¡Explora un poco más e inténtalo de nuevo! 🌍",
            compareTitle: "Comparador de planetas",
            compareDiameter: "Diámetro",
            photoSaved: "📸 ¡Foto guardada!",
            photoButton: "Modo foto",
            dateTitle: "Posiciones en una fecha",
            dateApply: "Aplicar",
            dateToday: "Hoy",
            dateNote: "Posiciones aproximadas de los planetas (longitudes medias J2000).",
            dateActive: "Posiciones del"
        },
        objects: {
            sun: { name: "Sol", desc: "La estrella en el centro de nuestro sistema. Proporciona luz y energía a todos los planetas.", funFact: "¡El Sol representa el 99.86% de la masa del sistema solar!" },
            mercury: { name: "Mercurio", desc: "El planeta más pequeño y cercano al Sol. ¡Su superficie está cubierta de cráteres como nuestra Luna!", funFact: "¡Mercurio es el planeta más rápido, orbita el Sol en solo 88 días terrestres!" },
            venus: { name: "Venus", desc: "Gemelo de la Tierra por tamaño, ¡pero es un infierno ardiente con nubes tóxicas!", funFact: "¡Venus gira hacia atrás! Es el único planeta que rota en dirección opuesta." },
            earth: { name: "Tierra", desc: "¡El Planeta Azul! El 71% está cubierto de agua y tiene condiciones perfectas para la vida.", funFact: "¡La Tierra es el único planeta conocido con vida! Es nuestro hermoso hogar en el espacio." },
            mars: { name: "Marte", desc: "¡El Planeta Rojo! Parece rojo por el hierro oxidado. ¡Los científicos buscan signos de vida antigua aquí!", funFact: "Marte tiene el volcán más grande del sistema solar: ¡el Monte Olimpo es 3 veces más alto que el Everest!" },
            jupiter: { name: "Júpiter", desc: "¡El planeta más grande! Es un gigante gaseoso con hermosas nubes arremolinadas.", funFact: "¡Júpiter es tan grande que cabrían todos los demás planetas dentro! También tiene una tormenta gigante llamada la Gran Mancha Roja." },
            saturn: { name: "Saturno", desc: "¡El Señor de los Anillos! Saturno tiene el sistema de anillos más espectacular.", funFact: "¡Los anillos de Saturno están hechos de miles de millones de trozos de hielo y roca! ¡Algunos tan pequeños como granos de arena, otros como casas!" },
            uranus: { name: "Urano", desc: "¡El planeta de lado! Un gigante de hielo azul verdoso debido al gas metano.", funFact: "¡Urano está inclinado de lado! Rueda alrededor del Sol como una pelota en lugar de girar como un trompo." },
            neptune: { name: "Neptuno", desc: "¡El planeta más ventoso! Este gigante de hielo azul profundo es el más lejano del Sol.", funFact: "Neptuno tiene los vientos más fuertes del sistema solar: ¡hasta 2,000 km/h! ¡Más rápido que un avión de combate!" },
            pluto: { name: "Plutón", desc: "¡Antes el noveno planeta! Ahora es un planeta enano, ¡pero sigue siendo genial!", funFact: "¡Plutón tiene una región en forma de corazón llamada Tombaugh Regio, hecha de nitrógeno congelado!" },
            ceres: { name: "Ceres", desc: "¡El residente más grande del cinturón de asteroides! Podría ocultar un océano bajo su hielo.", funFact: "¡Ceres vive entre Marte y Júpiter! Es el objeto más grande allí." },
            eris: { name: "Eris", desc: "¡Uno de los planetas enanos más lejanos! Nombrado en honor a la diosa griega de la discordia.", funFact: "¡Eris es casi del mismo tamaño que Plutón! Su hallazgo ayudó a crear la categoría de 'planeta enano'." },
            makemake: { name: "Makemake", desc: "Un misterioso planeta enano en el sistema exterior con superficie rojiza.", funFact: "¡Makemake lleva el nombre del dios creador del pueblo Rapa Nui de la Isla de Pascua!" },
            haumea: { name: "Haumea", desc: "¡El planeta enano con forma de huevo! Gira rapidísimo.", funFact: "¡Haumea gira súper rápido! Un día dura solo 4 horas, ¡lo que le da forma de balón de fútbol!" },
            'james-webb': { name: "James Webb", desc: "¡El telescopio espacial más potente jamás construido! Usa luz infrarroja.", funFact: "¡James Webb puede ver galaxias que se formaron justo después del Big Bang, hace más de 13 mil millones de años!" },
            hubble: { name: "Hubble", desc: "¡Un telescopio legendario que nos ha mostrado imágenes increíbles del universo!", funFact: "¡Hubble ha tomado más de 1.5 millones de fotos! Orbita la Tierra cada 95 minutos." },
            iss: { name: "EEI", desc: "¡Un laboratorio gigante en el espacio donde viven astronautas! Ocupado desde el 2000.", funFact: "¡La EEI es tan grande como un campo de fútbol! ¡Los astronautas ven 16 amaneceres al día!" },
            // Sistema Kerbol
            kerbol: { name: "Kerbol", desc: "La estrella enana amarilla en el centro del Sistema Kerbol, similar a nuestro Sol pero mucho más pequeña.", funFact: "⚠️ Easter Egg: ¡En versiones antiguas de KSP, bajar de -250m causaba un crash por división por cero!" },
            moho: { name: "Moho", desc: "El planeta más cercano a Kerbol, abrasado y sin atmósfera con terreno volcánico oscuro.", funFact: "🕳️ El Mohole: ¡Un agujero gigante casi vertical en el Polo Norte - un bug convertido en característica!" },
            eve: { name: "Eve", desc: "¡Fácil de alcanzar, imposible de escapar! Un mundo púrpura con atmósfera aplastante.", funFact: "💜 ¡La atmósfera es tan densa que los paneles solares explotan! ¡Los océanos tienen 'Explodium'!" },
            gilly: { name: "Gilly", desc: "Un diminuto asteroide capturado orbitando Eve con gravedad extremadamente baja.", funFact: "🦘 ¡Gravedad de 0.005g - puedes orbitar solo saltando con jetpack!" },
            kerbin: { name: "Kerbin", desc: "¡Hogar de los Kerbals! El único planeta con atmósfera respirable y vida.", funFact: "🏠 ¡Lleno de secretos: KSC 2, monolitos negros (referencia 2001) y memoriales de desarrolladores!" },
            'the-mun': { name: "The Mun", desc: "La luna gris y llena de cráteres de Kerbin. ¡El primer destino de todo jugador de KSP!", funFact: "🌑 ¡Múltiples arcos y Monolitos - tributo a 2001: Odisea del Espacio!" },
            minmus: { name: "Minmus", desc: "Una pequeña luna color menta con extrañas llanuras heladas y muy baja gravedad.", funFact: "🍧 ¡Según el lore, Minmus está hecha de postre congelado (helado de menta)!" },
            duna: { name: "Duna", desc: "El análogo rojo-óxido de Marte. Primer objetivo interplanetario de la mayoría de exploradores.", funFact: "👽 ¡Cara de Kerbal gigante + pirámide con señales SSTV que decodifican una imagen de Soyuz!" },
            ike: { name: "Ike", desc: "Una gran luna gris bloqueada gravitacionalmente a Duna, dominando su cielo.", funFact: "🔒 ¡Tan cerca que su gravedad afecta notablemente las operaciones en Duna!" },
            dres: { name: "Dres", desc: "Un planeta enano olvidado en el cinturón. Broma: 'Dres no existe'.", funFact: "🤔 ¡Broma de la comunidad: nadie va! Tiene un cañón masivo." },
            jool: { name: "Jool", desc: "El gigante gaseoso verde - el 'jefe final' para principiantes con 5 lunas complejas.", funFact: "☠️ ¡Desciende demasiado y serás destruido! ¡El desafío 'Jool 5' es legendario!" },
            laythe: { name: "Laythe", desc: "Luna oceánica con atmósfera respirable pero fría/radiactiva. ¡El mundo más parecido a la Tierra!", funFact: "🌊 ¡Parte de la resonancia de Laplace 1:2:4 con Vall y Tylo!" },
            vall: { name: "Vall", desc: "Una hermosa bola de hielo azul. La superficie lisa facilita el aterrizaje.", funFact: "❄️ ¡Parte de la legendaria resonancia orbital de Laplace 1:2:4!" },
            tylo: { name: "Tylo", desc: "Luna rocosa masiva con gravedad de Kerbin pero SIN atmósfera. ¡El aterrizaje más difícil!", funFact: "💪 ¡Aterrizar aquí es uno de los desafíos más difíciles de KSP!" },
            bop: { name: "Bop", desc: "Un asteroide capturado marrón con el Easter egg del Kraken Muerto.", funFact: "🦑 ¡El cadáver del Kraken espacial está empalado cerca del Polo Norte!" },
            pol: { name: "Pol", desc: "Luna amarilla puntiaguda que parece un grano de polen. Formaciones rocosas extrañas.", funFact: "🌵 ¡Superficie cubierta de rocas amarillas puntiagudas - parece un cactus!" },
            eeloo: { name: "Eeloo", desc: "Un mundo de hielo distante con Tiger Stripes como la luna Europa de Júpiter.", funFact: "📡 ¡Estaba planeado como luna de un segundo gigante gaseoso que nunca se añadió!" }
        },
        alienShip: {
            signalDetected: "Señal Detectada",
            fermiParadox: "Paradoja de Fermi"
        },
        drake: {
            title: "Calculadora de la Ecuación de Drake",
            description: "Estima el número de civilizaciones extraterrestres activas y comunicativas en la Vía Láctea.",
            variables: {
                R: { name: "Tasa de formación estelar", desc: "Número promedio de estrellas formadas en nuestra galaxia por año.", unit: "/ año" },
                fp: { name: "Fracción con planetas", desc: "Fracción de estrellas con sistemas planetarios.", unit: "" },
                ne: { name: "Planetas habitables", desc: "Número promedio de planetas potencialmente habitables por estrella.", unit: "" },
                fl: { name: "Fracción con vida", desc: "Fracción de planetas habitables donde surge la vida.", unit: "" },
                fi: { name: "Fracción con inteligencia", desc: "Fracción de planetas con vida que desarrollan inteligencia.", unit: "" },
                fc: { name: "Fracción con comunicación", desc: "Fracción de civilizaciones que desarrollan señales detectables.", unit: "" },
                L: { name: "Duración (años)", desc: "Tiempo durante el cual una civilización emite señales detectables.", unit: "años" }
            },
            presets: {
                skeptical: "Escéptico",
                scientific: "Científico",
                optimistic: "Optimista"
            },
            result: {
                detectableCivilizations: "Civilizaciones detectables",
                empty: "Quizás estamos solos en la galaxia...",
                lonely: "Algunos vecinos, pero tan lejos que quizás nunca los escuchemos.",
                crowded: "¡La galaxia rebosa de vida! ¿Dónde están todos?"
            }
        },
        fermiModal: {
            title: "La Paradoja de Fermi",
            intro: "Si hay miles de millones de estrellas y planetas en el universo, ¿por qué no hemos encontrado extraterrestres todavía?",
            introDesc: "Esta es la pregunta fundamental planteada por el físico Enrico Fermi en 1950. Dada la edad del universo (13.800 millones de años) y su inmensidad, la probabilidad de vida extraterrestre parece alta. Sin embargo, solo hay silencio.",
            footer: "El misterio permanece. ¿Estamos solos, o simplemente estamos buscando en el lugar equivocado?",
            theories: {
                greatFilter: {
                    title: "El Gran Filtro",
                    description: "Puede haber un obstáculo evolutivo casi imposible de superar (como la aparición de vida multicelular o la autodestrucción tecnológica) que impide que las civilizaciones alcancen la etapa del viaje interestelar."
                },
                rareEarth: {
                    title: "Tierra Rara",
                    description: "Las condiciones necesarias para la vida compleja (tamaño del planeta, luna estabilizadora, sol tranquilo, campo magnético) pueden ser mucho más raras de lo que pensamos."
                },
                radioSilence: {
                    title: "El Silencio de Radio",
                    description: "Quizás las civilizaciones emiten señales de radio durante un período muy corto antes de cambiar de tecnología o desaparecer, lo que dificulta la detección."
                },
                darkForest: {
                    title: "El Bosque Oscuro",
                    description: "Una teoría inquietante: el universo es como un bosque oscuro lleno de depredadores. Las civilizaciones inteligentes se esconden deliberadamente para evitar ser aniquiladas por otras más avanzadas."
                }
            }
        }
    },
    hi: {
        title: "सौर मंडल एक्सप्लोरर",
        subtitle: "अंतरिक्ष के अजूबों को खोजें!",
        clickInstruction: "अधिक जानने के लिए किसी भी ग्रह पर क्लिक करें! 🚀",
        orbitScale: "कक्षा पैमाना",
        timeControl: "समय नियंत्रण",
        simplified: "सरलीकृत",
        realScale: "वास्तविक",
        layers: "परतें",
        layerNone: "कोई नहीं",
        layerHabitable: "रहने योग्य क्षेत्र",
        layerGravity: "गुरुत्वाकर्षण",
        layerLagrange: "लाग्रेंज अंक",
        backToSpace: "🚀 अंतरिक्ष में वापस",
        didYouKnow: "💡 क्या आप जानते हैं?",
        temperature: "तापमान",
        distance: "दूरी",
        distanceEarth: "पृथ्वी से दूरी",
        moons: "चंद्रमा",
        special: "विशेष",
        launchDate: "लॉन्च तिथि",
        purpose: "उद्देश्य",
        orbit: "कक्षा",
        orbitOf: "की कक्षा",
        planet: "🪐 ग्रह",
        dwarfPlanet: "⭐ बौना ग्रह",
        telescope: "🔭 स्पेस टेलीस्कोप",
        satellite: "🛰️ उपग्रह",
        star: "☀️ तारा",
        nasaGallery: "नासा गैलरी",
        loadingImages: "नासा छवियों को लोड कर रहा है...",
        galleryUnavailable: "गैलरी अनुपलब्ध",
        systemToggle: "प्रणाली",
        solarSystem: "सौर",
        kerbolSystem: "Kerbol (KSP)",
        distanceKerbin: "Kerbin से दूरी",
        contact: "कोई प्रश्न या सुझाव? हमसे संपर्क करें:",
        aboutDescription: "AstroClick एक मुफ्त, गैर-लाभकारी शैक्षिक परियोजना है।",
        aboutDevWith: "AI की मदद से विकसित",
        aboutEasterEgg: "लोगो पर 3 बार क्लिक करें एक ब्रह्मांडीय आश्चर्य के लिए!",
        aboutOpenSource: "स्रोत कोड शिक्षा के लिए स्वतंत्र रूप से उपलब्ध।",
        comet: "☄️ धूमकेतु",
        features: {
            tourTitle: "निर्देशित यात्रा",
            tourStop: "यात्रा रोकें",
            tourNext: "अगला",
            tourPrev: "पिछला",
            searchPlaceholder: "कोई वस्तु खोजें…",
            searchNoResult: "कोई परिणाम नहीं",
            quizTitle: "अंतरिक्ष प्रश्नोत्तरी",
            quizQuestion: "प्रश्न",
            quizScore: "स्कोर",
            quizBest: "सर्वश्रेष्ठ स्कोर",
            quizCorrect: "सही!",
            quizWrong: "गलत!",
            quizNext: "अगला प्रश्न",
            quizFinish: "परिणाम देखें",
            quizRestart: "फिर से खेलें",
            quizQMoons: "{name} के कितने चंद्रमा हैं?",
            quizQFact: "यह तथ्य किस वस्तु से मेल खाता है?",
            quizQClosest: "इनमें से कौन सी वस्तु तारे के सबसे निकट है?",
            quizQTemp: "{name} का तापमान क्या है?",
            quizPerfect: "बहुत बढ़िया! एक सच्चा खगोलशास्त्री! 🏆",
            quizGood: "शानदार! आप अपने सौरमंडल को जानते हैं! 🚀",
            quizOk: "बुरा नहीं! खोज जारी रखें! 🔭",
            quizBad: "थोड़ा और अन्वेषण करें और फिर से प्रयास करें! 🌍",
            compareTitle: "ग्रह तुलना",
            compareDiameter: "व्यास",
            photoSaved: "📸 फोटो सहेजा गया!",
            photoButton: "फोटो मोड",
            dateTitle: "किसी तिथि पर स्थितियाँ",
            dateApply: "लागू करें",
            dateToday: "आज",
            dateNote: "ग्रहों की अनुमानित स्थितियाँ (J2000 माध्य देशांतर)।",
            dateActive: "स्थितियाँ"
        },
        objects: {
            sun: { name: "सूर्य", desc: "हमारे सौर मंडल के केंद्र में स्थित तारा। यह सभी ग्रहों को प्रकाश और ऊर्जा प्रदान करता है।", funFact: "सूर्य सौर मंडल के द्रव्यमान का 99.86% है!" },
            mercury: { name: "बुध", desc: "सबसे छोटा और सूर्य के सबसे निकटतम ग्रह। इसकी सतह चंद्रमा की तरह क्रेटर से ढकी है!", funFact: "बुध सबसे तेज ग्रह है, यह केवल 88 दिनों में सूर्य का चक्कर लगा लेता है!" },
            venus: { name: "शुक्र", desc: "आकार में समानता के कारण पृथ्वी की जुड़वां बहन, लेकिन यह जहरीले बादलों वाला एक गर्म नर्क है!", funFact: "शुक्र उल्टी दिशा में घूमता है! यह एकमात्र ग्रह है जो विपरीत दिशा में घूमता है।" },
            earth: { name: "पृथ्वी", desc: "नीला ग्रह! पृथ्वी का 71% हिस्सा पानी से ढका है, और इसमें जीवन के लिए सही परिस्थितियां हैं।", funFact: "पृथ्वी एकमात्र ज्ञात ग्रह है जहाँ जीवन है! यह अंतरिक्ष में हमारा सुंदर घर है।" },
            mars: { name: "मंगल", desc: "लाल ग्रह! इसकी मिट्टी में जंग लगे लोहे के कारण यह लाल दिखता है। वैज्ञानिक यहाँ प्राचीन जीवन के संकेत खोज रहे हैं!", funFact: "मंगल पर सौर मंडल का सबसे बड़ा ज्वालामुखी है - ओलंपस मॉन्स माउंट एवरेस्ट से 3 गुना ऊंचा है!" },
            jupiter: { name: "बृहस्पति", desc: "हमारे सौर मंडल का सबसे बड़ा ग्रह! यह एक गैस दानव है जिसमें सुंदर घूमते हुए बादल हैं।", funFact: "बृहस्पति इतना बड़ा है कि बाकी सभी ग्रह इसमें समा सकते हैं! इसमें ग्रेट रेड स्पॉट नामक एक विशाल तूफान भी है।" },
            saturn: { name: "शनि", desc: "छल्लों का राजा! शनि के पास हमारे सौर मंडल का सबसे शानदार छल्ला प्रणाली है।", funFact: "शनि के छल्ले बर्फ और चट्टान के अरबों टुकड़ों से बने हैं! कुछ रेत के कण जितने छोटे हैं, कुछ घर जितने बड़े!" },
            uranus: { name: "अरुण", desc: "लेटा हुआ ग्रह! मीथेन गैस के कारण यह नीले-हरे रंग का एक बर्फ दानव है।", funFact: "अरुण अपनी तरफ झुका हुआ है! यह लट्टू की तरह घूमने के बजाय गेंद की तरह लुढ़कते हुए सूर्य की परिक्रमा करता है।" },
            neptune: { name: "वरुण", desc: "सबसे तेज हवाओं वाला ग्रह! यह गहरा नीला बर्फ दानव सूर्य से सबसे दूर का ग्रह है।", funFact: "वरुण पर सौर मंडल की सबसे तेज हवाएं चलती हैं - 2,000 किमी/घंटा तक! यह एक जेट विमान से भी तेज है!" },
            pluto: { name: "प्लूटो", desc: "कभी 9वां ग्रह माना जाता था! प्लूटो अब एक बौना ग्रह है लेकिन यह अभी भी बहुत अच्छा है!", funFact: "प्लूटो की सतह पर दिल के आकार का क्षेत्र है जिसे टॉम्बो रेजिओ कहा जाता है, जो जमे हुए नाइट्रोजन से बना है।" },
            ceres: { name: "सेरेस", desc: "क्षुद्रग्रह बेल्ट का सबसे बड़ा निवासी! सेरेस अपनी बर्फीली सतह के नीचे एक महासागर छिपा सकता है।", funFact: "सेरेस मंगल और बृहस्पति के बीच क्षुद्रग्रह बेल्ट में रहता है! यह वहां की सबसे बड़ी वस्तु है।" },
            eris: { name: "एरिस", desc: "सबसे दूर के बौने ग्रहों में से एक! इसका नाम कलह की ग्रीक देवी के नाम पर रखा गया है।", funFact: "एरिस आकार में प्लूटो के लगभग बराबर है! इसकी खोज ने वैज्ञानिकों को 'बौना ग्रह' श्रेणी बनाने में मदद की।" },
            makemake: { name: "मेकमेक", desc: "बाहरी सौर मंडल में लाल-भूरे रंग की सतह वाला एक रहस्यमय बौना ग्रह।", funFact: "मेकमेक का नाम ईस्टर द्वीप के रापा नुई लोगों के निर्माता देवता के नाम पर रखा गया है!" },
            haumea: { name: "हौमिया", desc: "अंडे के आकार का बौना ग्रह! यह सौर मंडल में सबसे तेजी से घूमने वाली वस्तुओं में से एक है।", funFact: "हौमिया बहुत तेजी से घूमता है! यहाँ एक दिन केवल 4 घंटे का होता है, जिससे इसका आकार फुटबॉल जैसा हो जाता है!" },
            'james-webb': { name: "जेम्स वेब", desc: "अब तक का सबसे शक्तिशाली स्पेस टेलीस्कोप! यह ब्रह्मांडीय धूल के माध्यम से देखने के लिए अवरक्त प्रकाश का उपयोग करता है।", funFact: "जेम्स वेब उन आकाशगंगाओं को देख सकता है जो बिग बैंग के ठीक बाद बनी थीं, 13 अरब साल पहले!" },
            hubble: { name: "हबल", desc: "एक प्रसिद्ध टेलीस्कोप जिसने हमें आकाशगंगाओं और ग्रहों की अद्भुत तस्वीरें दिखाई हैं!", funFact: "हबल ने ब्रह्मांड की 15 लाख से अधिक तस्वीरें ली हैं! यह हर 95 मिनट में पृथ्वी की परिक्रमा करता है।" },
            iss: { name: "ISS", desc: "अंतरिक्ष में एक विशाल प्रयोगशाला जहाँ अंतरिक्ष यात्री रहते हैं और काम करते हैं! 2000 से लगातार व्याप्त।", funFact: "ISS फुटबॉल मैदान जितना बड़ा है! अंतरिक्ष यात्री वहाँ हर दिन 16 सूर्योदय और सूर्यास्त देखते हैं!" },
            // Kerbol सिस्टम
            kerbol: { name: "Kerbol", desc: "Kerbol सिस्टम के केंद्र में पीला बौना तारा, हमारे सूर्य जैसा लेकिन छोटा।", funFact: "⚠️ ईस्टर एग: पुराने KSP में -250m से नीचे जाने पर शून्य से विभाजन क्रैश होता था!" },
            moho: { name: "Moho", desc: "Kerbol के सबसे नजदीक ग्रह, झुलसा और वायुमंडल रहित।", funFact: "🕳️ Mohole: उत्तरी ध्रुव पर एक विशाल लगभग ऊर्ध्वाधर छेद - एक बग जो फीचर बना!" },
            eve: { name: "Eve", desc: "पहुंचना आसान, छोड़ना असंभव! कुचलने वाले वायुमंडल वाली बैंगनी दुनिया।", funFact: "💜 वायुमंडल इतना घना है कि सोलर पैनल फट जाते हैं! समुद्र में 'Explodium' है!" },
            gilly: { name: "Gilly", desc: "Eve की परिक्रमा करता एक छोटा पकड़ा गया क्षुद्रग्रह, अत्यंत कम गुरुत्वाकर्षण।", funFact: "🦘 गुरुत्वाकर्षण 0.005g - जेटपैक से कूदकर कक्षा में जा सकते हैं!" },
            kerbin: { name: "Kerbin", desc: "Kerbals का घर! सांस लेने योग्य वायुमंडल और जीवन वाला एकमात्र ग्रह।", funFact: "🏠 रहस्यों से भरा: KSC 2, काले मोनोलिथ (2001 संदर्भ), और डेवलपर स्मारक!" },
            'the-mun': { name: "The Mun", desc: "Kerbin का धूसर, गड्ढों से भरा चंद्रमा। हर KSP खिलाड़ी की पहली मंजिल!", funFact: "🌑 कई आर्च और मोनोलिथ - 2001: स्पेस ओडिसी को श्रद्धांजलि!" },
            minmus: { name: "Minmus", desc: "पुदीने रंग का छोटा चंद्रमा, अजीब बर्फीले मैदान और बहुत कम गुरुत्वाकर्षण।", funFact: "🍧 किंवदंती के अनुसार, Minmus जमे हुए मिठाई (पुदीना आइसक्रीम) से बना है!" },
            duna: { name: "Duna", desc: "जंग-लाल मंगल एनालॉग। अधिकांश खोजकर्ताओं का पहला अंतरग्रहीय लक्ष्य।", funFact: "👽 विशाल Kerbal चेहरा + SSTV सिग्नल वाला पिरामिड जो सोयुज छवि डीकोड करता है!" },
            ike: { name: "Ike", desc: "Duna से ज्वारीय रूप से बंधा एक बड़ा धूसर चंद्रमा, इसके आकाश पर हावी।", funFact: "🔒 इतना करीब कि इसका गुरुत्वाकर्षण Duna संचालन को प्रभावित करता है!" },
            dres: { name: "Dres", desc: "क्षुद्रग्रह बेल्ट में भूला हुआ बौना ग्रह। 'Dres मौजूद नहीं है' मजाक।", funFact: "🤔 समुदाय का मजाक: कोई नहीं जाता! एक विशाल घाटी है।" },
            jool: { name: "Jool", desc: "हरा गैस दानव - 5 जटिल चंद्रमाओं के साथ शुरुआती लोगों का 'अंतिम बॉस'।", funFact: "☠️ बहुत गहरे उतरो और नष्ट हो जाओ! 'Jool 5' चुनौती किंवदंती है!" },
            laythe: { name: "Laythe", desc: "सांस लेने योग्य लेकिन ठंडे/रेडियोधर्मी वायुमंडल वाला समुद्री चंद्रमा। सबसे पृथ्वी जैसा!", funFact: "🌊 Vall और Tylo के साथ 1:2:4 लाप्लास अनुनाद का हिस्सा!" },
            vall: { name: "Vall", desc: "सुंदर नीली बर्फ की गेंद। चिकनी जमी सतह लैंडिंग आसान बनाती है।", funFact: "❄️ महान 1:2:4 लाप्लास कक्षीय अनुनाद का हिस्सा!" },
            tylo: { name: "Tylo", desc: "Kerbin गुरुत्वाकर्षण लेकिन बिना वायुमंडल वाला विशाल चट्टानी चंद्रमा। सबसे कठिन लैंडिंग!", funFact: "💪 यहाँ उतरना KSP की सबसे कठिन चुनौतियों में से एक है!" },
            bop: { name: "Bop", desc: "मृत Kraken ईस्टर एग वाला भूरा उबड़-खाबड़ पकड़ा गया क्षुद्रग्रह।", funFact: "🦑 स्पेस Kraken का शव उत्तरी ध्रुव के पास नुकीला है!" },
            pol: { name: "Pol", desc: "पराग कण जैसा पीला नुकीला चंद्रमा। अजीब चट्टान संरचनाएं।", funFact: "🌵 सतह अजीब पीली नुकीली चट्टानों से ढकी - कैक्टस जैसी!" },
            eeloo: { name: "Eeloo", desc: "बृहस्पति के यूरोपा जैसी Tiger Stripes वाली दूरस्थ बर्फ दुनिया।", funFact: "📡 दूसरे गैस दानव का चंद्रमा होना था जो कभी नहीं जोड़ा गया!" }
        },
        alienShip: {
            signalDetected: "सिग्नल का पता चला",
            fermiParadox: "फर्मी विरोधाभास"
        },
        drake: {
            title: "ड्रेक समीकरण कैलकुलेटर",
            description: "मिल्की वे आकाशगंगा में सक्रिय, संचार-सक्षम अलौकिक सभ्यताओं की संख्या का अनुमान लगाएं।",
            variables: {
                R: { name: "तारा निर्माण दर", desc: "हमारी आकाशगंगा में प्रति वर्ष बनने वाले तारों की औसत संख्या।", unit: "/ वर्ष" },
                fp: { name: "ग्रहों वाला अंश", desc: "ग्रह प्रणाली वाले तारों का अंश।", unit: "" },
                ne: { name: "रहने योग्य ग्रह", desc: "प्रति तारे संभावित रहने योग्य ग्रहों की औसत संख्या।", unit: "" },
                fl: { name: "जीवन वाला अंश", desc: "रहने योग्य ग्रहों पर जीवन विकसित होने का अंश।", unit: "" },
                fi: { name: "बुद्धिमान अंश", desc: "जीवन वाले ग्रहों पर बुद्धिमान सभ्यता विकसित होने का अंश।", unit: "" },
                fc: { name: "संचार योग्य अंश", desc: "पता लगाने योग्य संकेत विकसित करने वाली सभ्यताओं का अंश।", unit: "" },
                L: { name: "सभ्यता की आयु (वर्ष)", desc: "सभ्यता द्वारा पता लगाने योग्य संकेत भेजने की अवधि।", unit: "वर्ष" }
            },
            presets: {
                skeptical: "संशयवादी",
                scientific: "वैज्ञानिक",
                optimistic: "आशावादी"
            },
            result: {
                detectableCivilizations: "पता लगाने योग्य सभ्यताएं",
                empty: "शायद हम आकाशगंगा में अकेले हैं...",
                lonely: "कुछ पड़ोसी हैं, लेकिन इतने दूर कि शायद हम उन्हें कभी नहीं सुनेंगे।",
                crowded: "आकाशगंगा जीवन से भरी है! सब कहाँ हैं?"
            }
        },
        fermiModal: {
            title: "फर्मी विरोधाभास",
            intro: "यदि ब्रह्मांड में अरबों तारे और ग्रह हैं, तो हमने अभी तक एलियंस से मुलाकात क्यों नहीं की?",
            introDesc: "यह मूल प्रश्न है जो भौतिक विज्ञानी एनरिको फर्मी ने 1950 में उठाया था। ब्रह्मांड की आयु (13.8 अरब वर्ष) और इसकी विशालता को देखते हुए, अलौकिक जीवन की संभावना अधिक लगती है। फिर भी, केवल सन्नाटा है।",
            footer: "रहस्य बना हुआ है। क्या हम अकेले हैं, या हम बस गलत जगह देख रहे हैं?",
            theories: {
                greatFilter: {
                    title: "महान फ़िल्टर",
                    description: "शायद एक ऐसी विकासवादी बाधा है जिसे पार करना लगभग असंभव है (जैसे बहुकोशिकीय जीवन का उदभव या तकनीकी आत्म-विनाश), जो सभ्यताओं को अंतरतारकीय यात्रा तक पहुँचने से रोकती है।"
                },
                rareEarth: {
                    title: "दुर्लभ पृथ्वी",
                    description: "जटिल जीवन के लिए आवश्यक शर्तें (ग्रह का आकार, स्थिर चंद्रमा, शांत सूर्य, चुंबकीय क्षेत्र) शायद हमारी सोच से कहीं अधिक दुर्लभ हैं।"
                },
                radioSilence: {
                    title: "रेडियो मौन",
                    description: "शायद सभ्यताएं तकनीक बदलने या गायब होने से पहले बहुत कम समय के लिए रेडियो संकेत भेजती हैं, जिससे पता लगाना मुश्किल हो जाता है।"
                },
                darkForest: {
                    title: "अंधेरा जंगल",
                    description: "एक चिंताजनक सिद्धांत: ब्रह्मांड शिकारियों से भरे अंधेरे जंगल की तरह है। बुद्धिमान सभ्यताएं अधिक उन्नत सभ्यताओं द्वारा नष्ट होने से बचने के लिए जानबूझकर छिपती हैं।"
                }
            }
        }
    },
    ru: {
        title: "AstroClick",
        subtitle: "Исследование Солнечной системы, куб за кубом.",
        clickInstruction: "Нажмите на любую планету или объект, чтобы узнать больше! 🚀",
        orbitScale: "МАСШТАБ ОРБИТЫ",
        timeControl: "УПРАВЛЕНИЕ ВРЕМЕНЕМ",
        simplified: "СХЕМАТИЧНО",
        realScale: "РЕАЛЬНЫЙ МАСШТАБ",
        layers: "СЛОИ",
        layerNone: "Нет",
        layerHabitable: "Зона обитаемости",
        layerGravity: "Гравитационный колодец",
        layerLagrange: "Точки Лагранжа",
        rocketTooltip: "Нажмите ПРОБЕЛ, чтобы запустить спутник!",
        backToSpace: "🚀 Вернуться в космос",
        didYouKnow: "💡 Знаете ли вы?",
        temperature: "Температура",
        distance: "Расстояние",
        distanceEarth: "Среднее расст. до Земли",
        moons: "Спутники",
        special: "Особенности",
        launchDate: "Дата запуска",
        purpose: "Назначение",
        orbit: "Орбита",
        orbitOf: "Орбита",
        orbitalPeriod: "Орбитальный период",
        planet: "🪐 Планета",
        dwarfPlanet: "⭐ Карликовая планета",
        telescope: "🔭 Космический телескоп",
        satellite: "🛰️ Спутник",
        star: "☀️ Звезда",
        nasaGallery: "Галерея NASA",
        loadingImages: "Загрузка изображений NASA...",
        galleryUnavailable: "Галерея недоступна",
        systemToggle: "СИСТЕМА",
        solarSystem: "Солнечная",
        kerbolSystem: "Кербол (KSP)",
        distanceKerbin: "Среднее расст. до Кербина",
        contact: "Вопросы или предложения? Свяжитесь с нами:",
        aboutDescription: "AstroClick — бесплатный некоммерческий образовательный проект.",
        aboutDevWith: "Разработано с помощью ИИ",
        aboutEasterEgg: "Псс... Кликните 3 раза на лого, чтобы увидеть космический сюрприз!",
        aboutOpenSource: "Исходный код свободно доступен для обучения.",
        comet: "☄️ Комета",
        features: {
            tourTitle: "Экскурсия",
            tourStop: "Остановить экскурсию",
            tourNext: "Далее",
            tourPrev: "Назад",
            searchPlaceholder: "Поиск объекта…",
            searchNoResult: "Ничего не найдено",
            quizTitle: "Космическая викторина",
            quizQuestion: "Вопрос",
            quizScore: "Счёт",
            quizBest: "Лучший результат",
            quizCorrect: "Верно!",
            quizWrong: "Неверно!",
            quizNext: "Следующий вопрос",
            quizFinish: "Посмотреть результат",
            quizRestart: "Играть снова",
            quizQMoons: "Сколько спутников у {name}?",
            quizQFact: "Какому объекту соответствует этот факт?",
            quizQClosest: "Какой из этих объектов ближе всего к звезде?",
            quizQTemp: "Какова температура {name}?",
            quizPerfect: "Идеально! Настоящий астроном! 🏆",
            quizGood: "Отлично! Ты знаешь свою Солнечную систему! 🚀",
            quizOk: "Неплохо! Продолжай исследовать! 🔭",
            quizBad: "Исследуй ещё немного и попробуй снова! 🌍",
            compareTitle: "Сравнение планет",
            compareDiameter: "Диаметр",
            photoSaved: "📸 Фото сохранено!",
            photoButton: "Режим фото",
            dateTitle: "Положение на дату",
            dateApply: "Применить",
            dateToday: "Сегодня",
            dateNote: "Приблизительные положения планет (средние долготы J2000).",
            dateActive: "Положение на"
        },
        objects: {
            sun: {
                name: "Солнце",
                desc: "Наша звезда! Солнце — гигантский раскалённый шар из плазмы, дающий свет и тепло всем планетам нашей системы.",
                funFact: "Солнце составляет 99,86% всей массы Солнечной системы! На все планеты вместе приходится лишь 0,14%."
            },
            mercury: {
                name: "Меркурий",
                desc: "Самая маленькая планета и ближайшая к Солнцу. Её поверхность усеяна кратерами, как у нашей Луны.",
                funFact: "Меркурий — самая быстрая планета: он облетает Солнце всего за 88 земных дней!"
            },
            venus: {
                name: "Венера",
                desc: "Часто называют «сестрой-близнецом» Земли из-за схожих размеров, но на самом деле это раскалённый ад, покрытый облаками серной кислоты!",
                funFact: "Венера вращается в обратную сторону! Это единственная планета, которая крутится против обычного направления."
            },
            earth: {
                name: "Земля",
                desc: "Голубая планета! 71% поверхности покрыто водой, и здесь идеальные условия для жизни. Это наш дом в бескрайнем космосе.",
                funFact: "Земля — единственное известное место во Вселенной, где существует жизнь! Здесь обитает более 8 миллионов видов."
            },
            mars: {
                name: "Марс",
                desc: "Красная планета! Свой характерный цвет она получила благодаря оксиду железа (ржавчине) в почве. Учёные ищут здесь следы древней жизни.",
                funFact: "На Марсе находится самый большой вулкан в Солнечной системе — Олимп, который в 3 раза выше Эвереста и по площади сравним с Францией!"
            },
            jupiter: {
                name: "Юпитер",
                desc: "Гигант Солнечной системы! Эта огромная газовая планета украшена великолепными полосами облаков и легендарным Большим красным пятном.",
                funFact: "Юпитер настолько массивен, что все остальные планеты системы поместились бы внутри него! Большое красное пятно — это шторм, бушующий уже более 400 лет."
            },
            saturn: {
                name: "Сатурн",
                desc: "Властелин колец! Сатурн обладает самой впечатляющей и заметной системой колец во всей Солнечной системе.",
                funFact: "Кольца Сатурна состоят из миллиардов кусочков льда и камня! Некоторые размером с песчинку, другие — с дом."
            },
            uranus: {
                name: "Уран",
                desc: "Лежащая планета! Этот ледяной гигант голубовато-зелёного цвета получил свой оттенок благодаря метану в атмосфере.",
                funFact: "Уран наклонён на 98° к плоскости орбиты! Он буквально «катится» вокруг Солнца, как шар для боулинга."
            },
            neptune: {
                name: "Нептун",
                desc: "Планета штормов! Этот тёмно-синий ледяной гигант — самая удалённая от Солнца планета с самыми мощными ветрами в системе.",
                funFact: "На Нептуне дуют самые сильные ветры в Солнечной системе — до 2100 км/ч! Это быстрее скорости звука."
            },
            pluto: {
                name: "Плутон",
                desc: "Бывшая 9-я планета! Переклассифицирован в 2006 году как карликовая планета, но Плутон по-прежнему очаровывает своей ледяной поверхностью и тонкой атмосферой.",
                funFact: "На Плутоне есть «сердце»! Эта область в форме сердца называется равнина Спутника и состоит из замёрзшего азота."
            },
            ceres: {
                name: "Церера",
                desc: "Королева пояса астероидов! Церера — крупнейший объект между Марсом и Юпитером. Под её поверхностью может скрываться подлёдный океан.",
                funFact: "Церера составляет около трети всей массы пояса астероидов! Она была открыта в 1801 году, задолго до других карликовых планет."
            },
            eris: {
                name: "Эрида",
                desc: "Небесная раздорница! Эта карликовая планета, названная в честь греческой богини раздора, — одна из самых массивных во внешней Солнечной системе.",
                funFact: "Именно открытие Эриды в 2005 году привело к переклассификации Плутона! Она чуть меньше Плутона, но тяжелее."
            },
            makemake: {
                name: "Макемаке",
                desc: "Таинственный творец! Эта красноватая карликовая планета обращается в ледяных далях Солнечной системы, за орбитой Нептуна.",
                funFact: "Макемаке названа в честь бога-создателя народа рапануи с острова Пасхи! Открыта в день Пасхи 2005 года."
            },
            haumea: {
                name: "Хаумеа",
                desc: "Космическое яйцо! Эта карликовая планета уникальна: сверхбыстрое вращение придаёт ей овальную форму, как мяч для регби.",
                funFact: "Хаумеа делает полный оборот всего за 4 часа! Это один из самых быстро вращающихся объектов Солнечной системы."
            },
            'james-webb': {
                name: "Джеймс Уэбб",
                desc: "Самый мощный космический телескоп из когда-либо построенных! Он наблюдает Вселенную в инфракрасном диапазоне, проникая сквозь космическую пыль.",
                funFact: "Зеркало телескопа Джеймса Уэбба имеет диаметр 6,5 метра! Он может видеть галактики, образовавшиеся 13,5 миллиарда лет назад, вскоре после Большого взрыва."
            },
            hubble: {
                name: "Хаббл",
                desc: "Настоящий пионер-легенда! С 1990 года этот космический телескоп дарит нам потрясающие снимки далёких галактик, красочных туманностей и космических явлений.",
                funFact: "Хаббл сделал более 1,5 миллиона снимков Вселенной! Он вращается вокруг Земли на высоте 547 км и делает полный оборот каждые 95 минут."
            },
            iss: {
                name: "Международная космическая станция",
                desc: "Гигантская лаборатория на орбите! Космонавты разных стран живут и работают здесь постоянно с ноября 2000 года.",
                funFact: "МКС размером с футбольное поле! Космонавты на борту наблюдают по 16 восходов и закатов каждый день."
            },
            phobos: { name: "Фобос", desc: "Бо́льший спутник Марса. Это бугристый камень, усеянный кратерами.", funFact: "Фобос каждый год приближается к Марсу! В итоге он упадёт на планету или развалится." },
            deimos: { name: "Деймос", desc: "Меньший спутник Марса. Он больше похож на гладкий астероид.", funFact: "Деймос намного меньше Фобоса и постепенно отдаляется от Марса." },
            io: { name: "Ио", desc: "Вулканический спутник Юпитера. Его жёлтый цвет обусловлен серой от масштабных извержений.", funFact: "Ио — самое вулканически активное тело в Солнечной системе!" },
            europa: { name: "Европа", desc: "Ледяной спутник с гладкой поверхностью. Учёные полагают, что под льдом скрывается обширный океан.", funFact: "Подповерхностный океан Европы содержит больше воды, чем все океаны Земли!" },
            ganymede: { name: "Ганимед", desc: "Великан среди спутников. Это единственный известный спутник с собственным магнитным полем.", funFact: "Ганимед — крупнейший спутник Солнечной системы, он больше Меркурия!" },
            callisto: { name: "Каллисто", desc: "Древний спутник, покрытый кратерами. Под его поверхностью тоже может быть солёный океан.", funFact: "Каллисто — самое кратерированное тело в Солнечной системе." },
            titan: { name: "Титан", desc: "Крупнейший спутник Сатурна. Обладает плотной азотной атмосферой и напоминает замёрзшую Землю.", funFact: "На Титане есть плотная атмосфера и жидкие озёра из метана и этана!" },
            enceladus: { name: "Энцелад", desc: "Блестящий ледяной спутник с подповерхностным океаном, который может быть пригоден для жизни.", funFact: "Энцелад выбрасывает в космос гейзеры солёной воды!" },
            titania: { name: "Титания", desc: "Крупнейший спутник Урана. Грязный ледяной шар, смешанный с камнем.", funFact: "На Титании есть гигантский каньон, затмевающий Большой каньон на Земле." },
            triton: { name: "Тритон", desc: "Единственный крупный спутник в Солнечной системе, обращающийся в обратном направлении.", funFact: "Тритон, вероятно, прилетел из пояса Койпера и был захвачен Нептуном." },
            charon: { name: "Харон", desc: "Крупнейший спутник Плутона. Образует двойную систему с Плутоном.", funFact: "Харон настолько велик относительно Плутона, что они обращаются вокруг общего центра!" },
            // Точки Лагранжа
            l1: { name: "Точка L1", desc: "Расположена прямо между Солнцем и Землёй. Идеально подходит для непрерывного наблюдения за Солнцем.", funFact: "Спутник SOHO расположен здесь для круглосуточного мониторинга солнечных бурь!" },
            l2: { name: "Точка L2", desc: "Расположена за Землёй (относительно Солнца). Идеальна для космических телескопов, так как Земля закрывает свет Солнца.", funFact: "Телескоп Джеймс Уэбб вращается здесь, чтобы поддерживать свои инструменты при сверхнизкой температуре!" },
            l3: { name: "Точка L3", desc: "Скрыта за Солнцем, напротив Земли. Это нестабильная точка.", funFact: "В научной фантастике здесь часто прячут «Контр-Землю», но мы увидели бы её гравитационное влияние!" },
            l4: { name: "Точка L4", desc: "Расположена на 60° впереди Земли на её орбите. Это стабильная гравитационная «парковка».", funFact: "Здесь естественным образом накапливаются астероиды! Их называют «троянцами»." },
            l5: { name: "Точка L5", desc: "Расположена на 60° позади Земли. Как и L4, это очень стабильная область.", funFact: "Некоторые учёные рассматривают эту точку как идеальное место для будущих гигантских космических колоний!" },
            // Система Кербол (KSP)
            kerbol: {
                name: "Кербол",
                desc: "Жёлтый карликовый звезда в центре системы Кербол. Похожа на наше Солнце, но гораздо меньше и идеальна для кербальских миссий!",
                funFact: "⚠️ Пасхалка: В старых версиях KSP спуск ниже -250м вызывал краш из-за деления на ноль! Твёрдой поверхности там нет."
            },
            moho: {
                name: "Мохо",
                desc: "Ближайшая к Керболу планета. Выжженный безатмосферный мир, покрытый кратерами и тёмными вулканическими равнинами.",
                funFact: "🕳️ Мохол: Гигантская почти вертикальная дыра на Северном полюсе! Это был баг генерации рельефа, который разработчики оставили, потому что игрокам он понравился."
            },
            eve: {
                name: "Ив",
                desc: "Легко добраться, почти невозможно улететь! Этот прекрасный фиолетовый мир обладает сокрушающей атмосферой и загадочными океанами.",
                funFact: "💜 Атмосфера Ив настолько плотная, что солнечные панели могут взорваться от давления! В океанах — «Эксплодиум»."
            },
            gilly: {
                name: "Гилли",
                desc: "Крошечный захваченный астероид на орбите Ив. Его неправильная форма и почти нулевая гравитация создают уникальный вызов.",
                funFact: "🦘 Гравитация Гилли всего 0,005g! Можно выйти на орбиту, просто прыгнув с джетпаком."
            },
            kerbin: {
                name: "Кербин",
                desc: "Родина кербалов! Единственная планета с пригодной для дыхания атмосферой и жизнью. Голубые океаны, зелёные континенты и белые полярные шапки.",
                funFact: "🏠 Кербин полон секретов: KSC 2 (заброшенный космический центр), чёрные монолиты (отсылка к «2001») и мемориалы разработчиков!"
            },
            'the-mun': {
                name: "Мун",
                desc: "Серый изрытый кратерами спутник Кербина. Первая цель каждого игрока KSP и настоящий обряд посвящения!",
                funFact: "🌑 На Муне можно найти множество арок и чёрных Монолитов — явный оммаж «2001: Космическая одиссея»!"
            },
            minmus: {
                name: "Минмус",
                desc: "Маленький мятного цвета спутник Кербина. Странные ледяные равнины и низкая гравитация делают его популярным направлением.",
                funFact: "🍧 По легенде KSP, Минмус сделан из замороженного десерта (мятного мороженого)! Его бледно-зелёный цвет это подтверждает."
            },
            duna: {
                name: "Дюна",
                desc: "Аналог Марса! Ржаво-красный мир с разреженной атмосферой и внушительными полярными шапками. Отлично подходит для роверов.",
                funFact: "👽 Здесь есть гигантское лицо кербала (отсылка к «лицу на Марсе») и пирамида, передающая SSTV-сигнал, декодируемый в изображение «Союза»!"
            },
            ike: {
                name: "Айк",
                desc: "Внушительный серый спутник Дюны. Он находится в приливном захвате и доминирует на небе Дюны.",
                funFact: "🔒 Айк настолько близок, что его гравитация заметно влияет на операции на поверхности Дюны! Вид в небе потрясающий."
            },
            dres: {
                name: "Дрес",
                desc: "Одинокая карликовая планета в поясе астероидов. Часто забыта исследователями, но обладает гигантским каньоном.",
                funFact: "🤔 «Дрес не существует» — популярная шутка сообщества KSP, потому что туда никто не летает! Но он того стоит."
            },
            jool: {
                name: "Джул",
                desc: "Величественный зелёный газовый гигант! «Финальный босс» для новичков со сложной системой из 5 спутников в орбитальном резонансе.",
                funFact: "☠️ Спуститесь слишком глубоко в атмосферу Джула — и ваш корабль мгновенно разрушится! Челлендж «Jool 5» (посадка на все 5 спутников) — легенда."
            },
            laythe: {
                name: "Лейте",
                desc: "Океанический спутник с пригодной для дыхания, но холодной и радиоактивной атмосферой. Самый похожий на Кербин мир!",
                funFact: "🌊 Лейте входит в резонанс Лапласа 1:2:4 с Валлом и Тайло, как галилеевы спутники Юпитера!"
            },
            vall: {
                name: "Валл",
                desc: "Прекрасный голубой ледяной шар. Гладкая замёрзшая поверхность облегчает посадку. Захватывающие пейзажи.",
                funFact: "❄️ Валл входит в легендарный орбитальный резонанс Лапласа 1:2:4 с Лейте и Тайло!"
            },
            tylo: {
                name: "Тайло",
                desc: "Массивный скалистый спутник с гравитацией как у Кербина, но БЕЗ атмосферы. Самая сложная посадка в игре!",
                funFact: "💪 Посадка на Тайло — один из самых сложных челленджей во всём KSP. Требуется огромное количество топлива!"
            },
            bop: {
                name: "Боп",
                desc: "Маленький захваченный астероид, коричневый и бугристый. Его неправильная форма и низкая гравитация усложняют посадку.",
                funFact: "🦑 Пасхалка «Мёртвый Кракен»! Труп легендарного космического Кракена насажен возле Северного полюса Бопа."
            },
            pol: {
                name: "Пол",
                desc: "Самый маленький спутник Джула с жёлтой поверхностью, усеянной скальными шипами. Похож на гигантскую пылинку.",
                funFact: "🌵 Поверхность Пола покрыта странными жёлтыми остроконечными скалами — выглядит как космический кактус!"
            },
            eeloo: {
                name: "Иилу",
                desc: "Ледяной мир на окраине системы. Белая поверхность с коричневыми трещинами напоминает «тигровые полосы» Европы.",
                funFact: "📡 Изначально Иилу планировался как спутник второго газового гиганта, который так и не добавили в игру!"
            }
        },
        alienShip: {
            signalDetected: "Сигнал обнаружен",
            fermiParadox: "Парадокс Ферми"
        },
        drake: {
            title: "Калькулятор уравнения Дрейка",
            description: "Оцените количество активных, способных к контакту внеземных цивилизаций в галактике Млечный Путь.",
            variables: {
                R: { name: "Скорость звездообразования", desc: "Количество звёзд, образующихся в нашей галактике за год.", unit: "/ год" },
                fp: { name: "Доля с планетами", desc: "Процент звёзд, имеющих планеты.", unit: "" },
                ne: { name: "Обитаемые планеты", desc: "Среднее число планет, потенциально пригодных для жизни, на звезду.", unit: "" },
                fl: { name: "Доля с жизнью", desc: "Вероятность зарождения жизни на обитаемой планете.", unit: "" },
                fi: { name: "Доля с разумом", desc: "Вероятность того, что жизнь эволюционирует до разума.", unit: "" },
                fc: { name: "Доля с коммуникацией", desc: "Вероятность развития технологии, создающей обнаруживаемые сигналы.", unit: "" },
                L: { name: "Продолжительность (лет)", desc: "Время, в течение которого цивилизация посылает обнаруживаемые сигналы.", unit: "лет" }
            },
            presets: {
                skeptical: "Скептический",
                scientific: "Научный",
                optimistic: "Оптимистичный"
            },
            result: {
                detectableCivilizations: "Обнаруживаемые цивилизации",
                empty: "Возможно, мы одиноки в галактике...",
                lonely: "Несколько соседей, но так далеко, что мы можем их никогда не услышать.",
                crowded: "Галактика кишит жизнью! Где же все?"
            }
        },
        fermiModal: {
            title: "Парадокс Ферми",
            intro: "Если во Вселенной миллиарды звёзд и планет, почему мы до сих пор не встретили инопланетян?",
            introDesc: "Это фундаментальный вопрос, поставленный физиком Энрико Ферми в 1950 году. Учитывая возраст Вселенной (13,8 миллиарда лет) и её необъятность, вероятность внеземной жизни кажется высокой. Однако царит лишь тишина.",
            footer: "Загадка остаётся. Мы одиноки, или просто ищем не там?",
            theories: {
                greatFilter: {
                    title: "Великий фильтр",
                    description: "Возможно, существует эволюционное препятствие, которое почти невозможно преодолеть (например, появление многоклеточной жизни или технологическое самоуничтожение), мешающее цивилизациям достичь стадии межзвёздных путешествий."
                },
                rareEarth: {
                    title: "Редкая Земля",
                    description: "Условия, необходимые для сложной жизни (размер планеты, стабилизирующая луна, спокойное солнце, магнитное поле), могут быть гораздо более редкими, чем мы думаем."
                },
                radioSilence: {
                    title: "Радиомолчание",
                    description: "Возможно, цивилизации излучают радиосигналы лишь короткое время, прежде чем сменить технологию или исчезнуть, что затрудняет обнаружение."
                },
                darkForest: {
                    title: "Тёмный лес",
                    description: "Тревожная теория: Вселенная подобна тёмному лесу, полному хищников. Разумные цивилизации намеренно скрываются, чтобы не быть уничтоженными более развитыми."
                }
            }
        }
    }
};

