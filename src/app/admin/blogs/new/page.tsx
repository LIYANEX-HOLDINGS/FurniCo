"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Link as LinkIcon, Check } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { cn } from "@/lib/utils";

export default function NewBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Interior",
    readTime: "5 min read",
    isFeatured: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useAuthStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setFormData(prev => ({ ...prev, title, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Failed to create post. Check all fields.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred during creation.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["Interior", "Living Room", "Bedroom", "Office", "Design Trends", "Sustainability"];

  return (
    <div className="max-w-5xl mx-auto pb-20 font-albert-sans">
      <div className="flex items-center gap-4 mb-10">
        <Link 
          href="/admin/blogs"
          className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Log (Post)</h1>
          <p className="text-sm text-gray-500">Add a new post to your website's blog section.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">General Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Post Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. 10 Ways to Decorate Your Living Room"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-bold placeholder:font-normal"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Post Slug (URL)</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-500 font-mono text-sm"
                />
                <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Excerpt / Short Summary</label>
              <textarea 
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="A brief summary for cards and search results..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 resize-none"
              />
            </div>

            <div className="space-y-2">
               <label className="text-sm font-semibold text-gray-700">Main Content</label>
               <textarea 
                  required
                  rows={15}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Body content of the post..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 font-roboto leading-relaxed"
               />
            </div>
          </div>
        </div>

        {/* Sidebar Options Area */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Media & Status</h3>
            
            <ImageUpload 
              label="Cover Image"
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              onRemove={() => setFormData(prev => ({ ...prev, image: "" }))}
            />

            <div className="space-y-2 pt-4">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Read Time</label>
              <input 
                type="text" 
                value={formData.readTime}
                onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700"
              />
            </div>

            <div 
              onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                formData.isFeatured ? "bg-primary/5 border-primary text-primary" : "bg-gray-50 border-gray-100 text-gray-500"
              )}
            >
              <span className="text-sm font-bold">Featured Post</span>
              <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors", formData.isFeatured ? "bg-primary border-primary text-white" : "border-gray-300 bg-white")}>
                {formData.isFeatured && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              type="submit"
              disabled={isLoading || !formData.image || !formData.title}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isLoading ? "Publishing..." : "Publish Post"}
            </button>
            {error && <p className="text-xs text-red-500 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100 animate-in shake">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}
