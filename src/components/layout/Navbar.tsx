"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Pages", href: "/shop", hasDropdown: true, dropType: "mega" },
    { name: "Desks", href: "/shop?category=Office", hasDropdown: false },
    { name: "Chairs", href: "/shop?category=Chairs", hasDropdown: true, dropType: "chairs_mega" },
    { name: "Sofas", href: "/shop?category=Sofas", hasDropdown: false },
    { name: "Tables", href: "/shop?category=Tables", hasDropdown: false },
    { name: "Lighting", href: "/shop?category=Lighting", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
    { name: "Admin", href: "/admin", hasDropdown: false },
    { name: "Sale", href: "/shop?isSale=true", hasDropdown: false, isHighlight: true },
  ];

  return (
    <>
      {/* Ghost spacer to prevent layout shift when navbar becomes fixed */}
      {isScrolled && <div className="h-[60px] hidden md:block" />}
      
      <div 
        className={cn(
          "w-full border-t border-border-light bg-background z-50 hidden md:block transition-all duration-300",
          isScrolled ? "fixed top-0 shadow-md animate-in slide-in-from-top-2 border-none" : "relative"
        )}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-center h-[60px]">
          <nav className="flex space-x-8 font-albert-sans font-medium text-[15px] h-full">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative flex items-center h-full cursor-pointer"
                onMouseEnter={() => link.hasDropdown && setActiveMenu(link.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 transition-colors duration-300 h-full ${
                    link.isHighlight ? "text-[#e32c2b] hover:text-[#e32c2b]" : "text-foreground hover:text-primary"
                  } ${activeMenu === link.name ? 'text-primary' : ''}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className={cn("w-3.5 h-3.5 mt-0.5 border-none transition-transform duration-300", activeMenu === link.name && "rotate-180")} strokeWidth={2.5} />}
                </Link>

                {/* Animated Mega Menu Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && activeMenu === link.name && link.dropType === "mega" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[850px] bg-white border border-border-light shadow-2xl p-10 rounded-b-md cursor-default origin-top"
                    >
                      <div className="grid grid-cols-4 gap-8">
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-4">
                          <h4 className="text-foreground font-semibold border-b border-border-light pb-2 mb-2">Home Pages</h4>
                          <Link href="/" className="text-text-muted hover:text-primary text-sm transition-colors">Home Default</Link>
                          <Link href="/shop" className="text-text-muted hover:text-primary text-sm transition-colors">Home Clean</Link>
                          <Link href="/wishlist" className="text-text-muted hover:text-primary text-sm transition-colors">My Wishlist</Link>
                          <Link href="/admin" className="text-text-muted hover:text-primary text-sm transition-colors">Admin Dashboard</Link>
                          <Link href="/contact" className="text-text-muted hover:text-primary text-sm transition-colors">Contact Page</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="flex flex-col space-y-4">
                          <h4 className="text-foreground font-semibold border-b border-border-light pb-2 mb-2">Shop Layouts</h4>
                          <Link href="/shop" className="text-text-muted hover:text-primary text-sm transition-colors">Shop Grid</Link>
                          <Link href="/shop" className="text-text-muted hover:text-primary text-sm transition-colors">Shop List</Link>
                          <Link href="/shop" className="text-text-muted hover:text-primary text-sm transition-colors">Shop Sidebar</Link>
                          <Link href="/cart" className="text-text-muted hover:text-primary text-sm transition-colors">Cart Details</Link>
                        </div>
                        {/* Column 3 & 4 Promo Banner */}
                        <div className="col-span-2 relative h-full min-h-[160px] rounded overflow-hidden group">
                          <Image src="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop" alt="Promo" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
                          <div className="absolute bottom-4 left-4">
                            <h5 className="text-foreground font-semibold text-lg drop-shadow-sm font-albert-sans">New Autumn Collection</h5>
                            <span className="text-primary font-medium text-sm underline underline-offset-4 cursor-pointer">Shop Now</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {link.hasDropdown && activeMenu === link.name && link.dropType === "chairs_mega" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute top-[60px] left-1/2 -translate-x-[35%] w-[1100px] bg-white border border-border-light shadow-2xl p-0 rounded-b-md cursor-default origin-top flex flex-col"
                    >
                      {/* Top Categories Row */}
                      <div className="flex justify-between items-center px-10 py-8 border-b border-border-light bg-[#fdfdfd]">
                        {[
                          { name: "Sofas", icon: "Sofa" }, { name: "Wardrobes", icon: "Wardrobe" },
                          { name: "Chairs", icon: "Chair" }, { name: "Desks", icon: "Desk" },
                          { name: "Tables", icon: "Table" }, { name: "Lighting", icon: "Lamp" },
                          { name: "Cabinets", icon: "Cabinet" }, { name: "Office", icon: "Office" },
                          { name: "Accessories", icon: "Vase" }
                        ].map(c => (
                          <div key={c.name} className="flex flex-col items-center gap-3 cursor-pointer group">
                            <div className="w-[60px] h-[60px] flex items-center justify-center transition-transform group-hover:scale-110">
                              <Image src={`https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=150&auto=format&fit=crop`} alt={c.name} width={50} height={50} className="object-contain drop-shadow-sm" />
                            </div>
                            <span className="text-[12px] font-albert-sans font-semibold text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-4 gap-8 px-10 py-8">
                        {/* Products List */}
                        <div className="flex flex-col">
                          <h4 className="text-foreground font-semibold text-[15px] mb-4 font-albert-sans">Products</h4>
                          <div className="flex flex-col gap-3">
                            {["Desks", "Chairs", "Sofas", "Storage", "Tables", "Lighting", "Office", "Accessories"].map(item => (
                              <Link key={item} href={`/shop?category=${item}`} className="text-text-muted hover:text-primary text-[14px] font-medium transition-colors">{item}</Link>
                            ))}
                          </div>
                        </div>

                        {/* Colors */}
                        <div className="flex flex-col">
                          <h4 className="text-foreground font-semibold text-[15px] mb-4 font-albert-sans">Colors</h4>
                          <div className="flex flex-col gap-3">
                            {[
                              { name: 'Beige', hex: '#d4cbb8' }, { name: 'Black', hex: '#000000' },
                              { name: 'Blue', hex: '#2f4f6b' }, { name: 'Brown', hex: '#63493e' },
                              { name: 'Green', hex: '#1ba366' }
                            ].map(color => (
                              <div key={color.name} onClick={() => window.location.href = `/shop?category=All&color=${color.name}`} className="flex items-center gap-3 border border-border-light rounded-full px-4 py-1.5 w-fit hover:border-foreground cursor-pointer transition-colors">
                                <span className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color.hex }} />
                                <span className="text-[13px] font-medium text-foreground">{color.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Style Pill Grid */}
                        <div className="flex flex-col">
                          <h4 className="text-foreground font-semibold text-[15px] mb-4 font-albert-sans">Style</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Single", "Double", "Long", "Modern", "Armchair", "Chairs", "Handing", "Stool"].map(style => (
                              <div key={style} className="flex items-center gap-2 border border-border-light rounded-full px-4 py-2 hover:border-primary hover:text-primary cursor-pointer transition-colors bg-[#f9f9f9] hover:bg-white text-foreground text-[13px] font-medium">
                                <span className="w-5 h-5 flex items-center justify-center opacity-60">S</span>
                                {style}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bestsellers Mini Cards */}
                        <div className="flex flex-col">
                          <h4 className="text-foreground font-semibold text-[15px] mb-4 font-albert-sans">Bestsellers</h4>
                          <div className="flex flex-col gap-5">
                            {[
                              { brand: "IdeaInstitute", name: "Avyanna Occasional Chair", price: 202, oldPrice: 250, badge: "-22%" },
                              { brand: "ComDell", name: "Armless Twin Size Floor Sofa", price: 1499, oldPrice: 2006, badge: "-25%" },
                              { brand: "ComDell", name: "Valdez 3 Seater Sofa", price: 599, oldPrice: 786, badge: "-24%" }
                            ].map((prod, i) => (
                              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-[70px] h-[70px] bg-[#f5f5f5] rounded relative overflow-hidden shrink-0">
                                  <Image src={`https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=150&auto=format&fit=crop`} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                  <span className="absolute bottom-1 right-1 bg-[#e74c3c] text-white text-[9px] font-bold px-1 py-0.5 rounded-full z-10">{prod.badge}</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                  <span className="text-[10px] text-[#888888] uppercase font-roboto tracking-wider mb-0.5">{prod.brand}</span>
                                  <span className="text-[13px] font-albert-sans text-foreground font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">{prod.name}</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[13px] font-semibold text-[#e74c3c] font-albert-sans">${prod.price.toFixed(2)}</span>
                                    <span className="text-[11px] text-[#999999] line-through font-medium">${prod.oldPrice.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Bridge to catch cursor to prevent accidental closing */}
                {link.hasDropdown && (
                  <div className="absolute top-[50px] left-0 w-[150%] h-[15px] bg-transparent pointer-events-none group-hover:pointer-events-auto" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
