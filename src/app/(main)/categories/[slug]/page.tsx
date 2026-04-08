import { Suspense } from "react";
import CategoryDetailContent from "./CategoryDetailContent";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${capitalizedSlug} Articles`,
    description: `Discover all the best articles and stories in the ${slug} category on Contenable.`,
    openGraph: {
      title: `${capitalizedSlug} - Contenable`,
      description: `Browse insightful content about ${slug} on Contenable.`,
    }
  };
}

export default function CategoryDetailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto py-10 px-4 animate-pulse">
        <div className="h-4 w-40 bg-muted rounded mb-6" />
        <div className="h-10 w-64 bg-muted rounded mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-2xl h-[280px]" />
          ))}
        </div>
      </div>
    }>
      <CategoryDetailContent />
    </Suspense>
  );
}
