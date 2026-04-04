import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getAuthUser, AuthError } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser.userId).select("-passwordHash");
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ success: false, message: err.message }, { status: err.status });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
