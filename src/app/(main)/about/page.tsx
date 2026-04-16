import { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Contenable and our mission to curate thoughtful and trusted stories.",
};

export default function AboutPage() {
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
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="editorial-panel p-7 sm:p-10 mb-8 bg-[linear-gradient(145deg,rgba(92,126,143,0.11),rgba(255,255,255,0.9))] dark:bg-[linear-gradient(145deg,rgba(22,28,35,0.92),rgba(16,22,30,0.88))]">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 dark:text-neutral-400 mb-4">
          About Contenable
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight tracking-tight text-custom-primary dark:text-custom-primary-dark">
          We design a calmer way to discover great writing.
        </h1>
        <p className="editorial-subheading max-w-3xl mt-5">
          Contenable helps readers explore meaningful perspectives without endless clutter. Our goal is to make
          thoughtful content easier to find, easier to trust, and easier to enjoy.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            title: "Mission",
            text: "Promote quality over quantity by highlighting informative and human-centered articles.",
          },
          {
            title: "Approach",
            text: "Keep the experience clean and fast, so the focus stays on ideas and not distractions.",
          },
          {
            title: "Promise",
            text: "Respect your attention with curated discovery, clear structure, and consistent reading quality.",
          },
        ].map((item) => (
          <article key={item.title} className="editorial-panel p-6">
            <h2 className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark mb-2">{item.title}</h2>
            <p className="editorial-subheading">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="editorial-panel p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark">Build with us</h2>
          <p className="editorial-subheading mt-2">
            Have feedback, ideas, or collaboration opportunities? We would love to hear from you.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-custom-primary text-white text-sm font-semibold hover:bg-custom-primary-hover transition-colors"
        >
          Contact team
        </Link>
      </section>
    </div>
  );
}
