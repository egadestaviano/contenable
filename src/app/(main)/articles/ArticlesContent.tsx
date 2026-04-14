"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { fetchBlogs } from "@/store/features/blogs/blogSlice";
import ArticleCard from "@/components/blogs/ArticleCard";
import Link from "next/link";

export default function ArticlesContent() {
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 bg-white dark:bg-neutral-950">

      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-sm text-neutral-600 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2]">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#5C7E8F] dark:text-[#b6c8d2]">
              Articles
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5C7E8F] dark:text-[#b6c8d2] mb-3 tracking-tight">
        All Articles
      </h1>

      <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
        Discover all the latest articles curated for you.
      </p>

      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border border-[#D4DDE2] dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-none h-[320px]"
            >
              <div className="w-full aspect-[16/10] bg-[#D4DDE2]/50 dark:bg-neutral-800" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-16 bg-[#D4DDE2]/50 dark:bg-neutral-800 rounded-none" />
                <div className="h-5 w-full bg-[#D4DDE2]/50 dark:bg-neutral-800 rounded-none" />
                <div className="h-4 w-3/4 bg-[#D4DDE2]/50 dark:bg-neutral-800 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="py-16 text-center border border-[#D4DDE2] dark:border-neutral-800 rounded-none">
          <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400">
            No articles found.
          </p>
        </div>
      )}
    </div>
  );
}