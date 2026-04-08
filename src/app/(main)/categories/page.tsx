import { Suspense } from "react";
import CategoriesContent from "./CategoriesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Categories",
  description: "Browse articles by category on Contenable. Find the topics that interest you the most.",
  openGraph: {
    title: "Explore Categories | Contenable",
    description: "Discover articles by topic on Contenable. Alphabetically organized for easy browsing.",
  }
};

export default function CategoriesPage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto py-10 px-4 animate-pulse">
          <div className="h-4 w-40 bg-muted rounded mb-6" />
          <div className="h-10 w-64 bg-muted rounded mb-4" />
          <div className="h-4 w-80 bg-muted rounded mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="h-20 w-full bg-muted rounded-2xl" />
              <div className="h-20 w-full bg-muted rounded-2xl" />
            </div>
            <div className="space-y-8">
              <div className="h-20 w-full bg-muted rounded-2xl" />
              <div className="h-20 w-full bg-muted rounded-2xl" />
            </div>
          </div>
        </div>
      }>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}
