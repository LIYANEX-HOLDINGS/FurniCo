"use client"
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { useCmsStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Price } from "../ui/Price";

export default function InspirationBundle() {
  const { t } = useTranslation();
  const { inspiration } = useCmsStore();
  const [isClient, setIsClient] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleCartDrawer = useUiStore((state) => state.toggleCartDrawer);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const products = [
    {
      id: "bundle-1",
      brand: "IdeaInstitute",
      name: "Avyanna Occasional Chair",
      price: 202.0,
      oldPrice: 758.0,
      rating: 5,
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=400&auto=format&fit=crop",
      category: "Bundles"
    },
    {
      id: "bundle-2",
      brand: "ComDell",
      name: "Valdez 3 Seater Sofa",
      price: 599.0,
      oldPrice: 786.0,
      rating: 5,
      image: "/category_sofa_luxury_1774699103334.png",
      category: "Bundles"
    },
    {
      id: "bundle-3",
      brand: "PlushLounge",
      name: "Touch Bedside Table Lamp",
      price: 40.0,
      oldPrice: null,
      rating: 5,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed657dc997?q=80&w=400&auto=format&fit=crop",
      category: "Bundles"
    },
  ];

  const bundleTotal = products.reduce((acc, curr) => acc + curr.price, 0);

  const handleAddBundle = () => {
    products.forEach(product => addToCart(product));
    toggleCartDrawer();
  };

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border-light/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-albert-sans tracking-tight">
            {t('inspiration_title')}
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Master Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[65%] relative h-[450px] md:h-[650px] rounded-3xl overflow-hidden group shadow-2xl"
          >
            <Image
              src={inspiration.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop"}
              alt="Inspiration"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Elegant Floating Badge */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-8 py-5 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-500">
               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-primary/30">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 2L2 12h3v8h14v-8h3L12 2z" fill="currentColor"/></svg>
               </div>
               <span className="font-albert-sans font-black text-foreground text-[12px] tracking-[0.2em] uppercase">Idea<span className="text-primary">Institute</span></span>
            </div>
          </motion.div>

          {/* Right Product List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[35%] h-full flex flex-col gap-8 bg-gray-50/50 p-8 md:p-10 rounded-3xl border border-gray-100"
          >
            <div className="flex flex-col gap-8">
              {products.map((product) => (
                <div key={product.id} className="flex gap-6 group cursor-pointer">
                  {/* Square Product Image */}
                  <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-2xl bg-white shadow-sm relative flex-shrink-0 overflow-hidden border border-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-[11px] text-primary font-bold uppercase tracking-[0.15em] mb-2">{product.brand}</span>
                    <h4 className="font-albert-sans font-bold text-[16px] text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-3 font-albert-sans font-bold">
                      <Price amount={product.price} className="text-foreground text-[15px]" />
                      {product.oldPrice && (
                        <Price amount={product.oldPrice} className="text-gray-400 line-through text-[13px] font-medium" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Checkout */}
            <div className="mt-auto pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{t('total_label')}</span>
                <Price amount={bundleTotal} className="text-2xl font-bold text-foreground font-albert-sans" />
              </div>
              <button 
                onClick={handleAddBundle}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] uppercase tracking-widest px-8 py-5 rounded-full transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
              >
                <span>{t('add_all_to_cart').replace('%d', products.length.toString())}</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
