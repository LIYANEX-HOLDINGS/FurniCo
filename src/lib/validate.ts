import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Products ────────────────────────────────────────────────────────────────

export const productSchema = z.object({
  id: z.string().min(1, "Product ID / SKU is required"),
  name: z.string().min(2, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be positive"),
  oldPrice: z.number().positive().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Image must be a valid URL"),
  images: z.array(z.string().url()).optional(),
  category: z.string().min(1, "Category is required"),
  isSale: z.boolean().optional(),
  isNew: z.boolean().optional(),
  stock: z.number().int().nonnegative().optional(),
});

export const productUpdateSchema = productSchema.partial().omit({ id: true });

// ─── Orders ──────────────────────────────────────────────────────────────────

const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string(),
});

const shippingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(3),
  country: z.string().min(1),
});

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  shippingDetails: shippingSchema,
  pricing: z.object({
    subtotal: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    total: z.number().positive(),
  }),
});

export const orderStatusSchema = z.object({
  orderStatus: z.enum(["Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
});

// ─── Cart / Wishlist ──────────────────────────────────────────────────────────

export const cartSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      brand: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      image: z.string(),
    })
  ),
});

export const wishlistSchema = z.object({
  productIds: z.array(z.string()),
});

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  image: z.string().url("Valid image URL is required"),
  author: z.string().optional(),
  category: z.string().optional(),
  readTime: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export const blogUpdateSchema = blogSchema.partial();

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse and return data, or throw a formatted 400 Response */
export function parseBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues.map((e: any) => `${e.path.join(".")}: ${e.message}`).join("; ");
    throw new ValidationError(message);
  }
  return result.data;
}

export class ValidationError extends Error {
  status = 400;
  constructor(message: string) {
    super(message);
  }
}
