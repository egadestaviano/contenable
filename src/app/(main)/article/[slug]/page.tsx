import { Suspense } from "react";
import ArticleDetailContent from "./ArticleDetailContent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getArticle(slug: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}blogs/${slug}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`Error fetching article ${slug}:`, err);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.published_at,
      authors: [article.author?.name],
      images: [
        {
          url: article.featured_image || article.thumbnail || "/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.featured_image || article.thumbnail || "/og-image.png"],
    },
  };
}

export default function ArticlePage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-4xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-4 w-40 bg-muted rounded mb-6" />
        <div className="h-96 w-full bg-muted rounded-2xl mb-6" />
        <div className="h-10 w-3/4 bg-muted rounded mb-4" />
        <div className="h-4 w-1/2 bg-muted rounded mb-8" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
        </div>
      </div>
    }>
      <ArticleDetailContent />
    </Suspense>
  );
}
