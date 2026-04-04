import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import CMSContent from "@/models/CMSContent";
import { mockProducts } from "@/data/mockProducts";

export async function GET() {
  console.log("Starting Seeding Process...");
  try {
    await dbConnect();
    console.log("Database connected successfully.");

    // 1. Seed Products
    console.log("Seeding products...");
    await Product.deleteMany({});
    
    // Map mock data to match schema requirements (add missing description)
    const productsToSeed = mockProducts.map(p => ({
      ...p,
      description: (p as any).description || "High-quality furniture piece crafted for comfort and style. Part of our signature collection at CozyCorner.",
      oldPrice: p.oldPrice || undefined,
      isNew: (p as any).isNew || false,
      reviews: (p as any).reviews || Math.floor(Math.random() * 50) + 5
    }));

    const seededProducts = await Product.insertMany(productsToSeed);
    console.log(`Seeded ${seededProducts.length} products.`);

    // 2. Seed CMS Content (Initial State)
    console.log("Seeding CMS content...");
    await CMSContent.deleteMany({});
    const initialCMS = await CMSContent.create({
      key: "home_page",
      heroSlides: [
        {
          id: "1",
          title: "Handmade Furniture",
          description: "Discover our new artisanal selection of handcrafted oak chairs and tables.",
          image: "/hero_modern_living_room_1774699058065.png",
          link: "/shop",
        },
        {
          id: "2",
          title: "Minimalist Living",
          description: "Transform your workspace with our curated Scandinavian office essentials.",
          image: "/hero_minimalist_dining_1774699088482.png",
          link: "/shop",
        },
      ],
      featuredOffers: [
        {
          id: "o1",
          title: "Make Your Home a Masterpiece",
          image: "https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=600&auto=format&fit=crop",
          link: "/shop",
          cols: 2,
          rows: 1,
        },
      ],
      testimonials: [
        {
          id: "t1",
          name: "John Doe",
          role: "Verified Buyer",
          content: "The quality of the furniture is exceptional. It transformed my living room entirely!",
          avatar: "https://i.pravatar.cc/150?u=t1",
          rating: 5,
        },
      ],
      brands: [
        { id: "b1", name: "IKEA", logo: "https://logo.clearbit.com/ikea.com" },
        { id: "b2", name: "Herman Miller", logo: "https://logo.clearbit.com/hermanmiller.com" },
      ],
    });
    console.log("CMS content seeded successfully.");

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      productsCount: seededProducts.length,
      cmsCreated: !!initialCMS,
    });
  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
