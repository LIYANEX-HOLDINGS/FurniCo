import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./cartStore";
import { useWishlistStore } from "./wishlistStore";
import { useProductStore } from "./productStore";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (credential: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;

  // Server-sync helpers (call after login to restore cart/wishlist)
  syncCartToServer: (items: any[]) => Promise<void>;
  syncWishlistToServer: (productIds: string[]) => Promise<void>;
  fetchServerCart: () => Promise<any[]>;
  fetchServerWishlist: () => Promise<string[]>;
}

const hydrateStores = async (getFn: () => AuthState) => {
  try {
    const userCart = await getFn().fetchServerCart();
    useCartStore.getState().setCart(userCart);

    const userWishlistIds = await getFn().fetchServerWishlist();
    if (useProductStore.getState().products.length === 0) {
      await useProductStore.getState().fetchProducts();
    }
    const products = useProductStore.getState().products;
    const hydratedWishlist = products.filter(p => userWishlistIds.includes(p.id));
    useWishlistStore.getState().setWishlist(hydratedWishlist);
  } catch (err) {
    console.error("Hydration failed", err);
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ isLoading: false, error: data.message });
            return false;
          }
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          await hydrateStores(get);
          return true;
        } catch (err: any) {
          set({ isLoading: false, error: err.message });
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ isLoading: false, error: data.message });
            return false;
          }
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          await hydrateStores(get);
          return true;
        } catch (err: any) {
          set({ isLoading: false, error: err.message });
          return false;
        }
      },

      loginWithGoogle: async (credential) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ isLoading: false, error: data.message });
            return false;
          }
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          await hydrateStores(get);
          return true;
        } catch (err: any) {
          set({ isLoading: false, error: err.message });
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
        useCartStore.getState().setCart([]);
        useWishlistStore.getState().setWishlist([]);
      },

      clearError: () => set({ error: null }),

      syncCartToServer: async (items) => {
        const token = get().token;
        if (!token) return;
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ items }),
        });
      },

      syncWishlistToServer: async (productIds) => {
        const token = get().token;
        if (!token) return;
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ productIds }),
        });
      },

      fetchServerCart: async () => {
        const token = get().token;
        if (!token) return [];
        try {
          const res = await fetch("/api/cart", { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          return data.items ?? [];
        } catch {
          return [];
        }
      },

      fetchServerWishlist: async () => {
        const token = get().token;
        if (!token) return [];
        try {
          const res = await fetch("/api/wishlist", { headers: { Authorization: `Bearer ${token}` } });
          const data = await res.json();
          return data.productIds ?? [];
        } catch {
          return [];
        }
      },
    }),
    { name: "cozycorner-auth" }
  )
);
