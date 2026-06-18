import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { projectSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return successResponse(projects);
  } catch (error) {
    console.error("GET projects error:", error);
    return errorResponse("Failed to fetch projects", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = projectSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const project = await Project.create(validation.data);
    return successResponse(project, 201);
  } catch (error) {
    console.error("POST project error:", error);
    return errorResponse("Failed to create project", 500);
  }
}
