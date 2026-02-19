"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-white/80 backdrop-blur-sm shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={32}
          height={32}
          className="w-4 h-4 md:w-8 md:h-8"
        />
        <span className="md:text-xl font-semibold">CONTENABLE</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex xl:gap-4 md:ml-52 relative">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-2 xl:px-3 py-2 font-medium transition-colors duration-300 
                ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                }`}
            >
              {link.label}
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300 ease-in-out origin-left
                ${isActive ? "w-full scale-x-100" : "w-0 scale-x-0"}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Desktop Search */}
        <div className="hidden sm:block">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden relative">
          {mobileSearchOpen ? (
            <form onSubmit={handleSearch} className="relative">
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="pl-9 w-36 sm:w-48"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute hover:bg-transparent hover:scale-105 right-1 top-1/2 -translate-y-1/2"
                onClick={() => setMobileSearchOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Auth Buttons - Desktop */}
        <SignedOut>
          <div className="hidden sm:flex items-center gap-2">
            <SignInButton mode="redirect">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <Button size="sm" className="bg-primary text-white">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="sm:hidden">
            <UserButton
              userProfileMode="modal"
            />
          </div>

          <div className="hidden sm:block">
            <UserButton
              userProfileMode="modal"
              appearance={{ elements: { avatarBox: "w-8 h-8" } }}
            />
          </div>
        </SignedIn>

        {/* Mobile Menu */}
        <Sheet open={isSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" onClick={handleSheetOpen}>
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="max-w-[300px]">
            <SheetHeader className="flex justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src="/globe.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <SheetTitle className="text-xl font-semibold">
                    CONTENABLE
                  </SheetTitle>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="w-6 h-6" />
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>

            <SheetDescription className="flex flex-col gap-4 text-lg px-4 mt-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-3 rounded font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <SignedOut>
                <div className="flex flex-col gap-3 mt-6">
                  <SignInButton mode="redirect">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect">
                    <Button className="w-full bg-primary text-white">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
