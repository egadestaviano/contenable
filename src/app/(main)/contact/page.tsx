import { Metadata } from "next";
import Link from "next/link";
import { Send, MessageSquare, Sparkles } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Contenable team for questions, feedback, and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="editorial-page relative pb-20">
      {/* Soft Background Glow - Konsisten dengan halaman lain */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-custom-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-[-5%] -z-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />

      <Breadcrumb className="mb-10">
        <BreadcrumbList className="text-sm text-neutral-500 dark:text-neutral-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-custom-primary">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* KIRI: ILUSTRASI & TEKS (Sticky on Desktop) */}
        <div className="space-y-10 lg:sticky lg:top-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-custom-primary/10 text-custom-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get in touch</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.1]">
              Let&apos;s start a <br />
              <span className="italic text-custom-primary font-light">
                conversation.
              </span>
            </h1>
            <p className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 max-w-md font-light leading-relaxed">
              Have a question or a story idea? We&apos;re all ears. Fill out the
              form and our team will get back to you shortly.
            </p>
          </div>

          <div className="relative w-full aspect-square max-w-sm group">
            <div className="absolute inset-0 bg-gradient-to-tr from-custom-primary/20 to-indigo-500/10 rotate-6 group-hover:rotate-3 transition-transform duration-700" />

            <div className="absolute inset-0 bg-white dark:bg-neutral-900 flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="relative w-full h-full p-8 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src="/contact-us.svg"
                  fill
                  alt="Contact Us Illustration"
                  className="w-full h-full object-contain"
                />

                {/* Sparkles tetap dipertahankan sebagai aksen manis di pojok gambar */}
                <Sparkles className="absolute top-12 right-12 w-8 h-8 text-indigo-400 animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </div>
        </div>

        {/* KANAN: CONTACT FORM (Modern Glass Card) */}
        <div className="bg-white/70 dark:bg-neutral-950/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-neutral-200/40 dark:shadow-none relative">
          <form className="space-y-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 ml-1">
                  Full Name
                </label>
                <Input
                  placeholder="John Doe"
                  className="h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border-neutral-100 dark:border-neutral-800 focus:border-custom-primary focus:ring-4 focus:ring-custom-primary/5 transition-all"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 ml-1">
                  Email Address
                </label>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  className="h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border-neutral-100 dark:border-neutral-800 focus:border-custom-primary focus:ring-4 focus:ring-custom-primary/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 ml-1">
                Subject
              </label>
              <Input
                placeholder="Collaboration idea"
                className="h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border-neutral-100 dark:border-neutral-800 focus:border-custom-primary focus:ring-4 focus:ring-custom-primary/5 transition-all"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 ml-1">
                Message
              </label>
              <textarea
                className="w-full min-h-[180px] p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 text-sm focus:outline-none focus:border-custom-primary focus:ring-4 focus:ring-custom-primary/5 transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <Button className="w-full h-16 rounded-2xl bg-neutral-900 dark:bg-custom-primary text-white font-bold uppercase tracking-[0.2em] transition-all hover:bg-custom-primary dark:hover:bg-white dark:hover:text-neutral-900 shadow-xl shadow-neutral-900/10 dark:shadow-custom-primary/20">
              Send Message
            </Button>
          </form>

          {/* Social Links / Info di bawah form */}
          <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <p className="text-xs text-neutral-400 italic font-light">
              Prefer direct mail? reach us at <br className="sm:hidden" />
              <a
                href="mailto:hello@contenable.com"
                className="text-custom-primary font-bold not-italic hover:underline ml-1"
              >
                hello@contenable.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
