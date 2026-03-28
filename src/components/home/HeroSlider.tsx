"use client"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/Button"
import { motion } from "framer-motion"

// Swiper integration
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useCmsStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";

export default function HeroSlider() {
  const { heroSlides } = useCmsStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return <div className="w-full h-[500px] md:h-[630px] bg-gray-50" />;

  const slides = heroSlides;

  return (
    <div className="relative w-full h-[500px] md:h-[630px] font-albert-sans group/slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, renderBullet: (index, className) => `<span class="${className} w-2.5 h-2.5 rounded-full bg-border-light hover:bg-primary transition-colors"></span>` }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        loop={true}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="w-full h-full relative flex items-center">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Animated Content */}
                <div className="container mx-auto px-4 max-w-7xl h-full flex items-center">
                  <div className="max-w-xl">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="text-4xl md:text-[64px] font-bold mb-6 text-foreground leading-[1.1]"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                      className="text-lg text-text-muted mb-8 font-roboto max-w-md font-normal"
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                      <Button size="lg" className="group/btn rounded-[4px] px-[35px] py-[15px] h-auto gap-3 uppercase tracking-wider text-[13px] font-semibold bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-all">
                        {slide.buttonText}
                        <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-foreground shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all -translate-x-4 group-hover/slider:translate-x-0 cursor-pointer z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <div className="hero-next absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-foreground shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all translate-x-4 group-hover/slider:translate-x-0 cursor-pointer z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </Swiper>

      {/* Override Swiper active bullet color to match primary */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: var(--primary) !important;
        }
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  )
}
