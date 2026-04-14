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
    <div className="max-w-7xl mx-auto py-10 px-4 bg-white dark:bg-neutral-950">

      <Breadcrumb className="mb-6">
        <BreadcrumbList className="text-sm text-neutral-600 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2]">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#5C7E8F] dark:text-[#b6c8d2]">
              Categories
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5C7E8F] dark:text-[#b6c8d2] mb-3 tracking-tight">
        Explore Categories
      </h1>
      <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-2xl">
        Discover articles by topic. Browse through our alphabetically organized collections.
      </p>

      {error && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Array.from({ length: 2 }).map((_, colIdx) => (
            <div key={colIdx} className="space-y-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-6 w-12 bg-[#D4DDE2]/50 dark:bg-neutral-800 animate-pulse mb-3 rounded-none" />
                  <div className="h-px w-full bg-[#D4DDE2] dark:bg-neutral-800 mb-4" />
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-10 w-24 bg-[#D4DDE2]/50 dark:bg-neutral-800 animate-pulse rounded-none"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="space-y-10">
            {leftLetters.map((letter) => (
              <div key={letter}>
                <h2 className="font-serif text-5xl font-medium text-[#D4DDE2] dark:text-neutral-700 -ml-1 mb-1 select-none">
                  {letter}
                </h2>
                <div className="h-px w-full bg-[#D4DDE2] dark:bg-neutral-800 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-4 py-2 border border-[#D4DDE2] dark:border-neutral-700 hover:border-[#5C7E8F] hover:bg-[#5C7E8F] hover:text-white dark:hover:bg-[#5C7E8F] dark:hover:text-white transition-colors rounded-none"
                    >
                      <span className="font-sans text-sm font-medium">{category.name}</span>
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                          {category.blogs_count}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            {rightLetters.map((letter) => (
              <div key={letter}>
                <h2 className="font-serif text-5xl font-medium text-[#D4DDE2] dark:text-neutral-700 -ml-1 mb-1 select-none">
                  {letter}
                </h2>
                <div className="h-px w-full bg-[#D4DDE2] dark:bg-neutral-800 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-4 py-2 border border-[#D4DDE2] dark:border-neutral-700 hover:border-[#5C7E8F] hover:bg-[#5C7E8F] hover:text-white dark:hover:bg-[#5C7E8F] dark:hover:text-white transition-colors rounded-none"
                    >
                      <span className="font-sans text-sm font-medium">{category.name}</span>
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
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
        <p className="font-sans text-sm text-center text-neutral-500 dark:text-neutral-400 mt-16">
          No categories found.
        </p>
      )}
    </div>
  );
}