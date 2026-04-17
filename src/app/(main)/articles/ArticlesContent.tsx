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
import { Newspaper, Sparkles } from "lucide-react";

export default function ArticlesContent() {
  const dispatch = useAppDispatch();
  const { blogs, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="editorial-page relative pb-20 overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-custom-primary/5 rounded-full blur-[120px]" />

      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-sm text-neutral-500 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-custom-primary/10 text-custom-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Latest Stories</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          All <span className="italic text-custom-primary font-light">Articles</span>
        </h1>
        <p className="mt-5 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl font-light leading-relaxed">
          Explore a curated stream of ideas, commentary, and long-form stories curated for deeper reading and meaningful perspectives.
        </p>
      </header>

      {/* Error State */}
      {error && (
        <div className="p-4 mb-10 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Loading Skeleton Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="aspect-[16/10] rounded-[2rem] bg-neutral-100 dark:bg-neutral-800" />
              <div className="space-y-3 px-2">
                <div className="h-4 w-1/4 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                <div className="h-6 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                <div className="h-4 w-2/3 bg-neutral-50 dark:bg-neutral-900 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* MAIN GRID LIST */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {blogs.map((item) => (
            <div key={item.id} className="group transition-transform duration-500 hover:-translate-y-1">
              <ArticleCard article={item} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <div className="py-24 text-center bg-neutral-50/50 dark:bg-neutral-900/30 rounded-[3rem] border border-dashed border-neutral-200 dark:border-neutral-800">
          <Sparkles className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-neutral-400">No articles found yet</h2>
          <p className="text-neutral-500 mt-2">Check back soon for fresh perspectives.</p>
        </div>
      )}
    </div>
  );
}