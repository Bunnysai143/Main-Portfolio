import dbConnect from "./db";
import NotificationLog from "@/models/NotificationLog";

interface LogParams {
  action: "create" | "update" | "delete" | "login" | "logout" | "upload";
  entity: "hero" | "about" | "skill" | "experience" | "project" | "achievement" | "education" | "contact" | "admin" | "system";
  entityId?: string;
  message: string;
  adminId: string;
  adminEmail: string;
}

export async function logActivity(params: LogParams) {
  try {
    await dbConnect();
    await NotificationLog.create(params);
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
