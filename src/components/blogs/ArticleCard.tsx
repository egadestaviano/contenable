import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      <Card className="h-full overflow-hidden flex flex-col transition-all duration-200 border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 pt-0 rounded-none shadow-none hover:border-custom-primary dark:hover:border-custom-primary-dark">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            priority={priority}
            quality={85}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="flex-grow space-y-3 p-5">

          <div className="flex flex-wrap gap-2 items-center">
            {visibleTags.map((tag, i) => (
              <Link
                key={i}
                href={`/tags/${tag.slug}`}
                className="z-20"
              >
                <span className="text-[10px] font-medium uppercase tracking-wide text-custom-primary dark:text-custom-primary-dark-secondary border border-custom-light dark:border-neutral-700 px-2 py-0.5 rounded-none">
                  {tag.name}
                </span>
              </Link>
            ))}

            {extraTagCount > 0 && (
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                +{extraTagCount}
              </span>
            )}
          </div>

          <CardTitle className="line-clamp-2 font-serif text-lg sm:text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-custom-primary dark:group-hover:text-custom-primary-dark-secondary transition-colors leading-snug">
            <Link href={`/article/${article.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {article.title}
            </Link>
          </CardTitle>

          <CardDescription className="line-clamp-2 font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {article.description}
          </CardDescription>

          <div className="pt-2 mt-auto flex items-center font-sans text-xs font-medium text-custom-primary dark:text-custom-primary-dark-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read Article <span className="ml-1">→</span>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
