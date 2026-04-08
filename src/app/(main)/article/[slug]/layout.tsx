import { Metadata, ResolvingMetadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blogs/${slug}`, {
      next: { revalidate: 3600 }
    });
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.featured_image || article.thumbnail, ...previousImages],
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author?.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.featured_image || article.thumbnail],
    },
  }
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
