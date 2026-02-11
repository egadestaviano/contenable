"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategoryDetail,
  clearCategoryDetail,
} from "@/store/features/categories/categorySlice";
import ArticleCard from "@/components/blogs/ArticleCard";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { categoryDetail, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchCategoryDetail(slug as string));

    return () => {
      dispatch(clearCategoryDetail());
    };
  }, [slug, dispatch]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-4">
        {categoryDetail?.name || slug}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-md h-[280px]"
            />
          ))}
        </div>
      )}

      {!loading && categoryDetail && categoryDetail.blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryDetail.blogs.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {!loading && categoryDetail?.blogs?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No articles found in this category.
        </p>
      )}
    </div>
  );
}
