import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { parseBody, registerSchema, ValidationError } from "@/lib/validate";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const data = parseBody(registerSchema, body);

    // Check if email already exists
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: "customer",
    });

    // Sign JWT
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
