import { Suspense } from "react";
import TagContent from "./TagContent";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `Articles tagged with ${capitalizedSlug}`,
    description: `Browse all articles and stories tagged with ${slug} on Contenable.`,
    openGraph: {
      title: `${capitalizedSlug} Articles | Contenable`,
      description: `Explore the best content tagged with ${slug} on Contenable.`,
    }
  };
}

export default function TagPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-4 w-40 bg-muted rounded mb-6" />
        <div className="h-10 w-64 bg-muted rounded mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-2xl h-[280px]" />
          ))}
        </div>
      </div>
    }>
      <TagContent />
    </Suspense>
  );
}
