import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICart extends Document {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
