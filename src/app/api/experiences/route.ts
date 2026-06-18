import dbConnect from "@/lib/db";
import Experience from "@/models/Experience";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { experienceSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({ isActive: true })
      .sort({ order: 1, startDate: -1 })
      .lean();
    return successResponse(experiences);
  } catch (error) {
    console.error("GET experiences error:", error);
    return errorResponse("Failed to fetch experiences", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = experienceSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const experience = await Experience.create(validation.data);
    return successResponse(experience, 201);
  } catch (error) {
    console.error("POST experience error:", error);
    return errorResponse("Failed to create experience", 500);
  }
}
