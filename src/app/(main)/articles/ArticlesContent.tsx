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
    <div className="max-w-7xl mx-auto py-4 px-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mt-6 mb-4">Latest Articles</h1>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Discover all the latest articles curated for you.
      </p>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {loading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-muted rounded-2xl h-[280px]"
            />
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
        <p className="text-center text-muted-foreground mt-6">No articles found.</p>
      )}
    </div>
  );
}
