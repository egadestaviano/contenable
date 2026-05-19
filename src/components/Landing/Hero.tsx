"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTags, Tag } from "@/store/features/tags/tagSlice";

export default function Hero({ initialTags }: { initialTags?: Tag[] }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reduxTags = useAppSelector((state) => state.tags.tags);
  const reduxLoading = useAppSelector((state) => state.tags.loading);

  const hasInitialTags = Boolean(initialTags && initialTags.length > 0);
  const tags: Tag[] = hasInitialTags ? (initialTags ?? []) : reduxTags;
  const loading = !hasInitialTags && reduxLoading;

  useEffect(() => {
    if (!hasInitialTags && reduxTags.length === 0) {
      dispatch(fetchTags());
    }
  }, [hasInitialTags, reduxTags.length, dispatch]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(92,126,143,0.12),_transparent_58%)] dark:bg-[radial-gradient(circle_at_top,_rgba(143,174,194,0.15),_transparent_60%)]">
      {/* Background Blur Circles */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-custom-primary/20 rounded-full blur-[120px]" />

      <div className="absolute top-1/3 -right-32 w-[360px] h-[360px] bg-indigo-400/20 rounded-full blur-[110px]" />

      <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-[480px] h-[300px] bg-sky-300/20 rounded-full blur-[130px]" />

      <div className="relative z-10 editorial-shell pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-custom-light dark:border-neutral-700 bg-white/85 dark:bg-neutral-900/70 text-[11px] tracking-[0.16em] uppercase font-semibold text-custom-primary dark:text-custom-primary-dark-secondary mb-7">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Reading
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-neutral-900 dark:text-white">
          Discover articles that
          <br className="hidden sm:block" />
          <span className="text-transparent italic font-light text-custom-primary">
            move your thinking forward.
          </span>
        </h1>
        {/* Subheading */}
        <p className="editorial-subheading max-w-2xl mx-auto mt-5">
          Contenable brings focused stories from trusted voices, curated for
          people who value signal over noise.
        </p>
 
        {/* Search */}
        <div className="relative w-full max-w-2xl mx-auto mt-10">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
 
            <input
              type="search"
              placeholder="Search articles, topics, or tags..."
              className="w-full h-14 sm:h-16 pl-14 pr-24 sm:pr-40 rounded-2xl border border-custom-light dark:border-neutral-700 bg-white/90 dark:bg-neutral-900 text-sm sm:text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-custom-primary/25"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-28 sm:right-40 top-1/2 -translate-y-1/2 p-1.5 cursor-pointer text-neutral-400 hover:text-custom-primary"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 sm:h-12 px-5 sm:px-6 cursor-pointer rounded-xl bg-custom-primary text-white text-sm font-semibold hover:bg-custom-primary-hover dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 items-center">
          <span className="text-xs uppercase tracking-[0.14em] font-semibold text-neutral-500 dark:text-neutral-400">
            Popular tags
          </span>

          <div className="flex flex-wrap gap-3 justify-center">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 h-8 w-20 rounded-full bg-neutral-200/70 dark:bg-neutral-800 animate-pulse"
                  />
                ))
              : tags.slice(0, 6).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tags/${tag.slug}`}
                    className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-custom-light dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-custom-primary hover:text-custom-primary dark:hover:text-custom-primary-dark-secondary transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
