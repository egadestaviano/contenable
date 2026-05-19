"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { ReactNode, useEffect, useState } from "react";
import type { Blog } from "@/store/features/blogs/blog";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "../blogs/ArticleCard";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchFeaturedBlogs,
  fetchNewBlogs,
  fetchTopBlogs,
} from "@/store/features/blogs/blogSlice";
import { ArrowRight } from "lucide-react";

export default function ArticleSection({
  title,
  articles = [],
  loading: initialLoading = false,
  priorityCount = 0,
  endpoint,
  params,
}: {
  title: ReactNode;
  articles?: Blog[];
  loading?: boolean;
  priorityCount?: number;
  endpoint?: string;
  params?: string;
}) {
  const dispatch = useAppDispatch();
  const [internalArticles, setInternalArticles] = useState<Blog[]>(articles);
  const hasArticles = articles && articles.length > 0;

  const {
    newBlogs,
    topBlogs,
    featuredBlogs,
    loading: reduxLoading,
  } = useAppSelector((state) => state.blogs);

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
  }, [
    hasArticles,
    endpoint,
    params,
    dispatch,
    newBlogs,
    topBlogs,
    featuredBlogs,
  ]);

  const isLoading = initialLoading || (!hasArticles && reduxLoading);
  const displayArticles =
    internalArticles.length > 0 ? internalArticles : articles;

  const skeletonCount = 8;

  return (
    <section className="editorial-shell mb-14 sm:mb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-tight text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <div className="h-1 w-16 bg-custom-primary rounded-full" />
        </div>

        <Link
          href="/articles"
          className="group flex items-center gap-2 justify-center items-center text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-custom-primary transition-colors"
        >
          Browse all
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <Card
                key={idx}
                className="h-full overflow-hidden flex flex-col pt-0 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-none"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    <Skeleton className="h-5 w-12 rounded-md bg-white/80" />
                    <Skeleton className="h-5 w-12 rounded-md bg-white/80" />
                    <Skeleton className="h-5 w-8 rounded-md bg-white/80" />
                  </div>
                </div>

                <CardHeader className="p-4 pt-3 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-16" />
                    <span className="text-neutral-300">–</span>
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full " />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5 mt-1.5" />
                </CardHeader>
              </Card>
            ))
          : displayArticles
              .slice(0, 8)
              .map((article, idx) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  priority={idx < priorityCount}
                />
              ))}

        {!isLoading && displayArticles.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-3xl">
            <p className="text-neutral-500 font-medium">
              No stories found in this section.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
