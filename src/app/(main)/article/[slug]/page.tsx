"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogDetail } from "@/store/features/blogs/blogSlice";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ArticleDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const dispatch = useAppDispatch();
  const { blogDetail, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    if (slug) dispatch(fetchBlogDetail(slug));
  }, [slug, dispatch]);

  if (!loading && error) return notFound();
  if (!loading && !blogDetail) return <Skeleton className="w-full h-96" />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/articles">Articles</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {loading ? <Skeleton className="w-40 h-5" /> : blogDetail?.slug}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 🖼 Featured Image / Skeleton */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 mb-6 rounded-2xl overflow-hidden">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        ) : (
          <Image
            src={
              blogDetail?.featured_image ||
              blogDetail?.thumbnail ||
              "/placeholder.jpg"
            }
            alt={blogDetail?.title || "Article image"}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        )}
      </div>

      {/* 📝 Title */}
      {loading ? (
        <Skeleton className="w-3/4 h-8 sm:h-10 mb-4" />
      ) : (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug text-gray-900">
          {blogDetail?.title}
        </h1>
      )}

      {/* 🏷 Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-6 rounded-full" />
            ))
          : (blogDetail?.tags ?? []).map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
      </div>

      {/* 👤 Author & Category */}
      {loading ? (
        <Skeleton className="w-1/2 h-5 mb-6" />
      ) : (
        <div className="text-sm text-gray-500 mb-8">
          By{" "}
          <span className="font-semibold text-gray-700">
            {blogDetail?.author?.name}
          </span>{" "}
          in{" "}
          <span className="font-semibold text-gray-700">
            {blogDetail?.category?.name}
          </span>{" "}
          • {blogDetail?.published_at}
        </div>
      )}

      {/* 📜 Content */}
      <article
        className="
          prose prose-neutral dark:prose-invert 
          max-w-none 
          text-sm sm:text-base leading-relaxed
        "
      >
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4 rounded" />
            ))}
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: blogDetail?.content || blogDetail?.description || "",
            }}
          />
        )}
      </article>
    </div>
  );
}
