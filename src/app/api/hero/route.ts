import dbConnect from "@/lib/db";
import Hero from "@/models/Hero";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { heroSchema } from "@/schemas";
import { logActivity } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne({ isActive: true }).lean();
    return successResponse(hero || {});
  } catch (error) {
    console.error("GET hero error:", error);
    return errorResponse("Failed to fetch hero", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = heroSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const hero = await Hero.findOneAndUpdate(
      { isActive: true },
      { ...validation.data, isActive: true },
      { new: true, upsert: true }
    );

    await logActivity({
      action: "update",
      entity: "hero",
      entityId: hero._id.toString(),
      message: `Updated hero section (Name: ${hero.name})`,
      adminId: session.id,
      adminEmail: session.email,
    });

    return successResponse(hero);
  } catch (error) {
    console.error("PUT hero error:", error);
    return errorResponse("Failed to update hero", 500);
  }
}
