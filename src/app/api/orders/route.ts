import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth";
import { parseBody, orderSchema, ValidationError } from "@/lib/validate";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const query: Record<string, any> = {};
    if (status) query.orderStatus = status;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("userId", "name email"),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const data = parseBody(orderSchema, body);

    // Attach userId if token is provided (not required — supports guest checkout)
    const authUser = getAuthUser(req);

    const order = await Order.create({
      ...data,
      userId: authUser ? authUser.userId : undefined,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
