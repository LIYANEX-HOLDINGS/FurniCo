import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlist extends Document {
  userId: string;
  productIds: string[];
  updatedAt: Date;
}

const WishlistSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    productIds: [{ type: String }],
  },
  { timestamps: true }
);

const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default Wishlist;
