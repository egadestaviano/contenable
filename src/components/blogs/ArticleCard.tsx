import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/store/features/blogs/blog";
import { Eye } from "lucide-react";
import { formatDate } from "@/utils/format";

export default function ArticleCard({
  article,
  priority = false,
}: {
  article: Blog;
  priority?: boolean;
}) {
  const tags = article.tags || [];
  const maxTagsToShow = 3; 
  const visibleTags = tags.slice(0, maxTagsToShow);
  const extraTagCount = tags.length - visibleTags.length;

  return (
    <div className="relative group h-full">
      <Card className="h-full overflow-hidden flex flex-col rounded-2xl border border-custom-light/80 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all duration-500 pt-0 group-hover:shadow-2xl group-hover:border-custom-primary/20 group-hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={article.thumbnail || "/placeholder.svg"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Floating Tags Overlay */}
          {tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1 z-20">
              {visibleTags.map((tag, i) => (
                <Link
                  key={i}
                  href={`/tags/${tag.slug}`}
                  className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/60 dark:bg-neutral-900/80 text-white backdrop-blur-md border border-white/10 hover:bg-custom-primary transition-colors shadow-sm z-30"
                >
                  {tag.name}
                </Link>
              ))}
              {extraTagCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white/90 dark:bg-neutral-800 text-neutral-600 backdrop-blur-sm self-center">
                  +{extraTagCount}
                </span>
              )}
            </div>
          )}

          {/* Overlay & View Post Button - Triggered by group-hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
            <Link 
              href={`/article/${article.slug}`}
              className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <Eye size={14} /> View Post
            </Link>
          </div>
        </div>

        <CardHeader className="p-4 pt-0 flex flex-col gap-1.5">
          {/* Metadata */}
          <div className="flex items-center text-[10px] uppercase tracking-wider font-bold text-neutral-400 dark:text-neutral-500">
            <span className="text-custom-primary dark:text-custom-primary-dark-secondary">
              {article.author?.name || "Admin"}
            </span>
            <span className="mx-1.5 opacity-50">–</span>
            <span>{formatDate(article.created_at)}</span>
          </div>

          <div className="space-y-1">
            <CardTitle className="line-clamp-2 font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-custom-primary transition-colors duration-300 leading-tight tracking-tight min-h-[2.8rem]">
              <Link
                href={`/article/${article.slug}`}
                className="focus:outline-none"
              >
                {/* Overlay link agar seluruh card bisa diklik */}
                <span className="absolute inset-0" aria-hidden="true" />
                {article.title}
              </Link>
            </CardTitle>

            <CardDescription className="line-clamp-2 font-sans text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              {article.description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}