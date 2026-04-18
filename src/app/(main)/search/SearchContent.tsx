"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSerachBlogs } from "@/store/features/blogs/blogSlice";
import ArticleCard from "@/components/blogs/ArticleCard";

export default function SearchContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const { searchBlogs, loading, error } = useAppSelector((state) => state.blogs);

  // Sync state with URL
  useEffect(() => {
    const currentParam = searchParams.get("query") || "";
    setQuery(currentParam);
  }, [searchParams]);

  // Fetch data when URL param changes
  useEffect(() => {
    const currentParam = searchParams.get("query") || "";
    if (currentParam.trim()) {
      dispatch(fetchSerachBlogs({
        q: currentParam,
        per_page: 12,
        page: 1
      }));
    }
  }, [searchParams, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col items-center mb-16 gap-4">
        <h1 className="text-4xl sm:text-6xl font-serif font-normal text-custom-primary dark:text-custom-primary-dark tracking-tight leading-tight">
          Search Articles
        </h1>
        <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-lg leading-relaxed text-center">
          Find perspectives, insights, and stories that spark your interest.
        </p>
      </div>

      <div className="relative w-full max-w-xl mx-auto mb-16">
        <form onSubmit={handleSubmit} className="relative">
          <label htmlFor="search-page-input" className="sr-only">
            Search articles
          </label>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-custom-primary/60 dark:text-custom-primary-dark-secondary">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="search-page-input"
            type="search"
            placeholder="Search articles..."
            className="w-full pl-12 pr-12 sm:pr-28 py-4 text-base border rounded-none border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary focus:ring-1 focus:ring-custom-primary/30 transition-all placeholder:text-neutral-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-20 sm:right-28 top-1/2 -translate-y-1/2 p-2 text-neutral-400 hover:text-custom-primary"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 hover:cursor-pointer bg-custom-primary text-white text-sm font-medium hover:bg-custom-primary-hover transition-colors hidden sm:block"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>
      </div>


      {error && (
        <div className="max-w-md mx-auto p-4 bg-destructive/5 text-destructive border border-destructive/20 rounded-xl text-center mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col gap-4">
              <div className="aspect-[16/10] bg-muted rounded-2xl" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {searchBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchBlogs.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">No results found</h3>
              <p className="text-muted-foreground max-w-xs">
                We couldn&apos;t find any articles for &quot;{searchParams.get("query")}&quot;. Try different keywords.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
