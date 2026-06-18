import dbConnect from "@/lib/db";
import Skill from "@/models/Skill";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { skillSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({ isActive: true }).sort({ category: 1, order: 1 }).lean();
    return successResponse(skills);
  } catch (error) {
    console.error("GET skills error:", error);
    return errorResponse("Failed to fetch skills", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = skillSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const skill = await Skill.create(validation.data);
    return successResponse(skill, 201);
  } catch (error) {
    console.error("POST skill error:", error);
    return errorResponse("Failed to create skill", 500);
  }
}
