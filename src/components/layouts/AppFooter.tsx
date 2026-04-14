import Link from "next/link";
import FooterSearch from "./FooterSearch";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#D4DDE2] dark:border-neutral-800 bg-white dark:bg-neutral-950 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 md:flex md:justify-between items-start gap-12">

        <div className="flex flex-col gap-6 w-full md:max-w-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl font-medium text-[#5C7E8F] dark:text-[#b6c8d2] tracking-tight">
              Contenable
            </h2>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Curating the world&apos;s most insightful content. 
              Stay connected, stay curious, and discover the stories that matter.
            </p>
          </div>

          <FooterSearch />
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-24 mt-12 md:mt-0">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xs font-medium uppercase tracking-wider text-[#5C7E8F] dark:text-[#b6c8d2]">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2] transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2] transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-xs font-medium uppercase tracking-wider text-[#5C7E8F] dark:text-[#b6c8d2]">
              Company
            </h3>
            <ul className="flex flex-col gap-3 font-sans text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5C7E8F] dark:hover:text-[#b6c8d2] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-[#D4DDE2] dark:border-neutral-800 flex flex-col items-center gap-4">
        <div className="font-sans text-xs text-neutral-500 dark:text-neutral-500 text-center">
          © {currentYear} Contenable. All rights reserved.
        </div>
      </div>
    </footer>
  );
}