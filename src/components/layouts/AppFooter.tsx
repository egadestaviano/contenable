import Link from "next/link";
import FooterSearch from "./FooterSearch";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-custom-light/80 dark:border-neutral-800 bg-surface-soft/60 dark:bg-neutral-950/70">
      <div className="editorial-shell py-14 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12">
        <div className="space-y-5">
          <h2 className="font-serif text-3xl text-custom-primary dark:text-custom-primary-dark tracking-tight">
            Read with clarity.
          </h2>
          <p className="max-w-xl editorial-subheading">
            Contenable curates thoughtful writing from diverse voices so you can stay informed without the noise.
          </p>
          <div className="max-w-md">
            <FooterSearch />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-custom-primary dark:hover:text-custom-primary-dark">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="editorial-shell py-6 border-t border-custom-light/80 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p>(c) {currentYear} Contenable. All rights reserved.</p>
        <p>Designed for focused reading experiences.</p>
      </div>
    </footer>
  );
}
