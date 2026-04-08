import { Suspense } from "react";
import SearchContent from "./SearchContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Articles",
  description: "Search for articles, stories, and insights on Contenable. Find the content that moves you.",
  openGraph: {
    title: "Search Articles | Contenable",
    description: "Find perspectives, insights, and stories that spark your interest on Contenable.",
  }
};

export default function SearchPage() {
  return (
    <div className="bg-background min-h-screen w-full">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center gap-8 w-full">
          <div className="w-full max-w-2xl h-16 bg-muted animate-pulse rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[16/10] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  );
}
