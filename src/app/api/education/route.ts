import dbConnect from "@/lib/db";
import Education from "@/models/Education";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { educationSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const education = await Education.find({ isActive: true })
      .sort({ order: 1, startDate: -1 })
      .lean();
    return successResponse(education);
  } catch (error) {
    console.error("GET education error:", error);
    return errorResponse("Failed to fetch education", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = educationSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const education = await Education.create(validation.data);
    return successResponse(education, 201);
  } catch (error) {
    console.error("POST education error:", error);
    return errorResponse("Failed to create education", 500);
  }
}
