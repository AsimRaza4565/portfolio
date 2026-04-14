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
  metadataBase: new URL("https://asimraza.me"),
  icons: {
    icon: [
      {
        url: "/Asim_Raza_rounded.webp?v=1",
        type: "image/webp",
        sizes: "any",
      },
    ],
    shortcut: [{ url: "/Asim_Raza_rounded.webp?v=1", type: "image/webp" }],
    apple: [{ url: "/Asim_Raza.webp?v=1", type: "image/webp" }],
  },
  title: {
    default: "Asim Raza | Frontend Developer",
    template: "%s | Asim Raza",
  },
  description: "Personal portfolio of Asim Raza, a specialized Software Engineer and Frontend Developer crafting modern, high-performance web applications.",
  keywords: [
    "Asim Raza", 
    "Software Engineer", 
    "Frontend Developer", 
    "React Developer", 
    "Next.js Developer", 
    "Web Development", 
    "Portfolio"
  ],
  authors: [{ name: "Asim Raza", url: "https://asimraza.me" }],
  creator: "Asim Raza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asimraza.me",
    title: "Asim Raza | Software Engineer & Frontend Developer",
    description: "Personal portfolio of Asim Raza, a specialized Software Engineer and Frontend Developer crafting modern, high-performance web applications.",
    siteName: "Asim Raza Portfolio",
    images: [
      {
        url: "/Asim_Raza.webp",
        width: 1200,
        height: 630,
        alt: "Asim Raza - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asim Raza | Software Engineer & Frontend Developer",
    description: "Personal portfolio of Asim Raza, a specialized Software Engineer and Frontend Developer crafting modern, high-performance web applications.",
    images: ["/Asim_Raza.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
