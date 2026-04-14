"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Search, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchTags, Tag } from "@/store/features/tags/tagSlice";

export default function Hero({ initialTags }: { initialTags?: Tag[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reduxTags = useAppSelector((state) => state.tags.tags);
  const reduxLoading = useAppSelector((state) => state.tags.loading);

  const hasInitialTags = initialTags && initialTags.length > 0;
  const tags = hasInitialTags ? initialTags : reduxTags;
  const loading = !hasInitialTags && reduxLoading;

  useEffect(() => {
    if (!hasInitialTags && reduxTags.length === 0) {
      dispatch(fetchTags());
    }
  }, [hasInitialTags, reduxTags.length, dispatch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-white dark:bg-neutral-950">

      <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-custom-primary border border-custom-primary/30 bg-custom-light/20 dark:bg-custom-light/5 dark:border-custom-primary/40 dark:text-custom-primary-dark mb-6">
        <Sparkles className="w-3 h-3" />
        Featured Articles
      </div>

      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-normal text-custom-primary dark:text-custom-primary-dark tracking-tight leading-[1.1] max-w-4xl">
        Contenable<span className="text-custom-primary">.</span>
      </h1>

      <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-4 mb-10 max-w-xl leading-relaxed">
        A simple platform to find and read articles from various authors.
        No noise, just perspectives that matter.
      </p>

      <div className="relative w-full max-w-xl mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-custom-primary/60 dark:text-custom-primary-dark-secondary">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full pl-12 pr-12 sm:pr-28 py-4 text-base border rounded-none border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary focus:ring-1 focus:ring-custom-primary/30 transition-all placeholder:text-neutral-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-20 sm:right-28 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-custom-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-custom-primary text-white text-sm font-medium hover:bg-custom-primary-hover transition-colors hidden sm:block"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        <span className="text-xs font-medium text-custom-primary dark:text-custom-primary-dark-secondary mr-1">
          Popular:
        </span>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="w-16 h-7 bg-neutral-100 dark:bg-neutral-800 border border-custom-light animate-pulse"
              />
            ))
          : tags.slice(0, 5).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="px-3 py-1 text-xs border border-custom-light dark:border-neutral-700 hover:border-custom-primary hover:bg-custom-primary/10 hover:text-custom-primary dark:hover:bg-custom-primary/20 dark:hover:text-custom-primary-dark-secondary transition-colors"
              >
                {tag.name}
              </Link>
            ))}
      </div>
    </section>
  );
}