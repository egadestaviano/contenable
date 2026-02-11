"use client";

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
import { useRouter } from "next/navigation";

export default function ArticleCard({ article }: { article: Blog }) {
  const maxTagsToShow = 2;
  const tags = article.tags || [];
  const visibleTags = tags.slice(0, maxTagsToShow);
  const extraTagCount = tags.length - visibleTags.length;
  const router = useRouter();

  return (
    <Link href={`/article/${article.slug}`} className="block group">
      <Card className="h-full overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 duration-300 pt-0">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={article.thumbnail || "/placeholder.jpg"}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardHeader className="flex-grow space-y-2">
          <div className="flex flex-wrap gap-2 mb-1">
            {visibleTags.map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="cursor-pointer text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/tags/${tag.slug}`);
                }}
              >
                #{tag.name}
              </Badge>
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
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm sm:text-base text-gray-500">
            {article.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
