"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
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
    <footer className="w-full border-t bg-cyan-900 mt-12 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 md:flex md:justify-between gap-8">
        {/* Brand + Description */}
        <div className="flex flex-col md:justify-between w-full md:max-w-1/3 px-2 sm:px-10 md:px-0">
          <h2 className="text-xl font-semibold mb-2 text-white">CONTENABLE</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            consequuntur unde placeat ad doloremque harum sit numquam modi
            maiores corporis?
          </p>

          {/* Search Bar */}
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
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 text-white"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between w-full md:ml-20 px-2 sm:px-10">
          <div className="flex flex-col justify-between w-1/3  mt-10 md:mt-0">
            <h3 className="text-sm font-semibold mb-3 text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="mt-10 md:mt-0">
            <h3 className="text-sm font-semibold mb-3 text-white">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@contenable.com"
                  className="hover:text-white transition-colors"
                >
                  contact@contenable.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-500" />

      {/* Credits */}
      <div className="text-center py-6 text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-gray-200">CONTENABLE</span>. All rights
        reserved. <br /> 
      </div>
    </footer>
  );
}
