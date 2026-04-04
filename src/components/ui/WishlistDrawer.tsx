"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';

import { useTranslation } from '@/hooks/useTranslation';
import { Price } from './Price';

export function WishlistDrawer() {
  const { items, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { isWishlistDrawerOpen, toggleWishlistDrawer, toggleCartDrawer } = useUiStore();
  const { t } = useTranslation();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    toggleWishlist(product); // remove from wishlist
    toggleWishlistDrawer();
    setTimeout(() => {
      toggleCartDrawer();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isWishlistDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={toggleWishlistDrawer}
             className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-light">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <h2 className="font-albert-sans font-semibold text-lg">{t('wishlist_title')} ({items.length})</h2>
              </div>
              <button onClick={toggleWishlistDrawer} className="p-2 hover:bg-bg-light rounded-full transition-colors">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-text-muted">
                  <Heart className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-albert-sans text-lg mb-2">{t('wishlist_empty')}</p>
                  <p className="text-sm font-roboto px-8">{t('wishlist_desc')}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-[80px] h-[100px] relative bg-bg-light rounded overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <Link href={`/product/${item.id}`} onClick={toggleWishlistDrawer} className="font-albert-sans font-medium text-[15px] leading-tight hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <button onClick={() => toggleWishlist(item)} className="text-text-muted hover:text-primary transition-colors p-1" title="Remove">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <Price amount={item.price} className="font-albert-sans font-semibold text-foreground mb-3" />
                        
                        <button 
                          onClick={() => handleMoveToCart(item)}
                          className="mt-auto w-full border border-primary text-primary hover:bg-primary hover:text-white text-[12px] font-medium py-2 rounded-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {t('add_to_cart')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
