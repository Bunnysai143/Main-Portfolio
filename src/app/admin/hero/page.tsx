"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroSchema, type HeroInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { SectionLoader } from "@/components/shared/loading";
import { Save } from "lucide-react";

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeroInput>({
    resolver: zodResolver(heroSchema) as any,
  });

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) reset(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: HeroInput) => {
    setSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Hero section updated");
    } catch {
      toast.error("Failed to update hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hero Section</h1>
        <p className="text-muted-foreground mt-1">
          Manage the main hero section of your portfolio.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Update hero section text and links</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Greeting</Label>
                <Input {...register("greeting")} placeholder="Hello, I'm" />
                {errors.greeting && (
                  <p className="text-xs text-destructive">{errors.greeting.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input {...register("name")} placeholder="Your Name" />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...register("title")} placeholder="Backend Developer" />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input {...register("subtitle")} placeholder="Building scalable systems" />
                {errors.subtitle && (
                  <p className="text-xs text-destructive">{errors.subtitle.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...register("description")} rows={4} placeholder="Professional summary..." />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CTA Text</Label>
                <Input {...register("ctaText")} placeholder="View My Work" />
              </div>
              <div className="space-y-2">
                <Label>CTA Link</Label>
                <Input {...register("ctaLink")} placeholder="#projects" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Resume URL</Label>
              <Input {...register("resumeUrl")} placeholder="https://..." />
              {errors.resumeUrl && (
                <p className="text-xs text-destructive">{errors.resumeUrl.message}</p>
              )}
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
