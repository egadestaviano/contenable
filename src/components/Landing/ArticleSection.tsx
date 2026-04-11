"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import type { Blog } from "@/store/features/blogs/blog";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "../blogs/ArticleCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNewBlogs, fetchTopBlogs, fetchFeaturedBlogs } from "@/store/features/blogs/blogSlice";

export default function ArticleSection({
  title,
  articles,
  loading: initialLoading = false,
  priorityCount = 0,
  endpoint,
  params,
}: {
  title: ReactNode;
  articles: Blog[];
  loading?: boolean;
  priorityCount?: number;
  endpoint?: string;
  params?: string;
}) {
  const dispatch = useAppDispatch();
  const [internalArticles, setInternalArticles] = useState<Blog[]>(articles);
  const [internalLoading, setInternalLoading] = useState(false);

  // Fallback to Redux if server-side articles are empty
  const hasArticles = articles && articles.length > 0;
  const currentArticles = internalArticles.length > 0 ? internalArticles : articles;
  
  const { newBlogs, topBlogs, featuredBlogs, loading: reduxLoading } = useAppSelector(state => state.blogs);

  useEffect(() => {
    setInternalArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (!hasArticles && endpoint === 'blogs') {
      if (params?.includes('sort=newest')) {
        if (newBlogs.length === 0) dispatch(fetchNewBlogs());
        setInternalArticles(newBlogs);
      } else if (params?.includes('sort=top')) {
        if (topBlogs.length === 0) dispatch(fetchTopBlogs());
        setInternalArticles(topBlogs);
      } else if (params?.includes('sort=featured')) {
        if (featuredBlogs.length === 0) dispatch(fetchFeaturedBlogs());
        setInternalArticles(featuredBlogs);
      }
    }
  }, [hasArticles, endpoint, params, dispatch, newBlogs, topBlogs, featuredBlogs]);

  const isLoading = initialLoading || internalLoading || (!hasArticles && reduxLoading);
  const displayArticles = internalArticles.length > 0 ? internalArticles : articles;

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
        {isLoading
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
          : displayArticles.slice(0, 8).map((article, idx) => (
            <ArticleCard key={article.id} article={article} priority={idx < priorityCount} />
          ))}

        {!isLoading && displayArticles.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No articles found for this section.
          </div>
        )}
      </div>
    </section>
  );
}

