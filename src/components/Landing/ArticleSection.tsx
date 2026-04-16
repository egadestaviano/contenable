"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import type { Blog } from "@/store/features/blogs/blog";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "../blogs/ArticleCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFeaturedBlogs, fetchNewBlogs, fetchTopBlogs } from "@/store/features/blogs/blogSlice";

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
  const hasArticles = articles && articles.length > 0;

  const { newBlogs, topBlogs, featuredBlogs, loading: reduxLoading } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    setInternalArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (!hasArticles && endpoint === "blogs") {
      if (params?.includes("sort=newest")) {
        if (newBlogs.length === 0) dispatch(fetchNewBlogs());
        setInternalArticles(newBlogs);
      } else if (params?.includes("sort=top")) {
        if (topBlogs.length === 0) dispatch(fetchTopBlogs());
        setInternalArticles(topBlogs);
      } else if (params?.includes("sort=featured")) {
        if (featuredBlogs.length === 0) dispatch(fetchFeaturedBlogs());
        setInternalArticles(featuredBlogs);
      }
    }
  }, [hasArticles, endpoint, params, dispatch, newBlogs, topBlogs, featuredBlogs]);

  const isLoading = initialLoading || (!hasArticles && reduxLoading);
  const displayArticles = internalArticles.length > 0 ? internalArticles : articles;
  const skeletonCount = 4;

  return (
    <section className="editorial-shell my-14 sm:my-16">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <div className="font-serif text-2xl sm:text-3xl lg:text-[2.05rem] tracking-tight text-custom-primary dark:text-custom-primary-dark">
            {title}
          </div>
          <div className="h-px w-20 mt-3 bg-custom-light dark:bg-neutral-700" />
        </div>
        <Link
          href="/articles"
          className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-custom-primary dark:hover:text-custom-primary-dark transition-colors"
        >
          Browse all articles {"->"}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <Card
                key={idx}
                className="h-full overflow-hidden flex flex-col pt-0 rounded-2xl border border-custom-light/80 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                </div>
                <CardHeader className="flex-grow space-y-3 p-5">
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="w-16 h-5 rounded-full bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                  </div>
                  <CardTitle>
                    <Skeleton className="h-6 w-full rounded-md bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/4 rounded-md bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          : displayArticles.slice(0, 8).map((article, idx) => (
              <ArticleCard key={article.id} article={article} priority={idx < priorityCount} />
            ))}

        {!isLoading && displayArticles.length === 0 && (
          <div className="col-span-full editorial-panel py-14 text-center">
            <p className="editorial-subheading">No stories available in this section yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
