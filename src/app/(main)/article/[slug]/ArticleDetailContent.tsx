"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBlogDetail } from "@/store/features/blogs/blogSlice";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function formatPublishedDate(value?: string) {
  if (!value) return "Unknown date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

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

  const jsonLd = blogDetail
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogDetail.title,
        image: blogDetail.featured_image || blogDetail.thumbnail,
        author: {
          "@type": "Person",
          name: blogDetail.author?.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Contenable",
          logo: {
            "@type": "ImageObject",
            url: "https://contennable.trianandafajar.com/globe.svg",
          },
        },
        datePublished: blogDetail.published_at,
        description: blogDetail.description,
      }
    : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

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
              <Link href="/articles" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Articles
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">
              {loading ? <Skeleton className="w-40 h-4 rounded-md" /> : blogDetail?.slug}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-2xl border border-custom-light dark:border-neutral-700">
        {loading ? (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        ) : (
          <Image
            src={blogDetail?.featured_image || blogDetail?.thumbnail || "/placeholder.png"}
            alt={blogDetail?.title || "Article image"}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        )}
      </div>

      {loading ? (
        <Skeleton className="w-3/4 h-10 mb-4 rounded-md" />
      ) : (
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.65rem] font-normal text-neutral-900 dark:text-neutral-100 mb-4 leading-tight tracking-tight">
          {blogDetail?.title}
        </h1>
      )}

      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-20 h-7 rounded-full" />)
          : (blogDetail?.tags ?? []).map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-custom-light dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-custom-primary hover:text-custom-primary dark:hover:text-custom-primary-dark-secondary transition-colors"
              >
                {tag.name}
              </Link>
            ))}
      </div>

      {loading ? (
        <Skeleton className="w-2/3 h-5 mb-8 rounded-md" />
      ) : (
        <div className="mb-8 pb-6 border-b border-custom-light dark:border-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            By{" "}
            <span className="font-semibold text-custom-primary dark:text-custom-primary-dark">
              {blogDetail?.author?.name || "Unknown author"}
            </span>
          </p>
          <p className="mt-1">
            {formatPublishedDate(blogDetail?.published_at)}
            {blogDetail?.category?.name ? ` • ${blogDetail.category.name}` : ""}
          </p>
        </div>
      )}

      <article
        className="
          prose prose-neutral max-w-none
          prose-p:leading-8 prose-p:text-[1.04rem]
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-neutral-900
          prose-a:text-custom-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:border prose-img:border-custom-light
          dark:prose-invert dark:prose-headings:text-neutral-100
        "
      >
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-4 rounded-md" />
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
