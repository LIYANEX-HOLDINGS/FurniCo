import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { Users, Camera, MessageSquare, PinIcon as Pinterest, Home } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
              <div className="text-primary">
                <Home className="w-8 h-8 md:w-10 md:h-10 fill-current" />
              </div>
              <div className="flex flex-col font-albert-sans font-bold leading-none tracking-tight">
                <span className="text-base md:text-xl text-white uppercase">Cozy</span>
                <span className="text-base md:text-xl text-white uppercase">Corner</span>
              </div>
            </Link>
            
            <p className="text-[#a0a0a0] font-roboto text-sm max-w-xs leading-relaxed">
              {t('footer_desc')}
            </p>
            
            <div className="flex items-center space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-[#a0a0a0]">
                <Camera className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-[#a0a0a0]">
                <MessageSquare className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-[#a0a0a0]">
                <Users className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-[#a0a0a0]">
                <Pinterest className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-6">
            <h4 className="font-albert-sans font-medium text-lg">{t('shop')}</h4>
            <ul className="space-y-3 font-roboto text-sm text-[#a0a0a0]">
              <li><Link href="/shop?category=Office" className="hover:text-primary transition-colors">{t('desks')}</Link></li>
              <li><Link href="/shop?category=Chairs" className="hover:text-primary transition-colors">{t('chairs')}</Link></li>
              <li><Link href="/shop?category=Sofas" className="hover:text-primary transition-colors">{t('sofas')}</Link></li>
              <li><Link href="/shop?category=Tables" className="hover:text-primary transition-colors">{t('tables')}</Link></li>
              <li><Link href="/shop?category=Lighting" className="hover:text-primary transition-colors">{t('lighting')}</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-6">
            <h4 className="font-albert-sans font-medium text-lg">{t('about')}</h4>
            <ul className="space-y-3 font-roboto text-sm text-[#a0a0a0]">
              <li><Link href="/about" className="hover:text-primary transition-colors">{t('story')}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{t('community')}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{t('quality')}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">{t('sustainability')}</Link></li>
            </ul>
          </div>

          {/* Links 3 - Help */}
          <div className="space-y-6">
            <h4 className="font-albert-sans font-medium text-lg">{t('useful_links')}</h4>
            <ul className="space-y-3 font-roboto text-sm text-[#a0a0a0]">
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('contact_us')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('faq')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('tracking')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{t('shipping')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[#1e1e1e] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#666666] font-roboto text-sm">
            {t('copyright').replace('%d', new Date().getFullYear().toString())}
          </p>
          <div className="flex gap-2">
            {/* Payment icons placeholder */}
            <div className="w-10 h-6 bg-[#1e1e1e] rounded flex justify-center items-center text-[#666] text-[10px]">VISA</div>
            <div className="w-10 h-6 bg-[#1e1e1e] rounded flex justify-center items-center text-[#666] text-[10px]">MC</div>
            <div className="w-10 h-6 bg-[#1e1e1e] rounded flex justify-center items-center text-[#666] text-[10px]">PP</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
