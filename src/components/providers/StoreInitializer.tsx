"use client"
import { useEffect, useRef } from "react";
import { useProductStore } from "@/store/productStore";
import { useCmsStore } from "@/store/cmsStore";

export default function StoreInitializer() {
  const initialized = useRef(false);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCMS = useCmsStore((state) => state.fetchCMS);

  useEffect(() => {
    if (!initialized.current) {
      console.log("Initializing Stores from MongoDB Atlas...");
      fetchProducts();
      fetchCMS();
      initialized.current = true;
    }
  }, [fetchProducts, fetchCMS]);

  return null;
}
