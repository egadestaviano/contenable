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
      <div className="editorial-shell h-16 sm:h-[72px] flex items-center justify-between relative">
        {/* KIRI: Logo */}
        <div className="flex-shrink-0 relative z-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative w-11 h-11 p-1.5 rounded-xl bg-surface-soft dark:bg-neutral-900/90 flex items-center justify-center">
              <Image
                src="/favicon.png"
                alt="Contenable logo"
                fill
                className="object-contain" // Memastikan gambar tidak terpotong (stretch)
                priority
              />
            </span>
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-custom-primary dark:text-custom-primary-dark hover:text-custom-primary-hover transition-colors">
              Contenable
            </span>
          </Link>
        </div>

        {/* TENGAH: Navigasi (Desktop) */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 z-10">
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

        {/* KANAN: Search & Auth */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 relative z-20">
          <form onSubmit={submitSearch} className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              id="header-search-desktop"
              type="search"
              placeholder="Search..."
              className="h-9 w-40 xl:w-60 pl-9 pr-4 rounded-lg border border-custom-light dark:border-neutral-700 bg-white/90 dark:bg-neutral-900 text-sm focus-visible:ring-2 focus-visible:ring-custom-primary/30 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <AuthSection />

          {/* Mobile Buttons */}
          <div className="flex items-center lg:hidden">
            {mobileSearchOpen ? (
              <div className="fixed inset-x-0 top-0 z-[60] h-16 bg-white dark:bg-neutral-950 border-b border-custom-light/70 dark:border-neutral-800 px-4 flex items-center gap-2">
                <form onSubmit={submitSearch} className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    id="header-search-mobile"
                    autoFocus
                    autoComplete="off"
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-9 h-10 rounded-xl border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSearchOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(true)}
                className="rounded-xl"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[290px] border-l dark:border-neutral-800 p-0"
              >
                <div className="h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark">
                      Contenable
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          pathname === link.href
                            ? "bg-custom-primary text-white"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        }`}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
