
"use client";

export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="flex flex-col items-center gap-6">

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

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          404 — Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Oops! The page you’re looking for doesn’t exist or has been moved.
          Try checking the URL or head back to the homepage.
        </p>

        <div className="flex gap-3 mt-4">
          <Button asChild className="flex items-center gap-2 cursor-pointer bg-custom-primary text-white hover:bg-custom-primary-hover dark:bg-custom-primary dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-custom-light dark:border-neutral-700 cursor-pointer text-custom-primary dark:text-custom-primary-dark hover:!bg-custom-primary hover:!text-white hover:!border-custom-primary dark:hover:!bg-white dark:hover:!text-black dark:hover:!border-white transition-all duration-300"
          >
            <Link href="/search">Search Articles</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
}
