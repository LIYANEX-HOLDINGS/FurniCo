import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const orders = await Order.find({ userId: authUser.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
