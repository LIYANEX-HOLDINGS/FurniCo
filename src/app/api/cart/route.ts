import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { getAuthUser } from "@/lib/auth";
import { parseBody, cartSchema, ValidationError } from "@/lib/validate";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const cart = await Cart.findOne({ userId: authUser.userId });
    return NextResponse.json({ success: true, items: cart?.items ?? [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = parseBody(cartSchema, body);

    const cart = await Cart.findOneAndUpdate(
      { userId: authUser.userId },
      { items },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, cart });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
