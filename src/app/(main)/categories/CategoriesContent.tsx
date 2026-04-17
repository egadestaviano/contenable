"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/features/categories/categorySlice";
import { Layers, Sparkles } from "lucide-react";
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
    <div className="editorial-page relative pb-20">
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px]" />
      
      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-sm text-neutral-500">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-custom-primary/10 text-custom-primary text-[10px] font-bold uppercase tracking-widest mb-6">
          <Layers className="w-3.5 h-3.5" />
          <span>Taxonomy</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-7xl tracking-tight text-neutral-900 dark:text-neutral-100">
          Explore <span className="italic font-light text-custom-primary">Topics.</span>
        </h1>
        <p className="editorial-subheading mt-6 max-w-2xl text-lg text-neutral-500">
          Browse our collection of stories organized by interest. From deep dives to quick reads, discover what moves you.
        </p>
      </div>

      {error && (
        <div className="p-4 mb-10 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Array.from({ length: 2 }).map((_, colIdx) => (
            <div key={colIdx} className="space-y-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl mb-6" />
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <div key={j} className="h-10 w-28 bg-neutral-100 dark:bg-neutral-800 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {[leftLetters, rightLetters].map((letters, colIndex) => (
            <div key={colIndex} className="space-y-16">
              {letters.map((letter) => (
                <section key={letter} className="relative group">
                  {/* Huruf Besar Sebagai Background Watermark */}
                  <span className="absolute -top-8 -left-6 text-8xl font-serif font-bold text-neutral-100 dark:text-neutral-900/40 -z-10 select-none group-hover:text-custom-primary/10 transition-colors">
                    {letter}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100">
                      {letter}
                    </h2>
                    <div className="h-[1px] flex-1 bg-neutral-100 dark:bg-neutral-800" />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {groupedCategories[letter].map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="group/item relative flex items-center px-5 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-custom-primary hover:shadow-lg hover:shadow-custom-primary/5 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover/item:text-custom-primary">
                          {category.name}
                        </span>
                        {category.blogs_count !== undefined && (
                          <span className="ml-3 px-1.5 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-800 text-[10px] font-bold text-neutral-400 group-hover/item:bg-custom-primary/10 group-hover/item:text-custom-primary">
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
        <div className="py-20 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-[3rem] border border-dashed border-neutral-200 dark:border-neutral-800">
           <Sparkles className="w-10 h-10 text-neutral-300 mx-auto mb-4" />
           <p className="text-neutral-500 font-serif text-xl">No categories found yet.</p>
        </div>
      )}
    </div>
  );
}