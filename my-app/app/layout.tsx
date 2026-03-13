import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mirokaï Experience",
  description:
    "Parcours immersif mobile-first pour découvrir l’univers d’Enchanted Tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mirokaï Experience" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
