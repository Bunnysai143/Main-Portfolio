import dbConnect from "@/lib/db";
import ContactInfo from "@/models/ContactInfo";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";
import { contactInfoSchema } from "@/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const contact = await ContactInfo.findOne({ isActive: true }).lean();
    return successResponse(contact || {});
  } catch (error) {
    console.error("GET contact error:", error);
    return errorResponse("Failed to fetch contact", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();
    const validation = contactInfoSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message);
    }

    const contact = await ContactInfo.findOneAndUpdate(
      { isActive: true },
      { ...validation.data, isActive: true },
      { new: true, upsert: true }
    );

    return successResponse(contact);
  } catch (error) {
    console.error("PUT contact error:", error);
    return errorResponse("Failed to update contact", 500);
  }
}
