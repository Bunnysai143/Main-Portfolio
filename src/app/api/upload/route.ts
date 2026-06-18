import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return errorResponse("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await uploadImage(base64, folder);
    return successResponse(result, 201);
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse("Failed to upload image", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    const { publicId } = await request.json();
    if (!publicId) {
      return errorResponse("Public ID is required");
    }

    await deleteImage(publicId);
    return successResponse({ message: "Image deleted" });
  } catch (error) {
    console.error("Delete image error:", error);
    return errorResponse("Failed to delete image", 500);
  }
}
