"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, MoreHorizontal, FileText, Trash2, Edit } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

interface Blog {
  _id: string;
  title: string;
  image: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useAuthStore();

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
      console.error("Failed to fetch blogs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-albert-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and manage your website articles ("Logs").</p>
        </div>
        <Link 
          href="/admin/blogs/new"
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary/20 self-start"
        >
          <Plus className="w-5 h-5" /> Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-4 h-16 bg-gray-50/20"></td>
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                       <FileText className="w-10 h-10 opacity-20" />
                       <p>No blog posts found.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                         <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900 truncate max-w-[250px]">{blog.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{blog.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {blog.isFeatured ? (
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold border border-yellow-100">Featured</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/blogs/${blog._id}`} 
                        className="p-2 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-gray-100 rounded-lg transition-all text-gray-400"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                         onClick={() => deleteBlog(blog._id)}
                         className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-gray-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
