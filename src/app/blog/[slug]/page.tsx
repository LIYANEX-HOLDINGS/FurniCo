"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Globe, MessageCircle, Share2, Loader2, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    fetchBlog();
  }, [params.slug]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/slug/${params.slug}`);
      const data = await res.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to load article.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
        <p className="text-text-muted font-roboto animate-pulse">Fetching the story...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold text-foreground">{error || "Something went wrong"}</h2>
        <Link href="/blog" className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          <ArrowLeft className="w-5 h-5" /> Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen font-albert-sans pb-24">
      {/* Article Header */}
      <header className="relative h-[50vh] md:h-[60vh] flex items-end pb-12 overflow-hidden">
        <Image 
          src={blog.image} 
          alt={blog.title} 
          fill 
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-white animate-in slide-in-from-bottom-12 duration-700">
           <Link href="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold mb-6 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Journal
           </Link>
           <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">{blog.category}</span>
           <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 drop-shadow-lg">{blog.title}</h1>
           <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/80 font-roboto">
              <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{blog.author.charAt(0)}</div> {blog.author}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {format(new Date(blog.createdAt), "MMMM dd, yyyy")}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blog.readTime}</div>
           </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 max-w-7xl mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Share Links (Left Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-fit">
            <div className="flex flex-col gap-6 text-text-muted">
              <span className="text-[10px] font-bold uppercase tracking-widest text-center whitespace-nowrap -rotate-90 origin-center mb-8">Share Article</span>
              <button className="p-3 bg-bg-light hover:bg-primary hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm"><Globe className="w-5 h-5" /></button>
              <button className="p-3 bg-bg-light hover:bg-primary hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm"><LinkIcon className="w-5 h-5" /></button>
              <button className="p-3 bg-bg-light hover:bg-primary hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm"><Share2 className="w-5 h-5" /></button>
            </div>
          </aside>

          {/* Main Body */}
          <article className="lg:col-span-8 lg:col-start-3">
            <div className="prose prose-lg prose-neutral max-w-none font-roboto leading-relaxed text-text-muted space-y-8">
              {/* Replace newlines with paragraph tags or use CSS for white-space pre-wrap */}
              <div className="whitespace-pre-wrap text-lg text-foreground/80 leading-loose antialiased">
                {blog.content}
              </div>
            </div>

            {/* Author Card Footer */}
            <div className="mt-20 p-8 md:p-12 bg-bg-light rounded-[2rem] flex flex-col md:flex-row gap-8 items-center border border-border-light shadow-sm">
               <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-3xl shrink-0">
                  {blog.author.charAt(0)}
               </div>
               <div className="text-center md:text-left space-y-3">
                  <h4 className="text-xl font-bold">Written by {blog.author}</h4>
                  <p className="text-text-muted font-roboto leading-relaxed">Our editorial team at CozyCorner is dedicated to bringing you the best in furniture design, home care, and lifestyle inspiration. Every piece we write is designed to help you create a better home.</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                     <Link href="/about" className="text-primary font-bold text-sm hover:underline">About CozyCorner</Link>
                     <span className="text-border-light">•</span>
                     <Link href="/blog" className="text-primary font-bold text-sm hover:underline">More Stories</Link>
                  </div>
               </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
