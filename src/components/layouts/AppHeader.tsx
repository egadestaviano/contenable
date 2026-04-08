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
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 transition-transform duration-300 group-hover:rotate-12">
            <Image
              src="/globe.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-7 h-7"
              priority
              fetchPriority="high"
            />
          </div>
          <span className="text-xl font-bold tracking-tight sm:block hidden">Contenable</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-colors duration-200
                  ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div className="hidden lg:block relative group">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="header-search-desktop" className="sr-only">
                Search articles
              </label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                id="header-search-desktop"
                type="search"
                placeholder="Quick search..."
                className="pl-10 w-48 bg-muted/50 border-transparent focus:bg-white dark:focus:bg-black/40 focus:w-64 transition-all duration-300 rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search articles"
              />
            </form>
          </div>

          <AuthSection />

          {/* Mobile Menu & Search */}
          <div className="flex items-center md:hidden">
            {mobileSearchOpen ? (
              <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md p-6 flex flex-col gap-8 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold tracking-tight">Search</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileSearchOpen(false)} 
                    className="rounded-full"
                    aria-label="Close search"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </Button>
                </div>
                <form onSubmit={handleSearch} className="relative group">
                  <label htmlFor="header-search-mobile" className="sr-only">
                    Search articles
                  </label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" aria-hidden="true" />
                  <Input
                    id="header-search-mobile"
                    autoFocus
                    type="search"
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-8 text-lg rounded-2xl border-none bg-muted/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search articles"
                  />
                  <button type="submit" className="mt-4 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold">
                    Search
                  </button>
                </form>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </Button>
            )}

            <Sheet open={isSheetOpen}>

              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleSheetOpen} aria-label="Open menu">
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] p-0 border-l border-border/40 glass">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-xl font-bold tracking-tight">Contenable</span>
                    <Button variant="ghost" size="icon" onClick={handleSheetOpen} aria-label="Close menu">
                      <X className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-auto py-6 border-t border-border/40">
                    <form onSubmit={handleSearch} className="relative">
                      <label htmlFor="header-search-sheet" className="sr-only">
                        Search articles
                      </label>
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="header-search-sheet"
                        type="search"
                        placeholder="Search articles..."
                        className="pl-10 rounded-xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search articles"
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

