import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userId?: string; // optional for guest orders
  items: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: [
      {
        id: String,
        name: String,
        brand: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shippingDetails: {
      fullName: String,
      email: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    pricing: {
      subtotal: Number,
      shipping: Number,
      tax: Number,
      total: Number,
    },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
