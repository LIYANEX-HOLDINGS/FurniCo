export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  image: string;
  hoverImage?: string;
  category: string;
  isSale?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Avyanna Occasional Chair",
    brand: "IdeaInstitute",
    price: 202.0,
    oldPrice: 758.0,
    rating: 5,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
    category: "Chairs",
    isSale: true
  },
  {
    id: "p2",
    name: "Valdez 3 Seater Sofa",
    brand: "ComDell",
    price: 599.0,
    oldPrice: 786.0,
    rating: 5,
    image: "/category_sofa_luxury_1774699103334.png",
    category: "Sofas",
    isSale: true
  },
  {
    id: "p3",
    name: "Armless Twin Floor Sofa",
    brand: "ComDell",
    price: 1499.0,
    oldPrice: 2006.0,
    rating: 4,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    category: "Sofas",
    isSale: true
  },
  {
    id: "p4",
    name: "Touch Bedside Table Lamp",
    brand: "PlushLounge",
    price: 40.0,
    rating: 5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed657dc997?q=80&w=800&auto=format&fit=crop",
    category: "Lighting"
  },
  {
    id: "p5",
    name: "Modern Ceramic Vase",
    brand: "Theme-Sky",
    price: 28.0,
    oldPrice: 45.0,
    rating: 4,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    isSale: true
  },
  {
    id: "p6",
    name: "Oak Wood Dining Table",
    brand: "IdeaInstitute",
    price: 450.0,
    rating: 5,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    category: "Tables"
  },
  {
    id: "p7",
    name: "Minimalist Floating Shelf",
    brand: "ComDell",
    price: 35.0,
    rating: 3,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop",
    category: "Storage"
  },
  {
    id: "p8",
    name: "Ergonomic Office Chair",
    brand: "PlushLounge",
    price: 299.0,
    oldPrice: 350.0,
    rating: 5,
    image: "https://images.unsplash.com/photo-1505797149-43b0ad7664a3?q=80&w=800&auto=format&fit=crop",
    category: "Office",
    isSale: true
  }
];
