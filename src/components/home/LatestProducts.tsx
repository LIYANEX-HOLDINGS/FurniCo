"use client"
import Link from "next/link";
import { ProductCard } from "../ui/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useProductStore } from "@/store/productStore";
import { useState, useEffect } from "react";

import { useCmsStore } from "@/store/cmsStore";

import { useTranslation } from "@/hooks/useTranslation";

export default function LatestProducts() {
  const { latestProducts } = useCmsStore();
  const allProducts = useProductStore((state) => state.products);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => setIsClient(true), []);

  const products = isClient ? allProducts.slice(0, 8) : [];

  if (!isClient) return <div className="h-[400px]" />;

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden relative group/section">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground font-albert-sans mb-4">
              {t('latest_title')}
            </h2>
            <p className="text-text-muted font-roboto text-sm md:text-base">
              {t('latest_description')}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/shop" className="font-albert-sans font-medium text-primary hover:underline underline-offset-4 tracking-wide text-sm uppercase hidden md:block">
              {t('view_all')}
            </Link>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              nextEl: '.products-next',
              prevEl: '.products-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full !pb-8"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation floating over edge */}
          <div className="products-prev absolute -left-5 top-[40%] w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-foreground z-10 cursor-pointer opacity-0 translate-x-4 group-hover/section:opacity-100 group-hover/section:translate-x-0 transition-all hover:bg-primary hover:text-white hidden md:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <div className="products-next absolute -right-5 top-[40%] w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-foreground z-10 cursor-pointer opacity-0 -translate-x-4 group-hover/section:opacity-100 group-hover/section:translate-x-0 transition-all hover:bg-primary hover:text-white hidden md:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
