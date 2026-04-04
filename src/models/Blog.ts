import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  readTime: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true, default: "Admin" },
    category: { type: String, required: true, default: "Interior" },
    readTime: { type: String, default: "5 min read" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
