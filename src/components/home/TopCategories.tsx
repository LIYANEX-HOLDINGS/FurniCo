"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function TopCategories() {
  const { t } = useTranslation();
  const categories = [
    { name: t('sofas'), iconUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=150&auto=format&fit=crop" },
    { name: t('wardrobes'), iconUrl: "https://images.unsplash.com/photo-1558997519-53bb890929a3?q=80&w=150&auto=format&fit=crop" },
    { name: t('chairs'), iconUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=150&auto=format&fit=crop" },
    { name: t('desks'), iconUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=150&auto=format&fit=crop" },
    { name: t('lighting'), iconUrl: "https://images.unsplash.com/photo-1507473885765-e6ed657dc997?q=80&w=150&auto=format&fit=crop" },
    { name: t('cabinets'), iconUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=150&auto=format&fit=crop" },
    { name: t('office'), iconUrl: "https://images.unsplash.com/photo-1505797149-43b0ad7664a3?q=80&w=150&auto=format&fit=crop" },
    { name: t('accessories'), iconUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=150&auto=format&fit=crop" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-semibold text-foreground font-albert-sans"
          >
            {t('home_pages')}
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-8 gap-x-10 justify-items-center"
        >
          {categories.map((cat) => (
            <motion.div variants={itemVariants} key={cat.name}>
              <Link 
                href="#"
                className="group flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-[100px] h-[100px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src={cat.iconUrl} 
                    alt={cat.name} 
                    width={85} 
                    height={85} 
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm"
                  />
                </div>
                <span className="font-albert-sans font-medium text-foreground group-hover:text-primary transition-colors text-center text-[15px]">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
