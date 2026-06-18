import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { skillSchema } from "@/schemas";

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
    const validation = skillSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const skill = await Skill.findByIdAndUpdate(params.id, validation.data, {
      new: true,
    });

    if (!skill) return errorResponse("Skill not found", 404);
    return successResponse(skill);
  } catch (error) {
    console.error("PUT skill error:", error);
    return errorResponse("Failed to update skill", 500);
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
    const skill = await Skill.findByIdAndDelete(params.id);
    if (!skill) return errorResponse("Skill not found", 404);
    return successResponse({ message: "Skill deleted" });
  } catch (error) {
    console.error("DELETE skill error:", error);
    return errorResponse("Failed to delete skill", 500);
  }
}
