import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockProducts, Product } from "@/data/mockProducts";

export interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetDatabase: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      // Initially populate the store with the dummy static logic from Phase 2
      products: mockProducts,

      addProduct: (newProductData) => {
        set((state) => {
          // Generate an absolutely mock "unique" ID based on MS time
          const id = `p-${new Date().getTime()}`;
          const newProduct: Product = { ...newProductData, id };
          return { products: [newProduct, ...state.products] };
        });
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedFields } : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      // Fallback utility to wipe everything and restart
      resetDatabase: () => set({ products: mockProducts }),
    }),
    {
      name: "cozycorner-product-db", // LocalStorage key mapping
    }
  )
);
