import Link from "next/link";
import FooterSearch from "./FooterSearch";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-white dark:bg-black/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 md:flex md:justify-between items-start gap-12">
        {/* Brand + Description */}
        <div className="flex flex-col gap-6 w-full md:max-w-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Contenable</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curating the world&apos;s most insightful content. 
              Stay connected, stay curious, and discover the stories that matter.
            </p>
          </div>

          <FooterSearch />
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-12 md:gap-24 mt-12 md:mt-0">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Explore
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/articles" className="hover:text-primary transition-colors">Articles</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-border/40 flex flex-col items-center gap-4 text-xs font-medium text-muted-foreground tracking-wide">
        <div className="text-center">
          © {currentYear} Contenable. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
