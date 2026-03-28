import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface CmsState {
  heroSlides: HeroSlide[];
  testimonials: Testimonial[];
  brands: string[];
  dealDay: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    endTime: string; // ISO string
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
    description: string;
  };
  featuredOffers: Array<{
    id: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    bgColor?: string;
  }>;
  
  // Actions
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateBrands: (brands: string[]) => void;
  updateDealDay: (deal: CmsState['dealDay']) => void;
  updateInspiration: (insp: CmsState['inspiration']) => void;
  updateLatestProducts: (lp: CmsState['latestProducts']) => void;
  updateFeaturedOffers: (offers: CmsState['featuredOffers']) => void;
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      heroSlides: [
        {
          id: "1",
          title: "Handmade Furniture",
          subtitle: "New Collection / Summer 2024",
          description: "Discover our new artisanal selection of handcrafted oak chairs and tables.",
          image: "/hero_modern_living_room_1774699058065.png",
          buttonText: "Discover Set Sofa",
        },
        {
          id: "2",
          title: "Minimalist Living",
          subtitle: "Exclusive / Nordic Style",
          description: "Transform your workspace with our curated Scandinavian office essentials.",
          image: "/hero_minimalist_dining_1774699088482.png",
          buttonText: "Shop Collection",
        }
      ],
      testimonials: [
        {
          id: "t1",
          name: "John Doe",
          role: "Verified Buyer",
          text: "The quality of the furniture is exceptional. It transformed my living room entirely! Highly recommend CozyCorner.",
        },
        {
          id: "t2",
          name: "Jane Smith",
          role: "Interior Designer",
          text: "I always source pieces from here for my clients. The minimalist aesthetic is exactly what I need for modern projects.",
        }
      ],
      brands: [
        "https://logo.clearbit.com/ikea.com",
        "https://logo.clearbit.com/hermanmiller.com",
        "https://logo.clearbit.com/westelm.com",
        "https://logo.clearbit.com/crateandbarrel.com",
        "https://logo.clearbit.com/potterybarn.com",
        "https://logo.clearbit.com/cb2.com",
      ],
      dealDay: {
        title: "Exclusive Deal of the Day",
        subtitle: "Don't miss out on this limited time offer!",
        description: "Get our signature designer armchair at an unbeatable price.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
        endTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        price: 299,
        oldPrice: 450,
      },
      inspiration: {
        title: "Be inspired by IdeaInstitute",
        subtitle: "A NEW VISION FOR YOUR HOME",
        description: "Discover how our community styles their favorite pieces in real homes around the world.",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop",
      },
      latestProducts: {
        title: "Latest products",
        description: "Update your space with our newest arrivals. Discover fresh designs and innovative materials.",
      },
      featuredOffers: [
        {
          id: "o1",
          tag: "Tables",
          title: "Make Your Home a Masterpiece",
          description: "Discover Unique Finds!",
          image: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=600&auto=format&fit=crop",
          bgColor: "#e6c1b8"
        },
        {
          id: "o2",
          tag: "Lighting",
          title: "From Shadow to Shine",
          description: "Best Lighting Solutions!",
          image: "https://images.unsplash.com/photo-1543198126-a6047240f90e?q=80&w=600&auto=format&fit=crop",
          bgColor: "#7a6f66"
        },
        {
          id: "o3",
          tag: "Sale",
          title: "-25% for all chairs!",
          description: "Don't miss the deal!",
          image: "https://images.unsplash.com/photo-1519961655809-34fa156820ff?q=80&w=600&auto=format&fit=crop",
          bgColor: "#85a6a6"
        }
      ],

      updateHeroSlides: (heroSlides) => set({ heroSlides }),
      updateTestimonials: (testimonials) => set({ testimonials }),
      updateBrands: (brands) => set({ brands }),
      updateDealDay: (dealDay) => set({ dealDay }),
      updateInspiration: (inspiration) => set({ inspiration }),
      updateLatestProducts: (latestProducts) => set({ latestProducts }),
      updateFeaturedOffers: (featuredOffers) => set({ featuredOffers }),
    }),
    {
      name: 'cozycorner-cms-db',
    }
  )
);
