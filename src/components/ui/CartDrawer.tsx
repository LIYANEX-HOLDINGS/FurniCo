"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';

import { useTranslation } from '@/hooks/useTranslation';
import { Price } from './Price';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const { isCartDrawerOpen, toggleCartDrawer } = useUiStore();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
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
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-albert-sans font-semibold text-lg">{t('cart_title')} ({items.length})</h2>
              </div>
              <button onClick={toggleCartDrawer} className="p-2 hover:bg-bg-light rounded-full transition-colors">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-text-muted">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-albert-sans text-lg mb-2">{t('cart_empty')}</p>
                  <button onClick={toggleCartDrawer} className="text-primary hover:underline font-medium">{t('continue_shopping')}</button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-[80px] h-[100px] relative bg-bg-light rounded overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link href={`/product/${item.id}`} onClick={toggleCartDrawer} className="font-albert-sans font-medium text-[15px] leading-tight hover:text-primary transition-colors line-clamp-2">
                              {item.name}
                            </Link>
                            <button onClick={() => removeFromCart(item.id)} className="text-text-muted hover:text-[#e74c3c] transition-colors p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[12px] text-text-muted block mt-1">{item.brand}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border-light rounded-sm">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-bg-light transition-colors text-text-muted">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium font-roboto text-[13px]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-bg-light transition-colors text-text-muted">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <Price amount={item.price * item.quantity} className="font-albert-sans font-semibold text-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border-light p-5 bg-[#fdfdfd]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-roboto text-text-muted font-medium">{t('subtotal')}</span>
                  <Price amount={getCartTotal()} className="font-albert-sans font-bold text-xl" />
                </div>
                <p className="text-[12px] text-text-muted mb-4 font-roboto">{t('checkout_msg')}</p>
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-foreground text-white font-albert-sans font-medium hover:bg-primary transition-colors py-3.5 rounded-sm">
                    {t('view_cart')}
                  </button>
                  <button className="w-full bg-primary text-white font-albert-sans font-medium hover:bg-[#168a55] transition-colors py-3.5 rounded-sm">
                    {t('checkout')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
