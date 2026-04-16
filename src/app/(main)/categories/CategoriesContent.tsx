"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/features/categories/categorySlice";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CategoriesContent() {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const groupedCategories = categories.reduce<Record<string, typeof categories>>((acc, category) => {
    const firstLetter = category.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(category);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedCategories).sort();
  const midIndex = Math.ceil(sortedLetters.length / 2);
  const leftLetters = sortedLetters.slice(0, midIndex);
  const rightLetters = sortedLetters.slice(midIndex);

  return (
    <div className="editorial-page">
      <Breadcrumb className="mb-7">
        <BreadcrumbList className="text-sm text-neutral-500 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-10">
        <h1 className="editorial-heading">Explore Categories</h1>
        <p className="editorial-subheading mt-4 max-w-2xl">
          Browse by topic and jump into collections of related stories curated for deeper reading.
        </p>
      </div>

      {error && (
        <div className="editorial-panel px-4 py-3 mb-6 border-red-200 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/70">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {Array.from({ length: 2 }).map((_, colIdx) => (
            <div key={colIdx} className="space-y-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="editorial-panel p-6 animate-pulse">
                  <div className="h-7 w-10 bg-[#D4DDE2]/50 dark:bg-neutral-800 rounded-md mb-4" />
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 4 }).map((__, j) => (
                      <div key={j} className="h-9 w-24 bg-[#D4DDE2]/50 dark:bg-neutral-800 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {[leftLetters, rightLetters].map((letters, colIndex) => (
            <div key={colIndex} className="space-y-8">
              {letters.map((letter) => (
                <section key={letter} className="editorial-panel p-6">
                  <h2 className="font-serif text-4xl font-normal text-custom-primary/80 dark:text-custom-primary-dark mb-4">
                    {letter}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {groupedCategories[letter].map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-custom-light dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-custom-primary hover:text-custom-primary dark:hover:text-custom-primary-dark-secondary transition-colors"
                      >
                        {category.name}
                        {category.blogs_count !== undefined && (
                          <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                            {category.blogs_count}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <div className="editorial-panel py-16 text-center mt-8">
          <p className="editorial-subheading">No categories found.</p>
        </div>
      )}
    </div>
  );
}
