import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { getAuthUser, AuthError } from "@/lib/auth";
import { parseBody, productSchema, ValidationError } from "@/lib/validate";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const isSale = searchParams.get("isSale");
    const isNew = searchParams.get("isNew");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};
    if (category) query.category = { $regex: new RegExp(category, "i") };
    if (isSale === "true") query.isSale = true;
    if (isNew === "true") query.isNew = true;
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { brand: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const data = parseBody(productSchema, body);

    const existing = await Product.findOne({ id: data.id });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Product with id '${data.id}' already exists` },
        { status: 409 }
      );
    }

    const product = await Product.create(data);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err: any) {
    if (err instanceof ValidationError || err instanceof AuthError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status ?? 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
