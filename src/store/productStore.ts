import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/mockProducts";

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetDatabase: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,

      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("/api/products");
          const data = await res.json();
          if (data && Array.isArray(data.products)) {
            set({ products: data.products, isLoading: false });
          } else if (Array.isArray(data)) {
            set({ products: data, isLoading: false }); // Fallback
          } else {
            set({ error: "Failed to fetch products", isLoading: false });
          }
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      addProduct: async (newProductData) => {
        set({ isLoading: true });
        try {
          const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProductData),
          });
          const json = await res.json();
          const newProduct = json.product || json;
          set((state) => ({
            products: [newProduct, ...state.products],
            isLoading: false,
          }));
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateProduct: async (id, updatedFields) => {
        // Note: For now, local update + API call (placeholder for PATCH /api/products/[id])
        set((state) => ({
          products: state.products.map((product) =>
            (product as any)._id === id || product.id === id ? { ...product, ...updatedFields } : product
          ),
        }));
      },

      deleteProduct: async (id) => {
        // Local removal for now
        set((state) => ({
          products: state.products.filter((product) => (product as any)._id !== id && product.id !== id),
        }));
      },

      resetDatabase: () => {
        fetch("/api/seed").then(() => get().fetchProducts());
      },
    }),
    {
      name: "cozycorner-product-db",
    }
  )
);
