"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCategoryDetail, fetchCategoryDetail } from "@/store/features/categories/categorySlice";
import ArticleCard from "@/components/blogs/ArticleCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CategoryDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useAppDispatch();
  const { categoryDetail, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!slug) return;
    dispatch(fetchCategoryDetail(slug));
    return () => {
      dispatch(clearCategoryDetail());
    };
  }, [slug, dispatch]);

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
            <BreadcrumbLink asChild>
              <Link href="/categories" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Categories
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize text-custom-primary dark:text-custom-primary-dark">{slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-10">
        <h1 className="editorial-heading capitalize">{categoryDetail?.name || slug}</h1>
        <p className="editorial-subheading mt-4 max-w-2xl">
          Articles and viewpoints curated under this topic.
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
            <div key={i} className="editorial-panel animate-pulse h-[320px]">
              <div className="w-full aspect-[16/10] rounded-t-2xl bg-[#D4DDE2]/55 dark:bg-neutral-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-20 rounded-full bg-[#D4DDE2]/55 dark:bg-neutral-800" />
                <div className="h-6 w-full rounded-md bg-[#D4DDE2]/55 dark:bg-neutral-800" />
              </div>
            </div>
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
        <div className="editorial-panel py-16 text-center">
          <p className="editorial-subheading">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
