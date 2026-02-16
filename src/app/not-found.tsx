
"use client";

export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="flex flex-col items-center gap-6">
        {/* Icon / Logo */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex flex-col items-center">
            <Image
              src="/globe.svg"
              alt="Contenable Logo"
              width={80}
              height={80}
              className="opacity-80"
            />
          </div>
        </div>

        {/* Title & Message */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          404 — Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Try checking the URL or head back to the homepage.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">Search Articles</Button>
          </Link>
        </div>
      </div>

      {/* Background gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </main>
  );
}
