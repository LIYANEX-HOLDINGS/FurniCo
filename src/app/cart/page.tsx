"use client"
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-10">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-bg-light rounded-sm">
            <h2 className="text-2xl font-albert-sans mb-4">Your cart is currently empty.</h2>
            <Link href="/shop" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Return to shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 w-full flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 border border-border-light rounded-sm bg-white">
                  <div className="w-[120px] h-[150px] relative bg-bg-light rounded overflow-hidden shrink-0 mx-auto sm:mx-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[12px] text-text-muted uppercase tracking-wider mb-1 block">{item.brand}</span>
                        <Link href={`/product/${item.id}`} className="font-albert-sans font-semibold text-lg hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-text-muted hover:text-[#e74c3c] transition-colors p-2 bg-bg-light rounded-full">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center border border-border-light rounded px-2 bg-bg-light">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-primary transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold font-roboto">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-primary transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-albert-sans font-bold text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[400px]">
              <div className="bg-[#f9f9f9] border border-border-light rounded p-8 sticky top-[100px]">
                <h3 className="font-albert-sans font-semibold text-2xl mb-6 border-b border-border-light pb-4">Order Summary</h3>
                <div className="flex items-center justify-between mb-4 text-text-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-6 text-text-muted">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between mb-8 border-t border-border-light pt-6">
                  <span className="font-bold font-albert-sans text-xl">Total</span>
                  <span className="font-bold font-albert-sans text-2xl tracking-tighter">${getCartTotal().toFixed(2)}</span>
                </div>
                <button className="w-full bg-primary text-white hover:bg-primary-hover transition-colors font-albert-sans font-semibold text-[15px] py-4 rounded shadow-sm">
                  Proceed to Checkout
                </button>
                <div className="mt-6 flex justify-center">
                  <Link href="/shop" className="text-text-muted hover:text-primary text-sm font-medium transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
