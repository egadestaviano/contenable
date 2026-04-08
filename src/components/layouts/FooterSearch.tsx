"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      className="relative flex items-center justify-center mx-auto md:mx-0 mt-6 max-w-80"
    >
      <Search className="absolute left-3 text-gray-400 w-4 h-4" />
      <Input
        type="search"
        placeholder="Search articles..."
        className="pl-9 pr-24 bg-white/10 text-gray-100 placeholder:text-gray-300 border border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Search
      </Button>
    </form>
  );
}
