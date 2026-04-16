"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
    <div className="editorial-page">
      <Breadcrumb className="mb-7">
        <BreadcrumbList className="text-sm text-neutral-500 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-10">
        <h1 className="editorial-heading">All Articles</h1>
        <p className="editorial-subheading max-w-2xl mt-4">
          Explore a curated stream of ideas, commentary, and long-form stories from across topics.
        </p>
      </div>

      {error && (
        <div className="editorial-panel px-4 py-3 mb-6 border-red-200 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/70">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="editorial-panel h-[320px] animate-pulse">
              <div className="w-full aspect-[16/10] rounded-t-2xl bg-[#D4DDE2]/50 dark:bg-neutral-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-20 rounded-full bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                <div className="h-6 w-full rounded-md bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                <div className="h-4 w-3/4 rounded-md bg-[#D4DDE2]/55 dark:bg-neutral-800" />
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
        <div className="editorial-panel py-16 text-center">
          <p className="editorial-subheading">No articles found yet.</p>
        </div>
      )}
    </div>
  );
}
