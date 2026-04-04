"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Price } from "@/components/ui/Price";

export default function CartPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const { token } = useAuthStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        shippingDetails: {
          fullName: "Demo User", // Placeholder for now
          email: "demo@example.com",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA"
        },
        pricing: {
          subtotal: getCartTotal(),
          shipping: 0,
          tax: 0,
          total: getCartTotal()
        }
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        clearCart();
        router.push("/orders");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-10">{t('cart_title')}</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-bg-light rounded-sm">
            <h2 className="text-2xl font-albert-sans mb-4">{t('cart_empty_msg')}</h2>
            <Link href="/shop" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {t('return_to_shop')}
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
                      <Price 
                        amount={item.price * item.quantity} 
                        className="font-albert-sans font-bold text-xl" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[400px]">
              <div className="bg-[#f9f9f9] border border-border-light rounded p-8 sticky top-[100px]">
                <h3 className="font-albert-sans font-semibold text-2xl mb-6 border-b border-border-light pb-4">{t('order_summary')}</h3>
                <div className="flex items-center justify-between mb-4 text-text-muted">
                  <span>{t('subtotal')}</span>
                  <Price amount={getCartTotal()} className="font-medium text-foreground" />
                </div>
                <div className="flex items-center justify-between mb-6 text-text-muted">
                  <span>{t('shipping_label')}</span>
                  <span>{t('calc_at_checkout')}</span>
                </div>
                <div className="flex items-center justify-between mb-8 border-t border-border-light pt-6">
                  <span className="font-bold font-albert-sans text-xl">{t('total_label')}</span>
                  <Price amount={getCartTotal()} className="font-bold font-albert-sans text-2xl tracking-tighter" />
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary text-white hover:bg-primary-hover transition-colors font-albert-sans font-semibold text-[15px] py-4 rounded shadow-sm disabled:opacity-50"
                >
                  {isCheckingOut ? t('processing') : t('proceed_to_checkout')}
                </button>
                <div className="mt-6 flex justify-center">
                  <Link href="/shop" className="text-text-muted hover:text-primary text-sm font-medium transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('continue_shopping')}
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
