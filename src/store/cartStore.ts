import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/mockProducts";
import { useAuthStore } from "./authStore";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      setCart: (items) => {
        set({ items });
      },

      addToCart: (product, quantity = 1) => {
        set((state) => {
          let newItems;
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { ...product, quantity }];
          }
          
          if (useAuthStore.getState().isAuthenticated) {
            useAuthStore.getState().syncCartToServer(newItems);
          }
          return { items: newItems };
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          if (useAuthStore.getState().isAuthenticated) {
            useAuthStore.getState().syncCartToServer(newItems);
          }
          return { items: newItems };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          if (useAuthStore.getState().isAuthenticated) {
            useAuthStore.getState().syncCartToServer(newItems);
          }
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
        if (useAuthStore.getState().isAuthenticated) {
          useAuthStore.getState().syncCartToServer([]);
        }
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cozycorner-cart", // LocalStorage key
    }
  )
);
