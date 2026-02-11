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

export default function CategoriesPage() {
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
    <div className="max-w-7xl mx-auto py-4 px-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Browse all categories grouped alphabetically.
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && (
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {leftLetters.map((letter) => (
              <div key={letter}>
                <h2 className="text-xl font-bold mb-2">{letter}</h2>
                <div className="flex flex-wrap gap-4">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition"
                    >
                      {category.name}
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({category.blogs_count})
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {rightLetters.map((letter) => (
              <div key={letter}>
                <h2 className="text-xl font-bold mb-2">{letter}</h2>
                <div className="flex flex-wrap gap-4">
                  {groupedCategories[letter].map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                      className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition"
                    >
                      {category.name}
                      {category.blogs_count !== undefined && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({category.blogs_count})
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
        <p className="text-center text-gray-500 mt-6">
          No categories found.
        </p>
      )}
    </div>
  );
}
