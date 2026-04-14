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

export default function ArticleDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const dispatch = useAppDispatch();
  const { blogDetail, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    if (slug) dispatch(fetchBlogDetail(slug));
  }, [slug, dispatch]);

  if (!loading && error) return notFound();
  if (!loading && !blogDetail) return <Skeleton className="w-full h-96" />;

  const jsonLd = blogDetail ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogDetail.title,
    "image": blogDetail.featured_image || blogDetail.thumbnail,
    "author": {
      "@type": "Person",
      "name": blogDetail.author?.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Contenable",
      "logo": {
        "@type": "ImageObject",
        "url": "https://contennable.trianandafajar.com/globe.svg"
      }
    },
    "datePublished": blogDetail.published_at,
    "description": blogDetail.description,
  } : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-neutral-950">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-sm text-neutral-600 dark:text-neutral-400">
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
              <Link href="/articles" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Articles
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">
              {loading ? <Skeleton className="w-40 h-4 rounded-none" /> : blogDetail?.slug}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative w-full h-56 sm:h-72 md:h-96 mb-6 border border-custom-light dark:border-neutral-700 overflow-hidden rounded-none">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        ) : (
          <Image
            src={
              blogDetail?.featured_image ||
              blogDetail?.thumbnail ||
              "/placeholder.png"
            }
            alt={blogDetail?.title || "Article image"}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        )}
      </div>

      {loading ? (
        <Skeleton className="w-3/4 h-8 sm:h-10 mb-4 rounded-none" />
      ) : (
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium  mb-4 leading-snug">
          {blogDetail?.title}
        </h1>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-6 rounded-none" />
            ))
          : (blogDetail?.tags ?? []).map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="text-xs sm:text-sm px-3 py-1 border border-custom-light dark:border-neutral-700 text-custom-primary dark:text-custom-primary-dark-secondary hover:border-custom-primary hover:bg-custom-primary hover:text-white dark:hover:bg-custom-primary dark:hover:text-white transition-colors rounded-none"
              >
                {tag.name}
              </Link>
            ))}
      </div>

      {loading ? (
        <Skeleton className="w-1/2 h-5 mb-6 rounded-none" />
      ) : (
        <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 pb-6 border-b border-custom-light dark:border-neutral-800 flex items-center gap-4">
          <div className="flex flex-col">
            <span>
              By <span className="font-medium text-custom-primary dark:text-custom-primary-dark">{blogDetail?.author?.name}</span>
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              {blogDetail?.published_at} {blogDetail?.category?.name && `• ${blogDetail.category.name}`}
            </span>
          </div>
        </div>
      )}

      <article
        className="
          prose prose-neutral max-w-none 
          text-sm sm:text-base leading-relaxed
          prose-headings:font-serif prose-headings:text-custom-primary prose-headings:font-medium
          prose-a:text-custom-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-none prose-img:border prose-img:border-custom-light
          dark:prose-invert
        "
      >
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4 rounded-none" />
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
