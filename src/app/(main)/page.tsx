import { Flame, Star, Sparkles, LucideProps } from 'lucide-react'
import Hero from '@/components/Landing/Hero'
import ArticleSection from '@/components/Landing/ArticleSection'
import { Suspense } from 'react'

// Basic Server-side fetcher
async function getData(endpoint: string, params: string = "") {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-contenable.egadestaviano.my.id/api/";
    const url = `${baseUrl}${endpoint}${params ? `?${params}` : ""}`;
    
    console.log(`Fetching from: ${url}`);

    const res = await fetch(url, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (!res.ok) {
      console.error(`Fetch failed for ${endpoint}: ${res.status} ${res.statusText}`);
      return [];
    }
    
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
      endpoint={endpoint}
      params={params}
      title={
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#5C7E8F] dark:text-[#8faec2]" />
          <span>{title}</span>
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
    <div className="flex flex-col items-center w-full pb-20 overflow-x-hidden">

      <section className="w-full">
        <Suspense fallback={<Hero />}>
          <HeroWithData />
        </Suspense>
      </section>

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

