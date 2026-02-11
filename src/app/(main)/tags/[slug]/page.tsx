"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTagDetail, clearTagDetail } from "@/store/features/tags/tagSlice";

import ArticleCard from "@/components/blogs/ArticleCard";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function TagPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { tagDetail, loading, error } = useAppSelector((state) => state.tags);

  useEffect(() => {
    if (!slug) return;

    dispatch(fetchTagDetail(slug as string));

    return () => {
      dispatch(clearTagDetail());
    };
  }, [slug, dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tags">Tags</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {slug}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-4">
        Tag:{" "}
        <span className="capitalize text-primary">{tagDetail?.name || slug}</span>
      </h1>

      {error && (
        <p className="text-red-500 text-sm mb-4">Failed to load tag data.</p>
      )}

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

      {/* Blogs List */}
      {!loading && tagDetail && tagDetail.blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tagDetail.blogs.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      )}

      {/* No Article */}
      {!loading && tagDetail?.blogs?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No articles found for this tag.
        </p>
      )}
    </div>
  );
}
