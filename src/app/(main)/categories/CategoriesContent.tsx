"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/features/categories/categorySlice";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function CategoriesContent() {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const groupedCategories = categories.reduce<Record<string, typeof categories>>(
    (acc, category) => {
      const firstLetter = category.name[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(category);
      return acc;
    },
    {}
  );

  const sortedLetters = Object.keys(groupedCategories).sort();
  const midIndex = Math.ceil(sortedLetters.length / 2);
  const leftLetters = sortedLetters.slice(0, midIndex);
  const rightLetters = sortedLetters.slice(midIndex);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Explore Categories</h1>
      <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
        Discover articles by topic. Browse through our alphabetically organized collections.
      </p>

      {error && <p className="text-destructive mb-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-muted animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {leftLetters.map((letter) => (
              <div key={letter} className="relative">
                <h2 className="text-4xl font-bold text-primary/10 absolute -left-4 -top-6 -z-10 select-none">
                  {letter}
                </h2>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">{letter}</h3>
                <div className="flex flex-wrap gap-3">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-4 py-2 bg-white dark:bg-black/20 border border-border hover:border-primary hover:text-primary rounded-xl transition-all shadow-sm"
                    >
                      <span className="font-medium">{category.name}</span>
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {category.blogs_count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {rightLetters.map((letter) => (
              <div key={letter} className="relative">
                <h2 className="text-4xl font-bold text-primary/10 absolute -left-4 -top-6 -z-10 select-none">
                  {letter}
                </h2>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">{letter}</h3>
                <div className="flex flex-wrap gap-3">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-4 py-2 bg-white dark:bg-black/20 border border-border hover:border-primary hover:text-primary rounded-xl transition-all shadow-sm"
                    >
                      <span className="font-medium">{category.name}</span>
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {category.blogs_count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && categories.length === 0 && (
        <p className="text-center text-muted-foreground mt-20">
          No categories found.
        </p>
      )}
    </div>
  );
}
