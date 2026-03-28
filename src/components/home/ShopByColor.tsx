"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopByColor() {
  const colorTiles = [
    { title: "Blue", hex: "bg-blue-600", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop" },
    { title: "Beige", hex: "bg-[#d4cdb3]", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop" },
    { title: "Pink", hex: "bg-pink-300", image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=600&auto=format&fit=crop" },
    { title: "Green", hex: "bg-primary", image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=600&auto=format&fit=crop" },
  ];

  const swatches = [
    { name: "Black", bg: "bg-black" },
    { name: "Brown", bg: "bg-[#8b4513]" },
    { name: "Teal", bg: "bg-teal-600" },
    { name: "White", bg: "bg-white border border-gray-300" },
    { name: "Orange", bg: "bg-orange-500" },
    { name: "Burgundy Red", bg: "bg-[#800020]" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground font-albert-sans mb-4">
            Shop by Color
          </h2>
          <p className="text-text-muted font-roboto">
            Find the perfect hue for your home. Browse our collections categorized by distinctive color palettes.
          </p>
        </motion.div>

        {/* Big Grid Images */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {colorTiles.map((tile) => (
            <motion.div variants={itemVariants} key={tile.title}>
              <Link href="#" className="group relative aspect-square overflow-hidden rounded-lg block">
                <Image
                  src={tile.image}
                  alt={`${tile.title} Room`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className={`w-4 h-4 rounded-full ${tile.hex} ring-2 ring-white shadow-sm`} />
                  <span className="text-white font-albert-sans font-medium text-lg capitalize drop-shadow-md">
                    {tile.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Small Swatches */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {swatches.map((swatch) => (
            <Link key={swatch.name} href="#" className="group flex flex-col items-center gap-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${swatch.bg} shadow-sm group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-roboto text-text-muted group-hover:text-foreground transition-colors">
                {swatch.name}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
