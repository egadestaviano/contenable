import Link from "next/link";
import FooterSearch from "./FooterSearch";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <footer className="w-full mt-20 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Decor - Subtle glow effect */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-custom-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="editorial-shell pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-14 items-start">
          
          {/* Brand Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="font-serif text-4xl sm:text-5xl tracking-tighter leading-tight">
                Read with <span className="text-custom-primary">Contenable.</span>
              </h2>
              <p className="max-w-md text-neutral-400 text-lg leading-relaxed font-light">
                Delivering high-quality insights and thoughtful perspectives for a more focused reading experience.
              </p>
            </div>
            
            <div className="max-w-md">
              <FooterSearch />
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:pl-4">
            <div className="max-w-xs space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-custom-primary">
                  Navigation
                </p>
                <ul className="mt-6 space-y-4">
                  {navigationLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-neutral-400 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                        <ArrowUpRight
                          size={12}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-neutral-800/70 pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-custom-primary">
                  Editorial Note
                </p>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  A quieter place to discover articles, categories, and ideas worth reading.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] font-bold text-neutral-500 tracking-[0.15em]">
            <p>© {currentYear} CONTENABLE. ALL RIGHTS RESERVED.</p>
            <span className="hidden md:block h-1 w-1 bg-neutral-700 rounded-full" />
          </div>
          
          <div className="flex items-center gap-4 6 text-[10px] font-bold text-neutral-500 tracking-[0.15em]">
            <p className="uppercase">Designed for focused reading</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
