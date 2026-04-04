import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface FeaturedOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  bgColor?: string;
}

export interface CmsState {
  heroSlides: HeroSlide[];
  testimonials: Testimonial[];
  brands: string[];
  dealDay: {
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    endTime: string;
    price: number;
    oldPrice: number;
  };
  inspiration: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  latestProducts: {
    title: string;
    count: number;
  };
  featuredOffers: FeaturedOffer[];
  isLoading: boolean;
  error: string | null;

  fetchCMS: () => Promise<void>;
  updateCMS: (data: Partial<CmsState>) => Promise<void>;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateBrands: (brands: string[]) => void;
  updateDealDay: (deal: CmsState["dealDay"]) => void;
  updateInspiration: (inspiration: CmsState["inspiration"]) => void;
  updateLatestProducts: (latestProducts: CmsState["latestProducts"]) => void;
  updateFeaturedOffers: (featuredOffers: FeaturedOffer[]) => void;
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set, get) => ({
      heroSlides: [],
      testimonials: [],
      brands: [],
      dealDay: {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        endTime: new Date().toISOString(),
        price: 0,
        oldPrice: 0,
      },
      inspiration: {
        title: "",
        subtitle: "",
        description: "",
        image: ""
      },
      latestProducts: {
        title: "",
        count: 0
      },
      featuredOffers: [],
      isLoading: false,
      error: null,

      fetchCMS: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("/api/cms");
          if (res.ok) {
            const data = await res.json();
            set({
              heroSlides: data.heroSlides || [],
              testimonials: data.testimonials || [],
              brands: data.brands?.map((b: any) => b.logo) || [],
              dealDay: data.dealOfDay || {
                title: "",
                subtitle: "",
                description: "",
                image: "",
                endTime: new Date().toISOString(),
                price: 0,
                oldPrice: 0,
              },
              isLoading: false,
            });
          }
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateCMS: async (newData) => {
        set({ isLoading: true });
        try {
          const state = get();
          const body = {
            heroSlides: newData.heroSlides || state.heroSlides,
            testimonials: newData.testimonials || state.testimonials,
          };
          await fetch("/api/cms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          set({ ...newData, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateHeroSlides: (heroSlides) => get().updateCMS({ heroSlides }),
      updateTestimonials: (testimonials) => get().updateCMS({ testimonials }),
      updateBrands: (brands) => set({ brands }),
      updateDealDay: (dealDay) => set({ dealDay }),
      updateInspiration: (inspiration) => set({ inspiration }),
      updateLatestProducts: (latestProducts) => set({ latestProducts }),
      updateFeaturedOffers: (featuredOffers) => set({ featuredOffers }),
    }),
    {
      name: "cozycorner-cms-db",
    }
  )
);
