import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://contenable.egadestaviano.my.id"),
  title: {
    default: "Contenable | Smart Article Search Platform",
    template: "%s | Contenable",
  },
  description: "Discover ideas, insights, and inspiration all in one connected space. Contenable brings you closer to the content that moves the world.",
  keywords: ["article", "blog", "search", "content", "discover", "ideas"],
  authors: [{ name: "Contena Team" }],
  creator: "Contena",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://contenable.egadestaviano.my.id",
    siteName: "Contenable",
    title: "Contenable - Smart Article Search Platform",
    description: "Discover ideas, insights, and inspiration all in one connected space.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contenable",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contenable - Smart Article Search Platform",
    description: "Discover ideas, insights, and inspiration all in one connected space.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/globe.svg",
    shortcut: "/globe.svg",
    apple: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Contenable",
    "url": "https://contenable.egadestaviano.my.id",
    "logo": "https://contenable.egadestaviano.my.id/globe.svg",
    "sameAs": [
      "https://twitter.com/contennable",
      "https://facebook.com/contennable"
    ]
  };

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "oklch(0.25 0.03 240)",
          colorBackground: "oklch(0.99 0.005 240)",
          colorText: "oklch(0.2 0.02 240)",
        },
        elements: {
          card: "shadow-none border border-border/40 rounded-2xl",
          formButtonPrimary: "bg-primary hover:opacity-90 transition-opacity",
          footerActionLink: "text-primary hover:text-primary/80",
        }
      }}
    >
      <html suppressHydrationWarning lang="en">
        <head>
          <link rel="preconnect" href="https://api-contenable.egadestaviano.my.id" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api-contenable.egadestaviano.my.id" />
          <link rel="preconnect" href="https://api-contenable.egadestaviano.my.id" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api-contenable.egadestaviano.my.id" />

          <link rel="preload" href="/globe.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} antialiased bg-gray-50 text-gray-900`}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-primary focus:shadow-lg focus:rounded-b-xl focus:border focus:border-primary/20"
          >
            Skip to content
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <main id="main-content" className="flex min-h-screen w-full flex-col">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
