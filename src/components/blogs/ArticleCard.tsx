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
      <Card className="h-full overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none bg-white dark:bg-black/20 pt-0 rounded-2xl">
        <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={article.thumbnail || "/placeholder.svg"}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
              priority={priority}
              quality={85}
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <CardHeader className="flex-grow space-y-4 p-6">
          <div className="flex flex-wrap gap-2 items-center">
            {visibleTags.map((tag, i) => (
              <Link
                key={i}
                href={`/tags/${tag.slug}`}
                className="z-20"
              >
                <span className="text-xs font-semibold text-primary/80 bg-primary/5 px-2.5 py-0.5 rounded-full ring-1 ring-primary/10">
                  {tag.name}
                </span>
              </Link>
            ))}

            {extraTagCount > 0 && (
              <span className="text-xs text-muted-foreground">
                +{extraTagCount} more
              </span>
            )}
          </div>

          <CardTitle className="line-clamp-2 text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            <Link href={`/article/${article.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {article.title}
            </Link>
          </CardTitle>
          
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {article.description}
          </CardDescription>

          <div className="pt-2 mt-auto flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Read Article <span className="ml-1">→</span>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

