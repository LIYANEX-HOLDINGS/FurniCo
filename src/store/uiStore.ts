import { create } from "zustand";
import { Product } from "@/data/mockProducts";

interface UiStore {
  isCartDrawerOpen: boolean;
  isWishlistDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewProduct: Product | null;
  toggleCartDrawer: () => void;
  toggleWishlistDrawer: () => void;
  toggleMobileMenu: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  closeAll: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isCartDrawerOpen: false,
  isWishlistDrawerOpen: false,
  isMobileMenuOpen: false,
  quickViewProduct: null,

  toggleCartDrawer: () => set((state) => ({ 
    isCartDrawerOpen: !state.isCartDrawerOpen,
    isWishlistDrawerOpen: false,
    isMobileMenuOpen: false 
  })),

  toggleWishlistDrawer: () => set((state) => ({ 
    isWishlistDrawerOpen: !state.isWishlistDrawerOpen,
    isCartDrawerOpen: false,
    isMobileMenuOpen: false 
  })),

  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen,
    isCartDrawerOpen: false,
    isWishlistDrawerOpen: false 
  })),

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  closeAll: () => set({
    isCartDrawerOpen: false,
    isWishlistDrawerOpen: false,
    isMobileMenuOpen: false,
    quickViewProduct: null
  })
}));
