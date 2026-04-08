import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Blog } from "@/store/features/blogs/blog";

export default function ArticleCard({ article, priority = false }: { article: Blog; priority?: boolean }) {
  const maxTagsToShow = 2;
  const tags = article.tags || [];
  const visibleTags = tags.slice(0, maxTagsToShow);
  const extraTagCount = tags.length - visibleTags.length;

  return (
    <div className="relative group h-full">
      <Card className="h-full overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 duration-300 pt-0">
        <div className="relative w-full aspect-[4/3]">
            <Image
              src={article.thumbnail || "/placeholder.svg"}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
              priority={priority}
              quality={70}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>

        <CardHeader className="flex-grow space-y-2">
          <div className="flex flex-wrap gap-2 mb-1 z-10 relative">
            {visibleTags.map((tag, i) => (
              <Link
                key={i}
                href={`/tags/${tag.slug}`}
                className="z-20"
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  #{tag.name}
                </Badge>
              </Link>
            ))}

            {extraTagCount > 0 && (
              <Badge
                variant="outline"
                className="text-xs border-dashed text-muted-foreground"
              >
                +{extraTagCount}
              </Badge>
            )}
          </div>

          <CardTitle className="line-clamp-2 text-base sm:text-lg">
            <Link href={`/article/${article.slug}`} className="hover:underline focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {article.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base text-gray-500">
            {article.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
