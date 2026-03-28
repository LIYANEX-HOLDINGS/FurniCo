"use client"
import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUiStore } from "@/store/uiStore";
import { Product } from "@/data/mockProducts";

export interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number | null;
  rating?: number;
  image: string;
  hoverImage?: string;
  category?: string;
  isSale?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  brand = "Theme-Sky",
  price,
  oldPrice,
  rating = 5,
  image,
  hoverImage,
  category = "Uncategorized",
  isSale,
  className,
}: ProductCardProps) {

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id));
  const setQuickView = useUiStore((state) => state.setQuickViewProduct);
  const toggleCartDrawer = useUiStore((state) => state.toggleCartDrawer);

  const productObj: Product = {
    id, name, brand, price, oldPrice, rating, image, hoverImage, category, isSale
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(productObj);
    toggleCartDrawer(); // Open drawer to show feedback
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(productObj);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuickView(productObj);
  };

  return (
    <div className={cn("group flex flex-col font-roboto relative", className)}>
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-light mb-4 rounded-sm">
        {isSale && (
          <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full z-10 w-[46px] h-[46px] flex items-center justify-center -rotate-12 shadow-sm">
            SALE
          </span>
        )}
        
        {/* Main Image */}
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${name} alternative view`}
              fill
              className="object-cover absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
        </Link>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 z-10">
          <button 
            onClick={handleToggleWishlist}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
              isInWishlist ? "bg-primary text-white" : "bg-white text-foreground hover:bg-primary hover:text-white"
            )}
          >
            <Heart className={cn("w-[18px] h-[18px]", isInWishlist && "fill-current")} />
          </button>
          <button 
            onClick={handleQuickView}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-foreground hover:text-white hover:bg-primary transition-all shadow-sm"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Add to Cart Button (Bottom) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-foreground text-white hover:bg-primary hover:text-white font-albert-sans font-medium text-[13px] uppercase tracking-wider py-[12px] rounded-sm shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-[15px] h-[15px]" />
            Add to cart
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col gap-1.5 items-center text-center">
        <span className="text-[12px] text-[#888888] uppercase tracking-wider font-roboto font-medium drop-shadow-sm">{brand}</span>
        <Link href={`/product/${id}`} className="font-albert-sans font-medium text-[16px] text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight">
          {name}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-[2px] text-yellow-500 my-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("w-[12px] h-[12px]", i < rating ? "fill-current" : "text-gray-300")} />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-2.5 font-albert-sans font-medium text-[15px]">
          {oldPrice && (
            <span className="text-[#999999] line-through">${oldPrice.toFixed(2)}</span>
          )}
          <span className={oldPrice ? "text-[#e74c3c]" : "text-foreground"}>${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
