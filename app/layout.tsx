import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AstroClick - Exploration du Système Solaire 3D",
    description: "Plongez dans une version interactive et rétro du système solaire. Avec AstroClick.org, explorez les planètes en 3D voxel, consultez des données astronomiques réelles et découvrez les images de la NASA en un seul clic.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
