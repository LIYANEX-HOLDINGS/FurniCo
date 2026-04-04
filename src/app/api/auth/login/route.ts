import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { parseBody, loginSchema, ValidationError } from "@/lib/validate";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const data = parseBody(loginSchema, body);

    // Hardcoded Admin Check
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    let user;

    const isAdminMatch = adminEmail && adminPassword && 
                       data.email === adminEmail && 
                       data.password === adminPassword;

    if (isAdminMatch) {
      user = await User.findOne({ email: adminEmail });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminPassword, salt);
        user = await User.create({
          name: "Super Admin",
          email: adminEmail,
          passwordHash,
          role: "admin",
          authProvider: "local"
        });
      } else {
        if (user.role !== "admin") {
          user.role = "admin";
          await user.save();
        }
      }
    } else {
      user = await User.findOne({ email: data.email });
      if (!user) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
      }

      if (!user.passwordHash) {
        return NextResponse.json({ success: false, message: "Please sign in with Google" }, { status: 401 });
      }

      const isValid = await bcrypt.compare(data.password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
      }
    }

    // Sign JWT
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
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ 
      success: false, 
      message: err?.message || String(err)
    }, { status: 500 });
  }
}
