"use client"
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const links = [
    { name: "All Products", href: "/shop", hasDropdown: false },
    { name: "Chairs", href: "/shop?category=Chairs", hasDropdown: false },
    { name: "Sofas", href: "/shop?category=Sofas", hasDropdown: false },
    { name: "Tables", href: "/shop?category=Tables", hasDropdown: false },
    { name: "Lighting", href: "/shop?category=Lighting", hasDropdown: false },
    { name: "Admin", href: "/admin", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
    { name: "Sale", href: "/shop?isSale=true", hasDropdown: false, highlight: true },
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
            className="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white z-[101] shadow-2xl flex flex-col md:hidden font-albert-sans overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-border-light bg-bg-light">
              <span className="font-bold text-lg text-foreground uppercase tracking-wider">Menu</span>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-text-muted hover:text-foreground hover:scale-105 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col py-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between px-6 py-4 border-b border-border-light hover:bg-bg-light transition-colors"
                  onClick={onClose}
                >
                  <span className={`font-medium ${link.highlight ? 'text-[#e32c2b]' : 'text-foreground'}`}>
                    {link.name}
                  </span>
                  {link.hasDropdown && <ChevronRight className="w-4 h-4 text-text-muted" />}
                </Link>
              ))}
            </div>
            
            <div className="p-6 bg-bg-light border-t border-border-light mt-auto">
              <div className="flex flex-col gap-3 font-roboto text-sm text-text-muted">
                <p>Call us: <span className="text-foreground font-medium">+1-202-555-0172</span></p>
                <Link href="#" className="hover:text-primary transition-colors">Language: English</Link>
                <Link href="#" className="hover:text-primary transition-colors">Currency: $ USD</Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
