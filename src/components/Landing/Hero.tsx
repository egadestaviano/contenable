"use client";

import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store/hooks";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { tags, loading } = useAppSelector((state) => state.tags);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
        CONTENABLE
      </h1>

      {/* Slogan */}
      <p className="text-base sm:text-lg lg:text-2xl text-gray-600 mb-8 max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        Discover ideas, insights, and inspiration all in one connected space.
        Contenable brings you closer to the content that moves the world.
      </p>

      {/* Search Bar */}
      <div className="relative w-full max-w-md sm:max-w-xl mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          <Input
            type="search"
            placeholder="Search artikel..."
            className="pl-12 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-lg shadow-md border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="px-10 py-3 rounded-full bg-gray-200 animate-pulse"
              />
            ))
          : tags.slice(0, 6).map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm sm:text-base font-medium transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
      </div>
    </section>
  );
}
