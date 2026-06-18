"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutSchema, type AboutInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SectionLoader } from "@/components/shared/loading";
import { Save } from "lucide-react";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AboutInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(aboutSchema) as any,
  });

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) reset(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: AboutInput) => {
    setSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("About section updated");
    } catch {
      toast.error("Failed to update about section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About Section</h1>
        <p className="text-muted-foreground mt-1">
          Manage your about section content and stats.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>Update about section details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register("title")} placeholder="About Me" />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea {...register("description")} rows={3} placeholder="Brief about yourself..." />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Long Description</Label>
              <Textarea {...register("longDescription")} rows={5} placeholder="Detailed description..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input type="number" {...register("yearsOfExperience")} />
              </div>
              <div className="space-y-2">
                <Label>Projects Completed</Label>
                <Input type="number" {...register("projectsCompleted")} />
              </div>
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <Input type="number" {...register("technologiesUsed")} />
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
