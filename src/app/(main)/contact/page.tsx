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
  title: "Contact",
  description: "Get in touch with the Contenable team for questions, feedback, and collaboration.",
};

export default function ContactPage() {
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
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">Contact</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="editorial-panel p-7 sm:p-10 mb-8 bg-[linear-gradient(145deg,rgba(92,126,143,0.11),rgba(255,255,255,0.9))] dark:bg-[linear-gradient(145deg,rgba(22,28,35,0.92),rgba(16,22,30,0.88))]">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-neutral-500 dark:text-neutral-400 mb-4">
          Contact
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl leading-tight tracking-tight text-custom-primary dark:text-custom-primary-dark">
          Let&apos;s start a conversation.
        </h1>
        <p className="editorial-subheading mt-5 max-w-3xl">
          We welcome product feedback, editorial collaboration ideas, and general questions about Contenable.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 mb-8">
        <article className="editorial-panel p-7">
          <h2 className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark mb-4">
            Contact channels
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <p className="editorial-subheading">
              Email:
              <a href="mailto:hello@contenable.com" className="ml-2 font-semibold text-custom-primary dark:text-custom-primary-dark">
                hello@contenable.com
              </a>
            </p>
            <p className="editorial-subheading">
              Partnerships:
              <a href="mailto:partnerships@contenable.com" className="ml-2 font-semibold text-custom-primary dark:text-custom-primary-dark">
                partnerships@contenable.com
              </a>
            </p>
            <p className="editorial-subheading">Response window: usually within 1-2 business days.</p>
          </div>
        </article>

        <article className="editorial-panel p-7">
          <h2 className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark mb-4">Quick FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                Can I submit article suggestions?
              </h3>
              <p className="editorial-subheading">Yes. Share links and context through our email channels.</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                Do you accept collaborations?
              </h3>
              <p className="editorial-subheading">Yes. We review partnership requests that align with our editorial direction.</p>
            </div>
          </div>
        </article>
      </section>

      <section className="editorial-panel p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-custom-primary dark:text-custom-primary-dark">Keep reading while we reply</h2>
          <p className="editorial-subheading mt-2">Explore fresh stories and discover new perspectives today.</p>
        </div>
        <Link
          href="/articles"
          className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-custom-primary text-white text-sm font-semibold hover:bg-custom-primary-hover transition-colors"
        >
          Browse articles
        </Link>
      </section>
    </div>
  );
}
