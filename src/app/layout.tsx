import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReduxProvider } from "@/store/Provider";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (SEO)
export const metadata: Metadata = {
  title: "Contenna - Search Article here",
  description: "Next.js + Clerk + shadcn/ui clean layout",
};

// Root layout tanpa header/footer
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
        >
          <main className="flex min-h-screen items-center justify-center w-full">
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
