"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTagDetail, clearTagDetail } from "@/store/features/tags/tagSlice";
import ArticleCard from "@/components/blogs/ArticleCard";
import { Tag, Sparkles } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TagContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useAppDispatch();
  const { tagDetail, loading, error } = useAppSelector((state) => state.tags);

  useEffect(() => {
    if (!slug) return;
    dispatch(fetchTagDetail(slug));
    return () => {
      dispatch(clearTagDetail());
    };
  }, [slug, dispatch]);

  return (
    <div className="editorial-page relative pb-20 overflow-hidden">
      {/* Soft Background Glow - Konsisten dengan Articles */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-custom-primary/5 rounded-full blur-[120px]" />

      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-sm text-neutral-500 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary transition-colors">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tags" className="hover:text-custom-primary transition-colors">Tags</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize font-medium text-custom-primary">
              {tagDetail?.name || slug.replace(/-/g, ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section - Identik dengan Style Article */}
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-custom-primary/10 text-custom-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <Tag className="w-3.5 h-3.5" />
          <span>Filtered by Tag</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight capitalize">
          #{tagDetail?.name || slug.replace(/-/g, ' ')} <span className="italic text-custom-primary font-light">Archive.</span>
        </h1>
        <p className="mt-5 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl font-light leading-relaxed">
          Discover all stories and curated perspectives specifically marked with the <span className="text-neutral-900 dark:text-neutral-200 font-medium">#{tagDetail?.name || slug}</span> tag.
        </p>
      </header>

      {/* Error State */}
      {error && (
        <div className="p-4 mb-10 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm">
          Failed to load tag data. Please try again later.
        </div>
      )}

      {/* Grid Content */}
      {loading ? (
        /* Loading Skeleton Grid - Samakan dengan Articles */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {Array.from({ length: 4 }).map((_, i) => (
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
          {tagDetail?.blogs && tagDetail.blogs.length > 0 ? (
            tagDetail.blogs.map((item) => (
              <div key={item.id} className="group transition-transform duration-500 hover:-translate-y-1">
                <ArticleCard article={item} />
              </div>
            ))
          ) : (
            /* Empty State - Menggunakan Desain Box Dashed Articles */
            <div className="col-span-full py-24 text-center bg-neutral-50/50 dark:bg-neutral-900/30 rounded-[3rem] border border-dashed border-neutral-200 dark:border-neutral-800">
              <Sparkles className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-neutral-400">No articles found</h2>
              <p className="text-neutral-500 mt-2 font-light">There are currently no stories linked to this specific tag.</p>
              <Link href="/articles" className="inline-block mt-8 text-xs font-bold text-custom-primary hover:underline uppercase tracking-[0.2em]">
                Explore all articles
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}