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
    // Fallback for others using English logic or simpler translations if needed,
    // but for now I'll just include the main ones requested.
    // Eris, Makemake, Haumea, Webb, Hubble, ISS can be added.
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
        hi: { name: "eris", description: "सबसे दूर के बौने ग्रहों में से एक!", funFact: "लगभग प्लूटो के समान आकार!", temperature: "-231°C", realDistance: "10.1 अरब किमी", averageDistanceToEarth: "10 अरब किमी", orbitalPeriod: "557 वर्ष" }
    },
    // Adding minimal translations for others to prevent errors, defaulting to simplified
    makemake: {
        en: { name: "Makemake", description: "A mysterious dwarf planet in the outer solar system.", funFact: "Named after the creator god of the Rapa Nui people.", temperature: "-239°C", realDistance: "6.8 billion km", averageDistanceToEarth: "7 billion km", orbitalPeriod: "309 years" },
        fr: { name: "Makemake", description: "Une mystérieuse planète naine du système solaire externe.", funFact: "Nommée d'après le dieu créateur du peuple Rapa Nui.", temperature: "-239°C", realDistance: "6,8 milliards de km", averageDistanceToEarth: "7 milliards de km", orbitalPeriod: "309 ans" },
        es: { name: "Makemake", description: "Un planeta enano misterioso.", funFact: "Nombrado por el dios creador Rapa Nui.", temperature: "-239°C", realDistance: "6.8 mil millones km", averageDistanceToEarth: "7 mil millones km", orbitalPeriod: "309 años" },
        zh: { name: "鸟神星", description: "外太阳系神秘的矮行星。", funFact: "以复活节岛拉帕努伊人的创造神命名。", temperature: "-239°C", realDistance: "68 亿公里", averageDistanceToEarth: "70 亿公里", orbitalPeriod: "309 年" },
        hi: { name: "Makemake", description: "बाहरी सौरमंडल में एक रहस्यमय बौना ग्रह।", funFact: "रापा नुई लोगों के निर्माता देवता के नाम पर।", temperature: "-239°C", realDistance: "6.8 अरब किमी", averageDistanceToEarth: "7 अरब किमी", orbitalPeriod: "309 वर्ष" }
    },
    haumea: {
        en: { name: "Haumea", description: "The egg-shaped dwarf planet!", funFact: "Haumea spins so fast it's shaped like a football!", temperature: "-223°C", realDistance: "6.5 billion km", averageDistanceToEarth: "6.4 billion km", orbitalPeriod: "284 years" },
        fr: { name: "Haumea", description: "La planète naine en forme d'œuf !", funFact: "Haumea tourne si vite qu'elle a la forme d'un ballon de rugby !", temperature: "-223°C", realDistance: "6,5 milliards de km", averageDistanceToEarth: "6,4 milliards de km", orbitalPeriod: "284 ans" },
        es: { name: "Haumea", description: "¡El planeta enano con forma de huevo!", funFact: "¡Gira tan rápido que parece un balón de fútbol!", temperature: "-223°C", realDistance: "6.5 mil millones km", averageDistanceToEarth: "6.4 mil millones km", orbitalPeriod: "284 años" },
        zh: { name: "妊神星", description: "蛋形的矮行星！", funFact: "自转太快所以形状像橄榄球！", temperature: "-223°C", realDistance: "65 亿公里", averageDistanceToEarth: "64 亿公里", orbitalPeriod: "284 年" },
        hi: { name: "Haumea", description: "अंडे के आकार का बौना ग्रह!", funFact: "हौमिया इतना तेज घूमता है कि यह फुटबॉल जैसा दिखता है!", temperature: "-223°C", realDistance: "6.5 अरब किमी", averageDistanceToEarth: "6.4 अरब किमी", orbitalPeriod: "284 वर्ष" }
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
    }
};
