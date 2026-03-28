"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProductStore } from "@/store/productStore";
import { Filter, ChevronDown, List, Grid, LayoutGrid, Search } from "lucide-react";
import { cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const isSaleParam = searchParams.get("isSale") === "true";
  const searchParam = searchParams.get("search");
  const { products } = useProductStore();
  
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setIsClient(true);
    if (categoryParam) {
      setSelectedCategory(decodeURIComponent(categoryParam));
    }
    if (isSaleParam) {
      setShowOnlySale(true);
    }
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [categoryParam, isSaleParam, searchParam]);

  const categories = ["All", "Chairs", "Sofas", "Tables", "Lighting", "Storage", "Office", "Accessories"];

  const filteredProducts = isClient 
    ? products.filter(p => {
        const categoryMatch = selectedCategory === "All" || p.category === selectedCategory || (selectedCategory === "Sofas" && p.category === "Sofas and Couches");
        const saleMatch = !showOnlySale || p.isSale;
        const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && saleMatch && searchMatch;
      })
    : [];

  if (!isClient) return <div className="min-h-screen flex items-center justify-center">Loading Store...</div>;

  return (
    <div className="py-12 md:py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-4">Shop All Products</h1>
          <p className="text-text-muted font-roboto">Explore our full catalog of meticulously crafted items.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-1/4 space-y-12">
            <div>
              <h3 className="text-xl font-bold font-albert-sans mb-6 pb-2 border-b border-gray-100">Categories</h3>
              <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-left font-roboto transition-all duration-300 hover:pl-2 flex justify-between items-center group",
                      selectedCategory === cat ? "text-primary font-bold" : "text-gray-500 hover:text-foreground"
                    )}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] bg-gray-50 px-2 py-0.5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <h3 className="text-xl font-bold font-albert-sans mb-6 pb-2 border-b border-gray-100">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-primary" />
                <div className="flex justify-between text-sm text-text-muted font-roboto">
                  <span>$0</span>
                  <span>$2500</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 border-b border-gray-100">
              <span className="text-sm font-roboto text-gray-400 uppercase tracking-widest">
                Showing {filteredProducts.length} Results
              </span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 cursor-pointer group hover:text-primary transition-colors">
                  <span className="text-sm font-bold font-albert-sans uppercase">Sort By: {sortBy}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
                  <LayoutGrid 
                    className={cn("w-5 h-5 cursor-pointer transition-colors", viewMode === "grid" ? "text-primary" : "text-gray-300 hover:text-foreground")} 
                    onClick={() => setViewMode("grid")} 
                  />
                  <List 
                    className={cn("w-5 h-5 cursor-pointer transition-colors", viewMode === "list" ? "text-primary" : "text-gray-300 hover:text-foreground")} 
                    onClick={() => setViewMode("list")} 
                  />
                </div>
              </div>
            </div>

            <div className={cn(
              "grid gap-x-6 gap-y-10",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <Search className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-albert-sans text-gray-300">No products found</h3>
                <p className="text-gray-400 font-roboto">Try checking another category or clearing your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
