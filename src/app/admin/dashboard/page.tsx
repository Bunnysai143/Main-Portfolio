"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Wrench, Briefcase, Trophy, GraduationCap, Bell } from "lucide-react";
import { SectionLoader } from "@/components/shared/loading";
import { formatDate } from "@/lib/utils";

interface DashboardStats {
  stats: {
    projects: number;
    skills: number;
    experiences: number;
    achievements: number;
    education: number;
  };
  recentNotifications: Array<{
    _id: string;
    action: string;
    entity: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  }>;
  unreadNotifications: number;
}

const statCards = [
  { key: "projects", label: "Projects", icon: FolderOpen, color: "text-blue-500" },
  { key: "skills", label: "Skills", icon: Wrench, color: "text-green-500" },
  { key: "experiences", label: "Experiences", icon: Briefcase, color: "text-purple-500" },
  { key: "achievements", label: "Achievements", icon: Trophy, color: "text-amber-500" },
  { key: "education", label: "Education", icon: GraduationCap, color: "text-rose-500" },
];

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your portfolio content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.key}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {data?.stats[stat.key as keyof typeof data.stats] || 0}
                  </p>
                </div>
                <div className={`p-2.5 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest admin actions and updates</CardDescription>
            </div>
            {(data?.unreadNotifications ?? 0) > 0 && (
              <Badge variant="secondary">
                {data?.unreadNotifications} unread
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {data?.recentNotifications && data.recentNotifications.length > 0 ? (
            <div className="space-y-4">
              {data.recentNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="p-1.5 rounded-md bg-accent/10">
                    <Bell className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {notification.entity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No recent activity. Start managing your portfolio!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
