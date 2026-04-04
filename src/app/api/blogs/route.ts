import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { getAuthUser } from "@/lib/auth";
import { parseBody, blogSchema, ValidationError } from "@/lib/validate";

export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const data = parseBody(blogSchema, body);

    const blog = await Blog.create(data);

    return NextResponse.json({ success: true, blog });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
