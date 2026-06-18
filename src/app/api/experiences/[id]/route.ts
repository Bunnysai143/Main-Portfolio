import dbConnect from "@/lib/db";
import Experience from "@/models/Experience";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { experienceSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = experienceSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const experience = await Experience.findByIdAndUpdate(
      params.id,
      validation.data,
      { new: true }
    );
    if (!experience) return errorResponse("Experience not found", 404);
    return successResponse(experience);
  } catch (error) {
    console.error("PUT experience error:", error);
    return errorResponse("Failed to update experience", 500);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const experience = await Experience.findByIdAndDelete(params.id);
    if (!experience) return errorResponse("Experience not found", 404);
    return successResponse({ message: "Experience deleted" });
  } catch (error) {
    console.error("DELETE experience error:", error);
    return errorResponse("Failed to delete experience", 500);
  }
}
