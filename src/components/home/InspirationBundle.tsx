"use client"
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { useCmsStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";

export default function InspirationBundle() {
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

  const handleAddBundle = () => {
    products.forEach(product => addToCart(product));
    toggleCartDrawer();
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-albert-sans">
            {inspiration.title}
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Master Image (approx 65-70% width) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[68%] relative h-[400px] md:h-[600px] rounded overflow-hidden group"
          >
            <Image
              src={inspiration.image}
              alt="Living Room Set"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Box */}
            <div className="absolute top-6 left-6 bg-white w-40 h-24 flex flex-col items-center justify-center rounded-sm shadow-sm pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#a4c639] mb-1"><path d="M12 2L2 12h3v8h14v-8h3L12 2z" fill="currentColor"/></svg>
              <span className="font-albert-sans font-bold text-foreground text-[14px] tracking-wide">IDEA<span className="font-normal text-[#555]">INSTITUTE</span></span>
            </div>
          </motion.div>

          {/* Right Product List (approx 32-35% width) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[32%] flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex gap-5 group">
                  {/* Small Square Image */}
                  <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-md bg-[#f5f5f5] relative flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Heart Icon positioned perfectly top right within square */}
                    <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-[#888888] hover:text-primary transition-colors z-10">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Details */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[12px] text-[#888888] font-roboto font-medium uppercase tracking-widest mb-1.5">{product.brand}</span>
                    <Link href="#" className="font-albert-sans font-medium text-[15px] text-foreground hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-2 font-albert-sans font-semibold text-[14px]">
                      <span className="text-[#e74c3c]">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-[#999999] line-through font-medium">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add to Cart Block */}
            <div className="flex items-center justify-between gap-4 mt-8 md:mt-2 pt-4">
              <button 
                onClick={handleAddBundle}
                className="flex-1 bg-primary hover:bg-primary-hover text-white font-albert-sans font-medium text-[14px] px-6 py-[14px] rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Add all <span className="bg-white text-primary w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold">3</span> products to cart
              </button>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[12px] text-[#555] font-roboto mb-0.5">Total</span>
                <span className="font-albert-sans font-semibold text-[16px] text-foreground">$841.00</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
