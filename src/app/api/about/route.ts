import dbConnect from "@/lib/db";
import About from "@/models/About";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { aboutSchema } from "@/schemas";
import { logActivity } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne({ isActive: true }).lean();
    return successResponse(about || {});
  } catch (error) {
    console.error("GET about error:", error);
    return errorResponse("Failed to fetch about", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = aboutSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const about = await About.findOneAndUpdate(
      { isActive: true },
      { ...validation.data, isActive: true },
      { new: true, upsert: true }
    );

    await logActivity({
      action: "update",
      entity: "about",
      entityId: about._id.toString(),
      message: "Updated about section summary/details",
      adminId: session.id,
      adminEmail: session.email,
    });

    return successResponse(about);
  } catch (error) {
    console.error("PUT about error:", error);
    return errorResponse("Failed to update about", 500);
  }
}
