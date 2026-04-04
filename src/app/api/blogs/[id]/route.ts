import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { getAuthUser } from "@/lib/auth";
import { parseBody, blogUpdateSchema, ValidationError } from "@/lib/validate";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const data = parseBody(blogUpdateSchema, body);

    const blog = await Blog.findByIdAndUpdate(params.id, data, { new: true });
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
