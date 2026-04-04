"use client"
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { currencies } from "@/lib/currency";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeaderTopBar() {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency } = useAppStore();
  const { t } = useTranslation();

  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (currRef.current && !currRef.current.contains(e.target as Node)) setCurrencyOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const languages = [
    { label: "English", code: "en" },
    { label: "සිංහල (Sinhala)", code: "si" },
    { label: "Français", code: "fr" },
    { label: "Español", code: "es" },
    { label: "Deutsch", code: "de" },
    { label: "العربية (Arabic)", code: "ar" },
    { label: "日本語 (Japanese)", code: "ja" },
    { label: "中文 (Chinese)", code: "zh" },
    { label: "Русский (Russian)", code: "ru" },
    { label: "Italiano (Italian)", code: "it" },
    { label: "हिन्दी (Hindi)", code: "hi" },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <div className="w-full border-b border-border-light bg-background hidden md:block relative z-[100] transition-all duration-300">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-[42px] text-sm text-text-muted font-roboto">
        {/* Left Side */}
        <div className="flex items-center">
          <span>
            {t('promo_text')} <span className="text-primary font-medium hover:underline cursor-pointer">-20%</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link href="/about" className="hover:text-primary transition-colors">
              {t('about')}
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              {t('blog')}
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              {t('contact')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4 border-l border-border-light pl-6 h-[42px]">
            {/* Language Dropdown */}
            <div className="relative h-full flex items-center" ref={langRef}>
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 cursor-pointer hover:text-primary group outline-none min-w-[100px] h-full justify-end"
              >
                <span>{languages.find(l => l.code === language)?.label}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", langOpen && "rotate-180")} />
              </button>
              {langOpen && (
                <div className="absolute top-[calc(100%+4px)] right-0 w-52 max-h-[400px] overflow-y-auto bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl py-2 animate-in fade-in slide-in-from-top-1 duration-200 z-[110] scrollbar-hide">
                  {languages.map(l => (
                    <button 
                      key={l.code}
                      onClick={() => { setLanguage(l.code as any); setLangOpen(false); }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left text-[13px]",
                        language === l.code ? "text-primary font-semibold bg-primary/5" : "text-text-muted hover:text-primary"
                      )}
                    >
                      {l.label}
                      {language === l.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Dropdown */}
            <div className="relative h-full flex items-center" ref={currRef}>
              <button 
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center space-x-1 cursor-pointer hover:text-primary group outline-none min-w-[80px] justify-end h-full"
              >
                <span className="font-medium tracking-tight whitespace-nowrap">{currentCurrency.symbol} {currentCurrency.code}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", currencyOpen && "rotate-180")} />
              </button>
              {currencyOpen && (
                <div className="absolute top-[calc(100%+4px)] right-0 w-64 max-h-[400px] overflow-y-auto bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl py-2 animate-in fade-in slide-in-from-top-1 duration-200 z-[110] scrollbar-hide">
                  <div className="px-4 py-2 mb-1 border-b border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t('currency_label')}
                  </div>
                  {currencies.map(c => (
                    <button 
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left text-[13px] group/item",
                        currency === c.code ? "text-primary font-semibold bg-primary/5" : "text-text-muted hover:text-primary"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                          currency === c.code ? "bg-primary text-white" : "bg-gray-100 text-text-muted group-hover/item:bg-primary/10 group-hover/item:text-primary"
                        )}>
                          {c.symbol}
                        </span>
                        <span>{t(c.nameKey)}</span>
                      </span>
                      {currency === c.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
