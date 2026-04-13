import type { Metadata, Viewport } from "next"; // Ajout de Viewport pour le mobile
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav"; // Import de la barre de navigation

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata professionnelles pour le Cameroun
export const metadata: Metadata = {
  title: "WAKA | Livraison Express Cameroun",
  description: "Vos courses, livrées en un clic à Douala et Yaoundé. Projet réalisé par l'équipe WAKA.",
  manifest: "/manifest.json", // Pour que l'app soit installable sur Android/iPhone
};

// Empêcher le zoom automatique sur iPhone lors de la saisie
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#064e3b", // Couleur émeraude de WAKA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr" // Passage en Français
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-yellow-400 selection:text-green-900`}
    >
      <body className="min-h-screen bg-green-950 flex flex-col">
        {/* Contenu principal de l'app */}
        <div className="flex-grow">
          {children}
        </div>

        {/* La barre de navigation globale */}
        <BottomNav />
      </body>
    </html>
  );
}