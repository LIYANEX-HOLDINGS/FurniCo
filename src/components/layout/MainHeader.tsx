"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Home, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUiStore } from "@/store/uiStore";

export default function MainHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  // Suppress hydration warning mismatch by only rendering client-side data
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const cartCount = useCartStore((state) => state.getCartItemsCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const toggleCartDrawer = useUiStore((state) => state.toggleCartDrawer);
  const toggleWishlistDrawer = useUiStore((state) => state.toggleWishlistDrawer);

  return (
    <>
      <div className="w-full bg-background py-5 md:py-7">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* Mobile Hamburger - Left side on mobile */}
          <button 
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-1 md:flex-none justify-center md:justify-start" aria-label="Home">
            <div className="text-primary">
              <Home className="w-8 h-8 md:w-10 md:h-10 fill-current" />
            </div>
            <div className="flex flex-col font-albert-sans font-bold leading-none tracking-tight">
              <span className="text-base md:text-xl text-foreground uppercase">Cozy</span>
              <span className="text-base md:text-xl text-foreground uppercase">Corner</span>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-border-light rounded-full py-3.5 pl-6 pr-12 focus:outline-none focus:border-primary transition-colors font-roboto text-foreground placeholder:text-text-muted"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-7">
            {/* Support Phone - Hidden on smaller screens */}
            <div className="hidden lg:flex flex-col text-right font-roboto">
              <span className="text-xs text-text-muted">Need help?</span>
              <a href="tel:+12025550172" className="text-foreground font-medium hover:text-primary transition-colors">
                +1-202-555-0172
              </a>
            </div>

            <div className="flex items-center gap-4 md:gap-6 text-foreground">
              {/* Account - Hidden on very small screens */}
              <Link href="#" className="hidden sm:block hover:text-primary transition-colors hover-scale">
                <User className="w-6 h-6 md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
              </Link>

              {/* Wishlist */}
              <button onClick={toggleWishlistDrawer} className="relative hover:text-primary transition-colors hover-scale">
                <Heart className="w-6 h-6 md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-medium min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-roboto">
                  {isClient ? wishlistCount : 0}
                </span>
              </button>

              {/* Cart */}
              <button onClick={toggleCartDrawer} className="relative hover:text-primary transition-colors hover-scale">
                <ShoppingBag className="w-6 h-6 md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-medium min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-roboto">
                  {isClient ? cartCount : 0}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar - Shown only on mobile */}
        <form onSubmit={handleSearch} className="block md:hidden px-4 mt-4 relative">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-border-light rounded-full py-3 pl-5 pr-12 focus:outline-none focus:border-primary transition-colors font-roboto text-foreground placeholder:text-text-muted text-sm"
          />
          <button type="submit" className="absolute right-8 top-1/2 -translate-y-1/2 text-foreground hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
