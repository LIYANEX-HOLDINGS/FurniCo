"use client"
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { useWishlistStore } from "@/store/wishlistStore";
import { ArrowLeft, Box } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-10 text-center">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-bg-light rounded-sm max-w-2xl mx-auto flex flex-col items-center">
            <Box className="w-16 h-16 text-text-muted/30 mb-6" />
            <h2 className="text-2xl font-albert-sans mb-4">No items saved yet.</h2>
            <p className="text-text-muted font-roboto mb-8">Save items here while you shop to easily find them later or share them with friends.</p>
            <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded font-albert-sans font-medium transition-colors inline-block tracking-wide uppercase text-sm">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {items.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
