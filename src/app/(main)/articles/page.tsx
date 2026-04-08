import { Suspense } from "react";
import ArticlesContent from "./ArticlesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Articles",
  description: "Browse the latest articles and stories on Contenable. Stay updated with perspectives that matter.",
  openGraph: {
    title: "Latest Articles | Contenable",
    description: "Discover all the latest articles curated for you on Contenable.",
  }
};

export default function ArticlesPage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto py-10 px-4 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-6" />
          <div className="h-4 w-64 bg-muted rounded mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-2xl h-[280px]" />
            ))}
          </div>
        </div>
      }>
        <ArticlesContent />
      </Suspense>
    </div>
  );
}
