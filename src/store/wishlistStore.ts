import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/mockProducts";
import { useAuthStore } from "./authStore";

interface WishlistStore {
  items: Product[];
  setWishlist: (items: Product[]) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      setWishlist: (items) => {
        set({ items });
      },

      toggleWishlist: (product) => {
        set((state) => {
          let newItems;
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            newItems = state.items.filter((item) => item.id !== product.id);
          } else {
            newItems = [...state.items, product];
          }

          if (useAuthStore.getState().isAuthenticated) {
            useAuthStore.getState().syncWishlistToServer(newItems.map(item => item.id));
          }
          return { items: newItems };
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
        if (useAuthStore.getState().isAuthenticated) {
          useAuthStore.getState().syncWishlistToServer([]);
        }
      },
    }),
    {
      name: "cozycorner-wishlist", // LocalStorage key
    }
  )
);
