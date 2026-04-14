import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Contenable team for any inquiries or feedback.",
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

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white dark:bg-neutral-950">

      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-sm text-neutral-600 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-custom-primary dark:text-custom-primary-dark">
              Contact
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-custom-primary dark:text-custom-primary-dark mb-4 tracking-tight">
        Contact
      </h1>

      <div className="h-px w-16 bg-custom-light dark:bg-neutral-700 mb-6" />

      <div className="font-sans text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-4 mb-8">
        <p>
          Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
          Reach out to us through any of the channels below, and we&apos;ll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}
