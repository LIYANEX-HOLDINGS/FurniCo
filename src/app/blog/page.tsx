"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  isFeatured: boolean;
  createdAt: string;
}

import { useTranslation } from "@/hooks/useTranslation";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useTranslation();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(blogs.map(b => b.category)))];
  const filteredBlogs = activeCategory === "all" 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  const featuredPost = blogs.find(b => b.isFeatured) || blogs[0];

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
        <p className="text-text-muted font-roboto animate-pulse">{t('search_placeholder')}</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen font-albert-sans pb-24">
      {/* Hero Header */}
      <section className="bg-bg-light py-20 border-b border-border-light">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t('our_journal')}</h1>
          <p className="text-text-muted text-lg md:text-xl font-roboto max-w-2xl mx-auto">{t('footer_desc')}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl mt-12 md:mt-20">
        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && (
          <div className="mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm font-bold text-primary uppercase tracking-widest">
                  <span className="bg-primary/10 px-3 py-1 rounded-full">{featuredPost.category}</span>
                  <span className="text-text-muted">{t('featured_post')}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                <p className="text-text-muted text-lg leading-relaxed font-roboto">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-text-muted border-b border-border-light pb-6">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {format(new Date(featuredPost.createdAt), "MMM dd, yyyy")}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredPost.readTime}</div>
                </div>
                <div className="flex items-center gap-2 font-bold text-lg group-hover:gap-4 transition-all">
                  {t('read_full')} <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Categories & Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 border-b border-border-light pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full font-bold transition-all border text-sm",
                activeCategory === cat 
                  ? "bg-foreground text-white border-foreground shadow-lg" 
                  : "bg-white text-text-muted border-border-light hover:border-primary hover:text-primary"
              )}
            >
              {cat === "all" ? t('view_all') : cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((post) => (
            <article key={post._id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-border-light hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-foreground shadow-sm">{post.category}</span>
                </div>
              </Link>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-text-muted mb-4 font-roboto">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                </Link>
                <p className="text-text-muted text-sm leading-relaxed font-roboto line-clamp-3 mb-6">{post.excerpt}</p>
                <div className="mt-auto pt-6 border-t border-border-light flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-[10px]">
                        {post.author.charAt(0)}
                     </div>
                     <span className="text-xs font-bold text-foreground">{post.author}</span>
                   </div>
                   <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                     {t('read_more')} <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-text-muted">{t('search_placeholder')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
