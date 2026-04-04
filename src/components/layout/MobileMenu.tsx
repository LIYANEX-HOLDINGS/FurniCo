"use client"
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/store/appStore";
import { currencies } from "@/lib/currency";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user } = useAuthStore();
  const { t, language } = useTranslation();
  const { currency } = useAppStore();

  const langLabels: Record<string, string> = {
    en: "English", si: "සිංහල", fr: "Français", es: "Español",
    de: "Deutsch", ar: "العربية", ja: "日本語", zh: "中文",
    ru: "Русский", it: "Italiano", hi: "हिन्दी"
  };

  const currentLangLabel = langLabels[language] || "English";
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const links = [
    { name: t('home'), href: "/", hasDropdown: false },
    { name: t('shop'), href: "/shop", hasDropdown: false },
    { name: t('chairs'), href: "/shop?category=Chairs", hasDropdown: false },
    { name: t('sofas'), href: "/shop?category=Sofas", hasDropdown: false },
    { name: t('tables'), href: "/shop?category=Tables", hasDropdown: false },
    { name: t('lighting'), href: "/shop?category=Lighting", hasDropdown: false },
    { name: t('office'), href: "/shop?category=Office", hasDropdown: false },
    { name: t('storage'), href: "/shop?category=Storage", hasDropdown: false },
    { name: t('accessories'), href: "/shop?category=Accessories", hasDropdown: false },
    { name: t('about'), href: "/about", hasDropdown: false },
    { name: t('blog'), href: "/blog", hasDropdown: false },
    ...(user?.role === "admin" ? [{ name: t('admin'), href: "/admin", hasDropdown: false }] : []),
    { name: t('contact'), href: "/contact", hasDropdown: false },
    { name: t('sale'), href: "/shop?isSale=true", hasDropdown: false, highlight: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm md:hidden"
          />

          {/* Sliding Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white z-[101] shadow-[0_0_50px_rgba(0,0,0,0.2)] flex flex-col md:hidden font-albert-sans overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-border-light bg-gray-50/50">
              <span className="font-bold text-lg text-foreground uppercase tracking-wider">{t('menu_title')}</span>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-text-muted hover:text-foreground hover:scale-105 transition-all border border-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col py-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between px-7 py-4.5 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  onClick={onClose}
                >
                  <span className={cn(
                    "font-bold text-[14px] transition-colors",
                    link.highlight ? 'text-[#e32c2b]' : 'text-foreground group-hover:text-primary'
                  )}>
                    {link.name}
                  </span>
                  {link.hasDropdown && <ChevronRight className="w-4 h-4 text-text-muted" />}
                </Link>
              ))}
            </div>
            
            <div className="p-8 bg-gray-50 border-t border-border-light mt-auto">
              <div className="flex flex-col gap-4 font-roboto text-sm text-text-muted">
                <p className="flex items-center gap-2">{t('call_us')}: <span className="text-foreground font-bold underline">+1-202-555-0172</span></p>
                <div className="flex flex-col gap-2 border-t border-gray-200 pt-5 mt-2">
                   <div className="flex items-center justify-between">
                     <span>{t('language_label')}:</span>
                     <span className="text-foreground font-bold">{currentLangLabel}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span>{t('currency_label')}:</span>
                     <span className="text-foreground font-bold">{t(currentCurrency.nameKey)} ({currentCurrency.symbol})</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
