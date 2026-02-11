"use client";

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

export default function ArticleSection({
  title,
  articles,
  loading = false,
}: {
  title: ReactNode;
  articles: Blog[];
  loading?: boolean;
}) {
  const skeletonCount = 4;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="mb-6">{title}</div>
      <div
        className="
          grid 
          grid-cols-1  
          md:grid-cols-2 
          xl:grid-cols-4 
          gap-6
        "
      >
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <Card
                key={idx}
                className="h-full overflow-hidden flex flex-col animate-pulse pt-0"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                <CardHeader className="flex-grow space-y-2 p-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <Skeleton key={i} className="w-16 h-4 rounded" />
                    ))}
                  </div>
                  <CardTitle>
                    <Skeleton className="h-5 w-full rounded" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-full rounded" />
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          : articles.slice(0, 8).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
    </section>
  );
}
