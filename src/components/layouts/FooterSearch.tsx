"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FooterSearch() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
      className={`relative flex items-center w-full max-w-md transition-all duration-500 ${
        isFocused ? "scale-[1.01]" : "scale-100"
      }`}
    >
      <label htmlFor="footer-search" className="sr-only">
        Search articles
      </label>

      {/* Icon Search */}
      <Search
        className={`absolute left-4 w-4 h-4 transition-colors duration-300 z-10 ${
          isFocused ? "text-custom-primary" : "text-neutral-500"
        }`}
        aria-hidden="true"
      />

      <Input
        id="footer-search"
        type="search"
        placeholder="Search articles..."
        className="h-12 pl-11 pr-28 rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md text-sm text-white placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-custom-primary/40 focus-visible:border-custom-primary transition-all shadow-2xl"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="absolute right-1.5 h-9 px-4 rounded-xl bg-custom-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center gap-2 group overflow-hidden cursor-pointer"
      >
        <span className="relative z-10">Search</span>
      </button>

      {isFocused && (
        <div className="absolute -inset-[1px] bg-custom-primary/20 rounded-[17px] -z-10 blur-sm transition-all animate-pulse" />
      )}
    </form>
  );
}
