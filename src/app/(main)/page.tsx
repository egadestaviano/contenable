import { Flame, Star, Sparkles, LucideProps } from 'lucide-react'
import Hero from '@/components/Landing/Hero'
import ArticleSection from '@/components/Landing/ArticleSection'
import { Suspense } from 'react'

// Basic Server-side fetcher
async function getData(endpoint: string, params: string = "") {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${params ? `?${params}` : ""}`;
    const res = await fetch(url, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return [];
  }
}

// Sub-component to handle its own data fetching
async function ArticlesContainer({ 
  endpoint, 
  params, 
  title, 
  icon: Icon, 
  priorityCount = 0 
}: { 
  endpoint: string; 
  params?: string; 
  title: string; 
  icon: React.ComponentType<LucideProps>; 
  priorityCount?: number;
}) {
  const articles = await getData(endpoint, params);
  return (
    <ArticleSection
      articles={articles}
      priorityCount={priorityCount}
      title={
        <div className="flex items-center gap-2">
          <Icon className={`w-6 h-6 ${endpoint === 'blogs' && params?.includes('top') ? 'text-red-500' : endpoint === 'blogs' && params?.includes('featured') ? 'text-yellow-500' : 'text-primary'}`} aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        </div>
      }
    />
  );
}

// Tags fetcher for Hero
async function HeroWithData() {
  const tags = await getData('tags');
  return <Hero initialTags={tags} />;
}

export default function Home() {
  return (
    <div
      className="
        font-sans flex flex-col items-center 
        w-full
        px-4 sm:px-8 lg:px-16 xl:px-24 
        pb-16 
        gap-y-10 sm:gap-14 lg:gap-20
      "
    >
      {/* Hero Section - Streaming tags */}
      <section className="w-full max-w-7xl">
        <Suspense fallback={<Hero />}>
          <HeroWithData />
        </Suspense>
      </section>

      {/* New Articles */}
      <section className="w-full max-w-7xl">
        <Suspense fallback={<ArticleSection title="Loading New Articles..." articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=newest"
            title="New Articles"
            icon={Sparkles}
            priorityCount={4}
          />
        </Suspense>
      </section>

      {/* Top Articles */}
      <section className="w-full max-w-7xl">
        <Suspense fallback={<ArticleSection title="Loading Top Articles..." articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=top"
            title="Top Articles"
            icon={Flame}
          />
        </Suspense>
      </section>

      {/* Featured Articles */}
      <section className="w-full max-w-7xl">
        <Suspense fallback={<ArticleSection title="Loading Featured Articles..." articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=featured"
            title="Featured Articles"
            icon={Star}
          />
        </Suspense>
      </section>
    </div>
  )
}
