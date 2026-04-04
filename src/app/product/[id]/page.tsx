"use client"
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUiStore } from "@/store/uiStore";
import { Star, Heart, ArrowLeft, Plus, Minus, Check, Truck, ShieldCheck, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { Price } from "@/components/ui/Price";

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const products = useProductStore((state) => state.products);
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const toggleCartDrawer = useUiStore(state => state.toggleCartDrawer);
  
  // We'll calculate product later but we must call the selector hook consistently
  const isInWishlist = useWishlistStore(state => {
    if (typeof id !== 'string') return false;
    return state.isInWishlist(id);
  });

  useEffect(() => setIsClient(true), []);

  const product = products.find(p => p.id === id);

  if (!isClient) return null;

  if (!product) {
    return (
      <div className="py-24 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-albert-sans mb-4">{t('product_not_found')}</h1>
        <Link href="/shop" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t('back_to_shop')}
        </Link>
      </div>
    );
  }


  const handleAddToCart = () => {
    addToCart(product, quantity);
    toggleCartDrawer();
  };

  return (
    <div className="py-8 md:py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-sm font-roboto text-text-muted mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">{t('shop')}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="bg-white border flex flex-col md:flex-row border-border-light rounded-sm mb-16 overflow-hidden">
          
          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 p-6 md:p-12 border-b md:border-b-0 md:border-r border-border-light">
            <div className="relative aspect-[4/5] bg-bg-light rounded overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              {product.isSale && (
                <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-[12px] font-semibold px-3 py-1 rounded-sm z-10 shadow-sm">
                  {t('sale')}
                </span>
              )}
            </div>
          </div>

          {/* Right: Product Params */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
            <div className="mb-2">
              <span className="text-[12px] text-text-muted uppercase tracking-widest font-roboto mb-2 block">{product.brand}</span>
              <h1 className="text-3xl md:text-4xl font-semibold font-albert-sans text-foreground mb-4 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-[2px] text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-[16px] h-[16px]", i < product.rating ? "fill-current" : "text-gray-300")} />
                ))}
              </div>
              <span className="text-text-muted font-roboto text-sm">{t('customer_reviews').replace('%d', '12')}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              {product.oldPrice && (
                <Price 
                  amount={product.oldPrice} 
                  className="text-[#999999] line-through font-albert-sans text-lg" 
                />
              )}
              <Price 
                amount={product.price} 
                className={cn("font-albert-sans font-bold text-3xl", product.oldPrice ? "text-[#e74c3c]" : "text-foreground")} 
              />
            </div>

            <p className="text-text-muted font-roboto leading-relaxed mb-10 border-b border-border-light pb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique, elit vitae dapibus feugiat, mauris orci aliquet leo, id semper lorem odio et magna.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <div className="flex items-center border border-border-light rounded-sm bg-white h-[52px]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 h-full hover:bg-bg-light transition-colors text-text-muted border-r border-border-light">
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-full text-center font-semibold font-roboto focus:outline-none"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="px-5 h-full hover:bg-bg-light transition-colors text-text-muted border-l border-border-light">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-foreground text-white hover:bg-primary font-albert-sans font-semibold text-[15px] uppercase tracking-wider py-4 rounded-sm transition-colors shadow-sm"
              >
                {t('add_to_cart')}
              </button>

              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "w-[52px] h-[52px] border rounded-sm flex items-center justify-center transition-all",
                  isInWishlist ? "bg-primary border-primary text-white" : "border-border-light bg-white text-text-muted hover:border-foreground hover:text-foreground"
                )}
                title="Add to Wishlist"
              >
                <Heart className={cn("w-5 h-5", isInWishlist && "fill-current")} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="flex flex-col gap-4 font-roboto text-sm border border-border-light rounded p-6 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-foreground">{t('in_stock_msg')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-text-muted" />
                <span className="text-text-muted">
                  {t('shipping_msg').replace('%d', '')} <Price amount={500} showSymbol={true} />
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-text-muted" />
                <span className="text-text-muted">{t('warranty_msg')}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="font-albert-sans font-semibold">{t('categories_label')}:</span>
              <span className="text-text-muted">{product.category}, {t('furniture') || 'Furniture'}</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="font-albert-sans font-semibold">{t('share_label')}:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-text-muted hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
