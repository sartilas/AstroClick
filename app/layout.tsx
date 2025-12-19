import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://astroclick.org";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#1a2350" },
        { media: "(prefers-color-scheme: dark)", color: "#0b1026" },
    ],
};

export const metadata: Metadata = {
    // Métadonnées de base
    title: {
        default: "AstroClick - Exploration 3D Interactive du Système Solaire",
        template: "%s | AstroClick",
    },
    description:
        "Explorez le système solaire en 3D voxel ! Simulateur interactif gratuit avec toutes les planètes, lunes et satellites. Données astronomiques réelles et images NASA. Éducatif et ludique.",
    keywords: [
        "système solaire",
        "planètes",
        "astronomie",
        "3D",
        "interactif",
        "éducatif",
        "NASA",
        "espace",
        "voxel",
        "simulation",
        "Terre",
        "Mars",
        "Jupiter",
        "Saturne",
        "lune",
        "soleil",
        "étoiles",
        "univers",
        "science",
        "solar system",
        "planets",
        "space exploration",
    ],
    authors: [{ name: "AstroClick Team" }],
    creator: "AstroClick",
    publisher: "AstroClick",

    // Configuration du site
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: siteUrl,
        languages: {
            "fr-FR": `${siteUrl}?lang=fr`,
            "en-US": `${siteUrl}?lang=en`,
            "es-ES": `${siteUrl}?lang=es`,
            "zh-CN": `${siteUrl}?lang=zh`,
            "hi-IN": `${siteUrl}?lang=hi`,
        },
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
        type: "website",
        locale: "fr_FR",
        alternateLocale: ["en_US", "es_ES", "zh_CN"],
        url: siteUrl,
        siteName: "AstroClick",
        title: "AstroClick - Exploration 3D Interactive du Système Solaire",
        description:
            "Simulateur interactif 3D du système solaire. Explorez les planètes en voxel, découvrez des faits astronomiques et admirez les images de la NASA. Gratuit et éducatif !",
        images: [
            {
                url: `${siteUrl}/logo.png`,
                width: 512,
                height: 512,
                alt: "AstroClick - Simulateur 3D du Système Solaire",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: "AstroClick - Exploration 3D du Système Solaire",
        description:
            "Explorez le système solaire en 3D voxel ! Simulateur interactif gratuit avec planètes, lunes et satellites. 🚀🌍",
        images: [`${siteUrl}/logo.png`],
        creator: "@astroclick",
    },

    // Configuration robots
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // Icônes et PWA
    icons: {
        icon: [
            { url: "/logo.png", sizes: "32x32", type: "image/png" },
            { url: "/logo.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.json",

    // Autres métadonnées
    category: "education",
    classification: "Science/Astronomy",
};

// Données structurées JSON-LD pour Schema.org
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AstroClick",
    url: siteUrl,
    description:
        "Simulateur interactif 3D du système solaire en voxel. Explorez les planètes, découvrez des faits astronomiques et admirez les images de la NASA.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
    },
    author: {
        "@type": "Organization",
        name: "AstroClick Team",
        url: siteUrl,
    },
    inLanguage: ["fr", "en", "es", "zh", "hi"],
    isAccessibleForFree: true,
    educationalUse: ["self study", "educational game"],
    about: {
        "@type": "Thing",
        name: "Solar System",
        description: "The Solar System and its planets, moons, and satellites",
    },
    keywords:
        "système solaire, planètes, astronomie, 3D, interactif, éducatif, NASA, espace, voxel, simulation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                {/* Données structurées JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Preconnect pour performances */}
                <link rel="preconnect" href="https://images-assets.nasa.gov" />
                <link rel="dns-prefetch" href="https://images-assets.nasa.gov" />
                {/* Canonical URL */}
                <link rel="canonical" href={siteUrl} />
            </head>
            <body>{children}</body>
        </html>
    );
}
