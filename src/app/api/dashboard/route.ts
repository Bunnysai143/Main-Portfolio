import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Achievement from "@/models/Achievement";
import Education from "@/models/Education";
import NotificationLog from "@/models/NotificationLog";
import { authenticateRequest, successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await authenticateRequest(request);
    if (!session) return unauthorizedResponse();

    await dbConnect();

    const [projects, skills, experiences, achievements, education, recentNotifications] =
      await Promise.all([
        Project.countDocuments({ isActive: true }),
        Skill.countDocuments({ isActive: true }),
        Experience.countDocuments({ isActive: true }),
        Achievement.countDocuments({ isActive: true }),
        Education.countDocuments({ isActive: true }),
        NotificationLog.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .lean(),
      ]);

    const unreadNotifications = await NotificationLog.countDocuments({
      isRead: false,
    });

    return successResponse({
      stats: {
        projects,
        skills,
        experiences,
        achievements,
        education,
      },
      recentNotifications,
      unreadNotifications,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return errorResponse("Failed to fetch dashboard stats", 500);
  }
}
