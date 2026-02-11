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

export default function ArticlesPage() {
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
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mt-6 mb-4">Articles</h1>
      <p className="text-gray-600 leading-relaxed mb-6">
        Discover all the latest articles curated for you.
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-md h-[280px]"
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
        <p className="text-center text-gray-500 mt-6">No articles found.</p>
      )}
    </div>
  );
}
