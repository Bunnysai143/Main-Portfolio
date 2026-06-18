import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { projectSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id).lean();
    if (!project) return errorResponse("Project not found", 404);
    return successResponse(project);
  } catch (error) {
    console.error("GET project error:", error);
    return errorResponse("Failed to fetch project", 500);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const project = await Project.findByIdAndUpdate(
      params.id,
      validation.data,
      { new: true }
    );
    if (!project) return errorResponse("Project not found", 404);
    return successResponse(project);
  } catch (error) {
    console.error("PUT project error:", error);
    return errorResponse("Failed to update project", 500);
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
    const project = await Project.findByIdAndDelete(params.id);
    if (!project) return errorResponse("Project not found", 404);
    return successResponse({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE project error:", error);
    return errorResponse("Failed to delete project", 500);
  }
}
