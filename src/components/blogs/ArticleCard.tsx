import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/store/features/blogs/blog";

export default function ArticleCard({ article, priority = false }: { article: Blog; priority?: boolean }) {
  const maxTagsToShow = 2;
  const tags = article.tags || [];
  const visibleTags = tags.slice(0, maxTagsToShow);
  const extraTagCount = tags.length - visibleTags.length;

  return (
    <div className="relative group h-full">
      <Card className="h-full overflow-hidden flex flex-col pt-0 rounded-2xl border border-custom-light/80 dark:border-neutral-700 bg-white dark:bg-neutral-900 editorial-ring-hover">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            priority={priority}
            quality={85}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="flex-grow space-y-3 p-5">
          <div className="flex flex-wrap gap-2 items-center">
            {visibleTags.map((tag, i) => (
              <Link key={i} href={`/tags/${tag.slug}`} className="z-20">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-custom-primary dark:text-custom-primary-dark-secondary border border-custom-light dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70">
                  {tag.name}
                </span>
              </Link>
            ))}
            {extraTagCount > 0 && <span className="text-[11px] text-neutral-500 dark:text-neutral-400">+{extraTagCount}</span>}
          </div>

          <CardTitle className="line-clamp-2 font-serif text-xl font-normal text-neutral-900 dark:text-neutral-100 group-hover:text-custom-primary dark:group-hover:text-custom-primary-dark-secondary transition-colors leading-snug">
            <Link href={`/article/${article.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {article.title}
            </Link>
          </CardTitle>

          <CardDescription className="line-clamp-2 font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {article.description}
          </CardDescription>

          <div className="pt-1 mt-auto text-xs font-semibold text-custom-primary dark:text-custom-primary-dark-secondary">
            Read story
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
