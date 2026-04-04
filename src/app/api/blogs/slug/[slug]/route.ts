import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  try {
    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
