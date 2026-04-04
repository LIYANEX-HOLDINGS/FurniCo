import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import CMSContent from "@/models/CMSContent";

export async function GET() {
  await dbConnect();
  try {
    const cms = await CMSContent.findOne({ key: "home_page" });
    if (!cms) {
      return NextResponse.json({ success: false, message: "CMS Content not found" }, { status: 404 });
    }
    return NextResponse.json(cms);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    // Simplified update: Find and update the document, or create if not exists
    const cms = await CMSContent.findOneAndUpdate({ key: "home_page" }, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(cms);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
