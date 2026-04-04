import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ success: false, message: "No credential provided" }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.startsWith("your_")) {
      return NextResponse.json(
        { success: false, message: "Server misconfiguration: NEXT_PUBLIC_GOOGLE_CLIENT_ID not set" },
        { status: 500 }
      );
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ success: false, message: "Invalid Google token payload" }, { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    let user = await User.findOne({ email: payload.email });
    
    // If not, create a new one, but mark as google auth
    if (!user) {
      user = await User.create({
        name: payload.name || "Google User",
        email: payload.email,
        authProvider: "google",
        role: "customer"
      });
    }

    // Sign existing CozyCorner JWT properly
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to authenticate with Google" }, { status: 500 });
  }
}
