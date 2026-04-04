import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    // Only admins can upload images
    const authUser = getAuthUser(req);
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { image, folder = "cozycorner/products" } = body;

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided. Send { image: '<base64 or URL>' }" },
        { status: 400 }
      );
    }

    const url = await uploadImage(image, folder);

    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    // Cloudinary config error = Cloudinary env vars not set yet
    if (err.message?.includes("cloud_name") || err.message?.includes("api_key")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local",
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
