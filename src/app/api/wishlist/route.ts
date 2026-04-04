import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Wishlist from "@/models/Wishlist";
import { getAuthUser } from "@/lib/auth";
import { parseBody, wishlistSchema, ValidationError } from "@/lib/validate";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }

    const wishlist = await Wishlist.findOne({ userId: authUser.userId });
    return NextResponse.json({ success: true, productIds: wishlist?.productIds ?? [] });
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
    const { productIds } = parseBody(wishlistSchema, body);

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: authUser.userId },
      { productIds },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, wishlist });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
