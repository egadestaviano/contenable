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
      <Search className="absolute left-4 text-muted-foreground w-4 h-4" aria-hidden="true" />
      <Input
        id="footer-search"
        type="search"
        placeholder="Search articles..."
        className="pl-11 pr-24 h-12 bg-muted/30 border-none focus:bg-white dark:focus:bg-black/40 transition-all rounded-xl shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="absolute right-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest"
      >
        Search
      </button>
    </form>

  );
}

