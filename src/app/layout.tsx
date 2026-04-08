import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

// Metadata (SEO)
export const metadata: Metadata = {
  metadataBase: new URL("https://contennable.trianandafajar.com"),
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
    url: "https://contennable.trianandafajar.com",
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
    "url": "https://contennable.trianandafajar.com",
    "logo": "https://contennable.trianandafajar.com/globe.svg",
    "sameAs": [
      "https://twitter.com/contennable",
      "https://facebook.com/contennable"
    ]
  };

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#000000",
        },
      }}
    >
      <html suppressHydrationWarning lang="en">
        <head>
          <link rel="preconnect" href="https://api-contenna.trianandafajar.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api-contenna.trianandafajar.com" />
          <link rel="preconnect" href="http://127.0.0.1:8000" crossOrigin="anonymous" />
          <link rel="preload" href="/globe.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="flex min-h-screen w-full">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
