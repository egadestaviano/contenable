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
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full max-w-sm"
    >
      <label htmlFor="footer-search" className="sr-only">
        Search articles
      </label>
      <Search className="absolute left-3 text-neutral-400 w-4 h-4" aria-hidden="true" />
      <Input
        id="footer-search"
        type="search"
        placeholder="Search articles..."
        className="pl-9 pr-20 h-11 text-sm border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary focus:ring-1 focus:ring-custom-primary/30 rounded-none transition-all placeholder:text-neutral-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="absolute right-1 px-3 py-1.5 bg-custom-primary text-white text-xs font-medium hover:bg-custom-primary-hover transition-colors rounded-none uppercase tracking-wide"
      >
        Search
      </button>
    </form>
  );
}
