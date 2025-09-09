import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armando Fulbito - Organiza tus partidos de fútbol amateur",
  description:
    "Armando Fulbito te ayuda a organizar partidos, gestionar equipos y disfrutar el fútbol amateur. ¡Sumate y viví el fulbito como nunca!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header fijo */}
        <header
          className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50"
          style={{ borderBottom: "2px solid #00BFFF" }}
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-armandofulbito.png"
                alt="Logo"
                width={70}
                height={70}
              />
              <span className="text-2xl font-extrabold text-[#00BFFF] tracking-tight">
                Armando Fulbito
              </span>
            </Link>
          </nav>
        </header>

        <div style={{ height: "70px" }} />

        {children}
      </body>
    </html>
  );
}
