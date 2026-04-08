import Hero from '@/components/Landing/Hero'
import ArticleSection from '@/components/Landing/ArticleSection'

export default function Loading() {
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
      <section className="w-full max-w-7xl">
        <Hero />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection title="Loading New Articles..." articles={[]} loading={true} />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection title="Loading Top Articles..." articles={[]} loading={true} />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection title="Loading Featured Articles..." articles={[]} loading={true} />
      </section>
    </div>
  )
}
