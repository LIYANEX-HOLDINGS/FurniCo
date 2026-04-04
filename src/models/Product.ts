import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  isSale: boolean;
  isNew: boolean;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    description: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    isSale: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 10 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Text index for full-text search
ProductSchema.index({ name: "text", brand: "text", description: "text", tags: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
