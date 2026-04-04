"use client"
import Image from "next/image";
import Link from "next/link";
import { Hammer, Leaf, MousePointerClick, Armchair, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function ValuePropBanners() {
  const { t } = useTranslation();

  const valueProps = [
    {
      icon: <Hammer className="w-8 h-8 text-primary stroke-[1.5]" />,
      badge: t('quality'),
      text: t('quality_desc'),
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary stroke-[1.5]" />,
      badge: t('sustainability'),
      text: t('sustain_desc'),
    },
    {
      icon: <MousePointerClick className="w-8 h-8 text-primary stroke-[1.5]" />,
      badge: t('community'),
      text: t('community_desc'),
    },
    {
      icon: <Armchair className="w-8 h-8 text-primary stroke-[1.5]" />,
      badge: t('modern'),
      text: t('modern_desc'),
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-primary stroke-[1.5]" />,
      badge: t('need_help'),
      text: t('newsletter'),
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8fcf9]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-foreground font-albert-sans leading-[1.2] mb-6">
              {t('artisan_title')}
            </h2>
            <p className="text-text-muted font-roboto text-[15px] leading-relaxed mb-8 max-w-md">
              {t('artisan_desc')}
            </p>
            <Link 
              href="/about"
              className="bg-black hover:bg-black/80 text-white font-albert-sans font-semibold text-[14px] px-8 py-3.5 rounded-full w-fit transition-colors shadow-sm"
            >
              {t('about')}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-sm"
          >
            <Image
              src="https://images.unsplash.com/photo-1519643381401-22c77e60530c?q=80&w=1000&auto=format&fit=crop"
              alt="Artisanal Handcrafted Furniture"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom 5-Column Value Props */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6"
        >
          {valueProps.map((prop, idx) => (
            <motion.div variants={itemVariants} key={idx} className="flex flex-col items-start pr-4">
              <div className="mb-4">
                {prop.icon}
              </div>
              <span className="bg-[#e8f5e9] text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-[3px] mb-4 font-albert-sans">
                {prop.badge}
              </span>
              <p className="font-albert-sans font-semibold text-foreground text-[14px] leading-snug lg:max-w-[180px]">
                {prop.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
