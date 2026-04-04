import mongoose, { Schema, Document, Model } from "mongoose";

export interface CMSSection {
  title: string;
  subtitle?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ICMSContent extends Document {
  key: string; // e.g., 'home_page'
  heroSlides: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
  featuredOffers: Array<{
    id: string;
    title: string;
    image: string;
    link: string;
    cols: number;
    rows: number;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
  }>;
  brands: Array<{
    id: string;
    name: string;
    logo: string;
  }>;
  dealOfDay?: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    oldPrice: number;
    image: string;
    endTime: Date;
  };
  ideaInstitute?: {
    title: string;
    subtitle: string;
    mainImage: string;
    secondaryImage: string;
  };
  updatedAt: Date;
}

const CMSContentSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "home_page" },
    heroSlides: [
      {
        id: String,
        title: String,
        description: String,
        image: String,
        link: String,
      },
    ],
    featuredOffers: [
      {
        id: String,
        title: String,
        image: String,
        link: String,
        cols: Number,
        rows: Number,
      },
    ],
    testimonials: [
      {
        id: String,
        name: String,
        role: String,
        content: String,
        avatar: String,
        rating: Number,
      },
    ],
    brands: [
      {
        id: String,
        name: String,
        logo: String,
      },
    ],
    dealOfDay: {
      id: String,
      title: String,
      subtitle: String,
      price: Number,
      oldPrice: Number,
      image: String,
      endTime: Date,
    },
    ideaInstitute: {
      title: String,
      subtitle: String,
      mainImage: String,
      secondaryImage: String,
    },
  },
  { timestamps: true }
);

const CMSContent: Model<ICMSContent> =
  mongoose.models.CMSContent || mongoose.model<ICMSContent>("CMSContent", CMSContentSchema);

export default CMSContent;
