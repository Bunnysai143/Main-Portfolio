"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema, type ContactInfoInput } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { SectionLoader } from "@/components/shared/loading";
import { Save } from "lucide-react";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInfoInput>({
    resolver: zodResolver(contactInfoSchema) as any,
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          reset({
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            leetcode: data.leetcode || "",
            website: data.website || "",
            resumeUrl: data.resumeUrl || "",
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: ContactInfoInput) => {
    setSaving(true);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Contact info updated");
    } catch {
      toast.error("Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <SectionLoader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground mt-1">Update contact information and social links.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your primary contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" placeholder="your@email.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register("phone")} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input {...register("location")} placeholder="City, Country" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links & Profiles</CardTitle>
            <CardDescription>Your social media and web profiles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input {...register("github")} placeholder="https://github.com/username" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input {...register("linkedin")} placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="space-y-2">
              <Label>Twitter / X</Label>
              <Input {...register("twitter")} placeholder="https://x.com/username" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>LeetCode</Label>
              <Input {...register("leetcode")} placeholder="https://leetcode.com/username" />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input {...register("website")} placeholder="https://yourwebsite.com" />
            </div>
            <div className="space-y-2">
              <Label>Resume URL</Label>
              <Input {...register("resumeUrl")} placeholder="https://drive.google.com/..." />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Contact Info"}
        </Button>
      </form>
    </div>
  );
}
