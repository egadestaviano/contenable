"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FooterSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <label htmlFor="footer-search" className="sr-only">
        Search articles
      </label>
      <Search className="absolute left-4 text-neutral-400 w-4 h-4" aria-hidden="true" />
      <Input
        id="footer-search"
        type="search"
        placeholder="Search articles..."
        className="h-12 pl-11 pr-24 rounded-xl border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm placeholder:text-neutral-400 focus-visible:ring-custom-primary/30"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="absolute right-1.5 h-9 px-3.5 rounded-lg bg-custom-primary text-white text-xs font-semibold tracking-wide hover:bg-custom-primary-hover transition-colors"
      >
        Search
      </button>
    </form>
  );
}
