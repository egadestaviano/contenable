"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
          <AlertTriangle className="w-16 h-16 text-red-600 relative" />
        </div>

        {/* Title & Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          We encountered an unexpected error. Don’t worry, it’s not your fault.
          Try refreshing the page or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>

      {/* Accent gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
    </main>
  );
}
