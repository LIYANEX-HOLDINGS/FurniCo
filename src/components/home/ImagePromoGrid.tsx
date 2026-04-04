"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCmsStore } from "@/store/cmsStore";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export default function ImagePromoGrid() {
  const { featuredOffers } = useCmsStore();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setIsClient(true), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  if (!isClient) return <div className="h-[400px] bg-gray-50" />;

  return (
    <section className="pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-albert-sans">
            {t('featured_offers')}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 hover-state-container"
        >
          {featuredOffers.map((offer) => (
            <motion.div 
              key={offer.id} 
              variants={itemVariants} 
              className="relative h-[250px] md:h-[320px] rounded-lg overflow-hidden group"
              style={{ backgroundColor: offer.bgColor || "#f5f5f5" }}
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-center max-w-[80%]">
                <span className={cn(
                  "text-[11px] font-medium uppercase tracking-wider mb-3 font-albert-sans rounded-full px-3 py-1 w-fit",
                  offer.tag === "Sale" ? "bg-white text-[#e74c3c]" : "bg-white/20 text-white backdrop-blur-sm border border-white/20"
                )}>
                  {offer.tag === "Sale" ? t('sale') : t('new')}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 font-albert-sans leading-tight">
                  {offer.title === "Make Your Home a Masterpiece" ? t('banner_title_2') : 
                   offer.title === "Elevate Your Living Space" ? t('banner_title_3') : 
                   offer.title === "October 2026 Collection" ? t('autumn_collection') : offer.title}
                </h3>
                <span className="text-sm font-roboto text-white/90">
                  {offer.description === "Innovative designs for your home." ? t('banner_subtitle_2') : 
                   offer.description === "Crafted with passion for your home." ? t('banner_subtitle_3') : 
                   offer.description}
                </span>
              </div>
              
              <div className="absolute bottom-6 left-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <Link href="/shop" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
                  {t('shop_now')} <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
