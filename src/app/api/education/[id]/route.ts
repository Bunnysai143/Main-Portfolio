import dbConnect from "@/lib/db";
import Education from "@/models/Education";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { educationSchema } from "@/schemas";

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
    const validation = educationSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const education = await Education.findByIdAndUpdate(
      params.id,
      validation.data,
      { new: true }
    );
    if (!education) return errorResponse("Education not found", 404);
    return successResponse(education);
  } catch (error) {
    console.error("PUT education error:", error);
    return errorResponse("Failed to update education", 500);
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
    const education = await Education.findByIdAndDelete(params.id);
    if (!education) return errorResponse("Education not found", 404);
    return successResponse({ message: "Education deleted" });
  } catch (error) {
    console.error("DELETE education error:", error);
    return errorResponse("Failed to delete education", 500);
  }
}
