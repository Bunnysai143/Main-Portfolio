import dbConnect from "@/lib/db";
import Achievement from "@/models/Achievement";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { achievementSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find({ isActive: true })
      .sort({ order: 1, date: -1 })
      .lean();
    return successResponse(achievements);
  } catch (error) {
    console.error("GET achievements error:", error);
    return errorResponse("Failed to fetch achievements", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = achievementSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const achievement = await Achievement.create(validation.data);
    return successResponse(achievement, 201);
  } catch (error) {
    console.error("POST achievement error:", error);
    return errorResponse("Failed to create achievement", 500);
  }
}
