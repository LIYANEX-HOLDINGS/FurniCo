import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth";
import { parseBody, orderStatusSchema, ValidationError } from "@/lib/validate";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Users can only see their own orders; admins can see all
    if (authUser.role !== "admin" && order.userId?.toString() !== authUser.userId) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ success: true, order });
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
    const data = parseBody(orderStatusSchema, body);

    const order = await Order.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
