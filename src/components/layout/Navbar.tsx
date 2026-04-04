"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, Heart, ShoppingBag, Menu, User, LogOut, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";
import { Price } from "../ui/Price";

export default function Navbar() {
  const { t, language } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = [
    { name: t('home'), href: "/", hasMega: true, megaType: 'home' },
    { name: t('shop'), href: "/shop", hasMega: true, megaType: 'shop' },
    { name: t('chairs'), href: "/shop?category=Chairs" },
    { name: t('sofas'), href: "/shop?category=Sofas" },
    { name: t('tables'), href: "/shop?category=Tables" },
    { name: t('lighting'), href: "/shop?category=Lighting" },
    { name: t('office'), href: "/shop?category=Office" },
    { name: t('storage'), href: "/shop?category=Storage" },
    { name: t('accessories'), href: "/shop?category=Accessories" },
    { name: t('sale'), href: "/shop?isSale=true", highlight: true },
  ];

  return (
    <nav className="hidden md:block border-y border-border-light bg-white sticky top-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="h-full group flex items-center relative"
                onMouseEnter={() => item.hasMega ? setActiveMenu(item.megaType || null) : setActiveMenu(null)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "font-albert-sans font-bold text-[13px] uppercase tracking-wider transition-colors flex items-center gap-1.5 h-full border-b-2 border-transparent hover:text-primary",
                    item.highlight ? "text-[#e32c2b]" : "text-foreground",
                    activeMenu === item.megaType && "text-primary border-primary"
                  )}
                >
                  {item.name}
                  {item.hasMega && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Mega Menu Dropdowns */}
                {item.hasMega && activeMenu === item.megaType && (
                  <div className="absolute top-[60px] left-0 w-[800px] bg-white border border-border-light shadow-2xl rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[110]">
                    {item.megaType === 'home' ? (
                      <div className="grid grid-cols-4 p-8 gap-8">
                        <div className="flex flex-col gap-4">
                          <h4 className="text-foreground font-bold text-[14px] mb-2 uppercase tracking-widest border-b border-border-light pb-2">{t('home_pages')}</h4>
                          <div className="flex flex-col gap-3 font-roboto text-[13px] text-text-muted">
                            <Link href="/" className="hover:text-primary transition-colors">{t('home_default')}</Link>
                            <Link href="/" className="hover:text-primary transition-colors">{t('home_clean')}</Link>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-foreground font-bold text-[14px] mb-2 uppercase tracking-widest border-b border-border-light pb-2">{t('shop_layouts')}</h4>
                          <div className="flex flex-col gap-3 font-roboto text-[13px] text-text-muted">
                            <Link href="/shop" className="hover:text-primary transition-colors">{t('shop_grid')}</Link>
                            <Link href="/shop" className="hover:text-primary transition-colors">{t('shop_list')}</Link>
                            <Link href="/shop" className="hover:text-primary transition-colors">{t('shop_sidebar')}</Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12">
                        <div className="col-span-8 p-10 grid grid-cols-3 gap-10">
                          {/* Categories column */}
                          <div className="flex flex-col">
                            <h4 className="text-foreground font-bold text-[14px] mb-5 uppercase tracking-widest border-b border-border-light pb-2">{t('all_categories')}</h4>
                            <div className="flex flex-col gap-3.5 font-roboto text-[13px] text-text-muted">
                              <Link href="/shop?category=Chairs" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('chairs')}
                              </Link>
                              <Link href="/shop?category=Sofas" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('sofas')}
                              </Link>
                              <Link href="/shop?category=Tables" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('tables')}
                              </Link>
                              <Link href="/shop?category=Lighting" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('lighting')}
                              </Link>
                              <Link href="/shop?category=Office" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('office')}
                              </Link>
                              <Link href="/shop?category=Storage" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('storage')}
                              </Link>
                              <Link href="/shop?category=Accessories" className="hover:text-primary transition-colors flex items-center gap-2 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-border-light group-hover/link:bg-primary transition-colors" /> {t('accessories')}
                              </Link>
                            </div>
                          </div>

                          {/* Style/Colors column */}
                          <div className="flex flex-col">
                            <h4 className="text-foreground font-bold text-[14px] mb-5 uppercase tracking-widest border-b border-border-light pb-2">{t('style')}</h4>
                            <div className="flex flex-wrap gap-2.5">
                              {[
                                { name: t('blue'), hex: "#2563eb", key: "blue" },
                                { name: t('beige'), hex: "#d4cdb3", key: "beige" },
                                { name: t('pink'), hex: "#f9a8d4", key: "pink" },
                                { name: t('green'), hex: "#3a7d44", key: "green" },
                                { name: t('black'), hex: "#000000", key: "black" },
                                { name: t('brown'), hex: "#8b4513", key: "brown" }
                              ].map(color => (
                                <div key={color.key} onClick={() => window.location.href = `/shop?category=All&color=${color.key}`} className="flex items-center gap-3 border border-border-light rounded-full px-4 py-1.5 w-fit hover:border-foreground cursor-pointer transition-colors">
                                  <span className="w-4 h-4 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color.hex }} />
                                  <span className="text-[13px] font-medium text-foreground">{color.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bestsellers Mini Cards */}
                          <div className="flex flex-col">
                            <h4 className="text-foreground font-bold text-[14px] mb-5 uppercase tracking-widest border-b border-border-light pb-2">{t('bestsellers')}</h4>
                            <div className="flex flex-col gap-6">
                              {[
                                { brand: "IdeaInstitute", name: "Avyanna Occasional Chair", price: 202, oldPrice: 250, badge: "-22%" },
                                { brand: "ComDell", name: "Valdez 3 Seater Sofa", price: 599, oldPrice: 786, badge: "-24%" }
                              ].map((prod, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                  <div className="w-[80px] h-[80px] bg-[#f5f5f5] rounded-lg relative overflow-hidden shrink-0 border border-border-light">
                                    <Image src={`https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=150&auto=format&fit=crop`} alt={prod.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <span className="absolute bottom-2 right-2 bg-[#e74c3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">{prod.badge}</span>
                                  </div>
                                  <div className="flex flex-col justify-center gap-1">
                                    <span className="text-[11px] text-primary uppercase font-roboto font-bold tracking-widest">{prod.brand}</span>
                                    <span className="text-[13px] font-albert-sans text-foreground font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">{prod.name}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Price amount={prod.price} className="text-[13px] font-bold text-[#e74c3c] font-albert-sans" />
                                      <Price amount={prod.oldPrice} className="text-[11px] text-gray-400 line-through font-medium" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Banner Side */}
                        <div className="col-span-4 bg-gray-50 border-l border-border-light p-10 flex flex-col justify-center relative overflow-hidden group/banner">
                          <Image 
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop" 
                            alt="Navbar Banner"
                            fill
                            className="object-cover opacity-10 group-hover/banner:scale-110 transition-transform duration-[2s]"
                          />
                          <div className="relative z-10">
                            <span className="text-primary font-bold text-[12px] uppercase tracking-[0.2em] mb-4 block">{t('new')}</span>
                            <h3 className="text-2xl font-bold font-albert-sans text-foreground mb-6 leading-tight">
                              {t('banner_title_2')}
                            </h3>
                            <Link href="/shop" className="bg-primary text-white text-[12px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-black transition-colors inline-block shadow-lg shadow-primary/20">
                              {t('shop_now')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
