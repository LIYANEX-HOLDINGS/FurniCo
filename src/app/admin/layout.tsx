"use client"
import Link from "next/link";
import { LayoutDashboard, Package, Layout, ShoppingCart, ArrowLeft, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Website Content", icon: Layout, href: "/admin/content" },
    { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  ];

  const bottomItems = [
    { label: "Back to Website", icon: ArrowLeft, href: "/" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-albert-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-[#1e1e1e] text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all", !isSidebarOpen && "opacity-0")}>
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase whitespace-nowrap">Admin Panel</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn("ml-auto text-white/50 hover:text-white transition-colors", !isSidebarOpen && "mx-auto")}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-white"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            href="/"
            className="flex items-center gap-4 px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-w-0",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-40">
          <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              AD
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
