import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Contenable and our mission to curate insightful content.",
};

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white dark:bg-neutral-950">

      <Breadcrumb className="mb-8">
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
              About
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5C7E8F] dark:text-[#b6c8d2] mb-4 tracking-tight">
        About Contenable
      </h1>

      <div className="h-px w-16 bg-[#D4DDE2] dark:bg-neutral-700 mb-6" />

      <div className="font-sans text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-4">
        <p>
          Contenable is a simple platform dedicated to connecting readers with thoughtful articles 
          from diverse voices. We believe in quality over quantity—no noise, just perspectives 
          that matter.
        </p>
        <p>
          Our mission is to create a clean, distraction-free environment where you can discover 
          stories that inspire, inform, and resonate. Whether you&apos;re exploring the latest 
          trends or diving deep into timeless topics, Contenable is here to guide your curiosity.
        </p>
        <p>
          Thank you for being part of our journey.
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-[#D4DDE2] dark:border-neutral-800">
        <p className="font-sans text-xs text-neutral-500 dark:text-neutral-500">
          Have questions? 
        </p>
      </div>
    </div>
  );
}