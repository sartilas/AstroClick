import { Language } from './dictionary';

interface ObjectTranslation {
    name: string;
    description: string;
    funFact: string;
    temperature: string;
    realDistance: string;
    averageDistanceToEarth: string;
    orbitalPeriod: string;
    launchDate?: string;
    purpose?: string;
}

export const objectTranslations: Record<string, Record<Language, ObjectTranslation>> = {
    sun: {
        en: {
            name: "Sun",
            description: "Our Star! A nearly perfect sphere of hot plasma that provides the energy for life on Earth.",
            funFact: "The Sun makes up 99.86% of the mass of the entire Solar System!",
            temperature: "5,500°C (surface)",
            realDistance: "0 km (Center)",
            averageDistanceToEarth: "149.6 million km",
            orbitalPeriod: "N/A"
        },
        fr: {
            name: "Soleil",
            description: "Notre Étoile ! Une sphère presque parfaite de plasma chaud qui fournit l'énergie nécessaire à la vie sur Terre.",
            funFact: "Le Soleil représente 99,86% de la masse de tout le système solaire !",
            temperature: "5 500°C (surface)",
            realDistance: "0 km (Centre)",
            averageDistanceToEarth: "149,6 millions de km",
            orbitalPeriod: "N/A"
        },
        es: {
            name: "Sol",
            description: "¡Nuestra Estrella! Una esfera de plasma caliente que da energía a la vida en la Tierra.",
            funFact: "¡El Sol constituye el 99.86% de la masa de todo el sistema solar!",
            temperature: "5,500°C (superficie)",
            realDistance: "0 km (Centro)",
            averageDistanceToEarth: "149.6 millones de km",
            orbitalPeriod: "N/A"
        },
        zh: {
            name: "太阳",
            description: "我们的恒星！一个近乎完美的热等离子体球，为地球生命提供能量。",
            funFact: "太阳占整个太阳系质量的99.86%！",
            temperature: "5,500°C (表面)",
            realDistance: "0 公里 (中心)",
            averageDistanceToEarth: "1.496 亿公里",
            orbitalPeriod: "N/A"
        },
        hi: {
            name: "सूर्य",
            description: "हमारा तारा! गर्म प्लाज्मा का एक लगभग पूर्ण गोला जो पृथ्वी पर जीवन के लिए ऊर्जा प्रदान करता है।",
            funFact: "सूर्य पूरे सौरमंडल के द्रव्यमान का 99.86% बनाता है!",
            temperature: "5,500°C (सतह)",
            realDistance: "0 किमी (केंद्र)",
            averageDistanceToEarth: "14.96 करोड़ किमी",
            orbitalPeriod: "N/A"
        }
    },
    mercury: {
        en: {
            name: "Mercury",
            description: "The smallest planet and closest to the Sun. Its surface is covered with craters like our Moon!",
            funFact: "Mercury is the fastest planet, zooming around the Sun in just 88 Earth days!",
            temperature: "430°C (day) / -180°C (night)",
            realDistance: "57.9 million km from the Sun",
            averageDistanceToEarth: "77 million km",
            orbitalPeriod: "88 days"
        },
        fr: {
            name: "Mercure",
            description: "La plus petite planète et la plus proche du Soleil. Sa surface est couverte de cratères comme notre Lune !",
            funFact: "Mercure est la planète la plus rapide, faisant le tour du Soleil en seulement 88 jours terrestres !",
            temperature: "430°C (jour) / -180°C (nuit)",
            realDistance: "57,9 millions de km du Soleil",
            averageDistanceToEarth: "77 millions de km",
            orbitalPeriod: "88 jours"
        },
        es: {
            name: "Mercurio",
            description: "El planeta más pequeño y cercano al Sol. ¡Su superficie está cubierta de cráteres como nuestra Luna!",
            funFact: "¡Mercurio es el planeta más rápido, orbitando el Sol en solo 88 días terrestres!",
            temperature: "430°C (día) / -180°C (noche)",
            realDistance: "57.9 millones de km del Sol",
            averageDistanceToEarth: "77 millones de km",
            orbitalPeriod: "88 días"
        },
        zh: {
            name: "水星",
            description: "最小的行星，也是最接近太阳的行星。它的表面像我们的月球一样布满了陨石坑！",
            funFact: "水星是公转速度最快的行星，仅需88个地球日就能绕太阳一周！",
            temperature: "430°C (白天) / -180°C (夜晚)",
            realDistance: "距太阳 5790 万公里",
            averageDistanceToEarth: "7700 万公里",
            orbitalPeriod: "88 天"
        },
        hi: {
            name: "बुध",
            description: "सबसे छोटा ग्रह और सूर्य के सबसे निकट। इसकी सतह हमारे चंद्रमा की तरह गड्ढों से ढकी है!",
            funFact: "बुध सबसे तेज ग्रह है, जो केवल 88 पृथ्वी दिनों में सूर्य का चक्कर लगाता है!",
            temperature: "430°C (दिन) / -180°C (रात)",
            realDistance: "सूर्य से 5.79 करोड़ किमी",
            averageDistanceToEarth: "7.7 करोड़ किमी",
            orbitalPeriod: "88 दिन"
        }
    },
    venus: {
        en: {
            name: "Venus",
            description: "Often called Earth's twin because of similar size, but it's super hot with thick toxic clouds!",
            funFact: "Venus spins backwards! It's the only planet that rotates in the opposite direction.",
            temperature: "462°C (hottest planet!)",
            realDistance: "108.2 million km from the Sun",
            averageDistanceToEarth: "41 million km",
            orbitalPeriod: "225 days"
        },
        fr: {
            name: "Vénus",
            description: "Souvent appelée la jumelle de la Terre pour sa taille, mais elle est brûlante avec d'épais nuages toxiques !",
            funFact: "Vénus tourne à l'envers ! C'est la seule planète qui tourne dans la direction opposée.",
            temperature: "462°C (la plus chaude !)",
            realDistance: "108,2 millions de km du Soleil",
            averageDistanceToEarth: "41 millions de km",
            orbitalPeriod: "225 jours"
        },
        es: {
            name: "Venus",
            description: "A menudo llamada la gemela de la Tierra por su tamaño, ¡pero es súper caliente con nubes tóxicas!",
            funFact: "¡Venus gira al revés! Es el único planeta que rota en dirección opuesta.",
            temperature: "462°C (¡el más caliente!)",
            realDistance: "108.2 millones de km del Sol",
            averageDistanceToEarth: "41 millones de km",
            orbitalPeriod: "225 días"
        },
        zh: {
            name: "金星",
            description: "因大小相似常被称作地球的孪生姐妹，但它非常热，还有厚厚的毒云！",
            funFact: "金星是倒着转的！它是唯一一颗逆向自转的行星。",
            temperature: "462°C (最热的行星！)",
            realDistance: "距太阳 1.082 亿公里",
            averageDistanceToEarth: "4100 万公里",
            orbitalPeriod: "225 天"
        },
        hi: {
            name: "शुक्र",
            description: "समान आकार के कारण इसे अक्सर पृथ्वी की जुड़वां बहन कहा जाता है, लेकिन यह बहुत गर्म और जहरीले बादलों से भरा है!",
            funFact: "शुक्र उल्टा घूमता है! यह एकमात्र ग्रह है जो विपरीत दिशा में घूमता है।",
            temperature: "462°C (सबसे गर्म ग्रह!)",
            realDistance: "सूर्य से 10.82 करोड़ किमी",
            averageDistanceToEarth: "4.1 करोड़ किमी",
            orbitalPeriod: "225 दिन"
        }
    },
    earth: {
        en: {
            name: "Earth",
            description: "The Blue Planet! 71% of Earth is covered with water, and it has the perfect conditions for life.",
            funFact: "Earth is the only planet we know that has life! It's our beautiful home in space.",
            temperature: "15°C (average)",
            realDistance: "149.6 million km from the Sun",
            averageDistanceToEarth: "0 km (You are here!)",
            orbitalPeriod: "365.25 days"
        },
        fr: {
            name: "Terre",
            description: "La Planète Bleue ! 71% de la Terre est couverte d'eau, offrant des conditions parfaites pour la vie.",
            funFact: "La Terre est la seule planète connue abritant la vie ! C'est notre magnifique maison spatiale.",
            temperature: "15°C (moyenne)",
            realDistance: "149,6 millions de km du Soleil",
            averageDistanceToEarth: "0 km (Vous êtes ici !)",
            orbitalPeriod: "365,25 jours"
        },
        es: {
            name: "Tierra",
            description: "¡El Planeta Azul! El 71% de la Tierra está cubierto de agua, con condiciones perfectas para la vida.",
            funFact: "¡La Tierra es el único planeta conocido con vida! Es nuestro hermoso hogar en el espacio.",
            temperature: "15°C (promedio)",
            realDistance: "149.6 millones de km del Sol",
            averageDistanceToEarth: "0 km (¡Estás aquí!)",
            orbitalPeriod: "365.25 días"
        },
        zh: {
            name: "地球",
            description: "蓝色星球！地球表面的71%被水覆盖，拥有孕育生命的完美条件。",
            funFact: "地球是我们所知唯一拥有生命的行星！这是我们在太空中的美丽家园。",
            temperature: "15°C (平均)",
            realDistance: "距太阳 1.496 亿公里",
            averageDistanceToEarth: "0 公里 (你在这里！)",
            orbitalPeriod: "365.25 天"
        },
        hi: {
            name: "पृथ्वी",
            description: "नीला ग्रह! पृथ्वी का 71% हिस्सा पानी से ढका है, और इसमें जीवन के लिए आदर्श स्थितियां हैं।",
            funFact: "पृथ्वी एकमात्र ज्ञात ग्रह है जहाँ जीवन है! यह अंतरिक्ष में हमारा सुंदर घर है।",
            temperature: "15°C (औसत)",
            realDistance: "सूर्य से 14.96 करोड़ किमी",
            averageDistanceToEarth: "0 किमी (आप यहाँ हैं!)",
            orbitalPeriod: "365.25 दिन"
        }
    },
    ceres: {
        en: { name: "Ceres", description: "The largest object in the asteroid belt, classified as a dwarf planet.", funFact: "Ceres contains about a third of the total mass of the entire asteroid belt!", temperature: "-105°C", realDistance: "414 million km from the Sun", averageDistanceToEarth: "264 million km", orbitalPeriod: "4.6 years" },
        fr: { name: "Cérès", description: "Le plus grand objet de la ceinture d'astéroïdes, classé comme planète naine.", funFact: "Cérès contient environ un tiers de la masse totale de la ceinture d'astéroïdes !", temperature: "-105°C", realDistance: "414 millions de km du Soleil", averageDistanceToEarth: "264 millions de km", orbitalPeriod: "4,6 ans" },
        es: { name: "Ceres", description: "El objeto más grande del cinturón de asteroides.", funFact: "¡Contiene un tercio de la masa del cinturón!", temperature: "-105°C", realDistance: "414 millones km", averageDistanceToEarth: "264 millones km", orbitalPeriod: "4.6 años" },
        zh: { name: "谷神星", description: "小行星带中最大的天体。", funFact: "它包含了整个小行星带总质量的三分之一！", temperature: "-105°C", realDistance: "4.14 亿公里", averageDistanceToEarth: "2.64 亿公里", orbitalPeriod: "4.6 年" },
        hi: { name: "सेरेस", description: "क्षुद्रग्रह बेल्ट में सबसे बड़ी वस्तु।", funFact: "इसमें पूरे क्षुद्रग्रह बेल्ट के कुल द्रव्यमान का लगभग एक तिहाई हिस्सा है!", temperature: "-105°C", realDistance: "41.4 करोड़ किमी", averageDistanceToEarth: "26.4 करोड़ किमी", orbitalPeriod: "4.6 वर्ष" }
    },
    moon: {
        en: {
            name: "Moon",
            description: "Our loyal companion! It controls the tides and lights up our night sky.",
            funFact: "The Moon is Earth's only natural satellite. We have visited it with astronauts!",
            temperature: "-23°C (average)",
            realDistance: "384,400 km from Earth",
            averageDistanceToEarth: "384,400 km",
            orbitalPeriod: "27 days"
        },
        fr: {
            name: "Lune",
            description: "Notre fidèle compagnon ! Elle contrôle les marées et éclaire nos nuits.",
            funFact: "La Lune est le seul satellite naturel de la Terre. Des astronautes l'ont visitée !",
            temperature: "-23°C (moyenne)",
            realDistance: "384 400 km de la Terre",
            averageDistanceToEarth: "384 400 km",
            orbitalPeriod: "27 jours"
        },
        es: {
            name: "Luna",
            description: "¡Nuestro fiel compañero! Controla las mareas e ilumina nuestro cielo nocturno.",
            funFact: "La Luna es el único satélite natural de la Tierra. ¡Hemos enviado astronautas allí!",
            temperature: "-23°C (promedio)",
            realDistance: "384,400 km de la Tierra",
            averageDistanceToEarth: "384,400 km",
            orbitalPeriod: "27 días"
        },
        zh: {
            name: "月球",
            description: "我们忠实的伙伴！它控制着潮汐并照亮我们的夜空。",
            funFact: "月球是地球唯一的天然卫星。人类宇航员曾经造访过它！",
            temperature: "-23°C (平均)",
            realDistance: "距地球 384,400 公里",
            averageDistanceToEarth: "384,400 公里",
            orbitalPeriod: "27 天"
        },
        hi: {
            name: "चंद्रमा",
            description: "हमारा वफादार साथी! यह ज्वार को नियंत्रित करता है और हमारे रात के आकाश को रोशन करता है।",
            funFact: "चंद्रमा पृथ्वी का एकमात्र प्राकृतिक उपग्रह है। अंतरिक्ष यात्रियों ने इसकी यात्रा की है!",
            temperature: "-23°C (औसत)",
            realDistance: "पृथ्वी से 3,84,400 किमी",
            averageDistanceToEarth: "3,84,400 किमी",
            orbitalPeriod: "27 दिन"
        }
    },
    mars: {
        en: {
            name: "Mars",
            description: "The Red Planet! It looks red because of rusty iron in its soil. Scientists are looking for signs of ancient life here!",
            funFact: "Mars has the biggest volcano in the solar system - Olympus Mons is 3 times taller than Mount Everest!",
            temperature: "-63°C (average)",
            realDistance: "227.9 million km from the Sun",
            averageDistanceToEarth: "140 million km",
            orbitalPeriod: "687 days"
        },
        fr: {
            name: "Mars",
            description: "La Planète Rouge ! Sa couleur vient de la rouille dans son sol. Les scientifiques y cherchent des traces de vie ancienne !",
            funFact: "Mars possède le plus grand volcan du système solaire : Olympus Mons est 3 fois plus haut que l'Everest !",
            temperature: "-63°C (moyenne)",
            realDistance: "227,9 millions de km du Soleil",
            averageDistanceToEarth: "140 millions de km",
            orbitalPeriod: "687 jours"
        },
        es: {
            name: "Marte",
            description: "¡El Planeta Rojo! Se ve rojo por el hierro oxidado en su suelo. ¡Los científicos buscan vida allí!",
            funFact: "Marte tiene el volcán más grande del sistema solar: ¡el Monte Olimpo es 3 veces más alto que el Everest!",
            temperature: "-63°C (promedio)",
            realDistance: "227.9 millones de km del Sol",
            averageDistanceToEarth: "140 millones de km",
            orbitalPeriod: "687 días"
        },
        zh: {
            name: "火星",
            description: "红色星球！它的红色来自土壤中的氧化铁。科学家们正在这里寻找古代生命的迹象！",
            funFact: "火星拥有太阳系中最大的火山——奥林帕斯山，比珠穆朗玛峰高3倍！",
            temperature: "-63°C (平均)",
            realDistance: "距太阳 2.279 亿公里",
            averageDistanceToEarth: "1.4 亿公里",
            orbitalPeriod: "687 天"
        },
        hi: {
            name: "मंगल",
            description: "लाल ग्रह! इसकी मिट्टी में जंग लगे लोहे के कारण यह लाल दिखता है। वैज्ञानिक यहाँ प्राचीन जीवन के संकेतों की तलाश कर रहे हैं!",
            funFact: "मंगल पर सौरमंडल का सबसे बड़ा ज्वालामुखी है - ओलंपस मॉन्स माउंट एवरेस्ट से 3 गुना ऊंचा है!",
            temperature: "-63°C (औसत)",
            realDistance: "सूर्य से 22.79 करोड़ किमी",
            averageDistanceToEarth: "14 करोड़ किमी",
            orbitalPeriod: "687 दिन"
        }
    },
    phobos: {
        en: { name: "Phobos", description: "The larger and closer of Mars' two moons.", funFact: "Phobos orbits Mars so fast that it rises in the west and sets in the east twice a day!", temperature: "-40°C", realDistance: "6,000 km from Mars", averageDistanceToEarth: "140 million km", orbitalPeriod: "8 hours" },
        fr: { name: "Phobos", description: "La plus grande et la plus proche des deux lunes de Mars.", funFact: "Phobos orbite si vite qu'elle se lève à l'ouest et se couche à l'est deux fois par jour !", temperature: "-40°C", realDistance: "6 000 km de Mars", averageDistanceToEarth: "140 millions de km", orbitalPeriod: "8 heures" },
        es: { name: "Fobos", description: "La luna más grande de Marte.", funFact: "¡Orbita Marte dos veces al día!", temperature: "-40°C", realDistance: "6.000 km", averageDistanceToEarth: "140 millones km", orbitalPeriod: "8 horas" },
        zh: { name: "火卫一", description: "火星两颗卫星中较大较近的一颗。", funFact: "它绕火星运行非常快，每天西升东落两次！", temperature: "-40°C", realDistance: "6,000 公里", averageDistanceToEarth: "1.4 亿公里", orbitalPeriod: "8 小时" },
        hi: { name: "फोबोस", description: "मंगल के दो चंद्रमाओं में से बड़ा।", funFact: "यह दिन में दो बार पश्चिम में उगता है!", temperature: "-40°C", realDistance: "6,000 किमी", averageDistanceToEarth: "14 करोड़ किमी", orbitalPeriod: "8 घंटे" }
    },
    deimos: {
        en: { name: "Deimos", description: "The smaller and outer moon of Mars.", funFact: "It is so small and has such weak gravity that you could escape it by jumping a bike ramp!", temperature: "-40°C", realDistance: "23,460 km from Mars", averageDistanceToEarth: "140 million km", orbitalPeriod: "30 hours" },
        fr: { name: "Déimos", description: "La plus petite lune de Mars.", funFact: "Sa gravité est si faible qu'on pourrait s'en échapper avec une rampe de vélo !", temperature: "-40°C", realDistance: "23 460 km de Mars", averageDistanceToEarth: "140 millions de km", orbitalPeriod: "30 heures" },
        es: { name: "Deimos", description: "La luna más pequeña de Marte.", funFact: "¡Su gravedad es pequeñísima!", temperature: "-40°C", realDistance: "23.460 km", averageDistanceToEarth: "140 millones km", orbitalPeriod: "30 horas" },
        zh: { name: "火卫二", description: "火星较小的外层卫星。", funFact: "重力非常小，骑自行车就能逃逸！", temperature: "-40°C", realDistance: "23,460 公里", averageDistanceToEarth: "1.4 亿公里", orbitalPeriod: "30 小时" },
        hi: { name: "डीमोस", description: "मंगल का छोटा चंद्रमा।", funFact: "इसका गुरुत्वाकर्षण बहुत कम है!", temperature: "-40°C", realDistance: "23,460 किमी", averageDistanceToEarth: "14 करोड़ किमी", orbitalPeriod: "30 घंटे" }
    },
    jupiter: {
        en: {
            name: "Jupiter",
            description: "The biggest planet in our solar system! It's a gas giant with beautiful swirling clouds and stripes.",
            funFact: "Jupiter is SO BIG that all the other planets could fit inside it! It also has a giant storm called the Great Red Spot.",
            temperature: "-108°C (average)",
            realDistance: "778.5 million km from the Sun",
            averageDistanceToEarth: "628 million km",
            orbitalPeriod: "11.9 years"
        },
        fr: {
            name: "Jupiter",
            description: "La plus grande planète du système solaire ! Une géante gazeuse avec de magnifiques nuages tourbillonnants.",
            funFact: "Jupiter est SI GRANDE que toutes les autres planètes pourraient tenir dedans ! Elle a aussi une tempête géante : la Grande Tache Rouge.",
            temperature: "-108°C (moyenne)",
            realDistance: "778,5 millions de km du Soleil",
            averageDistanceToEarth: "628 millions de km",
            orbitalPeriod: "11,9 ans"
        },
        es: {
            name: "Júpiter",
            description: "¡El planeta más grande del sistema solar! Es un gigante gaseoso con hermosas nubes arremolinadas.",
            funFact: "¡Júpiter es TAN GRANDE que cabrían todos los demás planetas! Tiene una tormenta gigante llamada la Gran Mancha Roja.",
            temperature: "-108°C (promedio)",
            realDistance: "778.5 millones de km del Sol",
            averageDistanceToEarth: "628 millones de km",
            orbitalPeriod: "11.9 años"
        },
        zh: {
            name: "木星",
            description: "太阳系中最大的行星！它是一颗有着美丽旋涡云层的气态巨行星。",
            funFact: "木星太大了，所有其他行星都可以装进它里面！它还有一个巨大的风暴，叫做大红斑。",
            temperature: "-108°C (平均)",
            realDistance: "距太阳 7.785 亿公里",
            averageDistanceToEarth: "6.28 亿公里",
            orbitalPeriod: "11.9 年"
        },
        hi: {
            name: "बृहस्पति",
            description: "हमारे सौरमंडल का सबसे बड़ा ग्रह! यह सुंदर घुमावदार बादलों और धारियों वाला गैस दानव है।",
            funFact: "बृहस्पति इतना बड़ा है कि अन्य सभी ग्रह इसमें समा सकते हैं! इसमें ग्रेट रेड स्पॉट नामक एक विशाल तूफान भी है।",
            temperature: "-108°C (औसत)",
            realDistance: "सूर्य से 77.85 करोड़ किमी",
            averageDistanceToEarth: "62.8 करोड़ किमी",
            orbitalPeriod: "11.9 वर्ष"
        }
    },
    io: {
        en: { name: "Io", description: "The most volcanically active body in the solar system.", funFact: "Io has hundreds of volcanoes that erupt lava fountains miles high!", temperature: "-143°C", realDistance: "421,700 km from Jupiter", averageDistanceToEarth: "628 million km", orbitalPeriod: "42 hours" },
        fr: { name: "Io", description: "Le corps le plus volcaniquement actif du système solaire.", funFact: "Io a des centaines de volcans qui crachent de la lave à des kilomètres de hauteur !", temperature: "-143°C", realDistance: "421 700 km de Jupiter", averageDistanceToEarth: "628 millions de km", orbitalPeriod: "42 heures" },
        es: { name: "Ío", description: "El cuerpo más volcánico del sistema solar.", funFact: "¡Tiene cientos de volcanes!", temperature: "-143°C", realDistance: "421.700 km", averageDistanceToEarth: "628 millones km", orbitalPeriod: "42 horas" },
        zh: { name: "木卫一", description: "太阳系中火山活动最活跃的天体。", funFact: "它有数百座火山喷发！", temperature: "-143°C", realDistance: "421,700 公里", averageDistanceToEarth: "6.28 亿公里", orbitalPeriod: "42 小时" },
        hi: { name: "आयो", description: "सौरमंडल में सबसे अधिक ज्वालामुखी सक्रिय पिंड।", funFact: "इसमें सैकड़ों ज्वालामुखी हैं!", temperature: "-143°C", realDistance: "421,700 किमी", averageDistanceToEarth: "62.8 करोड़ किमी", orbitalPeriod: "42 घंटे" }
    },
    europa: {
        en: { name: "Europa", description: "An icy moon with a vast ocean beneath its crust.", funFact: "Scientists think Europa is one of the best places to look for alien life!", temperature: "-160°C", realDistance: "670,900 km from Jupiter", averageDistanceToEarth: "628 million km", orbitalPeriod: "3.5 days" },
        fr: { name: "Europe", description: "Une lune glacée avec un vaste océan sous sa croûte.", funFact: "Les scientifiques pensent qu'Europe est l'un des meilleurs endroits pour chercher de la vie extraterrestre !", temperature: "-160°C", realDistance: "670 900 km de Jupiter", averageDistanceToEarth: "628 millions de km", orbitalPeriod: "3,5 jours" },
        es: { name: "Europa", description: "Una luna helada con un océano subterráneo.", funFact: "¡Podría albergar vida!", temperature: "-160°C", realDistance: "670.900 km", averageDistanceToEarth: "628 millones km", orbitalPeriod: "3.5 días" },
        zh: { name: "木卫二", description: "冰冻的卫星，冰层下有巨大的海洋。", funFact: "可能是寻找外星生命的最佳地点！", temperature: "-160°C", realDistance: "670,900 公里", averageDistanceToEarth: "6.28 亿公里", orbitalPeriod: "3.5 天" },
        hi: { name: "यूरोपा", description: "बर्फ़ीला चंद्रमा जिसके नीचे एक विशाल महासागर है।", funFact: "यहाँ जीवन हो सकता है!", temperature: "-160°C", realDistance: "670,900 किमी", averageDistanceToEarth: "62.8 करोड़ किमी", orbitalPeriod: "3.5 दिन" }
    },
    ganymede: {
        en: { name: "Ganymede", description: "The largest moon in the entire solar system.", funFact: "Ganymede is bigger than the planet Mercury and has its own magnetic field!", temperature: "-163°C", realDistance: "1 million km from Jupiter", averageDistanceToEarth: "628 million km", orbitalPeriod: "7 days" },
        fr: { name: "Ganymède", description: "La plus grande lune de tout le système solaire.", funFact: "Ganymède est plus grande que Mercure et possède son propre champ magnétique !", temperature: "-163°C", realDistance: "1 million de km de Jupiter", averageDistanceToEarth: "628 millions de km", orbitalPeriod: "7 jours" },
        es: { name: "Ganímedes", description: "La luna más grande del sistema solar.", funFact: "¡Es más grande que Mercurio!", temperature: "-163°C", realDistance: "1 millón km", averageDistanceToEarth: "628 millones km", orbitalPeriod: "7 días" },
        zh: { name: "木卫三", description: "太阳系中最大的卫星。", funFact: "它比水星还大！", temperature: "-163°C", realDistance: "107 万公里", averageDistanceToEarth: "6.28 亿公里", orbitalPeriod: "7 天" },
        hi: { name: "गेनीमेड", description: "सौरमंडल का सबसे बड़ा चंद्रमा।", funFact: "यह बुध ग्रह से भी बड़ा है!", temperature: "-163°C", realDistance: "10 लाख किमी", averageDistanceToEarth: "62.8 करोड़ किमी", orbitalPeriod: "7 दिन" }
    },
    callisto: {
        en: { name: "Callisto", description: "The most heavily cratered object in the solar system.", funFact: "Callisto has been hit by so many asteroids that its surface is completely covered in ancient craters.", temperature: "-139°C", realDistance: "1.8 million km from Jupiter", averageDistanceToEarth: "628 million km", orbitalPeriod: "17 days" },
        fr: { name: "Callisto", description: "L'objet le plus cratérisé du système solaire.", funFact: "Sa surface est une archive géologique de milliards d'années d'impacts !", temperature: "-139°C", realDistance: "1,8 million de km de Jupiter", averageDistanceToEarth: "628 millions de km", orbitalPeriod: "17 jours" },
        es: { name: "Calisto", description: "El objeto con más cráteres del sistema solar.", funFact: "¡Su superficie está llena de impactos antiguos!", temperature: "-139°C", realDistance: "1.8 millones km", averageDistanceToEarth: "628 millones km", orbitalPeriod: "17 días" },
        zh: { name: "木卫四", description: "太阳系中陨石坑最多的天体。", funFact: "表面完全被古老的陨石坑覆盖。", temperature: "-139°C", realDistance: "188 万公里", averageDistanceToEarth: "6.28 亿公里", orbitalPeriod: "17 天" },
        hi: { name: "कैलिस्टो", description: "सौरमंडल में सबसे अधिक गड्ढों वाला पिंड।", funFact: "इसकी सतह पूरी तरह से प्राचीन गड्ढों से ढकी है।", temperature: "-139°C", realDistance: "18 लाख किमी", averageDistanceToEarth: "62.8 करोड़ किमी", orbitalPeriod: "17 दिन" }
    },
    saturn: {
        en: {
            name: "Saturn",
            description: "The Lord of the Rings! Saturn has the most spectacular ring system in our solar system.",
            funFact: "Saturn's rings are made of billions of pieces of ice and rock! Some pieces are as small as a grain of sand, others as big as a house!",
            temperature: "-138°C (average)",
            realDistance: "1.4 billion km from the Sun",
            averageDistanceToEarth: "1.2 billion km",
            orbitalPeriod: "29.5 years"
        },
        fr: {
            name: "Saturne",
            description: "Le Seigneur des Anneaux ! Saturne possède le système d'anneaux le plus spectaculaire du système solaire.",
            funFact: "Les anneaux de Saturne sont faits de milliards de morceaux de glace et de roche, de la taille d'un grain de sable à celle d'une maison !",
            temperature: "-138°C (moyenne)",
            realDistance: "1,4 milliard de km du Soleil",
            averageDistanceToEarth: "1,2 milliard de km",
            orbitalPeriod: "29,5 ans"
        },
        es: {
            name: "Saturno",
            description: "¡El Señor de los Anillos! Saturno tiene el sistema de anillos más espectacular del sistema solar.",
            funFact: "¡Los anillos de Saturno están hechos de hielo y roca! ¡Algunos trozos son como arena, otros como casas!",
            temperature: "-138°C (promedio)",
            realDistance: "1.4 mil millones de km del Sol",
            averageDistanceToEarth: "1.2 mil millones de km",
            orbitalPeriod: "29.5 años"
        },
        zh: {
            name: "土星",
            description: "指环王！土星拥有太阳系中最壮观的环系统。",
            funFact: "土星环由数十亿块冰和岩石组成！有些像沙粒一样小，有些像房子一样大！",
            temperature: "-138°C (平均)",
            realDistance: "距太阳 14 亿公里",
            averageDistanceToEarth: "12 亿公里",
            orbitalPeriod: "29.5 年"
        },
        hi: {
            name: "शनि",
            description: "छल्लों का राजा! शनि के पास हमारे सौरमंडल का सबसे शानदार वलय (Ring) तंत्र है।",
            funFact: "शनि के छल्ले अरबों बर्फ और चट्टान के टुकड़ों से बने हैं! कुछ रेत के दाने जैसे छोटे हैं, तो कुछ घर जैसे बड़े!",
            temperature: "-138°C (औसत)",
            realDistance: "सूर्य से 1.4 अरब किमी",
            averageDistanceToEarth: "1.2 अरब किमी",
            orbitalPeriod: "29.5 वर्ष"
        }
    },
    titan: {
        en: { name: "Titan", description: "Saturn's largest moon and the only moon with a thick atmosphere.", funFact: "Titan has lakes and rivers, but they are made of liquid methane instead of water!", temperature: "-179°C", realDistance: "1.2 million km from Saturn", averageDistanceToEarth: "1.2 billion km", orbitalPeriod: "16 days" },
        fr: { name: "Titan", description: "La plus grande lune de Saturne, la seule avec une atmosphère épaisse.", funFact: "Titan a des lacs et des rivières, mais ils sont faits de méthane liquide, pas d'eau !", temperature: "-179°C", realDistance: "1,2 million de km de Saturne", averageDistanceToEarth: "1,2 milliard de km", orbitalPeriod: "16 jours" },
        es: { name: "Titán", description: "La luna más grande de Saturno.", funFact: "¡Tiene ríos de metano líquido!", temperature: "-179°C", realDistance: "1.2 millones km", averageDistanceToEarth: "1.2 mil millones km", orbitalPeriod: "16 días" },
        zh: { name: "土卫六", description: "土星最大的卫星，唯一拥有浓厚大气层的卫星。", funFact: "它有液态甲烷组成的湖泊和河流！", temperature: "-179°C", realDistance: "122 万公里", averageDistanceToEarth: "12 亿公里", orbitalPeriod: "16 天" },
        hi: { name: "टाइटन", description: "शनि का सबसे बड़ा चंद्रमा।", funFact: "इसमें मीथेन की नदियाँ हैं!", temperature: "-179°C", realDistance: "12 लाख किमी", averageDistanceToEarth: "1.2 अरब किमी", orbitalPeriod: "16 दिन" }
    },
    enceladus: {
        en: { name: "Enceladus", description: "An icy moon that shoots geysers of water into space.", funFact: "Some of the ice sprayed by Enceladus actually creates one of Saturn's rings (the E ring)!", temperature: "-198°C", realDistance: "238,000 km from Saturn", averageDistanceToEarth: "1.2 billion km", orbitalPeriod: "33 hours" },
        fr: { name: "Encelade", description: "Une lune glacée qui projette des geysers d'eau dans l'espace.", funFact: "La glace crachée par Encelade crée en fait l'un des anneaux de Saturne (l'anneau E) !", temperature: "-198°C", realDistance: "238 000 km de Saturne", averageDistanceToEarth: "1,2 milliard de km", orbitalPeriod: "33 heures" },
        es: { name: "Encélado", description: "Una luna helada con géiseres.", funFact: "¡Sus géiseres crean el anillo E de Saturno!", temperature: "-198°C", realDistance: "238.000 km", averageDistanceToEarth: "1.2 mil millones km", orbitalPeriod: "33 horas" },
        zh: { name: "土卫二", description: "一颗向太空喷射水柱的冰冷卫星。", funFact: "它喷出的冰构成了土星的E环！", temperature: "-198°C", realDistance: "23.8 万公里", averageDistanceToEarth: "12 亿公里", orbitalPeriod: "33 小时" },
        hi: { name: "एन्सेलैडस", description: "एक बर्फीला चंद्रमा जो गीजर छोड़ता है।", funFact: "इसके गीजर शनि का ई रिंग बनाते हैं!", temperature: "-198°C", realDistance: "238,000 किमी", averageDistanceToEarth: "1.2 अरब किमी", orbitalPeriod: "33 घंटे" }
    },
    uranus: {
        en: {
            name: "Uranus",
            description: "The sideways planet! It's an ice giant with a beautiful blue-green color from methane gas.",
            funFact: "Uranus is tilted on its side! It rolls around the Sun like a ball instead of spinning like a top.",
            temperature: "-197°C (average)",
            realDistance: "2.9 billion km from the Sun",
            averageDistanceToEarth: "2.5 billion km",
            orbitalPeriod: "84 years"
        },
        fr: {
            name: "Uranus",
            description: "La planète couchée ! C'est une géante de glace avec une belle couleur bleu-vert due au méthane.",
            funFact: "Uranus est penchée sur le côté ! Elle roule autour du Soleil comme une balle au lieu de tourner comme une toupie.",
            temperature: "-197°C (moyenne)",
            realDistance: "2,9 milliards de km du Soleil",
            averageDistanceToEarth: "2,5 milliards de km",
            orbitalPeriod: "84 ans"
        },
        es: {
            name: "Urano",
            description: "¡El planeta inclinado! Es un gigante de hielo con un hermoso color azul verdoso por el gas metano.",
            funFact: "¡Urano está inclinado de lado! Rueda alrededor del Sol como una pelota en lugar de girar como un trompo.",
            temperature: "-197°C (promedio)",
            realDistance: "2.9 mil millones de km del Sol",
            averageDistanceToEarth: "2.5 mil millones de km",
            orbitalPeriod: "84 años"
        },
        zh: {
            name: "天王星",
            description: "躺着的行星！这是一颗冰巨星，因甲烷气体呈现美丽的蓝绿色。",
            funFact: "天王星侧向倾斜！它像球一样滚动绕太阳公转，而不是像陀螺一样旋转。",
            temperature: "-197°C (平均)",
            realDistance: "距太阳 29 亿公里",
            averageDistanceToEarth: "25 亿公里",
            orbitalPeriod: "84 年"
        },
        hi: {
            name: "अरुण",
            description: "लेटा हुआ ग्रह! यह एक बर्फ विशाल है जिसका सुंदर नीला-हरा रंग मीथेन गैस के कारण है।",
            funFact: "अरुण अपनी धुरी पर झुका हुआ है! यह लट्टू की तरह घूमने के बजाय गेंद की तरह लुढ़कते हुए सूर्य का चक्कर लगाता है।",
            temperature: "-197°C (औसत)",
            realDistance: "सूर्य से 2.9 अरब किमी",
            averageDistanceToEarth: "2.5 अरब किमी",
            orbitalPeriod: "84 वर्ष"
        }
    },
    titania: {
        en: { name: "Titania", description: "The largest moon of Uranus.", funFact: "It is named after the Queen of the Fairies from 'A Midsummer Night's Dream'.", temperature: "-203°C", realDistance: "436,000 km from Uranus", averageDistanceToEarth: "2.5 billion km", orbitalPeriod: "8.7 days" },
        fr: { name: "Titania", description: "La plus grande lune d'Uranus.", funFact: "Elle est nommée d'après la Reine des Fées du 'Songe d'une nuit d'été'.", temperature: "-203°C", realDistance: "436 000 km d'Uranus", averageDistanceToEarth: "2,5 milliards de km", orbitalPeriod: "8,7 jours" },
        es: { name: "Titania", description: "La luna más grande de Urano.", funFact: "Nombrada por la Reina de las Hadas.", temperature: "-203°C", realDistance: "436.000 km", averageDistanceToEarth: "2.5 mil millones km", orbitalPeriod: "8.7 días" },
        zh: { name: "天卫三", description: "天王星最大的卫星。", funFact: "以《仲夏夜之梦》中的仙后命名。", temperature: "-203°C", realDistance: "43.6 万公里", averageDistanceToEarth: "25 亿公里", orbitalPeriod: "8.7 天" },
        hi: { name: "टाइटेनिया", description: "अरुण का सबसे बड़ा चंद्रमा।", funFact: "परियों की रानी के नाम पर रखा गया नाम।", temperature: "-203°C", realDistance: "436,000 किमी", averageDistanceToEarth: "2.5 अरब किमी", orbitalPeriod: "8.7 दिन" }
    },
    neptune: {
        en: {
            name: "Neptune",
            description: "The windiest planet! This deep blue ice giant is the farthest planet from the Sun.",
            funFact: "Neptune has the strongest winds in the solar system - up to 2,000 km/h! That's faster than a jet plane!",
            temperature: "-201°C (average)",
            realDistance: "4.5 billion km from the Sun",
            averageDistanceToEarth: "4.3 billion km",
            orbitalPeriod: "165 years"
        },
        fr: {
            name: "Neptune",
            description: "La planète la plus venteuse ! Cette géante glace bleu profond est la plus éloignée du Soleil.",
            funFact: "Neptune a les vents les plus forts du système solaire - jusqu'à 2 000 km/h ! C'est plus rapide qu'un avion à réaction !",
            temperature: "-201°C (moyenne)",
            realDistance: "4,5 milliards de km du Soleil",
            averageDistanceToEarth: "4,3 milliards de km",
            orbitalPeriod: "165 ans"
        },
        es: {
            name: "Neptuno",
            description: "¡El planeta más ventoso! Este gigante de hielo azul profundo es el más lejano del Sol.",
            funFact: "Neptuno tiene los vientos más fuertes: ¡hasta 2,000 km/h! ¡Más rápido que un avión jet!",
            temperature: "-201°C (promedio)",
            realDistance: "4.5 mil millones de km del Sol",
            averageDistanceToEarth: "4.3 mil millones de km",
            orbitalPeriod: "165 años"
        },
        zh: {
            name: "海王星",
            description: "风力最大的行星！这颗深蓝色的冰巨星是距离太阳最远的行星。",
            funFact: "海王星拥有太阳系中最强的风——高达2000公里/小时！比喷气式飞机还快！",
            temperature: "-201°C (平均)",
            realDistance: "距太阳 45 亿公里",
            averageDistanceToEarth: "43 亿公里",
            orbitalPeriod: "165 年"
        },
        hi: {
            name: "वरुण",
            description: "सबसे तूफानी ग्रह! यह गहरा नीला बर्फ विशाल सूर्य से सबसे दूर का ग्रह है।",
            funFact: "वरुण पर सौरमंडल की सबसे तेज हवाएं चलती हैं - 2,000 किमी/घंटा तक! यह जेट विमान से भी तेज है!",
            temperature: "-201°C (औसत)",
            realDistance: "सूर्य से 4.5 अरब किमी",
            averageDistanceToEarth: "4.3 अरब किमी",
            orbitalPeriod: "165 वर्ष"
        }
    },
    triton: {
        en: { name: "Triton", description: "Neptune's largest moon.", funFact: "Triton orbits backwards (retrograde)! It was likely a dwarf planet captured by Neptune's gravity.", temperature: "-235°C", realDistance: "354,800 km from Neptune", averageDistanceToEarth: "4.3 billion km", orbitalPeriod: "5.8 days" },
        fr: { name: "Triton", description: "La plus grande lune de Neptune.", funFact: "Triton orbite à l'envers ! C'était probablement une planète naine capturée par la gravité de Neptune.", temperature: "-235°C", realDistance: "354 800 km de Neptune", averageDistanceToEarth: "4,3 milliards de km", orbitalPeriod: "5,8 jours" },
        es: { name: "Tritón", description: "La luna más grande de Neptuno.", funFact: "¡Tritón orbita hacia atrás!", temperature: "-235°C", realDistance: "354.800 km", averageDistanceToEarth: "4.3 mil millones km", orbitalPeriod: "5.8 días" },
        zh: { name: "海卫一", description: "海王星最大的卫星。", funFact: "它是逆行轨道的！很可能是被海王星捕获的矮行星。", temperature: "-235°C", realDistance: "35.48 万公里", averageDistanceToEarth: "43 亿公里", orbitalPeriod: "5.8 天" },
        hi: { name: "ट्राइटन", description: "वरुण का सबसे बड़ा चंद्रमा।", funFact: "यह उल्टी दिशा में परिक्रमा करता है!", temperature: "-235°C", realDistance: "354,800 किमी", averageDistanceToEarth: "4.3 अरब किमी", orbitalPeriod: "5.8 दिन" }
    },
    pluto: {
        en: {
            name: "Pluto",
            description: "Once considered the 9th planet! Pluto is now classified as a dwarf planet but it's still super cool!",
            funFact: "Pluto has a heart-shaped region on its surface! It's called Tombaugh Regio and it's made of frozen nitrogen.",
            temperature: "-223°C (average)",
            realDistance: "5.9 billion km from the Sun",
            averageDistanceToEarth: "5 billion km",
            orbitalPeriod: "248 years"
        },
        fr: {
            name: "Pluton",
            description: "Autrefois la 9ème planète ! Pluton est maintenant une planète naine mais reste super cool !",
            funFact: "Pluton a une région en forme de cœur sur sa surface ! Elle s'appelle Tombaugh Regio et est faite d'azote gelé.",
            temperature: "-223°C (moyenne)",
            realDistance: "5,9 milliards de km du Soleil",
            averageDistanceToEarth: "5 milliards de km",
            orbitalPeriod: "248 ans"
        },
        es: {
            name: "Plutón",
            description: "¡Antes la novena planeta! Ahora es un planeta enano, ¡pero sigue siendo genial!",
            funFact: "¡Plutón tiene una región en forma de corazón hecha de nitrógeno congelado llamada Tombaugh Regio!",
            temperature: "-223°C (promedio)",
            realDistance: "5.9 mil millones de km del Sol",
            averageDistanceToEarth: "5 mil millones de km",
            orbitalPeriod: "248 años"
        },
        zh: {
            name: "冥王星",
            description: "曾经的第九大行星！现在被归类为矮行星，但依然非常酷！",
            funFact: "冥王星表面有一个心形区域！被称为汤博区，由冷冻氮组成。",
            temperature: "-223°C (平均)",
            realDistance: "距太阳 59 亿公里",
            averageDistanceToEarth: "50 亿公里",
            orbitalPeriod: "248 年"
        },
        hi: {
            name: "प्लूटो",
            description: "कभी 9वां ग्रह माना जाता था! प्लूटो अब एक बौना ग्रह है लेकिन यह अभी भी बहुत अच्छा है!",
            funFact: "प्लूटो की सतह पर दिल के आकार का क्षेत्र है! इसे टॉम्बो रेजियो कहा जाता है और यह जमी हुई नाइट्रोजन से बना है।",
            temperature: "-223°C (औसत)",
            realDistance: "सूर्य से 5.9 अरब किमी",
            averageDistanceToEarth: "5 अरब किमी",
            orbitalPeriod: "248 वर्ष"
        }
    },
    charon: {
        en: { name: "Charon", description: "Pluto's largest moon.", funFact: "Charon is so big compared to Pluto that they orbit a point in empty space between them!", temperature: "-220°C", realDistance: "19,600 km from Pluto", averageDistanceToEarth: "5 billion km", orbitalPeriod: "6.4 days" },
        fr: { name: "Charon", description: "La plus grande lune de Pluton.", funFact: "Charon est si grande par rapport à Pluton qu'elles orbitent autour d'un point vide entre elles !", temperature: "-220°C", realDistance: "19 600 km de Pluton", averageDistanceToEarth: "5 milliards de km", orbitalPeriod: "6,4 jours" },
        es: { name: "Caronte", description: "La luna más grande de Plutón.", funFact: "¡Es enorme comparada con Plutón!", temperature: "-220°C", realDistance: "19.600 km", averageDistanceToEarth: "5 mil millones km", orbitalPeriod: "6.4 días" },
        zh: { name: "冥卫一", description: "冥王星最大的卫星。", funFact: "它相对于冥王星来说非常大，它们围绕着彼此之间的空间点运行！", temperature: "-220°C", realDistance: "19,600 公里", averageDistanceToEarth: "50 亿公里", orbitalPeriod: "6.4 天" },
        hi: { name: "चारोन", description: "प्लूटो का सबसे बड़ा चंद्रमा।", funFact: "यह प्लूटो की तुलना में बहुत बड़ा है!", temperature: "-220°C", realDistance: "19,600 किमी", averageDistanceToEarth: "5 अरब किमी", orbitalPeriod: "6.4 दिन" }
    },
    // Dwarf planets beyond Pluto
    eris: {
        en: {
            name: "Eris",
            description: "One of the most distant dwarf planets! It's named after the Greek goddess of discord.",
            funFact: "Eris is almost the same size as Pluto! Finding Eris helped scientists decide to create the 'dwarf planet' category.",
            temperature: "-231°C (average)", realDistance: "10.1 billion km", averageDistanceToEarth: "10 billion km", orbitalPeriod: "557 years"
        },
        fr: { name: "Éris", description: "Une des planètes naines les plus lointaines ! Nommée après la déesse grecque de la discorde.", funFact: "Éris a presque la même taille que Pluton ! Sa découverte a mené à la création de la catégorie 'planète naine'.", temperature: "-231°C", realDistance: "10,1 milliards de km", averageDistanceToEarth: "10 milliards de km", orbitalPeriod: "557 ans" },
        es: { name: "Eris", description: "¡Uno de los planetas enanos más lejanos!", funFact: "¡Casi del mismo tamaño que Plutón!", temperature: "-231°C", realDistance: "10.1 mil millones km", averageDistanceToEarth: "10 mil millones km", orbitalPeriod: "557 años" },
        zh: { name: "阋神星", description: "最遥远的矮行星之一！", funFact: "大小几乎和冥王星一样！", temperature: "-231°C", realDistance: "101 亿公里", averageDistanceToEarth: "100 亿公里", orbitalPeriod: "557 年" },
        hi: { name: "एरिस", description: "सबसे दूर के बौने ग्रहों में से एक!", funFact: "लगभग प्लूटो के समान आकार!", temperature: "-231°C", realDistance: "10.1 अरब किमी", averageDistanceToEarth: "10 अरब किमी", orbitalPeriod: "557 वर्ष" }
    },
    // Adding minimal translations for others to prevent errors, defaulting to simplified
    makemake: {
        en: { name: "Makemake", description: "A mysterious dwarf planet in the outer solar system.", funFact: "Named after the creator god of the Rapa Nui people.", temperature: "-239°C", realDistance: "6.8 billion km", averageDistanceToEarth: "7 billion km", orbitalPeriod: "309 years" },
        fr: { name: "Makemake", description: "Une mystérieuse planète naine du système solaire externe.", funFact: "Nommée d'après le dieu créateur du peuple Rapa Nui.", temperature: "-239°C", realDistance: "6,8 milliards de km", averageDistanceToEarth: "7 milliards de km", orbitalPeriod: "309 ans" },
        es: { name: "Makemake", description: "Un planeta enano misterioso.", funFact: "Nombrado por el dios creador Rapa Nui.", temperature: "-239°C", realDistance: "6.8 mil millones km", averageDistanceToEarth: "7 mil millones km", orbitalPeriod: "309 años" },
        zh: { name: "鸟神星", description: "外太阳系神秘的矮行星。", funFact: "以复活节岛拉帕努伊人的创造神命名。", temperature: "-239°C", realDistance: "68 亿公里", averageDistanceToEarth: "70 亿公里", orbitalPeriod: "309 年" },
        hi: { name: "मेकमेक", description: "बाहरी सौरमंडल में एक रहस्यमय बौना ग्रह।", funFact: "रापा नुई लोगों के निर्माता देवता के नाम पर।", temperature: "-239°C", realDistance: "6.8 अरब किमी", averageDistanceToEarth: "7 अरब किमी", orbitalPeriod: "309 वर्ष" }
    },
    haumea: {
        en: { name: "Haumea", description: "The egg-shaped dwarf planet!", funFact: "Haumea spins so fast it's shaped like a football!", temperature: "-223°C", realDistance: "6.5 billion km", averageDistanceToEarth: "6.4 billion km", orbitalPeriod: "284 years" },
        fr: { name: "Haumea", description: "La planète naine en forme d'œuf !", funFact: "Haumea tourne si vite qu'elle a la forme d'un ballon de rugby !", temperature: "-223°C", realDistance: "6,5 milliards de km", averageDistanceToEarth: "6,4 milliards de km", orbitalPeriod: "284 ans" },
        es: { name: "Haumea", description: "¡El planeta enano con forma de huevo!", funFact: "¡Gira tan rápido que parece un balón de fútbol!", temperature: "-223°C", realDistance: "6.5 mil millones km", averageDistanceToEarth: "6.4 mil millones km", orbitalPeriod: "284 años" },
        zh: { name: "妊神星", description: "蛋形的矮行星！", funFact: "自转太快所以形状像橄榄球！", temperature: "-223°C", realDistance: "65 亿公里", averageDistanceToEarth: "64 亿公里", orbitalPeriod: "284 年" },
        hi: { name: "हौमिया", description: "अंडे के आकार का बौना ग्रह!", funFact: "हौमिया इतना तेज घूमता है कि यह फुटबॉल जैसा दिखता है!", temperature: "-223°C", realDistance: "6.5 अरब किमी", averageDistanceToEarth: "6.4 अरब किमी", orbitalPeriod: "284 वर्ष" }
    },
    'james-webb': {
        en: { name: "James Webb Telescope", description: "The most powerful space telescope ever built!", funFact: "Seeing galaxies from 13 billion years ago!", temperature: "-233°C", realDistance: "1.5 million km", averageDistanceToEarth: "1.5 million km", orbitalPeriod: "6 months" },
        fr: { name: "Télescope James Webb", description: "Le télescope spatial le plus puissant jamais construit !", funFact: "Il voit des galaxies d'il y a 13 milliards d'années !", temperature: "-233°C", realDistance: "1,5 million de km", averageDistanceToEarth: "1,5 million de km", orbitalPeriod: "6 mois" },
        es: { name: "Telescopio James Webb", description: "¡El telescopio más potente!", funFact: "¡Ve galaxias de hace 13 mil millones de años!", temperature: "-233°C", realDistance: "1.5 millones km", averageDistanceToEarth: "1.5 millones km", orbitalPeriod: "6 meses" },
        zh: { name: "詹姆斯·韦伯望远镜", description: "有史以来最强大的太空望远镜！", funFact: "观测130亿年前的星系！", temperature: "-233°C", realDistance: "150 万公里", averageDistanceToEarth: "150 万公里", orbitalPeriod: "6 个月" },
        hi: { name: "जेम्स वेब टेलिस्कोप", description: "अब तक का सबसे शक्तिशाली अंतरिक्ष दूरबीन!", funFact: "13 अरब साल पहले की आकाशगंगाओं को देख रहा है!", temperature: "-233°C", realDistance: "15 लाख किमी", averageDistanceToEarth: "15 लाख किमी", orbitalPeriod: "6 महीने" }
    },
    hubble: {
        en: { name: "Hubble Telescope", description: "A legendary space telescope.", funFact: "Orbits Earth every 95 minutes!", temperature: "Varies", realDistance: "547 km", averageDistanceToEarth: "547 km", orbitalPeriod: "95 min" },
        fr: { name: "Télescope Hubble", description: "Un télescope spatial légendaire.", funFact: "Fait le tour de la Terre toutes les 95 minutes !", temperature: "Variable", realDistance: "547 km", averageDistanceToEarth: "547 km", orbitalPeriod: "95 min" },
        es: { name: "Telescopio Hubble", description: "Un telescopio legendario.", funFact: "¡Orbita la Tierra cada 95 minutos!", temperature: "Variable", realDistance: "547 km", averageDistanceToEarth: "547 km", orbitalPeriod: "95 min" },
        zh: { name: "哈勃望远镜", description: "传奇的太空望远镜。", funFact: "每95分钟绕地球一圈！", temperature: "变化", realDistance: "547 公里", averageDistanceToEarth: "547 公里", orbitalPeriod: "95 分钟" },
        hi: { name: "हबल टेलिस्कोप", description: "एक प्रसिद्ध अंतरिक्ष दूरबीन।", funFact: "हर 95 मिनट में पृथ्वी की परिक्रमा करता है!", temperature: "परिवर्तनशील", realDistance: "547 किमी", averageDistanceToEarth: "547 किमी", orbitalPeriod: "95 मिनट" }
    },
    iss: {
        en: { name: "ISS", description: "A giant laboratory in space.", funFact: "Astronauts see 16 sunrises a day!", temperature: "21°C", realDistance: "408 km", averageDistanceToEarth: "408 km", orbitalPeriod: "93 min" },
        fr: { name: "ISS", description: "Un laboratoire géant dans l'espace.", funFact: "Les astronautes voient 16 levers de soleil par jour !", temperature: "21°C", realDistance: "408 km", averageDistanceToEarth: "408 km", orbitalPeriod: "93 min" },
        es: { name: "ISS", description: "Un laboratorio gigante.", funFact: "¡16 amaneceres al día!", temperature: "21°C", realDistance: "408 km", averageDistanceToEarth: "408 km", orbitalPeriod: "93 min" },
        zh: { name: "国际空间站", description: "太空中的巨大实验室。", funFact: "宇航员每天看到16次日出！", temperature: "21°C", realDistance: "408 公里", averageDistanceToEarth: "408 公里", orbitalPeriod: "93 分钟" },
        hi: { name: "आईएसएस", description: "अंतरिक्ष में एक विशाल प्रयोगशाला।", funFact: "अंतरिक्ष यात्री दिन में 16 सूर्योदय देखते हैं!", temperature: "21°C", realDistance: "408 किमी", averageDistanceToEarth: "408 किमी", orbitalPeriod: "93 मिनट" }
    },
    // KSP KERBAL SYSTEM
    'kerbol': {
        en: { name: "Kerbol", description: "The central star of the Kerbal system.", funFact: "It is much smaller than our Sun but just as bright!", temperature: "5,840 K", realDistance: "Center", averageDistanceToEarth: "13.6 million km", orbitalPeriod: "N/A" },
        fr: { name: "Kerbol", description: "L'étoile centrale du système Kerbal.", funFact: "Elle est bien plus petite que notre Soleil mais tout aussi brillante !", temperature: "5 840 K", realDistance: "Centre", averageDistanceToEarth: "13,6 millions de km", orbitalPeriod: "N/A" },
        es: { name: "Kerbol", description: "La estrella central del sistema Kerbal.", funFact: "¡Es mucho más pequeña que nuestro Sol pero igual de brillante!", temperature: "5.840 K", realDistance: "Centro", averageDistanceToEarth: "13,6 millones de km", orbitalPeriod: "N/A" },
        zh: { name: "Kerbol", description: "Kerbal 星系的中心恒星。", funFact: "它比我们的太阳小得多，但同样明亮！", temperature: "5,840 K", realDistance: "中心", averageDistanceToEarth: "1360 万公里", orbitalPeriod: "无" },
        hi: { name: "करबोल", description: "करबल प्रणाली का केंद्रीय तारा।", funFact: "यह हमारे सूर्य से बहुत छोटा है लेकिन उतना ही चमकीला है!", temperature: "5,840 K", realDistance: "केंद्र", averageDistanceToEarth: "13.6 मिलियन किमी", orbitalPeriod: "लागू नहीं" }
    },
    'moho': {
        en: { name: "Moho", description: "The innermost planet of the Kerbol system.", funFact: "It has no atmosphere and is very difficult to reach!", temperature: "400°C", realDistance: "5.2 million km", averageDistanceToEarth: "8.4 million km", orbitalPeriod: "102 days" },
        fr: { name: "Moho", description: "La planète la plus proche de Kerbol.", funFact: "Elle n'a pas d'atmosphère et est très difficile à atteindre !", temperature: "400°C", realDistance: "5,2 millions de km", averageDistanceToEarth: "8,4 millions de km", orbitalPeriod: "102 jours" },
        es: { name: "Moho", description: "El planeta más interno del sistema Kerbal.", funFact: "¡No tiene atmósfera y es muy difícil de alcanzar!", temperature: "400°C", realDistance: "5,2 millones de km", averageDistanceToEarth: "8,4 millones de km", orbitalPeriod: "102 días" },
        zh: { name: "Moho", description: "Kerbol 星系最内层的行星。", funFact: "它没有大气层，非常难以到达！", temperature: "400°C", realDistance: "520 万公里", averageDistanceToEarth: "840 万公里", orbitalPeriod: "102 天" },
        hi: { name: "मोहो", description: "करबोल प्रणाली का सबसे आंतरिक ग्रह।", funFact: "यहाँ कोई वायुमंडल नहीं है और यहाँ पहुँचना बहुत कठिन है!", temperature: "400°C", realDistance: "5.2 मिलियन किमी", averageDistanceToEarth: "8.4 मिलियन किमी", orbitalPeriod: "102 दिन" }
    },
    'eve': {
        en: { name: "Eve", description: "The purple sister planet of Kerbin.", funFact: "Its atmosphere is so thick that landing is easy, but returning is nearly impossible!", temperature: "150°C", realDistance: "9.8 million km", averageDistanceToEarth: "3.7 million km", orbitalPeriod: "261 days" },
        fr: { name: "Eve", description: "La sœur pourpre de Kerbin.", funFact: "Son atmosphère est si dense que l'atterrissage est facile, mais en repartir est presque impossible !", temperature: "150°C", realDistance: "9,8 millions de km", averageDistanceToEarth: "3,7 millions de km", orbitalPeriod: "261 jours" },
        es: { name: "Eve", description: "El planeta hermano púrpura de Kerbin.", funFact: "¡Su atmósfera es tan densa que aterrizar es fácil, pero regresar es casi imposible!", temperature: "150°C", realDistance: "9,8 millones de km", averageDistanceToEarth: "3,7 millones de km", orbitalPeriod: "261 días" },
        zh: { name: "Eve", description: "Kerbin 的紫色姊妹行星。", funFact: "它的大气层非常厚，着陆很容易，但返回几乎是不可能的！", temperature: "150°C", realDistance: "980 万公里", averageDistanceToEarth: "370 万公里", orbitalPeriod: "261 天" },
        hi: { name: "ईव", description: "करबिन का बैंगनी सिस्टर ग्रह।", funFact: "इसका वायुमंडल इतना घना है कि उतरना आसान है, लेकिन वापस आना लगभग असंभव है!", temperature: "150°C", realDistance: "9.8 मिलियन किमी", averageDistanceToEarth: "3.7 मिलियन किमी", orbitalPeriod: "261 दिन" }
    },
    'gilly': {
        en: { name: "Gilly", description: "A tiny captured asteroid orbiting Eve.", funFact: "Its gravity is so low you can jump into orbit!", temperature: "Cold", realDistance: "31,500 km from Eve", averageDistanceToEarth: "3.7 million km", orbitalPeriod: "7 days" },
        fr: { name: "Gilly", description: "Un minuscule astéroïde capturé en orbite d'Eve.", funFact: "Sa gravité est si faible qu'on peut se mettre en orbite juste en sautant !", temperature: "Froid", realDistance: "31 500 km d'Eve", averageDistanceToEarth: "3,7 millions de km", orbitalPeriod: "7 jours" },
        es: { name: "Gilly", description: "Un diminuto asteroide capturado que orbita alrededor de Eve.", funFact: "¡Su gravedad es tan baja que puedes saltar a la órbita!", temperature: "Frío", realDistance: "31.500 km de Eve", averageDistanceToEarth: "3,7 millones de km", orbitalPeriod: "7 días" },
        zh: { name: "Gilly", description: "一颗围绕 Eve 运行的微小捕获小行星。", funFact: "它的重力非常低，你可以跳进轨道！", temperature: "寒冷", realDistance: "距 Eve 31,500 公里", averageDistanceToEarth: "370 万公里", orbitalPeriod: "7 天" },
        hi: { name: "गिली", description: "ईव की परिक्रमा करने वाला एक छोटा पकड़ा गया क्षुद्रग्रह।", funFact: "इसका गुरुत्वाकर्षण इतना कम है कि आप कूदकर कक्षा में पहुँच सकते हैं!", temperature: "ठंडा", realDistance: "ईव से 31,500 किमी", averageDistanceToEarth: "3.7 मिलियन किमी", orbitalPeriod: "7 दिन" }
    },
    'kerbin': {
        en: { name: "Kerbin", description: "The home of the Kerbals.", funFact: "It is the only planet with breathable oxygen and life!", temperature: "15°C", realDistance: "13.6 million km", averageDistanceToEarth: "0 km", orbitalPeriod: "426 days" },
        fr: { name: "Kerbin", description: "La maison des Kerbals.", funFact: "C'est la seule planète avec de l'oxygène respirable et de la vie !", temperature: "15°C", realDistance: "13,6 millions de km", averageDistanceToEarth: "0 km", orbitalPeriod: "426 jours" },
        es: { name: "Kerbin", description: "El hogar de los Kerbals.", funFact: "¡Es el único planeta con oxígeno respirable y vida!", temperature: "15°C", realDistance: "13,6 millones de km", averageDistanceToEarth: "0 km", orbitalPeriod: "426 días" },
        zh: { name: "Kerbin", description: "Kerbal 的家园。", funFact: "它是唯一一颗拥有可呼吸氧气和生命的行星！", temperature: "15°C", realDistance: "1360 万公里", averageDistanceToEarth: "0 公里", orbitalPeriod: "426 天" },
        hi: { name: "करबिन", description: "करबल्स का घर।", funFact: "यह एकमात्र ग्रह है जहाँ सांस लेने योग्य ऑक्सीजन और जीवन है!", temperature: "15°C", realDistance: "13.6 मिलियन किमी", averageDistanceToEarth: "0 किमी", orbitalPeriod: "426 दिन" }
    },
    'the-mun': {
        en: { name: "The Mun", description: "Kerbin's closest natural satellite.", funFact: "It is heavily cratered and has many secret monoliths.", temperature: "-40°C", realDistance: "12,000 km from Kerbin", averageDistanceToEarth: "12,000 km", orbitalPeriod: "6.5 days" },
        fr: { name: "La Mun", description: "Le satellite naturel le plus proche de Kerbin.", funFact: "Elle est couverte de cratères et cache de nombreux monolithes secrets.", temperature: "-40°C", realDistance: "12 000 km de Kerbin", averageDistanceToEarth: "12 000 km", orbitalPeriod: "6,5 jours" },
        es: { name: "La Mun", description: "El satélite natural más cercano a Kerbin.", funFact: "Está muy craterizado y tiene muchos monolitos secretos.", temperature: "-40°C", realDistance: "12.000 km de Kerbin", averageDistanceToEarth: "12.000 km", orbitalPeriod: "6,5 días" },
        zh: { name: "The Mun", description: "距离 Kerbin 最近的天然卫星。", funFact: "它布满了陨石坑，并有许多秘密的独石。", temperature: "-40°C", realDistance: "距 Kerbin 12,000 公里", averageDistanceToEarth: "12,000 公里", orbitalPeriod: "6.5 天" },
        hi: { name: "द मुन", description: "करबिन का सबसे करीबी प्राकृतिक उपग्रह।", funFact: "इसमें बहुत सारे गड्ढे हैं और कई गुप्त मोनोलिथ हैं।", temperature: "-40°C", realDistance: "करबिन से 12,000 किमी", averageDistanceToEarth: "12,000 किमी", orbitalPeriod: "6.5 दिन" }
    },
    'minmus': {
        en: { name: "Minmus", description: "A small icy moon with a minty color.", funFact: "Lore says it's made of frozen dessert (mint ice cream)!", temperature: "-80°C", realDistance: "47,000 km from Kerbin", averageDistanceToEarth: "47,000 km", orbitalPeriod: "47 days" },
        fr: { name: "Minmus", description: "Une petite lune glacée de couleur menthe.", funFact: "La légende dit qu'elle est faite de dessert glacé (glace à la menthe) !", temperature: "-80°C", realDistance: "47 000 km de Kerbin", averageDistanceToEarth: "47 000 km", orbitalPeriod: "47 jours" },
        es: { name: "Minmus", description: "Una pequeña luna helada con un color mentolado.", funFact: "¡La leyenda dice que está hecha de postre helado (helado de menta)!", temperature: "-80°C", realDistance: "47.000 km de Kerbin", averageDistanceToEarth: "47.000 km", orbitalPeriod: "47 días" },
        zh: { name: "Minmus", description: "一颗带有薄荷色的小型冰冷卫星。", funFact: "传说它是由冷冻甜点（薄荷冰淇淋）制成的！", temperature: "-80°C", realDistance: "距 Kerbin 47,000 公里", averageDistanceToEarth: "47,000 公里", orbitalPeriod: "47 天" },
        hi: { name: "मिनमस", description: "पुदीने के रंग का एक छोटा बर्फीला चंद्रमा।", funFact: "किंवदंती है कि यह फ्रोजन मिठाई (मिंट आइसक्रीम) से बना है!", temperature: "-80°C", realDistance: "करबिन से 47,000 किमी", averageDistanceToEarth: "47,000 किमी", orbitalPeriod: "47 दिन" }
    },
    'duna': {
        en: { name: "Duna", description: "The red planet of the Kerbol system.", funFact: "It has a giant face rock formation on its surface!", temperature: "-40°C", realDistance: "20.7 million km", averageDistanceToEarth: "7.1 million km", orbitalPeriod: "801 days" },
        fr: { name: "Duna", description: "La planète rouge du système Kerbol.", funFact: "Elle possède une formation rocheuse géante en forme de visage !", temperature: "-40°C", realDistance: "20,7 millions de km", averageDistanceToEarth: "7,1 millions de km", orbitalPeriod: "801 jours" },
        es: { name: "Duna", description: "El planeta rojo del sistema Kerbal.", funFact: "¡Tiene una formación rocosa de cara gigante en su superficie!", temperature: "-40°C", realDistance: "20,7 millones de km", averageDistanceToEarth: "7,1 millones de km", orbitalPeriod: "801 días" },
        zh: { name: "Duna", description: "Kerbol 星系的红色行星。", funFact: "它的表面有一个巨大的脸形岩石层！", temperature: "-40°C", realDistance: "2070 万公里", averageDistanceToEarth: "710 万公里", orbitalPeriod: "801 天" },
        hi: { name: "डूना", description: "करबोल प्रणाली का लाल ग्रह।", funFact: "इसकी सतह पर एक विशाल चेहरे जैसी चट्टान की संरचना है!", temperature: "-40°C", realDistance: "20.7 मिलियन किमी", averageDistanceToEarth: "7.1 मिलियन किमी", orbitalPeriod: "801 दिन" }
    },
    'ike': {
        en: { name: "Ike", description: "Duna's large, tidally locked moon.", funFact: "Ike is always watching Duna from the same spot!", temperature: "-60°C", realDistance: "3,200 km from Duna", averageDistanceToEarth: "7.1 million km", orbitalPeriod: "3 days" },
        fr: { name: "Ike", description: "La grande lune de Duna, verrouillée par les marées.", funFact: "Ike surveille toujours Duna depuis le même endroit !", temperature: "-60°C", realDistance: "3 200 km de Duna", averageDistanceToEarth: "7,1 millions de km", orbitalPeriod: "3 jours" },
        es: { name: "Ike", description: "La gran luna de Duna, bloqueada por las mareas.", funFact: "¡Ike siempre está mirando a Duna desde el mismo lugar!", temperature: "-60°C", realDistance: "3.200 km de Duna", averageDistanceToEarth: "7,1 millones de km", orbitalPeriod: "3 días" },
        zh: { name: "Ike", description: "Duna 的大型潮汐锁定卫星。", funFact: "Ike 总是从同一个地方注视着 Duna！", temperature: "-60°C", realDistance: "距 Duna 3,200 公里", averageDistanceToEarth: "710 万公里", orbitalPeriod: "3 天" },
        hi: { name: "आइक", description: "डूना का बड़ा, ज्वारीय रूप से लॉक चंद्रमा।", funFact: "आइक हमेशा एक ही जगह से डूना को देख रहा होता है!", temperature: "-60°C", realDistance: "डूना से 3,200 किमी", averageDistanceToEarth: "7.1 मिलियन किमी", orbitalPeriod: "3 दिन" }
    },
    'dres': {
        en: { name: "Dres", description: "A lonely dwarf planet in the asteroid belt.", funFact: "It has a massive canyon and is often forgotten by explorers.", temperature: "-150°C", realDistance: "40.8 million km", averageDistanceToEarth: "27.2 million km", orbitalPeriod: "2206 days" },
        fr: { name: "Dres", description: "Une planète naine isolée dans la ceinture d'astéroïdes.", funFact: "Elle possède un canyon massif et est souvent oubliée par les explorateurs.", temperature: "-150°C", realDistance: "40,8 millions de km", averageDistanceToEarth: "27,2 millions de km", orbitalPeriod: "2206 jours" },
        es: { name: "Dres", description: "Un planeta enano solitario en el cinturón de asteroides.", funFact: "Tiene un cañón enorme y los exploradores lo olvidan a menudo.", temperature: "-150°C", realDistance: "40,8 millones de km", averageDistanceToEarth: "27,2 millones de km", orbitalPeriod: "2206 días" },
        zh: { name: "Dres", description: "小行星带中一颗孤独的矮行星。", funFact: "它有一个巨大的峡谷，经常被探险家遗忘。", temperature: "-150°C", realDistance: "4080 万公里", averageDistanceToEarth: "2720 万公里", orbitalPeriod: "2206 天" },
        hi: { name: "ड्रेस", description: "क्षुद्रग्रह बेल्ट में एक अकेला बौना ग्रह।", funFact: "इसमें एक विशाल घाटी है और अक्सर खोजकर्ता इसे भूल जाते हैं।", temperature: "-150°C", realDistance: "40.8 मिलियन किमी", averageDistanceToEarth: "27.2 मिलियन किमी", orbitalPeriod: "2206 दिन" }
    },
    'jool': {
        en: { name: "Jool", description: "A massive green gas giant.", funFact: "It has five distinct moons and a crushing atmosphere!", temperature: "-100°C", realDistance: "68.7 million km", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "4853 days" },
        fr: { name: "Jool", description: "Une géante gazeuse verte massive.", funFact: "Elle possède cinq lunes distinctes et une atmosphère écrasante !", temperature: "-100°C", realDistance: "68,7 millions de km", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "4853 jours" },
        es: { name: "Jool", description: "Un gigante gaseoso verde masivo.", funFact: "¡Tiene cinco lunas distintas y una atmósfera aplastante!", temperature: "-100°C", realDistance: "68,7 millones de km", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "4853 días" },
        zh: { name: "Jool", description: "一颗巨大的绿色气态巨行星。", funFact: "它有五颗不同的卫星和压抑的大气层！", temperature: "-100°C", realDistance: "6870 万公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "4853 天" },
        hi: { name: "जूल", description: "एक विशाल हरे रंग का गैस दानव।", funFact: "इसके पांच अलग-अलग चंद्रमा और एक कुचलने वाला वायुमंडल है!", temperature: "-100°C", realDistance: "68.7 मिलियन किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "4853 दिन" }
    },
    'laythe': {
        en: { name: "Laythe", description: "An oceanic moon in resonance with Jool.", funFact: "It has liquid water and a cold but breathable atmosphere!", temperature: "-10°C", realDistance: "27,184 km from Jool", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "3 days" },
        fr: { name: "Laythe", description: "Une lune océanique en résonance avec Jool.", funFact: "Elle possède de l'eau liquide et une atmosphère froide mais respirable !", temperature: "-10°C", realDistance: "27 184 km de Jool", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "3 jours" },
        es: { name: "Laythe", description: "Una luna oceánica en resonancia con Jool.", funFact: "¡Tiene agua líquida y una atmósfera fría pero respirable!", temperature: "-10°C", realDistance: "27.184 km de Jool", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "3 días" },
        zh: { name: "Laythe", description: "一颗与 Jool 共振的海洋卫星。", funFact: "它有液态水和寒冷但可呼吸的大气层！", temperature: "-10°C", realDistance: "距 Jool 27,184 公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "3 天" },
        hi: { name: "लेथे", description: "जूल के साथ प्रतिध्वनि में एक महासागरीय चंद्रमा।", funFact: "इसमें तरल पानी और एक ठंडा लेकिन सांस लेने योग्य वायुमंडल है!", temperature: "-10°C", realDistance: "जूल से 27,184 किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "3 दिन" }
    },
    'vall': {
        en: { name: "Vall", description: "A blue ice ball orbiting Jool.", funFact: "Its surface is part of a complex 1:2:4 Laplace resonance.", temperature: "-120°C", realDistance: "43,152 km from Jool", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "6 days" },
        fr: { name: "Vall", description: "Une boule de glace bleue en orbite de Jool.", funFact: "Sa surface fait partie d'une résonance de Laplace complexe 1:2:4.", temperature: "-120°C", realDistance: "43 152 km de Jool", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "6 jours" },
        es: { name: "Vall", description: "Una bola de hielo azul que orbita Jool.", funFact: "Su superficie es parte de una resonancia de Laplace compleja 1:2:4.", temperature: "-120°C", realDistance: "43.152 km de Jool", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "6 días" },
        zh: { name: "Vall", description: "一颗围绕 Jool 运行的蓝色冰球。", funFact: "它的表面是复杂的 1:2:4 拉普拉斯共振的一部分。", temperature: "-120°C", realDistance: "距 Jool 43,152 公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "6 天" },
        hi: { name: "वाल", description: "जूल की परिक्रमा करने वाला एक नीला बर्फ का गोला।", funFact: "इसकी सतह एक जटिल 1:2:4 लाप्लास प्रतिध्वनि का हिस्सा है।", temperature: "-120°C", realDistance: "जूल से 43,152 किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "6 दिन" }
    },
    'tylo': {
        en: { name: "Tylo", description: "The largest moon of Jool with high gravity.", funFact: "It has NO atmosphere, making landing extremely difficult.", temperature: "-90°C", realDistance: "68,500 km from Jool", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "12 days" },
        fr: { name: "Tylo", description: "La plus grande lune de Jool avec une forte gravité.", funFact: "Elle n'a AUCUNE atmosphère, ce qui rend l'atterrissage extrêmement difficile.", temperature: "-90°C", realDistance: "68 500 km de Jool", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "12 jours" },
        es: { name: "Tylo", description: "La luna más grande de Jool con alta gravedad.", funFact: "No tiene atmósfera, lo que hace que el aterrizaje sea extremadamente difícil.", temperature: "-90°C", realDistance: "68.500 km de Jool", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "12 días" },
        zh: { name: "Tylo", description: "Jool 最大的卫星，具有高重力。", funFact: "它没有大气层，使得着陆极其困难。", temperature: "-90°C", realDistance: "距 Jool 68,500 公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "12 天" },
        hi: { name: "टाइलो", description: "उच्च गुरुत्वाकर्षण वाला जूल का सबसे बड़ा चंद्रमा।", funFact: "यहाँ कोई वायुमंडल नहीं है, जिससे लैंडिंग अत्यंत कठिन हो जाती है।", temperature: "-90°C", realDistance: "जूल से 68,500 किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "12 दिन" }
    },
    'bop': {
        en: { name: "Bop", description: "A small, lumpy moon of Jool.", funFact: "It is the final resting place of the legendary Dead Kraken!", temperature: "-150°C", realDistance: "128,500 km from Jool", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "38 days" },
        fr: { name: "Bop", description: "Une petite lune bosselée de Jool.", funFact: "C'est la dernière demeure du légendaire Kraken Mort !", temperature: "-150°C", realDistance: "128 500 km de Jool", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "38 jours" },
        es: { name: "Bop", description: "Una lune pequeña y rugosa de Jool.", funFact: "¡Es el lugar de descanso final del legendario Kraken Muerto!", temperature: "-150°C", realDistance: "128.500 km de Jool", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "38 días" },
        zh: { name: "Bop", description: "Jool 的一颗微小、崎岖的卫星。", funFact: "它是传说中死去的 Kraken 的最后安息之地！", temperature: "-150°C", realDistance: "距 Jool 128,500 公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "38 天" },
        hi: { name: "बॉप", description: "जूल का एक छोटा, गांठदार चंद्रमा।", funFact: "यह महान मरे हुए क्रैकन का अंतिम विश्राम स्थल है!", temperature: "-150°C", realDistance: "जूल से 128,500 किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "38 दिन" }
    },
    'pol': {
        en: { name: "Pol", description: "The smallest moon of Jool, resembling pollen.", funFact: "Its surface is covered in strange, yellow spiky formations.", temperature: "-160°C", realDistance: "179,890 km from Jool", averageDistanceToEarth: "55.1 million km", orbitalPeriod: "66 days" },
        fr: { name: "Pol", description: "La plus petite lune de Jool, ressemblant à du pollen.", funFact: "Sa surface est couverte d'étranges formations jaunes pointues.", temperature: "-160°C", realDistance: "179 890 km de Jool", averageDistanceToEarth: "55,1 millions de km", orbitalPeriod: "66 jours" },
        es: { name: "Pol", description: "La luna más pequeña de Jool, que parece polen.", funFact: "Su superficie está cubierta de extrañas formaciones amarillas puntiagudas.", temperature: "-160°C", realDistance: "179.890 km de Jool", averageDistanceToEarth: "55,1 millones de km", orbitalPeriod: "66 días" },
        zh: { name: "Pol", description: "Jool 最小的卫星，形似花粉。", funFact: "它的表面覆盖着奇怪的黄色尖峰层。", temperature: "-160°C", realDistance: "距 Jool 179,890 公里", averageDistanceToEarth: "5510 万公里", orbitalPeriod: "66 天" },
        hi: { name: "पोल", description: "जूल का सबसे छोटा चंद्रमा, जो पराग जैसा दिखता है।", funFact: "इसकी सतह अजीबोगरीब, पीली नुकीली संरचनाओं से ढकी हुई है।", temperature: "-160°C", realDistance: "जूल से 179,890 किमी", averageDistanceToEarth: "55.1 मिलियन किमी", orbitalPeriod: "66 दिन" }
    },
    'eeloo': {
        en: { name: "Eeloo", description: "A distant, icy dwarf planet.", funFact: "It is the furthest reach of the Kerbol system and very cold!", temperature: "-210°C", realDistance: "90.1 million km", averageDistanceToEarth: "76.5 million km", orbitalPeriod: "7257 days" },
        fr: { name: "Eeloo", description: "Une planète naine glacée et lointaine.", funFact: "C'est le point le plus éloigné du système Kerbol et il y fait très froid !", temperature: "-210°C", realDistance: "90,1 millions de km", averageDistanceToEarth: "76,5 millions de km", orbitalPeriod: "7257 jours" },
        es: { name: "Eeloo", description: "Un planeta enano helado y distante.", funFact: "¡Es el punto más alejado del sistema Kerbal y hace mucho frío!", temperature: "-210°C", realDistance: "90,1 millones de km", averageDistanceToEarth: "76,5 millones de km", orbitalPeriod: "7257 días" },
        zh: { name: "Eeloo", description: "一颗遥远的冰冷矮行星。", funFact: "它是 Kerbol 星系的最远端，非常寒冷！", temperature: "-210°C", realDistance: "9010 万公里", averageDistanceToEarth: "7650 万公里", orbitalPeriod: "7257 天" },
        hi: { name: "ईलू", description: "एक दूरस्थ, बर्फीला बौना ग्रह।", funFact: "यह करबोल प्रणाली की सबसे दूर की पहुँच है और बहुत ठंडा है!", temperature: "-210°C", realDistance: "90.1 मिलियन किमी", averageDistanceToEarth: "76.5 मिलियन किमी", orbitalPeriod: "7257 दिन" }
    }
};
