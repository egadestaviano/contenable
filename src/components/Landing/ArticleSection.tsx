import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode } from "react";
import type { Blog } from "@/store/features/blogs/blog";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "../blogs/ArticleCard";
import Link from "next/link";

export default function ArticleSection({
  title,
  articles,
  loading = false,
  priorityCount = 0,
}: {
  title: ReactNode;
  articles: Blog[];
  loading?: boolean;
  priorityCount?: number;
}) {
  const skeletonCount = 4;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="flex items-center justify-between mb-10 group">
        <div className="text-2xl font-bold tracking-tight">
          {title}
        </div>
        <div className="h-[1px] flex-1 bg-border/40 mx-8 hidden sm:block" />
        <Link href="/articles" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Explore more →
        </Link>
      </div>
      <div
        className="
          grid 
          grid-cols-1  
          md:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-4 
          gap-8 sm:gap-10
        "
      >
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <Card
                key={idx}
                className="h-full overflow-hidden flex flex-col animate-pulse pt-0 border-none bg-muted/20 rounded-2xl"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
                </div>
                <CardHeader className="flex-grow space-y-4 p-6">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Skeleton className="w-16 h-4 rounded" />
                  </div>
                  <CardTitle>
                    <Skeleton className="h-6 w-full rounded" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/4 rounded" />
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          : articles.slice(0, 8).map((article, idx) => (
            <ArticleCard key={article.id} article={article} priority={idx < priorityCount} />
          ))}
      </div>
    </section>
  );
}

