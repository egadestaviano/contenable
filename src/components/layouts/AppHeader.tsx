"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AuthSection = dynamic(() => import("./AuthSection"), { ssr: false });
const Sheet = dynamic(() => import("@/components/ui/sheet").then(mod => mod.Sheet), { ssr: false });
const SheetContent = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetContent), { ssr: false });
const SheetTrigger = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetTrigger), { ssr: false });

export default function Header() {
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMobileSearchOpen(false);
    }
  };

  const handleSheetOpen = () => {
    setIsSheetOpen(prev => !prev)
  }

  useEffect(() => {
    setIsSheetOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-950 border-b border-custom-light dark:border-neutral-800 transition-all duration-200">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 group">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/globe.svg"
              alt="Logo"
              width={28}
              height={28}
              className="w-6 h-6"
              priority
              fetchPriority="high"
            />
          </div>
          <span className="font-serif text-lg sm:text-xl font-medium text-custom-primary dark:text-custom-primary-dark tracking-tight">
            Contenable
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "text-custom-primary dark:text-custom-primary-dark after:absolute after:-bottom-[1px] after:left-0 after:w-full after:h-px after:bg-custom-primary dark:after:bg-custom-primary-dark"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-custom-primary dark:hover:text-custom-primary-dark"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">

          <div className="hidden lg:block relative">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="header-search-desktop" className="sr-only">
                Search articles
              </label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="w-4 h-4" />
              </div>
              <Input
                id="header-search-desktop"
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 w-44 text-sm border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary focus:ring-1 focus:ring-custom-primary/30 rounded-none transition-all placeholder:text-neutral-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          <AuthSection />

          <div className="flex items-center md:hidden">
            {mobileSearchOpen ? (
              <div className="fixed inset-0 z-[60] bg-white dark:bg-neutral-950 p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-medium text-custom-primary">Search</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileSearchOpen(false)} 
                    className="text-neutral-600 hover:text-custom-primary rounded-none"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Input
                    id="header-search-mobile"
                    autoFocus
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-11 pr-4 py-6 text-base rounded-none border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary focus:ring-1 focus:ring-custom-primary/30"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="mt-4 w-full py-3 bg-custom-primary text-white text-sm font-medium rounded-none hover:bg-custom-primary-hover transition-colors">
                    Search
                  </button>
                </form>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(true)}
                className="text-neutral-600 hover:text-custom-primary dark:text-neutral-400 dark:hover:text-custom-primary-dark rounded-none"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <Sheet open={isSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleSheetOpen} className="text-neutral-600 hover:text-custom-primary dark:text-neutral-400 dark:hover:text-custom-primary-dark rounded-none">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] p-0 border-l border-custom-light dark:border-neutral-800 bg-white dark:bg-neutral-950">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-xl font-medium text-custom-primary dark:text-custom-primary-dark">Contenable</span>
                    <Button variant="ghost" size="icon" onClick={handleSheetOpen} className="text-neutral-600 hover:text-custom-primary rounded-none">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`px-4 py-3 text-sm font-medium transition-colors border-l-2 ${
                            isActive
                              ? "border-custom-primary text-custom-primary dark:text-custom-primary-dark bg-custom-light/10"
                              : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-custom-primary dark:hover:text-custom-primary-dark hover:bg-custom-light/5"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-custom-light dark:border-neutral-800">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <Input
                        id="header-search-sheet"
                        type="search"
                        placeholder="Search..."
                        className="pl-9 pr-3 py-2 text-sm rounded-none border border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:border-custom-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
