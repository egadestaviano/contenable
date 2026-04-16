"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AuthSection = dynamic(() => import("./AuthSection"), { ssr: false });
const Sheet = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.Sheet),
  { ssr: false },
);
const SheetContent = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.SheetContent),
  { ssr: false },
);
const SheetTrigger = dynamic(
  () => import("@/components/ui/sheet").then((mod) => mod.SheetTrigger),
  { ssr: false },
);

export default function Header() {
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsSheetOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setMobileSearchOpen(false);
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-custom-light/70 dark:border-neutral-800 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-md">
      <div className="editorial-shell h-16 sm:h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="p-1.5 rounded-xl bg-surface-soft dark:bg-neutral-900/90 border border-custom-light/70 dark:border-neutral-700">
            <Image
              src="/globe.svg"
              alt="Contenable logo"
              width={24}
              height={24}
              className="w-6 h-6"
              priority
            />
          </span>
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-custom-primary dark:text-custom-primary-dark">
            Contenable
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-custom-primary dark:text-custom-primary-dark"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-custom-primary dark:hover:text-custom-primary-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <form onSubmit={submitSearch} className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

            <Input
              id="header-search-desktop"
              type="search"
              placeholder="Search articles..."
              className="h-10 w-64 pl-9 pr-16 rounded-lg border border-custom-light dark:border-neutral-700 bg-white/90 dark:bg-neutral-900 text-sm focus-visible:ring-2 focus-visible:ring-custom-primary/30 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 rounded-md bg-custom-primary text-white text-xs font-medium hover:bg-custom-primary-hover transition"
            >
              Search
            </button>
          </form>
          <AuthSection />

          <div className="flex items-center md:hidden">
            {mobileSearchOpen ? (
              <div className="fixed inset-x-0 top-0 z-[60] h-16 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-custom-light/70 dark:border-neutral-800 px-3 flex items-center gap-2">
                <form onSubmit={submitSearch} className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 focus-visible:ring-2 focus-visible:ring-custom-primary/30 hover:border-custom-primary/40 transition-all" />
                  <Input
                    id="header-search-mobile"
                    autoFocus
                    autoComplete="off"
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-3 h-10 rounded-xl border-custom-light dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSearchOpen(false)}
                  className="rounded-xl text-neutral-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(true)}
                className="rounded-xl text-neutral-600 dark:text-neutral-400"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-neutral-600 dark:text-neutral-400"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[290px] border-l border-custom-light/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-0"
              >
                <div className="h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-7">
                    <span className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark">
                      Contenable
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSheetOpen(false)}
                      className="rounded-xl text-neutral-500"
                    >
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
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-custom-primary text-white"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-surface-soft dark:hover:bg-neutral-900"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <form onSubmit={submitSearch} className="relative mt-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <Input
                      id="header-search-sheet"
                      type="search"
                      placeholder="Search..."
                      className="h-11 pl-9 rounded-xl border-custom-light dark:border-neutral-700"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
