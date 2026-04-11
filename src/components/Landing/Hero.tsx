"use client";

import { Input } from "@/components/ui/input";
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
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--color-primary)_0%,transparent_60%)] opacity-[0.08]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,var(--color-primary)_0%,transparent_60%)] opacity-[0.05]" />
      <div className="absolute inset-0 -z-10 bg-[grid-black/[0.03] dark:bg-grid-white/[0.03]]" />

      {/* Title */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-8">
        <Sparkles className="w-3 h-3" aria-hidden="true" />
        Featured Articles
      </div>

      <h1 className="text-6xl sm:text-8xl lg:text-9xl font-normal font-serif mb-6 tracking-tight text-balance leading-[0.85]">
        Contenable<span className="text-primary">.</span>
      </h1>


      {/* Slogan */}
      <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl text-balance leading-relaxed">
        Contenable is a simple platform to find and read articles from various authors. 
        No noise, just perspectives that matter to you.
      </p>


      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mb-10 group">
        <form onSubmit={handleSearch} className="relative">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <Input
            id="article-search"
            type="search"
            placeholder="What are you looking for today?"
            aria-label="Search articles"
            className="w-full pl-14 pr-16 sm:pr-32 py-8 text-lg rounded-2xl border-none bg-white dark:bg-black/20 subtle-shadow ring-1 ring-border focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-16 sm:right-32 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity hidden sm:block"
          >
            Search
          </button>


        </form>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground mr-2">Popular:</span>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="w-20 h-8 rounded-full bg-muted animate-pulse"
              />
            ))
          : tags.slice(0, 5).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="px-4 py-2 bg-white dark:bg-black/10 border border-border hover:border-primary hover:text-primary rounded-full text-sm font-medium transition-all"
              >
                {tag.name}
              </Link>
            ))}
      </div>
    </section>
  );
}

