import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a base64 or URL image to Cloudinary.
 * @param source  - base64 data URI (e.g. "data:image/png;base64,...") OR a remote URL
 * @param folder  - Cloudinary folder name (e.g. "cozycorner/products")
 * @returns       - Secure URL of uploaded image
 */
export async function uploadImage(source: string, folder = "cozycorner"): Promise<string> {
  const result = await cloudinary.uploader.upload(source, {
    folder,
    resource_type: "image",
    quality: "auto",
    fetch_format: "auto",
  });
  return result.secure_url;
}

/**
 * Delete an image from Cloudinary by its public_id.
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
