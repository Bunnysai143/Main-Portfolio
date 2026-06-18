import dbConnect from "@/lib/db";
import Achievement from "@/models/Achievement";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { achievementSchema } from "@/schemas";

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
    const validation = achievementSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const achievement = await Achievement.findByIdAndUpdate(
      params.id,
      validation.data,
      { new: true }
    );
    if (!achievement) return errorResponse("Achievement not found", 404);
    return successResponse(achievement);
  } catch (error) {
    console.error("PUT achievement error:", error);
    return errorResponse("Failed to update achievement", 500);
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
    const achievement = await Achievement.findByIdAndDelete(params.id);
    if (!achievement) return errorResponse("Achievement not found", 404);
    return successResponse({ message: "Achievement deleted" });
  } catch (error) {
    console.error("DELETE achievement error:", error);
    return errorResponse("Failed to delete achievement", 500);
  }
}
