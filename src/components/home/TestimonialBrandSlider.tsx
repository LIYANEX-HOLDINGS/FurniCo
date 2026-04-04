"use client"
import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { useCmsStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function TestimonialBrandSlider() {
  const { testimonials, brands } = useCmsStore();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return <div className="min-h-[500px] bg-bg-light" />;


  return (
    <div className="flex flex-col">
      {/* Testimonial Section Slider */}
      <section className="bg-bg-light py-20 md:py-32 text-center px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-3xl flex flex-col items-center">
          <div className="flex items-center gap-1 text-yellow-500 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-albert-sans text-foreground mb-6 uppercase tracking-widest">
            {t('testimonials_title')}
          </h2>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className="w-full"
          >
            {testimonials.map((test, i) => (
              <SwiperSlide key={i}>
                <p className="text-2xl md:text-3xl lg:text-4xl text-foreground font-albert-sans font-medium leading-relaxed italic mb-10">
                  &quot;{test.text}&quot;
                </p>
                <div className="flex flex-col items-center">
                  <span className="font-albert-sans font-semibold text-lg text-foreground mb-1">- {test.name}</span>
                  <span className="text-text-muted font-roboto text-sm">{test.role}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Brand Logos Slider */}
      <section className="py-12 border-y border-border-light bg-background overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={3000}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full brand-swiper"
          >
            {brands.map((src, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div className="relative w-[100px] md:w-[150px] h-[40px] md:h-[50px] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <Image src={src} alt="Brand" fill className="object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-primary text-white text-center px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold font-albert-sans mb-4">
            {t('newsletter')}
          </h2>
          <p className="text-white/80 font-roboto mb-10 text-sm md:text-base">
            {t('footer_desc')}
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
            <input
              type="email"
              placeholder={t('email_placeholder')}
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/60 px-6 py-4 rounded focus:outline-none focus:bg-white/20 transition-colors font-roboto w-full"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary font-albert-sans font-semibold px-8 py-4 rounded hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm"
            >
              {t('subscribe')}
            </button>
          </form>
        </div>
      </section>

      {/* Continuous scroll css override */}
      <style jsx global>{`
        .brand-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
}
