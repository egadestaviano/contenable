"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSerachBlogs } from "@/store/features/blogs/blogSlice";
import ArticleCard from "@/components/blogs/ArticleCard";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const { searchBlogs, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      dispatch(fetchSerachBlogs(
        {
          q: debouncedQuery,
          per_page: 12,
          page: 1
        }
      ));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    if (debouncedQuery !== currentQuery) {
      const newUrl = debouncedQuery
        ? `/search?query=${encodeURIComponent(debouncedQuery)}`
        : "/search";
      router.replace(newUrl);
    }
  }, [debouncedQuery, searchParams, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="w-full max-w-7xl min-h-[80vh] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900">
        Search Articles
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-3 max-w-xl mx-auto w-full"
      >
        <Search className="absolute left-3 text-gray-400 w-4 h-4" />
        <Input
          type="search"
          name="query"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-24 bg-white/10 text-gray-900 placeholder:text-gray-400 border border-gray-300 focus-visible:ring-2 focus-visible:ring-primary/40"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white px-4"
        >
          Search
        </Button>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-md h-[280px]"
            />
          ))}
        </div>
      )}

      {!debouncedQuery && !loading && (
        <p className="text-gray-500 text-center mt-6">
          Enter a keyword above to start searching.
        </p>
      )}

      {/* Hasil */}
      {!loading && debouncedQuery && (
        <>
          {searchBlogs.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchBlogs.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No results found for{" "}
              <span className="font-semibold">{debouncedQuery}</span>.
            </p>
          )}
        </>
      )}
    </div>
  );
}
