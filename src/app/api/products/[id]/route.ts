import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { getAuthUser } from "@/lib/auth";
import { parseBody, productUpdateSchema, ValidationError } from "@/lib/validate";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  await dbConnect();
  try {
    const { id } = await params;
    // Support both MongoDB _id and our custom 'id' (SKU) field
    const product =
      (await Product.findOne({ id })) ||
      (await Product.findById(id).catch(() => null));

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const data = parseBody(productUpdateSchema, body);

    const product = await Product.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const product = await Product.findOneAndDelete({ id });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
