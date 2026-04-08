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
      title={title}
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
    <div className="flex flex-col items-center w-full pb-20">
      {/* Hero Section */}
      <section className="w-full">
        <Suspense fallback={<Hero />}>
          <HeroWithData />
        </Suspense>
      </section>

      {/* New Articles */}
      <section className="w-full">
        <Suspense fallback={<ArticleSection title="Latest" articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=newest"
            title="Latest Stories"
            icon={Sparkles}
            priorityCount={4}
          />
        </Suspense>
      </section>

      {/* Top Articles */}
      <section className="w-full">
        <Suspense fallback={<ArticleSection title="Trending" articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=top"
            title="Trending Now"
            icon={Flame}
          />
        </Suspense>
      </section>

      {/* Featured Articles */}
      <section className="w-full">
        <Suspense fallback={<ArticleSection title="Featured" articles={[]} loading={true} />}>
          <ArticlesContainer
            endpoint="blogs"
            params="sort=featured"
            title="Editor's Choice"
            icon={Star}
          />
        </Suspense>
      </section>
    </div>
  )
}

