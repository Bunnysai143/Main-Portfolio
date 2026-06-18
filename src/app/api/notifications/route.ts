import dbConnect from "@/lib/db";
import NotificationLog from "@/models/NotificationLog";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const unreadOnly = url.searchParams.get("unread") === "true";

    const filter = unreadOnly ? { isRead: false } : {};
    const notifications = await NotificationLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const unreadCount = await NotificationLog.countDocuments({ isRead: false });

    return successResponse({ notifications, unreadCount });
  } catch (error) {
    console.error("GET notifications error:", error);
    return errorResponse("Failed to fetch notifications", 500);
  }
}

export async function POST(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    const body = await request.json();

    const notification = await NotificationLog.create({
      ...body,
      adminId: session.id,
      adminEmail: session.email,
    });

    return successResponse(notification, 201);
  } catch (error) {
    console.error("POST notification error:", error);
    return errorResponse("Failed to create notification", 500);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();
    await NotificationLog.updateMany({ isRead: false }, { isRead: true });
    return successResponse({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("PATCH notifications error:", error);
    return errorResponse("Failed to update notifications", 500);
  }
}
