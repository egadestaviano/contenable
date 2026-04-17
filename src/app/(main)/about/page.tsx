import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Zap,
  Heart,
  ArrowRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Contenable and our mission to curate thoughtful and trusted stories.",
};

export default function AboutPage() {
  return (
    <div className="editorial-page relative pb-20">
      {/* Soft Background Glow - Konsisten dengan halaman lain */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-custom-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-[-10%] -z-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />

      <Breadcrumb className="mb-8">
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
            <BreadcrumbPage>About</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-custom-primary/10 text-custom-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.1]">
            We design a{" "}
            <span className="italic text-custom-primary font-light">
              calmer way
            </span>{" "}
            to discover great writing.
          </h1>
          <p className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-light max-w-2xl">
            Contenable helps readers explore meaningful perspectives without
            endless clutter. Thoughtful content, easier to find, easier to
            trust.
          </p>
        </div>
      </section>

      {/* Feature Section - Asimetris (Ilustrasi & List) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-28 items-center">
        {/* Sisi Kiri: Visual/Ilustrasi */}
        <div className="lg:col-span-7 relative group">
          <div className="aspect-[16/10] relative">
            <Image
              src="/about-us.svg"
              alt="Hero Illustration"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-custom-primary/10 to-transparent opacity-60" />
          </div>

          {/* Dekorasi Aksen */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Sisi Kanan: Poin-poin */}
        <div className="lg:col-span-5 space-y-12">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Mission",
              text: "Promote quality over quantity by highlighting informative and human-centered articles.",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Approach",
              text: "Keep the experience clean and fast, so the focus stays on ideas and not distractions.",
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: "Promise",
              text: "Respect your attention with curated discovery, clear structure, and consistent quality.",
            },
          ].map((item, index) => (
            <div key={index} className="flex gap-6 group">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-center text-custom-primary group-hover:scale-110 group-hover:bg-custom-primary group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <div>
                <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 mb-2">
                  {item.title}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA - Rounded Glass Style */}
      <section className="relative overflow-hidden rounded-[3rem] p-10 sm:p-20 bg-neutral-900 text-center">
        {/* Glow efek di dalam box gelap */}
        <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[150%] bg-custom-primary rounded-full blur-[120px] opacity-20" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-8 tracking-tight">
            Ready to build with us?
          </h2>
          <p className="text-neutral-400 mb-12 text-lg font-light leading-relaxed">
            Have feedback, ideas, or collaboration opportunities? We would love
            to hear from you and grow together.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 h-16 px-10 rounded-full bg-white text-neutral-900 text-sm font-bold uppercase tracking-[0.2em] hover:bg-custom-primary hover:text-white transition-all shadow-xl shadow-white/5"
          >
            <span>Contact team</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
